import { defineComponent as de, shallowRef as xi, h as je, ref as se, onMounted as Je, onUnmounted as it, watch as Te, toRaw as Qn, nextTick as Ke, version as Ur, isProxy as ki, computed as C, toRef as $e, openBlock as m, createElementBlock as x, normalizeStyle as we, createVNode as z, unref as T, createElementVNode as d, Fragment as ce, renderList as pe, normalizeClass as Z, toDisplayString as A, createCommentVNode as E, onBeforeUnmount as _i, createStaticVNode as Jn, useSlots as uo, renderSlot as ke, Transition as pt, withCtx as F, Comment as Yr, createBlock as oe, resolveDynamicComponent as ht, createTextVNode as Ae, Teleport as Qt, withDirectives as Xe, withModifiers as Pe, vModelText as Rt, vShow as Ht, createSlots as Vo, vModelSelect as qr, mergeProps as yt, useAttrs as Ja, withKeys as Ca, inject as wi } from "vue";
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
const vt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, eo = [..."0123456789ABCDEF"], Jr = (e) => eo[e & 15], el = (e) => eo[(e & 240) >> 4] + eo[e & 15], on = (e) => (e & 240) >> 4 === (e & 15), tl = (e) => on(e.r) && on(e.g) && on(e.b) && on(e.a);
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
function ho(e) {
  const a = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.max(a, n, o), i = Math.min(a, n, o), r = (s + i) / 2;
  let l, c, u;
  return s !== i && (u = s - i, c = r > 0.5 ? u / (2 - s - i) : u / (s + i), l = ll(a, n, o, u, s), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function fo(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(Zt);
}
function go(e, t, a) {
  return fo(Ci, e, t, a);
}
function cl(e, t, a) {
  return fo(rl, e, t, a);
}
function dl(e, t, a) {
  return fo(il, e, t, a);
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
  return t[1] === "hwb" ? n = cl(o, s, i) : t[1] === "hsv" ? n = dl(o, s, i) : n = go(o, s, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function hl(e, t) {
  var a = ho(e);
  a[0] = $i(a[0] + t), a = go(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function fl(e) {
  if (!e)
    return;
  const t = ho(e), a = t[0], n = No(t[1]), o = No(t[2]);
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
const On = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ba = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function yl(e, t, a) {
  const n = ba(Vt(e.r)), o = ba(Vt(e.g)), s = ba(Vt(e.b));
  return {
    r: Zt(On(n + a * (ba(Vt(t.r)) - n))),
    g: Zt(On(o + a * (ba(Vt(t.g)) - o))),
    b: Zt(On(s + a * (ba(Vt(t.b)) - s))),
    a: e.a + a * (t.a - e.a)
  };
}
function rn(e, t, a) {
  if (e) {
    let n = ho(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * a, t === 0 ? 360 : 1)), n = go(n), e.r = n[0], e.g = n[1], e.b = n[2];
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
function Be(e) {
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
  else if (Be(e))
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
  if (Be(e)) {
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
  Be(o) && Be(s) ? Ka(o, s, n) : t[e] = $n(s);
}
function Ka(e, t, a) {
  const n = Ze(t) ? t : [
    t
  ], o = n.length;
  if (!Be(e))
    return e;
  a = a || {};
  const s = a.merger || wl;
  let i;
  for (let r = 0; r < o; ++r) {
    if (i = n[r], !Be(i))
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
  Be(n) && Be(o) ? za(n, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = $n(o));
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
function mo(e) {
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
function to(e, t) {
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
function po(e, t, a) {
  a = a || ((i) => e[i] < t);
  let n = e.length - 1, o = 0, s;
  for (; n - o > 1; )
    s = o + n >> 1, a(s) ? o = s : n = s;
  return {
    lo: o,
    hi: n
  };
}
const ua = (e, t, a, n) => po(e, a, n ? (o) => {
  const s = e[o][t];
  return s < a || s === a && e[o + 1][t] === a;
} : (o) => e[o][t] < a), Fl = (e, t, a) => po(e, a, (n) => e[n][t] >= a);
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
    const n = "_onData" + mo(a), o = e[a];
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
const bo = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", tt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Nl = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function jl(e, t, a) {
  const n = t.length;
  let o = 0, s = n;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: g, minDefined: b, maxDefined: f } = i.getUserBounds();
    if (b) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        ua(l, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? n : ua(t, u, i.getPixelForValue(h)).lo
      ), c) {
        const p = l.slice(0, o + 1).reverse().findIndex((y) => !Ee(y[r.axis]));
        o -= Math.max(0, p);
      }
      o = ot(o, 0, n - 1);
    }
    if (f) {
      let p = Math.max(
        // @ts-expect-error Need to type _parsed
        ua(l, i.axis, g, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : ua(t, u, i.getPixelForValue(g), !0).hi + 1
      );
      if (c) {
        const y = l.slice(p - 1).findIndex((v) => !Ee(v[r.axis]));
        p += Math.max(0, y);
      }
      s = ot(p, o, n) - o;
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
function vo(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Jo(e) {
  return vo(e) ? e : new Wa(e);
}
function Vn(e) {
  return vo(e) ? e : new Wa(e).saturate(0.5).darken(0.1).hexString();
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
function yo(e, t, a) {
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
    return Object.assign(l, this.options.ticks.format), yo(e, n, l);
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
const ga = /* @__PURE__ */ Object.create(null), ao = /* @__PURE__ */ Object.create(null);
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
function zn(e, t, a) {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, o) => Vn(o.backgroundColor), this.hoverBorderColor = (n, o) => Vn(o.borderColor), this.hoverColor = (n, o) => Vn(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return zn(this, t, a);
  }
  get(t) {
    return Ha(this, t);
  }
  describe(t, a) {
    return zn(ao, t, a);
  }
  override(t, a) {
    return zn(ga, t, a);
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
          return Be(l) ? Object.assign({}, c, l) : De(l, c);
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
function no(e, t, a, n) {
  Ei(e, t, a, n, null);
}
function Ei(e, t, a, n, o) {
  let s, i, r, l, c, u, h, g;
  const b = t.pointStyle, f = t.rotation, p = t.radius;
  let y = (f || 0) * Al;
  if (b && typeof b == "object" && (s = b.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, n), e.rotate(y), e.drawImage(b, -b.width / 2, -b.height / 2, b.width, b.height), e.restore();
    return;
  }
  if (!(isNaN(p) || p <= 0)) {
    switch (e.beginPath(), b) {
      // Default includes circle
      default:
        o ? e.ellipse(a, n, o / 2, p, 0, 0, Ue) : e.arc(a, n, p, 0, Ue), e.closePath();
        break;
      case "triangle":
        u = o ? o / 2 : p, e.moveTo(a + Math.sin(y) * u, n - Math.cos(y) * p), y += Yo, e.lineTo(a + Math.sin(y) * u, n - Math.cos(y) * p), y += Yo, e.lineTo(a + Math.sin(y) * u, n - Math.cos(y) * p), e.closePath();
        break;
      case "rectRounded":
        c = p * 0.516, l = p - c, i = Math.cos(y + sa) * l, h = Math.cos(y + sa) * (o ? o / 2 - c : l), r = Math.sin(y + sa) * l, g = Math.sin(y + sa) * (o ? o / 2 - c : l), e.arc(a - h, n - r, c, y - Oe, y - Qe), e.arc(a + g, n - i, c, y - Qe, y), e.arc(a + h, n + r, c, y, y + Qe), e.arc(a - g, n + i, c, y + Qe, y + Oe), e.closePath();
        break;
      case "rect":
        if (!f) {
          l = Math.SQRT1_2 * p, u = o ? o / 2 : l, e.rect(a - u, n - l, 2 * u, 2 * l);
          break;
        }
        y += sa;
      /* falls through */
      case "rectRot":
        h = Math.cos(y) * (o ? o / 2 : p), i = Math.cos(y) * p, r = Math.sin(y) * p, g = Math.sin(y) * (o ? o / 2 : p), e.moveTo(a - h, n - r), e.lineTo(a + g, n - i), e.lineTo(a + h, n + r), e.lineTo(a - g, n + i), e.closePath();
        break;
      case "crossRot":
        y += sa;
      /* falls through */
      case "cross":
        h = Math.cos(y) * (o ? o / 2 : p), i = Math.cos(y) * p, r = Math.sin(y) * p, g = Math.sin(y) * (o ? o / 2 : p), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + g, n - i), e.lineTo(a - g, n + i);
        break;
      case "star":
        h = Math.cos(y) * (o ? o / 2 : p), i = Math.cos(y) * p, r = Math.sin(y) * p, g = Math.sin(y) * (o ? o / 2 : p), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + g, n - i), e.lineTo(a - g, n + i), y += sa, h = Math.cos(y) * (o ? o / 2 : p), i = Math.cos(y) * p, r = Math.sin(y) * p, g = Math.sin(y) * (o ? o / 2 : p), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + g, n - i), e.lineTo(a - g, n + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(y) * p, r = Math.sin(y) * p, e.moveTo(a - i, n - r), e.lineTo(a + i, n + r);
        break;
      case "dash":
        e.moveTo(a, n), e.lineTo(a + Math.cos(y) * (o ? o / 2 : p), n + Math.sin(y) * p);
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
function xo(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function ko(e) {
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
function _o(e, t) {
  const a = {}, n = Be(t), o = n ? Object.keys(t) : t, s = Be(e) ? n ? (i) => De(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    a[i] = lc(s(i));
  return a;
}
function Fi(e) {
  return _o(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function _a(e) {
  return _o(e, [
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
function wo(e, t = [
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
    override: (r) => wo([
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
const dc = (e, t) => e ? e + mo(t) : t, Co = (e, t) => Be(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Vi(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function uc(e, t, a) {
  const { _proxy: n, _context: o, _subProxy: s, _descriptors: i } = e;
  let r = n[t];
  return Jt(r) && i.isScriptable(t) && (r = hc(t, r, e, a)), Ze(r) && r.length && (r = fc(t, r, e, i.isIndexable)), Co(t, r) && (r = $a(r, o, s && s[t], i)), r;
}
function hc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(s, i || n);
  return r.delete(e), Co(e, l) && (l = $o(o._scopes, o, e, l)), l;
}
function fc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: r } = a;
  if (typeof s.index < "u" && n(e))
    return t[s.index % t.length];
  if (Be(t[0])) {
    const l = t, c = o._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const h = $o(c, o, e, u);
      t.push($a(h, s, i && i[e], r));
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
function $o(e, t, a, n) {
  const o = t._rootScopes, s = zi(t._fallback, a, n), i = [
    ...e,
    ...o
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = ns(r, i, a, s || a, n);
  return l === null || typeof s < "u" && s !== a && (l = ns(r, i, s, l, n), l === null) ? !1 : wo(Array.from(r), [
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
  return Ze(o) && Be(a) ? a : o || {};
}
function bc(e, t, a, n) {
  let o;
  for (const s of t)
    if (o = Ni(dc(s, e), a), typeof o < "u")
      return Co(e, o) ? $o(a, n, e, o) : o;
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
  const o = e.skip ? t : e, s = t, i = a.skip ? t : a, r = to(s, o), l = to(i, s);
  let c = r / (r + l), u = l / (r + l);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const h = n * c, g = n * u;
  return {
    previous: {
      x: s.x - h * (i.x - o.x),
      y: s.y - h * (i.y - o.y)
    },
    next: {
      x: s.x + g * (i.x - o.x),
      y: s.y + g * (i.y - o.y)
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
    const u = r[a], h = r[n];
    i && (s = (u - i[a]) / 3, r[`cp1${a}`] = u - s, r[`cp1${n}`] = h - s * t[c]), l && (s = (l[a] - u) / 3, r[`cp2${a}`] = u + s, r[`cp2${n}`] = h + s * t[c]);
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
function So() {
  return typeof window < "u" && typeof document < "u";
}
function Mo(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Dn(e, t, a) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[a])) : n = e, n;
}
const Ln = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Sc(e, t) {
  return Ln(e).getPropertyValue(t);
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
  const { canvas: a, currentDevicePixelRatio: n } = t, o = Ln(a), s = o.boxSizing === "border-box", i = ha(o, "padding"), r = ha(o, "border", "width"), { x: l, y: c, box: u } = Ac(e, a), h = i.left + (u && r.left), g = i.top + (u && r.top);
  let { width: b, height: f } = t;
  return s && (b -= i.width + r.width, f -= i.height + r.height), {
    x: Math.round((l - h) / b * a.width / n),
    y: Math.round((c - g) / f * a.height / n)
  };
}
function Tc(e, t, a) {
  let n, o;
  if (t === void 0 || a === void 0) {
    const s = e && Mo(e);
    if (!s)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), r = Ln(s), l = ha(r, "border", "width"), c = ha(r, "padding");
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
  const o = Ln(e), s = ha(o, "margin"), i = Dn(o.maxWidth, e, "clientWidth") || Sn, r = Dn(o.maxHeight, e, "clientHeight") || Sn, l = Tc(e, t, a);
  let { width: c, height: u } = l;
  if (o.boxSizing === "content-box") {
    const g = ha(o, "border", "width"), b = ha(o, "padding");
    c -= b.width + g.width, u -= b.height + g.height;
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
    So() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
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
  let { start: c, end: u, loop: h } = e, g, b;
  if (h) {
    for (c += l, u += l, g = 0, b = l; g < b && i(r(t[c % l][n]), o, s); ++g)
      c--, u--;
    c %= l, u %= l;
  }
  return u < c && (u += l), {
    start: c,
    end: u,
    loop: h,
    style: e.style
  };
}
function Oc(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: o, end: s } = a, i = t.length, { compare: r, between: l, normalize: c } = Ki(n), { start: u, end: h, loop: g, style: b } = Fc(e, t, a), f = [];
  let p = !1, y = null, v, k, w;
  const _ = () => l(o, w, v) && r(o, w) !== 0, $ = () => r(s, v) === 0 || l(s, w, v), S = () => p || _(), M = () => !p || $();
  for (let I = u, V = u; I <= h; ++I)
    k = t[I % i], !k.skip && (v = c(k[n]), v !== w && (p = l(v, o, s), y === null && S() && (y = r(v, o) === 0 ? I : V), y !== null && M() && (f.push(rs({
      start: y,
      end: I,
      loop: g,
      count: i,
      style: b
    })), y = null), V = I, w = v));
  return y !== null && f.push(rs({
    start: y,
    end: h,
    loop: g,
    count: i,
    style: b
  })), f;
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
  let u = s, h = t[0].start, g = h;
  function b(f, p, y, v) {
    const k = r ? -1 : 1;
    if (f !== p) {
      for (f += l; a[f % l].skip; )
        f -= k;
      for (; a[p % l].skip; )
        p += k;
      f % l !== p % l && (c.push({
        start: f % l,
        end: p % l,
        loop: y,
        style: v
      }), u = v, h = p % l);
    }
  }
  for (const f of t) {
    h = r ? h : f.start;
    let p = a[h % l], y;
    for (g = h + 1; g <= f.end; g++) {
      const v = a[g % l];
      y = cs(n.setContext(ma(o, {
        type: "segment",
        p0: p,
        p1: v,
        p0DataIndex: (g - 1) % l,
        p1DataIndex: g % l,
        datasetIndex: i
      }))), Wc(y, u) && b(h, g - 1, f.loop, u), p = v, u = y;
    }
    h < g - 1 && b(h, g - 1, f.loop, u);
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
    return vo(s) ? (a.includes(s) || a.push(s), a.indexOf(s)) : s;
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
    if (!Be(t))
      return;
    const a = Object.keys(Ye.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Be(s))
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
      let h = s[c];
      const g = n.get(c);
      if (h)
        if (g && h.active()) {
          h.update(g, u, r);
          continue;
        } else
          h.cancel();
      if (!g || !g.duration) {
        t[c] = u;
        continue;
      }
      s[c] = h = new Xc(g, t, c, u), o.push(h);
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
  return Be(e) ? (t = e.top, a = e.right, n = e.bottom, o = e.left) : t = a = n = o = e, {
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
function Nn(e, t) {
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
  const { chart: a, _cachedMeta: n } = e, o = a._stacks || (a._stacks = {}), { iScale: s, vScale: i, index: r } = n, l = s.axis, c = i.axis, u = td(s, i, n), h = t.length;
  let g;
  for (let b = 0; b < h; ++b) {
    const f = t[b], { [l]: p, [c]: y } = f, v = f._stacks || (f._stacks = {});
    g = v[c] = nd(o, u, p), g[r] = y, g._top = fs(g, i, !0, n.type), g._bottom = fs(g, i, !1, n.type);
    const k = g._visualValues || (g._visualValues = {});
    k[r] = y;
  }
}
function jn(e, t) {
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
const Hn = (e) => e === "reset" || e === "none", ms = (e, t) => t ? e : Object.assign({}, e), id = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: Yi(a, !0),
  values: null
};
class Rn {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Nn(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Aa(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), o = (h, g, b, f) => h === "x" ? g : h === "r" ? f : b, s = a.xAxisID = De(n.xAxisID, jn(t, "x")), i = a.yAxisID = De(n.yAxisID, jn(t, "y")), r = a.rAxisID = De(n.rAxisID, jn(t, "r")), l = a.indexAxis, c = a.iAxisID = o(l, s, i, r), u = a.vAxisID = o(l, i, s, r);
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
    if (Be(a)) {
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
    a._stacked = Nn(a.vScale, a), a.stack !== n.stack && (o = !0, Aa(a), a.stack = n.stack), this._resyncElements(t), (o || s !== a._stacked) && (gs(this, a._parsed), a._stacked = Nn(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: n, _data: o } = this, { iScale: s, _stacked: i } = n, r = s.axis;
    let l = t === 0 && a === o.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], u, h, g;
    if (this._parsing === !1)
      n._parsed = o, n._sorted = !0, g = o;
    else {
      Ze(o[t]) ? g = this.parseArrayData(n, o, t, a) : Be(o[t]) ? g = this.parseObjectData(n, o, t, a) : g = this.parsePrimitiveData(n, o, t, a);
      const b = () => h[r] === null || c && h[r] < c[r];
      for (u = 0; u < a; ++u)
        n._parsed[u + t] = h = g[u], l && (b() && (l = !1), c = h);
      n._sorted = l;
    }
    i && gs(this, g);
  }
  parsePrimitiveData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, r = s.axis, l = i.axis, c = s.getLabels(), u = s === i, h = new Array(o);
    let g, b, f;
    for (g = 0, b = o; g < b; ++g)
      f = g + n, h[g] = {
        [r]: u || s.parse(c[f], f),
        [l]: i.parse(a[f], f)
      };
    return h;
  }
  parseArrayData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, r = new Array(o);
    let l, c, u, h;
    for (l = 0, c = o; l < c; ++l)
      u = l + n, h = a[u], r[l] = {
        x: s.parse(h[0], u),
        y: i.parse(h[1], u)
      };
    return r;
  }
  parseObjectData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(o);
    let u, h, g, b;
    for (u = 0, h = o; u < h; ++u)
      g = u + n, b = a[g], c[u] = {
        x: s.parse(fa(b, r), g),
        y: i.parse(fa(b, l), g)
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
    }, { min: u, max: h } = ad(r);
    let g, b;
    function f() {
      b = o[g];
      const p = b[r.axis];
      return !_t(b[t.axis]) || u > p || h < p;
    }
    for (g = 0; g < i && !(!f() && (this.updateRangeFromParsed(c, t, b, l), s)); ++g)
      ;
    if (s) {
      for (g = i - 1; g >= 0; --g)
        if (!f()) {
          this.updateRangeFromParsed(c, t, b, l);
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
      const h = o[u];
      h.hidden || (h.active && c ? i.push(h) : h.draw(t, s));
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
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), h = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], g = c.getOptionScopes(this.getDataset(), u), b = Object.keys(Ye.elements[t]), f = () => this.getContext(n, o, a), p = c.resolveNamedOptions(g, b, f, h);
    return p.$shared && (p.$shared = l, s[i] = Object.freeze(ms(p, l))), p;
  }
  _resolveAnimations(t, a, n) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${a}`, r = s[i];
    if (r)
      return r;
    let l;
    if (o.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, a), g = u.getOptionScopes(this.getDataset(), h);
      l = u.createResolver(g, this.getContext(t, n, a));
    }
    const c = new Ui(o, l && l.animations);
    return l && l._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || Hn(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const n = this.resolveDataElementOptions(t, a), o = this._sharedOptions, s = this.getSharedOptions(n), i = this.includeOptions(a, s) || s !== o;
    return this.updateSharedOptions(s, a, n), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, a, n, o) {
    Hn(o) ? Object.assign(t, n) : this._resolveAnimations(a, o).update(t, n);
  }
  updateSharedOptions(t, a, n) {
    t && !Hn(a) && this._resolveAnimations(void 0, a).update(t, n);
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
  let c, u, h, g;
  for (c = a, u = a + n; c < u; ++c)
    g = t[c], h = {}, h[o.axis] = r || o.parse(i[c], c), l.push(qi(g, h, s, c));
  return l;
}
function Wn(e) {
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
class bd extends Rn {
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
    const { iScale: s, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = s.axis === "x" ? r : l, u = i.axis === "x" ? r : l, h = [];
    let g, b, f, p;
    for (g = n, b = n + o; g < b; ++g)
      p = a[g], f = {}, f[s.axis] = s.parse(fa(p, c), g), h.push(qi(fa(p, u), f, i, g));
    return h;
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
    const a = this._cachedMeta, { iScale: n, vScale: o } = a, s = this.getParsed(t), i = s._custom, r = Wn(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
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
    const s = o === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: g } = this._getSharedOptions(a, o);
    for (let b = a; b < a + n; b++) {
      const f = this.getParsed(b), p = s || Ee(f[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(b), y = this._calculateBarIndexPixels(b, u), v = (f._stacks || {})[r.axis], k = {
        horizontal: c,
        base: p.base,
        enableBorderRadius: !v || Wn(f._custom) || i === v._top || i === v._bottom,
        x: c ? p.head : y.center,
        y: c ? y.center : p.head,
        height: c ? y.size : Math.abs(p.size),
        width: c ? Math.abs(p.size) : y.size
      };
      g && (k.options = h || this.resolveDataElementOptions(b, t[b].active ? "active" : o));
      const w = k.options || t[b].options;
      gd(k, w, v, i), pd(k, w, u.ratio), this.updateElement(t[b], b, k, o);
    }
  }
  _getStacks(t, a) {
    const { iScale: n } = this._cachedMeta, o = n.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), s = n.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), l = r && r[n.axis], c = (u) => {
      const h = u._parsed.find((b) => b[n.axis] === l), g = h && h[u.vScale.axis];
      if (Ee(g) || isNaN(g))
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
    const { _cachedMeta: { vScale: a, _stacked: n, index: o }, options: { base: s, minBarLength: i } } = this, r = s || 0, l = this.getParsed(t), c = l._custom, u = Wn(c);
    let h = l[a.axis], g = 0, b = n ? this.applyStack(a, l, n) : h, f, p;
    b !== h && (g = b - h, b = h), u && (h = c.barStart, b = c.barEnd - c.barStart, h !== 0 && Pt(h) !== Pt(c.barEnd) && (g = 0), g += h);
    const y = !Ee(s) && !u ? s : g;
    let v = a.getPixelForValue(y);
    if (this.chart.getDataVisibility(t) ? f = a.getPixelForValue(g + b) : f = v, p = f - v, Math.abs(p) < i) {
      p = hd(p, a, r) * i, h === r && (v -= p / 2);
      const k = a.getPixelForDecimal(0), w = a.getPixelForDecimal(1), _ = Math.min(k, w), $ = Math.max(k, w);
      v = Math.max(Math.min(v, $), _), f = v + p, n && !u && (l._stacks[a.axis]._visualValues[o] = a.getValueForPixel(f) - a.getValueForPixel(v));
    }
    if (v === a.getPixelForValue(r)) {
      const k = Pt(p) * a.getLineWidthForValue(r) / 2;
      v += k, p -= k;
    }
    return {
      size: p,
      base: v,
      head: f,
      center: f + p / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const n = a.scale, o = this.options, s = o.skipNull, i = De(o.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (a.grouped) {
      const u = s ? this._getStackCount(t) : a.stackCount, h = o.barThickness === "flex" ? dd(t, a, o, u * c) : cd(t, a, o, u * c), g = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, b = this._getAxis().indexOf(De(g, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + b;
      r = h.start + h.chunk * f + h.chunk / 2, l = Math.min(i, h.chunk * h.ratio);
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
    const r = e, l = r + t, c = Math.cos(r), u = Math.sin(r), h = Math.cos(l), g = Math.sin(l), b = (w, _, $) => qa(w, r, l, !0) ? 1 : Math.max(_, _ * a, $, $ * a), f = (w, _, $) => qa(w, r, l, !0) ? -1 : Math.min(_, _ * a, $, $ * a), p = b(0, c, h), y = b(Qe, u, g), v = f(Oe, c, h), k = f(Oe + Qe, u, g);
    n = (p - v) / 2, o = (y - k) / 2, s = -(p + v) / 2, i = -(y + k) / 2;
  }
  return {
    ratioX: n,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class yd extends Rn {
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
              const h = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: l,
                fillStyle: h.backgroundColor,
                fontColor: s,
                hidden: !t.getDataVisibility(c),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: o,
                pointStyle: n,
                borderRadius: i && (r || h.borderRadius),
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
      if (Be(n[t])) {
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
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - i) / 2, 0), l = Math.min(_l(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: g, ratioY: b, offsetX: f, offsetY: p } = vd(h, u, l), y = (n.width - i) / g, v = (n.height - i) / b, k = Math.max(Math.min(y, v) / 2, 0), w = Mi(this.options.radius, k), _ = Math.max(w * l, 0), $ = (w - _) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * w, this.offsetY = p * w, o.total = this.calculateTotal(), this.outerRadius = w - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ue);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, r = i.chartArea, c = i.options.animation, u = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, g = s && c.animateScale, b = g ? 0 : this.innerRadius, f = g ? 0 : this.outerRadius, { sharedOptions: p, includeOptions: y } = this._getSharedOptions(a, o);
    let v = this._getRotation(), k;
    for (k = 0; k < a; ++k)
      v += this._circumference(k, s);
    for (k = a; k < a + n; ++k) {
      const w = this._circumference(k, s), _ = t[k], $ = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: v,
        endAngle: v + w,
        circumference: w,
        outerRadius: f,
        innerRadius: b
      };
      y && ($.options = p || this.resolveDataElementOptions(k, _.active ? "active" : o)), v += w, this.updateElement(_, k, $, o);
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
    const a = this._cachedMeta, n = this.chart, o = n.data.labels || [], s = yo(a._parsed[t], n.options.locale);
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
class xd extends Rn {
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
    const s = o === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(a, o), g = i.axis, b = r.axis, { spanGaps: f, segment: p } = this.options, y = Ya(f) ? f : Number.POSITIVE_INFINITY, v = this.chart._animationsDisabled || s || o === "none", k = a + n, w = t.length;
    let _ = a > 0 && this.getParsed(a - 1);
    for (let $ = 0; $ < w; ++$) {
      const S = t[$], M = v ? S : {};
      if ($ < a || $ >= k) {
        M.skip = !0;
        continue;
      }
      const I = this.getParsed($), V = Ee(I[b]), W = M[g] = i.getPixelForValue(I[g], $), D = M[b] = s || V ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, I, l) : I[b], $);
      M.skip = isNaN(W) || isNaN(D) || V, M.stop = $ > 0 && Math.abs(I[g] - _[g]) > y, p && (M.parsed = I, M.raw = c.data[$]), h && (M.options = u || this.resolveDataElementOptions($, S.active ? "active" : o)), v || this.updateElement(S, $, M, o), _ = I;
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
class Do {
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
    Object.assign(Do.prototype, t);
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
  _date: Do
};
function wd(e, t, a, n) {
  const { controller: o, data: s, _sorted: i } = e, r = o._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && s.length) {
    const c = r._reversePixels ? Fl : ua;
    if (n) {
      if (o._sharedOptions) {
        const u = s[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const g = c(s, t, a - h), b = c(s, t, a + h);
          return {
            lo: g.lo,
            hi: b.hi
          };
        }
      }
    } else {
      const u = c(s, t, a);
      if (l) {
        const { vScale: h } = o._cachedMeta, { _parsed: g } = e, b = g.slice(0, u.lo + 1).reverse().findIndex((p) => !Ee(p[h.axis]));
        u.lo -= Math.max(0, b);
        const f = g.slice(u.hi).findIndex((p) => !Ee(p[h.axis]));
        u.hi += Math.max(0, f);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function Pn(e, t, a, n, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let r = 0, l = s.length; r < l; ++r) {
    const { index: c, data: u } = s[r], { lo: h, hi: g } = wd(s[r], t, i, o);
    for (let b = h; b <= g; ++b) {
      const f = u[b];
      f.skip || n(f, c, b);
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
function Kn(e, t, a, n, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || Pn(e, a, t, function(r, l, c) {
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
    ], n), { angle: h } = Ti(i, {
      x: t.x,
      y: t.y
    });
    qa(h, c, u) && o.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return Pn(e, a, t, s), o;
}
function Sd(e, t, a, n, o, s) {
  let i = [];
  const r = Cd(a);
  let l = Number.POSITIVE_INFINITY;
  function c(u, h, g) {
    const b = u.inRange(t.x, t.y, o);
    if (n && !b)
      return;
    const f = u.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(f)) && !b)
      return;
    const y = r(t, f);
    y < l ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: g
      }
    ], l = y) : y === l && i.push({
      element: u,
      datasetIndex: h,
      index: g
    });
  }
  return Pn(e, a, t, c), i;
}
function Un(e, t, a, n, o, s) {
  return !s && !e.isPointInArea(t) ? [] : a === "r" && !n ? $d(e, t, a, o) : Sd(e, t, a, n, o, s);
}
function ys(e, t, a, n, o) {
  const s = [], i = a === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Pn(e, a, t, (l, c, u) => {
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
      const o = ca(t, e), s = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? Kn(e, o, s, n, i) : Un(e, o, s, !1, n, i), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const u = r[0].index, h = c.data[u];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: c.index,
          index: u
        });
      }), l) : [];
    },
    dataset(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      let r = a.intersect ? Kn(e, o, s, n, i) : Un(e, o, s, !1, n, i);
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
      return Kn(e, o, s, n, i);
    },
    nearest(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Un(e, o, s, a.intersect, n, i);
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
  if (!Be(o)) {
    a.size && (e[o] -= a.size);
    const h = n[a.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, a.horizontal ? s.height : s.width), a.size = h.size / h.count, e[o] += a.size;
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
    const { same: h, other: g } = Ld(t, a, r, n);
    c |= h && o.length, u = u || g, l.fullSize || o.push(r);
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
      const h = t.w * u, g = c.size || l.height;
      Ua(c.start) && (i = c.start), l.fullSize ? hn(l, o.left, i, a.outerWidth - o.right - o.left, g) : hn(l, t.left + c.placed, i, h, g), c.start = i, c.placed += h, i = l.bottom;
    } else {
      const h = t.h * u, g = c.size || l.width;
      Ua(c.start) && (s = c.start), l.fullSize ? hn(l, s, o.top, g, a.outerHeight - o.bottom - o.top) : hn(l, s, t.top + c.placed, g, h), c.start = s, c.placed += h, s = l.right;
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
    Fe(e.boxes, (p) => {
      typeof p.beforeLayout == "function" && p.beforeLayout();
    });
    const u = l.reduce((p, y) => y.box.options && y.box.options.display === !1 ? p : p + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / u,
      hBoxMaxHeight: i / 2
    }), g = Object.assign({}, o);
    Gi(g, wt(n));
    const b = Object.assign({
      maxPadding: g,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), f = Td(l.concat(c), h);
    Oa(r.fullSize, b, h, f), Oa(l, b, h, f), Oa(c, b, h, f) && Oa(l, b, h, f), Rd(b), _s(r.leftAndTop, b, h, f), b.x += b.w, b.y += b.h, _s(r.rightAndBottom, b, h, f), e.chartArea = {
      left: b.left,
      top: b.top,
      right: b.left + b.w,
      bottom: b.top + b.h,
      height: b.h,
      width: b.w
    }, Fe(r.chartArea, (p) => {
      const y = p.box;
      Object.assign(y, e.chartArea), y.update(b.w, b.h, {
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
  const n = e.canvas, o = n && Mo(n);
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
function Yn(e, t, a) {
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
      attach: Yn,
      detach: Yn,
      resize: Yn
    }[a] || Vd)(t, a, o), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, o) {
    return Bc(t, a, n, o);
  }
  isAttached(t) {
    const a = t && Mo(t);
    return !!(a && a.isConnected);
  }
}
function qd(e) {
  return !So() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Id : Yd;
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
    let h, g;
    const b = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (fn(t, c, u, Ee(b) ? 0 : r - b, r), h = 0, g = i - 1; h < g; h++)
      fn(t, c, u, s[h], s[h + 1]);
    return fn(t, c, u, l, Ee(b) ? t.length : l + b), c;
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
  let n = bo(e);
  return (a && t !== "right" || !a && t === "right") && (n = tu(n)), n;
}
function ru(e, t, a, n) {
  const { top: o, left: s, bottom: i, right: r, chart: l } = e, { chartArea: c, scales: u } = l;
  let h = 0, g, b, f;
  const p = i - o, y = r - s;
  if (e.isHorizontal()) {
    if (b = tt(n, s, r), Be(a)) {
      const v = Object.keys(a)[0], k = a[v];
      f = u[v].getPixelForValue(k) + p - t;
    } else a === "center" ? f = (c.bottom + c.top) / 2 + p - t : f = $s(e, a, t);
    g = r - s;
  } else {
    if (Be(a)) {
      const v = Object.keys(a)[0], k = a[v];
      b = u[v].getPixelForValue(k) - y + t;
    } else a === "center" ? b = (c.left + c.right) / 2 - y + t : b = $s(e, a, t);
    f = tt(n, i, o), h = a === "left" ? -Qe : Qe;
  }
  return {
    titleX: b,
    titleY: f,
    maxWidth: g,
    rotation: h
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
    const u = this._getLabelSizes(), h = u.widest.width, g = u.highest.height, b = ot(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / n : b / (n - 1), h + 6 > r && (r = b / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - La(t.grid) - a.padding - Ds(t.title, this.chart.options.font), c = Math.sqrt(h * h + g * g), i = Pl(Math.min(Math.asin(ot((u.highest.height + 6) / r, -1, 1)), Math.asin(ot(l / c, -1, 1)) - Math.asin(ot(g / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
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
        const { first: c, last: u, widest: h, highest: g } = this._getLabelSizes(), b = n.padding * 2, f = zt(this.labelRotation), p = Math.cos(f), y = Math.sin(f);
        if (r) {
          const v = n.mirror ? 0 : y * h.width + p * g.height;
          t.height = Math.min(this.maxHeight, t.height + v + b);
        } else {
          const v = n.mirror ? 0 : p * h.width + y * g.height;
          t.width = Math.min(this.maxWidth, t.width + v + b);
        }
        this._calculatePadding(c, u, y, p);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, n, o) {
    const { ticks: { align: s, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let g = 0, b = 0;
      l ? c ? (g = o * t.width, b = n * a.height) : (g = n * t.height, b = o * a.width) : s === "start" ? b = a.width : s === "end" ? g = t.width : s !== "inner" && (g = t.width / 2, b = a.width / 2), this.paddingLeft = Math.max((g - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((b - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = a.height / 2, h = t.height / 2;
      s === "start" ? (u = 0, h = t.height) : s === "end" && (u = a.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
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
    let c = 0, u = 0, h, g, b, f, p, y, v, k, w, _, $;
    for (h = 0; h < a; h += l) {
      if (f = t[h].label, p = this._resolveTickFontOptions(h), o.font = y = p.string, v = s[y] = s[y] || {
        data: {},
        gc: []
      }, k = p.lineHeight, w = _ = 0, !Ee(f) && !Ze(f))
        w = ts(o, v.data, v.gc, w, f), _ = k;
      else if (Ze(f))
        for (g = 0, b = f.length; g < b; ++g)
          $ = f[g], !Ee($) && !Ze($) && (w = ts(o, v.data, v.gc, w, $), _ += k);
      i.push(w), r.push(_), c = Math.max(w, c), u = Math.max(_, u);
    }
    nu(s, a);
    const S = i.indexOf(c), M = r.indexOf(u), I = (V) => ({
      width: i[V] || 0,
      height: r[V] || 0
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
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: r } = o, l = s.offset, c = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), g = La(s), b = [], f = r.setContext(this.getContext()), p = f.display ? f.width : 0, y = p / 2, v = function(Q) {
      return ia(n, Q, p);
    };
    let k, w, _, $, S, M, I, V, W, D, P, B;
    if (i === "top")
      k = v(this.bottom), M = this.bottom - g, V = k - y, D = v(t.top) + y, B = t.bottom;
    else if (i === "bottom")
      k = v(this.top), D = t.top, B = v(t.bottom) - y, M = k + y, V = this.top + g;
    else if (i === "left")
      k = v(this.right), S = this.right - g, I = k - y, W = v(t.left) + y, P = t.right;
    else if (i === "right")
      k = v(this.left), W = t.left, P = v(t.right) - y, S = k + y, I = this.left + g;
    else if (a === "x") {
      if (i === "center")
        k = v((t.top + t.bottom) / 2 + 0.5);
      else if (Be(i)) {
        const Q = Object.keys(i)[0], X = i[Q];
        k = v(this.chart.scales[Q].getPixelForValue(X));
      }
      D = t.top, B = t.bottom, M = k + y, V = M + g;
    } else if (a === "y") {
      if (i === "center")
        k = v((t.left + t.right) / 2);
      else if (Be(i)) {
        const Q = Object.keys(i)[0], X = i[Q];
        k = v(this.chart.scales[Q].getPixelForValue(X));
      }
      S = k - y, I = S - g, W = t.left, P = t.right;
    }
    const N = De(o.ticks.maxTicksLimit, h), j = Math.max(1, Math.ceil(h / N));
    for (w = 0; w < h; w += j) {
      const Q = this.getContext(w), X = s.setContext(Q), re = r.setContext(Q), H = X.lineWidth, ae = X.color, L = re.dash || [], Y = re.dashOffset, q = X.tickWidth, G = X.tickColor, ue = X.tickBorderDash || [], me = X.tickBorderDashOffset;
      _ = au(this, w, l), _ !== void 0 && ($ = ia(n, _, H), c ? S = I = W = P = $ : M = V = D = B = $, b.push({
        tx1: S,
        ty1: M,
        tx2: I,
        ty2: V,
        x1: W,
        y1: D,
        x2: P,
        y2: B,
        width: H,
        color: ae,
        borderDash: L,
        borderDashOffset: Y,
        tickWidth: q,
        tickColor: G,
        tickBorderDash: ue,
        tickBorderDashOffset: me
      }));
    }
    return this._ticksLength = h, this._borderValue = k, b;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: u, mirror: h } = s, g = La(n.grid), b = g + u, f = h ? -u : b, p = -zt(this.labelRotation), y = [];
    let v, k, w, _, $, S, M, I, V, W, D, P, B = "middle";
    if (o === "top")
      S = this.bottom - f, M = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      S = this.top + f, M = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const j = this._getYAxisLabelAlignment(g);
      M = j.textAlign, $ = j.x;
    } else if (o === "right") {
      const j = this._getYAxisLabelAlignment(g);
      M = j.textAlign, $ = j.x;
    } else if (a === "x") {
      if (o === "center")
        S = (t.top + t.bottom) / 2 + b;
      else if (Be(o)) {
        const j = Object.keys(o)[0], Q = o[j];
        S = this.chart.scales[j].getPixelForValue(Q) + b;
      }
      M = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - b;
      else if (Be(o)) {
        const j = Object.keys(o)[0], Q = o[j];
        $ = this.chart.scales[j].getPixelForValue(Q);
      }
      M = this._getYAxisLabelAlignment(g).textAlign;
    }
    a === "y" && (l === "start" ? B = "top" : l === "end" && (B = "bottom"));
    const N = this._getLabelSizes();
    for (v = 0, k = r.length; v < k; ++v) {
      w = r[v], _ = w.label;
      const j = s.setContext(this.getContext(v));
      I = this.getPixelForTick(v) + s.labelOffset, V = this._resolveTickFontOptions(v), W = V.lineHeight, D = Ze(_) ? _.length : 1;
      const Q = D / 2, X = j.color, re = j.textStrokeColor, H = j.textStrokeWidth;
      let ae = M;
      i ? ($ = I, M === "inner" && (v === k - 1 ? ae = this.options.reverse ? "left" : "right" : v === 0 ? ae = this.options.reverse ? "right" : "left" : ae = "center"), o === "top" ? c === "near" || p !== 0 ? P = -D * W + W / 2 : c === "center" ? P = -N.highest.height / 2 - Q * W + W : P = -N.highest.height + W / 2 : c === "near" || p !== 0 ? P = W / 2 : c === "center" ? P = N.highest.height / 2 - Q * W : P = N.highest.height - D * W, h && (P *= -1), p !== 0 && !j.showLabelBackdrop && ($ += W / 2 * Math.sin(p))) : (S = I, P = (1 - D) * W / 2);
      let L;
      if (j.showLabelBackdrop) {
        const Y = wt(j.backdropPadding), q = N.heights[v], G = N.widths[v];
        let ue = P - Y.top, me = 0 - Y.left;
        switch (B) {
          case "middle":
            ue -= q / 2;
            break;
          case "bottom":
            ue -= q;
            break;
        }
        switch (M) {
          case "center":
            me -= G / 2;
            break;
          case "right":
            me -= G;
            break;
          case "inner":
            v === k - 1 ? me -= G : v > 0 && (me -= G / 2);
            break;
        }
        L = {
          left: me,
          top: ue,
          width: G + Y.width,
          height: q + Y.height,
          color: j.backdropColor
        };
      }
      y.push({
        label: _,
        font: V,
        textOffset: P,
        options: {
          rotation: p,
          color: X,
          strokeColor: re,
          strokeWidth: H,
          textAlign: ae,
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
    let c, u, h, g;
    this.isHorizontal() ? (c = ia(t, this.left, i) - i / 2, u = ia(t, this.right, r) + r / 2, h = g = l) : (h = ia(t, this.top, i) - i / 2, g = ia(t, this.bottom, r) + r / 2, c = u = l), a.save(), a.lineWidth = s.width, a.strokeStyle = s.color, a.beginPath(), a.moveTo(c, h), a.lineTo(u, g), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, o = this._computeLabelArea();
    o && xo(n, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const r = i.options, l = i.font, c = i.label, u = i.textOffset;
      Ga(n, c, 0, u, l, r);
    }
    o && ko(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: n, reverse: o } } = this;
    if (!n.display)
      return;
    const s = st(n.font), i = wt(n.padding), r = n.align;
    let l = s.lineHeight / 2;
    a === "bottom" || a === "center" || Be(a) ? (l += i.bottom, Ze(n.text) && (l += s.lineHeight * (n.text.length - 1))) : l += i.top;
    const { titleX: c, titleY: u, maxWidth: h, rotation: g } = ru(this, l, a, r);
    Ga(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: h,
      rotation: g,
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
    this.controllers = new gn(Rn, "datasets", !0), this.elements = new gn(Wt, "elements"), this.plugins = new gn(Object, "plugins"), this.scales = new gn(Da, "scales"), this._typedRegistries = [
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
    const o = mo(t);
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
function oo(e, t) {
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
function so(e, ...t) {
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
  }, n = t.scales || {}, o = oo(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const r = n[i];
    if (!Be(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = so(i, r, xu(i, e), Ye.scales[r.type]), c = vu(l, o), u = a.scales || {};
    s[i] = za(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || oo(r, t), u = (ga[r] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const g = bu(h, l), b = i[g + "AxisID"] || g;
      s[b] = s[b] || /* @__PURE__ */ Object.create(null), za(s[b], [
        {
          axis: g
        },
        n[b],
        u[h]
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
      t && (l.add(t), u.forEach((h) => Ra(l, t, h))), u.forEach((h) => Ra(l, o, h)), u.forEach((h) => Ra(l, ga[s] || {}, h)), u.forEach((h) => Ra(l, Ye, h)), u.forEach((h) => Ra(l, ao, h));
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
      ao
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
    return Be(a) ? $a(s, a, void 0, o) : s;
  }
}
function Ls(e, t, a) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const o = a.join();
  let s = n.get(o);
  return s || (s = {
    resolver: wo(t, a),
    subPrefixes: a.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(o, s)), s;
}
const Cu = (e) => Be(e) && Object.getOwnPropertyNames(e).some((t) => Jt(e[t]));
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
  return So() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
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
    if (this.id = kl(), this.ctx = r, this.canvas = l, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new hu(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = zl((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], _n[this.id] = this, !r || !l) {
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
      const r = a[i], l = so(i, r), c = l === "r", u = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), Fe(s, (i) => {
      const r = i.options, l = r.id, c = so(l, r), u = De(r.type, i.dtype);
      (r.position === void 0 || Rs(r.position, c) !== Rs(i.dposition)) && (r.position = i.dposition), o[l] = !0;
      let h = null;
      if (l in n && n[l].type === u)
        h = n[l];
      else {
        const g = Lt.getScale(u);
        h = new g({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), n[h.id] = h;
      }
      h.init(r, t);
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
      if (i.type && i.type !== r && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = r, i.indexAxis = s.indexAxis || oo(r, this.options), i.order = s.order || 0, i.index = n, i.label = "" + s.label, i.visible = this.isDatasetVisible(n), i.controller)
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
      const { controller: h } = this.getDatasetMeta(c), g = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(g), i = Math.max(+h.getMaxOverflow(), i);
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
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (o && xo(a, o), t.controller.draw(), o && ko(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
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
    const o = this.options.hover, s = (l, c) => l.filter((u) => !c.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), i = s(a, t), r = n ? t : s(t, a);
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
  const { startAngle: n, x: o, y: s, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: u } = l, h = Math.min(c / i, Ct(n - a));
  if (e.beginPath(), e.arc(o, s, i - c / 2, n + h / 2, a - h / 2), r > 0) {
    const g = Math.min(c / r, Ct(n - a));
    e.arc(o, s, r + c / 2, a - g / 2, n + g / 2, !0);
  } else {
    const g = Math.min(c / 2, i * Ct(n - a));
    if (u === "round")
      e.arc(o, s, g, a - Oe / 2, n + Oe / 2, !0);
    else if (u === "bevel") {
      const b = 2 * g * g, f = -b * Math.cos(a + Oe / 2) + o, p = -b * Math.sin(a + Oe / 2) + s, y = b * Math.cos(n + Oe / 2) + o, v = b * Math.sin(n + Oe / 2) + s;
      e.lineTo(f, p), e.lineTo(y, v);
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
  return _o(e, [
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
  const { x: i, y: r, startAngle: l, pixelMargin: c, innerRadius: u } = t, h = Math.max(t.outerRadius + n + a - c, 0), g = u > 0 ? u + n + a + c : 0;
  let b = 0;
  const f = o - l;
  if (n) {
    const j = u > 0 ? u - n : 0, Q = h > 0 ? h - n : 0, X = (j + Q) / 2, re = X !== 0 ? f * X / (X + n) : f;
    b = (f - re) / 2;
  }
  const p = Math.max(1e-3, f * h - a / Oe) / h, y = (f - p) / 2, v = l + y + b, k = o - y - b, { outerStart: w, outerEnd: _, innerStart: $, innerEnd: S } = Pu(t, g, h, k - v), M = h - w, I = h - _, V = v + w / M, W = k - _ / I, D = g + $, P = g + S, B = v + $ / D, N = k - S / P;
  if (e.beginPath(), s) {
    const j = (V + W) / 2;
    if (e.arc(i, r, h, V, j), e.arc(i, r, h, j, W), _ > 0) {
      const H = va(I, W, i, r);
      e.arc(H.x, H.y, _, W, k + Qe);
    }
    const Q = va(P, k, i, r);
    if (e.lineTo(Q.x, Q.y), S > 0) {
      const H = va(P, N, i, r);
      e.arc(H.x, H.y, S, k + Qe, N + Math.PI);
    }
    const X = (k - S / g + (v + $ / g)) / 2;
    if (e.arc(i, r, g, k - S / g, X, !0), e.arc(i, r, g, X, v + $ / g, !0), $ > 0) {
      const H = va(D, B, i, r);
      e.arc(H.x, H.y, $, B + Math.PI, v - Qe);
    }
    const re = va(M, v, i, r);
    if (e.lineTo(re.x, re.y), w > 0) {
      const H = va(M, V, i, r);
      e.arc(H.x, H.y, w, v - Qe, V);
    }
  } else {
    e.moveTo(i, r);
    const j = Math.cos(V) * h + i, Q = Math.sin(V) * h + r;
    e.lineTo(j, Q);
    const X = Math.cos(W) * h + i, re = Math.sin(W) * h + r;
    e.lineTo(X, re);
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
  const { fullCircles: s, startAngle: i, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: u, borderDash: h, borderDashOffset: g, borderRadius: b } = l, f = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = g, f ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let p = t.endAngle;
  if (s) {
    Tn(e, t, a, n, p, o);
    for (let y = 0; y < s; ++y)
      e.stroke();
    isNaN(r) || (p = i + (r % Ue || Ue));
  }
  f && Lu(e, t, p), l.selfJoin && p - i >= Oe && b === 0 && u !== "miter" && Bu(e, t, p), s || (Tn(e, t, a, n, p, o), e.stroke());
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
    }), { startAngle: r, endAngle: l, innerRadius: c, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), g = (this.options.spacing + this.options.borderWidth) / 2, b = De(h, l - r), f = qa(s, r, l) && r !== l, p = b >= Ue || f, y = qt(i, c + g, u + g);
    return p && y;
  }
  getCenterPoint(t) {
    const { x: a, y: n, startAngle: o, endAngle: s, innerRadius: i, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, u = (o + s) / 2, h = (i + r + c + l) / 2;
    return {
      x: a + Math.cos(u) * h,
      y: n + Math.sin(u) * h
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
  let { move: h = !0, reverse: g } = n || {}, b, f, p;
  for (b = 0; b <= c; ++b)
    f = o[(r + (g ? c - b : b)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : u(e, p, f, g, s.stepped), p = f);
  return l && (f = o[(r + (g ? c : 0)) % i], u(e, p, f, g, s.stepped)), !!l;
}
function Nu(e, t, a, n) {
  const o = t.points, { count: s, start: i, ilen: r } = sr(o, a, n), { move: l = !0, reverse: c } = n || {};
  let u = 0, h = 0, g, b, f, p, y, v;
  const k = (_) => (i + (c ? r - _ : _)) % s, w = () => {
    p !== y && (e.lineTo(u, y), e.lineTo(u, p), e.lineTo(u, v));
  };
  for (l && (b = o[k(0)], e.moveTo(b.x, b.y)), g = 0; g <= r; ++g) {
    if (b = o[k(g)], b.skip)
      continue;
    const _ = b.x, $ = b.y, S = _ | 0;
    S === f ? ($ < p ? p = $ : $ > y && (y = $), u = (h * u + _) / ++h) : (w(), e.lineTo(_, $), f = S, h = 0, p = y = $), v = $;
  }
  w();
}
function io(e) {
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
  const { segments: o, options: s } = t, i = io(t);
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
      const { start: h, end: g } = i[c], b = s[h], f = s[g];
      if (b === f) {
        r.push(b);
        continue;
      }
      const p = Math.abs((o - b[a]) / (f[a] - b[a])), y = l(b, f, p, n.stepped);
      y[a] = t[a], r.push(y);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, a, n) {
    return io(this)(t, this, a, n);
  }
  path(t, a, n) {
    const o = this.segments, s = io(this);
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
    this.skip || n.radius < 0.1 || !Xa(this, a, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, no(t, n, this.x, this.y));
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
  let r, l, c, u, h;
  return e.horizontal ? (h = i / 2, r = Math.min(a, o), l = Math.max(a, o), c = n - h, u = n + h) : (h = s / 2, r = a - h, l = a + h, c = Math.min(n, o), u = Math.max(n, o)), {
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
  ]), o = e.options.borderRadius, s = _a(o), i = Math.min(t, a), r = e.borderSkipped, l = n || Be(o);
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
function qn(e, t, a, n) {
  const o = t === null, s = a === null, r = e && !(o && s) && ir(e, n);
  return r && (o || qt(t, r.left, r.right)) && (s || qt(a, r.top, r.bottom));
}
function Qu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Ju(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Xn(e, t, a = {}) {
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
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), r(t, Xn(i, a, s)), t.clip(), r(t, Xn(s, -a, i)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), r(t, Xn(s, a)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, a, n) {
    return qn(this, t, a, n);
  }
  inXRange(t, a) {
    return qn(this, t, null, a);
  }
  inYRange(t, a) {
    return qn(this, null, t, a);
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
    let h = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let g = -1, b = -u;
    return this.legendItems.forEach((f, p) => {
      const y = n + a / 2 + s.measureText(f.text).width;
      (p === 0 || c[c.length - 1] + y + 2 * r > i) && (h += u, c[c.length - (p > 0 ? 0 : 1)] = 0, b += u, g++), l[p] = {
        left: 0,
        top: b,
        row: g,
        width: y,
        height: o
      }, c[c.length - 1] += y + r;
    }), h;
  }
  _fitCols(t, a, n, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let h = r, g = 0, b = 0, f = 0, p = 0;
    return this.legendItems.forEach((y, v) => {
      const { itemWidth: k, itemHeight: w } = ah(n, a, s, y, o);
      v > 0 && b + w + 2 * r > u && (h += g + r, c.push({
        width: g,
        height: b
      }), f += g + r, p++, g = b = 0), l[v] = {
        left: f,
        top: b,
        col: p,
        width: k,
        height: w
      }, g = Math.max(g, k), b += w + r;
    }), h += g, c.push({
      width: g,
      height: b
    }), h;
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
      xo(t, this), this._draw(), ko(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: n, ctx: o } = this, { align: s, labels: i } = t, r = Ye.color, l = wa(t.rtl, this.left, this.width), c = st(i.font), { padding: u } = i, h = c.size, g = h / 2;
    let b;
    this.drawTitle(), o.textAlign = l.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: f, boxHeight: p, itemHeight: y } = Vs(i, h), v = function(S, M, I) {
      if (isNaN(f) || f <= 0 || isNaN(p) || p < 0)
        return;
      o.save();
      const V = De(I.lineWidth, 1);
      if (o.fillStyle = De(I.fillStyle, r), o.lineCap = De(I.lineCap, "butt"), o.lineDashOffset = De(I.lineDashOffset, 0), o.lineJoin = De(I.lineJoin, "miter"), o.lineWidth = V, o.strokeStyle = De(I.strokeStyle, r), o.setLineDash(De(I.lineDash, [])), i.usePointStyle) {
        const W = {
          radius: p * Math.SQRT2 / 2,
          pointStyle: I.pointStyle,
          rotation: I.rotation,
          borderWidth: V
        }, D = l.xPlus(S, f / 2), P = M + g;
        Ei(o, W, D, P, i.pointStyleWidth && f);
      } else {
        const W = M + Math.max((h - p) / 2, 0), D = l.leftForLtr(S, f), P = _a(I.borderRadius);
        o.beginPath(), Object.values(P).some((B) => B !== 0) ? Mn(o, {
          x: D,
          y: W,
          w: f,
          h: p,
          radius: P
        }) : o.rect(D, W, f, p), o.fill(), V !== 0 && o.stroke();
      }
      o.restore();
    }, k = function(S, M, I) {
      Ga(o, I.text, S, M + y / 2, c, {
        strikethrough: I.hidden,
        textAlign: l.textAlign(I.textAlign)
      });
    }, w = this.isHorizontal(), _ = this._computeTitleHeight();
    w ? b = {
      x: tt(s, this.left + u, this.right - n[0]),
      y: this.top + u + _,
      line: 0
    } : b = {
      x: this.left + u,
      y: tt(s, this.top + _ + u, this.bottom - a[0].height),
      line: 0
    }, Hi(this.ctx, t.textDirection);
    const $ = y + u;
    this.legendItems.forEach((S, M) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const I = o.measureText(S.text).width, V = l.textAlign(S.textAlign || (S.textAlign = i.textAlign)), W = f + g + I;
      let D = b.x, P = b.y;
      l.setWidth(this.width), w ? M > 0 && D + W + u > this.right && (P = b.y += $, b.line++, D = b.x = tt(s, this.left + u, this.right - n[b.line])) : M > 0 && P + $ > this.bottom && (D = b.x = D + a[b.line].width + u, b.line++, P = b.y = tt(s, this.top + _ + u, this.bottom - a[b.line].height));
      const B = l.x(D);
      if (v(B, P, S), D = Nl(V, D + f + g, w ? D + W : this.right, t.rtl), k(l.x(D), P, S), w)
        b.x += W + u;
      else if (typeof S.text != "string") {
        const N = c.lineHeight;
        b.y += rr(S, N) + u;
      } else
        b.y += $;
    }), Wi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = st(a.font), o = wt(a.padding);
    if (!a.display)
      return;
    const s = wa(t.rtl, this.left, this.width), i = this.ctx, r = a.position, l = n.size / 2, c = o.top + l;
    let u, h = this.left, g = this.width;
    if (this.isHorizontal())
      g = Math.max(...this.lineWidths), u = this.top + c, h = tt(t.align, h, this.right - g);
    else {
      const f = this.columnSizes.reduce((p, y) => Math.max(p, y.height), 0);
      u = c + tt(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const b = tt(r, h, h + g);
    i.textAlign = s.textAlign(bo(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, Ga(i, a.text, b, u, n);
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
var Ao = {
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
    let l = 0, c, u, h;
    return this.isHorizontal() ? (u = tt(r, n, s), h = a + t, c = s - n) : (i.position === "left" ? (u = n + t, h = tt(r, o, a), l = Oe * -0.5) : (u = s - t, h = tt(r, a, o), l = Oe * 0.5), c = o - a), {
      titleX: u,
      titleY: h,
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
      textAlign: bo(a.align),
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
        const c = l.getCenterPoint(), u = to(t, c);
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
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: r } = t, l = st(t.bodyFont), c = st(t.titleFont), u = st(t.footerFont), h = s.length, g = o.length, b = n.length, f = wt(t.padding);
  let p = f.height, y = 0, v = n.reduce((_, $) => _ + $.before.length + $.lines.length + $.after.length, 0);
  if (v += e.beforeBody.length + e.afterBody.length, h && (p += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), v) {
    const _ = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    p += b * _ + (v - b) * l.lineHeight + (v - 1) * t.bodySpacing;
  }
  g && (p += t.footerMarginTop + g * u.lineHeight + (g - 1) * t.footerSpacing);
  let k = 0;
  const w = function(_) {
    y = Math.max(y, a.measureText(_).width + k);
  };
  return a.save(), a.font = c.string, Fe(e.title, w), a.font = l.string, Fe(e.beforeBody.concat(e.afterBody), w), k = t.displayColors ? i + 2 + t.boxPadding : 0, Fe(n, (_) => {
    Fe(_.before, w), Fe(_.lines, w), Fe(_.after, w);
  }), k = 0, a.font = u.string, Fe(e.footer, w), a.restore(), y += f.width, {
    width: y,
    height: p
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
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: r, yAlign: l } = a, c = o + s, { topLeft: u, topRight: h, bottomLeft: g, bottomRight: b } = _a(i);
  let f = uh(t, r);
  const p = hh(t, l, c);
  return l === "center" ? r === "left" ? f += c : r === "right" && (f -= c) : r === "left" ? f -= Math.max(u, g) + o : r === "right" && (f += Math.max(h, b) + o), {
    x: ot(f, 0, n.width - t.width),
    y: ot(p, 0, n.height - t.height)
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
    return t.filter && (r = r.filter((u, h, g) => t.filter(u, h, g, n))), t.itemSort && (r = r.sort((u, h) => t.itemSort(u, h, n))), Fe(r, (u) => {
      const h = Ks(t.callbacks, u);
      o.push(ct(h, "labelColor", this, u)), s.push(ct(h, "labelPointStyle", this, u)), i.push(ct(h, "labelTextColor", this, u));
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
      const l = this._size = Ns(this, n), c = Object.assign({}, r, l), u = js(this.chart, n, c), h = Hs(n, c, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, s = {
        opacity: 1,
        x: h.x,
        y: h.y,
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: u, bottomRight: h } = _a(r), { x: g, y: b } = t, { width: f, height: p } = a;
    let y, v, k, w, _, $;
    return s === "center" ? (_ = b + p / 2, o === "left" ? (y = g, v = y - i, w = _ + i, $ = _ - i) : (y = g + f, v = y + i, w = _ - i, $ = _ + i), k = y) : (o === "left" ? v = g + Math.max(l, u) + i : o === "right" ? v = g + f - Math.max(c, h) - i : v = this.caretX, s === "top" ? (w = b, _ = w - i, y = v - i, k = v + i) : (w = b + p, _ = w + i, y = v + i, k = v - i), $ = w), {
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
    const i = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = s, u = st(s.bodyFont), h = pn(this, "left", s), g = o.x(h), b = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, f = a.y + b;
    if (s.usePointStyle) {
      const p = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, y = o.leftForLtr(g, c) + c / 2, v = f + l / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, no(t, p, y, v), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, no(t, p, y, v);
    } else {
      t.lineWidth = Be(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const p = o.leftForLtr(g, c), y = o.leftForLtr(o.xPlus(g, 1), c - 2), v = _a(i.borderRadius);
      Object.values(v).some((k) => k !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, Mn(t, {
        x: p,
        y: f,
        w: c,
        h: l,
        radius: v
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Mn(t, {
        x: y,
        y: f + 1,
        w: c - 2,
        h: l - 2,
        radius: v
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(p, f, c, l), t.strokeRect(p, f, c, l), t.fillStyle = i.backgroundColor, t.fillRect(y, f + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: u } = n, h = st(n.bodyFont);
    let g = h.lineHeight, b = 0;
    const f = wa(n.rtl, this.x, this.width), p = function(I) {
      a.fillText(I, f.x(t.x + b), t.y + g / 2), t.y += g + s;
    }, y = f.textAlign(i);
    let v, k, w, _, $, S, M;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = h.string, t.x = pn(this, y, n), a.fillStyle = n.bodyColor, Fe(this.beforeBody, p), b = r && y !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, _ = 0, S = o.length; _ < S; ++_) {
      for (v = o[_], k = this.labelTextColors[_], a.fillStyle = k, Fe(v.before, p), w = v.lines, r && w.length && (this._drawColorBox(a, t, _, f, n), g = Math.max(h.lineHeight, l)), $ = 0, M = w.length; $ < M; ++$)
        p(w[$]), g = h.lineHeight;
      Fe(v.after, p);
    }
    b = 0, g = h.lineHeight, Fe(this.afterBody, p), t.y -= s;
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
    const { xAlign: s, yAlign: i } = this, { x: r, y: l } = t, { width: c, height: u } = n, { topLeft: h, topRight: g, bottomLeft: b, bottomRight: f } = _a(o.cornerRadius);
    a.fillStyle = o.backgroundColor, a.strokeStyle = o.borderColor, a.lineWidth = o.borderWidth, a.beginPath(), a.moveTo(r + h, l), i === "top" && this.drawCaret(t, a, n, o), a.lineTo(r + c - g, l), a.quadraticCurveTo(r + c, l, r + c, l + g), i === "center" && s === "right" && this.drawCaret(t, a, n, o), a.lineTo(r + c, l + u - f), a.quadraticCurveTo(r + c, l + u, r + c - f, l + u), i === "bottom" && this.drawCaret(t, a, n, o), a.lineTo(r + b, l + u), a.quadraticCurveTo(r, l + u, r, l + u - b), i === "center" && s === "left" && this.drawCaret(t, a, n, o), a.lineTo(r, l + h), a.quadraticCurveTo(r, l, r + h, l), a.closePath(), a.fill(), o.borderWidth > 0 && a.stroke();
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
var To = {
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
  const a = [], { bounds: o, step: s, min: i, max: r, precision: l, count: c, maxTicks: u, maxDigits: h, includeBounds: g } = e, b = s || 1, f = u - 1, { min: p, max: y } = t, v = !Ee(i), k = !Ee(r), w = !Ee(c), _ = (y - p) / (h + 1);
  let $ = qo((y - p) / f / b) * b, S, M, I, V;
  if ($ < 1e-14 && !v && !k)
    return [
      {
        value: p
      },
      {
        value: y
      }
    ];
  V = Math.ceil(y / $) - Math.floor(p / $), V > f && ($ = qo(V * $ / f / b) * b), Ee(l) || (S = Math.pow(10, l), $ = Math.ceil($ * S) / S), o === "ticks" ? (M = Math.floor(p / $) * $, I = Math.ceil(y / $) * $) : (M = p, I = y), v && k && s && Ll((r - i) / s, $ / 1e3) ? (V = Math.round(Math.min((r - i) / $, u)), $ = (r - i) / V, M = i, I = r) : w ? (M = v ? i : M, I = k ? r : I, V = c - 1, $ = (I - M) / V) : (V = (I - M) / $, Na(V, Math.round(V), $ / 1e3) ? V = Math.round(V) : V = Math.ceil(V));
  const W = Math.max(Xo($), Xo(M));
  S = Math.pow(10, Ee(l) ? W : l), M = Math.round(M * S) / S, I = Math.round(I * S) / S;
  let D = 0;
  for (v && (g && M !== i ? (a.push({
    value: i
  }), M < i && D++, Na(Math.round((M + D * $) * S) / S, i, qs(i, _, e)) && D++) : M < i && D++); D < V; ++D) {
    const P = Math.round((M + D * $) * S) / S;
    if (k && P > r)
      break;
    a.push({
      value: P
    });
  }
  return k && g && I !== r ? a.length && Na(a[a.length - 1].value, r, qs(r, _, e)) ? a[a.length - 1].value = r : a.push({
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
    return yo(t, this.chart.options.locale, this.options.ticks.format);
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
const In = {
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
}, ut = /* @__PURE__ */ Object.keys(In);
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
    const i = In[ut[s]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= n)
      return ut[s];
  }
  return ut[o - 1];
}
function yh(e, t, a, n, o) {
  for (let s = ut.length - 1; s >= ut.indexOf(a); s--) {
    const i = ut[s];
    if (In[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return ut[a ? ut.indexOf(a) : 0];
}
function xh(e) {
  for (let t = ut.indexOf(e) + 1, a = ut.length; t < a; ++t)
    if (In[ut[t]].common)
      return ut[t];
}
function Qs(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: o } = po(a, t), s = a[n] >= t ? a[n] : a[o];
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
    let h = a, g, b;
    if (c && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, c ? "day" : i), t.diff(n, a, i) > 1e5 * r)
      throw new Error(a + " and " + n + " are too far apart with stepSize of " + r + " " + i);
    const f = o.ticks.source === "data" && this.getDataTimestamps();
    for (g = h, b = 0; g < n; g = +t.add(g, r, i), b++)
      Qs(u, g, f);
    return (g === n || o.bounds === "ticks" || b === 1) && Qs(u, g, f), Object.keys(u).sort(Xs).map((p) => +p);
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
    const r = s.time.displayFormats, l = this._unit, c = this._majorUnit, u = l && r[l], h = c && r[c], g = n[a], b = c && h && g && g.major;
    return this._adapter.format(t, o || (b ? h : u));
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
class PM extends ei {
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
  return ki(e) ? Qn(e) : e;
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
const Dh = de({
  props: wh,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const o = se(null), s = xi(null);
    a({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: u, options: h, plugins: g, datasetIdKey: b } = e, f = Mh(u, b), p = $h(f, u);
      s.value = new ea(o.value, {
        type: c,
        data: p,
        options: {
          ...h
        },
        plugins: g
      });
    }, r = () => {
      const c = Qn(s.value);
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
      let [h, g] = c, [b, f] = u;
      const p = Qn(s.value);
      if (!p)
        return;
      let y = !1;
      if (h) {
        const v = ya(h), k = ya(b);
        v && v !== k && (Sh(p, v), y = !0);
      }
      if (g) {
        const v = ya(g.labels), k = ya(f.labels), w = ya(g.datasets), _ = ya(f.datasets);
        v !== k && (gr(p.config.data, v), y = !0), w && w !== _ && (mr(p.config.data, w, e.datasetIdKey), y = !0);
      }
      y && Ke(() => {
        l(p);
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
function Bo(e, t) {
  return ea.register(t), de({
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
const Ah = /* @__PURE__ */ Bo("bar", bd), Th = /* @__PURE__ */ Bo("line", xd), Bh = /* @__PURE__ */ Bo("pie", kd), ti = {
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
  const t = se("light");
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
const Qa = 5, Lo = 8, Rh = /^x\d*$/, Ph = /^y\d*$/;
function pr(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, a = t.scales;
  if (!a || typeof a != "object") return t;
  const n = { ...a };
  for (const o of Object.keys(n)) {
    const s = n[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, r = i.ticks, l = r && typeof r == "object" ? { ...r } : {};
    if (Rh.test(o) && (l.maxTicksLimit = Lo, l.autoSkip = !0, l.minRotation = 0, l.maxRotation = 0, l.autoSkipPadding = l.autoSkipPadding ?? 8), Ph.test(o)) {
      if (i.type === "category") {
        i.ticks = l, n[o] = i;
        continue;
      }
      if (Array.isArray(l.values) && l.values.length > 0)
        l.maxTicksLimit = l.values.length;
      else if (l.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), u = Number(i.max ?? i.suggestedMax ?? 0), h = Number(l.stepSize);
        u > c && h > 0 ? l.maxTicksLimit = Math.floor((u - c) / h) + 1 : l.maxTicksLimit = Qa;
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
        const u = { ...l }, h = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...h, family: t }, r.ticks = u;
      }
      const c = r.title;
      if (c && typeof c == "object") {
        const u = { ...c }, h = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...h, family: t }, r.title = u;
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
const ni = 10, Eh = /* @__PURE__ */ de({
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
    ea.register(ur, hr, eh, cr, To, Ao), ea.defaults.font.family = dt;
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, r = (g) => typeof g != "string" ? g : a.uppercaseLegendLabels ? g.toUpperCase() : i(g), l = (g, b) => g.length <= b ? g : `${g.slice(0, Math.max(1, b - 1))}…`;
    function c(g, b) {
      if (b == null) return g;
      if (Array.isArray(b) || typeof b != "object" || g == null || Array.isArray(g) || typeof g != "object") return b;
      const f = { ...g };
      for (const p of Object.keys(b)) {
        const y = b[p];
        y !== void 0 && (f[p] = c(g[p], y));
      }
      return f;
    }
    const u = C(() => {
      const g = {
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
              generateLabels: function(f) {
                return f.data.datasets.map((y, v) => {
                  const k = Array.isArray(y.backgroundColor) ? y.backgroundColor[0] : y.backgroundColor, w = Array.isArray(y.borderColor) ? y.borderColor[0] : y.borderColor, _ = typeof w == "string" && w.length > 0 ? w : typeof k == "string" && k.length > 0 ? k : o.value.textSecondary;
                  return {
                    text: r(y.label || ""),
                    fillStyle: typeof k == "string" ? k : _,
                    strokeStyle: _,
                    lineWidth: 0,
                    fontColor: _,
                    hidden: !f.isDatasetVisible(v),
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
              title: function(f) {
                return f.length > 0 ? String(i(f[0].label)) : "";
              },
              label: function(f) {
                let p = String(i(f.dataset.label || ""));
                p && (p += ": ");
                const v = (f.chart?.options?.indexAxis ?? "x") === "y" ? f.parsed.x : f.parsed.y;
                return v != null && (p += v), p;
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
              callback: function(f) {
                return i(f);
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
              maxTicksLimit: Lo,
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
              callback: function(f) {
                const p = this.getLabelForValue(f);
                return i(p);
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
        const { beginAtZero: f, ticks: p, ...y } = b.scales.y ?? {}, v = a.data.labels?.length ?? 0, k = a.categoryLabelMaxLength ?? 20;
        b.scales.y = {
          type: "category",
          ...y,
          ticks: {
            ...p,
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
        pr(b)
      );
    }), h = C(() => a.heightPx ?? 230);
    return t({ isDark: n }), (g, b) => (m(), x("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: we({ height: `${h.value}px` })
    }, [
      z(T(Ah), {
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
}, jh = /* @__PURE__ */ de({
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
      To,
      Ao
    ), ea.defaults.font.family = dt;
    const n = se(null), { isDark: o, colors: s } = Me($e(a, "theme")), i = C(() => s.value.bgCard), r = C(() => {
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
    const h = C(
      () => r.value.datasets.map((y, v) => ({
        key: `${y.label ?? "dataset"}-${v}`,
        label: c(y.label || ""),
        color: u(y)
      }))
    ), g = se([]);
    Te(
      () => r.value.datasets.length,
      (y) => {
        const v = Array.from({ length: y }, (k, w) => g.value[w] ?? !0);
        g.value = v;
      },
      { immediate: !0 }
    );
    function b(y) {
      const k = n.value?.chart;
      if (!k || y < 0 || y >= k.data.datasets.length) return;
      const w = !k.isDatasetVisible(y);
      k.setDatasetVisibility(y, w), g.value[y] = w, k.update();
    }
    function f(y, v) {
      if (v == null) return y;
      if (Array.isArray(v) || typeof v != "object" || y == null || Array.isArray(y) || typeof y != "object") return v;
      const k = { ...y };
      for (const w of Object.keys(v)) {
        const _ = v[w];
        _ !== void 0 && (k[w] = f(y[w], _));
      }
      return k;
    }
    const p = C(() => {
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
              maxTicksLimit: Lo,
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
      }, v = a.options ? f(y, a.options) : y;
      return br(
        pr(v)
      );
    });
    return t({ isDark: o }), (y, v) => (m(), x("div", Fh, [
      d("div", Oh, [
        z(T(Th), {
          ref_key: "lineChartRef",
          ref: n,
          data: r.value,
          options: p.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (m(), x("ul", Vh, [
        (m(!0), x(ce, null, pe(h.value, (k, w) => (m(), x("li", {
          key: k.key,
          role: "listitem"
        }, [
          d("button", {
            type: "button",
            class: Z(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", g.value[w] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: we({ color: k.color }),
            "aria-pressed": g.value[w] !== !1,
            "aria-label": `${k.label}. ${g.value[w] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (_) => b(w)
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
}), bt = /* @__PURE__ */ ve(jh, [["__scopeId", "data-v-426e23d5"]]), Hh = { class: "chart-container" }, Wh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Kh = /* @__PURE__ */ de({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ea.register(Fu, To, Ao);
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
              return c.labels.length && c.datasets.length ? c.labels.map((u, h) => {
                const b = l.getDatasetMeta(0).controller.getStyle(h), p = c.datasets[0].data[h], y = typeof b.backgroundColor == "string" && b.backgroundColor.length > 0 ? b.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(u)}: ${p}`,
                  fillStyle: b.backgroundColor,
                  strokeStyle: b.borderColor,
                  lineWidth: b.borderWidth,
                  lineDash: b.borderDash,
                  lineDashOffset: b.borderDashOffset,
                  lineJoin: b.borderJoinStyle,
                  fontColor: y,
                  hidden: !l.getDataVisibility(h),
                  index: h
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
              const c = l.label || "", u = l.parsed || 0, h = l.dataset.data.reduce((b, f) => b + f, 0), g = (u / h * 100).toFixed(1);
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
    return t({ isDark: n }), (l, c) => (m(), x("div", Hh, [
      z(T(Bh), {
        data: T(s),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), En = /* @__PURE__ */ ve(Kh, [["__scopeId", "data-v-0f7806d6"]]), Uh = { class: "chart-container" }, Yh = ["viewBox"], qh = ["transform"], Xh = ["x", "width", "fill", "stroke"], Gh = ["fill"], Zh = ["x1", "y1", "x2", "y2", "stroke"], Qh = ["points", "fill"], Jh = ["x1", "y1", "x2", "y2", "stroke"], ef = ["x", "y", "fill"], tf = ["x1", "y1", "x2", "y2", "stroke"], af = ["points", "fill"], nf = ["transform"], of = ["y1", "y2"], sf = ["y1", "y2"], rf = ["y1", "y2"], lf = ["y1", "y2"], cf = ["y", "height"], df = ["y1", "y2"], uf = ["y1", "y2"], hf = ["y1", "y2"], ff = ["y1", "y2"], gf = ["y", "height"], mf = ["cy", "stroke", "onMouseenter"], pf = ["cy", "stroke", "onMouseenter"], bf = ["cy", "stroke", "onMouseenter"], vf = ["cy", "stroke", "onMouseenter"], yf = ["y1", "y2", "onMouseenter"], xf = ["y1", "y2", "onMouseenter"], kf = ["x", "y", "fill"], _f = ["x", "y", "fill"], wf = ["transform"], Cf = { transform: "translate(-200, 0)" }, $f = ["stroke"], Sf = ["fill"], Mf = { transform: "translate(-130, 0)" }, Df = ["stroke"], Af = ["fill"], Tf = { transform: "translate(-60, 0)" }, Bf = ["stroke"], Lf = ["fill"], Rf = { transform: "translate(10, 0)" }, Pf = ["stroke"], If = ["fill"], Ef = { transform: "translate(80, 0)" }, Ff = ["fill"], Of = { transform: "translate(150, 0)" }, Vf = ["fill"], zf = /* @__PURE__ */ de({
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
    })), s = se({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, r = (g, b) => {
      const f = g.currentTarget.closest("svg");
      if (!f) return;
      const p = f.getBoundingClientRect(), y = f.createSVGPoint();
      y.x = g.clientX - p.left, y.y = g.clientY - p.top, s.value = {
        visible: !0,
        x: y.x,
        y: y.y - 20,
        text: b
      };
    }, l = (g) => {
      if (s.value.visible) {
        const b = g.currentTarget, f = b.getBoundingClientRect(), p = b.createSVGPoint();
        p.x = g.clientX - f.left, p.y = g.clientY - f.top, s.value.x = p.x, s.value.y = p.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, u = () => {
      s.value.visible = !1;
    }, h = C(() => {
      const g = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let p = 1; p <= 10; p++) {
        const y = p, v = (y - 1) / 9, k = a.chartMargin + f - v * f;
        g.push({ value: y, y: k });
      }
      return g;
    });
    return t({ isDark: n }), (g, b) => (m(), x("div", Uh, [
      (m(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: we(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        s.value.visible ? (m(), x("g", {
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
        (m(!0), x(ce, null, pe(h.value, (f, p) => (m(), x(ce, { key: p }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Jh),
          d("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(f.value), 9, ef)
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
        (m(!0), x(ce, null, pe(e.boxplotData, (f, p) => (m(), x(ce, { key: p }, [
          d("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (m(), x(ce, { key: 0 }, [
              d("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, of),
              d("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, sf),
              d("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, rf),
              d("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, lf),
              d("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, cf)
            ], 64)) : (m(), x(ce, { key: 1 }, [
              d("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, df),
              d("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, uf),
              d("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, hf),
              d("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ff),
              d("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, gf)
            ], 64)),
            d("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, mf),
            d("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, pf),
            d("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, bf),
            d("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vf),
            d("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (y) => r(y, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, yf),
            f.averageY ? (m(), x("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (y) => r(y, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, xf)) : E("", !0)
          ], 8, nf),
          d("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, kf),
          f.responseCount ? (m(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, _f)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), x("g", {
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
            }, " Avg ", 8, Ff)
          ]),
          d("g", Of, [
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
            }, " Median ", 8, Vf)
          ])
        ], 8, wf)) : E("", !0)
      ], 44, Yh))
    ]));
  }
}), Nf = /* @__PURE__ */ ve(zf, [["__scopeId", "data-v-9ac5c075"]]), jf = { class: "chart-container" }, Hf = ["viewBox"], Wf = ["x1", "y1", "x2", "y2", "stroke"], Kf = ["points", "fill"], Uf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["x1", "y1", "x2", "y2", "stroke"], qf = ["x", "y", "fill"], Xf = ["x", "y", "fill", "transform"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["points", "fill"], Qf = ["transform"], Jf = ["y1", "y2", "stroke", "onMouseenter"], eg = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], tg = ["x1", "y1", "x2", "y2", "onMouseenter"], ag = ["x1", "y1", "x2", "y2", "onMouseenter"], ng = ["cy", "stroke", "onMouseenter"], og = ["cy", "stroke", "onMouseenter"], sg = ["x", "y", "fill"], ig = ["x", "y", "fill"], rg = ["transform"], lg = { transform: "translate(-180, 0)" }, cg = ["stroke"], dg = ["fill"], ug = { transform: "translate(-120, 0)" }, hg = ["fill"], fg = { transform: "translate(-60, 0)" }, gg = ["fill"], mg = { transform: "translate(0, 0)" }, pg = ["stroke"], bg = ["fill"], vg = { transform: "translate(60, 0)" }, yg = ["fill"], xg = { transform: "translate(130, 0)" }, kg = ["fill"], _g = ["transform"], wg = ["x", "y", "width", "height", "fill", "stroke"], Cg = ["y", "fill"], $g = ["y", "fill"], vn = 10, Sg = 14, Gn = 13, oi = 4, si = 12, Mg = /* @__PURE__ */ de({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = vn + Gn + oi + si + vn, i = C(() => ({
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
        r(k.length, Gn, !0),
        r(w.length, si, !1),
        52
      ) + Sg * 2;
    }
    function c(k, w, _, $) {
      const S = _ / 2, M = 6, I = Math.min(
        Math.max(k, S + M),
        a.chartWidth - S - M
      ), V = M + $ + 10, W = a.chartHeight - M + 10, D = Math.min(Math.max(w, V), W);
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
    })), h = se({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), g = (k) => typeof k == "string" ? k.charAt(0).toUpperCase() + k.slice(1).toLowerCase() : k, b = (k, w, _) => {
      const $ = k.currentTarget.closest("svg");
      if (!$) return;
      const S = $.getBoundingClientRect(), M = $.createSVGPoint();
      M.x = k.clientX - S.left, M.y = k.clientY - S.top;
      let I = g(w.label), V = "";
      switch (_) {
        case "body":
          V = `Q1: ${w.q1.toFixed(1)} | Q3: ${w.q3.toFixed(1)}`;
          break;
        case "wick":
          V = `Min: ${w.low.toFixed(1)} | Max: ${w.high.toFixed(1)}`;
          break;
        case "median":
          V = `Median: ${w.median.toFixed(1)}`;
          break;
        case "average":
          V = `Average: ${w.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          V = `Min: ${w.low.toFixed(1)}`;
          break;
        case "max":
          V = `Max: ${w.high.toFixed(1)}`;
          break;
      }
      const W = l(I, V), D = s;
      let P = M.x, B = M.y - 20;
      const N = c(P, B, W, D);
      P = N.x, B = N.y, h.value = {
        visible: !0,
        x: P,
        y: B,
        title: I,
        text: V,
        width: W,
        height: D
      };
    }, f = (k) => {
      if (h.value.visible) {
        const w = k.currentTarget, _ = w.getBoundingClientRect(), $ = w.createSVGPoint();
        $.x = k.clientX - _.left, $.y = k.clientY - _.top;
        let S = $.x, M = $.y - 20;
        const I = c(S, M, h.value.width, h.value.height);
        h.value.x = I.x, h.value.y = I.y;
      }
    }, p = () => {
      h.value.visible = !1;
    }, y = () => {
      h.value.visible = !1;
    }, v = C(() => {
      const k = [], _ = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const S = $, M = (S - 1) / 9, I = a.chartMargin + _ - M * _;
        k.push({ value: S, y: I });
      }
      return k;
    });
    return t({ isDark: n }), (k, w) => (m(), x("div", jf, [
      (m(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: we(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: f,
        onMouseleave: p
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
        (m(!0), x(ce, null, pe(v.value, (_, $) => (m(), x("line", {
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
        (m(!0), x(ce, null, pe(v.value, (_, $) => (m(), x(ce, { key: $ }, [
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
        }, A(g(e.yAxisLabel)), 9, Xf),
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
        (m(!0), x(ce, null, pe(e.candlestickData, (_, $) => (m(), x(ce, { key: $ }, [
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
              onMouseenter: (S) => b(S, _, "wick"),
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
              onMouseenter: (S) => b(S, _, "body"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, eg),
            _.medianY ? (m(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: _.medianY,
              x2: e.candleWidth / 2,
              y2: _.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => b(S, _, "median"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, tg)) : E("", !0),
            _.averageY ? (m(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: _.averageY,
              x2: e.candleWidth / 2,
              y2: _.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => b(S, _, "average"),
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
              onMouseenter: (S) => b(S, _, "min"),
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
              onMouseenter: (S) => b(S, _, "max"),
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
          }, A(g(_.label)), 9, sg),
          _.responseCount ? (m(), x("text", {
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
        e.showLegend ? (m(), x("g", {
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
        h.value.visible ? (m(), x("g", {
          key: 1,
          "pointer-events": "none",
          transform: `translate(${h.value.x}, ${h.value.y})`
        }, [
          d("rect", {
            filter: "url(#candlestick-tooltip-shadow)",
            x: -h.value.width / 2,
            y: -h.value.height - 10,
            width: h.value.width,
            height: h.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, wg),
          d("text", {
            x: "0",
            y: -h.value.height - 10 + vn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Cg),
          d("text", {
            x: "0",
            y: -h.value.height - 10 + vn + Gn + oi,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, $g)
        ], 8, _g)) : E("", !0)
      ], 44, Hf))
    ]));
  }
}), Dg = /* @__PURE__ */ ve(Mg, [["__scopeId", "data-v-22efd66d"]]), Ag = ["viewBox"], Tg = ["x1", "y1", "x2", "y2", "stroke"], Bg = ["x1", "y1", "x2", "y2", "stroke"], Lg = ["points", "fill"], Rg = ["x1", "y1", "x2", "y2", "stroke"], Pg = ["x", "y", "fill"], Ig = ["x", "y", "fill", "transform"], Eg = ["x1", "y1", "x2", "y2", "stroke"], Fg = ["points", "fill"], Og = ["x1", "y1", "x2", "y2", "stroke"], Vg = ["x", "y", "fill"], zg = ["x", "y", "fill"], Ng = ["d"], jg = ["x", "y", "width", "height", "onMouseenter"], Hg = ["x1", "y1", "x2", "y2"], Wg = ["x", "y"], Kg = ["x1", "y1", "x2", "y2"], Ug = ["x", "y"], Yg = ["x1", "y1", "x2", "y2"], qg = ["x", "y"], Xg = ["x1", "y1", "x2", "y2"], Gg = ["x", "y"], Zg = ["x1", "y1", "x2", "y2"], Qg = ["x", "y"], Jg = ["x1", "y1", "x2", "y2"], em = ["x", "y"], tm = ["transform"], am = { transform: "translate(-220, 0)" }, nm = ["fill"], om = { transform: "translate(-140, 0)" }, sm = ["fill"], im = { transform: "translate(-80, 0)" }, rm = ["fill"], lm = { transform: "translate(-20, 0)" }, cm = ["fill"], dm = { transform: "translate(60, 0)" }, um = ["fill"], hm = { transform: "translate(130, 0)" }, fm = ["fill"], gm = { transform: "translate(180, 0)" }, mm = ["fill"], pm = ["transform"], bm = ["x", "y", "width", "height", "fill", "stroke"], vm = ["y", "fill"], ym = ["y", "fill"], yn = 10, xm = 14, Zn = 13, ii = 12, ri = 4, km = /* @__PURE__ */ de({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = yn + Zn + ri + ii + yn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(J, U, ee) {
      const fe = ee ? 0.6 : 0.535;
      return Math.ceil(Math.max(J, 1) * U * fe);
    }
    function l(J, U) {
      return Math.max(
        r(J.length, Zn, !0),
        r(U.length, ii, !1),
        52
      ) + xm * 2;
    }
    function c(J, U, ee, fe) {
      const be = ee / 2, O = 6, te = Math.min(
        Math.max(J, be + O),
        a.chartWidth - be - O
      ), le = O + fe + 10, ge = a.chartHeight - O + 10, Ce = Math.min(Math.max(U, le), ge);
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
    })), h = se({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), g = C(
      () => a.chartMarginRight ?? a.chartMargin
    ), b = C(() => a.chartMargin + a.plotInset), f = C(
      () => a.chartWidth - g.value - a.plotInset
    ), p = C(() => Math.max(f.value - b.value, 1)), y = C(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), v = C(() => p.value / 10 * 0.52);
    function k(J) {
      if (J < 1 || J > 10) return null;
      const U = p.value / 10;
      return b.value + (J - 0.5) * U;
    }
    const w = C(
      () => Array.from({ length: 10 }, (J, U) => {
        const ee = U + 1, fe = k(ee);
        return fe === null ? null : { score: ee, x: fe };
      }).filter((J) => J !== null)
    ), _ = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const J = Math.max(...a.histogram.map((ee) => ee.count || 0), 1), U = Math.max(1, Math.ceil(J * 0.2));
      return J + U;
    }), $ = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const J = a.averageScore || 0;
      let U = 0, ee = 0;
      if (a.histogram.forEach((be) => {
        const O = be.count || 0;
        U += O;
        const te = be.score - J;
        ee += O * (te * te);
      }), U === 0) return 1;
      const fe = ee / U;
      return Math.sqrt(fe) || 1;
    }), S = (J, U, ee) => {
      if (ee === 0) return 0;
      const fe = 1 / (ee * Math.sqrt(2 * Math.PI)), be = -0.5 * Math.pow((J - U) / ee, 2);
      return fe * Math.exp(be);
    }, M = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && $.value === 0) return null;
      const J = a.averageScore, U = $.value, ee = 100, be = Math.max(...a.histogram.map((ge) => ge.count || 0), 1) / _.value * y.value;
      if (be <= 0) return null;
      let O = 0;
      for (let ge = 0; ge <= ee; ge++) {
        const Ce = 1 + 9 * (ge / ee), _e = S(Ce, J, U);
        _e > O && (O = _e);
      }
      if (O <= 0) return null;
      const te = be / O, le = [];
      for (let ge = 0; ge <= ee; ge++) {
        const Ce = 1 + 9 * (ge / ee), _e = S(Ce, J, U) * te, Le = k(Ce);
        if (Le !== null) {
          const Re = a.chartHeight - a.chartBottomMargin - _e;
          le.push(`${ge === 0 ? "M" : "L"} ${Le} ${Re}`);
        }
      }
      return le.join(" ");
    }), I = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const J = p.value / 10;
      return a.histogram.map((U) => {
        const ee = Number(U.score);
        if (!Number.isFinite(ee) || ee < 1 || ee > 10)
          return null;
        const fe = b.value + (ee - 0.5) * J, be = U.count > 0 ? U.count / _.value * y.value : 0, O = a.chartHeight - a.chartBottomMargin - be;
        return {
          score: ee,
          count: U.count,
          x: fe,
          y: O,
          height: be
        };
      }).filter((U) => U !== null);
    }), V = C(() => k(a.minScore)), W = C(() => k(a.maxScore)), D = C(() => k(a.q1Score)), P = C(() => k(a.medianScore)), B = C(() => k(a.q3Score)), N = C(() => k(a.averageScore)), j = C(() => a.minScore), Q = C(() => a.maxScore), X = C(() => a.q1Score), re = C(() => a.medianScore), H = C(() => a.q3Score), ae = C(() => a.averageScore), L = C(() => {
      const J = [], U = a.chartMargin - 8, ee = 18;
      D.value !== null && J.push({
        x: D.value,
        y: U,
        value: a.q1Score,
        label: `Q1: ${X.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), P.value !== null && J.push({
        x: P.value,
        y: U - ee,
        value: a.medianScore,
        label: `Median: ${re.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), N.value !== null && J.push({
        x: N.value,
        y: U - ee,
        value: a.averageScore,
        label: `Avg: ${ae.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), B.value !== null && J.push({
        x: B.value,
        y: U,
        value: a.q3Score,
        label: `Q3: ${H.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), J.sort((O, te) => (O.x || 0) - (te.x || 0));
      const fe = [[], [], []];
      J.forEach((O) => {
        if (O.x === null) return;
        let te = -1;
        for (let le = 0; le < fe.length; le++) {
          let ge = !1;
          for (const Ce of fe[le]) {
            if (Ce.x === null) continue;
            const _e = Math.abs(O.x - Ce.x), Le = (O.width + Ce.width) / 2 + 10;
            if (_e < Le) {
              ge = !0;
              break;
            }
          }
          if (!ge) {
            te = le;
            break;
          }
        }
        te === -1 && (te = fe.length - 1), O.y = U - te * ee, fe[te].push(O);
      });
      const be = 15;
      return J.forEach((O) => {
        O.y < be && (O.y = be);
      }), J;
    }), Y = (J) => L.value.find((ee) => ee.id === J)?.y || a.chartMargin - 10, q = C(() => {
      const J = [];
      for (let ee = 0; ee <= 5; ee++) {
        const fe = Math.round(_.value / 5 * ee), be = a.chartHeight - a.chartBottomMargin - ee / 5 * y.value;
        J.push({ value: fe, y: be });
      }
      return J;
    });
    function G(J, U, ee) {
      const fe = J.createSVGPoint();
      fe.x = U, fe.y = ee;
      const be = J.getScreenCTM();
      if (!be) {
        const te = J.getBoundingClientRect();
        return { x: U - te.left, y: ee - te.top };
      }
      const O = fe.matrixTransform(be.inverse());
      return { x: O.x, y: O.y };
    }
    const ue = (J, U) => {
      a.interactive && ne(J, U);
    }, me = () => {
      a.interactive && ie();
    }, ne = (J, U) => {
      const ee = J.currentTarget.closest("svg");
      if (!ee) return;
      const { x: fe, y: be } = G(ee, J.clientX, J.clientY), O = `Score: ${U.score}`, te = `Count: ${Number(U.count ?? 0).toLocaleString()}`, le = l(O, te), ge = s, Ce = typeof U?.x == "number" ? U.x : fe;
      let _e = be - 20;
      const Le = c(Ce, _e, le, ge);
      h.value = {
        visible: !0,
        x: Le.x,
        y: Le.y,
        title: O,
        text: te,
        width: le,
        height: ge,
        anchorX: typeof U?.x == "number" ? U.x : null
      };
    }, R = (J) => {
      if (a.interactive && h.value.visible) {
        const U = J.currentTarget, { x: ee, y: fe } = G(U, J.clientX, J.clientY), be = h.value.anchorX, O = be != null && Number.isFinite(be) ? be : ee;
        let te = fe - 20;
        const le = c(O, te, h.value.width, h.value.height);
        h.value.x = le.x, h.value.y = le.y;
      }
    }, K = () => {
      ie();
    }, ie = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: n }), (J, U) => (m(), x("div", {
      class: Z(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (m(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: we(`min-height: ${e.chartHeight}px;`),
        onMousemove: R,
        onMouseleave: K
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
        (m(!0), x(ce, null, pe(q.value, (ee, fe) => (m(), x("line", {
          key: `grid-${fe}`,
          x1: b.value,
          y1: ee.y,
          x2: f.value,
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
        (m(!0), x(ce, null, pe(q.value, (ee, fe) => (m(), x(ce, {
          key: `y-tick-${fe}`
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
          x1: b.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: f.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Eg),
        d("polygon", {
          points: `${f.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${f.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${f.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Fg),
        (m(!0), x(ce, null, pe(w.value, (ee) => (m(), x(ce, {
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
        M.value ? (m(), x("path", {
          key: 0,
          d: M.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Ng)) : E("", !0),
        (m(!0), x(ce, null, pe(I.value, (ee, fe) => (m(), x("rect", {
          key: `bar-${fe}`,
          x: ee.x - v.value / 2,
          y: ee.y,
          width: v.value,
          height: ee.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (be) => ue(be, ee),
          onMouseleave: me,
          style: we({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, jg))), 128)),
        e.showStatLabels && V.value ? (m(), x("line", {
          key: 1,
          x1: V.value,
          y1: e.chartMargin,
          x2: V.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Hg)) : E("", !0),
        e.showStatLabels && V.value ? (m(), x("text", {
          key: 2,
          x: V.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(j.value.toFixed(1)), 9, Wg)) : E("", !0),
        e.showStatLabels && D.value ? (m(), x("line", {
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
        e.showStatLabels && D.value ? (m(), x("text", {
          key: 4,
          x: D.value,
          y: Y("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(X.value.toFixed(1)), 9, Ug)) : E("", !0),
        e.showStatLabels && P.value ? (m(), x("line", {
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
        e.showStatLabels && P.value ? (m(), x("text", {
          key: 6,
          x: P.value,
          y: Y("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(re.value.toFixed(1)), 9, qg)) : E("", !0),
        e.showStatLabels && N.value ? (m(), x("line", {
          key: 7,
          x1: N.value,
          y1: e.chartMargin,
          x2: N.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Xg)) : E("", !0),
        e.showStatLabels && N.value ? (m(), x("text", {
          key: 8,
          x: N.value,
          y: Y("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(ae.value.toFixed(1)), 9, Gg)) : E("", !0),
        e.showStatLabels && B.value ? (m(), x("line", {
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
        e.showStatLabels && B.value ? (m(), x("text", {
          key: 10,
          x: B.value,
          y: Y("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(H.value.toFixed(1)), 9, Qg)) : E("", !0),
        e.showStatLabels && W.value ? (m(), x("line", {
          key: 11,
          x1: W.value,
          y1: e.chartMargin,
          x2: W.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Jg)) : E("", !0),
        e.showStatLabels && W.value ? (m(), x("text", {
          key: 12,
          x: W.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(Q.value.toFixed(1)), 9, em)) : E("", !0),
        e.showLegend ? (m(), x("g", {
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
        e.interactive && h.value.visible ? (m(), x("g", {
          key: 14,
          "pointer-events": "none",
          transform: `translate(${h.value.x}, ${h.value.y})`
        }, [
          d("rect", {
            filter: "url(#histogram-tooltip-shadow)",
            x: -h.value.width / 2,
            y: -h.value.height - 10,
            width: h.value.width,
            height: h.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, bm),
          d("text", {
            x: "0",
            y: -h.value.height - 10 + yn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, vm),
          d("text", {
            x: "0",
            y: -h.value.height - 10 + yn + Zn + ri,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, ym)
        ], 8, pm)) : E("", !0)
      ], 44, Ag))
    ], 2));
  }
}), vr = /* @__PURE__ */ ve(km, [["__scopeId", "data-v-8f9da805"]]), _m = 639, yr = 1024;
function li(e) {
  return e < 640 ? "mobile" : e <= yr ? "tablet" : "desktop";
}
function wm() {
  const e = se(
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
}, la = 12, Sm = /* @__PURE__ */ de({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), { breakpoint: s } = wm(), i = se(null), r = se(!0), l = se(!1);
    let c = null, u = null;
    const h = {
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
    }, f = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, p = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, y = C(() => {
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
        contentMargins: { ...h.margins }
      } : {
        orient: "horizontal",
        nodeWidth: h.node.width,
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
        contentMargins: { ...h.margins }
      };
    }), v = (R) => {
      const K = R.replace(/_/g, " ").replace(/\s+/g, " ").trim(), ie = K.match(/^Failed:\s*(.+)$/i);
      return ie ? `Failed:
${ie[1].trim()}` : K;
    }, k = (R, K) => {
      const ie = R.trim();
      if (!ie || K < 1 || ie.length <= K) return ie;
      const J = [];
      let U = 0;
      for (; U < ie.length; ) {
        const ee = Math.min(U + K, ie.length);
        if (ee >= ie.length) {
          const O = ie.slice(U).trim();
          O && J.push(O);
          break;
        }
        const fe = ie.slice(U, ee), be = fe.lastIndexOf(" ");
        if (be > 0)
          for (J.push(ie.slice(U, U + be).trim()), U += be; U < ie.length && ie[U] === " "; ) U += 1;
        else
          J.push(fe), U = ee;
      }
      return J.join(`
`);
    }, w = (R, K) => {
      const ie = R.trim();
      return !ie || K < 1 ? R : ie.split(`
`).map((J) => k(J.trim(), K)).filter(Boolean).join(`
`);
    }, _ = (R) => R.status ? R.status : f.test(R.name) ? "abandon" : p.test(R.name) ? "error" : "success", $ = (R) => R.originalValue ?? R.value, S = (R, K) => {
      const ie = new Set(K.map((U) => U.target)), J = R.filter((U) => !ie.has(U.name));
      for (const U of J) {
        if (typeof U.value == "number" && U.value > 0) return U.value;
        const ee = K.filter((fe) => fe.source === U.name);
        if (ee.length > 0)
          return ee.reduce((fe, be) => fe + $(be), 0);
      }
      return K.reduce((U, ee) => Math.max(U, $(ee)), 0);
    }, M = (R, K) => {
      const ie = /* @__PURE__ */ new Map(), J = new Set(K.map((ee) => ee.target)), U = R.filter((ee) => !J.has(ee.name)).map((ee) => ({ name: ee.name, depth: 0 }));
      for (; U.length > 0; ) {
        const { name: ee, depth: fe } = U.shift(), be = ie.get(ee);
        if (!(be !== void 0 && be >= fe)) {
          ie.set(ee, fe);
          for (const O of K)
            O.source === ee && U.push({ name: O.target, depth: fe + 1 });
        }
      }
      for (const ee of R)
        ie.has(ee.name) || ie.set(ee.name, 0);
      return ie;
    }, I = (R, K) => {
      const ie = /* @__PURE__ */ new Map(), J = new Set(K.map((be) => be.target)), U = R.filter((be) => !J.has(be.name));
      let ee = 0;
      const fe = (be) => {
        let O = be;
        for (; O && !ie.has(O); )
          ie.set(O, ee), ee += 1, O = K.filter(
            (le) => le.source === O && _({ name: le.target }) === "success"
          ).sort((le, ge) => $(ge) - $(le))[0]?.target;
      };
      return U.forEach((be) => fe(be.name)), ie;
    }, V = (R, K, ie) => {
      const J = _(R);
      if (J === "success" && ie.has(R.name))
        return ie.get(R.name);
      if (J === "success") {
        const U = K.filter((fe) => fe.target === R.name);
        return 200 + (U.length ? Math.min(
          ...U.map(
            (fe) => ie.has(fe.source) ? (ie.get(fe.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return J === "abandon" ? 1e3 : 2e3;
    }, W = (R, K) => {
      const ie = M(R, K), J = I(R, K);
      return [...R].sort((U, ee) => {
        const fe = ie.get(U.name) ?? 0, be = ie.get(ee.name) ?? 0;
        if (fe !== be) return fe - be;
        const O = b[_(U)], te = b[_(ee)];
        if (O !== te) return O - te;
        const le = V(U, K, J), ge = V(ee, K, J);
        if (le !== ge) return le - ge;
        const Ce = typeof U.order == "number" ? U.order : Number.MAX_SAFE_INTEGER, _e = typeof ee.order == "number" ? ee.order : Number.MAX_SAFE_INTEGER;
        return Ce !== _e ? Ce - _e : U.name.localeCompare(ee.name);
      });
    }, D = (R, K, ie, J) => {
      const ee = w(R, J).split(`
`), fe = K * 0.58, O = Math.max(...ee.map((le) => le.length), 1) * fe, te = ee.length * ie;
      return {
        lines: ee,
        width: O,
        height: te,
        nodeWidth: O + la * 2
      };
    }, P = (R, K, ie, J) => {
      const U = typeof R.label == "string" && R.label ? R.label : R.name, ee = `${v(U)}
(${It(ie, J)})`;
      return w(ee, K);
    }, B = (R, K) => {
      const ie = K.filter((J) => J.target === R.name);
      return ie.length > 0 ? ie.reduce((J, U) => J + $(U), 0) : typeof R.value == "number" ? R.value : K.filter((J) => J.source === R.name).reduce((J, U) => J + $(U), 0);
    }, N = (R, K, ie) => {
      const J = K.find((U) => U.name === R);
      return J ? B(J, ie) : ie.filter((U) => U.source === R).reduce((U, ee) => U + $(ee), 0);
    }, j = (R, K, ie, J) => {
      const U = N(R, ie, J);
      return `${K.toLocaleString()} (${It(K, U)})`;
    }, Q = (R, K = 0) => {
      if (K > 0) return K;
      const ie = R.match(/^(\d+(?:\.\d+)?)px$/);
      if (ie) return Number(ie[1]);
      const J = R.match(/^(\d+(?:\.\d+)?)vh$/);
      return J && typeof window < "u" ? Number(J[1]) / 100 * window.innerHeight : 500;
    }, X = (R, K, ie, J, U) => {
      if (!K.length || !R.length || U <= 0) return R;
      const ee = R.map((_e) => ({ ..._e })), fe = ie.labelLineHeight || Math.round(ie.labelFontSize * 1.25), be = Math.max(4, ie.labelCharsPerLine), O = Math.max(J * 0.88, 260), te = M(K, ee), le = /* @__PURE__ */ new Map();
      K.forEach((_e) => {
        const Le = te.get(_e.name) ?? 0;
        le.set(Le, (le.get(Le) ?? 0) + 1);
      });
      const ge = (_e) => {
        const Re = K.find((oa) => oa.name === _e)?.displayLabel || _e, Kt = D(Re, ie.labelFontSize, fe, be).height + la * 2, pa = te.get(_e) ?? 0, an = le.get(pa) ?? 1, nn = (Math.max(an, 1) - 1) * ie.nodeGap / Math.max(an, 1), Fn = Math.max(O - nn, Kt);
        return Math.max(1, Kt / Fn * U);
      }, Ce = (_e) => {
        const Le = ee.filter((Re) => Re.target === _e);
        return Le.length > 0 ? Le.reduce((Re, qe) => Re + qe.value, 0) : ee.filter((Re) => Re.source === _e).reduce((Re, qe) => Re + qe.value, 0);
      };
      for (let _e = 0; _e < 16; _e += 1) {
        let Le = !1;
        for (const Re of K) {
          const qe = ge(Re.name), Kt = Ce(Re.name);
          if (Kt >= qe) continue;
          const pa = ee.filter((oa) => oa.target === Re.name), an = ee.filter((oa) => oa.source === Re.name), nn = pa.length > 0 ? pa : an;
          if (nn.length === 0) continue;
          const Fn = qe / Math.max(Kt, 1e-6);
          nn.forEach((oa) => {
            oa.value *= Fn;
          }), Le = !0;
        }
        if (!Le) break;
      }
      return ee;
    }, re = (R, K, ie) => {
      const J = S(R, K), U = W(R, K), ee = ie.labelLineHeight || Math.round(ie.labelFontSize * 1.25), fe = Math.max(4, ie.labelCharsPerLine);
      let be = ie.nodeWidth;
      const O = [], te = U.map((ge, Ce) => {
        const _e = _(ge), Le = P(
          ge,
          fe,
          B(ge, K),
          J
        );
        O.push(Le);
        const Re = D(Le, ie.labelFontSize, ee, fe);
        ie.orient === "vertical" ? be = Math.max(be, Re.height + la * 2) : be = Math.max(be, Re.nodeWidth);
        const qe = a.nodeColors[ge.name] || g[_e] || H[Ce % H.length], Kt = Math.max(Math.ceil(Re.nodeWidth - la * 2), 48);
        return {
          ...ge,
          displayLabel: Le,
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
      let le = { ...ie.contentMargins };
      if (ie.orient === "vertical") {
        const ge = Math.max(
          ...O.map(
            (_e) => D(_e, ie.labelFontSize, ee, fe).width
          ),
          0
        ), Ce = typeof le.right == "number" ? le.right : 10;
        le = {
          ...le,
          right: Math.max(Ce, ge + la + ie.labelDistance)
        };
      }
      return { nodes: te, maxNodeWidth: be, contentMargins: le, originTotal: J };
    }, H = [
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
    ], ae = () => {
      const R = a.data.links.filter(
        (U) => U.source && U.target && typeof U.value == "number"
      ), K = Math.max(...R.map((U) => U.value), 1), ie = Math.max(1, K * 0.01), J = R.map((U) => ({
        ...U,
        originalValue: U.value,
        value: U.value < K * 0.01 ? ie : U.value
      }));
      return {
        nodes: a.data.nodes.filter((U) => U.name),
        links: J
      };
    }, L = (R, K, ie) => (J) => {
      const U = J.dataType === "node", ee = o.value.tooltipText, fe = n.value ? "#d1d5db" : "#e2e8f0";
      if (U) {
        const ge = K.filter((Re) => Re.target === J.name), Ce = K.filter((Re) => Re.source === J.name), _e = ge.length > 0 ? ge.reduce((Re, qe) => Re + (qe.originalValue || qe.value), 0) : Ce.reduce((Re, qe) => Re + (qe.originalValue || qe.value), 0), Le = It(_e, ie);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${ee};">${J.name} (${Le})</div><div style="color: ${fe}; font-size: 12px;">Count: ${_e.toLocaleString()}</div>`;
      }
      const be = J.data?.source || J.source || "Unknown", O = J.data?.target || J.target || "Unknown", te = Number(J.data?.originalValue ?? J.data?.value ?? J.value ?? 0), le = j(be, te, R, K);
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${ee};">${be} → ${O}</div><div style="color: ${fe}; font-size: 12px;">Flow: ${le}</div>`;
    }, Y = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const R = y.value, K = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", ie = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", J = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", U = R.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: ee, links: fe } = ae(), { nodes: be, maxNodeWidth: O, contentMargins: te, originTotal: le } = re(
          ee,
          fe,
          R
        ), ge = Q(a.height, i.value?.clientHeight ?? 0), Ce = X(
          fe,
          be,
          {
            labelFontSize: R.labelFontSize,
            labelLineHeight: R.labelLineHeight || Math.round(R.labelFontSize * 1.25),
            labelCharsPerLine: R.labelCharsPerLine,
            nodeGap: R.nodeGap
          },
          ge,
          le
        ), _e = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: L(ee, Ce, le),
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
                color: K,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...h.style,
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
                ...R.orient === "horizontal" ? { width: Math.max(O - la * 2, 48), overflow: "none" } : R.labelWrap && R.labelTextWidth > 0 ? { width: R.labelTextWidth, overflow: "none" } : {},
                ...R.labelDistance > 0 ? { distance: R.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Le) => Le.data?.displayLabel || Le.name || ""
              },
              edgeLabel: R.edgeLabelShow ? {
                show: !0,
                fontSize: R.edgeLabelFontSize,
                color: J,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Le) => {
                  const Re = Number(Le.data?.originalValue ?? Le.value ?? 0), qe = Le.data?.source || Le.source || "";
                  return j(qe, Re, ee, Ce);
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: R.nodeGap,
              nodeWidth: O,
              layoutIterations: h.node.iterations,
              orient: R.orient,
              draggable: !1,
              ...te
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(_e), c.resize();
      } catch (ee) {
        console.error("Error setting Sankey chart options:", ee), l.value = !0;
      }
    }, q = async () => {
      if (i.value)
        try {
          c = zo.init(i.value), Y(), window.addEventListener("resize", me);
        } catch (R) {
          console.error("Error initializing Sankey chart:", R), l.value = !0;
        } finally {
          r.value = !1;
        }
    }, G = () => {
      const R = i.value;
      return !!(R && R.clientWidth > 0 && R.clientHeight > 0);
    }, ue = async () => {
      if (await Ke(), G()) return q();
      await new Promise((R) => {
        const K = i.value;
        if (!K) {
          R();
          return;
        }
        u = new ResizeObserver(() => {
          G() && (u?.disconnect(), u = null, q().then(R));
        }), u.observe(K);
      });
    }, me = () => c?.resize(), ne = () => {
      window.removeEventListener("resize", me), u?.disconnect(), u = null, c && (c.dispose(), c = null);
    };
    return Je(() => ue()), _i(ne), Te(() => a.data, Y, { deep: !0 }), Te(n, Y), Te(s, Y), t({ isDark: n }), (R, K) => (m(), x("div", Cm, [
      l.value ? (m(), x("div", {
        key: 0,
        class: "error-state",
        style: we({ height: e.height })
      }, [...K[0] || (K[0] = [
        Jn('<div class="error-content" data-v-c2130602><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2130602><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c2130602></path></svg><p class="error-title" data-v-c2130602>Chart could not be loaded</p><p class="error-description" data-v-c2130602>Please check the data format.</p></div>', 1)
      ])], 4)) : (m(), x("div", {
        key: 1,
        class: "chart-wrapper",
        style: we({ height: e.height })
      }, [
        d("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        r.value ? (m(), x("div", $m, [...K[1] || (K[1] = [
          Jn('<div class="loading-container" data-v-c2130602><div class="sankey-loader" data-v-c2130602><div class="flow flow-1" data-v-c2130602></div><div class="flow flow-2" data-v-c2130602></div><div class="flow flow-3" data-v-c2130602></div><div class="flow flow-4" data-v-c2130602></div></div><p class="loading-text" data-v-c2130602>Loading Sankey diagram...</p></div>', 1)
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
}, Qm = { key: "body-content" }, Jm = /* @__PURE__ */ de({
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
    function o(f) {
      return f === !0;
    }
    const s = se(null), i = se(o(a.defaultOpen)), r = se(o(a.defaultOpen)), l = uo();
    function c(f) {
      return f.some((p) => {
        if (p.type === Yr) return !1;
        if (p.type === Text) {
          const y = p.children;
          return typeof y == "string" && y.trim().length > 0;
        }
        return !!p.type;
      });
    }
    const u = C(() => a.collapsible ? a.lazyMount ? r.value : i.value : !0), h = C(() => a.loading && u.value), g = C(() => {
      if (a.collapsible && !i.value) return !1;
      const f = l.headerExport;
      return f ? c(f()) : !1;
    });
    Te(
      () => a.defaultOpen,
      (f) => {
        if (!a.collapsible) return;
        const p = o(f);
        i.value = p, p && (r.value = !0), s.value && s.value.open !== p && (s.value.open = p);
      }
    ), Je(() => {
      !a.collapsible || !s.value || (s.value.open = i.value);
    });
    function b(f) {
      const p = f.currentTarget;
      if (p?.tagName !== "DETAILS") return;
      const y = i.value, v = p.open;
      if (i.value = v, v && !y) {
        const k = !r.value;
        r.value = !0, k && n("open");
      }
      n("toggle", v);
    }
    return (f, p) => e.collapsible ? (m(), x("details", {
      key: 0,
      ref_key: "detailsRef",
      ref: s,
      class: "chart-metric-container metric-collapsible",
      open: i.value ? !0 : void 0,
      onToggle: b
    }, [
      d("summary", Dm, [
        d("div", Am, [
          d("div", Tm, [
            d("div", Bm, [
              d("div", Lm, [
                ke(f.$slots, "title", {}, () => [
                  e.title ? (m(), x("h3", Rm, A(e.title), 1)) : E("", !0)
                ], !0),
                e.subtitle ? (m(), x("p", Pm, A(e.subtitle), 1)) : E("", !0),
                ke(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            g.value ? (m(), x("div", Im, [
              ke(f.$slots, "headerExport", {}, void 0, !0)
            ])) : E("", !0)
          ]),
          f.$slots.headerAside ? (m(), x("div", Em, [
            ke(f.$slots, "headerAside", {}, void 0, !0)
          ])) : E("", !0)
        ]),
        p[0] || (p[0] = d("svg", {
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
      u.value ? (m(), x("div", Fm, [
        z(pt, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            h.value ? (m(), x("div", Om, [
              ke(f.$slots, "loading", {}, () => [
                p[1] || (p[1] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (m(), x("div", Vm, [
              ke(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : E("", !0)
    ], 40, Mm)) : (m(), x("div", zm, [
      d("div", Nm, [
        d("div", jm, [
          d("div", Hm, [
            d("div", Wm, [
              d("div", Km, [
                ke(f.$slots, "title", {}, () => [
                  e.title ? (m(), x("h3", Um, A(e.title), 1)) : E("", !0)
                ], !0),
                e.subtitle ? (m(), x("p", Ym, A(e.subtitle), 1)) : E("", !0),
                ke(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            g.value ? (m(), x("div", qm, [
              ke(f.$slots, "headerExport", {}, void 0, !0)
            ])) : E("", !0)
          ]),
          f.$slots.headerAside ? (m(), x("div", Xm, [
            ke(f.$slots, "headerAside", {}, void 0, !0)
          ])) : E("", !0)
        ])
      ]),
      u.value ? (m(), x("div", Gm, [
        z(pt, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            h.value ? (m(), x("div", Zm, [
              ke(f.$slots, "loading", {}, () => [
                p[2] || (p[2] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (m(), x("div", Qm, [
              ke(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : E("", !0)
    ]));
  }
}), Se = /* @__PURE__ */ ve(Jm, [["__scopeId", "data-v-ade4038f"]]);
function ep(e, t) {
  return m(), x("svg", {
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
function ro(e, t) {
  return m(), x("svg", {
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
function Ro(e, t) {
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
function Po(e, t) {
  return m(), x("svg", {
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
function Io(e, t) {
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
function Eo(e, t) {
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
  return m(), x("svg", {
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
function lo(e, t) {
  return m(), x("svg", {
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
}, bp = /* @__PURE__ */ de({
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
    return (l, c) => (m(), oe(ht(o.value), {
      class: Z(s.value)
    }, {
      default: F(() => [
        e.variant === "footer" ? (m(), x("div", lp)) : E("", !0),
        d("div", {
          class: Z(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (m(), x("span", cp, "Export")) : E("", !0),
          d("div", dp, [
            i("pdf") ? (m(), x("button", {
              key: 0,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => r("pdf"))
            }, [
              e.loading ? (m(), x("svg", hp, [...c[2] || (c[2] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), x("svg", fp, [...c[3] || (c[3] = [
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
            i("csv") ? (m(), x("button", {
              key: 1,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => r("csv"))
            }, [
              e.loading ? (m(), x("svg", mp, [...c[5] || (c[5] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), x("svg", pp, [...c[6] || (c[6] = [
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
}, _p = { class: "max-w-[360px] text-center" }, wp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Cp = /* @__PURE__ */ de({
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
    }, r = $e(o, "theme"), l = $e(o, "options"), { isDark: c } = Me(r), u = (g) => {
      const b = new Date(g), f = String(b.getDate()).padStart(2, "0"), p = String(b.getMonth() + 1).padStart(2, "0");
      return `${f}-${p}`;
    }, h = C(() => {
      const g = o.data?.agents_by_day || {}, b = Object.keys(g).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const f = b.map((w) => u(w)), p = /* @__PURE__ */ new Set();
      for (const w of Object.values(g))
        for (const _ of Object.keys(w))
          p.add(_);
      const y = Array.from(p), v = (w) => w, k = y.map((w) => ({
        label: w,
        data: b.map((_) => g[_]?.[w] || 0),
        backgroundColor: `${n[w] || "#94a3b8"}80`,
        borderColor: v(n[w] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: k
      };
    });
    return t({ isDark: c }), (g, b) => (m(), oe(Se, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", vp, [
          z(pt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: F(() => [
              h.value.labels && h.value.labels.length ? (m(), x("section", yp, [
                d("div", xp, [
                  z(Mt, {
                    data: h.value,
                    stacked: !0,
                    theme: r.value,
                    options: l.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (m(), x("section", kp, [
                d("div", _p, [
                  d("div", wp, [
                    z(T(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), $p = /* @__PURE__ */ ve(Cp, [["__scopeId", "data-v-f8d0ec91"]]), Sp = { class: "flex w-full min-w-0 justify-center" }, Mp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Dp = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, Ap = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Tp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Bp = /* @__PURE__ */ de({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (m(), x("div", {
      class: Z(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      d("div", Sp, [
        d("div", Mp, [
          e.color ? (m(), x("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: we({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          d("span", Dp, A(e.title), 1)
        ])
      ]),
      d("p", Ap, A(e.value), 1),
      e.subvalue ? (m(), x("p", Tp, A(e.subvalue), 1)) : E("", !0)
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
}, Ge = /* @__PURE__ */ de({
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
    return (r, l) => a.value ? (m(), x("span", {
      key: 0,
      role: "status",
      class: Z(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (m(), x("span", Lp, [...l[0] || (l[0] = [
        d("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        d("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : E("", !0),
      d("span", {
        class: Z(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (m(), x("span", {
      key: 1,
      class: Z([T(kr), i.value])
    }, [
      ke(r.$slots, "default", {}, () => [
        Ae(A(e.label), 1)
      ])
    ], 2));
  }
}), he = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Ie = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
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
}, zp = /* @__PURE__ */ de({
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
    const a = e, n = t, o = se(!1), s = "—";
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
    function h(_, $) {
      return u(_, $);
    }
    function g(_) {
      return a.sortKey === _ && a.sortDirection != null;
    }
    function b(_) {
      n("sort", _);
    }
    function f(_) {
      return g(_) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const p = C(() => a.rows?.length ?? 0), y = C(() => p.value > a.maxVisibleRows), v = C(() => Math.max(0, p.value - a.maxVisibleRows)), k = C(() => a.rows?.length ? o.value || !y.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), w = C(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(v.value))
    );
    return (_, $) => (m(), x("div", Rp, [
      d("div", Pp, [
        d("table", Ip, [
          d("thead", null, [
            d("tr", null, [
              (m(!0), x(ce, null, pe(e.columns, (S) => (m(), x("th", {
                key: S.key,
                scope: "col",
                class: Z(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [r(S.align), S.headerClass]])
              }, [
                S.sortable ? (m(), x("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", r(S.align)]),
                  "aria-sort": f(S.key),
                  onClick: (M) => b(S.key)
                }, [
                  d("span", null, A(S.label), 1),
                  d("span", Fp, [
                    g(S.key) ? (m(), x(ce, { key: 0 }, [
                      e.sortDirection === "asc" ? (m(), x("span", Op, "↑")) : e.sortDirection === "desc" ? (m(), x("span", Vp, "↓")) : E("", !0)
                    ], 64)) : (m(), x(ce, { key: 1 }, [
                      $[1] || ($[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Ep)) : (m(), x(ce, { key: 1 }, [
                  Ae(A(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (m(!0), x(ce, null, pe(k.value, (S, M) => (m(), x("tr", {
              key: h(S, M)
            }, [
              (m(!0), x(ce, null, pe(e.columns, (I) => (m(), x("td", {
                key: `${M}-${I.key}`,
                class: Z(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [r(I.align), I.cellClass]])
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
      y.value ? (m(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (S) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : w.value) + " ", 1),
        (m(), x("svg", {
          class: Z(["view-more-icon", { "view-more-icon-rotated": o.value }]),
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
}, n0 = /* @__PURE__ */ de({
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
      return v.length === 0 ? f(0) : v.map(
        (k) => `${k.currency} ${f(k.total_value)}`
      ).join(" · ");
    }), h = (v) => v.payment_success_value || [], g = (v) => typeof v.payment_success_count == "number" ? v.payment_success_count : (v.payment_success_value || []).reduce(
      (k, w) => k + (w.count || 0),
      0
    ), b = (v) => Ie(v), f = (v) => v == null ? "0" : Ut(v);
    C(() => (n.data?.total_payment_success_value || []).reduce(
      (v, k) => v + (k.total_value || 0),
      0
    ));
    const p = C(() => {
      const v = n.data, k = v.total_booking_initiated || 0, w = v.total_booking_started || 0, _ = v.total_payment_initiated || 0, $ = v.total_not_found || 0, S = v.total_cancelled || 0, M = v.total_no_pending_balance || 0, I = v.total_errors || 0, V = typeof v.total_payment_success == "number" ? v.total_payment_success : (v.total_payment_success_value || []).reduce(
        (Q, X) => Q + (X.count || 0),
        0
      ), W = v.total_payment_failed || 0, D = Math.max(0, k - w), P = Math.max(
        0,
        w - _ - $ - S - M - I
      ), B = (Q, X) => ye(Q, X), N = [
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
      }), V > 0 && j.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: V,
        label: B(V, k)
      }), W > 0 && j.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: W,
        label: B(W, k)
      }), { nodes: N, links: j };
    }), y = (v, k) => It(v, k);
    return (v, k) => (m(), oe(Se, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: k[0] || (k[0] = (w) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading && !n.error ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        z(pt, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            n.error ? (m(), x("div", Np, [
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
            ])) : (m(), x("div", Wp, [
              d("section", Kp, [
                d("div", Up, [
                  z(aa, {
                    data: p.value,
                    height: "400px",
                    "use-gradient": !1,
                    "node-gap": 16
                  }, null, 8, ["data"])
                ])
              ]),
              d("section", Yp, [
                z(xe, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: u.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (m(), x("section", qp, [
                k[3] || (k[3] = d("div", { class: "section-header" }, [
                  d("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                d("div", Xp, [
                  z(gt, {
                    columns: r,
                    rows: l.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": F(({ row: w }) => [
                      d("span", Gp, A(T(He)(String(w.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": F(({ row: w }) => [
                      d("span", null, A(T(he)(Number(w.booking_initiated_count))), 1)
                    ]),
                    "cell-started": F(({ row: w }) => [
                      d("span", null, [
                        Ae(A(T(he)(Number(w.booking_started_count))) + " ", 1),
                        d("span", Zp, " (" + A(y(
                          Number(w.booking_started_count),
                          Number(w.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": F(({ row: w }) => [
                      d("span", null, A(T(he)(Number(w.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": F(({ row: w }) => [
                      d("div", Qp, [
                        z(Ge, { color: "success" }, {
                          default: F(() => [
                            Ae(" Success: " + A(T(he)(
                              g(w)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ge, { color: "danger" }, {
                          default: F(() => [
                            Ae(" Failed: " + A(T(he)(Number(w.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": F(({ row: w }) => [
                      h(w).length > 0 ? (m(), x("div", Jp, [
                        (m(!0), x(ce, null, pe(h(
                          w
                        ), (_) => (m(), x("span", {
                          key: `${w.date}-${_.currency}`,
                          class: "badge badge-currency"
                        }, A(_.currency) + " " + A(b(_.total_value)), 1))), 128))
                      ])) : (m(), x("span", e0, "N/A"))
                    ]),
                    "cell-outcomes": F(({ row: w }) => [
                      d("div", t0, [
                        z(Ge, { color: "danger" }, {
                          default: F(() => [
                            Ae(" Not Found: " + A(w.not_found_count ? T(he)(Number(w.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ge, { color: "warning" }, {
                          default: F(() => [
                            Ae(" Cancelled: " + A(w.cancelled_count ? T(he)(Number(w.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ge, { color: "orange" }, {
                          default: F(() => [
                            Ae(" No Balance: " + A(w.no_pending_balance_count ? T(he)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ge, { color: "danger" }, {
                          default: F(() => [
                            Ae(" Errors: " + A(w.error_count ? T(he)(Number(w.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), x("section", a0, [...k[4] || (k[4] = [
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
    }, r = se([]), l = [
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
    ), h = C(
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
    ), g = C(() => {
      const _ = o.data;
      return _ && (Array.isArray(_.checkin_by_day) && _.checkin_by_day.length > 0 || (_.total_checkin_initiated ?? 0) > 0) ? { ...s, ..._ } : o.checkinData ?? s;
    }), b = C(() => {
      const _ = o.data;
      return _ && (Array.isArray(_.failed_by_step_by_day) && _.failed_by_step_by_day.length > 0 || Array.isArray(_.unrecovered_by_step) && _.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: _.total_checkin_failed ?? 0,
        total_checkin_unrecovered: _.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: _.failed_by_step_by_day ?? [],
        unrecovered_by_step: _.unrecovered_by_step ?? [],
        unrecovered_by_day: _.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), f = (_, $) => !$ || $ === 0 ? "0.0%" : It(_, $), p = (_, $) => {
      const S = he(_), M = f(_, $);
      return `${S} (${M})`;
    }, y = (_) => _.reduce(($, S) => $ + S.failed_count, 0), v = C(() => {
      const _ = [], $ = [], S = /* @__PURE__ */ new Set(), M = (J, U = {}) => {
        S.has(J) || (_.push({ name: J, ...U }), S.add(J));
      };
      if (!g.value.total_checkin_initiated)
        return { nodes: _, links: $ };
      M("Checkin Init", { value: g.value.total_checkin_initiated }), M("Booking retrive"), M("Booking retrive success"), M("Number of Passengers"), M("Completed"), M("Closed with BP");
      const I = g.value.total_checkin_initiated, V = g.value.total_checkin_init, W = g.value.total_checkin_init_abandoned || 0, D = g.value.total_checkin_pre_init_abandoned_error, P = g.value.total_checkin_pre_init_abandoned_voluntary, B = D != null || P != null, N = B ? Math.max(Number(D) || 0, 0) : 0, j = B ? Math.max(Number(P) || 0, 0) : 0, Q = g.value.total_checkin_init_abandoned_error, X = g.value.total_checkin_init_abandoned_voluntary, re = Q != null || X != null, H = re ? Math.max(Number(Q) || 0, 0) : 0, ae = re ? Math.max(Number(X) || 0, 0) : 0, L = re ? Math.max(W - H - ae, 0) : W, Y = V - W, q = g.value.total_checkin_started, G = g.value.total_checkin_completed, ue = g.value.total_checkin_closed, me = b.value.unrecovered_by_step || [], ne = me.reduce(
        (J, U) => J + U.count,
        0
      );
      V > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: V,
        label: ye(V, I)
      });
      const R = I - V;
      B ? (j > 0 && (M("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: j,
        label: ye(j, I)
      })), N > 0 && (M("Booking not retreived", { status: "error" }), $.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: N,
        label: ye(N, I)
      }))) : R > 0 && (M("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: R,
        label: ye(R, I)
      })), re ? (H > 0 && (M("Error", { status: "error" }), $.push({
        source: "Booking retrive",
        target: "Error",
        value: H,
        label: ye(H, I)
      })), ae > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: ae,
        label: ye(ae, I)
      })), L > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: ye(L, I)
      }))) : W > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: W,
        label: ye(W, I)
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
      }), G > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: G,
        label: ye(G, I)
      }), me.length > 0 && ne > 0 && (M("Unrecovered", { status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: ne,
        label: ye(ne, I)
      }), me.forEach((J, U) => {
        const fe = J.step_name.replace(/_/g, " ").split(" ").map((be) => be.charAt(0).toUpperCase() + be.slice(1)).join(" ");
        M(fe, { status: "error", order: U + 1 }), $.push({
          source: "Unrecovered",
          target: fe,
          value: J.count,
          label: ye(J.count, I)
        });
      }));
      const K = q - (G + ne);
      K > 0 && (M("Abandoned (Flow)", { status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: K,
        label: ye(K, I)
      }));
      const ie = G - ue;
      return ie > 0 && (M("BP Error", { status: "error", order: 0 }), $.push({
        source: "Completed",
        target: "BP Error",
        value: ie,
        label: ye(ie, I)
      })), ue > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: ue,
        label: ye(ue, I)
      }), { nodes: _, links: $ };
    }), k = () => {
      const _ = o.data?.record_locator_by_day;
      if (Array.isArray(_) && _.length > 0) return _;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, w = () => {
      const _ = g.value.checkin_by_day || [], $ = b.value.failed_by_step_by_day || [], S = k();
      if (_.length === 0) {
        r.value = [];
        return;
      }
      r.value = [..._].map((M) => {
        const I = $.find(
          (W) => W.date === M.date
        ), V = S.find(
          (W) => W.date === M.date
        );
        return {
          ...M,
          failed_steps: I?.steps || [],
          record_locator_create_payment_count: M.record_locator_create_payment_count ?? V?.record_locator_create_payment_count ?? 0
        };
      }), r.value.sort((M, I) => new Date(M.date) - new Date(I.date));
    };
    return Te(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        w();
      },
      { deep: !0, immediate: !0 }
    ), (_, $) => (m(), oe(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", s0, [
          v.value.nodes.length > 0 ? (m(), x("section", i0, [
            d("div", r0, [
              z(aa, {
                data: v.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : E("", !0),
          r.value && r.value.length > 0 ? (m(), x("section", l0, [
            d("div", c0, [
              z(gt, {
                columns: u.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: S }) => [
                  d("span", d0, A(T(He)(String(S.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": F(({ row: S }) => [
                  d("span", null, A(T(he)(S.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": F(({ row: S }) => [
                  d("span", null, A(p(
                    S.checkin_init_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": F(({ row: S }) => [
                  d("span", null, A(T(he)(S.checkin_started_count)), 1)
                ]),
                "cell-completed": F(({ row: S }) => [
                  d("span", null, A(p(
                    S.checkin_completed_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-closed": F(({ row: S }) => [
                  d("span", u0, A(p(
                    S.checkin_closed_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-failed": F(({ row: S }) => [
                  d("span", h0, A(p(
                    y(S.failed_steps),
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": F(({ row: S }) => [
                  S.failed_steps && S.failed_steps.length > 0 ? (m(), x("div", f0, [
                    (m(!0), x(ce, null, pe(S.failed_steps, (M) => (m(), x("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      d("span", g0, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      d("span", m0, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), x("div", p0, "-"))
                ]),
                "cell-createPayment": F(({ row: S }) => [
                  d("span", null, A(T(he)(S.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), x("section", b0, [...$[0] || ($[0] = [
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
}, L0 = { class: "empty-state-content" }, R0 = { class: "empty-icon-wrapper" }, P0 = /* @__PURE__ */ de({
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
    }, c = (k) => k.replace(/_/g, " ").replace(/\b\w/g, (w) => w.toUpperCase()), u = (k, w) => It(k, w), h = (k, w) => {
      const _ = k || 0, $ = w || 0, S = r(_), M = u(_, $);
      return `${S} (${M})`;
    }, g = C(() => {
      const k = n.checkinData?.record_locator_by_day || [], w = n.failedData?.failed_by_step_by_day || [], _ = n.failedData?.unrecovered_by_day || [];
      return k.map((S) => {
        const M = w.find((V) => V.date === S.date), I = _.find(
          (V) => V.date === S.date
        );
        return {
          ...S,
          failed_steps: M?.steps || [],
          unrecovered_count: I?.unrecovered_count || 0
        };
      }).sort(
        (S, M) => new Date(S.date).getTime() - new Date(M.date).getTime()
      );
    }), b = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], f = {
      key: "createPayment",
      label: "Create Payment",
      align: "center"
    }, p = C(
      () => n.isAvianca ? [...b, f] : b
    ), y = C(
      () => g.value.map((k) => ({
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
      const k = [], w = [], _ = /* @__PURE__ */ new Set(), $ = (R, K = {}) => {
        _.has(R) || (k.push({ name: R, ...K }), _.add(R));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: k, links: w };
      const S = n.checkinData.total_checkin_initiated || 0;
      $("Checkin Init", { value: S }), $("Booking Retrieval"), $("Booking Retrieved"), $("Completed"), $("Closed with BP");
      const M = n.checkinData.total_record_locator_init || 0, I = n.checkinData.total_record_locator_init_abandoned || 0, V = n.checkinData.total_checkin_pre_init_abandoned_error, W = n.checkinData.total_checkin_pre_init_abandoned_voluntary, D = V != null || W != null, P = D ? Math.max(Number(V) || 0, 0) : 0, B = D ? Math.max(Number(W) || 0, 0) : 0, N = n.checkinData.total_record_locator_init_abandoned_error, j = n.checkinData.total_record_locator_init_abandoned_voluntary, Q = N != null || j != null, X = Q ? Math.max(Number(N) || 0, 0) : 0, re = Q ? Math.max(Number(j) || 0, 0) : 0, H = Q ? Math.max(I - X - re, 0) : I, ae = M - I, L = n.checkinData.total_record_locator_started || 0, Y = n.checkinData.total_record_locator_completed || 0, q = n.checkinData.total_record_locator_closed || 0, G = n.checkinData.total_record_locator_unrecovered || 0;
      M > 0 && w.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: M,
        label: ye(M, S)
      });
      const ue = S - M;
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
      }))) : ue > 0 && ($("Abandoned (Init)"), w.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: ue,
        label: ye(ue, S)
      })), Q ? (X > 0 && ($("Error"), w.push({
        source: "Booking Retrieval",
        target: "Error",
        value: X,
        label: ye(X, S)
      })), re > 0 && ($("Abandoned (Started)"), w.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: re,
        label: ye(re, S)
      })), H > 0 && ($("Abandoned (Started)"), w.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: H,
        label: ye(H, S)
      }))) : I > 0 && ($("Abandoned (Started)"), w.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: I,
        label: ye(I, S)
      })), ae > 0 && w.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: ae,
        label: ye(ae, S)
      }), Y > 0 && w.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: Y,
        label: ye(Y, S)
      }), G > 0 && ($("Errors"), w.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: G,
        label: ye(G, S)
      }));
      const me = L - (Y + G);
      me > 0 && ($("Abandoned (Flow)"), w.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: me,
        label: ye(me, S)
      }));
      const ne = Y - q;
      return ne > 0 && ($("BP Error"), w.push({
        source: "Completed",
        target: "BP Error",
        value: ne,
        label: ye(ne, S)
      })), q > 0 && w.push({
        source: "Completed",
        target: "Closed with BP",
        value: q,
        label: ye(q, S)
      }), { nodes: k, links: w };
    });
    return t({ isDark: i }), (k, w) => (m(), oe(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": n.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", x0, [
          v.value.nodes.length > 0 ? (m(), x("div", k0, [
            z(aa, {
              data: v.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : E("", !0),
          g.value && g.value.length > 0 ? (m(), x("div", _0, [
            d("div", w0, [
              z(gt, {
                columns: p.value,
                rows: y.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: _ }) => [
                  d("span", C0, A(l(String(_.date))), 1)
                ]),
                "cell-checkinInit": F(({ row: _ }) => [
                  d("span", null, A(r(_.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": F(({ row: _ }) => [
                  d("span", null, A(h(
                    _.record_locator_init_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": F(({ row: _ }) => [
                  d("span", null, A(h(
                    _.record_locator_started_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-completed": F(({ row: _ }) => [
                  d("span", null, A(h(
                    _.record_locator_completed_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-closed": F(({ row: _ }) => [
                  d("span", $0, A(h(
                    _.record_locator_closed_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-failed": F(({ row: _ }) => [
                  d("span", S0, A(h(
                    _.unrecovered_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-createPayment": F(({ row: _ }) => [
                  d("span", null, A(r(
                    _.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-reasons": F(({ row: _ }) => [
                  Array.isArray(_.failed_steps) && _.failed_steps.length > 0 ? (m(), x("div", M0, [
                    (m(!0), x(ce, null, pe(_.failed_steps, ($) => (m(), x("div", {
                      key: $.step_name,
                      class: "reason-item"
                    }, [
                      d("span", D0, A(c($.step_name)) + ":", 1),
                      d("span", A0, A($.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), x("div", T0, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), x("div", B0, [
            d("div", L0, [
              d("div", R0, [
                z(T(rt), { class: "empty-icon" })
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
}, K0 = /* @__PURE__ */ de({
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
    ), c = (g, b) => !b || b === 0 || !g ? "0%" : `${Math.round(g / b * 100)}%`, u = (g) => !g || g === "None" ? "-" : String(g).trim().replace(/_[0-9]+$/i, ""), h = (g) => {
      const b = u(g?.departure_airport), f = u(g?.arrival_airport);
      return b === "-" || f === "-" ? !1 : b === f;
    };
    return t({ isDark: i }), (g, b) => (m(), oe(Se, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", I0, [
          n.data.length > 0 ? (m(), x("section", E0, [
            d("div", F0, [
              z(gt, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": F(({ row: f }) => [
                  d("span", O0, A(u(f.departure_airport)), 1)
                ]),
                "cell-connection": F(({ row: f }) => [
                  d("span", {
                    class: Z(["segment-plain", {
                      "segment-plain--muted": u(f.conexion_airport) === "-"
                    }])
                  }, A(u(f.conexion_airport)), 3)
                ]),
                "cell-arrival": F(({ row: f }) => [
                  d("span", V0, A(u(f.arrival_airport)), 1)
                ]),
                "cell-trip": F(({ row: f }) => [
                  d("span", z0, A(h(f) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": F(({ row: f }) => [
                  Ae(A(T(he)(f.segment_init_count)), 1)
                ]),
                "cell-started": F(({ row: f }) => [
                  d("span", N0, A(c(
                    f.segment_started_count,
                    f.segment_init_count
                  )), 1)
                ]),
                "cell-completed": F(({ row: f }) => [
                  d("span", j0, A(c(
                    f.segment_completed_count,
                    f.segment_init_count
                  )), 1)
                ]),
                "cell-closed": F(({ row: f }) => [
                  d("span", H0, A(c(
                    f.segment_closed_count,
                    f.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (m(), x("section", W0, [...b[0] || (b[0] = [
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
}), Cr = /* @__PURE__ */ ve(K0, [["__scopeId", "data-v-b8704d3c"]]), U0 = { class: "checkin-container__body" }, Y0 = /* @__PURE__ */ de({
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
    return (c, u) => (m(), oe(Se, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[1] || (u[1] = (h) => n("open"))
    }, {
      default: F(() => [
        d("div", U0, [
          e.showCheckin ? (m(), oe(wr, {
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
            onExport: u[0] || (u[0] = (h) => i("checkin", h))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "is-avianca"])) : E("", !0),
          z(Cr, {
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
}, ub = /* @__PURE__ */ de({
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
      return y.length === 0 ? g(0) : y.map((v) => `${v.currency} ${g(v.total_value)}`).join(" · ");
    }), h = (y, v) => It(y, v), g = (y) => Ie(y), b = (y) => (y ?? []).reduce((v, k) => v + (k.count ?? 0), 0), f = (y) => typeof y.sell_success_count == "number" ? y.sell_success_count : b(y.payment_success_total), p = C(() => {
      const y = n.data, v = y.total_disruption_conversations || 0, k = y.total_disruption_initiated || 0, w = y.total_voluntary || 0, _ = y.total_involuntary || 0, $ = y.total_accepted || 0, S = y.total_confirmed || 0, M = typeof y.total_sell_success == "number" ? y.total_sell_success : b(y.total_payment_success), I = y.total_sell_failed || 0, V = Math.max(0, v - k), W = Math.max(
        0,
        k - w - _
      ), D = Math.max(0, _ - $), P = Math.max(0, w - S), B = I, N = Math.max(0, S - M - B), j = (re, H) => ye(re, H), Q = [
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
      ], X = [];
      return k > 0 && X.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: j(k, v)
      }), V > 0 && X.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: V,
        label: j(V, v)
      }), w > 0 && X.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: j(w, v)
      }), _ > 0 && X.push({
        source: "Started",
        target: "Involuntary",
        value: _,
        label: j(_, v)
      }), W > 0 && X.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: W,
        label: j(W, v)
      }), $ > 0 && X.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: j($, v)
      }), D > 0 && X.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: D,
        label: j(D, v)
      }), S > 0 && X.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: j(S, v)
      }), P > 0 && X.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: P,
        label: j(P, v)
      }), M > 0 && X.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: j(M, v)
      }), B > 0 && X.push({
        source: "Confirmed",
        target: "Rejected",
        value: B,
        label: j(B, v)
      }), N > 0 && X.push({
        source: "Confirmed",
        target: "Not Paid",
        value: N,
        label: j(N, v)
      }), { nodes: Q, links: X };
    });
    return (y, v) => (m(), oe(Se, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: v[0] || (v[0] = (k) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", X0, [
          d("section", G0, [
            d("div", Z0, [
              p.value.nodes.length > 0 && p.value.links.length > 0 ? (m(), oe(aa, {
                key: 0,
                data: p.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])) : (m(), x("div", Q0, [...v[1] || (v[1] = [
                d("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          d("section", J0, [
            z(xe, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (m(), x("section", eb, [
            v[2] || (v[2] = d("div", { class: "section-header" }, [
              d("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            d("div", tb, [
              z(gt, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: k }) => [
                  d("span", ab, A(T(He)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": F(({ row: k }) => [
                  d("span", nb, A(T(he)(Number(k.disruption_conversations))), 1)
                ]),
                "cell-started": F(({ row: k }) => [
                  d("span", ob, [
                    Ae(A(T(he)(Number(k.disruption_initiated_count))) + " ", 1),
                    d("span", sb, " (" + A(h(
                      Number(k.disruption_initiated_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": F(({ row: k }) => [
                  d("span", ib, [
                    d("span", rb, A(T(he)(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count)
                    )) + " (" + A(h(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": F(({ row: k }) => [
                  d("div", lb, [
                    (m(!0), x(ce, null, pe([k], (w, _) => (m(), x(ce, { key: _ }, [
                      z(Ge, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: F(() => [
                          Ae(" VOL " + A(T(he)(w.voluntary_count)) + " (" + A(h(
                            w.voluntary_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "success" }, {
                        default: F(() => [
                          Ae(" Confirm " + A(T(he)(w.confirmed_count)) + " (" + A(h(
                            w.confirmed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "warning" }, {
                        default: F(() => [
                          Ae(" Not Confirm " + A(T(he)(w.voluntary_count - w.confirmed_count)) + " (" + A(h(
                            w.voluntary_count - w.confirmed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "danger" }, {
                        default: F(() => [
                          Ae(" Reject " + A(T(he)(w.sell_failed_count)) + " (" + A(h(
                            w.sell_failed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "orange" }, {
                        default: F(() => [
                          Ae(" Not Paid " + A(T(he)(
                            Math.max(
                              0,
                              w.confirmed_count - f(w) - w.sell_failed_count
                            )
                          )) + " (" + A(h(
                            Math.max(
                              0,
                              w.confirmed_count - f(w) - w.sell_failed_count
                            ),
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: F(() => [
                          Ae(" Finish " + A(T(he)(f(w))) + " (" + A(h(
                            f(w),
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (m(!0), x(ce, null, pe(w.payment_success_total || [], ($) => (m(), oe(Ge, {
                        key: `${w.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: F(() => [
                          Ae(A($.currency) + " " + A(g($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": F(({ row: k }) => [
                  d("div", cb, [
                    (m(!0), x(ce, null, pe([k], (w, _) => (m(), x(ce, { key: _ }, [
                      z(Ge, { color: "purple" }, {
                        default: F(() => [
                          Ae(" INV " + A(T(he)(w.involuntary_count)) + " (" + A(h(
                            w.involuntary_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "danger" }, {
                        default: F(() => [
                          Ae(" Human " + A(T(he)(w.involuntary_count - w.accepted_count)) + " (" + A(h(
                            w.involuntary_count - w.accepted_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "success" }, {
                        default: F(() => [
                          Ae(" Accept " + A(T(he)(w.accepted_count)) + " (" + A(h(
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
          ])) : (m(), x("section", db, [...v[3] || (v[3] = [
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
}, yb = /* @__PURE__ */ de({
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
    }, i = $e(n, "theme"), { isDark: r } = Me(i), l = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = se({
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
    ), h = C(() => {
      const b = u.value, f = b.total_airline_information_retrieved + b.total_booking_info_retrieved + b.total_flight_status_retrieved, p = (k) => f > 0 ? (k / f * 100).toFixed(1) : "0.0", y = b.total_faq_events, v = y > 0 ? `${(b.total_documents_found / y * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: l.airline_information,
          value: `${p(b.total_airline_information_retrieved)}%`,
          subvalue: `${he(b.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: l.booking_info,
          value: `${p(b.total_booking_info_retrieved)}%`,
          subvalue: `${he(b.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: l.flight_status,
          value: `${p(b.total_flight_status_retrieved)}%`,
          subvalue: `${he(b.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: he(b.total_documents_found),
          subvalue: v
        }
      ];
    }), g = (b) => {
      if (!b) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const f = b.faq_by_day || [];
      if (f.length > 0) {
        const p = f.map(
          (w) => He(w.date).format("MMM DD")
        ), y = f.map(
          (w) => w.airline_information_retrieved_count || 0
        ), v = f.map(
          (w) => w.flight_status_retrieved_count || 0
        ), k = f.map(
          (w) => w.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: p,
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
      (b) => {
        g(b ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (b, f) => (m(), oe(Se, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", fb, [
          d("div", gb, [
            c.value.labels && c.value.labels.length ? (m(), x("section", mb, [
              d("div", pb, [
                z(bt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              d("div", bb, [
                (m(!0), x(ce, null, pe(h.value, (p) => (m(), oe(xe, {
                  key: p.name,
                  class: "min-w-0",
                  color: p.color,
                  title: p.label,
                  value: p.value,
                  subvalue: p.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (m(), x("section", vb, [...f[0] || (f[0] = [
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
function Fo(e, t) {
  return m(), x("svg", {
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
function We() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const lt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", et = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", kb = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Dt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", At = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", _b = "kiut-select-option-badge shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.6875rem] font-medium leading-4";
function ui(e = "neutral") {
  return `${_b} kiut-select-option-badge--${e}`;
}
const wb = { class: "flex flex-row gap-3 items-center" }, Cb = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, $b = ["disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], Sb = { class: "flex min-w-0 flex-1 items-center gap-2.5 truncate" }, Mb = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, Db = { class: "relative" }, Ab = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, Tb = ["placeholder", "aria-label"], Bb = {
  key: 1,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Lb = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Rb = ["aria-selected", "onClick", "onMouseenter"], Pb = {
  key: 1,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Ib = { class: "min-w-0 flex-1 truncate" }, na = /* @__PURE__ */ de({
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
    const a = e, n = t, o = `kiut-select-${We()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = `${o}-err`, c = C(() => a.invalid ?? !1), u = se(null), h = se(null), g = se(null), b = se(null), f = se(null), p = se(!1), y = se(0), v = se(""), k = se({});
    function w() {
      const G = h.value;
      if (!G) return;
      const ue = G.getBoundingClientRect();
      k.value = {
        top: `${ue.bottom - 3}px`,
        left: `${ue.left}px`,
        width: `${ue.width}px`
      };
    }
    const _ = C(() => a.options.filter((G) => !G.disabled)), $ = C(() => {
      if (!a.searchable) return _.value;
      const G = v.value.trim().toLowerCase();
      return G ? _.value.filter(
        (ue) => ue.label.toLowerCase().includes(G) || ue.badge?.label.toLowerCase().includes(G)
      ) : _.value;
    }), S = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), M = C(
      () => a.options.find((G) => G.value === a.modelValue) ?? null
    ), I = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : M.value?.label ?? String(a.modelValue)), V = C(() => M.value?.leadingClass);
    function W(G) {
      return `${String(G.value)}-${G.label}`;
    }
    function D(G) {
      return a.modelValue === G.value;
    }
    function P(G, ue) {
      const me = D(G), ne = y.value === ue, R = !!a.listSectionLabel;
      return [
        "flex cursor-pointer items-center gap-2.5 text-sm outline-none transition-colors",
        R ? "border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-white/5" : "gap-1.5 px-2 py-2",
        me ? R ? "bg-[color:var(--kiut-primary-section)] font-medium text-[color:var(--kiut-primary)] dark:bg-[color:var(--kiut-primary-section)]" : "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !me && ne ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      y.value = Math.max(
        0,
        $.value.findIndex((G) => G.value === a.modelValue)
      );
    }
    function N() {
      if (a.searchable) {
        f.value?.focus();
        return;
      }
      b.value?.focus();
    }
    function j() {
      w(), v.value = "", B(), Ke(() => N());
    }
    function Q() {
      p.value = !1, v.value = "";
    }
    function X(G) {
      n("update:modelValue", G.value), Q();
    }
    function re() {
      if (!a.disabled) {
        if (p.value) {
          Q();
          return;
        }
        p.value = !0, j();
      }
    }
    function H(G) {
      G.stopPropagation(), !a.disabled && re();
    }
    function ae(G) {
      if (!p.value) return;
      const ue = G.target, me = u.value, ne = g.value;
      me && !me.contains(ue) && (!ne || !ne.contains(ue)) && Q();
    }
    function L(G) {
      a.disabled || (G.key === "ArrowDown" || G.key === "Enter" || G.key === " ") && (G.preventDefault(), p.value || (p.value = !0, j()));
    }
    function Y(G) {
      const ue = $.value;
      if (G.key === "Escape") {
        G.preventDefault(), Q();
        return;
      }
      if (G.key === "ArrowDown") {
        if (G.preventDefault(), ue.length === 0) return;
        y.value = 0, b.value?.focus();
        return;
      }
      if (G.key === "ArrowUp") {
        if (G.preventDefault(), ue.length === 0) return;
        y.value = ue.length - 1, b.value?.focus();
        return;
      }
      if (G.key === "Enter") {
        G.preventDefault();
        const me = ue[y.value];
        me && X(me);
      }
    }
    function q(G) {
      const ue = $.value;
      if (G.key === "Escape") {
        G.preventDefault(), Q();
        return;
      }
      if (ue.length !== 0) {
        if (G.key === "ArrowDown") {
          G.preventDefault(), y.value = Math.min(y.value + 1, ue.length - 1);
          return;
        }
        if (G.key === "ArrowUp") {
          if (G.preventDefault(), y.value === 0 && a.searchable) {
            f.value?.focus();
            return;
          }
          y.value = Math.max(y.value - 1, 0);
          return;
        }
        if (G.key === "Enter") {
          G.preventDefault();
          const me = ue[y.value];
          me && X(me);
        }
      }
    }
    return Te(v, () => {
      y.value = 0;
    }), Je(() => {
      document.addEventListener("click", ae);
    }), it(() => {
      document.removeEventListener("click", ae);
    }), (G, ue) => (m(), x("div", {
      ref_key: "rootRef",
      ref: u,
      class: "relative font-sans"
    }, [
      d("div", wb, [
        G.$slots.icon ? (m(), x("span", Cb, [
          ke(G.$slots, "icon")
        ])) : E("", !0),
        e.label ? (m(), x("label", {
          key: 1,
          id: s,
          class: Z(T(lt))
        }, A(e.label), 3)) : E("", !0)
      ]),
      d("button", {
        ref_key: "buttonRef",
        ref: h,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          T(et),
          c.value ? T(Dt) : "",
          p.value && !c.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : "",
          "flex items-center justify-between gap-2 text-left"
        ]),
        "aria-expanded": p.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : S.value,
        "aria-invalid": c.value ? "true" : void 0,
        "aria-describedby": e.errorText ? l : void 0,
        onClick: H,
        onKeydown: L
      }, [
        d("span", Sb, [
          V.value ? (m(), x("span", {
            key: 0,
            class: Z([V.value, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : E("", !0),
          M.value?.leadingIcon ? (m(), x("span", {
            key: 1,
            class: Z([
              "inline-flex shrink-0 items-center justify-center rounded-full",
              M.value.leadingIconWrapperClass
            ])
          }, [
            (m(), oe(ht(M.value.leadingIcon), {
              class: Z(["h-4 w-4", M.value.leadingIconClass])
            }, null, 8, ["class"]))
          ], 2)) : E("", !0),
          d("span", {
            class: Z([
              "min-w-0 truncate",
              e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
            ])
          }, A(I.value), 3),
          M.value?.badge ? (m(), x("span", {
            key: 2,
            class: Z(T(ui)(M.value.badge.variant))
          }, A(M.value.badge.label), 3)) : E("", !0)
        ]),
        z(T(ta), {
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", p.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, $b),
      e.errorText ? (m(), x("p", {
        key: 0,
        id: l,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 3)) : E("", !0),
      (m(), oe(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: g,
          style: we(k.value),
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (m(), x("div", Mb, [
            d("div", Db, [
              d("span", Ab, [
                z(T(Eo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
              ]),
              Xe(d("input", {
                ref_key: "searchInputRef",
                ref: f,
                "onUpdate:modelValue": ue[0] || (ue[0] = (me) => v.value = me),
                type: "search",
                class: Z([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
                placeholder: e.searchPlaceholder,
                "aria-label": e.searchPlaceholder,
                onClick: ue[1] || (ue[1] = Pe(() => {
                }, ["stop"])),
                onKeydown: Pe(Y, ["stop"])
              }, null, 42, Tb), [
                [Rt, v.value]
              ])
            ])
          ])) : E("", !0),
          e.listSectionLabel ? (m(), x("p", Bb, A(e.listSectionLabel), 1)) : E("", !0),
          d("ul", {
            id: r,
            ref_key: "listRef",
            ref: b,
            role: "listbox",
            tabindex: "-1",
            class: Z(
              e.listSectionLabel ? "max-h-60 overflow-auto pb-1" : "max-h-60 overflow-auto py-1"
            ),
            onKeydown: Pe(q, ["stop"])
          }, [
            $.value.length === 0 ? (m(), x("li", Lb, A(e.noResultsText), 1)) : E("", !0),
            (m(!0), x(ce, null, pe($.value, (me, ne) => (m(), x("li", {
              key: W(me),
              role: "option",
              "aria-selected": D(me),
              class: Z(P(me, ne)),
              onClick: Pe((R) => X(me), ["stop"]),
              onMouseenter: (R) => y.value = ne
            }, [
              me.leadingClass ? (m(), x("span", {
                key: 0,
                class: Z([me.leadingClass, "shrink-0"]),
                "aria-hidden": "true"
              }, null, 2)) : E("", !0),
              e.showOptionCheck ? (m(), x("span", Pb, [
                D(me) ? (m(), oe(T(Fo), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : E("", !0)
              ])) : E("", !0),
              M.value?.leadingIcon ? (m(), x("span", {
                key: 2,
                class: Z([
                  "inline-flex shrink-0 items-center justify-center rounded-full",
                  M.value.leadingIconWrapperClass
                ])
              }, [
                (m(), oe(ht(M.value.leadingIcon), {
                  class: Z(["h-4 w-4", M.value.leadingIconClass])
                }, null, 8, ["class"]))
              ], 2)) : E("", !0),
              d("span", Ib, A(me.label), 1),
              me.badge ? (m(), x("span", {
                key: 3,
                class: Z(T(ui)(me.badge.variant))
              }, A(me.badge.label), 3)) : E("", !0)
            ], 42, Rb))), 128))
          ], 34)
        ], 4), [
          [Ht, p.value]
        ])
      ]))
    ], 512));
  }
}), St = (e) => e.replace(/\b(seller|checkin)_state\b/gi, "$1"), Eb = {
  key: 0,
  class: "w-52"
}, Fb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ob = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Vb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, zb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Nb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, jb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Hb = { class: "max-w-[360px] px-4 text-center" }, Wb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Kb = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, Ub = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, Yb = /* @__PURE__ */ de({
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
    }, u = $e(s, "theme"), { isDark: h } = Me(u), g = (k) => {
      const w = St(k).replace(/_/g, " ");
      return w.charAt(0).toUpperCase() + w.slice(1);
    }, b = C(() => {
      const k = {};
      for (const w of Object.values(s.data?.agents_by_day || {}))
        for (const [_, $] of Object.entries(w))
          k[_] = (k[_] || 0) + $;
      return k;
    }), f = C(() => {
      const k = s.data?.agents_by_day || {}, w = Object.keys(k).sort();
      if (w.length === 0)
        return { labels: [], datasets: [] };
      const $ = Object.keys(b.value).sort(
        (S, M) => b.value[M] - b.value[S] || S.localeCompare(M)
      ).slice(0, s.maxSeries).map((S) => ({
        label: g(S),
        data: w.map((M) => k[M]?.[S] || 0),
        borderColor: c(S)
      }));
      return {
        labels: w.map((S) => He(S).format("MMM DD")),
        datasets: $
      };
    }), p = C(() => {
      const k = Object.values(b.value).reduce((_, $) => _ + $, 0), w = s.totalConversations ?? k;
      return w === 0 ? [] : Object.entries(b.value).sort(([, _], [, $]) => $ - _).map(([_, $]) => ({
        name: _,
        label: g(_),
        total: $,
        percentage: ($ / w * 100).toFixed(1),
        color: c(_)
      }));
    }), y = C(() => p.value.slice(0, 4)), v = C(() => {
      const k = y.value.length;
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    });
    return t({ isDark: h }), (k, w) => (m(), oe(Se, {
      class: "w-full min-h-0 self-start",
      title: s.title,
      subtitle: s.subtitle,
      collapsible: !1,
      loading: s.loading
    }, {
      headerAside: F(() => [
        s.breakdownOptions.length ? (m(), x("div", Eb, [
          z(na, {
            "model-value": s.breakdownBy,
            options: s.breakdownOptions,
            "onUpdate:modelValue": l
          }, null, 8, ["model-value", "options"])
        ])) : E("", !0)
      ]),
      headerExport: F(() => [
        e.enableExport && !s.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: r
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", Fb, [
          d("div", Ob, [
            f.value.labels && f.value.labels.length ? (m(), x("section", Vb, [
              d("div", zb, [
                z(bt, {
                  data: f.value,
                  options: e.options,
                  theme: u.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              s.showSummaryCards && y.value.length ? (m(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(v.value)
              }, [
                (m(!0), x(ce, null, pe(y.value, (_) => (m(), oe(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${T(he)(_.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : E("", !0)
            ])) : s.showSummaryCards && p.value.length ? (m(), x("section", Nb, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: we(v.value)
              }, [
                (m(!0), x(ce, null, pe(y.value, (_) => (m(), oe(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${T(he)(_.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : E("", !0),
            p.value.length ? E("", !0) : (m(), x("section", jb, [
              d("div", Hb, [
                d("div", Wb, [
                  z(T(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", Kb, A(s.emptyTitle), 1),
                d("p", Ub, A(s.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), $r = /* @__PURE__ */ ve(Yb, [["__scopeId", "data-v-c97ff9a5"]]), qb = { class: "card-body" }, Xb = {
  key: 0,
  class: "chart-section"
}, Gb = { class: "chart-wrapper" }, Zb = {
  key: 1,
  class: "record-locator-daily-section"
}, Qb = { class: "w-full min-w-0" }, Jb = { class: "cell-plain font-medium" }, ev = { class: "cell-plain text-center" }, tv = { class: "cell-plain text-center" }, av = { class: "cell-plain text-center" }, nv = { class: "cell-plain text-center" }, ov = { class: "cell-plain text-center success-value" }, sv = { class: "cell-plain text-center failed-value" }, iv = { class: "cell-plain text-center warning-value" }, rv = { class: "cell-plain text-center" }, lv = { class: "cell-plain text-center failed-value" }, cv = {
  key: 2,
  class: "empty-state"
}, dv = /* @__PURE__ */ de({
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
    ), h = C(
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
    ), g = C(() => n.data), b = (y, v) => It(y, v), f = (y, v) => {
      const k = he(y), w = b(y, v);
      return `${k} (${w})`;
    }, p = C(() => {
      const y = [], v = [], k = /* @__PURE__ */ new Set(), w = (q) => {
        k.has(q) || (y.push({ name: q }), k.add(q));
      };
      if (!g.value.total_checkin_initiated)
        return { nodes: y, links: v };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const _ = g.value.total_checkin_initiated, $ = g.value.total_record_locator_init, S = g.value.total_record_locator_started, M = g.value.total_record_locator_completed, I = g.value.total_record_locator_closed, V = g.value.total_record_locator_failed, W = g.value.total_record_locator_abandoned, D = g.value.total_record_locator_init_abandoned, P = g.value.total_checkin_pre_init_abandoned_error, B = g.value.total_checkin_pre_init_abandoned_voluntary, N = P != null || B != null, j = N ? Math.max(Number(P) || 0, 0) : 0, Q = N ? Math.max(Number(B) || 0, 0) : 0, X = g.value.total_record_locator_init_abandoned_error, re = g.value.total_record_locator_init_abandoned_voluntary, H = X != null || re != null, ae = H ? Math.max(Number(X) || 0, 0) : 0, L = H ? Math.max(Number(re) || 0, 0) : 0;
      $ > 0 && v.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: ye($, _)
      });
      const Y = _ - $;
      return N ? (Q > 0 && (w("Abandoned (Init)"), v.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ye(Q, _)
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
      }), H ? (ae > 0 && (w("Error"), v.push({
        source: "Booking retrive",
        target: "Error",
        value: ae,
        label: ye(ae, _)
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
      }), V > 0 && (w("Checkin Failed"), v.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: V,
        label: ye(V, _)
      })), W > 0 && (w("Abandoned (Flow)"), v.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: W,
        label: ye(W, _)
      })), { nodes: y, links: v };
    });
    return t({ isDark: i }), (y, v) => (m(), oe(Se, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: n.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", qb, [
          p.value.nodes.length > 0 ? (m(), x("section", Xb, [
            d("div", Gb, [
              z(aa, {
                data: p.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : E("", !0),
          r.value && r.value.length > 0 ? (m(), x("section", Zb, [
            d("div", Qb, [
              z(gt, {
                columns: u.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: k }) => [
                  d("span", Jb, A(T(He)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": F(({ row: k }) => [
                  d("span", ev, A(T(he)(k.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": F(({ row: k }) => [
                  d("span", tv, A(f(
                    k.record_locator_init_count,
                    k.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": F(({ row: k }) => [
                  d("span", av, A(T(he)(k.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": F(({ row: k }) => [
                  d("span", nv, A(f(
                    k.record_locator_completed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": F(({ row: k }) => [
                  d("span", ov, A(f(
                    k.record_locator_closed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": F(({ row: k }) => [
                  d("span", sv, A(f(
                    k.record_locator_failed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": F(({ row: k }) => [
                  d("span", iv, A(f(
                    k.record_locator_abandoned_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": F(({ row: k }) => [
                  d("span", rv, A(T(he)(
                    k.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": F(({ row: k }) => [
                  d("span", lv, A(T(he)(
                    k.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), x("section", cv, [...v[0] || (v[0] = [
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
}), uv = /* @__PURE__ */ ve(dv, [["__scopeId", "data-v-f904c66a"]]), hv = { class: "card-body" }, fv = {
  key: 0,
  class: "chart-section"
}, gv = {
  key: 1,
  class: "empty-state"
}, mv = {
  key: 2,
  class: "comparison-section"
}, pv = { class: "comparison-grid" }, bv = /* @__PURE__ */ de({
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
    ], s = e, i = a, r = (f) => {
      i("export", f);
    }, { isDark: l } = Me($e(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const f = /* @__PURE__ */ new Set();
      for (const p of s.data?.sales_by_channel_by_day ?? [])
        for (const y of Object.keys(p.channels))
          f.add(y);
      return Array.from(f).sort();
    }), u = (f, p) => n[f.toLowerCase()] ?? o[p % o.length];
    function h(f) {
      return f.replace(/_/g, " ").toUpperCase();
    }
    function g(f) {
      if (f.delta === null) return "No previous data";
      const p = he(f.previous), y = `${Math.abs(f.delta).toFixed(1)}%`;
      return f.delta === 0 ? `0.0% vs prev. period (${p})` : `${f.delta > 0 ? "↑" : "↓"} ${y} vs prev. period (${p})`;
    }
    const b = C(() => {
      const f = s.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const p = f.map((v) => He(v.date).format("MMM-DD")), y = c.value.map((v, k) => ({
        label: v,
        data: f.map((w) => w.channels[v] ?? 0),
        backgroundColor: u(v, k),
        borderRadius: 4
      }));
      return { labels: p, datasets: y };
    });
    return t({ isDark: l }), (f, p) => (m(), oe(Se, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !s.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: r,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", hv, [
          b.value.labels.length > 0 ? (m(), x("section", fv, [
            z(Mt, {
              data: b.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (m(), x("section", gv, [...p[0] || (p[0] = [
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
          e.channelComparison.length > 0 ? (m(), x("section", mv, [
            d("div", pv, [
              (m(!0), x(ce, null, pe(e.channelComparison, (y, v) => (m(), oe(T(xe), {
                key: y.channel,
                color: u(y.channel, v),
                title: h(y.channel),
                value: T(he)(y.current),
                subvalue: g(y)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : E("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Sr = /* @__PURE__ */ ve(bv, [["__scopeId", "data-v-4879d791"]]), vv = { class: "card-body" }, yv = {
  key: 0,
  class: "chart-section"
}, xv = { class: "chart-wrapper" }, kv = {
  key: 1,
  class: "empty-state"
}, _v = { class: "seller-value-cards" }, wv = {
  key: 2,
  class: "seller-daily-section"
}, Cv = { class: "w-full min-w-0" }, $v = { class: "sl-cell font-medium" }, Sv = { class: "sl-cell text-center" }, Mv = { class: "sl-cell text-center" }, Dv = { class: "sl-cell text-center" }, Av = { class: "sl-cell text-center" }, Tv = { class: "sl-cell text-center success-value" }, Bv = {
  key: 0,
  class: "currency-cell-list"
}, Lv = {
  key: 1,
  class: "empty-cell"
}, Rv = { class: "sl-cell text-center success-value" }, Pv = { class: "sl-cell text-center success-value" }, Iv = {
  key: 0,
  class: "currency-cell-list"
}, Ev = {
  key: 1,
  class: "empty-cell"
}, Fv = { class: "sl-cell text-center success-value" }, Ov = { class: "sl-cell text-center" }, Vv = { class: "sl-cell text-center success-value" }, zv = {
  key: 0,
  class: "currency-cell-list"
}, Nv = { key: 1 }, jv = {
  key: 0,
  class: "failed-reasons"
}, Hv = { class: "reason-name" }, Wv = { class: "reason-count" }, Kv = {
  key: 1,
  class: "empty-cell"
}, Uv = /* @__PURE__ */ de({
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
          (N) => N.date === P.date
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
    ), h = C(() => o.sellerData), g = C(() => o.failedData), b = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), f = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_bank_transfer) ? o.sellerData.total_value_sell_success_bank_transfer : []
    ), p = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_cash) ? o.sellerData.total_value_sell_success_cash : []
    ), y = C(() => {
      const D = b.value;
      return D.length > 0 ? D.map(
        (P) => `${P.currency} ${Ut(P.total_value)}`
      ).join(" · ") : W(o.sellerData.total_value_sell_success);
    });
    function v(D) {
      return D.length > 0 ? D.map(
        (P) => `${P.currency} ${Ut(P.total_value)}`
      ).join(" · ") : "—";
    }
    const k = C(
      () => v(f.value)
    ), w = C(
      () => v(p.value)
    ), _ = (D) => D.replace(/_/g, " ").replace(/\b\w/g, (P) => P.toUpperCase()), $ = (D) => `Failed:
${_(D)}`, S = C(() => {
      const {
        total_seller_conversations: D = 0,
        total_sell_started: P = 0,
        total_sell_booking_created: B = 0,
        total_sell_success: N = 0,
        total_sell_success_bank_transfer: j = 0,
        total_sell_success_cash: Q = 0
      } = h.value, { failed_by_reason_by_day: X = [] } = g.value;
      if (D === 0) return { nodes: [], links: [] };
      const re = N, H = [
        { name: "Sell Initiated", value: D, status: "success" },
        { name: "Sell Started", value: P, status: "success" },
        { name: "Booking Created", value: B, status: "success" },
        { name: "Sell Success", value: re, status: "success" }
      ], ae = [], L = D - P;
      L > 0 && (H.push({
        name: "Abandoned (Init)",
        value: L,
        status: "abandon"
      }), ae.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: L,
        label: ye(L, D)
      })), P > 0 && ae.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: P,
        label: ye(P, D)
      });
      const Y = X.reduce(
        (ue, me) => (me.reasons && Array.isArray(me.reasons) && me.reasons.forEach((ne) => {
          const R = ne.reason, K = ne.failed_count;
          ue[R] = (ue[R] || 0) + K;
        }), ue),
        {}
      );
      B > 0 && ae.push({
        source: "Sell Started",
        target: "Booking Created",
        value: B,
        label: ye(B, D)
      }), (j ?? 0) > 0 && (H.push({
        name: "Bank Transfer",
        value: j ?? 0,
        status: "success"
      }), ae.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: j ?? 0,
        label: ye(j ?? 0, D)
      })), (Q ?? 0) > 0 && (H.push({
        name: "Cash Option",
        value: Q ?? 0,
        status: "success"
      }), ae.push({
        source: "Booking Created",
        target: "Cash Option",
        value: Q ?? 0,
        label: ye(Q ?? 0, D)
      })), re > 0 && ae.push({
        source: "Booking Created",
        target: "Sell Success",
        value: re,
        label: ye(re, D)
      });
      const q = B - re - (j ?? 0) - (Q ?? 0);
      q > 0 && (H.push({
        name: "Failed at Completion",
        value: q,
        status: "error"
      }), ae.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: q,
        label: ye(q, D)
      }));
      const G = P - B;
      if (G > 0 && (H.push({
        name: "Failed at Booking",
        value: G,
        status: "error"
      }), ae.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: G,
        label: ye(G, D)
      })), Object.keys(Y).length > 0) {
        const ue = Object.values(Y).reduce(
          (ne, R) => ne + R,
          0
        ), me = G - ue;
        Object.entries(Y).filter(([, ne]) => ne > 0).sort(([, ne], [, R]) => R - ne).forEach(([ne, R]) => {
          const K = `Failed: ${ne}`;
          H.push({
            name: K,
            value: R,
            status: "error",
            label: $(ne)
          }), ae.push({
            source: "Failed at Booking",
            target: K,
            value: R,
            label: ye(R, D)
          });
        }), me > 0 && (H.push({
          name: "Failed: Without Reason",
          value: me,
          status: "error",
          label: `Failed:
Without Reason`
        }), ae.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: me,
          label: ye(me, D)
        }));
      }
      return {
        nodes: H,
        links: ae
      };
    }), M = (D, P) => It(D, P), I = (D, P) => {
      const B = he(D), N = M(D, P);
      return `${B} (${N})`;
    }, V = (D) => D == null ? 0 : typeof D == "number" ? D : Array.isArray(D) ? D.reduce((P, B) => P + (B.total_value || 0), 0) : 0, W = (D) => Ut(V(D));
    return t({ isDark: r }), (D, P) => (m(), oe(Se, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !o.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", vv, [
          S.value.nodes.length > 0 ? (m(), x("section", yv, [
            d("div", xv, [
              z(aa, {
                data: S.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (m(), x("section", kv, [...P[0] || (P[0] = [
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
          d("section", _v, [
            z(xe, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: y.value
            }, null, 8, ["value"]),
            o.showPaymentMethodDetails ? (m(), x(ce, { key: 0 }, [
              z(xe, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Bank Transfer Value",
                value: k.value
              }, null, 8, ["value"]),
              z(xe, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Cash Option Value",
                value: w.value
              }, null, 8, ["value"])
            ], 64)) : E("", !0)
          ]),
          l.value && l.value.length > 0 ? (m(), x("section", wv, [
            d("div", Cv, [
              z(gt, {
                columns: c.value,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: B }) => [
                  d("span", $v, A(T(He)(String(B.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": F(({ row: B }) => [
                  d("span", Sv, A(T(he)(Number(B.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": F(({ row: B }) => [
                  d("span", Mv, A(I(
                    B.sell_started_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": F(({ row: B }) => [
                  d("span", Dv, A(I(
                    B.sell_get_quote_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": F(({ row: B }) => [
                  d("span", Av, A(I(
                    B.sell_booking_created_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-btValue": F(({ row: B }) => [
                  d("span", Tv, [
                    Array.isArray(
                      B.daily_value_sell_success_bank_transfer
                    ) && B.daily_value_sell_success_bank_transfer.length > 0 ? (m(), x("div", Bv, [
                      (m(!0), x(ce, null, pe(B.daily_value_sell_success_bank_transfer, (N) => (m(), x("span", {
                        key: `${B.date}-bt-success-${N.currency}`
                      }, A(N.currency) + " " + A(T(Ut)(N.total_value)), 1))), 128))
                    ])) : (m(), x("span", Lv, "-"))
                  ])
                ]),
                "cell-btSuccess": F(({ row: B }) => [
                  d("span", Rv, A(T(he)(
                    Number(
                      B.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-coValue": F(({ row: B }) => [
                  d("span", Pv, [
                    Array.isArray(
                      B.daily_value_sell_success_cash
                    ) && B.daily_value_sell_success_cash.length > 0 ? (m(), x("div", Iv, [
                      (m(!0), x(ce, null, pe(B.daily_value_sell_success_cash, (N) => (m(), x("span", {
                        key: `${B.date}-co-success-${N.currency}`
                      }, A(N.currency) + " " + A(T(Ut)(N.total_value)), 1))), 128))
                    ])) : (m(), x("span", Ev, "-"))
                  ])
                ]),
                "cell-cashSuccess": F(({ row: B }) => [
                  d("span", Fv, A(T(he)(
                    Number(B.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": F(({ row: B }) => [
                  d("span", Ov, A(I(
                    B.sell_success_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": F(({ row: B }) => [
                  d("span", Vv, [
                    Array.isArray(B.daily_value_sell_success) && B.daily_value_sell_success.length > 0 ? (m(), x("div", zv, [
                      (m(!0), x(ce, null, pe(B.daily_value_sell_success, (N) => (m(), x("span", {
                        key: `${B.date}-${N.currency}`
                      }, A(N.currency) + " " + A(T(Ut)(N.total_value)), 1))), 128))
                    ])) : (m(), x("span", Nv, A(W(
                      B.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": F(({ row: B }) => [
                  (B.reasons || []).length > 0 ? (m(), x("div", jv, [
                    (m(!0), x(ce, null, pe(B.reasons || [], (N) => (m(), x("div", {
                      key: N.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", Hv, A(N.reason) + ":", 1),
                      d("span", Wv, A(N.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), x("div", Kv, "-"))
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
}), Mr = /* @__PURE__ */ ve(Uv, [["__scopeId", "data-v-19fee7a8"]]), Yv = { class: "seller-container__body" }, qv = /* @__PURE__ */ de({
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
    return (c, u) => (m(), oe(Se, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[2] || (u[2] = (h) => n("open"))
    }, {
      default: F(() => [
        d("div", Yv, [
          z(Mr, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            "show-payment-method-details": e.showPaymentMethodDetails,
            onExport: u[0] || (u[0] = (h) => l("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading", "show-payment-method-details"]),
          z(Sr, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": r.value,
            onExport: u[1] || (u[1] = (h) => l("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Xv = /* @__PURE__ */ ve(qv, [["__scopeId", "data-v-34a76e0c"]]), Gv = { class: "card-body" }, Zv = {
  key: 0,
  class: "chart-section"
}, Qv = {
  key: 1,
  class: "empty-state"
}, Jv = { class: "empty-state-content" }, ey = { class: "empty-icon-wrapper" }, ty = /* @__PURE__ */ de({
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
    }, o = e, s = a, i = (h) => {
      s("export", h);
    }, { isDark: r, colors: l } = Me($e(o, "theme")), c = C(() => {
      const g = (o.data?.top_agents || []).filter(
        (y) => y.agent_type?.toLowerCase() !== "triage"
      );
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const b = g.reduce(
        (y, v) => y + (Number(v.conversations) || 0),
        0
      ), f = g.map((y) => {
        const v = y.agent_type?.toLowerCase();
        return n[v] || "#94a3b8";
      }), p = f.map((y) => `${y}80`);
      return {
        labels: g.map((y) => {
          const v = Number(y.conversations) || 0, k = b ? v / b * 100 : 0;
          return `${St(y.agent_type)} - ${v.toLocaleString()} (${k.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: g.map((y) => y.conversations),
            backgroundColor: p,
            borderColor: f,
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
            label: (h) => {
              const g = (h.label || "").toString().split(" - ")[0], b = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (y, v) => y + (Number(v) || 0),
                0
              ), p = f ? b / f * 100 : 0;
              return `${g}: ${b.toLocaleString()} (${p.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, g) => (m(), oe(Se, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", Gv, [
          c.value.labels && c.value.labels.length ? (m(), x("section", Zv, [
            z(En, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (m(), x("section", Qv, [
            d("div", Jv, [
              d("div", ey, [
                z(T(tp), { class: "empty-icon" })
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
}), ay = /* @__PURE__ */ ve(ty, [["__scopeId", "data-v-34a998ae"]]), ny = { class: "card-body" }, oy = {
  key: 0,
  class: "payment-methods-section"
}, sy = { class: "payment-methods-grid" }, iy = {
  key: 1,
  class: "empty-state"
}, ry = { class: "empty-state-content" }, ly = { class: "empty-icon-wrapper" }, cy = {
  key: 2,
  class: "payment-method-daily-section"
}, dy = { class: "w-full min-w-0" }, uy = { class: "font-medium" }, hy = { class: "text-center" }, fy = { class: "text-center success-value" }, gy = {
  key: 0,
  class: "currency-cell-list"
}, my = { class: "payment-tags" }, py = { class: "tag-name" }, by = {
  key: 0,
  class: "tag-amount"
}, vy = {
  key: 1,
  class: "tag-amount"
}, yy = { class: "tag-count" }, xy = {
  key: 3,
  class: "empty-table-state"
}, ky = "Not Registered", _y = /* @__PURE__ */ de({
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
    const n = e, o = a, { isDark: s } = Me($e(n, "theme")), i = se(!1), r = se({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = C(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), c = C(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = C(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((M, I) => He(M.date).valueOf() - He(I.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], g = C(
      () => u.value.map((M) => ({
        id: M.date,
        date: M.date,
        total_count: M.total_count,
        total_amount: M.total_amount,
        total_amount_by_currency: M.total_amount_by_currency,
        payment_methods: M.payment_methods
      }))
    ), b = (M) => {
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
        payment_method_breakdown: I,
        payment_method_by_day: V
      };
    }, f = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [M, I] = n.dates.map(
            (W) => He(W).format("YYYY-MM-DD")
          ), V = await n.fetchFunction(
            n.airlineName,
            M,
            I
          );
          r.value = b(V);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), r.value = b(null);
        } finally {
          i.value = !1;
        }
      }
    }, p = [
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#f59e0b",
      "#f43f5e",
      "#06b6d4"
    ], y = (M) => !M || M.toLowerCase() === "unknown" ? ky : M.replace(/_/g, " "), v = (M) => M == null ? "$0.00" : Ie(M), k = (M) => {
      const I = M.total_amount_by_currency;
      return I && I.length > 0 ? I.map((V) => `${V.currency} ${v(V.total_value)}`).join(" · ") : v(M.total_amount);
    }, w = (M) => M ? He(M).format("MMM DD") : "-", _ = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), $ = (M) => {
      o("export", M);
    };
    function S() {
      const M = n.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, r.value = b(M));
    }
    return Je(() => {
      n.data ? S() : f();
    }), Te(
      () => n.data,
      (M) => {
        M && S();
      },
      { deep: !0 }
    ), Te(
      () => n.dates,
      (M) => {
        n.data || M && M[0] && M[1] && f();
      },
      { deep: !0 }
    ), t({ isDark: s }), (M, I) => (m(), oe(Se, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: I[0] || (I[0] = (V) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !i.value ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", ny, [
          l.value ? (m(), x("section", oy, [
            I[1] || (I[1] = d("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            d("div", sy, [
              (m(!0), x(ce, null, pe(r.value.payment_method_breakdown, (V, W) => (m(), oe(xe, {
                key: V.payment_method,
                class: "payment-method-card-item min-w-0",
                color: p[W % p.length],
                title: y(V.payment_method),
                value: k(V),
                subvalue: `${_(V.count)} ${_(V.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (m(), x("section", iy, [
            d("div", ry, [
              d("div", ly, [
                z(T(ap), { class: "empty-icon" })
              ]),
              I[2] || (I[2] = d("p", { class: "empty-title" }, "No payment data available", -1)),
              I[3] || (I[3] = d("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (m(), x("section", cy, [
            I[5] || (I[5] = d("p", { class: "section-label" }, "Daily Breakdown", -1)),
            d("div", dy, [
              z(gt, {
                columns: h,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: V }) => [
                  d("span", uy, A(w(String(V.date))), 1)
                ]),
                "cell-totalSales": F(({ row: V }) => [
                  d("span", hy, A(T(he)(V.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": F(({ row: V }) => [
                  d("span", fy, [
                    Array.isArray(V.total_amount_by_currency) && V.total_amount_by_currency.length > 0 ? (m(), x("div", gy, [
                      (m(!0), x(ce, null, pe(V.total_amount_by_currency, (W) => (m(), x("span", {
                        key: `${V.date}-${W.currency}`
                      }, A(W.currency) + " " + A(v(W.total_value)), 1))), 128))
                    ])) : (m(), x(ce, { key: 1 }, [
                      Ae(A(v(Number(V.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": F(({ row: V }) => [
                  d("div", my, [
                    (m(!0), x(ce, null, pe(Array.isArray(V.payment_methods) ? V.payment_methods : [], (W) => (m(), x("div", {
                      key: W.payment_method,
                      class: "payment-tag"
                    }, [
                      d("span", py, A(y(W.payment_method)), 1),
                      I[4] || (I[4] = d("span", { class: "tag-separator" }, "•", -1)),
                      !W.total_amount_by_currency || W.total_amount_by_currency.length === 0 ? (m(), x("span", by, A(v(W.total_amount)), 1)) : (m(), x("span", vy, A(W.total_amount_by_currency.map(
                        (D) => `${D.currency} ${v(D.total_value)}`
                      ).join(" / ")), 1)),
                      d("span", yy, "(" + A(_(W.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : l.value ? (m(), x("div", xy, [...I[6] || (I[6] = [
            d("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : E("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), wy = /* @__PURE__ */ ve(_y, [["__scopeId", "data-v-168637eb"]]), Cy = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, $y = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Sy = {
  key: "title-content",
  class: "header-title-group"
}, My = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Dy = {
  key: 0,
  class: "metric-label metric-label--header"
}, Ay = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, Ty = { key: "aside-content" }, By = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Ly = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, Ry = {
  key: "body-content",
  class: "highlight-inner"
}, Py = { class: "card-body" }, Iy = { class: "metric-row" }, Ey = {
  key: 0,
  class: "metric-prefix"
}, Fy = {
  key: 0,
  class: "metric-label"
}, Oy = /* @__PURE__ */ de({
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
    return t({ isDark: n, changePercent: i }), (c, u) => (m(), oe(Se, {
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
      title: F(() => [
        z(pt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            e.loading ? (m(), x("div", Cy, [
              u[0] || (u[0] = d("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (m(), x("div", $y)) : E("", !0)
            ])) : (m(), x("div", Sy, [
              d("div", My, [
                ke(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (m(), x("span", Dy, A(e.label), 1)) : E("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: F(() => [
        z(pt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            e.loading ? (m(), x("div", Ay)) : (m(), x("div", Ty, [
              ke(c.$slots, "headerAside", {}, () => [
                s.value ? (m(), x("div", {
                  key: 0,
                  class: Z(["change-badge", l.value])
                }, A(r.value), 3)) : E("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: F(() => [
        z(pt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            e.loading ? (m(), x("div", By, [
              u[1] || (u[1] = d("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? E("", !0) : (m(), x("div", Ly))
            ])) : (m(), x("div", Ry, [
              d("div", Py, [
                ke(c.$slots, "value", {}, () => [
                  d("div", Iy, [
                    e.prefix ? (m(), x("span", Ey, A(e.prefix), 1)) : E("", !0),
                    d("span", {
                      class: Z(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? E("", !0) : (m(), x("span", Fy, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), ft = /* @__PURE__ */ ve(Oy, [["__scopeId", "data-v-c81268f4"]]), Vy = { class: "card-body" }, zy = { class: "kpi-closed-value" }, Ny = { class: "kpi-closed-value__main" }, jy = {
  key: 0,
  class: "kpi-closed-value__pct"
}, Hy = { class: "table-view-select flex justify-end" }, Wy = { class: "table-section w-full min-w-0" }, Ky = { class: "cell-plain" }, Uy = { class: "cell-plain" }, Yy = { class: "cell-plain cell-plain--muted" }, qy = { class: "cell-plain" }, Xy = { class: "cell-plain" }, Gy = { class: "cell-plain" }, Zy = {
  key: 2,
  class: "empty-state"
}, Qy = 6, Jy = /* @__PURE__ */ de({
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
    const n = e, o = a, s = (ne) => {
      o("export", ne);
    }, { isDark: i } = Me($e(n, "theme")), r = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function l(ne) {
      const R = ne?.trim() ?? "";
      return R.length > 0 && !r.has(R);
    }
    function c(ne) {
      if (!l(ne.agent_email)) return !1;
      const R = ne.assigned_count ?? 0, K = ne.closed_count ?? 0;
      return R > 0 || K > 0;
    }
    function u(ne) {
      return ne.closed_count ?? 0;
    }
    function h(ne) {
      const R = ne?.trim();
      return R || "—";
    }
    const g = C(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), b = C(() => g.value.length > 0), f = C(() => {
      const ne = (n.data?.total_enqueued ?? 0) > 0;
      return b.value || ne;
    }), p = se("by_date"), y = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], v = se("date"), k = se("desc");
    Te(p, (ne) => {
      ne === "aggregated" ? (v.value = "name", k.value = "asc") : (v.value = "date", k.value = "desc");
    });
    function w(ne, R) {
      return R == null ? null : R === 0 ? ne > 0 ? 100 : 0 : (ne - R) / R * 100;
    }
    function _(ne) {
      const R = ne.toFixed(1);
      return ne > 0 ? `+${R}%` : `${R}%`;
    }
    function $(ne, R = !1) {
      const K = R ? -ne : ne;
      return K > 0 ? "change-badge--up" : K < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function S(ne, R) {
      if (ne === null) return null;
      const K = w(ne, R);
      return K === null ? null : {
        label: _(K),
        class: $(K, !0)
      };
    }
    function M(ne) {
      if (ne == null || ne === "") return null;
      if (typeof ne == "number")
        return Number.isFinite(ne) ? ne : null;
      const R = ne.trim();
      if (!R) return null;
      if (R.includes(":")) {
        const ie = R.split(":").map(Number);
        return ie.length !== 3 || ie.some(isNaN) ? null : ie[0] * 3600 + ie[1] * 60 + ie[2];
      }
      const K = Number(R);
      return Number.isFinite(K) ? K : null;
    }
    function I(ne) {
      const R = Math.round(ne), K = Math.floor(R / 3600), ie = Math.floor(R % 3600 / 60), J = R % 60;
      return `${String(K).padStart(2, "0")}:${String(ie).padStart(2, "0")}:${String(J).padStart(2, "0")}`;
    }
    function V(ne) {
      const R = M(ne);
      return R === null ? "—" : typeof ne == "string" && ne.includes(":") ? ne.trim() : I(R);
    }
    const W = C(() => n.data?.total_enqueued ?? 0), D = C(() => n.data?.total_closed ?? 0), P = C(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), B = C(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), N = C(() => W.value <= 0 ? null : `(${(D.value / W.value * 100).toFixed(1)}%)`), j = C(
      () => S(
        M(P.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), Q = C(
      () => S(
        M(B.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function X(ne, R) {
      return {
        id: `${ne.date}-${ne.agent_email}-${R}`,
        date: ne.date,
        dateSort: new Date(ne.date).getTime(),
        agent_name: ne.agent_name ?? "",
        agent_email: ne.agent_email,
        handled: u(ne),
        avg_assignation_seconds: M(ne.avg_time_to_assign_seconds),
        avg_resolution_seconds: M(ne.avg_conversation_duration_seconds),
        avg_assignation_display: V(ne.avg_time_to_assign_seconds),
        avg_resolution_display: V(ne.avg_conversation_duration_seconds)
      };
    }
    function re(ne) {
      const R = /* @__PURE__ */ new Map();
      for (const K of ne) {
        if (!c(K)) continue;
        const ie = K.agent_email.trim();
        R.has(ie) || R.set(ie, {
          agent_name: K.agent_name?.trim() ?? "",
          agent_email: ie,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const J = R.get(ie), U = K.assigned_count ?? 0, ee = K.closed_count ?? 0;
        J.handled += u(K), K.agent_name?.trim() && (J.agent_name = K.agent_name.trim());
        const fe = M(K.avg_time_to_assign_seconds);
        fe !== null && U > 0 && (J.assignSum += fe * U, J.assignWeight += U);
        const be = M(K.avg_conversation_duration_seconds);
        be !== null && ee > 0 && (J.resolutionSum += be * ee, J.resolutionWeight += ee);
      }
      return Array.from(R.values()).map((K, ie) => {
        const J = K.assignWeight > 0 ? K.assignSum / K.assignWeight : null, U = K.resolutionWeight > 0 ? K.resolutionSum / K.resolutionWeight : null;
        return {
          id: `agg-${K.agent_email}-${ie}`,
          agent_name: K.agent_name,
          agent_email: K.agent_email,
          handled: K.handled,
          avg_assignation_seconds: J,
          avg_resolution_seconds: U,
          avg_assignation_display: J !== null ? I(J) : "—",
          avg_resolution_display: U !== null ? I(U) : "—"
        };
      });
    }
    const H = C(() => {
      const ne = g.value;
      return p.value === "aggregated" ? re(ne) : ne.map(X);
    });
    function ae(ne, R, K, ie) {
      const J = ie === "asc" ? 1 : -1;
      let U = 0;
      switch (K) {
        case "date":
          U = (ne.dateSort ?? 0) - (R.dateSort ?? 0);
          break;
        case "name":
          U = (ne.agent_name || "").localeCompare(R.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          U = ne.agent_email.localeCompare(R.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          U = ne.handled - R.handled;
          break;
        case "avgAssignation":
          U = (ne.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (R.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          U = (ne.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (R.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (U !== 0) return U * J;
      if (p.value === "by_date" && K !== "date") {
        const ee = (R.dateSort ?? 0) - (ne.dateSort ?? 0);
        if (ee !== 0) return ee;
      }
      return (ne.agent_name || "").localeCompare(R.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const L = C(() => {
      const ne = [...H.value];
      return ne.sort((R, K) => ae(R, K, v.value, k.value)), ne;
    }), Y = C(
      () => L.value
    ), q = C(() => {
      const ne = [];
      return p.value === "by_date" && ne.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), ne.push(
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
      ), ne;
    });
    function G(ne) {
      const R = ne;
      if (v.value === R) {
        k.value = k.value === "asc" ? "desc" : "asc";
        return;
      }
      v.value = R, R === "date" ? k.value = "desc" : R === "name" || R === "email" ? k.value = "asc" : k.value = "desc";
    }
    const ue = (ne) => ne == null ? "0" : he(ne), me = (ne) => new Date(ne).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (ne, R) => (m(), oe(Se, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: R[1] || (R[1] = (K) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", Vy, [
          f.value ? (m(), x("div", {
            key: 0,
            class: Z(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": T(i) }])
          }, [
            z(ft, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ue(W.value),
              theme: e.theme,
              "current-value": W.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: F(() => [...R[2] || (R[2] = [
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
            z(ft, {
              label: "Conversations Closed",
              "label-position": "header",
              value: ue(D.value),
              theme: e.theme,
              "current-value": D.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: F(() => [...R[3] || (R[3] = [
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
              value: F(() => [
                d("div", zy, [
                  d("span", Ny, A(ue(D.value)), 1),
                  N.value ? (m(), x("span", jy, A(N.value), 1)) : E("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            z(ft, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: V(P.value),
              theme: e.theme,
              "current-value": M(P.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Vo({
              icon: F(() => [
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
                fn: F(() => [
                  d("div", {
                    class: Z(["duration-trend-badge", j.value.class])
                  }, A(j.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            z(ft, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: V(B.value),
              theme: e.theme,
              "current-value": M(B.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Vo({
              icon: F(() => [
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
              Q.value ? {
                name: "headerAside",
                fn: F(() => [
                  d("div", {
                    class: Z(["duration-trend-badge", Q.value.class])
                  }, A(Q.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : E("", !0),
          b.value ? (m(), oe(Se, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: F(() => [
              d("div", Hy, [
                z(na, {
                  modelValue: p.value,
                  "onUpdate:modelValue": R[0] || (R[0] = (K) => p.value = K),
                  options: y,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: F(() => [
              d("div", Wy, [
                (m(), oe(gt, {
                  key: `${p.value}-${v.value}-${k.value}`,
                  columns: q.value,
                  rows: Y.value,
                  "sort-key": v.value,
                  "sort-direction": k.value,
                  "max-visible-rows": Qy,
                  "row-key": "id",
                  onSort: G
                }, {
                  "cell-date": F(({ row: K }) => [
                    d("span", Ky, A(me(String(K.date))), 1)
                  ]),
                  "cell-name": F(({ row: K }) => [
                    d("span", Uy, A(h(K.agent_name)), 1)
                  ]),
                  "cell-email": F(({ row: K }) => [
                    d("span", Yy, A(K.agent_email), 1)
                  ]),
                  "cell-handled": F(({ row: K }) => [
                    d("span", qy, A(ue(Number(K.handled))), 1)
                  ]),
                  "cell-avgAssignation": F(({ row: K }) => [
                    d("span", Xy, A(K.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": F(({ row: K }) => [
                    d("span", Gy, A(K.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : f.value ? E("", !0) : (m(), x("div", Zy, [...R[6] || (R[6] = [
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
}), e1 = /* @__PURE__ */ ve(Jy, [["__scopeId", "data-v-837b41e7"]]), t1 = {
  key: 0,
  class: "w-52"
}, a1 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, n1 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, o1 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, s1 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, i1 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, r1 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, l1 = { class: "max-w-[360px] px-4 text-center" }, c1 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, d1 = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, u1 = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, hi = 5, h1 = /* @__PURE__ */ de({
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
    }, u = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], h = (k) => {
      const w = k.toLowerCase(), _ = c[w];
      if (_) return _;
      const $ = Array.from(w).reduce(
        (S, M) => (S << 5) - S + M.charCodeAt(0) | 0,
        0
      );
      return u[Math.abs($) % u.length];
    }, g = se({
      labels: [],
      datasets: []
    }), b = C(
      () => n.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), f = C(() => {
      const k = b.value.total_by_channel || {}, w = Object.values(k).reduce(
        ($, S) => $ + S,
        0
      ), _ = n.totalConversations ?? w;
      return _ === 0 ? [] : Object.entries(k).sort(([, $], [, S]) => S - $).map(([$, S]) => ({
        name: $,
        label: $.toUpperCase(),
        total: S,
        percentage: (S / _ * 100).toFixed(1),
        color: h($)
      }));
    }), p = C(
      () => f.value.slice(0, hi)
    ), y = C(() => {
      const k = Math.min(p.value.length, hi);
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    }), v = (k) => {
      if (!k || !k.channels_by_day) {
        g.value = { labels: [], datasets: [] };
        return;
      }
      const w = k.channels_by_day, _ = Object.keys(w).sort();
      if (_.length === 0) {
        g.value = { labels: [], datasets: [] };
        return;
      }
      const $ = /* @__PURE__ */ new Set();
      for (const I of Object.values(w))
        for (const V of Object.keys(I))
          $.add(V);
      const M = Array.from($).map((I) => ({
        label: I.toUpperCase(),
        data: _.map((V) => w[V]?.[I] || 0),
        borderColor: h(I)
      }));
      g.value = {
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
    ), t({ isDark: l }), (k, w) => (m(), oe(Se, {
      class: "w-full min-h-0 self-start",
      title: n.title,
      subtitle: n.subtitle,
      collapsible: !1,
      loading: n.loading
    }, {
      headerAside: F(() => [
        n.breakdownOptions.length ? (m(), x("div", t1, [
          z(na, {
            "model-value": n.breakdownBy,
            options: n.breakdownOptions,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value", "options"])
        ])) : E("", !0)
      ]),
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", a1, [
          d("div", n1, [
            g.value.labels && g.value.labels.length ? (m(), x("section", o1, [
              d("div", s1, [
                z(bt, {
                  data: g.value,
                  theme: r.value
                }, null, 8, ["data", "theme"])
              ]),
              n.showSummaryCards && p.value.length ? (m(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(y.value)
              }, [
                (m(!0), x(ce, null, pe(p.value, (_) => (m(), oe(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${T(he)(_.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : E("", !0)
            ])) : n.showSummaryCards && f.value.length ? (m(), x("section", i1, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: we(y.value)
              }, [
                (m(!0), x(ce, null, pe(p.value, (_) => (m(), oe(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${T(he)(_.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : E("", !0),
            f.value.length ? E("", !0) : (m(), x("section", r1, [
              d("div", l1, [
                d("div", c1, [
                  z(T(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", d1, A(n.emptyTitle), 1),
                d("p", u1, A(n.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Dr = /* @__PURE__ */ ve(h1, [["__scopeId", "data-v-987b8c34"]]), f1 = /* @__PURE__ */ de({
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
    return (c, u) => a.breakdownBy === "channel" ? (m(), oe(Dr, {
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
      onChangeBreakdown: u[0] || (u[0] = (h) => n("changeBreakdown", h))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "empty-title", "empty-description"])) : (m(), oe($r, {
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
      onChangeBreakdown: u[1] || (u[1] = (h) => n("changeBreakdown", h))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "max-series", "show-summary-cards", "empty-title", "empty-description"]));
  }
}), g1 = { class: "card-body" }, m1 = { class: "chart-container" }, p1 = { class: "triage-table-block w-full min-w-0" }, b1 = { class: "triage-row-label" }, v1 = {
  key: 1,
  class: "triage-count"
}, y1 = {
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
  class: "empty-state"
}, C1 = { class: "empty-state-content" }, $1 = { class: "empty-icon-wrapper" }, S1 = /* @__PURE__ */ de({
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
        const I = M.filter((V) => V !== "triage").length;
        I >= 4 ? _["4p"] += Number(S) || 0 : _[I] += Number(S) || 0;
      }
      return _;
    }), c = C(() => {
      const w = l.value;
      return w[0] + w[1] + w[2] + w[3] + w["4p"] || 0;
    }), u = C(() => Object.keys(n.data?.combinations || {}).length > 0), h = C(() => {
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
    }), g = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], b = C(() => {
      const w = h.value, _ = l.value;
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
    }, p = (w) => w?.replace("80", "") || "#888888", y = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: f.c0,
          borderColor: p(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: f.c1,
          borderColor: p(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: f.c2,
          borderColor: p(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: f.c3,
          borderColor: p(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: p(f.c4p),
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
    return t({ isDark: i }), (w, _) => (m(), oe(Se, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", g1, [
          u.value ? (m(), x(ce, { key: 0 }, [
            d("div", m1, [
              z(Mt, {
                data: y.value,
                options: v.value
              }, null, 8, ["data", "options"])
            ]),
            z(xe, {
              class: "w-full min-w-0",
              title: "Total",
              value: T(he)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            d("div", p1, [
              z(gt, {
                columns: g,
                rows: b.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": F(({ row: $ }) => [
                  d("span", b1, A($.metric), 1)
                ]),
                "cell-b0": F(({ row: $ }) => [
                  $.id === "pct" ? (m(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: p(f.c0) })
                  }, A(k(Number($.b0))) + "%", 5)) : (m(), x("span", v1, A(T(he)(Number($.b0))), 1))
                ]),
                "cell-b1": F(({ row: $ }) => [
                  $.id === "pct" ? (m(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: p(f.c1) })
                  }, A(k(Number($.b1))) + "%", 5)) : (m(), x("span", y1, A(T(he)(Number($.b1))), 1))
                ]),
                "cell-b2": F(({ row: $ }) => [
                  $.id === "pct" ? (m(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: p(f.c2) })
                  }, A(k(Number($.b2))) + "%", 5)) : (m(), x("span", x1, A(T(he)(Number($.b2))), 1))
                ]),
                "cell-b3": F(({ row: $ }) => [
                  $.id === "pct" ? (m(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: p(f.c3) })
                  }, A(k(Number($.b3))) + "%", 5)) : (m(), x("span", k1, A(T(he)(Number($.b3))), 1))
                ]),
                "cell-b4p": F(({ row: $ }) => [
                  $.id === "pct" ? (m(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: p(f.c4p) })
                  }, A(k(Number($.b4p))) + "%", 5)) : (m(), x("span", _1, A(T(he)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (m(), x("div", w1, [
            d("div", C1, [
              d("div", $1, [
                z(T(rt), { class: "empty-icon" })
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
}), M1 = /* @__PURE__ */ ve(S1, [["__scopeId", "data-v-be7d2c0c"]]), D1 = { class: "card-body" }, A1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, T1 = { class: "pie-section" }, B1 = {
  key: 1,
  class: "empty-state"
}, L1 = /* @__PURE__ */ de({
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
    }, r = (b) => i[b]?.label || b.toUpperCase(), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), c = C(
      () => (a.data?.items || []).reduce((b, f) => b + f.count, 0)
    ), u = C(() => {
      const b = {};
      for (const f of a.data?.items || [])
        b[f.language] = (b[f.language] || 0) + f.count;
      return Object.entries(b).map(([f, p]) => ({ language: f, count: p })).sort((f, p) => p.count - f.count);
    }), h = C(() => ({
      labels: u.value.map((b) => r(b.language)),
      datasets: [
        {
          data: u.value.map((b) => b.count),
          backgroundColor: u.value.map(
            (b, f) => s[f % s.length] + "80"
          ),
          borderColor: u.value.map(
            (b, f) => s[f % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), g = C(() => ({
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
              const f = b.raw || 0, p = c.value > 0 ? (f / c.value * 100).toFixed(1) : "0";
              return ` ${b.label}: ${f} (${p}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: n }), (b, f) => (m(), oe(Se, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: a.loading
    }, {
      default: F(() => [
        d("div", D1, [
          l.value ? (m(), x("div", A1, [
            d("section", T1, [
              z(En, {
                data: h.value,
                options: g.value
              }, null, 8, ["data", "options"])
            ]),
            z(xe, {
              class: "shrink-0",
              title: "Total",
              value: T(he)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (m(), x("section", B1, [...f[0] || (f[0] = [
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
}), R1 = /* @__PURE__ */ ve(L1, [["__scopeId", "data-v-9385c088"]]), P1 = { class: "card-body" }, I1 = {
  key: 0,
  class: "guardrails-daily-section"
}, E1 = { class: "w-full min-w-0" }, F1 = { class: "font-medium" }, O1 = { class: "font-semibold" }, V1 = { class: "type-badges-row" }, z1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, N1 = {
  key: 1,
  class: "empty-state"
}, j1 = /* @__PURE__ */ de({
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
    }, u = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), g = C(() => c("guardrail_source")), b = C(() => {
      const y = {};
      for (const v of n.data?.items || [])
        y[v.date] || (y[v.date] = {}), y[v.date][v.guardrail_type] = (y[v.date][v.guardrail_type] || 0) + v.count;
      return Object.entries(y).map(([v, k]) => ({
        date: v,
        total: Object.values(k).reduce((w, _) => w + _, 0),
        types: Object.entries(k).map(([w, _]) => ({ type: w, count: _ })).sort((w, _) => _.count - w.count)
      })).sort((v, k) => new Date(v.date).getTime() - new Date(k.date).getTime());
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], p = C(
      () => b.value.map((y) => ({
        id: y.date,
        date: y.date,
        total: y.total,
        types: y.types
      }))
    );
    return t({ isDark: i }), (y, v) => (m(), oe(Se, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", P1, [
          r.value ? (m(), x(ce, { key: 0 }, [
            b.value.length > 0 ? (m(), x("section", I1, [
              d("div", E1, [
                z(gt, {
                  columns: f,
                  rows: p.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": F(({ row: k }) => [
                    d("span", F1, A(T(He)(String(k.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": F(({ row: k }) => [
                    d("span", O1, A(T(he)(k.total)), 1)
                  ]),
                  "cell-types": F(({ row: k }) => [
                    d("div", V1, [
                      (m(!0), x(ce, null, pe(k.types, (w) => (m(), x("span", {
                        key: w.type,
                        class: "type-count-badge"
                      }, A(w.type) + " (" + A(w.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : E("", !0),
            d("section", z1, [
              z(xe, {
                title: "Total Events",
                value: T(he)(l.value)
              }, null, 8, ["value"]),
              z(xe, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(xe, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(xe, {
                title: "Top source",
                value: g.value.name,
                subvalue: g.value.pct > 0 ? `(${g.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (m(), x("section", N1, [...v[0] || (v[0] = [
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
}), H1 = /* @__PURE__ */ ve(j1, [["__scopeId", "data-v-c042ede0"]]), W1 = { class: "card-body" }, K1 = { class: "chart-section" }, U1 = { class: "chart-wrapper" }, Y1 = {
  key: 1,
  class: "empty-chart"
}, q1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, X1 = {
  key: 0,
  class: "dn-failure-section"
}, G1 = { class: "w-full min-w-0" }, Z1 = { class: "failure-reason" }, Q1 = { class: "failure-count" }, J1 = { class: "impact-bar-container" }, ex = { class: "impact-label" }, tx = { class: "dn-trend-health-block flex flex-col gap-0" }, ax = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, nx = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, ox = { class: "system-health" }, sx = { class: "system-health-content" }, ix = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, rx = {
  key: 1,
  class: "empty-state"
}, lx = /* @__PURE__ */ de({
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
    }), h = C(
      () => c.value.row_count_total || u.value.processing_started
    ), g = C(
      () => Math.max(0, h.value - u.value.notification_sent)
    ), b = ($, S) => S ? `${Math.round($ / S * 100)}%` : "0%", f = C(() => {
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
    }), p = C(() => {
      const $ = h.value;
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
      () => p.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), k = C(() => {
      const $ = h.value, S = u.value.processing_success, M = Math.max(0, S - u.value.totalDqErrors), I = u.value.notification_sent, V = Math.max(0, $ - S), W = u.value.totalDqErrors, D = Math.max(0, M - I), P = (j, Q) => ye(j, Q), B = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], N = [];
      return S > 0 && N.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: S,
        label: P(S, $)
      }), V > 0 && N.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: V,
        label: P(V, $)
      }), M > 0 && N.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: P(M, $)
      }), W > 0 && N.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: W,
        label: P(W, $)
      }), I > 0 && N.push({
        source: "Contactable",
        target: "Notified",
        value: I,
        label: P(I, $)
      }), D > 0 && N.push({
        source: "Contactable",
        target: "Not Delivered",
        value: D,
        label: P(D, $)
      }), { nodes: B, links: N };
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
      ].sort(), V = I.map((P) => He(P).format("MMM DD")), W = I.map((P) => {
        const B = $.find((Q) => Q.date === P), N = B?.notification_sent || 0, j = M[P] || B?.processing_started || 0;
        return j > 0 ? Math.round(N / j * 100) : 0;
      }), D = I.map((P) => $.find((N) => N.date === P)?.notification_sent || 0);
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
    return t({ isDark: i }), ($, S) => (m(), oe(Se, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: S[0] || (S[0] = (M) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", W1, [
          l.value ? (m(), x(ce, { key: 0 }, [
            d("section", K1, [
              S[2] || (S[2] = d("div", { class: "chart-header" }, [
                d("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              d("div", U1, [
                k.value.nodes.length > 0 && k.value.links.length > 0 ? (m(), oe(aa, {
                  key: 0,
                  data: k.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (m(), x("div", Y1, [...S[1] || (S[1] = [
                  d("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            d("div", q1, [
              z(xe, {
                color: "#3b82f6",
                title: "Total Records",
                value: T(he)(c.value.row_count_total)
              }, null, 8, ["value"]),
              z(xe, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: T(he)(h.value)
              }, null, 8, ["value"]),
              z(xe, {
                color: "#10b981",
                title: "Successfully Notified",
                value: T(he)(u.value.notification_sent),
                subvalue: b(u.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              z(xe, {
                color: "#ef4444",
                title: "Not Notified",
                value: T(he)(g.value),
                subvalue: b(g.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              z(xe, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: f.value.reason,
                subvalue: f.value.count > 0 ? `${T(he)(f.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            p.value.length > 0 ? (m(), x("section", X1, [
              S[3] || (S[3] = d("div", { class: "section-header" }, [
                d("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              d("div", G1, [
                z(gt, {
                  columns: y,
                  rows: v.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": F(({ row: M }) => [
                    d("span", Z1, A(M.reason), 1)
                  ]),
                  "cell-count": F(({ row: M }) => [
                    d("span", Q1, A(T(he)(M.count)), 1)
                  ]),
                  "cell-impact": F(({ row: M }) => [
                    d("div", J1, [
                      d("div", {
                        class: "impact-bar",
                        style: we({ width: M.impactPct + "%" })
                      }, null, 4),
                      d("span", ex, A(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : E("", !0),
            d("div", tx, [
              w.value.labels.length > 0 ? (m(), x("section", ax, [
                S[4] || (S[4] = d("div", { class: "chart-header" }, [
                  d("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                d("div", nx, [
                  z(bt, {
                    data: w.value,
                    options: _.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : E("", !0),
              d("details", ox, [
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
                d("div", sx, [
                  d("div", ix, [
                    z(xe, {
                      title: "Docs Started",
                      value: T(he)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    z(xe, {
                      title: "Docs Completed",
                      value: T(he)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    z(xe, {
                      title: "Docs Failed",
                      value: T(he)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    z(xe, {
                      title: "Processing Started",
                      value: T(he)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    z(xe, {
                      title: "Processing Success",
                      value: T(he)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    z(xe, {
                      title: "Notification Failed",
                      value: T(he)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (m(), x("section", rx, [...S[6] || (S[6] = [
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
}), cx = /* @__PURE__ */ ve(lx, [["__scopeId", "data-v-2342d485"]]), dx = /* @__PURE__ */ de({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => he(a.totalConversations)), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), oe(ft, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
}), ux = /* @__PURE__ */ de({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => `${a.csatP95.toFixed(1)}`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), oe(ft, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
}), hx = /* @__PURE__ */ de({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => `${a.csatPulse.toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), oe(ft, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
}), fx = {
  key: 0,
  class: "card-body"
}, gx = { class: "chart-wrapper" }, mx = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, px = {
  key: 1,
  class: "empty-state"
}, bx = 520, vx = 300, yx = 40, xx = 48, kx = 48, _x = {
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
    return t({ isDark: i }), (l, c) => (m(), oe(Se, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !s.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        r.value && r.value.total_nps_responses > 0 ? (m(), x("div", fx, [
          d("div", gx, [
            z(vr, {
              histogram: r.value.histogram || [],
              "min-score": r.value.min_score || 0,
              "max-score": r.value.max_score || 0,
              "q1-score": r.value.q1_score || 0,
              "median-score": r.value.median_score || 0,
              "q3-score": r.value.q3_score || 0,
              "average-score": r.value.average_score || 0,
              "chart-width": bx,
              "chart-height": vx,
              "chart-margin": yx,
              "chart-margin-right": xx,
              "chart-bottom-margin": kx,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          d("div", mx, [
            z(xe, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(r.value.total_nps_responses)
            }, null, 8, ["value"]),
            r.value.p95_score > 0 ? (m(), oe(xe, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(r.value.p95_score)
            }, null, 8, ["value"])) : E("", !0)
          ])
        ])) : (m(), x("div", px, [...c[0] || (c[0] = [
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
}, Ar = /* @__PURE__ */ ve(_x, [["__scopeId", "data-v-e98fe9b2"]]), wx = {
  key: 0,
  class: "card-body"
}, Cx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, $x = {
  key: 1,
  class: "empty-state"
}, Sx = {
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
    return (c, u) => (m(), oe(Se, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !o.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        i.value ? (m(), x("div", wx, [
          d("div", Cx, [
            z(bt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (m(), x("div", $x, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          d("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Tr = /* @__PURE__ */ ve(Sx, [["__scopeId", "data-v-5207cfa7"]]), Mx = {
  key: 0,
  class: "card-body"
}, Dx = {
  key: 1,
  class: "empty-state"
}, Ax = /* @__PURE__ */ de({
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
    return (i, r) => (m(), oe(Se, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: F(() => [
        n.value ? (m(), x("div", Mx, [
          z(Mt, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (m(), x("div", Dx, [...r[0] || (r[0] = [
          d("p", { class: "empty-title" }, "No resolution answers available", -1),
          d("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Tx = /* @__PURE__ */ ve(Ax, [["__scopeId", "data-v-6849ef24"]]), Bx = {
  key: 0,
  class: "card-body"
}, Lx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Rx = {
  key: 1,
  class: "empty-state"
}, Px = /* @__PURE__ */ de({
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
    return (c, u) => (m(), oe(Se, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !o.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: n
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        i.value ? (m(), x("div", Bx, [
          d("div", Lx, [
            z(bt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (m(), x("div", Rx, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          d("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ix = /* @__PURE__ */ ve(Px, [["__scopeId", "data-v-72955d9a"]]), Ex = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Fx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, Br = {
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
    return (u, h) => (m(), x("div", Ex, [
      d("div", Fx, [
        z(Ar, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"]),
        z(Tr, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      l.value ? (m(), x("div", {
        key: 0,
        class: Z(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (m(), oe(Tx, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : E("", !0),
        i.value ? (m(), oe(Ix, {
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
}, Ox = { class: "csat-container__body" }, Vx = /* @__PURE__ */ de({
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
    return (o, s) => (m(), oe(Se, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => a("open"))
    }, {
      default: F(() => [
        d("div", Ox, [
          z(Br, {
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
}), zx = /* @__PURE__ */ ve(Vx, [["__scopeId", "data-v-37178ba1"]]), Nx = /* @__PURE__ */ de({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => Ut(a.totalRevenue)), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), oe(ft, {
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
      icon: F(() => [...l[0] || (l[0] = [
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
}), jx = { class: "flex justify-end" }, Hx = { class: "w-52" }, Wx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Kx = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Ux = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Yx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, qx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Xx = /* @__PURE__ */ de({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: r } = Me(s), l = se(n.breakdownBy), c = C(() => n.data?.currency ?? "USD"), u = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], h = C(() => {
      const P = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[l.value];
      return P ? `AI Generated Revenue by ${P}` : "AI Generated Revenue";
    }), g = C(() => l.value === "payment_method"), b = [
      "#a78bfa",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], f = (D) => b[D % b.length], p = (D) => {
      if (!D) return "0";
      const P = Math.abs(D);
      return P >= 1e6 ? (D / 1e6).toFixed(2) + "M" : P >= 1e5 ? (D / 1e3).toFixed(1) + "K" : Math.round(D).toLocaleString();
    }, y = (D) => !D || D === "unknown" ? "Unknown" : St(D).split(/[_|]/).map((P) => P ? P.charAt(0).toUpperCase() + P.slice(1) : "").join(" "), v = se({
      labels: [],
      datasets: []
    }), k = se([]), w = C(() => {
      const D = Math.min(k.value.length, 5);
      if (!(D <= 0))
        return { gridTemplateColumns: `repeat(${D}, minmax(0, 1fr))` };
    }), _ = (D) => {
      const P = D?.ai_revenue_by_day ?? [], B = D?.breakdown ?? [];
      if (!P.length) {
        v.value = { labels: [], datasets: [] }, k.value = [];
        return;
      }
      const N = [...P].sort((H, ae) => H.date.localeCompare(ae.date)), j = N.map((H) => He(H.date).format("MMM DD")), Q = "ai_revenue";
      if (l.value === "all") {
        v.value = {
          labels: j,
          datasets: [
            {
              label: `Revenue (${c.value})`,
              data: N.map((H) => Number(H[Q] ?? 0)),
              borderColor: b[0],
              backgroundColor: "rgba(167,139,250,0.08)",
              fill: !1,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#ffffff",
              pointBorderColor: b[0],
              pointBorderWidth: 2
            }
          ]
        }, k.value = [];
        return;
      }
      const re = B.slice(0, 7).map((H) => H.key).map((H, ae) => {
        const L = f(ae), Y = N.map((q) => {
          const G = (q.breakdown ?? {})[H];
          return G ? Number(G[Q] ?? 0) : 0;
        });
        return g.value ? {
          label: y(H),
          data: Y,
          backgroundColor: L,
          borderColor: L,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: y(H),
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
      v.value = { labels: j, datasets: re }, k.value = B.slice(0, 5).map((H, ae) => ({
        key: H.key,
        label: y(H.key),
        amount: `${c.value} ${p(H.total)}`,
        percentage: Number(H.percentage ?? 0),
        color: f(ae)
      }));
    }, $ = C(() => ({
      callback: (D) => `${c.value} ${p(Number(D))}`,
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
    })), V = C(() => ({
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
    const W = (D) => {
      l.value = String(D), o("changeBreakdown", l.value);
    };
    return t({ isDark: i }), (D, P) => (m(), oe(Se, {
      class: "w-full min-h-0 self-start",
      title: h.value,
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: F(() => [
        d("div", jx, [
          d("div", Hx, [
            z(na, {
              "model-value": l.value,
              options: u,
              "onUpdate:modelValue": W
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: F(() => [
        d("div", {
          class: Z(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          z(pt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: F(() => [
              n.loading ? (m(), x("div", Wx, [...P[0] || (P[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), x("div", Kx, [
                v.value.labels && v.value.labels.length && v.value.datasets.length ? (m(), x("section", Ux, [
                  d("div", Yx, [
                    g.value ? (m(), oe(Mt, {
                      key: 0,
                      data: v.value,
                      options: V.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (m(), oe(bt, {
                      key: 1,
                      data: v.value,
                      options: I.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  k.value.length ? (m(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: we(w.value)
                  }, [
                    (m(!0), x(ce, null, pe(k.value, (B) => (m(), oe(xe, {
                      key: `card-${B.key}`,
                      class: "min-w-0",
                      color: B.color,
                      title: B.label,
                      value: B.amount,
                      subvalue: `${B.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : E("", !0)
                ])) : (m(), x("section", qx, [...P[1] || (P[1] = [
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
}), Gx = /* @__PURE__ */ ve(Xx, [["__scopeId", "data-v-d3e5e67f"]]), fi = 1, Zx = /* @__PURE__ */ de({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), { isDark: o } = Me($e(a, "theme")), s = C(() => a.totalConversations * fi), i = C(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * fi), r = C(() => he(s.value)), l = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!l.value) return 0;
      const g = i.value;
      return g === 0 ? s.value > 0 ? 100 : 0 : (s.value - g) / g * 100;
    }), u = C(() => {
      const g = c.value.toFixed(1);
      return c.value > 0 ? `+${g}%` : `${g}%`;
    }), h = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (g, b) => (m(), oe(ft, {
      label: "Cost",
      value: r.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...b[0] || (b[0] = [
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
      headerAside: F(() => [
        l.value ? (m(), x("div", {
          key: 0,
          class: Z(["change-badge", h.value, { "change-badge--dark": T(o) }])
        }, A(u.value), 3)) : E("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Qx = /* @__PURE__ */ ve(Zx, [["__scopeId", "data-v-411e0735"]]), Jx = { class: "flex justify-end" }, ek = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, tk = { class: "w-full shrink-0 flex min-h-0 flex-col" }, ak = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, nk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ok = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, sk = /* @__PURE__ */ de({
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
    }, i = $e(n, "theme"), { isDark: r } = Me(i), l = se(n.breakdownBy), c = C(() => n.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), u = se({
      labels: [],
      datasets: []
    }), h = se([]), g = C(() => {
      const _ = h.value.length;
      if (!(_ <= 0))
        return { gridTemplateColumns: `repeat(${_}, minmax(0, 1fr))` };
    }), b = se(
      []
    ), f = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], p = (_) => f[_ % f.length], y = {
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
          u.value = { labels: [], datasets: [] }, h.value = [], b.value = [];
          return;
        }
        const P = [...D].sort((B, N) => B.date.localeCompare(N.date));
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
        }, h.value = [], b.value = [];
        return;
      }
      const $ = _?.breakdown_by_day ?? [], S = _?.breakdown_items ?? [];
      if (!$.length) {
        u.value = { labels: [], datasets: [] }, h.value = [], b.value = [];
        return;
      }
      const M = [...$].sort(
        (D, P) => D.date.localeCompare(P.date)
      ), I = S.slice(0, 5).map((D) => D.key), V = M.map((D) => He(D.date).format("MMM DD")), W = I.map((D, P) => {
        const B = S.find((N) => N.key === D);
        return {
          label: k(B?.label || D),
          data: M.map((N) => {
            const j = N.items.find((Q) => Q.key === D);
            return Number(j?.percentage || 0);
          }),
          borderColor: p(P),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      u.value = {
        labels: V,
        datasets: W
      }, h.value = S.slice(0, 5).map((D, P) => ({
        key: D.key,
        label: k(D.label),
        percentage: Number(D.percentage || 0),
        color: p(P)
      })), b.value = S.slice(0, 5).map((D, P) => ({
        key: D.key,
        label: k(D.label),
        color: p(P)
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
    ), t({ isDark: r }), (_, $) => (m(), oe(Se, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      headerAside: F(() => [
        d("div", Jx, [
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
      default: F(() => [
        d("div", ek, [
          d("div", tk, [
            u.value.labels && u.value.labels.length && u.value.datasets.length ? (m(), x("section", ak, [
              d("div", nk, [
                z(bt, {
                  data: u.value,
                  options: y,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              h.value.length ? (m(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(g.value)
              }, [
                (m(!0), x(ce, null, pe(h.value, (S) => (m(), oe(xe, {
                  key: `card-${S.key}`,
                  class: "min-w-0",
                  color: S.color,
                  title: S.label,
                  value: `${S.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : E("", !0)
            ])) : (m(), x("section", ok, [...$[2] || ($[2] = [
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
}), ik = /* @__PURE__ */ ve(sk, [["__scopeId", "data-v-b18e0ebd"]]), rk = /* @__PURE__ */ de({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), oe(ft, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
function co(e) {
  if (e == null || Number.isNaN(e)) return "-";
  const t = Math.max(0, Math.round(e)), a = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = t % 60;
  return a > 0 ? `${a}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
const lk = { class: "flex justify-end" }, ck = { class: "w-52" }, dk = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, uk = { class: "w-full shrink-0 flex min-h-0 flex-col" }, hk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, fk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, gk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, mk = "#8b5cf6", pk = "#9ca3af", bk = "#94a3b8", vk = /* @__PURE__ */ de({
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
    const n = e, o = a, s = (H) => {
      o("export", H);
    }, i = [
      { value: "all", label: "All" },
      { value: "agent", label: "Agent" },
      { value: "resolution_mode", label: "Resolution Mode" },
      { value: "channel", label: "Channel" },
      { value: "agent_channel", label: "Channel & Agent" }
    ], r = $e(n, "theme"), { isDark: l } = Me(r), c = se(n.breakdownBy), u = C(() => {
      const ae = {
        resolution_mode: "Resolution Mode",
        agent: "Agent",
        channel: "Channel",
        agent_channel: "Channel & Agent"
      }[c.value];
      return ae ? `Average resolution time by ${ae}` : "Average resolution time";
    }), h = (H) => {
      c.value = String(H), o("changeBreakdown", c.value);
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
    }, f = (H) => b[H.toLowerCase()] || pk, p = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, y = (H) => p[H.toLowerCase()] || bk, v = (H) => {
      const [ae] = H.split("|").map((L) => L.trim());
      return y(ae || H);
    }, k = (H) => {
      if (!H) return "Unknown";
      const ae = St(H).replace(/_/g, " ").trim();
      return ae ? ae.charAt(0).toUpperCase() + ae.slice(1) : "Unknown";
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
    }), _ = se({
      labels: [],
      datasets: []
    }), $ = C(() => {
      const H = w.value, ae = {
        ai_agent: H.ai_agent_total_conversations,
        human: H.human_total_conversations,
        hybrid: H.hybrid_total_conversations
      }, L = {
        ai_agent: H.ai_agent_avg_resolution_time_formatted,
        human: H.human_avg_resolution_time_formatted,
        hybrid: H.hybrid_avg_resolution_time_formatted
      };
      return g.map((Y) => ({
        key: Y.key,
        label: Y.label,
        color: Y.color,
        formattedValue: L[Y.key] || "-",
        subvalue: `${ae[Y.key] || 0} conversations`
      }));
    }), S = (H, ae) => H.map((L) => ({
      key: L.key,
      label: k(L.label),
      color: ae(L.key),
      formattedValue: L.avg_resolution_time_formatted || "-",
      subvalue: `${L.total_conversations} conversations (${L.percentage.toFixed(1)}%)`
    })), M = C(
      () => S(w.value.channel_breakdown_items ?? [], f)
    ), I = C(
      () => S(w.value.agent_breakdown_items ?? [], y)
    ), V = C(
      () => S(
        w.value.agent_channel_breakdown_items ?? [],
        v
      )
    ), W = C(() => {
      switch (c.value) {
        case "channel":
          return M.value;
        case "agent":
          return I.value;
        case "agent_channel":
          return V.value;
        case "resolution_mode":
          return $.value;
        default:
          return [];
      }
    }), D = C(() => {
      const H = W.value.length;
      if (!(H <= 0))
        return { gridTemplateColumns: `repeat(${H}, minmax(0, 1fr))` };
    }), P = (H) => H == null ? null : Number((H / 60).toFixed(2)), B = se([]), N = (H) => {
      const ae = H?.overall_resolution_time_by_day ?? {}, L = Object.keys(ae).sort((Y, q) => Y.localeCompare(q));
      if (!L.length) {
        _.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = [L.map((Y) => ae[Y] ?? null)], _.value = {
        labels: L.map((Y) => He(Y).format("MMM DD")),
        datasets: [
          {
            label: "All",
            data: B.value[0].map((Y) => P(Y)),
            borderColor: mk,
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          }
        ]
      };
    }, j = (H) => {
      const ae = H?.resolution_time_by_day ?? {}, L = Object.keys(ae).sort((Y, q) => Y.localeCompare(q));
      if (!L.length) {
        _.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = g.map(
        (Y) => L.map((q) => ae[q]?.[Y.key] ?? null)
      ), _.value = {
        labels: L.map((Y) => He(Y).format("MMM DD")),
        datasets: g.map((Y, q) => ({
          label: Y.label,
          data: B.value[q].map((G) => P(G)),
          borderColor: Y.color,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          spanGaps: !0
        }))
      };
    }, Q = (H, ae, L) => {
      const Y = Object.keys(H).sort((G, ue) => G.localeCompare(ue));
      if (!Y.length || !ae.length) {
        _.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      const q = ae.map((G) => G.key);
      B.value = q.map((G) => Y.map((ue) => H[ue]?.[G] ?? null)), _.value = {
        labels: Y.map((G) => He(G).format("MMM DD")),
        datasets: q.map((G, ue) => {
          const me = ae.find((ne) => ne.key === G);
          return {
            label: k(me?.label || G),
            data: B.value[ue].map((ne) => P(ne)),
            borderColor: L(G),
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          };
        })
      };
    }, X = (H) => {
      switch (c.value) {
        case "channel":
          Q(
            H?.channel_resolution_time_by_day ?? {},
            H?.channel_breakdown_items ?? [],
            f
          );
          return;
        case "agent":
          Q(
            H?.agent_resolution_time_by_day ?? {},
            H?.agent_breakdown_items ?? [],
            y
          );
          return;
        case "agent_channel":
          Q(
            H?.agent_channel_resolution_time_by_day ?? {},
            H?.agent_channel_breakdown_items ?? [],
            v
          );
          return;
        case "resolution_mode":
          j(H);
          return;
        default:
          N(H);
      }
    }, re = C(() => ({
      scales: {
        y: {
          min: 0,
          ticks: {
            callback: (H) => `${H}m`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (H) => {
              const ae = H.dataset.label || "", L = B.value[H.datasetIndex]?.[H.dataIndex];
              return L == null ? `${ae}: -` : `${ae}: ${co(L)}`;
            }
          }
        }
      }
    }));
    return Te(
      () => n.data,
      (H) => {
        X(H ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (H) => {
        c.value = H, X(n.data ?? null);
      }
    ), t({ isDark: l }), (H, ae) => (m(), oe(Se, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "How long conversations take to resolve",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      headerAside: F(() => [
        d("div", lk, [
          d("div", ck, [
            z(na, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": h
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: F(() => [
        d("div", dk, [
          d("div", uk, [
            _.value.labels.length && _.value.datasets.length ? (m(), x("section", hk, [
              d("div", fk, [
                z(bt, {
                  data: _.value,
                  options: re.value,
                  theme: r.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              W.value.length ? (m(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(D.value)
              }, [
                (m(!0), x(ce, null, pe(W.value, (L) => (m(), oe(xe, {
                  key: `card-${L.key}`,
                  class: "min-w-0",
                  color: L.color,
                  title: L.label,
                  value: L.formattedValue,
                  subvalue: L.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : E("", !0)
            ])) : (m(), x("section", gk, [...ae[0] || (ae[0] = [
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
}), yk = /* @__PURE__ */ ve(vk, [["__scopeId", "data-v-05854dc5"]]), xk = { class: "art-values__item" }, kk = { class: "art-values__number" }, _k = { class: "art-values__item" }, wk = { class: "art-values__number" }, Ck = /* @__PURE__ */ de({
  __name: "AvgResolutionTimeCard",
  props: {
    aiAgentAvgResolutionTimeSeconds: { default: null },
    humanAvgResolutionTimeSeconds: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), { isDark: o } = Me($e(a, "theme")), s = C(() => co(a.aiAgentAvgResolutionTimeSeconds)), i = C(() => co(a.humanAvgResolutionTimeSeconds));
    return t({ isDark: o }), (r, l) => (m(), oe(ft, {
      label: "Average Resolution Time",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
      value: F(() => [
        d("div", {
          class: Z(["art-values", { "art-values--dark": T(o) }])
        }, [
          d("div", xk, [
            d("span", kk, A(s.value), 1),
            l[1] || (l[1] = d("span", { class: "art-values__label" }, "AI Agent", -1))
          ]),
          l[3] || (l[3] = d("div", {
            class: "art-values__divider",
            "aria-hidden": "true"
          }, null, -1)),
          d("div", _k, [
            d("span", wk, A(i.value), 1),
            l[2] || (l[2] = d("span", { class: "art-values__label" }, "Human", -1))
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), $k = /* @__PURE__ */ ve(Ck, [["__scopeId", "data-v-f0592d9d"]]), Sk = /* @__PURE__ */ de({
  __name: "CheckinCR",
  props: {
    checkinCr: { default: 0 },
    previousCheckinCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => `${Number(a.checkinCr || 0).toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), oe(ft, {
      label: "Check-in CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.checkinCr,
      "previous-value": e.previousCheckinCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
}), Mk = /* @__PURE__ */ de({
  __name: "SellerCR",
  props: {
    sellerCr: { default: 0 },
    previousSellerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => `${Number(a.sellerCr || 0).toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), oe(ft, {
      label: "Seller CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.sellerCr,
      "previous-value": e.previousSellerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
}), Dk = /* @__PURE__ */ de({
  __name: "BookingManagerCR",
  props: {
    bookingManagerCr: { default: 0 },
    previousBookingManagerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(
      () => `${Number(a.bookingManagerCr || 0).toFixed(1)}%`
    ), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), oe(ft, {
      label: "Booking Manager CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.bookingManagerCr,
      "previous-value": e.previousBookingManagerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
}), Ak = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Tk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Bk = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Lk = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Rk = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Pk = { class: "max-w-[360px] text-center" }, Ik = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Ek = {
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
      const r = t.data ?? {}, l = r.daily, c = r.days, u = Array.isArray(l) && l.length > 0, h = Array.isArray(c) && c.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === c.length;
      let g = [];
      return u ? g = l : h && (g = c.map((b, f) => ({
        date: b,
        allocated_cost: r.allocatedCostSeries[f] ?? 0,
        aws_cost: r.awsCostSeries[f] ?? 0,
        airline_conversations: r.airlineConversationsSeries[f] ?? 0
      }))), {
        daily: g,
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
    return (r, l) => (m(), oe(Se, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", Ak, [
          o.value.daily.length > 0 ? (m(), x("div", Tk, [
            d("div", Bk, [
              z(bt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            d("div", Lk, [
              z(xe, {
                color: T(n).primaryLight,
                title: "Total Allocated",
                value: T(Ie)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              z(xe, {
                color: "#FF9900",
                title: "Total AWS",
                value: T(Ie)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (m(), x("section", Rk, [
            d("div", Pk, [
              d("div", Ik, [
                z(T(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, Fk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ok = { class: "card-body" }, Vk = {
  key: 0,
  class: "chart-section"
}, zk = { class: "chart-container" }, Nk = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, jk = {
  key: 1,
  class: "empty-state"
}, Hk = { class: "empty-state-content" }, Wk = { class: "empty-icon-wrapper" }, Pa = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", gi = 10, Kk = /* @__PURE__ */ de({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (f) => {
      const p = new Date(f), y = String(p.getDate()).padStart(2, "0"), v = String(p.getMonth() + 1).padStart(2, "0");
      return `${y}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((p, y) => p + (y.input_cost || 0), 0);
    }), c = C(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((p, y) => p + (y.output_cost || 0), 0);
    }), u = C(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((p, y) => p + (y.cache_read_cost || 0), 0);
    }), h = C(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((p, y) => p + (y.cache_write_cost || 0), 0);
    }), g = C(() => {
      const f = n.data?.costs_by_day || {}, p = Object.keys(f).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const y = p.map((k) => i(k)), v = [
        {
          label: "Input Cost",
          data: p.map((k) => f[k]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: p.map((k) => f[k]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: p.map((k) => f[k]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: p.map((k) => f[k]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: y,
        datasets: v
      };
    }), b = C(() => n.options ? n.options : {
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
            label: function(f) {
              let p = f.dataset.label || "";
              return p && (p += ": "), f.parsed.y !== null && (p += Ie(f.parsed.y)), p;
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
            callback: function(f) {
              return Ie(f);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (f, p) => (m(), oe(Se, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", Fk, [
          d("div", Ok, [
            g.value.labels && g.value.labels.length ? (m(), x("section", Vk, [
              d("div", zk, [
                z(Mt, {
                  data: g.value,
                  options: b.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", Nk, [
                z(xe, {
                  title: "Total Cost",
                  value: T(Ie)(e.data.total_cost)
                }, null, 8, ["value"]),
                z(xe, {
                  title: "Input Cost",
                  value: T(Ie)(l.value),
                  color: r.input
                }, null, 8, ["value", "color"]),
                z(xe, {
                  title: "Output Cost",
                  value: T(Ie)(c.value),
                  color: r.output
                }, null, 8, ["value", "color"]),
                z(xe, {
                  title: "Cache Read",
                  value: T(Ie)(u.value),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                z(xe, {
                  title: "Cache Write",
                  value: T(Ie)(h.value),
                  color: r.cache_write
                }, null, 8, ["value", "color"]),
                z(xe, {
                  title: "Avg / Conv.",
                  value: T(Ie)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (m(), x("section", jk, [
              d("div", Hk, [
                d("div", Wk, [
                  z(T(rt), { class: "empty-icon" })
                ]),
                p[0] || (p[0] = d("p", { class: "empty-title" }, "No cost usage data", -1)),
                p[1] || (p[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Uk = /* @__PURE__ */ ve(Kk, [["__scopeId", "data-v-e1c4a95b"]]), Yk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, qk = { class: "card-body" }, Xk = {
  key: 0,
  class: "chart-section"
}, Gk = { class: "chart-container" }, Zk = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, Qk = {
  key: 1,
  class: "empty-state"
}, Jk = { class: "empty-state-content" }, e_ = { class: "empty-icon-wrapper" }, Ia = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", mi = 10, t_ = /* @__PURE__ */ de({
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
      const h = new Date(u), g = String(h.getDate()).padStart(2, "0"), b = String(h.getMonth() + 1).padStart(2, "0");
      return `${g}-${b}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const u = n.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const g = h.map((f) => i(f)), b = [
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
        labels: g,
        datasets: b
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
    return t({ isDark: o }), (u, h) => (m(), oe(Se, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", Yk, [
          d("div", qk, [
            l.value.labels && l.value.labels.length ? (m(), x("section", Xk, [
              d("div", Gk, [
                z(Mt, {
                  data: l.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", Zk, [
                z(xe, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: T(he)(e.data.total_tokens)
                }, null, 8, ["value"]),
                z(xe, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: T(he)(e.data.total_input_tokens),
                  color: r.input
                }, null, 8, ["value", "color"]),
                z(xe, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: T(he)(e.data.total_output_tokens),
                  color: r.output
                }, null, 8, ["value", "color"]),
                z(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: T(he)(e.data.total_cache_read_tokens),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                z(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: T(he)(e.data.total_cache_write_tokens),
                  color: r.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (m(), x("section", Qk, [
              d("div", Jk, [
                d("div", e_, [
                  z(T(rt), { class: "empty-icon" })
                ]),
                h[0] || (h[0] = d("p", { class: "empty-title" }, "No token usage data", -1)),
                h[1] || (h[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), a_ = /* @__PURE__ */ ve(t_, [["__scopeId", "data-v-554d3cda"]]), n_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, o_ = { class: "card-body" }, s_ = {
  key: 0,
  class: "chart-section"
}, i_ = { class: "chart-container" }, r_ = { class: "mt-4 w-full min-w-0" }, l_ = {
  key: 1,
  class: "empty-state"
}, c_ = { class: "empty-state-content" }, d_ = { class: "empty-icon-wrapper" }, u_ = /* @__PURE__ */ de({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = (c) => {
      const u = new Date(c), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(
      () => he(a.data?.total_conversations ?? 0)
    ), r = C(() => {
      const c = a.data?.conversations_by_day || {}, u = Object.keys(c).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const h = u.map((b) => s(b)), g = [
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
        labels: h,
        datasets: g
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
    return t({ isDark: n }), (c, u) => (m(), oe(Se, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", n_, [
          d("div", o_, [
            r.value.labels && r.value.labels.length ? (m(), x("section", s_, [
              d("div", i_, [
                z(bt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ]),
              d("div", r_, [
                z(xe, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (m(), x("section", l_, [
              d("div", c_, [
                d("div", d_, [
                  z(T(rt), { class: "empty-icon" })
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
}), h_ = /* @__PURE__ */ ve(u_, [["__scopeId", "data-v-311f443a"]]), f_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, g_ = { class: "card-body" }, m_ = {
  key: 0,
  class: "charts-grid"
}, p_ = { class: "chart-section" }, b_ = { class: "chart-container" }, v_ = { class: "chart-section" }, y_ = { class: "chart-container" }, x_ = {
  key: 1,
  class: "empty-state"
}, k_ = { class: "empty-state-content" }, __ = { class: "empty-icon-wrapper" }, w_ = /* @__PURE__ */ de({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((g, b) => (b.total_cost || 0) - (g.total_cost || 0)) : []), r = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((g, b) => (b.total_tokens || 0) - (g.total_tokens || 0)) : []), l = C(() => {
      const g = i.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((b) => St(b.agent_type)),
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
    }), c = C(() => {
      const g = r.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((b) => St(b.agent_type)),
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const b = g.label, f = a.data?.top_agents?.find(
                (p) => St(p.agent_type) === b
              );
              return f ? [
                `Total Cost: ${Ie(f.total_cost)}`,
                `Input Cost: ${Ie(f.total_input_tokens_cost)}`,
                `Output Cost: ${Ie(f.total_output_tokens_cost)}`,
                `Cache Read: ${Ie(f.total_read_tokens_cost)}`,
                `Cache Write: ${Ie(f.total_write_tokens_cost)}`
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
              return Ie(g);
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
              const b = g.label, f = a.data?.top_agents?.find(
                (p) => St(p.agent_type) === b
              );
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
    return t({ isDark: n }), (g, b) => (m(), oe(Se, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", f_, [
          d("div", g_, [
            s.value ? (m(), x("div", m_, [
              d("section", p_, [
                b[0] || (b[0] = d("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                d("div", b_, [
                  z(Mt, {
                    data: l.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              d("section", v_, [
                b[1] || (b[1] = d("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                d("div", y_, [
                  z(Mt, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (m(), x("section", x_, [
              d("div", k_, [
                d("div", __, [
                  z(T(rt), { class: "empty-icon" })
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
}), C_ = /* @__PURE__ */ ve(w_, [["__scopeId", "data-v-ae26eabc"]]), $_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, S_ = { class: "card-body" }, M_ = {
  key: 0,
  class: "chart-section"
}, D_ = { class: "chart-container" }, A_ = {
  key: 1,
  class: "empty-state"
}, T_ = { class: "empty-state-content" }, B_ = { class: "empty-icon-wrapper" }, L_ = /* @__PURE__ */ de({
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
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = C(() => i.value.length > 0), l = C(() => i.value.reduce((h, g) => h + (g.conversations || 0), 0)), c = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const g = h.map((p) => {
        const y = p.agent_type?.toLowerCase();
        return (s[y] || "#a78bfa") + "80";
      }), b = h.map((p) => {
        const y = p.agent_type?.toLowerCase();
        return s[y] || "#a78bfa";
      });
      return {
        labels: h.map((p) => {
          const y = p.conversations || 0, v = l.value ? y / l.value * 100 : 0;
          return `${St(p.agent_type)} - ${y.toLocaleString()} (${v.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((p) => p.conversations || 0),
            backgroundColor: g,
            borderColor: b,
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
            label: (h) => {
              const g = (h.label || "").toString(), b = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((y, v) => y + (Number(v) || 0), 0), p = f ? b / f * 100 : 0;
              return `${g}: ${b.toLocaleString()} (${p.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (h, g) => (m(), oe(Se, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", $_, [
          d("div", S_, [
            r.value ? (m(), x("section", M_, [
              d("div", D_, [
                z(En, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), x("section", A_, [
              d("div", T_, [
                d("div", B_, [
                  z(T(rt), { class: "empty-icon" })
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
}), R_ = /* @__PURE__ */ ve(L_, [["__scopeId", "data-v-a909b73c"]]), P_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, I_ = { class: "card-body" }, E_ = {
  key: 0,
  class: "chart-section"
}, F_ = { class: "chart-container" }, O_ = {
  key: 1,
  class: "empty-state"
}, V_ = { class: "empty-state-content" }, z_ = { class: "empty-icon-wrapper" }, N_ = /* @__PURE__ */ de({
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
      const u = new Date(c), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
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
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {}, b = Object.keys(u).filter((y) => h[y]).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const f = b.map((y) => s(y)), p = b.map((y) => {
        const v = u[y]?.total_cost || 0, k = h[y] || 0;
        return k > 0 ? v / k : 0;
      });
      return {
        labels: f,
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
    return t({ isDark: n }), (c, u) => (m(), oe(Se, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", P_, [
          d("div", I_, [
            i.value ? (m(), x("section", E_, [
              d("div", F_, [
                z(bt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), x("section", O_, [
              d("div", V_, [
                d("div", z_, [
                  z(T(rt), { class: "empty-icon" })
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
}), j_ = /* @__PURE__ */ ve(N_, [["__scopeId", "data-v-ae6c48b1"]]), H_ = { class: "tabs text-sm" }, W_ = ["aria-label"], K_ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], U_ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, Y_ = /* @__PURE__ */ de({
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
    const a = e, n = t, o = se([]), s = `tabs-${We()}`, i = (f) => `${s}-tab-${f}`, r = C(
      () => a.items.map((f, p) => f.disabled ? -1 : p).filter((f) => f >= 0)
    );
    function l(f) {
      return f.value === a.modelValue;
    }
    function c(f) {
      const p = l(f), v = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${v} cursor-not-allowed opacity-40` : p ? `${v} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${v} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(f, p) {
      f === p || a.items.find((v) => v.value === f)?.disabled || (n("update:modelValue", f), n("change", { value: f, previousValue: p }));
    }
    function h(f, p) {
      n("tab-click", { value: f.value, originalEvent: p }), !f.disabled && (u(f.value, a.modelValue), Ke(() => {
        o.value[a.items.indexOf(f)]?.focus();
      }));
    }
    function g(f, p) {
      const y = a.items.length;
      if (y === 0) return 0;
      let v = f;
      for (let k = 0; k < y; k++)
        if (v = (v + p + y) % y, !a.items[v]?.disabled) return v;
      return f;
    }
    async function b(f, p) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let v = p;
      f.key === "ArrowLeft" ? v = g(p, -1) : f.key === "ArrowRight" ? v = g(p, 1) : f.key === "Home" ? v = r.value[0] ?? 0 : f.key === "End" && (v = r.value[r.value.length - 1] ?? p);
      const k = a.items[v];
      !k || k.disabled || (u(k.value, a.modelValue), await Ke(), o.value[v]?.focus());
    }
    return (f, p) => (m(), x("div", H_, [
      d("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Z([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (m(!0), x(ce, null, pe(e.items, (y, v) => (m(), x("button", {
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
          class: Z(c(y)),
          onClick: (k) => h(y, k),
          onKeydown: (k) => b(k, v)
        }, [
          d("span", {
            class: Z(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            y.icon ? (m(), oe(ht(y.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : E("", !0),
            d("span", U_, A(y.label), 1)
          ], 2)
        ], 42, K_))), 128))
      ], 10, W_),
      f.$slots.default ? (m(), oe(pt, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: F(() => [
          (m(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            ke(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : E("", !0)
    ]));
  }
}), Lr = /* @__PURE__ */ ve(Y_, [["__scopeId", "data-v-f9c367eb"]]), q_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, X_ = { class: "card-body" }, G_ = {
  key: 0,
  class: "model-usage-table-block"
}, Z_ = { class: "w-full min-w-0" }, Q_ = {
  key: 1,
  class: "empty-state"
}, J_ = { class: "empty-state-content" }, e2 = { class: "empty-icon-wrapper" }, t2 = /* @__PURE__ */ de({
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
    const n = e, o = a, s = (f) => {
      o("export", f);
    }, { isDark: i } = Me($e(n, "theme")), r = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], l = se("by_model"), c = C(() => l.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), u = C(() => [
      { key: "name", label: l.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = C(
      () => Object.entries(c.value).map(([f, p]) => ({
        id: f,
        name: f,
        avgCost: b(p.avg_cost_per_message),
        avgTokens: g(p.avg_tokens_per_message),
        messageCount: g(p.message_count),
        totalCost: b(p.total_cost),
        totalTokens: g(p.total_tokens)
      }))
    ), g = (f) => f == null ? "0" : he(f), b = (f) => f == null ? "$0.00" : Ie(f);
    return t({ isDark: i }), (f, p) => (m(), oe(Se, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", q_, [
          d("div", X_, [
            z(Lr, {
              modelValue: l.value,
              "onUpdate:modelValue": p[0] || (p[0] = (y) => l.value = y),
              items: r,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: F(() => [
                c.value && Object.keys(c.value).length > 0 ? (m(), x("div", G_, [
                  d("div", Z_, [
                    z(gt, {
                      columns: u.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (m(), x("div", Q_, [
                  d("div", J_, [
                    d("div", e2, [
                      z(T(rt), { class: "empty-icon" })
                    ]),
                    p[1] || (p[1] = d("p", { class: "empty-title" }, "No model usage data available", -1)),
                    p[2] || (p[2] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), a2 = /* @__PURE__ */ ve(t2, [["__scopeId", "data-v-48a6cc07"]]), n2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, o2 = { class: "card-body" }, s2 = {
  key: 0,
  class: "message-roles-table-block"
}, i2 = { class: "w-full min-w-0" }, r2 = {
  key: 1,
  class: "empty-state"
}, l2 = { class: "empty-state-content" }, c2 = { class: "empty-icon-wrapper" }, d2 = /* @__PURE__ */ de({
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
    const n = e, o = a, s = (p) => {
      o("export", p);
    }, { isDark: i } = Me($e(n, "theme")), r = ["assistant", "system", "user"], l = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => n.data?.total_by_role || {}), u = C(
      () => r.map((p) => ({
        id: p,
        role: f(p),
        avgCost: b(c.value[p]?.avg_cost_per_message),
        avgTokens: g(c.value[p]?.avg_tokens_per_message),
        messageCount: g(c.value[p]?.message_count),
        totalCost: b(c.value[p]?.total_cost),
        totalTokens: g(c.value[p]?.total_tokens)
      }))
    ), h = C(() => Object.keys(c.value).length > 0), g = (p) => p == null ? "0" : he(p), b = (p) => p == null ? "$0.00" : Ie(p), f = (p) => p.charAt(0).toUpperCase() + p.slice(1);
    return t({ isDark: i }), (p, y) => (m(), oe(Se, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", n2, [
          d("div", o2, [
            h.value ? (m(), x("div", s2, [
              d("div", i2, [
                z(gt, {
                  columns: l,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (m(), x("div", r2, [
              d("div", l2, [
                d("div", c2, [
                  z(T(rt), { class: "empty-icon" })
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
}), u2 = /* @__PURE__ */ ve(d2, [["__scopeId", "data-v-d38e854e"]]), h2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, f2 = { class: "card-body" }, g2 = {
  key: 0,
  class: "chart-section"
}, m2 = { class: "chart-container" }, p2 = { class: "kpi-grid" }, b2 = {
  key: 1,
  class: "empty-state"
}, v2 = { class: "empty-state-content" }, y2 = { class: "empty-icon-wrapper" }, x2 = 40, k2 = 230, _2 = /* @__PURE__ */ de({
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
    }, c = (w) => w.agent_type || w.agent_id || w.agent_name || "", u = (w) => w.agent_name ? St(w.agent_name) : St(c(w)).split("_").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (w) => {
      const _ = c(w).toLowerCase();
      for (const [$, S] of Object.entries(l))
        if (_.includes($))
          return S;
      return "#9ca3af";
    }, g = C(() => [...n.data?.top_agents || []].sort((_, $) => $.avg_cost_per_conversation - _.avg_cost_per_conversation)), b = C(
      () => Math.max(k2, g.value.length * x2 + 32)
    ), f = C(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : g.value.reduce((w, _) => w + _.conversations, 0)), p = C(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : g.value.reduce((w, _) => w + _.total_cost, 0)), y = C(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : f.value === 0 ? 0 : p.value / f.value), v = C(() => {
      const w = g.value;
      if (w.length === 0)
        return { labels: [], datasets: [] };
      const _ = w.map((M) => u(M)), $ = w.map((M) => M.avg_cost_per_conversation), S = w.map((M) => h(M));
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
              const _ = g.value[w[0]?.dataIndex];
              return _ ? u(_) : "";
            },
            label: function(w) {
              const _ = g.value[w.dataIndex];
              return [
                `Cost: ${Ie(w.parsed.x)}`,
                `Conversations: ${he(_.conversations)}`,
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
    return t({ isDark: i }), (w, _) => (m(), oe(Se, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), oe(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: F(() => [
        d("div", h2, [
          d("div", f2, [
            v.value.labels && v.value.labels.length ? (m(), x("section", g2, [
              d("div", m2, [
                z(Mt, {
                  data: v.value,
                  options: k.value,
                  "height-px": b.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              d("footer", p2, [
                z(T(xe), {
                  title: "Total Agents",
                  value: String(g.value.length)
                }, null, 8, ["value"]),
                z(T(xe), {
                  title: "Total Conversations",
                  value: T(he)(f.value)
                }, null, 8, ["value"]),
                z(T(xe), {
                  title: "Total Cost",
                  value: T(Ie)(p.value)
                }, null, 8, ["value"]),
                z(T(xe), {
                  title: "Avg Cost / Conv.",
                  value: T(Ie)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (m(), x("section", b2, [
              d("div", v2, [
                d("div", y2, [
                  z(T(rt), { class: "empty-icon" })
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
}), w2 = /* @__PURE__ */ ve(_2, [["__scopeId", "data-v-2a8f51ca"]]);
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
  return e.forEach((u, h) => {
    const g = r(u, o + h), b = Oo(u, s), f = b.length > 0, p = i.has(g);
    c.push({
      row: u,
      key: g,
      depth: a,
      hasChildren: f,
      isExpanded: p,
      parentKey: n
    }), f && p && (l === void 0 || a < l) && c.push(
      ...Pr(b, t, a + 1, g, 0)
    );
  }), c;
}
function Ir(e, t, a = 0, n = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, r = [];
  return e.forEach((l, c) => {
    const u = s(l, n + c), h = Oo(l, o), g = h.length > 0, b = {
      depth: a,
      isChild: a > 0,
      hasChildren: g
    };
    (i?.(l, b) ?? !0) && r.push(u), h.length > 0 && r.push(
      ...Ir(h, t, a + 1, 0)
    );
  }), r;
}
const C2 = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, $2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, S2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, M2 = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, D2 = ["checked", "aria-label"], A2 = ["aria-sort", "onClick"], T2 = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, B2 = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, L2 = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, R2 = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, P2 = ["checked", "aria-label", "onChange"], I2 = ["aria-expanded", "aria-label", "onClick"], E2 = ["aria-expanded", "aria-label", "onClick"], F2 = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, O2 = { class: "min-w-0 flex-1" }, V2 = /* @__PURE__ */ de({
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
    const a = e, n = t, o = se(null), s = se([...a.defaultExpandedKeys]), i = C({
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
      resolveRowKey: f,
      maxDepth: a.maxDepth
    })), u = C(() => {
      const { sortKey: L, sortDirection: Y, sortCompare: q, rows: G } = a;
      return !L || !Y || !q ? G : a.expandable ? Rr(G, {
        childrenKey: a.childrenKey,
        sortKey: L,
        sortDirection: Y,
        compare: q
      }) : [...G].sort((ue, me) => q(ue, me, L, Y));
    }), h = C(() => a.expandable ? Pr(u.value, c.value) : u.value.map((L, Y) => ({
      row: L,
      key: f(L, Y),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function g(L) {
      return `cell-${L}`;
    }
    function b(L) {
      return L === "center" ? "text-center" : L === "right" ? "text-right" : "text-left";
    }
    function f(L, Y) {
      if (typeof a.rowKey == "function")
        return a.rowKey(L);
      const q = L[a.rowKey];
      return q != null ? String(q) : `__index_${Y}`;
    }
    function p(L, Y) {
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
        value: p(L.row, Y.key),
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
    function V(L) {
      return k(L) && !I(L);
    }
    function W(L) {
      return V(L) ? !1 : L.depth > 0 ? !0 : a.selectable && !k(L);
    }
    const D = C(() => {
      const { isRowSelectable: L } = a;
      return a.expandable ? Ir(u.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: f,
        isRowSelectable: L
      }) : u.value.map((Y, q) => ({
        row: Y,
        key: f(Y, q),
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
    )), N = C(() => {
      if (!a.selectable || D.value.length === 0) return !1;
      const L = D.value.filter(
        (Y) => a.selectedKeys.some((q) => String(q) === String(Y))
      );
      return L.length > 0 && L.length < D.value.length;
    });
    Te(
      [N, B, () => a.selectable],
      async () => {
        await Ke();
        const L = o.value;
        L && (L.indeterminate = N.value && !B.value);
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
    function Q(L) {
      if (!a.selectable) return;
      const Y = String(L), q = h.value.find((ue) => String(ue.key) === Y);
      if (q && !M(q) || !q && !D.value.some((ue) => String(ue) === Y))
        return;
      a.selectedKeys.some((ue) => String(ue) === Y) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((ue) => String(ue) !== Y)
      ) : n("update:selectedKeys", [...a.selectedKeys, Y]);
    }
    function X(L) {
      return `${a.ariaLabelSelectRow} ${L}`;
    }
    function re(L) {
      n("sort", L);
    }
    function H(L) {
      return a.sortKey === L && a.sortDirection != null;
    }
    function ae(L) {
      return H(L) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (L, Y) => (m(), x("div", C2, [
      d("div", $2, [
        d("table", {
          class: Z([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          d("thead", null, [
            d("tr", S2, [
              e.selectable ? (m(), x("th", M2, [
                d("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: B.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: j
                }, null, 40, D2)
              ])) : E("", !0),
              (m(!0), x(ce, null, pe(e.columns, (q) => (m(), x("th", {
                key: q.key,
                scope: "col",
                class: Z([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  v(q.key) && e.selectable ? "!pl-0" : "",
                  b(q.align),
                  q.headerClass ?? ""
                ])
              }, [
                q.sortable ? (m(), x("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", b(q.align)]),
                  "aria-sort": ae(q.key),
                  onClick: (G) => re(q.key)
                }, [
                  d("span", null, A(q.label), 1),
                  d("span", T2, [
                    H(q.key) ? (m(), x(ce, { key: 0 }, [
                      e.sortDirection === "asc" ? (m(), x("span", B2, "↑")) : e.sortDirection === "desc" ? (m(), x("span", L2, "↓")) : E("", !0)
                    ], 64)) : (m(), x(ce, { key: 1 }, [
                      Y[0] || (Y[0] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      Y[1] || (Y[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, A2)) : (m(), x(ce, { key: 1 }, [
                  Ae(A(q.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (m(!0), x(ce, null, pe(h.value, (q) => (m(), x("tr", {
              key: q.key,
              class: Z([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                q.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (m(), x("td", R2, [
                M(q) ? (m(), x("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: P(q.key),
                  "aria-label": X(q.key),
                  onChange: (G) => Q(q.key)
                }, null, 40, P2)) : I(q) ? (m(), x("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": q.isExpanded,
                  "aria-label": q.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Pe((G) => _(q), ["stop"])
                }, [
                  z(T(ta), {
                    class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !q.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, I2)) : E("", !0)
              ])) : E("", !0),
              (m(!0), x(ce, null, pe(e.columns, (G) => (m(), x("td", {
                key: G.key,
                class: Z([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  v(G.key) ? "pl-0 pr-2" : "px-2",
                  b(G.align),
                  G.cellClass ?? ""
                ])
              }, [
                v(G.key) ? (m(), x("div", {
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
                    V(q) ? (m(), x("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": q.isExpanded,
                      "aria-label": q.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Pe((ue) => _(q), ["stop"])
                    }, [
                      z(T(ta), {
                        class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !q.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, E2)) : W(q) ? (m(), x("span", F2)) : E("", !0)
                  ], !0),
                  d("div", O2, [
                    ke(L.$slots, g(G.key), yt({ ref_for: !0 }, w(q, G)), () => [
                      Ae(A(y(p(q.row, G.key))), 1)
                    ], !0)
                  ])
                ], 4)) : ke(L.$slots, g(G.key), yt({
                  key: 1,
                  ref_for: !0
                }, w(q, G)), () => [
                  Ae(A(y(p(q.row, G.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), z2 = /* @__PURE__ */ ve(V2, [["__scopeId", "data-v-b3104817"]]), pi = /* @__PURE__ */ de({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (m(), x("svg", {
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
}), N2 = ["disabled", "aria-expanded", "aria-label"], j2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, H2 = { class: "min-w-0 truncate" }, W2 = ["disabled", "onClick", "onMouseenter"], K2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, U2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, Y2 = { class: "min-w-0 flex-1 text-left" }, q2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, X2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, G2 = ["disabled", "aria-expanded", "aria-label"], Z2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, Q2 = ["disabled", "onClick", "onMouseenter"], J2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, ew = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, tw = { class: "min-w-0 flex-1 text-left" }, aw = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, nw = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, ow = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, sw = ["type", "disabled", "aria-busy", "aria-label"], iw = {
  key: 2,
  class: "min-w-0 truncate"
}, rw = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, lw = ["type", "disabled", "aria-busy", "aria-label"], cw = {
  key: 2,
  class: "min-w-0 truncate"
}, $t = /* @__PURE__ */ de({
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
    ), i = C(() => a.variant === "dropdown"), r = C(() => a.variant === "split"), l = C(() => a.variant === "action"), c = C(() => !l.value && !r.value), u = C(() => a.disabled || a.loading), h = C(
      () => a.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), g = C(() => {
      const L = o["aria-label"];
      if (typeof L == "string" && L.length > 0) return L;
      if ((l.value || r.value) && a.tooltip?.trim()) return a.tooltip.trim();
    }), b = C(() => {
      const L = o.type;
      return L === "submit" || L === "reset" || L === "button" ? L : "button";
    }), f = C(() => {
      const { class: L, type: Y, "aria-label": q, ...G } = o;
      return G;
    }), p = C(() => a.variant === "primary" || a.variant === "dropdown" ? [
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
    ]), y = `kiut-button-menu-${We()}`, v = `${y}-btn`, k = `${y}-menu`, w = se(null), _ = se(null), $ = se(null), S = se(!1), M = se(0), I = se({}), V = C(() => a.options.filter((L) => !L.disabled));
    function W(L) {
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
    function N() {
      D(), M.value = 0, Ke(() => $.value?.focus());
    }
    function j() {
      if (!a.disabled) {
        if (S.value) {
          B();
          return;
        }
        S.value = !0, N();
      }
    }
    function Q(L) {
      L.disabled || (n("select", L), B());
    }
    function X(L) {
      L.stopPropagation(), j();
    }
    function re(L) {
      if (!S.value) return;
      const Y = L.target, q = w.value, G = $.value;
      q && !q.contains(Y) && (!G || !G.contains(Y)) && B();
    }
    function H(L) {
      a.disabled || (L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), S.value || (S.value = !0, N()));
    }
    function ae(L) {
      const Y = V.value;
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
          q && Q(q);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", re);
    }), it(() => {
      document.removeEventListener("click", re);
    }), (L, Y) => i.value ? (m(), x("div", {
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
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [p.value, T(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": g.value
      }, f.value, {
        onClick: X,
        onKeydown: H
      }), [
        L.$slots.icon ? (m(), x("span", j2, [
          ke(L.$slots, "icon")
        ])) : E("", !0),
        d("span", H2, [
          ke(L.$slots, "default")
        ]),
        z(T(ta), {
          class: Z(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", S.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, N2),
      (m(), oe(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: we(I.value),
          onKeydown: Pe(ae, ["stop"])
        }, [
          (m(!0), x(ce, null, pe(V.value, (q, G) => (m(), x("button", {
            key: W(q),
            type: "button",
            role: "menuitem",
            disabled: q.disabled,
            class: Z(P(G)),
            onClick: Pe((ue) => Q(q), ["stop"]),
            onMouseenter: (ue) => M.value = G
          }, [
            q.icon ? (m(), x("span", K2, [
              (m(), oe(ht(q.icon), { class: "h-5 w-5" }))
            ])) : (m(), x("span", U2)),
            d("span", Y2, [
              d("span", q2, A(q.label), 1),
              q.description ? (m(), x("span", X2, A(q.description), 1)) : E("", !0)
            ])
          ], 42, W2))), 128))
        ], 36), [
          [Ht, S.value]
        ])
      ]))
    ], 512)) : r.value ? (m(), x("div", {
      key: 1,
      ref_key: "rootRef",
      ref: w,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: _,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [p.value, T(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": g.value
      }, f.value, {
        onClick: X,
        onKeydown: H
      }), [
        L.$slots.icon ? (m(), x("span", Z2, [
          ke(L.$slots, "icon")
        ])) : E("", !0)
      ], 16, G2),
      (m(), oe(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: we(I.value),
          onKeydown: Pe(ae, ["stop"])
        }, [
          (m(!0), x(ce, null, pe(V.value, (q, G) => (m(), x("button", {
            key: W(q),
            type: "button",
            role: "menuitem",
            disabled: q.disabled,
            class: Z(P(G)),
            onClick: Pe((ue) => Q(q), ["stop"]),
            onMouseenter: (ue) => M.value = G
          }, [
            q.icon ? (m(), x("span", J2, [
              (m(), oe(ht(q.icon), { class: "h-5 w-5" }))
            ])) : (m(), x("span", ew)),
            d("span", tw, [
              d("span", aw, A(q.label), 1),
              q.description ? (m(), x("span", nw, A(q.description), 1)) : E("", !0)
            ])
          ], 42, Q2))), 128))
        ], 36), [
          [Ht, S.value]
        ])
      ]))
    ], 512)) : s.value ? (m(), x("span", ow, [
      d("button", yt({
        type: b.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, p.value, T(o).class]],
        disabled: u.value,
        "aria-busy": e.loading || void 0,
        "aria-label": g.value
      }, f.value), [
        e.loading ? (m(), oe(pi, {
          key: 0,
          compact: l.value
        }, null, 8, ["compact"])) : L.$slots.icon ? (m(), x("span", {
          key: 1,
          class: Z(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          ke(L.$slots, "icon")
        ], 2)) : E("", !0),
        c.value ? (m(), x("span", iw, [
          ke(L.$slots, "default")
        ])) : E("", !0)
      ], 16, sw),
      d("span", rw, A(e.tooltip), 1)
    ])) : (m(), x("button", yt({
      key: 3,
      type: b.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, p.value, T(o).class]],
      disabled: u.value,
      "aria-busy": e.loading || void 0,
      "aria-label": g.value
    }, f.value), [
      e.loading ? (m(), oe(pi, {
        key: 0,
        compact: l.value
      }, null, 8, ["compact"])) : L.$slots.icon ? (m(), x("span", {
        key: 1,
        class: Z(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        ke(L.$slots, "icon")
      ], 2)) : E("", !0),
      c.value ? (m(), x("span", cw, [
        ke(L.$slots, "default")
      ])) : E("", !0)
    ], 16, lw));
  }
}), dw = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], uw = { class: "sr-only" }, Er = /* @__PURE__ */ de({
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
    return (s, i) => (m(), x("button", {
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
        Ca(Pe(o, ["prevent", "stop"]), ["space"]),
        Ca(Pe(o, ["prevent"]), ["enter"])
      ]
    }, [
      d("span", {
        class: Z(["pointer-events-none inline-block translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", [
          e.size === "sm" ? "h-5 w-5" : "h-7 w-7",
          e.modelValue ? e.size === "sm" ? "translate-x-5" : "translate-x-7" : "translate-x-0"
        ]]),
        "aria-hidden": "true"
      }, null, 2),
      d("span", uw, A(e.ariaLabel), 1)
    ], 42, dw));
  }
}), hw = {
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
}, fw = [
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
], IM = [
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
], gw = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, mw = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, pw = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, bw = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, vw = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, yw = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, xw = ["aria-expanded", "aria-label", "onClick"], kw = { class: "min-w-0 flex-1" }, _w = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, ww = ["colspan"], Cw = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, $w = ["aria-label"], Sw = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, Mw = {
  key: 2,
  class: "space-y-2"
}, Dw = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, Aw = ["title"], Tw = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, Bw = { class: "ml-auto flex shrink-0 items-center gap-2" }, Lw = /* @__PURE__ */ de({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => fw },
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
    const a = e, n = t, o = se([...a.defaultExpandedKeys]), s = C({
      get() {
        return a.expandedKeys ?? o.value;
      },
      set(D) {
        o.value = D, n("update:expandedKeys", D);
      }
    }), i = C(() => ({
      ...hw,
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
        expanded: p(D, B)
      };
    }
    function h(D) {
      const P = D.key;
      return D.label ? D.label : P in i.value ? i.value[P] : D.key;
    }
    function g(D) {
      return D === "center" ? "text-center" : D === "right" ? "text-right" : "text-left";
    }
    function b(D) {
      return D === r.value;
    }
    function f(D, P) {
      if (typeof a.rowKey == "function")
        return a.rowKey(D);
      const B = D[a.rowKey];
      return B != null ? String(B) : `__index_${P}`;
    }
    function p(D, P) {
      return s.value.includes(f(D, P));
    }
    function y(D) {
      return D.versionsLoading === !0;
    }
    function v(D, P) {
      const B = f(D, P), N = new Set(s.value);
      N.has(B) ? (N.delete(B), n("collapse", B, D)) : (a.singleExpand && N.clear(), N.add(B), n("expand", B, D)), s.value = [...N];
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
    function V(D, P) {
      const B = P.actions ?? ["view", "edit"], N = [];
      for (const j of B)
        j === "view" ? N.push(
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
        ) : j === "run" ? N.push(
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
        ) : j === "edit" ? N.push(
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
        ) : j === "createDraft" ? N.push(
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
        ) : j === "delete" && N.push(
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
        N
      );
    }
    function W(D, P, B) {
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
          return V(D, P);
        default:
          return je("span", {}, String(D[P.key] ?? ""));
      }
    }
    return (D, P) => (m(), x("div", gw, [
      d("div", mw, [
        d("table", pw, [
          d("thead", null, [
            d("tr", bw, [
              (m(!0), x(ce, null, pe(e.columns, (B) => (m(), x("th", {
                key: B.key,
                scope: "col",
                class: Z([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  g(B.align),
                  B.headerClass ?? ""
                ])
              }, A(h(B)), 3))), 128))
            ])
          ]),
          d("tbody", null, [
            (m(!0), x(ce, null, pe(e.rows, (B, N) => (m(), x(ce, {
              key: f(B, N)
            }, [
              d("tr", vw, [
                (m(!0), x(ce, null, pe(e.columns, (j) => (m(), x("td", {
                  key: j.key,
                  class: Z([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    g(j.align),
                    j.cellClass ?? ""
                  ])
                }, [
                  ke(D.$slots, c(j.key), yt({ ref_for: !0 }, u(B, j, N)), () => [
                    b(j.key) ? (m(), x("div", yw, [
                      d("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": p(B, N),
                        "aria-label": p(B, N) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (Q) => v(B, N)
                      }, [
                        z(T(ta), {
                          class: Z(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !p(B, N) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, xw),
                      d("div", kw, [
                        (m(), oe(ht(() => W(B, j))))
                      ])
                    ])) : (m(), oe(ht(() => W(B, j)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              p(B, N) ? (m(), x("tr", _w, [
                d("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  d("h4", Cw, A(i.value.historialTitle), 1),
                  y(B) ? (m(), x("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (m(!0), x(ce, null, pe(e.historySkeletonCount, (j) => (m(), x("div", {
                      key: j,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...P[0] || (P[0] = [
                      Jn('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, $w)) : B.versions?.length ? (m(), x("div", Mw, [
                    (m(!0), x(ce, null, pe(B.versions, (j) => (m(), x("div", {
                      key: j.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      ke(D.$slots, "history-item", {
                        version: j,
                        row: B
                      }, () => [
                        z(Ge, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: F(() => [
                            Ae(A(j.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        d("span", Dw, A(j.version), 1),
                        j.method ? (m(), x("span", {
                          key: 0,
                          class: Z(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", w(j.method)])
                        }, A(j.method), 3)) : E("", !0),
                        j.url ? (m(), x("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: j.url
                        }, A(j.url), 9, Aw)) : E("", !0),
                        d("span", Tw, A(S(j.updatedAt)), 1)
                      ], !0),
                      d("div", Bw, [
                        ke(D.$slots, "history-actions", {
                          version: j,
                          row: B
                        }, () => [
                          z($t, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => n("viewVersion", j, B)
                          }, {
                            icon: F(() => [
                              z(T(di), { class: "h-4 w-4" })
                            ]),
                            default: F(() => [
                              Ae(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          z($t, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => n("createDraftFromVersion", j, B)
                          }, {
                            icon: F(() => [
                              z(T(ci), { class: "h-4 w-4" })
                            ]),
                            default: F(() => [
                              Ae(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (m(), x("p", Sw, A(i.value.emptyHistory), 1))
                ], 8, ww)
              ])) : E("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), Rw = /* @__PURE__ */ ve(Lw, [["__scopeId", "data-v-177ecafb"]]);
function bi(e, t) {
  return m(), x("svg", {
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
function Pw(e, t) {
  return m(), x("svg", {
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
function Iw(e, t) {
  return m(), x("svg", {
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
function Ew(e, t) {
  return m(), x("svg", {
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
function Fw(e, t) {
  return m(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function Ow(e, t) {
  return m(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" })
  ]);
}
function Vw(e, t) {
  return m(), x("svg", {
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
function zw(e, t) {
  return m(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const Nw = ["aria-label"], jw = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, Hw = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Ww = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Kw = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Uw = { class: "truncate" }, Yw = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, qw = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, Xw = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, Gw = ["aria-label", "onClick"], Zw = ["aria-label", "onClick"], Qw = ["aria-label"], Jw = ["aria-label"], e5 = {
  key: 1,
  class: "space-y-2"
}, t5 = ["for"], a5 = ["id", "placeholder", "onKeydown"], n5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, o5 = ["aria-label"], s5 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, i5 = ["checked", "onChange"], r5 = { class: "min-w-0 flex-1" }, l5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, c5 = { class: "flex flex-wrap items-end gap-2" }, d5 = { class: "min-w-[120px] flex-1" }, u5 = ["for"], h5 = ["id"], f5 = { class: "min-w-[120px] flex-1" }, g5 = ["for"], m5 = ["id"], p5 = /* @__PURE__ */ de({
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
    const a = e, n = t, o = uo(), i = `${`kiut-filters-${We()}`}-panel`, r = se(null), l = /* @__PURE__ */ new Map(), c = se(null), u = se(!1), h = se({}), g = se(null), b = se(""), f = se([]), p = se(""), y = se(""), v = C(() => c.value ? a.filterDefinitions.find((O) => O.id === c.value) ?? null : null), k = C(() => {
      const O = v.value;
      if (O)
        return O.type === "text" ? b.value : O.type === "select" ? f.value : { start: p.value, end: y.value };
    });
    function w(O, te) {
      te && te instanceof HTMLElement ? l.set(O, te) : l.delete(O);
    }
    function _(O) {
      return a.modelValue[O];
    }
    function $(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((te) => typeof te == "string" && te.trim() !== "");
      if (typeof O == "string") {
        const te = O.trim();
        return te ? [te] : [];
      }
      return [];
    }
    function S(O, te) {
      if (te == null) return !0;
      if (O.type === "text") return String(te).trim() === "";
      if (O.type === "select") return $(te).length === 0;
      if (O.type === "dateRange") {
        const le = te;
        return !le?.start?.trim() || !le?.end?.trim();
      }
      return !0;
    }
    const M = C(
      () => a.filterDefinitions.some((O) => !S(O, _(O.id)))
    ), I = C(() => {
      const O = [];
      for (const te of a.filterDefinitions) {
        const le = _(te.id);
        if (!S(te, le)) {
          if (te.type === "text")
            O.push({ kind: "text", def: te, key: te.id });
          else if (te.type === "dateRange")
            O.push({ kind: "dateRange", def: te, key: te.id });
          else if (te.type === "select")
            for (const ge of $(le))
              O.push({
                kind: "select",
                def: te,
                optionValue: ge,
                key: `${te.id}::${ge}`
              });
        }
      }
      return O;
    });
    function V(O) {
      return O.type !== "select" ? 0 : $(_(O.id)).length;
    }
    function W(O) {
      const te = _(O.id), le = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${le}: ${String(te ?? "").trim()}`;
      if (O.type === "select") {
        const Re = $(te).map((qe) => O.options.find((pa) => pa.value === qe)?.label ?? qe);
        return `${le}: ${Re.join(", ")}`;
      }
      const ge = te, Ce = P(ge.start), _e = P(ge.end);
      return `${le}: ${Ce} – ${_e}`;
    }
    function D(O) {
      return O.kind === "text" || O.kind === "dateRange" ? W(O.def) : O.def.options.find((le) => le.value === O.optionValue)?.label ?? O.optionValue;
    }
    function P(O) {
      if (!O) return "";
      const te = He(O, "YYYY-MM-DD", !0);
      return te.isValid() ? te.format("L") : O;
    }
    function B(O) {
      const te = c.value === O.id && u.value, le = !S(O, _(O.id));
      return te || le ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function N(O) {
      return S(O, _(O.id)) ? J(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function j(O) {
      const te = _(O.id);
      if (O.type === "text") {
        b.value = te != null ? String(te) : "";
        return;
      }
      if (O.type === "select") {
        f.value = [...$(te)];
        return;
      }
      const le = te;
      p.value = le?.start?.trim() ?? "", y.value = le?.end?.trim() ?? "";
    }
    function Q() {
      const O = v.value;
      if (!O || O.type !== "select") return;
      const te = { ...a.modelValue };
      f.value.length === 0 ? delete te[O.id] : te[O.id] = [...f.value], n("update:modelValue", te), n("change", te);
    }
    function X(O) {
      const te = f.value.indexOf(O);
      te >= 0 ? f.value = f.value.filter((le, ge) => ge !== te) : f.value = [...f.value, O], Q();
    }
    function re(O) {
      if (!O) return;
      g.value = O;
      const te = O.getBoundingClientRect(), le = 300;
      let ge = te.left;
      const Ce = window.innerWidth - le - 12;
      ge > Ce && (ge = Math.max(12, Ce)), ge < 12 && (ge = 12);
      const _e = te.bottom + 8;
      h.value = {
        top: `${_e}px`,
        left: `${ge}px`,
        width: `${Math.min(le, window.innerWidth - 24)}px`
      };
    }
    function H(O, te) {
      if (c.value === O.id && u.value) {
        G();
        return;
      }
      u.value && c.value !== O.id && G(), c.value = O.id, u.value = !0, j(O), Ke().then(async () => {
        re(te.currentTarget), await Ke(), L();
      });
    }
    function ae(O, te) {
      if (c.value === O.id && u.value) {
        G();
        return;
      }
      u.value && c.value !== O.id && G(), c.value = O.id, u.value = !0, j(O), Ke().then(async () => {
        const le = l.get(O.id) ?? te.currentTarget;
        re(le), await Ke(), L();
      });
    }
    function L() {
      const O = r.value;
      if (!O) return;
      O.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function Y() {
      u.value = !1, c.value = null, g.value = null;
    }
    function q(O) {
      const te = v.value;
      if (!te) return;
      if (te.type === "text") {
        b.value = O != null ? String(O) : "";
        return;
      }
      if (te.type === "select") {
        f.value = Array.isArray(O) ? O.filter((ge) => typeof ge == "string") : $(O);
        return;
      }
      const le = O;
      p.value = le?.start?.trim() ?? "", y.value = le?.end?.trim() ?? "";
    }
    function G() {
      const O = v.value;
      if (!O) return;
      if (O.type === "text") {
        const Ce = b.value.trim(), _e = { ...a.modelValue };
        Ce === "" ? delete _e[O.id] : _e[O.id] = Ce, n("update:modelValue", _e), n("change", _e), Y();
        return;
      }
      if (O.type === "select") {
        Q(), Y();
        return;
      }
      const te = p.value.trim(), le = y.value.trim(), ge = { ...a.modelValue };
      !te || !le || te > le ? delete ge[O.id] : ge[O.id] = { start: te, end: le }, n("update:modelValue", ge), n("change", ge), Y();
    }
    function ue(O) {
      const te = { ...a.modelValue };
      delete te[O], n("update:modelValue", te), n("change", te), c.value === O && Y();
    }
    function me(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        ue(O.def.id);
        return;
      }
      const te = { ...a.modelValue }, ge = $(te[O.def.id]).filter((Ce) => Ce !== O.optionValue);
      ge.length === 0 ? delete te[O.def.id] : te[O.def.id] = ge, n("update:modelValue", te), n("change", te), c.value === O.def.id && j(O.def);
    }
    function ne() {
      const O = {};
      n("update:modelValue", O), n("change", O), Y();
    }
    const R = C(() => {
      const O = v.value;
      return O ? `Editar filtro: ${O.label}` : "Filtro";
    });
    function K(O) {
      const te = O.def.label.replace(/^\+\s*/, "");
      return O.kind === "select" ? `Quitar ${O.def.options.find((Ce) => Ce.value === O.optionValue)?.label ?? O.optionValue} del filtro ${te}` : `Quitar filtro ${te}`;
    }
    function ie(O) {
      const te = O.def.label.replace(/^\+\s*/, "");
      if (O.kind === "select") {
        const ge = O.def.options.find((Ce) => Ce.value === O.optionValue)?.label ?? O.optionValue;
        return `Editar filtro ${te}: ${ge}`;
      }
      return `Editar filtro ${te}`;
    }
    function J(O) {
      return `Añadir filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    const U = C(() => a.clearLabel);
    function ee(O) {
      if (!u.value || !r.value) return;
      const te = O.target;
      if (!(r.value.contains(te) || (te instanceof Element ? te : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ge of l.values())
          if (ge?.contains(te)) return;
        G();
      }
    }
    function fe(O) {
      O.key === "Escape" && u.value && (O.preventDefault(), Y());
    }
    function be() {
      !u.value || !g.value || re(g.value);
    }
    return Je(() => {
      document.addEventListener("mousedown", ee, !0), window.addEventListener("keydown", fe, !0), window.addEventListener("resize", be);
    }), _i(() => {
      document.removeEventListener("mousedown", ee, !0), window.removeEventListener("keydown", fe, !0), window.removeEventListener("resize", be);
    }), Te(
      () => a.modelValue,
      () => {
        const O = v.value;
        O && u.value && !o.panel && j(O);
      },
      { deep: !0 }
    ), (O, te) => (m(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      d("div", jw, [
        d("span", Hw, A(e.label), 1),
        d("div", Ww, [
          (m(!0), x(ce, null, pe(e.filterDefinitions, (le) => (m(), x("button", {
            key: `pill-${le.id}`,
            ref_for: !0,
            ref: (ge) => w(le.id, ge),
            type: "button",
            class: Z(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", B(le)]),
            "aria-label": N(le),
            "aria-expanded": c.value === le.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === le.id ? i : void 0,
            onClick: (ge) => ae(le, ge)
          }, [
            z(T(Fw), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            d("span", Uw, A(le.label), 1),
            le.type === "select" && V(le) > 0 ? (m(), x("span", Yw, A(V(le)), 1)) : E("", !0)
          ], 10, Kw))), 128))
        ])
      ]),
      M.value ? (m(), x("div", qw, [
        d("div", Xw, [
          (m(!0), x(ce, null, pe(I.value, (le) => (m(), x("div", {
            key: le.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            d("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ie(le),
              onClick: (ge) => H(le.def, ge)
            }, [
              ke(O.$slots, "formatChip", {
                filter: le.def,
                value: _(le.def.id),
                optionValue: le.kind === "select" ? le.optionValue : void 0
              }, () => [
                Ae(A(D(le)), 1)
              ], !0)
            ], 8, Gw),
            d("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": K(le),
              onClick: (ge) => me(le)
            }, [
              z(T(zw), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, Zw)
          ]))), 128))
        ]),
        d("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": U.value,
          onClick: ne
        }, A(e.clearLabel), 9, Qw)
      ])) : E("", !0),
      (m(), oe(Qt, { to: "body" }, [
        c.value && u.value ? (m(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": R.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: we(h.value),
          onKeydown: te[3] || (te[3] = Pe(() => {
          }, ["stop"]))
        }, [
          v.value ? (m(), x(ce, { key: 0 }, [
            O.$slots.panel ? ke(O.$slots, "panel", {
              key: 0,
              filter: v.value,
              close: G,
              value: k.value,
              updateValue: q
            }, void 0, !0) : (m(), x("div", e5, [
              v.value.type === "text" ? (m(), x(ce, { key: 0 }, [
                d("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(v.value.label), 9, t5),
                Xe(d("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": te[0] || (te[0] = (le) => b.value = le),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: v.value.placeholder ?? "…",
                  onKeydown: Ca(Pe(G, ["prevent"]), ["enter"])
                }, null, 40, a5), [
                  [Rt, b.value]
                ])
              ], 64)) : v.value.type === "select" ? (m(), x(ce, { key: 1 }, [
                d("p", n5, A(v.value.label), 1),
                d("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": v.value.label,
                  "aria-multiselectable": !0
                }, [
                  (m(!0), x(ce, null, pe(v.value.options, (le) => (m(), x("li", {
                    key: le.value
                  }, [
                    d("label", s5, [
                      d("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(le.value),
                        onChange: (ge) => X(le.value)
                      }, null, 40, i5),
                      d("span", r5, A(le.label), 1)
                    ])
                  ]))), 128))
                ], 8, o5)
              ], 64)) : v.value.type === "dateRange" ? (m(), x(ce, { key: 2 }, [
                d("p", l5, A(v.value.label), 1),
                d("div", c5, [
                  d("div", d5, [
                    d("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, u5),
                    Xe(d("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": te[1] || (te[1] = (le) => p.value = le),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, h5), [
                      [Rt, p.value]
                    ])
                  ]),
                  d("div", f5, [
                    d("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, g5),
                    Xe(d("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": te[2] || (te[2] = (le) => y.value = le),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, m5), [
                      [Rt, y.value]
                    ])
                  ])
                ])
              ], 64)) : E("", !0)
            ]))
          ], 64)) : E("", !0)
        ], 44, Jw)) : E("", !0)
      ]))
    ], 8, Nw));
  }
}), b5 = /* @__PURE__ */ ve(p5, [["__scopeId", "data-v-f38e0100"]]), v5 = { class: "font-sans" }, y5 = ["for"], x5 = { class: "relative" }, k5 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], _5 = ["id"], Fr = /* @__PURE__ */ de({
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
    const a = e, n = t, o = Ja(), s = wi("$pcForm", null), i = `kiut-input-text-${We()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-err`), c = C(() => a.name ?? o.name ?? ""), u = se(a.modelValue ?? "");
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
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? u.value : u.value), g = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function b(v) {
      const k = v.target.value;
      u.value = k, n("update:modelValue", k);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(v);
    }
    function f(v) {
      const k = s?.fields?.[c.value]?.props;
      k?.onChange && k.onChange(v);
    }
    function p(v) {
      const k = s?.fields?.[c.value]?.props;
      k?.onBlur && k.onBlur(v);
    }
    const y = C(() => {
      const { name: v, id: k, type: w, ..._ } = o;
      return _;
    });
    return (v, k) => (m(), x("div", v5, [
      e.label ? (m(), x("label", {
        key: 0,
        for: r.value,
        class: Z(T(lt))
      }, A(e.label), 11, y5)) : E("", !0),
      d("div", x5, [
        e.icon ? (m(), oe(ht(e.icon), {
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
            g.value ? T(Dt) : ""
          ],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: h.value,
          "aria-invalid": g.value ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: b,
          onChange: f,
          onBlur: p
        }), null, 16, k5)
      ]),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: l.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, _5)) : E("", !0)
    ]));
  }
}), w5 = { class: "font-sans" }, C5 = ["for"], $5 = { class: "relative" }, S5 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], M5 = ["aria-label"], D5 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, A5 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, T5 = ["id"], B5 = /* @__PURE__ */ de({
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
    const a = e, n = t, o = Ja(), s = wi("$pcForm", null), i = `kiut-input-password-${We()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-err`), c = C(() => a.name ?? o.name ?? ""), u = se(!1), h = se(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (k) => {
        k !== void 0 && k !== h.value && (h.value = k);
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), it(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const g = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? h.value : h.value), b = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function f(k) {
      const w = k.target.value;
      h.value = w, n("update:modelValue", w);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(k);
    }
    function p(k) {
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
    return (k, w) => (m(), x("div", w5, [
      e.label ? (m(), x("label", {
        key: 0,
        for: r.value,
        class: Z(T(lt))
      }, A(e.label), 11, C5)) : E("", !0),
      d("div", $5, [
        d("input", yt(v.value, {
          id: r.value,
          name: c.value,
          type: u.value ? "text" : "password",
          autocomplete: "current-password",
          class: [T(et), b.value ? T(Dt) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: g.value,
          "aria-invalid": b.value ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: f,
          onChange: p,
          onBlur: y
        }), null, 16, S5),
        d("button", {
          type: "button",
          tabindex: "-1",
          onClick: w[0] || (w[0] = (_) => u.value = !u.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": u.value ? "Hide password" : "Show password"
        }, [
          u.value ? (m(), x("svg", A5, [...w[2] || (w[2] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (m(), x("svg", D5, [...w[1] || (w[1] = [
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
        ], 8, M5)
      ]),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: l.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, T5)) : E("", !0)
    ]));
  }
}), L5 = { class: "font-sans" }, R5 = ["for"], P5 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], I5 = ["id"], E5 = /* @__PURE__ */ de({
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
    return (l, c) => (m(), x("div", L5, [
      e.label ? (m(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(lt))
      }, A(e.label), 11, R5)) : E("", !0),
      Xe(d("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => r.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: Z([T(kb), e.invalid ? T(Dt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, P5), [
        [Rt, r.value]
      ]),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, I5)) : E("", !0)
    ]));
  }
}), F5 = { class: "font-sans" }, O5 = ["for"], V5 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], z5 = ["for"], N5 = ["title"], j5 = ["aria-label"], H5 = {
  key: 2,
  class: "space-y-3"
}, W5 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], K5 = ["for"], U5 = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, Y5 = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, q5 = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, X5 = { class: "flex items-start gap-2" }, G5 = { class: "min-w-0 flex-1 space-y-2" }, Z5 = { class: "flex items-center gap-2" }, Q5 = ["title"], J5 = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, eC = ["aria-label", "onClick"], tC = ["id"], aC = /* @__PURE__ */ de({
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
    const a = e, n = t, o = `kiut-input-file-${We()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = se(null), l = C(
      () => a.multiple ? null : a.modelValue
    ), c = C(() => {
      if (!a.multiple) return [];
      const M = a.modelValue;
      return Array.isArray(M) ? M : [];
    }), u = C(
      () => l.value?.name ?? a.placeholder
    ), h = C(
      () => a.multiple && c.value.length >= a.maxFiles
    ), g = C(() => c.value.length === 0 ? a.placeholder : c.value.length === 1 ? c.value[0].file.name : `${c.value.length} archivos seleccionados`);
    function b(M) {
      return a.showDescriptions && a.submitted && a.requireDescriptions && M.description.trim() === "";
    }
    function f(M) {
      return M < 1024 ? `${M} B` : M < 1024 * 1024 ? `${(M / 1024).toFixed(1)} KB` : `${(M / (1024 * 1024)).toFixed(1)} MB`;
    }
    function p(M) {
      return {
        id: `file-${We()}`,
        file: M,
        description: ""
      };
    }
    function y(M, I) {
      return M.some(
        (V) => V.file.name === I.name && V.file.size === I.size && V.file.lastModified === I.lastModified
      );
    }
    function v() {
      r.value && (r.value.value = "");
    }
    function k(M) {
      const V = M.target.files?.[0] ?? null;
      n("update:modelValue", V);
    }
    function w(M) {
      const I = M.target, V = Array.from(I.files ?? []);
      if (V.length === 0) return;
      const W = [...c.value];
      for (const D of V) {
        if (W.length >= a.maxFiles) break;
        y(W, D) || W.push(p(D));
      }
      n("update:modelValue", W), v();
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
          (V) => V.id === M ? { ...V, description: I } : V
        )
      );
    }
    return (M, I) => (m(), x("div", F5, [
      e.label ? (m(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(lt))
      }, A(e.label), 11, O5)) : E("", !0),
      e.multiple ? (m(), x("div", H5, [
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
            disabled: e.disabled || h.value,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0,
            onChange: w
          }, null, 40, W5),
          d("label", {
            for: s.value,
            class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || h.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            z(T(ro), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            Ae(" " + A(e.chooseLabel), 1)
          ], 10, K5),
          d("span", U5, A(g.value), 1),
          e.filesCountLabel ? (m(), x("span", Y5, A(e.filesCountLabel), 1)) : E("", !0)
        ], 2),
        c.value.length > 0 ? (m(), x("ul", q5, [
          (m(!0), x(ce, null, pe(c.value, (V) => (m(), x("li", {
            key: V.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            d("div", X5, [
              z(T(np), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              d("div", G5, [
                d("div", Z5, [
                  d("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: V.file.name
                  }, A(V.file.name), 9, Q5),
                  d("span", J5, A(f(V.file.size)), 1),
                  e.disabled ? E("", !0) : (m(), x("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (W) => $(V.id)
                  }, [
                    z(T(lo), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, eC))
                ]),
                e.showDescriptions ? (m(), oe(Fr, {
                  key: 0,
                  "model-value": V.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: b(V),
                  "error-text": b(V) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (W) => S(V.id, W)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : E("", !0)
              ])
            ])
          ]))), 128))
        ])) : E("", !0)
      ])) : (m(), x("div", {
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
          onChange: k
        }, null, 40, V5),
        d("label", {
          for: s.value,
          class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          z(T(ro), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, z5),
        d("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: u.value || void 0
        }, A(u.value), 9, N5),
        l.value && !e.disabled ? (m(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: _
        }, [
          z(T(lo), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, j5)) : E("", !0)
      ], 2)),
      e.errorText ? (m(), x("p", {
        key: 3,
        id: i.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, tC)) : E("", !0)
    ]));
  }
}), nC = ["for"], oC = { class: "flex w-full min-w-0 items-center gap-3" }, sC = ["for", "aria-label"], iC = ["src"], rC = ["id", "accept", "disabled"], lC = ["id", "value", "placeholder", "disabled"], cC = /* @__PURE__ */ de({
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
    const a = e, n = t, o = se(!1), s = se(null), i = `kiut-image-upload-circle-${We()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-url`), c = C(() => a.size === "sm" ? "h-10 w-10" : a.size === "lg" ? "h-16 w-16" : "h-12 w-12"), u = C(() => a.size === "sm" ? "h-4 w-4" : a.size === "lg" ? "h-6 w-6" : "h-5 w-5"), h = C(() => !a.disabled && !a.loading);
    Te(
      () => a.modelValue,
      () => {
        o.value = !1;
      }
    );
    function g(f) {
      const p = f.target, y = p.files?.[0];
      y && n("select", y), p.value = "";
    }
    function b(f) {
      n("update:modelValue", f.target.value);
    }
    return (f, p) => (m(), x("div", yt({ class: "font-sans flex w-full flex-col gap-2" }, f.$attrs), [
      e.label ? (m(), x("label", {
        key: 0,
        for: r.value,
        class: Z(T(lt))
      }, A(e.label), 11, nC)) : E("", !0),
      d("div", oC, [
        d("label", {
          for: r.value,
          class: Z(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
            c.value,
            h.value ? "cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]" : "cursor-not-allowed opacity-60"
          ]]),
          "aria-label": e.uploadAriaLabel
        }, [
          e.modelValue && !o.value && !e.loading ? (m(), x("img", {
            key: 0,
            src: e.modelValue,
            alt: "",
            class: "h-full w-full object-cover",
            onError: p[0] || (p[0] = (y) => o.value = !0)
          }, null, 40, iC)) : e.loading ? (m(), oe(T(ep), {
            key: 1,
            class: Z([u.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (m(), oe(T(ro), {
            key: 2,
            class: Z([u.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, sC),
        d("input", {
          id: r.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: g
        }, null, 40, rC),
        e.showUrlInput ? (m(), x("div", {
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
            onInput: b
          }, null, 42, lC)
        ], 2)) : E("", !0)
      ])
    ], 16));
  }
}), dC = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, uC = {
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  es: ["lu", "ma", "mi", "ju", "vi", "sá", "do"]
}, hC = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, fC = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, gC = {
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
}, mC = {
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
}, pC = [
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
function bC(e = "en") {
  return dC[e];
}
function vC(e = "en") {
  return uC[e];
}
function Or(e = "en") {
  return pC.map((t) => ({ id: t, label: mC[e][t] }));
}
function yC(e = "en") {
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
function xC(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ve(a);
}
function Ea(e, t) {
  return xC(e, -t);
}
function kC(e) {
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
      return { start: n, end: kC(n) };
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
function _C(e, t, a = /* @__PURE__ */ new Date(), n, o) {
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
function wC(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - (n.getDay() + 6) % 7);
  const s = [], i = new Date(o);
  for (let r = 0; r < 42; r++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function ka(e) {
  if (!e?.trim()) return null;
  const t = hC.exec(e.trim());
  if (!t) return null;
  const a = Number(t[1]), n = Number(t[2]), o = Number(t[3]), s = Number(t[4]), i = Number(t[5]), r = new Date(a, n - 1, o, s, i);
  return Number.isNaN(r.getTime()) ? null : r;
}
function CC(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0"), o = String(e.getHours()).padStart(2, "0"), s = String(e.getMinutes()).padStart(2, "0");
  return `${t}-${a}-${n}T${o}:${s}`;
}
function $C(e) {
  const t = ka(e);
  return t ? `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : "00:00";
}
function SC(e, t = "es") {
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
function Bn(e, t = "en") {
  return `${fC[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Nt(e, t = "en") {
  return `${gC[t][e.getMonth()]} ${e.getFullYear()}`;
}
const MC = ["name", "value"], DC = { class: "flex flex-row gap-3 items-center" }, AC = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, TC = ["for"], BC = ["id", "disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], LC = ["aria-label", "onKeydown"], RC = { class: "p-3" }, PC = { class: "mb-4 flex items-center justify-between gap-2" }, IC = ["aria-label"], EC = { class: "min-w-0 truncate px-1 text-sm font-medium text-[#61616b] dark:text-[#e3e3e8]" }, FC = ["aria-label"], OC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-normal tracking-wide text-[#61616b] dark:text-[#e3e3e8]" }, VC = { class: "grid grid-cols-7 gap-y-2" }, zC = ["disabled", "onClick"], NC = { class: "border-t border-gray-200 px-3 py-3 dark:border-[color:var(--kiut-border-light)]" }, jC = { class: "relative" }, HC = ["value", "disabled", "min", "max", "step", "aria-label"], WC = /* @__PURE__ */ de({
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
    const a = e, n = t, o = `kiut-input-datetime-${We()}`, s = `${o}-label`, i = C(() => a.id ?? `${o}-btn`), r = `${o}-panel`, l = `${o}-err`, c = se(null), u = se(null), h = se(null), g = se(!1), b = se(kt(/* @__PURE__ */ new Date())), f = se(null), p = se("00:00"), y = C(() => !!a.modelValue), v = C(() => vC(a.locale)), k = C(() => wC(b.value)), w = C(() => a.placeholder), _ = C(() => a.modelValue ? SC(a.modelValue, a.locale) : a.placeholder), $ = C(() => {
      const R = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${R}` : `left-0 right-auto ${R}`;
    }), S = C(
      () => a.locale === "es" ? "Calendario de fecha y hora" : "Date and time calendar"
    ), M = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), I = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), V = C(
      () => a.locale === "es" ? "Hora" : "Time"
    ), W = C(() => ka(a.min)), D = C(() => ka(a.max)), P = C(() => {
      if (!(!f.value || !W.value) && mt(f.value, W.value))
        return `${String(W.value.getHours()).padStart(2, "0")}:${String(W.value.getMinutes()).padStart(2, "0")}`;
    }), B = C(() => {
      if (!(!f.value || !D.value) && mt(f.value, D.value))
        return `${String(D.value.getHours()).padStart(2, "0")}:${String(D.value.getMinutes()).padStart(2, "0")}`;
    });
    function N(R, K) {
      return R.getMonth() === K.getMonth() && R.getFullYear() === K.getFullYear();
    }
    function j(R) {
      const K = Ve(R);
      return !!(W.value && jt(K, Ve(W.value)) || D.value && wn(K, Ve(D.value)));
    }
    function Q(R) {
      const K = N(R, b.value), ie = j(R), J = f.value ? mt(R, f.value) : !1;
      if (ie)
        return "rounded-lg text-[#61616b] opacity-40";
      let U = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white";
      return J && (U = "rounded-lg bg-[#895af6] font-semibold text-white"), K || (U = `${U} opacity-30`), U;
    }
    function X() {
      const R = ka(a.modelValue);
      if (R) {
        f.value = Ve(R), p.value = $C(a.modelValue), b.value = kt(R);
        return;
      }
      f.value = null, p.value = "00:00", b.value = kt(/* @__PURE__ */ new Date());
    }
    function re(R) {
      if (!f.value) return R;
      let K = ka(
        `${nt(f.value)}T${R}`
      );
      return K ? (W.value && mt(f.value, W.value) && vi(K, W.value) && (K = W.value), D.value && mt(f.value, D.value) && yi(K, D.value) && (K = D.value), `${String(K.getHours()).padStart(2, "0")}:${String(K.getMinutes()).padStart(2, "0")}`) : R;
    }
    function H() {
      if (!f.value) {
        n("update:modelValue", null);
        return;
      }
      const R = re(p.value);
      p.value = R;
      const K = new Date(
        f.value.getFullYear(),
        f.value.getMonth(),
        f.value.getDate(),
        Number(R.slice(0, 2)),
        Number(R.slice(3, 5))
      ), ie = CC(K);
      W.value && vi(K, W.value) || D.value && yi(K, D.value) || n("update:modelValue", ie);
    }
    function ae(R) {
      j(R) || (f.value = Ve(R), p.value = re(p.value), H());
    }
    function L(R) {
      const K = R.target.value;
      K && (p.value = K, H());
    }
    function Y(R) {
      b.value = Ma(b.value, R);
    }
    function q() {
      g.value = !1;
    }
    function G() {
      a.disabled || (X(), g.value = !0, Ke(() => h.value?.focus()));
    }
    function ue(R) {
      if (R.stopPropagation(), !a.disabled) {
        if (g.value) {
          q();
          return;
        }
        G();
      }
    }
    function me(R) {
      a.disabled || (R.key === "ArrowDown" || R.key === "Enter" || R.key === " ") && (R.preventDefault(), g.value || G());
    }
    function ne(R) {
      if (!g.value) return;
      const K = c.value;
      K && !K.contains(R.target) && q();
    }
    return Te(
      () => a.modelValue,
      () => {
        g.value || X();
      }
    ), Je(() => {
      X(), document.addEventListener("click", ne);
    }), it(() => {
      document.removeEventListener("click", ne);
    }), (R, K) => (m(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.name ? (m(), x("input", {
        key: 0,
        type: "hidden",
        name: e.name,
        value: e.modelValue ?? ""
      }, null, 8, MC)) : E("", !0),
      d("div", DC, [
        R.$slots.icon ? (m(), x("span", AC, [
          ke(R.$slots, "icon")
        ])) : E("", !0),
        e.label ? (m(), x("label", {
          key: 1,
          id: s,
          for: i.value,
          class: Z(T(lt))
        }, A(e.label), 11, TC)) : E("", !0)
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
          g.value && !e.invalid ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": g.value,
        "aria-haspopup": "dialog",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : w.value,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? l : void 0,
        onClick: ue,
        onKeydown: me
      }, [
        z(T(Ro), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            y.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(_.value), 3)
      ], 42, BC),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: l,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 3)) : E("", !0),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: h,
        id: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": S.value,
        class: Z([
          $.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Pe(q, ["stop"]), ["escape"])
      }, [
        d("div", RC, [
          d("div", PC, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": M.value,
              onClick: K[0] || (K[0] = Pe((ie) => Y(-1), ["stop"]))
            }, [
              z(T(Po), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, IC),
            d("span", EC, A(T(Nt)(b.value, e.locale)), 1),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": I.value,
              onClick: K[1] || (K[1] = Pe((ie) => Y(1), ["stop"]))
            }, [
              z(T(Io), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, FC)
          ]),
          d("div", OC, [
            (m(!0), x(ce, null, pe(v.value, (ie) => (m(), x("span", { key: ie }, A(ie), 1))), 128))
          ]),
          d("div", VC, [
            (m(!0), x(ce, null, pe(k.value, (ie) => (m(), x("button", {
              key: T(nt)(ie),
              type: "button",
              disabled: j(ie),
              class: Z(["relative mx-auto flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed", Q(ie)]),
              onClick: Pe((J) => ae(ie), ["stop"])
            }, A(ie.getDate()), 11, zC))), 128))
          ])
        ]),
        d("div", NC, [
          d("div", jC, [
            z(T(xr), {
              class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
              "aria-hidden": "true"
            }),
            d("input", {
              value: p.value,
              type: "time",
              autocomplete: "off",
              class: Z([T(et), "min-h-0 py-2 pl-10 pr-3 text-sm"]),
              disabled: !f.value,
              min: P.value,
              max: B.value,
              step: e.step,
              "aria-label": V.value,
              onInput: L,
              onClick: K[2] || (K[2] = Pe(() => {
              }, ["stop"]))
            }, null, 42, HC)
          ])
        ])
      ], 42, LC), [
        [Ht, g.value]
      ])
    ], 512));
  }
}), KC = { class: "font-sans" }, UC = { class: "flex flex-row gap-3 items-center" }, YC = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, qC = ["for"], XC = { class: "relative" }, GC = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], ZC = ["id"], QC = /* @__PURE__ */ de({
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
      const g = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!g) return null;
      const b = Number(g[1]), f = Number(g[2]);
      return !Number.isInteger(b) || !Number.isInteger(f) || b < 0 || b > 23 || f < 0 || f > 59 ? null : `${String(b).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function n(h) {
      return h === "" ? null : a(h);
    }
    const o = e, s = t, i = `kiut-input-time-${We()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function u(h) {
      const g = h.target.value;
      s("update:modelValue", n(g));
    }
    return (h, g) => (m(), x("div", KC, [
      d("div", UC, [
        h.$slots.icon ? (m(), x("span", YC, [
          ke(h.$slots, "icon")
        ])) : E("", !0),
        e.label ? (m(), x("label", {
          key: 1,
          for: r.value,
          class: Z(T(lt))
        }, A(e.label), 11, qC)) : E("", !0)
      ]),
      d("div", XC, [
        z(T(xr), {
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
        }, null, 42, GC)
      ]),
      e.errorText ? (m(), x("p", {
        key: 0,
        id: l.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, ZC)) : E("", !0)
    ]));
  }
}), JC = { class: "font-sans" }, e$ = ["for"], t$ = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, a$ = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], n$ = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, o$ = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, s$ = { class: "min-w-0 text-left leading-snug" }, i$ = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, r$ = { class: "min-w-0 text-right leading-snug" }, l$ = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, c$ = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, d$ = ["id"], u$ = /* @__PURE__ */ de({
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
      const b = [];
      return a.errorText && b.push(i.value), b.length ? b.join(" ") : void 0;
    }), l = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = C(() => !!(a.captionMin || a.captionMax)), u = C(() => {
      const { min: b, max: f, modelValue: p } = a;
      if (f === b) return 0;
      const y = (p - b) / (f - b);
      return Math.min(100, Math.max(0, y * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function g(b) {
      const f = Number(b.target.value);
      n("update:modelValue", Number.isNaN(f) ? a.min : f);
    }
    return (b, f) => (m(), x("div", JC, [
      e.label ? (m(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(lt))
      }, A(e.label), 11, e$)) : E("", !0),
      d("div", {
        class: Z(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (m(), x("p", t$, A(e.captionMax), 1)) : E("", !0),
        d("div", {
          class: Z(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: we(h.value)
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
            onInput: g
          }, null, 42, a$)
        ], 6),
        e.orientation === "horizontal" && l.value ? (m(), x("p", n$, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (m(), x("div", o$, [
          d("span", s$, A(e.captionMin), 1),
          d("span", i$, A(e.caption), 1),
          d("span", r$, A(e.captionMax), 1)
        ])) : E("", !0),
        e.orientation === "vertical" && e.captionMin ? (m(), x("p", l$, A(e.captionMin), 1)) : E("", !0),
        e.orientation === "vertical" && e.caption ? (m(), x("p", c$, A(e.caption), 1)) : E("", !0)
      ], 2),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, d$)) : E("", !0)
    ]));
  }
}), h$ = /* @__PURE__ */ ve(u$, [["__scopeId", "data-v-ce7263e4"]]), f$ = { class: "font-sans" }, g$ = ["for"], m$ = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], p$ = ["id"], b$ = /* @__PURE__ */ de({
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
      const h = u.target.value;
      if (h === "") {
        n("update:modelValue", null);
        return;
      }
      const g = Number(h);
      n("update:modelValue", Number.isNaN(g) ? null : g);
    }
    return (u, h) => (m(), x("div", f$, [
      e.label ? (m(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(lt))
      }, A(e.label), 11, g$)) : E("", !0),
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
      }, null, 42, m$),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, p$)) : E("", !0)
    ]));
  }
}), v$ = { class: "font-sans" }, y$ = ["for"], x$ = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], k$ = ["disabled"], _$ = ["id"], w$ = "#3b82f6", C$ = "#aabbcc", $$ = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", S$ = /* @__PURE__ */ de({
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
      const p = f.trim(), y = /^#?([0-9a-fA-F]{6})$/.exec(p);
      if (y) return `#${y[1].toLowerCase()}`;
      const v = /^#?([0-9a-fA-F]{3})$/.exec(p);
      if (v) {
        const [k, w, _] = v[1].split("");
        return `#${k}${k}${w}${w}${_}${_}`.toLowerCase();
      }
      return null;
    }
    function n(f) {
      return a(f) ?? w$;
    }
    const o = e, s = t, i = `kiut-input-color-${We()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => n(o.modelValue)), u = se(c.value), h = se(!1);
    Te(c, (f) => {
      h.value || (u.value = f);
    });
    function g(f) {
      const p = f.target, y = a(p.value);
      y && s("update:modelValue", y);
    }
    function b() {
      h.value = !1;
      const f = a(u.value);
      f ? (u.value = f, s("update:modelValue", f)) : u.value = c.value;
    }
    return Te(u, (f) => {
      if (!h.value) return;
      const p = a(f);
      p && s("update:modelValue", p);
    }), (f, p) => (m(), x("div", v$, [
      e.label ? (m(), x("label", {
        key: 0,
        for: r.value,
        class: Z(T(lt))
      }, A(e.label), 11, y$)) : E("", !0),
      d("div", {
        class: Z([
          $$,
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
          onInput: g
        }, null, 40, x$),
        e.showHexInput ? Xe((m(), x("input", {
          key: 0,
          "onUpdate:modelValue": p[0] || (p[0] = (y) => u.value = y),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: C$,
          onFocus: p[1] || (p[1] = (y) => h.value = !0),
          onBlur: b
        }, null, 40, k$)), [
          [Rt, u.value]
        ]) : E("", !0)
      ], 2),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: l.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, _$)) : E("", !0)
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
function M$(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function D$(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (r) => s || M$(r, n)
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
function EM(e) {
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
function A$(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function T$(e, t) {
  return `${e}${t}`;
}
const B$ = ["disabled", "aria-expanded", "aria-label"], L$ = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, R$ = {
  key: 0,
  class: "truncate text-sm"
}, P$ = ["aria-label"], I$ = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, E$ = ["disabled", "placeholder", "aria-label"], F$ = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, O$ = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, V$ = { class: "grid grid-cols-8 gap-0.5" }, z$ = ["disabled", "aria-label", "onClick"], N$ = { class: "text-[1.35rem] leading-none" }, j$ = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, H$ = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, W$ = /* @__PURE__ */ de({
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
    const a = e, n = t, o = `kiut-emoji-picker-${We()}`, s = `${o}-btn`, i = `${o}-panel`, r = se(null), l = se(null), c = se(null), u = se(null), h = se(!1), g = se(""), b = se({}), f = C(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), p = C(() => ({
      ...Wr,
      ...a.categoryLabels
    })), y = C(() => new Set(A$(a.draft))), v = C(() => {
      if (a.categories?.length) {
        const B = g.value.trim().toLowerCase();
        return B ? a.categories.map((N) => ({
          ...N,
          emojis: N.emojis.filter((j) => j.includes(B) || N.label.toLowerCase().includes(B) ? !0 : N.id.toLowerCase().includes(B))
        })).filter((N) => N.emojis.length > 0) : a.categories;
      }
      return D$(
        Kr,
        p.value,
        g.value
      );
    });
    function k() {
      const B = l.value;
      if (!B) return;
      const N = B.getBoundingClientRect(), j = 320, Q = 8, X = 8;
      let re = N.right - j;
      re < X && (re = N.left), re + j > window.innerWidth - X && (re = Math.max(X, window.innerWidth - j - X));
      const H = Math.max(160, N.top - Q - X);
      b.value = {
        bottom: `${window.innerHeight - N.top + Q}px`,
        left: `${re}px`,
        width: `${j}px`,
        maxHeight: `${H}px`
      };
    }
    function w(B) {
      const N = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return y.value.has(B) ? `${N} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : N;
    }
    function _(B) {
      if (a.disabled) return;
      const N = T$(a.draft ?? "", B);
      n("update:draft", N), n("select", B);
    }
    function $() {
      g.value = "", n("open"), Ke(() => {
        k(), u.value?.focus();
      });
    }
    function S() {
      h.value && (h.value = !1, g.value = "", n("close"), l.value?.focus());
    }
    function M() {
      if (!a.disabled) {
        if (h.value) {
          S();
          return;
        }
        h.value = !0, $();
      }
    }
    function I(B) {
      B.stopPropagation(), M();
    }
    function V(B) {
      if (!h.value) return;
      const N = B.target, j = r.value, Q = c.value;
      j && !j.contains(N) && (!Q || !Q.contains(N)) && S();
    }
    function W(B) {
      a.disabled || ((B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), h.value || (h.value = !0, $())), B.key === "Escape" && h.value && (B.preventDefault(), S()));
    }
    function D(B) {
      B.key === "Escape" && (B.preventDefault(), S());
    }
    function P() {
      h.value && k();
    }
    return Je(() => {
      document.addEventListener("click", V), window.addEventListener("resize", P), window.addEventListener("scroll", P, !0);
    }), it(() => {
      document.removeEventListener("click", V), window.removeEventListener("resize", P), window.removeEventListener("scroll", P, !0);
    }), (B, N) => (m(), x("div", {
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
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": f.value,
        onClick: I,
        onKeydown: W
      }, [
        d("span", L$, [
          ke(B.$slots, "icon", {}, () => [
            z(T(op), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (m(), x("span", R$, A(e.triggerLabel), 1)) : E("", !0),
        e.triggerLabel ? (m(), oe(T(ta), {
          key: 1,
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : E("", !0)
      ], 42, B$),
      (m(), oe(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: we(b.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: N[2] || (N[2] = Pe(() => {
          }, ["stop"])),
          onKeydown: Pe(D, ["stop"])
        }, [
          d("div", I$, [
            Xe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": N[0] || (N[0] = (j) => g.value = j),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: N[1] || (N[1] = Pe(() => {
              }, ["stop"]))
            }, null, 8, E$), [
              [Rt, g.value]
            ])
          ]),
          d("div", F$, [
            v.value.length > 0 ? (m(!0), x(ce, { key: 0 }, pe(v.value, (j) => (m(), x("section", {
              key: j.id
            }, [
              d("h3", O$, A(j.label), 1),
              d("div", V$, [
                (m(!0), x(ce, null, pe(j.emojis, (Q) => (m(), x("button", {
                  key: `${j.id}-${Q}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${Q} to input`,
                  class: Z(w(Q)),
                  onClick: Pe((X) => _(Q), ["stop"])
                }, [
                  d("span", N$, A(Q), 1)
                ], 10, z$))), 128))
              ])
            ]))), 128)) : (m(), x("p", j$, A(e.emptySearchText), 1))
          ]),
          e.hint ? (m(), x("p", H$, A(e.hint), 1)) : E("", !0)
        ], 44, P$), [
          [Ht, h.value]
        ])
      ]))
    ], 512));
  }
}), K$ = /* @__PURE__ */ de({
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
    return (i, r) => (m(), oe(na, {
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
}), U$ = { class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]" }, Y$ = { class: "relative" }, q$ = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, X$ = ["placeholder", "aria-label", "disabled"], G$ = {
  key: 0,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Z$ = ["aria-label"], Q$ = {
  key: 0,
  class: "px-3 py-6 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, J$ = ["aria-selected", "onClick", "onMouseenter"], e4 = { class: "min-w-0 flex-1 truncate" }, t4 = /* @__PURE__ */ de({
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
    const n = e, o = a, i = `${`kiut-language-picker-${We()}`}-listbox`, r = se(null), l = se(null), c = se(""), u = se(0), h = C(() => n.options.filter((_) => !_.disabled)), g = C(() => {
      const _ = c.value.trim().toLowerCase();
      return _ ? h.value.filter(($) => $.label.toLowerCase().includes(_)) : h.value;
    });
    function b(_) {
      return `${_.value}-${_.label}`;
    }
    function f(_) {
      return n.modelValue === _.value;
    }
    function p(_, $) {
      const S = f(_), M = u.value === $;
      return [
        "flex cursor-pointer items-center gap-2.5 border-b border-gray-200 px-3 py-2.5 text-sm transition-colors last:border-b-0 dark:border-white/5",
        S ? "bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-text-primary)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-slate-100" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !S && M ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function y() {
      u.value = Math.max(
        0,
        g.value.findIndex((_) => _.value === n.modelValue)
      );
    }
    function v(_) {
      _.disabled || o("update:modelValue", _.value);
    }
    function k(_) {
      const $ = g.value;
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
      const $ = g.value;
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
    }), (_, $) => (m(), x("div", {
      class: Z(["overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] font-sans shadow-sm dark:border-[color:var(--kiut-border-light)]", e.disabled ? "pointer-events-none opacity-50" : ""])
    }, [
      d("div", U$, [
        d("div", Y$, [
          d("span", q$, [
            z(T(Eo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
          ]),
          Xe(d("input", {
            ref_key: "searchInputRef",
            ref: r,
            "onUpdate:modelValue": $[0] || ($[0] = (S) => c.value = S),
            type: "search",
            class: Z([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
            placeholder: e.searchPlaceholder,
            "aria-label": e.searchPlaceholder,
            disabled: e.disabled,
            onKeydown: k
          }, null, 42, X$), [
            [Rt, c.value]
          ])
        ])
      ]),
      e.listSectionLabel ? (m(), x("p", G$, A(e.listSectionLabel), 1)) : E("", !0),
      d("ul", {
        id: i,
        ref_key: "listRef",
        ref: l,
        role: "listbox",
        tabindex: "0",
        "aria-label": e.listSectionLabel || e.searchPlaceholder,
        class: Z([e.listMaxHeightClass, "overflow-auto pb-1 outline-none"]),
        onKeydown: w
      }, [
        g.value.length === 0 ? (m(), x("li", Q$, A(e.noResultsText), 1)) : E("", !0),
        (m(!0), x(ce, null, pe(g.value, (S, M) => (m(), x("li", {
          key: b(S),
          role: "option",
          "aria-selected": f(S),
          class: Z(p(S, M)),
          onClick: (I) => v(S),
          onMouseenter: (I) => u.value = M
        }, [
          S.flagClass ? (m(), x("span", {
            key: 0,
            class: Z([S.flagClass, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : E("", !0),
          d("span", e4, A(S.label), 1)
        ], 42, J$))), 128))
      ], 42, Z$)
    ], 2));
  }
}), a4 = { class: "flex flex-row gap-3 items-center" }, n4 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, o4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], s4 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, i4 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, r4 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, l4 = { class: "truncate" }, c4 = { class: "absolute left-0 right-0 z-50 mt-[-3px] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]" }, d4 = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, u4 = { class: "relative" }, h4 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, f4 = ["placeholder", "aria-label"], g4 = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, m4 = ["aria-selected", "onClick", "onMouseenter"], p4 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, b4 = { class: "min-w-0 flex-1" }, v4 = /* @__PURE__ */ de({
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
    noResultsText: { default: "Sin resultados" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-multiselect-${We()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = se(null), c = se(null), u = se(null), h = se(!1), g = se(0), b = se(""), f = C(() => a.options.filter((X) => !X.disabled)), p = C(() => {
      if (!a.searchable) return f.value;
      const X = b.value.trim().toLowerCase();
      return X ? f.value.filter(
        (re) => re.label.toLowerCase().includes(X)
      ) : f.value;
    }), y = C(() => new Set(a.modelValue ?? [])), v = C(
      () => a.options.filter((X) => y.value.has(X.value))
    ), k = C(() => {
      const X = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", re = v.value.length;
      return re === 0 ? X : `${X}, ${re} seleccionada${re === 1 ? "" : "s"}`;
    });
    function w(X) {
      return `${String(X.value)}-${X.label}`;
    }
    function _(X) {
      return y.value.has(X.value);
    }
    function $(X, re) {
      const H = _(X), ae = g.value === re;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        H ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !H && ae ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function S(X) {
      const re = [...a.modelValue ?? []], H = re.indexOf(X.value);
      H >= 0 ? re.splice(H, 1) : re.push(X.value), n("update:modelValue", re);
    }
    function M() {
      const X = p.value;
      if (X.length === 0) {
        g.value = 0;
        return;
      }
      const re = y.value, H = X.findIndex((ae) => re.has(ae.value));
      g.value = H >= 0 ? H : 0;
    }
    function I() {
      if (a.searchable) {
        u.value?.focus();
        return;
      }
      c.value?.focus();
    }
    function V() {
      b.value = "", M(), Ke(() => I());
    }
    function W() {
      h.value = !1, b.value = "";
    }
    function D() {
      if (!a.disabled) {
        if (h.value) {
          W();
          return;
        }
        h.value = !0, V();
      }
    }
    function P(X) {
      X.stopPropagation(), !a.disabled && D();
    }
    function B(X) {
      if (!h.value) return;
      const re = l.value;
      re && !re.contains(X.target) && W();
    }
    function N(X) {
      a.disabled || (X.key === "ArrowDown" || X.key === "Enter" || X.key === " ") && (X.preventDefault(), h.value || (h.value = !0, V()));
    }
    function j(X) {
      const re = p.value;
      if (X.key === "Escape") {
        X.preventDefault(), W();
        return;
      }
      if (X.key === "ArrowDown") {
        if (X.preventDefault(), re.length === 0) return;
        g.value = 0, c.value?.focus();
        return;
      }
      if (X.key === "ArrowUp") {
        if (X.preventDefault(), re.length === 0) return;
        g.value = re.length - 1, c.value?.focus();
        return;
      }
      if (X.key === "Enter") {
        X.preventDefault();
        const H = re[g.value];
        H && S(H);
      }
    }
    function Q(X) {
      const re = p.value;
      if (X.key === "Escape") {
        X.preventDefault(), W();
        return;
      }
      if (re.length !== 0) {
        if (X.key === "ArrowDown") {
          X.preventDefault(), g.value = Math.min(g.value + 1, re.length - 1);
          return;
        }
        if (X.key === "ArrowUp") {
          if (X.preventDefault(), g.value === 0 && a.searchable) {
            u.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (X.key === "Enter" || X.key === " ") {
          X.preventDefault();
          const H = re[g.value];
          H && S(H);
        }
      }
    }
    return Te(b, () => {
      g.value = 0;
    }), Je(() => {
      document.addEventListener("click", B);
    }), it(() => {
      document.removeEventListener("click", B);
    }), (X, re) => (m(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      d("div", a4, [
        X.$slots.icon ? (m(), x("span", n4, [
          ke(X.$slots, "icon")
        ])) : E("", !0),
        e.label ? (m(), x("label", {
          key: 1,
          id: s,
          class: Z(T(lt))
        }, A(e.label), 3)) : E("", !0)
      ]),
      d("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          T(et),
          "flex items-start justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : k.value,
        onClick: P,
        onKeydown: N
      }, [
        d("div", s4, [
          v.value.length === 0 ? (m(), x("span", i4, A(e.placeholder), 1)) : (m(), x("div", r4, [
            (m(!0), x(ce, null, pe(v.value, (H) => (m(), x("span", {
              key: w(H),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              d("span", l4, A(H.label), 1)
            ]))), 128))
          ]))
        ]),
        z(T(ta), {
          class: Z(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, o4),
      Xe(d("div", c4, [
        e.searchable ? (m(), x("div", d4, [
          d("div", u4, [
            d("span", h4, [
              z(T(Eo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
            ]),
            Xe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": re[0] || (re[0] = (H) => b.value = H),
              type: "search",
              class: Z([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: re[1] || (re[1] = Pe(() => {
              }, ["stop"])),
              onKeydown: Pe(j, ["stop"])
            }, null, 42, f4), [
              [Rt, b.value]
            ])
          ])
        ])) : E("", !0),
        d("ul", {
          id: r,
          ref_key: "listRef",
          ref: c,
          role: "listbox",
          tabindex: "-1",
          "aria-multiselectable": "true",
          class: "max-h-60 overflow-auto py-1",
          onKeydown: Pe(Q, ["stop"])
        }, [
          p.value.length === 0 ? (m(), x("li", g4, A(e.noResultsText), 1)) : E("", !0),
          (m(!0), x(ce, null, pe(p.value, (H, ae) => (m(), x("li", {
            key: w(H),
            role: "option",
            "aria-selected": _(H),
            class: Z($(H, ae)),
            onClick: Pe((L) => S(H), ["stop"]),
            onMouseenter: (L) => g.value = ae
          }, [
            d("span", p4, [
              _(H) ? (m(), oe(T(Fo), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : E("", !0)
            ]),
            d("span", b4, A(H.label), 1)
          ], 42, m4))), 128))
        ], 544)
      ], 512), [
        [Ht, h.value]
      ])
    ], 512));
  }
}), y4 = { class: "font-sans" }, x4 = ["for"], k4 = { class: "flex gap-2" }, _4 = { class: "w-[7.5rem] shrink-0" }, w4 = { class: "min-w-0 flex-1" }, C4 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], $4 = ["id"], S4 = /* @__PURE__ */ de({
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
    return (c, u) => (m(), x("div", y4, [
      e.label ? (m(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(lt))
      }, A(e.label), 11, x4)) : E("", !0),
      d("div", k4, [
        d("div", _4, [
          z(na, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        d("div", w4, [
          Xe(d("input", {
            id: s.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => l.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Z([T(et), e.invalid ? T(Dt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, C4), [
            [Rt, l.value]
          ])
        ])
      ]),
      e.errorText ? (m(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, $4)) : E("", !0)
    ]));
  }
}), M4 = ["role", "aria-label"], D4 = { class: "flex flex-wrap gap-2" }, A4 = ["aria-checked", "role", "onClick"], T4 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, B4 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, L4 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, R4 = /* @__PURE__ */ de({
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
    return (l, c) => (m(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      d("div", D4, [
        (m(!0), x(ce, null, pe(e.items, (u) => (m(), x("button", {
          key: u.value,
          type: "button",
          class: Z(i(u)),
          "aria-checked": s(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(u)
        }, [
          d("span", T4, [
            s(u) ? (m(), x("span", B4)) : E("", !0)
          ]),
          u.dotColor ? (m(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: we({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          d("span", L4, A(u.label), 1)
        ], 10, A4))), 128))
      ])
    ], 8, M4));
  }
}), P4 = ["aria-label"], I4 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], E4 = { class: "truncate px-3 py-2 text-sm font-medium" }, F4 = /* @__PURE__ */ de({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-seg-${We()}`, s = (p) => `${o}-seg-${p}`, i = se([]);
    function r(p, y) {
      p instanceof HTMLButtonElement ? i.value[y] = p : i.value[y] = null;
    }
    function l(p) {
      return p.value === a.modelValue;
    }
    function c(p) {
      const y = l(p), v = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return p.disabled ? `${v} cursor-not-allowed opacity-40` : y ? `${v} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${v} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(p) {
      p.disabled || p.value !== a.modelValue && n("update:modelValue", p.value);
    }
    function h(p, y, v) {
      u(p), Ke(() => i.value[y]?.focus());
    }
    const g = C(
      () => a.items.map((p, y) => p.disabled ? -1 : y).filter((p) => p >= 0)
    );
    function b(p, y) {
      const v = a.items.length;
      if (v === 0) return 0;
      let k = p;
      for (let w = 0; w < v; w++)
        if (k = (k + y + v) % v, !a.items[k]?.disabled) return k;
      return p;
    }
    function f(p, y) {
      if (p.key === "ArrowRight" || p.key === "ArrowDown") {
        p.preventDefault();
        const v = b(y, 1), k = a.items[v];
        k && u(k), Ke(() => i.value[v]?.focus());
      } else if (p.key === "ArrowLeft" || p.key === "ArrowUp") {
        p.preventDefault();
        const v = b(y, -1), k = a.items[v];
        k && u(k), Ke(() => i.value[v]?.focus());
      } else if (p.key === "Home") {
        p.preventDefault();
        const v = g.value[0];
        if (v !== void 0) {
          const k = a.items[v];
          k && u(k), Ke(() => i.value[v]?.focus());
        }
      } else if (p.key === "End") {
        p.preventDefault();
        const v = g.value[g.value.length - 1];
        if (v !== void 0) {
          const k = a.items[v];
          k && u(k), Ke(() => i.value[v]?.focus());
        }
      }
    }
    return (p, y) => (m(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (m(!0), x(ce, null, pe(e.items, (v, k) => (m(), x("button", {
        id: s(v.value),
        key: v.value,
        ref_for: !0,
        ref: (w) => r(w, k),
        type: "button",
        role: "tab",
        "aria-selected": l(v),
        "aria-disabled": v.disabled === !0,
        tabindex: l(v) ? 0 : -1,
        class: Z(c(v)),
        onClick: (w) => h(v, k),
        onKeydown: (w) => f(w, k)
      }, [
        d("span", E4, A(v.label), 1)
      ], 42, I4))), 128))
    ], 8, P4));
  }
}), O4 = ["aria-expanded", "aria-labelledby", "aria-label"], V4 = ["onKeydown"], z4 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, N4 = { class: "mb-4 flex items-center justify-between gap-2" }, j4 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, H4 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, W4 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, K4 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, U4 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, Y4 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, q4 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, X4 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, G4 = ["disabled", "onClick"], Z4 = "rounded-lg text-[#61616b]", Q4 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", J4 = "opacity-30", eS = "bg-[#6b35e9] font-medium text-white", tS = "bg-[#895af6] font-semibold text-white", aS = /* @__PURE__ */ de({
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
    const a = e, n = t, s = `${`kiut-drp-${We()}`}-lbl`, i = se(null), r = se(null), l = se(!1), c = se(null), u = se(kt(/* @__PURE__ */ new Date())), h = C(() => !!(a.modelValue.start && a.modelValue.end)), g = C(() => {
      const D = kt(u.value);
      return [D, Ma(D, 1)];
    }), b = C(() => a.ariaLabel ?? a.placeholder), f = C(() => {
      const D = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${D}` : `left-0 right-auto ${D}`;
    }), p = C(
      () => `${Nt(g.value[0])} – ${Nt(g.value[1])}`
    ), y = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], v = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = at(a.modelValue.start), P = at(a.modelValue.end);
      return `${Bn(D)} – ${Bn(P)}`;
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
      const N = mt(D, P), j = mt(D, B);
      if (N && j) return "rounded-lg";
      const Q = N || D.getDay() === 0, X = j || D.getDay() === 6;
      return Q && X ? "rounded-lg" : Q ? "rounded-l-lg" : X ? "rounded-r-lg" : "rounded-none";
    }
    function $(D, P) {
      const B = k(P, D), N = w(P), j = a.modelValue.start ? Ve(at(a.modelValue.start)) : null, Q = a.modelValue.end ? Ve(at(a.modelValue.end)) : null, X = Ve(P);
      if (N)
        return Z4;
      let re = Q4;
      if (j && Q && Nr(X, j) && jr(X, Q)) {
        const ae = mt(X, j), L = mt(X, Q);
        re = `${_(X, j, Q)} ${ae || L ? tS : eS}`;
      }
      return B || (re = `${re} ${J4}`), re;
    }
    function S(D) {
      if (w(D)) return;
      const P = Ve(D);
      if (!c.value) {
        c.value = new Date(P), n("update:modelValue", { start: nt(P), end: nt(P) });
        return;
      }
      let N = Ve(c.value), j = new Date(P);
      jt(j, N) && ([N, j] = [j, N]), n("update:modelValue", { start: nt(N), end: nt(j) }), c.value = null, l.value = !1;
    }
    function M(D) {
      u.value = Ma(u.value, D);
    }
    function I() {
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
      const P = i.value;
      P && !P.contains(D.target) && (l.value = !1);
    }
    return Te(l, (D) => {
      D && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", W);
    }), it(() => {
      document.removeEventListener("click", W);
    }), (D, P) => (m(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), x("label", {
        key: 0,
        id: s,
        class: Z(T(lt))
      }, A(e.label), 3)) : E("", !0),
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
        "aria-label": e.label ? void 0 : b.value,
        onFocus: V,
        onClick: V
      }, [
        z(T(Ro), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(v.value), 3)
      ], 42, O4),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: Z([
          f.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Pe(I, ["stop"]), ["escape"])
      }, [
        d("div", z4, [
          d("div", N4, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: P[0] || (P[0] = (B) => M(-1))
            }, [
              z(T(Po), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            d("div", j4, [
              d("span", H4, A(p.value), 1),
              d("div", W4, [
                d("span", K4, A(T(Nt)(g.value[0])), 1),
                d("span", U4, A(T(Nt)(g.value[1])), 1)
              ])
            ]),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: P[1] || (P[1] = (B) => M(1))
            }, [
              z(T(Io), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          d("div", Y4, [
            (m(!0), x(ce, null, pe(g.value, (B) => (m(), x("div", {
              key: `${B.getFullYear()}-${B.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              d("div", q4, [
                (m(), x(ce, null, pe(y, (N) => d("span", { key: N }, A(N), 1)), 64))
              ]),
              d("div", X4, [
                (m(!0), x(ce, null, pe(T(Hr)(B), (N) => (m(), x("button", {
                  key: T(nt)(N),
                  type: "button",
                  disabled: w(N),
                  class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(B, N)]),
                  onClick: (j) => S(N)
                }, A(N.getDate()), 11, G4))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, V4), [
        [Ht, l.value]
      ])
    ], 512));
  }
}), nS = ["aria-expanded", "aria-labelledby", "aria-label"], oS = ["aria-label", "onKeydown"], sS = { class: "flex flex-col sm:flex-row" }, iS = ["aria-label"], rS = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, lS = { class: "flex flex-col gap-0.5" }, cS = ["onClick"], dS = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, uS = { class: "mb-4 flex items-center justify-between gap-2" }, hS = ["aria-label"], fS = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, gS = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, mS = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, pS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, bS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, vS = ["aria-label"], yS = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, xS = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, kS = { class: "grid grid-cols-7 gap-y-2 mt-2" }, _S = ["disabled", "onClick"], wS = "rounded-lg text-[#61616b]", CS = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", $S = "opacity-30", SS = "bg-[#6b35e9] font-medium text-white", MS = "bg-[#895af6] font-semibold text-white", DS = /* @__PURE__ */ de({
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
    const a = e, n = t, s = `${`kiut-dpp-${We()}`}-lbl`, i = se(null), r = se(null), l = se(!1), c = se(null), u = se(kt(/* @__PURE__ */ new Date())), h = C(() => !!(a.modelValue.start && a.modelValue.end)), g = C(() => {
      const ae = kt(u.value);
      return [ae, Ma(ae, 1)];
    }), b = C(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), f = C(() => a.ariaLabel ?? b.value), p = C(() => Or(a.locale)), y = C(() => yC(a.locale)), v = C(() => bC(a.locale)), k = C(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), w = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), _ = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => a.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = C(() => {
      const ae = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${ae}` : `left-0 right-auto ${ae}`;
    }), M = C(
      () => `${Nt(g.value[0], a.locale)} – ${Nt(g.value[1], a.locale)}`
    ), I = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return b.value;
      const ae = at(a.modelValue.start), L = at(a.modelValue.end);
      return `${Bn(ae, a.locale)} – ${Bn(L, a.locale)}`;
    });
    function V(ae, L) {
      return ae.getMonth() === L.getMonth() && ae.getFullYear() === L.getFullYear();
    }
    function W(ae) {
      const L = Ve(ae);
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
    function D(ae, L, Y) {
      const q = mt(ae, L), G = mt(ae, Y);
      if (q && G) return "rounded-lg";
      const ue = q || ae.getDay() === 0, me = G || ae.getDay() === 6;
      return ue && me ? "rounded-lg" : ue ? "rounded-l-lg" : me ? "rounded-r-lg" : "rounded-none";
    }
    function P(ae) {
      const L = _C(
        a.modelValue,
        ae,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), Y = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return L ? `${Y} font-medium` : Y;
    }
    function B(ae, L) {
      const Y = V(L, ae), q = W(L), G = a.modelValue.start ? Ve(at(a.modelValue.start)) : null, ue = a.modelValue.end ? Ve(at(a.modelValue.end)) : null, me = Ve(L);
      if (q)
        return wS;
      let ne = CS;
      if (G && ue && Nr(me, G) && jr(me, ue)) {
        const K = mt(me, G), ie = mt(me, ue);
        ne = `${D(me, G, ue)} ${K || ie ? MS : SS}`;
      }
      return Y || (ne = `${ne} ${$S}`), ne;
    }
    function N(ae) {
      const L = zr(Vr(ae), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: nt(L.start),
        end: nt(L.end)
      }), u.value = kt(L.start), c.value = null, l.value = !1;
    }
    function j(ae) {
      if (W(ae)) return;
      const L = Ve(ae);
      if (!c.value) {
        c.value = new Date(L), n("update:modelValue", { start: nt(L), end: nt(L) });
        return;
      }
      let q = Ve(c.value), G = new Date(L);
      jt(G, q) && ([q, G] = [G, q]), n("update:modelValue", { start: nt(q), end: nt(G) }), c.value = null, l.value = !1;
    }
    function Q(ae) {
      u.value = Ma(u.value, ae);
    }
    function X() {
      l.value = !1;
    }
    function re(ae) {
      if (ae.stopPropagation(), l.value) {
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
    function H(ae) {
      if (!l.value) return;
      const L = i.value;
      L && !L.contains(ae.target) && (l.value = !1);
    }
    return Te(l, (ae) => {
      ae && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", H);
    }), it(() => {
      document.removeEventListener("click", H);
    }), (ae, L) => (m(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), x("label", {
        key: 0,
        id: s,
        class: Z(T(lt))
      }, A(e.label), 3)) : E("", !0),
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
        "aria-label": e.label ? void 0 : f.value,
        onClick: re
      }, [
        z(T(Ro), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(I.value), 3)
      ], 10, nS),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: Z([
          S.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Pe(X, ["stop"]), ["escape"])
      }, [
        d("div", sS, [
          d("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": k.value
          }, [
            d("p", rS, A(y.value), 1),
            d("ul", lS, [
              (m(!0), x(ce, null, pe(p.value, (Y) => (m(), x("li", {
                key: Y.id
              }, [
                d("button", {
                  type: "button",
                  class: Z(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", P(Y.id)]),
                  onClick: (q) => N(Y.id)
                }, A(Y.label), 11, cS)
              ]))), 128))
            ])
          ], 8, iS),
          d("div", dS, [
            d("div", uS, [
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: L[0] || (L[0] = (Y) => Q(-1))
              }, [
                z(T(Po), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, hS),
              d("div", fS, [
                d("span", gS, A(M.value), 1),
                d("div", mS, [
                  d("span", pS, A(T(Nt)(g.value[0], e.locale)), 1),
                  d("span", bS, A(T(Nt)(g.value[1], e.locale)), 1)
                ])
              ]),
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: L[1] || (L[1] = (Y) => Q(1))
              }, [
                z(T(Io), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, vS)
            ]),
            d("div", yS, [
              (m(!0), x(ce, null, pe(g.value, (Y) => (m(), x("div", {
                key: `${Y.getFullYear()}-${Y.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                d("div", xS, [
                  (m(!0), x(ce, null, pe(v.value, (q) => (m(), x("span", { key: q }, A(q), 1))), 128))
                ]),
                d("div", kS, [
                  (m(!0), x(ce, null, pe(T(Hr)(Y), (q) => (m(), x("button", {
                    key: T(nt)(q),
                    type: "button",
                    disabled: W(q),
                    class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", B(Y, q)]),
                    onClick: (G) => j(q)
                  }, A(q.getDate()), 11, _S))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, oS), [
        [Ht, l.value]
      ])
    ], 512));
  }
}), AS = { class: "kiut-translation-count-badge__content" }, TS = { class: "kiut-translation-count-badge__title" }, BS = { class: "kiut-translation-count-badge__pills" }, LS = {
  key: 0,
  class: "kiut-translation-count-badge__pill-note"
}, xn = 8, xa = 12, RS = /* @__PURE__ */ de({
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
    const t = e, a = se(!1), n = se("top"), o = se({
      top: "0px",
      left: "0px"
    }), s = se(null), i = se(null), r = C(() => {
      const b = "whitespace-nowrap rounded-md px-2 py-0.5 text-xs cursor-default font-['Inter',system-ui,sans-serif]";
      return t.variant === "configured" ? `${b} border border-purple-300 text-purple-700 dark:border-purple-700/50 dark:text-purple-400` : t.variant === "autoconfigured" ? `${b} border border-dashed border-green-400 text-green-600 dark:border-green-600 dark:text-green-400` : `${b} border border-gray-500/40 text-gray-500 dark:border-gray-600 dark:text-gray-400`;
    }), l = C(
      () => `kiut-translation-count-badge__pill kiut-translation-count-badge__pill--${t.variant}`
    );
    function c() {
      a.value = !1;
    }
    function u() {
      const b = s.value, f = i.value;
      if (!b || !f) return;
      const p = b.getBoundingClientRect(), y = f.getBoundingClientRect(), v = p.top - xa, k = window.innerHeight - p.bottom - xa, w = v >= y.height + xn, _ = k >= y.height + xn;
      let $ = "top";
      w ? $ = "top" : _ ? $ = "bottom" : $ = k >= v ? "bottom" : "top", n.value = $;
      let S = $ === "top" ? p.top - y.height - xn : p.bottom + xn;
      S = Math.max(
        xa,
        Math.min(S, window.innerHeight - y.height - xa)
      );
      let M = p.left + p.width / 2 - y.width / 2;
      M = Math.max(
        xa,
        Math.min(M, window.innerWidth - y.width - xa)
      ), o.value = {
        top: `${S}px`,
        left: `${M}px`
      };
    }
    async function h() {
      if (!t.items.length) return;
      a.value = !0, await Ke();
      const b = i.value;
      b && (b.style.visibility = "hidden", u(), b.style.visibility = "visible");
    }
    function g() {
      a.value && c();
    }
    return window.addEventListener("scroll", g, !0), window.addEventListener("resize", g), it(() => {
      window.removeEventListener("scroll", g, !0), window.removeEventListener("resize", g);
    }), (b, f) => (m(), x(ce, null, [
      d("span", {
        ref_key: "triggerRef",
        ref: s,
        class: Z([r.value, e.pulse && "animate-pulse"]),
        onMouseenter: h,
        onMouseleave: c,
        onFocus: h,
        onBlur: c
      }, A(e.label), 35),
      (m(), oe(Qt, { to: "body" }, [
        a.value && e.items.length ? (m(), x("div", {
          key: 0,
          ref_key: "tooltipRef",
          ref: i,
          role: "tooltip",
          class: Z(["kiut-translation-count-badge__tooltip", `kiut-translation-count-badge__tooltip--${n.value}`]),
          style: we({
            position: "fixed",
            top: o.value.top,
            left: o.value.left,
            zIndex: 1100
          }),
          onMouseenter: h,
          onMouseleave: c
        }, [
          d("div", AS, [
            d("span", TS, A(e.tooltipTitle), 1),
            d("div", BS, [
              (m(!0), x(ce, null, pe(e.items, (p) => (m(), x("span", {
                key: p.id,
                class: Z(l.value)
              }, [
                Ae(A(p.label) + " ", 1),
                p.note ? (m(), x("span", LS, " (" + A(p.note) + ") ", 1)) : E("", !0)
              ], 2))), 128))
            ])
          ])
        ], 38)) : E("", !0)
      ]))
    ], 64));
  }
}), PS = ["disabled", "aria-expanded", "aria-label"], IS = { class: "min-w-0 flex-1 truncate" }, ES = ["aria-selected", "onClick", "onMouseenter"], FS = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, OS = { class: "min-w-0 flex-1" }, VS = /* @__PURE__ */ de({
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
    const a = e, n = t, s = `${`kiut-tag-select-${We()}`}-listbox`, i = se(null), r = se(null), l = se(null), c = se(null), u = se(!1), h = se(0), g = se({}), b = C(() => a.options.filter((Q) => !Q.disabled)), f = C(
      () => a.options.find((Q) => Q.value === a.modelValue) ?? null
    ), p = C(() => f.value?.color ?? "neutral"), y = C(
      () => _r(p.value, a.outlined)
    ), v = C(() => f.value ? f.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : b.value[0]?.label ?? "Seleccionar…"), k = C(
      () => a.ariaLabel ?? `Estado: ${v.value}`
    );
    function w() {
      const Q = r.value;
      if (!Q) return;
      const X = Q.getBoundingClientRect();
      g.value = {
        top: `${X.bottom + 4}px`,
        left: `${X.left}px`,
        minWidth: `${X.width}px`
      };
    }
    function _(Q) {
      return `${String(Q.value)}-${Q.label}`;
    }
    function $(Q) {
      return a.modelValue === Q.value;
    }
    function S(Q, X) {
      const re = $(Q), H = h.value === X;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        re ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !re && H ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M() {
      h.value = Math.max(
        0,
        b.value.findIndex((Q) => Q.value === a.modelValue)
      );
    }
    function I() {
      w(), M(), Ke(() => c.value?.focus());
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
        u.value = !0, I();
      }
    }
    function P(Q) {
      Q.stopPropagation(), !a.disabled && D();
    }
    function B(Q) {
      if (!u.value) return;
      const X = Q.target, re = i.value, H = l.value;
      re && !re.contains(X) && (!H || !H.contains(X)) && V();
    }
    function N(Q) {
      a.disabled || (Q.key === "ArrowDown" || Q.key === "Enter" || Q.key === " ") && (Q.preventDefault(), u.value || (u.value = !0, I()));
    }
    function j(Q) {
      const X = b.value;
      if (Q.key === "Escape") {
        Q.preventDefault(), V(), r.value?.focus();
        return;
      }
      if (X.length !== 0) {
        if (Q.key === "ArrowDown") {
          Q.preventDefault(), h.value = Math.min(h.value + 1, X.length - 1);
          return;
        }
        if (Q.key === "ArrowUp") {
          Q.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (Q.key === "Enter") {
          Q.preventDefault();
          const re = X[h.value];
          re && W(re);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", B);
    }), it(() => {
      document.removeEventListener("click", B);
    }), (Q, X) => (m(), x("div", {
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
          y.value,
          u.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": k.value,
        onClick: P,
        onKeydown: N
      }, [
        d("span", IS, A(v.value), 1),
        z(T(ta), {
          class: Z(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, PS),
      (m(), oe(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: l,
          style: we(g.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          d("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: Pe(j, ["stop"])
          }, [
            (m(!0), x(ce, null, pe(b.value, (re, H) => (m(), x("li", {
              key: _(re),
              role: "option",
              "aria-selected": $(re),
              class: Z(S(re, H)),
              onClick: Pe((ae) => W(re), ["stop"]),
              onMouseenter: (ae) => h.value = H
            }, [
              d("span", FS, [
                $(re) ? (m(), oe(T(Fo), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : E("", !0)
              ]),
              d("span", OS, A(re.label), 1)
            ], 42, ES))), 128))
          ], 544)
        ], 4), [
          [Ht, u.value]
        ])
      ]))
    ], 512));
  }
}), zS = ["aria-label"], NS = { class: "flex flex-col gap-1" }, jS = { class: "flex flex-row gap-3 items-center" }, HS = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, WS = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, KS = /* @__PURE__ */ de({
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
      warning: Iw,
      info: Ew,
      success: Pw,
      feature: Ow,
      danger: Vw
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
    return (r, l) => (m(), x("div", {
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
            (m(), oe(ht(i.value)))
          ])
        ], 2)
      ], 2),
      d("div", NS, [
        d("h1", {
          class: Z([s.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        d("span", {
          class: Z([s.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        d("div", jS, [
          a.date_start ? (m(), x("div", HS, [
            d("span", {
              class: Z([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(r.$slots, "icon_date", {}, () => [
                z(T(bi))
              ])
            ], 2),
            a.subtitle_date_start ? (m(), x("span", {
              key: 0,
              class: Z([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : E("", !0),
            d("span", {
              class: Z([s.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : E("", !0),
          a.date_final ? (m(), x("div", WS, [
            d("span", {
              class: Z([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(r.$slots, "icon_date", {}, () => [
                z(T(bi))
              ])
            ], 2),
            a.subtitle_date_final ? (m(), x("span", {
              key: 0,
              class: Z([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : E("", !0),
            d("span", {
              class: Z([s.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : E("", !0)
        ])
      ])
    ], 10, zS));
  }
}), US = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, YS = ["id"], qS = { class: "min-w-0 flex-1 space-y-1" }, XS = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, GS = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, ZS = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, QS = /* @__PURE__ */ de({
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
    const a = e, n = C(() => ({ maxWidth: `${a.width}px` })), o = t, i = `${`kiut-modal-${We()}`}-title`, r = se(null);
    function l() {
      a.loading || (o("cancel"), o("update:modelValue", !1));
    }
    function c() {
      o("confirm");
    }
    function u(h) {
      if (a.modelValue && h.key === "Escape") {
        if (a.loading) return;
        h.preventDefault(), l();
      }
    }
    return Te(
      () => a.modelValue,
      (h) => {
        h && requestAnimationFrame(() => {
          r.value?.focus({ preventScroll: !0 });
        });
      }
    ), Je(() => {
      document.addEventListener("keydown", u);
    }), it(() => {
      document.removeEventListener("keydown", u);
    }), (h, g) => (m(), oe(Qt, { to: "body" }, [
      z(pt, { name: "kiut-modal" }, {
        default: F(() => [
          e.modelValue ? (m(), x("div", US, [
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
              onClick: g[0] || (g[0] = Pe(() => {
              }, ["stop"]))
            }, [
              d("header", {
                class: Z(["flex shrink-0 justify-between gap-4 bg-slate-50/50 px-6 py-5 dark:bg-white/[0.02]", [
                  e.subtitle ? "items-start" : "items-center",
                  e.headerBorder ? "border-b border-slate-100 dark:border-[color:var(--kiut-border-light)]" : ""
                ]])
              }, [
                d("div", qS, [
                  d("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (m(), x("p", XS, A(e.subtitle), 1)) : E("", !0)
                ]),
                z($t, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: l
                }, {
                  icon: F(() => [
                    z(T(lo), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              d("div", GS, [
                ke(h.$slots, "default", {}, void 0, !0)
              ]),
              d("footer", ZS, [
                z($t, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: l
                }, {
                  default: F(() => [
                    Ae(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                z($t, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: F(() => [
                    Ae(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ], 12, YS)
          ])) : E("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), JS = /* @__PURE__ */ ve(QS, [["__scopeId", "data-v-ae2266d6"]]), eM = { class: "text-left font-['Inter',system-ui,sans-serif]" }, tM = {
  key: 0,
  class: ""
}, aM = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, nM = { class: "flex min-w-0 flex-1 items-center" }, oM = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, sM = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, iM = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, rM = /* @__PURE__ */ de({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = uo(), a = C(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (m(), x("section", eM, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (m(), x("header", tM, [
        n.$slots.description ? (m(), x("div", aM, [
          ke(n.$slots, "description")
        ])) : E("", !0),
        n.$slots.tabs ? (m(), x("div", {
          key: 1,
          class: Z(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          d("div", nM, [
            ke(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (m(), x("div", oM, [
            ke(n.$slots, "actions")
          ])) : E("", !0)
        ], 2)) : E("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (m(), x("div", {
          key: 2,
          class: Z([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (m(), x("div", sM, [
            ke(n.$slots, "filters")
          ])) : E("", !0),
          n.$slots.actions ? (m(), x("div", iM, [
            ke(n.$slots, "actions")
          ])) : E("", !0)
        ], 2)) : E("", !0)
      ])) : E("", !0),
      n.$slots.content || n.$slots.default ? (m(), x("div", {
        key: 1,
        class: Z({
          "mt-6": n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions
        })
      }, [
        ke(n.$slots, "content", {}, () => [
          ke(n.$slots, "default")
        ])
      ], 2)) : E("", !0)
    ]));
  }
}), lM = { class: "flex flex-1 min-h-0" }, cM = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, dM = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, uM = ["aria-current", "data-has-active", "title", "onClick"], hM = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, fM = { class: "px-4 py-4 shrink-0" }, gM = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, mM = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, pM = ["data-nav-id", "aria-current", "onClick"], bM = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, vM = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, yM = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, xM = ["data-nav-id", "aria-current", "onClick"], kM = { class: "truncate text-[15px]" }, _M = ["aria-current", "data-has-active", "onClick"], wM = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, CM = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, $M = /* @__PURE__ */ de({
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
    const a = se(!1), n = e, o = t, s = Ja(), { class: i, ...r } = s, l = se(!1);
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
    function h(v) {
      return n.activePath ? n.activePath === v.path || n.activePath.startsWith(v.path + "/") : !1;
    }
    function g(v) {
      return v.items?.length ? v.items.some(h) : !n.activePath || !v.path ? !1 : n.activePath === v.path || n.activePath.startsWith(v.path + "/");
    }
    function b(v) {
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
    function f(v, k) {
      o("navigate", { section: v, item: k });
    }
    function p() {
      o("update:selectedSectionId", null);
    }
    function y(v, k) {
      f(v, k), p();
    }
    return (v, k) => l.value ? (m(), x("div", yt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      z(pt, { name: "ksn-overlay" }, {
        default: F(() => [
          u.value ? (m(), x("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: p
          })) : E("", !0)
        ]),
        _: 1
      }),
      z(pt, { name: "ksn-sheet" }, {
        default: F(() => [
          u.value ? (m(), x("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: we({ paddingBottom: n.mobileBarHeight })
          }, [
            k[3] || (k[3] = d("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              d("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            d("div", bM, [
              d("p", vM, A(u.value.label), 1),
              d("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: p
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
            d("nav", yM, [
              (m(!0), x(ce, null, pe(u.value.items, (w) => (m(), x("button", {
                key: w.id,
                type: "button",
                "data-nav-id": w.id,
                "aria-current": h(w) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (_) => y(u.value, w)
              }, [
                w.icon ? (m(), oe(ht(w.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : E("", !0),
                d("span", kM, A(w.label), 1)
              ], 8, xM))), 128))
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
        (m(!0), x(ce, null, pe(e.sections, (w) => (m(), x("button", {
          key: w.id,
          type: "button",
          "aria-current": e.selectedSectionId === w.id ? "true" : void 0,
          "data-has-active": g(w) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (_) => b(w)
        }, [
          e.selectedSectionId === w.id || g(w) ? (m(), x("span", wM)) : E("", !0),
          w.icon ? (m(), oe(ht(w.icon), {
            key: 1,
            class: "shrink-0",
            style: we({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : E("", !0),
          d("span", CM, A(w.label), 1)
        ], 8, _M))), 128))
      ], 4)
    ], 16)) : (m(), x("aside", yt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      d("div", lM, [
        d("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: we({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: k[0] || (k[0] = (w) => a.value = !0),
          onMouseleave: k[1] || (k[1] = (w) => a.value = !1)
        }, [
          v.$slots.logo ? (m(), x("div", cM, [
            ke(v.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : E("", !0),
          d("nav", dM, [
            (m(!0), x(ce, null, pe(e.sections, (w) => (m(), x("button", {
              key: w.id,
              type: "button",
              "aria-current": e.selectedSectionId === w.id ? "true" : void 0,
              "data-has-active": g(w) ? "true" : void 0,
              title: w.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (_) => b(w)
            }, [
              w.icon ? (m(), oe(ht(w.icon), {
                key: 0,
                class: "shrink-0",
                style: we({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : E("", !0),
              d("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: we({ fontSize: e.primaryFontSize })
              }, A(w.label), 5)
            ], 8, uM))), 128))
          ]),
          v.$slots.footer ? (m(), x("div", hM, [
            ke(v.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : E("", !0)
        ], 36),
        z(pt, { name: "ksn-sub" }, {
          default: F(() => [
            u.value ? (m(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: we({ width: e.secondaryWidth })
            }, [
              d("div", fM, [
                d("p", gM, A(u.value.label), 1)
              ]),
              d("nav", mM, [
                (m(!0), x(ce, null, pe(u.value.items, (w) => (m(), x("button", {
                  key: w.id,
                  type: "button",
                  "data-nav-id": w.id,
                  "aria-current": h(w) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (_) => f(u.value, w)
                }, [
                  w.icon ? (m(), oe(ht(w.icon), {
                    key: 0,
                    style: we({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : E("", !0),
                  d("span", {
                    class: "truncate",
                    style: we({ fontSize: e.secondaryFontSize })
                  }, A(w.label), 5)
                ], 8, pM))), 128))
              ])
            ], 4)) : E("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), SM = /* @__PURE__ */ ve($M, [["__scopeId", "data-v-e0ccb96c"]]), FM = {
  install(e) {
    e.component("KiutChartBar", Mt), e.component("KiutChartLine", bt), e.component("KiutPieChart", En), e.component("KiutBoxplotChart", Nf), e.component("KiutCandlestickChart", Dg), e.component("KiutHistogramChart", vr), e.component("KiutSankeyChart", aa), e.component("KiutAgentsPerDay", $p), e.component("KiutBookingManager", o0), e.component("KiutCheckin", y0), e.component("KiutCheckinContainer", q0), e.component("KiutCheckinMetrics", wr), e.component("KiutCheckinSegments", Cr), e.component("KiutDisruption", hb), e.component("KiutFAQ", xb), e.component("KiutMessagesPerAgent", $r), e.component("KiutRecordLocator", uv), e.component("KiutSalesByChannel", Sr), e.component("KiutSeller", Mr), e.component("KiutSellerContainer", Xv), e.component("KiutTopAgents", ay), e.component("KiutPaymentMethod", wy), e.component("KiutAgentHumanConversations", e1), e.component("KiutChannelMetrics", Dr), e.component("KiutConversationVolume", f1), e.component("KiutTriageCombinations", M1), e.component("KiutSelectLanguage", R1), e.component("KiutGuardrails", H1), e.component("KiutDisruptionNotifier", cx), e.component("KiutTotalConversationsCard", dx), e.component("KiutCsatP95Card", ux), e.component("KiutCsatPulseCard", hx), e.component("KiutCSATContainer", zx), e.component("KiutAiGeneratedRevenueCard", Nx), e.component("KiutAiGeneratedChart", Gx), e.component("KiutCostCard", Qx), e.component("KiutHumanEscalations", ik), e.component("KiutHumanEscalationsCard", rk), e.component("KiutAvgResolutionTime", yk), e.component("KiutAvgResolutionTimeCard", $k), e.component("KiutCheckinCR", Sk), e.component("KiutSellerCR", Mk), e.component("KiutBookingManagerCR", Dk), e.component("KiutNpsDailyMetrics", Tr), e.component("KiutNpsMetrics", Br), e.component("KiutNpsOverviewMetrics", Ar), e.component("KiutAWSCost", Ek), e.component("KiutCostUsage", Uk), e.component("KiutTokenUsage", a_), e.component("KiutConversationCount", h_), e.component("KiutTopAgentsAnalysis", C_), e.component("KiutTopAgentsPie", R_), e.component("KiutDailyCostTrends", j_), e.component("KiutModelUsage", a2), e.component("KiutMessageRoles", u2), e.component("KiutCostPerConversations", w2), e.component("Tabs", Lr), e.component("Table", z2), e.component("TableVersions", Rw), e.component("Filters", b5), e.component("InputText", Fr), e.component("InputPassword", B5), e.component("InputTextarea", E5), e.component("InputFile", aC), e.component("ImageUploadCircle", cC), e.component("InputDateTime", WC), e.component("InputTime", QC), e.component("InputRange", h$), e.component("InputNumber", b$), e.component("InputColorPicker", S$), e.component("EmojiPicker", W$), e.component("Select", na), e.component("LanguageSelect", K$), e.component("LanguagePicker", t4), e.component("MultiSelect", v4), e.component("Toggle", Er), e.component("InputPhone", S4), e.component("SelectablePills", R4), e.component("SegmentedControl", F4), e.component("DateRangePicker", aS), e.component("DatePickerPresets", DS), e.component("Tag", Ge), e.component("TagSelect", VS), e.component("TranslationCountBadge", RS), e.component("Button", $t), e.component("Banner", KS), e.component("Modal", JS), e.component("Section", rM), e.component("KiutAppShellNavigation", SM);
  }
};
export {
  Ek as AWSCost,
  e1 as AgentHumanConversations,
  $p as AgentsPerDay,
  Gx as AiGeneratedChart,
  Nx as AiGeneratedRevenueCard,
  SM as AppShellNavigation,
  yk as AvgResolutionTime,
  $k as AvgResolutionTimeCard,
  KS as Banner,
  o0 as BookingManager,
  Dk as BookingManagerCR,
  Nf as BoxplotChart,
  $t as Button,
  zx as CSATContainer,
  Dg as CandlestickChart,
  Dr as ChannelMetrics,
  Mt as ChartBar,
  bt as ChartLine,
  y0 as Checkin,
  Sk as CheckinCR,
  q0 as CheckinContainer,
  wr as CheckinMetrics,
  Cr as CheckinSegments,
  h_ as ConversationCount,
  f1 as ConversationVolume,
  Qx as CostCard,
  w2 as CostPerConversations,
  Uk as CostUsage,
  ux as CsatP95Card,
  hx as CsatPulseCard,
  Wr as DEFAULT_CATEGORY_LABELS,
  Kr as DEFAULT_EMOJI_CATALOG,
  hw as DEFAULT_TABLE_VERSIONS_LABELS,
  j_ as DailyCostTrends,
  DS as DatePickerPresets,
  aS as DateRangePicker,
  hb as Disruption,
  cx as DisruptionNotifier,
  fw as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  W$ as EmojiPicker,
  xb as FAQ,
  b5 as Filters,
  H1 as Guardrails,
  vr as HistogramChart,
  ik as HumanEscalations,
  rk as HumanEscalationsCard,
  cC as ImageUploadCircle,
  S$ as InputColorPicker,
  WC as InputDateTime,
  aC as InputFile,
  b$ as InputNumber,
  B5 as InputPassword,
  S4 as InputPhone,
  h$ as InputRange,
  Fr as InputText,
  E5 as InputTextarea,
  QC as InputTime,
  FM as KiutUIPlugin,
  t4 as LanguagePicker,
  K$ as LanguageSelect,
  u2 as MessageRoles,
  $r as MessagesPerAgent,
  JS as Modal,
  a2 as ModelUsage,
  v4 as MultiSelect,
  Tr as NpsDailyMetrics,
  Br as NpsMetrics,
  Ar as NpsOverviewMetrics,
  wy as PaymentMethod,
  En as PieChart,
  IM as RESOURCE_TABLE_VERSIONS_COLUMNS,
  uv as RecordLocator,
  Sr as SalesByChannel,
  aa as SankeyChart,
  rM as Section,
  F4 as SegmentedControl,
  na as Select,
  R1 as SelectLanguage,
  R4 as SelectablePills,
  Mr as Seller,
  Mk as SellerCR,
  Xv as SellerContainer,
  z2 as Table,
  Rw as TableVersions,
  Lr as Tabs,
  Ge as Tag,
  VS as TagSelect,
  Er as Toggle,
  a_ as TokenUsage,
  ay as TopAgents,
  C_ as TopAgentsAnalysis,
  R_ as TopAgentsPie,
  dx as TotalConversationsCard,
  RS as TranslationCountBadge,
  M1 as TriageCombinations,
  T$ as appendEmojiToDraft,
  EM as buildDefaultCategories,
  A$ as extractEmojis,
  D$ as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
