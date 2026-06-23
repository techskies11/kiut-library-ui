import { defineComponent as ce, shallowRef as ni, h as Ka, ref as ie, onMounted as tt, onUnmounted as pt, watch as Oe, toRaw as Ya, nextTick as We, version as wl, isProxy as ai, computed as C, toRef as $e, openBlock as g, createElementBlock as x, createVNode as O, unref as A, createElementVNode as u, Fragment as oe, renderList as fe, normalizeStyle as Ce, normalizeClass as J, toDisplayString as D, createCommentVNode as z, onBeforeUnmount as si, createStaticVNode as Cs, useSlots as es, Transition as Te, withCtx as B, renderSlot as we, Comment as Cl, createBlock as te, resolveDynamicComponent as Ft, createTextVNode as Be, Teleport as En, withDirectives as lt, withModifiers as Ye, vModelText as sn, vShow as bn, createSlots as $s, vModelSelect as $l, mergeProps as Ct, withKeys as Fn, useAttrs as wa, inject as oi } from "vue";
import * as Ss from "echarts/core";
import { TooltipComponent as Sl, TitleComponent as Ml } from "echarts/components";
import { SankeyChart as Dl } from "echarts/charts";
import { CanvasRenderer as Tl } from "echarts/renderers";
import je from "moment";
function qn(e) {
  return e + 0.5 | 0;
}
const Ot = (e, t, n) => Math.max(Math.min(e, n), t);
function Tn(e) {
  return Ot(qn(e * 2.55), 0, 255);
}
function jt(e) {
  return Ot(qn(e * 255), 0, 255);
}
function Bt(e) {
  return Ot(qn(e / 2.55) / 100, 0, 1);
}
function Ms(e) {
  return Ot(qn(e * 100), 0, 100);
}
const ut = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ua = [..."0123456789ABCDEF"], Al = (e) => Ua[e & 15], Bl = (e) => Ua[(e & 240) >> 4] + Ua[e & 15], Gn = (e) => (e & 240) >> 4 === (e & 15), Ll = (e) => Gn(e.r) && Gn(e.g) && Gn(e.b) && Gn(e.a);
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
const Rl = (e, t) => e < 255 ? t(e) : "";
function Il(e) {
  var t = Ll(e) ? Al : Bl;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Rl(e.a, t) : void 0;
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
let Zn;
function Yl(e) {
  Zn || (Zn = Kl(), Zn.transparent = [0, 0, 0, 0]);
  const t = Zn[e.toLowerCase()];
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
function Qn(e, t, n) {
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
    return this._valid ? Il(this._rgb) : void 0;
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
    const t = this._rgb, n = qn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Qn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Qn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Qn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Qn(this._rgb, 1, -t), this;
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
function Re(e) {
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
function Ie(e, t, n, a) {
  let s, o, i;
  if (Ke(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (Ae(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function ga(e, t) {
  let n, a, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function ma(e) {
  if (Ke(e))
    return e.map(ma);
  if (Ae(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = ma(e[n[s]]);
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
  Ae(s) && Ae(o) ? Vn(s, o, a) : t[e] = ma(o);
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
  Ae(a) && Ae(s) ? Ln(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = ma(s));
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
const Ee = Math.PI, Ne = 2 * Ee, or = Ne + Ee, pa = Number.POSITIVE_INFINITY, ir = Ee / 180, Ue = Ee / 2, Zt = Ee / 4, Ps = Ee * 2 / 3, ui = Math.log10, $t = Math.sign;
function Pn(e, t, n) {
  return Math.abs(e - t) < n;
}
function Rs(e) {
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
function Is(e) {
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
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: m, minDefined: v, maxDefined: f } = i.getUserBounds();
    if (v) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        an(r, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : an(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const y = r.slice(0, s + 1).reverse().findIndex((b) => !Re(b[l.axis]));
        s -= Math.max(0, y);
      }
      s = Qe(s, 0, a - 1);
    }
    if (f) {
      let y = Math.max(
        // @ts-expect-error Need to type _parsed
        an(r, i.axis, m, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : an(t, d, i.getPixelForValue(m), !0).hi + 1
      );
      if (c) {
        const b = r.slice(y - 1).findIndex((p) => !Re(p[l.axis]));
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
const Jn = (e) => e === 0 || e === 1, Fs = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ne / n)), Os = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ne / n) + 1, Rn = {
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
  easeInSine: (e) => -Math.cos(e * Ue) + 1,
  easeOutSine: (e) => Math.sin(e * Ue),
  easeInOutSine: (e) => -0.5 * (Math.cos(Ee * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Jn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Jn(e) ? e : Fs(e, 0.075, 0.3),
  easeOutElastic: (e) => Jn(e) ? e : Os(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Jn(e) ? e : e < 0.5 ? 0.5 * Fs(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Os(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Rn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Rn.easeInBounce(e * 2) * 0.5 : Rn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
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
function In(e, t) {
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
  return typeof t == "string" ? Vn(In(e, t), n) : Vn(In(e, ""), t);
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
    return In(this, t);
  }
  describe(t, n) {
    return La(Xa, t, n);
  }
  override(t, n) {
    return La(rn, t, n);
  }
  route(t, n, a, s) {
    const o = In(this, t), i = In(this, a), l = "_" + n;
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
  return !e || Re(e.size) || Re(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
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
  const v = t.pointStyle, f = t.rotation, y = t.radius;
  let b = (f || 0) * ir;
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
        c = y * 0.516, r = y - c, i = Math.cos(b + Zt) * r, h = Math.cos(b + Zt) * (s ? s / 2 - c : r), l = Math.sin(b + Zt) * r, m = Math.sin(b + Zt) * (s ? s / 2 - c : r), e.arc(n - h, a - l, c, b - Ee, b - Ue), e.arc(n + m, a - i, c, b - Ue, b), e.arc(n + h, a + l, c, b, b + Ue), e.arc(n - m, a + i, c, b + Ue, b + Ee), e.closePath();
        break;
      case "rect":
        if (!f) {
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
  t.translation && e.translate(t.translation[0], t.translation[1]), Re(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Rr(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, r = n - o.actualBoundingBoxAscent, c = n + o.actualBoundingBoxDescent, d = s.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, d), e.lineTo(l, d), e.stroke();
  }
}
function Ir(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function jn(e, t, n, a, s, o = {}) {
  const i = Ke(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = s.string, Pr(e, o), r = 0; r < i.length; ++r)
    c = i[r], o.backdrop && Ir(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), Re(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, n, a, o.maxWidth)), e.fillText(c, n, a, o.maxWidth), Rr(e, n, a, c, o), a += Number(s.lineHeight);
  e.restore();
}
function ba(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Ee, Ee, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, Ee, Ue, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, Ue, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -Ue, !0), e.lineTo(n + i.topLeft, a);
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
function ea(e, t, n, a) {
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
function ta(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function tc(e, t) {
  let n, a, s, o, i, l = Wn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && Wn(e[n + 1], t), o && (s = e[n], i && (s.cp1x = ta(s.cp1x, t.left, t.right), s.cp1y = ta(s.cp1y, t.top, t.bottom)), l && (s.cp2x = ta(s.cp2x, t.left, t.right), s.cp2y = ta(s.cp2y, t.top, t.bottom)));
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
function va(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const Ca = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function ac(e, t) {
  return Ca(e).getPropertyValue(t);
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
  const { canvas: n, currentDevicePixelRatio: a } = t, s = Ca(n), o = s.boxSizing === "border-box", i = on(s, "padding"), l = on(s, "border", "width"), { x: r, y: c, box: d } = ic(e, n), h = i.left + (d && l.left), m = i.top + (d && l.top);
  let { width: v, height: f } = t;
  return o && (v -= i.width + l.width, f -= i.height + l.height), {
    x: Math.round((r - h) / v * n.width / a),
    y: Math.round((c - m) / f * n.height / a)
  };
}
function lc(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && ps(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = Ca(o), r = on(l, "border", "width"), c = on(l, "padding");
      t = i.width - c.width - r.width, n = i.height - c.height - r.height, a = va(l.maxWidth, o, "clientWidth"), s = va(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || pa,
    maxHeight: s || pa
  };
}
const zt = (e) => Math.round(e * 10) / 10;
function rc(e, t, n, a) {
  const s = Ca(e), o = on(s, "margin"), i = va(s.maxWidth, e, "clientWidth") || pa, l = va(s.maxHeight, e, "clientHeight") || pa, r = lc(e, t, n);
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
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: r, normalize: c } = Mi(a), { start: d, end: h, loop: m, style: v } = gc(e, t, n), f = [];
  let y = !1, b = null, p, _, k;
  const w = () => r(s, k, p) && l(s, k) !== 0, $ = () => l(o, p) === 0 || r(o, k, p), S = () => y || w(), M = () => !y || $();
  for (let F = d, j = d; F <= h; ++F)
    _ = t[F % i], !_.skip && (p = c(_[a]), p !== k && (y = r(p, s, o), b === null && S() && (b = l(p, s) === 0 ? F : j), b !== null && M() && (f.push(Us({
      start: b,
      end: F,
      loop: m,
      count: i,
      style: v
    })), b = null), j = F, k = p));
  return b !== null && f.push(Us({
    start: b,
    end: h,
    loop: m,
    count: i,
    style: v
  })), f;
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
  function v(f, y, b, p) {
    const _ = l ? -1 : 1;
    if (f !== y) {
      for (f += r; n[f % r].skip; )
        f -= _;
      for (; n[y % r].skip; )
        y += _;
      f % r !== y % r && (c.push({
        start: f % r,
        end: y % r,
        loop: b,
        style: p
      }), d = p, h = y % r);
    }
  }
  for (const f of t) {
    h = l ? h : f.start;
    let y = n[h % r], b;
    for (m = h + 1; m <= f.end; m++) {
      const p = n[m % r];
      b = Xs(a.setContext(cn(s, {
        type: "segment",
        p0: y,
        p1: p,
        p0DataIndex: (m - 1) % r,
        p1DataIndex: m % r,
        datasetIndex: i
      }))), _c(b, d) && v(h, m - 1, f.loop, d), y = p, d = b;
    }
    h < m - 1 && v(h, m - 1, f.loop, d);
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
function na(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function kc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: na(n, t, "left"),
    right: na(n, t, "right"),
    top: na(a, t, "top"),
    bottom: na(a, t, "bottom")
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
    s = ea([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = ea([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || $c[t.type || typeof i], this._easing = Rn[t.easing] || Rn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = ea([
        t.to,
        n,
        s,
        t.from
      ]), this._from = ea([
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
function Rc(e, t, n) {
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
    const f = t[v], { [r]: y, [c]: b } = f, p = f._stacks || (f._stacks = {});
    m = p[c] = Rc(s, d, y), m[l] = b, m._top = Js(m, i, !0, a.type), m._bottom = Js(m, i, !1, a.type);
    const _ = m._visualValues || (m._visualValues = {});
    _[l] = b;
  }
}
function Ra(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function Ic(e, t) {
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
const Ia = (e) => e === "reset" || e === "none", to = (e, t) => t ? e : Object.assign({}, e), Fc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: Ti(n, !0),
  values: null
};
class $a {
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
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, m, v, f) => h === "x" ? m : h === "r" ? f : v, o = n.xAxisID = _e(a.xAxisID, Ra(t, "x")), i = n.yAxisID = _e(a.yAxisID, Ra(t, "y")), l = n.rAxisID = _e(a.rAxisID, Ra(t, "r")), r = n.indexAxis, c = n.iAxisID = s(r, o, i, l), d = n.vAxisID = s(r, i, o, l);
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
    let m, v, f;
    for (m = 0, v = s; m < v; ++m)
      f = m + a, h[m] = {
        [l]: d || o.parse(c[f], f),
        [r]: i.parse(n[f], f)
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
    function f() {
      v = s[m];
      const y = v[l.axis];
      return !ft(v[t.axis]) || d > y || h < y;
    }
    for (m = 0; m < i && !(!f() && (this.updateRangeFromParsed(c, t, v, r), o)); ++m)
      ;
    if (o) {
      for (m = i - 1; m >= 0; --m)
        if (!f()) {
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
      o = this.$context || (this.$context = Ic(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
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
    ], m = c.getOptionScopes(this.getDataset(), d), v = Object.keys(He.elements[t]), f = () => this.getContext(a, s, n), y = c.resolveNamedOptions(m, v, f, h);
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
    return !n || Ia(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, n, a, s) {
    Ia(s) ? Object.assign(t, a) : this._resolveAnimations(n, s).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !Ia(n) && this._resolveAnimations(void 0, n).update(t, a);
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
  return Re(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
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
class qc extends $a {
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
    let m, v, f, y;
    for (m = a, v = a + s; m < v; ++m)
      y = n[m], f = {}, f[o.axis] = o.parse(ln(y, c), m), h.push(Ai(ln(y, d), f, i, m));
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
      const f = this.getParsed(v), y = o || Re(f[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(v), b = this._calculateBarIndexPixels(v, d), p = (f._stacks || {})[l.axis], _ = {
        horizontal: c,
        base: y.base,
        enableBorderRadius: !p || Ea(f._custom) || i === p._top || i === p._bottom,
        x: c ? y.head : b.center,
        y: c ? b.center : y.head,
        height: c ? b.size : Math.abs(y.size),
        width: c ? Math.abs(y.size) : b.size
      };
      m && (_.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : s));
      const k = _.options || t[v].options;
      Kc(_, k, p, i), Uc(_, k, d.ratio), this.updateElement(t[v], v, _, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), r = l && l[a.axis], c = (d) => {
      const h = d._parsed.find((v) => v[a.axis] === r), m = h && h[d.vScale.axis];
      if (Re(m) || isNaN(m))
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
    let h = r[n.axis], m = 0, v = a ? this.applyStack(n, r, a) : h, f, y;
    v !== h && (m = v - h, v = h), d && (h = c.barStart, v = c.barEnd - c.barStart, h !== 0 && $t(h) !== $t(c.barEnd) && (m = 0), m += h);
    const b = !Re(o) && !d ? o : m;
    let p = n.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? f = n.getPixelForValue(m + v) : f = p, y = f - p, Math.abs(y) < i) {
      y = Wc(y, n, l) * i, h === l && (p -= y / 2);
      const _ = n.getPixelForDecimal(0), k = n.getPixelForDecimal(1), w = Math.min(_, k), $ = Math.max(_, k);
      p = Math.max(Math.min(p, $), w), f = p + y, a && !d && (r._stacks[n.axis]._visualValues[s] = n.getValueForPixel(f) - n.getValueForPixel(p));
    }
    if (p === n.getPixelForValue(l)) {
      const _ = $t(y) * n.getLineWidthForValue(l) / 2;
      p += _, y -= _;
    }
    return {
      size: y,
      base: p,
      head: f,
      center: f + y / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, s = this.options, o = s.skipNull, i = _e(s.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? Nc(t, n, s, d * c) : zc(t, n, s, d * c), m = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(_e(m, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
      l = h.start + h.chunk * f + h.chunk / 2, r = Math.min(i, h.chunk * h.ratio);
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
    const l = e, r = l + t, c = Math.cos(l), d = Math.sin(l), h = Math.cos(r), m = Math.sin(r), v = (k, w, $) => Hn(k, l, r, !0) ? 1 : Math.max(w, w * n, $, $ * n), f = (k, w, $) => Hn(k, l, r, !0) ? -1 : Math.min(w, w * n, $, $ * n), y = v(0, c, h), b = v(Ue, d, m), p = f(Ee, c, h), _ = f(Ee + Ue, d, m);
    a = (y - p) / 2, s = (b - _) / 2, o = -(y + p) / 2, i = -(b + _) / 2;
  }
  return {
    ratioX: a,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class Gc extends $a {
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
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), r = Math.min(Jl(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: m, ratioY: v, offsetX: f, offsetY: y } = Xc(h, d, r), b = (a.width - i) / m, p = (a.height - i) / v, _ = Math.max(Math.min(b, p) / 2, 0), k = ci(this.options.radius, _), w = Math.max(k * r, 0), $ = (k - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * k, this.offsetY = y * k, s.total = this.calculateTotal(), this.outerRadius = k - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Ne);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, m = o && c.animateScale, v = m ? 0 : this.innerRadius, f = m ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: b } = this._getSharedOptions(n, s);
    let p = this._getRotation(), _;
    for (_ = 0; _ < n; ++_)
      p += this._circumference(_, o);
    for (_ = n; _ < n + a; ++_) {
      const k = this._circumference(_, o), w = t[_], $ = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: p,
        endAngle: p + k,
        circumference: k,
        outerRadius: f,
        innerRadius: v
      };
      b && ($.options = y || this.resolveDataElementOptions(_, w.active ? "active" : s)), p += k, this.updateElement(w, _, $, s);
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
class Zc extends $a {
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
    const o = s === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, s), m = i.axis, v = l.axis, { spanGaps: f, segment: y } = this.options, b = Nn(f) ? f : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || o || s === "none", _ = n + a, k = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let $ = 0; $ < k; ++$) {
      const S = t[$], M = p ? S : {};
      if ($ < n || $ >= _) {
        M.skip = !0;
        continue;
      }
      const F = this.getParsed($), j = Re(F[v]), E = M[m] = i.getPixelForValue(F[m], $), T = M[v] = o || j ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, F, r) : F[v], $);
      M.skip = isNaN(E) || isNaN(T) || j, M.stop = $ > 0 && Math.abs(F[m] - w[m]) > b, y && (M.parsed = F, M.raw = c.data[$]), h && (M.options = d || this.resolveDataElementOptions($, S.active ? "active" : s)), p || this.updateElement(S, $, M, s), w = F;
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
        const { vScale: h } = s._cachedMeta, { _parsed: m } = e, v = m.slice(0, d.lo + 1).reverse().findIndex((y) => !Re(y[h.axis]));
        d.lo -= Math.max(0, v);
        const f = m.slice(d.hi).findIndex((y) => !Re(y[h.axis]));
        d.hi += Math.max(0, f);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Sa(e, t, n, a, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, r = o.length; l < r; ++l) {
    const { index: c, data: d } = o[l], { lo: h, hi: m } = ed(o[l], t, i, s);
    for (let v = h; v <= m; ++v) {
      const f = d[v];
      f.skip || a(f, c, v);
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
  return !s && !e.isPointInArea(t) || Sa(e, n, t, function(l, r, c) {
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
  return Sa(e, n, t, o), s;
}
function ad(e, t, n, a, s, o) {
  let i = [];
  const l = td(n);
  let r = Number.POSITIVE_INFINITY;
  function c(d, h, m) {
    const v = d.inRange(t.x, t.y, s);
    if (a && !v)
      return;
    const f = d.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(f)) && !v)
      return;
    const b = l(t, f);
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
  return Sa(e, n, t, c), i;
}
function Oa(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? nd(e, t, n, s) : ad(e, t, n, a, s, o);
}
function oo(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return Sa(e, n, t, (r, c, d) => {
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
function aa(e, t, n, a, s) {
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
      zn(c.start) && (i = c.start), r.fullSize ? aa(r, s.left, i, n.outerWidth - s.right - s.left, m) : aa(r, t.left + c.placed, i, h, m), c.start = i, c.placed += h, i = r.bottom;
    } else {
      const h = t.h * d, m = c.size || r.width;
      zn(c.start) && (o = c.start), r.fullSize ? aa(r, o, s.top, m, n.outerHeight - s.bottom - s.top) : aa(r, o, t.top + c.placed, m, h), c.start = o, c.placed += h, o = r.right;
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
    Ie(e.boxes, (y) => {
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
    }, s), f = ld(r.concat(c), h);
    An(l.fullSize, v, h, f), An(r, v, h, f), An(c, v, h, f) && An(r, v, h, f), dd(v), ro(l.leftAndTop, v, h, f), v.x += v.w, v.y += v.h, ro(l.rightAndBottom, v, h, f), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, Ie(l.chartArea, (y) => {
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
const ua = "$chartjs", fd = {
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
  if (e[ua] = {
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
const Ri = cc ? {
  passive: !0
} : !1;
function md(e, t, n) {
  e && e.addEventListener(t, n, Ri);
}
function pd(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Ri);
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
function ya(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function vd(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ya(l.addedNodes, a), i = i && !ya(l.removedNodes, a);
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
      i = i || ya(l.removedNodes, a), i = i && !ya(l.addedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Kn = /* @__PURE__ */ new Map();
let uo = 0;
function Ii() {
  const e = window.devicePixelRatio;
  e !== uo && (uo = e, Kn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function xd(e, t) {
  Kn.size || window.addEventListener("resize", Ii), Kn.set(e, t);
}
function _d(e) {
  Kn.delete(e), Kn.size || window.removeEventListener("resize", Ii);
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
    if (!n[ua])
      return !1;
    const a = n[ua].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      Re(i) ? n.removeAttribute(o) : n.setAttribute(o, i);
    });
    const s = a.style || {};
    return Object.keys(s).forEach((o) => {
      n.style[o] = s[o];
    }), n.width = n.width, delete n[ua], !0;
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
let Rt = class {
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
    for (sa(t, c, d, Re(v) ? 0 : l - v, l), h = 0, m = i - 1; h < m; h++)
      sa(t, c, d, o[h], o[h + 1]);
    return sa(t, c, d, r, Re(v) ? t.length : r + v), c;
  }
  return sa(t, c, d), c;
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
function sa(e, t, n, a, s) {
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
function Rd(e, t) {
  Ie(e, (n) => {
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
function Id(e, t) {
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
  let h = 0, m, v, f;
  const y = i - s, b = l - o;
  if (e.isHorizontal()) {
    if (v = Ge(a, o, l), Ae(n)) {
      const p = Object.keys(n)[0], _ = n[p];
      f = d[p].getPixelForValue(_) + y - t;
    } else n === "center" ? f = (c.bottom + c.top) / 2 + y - t : f = ho(e, n, t);
    m = l - o;
  } else {
    if (Ae(n)) {
      const p = Object.keys(n)[0], _ = n[p];
      v = d[p].getPixelForValue(_) - b + t;
    } else n === "center" ? v = (c.left + c.right) / 2 - b + t : v = ho(e, n, t);
    f = Ge(a, i, s), h = n === "left" ? -Ue : Ue;
  }
  return {
    titleX: v,
    titleY: f,
    maxWidth: m,
    rotation: h
  };
}
class xn extends Rt {
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
        const { first: c, last: d, widest: h, highest: m } = this._getLabelSizes(), v = a.padding * 2, f = Lt(this.labelRotation), y = Math.cos(f), b = Math.sin(f);
        if (l) {
          const p = a.mirror ? 0 : b * h.width + y * m.height;
          t.height = Math.min(this.maxHeight, t.height + p + v);
        } else {
          const p = a.mirror ? 0 : y * h.width + b * m.height;
          t.width = Math.min(this.maxWidth, t.width + p + v);
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
      Re(t[n].label) && (t.splice(n, 1), a--, n--);
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
    let c = 0, d = 0, h, m, v, f, y, b, p, _, k, w, $;
    for (h = 0; h < n; h += r) {
      if (f = t[h].label, y = this._resolveTickFontOptions(h), s.font = b = y.string, p = o[b] = o[b] || {
        data: {},
        gc: []
      }, _ = y.lineHeight, k = w = 0, !Re(f) && !Ke(f))
        k = Ns(s, p.data, p.gc, k, f), w = _;
      else if (Ke(f))
        for (m = 0, v = f.length; m < v; ++m)
          $ = f[m], !Re($) && !Ke($) && (k = Ns(s, p.data, p.gc, k, $), w += _);
      i.push(k), l.push(w), c = Math.max(k, c), d = Math.max(w, d);
    }
    Rd(o, n);
    const S = i.indexOf(c), M = l.indexOf(d), F = (j) => ({
      width: i[j] || 0,
      height: l[j] || 0
    });
    return {
      first: F(0),
      last: F(n - 1),
      widest: F(S),
      highest: F(M),
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
    return this.$context || (this.$context = Id(this.chart.getContext(), this));
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
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, r = o.offset, c = this.isHorizontal(), h = this.ticks.length + (r ? 1 : 0), m = Cn(o), v = [], f = l.setContext(this.getContext()), y = f.display ? f.width : 0, b = y / 2, p = function(ae) {
      return Qt(a, ae, y);
    };
    let _, k, w, $, S, M, F, j, E, T, P, V;
    if (i === "top")
      _ = p(this.bottom), M = this.bottom - m, j = _ - b, T = p(t.top) + b, V = t.bottom;
    else if (i === "bottom")
      _ = p(this.top), T = t.top, V = p(t.bottom) - b, M = _ + b, j = this.top + m;
    else if (i === "left")
      _ = p(this.right), S = this.right - m, F = _ - b, E = p(t.left) + b, P = t.right;
    else if (i === "right")
      _ = p(this.left), E = t.left, P = p(t.right) - b, S = _ + b, F = this.left + m;
    else if (n === "x") {
      if (i === "center")
        _ = p((t.top + t.bottom) / 2 + 0.5);
      else if (Ae(i)) {
        const ae = Object.keys(i)[0], se = i[ae];
        _ = p(this.chart.scales[ae].getPixelForValue(se));
      }
      T = t.top, V = t.bottom, M = _ + b, j = M + m;
    } else if (n === "y") {
      if (i === "center")
        _ = p((t.left + t.right) / 2);
      else if (Ae(i)) {
        const ae = Object.keys(i)[0], se = i[ae];
        _ = p(this.chart.scales[ae].getPixelForValue(se));
      }
      S = _ - b, F = S - m, E = t.left, P = t.right;
    }
    const X = _e(s.ticks.maxTicksLimit, h), Z = Math.max(1, Math.ceil(h / X));
    for (k = 0; k < h; k += Z) {
      const ae = this.getContext(k), se = o.setContext(ae), ge = l.setContext(ae), pe = se.lineWidth, L = se.color, R = ge.dash || [], H = ge.dashOffset, ee = se.tickWidth, ue = se.tickColor, De = se.tickBorderDash || [], Se = se.tickBorderDashOffset;
      w = Pd(this, k, r), w !== void 0 && ($ = Qt(a, w, pe), c ? S = F = E = P = $ : M = j = T = V = $, v.push({
        tx1: S,
        ty1: M,
        tx2: F,
        ty2: j,
        x1: E,
        y1: T,
        x2: P,
        y2: V,
        width: pe,
        color: L,
        borderDash: R,
        borderDashOffset: H,
        tickWidth: ee,
        tickColor: ue,
        tickBorderDash: De,
        tickBorderDashOffset: Se
      }));
    }
    return this._ticksLength = h, this._borderValue = _, v;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: d, mirror: h } = o, m = Cn(a.grid), v = m + d, f = h ? -d : v, y = -Lt(this.labelRotation), b = [];
    let p, _, k, w, $, S, M, F, j, E, T, P, V = "middle";
    if (s === "top")
      S = this.bottom - f, M = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      S = this.top + f, M = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const Z = this._getYAxisLabelAlignment(m);
      M = Z.textAlign, $ = Z.x;
    } else if (s === "right") {
      const Z = this._getYAxisLabelAlignment(m);
      M = Z.textAlign, $ = Z.x;
    } else if (n === "x") {
      if (s === "center")
        S = (t.top + t.bottom) / 2 + v;
      else if (Ae(s)) {
        const Z = Object.keys(s)[0], ae = s[Z];
        S = this.chart.scales[Z].getPixelForValue(ae) + v;
      }
      M = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        $ = (t.left + t.right) / 2 - v;
      else if (Ae(s)) {
        const Z = Object.keys(s)[0], ae = s[Z];
        $ = this.chart.scales[Z].getPixelForValue(ae);
      }
      M = this._getYAxisLabelAlignment(m).textAlign;
    }
    n === "y" && (r === "start" ? V = "top" : r === "end" && (V = "bottom"));
    const X = this._getLabelSizes();
    for (p = 0, _ = l.length; p < _; ++p) {
      k = l[p], w = k.label;
      const Z = o.setContext(this.getContext(p));
      F = this.getPixelForTick(p) + o.labelOffset, j = this._resolveTickFontOptions(p), E = j.lineHeight, T = Ke(w) ? w.length : 1;
      const ae = T / 2, se = Z.color, ge = Z.textStrokeColor, pe = Z.textStrokeWidth;
      let L = M;
      i ? ($ = F, M === "inner" && (p === _ - 1 ? L = this.options.reverse ? "left" : "right" : p === 0 ? L = this.options.reverse ? "right" : "left" : L = "center"), s === "top" ? c === "near" || y !== 0 ? P = -T * E + E / 2 : c === "center" ? P = -X.highest.height / 2 - ae * E + E : P = -X.highest.height + E / 2 : c === "near" || y !== 0 ? P = E / 2 : c === "center" ? P = X.highest.height / 2 - ae * E : P = X.highest.height - T * E, h && (P *= -1), y !== 0 && !Z.showLabelBackdrop && ($ += E / 2 * Math.sin(y))) : (S = F, P = (1 - T) * E / 2);
      let R;
      if (Z.showLabelBackdrop) {
        const H = gt(Z.backdropPadding), ee = X.heights[p], ue = X.widths[p];
        let De = P - H.top, Se = 0 - H.left;
        switch (V) {
          case "middle":
            De -= ee / 2;
            break;
          case "bottom":
            De -= ee;
            break;
        }
        switch (M) {
          case "center":
            Se -= ue / 2;
            break;
          case "right":
            Se -= ue;
            break;
          case "inner":
            p === _ - 1 ? Se -= ue : p > 0 && (Se -= ue / 2);
            break;
        }
        R = {
          left: Se,
          top: De,
          width: ue + H.width,
          height: ee + H.height,
          color: Z.backdropColor
        };
      }
      b.push({
        label: w,
        font: j,
        textOffset: P,
        options: {
          rotation: y,
          color: se,
          strokeColor: ge,
          strokeWidth: pe,
          textAlign: L,
          textBaseline: V,
          translation: [
            $,
            S
          ],
          backdrop: R
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
class oa {
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
    this.controllers = new oa($a, "datasets", !0), this.elements = new oa(Rt, "elements"), this.plugins = new oa(Object, "plugins"), this.scales = new oa(xn, "scales"), this._typedRegistries = [
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
      a || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : Ie(s, (i) => {
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
    Re(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
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
function ia(e, t) {
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
    return ia(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return ia(`${t}.transition.${n}`, () => [
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
    return ia(`${t}-${n}`, () => [
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
    return ia(`${a}-plugin-${n}`, () => [
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
const ha = {}, wo = (e) => {
  const t = Vi(e);
  return Object.values(ha).filter((n) => n.canvas === t).pop();
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
  static instances = ha;
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
    if (this.id = Ql(), this.ctx = l, this.canvas = r, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Wd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = br((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], ha[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Tt.listen(this, "complete", ko), Tt.listen(this, "progress", ou), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: s, _aspectRatio: o } = this;
    return Re(t) ? n && o ? o : s ? a / s : null : t;
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
    Ie(n, (a, s) => {
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
    }))), Ie(o, (i) => {
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
    }), Ie(s, (i, l) => {
      i || delete a[l];
    }), Ie(a, (i) => {
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
    Ie(this.data.datasets, (t, n) => {
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
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || Ie(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(_o("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Ie(this.scales, (t) => {
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
    this._layers = [], Ie(this.boxes, (s) => {
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
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Hs(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete ha[this.id], this.notifyPlugins("afterDestroy");
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
    Ie(this.options.events, (o) => a(o, s));
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
    Ie(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Ie(this._responsiveListeners, (t, n) => {
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
    !ga(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
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
    const d = !ga(l, s);
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
  return Ie(Ut.instances, (e) => e._plugins.invalidate());
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
      const v = 2 * m * m, f = -v * Math.cos(n + Ee / 2) + s, y = -v * Math.sin(n + Ee / 2) + o, b = v * Math.cos(a + Ee / 2) + s, p = v * Math.sin(a + Ee / 2) + o;
      e.lineTo(f, y), e.lineTo(b, p);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function cu(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: r } = t;
  let c = s / l;
  e.beginPath(), e.arc(o, i, l, a - c, n + c), r > s ? (c = s / r, e.arc(o, i, r, n + c, a - c, !0)) : e.arc(o, i, s, n + Ue, a - Ue), e.closePath(), e.clip();
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
function xa(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), m = d > 0 ? d + a + n + c : 0;
  let v = 0;
  const f = s - r;
  if (a) {
    const Z = d > 0 ? d - a : 0, ae = h > 0 ? h - a : 0, se = (Z + ae) / 2, ge = se !== 0 ? f * se / (se + a) : f;
    v = (f - ge) / 2;
  }
  const y = Math.max(1e-3, f * h - n / Ee) / h, b = (f - y) / 2, p = r + b + v, _ = s - b - v, { outerStart: k, outerEnd: w, innerStart: $, innerEnd: S } = uu(t, m, h, _ - p), M = h - k, F = h - w, j = p + k / M, E = _ - w / F, T = m + $, P = m + S, V = p + $ / T, X = _ - S / P;
  if (e.beginPath(), o) {
    const Z = (j + E) / 2;
    if (e.arc(i, l, h, j, Z), e.arc(i, l, h, Z, E), w > 0) {
      const pe = fn(F, E, i, l);
      e.arc(pe.x, pe.y, w, E, _ + Ue);
    }
    const ae = fn(P, _, i, l);
    if (e.lineTo(ae.x, ae.y), S > 0) {
      const pe = fn(P, X, i, l);
      e.arc(pe.x, pe.y, S, _ + Ue, X + Math.PI);
    }
    const se = (_ - S / m + (p + $ / m)) / 2;
    if (e.arc(i, l, m, _ - S / m, se, !0), e.arc(i, l, m, se, p + $ / m, !0), $ > 0) {
      const pe = fn(T, V, i, l);
      e.arc(pe.x, pe.y, $, V + Math.PI, p - Ue);
    }
    const ge = fn(M, p, i, l);
    if (e.lineTo(ge.x, ge.y), k > 0) {
      const pe = fn(M, j, i, l);
      e.arc(pe.x, pe.y, k, p - Ue, j);
    }
  } else {
    e.moveTo(i, l);
    const Z = Math.cos(j) * h + i, ae = Math.sin(j) * h + l;
    e.lineTo(Z, ae);
    const se = Math.cos(E) * h + i, ge = Math.sin(E) * h + l;
    e.lineTo(se, ge);
  }
  e.closePath();
}
function hu(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (o) {
    xa(e, t, n, a, r, s);
    for (let c = 0; c < o; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ne || Ne));
  }
  return xa(e, t, n, a, r, s), e.fill(), r;
}
function fu(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: m, borderRadius: v } = r, f = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = m, f ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let y = t.endAngle;
  if (o) {
    xa(e, t, n, a, y, s);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(l) || (y = i + (l % Ne || Ne));
  }
  f && cu(e, t, y), r.selfJoin && y - i >= Ee && v === 0 && d !== "miter" && ru(e, t, y), o || (xa(e, t, n, a, y, s), e.stroke());
}
class gu extends Rt {
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
    ], a), m = (this.options.spacing + this.options.borderWidth) / 2, v = _e(h, r - l), f = Hn(o, l, r) && l !== r, y = v >= Ne || f, b = Vt(i, c + m, d + m);
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
  let { move: h = !0, reverse: m } = a || {}, v, f, y;
  for (v = 0; v <= c; ++v)
    f = s[(l + (m ? c - v : v)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : d(e, y, f, m, o.stepped), y = f);
  return r && (f = s[(l + (m ? c : 0)) % i], d(e, y, f, m, o.stepped)), !!r;
}
function vu(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = Ni(s, n, a), { move: r = !0, reverse: c } = a || {};
  let d = 0, h = 0, m, v, f, y, b, p;
  const _ = (w) => (i + (c ? l - w : w)) % o, k = () => {
    y !== b && (e.lineTo(d, b), e.lineTo(d, y), e.lineTo(d, p));
  };
  for (r && (v = s[_(0)], e.moveTo(v.x, v.y)), m = 0; m <= l; ++m) {
    if (v = s[_(m)], v.skip)
      continue;
    const w = v.x, $ = v.y, S = w | 0;
    S === f ? ($ < y ? y = $ : $ > b && (b = $), d = (h * d + w) / ++h) : (k(), e.lineTo(w, $), f = S, h = 0, y = b = $), p = $;
  }
  k();
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
class Cu extends Rt {
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
      const { start: h, end: m } = i[c], v = o[h], f = o[m];
      if (v === f) {
        l.push(v);
        continue;
      }
      const y = Math.abs((s - v[n]) / (f[n] - v[n])), b = r(v, f, y, a.stepped);
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
class $u extends Rt {
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
class Bu extends Rt {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = Du(this), l = Tu(i.radius) ? ba : Au;
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
class Mo extends Rt {
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
    return this.legendItems.forEach((f, y) => {
      const b = a + n / 2 + o.measureText(f.text).width;
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
    let h = l, m = 0, v = 0, f = 0, y = 0;
    return this.legendItems.forEach((b, p) => {
      const { itemWidth: _, itemHeight: k } = Pu(a, n, o, b, s);
      p > 0 && v + k + 2 * l > d && (h += m + l, c.push({
        width: m,
        height: v
      }), f += m + l, y++, m = v = 0), r[p] = {
        left: f,
        top: v,
        col: y,
        width: _,
        height: k
      }, m = Math.max(m, _), v += k + l;
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
    const { boxWidth: f, boxHeight: y, itemHeight: b } = So(i, h), p = function(S, M, F) {
      if (isNaN(f) || f <= 0 || isNaN(y) || y < 0)
        return;
      s.save();
      const j = _e(F.lineWidth, 1);
      if (s.fillStyle = _e(F.fillStyle, l), s.lineCap = _e(F.lineCap, "butt"), s.lineDashOffset = _e(F.lineDashOffset, 0), s.lineJoin = _e(F.lineJoin, "miter"), s.lineWidth = j, s.strokeStyle = _e(F.strokeStyle, l), s.setLineDash(_e(F.lineDash, [])), i.usePointStyle) {
        const E = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: F.pointStyle,
          rotation: F.rotation,
          borderWidth: j
        }, T = r.xPlus(S, f / 2), P = M + m;
        vi(s, E, T, P, i.pointStyleWidth && f);
      } else {
        const E = M + Math.max((h - y) / 2, 0), T = r.leftForLtr(S, f), P = mn(F.borderRadius);
        s.beginPath(), Object.values(P).some((V) => V !== 0) ? ba(s, {
          x: T,
          y: E,
          w: f,
          h: y,
          radius: P
        }) : s.rect(T, E, f, y), s.fill(), j !== 0 && s.stroke();
      }
      s.restore();
    }, _ = function(S, M, F) {
      jn(s, F.text, S, M + b / 2, c, {
        strikethrough: F.hidden,
        textAlign: r.textAlign(F.textAlign)
      });
    }, k = this.isHorizontal(), w = this._computeTitleHeight();
    k ? v = {
      x: Ge(o, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : v = {
      x: this.left + d,
      y: Ge(o, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, $i(this.ctx, t.textDirection);
    const $ = b + d;
    this.legendItems.forEach((S, M) => {
      s.strokeStyle = S.fontColor, s.fillStyle = S.fontColor;
      const F = s.measureText(S.text).width, j = r.textAlign(S.textAlign || (S.textAlign = i.textAlign)), E = f + m + F;
      let T = v.x, P = v.y;
      r.setWidth(this.width), k ? M > 0 && T + E + d > this.right && (P = v.y += $, v.line++, T = v.x = Ge(o, this.left + d, this.right - a[v.line])) : M > 0 && P + $ > this.bottom && (T = v.x = T + n[v.line].width + d, v.line++, P = v.y = Ge(o, this.top + w + d, this.bottom - n[v.line].height));
      const V = r.x(T);
      if (p(V, P, S), T = vr(j, T + f + m, k ? T + E : this.right, t.rtl), _(r.x(T), P, S), k)
        v.x += E + d;
      else if (typeof S.text != "string") {
        const X = c.lineHeight;
        v.y += Wi(S, X) + d;
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
      const f = this.columnSizes.reduce((y, b) => Math.max(y, b.height), 0);
      d = c + Ge(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
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
  const o = Ru(a, e, t, n), i = Iu(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function Ru(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function Iu(e, t, n) {
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
class ji extends Rt {
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
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, r = Je(t.bodyFont), c = Je(t.titleFont), d = Je(t.footerFont), h = o.length, m = s.length, v = a.length, f = gt(t.padding);
  let y = f.height, b = 0, p = a.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, h && (y += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    y += v * w + (p - v) * r.lineHeight + (p - 1) * t.bodySpacing;
  }
  m && (y += t.footerMarginTop + m * d.lineHeight + (m - 1) * t.footerSpacing);
  let _ = 0;
  const k = function(w) {
    b = Math.max(b, n.measureText(w).width + _);
  };
  return n.save(), n.font = c.string, Ie(e.title, k), n.font = r.string, Ie(e.beforeBody.concat(e.afterBody), k), _ = t.displayColors ? i + 2 + t.boxPadding : 0, Ie(a, (w) => {
    Ie(w.before, k), Ie(w.lines, k), Ie(w.after, k);
  }), _ = 0, n.font = d.string, Ie(e.footer, k), n.restore(), b += f.width, {
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
  let f = Hu(t, l);
  const y = Wu(t, r, c);
  return r === "center" ? l === "left" ? f += c : l === "right" && (f -= c) : l === "left" ? f -= Math.max(d, m) + s : l === "right" && (f += Math.max(h, v) + s), {
    x: Qe(f, 0, a.width - t.width),
    y: Qe(y, 0, a.height - t.height)
  };
}
function la(e, t, n) {
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
    return Re(n) || (t += n), t;
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
class Po extends Rt {
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
    return Ie(t, (o) => {
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
    return t.filter && (l = l.filter((d, h, m) => t.filter(d, h, m, a))), t.itemSort && (l = l.sort((d, h) => t.itemSort(d, h, a))), Ie(l, (d) => {
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
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: r, topRight: c, bottomLeft: d, bottomRight: h } = mn(l), { x: m, y: v } = t, { width: f, height: y } = n;
    let b, p, _, k, w, $;
    return o === "center" ? (w = v + y / 2, s === "left" ? (b = m, p = b - i, k = w + i, $ = w - i) : (b = m + f, p = b + i, k = w - i, $ = w + i), _ = b) : (s === "left" ? p = m + Math.max(r, d) + i : s === "right" ? p = m + f - Math.max(c, h) - i : p = this.caretX, o === "top" ? (k = v, w = k - i, b = p - i, _ = p + i) : (k = v + y, w = k + i, b = p + i, _ = p - i), $ = k), {
      x1: b,
      x2: p,
      x3: _,
      y1: k,
      y2: w,
      y3: $
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, r;
    if (o) {
      const c = pn(a.rtl, this.x, this.width);
      for (t.x = la(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Je(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, r = 0; r < o; ++r)
        n.fillText(s[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: r, boxWidth: c } = o, d = Je(o.bodyFont), h = la(this, "left", o), m = s.x(h), v = r < d.lineHeight ? (d.lineHeight - r) / 2 : 0, f = n.y + v;
    if (o.usePointStyle) {
      const y = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, b = s.leftForLtr(m, c) + c / 2, p = f + r / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ga(t, y, b, p), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ga(t, y, b, p);
    } else {
      t.lineWidth = Ae(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const y = s.leftForLtr(m, c), b = s.leftForLtr(s.xPlus(m, 1), c - 2), p = mn(i.borderRadius);
      Object.values(p).some((_) => _ !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, ba(t, {
        x: y,
        y: f,
        w: c,
        h: r,
        radius: p
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), ba(t, {
        x: b,
        y: f + 1,
        w: c - 2,
        h: r - 2,
        radius: p
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(y, f, c, r), t.strokeRect(y, f, c, r), t.fillStyle = i.backgroundColor, t.fillRect(b, f + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: d } = a, h = Je(a.bodyFont);
    let m = h.lineHeight, v = 0;
    const f = pn(a.rtl, this.x, this.width), y = function(F) {
      n.fillText(F, f.x(t.x + v), t.y + m / 2), t.y += m + o;
    }, b = f.textAlign(i);
    let p, _, k, w, $, S, M;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = la(this, b, a), n.fillStyle = a.bodyColor, Ie(this.beforeBody, y), v = l && b !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, S = s.length; w < S; ++w) {
      for (p = s[w], _ = this.labelTextColors[w], n.fillStyle = _, Ie(p.before, y), k = p.lines, l && k.length && (this._drawColorBox(n, t, w, f, a), m = Math.max(h.lineHeight, r)), $ = 0, M = k.length; $ < M; ++$)
        y(k[$]), m = h.lineHeight;
      Ie(p.after, y);
    }
    v = 0, m = h.lineHeight, Ie(this.afterBody, y), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const r = pn(a.rtl, this.x, this.width);
      for (t.x = la(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = r.textAlign(a.footerAlign), n.textBaseline = "middle", i = Je(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: d } = a, { topLeft: h, topRight: m, bottomLeft: v, bottomRight: f } = mn(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, r), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + c - m, r), n.quadraticCurveTo(l + c, r, l + c, r + m), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + c, r + d - f), n.quadraticCurveTo(l + c, r + d, l + c - f, r + d), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + v, r + d), n.quadraticCurveTo(l, r + d, l, r + d - v), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, r + h), n.quadraticCurveTo(l, r, l + h, r), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
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
    }), o = !ga(a, s), i = this._positionChanged(s, n);
    (o || i) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, n, a), l = this._positionChanged(i, t), r = n || !ga(i, o) || l;
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
function Ro(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ui extends xn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Ro
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
    if (Re(t))
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
    return Ro.call(this, t);
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
  const n = [], { bounds: s, step: o, min: i, max: l, precision: r, count: c, maxTicks: d, maxDigits: h, includeBounds: m } = e, v = o || 1, f = d - 1, { min: y, max: b } = t, p = !Re(i), _ = !Re(l), k = !Re(c), w = (b - y) / (h + 1);
  let $ = Rs((b - y) / f / v) * v, S, M, F, j;
  if ($ < 1e-14 && !p && !_)
    return [
      {
        value: y
      },
      {
        value: b
      }
    ];
  j = Math.ceil(b / $) - Math.floor(y / $), j > f && ($ = Rs(j * $ / f / v) * v), Re(r) || (S = Math.pow(10, r), $ = Math.ceil($ * S) / S), s === "ticks" ? (M = Math.floor(y / $) * $, F = Math.ceil(b / $) * $) : (M = y, F = b), p && _ && o && cr((l - i) / o, $ / 1e3) ? (j = Math.round(Math.min((l - i) / $, d)), $ = (l - i) / j, M = i, F = l) : k ? (M = p ? i : M, F = _ ? l : F, j = c - 1, $ = (F - M) / j) : (j = (F - M) / $, Pn(j, Math.round(j), $ / 1e3) ? j = Math.round(j) : j = Math.ceil(j));
  const E = Math.max(Is($), Is(M));
  S = Math.pow(10, Re(r) ? E : r), M = Math.round(M * S) / S, F = Math.round(F * S) / S;
  let T = 0;
  for (p && (m && M !== i ? (n.push({
    value: i
  }), M < i && T++, Pn(Math.round((M + T * $) * S) / S, i, Io(i, w, e)) && T++) : M < i && T++); T < j; ++T) {
    const P = Math.round((M + T * $) * S) / S;
    if (_ && P > l)
      break;
    n.push({
      value: P
    });
  }
  return _ && m && F !== l ? n.length && Pn(n[n.length - 1].value, l, Io(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!_ || F === l) && n.push({
    value: F
  }), n;
}
function Io(e, t, { horizontal: n, minRotation: a }) {
  const s = Lt(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Xu extends xn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return Re(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
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
const Ma = {
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
}, it = /* @__PURE__ */ Object.keys(Ma);
function Eo(e, t) {
  return e - t;
}
function Fo(e, t) {
  if (Re(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), ft(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && (Nn(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function Oo(e, t, n, a) {
  const s = it.length;
  for (let o = it.indexOf(e); o < s - 1; ++o) {
    const i = Ma[it[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return it[o];
  }
  return it[s - 1];
}
function Gu(e, t, n, a, s) {
  for (let o = it.length - 1; o >= it.indexOf(n); o--) {
    const i = it[o];
    if (Ma[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return it[n ? it.indexOf(n) : 0];
}
function Zu(e) {
  for (let t = it.indexOf(e) + 1, n = it.length; t < n; ++t)
    if (Ma[it[t]].common)
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
    const f = s.ticks.source === "data" && this.getDataTimestamps();
    for (m = h, v = 0; m < a; m = +t.add(m, l, i), v++)
      Vo(d, m, f);
    return (m === a || s.bounds === "ticks" || v === 1) && Vo(d, m, f), Object.keys(d).sort(Eo).map((y) => +y);
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
function ra(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, r;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = an(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: r } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = an(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: r } = e[s]);
  const c = i - o;
  return c ? l + (r - l) * (t - o) / c : l;
}
class z$ extends No {
  static id = "timeseries";
  static defaults = No.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = ra(n, this.min), this._tableRange = ra(n, this.max) - this._minPos, super.initOffsets(t);
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
    return (ra(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return ra(this._table, a * this._tableRange + this._minPos, !0);
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
const oh = ce({
  props: eh,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = ie(null), o = ni(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: c, data: d, options: h, plugins: m, datasetIdKey: v } = e, f = sh(d, v), y = nh(f, d);
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
      let [h, m] = c, [v, f] = d;
      const y = Ya(o.value);
      if (!y)
        return;
      let b = !1;
      if (h) {
        const p = gn(h), _ = gn(v);
        p && p !== _ && (ah(y, p), b = !0);
      }
      if (m) {
        const p = gn(m.labels), _ = gn(f.labels), k = gn(m.datasets), w = gn(f.datasets);
        p !== _ && (Gi(y.config.data, p), b = !0), k && k !== w && (Zi(y.config.data, k, e.datasetIdKey), b = !0);
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
  return Ut.register(t), ce({
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
function Me(e) {
  const t = ie("light");
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
const _a = 5, _s = 8, dh = /^x\d*$/, uh = /^y\d*$/;
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
        d > c && h > 0 ? r.maxTicksLimit = Math.floor((d - c) / h) + 1 : r.maxTicksLimit = _a;
      } else
        r.maxTicksLimit = _a;
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
const fh = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, jo = 10, gh = /* @__PURE__ */ ce({
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
    const { isDark: a, colors: s } = Me($e(n, "theme")), o = C(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
    function r(d, h) {
      if (h == null) return d;
      if (Array.isArray(h) || typeof h != "object" || d == null || Array.isArray(d) || typeof d != "object") return h;
      const m = { ...d };
      for (const v of Object.keys(h)) {
        const f = h[v];
        f !== void 0 && (m[v] = r(d[v], f));
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
                return m.data.datasets.map((f, y) => {
                  const b = Array.isArray(f.backgroundColor) ? f.backgroundColor[0] : f.backgroundColor, p = Array.isArray(f.borderColor) ? f.borderColor[0] : f.borderColor, _ = typeof p == "string" && p.length > 0 ? p : typeof b == "string" && b.length > 0 ? b : s.value.textSecondary;
                  return {
                    text: l(f.label || ""),
                    fillStyle: typeof b == "string" ? b : _,
                    strokeStyle: _,
                    lineWidth: 0,
                    fontColor: _,
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
              maxTicksLimit: _a,
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
    return t({ isDark: a }), (d, h) => (g(), x("div", fh, [
      O(A(ih), {
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
}, xh = /* @__PURE__ */ ce({
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
    const a = ie(null), { isDark: s, colors: o } = Me($e(n, "theme")), i = C(() => o.value.bgCard), l = C(() => {
      const b = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((p) => {
          const _ = p.borderColor, k = Array.isArray(_) ? _[0] : _, w = typeof k == "string" && k.length > 0 ? k : o.value.textSecondary, $ = p.pointBackgroundColor !== void 0 ? p.pointBackgroundColor : b, S = p.pointHoverBackgroundColor !== void 0 ? p.pointHoverBackgroundColor : $, M = p.pointBorderWidth ?? 2, F = p.pointHoverBorderWidth ?? M;
          return {
            ...p,
            fill: p.fill ?? !1,
            clip: p.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: S,
            pointBorderColor: p.pointBorderColor ?? w,
            pointHoverBorderColor: p.pointHoverBorderColor ?? w,
            pointBorderWidth: M,
            pointHoverBorderWidth: F
          };
        })
      };
    }), r = (b) => typeof b == "string" ? b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() : b, c = (b) => typeof b != "string" ? b : n.uppercaseLegendLabels ? b.toUpperCase() : r(b);
    function d(b) {
      const p = b.borderColor, _ = Array.isArray(p) ? p[0] : p;
      return typeof _ == "string" && _.length > 0 ? _ : o.value.textSecondary;
    }
    const h = C(
      () => l.value.datasets.map((b, p) => ({
        key: `${b.label ?? "dataset"}-${p}`,
        label: c(b.label || ""),
        color: d(b)
      }))
    ), m = ie([]);
    Oe(
      () => l.value.datasets.length,
      (b) => {
        const p = Array.from({ length: b }, (_, k) => m.value[k] ?? !0);
        m.value = p;
      },
      { immediate: !0 }
    );
    function v(b) {
      const _ = a.value?.chart;
      if (!_ || b < 0 || b >= _.data.datasets.length) return;
      const k = !_.isDatasetVisible(b);
      _.setDatasetVisibility(b, k), m.value[b] = k, _.update();
    }
    function f(b, p) {
      if (p == null) return b;
      if (Array.isArray(p) || typeof p != "object" || b == null || Array.isArray(b) || typeof b != "object") return p;
      const _ = { ...b };
      for (const k of Object.keys(p)) {
        const w = p[k];
        w !== void 0 && (_[k] = f(b[k], w));
      }
      return _;
    }
    const y = C(() => {
      const b = {
        font: {
          family: st
        },
        color: o.value.textSecondary,
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
              title: function(k) {
                return k.length > 0 ? String(r(k[0].label)) : "";
              },
              label: function(k) {
                let w = String(r(k.dataset.label || ""));
                return w && (w += ": "), k.parsed.y !== null && (w += k.parsed.y), w;
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
              maxTicksLimit: _a,
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
      }, p = n.options ? f(b, n.options) : b;
      return Ji(
        Qi(p)
      );
    });
    return t({ isDark: s }), (b, p) => (g(), x("div", mh, [
      u("div", ph, [
        O(A(lh), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: y.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (g(), x("ul", bh, [
        (g(!0), x(oe, null, fe(h.value, (_, k) => (g(), x("li", {
          key: _.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: J(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", m.value[k] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: Ce({ color: _.color }),
            "aria-pressed": m.value[k] !== !1,
            "aria-label": `${_.label}. ${m.value[k] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => v(k)
          }, [
            u("span", yh, [
              p[0] || (p[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: Ce({ borderColor: _.color })
              }, null, 4),
              p[1] || (p[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, D(_.label), 1)
          ], 14, vh)
        ]))), 128))
      ])) : z("", !0)
    ]));
  }
}), yt = /* @__PURE__ */ me(xh, [["__scopeId", "data-v-426e23d5"]]), _h = { class: "chart-container" }, kh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", wh = /* @__PURE__ */ ce({
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
    const { isDark: a, colors: s } = Me($e(n, "theme")), o = n.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = C(() => n.options ? n.options : {
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
              const c = r.label || "", d = r.parsed || 0, h = r.dataset.data.reduce((v, f) => v + f, 0), m = (d / h * 100).toFixed(1);
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
    return t({ isDark: a }), (r, c) => (g(), x("div", _h, [
      O(A(rh), {
        data: A(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Da = /* @__PURE__ */ me(wh, [["__scopeId", "data-v-0f7806d6"]]), Ch = { class: "chart-container" }, $h = ["viewBox"], Sh = ["transform"], Mh = ["x", "width", "fill", "stroke"], Dh = ["fill"], Th = ["x1", "y1", "x2", "y2", "stroke"], Ah = ["points", "fill"], Bh = ["x1", "y1", "x2", "y2", "stroke"], Lh = ["x", "y", "fill"], Ph = ["x1", "y1", "x2", "y2", "stroke"], Rh = ["points", "fill"], Ih = ["transform"], Eh = ["y1", "y2"], Fh = ["y1", "y2"], Oh = ["y1", "y2"], Vh = ["y1", "y2"], zh = ["y", "height"], Nh = ["y1", "y2"], Hh = ["y1", "y2"], Wh = ["y1", "y2"], jh = ["y1", "y2"], Kh = ["y", "height"], Yh = ["cy", "stroke", "onMouseenter"], Uh = ["cy", "stroke", "onMouseenter"], qh = ["cy", "stroke", "onMouseenter"], Xh = ["cy", "stroke", "onMouseenter"], Gh = ["y1", "y2", "onMouseenter"], Zh = ["y1", "y2", "onMouseenter"], Qh = ["x", "y", "fill"], Jh = ["x", "y", "fill"], ef = ["transform"], tf = { transform: "translate(-200, 0)" }, nf = ["stroke"], af = ["fill"], sf = { transform: "translate(-130, 0)" }, of = ["stroke"], lf = ["fill"], rf = { transform: "translate(-60, 0)" }, cf = ["stroke"], df = ["fill"], uf = { transform: "translate(10, 0)" }, hf = ["stroke"], ff = ["fill"], gf = { transform: "translate(80, 0)" }, mf = ["fill"], pf = { transform: "translate(150, 0)" }, bf = ["fill"], vf = /* @__PURE__ */ ce({
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
    const n = e, { isDark: a } = Me($e(n, "theme")), s = C(() => ({
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
    })), o = ie({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, l = (m, v) => {
      const f = m.currentTarget.closest("svg");
      if (!f) return;
      const y = f.getBoundingClientRect(), b = f.createSVGPoint();
      b.x = m.clientX - y.left, b.y = m.clientY - y.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: v
      };
    }, r = (m) => {
      if (o.value.visible) {
        const v = m.currentTarget, f = v.getBoundingClientRect(), y = v.createSVGPoint();
        y.x = m.clientX - f.left, y.y = m.clientY - f.top, o.value.x = y.x, o.value.y = y.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, d = () => {
      o.value.visible = !1;
    }, h = C(() => {
      const m = [], f = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let y = 1; y <= 10; y++) {
        const b = y, p = (b - 1) / 9, _ = n.chartMargin + f - p * f;
        m.push({ value: b, y: _ });
      }
      return m;
    });
    return t({ isDark: a }), (m, v) => (g(), x("div", Ch, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        o.value.visible ? (g(), x("g", {
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
        (g(!0), x(oe, null, fe(h.value, (f, y) => (g(), x(oe, { key: y }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Bh),
          u("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(f.value), 9, Lh)
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
        }, null, 8, Rh),
        (g(!0), x(oe, null, fe(e.boxplotData, (f, y) => (g(), x(oe, { key: y }, [
          u("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (g(), x(oe, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Eh),
              u("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Fh),
              u("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Oh),
              u("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Vh),
              u("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, zh)
            ], 64)) : (g(), x(oe, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Nh),
              u("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Hh),
              u("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Wh),
              u("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, jh),
              u("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Kh)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Yh),
            u("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Uh),
            u("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, qh),
            u("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Xh),
            u("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (b) => l(b, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Gh),
            f.averageY ? (g(), x("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => l(b, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Zh)) : z("", !0)
          ], 8, Ih),
          u("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(i(f.label)), 9, Qh),
          f.responseCount ? (g(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(f.responseCount), 9, Jh)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (g(), x("g", {
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
}), yf = /* @__PURE__ */ me(vf, [["__scopeId", "data-v-9ac5c075"]]), xf = { class: "chart-container" }, _f = ["viewBox"], kf = ["x1", "y1", "x2", "y2", "stroke"], wf = ["points", "fill"], Cf = ["x1", "y1", "x2", "y2", "stroke"], $f = ["x1", "y1", "x2", "y2", "stroke"], Sf = ["x", "y", "fill"], Mf = ["x", "y", "fill", "transform"], Df = ["x1", "y1", "x2", "y2", "stroke"], Tf = ["points", "fill"], Af = ["transform"], Bf = ["y1", "y2", "stroke", "onMouseenter"], Lf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Pf = ["x1", "y1", "x2", "y2", "onMouseenter"], Rf = ["x1", "y1", "x2", "y2", "onMouseenter"], If = ["cy", "stroke", "onMouseenter"], Ef = ["cy", "stroke", "onMouseenter"], Ff = ["x", "y", "fill"], Of = ["x", "y", "fill"], Vf = ["transform"], zf = { transform: "translate(-180, 0)" }, Nf = ["stroke"], Hf = ["fill"], Wf = { transform: "translate(-120, 0)" }, jf = ["fill"], Kf = { transform: "translate(-60, 0)" }, Yf = ["fill"], Uf = { transform: "translate(0, 0)" }, qf = ["stroke"], Xf = ["fill"], Gf = { transform: "translate(60, 0)" }, Zf = ["fill"], Qf = { transform: "translate(130, 0)" }, Jf = ["fill"], eg = ["transform"], tg = ["x", "y", "width", "height", "fill", "stroke"], ng = ["y", "fill"], ag = ["y", "fill"], ca = 10, sg = 14, Ha = 13, Ko = 4, Yo = 12, og = /* @__PURE__ */ ce({
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
    const n = e, { isDark: a, colors: s } = Me($e(n, "theme")), o = ca + Ha + Ko + Yo + ca, i = C(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(_, k, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(_, 1) * k * $);
    }
    function r(_, k) {
      return Math.max(
        l(_.length, Ha, !0),
        l(k.length, Yo, !1),
        52
      ) + sg * 2;
    }
    function c(_, k, w, $) {
      const S = w / 2, M = 6, F = Math.min(
        Math.max(_, S + M),
        n.chartWidth - S - M
      ), j = M + $ + 10, E = n.chartHeight - M + 10, T = Math.min(Math.max(k, j), E);
      return { x: F, y: T };
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
    })), h = ie({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), m = (_) => typeof _ == "string" ? _.charAt(0).toUpperCase() + _.slice(1).toLowerCase() : _, v = (_, k, w) => {
      const $ = _.currentTarget.closest("svg");
      if (!$) return;
      const S = $.getBoundingClientRect(), M = $.createSVGPoint();
      M.x = _.clientX - S.left, M.y = _.clientY - S.top;
      let F = m(k.label), j = "";
      switch (w) {
        case "body":
          j = `Q1: ${k.q1.toFixed(1)} | Q3: ${k.q3.toFixed(1)}`;
          break;
        case "wick":
          j = `Min: ${k.low.toFixed(1)} | Max: ${k.high.toFixed(1)}`;
          break;
        case "median":
          j = `Median: ${k.median.toFixed(1)}`;
          break;
        case "average":
          j = `Average: ${k.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          j = `Min: ${k.low.toFixed(1)}`;
          break;
        case "max":
          j = `Max: ${k.high.toFixed(1)}`;
          break;
      }
      const E = r(F, j), T = o;
      let P = M.x, V = M.y - 20;
      const X = c(P, V, E, T);
      P = X.x, V = X.y, h.value = {
        visible: !0,
        x: P,
        y: V,
        title: F,
        text: j,
        width: E,
        height: T
      };
    }, f = (_) => {
      if (h.value.visible) {
        const k = _.currentTarget, w = k.getBoundingClientRect(), $ = k.createSVGPoint();
        $.x = _.clientX - w.left, $.y = _.clientY - w.top;
        let S = $.x, M = $.y - 20;
        const F = c(S, M, h.value.width, h.value.height);
        h.value.x = F.x, h.value.y = F.y;
      }
    }, y = () => {
      h.value.visible = !1;
    }, b = () => {
      h.value.visible = !1;
    }, p = C(() => {
      const _ = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const S = $, M = (S - 1) / 9, F = n.chartMargin + w - M * w;
        _.push({ value: S, y: F });
      }
      return _;
    });
    return t({ isDark: a }), (_, k) => (g(), x("div", xf, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: Ce(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: f,
        onMouseleave: y
      }, [
        k[4] || (k[4] = u("defs", null, [
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
        (g(!0), x(oe, null, fe(p.value, (w, $) => (g(), x("line", {
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
        (g(!0), x(oe, null, fe(p.value, (w, $) => (g(), x(oe, { key: $ }, [
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
        (g(!0), x(oe, null, fe(e.candlestickData, (w, $) => (g(), x(oe, { key: $ }, [
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
              onMouseenter: (S) => v(S, w, "wick"),
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
              onMouseenter: (S) => v(S, w, "body"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Lf),
            w.medianY ? (g(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => v(S, w, "median"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Pf)) : z("", !0),
            w.averageY ? (g(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => v(S, w, "average"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Rf)) : z("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => v(S, w, "min"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, If),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => v(S, w, "max"),
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
          w.responseCount ? (g(), x("text", {
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
        e.showLegend ? (g(), x("g", {
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
            k[0] || (k[0] = u("rect", {
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
            k[1] || (k[1] = u("rect", {
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
            k[2] || (k[2] = u("line", {
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
            k[3] || (k[3] = u("line", {
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
        h.value.visible ? (g(), x("g", {
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
            y: -h.value.height - 10 + ca,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, ng),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ca + Ha + Ko,
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
}), ig = /* @__PURE__ */ me(og, [["__scopeId", "data-v-22efd66d"]]), lg = ["viewBox"], rg = ["x1", "y1", "x2", "y2", "stroke"], cg = ["x1", "y1", "x2", "y2", "stroke"], dg = ["points", "fill"], ug = ["x1", "y1", "x2", "y2", "stroke"], hg = ["x", "y", "fill"], fg = ["x", "y", "fill", "transform"], gg = ["x1", "y1", "x2", "y2", "stroke"], mg = ["points", "fill"], pg = ["x1", "y1", "x2", "y2", "stroke"], bg = ["x", "y", "fill"], vg = ["x", "y", "fill"], yg = ["d"], xg = ["x", "y", "width", "height", "onMouseenter"], _g = ["x1", "y1", "x2", "y2"], kg = ["x", "y"], wg = ["x1", "y1", "x2", "y2"], Cg = ["x", "y"], $g = ["x1", "y1", "x2", "y2"], Sg = ["x", "y"], Mg = ["x1", "y1", "x2", "y2"], Dg = ["x", "y"], Tg = ["x1", "y1", "x2", "y2"], Ag = ["x", "y"], Bg = ["x1", "y1", "x2", "y2"], Lg = ["x", "y"], Pg = ["transform"], Rg = { transform: "translate(-220, 0)" }, Ig = ["fill"], Eg = { transform: "translate(-140, 0)" }, Fg = ["fill"], Og = { transform: "translate(-80, 0)" }, Vg = ["fill"], zg = { transform: "translate(-20, 0)" }, Ng = ["fill"], Hg = { transform: "translate(60, 0)" }, Wg = ["fill"], jg = { transform: "translate(130, 0)" }, Kg = ["fill"], Yg = { transform: "translate(180, 0)" }, Ug = ["fill"], qg = ["transform"], Xg = ["x", "y", "width", "height", "fill", "stroke"], Gg = ["y", "fill"], Zg = ["y", "fill"], da = 10, Qg = 14, Wa = 13, Uo = 12, qo = 4, Jg = /* @__PURE__ */ ce({
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
    const n = e, { isDark: a, colors: s } = Me($e(n, "theme")), o = da + Wa + qo + Uo + da, i = C(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(U, K, q) {
      const re = q ? 0.6 : 0.535;
      return Math.ceil(Math.max(U, 1) * K * re);
    }
    function r(U, K) {
      return Math.max(
        l(U.length, Wa, !0),
        l(K.length, Uo, !1),
        52
      ) + Qg * 2;
    }
    function c(U, K, q, re) {
      const he = q / 2, I = 6, Y = Math.min(
        Math.max(U, he + I),
        n.chartWidth - he - I
      ), ne = I + re + 10, de = n.chartHeight - I + 10, be = Math.min(Math.max(K, ne), de);
      return { x: Y, y: be };
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
    })), h = ie({
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
    ), v = C(() => n.chartMargin + n.plotInset), f = C(
      () => n.chartWidth - m.value - n.plotInset
    ), y = C(() => Math.max(f.value - v.value, 1)), b = C(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), p = C(() => y.value / 10 * 0.52);
    function _(U) {
      if (U < 1 || U > 10) return null;
      const K = y.value / 10;
      return v.value + (U - 0.5) * K;
    }
    const k = C(
      () => Array.from({ length: 10 }, (U, K) => {
        const q = K + 1, re = _(q);
        return re === null ? null : { score: q, x: re };
      }).filter((U) => U !== null)
    ), w = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const U = Math.max(...n.histogram.map((q) => q.count || 0), 1), K = Math.max(1, Math.ceil(U * 0.2));
      return U + K;
    }), $ = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const U = n.averageScore || 0;
      let K = 0, q = 0;
      if (n.histogram.forEach((he) => {
        const I = he.count || 0;
        K += I;
        const Y = he.score - U;
        q += I * (Y * Y);
      }), K === 0) return 1;
      const re = q / K;
      return Math.sqrt(re) || 1;
    }), S = (U, K, q) => {
      if (q === 0) return 0;
      const re = 1 / (q * Math.sqrt(2 * Math.PI)), he = -0.5 * Math.pow((U - K) / q, 2);
      return re * Math.exp(he);
    }, M = C(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && $.value === 0) return null;
      const U = n.averageScore, K = $.value, q = 100, he = Math.max(...n.histogram.map((de) => de.count || 0), 1) / w.value * b.value;
      if (he <= 0) return null;
      let I = 0;
      for (let de = 0; de <= q; de++) {
        const be = 1 + 9 * (de / q), xe = S(be, U, K);
        xe > I && (I = xe);
      }
      if (I <= 0) return null;
      const Y = he / I, ne = [];
      for (let de = 0; de <= q; de++) {
        const be = 1 + 9 * (de / q), xe = S(be, U, K) * Y, Le = _(be);
        if (Le !== null) {
          const et = n.chartHeight - n.chartBottomMargin - xe;
          ne.push(`${de === 0 ? "M" : "L"} ${Le} ${et}`);
        }
      }
      return ne.join(" ");
    }), F = C(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const U = y.value / 10;
      return n.histogram.map((K) => {
        const q = Number(K.score);
        if (!Number.isFinite(q) || q < 1 || q > 10)
          return null;
        const re = v.value + (q - 0.5) * U, he = K.count > 0 ? K.count / w.value * b.value : 0, I = n.chartHeight - n.chartBottomMargin - he;
        return {
          score: q,
          count: K.count,
          x: re,
          y: I,
          height: he
        };
      }).filter((K) => K !== null);
    }), j = C(() => _(n.minScore)), E = C(() => _(n.maxScore)), T = C(() => _(n.q1Score)), P = C(() => _(n.medianScore)), V = C(() => _(n.q3Score)), X = C(() => _(n.averageScore)), Z = C(() => n.minScore), ae = C(() => n.maxScore), se = C(() => n.q1Score), ge = C(() => n.medianScore), pe = C(() => n.q3Score), L = C(() => n.averageScore), R = C(() => {
      const U = [], K = n.chartMargin - 8, q = 18;
      T.value !== null && U.push({
        x: T.value,
        y: K,
        value: n.q1Score,
        label: `Q1: ${se.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), P.value !== null && U.push({
        x: P.value,
        y: K - q,
        value: n.medianScore,
        label: `Median: ${ge.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), X.value !== null && U.push({
        x: X.value,
        y: K - q,
        value: n.averageScore,
        label: `Avg: ${L.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), V.value !== null && U.push({
        x: V.value,
        y: K,
        value: n.q3Score,
        label: `Q3: ${pe.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), U.sort((I, Y) => (I.x || 0) - (Y.x || 0));
      const re = [[], [], []];
      U.forEach((I) => {
        if (I.x === null) return;
        let Y = -1;
        for (let ne = 0; ne < re.length; ne++) {
          let de = !1;
          for (const be of re[ne]) {
            if (be.x === null) continue;
            const xe = Math.abs(I.x - be.x), Le = (I.width + be.width) / 2 + 10;
            if (xe < Le) {
              de = !0;
              break;
            }
          }
          if (!de) {
            Y = ne;
            break;
          }
        }
        Y === -1 && (Y = re.length - 1), I.y = K - Y * q, re[Y].push(I);
      });
      const he = 15;
      return U.forEach((I) => {
        I.y < he && (I.y = he);
      }), U;
    }), H = (U) => R.value.find((q) => q.id === U)?.y || n.chartMargin - 10, ee = C(() => {
      const U = [];
      for (let q = 0; q <= 5; q++) {
        const re = Math.round(w.value / 5 * q), he = n.chartHeight - n.chartBottomMargin - q / 5 * b.value;
        U.push({ value: re, y: he });
      }
      return U;
    });
    function ue(U, K, q) {
      const re = U.createSVGPoint();
      re.x = K, re.y = q;
      const he = U.getScreenCTM();
      if (!he) {
        const Y = U.getBoundingClientRect();
        return { x: K - Y.left, y: q - Y.top };
      }
      const I = re.matrixTransform(he.inverse());
      return { x: I.x, y: I.y };
    }
    const De = (U, K) => {
      n.interactive && Q(U, K);
    }, Se = () => {
      n.interactive && G();
    }, Q = (U, K) => {
      const q = U.currentTarget.closest("svg");
      if (!q) return;
      const { x: re, y: he } = ue(q, U.clientX, U.clientY), I = `Score: ${K.score}`, Y = `Count: ${Number(K.count ?? 0).toLocaleString()}`, ne = r(I, Y), de = o, be = typeof K?.x == "number" ? K.x : re;
      let xe = he - 20;
      const Le = c(be, xe, ne, de);
      h.value = {
        visible: !0,
        x: Le.x,
        y: Le.y,
        title: I,
        text: Y,
        width: ne,
        height: de,
        anchorX: typeof K?.x == "number" ? K.x : null
      };
    }, N = (U) => {
      if (n.interactive && h.value.visible) {
        const K = U.currentTarget, { x: q, y: re } = ue(K, U.clientX, U.clientY), he = h.value.anchorX, I = he != null && Number.isFinite(he) ? he : q;
        let Y = re - 20;
        const ne = c(I, Y, h.value.width, h.value.height);
        h.value.x = ne.x, h.value.y = ne.y;
      }
    }, W = () => {
      G();
    }, G = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (U, K) => (g(), x("div", {
      class: J(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: N,
        onMouseleave: W
      }, [
        K[7] || (K[7] = u("defs", null, [
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
        (g(!0), x(oe, null, fe(ee.value, (q, re) => (g(), x("line", {
          key: `grid-${re}`,
          x1: v.value,
          y1: q.y,
          x2: f.value,
          y2: q.y,
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
        (g(!0), x(oe, null, fe(ee.value, (q, re) => (g(), x(oe, {
          key: `y-tick-${re}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: q.y,
            x2: e.chartMargin,
            y2: q.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, ug),
          u("text", {
            x: e.chartMargin - 12,
            y: q.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(q.value), 9, hg)
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
          x2: f.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, gg),
        u("polygon", {
          points: `${f.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${f.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${f.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, mg),
        (g(!0), x(oe, null, fe(k.value, (q) => (g(), x(oe, {
          key: `tick-${q.score}`
        }, [
          u("line", {
            x1: q.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: q.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, pg),
          u("text", {
            x: q.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(q.score), 9, bg)
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
        M.value ? (g(), x("path", {
          key: 0,
          d: M.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, yg)) : z("", !0),
        (g(!0), x(oe, null, fe(F.value, (q, re) => (g(), x("rect", {
          key: `bar-${re}`,
          x: q.x - p.value / 2,
          y: q.y,
          width: p.value,
          height: q.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (he) => De(he, q),
          onMouseleave: Se,
          style: Ce({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, xg))), 128)),
        e.showStatLabels && j.value ? (g(), x("line", {
          key: 1,
          x1: j.value,
          y1: e.chartMargin,
          x2: j.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, _g)) : z("", !0),
        e.showStatLabels && j.value ? (g(), x("text", {
          key: 2,
          x: j.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + D(Z.value.toFixed(1)), 9, kg)) : z("", !0),
        e.showStatLabels && T.value ? (g(), x("line", {
          key: 3,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, wg)) : z("", !0),
        e.showStatLabels && T.value ? (g(), x("text", {
          key: 4,
          x: T.value,
          y: H("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + D(se.value.toFixed(1)), 9, Cg)) : z("", !0),
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
        }, null, 8, $g)) : z("", !0),
        e.showStatLabels && P.value ? (g(), x("text", {
          key: 6,
          x: P.value,
          y: H("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + D(ge.value.toFixed(1)), 9, Sg)) : z("", !0),
        e.showStatLabels && X.value ? (g(), x("line", {
          key: 7,
          x1: X.value,
          y1: e.chartMargin,
          x2: X.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Mg)) : z("", !0),
        e.showStatLabels && X.value ? (g(), x("text", {
          key: 8,
          x: X.value,
          y: H("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + D(L.value.toFixed(1)), 9, Dg)) : z("", !0),
        e.showStatLabels && V.value ? (g(), x("line", {
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
        e.showStatLabels && V.value ? (g(), x("text", {
          key: 10,
          x: V.value,
          y: H("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + D(pe.value.toFixed(1)), 9, Ag)) : z("", !0),
        e.showStatLabels && E.value ? (g(), x("line", {
          key: 11,
          x1: E.value,
          y1: e.chartMargin,
          x2: E.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Bg)) : z("", !0),
        e.showStatLabels && E.value ? (g(), x("text", {
          key: 12,
          x: E.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + D(ae.value.toFixed(1)), 9, Lg)) : z("", !0),
        e.showLegend ? (g(), x("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", Rg, [
            K[0] || (K[0] = u("line", {
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
            }, " Gaussian ", 8, Ig)
          ]),
          u("g", Eg, [
            K[1] || (K[1] = u("line", {
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
            K[2] || (K[2] = u("line", {
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
            K[3] || (K[3] = u("line", {
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
            K[4] || (K[4] = u("line", {
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
            K[5] || (K[5] = u("line", {
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
            K[6] || (K[6] = u("line", {
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
        e.interactive && h.value.visible ? (g(), x("g", {
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
            y: -h.value.height - 10 + da,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, Gg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + da + Wa + qo,
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
  const e = ie(
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
}, en = 12, sm = /* @__PURE__ */ ce({
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
    const n = e, { isDark: a, colors: s } = Me($e(n, "theme")), { breakpoint: o } = tm(), i = ie(null), l = ie(!0), r = ie(!1);
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
    }, f = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, y = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, b = C(() => {
      const Q = o.value;
      return Q === "mobile" ? {
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
      } : Q === "tablet" ? {
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
    }), p = (Q) => {
      const N = Q.replace(/_/g, " ").replace(/\s+/g, " ").trim(), W = N.match(/^Failed:\s*(.+)$/i);
      return W ? `Failed:
${W[1].trim()}` : N;
    }, _ = (Q, N) => {
      const W = Q.trim();
      if (!W || N < 1 || W.length <= N) return W;
      const G = [];
      let U = 0;
      for (; U < W.length; ) {
        const K = Math.min(U + N, W.length);
        if (K >= W.length) {
          const he = W.slice(U).trim();
          he && G.push(he);
          break;
        }
        const q = W.slice(U, K), re = q.lastIndexOf(" ");
        if (re > 0)
          for (G.push(W.slice(U, U + re).trim()), U += re; U < W.length && W[U] === " "; ) U += 1;
        else
          G.push(q), U = K;
      }
      return G.join(`
`);
    }, k = (Q, N) => {
      const W = Q.trim();
      return !W || N < 1 ? Q : W.split(`
`).map((G) => _(G.trim(), N)).filter(Boolean).join(`
`);
    }, w = (Q) => Q.status ? Q.status : f.test(Q.name) ? "abandon" : y.test(Q.name) ? "error" : "success", $ = (Q) => Q.originalValue ?? Q.value, S = (Q, N) => {
      const W = new Set(N.map((U) => U.target)), G = Q.filter((U) => !W.has(U.name));
      for (const U of G) {
        if (typeof U.value == "number" && U.value > 0) return U.value;
        const K = N.filter((q) => q.source === U.name);
        if (K.length > 0)
          return K.reduce((q, re) => q + $(re), 0);
      }
      return N.reduce((U, K) => Math.max(U, $(K)), 0);
    }, M = (Q, N, W) => {
      if (W && typeof W.value == "number") return W.value;
      const G = N.filter((K) => K.target === Q);
      return G.length > 0 ? G.reduce((K, q) => K + $(q), 0) : N.filter((K) => K.source === Q).reduce((K, q) => K + $(q), 0);
    }, F = (Q, N) => {
      const W = /* @__PURE__ */ new Map(), G = new Set(N.map((K) => K.target)), U = Q.filter((K) => !G.has(K.name)).map((K) => ({ name: K.name, depth: 0 }));
      for (; U.length > 0; ) {
        const { name: K, depth: q } = U.shift(), re = W.get(K);
        if (!(re !== void 0 && re >= q)) {
          W.set(K, q);
          for (const he of N)
            he.source === K && U.push({ name: he.target, depth: q + 1 });
        }
      }
      for (const K of Q)
        W.has(K.name) || W.set(K.name, 0);
      return W;
    }, j = (Q, N) => {
      const W = /* @__PURE__ */ new Map(), G = new Set(N.map((re) => re.target)), U = Q.filter((re) => !G.has(re.name));
      let K = 0;
      const q = (re) => {
        let he = re;
        for (; he && !W.has(he); )
          W.set(he, K), K += 1, he = N.filter(
            (Y) => Y.source === he && w({ name: Y.target }) === "success"
          ).sort((Y, ne) => $(ne) - $(Y))[0]?.target;
      };
      return U.forEach((re) => q(re.name)), W;
    }, E = (Q, N, W) => {
      const G = w(Q);
      if (G === "success" && W.has(Q.name))
        return W.get(Q.name);
      if (G === "success") {
        const U = N.filter((q) => q.target === Q.name);
        return 200 + (U.length ? Math.min(
          ...U.map(
            (q) => W.has(q.source) ? (W.get(q.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return G === "abandon" ? 1e3 : 2e3;
    }, T = (Q, N) => {
      const W = F(Q, N), G = j(Q, N);
      return [...Q].sort((U, K) => {
        const q = W.get(U.name) ?? 0, re = W.get(K.name) ?? 0;
        if (q !== re) return q - re;
        const he = v[w(U)], I = v[w(K)];
        if (he !== I) return he - I;
        const Y = E(U, N, G), ne = E(K, N, G);
        return Y !== ne ? Y - ne : U.name.localeCompare(K.name);
      });
    }, P = (Q, N, W, G) => {
      const K = k(Q, G).split(`
`), q = N * 0.58, he = Math.max(...K.map((Y) => Y.length), 1) * q, I = K.length * W;
      return {
        lines: K,
        width: he,
        height: I,
        nodeWidth: he + en * 2
      };
    }, V = (Q, N) => N ? `${(Q / N * 100).toFixed(1)}%` : "0.0%", X = (Q, N, W, G, U) => {
      if (typeof Q.label == "string" && Q.label)
        return k(p(Q.label), U);
      const K = k(p(Q.name), U);
      if (N === "success" && W > 0) {
        const q = M(Q.name, G, Q), re = V(q, W);
        return `${K}
(${re})`;
      }
      return K;
    }, Z = (Q, N = 0) => {
      if (N > 0) return N;
      const W = Q.match(/^(\d+(?:\.\d+)?)px$/);
      if (W) return Number(W[1]);
      const G = Q.match(/^(\d+(?:\.\d+)?)vh$/);
      return G && typeof window < "u" ? Number(G[1]) / 100 * window.innerHeight : 500;
    }, ae = (Q, N, W, G, U) => {
      if (!N.length || !Q.length || U <= 0) return Q;
      const K = Q.map((be) => ({ ...be })), q = W.labelLineHeight || Math.round(W.labelFontSize * 1.25), re = Math.max(4, W.labelCharsPerLine), he = Math.max(G * 0.88, 260), I = F(N, K), Y = /* @__PURE__ */ new Map();
      N.forEach((be) => {
        const xe = I.get(be.name) ?? 0;
        Y.set(xe, (Y.get(xe) ?? 0) + 1);
      });
      const ne = (be) => {
        const Le = N.find((Gt) => Gt.name === be)?.displayLabel || be, dt = P(Le, W.labelFontSize, q, re).height + en * 2, Xt = I.get(be) ?? 0, xt = Y.get(Xt) ?? 1, un = (Math.max(xt, 1) - 1) * W.nodeGap / Math.max(xt, 1), Ta = Math.max(he - un, dt);
        return Math.max(1, dt / Ta * U);
      }, de = (be) => {
        const xe = K.filter((Le) => Le.target === be);
        return xe.length > 0 ? xe.reduce((Le, et) => Le + et.value, 0) : K.filter((Le) => Le.source === be).reduce((Le, et) => Le + et.value, 0);
      };
      for (let be = 0; be < 16; be += 1) {
        let xe = !1;
        for (const Le of N) {
          const et = ne(Le.name), dt = de(Le.name);
          if (dt >= et) continue;
          const Xt = K.filter((Gt) => Gt.target === Le.name), xt = K.filter((Gt) => Gt.source === Le.name), un = Xt.length > 0 ? Xt : xt;
          if (un.length === 0) continue;
          const Ta = et / Math.max(dt, 1e-6);
          un.forEach((Gt) => {
            Gt.value *= Ta;
          }), xe = !0;
        }
        if (!xe) break;
      }
      return K;
    }, se = (Q, N, W) => {
      const G = S(Q, N), U = T(Q, N), K = W.labelLineHeight || Math.round(W.labelFontSize * 1.25), q = Math.max(4, W.labelCharsPerLine);
      let re = W.nodeWidth;
      const he = [], I = U.map((ne, de) => {
        const be = w(ne), xe = X(
          ne,
          be,
          G,
          N,
          q
        );
        he.push(xe);
        const Le = P(xe, W.labelFontSize, K, q);
        W.orient === "vertical" ? re = Math.max(re, Le.height + en * 2) : re = Math.max(re, Le.nodeWidth);
        const et = n.nodeColors[ne.name] || m[be] || ge[de % ge.length], dt = Math.max(Math.ceil(Le.nodeWidth - en * 2), 48);
        return {
          ...ne,
          displayLabel: xe,
          label: {
            width: dt,
            overflow: "none",
            lineHeight: K,
            fontSize: W.labelFontSize
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
      let Y = { ...W.contentMargins };
      if (W.orient === "vertical") {
        const ne = Math.max(
          ...he.map(
            (be) => P(be, W.labelFontSize, K, q).width
          ),
          0
        ), de = typeof Y.right == "number" ? Y.right : 10;
        Y = {
          ...Y,
          right: Math.max(de, ne + en + W.labelDistance)
        };
      }
      return { nodes: I, maxNodeWidth: re, contentMargins: Y, originTotal: G };
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
    ], pe = () => {
      const Q = n.data.links.filter(
        (U) => U.source && U.target && typeof U.value == "number"
      ), N = Math.max(...Q.map((U) => U.value), 1), W = Math.max(1, N * 0.01), G = Q.map((U) => ({
        ...U,
        originalValue: U.value,
        value: U.value < N * 0.01 ? W : U.value
      }));
      return {
        nodes: n.data.nodes.filter((U) => U.name),
        links: G
      };
    }, L = (Q) => (N) => {
      const W = N.dataType === "node", G = s.value.tooltipText, U = a.value ? "#d1d5db" : "#e2e8f0";
      if (W) {
        const I = Q.filter((de) => de.target === N.name), Y = Q.filter((de) => de.source === N.name), ne = I.length > 0 ? I.reduce((de, be) => de + (be.originalValue || be.value), 0) : Y.reduce((de, be) => de + (be.originalValue || be.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${G};">${N.name}</div><div style="color: ${U}; font-size: 12px;">Count: ${ne.toLocaleString()}</div>`;
      }
      const K = N.data?.source || N.source || "Unknown", q = N.data?.target || N.target || "Unknown", re = N.data?.originalValue || N.data?.value || N.value || 0, he = N.data?.label || `${re.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${G};">${K} → ${q}</div><div style="color: ${U}; font-size: 12px;">Flow: ${he}</div>`;
    }, R = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const Q = b.value, N = a.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", W = a.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", G = a.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", U = Q.labelPosition === "inside" ? "#ffffff" : a.value ? s.value.textPrimary : "#334155";
      try {
        const { nodes: K, links: q } = pe(), { nodes: re, maxNodeWidth: he, contentMargins: I, originTotal: Y } = se(
          K,
          q,
          Q
        ), ne = Z(n.height, i.value?.clientHeight ?? 0), de = ae(
          q,
          re,
          {
            labelFontSize: Q.labelFontSize,
            labelLineHeight: Q.labelLineHeight || Math.round(Q.labelFontSize * 1.25),
            labelCharsPerLine: Q.labelCharsPerLine,
            nodeGap: Q.nodeGap
          },
          ne,
          Y
        ), be = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: L(de),
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
              links: de,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: W,
                  opacity: 1
                }
              },
              lineStyle: {
                color: N,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...h.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: Q.labelPosition,
                color: U,
                fontWeight: 700,
                fontSize: Q.labelFontSize,
                lineHeight: Q.labelLineHeight || Math.round(Q.labelFontSize * 1.25),
                padding: en,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...Q.orient === "horizontal" ? { width: Math.max(he - en * 2, 48), overflow: "none" } : Q.labelWrap && Q.labelTextWidth > 0 ? { width: Q.labelTextWidth, overflow: "none" } : {},
                ...Q.labelDistance > 0 ? { distance: Q.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (xe) => xe.data?.displayLabel || xe.name || ""
              },
              edgeLabel: Q.edgeLabelShow ? {
                show: !0,
                fontSize: Q.edgeLabelFontSize,
                color: G,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (xe) => {
                  if (xe.data?.label) return xe.data.label;
                  const Le = xe.data?.originalValue ?? xe.value ?? 0, et = xe.data?.source ?? xe.source, dt = de.filter((xt) => xt.source === et).reduce((xt, un) => xt + $(un), 0), Xt = V(Le, dt);
                  return `${Number(Le).toLocaleString()} (${Xt})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: Q.nodeGap,
              nodeWidth: he,
              layoutIterations: h.node.iterations,
              orient: Q.orient,
              draggable: !1,
              ...I
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(be), c.resize();
      } catch (K) {
        console.error("Error setting Sankey chart options:", K), r.value = !0;
      }
    }, H = async () => {
      if (i.value)
        try {
          c = Ss.init(i.value), R(), window.addEventListener("resize", De);
        } catch (Q) {
          console.error("Error initializing Sankey chart:", Q), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, ee = () => {
      const Q = i.value;
      return !!(Q && Q.clientWidth > 0 && Q.clientHeight > 0);
    }, ue = async () => {
      if (await We(), ee()) return H();
      await new Promise((Q) => {
        const N = i.value;
        if (!N) {
          Q();
          return;
        }
        d = new ResizeObserver(() => {
          ee() && (d?.disconnect(), d = null, H().then(Q));
        }), d.observe(N);
      });
    }, De = () => c?.resize(), Se = () => {
      window.removeEventListener("resize", De), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return tt(() => ue()), si(Se), Oe(() => n.data, R, { deep: !0 }), Oe(a, R), Oe(o, R), t({ isDark: a }), (Q, N) => (g(), x("div", nm, [
      r.value ? (g(), x("div", {
        key: 0,
        class: "error-state",
        style: Ce({ height: e.height })
      }, [...N[0] || (N[0] = [
        Cs('<div class="error-content" data-v-b04b208a><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b04b208a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b04b208a></path></svg><p class="error-title" data-v-b04b208a>Chart could not be loaded</p><p class="error-description" data-v-b04b208a>Please check the data format.</p></div>', 1)
      ])], 4)) : (g(), x("div", {
        key: 1,
        class: "chart-wrapper",
        style: Ce({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (g(), x("div", am, [...N[1] || (N[1] = [
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
}, Dm = { class: "chart-metric-container__body" }, Tm = /* @__PURE__ */ ce({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = ie(t.defaultOpen), a = es();
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
    return (l, r) => e.collapsible ? (g(), x("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      u("summary", im, [
        u("div", lm, [
          u("div", rm, [
            u("div", cm, [
              O(Te, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: B(() => [
                  e.loading ? (g(), x("div", dm)) : (g(), x("div", um, [
                    we(l.$slots, "title", {}, () => [
                      e.title ? (g(), x("h3", hm, D(e.title), 1)) : z("", !0)
                    ], !0),
                    e.subtitle ? (g(), x("p", fm, D(e.subtitle), 1)) : z("", !0),
                    we(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            o.value ? (g(), x("div", gm, [
              we(l.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          l.$slots.headerAside ? (g(), x("div", mm, [
            we(l.$slots, "headerAside", {}, void 0, !0)
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
        we(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, om)) : (g(), x("div", bm, [
      u("div", vm, [
        u("div", ym, [
          u("div", xm, [
            u("div", _m, [
              O(Te, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: B(() => [
                  e.loading ? (g(), x("div", km, [...r[1] || (r[1] = [
                    u("div", { class: "ut-skeleton-title-subtitle" }, [
                      u("div", { class: "ut-skeleton-blink ut-skeleton-title" }),
                      u("div", { class: "ut-skeleton-blink ut-skeleton-subtitle" })
                    ], -1),
                    u("div", { class: "ut-skeleton-blink ut-skeleton-options" }, null, -1)
                  ])])) : (g(), x("div", wm, [
                    we(l.$slots, "title", {}, () => [
                      e.title ? (g(), x("h3", Cm, D(e.title), 1)) : z("", !0)
                    ], !0),
                    e.subtitle ? (g(), x("p", $m, D(e.subtitle), 1)) : z("", !0),
                    we(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            o.value ? (g(), x("div", Sm, [
              we(l.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          l.$slots.headerAside ? (g(), x("div", Mm, [
            we(l.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ])
      ]),
      u("div", Dm, [
        we(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ke = /* @__PURE__ */ me(Tm, [["__scopeId", "data-v-8741c0a0"]]);
function Am(e, t) {
  return g(), x("svg", {
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
  return g(), x("svg", {
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
  return g(), x("svg", {
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
  return g(), x("svg", {
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
function Yn(e, t) {
  return g(), x("svg", {
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
  return g(), x("svg", {
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
  return g(), x("svg", {
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
  return g(), x("svg", {
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
  return g(), x("svg", {
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
  return g(), x("svg", {
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
const Rm = {
  key: 0,
  class: "footer-divider"
}, Im = {
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
}, Wm = /* @__PURE__ */ ce({
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
    return (r, c) => (g(), te(Ft(s.value), {
      class: J(o.value)
    }, {
      default: B(() => [
        e.variant === "footer" ? (g(), x("div", Rm)) : z("", !0),
        u("div", {
          class: J(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (g(), x("span", Im, "Export")) : z("", !0),
          u("div", Em, [
            i("pdf") ? (g(), x("button", {
              key: 0,
              type: "button",
              class: J(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => l("pdf"))
            }, [
              e.loading ? (g(), x("svg", Om, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (g(), x("svg", Vm, [...c[3] || (c[3] = [
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
            i("csv") ? (g(), x("button", {
              key: 1,
              type: "button",
              class: J(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => l("csv"))
            }, [
              e.loading ? (g(), x("svg", Nm, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (g(), x("svg", Hm, [...c[6] || (c[6] = [
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
}, qm = { class: "max-w-[360px] text-center" }, Xm = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Gm = /* @__PURE__ */ ce({
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
    }, l = $e(s, "theme"), r = $e(s, "options"), { isDark: c } = Me(l), d = (m) => {
      const v = new Date(m), f = String(v.getDate()).padStart(2, "0"), y = String(v.getMonth() + 1).padStart(2, "0");
      return `${f}-${y}`;
    }, h = C(() => {
      const m = s.data?.agents_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((k) => d(k)), y = /* @__PURE__ */ new Set();
      for (const k of Object.values(m))
        for (const w of Object.keys(k))
          y.add(w);
      const b = Array.from(y), p = (k) => k, _ = b.map((k) => ({
        label: k,
        data: v.map((w) => m[w]?.[k] || 0),
        backgroundColor: `${a[k] || "#94a3b8"}80`,
        borderColor: p(a[k] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: _
      };
    });
    return t({ isDark: c }), (m, v) => (g(), te(ke, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", jm, [
          O(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              e.loading ? (g(), x("div", {
                key: "loading",
                class: J(["flex h-[320px] flex-col gap-3 px-4 pb-4", ["sk-root", { "sk-root--dark": A(c) }]]),
                "aria-busy": "true",
                "aria-label": "Loading chart"
              }, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 skeleton-shimmer",
                  style: { "border-radius": "10px" },
                  "aria-hidden": "true"
                }, null, -1)
              ])], 2)) : h.value.labels && h.value.labels.length ? (g(), x("section", Km, [
                u("div", Ym, [
                  O(St, {
                    data: h.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (g(), x("section", Um, [
                u("div", qm, [
                  u("div", Xm, [
                    O(A(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), Zm = /* @__PURE__ */ me(Gm, [["__scopeId", "data-v-36bec153"]]), dn = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ve = (e, t) => `${e.toLocaleString()} (${dn(e, t)})`, Qm = { class: "flex w-full min-w-0 justify-center" }, Jm = { class: "flex max-w-full min-w-0 items-center gap-2" }, ep = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, tp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, np = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, ap = /* @__PURE__ */ ce({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (g(), x("div", {
      class: J(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", Qm, [
        u("div", Jm, [
          e.color ? (g(), x("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: Ce({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", ep, D(e.title), 1)
        ])
      ]),
      u("p", tp, D(e.value), 1),
      e.subvalue ? (g(), x("p", np, D(e.subvalue), 1)) : z("", !0)
    ], 2));
  }
}), ye = /* @__PURE__ */ me(ap, [["__scopeId", "data-v-0d546967"]]), sp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Xe = /* @__PURE__ */ ce({
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
    return (l, r) => n.value ? (g(), x("span", {
      key: 0,
      role: "status",
      class: J(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (g(), x("span", sp, [...r[0] || (r[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : z("", !0),
      u("span", {
        class: J(["min-w-0 flex-1 text-center", o.value])
      }, D(a.value), 3)
    ], 2)) : (g(), x("span", {
      key: 1,
      class: J(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      we(l.$slots, "default", {}, () => [
        Be(D(e.label), 1)
      ])
    ], 2));
  }
}), le = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Pe = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
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
}, hp = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = ie(!1), o = "—";
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
      const S = w[n.rowKey];
      return typeof S == "string" || typeof S == "number" ? S : $;
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
    function f(w) {
      return m(w) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const y = C(() => n.rows?.length ?? 0), b = C(() => y.value > n.maxVisibleRows), p = C(() => Math.max(0, y.value - n.maxVisibleRows)), _ = C(() => n.rows?.length ? s.value || !b.value ? n.rows : n.rows.slice(0, n.maxVisibleRows) : []), k = C(
      () => n.viewMoreLabel.replace(/\{count\}/g, String(p.value))
    );
    return (w, $) => (g(), x("div", op, [
      u("div", ip, [
        u("table", lp, [
          u("thead", null, [
            u("tr", null, [
              (g(!0), x(oe, null, fe(e.columns, (S) => (g(), x("th", {
                key: S.key,
                scope: "col",
                class: J(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [l(S.align), S.headerClass]])
              }, [
                S.sortable ? (g(), x("button", {
                  key: 0,
                  type: "button",
                  class: J(["kiut-table-sort-btn inline-flex items-center gap-1", l(S.align)]),
                  "aria-sort": f(S.key),
                  onClick: (M) => v(S.key)
                }, [
                  u("span", null, D(S.label), 1),
                  u("span", cp, [
                    m(S.key) ? (g(), x(oe, { key: 0 }, [
                      e.sortDirection === "asc" ? (g(), x("span", dp, "↑")) : e.sortDirection === "desc" ? (g(), x("span", up, "↓")) : z("", !0)
                    ], 64)) : (g(), x(oe, { key: 1 }, [
                      $[1] || ($[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, rp)) : (g(), x(oe, { key: 1 }, [
                  Be(D(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (g(!0), x(oe, null, fe(_.value, (S, M) => (g(), x("tr", {
              key: h(S, M)
            }, [
              (g(!0), x(oe, null, fe(e.columns, (F) => (g(), x("td", {
                key: `${M}-${F.key}`,
                class: J(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(F.align), F.cellClass]])
              }, [
                we(w.$slots, r(F.key), {
                  row: S,
                  column: F,
                  value: c(S, F.key)
                }, () => [
                  Be(D(i(c(S, F.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      b.value ? (g(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (S) => s.value = !s.value)
      }, [
        Be(D(s.value ? e.viewLessLabel : k.value) + " ", 1),
        (g(), x("svg", {
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
}, Ap = /* @__PURE__ */ ce({
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
    function n(p) {
      return p;
    }
    const a = e, s = t, o = (p) => {
      s("export", p);
    }, i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (p, _) => new Date(p.date).getTime() - new Date(_.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], r = C(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = C(() => a.data?.total_payment_success_value || []), d = C(() => {
      const p = c.value;
      return p.length === 0 ? f(0) : p.map(
        (_) => `${_.currency} ${f(_.total_value)}`
      ).join(" · ");
    }), h = (p) => p.payment_success_value || [], m = (p) => typeof p.payment_success_count == "number" ? p.payment_success_count : (p.payment_success_value || []).reduce(
      (_, k) => _ + (k.count || 0),
      0
    ), v = (p) => Pe(p), f = (p) => p == null ? "0" : Et(p);
    C(() => (a.data?.total_payment_success_value || []).reduce(
      (p, _) => p + (_.total_value || 0),
      0
    ));
    const y = C(() => {
      const p = a.data, _ = p.total_booking_initiated || 0, k = p.total_booking_started || 0, w = p.total_payment_initiated || 0, $ = p.total_not_found || 0, S = p.total_cancelled || 0, M = p.total_no_pending_balance || 0, F = p.total_errors || 0, j = typeof p.total_payment_success == "number" ? p.total_payment_success : (p.total_payment_success_value || []).reduce(
        (ae, se) => ae + (se.count || 0),
        0
      ), E = p.total_payment_failed || 0, T = Math.max(0, _ - k), P = Math.max(
        0,
        k - w - $ - S - M - F
      ), V = (ae, se) => ve(ae, se), X = [
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
      ], Z = [];
      return k > 0 && Z.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: V(k, _)
      }), T > 0 && Z.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: V(T, _)
      }), w > 0 && Z.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: V(w, k)
      }), $ > 0 && Z.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: V($, k)
      }), S > 0 && Z.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: V(S, k)
      }), M > 0 && Z.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: V(M, k)
      }), F > 0 && Z.push({
        source: "Started",
        target: "Errors",
        value: F,
        label: V(F, k)
      }), P > 0 && Z.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: P,
        label: V(P, k)
      }), j > 0 && Z.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: j,
        label: V(j, w)
      }), E > 0 && Z.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: E,
        label: V(E, w)
      }), { nodes: X, links: Z };
    }), b = (p, _) => dn(p, _);
    return (p, _) => (g(), te(ke, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading && !a.error ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", fp, [..._[0] || (_[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : a.error ? (g(), x("div", gp, [
              u("div", mp, [
                _[1] || (_[1] = u("div", { class: "error-icon-wrapper" }, [
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
                _[2] || (_[2] = u("p", { class: "error-title" }, "Error loading data", -1)),
                u("p", pp, D(a.error), 1)
              ])
            ])) : (g(), x("div", bp, [
              u("section", vp, [
                u("div", yp, [
                  O(qt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", xp, [
                O(ye, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (g(), x("section", _p, [
                _[3] || (_[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", kp, [
                  O(rt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: k }) => [
                      u("span", wp, D(A(je)(String(k.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": B(({ row: k }) => [
                      u("span", null, D(A(le)(Number(k.booking_initiated_count))), 1)
                    ]),
                    "cell-started": B(({ row: k }) => [
                      u("span", null, [
                        Be(D(A(le)(Number(k.booking_started_count))) + " ", 1),
                        u("span", Cp, " (" + D(b(
                          Number(k.booking_started_count),
                          Number(k.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": B(({ row: k }) => [
                      u("span", null, D(A(le)(Number(k.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": B(({ row: k }) => [
                      u("div", $p, [
                        O(Xe, { color: "success" }, {
                          default: B(() => [
                            Be(" Success: " + D(A(le)(
                              m(k)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        O(Xe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Failed: " + D(A(le)(Number(k.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": B(({ row: k }) => [
                      h(k).length > 0 ? (g(), x("div", Sp, [
                        (g(!0), x(oe, null, fe(h(
                          k
                        ), (w) => (g(), x("span", {
                          key: `${k.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, D(w.currency) + " " + D(v(w.total_value)), 1))), 128))
                      ])) : (g(), x("span", Mp, "N/A"))
                    ]),
                    "cell-outcomes": B(({ row: k }) => [
                      u("div", Dp, [
                        O(Xe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Not Found: " + D(k.not_found_count ? A(le)(Number(k.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        O(Xe, { color: "warning" }, {
                          default: B(() => [
                            Be(" Cancelled: " + D(k.cancelled_count ? A(le)(Number(k.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        O(Xe, { color: "orange" }, {
                          default: B(() => [
                            Be(" No Balance: " + D(k.no_pending_balance_count ? A(le)(Number(k.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        O(Xe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Errors: " + D(k.error_count ? A(le)(Number(k.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (g(), x("section", Tp, [..._[4] || (_[4] = [
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
}, Rp = {
  key: 0,
  class: "chart-section"
}, Ip = { class: "chart-wrapper" }, Ep = {
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
    const n = t, a = (w) => {
      n("export", w);
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
    }, l = ie([]), r = [
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
    }, d = C(
      () => s.showPaymentLinks ? [...r, c] : r
    ), h = C(
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
    ), m = C(() => {
      const w = s.data;
      return w && (Array.isArray(w.checkin_by_day) && w.checkin_by_day.length > 0 || (w.total_checkin_initiated ?? 0) > 0) ? { ...o, ...w } : s.checkinData ?? o;
    }), v = C(() => {
      const w = s.data;
      return w && (Array.isArray(w.failed_by_step_by_day) && w.failed_by_step_by_day.length > 0 || Array.isArray(w.unrecovered_by_step) && w.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: w.total_checkin_failed ?? 0,
        total_checkin_unrecovered: w.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: w.failed_by_step_by_day ?? [],
        unrecovered_by_step: w.unrecovered_by_step ?? [],
        unrecovered_by_day: w.unrecovered_by_day ?? []
      } : s.failedData ?? i;
    }), f = (w, $) => !$ || $ === 0 ? "0.0%" : dn(w, $), y = (w, $) => {
      const S = le(w), M = f(w, $);
      return `${S} (${M})`;
    }, b = (w) => w.reduce(($, S) => $ + S.failed_count, 0), p = C(() => {
      const w = [], $ = [];
      if (!m.value.total_checkin_initiated)
        return { nodes: w, links: $ };
      w.push({ name: "Checkin Init" }), w.push({ name: "Booking retrive" }), w.push({ name: "Booking retrive success" }), w.push({ name: "Number of Passengers" }), w.push({ name: "Completed" }), w.push({ name: "Closed with BP" });
      const S = m.value.total_checkin_initiated, M = m.value.total_checkin_init, F = m.value.total_checkin_init_abandoned, j = M - F, E = m.value.total_checkin_started, T = m.value.total_checkin_completed, P = m.value.total_checkin_closed, V = v.value.unrecovered_by_step || [], X = V.reduce(
        (ge, pe) => ge + pe.count,
        0
      );
      M > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: M,
        label: ve(M, S)
      });
      const Z = S - M;
      Z > 0 && (w.push({ name: "Abandoned (Init)", status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Z,
        label: ve(Z, S)
      })), F > 0 && (w.push({ name: "Abandoned (Started)", status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: F,
        label: ve(F, S)
      })), j > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: j,
        label: ve(j, S)
      }), E > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: E,
        label: ve(E, S)
      }), T > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: T,
        label: ve(T, E)
      }), V.length > 0 && X > 0 && (w.push({ name: "Unrecovered", status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: X,
        label: ve(X, E)
      }), V.forEach((ge) => {
        const L = ge.step_name.replace(/_/g, " ").split(" ").map((R) => R.charAt(0).toUpperCase() + R.slice(1)).join(" ");
        w.push({ name: L, status: "error" }), $.push({
          source: "Unrecovered",
          target: L,
          value: ge.count,
          label: ve(ge.count, E)
        });
      }));
      const ae = E - (T + X);
      ae > 0 && (w.push({ name: "Abandoned (Flow)", status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: ae,
        label: ve(ae, E)
      }));
      const se = T - P;
      return se > 0 && (w.push({ name: "BP Error", status: "error" }), $.push({
        source: "Completed",
        target: "BP Error",
        value: se,
        label: ve(se, E)
      })), P > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: P,
        label: ve(P, E)
      }), { nodes: w, links: $ };
    }), _ = () => {
      const w = s.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const $ = s.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, k = () => {
      const w = m.value.checkin_by_day || [], $ = v.value.failed_by_step_by_day || [], S = _();
      if (w.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...w].map((M) => {
        const F = $.find(
          (E) => E.date === M.date
        ), j = S.find(
          (E) => E.date === M.date
        );
        return {
          ...M,
          failed_steps: F?.steps || [],
          record_locator_create_payment_count: M.record_locator_create_payment_count ?? j?.record_locator_create_payment_count ?? 0
        };
      }), l.value.sort((M, F) => new Date(M.date) - new Date(F.date));
    };
    return Oe(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        k();
      },
      { deep: !0, immediate: !0 }
    ), (w, $) => (g(), te(ke, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", Lp, [...$[0] || ($[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", Pp, [
              p.value.nodes.length > 0 ? (g(), x("section", Rp, [
                u("div", Ip, [
                  O(qt, {
                    data: p.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : z("", !0),
              l.value && l.value.length > 0 ? (g(), x("section", Ep, [
                u("div", Fp, [
                  O(rt, {
                    columns: d.value,
                    rows: h.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: S }) => [
                      u("span", Op, D(A(je)(String(S.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": B(({ row: S }) => [
                      u("span", null, D(A(le)(S.checkin_initiated_count)), 1)
                    ]),
                    "cell-bookingRetrieve": B(({ row: S }) => [
                      u("span", null, D(y(
                        S.checkin_init_count,
                        S.checkin_initiated_count
                      )), 1)
                    ]),
                    "cell-passengers": B(({ row: S }) => [
                      u("span", null, D(A(le)(S.checkin_started_count)), 1)
                    ]),
                    "cell-completed": B(({ row: S }) => [
                      u("span", null, D(y(
                        S.checkin_completed_count,
                        S.checkin_started_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: S }) => [
                      u("span", Vp, D(y(
                        S.checkin_closed_count,
                        S.checkin_started_count
                      )), 1)
                    ]),
                    "cell-failed": B(({ row: S }) => [
                      u("span", zp, D(y(
                        b(S.failed_steps),
                        S.checkin_started_count
                      )), 1)
                    ]),
                    "cell-reasons": B(({ row: S }) => [
                      S.failed_steps && S.failed_steps.length > 0 ? (g(), x("div", Np, [
                        (g(!0), x(oe, null, fe(S.failed_steps, (M) => (g(), x("div", {
                          key: M.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Hp, D(M.step_name.replace(/_/g, " ")) + ":", 1),
                          u("span", Wp, D(M.failed_count), 1)
                        ]))), 128))
                      ])) : (g(), x("div", jp, "-"))
                    ]),
                    "cell-createPayment": B(({ row: S }) => [
                      u("span", null, D(A(le)(S.record_locator_create_payment_count ?? 0)), 1)
                    ]),
                    _: 1
                  }, 8, ["columns", "rows"])
                ])
              ])) : (g(), x("section", Kp, [...$[1] || ($[1] = [
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
}, ol = /* @__PURE__ */ me(Yp, [["__scopeId", "data-v-1b0224e4"]]), Up = {
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
}, i0 = { class: "empty-state-content" }, l0 = { class: "empty-icon-wrapper" }, r0 = /* @__PURE__ */ ce({
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
    }, { isDark: i } = Me($e(a, "theme")), l = (b) => b == null ? "0" : b.toLocaleString(), r = (b) => {
      const [p, _, k] = b.split("-").map(Number);
      return je([p, _ - 1, k]).format("MMM DD");
    }, c = (b) => b.replace(/_/g, " ").replace(/\b\w/g, (p) => p.toUpperCase()), d = (b, p) => dn(b, p), h = (b, p) => {
      const _ = b || 0, k = p || 0, w = l(_), $ = d(_, k);
      return `${w} (${$})`;
    }, m = C(() => {
      const b = a.checkinData?.record_locator_by_day || [], p = a.failedData?.failed_by_step_by_day || [], _ = a.failedData?.unrecovered_by_day || [];
      return b.map((w) => {
        const $ = p.find((M) => M.date === w.date), S = _.find(
          (M) => M.date === w.date
        );
        return {
          ...w,
          failed_steps: $?.steps || [],
          unrecovered_count: S?.unrecovered_count || 0
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
    ], f = C(
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
      const b = [], p = [], _ = /* @__PURE__ */ new Set(), k = (Se) => {
        _.has(Se) || (b.push({ name: Se }), _.add(Se));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: b, links: p };
      k("Checkin Init"), k("Booking Retrieval"), k("Booking Retrieved"), k("Completed"), k("Closed with BP");
      const w = a.checkinData.total_checkin_initiated || 0, $ = a.checkinData.total_record_locator_init || 0, S = a.checkinData.total_record_locator_init_abandoned || 0, M = a.checkinData.total_checkin_pre_init_abandoned_error, F = a.checkinData.total_checkin_pre_init_abandoned_voluntary, j = M != null || F != null, E = j ? Math.max(Number(M) || 0, 0) : 0, T = j ? Math.max(Number(F) || 0, 0) : 0, P = a.checkinData.total_record_locator_init_abandoned_error, V = a.checkinData.total_record_locator_init_abandoned_voluntary, X = P != null || V != null, Z = X ? Math.max(Number(P) || 0, 0) : 0, ae = X ? Math.max(Number(V) || 0, 0) : 0, se = X ? Math.max(S - Z - ae, 0) : S, ge = $ - S, pe = a.checkinData.total_record_locator_started || 0, L = a.checkinData.total_record_locator_completed || 0, R = a.checkinData.total_record_locator_closed || 0, H = a.checkinData.total_record_locator_unrecovered || 0;
      $ > 0 && p.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: $,
        label: ve($, w)
      });
      const ee = w - $;
      j ? (T > 0 && (k("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: T,
        label: ve(T, w)
      })), E > 0 && (k("Booking not retreived"), p.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: E,
        label: ve(E, w)
      }))) : ee > 0 && (k("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: ee,
        label: ve(ee, w)
      })), X ? (Z > 0 && (k("Error"), p.push({
        source: "Booking Retrieval",
        target: "Error",
        value: Z,
        label: ve(Z, w)
      })), ae > 0 && (k("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: ae,
        label: ve(ae, w)
      })), se > 0 && (k("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: se,
        label: ve(se, w)
      }))) : S > 0 && (k("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: S,
        label: ve(S, w)
      })), ge > 0 && p.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: ge,
        label: ve(ge, w)
      }), L > 0 && p.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: L,
        label: ve(L, pe)
      }), H > 0 && (k("Errors"), p.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: H,
        label: ve(H, pe)
      }));
      const ue = pe - (L + H);
      ue > 0 && (k("Abandoned (Flow)"), p.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: ue,
        label: ve(ue, pe)
      }));
      const De = L - R;
      return De > 0 && (k("BP Error"), p.push({
        source: "Completed",
        target: "BP Error",
        value: De,
        label: ve(De, pe)
      })), R > 0 && p.push({
        source: "Completed",
        target: "Closed with BP",
        value: R,
        label: ve(R, pe)
      }), { nodes: b, links: p };
    });
    return t({ isDark: i }), (b, p) => (g(), te(ke, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", Up, [...p[0] || (p[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", qp, [
              y.value.nodes.length > 0 ? (g(), x("div", Xp, [
                O(qt, {
                  data: y.value,
                  height: "500px",
                  "use-gradient": !1,
                  "node-gap": 24
                }, null, 8, ["data"])
              ])) : z("", !0),
              m.value && m.value.length > 0 ? (g(), x("div", Gp, [
                u("div", Zp, [
                  O(rt, {
                    columns: v,
                    rows: f.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", Qp, D(r(String(_.date))), 1)
                    ]),
                    "cell-checkinInit": B(({ row: _ }) => [
                      u("span", null, D(l(_.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieval": B(({ row: _ }) => [
                      u("span", null, D(h(
                        _.record_locator_init_count,
                        _.checkin_initiated
                      )), 1)
                    ]),
                    "cell-bookingRetrieved": B(({ row: _ }) => [
                      u("span", null, D(h(
                        _.record_locator_started_count,
                        _.record_locator_init_count
                      )), 1)
                    ]),
                    "cell-completed": B(({ row: _ }) => [
                      u("span", null, D(h(
                        _.record_locator_completed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: _ }) => [
                      u("span", Jp, D(h(
                        _.record_locator_closed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-failed": B(({ row: _ }) => [
                      u("span", e0, D(h(
                        _.unrecovered_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-reasons": B(({ row: _ }) => [
                      Array.isArray(_.failed_steps) && _.failed_steps.length > 0 ? (g(), x("div", t0, [
                        (g(!0), x(oe, null, fe(_.failed_steps, (k) => (g(), x("div", {
                          key: k.step_name,
                          class: "reason-item"
                        }, [
                          u("span", n0, D(c(k.step_name)) + ":", 1),
                          u("span", a0, D(k.failed_count), 1)
                        ]))), 128))
                      ])) : (g(), x("div", s0, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (g(), x("div", o0, [
                u("div", i0, [
                  u("div", l0, [
                    O(A(nt), { class: "empty-icon" })
                  ]),
                  p[1] || (p[1] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
                  p[2] || (p[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
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
}, _0 = /* @__PURE__ */ ce({
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
    }, { isDark: i } = Me($e(a, "theme")), l = [
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
      const v = d(m?.departure_airport), f = d(m?.arrival_airport);
      return v === "-" || f === "-" ? !1 : v === f;
    };
    return t({ isDark: i }), (m, v) => (g(), te(ke, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", d0, [...v[0] || (v[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", u0, [
              a.data.length > 0 ? (g(), x("section", h0, [
                u("div", f0, [
                  O(rt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-departure": B(({ row: f }) => [
                      u("span", g0, D(d(f.departure_airport)), 1)
                    ]),
                    "cell-connection": B(({ row: f }) => [
                      u("span", {
                        class: J(["segment-plain", {
                          "segment-plain--muted": d(f.conexion_airport) === "-"
                        }])
                      }, D(d(f.conexion_airport)), 3)
                    ]),
                    "cell-arrival": B(({ row: f }) => [
                      u("span", m0, D(d(f.arrival_airport)), 1)
                    ]),
                    "cell-trip": B(({ row: f }) => [
                      u("span", p0, D(h(f) ? "Roundtrip" : "One way"), 1)
                    ]),
                    "cell-init": B(({ row: f }) => [
                      Be(D(A(le)(f.segment_init_count)), 1)
                    ]),
                    "cell-started": B(({ row: f }) => [
                      u("span", b0, D(c(
                        f.segment_started_count,
                        f.segment_init_count
                      )), 1)
                    ]),
                    "cell-completed": B(({ row: f }) => [
                      u("span", v0, D(c(
                        f.segment_completed_count,
                        f.segment_init_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: f }) => [
                      u("span", y0, D(c(
                        f.segment_closed_count,
                        f.segment_init_count
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (g(), x("section", x0, [...v[1] || (v[1] = [
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
}), il = /* @__PURE__ */ me(_0, [["__scopeId", "data-v-522b5823"]]), k0 = { class: "checkin-container__body" }, w0 = /* @__PURE__ */ ce({
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
    return (c, d) => (g(), te(ke, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", k0, [
          e.showCheckin ? (g(), te(ol, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            "show-payment-links": e.showPaymentLinks,
            onExport: d[0] || (d[0] = (h) => i("checkin", h))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "show-payment-links"])) : z("", !0),
          O(il, {
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
}), C0 = /* @__PURE__ */ me(w0, [["__scopeId", "data-v-e8415557"]]), $0 = {
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
}, L0 = { class: "w-full min-w-0" }, P0 = { class: "font-medium text-center" }, R0 = { class: "text-center" }, I0 = { class: "text-center" }, E0 = { class: "percentage-text" }, F0 = { class: "text-center" }, O0 = { class: "abandoned-value" }, V0 = { class: "badges-container badges-wrap" }, z0 = { class: "badges-container badges-wrap" }, N0 = {
  key: 1,
  class: "empty-state"
}, H0 = /* @__PURE__ */ ce({
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
      (b, p) => new Date(b.date).getTime() - new Date(p.date).getTime()
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
      return b.length === 0 ? m(0) : b.map((p) => `${p.currency} ${m(p.total_value)}`).join(" · ");
    }), h = (b, p) => dn(b, p), m = (b) => Pe(b), v = (b) => (b ?? []).reduce((p, _) => p + (_.count ?? 0), 0), f = (b) => typeof b.sell_success_count == "number" ? b.sell_success_count : v(b.payment_success_total), y = C(() => {
      const b = a.data, p = b.total_disruption_conversations || 0, _ = b.total_disruption_initiated || 0, k = b.total_voluntary || 0, w = b.total_involuntary || 0, $ = b.total_accepted || 0, S = b.total_confirmed || 0, M = typeof b.total_sell_success == "number" ? b.total_sell_success : v(b.total_payment_success), F = b.total_sell_failed || 0, j = Math.max(0, p - _), E = Math.max(
        0,
        _ - k - w
      ), T = Math.max(0, w - $), P = Math.max(0, k - S), V = F, X = Math.max(0, S - M - V), Z = (ge, pe) => ve(ge, pe), ae = [
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
      ], se = [];
      return _ > 0 && se.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: Z(_, p)
      }), j > 0 && se.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: j,
        label: Z(j, p)
      }), k > 0 && se.push({
        source: "Started",
        target: "Voluntary",
        value: k,
        label: Z(k, p)
      }), w > 0 && se.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: Z(w, p)
      }), E > 0 && se.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: E,
        label: Z(E, p)
      }), $ > 0 && se.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: Z($, p)
      }), T > 0 && se.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: T,
        label: Z(T, p)
      }), S > 0 && se.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: Z(S, p)
      }), P > 0 && se.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: P,
        label: Z(P, p)
      }), M > 0 && se.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: Z(M, p)
      }), V > 0 && se.push({
        source: "Confirmed",
        target: "Rejected",
        value: V,
        label: Z(V, p)
      }), X > 0 && se.push({
        source: "Confirmed",
        target: "Not Paid",
        value: X,
        label: Z(X, p)
      }), { nodes: ae, links: se };
    });
    return (b, p) => (g(), te(ke, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", $0, [...p[0] || (p[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", S0, [
              u("section", M0, [
                u("div", D0, [
                  y.value.nodes.length > 0 && y.value.links.length > 0 ? (g(), te(qt, {
                    key: 0,
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])) : (g(), x("div", T0, [...p[1] || (p[1] = [
                    u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
                  ])]))
                ])
              ]),
              u("section", A0, [
                O(ye, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value && i.value.length > 0 ? (g(), x("section", B0, [
                p[2] || (p[2] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", L0, [
                  O(rt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", P0, D(A(je)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": B(({ row: _ }) => [
                      u("span", R0, D(A(le)(Number(_.disruption_conversations))), 1)
                    ]),
                    "cell-started": B(({ row: _ }) => [
                      u("span", I0, [
                        Be(D(A(le)(Number(_.disruption_initiated_count))) + " ", 1),
                        u("span", E0, " (" + D(h(
                          Number(_.disruption_initiated_count),
                          Number(_.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-abandoned": B(({ row: _ }) => [
                      u("span", F0, [
                        u("span", O0, D(A(le)(
                          Number(_.disruption_initiated_count) - Number(_.voluntary_count) - Number(_.involuntary_count)
                        )) + " (" + D(h(
                          Number(_.disruption_initiated_count) - Number(_.voluntary_count) - Number(_.involuntary_count),
                          Number(_.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-voluntary": B(({ row: _ }) => [
                      u("div", V0, [
                        (g(!0), x(oe, null, fe([_], (k, w) => (g(), x(oe, { key: w }, [
                          O(Xe, {
                            color: "neutral",
                            outlined: !0
                          }, {
                            default: B(() => [
                              Be(" VOL " + D(A(le)(k.voluntary_count)) + " (" + D(h(
                                k.voluntary_count,
                                k.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          O(Xe, { color: "success" }, {
                            default: B(() => [
                              Be(" Confirm " + D(A(le)(k.confirmed_count)) + " (" + D(h(
                                k.confirmed_count,
                                k.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          O(Xe, { color: "warning" }, {
                            default: B(() => [
                              Be(" Not Confirm " + D(A(le)(k.voluntary_count - k.confirmed_count)) + " (" + D(h(
                                k.voluntary_count - k.confirmed_count,
                                k.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          O(Xe, { color: "danger" }, {
                            default: B(() => [
                              Be(" Reject " + D(A(le)(k.sell_failed_count)) + " (" + D(h(
                                k.sell_failed_count,
                                k.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          O(Xe, { color: "orange" }, {
                            default: B(() => [
                              Be(" Not Paid " + D(A(le)(
                                Math.max(
                                  0,
                                  k.confirmed_count - f(k) - k.sell_failed_count
                                )
                              )) + " (" + D(h(
                                Math.max(
                                  0,
                                  k.confirmed_count - f(k) - k.sell_failed_count
                                ),
                                k.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          O(Xe, {
                            color: "success",
                            outlined: !0
                          }, {
                            default: B(() => [
                              Be(" Finish " + D(A(le)(f(k))) + " (" + D(h(
                                f(k),
                                k.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          (g(!0), x(oe, null, fe(k.payment_success_total || [], ($) => (g(), te(Xe, {
                            key: `${k.date}-${$.currency}`,
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
                    "cell-involuntary": B(({ row: _ }) => [
                      u("div", z0, [
                        (g(!0), x(oe, null, fe([_], (k, w) => (g(), x(oe, { key: w }, [
                          O(Xe, { color: "purple" }, {
                            default: B(() => [
                              Be(" INV " + D(A(le)(k.involuntary_count)) + " (" + D(h(
                                k.involuntary_count,
                                k.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          O(Xe, { color: "danger" }, {
                            default: B(() => [
                              Be(" Human " + D(A(le)(k.involuntary_count - k.accepted_count)) + " (" + D(h(
                                k.involuntary_count - k.accepted_count,
                                k.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          O(Xe, { color: "success" }, {
                            default: B(() => [
                              Be(" Accept " + D(A(le)(k.accepted_count)) + " (" + D(h(
                                k.accepted_count,
                                k.disruption_conversations
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
              ])) : (g(), x("section", N0, [...p[3] || (p[3] = [
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
}, G0 = /* @__PURE__ */ ce({
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
    }, i = $e(a, "theme"), { isDark: l } = Me(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = ie({
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
      const v = d.value, f = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, y = (_) => f > 0 ? (_ / f * 100).toFixed(1) : "0.0", b = v.total_faq_events, p = b > 0 ? `${(v.total_documents_found / b * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${y(v.total_airline_information_retrieved)}%`,
          subvalue: `${le(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${y(v.total_booking_info_retrieved)}%`,
          subvalue: `${le(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${y(v.total_flight_status_retrieved)}%`,
          subvalue: `${le(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: le(v.total_documents_found),
          subvalue: p
        }
      ];
    }), m = (v) => {
      if (!v) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const f = v.faq_by_day || [];
      if (f.length > 0) {
        const y = f.map(
          (k) => je(k.date).format("MMM DD")
        ), b = f.map(
          (k) => k.airline_information_retrieved_count || 0
        ), p = f.map(
          (k) => k.flight_status_retrieved_count || 0
        ), _ = f.map(
          (k) => k.booking_info_retrieved_count || 0
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
              data: p,
              borderColor: r.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: _,
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
    ), t({ isDark: l }), (v, f) => (g(), te(ke, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (g(), te(A(Ve), {
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
          O(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (g(), x("div", j0, [...f[0] || (f[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (g(), x("div", K0, [
                c.value.labels && c.value.labels.length ? (g(), x("section", Y0, [
                  u("div", U0, [
                    O(yt, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", q0, [
                    (g(!0), x(oe, null, fe(h.value, (y) => (g(), te(ye, {
                      key: y.name,
                      class: "min-w-0",
                      color: y.color,
                      title: y.label,
                      value: y.value,
                      subvalue: y.subvalue
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : (g(), x("section", X0, [...f[1] || (f[1] = [
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
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ab = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, sb = { class: "max-w-[360px] px-4 text-center" }, ob = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ib = /* @__PURE__ */ ce({
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
    }, s = e, o = n, i = (v) => {
      o("export", v);
    }, l = $e(s, "theme"), { isDark: r } = Me(l), c = C(() => {
      const v = s.data?.agents_by_day || {}, f = Object.keys(v).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const y = /* @__PURE__ */ new Set();
      for (const _ of Object.values(v))
        for (const k of Object.keys(_))
          y.add(k);
      const p = Array.from(y).map((_) => {
        const k = _.toLowerCase(), w = a[k] || a[_] || "#94a3b8";
        return {
          label: _.charAt(0).toUpperCase() + _.slice(1).replace(/_/g, " "),
          data: f.map(($) => v[$]?.[_] || 0),
          borderColor: w
        };
      });
      return {
        labels: f.map((_) => je(_).format("MMM DD")),
        datasets: p
      };
    }), d = C(() => {
      const v = s.data?.agents_by_day || {}, f = {};
      for (const b of Object.values(v))
        for (const [p, _] of Object.entries(b))
          f[p] = (f[p] || 0) + _;
      const y = Object.values(f).reduce((b, p) => b + p, 0);
      return y === 0 ? [] : Object.entries(f).sort(([, b], [, p]) => p - b).map(([b, p]) => {
        const _ = b.toLowerCase();
        return {
          name: b,
          label: b.charAt(0).toUpperCase() + b.slice(1).replace(/_/g, " "),
          total: p,
          percentage: (p / y * 100).toFixed(1),
          color: a[_] || a[b] || "#94a3b8"
        };
      });
    }), h = C(() => d.value.slice(0, 4)), m = C(() => {
      const v = h.value.length;
      if (!(v <= 0))
        return { gridTemplateColumns: `repeat(${v}, minmax(0, 1fr))` };
    });
    return t({ isDark: r }), (v, f) => (g(), te(ke, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (g(), te(A(Ve), {
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
          O(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              s.loading ? (g(), x("div", Q0, [...f[0] || (f[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (g(), x("div", J0, [
                c.value.labels && c.value.labels.length ? (g(), x("section", eb, [
                  u("div", tb, [
                    O(yt, {
                      data: c.value,
                      options: e.options,
                      theme: l.value
                    }, null, 8, ["data", "options", "theme"])
                  ]),
                  h.value.length ? (g(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(m.value)
                  }, [
                    (g(!0), x(oe, null, fe(h.value, (y) => (g(), te(ye, {
                      key: y.name,
                      class: "min-w-0",
                      color: y.color,
                      title: y.label,
                      value: `${y.percentage}%`,
                      subvalue: `${A(le)(y.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : z("", !0)
                ])) : d.value.length ? (g(), x("section", nb, [
                  u("div", {
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(m.value)
                  }, [
                    (g(!0), x(oe, null, fe(h.value, (y) => (g(), te(ye, {
                      key: y.name,
                      class: "min-w-0",
                      color: y.color,
                      title: y.label,
                      value: `${y.percentage}%`,
                      subvalue: `${A(le)(y.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)
                ])) : z("", !0),
                d.value.length ? z("", !0) : (g(), x("section", ab, [
                  u("div", sb, [
                    u("div", ob, [
                      O(A(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                    ]),
                    f[1] || (f[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                    f[2] || (f[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
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
}), lb = /* @__PURE__ */ me(ib, [["__scopeId", "data-v-a4ffe8f3"]]), rb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, cb = {
  key: "content",
  class: "card-body"
}, db = {
  key: 0,
  class: "chart-section"
}, ub = { class: "chart-wrapper" }, hb = {
  key: 1,
  class: "record-locator-daily-section"
}, fb = { class: "w-full min-w-0" }, gb = { class: "cell-plain font-medium" }, mb = { class: "cell-plain text-center" }, pb = { class: "cell-plain text-center" }, bb = { class: "cell-plain text-center" }, vb = { class: "cell-plain text-center" }, yb = { class: "cell-plain text-center success-value" }, xb = { class: "cell-plain text-center failed-value" }, _b = { class: "cell-plain text-center warning-value" }, kb = { class: "cell-plain text-center" }, wb = { class: "cell-plain text-center failed-value" }, Cb = {
  key: 2,
  class: "empty-state"
}, $b = /* @__PURE__ */ ce({
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
    }, { isDark: i } = Me($e(a, "theme")), l = C(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (b, p) => new Date(b.date).getTime() - new Date(p.date).getTime()
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
    ), m = C(() => a.data), v = (b, p) => dn(b, p), f = (b, p) => {
      const _ = le(b), k = v(b, p);
      return `${_} (${k})`;
    }, y = C(() => {
      const b = [], p = [], _ = /* @__PURE__ */ new Set(), k = (ee) => {
        _.has(ee) || (b.push({ name: ee }), _.add(ee));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: b, links: p };
      k("Checkin Init"), k("Booking retrive"), k("Checkin Started"), k("Checkin Completed"), k("Checkin Closed");
      const w = m.value.total_checkin_initiated, $ = m.value.total_record_locator_init, S = m.value.total_record_locator_started, M = m.value.total_record_locator_completed, F = m.value.total_record_locator_closed, j = m.value.total_record_locator_failed, E = m.value.total_record_locator_abandoned, T = m.value.total_record_locator_init_abandoned, P = m.value.total_checkin_pre_init_abandoned_error, V = m.value.total_checkin_pre_init_abandoned_voluntary, X = P != null || V != null, Z = X ? Math.max(Number(P) || 0, 0) : 0, ae = X ? Math.max(Number(V) || 0, 0) : 0, se = m.value.total_record_locator_init_abandoned_error, ge = m.value.total_record_locator_init_abandoned_voluntary, pe = se != null || ge != null, L = pe ? Math.max(Number(se) || 0, 0) : 0, R = pe ? Math.max(Number(ge) || 0, 0) : 0;
      $ > 0 && p.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: ve($, w)
      });
      const H = w - $;
      return X ? (ae > 0 && (k("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: ae,
        label: ve(ae, w)
      })), Z > 0 && (k("Booking not retreived"), p.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: Z,
        label: ve(Z, w)
      }))) : H > 0 && (k("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: H,
        label: ve(H, w)
      })), S > 0 && p.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: S,
        label: ve(S, w)
      }), pe ? (L > 0 && (k("Error"), p.push({
        source: "Booking retrive",
        target: "Error",
        value: L,
        label: ve(L, w)
      })), R > 0 && (k("Abandoned (Started)"), p.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: R,
        label: ve(R, w)
      }))) : T > 0 && (k("Abandoned (Started)"), p.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: T,
        label: ve(T, w)
      })), M > 0 && p.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: M,
        label: ve(M, S)
      }), F > 0 && p.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: F,
        label: ve(F, S)
      }), j > 0 && (k("Checkin Failed"), p.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: j,
        label: ve(j, S)
      })), E > 0 && (k("Abandoned (Flow)"), p.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: E,
        label: ve(E, S)
      })), { nodes: b, links: p };
    });
    return t({ isDark: i }), (b, p) => (g(), te(ke, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            a.loading ? (g(), x("div", rb, [...p[0] || (p[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", cb, [
              y.value.nodes.length > 0 ? (g(), x("section", db, [
                u("div", ub, [
                  O(qt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : z("", !0),
              l.value && l.value.length > 0 ? (g(), x("section", hb, [
                u("div", fb, [
                  O(rt, {
                    columns: d.value,
                    rows: h.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", gb, D(A(je)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": B(({ row: _ }) => [
                      u("span", mb, D(A(le)(_.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieve": B(({ row: _ }) => [
                      u("span", pb, D(f(
                        _.record_locator_init_count,
                        _.checkin_initiated
                      )), 1)
                    ]),
                    "cell-checkinStarted": B(({ row: _ }) => [
                      u("span", bb, D(A(le)(_.record_locator_started_count)), 1)
                    ]),
                    "cell-checkinCompleted": B(({ row: _ }) => [
                      u("span", vb, D(f(
                        _.record_locator_completed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinClosed": B(({ row: _ }) => [
                      u("span", yb, D(f(
                        _.record_locator_closed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinFailed": B(({ row: _ }) => [
                      u("span", xb, D(f(
                        _.record_locator_failed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-abandoned": B(({ row: _ }) => [
                      u("span", _b, D(f(
                        _.record_locator_abandoned_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-createPayment": B(({ row: _ }) => [
                      u("span", kb, D(A(le)(
                        _.record_locator_create_payment_count ?? 0
                      )), 1)
                    ]),
                    "cell-failedPayment": B(({ row: _ }) => [
                      u("span", wb, D(A(le)(
                        _.record_locator_create_payment_failed_count ?? 0
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["columns", "rows"])
                ])
              ])) : (g(), x("section", Cb, [...p[1] || (p[1] = [
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
}), Sb = /* @__PURE__ */ me($b, [["__scopeId", "data-v-00877097"]]), Mb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Db = {
  key: "content",
  class: "card-body"
}, Tb = {
  key: 0,
  class: "chart-section"
}, Ab = {
  key: 1,
  class: "empty-state"
}, Bb = {
  key: 2,
  class: "comparison-section"
}, Lb = { class: "comparison-grid" }, Pb = /* @__PURE__ */ ce({
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
    ], o = e, i = n, l = (f) => {
      i("export", f);
    }, { isDark: r } = Me($e(o, "theme"));
    C(() => o.data?.total_sell_success ?? 0);
    const c = C(() => {
      const f = /* @__PURE__ */ new Set();
      for (const y of o.data?.sales_by_channel_by_day ?? [])
        for (const b of Object.keys(y.channels))
          f.add(b);
      return Array.from(f).sort();
    }), d = (f, y) => a[f.toLowerCase()] ?? s[y % s.length];
    function h(f) {
      return f.replace(/_/g, " ").toUpperCase();
    }
    function m(f) {
      if (f.delta === null) return "No previous data";
      const y = le(f.previous), b = `${Math.abs(f.delta).toFixed(1)}%`;
      return f.delta === 0 ? `0.0% vs prev. period (${y})` : `${f.delta > 0 ? "↑" : "↓"} ${b} vs prev. period (${y})`;
    }
    const v = C(() => {
      const f = o.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const y = f.map((p) => je(p.date).format("MMM-DD")), b = c.value.map((p, _) => ({
        label: p,
        data: f.map((k) => k.channels[p] ?? 0),
        backgroundColor: d(p, _),
        borderRadius: 4
      }));
      return { labels: y, datasets: b };
    });
    return t({ isDark: r }), (f, y) => (g(), te(ke, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            o.loading ? (g(), x("div", Mb, [...y[0] || (y[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", Db, [
              v.value.labels.length > 0 ? (g(), x("section", Tb, [
                O(St, {
                  data: v.value,
                  stacked: !0
                }, null, 8, ["data"])
              ])) : (g(), x("section", Ab, [...y[1] || (y[1] = [
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
              e.channelComparison.length > 0 ? (g(), x("section", Bb, [
                u("div", Lb, [
                  (g(!0), x(oe, null, fe(e.channelComparison, (b, p) => (g(), te(A(ye), {
                    key: b.channel,
                    color: d(b.channel, p),
                    title: h(b.channel),
                    value: A(le)(b.current),
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
}), ll = /* @__PURE__ */ me(Pb, [["__scopeId", "data-v-b99f46a5"]]), Rb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ib = {
  key: "content",
  class: "card-body"
}, Eb = {
  key: 0,
  class: "chart-section"
}, Fb = { class: "chart-wrapper" }, Ob = {
  key: 1,
  class: "empty-state"
}, Vb = { class: "seller-value-cards" }, zb = {
  key: 2,
  class: "seller-daily-section"
}, Nb = { class: "w-full min-w-0" }, Hb = { class: "sl-cell font-medium" }, Wb = { class: "sl-cell text-center" }, jb = { class: "sl-cell text-center" }, Kb = { class: "sl-cell text-center" }, Yb = { class: "sl-cell text-center" }, Ub = { class: "sl-cell text-center" }, qb = { class: "sl-cell text-center success-value" }, Xb = {
  key: 0,
  class: "currency-cell-list"
}, Gb = {
  key: 1,
  class: "empty-cell"
}, Zb = { class: "sl-cell text-center success-value" }, Qb = { class: "sl-cell text-center" }, Jb = { class: "sl-cell text-center success-value" }, ev = {
  key: 0,
  class: "currency-cell-list"
}, tv = {
  key: 1,
  class: "empty-cell"
}, nv = { class: "sl-cell text-center success-value" }, av = { class: "sl-cell text-center" }, sv = { class: "sl-cell text-center success-value" }, ov = {
  key: 0,
  class: "currency-cell-list"
}, iv = { key: 1 }, lv = {
  key: 0,
  class: "failed-reasons"
}, rv = { class: "reason-name" }, cv = { class: "reason-count" }, dv = {
  key: 1,
  class: "empty-cell"
}, uv = /* @__PURE__ */ ce({
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
    function a(T) {
      return T;
    }
    const s = e, o = n, i = (T) => {
      o("export", T);
    }, { isDark: l } = Me($e(s, "theme")), r = C(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const T = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((P) => {
        const V = T.findIndex(
          (X) => X.date === P.date
        );
        V !== -1 ? T[V] = { ...T[V], reasons: P.reasons } : T.push({
          date: P.date,
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
          reasons: P.reasons
        });
      }), T.sort(
        (P, V) => new Date(P.date).getTime() - new Date(V.date).getTime()
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
      () => r.value.map((T) => ({
        id: T.date,
        ...T
      }))
    ), h = C(() => s.sellerData), m = C(() => s.failedData), v = C(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), f = C(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), y = C(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), b = C(() => {
      const T = v.value;
      return T.length > 0 ? T.map(
        (P) => `${P.currency} ${Et(P.total_value)}`
      ).join(" · ") : E(s.sellerData.total_value_sell_success);
    });
    function p(T) {
      return T.length > 0 ? T.map(
        (P) => `${P.currency} ${Et(P.total_value)}`
      ).join(" · ") : "—";
    }
    const _ = C(
      () => p(f.value)
    ), k = C(
      () => p(y.value)
    ), w = (T) => T.replace(/_/g, " ").replace(/\b\w/g, (P) => P.toUpperCase()), $ = (T) => `Failed:
${w(T)}`, S = C(() => {
      const {
        total_seller_conversations: T = 0,
        total_sell_started: P = 0,
        total_sell_booking_created: V = 0,
        total_sell_success: X = 0,
        total_sell_bank_transfer: Z = 0,
        total_sell_cash_option: ae = 0,
        total_sell_success_bank_transfer: se = 0,
        total_sell_success_cash: ge = 0
      } = h.value, { failed_by_reason_by_day: pe = [] } = m.value;
      if (T === 0) return { nodes: [], links: [] };
      const L = Math.max(
        0,
        X - (se ?? 0) - (ge ?? 0)
      ), R = [
        { name: "Sell Initiated", value: T, status: "success" },
        { name: "Sell Started", value: P, status: "success" },
        { name: "Booking Created", value: V, status: "success" },
        { name: "Sell Success", value: L, status: "success" }
      ], H = [], ee = T - P;
      ee > 0 && (R.push({
        name: "Abandoned (Init)",
        value: ee,
        status: "abandon"
      }), H.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: ee,
        label: ve(ee, T)
      })), P > 0 && H.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: P,
        label: ve(P, T)
      });
      const ue = pe.reduce(
        (Q, N) => (N.reasons && Array.isArray(N.reasons) && N.reasons.forEach((W) => {
          const G = W.reason, U = W.failed_count;
          Q[G] = (Q[G] || 0) + U;
        }), Q),
        {}
      );
      V > 0 && H.push({
        source: "Sell Started",
        target: "Booking Created",
        value: V,
        label: ve(V, T)
      }), Z > 0 && (R.push({ name: "Bank Transfer", value: Z, status: "success" }), H.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: Z,
        label: ve(Z, T)
      })), ae > 0 && (R.push({ name: "Cash Option", value: ae, status: "success" }), H.push({
        source: "Booking Created",
        target: "Cash Option",
        value: ae,
        label: ve(ae, T)
      })), L > 0 && H.push({
        source: "Booking Created",
        target: "Sell Success",
        value: L,
        label: ve(L, T)
      }), (se ?? 0) > 0 && (R.push({
        name: "Bank Transfer Success",
        value: se ?? 0,
        status: "success"
      }), H.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: se ?? 0,
        label: ve(se ?? 0, T)
      })), (ge ?? 0) > 0 && (R.push({
        name: "Cash Option Success",
        value: ge ?? 0,
        status: "success"
      }), H.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: ge ?? 0,
        label: ve(ge ?? 0, T)
      }));
      const De = V - L - Z - ae;
      De > 0 && (R.push({
        name: "Failed at Completion",
        value: De,
        status: "error"
      }), H.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: De,
        label: ve(De, T)
      }));
      const Se = P - V;
      if (Se > 0 && (R.push({
        name: "Failed at Booking",
        value: Se,
        status: "error"
      }), H.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: Se,
        label: ve(Se, T)
      })), Object.keys(ue).length > 0) {
        const Q = Object.values(ue).reduce(
          (W, G) => W + G,
          0
        ), N = Se - Q;
        Object.entries(ue).filter(([, W]) => W > 0).sort(([, W], [, G]) => G - W).forEach(([W, G]) => {
          const U = `Failed: ${W}`;
          R.push({
            name: U,
            value: G,
            status: "error",
            label: $(W)
          }), H.push({
            source: "Failed at Booking",
            target: U,
            value: G,
            label: ve(G, T)
          });
        }), N > 0 && (R.push({
          name: "Failed: Without Reason",
          value: N,
          status: "error",
          label: `Failed:
Without Reason`
        }), H.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: N,
          label: ve(N, T)
        }));
      }
      return { nodes: R, links: H };
    }), M = (T, P) => dn(T, P), F = (T, P) => {
      const V = le(T), X = M(T, P);
      return `${V} (${X})`;
    }, j = (T) => T == null ? 0 : typeof T == "number" ? T : Array.isArray(T) ? T.reduce((P, V) => P + (V.total_value || 0), 0) : 0, E = (T) => Et(j(T));
    return t({ isDark: l }), (T, P) => (g(), te(ke, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (g(), x("div", Rb, [...P[0] || (P[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", Ib, [
              S.value.nodes.length > 0 ? (g(), x("section", Eb, [
                u("div", Fb, [
                  O(qt, {
                    data: S.value,
                    height: "560px"
                  }, null, 8, ["data"])
                ])
              ])) : (g(), x("section", Ob, [...P[1] || (P[1] = [
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
              u("section", Vb, [
                O(ye, {
                  class: "seller-value-card",
                  color: "var(--kiut-success)",
                  title: "Total Sales Value",
                  value: b.value
                }, null, 8, ["value"]),
                O(ye, {
                  class: "seller-value-card",
                  color: "#d97706",
                  title: "Bank Transfer Value",
                  value: _.value
                }, null, 8, ["value"]),
                O(ye, {
                  class: "seller-value-card",
                  color: "#ca8a04",
                  title: "Cash Option Value",
                  value: k.value
                }, null, 8, ["value"])
              ]),
              r.value && r.value.length > 0 ? (g(), x("section", zb, [
                u("div", Nb, [
                  O(rt, {
                    columns: c,
                    rows: d.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: V }) => [
                      u("span", Hb, D(A(je)(String(V.date)).format("MMM DD")), 1)
                    ]),
                    "cell-sellInitiated": B(({ row: V }) => [
                      u("span", Wb, D(A(le)(Number(V.seller_conversations) || 0)), 1)
                    ]),
                    "cell-sellStarted": B(({ row: V }) => [
                      u("span", jb, D(F(
                        V.sell_started_count,
                        V.seller_conversations || V.sell_started_count
                      )), 1)
                    ]),
                    "cell-getQuote": B(({ row: V }) => [
                      u("span", Kb, D(F(
                        V.sell_get_quote_count,
                        V.seller_conversations || V.sell_started_count
                      )), 1)
                    ]),
                    "cell-bookingCreated": B(({ row: V }) => [
                      u("span", Yb, D(F(
                        V.sell_booking_created_count,
                        V.seller_conversations || V.sell_started_count
                      )), 1)
                    ]),
                    "cell-bankTransfer": B(({ row: V }) => [
                      u("span", Ub, D(A(le)(Number(V.sell_bank_transfer_count) || 0)), 1)
                    ]),
                    "cell-btValue": B(({ row: V }) => [
                      u("span", qb, [
                        Array.isArray(
                          V.daily_value_sell_success_bank_transfer
                        ) && V.daily_value_sell_success_bank_transfer.length > 0 ? (g(), x("div", Xb, [
                          (g(!0), x(oe, null, fe(V.daily_value_sell_success_bank_transfer, (X) => (g(), x("span", {
                            key: `${V.date}-bt-success-${X.currency}`
                          }, D(X.currency) + " " + D(A(Et)(X.total_value)), 1))), 128))
                        ])) : (g(), x("span", Gb, "-"))
                      ])
                    ]),
                    "cell-btSuccess": B(({ row: V }) => [
                      u("span", Zb, D(A(le)(
                        Number(
                          V.sell_success_bank_transfer_count
                        ) || 0
                      )), 1)
                    ]),
                    "cell-cashOption": B(({ row: V }) => [
                      u("span", Qb, D(A(le)(Number(V.sell_cash_option_count) || 0)), 1)
                    ]),
                    "cell-coValue": B(({ row: V }) => [
                      u("span", Jb, [
                        Array.isArray(
                          V.daily_value_sell_success_cash
                        ) && V.daily_value_sell_success_cash.length > 0 ? (g(), x("div", ev, [
                          (g(!0), x(oe, null, fe(V.daily_value_sell_success_cash, (X) => (g(), x("span", {
                            key: `${V.date}-co-success-${X.currency}`
                          }, D(X.currency) + " " + D(A(Et)(X.total_value)), 1))), 128))
                        ])) : (g(), x("span", tv, "-"))
                      ])
                    ]),
                    "cell-cashSuccess": B(({ row: V }) => [
                      u("span", nv, D(A(le)(
                        Number(V.sell_success_cash_count) || 0
                      )), 1)
                    ]),
                    "cell-sellSuccess": B(({ row: V }) => [
                      u("span", av, D(F(
                        V.sell_success_count,
                        V.seller_conversations || V.sell_started_count
                      )), 1)
                    ]),
                    "cell-totalSalesValue": B(({ row: V }) => [
                      u("span", sv, [
                        Array.isArray(V.daily_value_sell_success) && V.daily_value_sell_success.length > 0 ? (g(), x("div", ov, [
                          (g(!0), x(oe, null, fe(V.daily_value_sell_success, (X) => (g(), x("span", {
                            key: `${V.date}-${X.currency}`
                          }, D(X.currency) + " " + D(A(Et)(X.total_value)), 1))), 128))
                        ])) : (g(), x("span", iv, D(E(
                          V.daily_value_sell_success
                        )), 1))
                      ])
                    ]),
                    "cell-failed": B(({ row: V }) => [
                      (V.reasons || []).length > 0 ? (g(), x("div", lv, [
                        (g(!0), x(oe, null, fe(V.reasons || [], (X) => (g(), x("div", {
                          key: X.reason,
                          class: "failed-reason-item"
                        }, [
                          u("span", rv, D(X.reason) + ":", 1),
                          u("span", cv, D(X.failed_count), 1)
                        ]))), 128))
                      ])) : (g(), x("div", dv, "-"))
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
}), rl = /* @__PURE__ */ me(uv, [["__scopeId", "data-v-d2f74abd"]]), hv = { class: "seller-container__body" }, fv = /* @__PURE__ */ ce({
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
    return (c, d) => (g(), te(ke, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", hv, [
          O(rl, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => r("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          O(ll, {
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
}), gv = /* @__PURE__ */ me(fv, [["__scopeId", "data-v-a9f0dfd2"]]), mv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, pv = {
  key: "content",
  class: "card-body"
}, bv = {
  key: 0,
  class: "chart-section"
}, vv = {
  key: 1,
  class: "empty-state"
}, yv = { class: "empty-state-content" }, xv = { class: "empty-icon-wrapper" }, _v = /* @__PURE__ */ ce({
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
    }, { isDark: l, colors: r } = Me($e(s, "theme")), c = C(() => {
      const m = (s.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const v = m.reduce(
        (b, p) => b + (Number(p.conversations) || 0),
        0
      ), f = m.map((b) => {
        const p = b.agent_type?.toLowerCase();
        return a[p] || "#94a3b8";
      }), y = f.map((b) => `${b}80`);
      return {
        labels: m.map((b) => {
          const p = Number(b.conversations) || 0, _ = v ? p / v * 100 : 0;
          return `${b.agent_type} - ${p.toLocaleString()} (${_.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((b) => b.conversations),
            backgroundColor: y,
            borderColor: f,
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
              const m = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (b, p) => b + (Number(p) || 0),
                0
              ), y = f ? v / f * 100 : 0;
              return `${m}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, m) => (g(), te(ke, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", mv, [...m[0] || (m[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", pv, [
              c.value.labels && c.value.labels.length ? (g(), x("section", bv, [
                O(Da, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])) : (g(), x("section", vv, [
                u("div", yv, [
                  u("div", xv, [
                    O(A(Bm), { class: "empty-icon" })
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
}), kv = /* @__PURE__ */ me(_v, [["__scopeId", "data-v-a52fe7ae"]]), wv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Cv = {
  key: "content",
  class: "card-body"
}, $v = {
  key: 0,
  class: "payment-methods-section"
}, Sv = { class: "payment-methods-grid" }, Mv = {
  key: 1,
  class: "empty-state"
}, Dv = { class: "empty-state-content" }, Tv = { class: "empty-icon-wrapper" }, Av = {
  key: 2,
  class: "payment-method-daily-section"
}, Bv = { class: "w-full min-w-0" }, Lv = { class: "font-medium" }, Pv = { class: "text-center" }, Rv = { class: "text-center success-value" }, Iv = {
  key: 0,
  class: "currency-cell-list"
}, Ev = { class: "payment-tags" }, Fv = { class: "tag-name" }, Ov = {
  key: 0,
  class: "tag-amount"
}, Vv = {
  key: 1,
  class: "tag-amount"
}, zv = { class: "tag-count" }, Nv = {
  key: 3,
  class: "empty-table-state"
}, Hv = "Not Registered", Wv = /* @__PURE__ */ ce({
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
    const a = e, s = n, { isDark: o } = Me($e(a, "theme")), i = ie(!1), l = ie({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((M, F) => je(M.date).valueOf() - je(F.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], m = C(
      () => d.value.map((M) => ({
        id: M.date,
        date: M.date,
        total_count: M.total_count,
        total_amount: M.total_amount,
        total_amount_by_currency: M.total_amount_by_currency,
        payment_methods: M.payment_methods
      }))
    ), v = (M) => {
      if (!M)
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
      const F = (M.payment_method_breakdown || []).map(
        (E) => ({
          payment_method: E.payment_method || "Unknown",
          total_amount: E.total_amount ?? 0,
          count: E.count ?? 0,
          total_amount_by_currency: E.total_amount_by_currency ?? []
        })
      ), j = (M.payment_method_by_day || []).map((E) => ({
        date: E.date || "",
        total_count: E.total_count ?? 0,
        total_amount: E.total_amount ?? 0,
        total_amount_by_currency: E.total_amount_by_currency ?? [],
        payment_methods: (E.payment_methods || []).map((T) => ({
          payment_method: T.payment_method || "Unknown",
          total_amount: T.total_amount ?? 0,
          count: T.count ?? 0,
          total_amount_by_currency: T.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: M.airline_name || a.airlineName,
        start_date: M.start_date || "",
        end_date: M.end_date || "",
        total_conversations: M.total_conversations ?? 0,
        total_amount: M.total_amount ?? 0,
        total_sell_usd: M.total_sell_usd,
        total_amount_by_currency: M.total_amount_by_currency ?? [],
        payment_method_breakdown: F,
        payment_method_by_day: j
      };
    }, f = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [M, F] = a.dates.map(
            (E) => je(E).format("YYYY-MM-DD")
          ), j = await a.fetchFunction(
            a.airlineName,
            M,
            F
          );
          l.value = v(j);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), l.value = v(null);
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
    ], b = (M) => !M || M.toLowerCase() === "unknown" ? Hv : M.replace(/_/g, " "), p = (M) => M == null ? "$0.00" : Pe(M), _ = (M) => {
      const F = M.total_amount_by_currency;
      return F && F.length > 0 ? F.map((j) => `${j.currency} ${p(j.total_value)}`).join(" · ") : p(M.total_amount);
    }, k = (M) => M ? je(M).format("MMM DD") : "-", w = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), $ = (M) => {
      s("export", M);
    };
    function S() {
      const M = a.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, l.value = v(M));
    }
    return tt(() => {
      a.data ? S() : f();
    }), Oe(
      () => a.data,
      (M) => {
        M && S();
      },
      { deep: !0 }
    ), Oe(
      () => a.dates,
      (M) => {
        a.data || M && M[0] && M[1] && f();
      },
      { deep: !0 }
    ), t({ isDark: o }), (M, F) => (g(), te(ke, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value
    }, {
      headerExport: B(() => [
        e.enableExport && !i.value ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            i.value ? (g(), x("div", wv, [...F[0] || (F[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", Cv, [
              r.value ? (g(), x("section", $v, [
                F[1] || (F[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
                u("div", Sv, [
                  (g(!0), x(oe, null, fe(l.value.payment_method_breakdown, (j, E) => (g(), te(ye, {
                    key: j.payment_method,
                    class: "payment-method-card-item min-w-0",
                    color: y[E % y.length],
                    title: b(j.payment_method),
                    value: _(j),
                    subvalue: `${w(j.count)} ${w(j.count) === 1 ? "sale" : "sales"}`
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : (g(), x("section", Mv, [
                u("div", Dv, [
                  u("div", Tv, [
                    O(A(Pm), { class: "empty-icon" })
                  ]),
                  F[2] || (F[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
                  F[3] || (F[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
                ])
              ])),
              c.value ? (g(), x("section", Av, [
                F[5] || (F[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
                u("div", Bv, [
                  O(rt, {
                    columns: h,
                    rows: m.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: j }) => [
                      u("span", Lv, D(k(String(j.date))), 1)
                    ]),
                    "cell-totalSales": B(({ row: j }) => [
                      u("span", Pv, D(A(le)(j.total_count ?? 0)), 1)
                    ]),
                    "cell-totalAmount": B(({ row: j }) => [
                      u("span", Rv, [
                        Array.isArray(j.total_amount_by_currency) && j.total_amount_by_currency.length > 0 ? (g(), x("div", Iv, [
                          (g(!0), x(oe, null, fe(j.total_amount_by_currency, (E) => (g(), x("span", {
                            key: `${j.date}-${E.currency}`
                          }, D(E.currency) + " " + D(p(E.total_value)), 1))), 128))
                        ])) : (g(), x(oe, { key: 1 }, [
                          Be(D(p(Number(j.total_amount ?? 0))), 1)
                        ], 64))
                      ])
                    ]),
                    "cell-paymentMethods": B(({ row: j }) => [
                      u("div", Ev, [
                        (g(!0), x(oe, null, fe(Array.isArray(j.payment_methods) ? j.payment_methods : [], (E) => (g(), x("div", {
                          key: E.payment_method,
                          class: "payment-tag"
                        }, [
                          u("span", Fv, D(b(E.payment_method)), 1),
                          F[4] || (F[4] = u("span", { class: "tag-separator" }, "•", -1)),
                          !E.total_amount_by_currency || E.total_amount_by_currency.length === 0 ? (g(), x("span", Ov, D(p(E.total_amount)), 1)) : (g(), x("span", Vv, D(E.total_amount_by_currency.map(
                            (T) => `${T.currency} ${p(T.total_value)}`
                          ).join(" / ")), 1)),
                          u("span", zv, "(" + D(w(E.count)) + ")", 1)
                        ]))), 128))
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : r.value ? (g(), x("div", Nv, [...F[6] || (F[6] = [
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
}), jv = /* @__PURE__ */ me(Wv, [["__scopeId", "data-v-0d6d2847"]]), Kv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Yv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Uv = {
  key: "title-content",
  class: "header-title-group"
}, qv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Xv = {
  key: 0,
  class: "metric-label metric-label--header"
}, Gv = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, Zv = { key: "aside-content" }, Qv = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Jv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, ey = {
  key: "body-content",
  class: "highlight-inner"
}, ty = { class: "card-body" }, ny = { class: "metric-row" }, ay = {
  key: 0,
  class: "metric-prefix"
}, sy = {
  key: 0,
  class: "metric-label"
}, oy = /* @__PURE__ */ ce({
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
    const n = e, { isDark: a } = Me($e(n, "theme")), s = C(() => n.labelPosition === "header"), o = C(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const c = n.previousValue;
      return c === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - c) / c * 100;
    }), l = C(() => {
      const c = i.value;
      if (Number.isNaN(c)) return "-";
      const d = c.toFixed(1);
      return c > 0 ? `+${d}%` : `${d}%`;
    }), r = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, d) => (g(), te(ke, {
      collapsible: !1,
      class: J([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": A(a),
          "card-metric--label-header": s.value
        }
      ])
    }, {
      title: B(() => [
        O(Te, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", Kv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              s.value ? (g(), x("div", Yv)) : z("", !0)
            ])) : (g(), x("div", Uv, [
              u("div", qv, [
                we(c.$slots, "icon", {}, void 0, !0)
              ]),
              s.value ? (g(), x("span", Xv, D(e.label), 1)) : z("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: B(() => [
        O(Te, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", Gv)) : (g(), x("div", Zv, [
              we(c.$slots, "headerAside", {}, () => [
                o.value ? (g(), x("div", {
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
        O(Te, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", Qv, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              s.value ? z("", !0) : (g(), x("div", Jv))
            ])) : (g(), x("div", ey, [
              u("div", ty, [
                we(c.$slots, "value", {}, () => [
                  u("div", ny, [
                    e.prefix ? (g(), x("span", ay, D(e.prefix), 1)) : z("", !0),
                    u("span", {
                      class: J(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, D(e.value), 3)
                  ])
                ], !0),
                s.value ? z("", !0) : (g(), x("span", sy, D(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), vt = /* @__PURE__ */ me(oy, [["__scopeId", "data-v-c81268f4"]]);
function cl(e, t) {
  return g(), x("svg", {
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
function qe() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ct = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", mt = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", iy = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", It = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", Mt = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", ly = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], ry = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, cy = ["placeholder", "aria-label"], dy = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, uy = ["aria-selected", "onClick", "onMouseenter"], hy = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, fy = { class: "min-w-0 flex-1" }, ws = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = `kiut-select-${qe()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, r = ie(null), c = ie(null), d = ie(null), h = ie(null), m = ie(null), v = ie(!1), f = ie(0), y = ie(""), b = ie({});
    function p() {
      const L = c.value;
      if (!L) return;
      const R = L.getBoundingClientRect();
      b.value = {
        top: `${R.bottom - 3}px`,
        left: `${R.left}px`,
        width: `${R.width}px`
      };
    }
    const _ = C(() => n.options.filter((L) => !L.disabled)), k = C(() => {
      if (!n.searchable) return _.value;
      const L = y.value.trim().toLowerCase();
      return L ? _.value.filter((R) => R.label.toLowerCase().includes(L)) : _.value;
    }), w = C(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), $ = C(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((R) => R.value === n.modelValue)?.label ?? String(n.modelValue));
    function S(L) {
      return `${String(L.value)}-${L.label}`;
    }
    function M(L) {
      return n.modelValue === L.value;
    }
    function F(L, R) {
      const H = M(L), ee = f.value === R;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        H ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !H && ee ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function j() {
      f.value = Math.max(
        0,
        k.value.findIndex((L) => L.value === n.modelValue)
      );
    }
    function E() {
      if (n.searchable) {
        m.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function T() {
      p(), y.value = "", j(), We(() => E());
    }
    function P() {
      v.value = !1, y.value = "";
    }
    function V(L) {
      a("update:modelValue", L.value), P();
    }
    function X() {
      if (!n.disabled) {
        if (v.value) {
          P();
          return;
        }
        v.value = !0, T();
      }
    }
    function Z(L) {
      L.stopPropagation(), !n.disabled && X();
    }
    function ae(L) {
      if (!v.value) return;
      const R = L.target, H = r.value, ee = d.value;
      H && !H.contains(R) && (!ee || !ee.contains(R)) && P();
    }
    function se(L) {
      n.disabled || (L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), v.value || (v.value = !0, T()));
    }
    function ge(L) {
      const R = k.value;
      if (L.key === "Escape") {
        L.preventDefault(), P();
        return;
      }
      if (L.key === "ArrowDown") {
        if (L.preventDefault(), R.length === 0) return;
        f.value = 0, h.value?.focus();
        return;
      }
      if (L.key === "ArrowUp") {
        if (L.preventDefault(), R.length === 0) return;
        f.value = R.length - 1, h.value?.focus();
        return;
      }
      if (L.key === "Enter") {
        L.preventDefault();
        const H = R[f.value];
        H && V(H);
      }
    }
    function pe(L) {
      const R = k.value;
      if (L.key === "Escape") {
        L.preventDefault(), P();
        return;
      }
      if (R.length !== 0) {
        if (L.key === "ArrowDown") {
          L.preventDefault(), f.value = Math.min(f.value + 1, R.length - 1);
          return;
        }
        if (L.key === "ArrowUp") {
          if (L.preventDefault(), f.value === 0 && n.searchable) {
            m.value?.focus();
            return;
          }
          f.value = Math.max(f.value - 1, 0);
          return;
        }
        if (L.key === "Enter") {
          L.preventDefault();
          const H = R[f.value];
          H && V(H);
        }
      }
    }
    return Oe(y, () => {
      f.value = 0;
    }), tt(() => {
      document.addEventListener("click", ae);
    }), pt(() => {
      document.removeEventListener("click", ae);
    }), (L, R) => (g(), x("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: o,
        class: J(A(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: J([
          A(mt),
          "flex items-center justify-between gap-2 text-left",
          v.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": v.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: Z,
        onKeydown: se
      }, [
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, D($.value), 3),
        O(A(Yn), {
          class: J(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", v.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, ly),
      (g(), te(En, { to: "body" }, [
        lt(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: Ce(b.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (g(), x("div", ry, [
            lt(u("input", {
              ref_key: "searchInputRef",
              ref: m,
              "onUpdate:modelValue": R[0] || (R[0] = (H) => y.value = H),
              type: "search",
              class: J([A(mt), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: R[1] || (R[1] = Ye(() => {
              }, ["stop"])),
              onKeydown: Ye(ge, ["stop"])
            }, null, 42, cy), [
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
            onKeydown: Ye(pe, ["stop"])
          }, [
            k.value.length === 0 ? (g(), x("li", dy, D(e.noResultsText), 1)) : z("", !0),
            (g(!0), x(oe, null, fe(k.value, (H, ee) => (g(), x("li", {
              key: S(H),
              role: "option",
              "aria-selected": M(H),
              class: J(F(H, ee)),
              onClick: Ye((ue) => V(H), ["stop"]),
              onMouseenter: (ue) => f.value = ee
            }, [
              e.showOptionCheck ? (g(), x("span", hy, [
                M(H) ? (g(), te(A(cl), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : z("", !0)
              ])) : z("", !0),
              u("span", fy, D(H.label), 1)
            ], 42, uy))), 128))
          ], 544)
        ], 4), [
          [bn, v.value]
        ])
      ]))
    ], 512));
  }
}), gy = {
  class: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4",
  "aria-hidden": "true"
}, my = {
  class: "table-skeleton mt-6 w-full min-w-0",
  "aria-hidden": "true"
}, py = { class: "table-skeleton__table" }, by = {
  key: "content",
  class: "card-body"
}, vy = { class: "kpi-closed-value" }, yy = { class: "kpi-closed-value__main" }, xy = {
  key: 0,
  class: "kpi-closed-value__pct"
}, _y = { class: "table-view-select flex justify-end" }, ky = { class: "table-section w-full min-w-0" }, wy = { class: "cell-plain" }, Cy = { class: "cell-plain" }, $y = { class: "cell-plain cell-plain--muted" }, Sy = { class: "cell-plain" }, My = { class: "cell-plain" }, Dy = { class: "cell-plain" }, Ty = {
  key: 2,
  class: "empty-state"
}, Go = 6, Ay = /* @__PURE__ */ ce({
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
    const a = e, s = n, o = (N) => {
      s("export", N);
    }, { isDark: i } = Me($e(a, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(N) {
      const W = N?.trim() ?? "";
      return W.length > 0 && !l.has(W);
    }
    function c(N) {
      if (!r(N.agent_email)) return !1;
      const W = N.assigned_count ?? 0, G = N.closed_count ?? 0;
      return W > 0 || G > 0;
    }
    function d(N) {
      return N.closed_count ?? 0;
    }
    function h(N) {
      const W = N?.trim();
      return W || "—";
    }
    const m = C(
      () => (a.data?.agents_by_day ?? []).filter(c)
    ), v = C(() => m.value.length > 0), f = C(() => {
      const N = (a.data?.total_enqueued ?? 0) > 0;
      return v.value || N;
    }), y = ie("by_date"), b = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], p = ie("date"), _ = ie("desc"), k = Go;
    Oe(y, (N) => {
      N === "aggregated" ? (p.value = "name", _.value = "asc") : (p.value = "date", _.value = "desc");
    });
    function w(N, W) {
      return W == null ? null : W === 0 ? N > 0 ? 100 : 0 : (N - W) / W * 100;
    }
    function $(N) {
      const W = N.toFixed(1);
      return N > 0 ? `+${W}%` : `${W}%`;
    }
    function S(N, W = !1) {
      const G = W ? -N : N;
      return G > 0 ? "change-badge--up" : G < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function M(N, W) {
      if (N === null) return null;
      const G = w(N, W);
      return G === null ? null : {
        label: $(G),
        class: S(G, !0)
      };
    }
    function F(N) {
      if (N == null || N === "") return null;
      if (typeof N == "number")
        return Number.isFinite(N) ? N : null;
      const W = N.trim();
      if (!W) return null;
      if (W.includes(":")) {
        const U = W.split(":").map(Number);
        return U.length !== 3 || U.some(isNaN) ? null : U[0] * 3600 + U[1] * 60 + U[2];
      }
      const G = Number(W);
      return Number.isFinite(G) ? G : null;
    }
    function j(N) {
      const W = Math.round(N), G = Math.floor(W / 3600), U = Math.floor(W % 3600 / 60), K = W % 60;
      return `${String(G).padStart(2, "0")}:${String(U).padStart(2, "0")}:${String(K).padStart(2, "0")}`;
    }
    function E(N) {
      const W = F(N);
      return W === null ? "—" : typeof N == "string" && N.includes(":") ? N.trim() : j(W);
    }
    const T = C(() => a.data?.total_enqueued ?? 0), P = C(() => a.data?.total_closed ?? 0), V = C(
      () => a.data?.avg_time_to_assign_seconds ?? null
    ), X = C(
      () => a.data?.avg_conversation_duration_seconds ?? null
    ), Z = C(() => T.value <= 0 ? null : `(${(P.value / T.value * 100).toFixed(1)}%)`), ae = C(
      () => M(
        F(V.value),
        a.previousAvgTimeToAssignSeconds
      )
    ), se = C(
      () => M(
        F(X.value),
        a.previousAvgConversationDurationSeconds
      )
    );
    function ge(N, W) {
      return {
        id: `${N.date}-${N.agent_email}-${W}`,
        date: N.date,
        dateSort: new Date(N.date).getTime(),
        agent_name: N.agent_name ?? "",
        agent_email: N.agent_email,
        handled: d(N),
        avg_assignation_seconds: F(N.avg_time_to_assign_seconds),
        avg_resolution_seconds: F(N.avg_conversation_duration_seconds),
        avg_assignation_display: E(N.avg_time_to_assign_seconds),
        avg_resolution_display: E(N.avg_conversation_duration_seconds)
      };
    }
    function pe(N) {
      const W = /* @__PURE__ */ new Map();
      for (const G of N) {
        if (!c(G)) continue;
        const U = G.agent_email.trim();
        W.has(U) || W.set(U, {
          agent_name: G.agent_name?.trim() ?? "",
          agent_email: U,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const K = W.get(U), q = G.assigned_count ?? 0, re = G.closed_count ?? 0;
        K.handled += d(G), G.agent_name?.trim() && (K.agent_name = G.agent_name.trim());
        const he = F(G.avg_time_to_assign_seconds);
        he !== null && q > 0 && (K.assignSum += he * q, K.assignWeight += q);
        const I = F(G.avg_conversation_duration_seconds);
        I !== null && re > 0 && (K.resolutionSum += I * re, K.resolutionWeight += re);
      }
      return Array.from(W.values()).map((G, U) => {
        const K = G.assignWeight > 0 ? G.assignSum / G.assignWeight : null, q = G.resolutionWeight > 0 ? G.resolutionSum / G.resolutionWeight : null;
        return {
          id: `agg-${G.agent_email}-${U}`,
          agent_name: G.agent_name,
          agent_email: G.agent_email,
          handled: G.handled,
          avg_assignation_seconds: K,
          avg_resolution_seconds: q,
          avg_assignation_display: K !== null ? j(K) : "—",
          avg_resolution_display: q !== null ? j(q) : "—"
        };
      });
    }
    const L = C(() => {
      const N = m.value;
      return y.value === "aggregated" ? pe(N) : N.map(ge);
    });
    function R(N, W, G, U) {
      const K = U === "asc" ? 1 : -1;
      let q = 0;
      switch (G) {
        case "date":
          q = (N.dateSort ?? 0) - (W.dateSort ?? 0);
          break;
        case "name":
          q = (N.agent_name || "").localeCompare(W.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          q = N.agent_email.localeCompare(W.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          q = N.handled - W.handled;
          break;
        case "avgAssignation":
          q = (N.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (W.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          q = (N.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (W.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (q !== 0) return q * K;
      if (y.value === "by_date" && G !== "date") {
        const re = (W.dateSort ?? 0) - (N.dateSort ?? 0);
        if (re !== 0) return re;
      }
      return (N.agent_name || "").localeCompare(W.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const H = C(() => {
      const N = [...L.value];
      return N.sort((W, G) => R(W, G, p.value, _.value)), N;
    }), ee = C(
      () => H.value
    ), ue = C(() => {
      const N = [];
      return y.value === "by_date" && N.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), N.push(
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
      ), N;
    });
    function De(N) {
      const W = N;
      if (p.value === W) {
        _.value = _.value === "asc" ? "desc" : "asc";
        return;
      }
      p.value = W, W === "date" ? _.value = "desc" : W === "name" || W === "email" ? _.value = "asc" : _.value = "desc";
    }
    const Se = (N) => N == null ? "0" : le(N), Q = (N) => new Date(N).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (N, W) => (g(), te(ke, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", {
              key: "loading",
              class: J(["card-body loading-body", { "agent-human-conv--dark": A(i) }]),
              "aria-busy": "true",
              "aria-label": "Loading agent human conversations"
            }, [
              u("div", gy, [
                (g(), x(oe, null, fe(4, (G) => O(vt, {
                  key: `kpi-skeleton-${G}`,
                  label: "Loading",
                  value: "",
                  "label-position": "header",
                  loading: !0,
                  theme: e.theme
                }, null, 8, ["theme"])), 64))
              ]),
              u("section", my, [
                W[2] || (W[2] = u("div", { class: "table-skeleton__header" }, [
                  u("div", { class: "table-skeleton__titles" }, [
                    u("div", { class: "bm-skeleton-blink skeleton-section-title" }),
                    u("div", { class: "bm-skeleton-blink skeleton-section-subtitle" })
                  ]),
                  u("div", { class: "bm-skeleton-blink skeleton-table-select" })
                ], -1)),
                u("div", py, [
                  W[1] || (W[1] = u("div", { class: "bm-skeleton-blink skeleton-table-head" }, null, -1)),
                  (g(!0), x(oe, null, fe(A(k), (G) => (g(), x("div", {
                    key: `table-row-skeleton-${G}`,
                    class: "bm-skeleton-blink skeleton-table-row"
                  }))), 128))
                ])
              ])
            ], 2)) : (g(), x("div", by, [
              f.value ? (g(), x("div", {
                key: 0,
                class: J(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": A(i) }])
              }, [
                O(vt, {
                  label: "Conversations Opened",
                  "label-position": "header",
                  value: Se(T.value),
                  theme: e.theme,
                  "current-value": T.value,
                  "previous-value": e.previousTotalEnqueued
                }, {
                  icon: B(() => [...W[3] || (W[3] = [
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
                O(vt, {
                  label: "Conversations Closed",
                  "label-position": "header",
                  value: Se(P.value),
                  theme: e.theme,
                  "current-value": P.value,
                  "previous-value": e.previousTotalClosed
                }, {
                  icon: B(() => [...W[4] || (W[4] = [
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
                    u("div", vy, [
                      u("span", yy, D(Se(P.value)), 1),
                      Z.value ? (g(), x("span", xy, D(Z.value), 1)) : z("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["value", "theme", "current-value", "previous-value"]),
                O(vt, {
                  label: "Avg Time to Assign",
                  "label-position": "header",
                  value: E(V.value),
                  theme: e.theme,
                  "current-value": F(V.value) ?? 0,
                  "previous-value": e.previousAvgTimeToAssignSeconds
                }, $s({
                  icon: B(() => [
                    W[5] || (W[5] = u("svg", {
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
                  ae.value ? {
                    name: "headerAside",
                    fn: B(() => [
                      u("div", {
                        class: J(["duration-trend-badge", ae.value.class])
                      }, D(ae.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"]),
                O(vt, {
                  label: "Avg Resolution Time",
                  "label-position": "header",
                  value: E(X.value),
                  theme: e.theme,
                  "current-value": F(X.value) ?? 0,
                  "previous-value": e.previousAvgConversationDurationSeconds
                }, $s({
                  icon: B(() => [
                    W[6] || (W[6] = u("svg", {
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
                  se.value ? {
                    name: "headerAside",
                    fn: B(() => [
                      u("div", {
                        class: J(["duration-trend-badge", se.value.class])
                      }, D(se.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"])
              ], 2)) : z("", !0),
              v.value ? (g(), te(ke, {
                key: 1,
                class: "agent-table-section mt-6",
                title: "Conversations Managed by Agent",
                subtitle: "Daily performance per human agent",
                collapsible: !1
              }, {
                headerAside: B(() => [
                  u("div", _y, [
                    O(ws, {
                      modelValue: y.value,
                      "onUpdate:modelValue": W[0] || (W[0] = (G) => y.value = G),
                      options: b,
                      "aria-label-trigger": "Table view mode",
                      "show-option-check": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                default: B(() => [
                  u("div", ky, [
                    (g(), te(rt, {
                      key: `${y.value}-${p.value}-${_.value}`,
                      columns: ue.value,
                      rows: ee.value,
                      "sort-key": p.value,
                      "sort-direction": _.value,
                      "max-visible-rows": Go,
                      "row-key": "id",
                      onSort: De
                    }, {
                      "cell-date": B(({ row: G }) => [
                        u("span", wy, D(Q(String(G.date))), 1)
                      ]),
                      "cell-name": B(({ row: G }) => [
                        u("span", Cy, D(h(G.agent_name)), 1)
                      ]),
                      "cell-email": B(({ row: G }) => [
                        u("span", $y, D(G.agent_email), 1)
                      ]),
                      "cell-handled": B(({ row: G }) => [
                        u("span", Sy, D(Se(Number(G.handled))), 1)
                      ]),
                      "cell-avgAssignation": B(({ row: G }) => [
                        u("span", My, D(G.avg_assignation_display), 1)
                      ]),
                      "cell-avgResolution": B(({ row: G }) => [
                        u("span", Dy, D(G.avg_resolution_display), 1)
                      ]),
                      _: 1
                    }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
                  ])
                ]),
                _: 1
              })) : f.value ? z("", !0) : (g(), x("div", Ty, [...W[7] || (W[7] = [
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
}), By = /* @__PURE__ */ me(Ay, [["__scopeId", "data-v-03179a66"]]), Ly = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Py = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Ry = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Iy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ey = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Fy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Oy = { class: "max-w-[360px] px-4 text-center" }, Vy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Zo = 5, zy = /* @__PURE__ */ ce({
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
    }, i = $e(a, "theme"), { isDark: l } = Me(i), r = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, c = ie({
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
        (p, _) => p + _,
        0
      );
      return b === 0 ? [] : Object.entries(y).sort(([, p], [, _]) => _ - p).map(([p, _]) => ({
        name: p,
        label: p.toUpperCase(),
        total: _,
        percentage: (_ / b * 100).toFixed(1),
        color: r[p.toLowerCase()] || "#9ca3af"
      }));
    }), m = C(
      () => h.value.slice(0, Zo)
    ), v = C(() => {
      const y = Math.min(m.value.length, Zo);
      if (!(y <= 0))
        return { gridTemplateColumns: `repeat(${y}, minmax(0, 1fr))` };
    }), f = (y) => {
      if (!y || !y.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const b = y.channels_by_day, p = Object.keys(b).sort();
      if (p.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(b))
        for (const S of Object.keys($))
          _.add(S);
      const w = Array.from(_).map(($) => {
        const S = $.toLowerCase(), M = r[S] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: p.map((F) => b[F]?.[$] || 0),
          borderColor: M
        };
      });
      c.value = {
        labels: p.map(($) => je($).format("MMM DD")),
        datasets: w
      };
    };
    return Oe(
      () => a.data,
      (y) => {
        f(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (y, b) => (g(), te(ke, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (g(), te(A(Ve), {
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
          O(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (g(), x("div", Ly, [...b[0] || (b[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (g(), x("div", Py, [
                c.value.labels && c.value.labels.length ? (g(), x("section", Ry, [
                  u("div", Iy, [
                    O(yt, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  m.value.length ? (g(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(v.value)
                  }, [
                    (g(!0), x(oe, null, fe(m.value, (p) => (g(), te(ye, {
                      key: p.name,
                      class: "min-w-0",
                      color: p.color,
                      title: p.label,
                      value: `${p.percentage}%`,
                      subvalue: `${A(le)(p.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : z("", !0)
                ])) : h.value.length ? (g(), x("section", Ey, [
                  u("div", {
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(v.value)
                  }, [
                    (g(!0), x(oe, null, fe(m.value, (p) => (g(), te(ye, {
                      key: p.name,
                      class: "min-w-0",
                      color: p.color,
                      title: p.label,
                      value: `${p.percentage}%`,
                      subvalue: `${A(le)(p.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)
                ])) : z("", !0),
                h.value.length ? z("", !0) : (g(), x("section", Fy, [
                  u("div", Oy, [
                    u("div", Vy, [
                      O(A(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), Ny = /* @__PURE__ */ me(zy, [["__scopeId", "data-v-de07e6c8"]]), Hy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Wy = {
  key: "content",
  class: "card-body"
}, jy = { class: "chart-container" }, Ky = { class: "triage-table-block w-full min-w-0" }, Yy = { class: "triage-row-label" }, Uy = {
  key: 1,
  class: "triage-count"
}, qy = {
  key: 1,
  class: "triage-count"
}, Xy = {
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
  class: "empty-state"
}, Jy = { class: "empty-state-content" }, e1 = { class: "empty-icon-wrapper" }, t1 = /* @__PURE__ */ ce({
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
    const a = e, s = n, o = (k) => {
      s("export", k);
    }, { isDark: i, colors: l } = Me(
      $e(a, "theme")
    ), r = C(() => {
      const k = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, S] of Object.entries(k)) {
        const M = $.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const F = M.filter((j) => j !== "triage").length;
        F >= 4 ? w["4p"] += Number(S) || 0 : w[F] += Number(S) || 0;
      }
      return w;
    }), c = C(() => {
      const k = r.value;
      return k[0] + k[1] + k[2] + k[3] + k["4p"] || 0;
    }), d = C(() => Object.keys(a.data?.combinations || {}).length > 0), h = C(() => {
      const k = c.value;
      if (!k) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = r.value;
      return {
        pct0: w[0] / k * 100,
        pct1: w[1] / k * 100,
        pct2: w[2] / k * 100,
        pct3: w[3] / k * 100,
        pct4p: w["4p"] / k * 100
      };
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], v = C(() => {
      const k = h.value, w = r.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: k.pct0,
          b1: k.pct1,
          b2: k.pct2,
          b3: k.pct3,
          b4p: k.pct4p
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
    }, y = (k) => k?.replace("80", "") || "#888888", b = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: f.c0,
          borderColor: y(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: f.c1,
          borderColor: y(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: f.c2,
          borderColor: y(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: f.c3,
          borderColor: y(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: y(f.c4p),
          borderWidth: 1
        }
      ]
    })), p = C(() => ({
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
            label: (k) => `${k.dataset.label} intent(s): ${Number(k.raw || 0).toFixed(0)}%`
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
    })), _ = (k) => `${(Number(k) || 0).toFixed(0)}`;
    return t({ isDark: i }), (k, w) => (g(), te(ke, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", Hy, [...w[0] || (w[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", Wy, [
              d.value ? (g(), x(oe, { key: 0 }, [
                u("div", jy, [
                  O(St, {
                    data: b.value,
                    options: p.value
                  }, null, 8, ["data", "options"])
                ]),
                O(ye, {
                  class: "w-full min-w-0",
                  title: "Total",
                  value: A(le)(c.value),
                  subvalue: "Conversations with triage"
                }, null, 8, ["value"]),
                u("div", Ky, [
                  O(rt, {
                    columns: m,
                    rows: v.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-metric": B(({ row: $ }) => [
                      u("span", Yy, D($.metric), 1)
                    ]),
                    "cell-b0": B(({ row: $ }) => [
                      $.id === "pct" ? (g(), x("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Ce({ color: y(f.c0) })
                      }, D(_(Number($.b0))) + "%", 5)) : (g(), x("span", Uy, D(A(le)(Number($.b0))), 1))
                    ]),
                    "cell-b1": B(({ row: $ }) => [
                      $.id === "pct" ? (g(), x("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Ce({ color: y(f.c1) })
                      }, D(_(Number($.b1))) + "%", 5)) : (g(), x("span", qy, D(A(le)(Number($.b1))), 1))
                    ]),
                    "cell-b2": B(({ row: $ }) => [
                      $.id === "pct" ? (g(), x("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Ce({ color: y(f.c2) })
                      }, D(_(Number($.b2))) + "%", 5)) : (g(), x("span", Xy, D(A(le)(Number($.b2))), 1))
                    ]),
                    "cell-b3": B(({ row: $ }) => [
                      $.id === "pct" ? (g(), x("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Ce({ color: y(f.c3) })
                      }, D(_(Number($.b3))) + "%", 5)) : (g(), x("span", Gy, D(A(le)(Number($.b3))), 1))
                    ]),
                    "cell-b4p": B(({ row: $ }) => [
                      $.id === "pct" ? (g(), x("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Ce({ color: y(f.c4p) })
                      }, D(_(Number($.b4p))) + "%", 5)) : (g(), x("span", Zy, D(A(le)(Number($.b4p))), 1))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ], 64)) : (g(), x("div", Qy, [
                u("div", Jy, [
                  u("div", e1, [
                    O(A(nt), { class: "empty-icon" })
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
}), n1 = /* @__PURE__ */ me(t1, [["__scopeId", "data-v-4610c1a9"]]), a1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, s1 = {
  key: "content",
  class: "card-body"
}, o1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, i1 = { class: "pie-section" }, l1 = {
  key: 1,
  class: "empty-state"
}, r1 = /* @__PURE__ */ ce({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Me($e(n, "theme")), o = [
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
      () => (n.data?.items || []).reduce((v, f) => v + f.count, 0)
    ), d = C(() => {
      const v = {};
      for (const f of n.data?.items || [])
        v[f.language] = (v[f.language] || 0) + f.count;
      return Object.entries(v).map(([f, y]) => ({ language: f, count: y })).sort((f, y) => y.count - f.count);
    }), h = C(() => ({
      labels: d.value.map((v) => l(v.language)),
      datasets: [
        {
          data: d.value.map((v) => v.count),
          backgroundColor: d.value.map(
            (v, f) => o[f % o.length] + "80"
          ),
          borderColor: d.value.map(
            (v, f) => o[f % o.length]
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
              const f = v.raw || 0, y = c.value > 0 ? (f / c.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${f} (${y}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (v, f) => (g(), te(ke, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            n.loading ? (g(), x("div", a1, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", s1, [
              r.value ? (g(), x("div", o1, [
                u("section", i1, [
                  O(Da, {
                    data: h.value,
                    options: m.value
                  }, null, 8, ["data", "options"])
                ]),
                O(ye, {
                  class: "shrink-0",
                  title: "Total",
                  value: A(le)(c.value),
                  color: "#8b5cf6"
                }, null, 8, ["value"])
              ])) : (g(), x("section", l1, [...f[1] || (f[1] = [
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
}), c1 = /* @__PURE__ */ me(r1, [["__scopeId", "data-v-8743ba33"]]), d1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, u1 = {
  key: "content",
  class: "card-body"
}, h1 = {
  key: 0,
  class: "guardrails-daily-section"
}, f1 = { class: "w-full min-w-0" }, g1 = { class: "font-medium" }, m1 = { class: "font-semibold" }, p1 = { class: "type-badges-row" }, b1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, v1 = {
  key: 1,
  class: "empty-state"
}, y1 = /* @__PURE__ */ ce({
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
    }, { isDark: i } = Me($e(a, "theme")), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), r = C(
      () => (a.data?.items || []).reduce((b, p) => b + p.count, 0)
    ), c = (b) => {
      const p = {};
      for (const w of a.data?.items || [])
        p[w[b]] = (p[w[b]] || 0) + w.count;
      const _ = Object.entries(p).sort((w, $) => $[1] - w[1]);
      if (_.length === 0) return { name: "—", pct: 0 };
      const k = r.value;
      return {
        name: _[0][0],
        pct: k > 0 ? Math.round(_[0][1] / k * 100) : 0
      };
    }, d = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), m = C(() => c("guardrail_source")), v = C(() => {
      const b = {};
      for (const p of a.data?.items || [])
        b[p.date] || (b[p.date] = {}), b[p.date][p.guardrail_type] = (b[p.date][p.guardrail_type] || 0) + p.count;
      return Object.entries(b).map(([p, _]) => ({
        date: p,
        total: Object.values(_).reduce((k, w) => k + w, 0),
        types: Object.entries(_).map(([k, w]) => ({ type: k, count: w })).sort((k, w) => w.count - k.count)
      })).sort((p, _) => new Date(p.date).getTime() - new Date(_.date).getTime());
    }), f = [
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
    return t({ isDark: i }), (b, p) => (g(), te(ke, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", d1, [...p[0] || (p[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", u1, [
              l.value ? (g(), x(oe, { key: 0 }, [
                v.value.length > 0 ? (g(), x("section", h1, [
                  u("div", f1, [
                    O(rt, {
                      columns: f,
                      rows: y.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-date": B(({ row: _ }) => [
                        u("span", g1, D(A(je)(String(_.date)).format("MMM DD")), 1)
                      ]),
                      "cell-count": B(({ row: _ }) => [
                        u("span", m1, D(A(le)(_.total)), 1)
                      ]),
                      "cell-types": B(({ row: _ }) => [
                        u("div", p1, [
                          (g(!0), x(oe, null, fe(_.types, (k) => (g(), x("span", {
                            key: k.type,
                            class: "type-count-badge"
                          }, D(k.type) + " (" + D(k.count) + ") ", 1))), 128))
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : z("", !0),
                u("section", b1, [
                  O(ye, {
                    title: "Total Events",
                    value: A(le)(r.value)
                  }, null, 8, ["value"]),
                  O(ye, {
                    title: "Top type",
                    value: d.value.name,
                    subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  O(ye, {
                    title: "Top action",
                    value: h.value.name,
                    subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  O(ye, {
                    title: "Top source",
                    value: m.value.name,
                    subvalue: m.value.pct > 0 ? `(${m.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"])
                ])
              ], 64)) : (g(), x("section", v1, [...p[1] || (p[1] = [
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
}), x1 = /* @__PURE__ */ me(y1, [["__scopeId", "data-v-80a28b15"]]), _1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, k1 = {
  key: "content",
  class: "card-body"
}, w1 = { class: "chart-section" }, C1 = { class: "chart-wrapper" }, $1 = {
  key: 1,
  class: "empty-chart"
}, S1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, M1 = {
  key: 0,
  class: "dn-failure-section"
}, D1 = { class: "w-full min-w-0" }, T1 = { class: "failure-reason" }, A1 = { class: "failure-count" }, B1 = { class: "impact-bar-container" }, L1 = { class: "impact-label" }, P1 = { class: "dn-trend-health-block flex flex-col gap-0" }, R1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, I1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, E1 = { class: "system-health" }, F1 = { class: "system-health-content" }, O1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, V1 = {
  key: 1,
  class: "empty-state"
}, z1 = /* @__PURE__ */ ce({
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
    }, { isDark: i, colors: l } = Me($e(a, "theme")), r = C(() => {
      const $ = a.data?.documentCounts?.items || [], S = a.data?.processingCounts?.items || [];
      return $.length > 0 || S.length > 0;
    }), c = C(() => {
      const $ = a.data?.documentCounts?.items || [];
      return {
        processing_started: $.reduce((S, M) => S + M.processing_started, 0),
        processing_completed: $.reduce((S, M) => S + M.processing_completed, 0),
        processing_failed: $.reduce((S, M) => S + M.processing_failed, 0),
        row_count_total: $.reduce((S, M) => S + M.row_count_total, 0)
      };
    }), d = C(() => {
      const $ = a.data?.processingCounts?.items || [];
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
      () => c.value.row_count_total || d.value.processing_started
    ), m = C(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), v = ($, S) => S ? `${Math.round($ / S * 100)}%` : "0%", f = C(() => {
      const $ = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].filter((S) => S.count > 0).sort((S, M) => M.count - S.count);
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
      ].map((S) => ({
        ...S,
        impactPct: $ > 0 ? Math.round(S.count / $ * 100) : 0
      }));
    }), b = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], p = C(
      () => y.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), _ = C(() => {
      const $ = h.value, S = d.value.processing_success, M = Math.max(0, S - d.value.totalDqErrors), F = d.value.notification_sent, j = Math.max(0, $ - S), E = d.value.totalDqErrors, T = Math.max(0, M - F), P = (Z, ae) => ve(Z, ae), V = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], X = [];
      return S > 0 && X.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: S,
        label: P(S, $)
      }), j > 0 && X.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: j,
        label: P(j, $)
      }), M > 0 && X.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: P(M, $)
      }), E > 0 && X.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: E,
        label: P(E, $)
      }), F > 0 && X.push({
        source: "Contactable",
        target: "Notified",
        value: F,
        label: P(F, $)
      }), T > 0 && X.push({
        source: "Contactable",
        target: "Not Delivered",
        value: T,
        label: P(T, $)
      }), { nodes: V, links: X };
    }), k = C(() => {
      const $ = [...a.data?.processingCounts?.items || []].sort(
        (P, V) => new Date(P.date).getTime() - new Date(V.date).getTime()
      ), S = a.data?.documentCounts?.items || [], M = {};
      for (const P of S)
        M[P.date] = (M[P.date] || 0) + P.row_count_total;
      const F = [
        .../* @__PURE__ */ new Set([
          ...$.map((P) => P.date),
          ...S.map((P) => P.date)
        ])
      ].sort(), j = F.map((P) => je(P).format("MMM DD")), E = F.map((P) => {
        const V = $.find((ae) => ae.date === P), X = V?.notification_sent || 0, Z = M[P] || V?.processing_started || 0;
        return Z > 0 ? Math.round(X / Z * 100) : 0;
      }), T = F.map((P) => $.find((X) => X.date === P)?.notification_sent || 0);
      return {
        labels: j,
        datasets: [
          {
            label: "Success Rate (%)",
            data: E,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: T,
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
    return t({ isDark: i }), ($, S) => (g(), te(ke, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (g(), x("div", _1, [...S[0] || (S[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", k1, [
              r.value ? (g(), x(oe, { key: 0 }, [
                u("section", w1, [
                  S[2] || (S[2] = u("div", { class: "chart-header" }, [
                    u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
                  ], -1)),
                  u("div", C1, [
                    _.value.nodes.length > 0 && _.value.links.length > 0 ? (g(), te(qt, {
                      key: 0,
                      data: _.value,
                      height: "350px",
                      "use-gradient": !1,
                      "node-gap": 24
                    }, null, 8, ["data"])) : (g(), x("div", $1, [...S[1] || (S[1] = [
                      u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                    ])]))
                  ])
                ]),
                u("div", S1, [
                  O(ye, {
                    color: "#3b82f6",
                    title: "Total Records",
                    value: A(le)(c.value.row_count_total)
                  }, null, 8, ["value"]),
                  O(ye, {
                    color: "#8b5cf6",
                    title: "Passengers Affected",
                    value: A(le)(h.value)
                  }, null, 8, ["value"]),
                  O(ye, {
                    color: "#10b981",
                    title: "Successfully Notified",
                    value: A(le)(d.value.notification_sent),
                    subvalue: v(d.value.notification_sent, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  O(ye, {
                    color: "#ef4444",
                    title: "Not Notified",
                    value: A(le)(m.value),
                    subvalue: v(m.value, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  O(ye, {
                    color: "#f59e0b",
                    title: "Main Failure Reason",
                    value: f.value.reason,
                    subvalue: f.value.count > 0 ? `${A(le)(f.value.count)} cases` : void 0
                  }, null, 8, ["value", "subvalue"])
                ]),
                y.value.length > 0 ? (g(), x("section", M1, [
                  S[3] || (S[3] = u("div", { class: "section-header" }, [
                    u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
                  ], -1)),
                  u("div", D1, [
                    O(rt, {
                      columns: b,
                      rows: p.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-reason": B(({ row: M }) => [
                        u("span", T1, D(M.reason), 1)
                      ]),
                      "cell-count": B(({ row: M }) => [
                        u("span", A1, D(A(le)(M.count)), 1)
                      ]),
                      "cell-impact": B(({ row: M }) => [
                        u("div", B1, [
                          u("div", {
                            class: "impact-bar",
                            style: Ce({ width: M.impactPct + "%" })
                          }, null, 4),
                          u("span", L1, D(M.impactPct) + "%", 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : z("", !0),
                u("div", P1, [
                  k.value.labels.length > 0 ? (g(), x("section", R1, [
                    S[4] || (S[4] = u("div", { class: "chart-header" }, [
                      u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                    ], -1)),
                    u("div", I1, [
                      O(yt, {
                        data: k.value,
                        options: w.value,
                        theme: a.theme
                      }, null, 8, ["data", "options", "theme"])
                    ])
                  ])) : z("", !0),
                  u("details", E1, [
                    S[5] || (S[5] = u("summary", { class: "system-health-toggle" }, [
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
                    u("div", F1, [
                      u("div", O1, [
                        O(ye, {
                          title: "Docs Started",
                          value: A(le)(c.value.processing_started)
                        }, null, 8, ["value"]),
                        O(ye, {
                          title: "Docs Completed",
                          value: A(le)(c.value.processing_completed)
                        }, null, 8, ["value"]),
                        O(ye, {
                          title: "Docs Failed",
                          value: A(le)(c.value.processing_failed)
                        }, null, 8, ["value"]),
                        O(ye, {
                          title: "Processing Started",
                          value: A(le)(d.value.processing_started)
                        }, null, 8, ["value"]),
                        O(ye, {
                          title: "Processing Success",
                          value: A(le)(d.value.processing_success)
                        }, null, 8, ["value"]),
                        O(ye, {
                          title: "Notification Failed",
                          value: A(le)(d.value.notification_failed)
                        }, null, 8, ["value"])
                      ])
                    ])
                  ])
                ])
              ], 64)) : (g(), x("section", V1, [...S[6] || (S[6] = [
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
}), N1 = /* @__PURE__ */ me(z1, [["__scopeId", "data-v-c77ab172"]]), H1 = /* @__PURE__ */ ce({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ie(null), s = C(() => le(n.totalConversations)), o = C(() => A(a.value?.isDark) ?? !1), i = C(() => A(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (g(), te(vt, {
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
}), W1 = /* @__PURE__ */ ce({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ie(null), s = C(() => `${n.csatP95.toFixed(1)}`), o = C(() => A(a.value?.isDark) ?? !1), i = C(() => A(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (g(), te(vt, {
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
}), j1 = /* @__PURE__ */ ce({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ie(null), s = C(() => `${n.csatPulse.toFixed(1)}%`), o = C(() => A(a.value?.isDark) ?? !1), i = C(() => A(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (g(), te(vt, {
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
}), K1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Y1 = { key: "content" }, U1 = {
  key: 0,
  class: "card-body"
}, q1 = { class: "chart-wrapper" }, X1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, G1 = {
  key: 1,
  class: "empty-state"
}, Z1 = 520, Q1 = 300, J1 = 40, ex = 48, tx = 48, nx = {
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
    }, o = e, { isDark: i } = Me($e(o, "theme")), l = C(() => o.data);
    return t({ isDark: i }), (r, c) => (g(), te(ke, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            o.loading ? (g(), x("div", K1, [...c[0] || (c[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", Y1, [
              l.value && l.value.total_nps_responses > 0 ? (g(), x("div", U1, [
                u("div", q1, [
                  O(el, {
                    histogram: l.value.histogram || [],
                    "min-score": l.value.min_score || 0,
                    "max-score": l.value.max_score || 0,
                    "q1-score": l.value.q1_score || 0,
                    "median-score": l.value.median_score || 0,
                    "q3-score": l.value.q3_score || 0,
                    "average-score": l.value.average_score || 0,
                    "chart-width": Z1,
                    "chart-height": Q1,
                    "chart-margin": J1,
                    "chart-margin-right": ex,
                    "chart-bottom-margin": tx,
                    "plot-inset": 10,
                    "show-legend": !1,
                    "show-stat-labels": !1
                  }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
                ]),
                u("div", X1, [
                  O(ye, {
                    class: "min-w-0 flex-1",
                    title: "Responses",
                    value: String(l.value.total_nps_responses)
                  }, null, 8, ["value"]),
                  l.value.p95_score > 0 ? (g(), te(ye, {
                    key: 0,
                    class: "min-w-0 flex-1",
                    title: "Percentile 95",
                    value: String(l.value.p95_score)
                  }, null, 8, ["value"])) : z("", !0)
                ])
              ])) : (g(), x("div", G1, [...c[1] || (c[1] = [
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
}, dl = /* @__PURE__ */ me(nx, [["__scopeId", "data-v-3a3f4c10"]]), ax = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, sx = { key: "content" }, ox = {
  key: 0,
  class: "card-body"
}, ix = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, lx = {
  key: 1,
  class: "empty-state"
}, rx = {
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
    return (c, d) => (g(), te(ke, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (g(), x("div", ax, [...d[0] || (d[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", sx, [
              i.value ? (g(), x("div", ox, [
                u("div", ix, [
                  O(yt, {
                    data: l.value,
                    options: r,
                    "uppercase-legend-labels": !0
                  }, null, 8, ["data"])
                ])
              ])) : (g(), x("div", lx, [...d[1] || (d[1] = [
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
}, ul = /* @__PURE__ */ me(rx, [["__scopeId", "data-v-cd8c9258"]]), cx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, dx = { key: "content" }, ux = {
  key: 0,
  class: "card-body"
}, hx = {
  key: 1,
  class: "empty-state"
}, fx = /* @__PURE__ */ ce({
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
    return (i, l) => (g(), te(ke, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            t.loading ? (g(), x("div", cx, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", dx, [
              a.value ? (g(), x("div", ux, [
                O(St, {
                  data: s.value,
                  options: o,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (g(), x("div", hx, [...l[1] || (l[1] = [
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
}), gx = /* @__PURE__ */ me(fx, [["__scopeId", "data-v-f99eebba"]]), mx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, px = { key: "content" }, bx = {
  key: 0,
  class: "card-body"
}, vx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, yx = {
  key: 1,
  class: "empty-state"
}, xx = /* @__PURE__ */ ce({
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
    const n = t, a = (c) => {
      n("export", c);
    }, s = e, o = C(() => s.data?.csat_pulse_by_day || []), i = C(() => o.value.length > 0), l = C(() => ({
      labels: o.value.map((c) => c.date || ""),
      datasets: [
        {
          label: "CSAT Pulse",
          data: o.value.map((c) => Number(c.csat_pulse || 0)),
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
    return (c, d) => (g(), te(ke, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: a
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        O(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (g(), x("div", mx, [...d[0] || (d[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (g(), x("div", px, [
              i.value ? (g(), x("div", bx, [
                u("div", vx, [
                  O(yt, {
                    data: l.value,
                    options: r,
                    "uppercase-legend-labels": !0
                  }, null, 8, ["data"])
                ])
              ])) : (g(), x("div", yx, [...d[1] || (d[1] = [
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
}), _x = /* @__PURE__ */ me(xx, [["__scopeId", "data-v-1ad475b2"]]), kx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, wx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, hl = {
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
    return (d, h) => (g(), x("div", kx, [
      u("div", wx, [
        O(dl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"]),
        O(ul, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (g(), x("div", {
        key: 0,
        class: J(["grid w-full items-start gap-6", c.value])
      }, [
        o.value ? (g(), te(gx, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0),
        i.value ? (g(), te(_x, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])) : z("", !0)
      ], 2)) : z("", !0)
    ]));
  }
}, Cx = { class: "csat-container__body" }, $x = /* @__PURE__ */ ce({
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
    return (s, o) => (g(), te(ke, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", Cx, [
          O(hl, {
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
}), Sx = /* @__PURE__ */ me($x, [["__scopeId", "data-v-71605c0e"]]), Mx = /* @__PURE__ */ ce({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ie(null), s = C(() => Et(n.totalRevenue)), o = C(() => A(a.value?.isDark) ?? !1), i = C(() => A(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (g(), te(vt, {
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
}), Qo = 1, Dx = /* @__PURE__ */ ce({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ie(null), { isDark: s } = Me($e(n, "theme")), o = C(() => n.totalConversations * Qo), i = C(() => n.previousTotalConversations === null || n.previousTotalConversations === void 0 ? null : n.previousTotalConversations * Qo), l = C(() => le(o.value)), r = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!r.value) return 0;
      const m = i.value;
      return m === 0 ? o.value > 0 ? 100 : 0 : (o.value - m) / m * 100;
    }), d = C(() => {
      const m = c.value.toFixed(1);
      return c.value > 0 ? `+${m}%` : `${m}%`;
    }), h = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: c }), (m, v) => (g(), te(vt, {
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
        r.value ? (g(), x("div", {
          key: 0,
          class: J(["change-badge", h.value, { "change-badge--dark": A(s) }])
        }, D(d.value), 3)) : z("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Tx = /* @__PURE__ */ me(Dx, [["__scopeId", "data-v-411e0735"]]), Ax = { class: "flex justify-end" }, Bx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Lx = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Px = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Rx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ix = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Ex = /* @__PURE__ */ ce({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (w) => {
      s("export", w);
    }, i = $e(a, "theme"), { isDark: l } = Me(i), r = ie(a.breakdownBy), c = C(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), d = ie({
      labels: [],
      datasets: []
    }), h = ie([]), m = C(() => {
      const w = h.value.length;
      if (!(w <= 0))
        return { gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` };
    }), v = ie(
      []
    ), f = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], y = (w) => f[w % f.length], b = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (w) => `${w}%`
          }
        }
      }
    }, p = () => {
      s("changeBreakdown", r.value);
    }, _ = (w) => {
      if (!w) return "";
      const S = w.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return S ? S.charAt(0).toUpperCase() + S.slice(1) : "";
    }, k = (w) => {
      if (r.value === "all") {
        const T = w?.escalations_by_day ?? [];
        if (!T.length) {
          d.value = { labels: [], datasets: [] }, h.value = [], v.value = [];
          return;
        }
        const P = [...T].sort((V, X) => V.date.localeCompare(X.date));
        d.value = {
          labels: P.map((V) => je(V.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: P.map(
                (V) => Number(V.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, h.value = [], v.value = [];
        return;
      }
      const $ = w?.breakdown_by_day ?? [], S = w?.breakdown_items ?? [];
      if (!$.length) {
        d.value = { labels: [], datasets: [] }, h.value = [], v.value = [];
        return;
      }
      const M = [...$].sort(
        (T, P) => T.date.localeCompare(P.date)
      ), F = S.slice(0, 5).map((T) => T.key), j = M.map((T) => je(T.date).format("MMM DD")), E = F.map((T, P) => {
        const V = S.find((X) => X.key === T);
        return {
          label: _(V?.label || T),
          data: M.map((X) => {
            const Z = X.items.find((ae) => ae.key === T);
            return Number(Z?.percentage || 0);
          }),
          borderColor: y(P),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      d.value = {
        labels: j,
        datasets: E
      }, h.value = S.slice(0, 5).map((T, P) => ({
        key: T.key,
        label: _(T.label),
        percentage: Number(T.percentage || 0),
        color: y(P)
      })), v.value = S.slice(0, 5).map((T, P) => ({
        key: T.key,
        label: _(T.label),
        color: y(P)
      }));
    };
    return Oe(
      () => a.data,
      (w) => {
        k(w ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Oe(
      () => a.breakdownBy,
      (w) => {
        r.value = w, k(c.value);
      }
    ), t({ isDark: l }), (w, $) => (g(), te(ke, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: o
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      headerAside: B(() => [
        u("div", Ax, [
          lt(u("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (S) => r.value = S),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: p
          }, [...$[1] || ($[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [$l, r.value]
          ])
        ])
      ]),
      default: B(() => [
        u("div", {
          class: J(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          O(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (g(), x("div", Bx, [...$[2] || ($[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (g(), x("div", Lx, [
                d.value.labels && d.value.labels.length && d.value.datasets.length ? (g(), x("section", Px, [
                  u("div", Rx, [
                    O(yt, {
                      data: d.value,
                      options: b,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  h.value.length ? (g(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(m.value)
                  }, [
                    (g(!0), x(oe, null, fe(h.value, (S) => (g(), te(ye, {
                      key: `card-${S.key}`,
                      class: "min-w-0",
                      color: S.color,
                      title: S.label,
                      value: `${S.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value"]))), 128))
                  ], 4)) : z("", !0)
                ])) : (g(), x("section", Ix, [...$[3] || ($[3] = [
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
}), Fx = /* @__PURE__ */ me(Ex, [["__scopeId", "data-v-b09e0848"]]), Ox = /* @__PURE__ */ ce({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ie(null), s = C(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), o = C(() => A(a.value?.isDark) ?? !1), i = C(() => A(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (g(), te(vt, {
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
}), Vx = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, zx = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, Nx = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Hx = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Wx = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, jx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Kx = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Yx = { class: "max-w-[360px] text-center" }, Ux = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, qx = {
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
    const t = e, { isDark: n, colors: a } = Me($e(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = C(() => {
      const c = t.data ?? {}, d = c.daily, h = c.days, m = Array.isArray(d) && d.length > 0, v = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let f = [];
      return m ? f = d : v && (f = h.map((y, b) => ({
        date: y,
        allocated_cost: c.allocatedCostSeries[b] ?? 0,
        aws_cost: c.awsCostSeries[b] ?? 0,
        airline_conversations: c.airlineConversationsSeries[b] ?? 0
      }))), {
        daily: f,
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
    return (c, d) => (g(), te(ke, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Vx, [
          e.loading ? (g(), x("div", zx, [
            u("div", Nx, [
              (g(), x(oe, null, fe(s, (h, m) => u("div", {
                key: m,
                class: J(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[m]]),
                style: Ce({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            d[0] || (d[0] = u("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (g(), x("div", Hx, [
            u("div", Wx, [
              O(yt, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: r.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", jx, [
              O(ye, {
                color: A(a).primaryLight,
                title: "Total Allocated",
                value: A(Pe)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              O(ye, {
                color: "#FF9900",
                title: "Total AWS",
                value: A(Pe)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (g(), x("section", Kx, [
            u("div", Yx, [
              u("div", Ux, [
                O(A(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, Xx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Gx = {
  key: 0,
  class: "card-body"
}, Zx = {
  key: 0,
  class: "chart-section"
}, Qx = { class: "chart-container" }, Jx = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, e_ = {
  key: 1,
  class: "empty-state"
}, t_ = { class: "empty-state-content" }, n_ = { class: "empty-icon-wrapper" }, a_ = {
  key: 1,
  class: "loading-state"
}, Sn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Jo = 10, s_ = /* @__PURE__ */ ce({
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
    const a = e, { isDark: s, colors: o } = Me($e(a, "theme")), i = (f) => {
      const y = new Date(f), b = String(y.getDate()).padStart(2, "0"), p = String(y.getMonth() + 1).padStart(2, "0");
      return `${b}-${p}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, b) => y + (b.input_cost || 0), 0);
    }), c = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, b) => y + (b.output_cost || 0), 0);
    }), d = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, b) => y + (b.cache_read_cost || 0), 0);
    }), h = C(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, b) => y + (b.cache_write_cost || 0), 0);
    }), m = C(() => {
      const f = a.data?.costs_by_day || {}, y = Object.keys(f).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const b = y.map((_) => i(_)), p = [
        {
          label: "Input Cost",
          data: y.map((_) => f[_]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: y.map((_) => f[_]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: y.map((_) => f[_]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: y.map((_) => f[_]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: p
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
            label: function(f) {
              let y = f.dataset.label || "";
              return y && (y += ": "), f.parsed.y !== null && (y += Pe(f.parsed.y)), y;
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
            callback: function(f) {
              return Pe(f);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (f, y) => (g(), te(ke, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Xx, [
          e.loading ? (g(), x("div", a_, [...y[2] || (y[2] = [
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
          ])])) : (g(), x("div", Gx, [
            m.value.labels && m.value.labels.length ? (g(), x("section", Zx, [
              u("div", Qx, [
                O(St, {
                  data: m.value,
                  options: v.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Jx, [
                O(ye, {
                  title: "Total Cost",
                  value: A(Pe)(e.data.total_cost)
                }, null, 8, ["value"]),
                O(ye, {
                  title: "Input Cost",
                  value: A(Pe)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                O(ye, {
                  title: "Output Cost",
                  value: A(Pe)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                O(ye, {
                  title: "Cache Read",
                  value: A(Pe)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                O(ye, {
                  title: "Cache Write",
                  value: A(Pe)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                O(ye, {
                  title: "Avg / Conv.",
                  value: A(Pe)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", e_, [
              u("div", t_, [
                u("div", n_, [
                  O(A(nt), { class: "empty-icon" })
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
}), o_ = /* @__PURE__ */ me(s_, [["__scopeId", "data-v-39a5448c"]]), i_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, l_ = {
  key: 0,
  class: "card-body"
}, r_ = {
  key: 0,
  class: "chart-section"
}, c_ = { class: "chart-container" }, d_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, u_ = {
  key: 1,
  class: "empty-state"
}, h_ = { class: "empty-state-content" }, f_ = { class: "empty-icon-wrapper" }, g_ = {
  key: 1,
  class: "loading-state"
}, Mn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ei = 10, m_ = /* @__PURE__ */ ce({
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
    const a = e, { isDark: s, colors: o } = Me($e(a, "theme")), i = (d) => {
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
      const m = h.map((f) => i(f)), v = [
        {
          label: "Input Tokens",
          data: h.map((f) => d[f]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((f) => d[f]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((f) => d[f]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((f) => d[f]?.cache_write_tokens || 0),
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
    return t({ isDark: s }), (d, h) => (g(), te(ke, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", i_, [
          e.loading ? (g(), x("div", g_, [...h[2] || (h[2] = [
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
          ])])) : (g(), x("div", l_, [
            r.value.labels && r.value.labels.length ? (g(), x("section", r_, [
              u("div", c_, [
                O(St, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", d_, [
                O(ye, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: A(le)(e.data.total_tokens)
                }, null, 8, ["value"]),
                O(ye, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: A(le)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                O(ye, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: A(le)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                O(ye, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: A(le)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                O(ye, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: A(le)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (g(), x("section", u_, [
              u("div", h_, [
                u("div", f_, [
                  O(A(nt), { class: "empty-icon" })
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
}), p_ = /* @__PURE__ */ me(m_, [["__scopeId", "data-v-70c6f3c7"]]), b_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, v_ = {
  key: 0,
  class: "card-body"
}, y_ = {
  key: 0,
  class: "chart-section"
}, x_ = { class: "chart-container" }, __ = { class: "mt-4 w-full min-w-0" }, k_ = {
  key: 1,
  class: "empty-state"
}, w_ = { class: "empty-state-content" }, C_ = { class: "empty-icon-wrapper" }, $_ = {
  key: 1,
  class: "loading-state"
}, S_ = /* @__PURE__ */ ce({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Me($e(n, "theme")), o = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(
      () => le(n.data?.total_conversations ?? 0)
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
    return t({ isDark: a }), (c, d) => (g(), te(ke, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", b_, [
          e.loading ? (g(), x("div", $_, [...d[2] || (d[2] = [
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
          ])])) : (g(), x("div", v_, [
            l.value.labels && l.value.labels.length ? (g(), x("section", y_, [
              u("div", x_, [
                O(yt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", __, [
                O(ye, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", k_, [
              u("div", w_, [
                u("div", C_, [
                  O(A(nt), { class: "empty-icon" })
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
}), M_ = /* @__PURE__ */ me(S_, [["__scopeId", "data-v-b33e8627"]]), D_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, T_ = {
  key: 0,
  class: "card-body"
}, A_ = {
  key: 0,
  class: "charts-grid"
}, B_ = { class: "chart-section" }, L_ = { class: "chart-container" }, P_ = { class: "chart-section" }, R_ = { class: "chart-container" }, I_ = {
  key: 1,
  class: "empty-state"
}, E_ = { class: "empty-state-content" }, F_ = { class: "empty-icon-wrapper" }, O_ = {
  key: 1,
  class: "loading-state"
}, V_ = /* @__PURE__ */ ce({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Me($e(n, "theme")), o = C(() => n.data?.top_agents && n.data.top_agents.length > 0), i = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, v) => (v.total_cost || 0) - (m.total_cost || 0)) : []), l = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, v) => (v.total_tokens || 0) - (m.total_tokens || 0)) : []), r = C(() => {
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
              const v = m.label, f = n.data?.top_agents?.find((y) => y.agent_type === v);
              return f ? [
                `Total Cost: ${Pe(f.total_cost)}`,
                `Input Cost: ${Pe(f.total_input_tokens_cost)}`,
                `Output Cost: ${Pe(f.total_output_tokens_cost)}`,
                `Cache Read: ${Pe(f.total_read_tokens_cost)}`,
                `Cache Write: ${Pe(f.total_write_tokens_cost)}`
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
              const v = m.label, f = n.data?.top_agents?.find((y) => y.agent_type === v);
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
    return t({ isDark: a }), (m, v) => (g(), te(ke, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", D_, [
          e.loading ? (g(), x("div", O_, [...v[4] || (v[4] = [
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
          ])])) : (g(), x("div", T_, [
            o.value ? (g(), x("div", A_, [
              u("section", B_, [
                v[0] || (v[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", L_, [
                  O(St, {
                    data: r.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", P_, [
                v[1] || (v[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", R_, [
                  O(St, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (g(), x("section", I_, [
              u("div", E_, [
                u("div", F_, [
                  O(A(nt), { class: "empty-icon" })
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
}), z_ = /* @__PURE__ */ me(V_, [["__scopeId", "data-v-a5014772"]]), N_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, H_ = {
  key: 0,
  class: "card-body"
}, W_ = {
  key: 0,
  class: "chart-section"
}, j_ = { class: "chart-container" }, K_ = {
  key: 1,
  class: "empty-state"
}, Y_ = { class: "empty-state-content" }, U_ = { class: "empty-icon-wrapper" }, q_ = {
  key: 1,
  class: "loading-state"
}, X_ = /* @__PURE__ */ ce({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Me($e(n, "theme")), o = {
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
          const b = y.conversations || 0, p = r.value ? b / r.value * 100 : 0;
          return `${y.agent_type} - ${b.toLocaleString()} (${p.toFixed(1)}%)`;
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
              const m = (h.label || "").toString(), v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((b, p) => b + (Number(p) || 0), 0), y = f ? v / f * 100 : 0;
              return `${m}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, m) => (g(), te(ke, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", N_, [
          e.loading ? (g(), x("div", q_, [...m[2] || (m[2] = [
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
          ])])) : (g(), x("div", H_, [
            l.value ? (g(), x("section", W_, [
              u("div", j_, [
                O(Da, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (g(), x("section", K_, [
              u("div", Y_, [
                u("div", U_, [
                  O(A(nt), { class: "empty-icon" })
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
}), G_ = /* @__PURE__ */ me(X_, [["__scopeId", "data-v-14445b91"]]), Z_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Q_ = {
  key: 0,
  class: "card-body"
}, J_ = {
  key: 0,
  class: "chart-section"
}, ek = { class: "chart-container" }, tk = {
  key: 1,
  class: "empty-state"
}, nk = { class: "empty-state-content" }, ak = { class: "empty-icon-wrapper" }, sk = {
  key: 1,
  class: "loading-state"
}, ok = /* @__PURE__ */ ce({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Me($e(n, "theme")), o = (c) => {
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
        const b = [...c].sort((p, _) => p.date.localeCompare(_.date));
        return {
          labels: b.map((p) => o(p.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: b.map((p) => Number(p.value) || 0),
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
      const f = v.map((b) => o(b)), y = v.map((b) => {
        const p = d[b]?.total_cost || 0, _ = h[b] || 0;
        return _ > 0 ? p / _ : 0;
      });
      return {
        labels: f,
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
    return t({ isDark: a }), (c, d) => (g(), te(ke, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Z_, [
          e.loading ? (g(), x("div", sk, [...d[2] || (d[2] = [
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
          ])])) : (g(), x("div", Q_, [
            i.value ? (g(), x("section", J_, [
              u("div", ek, [
                O(yt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (g(), x("section", tk, [
              u("div", nk, [
                u("div", ak, [
                  O(A(nt), { class: "empty-icon" })
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
}), ik = /* @__PURE__ */ me(ok, [["__scopeId", "data-v-1e8204ea"]]), lk = { class: "tabs text-sm" }, rk = ["aria-label"], ck = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], dk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, uk = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = ie([]), o = `tabs-${qe()}`, i = (f) => `${o}-tab-${f}`, l = C(
      () => n.items.map((f, y) => f.disabled ? -1 : y).filter((f) => f >= 0)
    );
    function r(f) {
      return f.value === n.modelValue;
    }
    function c(f) {
      const y = r(f), p = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${p} cursor-not-allowed opacity-40` : y ? `${p} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${p} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(f, y) {
      f === y || n.items.find((p) => p.value === f)?.disabled || (a("update:modelValue", f), a("change", { value: f, previousValue: y }));
    }
    function h(f, y) {
      a("tab-click", { value: f.value, originalEvent: y }), !f.disabled && (d(f.value, n.modelValue), We(() => {
        s.value[n.items.indexOf(f)]?.focus();
      }));
    }
    function m(f, y) {
      const b = n.items.length;
      if (b === 0) return 0;
      let p = f;
      for (let _ = 0; _ < b; _++)
        if (p = (p + y + b) % b, !n.items[p]?.disabled) return p;
      return f;
    }
    async function v(f, y) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let p = y;
      f.key === "ArrowLeft" ? p = m(y, -1) : f.key === "ArrowRight" ? p = m(y, 1) : f.key === "Home" ? p = l.value[0] ?? 0 : f.key === "End" && (p = l.value[l.value.length - 1] ?? y);
      const _ = n.items[p];
      !_ || _.disabled || (d(_.value, n.modelValue), await We(), s.value[p]?.focus());
    }
    return (f, y) => (g(), x("div", lk, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: J([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (g(!0), x(oe, null, fe(e.items, (b, p) => (g(), x("button", {
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
          onClick: (_) => h(b, _),
          onKeydown: (_) => v(_, p)
        }, [
          u("span", {
            class: J(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            b.icon ? (g(), te(Ft(b.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : z("", !0),
            u("span", dk, D(b.label), 1)
          ], 2)
        ], 42, ck))), 128))
      ], 10, rk),
      f.$slots.default ? (g(), te(Te, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: B(() => [
          (g(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            we(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : z("", !0)
    ]));
  }
}), fl = /* @__PURE__ */ me(uk, [["__scopeId", "data-v-f9c367eb"]]), hk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, fk = {
  key: 0,
  class: "loading-state"
}, gk = {
  key: 1,
  class: "card-body"
}, mk = {
  key: 0,
  class: "model-usage-table-block"
}, pk = { class: "w-full min-w-0" }, bk = {
  key: 1,
  class: "empty-state"
}, vk = { class: "empty-state-content" }, yk = { class: "empty-icon-wrapper" }, xk = /* @__PURE__ */ ce({
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
    const a = e, s = n, o = (f) => {
      s("export", f);
    }, { isDark: i } = Me($e(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = ie("by_model"), c = C(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = C(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = C(
      () => Object.entries(c.value).map(([f, y]) => ({
        id: f,
        name: f,
        avgCost: v(y.avg_cost_per_message),
        avgTokens: m(y.avg_tokens_per_message),
        messageCount: m(y.message_count),
        totalCost: v(y.total_cost),
        totalTokens: m(y.total_tokens)
      }))
    ), m = (f) => f == null ? "0" : le(f), v = (f) => f == null ? "$0.00" : Pe(f);
    return t({ isDark: i }), (f, y) => (g(), te(ke, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", hk, [
          e.loading ? (g(), x("div", fk, [...y[1] || (y[1] = [
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
          ])])) : (g(), x("div", gk, [
            O(fl, {
              modelValue: r.value,
              "onUpdate:modelValue": y[0] || (y[0] = (b) => r.value = b),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: B(() => [
                c.value && Object.keys(c.value).length > 0 ? (g(), x("div", mk, [
                  u("div", pk, [
                    O(rt, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (g(), x("div", bk, [
                  u("div", vk, [
                    u("div", yk, [
                      O(A(nt), { class: "empty-icon" })
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
}), _k = /* @__PURE__ */ me(xk, [["__scopeId", "data-v-0c23d620"]]), kk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, wk = {
  key: 0,
  class: "loading-state"
}, Ck = {
  key: 1,
  class: "card-body"
}, $k = {
  key: 0,
  class: "message-roles-table-block"
}, Sk = { class: "w-full min-w-0" }, Mk = {
  key: 1,
  class: "empty-state"
}, Dk = { class: "empty-state-content" }, Tk = { class: "empty-icon-wrapper" }, Ak = /* @__PURE__ */ ce({
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
    }, { isDark: i } = Me($e(a, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => a.data?.total_by_role || {}), d = C(
      () => l.map((y) => ({
        id: y,
        role: f(y),
        avgCost: v(c.value[y]?.avg_cost_per_message),
        avgTokens: m(c.value[y]?.avg_tokens_per_message),
        messageCount: m(c.value[y]?.message_count),
        totalCost: v(c.value[y]?.total_cost),
        totalTokens: m(c.value[y]?.total_tokens)
      }))
    ), h = C(() => Object.keys(c.value).length > 0), m = (y) => y == null ? "0" : le(y), v = (y) => y == null ? "$0.00" : Pe(y), f = (y) => y.charAt(0).toUpperCase() + y.slice(1);
    return t({ isDark: i }), (y, b) => (g(), te(ke, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", kk, [
          e.loading ? (g(), x("div", wk, [...b[0] || (b[0] = [
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
          ])])) : (g(), x("div", Ck, [
            h.value ? (g(), x("div", $k, [
              u("div", Sk, [
                O(rt, {
                  columns: r,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (g(), x("div", Mk, [
              u("div", Dk, [
                u("div", Tk, [
                  O(A(nt), { class: "empty-icon" })
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
}), Bk = /* @__PURE__ */ me(Ak, [["__scopeId", "data-v-362c0dbc"]]), Lk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Pk = {
  key: 0,
  class: "card-body"
}, Rk = {
  key: 0,
  class: "chart-section"
}, Ik = { class: "chart-container" }, Ek = { class: "kpi-grid" }, Fk = {
  key: 1,
  class: "empty-state"
}, Ok = { class: "empty-state-content" }, Vk = { class: "empty-icon-wrapper" }, zk = {
  key: 1,
  class: "loading-state"
}, Nk = /* @__PURE__ */ ce({
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
    const a = e, s = n, o = (_) => {
      s("export", _);
    }, { isDark: i, colors: l } = Me($e(a, "theme")), r = {
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
    }, c = (_) => _.agent_type || _.agent_id || _.agent_name || "", d = (_) => _.agent_name ? _.agent_name : c(_).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (_) => {
      const k = c(_).toLowerCase();
      for (const [w, $] of Object.entries(r))
        if (k.includes(w))
          return $;
      return "#9ca3af";
    }, m = C(() => [...a.data?.top_agents || []].sort((k, w) => w.avg_cost_per_conversation - k.avg_cost_per_conversation)), v = C(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : m.value.reduce((_, k) => _ + k.conversations, 0)), f = C(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : m.value.reduce((_, k) => _ + k.total_cost, 0)), y = C(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : f.value / v.value), b = C(() => {
      const _ = m.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const k = _.map((S) => d(S)), w = _.map((S) => S.avg_cost_per_conversation), $ = _.map((S) => h(S));
      return {
        labels: k,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: $.map((S) => `${S}80`),
            borderColor: $,
            borderWidth: 1
          }
        ]
      };
    }), p = C(() => a.options ? a.options : {
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
            label: function(_) {
              const k = m.value[_.dataIndex];
              return [
                `Cost: ${Pe(_.parsed.x)}`,
                `Conversations: ${le(k.conversations)}`,
                `Total Cost: ${Pe(k.total_cost)}`
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
            callback: function(_) {
              return Pe(_);
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
    return t({ isDark: i }), (_, k) => (g(), te(ke, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (g(), te(A(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", Lk, [
          e.loading ? (g(), x("div", zk, [...k[2] || (k[2] = [
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
          ])])) : (g(), x("div", Pk, [
            b.value.labels && b.value.labels.length ? (g(), x("section", Rk, [
              u("div", Ik, [
                O(St, {
                  data: b.value,
                  options: p.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Ek, [
                O(A(ye), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                O(A(ye), {
                  title: "Total Conversations",
                  value: A(le)(v.value)
                }, null, 8, ["value"]),
                O(A(ye), {
                  title: "Total Cost",
                  value: A(Pe)(f.value)
                }, null, 8, ["value"]),
                O(A(ye), {
                  title: "Avg Cost / Conv.",
                  value: A(Pe)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", Fk, [
              u("div", Ok, [
                u("div", Vk, [
                  O(A(nt), { class: "empty-icon" })
                ]),
                k[0] || (k[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                k[1] || (k[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Hk = /* @__PURE__ */ me(Nk, [["__scopeId", "data-v-49068ad7"]]);
function gl(e, t) {
  const n = e[t];
  return Array.isArray(n) ? n.filter(
    (a) => a !== null && typeof a == "object" && !Array.isArray(a)
  ) : [];
}
function ml(e, t, n = 0, a = null, s = 0) {
  const { childrenKey: o, expandedKeys: i, resolveRowKey: l, maxDepth: r } = t, c = [];
  return e.forEach((d, h) => {
    const m = l(d, s + h), v = gl(d, o), f = v.length > 0, y = i.has(m);
    c.push({
      row: d,
      key: m,
      depth: n,
      hasChildren: f,
      isExpanded: y,
      parentKey: a
    }), f && y && (r === void 0 || n < r) && c.push(
      ...ml(v, t, n + 1, m, 0)
    );
  }), c;
}
function pl(e, t, n = 0, a = 0) {
  const { childrenKey: s, resolveRowKey: o, isRowSelectable: i } = t, l = [];
  return e.forEach((r, c) => {
    const d = o(r, a + c), h = gl(r, s), m = h.length > 0, v = {
      depth: n,
      isChild: n > 0,
      hasChildren: m
    };
    (i?.(r, v) ?? !0) && l.push(d), h.length > 0 && l.push(
      ...pl(h, t, n + 1, 0)
    );
  }), l;
}
const Wk = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, jk = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, Kk = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Yk = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, Uk = ["checked", "aria-label"], qk = ["aria-sort", "onClick"], Xk = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Gk = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Zk = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Qk = {
  key: 0,
  class: "w-12 bg-transparent pl-4 pr-0 py-3 text-center align-middle"
}, Jk = ["checked", "aria-label", "onChange"], e2 = ["aria-expanded", "aria-label", "onClick"], t2 = ["aria-expanded", "aria-label", "onClick"], n2 = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, a2 = { class: "min-w-0 flex-1" }, s2 = /* @__PURE__ */ ce({
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
    isRowSelectable: { type: Function, default: void 0 },
    ariaLabelExpandRow: { default: "Expandir fila" },
    ariaLabelCollapseRow: { default: "Contraer fila" }
  },
  emits: ["update:selectedKeys", "update:expandedKeys", "sort", "expand", "collapse"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = ie(null), o = ie([...n.defaultExpandedKeys]), i = C({
      get() {
        return n.expandedKeys ?? o.value;
      },
      set(L) {
        o.value = L, a("update:expandedKeys", L);
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
    })), d = C(() => n.expandable ? ml(n.rows, c.value) : n.rows.map((L, R) => ({
      row: L,
      key: v(L, R),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function h(L) {
      return `cell-${L}`;
    }
    function m(L) {
      return L === "center" ? "text-center" : L === "right" ? "text-right" : "text-left";
    }
    function v(L, R) {
      if (typeof n.rowKey == "function")
        return n.rowKey(L);
      const H = L[n.rowKey];
      return H != null ? String(H) : `__index_${R}`;
    }
    function f(L, R) {
      return L[R];
    }
    function y(L) {
      return L == null || typeof L == "object" ? "" : String(L);
    }
    function b(L) {
      return n.expandable && L === r.value;
    }
    function p(L) {
      return L.hasChildren || (n.isRowExpandable?.(L.row) ?? !1);
    }
    function _(L, R) {
      return {
        row: L.row,
        column: R,
        value: f(L.row, R.key),
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren,
        expanded: L.isExpanded
      };
    }
    function k(L) {
      if (!p(L)) return;
      const R = new Set(i.value);
      R.has(L.key) ? (R.delete(L.key), a("collapse", L.key, L.row)) : (n.singleExpand && R.clear(), R.add(L.key), a("expand", L.key, L.row)), i.value = [...R];
    }
    function w(L) {
      return {
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren
      };
    }
    function $(L, R) {
      return n.isRowSelectable?.(L, R) ?? !0;
    }
    function S(L) {
      return $(L.row, w(L));
    }
    function M(L) {
      return n.selectable && p(L) && !S(L);
    }
    function F(L) {
      return p(L) && !M(L);
    }
    function j(L) {
      return F(L) ? !1 : L.depth > 0 ? !0 : n.selectable && !p(L);
    }
    const E = C(() => {
      const { isRowSelectable: L } = n;
      return n.expandable ? pl(n.rows, {
        childrenKey: n.childrenKey,
        resolveRowKey: v,
        isRowSelectable: L
      }) : n.rows.map((R, H) => ({
        row: R,
        key: v(R, H),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: R, context: H }) => $(R, H)).map(({ key: R }) => R);
    });
    function T(L) {
      const R = String(L);
      return n.selectedKeys.some((H) => String(H) === R);
    }
    const P = C(() => !n.selectable || E.value.length === 0 ? !1 : E.value.every(
      (L) => n.selectedKeys.some((R) => String(R) === String(L))
    )), V = C(() => {
      if (!n.selectable || E.value.length === 0) return !1;
      const L = E.value.filter(
        (R) => n.selectedKeys.some((H) => String(H) === String(R))
      );
      return L.length > 0 && L.length < E.value.length;
    });
    Oe(
      [V, P, () => n.selectable],
      async () => {
        await We();
        const L = s.value;
        L && (L.indeterminate = V.value && !P.value);
      },
      { immediate: !0 }
    );
    function X() {
      if (n.selectable)
        if (P.value) {
          const L = new Set(
            E.value.map((H) => String(H))
          ), R = n.selectedKeys.filter(
            (H) => !L.has(String(H))
          );
          a("update:selectedKeys", R);
        } else {
          const L = new Set(n.selectedKeys.map((R) => String(R)));
          E.value.forEach((R) => L.add(String(R))), a("update:selectedKeys", [...L]);
        }
    }
    function Z(L) {
      if (!n.selectable) return;
      const R = String(L), H = d.value.find((ue) => String(ue.key) === R);
      if (H && !S(H) || !H && !E.value.some((ue) => String(ue) === R))
        return;
      n.selectedKeys.some((ue) => String(ue) === R) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((ue) => String(ue) !== R)
      ) : a("update:selectedKeys", [...n.selectedKeys, R]);
    }
    function ae(L) {
      return `${n.ariaLabelSelectRow} ${L}`;
    }
    function se(L) {
      a("sort", L);
    }
    function ge(L) {
      return n.sortKey === L && n.sortDirection != null;
    }
    function pe(L) {
      return ge(L) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (L, R) => (g(), x("div", Wk, [
      u("div", jk, [
        u("table", {
          class: J([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", Kk, [
              e.selectable ? (g(), x("th", Yk, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: P.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: X
                }, null, 40, Uk)
              ])) : z("", !0),
              (g(!0), x(oe, null, fe(e.columns, (H) => (g(), x("th", {
                key: H.key,
                scope: "col",
                class: J([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  b(H.key) && e.selectable ? "!pl-0" : "",
                  m(H.align),
                  H.headerClass ?? ""
                ])
              }, [
                H.sortable ? (g(), x("button", {
                  key: 0,
                  type: "button",
                  class: J(["kiut-table-sort-btn inline-flex items-center gap-1", m(H.align)]),
                  "aria-sort": pe(H.key),
                  onClick: (ee) => se(H.key)
                }, [
                  u("span", null, D(H.label), 1),
                  u("span", Xk, [
                    ge(H.key) ? (g(), x(oe, { key: 0 }, [
                      e.sortDirection === "asc" ? (g(), x("span", Gk, "↑")) : e.sortDirection === "desc" ? (g(), x("span", Zk, "↓")) : z("", !0)
                    ], 64)) : (g(), x(oe, { key: 1 }, [
                      R[0] || (R[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      R[1] || (R[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, qk)) : (g(), x(oe, { key: 1 }, [
                  Be(D(H.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (g(!0), x(oe, null, fe(d.value, (H) => (g(), x("tr", {
              key: H.key,
              class: J([
                "min-h-14 border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                H.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (g(), x("td", Qk, [
                S(H) ? (g(), x("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: T(H.key),
                  "aria-label": ae(H.key),
                  onChange: (ee) => Z(H.key)
                }, null, 40, Jk)) : M(H) ? (g(), x("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": H.isExpanded,
                  "aria-label": H.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Ye((ee) => k(H), ["stop"])
                }, [
                  O(A(Yn), {
                    class: J(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !H.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, e2)) : z("", !0)
              ])) : z("", !0),
              (g(!0), x(oe, null, fe(e.columns, (ee) => (g(), x("td", {
                key: ee.key,
                class: J([
                  "bg-transparent py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  b(ee.key) ? "pl-0 pr-2" : "px-2",
                  m(ee.align),
                  ee.cellClass ?? ""
                ])
              }, [
                b(ee.key) ? (g(), x("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: Ce({ paddingLeft: `${H.depth * 1.25}rem` })
                }, [
                  we(L.$slots, "row-expand", {
                    row: H.row,
                    expanded: H.isExpanded,
                    hasChildren: H.hasChildren,
                    depth: H.depth,
                    toggle: () => k(H)
                  }, () => [
                    F(H) ? (g(), x("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": H.isExpanded,
                      "aria-label": H.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Ye((ue) => k(H), ["stop"])
                    }, [
                      O(A(Yn), {
                        class: J(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !H.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, t2)) : j(H) ? (g(), x("span", n2)) : z("", !0)
                  ], !0),
                  u("div", a2, [
                    we(L.$slots, h(ee.key), Ct({ ref_for: !0 }, _(H, ee)), () => [
                      Be(D(y(f(H.row, ee.key))), 1)
                    ], !0)
                  ])
                ], 4)) : we(L.$slots, h(ee.key), Ct({
                  key: 1,
                  ref_for: !0
                }, _(H, ee)), () => [
                  Be(D(y(f(H.row, ee.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), o2 = /* @__PURE__ */ me(s2, [["__scopeId", "data-v-7bd1675c"]]);
function i2(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function l2(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const r2 = ["aria-label"], c2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, d2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, u2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, h2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], f2 = { class: "truncate" }, g2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, m2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, p2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, b2 = ["aria-label", "onClick"], v2 = ["aria-label", "onClick"], y2 = ["aria-label"], x2 = ["aria-label"], _2 = {
  key: 1,
  class: "space-y-2"
}, k2 = ["for"], w2 = ["id", "placeholder", "onKeydown"], C2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, $2 = ["aria-label"], S2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, M2 = ["checked", "onChange"], D2 = { class: "min-w-0 flex-1" }, T2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, A2 = { class: "flex flex-wrap items-end gap-2" }, B2 = { class: "min-w-[120px] flex-1" }, L2 = ["for"], P2 = ["id"], R2 = { class: "min-w-[120px] flex-1" }, I2 = ["for"], E2 = ["id"], F2 = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = es(), i = `${`kiut-filters-${qe()}`}-panel`, l = ie(null), r = /* @__PURE__ */ new Map(), c = ie(null), d = ie(!1), h = ie({}), m = ie(null), v = ie(""), f = ie([]), y = ie(""), b = ie(""), p = C(() => c.value ? n.filterDefinitions.find((I) => I.id === c.value) ?? null : null), _ = C(() => {
      const I = p.value;
      if (I)
        return I.type === "text" ? v.value : I.type === "select" ? f.value : { start: y.value, end: b.value };
    });
    function k(I, Y) {
      Y && Y instanceof HTMLElement ? r.set(I, Y) : r.delete(I);
    }
    function w(I) {
      return n.modelValue[I];
    }
    function $(I) {
      if (I == null) return [];
      if (Array.isArray(I))
        return I.filter((Y) => typeof Y == "string" && Y.trim() !== "");
      if (typeof I == "string") {
        const Y = I.trim();
        return Y ? [Y] : [];
      }
      return [];
    }
    function S(I, Y) {
      if (Y == null) return !0;
      if (I.type === "text") return String(Y).trim() === "";
      if (I.type === "select") return $(Y).length === 0;
      if (I.type === "dateRange") {
        const ne = Y;
        return !ne?.start?.trim() || !ne?.end?.trim();
      }
      return !0;
    }
    const M = C(
      () => n.filterDefinitions.some((I) => !S(I, w(I.id)))
    ), F = C(() => {
      const I = [];
      for (const Y of n.filterDefinitions) {
        const ne = w(Y.id);
        if (!S(Y, ne)) {
          if (Y.type === "text")
            I.push({ kind: "text", def: Y, key: Y.id });
          else if (Y.type === "dateRange")
            I.push({ kind: "dateRange", def: Y, key: Y.id });
          else if (Y.type === "select")
            for (const de of $(ne))
              I.push({
                kind: "select",
                def: Y,
                optionValue: de,
                key: `${Y.id}::${de}`
              });
        }
      }
      return I;
    });
    function j(I) {
      return I.type !== "select" ? 0 : $(w(I.id)).length;
    }
    function E(I) {
      const Y = w(I.id), ne = I.label.replace(/^\+\s*/, "");
      if (I.type === "text") return `${ne}: ${String(Y ?? "").trim()}`;
      if (I.type === "select") {
        const et = $(Y).map((dt) => I.options.find((xt) => xt.value === dt)?.label ?? dt);
        return `${ne}: ${et.join(", ")}`;
      }
      const de = Y, be = P(de.start), xe = P(de.end);
      return `${ne}: ${be} – ${xe}`;
    }
    function T(I) {
      return I.kind === "text" || I.kind === "dateRange" ? E(I.def) : I.def.options.find((ne) => ne.value === I.optionValue)?.label ?? I.optionValue;
    }
    function P(I) {
      if (!I) return "";
      const Y = je(I, "YYYY-MM-DD", !0);
      return Y.isValid() ? Y.format("L") : I;
    }
    function V(I) {
      const Y = c.value === I.id && d.value, ne = !S(I, w(I.id));
      return Y || ne ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function X(I) {
      return S(I, w(I.id)) ? U(I) : `Editar filtro ${I.label.replace(/^\+\s*/, "")}`;
    }
    function Z(I) {
      const Y = w(I.id);
      if (I.type === "text") {
        v.value = Y != null ? String(Y) : "";
        return;
      }
      if (I.type === "select") {
        f.value = [...$(Y)];
        return;
      }
      const ne = Y;
      y.value = ne?.start?.trim() ?? "", b.value = ne?.end?.trim() ?? "";
    }
    function ae() {
      const I = p.value;
      if (!I || I.type !== "select") return;
      const Y = { ...n.modelValue };
      f.value.length === 0 ? delete Y[I.id] : Y[I.id] = [...f.value], a("update:modelValue", Y), a("change", Y);
    }
    function se(I) {
      const Y = f.value.indexOf(I);
      Y >= 0 ? f.value = f.value.filter((ne, de) => de !== Y) : f.value = [...f.value, I], ae();
    }
    function ge(I) {
      if (!I) return;
      m.value = I;
      const Y = I.getBoundingClientRect(), ne = 300;
      let de = Y.left;
      const be = window.innerWidth - ne - 12;
      de > be && (de = Math.max(12, be)), de < 12 && (de = 12);
      const xe = Y.bottom + 8;
      h.value = {
        top: `${xe}px`,
        left: `${de}px`,
        width: `${Math.min(ne, window.innerWidth - 24)}px`
      };
    }
    function pe(I, Y) {
      if (c.value === I.id && d.value) {
        ue();
        return;
      }
      d.value && c.value !== I.id && ue(), c.value = I.id, d.value = !0, Z(I), We().then(async () => {
        ge(Y.currentTarget), await We(), R();
      });
    }
    function L(I, Y) {
      if (c.value === I.id && d.value) {
        ue();
        return;
      }
      d.value && c.value !== I.id && ue(), c.value = I.id, d.value = !0, Z(I), We().then(async () => {
        const ne = r.get(I.id) ?? Y.currentTarget;
        ge(ne), await We(), R();
      });
    }
    function R() {
      const I = l.value;
      if (!I) return;
      I.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function H() {
      d.value = !1, c.value = null, m.value = null;
    }
    function ee(I) {
      const Y = p.value;
      if (!Y) return;
      if (Y.type === "text") {
        v.value = I != null ? String(I) : "";
        return;
      }
      if (Y.type === "select") {
        f.value = Array.isArray(I) ? I.filter((de) => typeof de == "string") : $(I);
        return;
      }
      const ne = I;
      y.value = ne?.start?.trim() ?? "", b.value = ne?.end?.trim() ?? "";
    }
    function ue() {
      const I = p.value;
      if (!I) return;
      if (I.type === "text") {
        const be = v.value.trim(), xe = { ...n.modelValue };
        be === "" ? delete xe[I.id] : xe[I.id] = be, a("update:modelValue", xe), a("change", xe), H();
        return;
      }
      if (I.type === "select") {
        ae(), H();
        return;
      }
      const Y = y.value.trim(), ne = b.value.trim(), de = { ...n.modelValue };
      !Y || !ne || Y > ne ? delete de[I.id] : de[I.id] = { start: Y, end: ne }, a("update:modelValue", de), a("change", de), H();
    }
    function De(I) {
      const Y = { ...n.modelValue };
      delete Y[I], a("update:modelValue", Y), a("change", Y), c.value === I && H();
    }
    function Se(I) {
      if (I.kind === "text" || I.kind === "dateRange") {
        De(I.def.id);
        return;
      }
      const Y = { ...n.modelValue }, de = $(Y[I.def.id]).filter((be) => be !== I.optionValue);
      de.length === 0 ? delete Y[I.def.id] : Y[I.def.id] = de, a("update:modelValue", Y), a("change", Y), c.value === I.def.id && Z(I.def);
    }
    function Q() {
      const I = {};
      a("update:modelValue", I), a("change", I), H();
    }
    const N = C(() => {
      const I = p.value;
      return I ? `Editar filtro: ${I.label}` : "Filtro";
    });
    function W(I) {
      const Y = I.def.label.replace(/^\+\s*/, "");
      return I.kind === "select" ? `Quitar ${I.def.options.find((be) => be.value === I.optionValue)?.label ?? I.optionValue} del filtro ${Y}` : `Quitar filtro ${Y}`;
    }
    function G(I) {
      const Y = I.def.label.replace(/^\+\s*/, "");
      if (I.kind === "select") {
        const de = I.def.options.find((be) => be.value === I.optionValue)?.label ?? I.optionValue;
        return `Editar filtro ${Y}: ${de}`;
      }
      return `Editar filtro ${Y}`;
    }
    function U(I) {
      return `Añadir filtro ${I.label.replace(/^\+\s*/, "")}`;
    }
    const K = C(() => n.clearLabel);
    function q(I) {
      if (!d.value || !l.value) return;
      const Y = I.target;
      if (!(l.value.contains(Y) || (Y instanceof Element ? Y : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const de of r.values())
          if (de?.contains(Y)) return;
        ue();
      }
    }
    function re(I) {
      I.key === "Escape" && d.value && (I.preventDefault(), H());
    }
    function he() {
      !d.value || !m.value || ge(m.value);
    }
    return tt(() => {
      document.addEventListener("mousedown", q, !0), window.addEventListener("keydown", re, !0), window.addEventListener("resize", he);
    }), si(() => {
      document.removeEventListener("mousedown", q, !0), window.removeEventListener("keydown", re, !0), window.removeEventListener("resize", he);
    }), Oe(
      () => n.modelValue,
      () => {
        const I = p.value;
        I && d.value && !s.panel && Z(I);
      },
      { deep: !0 }
    ), (I, Y) => (g(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", c2, [
        u("span", d2, D(e.label), 1),
        u("div", u2, [
          (g(!0), x(oe, null, fe(e.filterDefinitions, (ne) => (g(), x("button", {
            key: `pill-${ne.id}`,
            ref_for: !0,
            ref: (de) => k(ne.id, de),
            type: "button",
            class: J(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", V(ne)]),
            "aria-label": X(ne),
            "aria-expanded": c.value === ne.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === ne.id ? i : void 0,
            onClick: (de) => L(ne, de)
          }, [
            O(A(i2), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", f2, D(ne.label), 1),
            ne.type === "select" && j(ne) > 0 ? (g(), x("span", g2, D(j(ne)), 1)) : z("", !0)
          ], 10, h2))), 128))
        ])
      ]),
      M.value ? (g(), x("div", m2, [
        u("div", p2, [
          (g(!0), x(oe, null, fe(F.value, (ne) => (g(), x("div", {
            key: ne.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": G(ne),
              onClick: (de) => pe(ne.def, de)
            }, [
              we(I.$slots, "formatChip", {
                filter: ne.def,
                value: w(ne.def.id),
                optionValue: ne.kind === "select" ? ne.optionValue : void 0
              }, () => [
                Be(D(T(ne)), 1)
              ], !0)
            ], 8, b2),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": W(ne),
              onClick: (de) => Se(ne)
            }, [
              O(A(l2), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, v2)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": K.value,
          onClick: Q
        }, D(e.clearLabel), 9, y2)
      ])) : z("", !0),
      (g(), te(En, { to: "body" }, [
        c.value && d.value ? (g(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": N.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: Ce(h.value),
          onKeydown: Y[3] || (Y[3] = Ye(() => {
          }, ["stop"]))
        }, [
          p.value ? (g(), x(oe, { key: 0 }, [
            I.$slots.panel ? we(I.$slots, "panel", {
              key: 0,
              filter: p.value,
              close: ue,
              value: _.value,
              updateValue: ee
            }, void 0, !0) : (g(), x("div", _2, [
              p.value.type === "text" ? (g(), x(oe, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, D(p.value.label), 9, k2),
                lt(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": Y[0] || (Y[0] = (ne) => v.value = ne),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: p.value.placeholder ?? "…",
                  onKeydown: Fn(Ye(ue, ["prevent"]), ["enter"])
                }, null, 40, w2), [
                  [sn, v.value]
                ])
              ], 64)) : p.value.type === "select" ? (g(), x(oe, { key: 1 }, [
                u("p", C2, D(p.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": p.value.label,
                  "aria-multiselectable": !0
                }, [
                  (g(!0), x(oe, null, fe(p.value.options, (ne) => (g(), x("li", {
                    key: ne.value
                  }, [
                    u("label", S2, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(ne.value),
                        onChange: (de) => se(ne.value)
                      }, null, 40, M2),
                      u("span", D2, D(ne.label), 1)
                    ])
                  ]))), 128))
                ], 8, $2)
              ], 64)) : p.value.type === "dateRange" ? (g(), x(oe, { key: 2 }, [
                u("p", T2, D(p.value.label), 1),
                u("div", A2, [
                  u("div", B2, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, L2),
                    lt(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": Y[1] || (Y[1] = (ne) => y.value = ne),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, P2), [
                      [sn, y.value]
                    ])
                  ]),
                  u("div", R2, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, I2),
                    lt(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": Y[2] || (Y[2] = (ne) => b.value = ne),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, E2), [
                      [sn, b.value]
                    ])
                  ])
                ])
              ], 64)) : z("", !0)
            ]))
          ], 64)) : z("", !0)
        ], 44, x2)) : z("", !0)
      ]))
    ], 8, r2));
  }
}), O2 = /* @__PURE__ */ me(F2, [["__scopeId", "data-v-f38e0100"]]), V2 = { class: "font-sans" }, z2 = ["for"], N2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], H2 = ["id"], W2 = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = wa(), o = oi("$pcForm", null), i = `kiut-input-text-${qe()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? s.name ?? ""), d = ie(n.modelValue ?? "");
    Oe(
      () => n.modelValue,
      (p) => {
        d.value = p ?? "";
      }
    ), tt(() => {
      o && c.value && o.register?.(c.value, {});
    }), pt(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const h = C(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? d.value : d.value), m = C(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function v(p) {
      const _ = p.target.value;
      d.value = _, a("update:modelValue", _);
      const k = o?.fields?.[c.value]?.props;
      k?.onInput && k.onInput(p);
    }
    function f(p) {
      const _ = o?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(p);
    }
    function y(p) {
      const _ = o?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(p);
    }
    const b = C(() => {
      const { name: p, id: _, type: k, ...w } = s;
      return w;
    });
    return (p, _) => (g(), x("div", V2, [
      e.label ? (g(), x("label", {
        key: 0,
        for: l.value,
        class: J(A(ct))
      }, D(e.label), 11, z2)) : z("", !0),
      u("input", Ct(b.value, {
        id: l.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [A(mt), m.value ? A(It) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": m.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r.value : void 0,
        onInput: v,
        onChange: f,
        onBlur: y
      }), null, 16, N2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: r.value,
        class: J(A(Mt)),
        role: "alert"
      }, D(e.errorText), 11, H2)) : z("", !0)
    ]));
  }
}), j2 = { class: "font-sans" }, K2 = ["for"], Y2 = { class: "relative" }, U2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], q2 = ["aria-label"], X2 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, G2 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Z2 = ["id"], Q2 = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = wa(), o = oi("$pcForm", null), i = `kiut-input-password-${qe()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? s.name ?? ""), d = ie(!1), h = ie(n.modelValue ?? "");
    Oe(
      () => n.modelValue,
      (_) => {
        _ !== void 0 && _ !== h.value && (h.value = _);
      }
    ), tt(() => {
      o && c.value && o.register?.(c.value, {});
    }), pt(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const m = C(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? h.value : h.value), v = C(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function f(_) {
      const k = _.target.value;
      h.value = k, a("update:modelValue", k);
      const w = o?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(_);
    }
    function y(_) {
      const k = o?.fields?.[c.value]?.props;
      k?.onChange && k.onChange(_);
    }
    function b(_) {
      const k = o?.fields?.[c.value]?.props;
      k?.onBlur && k.onBlur(_);
    }
    const p = C(() => {
      const { name: _, id: k, ...w } = s;
      return w;
    });
    return (_, k) => (g(), x("div", j2, [
      e.label ? (g(), x("label", {
        key: 0,
        for: l.value,
        class: J(A(ct))
      }, D(e.label), 11, K2)) : z("", !0),
      u("div", Y2, [
        u("input", Ct(p.value, {
          id: l.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [A(mt), v.value ? A(It) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: m.value,
          "aria-invalid": v.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: f,
          onChange: y,
          onBlur: b
        }), null, 16, U2),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: k[0] || (k[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (g(), x("svg", G2, [...k[2] || (k[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (g(), x("svg", X2, [...k[1] || (k[1] = [
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
        ], 8, q2)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: r.value,
        class: J(A(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Z2)) : z("", !0)
    ]));
  }
}), J2 = { class: "font-sans" }, ew = ["for"], tw = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], nw = ["id"], aw = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = `kiut-input-textarea-${qe()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C({
      get: () => n.modelValue,
      set: (r) => a("update:modelValue", r)
    });
    return (r, c) => (g(), x("div", J2, [
      e.label ? (g(), x("label", {
        key: 0,
        for: o.value,
        class: J(A(ct))
      }, D(e.label), 11, ew)) : z("", !0),
      lt(u("textarea", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => l.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: J([A(iy), e.invalid ? A(It) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, tw), [
        [sn, l.value]
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: J(A(Mt)),
        role: "alert"
      }, D(e.errorText), 11, nw)) : z("", !0)
    ]));
  }
}), sw = { class: "font-sans" }, ow = ["for"], iw = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], lw = ["for"], rw = ["title"], cw = ["aria-label"], dw = ["id"], uw = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = `kiut-input-file-${qe()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = ie(null), r = C(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const v = h.target.files?.[0] ?? null;
      a("update:modelValue", v);
    }
    function d() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, m) => (g(), x("div", sw, [
      e.label ? (g(), x("label", {
        key: 0,
        for: o.value,
        class: J(A(ct))
      }, D(e.label), 11, ow)) : z("", !0),
      u("div", {
        class: J([
          A(mt),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? A(It) : "",
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
        }, null, 40, iw),
        u("label", {
          for: o.value,
          class: J(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          O(A(Am), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Be(" " + D(e.chooseLabel), 1)
        ], 10, lw),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: r.value || void 0
        }, D(r.value), 9, rw),
        e.modelValue && !e.disabled ? (g(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          O(A(sl), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, cw)) : z("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: J(A(Mt)),
        role: "alert"
      }, D(e.errorText), 11, dw)) : z("", !0)
    ]));
  }
}), hw = { class: "font-sans" }, fw = ["for"], gw = { class: "relative" }, mw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], pw = ["id"], bw = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = `kiut-input-datetime-${qe()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C(() => n.modelValue ?? "");
    function r(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (g(), x("div", hw, [
      e.label ? (g(), x("label", {
        key: 0,
        for: o.value,
        class: J(A(ct))
      }, D(e.label), 11, fw)) : z("", !0),
      u("div", gw, [
        O(A(ks), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: J([
            A(mt),
            "pl-10",
            e.invalid ? A(It) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: r
        }, null, 42, mw)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: J(A(Mt)),
        role: "alert"
      }, D(e.errorText), 11, pw)) : z("", !0)
    ]));
  }
}), vw = { class: "font-sans" }, yw = ["for"], xw = { class: "relative" }, _w = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], kw = ["id"], ww = /* @__PURE__ */ ce({
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
      const v = Number(m[1]), f = Number(m[2]);
      return !Number.isInteger(v) || !Number.isInteger(f) || v < 0 || v > 23 || f < 0 || f > 59 ? null : `${String(v).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${qe()}`, l = C(() => s.id ?? i), r = C(() => `${l.value}-err`), c = C(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function d(h) {
      const m = h.target.value;
      o("update:modelValue", a(m));
    }
    return (h, m) => (g(), x("div", vw, [
      e.label ? (g(), x("label", {
        key: 0,
        for: l.value,
        class: J(A(ct))
      }, D(e.label), 11, yw)) : z("", !0),
      u("div", xw, [
        O(A(Lm), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: J([
            A(mt),
            "pl-10",
            e.invalid ? A(It) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: d
        }, null, 42, _w)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: r.value,
        class: J(A(Mt)),
        role: "alert"
      }, D(e.errorText), 11, kw)) : z("", !0)
    ]));
  }
}), Cw = { class: "font-sans" }, $w = ["for"], Sw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Mw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], Dw = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Tw = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Aw = { class: "min-w-0 text-left leading-snug" }, Bw = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, Lw = { class: "min-w-0 text-right leading-snug" }, Pw = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Rw = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Iw = ["id"], Ew = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = `kiut-input-range-${qe()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C(() => {
      const v = [];
      return n.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), r = C(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = C(() => !!(n.captionMin || n.captionMax)), d = C(() => {
      const { min: v, max: f, modelValue: y } = n;
      if (f === v) return 0;
      const b = (y - v) / (f - v);
      return Math.min(100, Math.max(0, b * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function m(v) {
      const f = Number(v.target.value);
      a("update:modelValue", Number.isNaN(f) ? n.min : f);
    }
    return (v, f) => (g(), x("div", Cw, [
      e.label ? (g(), x("label", {
        key: 0,
        for: o.value,
        class: J(A(ct))
      }, D(e.label), 11, $w)) : z("", !0),
      u("div", {
        class: J(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (g(), x("p", Sw, D(e.captionMax), 1)) : z("", !0),
        u("div", {
          class: J(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: Ce(h.value)
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
          }, null, 42, Mw)
        ], 6),
        e.orientation === "horizontal" && r.value ? (g(), x("p", Dw, D(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (g(), x("div", Tw, [
          u("span", Aw, D(e.captionMin), 1),
          u("span", Bw, D(e.caption), 1),
          u("span", Lw, D(e.captionMax), 1)
        ])) : z("", !0),
        e.orientation === "vertical" && e.captionMin ? (g(), x("p", Pw, D(e.captionMin), 1)) : z("", !0),
        e.orientation === "vertical" && e.caption ? (g(), x("p", Rw, D(e.caption), 1)) : z("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: J(A(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Iw)) : z("", !0)
    ]));
  }
}), Fw = /* @__PURE__ */ me(Ew, [["__scopeId", "data-v-a1343418"]]), Ow = { class: "font-sans" }, Vw = ["for"], zw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Nw = ["id"], Hw = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = `kiut-input-number-${qe()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C(() => {
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
    return (d, h) => (g(), x("div", Ow, [
      e.label ? (g(), x("label", {
        key: 0,
        for: o.value,
        class: J(A(ct))
      }, D(e.label), 11, Vw)) : z("", !0),
      u("input", {
        id: o.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: J([
          A(mt),
          e.invalid ? A(It) : "",
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
      }, null, 42, zw),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: J(A(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Nw)) : z("", !0)
    ]));
  }
}), Ww = { class: "font-sans" }, jw = ["for"], Kw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Yw = ["disabled"], Uw = ["id"], qw = "#3b82f6", Xw = "#aabbcc", Gw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Zw = /* @__PURE__ */ ce({
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
    function n(f) {
      const y = f.trim(), b = /^#?([0-9a-fA-F]{6})$/.exec(y);
      if (b) return `#${b[1].toLowerCase()}`;
      const p = /^#?([0-9a-fA-F]{3})$/.exec(y);
      if (p) {
        const [_, k, w] = p[1].split("");
        return `#${_}${_}${k}${k}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(f) {
      return n(f) ?? qw;
    }
    const s = e, o = t, i = `kiut-input-color-${qe()}`, l = C(() => s.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a(s.modelValue)), d = ie(c.value), h = ie(!1);
    Oe(c, (f) => {
      h.value || (d.value = f);
    });
    function m(f) {
      const y = f.target, b = n(y.value);
      b && o("update:modelValue", b);
    }
    function v() {
      h.value = !1;
      const f = n(d.value);
      f ? (d.value = f, o("update:modelValue", f)) : d.value = c.value;
    }
    return Oe(d, (f) => {
      if (!h.value) return;
      const y = n(f);
      y && o("update:modelValue", y);
    }), (f, y) => (g(), x("div", Ww, [
      e.label ? (g(), x("label", {
        key: 0,
        for: l.value,
        class: J(A(ct))
      }, D(e.label), 11, jw)) : z("", !0),
      u("div", {
        class: J([
          Gw,
          e.invalid ? A(It) : "",
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
        }, null, 40, Kw),
        e.showHexInput ? lt((g(), x("input", {
          key: 0,
          "onUpdate:modelValue": y[0] || (y[0] = (b) => d.value = b),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Xw,
          onFocus: y[1] || (y[1] = (b) => h.value = !0),
          onBlur: v
        }, null, 40, Yw)), [
          [sn, d.value]
        ]) : z("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: r.value,
        class: J(A(Mt)),
        role: "alert"
      }, D(e.errorText), 11, Uw)) : z("", !0)
    ]));
  }
}), Qw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Jw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, e5 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, t5 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, n5 = { class: "truncate" }, a5 = ["aria-selected", "onClick", "onMouseenter"], s5 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, o5 = { class: "min-w-0 flex-1" }, i5 = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = `kiut-multiselect-${qe()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, r = ie(null), c = ie(null), d = ie(!1), h = ie(0), m = C(() => n.options.filter((E) => !E.disabled)), v = C(() => new Set(n.modelValue ?? [])), f = C(
      () => n.options.filter((E) => v.value.has(E.value))
    ), y = C(() => {
      const E = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", T = f.value.length;
      return T === 0 ? E : `${E}, ${T} seleccionada${T === 1 ? "" : "s"}`;
    });
    function b(E) {
      return `${String(E.value)}-${E.label}`;
    }
    function p(E) {
      return v.value.has(E.value);
    }
    function _(E, T) {
      const P = p(E), V = h.value === T;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        P ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !P && V ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function k(E) {
      const T = [...n.modelValue ?? []], P = T.indexOf(E.value);
      P >= 0 ? T.splice(P, 1) : T.push(E.value), a("update:modelValue", T);
    }
    function w() {
      const E = m.value;
      if (E.length === 0) {
        h.value = 0;
        return;
      }
      const T = v.value, P = E.findIndex((V) => T.has(V.value));
      h.value = P >= 0 ? P : 0;
    }
    function $() {
      n.disabled || (d.value = !d.value);
    }
    function S(E) {
      E.stopPropagation(), !n.disabled && ($(), d.value && (w(), We(() => c.value?.focus())));
    }
    function M(E) {
      if (!d.value) return;
      const T = r.value;
      T && !T.contains(E.target) && (d.value = !1);
    }
    function F(E) {
      n.disabled || (E.key === "ArrowDown" || E.key === "Enter" || E.key === " ") && (E.preventDefault(), d.value || (d.value = !0, w(), We(() => c.value?.focus())));
    }
    function j(E) {
      const T = m.value;
      if (T.length !== 0) {
        if (E.key === "Escape") {
          E.preventDefault(), d.value = !1;
          return;
        }
        if (E.key === "ArrowDown") {
          E.preventDefault(), h.value = Math.min(h.value + 1, T.length - 1);
          return;
        }
        if (E.key === "ArrowUp") {
          E.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (E.key === "Enter" || E.key === " ") {
          E.preventDefault();
          const P = T[h.value];
          P && k(P);
        }
      }
    }
    return tt(() => {
      document.addEventListener("click", M);
    }), pt(() => {
      document.removeEventListener("click", M);
    }), (E, T) => (g(), x("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: o,
        class: J(A(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: J([
          A(mt),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: S,
        onKeydown: F
      }, [
        u("div", Jw, [
          f.value.length === 0 ? (g(), x("span", e5, D(e.placeholder), 1)) : (g(), x("div", t5, [
            (g(!0), x(oe, null, fe(f.value, (P) => (g(), x("span", {
              key: b(P),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", n5, D(P.label), 1)
            ]))), 128))
          ]))
        ]),
        O(A(Yn), {
          class: J(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Qw),
      lt(u("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Ye(j, ["stop"])
      }, [
        (g(!0), x(oe, null, fe(m.value, (P, V) => (g(), x("li", {
          key: b(P),
          role: "option",
          "aria-selected": p(P),
          class: J(_(P, V)),
          onClick: Ye((X) => k(P), ["stop"]),
          onMouseenter: (X) => h.value = V
        }, [
          u("span", s5, [
            p(P) ? (g(), te(A(cl), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : z("", !0)
          ]),
          u("span", o5, D(P.label), 1)
        ], 42, a5))), 128))
      ], 544), [
        [bn, d.value]
      ])
    ], 512));
  }
}), l5 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], r5 = { class: "sr-only" }, c5 = /* @__PURE__ */ ce({
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
    return (o, i) => (g(), x("button", {
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
        Fn(Ye(s, ["prevent", "stop"]), ["space"]),
        Fn(Ye(s, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: J(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", r5, D(e.ariaLabel), 1)
    ], 42, l5));
  }
}), d5 = { class: "font-sans" }, u5 = ["for"], h5 = { class: "flex gap-2" }, f5 = { class: "w-[7.5rem] shrink-0" }, g5 = { class: "min-w-0 flex-1" }, m5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], p5 = ["id"], b5 = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = `kiut-phone-${qe()}`, o = C(() => n.id ?? `${s}-num`), i = C(() => `${o.value}-err`), l = C({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), r = C({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (g(), x("div", d5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: o.value,
        class: J(A(ct))
      }, D(e.label), 11, u5)) : z("", !0),
      u("div", h5, [
        u("div", f5, [
          O(ws, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", g5, [
          lt(u("input", {
            id: o.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => r.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: J([A(mt), e.invalid ? A(It) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, m5), [
            [sn, r.value]
          ])
        ])
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: J(A(Mt)),
        role: "alert"
      }, D(e.errorText), 11, p5)) : z("", !0)
    ]));
  }
}), v5 = ["role", "aria-label"], y5 = { class: "flex flex-wrap gap-2" }, x5 = ["aria-checked", "role", "onClick"], _5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, k5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, w5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, C5 = /* @__PURE__ */ ce({
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
    return (r, c) => (g(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", y5, [
        (g(!0), x(oe, null, fe(e.items, (d) => (g(), x("button", {
          key: d.value,
          type: "button",
          class: J(i(d)),
          "aria-checked": o(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          u("span", _5, [
            o(d) ? (g(), x("span", k5)) : z("", !0)
          ]),
          d.dotColor ? (g(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: Ce({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", w5, D(d.label), 1)
        ], 10, x5))), 128))
      ])
    ], 8, v5));
  }
}), $5 = ["aria-label"], S5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], M5 = { class: "truncate px-3 py-2 text-sm font-medium" }, D5 = /* @__PURE__ */ ce({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${qe()}`, o = (y) => `${s}-seg-${y}`, i = ie([]);
    function l(y, b) {
      y instanceof HTMLButtonElement ? i.value[b] = y : i.value[b] = null;
    }
    function r(y) {
      return y.value === n.modelValue;
    }
    function c(y) {
      const b = r(y), p = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return y.disabled ? `${p} cursor-not-allowed opacity-40` : b ? `${p} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${p} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(y) {
      y.disabled || y.value !== n.modelValue && a("update:modelValue", y.value);
    }
    function h(y, b, p) {
      d(y), We(() => i.value[b]?.focus());
    }
    const m = C(
      () => n.items.map((y, b) => y.disabled ? -1 : b).filter((y) => y >= 0)
    );
    function v(y, b) {
      const p = n.items.length;
      if (p === 0) return 0;
      let _ = y;
      for (let k = 0; k < p; k++)
        if (_ = (_ + b + p) % p, !n.items[_]?.disabled) return _;
      return y;
    }
    function f(y, b) {
      if (y.key === "ArrowRight" || y.key === "ArrowDown") {
        y.preventDefault();
        const p = v(b, 1), _ = n.items[p];
        _ && d(_), We(() => i.value[p]?.focus());
      } else if (y.key === "ArrowLeft" || y.key === "ArrowUp") {
        y.preventDefault();
        const p = v(b, -1), _ = n.items[p];
        _ && d(_), We(() => i.value[p]?.focus());
      } else if (y.key === "Home") {
        y.preventDefault();
        const p = m.value[0];
        if (p !== void 0) {
          const _ = n.items[p];
          _ && d(_), We(() => i.value[p]?.focus());
        }
      } else if (y.key === "End") {
        y.preventDefault();
        const p = m.value[m.value.length - 1];
        if (p !== void 0) {
          const _ = n.items[p];
          _ && d(_), We(() => i.value[p]?.focus());
        }
      }
    }
    return (y, b) => (g(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (g(!0), x(oe, null, fe(e.items, (p, _) => (g(), x("button", {
        id: o(p.value),
        key: p.value,
        ref_for: !0,
        ref: (k) => l(k, _),
        type: "button",
        role: "tab",
        "aria-selected": r(p),
        "aria-disabled": p.disabled === !0,
        tabindex: r(p) ? 0 : -1,
        class: J(c(p)),
        onClick: (k) => h(p, _),
        onKeydown: (k) => f(k, _)
      }, [
        u("span", M5, D(p.label), 1)
      ], 42, S5))), 128))
    ], 8, $5));
  }
}), T5 = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, A5 = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, B5 = {
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
}, L5 = {
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
}, P5 = [
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
function R5(e = "en") {
  return T5[e];
}
function bl(e = "en") {
  return P5.map((t) => ({ id: t, label: L5[e][t] }));
}
function I5(e = "en") {
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
function Un(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function E5(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return ze(n);
}
function Dn(e, t) {
  return E5(e, -t);
}
function F5(e) {
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
      const a = Pt(Un(n, -1));
      return { start: a, end: F5(a) };
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
function O5(e, t, n = /* @__PURE__ */ new Date(), a, s) {
  if (!e.start || !e.end) return !1;
  const o = yl(vl(t, n), a, s);
  return ot(o.start) === e.start && ot(o.end) === e.end;
}
function Xn(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Ht(e, t) {
  return Xn(e, t) === 0;
}
function Kt(e, t) {
  return Xn(e, t) < 0;
}
function ja(e, t) {
  return Xn(e, t) > 0;
}
function xl(e, t) {
  return Xn(e, t) >= 0;
}
function _l(e, t) {
  return Xn(e, t) <= 0;
}
function kl(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
function ka(e, t = "en") {
  return `${A5[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Wt(e, t = "en") {
  return `${B5[t][e.getMonth()]} ${e.getFullYear()}`;
}
const V5 = ["aria-expanded", "aria-labelledby", "aria-label"], z5 = ["onKeydown"], N5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, H5 = { class: "mb-4 flex items-center justify-between gap-2" }, W5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, j5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, K5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, Y5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, U5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, q5 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, X5 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, G5 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, Z5 = ["disabled", "onClick"], Q5 = "rounded-lg text-[#61616b]", J5 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", eC = "opacity-30", tC = "bg-[#6b35e9] font-medium text-white", nC = "bg-[#895af6] font-semibold text-white", aC = /* @__PURE__ */ ce({
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
    const n = e, a = t, o = `${`kiut-drp-${qe()}`}-lbl`, i = ie(null), l = ie(null), r = ie(!1), c = ie(null), d = ie(Pt(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), m = C(() => {
      const T = Pt(d.value);
      return [T, Un(T, 1)];
    }), v = C(() => n.ariaLabel ?? n.placeholder), f = C(() => {
      const T = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${T}` : `left-0 right-auto ${T}`;
    }), y = C(
      () => `${Wt(m.value[0])} – ${Wt(m.value[1])}`
    ), b = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], p = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const T = Ze(n.modelValue.start), P = Ze(n.modelValue.end);
      return `${ka(T)} – ${ka(P)}`;
    });
    function _(T, P) {
      return T.getMonth() === P.getMonth() && T.getFullYear() === P.getFullYear();
    }
    function k(T) {
      const P = ze(T);
      if (n.minDate) {
        const V = ze(Ze(n.minDate));
        if (Kt(P, V)) return !0;
      }
      if (n.maxDate) {
        const V = ze(Ze(n.maxDate));
        if (Kt(V, P)) return !0;
      }
      return !1;
    }
    function w(T, P, V) {
      const X = Ht(T, P), Z = Ht(T, V);
      if (X && Z) return "rounded-lg";
      const ae = X || T.getDay() === 0, se = Z || T.getDay() === 6;
      return ae && se ? "rounded-lg" : ae ? "rounded-l-lg" : se ? "rounded-r-lg" : "rounded-none";
    }
    function $(T, P) {
      const V = _(P, T), X = k(P), Z = n.modelValue.start ? ze(Ze(n.modelValue.start)) : null, ae = n.modelValue.end ? ze(Ze(n.modelValue.end)) : null, se = ze(P);
      if (X)
        return Q5;
      let ge = J5;
      if (Z && ae && xl(se, Z) && _l(se, ae)) {
        const L = Ht(se, Z), R = Ht(se, ae);
        ge = `${w(se, Z, ae)} ${L || R ? nC : tC}`;
      }
      return V || (ge = `${ge} ${eC}`), ge;
    }
    function S(T) {
      if (k(T)) return;
      const P = ze(T);
      if (!c.value) {
        c.value = new Date(P), a("update:modelValue", { start: ot(P), end: ot(P) });
        return;
      }
      let X = ze(c.value), Z = new Date(P);
      Kt(Z, X) && ([X, Z] = [Z, X]), a("update:modelValue", { start: ot(X), end: ot(Z) }), c.value = null, r.value = !1;
    }
    function M(T) {
      d.value = Un(d.value, T);
    }
    function F() {
      r.value = !1;
    }
    function j(T) {
      if (T?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, n.modelValue.start)
          try {
            d.value = Pt(Ze(n.modelValue.start));
          } catch {
          }
        We(() => l.value?.focus());
      }
    }
    function E(T) {
      if (!r.value) return;
      const P = i.value;
      P && !P.contains(T.target) && (r.value = !1);
    }
    return Oe(r, (T) => {
      T && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", E);
    }), pt(() => {
      document.removeEventListener("click", E);
    }), (T, P) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: o,
        class: J(A(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: J([
          A(mt),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onFocus: j,
        onClick: j
      }, [
        O(A(ks), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, D(p.value), 3)
      ], 42, V5),
      lt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: J([
          f.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Fn(Ye(F, ["stop"]), ["escape"])
      }, [
        u("div", N5, [
          u("div", H5, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: P[0] || (P[0] = (V) => M(-1))
            }, [
              O(A(nl), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", W5, [
              u("span", j5, D(y.value), 1),
              u("div", K5, [
                u("span", Y5, D(A(Wt)(m.value[0])), 1),
                u("span", U5, D(A(Wt)(m.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: P[1] || (P[1] = (V) => M(1))
            }, [
              O(A(al), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", q5, [
            (g(!0), x(oe, null, fe(m.value, (V) => (g(), x("div", {
              key: `${V.getFullYear()}-${V.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", X5, [
                (g(), x(oe, null, fe(b, (X) => u("span", { key: X }, D(X), 1)), 64))
              ]),
              u("div", G5, [
                (g(!0), x(oe, null, fe(A(kl)(V), (X) => (g(), x("button", {
                  key: A(ot)(X),
                  type: "button",
                  disabled: k(X),
                  class: J(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(V, X)]),
                  onClick: (Z) => S(X)
                }, D(X.getDate()), 11, Z5))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, z5), [
        [bn, r.value]
      ])
    ], 512));
  }
}), sC = ["aria-expanded", "aria-labelledby", "aria-label"], oC = ["aria-label", "onKeydown"], iC = { class: "flex flex-col sm:flex-row" }, lC = ["aria-label"], rC = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, cC = { class: "flex flex-col gap-0.5" }, dC = ["onClick"], uC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, hC = { class: "mb-4 flex items-center justify-between gap-2" }, fC = ["aria-label"], gC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, mC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, pC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, bC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, vC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, yC = ["aria-label"], xC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, _C = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, kC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, wC = ["disabled", "onClick"], CC = "rounded-lg text-[#61616b]", $C = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", SC = "opacity-30", MC = "bg-[#6b35e9] font-medium text-white", DC = "bg-[#895af6] font-semibold text-white", TC = /* @__PURE__ */ ce({
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
    const n = e, a = t, o = `${`kiut-dpp-${qe()}`}-lbl`, i = ie(null), l = ie(null), r = ie(!1), c = ie(null), d = ie(Pt(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), m = C(() => {
      const L = Pt(d.value);
      return [L, Un(L, 1)];
    }), v = C(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), f = C(() => n.ariaLabel ?? v.value), y = C(() => bl(n.locale)), b = C(() => I5(n.locale)), p = C(() => R5(n.locale)), _ = C(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), k = C(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = C(() => {
      const L = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${L}` : `left-0 right-auto ${L}`;
    }), M = C(
      () => `${Wt(m.value[0], n.locale)} – ${Wt(m.value[1], n.locale)}`
    ), F = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return v.value;
      const L = Ze(n.modelValue.start), R = Ze(n.modelValue.end);
      return `${ka(L, n.locale)} – ${ka(R, n.locale)}`;
    });
    function j(L, R) {
      return L.getMonth() === R.getMonth() && L.getFullYear() === R.getFullYear();
    }
    function E(L) {
      const R = ze(L);
      if (n.minDate) {
        const H = ze(Ze(n.minDate));
        if (Kt(R, H)) return !0;
      }
      if (n.maxDate) {
        const H = ze(Ze(n.maxDate));
        if (Kt(H, R)) return !0;
      }
      return !1;
    }
    function T(L, R, H) {
      const ee = Ht(L, R), ue = Ht(L, H);
      if (ee && ue) return "rounded-lg";
      const De = ee || L.getDay() === 0, Se = ue || L.getDay() === 6;
      return De && Se ? "rounded-lg" : De ? "rounded-l-lg" : Se ? "rounded-r-lg" : "rounded-none";
    }
    function P(L) {
      const R = O5(
        n.modelValue,
        L,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), H = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return R ? `${H} font-medium` : H;
    }
    function V(L, R) {
      const H = j(R, L), ee = E(R), ue = n.modelValue.start ? ze(Ze(n.modelValue.start)) : null, De = n.modelValue.end ? ze(Ze(n.modelValue.end)) : null, Se = ze(R);
      if (ee)
        return CC;
      let Q = $C;
      if (ue && De && xl(Se, ue) && _l(Se, De)) {
        const W = Ht(Se, ue), G = Ht(Se, De);
        Q = `${T(Se, ue, De)} ${W || G ? DC : MC}`;
      }
      return H || (Q = `${Q} ${SC}`), Q;
    }
    function X(L) {
      const R = yl(vl(L), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: ot(R.start),
        end: ot(R.end)
      }), d.value = Pt(R.start), c.value = null, r.value = !1;
    }
    function Z(L) {
      if (E(L)) return;
      const R = ze(L);
      if (!c.value) {
        c.value = new Date(R), a("update:modelValue", { start: ot(R), end: ot(R) });
        return;
      }
      let ee = ze(c.value), ue = new Date(R);
      Kt(ue, ee) && ([ee, ue] = [ue, ee]), a("update:modelValue", { start: ot(ee), end: ot(ue) }), c.value = null, r.value = !1;
    }
    function ae(L) {
      d.value = Un(d.value, L);
    }
    function se() {
      r.value = !1;
    }
    function ge(L) {
      if (L.stopPropagation(), r.value) {
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
    function pe(L) {
      if (!r.value) return;
      const R = i.value;
      R && !R.contains(L.target) && (r.value = !1);
    }
    return Oe(r, (L) => {
      L && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", pe);
    }), pt(() => {
      document.removeEventListener("click", pe);
    }), (L, R) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: o,
        class: J(A(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: J([
          A(mt),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : f.value,
        onClick: ge
      }, [
        O(A(ks), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, D(F.value), 3)
      ], 10, sC),
      lt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: J([
          S.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Fn(Ye(se, ["stop"]), ["escape"])
      }, [
        u("div", iC, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": _.value
          }, [
            u("p", rC, D(b.value), 1),
            u("ul", cC, [
              (g(!0), x(oe, null, fe(y.value, (H) => (g(), x("li", {
                key: H.id
              }, [
                u("button", {
                  type: "button",
                  class: J(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", P(H.id)]),
                  onClick: (ee) => X(H.id)
                }, D(H.label), 11, dC)
              ]))), 128))
            ])
          ], 8, lC),
          u("div", uC, [
            u("div", hC, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": k.value,
                onClick: R[0] || (R[0] = (H) => ae(-1))
              }, [
                O(A(nl), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, fC),
              u("div", gC, [
                u("span", mC, D(M.value), 1),
                u("div", pC, [
                  u("span", bC, D(A(Wt)(m.value[0], e.locale)), 1),
                  u("span", vC, D(A(Wt)(m.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: R[1] || (R[1] = (H) => ae(1))
              }, [
                O(A(al), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, yC)
            ]),
            u("div", xC, [
              (g(!0), x(oe, null, fe(m.value, (H) => (g(), x("div", {
                key: `${H.getFullYear()}-${H.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", _C, [
                  (g(!0), x(oe, null, fe(p.value, (ee) => (g(), x("span", { key: ee }, D(ee), 1))), 128))
                ]),
                u("div", kC, [
                  (g(!0), x(oe, null, fe(A(kl)(H), (ee) => (g(), x("button", {
                    key: A(ot)(ee),
                    type: "button",
                    disabled: E(ee),
                    class: J(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", V(H, ee)]),
                    onClick: (ue) => Z(ee)
                  }, D(ee.getDate()), 11, wC))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, oC), [
        [bn, r.value]
      ])
    ], 512));
  }
}), ti = /* @__PURE__ */ ce({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (a, s) => (g(), x("svg", {
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
}), AC = ["disabled", "aria-expanded", "aria-label"], BC = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, LC = { class: "min-w-0 truncate" }, PC = ["disabled", "onClick", "onMouseenter"], RC = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, IC = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, EC = { class: "min-w-0 flex-1 text-left" }, FC = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, OC = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, VC = ["disabled", "aria-expanded", "aria-label"], zC = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, NC = ["disabled", "onClick", "onMouseenter"], HC = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, WC = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, jC = { class: "min-w-0 flex-1 text-left" }, KC = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, YC = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, UC = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, qC = ["type", "disabled", "aria-busy", "aria-label"], XC = {
  key: 2,
  class: "min-w-0 truncate"
}, GC = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, ZC = ["type", "disabled", "aria-busy", "aria-label"], QC = {
  key: 2,
  class: "min-w-0 truncate"
}, fa = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = wa(), o = C(
      () => !!n.tooltip?.trim() && n.variant !== "dropdown" && n.variant !== "split"
    ), i = C(() => n.variant === "dropdown"), l = C(() => n.variant === "split"), r = C(() => n.variant === "action"), c = C(() => !r.value && !l.value), d = C(() => n.disabled || n.loading), h = C(
      () => n.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), m = C(() => {
      const R = s["aria-label"];
      if (typeof R == "string" && R.length > 0) return R;
      if ((r.value || l.value) && n.tooltip?.trim()) return n.tooltip.trim();
    }), v = C(() => {
      const R = s.type;
      return R === "submit" || R === "reset" || R === "button" ? R : "button";
    }), f = C(() => {
      const { class: R, type: H, "aria-label": ee, ...ue } = s;
      return ue;
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
    ]), b = `kiut-button-menu-${qe()}`, p = `${b}-btn`, _ = `${b}-menu`, k = ie(null), w = ie(null), $ = ie(null), S = ie(!1), M = ie(0), F = ie({}), j = C(() => n.options.filter((R) => !R.disabled));
    function E(R) {
      return `${R.value}-${R.label}`;
    }
    function T() {
      const R = w.value;
      if (!R) return;
      const H = R.getBoundingClientRect(), ee = {
        top: `${H.bottom - 3}px`,
        minWidth: `max(${H.width}px, ${n.menuMinWidth})`
      };
      n.menuAlign === "right" ? (ee.right = `${window.innerWidth - H.right}px`, ee.left = "auto") : (ee.left = `${H.left}px`, ee.right = "auto"), F.value = ee;
    }
    function P(R) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        M.value === R ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function V() {
      S.value = !1;
    }
    function X() {
      T(), M.value = 0, We(() => $.value?.focus());
    }
    function Z() {
      if (!n.disabled) {
        if (S.value) {
          V();
          return;
        }
        S.value = !0, X();
      }
    }
    function ae(R) {
      R.disabled || (a("select", R), V());
    }
    function se(R) {
      R.stopPropagation(), Z();
    }
    function ge(R) {
      if (!S.value) return;
      const H = R.target, ee = k.value, ue = $.value;
      ee && !ee.contains(H) && (!ue || !ue.contains(H)) && V();
    }
    function pe(R) {
      n.disabled || (R.key === "ArrowDown" || R.key === "Enter" || R.key === " ") && (R.preventDefault(), S.value || (S.value = !0, X()));
    }
    function L(R) {
      const H = j.value;
      if (R.key === "Escape") {
        R.preventDefault(), V(), w.value?.focus();
        return;
      }
      if (H.length !== 0) {
        if (R.key === "ArrowDown") {
          R.preventDefault(), M.value = Math.min(M.value + 1, H.length - 1);
          return;
        }
        if (R.key === "ArrowUp") {
          R.preventDefault(), M.value = Math.max(M.value - 1, 0);
          return;
        }
        if (R.key === "Enter" || R.key === " ") {
          R.preventDefault();
          const ee = H[M.value];
          ee && ae(ee);
        }
      }
    }
    return tt(() => {
      document.addEventListener("click", ge);
    }), pt(() => {
      document.removeEventListener("click", ge);
    }), (R, H) => i.value ? (g(), x("div", {
      key: 0,
      ref_key: "rootRef",
      ref: k,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", Ct({
        ref_key: "buttonRef",
        ref: w,
        id: p,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [y.value, A(s).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": _,
        "aria-label": m.value
      }, f.value, {
        onClick: se,
        onKeydown: pe
      }), [
        R.$slots.icon ? (g(), x("span", BC, [
          we(R.$slots, "icon")
        ])) : z("", !0),
        u("span", LC, [
          we(R.$slots, "default")
        ]),
        O(A(Yn), {
          class: J(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", S.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, AC),
      (g(), te(En, { to: "body" }, [
        lt(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: _,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(F.value),
          onKeydown: Ye(L, ["stop"])
        }, [
          (g(!0), x(oe, null, fe(j.value, (ee, ue) => (g(), x("button", {
            key: E(ee),
            type: "button",
            role: "menuitem",
            disabled: ee.disabled,
            class: J(P(ue)),
            onClick: Ye((De) => ae(ee), ["stop"]),
            onMouseenter: (De) => M.value = ue
          }, [
            ee.icon ? (g(), x("span", RC, [
              (g(), te(Ft(ee.icon), { class: "h-5 w-5" }))
            ])) : (g(), x("span", IC)),
            u("span", EC, [
              u("span", FC, D(ee.label), 1),
              ee.description ? (g(), x("span", OC, D(ee.description), 1)) : z("", !0)
            ])
          ], 42, PC))), 128))
        ], 36), [
          [bn, S.value]
        ])
      ]))
    ], 512)) : l.value ? (g(), x("div", {
      key: 1,
      ref_key: "rootRef",
      ref: k,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", Ct({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [y.value, A(s).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": _,
        "aria-label": m.value
      }, f.value, {
        onClick: se,
        onKeydown: pe
      }), [
        R.$slots.icon ? (g(), x("span", zC, [
          we(R.$slots, "icon")
        ])) : z("", !0)
      ], 16, VC),
      (g(), te(En, { to: "body" }, [
        lt(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: _,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(F.value),
          onKeydown: Ye(L, ["stop"])
        }, [
          (g(!0), x(oe, null, fe(j.value, (ee, ue) => (g(), x("button", {
            key: E(ee),
            type: "button",
            role: "menuitem",
            disabled: ee.disabled,
            class: J(P(ue)),
            onClick: Ye((De) => ae(ee), ["stop"]),
            onMouseenter: (De) => M.value = ue
          }, [
            ee.icon ? (g(), x("span", HC, [
              (g(), te(Ft(ee.icon), { class: "h-5 w-5" }))
            ])) : (g(), x("span", WC)),
            u("span", jC, [
              u("span", KC, D(ee.label), 1),
              ee.description ? (g(), x("span", YC, D(ee.description), 1)) : z("", !0)
            ])
          ], 42, NC))), 128))
        ], 36), [
          [bn, S.value]
        ])
      ]))
    ], 512)) : o.value ? (g(), x("span", UC, [
      u("button", Ct({
        type: v.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, y.value, A(s).class]],
        disabled: d.value,
        "aria-busy": e.loading || void 0,
        "aria-label": m.value
      }, f.value), [
        e.loading ? (g(), te(ti, {
          key: 0,
          compact: r.value
        }, null, 8, ["compact"])) : R.$slots.icon ? (g(), x("span", {
          key: 1,
          class: J(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          we(R.$slots, "icon")
        ], 2)) : z("", !0),
        c.value ? (g(), x("span", XC, [
          we(R.$slots, "default")
        ])) : z("", !0)
      ], 16, qC),
      u("span", GC, D(e.tooltip), 1)
    ])) : (g(), x("button", Ct({
      key: 3,
      type: v.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, y.value, A(s).class]],
      disabled: d.value,
      "aria-busy": e.loading || void 0,
      "aria-label": m.value
    }, f.value), [
      e.loading ? (g(), te(ti, {
        key: 0,
        compact: r.value
      }, null, 8, ["compact"])) : R.$slots.icon ? (g(), x("span", {
        key: 1,
        class: J(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        we(R.$slots, "icon")
      ], 2)) : z("", !0),
      c.value ? (g(), x("span", QC, [
        we(R.$slots, "default")
      ])) : z("", !0)
    ], 16, ZC));
  }
}), JC = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, e$ = { class: "min-w-0 flex-1 space-y-1" }, t$ = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, n$ = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, a$ = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, s$ = /* @__PURE__ */ ce({
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
    const n = e, a = C(() => ({ maxWidth: `${n.width}px` })), s = t, i = `${`kiut-modal-${qe()}`}-title`, l = ie(null);
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
    }), (h, m) => (g(), te(En, { to: "body" }, [
      O(Te, { name: "kiut-modal" }, {
        default: B(() => [
          e.modelValue ? (g(), x("div", JC, [
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
              style: Ce(a.value),
              onClick: m[0] || (m[0] = Ye(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: J(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", e$, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, D(e.title), 1),
                  e.subtitle ? (g(), x("p", t$, D(e.subtitle), 1)) : z("", !0)
                ]),
                O(fa, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: r
                }, {
                  icon: B(() => [
                    O(A(sl), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              u("div", n$, [
                we(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", a$, [
                O(fa, {
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
                O(fa, {
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
}), o$ = /* @__PURE__ */ me(s$, [["__scopeId", "data-v-1815ac92"]]), i$ = { class: "text-left font-['Inter',system-ui,sans-serif]" }, l$ = {
  key: 0,
  class: ""
}, r$ = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, c$ = { class: "flex min-w-0 flex-1 items-center" }, d$ = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, u$ = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, h$ = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, f$ = /* @__PURE__ */ ce({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = es(), n = C(() => {
      const a = !!t.filters, s = !!t.actions;
      return a && s ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (g(), x("section", i$, [
      a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions ? (g(), x("header", l$, [
        a.$slots.description ? (g(), x("div", r$, [
          we(a.$slots, "description")
        ])) : z("", !0),
        a.$slots.tabs ? (g(), x("div", {
          key: 1,
          class: J(["flex flex-wrap items-center gap-2", a.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", c$, [
            we(a.$slots, "tabs")
          ]),
          a.$slots.actions && !a.$slots.filters ? (g(), x("div", d$, [
            we(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0),
        a.$slots.filters || a.$slots.actions && !a.$slots.tabs ? (g(), x("div", {
          key: 2,
          class: J([
            "flex flex-wrap gap-2 items-center",
            a.$slots.tabs ? "mt-2" : "",
            n.value
          ])
        }, [
          a.$slots.filters ? (g(), x("div", u$, [
            we(a.$slots, "filters")
          ])) : z("", !0),
          a.$slots.actions ? (g(), x("div", h$, [
            we(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0)
      ])) : z("", !0),
      a.$slots.content || a.$slots.default ? (g(), x("div", {
        key: 1,
        class: J({
          "mt-6": a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions
        })
      }, [
        we(a.$slots, "content", {}, () => [
          we(a.$slots, "default")
        ])
      ], 2)) : z("", !0)
    ]));
  }
}), g$ = { class: "flex flex-1 min-h-0" }, m$ = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, p$ = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, b$ = ["aria-current", "data-has-active", "title", "onClick"], v$ = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, y$ = { class: "px-4 py-4 shrink-0" }, x$ = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, _$ = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, k$ = ["data-nav-id", "aria-current", "onClick"], w$ = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, C$ = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, $$ = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, S$ = ["data-nav-id", "aria-current", "onClick"], M$ = { class: "truncate text-[15px]" }, D$ = ["aria-current", "data-has-active", "onClick"], T$ = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, A$ = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, B$ = /* @__PURE__ */ ce({
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
    const n = ie(!1), a = e, s = t, o = wa(), { class: i, ...l } = o, r = ie(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < a.mobileBreakpoint);
    }
    tt(() => {
      c(), window.addEventListener("resize", c);
    }), pt(() => {
      window.removeEventListener("resize", c);
    });
    const d = C(() => {
      const p = a.sections.find((_) => _.id === a.selectedSectionId);
      return p?.items?.length ? p : null;
    });
    function h(p) {
      return a.activePath ? a.activePath === p.path || a.activePath.startsWith(p.path + "/") : !1;
    }
    function m(p) {
      return p.items?.length ? p.items.some(h) : !a.activePath || !p.path ? !1 : a.activePath === p.path || a.activePath.startsWith(p.path + "/");
    }
    function v(p) {
      if (!p.items?.length) {
        s("update:selectedSectionId", null), s("navigate", {
          section: p,
          item: { id: p.id, label: p.label, path: p.path }
        });
        return;
      }
      const _ = a.selectedSectionId === p.id ? null : p.id;
      s("update:selectedSectionId", _);
    }
    function f(p, _) {
      s("navigate", { section: p, item: _ });
    }
    function y() {
      s("update:selectedSectionId", null);
    }
    function b(p, _) {
      f(p, _), y();
    }
    return (p, _) => r.value ? (g(), x("div", Ct({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      O(Te, { name: "ksn-overlay" }, {
        default: B(() => [
          d.value ? (g(), x("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: y
          })) : z("", !0)
        ]),
        _: 1
      }),
      O(Te, { name: "ksn-sheet" }, {
        default: B(() => [
          d.value ? (g(), x("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: Ce({ paddingBottom: a.mobileBarHeight })
          }, [
            _[3] || (_[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", w$, [
              u("p", C$, D(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: y
              }, [..._[2] || (_[2] = [
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
            u("nav", $$, [
              (g(!0), x(oe, null, fe(d.value.items, (k) => (g(), x("button", {
                key: k.id,
                type: "button",
                "data-nav-id": k.id,
                "aria-current": h(k) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => b(d.value, k)
              }, [
                k.icon ? (g(), te(Ft(k.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : z("", !0),
                u("span", M$, D(k.label), 1)
              ], 8, S$))), 128))
            ])
          ], 4)) : z("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: Ce({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (g(!0), x(oe, null, fe(e.sections, (k) => (g(), x("button", {
          key: k.id,
          type: "button",
          "aria-current": e.selectedSectionId === k.id ? "true" : void 0,
          "data-has-active": m(k) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => v(k)
        }, [
          e.selectedSectionId === k.id || m(k) ? (g(), x("span", T$)) : z("", !0),
          k.icon ? (g(), te(Ft(k.icon), {
            key: 1,
            class: "shrink-0",
            style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : z("", !0),
          u("span", A$, D(k.label), 1)
        ], 8, D$))), 128))
      ], 4)
    ], 16)) : (g(), x("aside", Ct({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      u("div", g$, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: Ce({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: _[0] || (_[0] = (k) => n.value = !0),
          onMouseleave: _[1] || (_[1] = (k) => n.value = !1)
        }, [
          p.$slots.logo ? (g(), x("div", m$, [
            we(p.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : z("", !0),
          u("nav", p$, [
            (g(!0), x(oe, null, fe(e.sections, (k) => (g(), x("button", {
              key: k.id,
              type: "button",
              "aria-current": e.selectedSectionId === k.id ? "true" : void 0,
              "data-has-active": m(k) ? "true" : void 0,
              title: k.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => v(k)
            }, [
              k.icon ? (g(), te(Ft(k.icon), {
                key: 0,
                class: "shrink-0",
                style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : z("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: Ce({ fontSize: e.primaryFontSize })
              }, D(k.label), 5)
            ], 8, b$))), 128))
          ]),
          p.$slots.footer ? (g(), x("div", v$, [
            we(p.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : z("", !0)
        ], 36),
        O(Te, { name: "ksn-sub" }, {
          default: B(() => [
            d.value ? (g(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: Ce({ width: e.secondaryWidth })
            }, [
              u("div", y$, [
                u("p", x$, D(d.value.label), 1)
              ]),
              u("nav", _$, [
                (g(!0), x(oe, null, fe(d.value.items, (k) => (g(), x("button", {
                  key: k.id,
                  type: "button",
                  "data-nav-id": k.id,
                  "aria-current": h(k) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => f(d.value, k)
                }, [
                  k.icon ? (g(), te(Ft(k.icon), {
                    key: 0,
                    style: Ce({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : z("", !0),
                  u("span", {
                    class: "truncate",
                    style: Ce({ fontSize: e.secondaryFontSize })
                  }, D(k.label), 5)
                ], 8, k$))), 128))
              ])
            ], 4)) : z("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), L$ = /* @__PURE__ */ me(B$, [["__scopeId", "data-v-e0ccb96c"]]), N$ = {
  install(e) {
    e.component("KiutChartBar", St), e.component("KiutChartLine", yt), e.component("KiutPieChart", Da), e.component("KiutBoxplotChart", yf), e.component("KiutCandlestickChart", ig), e.component("KiutHistogramChart", el), e.component("KiutSankeyChart", qt), e.component("KiutAgentsPerDay", Zm), e.component("KiutBookingManager", Bp), e.component("KiutCheckin", ol), e.component("KiutCheckinContainer", C0), e.component("KiutCheckinMetrics", c0), e.component("KiutCheckinSegments", il), e.component("KiutDisruption", W0), e.component("KiutFAQ", Z0), e.component("KiutMessagesPerAgent", lb), e.component("KiutRecordLocator", Sb), e.component("KiutSalesByChannel", ll), e.component("KiutSeller", rl), e.component("KiutSellerContainer", gv), e.component("KiutTopAgents", kv), e.component("KiutPaymentMethod", jv), e.component("KiutAgentHumanConversations", By), e.component("KiutChannelMetrics", Ny), e.component("KiutTriageCombinations", n1), e.component("KiutSelectLanguage", c1), e.component("KiutGuardrails", x1), e.component("KiutDisruptionNotifier", N1), e.component("KiutTotalConversationsCard", H1), e.component("KiutCsatP95Card", W1), e.component("KiutCsatPulseCard", j1), e.component("KiutCSATContainer", Sx), e.component("KiutAiGeneratedRevenueCard", Mx), e.component("KiutCostCard", Tx), e.component("KiutHumanEscalations", Fx), e.component("KiutHumanEscalationsCard", Ox), e.component("KiutNpsDailyMetrics", ul), e.component("KiutNpsMetrics", hl), e.component("KiutNpsOverviewMetrics", dl), e.component("KiutAWSCost", qx), e.component("KiutCostUsage", o_), e.component("KiutTokenUsage", p_), e.component("KiutConversationCount", M_), e.component("KiutTopAgentsAnalysis", z_), e.component("KiutTopAgentsPie", G_), e.component("KiutDailyCostTrends", ik), e.component("KiutModelUsage", _k), e.component("KiutMessageRoles", Bk), e.component("KiutCostPerConversations", Hk), e.component("Tabs", fl), e.component("Table", o2), e.component("Filters", O2), e.component("InputText", W2), e.component("InputPassword", Q2), e.component("InputTextarea", aw), e.component("InputFile", uw), e.component("InputDateTime", bw), e.component("InputTime", ww), e.component("InputRange", Fw), e.component("InputNumber", Hw), e.component("InputColorPicker", Zw), e.component("Select", ws), e.component("MultiSelect", i5), e.component("Toggle", c5), e.component("InputPhone", b5), e.component("SelectablePills", C5), e.component("SegmentedControl", D5), e.component("DateRangePicker", aC), e.component("DatePickerPresets", TC), e.component("Tag", Xe), e.component("Button", fa), e.component("Modal", o$), e.component("Section", f$), e.component("KiutAppShellNavigation", L$);
  }
};
export {
  qx as AWSCost,
  By as AgentHumanConversations,
  Zm as AgentsPerDay,
  Mx as AiGeneratedRevenueCard,
  L$ as AppShellNavigation,
  Bp as BookingManager,
  yf as BoxplotChart,
  fa as Button,
  Sx as CSATContainer,
  ig as CandlestickChart,
  Ny as ChannelMetrics,
  St as ChartBar,
  yt as ChartLine,
  ol as Checkin,
  C0 as CheckinContainer,
  c0 as CheckinMetrics,
  il as CheckinSegments,
  M_ as ConversationCount,
  Tx as CostCard,
  Hk as CostPerConversations,
  o_ as CostUsage,
  W1 as CsatP95Card,
  j1 as CsatPulseCard,
  ik as DailyCostTrends,
  TC as DatePickerPresets,
  aC as DateRangePicker,
  W0 as Disruption,
  N1 as DisruptionNotifier,
  Z0 as FAQ,
  O2 as Filters,
  x1 as Guardrails,
  el as HistogramChart,
  Fx as HumanEscalations,
  Ox as HumanEscalationsCard,
  Zw as InputColorPicker,
  bw as InputDateTime,
  uw as InputFile,
  Hw as InputNumber,
  Q2 as InputPassword,
  b5 as InputPhone,
  Fw as InputRange,
  W2 as InputText,
  aw as InputTextarea,
  ww as InputTime,
  N$ as KiutUIPlugin,
  Bk as MessageRoles,
  lb as MessagesPerAgent,
  o$ as Modal,
  _k as ModelUsage,
  i5 as MultiSelect,
  ul as NpsDailyMetrics,
  hl as NpsMetrics,
  dl as NpsOverviewMetrics,
  jv as PaymentMethod,
  Da as PieChart,
  Sb as RecordLocator,
  ll as SalesByChannel,
  qt as SankeyChart,
  f$ as Section,
  D5 as SegmentedControl,
  ws as Select,
  c1 as SelectLanguage,
  C5 as SelectablePills,
  rl as Seller,
  gv as SellerContainer,
  o2 as Table,
  fl as Tabs,
  Xe as Tag,
  c5 as Toggle,
  p_ as TokenUsage,
  kv as TopAgents,
  z_ as TopAgentsAnalysis,
  G_ as TopAgentsPie,
  H1 as TotalConversationsCard,
  n1 as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
