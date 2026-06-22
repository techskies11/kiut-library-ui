import { defineComponent as le, shallowRef as ni, h as Ka, ref as oe, onMounted as tt, onUnmounted as pt, watch as Oe, toRaw as Ya, nextTick as We, version as wl, isProxy as ai, computed as C, toRef as $e, openBlock as p, createElementBlock as k, createVNode as E, unref as T, createElementVNode as u, Fragment as se, renderList as he, normalizeStyle as Me, normalizeClass as J, toDisplayString as D, createCommentVNode as z, onBeforeUnmount as si, createStaticVNode as Cs, useSlots as es, Transition as Te, withCtx as B, renderSlot as Ce, Comment as Cl, createBlock as ee, resolveDynamicComponent as Ft, createTextVNode as Be, Teleport as En, withDirectives as lt, withModifiers as qe, vModelText as sn, vShow as bn, createSlots as $s, vModelSelect as $l, mergeProps as Ct, withKeys as Fn, useAttrs as ka, inject as oi } from "vue";
import * as Ss from "echarts/core";
import { TooltipComponent as Sl, TitleComponent as Ml } from "echarts/components";
import { SankeyChart as Dl } from "echarts/charts";
import { CanvasRenderer as Tl } from "echarts/renderers";
import je from "moment";
function Un(e) {
  return e + 0.5 | 0;
}
const Ot = (e, t, n) => Math.max(Math.min(e, n), t);
function Tn(e) {
  return Ot(Un(e * 2.55), 0, 255);
}
function jt(e) {
  return Ot(Un(e * 255), 0, 255);
}
function Bt(e) {
  return Ot(Un(e / 2.55) / 100, 0, 1);
}
function Ms(e) {
  return Ot(Un(e * 100), 0, 100);
}
const ut = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ua = [..."0123456789ABCDEF"], Al = (e) => Ua[e & 15], Bl = (e) => Ua[(e & 240) >> 4] + Ua[e & 15], Xn = (e) => (e & 240) >> 4 === (e & 15), Ll = (e) => Xn(e.r) && Xn(e.g) && Xn(e.b) && Xn(e.a);
function Pl(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & ut[e[1]] * 17,
    g: 255 & ut[e[2]] * 17,
    b: 255 & ut[e[3]] * 17,
    a: t === 5 ? ut[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: ut[e[1]] << 4 | ut[e[2]],
    g: ut[e[3]] << 4 | ut[e[4]],
    b: ut[e[5]] << 4 | ut[e[6]],
    a: t === 9 ? ut[e[7]] << 4 | ut[e[8]] : 255
  })), n;
}
const Il = (e, t) => e < 255 ? t(e) : "";
function Rl(e) {
  var t = Ll(e) ? Al : Bl;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Il(e.a, t) : void 0;
}
const El = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function ii(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function Fl(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function Ol(e, t, n) {
  const a = ii(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function Vl(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function ts(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let r, c, d;
  return o !== i && (d = o - i, c = l > 0.5 ? d / (2 - o - i) : d / (o + i), r = Vl(n, a, s, d, o), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function ns(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(jt);
}
function as(e, t, n) {
  return ns(ii, e, t, n);
}
function zl(e, t, n) {
  return ns(Ol, e, t, n);
}
function Nl(e, t, n) {
  return ns(Fl, e, t, n);
}
function li(e) {
  return (e % 360 + 360) % 360;
}
function Hl(e) {
  const t = El.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? Tn(+t[5]) : jt(+t[5]));
  const s = li(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = zl(s, o, i) : t[1] === "hsv" ? a = Nl(s, o, i) : a = as(s, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function Wl(e, t) {
  var n = ts(e);
  n[0] = li(n[0] + t), n = as(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function jl(e) {
  if (!e)
    return;
  const t = ts(e), n = t[0], a = Ms(t[1]), s = Ms(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${s}%, ${Bt(e.a)})` : `hsl(${n}, ${a}%, ${s}%)`;
}
const Ds = {
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
}, Ts = {
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
function Kl() {
  const e = {}, t = Object.keys(Ts), n = Object.keys(Ds);
  let a, s, o, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], s = 0; s < n.length; s++)
      o = n[s], l = l.replace(o, Ds[o]);
    o = parseInt(Ts[i], 16), e[l] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let Gn;
function Yl(e) {
  Gn || (Gn = Kl(), Gn.transparent = [0, 0, 0, 0]);
  const t = Gn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Ul = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function ql(e) {
  const t = Ul.exec(e);
  let n = 255, a, s, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? Tn(i) : Ot(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? Tn(a) : Ot(a, 0, 255)), s = 255 & (t[4] ? Tn(s) : Ot(s, 0, 255)), o = 255 & (t[6] ? Tn(o) : Ot(o, 0, 255)), {
      r: a,
      g: s,
      b: o,
      a: n
    };
  }
}
function Xl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Bt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Aa = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, hn = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Gl(e, t, n) {
  const a = hn(Bt(e.r)), s = hn(Bt(e.g)), o = hn(Bt(e.b));
  return {
    r: jt(Aa(a + n * (hn(Bt(t.r)) - a))),
    g: jt(Aa(s + n * (hn(Bt(t.g)) - s))),
    b: jt(Aa(o + n * (hn(Bt(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Zn(e, t, n) {
  if (e) {
    let a = ts(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = as(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function ri(e, t) {
  return e && Object.assign(t || {}, e);
}
function As(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = jt(e[3]))) : (t = ri(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = jt(t.a)), t;
}
function Zl(e) {
  return e.charAt(0) === "r" ? ql(e) : Hl(e);
}
class On {
  constructor(t) {
    if (t instanceof On)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = As(t) : n === "string" && (a = Pl(t) || Yl(t) || Zl(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = ri(this._rgb);
    return t && (t.a = Bt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = As(t);
  }
  rgbString() {
    return this._valid ? Xl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Rl(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? jl(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const a = this.rgb, s = t.rgb;
      let o;
      const i = n === o ? 0.5 : n, l = 2 * i - 1, r = a.a - s.a, c = ((l * r === -1 ? l : (l + r) / (1 + l * r)) + 1) / 2;
      o = 1 - c, a.r = 255 & c * a.r + o * s.r + 0.5, a.g = 255 & c * a.g + o * s.g + 0.5, a.b = 255 & c * a.b + o * s.b + 0.5, a.a = i * a.a + (1 - i) * s.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Gl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new On(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = jt(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Un(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = n, this;
  }
  opaquer(t) {
    const n = this._rgb;
    return n.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return Zn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Zn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Zn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Zn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Wl(this._rgb, t), this;
  }
}
function Dt() {
}
const Ql = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Ie(e) {
  return e == null;
}
function Ke(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Ae(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function ft(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function _t(e, t) {
  return ft(e) ? e : t;
}
function _e(e, t) {
  return typeof e > "u" ? t : e;
}
const Jl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, ci = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Fe(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function Re(e, t, n, a) {
  let s, o, i;
  if (Ke(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (Ae(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function fa(e, t) {
  let n, a, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function ga(e) {
  if (Ke(e))
    return e.map(ga);
  if (Ae(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = ga(e[n[s]]);
    return t;
  }
  return e;
}
function di(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function er(e, t, n, a) {
  if (!di(e))
    return;
  const s = t[e], o = n[e];
  Ae(s) && Ae(o) ? Vn(s, o, a) : t[e] = ga(o);
}
function Vn(e, t, n) {
  const a = Ke(t) ? t : [
    t
  ], s = a.length;
  if (!Ae(e))
    return e;
  n = n || {};
  const o = n.merger || er;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !Ae(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, d = r.length; c < d; ++c)
      o(r[c], e, i, n);
  }
  return e;
}
function Ln(e, t) {
  return Vn(e, t, {
    merger: tr
  });
}
function tr(e, t, n) {
  if (!di(e))
    return;
  const a = t[e], s = n[e];
  Ae(a) && Ae(s) ? Ln(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = ga(s));
}
const Bs = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function nr(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const s of t)
    a += s, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function ar(e) {
  const t = nr(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function ln(e, t) {
  return (Bs[t] || (Bs[t] = ar(t)))(e);
}
function ss(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const zn = (e) => typeof e < "u", Yt = (e) => typeof e == "function", Ls = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function sr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Ee = Math.PI, Ne = 2 * Ee, or = Ne + Ee, ma = Number.POSITIVE_INFINITY, ir = Ee / 180, Ye = Ee / 2, Zt = Ee / 4, Ps = Ee * 2 / 3, ui = Math.log10, $t = Math.sign;
function Pn(e, t, n) {
  return Math.abs(e - t) < n;
}
function Is(e) {
  const t = Math.round(e);
  e = Pn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(ui(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function lr(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((s, o) => s - o).pop(), t;
}
function rr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Nn(e) {
  return !rr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function cr(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function dr(e, t, n) {
  let a, s, o;
  for (a = 0, s = e.length; a < s; a++)
    o = e[a][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function Lt(e) {
  return e * (Ee / 180);
}
function ur(e) {
  return e * (180 / Ee);
}
function Rs(e) {
  if (!ft(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function hi(e, t) {
  const n = t.x - e.x, a = t.y - e.y, s = Math.sqrt(n * n + a * a);
  let o = Math.atan2(a, n);
  return o < -0.5 * Ee && (o += Ne), {
    angle: o,
    distance: s
  };
}
function qa(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function hr(e, t) {
  return (e - t + or) % Ne - Ee;
}
function bt(e) {
  return (e % Ne + Ne) % Ne;
}
function Hn(e, t, n, a) {
  const s = bt(e), o = bt(t), i = bt(n), l = bt(o - s), r = bt(i - s), c = bt(s - o), d = bt(s - i);
  return s === o || s === i || a && o === i || l > r && c < d;
}
function Qe(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function fr(e) {
  return Qe(e, -32768, 32767);
}
function Vt(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function os(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, s = 0, o;
  for (; a - s > 1; )
    o = s + a >> 1, n(o) ? s = o : a = o;
  return {
    lo: s,
    hi: a
  };
}
const an = (e, t, n, a) => os(e, n, a ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), gr = (e, t, n) => os(e, n, (a) => e[a][t] >= n);
function mr(e, t, n) {
  let a = 0, s = e.length;
  for (; a < s && e[a] < t; )
    a++;
  for (; s > a && e[s - 1] > n; )
    s--;
  return a > 0 || s < e.length ? e.slice(a, s) : e;
}
const fi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function pr(e, t) {
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
  }), fi.forEach((n) => {
    const a = "_onData" + ss(n), s = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const i = s.apply(this, o);
        return e._chartjs.listeners.forEach((l) => {
          typeof l[a] == "function" && l[a](...o);
        }), i;
      }
    });
  });
}
function Es(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, s = a.indexOf(t);
  s !== -1 && a.splice(s, 1), !(a.length > 0) && (fi.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function gi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const mi = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function pi(e, t) {
  let n = [], a = !1;
  return function(...s) {
    n = s, a || (a = !0, mi.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function br(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const is = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Ge = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, vr = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function yr(e, t, n) {
  const a = t.length;
  let s = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: m, minDefined: v, maxDefined: g } = i.getUserBounds();
    if (v) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        an(r, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : an(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const y = r.slice(0, s + 1).reverse().findIndex((b) => !Ie(b[l.axis]));
        s -= Math.max(0, y);
      }
      s = Qe(s, 0, a - 1);
    }
    if (g) {
      let y = Math.max(
        // @ts-expect-error Need to type _parsed
        an(r, i.axis, m, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : an(t, d, i.getPixelForValue(m), !0).hi + 1
      );
      if (c) {
        const b = r.slice(y - 1).findIndex((f) => !Ie(f[l.axis]));
        y += Math.max(0, b);
      }
      o = Qe(y, s, a) - s;
    } else
      o = a - s;
  }
  return {
    start: s,
    count: o
  };
}
function xr(e) {
  const { xScale: t, yScale: n, _scaleRanges: a } = e, s = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!a)
    return e._scaleRanges = s, !0;
  const o = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== n.min || a.ymax !== n.max;
  return Object.assign(a, s), o;
}
const Qn = (e) => e === 0 || e === 1, Fs = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ne / n)), Os = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ne / n) + 1, In = {
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
  easeInSine: (e) => -Math.cos(e * Ye) + 1,
  easeOutSine: (e) => Math.sin(e * Ye),
  easeInOutSine: (e) => -0.5 * (Math.cos(Ee * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Qn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Qn(e) ? e : Fs(e, 0.075, 0.3),
  easeOutElastic: (e) => Qn(e) ? e : Os(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Qn(e) ? e : e < 0.5 ? 0.5 * Fs(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Os(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - In.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? In.easeInBounce(e * 2) * 0.5 : In.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function ls(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Vs(e) {
  return ls(e) ? e : new On(e);
}
function Ba(e) {
  return ls(e) ? e : new On(e).saturate(0.5).darken(0.1).hexString();
}
const _r = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], kr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function wr(e) {
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
      properties: kr
    },
    numbers: {
      type: "number",
      properties: _r
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
function Cr(e) {
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
const zs = /* @__PURE__ */ new Map();
function $r(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = zs.get(n);
  return a || (a = new Intl.NumberFormat(e, t), zs.set(n, a)), a;
}
function rs(e, t, n) {
  return $r(t, n).format(e);
}
const Sr = {
  values(e) {
    return Ke(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let s, o = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), o = Mr(e, n);
    }
    const i = ui(Math.abs(o)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), rs(e, a, r);
  }
};
function Mr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var bi = {
  formatters: Sr
};
function Dr(e) {
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
      tickWidth: (t, n) => n.lineWidth,
      tickColor: (t, n) => n.color,
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
      callback: bi.formatters.values,
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
const rn = /* @__PURE__ */ Object.create(null), Xa = /* @__PURE__ */ Object.create(null);
function Rn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, s = n.length; a < s; ++a) {
    const o = n[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function La(e, t, n) {
  return typeof t == "string" ? Vn(Rn(e, t), n) : Vn(Rn(e, ""), t);
}
class Tr {
  constructor(t, n) {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, s) => Ba(s.backgroundColor), this.hoverBorderColor = (a, s) => Ba(s.borderColor), this.hoverColor = (a, s) => Ba(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return La(this, t, n);
  }
  get(t) {
    return Rn(this, t);
  }
  describe(t, n) {
    return La(Xa, t, n);
  }
  override(t, n) {
    return La(rn, t, n);
  }
  route(t, n, a, s) {
    const o = Rn(this, t), i = Rn(this, a), l = "_" + n;
    Object.defineProperties(o, {
      [l]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[s];
          return Ae(r) ? Object.assign({}, c, r) : _e(r, c);
        },
        set(r) {
          this[l] = r;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var He = /* @__PURE__ */ new Tr({
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
  wr,
  Cr,
  Dr
]);
function Ar(e) {
  return !e || Ie(e.size) || Ie(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Ns(e, t, n, a, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > a && (a = o), a;
}
function Qt(e, t, n) {
  const a = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * a) / a + s;
}
function Hs(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ga(e, t, n, a) {
  vi(e, t, n, a, null);
}
function vi(e, t, n, a, s) {
  let o, i, l, r, c, d, h, m;
  const v = t.pointStyle, g = t.rotation, y = t.radius;
  let b = (g || 0) * ir;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(b), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(y) || y <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        s ? e.ellipse(n, a, s / 2, y, 0, 0, Ne) : e.arc(n, a, y, 0, Ne), e.closePath();
        break;
      case "triangle":
        d = s ? s / 2 : y, e.moveTo(n + Math.sin(b) * d, a - Math.cos(b) * y), b += Ps, e.lineTo(n + Math.sin(b) * d, a - Math.cos(b) * y), b += Ps, e.lineTo(n + Math.sin(b) * d, a - Math.cos(b) * y), e.closePath();
        break;
      case "rectRounded":
        c = y * 0.516, r = y - c, i = Math.cos(b + Zt) * r, h = Math.cos(b + Zt) * (s ? s / 2 - c : r), l = Math.sin(b + Zt) * r, m = Math.sin(b + Zt) * (s ? s / 2 - c : r), e.arc(n - h, a - l, c, b - Ee, b - Ye), e.arc(n + m, a - i, c, b - Ye, b), e.arc(n + h, a + l, c, b, b + Ye), e.arc(n - m, a + i, c, b + Ye, b + Ee), e.closePath();
        break;
      case "rect":
        if (!g) {
          r = Math.SQRT1_2 * y, d = s ? s / 2 : r, e.rect(n - d, a - r, 2 * d, 2 * r);
          break;
        }
        b += Zt;
      /* falls through */
      case "rectRot":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + m, a - i), e.lineTo(n + h, a + l), e.lineTo(n - m, a + i), e.closePath();
        break;
      case "crossRot":
        b += Zt;
      /* falls through */
      case "cross":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i);
        break;
      case "star":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i), b += Zt, h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i);
        break;
      case "line":
        i = s ? s / 2 : Math.cos(b) * y, l = Math.sin(b) * y, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(b) * (s ? s / 2 : y), a + Math.sin(b) * y);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Wn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function cs(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function ds(e) {
  e.restore();
}
function Br(e, t, n, a, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else s === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function Lr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function Pr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Ie(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Ir(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, r = n - o.actualBoundingBoxAscent, c = n + o.actualBoundingBoxDescent, d = s.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, d), e.lineTo(l, d), e.stroke();
  }
}
function Rr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function jn(e, t, n, a, s, o = {}) {
  const i = Ke(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = s.string, Pr(e, o), r = 0; r < i.length; ++r)
    c = i[r], o.backdrop && Rr(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), Ie(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, n, a, o.maxWidth)), e.fillText(c, n, a, o.maxWidth), Ir(e, n, a, c, o), a += Number(s.lineHeight);
  e.restore();
}
function pa(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Ee, Ee, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, Ee, Ye, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, Ye, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -Ye, !0), e.lineTo(n + i.topLeft, a);
}
const Er = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Fr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Or(e, t) {
  const n = ("" + e).match(Er);
  if (!n || n[1] === "normal")
    return t * 1.2;
  switch (e = +n[2], n[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const Vr = (e) => +e || 0;
function us(e, t) {
  const n = {}, a = Ae(t), s = a ? Object.keys(t) : t, o = Ae(e) ? a ? (i) => _e(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = Vr(o(i));
  return n;
}
function yi(e) {
  return us(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function mn(e) {
  return us(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function gt(e) {
  const t = yi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Je(e, t) {
  e = e || {}, t = t || He.font;
  let n = _e(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = _e(e.style, t.style);
  a && !("" + a).match(Fr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: _e(e.family, t.family),
    lineHeight: Or(_e(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: _e(e.weight, t.weight),
    string: ""
  };
  return s.string = Ar(s), s;
}
function Jn(e, t, n, a) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function zr(e, t, n) {
  const { min: a, max: s } = e, o = ci(t, (s - a) / 2), i = (l, r) => n && l === 0 ? 0 : l + r;
  return {
    min: i(a, -Math.abs(o)),
    max: i(s, o)
  };
}
function cn(e, t) {
  return Object.assign(Object.create(e), t);
}
function hs(e, t = [
  ""
], n, a, s = () => e[0]) {
  const o = n || e;
  typeof a > "u" && (a = wi("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: s,
    override: (l) => hs([
      l,
      ...e
    ], t, o, a)
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
      return _i(l, r, () => qr(r, t, e, l));
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
      return js(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return js(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, r, c) {
      const d = l._storage || (l._storage = s());
      return l[r] = d[r] = c, delete l._keys, !0;
    }
  });
}
function vn(e, t, n, a) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: xi(e, a),
    setContext: (o) => vn(e, o, n, a),
    override: (o) => vn(e.override(o), t, n, a)
  };
  return new Proxy(s, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, i) {
      return delete o[i], delete e[i], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, i, l) {
      return _i(o, i, () => Hr(o, i, l));
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
    set(o, i, l) {
      return e[i] = l, delete o[i], !0;
    }
  });
}
function xi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: a,
    isScriptable: Yt(n) ? n : () => n,
    isIndexable: Yt(a) ? a : () => a
  };
}
const Nr = (e, t) => e ? e + ss(t) : t, fs = (e, t) => Ae(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function _i(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function Hr(e, t, n) {
  const { _proxy: a, _context: s, _subProxy: o, _descriptors: i } = e;
  let l = a[t];
  return Yt(l) && i.isScriptable(t) && (l = Wr(t, l, e, n)), Ke(l) && l.length && (l = jr(t, l, e, i.isIndexable)), fs(t, l) && (l = vn(l, s, o && o[t], i)), l;
}
function Wr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(o, i || a);
  return l.delete(e), fs(e, r) && (r = gs(s._scopes, s, e, r)), r;
}
function jr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: l } = n;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (Ae(t[0])) {
    const r = t, c = s._scopes.filter((d) => d !== r);
    t = [];
    for (const d of r) {
      const h = gs(c, s, e, d);
      t.push(vn(h, o, i && i[e], l));
    }
  }
  return t;
}
function ki(e, t, n) {
  return Yt(e) ? e(t, n) : e;
}
const Kr = (e, t) => e === !0 ? t : typeof e == "string" ? ln(t, e) : void 0;
function Yr(e, t, n, a, s) {
  for (const o of t) {
    const i = Kr(n, o);
    if (i) {
      e.add(i);
      const l = ki(i._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function gs(e, t, n, a) {
  const s = t._rootScopes, o = ki(t._fallback, n, a), i = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let r = Ws(l, i, n, o || n, a);
  return r === null || typeof o < "u" && o !== n && (r = Ws(l, i, o, r, a), r === null) ? !1 : hs(Array.from(l), [
    ""
  ], s, o, () => Ur(t, n, a));
}
function Ws(e, t, n, a, s) {
  for (; n; )
    n = Yr(e, t, n, a, s);
  return n;
}
function Ur(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const s = a[t];
  return Ke(s) && Ae(n) ? n : s || {};
}
function qr(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = wi(Nr(o, e), n), typeof s < "u")
      return fs(e, s) ? gs(n, a, e, s) : s;
}
function wi(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function js(e) {
  let t = e._keys;
  return t || (t = e._keys = Xr(e._scopes)), t;
}
function Xr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Gr = Number.EPSILON || 1e-14, yn = (e, t) => t < e.length && !e[t].skip && e[t], Ci = (e) => e === "x" ? "y" : "x";
function Zr(e, t, n, a) {
  const s = e.skip ? t : e, o = t, i = n.skip ? t : n, l = qa(o, s), r = qa(i, o);
  let c = l / (l + r), d = r / (l + r);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = a * c, m = a * d;
  return {
    previous: {
      x: o.x - h * (i.x - s.x),
      y: o.y - h * (i.y - s.y)
    },
    next: {
      x: o.x + m * (i.x - s.x),
      y: o.y + m * (i.y - s.y)
    }
  };
}
function Qr(e, t, n) {
  const a = e.length;
  let s, o, i, l, r, c = yn(e, 0);
  for (let d = 0; d < a - 1; ++d)
    if (r = c, c = yn(e, d + 1), !(!r || !c)) {
      if (Pn(t[d], 0, Gr)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      s = n[d] / t[d], o = n[d + 1] / t[d], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[d] = s * i * t[d], n[d + 1] = o * i * t[d]);
    }
}
function Jr(e, t, n = "x") {
  const a = Ci(n), s = e.length;
  let o, i, l, r = yn(e, 0);
  for (let c = 0; c < s; ++c) {
    if (i = l, l = r, r = yn(e, c + 1), !l)
      continue;
    const d = l[n], h = l[a];
    i && (o = (d - i[n]) / 3, l[`cp1${n}`] = d - o, l[`cp1${a}`] = h - o * t[c]), r && (o = (r[n] - d) / 3, l[`cp2${n}`] = d + o, l[`cp2${a}`] = h + o * t[c]);
  }
}
function ec(e, t = "x") {
  const n = Ci(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, r, c = yn(e, 0);
  for (i = 0; i < a; ++i)
    if (l = r, r = c, c = yn(e, i + 1), !!r) {
      if (c) {
        const d = c[t] - r[t];
        s[i] = d !== 0 ? (c[n] - r[n]) / d : 0;
      }
      o[i] = l ? c ? $t(s[i - 1]) !== $t(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  Qr(e, s, o), Jr(e, o, t);
}
function ea(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function tc(e, t) {
  let n, a, s, o, i, l = Wn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && Wn(e[n + 1], t), o && (s = e[n], i && (s.cp1x = ea(s.cp1x, t.left, t.right), s.cp1y = ea(s.cp1y, t.top, t.bottom)), l && (s.cp2x = ea(s.cp2x, t.left, t.right), s.cp2y = ea(s.cp2y, t.top, t.bottom)));
}
function nc(e, t, n, a, s) {
  let o, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    ec(e, s);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], r = Zr(c, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && tc(e, n);
}
function ms() {
  return typeof window < "u" && typeof document < "u";
}
function ps(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ba(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const wa = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function ac(e, t) {
  return wa(e).getPropertyValue(t);
}
const sc = [
  "top",
  "right",
  "bottom",
  "left"
];
function on(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = sc[s];
    a[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const oc = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function ic(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: s, offsetY: o } = a;
  let i = !1, l, r;
  if (oc(s, o, e.target))
    l = s, r = o;
  else {
    const c = t.getBoundingClientRect();
    l = a.clientX - c.left, r = a.clientY - c.top, i = !0;
  }
  return {
    x: l,
    y: r,
    box: i
  };
}
function tn(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, s = wa(n), o = s.boxSizing === "border-box", i = on(s, "padding"), l = on(s, "border", "width"), { x: r, y: c, box: d } = ic(e, n), h = i.left + (d && l.left), m = i.top + (d && l.top);
  let { width: v, height: g } = t;
  return o && (v -= i.width + l.width, g -= i.height + l.height), {
    x: Math.round((r - h) / v * n.width / a),
    y: Math.round((c - m) / g * n.height / a)
  };
}
function lc(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && ps(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = wa(o), r = on(l, "border", "width"), c = on(l, "padding");
      t = i.width - c.width - r.width, n = i.height - c.height - r.height, a = ba(l.maxWidth, o, "clientWidth"), s = ba(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || ma,
    maxHeight: s || ma
  };
}
const zt = (e) => Math.round(e * 10) / 10;
function rc(e, t, n, a) {
  const s = wa(e), o = on(s, "margin"), i = ba(s.maxWidth, e, "clientWidth") || ma, l = ba(s.maxHeight, e, "clientHeight") || ma, r = lc(e, t, n);
  let { width: c, height: d } = r;
  if (s.boxSizing === "content-box") {
    const m = on(s, "border", "width"), v = on(s, "padding");
    c -= v.width + m.width, d -= v.height + m.height;
  }
  return c = Math.max(0, c - o.width), d = Math.max(0, a ? c / a : d - o.height), c = zt(Math.min(c, i, r.maxWidth)), d = zt(Math.min(d, l, r.maxHeight)), c && !d && (d = zt(c / 2)), (t !== void 0 || n !== void 0) && a && r.height && d > r.height && (d = r.height, c = zt(Math.floor(d * a))), {
    width: c,
    height: d
  };
}
function Ks(e, t, n) {
  const a = t || 1, s = zt(e.height * a), o = zt(e.width * a);
  e.height = zt(e.height), e.width = zt(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== s || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = s, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const cc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    ms() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Ys(e, t) {
  const n = ac(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function nn(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function dc(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function uc(e, t, n, a) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = nn(e, s, n), l = nn(s, o, n), r = nn(o, t, n), c = nn(i, l, n), d = nn(l, r, n);
  return nn(c, d, n);
}
const hc = function(e, t) {
  return {
    x(n) {
      return e + e + t - n;
    },
    setWidth(n) {
      t = n;
    },
    textAlign(n) {
      return n === "center" ? n : n === "right" ? "left" : "right";
    },
    xPlus(n, a) {
      return n - a;
    },
    leftForLtr(n, a) {
      return n - a;
    }
  };
}, fc = function() {
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
function pn(e, t, n) {
  return e ? hc(t, n) : fc();
}
function $i(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function Si(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Mi(e) {
  return e === "angle" ? {
    between: Hn,
    compare: hr,
    normalize: bt
  } : {
    between: Vt,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Us({ start: e, end: t, count: n, loop: a, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: s
  };
}
function gc(e, t, n) {
  const { property: a, start: s, end: o } = n, { between: i, normalize: l } = Mi(a), r = t.length;
  let { start: c, end: d, loop: h } = e, m, v;
  if (h) {
    for (c += r, d += r, m = 0, v = r; m < v && i(l(t[c % r][a]), s, o); ++m)
      c--, d--;
    c %= r, d %= r;
  }
  return d < c && (d += r), {
    start: c,
    end: d,
    loop: h,
    style: e.style
  };
}
function mc(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: r, normalize: c } = Mi(a), { start: d, end: h, loop: m, style: v } = gc(e, t, n), g = [];
  let y = !1, b = null, f, x, _;
  const w = () => r(s, _, f) && l(s, _) !== 0, $ = () => l(o, f) === 0 || r(o, _, f), M = () => y || w(), S = () => !y || $();
  for (let F = d, N = d; F <= h; ++F)
    x = t[F % i], !x.skip && (f = c(x[a]), f !== _ && (y = r(f, s, o), b === null && M() && (b = l(f, s) === 0 ? F : N), b !== null && S() && (g.push(Us({
      start: b,
      end: F,
      loop: m,
      count: i,
      style: v
    })), b = null), N = F, _ = f));
  return b !== null && g.push(Us({
    start: b,
    end: h,
    loop: m,
    count: i,
    style: v
  })), g;
}
function pc(e, t) {
  const n = [], a = e.segments;
  for (let s = 0; s < a.length; s++) {
    const o = mc(a[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function bc(e, t, n, a) {
  let s = 0, o = t - 1;
  if (n && !a)
    for (; s < t && !e[s].skip; )
      s++;
  for (; s < t && e[s].skip; )
    s++;
  for (s %= t, n && (o += s); o > s && e[o % t].skip; )
    o--;
  return o %= t, {
    start: s,
    end: o
  };
}
function vc(e, t, n, a) {
  const s = e.length, o = [];
  let i = t, l = e[t], r;
  for (r = t + 1; r <= n; ++r) {
    const c = e[r % s];
    c.skip || c.stop ? l.skip || (a = !1, o.push({
      start: t % s,
      end: (r - 1) % s,
      loop: a
    }), t = i = c.stop ? r : null) : (i = r, l.skip && (t = r)), l = c;
  }
  return i !== null && o.push({
    start: t % s,
    end: i % s,
    loop: a
  }), o;
}
function yc(e, t) {
  const n = e.points, a = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: l } = bc(n, s, o, a);
  if (a === !0)
    return qs(e, [
      {
        start: i,
        end: l,
        loop: o
      }
    ], n, t);
  const r = l < i ? l + s : l, c = !!e._fullLoop && i === 0 && l === s - 1;
  return qs(e, vc(n, i, r, c), n, t);
}
function qs(e, t, n, a) {
  return !a || !a.setContext || !n ? t : xc(e, t, n, a);
}
function xc(e, t, n, a) {
  const s = e._chart.getContext(), o = Xs(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = n.length, c = [];
  let d = o, h = t[0].start, m = h;
  function v(g, y, b, f) {
    const x = l ? -1 : 1;
    if (g !== y) {
      for (g += r; n[g % r].skip; )
        g -= x;
      for (; n[y % r].skip; )
        y += x;
      g % r !== y % r && (c.push({
        start: g % r,
        end: y % r,
        loop: b,
        style: f
      }), d = f, h = y % r);
    }
  }
  for (const g of t) {
    h = l ? h : g.start;
    let y = n[h % r], b;
    for (m = h + 1; m <= g.end; m++) {
      const f = n[m % r];
      b = Xs(a.setContext(cn(s, {
        type: "segment",
        p0: y,
        p1: f,
        p0DataIndex: (m - 1) % r,
        p1DataIndex: m % r,
        datasetIndex: i
      }))), _c(b, d) && v(h, m - 1, g.loop, d), y = f, d = b;
    }
    h < m - 1 && v(h, m - 1, g.loop, d);
  }
  return c;
}
function Xs(e) {
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
function _c(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(s, o) {
    return ls(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function ta(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function kc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: ta(n, t, "left"),
    right: ta(n, t, "right"),
    top: ta(a, t, "top"),
    bottom: ta(a, t, "bottom")
  } : t;
}
function wc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = kc(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class Cc {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, a, s) {
    const o = n.listeners[s], i = n.duration;
    o.forEach((l) => l({
      chart: t,
      initial: n.initial,
      numSteps: i,
      currentStep: Math.min(a - n.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = mi.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, s) => {
      if (!a.running || !a.items.length)
        return;
      const o = a.items;
      let i = o.length - 1, l = !1, r;
      for (; i >= 0; --i)
        r = o[i], r._active ? (r._total > a.duration && (a.duration = r._total), r.tick(t), l = !0) : (o[i] = o[o.length - 1], o.pop());
      l && (s.draw(), this._notify(s, a, t, "progress")), o.length || (a.running = !1, this._notify(s, a, t, "complete"), a.initial = !1), n += o.length;
    }), this._lastDate = t, n === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const n = this._charts;
    let a = n.get(t);
    return a || (a = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, n.set(t, a)), a;
  }
  listen(t, n, a) {
    this._getAnims(t).listeners[n].push(a);
  }
  add(t, n) {
    !n || !n.length || this._getAnims(t).items.push(...n);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const n = this._charts.get(t);
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((a, s) => Math.max(a, s._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const n = this._charts.get(t);
    return !(!n || !n.running || !n.items.length);
  }
  stop(t) {
    const n = this._charts.get(t);
    if (!n || !n.items.length)
      return;
    const a = n.items;
    let s = a.length - 1;
    for (; s >= 0; --s)
      a[s].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Tt = /* @__PURE__ */ new Cc();
const Gs = "transparent", $c = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = Vs(e || Gs), s = a.valid && Vs(t || Gs);
    return s && s.valid ? s.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class Sc {
  constructor(t, n, a, s) {
    const o = n[a];
    s = Jn([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = Jn([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || $c[t.type || typeof i], this._easing = In[t.easing] || In.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Jn([
        t.to,
        n,
        s,
        t.from
      ]), this._from = Jn([
        t.from,
        s,
        n
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const n = t - this._start, a = this._duration, s = this._prop, o = this._from, i = this._loop, l = this._to;
    let r;
    if (this._active = o !== l && (i || n < a), !this._active) {
      this._target[s] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[s] = o;
      return;
    }
    r = n / a % 2, r = i && r > 1 ? 2 - r : r, r = this._easing(Math.min(1, Math.max(0, r))), this._target[s] = this._fn(o, l, r);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((n, a) => {
      t.push({
        res: n,
        rej: a
      });
    });
  }
  _notify(t) {
    const n = t ? "res" : "rej", a = this._promises || [];
    for (let s = 0; s < a.length; s++)
      a[s][n]();
  }
}
class Di {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!Ae(t))
      return;
    const n = Object.keys(He.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!Ae(o))
        return;
      const i = {};
      for (const l of n)
        i[l] = o[l];
      (Ke(o.properties) && o.properties || [
        s
      ]).forEach((l) => {
        (l === s || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, s = Dc(t, a);
    if (!s)
      return [];
    const o = this._createAnimations(s, a);
    return a.$shared && Mc(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), o;
  }
  _createAnimations(t, n) {
    const a = this._properties, s = [], o = t.$animations || (t.$animations = {}), i = Object.keys(n), l = Date.now();
    let r;
    for (r = i.length - 1; r >= 0; --r) {
      const c = i[r];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        s.push(...this._animateOptions(t, n));
        continue;
      }
      const d = n[c];
      let h = o[c];
      const m = a.get(c);
      if (h)
        if (m && h.active()) {
          h.update(m, d, l);
          continue;
        } else
          h.cancel();
      if (!m || !m.duration) {
        t[c] = d;
        continue;
      }
      o[c] = h = new Sc(m, t, c, d), s.push(h);
    }
    return s;
  }
  update(t, n) {
    if (this._properties.size === 0) {
      Object.assign(t, n);
      return;
    }
    const a = this._createAnimations(t, n);
    if (a.length)
      return Tt.add(this._chart, a), !0;
  }
}
function Mc(e, t) {
  const n = [], a = Object.keys(t);
  for (let s = 0; s < a.length; s++) {
    const o = e[a[s]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function Dc(e, t) {
  if (!t)
    return;
  let n = e.options;
  if (!n) {
    e.options = t;
    return;
  }
  return n.$shared && (e.options = n = Object.assign({}, n, {
    $shared: !1,
    $animations: {}
  })), n;
}
function Zs(e, t) {
  const n = e && e.options || {}, a = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: a ? o : s,
    end: a ? s : o
  };
}
function Tc(e, t, n) {
  if (n === !1)
    return !1;
  const a = Zs(e, n), s = Zs(t, n);
  return {
    top: s.end,
    right: a.end,
    bottom: s.start,
    left: a.start
  };
}
function Ac(e) {
  let t, n, a, s;
  return Ae(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
    top: t,
    right: n,
    bottom: a,
    left: s,
    disabled: e === !1
  };
}
function Ti(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = a.length; s < o; ++s)
    n.push(a[s].index);
  return n;
}
function Qs(e, t, n, a = {}) {
  const s = e.keys, o = a.mode === "single";
  let i, l, r, c;
  if (t === null)
    return;
  let d = !1;
  for (i = 0, l = s.length; i < l; ++i) {
    if (r = +s[i], r === n) {
      if (d = !0, a.all)
        continue;
      break;
    }
    c = e.values[r], ft(c) && (o || t === 0 || $t(t) === $t(c)) && (t += c);
  }
  return !d && !a.all ? 0 : t;
}
function Bc(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, d;
  for (r = 0, c = i.length; r < c; ++r)
    d = i[r], l[r] = {
      [s]: d,
      [o]: e[d]
    };
  return l;
}
function Pa(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function Lc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Pc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: s } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function Ic(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function Js(e, t, n, a) {
  for (const s of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[s.index];
    if (n && o > 0 || !n && o < 0)
      return s.index;
  }
  return null;
}
function eo(e, t) {
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, r = o.axis, c = i.axis, d = Lc(o, i, a), h = t.length;
  let m;
  for (let v = 0; v < h; ++v) {
    const g = t[v], { [r]: y, [c]: b } = g, f = g._stacks || (g._stacks = {});
    m = f[c] = Ic(s, d, y), m[l] = b, m._top = Js(m, i, !0, a.type), m._bottom = Js(m, i, !1, a.type);
    const x = m._visualValues || (m._visualValues = {});
    x[l] = b;
  }
}
function Ia(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function Rc(e, t) {
  return cn(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Ec(e, t, n) {
  return cn(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: t,
    mode: "default",
    type: "data"
  });
}
function _n(e, t) {
  const n = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const s of t) {
      const o = s._stacks;
      if (!o || o[a] === void 0 || o[a][n] === void 0)
        return;
      delete o[a][n], o[a]._visualValues !== void 0 && o[a]._visualValues[n] !== void 0 && delete o[a]._visualValues[n];
    }
  }
}
const Ra = (e) => e === "reset" || e === "none", to = (e, t) => t ? e : Object.assign({}, e), Fc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: Ti(n, !0),
  values: null
};
class Ca {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Pa(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && _n(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, m, v, g) => h === "x" ? m : h === "r" ? g : v, o = n.xAxisID = _e(a.xAxisID, Ia(t, "x")), i = n.yAxisID = _e(a.yAxisID, Ia(t, "y")), l = n.rAxisID = _e(a.rAxisID, Ia(t, "r")), r = n.indexAxis, c = n.iAxisID = s(r, o, i, l), d = n.vAxisID = s(r, i, o, l);
    n.xScale = this.getScaleForId(o), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(d);
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
    const n = this._cachedMeta;
    return t === n.iScale ? n.vScale : n.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && Es(this._data, this), t._stacked && _n(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (Ae(n)) {
      const s = this._cachedMeta;
      this._data = Bc(n, s);
    } else if (a !== n) {
      if (a) {
        Es(a, this);
        const s = this._cachedMeta;
        _n(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && pr(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const n = this._cachedMeta, a = this.getDataset();
    let s = !1;
    this._dataCheck();
    const o = n._stacked;
    n._stacked = Pa(n.vScale, n), n.stack !== a.stack && (s = !0, _n(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (eo(this, n._parsed), n._stacked = Pa(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: s } = this, { iScale: o, _stacked: i } = a, l = o.axis;
    let r = t === 0 && n === s.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], d, h, m;
    if (this._parsing === !1)
      a._parsed = s, a._sorted = !0, m = s;
    else {
      Ke(s[t]) ? m = this.parseArrayData(a, s, t, n) : Ae(s[t]) ? m = this.parseObjectData(a, s, t, n) : m = this.parsePrimitiveData(a, s, t, n);
      const v = () => h[l] === null || c && h[l] < c[l];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = m[d], r && (v() && (r = !1), c = h);
      a._sorted = r;
    }
    i && eo(this, m);
  }
  parsePrimitiveData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, l = o.axis, r = i.axis, c = o.getLabels(), d = o === i, h = new Array(s);
    let m, v, g;
    for (m = 0, v = s; m < v; ++m)
      g = m + a, h[m] = {
        [l]: d || o.parse(c[g], g),
        [r]: i.parse(n[g], g)
      };
    return h;
  }
  parseArrayData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, l = new Array(s);
    let r, c, d, h;
    for (r = 0, c = s; r < c; ++r)
      d = r + a, h = n[d], l[r] = {
        x: o.parse(h[0], d),
        y: i.parse(h[1], d)
      };
    return l;
  }
  parseObjectData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = new Array(s);
    let d, h, m, v;
    for (d = 0, h = s; d < h; ++d)
      m = d + a, v = n[m], c[d] = {
        x: o.parse(ln(v, l), m),
        y: i.parse(ln(v, r), m)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, n, a) {
    const s = this.chart, o = this._cachedMeta, i = n[t.axis], l = {
      keys: Ti(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Qs(l, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, s) {
    const o = a[n.axis];
    let i = o === null ? NaN : o;
    const l = s && a._stacks[n.axis];
    s && l && (s.values = l, i = Qs(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), r = Fc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = Pc(l);
    let m, v;
    function g() {
      v = s[m];
      const y = v[l.axis];
      return !ft(v[t.axis]) || d > y || h < y;
    }
    for (m = 0; m < i && !(!g() && (this.updateRangeFromParsed(c, t, v, r), o)); ++m)
      ;
    if (o) {
      for (m = i - 1; m >= 0; --m)
        if (!g()) {
          this.updateRangeFromParsed(c, t, v, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let s, o, i;
    for (s = 0, o = n.length; s < o; ++s)
      i = n[s][t.axis], ft(i) && a.push(i);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = n.iScale, s = n.vScale, o = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(o[a.axis]) : "",
      value: s ? "" + s.getLabelForValue(o[s.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = Ac(_e(this.options.clip, Tc(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, s = a.data || [], o = n.chartArea, i = [], l = this._drawStart || 0, r = this._drawCount || s.length - l, c = this.options.drawActiveElementsOnTop;
    let d;
    for (a.dataset && a.dataset.draw(t, o, l, r), d = l; d < l + r; ++d) {
      const h = s[d];
      h.hidden || (h.active && c ? i.push(h) : h.draw(t, o));
    }
    for (d = 0; d < i.length; ++d)
      i[d].draw(t, o);
  }
  getStyle(t, n) {
    const a = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, n, a) {
    const s = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      o = i.$context || (i.$context = Ec(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Rc(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const s = n === "active", o = this._cachedDataOpts, i = t + "-" + n, l = o[i], r = this.enableOptionSharing && zn(a);
    if (l)
      return to(l, r);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], m = c.getOptionScopes(this.getDataset(), d), v = Object.keys(He.elements[t]), g = () => this.getContext(a, s, n), y = c.resolveNamedOptions(m, v, g, h);
    return y.$shared && (y.$shared = r, o[i] = Object.freeze(to(y, r))), y;
  }
  _resolveAnimations(t, n, a) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${n}`, l = o[i];
    if (l)
      return l;
    let r;
    if (s.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), m = d.getOptionScopes(this.getDataset(), h);
      r = d.createResolver(m, this.getContext(t, a, n));
    }
    const c = new Di(s, r && r.animations);
    return r && r._cacheable && (o[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Ra(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, n, a, s) {
    Ra(s) ? Object.assign(t, a) : this._resolveAnimations(n, s).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !Ra(n) && this._resolveAnimations(void 0, n).update(t, a);
  }
  _setStyle(t, n, a, s) {
    t.active = s;
    const o = this.getStyle(n, s);
    this._resolveAnimations(n, a, s).update(t, {
      options: !s && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, n, a) {
    this._setStyle(t, a, "active", !1);
  }
  setHoverStyle(t, n, a) {
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
    const n = this._data, a = this._cachedMeta.data;
    for (const [l, r, c] of this._syncList)
      this[l](r, c);
    this._syncList = [];
    const s = a.length, o = n.length, i = Math.min(o, s);
    i && this.parse(0, i), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
  }
  _insertElements(t, n, a = !0) {
    const s = this._cachedMeta, o = s.data, i = t + n;
    let l;
    const r = (c) => {
      for (c.length += n, l = c.length - 1; l >= i; l--)
        c[l] = c[l - n];
    };
    for (r(o), l = t; l < i; ++l)
      o[l] = new this.dataElementType();
    this._parsing && r(s._parsed), this.parse(t, n), a && this.updateElements(o, t, n, "reset");
  }
  updateElements(t, n, a, s) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const s = a._parsed.splice(t, n);
      a._stacked && _n(a, s);
    }
    a.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, a, s] = t;
      this[n](a, s);
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
  _onDataSplice(t, n) {
    n && this._sync([
      "_removeElements",
      t,
      n
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
function Oc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let s = 0, o = n.length; s < o; s++)
      a = a.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = gi(a.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function Vc(e) {
  const t = e.iScale, n = Oc(t, e.type);
  let a = t._length, s, o, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (zn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (s = 0, o = n.length; s < o; ++s)
    i = t.getPixelForValue(n[s]), r();
  for (l = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), r();
  return a;
}
function zc(e, t, n, a) {
  const s = n.barThickness;
  let o, i;
  return Ie(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function Nc(e, t, n, a) {
  const s = t.pixels, o = s[e];
  let i = e > 0 ? s[e - 1] : null, l = e < s.length - 1 ? s[e + 1] : null;
  const r = n.categoryPercentage;
  i === null && (i = o - (l === null ? t.end - t.start : l - o)), l === null && (l = o + o - i);
  const c = o - (o - Math.min(i, l)) / 2 * r;
  return {
    chunk: Math.abs(l - i) / 2 * r / a,
    ratio: n.barPercentage,
    start: c
  };
}
function Hc(e, t, n, a) {
  const s = n.parse(e[0], a), o = n.parse(e[1], a), i = Math.min(s, o), l = Math.max(s, o);
  let r = i, c = l;
  Math.abs(i) > Math.abs(l) && (r = l, c = i), t[n.axis] = c, t._custom = {
    barStart: r,
    barEnd: c,
    start: s,
    end: o,
    min: i,
    max: l
  };
}
function Ai(e, t, n, a) {
  return Ke(e) ? Hc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function no(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, r = [];
  let c, d, h, m;
  for (c = n, d = n + a; c < d; ++c)
    m = t[c], h = {}, h[s.axis] = l || s.parse(i[c], c), r.push(Ai(m, h, o, c));
  return r;
}
function Ea(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Wc(e, t, n) {
  return e !== 0 ? $t(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function jc(e) {
  let t, n, a, s, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: s,
    bottom: o
  };
}
function Kc(e, t, n, a) {
  let s = t.borderSkipped;
  const o = {};
  if (!s) {
    e.borderSkipped = o;
    return;
  }
  if (s === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: i, end: l, reverse: r, top: c, bottom: d } = jc(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = c : (n._bottom || 0) === a ? s = d : (o[ao(d, i, l, r)] = !0, s = c)), o[ao(s, i, l, r)] = !0, e.borderSkipped = o;
}
function ao(e, t, n, a) {
  return a ? (e = Yc(e, t, n), e = so(e, n, t)) : e = so(e, t, n), e;
}
function Yc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function so(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Uc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class qc extends Ca {
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
  parsePrimitiveData(t, n, a, s) {
    return no(t, n, a, s);
  }
  parseArrayData(t, n, a, s) {
    return no(t, n, a, s);
  }
  parseObjectData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = o.axis === "x" ? l : r, d = i.axis === "x" ? l : r, h = [];
    let m, v, g, y;
    for (m = a, v = a + s; m < v; ++m)
      y = n[m], g = {}, g[o.axis] = o.parse(ln(y, c), m), h.push(Ai(ln(y, d), g, i, m));
    return h;
  }
  updateRangeFromParsed(t, n, a, s) {
    super.updateRangeFromParsed(t, n, a, s);
    const o = a._custom;
    o && n === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { iScale: a, vScale: s } = n, o = this.getParsed(t), i = o._custom, l = Ea(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
    return {
      label: "" + a.getLabelForValue(o[a.axis]),
      value: l
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const n = this._cachedMeta;
    this.updateElements(n.data, 0, n.data.length, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: m } = this._getSharedOptions(n, s);
    for (let v = n; v < n + a; v++) {
      const g = this.getParsed(v), y = o || Ie(g[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(v), b = this._calculateBarIndexPixels(v, d), f = (g._stacks || {})[l.axis], x = {
        horizontal: c,
        base: y.base,
        enableBorderRadius: !f || Ea(g._custom) || i === f._top || i === f._bottom,
        x: c ? y.head : b.center,
        y: c ? b.center : y.head,
        height: c ? b.size : Math.abs(y.size),
        width: c ? Math.abs(y.size) : b.size
      };
      m && (x.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : s));
      const _ = x.options || t[v].options;
      Kc(x, _, f, i), Uc(x, _, d.ratio), this.updateElement(t[v], v, x, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), r = l && l[a.axis], c = (d) => {
      const h = d._parsed.find((v) => v[a.axis] === r), m = h && h[d.vScale.axis];
      if (Ie(m) || isNaN(m))
        return !0;
    };
    for (const d of s)
      if (!(n !== void 0 && c(d)) && ((o === !1 || i.indexOf(d.stack) === -1 || o === void 0 && d.stack === void 0) && i.push(d.stack), d.index === t))
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
    const t = this.chart.scales, n = this.chart.options.indexAxis;
    return Object.keys(t).filter((a) => t[a].axis === n).shift();
  }
  _getAxis() {
    const t = {}, n = this.getFirstScaleIdForIndexAxis();
    for (const a of this.chart.data.datasets)
      t[_e(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, n, a) {
    const s = this._getStacks(t, a), o = n !== void 0 ? s.indexOf(n) : -1;
    return o === -1 ? s.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, a = n.iScale, s = [];
    let o, i;
    for (o = 0, i = n.data.length; o < i; ++o)
      s.push(a.getPixelForValue(this.getParsed(o)[a.axis], o));
    const l = t.barThickness;
    return {
      min: l || Vc(n),
      pixels: s,
      start: a._startPixel,
      end: a._endPixel,
      stackCount: this._getStackCount(),
      scale: a,
      grouped: t.grouped,
      ratio: l ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, r = this.getParsed(t), c = r._custom, d = Ea(c);
    let h = r[n.axis], m = 0, v = a ? this.applyStack(n, r, a) : h, g, y;
    v !== h && (m = v - h, v = h), d && (h = c.barStart, v = c.barEnd - c.barStart, h !== 0 && $t(h) !== $t(c.barEnd) && (m = 0), m += h);
    const b = !Ie(o) && !d ? o : m;
    let f = n.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(m + v) : g = f, y = g - f, Math.abs(y) < i) {
      y = Wc(y, n, l) * i, h === l && (f -= y / 2);
      const x = n.getPixelForDecimal(0), _ = n.getPixelForDecimal(1), w = Math.min(x, _), $ = Math.max(x, _);
      f = Math.max(Math.min(f, $), w), g = f + y, a && !d && (r._stacks[n.axis]._visualValues[s] = n.getValueForPixel(g) - n.getValueForPixel(f));
    }
    if (f === n.getPixelForValue(l)) {
      const x = $t(y) * n.getLineWidthForValue(l) / 2;
      f += x, y -= x;
    }
    return {
      size: y,
      base: f,
      head: g,
      center: g + y / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, s = this.options, o = s.skipNull, i = _e(s.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? Nc(t, n, s, d * c) : zc(t, n, s, d * c), m = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(_e(m, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
      l = h.start + h.chunk * g + h.chunk / 2, r = Math.min(i, h.chunk * h.ratio);
    } else
      l = a.getPixelForValue(this.getParsed(t)[a.axis], t), r = Math.min(i, n.min * n.ratio);
    return {
      base: l - r / 2,
      head: l + r / 2,
      center: l,
      size: r
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, a = t.data, s = a.length;
    let o = 0;
    for (; o < s; ++o)
      this.getParsed(o)[n.axis] !== null && !a[o].hidden && a[o].draw(this._ctx);
  }
}
function Xc(e, t, n) {
  let a = 1, s = 1, o = 0, i = 0;
  if (t < Ne) {
    const l = e, r = l + t, c = Math.cos(l), d = Math.sin(l), h = Math.cos(r), m = Math.sin(r), v = (_, w, $) => Hn(_, l, r, !0) ? 1 : Math.max(w, w * n, $, $ * n), g = (_, w, $) => Hn(_, l, r, !0) ? -1 : Math.min(w, w * n, $, $ * n), y = v(0, c, h), b = v(Ye, d, m), f = g(Ee, c, h), x = g(Ee + Ye, d, m);
    a = (y - f) / 2, s = (b - x) / 2, o = -(y + f) / 2, i = -(b + x) / 2;
  }
  return {
    ratioX: a,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class Gc extends Ca {
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
            const n = t.data, { labels: { pointStyle: a, textAlign: s, color: o, useBorderRadius: i, borderRadius: l } } = t.legend.options;
            return n.labels.length && n.datasets.length ? n.labels.map((r, c) => {
              const h = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: r,
                fillStyle: h.backgroundColor,
                fontColor: o,
                hidden: !t.getDataVisibility(c),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: s,
                pointStyle: a,
                borderRadius: i && (l || h.borderRadius),
                index: c
              };
            }) : [];
          }
        },
        onClick(t, n, a) {
          a.chart.toggleDataVisibility(n.index), a.chart.update();
        }
      }
    }
  };
  constructor(t, n) {
    super(t, n), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, n) {
    const a = this.getDataset().data, s = this._cachedMeta;
    if (this._parsing === !1)
      s._parsed = a;
    else {
      let o = (r) => +a[r];
      if (Ae(a[t])) {
        const { key: r = "value" } = this._parsing;
        o = (c) => +ln(a[c], r);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return Lt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Lt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ne, n = -Ne;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const s = this.chart.getDatasetMeta(a).controller, o = s._getRotation(), i = s._getCircumference();
        t = Math.min(t, o), n = Math.max(n, o + i);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), r = Math.min(Jl(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: m, ratioY: v, offsetX: g, offsetY: y } = Xc(h, d, r), b = (a.width - i) / m, f = (a.height - i) / v, x = Math.max(Math.min(b, f) / 2, 0), _ = ci(this.options.radius, x), w = Math.max(_ * r, 0), $ = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * _, this.offsetY = y * _, s.total = this.calculateTotal(), this.outerRadius = _ - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Ne);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, m = o && c.animateScale, v = m ? 0 : this.innerRadius, g = m ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: b } = this._getSharedOptions(n, s);
    let f = this._getRotation(), x;
    for (x = 0; x < n; ++x)
      f += this._circumference(x, o);
    for (x = n; x < n + a; ++x) {
      const _ = this._circumference(x, o), w = t[x], $ = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: f,
        endAngle: f + _,
        circumference: _,
        outerRadius: g,
        innerRadius: v
      };
      b && ($.options = y || this.resolveDataElementOptions(x, w.active ? "active" : s)), f += _, this.updateElement(w, x, $, s);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, n = t.data;
    let a = 0, s;
    for (s = 0; s < n.length; s++) {
      const o = t._parsed[s];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(s) && !n[s].hidden && (a += Math.abs(o));
    }
    return a;
  }
  calculateCircumference(t) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(t) ? Ne * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, s = a.data.labels || [], o = rs(n._parsed[t], a.options.locale);
    return {
      label: s[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let s, o, i, l, r;
    if (!t) {
      for (s = 0, o = a.data.datasets.length; s < o; ++s)
        if (a.isDatasetVisible(s)) {
          i = a.getDatasetMeta(s), t = i.data, l = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (s = 0, o = t.length; s < o; ++s)
      r = l.resolveDataElementOptions(s), r.borderAlign !== "inner" && (n = Math.max(n, r.borderWidth || 0, r.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(t) {
    let n = 0;
    for (let a = 0, s = t.length; a < s; ++a) {
      const o = this.resolveDataElementOptions(a);
      n = Math.max(n, o.offset || 0, o.hoverOffset || 0);
    }
    return n;
  }
  _getRingWeightOffset(t) {
    let n = 0;
    for (let a = 0; a < t; ++a)
      this.chart.isDatasetVisible(a) && (n += this._getRingWeight(a));
    return n;
  }
  _getRingWeight(t) {
    return Math.max(_e(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Zc extends Ca {
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
    const n = this._cachedMeta, { dataset: a, data: s = [], _dataset: o } = n, i = this.chart._animationsDisabled;
    let { start: l, count: r } = yr(n, s, i);
    this._drawStart = l, this._drawCount = r, xr(n) && (l = 0, r = s.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(s, l, r, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, s), m = i.axis, v = l.axis, { spanGaps: g, segment: y } = this.options, b = Nn(g) ? g : Number.POSITIVE_INFINITY, f = this.chart._animationsDisabled || o || s === "none", x = n + a, _ = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let $ = 0; $ < _; ++$) {
      const M = t[$], S = f ? M : {};
      if ($ < n || $ >= x) {
        S.skip = !0;
        continue;
      }
      const F = this.getParsed($), N = Ie(F[v]), O = S[m] = i.getPixelForValue(F[m], $), A = S[v] = o || N ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, F, r) : F[v], $);
      S.skip = isNaN(O) || isNaN(A) || N, S.stop = $ > 0 && Math.abs(F[m] - w[m]) > b, y && (S.parsed = F, S.raw = c.data[$]), h && (S.options = d || this.resolveDataElementOptions($, M.active ? "active" : s)), f || this.updateElement(M, $, S, s), w = F;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, a = n.options && n.options.borderWidth || 0, s = t.data || [];
    if (!s.length)
      return a;
    const o = s[0].size(this.resolveDataElementOptions(0)), i = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(a, o, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class Qc extends Gc {
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
class bs {
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
    Object.assign(bs.prototype, t);
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
var Jc = {
  _date: bs
};
function ed(e, t, n, a) {
  const { controller: s, data: o, _sorted: i } = e, l = s._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && o.length) {
    const c = l._reversePixels ? gr : an;
    if (a) {
      if (s._sharedOptions) {
        const d = o[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const m = c(o, t, n - h), v = c(o, t, n + h);
          return {
            lo: m.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const d = c(o, t, n);
      if (r) {
        const { vScale: h } = s._cachedMeta, { _parsed: m } = e, v = m.slice(0, d.lo + 1).reverse().findIndex((y) => !Ie(y[h.axis]));
        d.lo -= Math.max(0, v);
        const g = m.slice(d.hi).findIndex((y) => !Ie(y[h.axis]));
        d.hi += Math.max(0, g);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function $a(e, t, n, a, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, r = o.length; l < r; ++l) {
    const { index: c, data: d } = o[l], { lo: h, hi: m } = ed(o[l], t, i, s);
    for (let v = h; v <= m; ++v) {
      const g = d[v];
      g.skip || a(g, c, v);
    }
  }
}
function td(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, s) {
    const o = t ? Math.abs(a.x - s.x) : 0, i = n ? Math.abs(a.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function Fa(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || $a(e, n, t, function(l, r, c) {
    !s && !Wn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), o;
}
function nd(e, t, n, a) {
  let s = [];
  function o(i, l, r) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = hi(i, {
      x: t.x,
      y: t.y
    });
    Hn(h, c, d) && s.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return $a(e, n, t, o), s;
}
function ad(e, t, n, a, s, o) {
  let i = [];
  const l = td(n);
  let r = Number.POSITIVE_INFINITY;
  function c(d, h, m) {
    const v = d.inRange(t.x, t.y, s);
    if (a && !v)
      return;
    const g = d.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(g)) && !v)
      return;
    const b = l(t, g);
    b < r ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: m
      }
    ], r = b) : b === r && i.push({
      element: d,
      datasetIndex: h,
      index: m
    });
  }
  return $a(e, n, t, c), i;
}
function Oa(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? nd(e, t, n, s) : ad(e, t, n, a, s, o);
}
function oo(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return $a(e, n, t, (r, c, d) => {
    r[i] && r[i](t[n], s) && (o.push({
      element: r,
      datasetIndex: c,
      index: d
    }), l = l || r.inRange(t.x, t.y, s));
  }), a && !l ? [] : o;
}
var sd = {
  modes: {
    index(e, t, n, a) {
      const s = tn(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? Fa(e, s, o, a, i) : Oa(e, s, o, !1, a, i), r = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const d = l[0].index, h = c.data[d];
        h && !h.skip && r.push({
          element: h,
          datasetIndex: c.index,
          index: d
        });
      }), r) : [];
    },
    dataset(e, t, n, a) {
      const s = tn(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? Fa(e, s, o, a, i) : Oa(e, s, o, !1, a, i);
      if (l.length > 0) {
        const r = l[0].datasetIndex, c = e.getDatasetMeta(r).data;
        l = [];
        for (let d = 0; d < c.length; ++d)
          l.push({
            element: c[d],
            datasetIndex: r,
            index: d
          });
      }
      return l;
    },
    point(e, t, n, a) {
      const s = tn(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return Fa(e, s, o, a, i);
    },
    nearest(e, t, n, a) {
      const s = tn(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return Oa(e, s, o, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const s = tn(t, e);
      return oo(e, s, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const s = tn(t, e);
      return oo(e, s, "y", n.intersect, a);
    }
  }
};
const Bi = [
  "left",
  "top",
  "right",
  "bottom"
];
function kn(e, t) {
  return e.filter((n) => n.pos === t);
}
function io(e, t) {
  return e.filter((n) => Bi.indexOf(n.pos) === -1 && n.box.axis === t);
}
function wn(e, t) {
  return e.sort((n, a) => {
    const s = t ? a : n, o = t ? n : a;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function od(e) {
  const t = [];
  let n, a, s, o, i, l;
  for (n = 0, a = (e || []).length; n < a; ++n)
    s = e[n], { position: o, options: { stack: i, stackWeight: l = 1 } } = s, t.push({
      index: n,
      box: s,
      pos: o,
      horizontal: s.isHorizontal(),
      weight: s.weight,
      stack: i && o + i,
      stackWeight: l
    });
  return t;
}
function id(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: s, stackWeight: o } = n;
    if (!a || !Bi.includes(s))
      continue;
    const i = t[a] || (t[a] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += o;
  }
  return t;
}
function ld(e, t) {
  const n = id(e), { vBoxMaxWidth: a, hBoxMaxHeight: s } = t;
  let o, i, l;
  for (o = 0, i = e.length; o < i; ++o) {
    l = e[o];
    const { fullSize: r } = l.box, c = n[l.stack], d = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = d ? d * a : r && t.availableWidth, l.height = s) : (l.width = a, l.height = d ? d * s : r && t.availableHeight);
  }
  return n;
}
function rd(e) {
  const t = od(e), n = wn(t.filter((c) => c.box.fullSize), !0), a = wn(kn(t, "left"), !0), s = wn(kn(t, "right")), o = wn(kn(t, "top"), !0), i = wn(kn(t, "bottom")), l = io(t, "x"), r = io(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(o),
    rightAndBottom: s.concat(r).concat(i).concat(l),
    chartArea: kn(t, "chartArea"),
    vertical: a.concat(s).concat(r),
    horizontal: o.concat(i).concat(l)
  };
}
function lo(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function Li(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function cd(e, t, n, a) {
  const { pos: s, box: o } = n, i = e.maxPadding;
  if (!Ae(s)) {
    n.size && (e[s] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? o.height : o.width), n.size = h.size / h.count, e[s] += n.size;
  }
  o.getPadding && Li(i, o.getPadding());
  const l = Math.max(0, t.outerWidth - lo(i, e, "left", "right")), r = Math.max(0, t.outerHeight - lo(i, e, "top", "bottom")), c = l !== e.w, d = r !== e.h;
  return e.w = l, e.h = r, n.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function dd(e) {
  const t = e.maxPadding;
  function n(a) {
    const s = Math.max(t[a] - e[a], 0);
    return e[a] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function ud(e, t) {
  const n = t.maxPadding;
  function a(s) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return s.forEach((i) => {
      o[i] = Math.max(t[i], n[i]);
    }), o;
  }
  return a(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function An(e, t, n, a) {
  const s = [];
  let o, i, l, r, c, d;
  for (o = 0, i = e.length, c = 0; o < i; ++o) {
    l = e[o], r = l.box, r.update(l.width || t.w, l.height || t.h, ud(l.horizontal, t));
    const { same: h, other: m } = cd(t, n, l, a);
    c |= h && s.length, d = d || m, r.fullSize || s.push(l);
  }
  return c && An(s, t, n, a) || d;
}
function na(e, t, n, a, s) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + s, e.width = a, e.height = s;
}
function ro(e, t, n, a) {
  const s = n.padding;
  let { x: o, y: i } = t;
  for (const l of e) {
    const r = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, d = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * d, m = c.size || r.height;
      zn(c.start) && (i = c.start), r.fullSize ? na(r, s.left, i, n.outerWidth - s.right - s.left, m) : na(r, t.left + c.placed, i, h, m), c.start = i, c.placed += h, i = r.bottom;
    } else {
      const h = t.h * d, m = c.size || r.width;
      zn(c.start) && (o = c.start), r.fullSize ? na(r, o, s.top, m, n.outerHeight - s.bottom - s.top) : na(r, o, t.top + c.placed, m, h), c.start = o, c.placed += h, o = r.right;
    }
  }
  t.x = o, t.y = i;
}
var ht = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(n) {
            t.draw(n);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const n = e.boxes ? e.boxes.indexOf(t) : -1;
    n !== -1 && e.boxes.splice(n, 1);
  },
  configure(e, t, n) {
    t.fullSize = n.fullSize, t.position = n.position, t.weight = n.weight;
  },
  update(e, t, n, a) {
    if (!e)
      return;
    const s = gt(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = rd(e.boxes), r = l.vertical, c = l.horizontal;
    Re(e.boxes, (y) => {
      typeof y.beforeLayout == "function" && y.beforeLayout();
    });
    const d = r.reduce((y, b) => b.box.options && b.box.options.display === !1 ? y : y + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / d,
      hBoxMaxHeight: i / 2
    }), m = Object.assign({}, s);
    Li(m, gt(a));
    const v = Object.assign({
      maxPadding: m,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), g = ld(r.concat(c), h);
    An(l.fullSize, v, h, g), An(r, v, h, g), An(c, v, h, g) && An(r, v, h, g), dd(v), ro(l.leftAndTop, v, h, g), v.x += v.w, v.y += v.h, ro(l.rightAndBottom, v, h, g), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, Re(l.chartArea, (y) => {
      const b = y.box;
      Object.assign(b, e.chartArea), b.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Pi {
  acquireContext(t, n) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, n, a) {
  }
  removeEventListener(t, n, a) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, n, a, s) {
    return n = Math.max(0, n || t.width), a = a || t.height, {
      width: n,
      height: Math.max(0, s ? Math.floor(n / s) : a)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class hd extends Pi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const da = "$chartjs", fd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, co = (e) => e === null || e === "";
function gd(e, t) {
  const n = e.style, a = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[da] = {
    initial: {
      height: a,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", co(s)) {
    const o = Ys(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (co(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Ys(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const Ii = cc ? {
  passive: !0
} : !1;
function md(e, t, n) {
  e && e.addEventListener(t, n, Ii);
}
function pd(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Ii);
}
function bd(e, t) {
  const n = fd[e.type] || e.type, { x: a, y: s } = tn(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: s !== void 0 ? s : null
  };
}
function va(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function vd(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || va(l.addedNodes, a), i = i && !va(l.removedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function yd(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || va(l.removedNodes, a), i = i && !va(l.addedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Kn = /* @__PURE__ */ new Map();
let uo = 0;
function Ri() {
  const e = window.devicePixelRatio;
  e !== uo && (uo = e, Kn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function xd(e, t) {
  Kn.size || window.addEventListener("resize", Ri), Kn.set(e, t);
}
function _d(e) {
  Kn.delete(e), Kn.size || window.removeEventListener("resize", Ri);
}
function kd(e, t, n) {
  const a = e.canvas, s = a && ps(a);
  if (!s)
    return;
  const o = pi((l, r) => {
    const c = s.clientWidth;
    n(l, r), c < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, d = r.contentRect.height;
    c === 0 && d === 0 || o(c, d);
  });
  return i.observe(s), xd(e, o), i;
}
function Va(e, t, n) {
  n && n.disconnect(), t === "resize" && _d(e);
}
function wd(e, t, n) {
  const a = e.canvas, s = pi((o) => {
    e.ctx !== null && n(bd(o, e));
  }, e);
  return md(a, t, s), s;
}
class Cd extends Pi {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (gd(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[da])
      return !1;
    const a = n[da].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      Ie(i) ? n.removeAttribute(o) : n.setAttribute(o, i);
    });
    const s = a.style || {};
    return Object.keys(s).forEach((o) => {
      n.style[o] = s[o];
    }), n.width = n.width, delete n[da], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: vd,
      detach: yd,
      resize: kd
    }[n] || wd;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), s = a[n];
    if (!s)
      return;
    ({
      attach: Va,
      detach: Va,
      resize: Va
    }[n] || pd)(t, n, s), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, s) {
    return rc(t, n, a, s);
  }
  isAttached(t) {
    const n = t && ps(t);
    return !!(n && n.isConnected);
  }
}
function $d(e) {
  return !ms() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? hd : Cd;
}
let It = class {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: n, y: a } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: a
    };
  }
  hasValue() {
    return Nn(this.x) && Nn(this.y);
  }
  getProps(t, n) {
    const a = this.$animations;
    if (!n || !a)
      return this;
    const s = {};
    return t.forEach((o) => {
      s[o] = a[o] && a[o].active() ? a[o]._to : this[o];
    }), s;
  }
};
function Sd(e, t) {
  const n = e.options.ticks, a = Md(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? Td(t) : [], i = o.length, l = o[0], r = o[i - 1], c = [];
  if (i > s)
    return Ad(t, c, o, i / s), c;
  const d = Dd(o, t, s);
  if (i > 0) {
    let h, m;
    const v = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (aa(t, c, d, Ie(v) ? 0 : l - v, l), h = 0, m = i - 1; h < m; h++)
      aa(t, c, d, o[h], o[h + 1]);
    return aa(t, c, d, r, Ie(v) ? t.length : r + v), c;
  }
  return aa(t, c, d), c;
}
function Md(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function Dd(e, t, n) {
  const a = Bd(e), s = t.length / n;
  if (!a)
    return Math.max(s, 1);
  const o = lr(a);
  for (let i = 0, l = o.length - 1; i < l; i++) {
    const r = o[i];
    if (r > s)
      return r;
  }
  return Math.max(s, 1);
}
function Td(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function Ad(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = n[s * a]);
}
function aa(e, t, n, a, s) {
  const o = _e(a, 0), i = Math.min(_e(s, e.length), e.length);
  let l = 0, r, c, d;
  for (n = Math.ceil(n), s && (r = s - a, n = r / Math.floor(r / n)), d = o; d < 0; )
    l++, d = Math.round(o + l * n);
  for (c = Math.max(o, 0); c < i; c++)
    c === d && (t.push(e[c]), l++, d = Math.round(o + l * n));
}
function Bd(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const Ld = (e) => e === "left" ? "right" : e === "right" ? "left" : e, ho = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, fo = (e, t) => Math.min(t || e, e);
function go(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function Pd(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(s), c;
  if (!(n && (a === 1 ? c = Math.max(r - o, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(s - 1)) / 2, r += s < t ? c : -c, r < o - l || r > i + l)))
    return r;
}
function Id(e, t) {
  Re(e, (n) => {
    const a = n.gc, s = a.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o)
        delete n.data[a[o]];
      a.splice(0, s);
    }
  });
}
function Cn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function mo(e, t) {
  if (!e.display)
    return 0;
  const n = Je(e.font, t), a = gt(e.padding);
  return (Ke(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function Rd(e, t) {
  return cn(e, {
    scale: t,
    type: "scale"
  });
}
function Ed(e, t, n) {
  return cn(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function Fd(e, t, n) {
  let a = is(e);
  return (n && t !== "right" || !n && t === "right") && (a = Ld(a)), a;
}
function Od(e, t, n, a) {
  const { top: s, left: o, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: d } = r;
  let h = 0, m, v, g;
  const y = i - s, b = l - o;
  if (e.isHorizontal()) {
    if (v = Ge(a, o, l), Ae(n)) {
      const f = Object.keys(n)[0], x = n[f];
      g = d[f].getPixelForValue(x) + y - t;
    } else n === "center" ? g = (c.bottom + c.top) / 2 + y - t : g = ho(e, n, t);
    m = l - o;
  } else {
    if (Ae(n)) {
      const f = Object.keys(n)[0], x = n[f];
      v = d[f].getPixelForValue(x) - b + t;
    } else n === "center" ? v = (c.left + c.right) / 2 - b + t : v = ho(e, n, t);
    g = Ge(a, i, s), h = n === "left" ? -Ye : Ye;
  }
  return {
    titleX: v,
    titleY: g,
    maxWidth: m,
    rotation: h
  };
}
class xn extends It {
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
  parse(t, n) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: n, _suggestedMin: a, _suggestedMax: s } = this;
    return t = _t(t, Number.POSITIVE_INFINITY), n = _t(n, Number.NEGATIVE_INFINITY), a = _t(a, Number.POSITIVE_INFINITY), s = _t(s, Number.NEGATIVE_INFINITY), {
      min: _t(t, a),
      max: _t(n, s),
      minDefined: ft(t),
      maxDefined: ft(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: a, minDefined: s, maxDefined: o } = this.getUserBounds(), i;
    if (s && o)
      return {
        min: n,
        max: a
      };
    const l = this.getMatchingVisibleMetas();
    for (let r = 0, c = l.length; r < c; ++r)
      i = l[r].controller.getMinMax(this, t), s || (n = Math.min(n, i.min)), o || (a = Math.max(a, i.max));
    return n = o && n > a ? a : n, a = s && n > a ? n : a, {
      min: _t(n, _t(a, n)),
      max: _t(a, _t(n, a))
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
    Fe(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, n, a) {
    const { beginAtZero: s, grace: o, ticks: i } = this.options, l = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = zr(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? go(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Sd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Fe(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Fe(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Fe(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Fe(this.options[t], [
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
    Fe(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, s, o;
    for (a = 0, s = t.length; a < s; a++)
      o = t[a], o.label = Fe(n.callback, [
        o.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Fe(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Fe(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, a = fo(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, o = n.maxRotation;
    let i = s, l, r, c;
    if (!this._isVisible() || !n.display || s >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, m = d.highest.height, v = Qe(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : v / (a - 1), h + 6 > l && (l = v / (a - (t.offset ? 0.5 : 1)), r = this.maxHeight - Cn(t.grid) - n.padding - mo(t.title, this.chart.options.font), c = Math.sqrt(h * h + m * m), i = ur(Math.min(Math.asin(Qe((d.highest.height + 6) / l, -1, 1)), Math.asin(Qe(r / c, -1, 1)) - Math.asin(Qe(m / c, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Fe(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Fe(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: s, grid: o } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = mo(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = Cn(o) + r) : (t.height = this.maxHeight, t.width = Cn(o) + r), a.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: m } = this._getLabelSizes(), v = a.padding * 2, g = Lt(this.labelRotation), y = Math.cos(g), b = Math.sin(g);
        if (l) {
          const f = a.mirror ? 0 : b * h.width + y * m.height;
          t.height = Math.min(this.maxHeight, t.height + f + v);
        } else {
          const f = a.mirror ? 0 : y * h.width + b * m.height;
          t.width = Math.min(this.maxWidth, t.width + f + v);
        }
        this._calculatePadding(c, d, b, y);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, s) {
    const { ticks: { align: o, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let m = 0, v = 0;
      r ? c ? (m = s * t.width, v = a * n.height) : (m = a * t.height, v = s * n.width) : o === "start" ? v = n.width : o === "end" ? m = t.width : o !== "inner" && (m = t.width / 2, v = n.width / 2), this.paddingLeft = Math.max((m - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = t.height / 2;
      o === "start" ? (d = 0, h = t.height) : o === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Fe(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: n } = this.options;
    return n === "top" || n === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let n, a;
    for (n = 0, a = t.length; n < a; n++)
      Ie(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = go(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: s, _longestTextCache: o } = this, i = [], l = [], r = Math.floor(n / fo(n, a));
    let c = 0, d = 0, h, m, v, g, y, b, f, x, _, w, $;
    for (h = 0; h < n; h += r) {
      if (g = t[h].label, y = this._resolveTickFontOptions(h), s.font = b = y.string, f = o[b] = o[b] || {
        data: {},
        gc: []
      }, x = y.lineHeight, _ = w = 0, !Ie(g) && !Ke(g))
        _ = Ns(s, f.data, f.gc, _, g), w = x;
      else if (Ke(g))
        for (m = 0, v = g.length; m < v; ++m)
          $ = g[m], !Ie($) && !Ke($) && (_ = Ns(s, f.data, f.gc, _, $), w += x);
      i.push(_), l.push(w), c = Math.max(_, c), d = Math.max(w, d);
    }
    Id(o, n);
    const M = i.indexOf(c), S = l.indexOf(d), F = (N) => ({
      width: i[N] || 0,
      height: l[N] || 0
    });
    return {
      first: F(0),
      last: F(n - 1),
      widest: F(M),
      highest: F(S),
      widths: i,
      heights: l
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, n) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const n = this._startPixel + t * this._length;
    return fr(this._alignToPixels ? Qt(this.chart, n, 0) : n);
  }
  getDecimalForPixel(t) {
    const n = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - n : n;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: n } = this;
    return t < 0 && n < 0 ? n : t > 0 && n > 0 ? t : 0;
  }
  getContext(t) {
    const n = this.ticks || [];
    if (t >= 0 && t < n.length) {
      const a = n[t];
      return a.$context || (a.$context = Ed(this.getContext(), t, a));
    }
    return this.$context || (this.$context = Rd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Lt(this.labelRotation), a = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = o ? o.widest.width + i : 0, r = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? r * a > l * s ? l / a : r / s : r * s < l * a ? r / a : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, r = o.offset, c = this.isHorizontal(), h = this.ticks.length + (r ? 1 : 0), m = Cn(o), v = [], g = l.setContext(this.getContext()), y = g.display ? g.width : 0, b = y / 2, f = function(G) {
      return Qt(a, G, y);
    };
    let x, _, w, $, M, S, F, N, O, A, L, V;
    if (i === "top")
      x = f(this.bottom), S = this.bottom - m, N = x - b, A = f(t.top) + b, V = t.bottom;
    else if (i === "bottom")
      x = f(this.top), A = t.top, V = f(t.bottom) - b, S = x + b, N = this.top + m;
    else if (i === "left")
      x = f(this.right), M = this.right - m, F = x - b, O = f(t.left) + b, L = t.right;
    else if (i === "right")
      x = f(this.left), O = t.left, L = f(t.right) - b, M = x + b, F = this.left + m;
    else if (n === "x") {
      if (i === "center")
        x = f((t.top + t.bottom) / 2 + 0.5);
      else if (Ae(i)) {
        const G = Object.keys(i)[0], ne = i[G];
        x = f(this.chart.scales[G].getPixelForValue(ne));
      }
      A = t.top, V = t.bottom, S = x + b, N = S + m;
    } else if (n === "y") {
      if (i === "center")
        x = f((t.left + t.right) / 2);
      else if (Ae(i)) {
        const G = Object.keys(i)[0], ne = i[G];
        x = f(this.chart.scales[G].getPixelForValue(ne));
      }
      M = x - b, F = M - m, O = t.left, L = t.right;
    }
    const I = _e(s.ticks.maxTicksLimit, h), U = Math.max(1, Math.ceil(h / I));
    for (_ = 0; _ < h; _ += U) {
      const G = this.getContext(_), ne = o.setContext(G), ge = l.setContext(G), ye = ne.lineWidth, X = ne.color, W = ge.dash || [], Q = ge.dashOffset, ae = ne.tickWidth, fe = ne.tickColor, we = ne.tickBorderDash || [], De = ne.tickBorderDashOffset;
      w = Pd(this, _, r), w !== void 0 && ($ = Qt(a, w, ye), c ? M = F = O = L = $ : S = N = A = V = $, v.push({
        tx1: M,
        ty1: S,
        tx2: F,
        ty2: N,
        x1: O,
        y1: A,
        x2: L,
        y2: V,
        width: ye,
        color: X,
        borderDash: W,
        borderDashOffset: Q,
        tickWidth: ae,
        tickColor: fe,
        tickBorderDash: we,
        tickBorderDashOffset: De
      }));
    }
    return this._ticksLength = h, this._borderValue = x, v;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: d, mirror: h } = o, m = Cn(a.grid), v = m + d, g = h ? -d : v, y = -Lt(this.labelRotation), b = [];
    let f, x, _, w, $, M, S, F, N, O, A, L, V = "middle";
    if (s === "top")
      M = this.bottom - g, S = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      M = this.top + g, S = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const U = this._getYAxisLabelAlignment(m);
      S = U.textAlign, $ = U.x;
    } else if (s === "right") {
      const U = this._getYAxisLabelAlignment(m);
      S = U.textAlign, $ = U.x;
    } else if (n === "x") {
      if (s === "center")
        M = (t.top + t.bottom) / 2 + v;
      else if (Ae(s)) {
        const U = Object.keys(s)[0], G = s[U];
        M = this.chart.scales[U].getPixelForValue(G) + v;
      }
      S = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        $ = (t.left + t.right) / 2 - v;
      else if (Ae(s)) {
        const U = Object.keys(s)[0], G = s[U];
        $ = this.chart.scales[U].getPixelForValue(G);
      }
      S = this._getYAxisLabelAlignment(m).textAlign;
    }
    n === "y" && (r === "start" ? V = "top" : r === "end" && (V = "bottom"));
    const I = this._getLabelSizes();
    for (f = 0, x = l.length; f < x; ++f) {
      _ = l[f], w = _.label;
      const U = o.setContext(this.getContext(f));
      F = this.getPixelForTick(f) + o.labelOffset, N = this._resolveTickFontOptions(f), O = N.lineHeight, A = Ke(w) ? w.length : 1;
      const G = A / 2, ne = U.color, ge = U.textStrokeColor, ye = U.textStrokeWidth;
      let X = S;
      i ? ($ = F, S === "inner" && (f === x - 1 ? X = this.options.reverse ? "left" : "right" : f === 0 ? X = this.options.reverse ? "right" : "left" : X = "center"), s === "top" ? c === "near" || y !== 0 ? L = -A * O + O / 2 : c === "center" ? L = -I.highest.height / 2 - G * O + O : L = -I.highest.height + O / 2 : c === "near" || y !== 0 ? L = O / 2 : c === "center" ? L = I.highest.height / 2 - G * O : L = I.highest.height - A * O, h && (L *= -1), y !== 0 && !U.showLabelBackdrop && ($ += O / 2 * Math.sin(y))) : (M = F, L = (1 - A) * O / 2);
      let W;
      if (U.showLabelBackdrop) {
        const Q = gt(U.backdropPadding), ae = I.heights[f], fe = I.widths[f];
        let we = L - Q.top, De = 0 - Q.left;
        switch (V) {
          case "middle":
            we -= ae / 2;
            break;
          case "bottom":
            we -= ae;
            break;
        }
        switch (S) {
          case "center":
            De -= fe / 2;
            break;
          case "right":
            De -= fe;
            break;
          case "inner":
            f === x - 1 ? De -= fe : f > 0 && (De -= fe / 2);
            break;
        }
        W = {
          left: De,
          top: we,
          width: fe + Q.width,
          height: ae + Q.height,
          color: U.backdropColor
        };
      }
      b.push({
        label: w,
        font: N,
        textOffset: L,
        options: {
          rotation: y,
          color: ne,
          strokeColor: ge,
          strokeWidth: ye,
          textAlign: X,
          textBaseline: V,
          translation: [
            $,
            M
          ],
          backdrop: W
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Lt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return n.align === "start" ? s = "left" : n.align === "end" ? s = "right" : n.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: s, padding: o } } = this.options, i = this._getLabelSizes(), l = t + o, r = i.widest.width;
    let c, d;
    return n === "left" ? s ? (d = this.right + o, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d += r)) : (d = this.right - l, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d = this.left)) : n === "right" ? s ? (d = this.left + o, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d -= r)) : (d = this.left + l, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d = this.right)) : c = "right", {
      textAlign: c,
      x: d
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, n = this.options.position;
    if (n === "left" || n === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (n === "top" || n === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: n }, left: a, top: s, width: o, height: i } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(a, s, o, i), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const s = this.ticks.findIndex((o) => o.value === t);
    return s >= 0 ? n.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(t) {
    const n = this.options.grid, a = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, i;
    const l = (r, c, d) => {
      !d.width || !d.color || (a.save(), a.lineWidth = d.width, a.strokeStyle = d.color, a.setLineDash(d.borderDash || []), a.lineDashOffset = d.borderDashOffset, a.beginPath(), a.moveTo(r.x, r.y), a.lineTo(c.x, c.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (o = 0, i = s.length; o < i; ++o) {
        const r = s[o];
        n.drawOnChartArea && l({
          x: r.x1,
          y: r.y1
        }, {
          x: r.x2,
          y: r.y2
        }, r), n.drawTicks && l({
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
    const { chart: t, ctx: n, options: { border: a, grid: s } } = this, o = a.setContext(this.getContext()), i = a.display ? o.width : 0;
    if (!i)
      return;
    const l = s.setContext(this.getContext(0)).lineWidth, r = this._borderValue;
    let c, d, h, m;
    this.isHorizontal() ? (c = Qt(t, this.left, i) - i / 2, d = Qt(t, this.right, l) + l / 2, h = m = r) : (h = Qt(t, this.top, i) - i / 2, m = Qt(t, this.bottom, l) + l / 2, c = d = r), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(c, h), n.lineTo(d, m), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, s = this._computeLabelArea();
    s && cs(a, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const l = i.options, r = i.font, c = i.label, d = i.textOffset;
      jn(a, c, 0, d, r, l);
    }
    s && ds(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: s } } = this;
    if (!a.display)
      return;
    const o = Je(a.font), i = gt(a.padding), l = a.align;
    let r = o.lineHeight / 2;
    n === "bottom" || n === "center" || Ae(n) ? (r += i.bottom, Ke(a.text) && (r += o.lineHeight * (a.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: m } = Od(this, r, n, l);
    jn(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: m,
      textAlign: Fd(l, n, s),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = _e(t.grid && t.grid.z, -1), s = _e(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== xn.prototype.draw ? [
      {
        z: n,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: a,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: s,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: n,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const n = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", s = [];
    let o, i;
    for (o = 0, i = n.length; o < i; ++o) {
      const l = n[o];
      l[a] === this.id && (!t || l.type === t) && s.push(l);
    }
    return s;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return Je(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class sa {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    Nd(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, Vd(t, i, a), this.override && He.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, s = this.scope;
    a in n && delete n[a], s && a in He[s] && (delete He[s][a], this.override && delete rn[a]);
  }
}
function Vd(e, t, n) {
  const a = Vn(/* @__PURE__ */ Object.create(null), [
    n ? He.get(n) : {},
    He.get(t),
    e.defaults
  ]);
  He.set(t, a), e.defaultRoutes && zd(t, e.defaultRoutes), e.descriptors && He.describe(t, e.descriptors);
}
function zd(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), s = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), r = i.join(".");
    He.route(o, s, r, l);
  });
}
function Nd(e) {
  return "id" in e && "defaults" in e;
}
class Hd {
  constructor() {
    this.controllers = new sa(Ca, "datasets", !0), this.elements = new sa(It, "elements"), this.plugins = new sa(Object, "plugins"), this.scales = new sa(xn, "scales"), this._typedRegistries = [
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
  _each(t, n, a) {
    [
      ...n
    ].forEach((s) => {
      const o = a || this._getRegistryForType(s);
      a || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : Re(s, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const s = ss(t);
    Fe(a["before" + s], [], a), n[t](a), Fe(a["after" + s], [], a);
  }
  _getRegistryForType(t) {
    for (let n = 0; n < this._typedRegistries.length; n++) {
      const a = this._typedRegistries[n];
      if (a.isForType(t))
        return a;
    }
    return this.plugins;
  }
  _get(t, n, a) {
    const s = n.get(t);
    if (s === void 0)
      throw new Error('"' + t + '" is not a registered ' + a + ".");
    return s;
  }
}
var wt = /* @__PURE__ */ new Hd();
class Wd {
  constructor() {
    this._init = void 0;
  }
  notify(t, n, a, s) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = s ? this._descriptors(t).filter(s) : this._descriptors(t), i = this._notify(o, t, n, a);
    return n === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, n, a, s) {
    s = s || {};
    for (const o of t) {
      const i = o.plugin, l = i[a], r = [
        n,
        s,
        o.options
      ];
      if (Fe(l, r, i) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Ie(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, s = _e(a.options && a.options.plugins, {}), o = jd(a);
    return s === !1 && !n ? [] : Yd(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function jd(e) {
  const t = {}, n = [], a = Object.keys(wt.plugins.items);
  for (let o = 0; o < a.length; o++)
    n.push(wt.getPlugin(a[o]));
  const s = e.plugins || [];
  for (let o = 0; o < s.length; o++) {
    const i = s[o];
    n.indexOf(i) === -1 && (n.push(i), t[i.id] = !0);
  }
  return {
    plugins: n,
    localIds: t
  };
}
function Kd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Yd(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = Kd(a[r], s);
    c !== null && o.push({
      plugin: l,
      options: Ud(e.config, {
        plugin: l,
        local: n[r]
      }, c, i)
    });
  }
  return o;
}
function Ud(e, { plugin: t, local: n }, a, s) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Za(e, t) {
  const n = He.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function qd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Xd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function po(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Gd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Qa(e, ...t) {
  if (po(e))
    return e;
  for (const n of t) {
    const a = n.axis || Gd(n.position) || e.length > 1 && po(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function bo(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Zd(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return bo(e, "x", n[0]) || bo(e, "y", n[0]);
  }
  return {};
}
function Qd(e, t) {
  const n = rn[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Za(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!Ae(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = Qa(i, l, Zd(i, e), He.scales[l.type]), c = Xd(r, s), d = n.scales || {};
    o[i] = Ln(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      d[r],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || Za(l, t), d = (rn[l] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const m = qd(h, r), v = i[m + "AxisID"] || m;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), Ln(o[v], [
        {
          axis: m
        },
        a[v],
        d[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const l = o[i];
    Ln(l, [
      He.scales[l.type],
      He.scale
    ]);
  }), o;
}
function Ei(e) {
  const t = e.options || (e.options = {});
  t.plugins = _e(t.plugins, {}), t.scales = Qd(e, t);
}
function Fi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Jd(e) {
  return e = e || {}, e.data = Fi(e.data), Ei(e), e;
}
const vo = /* @__PURE__ */ new Map(), Oi = /* @__PURE__ */ new Set();
function oa(e, t) {
  let n = vo.get(e);
  return n || (n = t(), vo.set(e, n), Oi.add(n)), n;
}
const $n = (e, t, n) => {
  const a = ln(t, n);
  a !== void 0 && e.add(a);
};
class eu {
  constructor(t) {
    this._config = Jd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Fi(t);
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
    this.clearCache(), Ei(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return oa(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return oa(`${t}.transition.${n}`, () => [
      [
        `datasets.${t}.transitions.${n}`,
        `transitions.${n}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, n) {
    return oa(`${t}-${n}`, () => [
      [
        `datasets.${t}.elements.${n}`,
        `datasets.${t}`,
        `elements.${n}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const n = t.id, a = this.type;
    return oa(`${a}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, n) {
    const a = this._scopeCache;
    let s = a.get(t);
    return (!s || n) && (s = /* @__PURE__ */ new Map(), a.set(t, s)), s;
  }
  getOptionScopes(t, n, a) {
    const { options: s, type: o } = this, i = this._cachedScopes(t, a), l = i.get(n);
    if (l)
      return l;
    const r = /* @__PURE__ */ new Set();
    n.forEach((d) => {
      t && (r.add(t), d.forEach((h) => $n(r, t, h))), d.forEach((h) => $n(r, s, h)), d.forEach((h) => $n(r, rn[o] || {}, h)), d.forEach((h) => $n(r, He, h)), d.forEach((h) => $n(r, Xa, h));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Oi.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      rn[n] || {},
      He.datasets[n] || {},
      {
        type: n
      },
      He,
      Xa
    ];
  }
  resolveNamedOptions(t, n, a, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = yo(this._resolverCache, t, s);
    let r = i;
    if (nu(i, n)) {
      o.$shared = !1, a = Yt(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      r = vn(i, a, c);
    }
    for (const c of n)
      o[c] = r[c];
    return o;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = yo(this._resolverCache, t, a);
    return Ae(n) ? vn(o, n, void 0, s) : o;
  }
}
function yo(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const s = n.join();
  let o = a.get(s);
  return o || (o = {
    resolver: hs(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(s, o)), o;
}
const tu = (e) => Ae(e) && Object.getOwnPropertyNames(e).some((t) => Yt(e[t]));
function nu(e, t) {
  const { isScriptable: n, isIndexable: a } = xi(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && (Yt(l) || tu(l)) || i && Ke(l))
      return !0;
  }
  return !1;
}
var au = "4.5.1";
const su = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function xo(e, t) {
  return e === "top" || e === "bottom" || su.indexOf(e) === -1 && t === "x";
}
function _o(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function ko(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Fe(n && n.onComplete, [
    e
  ], t);
}
function ou(e) {
  const t = e.chart, n = t.options.animation;
  Fe(n && n.onProgress, [
    e
  ], t);
}
function Vi(e) {
  return ms() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const ua = {}, wo = (e) => {
  const t = Vi(e);
  return Object.values(ua).filter((n) => n.canvas === t).pop();
};
function iu(e, t, n) {
  const a = Object.keys(e);
  for (const s of a) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = i);
    }
  }
}
function lu(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Ut = class {
  static defaults = He;
  static instances = ua;
  static overrides = rn;
  static registry = wt;
  static version = au;
  static getChart = wo;
  static register(...t) {
    wt.add(...t), Co();
  }
  static unregister(...t) {
    wt.remove(...t), Co();
  }
  constructor(t, n) {
    const a = this.config = new eu(n), s = Vi(t), o = wo(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || $d(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), r = l && l.canvas, c = r && r.height, d = r && r.width;
    if (this.id = Ql(), this.ctx = l, this.canvas = r, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Wd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = br((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], ua[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Tt.listen(this, "complete", ko), Tt.listen(this, "progress", ou), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: s, _aspectRatio: o } = this;
    return Ie(t) ? n && o ? o : s ? a / s : null : t;
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
    return wt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ks(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Hs(this.canvas, this.ctx), this;
  }
  stop() {
    return Tt.stop(this), this;
  }
  resize(t, n) {
    Tt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, s = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(s, t, n, o), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Ks(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Fe(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Re(n, (a, s) => {
      a.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, s = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((i) => {
      const l = n[i], r = Qa(i, l), c = r === "r", d = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Re(o, (i) => {
      const l = i.options, r = l.id, c = Qa(r, l), d = _e(l.type, i.dtype);
      (l.position === void 0 || xo(l.position, c) !== xo(i.dposition)) && (l.position = i.dposition), s[r] = !0;
      let h = null;
      if (r in a && a[r].type === d)
        h = a[r];
      else {
        const m = wt.getScale(d);
        h = new m({
          id: r,
          type: d,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), Re(s, (i, l) => {
      i || delete a[l];
    }), Re(a, (i) => {
      ht.configure(this, i, i.options), ht.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((s, o) => s.index - o.index), a > n) {
      for (let s = n; s < a; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(_o("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((a, s) => {
      n.filter((o) => o === a._dataset).length === 0 && this._destroyDatasetMeta(s);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let a, s;
    for (this._removeUnreferencedMetasets(), a = 0, s = n.length; a < s; a++) {
      const o = n[a];
      let i = this.getDatasetMeta(a);
      const l = o.type || this.config.type;
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = o.indexAxis || Za(l, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const r = wt.getController(l), { datasetElementType: c, dataElementType: d } = He.datasets[l];
        Object.assign(r, {
          dataElementType: wt.getElement(d),
          datasetElementType: c && wt.getElement(c)
        }), i.controller = new r(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Re(this.data.datasets, (t, n) => {
      this.getDatasetMeta(n).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const n = this.config;
    n.update();
    const a = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !a.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let c = 0, d = this.data.datasets.length; c < d; c++) {
      const { controller: h } = this.getDatasetMeta(c), m = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(m), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || Re(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(_o("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Re(this.scales, (t) => {
      ht.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Ls(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: s, count: o } of n) {
      const i = a === "_removeElements" ? -o : o;
      iu(t, s, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, l) => l + "," + i.splice(1).join(","))), s = a(0);
    for (let o = 1; o < n; o++)
      if (!Ls(s, a(o)))
        return;
    return Array.from(s).map((o) => o.split(",")).map((o) => ({
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
    ht.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Re(this.boxes, (s) => {
      a && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()));
    }, this), this._layers.forEach((s, o) => {
      s._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let n = 0, a = this.data.datasets.length; n < a; ++n)
        this.getDatasetMeta(n).controller.configure();
      for (let n = 0, a = this.data.datasets.length; n < a; ++n)
        this._updateDataset(n, Yt(t) ? t({
          datasetIndex: n
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, n) {
    const a = this.getDatasetMeta(t), s = {
      meta: a,
      index: t,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (a.controller._update(n), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Tt.has(this) ? this.attached && !Tt.running(this) && Tt.start(this) : (this.draw(), ko({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: a, height: s } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(a, s);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const n = this._layers;
    for (t = 0; t < n.length && n[t].z <= 0; ++t)
      n[t].draw(this.chartArea);
    for (this._drawDatasets(); t < n.length; ++t)
      n[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const n = this._sortedMetasets, a = [];
    let s, o;
    for (s = 0, o = n.length; s < o; ++s) {
      const i = n[s];
      (!t || i.visible) && a.push(i);
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
    for (let n = t.length - 1; n >= 0; --n)
      this._drawDataset(t[n]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const n = this.ctx, a = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, s = wc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (s && cs(n, s), t.controller.draw(), s && ds(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Wn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, s) {
    const o = sd.modes[n];
    return typeof o == "function" ? o(this, t, a, s) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], a = this._metasets;
    let s = a.filter((o) => o && o._dataset === n).pop();
    return s || (s = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: n && n.order || 0,
      index: t,
      _dataset: n,
      _parsed: [],
      _sorted: !1
    }, a.push(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = cn(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const n = this.data.datasets[t];
    if (!n)
      return !1;
    const a = this.getDatasetMeta(t);
    return typeof a.hidden == "boolean" ? !a.hidden : !n.hidden;
  }
  setDatasetVisibility(t, n) {
    const a = this.getDatasetMeta(t);
    a.hidden = !n;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, n, a) {
    const s = a ? "show" : "hide", o = this.getDatasetMeta(t), i = o.controller._resolveAnimations(void 0, s);
    zn(n) ? (o.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
      visible: a
    }), this.update((l) => l.datasetIndex === t ? s : void 0));
  }
  hide(t, n) {
    this._updateVisibility(t, n, !1);
  }
  show(t, n) {
    this._updateVisibility(t, n, !0);
  }
  _destroyDatasetMeta(t) {
    const n = this._metasets[t];
    n && n.controller && n.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, n;
    for (this.stop(), Tt.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Hs(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete ua[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, a = (o, i) => {
      n.addEventListener(this, o, i), t[o] = i;
    }, s = (o, i, l) => {
      o.offsetX = i, o.offsetY = l, this._eventHandler(o);
    };
    Re(this.options.events, (o) => a(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (r, c) => {
      n.addEventListener(this, r, c), t[r] = c;
    }, s = (r, c) => {
      t[r] && (n.removeEventListener(this, r, c), delete t[r]);
    }, o = (r, c) => {
      this.canvas && this.resize(r, c);
    };
    let i;
    const l = () => {
      s("attach", l), this.attached = !0, this.resize(), a("resize", o), a("detach", i);
    };
    i = () => {
      this.attached = !1, s("resize", o), this._stop(), this._resize(0, 0), a("attach", l);
    }, n.isAttached(this.canvas) ? l() : i();
  }
  unbindEvents() {
    Re(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Re(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const s = a ? "set" : "remove";
    let o, i, l, r;
    for (n === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), l = 0, r = t.length; l < r; ++l) {
      i = t[l];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[s + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], a = t.map(({ datasetIndex: o, index: i }) => {
      const l = this.getDatasetMeta(o);
      if (!l)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: l.data[i],
        index: i
      };
    });
    !fa(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
  }
  notifyPlugins(t, n, a) {
    return this._plugins.notify(this, t, n, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, a) {
    const s = this.options.hover, o = (r, c) => r.filter((d) => !c.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), i = o(n, t), l = a ? t : o(t, n);
    i.length && this.updateHoverStyle(i, s.mode, !1), l.length && s.mode && this.updateHoverStyle(l, s.mode, !0);
  }
  _eventHandler(t, n) {
    const a = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, s = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, s) === !1)
      return;
    const o = this._handleEvent(t, n, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, s), (o || a.changed) && this.render(), this;
  }
  _handleEvent(t, n, a) {
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), r = sr(t), c = lu(t, this._lastEvent, a, r);
    a && (this._lastEvent = null, Fe(o.onHover, [
      t,
      l,
      this
    ], this), r && Fe(o.onClick, [
      t,
      l,
      this
    ], this));
    const d = !fa(l, s);
    return (d || n) && (this._active = l, this._updateHoverStyles(l, s, n)), this._lastEvent = c, d;
  }
  _getActiveElements(t, n, a, s) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return n;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, s);
  }
};
function Co() {
  return Re(Ut.instances, (e) => e._plugins.invalidate());
}
function ru(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: d } = r, h = Math.min(c / i, bt(a - n));
  if (e.beginPath(), e.arc(s, o, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const m = Math.min(c / l, bt(a - n));
    e.arc(s, o, l + c / 2, n - m / 2, a + m / 2, !0);
  } else {
    const m = Math.min(c / 2, i * bt(a - n));
    if (d === "round")
      e.arc(s, o, m, n - Ee / 2, a + Ee / 2, !0);
    else if (d === "bevel") {
      const v = 2 * m * m, g = -v * Math.cos(n + Ee / 2) + s, y = -v * Math.sin(n + Ee / 2) + o, b = v * Math.cos(a + Ee / 2) + s, f = v * Math.sin(a + Ee / 2) + o;
      e.lineTo(g, y), e.lineTo(b, f);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function cu(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: r } = t;
  let c = s / l;
  e.beginPath(), e.arc(o, i, l, a - c, n + c), r > s ? (c = s / r, e.arc(o, i, r, n + c, a - c, !0)) : e.arc(o, i, s, n + Ye, a - Ye), e.closePath(), e.clip();
}
function du(e) {
  return us(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function uu(e, t, n, a) {
  const s = du(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (r) => {
    const c = (n - Math.min(o, r)) * a / 2;
    return Qe(r, 0, Math.min(o, c));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: Qe(s.innerStart, 0, i),
    innerEnd: Qe(s.innerEnd, 0, i)
  };
}
function fn(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function ya(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), m = d > 0 ? d + a + n + c : 0;
  let v = 0;
  const g = s - r;
  if (a) {
    const U = d > 0 ? d - a : 0, G = h > 0 ? h - a : 0, ne = (U + G) / 2, ge = ne !== 0 ? g * ne / (ne + a) : g;
    v = (g - ge) / 2;
  }
  const y = Math.max(1e-3, g * h - n / Ee) / h, b = (g - y) / 2, f = r + b + v, x = s - b - v, { outerStart: _, outerEnd: w, innerStart: $, innerEnd: M } = uu(t, m, h, x - f), S = h - _, F = h - w, N = f + _ / S, O = x - w / F, A = m + $, L = m + M, V = f + $ / A, I = x - M / L;
  if (e.beginPath(), o) {
    const U = (N + O) / 2;
    if (e.arc(i, l, h, N, U), e.arc(i, l, h, U, O), w > 0) {
      const ye = fn(F, O, i, l);
      e.arc(ye.x, ye.y, w, O, x + Ye);
    }
    const G = fn(L, x, i, l);
    if (e.lineTo(G.x, G.y), M > 0) {
      const ye = fn(L, I, i, l);
      e.arc(ye.x, ye.y, M, x + Ye, I + Math.PI);
    }
    const ne = (x - M / m + (f + $ / m)) / 2;
    if (e.arc(i, l, m, x - M / m, ne, !0), e.arc(i, l, m, ne, f + $ / m, !0), $ > 0) {
      const ye = fn(A, V, i, l);
      e.arc(ye.x, ye.y, $, V + Math.PI, f - Ye);
    }
    const ge = fn(S, f, i, l);
    if (e.lineTo(ge.x, ge.y), _ > 0) {
      const ye = fn(S, N, i, l);
      e.arc(ye.x, ye.y, _, f - Ye, N);
    }
  } else {
    e.moveTo(i, l);
    const U = Math.cos(N) * h + i, G = Math.sin(N) * h + l;
    e.lineTo(U, G);
    const ne = Math.cos(O) * h + i, ge = Math.sin(O) * h + l;
    e.lineTo(ne, ge);
  }
  e.closePath();
}
function hu(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (o) {
    ya(e, t, n, a, r, s);
    for (let c = 0; c < o; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ne || Ne));
  }
  return ya(e, t, n, a, r, s), e.fill(), r;
}
function fu(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: m, borderRadius: v } = r, g = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = m, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let y = t.endAngle;
  if (o) {
    ya(e, t, n, a, y, s);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(l) || (y = i + (l % Ne || Ne));
  }
  g && cu(e, t, y), r.selfJoin && y - i >= Ee && v === 0 && d !== "miter" && ru(e, t, y), o || (ya(e, t, n, a, y, s), e.stroke());
}
class gu extends It {
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
  inRange(t, n, a) {
    const s = this.getProps([
      "x",
      "y"
    ], a), { angle: o, distance: i } = hi(s, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), m = (this.options.spacing + this.options.borderWidth) / 2, v = _e(h, r - l), g = Hn(o, l, r) && l !== r, y = v >= Ne || g, b = Vt(i, c + m, d + m);
    return y && b;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: s, endAngle: o, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: r, spacing: c } = this.options, d = (s + o) / 2, h = (i + l + c + r) / 2;
    return {
      x: n + Math.cos(d) * h,
      y: a + Math.sin(d) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: a } = this, s = (n.offset || 0) / 4, o = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Ne ? Math.floor(a / Ne) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const r = 1 - Math.sin(Math.min(Ee, a || 0)), c = s * r;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, hu(t, this, c, o, i), fu(t, this, c, o, i), t.restore();
  }
}
function zi(e, t, n = t) {
  e.lineCap = _e(n.borderCapStyle, t.borderCapStyle), e.setLineDash(_e(n.borderDash, t.borderDash)), e.lineDashOffset = _e(n.borderDashOffset, t.borderDashOffset), e.lineJoin = _e(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = _e(n.borderWidth, t.borderWidth), e.strokeStyle = _e(n.borderColor, t.borderColor);
}
function mu(e, t, n) {
  e.lineTo(n.x, n.y);
}
function pu(e) {
  return e.stepped ? Br : e.tension || e.cubicInterpolationMode === "monotone" ? Lr : mu;
}
function Ni(e, t, n = {}) {
  const a = e.length, { start: s = 0, end: o = a - 1 } = n, { start: i, end: l } = t, r = Math.max(s, i), c = Math.min(o, l), d = s < i && o < i || s > l && o > l;
  return {
    count: a,
    start: r,
    loop: t.loop,
    ilen: c < r && !d ? a + c - r : c - r
  };
}
function bu(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: r, ilen: c } = Ni(s, n, a), d = pu(o);
  let { move: h = !0, reverse: m } = a || {}, v, g, y;
  for (v = 0; v <= c; ++v)
    g = s[(l + (m ? c - v : v)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : d(e, y, g, m, o.stepped), y = g);
  return r && (g = s[(l + (m ? c : 0)) % i], d(e, y, g, m, o.stepped)), !!r;
}
function vu(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = Ni(s, n, a), { move: r = !0, reverse: c } = a || {};
  let d = 0, h = 0, m, v, g, y, b, f;
  const x = (w) => (i + (c ? l - w : w)) % o, _ = () => {
    y !== b && (e.lineTo(d, b), e.lineTo(d, y), e.lineTo(d, f));
  };
  for (r && (v = s[x(0)], e.moveTo(v.x, v.y)), m = 0; m <= l; ++m) {
    if (v = s[x(m)], v.skip)
      continue;
    const w = v.x, $ = v.y, M = w | 0;
    M === g ? ($ < y ? y = $ : $ > b && (b = $), d = (h * d + w) / ++h) : (_(), e.lineTo(w, $), g = M, h = 0, y = b = $), f = $;
  }
  _();
}
function Ja(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? vu : bu;
}
function yu(e) {
  return e.stepped ? dc : e.tension || e.cubicInterpolationMode === "monotone" ? uc : nn;
}
function xu(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), zi(e, t.options), e.stroke(s);
}
function _u(e, t, n, a) {
  const { segments: s, options: o } = t, i = Ja(t);
  for (const l of s)
    zi(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const ku = typeof Path2D == "function";
function wu(e, t, n, a) {
  ku && !t.options.segment ? xu(e, t, n, a) : _u(e, t, n, a);
}
class Cu extends It {
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
  updateControlPoints(t, n) {
    const a = this.options;
    if ((a.tension || a.cubicInterpolationMode === "monotone") && !a.stepped && !this._pointsUpdated) {
      const s = a.spanGaps ? this._loop : this._fullLoop;
      nc(this._points, a, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = yc(this, this.options.segment));
  }
  first() {
    const t = this.segments, n = this.points;
    return t.length && n[t[0].start];
  }
  last() {
    const t = this.segments, n = this.points, a = t.length;
    return a && n[t[a - 1].end];
  }
  interpolate(t, n) {
    const a = this.options, s = t[n], o = this.points, i = pc(this, {
      property: n,
      start: s,
      end: s
    });
    if (!i.length)
      return;
    const l = [], r = yu(a);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: m } = i[c], v = o[h], g = o[m];
      if (v === g) {
        l.push(v);
        continue;
      }
      const y = Math.abs((s - v[n]) / (g[n] - v[n])), b = r(v, g, y, a.stepped);
      b[n] = t[n], l.push(b);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return Ja(this)(t, this, n, a);
  }
  path(t, n, a) {
    const s = this.segments, o = Ja(this);
    let i = this._loop;
    n = n || 0, a = a || this.points.length - n;
    for (const l of s)
      i &= o(t, this, l, {
        start: n,
        end: n + a - 1
      });
    return !!i;
  }
  draw(t, n, a, s) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), wu(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function $o(e, t, n, a) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], a);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class $u extends It {
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
  inRange(t, n, a) {
    const s = this.options, { x: o, y: i } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(t - o, 2) + Math.pow(n - i, 2) < Math.pow(s.hitRadius + s.radius, 2);
  }
  inXRange(t, n) {
    return $o(this, t, "x", n);
  }
  inYRange(t, n) {
    return $o(this, t, "y", n);
  }
  getCenterPoint(t) {
    const { x: n, y: a } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: a
    };
  }
  size(t) {
    t = t || this.options || {};
    let n = t.radius || 0;
    n = Math.max(n, n && t.hoverRadius || 0);
    const a = n && t.borderWidth || 0;
    return (n + a) * 2;
  }
  draw(t, n) {
    const a = this.options;
    this.skip || a.radius < 0.1 || !Wn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ga(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Hi(e, t) {
  const { x: n, y: a, base: s, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, r, c, d, h;
  return e.horizontal ? (h = i / 2, l = Math.min(n, s), r = Math.max(n, s), c = a - h, d = a + h) : (h = o / 2, l = n - h, r = n + h, c = Math.min(a, s), d = Math.max(a, s)), {
    left: l,
    top: c,
    right: r,
    bottom: d
  };
}
function Nt(e, t, n, a) {
  return e ? 0 : Qe(t, n, a);
}
function Su(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = yi(a);
  return {
    t: Nt(s.top, o.top, 0, n),
    r: Nt(s.right, o.right, 0, t),
    b: Nt(s.bottom, o.bottom, 0, n),
    l: Nt(s.left, o.left, 0, t)
  };
}
function Mu(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = mn(s), i = Math.min(t, n), l = e.borderSkipped, r = a || Ae(s);
  return {
    topLeft: Nt(!r || l.top || l.left, o.topLeft, 0, i),
    topRight: Nt(!r || l.top || l.right, o.topRight, 0, i),
    bottomLeft: Nt(!r || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: Nt(!r || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function Du(e) {
  const t = Hi(e), n = t.right - t.left, a = t.bottom - t.top, s = Su(e, n / 2, a / 2), o = Mu(e, n / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: n,
      h: a,
      radius: o
    },
    inner: {
      x: t.left + s.l,
      y: t.top + s.t,
      w: n - s.l - s.r,
      h: a - s.t - s.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(s.t, s.l)),
        topRight: Math.max(0, o.topRight - Math.max(s.t, s.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(s.b, s.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(s.b, s.r))
      }
    }
  };
}
function za(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && Hi(e, a);
  return l && (s || Vt(t, l.left, l.right)) && (o || Vt(n, l.top, l.bottom));
}
function Tu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Au(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Na(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + a,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class Bu extends It {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = Du(this), l = Tu(i.radius) ? pa : Au;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, Na(i, n, o)), t.clip(), l(t, Na(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, Na(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return za(this, t, n, a);
  }
  inXRange(t, n) {
    return za(this, t, null, n);
  }
  inYRange(t, n) {
    return za(this, null, t, n);
  }
  getCenterPoint(t) {
    const { x: n, y: a, base: s, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (n + s) / 2 : n,
      y: o ? a : (a + s) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
const So = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, Lu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Mo extends It {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n, a) {
    this.maxWidth = t, this.maxHeight = n, this._margins = a, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let n = Fe(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (n = n.filter((a) => t.filter(a, this.chart.data))), t.sort && (n = n.sort((a, s) => t.sort(a, s, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, s = Je(a.font), o = s.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = So(a, o);
    let c, d;
    n.font = s.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, o, l, r) + 10) : (d = this.maxHeight, c = this._fitCols(i, s, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = s + l;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let m = -1, v = -d;
    return this.legendItems.forEach((g, y) => {
      const b = a + n / 2 + o.measureText(g.text).width;
      (y === 0 || c[c.length - 1] + b + 2 * l > i) && (h += d, c[c.length - (y > 0 ? 0 : 1)] = 0, v += d, m++), r[y] = {
        left: 0,
        top: v,
        row: m,
        width: b,
        height: s
      }, c[c.length - 1] += b + l;
    }), h;
  }
  _fitCols(t, n, a, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = l, m = 0, v = 0, g = 0, y = 0;
    return this.legendItems.forEach((b, f) => {
      const { itemWidth: x, itemHeight: _ } = Pu(a, n, o, b, s);
      f > 0 && v + _ + 2 * l > d && (h += m + l, c.push({
        width: m,
        height: v
      }), g += m + l, y++, m = v = 0), r[f] = {
        left: g,
        top: v,
        col: y,
        width: x,
        height: _
      }, m = Math.max(m, x), v += _ + l;
    }), h += m, c.push({
      width: m,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = pn(o, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = Ge(a, this.left + s, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, r = Ge(a, this.left + s, this.right - this.lineWidths[l])), c.top += this.top + t + s, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + s;
    } else {
      let l = 0, r = Ge(a, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, r = Ge(a, this.top + t + s, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + s, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      cs(t, this), this._draw(), ds(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = He.color, r = pn(t.rtl, this.left, this.width), c = Je(i.font), { padding: d } = i, h = c.size, m = h / 2;
    let v;
    this.drawTitle(), s.textAlign = r.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = c.string;
    const { boxWidth: g, boxHeight: y, itemHeight: b } = So(i, h), f = function(M, S, F) {
      if (isNaN(g) || g <= 0 || isNaN(y) || y < 0)
        return;
      s.save();
      const N = _e(F.lineWidth, 1);
      if (s.fillStyle = _e(F.fillStyle, l), s.lineCap = _e(F.lineCap, "butt"), s.lineDashOffset = _e(F.lineDashOffset, 0), s.lineJoin = _e(F.lineJoin, "miter"), s.lineWidth = N, s.strokeStyle = _e(F.strokeStyle, l), s.setLineDash(_e(F.lineDash, [])), i.usePointStyle) {
        const O = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: F.pointStyle,
          rotation: F.rotation,
          borderWidth: N
        }, A = r.xPlus(M, g / 2), L = S + m;
        vi(s, O, A, L, i.pointStyleWidth && g);
      } else {
        const O = S + Math.max((h - y) / 2, 0), A = r.leftForLtr(M, g), L = mn(F.borderRadius);
        s.beginPath(), Object.values(L).some((V) => V !== 0) ? pa(s, {
          x: A,
          y: O,
          w: g,
          h: y,
          radius: L
        }) : s.rect(A, O, g, y), s.fill(), N !== 0 && s.stroke();
      }
      s.restore();
    }, x = function(M, S, F) {
      jn(s, F.text, M, S + b / 2, c, {
        strikethrough: F.hidden,
        textAlign: r.textAlign(F.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? v = {
      x: Ge(o, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : v = {
      x: this.left + d,
      y: Ge(o, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, $i(this.ctx, t.textDirection);
    const $ = b + d;
    this.legendItems.forEach((M, S) => {
      s.strokeStyle = M.fontColor, s.fillStyle = M.fontColor;
      const F = s.measureText(M.text).width, N = r.textAlign(M.textAlign || (M.textAlign = i.textAlign)), O = g + m + F;
      let A = v.x, L = v.y;
      r.setWidth(this.width), _ ? S > 0 && A + O + d > this.right && (L = v.y += $, v.line++, A = v.x = Ge(o, this.left + d, this.right - a[v.line])) : S > 0 && L + $ > this.bottom && (A = v.x = A + n[v.line].width + d, v.line++, L = v.y = Ge(o, this.top + w + d, this.bottom - n[v.line].height));
      const V = r.x(A);
      if (f(V, L, M), A = vr(N, A + g + m, _ ? A + O : this.right, t.rtl), x(r.x(A), L, M), _)
        v.x += O + d;
      else if (typeof M.text != "string") {
        const I = c.lineHeight;
        v.y += Wi(M, I) + d;
      } else
        v.y += $;
    }), Si(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Je(n.font), s = gt(n.padding);
    if (!n.display)
      return;
    const o = pn(t.rtl, this.left, this.width), i = this.ctx, l = n.position, r = a.size / 2, c = s.top + r;
    let d, h = this.left, m = this.width;
    if (this.isHorizontal())
      m = Math.max(...this.lineWidths), d = this.top + c, h = Ge(t.align, h, this.right - m);
    else {
      const g = this.columnSizes.reduce((y, b) => Math.max(y, b.height), 0);
      d = c + Ge(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const v = Ge(l, h, h + m);
    i.textAlign = o.textAlign(is(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, jn(i, n.text, v, d, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Je(t.font), a = gt(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, s, o;
    if (Vt(t, this.left, this.right) && Vt(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (s = o[a], Vt(t, s.left, s.left + s.width) && Vt(n, s.top, s.top + s.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!Eu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = Lu(s, a);
      s && !o && Fe(n.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = a, a && !o && Fe(n.onHover, [
        t,
        a,
        this
      ], this);
    } else a && Fe(n.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function Pu(e, t, n, a, s) {
  const o = Iu(a, e, t, n), i = Ru(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function Iu(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function Ru(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Wi(t, n)), a;
}
function Wi(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function Eu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var vs = {
  id: "legend",
  _element: Mo,
  start(e, t, n) {
    const a = e.legend = new Mo({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    ht.configure(e, a, n), ht.addBox(e, a);
  },
  stop(e) {
    ht.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    ht.configure(e, a, n), a.options = n;
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
    onClick(e, t, n) {
      const a = t.datasetIndex, s = n.chart;
      s.isDatasetVisible(a) ? (s.hide(a), t.hidden = !0) : (s.show(a), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: a, textAlign: s, color: o, useBorderRadius: i, borderRadius: l } } = e.legend.options;
        return e._getSortedDatasetMetas().map((r) => {
          const c = r.controller.getStyle(n ? 0 : void 0), d = gt(c.borderWidth);
          return {
            text: t[r.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !r.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: a || c.pointStyle,
            rotation: c.rotation,
            textAlign: s || c.textAlign,
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
class ji extends It {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n) {
    const a = this.options;
    if (this.left = 0, this.top = 0, !a.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = n;
    const s = Ke(a.text) ? a.text.length : 1;
    this._padding = gt(a.padding);
    const o = s * Je(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: s, right: o, options: i } = this, l = i.align;
    let r = 0, c, d, h;
    return this.isHorizontal() ? (d = Ge(l, a, o), h = n + t, c = o - a) : (i.position === "left" ? (d = a + t, h = Ge(l, s, n), r = Ee * -0.5) : (d = o - t, h = Ge(l, n, s), r = Ee * 0.5), c = s - n), {
      titleX: d,
      titleY: h,
      maxWidth: c,
      rotation: r
    };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const a = Je(n.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(o);
    jn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: r,
      rotation: c,
      textAlign: is(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function Fu(e, t) {
  const n = new ji({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  ht.configure(e, n, t), ht.addBox(e, n), e.titleBlock = n;
}
var Ki = {
  id: "title",
  _element: ji,
  start(e, t, n) {
    Fu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    ht.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    ht.configure(e, a, n), a.options = n;
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
const Bn = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), s = 0, o = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const r = l.tooltipPosition();
        a.add(r.x), s += r.y, ++o;
      }
    }
    return o === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((l, r) => l + r) / a.size,
      y: s / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, s = Number.POSITIVE_INFINITY, o, i, l;
    for (o = 0, i = e.length; o < i; ++o) {
      const r = e[o].element;
      if (r && r.hasValue()) {
        const c = r.getCenterPoint(), d = qa(t, c);
        d < s && (s = d, l = r);
      }
    }
    if (l) {
      const r = l.tooltipPosition();
      n = r.x, a = r.y;
    }
    return {
      x: n,
      y: a
    };
  }
};
function kt(e, t) {
  return t && (Ke(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function At(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Ou(e, t) {
  const { element: n, datasetIndex: a, index: s } = t, o = e.getDatasetMeta(a).controller, { label: i, value: l } = o.getLabelAndValue(s);
  return {
    chart: e,
    label: i,
    parsed: o.getParsed(s),
    raw: e.data.datasets[a].data[s],
    formattedValue: l,
    dataset: o.getDataset(),
    dataIndex: s,
    datasetIndex: a,
    element: n
  };
}
function Do(e, t) {
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, r = Je(t.bodyFont), c = Je(t.titleFont), d = Je(t.footerFont), h = o.length, m = s.length, v = a.length, g = gt(t.padding);
  let y = g.height, b = 0, f = a.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (f += e.beforeBody.length + e.afterBody.length, h && (y += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), f) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    y += v * w + (f - v) * r.lineHeight + (f - 1) * t.bodySpacing;
  }
  m && (y += t.footerMarginTop + m * d.lineHeight + (m - 1) * t.footerSpacing);
  let x = 0;
  const _ = function(w) {
    b = Math.max(b, n.measureText(w).width + x);
  };
  return n.save(), n.font = c.string, Re(e.title, _), n.font = r.string, Re(e.beforeBody.concat(e.afterBody), _), x = t.displayColors ? i + 2 + t.boxPadding : 0, Re(a, (w) => {
    Re(w.before, _), Re(w.lines, _), Re(w.after, _);
  }), x = 0, n.font = d.string, Re(e.footer, _), n.restore(), b += g.width, {
    width: b,
    height: y
  };
}
function Vu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function zu(e, t, n, a) {
  const { x: s, width: o } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function Nu(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return a === "center" ? c = s <= (l + r) / 2 ? "left" : "right" : s <= o / 2 ? c = "left" : s >= i - o / 2 && (c = "right"), zu(c, e, t, n) && (c = "center"), c;
}
function To(e, t, n) {
  const a = n.yAlign || t.yAlign || Vu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || Nu(e, t, n, a),
    yAlign: a
  };
}
function Hu(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function Wu(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function Ao(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: r } = n, c = s + o, { topLeft: d, topRight: h, bottomLeft: m, bottomRight: v } = mn(i);
  let g = Hu(t, l);
  const y = Wu(t, r, c);
  return r === "center" ? l === "left" ? g += c : l === "right" && (g -= c) : l === "left" ? g -= Math.max(d, m) + s : l === "right" && (g += Math.max(h, v) + s), {
    x: Qe(g, 0, a.width - t.width),
    y: Qe(y, 0, a.height - t.height)
  };
}
function ia(e, t, n) {
  const a = gt(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Bo(e) {
  return kt([], At(e));
}
function ju(e, t, n) {
  return cn(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Lo(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Yi = {
  beforeTitle: Dt,
  title(e) {
    if (e.length > 0) {
      const t = e[0], n = t.chart.data.labels, a = n ? n.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (a > 0 && t.dataIndex < a)
        return n[t.dataIndex];
    }
    return "";
  },
  afterTitle: Dt,
  beforeBody: Dt,
  beforeLabel: Dt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return Ie(n) || (t += n), t;
  },
  labelColor(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: n.borderColor,
      backgroundColor: n.backgroundColor,
      borderWidth: n.borderWidth,
      borderDash: n.borderDash,
      borderDashOffset: n.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      pointStyle: n.pointStyle,
      rotation: n.rotation
    };
  },
  afterLabel: Dt,
  afterBody: Dt,
  beforeFooter: Dt,
  footer: Dt,
  afterFooter: Dt
};
function at(e, t, n, a) {
  const s = e[t].call(n, a);
  return typeof s > "u" ? Yi[t].call(n, a) : s;
}
class Po extends It {
  static positioners = Bn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), s = a.enabled && n.options.animation && a.animations, o = new Di(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = ju(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, s = at(a, "beforeTitle", this, t), o = at(a, "title", this, t), i = at(a, "afterTitle", this, t);
    let l = [];
    return l = kt(l, At(s)), l = kt(l, At(o)), l = kt(l, At(i)), l;
  }
  getBeforeBody(t, n) {
    return Bo(at(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, s = [];
    return Re(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = Lo(a, o);
      kt(i.before, At(at(l, "beforeLabel", this, o))), kt(i.lines, at(l, "label", this, o)), kt(i.after, At(at(l, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, n) {
    return Bo(at(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, s = at(a, "beforeFooter", this, t), o = at(a, "footer", this, t), i = at(a, "afterFooter", this, t);
    let l = [];
    return l = kt(l, At(s)), l = kt(l, At(o)), l = kt(l, At(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, s = [], o = [], i = [];
    let l = [], r, c;
    for (r = 0, c = n.length; r < c; ++r)
      l.push(Ou(this.chart, n[r]));
    return t.filter && (l = l.filter((d, h, m) => t.filter(d, h, m, a))), t.itemSort && (l = l.sort((d, h) => t.itemSort(d, h, a))), Re(l, (d) => {
      const h = Lo(t.callbacks, d);
      s.push(at(h, "labelColor", this, d)), o.push(at(h, "labelPointStyle", this, d)), i.push(at(h, "labelTextColor", this, d));
    }), this.labelColors = s, this.labelPointStyles = o, this.labelTextColors = i, this.dataPoints = l, l;
  }
  update(t, n) {
    const a = this.options.setContext(this.getContext()), s = this._active;
    let o, i = [];
    if (!s.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const l = Bn[a.position].call(this, s, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const r = this._size = Do(this, a), c = Object.assign({}, l, r), d = To(this.chart, a, c), h = Ao(a, c, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: r.width,
        height: r.height,
        caretX: l.x,
        caretY: l.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: n
    });
  }
  drawCaret(t, n, a, s) {
    const o = this.getCaretPosition(t, a, s);
    n.lineTo(o.x1, o.y1), n.lineTo(o.x2, o.y2), n.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, n, a) {
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: r, topRight: c, bottomLeft: d, bottomRight: h } = mn(l), { x: m, y: v } = t, { width: g, height: y } = n;
    let b, f, x, _, w, $;
    return o === "center" ? (w = v + y / 2, s === "left" ? (b = m, f = b - i, _ = w + i, $ = w - i) : (b = m + g, f = b + i, _ = w - i, $ = w + i), x = b) : (s === "left" ? f = m + Math.max(r, d) + i : s === "right" ? f = m + g - Math.max(c, h) - i : f = this.caretX, o === "top" ? (_ = v, w = _ - i, b = f - i, x = f + i) : (_ = v + y, w = _ + i, b = f + i, x = f - i), $ = _), {
      x1: b,
      x2: f,
      x3: x,
      y1: _,
      y2: w,
      y3: $
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, r;
    if (o) {
      const c = pn(a.rtl, this.x, this.width);
      for (t.x = ia(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Je(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, r = 0; r < o; ++r)
        n.fillText(s[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: r, boxWidth: c } = o, d = Je(o.bodyFont), h = ia(this, "left", o), m = s.x(h), v = r < d.lineHeight ? (d.lineHeight - r) / 2 : 0, g = n.y + v;
    if (o.usePointStyle) {
      const y = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, b = s.leftForLtr(m, c) + c / 2, f = g + r / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ga(t, y, b, f), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ga(t, y, b, f);
    } else {
      t.lineWidth = Ae(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const y = s.leftForLtr(m, c), b = s.leftForLtr(s.xPlus(m, 1), c - 2), f = mn(i.borderRadius);
      Object.values(f).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, pa(t, {
        x: y,
        y: g,
        w: c,
        h: r,
        radius: f
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), pa(t, {
        x: b,
        y: g + 1,
        w: c - 2,
        h: r - 2,
        radius: f
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(y, g, c, r), t.strokeRect(y, g, c, r), t.fillStyle = i.backgroundColor, t.fillRect(b, g + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: d } = a, h = Je(a.bodyFont);
    let m = h.lineHeight, v = 0;
    const g = pn(a.rtl, this.x, this.width), y = function(F) {
      n.fillText(F, g.x(t.x + v), t.y + m / 2), t.y += m + o;
    }, b = g.textAlign(i);
    let f, x, _, w, $, M, S;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = ia(this, b, a), n.fillStyle = a.bodyColor, Re(this.beforeBody, y), v = l && b !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, M = s.length; w < M; ++w) {
      for (f = s[w], x = this.labelTextColors[w], n.fillStyle = x, Re(f.before, y), _ = f.lines, l && _.length && (this._drawColorBox(n, t, w, g, a), m = Math.max(h.lineHeight, r)), $ = 0, S = _.length; $ < S; ++$)
        y(_[$]), m = h.lineHeight;
      Re(f.after, y);
    }
    v = 0, m = h.lineHeight, Re(this.afterBody, y), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const r = pn(a.rtl, this.x, this.width);
      for (t.x = ia(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = r.textAlign(a.footerAlign), n.textBaseline = "middle", i = Je(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: d } = a, { topLeft: h, topRight: m, bottomLeft: v, bottomRight: g } = mn(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, r), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + c - m, r), n.quadraticCurveTo(l + c, r, l + c, r + m), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + c, r + d - g), n.quadraticCurveTo(l + c, r + d, l + c - g, r + d), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + v, r + d), n.quadraticCurveTo(l, r + d, l, r + d - v), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, r + h), n.quadraticCurveTo(l, r, l + h, r), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, s = a && a.x, o = a && a.y;
    if (s || o) {
      const i = Bn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = Do(this, t), r = Object.assign({}, i, this._size), c = To(n, t, r), d = Ao(t, r, c, n);
      (s._to !== d.x || o._to !== d.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, d));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const n = this.options.setContext(this.getContext());
    let a = this.opacity;
    if (!a)
      return;
    this._updateAnimationTarget(n);
    const s = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    a = Math.abs(a) < 1e-3 ? 0 : a;
    const i = gt(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, s, n), $i(t, n.textDirection), o.y += i.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), Si(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, s = t.map(({ datasetIndex: l, index: r }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[r],
        index: r
      };
    }), o = !fa(a, s), i = this._positionChanged(s, n);
    (o || i) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, n, a), l = this._positionChanged(i, t), r = n || !fa(i, o) || l;
    return r && (this._active = i, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), r;
  }
  _getActiveElements(t, n, a, s) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!s)
      return n.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, o.mode, o, a);
    return o.reverse && i.reverse(), i;
  }
  _positionChanged(t, n) {
    const { caretX: a, caretY: s, options: o } = this, i = Bn[o.position].call(this, t, n);
    return i !== !1 && (a !== i.x || s !== i.y);
  }
}
var ys = {
  id: "tooltip",
  _element: Po,
  positioners: Bn,
  afterInit(e, t, n) {
    n && (e.tooltip = new Po({
      chart: e,
      options: n
    }));
  },
  beforeUpdate(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  reset(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const n = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", {
        ...n,
        cancelable: !0
      }) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", n);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const n = t.replay;
      e.tooltip.handleEvent(t.event, n, t.inChartArea) && (t.changed = !0);
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
    callbacks: Yi
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
const Ku = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Yu(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return Ku(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const Uu = (e, t) => e === null ? null : Qe(Math.round(e), 0, t);
function Io(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ui extends xn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Io
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const a = this.getLabels();
      for (const { index: s, label: o } of n)
        a[s] === o && a.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, n) {
    if (Ie(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Yu(a, t, _e(n, t), this._addedLabels), Uu(n, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let { min: a, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), n || (s = this.getLabels().length - 1)), this.min = a, this.max = s;
  }
  buildTicks() {
    const t = this.min, n = this.max, a = this.options.offset, s = [];
    let o = this.getLabels();
    o = t === 0 && n === o.length - 1 ? o : o.slice(t, n + 1), this._valueRange = Math.max(o.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let i = t; i <= n; i++)
      s.push({
        value: i
      });
    return s;
  }
  getLabelForValue(t) {
    return Io.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function qu(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: r, count: c, maxTicks: d, maxDigits: h, includeBounds: m } = e, v = o || 1, g = d - 1, { min: y, max: b } = t, f = !Ie(i), x = !Ie(l), _ = !Ie(c), w = (b - y) / (h + 1);
  let $ = Is((b - y) / g / v) * v, M, S, F, N;
  if ($ < 1e-14 && !f && !x)
    return [
      {
        value: y
      },
      {
        value: b
      }
    ];
  N = Math.ceil(b / $) - Math.floor(y / $), N > g && ($ = Is(N * $ / g / v) * v), Ie(r) || (M = Math.pow(10, r), $ = Math.ceil($ * M) / M), s === "ticks" ? (S = Math.floor(y / $) * $, F = Math.ceil(b / $) * $) : (S = y, F = b), f && x && o && cr((l - i) / o, $ / 1e3) ? (N = Math.round(Math.min((l - i) / $, d)), $ = (l - i) / N, S = i, F = l) : _ ? (S = f ? i : S, F = x ? l : F, N = c - 1, $ = (F - S) / N) : (N = (F - S) / $, Pn(N, Math.round(N), $ / 1e3) ? N = Math.round(N) : N = Math.ceil(N));
  const O = Math.max(Rs($), Rs(S));
  M = Math.pow(10, Ie(r) ? O : r), S = Math.round(S * M) / M, F = Math.round(F * M) / M;
  let A = 0;
  for (f && (m && S !== i ? (n.push({
    value: i
  }), S < i && A++, Pn(Math.round((S + A * $) * M) / M, i, Ro(i, w, e)) && A++) : S < i && A++); A < N; ++A) {
    const L = Math.round((S + A * $) * M) / M;
    if (x && L > l)
      break;
    n.push({
      value: L
    });
  }
  return x && m && F !== l ? n.length && Pn(n[n.length - 1].value, l, Ro(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!x || F === l) && n.push({
    value: F
  }), n;
}
function Ro(e, t, { horizontal: n, minRotation: a }) {
  const s = Lt(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Xu extends xn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return Ie(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: s, max: o } = this;
    const i = (r) => s = n ? s : r, l = (r) => o = a ? o : r;
    if (t) {
      const r = $t(s), c = $t(o);
      r < 0 && c < 0 ? l(0) : r > 0 && c > 0 && i(0);
    }
    if (s === o) {
      let r = o === 0 ? 1 : Math.abs(o * 0.05);
      l(o + r), t || i(s - r);
    }
    this.min = s, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: n, stepSize: a } = t, s;
    return a ? (s = Math.ceil(this.max / a) - Math.floor(this.min / a) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), n = n || 11), n && (s = Math.min(n, s)), s;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let a = this.getTickLimit();
    a = Math.max(2, a);
    const s = {
      maxTicks: a,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: n.precision,
      step: n.stepSize,
      count: n.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: n.minRotation || 0,
      includeBounds: n.includeBounds !== !1
    }, o = this._range || this, i = qu(s, o);
    return t.bounds === "ticks" && dr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, a = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const s = (a - n) / Math.max(t.length - 1, 1) / 2;
      n -= s, a += s;
    }
    this._startValue = n, this._endValue = a, this._valueRange = a - n;
  }
  getLabelForValue(t) {
    return rs(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class qi extends Xu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: bi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ft(t) ? t : 0, this.max = ft(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = Lt(this.options.ticks.minRotation), s = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Sa = {
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
}, it = /* @__PURE__ */ Object.keys(Sa);
function Eo(e, t) {
  return e - t;
}
function Fo(e, t) {
  if (Ie(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), ft(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && (Nn(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function Oo(e, t, n, a) {
  const s = it.length;
  for (let o = it.indexOf(e); o < s - 1; ++o) {
    const i = Sa[it[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return it[o];
  }
  return it[s - 1];
}
function Gu(e, t, n, a, s) {
  for (let o = it.length - 1; o >= it.indexOf(n); o--) {
    const i = it[o];
    if (Sa[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return it[n ? it.indexOf(n) : 0];
}
function Zu(e) {
  for (let t = it.indexOf(e) + 1, n = it.length; t < n; ++t)
    if (Sa[it[t]].common)
      return it[t];
}
function Vo(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: s } = os(n, t), o = n[a] >= t ? n[a] : n[s];
    e[o] = !0;
  }
}
function Qu(e, t, n, a) {
  const s = e._adapter, o = +s.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, r;
  for (l = o; l <= i; l = +s.add(l, 1, a))
    r = n[l], r >= 0 && (t[r].major = !0);
  return t;
}
function zo(e, t, n) {
  const a = [], s = {}, o = t.length;
  let i, l;
  for (i = 0; i < o; ++i)
    l = t[i], s[l] = i, a.push({
      value: l,
      major: !1
    });
  return o === 0 || !n ? a : Qu(e, a, s, n);
}
class No extends xn {
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
  init(t, n = {}) {
    const a = t.time || (t.time = {}), s = this._adapter = new Jc._date(t.adapters.date);
    s.init(n), Ln(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Fo(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, n = this._adapter, a = t.time.unit || "day";
    let { min: s, max: o, minDefined: i, maxDefined: l } = this.getUserBounds();
    function r(c) {
      !i && !isNaN(c.min) && (s = Math.min(s, c.min)), !l && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), s = ft(s) && !isNaN(s) ? s : +n.startOf(Date.now(), a), o = ft(o) && !isNaN(o) ? o : +n.endOf(Date.now(), a) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let n = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
    return t.length && (n = t[0], a = t[t.length - 1]), {
      min: n,
      max: a
    };
  }
  buildTicks() {
    const t = this.options, n = t.time, a = t.ticks, s = a.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
    const o = this.min, i = this.max, l = mr(s, o, i);
    return this._unit = n.unit || (a.autoSkip ? Oo(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Gu(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Zu(this._unit), this.initOffsets(s), t.reverse && l.reverse(), zo(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Qe(n, 0, i), a = Qe(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || Oo(o.minUnit, n, a, this._getLabelCapacity(n)), l = _e(s.ticks.stepSize, 1), r = i === "week" ? o.isoWeekday : !1, c = Nn(r) || r === !0, d = {};
    let h = n, m, v;
    if (c && (h = +t.startOf(h, "isoWeek", r)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const g = s.ticks.source === "data" && this.getDataTimestamps();
    for (m = h, v = 0; m < a; m = +t.add(m, l, i), v++)
      Vo(d, m, g);
    return (m === a || s.bounds === "ticks" || v === 1) && Vo(d, m, g), Object.keys(d).sort(Eo).map((y) => +y);
  }
  getLabelForValue(t) {
    const n = this._adapter, a = this.options.time;
    return a.tooltipFormat ? n.format(t, a.tooltipFormat) : n.format(t, a.displayFormats.datetime);
  }
  format(t, n) {
    const s = this.options.time.displayFormats, o = this._unit, i = n || s[o];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, n, a, s) {
    const o = this.options, i = o.ticks.callback;
    if (i)
      return Fe(i, [
        t,
        n,
        a
      ], this);
    const l = o.time.displayFormats, r = this._unit, c = this._majorUnit, d = r && l[r], h = c && l[c], m = a[n], v = c && h && m && m.major;
    return this._adapter.format(t, s || (v ? h : d));
  }
  generateTickLabels(t) {
    let n, a, s;
    for (n = 0, a = t.length; n < a; ++n)
      s = t[n], s.label = this._tickFormatFunction(s.value, n, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const n = this._offsets, a = this.getDecimalForValue(t);
    return this.getPixelForDecimal((n.start + a) * n.factor);
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return this.min + a * (this.max - this.min);
  }
  _getLabelSize(t) {
    const n = this.options.ticks, a = this.ctx.measureText(t).width, s = Lt(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), i = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + l * i,
      h: a * i + l * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, s = a[n.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, zo(this, [
      t
    ], this._majorUnit), s), i = this._getLabelSize(o), l = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return l > 0 ? l : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, a;
    if (t.length)
      return t;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return this._cache.data = s[0].controller.getAllParsedValues(this);
    for (n = 0, a = s.length; n < a; ++n)
      t = t.concat(s[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, a;
    if (t.length)
      return t;
    const s = this.getLabels();
    for (n = 0, a = s.length; n < a; ++n)
      t.push(Fo(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return gi(t.sort(Eo));
  }
}
function la(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, r;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = an(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: r } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = an(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: r } = e[s]);
  const c = i - o;
  return c ? l + (r - l) * (t - o) / c : l;
}
class H$ extends No {
  static id = "timeseries";
  static defaults = No.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = la(n, this.min), this._tableRange = la(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, s = [], o = [];
    let i, l, r, c, d;
    for (i = 0, l = t.length; i < l; ++i)
      c = t[i], c >= n && c <= a && s.push(c);
    if (s.length < 2)
      return [
        {
          time: n,
          pos: 0
        },
        {
          time: a,
          pos: 1
        }
      ];
    for (i = 0, l = s.length; i < l; ++i)
      d = s[i + 1], r = s[i - 1], c = s[i], Math.round((d + r) / 2) !== c && o.push({
        time: c,
        pos: i / (l - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, n = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(t) || !a.length) && a.splice(0, 0, t), (!a.includes(n) || a.length === 1) && a.push(n), a.sort((s, o) => s - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return n.length && a.length ? t = this.normalize(n.concat(a)) : t = n.length ? n : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (la(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return la(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Xi = {
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
}, Ju = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, eh = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Xi,
  ...Ju
}, th = wl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function gn(e) {
  return ai(e) ? Ya(e) : e;
}
function nh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return ai(t) ? new Proxy(e, {}) : e;
}
function ah(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Gi(e, t) {
  e.labels = t;
}
function Zi(e, t, n) {
  const a = [];
  e.datasets = t.map((s) => {
    const o = e.datasets.find((i) => i[n] === s[n]);
    return !o || !s.data || a.includes(o) ? {
      ...s
    } : (a.push(o), Object.assign(o, s), o);
  });
}
function sh(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Gi(n, e.labels), Zi(n, e.datasets, t), n;
}
const oh = le({
  props: eh,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = oe(null), o = ni(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: c, data: d, options: h, plugins: m, datasetIdKey: v } = e, g = sh(d, v), y = nh(g, d);
      o.value = new Ut(s.value, {
        type: c,
        data: y,
        options: {
          ...h
        },
        plugins: m
      });
    }, l = () => {
      const c = Ya(o.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), o.value = null;
      }, e.destroyDelay) : (c.destroy(), o.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return tt(i), pt(l), Oe([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, m] = c, [v, g] = d;
      const y = Ya(o.value);
      if (!y)
        return;
      let b = !1;
      if (h) {
        const f = gn(h), x = gn(v);
        f && f !== x && (ah(y, f), b = !0);
      }
      if (m) {
        const f = gn(m.labels), x = gn(g.labels), _ = gn(m.datasets), w = gn(g.datasets);
        f !== x && (Gi(y.config.data, f), b = !0), _ && _ !== w && (Zi(y.config.data, _, e.datasetIdKey), b = !0);
      }
      b && We(() => {
        r(y);
      });
    }, {
      deep: !0
    }), () => Ka("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: s
    }, [
      Ka("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function xs(e, t) {
  return Ut.register(t), le({
    props: Xi,
    setup(n, a) {
      let { expose: s } = a;
      const o = ni(null), i = (l) => {
        o.value = l?.chart;
      };
      return s({
        chart: o
      }), () => Ka(oh, th({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const ih = /* @__PURE__ */ xs("bar", qc), lh = /* @__PURE__ */ xs("line", Zc), rh = /* @__PURE__ */ xs("pie", Qc), Ho = {
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
}, Wo = {
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
}, ch = [
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
function Se(e) {
  const t = oe("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = C(() => e?.value ? e.value : t.value), o = C(() => s.value === "dark"), i = C(() => o.value ? Wo : Ho), l = () => {
    typeof document > "u" || (t.value = a(), n = new MutationObserver((c) => {
      for (const d of c)
        d.attributeName === "class" && (t.value = a());
    }), n.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, r = () => {
    n && (n.disconnect(), n = null);
  };
  return tt(() => {
    l();
  }), pt(() => {
    r();
  }), e && Oe(e, () => {
  }), {
    isDark: o,
    currentTheme: s,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Ho,
    darkColors: Wo,
    chartSeriesColors: ch
  };
}
const xa = 5, _s = 8, dh = /^x\d*$/, uh = /^y\d*$/;
function Qi(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const s of Object.keys(a)) {
    const o = a[s];
    if (!o || typeof o != "object") continue;
    const i = { ...o }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (dh.test(s) && (r.maxTicksLimit = _s, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), uh.test(s))
      if (Array.isArray(r.values) && r.values.length > 0)
        r.maxTicksLimit = r.values.length;
      else if (r.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), d = Number(i.max ?? i.suggestedMax ?? 0), h = Number(r.stepSize);
        d > c && h > 0 ? r.maxTicksLimit = Math.floor((d - c) / h) + 1 : r.maxTicksLimit = xa;
      } else
        r.maxTicksLimit = xa;
    i.ticks = r, a[s] = i;
  }
  return t.scales = a, t;
}
const st = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", hh = ["titleFont", "bodyFont", "footerFont"];
function Ji(e, t = st) {
  if (!e || typeof e != "object") return e;
  const n = { ...e }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: t }, n.scales && typeof n.scales == "object") {
    const s = { ...n.scales };
    for (const o of Object.keys(s)) {
      const i = s[o];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, r = l.ticks;
      if (r && typeof r == "object") {
        const d = { ...r }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, l.ticks = d;
      }
      const c = l.title;
      if (c && typeof c == "object") {
        const d = { ...c }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, l.title = d;
      }
      s[o] = l;
    }
    n.scales = s;
  }
  if (n.plugins && typeof n.plugins == "object") {
    const s = { ...n.plugins }, o = s.legend;
    if (o && typeof o == "object") {
      const l = { ...o }, r = l.labels;
      if (r && typeof r == "object") {
        const c = { ...r }, d = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...d, family: t }, l.labels = c;
      }
      s.legend = l;
    }
    const i = s.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const r of hh) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      s.tooltip = l;
    }
    n.plugins = s;
  }
  return n;
}
const fh = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, jo = 10, gh = /* @__PURE__ */ le({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ut.register(Ui, qi, Bu, Ki, ys, vs), Ut.defaults.font.family = st;
    const { isDark: a, colors: s } = Se($e(n, "theme")), o = C(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
    function r(d, h) {
      if (h == null) return d;
      if (Array.isArray(h) || typeof h != "object" || d == null || Array.isArray(d) || typeof d != "object") return h;
      const m = { ...d };
      for (const v of Object.keys(h)) {
        const g = h[v];
        g !== void 0 && (m[v] = r(d[v], g));
      }
      return m;
    }
    const c = C(() => {
      const d = {
        font: {
          family: st
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
                family: st,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: jo,
              boxHeight: jo,
              usePointStyle: !1,
              generateLabels: function(m) {
                return m.data.datasets.map((g, y) => {
                  const b = Array.isArray(g.backgroundColor) ? g.backgroundColor[0] : g.backgroundColor, f = Array.isArray(g.borderColor) ? g.borderColor[0] : g.borderColor, x = typeof f == "string" && f.length > 0 ? f : typeof b == "string" && b.length > 0 ? b : s.value.textSecondary;
                  return {
                    text: l(g.label || ""),
                    fillStyle: typeof b == "string" ? b : x,
                    strokeStyle: x,
                    lineWidth: 0,
                    fontColor: x,
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
            backgroundColor: s.value.tooltipBg,
            titleColor: s.value.tooltipText,
            bodyColor: a.value ? "#d1d5db" : "#e2e8f0",
            borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: !0,
            titleFont: {
              family: st,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: st,
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
                return v && (v += ": "), m.parsed.y !== null && (v += m.parsed.y), v;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: !0,
            stacked: n.stacked || !1,
            border: {
              display: !1
            },
            grid: {
              display: !1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: xa,
              font: {
                family: st,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(m) {
                return i(m);
              }
            }
          },
          x: {
            stacked: n.stacked || !1,
            offset: !0,
            border: {
              display: !1
            },
            grid: {
              display: !1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: _s,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: st,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
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
      }, h = n.options ? r(d, n.options) : d;
      return Ji(
        Qi(h)
      );
    });
    return t({ isDark: a }), (d, h) => (p(), k("div", fh, [
      E(T(ih), {
        data: o.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), me = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, St = /* @__PURE__ */ me(gh, [["__scopeId", "data-v-ee7ca6f2"]]), mh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, ph = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, bh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, vh = ["aria-pressed", "aria-label", "onClick"], yh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, xh = /* @__PURE__ */ le({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ut.register(
      Ui,
      qi,
      $u,
      Cu,
      Ki,
      ys,
      vs
    ), Ut.defaults.font.family = st;
    const a = oe(null), { isDark: s, colors: o } = Se($e(n, "theme")), i = C(() => o.value.bgCard), l = C(() => {
      const b = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((f) => {
          const x = f.borderColor, _ = Array.isArray(x) ? x[0] : x, w = typeof _ == "string" && _.length > 0 ? _ : o.value.textSecondary, $ = f.pointBackgroundColor !== void 0 ? f.pointBackgroundColor : b, M = f.pointHoverBackgroundColor !== void 0 ? f.pointHoverBackgroundColor : $, S = f.pointBorderWidth ?? 2, F = f.pointHoverBorderWidth ?? S;
          return {
            ...f,
            fill: f.fill ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: M,
            pointBorderColor: f.pointBorderColor ?? w,
            pointHoverBorderColor: f.pointHoverBorderColor ?? w,
            pointBorderWidth: S,
            pointHoverBorderWidth: F
          };
        })
      };
    }), r = (b) => typeof b == "string" ? b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() : b, c = (b) => typeof b != "string" ? b : n.uppercaseLegendLabels ? b.toUpperCase() : r(b);
    function d(b) {
      const f = b.borderColor, x = Array.isArray(f) ? f[0] : f;
      return typeof x == "string" && x.length > 0 ? x : o.value.textSecondary;
    }
    const h = C(
      () => l.value.datasets.map((b, f) => ({
        key: `${b.label ?? "dataset"}-${f}`,
        label: c(b.label || ""),
        color: d(b)
      }))
    ), m = oe([]);
    Oe(
      () => l.value.datasets.length,
      (b) => {
        const f = Array.from({ length: b }, (x, _) => m.value[_] ?? !0);
        m.value = f;
      },
      { immediate: !0 }
    );
    function v(b) {
      const x = a.value?.chart;
      if (!x || b < 0 || b >= x.data.datasets.length) return;
      const _ = !x.isDatasetVisible(b);
      x.setDatasetVisibility(b, _), m.value[b] = _, x.update();
    }
    function g(b, f) {
      if (f == null) return b;
      if (Array.isArray(f) || typeof f != "object" || b == null || Array.isArray(b) || typeof b != "object") return f;
      const x = { ...b };
      for (const _ of Object.keys(f)) {
        const w = f[_];
        w !== void 0 && (x[_] = g(b[_], w));
      }
      return x;
    }
    const y = C(() => {
      const b = {
        font: {
          family: st
        },
        color: o.value.textSecondary,
        responsive: !0,
        maintainAspectRatio: !1,
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
            backgroundColor: o.value.tooltipBg,
            titleColor: o.value.tooltipText,
            bodyColor: o.value.textSecondary,
            borderColor: o.value.tooltipBorder,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: !0,
            titleFont: {
              family: st,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: st,
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
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: _s,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: st,
                size: 11
              },
              color: o.value.textSecondary
            }
          },
          y: {
            type: "linear",
            display: !0,
            position: "left",
            beginAtZero: !0,
            grid: {
              color: o.value.gridLines
            },
            ticks: {
              maxTicksLimit: xa,
              font: {
                family: st,
                size: 11
              },
              color: o.value.textSecondary
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
      }, f = n.options ? g(b, n.options) : b;
      return Ji(
        Qi(f)
      );
    });
    return t({ isDark: s }), (b, f) => (p(), k("div", mh, [
      u("div", ph, [
        E(T(lh), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: y.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (p(), k("ul", bh, [
        (p(!0), k(se, null, he(h.value, (x, _) => (p(), k("li", {
          key: x.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: J(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", m.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: Me({ color: x.color }),
            "aria-pressed": m.value[_] !== !1,
            "aria-label": `${x.label}. ${m.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => v(_)
          }, [
            u("span", yh, [
              f[0] || (f[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: Me({ borderColor: x.color })
              }, null, 4),
              f[1] || (f[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, D(x.label), 1)
          ], 14, vh)
        ]))), 128))
      ])) : z("", !0)
    ]));
  }
}), yt = /* @__PURE__ */ me(xh, [["__scopeId", "data-v-fc764ffb"]]), _h = { class: "chart-container" }, kh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", wh = /* @__PURE__ */ le({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ut.register(gu, ys, vs);
    const { isDark: a, colors: s } = Se($e(n, "theme")), o = n.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = C(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      cutout: n.doughnut ? "60%" : 0,
      plugins: {
        legend: {
          display: !0,
          position: "bottom",
          align: "center",
          labels: {
            font: {
              family: kh,
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
              return c.labels.length && c.datasets.length ? c.labels.map((d, h) => {
                const v = r.getDatasetMeta(0).controller.getStyle(h), y = c.datasets[0].data[h], b = typeof v.backgroundColor == "string" && v.backgroundColor.length > 0 ? v.backgroundColor : s.value.textSecondary;
                return {
                  text: `${i(d)}: ${y}`,
                  fillStyle: v.backgroundColor,
                  strokeStyle: v.borderColor,
                  lineWidth: v.borderWidth,
                  lineDash: v.borderDash,
                  lineDashOffset: v.borderDashOffset,
                  lineJoin: v.borderJoinStyle,
                  fontColor: b,
                  hidden: !r.getDataVisibility(h),
                  index: h
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
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
            title: function(r) {
              return r.length > 0 ? String(i(r[0].label)) : "";
            },
            label: function(r) {
              const c = r.label || "", d = r.parsed || 0, h = r.dataset.data.reduce((v, g) => v + g, 0), m = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${m}%)`;
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
    return t({ isDark: a }), (r, c) => (p(), k("div", _h, [
      E(T(rh), {
        data: T(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Ma = /* @__PURE__ */ me(wh, [["__scopeId", "data-v-0f7806d6"]]), Ch = { class: "chart-container" }, $h = ["viewBox"], Sh = ["transform"], Mh = ["x", "width", "fill", "stroke"], Dh = ["fill"], Th = ["x1", "y1", "x2", "y2", "stroke"], Ah = ["points", "fill"], Bh = ["x1", "y1", "x2", "y2", "stroke"], Lh = ["x", "y", "fill"], Ph = ["x1", "y1", "x2", "y2", "stroke"], Ih = ["points", "fill"], Rh = ["transform"], Eh = ["y1", "y2"], Fh = ["y1", "y2"], Oh = ["y1", "y2"], Vh = ["y1", "y2"], zh = ["y", "height"], Nh = ["y1", "y2"], Hh = ["y1", "y2"], Wh = ["y1", "y2"], jh = ["y1", "y2"], Kh = ["y", "height"], Yh = ["cy", "stroke", "onMouseenter"], Uh = ["cy", "stroke", "onMouseenter"], qh = ["cy", "stroke", "onMouseenter"], Xh = ["cy", "stroke", "onMouseenter"], Gh = ["y1", "y2", "onMouseenter"], Zh = ["y1", "y2", "onMouseenter"], Qh = ["x", "y", "fill"], Jh = ["x", "y", "fill"], ef = ["transform"], tf = { transform: "translate(-200, 0)" }, nf = ["stroke"], af = ["fill"], sf = { transform: "translate(-130, 0)" }, of = ["stroke"], lf = ["fill"], rf = { transform: "translate(-60, 0)" }, cf = ["stroke"], df = ["fill"], uf = { transform: "translate(10, 0)" }, hf = ["stroke"], ff = ["fill"], gf = { transform: "translate(80, 0)" }, mf = ["fill"], pf = { transform: "translate(150, 0)" }, bf = ["fill"], vf = /* @__PURE__ */ le({
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
    const n = e, { isDark: a } = Se($e(n, "theme")), s = C(() => ({
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
    })), o = oe({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, l = (m, v) => {
      const g = m.currentTarget.closest("svg");
      if (!g) return;
      const y = g.getBoundingClientRect(), b = g.createSVGPoint();
      b.x = m.clientX - y.left, b.y = m.clientY - y.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: v
      };
    }, r = (m) => {
      if (o.value.visible) {
        const v = m.currentTarget, g = v.getBoundingClientRect(), y = v.createSVGPoint();
        y.x = m.clientX - g.left, y.y = m.clientY - g.top, o.value.x = y.x, o.value.y = y.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, d = () => {
      o.value.visible = !1;
    }, h = C(() => {
      const m = [], g = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let y = 1; y <= 10; y++) {
        const b = y, f = (b - 1) / 9, x = n.chartMargin + g - f * g;
        m.push({ value: b, y: x });
      }
      return m;
    });
    return t({ isDark: a }), (m, v) => (p(), k("div", Ch, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Me(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        o.value.visible ? (p(), k("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          u("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: o.value.text.length * 12 + 20,
            height: "24",
            fill: s.value.tooltipBg,
            rx: "6",
            stroke: s.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Mh),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, D(o.value.text), 9, Dh)
        ], 8, Sh)) : z("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Th),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, Ah),
        (p(!0), k(se, null, he(h.value, (g, y) => (p(), k(se, { key: y }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Bh),
          u("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(g.value), 9, Lh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Ph),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, Ih),
        (p(!0), k(se, null, he(e.boxplotData, (g, y) => (p(), k(se, { key: y }, [
          u("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (p(), k(se, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Eh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Fh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Oh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Vh),
              u("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, zh)
            ], 64)) : (p(), k(se, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Nh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Hh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Wh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, jh),
              u("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Kh)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Yh),
            u("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Uh),
            u("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, qh),
            u("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Xh),
            u("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (b) => l(b, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Gh),
            g.averageY ? (p(), k("line", {
              key: 2,
              x1: -24,
              y1: g.averageY,
              x2: 24,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => l(b, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Zh)) : z("", !0)
          ], 8, Rh),
          u("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(i(g.label)), 9, Qh),
          g.responseCount ? (p(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(g.responseCount), 9, Jh)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (p(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", tf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, nf),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, af)
          ]),
          u("g", sf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, of),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, lf)
          ]),
          u("g", rf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, cf),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, df)
          ]),
          u("g", uf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, hf),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, ff)
          ]),
          u("g", gf, [
            v[0] || (v[0] = u("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "18",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, mf)
          ]),
          u("g", pf, [
            v[1] || (v[1] = u("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            u("text", {
              x: "18",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, bf)
          ])
        ], 8, ef)) : z("", !0)
      ], 44, $h))
    ]));
  }
}), yf = /* @__PURE__ */ me(vf, [["__scopeId", "data-v-9ac5c075"]]), xf = { class: "chart-container" }, _f = ["viewBox"], kf = ["x1", "y1", "x2", "y2", "stroke"], wf = ["points", "fill"], Cf = ["x1", "y1", "x2", "y2", "stroke"], $f = ["x1", "y1", "x2", "y2", "stroke"], Sf = ["x", "y", "fill"], Mf = ["x", "y", "fill", "transform"], Df = ["x1", "y1", "x2", "y2", "stroke"], Tf = ["points", "fill"], Af = ["transform"], Bf = ["y1", "y2", "stroke", "onMouseenter"], Lf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Pf = ["x1", "y1", "x2", "y2", "onMouseenter"], If = ["x1", "y1", "x2", "y2", "onMouseenter"], Rf = ["cy", "stroke", "onMouseenter"], Ef = ["cy", "stroke", "onMouseenter"], Ff = ["x", "y", "fill"], Of = ["x", "y", "fill"], Vf = ["transform"], zf = { transform: "translate(-180, 0)" }, Nf = ["stroke"], Hf = ["fill"], Wf = { transform: "translate(-120, 0)" }, jf = ["fill"], Kf = { transform: "translate(-60, 0)" }, Yf = ["fill"], Uf = { transform: "translate(0, 0)" }, qf = ["stroke"], Xf = ["fill"], Gf = { transform: "translate(60, 0)" }, Zf = ["fill"], Qf = { transform: "translate(130, 0)" }, Jf = ["fill"], eg = ["transform"], tg = ["x", "y", "width", "height", "fill", "stroke"], ng = ["y", "fill"], ag = ["y", "fill"], ra = 10, sg = 14, Ha = 13, Ko = 4, Yo = 12, og = /* @__PURE__ */ le({
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
    const n = e, { isDark: a, colors: s } = Se($e(n, "theme")), o = ra + Ha + Ko + Yo + ra, i = C(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(x, _, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(x, 1) * _ * $);
    }
    function r(x, _) {
      return Math.max(
        l(x.length, Ha, !0),
        l(_.length, Yo, !1),
        52
      ) + sg * 2;
    }
    function c(x, _, w, $) {
      const M = w / 2, S = 6, F = Math.min(
        Math.max(x, M + S),
        n.chartWidth - M - S
      ), N = S + $ + 10, O = n.chartHeight - S + 10, A = Math.min(Math.max(_, N), O);
      return { x: F, y: A };
    }
    const d = C(() => ({
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
    })), h = oe({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), m = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, v = (x, _, w) => {
      const $ = x.currentTarget.closest("svg");
      if (!$) return;
      const M = $.getBoundingClientRect(), S = $.createSVGPoint();
      S.x = x.clientX - M.left, S.y = x.clientY - M.top;
      let F = m(_.label), N = "";
      switch (w) {
        case "body":
          N = `Q1: ${_.q1.toFixed(1)} | Q3: ${_.q3.toFixed(1)}`;
          break;
        case "wick":
          N = `Min: ${_.low.toFixed(1)} | Max: ${_.high.toFixed(1)}`;
          break;
        case "median":
          N = `Median: ${_.median.toFixed(1)}`;
          break;
        case "average":
          N = `Average: ${_.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          N = `Min: ${_.low.toFixed(1)}`;
          break;
        case "max":
          N = `Max: ${_.high.toFixed(1)}`;
          break;
      }
      const O = r(F, N), A = o;
      let L = S.x, V = S.y - 20;
      const I = c(L, V, O, A);
      L = I.x, V = I.y, h.value = {
        visible: !0,
        x: L,
        y: V,
        title: F,
        text: N,
        width: O,
        height: A
      };
    }, g = (x) => {
      if (h.value.visible) {
        const _ = x.currentTarget, w = _.getBoundingClientRect(), $ = _.createSVGPoint();
        $.x = x.clientX - w.left, $.y = x.clientY - w.top;
        let M = $.x, S = $.y - 20;
        const F = c(M, S, h.value.width, h.value.height);
        h.value.x = F.x, h.value.y = F.y;
      }
    }, y = () => {
      h.value.visible = !1;
    }, b = () => {
      h.value.visible = !1;
    }, f = C(() => {
      const x = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const M = $, S = (M - 1) / 9, F = n.chartMargin + w - S * w;
        x.push({ value: M, y: F });
      }
      return x;
    });
    return t({ isDark: a }), (x, _) => (p(), k("div", xf, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: Me(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: g,
        onMouseleave: y
      }, [
        _[4] || (_[4] = u("defs", null, [
          u("filter", {
            id: "candlestick-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            u("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, kf),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, wf),
        (p(!0), k(se, null, he(f.value, (w, $) => (p(), k("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Cf))), 128)),
        (p(!0), k(se, null, he(f.value, (w, $) => (p(), k(se, { key: $ }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, $f),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(w.value), 9, Sf)
        ], 64))), 128)),
        u("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, D(m(e.yAxisLabel)), 9, Mf),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Df),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Tf),
        (p(!0), k(se, null, he(e.candlestickData, (w, $) => (p(), k(se, { key: $ }, [
          u("g", {
            transform: `translate(${w.centerX}, 0)`
          }, [
            u("line", {
              x1: 0,
              y1: w.highY,
              x2: 0,
              y2: w.lowY,
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (M) => v(M, w, "wick"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Bf),
            u("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(w.q1Y, w.q3Y) - (Math.abs(w.q3Y - w.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(w.q3Y - w.q1Y)),
              fill: w.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (M) => v(M, w, "body"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Lf),
            w.medianY ? (p(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (M) => v(M, w, "median"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Pf)) : z("", !0),
            w.averageY ? (p(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (M) => v(M, w, "average"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, If)) : z("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => v(M, w, "min"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Rf),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => v(M, w, "max"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Ef)
          ], 8, Af),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(m(w.label)), 9, Ff),
          w.responseCount ? (p(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(w.responseCount), 9, Of)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (p(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", zf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Nf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Hf)
          ]),
          u("g", Wf, [
            _[0] || (_[0] = u("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, jf)
          ]),
          u("g", Kf, [
            _[1] || (_[1] = u("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Yf)
          ]),
          u("g", Uf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, qf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Xf)
          ]),
          u("g", Gf, [
            _[2] || (_[2] = u("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "18",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Zf)
          ]),
          u("g", Qf, [
            _[3] || (_[3] = u("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            u("text", {
              x: "18",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Jf)
          ])
        ], 8, Vf)) : z("", !0),
        h.value.visible ? (p(), k("g", {
          key: 1,
          "pointer-events": "none",
          transform: `translate(${h.value.x}, ${h.value.y})`
        }, [
          u("rect", {
            filter: "url(#candlestick-tooltip-shadow)",
            x: -h.value.width / 2,
            y: -h.value.height - 10,
            width: h.value.width,
            height: h.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, tg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ra,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, ng),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ra + Ha + Ko,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, ag)
        ], 8, eg)) : z("", !0)
      ], 44, _f))
    ]));
  }
}), ig = /* @__PURE__ */ me(og, [["__scopeId", "data-v-22efd66d"]]), lg = ["viewBox"], rg = ["x1", "y1", "x2", "y2", "stroke"], cg = ["x1", "y1", "x2", "y2", "stroke"], dg = ["points", "fill"], ug = ["x1", "y1", "x2", "y2", "stroke"], hg = ["x", "y", "fill"], fg = ["x", "y", "fill", "transform"], gg = ["x1", "y1", "x2", "y2", "stroke"], mg = ["points", "fill"], pg = ["x1", "y1", "x2", "y2", "stroke"], bg = ["x", "y", "fill"], vg = ["x", "y", "fill"], yg = ["d"], xg = ["x", "y", "width", "height", "onMouseenter"], _g = ["x1", "y1", "x2", "y2"], kg = ["x", "y"], wg = ["x1", "y1", "x2", "y2"], Cg = ["x", "y"], $g = ["x1", "y1", "x2", "y2"], Sg = ["x", "y"], Mg = ["x1", "y1", "x2", "y2"], Dg = ["x", "y"], Tg = ["x1", "y1", "x2", "y2"], Ag = ["x", "y"], Bg = ["x1", "y1", "x2", "y2"], Lg = ["x", "y"], Pg = ["transform"], Ig = { transform: "translate(-220, 0)" }, Rg = ["fill"], Eg = { transform: "translate(-140, 0)" }, Fg = ["fill"], Og = { transform: "translate(-80, 0)" }, Vg = ["fill"], zg = { transform: "translate(-20, 0)" }, Ng = ["fill"], Hg = { transform: "translate(60, 0)" }, Wg = ["fill"], jg = { transform: "translate(130, 0)" }, Kg = ["fill"], Yg = { transform: "translate(180, 0)" }, Ug = ["fill"], qg = ["transform"], Xg = ["x", "y", "width", "height", "fill", "stroke"], Gg = ["y", "fill"], Zg = ["y", "fill"], ca = 10, Qg = 14, Wa = 13, Uo = 12, qo = 4, Jg = /* @__PURE__ */ le({
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
    const n = e, { isDark: a, colors: s } = Se($e(n, "theme")), o = ca + Wa + qo + Uo + ca, i = C(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(q, j, Z) {
      const re = Z ? 0.6 : 0.535;
      return Math.ceil(Math.max(q, 1) * j * re);
    }
    function r(q, j) {
      return Math.max(
        l(q.length, Wa, !0),
        l(j.length, Uo, !1),
        52
      ) + Qg * 2;
    }
    function c(q, j, Z, re) {
      const ue = Z / 2, P = 6, Y = Math.min(
        Math.max(q, ue + P),
        n.chartWidth - ue - P
      ), te = P + re + 10, ce = n.chartHeight - P + 10, pe = Math.min(Math.max(j, te), ce);
      return { x: Y, y: pe };
    }
    const d = C(() => ({
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
    })), h = oe({
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
      () => n.chartMarginRight ?? n.chartMargin
    ), v = C(() => n.chartMargin + n.plotInset), g = C(
      () => n.chartWidth - m.value - n.plotInset
    ), y = C(() => Math.max(g.value - v.value, 1)), b = C(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), f = C(() => y.value / 10 * 0.52);
    function x(q) {
      if (q < 1 || q > 10) return null;
      const j = y.value / 10;
      return v.value + (q - 0.5) * j;
    }
    const _ = C(
      () => Array.from({ length: 10 }, (q, j) => {
        const Z = j + 1, re = x(Z);
        return re === null ? null : { score: Z, x: re };
      }).filter((q) => q !== null)
    ), w = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const q = Math.max(...n.histogram.map((Z) => Z.count || 0), 1), j = Math.max(1, Math.ceil(q * 0.2));
      return q + j;
    }), $ = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const q = n.averageScore || 0;
      let j = 0, Z = 0;
      if (n.histogram.forEach((ue) => {
        const P = ue.count || 0;
        j += P;
        const Y = ue.score - q;
        Z += P * (Y * Y);
      }), j === 0) return 1;
      const re = Z / j;
      return Math.sqrt(re) || 1;
    }), M = (q, j, Z) => {
      if (Z === 0) return 0;
      const re = 1 / (Z * Math.sqrt(2 * Math.PI)), ue = -0.5 * Math.pow((q - j) / Z, 2);
      return re * Math.exp(ue);
    }, S = C(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && $.value === 0) return null;
      const q = n.averageScore, j = $.value, Z = 100, ue = Math.max(...n.histogram.map((ce) => ce.count || 0), 1) / w.value * b.value;
      if (ue <= 0) return null;
      let P = 0;
      for (let ce = 0; ce <= Z; ce++) {
        const pe = 1 + 9 * (ce / Z), xe = M(pe, q, j);
        xe > P && (P = xe);
      }
      if (P <= 0) return null;
      const Y = ue / P, te = [];
      for (let ce = 0; ce <= Z; ce++) {
        const pe = 1 + 9 * (ce / Z), xe = M(pe, q, j) * Y, Le = x(pe);
        if (Le !== null) {
          const et = n.chartHeight - n.chartBottomMargin - xe;
          te.push(`${ce === 0 ? "M" : "L"} ${Le} ${et}`);
        }
      }
      return te.join(" ");
    }), F = C(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const q = y.value / 10;
      return n.histogram.map((j) => {
        const Z = Number(j.score);
        if (!Number.isFinite(Z) || Z < 1 || Z > 10)
          return null;
        const re = v.value + (Z - 0.5) * q, ue = j.count > 0 ? j.count / w.value * b.value : 0, P = n.chartHeight - n.chartBottomMargin - ue;
        return {
          score: Z,
          count: j.count,
          x: re,
          y: P,
          height: ue
        };
      }).filter((j) => j !== null);
    }), N = C(() => x(n.minScore)), O = C(() => x(n.maxScore)), A = C(() => x(n.q1Score)), L = C(() => x(n.medianScore)), V = C(() => x(n.q3Score)), I = C(() => x(n.averageScore)), U = C(() => n.minScore), G = C(() => n.maxScore), ne = C(() => n.q1Score), ge = C(() => n.medianScore), ye = C(() => n.q3Score), X = C(() => n.averageScore), W = C(() => {
      const q = [], j = n.chartMargin - 8, Z = 18;
      A.value !== null && q.push({
        x: A.value,
        y: j,
        value: n.q1Score,
        label: `Q1: ${ne.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), L.value !== null && q.push({
        x: L.value,
        y: j - Z,
        value: n.medianScore,
        label: `Median: ${ge.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), I.value !== null && q.push({
        x: I.value,
        y: j - Z,
        value: n.averageScore,
        label: `Avg: ${X.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), V.value !== null && q.push({
        x: V.value,
        y: j,
        value: n.q3Score,
        label: `Q3: ${ye.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), q.sort((P, Y) => (P.x || 0) - (Y.x || 0));
      const re = [[], [], []];
      q.forEach((P) => {
        if (P.x === null) return;
        let Y = -1;
        for (let te = 0; te < re.length; te++) {
          let ce = !1;
          for (const pe of re[te]) {
            if (pe.x === null) continue;
            const xe = Math.abs(P.x - pe.x), Le = (P.width + pe.width) / 2 + 10;
            if (xe < Le) {
              ce = !0;
              break;
            }
          }
          if (!ce) {
            Y = te;
            break;
          }
        }
        Y === -1 && (Y = re.length - 1), P.y = j - Y * Z, re[Y].push(P);
      });
      const ue = 15;
      return q.forEach((P) => {
        P.y < ue && (P.y = ue);
      }), q;
    }), Q = (q) => W.value.find((Z) => Z.id === q)?.y || n.chartMargin - 10, ae = C(() => {
      const q = [];
      for (let Z = 0; Z <= 5; Z++) {
        const re = Math.round(w.value / 5 * Z), ue = n.chartHeight - n.chartBottomMargin - Z / 5 * b.value;
        q.push({ value: re, y: ue });
      }
      return q;
    });
    function fe(q, j, Z) {
      const re = q.createSVGPoint();
      re.x = j, re.y = Z;
      const ue = q.getScreenCTM();
      if (!ue) {
        const Y = q.getBoundingClientRect();
        return { x: j - Y.left, y: Z - Y.top };
      }
      const P = re.matrixTransform(ue.inverse());
      return { x: P.x, y: P.y };
    }
    const we = (q, j) => {
      n.interactive && R(q, j);
    }, De = () => {
      n.interactive && de();
    }, R = (q, j) => {
      const Z = q.currentTarget.closest("svg");
      if (!Z) return;
      const { x: re, y: ue } = fe(Z, q.clientX, q.clientY), P = `Score: ${j.score}`, Y = `Count: ${Number(j.count ?? 0).toLocaleString()}`, te = r(P, Y), ce = o, pe = typeof j?.x == "number" ? j.x : re;
      let xe = ue - 20;
      const Le = c(pe, xe, te, ce);
      h.value = {
        visible: !0,
        x: Le.x,
        y: Le.y,
        title: P,
        text: Y,
        width: te,
        height: ce,
        anchorX: typeof j?.x == "number" ? j.x : null
      };
    }, H = (q) => {
      if (n.interactive && h.value.visible) {
        const j = q.currentTarget, { x: Z, y: re } = fe(j, q.clientX, q.clientY), ue = h.value.anchorX, P = ue != null && Number.isFinite(ue) ? ue : Z;
        let Y = re - 20;
        const te = c(P, Y, h.value.width, h.value.height);
        h.value.x = te.x, h.value.y = te.y;
      }
    }, K = () => {
      de();
    }, de = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (q, j) => (p(), k("div", {
      class: J(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Me(`min-height: ${e.chartHeight}px;`),
        onMousemove: H,
        onMouseleave: K
      }, [
        j[7] || (j[7] = u("defs", null, [
          u("filter", {
            id: "histogram-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            u("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        (p(!0), k(se, null, he(ae.value, (Z, re) => (p(), k("line", {
          key: `grid-${re}`,
          x1: v.value,
          y1: Z.y,
          x2: g.value,
          y2: Z.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, rg))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, cg),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, dg),
        (p(!0), k(se, null, he(ae.value, (Z, re) => (p(), k(se, {
          key: `y-tick-${re}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: Z.y,
            x2: e.chartMargin,
            y2: Z.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, ug),
          u("text", {
            x: e.chartMargin - 12,
            y: Z.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(Z.value), 9, hg)
        ], 64))), 128)),
        u("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, fg),
        u("line", {
          x1: v.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, gg),
        u("polygon", {
          points: `${g.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${g.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${g.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, mg),
        (p(!0), k(se, null, he(_.value, (Z) => (p(), k(se, {
          key: `tick-${Z.score}`
        }, [
          u("line", {
            x1: Z.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: Z.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, pg),
          u("text", {
            x: Z.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(Z.score), 9, bg)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, vg),
        S.value ? (p(), k("path", {
          key: 0,
          d: S.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, yg)) : z("", !0),
        (p(!0), k(se, null, he(F.value, (Z, re) => (p(), k("rect", {
          key: `bar-${re}`,
          x: Z.x - f.value / 2,
          y: Z.y,
          width: f.value,
          height: Z.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (ue) => we(ue, Z),
          onMouseleave: De,
          style: Me({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, xg))), 128)),
        e.showStatLabels && N.value ? (p(), k("line", {
          key: 1,
          x1: N.value,
          y1: e.chartMargin,
          x2: N.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, _g)) : z("", !0),
        e.showStatLabels && N.value ? (p(), k("text", {
          key: 2,
          x: N.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + D(U.value.toFixed(1)), 9, kg)) : z("", !0),
        e.showStatLabels && A.value ? (p(), k("line", {
          key: 3,
          x1: A.value,
          y1: e.chartMargin,
          x2: A.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, wg)) : z("", !0),
        e.showStatLabels && A.value ? (p(), k("text", {
          key: 4,
          x: A.value,
          y: Q("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + D(ne.value.toFixed(1)), 9, Cg)) : z("", !0),
        e.showStatLabels && L.value ? (p(), k("line", {
          key: 5,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, $g)) : z("", !0),
        e.showStatLabels && L.value ? (p(), k("text", {
          key: 6,
          x: L.value,
          y: Q("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + D(ge.value.toFixed(1)), 9, Sg)) : z("", !0),
        e.showStatLabels && I.value ? (p(), k("line", {
          key: 7,
          x1: I.value,
          y1: e.chartMargin,
          x2: I.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Mg)) : z("", !0),
        e.showStatLabels && I.value ? (p(), k("text", {
          key: 8,
          x: I.value,
          y: Q("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + D(X.value.toFixed(1)), 9, Dg)) : z("", !0),
        e.showStatLabels && V.value ? (p(), k("line", {
          key: 9,
          x1: V.value,
          y1: e.chartMargin,
          x2: V.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Tg)) : z("", !0),
        e.showStatLabels && V.value ? (p(), k("text", {
          key: 10,
          x: V.value,
          y: Q("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + D(ye.value.toFixed(1)), 9, Ag)) : z("", !0),
        e.showStatLabels && O.value ? (p(), k("line", {
          key: 11,
          x1: O.value,
          y1: e.chartMargin,
          x2: O.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Bg)) : z("", !0),
        e.showStatLabels && O.value ? (p(), k("text", {
          key: 12,
          x: O.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + D(G.value.toFixed(1)), 9, Lg)) : z("", !0),
        e.showLegend ? (p(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", Ig, [
            j[0] || (j[0] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, Rg)
          ]),
          u("g", Eg, [
            j[1] || (j[1] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#5d4b93",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Fg)
          ]),
          u("g", Og, [
            j[2] || (j[2] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#a855f7",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Vg)
          ]),
          u("g", zg, [
            j[3] || (j[3] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Ng)
          ]),
          u("g", Hg, [
            j[4] || (j[4] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Wg)
          ]),
          u("g", jg, [
            j[5] || (j[5] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#7c3aed",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Kg)
          ]),
          u("g", Yg, [
            j[6] || (j[6] = u("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#C67DFF",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            u("text", {
              x: "24",
              y: "4",
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Ug)
          ])
        ], 8, Pg)) : z("", !0),
        e.interactive && h.value.visible ? (p(), k("g", {
          key: 14,
          "pointer-events": "none",
          transform: `translate(${h.value.x}, ${h.value.y})`
        }, [
          u("rect", {
            filter: "url(#histogram-tooltip-shadow)",
            x: -h.value.width / 2,
            y: -h.value.height - 10,
            width: h.value.width,
            height: h.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, Xg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ca,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, Gg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ca + Wa + qo,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, Zg)
        ], 8, qg)) : z("", !0)
      ], 44, lg))
    ], 2));
  }
}), el = /* @__PURE__ */ me(Jg, [["__scopeId", "data-v-8f9da805"]]), em = 639, tl = 1024;
function Xo(e) {
  return e < 640 ? "mobile" : e <= tl ? "tablet" : "desktop";
}
function tm() {
  const e = oe(
    typeof window > "u" ? "desktop" : Xo(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Xo(window.innerWidth));
  };
  let n = null, a = null, s = null, o = null;
  tt(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${em}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${tl}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, n.addEventListener("change", o), a.addEventListener("change", o), s.addEventListener("change", o));
  }), pt(() => {
    !o || !n || !a || !s || (n.removeEventListener("change", o), a.removeEventListener("change", o), s.removeEventListener("change", o));
  });
  const i = C(() => e.value === "mobile"), l = C(() => e.value === "tablet"), r = C(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: r
  };
}
const nm = { class: "chart-container" }, am = {
  key: 0,
  class: "loading-state loading-overlay"
}, en = 12, sm = /* @__PURE__ */ le({
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
    Ss.use([Sl, Ml, Dl, Tl]);
    const n = e, { isDark: a, colors: s } = Se($e(n, "theme")), { breakpoint: o } = tm(), i = oe(null), l = oe(!0), r = oe(!1);
    let c = null, d = null;
    const h = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "4%", bottom: "4%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, m = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, v = {
      success: 0,
      abandon: 1,
      error: 2
    }, g = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, y = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, b = C(() => {
      const R = o.value;
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
        nodeGap: n.nodeGap,
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
    }), f = (R) => {
      const H = R.replace(/_/g, " ").replace(/\s+/g, " ").trim(), K = H.match(/^Failed:\s*(.+)$/i);
      return K ? `Failed:
${K[1].trim()}` : H;
    }, x = (R, H) => {
      const K = R.trim();
      if (!K || H < 1 || K.length <= H) return K;
      const de = [];
      let q = 0;
      for (; q < K.length; ) {
        const j = Math.min(q + H, K.length);
        if (j >= K.length) {
          const ue = K.slice(q).trim();
          ue && de.push(ue);
          break;
        }
        const Z = K.slice(q, j), re = Z.lastIndexOf(" ");
        if (re > 0)
          for (de.push(K.slice(q, q + re).trim()), q += re; q < K.length && K[q] === " "; ) q += 1;
        else
          de.push(Z), q = j;
      }
      return de.join(`
`);
    }, _ = (R, H) => {
      const K = R.trim();
      return !K || H < 1 ? R : K.split(`
`).map((de) => x(de.trim(), H)).filter(Boolean).join(`
`);
    }, w = (R) => R.status ? R.status : g.test(R.name) ? "abandon" : y.test(R.name) ? "error" : "success", $ = (R) => R.originalValue ?? R.value, M = (R, H) => {
      const K = new Set(H.map((q) => q.target)), de = R.filter((q) => !K.has(q.name));
      for (const q of de) {
        if (typeof q.value == "number" && q.value > 0) return q.value;
        const j = H.filter((Z) => Z.source === q.name);
        if (j.length > 0)
          return j.reduce((Z, re) => Z + $(re), 0);
      }
      return H.reduce((q, j) => Math.max(q, $(j)), 0);
    }, S = (R, H, K) => {
      if (K && typeof K.value == "number") return K.value;
      const de = H.filter((j) => j.target === R);
      return de.length > 0 ? de.reduce((j, Z) => j + $(Z), 0) : H.filter((j) => j.source === R).reduce((j, Z) => j + $(Z), 0);
    }, F = (R, H) => {
      const K = /* @__PURE__ */ new Map(), de = new Set(H.map((j) => j.target)), q = R.filter((j) => !de.has(j.name)).map((j) => ({ name: j.name, depth: 0 }));
      for (; q.length > 0; ) {
        const { name: j, depth: Z } = q.shift(), re = K.get(j);
        if (!(re !== void 0 && re >= Z)) {
          K.set(j, Z);
          for (const ue of H)
            ue.source === j && q.push({ name: ue.target, depth: Z + 1 });
        }
      }
      for (const j of R)
        K.has(j.name) || K.set(j.name, 0);
      return K;
    }, N = (R, H) => {
      const K = /* @__PURE__ */ new Map(), de = new Set(H.map((re) => re.target)), q = R.filter((re) => !de.has(re.name));
      let j = 0;
      const Z = (re) => {
        let ue = re;
        for (; ue && !K.has(ue); )
          K.set(ue, j), j += 1, ue = H.filter(
            (Y) => Y.source === ue && w({ name: Y.target }) === "success"
          ).sort((Y, te) => $(te) - $(Y))[0]?.target;
      };
      return q.forEach((re) => Z(re.name)), K;
    }, O = (R, H, K) => {
      const de = w(R);
      if (de === "success" && K.has(R.name))
        return K.get(R.name);
      if (de === "success") {
        const q = H.filter((Z) => Z.target === R.name);
        return 200 + (q.length ? Math.min(
          ...q.map(
            (Z) => K.has(Z.source) ? (K.get(Z.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return de === "abandon" ? 1e3 : 2e3;
    }, A = (R, H) => {
      const K = F(R, H), de = N(R, H);
      return [...R].sort((q, j) => {
        const Z = K.get(q.name) ?? 0, re = K.get(j.name) ?? 0;
        if (Z !== re) return Z - re;
        const ue = v[w(q)], P = v[w(j)];
        if (ue !== P) return ue - P;
        const Y = O(q, H, de), te = O(j, H, de);
        return Y !== te ? Y - te : q.name.localeCompare(j.name);
      });
    }, L = (R, H, K, de) => {
      const j = _(R, de).split(`
`), Z = H * 0.58, ue = Math.max(...j.map((Y) => Y.length), 1) * Z, P = j.length * K;
      return {
        lines: j,
        width: ue,
        height: P,
        nodeWidth: ue + en * 2
      };
    }, V = (R, H) => H ? `${(R / H * 100).toFixed(1)}%` : "0.0%", I = (R, H, K, de, q) => {
      if (typeof R.label == "string" && R.label)
        return _(f(R.label), q);
      const j = _(f(R.name), q);
      if (H === "success" && K > 0) {
        const Z = S(R.name, de, R), re = V(Z, K);
        return `${j}
(${re})`;
      }
      return j;
    }, U = (R, H = 0) => {
      if (H > 0) return H;
      const K = R.match(/^(\d+(?:\.\d+)?)px$/);
      if (K) return Number(K[1]);
      const de = R.match(/^(\d+(?:\.\d+)?)vh$/);
      return de && typeof window < "u" ? Number(de[1]) / 100 * window.innerHeight : 500;
    }, G = (R, H, K, de, q) => {
      if (!H.length || !R.length || q <= 0) return R;
      const j = R.map((pe) => ({ ...pe })), Z = K.labelLineHeight || Math.round(K.labelFontSize * 1.25), re = Math.max(4, K.labelCharsPerLine), ue = Math.max(de * 0.88, 260), P = F(H, j), Y = /* @__PURE__ */ new Map();
      H.forEach((pe) => {
        const xe = P.get(pe.name) ?? 0;
        Y.set(xe, (Y.get(xe) ?? 0) + 1);
      });
      const te = (pe) => {
        const Le = H.find((Gt) => Gt.name === pe)?.displayLabel || pe, dt = L(Le, K.labelFontSize, Z, re).height + en * 2, Xt = P.get(pe) ?? 0, xt = Y.get(Xt) ?? 1, un = (Math.max(xt, 1) - 1) * K.nodeGap / Math.max(xt, 1), Ta = Math.max(ue - un, dt);
        return Math.max(1, dt / Ta * q);
      }, ce = (pe) => {
        const xe = j.filter((Le) => Le.target === pe);
        return xe.length > 0 ? xe.reduce((Le, et) => Le + et.value, 0) : j.filter((Le) => Le.source === pe).reduce((Le, et) => Le + et.value, 0);
      };
      for (let pe = 0; pe < 16; pe += 1) {
        let xe = !1;
        for (const Le of H) {
          const et = te(Le.name), dt = ce(Le.name);
          if (dt >= et) continue;
          const Xt = j.filter((Gt) => Gt.target === Le.name), xt = j.filter((Gt) => Gt.source === Le.name), un = Xt.length > 0 ? Xt : xt;
          if (un.length === 0) continue;
          const Ta = et / Math.max(dt, 1e-6);
          un.forEach((Gt) => {
            Gt.value *= Ta;
          }), xe = !0;
        }
        if (!xe) break;
      }
      return j;
    }, ne = (R, H, K) => {
      const de = M(R, H), q = A(R, H), j = K.labelLineHeight || Math.round(K.labelFontSize * 1.25), Z = Math.max(4, K.labelCharsPerLine);
      let re = K.nodeWidth;
      const ue = [], P = q.map((te, ce) => {
        const pe = w(te), xe = I(
          te,
          pe,
          de,
          H,
          Z
        );
        ue.push(xe);
        const Le = L(xe, K.labelFontSize, j, Z);
        K.orient === "vertical" ? re = Math.max(re, Le.height + en * 2) : re = Math.max(re, Le.nodeWidth);
        const et = n.nodeColors[te.name] || m[pe] || ge[ce % ge.length], dt = Math.max(Math.ceil(Le.nodeWidth - en * 2), 48);
        return {
          ...te,
          displayLabel: xe,
          label: {
            width: dt,
            overflow: "none",
            lineHeight: j,
            fontSize: K.labelFontSize
          },
          itemStyle: {
            color: et,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let Y = { ...K.contentMargins };
      if (K.orient === "vertical") {
        const te = Math.max(
          ...ue.map(
            (pe) => L(pe, K.labelFontSize, j, Z).width
          ),
          0
        ), ce = typeof Y.right == "number" ? Y.right : 10;
        Y = {
          ...Y,
          right: Math.max(ce, te + en + K.labelDistance)
        };
      }
      return { nodes: P, maxNodeWidth: re, contentMargins: Y, originTotal: de };
    }, ge = [
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
    ], ye = () => {
      const R = n.data.links.filter(
        (q) => q.source && q.target && typeof q.value == "number"
      ), H = Math.max(...R.map((q) => q.value), 1), K = Math.max(1, H * 0.01), de = R.map((q) => ({
        ...q,
        originalValue: q.value,
        value: q.value < H * 0.01 ? K : q.value
      }));
      return {
        nodes: n.data.nodes.filter((q) => q.name),
        links: de
      };
    }, X = (R) => (H) => {
      const K = H.dataType === "node", de = s.value.tooltipText, q = a.value ? "#d1d5db" : "#e2e8f0";
      if (K) {
        const P = R.filter((ce) => ce.target === H.name), Y = R.filter((ce) => ce.source === H.name), te = P.length > 0 ? P.reduce((ce, pe) => ce + (pe.originalValue || pe.value), 0) : Y.reduce((ce, pe) => ce + (pe.originalValue || pe.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${de};">${H.name}</div><div style="color: ${q}; font-size: 12px;">Count: ${te.toLocaleString()}</div>`;
      }
      const j = H.data?.source || H.source || "Unknown", Z = H.data?.target || H.target || "Unknown", re = H.data?.originalValue || H.data?.value || H.value || 0, ue = H.data?.label || `${re.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${de};">${j} → ${Z}</div><div style="color: ${q}; font-size: 12px;">Flow: ${ue}</div>`;
    }, W = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const R = b.value, H = a.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", K = a.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", de = a.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", q = R.labelPosition === "inside" ? "#ffffff" : a.value ? s.value.textPrimary : "#334155";
      try {
        const { nodes: j, links: Z } = ye(), { nodes: re, maxNodeWidth: ue, contentMargins: P, originTotal: Y } = ne(
          j,
          Z,
          R
        ), te = U(n.height, i.value?.clientHeight ?? 0), ce = G(
          Z,
          re,
          {
            labelFontSize: R.labelFontSize,
            labelLineHeight: R.labelLineHeight || Math.round(R.labelFontSize * 1.25),
            labelCharsPerLine: R.labelCharsPerLine,
            nodeGap: R.nodeGap
          },
          te,
          Y
        ), pe = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: X(ce),
            backgroundColor: s.value.tooltipBg,
            borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            borderRadius: 8,
            padding: [10, 14],
            textStyle: {
              color: s.value.tooltipText,
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
              data: re,
              links: ce,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: K,
                  opacity: 1
                }
              },
              lineStyle: {
                color: H,
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
                color: q,
                fontWeight: 700,
                fontSize: R.labelFontSize,
                lineHeight: R.labelLineHeight || Math.round(R.labelFontSize * 1.25),
                padding: en,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...R.orient === "horizontal" ? { width: Math.max(ue - en * 2, 48), overflow: "none" } : R.labelWrap && R.labelTextWidth > 0 ? { width: R.labelTextWidth, overflow: "none" } : {},
                ...R.labelDistance > 0 ? { distance: R.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (xe) => xe.data?.displayLabel || xe.name || ""
              },
              edgeLabel: R.edgeLabelShow ? {
                show: !0,
                fontSize: R.edgeLabelFontSize,
                color: de,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (xe) => {
                  if (xe.data?.label) return xe.data.label;
                  const Le = xe.data?.originalValue ?? xe.value ?? 0, et = xe.data?.source ?? xe.source, dt = ce.filter((xt) => xt.source === et).reduce((xt, un) => xt + $(un), 0), Xt = V(Le, dt);
                  return `${Number(Le).toLocaleString()} (${Xt})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: R.nodeGap,
              nodeWidth: ue,
              layoutIterations: h.node.iterations,
              orient: R.orient,
              draggable: !1,
              ...P
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(pe), c.resize();
      } catch (j) {
        console.error("Error setting Sankey chart options:", j), r.value = !0;
      }
    }, Q = async () => {
      if (i.value)
        try {
          c = Ss.init(i.value), W(), window.addEventListener("resize", we);
        } catch (R) {
          console.error("Error initializing Sankey chart:", R), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, ae = () => {
      const R = i.value;
      return !!(R && R.clientWidth > 0 && R.clientHeight > 0);
    }, fe = async () => {
      if (await We(), ae()) return Q();
      await new Promise((R) => {
        const H = i.value;
        if (!H) {
          R();
          return;
        }
        d = new ResizeObserver(() => {
          ae() && (d?.disconnect(), d = null, Q().then(R));
        }), d.observe(H);
      });
    }, we = () => c?.resize(), De = () => {
      window.removeEventListener("resize", we), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return tt(() => fe()), si(De), Oe(() => n.data, W, { deep: !0 }), Oe(a, W), Oe(o, W), t({ isDark: a }), (R, H) => (p(), k("div", nm, [
      r.value ? (p(), k("div", {
        key: 0,
        class: "error-state",
        style: Me({ height: e.height })
      }, [...H[0] || (H[0] = [
        Cs('<div class="error-content" data-v-b04b208a><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b04b208a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b04b208a></path></svg><p class="error-title" data-v-b04b208a>Chart could not be loaded</p><p class="error-description" data-v-b04b208a>Please check the data format.</p></div>', 1)
      ])], 4)) : (p(), k("div", {
        key: 1,
        class: "chart-wrapper",
        style: Me({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (p(), k("div", am, [...H[1] || (H[1] = [
          Cs('<div class="loading-container" data-v-b04b208a><div class="sankey-loader" data-v-b04b208a><div class="flow flow-1" data-v-b04b208a></div><div class="flow flow-2" data-v-b04b208a></div><div class="flow flow-3" data-v-b04b208a></div><div class="flow flow-4" data-v-b04b208a></div></div><p class="loading-text" data-v-b04b208a>Loading Sankey diagram...</p></div>', 1)
        ])])) : z("", !0)
      ], 4))
    ]));
  }
}), qt = /* @__PURE__ */ me(sm, [["__scopeId", "data-v-b04b208a"]]), om = ["open"], im = { class: "card-header metric-collapsible__summary" }, lm = { class: "header-content metric-header-content" }, rm = { class: "metric-header-content__main" }, cm = { class: "metric-header-content__text" }, dm = {
  key: "header-skeleton",
  class: "ut-skeleton-blink ut-skeleton-collapsible-title",
  "aria-hidden": "true",
  "aria-busy": "true"
}, um = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, hm = {
  key: 0,
  class: "card-title"
}, fm = {
  key: 0,
  class: "card-subtitle"
}, gm = {
  key: 0,
  class: "metric-header-content__export"
}, mm = {
  key: 0,
  class: "cmc-header-aside"
}, pm = { class: "chart-metric-container__body" }, bm = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, vm = { class: "card-header" }, ym = { class: "header-content metric-header-content" }, xm = { class: "metric-header-content__main" }, _m = { class: "metric-header-content__text" }, km = {
  key: "header-skeleton",
  class: "ut-skeleton-container",
  "aria-hidden": "true",
  "aria-busy": "true"
}, wm = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, Cm = {
  key: 0,
  class: "card-title"
}, $m = {
  key: 0,
  class: "card-subtitle"
}, Sm = {
  key: 0,
  class: "metric-header-content__export"
}, Mm = {
  key: 0,
  class: "cmc-header-aside"
}, Dm = { class: "chart-metric-container__body" }, Tm = /* @__PURE__ */ le({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = oe(t.defaultOpen), a = es();
    function s(l) {
      return l.some((r) => {
        if (r.type === Cl) return !1;
        if (r.type === Text) {
          const c = r.children;
          return typeof c == "string" && c.trim().length > 0;
        }
        return !!r.type;
      });
    }
    const o = C(() => {
      if (t.collapsible && !n.value) return !1;
      const l = a.headerExport;
      return l ? s(l()) : !1;
    });
    Oe(
      () => t.defaultOpen,
      (l) => {
        t.collapsible && (n.value = l);
      }
    );
    function i(l) {
      const r = l.currentTarget;
      r?.tagName === "DETAILS" && (n.value = r.open);
    }
    return (l, r) => e.collapsible ? (p(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      u("summary", im, [
        u("div", lm, [
          u("div", rm, [
            u("div", cm, [
              E(Te, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: B(() => [
                  e.loading ? (p(), k("div", dm)) : (p(), k("div", um, [
                    Ce(l.$slots, "title", {}, () => [
                      e.title ? (p(), k("h3", hm, D(e.title), 1)) : z("", !0)
                    ], !0),
                    e.subtitle ? (p(), k("p", fm, D(e.subtitle), 1)) : z("", !0),
                    Ce(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            o.value ? (p(), k("div", gm, [
              Ce(l.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          l.$slots.headerAside ? (p(), k("div", mm, [
            Ce(l.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ]),
        r[0] || (r[0] = u("svg", {
          class: "metric-collapsible__chevron",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          })
        ], -1))
      ]),
      u("div", pm, [
        Ce(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, om)) : (p(), k("div", bm, [
      u("div", vm, [
        u("div", ym, [
          u("div", xm, [
            u("div", _m, [
              E(Te, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: B(() => [
                  e.loading ? (p(), k("div", km, [...r[1] || (r[1] = [
                    u("div", { class: "ut-skeleton-title-subtitle" }, [
                      u("div", { class: "ut-skeleton-blink ut-skeleton-title" }),
                      u("div", { class: "ut-skeleton-blink ut-skeleton-subtitle" })
                    ], -1),
                    u("div", { class: "ut-skeleton-blink ut-skeleton-options" }, null, -1)
                  ])])) : (p(), k("div", wm, [
                    Ce(l.$slots, "title", {}, () => [
                      e.title ? (p(), k("h3", Cm, D(e.title), 1)) : z("", !0)
                    ], !0),
                    e.subtitle ? (p(), k("p", $m, D(e.subtitle), 1)) : z("", !0),
                    Ce(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            o.value ? (p(), k("div", Sm, [
              Ce(l.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          l.$slots.headerAside ? (p(), k("div", Mm, [
            Ce(l.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ])
      ]),
      u("div", Dm, [
        Ce(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ke = /* @__PURE__ */ me(Tm, [["__scopeId", "data-v-8741c0a0"]]);
function Am(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    })
  ]);
}
function ks(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
    })
  ]);
}
function nt(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    })
  ]);
}
function Bm(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function Da(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    })
  ]);
}
function nl(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 19.5 8.25 12l7.5-7.5"
    })
  ]);
}
function al(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function Lm(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function Pm(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
    })
  ]);
}
function sl(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const Im = {
  key: 0,
  class: "footer-divider"
}, Rm = {
  key: 0,
  class: "export-label"
}, Em = { class: "export-buttons" }, Fm = ["disabled"], Om = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Vm = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, zm = ["disabled"], Nm = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Hm = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Wm = /* @__PURE__ */ le({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = C(() => n.variant === "footer" ? "footer" : "div"), o = C(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (r) => n.formats.includes(r), l = (r) => {
      n.loading || a("export", r);
    };
    return (r, c) => (p(), ee(Ft(s.value), {
      class: J(o.value)
    }, {
      default: B(() => [
        e.variant === "footer" ? (p(), k("div", Im)) : z("", !0),
        u("div", {
          class: J(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (p(), k("span", Rm, "Export")) : z("", !0),
          u("div", Em, [
            i("pdf") ? (p(), k("button", {
              key: 0,
              type: "button",
              class: J(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => l("pdf"))
            }, [
              e.loading ? (p(), k("svg", Om, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (p(), k("svg", Vm, [...c[3] || (c[3] = [
                u("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                u("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                u("line", {
                  x1: "16",
                  y1: "13",
                  x2: "8",
                  y2: "13"
                }, null, -1),
                u("line", {
                  x1: "16",
                  y1: "17",
                  x2: "8",
                  y2: "17"
                }, null, -1),
                u("polyline", { points: "10 9 9 9 8 9" }, null, -1)
              ])])),
              c[4] || (c[4] = u("span", null, "PDF", -1))
            ], 10, Fm)) : z("", !0),
            i("csv") ? (p(), k("button", {
              key: 1,
              type: "button",
              class: J(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => l("csv"))
            }, [
              e.loading ? (p(), k("svg", Nm, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (p(), k("svg", Hm, [...c[6] || (c[6] = [
                u("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                u("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                u("line", {
                  x1: "12",
                  y1: "18",
                  x2: "12",
                  y2: "12"
                }, null, -1),
                u("line", {
                  x1: "9",
                  y1: "15",
                  x2: "15",
                  y2: "15"
                }, null, -1)
              ])])),
              c[7] || (c[7] = u("span", null, "CSV", -1))
            ], 10, zm)) : z("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Ve = /* @__PURE__ */ me(Wm, [["__scopeId", "data-v-ebfab47f"]]), jm = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Km = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Ym = { class: "w-full shrink-0 sm:pr-2" }, Um = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, qm = { class: "max-w-[360px] text-center" }, Xm = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Gm = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
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
    }, s = e, o = n, i = (m) => {
      o("export", m);
    }, l = $e(s, "theme"), r = $e(s, "options"), { isDark: c } = Se(l), d = (m) => {
      const v = new Date(m), g = String(v.getDate()).padStart(2, "0"), y = String(v.getMonth() + 1).padStart(2, "0");
      return `${g}-${y}`;
    }, h = C(() => {
      const m = s.data?.agents_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = v.map((_) => d(_)), y = /* @__PURE__ */ new Set();
      for (const _ of Object.values(m))
        for (const w of Object.keys(_))
          y.add(w);
      const b = Array.from(y), f = (_) => _, x = b.map((_) => ({
        label: _,
        data: v.map((w) => m[w]?.[_] || 0),
        backgroundColor: `${a[_] || "#94a3b8"}80`,
        borderColor: f(a[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: x
      };
    });
    return t({ isDark: c }), (m, v) => (p(), ee(ke, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", jm, [
          E(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              e.loading ? (p(), k("div", {
                key: "loading",
                class: J(["flex h-[320px] flex-col gap-3 px-4 pb-4", ["sk-root", { "sk-root--dark": T(c) }]]),
                "aria-busy": "true",
                "aria-label": "Loading chart"
              }, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 skeleton-shimmer",
                  style: { "border-radius": "10px" },
                  "aria-hidden": "true"
                }, null, -1)
              ])], 2)) : h.value.labels && h.value.labels.length ? (p(), k("section", Km, [
                u("div", Ym, [
                  E(St, {
                    data: h.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (p(), k("section", Um, [
                u("div", qm, [
                  u("div", Xm, [
                    E(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  v[1] || (v[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  v[2] || (v[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), Zm = /* @__PURE__ */ me(Gm, [["__scopeId", "data-v-36bec153"]]), dn = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", be = (e, t) => `${e.toLocaleString()} (${dn(e, t)})`, Qm = { class: "flex w-full min-w-0 justify-center" }, Jm = { class: "flex max-w-full min-w-0 items-center gap-2" }, ep = { class: "min-w-0 truncate text-[12px] leading-normal" }, tp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, np = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, ap = /* @__PURE__ */ le({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (p(), k("div", {
      class: J(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", Qm, [
        u("div", Jm, [
          e.color ? (p(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: Me({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", ep, D(e.title), 1)
        ])
      ]),
      u("p", tp, D(e.value), 1),
      e.subvalue ? (p(), k("p", np, D(e.subvalue), 1)) : z("", !0)
    ], 2));
  }
}), ve = /* @__PURE__ */ me(ap, [["__scopeId", "data-v-945ff8fb"]]), sp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Xe = /* @__PURE__ */ le({
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
    const t = e, n = C(
      () => t.statusLive === !0 || t.statusLive === !1
    ), a = C(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), s = C(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = C(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(() => {
      const l = t.outlined;
      switch (t.color) {
        case "purple":
          return l ? "border border-violet-500 bg-transparent text-violet-700 dark:border-violet-400 dark:text-violet-300" : "border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-300";
        case "warning":
          return l ? "border border-amber-500 bg-transparent text-amber-800 dark:border-amber-400 dark:text-amber-200" : "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/35 dark:text-amber-200";
        case "success":
          return l ? "border border-emerald-500 bg-transparent text-emerald-800 dark:border-emerald-400 dark:text-emerald-200" : "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-200";
        case "danger":
          return l ? "border border-red-500 bg-transparent text-red-800 dark:border-red-400 dark:text-red-200" : "border border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/35 dark:text-red-200";
        case "orange":
          return l ? "border border-orange-500 bg-transparent text-orange-800 dark:border-orange-400 dark:text-orange-200" : "border border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/35 dark:text-orange-200";
        default:
          return l ? "border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
      }
    });
    return (l, r) => n.value ? (p(), k("span", {
      key: 0,
      role: "status",
      class: J(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (p(), k("span", sp, [...r[0] || (r[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : z("", !0),
      u("span", {
        class: J(["min-w-0 flex-1 text-center", o.value])
      }, D(a.value), 3)
    ], 2)) : (p(), k("span", {
      key: 1,
      class: J(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      Ce(l.$slots, "default", {}, () => [
        Be(D(e.label), 1)
      ])
    ], 2));
  }
}), ie = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Pe = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Et = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, op = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, ip = { class: "overflow-x-auto" }, lp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, rp = ["aria-sort", "onClick"], cp = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, dp = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, up = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, hp = /* @__PURE__ */ le({
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
    const n = e, a = t, s = oe(!1), o = "—";
    function i(w) {
      return w == null || w === "" ? o : String(w);
    }
    function l(w) {
      return w === "center" ? "text-center" : w === "right" ? "text-right" : "text-left";
    }
    function r(w) {
      return `cell-${w}`;
    }
    function c(w, $) {
      return w[$];
    }
    function d(w, $) {
      if (typeof n.rowKey == "function")
        return n.rowKey(w);
      const M = w[n.rowKey];
      return typeof M == "string" || typeof M == "number" ? M : $;
    }
    function h(w, $) {
      return d(w, $);
    }
    function m(w) {
      return n.sortKey === w && n.sortDirection != null;
    }
    function v(w) {
      a("sort", w);
    }
    function g(w) {
      return m(w) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const y = C(() => n.rows?.length ?? 0), b = C(() => y.value > n.maxVisibleRows), f = C(() => Math.max(0, y.value - n.maxVisibleRows)), x = C(() => n.rows?.length ? s.value || !b.value ? n.rows : n.rows.slice(0, n.maxVisibleRows) : []), _ = C(
      () => n.viewMoreLabel.replace(/\{count\}/g, String(f.value))
    );
    return (w, $) => (p(), k("div", op, [
      u("div", ip, [
        u("table", lp, [
          u("thead", null, [
            u("tr", null, [
              (p(!0), k(se, null, he(e.columns, (M) => (p(), k("th", {
                key: M.key,
                scope: "col",
                class: J(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [l(M.align), M.headerClass]])
              }, [
                M.sortable ? (p(), k("button", {
                  key: 0,
                  type: "button",
                  class: J(["kiut-table-sort-btn inline-flex items-center gap-1", l(M.align)]),
                  "aria-sort": g(M.key),
                  onClick: (S) => v(M.key)
                }, [
                  u("span", null, D(M.label), 1),
                  u("span", cp, [
                    m(M.key) ? (p(), k(se, { key: 0 }, [
                      e.sortDirection === "asc" ? (p(), k("span", dp, "↑")) : e.sortDirection === "desc" ? (p(), k("span", up, "↓")) : z("", !0)
                    ], 64)) : (p(), k(se, { key: 1 }, [
                      $[1] || ($[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, rp)) : (p(), k(se, { key: 1 }, [
                  Be(D(M.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (p(!0), k(se, null, he(x.value, (M, S) => (p(), k("tr", {
              key: h(M, S)
            }, [
              (p(!0), k(se, null, he(e.columns, (F) => (p(), k("td", {
                key: `${S}-${F.key}`,
                class: J(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(F.align), F.cellClass]])
              }, [
                Ce(w.$slots, r(F.key), {
                  row: M,
                  column: F,
                  value: c(M, F.key)
                }, () => [
                  Be(D(i(c(M, F.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      b.value ? (p(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (M) => s.value = !s.value)
      }, [
        Be(D(s.value ? e.viewLessLabel : _.value) + " ", 1),
        (p(), k("svg", {
          class: J(["view-more-icon", { "view-more-icon-rotated": s.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...$[3] || ($[3] = [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : z("", !0)
    ]));
  }
}), rt = /* @__PURE__ */ me(hp, [["__scopeId", "data-v-22a97a18"]]), fp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, gp = {
  key: "error",
  class: "error-state"
}, mp = { class: "error-content" }, pp = { class: "error-description" }, bp = {
  key: "content",
  class: "card-body"
}, vp = { class: "chart-section" }, yp = { class: "chart-wrapper" }, xp = { class: "payment-success-summary" }, _p = {
  key: 0,
  class: "booking-daily-section"
}, kp = { class: "w-full min-w-0" }, wp = { class: "font-medium" }, Cp = { class: "percentage-text" }, $p = { class: "badges-container" }, Sp = {
  key: 0,
  class: "badges-container"
}, Mp = {
  key: 1,
  class: "percentage-text"
}, Dp = { class: "badges-container" }, Tp = {
  key: 1,
  class: "empty-state"
}, Ap = /* @__PURE__ */ le({
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
    function n(f) {
      return f;
    }
    const a = e, s = t, o = (f) => {
      s("export", f);
    }, i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (f, x) => new Date(f.date).getTime() - new Date(x.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], r = C(
      () => i.value.map((f) => ({
        id: f.date,
        ...f
      }))
    ), c = C(() => a.data?.total_payment_success_value || []), d = C(() => {
      const f = c.value;
      return f.length === 0 ? g(0) : f.map(
        (x) => `${x.currency} ${g(x.total_value)}`
      ).join(" · ");
    }), h = (f) => f.payment_success_value || [], m = (f) => typeof f.payment_success_count == "number" ? f.payment_success_count : (f.payment_success_value || []).reduce(
      (x, _) => x + (_.count || 0),
      0
    ), v = (f) => Pe(f), g = (f) => f == null ? "0" : Et(f);
    C(() => (a.data?.total_payment_success_value || []).reduce(
      (f, x) => f + (x.total_value || 0),
      0
    ));
    const y = C(() => {
      const f = a.data, x = f.total_booking_initiated || 0, _ = f.total_booking_started || 0, w = f.total_payment_initiated || 0, $ = f.total_not_found || 0, M = f.total_cancelled || 0, S = f.total_no_pending_balance || 0, F = f.total_errors || 0, N = typeof f.total_payment_success == "number" ? f.total_payment_success : (f.total_payment_success_value || []).reduce(
        (G, ne) => G + (ne.count || 0),
        0
      ), O = f.total_payment_failed || 0, A = Math.max(0, x - _), L = Math.max(
        0,
        _ - w - $ - M - S - F
      ), V = (G, ne) => be(G, ne), I = [
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
      ], U = [];
      return _ > 0 && U.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: V(_, x)
      }), A > 0 && U.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: A,
        label: V(A, x)
      }), w > 0 && U.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: V(w, _)
      }), $ > 0 && U.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: V($, _)
      }), M > 0 && U.push({
        source: "Started",
        target: "Cancelled",
        value: M,
        label: V(M, _)
      }), S > 0 && U.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: V(S, _)
      }), F > 0 && U.push({
        source: "Started",
        target: "Errors",
        value: F,
        label: V(F, _)
      }), L > 0 && U.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: V(L, _)
      }), N > 0 && U.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: N,
        label: V(N, w)
      }), O > 0 && U.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: O,
        label: V(O, w)
      }), { nodes: I, links: U };
    }), b = (f, x) => dn(f, x);
    return (f, x) => (p(), ee(ke, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading && !a.error ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", fp, [...x[0] || (x[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : a.error ? (p(), k("div", gp, [
              u("div", mp, [
                x[1] || (x[1] = u("div", { class: "error-icon-wrapper" }, [
                  u("svg", {
                    class: "error-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    })
                  ])
                ], -1)),
                x[2] || (x[2] = u("p", { class: "error-title" }, "Error loading data", -1)),
                u("p", pp, D(a.error), 1)
              ])
            ])) : (p(), k("div", bp, [
              u("section", vp, [
                u("div", yp, [
                  E(qt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", xp, [
                E(ve, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (p(), k("section", _p, [
                x[3] || (x[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", kp, [
                  E(rt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", wp, D(T(je)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": B(({ row: _ }) => [
                      u("span", null, D(T(ie)(Number(_.booking_initiated_count))), 1)
                    ]),
                    "cell-started": B(({ row: _ }) => [
                      u("span", null, [
                        Be(D(T(ie)(Number(_.booking_started_count))) + " ", 1),
                        u("span", Cp, " (" + D(b(
                          Number(_.booking_started_count),
                          Number(_.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": B(({ row: _ }) => [
                      u("span", null, D(T(ie)(Number(_.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": B(({ row: _ }) => [
                      u("div", $p, [
                        E(Xe, { color: "success" }, {
                          default: B(() => [
                            Be(" Success: " + D(T(ie)(
                              m(_)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        E(Xe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Failed: " + D(T(ie)(Number(_.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": B(({ row: _ }) => [
                      h(_).length > 0 ? (p(), k("div", Sp, [
                        (p(!0), k(se, null, he(h(
                          _
                        ), (w) => (p(), k("span", {
                          key: `${_.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, D(w.currency) + " " + D(v(w.total_value)), 1))), 128))
                      ])) : (p(), k("span", Mp, "N/A"))
                    ]),
                    "cell-outcomes": B(({ row: _ }) => [
                      u("div", Dp, [
                        E(Xe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Not Found: " + D(_.not_found_count ? T(ie)(Number(_.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        E(Xe, { color: "warning" }, {
                          default: B(() => [
                            Be(" Cancelled: " + D(_.cancelled_count ? T(ie)(Number(_.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        E(Xe, { color: "orange" }, {
                          default: B(() => [
                            Be(" No Balance: " + D(_.no_pending_balance_count ? T(ie)(Number(_.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        E(Xe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Errors: " + D(_.error_count ? T(ie)(Number(_.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("section", Tp, [...x[4] || (x[4] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No booking manager data available"),
                  u("p", { class: "empty-description" }, " No booking manager data found for the selected period. Try adjusting the date range. ")
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
}), Bp = /* @__PURE__ */ me(Ap, [["__scopeId", "data-v-2a80b433"]]), Lp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Pp = {
  key: "content",
  class: "card-body"
}, Ip = {
  key: 0,
  class: "chart-section"
}, Rp = { class: "chart-wrapper" }, Ep = {
  key: 1,
  class: "checkin-daily-section"
}, Fp = { class: "w-full min-w-0" }, Op = { class: "font-medium" }, Vp = { class: "cell-success" }, zp = { class: "cell-danger" }, Np = {
  key: 0,
  class: "reasons-list"
}, Hp = { class: "reason-name" }, Wp = { class: "reason-count" }, jp = {
  key: 1,
  class: "no-reasons"
}, Kp = {
  key: 2,
  class: "empty-state"
}, Yp = {
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
    const n = t, a = (f) => {
      n("export", f);
    }, s = e, o = {
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
    }, l = oe([]), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], c = C(
      () => (l.value || []).map((f) => ({
        id: f.date,
        date: f.date,
        checkin_initiated_count: f.checkin_initiated_count,
        checkin_init_count: f.checkin_init_count,
        checkin_started_count: f.checkin_started_count,
        checkin_completed_count: f.checkin_completed_count,
        checkin_closed_count: f.checkin_closed_count,
        failed_steps: f.failed_steps
      }))
    ), d = C(() => {
      const f = s.data;
      return f && (Array.isArray(f.checkin_by_day) && f.checkin_by_day.length > 0 || (f.total_checkin_initiated ?? 0) > 0) ? { ...o, ...f } : s.checkinData ?? o;
    }), h = C(() => {
      const f = s.data;
      return f && (Array.isArray(f.failed_by_step_by_day) && f.failed_by_step_by_day.length > 0 || Array.isArray(f.unrecovered_by_step) && f.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: f.total_checkin_failed ?? 0,
        total_checkin_unrecovered: f.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: f.failed_by_step_by_day ?? [],
        unrecovered_by_step: f.unrecovered_by_step ?? [],
        unrecovered_by_day: f.unrecovered_by_day ?? []
      } : s.failedData ?? i;
    }), m = (f, x) => !x || x === 0 ? "0.0%" : dn(f, x), v = (f, x) => {
      const _ = ie(f), w = m(f, x);
      return `${_} (${w})`;
    }, g = (f) => f.reduce((x, _) => x + _.failed_count, 0), y = C(() => {
      const f = [], x = [];
      if (!d.value.total_checkin_initiated)
        return { nodes: f, links: x };
      f.push({ name: "Checkin Init" }), f.push({ name: "Booking retrive" }), f.push({ name: "Booking retrive success" }), f.push({ name: "Number of Passengers" }), f.push({ name: "Completed" }), f.push({ name: "Closed with BP" });
      const _ = d.value.total_checkin_initiated, w = d.value.total_checkin_init, $ = d.value.total_checkin_init_abandoned, M = w - $, S = d.value.total_checkin_started, F = d.value.total_checkin_completed, N = d.value.total_checkin_closed, O = h.value.unrecovered_by_step || [], A = O.reduce(
        (U, G) => U + G.count,
        0
      );
      w > 0 && x.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: w,
        label: be(w, _)
      });
      const L = _ - w;
      L > 0 && (f.push({ name: "Abandoned (Init)", status: "abandon" }), x.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: L,
        label: be(L, _)
      })), $ > 0 && (f.push({ name: "Abandoned (Started)", status: "abandon" }), x.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: $,
        label: be($, _)
      })), M > 0 && x.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: M,
        label: be(M, _)
      }), S > 0 && x.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: S,
        label: be(S, _)
      }), F > 0 && x.push({
        source: "Number of Passengers",
        target: "Completed",
        value: F,
        label: be(F, S)
      }), O.length > 0 && A > 0 && (f.push({ name: "Unrecovered", status: "error" }), x.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: A,
        label: be(A, S)
      }), O.forEach((U) => {
        const ne = U.step_name.replace(/_/g, " ").split(" ").map((ge) => ge.charAt(0).toUpperCase() + ge.slice(1)).join(" ");
        f.push({ name: ne, status: "error" }), x.push({
          source: "Unrecovered",
          target: ne,
          value: U.count,
          label: be(U.count, S)
        });
      }));
      const V = S - (F + A);
      V > 0 && (f.push({ name: "Abandoned (Flow)", status: "abandon" }), x.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: V,
        label: be(V, S)
      }));
      const I = F - N;
      return I > 0 && (f.push({ name: "BP Error", status: "error" }), x.push({
        source: "Completed",
        target: "BP Error",
        value: I,
        label: be(I, S)
      })), N > 0 && x.push({
        source: "Completed",
        target: "Closed with BP",
        value: N,
        label: be(N, S)
      }), { nodes: f, links: x };
    }), b = () => {
      const f = d.value.checkin_by_day || [], x = h.value.failed_by_step_by_day || [];
      if (f.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...f].map((_) => {
        const w = x.find(
          ($) => $.date === _.date
        );
        return {
          ..._,
          failed_steps: w?.steps || []
        };
      }), l.value.sort((_, w) => new Date(_.date) - new Date(w.date));
    };
    return Oe(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        b();
      },
      { deep: !0, immediate: !0 }
    ), (f, x) => (p(), ee(ke, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", Lp, [...x[0] || (x[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Pp, [
              y.value.nodes.length > 0 ? (p(), k("section", Ip, [
                u("div", Rp, [
                  E(qt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : z("", !0),
              l.value && l.value.length > 0 ? (p(), k("section", Ep, [
                u("div", Fp, [
                  E(rt, {
                    columns: r,
                    rows: c.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", Op, D(T(je)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": B(({ row: _ }) => [
                      u("span", null, D(T(ie)(_.checkin_initiated_count)), 1)
                    ]),
                    "cell-bookingRetrieve": B(({ row: _ }) => [
                      u("span", null, D(v(
                        _.checkin_init_count,
                        _.checkin_initiated_count
                      )), 1)
                    ]),
                    "cell-passengers": B(({ row: _ }) => [
                      u("span", null, D(T(ie)(_.checkin_started_count)), 1)
                    ]),
                    "cell-completed": B(({ row: _ }) => [
                      u("span", null, D(v(
                        _.checkin_completed_count,
                        _.checkin_started_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: _ }) => [
                      u("span", Vp, D(v(
                        _.checkin_closed_count,
                        _.checkin_started_count
                      )), 1)
                    ]),
                    "cell-failed": B(({ row: _ }) => [
                      u("span", zp, D(v(
                        g(_.failed_steps),
                        _.checkin_started_count
                      )), 1)
                    ]),
                    "cell-reasons": B(({ row: _ }) => [
                      _.failed_steps && _.failed_steps.length > 0 ? (p(), k("div", Np, [
                        (p(!0), k(se, null, he(_.failed_steps, (w) => (p(), k("div", {
                          key: w.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Hp, D(w.step_name.replace(/_/g, " ")) + ":", 1),
                          u("span", Wp, D(w.failed_count), 1)
                        ]))), 128))
                      ])) : (p(), k("div", jp, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("section", Kp, [...x[1] || (x[1] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No check-in data available"),
                  u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in performance data. ")
                ], -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}, ol = /* @__PURE__ */ me(Yp, [["__scopeId", "data-v-f12f3f34"]]), Up = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, qp = {
  key: "content",
  class: "card-body"
}, Xp = {
  key: 0,
  class: "sankey-section"
}, Gp = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, Zp = { class: "w-full min-w-0" }, Qp = { class: "font-medium whitespace-nowrap" }, Jp = { class: "cell-success" }, e0 = { class: "cell-danger" }, t0 = {
  key: 0,
  class: "reasons-list"
}, n0 = { class: "reason-name" }, a0 = { class: "reason-count" }, s0 = {
  key: 1,
  class: "no-reasons"
}, o0 = {
  key: 2,
  class: "empty-state"
}, i0 = { class: "empty-state-content" }, l0 = { class: "empty-icon-wrapper" }, r0 = /* @__PURE__ */ le({
  __name: "CheckinMetrics",
  props: {
    initiallyOpen: { type: Boolean, default: !1 },
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
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = Se($e(a, "theme")), l = (b) => b == null ? "0" : b.toLocaleString(), r = (b) => {
      const [f, x, _] = b.split("-").map(Number);
      return je([f, x - 1, _]).format("MMM DD");
    }, c = (b) => b.replace(/_/g, " ").replace(/\b\w/g, (f) => f.toUpperCase()), d = (b, f) => dn(b, f), h = (b, f) => {
      const x = b || 0, _ = f || 0, w = l(x), $ = d(x, _);
      return `${w} (${$})`;
    }, m = C(() => {
      const b = a.checkinData?.record_locator_by_day || [], f = a.failedData?.failed_by_step_by_day || [], x = a.failedData?.unrecovered_by_day || [];
      return b.map((w) => {
        const $ = f.find((S) => S.date === w.date), M = x.find(
          (S) => S.date === w.date
        );
        return {
          ...w,
          failed_steps: $?.steps || [],
          unrecovered_count: M?.unrecovered_count || 0
        };
      }).sort(
        (w, $) => new Date(w.date).getTime() - new Date($.date).getTime()
      );
    }), v = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], g = C(
      () => m.value.map((b) => ({
        id: b.date,
        date: b.date,
        checkin_initiated: b.checkin_initiated,
        record_locator_init_count: b.record_locator_init_count,
        record_locator_started_count: b.record_locator_started_count,
        record_locator_completed_count: b.record_locator_completed_count,
        record_locator_closed_count: b.record_locator_closed_count,
        unrecovered_count: b.unrecovered_count,
        failed_steps: b.failed_steps
      }))
    ), y = C(() => {
      const b = [], f = [], x = /* @__PURE__ */ new Set(), _ = (De) => {
        x.has(De) || (b.push({ name: De }), x.add(De));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: b, links: f };
      _("Checkin Init"), _("Booking Retrieval"), _("Booking Retrieved"), _("Completed"), _("Closed with BP");
      const w = a.checkinData.total_checkin_initiated || 0, $ = a.checkinData.total_record_locator_init || 0, M = a.checkinData.total_record_locator_init_abandoned || 0, S = a.checkinData.total_checkin_pre_init_abandoned_error, F = a.checkinData.total_checkin_pre_init_abandoned_voluntary, N = S != null || F != null, O = N ? Math.max(Number(S) || 0, 0) : 0, A = N ? Math.max(Number(F) || 0, 0) : 0, L = a.checkinData.total_record_locator_init_abandoned_error, V = a.checkinData.total_record_locator_init_abandoned_voluntary, I = L != null || V != null, U = I ? Math.max(Number(L) || 0, 0) : 0, G = I ? Math.max(Number(V) || 0, 0) : 0, ne = I ? Math.max(M - U - G, 0) : M, ge = $ - M, ye = a.checkinData.total_record_locator_started || 0, X = a.checkinData.total_record_locator_completed || 0, W = a.checkinData.total_record_locator_closed || 0, Q = a.checkinData.total_record_locator_unrecovered || 0;
      $ > 0 && f.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: $,
        label: be($, w)
      });
      const ae = w - $;
      N ? (A > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: A,
        label: be(A, w)
      })), O > 0 && (_("Booking not retreived"), f.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: O,
        label: be(O, w)
      }))) : ae > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: ae,
        label: be(ae, w)
      })), I ? (U > 0 && (_("Error"), f.push({
        source: "Booking Retrieval",
        target: "Error",
        value: U,
        label: be(U, w)
      })), G > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: G,
        label: be(G, w)
      })), ne > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: ne,
        label: be(ne, w)
      }))) : M > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: M,
        label: be(M, w)
      })), ge > 0 && f.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: ge,
        label: be(ge, w)
      }), X > 0 && f.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: X,
        label: be(X, ye)
      }), Q > 0 && (_("Errors"), f.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: Q,
        label: be(Q, ye)
      }));
      const fe = ye - (X + Q);
      fe > 0 && (_("Abandoned (Flow)"), f.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: fe,
        label: be(fe, ye)
      }));
      const we = X - W;
      return we > 0 && (_("BP Error"), f.push({
        source: "Completed",
        target: "BP Error",
        value: we,
        label: be(we, ye)
      })), W > 0 && f.push({
        source: "Completed",
        target: "Closed with BP",
        value: W,
        label: be(W, ye)
      }), { nodes: b, links: f };
    });
    return t({ isDark: i }), (b, f) => (p(), ee(ke, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", Up, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", qp, [
              y.value.nodes.length > 0 ? (p(), k("div", Xp, [
                E(qt, {
                  data: y.value,
                  height: "500px",
                  "use-gradient": !1,
                  "node-gap": 24
                }, null, 8, ["data"])
              ])) : z("", !0),
              m.value && m.value.length > 0 ? (p(), k("div", Gp, [
                u("div", Zp, [
                  E(rt, {
                    columns: v,
                    rows: g.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: x }) => [
                      u("span", Qp, D(r(String(x.date))), 1)
                    ]),
                    "cell-checkinInit": B(({ row: x }) => [
                      u("span", null, D(l(x.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieval": B(({ row: x }) => [
                      u("span", null, D(h(
                        x.record_locator_init_count,
                        x.checkin_initiated
                      )), 1)
                    ]),
                    "cell-bookingRetrieved": B(({ row: x }) => [
                      u("span", null, D(h(
                        x.record_locator_started_count,
                        x.record_locator_init_count
                      )), 1)
                    ]),
                    "cell-completed": B(({ row: x }) => [
                      u("span", null, D(h(
                        x.record_locator_completed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: x }) => [
                      u("span", Jp, D(h(
                        x.record_locator_closed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-failed": B(({ row: x }) => [
                      u("span", e0, D(h(
                        x.unrecovered_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-reasons": B(({ row: x }) => [
                      Array.isArray(x.failed_steps) && x.failed_steps.length > 0 ? (p(), k("div", t0, [
                        (p(!0), k(se, null, he(x.failed_steps, (_) => (p(), k("div", {
                          key: _.step_name,
                          class: "reason-item"
                        }, [
                          u("span", n0, D(c(_.step_name)) + ":", 1),
                          u("span", a0, D(_.failed_count), 1)
                        ]))), 128))
                      ])) : (p(), k("div", s0, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("div", o0, [
                u("div", i0, [
                  u("div", l0, [
                    E(T(nt), { class: "empty-icon" })
                  ]),
                  f[1] || (f[1] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
                  f[2] || (f[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
                ])
              ]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), c0 = /* @__PURE__ */ me(r0, [["__scopeId", "data-v-b86b263c"]]), d0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, u0 = {
  key: "content",
  class: "card-body"
}, h0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, f0 = { class: "w-full min-w-0" }, g0 = { class: "segment-plain" }, m0 = { class: "segment-plain" }, p0 = { class: "segment-plain" }, b0 = { class: "percentage-value" }, v0 = { class: "percentage-value" }, y0 = { class: "percentage-value success" }, x0 = {
  key: 1,
  class: "empty-state"
}, _0 = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (m) => {
      s("export", m);
    }, { isDark: i } = Se($e(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], r = C(
      () => a.data.map((m, v) => ({
        id: `segment-${v}-${m.departure_airport}-${m.arrival_airport}-${m.segment_init_count}-${m.segment_started_count}`,
        departure_airport: m.departure_airport,
        conexion_airport: m.conexion_airport,
        arrival_airport: m.arrival_airport,
        segment_init_count: m.segment_init_count,
        segment_started_count: m.segment_started_count,
        segment_completed_count: m.segment_completed_count,
        segment_closed_count: m.segment_closed_count
      }))
    ), c = (m, v) => !v || v === 0 || !m ? "0%" : `${Math.round(m / v * 100)}%`, d = (m) => !m || m === "None" ? "-" : String(m).trim().replace(/_[0-9]+$/i, ""), h = (m) => {
      const v = d(m?.departure_airport), g = d(m?.arrival_airport);
      return v === "-" || g === "-" ? !1 : v === g;
    };
    return t({ isDark: i }), (m, v) => (p(), ee(ke, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", d0, [...v[0] || (v[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", u0, [
              a.data.length > 0 ? (p(), k("section", h0, [
                u("div", f0, [
                  E(rt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-departure": B(({ row: g }) => [
                      u("span", g0, D(d(g.departure_airport)), 1)
                    ]),
                    "cell-connection": B(({ row: g }) => [
                      u("span", {
                        class: J(["segment-plain", {
                          "segment-plain--muted": d(g.conexion_airport) === "-"
                        }])
                      }, D(d(g.conexion_airport)), 3)
                    ]),
                    "cell-arrival": B(({ row: g }) => [
                      u("span", m0, D(d(g.arrival_airport)), 1)
                    ]),
                    "cell-trip": B(({ row: g }) => [
                      u("span", p0, D(h(g) ? "Roundtrip" : "One way"), 1)
                    ]),
                    "cell-init": B(({ row: g }) => [
                      Be(D(T(ie)(g.segment_init_count)), 1)
                    ]),
                    "cell-started": B(({ row: g }) => [
                      u("span", b0, D(c(
                        g.segment_started_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    "cell-completed": B(({ row: g }) => [
                      u("span", v0, D(c(
                        g.segment_completed_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: g }) => [
                      u("span", y0, D(c(
                        g.segment_closed_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("section", x0, [...v[1] || (v[1] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No segment data available"),
                  u("p", { class: "empty-description" }, " No flight segment data found for the selected period. Try adjusting the date range. ")
                ], -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), il = /* @__PURE__ */ me(_0, [["__scopeId", "data-v-522b5823"]]), k0 = { class: "checkin-container__body" }, w0 = /* @__PURE__ */ le({
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
    segmentsData: {}
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = C(() => n.loading || n.checkinLoading), o = C(() => n.loading || n.segmentsLoading);
    function i(c, d) {
      a("export", { source: c, format: d });
    }
    function l(c) {
      return typeof c == "object" && c !== null && "source" in c;
    }
    function r(c) {
      if (l(c)) {
        a("export", c);
        return;
      }
      i("checkinSegments", c);
    }
    return (c, d) => (p(), ee(ke, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", k0, [
          e.showCheckin ? (p(), ee(ol, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: d[0] || (d[0] = (h) => i("checkin", h))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : z("", !0),
          E(il, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
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
}), C0 = /* @__PURE__ */ me(w0, [["__scopeId", "data-v-2a3c9d34"]]), $0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, S0 = {
  key: "content",
  class: "card-body"
}, M0 = { class: "chart-section" }, D0 = { class: "chart-wrapper" }, T0 = {
  key: 1,
  class: "empty-chart"
}, A0 = { class: "payment-success-summary" }, B0 = {
  key: 0,
  class: "disruption-daily-section"
}, L0 = { class: "w-full min-w-0" }, P0 = { class: "font-medium text-center" }, I0 = { class: "text-center" }, R0 = { class: "text-center" }, E0 = { class: "percentage-text" }, F0 = { class: "text-center" }, O0 = { class: "abandoned-value" }, V0 = { class: "badges-container badges-wrap" }, z0 = { class: "badges-container badges-wrap" }, N0 = {
  key: 1,
  class: "empty-state"
}, H0 = /* @__PURE__ */ le({
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
    function n(b) {
      return b;
    }
    const a = e, s = t, o = (b) => {
      s("export", b);
    }, i = C(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (b, f) => new Date(b.date).getTime() - new Date(f.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], r = C(
      () => i.value.map((b) => ({
        id: b.date,
        ...b
      }))
    ), c = C(() => a.data?.total_payment_success || []), d = C(() => {
      const b = c.value;
      return b.length === 0 ? m(0) : b.map((f) => `${f.currency} ${m(f.total_value)}`).join(" · ");
    }), h = (b, f) => dn(b, f), m = (b) => Pe(b), v = (b) => (b ?? []).reduce((f, x) => f + (x.count ?? 0), 0), g = (b) => typeof b.sell_success_count == "number" ? b.sell_success_count : v(b.payment_success_total), y = C(() => {
      const b = a.data, f = b.total_disruption_conversations || 0, x = b.total_disruption_initiated || 0, _ = b.total_voluntary || 0, w = b.total_involuntary || 0, $ = b.total_accepted || 0, M = b.total_confirmed || 0, S = typeof b.total_sell_success == "number" ? b.total_sell_success : v(b.total_payment_success), F = b.total_sell_failed || 0, N = Math.max(0, f - x), O = Math.max(
        0,
        x - _ - w
      ), A = Math.max(0, w - $), L = Math.max(0, _ - M), V = F, I = Math.max(0, M - S - V), U = (ge, ye) => be(ge, ye), G = [
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
      ], ne = [];
      return x > 0 && ne.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: U(x, f)
      }), N > 0 && ne.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: N,
        label: U(N, f)
      }), _ > 0 && ne.push({
        source: "Started",
        target: "Voluntary",
        value: _,
        label: U(_, f)
      }), w > 0 && ne.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: U(w, f)
      }), O > 0 && ne.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: O,
        label: U(O, f)
      }), $ > 0 && ne.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: U($, f)
      }), A > 0 && ne.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: A,
        label: U(A, f)
      }), M > 0 && ne.push({
        source: "Voluntary",
        target: "Confirmed",
        value: M,
        label: U(M, f)
      }), L > 0 && ne.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: L,
        label: U(L, f)
      }), S > 0 && ne.push({
        source: "Confirmed",
        target: "Paid",
        value: S,
        label: U(S, f)
      }), V > 0 && ne.push({
        source: "Confirmed",
        target: "Rejected",
        value: V,
        label: U(V, f)
      }), I > 0 && ne.push({
        source: "Confirmed",
        target: "Not Paid",
        value: I,
        label: U(I, f)
      }), { nodes: G, links: ne };
    });
    return (b, f) => (p(), ee(ke, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", $0, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", S0, [
              u("section", M0, [
                u("div", D0, [
                  y.value.nodes.length > 0 && y.value.links.length > 0 ? (p(), ee(qt, {
                    key: 0,
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])) : (p(), k("div", T0, [...f[1] || (f[1] = [
                    u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
                  ])]))
                ])
              ]),
              u("section", A0, [
                E(ve, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value && i.value.length > 0 ? (p(), k("section", B0, [
                f[2] || (f[2] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", L0, [
                  E(rt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: x }) => [
                      u("span", P0, D(T(je)(String(x.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": B(({ row: x }) => [
                      u("span", I0, D(T(ie)(Number(x.disruption_conversations))), 1)
                    ]),
                    "cell-started": B(({ row: x }) => [
                      u("span", R0, [
                        Be(D(T(ie)(Number(x.disruption_initiated_count))) + " ", 1),
                        u("span", E0, " (" + D(h(
                          Number(x.disruption_initiated_count),
                          Number(x.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-abandoned": B(({ row: x }) => [
                      u("span", F0, [
                        u("span", O0, D(T(ie)(
                          Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count)
                        )) + " (" + D(h(
                          Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count),
                          Number(x.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-voluntary": B(({ row: x }) => [
                      u("div", V0, [
                        (p(!0), k(se, null, he([x], (_, w) => (p(), k(se, { key: w }, [
                          E(Xe, {
                            color: "neutral",
                            outlined: !0
                          }, {
                            default: B(() => [
                              Be(" VOL " + D(T(ie)(_.voluntary_count)) + " (" + D(h(
                                _.voluntary_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(Xe, { color: "success" }, {
                            default: B(() => [
                              Be(" Confirm " + D(T(ie)(_.confirmed_count)) + " (" + D(h(
                                _.confirmed_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(Xe, { color: "warning" }, {
                            default: B(() => [
                              Be(" Not Confirm " + D(T(ie)(_.voluntary_count - _.confirmed_count)) + " (" + D(h(
                                _.voluntary_count - _.confirmed_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(Xe, { color: "danger" }, {
                            default: B(() => [
                              Be(" Reject " + D(T(ie)(_.sell_failed_count)) + " (" + D(h(
                                _.sell_failed_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(Xe, { color: "orange" }, {
                            default: B(() => [
                              Be(" Not Paid " + D(T(ie)(
                                Math.max(
                                  0,
                                  _.confirmed_count - g(_) - _.sell_failed_count
                                )
                              )) + " (" + D(h(
                                Math.max(
                                  0,
                                  _.confirmed_count - g(_) - _.sell_failed_count
                                ),
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(Xe, {
                            color: "success",
                            outlined: !0
                          }, {
                            default: B(() => [
                              Be(" Finish " + D(T(ie)(g(_))) + " (" + D(h(
                                g(_),
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          (p(!0), k(se, null, he(_.payment_success_total || [], ($) => (p(), ee(Xe, {
                            key: `${_.date}-${$.currency}`,
                            color: "neutral"
                          }, {
                            default: B(() => [
                              Be(D($.currency) + " " + D(m($.total_value)), 1)
                            ]),
                            _: 2
                          }, 1024))), 128))
                        ], 64))), 128))
                      ])
                    ]),
                    "cell-involuntary": B(({ row: x }) => [
                      u("div", z0, [
                        (p(!0), k(se, null, he([x], (_, w) => (p(), k(se, { key: w }, [
                          E(Xe, { color: "purple" }, {
                            default: B(() => [
                              Be(" INV " + D(T(ie)(_.involuntary_count)) + " (" + D(h(
                                _.involuntary_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(Xe, { color: "danger" }, {
                            default: B(() => [
                              Be(" Human " + D(T(ie)(_.involuntary_count - _.accepted_count)) + " (" + D(h(
                                _.involuntary_count - _.accepted_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(Xe, { color: "success" }, {
                            default: B(() => [
                              Be(" Accept " + D(T(ie)(_.accepted_count)) + " (" + D(h(
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
              ])) : (p(), k("section", N0, [...f[3] || (f[3] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No disruption data available"),
                  u("p", { class: "empty-description" }, " No disruption data found for the selected period. Try adjusting the date range. ")
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
}), W0 = /* @__PURE__ */ me(H0, [["__scopeId", "data-v-a60fbfa7"]]), j0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, K0 = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Y0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, U0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, q0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, X0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, G0 = /* @__PURE__ */ le({
  __name: "FAQ",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (v) => {
      s("export", v);
    }, i = $e(a, "theme"), { isDark: l } = Se(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = oe({
      labels: [],
      datasets: []
    }), d = C(
      () => a.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), h = C(() => {
      const v = d.value, g = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, y = (x) => g > 0 ? (x / g * 100).toFixed(1) : "0.0", b = v.total_faq_events, f = b > 0 ? `${(v.total_documents_found / b * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${y(v.total_airline_information_retrieved)}%`,
          subvalue: `${ie(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${y(v.total_booking_info_retrieved)}%`,
          subvalue: `${ie(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${y(v.total_flight_status_retrieved)}%`,
          subvalue: `${ie(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: ie(v.total_documents_found),
          subvalue: f
        }
      ];
    }), m = (v) => {
      if (!v) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = v.faq_by_day || [];
      if (g.length > 0) {
        const y = g.map(
          (_) => je(_.date).format("MMM DD")
        ), b = g.map(
          (_) => _.airline_information_retrieved_count || 0
        ), f = g.map(
          (_) => _.flight_status_retrieved_count || 0
        ), x = g.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: y,
          datasets: [
            {
              label: "Airline Information",
              data: b,
              borderColor: r.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: f,
              borderColor: r.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: x,
              borderColor: r.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Oe(
      () => a.data,
      (v) => {
        m(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (v, g) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: o
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: J(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          E(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (p(), k("div", j0, [...g[0] || (g[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", K0, [
                c.value.labels && c.value.labels.length ? (p(), k("section", Y0, [
                  u("div", U0, [
                    E(yt, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", q0, [
                    (p(!0), k(se, null, he(h.value, (y) => (p(), ee(ve, {
                      key: y.name,
                      class: "min-w-0",
                      color: y.color,
                      title: y.label,
                      value: y.value,
                      subvalue: y.subvalue
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : (p(), k("section", X0, [...g[1] || (g[1] = [
                  u("div", { class: "max-w-[360px] px-4 text-center" }, [
                    u("div", { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, [
                      u("svg", {
                        class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "aria-hidden": "true"
                      }, [
                        u("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      ])
                    ]),
                    u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No FAQ data available "),
                    u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No FAQ consultation data found for the selected period. Try adjusting the date range. ")
                  ], -1)
                ])]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Z0 = /* @__PURE__ */ me(G0, [["__scopeId", "data-v-5d7a0066"]]), Q0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, J0 = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, eb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, tb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, nb = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, ab = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, sb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, ob = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ib = { class: "max-w-[360px] px-4 text-center" }, lb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, rb = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
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
    }, s = e, o = n, i = (m) => {
      o("export", m);
    }, l = $e(s, "theme"), { isDark: r } = Se(l), c = C(() => {
      const m = s.data?.agents_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const f of Object.values(m))
        for (const x of Object.keys(f))
          g.add(x);
      const b = Array.from(g).map((f) => {
        const x = f.toLowerCase(), _ = a[x] || a[f] || "#94a3b8";
        return {
          label: f.charAt(0).toUpperCase() + f.slice(1).replace(/_/g, " "),
          data: v.map((w) => m[w]?.[f] || 0),
          borderColor: _
        };
      });
      return {
        labels: v.map((f) => je(f).format("MMM DD")),
        datasets: b
      };
    }), d = C(() => {
      const m = s.data?.agents_by_day || {}, v = {};
      for (const y of Object.values(m))
        for (const [b, f] of Object.entries(y))
          v[b] = (v[b] || 0) + f;
      const g = Object.values(v).reduce((y, b) => y + b, 0);
      return g === 0 ? [] : Object.entries(v).sort(([, y], [, b]) => b - y).map(([y, b]) => {
        const f = y.toLowerCase();
        return {
          name: y,
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          total: b,
          percentage: (b / g * 100).toFixed(1),
          color: a[f] || a[y] || "#94a3b8"
        };
      });
    }), h = C(() => d.value.slice(0, 4));
    return t({ isDark: r }), (m, v) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: J(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", s.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          E(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              s.loading ? (p(), k("div", Q0, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", J0, [
                c.value.labels && c.value.labels.length ? (p(), k("section", eb, [
                  u("div", tb, [
                    E(yt, {
                      data: c.value,
                      options: e.options,
                      theme: l.value
                    }, null, 8, ["data", "options", "theme"])
                  ]),
                  h.value.length ? (p(), k("div", nb, [
                    (p(!0), k(se, null, he(h.value, (g) => (p(), ee(ve, {
                      key: g.name,
                      class: "min-w-0",
                      color: g.color,
                      title: g.label,
                      value: `${g.percentage}%`,
                      subvalue: `${T(ie)(g.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])) : z("", !0)
                ])) : d.value.length ? (p(), k("section", ab, [
                  u("div", sb, [
                    (p(!0), k(se, null, he(h.value, (g) => (p(), ee(ve, {
                      key: g.name,
                      class: "min-w-0",
                      color: g.color,
                      title: g.label,
                      value: `${g.percentage}%`,
                      subvalue: `${T(ie)(g.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : z("", !0),
                d.value.length ? z("", !0) : (p(), k("section", ob, [
                  u("div", ib, [
                    u("div", lb, [
                      E(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                    ]),
                    v[1] || (v[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                    v[2] || (v[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
                  ])
                ]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), cb = /* @__PURE__ */ me(rb, [["__scopeId", "data-v-299d9c3f"]]), db = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ub = {
  key: "content",
  class: "card-body"
}, hb = {
  key: 0,
  class: "chart-section"
}, fb = { class: "chart-wrapper" }, gb = {
  key: 1,
  class: "record-locator-daily-section"
}, mb = { class: "w-full min-w-0" }, pb = { class: "cell-plain font-medium" }, bb = { class: "cell-plain text-center" }, vb = { class: "cell-plain text-center" }, yb = { class: "cell-plain text-center" }, xb = { class: "cell-plain text-center" }, _b = { class: "cell-plain text-center success-value" }, kb = { class: "cell-plain text-center failed-value" }, wb = { class: "cell-plain text-center warning-value" }, Cb = { class: "cell-plain text-center" }, $b = { class: "cell-plain text-center failed-value" }, Sb = {
  key: 2,
  class: "empty-state"
}, Mb = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = Se($e(a, "theme")), l = C(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (b, f) => new Date(b.date).getTime() - new Date(f.date).getTime()
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
    ], d = C(
      () => a.isAvianca ? [...r, ...c] : r
    ), h = C(
      () => l.value.map((b) => ({
        id: b.date,
        date: b.date,
        checkin_initiated: b.checkin_initiated,
        record_locator_init_count: b.record_locator_init_count,
        record_locator_started_count: b.record_locator_started_count,
        record_locator_completed_count: b.record_locator_completed_count,
        record_locator_closed_count: b.record_locator_closed_count,
        record_locator_failed_count: b.record_locator_failed_count,
        record_locator_abandoned_count: b.record_locator_abandoned_count,
        record_locator_create_payment_count: b.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: b.record_locator_create_payment_failed_count
      }))
    ), m = C(() => a.data), v = (b, f) => dn(b, f), g = (b, f) => {
      const x = ie(b), _ = v(b, f);
      return `${x} (${_})`;
    }, y = C(() => {
      const b = [], f = [], x = /* @__PURE__ */ new Set(), _ = (ae) => {
        x.has(ae) || (b.push({ name: ae }), x.add(ae));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: b, links: f };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const w = m.value.total_checkin_initiated, $ = m.value.total_record_locator_init, M = m.value.total_record_locator_started, S = m.value.total_record_locator_completed, F = m.value.total_record_locator_closed, N = m.value.total_record_locator_failed, O = m.value.total_record_locator_abandoned, A = m.value.total_record_locator_init_abandoned, L = m.value.total_checkin_pre_init_abandoned_error, V = m.value.total_checkin_pre_init_abandoned_voluntary, I = L != null || V != null, U = I ? Math.max(Number(L) || 0, 0) : 0, G = I ? Math.max(Number(V) || 0, 0) : 0, ne = m.value.total_record_locator_init_abandoned_error, ge = m.value.total_record_locator_init_abandoned_voluntary, ye = ne != null || ge != null, X = ye ? Math.max(Number(ne) || 0, 0) : 0, W = ye ? Math.max(Number(ge) || 0, 0) : 0;
      $ > 0 && f.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: be($, w)
      });
      const Q = w - $;
      return I ? (G > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: G,
        label: be(G, w)
      })), U > 0 && (_("Booking not retreived"), f.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: U,
        label: be(U, w)
      }))) : Q > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: be(Q, w)
      })), M > 0 && f.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: M,
        label: be(M, w)
      }), ye ? (X > 0 && (_("Error"), f.push({
        source: "Booking retrive",
        target: "Error",
        value: X,
        label: be(X, w)
      })), W > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: W,
        label: be(W, w)
      }))) : A > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: A,
        label: be(A, w)
      })), S > 0 && f.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: S,
        label: be(S, M)
      }), F > 0 && f.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: F,
        label: be(F, M)
      }), N > 0 && (_("Checkin Failed"), f.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: N,
        label: be(N, M)
      })), O > 0 && (_("Abandoned (Flow)"), f.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: O,
        label: be(O, M)
      })), { nodes: b, links: f };
    });
    return t({ isDark: i }), (b, f) => (p(), ee(ke, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            a.loading ? (p(), k("div", db, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", ub, [
              y.value.nodes.length > 0 ? (p(), k("section", hb, [
                u("div", fb, [
                  E(qt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : z("", !0),
              l.value && l.value.length > 0 ? (p(), k("section", gb, [
                u("div", mb, [
                  E(rt, {
                    columns: d.value,
                    rows: h.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: x }) => [
                      u("span", pb, D(T(je)(String(x.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": B(({ row: x }) => [
                      u("span", bb, D(T(ie)(x.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieve": B(({ row: x }) => [
                      u("span", vb, D(g(
                        x.record_locator_init_count,
                        x.checkin_initiated
                      )), 1)
                    ]),
                    "cell-checkinStarted": B(({ row: x }) => [
                      u("span", yb, D(T(ie)(x.record_locator_started_count)), 1)
                    ]),
                    "cell-checkinCompleted": B(({ row: x }) => [
                      u("span", xb, D(g(
                        x.record_locator_completed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinClosed": B(({ row: x }) => [
                      u("span", _b, D(g(
                        x.record_locator_closed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinFailed": B(({ row: x }) => [
                      u("span", kb, D(g(
                        x.record_locator_failed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-abandoned": B(({ row: x }) => [
                      u("span", wb, D(g(
                        x.record_locator_abandoned_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-createPayment": B(({ row: x }) => [
                      u("span", Cb, D(T(ie)(
                        x.record_locator_create_payment_count ?? 0
                      )), 1)
                    ]),
                    "cell-failedPayment": B(({ row: x }) => [
                      u("span", $b, D(T(ie)(
                        x.record_locator_create_payment_failed_count ?? 0
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["columns", "rows"])
                ])
              ])) : (p(), k("section", Sb, [...f[1] || (f[1] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No record locator data available"),
                  u("p", { class: "empty-description" }, " No record locator data found for the selected period. Try adjusting the date range. ")
                ], -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["collapsible", "loading"]));
  }
}), Db = /* @__PURE__ */ me(Mb, [["__scopeId", "data-v-00877097"]]), Tb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ab = {
  key: "content",
  class: "card-body"
}, Bb = {
  key: 0,
  class: "chart-section"
}, Lb = {
  key: 1,
  class: "empty-state"
}, Pb = {
  key: 2,
  class: "comparison-section"
}, Ib = { class: "comparison-grid" }, Rb = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = {
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
    }, s = [
      "#B0C4DE",
      "#C9A0F2",
      "#F5C26B",
      "#8BE8B0",
      "#F2A07A",
      "#7BA3E8"
    ], o = e, i = n, l = (g) => {
      i("export", g);
    }, { isDark: r } = Se($e(o, "theme"));
    C(() => o.data?.total_sell_success ?? 0);
    const c = C(() => {
      const g = /* @__PURE__ */ new Set();
      for (const y of o.data?.sales_by_channel_by_day ?? [])
        for (const b of Object.keys(y.channels))
          g.add(b);
      return Array.from(g).sort();
    }), d = (g, y) => a[g.toLowerCase()] ?? s[y % s.length];
    function h(g) {
      return g.replace(/_/g, " ").toUpperCase();
    }
    function m(g) {
      if (g.delta === null) return "No previous data";
      const y = ie(g.previous), b = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${y})` : `${g.delta > 0 ? "↑" : "↓"} ${b} vs prev. period (${y})`;
    }
    const v = C(() => {
      const g = o.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const y = g.map((f) => je(f.date).format("MMM-DD")), b = c.value.map((f, x) => ({
        label: f,
        data: g.map((_) => _.channels[f] ?? 0),
        backgroundColor: d(f, x),
        borderRadius: 4
      }));
      return { labels: y, datasets: b };
    });
    return t({ isDark: r }), (g, y) => (p(), ee(ke, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            o.loading ? (p(), k("div", Tb, [...y[0] || (y[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Ab, [
              v.value.labels.length > 0 ? (p(), k("section", Bb, [
                E(St, {
                  data: v.value,
                  stacked: !0
                }, null, 8, ["data"])
              ])) : (p(), k("section", Lb, [...y[1] || (y[1] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No sales data available"),
                  u("p", { class: "empty-description" }, " No sales by channel data found for the selected period. Try adjusting the date range. ")
                ], -1)
              ])])),
              e.channelComparison.length > 0 ? (p(), k("section", Pb, [
                u("div", Ib, [
                  (p(!0), k(se, null, he(e.channelComparison, (b, f) => (p(), ee(T(ve), {
                    key: b.channel,
                    color: d(b.channel, f),
                    title: h(b.channel),
                    value: T(ie)(b.current),
                    subvalue: m(b)
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : z("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), ll = /* @__PURE__ */ me(Rb, [["__scopeId", "data-v-b99f46a5"]]), Eb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Fb = {
  key: "content",
  class: "card-body"
}, Ob = {
  key: 0,
  class: "chart-section"
}, Vb = { class: "chart-wrapper" }, zb = {
  key: 1,
  class: "empty-state"
}, Nb = { class: "seller-value-cards" }, Hb = {
  key: 2,
  class: "seller-daily-section"
}, Wb = { class: "w-full min-w-0" }, jb = { class: "sl-cell font-medium" }, Kb = { class: "sl-cell text-center" }, Yb = { class: "sl-cell text-center" }, Ub = { class: "sl-cell text-center" }, qb = { class: "sl-cell text-center" }, Xb = { class: "sl-cell text-center" }, Gb = { class: "sl-cell text-center success-value" }, Zb = {
  key: 0,
  class: "currency-cell-list"
}, Qb = {
  key: 1,
  class: "empty-cell"
}, Jb = { class: "sl-cell text-center success-value" }, ev = { class: "sl-cell text-center" }, tv = { class: "sl-cell text-center success-value" }, nv = {
  key: 0,
  class: "currency-cell-list"
}, av = {
  key: 1,
  class: "empty-cell"
}, sv = { class: "sl-cell text-center success-value" }, ov = { class: "sl-cell text-center" }, iv = { class: "sl-cell text-center success-value" }, lv = {
  key: 0,
  class: "currency-cell-list"
}, rv = { key: 1 }, cv = {
  key: 0,
  class: "failed-reasons"
}, dv = { class: "reason-name" }, uv = { class: "reason-count" }, hv = {
  key: 1,
  class: "empty-cell"
}, fv = /* @__PURE__ */ le({
  __name: "Seller",
  props: {
    sellerData: { default: () => ({
      total_seller_conversations: 0,
      total_sell_started: 0,
      total_sell_get_quote: 0,
      total_sell_booking_created: 0,
      total_sell_success: 0,
      total_sell_bank_transfer: 0,
      total_sell_cash_option: 0,
      total_value_sell_success: 0,
      total_value_sell_bank_transfer: [],
      total_value_sell_cash_option: [],
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
    initiallyOpen: { type: Boolean, default: !0 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    function a(A) {
      return A;
    }
    const s = e, o = n, i = (A) => {
      o("export", A);
    }, { isDark: l } = Se($e(s, "theme")), r = C(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const A = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((L) => {
        const V = A.findIndex(
          (I) => I.date === L.date
        );
        V !== -1 ? A[V] = { ...A[V], reasons: L.reasons } : A.push({
          date: L.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          sell_bank_transfer_count: 0,
          sell_cash_option_count: 0,
          daily_value_sell_success: 0,
          daily_value_sell_bank_transfer: [],
          daily_value_sell_cash_option: [],
          reasons: L.reasons
        });
      }), A.sort(
        (L, V) => new Date(L.date).getTime() - new Date(V.date).getTime()
      );
    }), c = [
      { key: "date", label: "Date", align: "center" },
      { key: "sellInitiated", label: "Sell Initiated", align: "center" },
      { key: "sellStarted", label: "Sell Started", align: "center" },
      { key: "getQuote", label: "Get Quote", align: "center" },
      { key: "bookingCreated", label: "Booking Created", align: "center" },
      { key: "bankTransfer", label: "Bank Transfer", align: "center" },
      { key: "btValue", label: "BT Success Value", align: "center" },
      { key: "btSuccess", label: "BT Success", align: "center" },
      { key: "cashOption", label: "Cash Option", align: "center" },
      { key: "coValue", label: "CO Success Value", align: "center" },
      { key: "cashSuccess", label: "Cash Success", align: "center" },
      { key: "sellSuccess", label: "Sell Success", align: "center" },
      { key: "totalSalesValue", label: "Total Sales Value", align: "center" },
      { key: "failed", label: "Failed", align: "left" }
    ], d = C(
      () => r.value.map((A) => ({
        id: A.date,
        ...A
      }))
    ), h = C(() => s.sellerData), m = C(() => s.failedData), v = C(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), g = C(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), y = C(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), b = C(() => {
      const A = v.value;
      return A.length > 0 ? A.map(
        (L) => `${L.currency} ${Et(L.total_value)}`
      ).join(" · ") : O(s.sellerData.total_value_sell_success);
    });
    function f(A) {
      return A.length > 0 ? A.map(
        (L) => `${L.currency} ${Et(L.total_value)}`
      ).join(" · ") : "—";
    }
    const x = C(
      () => f(g.value)
    ), _ = C(
      () => f(y.value)
    ), w = (A) => A.replace(/_/g, " ").replace(/\b\w/g, (L) => L.toUpperCase()), $ = (A) => `Failed:
${w(A)}`, M = C(() => {
      const {
        total_seller_conversations: A = 0,
        total_sell_started: L = 0,
        total_sell_booking_created: V = 0,
        total_sell_success: I = 0,
        total_sell_bank_transfer: U = 0,
        total_sell_cash_option: G = 0,
        total_sell_success_bank_transfer: ne = 0,
        total_sell_success_cash: ge = 0
      } = h.value, { failed_by_reason_by_day: ye = [] } = m.value;
      if (A === 0) return { nodes: [], links: [] };
      const X = Math.max(
        0,
        I - (ne ?? 0) - (ge ?? 0)
      ), W = [
        { name: "Sell Initiated", value: A, status: "success" },
        { name: "Sell Started", value: L, status: "success" },
        { name: "Booking Created", value: V, status: "success" },
        { name: "Sell Success", value: X, status: "success" }
      ], Q = [], ae = A - L;
      ae > 0 && (W.push({
        name: "Abandoned (Init)",
        value: ae,
        status: "abandon"
      }), Q.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: ae,
        label: be(ae, A)
      })), L > 0 && Q.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: L,
        label: be(L, A)
      });
      const fe = ye.reduce(
        (R, H) => (H.reasons && Array.isArray(H.reasons) && H.reasons.forEach((K) => {
          const de = K.reason, q = K.failed_count;
          R[de] = (R[de] || 0) + q;
        }), R),
        {}
      );
      V > 0 && Q.push({
        source: "Sell Started",
        target: "Booking Created",
        value: V,
        label: be(V, A)
      }), U > 0 && (W.push({ name: "Bank Transfer", value: U, status: "success" }), Q.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: U,
        label: be(U, A)
      })), G > 0 && (W.push({ name: "Cash Option", value: G, status: "success" }), Q.push({
        source: "Booking Created",
        target: "Cash Option",
        value: G,
        label: be(G, A)
      })), X > 0 && Q.push({
        source: "Booking Created",
        target: "Sell Success",
        value: X,
        label: be(X, A)
      }), (ne ?? 0) > 0 && (W.push({
        name: "Bank Transfer Success",
        value: ne ?? 0,
        status: "success"
      }), Q.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: ne ?? 0,
        label: be(ne ?? 0, A)
      })), (ge ?? 0) > 0 && (W.push({
        name: "Cash Option Success",
        value: ge ?? 0,
        status: "success"
      }), Q.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: ge ?? 0,
        label: be(ge ?? 0, A)
      }));
      const we = V - X - U - G;
      we > 0 && (W.push({
        name: "Failed at Completion",
        value: we,
        status: "error"
      }), Q.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: we,
        label: be(we, A)
      }));
      const De = L - V;
      if (De > 0 && (W.push({
        name: "Failed at Booking",
        value: De,
        status: "error"
      }), Q.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: De,
        label: be(De, A)
      })), Object.keys(fe).length > 0) {
        const R = Object.values(fe).reduce(
          (K, de) => K + de,
          0
        ), H = De - R;
        Object.entries(fe).filter(([, K]) => K > 0).sort(([, K], [, de]) => de - K).forEach(([K, de]) => {
          const q = `Failed: ${K}`;
          W.push({
            name: q,
            value: de,
            status: "error",
            label: $(K)
          }), Q.push({
            source: "Failed at Booking",
            target: q,
            value: de,
            label: be(de, A)
          });
        }), H > 0 && (W.push({
          name: "Failed: Without Reason",
          value: H,
          status: "error",
          label: `Failed:
Without Reason`
        }), Q.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: H,
          label: be(H, A)
        }));
      }
      return { nodes: W, links: Q };
    }), S = (A, L) => dn(A, L), F = (A, L) => {
      const V = ie(A), I = S(A, L);
      return `${V} (${I})`;
    }, N = (A) => A == null ? 0 : typeof A == "number" ? A : Array.isArray(A) ? A.reduce((L, V) => L + (V.total_value || 0), 0) : 0, O = (A) => Et(N(A));
    return t({ isDark: l }), (A, L) => (p(), ee(ke, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (p(), k("div", Eb, [...L[0] || (L[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Fb, [
              M.value.nodes.length > 0 ? (p(), k("section", Ob, [
                u("div", Vb, [
                  E(qt, {
                    data: M.value,
                    height: "560px"
                  }, null, 8, ["data"])
                ])
              ])) : (p(), k("section", zb, [...L[1] || (L[1] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No sales data available"),
                  u("p", { class: "empty-description" }, " No sales data found for the selected period. Try adjusting the date range. ")
                ], -1)
              ])])),
              u("section", Nb, [
                E(ve, {
                  class: "seller-value-card",
                  color: "var(--kiut-success)",
                  title: "Total Sales Value",
                  value: b.value
                }, null, 8, ["value"]),
                E(ve, {
                  class: "seller-value-card",
                  color: "#d97706",
                  title: "Bank Transfer Value",
                  value: x.value
                }, null, 8, ["value"]),
                E(ve, {
                  class: "seller-value-card",
                  color: "#ca8a04",
                  title: "Cash Option Value",
                  value: _.value
                }, null, 8, ["value"])
              ]),
              r.value && r.value.length > 0 ? (p(), k("section", Hb, [
                u("div", Wb, [
                  E(rt, {
                    columns: c,
                    rows: d.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: V }) => [
                      u("span", jb, D(T(je)(String(V.date)).format("MMM DD")), 1)
                    ]),
                    "cell-sellInitiated": B(({ row: V }) => [
                      u("span", Kb, D(T(ie)(Number(V.seller_conversations) || 0)), 1)
                    ]),
                    "cell-sellStarted": B(({ row: V }) => [
                      u("span", Yb, D(F(
                        V.sell_started_count,
                        V.seller_conversations || V.sell_started_count
                      )), 1)
                    ]),
                    "cell-getQuote": B(({ row: V }) => [
                      u("span", Ub, D(F(
                        V.sell_get_quote_count,
                        V.seller_conversations || V.sell_started_count
                      )), 1)
                    ]),
                    "cell-bookingCreated": B(({ row: V }) => [
                      u("span", qb, D(F(
                        V.sell_booking_created_count,
                        V.seller_conversations || V.sell_started_count
                      )), 1)
                    ]),
                    "cell-bankTransfer": B(({ row: V }) => [
                      u("span", Xb, D(T(ie)(Number(V.sell_bank_transfer_count) || 0)), 1)
                    ]),
                    "cell-btValue": B(({ row: V }) => [
                      u("span", Gb, [
                        Array.isArray(
                          V.daily_value_sell_success_bank_transfer
                        ) && V.daily_value_sell_success_bank_transfer.length > 0 ? (p(), k("div", Zb, [
                          (p(!0), k(se, null, he(V.daily_value_sell_success_bank_transfer, (I) => (p(), k("span", {
                            key: `${V.date}-bt-success-${I.currency}`
                          }, D(I.currency) + " " + D(T(Et)(I.total_value)), 1))), 128))
                        ])) : (p(), k("span", Qb, "-"))
                      ])
                    ]),
                    "cell-btSuccess": B(({ row: V }) => [
                      u("span", Jb, D(T(ie)(
                        Number(
                          V.sell_success_bank_transfer_count
                        ) || 0
                      )), 1)
                    ]),
                    "cell-cashOption": B(({ row: V }) => [
                      u("span", ev, D(T(ie)(Number(V.sell_cash_option_count) || 0)), 1)
                    ]),
                    "cell-coValue": B(({ row: V }) => [
                      u("span", tv, [
                        Array.isArray(
                          V.daily_value_sell_success_cash
                        ) && V.daily_value_sell_success_cash.length > 0 ? (p(), k("div", nv, [
                          (p(!0), k(se, null, he(V.daily_value_sell_success_cash, (I) => (p(), k("span", {
                            key: `${V.date}-co-success-${I.currency}`
                          }, D(I.currency) + " " + D(T(Et)(I.total_value)), 1))), 128))
                        ])) : (p(), k("span", av, "-"))
                      ])
                    ]),
                    "cell-cashSuccess": B(({ row: V }) => [
                      u("span", sv, D(T(ie)(
                        Number(V.sell_success_cash_count) || 0
                      )), 1)
                    ]),
                    "cell-sellSuccess": B(({ row: V }) => [
                      u("span", ov, D(F(
                        V.sell_success_count,
                        V.seller_conversations || V.sell_started_count
                      )), 1)
                    ]),
                    "cell-totalSalesValue": B(({ row: V }) => [
                      u("span", iv, [
                        Array.isArray(V.daily_value_sell_success) && V.daily_value_sell_success.length > 0 ? (p(), k("div", lv, [
                          (p(!0), k(se, null, he(V.daily_value_sell_success, (I) => (p(), k("span", {
                            key: `${V.date}-${I.currency}`
                          }, D(I.currency) + " " + D(T(Et)(I.total_value)), 1))), 128))
                        ])) : (p(), k("span", rv, D(O(
                          V.daily_value_sell_success
                        )), 1))
                      ])
                    ]),
                    "cell-failed": B(({ row: V }) => [
                      (V.reasons || []).length > 0 ? (p(), k("div", cv, [
                        (p(!0), k(se, null, he(V.reasons || [], (I) => (p(), k("div", {
                          key: I.reason,
                          class: "failed-reason-item"
                        }, [
                          u("span", dv, D(I.reason) + ":", 1),
                          u("span", uv, D(I.failed_count), 1)
                        ]))), 128))
                      ])) : (p(), k("div", hv, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : z("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), rl = /* @__PURE__ */ me(fv, [["__scopeId", "data-v-d2f74abd"]]), gv = { class: "seller-container__body" }, mv = /* @__PURE__ */ le({
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
    theme: { default: void 0 },
    sellerData: {},
    failedData: {},
    salesByChannelData: {},
    channelComparison: { default: () => [] }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = C(() => n.loading || n.sellerLoading), o = C(() => n.loading || n.salesByChannelLoading), i = C(() => n.exportLoading || n.sellerExportLoading), l = C(() => n.exportLoading || n.salesByChannelExportLoading);
    function r(c, d) {
      a("export", { source: c, format: d });
    }
    return (c, d) => (p(), ee(ke, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", gv, [
          E(rl, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => r("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          E(ll, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: d[1] || (d[1] = (h) => r("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), pv = /* @__PURE__ */ me(mv, [["__scopeId", "data-v-a9f0dfd2"]]), bv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, vv = {
  key: "content",
  class: "card-body"
}, yv = {
  key: 0,
  class: "chart-section"
}, xv = {
  key: 1,
  class: "empty-state"
}, _v = { class: "empty-state-content" }, kv = { class: "empty-icon-wrapper" }, wv = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
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
    }, s = e, o = n, i = (h) => {
      o("export", h);
    }, { isDark: l, colors: r } = Se($e(s, "theme")), c = C(() => {
      const m = (s.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const v = m.reduce(
        (b, f) => b + (Number(f.conversations) || 0),
        0
      ), g = m.map((b) => {
        const f = b.agent_type?.toLowerCase();
        return a[f] || "#94a3b8";
      }), y = g.map((b) => `${b}80`);
      return {
        labels: m.map((b) => {
          const f = Number(b.conversations) || 0, x = v ? f / v * 100 : 0;
          return `${b.agent_type} - ${f.toLocaleString()} (${x.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((b) => b.conversations),
            backgroundColor: y,
            borderColor: g,
            borderWidth: 2
          }
        ]
      };
    }), d = C(() => s.options ? s.options : {
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
            label: (h) => {
              const m = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (b, f) => b + (Number(f) || 0),
                0
              ), y = g ? v / g * 100 : 0;
              return `${m}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, m) => (p(), ee(ke, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", bv, [...m[0] || (m[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", vv, [
              c.value.labels && c.value.labels.length ? (p(), k("section", yv, [
                E(Ma, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])) : (p(), k("section", xv, [
                u("div", _v, [
                  u("div", kv, [
                    E(T(Bm), { class: "empty-icon" })
                  ]),
                  m[1] || (m[1] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                  m[2] || (m[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
                ])
              ]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Cv = /* @__PURE__ */ me(wv, [["__scopeId", "data-v-a52fe7ae"]]), $v = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Sv = {
  key: "content",
  class: "card-body"
}, Mv = {
  key: 0,
  class: "payment-methods-section"
}, Dv = { class: "payment-methods-grid" }, Tv = {
  key: 1,
  class: "empty-state"
}, Av = { class: "empty-state-content" }, Bv = { class: "empty-icon-wrapper" }, Lv = {
  key: 2,
  class: "payment-method-daily-section"
}, Pv = { class: "w-full min-w-0" }, Iv = { class: "font-medium" }, Rv = { class: "text-center" }, Ev = { class: "text-center success-value" }, Fv = {
  key: 0,
  class: "currency-cell-list"
}, Ov = { class: "payment-tags" }, Vv = { class: "tag-name" }, zv = {
  key: 0,
  class: "tag-amount"
}, Nv = {
  key: 1,
  class: "tag-amount"
}, Hv = { class: "tag-count" }, Wv = {
  key: 3,
  class: "empty-table-state"
}, jv = "Not Registered", Kv = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, { isDark: o } = Se($e(a, "theme")), i = oe(!1), l = oe({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((S, F) => je(S.date).valueOf() - je(F.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], m = C(
      () => d.value.map((S) => ({
        id: S.date,
        date: S.date,
        total_count: S.total_count,
        total_amount: S.total_amount,
        total_amount_by_currency: S.total_amount_by_currency,
        payment_methods: S.payment_methods
      }))
    ), v = (S) => {
      if (!S)
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
      const F = (S.payment_method_breakdown || []).map(
        (O) => ({
          payment_method: O.payment_method || "Unknown",
          total_amount: O.total_amount ?? 0,
          count: O.count ?? 0,
          total_amount_by_currency: O.total_amount_by_currency ?? []
        })
      ), N = (S.payment_method_by_day || []).map((O) => ({
        date: O.date || "",
        total_count: O.total_count ?? 0,
        total_amount: O.total_amount ?? 0,
        total_amount_by_currency: O.total_amount_by_currency ?? [],
        payment_methods: (O.payment_methods || []).map((A) => ({
          payment_method: A.payment_method || "Unknown",
          total_amount: A.total_amount ?? 0,
          count: A.count ?? 0,
          total_amount_by_currency: A.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: S.airline_name || a.airlineName,
        start_date: S.start_date || "",
        end_date: S.end_date || "",
        total_conversations: S.total_conversations ?? 0,
        total_amount: S.total_amount ?? 0,
        total_sell_usd: S.total_sell_usd,
        total_amount_by_currency: S.total_amount_by_currency ?? [],
        payment_method_breakdown: F,
        payment_method_by_day: N
      };
    }, g = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [S, F] = a.dates.map(
            (O) => je(O).format("YYYY-MM-DD")
          ), N = await a.fetchFunction(
            a.airlineName,
            S,
            F
          );
          l.value = v(N);
        } catch (S) {
          console.error("Error fetching payment method metrics:", S), l.value = v(null);
        } finally {
          i.value = !1;
        }
      }
    }, y = [
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#f59e0b",
      "#f43f5e",
      "#06b6d4"
    ], b = (S) => !S || S.toLowerCase() === "unknown" ? jv : S.replace(/_/g, " "), f = (S) => S == null ? "$0.00" : Pe(S), x = (S) => {
      const F = S.total_amount_by_currency;
      return F && F.length > 0 ? F.map((N) => `${N.currency} ${f(N.total_value)}`).join(" · ") : f(S.total_amount);
    }, _ = (S) => S ? je(S).format("MMM DD") : "-", w = (S) => S == null || Number.isNaN(Number(S)) ? 0 : Number(S), $ = (S) => {
      s("export", S);
    };
    function M() {
      const S = a.data;
      S && (Array.isArray(S.payment_method_breakdown) && S.payment_method_breakdown.length > 0 || Array.isArray(S.payment_method_by_day) && S.payment_method_by_day.length > 0) && (i.value = !1, l.value = v(S));
    }
    return tt(() => {
      a.data ? M() : g();
    }), Oe(
      () => a.data,
      (S) => {
        S && M();
      },
      { deep: !0 }
    ), Oe(
      () => a.dates,
      (S) => {
        a.data || S && S[0] && S[1] && g();
      },
      { deep: !0 }
    ), t({ isDark: o }), (S, F) => (p(), ee(ke, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value
    }, {
      headerExport: B(() => [
        e.enableExport && !i.value ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            i.value ? (p(), k("div", $v, [...F[0] || (F[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Sv, [
              r.value ? (p(), k("section", Mv, [
                F[1] || (F[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
                u("div", Dv, [
                  (p(!0), k(se, null, he(l.value.payment_method_breakdown, (N, O) => (p(), ee(ve, {
                    key: N.payment_method,
                    class: "payment-method-card-item min-w-0",
                    color: y[O % y.length],
                    title: b(N.payment_method),
                    value: x(N),
                    subvalue: `${w(N.count)} ${w(N.count) === 1 ? "sale" : "sales"}`
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : (p(), k("section", Tv, [
                u("div", Av, [
                  u("div", Bv, [
                    E(T(Pm), { class: "empty-icon" })
                  ]),
                  F[2] || (F[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
                  F[3] || (F[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
                ])
              ])),
              c.value ? (p(), k("section", Lv, [
                F[5] || (F[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
                u("div", Pv, [
                  E(rt, {
                    columns: h,
                    rows: m.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: N }) => [
                      u("span", Iv, D(_(String(N.date))), 1)
                    ]),
                    "cell-totalSales": B(({ row: N }) => [
                      u("span", Rv, D(T(ie)(N.total_count ?? 0)), 1)
                    ]),
                    "cell-totalAmount": B(({ row: N }) => [
                      u("span", Ev, [
                        Array.isArray(N.total_amount_by_currency) && N.total_amount_by_currency.length > 0 ? (p(), k("div", Fv, [
                          (p(!0), k(se, null, he(N.total_amount_by_currency, (O) => (p(), k("span", {
                            key: `${N.date}-${O.currency}`
                          }, D(O.currency) + " " + D(f(O.total_value)), 1))), 128))
                        ])) : (p(), k(se, { key: 1 }, [
                          Be(D(f(Number(N.total_amount ?? 0))), 1)
                        ], 64))
                      ])
                    ]),
                    "cell-paymentMethods": B(({ row: N }) => [
                      u("div", Ov, [
                        (p(!0), k(se, null, he(Array.isArray(N.payment_methods) ? N.payment_methods : [], (O) => (p(), k("div", {
                          key: O.payment_method,
                          class: "payment-tag"
                        }, [
                          u("span", Vv, D(b(O.payment_method)), 1),
                          F[4] || (F[4] = u("span", { class: "tag-separator" }, "•", -1)),
                          !O.total_amount_by_currency || O.total_amount_by_currency.length === 0 ? (p(), k("span", zv, D(f(O.total_amount)), 1)) : (p(), k("span", Nv, D(O.total_amount_by_currency.map(
                            (A) => `${A.currency} ${f(A.total_value)}`
                          ).join(" / ")), 1)),
                          u("span", Hv, "(" + D(w(O.count)) + ")", 1)
                        ]))), 128))
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : r.value ? (p(), k("div", Wv, [...F[6] || (F[6] = [
                u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
              ])])) : z("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Yv = /* @__PURE__ */ me(Kv, [["__scopeId", "data-v-0d6d2847"]]), Uv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, qv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Xv = {
  key: "title-content",
  class: "header-title-group"
}, Gv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Zv = {
  key: 0,
  class: "metric-label metric-label--header"
}, Qv = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, Jv = { key: "aside-content" }, ey = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, ty = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, ny = {
  key: "body-content",
  class: "highlight-inner"
}, ay = { class: "card-body" }, sy = { class: "metric-row" }, oy = {
  key: 0,
  class: "metric-prefix"
}, iy = {
  key: 0,
  class: "metric-label"
}, ly = /* @__PURE__ */ le({
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
    const n = e, { isDark: a } = Se($e(n, "theme")), s = C(() => n.labelPosition === "header"), o = C(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const c = n.previousValue;
      return c === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - c) / c * 100;
    }), l = C(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}%` : `${c}%`;
    }), r = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, d) => (p(), ee(ke, {
      collapsible: !1,
      class: J([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": T(a),
          "card-metric--label-header": s.value
        }
      ])
    }, {
      title: B(() => [
        E(Te, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", Uv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              s.value ? (p(), k("div", qv)) : z("", !0)
            ])) : (p(), k("div", Xv, [
              u("div", Gv, [
                Ce(c.$slots, "icon", {}, void 0, !0)
              ]),
              s.value ? (p(), k("span", Zv, D(e.label), 1)) : z("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: B(() => [
        E(Te, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", Qv)) : (p(), k("div", Jv, [
              Ce(c.$slots, "headerAside", {}, () => [
                o.value ? (p(), k("div", {
                  key: 0,
                  class: J(["change-badge", r.value])
                }, D(l.value), 3)) : z("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: B(() => [
        E(Te, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", ey, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              s.value ? z("", !0) : (p(), k("div", ty))
            ])) : (p(), k("div", ny, [
              u("div", ay, [
                Ce(c.$slots, "value", {}, () => [
                  u("div", sy, [
                    e.prefix ? (p(), k("span", oy, D(e.prefix), 1)) : z("", !0),
                    u("span", {
                      class: J(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, D(e.value), 3)
                  ])
                ], !0),
                s.value ? z("", !0) : (p(), k("span", iy, D(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), vt = /* @__PURE__ */ me(ly, [["__scopeId", "data-v-0bc3fac6"]]);
function cl(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Ue() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ct = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", mt = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", ry = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Rt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", Mt = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", cy = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], dy = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, uy = ["placeholder", "aria-label"], hy = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, fy = ["aria-selected", "onClick", "onMouseenter"], gy = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, my = { class: "min-w-0 flex-1" }, ws = /* @__PURE__ */ le({
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
    noResultsText: { default: "Sin resultados" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-select-${Ue()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, r = oe(null), c = oe(null), d = oe(null), h = oe(null), m = oe(null), v = oe(!1), g = oe(0), y = oe(""), b = oe({});
    function f() {
      const X = c.value;
      if (!X) return;
      const W = X.getBoundingClientRect();
      b.value = {
        top: `${W.bottom - 3}px`,
        left: `${W.left}px`,
        width: `${W.width}px`
      };
    }
    const x = C(() => n.options.filter((X) => !X.disabled)), _ = C(() => {
      if (!n.searchable) return x.value;
      const X = y.value.trim().toLowerCase();
      return X ? x.value.filter((W) => W.label.toLowerCase().includes(X)) : x.value;
    }), w = C(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), $ = C(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((W) => W.value === n.modelValue)?.label ?? String(n.modelValue));
    function M(X) {
      return `${String(X.value)}-${X.label}`;
    }
    function S(X) {
      return n.modelValue === X.value;
    }
    function F(X, W) {
      const Q = S(X), ae = g.value === W;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        Q ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !Q && ae ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function N() {
      g.value = Math.max(
        0,
        _.value.findIndex((X) => X.value === n.modelValue)
      );
    }
    function O() {
      if (n.searchable) {
        m.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function A() {
      f(), y.value = "", N(), We(() => O());
    }
    function L() {
      v.value = !1, y.value = "";
    }
    function V(X) {
      a("update:modelValue", X.value), L();
    }
    function I() {
      if (!n.disabled) {
        if (v.value) {
          L();
          return;
        }
        v.value = !0, A();
      }
    }
    function U(X) {
      X.stopPropagation(), !n.disabled && I();
    }
    function G(X) {
      if (!v.value) return;
      const W = X.target, Q = r.value, ae = d.value;
      Q && !Q.contains(W) && (!ae || !ae.contains(W)) && L();
    }
    function ne(X) {
      n.disabled || (X.key === "ArrowDown" || X.key === "Enter" || X.key === " ") && (X.preventDefault(), v.value || (v.value = !0, A()));
    }
    function ge(X) {
      const W = _.value;
      if (X.key === "Escape") {
        X.preventDefault(), L();
        return;
      }
      if (X.key === "ArrowDown") {
        if (X.preventDefault(), W.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (X.key === "ArrowUp") {
        if (X.preventDefault(), W.length === 0) return;
        g.value = W.length - 1, h.value?.focus();
        return;
      }
      if (X.key === "Enter") {
        X.preventDefault();
        const Q = W[g.value];
        Q && V(Q);
      }
    }
    function ye(X) {
      const W = _.value;
      if (X.key === "Escape") {
        X.preventDefault(), L();
        return;
      }
      if (W.length !== 0) {
        if (X.key === "ArrowDown") {
          X.preventDefault(), g.value = Math.min(g.value + 1, W.length - 1);
          return;
        }
        if (X.key === "ArrowUp") {
          if (X.preventDefault(), g.value === 0 && n.searchable) {
            m.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (X.key === "Enter") {
          X.preventDefault();
          const Q = W[g.value];
          Q && V(Q);
        }
      }
    }
    return Oe(y, () => {
      g.value = 0;
    }), tt(() => {
      document.addEventListener("click", G);
    }), pt(() => {
      document.removeEventListener("click", G);
    }), (X, W) => (p(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: J(T(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: J([
          T(mt),
          "flex items-center justify-between gap-2 text-left",
          v.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": v.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: U,
        onKeydown: ne
      }, [
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, D($.value), 3),
        E(T(Da), {
          class: J(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", v.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, cy),
      (p(), ee(En, { to: "body" }, [
        lt(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: Me(b.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (p(), k("div", dy, [
            lt(u("input", {
              ref_key: "searchInputRef",
              ref: m,
              "onUpdate:modelValue": W[0] || (W[0] = (Q) => y.value = Q),
              type: "search",
              class: J([T(mt), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: W[1] || (W[1] = qe(() => {
              }, ["stop"])),
              onKeydown: qe(ge, ["stop"])
            }, null, 42, uy), [
              [sn, y.value]
            ])
          ])) : z("", !0),
          u("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: qe(ye, ["stop"])
          }, [
            _.value.length === 0 ? (p(), k("li", hy, D(e.noResultsText), 1)) : z("", !0),
            (p(!0), k(se, null, he(_.value, (Q, ae) => (p(), k("li", {
              key: M(Q),
              role: "option",
              "aria-selected": S(Q),
              class: J(F(Q, ae)),
              onClick: qe((fe) => V(Q), ["stop"]),
              onMouseenter: (fe) => g.value = ae
            }, [
              e.showOptionCheck ? (p(), k("span", gy, [
                S(Q) ? (p(), ee(T(cl), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : z("", !0)
              ])) : z("", !0),
              u("span", my, D(Q.label), 1)
            ], 42, fy))), 128))
          ], 544)
        ], 4), [
          [bn, v.value]
        ])
      ]))
    ], 512));
  }
}), py = {
  class: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4",
  "aria-hidden": "true"
}, by = {
  class: "table-skeleton mt-6 w-full min-w-0",
  "aria-hidden": "true"
}, vy = { class: "table-skeleton__table" }, yy = {
  key: "content",
  class: "card-body"
}, xy = { class: "kpi-closed-value" }, _y = { class: "kpi-closed-value__main" }, ky = {
  key: 0,
  class: "kpi-closed-value__pct"
}, wy = { class: "table-view-select flex justify-end" }, Cy = { class: "table-section w-full min-w-0" }, $y = { class: "cell-plain" }, Sy = { class: "cell-plain" }, My = { class: "cell-plain cell-plain--muted" }, Dy = { class: "cell-plain" }, Ty = { class: "cell-plain" }, Ay = { class: "cell-plain" }, By = {
  key: 2,
  class: "empty-state"
}, Go = 6, Ly = /* @__PURE__ */ le({
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
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (R) => {
      s("export", R);
    }, { isDark: i } = Se($e(a, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(R) {
      const H = R?.trim() ?? "";
      return H.length > 0 && !l.has(H);
    }
    function c(R) {
      if (!r(R.agent_email)) return !1;
      const H = R.assigned_count ?? 0, K = R.closed_count ?? 0;
      return H > 0 || K > 0;
    }
    function d(R) {
      return (R.assigned_count ?? 0) + (R.closed_count ?? 0);
    }
    function h(R) {
      const H = R?.trim();
      return H || "—";
    }
    const m = C(
      () => (a.data?.agents_by_day ?? []).filter(c)
    ), v = C(() => m.value.length > 0), g = C(() => {
      const R = (a.data?.total_enqueued ?? 0) > 0;
      return v.value || R;
    }), y = oe("by_date"), b = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], f = oe("date"), x = oe("desc"), _ = Go;
    Oe(y, (R) => {
      R === "aggregated" ? (f.value = "name", x.value = "asc") : (f.value = "date", x.value = "desc");
    });
    function w(R, H) {
      return H == null ? null : H === 0 ? R > 0 ? 100 : 0 : (R - H) / H * 100;
    }
    function $(R) {
      const H = R.toFixed(1);
      return R > 0 ? `+${H}%` : `${H}%`;
    }
    function M(R, H = !1) {
      const K = H ? -R : R;
      return K > 0 ? "change-badge--up" : K < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function S(R, H) {
      if (R === null) return null;
      const K = w(R, H);
      return K === null ? null : {
        label: $(K),
        class: M(K, !0)
      };
    }
    function F(R) {
      if (!R) return null;
      const H = R.split(":").map(Number);
      return H.length !== 3 || H.some(isNaN) ? null : H[0] * 3600 + H[1] * 60 + H[2];
    }
    function N(R) {
      const H = Math.round(R), K = Math.floor(H / 3600), de = Math.floor(H % 3600 / 60), q = H % 60;
      return `${String(K).padStart(2, "0")}:${String(de).padStart(2, "0")}:${String(q).padStart(2, "0")}`;
    }
    const O = C(() => a.data?.total_enqueued ?? 0), A = C(() => a.data?.total_closed ?? 0), L = C(
      () => a.data?.avg_time_to_assign_seconds ?? null
    ), V = C(
      () => a.data?.avg_conversation_duration_seconds ?? null
    ), I = C(() => O.value <= 0 ? null : `(${(A.value / O.value * 100).toFixed(1)}%)`), U = C(
      () => S(
        F(L.value),
        a.previousAvgTimeToAssignSeconds
      )
    ), G = C(
      () => S(
        F(V.value),
        a.previousAvgConversationDurationSeconds
      )
    );
    function ne(R, H) {
      return {
        id: `${R.date}-${R.agent_email}-${H}`,
        date: R.date,
        dateSort: new Date(R.date).getTime(),
        agent_name: R.agent_name ?? "",
        agent_email: R.agent_email,
        handled: d(R),
        avg_assignation_seconds: F(R.avg_time_to_assign_seconds),
        avg_resolution_seconds: F(R.avg_conversation_duration_seconds),
        avg_assignation_display: R.avg_time_to_assign_seconds ?? "—",
        avg_resolution_display: R.avg_conversation_duration_seconds ?? "—"
      };
    }
    function ge(R) {
      const H = /* @__PURE__ */ new Map();
      for (const K of R) {
        if (!c(K)) continue;
        const de = K.agent_email.trim();
        H.has(de) || H.set(de, {
          agent_name: K.agent_name?.trim() ?? "",
          agent_email: de,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const q = H.get(de), j = K.assigned_count ?? 0, Z = K.closed_count ?? 0;
        q.handled += d(K), K.agent_name?.trim() && (q.agent_name = K.agent_name.trim());
        const re = F(K.avg_time_to_assign_seconds);
        re !== null && j > 0 && (q.assignSum += re * j, q.assignWeight += j);
        const ue = F(K.avg_conversation_duration_seconds);
        ue !== null && Z > 0 && (q.resolutionSum += ue * Z, q.resolutionWeight += Z);
      }
      return Array.from(H.values()).map((K, de) => {
        const q = K.assignWeight > 0 ? K.assignSum / K.assignWeight : null, j = K.resolutionWeight > 0 ? K.resolutionSum / K.resolutionWeight : null;
        return {
          id: `agg-${K.agent_email}-${de}`,
          agent_name: K.agent_name,
          agent_email: K.agent_email,
          handled: K.handled,
          avg_assignation_seconds: q,
          avg_resolution_seconds: j,
          avg_assignation_display: q !== null ? N(q) : "—",
          avg_resolution_display: j !== null ? N(j) : "—"
        };
      });
    }
    const ye = C(() => {
      const R = m.value;
      return y.value === "aggregated" ? ge(R) : R.map(ne);
    });
    function X(R, H, K, de) {
      const q = de === "asc" ? 1 : -1;
      let j = 0;
      switch (K) {
        case "date":
          j = (R.dateSort ?? 0) - (H.dateSort ?? 0);
          break;
        case "name":
          j = (R.agent_name || "").localeCompare(H.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          j = R.agent_email.localeCompare(H.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          j = R.handled - H.handled;
          break;
        case "avgAssignation":
          j = (R.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (H.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          j = (R.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (H.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (j !== 0) return j * q;
      if (y.value === "by_date" && K !== "date") {
        const Z = (H.dateSort ?? 0) - (R.dateSort ?? 0);
        if (Z !== 0) return Z;
      }
      return (R.agent_name || "").localeCompare(H.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const W = C(() => {
      const R = [...ye.value];
      return R.sort((H, K) => X(H, K, f.value, x.value)), R;
    }), Q = C(
      () => W.value
    ), ae = C(() => {
      const R = [];
      return y.value === "by_date" && R.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), R.push(
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
      ), R;
    });
    function fe(R) {
      const H = R;
      if (f.value === H) {
        x.value = x.value === "asc" ? "desc" : "asc";
        return;
      }
      f.value = H, H === "date" ? x.value = "desc" : H === "name" || H === "email" ? x.value = "asc" : x.value = "desc";
    }
    const we = (R) => R == null ? "0" : ie(R), De = (R) => new Date(R).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (R, H) => (p(), ee(ke, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", {
              key: "loading",
              class: J(["card-body loading-body", { "agent-human-conv--dark": T(i) }]),
              "aria-busy": "true",
              "aria-label": "Loading agent human conversations"
            }, [
              u("div", py, [
                (p(), k(se, null, he(4, (K) => E(vt, {
                  key: `kpi-skeleton-${K}`,
                  label: "Loading",
                  value: "",
                  "label-position": "header",
                  loading: !0,
                  theme: e.theme
                }, null, 8, ["theme"])), 64))
              ]),
              u("section", by, [
                H[2] || (H[2] = u("div", { class: "table-skeleton__header" }, [
                  u("div", { class: "table-skeleton__titles" }, [
                    u("div", { class: "bm-skeleton-blink skeleton-section-title" }),
                    u("div", { class: "bm-skeleton-blink skeleton-section-subtitle" })
                  ]),
                  u("div", { class: "bm-skeleton-blink skeleton-table-select" })
                ], -1)),
                u("div", vy, [
                  H[1] || (H[1] = u("div", { class: "bm-skeleton-blink skeleton-table-head" }, null, -1)),
                  (p(!0), k(se, null, he(T(_), (K) => (p(), k("div", {
                    key: `table-row-skeleton-${K}`,
                    class: "bm-skeleton-blink skeleton-table-row"
                  }))), 128))
                ])
              ])
            ], 2)) : (p(), k("div", yy, [
              g.value ? (p(), k("div", {
                key: 0,
                class: J(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": T(i) }])
              }, [
                E(vt, {
                  label: "Conversations Opened",
                  "label-position": "header",
                  value: we(O.value),
                  theme: e.theme,
                  "current-value": O.value,
                  "previous-value": e.previousTotalEnqueued
                }, {
                  icon: B(() => [...H[3] || (H[3] = [
                    u("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      })
                    ], -1)
                  ])]),
                  _: 1
                }, 8, ["value", "theme", "current-value", "previous-value"]),
                E(vt, {
                  label: "Conversations Closed",
                  "label-position": "header",
                  value: we(A.value),
                  theme: e.theme,
                  "current-value": A.value,
                  "previous-value": e.previousTotalClosed
                }, {
                  icon: B(() => [...H[4] || (H[4] = [
                    u("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      })
                    ], -1)
                  ])]),
                  value: B(() => [
                    u("div", xy, [
                      u("span", _y, D(we(A.value)), 1),
                      I.value ? (p(), k("span", ky, D(I.value), 1)) : z("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["value", "theme", "current-value", "previous-value"]),
                E(vt, {
                  label: "Avg Time to Assign",
                  "label-position": "header",
                  value: L.value ?? "—",
                  theme: e.theme,
                  "current-value": F(L.value) ?? 0,
                  "previous-value": e.previousAvgTimeToAssignSeconds
                }, $s({
                  icon: B(() => [
                    H[5] || (H[5] = u("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      u("path", {
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
                    fn: B(() => [
                      u("div", {
                        class: J(["duration-trend-badge", U.value.class])
                      }, D(U.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"]),
                E(vt, {
                  label: "Avg Resolution Time",
                  "label-position": "header",
                  value: V.value ?? "—",
                  theme: e.theme,
                  "current-value": F(V.value) ?? 0,
                  "previous-value": e.previousAvgConversationDurationSeconds
                }, $s({
                  icon: B(() => [
                    H[6] || (H[6] = u("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      })
                    ], -1))
                  ]),
                  _: 2
                }, [
                  G.value ? {
                    name: "headerAside",
                    fn: B(() => [
                      u("div", {
                        class: J(["duration-trend-badge", G.value.class])
                      }, D(G.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"])
              ], 2)) : z("", !0),
              v.value ? (p(), ee(ke, {
                key: 1,
                class: "agent-table-section mt-6",
                title: "Conversations Managed by Agent",
                subtitle: "Daily performance per human agent",
                collapsible: !1
              }, {
                headerAside: B(() => [
                  u("div", wy, [
                    E(ws, {
                      modelValue: y.value,
                      "onUpdate:modelValue": H[0] || (H[0] = (K) => y.value = K),
                      options: b,
                      "aria-label-trigger": "Table view mode",
                      "show-option-check": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                default: B(() => [
                  u("div", Cy, [
                    (p(), ee(rt, {
                      key: `${y.value}-${f.value}-${x.value}`,
                      columns: ae.value,
                      rows: Q.value,
                      "sort-key": f.value,
                      "sort-direction": x.value,
                      "max-visible-rows": Go,
                      "row-key": "id",
                      onSort: fe
                    }, {
                      "cell-date": B(({ row: K }) => [
                        u("span", $y, D(De(String(K.date))), 1)
                      ]),
                      "cell-name": B(({ row: K }) => [
                        u("span", Sy, D(h(K.agent_name)), 1)
                      ]),
                      "cell-email": B(({ row: K }) => [
                        u("span", My, D(K.agent_email), 1)
                      ]),
                      "cell-handled": B(({ row: K }) => [
                        u("span", Dy, D(we(Number(K.handled))), 1)
                      ]),
                      "cell-avgAssignation": B(({ row: K }) => [
                        u("span", Ty, D(K.avg_assignation_display), 1)
                      ]),
                      "cell-avgResolution": B(({ row: K }) => [
                        u("span", Ay, D(K.avg_resolution_display), 1)
                      ]),
                      _: 1
                    }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
                  ])
                ]),
                _: 1
              })) : g.value ? z("", !0) : (p(), k("div", By, [...H[7] || (H[7] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No agent human conversation data available"),
                  u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters. ")
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
}), Py = /* @__PURE__ */ me(Ly, [["__scopeId", "data-v-4fe2df89"]]), Iy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ry = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Ey = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Fy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Oy = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Vy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, zy = { class: "max-w-[360px] px-4 text-center" }, Ny = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Zo = 5, Hy = /* @__PURE__ */ le({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (y) => {
      s("export", y);
    }, i = $e(a, "theme"), { isDark: l } = Se(i), r = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, c = oe({
      labels: [],
      datasets: []
    }), d = C(
      () => a.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = C(() => {
      const y = d.value.total_by_channel || {}, b = Object.values(y).reduce(
        (f, x) => f + x,
        0
      );
      return b === 0 ? [] : Object.entries(y).sort(([, f], [, x]) => x - f).map(([f, x]) => ({
        name: f,
        label: f.toUpperCase(),
        total: x,
        percentage: (x / b * 100).toFixed(1),
        color: r[f.toLowerCase()] || "#9ca3af"
      }));
    }), m = C(
      () => h.value.slice(0, Zo)
    ), v = C(() => {
      const y = Math.min(m.value.length, Zo);
      if (!(y <= 0))
        return { gridTemplateColumns: `repeat(${y}, minmax(0, 1fr))` };
    }), g = (y) => {
      if (!y || !y.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const b = y.channels_by_day, f = Object.keys(b).sort();
      if (f.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const $ of Object.values(b))
        for (const M of Object.keys($))
          x.add(M);
      const w = Array.from(x).map(($) => {
        const M = $.toLowerCase(), S = r[M] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: f.map((F) => b[F]?.[$] || 0),
          borderColor: S
        };
      });
      c.value = {
        labels: f.map(($) => je($).format("MMM DD")),
        datasets: w
      };
    };
    return Oe(
      () => a.data,
      (y) => {
        g(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (y, b) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: o
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: J(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          E(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (p(), k("div", Iy, [...b[0] || (b[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", Ry, [
                c.value.labels && c.value.labels.length ? (p(), k("section", Ey, [
                  u("div", Fy, [
                    E(yt, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  m.value.length ? (p(), k("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Me(v.value)
                  }, [
                    (p(!0), k(se, null, he(m.value, (f) => (p(), ee(ve, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${T(ie)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : z("", !0)
                ])) : h.value.length ? (p(), k("section", Oy, [
                  u("div", {
                    class: "grid w-full gap-3 md:gap-4",
                    style: Me(v.value)
                  }, [
                    (p(!0), k(se, null, he(m.value, (f) => (p(), ee(ve, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${T(ie)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)
                ])) : z("", !0),
                h.value.length ? z("", !0) : (p(), k("section", Vy, [
                  u("div", zy, [
                    u("div", Ny, [
                      E(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                    ]),
                    b[1] || (b[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                    b[2] || (b[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
                  ])
                ]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Wy = /* @__PURE__ */ me(Hy, [["__scopeId", "data-v-de07e6c8"]]), jy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ky = {
  key: "content",
  class: "card-body"
}, Yy = { class: "chart-container" }, Uy = { class: "triage-table-block w-full min-w-0" }, qy = { class: "triage-row-label" }, Xy = {
  key: 1,
  class: "triage-count"
}, Gy = {
  key: 1,
  class: "triage-count"
}, Zy = {
  key: 1,
  class: "triage-count"
}, Qy = {
  key: 1,
  class: "triage-count"
}, Jy = {
  key: 1,
  class: "triage-count"
}, e1 = {
  key: 1,
  class: "empty-state"
}, t1 = { class: "empty-state-content" }, n1 = { class: "empty-icon-wrapper" }, a1 = /* @__PURE__ */ le({
  __name: "TriageCombinations",
  props: {
    data: { default: () => ({ combinations: {} }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (_) => {
      s("export", _);
    }, { isDark: i, colors: l } = Se(
      $e(a, "theme")
    ), r = C(() => {
      const _ = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, M] of Object.entries(_)) {
        const S = $.split("+").filter(Boolean);
        if (!S.includes("triage")) continue;
        const F = S.filter((N) => N !== "triage").length;
        F >= 4 ? w["4p"] += Number(M) || 0 : w[F] += Number(M) || 0;
      }
      return w;
    }), c = C(() => {
      const _ = r.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), d = C(() => Object.keys(a.data?.combinations || {}).length > 0), h = C(() => {
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
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], v = C(() => {
      const _ = h.value, w = r.value;
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
    }), g = {
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
    }, y = (_) => _?.replace("80", "") || "#888888", b = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: g.c0,
          borderColor: y(g.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: g.c1,
          borderColor: y(g.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: g.c2,
          borderColor: y(g.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: g.c3,
          borderColor: y(g.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: g.c4p,
          borderColor: y(g.c4p),
          borderWidth: 1
        }
      ]
    })), f = C(() => ({
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
    })), x = (_) => `${(Number(_) || 0).toFixed(0)}`;
    return t({ isDark: i }), (_, w) => (p(), ee(ke, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", jy, [...w[0] || (w[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Ky, [
              d.value ? (p(), k(se, { key: 0 }, [
                u("div", Yy, [
                  E(St, {
                    data: b.value,
                    options: f.value
                  }, null, 8, ["data", "options"])
                ]),
                E(ve, {
                  class: "w-full min-w-0",
                  title: "Total",
                  value: T(ie)(c.value),
                  subvalue: "Conversations with triage"
                }, null, 8, ["value"]),
                u("div", Uy, [
                  E(rt, {
                    columns: m,
                    rows: v.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-metric": B(({ row: $ }) => [
                      u("span", qy, D($.metric), 1)
                    ]),
                    "cell-b0": B(({ row: $ }) => [
                      $.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Me({ color: y(g.c0) })
                      }, D(x(Number($.b0))) + "%", 5)) : (p(), k("span", Xy, D(T(ie)(Number($.b0))), 1))
                    ]),
                    "cell-b1": B(({ row: $ }) => [
                      $.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Me({ color: y(g.c1) })
                      }, D(x(Number($.b1))) + "%", 5)) : (p(), k("span", Gy, D(T(ie)(Number($.b1))), 1))
                    ]),
                    "cell-b2": B(({ row: $ }) => [
                      $.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Me({ color: y(g.c2) })
                      }, D(x(Number($.b2))) + "%", 5)) : (p(), k("span", Zy, D(T(ie)(Number($.b2))), 1))
                    ]),
                    "cell-b3": B(({ row: $ }) => [
                      $.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Me({ color: y(g.c3) })
                      }, D(x(Number($.b3))) + "%", 5)) : (p(), k("span", Qy, D(T(ie)(Number($.b3))), 1))
                    ]),
                    "cell-b4p": B(({ row: $ }) => [
                      $.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Me({ color: y(g.c4p) })
                      }, D(x(Number($.b4p))) + "%", 5)) : (p(), k("span", Jy, D(T(ie)(Number($.b4p))), 1))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ], 64)) : (p(), k("div", e1, [
                u("div", t1, [
                  u("div", n1, [
                    E(T(nt), { class: "empty-icon" })
                  ]),
                  w[1] || (w[1] = u("p", { class: "empty-title" }, "No triage combinations data", -1)),
                  w[2] || (w[2] = u("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
                ])
              ]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), s1 = /* @__PURE__ */ me(a1, [["__scopeId", "data-v-4610c1a9"]]), o1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, i1 = {
  key: "content",
  class: "card-body"
}, l1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, r1 = { class: "pie-section" }, c1 = {
  key: 1,
  class: "empty-state"
}, d1 = /* @__PURE__ */ le({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Se($e(n, "theme")), o = [
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
    }, l = (v) => i[v]?.label || v.toUpperCase(), r = C(
      () => n.data?.items && n.data.items.length > 0
    ), c = C(
      () => (n.data?.items || []).reduce((v, g) => v + g.count, 0)
    ), d = C(() => {
      const v = {};
      for (const g of n.data?.items || [])
        v[g.language] = (v[g.language] || 0) + g.count;
      return Object.entries(v).map(([g, y]) => ({ language: g, count: y })).sort((g, y) => y.count - g.count);
    }), h = C(() => ({
      labels: d.value.map((v) => l(v.language)),
      datasets: [
        {
          data: d.value.map((v) => v.count),
          backgroundColor: d.value.map(
            (v, g) => o[g % o.length] + "80"
          ),
          borderColor: d.value.map(
            (v, g) => o[g % o.length]
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
            color: s.value.textSecondary
          }
        },
        tooltip: {
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
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
            label: (v) => {
              const g = v.raw || 0, y = c.value > 0 ? (g / c.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${g} (${y}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (v, g) => (p(), ee(ke, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            n.loading ? (p(), k("div", o1, [...g[0] || (g[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", i1, [
              r.value ? (p(), k("div", l1, [
                u("section", r1, [
                  E(Ma, {
                    data: h.value,
                    options: m.value
                  }, null, 8, ["data", "options"])
                ]),
                E(ve, {
                  class: "shrink-0",
                  title: "Total",
                  value: T(ie)(c.value),
                  color: "#8b5cf6"
                }, null, 8, ["value"])
              ])) : (p(), k("section", c1, [...g[1] || (g[1] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No language data available"),
                  u("p", { class: "empty-description" }, " No language selection data found for the selected period. Try adjusting the date range. ")
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
}), u1 = /* @__PURE__ */ me(d1, [["__scopeId", "data-v-8743ba33"]]), h1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, f1 = {
  key: "content",
  class: "card-body"
}, g1 = {
  key: 0,
  class: "guardrails-daily-section"
}, m1 = { class: "w-full min-w-0" }, p1 = { class: "font-medium" }, b1 = { class: "font-semibold" }, v1 = { class: "type-badges-row" }, y1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, x1 = {
  key: 1,
  class: "empty-state"
}, _1 = /* @__PURE__ */ le({
  __name: "Guardrails",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = Se($e(a, "theme")), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), r = C(
      () => (a.data?.items || []).reduce((b, f) => b + f.count, 0)
    ), c = (b) => {
      const f = {};
      for (const w of a.data?.items || [])
        f[w[b]] = (f[w[b]] || 0) + w.count;
      const x = Object.entries(f).sort((w, $) => $[1] - w[1]);
      if (x.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: x[0][0],
        pct: _ > 0 ? Math.round(x[0][1] / _ * 100) : 0
      };
    }, d = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), m = C(() => c("guardrail_source")), v = C(() => {
      const b = {};
      for (const f of a.data?.items || [])
        b[f.date] || (b[f.date] = {}), b[f.date][f.guardrail_type] = (b[f.date][f.guardrail_type] || 0) + f.count;
      return Object.entries(b).map(([f, x]) => ({
        date: f,
        total: Object.values(x).reduce((_, w) => _ + w, 0),
        types: Object.entries(x).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((f, x) => new Date(f.date).getTime() - new Date(x.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], y = C(
      () => v.value.map((b) => ({
        id: b.date,
        date: b.date,
        total: b.total,
        types: b.types
      }))
    );
    return t({ isDark: i }), (b, f) => (p(), ee(ke, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", h1, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", f1, [
              l.value ? (p(), k(se, { key: 0 }, [
                v.value.length > 0 ? (p(), k("section", g1, [
                  u("div", m1, [
                    E(rt, {
                      columns: g,
                      rows: y.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-date": B(({ row: x }) => [
                        u("span", p1, D(T(je)(String(x.date)).format("MMM DD")), 1)
                      ]),
                      "cell-count": B(({ row: x }) => [
                        u("span", b1, D(T(ie)(x.total)), 1)
                      ]),
                      "cell-types": B(({ row: x }) => [
                        u("div", v1, [
                          (p(!0), k(se, null, he(x.types, (_) => (p(), k("span", {
                            key: _.type,
                            class: "type-count-badge"
                          }, D(_.type) + " (" + D(_.count) + ") ", 1))), 128))
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : z("", !0),
                u("section", y1, [
                  E(ve, {
                    title: "Total Events",
                    value: T(ie)(r.value)
                  }, null, 8, ["value"]),
                  E(ve, {
                    title: "Top type",
                    value: d.value.name,
                    subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  E(ve, {
                    title: "Top action",
                    value: h.value.name,
                    subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  E(ve, {
                    title: "Top source",
                    value: m.value.name,
                    subvalue: m.value.pct > 0 ? `(${m.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"])
                ])
              ], 64)) : (p(), k("section", x1, [...f[1] || (f[1] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No guardrail events"),
                  u("p", { class: "empty-description" }, "No content safety events found for the selected period. This is a good sign!")
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
}), k1 = /* @__PURE__ */ me(_1, [["__scopeId", "data-v-80a28b15"]]), w1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, C1 = {
  key: "content",
  class: "card-body"
}, $1 = { class: "chart-section" }, S1 = { class: "chart-wrapper" }, M1 = {
  key: 1,
  class: "empty-chart"
}, D1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, T1 = {
  key: 0,
  class: "dn-failure-section"
}, A1 = { class: "w-full min-w-0" }, B1 = { class: "failure-reason" }, L1 = { class: "failure-count" }, P1 = { class: "impact-bar-container" }, I1 = { class: "impact-label" }, R1 = { class: "dn-trend-health-block flex flex-col gap-0" }, E1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, F1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, O1 = { class: "system-health" }, V1 = { class: "system-health-content" }, z1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, N1 = {
  key: 1,
  class: "empty-state"
}, H1 = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = ($) => {
      s("export", $);
    }, { isDark: i, colors: l } = Se($e(a, "theme")), r = C(() => {
      const $ = a.data?.documentCounts?.items || [], M = a.data?.processingCounts?.items || [];
      return $.length > 0 || M.length > 0;
    }), c = C(() => {
      const $ = a.data?.documentCounts?.items || [];
      return {
        processing_started: $.reduce((M, S) => M + S.processing_started, 0),
        processing_completed: $.reduce((M, S) => M + S.processing_completed, 0),
        processing_failed: $.reduce((M, S) => M + S.processing_failed, 0),
        row_count_total: $.reduce((M, S) => M + S.row_count_total, 0)
      };
    }), d = C(() => {
      const $ = a.data?.processingCounts?.items || [];
      return {
        processing_started: $.reduce((M, S) => M + S.processing_started, 0),
        processing_success: $.reduce((M, S) => M + S.processing_success, 0),
        notification_sent: $.reduce((M, S) => M + S.notification_sent, 0),
        notification_failed: $.reduce((M, S) => M + S.notification_failed, 0),
        dq_phone: $.reduce((M, S) => M + S.dq_error_phone_not_found, 0),
        dq_flight: $.reduce((M, S) => M + S.dq_error_flight_not_found, 0),
        dq_booking: $.reduce((M, S) => M + S.dq_error_booking_not_found, 0),
        dq_other: $.reduce((M, S) => M + S.dq_error_other, 0),
        totalDqErrors: $.reduce(
          (M, S) => M + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other,
          0
        )
      };
    }), h = C(
      () => c.value.row_count_total || d.value.processing_started
    ), m = C(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), v = ($, M) => M ? `${Math.round($ / M * 100)}%` : "0%", g = C(() => {
      const $ = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, S) => S.count - M.count);
      return $.length > 0 ? $[0] : { reason: "None", count: 0 };
    }), y = C(() => {
      const $ = h.value;
      return [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Flight not found", count: d.value.dq_flight },
        { reason: "Phone not found", count: d.value.dq_phone },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].map((M) => ({
        ...M,
        impactPct: $ > 0 ? Math.round(M.count / $ * 100) : 0
      }));
    }), b = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], f = C(
      () => y.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), x = C(() => {
      const $ = h.value, M = d.value.processing_success, S = Math.max(0, M - d.value.totalDqErrors), F = d.value.notification_sent, N = Math.max(0, $ - M), O = d.value.totalDqErrors, A = Math.max(0, S - F), L = (U, G) => be(U, G), V = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], I = [];
      return M > 0 && I.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: M,
        label: L(M, $)
      }), N > 0 && I.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: N,
        label: L(N, $)
      }), S > 0 && I.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: S,
        label: L(S, $)
      }), O > 0 && I.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: O,
        label: L(O, $)
      }), F > 0 && I.push({
        source: "Contactable",
        target: "Notified",
        value: F,
        label: L(F, $)
      }), A > 0 && I.push({
        source: "Contactable",
        target: "Not Delivered",
        value: A,
        label: L(A, $)
      }), { nodes: V, links: I };
    }), _ = C(() => {
      const $ = [...a.data?.processingCounts?.items || []].sort(
        (L, V) => new Date(L.date).getTime() - new Date(V.date).getTime()
      ), M = a.data?.documentCounts?.items || [], S = {};
      for (const L of M)
        S[L.date] = (S[L.date] || 0) + L.row_count_total;
      const F = [
        .../* @__PURE__ */ new Set([
          ...$.map((L) => L.date),
          ...M.map((L) => L.date)
        ])
      ].sort(), N = F.map((L) => je(L).format("MMM DD")), O = F.map((L) => {
        const V = $.find((G) => G.date === L), I = V?.notification_sent || 0, U = S[L] || V?.processing_started || 0;
        return U > 0 ? Math.round(I / U * 100) : 0;
      }), A = F.map((L) => $.find((I) => I.date === L)?.notification_sent || 0);
      return {
        labels: N,
        datasets: [
          {
            label: "Success Rate (%)",
            data: O,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: A,
            borderColor: "#10b981",
            yAxisID: "y1"
          }
        ]
      };
    }), w = C(() => ({
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
            callback: ($) => `${$}%`
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
    return t({ isDark: i }), ($, M) => (p(), ee(ke, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (p(), k("div", w1, [...M[0] || (M[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", C1, [
              r.value ? (p(), k(se, { key: 0 }, [
                u("section", $1, [
                  M[2] || (M[2] = u("div", { class: "chart-header" }, [
                    u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
                  ], -1)),
                  u("div", S1, [
                    x.value.nodes.length > 0 && x.value.links.length > 0 ? (p(), ee(qt, {
                      key: 0,
                      data: x.value,
                      height: "350px",
                      "use-gradient": !1,
                      "node-gap": 24
                    }, null, 8, ["data"])) : (p(), k("div", M1, [...M[1] || (M[1] = [
                      u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                    ])]))
                  ])
                ]),
                u("div", D1, [
                  E(ve, {
                    color: "#3b82f6",
                    title: "Total Records",
                    value: T(ie)(c.value.row_count_total)
                  }, null, 8, ["value"]),
                  E(ve, {
                    color: "#8b5cf6",
                    title: "Passengers Affected",
                    value: T(ie)(h.value)
                  }, null, 8, ["value"]),
                  E(ve, {
                    color: "#10b981",
                    title: "Successfully Notified",
                    value: T(ie)(d.value.notification_sent),
                    subvalue: v(d.value.notification_sent, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  E(ve, {
                    color: "#ef4444",
                    title: "Not Notified",
                    value: T(ie)(m.value),
                    subvalue: v(m.value, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  E(ve, {
                    color: "#f59e0b",
                    title: "Main Failure Reason",
                    value: g.value.reason,
                    subvalue: g.value.count > 0 ? `${T(ie)(g.value.count)} cases` : void 0
                  }, null, 8, ["value", "subvalue"])
                ]),
                y.value.length > 0 ? (p(), k("section", T1, [
                  M[3] || (M[3] = u("div", { class: "section-header" }, [
                    u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
                  ], -1)),
                  u("div", A1, [
                    E(rt, {
                      columns: b,
                      rows: f.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-reason": B(({ row: S }) => [
                        u("span", B1, D(S.reason), 1)
                      ]),
                      "cell-count": B(({ row: S }) => [
                        u("span", L1, D(T(ie)(S.count)), 1)
                      ]),
                      "cell-impact": B(({ row: S }) => [
                        u("div", P1, [
                          u("div", {
                            class: "impact-bar",
                            style: Me({ width: S.impactPct + "%" })
                          }, null, 4),
                          u("span", I1, D(S.impactPct) + "%", 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : z("", !0),
                u("div", R1, [
                  _.value.labels.length > 0 ? (p(), k("section", E1, [
                    M[4] || (M[4] = u("div", { class: "chart-header" }, [
                      u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                    ], -1)),
                    u("div", F1, [
                      E(yt, {
                        data: _.value,
                        options: w.value,
                        theme: a.theme
                      }, null, 8, ["data", "options", "theme"])
                    ])
                  ])) : z("", !0),
                  u("details", O1, [
                    M[5] || (M[5] = u("summary", { class: "system-health-toggle" }, [
                      u("svg", {
                        class: "toggle-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        u("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        }),
                        u("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        })
                      ]),
                      Be(" System Health Details ")
                    ], -1)),
                    u("div", V1, [
                      u("div", z1, [
                        E(ve, {
                          title: "Docs Started",
                          value: T(ie)(c.value.processing_started)
                        }, null, 8, ["value"]),
                        E(ve, {
                          title: "Docs Completed",
                          value: T(ie)(c.value.processing_completed)
                        }, null, 8, ["value"]),
                        E(ve, {
                          title: "Docs Failed",
                          value: T(ie)(c.value.processing_failed)
                        }, null, 8, ["value"]),
                        E(ve, {
                          title: "Processing Started",
                          value: T(ie)(d.value.processing_started)
                        }, null, 8, ["value"]),
                        E(ve, {
                          title: "Processing Success",
                          value: T(ie)(d.value.processing_success)
                        }, null, 8, ["value"]),
                        E(ve, {
                          title: "Notification Failed",
                          value: T(ie)(d.value.notification_failed)
                        }, null, 8, ["value"])
                      ])
                    ])
                  ])
                ])
              ], 64)) : (p(), k("section", N1, [...M[6] || (M[6] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No disruption notifier data"),
                  u("p", { class: "empty-description" }, " No disruption notification data found for the selected period. Try adjusting the date range. ")
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
}), W1 = /* @__PURE__ */ me(H1, [["__scopeId", "data-v-c77ab172"]]), j1 = /* @__PURE__ */ le({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), s = C(() => ie(n.totalConversations)), o = C(() => T(a.value?.isDark) ?? !1), i = C(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(vt, {
      label: "Total Conversations",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), K1 = /* @__PURE__ */ le({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), s = C(() => `${n.csatP95.toFixed(1)}`), o = C(() => T(a.value?.isDark) ?? !1), i = C(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(vt, {
      label: "CSAT P95",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Y1 = /* @__PURE__ */ le({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), s = C(() => `${n.csatPulse.toFixed(1)}%`), o = C(() => T(a.value?.isDark) ?? !1), i = C(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(vt, {
      label: "CSAT Pulse",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M3 12h3l2-6 4 12 3-8 2 2h4"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), U1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, q1 = { key: "content" }, X1 = {
  key: 0,
  class: "card-body"
}, G1 = { class: "chart-wrapper" }, Z1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, Q1 = {
  key: 1,
  class: "empty-state"
}, J1 = 520, ex = 300, tx = 40, nx = 48, ax = 48, sx = {
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
  setup(e, { expose: t, emit: n }) {
    const a = n, s = (r) => {
      a("export", r);
    }, o = e, { isDark: i } = Se($e(o, "theme")), l = C(() => o.data);
    return t({ isDark: i }), (r, c) => (p(), ee(ke, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            o.loading ? (p(), k("div", U1, [...c[0] || (c[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", q1, [
              l.value && l.value.total_nps_responses > 0 ? (p(), k("div", X1, [
                u("div", G1, [
                  E(el, {
                    histogram: l.value.histogram || [],
                    "min-score": l.value.min_score || 0,
                    "max-score": l.value.max_score || 0,
                    "q1-score": l.value.q1_score || 0,
                    "median-score": l.value.median_score || 0,
                    "q3-score": l.value.q3_score || 0,
                    "average-score": l.value.average_score || 0,
                    "chart-width": J1,
                    "chart-height": ex,
                    "chart-margin": tx,
                    "chart-margin-right": nx,
                    "chart-bottom-margin": ax,
                    "plot-inset": 10,
                    "show-legend": !1,
                    "show-stat-labels": !1
                  }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
                ]),
                u("div", Z1, [
                  E(ve, {
                    class: "min-w-0 flex-1",
                    title: "Responses",
                    value: String(l.value.total_nps_responses)
                  }, null, 8, ["value"]),
                  l.value.p95_score > 0 ? (p(), ee(ve, {
                    key: 0,
                    class: "min-w-0 flex-1",
                    title: "Percentile 95",
                    value: String(l.value.p95_score)
                  }, null, 8, ["value"])) : z("", !0)
                ])
              ])) : (p(), k("div", Q1, [...c[1] || (c[1] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No NPS data available"),
                  u("p", { class: "empty-description" }, " No NPS data found for the selected period. Try adjusting the date range. ")
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
}, dl = /* @__PURE__ */ me(sx, [["__scopeId", "data-v-3a3f4c10"]]), ox = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ix = { key: "content" }, lx = {
  key: 0,
  class: "card-body"
}, rx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, cx = {
  key: 1,
  class: "empty-state"
}, dx = {
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
    const n = t, a = (c) => {
      n("export", c);
    }, s = e, o = C(() => s.data?.csat_p95_by_day || []), i = C(() => o.value.length > 0), l = C(() => ({
      labels: o.value.map((c) => je(c.date).format("DD-MM-YYYY")),
      datasets: [
        {
          label: "CSAT P95",
          data: o.value.map((c) => Number(c.p95_score || 0)),
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
              const d = Number(c);
              return !Number.isInteger(d) || d < 0 || d > 10 ? "" : String(d);
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
    return (c, d) => (p(), ee(ke, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (p(), k("div", ox, [...d[0] || (d[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", ix, [
              i.value ? (p(), k("div", lx, [
                u("div", rx, [
                  E(yt, {
                    data: l.value,
                    options: r,
                    "uppercase-legend-labels": !0
                  }, null, 8, ["data"])
                ])
              ])) : (p(), k("div", cx, [...d[1] || (d[1] = [
                u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
                u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, ul = /* @__PURE__ */ me(dx, [["__scopeId", "data-v-cd8c9258"]]), ux = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, hx = { key: "content" }, fx = {
  key: 0,
  class: "card-body"
}, gx = {
  key: 1,
  class: "empty-state"
}, mx = /* @__PURE__ */ le({
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
    const t = e, n = C(
      () => t.data?.resolution_breakdown || []
    ), a = C(
      () => n.value.some((i) => Number(i.count || 0) > 0)
    ), s = C(() => {
      const i = n.value;
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
    }), o = {
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
    return (i, l) => (p(), ee(ke, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            t.loading ? (p(), k("div", ux, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", hx, [
              a.value ? (p(), k("div", fx, [
                E(St, {
                  data: s.value,
                  options: o,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (p(), k("div", gx, [...l[1] || (l[1] = [
                u("p", { class: "empty-title" }, "No resolution answers available", -1),
                u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), px = /* @__PURE__ */ me(mx, [["__scopeId", "data-v-f99eebba"]]), bx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, vx = { key: "content" }, yx = {
  key: 0,
  class: "card-body"
}, xx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, _x = {
  key: 1,
  class: "empty-state"
}, kx = /* @__PURE__ */ le({
  __name: "npsPulseMetrics",
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
    const t = e, n = C(() => t.data?.csat_pulse_by_day || []), a = C(() => n.value.length > 0), s = C(() => ({
      labels: n.value.map((i) => i.date || ""),
      datasets: [
        {
          label: "CSAT Pulse",
          data: n.value.map((i) => Number(i.csat_pulse || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25
        }
      ]
    })), o = {
      scales: {
        y: {
          min: -200,
          max: 100,
          ticks: {
            callback: (i) => `${i}%`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (i) => `${i.parsed.y.toFixed(2)}%`
          }
        }
      }
    };
    return (i, l) => (p(), ee(ke, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: t.loading
    }, {
      default: B(() => [
        E(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            t.loading ? (p(), k("div", bx, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", vx, [
              a.value ? (p(), k("div", yx, [
                u("div", xx, [
                  E(yt, {
                    data: s.value,
                    options: o,
                    "uppercase-legend-labels": !0
                  }, null, 8, ["data"])
                ])
              ])) : (p(), k("div", _x, [...l[1] || (l[1] = [
                u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
                u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), wx = /* @__PURE__ */ me(kx, [["__scopeId", "data-v-c1c76b84"]]), Cx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, $x = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, hl = {
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
    const n = t, a = (d) => {
      n("export", d);
    }, s = e, o = C(() => s.showResolutionChart), i = C(() => s.showCsatPulseChart), l = C(
      () => (o.value ? 1 : 0) + (i.value ? 1 : 0)
    ), r = C(() => l.value > 0), c = C(
      () => l.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (d, h) => (p(), k("div", Cx, [
      u("div", $x, [
        E(dl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"]),
        E(ul, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (p(), k("div", {
        key: 0,
        class: J(["grid w-full items-start gap-6", c.value])
      }, [
        o.value ? (p(), ee(px, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0),
        i.value ? (p(), ee(wx, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0)
      ], 2)) : z("", !0)
    ]));
  }
}, Sx = { class: "csat-container__body" }, Mx = /* @__PURE__ */ le({
  __name: "CSATContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    data: { default: void 0 },
    showResolutionChart: { type: Boolean, default: !1 },
    showCsatPulseChart: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = t;
    function a(s) {
      n("export", { source: "npsMetrics", format: s });
    }
    return (s, o) => (p(), ee(ke, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", Sx, [
          E(hl, {
            data: e.data,
            loading: e.loading,
            "enable-export": e.enableExport,
            "show-resolution-chart": e.showResolutionChart,
            "show-csat-pulse-chart": e.showCsatPulseChart,
            onExport: a
          }, null, 8, ["data", "loading", "enable-export", "show-resolution-chart", "show-csat-pulse-chart"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Dx = /* @__PURE__ */ me(Mx, [["__scopeId", "data-v-71605c0e"]]), Tx = /* @__PURE__ */ le({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), s = C(() => Et(n.totalRevenue)), o = C(() => T(a.value?.isDark) ?? !1), i = C(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(vt, {
      label: "AI Revenue",
      value: s.value,
      prefix: e.currencyCode,
      "value-size": "large",
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalRevenue,
      "previous-value": e.previousTotalRevenue,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.75",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }),
          u("path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }),
          u("path", { d: "M12 18V6" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "prefix", "loading", "theme", "current-value", "previous-value"]));
  }
}), Qo = 1, Ax = /* @__PURE__ */ le({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), { isDark: s } = Se($e(n, "theme")), o = C(() => n.totalConversations * Qo), i = C(() => n.previousTotalConversations === null || n.previousTotalConversations === void 0 ? null : n.previousTotalConversations * Qo), l = C(() => ie(o.value)), r = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!r.value) return 0;
      const m = i.value;
      return m === 0 ? o.value > 0 ? 100 : 0 : (o.value - m) / m * 100;
    }), d = C(() => {
      const m = c.value.toFixed(1);
      return c.value > 0 ? `+${m}%` : `${m}%`;
    }), h = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: c }), (m, v) => (p(), ee(vt, {
      label: "Cost",
      value: l.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...v[0] || (v[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("path", { d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" })
        ], -1)
      ])]),
      headerAside: B(() => [
        r.value ? (p(), k("div", {
          key: 0,
          class: J(["change-badge", h.value, { "change-badge--dark": T(s) }])
        }, D(d.value), 3)) : z("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Bx = /* @__PURE__ */ me(Ax, [["__scopeId", "data-v-411e0735"]]), Lx = { class: "flex justify-end" }, Px = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ix = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Rx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Ex = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Fx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, Ox = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Vx = /* @__PURE__ */ le({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = $e(a, "theme"), { isDark: i } = Se(o), l = oe(a.breakdownBy), r = C(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), c = oe({
      labels: [],
      datasets: []
    }), d = oe([]), h = oe(
      []
    ), m = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], v = (x) => m[x % m.length], g = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (x) => `${x}%`
          }
        }
      }
    }, y = () => {
      s("changeBreakdown", l.value);
    }, b = (x) => {
      if (!x) return "";
      const w = x.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return w ? w.charAt(0).toUpperCase() + w.slice(1) : "";
    }, f = (x) => {
      if (l.value === "all") {
        const N = x?.escalations_by_day ?? [];
        if (!N.length) {
          c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
          return;
        }
        const O = [...N].sort((A, L) => A.date.localeCompare(L.date));
        c.value = {
          labels: O.map((A) => je(A.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: O.map(
                (A) => Number(A.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, d.value = [], h.value = [];
        return;
      }
      const _ = x?.breakdown_by_day ?? [], w = x?.breakdown_items ?? [];
      if (!_.length) {
        c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
        return;
      }
      const $ = [..._].sort(
        (N, O) => N.date.localeCompare(O.date)
      ), M = w.slice(0, 5).map((N) => N.key), S = $.map((N) => je(N.date).format("MMM DD")), F = M.map((N, O) => {
        const A = w.find((L) => L.key === N);
        return {
          label: b(A?.label || N),
          data: $.map((L) => {
            const V = L.items.find((I) => I.key === N);
            return Number(V?.percentage || 0);
          }),
          borderColor: v(O),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      c.value = {
        labels: S,
        datasets: F
      }, d.value = w.slice(0, 5).map((N, O) => ({
        key: N.key,
        label: b(N.label),
        percentage: Number(N.percentage || 0),
        color: v(O)
      })), h.value = w.slice(0, 5).map((N, O) => ({
        key: N.key,
        label: b(N.label),
        color: v(O)
      }));
    };
    return Oe(
      () => a.data,
      (x) => {
        f(x ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Oe(
      () => a.breakdownBy,
      (x) => {
        l.value = x, f(r.value);
      }
    ), t({ isDark: i }), (x, _) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: B(() => [
        u("div", Lx, [
          lt(u("select", {
            "onUpdate:modelValue": _[0] || (_[0] = (w) => l.value = w),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: y
          }, [..._[1] || (_[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1),
            u("option", { value: "channel" }, "By Channel", -1),
            u("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [$l, l.value]
          ])
        ])
      ]),
      default: B(() => [
        u("div", {
          class: J(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          E(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (p(), k("div", Px, [..._[2] || (_[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", Ix, [
                c.value.labels && c.value.labels.length && c.value.datasets.length ? (p(), k("section", Rx, [
                  u("div", Ex, [
                    E(yt, {
                      data: c.value,
                      options: g,
                      theme: o.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", Fx, [
                    (p(!0), k(se, null, he(d.value, (w) => (p(), ee(ve, {
                      key: `card-${w.key}`,
                      class: "min-w-0",
                      color: w.color,
                      title: w.label,
                      value: `${w.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value"]))), 128))
                  ])
                ])) : (p(), k("section", Ox, [..._[3] || (_[3] = [
                  u("div", { class: "max-w-[360px] px-4 text-center" }, [
                    u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                    u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
                  ], -1)
                ])]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), zx = /* @__PURE__ */ me(Vx, [["__scopeId", "data-v-126665b7"]]), Nx = /* @__PURE__ */ le({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), s = C(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), o = C(() => T(a.value?.isDark) ?? !1), i = C(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(vt, {
      label: "Human Escalations",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          }),
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M4.5 19.5a7.5 7.5 0 0 1 9.36-7.29"
          }),
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m17.25 15.75 4.5 4.5"
          }),
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m21.75 15.75-4.5 4.5"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Hx = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Wx = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, jx = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Kx = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Yx = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Ux = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, qx = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Xx = { class: "max-w-[360px] text-center" }, Gx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Zx = {
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
    const t = e, { isDark: n, colors: a } = Se($e(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = C(() => {
      const c = t.data ?? {}, d = c.daily, h = c.days, m = Array.isArray(d) && d.length > 0, v = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let g = [];
      return m ? g = d : v && (g = h.map((y, b) => ({
        date: y,
        allocated_cost: c.allocatedCostSeries[b] ?? 0,
        aws_cost: c.awsCostSeries[b] ?? 0,
        airline_conversations: c.airlineConversationsSeries[b] ?? 0
      }))), {
        daily: g,
        total_allocated_cost: c.total_allocated_cost ?? c.totalAllocated ?? 0,
        total_cost: c.total_cost ?? c.total ?? 0,
        total_conversations: c.total_conversations ?? c.totalConversations ?? 0,
        total_airline_conversations: c.total_airline_conversations ?? c.totalAirlineConversations ?? 0,
        airline_name: c.airline_name
      };
    }), l = C(() => {
      const c = i.value.daily;
      return {
        labels: c.map((h) => h.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: c.map((h) => h.allocated_cost),
            borderColor: a.value.primaryLight,
            backgroundColor: n.value ? "rgba(198, 125, 255, 0.15)" : "rgba(198, 125, 255, 0.08)",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: !0,
            yAxisID: "y"
          },
          {
            label: "AWS Cost",
            data: c.map((h) => h.aws_cost),
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
            data: c.map((h) => h.airline_conversations),
            borderColor: a.value.info,
            backgroundColor: n.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            yAxisID: "y1"
          }
        ]
      };
    }), r = C(() => ({
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
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
          borderColor: a.value.tooltipBorder,
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: !0,
          usePointStyle: !0,
          callbacks: {
            label(c) {
              const d = c.dataset.label ? `${c.dataset.label}: ` : "", h = c.parsed.y;
              return c.dataset.yAxisID === "y" ? d + Pe(h) : d + String(h);
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
            color: a.value.gridLines,
            drawBorder: !1
          },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 },
            callback: (c) => Pe(c)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 }
          }
        }
      }
    }));
    return (c, d) => (p(), ee(ke, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Hx, [
          e.loading ? (p(), k("div", Wx, [
            u("div", jx, [
              (p(), k(se, null, he(s, (h, m) => u("div", {
                key: m,
                class: J(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[m]]),
                style: Me({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            d[0] || (d[0] = u("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (p(), k("div", Kx, [
            u("div", Yx, [
              E(yt, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: r.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", Ux, [
              E(ve, {
                color: T(a).primaryLight,
                title: "Total Allocated",
                value: T(Pe)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              E(ve, {
                color: "#FF9900",
                title: "Total AWS",
                value: T(Pe)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (p(), k("section", qx, [
            u("div", Xx, [
              u("div", Gx, [
                E(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              d[1] || (d[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              d[2] || (d[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title"]));
  }
}, Qx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Jx = {
  key: 0,
  class: "card-body"
}, e_ = {
  key: 0,
  class: "chart-section"
}, t_ = { class: "chart-container" }, n_ = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, a_ = {
  key: 1,
  class: "empty-state"
}, s_ = { class: "empty-state-content" }, o_ = { class: "empty-icon-wrapper" }, i_ = {
  key: 1,
  class: "loading-state"
}, Sn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Jo = 10, l_ = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, { isDark: s, colors: o } = Se($e(a, "theme")), i = (g) => {
      const y = new Date(g), b = String(y.getDate()).padStart(2, "0"), f = String(y.getMonth() + 1).padStart(2, "0");
      return `${b}-${f}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.input_cost || 0), 0);
    }), c = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.output_cost || 0), 0);
    }), d = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.cache_read_cost || 0), 0);
    }), h = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.cache_write_cost || 0), 0);
    }), m = C(() => {
      const g = a.data?.costs_by_day || {}, y = Object.keys(g).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const b = y.map((x) => i(x)), f = [
        {
          label: "Input Cost",
          data: y.map((x) => g[x]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: y.map((x) => g[x]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: y.map((x) => g[x]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: y.map((x) => g[x]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: f
      };
    }), v = C(() => a.options ? a.options : {
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
              family: Sn,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Jo,
            boxHeight: Jo,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: Sn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Sn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(g) {
              let y = g.dataset.label || "";
              return y && (y += ": "), g.parsed.y !== null && (y += Pe(g.parsed.y)), y;
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
            font: { family: Sn, size: 12, weight: "500" },
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
            font: { family: Sn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return Pe(g);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (g, y) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Qx, [
          e.loading ? (p(), k("div", i_, [...y[2] || (y[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (p(), k("div", Jx, [
            m.value.labels && m.value.labels.length ? (p(), k("section", e_, [
              u("div", t_, [
                E(St, {
                  data: m.value,
                  options: v.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", n_, [
                E(ve, {
                  title: "Total Cost",
                  value: T(Pe)(e.data.total_cost)
                }, null, 8, ["value"]),
                E(ve, {
                  title: "Input Cost",
                  value: T(Pe)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                E(ve, {
                  title: "Output Cost",
                  value: T(Pe)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                E(ve, {
                  title: "Cache Read",
                  value: T(Pe)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                E(ve, {
                  title: "Cache Write",
                  value: T(Pe)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                E(ve, {
                  title: "Avg / Conv.",
                  value: T(Pe)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", a_, [
              u("div", s_, [
                u("div", o_, [
                  E(T(nt), { class: "empty-icon" })
                ]),
                y[0] || (y[0] = u("p", { class: "empty-title" }, "No cost usage data", -1)),
                y[1] || (y[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), r_ = /* @__PURE__ */ me(l_, [["__scopeId", "data-v-39a5448c"]]), c_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, d_ = {
  key: 0,
  class: "card-body"
}, u_ = {
  key: 0,
  class: "chart-section"
}, h_ = { class: "chart-container" }, f_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, g_ = {
  key: 1,
  class: "empty-state"
}, m_ = { class: "empty-state-content" }, p_ = { class: "empty-icon-wrapper" }, b_ = {
  key: 1,
  class: "loading-state"
}, Mn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ei = 10, v_ = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, { isDark: s, colors: o } = Se($e(a, "theme")), i = (d) => {
      const h = new Date(d), m = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${m}-${v}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((g) => i(g)), v = [
        {
          label: "Input Tokens",
          data: h.map((g) => d[g]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((g) => d[g]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((g) => d[g]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((g) => d[g]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: m,
        datasets: v
      };
    }), c = C(() => a.options ? a.options : {
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
              family: Mn,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: ei,
            boxHeight: ei,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: Mn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Mn,
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
            font: { family: Mn, size: 12, weight: "500" },
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
            font: { family: Mn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (d, h) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", c_, [
          e.loading ? (p(), k("div", b_, [...h[2] || (h[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (p(), k("div", d_, [
            r.value.labels && r.value.labels.length ? (p(), k("section", u_, [
              u("div", h_, [
                E(St, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", f_, [
                E(ve, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: T(ie)(e.data.total_tokens)
                }, null, 8, ["value"]),
                E(ve, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: T(ie)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                E(ve, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: T(ie)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                E(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: T(ie)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                E(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: T(ie)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (p(), k("section", g_, [
              u("div", m_, [
                u("div", p_, [
                  E(T(nt), { class: "empty-icon" })
                ]),
                h[0] || (h[0] = u("p", { class: "empty-title" }, "No token usage data", -1)),
                h[1] || (h[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), y_ = /* @__PURE__ */ me(v_, [["__scopeId", "data-v-70c6f3c7"]]), x_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, __ = {
  key: 0,
  class: "card-body"
}, k_ = {
  key: 0,
  class: "chart-section"
}, w_ = { class: "chart-container" }, C_ = { class: "mt-4 w-full min-w-0" }, $_ = {
  key: 1,
  class: "empty-state"
}, S_ = { class: "empty-state-content" }, M_ = { class: "empty-icon-wrapper" }, D_ = {
  key: 1,
  class: "loading-state"
}, T_ = /* @__PURE__ */ le({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Se($e(n, "theme")), o = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(
      () => ie(n.data?.total_conversations ?? 0)
    ), l = C(() => {
      const c = n.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((v) => o(v)), m = [
        {
          label: "Conversations",
          data: d.map((v) => c[v] || 0),
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
        datasets: m
      };
    }), r = C(() => n.options ? n.options : {
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
            color: s.value.textSecondary,
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
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
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
            label: function(c) {
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += c.parsed.y), d;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: s.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: a }), (c, d) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", x_, [
          e.loading ? (p(), k("div", D_, [...d[2] || (d[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (p(), k("div", __, [
            l.value.labels && l.value.labels.length ? (p(), k("section", k_, [
              u("div", w_, [
                E(yt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", C_, [
                E(ve, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", $_, [
              u("div", S_, [
                u("div", M_, [
                  E(T(nt), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No conversation count data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), A_ = /* @__PURE__ */ me(T_, [["__scopeId", "data-v-b33e8627"]]), B_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, L_ = {
  key: 0,
  class: "card-body"
}, P_ = {
  key: 0,
  class: "charts-grid"
}, I_ = { class: "chart-section" }, R_ = { class: "chart-container" }, E_ = { class: "chart-section" }, F_ = { class: "chart-container" }, O_ = {
  key: 1,
  class: "empty-state"
}, V_ = { class: "empty-state-content" }, z_ = { class: "empty-icon-wrapper" }, N_ = {
  key: 1,
  class: "loading-state"
}, H_ = /* @__PURE__ */ le({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Se($e(n, "theme")), o = C(() => n.data?.top_agents && n.data.top_agents.length > 0), i = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, v) => (v.total_cost || 0) - (m.total_cost || 0)) : []), l = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, v) => (v.total_tokens || 0) - (m.total_tokens || 0)) : []), r = C(() => {
      const m = i.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: m.map((v) => v.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = C(() => {
      const m = l.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: m.map((v) => v.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), d = C(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const v = m.label, g = n.data?.top_agents?.find((y) => y.agent_type === v);
              return g ? [
                `Total Cost: ${Pe(g.total_cost)}`,
                `Input Cost: ${Pe(g.total_input_tokens_cost)}`,
                `Output Cost: ${Pe(g.total_output_tokens_cost)}`,
                `Cache Read: ${Pe(g.total_read_tokens_cost)}`,
                `Cache Write: ${Pe(g.total_write_tokens_cost)}`
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
            color: s.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(m) {
              return Pe(m);
            }
          }
        }
      }
    }), h = C(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const v = m.label, g = n.data?.top_agents?.find((y) => y.agent_type === v);
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
            color: s.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(m) {
              return m.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (m, v) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", B_, [
          e.loading ? (p(), k("div", N_, [...v[4] || (v[4] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (p(), k("div", L_, [
            o.value ? (p(), k("div", P_, [
              u("section", I_, [
                v[0] || (v[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", R_, [
                  E(St, {
                    data: r.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", E_, [
                v[1] || (v[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", F_, [
                  E(St, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (p(), k("section", O_, [
              u("div", V_, [
                u("div", z_, [
                  E(T(nt), { class: "empty-icon" })
                ]),
                v[2] || (v[2] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                v[3] || (v[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), W_ = /* @__PURE__ */ me(H_, [["__scopeId", "data-v-a5014772"]]), j_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, K_ = {
  key: 0,
  class: "card-body"
}, Y_ = {
  key: 0,
  class: "chart-section"
}, U_ = { class: "chart-container" }, q_ = {
  key: 1,
  class: "empty-state"
}, X_ = { class: "empty-state-content" }, G_ = { class: "empty-icon-wrapper" }, Z_ = {
  key: 1,
  class: "loading-state"
}, Q_ = /* @__PURE__ */ le({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Se($e(n, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = C(() => n.data?.top_agents ? n.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), l = C(() => i.value.length > 0), r = C(() => i.value.reduce((h, m) => h + (m.conversations || 0), 0)), c = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((y) => {
        const b = y.agent_type?.toLowerCase();
        return (o[b] || "#a78bfa") + "80";
      }), v = h.map((y) => {
        const b = y.agent_type?.toLowerCase();
        return o[b] || "#a78bfa";
      });
      return {
        labels: h.map((y) => {
          const b = y.conversations || 0, f = r.value ? b / r.value * 100 : 0;
          return `${y.agent_type} - ${b.toLocaleString()} (${f.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((y) => y.conversations || 0),
            backgroundColor: m,
            borderColor: v,
            borderWidth: 2
          }
        ]
      };
    }), d = C(() => n.options ? n.options : {
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
            color: s.value.textSecondary,
            usePointStyle: !0,
            padding: 16,
            boxWidth: 8,
            boxHeight: 8
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
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
            label: (h) => {
              const m = (h.label || "").toString(), v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((b, f) => b + (Number(f) || 0), 0), y = g ? v / g * 100 : 0;
              return `${m}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, m) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", j_, [
          e.loading ? (p(), k("div", Z_, [...m[2] || (m[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (p(), k("div", K_, [
            l.value ? (p(), k("section", Y_, [
              u("div", U_, [
                E(Ma, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (p(), k("section", q_, [
              u("div", X_, [
                u("div", G_, [
                  E(T(nt), { class: "empty-icon" })
                ]),
                m[0] || (m[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                m[1] || (m[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), J_ = /* @__PURE__ */ me(Q_, [["__scopeId", "data-v-14445b91"]]), ek = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, tk = {
  key: 0,
  class: "card-body"
}, nk = {
  key: 0,
  class: "chart-section"
}, ak = { class: "chart-container" }, sk = {
  key: 1,
  class: "empty-state"
}, ok = { class: "empty-state-content" }, ik = { class: "empty-icon-wrapper" }, lk = {
  key: 1,
  class: "loading-state"
}, rk = /* @__PURE__ */ le({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Se($e(n, "theme")), o = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), l = C(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const b = [...c].sort((f, x) => f.date.localeCompare(x.date));
        return {
          labels: b.map((f) => o(f.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: b.map((f) => Number(f.value) || 0),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, v = Object.keys(d).filter((b) => h[b]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = v.map((b) => o(b)), y = v.map((b) => {
        const f = d[b]?.total_cost || 0, x = h[b] || 0;
        return x > 0 ? f / x : 0;
      });
      return {
        labels: g,
        datasets: [
          {
            label: "Mean USD/conv",
            data: y,
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
    }), r = C(() => n.options ? n.options : {
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
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: 40,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
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
            label: function(c) {
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += Pe(c.parsed.y)), d;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: s.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(c) {
              return Pe(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, d) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", ek, [
          e.loading ? (p(), k("div", lk, [...d[2] || (d[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (p(), k("div", tk, [
            i.value ? (p(), k("section", nk, [
              u("div", ak, [
                E(yt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (p(), k("section", sk, [
              u("div", ok, [
                u("div", ik, [
                  E(T(nt), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No daily cost trends data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), ck = /* @__PURE__ */ me(rk, [["__scopeId", "data-v-1e8204ea"]]), dk = { class: "tabs text-sm" }, uk = ["aria-label"], hk = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], fk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, gk = /* @__PURE__ */ le({
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
    const n = e, a = t, s = oe([]), o = `tabs-${Ue()}`, i = (g) => `${o}-tab-${g}`, l = C(
      () => n.items.map((g, y) => g.disabled ? -1 : y).filter((g) => g >= 0)
    );
    function r(g) {
      return g.value === n.modelValue;
    }
    function c(g) {
      const y = r(g), f = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${f} cursor-not-allowed opacity-40` : y ? `${f} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${f} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(g, y) {
      g === y || n.items.find((f) => f.value === g)?.disabled || (a("update:modelValue", g), a("change", { value: g, previousValue: y }));
    }
    function h(g, y) {
      a("tab-click", { value: g.value, originalEvent: y }), !g.disabled && (d(g.value, n.modelValue), We(() => {
        s.value[n.items.indexOf(g)]?.focus();
      }));
    }
    function m(g, y) {
      const b = n.items.length;
      if (b === 0) return 0;
      let f = g;
      for (let x = 0; x < b; x++)
        if (f = (f + y + b) % b, !n.items[f]?.disabled) return f;
      return g;
    }
    async function v(g, y) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let f = y;
      g.key === "ArrowLeft" ? f = m(y, -1) : g.key === "ArrowRight" ? f = m(y, 1) : g.key === "Home" ? f = l.value[0] ?? 0 : g.key === "End" && (f = l.value[l.value.length - 1] ?? y);
      const x = n.items[f];
      !x || x.disabled || (d(x.value, n.modelValue), await We(), s.value[f]?.focus());
    }
    return (g, y) => (p(), k("div", dk, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: J([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (p(!0), k(se, null, he(e.items, (b, f) => (p(), k("button", {
          id: i(b.value),
          key: b.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: s,
          type: "button",
          role: "tab",
          "aria-selected": r(b),
          "aria-disabled": b.disabled === !0,
          tabindex: r(b) ? 0 : -1,
          class: J(c(b)),
          onClick: (x) => h(b, x),
          onKeydown: (x) => v(x, f)
        }, [
          u("span", {
            class: J(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            b.icon ? (p(), ee(Ft(b.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : z("", !0),
            u("span", fk, D(b.label), 1)
          ], 2)
        ], 42, hk))), 128))
      ], 10, uk),
      g.$slots.default ? (p(), ee(Te, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: B(() => [
          (p(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            Ce(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : z("", !0)
    ]));
  }
}), fl = /* @__PURE__ */ me(gk, [["__scopeId", "data-v-f9c367eb"]]), mk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, pk = {
  key: 0,
  class: "loading-state"
}, bk = {
  key: 1,
  class: "card-body"
}, vk = {
  key: 0,
  class: "model-usage-table-block"
}, yk = { class: "w-full min-w-0" }, xk = {
  key: 1,
  class: "empty-state"
}, _k = { class: "empty-state-content" }, kk = { class: "empty-icon-wrapper" }, wk = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (g) => {
      s("export", g);
    }, { isDark: i } = Se($e(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = oe("by_model"), c = C(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = C(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = C(
      () => Object.entries(c.value).map(([g, y]) => ({
        id: g,
        name: g,
        avgCost: v(y.avg_cost_per_message),
        avgTokens: m(y.avg_tokens_per_message),
        messageCount: m(y.message_count),
        totalCost: v(y.total_cost),
        totalTokens: m(y.total_tokens)
      }))
    ), m = (g) => g == null ? "0" : ie(g), v = (g) => g == null ? "$0.00" : Pe(g);
    return t({ isDark: i }), (g, y) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", mk, [
          e.loading ? (p(), k("div", pk, [...y[1] || (y[1] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-bars-loader" }, [
                u("div", { class: "bar bar-1" }),
                u("div", { class: "bar bar-2" }),
                u("div", { class: "bar bar-3" }),
                u("div", { class: "bar bar-4" }),
                u("div", { class: "bar bar-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading model usage data...")
            ], -1)
          ])])) : (p(), k("div", bk, [
            E(fl, {
              modelValue: r.value,
              "onUpdate:modelValue": y[0] || (y[0] = (b) => r.value = b),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: B(() => [
                c.value && Object.keys(c.value).length > 0 ? (p(), k("div", vk, [
                  u("div", yk, [
                    E(rt, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (p(), k("div", xk, [
                  u("div", _k, [
                    u("div", kk, [
                      E(T(nt), { class: "empty-icon" })
                    ]),
                    y[2] || (y[2] = u("p", { class: "empty-title" }, "No model usage data available", -1)),
                    y[3] || (y[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
                  ])
                ]))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Ck = /* @__PURE__ */ me(wk, [["__scopeId", "data-v-0c23d620"]]), $k = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Sk = {
  key: 0,
  class: "loading-state"
}, Mk = {
  key: 1,
  class: "card-body"
}, Dk = {
  key: 0,
  class: "message-roles-table-block"
}, Tk = { class: "w-full min-w-0" }, Ak = {
  key: 1,
  class: "empty-state"
}, Bk = { class: "empty-state-content" }, Lk = { class: "empty-icon-wrapper" }, Pk = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (y) => {
      s("export", y);
    }, { isDark: i } = Se($e(a, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => a.data?.total_by_role || {}), d = C(
      () => l.map((y) => ({
        id: y,
        role: g(y),
        avgCost: v(c.value[y]?.avg_cost_per_message),
        avgTokens: m(c.value[y]?.avg_tokens_per_message),
        messageCount: m(c.value[y]?.message_count),
        totalCost: v(c.value[y]?.total_cost),
        totalTokens: m(c.value[y]?.total_tokens)
      }))
    ), h = C(() => Object.keys(c.value).length > 0), m = (y) => y == null ? "0" : ie(y), v = (y) => y == null ? "$0.00" : Pe(y), g = (y) => y.charAt(0).toUpperCase() + y.slice(1);
    return t({ isDark: i }), (y, b) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", $k, [
          e.loading ? (p(), k("div", Sk, [...b[0] || (b[0] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-bars-loader" }, [
                u("div", { class: "bar bar-1" }),
                u("div", { class: "bar bar-2" }),
                u("div", { class: "bar bar-3" }),
                u("div", { class: "bar bar-4" }),
                u("div", { class: "bar bar-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading message role data...")
            ], -1)
          ])])) : (p(), k("div", Mk, [
            h.value ? (p(), k("div", Dk, [
              u("div", Tk, [
                E(rt, {
                  columns: r,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (p(), k("div", Ak, [
              u("div", Bk, [
                u("div", Lk, [
                  E(T(nt), { class: "empty-icon" })
                ]),
                b[1] || (b[1] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                b[2] || (b[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Ik = /* @__PURE__ */ me(Pk, [["__scopeId", "data-v-362c0dbc"]]), Rk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ek = {
  key: 0,
  class: "card-body"
}, Fk = {
  key: 0,
  class: "chart-section"
}, Ok = { class: "chart-container" }, Vk = { class: "kpi-grid" }, zk = {
  key: 1,
  class: "empty-state"
}, Nk = { class: "empty-state-content" }, Hk = { class: "empty-icon-wrapper" }, Wk = {
  key: 1,
  class: "loading-state"
}, jk = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (x) => {
      s("export", x);
    }, { isDark: i, colors: l } = Se($e(a, "theme")), r = {
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
    }, c = (x) => x.agent_type || x.agent_id || x.agent_name || "", d = (x) => x.agent_name ? x.agent_name : c(x).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (x) => {
      const _ = c(x).toLowerCase();
      for (const [w, $] of Object.entries(r))
        if (_.includes(w))
          return $;
      return "#9ca3af";
    }, m = C(() => [...a.data?.top_agents || []].sort((_, w) => w.avg_cost_per_conversation - _.avg_cost_per_conversation)), v = C(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : m.value.reduce((x, _) => x + _.conversations, 0)), g = C(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : m.value.reduce((x, _) => x + _.total_cost, 0)), y = C(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : g.value / v.value), b = C(() => {
      const x = m.value;
      if (x.length === 0)
        return { labels: [], datasets: [] };
      const _ = x.map((M) => d(M)), w = x.map((M) => M.avg_cost_per_conversation), $ = x.map((M) => h(M));
      return {
        labels: _,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: $.map((M) => `${M}80`),
            borderColor: $,
            borderWidth: 1
          }
        ]
      };
    }), f = C(() => a.options ? a.options : {
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
            label: function(x) {
              const _ = m.value[x.dataIndex];
              return [
                `Cost: ${Pe(x.parsed.x)}`,
                `Conversations: ${ie(_.conversations)}`,
                `Total Cost: ${Pe(_.total_cost)}`
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
            color: l.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: l.value.textSecondary,
            padding: 8,
            callback: function(x) {
              return Pe(x);
            }
          }
        },
        y: {
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
    return t({ isDark: i }), (x, _) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", Rk, [
          e.loading ? (p(), k("div", Wk, [..._[2] || (_[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-bars-loader" }, [
                u("div", { class: "bar bar-1" }),
                u("div", { class: "bar bar-2" }),
                u("div", { class: "bar bar-3" }),
                u("div", { class: "bar bar-4" }),
                u("div", { class: "bar bar-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading agent costs...")
            ], -1)
          ])])) : (p(), k("div", Ek, [
            b.value.labels && b.value.labels.length ? (p(), k("section", Fk, [
              u("div", Ok, [
                E(St, {
                  data: b.value,
                  options: f.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Vk, [
                E(T(ve), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                E(T(ve), {
                  title: "Total Conversations",
                  value: T(ie)(v.value)
                }, null, 8, ["value"]),
                E(T(ve), {
                  title: "Total Cost",
                  value: T(Pe)(g.value)
                }, null, 8, ["value"]),
                E(T(ve), {
                  title: "Avg Cost / Conv.",
                  value: T(Pe)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", zk, [
              u("div", Nk, [
                u("div", Hk, [
                  E(T(nt), { class: "empty-icon" })
                ]),
                _[0] || (_[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                _[1] || (_[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Kk = /* @__PURE__ */ me(jk, [["__scopeId", "data-v-49068ad7"]]);
function gl(e, t) {
  const n = e[t];
  return Array.isArray(n) ? n.filter(
    (a) => a !== null && typeof a == "object" && !Array.isArray(a)
  ) : [];
}
function ml(e, t, n = 0, a = null, s = 0) {
  const { childrenKey: o, expandedKeys: i, resolveRowKey: l, maxDepth: r } = t, c = [];
  return e.forEach((d, h) => {
    const m = l(d, s + h), v = gl(d, o), g = v.length > 0, y = i.has(m);
    c.push({
      row: d,
      key: m,
      depth: n,
      hasChildren: g,
      isExpanded: y,
      parentKey: a
    }), g && y && (r === void 0 || n < r) && c.push(
      ...ml(v, t, n + 1, m, 0)
    );
  }), c;
}
function pl(e, t, n = 0) {
  const { childrenKey: a, resolveRowKey: s } = t, o = [];
  return e.forEach((i, l) => {
    const r = s(i, n + l);
    o.push(r);
    const c = gl(i, a);
    c.length > 0 && o.push(...pl(c, t, 0));
  }), o;
}
const Yk = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Uk = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, qk = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Xk = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, Gk = ["checked", "aria-label"], Zk = ["aria-sort", "onClick"], Qk = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Jk = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, e2 = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, t2 = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, n2 = ["checked", "aria-label", "onChange"], a2 = ["aria-expanded", "aria-label", "onClick"], s2 = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, o2 = { class: "min-w-0 flex-1" }, i2 = /* @__PURE__ */ le({
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
    expandable: { type: Boolean, default: !1 },
    childrenKey: { default: "children" },
    expandColumnKey: { default: void 0 },
    expandedKeys: { default: void 0 },
    defaultExpandedKeys: { default: () => [] },
    singleExpand: { type: Boolean, default: !1 },
    maxDepth: { default: void 0 },
    isRowExpandable: { type: Function, default: void 0 },
    ariaLabelExpandRow: { default: "Expandir fila" },
    ariaLabelCollapseRow: { default: "Contraer fila" }
  },
  emits: ["update:selectedKeys", "update:expandedKeys", "sort", "expand", "collapse"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = oe(null), o = oe([...n.defaultExpandedKeys]), i = C({
      get() {
        return n.expandedKeys ?? o.value;
      },
      set(I) {
        o.value = I, a("update:expandedKeys", I);
      }
    }), l = C(
      () => new Set(i.value)
    ), r = C(
      () => n.expandColumnKey ?? n.columns[0]?.key ?? ""
    ), c = C(() => ({
      childrenKey: n.childrenKey,
      expandedKeys: l.value,
      resolveRowKey: v,
      maxDepth: n.maxDepth
    })), d = C(() => n.expandable ? ml(n.rows, c.value) : n.rows.map((I, U) => ({
      row: I,
      key: v(I, U),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function h(I) {
      return `cell-${I}`;
    }
    function m(I) {
      return I === "center" ? "text-center" : I === "right" ? "text-right" : "text-left";
    }
    function v(I, U) {
      if (typeof n.rowKey == "function")
        return n.rowKey(I);
      const G = I[n.rowKey];
      return G != null ? String(G) : `__index_${U}`;
    }
    function g(I, U) {
      return I[U];
    }
    function y(I) {
      return I == null || typeof I == "object" ? "" : String(I);
    }
    function b(I) {
      return n.expandable && I === r.value;
    }
    function f(I) {
      return I.hasChildren || (n.isRowExpandable?.(I.row) ?? !1);
    }
    function x(I, U) {
      return {
        row: I.row,
        column: U,
        value: g(I.row, U.key),
        depth: I.depth,
        isChild: I.depth > 0,
        hasChildren: I.hasChildren,
        expanded: I.isExpanded
      };
    }
    function _(I) {
      if (!f(I)) return;
      const U = new Set(i.value);
      U.has(I.key) ? (U.delete(I.key), a("collapse", I.key, I.row)) : (n.singleExpand && U.clear(), U.add(I.key), a("expand", I.key, I.row)), i.value = [...U];
    }
    const w = C(() => n.expandable ? pl(n.rows, {
      childrenKey: n.childrenKey,
      resolveRowKey: v
    }) : n.rows.map((I, U) => v(I, U)));
    function $(I) {
      return n.selectedKeys.includes(I);
    }
    const M = C(() => !n.selectable || w.value.length === 0 ? !1 : w.value.every((I) => n.selectedKeys.includes(I))), S = C(() => {
      if (!n.selectable || w.value.length === 0) return !1;
      const I = w.value.filter((U) => n.selectedKeys.includes(U));
      return I.length > 0 && I.length < w.value.length;
    });
    Oe(
      [S, M, () => n.selectable],
      async () => {
        await We();
        const I = s.value;
        I && (I.indeterminate = S.value && !M.value);
      },
      { immediate: !0 }
    );
    function F() {
      if (n.selectable)
        if (M.value) {
          const I = n.selectedKeys.filter((U) => !w.value.includes(U));
          a("update:selectedKeys", I);
        } else {
          const I = new Set(n.selectedKeys);
          w.value.forEach((U) => I.add(U)), a("update:selectedKeys", [...I]);
        }
    }
    function N(I) {
      if (!n.selectable) return;
      n.selectedKeys.includes(I) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((G) => G !== I)
      ) : a("update:selectedKeys", [...n.selectedKeys, I]);
    }
    function O(I) {
      return `${n.ariaLabelSelectRow} ${I}`;
    }
    function A(I) {
      a("sort", I);
    }
    function L(I) {
      return n.sortKey === I && n.sortDirection != null;
    }
    function V(I) {
      return L(I) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (I, U) => (p(), k("div", Yk, [
      u("div", Uk, [
        u("table", {
          class: J([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", qk, [
              e.selectable ? (p(), k("th", Xk, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: M.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: F
                }, null, 40, Gk)
              ])) : z("", !0),
              (p(!0), k(se, null, he(e.columns, (G) => (p(), k("th", {
                key: G.key,
                scope: "col",
                class: J([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  m(G.align),
                  G.headerClass ?? ""
                ])
              }, [
                G.sortable ? (p(), k("button", {
                  key: 0,
                  type: "button",
                  class: J(["kiut-table-sort-btn inline-flex items-center gap-1", m(G.align)]),
                  "aria-sort": V(G.key),
                  onClick: (ne) => A(G.key)
                }, [
                  u("span", null, D(G.label), 1),
                  u("span", Qk, [
                    L(G.key) ? (p(), k(se, { key: 0 }, [
                      e.sortDirection === "asc" ? (p(), k("span", Jk, "↑")) : e.sortDirection === "desc" ? (p(), k("span", e2, "↓")) : z("", !0)
                    ], 64)) : (p(), k(se, { key: 1 }, [
                      U[0] || (U[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      U[1] || (U[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Zk)) : (p(), k(se, { key: 1 }, [
                  Be(D(G.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (p(!0), k(se, null, he(d.value, (G) => (p(), k("tr", {
              key: G.key,
              class: J([
                "h-14 border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                G.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (p(), k("td", t2, [
                u("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: $(G.key),
                  "aria-label": O(G.key),
                  onChange: (ne) => N(G.key)
                }, null, 40, n2)
              ])) : z("", !0),
              (p(!0), k(se, null, he(e.columns, (ne) => (p(), k("td", {
                key: ne.key,
                class: J([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  m(ne.align),
                  ne.cellClass ?? ""
                ])
              }, [
                b(ne.key) ? (p(), k("div", {
                  key: 0,
                  class: "flex min-w-0 items-center gap-1",
                  style: Me({ paddingLeft: `${G.depth * 1.25}rem` })
                }, [
                  Ce(I.$slots, "row-expand", {
                    row: G.row,
                    expanded: G.isExpanded,
                    hasChildren: G.hasChildren,
                    depth: G.depth,
                    toggle: () => _(G)
                  }, () => [
                    f(G) ? (p(), k("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": G.isExpanded,
                      "aria-label": G.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: qe((ge) => _(G), ["stop"])
                    }, [
                      E(T(Da), {
                        class: J(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !G.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, a2)) : (p(), k("span", s2))
                  ], !0),
                  u("div", o2, [
                    Ce(I.$slots, h(ne.key), Ct({ ref_for: !0 }, x(G, ne)), () => [
                      Be(D(y(g(G.row, ne.key))), 1)
                    ], !0)
                  ])
                ], 4)) : Ce(I.$slots, h(ne.key), Ct({
                  key: 1,
                  ref_for: !0
                }, x(G, ne)), () => [
                  Be(D(y(g(G.row, ne.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), l2 = /* @__PURE__ */ me(i2, [["__scopeId", "data-v-b09ec638"]]);
function r2(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function c2(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const d2 = ["aria-label"], u2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, h2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, f2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, g2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], m2 = { class: "truncate" }, p2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, b2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, v2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, y2 = ["aria-label", "onClick"], x2 = ["aria-label", "onClick"], _2 = ["aria-label"], k2 = ["aria-label"], w2 = {
  key: 1,
  class: "space-y-2"
}, C2 = ["for"], $2 = ["id", "placeholder", "onKeydown"], S2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, M2 = ["aria-label"], D2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, T2 = ["checked", "onChange"], A2 = { class: "min-w-0 flex-1" }, B2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, L2 = { class: "flex flex-wrap items-end gap-2" }, P2 = { class: "min-w-[120px] flex-1" }, I2 = ["for"], R2 = ["id"], E2 = { class: "min-w-[120px] flex-1" }, F2 = ["for"], O2 = ["id"], V2 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = es(), i = `${`kiut-filters-${Ue()}`}-panel`, l = oe(null), r = /* @__PURE__ */ new Map(), c = oe(null), d = oe(!1), h = oe({}), m = oe(null), v = oe(""), g = oe([]), y = oe(""), b = oe(""), f = C(() => c.value ? n.filterDefinitions.find((P) => P.id === c.value) ?? null : null), x = C(() => {
      const P = f.value;
      if (P)
        return P.type === "text" ? v.value : P.type === "select" ? g.value : { start: y.value, end: b.value };
    });
    function _(P, Y) {
      Y && Y instanceof HTMLElement ? r.set(P, Y) : r.delete(P);
    }
    function w(P) {
      return n.modelValue[P];
    }
    function $(P) {
      if (P == null) return [];
      if (Array.isArray(P))
        return P.filter((Y) => typeof Y == "string" && Y.trim() !== "");
      if (typeof P == "string") {
        const Y = P.trim();
        return Y ? [Y] : [];
      }
      return [];
    }
    function M(P, Y) {
      if (Y == null) return !0;
      if (P.type === "text") return String(Y).trim() === "";
      if (P.type === "select") return $(Y).length === 0;
      if (P.type === "dateRange") {
        const te = Y;
        return !te?.start?.trim() || !te?.end?.trim();
      }
      return !0;
    }
    const S = C(
      () => n.filterDefinitions.some((P) => !M(P, w(P.id)))
    ), F = C(() => {
      const P = [];
      for (const Y of n.filterDefinitions) {
        const te = w(Y.id);
        if (!M(Y, te)) {
          if (Y.type === "text")
            P.push({ kind: "text", def: Y, key: Y.id });
          else if (Y.type === "dateRange")
            P.push({ kind: "dateRange", def: Y, key: Y.id });
          else if (Y.type === "select")
            for (const ce of $(te))
              P.push({
                kind: "select",
                def: Y,
                optionValue: ce,
                key: `${Y.id}::${ce}`
              });
        }
      }
      return P;
    });
    function N(P) {
      return P.type !== "select" ? 0 : $(w(P.id)).length;
    }
    function O(P) {
      const Y = w(P.id), te = P.label.replace(/^\+\s*/, "");
      if (P.type === "text") return `${te}: ${String(Y ?? "").trim()}`;
      if (P.type === "select") {
        const et = $(Y).map((dt) => P.options.find((xt) => xt.value === dt)?.label ?? dt);
        return `${te}: ${et.join(", ")}`;
      }
      const ce = Y, pe = L(ce.start), xe = L(ce.end);
      return `${te}: ${pe} – ${xe}`;
    }
    function A(P) {
      return P.kind === "text" || P.kind === "dateRange" ? O(P.def) : P.def.options.find((te) => te.value === P.optionValue)?.label ?? P.optionValue;
    }
    function L(P) {
      if (!P) return "";
      const Y = je(P, "YYYY-MM-DD", !0);
      return Y.isValid() ? Y.format("L") : P;
    }
    function V(P) {
      const Y = c.value === P.id && d.value, te = !M(P, w(P.id));
      return Y || te ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function I(P) {
      return M(P, w(P.id)) ? q(P) : `Editar filtro ${P.label.replace(/^\+\s*/, "")}`;
    }
    function U(P) {
      const Y = w(P.id);
      if (P.type === "text") {
        v.value = Y != null ? String(Y) : "";
        return;
      }
      if (P.type === "select") {
        g.value = [...$(Y)];
        return;
      }
      const te = Y;
      y.value = te?.start?.trim() ?? "", b.value = te?.end?.trim() ?? "";
    }
    function G() {
      const P = f.value;
      if (!P || P.type !== "select") return;
      const Y = { ...n.modelValue };
      g.value.length === 0 ? delete Y[P.id] : Y[P.id] = [...g.value], a("update:modelValue", Y), a("change", Y);
    }
    function ne(P) {
      const Y = g.value.indexOf(P);
      Y >= 0 ? g.value = g.value.filter((te, ce) => ce !== Y) : g.value = [...g.value, P], G();
    }
    function ge(P) {
      if (!P) return;
      m.value = P;
      const Y = P.getBoundingClientRect(), te = 300;
      let ce = Y.left;
      const pe = window.innerWidth - te - 12;
      ce > pe && (ce = Math.max(12, pe)), ce < 12 && (ce = 12);
      const xe = Y.bottom + 8;
      h.value = {
        top: `${xe}px`,
        left: `${ce}px`,
        width: `${Math.min(te, window.innerWidth - 24)}px`
      };
    }
    function ye(P, Y) {
      if (c.value === P.id && d.value) {
        fe();
        return;
      }
      d.value && c.value !== P.id && fe(), c.value = P.id, d.value = !0, U(P), We().then(async () => {
        ge(Y.currentTarget), await We(), W();
      });
    }
    function X(P, Y) {
      if (c.value === P.id && d.value) {
        fe();
        return;
      }
      d.value && c.value !== P.id && fe(), c.value = P.id, d.value = !0, U(P), We().then(async () => {
        const te = r.get(P.id) ?? Y.currentTarget;
        ge(te), await We(), W();
      });
    }
    function W() {
      const P = l.value;
      if (!P) return;
      P.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function Q() {
      d.value = !1, c.value = null, m.value = null;
    }
    function ae(P) {
      const Y = f.value;
      if (!Y) return;
      if (Y.type === "text") {
        v.value = P != null ? String(P) : "";
        return;
      }
      if (Y.type === "select") {
        g.value = Array.isArray(P) ? P.filter((ce) => typeof ce == "string") : $(P);
        return;
      }
      const te = P;
      y.value = te?.start?.trim() ?? "", b.value = te?.end?.trim() ?? "";
    }
    function fe() {
      const P = f.value;
      if (!P) return;
      if (P.type === "text") {
        const pe = v.value.trim(), xe = { ...n.modelValue };
        pe === "" ? delete xe[P.id] : xe[P.id] = pe, a("update:modelValue", xe), a("change", xe), Q();
        return;
      }
      if (P.type === "select") {
        G(), Q();
        return;
      }
      const Y = y.value.trim(), te = b.value.trim(), ce = { ...n.modelValue };
      !Y || !te || Y > te ? delete ce[P.id] : ce[P.id] = { start: Y, end: te }, a("update:modelValue", ce), a("change", ce), Q();
    }
    function we(P) {
      const Y = { ...n.modelValue };
      delete Y[P], a("update:modelValue", Y), a("change", Y), c.value === P && Q();
    }
    function De(P) {
      if (P.kind === "text" || P.kind === "dateRange") {
        we(P.def.id);
        return;
      }
      const Y = { ...n.modelValue }, ce = $(Y[P.def.id]).filter((pe) => pe !== P.optionValue);
      ce.length === 0 ? delete Y[P.def.id] : Y[P.def.id] = ce, a("update:modelValue", Y), a("change", Y), c.value === P.def.id && U(P.def);
    }
    function R() {
      const P = {};
      a("update:modelValue", P), a("change", P), Q();
    }
    const H = C(() => {
      const P = f.value;
      return P ? `Editar filtro: ${P.label}` : "Filtro";
    });
    function K(P) {
      const Y = P.def.label.replace(/^\+\s*/, "");
      return P.kind === "select" ? `Quitar ${P.def.options.find((pe) => pe.value === P.optionValue)?.label ?? P.optionValue} del filtro ${Y}` : `Quitar filtro ${Y}`;
    }
    function de(P) {
      const Y = P.def.label.replace(/^\+\s*/, "");
      if (P.kind === "select") {
        const ce = P.def.options.find((pe) => pe.value === P.optionValue)?.label ?? P.optionValue;
        return `Editar filtro ${Y}: ${ce}`;
      }
      return `Editar filtro ${Y}`;
    }
    function q(P) {
      return `Añadir filtro ${P.label.replace(/^\+\s*/, "")}`;
    }
    const j = C(() => n.clearLabel);
    function Z(P) {
      if (!d.value || !l.value) return;
      const Y = P.target;
      if (!(l.value.contains(Y) || (Y instanceof Element ? Y : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ce of r.values())
          if (ce?.contains(Y)) return;
        fe();
      }
    }
    function re(P) {
      P.key === "Escape" && d.value && (P.preventDefault(), Q());
    }
    function ue() {
      !d.value || !m.value || ge(m.value);
    }
    return tt(() => {
      document.addEventListener("mousedown", Z, !0), window.addEventListener("keydown", re, !0), window.addEventListener("resize", ue);
    }), si(() => {
      document.removeEventListener("mousedown", Z, !0), window.removeEventListener("keydown", re, !0), window.removeEventListener("resize", ue);
    }), Oe(
      () => n.modelValue,
      () => {
        const P = f.value;
        P && d.value && !s.panel && U(P);
      },
      { deep: !0 }
    ), (P, Y) => (p(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", u2, [
        u("span", h2, D(e.label), 1),
        u("div", f2, [
          (p(!0), k(se, null, he(e.filterDefinitions, (te) => (p(), k("button", {
            key: `pill-${te.id}`,
            ref_for: !0,
            ref: (ce) => _(te.id, ce),
            type: "button",
            class: J(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", V(te)]),
            "aria-label": I(te),
            "aria-expanded": c.value === te.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === te.id ? i : void 0,
            onClick: (ce) => X(te, ce)
          }, [
            E(T(r2), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", m2, D(te.label), 1),
            te.type === "select" && N(te) > 0 ? (p(), k("span", p2, D(N(te)), 1)) : z("", !0)
          ], 10, g2))), 128))
        ])
      ]),
      S.value ? (p(), k("div", b2, [
        u("div", v2, [
          (p(!0), k(se, null, he(F.value, (te) => (p(), k("div", {
            key: te.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": de(te),
              onClick: (ce) => ye(te.def, ce)
            }, [
              Ce(P.$slots, "formatChip", {
                filter: te.def,
                value: w(te.def.id),
                optionValue: te.kind === "select" ? te.optionValue : void 0
              }, () => [
                Be(D(A(te)), 1)
              ], !0)
            ], 8, y2),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": K(te),
              onClick: (ce) => De(te)
            }, [
              E(T(c2), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, x2)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": j.value,
          onClick: R
        }, D(e.clearLabel), 9, _2)
      ])) : z("", !0),
      (p(), ee(En, { to: "body" }, [
        c.value && d.value ? (p(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": H.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: Me(h.value),
          onKeydown: Y[3] || (Y[3] = qe(() => {
          }, ["stop"]))
        }, [
          f.value ? (p(), k(se, { key: 0 }, [
            P.$slots.panel ? Ce(P.$slots, "panel", {
              key: 0,
              filter: f.value,
              close: fe,
              value: x.value,
              updateValue: ae
            }, void 0, !0) : (p(), k("div", w2, [
              f.value.type === "text" ? (p(), k(se, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, D(f.value.label), 9, C2),
                lt(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": Y[0] || (Y[0] = (te) => v.value = te),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: f.value.placeholder ?? "…",
                  onKeydown: Fn(qe(fe, ["prevent"]), ["enter"])
                }, null, 40, $2), [
                  [sn, v.value]
                ])
              ], 64)) : f.value.type === "select" ? (p(), k(se, { key: 1 }, [
                u("p", S2, D(f.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": f.value.label,
                  "aria-multiselectable": !0
                }, [
                  (p(!0), k(se, null, he(f.value.options, (te) => (p(), k("li", {
                    key: te.value
                  }, [
                    u("label", D2, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(te.value),
                        onChange: (ce) => ne(te.value)
                      }, null, 40, T2),
                      u("span", A2, D(te.label), 1)
                    ])
                  ]))), 128))
                ], 8, M2)
              ], 64)) : f.value.type === "dateRange" ? (p(), k(se, { key: 2 }, [
                u("p", B2, D(f.value.label), 1),
                u("div", L2, [
                  u("div", P2, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, I2),
                    lt(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": Y[1] || (Y[1] = (te) => y.value = te),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, R2), [
                      [sn, y.value]
                    ])
                  ]),
                  u("div", E2, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, F2),
                    lt(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": Y[2] || (Y[2] = (te) => b.value = te),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, O2), [
                      [sn, b.value]
                    ])
                  ])
                ])
              ], 64)) : z("", !0)
            ]))
          ], 64)) : z("", !0)
        ], 44, k2)) : z("", !0)
      ]))
    ], 8, d2));
  }
}), z2 = /* @__PURE__ */ me(V2, [["__scopeId", "data-v-f38e0100"]]), N2 = { class: "font-sans" }, H2 = ["for"], W2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], j2 = ["id"], K2 = /* @__PURE__ */ le({
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
    errorText: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = ka(), o = oi("$pcForm", null), i = `kiut-input-text-${Ue()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? s.name ?? ""), d = oe(n.modelValue ?? "");
    Oe(
      () => n.modelValue,
      (f) => {
        d.value = f ?? "";
      }
    ), tt(() => {
      o && c.value && o.register?.(c.value, {});
    }), pt(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const h = C(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? d.value : d.value), m = C(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function v(f) {
      const x = f.target.value;
      d.value = x, a("update:modelValue", x);
      const _ = o?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(f);
    }
    function g(f) {
      const x = o?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(f);
    }
    function y(f) {
      const x = o?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(f);
    }
    const b = C(() => {
      const { name: f, id: x, type: _, ...w } = s;
      return w;
    });
    return (f, x) => (p(), k("div", N2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: J(T(ct))
      }, D(e.label), 11, H2)) : z("", !0),
      u("input", Ct(b.value, {
        id: l.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [T(mt), m.value ? T(Rt) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": m.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r.value : void 0,
        onInput: v,
        onChange: g,
        onBlur: y
      }), null, 16, W2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: J(T(Mt)),
        role: "alert"
      }, D(e.errorText), 11, j2)) : z("", !0)
    ]));
  }
}), Y2 = { class: "font-sans" }, U2 = ["for"], q2 = { class: "relative" }, X2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], G2 = ["aria-label"], Z2 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Q2 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, J2 = ["id"], ew = /* @__PURE__ */ le({
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
    const n = e, a = t, s = ka(), o = oi("$pcForm", null), i = `kiut-input-password-${Ue()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? s.name ?? ""), d = oe(!1), h = oe(n.modelValue ?? "");
    Oe(
      () => n.modelValue,
      (x) => {
        x !== void 0 && x !== h.value && (h.value = x);
      }
    ), tt(() => {
      o && c.value && o.register?.(c.value, {});
    }), pt(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const m = C(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? h.value : h.value), v = C(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function g(x) {
      const _ = x.target.value;
      h.value = _, a("update:modelValue", _);
      const w = o?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(x);
    }
    function y(x) {
      const _ = o?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(x);
    }
    function b(x) {
      const _ = o?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(x);
    }
    const f = C(() => {
      const { name: x, id: _, ...w } = s;
      return w;
    });
    return (x, _) => (p(), k("div", Y2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: J(T(ct))
      }, D(e.label), 11, U2)) : z("", !0),
      u("div", q2, [
        u("input", Ct(f.value, {
          id: l.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [T(mt), v.value ? T(Rt) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: m.value,
          "aria-invalid": v.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: g,
          onChange: y,
          onBlur: b
        }), null, 16, X2),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (p(), k("svg", Q2, [..._[2] || (_[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (p(), k("svg", Z2, [..._[1] || (_[1] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            }, null, -1),
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            }, null, -1)
          ])]))
        ], 8, G2)
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: J(T(Mt)),
        role: "alert"
      }, D(e.errorText), 11, J2)) : z("", !0)
    ]));
  }
}), tw = { class: "font-sans" }, nw = ["for"], aw = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], sw = ["id"], ow = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-textarea-${Ue()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C({
      get: () => n.modelValue,
      set: (r) => a("update:modelValue", r)
    });
    return (r, c) => (p(), k("div", tw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(ct))
      }, D(e.label), 11, nw)) : z("", !0),
      lt(u("textarea", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => l.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: J([T(ry), e.invalid ? T(Rt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, aw), [
        [sn, l.value]
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(Mt)),
        role: "alert"
      }, D(e.errorText), 11, sw)) : z("", !0)
    ]));
  }
}), iw = { class: "font-sans" }, lw = ["for"], rw = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], cw = ["for"], dw = ["title"], uw = ["aria-label"], hw = ["id"], fw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-file-${Ue()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = oe(null), r = C(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const v = h.target.files?.[0] ?? null;
      a("update:modelValue", v);
    }
    function d() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, m) => (p(), k("div", iw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(ct))
      }, D(e.label), 11, lw)) : z("", !0),
      u("div", {
        class: J([
          T(mt),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(Rt) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        u("input", {
          id: o.value,
          ref_key: "fileInputRef",
          ref: l,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          name: e.name,
          accept: e.accept,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onChange: c
        }, null, 40, rw),
        u("label", {
          for: o.value,
          class: J(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          E(T(Am), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Be(" " + D(e.chooseLabel), 1)
        ], 10, cw),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: r.value || void 0
        }, D(r.value), 9, dw),
        e.modelValue && !e.disabled ? (p(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          E(T(sl), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, uw)) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(Mt)),
        role: "alert"
      }, D(e.errorText), 11, hw)) : z("", !0)
    ]));
  }
}), gw = { class: "font-sans" }, mw = ["for"], pw = { class: "relative" }, bw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], vw = ["id"], yw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-datetime-${Ue()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C(() => n.modelValue ?? "");
    function r(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (p(), k("div", gw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(ct))
      }, D(e.label), 11, mw)) : z("", !0),
      u("div", pw, [
        E(T(ks), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: J([
            T(mt),
            "pl-10",
            e.invalid ? T(Rt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: r
        }, null, 42, bw)
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(Mt)),
        role: "alert"
      }, D(e.errorText), 11, vw)) : z("", !0)
    ]));
  }
}), xw = { class: "font-sans" }, _w = ["for"], kw = { class: "relative" }, ww = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Cw = ["id"], $w = /* @__PURE__ */ le({
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
    function n(h) {
      const m = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!m) return null;
      const v = Number(m[1]), g = Number(m[2]);
      return !Number.isInteger(v) || !Number.isInteger(g) || v < 0 || v > 23 || g < 0 || g > 59 ? null : `${String(v).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${Ue()}`, l = C(() => s.id ?? i), r = C(() => `${l.value}-err`), c = C(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function d(h) {
      const m = h.target.value;
      o("update:modelValue", a(m));
    }
    return (h, m) => (p(), k("div", xw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: J(T(ct))
      }, D(e.label), 11, _w)) : z("", !0),
      u("div", kw, [
        E(T(Lm), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: J([
            T(mt),
            "pl-10",
            e.invalid ? T(Rt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: d
        }, null, 42, ww)
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: J(T(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Cw)) : z("", !0)
    ]));
  }
}), Sw = { class: "font-sans" }, Mw = ["for"], Dw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Tw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], Aw = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Bw = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Lw = { class: "min-w-0 text-left leading-snug" }, Pw = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, Iw = { class: "min-w-0 text-right leading-snug" }, Rw = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Ew = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Fw = ["id"], Ow = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-range-${Ue()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C(() => {
      const v = [];
      return n.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), r = C(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = C(() => !!(n.captionMin || n.captionMax)), d = C(() => {
      const { min: v, max: g, modelValue: y } = n;
      if (g === v) return 0;
      const b = (y - v) / (g - v);
      return Math.min(100, Math.max(0, b * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function m(v) {
      const g = Number(v.target.value);
      a("update:modelValue", Number.isNaN(g) ? n.min : g);
    }
    return (v, g) => (p(), k("div", Sw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(ct))
      }, D(e.label), 11, Mw)) : z("", !0),
      u("div", {
        class: J(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (p(), k("p", Dw, D(e.captionMax), 1)) : z("", !0),
        u("div", {
          class: J(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: Me(h.value)
        }, [
          u("input", {
            id: o.value,
            type: "range",
            value: e.modelValue,
            min: e.min,
            max: e.max,
            step: e.step,
            disabled: e.disabled,
            "aria-orientation": e.orientation,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": l.value,
            class: J([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: m
          }, null, 42, Tw)
        ], 6),
        e.orientation === "horizontal" && r.value ? (p(), k("p", Aw, D(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (p(), k("div", Bw, [
          u("span", Lw, D(e.captionMin), 1),
          u("span", Pw, D(e.caption), 1),
          u("span", Iw, D(e.captionMax), 1)
        ])) : z("", !0),
        e.orientation === "vertical" && e.captionMin ? (p(), k("p", Rw, D(e.captionMin), 1)) : z("", !0),
        e.orientation === "vertical" && e.caption ? (p(), k("p", Ew, D(e.caption), 1)) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Fw)) : z("", !0)
    ]));
  }
}), Vw = /* @__PURE__ */ me(Ow, [["__scopeId", "data-v-a1343418"]]), zw = { class: "font-sans" }, Nw = ["for"], Hw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Ww = ["id"], jw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-number-${Ue()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), r = C(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function c(d) {
      const h = d.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const m = Number(h);
      a("update:modelValue", Number.isNaN(m) ? null : m);
    }
    return (d, h) => (p(), k("div", zw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(ct))
      }, D(e.label), 11, Nw)) : z("", !0),
      u("input", {
        id: o.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: J([
          T(mt),
          e.invalid ? T(Rt) : "",
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
      }, null, 42, Hw),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Ww)) : z("", !0)
    ]));
  }
}), Kw = { class: "font-sans" }, Yw = ["for"], Uw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], qw = ["disabled"], Xw = ["id"], Gw = "#3b82f6", Zw = "#aabbcc", Qw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Jw = /* @__PURE__ */ le({
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
    function n(g) {
      const y = g.trim(), b = /^#?([0-9a-fA-F]{6})$/.exec(y);
      if (b) return `#${b[1].toLowerCase()}`;
      const f = /^#?([0-9a-fA-F]{3})$/.exec(y);
      if (f) {
        const [x, _, w] = f[1].split("");
        return `#${x}${x}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(g) {
      return n(g) ?? Gw;
    }
    const s = e, o = t, i = `kiut-input-color-${Ue()}`, l = C(() => s.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a(s.modelValue)), d = oe(c.value), h = oe(!1);
    Oe(c, (g) => {
      h.value || (d.value = g);
    });
    function m(g) {
      const y = g.target, b = n(y.value);
      b && o("update:modelValue", b);
    }
    function v() {
      h.value = !1;
      const g = n(d.value);
      g ? (d.value = g, o("update:modelValue", g)) : d.value = c.value;
    }
    return Oe(d, (g) => {
      if (!h.value) return;
      const y = n(g);
      y && o("update:modelValue", y);
    }), (g, y) => (p(), k("div", Kw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: J(T(ct))
      }, D(e.label), 11, Yw)) : z("", !0),
      u("div", {
        class: J([
          Qw,
          e.invalid ? T(Rt) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        u("input", {
          id: l.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: m
        }, null, 40, Uw),
        e.showHexInput ? lt((p(), k("input", {
          key: 0,
          "onUpdate:modelValue": y[0] || (y[0] = (b) => d.value = b),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Zw,
          onFocus: y[1] || (y[1] = (b) => h.value = !0),
          onBlur: v
        }, null, 40, qw)), [
          [sn, d.value]
        ]) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: J(T(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Xw)) : z("", !0)
    ]));
  }
}), e5 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], t5 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, n5 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, a5 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, s5 = { class: "truncate" }, o5 = ["aria-selected", "onClick", "onMouseenter"], i5 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, l5 = { class: "min-w-0 flex-1" }, r5 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-multiselect-${Ue()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, r = oe(null), c = oe(null), d = oe(!1), h = oe(0), m = C(() => n.options.filter((O) => !O.disabled)), v = C(() => new Set(n.modelValue ?? [])), g = C(
      () => n.options.filter((O) => v.value.has(O.value))
    ), y = C(() => {
      const O = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", A = g.value.length;
      return A === 0 ? O : `${O}, ${A} seleccionada${A === 1 ? "" : "s"}`;
    });
    function b(O) {
      return `${String(O.value)}-${O.label}`;
    }
    function f(O) {
      return v.value.has(O.value);
    }
    function x(O, A) {
      const L = f(O), V = h.value === A;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        L ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !L && V ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function _(O) {
      const A = [...n.modelValue ?? []], L = A.indexOf(O.value);
      L >= 0 ? A.splice(L, 1) : A.push(O.value), a("update:modelValue", A);
    }
    function w() {
      const O = m.value;
      if (O.length === 0) {
        h.value = 0;
        return;
      }
      const A = v.value, L = O.findIndex((V) => A.has(V.value));
      h.value = L >= 0 ? L : 0;
    }
    function $() {
      n.disabled || (d.value = !d.value);
    }
    function M(O) {
      O.stopPropagation(), !n.disabled && ($(), d.value && (w(), We(() => c.value?.focus())));
    }
    function S(O) {
      if (!d.value) return;
      const A = r.value;
      A && !A.contains(O.target) && (d.value = !1);
    }
    function F(O) {
      n.disabled || (O.key === "ArrowDown" || O.key === "Enter" || O.key === " ") && (O.preventDefault(), d.value || (d.value = !0, w(), We(() => c.value?.focus())));
    }
    function N(O) {
      const A = m.value;
      if (A.length !== 0) {
        if (O.key === "Escape") {
          O.preventDefault(), d.value = !1;
          return;
        }
        if (O.key === "ArrowDown") {
          O.preventDefault(), h.value = Math.min(h.value + 1, A.length - 1);
          return;
        }
        if (O.key === "ArrowUp") {
          O.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (O.key === "Enter" || O.key === " ") {
          O.preventDefault();
          const L = A[h.value];
          L && _(L);
        }
      }
    }
    return tt(() => {
      document.addEventListener("click", S);
    }), pt(() => {
      document.removeEventListener("click", S);
    }), (O, A) => (p(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: J(T(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: J([
          T(mt),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: M,
        onKeydown: F
      }, [
        u("div", t5, [
          g.value.length === 0 ? (p(), k("span", n5, D(e.placeholder), 1)) : (p(), k("div", a5, [
            (p(!0), k(se, null, he(g.value, (L) => (p(), k("span", {
              key: b(L),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", s5, D(L.label), 1)
            ]))), 128))
          ]))
        ]),
        E(T(Da), {
          class: J(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, e5),
      lt(u("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: qe(N, ["stop"])
      }, [
        (p(!0), k(se, null, he(m.value, (L, V) => (p(), k("li", {
          key: b(L),
          role: "option",
          "aria-selected": f(L),
          class: J(x(L, V)),
          onClick: qe((I) => _(L), ["stop"]),
          onMouseenter: (I) => h.value = V
        }, [
          u("span", i5, [
            f(L) ? (p(), ee(T(cl), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : z("", !0)
          ]),
          u("span", l5, D(L.label), 1)
        ], 42, o5))), 128))
      ], 544), [
        [bn, d.value]
      ])
    ], 512));
  }
}), c5 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], d5 = { class: "sr-only" }, u5 = /* @__PURE__ */ le({
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
    const n = e, a = t;
    function s() {
      n.disabled || a("update:modelValue", !n.modelValue);
    }
    return (o, i) => (p(), k("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: J([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: s,
      onKeydown: [
        Fn(qe(s, ["prevent", "stop"]), ["space"]),
        Fn(qe(s, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: J(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", d5, D(e.ariaLabel), 1)
    ], 42, c5));
  }
}), h5 = { class: "font-sans" }, f5 = ["for"], g5 = { class: "flex gap-2" }, m5 = { class: "w-[7.5rem] shrink-0" }, p5 = { class: "min-w-0 flex-1" }, b5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], v5 = ["id"], y5 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-phone-${Ue()}`, o = C(() => n.id ?? `${s}-num`), i = C(() => `${o.value}-err`), l = C({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), r = C({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (p(), k("div", h5, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: J(T(ct))
      }, D(e.label), 11, f5)) : z("", !0),
      u("div", g5, [
        u("div", m5, [
          E(ws, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", p5, [
          lt(u("input", {
            id: o.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => r.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: J([T(mt), e.invalid ? T(Rt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, b5), [
            [sn, r.value]
          ])
        ])
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: J(T(Mt)),
        role: "alert"
      }, D(e.errorText), 11, v5)) : z("", !0)
    ]));
  }
}), x5 = ["role", "aria-label"], _5 = { class: "flex flex-wrap gap-2" }, k5 = ["aria-checked", "role", "onClick"], w5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, C5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, $5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, S5 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = C(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function o(r) {
      return n.multiple ? s.value.includes(r.value) : n.modelValue === r.value;
    }
    function i(r) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(r) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function l(r) {
      if (n.multiple) {
        const c = Array.isArray(n.modelValue) ? [...n.modelValue] : [], d = c.indexOf(r.value);
        d >= 0 ? c.splice(d, 1) : c.push(r.value), a("update:modelValue", c);
        return;
      }
      a("update:modelValue", r.value);
    }
    return (r, c) => (p(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", _5, [
        (p(!0), k(se, null, he(e.items, (d) => (p(), k("button", {
          key: d.value,
          type: "button",
          class: J(i(d)),
          "aria-checked": o(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          u("span", w5, [
            o(d) ? (p(), k("span", C5)) : z("", !0)
          ]),
          d.dotColor ? (p(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: Me({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", $5, D(d.label), 1)
        ], 10, k5))), 128))
      ])
    ], 8, x5));
  }
}), M5 = ["aria-label"], D5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], T5 = { class: "truncate px-3 py-2 text-sm font-medium" }, A5 = /* @__PURE__ */ le({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${Ue()}`, o = (y) => `${s}-seg-${y}`, i = oe([]);
    function l(y, b) {
      y instanceof HTMLButtonElement ? i.value[b] = y : i.value[b] = null;
    }
    function r(y) {
      return y.value === n.modelValue;
    }
    function c(y) {
      const b = r(y), f = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return y.disabled ? `${f} cursor-not-allowed opacity-40` : b ? `${f} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${f} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(y) {
      y.disabled || y.value !== n.modelValue && a("update:modelValue", y.value);
    }
    function h(y, b, f) {
      d(y), We(() => i.value[b]?.focus());
    }
    const m = C(
      () => n.items.map((y, b) => y.disabled ? -1 : b).filter((y) => y >= 0)
    );
    function v(y, b) {
      const f = n.items.length;
      if (f === 0) return 0;
      let x = y;
      for (let _ = 0; _ < f; _++)
        if (x = (x + b + f) % f, !n.items[x]?.disabled) return x;
      return y;
    }
    function g(y, b) {
      if (y.key === "ArrowRight" || y.key === "ArrowDown") {
        y.preventDefault();
        const f = v(b, 1), x = n.items[f];
        x && d(x), We(() => i.value[f]?.focus());
      } else if (y.key === "ArrowLeft" || y.key === "ArrowUp") {
        y.preventDefault();
        const f = v(b, -1), x = n.items[f];
        x && d(x), We(() => i.value[f]?.focus());
      } else if (y.key === "Home") {
        y.preventDefault();
        const f = m.value[0];
        if (f !== void 0) {
          const x = n.items[f];
          x && d(x), We(() => i.value[f]?.focus());
        }
      } else if (y.key === "End") {
        y.preventDefault();
        const f = m.value[m.value.length - 1];
        if (f !== void 0) {
          const x = n.items[f];
          x && d(x), We(() => i.value[f]?.focus());
        }
      }
    }
    return (y, b) => (p(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (p(!0), k(se, null, he(e.items, (f, x) => (p(), k("button", {
        id: o(f.value),
        key: f.value,
        ref_for: !0,
        ref: (_) => l(_, x),
        type: "button",
        role: "tab",
        "aria-selected": r(f),
        "aria-disabled": f.disabled === !0,
        tabindex: r(f) ? 0 : -1,
        class: J(c(f)),
        onClick: (_) => h(f, x),
        onKeydown: (_) => g(_, x)
      }, [
        u("span", T5, D(f.label), 1)
      ], 42, D5))), 128))
    ], 8, M5));
  }
}), B5 = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, L5 = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, P5 = {
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
}, I5 = {
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
}, R5 = [
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
function E5(e = "en") {
  return B5[e];
}
function bl(e = "en") {
  return R5.map((t) => ({ id: t, label: I5[e][t] }));
}
function F5(e = "en") {
  return "Presets";
}
bl("es");
function Ze(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function ot(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function ze(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Pt(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Yn(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function O5(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return ze(n);
}
function Dn(e, t) {
  return O5(e, -t);
}
function V5(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function vl(e, t = /* @__PURE__ */ new Date()) {
  const n = ze(t);
  switch (e) {
    case "today":
      return { start: n, end: n };
    case "yesterday": {
      const a = Dn(n, 1);
      return { start: a, end: a };
    }
    case "last7":
      return { start: Dn(n, 6), end: n };
    case "last14":
      return { start: Dn(n, 13), end: n };
    case "last30":
      return { start: Dn(n, 29), end: n };
    case "last90":
      return { start: Dn(n, 89), end: n };
    case "thisMonth":
      return { start: Pt(n), end: n };
    case "lastMonth": {
      const a = Pt(Yn(n, -1));
      return { start: a, end: V5(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function yl(e, t, n) {
  let a = ze(e.start), s = ze(e.end);
  if (t) {
    const o = ze(Ze(t));
    Kt(a, o) && (a = o), Kt(s, o) && (s = o);
  }
  if (n) {
    const o = ze(Ze(n));
    ja(a, o) && (a = o), ja(s, o) && (s = o);
  }
  return ja(a, s) ? { start: s, end: a } : { start: a, end: s };
}
function z5(e, t, n = /* @__PURE__ */ new Date(), a, s) {
  if (!e.start || !e.end) return !1;
  const o = yl(vl(t, n), a, s);
  return ot(o.start) === e.start && ot(o.end) === e.end;
}
function qn(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Ht(e, t) {
  return qn(e, t) === 0;
}
function Kt(e, t) {
  return qn(e, t) < 0;
}
function ja(e, t) {
  return qn(e, t) > 0;
}
function xl(e, t) {
  return qn(e, t) >= 0;
}
function _l(e, t) {
  return qn(e, t) <= 0;
}
function kl(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
function _a(e, t = "en") {
  return `${L5[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Wt(e, t = "en") {
  return `${P5[t][e.getMonth()]} ${e.getFullYear()}`;
}
const N5 = ["aria-expanded", "aria-labelledby", "aria-label"], H5 = ["onKeydown"], W5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, j5 = { class: "mb-4 flex items-center justify-between gap-2" }, K5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, Y5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, U5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, q5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, X5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, G5 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, Z5 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, Q5 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, J5 = ["disabled", "onClick"], eC = "rounded-lg text-[#61616b]", tC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", nC = "opacity-30", aC = "bg-[#6b35e9] font-medium text-white", sC = "bg-[#895af6] font-semibold text-white", oC = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `${`kiut-drp-${Ue()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), d = oe(Pt(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), m = C(() => {
      const A = Pt(d.value);
      return [A, Yn(A, 1)];
    }), v = C(() => n.ariaLabel ?? n.placeholder), g = C(() => {
      const A = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${A}` : `left-0 right-auto ${A}`;
    }), y = C(
      () => `${Wt(m.value[0])} – ${Wt(m.value[1])}`
    ), b = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], f = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const A = Ze(n.modelValue.start), L = Ze(n.modelValue.end);
      return `${_a(A)} – ${_a(L)}`;
    });
    function x(A, L) {
      return A.getMonth() === L.getMonth() && A.getFullYear() === L.getFullYear();
    }
    function _(A) {
      const L = ze(A);
      if (n.minDate) {
        const V = ze(Ze(n.minDate));
        if (Kt(L, V)) return !0;
      }
      if (n.maxDate) {
        const V = ze(Ze(n.maxDate));
        if (Kt(V, L)) return !0;
      }
      return !1;
    }
    function w(A, L, V) {
      const I = Ht(A, L), U = Ht(A, V);
      if (I && U) return "rounded-lg";
      const G = I || A.getDay() === 0, ne = U || A.getDay() === 6;
      return G && ne ? "rounded-lg" : G ? "rounded-l-lg" : ne ? "rounded-r-lg" : "rounded-none";
    }
    function $(A, L) {
      const V = x(L, A), I = _(L), U = n.modelValue.start ? ze(Ze(n.modelValue.start)) : null, G = n.modelValue.end ? ze(Ze(n.modelValue.end)) : null, ne = ze(L);
      if (I)
        return eC;
      let ge = tC;
      if (U && G && xl(ne, U) && _l(ne, G)) {
        const X = Ht(ne, U), W = Ht(ne, G);
        ge = `${w(ne, U, G)} ${X || W ? sC : aC}`;
      }
      return V || (ge = `${ge} ${nC}`), ge;
    }
    function M(A) {
      if (_(A)) return;
      const L = ze(A);
      if (!c.value) {
        c.value = new Date(L), a("update:modelValue", { start: ot(L), end: ot(L) });
        return;
      }
      let I = ze(c.value), U = new Date(L);
      Kt(U, I) && ([I, U] = [U, I]), a("update:modelValue", { start: ot(I), end: ot(U) }), c.value = null, r.value = !1;
    }
    function S(A) {
      d.value = Yn(d.value, A);
    }
    function F() {
      r.value = !1;
    }
    function N(A) {
      if (A?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, n.modelValue.start)
          try {
            d.value = Pt(Ze(n.modelValue.start));
          } catch {
          }
        We(() => l.value?.focus());
      }
    }
    function O(A) {
      if (!r.value) return;
      const L = i.value;
      L && !L.contains(A.target) && (r.value = !1);
    }
    return Oe(r, (A) => {
      A && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", O);
    }), pt(() => {
      document.removeEventListener("click", O);
    }), (A, L) => (p(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: J(T(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: J([
          T(mt),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onFocus: N,
        onClick: N
      }, [
        E(T(ks), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, D(f.value), 3)
      ], 42, N5),
      lt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: J([
          g.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Fn(qe(F, ["stop"]), ["escape"])
      }, [
        u("div", W5, [
          u("div", j5, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: L[0] || (L[0] = (V) => S(-1))
            }, [
              E(T(nl), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", K5, [
              u("span", Y5, D(y.value), 1),
              u("div", U5, [
                u("span", q5, D(T(Wt)(m.value[0])), 1),
                u("span", X5, D(T(Wt)(m.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: L[1] || (L[1] = (V) => S(1))
            }, [
              E(T(al), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", G5, [
            (p(!0), k(se, null, he(m.value, (V) => (p(), k("div", {
              key: `${V.getFullYear()}-${V.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", Z5, [
                (p(), k(se, null, he(b, (I) => u("span", { key: I }, D(I), 1)), 64))
              ]),
              u("div", Q5, [
                (p(!0), k(se, null, he(T(kl)(V), (I) => (p(), k("button", {
                  key: T(ot)(I),
                  type: "button",
                  disabled: _(I),
                  class: J(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(V, I)]),
                  onClick: (U) => M(I)
                }, D(I.getDate()), 11, J5))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, H5), [
        [bn, r.value]
      ])
    ], 512));
  }
}), iC = ["aria-expanded", "aria-labelledby", "aria-label"], lC = ["aria-label", "onKeydown"], rC = { class: "flex flex-col sm:flex-row" }, cC = ["aria-label"], dC = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, uC = { class: "flex flex-col gap-0.5" }, hC = ["onClick"], fC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, gC = { class: "mb-4 flex items-center justify-between gap-2" }, mC = ["aria-label"], pC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, bC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, vC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, yC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, xC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, _C = ["aria-label"], kC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, wC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, CC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, $C = ["disabled", "onClick"], SC = "rounded-lg text-[#61616b]", MC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", DC = "opacity-30", TC = "bg-[#6b35e9] font-medium text-white", AC = "bg-[#895af6] font-semibold text-white", BC = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `${`kiut-dpp-${Ue()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), d = oe(Pt(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), m = C(() => {
      const X = Pt(d.value);
      return [X, Yn(X, 1)];
    }), v = C(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = C(() => n.ariaLabel ?? v.value), y = C(() => bl(n.locale)), b = C(() => F5(n.locale)), f = C(() => E5(n.locale)), x = C(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = C(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), M = C(() => {
      const X = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${X}` : `left-0 right-auto ${X}`;
    }), S = C(
      () => `${Wt(m.value[0], n.locale)} – ${Wt(m.value[1], n.locale)}`
    ), F = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return v.value;
      const X = Ze(n.modelValue.start), W = Ze(n.modelValue.end);
      return `${_a(X, n.locale)} – ${_a(W, n.locale)}`;
    });
    function N(X, W) {
      return X.getMonth() === W.getMonth() && X.getFullYear() === W.getFullYear();
    }
    function O(X) {
      const W = ze(X);
      if (n.minDate) {
        const Q = ze(Ze(n.minDate));
        if (Kt(W, Q)) return !0;
      }
      if (n.maxDate) {
        const Q = ze(Ze(n.maxDate));
        if (Kt(Q, W)) return !0;
      }
      return !1;
    }
    function A(X, W, Q) {
      const ae = Ht(X, W), fe = Ht(X, Q);
      if (ae && fe) return "rounded-lg";
      const we = ae || X.getDay() === 0, De = fe || X.getDay() === 6;
      return we && De ? "rounded-lg" : we ? "rounded-l-lg" : De ? "rounded-r-lg" : "rounded-none";
    }
    function L(X) {
      const W = z5(
        n.modelValue,
        X,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), Q = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return W ? `${Q} font-medium` : Q;
    }
    function V(X, W) {
      const Q = N(W, X), ae = O(W), fe = n.modelValue.start ? ze(Ze(n.modelValue.start)) : null, we = n.modelValue.end ? ze(Ze(n.modelValue.end)) : null, De = ze(W);
      if (ae)
        return SC;
      let R = MC;
      if (fe && we && xl(De, fe) && _l(De, we)) {
        const K = Ht(De, fe), de = Ht(De, we);
        R = `${A(De, fe, we)} ${K || de ? AC : TC}`;
      }
      return Q || (R = `${R} ${DC}`), R;
    }
    function I(X) {
      const W = yl(vl(X), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: ot(W.start),
        end: ot(W.end)
      }), d.value = Pt(W.start), c.value = null, r.value = !1;
    }
    function U(X) {
      if (O(X)) return;
      const W = ze(X);
      if (!c.value) {
        c.value = new Date(W), a("update:modelValue", { start: ot(W), end: ot(W) });
        return;
      }
      let ae = ze(c.value), fe = new Date(W);
      Kt(fe, ae) && ([ae, fe] = [fe, ae]), a("update:modelValue", { start: ot(ae), end: ot(fe) }), c.value = null, r.value = !1;
    }
    function G(X) {
      d.value = Yn(d.value, X);
    }
    function ne() {
      r.value = !1;
    }
    function ge(X) {
      if (X.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, n.modelValue.start)
        try {
          d.value = Pt(Ze(n.modelValue.start));
        } catch {
        }
      We(() => l.value?.focus());
    }
    function ye(X) {
      if (!r.value) return;
      const W = i.value;
      W && !W.contains(X.target) && (r.value = !1);
    }
    return Oe(r, (X) => {
      X && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", ye);
    }), pt(() => {
      document.removeEventListener("click", ye);
    }), (X, W) => (p(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: J(T(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: J([
          T(mt),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: ge
      }, [
        E(T(ks), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, D(F.value), 3)
      ], 10, iC),
      lt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: J([
          M.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Fn(qe(ne, ["stop"]), ["escape"])
      }, [
        u("div", rC, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": x.value
          }, [
            u("p", dC, D(b.value), 1),
            u("ul", uC, [
              (p(!0), k(se, null, he(y.value, (Q) => (p(), k("li", {
                key: Q.id
              }, [
                u("button", {
                  type: "button",
                  class: J(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", L(Q.id)]),
                  onClick: (ae) => I(Q.id)
                }, D(Q.label), 11, hC)
              ]))), 128))
            ])
          ], 8, cC),
          u("div", fC, [
            u("div", gC, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: W[0] || (W[0] = (Q) => G(-1))
              }, [
                E(T(nl), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, mC),
              u("div", pC, [
                u("span", bC, D(S.value), 1),
                u("div", vC, [
                  u("span", yC, D(T(Wt)(m.value[0], e.locale)), 1),
                  u("span", xC, D(T(Wt)(m.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: W[1] || (W[1] = (Q) => G(1))
              }, [
                E(T(al), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, _C)
            ]),
            u("div", kC, [
              (p(!0), k(se, null, he(m.value, (Q) => (p(), k("div", {
                key: `${Q.getFullYear()}-${Q.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", wC, [
                  (p(!0), k(se, null, he(f.value, (ae) => (p(), k("span", { key: ae }, D(ae), 1))), 128))
                ]),
                u("div", CC, [
                  (p(!0), k(se, null, he(T(kl)(Q), (ae) => (p(), k("button", {
                    key: T(ot)(ae),
                    type: "button",
                    disabled: O(ae),
                    class: J(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", V(Q, ae)]),
                    onClick: (fe) => U(ae)
                  }, D(ae.getDate()), 11, $C))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, lC), [
        [bn, r.value]
      ])
    ], 512));
  }
}), ti = /* @__PURE__ */ le({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (a, s) => (p(), k("svg", {
      class: J(["inline-flex shrink-0 animate-spin", n.value]),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2.5",
      "stroke-linecap": "round",
      "aria-hidden": "true"
    }, [...s[0] || (s[0] = [
      u("circle", {
        cx: "12",
        cy: "12",
        r: "10",
        "stroke-opacity": "0.25"
      }, null, -1),
      u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
    ])], 2));
  }
}), LC = ["disabled", "aria-expanded", "aria-label"], PC = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, IC = { class: "min-w-0 truncate" }, RC = ["disabled", "onClick", "onMouseenter"], EC = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, FC = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, OC = { class: "min-w-0 flex-1 text-left" }, VC = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, zC = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, NC = ["disabled", "aria-expanded", "aria-label"], HC = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, WC = ["disabled", "onClick", "onMouseenter"], jC = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, KC = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, YC = { class: "min-w-0 flex-1 text-left" }, UC = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, qC = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, XC = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, GC = ["type", "disabled", "aria-busy", "aria-label"], ZC = {
  key: 2,
  class: "min-w-0 truncate"
}, QC = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, JC = ["type", "disabled", "aria-busy", "aria-label"], e$ = {
  key: 2,
  class: "min-w-0 truncate"
}, ha = /* @__PURE__ */ le({
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
    const n = e, a = t, s = ka(), o = C(
      () => !!n.tooltip?.trim() && n.variant !== "dropdown" && n.variant !== "split"
    ), i = C(() => n.variant === "dropdown"), l = C(() => n.variant === "split"), r = C(() => n.variant === "action"), c = C(() => !r.value && !l.value), d = C(() => n.disabled || n.loading), h = C(
      () => n.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), m = C(() => {
      const W = s["aria-label"];
      if (typeof W == "string" && W.length > 0) return W;
      if ((r.value || l.value) && n.tooltip?.trim()) return n.tooltip.trim();
    }), v = C(() => {
      const W = s.type;
      return W === "submit" || W === "reset" || W === "button" ? W : "button";
    }), g = C(() => {
      const { class: W, type: Q, "aria-label": ae, ...fe } = s;
      return fe;
    }), y = C(() => n.variant === "primary" || n.variant === "dropdown" ? [
      "px-4 py-2.5",
      "bg-[color:var(--kiut-primary)] text-white shadow-sm",
      "hover:bg-[color:var(--kiut-primary-hover)] active:bg-[color:var(--kiut-primary-dark)]",
      "dark:text-white dark:hover:brightness-110 dark:active:brightness-95"
    ] : n.variant === "secondary" ? [
      "px-4 py-2.5",
      "border border-slate-200 bg-slate-50 text-[color:var(--kiut-text-primary)]",
      "hover:border-slate-300 hover:bg-slate-100",
      "active:bg-slate-200/80",
      "dark:border-[color:var(--kiut-border-light)] dark:bg-slate-800/80 dark:text-slate-100",
      "dark:hover:border-white/[0.18] dark:hover:bg-slate-800",
      "dark:active:bg-slate-700/90"
    ] : n.tone === "danger" ? [
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
    ]), b = `kiut-button-menu-${Ue()}`, f = `${b}-btn`, x = `${b}-menu`, _ = oe(null), w = oe(null), $ = oe(null), M = oe(!1), S = oe(0), F = oe({}), N = C(() => n.options.filter((W) => !W.disabled));
    function O(W) {
      return `${W.value}-${W.label}`;
    }
    function A() {
      const W = w.value;
      if (!W) return;
      const Q = W.getBoundingClientRect(), ae = {
        top: `${Q.bottom - 3}px`,
        minWidth: `max(${Q.width}px, ${n.menuMinWidth})`
      };
      n.menuAlign === "right" ? (ae.right = `${window.innerWidth - Q.right}px`, ae.left = "auto") : (ae.left = `${Q.left}px`, ae.right = "auto"), F.value = ae;
    }
    function L(W) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        S.value === W ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function V() {
      M.value = !1;
    }
    function I() {
      A(), S.value = 0, We(() => $.value?.focus());
    }
    function U() {
      if (!n.disabled) {
        if (M.value) {
          V();
          return;
        }
        M.value = !0, I();
      }
    }
    function G(W) {
      W.disabled || (a("select", W), V());
    }
    function ne(W) {
      W.stopPropagation(), U();
    }
    function ge(W) {
      if (!M.value) return;
      const Q = W.target, ae = _.value, fe = $.value;
      ae && !ae.contains(Q) && (!fe || !fe.contains(Q)) && V();
    }
    function ye(W) {
      n.disabled || (W.key === "ArrowDown" || W.key === "Enter" || W.key === " ") && (W.preventDefault(), M.value || (M.value = !0, I()));
    }
    function X(W) {
      const Q = N.value;
      if (W.key === "Escape") {
        W.preventDefault(), V(), w.value?.focus();
        return;
      }
      if (Q.length !== 0) {
        if (W.key === "ArrowDown") {
          W.preventDefault(), S.value = Math.min(S.value + 1, Q.length - 1);
          return;
        }
        if (W.key === "ArrowUp") {
          W.preventDefault(), S.value = Math.max(S.value - 1, 0);
          return;
        }
        if (W.key === "Enter" || W.key === " ") {
          W.preventDefault();
          const ae = Q[S.value];
          ae && G(ae);
        }
      }
    }
    return tt(() => {
      document.addEventListener("click", ge);
    }), pt(() => {
      document.removeEventListener("click", ge);
    }), (W, Q) => i.value ? (p(), k("div", {
      key: 0,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", Ct({
        ref_key: "buttonRef",
        ref: w,
        id: f,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [y.value, T(s).class]],
        disabled: e.disabled,
        "aria-expanded": M.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": m.value
      }, g.value, {
        onClick: ne,
        onKeydown: ye
      }), [
        W.$slots.icon ? (p(), k("span", PC, [
          Ce(W.$slots, "icon")
        ])) : z("", !0),
        u("span", IC, [
          Ce(W.$slots, "default")
        ]),
        E(T(Da), {
          class: J(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", M.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, LC),
      (p(), ee(En, { to: "body" }, [
        lt(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Me(F.value),
          onKeydown: qe(X, ["stop"])
        }, [
          (p(!0), k(se, null, he(N.value, (ae, fe) => (p(), k("button", {
            key: O(ae),
            type: "button",
            role: "menuitem",
            disabled: ae.disabled,
            class: J(L(fe)),
            onClick: qe((we) => G(ae), ["stop"]),
            onMouseenter: (we) => S.value = fe
          }, [
            ae.icon ? (p(), k("span", EC, [
              (p(), ee(Ft(ae.icon), { class: "h-5 w-5" }))
            ])) : (p(), k("span", FC)),
            u("span", OC, [
              u("span", VC, D(ae.label), 1),
              ae.description ? (p(), k("span", zC, D(ae.description), 1)) : z("", !0)
            ])
          ], 42, RC))), 128))
        ], 36), [
          [bn, M.value]
        ])
      ]))
    ], 512)) : l.value ? (p(), k("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", Ct({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [y.value, T(s).class]],
        disabled: e.disabled,
        "aria-expanded": M.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": m.value
      }, g.value, {
        onClick: ne,
        onKeydown: ye
      }), [
        W.$slots.icon ? (p(), k("span", HC, [
          Ce(W.$slots, "icon")
        ])) : z("", !0)
      ], 16, NC),
      (p(), ee(En, { to: "body" }, [
        lt(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Me(F.value),
          onKeydown: qe(X, ["stop"])
        }, [
          (p(!0), k(se, null, he(N.value, (ae, fe) => (p(), k("button", {
            key: O(ae),
            type: "button",
            role: "menuitem",
            disabled: ae.disabled,
            class: J(L(fe)),
            onClick: qe((we) => G(ae), ["stop"]),
            onMouseenter: (we) => S.value = fe
          }, [
            ae.icon ? (p(), k("span", jC, [
              (p(), ee(Ft(ae.icon), { class: "h-5 w-5" }))
            ])) : (p(), k("span", KC)),
            u("span", YC, [
              u("span", UC, D(ae.label), 1),
              ae.description ? (p(), k("span", qC, D(ae.description), 1)) : z("", !0)
            ])
          ], 42, WC))), 128))
        ], 36), [
          [bn, M.value]
        ])
      ]))
    ], 512)) : o.value ? (p(), k("span", XC, [
      u("button", Ct({
        type: v.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, y.value, T(s).class]],
        disabled: d.value,
        "aria-busy": e.loading || void 0,
        "aria-label": m.value
      }, g.value), [
        e.loading ? (p(), ee(ti, {
          key: 0,
          compact: r.value
        }, null, 8, ["compact"])) : W.$slots.icon ? (p(), k("span", {
          key: 1,
          class: J(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          Ce(W.$slots, "icon")
        ], 2)) : z("", !0),
        c.value ? (p(), k("span", ZC, [
          Ce(W.$slots, "default")
        ])) : z("", !0)
      ], 16, GC),
      u("span", QC, D(e.tooltip), 1)
    ])) : (p(), k("button", Ct({
      key: 3,
      type: v.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, y.value, T(s).class]],
      disabled: d.value,
      "aria-busy": e.loading || void 0,
      "aria-label": m.value
    }, g.value), [
      e.loading ? (p(), ee(ti, {
        key: 0,
        compact: r.value
      }, null, 8, ["compact"])) : W.$slots.icon ? (p(), k("span", {
        key: 1,
        class: J(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        Ce(W.$slots, "icon")
      ], 2)) : z("", !0),
      c.value ? (p(), k("span", e$, [
        Ce(W.$slots, "default")
      ])) : z("", !0)
    ], 16, JC));
  }
}), t$ = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, n$ = { class: "min-w-0 flex-1 space-y-1" }, a$ = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, s$ = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, o$ = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, i$ = /* @__PURE__ */ le({
  name: "Modal",
  __name: "Modal",
  props: {
    modelValue: { type: Boolean },
    title: {},
    subtitle: {},
    cancelLabel: { default: "Cancelar" },
    confirmLabel: { default: "Guardar" },
    width: { default: 512 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const n = e, a = C(() => ({ maxWidth: `${n.width}px` })), s = t, i = `${`kiut-modal-${Ue()}`}-title`, l = oe(null);
    function r() {
      n.loading || (s("cancel"), s("update:modelValue", !1));
    }
    function c() {
      s("confirm");
    }
    function d(h) {
      if (n.modelValue && h.key === "Escape") {
        if (n.loading) return;
        h.preventDefault(), r();
      }
    }
    return Oe(
      () => n.modelValue,
      (h) => {
        h && requestAnimationFrame(() => {
          l.value?.focus({ preventScroll: !0 });
        });
      }
    ), tt(() => {
      document.addEventListener("keydown", d);
    }), pt(() => {
      document.removeEventListener("keydown", d);
    }), (h, m) => (p(), ee(En, { to: "body" }, [
      E(Te, { name: "kiut-modal" }, {
        default: B(() => [
          e.modelValue ? (p(), k("div", t$, [
            u("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            u("div", {
              ref_key: "panelRef",
              ref: l,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: Me(a.value),
              onClick: m[0] || (m[0] = qe(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: J(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", n$, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, D(e.title), 1),
                  e.subtitle ? (p(), k("p", a$, D(e.subtitle), 1)) : z("", !0)
                ]),
                E(ha, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: r
                }, {
                  icon: B(() => [
                    E(T(sl), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              u("div", s$, [
                Ce(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", o$, [
                E(ha, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: r
                }, {
                  default: B(() => [
                    Be(D(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                E(ha, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: B(() => [
                    Be(D(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ], 4)
          ])) : z("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), l$ = /* @__PURE__ */ me(i$, [["__scopeId", "data-v-1815ac92"]]), r$ = { class: "text-left font-['Inter',system-ui,sans-serif]" }, c$ = {
  key: 0,
  class: ""
}, d$ = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, u$ = { class: "flex min-w-0 flex-1 items-center" }, h$ = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, f$ = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, g$ = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, m$ = /* @__PURE__ */ le({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = es(), n = C(() => {
      const a = !!t.filters, s = !!t.actions;
      return a && s ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (p(), k("section", r$, [
      a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions ? (p(), k("header", c$, [
        a.$slots.description ? (p(), k("div", d$, [
          Ce(a.$slots, "description")
        ])) : z("", !0),
        a.$slots.tabs ? (p(), k("div", {
          key: 1,
          class: J(["flex flex-wrap items-center gap-2", a.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", u$, [
            Ce(a.$slots, "tabs")
          ]),
          a.$slots.actions && !a.$slots.filters ? (p(), k("div", h$, [
            Ce(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0),
        a.$slots.filters || a.$slots.actions && !a.$slots.tabs ? (p(), k("div", {
          key: 2,
          class: J([
            "flex flex-wrap gap-2 items-center",
            a.$slots.tabs ? "mt-2" : "",
            n.value
          ])
        }, [
          a.$slots.filters ? (p(), k("div", f$, [
            Ce(a.$slots, "filters")
          ])) : z("", !0),
          a.$slots.actions ? (p(), k("div", g$, [
            Ce(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0)
      ])) : z("", !0),
      a.$slots.content || a.$slots.default ? (p(), k("div", {
        key: 1,
        class: J({
          "mt-6": a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions
        })
      }, [
        Ce(a.$slots, "content", {}, () => [
          Ce(a.$slots, "default")
        ])
      ], 2)) : z("", !0)
    ]));
  }
}), p$ = { class: "flex flex-1 min-h-0" }, b$ = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, v$ = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, y$ = ["aria-current", "data-has-active", "title", "onClick"], x$ = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, _$ = { class: "px-4 py-4 shrink-0" }, k$ = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, w$ = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, C$ = ["data-nav-id", "aria-current", "onClick"], $$ = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, S$ = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, M$ = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, D$ = ["data-nav-id", "aria-current", "onClick"], T$ = { class: "truncate text-[15px]" }, A$ = ["aria-current", "data-has-active", "onClick"], B$ = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, L$ = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, P$ = /* @__PURE__ */ le({
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
    const n = oe(!1), a = e, s = t, o = ka(), { class: i, ...l } = o, r = oe(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < a.mobileBreakpoint);
    }
    tt(() => {
      c(), window.addEventListener("resize", c);
    }), pt(() => {
      window.removeEventListener("resize", c);
    });
    const d = C(() => {
      const f = a.sections.find((x) => x.id === a.selectedSectionId);
      return f?.items?.length ? f : null;
    });
    function h(f) {
      return a.activePath ? a.activePath === f.path || a.activePath.startsWith(f.path + "/") : !1;
    }
    function m(f) {
      return f.items?.length ? f.items.some(h) : !a.activePath || !f.path ? !1 : a.activePath === f.path || a.activePath.startsWith(f.path + "/");
    }
    function v(f) {
      if (!f.items?.length) {
        s("update:selectedSectionId", null), s("navigate", {
          section: f,
          item: { id: f.id, label: f.label, path: f.path }
        });
        return;
      }
      const x = a.selectedSectionId === f.id ? null : f.id;
      s("update:selectedSectionId", x);
    }
    function g(f, x) {
      s("navigate", { section: f, item: x });
    }
    function y() {
      s("update:selectedSectionId", null);
    }
    function b(f, x) {
      g(f, x), y();
    }
    return (f, x) => r.value ? (p(), k("div", Ct({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      E(Te, { name: "ksn-overlay" }, {
        default: B(() => [
          d.value ? (p(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: y
          })) : z("", !0)
        ]),
        _: 1
      }),
      E(Te, { name: "ksn-sheet" }, {
        default: B(() => [
          d.value ? (p(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: Me({ paddingBottom: a.mobileBarHeight })
          }, [
            x[3] || (x[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", $$, [
              u("p", S$, D(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: y
              }, [...x[2] || (x[2] = [
                u("svg", {
                  class: "w-4 h-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round"
                }, [
                  u("path", { d: "M18 6L6 18M6 6l12 12" })
                ], -1)
              ])])
            ]),
            u("nav", M$, [
              (p(!0), k(se, null, he(d.value.items, (_) => (p(), k("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": h(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => b(d.value, _)
              }, [
                _.icon ? (p(), ee(Ft(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : z("", !0),
                u("span", T$, D(_.label), 1)
              ], 8, D$))), 128))
            ])
          ], 4)) : z("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: Me({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (p(!0), k(se, null, he(e.sections, (_) => (p(), k("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": m(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => v(_)
        }, [
          e.selectedSectionId === _.id || m(_) ? (p(), k("span", B$)) : z("", !0),
          _.icon ? (p(), ee(Ft(_.icon), {
            key: 1,
            class: "shrink-0",
            style: Me({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : z("", !0),
          u("span", L$, D(_.label), 1)
        ], 8, A$))), 128))
      ], 4)
    ], 16)) : (p(), k("aside", Ct({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      u("div", p$, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: Me({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: x[0] || (x[0] = (_) => n.value = !0),
          onMouseleave: x[1] || (x[1] = (_) => n.value = !1)
        }, [
          f.$slots.logo ? (p(), k("div", b$, [
            Ce(f.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : z("", !0),
          u("nav", v$, [
            (p(!0), k(se, null, he(e.sections, (_) => (p(), k("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": m(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => v(_)
            }, [
              _.icon ? (p(), ee(Ft(_.icon), {
                key: 0,
                class: "shrink-0",
                style: Me({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : z("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: Me({ fontSize: e.primaryFontSize })
              }, D(_.label), 5)
            ], 8, y$))), 128))
          ]),
          f.$slots.footer ? (p(), k("div", x$, [
            Ce(f.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : z("", !0)
        ], 36),
        E(Te, { name: "ksn-sub" }, {
          default: B(() => [
            d.value ? (p(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: Me({ width: e.secondaryWidth })
            }, [
              u("div", _$, [
                u("p", k$, D(d.value.label), 1)
              ]),
              u("nav", w$, [
                (p(!0), k(se, null, he(d.value.items, (_) => (p(), k("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": h(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(d.value, _)
                }, [
                  _.icon ? (p(), ee(Ft(_.icon), {
                    key: 0,
                    style: Me({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : z("", !0),
                  u("span", {
                    class: "truncate",
                    style: Me({ fontSize: e.secondaryFontSize })
                  }, D(_.label), 5)
                ], 8, C$))), 128))
              ])
            ], 4)) : z("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), I$ = /* @__PURE__ */ me(P$, [["__scopeId", "data-v-e0ccb96c"]]), W$ = {
  install(e) {
    e.component("KiutChartBar", St), e.component("KiutChartLine", yt), e.component("KiutPieChart", Ma), e.component("KiutBoxplotChart", yf), e.component("KiutCandlestickChart", ig), e.component("KiutHistogramChart", el), e.component("KiutSankeyChart", qt), e.component("KiutAgentsPerDay", Zm), e.component("KiutBookingManager", Bp), e.component("KiutCheckin", ol), e.component("KiutCheckinContainer", C0), e.component("KiutCheckinMetrics", c0), e.component("KiutCheckinSegments", il), e.component("KiutDisruption", W0), e.component("KiutFAQ", Z0), e.component("KiutMessagesPerAgent", cb), e.component("KiutRecordLocator", Db), e.component("KiutSalesByChannel", ll), e.component("KiutSeller", rl), e.component("KiutSellerContainer", pv), e.component("KiutTopAgents", Cv), e.component("KiutPaymentMethod", Yv), e.component("KiutAgentHumanConversations", Py), e.component("KiutChannelMetrics", Wy), e.component("KiutTriageCombinations", s1), e.component("KiutSelectLanguage", u1), e.component("KiutGuardrails", k1), e.component("KiutDisruptionNotifier", W1), e.component("KiutTotalConversationsCard", j1), e.component("KiutCsatP95Card", K1), e.component("KiutCsatPulseCard", Y1), e.component("KiutCSATContainer", Dx), e.component("KiutAiGeneratedRevenueCard", Tx), e.component("KiutCostCard", Bx), e.component("KiutHumanEscalations", zx), e.component("KiutHumanEscalationsCard", Nx), e.component("KiutNpsDailyMetrics", ul), e.component("KiutNpsMetrics", hl), e.component("KiutNpsOverviewMetrics", dl), e.component("KiutAWSCost", Zx), e.component("KiutCostUsage", r_), e.component("KiutTokenUsage", y_), e.component("KiutConversationCount", A_), e.component("KiutTopAgentsAnalysis", W_), e.component("KiutTopAgentsPie", J_), e.component("KiutDailyCostTrends", ck), e.component("KiutModelUsage", Ck), e.component("KiutMessageRoles", Ik), e.component("KiutCostPerConversations", Kk), e.component("Tabs", fl), e.component("Table", l2), e.component("Filters", z2), e.component("InputText", K2), e.component("InputPassword", ew), e.component("InputTextarea", ow), e.component("InputFile", fw), e.component("InputDateTime", yw), e.component("InputTime", $w), e.component("InputRange", Vw), e.component("InputNumber", jw), e.component("InputColorPicker", Jw), e.component("Select", ws), e.component("MultiSelect", r5), e.component("Toggle", u5), e.component("InputPhone", y5), e.component("SelectablePills", S5), e.component("SegmentedControl", A5), e.component("DateRangePicker", oC), e.component("DatePickerPresets", BC), e.component("Tag", Xe), e.component("Button", ha), e.component("Modal", l$), e.component("Section", m$), e.component("KiutAppShellNavigation", I$);
  }
};
export {
  Zx as AWSCost,
  Py as AgentHumanConversations,
  Zm as AgentsPerDay,
  Tx as AiGeneratedRevenueCard,
  I$ as AppShellNavigation,
  Bp as BookingManager,
  yf as BoxplotChart,
  ha as Button,
  Dx as CSATContainer,
  ig as CandlestickChart,
  Wy as ChannelMetrics,
  St as ChartBar,
  yt as ChartLine,
  ol as Checkin,
  C0 as CheckinContainer,
  c0 as CheckinMetrics,
  il as CheckinSegments,
  A_ as ConversationCount,
  Bx as CostCard,
  Kk as CostPerConversations,
  r_ as CostUsage,
  K1 as CsatP95Card,
  Y1 as CsatPulseCard,
  ck as DailyCostTrends,
  BC as DatePickerPresets,
  oC as DateRangePicker,
  W0 as Disruption,
  W1 as DisruptionNotifier,
  Z0 as FAQ,
  z2 as Filters,
  k1 as Guardrails,
  el as HistogramChart,
  zx as HumanEscalations,
  Nx as HumanEscalationsCard,
  Jw as InputColorPicker,
  yw as InputDateTime,
  fw as InputFile,
  jw as InputNumber,
  ew as InputPassword,
  y5 as InputPhone,
  Vw as InputRange,
  K2 as InputText,
  ow as InputTextarea,
  $w as InputTime,
  W$ as KiutUIPlugin,
  Ik as MessageRoles,
  cb as MessagesPerAgent,
  l$ as Modal,
  Ck as ModelUsage,
  r5 as MultiSelect,
  ul as NpsDailyMetrics,
  hl as NpsMetrics,
  dl as NpsOverviewMetrics,
  Yv as PaymentMethod,
  Ma as PieChart,
  Db as RecordLocator,
  ll as SalesByChannel,
  qt as SankeyChart,
  m$ as Section,
  A5 as SegmentedControl,
  ws as Select,
  u1 as SelectLanguage,
  S5 as SelectablePills,
  rl as Seller,
  pv as SellerContainer,
  l2 as Table,
  fl as Tabs,
  Xe as Tag,
  u5 as Toggle,
  y_ as TokenUsage,
  Cv as TopAgents,
  W_ as TopAgentsAnalysis,
  J_ as TopAgentsPie,
  j1 as TotalConversationsCard,
  s1 as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
