import { defineComponent as re, shallowRef as si, h as ze, ref as ae, onMounted as Ze, onUnmounted as lt, watch as Ie, toRaw as Ya, nextTick as je, version as Br, isProxy as ii, computed as C, toRef as Se, openBlock as p, createElementBlock as k, normalizeStyle as we, createVNode as N, unref as R, createElementVNode as u, Fragment as se, renderList as fe, normalizeClass as te, toDisplayString as A, createCommentVNode as z, onBeforeUnmount as ri, createStaticVNode as Mo, useSlots as eo, renderSlot as _e, Transition as ut, withCtx as E, Comment as Lr, createBlock as ee, resolveDynamicComponent as Mt, createTextVNode as Ae, Teleport as un, withDirectives as Ge, withModifiers as Oe, vModelText as Yt, vShow as Xt, createSlots as Do, vModelSelect as li, mergeProps as _t, useAttrs as Ca, withKeys as zn, inject as ci } from "vue";
import * as Ao from "echarts/core";
import { TooltipComponent as Pr, TitleComponent as Rr } from "echarts/components";
import { SankeyChart as Er } from "echarts/charts";
import { CanvasRenderer as Ir } from "echarts/renderers";
import We from "moment";
function Zn(e) {
  return e + 0.5 | 0;
}
const zt = (e, t, n) => Math.max(Math.min(e, n), t);
function Pn(e) {
  return zt(Zn(e * 2.55), 0, 255);
}
function Ut(e) {
  return zt(Zn(e * 255), 0, 255);
}
function Rt(e) {
  return zt(Zn(e / 2.55) / 100, 0, 1);
}
function To(e) {
  return zt(Zn(e * 100), 0, 100);
}
const gt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ua = [..."0123456789ABCDEF"], Fr = (e) => Ua[e & 15], Or = (e) => Ua[(e & 240) >> 4] + Ua[e & 15], Jn = (e) => (e & 240) >> 4 === (e & 15), Vr = (e) => Jn(e.r) && Jn(e.g) && Jn(e.b) && Jn(e.a);
function zr(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & gt[e[1]] * 17,
    g: 255 & gt[e[2]] * 17,
    b: 255 & gt[e[3]] * 17,
    a: t === 5 ? gt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: gt[e[1]] << 4 | gt[e[2]],
    g: gt[e[3]] << 4 | gt[e[4]],
    b: gt[e[5]] << 4 | gt[e[6]],
    a: t === 9 ? gt[e[7]] << 4 | gt[e[8]] : 255
  })), n;
}
const Nr = (e, t) => e < 255 ? t(e) : "";
function jr(e) {
  var t = Vr(e) ? Fr : Or;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Nr(e.a, t) : void 0;
}
const Hr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function di(e, t, n) {
  const a = t * Math.min(n, 1 - n), o = (s, i = (s + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function Wr(e, t, n) {
  const a = (o, s = (o + e / 60) % 6) => n - n * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [a(5), a(3), a(1)];
}
function Kr(e, t, n) {
  const a = di(e, 1, 0.5);
  let o;
  for (t + n > 1 && (o = 1 / (t + n), t *= o, n *= o), o = 0; o < 3; o++)
    a[o] *= 1 - t - n, a[o] += t;
  return a;
}
function Yr(e, t, n, a, o) {
  return e === o ? (t - n) / a + (t < n ? 6 : 0) : t === o ? (n - e) / a + 2 : (e - t) / a + 4;
}
function to(e) {
  const n = e.r / 255, a = e.g / 255, o = e.b / 255, s = Math.max(n, a, o), i = Math.min(n, a, o), r = (s + i) / 2;
  let l, c, d;
  return s !== i && (d = s - i, c = r > 0.5 ? d / (2 - s - i) : d / (s + i), l = Yr(n, a, o, d, s), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function no(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Ut);
}
function ao(e, t, n) {
  return no(di, e, t, n);
}
function Ur(e, t, n) {
  return no(Kr, e, t, n);
}
function qr(e, t, n) {
  return no(Wr, e, t, n);
}
function ui(e) {
  return (e % 360 + 360) % 360;
}
function Xr(e) {
  const t = Hr.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? Pn(+t[5]) : Ut(+t[5]));
  const o = ui(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = Ur(o, s, i) : t[1] === "hsv" ? a = qr(o, s, i) : a = ao(o, s, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function Gr(e, t) {
  var n = to(e);
  n[0] = ui(n[0] + t), n = ao(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Zr(e) {
  if (!e)
    return;
  const t = to(e), n = t[0], a = To(t[1]), o = To(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${o}%, ${Rt(e.a)})` : `hsl(${n}, ${a}%, ${o}%)`;
}
const Bo = {
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
}, Lo = {
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
function Qr() {
  const e = {}, t = Object.keys(Lo), n = Object.keys(Bo);
  let a, o, s, i, r;
  for (a = 0; a < t.length; a++) {
    for (i = r = t[a], o = 0; o < n.length; o++)
      s = n[o], r = r.replace(s, Bo[s]);
    s = parseInt(Lo[i], 16), e[r] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let ea;
function Jr(e) {
  ea || (ea = Qr(), ea.transparent = [0, 0, 0, 0]);
  const t = ea[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const el = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function tl(e) {
  const t = el.exec(e);
  let n = 255, a, o, s;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? Pn(i) : zt(i * 255, 0, 255);
    }
    return a = +t[1], o = +t[3], s = +t[5], a = 255 & (t[2] ? Pn(a) : zt(a, 0, 255)), o = 255 & (t[4] ? Pn(o) : zt(o, 0, 255)), s = 255 & (t[6] ? Pn(s) : zt(s, 0, 255)), {
      r: a,
      g: o,
      b: s,
      a: n
    };
  }
}
function nl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Rt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Ba = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, bn = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function al(e, t, n) {
  const a = bn(Rt(e.r)), o = bn(Rt(e.g)), s = bn(Rt(e.b));
  return {
    r: Ut(Ba(a + n * (bn(Rt(t.r)) - a))),
    g: Ut(Ba(o + n * (bn(Rt(t.g)) - o))),
    b: Ut(Ba(s + n * (bn(Rt(t.b)) - s))),
    a: e.a + n * (t.a - e.a)
  };
}
function ta(e, t, n) {
  if (e) {
    let a = to(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = ao(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function hi(e, t) {
  return e && Object.assign(t || {}, e);
}
function Po(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Ut(e[3]))) : (t = hi(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ut(t.a)), t;
}
function ol(e) {
  return e.charAt(0) === "r" ? tl(e) : Xr(e);
}
class Nn {
  constructor(t) {
    if (t instanceof Nn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = Po(t) : n === "string" && (a = zr(t) || Jr(t) || ol(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = hi(this._rgb);
    return t && (t.a = Rt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Po(t);
  }
  rgbString() {
    return this._valid ? nl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? jr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Zr(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const a = this.rgb, o = t.rgb;
      let s;
      const i = n === s ? 0.5 : n, r = 2 * i - 1, l = a.a - o.a, c = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      s = 1 - c, a.r = 255 & c * a.r + s * o.r + 0.5, a.g = 255 & c * a.g + s * o.g + 0.5, a.b = 255 & c * a.b + s * o.b + 0.5, a.a = i * a.a + (1 - i) * o.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = al(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Nn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ut(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Zn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return ta(this._rgb, 2, t), this;
  }
  darken(t) {
    return ta(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ta(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ta(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Gr(this._rgb, t), this;
  }
}
function Bt() {
}
const sl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Pe(e) {
  return e == null;
}
function qe(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Te(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function mt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Ct(e, t) {
  return mt(e) ? e : t;
}
function $e(e, t) {
  return typeof e > "u" ? t : e;
}
const il = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, fi = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Fe(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function Re(e, t, n, a) {
  let o, s, i;
  if (qe(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(n, e[o], o);
  else if (Te(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(n, e[i[o]], i[o]);
}
function ma(e, t) {
  let n, a, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (o = e[n], s = t[n], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function ba(e) {
  if (qe(e))
    return e.map(ba);
  if (Te(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let o = 0;
    for (; o < a; ++o)
      t[n[o]] = ba(e[n[o]]);
    return t;
  }
  return e;
}
function gi(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function rl(e, t, n, a) {
  if (!gi(e))
    return;
  const o = t[e], s = n[e];
  Te(o) && Te(s) ? jn(o, s, a) : t[e] = ba(s);
}
function jn(e, t, n) {
  const a = qe(t) ? t : [
    t
  ], o = a.length;
  if (!Te(e))
    return e;
  n = n || {};
  const s = n.merger || rl;
  let i;
  for (let r = 0; r < o; ++r) {
    if (i = a[r], !Te(i))
      continue;
    const l = Object.keys(i);
    for (let c = 0, d = l.length; c < d; ++c)
      s(l[c], e, i, n);
  }
  return e;
}
function In(e, t) {
  return jn(e, t, {
    merger: ll
  });
}
function ll(e, t, n) {
  if (!gi(e))
    return;
  const a = t[e], o = n[e];
  Te(a) && Te(o) ? In(a, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = ba(o));
}
const Ro = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function cl(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const o of t)
    a += o, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function dl(e) {
  const t = cl(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function hn(e, t) {
  return (Ro[t] || (Ro[t] = dl(t)))(e);
}
function oo(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Hn = (e) => typeof e < "u", Gt = (e) => typeof e == "function", Eo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function ul(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Ee = Math.PI, He = 2 * Ee, hl = He + Ee, va = Number.POSITIVE_INFINITY, fl = Ee / 180, Xe = Ee / 2, nn = Ee / 4, Io = Ee * 2 / 3, pi = Math.log10, At = Math.sign;
function Fn(e, t, n) {
  return Math.abs(e - t) < n;
}
function Fo(e) {
  const t = Math.round(e);
  e = Fn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(pi(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function gl(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((o, s) => o - s).pop(), t;
}
function pl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Wn(e) {
  return !pl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function ml(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function bl(e, t, n) {
  let a, o, s;
  for (a = 0, o = e.length; a < o; a++)
    s = e[a][n], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function Et(e) {
  return e * (Ee / 180);
}
function vl(e) {
  return e * (180 / Ee);
}
function Oo(e) {
  if (!mt(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function mi(e, t) {
  const n = t.x - e.x, a = t.y - e.y, o = Math.sqrt(n * n + a * a);
  let s = Math.atan2(a, n);
  return s < -0.5 * Ee && (s += He), {
    angle: s,
    distance: o
  };
}
function qa(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function yl(e, t) {
  return (e - t + hl) % He - Ee;
}
function yt(e) {
  return (e % He + He) % He;
}
function Kn(e, t, n, a) {
  const o = yt(e), s = yt(t), i = yt(n), r = yt(s - o), l = yt(i - o), c = yt(o - s), d = yt(o - i);
  return o === s || o === i || a && s === i || r > l && c < d;
}
function et(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function xl(e) {
  return et(e, -32768, 32767);
}
function Nt(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function so(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, o = 0, s;
  for (; a - o > 1; )
    s = o + a >> 1, n(s) ? o = s : a = s;
  return {
    lo: o,
    hi: a
  };
}
const cn = (e, t, n, a) => so(e, n, a ? (o) => {
  const s = e[o][t];
  return s < n || s === n && e[o + 1][t] === n;
} : (o) => e[o][t] < n), _l = (e, t, n) => so(e, n, (a) => e[a][t] >= n);
function kl(e, t, n) {
  let a = 0, o = e.length;
  for (; a < o && e[a] < t; )
    a++;
  for (; o > a && e[o - 1] > n; )
    o--;
  return a > 0 || o < e.length ? e.slice(a, o) : e;
}
const bi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function wl(e, t) {
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
  }), bi.forEach((n) => {
    const a = "_onData" + oo(n), o = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...s) {
        const i = o.apply(this, s);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[a] == "function" && r[a](...s);
        }), i;
      }
    });
  });
}
function Vo(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, o = a.indexOf(t);
  o !== -1 && a.splice(o, 1), !(a.length > 0) && (bi.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function vi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const yi = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function xi(e, t) {
  let n = [], a = !1;
  return function(...o) {
    n = o, a || (a = !0, yi.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function Cl(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const io = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Qe = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, $l = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function Sl(e, t, n) {
  const a = t.length;
  let o = 0, s = a;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: f, minDefined: m, maxDefined: g } = i.getUserBounds();
    if (m) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        cn(l, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : cn(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const v = l.slice(0, o + 1).reverse().findIndex((y) => !Pe(y[r.axis]));
        o -= Math.max(0, v);
      }
      o = et(o, 0, a - 1);
    }
    if (g) {
      let v = Math.max(
        // @ts-expect-error Need to type _parsed
        cn(l, i.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : cn(t, d, i.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const y = l.slice(v - 1).findIndex((b) => !Pe(b[r.axis]));
        v += Math.max(0, y);
      }
      s = et(v, o, a) - o;
    } else
      s = a - o;
  }
  return {
    start: o,
    count: s
  };
}
function Ml(e) {
  const { xScale: t, yScale: n, _scaleRanges: a } = e, o = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!a)
    return e._scaleRanges = o, !0;
  const s = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== n.min || a.ymax !== n.max;
  return Object.assign(a, o), s;
}
const na = (e) => e === 0 || e === 1, zo = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * He / n)), No = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * He / n) + 1, On = {
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
  easeInSine: (e) => -Math.cos(e * Xe) + 1,
  easeOutSine: (e) => Math.sin(e * Xe),
  easeInOutSine: (e) => -0.5 * (Math.cos(Ee * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => na(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => na(e) ? e : zo(e, 0.075, 0.3),
  easeOutElastic: (e) => na(e) ? e : No(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return na(e) ? e : e < 0.5 ? 0.5 * zo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * No(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - On.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? On.easeInBounce(e * 2) * 0.5 : On.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function ro(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function jo(e) {
  return ro(e) ? e : new Nn(e);
}
function La(e) {
  return ro(e) ? e : new Nn(e).saturate(0.5).darken(0.1).hexString();
}
const Dl = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Al = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Tl(e) {
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
      properties: Al
    },
    numbers: {
      type: "number",
      properties: Dl
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
function Bl(e) {
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
const Ho = /* @__PURE__ */ new Map();
function Ll(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = Ho.get(n);
  return a || (a = new Intl.NumberFormat(e, t), Ho.set(n, a)), a;
}
function lo(e, t, n) {
  return Ll(t, n).format(e);
}
const Pl = {
  values(e) {
    return qe(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let o, s = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = Rl(e, n);
    }
    const i = pi(Math.abs(s)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: o,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), lo(e, a, l);
  }
};
function Rl(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var _i = {
  formatters: Pl
};
function El(e) {
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
      callback: _i.formatters.values,
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
const fn = /* @__PURE__ */ Object.create(null), Xa = /* @__PURE__ */ Object.create(null);
function Vn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, o = n.length; a < o; ++a) {
    const s = n[a];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Pa(e, t, n) {
  return typeof t == "string" ? jn(Vn(e, t), n) : jn(Vn(e, ""), t);
}
class Il {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, o) => La(o.backgroundColor), this.hoverBorderColor = (a, o) => La(o.borderColor), this.hoverColor = (a, o) => La(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Pa(this, t, n);
  }
  get(t) {
    return Vn(this, t);
  }
  describe(t, n) {
    return Pa(Xa, t, n);
  }
  override(t, n) {
    return Pa(fn, t, n);
  }
  route(t, n, a, o) {
    const s = Vn(this, t), i = Vn(this, a), r = "_" + n;
    Object.defineProperties(s, {
      [r]: {
        value: s[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const l = this[r], c = i[o];
          return Te(l) ? Object.assign({}, c, l) : $e(l, c);
        },
        set(l) {
          this[r] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var Ke = /* @__PURE__ */ new Il({
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
  Tl,
  Bl,
  El
]);
function Fl(e) {
  return !e || Pe(e.size) || Pe(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Wo(e, t, n, a, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, n.push(o)), s > a && (a = s), a;
}
function an(e, t, n) {
  const a = e.currentDevicePixelRatio, o = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - o) * a) / a + o;
}
function Ko(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ga(e, t, n, a) {
  ki(e, t, n, a, null);
}
function ki(e, t, n, a, o) {
  let s, i, r, l, c, d, h, f;
  const m = t.pointStyle, g = t.rotation, v = t.radius;
  let y = (g || 0) * fl;
  if (m && typeof m == "object" && (s = m.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(y), e.drawImage(m, -m.width / 2, -m.height / 2, m.width, m.height), e.restore();
    return;
  }
  if (!(isNaN(v) || v <= 0)) {
    switch (e.beginPath(), m) {
      // Default includes circle
      default:
        o ? e.ellipse(n, a, o / 2, v, 0, 0, He) : e.arc(n, a, v, 0, He), e.closePath();
        break;
      case "triangle":
        d = o ? o / 2 : v, e.moveTo(n + Math.sin(y) * d, a - Math.cos(y) * v), y += Io, e.lineTo(n + Math.sin(y) * d, a - Math.cos(y) * v), y += Io, e.lineTo(n + Math.sin(y) * d, a - Math.cos(y) * v), e.closePath();
        break;
      case "rectRounded":
        c = v * 0.516, l = v - c, i = Math.cos(y + nn) * l, h = Math.cos(y + nn) * (o ? o / 2 - c : l), r = Math.sin(y + nn) * l, f = Math.sin(y + nn) * (o ? o / 2 - c : l), e.arc(n - h, a - r, c, y - Ee, y - Xe), e.arc(n + f, a - i, c, y - Xe, y), e.arc(n + h, a + r, c, y, y + Xe), e.arc(n - f, a + i, c, y + Xe, y + Ee), e.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * v, d = o ? o / 2 : l, e.rect(n - d, a - l, 2 * d, 2 * l);
          break;
        }
        y += nn;
      /* falls through */
      case "rectRot":
        h = Math.cos(y) * (o ? o / 2 : v), i = Math.cos(y) * v, r = Math.sin(y) * v, f = Math.sin(y) * (o ? o / 2 : v), e.moveTo(n - h, a - r), e.lineTo(n + f, a - i), e.lineTo(n + h, a + r), e.lineTo(n - f, a + i), e.closePath();
        break;
      case "crossRot":
        y += nn;
      /* falls through */
      case "cross":
        h = Math.cos(y) * (o ? o / 2 : v), i = Math.cos(y) * v, r = Math.sin(y) * v, f = Math.sin(y) * (o ? o / 2 : v), e.moveTo(n - h, a - r), e.lineTo(n + h, a + r), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i);
        break;
      case "star":
        h = Math.cos(y) * (o ? o / 2 : v), i = Math.cos(y) * v, r = Math.sin(y) * v, f = Math.sin(y) * (o ? o / 2 : v), e.moveTo(n - h, a - r), e.lineTo(n + h, a + r), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i), y += nn, h = Math.cos(y) * (o ? o / 2 : v), i = Math.cos(y) * v, r = Math.sin(y) * v, f = Math.sin(y) * (o ? o / 2 : v), e.moveTo(n - h, a - r), e.lineTo(n + h, a + r), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(y) * v, r = Math.sin(y) * v, e.moveTo(n - i, a - r), e.lineTo(n + i, a + r);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(y) * (o ? o / 2 : v), a + Math.sin(y) * v);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Yn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function co(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function uo(e) {
  e.restore();
}
function Ol(e, t, n, a, o) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (o === "middle") {
    const s = (t.x + n.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, n.y);
  } else o === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function Vl(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function zl(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Pe(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Nl(e, t, n, a, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(a), i = t - s.actualBoundingBoxLeft, r = t + s.actualBoundingBoxRight, l = n - s.actualBoundingBoxAscent, c = n + s.actualBoundingBoxDescent, d = o.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, d), e.lineTo(r, d), e.stroke();
  }
}
function jl(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Un(e, t, n, a, o, s = {}) {
  const i = qe(t) ? t : [
    t
  ], r = s.strokeWidth > 0 && s.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = o.string, zl(e, s), l = 0; l < i.length; ++l)
    c = i[l], s.backdrop && jl(e, s.backdrop), r && (s.strokeColor && (e.strokeStyle = s.strokeColor), Pe(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, n, a, s.maxWidth)), e.fillText(c, n, a, s.maxWidth), Nl(e, n, a, c, s), a += Number(o.lineHeight);
  e.restore();
}
function ya(e, t) {
  const { x: n, y: a, w: o, h: s, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Ee, Ee, !0), e.lineTo(n, a + s - i.bottomLeft), e.arc(n + i.bottomLeft, a + s - i.bottomLeft, i.bottomLeft, Ee, Xe, !0), e.lineTo(n + o - i.bottomRight, a + s), e.arc(n + o - i.bottomRight, a + s - i.bottomRight, i.bottomRight, Xe, 0, !0), e.lineTo(n + o, a + i.topRight), e.arc(n + o - i.topRight, a + i.topRight, i.topRight, 0, -Xe, !0), e.lineTo(n + i.topLeft, a);
}
const Hl = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Wl = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Kl(e, t) {
  const n = ("" + e).match(Hl);
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
const Yl = (e) => +e || 0;
function ho(e, t) {
  const n = {}, a = Te(t), o = a ? Object.keys(t) : t, s = Te(e) ? a ? (i) => $e(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    n[i] = Yl(s(i));
  return n;
}
function wi(e) {
  return ho(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function xn(e) {
  return ho(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function bt(e) {
  const t = wi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function tt(e, t) {
  e = e || {}, t = t || Ke.font;
  let n = $e(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = $e(e.style, t.style);
  a && !("" + a).match(Wl) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const o = {
    family: $e(e.family, t.family),
    lineHeight: Kl($e(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: $e(e.weight, t.weight),
    string: ""
  };
  return o.string = Fl(o), o;
}
function aa(e, t, n, a) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function Ul(e, t, n) {
  const { min: a, max: o } = e, s = fi(t, (o - a) / 2), i = (r, l) => n && r === 0 ? 0 : r + l;
  return {
    min: i(a, -Math.abs(s)),
    max: i(o, s)
  };
}
function gn(e, t) {
  return Object.assign(Object.create(e), t);
}
function fo(e, t = [
  ""
], n, a, o = () => e[0]) {
  const s = n || e;
  typeof a > "u" && (a = Mi("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: a,
    _getTarget: o,
    override: (r) => fo([
      r,
      ...e
    ], t, s, a)
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
      return $i(r, l, () => tc(l, t, e, r));
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
      return Uo(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Uo(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, c) {
      const d = r._storage || (r._storage = o());
      return r[l] = d[l] = c, delete r._keys, !0;
    }
  });
}
function kn(e, t, n, a) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Ci(e, a),
    setContext: (s) => kn(e, s, n, a),
    override: (s) => kn(e.override(s), t, n, a)
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
      return $i(s, i, () => Xl(s, i, r));
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
function Ci(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: n,
    indexable: a,
    isScriptable: Gt(n) ? n : () => n,
    isIndexable: Gt(a) ? a : () => a
  };
}
const ql = (e, t) => e ? e + oo(t) : t, go = (e, t) => Te(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function $i(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function Xl(e, t, n) {
  const { _proxy: a, _context: o, _subProxy: s, _descriptors: i } = e;
  let r = a[t];
  return Gt(r) && i.isScriptable(t) && (r = Gl(t, r, e, n)), qe(r) && r.length && (r = Zl(t, r, e, i.isIndexable)), go(t, r) && (r = kn(r, o, s && s[t], i)), r;
}
function Gl(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: r } = n;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(s, i || a);
  return r.delete(e), go(e, l) && (l = po(o._scopes, o, e, l)), l;
}
function Zl(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: r } = n;
  if (typeof s.index < "u" && a(e))
    return t[s.index % t.length];
  if (Te(t[0])) {
    const l = t, c = o._scopes.filter((d) => d !== l);
    t = [];
    for (const d of l) {
      const h = po(c, o, e, d);
      t.push(kn(h, s, i && i[e], r));
    }
  }
  return t;
}
function Si(e, t, n) {
  return Gt(e) ? e(t, n) : e;
}
const Ql = (e, t) => e === !0 ? t : typeof e == "string" ? hn(t, e) : void 0;
function Jl(e, t, n, a, o) {
  for (const s of t) {
    const i = Ql(n, s);
    if (i) {
      e.add(i);
      const r = Si(i._fallback, n, o);
      if (typeof r < "u" && r !== n && r !== a)
        return r;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function po(e, t, n, a) {
  const o = t._rootScopes, s = Si(t._fallback, n, a), i = [
    ...e,
    ...o
  ], r = /* @__PURE__ */ new Set();
  r.add(a);
  let l = Yo(r, i, n, s || n, a);
  return l === null || typeof s < "u" && s !== n && (l = Yo(r, i, s, l, a), l === null) ? !1 : fo(Array.from(r), [
    ""
  ], o, s, () => ec(t, n, a));
}
function Yo(e, t, n, a, o) {
  for (; n; )
    n = Jl(e, t, n, a, o);
  return n;
}
function ec(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const o = a[t];
  return qe(o) && Te(n) ? n : o || {};
}
function tc(e, t, n, a) {
  let o;
  for (const s of t)
    if (o = Mi(ql(s, e), n), typeof o < "u")
      return go(e, o) ? po(n, a, e, o) : o;
}
function Mi(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function Uo(e) {
  let t = e._keys;
  return t || (t = e._keys = nc(e._scopes)), t;
}
function nc(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((o) => !o.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const ac = Number.EPSILON || 1e-14, wn = (e, t) => t < e.length && !e[t].skip && e[t], Di = (e) => e === "x" ? "y" : "x";
function oc(e, t, n, a) {
  const o = e.skip ? t : e, s = t, i = n.skip ? t : n, r = qa(s, o), l = qa(i, s);
  let c = r / (r + l), d = l / (r + l);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = a * c, f = a * d;
  return {
    previous: {
      x: s.x - h * (i.x - o.x),
      y: s.y - h * (i.y - o.y)
    },
    next: {
      x: s.x + f * (i.x - o.x),
      y: s.y + f * (i.y - o.y)
    }
  };
}
function sc(e, t, n) {
  const a = e.length;
  let o, s, i, r, l, c = wn(e, 0);
  for (let d = 0; d < a - 1; ++d)
    if (l = c, c = wn(e, d + 1), !(!l || !c)) {
      if (Fn(t[d], 0, ac)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      o = n[d] / t[d], s = n[d + 1] / t[d], r = Math.pow(o, 2) + Math.pow(s, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), n[d] = o * i * t[d], n[d + 1] = s * i * t[d]);
    }
}
function ic(e, t, n = "x") {
  const a = Di(n), o = e.length;
  let s, i, r, l = wn(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = r, r = l, l = wn(e, c + 1), !r)
      continue;
    const d = r[n], h = r[a];
    i && (s = (d - i[n]) / 3, r[`cp1${n}`] = d - s, r[`cp1${a}`] = h - s * t[c]), l && (s = (l[n] - d) / 3, r[`cp2${n}`] = d + s, r[`cp2${a}`] = h + s * t[c]);
  }
}
function rc(e, t = "x") {
  const n = Di(t), a = e.length, o = Array(a).fill(0), s = Array(a);
  let i, r, l, c = wn(e, 0);
  for (i = 0; i < a; ++i)
    if (r = l, l = c, c = wn(e, i + 1), !!l) {
      if (c) {
        const d = c[t] - l[t];
        o[i] = d !== 0 ? (c[n] - l[n]) / d : 0;
      }
      s[i] = r ? c ? At(o[i - 1]) !== At(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  sc(e, o, s), ic(e, s, t);
}
function oa(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function lc(e, t) {
  let n, a, o, s, i, r = Yn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = s, s = r, r = n < a - 1 && Yn(e[n + 1], t), s && (o = e[n], i && (o.cp1x = oa(o.cp1x, t.left, t.right), o.cp1y = oa(o.cp1y, t.top, t.bottom)), r && (o.cp2x = oa(o.cp2x, t.left, t.right), o.cp2y = oa(o.cp2y, t.top, t.bottom)));
}
function cc(e, t, n, a, o) {
  let s, i, r, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    rc(e, o);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      r = e[s], l = oc(c, r, e[Math.min(s + 1, i - (a ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  t.capBezierPoints && lc(e, n);
}
function mo() {
  return typeof window < "u" && typeof document < "u";
}
function bo(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function xa(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const $a = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function dc(e, t) {
  return $a(e).getPropertyValue(t);
}
const uc = [
  "top",
  "right",
  "bottom",
  "left"
];
function dn(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let o = 0; o < 4; o++) {
    const s = uc[o];
    a[s] = parseFloat(e[t + "-" + s + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const hc = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function fc(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: o, offsetY: s } = a;
  let i = !1, r, l;
  if (hc(o, s, e.target))
    r = o, l = s;
  else {
    const c = t.getBoundingClientRect();
    r = a.clientX - c.left, l = a.clientY - c.top, i = !0;
  }
  return {
    x: r,
    y: l,
    box: i
  };
}
function rn(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, o = $a(n), s = o.boxSizing === "border-box", i = dn(o, "padding"), r = dn(o, "border", "width"), { x: l, y: c, box: d } = fc(e, n), h = i.left + (d && r.left), f = i.top + (d && r.top);
  let { width: m, height: g } = t;
  return s && (m -= i.width + r.width, g -= i.height + r.height), {
    x: Math.round((l - h) / m * n.width / a),
    y: Math.round((c - f) / g * n.height / a)
  };
}
function gc(e, t, n) {
  let a, o;
  if (t === void 0 || n === void 0) {
    const s = e && bo(e);
    if (!s)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), r = $a(s), l = dn(r, "border", "width"), c = dn(r, "padding");
      t = i.width - c.width - l.width, n = i.height - c.height - l.height, a = xa(r.maxWidth, s, "clientWidth"), o = xa(r.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || va,
    maxHeight: o || va
  };
}
const jt = (e) => Math.round(e * 10) / 10;
function pc(e, t, n, a) {
  const o = $a(e), s = dn(o, "margin"), i = xa(o.maxWidth, e, "clientWidth") || va, r = xa(o.maxHeight, e, "clientHeight") || va, l = gc(e, t, n);
  let { width: c, height: d } = l;
  if (o.boxSizing === "content-box") {
    const f = dn(o, "border", "width"), m = dn(o, "padding");
    c -= m.width + f.width, d -= m.height + f.height;
  }
  return c = Math.max(0, c - s.width), d = Math.max(0, a ? c / a : d - s.height), c = jt(Math.min(c, i, l.maxWidth)), d = jt(Math.min(d, r, l.maxHeight)), c && !d && (d = jt(c / 2)), (t !== void 0 || n !== void 0) && a && l.height && d > l.height && (d = l.height, c = jt(Math.floor(d * a))), {
    width: c,
    height: d
  };
}
function qo(e, t, n) {
  const a = t || 1, o = jt(e.height * a), s = jt(e.width * a);
  e.height = jt(e.height), e.width = jt(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = a, i.height = o, i.width = s, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const mc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    mo() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Xo(e, t) {
  const n = dc(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function ln(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function bc(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function vc(e, t, n, a) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = ln(e, o, n), r = ln(o, s, n), l = ln(s, t, n), c = ln(i, r, n), d = ln(r, l, n);
  return ln(c, d, n);
}
const yc = function(e, t) {
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
}, xc = function() {
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
function _n(e, t, n) {
  return e ? yc(t, n) : xc();
}
function Ai(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function Ti(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Bi(e) {
  return e === "angle" ? {
    between: Kn,
    compare: yl,
    normalize: yt
  } : {
    between: Nt,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Go({ start: e, end: t, count: n, loop: a, style: o }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: o
  };
}
function _c(e, t, n) {
  const { property: a, start: o, end: s } = n, { between: i, normalize: r } = Bi(a), l = t.length;
  let { start: c, end: d, loop: h } = e, f, m;
  if (h) {
    for (c += l, d += l, f = 0, m = l; f < m && i(r(t[c % l][a]), o, s); ++f)
      c--, d--;
    c %= l, d %= l;
  }
  return d < c && (d += l), {
    start: c,
    end: d,
    loop: h,
    style: e.style
  };
}
function kc(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: o, end: s } = n, i = t.length, { compare: r, between: l, normalize: c } = Bi(a), { start: d, end: h, loop: f, style: m } = _c(e, t, n), g = [];
  let v = !1, y = null, b, _, x;
  const w = () => l(o, x, b) && r(o, x) !== 0, $ = () => r(s, b) === 0 || l(s, x, b), S = () => v || w(), M = () => !v || $();
  for (let V = d, j = d; V <= h; ++V)
    _ = t[V % i], !_.skip && (b = c(_[a]), b !== x && (v = l(b, o, s), y === null && S() && (y = r(b, o) === 0 ? V : j), y !== null && M() && (g.push(Go({
      start: y,
      end: V,
      loop: f,
      count: i,
      style: m
    })), y = null), j = V, x = b));
  return y !== null && g.push(Go({
    start: y,
    end: h,
    loop: f,
    count: i,
    style: m
  })), g;
}
function wc(e, t) {
  const n = [], a = e.segments;
  for (let o = 0; o < a.length; o++) {
    const s = kc(a[o], e.points, t);
    s.length && n.push(...s);
  }
  return n;
}
function Cc(e, t, n, a) {
  let o = 0, s = t - 1;
  if (n && !a)
    for (; o < t && !e[o].skip; )
      o++;
  for (; o < t && e[o].skip; )
    o++;
  for (o %= t, n && (s += o); s > o && e[s % t].skip; )
    s--;
  return s %= t, {
    start: o,
    end: s
  };
}
function $c(e, t, n, a) {
  const o = e.length, s = [];
  let i = t, r = e[t], l;
  for (l = t + 1; l <= n; ++l) {
    const c = e[l % o];
    c.skip || c.stop ? r.skip || (a = !1, s.push({
      start: t % o,
      end: (l - 1) % o,
      loop: a
    }), t = i = c.stop ? l : null) : (i = l, r.skip && (t = l)), r = c;
  }
  return i !== null && s.push({
    start: t % o,
    end: i % o,
    loop: a
  }), s;
}
function Sc(e, t) {
  const n = e.points, a = e.options.spanGaps, o = n.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: r } = Cc(n, o, s, a);
  if (a === !0)
    return Zo(e, [
      {
        start: i,
        end: r,
        loop: s
      }
    ], n, t);
  const l = r < i ? r + o : r, c = !!e._fullLoop && i === 0 && r === o - 1;
  return Zo(e, $c(n, i, l, c), n, t);
}
function Zo(e, t, n, a) {
  return !a || !a.setContext || !n ? t : Mc(e, t, n, a);
}
function Mc(e, t, n, a) {
  const o = e._chart.getContext(), s = Qo(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = n.length, c = [];
  let d = s, h = t[0].start, f = h;
  function m(g, v, y, b) {
    const _ = r ? -1 : 1;
    if (g !== v) {
      for (g += l; n[g % l].skip; )
        g -= _;
      for (; n[v % l].skip; )
        v += _;
      g % l !== v % l && (c.push({
        start: g % l,
        end: v % l,
        loop: y,
        style: b
      }), d = b, h = v % l);
    }
  }
  for (const g of t) {
    h = r ? h : g.start;
    let v = n[h % l], y;
    for (f = h + 1; f <= g.end; f++) {
      const b = n[f % l];
      y = Qo(a.setContext(gn(o, {
        type: "segment",
        p0: v,
        p1: b,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: i
      }))), Dc(y, d) && m(h, f - 1, g.loop, d), v = b, d = y;
    }
    h < f - 1 && m(h, f - 1, g.loop, d);
  }
  return c;
}
function Qo(e) {
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
function Dc(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(o, s) {
    return ro(s) ? (n.includes(s) || n.push(s), n.indexOf(s)) : s;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function sa(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function Ac(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: sa(n, t, "left"),
    right: sa(n, t, "right"),
    top: sa(a, t, "top"),
    bottom: sa(a, t, "bottom")
  } : t;
}
function Tc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = Ac(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class Bc {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, a, o) {
    const s = n.listeners[o], i = n.duration;
    s.forEach((r) => r({
      chart: t,
      initial: n.initial,
      numSteps: i,
      currentStep: Math.min(a - n.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = yi.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, o) => {
      if (!a.running || !a.items.length)
        return;
      const s = a.items;
      let i = s.length - 1, r = !1, l;
      for (; i >= 0; --i)
        l = s[i], l._active ? (l._total > a.duration && (a.duration = l._total), l.tick(t), r = !0) : (s[i] = s[s.length - 1], s.pop());
      r && (o.draw(), this._notify(o, a, t, "progress")), s.length || (a.running = !1, this._notify(o, a, t, "complete"), a.initial = !1), n += s.length;
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
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((a, o) => Math.max(a, o._duration), 0), this._refresh());
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
    let o = a.length - 1;
    for (; o >= 0; --o)
      a[o].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Lt = /* @__PURE__ */ new Bc();
const Jo = "transparent", Lc = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = jo(e || Jo), o = a.valid && jo(t || Jo);
    return o && o.valid ? o.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class Pc {
  constructor(t, n, a, o) {
    const s = n[a];
    o = aa([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = aa([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || Lc[t.type || typeof i], this._easing = On[t.easing] || On.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = a - this._start, i = this._duration - s;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = aa([
        t.to,
        n,
        o,
        t.from
      ]), this._from = aa([
        t.from,
        o,
        n
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const n = t - this._start, a = this._duration, o = this._prop, s = this._from, i = this._loop, r = this._to;
    let l;
    if (this._active = s !== r && (i || n < a), !this._active) {
      this._target[o] = r, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[o] = s;
      return;
    }
    l = n / a % 2, l = i && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[o] = this._fn(s, r, l);
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
    for (let o = 0; o < a.length; o++)
      a[o][n]();
  }
}
class Li {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!Te(t))
      return;
    const n = Object.keys(Ke.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Te(s))
        return;
      const i = {};
      for (const r of n)
        i[r] = s[r];
      (qe(s.properties) && s.properties || [
        o
      ]).forEach((r) => {
        (r === o || !a.has(r)) && a.set(r, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, o = Ec(t, a);
    if (!o)
      return [];
    const s = this._createAnimations(o, a);
    return a.$shared && Rc(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), s;
  }
  _createAnimations(t, n) {
    const a = this._properties, o = [], s = t.$animations || (t.$animations = {}), i = Object.keys(n), r = Date.now();
    let l;
    for (l = i.length - 1; l >= 0; --l) {
      const c = i[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        o.push(...this._animateOptions(t, n));
        continue;
      }
      const d = n[c];
      let h = s[c];
      const f = a.get(c);
      if (h)
        if (f && h.active()) {
          h.update(f, d, r);
          continue;
        } else
          h.cancel();
      if (!f || !f.duration) {
        t[c] = d;
        continue;
      }
      s[c] = h = new Pc(f, t, c, d), o.push(h);
    }
    return o;
  }
  update(t, n) {
    if (this._properties.size === 0) {
      Object.assign(t, n);
      return;
    }
    const a = this._createAnimations(t, n);
    if (a.length)
      return Lt.add(this._chart, a), !0;
  }
}
function Rc(e, t) {
  const n = [], a = Object.keys(t);
  for (let o = 0; o < a.length; o++) {
    const s = e[a[o]];
    s && s.active() && n.push(s.wait());
  }
  return Promise.all(n);
}
function Ec(e, t) {
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
function es(e, t) {
  const n = e && e.options || {}, a = n.reverse, o = n.min === void 0 ? t : 0, s = n.max === void 0 ? t : 0;
  return {
    start: a ? s : o,
    end: a ? o : s
  };
}
function Ic(e, t, n) {
  if (n === !1)
    return !1;
  const a = es(e, n), o = es(t, n);
  return {
    top: o.end,
    right: a.end,
    bottom: o.start,
    left: a.start
  };
}
function Fc(e) {
  let t, n, a, o;
  return Te(e) ? (t = e.top, n = e.right, a = e.bottom, o = e.left) : t = n = a = o = e, {
    top: t,
    right: n,
    bottom: a,
    left: o,
    disabled: e === !1
  };
}
function Pi(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = a.length; o < s; ++o)
    n.push(a[o].index);
  return n;
}
function ts(e, t, n, a = {}) {
  const o = e.keys, s = a.mode === "single";
  let i, r, l, c;
  if (t === null)
    return;
  let d = !1;
  for (i = 0, r = o.length; i < r; ++i) {
    if (l = +o[i], l === n) {
      if (d = !0, a.all)
        continue;
      break;
    }
    c = e.values[l], mt(c) && (s || t === 0 || At(t) === At(c)) && (t += c);
  }
  return !d && !a.all ? 0 : t;
}
function Oc(e, t) {
  const { iScale: n, vScale: a } = t, o = n.axis === "x" ? "x" : "y", s = a.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, c, d;
  for (l = 0, c = i.length; l < c; ++l)
    d = i[l], r[l] = {
      [o]: d,
      [s]: e[d]
    };
  return r;
}
function Ra(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function Vc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function zc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: o } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: o ? n : Number.POSITIVE_INFINITY
  };
}
function Nc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function ns(e, t, n, a) {
  for (const o of t.getMatchingVisibleMetas(a).reverse()) {
    const s = e[o.index];
    if (n && s > 0 || !n && s < 0)
      return o.index;
  }
  return null;
}
function as(e, t) {
  const { chart: n, _cachedMeta: a } = e, o = n._stacks || (n._stacks = {}), { iScale: s, vScale: i, index: r } = a, l = s.axis, c = i.axis, d = Vc(s, i, a), h = t.length;
  let f;
  for (let m = 0; m < h; ++m) {
    const g = t[m], { [l]: v, [c]: y } = g, b = g._stacks || (g._stacks = {});
    f = b[c] = Nc(o, d, v), f[r] = y, f._top = ns(f, i, !0, a.type), f._bottom = ns(f, i, !1, a.type);
    const _ = f._visualValues || (f._visualValues = {});
    _[r] = y;
  }
}
function Ea(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function jc(e, t) {
  return gn(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Hc(e, t, n) {
  return gn(e, {
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
function $n(e, t) {
  const n = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const o of t) {
      const s = o._stacks;
      if (!s || s[a] === void 0 || s[a][n] === void 0)
        return;
      delete s[a][n], s[a]._visualValues !== void 0 && s[a]._visualValues[n] !== void 0 && delete s[a]._visualValues[n];
    }
  }
}
const Ia = (e) => e === "reset" || e === "none", os = (e, t) => t ? e : Object.assign({}, e), Wc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: Pi(n, !0),
  values: null
};
class Sa {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Ra(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && $n(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), o = (h, f, m, g) => h === "x" ? f : h === "r" ? g : m, s = n.xAxisID = $e(a.xAxisID, Ea(t, "x")), i = n.yAxisID = $e(a.yAxisID, Ea(t, "y")), r = n.rAxisID = $e(a.rAxisID, Ea(t, "r")), l = n.indexAxis, c = n.iAxisID = o(l, s, i, r), d = n.vAxisID = o(l, i, s, r);
    n.xScale = this.getScaleForId(s), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(r), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(d);
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
    this._data && Vo(this._data, this), t._stacked && $n(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (Te(n)) {
      const o = this._cachedMeta;
      this._data = Oc(n, o);
    } else if (a !== n) {
      if (a) {
        Vo(a, this);
        const o = this._cachedMeta;
        $n(o), o._parsed = [];
      }
      n && Object.isExtensible(n) && wl(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const n = this._cachedMeta, a = this.getDataset();
    let o = !1;
    this._dataCheck();
    const s = n._stacked;
    n._stacked = Ra(n.vScale, n), n.stack !== a.stack && (o = !0, $n(n), n.stack = a.stack), this._resyncElements(t), (o || s !== n._stacked) && (as(this, n._parsed), n._stacked = Ra(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: o } = this, { iScale: s, _stacked: i } = a, r = s.axis;
    let l = t === 0 && n === o.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], d, h, f;
    if (this._parsing === !1)
      a._parsed = o, a._sorted = !0, f = o;
    else {
      qe(o[t]) ? f = this.parseArrayData(a, o, t, n) : Te(o[t]) ? f = this.parseObjectData(a, o, t, n) : f = this.parsePrimitiveData(a, o, t, n);
      const m = () => h[r] === null || c && h[r] < c[r];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = f[d], l && (m() && (l = !1), c = h);
      a._sorted = l;
    }
    i && as(this, f);
  }
  parsePrimitiveData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, r = s.axis, l = i.axis, c = s.getLabels(), d = s === i, h = new Array(o);
    let f, m, g;
    for (f = 0, m = o; f < m; ++f)
      g = f + a, h[f] = {
        [r]: d || s.parse(c[g], g),
        [l]: i.parse(n[g], g)
      };
    return h;
  }
  parseArrayData(t, n, a, o) {
    const { xScale: s, yScale: i } = t, r = new Array(o);
    let l, c, d, h;
    for (l = 0, c = o; l < c; ++l)
      d = l + a, h = n[d], r[l] = {
        x: s.parse(h[0], d),
        y: i.parse(h[1], d)
      };
    return r;
  }
  parseObjectData(t, n, a, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(o);
    let d, h, f, m;
    for (d = 0, h = o; d < h; ++d)
      f = d + a, m = n[f], c[d] = {
        x: s.parse(hn(m, r), f),
        y: i.parse(hn(m, l), f)
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
    const o = this.chart, s = this._cachedMeta, i = n[t.axis], r = {
      keys: Pi(o, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return ts(r, i, s.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, o) {
    const s = a[n.axis];
    let i = s === null ? NaN : s;
    const r = o && a._stacks[n.axis];
    o && r && (o.values = r, i = ts(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, o = a._parsed, s = a._sorted && t === a.iScale, i = o.length, r = this._getOtherScale(t), l = Wc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = zc(r);
    let f, m;
    function g() {
      m = o[f];
      const v = m[r.axis];
      return !mt(m[t.axis]) || d > v || h < v;
    }
    for (f = 0; f < i && !(!g() && (this.updateRangeFromParsed(c, t, m, l), s)); ++f)
      ;
    if (s) {
      for (f = i - 1; f >= 0; --f)
        if (!g()) {
          this.updateRangeFromParsed(c, t, m, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let o, s, i;
    for (o = 0, s = n.length; o < s; ++o)
      i = n[o][t.axis], mt(i) && a.push(i);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = n.iScale, o = n.vScale, s = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(s[a.axis]) : "",
      value: o ? "" + o.getLabelForValue(s[o.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = Fc($e(this.options.clip, Ic(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, o = a.data || [], s = n.chartArea, i = [], r = this._drawStart || 0, l = this._drawCount || o.length - r, c = this.options.drawActiveElementsOnTop;
    let d;
    for (a.dataset && a.dataset.draw(t, s, r, l), d = r; d < r + l; ++d) {
      const h = o[d];
      h.hidden || (h.active && c ? i.push(h) : h.draw(t, s));
    }
    for (d = 0; d < i.length; ++d)
      i[d].draw(t, s);
  }
  getStyle(t, n) {
    const a = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, n, a) {
    const o = this.getDataset();
    let s;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      s = i.$context || (i.$context = Hc(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = jc(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!n, s.mode = a, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const o = n === "active", s = this._cachedDataOpts, i = t + "-" + n, r = s[i], l = this.enableOptionSharing && Hn(a);
    if (r)
      return os(r, l);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = c.getOptionScopes(this.getDataset(), d), m = Object.keys(Ke.elements[t]), g = () => this.getContext(a, o, n), v = c.resolveNamedOptions(f, m, g, h);
    return v.$shared && (v.$shared = l, s[i] = Object.freeze(os(v, l))), v;
  }
  _resolveAnimations(t, n, a) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${n}`, r = s[i];
    if (r)
      return r;
    let l;
    if (o.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), f = d.getOptionScopes(this.getDataset(), h);
      l = d.createResolver(f, this.getContext(t, a, n));
    }
    const c = new Li(o, l && l.animations);
    return l && l._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Ia(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), o = this._sharedOptions, s = this.getSharedOptions(a), i = this.includeOptions(n, s) || s !== o;
    return this.updateSharedOptions(s, n, a), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, n, a, o) {
    Ia(o) ? Object.assign(t, a) : this._resolveAnimations(n, o).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !Ia(n) && this._resolveAnimations(void 0, n).update(t, a);
  }
  _setStyle(t, n, a, o) {
    t.active = o;
    const s = this.getStyle(n, o);
    this._resolveAnimations(n, a, o).update(t, {
      options: !o && this.getSharedOptions(s) || s
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
    for (const [r, l, c] of this._syncList)
      this[r](l, c);
    this._syncList = [];
    const o = a.length, s = n.length, i = Math.min(s, o);
    i && this.parse(0, i), s > o ? this._insertElements(o, s - o, t) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(t, n, a = !0) {
    const o = this._cachedMeta, s = o.data, i = t + n;
    let r;
    const l = (c) => {
      for (c.length += n, r = c.length - 1; r >= i; r--)
        c[r] = c[r - n];
    };
    for (l(s), r = t; r < i; ++r)
      s[r] = new this.dataElementType();
    this._parsing && l(o._parsed), this.parse(t, n), a && this.updateElements(s, t, n, "reset");
  }
  updateElements(t, n, a, o) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const o = a._parsed.splice(t, n);
      a._stacked && $n(a, o);
    }
    a.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, a, o] = t;
      this[n](a, o);
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
function Kc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let o = 0, s = n.length; o < s; o++)
      a = a.concat(n[o].controller.getAllParsedValues(e));
    e._cache.$bar = vi(a.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function Yc(e) {
  const t = e.iScale, n = Kc(t, e.type);
  let a = t._length, o, s, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (Hn(r) && (a = Math.min(a, Math.abs(i - r) || a)), r = i);
  };
  for (o = 0, s = n.length; o < s; ++o)
    i = t.getPixelForValue(n[o]), l();
  for (r = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), l();
  return a;
}
function Uc(e, t, n, a) {
  const o = n.barThickness;
  let s, i;
  return Pe(o) ? (s = t.min * n.categoryPercentage, i = n.barPercentage) : (s = o * a, i = 1), {
    chunk: s / a,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function qc(e, t, n, a) {
  const o = t.pixels, s = o[e];
  let i = e > 0 ? o[e - 1] : null, r = e < o.length - 1 ? o[e + 1] : null;
  const l = n.categoryPercentage;
  i === null && (i = s - (r === null ? t.end - t.start : r - s)), r === null && (r = s + s - i);
  const c = s - (s - Math.min(i, r)) / 2 * l;
  return {
    chunk: Math.abs(r - i) / 2 * l / a,
    ratio: n.barPercentage,
    start: c
  };
}
function Xc(e, t, n, a) {
  const o = n.parse(e[0], a), s = n.parse(e[1], a), i = Math.min(o, s), r = Math.max(o, s);
  let l = i, c = r;
  Math.abs(i) > Math.abs(r) && (l = r, c = i), t[n.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: o,
    end: s,
    min: i,
    max: r
  };
}
function Ri(e, t, n, a) {
  return qe(e) ? Xc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function ss(e, t, n, a) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), r = o === s, l = [];
  let c, d, h, f;
  for (c = n, d = n + a; c < d; ++c)
    f = t[c], h = {}, h[o.axis] = r || o.parse(i[c], c), l.push(Ri(f, h, s, c));
  return l;
}
function Fa(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Gc(e, t, n) {
  return e !== 0 ? At(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Zc(e) {
  let t, n, a, o, s;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: o,
    bottom: s
  };
}
function Qc(e, t, n, a) {
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
  const { start: i, end: r, reverse: l, top: c, bottom: d } = Zc(e);
  o === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? o = c : (n._bottom || 0) === a ? o = d : (s[is(d, i, r, l)] = !0, o = c)), s[is(o, i, r, l)] = !0, e.borderSkipped = s;
}
function is(e, t, n, a) {
  return a ? (e = Jc(e, t, n), e = rs(e, n, t)) : e = rs(e, t, n), e;
}
function Jc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function rs(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function ed(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class td extends Sa {
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
  parsePrimitiveData(t, n, a, o) {
    return ss(t, n, a, o);
  }
  parseArrayData(t, n, a, o) {
    return ss(t, n, a, o);
  }
  parseObjectData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = s.axis === "x" ? r : l, d = i.axis === "x" ? r : l, h = [];
    let f, m, g, v;
    for (f = a, m = a + o; f < m; ++f)
      v = n[f], g = {}, g[s.axis] = s.parse(hn(v, c), f), h.push(Ri(hn(v, d), g, i, f));
    return h;
  }
  updateRangeFromParsed(t, n, a, o) {
    super.updateRangeFromParsed(t, n, a, o);
    const s = a._custom;
    s && n === this._cachedMeta.vScale && (t.min = Math.min(t.min, s.min), t.max = Math.max(t.max, s.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { iScale: a, vScale: o } = n, s = this.getParsed(t), i = s._custom, r = Fa(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
    return {
      label: "" + a.getLabelForValue(s[a.axis]),
      value: r
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
  updateElements(t, n, a, o) {
    const s = o === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: f } = this._getSharedOptions(n, o);
    for (let m = n; m < n + a; m++) {
      const g = this.getParsed(m), v = s || Pe(g[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(m), y = this._calculateBarIndexPixels(m, d), b = (g._stacks || {})[r.axis], _ = {
        horizontal: c,
        base: v.base,
        enableBorderRadius: !b || Fa(g._custom) || i === b._top || i === b._bottom,
        x: c ? v.head : y.center,
        y: c ? y.center : v.head,
        height: c ? y.size : Math.abs(v.size),
        width: c ? Math.abs(v.size) : y.size
      };
      f && (_.options = h || this.resolveDataElementOptions(m, t[m].active ? "active" : o));
      const x = _.options || t[m].options;
      Qc(_, x, b, i), ed(_, x, d.ratio), this.updateElement(t[m], m, _, o);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, o = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), s = a.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(n), l = r && r[a.axis], c = (d) => {
      const h = d._parsed.find((m) => m[a.axis] === l), f = h && h[d.vScale.axis];
      if (Pe(f) || isNaN(f))
        return !0;
    };
    for (const d of o)
      if (!(n !== void 0 && c(d)) && ((s === !1 || i.indexOf(d.stack) === -1 || s === void 0 && d.stack === void 0) && i.push(d.stack), d.index === t))
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
      t[$e(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, n, a) {
    const o = this._getStacks(t, a), s = n !== void 0 ? o.indexOf(n) : -1;
    return s === -1 ? o.length - 1 : s;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, a = n.iScale, o = [];
    let s, i;
    for (s = 0, i = n.data.length; s < i; ++s)
      o.push(a.getPixelForValue(this.getParsed(s)[a.axis], s));
    const r = t.barThickness;
    return {
      min: r || Yc(n),
      pixels: o,
      start: a._startPixel,
      end: a._endPixel,
      stackCount: this._getStackCount(),
      scale: a,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: a, index: o }, options: { base: s, minBarLength: i } } = this, r = s || 0, l = this.getParsed(t), c = l._custom, d = Fa(c);
    let h = l[n.axis], f = 0, m = a ? this.applyStack(n, l, a) : h, g, v;
    m !== h && (f = m - h, m = h), d && (h = c.barStart, m = c.barEnd - c.barStart, h !== 0 && At(h) !== At(c.barEnd) && (f = 0), f += h);
    const y = !Pe(s) && !d ? s : f;
    let b = n.getPixelForValue(y);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(f + m) : g = b, v = g - b, Math.abs(v) < i) {
      v = Gc(v, n, r) * i, h === r && (b -= v / 2);
      const _ = n.getPixelForDecimal(0), x = n.getPixelForDecimal(1), w = Math.min(_, x), $ = Math.max(_, x);
      b = Math.max(Math.min(b, $), w), g = b + v, a && !d && (l._stacks[n.axis]._visualValues[o] = n.getValueForPixel(g) - n.getValueForPixel(b));
    }
    if (b === n.getPixelForValue(r)) {
      const _ = At(v) * n.getLineWidthForValue(r) / 2;
      b += _, v -= _;
    }
    return {
      size: v,
      base: b,
      head: g,
      center: g + v / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, o = this.options, s = o.skipNull, i = $e(o.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = s ? this._getStackCount(t) : n.stackCount, h = o.barThickness === "flex" ? qc(t, n, o, d * c) : Uc(t, n, o, d * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, m = this._getAxis().indexOf($e(f, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + m;
      r = h.start + h.chunk * g + h.chunk / 2, l = Math.min(i, h.chunk * h.ratio);
    } else
      r = a.getPixelForValue(this.getParsed(t)[a.axis], t), l = Math.min(i, n.min * n.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, a = t.data, o = a.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[n.axis] !== null && !a[s].hidden && a[s].draw(this._ctx);
  }
}
function nd(e, t, n) {
  let a = 1, o = 1, s = 0, i = 0;
  if (t < He) {
    const r = e, l = r + t, c = Math.cos(r), d = Math.sin(r), h = Math.cos(l), f = Math.sin(l), m = (x, w, $) => Kn(x, r, l, !0) ? 1 : Math.max(w, w * n, $, $ * n), g = (x, w, $) => Kn(x, r, l, !0) ? -1 : Math.min(w, w * n, $, $ * n), v = m(0, c, h), y = m(Xe, d, f), b = g(Ee, c, h), _ = g(Ee + Xe, d, f);
    a = (v - b) / 2, o = (y - _) / 2, s = -(v + b) / 2, i = -(y + _) / 2;
  }
  return {
    ratioX: a,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class ad extends Sa {
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
            const n = t.data, { labels: { pointStyle: a, textAlign: o, color: s, useBorderRadius: i, borderRadius: r } } = t.legend.options;
            return n.labels.length && n.datasets.length ? n.labels.map((l, c) => {
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
                pointStyle: a,
                borderRadius: i && (r || h.borderRadius),
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
    const a = this.getDataset().data, o = this._cachedMeta;
    if (this._parsing === !1)
      o._parsed = a;
    else {
      let s = (l) => +a[l];
      if (Te(a[t])) {
        const { key: l = "value" } = this._parsing;
        s = (c) => +hn(a[c], l);
      }
      let i, r;
      for (i = t, r = t + n; i < r; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return Et(this.options.rotation - 90);
  }
  _getCircumference() {
    return Et(this.options.circumference);
  }
  _getRotationExtents() {
    let t = He, n = -He;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const o = this.chart.getDatasetMeta(a).controller, s = o._getRotation(), i = o._getCircumference();
        t = Math.min(t, s), n = Math.max(n, s + i);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: a } = n, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, r = Math.max((Math.min(a.width, a.height) - i) / 2, 0), l = Math.min(il(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: m, offsetX: g, offsetY: v } = nd(h, d, l), y = (a.width - i) / f, b = (a.height - i) / m, _ = Math.max(Math.min(y, b) / 2, 0), x = fi(this.options.radius, _), w = Math.max(x * l, 0), $ = (x - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * x, this.offsetY = v * x, o.total = this.calculateTotal(), this.outerRadius = x - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, n) {
    const a = this.options, o = this._cachedMeta, s = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / He);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", i = this.chart, r = i.chartArea, c = i.options.animation, d = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, f = s && c.animateScale, m = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, { sharedOptions: v, includeOptions: y } = this._getSharedOptions(n, o);
    let b = this._getRotation(), _;
    for (_ = 0; _ < n; ++_)
      b += this._circumference(_, s);
    for (_ = n; _ < n + a; ++_) {
      const x = this._circumference(_, s), w = t[_], $ = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: b,
        endAngle: b + x,
        circumference: x,
        outerRadius: g,
        innerRadius: m
      };
      y && ($.options = v || this.resolveDataElementOptions(_, w.active ? "active" : o)), b += x, this.updateElement(w, _, $, o);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, n = t.data;
    let a = 0, o;
    for (o = 0; o < n.length; o++) {
      const s = t._parsed[o];
      s !== null && !isNaN(s) && this.chart.getDataVisibility(o) && !n[o].hidden && (a += Math.abs(s));
    }
    return a;
  }
  calculateCircumference(t) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(t) ? He * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, o = a.data.labels || [], s = lo(n._parsed[t], a.options.locale);
    return {
      label: o[t] || "",
      value: s
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let o, s, i, r, l;
    if (!t) {
      for (o = 0, s = a.data.datasets.length; o < s; ++o)
        if (a.isDatasetVisible(o)) {
          i = a.getDatasetMeta(o), t = i.data, r = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (o = 0, s = t.length; o < s; ++o)
      l = r.resolveDataElementOptions(o), l.borderAlign !== "inner" && (n = Math.max(n, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(t) {
    let n = 0;
    for (let a = 0, o = t.length; a < o; ++a) {
      const s = this.resolveDataElementOptions(a);
      n = Math.max(n, s.offset || 0, s.hoverOffset || 0);
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
    return Math.max($e(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class od extends Sa {
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
    const n = this._cachedMeta, { dataset: a, data: o = [], _dataset: s } = n, i = this.chart._animationsDisabled;
    let { start: r, count: l } = Sl(n, o, i);
    this._drawStart = r, this._drawCount = l, Ml(n) && (r = 0, l = o.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!s._decimated, a.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, r, l, t);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, o), f = i.axis, m = r.axis, { spanGaps: g, segment: v } = this.options, y = Wn(g) ? g : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || s || o === "none", _ = n + a, x = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let $ = 0; $ < x; ++$) {
      const S = t[$], M = b ? S : {};
      if ($ < n || $ >= _) {
        M.skip = !0;
        continue;
      }
      const V = this.getParsed($), j = Pe(V[m]), B = M[f] = i.getPixelForValue(V[f], $), T = M[m] = s || j ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, V, l) : V[m], $);
      M.skip = isNaN(B) || isNaN(T) || j, M.stop = $ > 0 && Math.abs(V[f] - w[f]) > y, v && (M.parsed = V, M.raw = c.data[$]), h && (M.options = d || this.resolveDataElementOptions($, S.active ? "active" : o)), b || this.updateElement(S, $, M, o), w = V;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, a = n.options && n.options.borderWidth || 0, o = t.data || [];
    if (!o.length)
      return a;
    const s = o[0].size(this.resolveDataElementOptions(0)), i = o[o.length - 1].size(this.resolveDataElementOptions(o.length - 1));
    return Math.max(a, s, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class sd extends ad {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function on() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class vo {
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
    Object.assign(vo.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return on();
  }
  parse() {
    return on();
  }
  format() {
    return on();
  }
  add() {
    return on();
  }
  diff() {
    return on();
  }
  startOf() {
    return on();
  }
  endOf() {
    return on();
  }
}
var id = {
  _date: vo
};
function rd(e, t, n, a) {
  const { controller: o, data: s, _sorted: i } = e, r = o._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && s.length) {
    const c = r._reversePixels ? _l : cn;
    if (a) {
      if (o._sharedOptions) {
        const d = s[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const f = c(s, t, n - h), m = c(s, t, n + h);
          return {
            lo: f.lo,
            hi: m.hi
          };
        }
      }
    } else {
      const d = c(s, t, n);
      if (l) {
        const { vScale: h } = o._cachedMeta, { _parsed: f } = e, m = f.slice(0, d.lo + 1).reverse().findIndex((v) => !Pe(v[h.axis]));
        d.lo -= Math.max(0, m);
        const g = f.slice(d.hi).findIndex((v) => !Pe(v[h.axis]));
        d.hi += Math.max(0, g);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function Ma(e, t, n, a, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let r = 0, l = s.length; r < l; ++r) {
    const { index: c, data: d } = s[r], { lo: h, hi: f } = rd(s[r], t, i, o);
    for (let m = h; m <= f; ++m) {
      const g = d[m];
      g.skip || a(g, c, m);
    }
  }
}
function ld(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, o) {
    const s = t ? Math.abs(a.x - o.x) : 0, i = n ? Math.abs(a.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function Oa(e, t, n, a, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || Ma(e, n, t, function(r, l, c) {
    !o && !Yn(r, e.chartArea, 0) || r.inRange(t.x, t.y, a) && s.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), s;
}
function cd(e, t, n, a) {
  let o = [];
  function s(i, r, l) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = mi(i, {
      x: t.x,
      y: t.y
    });
    Kn(h, c, d) && o.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return Ma(e, n, t, s), o;
}
function dd(e, t, n, a, o, s) {
  let i = [];
  const r = ld(n);
  let l = Number.POSITIVE_INFINITY;
  function c(d, h, f) {
    const m = d.inRange(t.x, t.y, o);
    if (a && !m)
      return;
    const g = d.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(g)) && !m)
      return;
    const y = r(t, g);
    y < l ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: f
      }
    ], l = y) : y === l && i.push({
      element: d,
      datasetIndex: h,
      index: f
    });
  }
  return Ma(e, n, t, c), i;
}
function Va(e, t, n, a, o, s) {
  return !s && !e.isPointInArea(t) ? [] : n === "r" && !a ? cd(e, t, n, o) : dd(e, t, n, a, o, s);
}
function ls(e, t, n, a, o) {
  const s = [], i = n === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Ma(e, n, t, (l, c, d) => {
    l[i] && l[i](t[n], o) && (s.push({
      element: l,
      datasetIndex: c,
      index: d
    }), r = r || l.inRange(t.x, t.y, o));
  }), a && !r ? [] : s;
}
var ud = {
  modes: {
    index(e, t, n, a) {
      const o = rn(t, e), s = n.axis || "x", i = n.includeInvisible || !1, r = n.intersect ? Oa(e, o, s, a, i) : Va(e, o, s, !1, a, i), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const d = r[0].index, h = c.data[d];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: c.index,
          index: d
        });
      }), l) : [];
    },
    dataset(e, t, n, a) {
      const o = rn(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      let r = n.intersect ? Oa(e, o, s, a, i) : Va(e, o, s, !1, a, i);
      if (r.length > 0) {
        const l = r[0].datasetIndex, c = e.getDatasetMeta(l).data;
        r = [];
        for (let d = 0; d < c.length; ++d)
          r.push({
            element: c[d],
            datasetIndex: l,
            index: d
          });
      }
      return r;
    },
    point(e, t, n, a) {
      const o = rn(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return Oa(e, o, s, a, i);
    },
    nearest(e, t, n, a) {
      const o = rn(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return Va(e, o, s, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const o = rn(t, e);
      return ls(e, o, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const o = rn(t, e);
      return ls(e, o, "y", n.intersect, a);
    }
  }
};
const Ei = [
  "left",
  "top",
  "right",
  "bottom"
];
function Sn(e, t) {
  return e.filter((n) => n.pos === t);
}
function cs(e, t) {
  return e.filter((n) => Ei.indexOf(n.pos) === -1 && n.box.axis === t);
}
function Mn(e, t) {
  return e.sort((n, a) => {
    const o = t ? a : n, s = t ? n : a;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function hd(e) {
  const t = [];
  let n, a, o, s, i, r;
  for (n = 0, a = (e || []).length; n < a; ++n)
    o = e[n], { position: s, options: { stack: i, stackWeight: r = 1 } } = o, t.push({
      index: n,
      box: o,
      pos: s,
      horizontal: o.isHorizontal(),
      weight: o.weight,
      stack: i && s + i,
      stackWeight: r
    });
  return t;
}
function fd(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: o, stackWeight: s } = n;
    if (!a || !Ei.includes(o))
      continue;
    const i = t[a] || (t[a] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += s;
  }
  return t;
}
function gd(e, t) {
  const n = fd(e), { vBoxMaxWidth: a, hBoxMaxHeight: o } = t;
  let s, i, r;
  for (s = 0, i = e.length; s < i; ++s) {
    r = e[s];
    const { fullSize: l } = r.box, c = n[r.stack], d = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = d ? d * a : l && t.availableWidth, r.height = o) : (r.width = a, r.height = d ? d * o : l && t.availableHeight);
  }
  return n;
}
function pd(e) {
  const t = hd(e), n = Mn(t.filter((c) => c.box.fullSize), !0), a = Mn(Sn(t, "left"), !0), o = Mn(Sn(t, "right")), s = Mn(Sn(t, "top"), !0), i = Mn(Sn(t, "bottom")), r = cs(t, "x"), l = cs(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(s),
    rightAndBottom: o.concat(l).concat(i).concat(r),
    chartArea: Sn(t, "chartArea"),
    vertical: a.concat(o).concat(l),
    horizontal: s.concat(i).concat(r)
  };
}
function ds(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function Ii(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function md(e, t, n, a) {
  const { pos: o, box: s } = n, i = e.maxPadding;
  if (!Te(o)) {
    n.size && (e[o] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? s.height : s.width), n.size = h.size / h.count, e[o] += n.size;
  }
  s.getPadding && Ii(i, s.getPadding());
  const r = Math.max(0, t.outerWidth - ds(i, e, "left", "right")), l = Math.max(0, t.outerHeight - ds(i, e, "top", "bottom")), c = r !== e.w, d = l !== e.h;
  return e.w = r, e.h = l, n.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function bd(e) {
  const t = e.maxPadding;
  function n(a) {
    const o = Math.max(t[a] - e[a], 0);
    return e[a] += o, o;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function vd(e, t) {
  const n = t.maxPadding;
  function a(o) {
    const s = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return o.forEach((i) => {
      s[i] = Math.max(t[i], n[i]);
    }), s;
  }
  return a(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function Rn(e, t, n, a) {
  const o = [];
  let s, i, r, l, c, d;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    r = e[s], l = r.box, l.update(r.width || t.w, r.height || t.h, vd(r.horizontal, t));
    const { same: h, other: f } = md(t, n, r, a);
    c |= h && o.length, d = d || f, l.fullSize || o.push(r);
  }
  return c && Rn(o, t, n, a) || d;
}
function ia(e, t, n, a, o) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + o, e.width = a, e.height = o;
}
function us(e, t, n, a) {
  const o = n.padding;
  let { x: s, y: i } = t;
  for (const r of e) {
    const l = r.box, c = a[r.stack] || {
      placed: 0,
      weight: 1
    }, d = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const h = t.w * d, f = c.size || l.height;
      Hn(c.start) && (i = c.start), l.fullSize ? ia(l, o.left, i, n.outerWidth - o.right - o.left, f) : ia(l, t.left + c.placed, i, h, f), c.start = i, c.placed += h, i = l.bottom;
    } else {
      const h = t.h * d, f = c.size || l.width;
      Hn(c.start) && (s = c.start), l.fullSize ? ia(l, s, o.top, f, n.outerHeight - o.bottom - o.top) : ia(l, s, t.top + c.placed, f, h), c.start = s, c.placed += h, s = l.right;
    }
  }
  t.x = s, t.y = i;
}
var pt = {
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
    const o = bt(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(n - o.height, 0), r = pd(e.boxes), l = r.vertical, c = r.horizontal;
    Re(e.boxes, (v) => {
      typeof v.beforeLayout == "function" && v.beforeLayout();
    });
    const d = l.reduce((v, y) => y.box.options && y.box.options.display === !1 ? v : v + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / d,
      hBoxMaxHeight: i / 2
    }), f = Object.assign({}, o);
    Ii(f, bt(a));
    const m = Object.assign({
      maxPadding: f,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), g = gd(l.concat(c), h);
    Rn(r.fullSize, m, h, g), Rn(l, m, h, g), Rn(c, m, h, g) && Rn(l, m, h, g), bd(m), us(r.leftAndTop, m, h, g), m.x += m.w, m.y += m.h, us(r.rightAndBottom, m, h, g), e.chartArea = {
      left: m.left,
      top: m.top,
      right: m.left + m.w,
      bottom: m.top + m.h,
      height: m.h,
      width: m.w
    }, Re(r.chartArea, (v) => {
      const y = v.box;
      Object.assign(y, e.chartArea), y.update(m.w, m.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Fi {
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
  getMaximumSize(t, n, a, o) {
    return n = Math.max(0, n || t.width), a = a || t.height, {
      width: n,
      height: Math.max(0, o ? Math.floor(n / o) : a)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class yd extends Fi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const ga = "$chartjs", xd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, hs = (e) => e === null || e === "";
function _d(e, t) {
  const n = e.style, a = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[ga] = {
    initial: {
      height: a,
      width: o,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", hs(o)) {
    const s = Xo(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (hs(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = Xo(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const Oi = mc ? {
  passive: !0
} : !1;
function kd(e, t, n) {
  e && e.addEventListener(t, n, Oi);
}
function wd(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Oi);
}
function Cd(e, t) {
  const n = xd[e.type] || e.type, { x: a, y: o } = rn(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: o !== void 0 ? o : null
  };
}
function _a(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function $d(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || _a(r.addedNodes, a), i = i && !_a(r.removedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function Sd(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || _a(r.removedNodes, a), i = i && !_a(r.addedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const qn = /* @__PURE__ */ new Map();
let fs = 0;
function Vi() {
  const e = window.devicePixelRatio;
  e !== fs && (fs = e, qn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function Md(e, t) {
  qn.size || window.addEventListener("resize", Vi), qn.set(e, t);
}
function Dd(e) {
  qn.delete(e), qn.size || window.removeEventListener("resize", Vi);
}
function Ad(e, t, n) {
  const a = e.canvas, o = a && bo(a);
  if (!o)
    return;
  const s = xi((r, l) => {
    const c = o.clientWidth;
    n(r, l), c < o.clientWidth && n();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, d = l.contentRect.height;
    c === 0 && d === 0 || s(c, d);
  });
  return i.observe(o), Md(e, s), i;
}
function za(e, t, n) {
  n && n.disconnect(), t === "resize" && Dd(e);
}
function Td(e, t, n) {
  const a = e.canvas, o = xi((s) => {
    e.ctx !== null && n(Cd(s, e));
  }, e);
  return kd(a, t, o), o;
}
class Bd extends Fi {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (_d(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[ga])
      return !1;
    const a = n[ga].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = a[s];
      Pe(i) ? n.removeAttribute(s) : n.setAttribute(s, i);
    });
    const o = a.style || {};
    return Object.keys(o).forEach((s) => {
      n.style[s] = o[s];
    }), n.width = n.width, delete n[ga], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: $d,
      detach: Sd,
      resize: Ad
    }[n] || Td;
    o[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), o = a[n];
    if (!o)
      return;
    ({
      attach: za,
      detach: za,
      resize: za
    }[n] || wd)(t, n, o), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, o) {
    return pc(t, n, a, o);
  }
  isAttached(t) {
    const n = t && bo(t);
    return !!(n && n.isConnected);
  }
}
function Ld(e) {
  return !mo() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? yd : Bd;
}
let Ft = class {
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
    return Wn(this.x) && Wn(this.y);
  }
  getProps(t, n) {
    const a = this.$animations;
    if (!n || !a)
      return this;
    const o = {};
    return t.forEach((s) => {
      o[s] = a[s] && a[s].active() ? a[s]._to : this[s];
    }), o;
  }
};
function Pd(e, t) {
  const n = e.options.ticks, a = Rd(e), o = Math.min(n.maxTicksLimit || a, a), s = n.major.enabled ? Id(t) : [], i = s.length, r = s[0], l = s[i - 1], c = [];
  if (i > o)
    return Fd(t, c, s, i / o), c;
  const d = Ed(s, t, o);
  if (i > 0) {
    let h, f;
    const m = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (ra(t, c, d, Pe(m) ? 0 : r - m, r), h = 0, f = i - 1; h < f; h++)
      ra(t, c, d, s[h], s[h + 1]);
    return ra(t, c, d, l, Pe(m) ? t.length : l + m), c;
  }
  return ra(t, c, d), c;
}
function Rd(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), o = e._maxLength / n;
  return Math.floor(Math.min(a, o));
}
function Ed(e, t, n) {
  const a = Od(e), o = t.length / n;
  if (!a)
    return Math.max(o, 1);
  const s = gl(a);
  for (let i = 0, r = s.length - 1; i < r; i++) {
    const l = s[i];
    if (l > o)
      return l;
  }
  return Math.max(o, 1);
}
function Id(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function Fd(e, t, n, a) {
  let o = 0, s = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = n[o * a]);
}
function ra(e, t, n, a, o) {
  const s = $e(a, 0), i = Math.min($e(o, e.length), e.length);
  let r = 0, l, c, d;
  for (n = Math.ceil(n), o && (l = o - a, n = l / Math.floor(l / n)), d = s; d < 0; )
    r++, d = Math.round(s + r * n);
  for (c = Math.max(s, 0); c < i; c++)
    c === d && (t.push(e[c]), r++, d = Math.round(s + r * n));
}
function Od(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const Vd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, gs = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, ps = (e, t) => Math.min(t || e, e);
function ms(e, t) {
  const n = [], a = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += a)
    n.push(e[Math.floor(s)]);
  return n;
}
function zd(e, t, n) {
  const a = e.ticks.length, o = Math.min(t, a - 1), s = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(o), c;
  if (!(n && (a === 1 ? c = Math.max(l - s, i - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(o - 1)) / 2, l += o < t ? c : -c, l < s - r || l > i + r)))
    return l;
}
function Nd(e, t) {
  Re(e, (n) => {
    const a = n.gc, o = a.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete n.data[a[s]];
      a.splice(0, o);
    }
  });
}
function Dn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function bs(e, t) {
  if (!e.display)
    return 0;
  const n = tt(e.font, t), a = bt(e.padding);
  return (qe(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function jd(e, t) {
  return gn(e, {
    scale: t,
    type: "scale"
  });
}
function Hd(e, t, n) {
  return gn(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function Wd(e, t, n) {
  let a = io(e);
  return (n && t !== "right" || !n && t === "right") && (a = Vd(a)), a;
}
function Kd(e, t, n, a) {
  const { top: o, left: s, bottom: i, right: r, chart: l } = e, { chartArea: c, scales: d } = l;
  let h = 0, f, m, g;
  const v = i - o, y = r - s;
  if (e.isHorizontal()) {
    if (m = Qe(a, s, r), Te(n)) {
      const b = Object.keys(n)[0], _ = n[b];
      g = d[b].getPixelForValue(_) + v - t;
    } else n === "center" ? g = (c.bottom + c.top) / 2 + v - t : g = gs(e, n, t);
    f = r - s;
  } else {
    if (Te(n)) {
      const b = Object.keys(n)[0], _ = n[b];
      m = d[b].getPixelForValue(_) - y + t;
    } else n === "center" ? m = (c.left + c.right) / 2 - y + t : m = gs(e, n, t);
    g = Qe(a, i, o), h = n === "left" ? -Xe : Xe;
  }
  return {
    titleX: m,
    titleY: g,
    maxWidth: f,
    rotation: h
  };
}
class Cn extends Ft {
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
    let { _userMin: t, _userMax: n, _suggestedMin: a, _suggestedMax: o } = this;
    return t = Ct(t, Number.POSITIVE_INFINITY), n = Ct(n, Number.NEGATIVE_INFINITY), a = Ct(a, Number.POSITIVE_INFINITY), o = Ct(o, Number.NEGATIVE_INFINITY), {
      min: Ct(t, a),
      max: Ct(n, o),
      minDefined: mt(t),
      maxDefined: mt(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: a, minDefined: o, maxDefined: s } = this.getUserBounds(), i;
    if (o && s)
      return {
        min: n,
        max: a
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, c = r.length; l < c; ++l)
      i = r[l].controller.getMinMax(this, t), o || (n = Math.min(n, i.min)), s || (a = Math.max(a, i.max));
    return n = s && n > a ? a : n, a = o && n > a ? n : a, {
      min: Ct(n, Ct(a, n)),
      max: Ct(a, Ct(n, a))
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
    const { beginAtZero: o, grace: s, ticks: i } = this.options, r = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Ul(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? ms(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Pd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    let a, o, s;
    for (a = 0, o = t.length; a < o; a++)
      s = t[a], s.label = Fe(n.callback, [
        s.value,
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
    const t = this.options, n = t.ticks, a = ps(this.ticks.length, t.ticks.maxTicksLimit), o = n.minRotation || 0, s = n.maxRotation;
    let i = o, r, l, c;
    if (!this._isVisible() || !n.display || o >= s || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, f = d.highest.height, m = et(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / a : m / (a - 1), h + 6 > r && (r = m / (a - (t.offset ? 0.5 : 1)), l = this.maxHeight - Dn(t.grid) - n.padding - bs(t.title, this.chart.options.font), c = Math.sqrt(h * h + f * f), i = vl(Math.min(Math.asin(et((d.highest.height + 6) / r, -1, 1)), Math.asin(et(l / c, -1, 1)) - Math.asin(et(f / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
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
    }, { chart: n, options: { ticks: a, title: o, grid: s } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = bs(o, n.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Dn(s) + l) : (t.height = this.maxHeight, t.width = Dn(s) + l), a.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: f } = this._getLabelSizes(), m = a.padding * 2, g = Et(this.labelRotation), v = Math.cos(g), y = Math.sin(g);
        if (r) {
          const b = a.mirror ? 0 : y * h.width + v * f.height;
          t.height = Math.min(this.maxHeight, t.height + b + m);
        } else {
          const b = a.mirror ? 0 : v * h.width + y * f.height;
          t.width = Math.min(this.maxWidth, t.width + b + m);
        }
        this._calculatePadding(c, d, y, v);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, o) {
    const { ticks: { align: s, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, m = 0;
      l ? c ? (f = o * t.width, m = a * n.height) : (f = a * t.height, m = o * n.width) : s === "start" ? m = n.width : s === "end" ? f = t.width : s !== "inner" && (f = t.width / 2, m = n.width / 2), this.paddingLeft = Math.max((f - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((m - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = t.height / 2;
      s === "start" ? (d = 0, h = t.height) : s === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
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
      Pe(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = ms(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: o, _longestTextCache: s } = this, i = [], r = [], l = Math.floor(n / ps(n, a));
    let c = 0, d = 0, h, f, m, g, v, y, b, _, x, w, $;
    for (h = 0; h < n; h += l) {
      if (g = t[h].label, v = this._resolveTickFontOptions(h), o.font = y = v.string, b = s[y] = s[y] || {
        data: {},
        gc: []
      }, _ = v.lineHeight, x = w = 0, !Pe(g) && !qe(g))
        x = Wo(o, b.data, b.gc, x, g), w = _;
      else if (qe(g))
        for (f = 0, m = g.length; f < m; ++f)
          $ = g[f], !Pe($) && !qe($) && (x = Wo(o, b.data, b.gc, x, $), w += _);
      i.push(x), r.push(w), c = Math.max(x, c), d = Math.max(w, d);
    }
    Nd(s, n);
    const S = i.indexOf(c), M = r.indexOf(d), V = (j) => ({
      width: i[j] || 0,
      height: r[j] || 0
    });
    return {
      first: V(0),
      last: V(n - 1),
      widest: V(S),
      highest: V(M),
      widths: i,
      heights: r
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
    return xl(this._alignToPixels ? an(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = Hd(this.getContext(), t, a));
    }
    return this.$context || (this.$context = jd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Et(this.labelRotation), a = Math.abs(Math.cos(n)), o = Math.abs(Math.sin(n)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = s ? s.widest.width + i : 0, l = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? l * a > r * o ? r / a : l / o : l * o < r * a ? l / a : r / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, o = this.options, { grid: s, position: i, border: r } = o, l = s.offset, c = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), f = Dn(s), m = [], g = r.setContext(this.getContext()), v = g.display ? g.width : 0, y = v / 2, b = function(Q) {
      return an(a, Q, v);
    };
    let _, x, w, $, S, M, V, j, B, T, D, P;
    if (i === "top")
      _ = b(this.bottom), M = this.bottom - f, j = _ - y, T = b(t.top) + y, P = t.bottom;
    else if (i === "bottom")
      _ = b(this.top), T = t.top, P = b(t.bottom) - y, M = _ + y, j = this.top + f;
    else if (i === "left")
      _ = b(this.right), S = this.right - f, V = _ - y, B = b(t.left) + y, D = t.right;
    else if (i === "right")
      _ = b(this.left), B = t.left, D = b(t.right) - y, S = _ + y, V = this.left + f;
    else if (n === "x") {
      if (i === "center")
        _ = b((t.top + t.bottom) / 2 + 0.5);
      else if (Te(i)) {
        const Q = Object.keys(i)[0], ne = i[Q];
        _ = b(this.chart.scales[Q].getPixelForValue(ne));
      }
      T = t.top, P = t.bottom, M = _ + y, j = M + f;
    } else if (n === "y") {
      if (i === "center")
        _ = b((t.left + t.right) / 2);
      else if (Te(i)) {
        const Q = Object.keys(i)[0], ne = i[Q];
        _ = b(this.chart.scales[Q].getPixelForValue(ne));
      }
      S = _ - y, V = S - f, B = t.left, D = t.right;
    }
    const O = $e(o.ticks.maxTicksLimit, h), Z = Math.max(1, Math.ceil(h / O));
    for (x = 0; x < h; x += Z) {
      const Q = this.getContext(x), ne = s.setContext(Q), ie = r.setContext(Q), ge = ne.lineWidth, X = ne.color, L = ie.dash || [], H = ie.dashOffset, K = ne.tickWidth, ce = ne.tickColor, ve = ne.tickBorderDash || [], De = ne.tickBorderDashOffset;
      w = zd(this, x, l), w !== void 0 && ($ = an(a, w, ge), c ? S = V = B = D = $ : M = j = T = P = $, m.push({
        tx1: S,
        ty1: M,
        tx2: V,
        ty2: j,
        x1: B,
        y1: T,
        x2: D,
        y2: P,
        width: ge,
        color: X,
        borderDash: L,
        borderDashOffset: H,
        tickWidth: K,
        tickColor: ce,
        tickBorderDash: ve,
        tickBorderDashOffset: De
      }));
    }
    return this._ticksLength = h, this._borderValue = _, m;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: o, ticks: s } = a, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: d, mirror: h } = s, f = Dn(a.grid), m = f + d, g = h ? -d : m, v = -Et(this.labelRotation), y = [];
    let b, _, x, w, $, S, M, V, j, B, T, D, P = "middle";
    if (o === "top")
      S = this.bottom - g, M = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      S = this.top + g, M = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const Z = this._getYAxisLabelAlignment(f);
      M = Z.textAlign, $ = Z.x;
    } else if (o === "right") {
      const Z = this._getYAxisLabelAlignment(f);
      M = Z.textAlign, $ = Z.x;
    } else if (n === "x") {
      if (o === "center")
        S = (t.top + t.bottom) / 2 + m;
      else if (Te(o)) {
        const Z = Object.keys(o)[0], Q = o[Z];
        S = this.chart.scales[Z].getPixelForValue(Q) + m;
      }
      M = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - m;
      else if (Te(o)) {
        const Z = Object.keys(o)[0], Q = o[Z];
        $ = this.chart.scales[Z].getPixelForValue(Q);
      }
      M = this._getYAxisLabelAlignment(f).textAlign;
    }
    n === "y" && (l === "start" ? P = "top" : l === "end" && (P = "bottom"));
    const O = this._getLabelSizes();
    for (b = 0, _ = r.length; b < _; ++b) {
      x = r[b], w = x.label;
      const Z = s.setContext(this.getContext(b));
      V = this.getPixelForTick(b) + s.labelOffset, j = this._resolveTickFontOptions(b), B = j.lineHeight, T = qe(w) ? w.length : 1;
      const Q = T / 2, ne = Z.color, ie = Z.textStrokeColor, ge = Z.textStrokeWidth;
      let X = M;
      i ? ($ = V, M === "inner" && (b === _ - 1 ? X = this.options.reverse ? "left" : "right" : b === 0 ? X = this.options.reverse ? "right" : "left" : X = "center"), o === "top" ? c === "near" || v !== 0 ? D = -T * B + B / 2 : c === "center" ? D = -O.highest.height / 2 - Q * B + B : D = -O.highest.height + B / 2 : c === "near" || v !== 0 ? D = B / 2 : c === "center" ? D = O.highest.height / 2 - Q * B : D = O.highest.height - T * B, h && (D *= -1), v !== 0 && !Z.showLabelBackdrop && ($ += B / 2 * Math.sin(v))) : (S = V, D = (1 - T) * B / 2);
      let L;
      if (Z.showLabelBackdrop) {
        const H = bt(Z.backdropPadding), K = O.heights[b], ce = O.widths[b];
        let ve = D - H.top, De = 0 - H.left;
        switch (P) {
          case "middle":
            ve -= K / 2;
            break;
          case "bottom":
            ve -= K;
            break;
        }
        switch (M) {
          case "center":
            De -= ce / 2;
            break;
          case "right":
            De -= ce;
            break;
          case "inner":
            b === _ - 1 ? De -= ce : b > 0 && (De -= ce / 2);
            break;
        }
        L = {
          left: De,
          top: ve,
          width: ce + H.width,
          height: K + H.height,
          color: Z.backdropColor
        };
      }
      y.push({
        label: w,
        font: j,
        textOffset: D,
        options: {
          rotation: v,
          color: ne,
          strokeColor: ie,
          strokeWidth: ge,
          textAlign: X,
          textBaseline: P,
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
    const { position: t, ticks: n } = this.options;
    if (-Et(this.labelRotation))
      return t === "top" ? "left" : "right";
    let o = "center";
    return n.align === "start" ? o = "left" : n.align === "end" ? o = "right" : n.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: o, padding: s } } = this.options, i = this._getLabelSizes(), r = t + s, l = i.widest.width;
    let c, d;
    return n === "left" ? o ? (d = this.right + s, a === "near" ? c = "left" : a === "center" ? (c = "center", d += l / 2) : (c = "right", d += l)) : (d = this.right - r, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= l / 2) : (c = "left", d = this.left)) : n === "right" ? o ? (d = this.left + s, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= l / 2) : (c = "left", d -= l)) : (d = this.left + r, a === "near" ? c = "left" : a === "center" ? (c = "center", d += l / 2) : (c = "right", d = this.right)) : c = "right", {
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
    const { ctx: t, options: { backgroundColor: n }, left: a, top: o, width: s, height: i } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(a, o, s, i), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const o = this.ticks.findIndex((s) => s.value === t);
    return o >= 0 ? n.setContext(this.getContext(o)).lineWidth : 0;
  }
  drawGrid(t) {
    const n = this.options.grid, a = this.ctx, o = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let s, i;
    const r = (l, c, d) => {
      !d.width || !d.color || (a.save(), a.lineWidth = d.width, a.strokeStyle = d.color, a.setLineDash(d.borderDash || []), a.lineDashOffset = d.borderDashOffset, a.beginPath(), a.moveTo(l.x, l.y), a.lineTo(c.x, c.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (s = 0, i = o.length; s < i; ++s) {
        const l = o[s];
        n.drawOnChartArea && r({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), n.drawTicks && r({
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
    const { chart: t, ctx: n, options: { border: a, grid: o } } = this, s = a.setContext(this.getContext()), i = a.display ? s.width : 0;
    if (!i)
      return;
    const r = o.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, d, h, f;
    this.isHorizontal() ? (c = an(t, this.left, i) - i / 2, d = an(t, this.right, r) + r / 2, h = f = l) : (h = an(t, this.top, i) - i / 2, f = an(t, this.bottom, r) + r / 2, c = d = l), n.save(), n.lineWidth = s.width, n.strokeStyle = s.color, n.beginPath(), n.moveTo(c, h), n.lineTo(d, f), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, o = this._computeLabelArea();
    o && co(a, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const r = i.options, l = i.font, c = i.label, d = i.textOffset;
      Un(a, c, 0, d, l, r);
    }
    o && uo(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: o } } = this;
    if (!a.display)
      return;
    const s = tt(a.font), i = bt(a.padding), r = a.align;
    let l = s.lineHeight / 2;
    n === "bottom" || n === "center" || Te(n) ? (l += i.bottom, qe(a.text) && (l += s.lineHeight * (a.text.length - 1))) : l += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: f } = Kd(this, l, n, r);
    Un(t, a.text, 0, 0, s, {
      color: a.color,
      maxWidth: h,
      rotation: f,
      textAlign: Wd(r, n, o),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = $e(t.grid && t.grid.z, -1), o = $e(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Cn.prototype.draw ? [
      {
        z: n,
        draw: (s) => {
          this.draw(s);
        }
      }
    ] : [
      {
        z: a,
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
        z: n,
        draw: (s) => {
          this.drawLabels(s);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const n = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", o = [];
    let s, i;
    for (s = 0, i = n.length; s < i; ++s) {
      const r = n[s];
      r[a] === this.id && (!t || r.type === t) && o.push(r);
    }
    return o;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return tt(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class la {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    qd(n) && (a = this.register(n));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, Yd(t, i, a), this.override && Ke.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, o = this.scope;
    a in n && delete n[a], o && a in Ke[o] && (delete Ke[o][a], this.override && delete fn[a]);
  }
}
function Yd(e, t, n) {
  const a = jn(/* @__PURE__ */ Object.create(null), [
    n ? Ke.get(n) : {},
    Ke.get(t),
    e.defaults
  ]);
  Ke.set(t, a), e.defaultRoutes && Ud(t, e.defaultRoutes), e.descriptors && Ke.describe(t, e.descriptors);
}
function Ud(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), o = a.pop(), s = [
      e
    ].concat(a).join("."), i = t[n].split("."), r = i.pop(), l = i.join(".");
    Ke.route(s, o, l, r);
  });
}
function qd(e) {
  return "id" in e && "defaults" in e;
}
class Xd {
  constructor() {
    this.controllers = new la(Sa, "datasets", !0), this.elements = new la(Ft, "elements"), this.plugins = new la(Object, "plugins"), this.scales = new la(Cn, "scales"), this._typedRegistries = [
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
    ].forEach((o) => {
      const s = a || this._getRegistryForType(o);
      a || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Re(o, (i) => {
        const r = a || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, n, a) {
    const o = oo(t);
    Fe(a["before" + o], [], a), n[t](a), Fe(a["after" + o], [], a);
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
    const o = n.get(t);
    if (o === void 0)
      throw new Error('"' + t + '" is not a registered ' + a + ".");
    return o;
  }
}
var St = /* @__PURE__ */ new Xd();
class Gd {
  constructor() {
    this._init = void 0;
  }
  notify(t, n, a, o) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const s = o ? this._descriptors(t).filter(o) : this._descriptors(t), i = this._notify(s, t, n, a);
    return n === "afterDestroy" && (this._notify(s, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, n, a, o) {
    o = o || {};
    for (const s of t) {
      const i = s.plugin, r = i[a], l = [
        n,
        o,
        s.options
      ];
      if (Fe(r, l, i) === !1 && o.cancelable)
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
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, o = $e(a.options && a.options.plugins, {}), s = Zd(a);
    return o === !1 && !n ? [] : Jd(t, s, o, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, o = (s, i) => s.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(o(n, a), t, "stop"), this._notify(o(a, n), t, "start");
  }
}
function Zd(e) {
  const t = {}, n = [], a = Object.keys(St.plugins.items);
  for (let s = 0; s < a.length; s++)
    n.push(St.getPlugin(a[s]));
  const o = e.plugins || [];
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    n.indexOf(i) === -1 && (n.push(i), t[i.id] = !0);
  }
  return {
    plugins: n,
    localIds: t
  };
}
function Qd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Jd(e, { plugins: t, localIds: n }, a, o) {
  const s = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, c = Qd(a[l], o);
    c !== null && s.push({
      plugin: r,
      options: eu(e.config, {
        plugin: r,
        local: n[l]
      }, c, i)
    });
  }
  return s;
}
function eu(e, { plugin: t, local: n }, a, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(a, s);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Za(e, t) {
  const n = Ke.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function tu(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function nu(e, t) {
  return e === t ? "_index_" : "_value_";
}
function vs(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function au(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Qa(e, ...t) {
  if (vs(e))
    return e;
  for (const n of t) {
    const a = n.axis || au(n.position) || e.length > 1 && vs(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function ys(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function ou(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return ys(e, "x", n[0]) || ys(e, "y", n[0]);
  }
  return {};
}
function su(e, t) {
  const n = fn[e.type] || {
    scales: {}
  }, a = t.scales || {}, o = Za(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const r = a[i];
    if (!Te(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = Qa(i, r, ou(i, e), Ke.scales[r.type]), c = nu(l, o), d = n.scales || {};
    s[i] = In(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      d[l],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || Za(r, t), d = (fn[r] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const f = tu(h, l), m = i[f + "AxisID"] || f;
      s[m] = s[m] || /* @__PURE__ */ Object.create(null), In(s[m], [
        {
          axis: f
        },
        a[m],
        d[h]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const r = s[i];
    In(r, [
      Ke.scales[r.type],
      Ke.scale
    ]);
  }), s;
}
function zi(e) {
  const t = e.options || (e.options = {});
  t.plugins = $e(t.plugins, {}), t.scales = su(e, t);
}
function Ni(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function iu(e) {
  return e = e || {}, e.data = Ni(e.data), zi(e), e;
}
const xs = /* @__PURE__ */ new Map(), ji = /* @__PURE__ */ new Set();
function ca(e, t) {
  let n = xs.get(e);
  return n || (n = t(), xs.set(e, n), ji.add(n)), n;
}
const An = (e, t, n) => {
  const a = hn(t, n);
  a !== void 0 && e.add(a);
};
class ru {
  constructor(t) {
    this._config = iu(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Ni(t);
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
    this.clearCache(), zi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ca(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return ca(`${t}.transition.${n}`, () => [
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
    return ca(`${t}-${n}`, () => [
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
    return ca(`${a}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, n) {
    const a = this._scopeCache;
    let o = a.get(t);
    return (!o || n) && (o = /* @__PURE__ */ new Map(), a.set(t, o)), o;
  }
  getOptionScopes(t, n, a) {
    const { options: o, type: s } = this, i = this._cachedScopes(t, a), r = i.get(n);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    n.forEach((d) => {
      t && (l.add(t), d.forEach((h) => An(l, t, h))), d.forEach((h) => An(l, o, h)), d.forEach((h) => An(l, fn[s] || {}, h)), d.forEach((h) => An(l, Ke, h)), d.forEach((h) => An(l, Xa, h));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), ji.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      fn[n] || {},
      Ke.datasets[n] || {},
      {
        type: n
      },
      Ke,
      Xa
    ];
  }
  resolveNamedOptions(t, n, a, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = _s(this._resolverCache, t, o);
    let l = i;
    if (cu(i, n)) {
      s.$shared = !1, a = Gt(a) ? a() : a;
      const c = this.createResolver(t, a, r);
      l = kn(i, a, c);
    }
    for (const c of n)
      s[c] = l[c];
    return s;
  }
  createResolver(t, n, a = [
    ""
  ], o) {
    const { resolver: s } = _s(this._resolverCache, t, a);
    return Te(n) ? kn(s, n, void 0, o) : s;
  }
}
function _s(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const o = n.join();
  let s = a.get(o);
  return s || (s = {
    resolver: fo(t, n),
    subPrefixes: n.filter((r) => !r.toLowerCase().includes("hover"))
  }, a.set(o, s)), s;
}
const lu = (e) => Te(e) && Object.getOwnPropertyNames(e).some((t) => Gt(e[t]));
function cu(e, t) {
  const { isScriptable: n, isIndexable: a } = Ci(e);
  for (const o of t) {
    const s = n(o), i = a(o), r = (i || s) && e[o];
    if (s && (Gt(r) || lu(r)) || i && qe(r))
      return !0;
  }
  return !1;
}
var du = "4.5.1";
const uu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function ks(e, t) {
  return e === "top" || e === "bottom" || uu.indexOf(e) === -1 && t === "x";
}
function ws(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function Cs(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Fe(n && n.onComplete, [
    e
  ], t);
}
function hu(e) {
  const t = e.chart, n = t.options.animation;
  Fe(n && n.onProgress, [
    e
  ], t);
}
function Hi(e) {
  return mo() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const pa = {}, $s = (e) => {
  const t = Hi(e);
  return Object.values(pa).filter((n) => n.canvas === t).pop();
};
function fu(e, t, n) {
  const a = Object.keys(e);
  for (const o of a) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (n > 0 || s > t) && (e[s + n] = i);
    }
  }
}
function gu(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Zt = class {
  static defaults = Ke;
  static instances = pa;
  static overrides = fn;
  static registry = St;
  static version = du;
  static getChart = $s;
  static register(...t) {
    St.add(...t), Ss();
  }
  static unregister(...t) {
    St.remove(...t), Ss();
  }
  constructor(t, n) {
    const a = this.config = new ru(n), o = Hi(t), s = $s(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || Ld(o))(), this.platform.updateConfig(a);
    const r = this.platform.acquireContext(o, i.aspectRatio), l = r && r.canvas, c = l && l.height, d = l && l.width;
    if (this.id = sl(), this.ctx = r, this.canvas = l, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Gd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Cl((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], pa[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Lt.listen(this, "complete", Cs), Lt.listen(this, "progress", hu), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: o, _aspectRatio: s } = this;
    return Pe(t) ? n && s ? s : o ? a / o : null : t;
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
    return St;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : qo(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ko(this.canvas, this.ctx), this;
  }
  stop() {
    return Lt.stop(this), this;
  }
  resize(t, n) {
    Lt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, o = this.canvas, s = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, n, s), r = a.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, qo(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Fe(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Re(n, (a, o) => {
      a.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, o = Object.keys(a).reduce((i, r) => (i[r] = !1, i), {});
    let s = [];
    n && (s = s.concat(Object.keys(n).map((i) => {
      const r = n[i], l = Qa(i, r), c = l === "r", d = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Re(s, (i) => {
      const r = i.options, l = r.id, c = Qa(l, r), d = $e(r.type, i.dtype);
      (r.position === void 0 || ks(r.position, c) !== ks(i.dposition)) && (r.position = i.dposition), o[l] = !0;
      let h = null;
      if (l in a && a[l].type === d)
        h = a[l];
      else {
        const f = St.getScale(d);
        h = new f({
          id: l,
          type: d,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(r, t);
    }), Re(o, (i, r) => {
      i || delete a[r];
    }), Re(a, (i) => {
      pt.configure(this, i, i.options), pt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((o, s) => o.index - s.index), a > n) {
      for (let o = n; o < a; ++o)
        this._destroyDatasetMeta(o);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(ws("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((a, o) => {
      n.filter((s) => s === a._dataset).length === 0 && this._destroyDatasetMeta(o);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let a, o;
    for (this._removeUnreferencedMetasets(), a = 0, o = n.length; a < o; a++) {
      const s = n[a];
      let i = this.getDatasetMeta(a);
      const r = s.type || this.config.type;
      if (i.type && i.type !== r && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = r, i.indexAxis = s.indexAxis || Za(r, this.options), i.order = s.order || 0, i.index = a, i.label = "" + s.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const l = St.getController(r), { datasetElementType: c, dataElementType: d } = Ke.datasets[r];
        Object.assign(l, {
          dataElementType: St.getElement(d),
          datasetElementType: c && St.getElement(c)
        }), i.controller = new l(this, a), t.push(i.controller);
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
    const a = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), o = this._animationsDisabled = !a.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const s = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let c = 0, d = this.data.datasets.length; c < d; c++) {
      const { controller: h } = this.getDatasetMeta(c), f = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(f), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), o || Re(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(ws("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    Re(this.scales, (t) => {
      pt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Eo(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: o, count: s } of n) {
      const i = a === "_removeElements" ? -s : s;
      fu(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (s) => new Set(t.filter((i) => i[0] === s).map((i, r) => r + "," + i.splice(1).join(","))), o = a(0);
    for (let s = 1; s < n; s++)
      if (!Eo(o, a(s)))
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
    pt.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Re(this.boxes, (o) => {
      a && o.position === "chartArea" || (o.configure && o.configure(), this._layers.push(...o._layers()));
    }, this), this._layers.forEach((o, s) => {
      o._idx = s;
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
        this._updateDataset(n, Gt(t) ? t({
          datasetIndex: n
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, n) {
    const a = this.getDatasetMeta(t), o = {
      meta: a,
      index: t,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", o) !== !1 && (a.controller._update(n), o.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", o));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Lt.has(this) ? this.attached && !Lt.running(this) && Lt.start(this) : (this.draw(), Cs({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: a, height: o } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(a, o);
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
    let o, s;
    for (o = 0, s = n.length; o < s; ++o) {
      const i = n[o];
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
    }, o = Tc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (o && co(n, o), t.controller.draw(), o && uo(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Yn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, o) {
    const s = ud.modes[n];
    return typeof s == "function" ? s(this, t, a, o) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], a = this._metasets;
    let o = a.filter((s) => s && s._dataset === n).pop();
    return o || (o = {
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
    }, a.push(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = gn(null, {
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
    const o = a ? "show" : "hide", s = this.getDatasetMeta(t), i = s.controller._resolveAnimations(void 0, o);
    Hn(n) ? (s.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(s, {
      visible: a
    }), this.update((r) => r.datasetIndex === t ? o : void 0));
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
    for (this.stop(), Lt.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ko(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete pa[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, a = (s, i) => {
      n.addEventListener(this, s, i), t[s] = i;
    }, o = (s, i, r) => {
      s.offsetX = i, s.offsetY = r, this._eventHandler(s);
    };
    Re(this.options.events, (s) => a(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (l, c) => {
      n.addEventListener(this, l, c), t[l] = c;
    }, o = (l, c) => {
      t[l] && (n.removeEventListener(this, l, c), delete t[l]);
    }, s = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let i;
    const r = () => {
      o("attach", r), this.attached = !0, this.resize(), a("resize", s), a("detach", i);
    };
    i = () => {
      this.attached = !1, o("resize", s), this._stop(), this._resize(0, 0), a("attach", r);
    }, n.isAttached(this.canvas) ? r() : i();
  }
  unbindEvents() {
    Re(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Re(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const o = a ? "set" : "remove";
    let s, i, r, l;
    for (n === "dataset" && (s = this.getDatasetMeta(t[0].datasetIndex), s.controller["_" + o + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      i = t[r];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[o + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], a = t.map(({ datasetIndex: s, index: i }) => {
      const r = this.getDatasetMeta(s);
      if (!r)
        throw new Error("No dataset found at index " + s);
      return {
        datasetIndex: s,
        element: r.data[i],
        index: i
      };
    });
    !ma(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
  }
  notifyPlugins(t, n, a) {
    return this._plugins.notify(this, t, n, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, a) {
    const o = this.options.hover, s = (l, c) => l.filter((d) => !c.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), i = s(n, t), r = a ? t : s(t, n);
    i.length && this.updateHoverStyle(i, o.mode, !1), r.length && o.mode && this.updateHoverStyle(r, o.mode, !0);
  }
  _eventHandler(t, n) {
    const a = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, o = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, o) === !1)
      return;
    const s = this._handleEvent(t, n, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, o), (s || a.changed) && this.render(), this;
  }
  _handleEvent(t, n, a) {
    const { _active: o = [], options: s } = this, i = n, r = this._getActiveElements(t, o, a, i), l = ul(t), c = gu(t, this._lastEvent, a, l);
    a && (this._lastEvent = null, Fe(s.onHover, [
      t,
      r,
      this
    ], this), l && Fe(s.onClick, [
      t,
      r,
      this
    ], this));
    const d = !ma(r, o);
    return (d || n) && (this._active = r, this._updateHoverStyles(r, o, n)), this._lastEvent = c, d;
  }
  _getActiveElements(t, n, a, o) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return n;
    const s = this.options.hover;
    return this.getElementsAtEventForMode(t, s.mode, s, o);
  }
};
function Ss() {
  return Re(Zt.instances, (e) => e._plugins.invalidate());
}
function pu(e, t, n) {
  const { startAngle: a, x: o, y: s, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: d } = l, h = Math.min(c / i, yt(a - n));
  if (e.beginPath(), e.arc(o, s, i - c / 2, a + h / 2, n - h / 2), r > 0) {
    const f = Math.min(c / r, yt(a - n));
    e.arc(o, s, r + c / 2, n - f / 2, a + f / 2, !0);
  } else {
    const f = Math.min(c / 2, i * yt(a - n));
    if (d === "round")
      e.arc(o, s, f, n - Ee / 2, a + Ee / 2, !0);
    else if (d === "bevel") {
      const m = 2 * f * f, g = -m * Math.cos(n + Ee / 2) + o, v = -m * Math.sin(n + Ee / 2) + s, y = m * Math.cos(a + Ee / 2) + o, b = m * Math.sin(a + Ee / 2) + s;
      e.lineTo(g, v), e.lineTo(y, b);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function mu(e, t, n) {
  const { startAngle: a, pixelMargin: o, x: s, y: i, outerRadius: r, innerRadius: l } = t;
  let c = o / r;
  e.beginPath(), e.arc(s, i, r, a - c, n + c), l > o ? (c = o / l, e.arc(s, i, l, n + c, a - c, !0)) : e.arc(s, i, o, n + Xe, a - Xe), e.closePath(), e.clip();
}
function bu(e) {
  return ho(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function vu(e, t, n, a) {
  const o = bu(e.options.borderRadius), s = (n - t) / 2, i = Math.min(s, a * t / 2), r = (l) => {
    const c = (n - Math.min(s, l)) * a / 2;
    return et(l, 0, Math.min(s, c));
  };
  return {
    outerStart: r(o.outerStart),
    outerEnd: r(o.outerEnd),
    innerStart: et(o.innerStart, 0, i),
    innerEnd: et(o.innerEnd, 0, i)
  };
}
function vn(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function ka(e, t, n, a, o, s) {
  const { x: i, y: r, startAngle: l, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), f = d > 0 ? d + a + n + c : 0;
  let m = 0;
  const g = o - l;
  if (a) {
    const Z = d > 0 ? d - a : 0, Q = h > 0 ? h - a : 0, ne = (Z + Q) / 2, ie = ne !== 0 ? g * ne / (ne + a) : g;
    m = (g - ie) / 2;
  }
  const v = Math.max(1e-3, g * h - n / Ee) / h, y = (g - v) / 2, b = l + y + m, _ = o - y - m, { outerStart: x, outerEnd: w, innerStart: $, innerEnd: S } = vu(t, f, h, _ - b), M = h - x, V = h - w, j = b + x / M, B = _ - w / V, T = f + $, D = f + S, P = b + $ / T, O = _ - S / D;
  if (e.beginPath(), s) {
    const Z = (j + B) / 2;
    if (e.arc(i, r, h, j, Z), e.arc(i, r, h, Z, B), w > 0) {
      const ge = vn(V, B, i, r);
      e.arc(ge.x, ge.y, w, B, _ + Xe);
    }
    const Q = vn(D, _, i, r);
    if (e.lineTo(Q.x, Q.y), S > 0) {
      const ge = vn(D, O, i, r);
      e.arc(ge.x, ge.y, S, _ + Xe, O + Math.PI);
    }
    const ne = (_ - S / f + (b + $ / f)) / 2;
    if (e.arc(i, r, f, _ - S / f, ne, !0), e.arc(i, r, f, ne, b + $ / f, !0), $ > 0) {
      const ge = vn(T, P, i, r);
      e.arc(ge.x, ge.y, $, P + Math.PI, b - Xe);
    }
    const ie = vn(M, b, i, r);
    if (e.lineTo(ie.x, ie.y), x > 0) {
      const ge = vn(M, j, i, r);
      e.arc(ge.x, ge.y, x, b - Xe, j);
    }
  } else {
    e.moveTo(i, r);
    const Z = Math.cos(j) * h + i, Q = Math.sin(j) * h + r;
    e.lineTo(Z, Q);
    const ne = Math.cos(B) * h + i, ie = Math.sin(B) * h + r;
    e.lineTo(ne, ie);
  }
  e.closePath();
}
function yu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (s) {
    ka(e, t, n, a, l, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(r) || (l = i + (r % He || He));
  }
  return ka(e, t, n, a, l, o), e.fill(), l;
}
function xu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: f, borderRadius: m } = l, g = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let v = t.endAngle;
  if (s) {
    ka(e, t, n, a, v, o);
    for (let y = 0; y < s; ++y)
      e.stroke();
    isNaN(r) || (v = i + (r % He || He));
  }
  g && mu(e, t, v), l.selfJoin && v - i >= Ee && m === 0 && d !== "miter" && pu(e, t, v), s || (ka(e, t, n, a, v, o), e.stroke());
}
class _u extends Ft {
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
    const o = this.getProps([
      "x",
      "y"
    ], a), { angle: s, distance: i } = mi(o, {
      x: t,
      y: n
    }), { startAngle: r, endAngle: l, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), f = (this.options.spacing + this.options.borderWidth) / 2, m = $e(h, l - r), g = Kn(s, r, l) && r !== l, v = m >= He || g, y = Nt(i, c + f, d + f);
    return v && y;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: o, endAngle: s, innerRadius: i, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, d = (o + s) / 2, h = (i + r + c + l) / 2;
    return {
      x: n + Math.cos(d) * h,
      y: a + Math.sin(d) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: a } = this, o = (n.offset || 0) / 4, s = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > He ? Math.floor(a / He) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * o, Math.sin(r) * o);
    const l = 1 - Math.sin(Math.min(Ee, a || 0)), c = o * l;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, yu(t, this, c, s, i), xu(t, this, c, s, i), t.restore();
  }
}
function Wi(e, t, n = t) {
  e.lineCap = $e(n.borderCapStyle, t.borderCapStyle), e.setLineDash($e(n.borderDash, t.borderDash)), e.lineDashOffset = $e(n.borderDashOffset, t.borderDashOffset), e.lineJoin = $e(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = $e(n.borderWidth, t.borderWidth), e.strokeStyle = $e(n.borderColor, t.borderColor);
}
function ku(e, t, n) {
  e.lineTo(n.x, n.y);
}
function wu(e) {
  return e.stepped ? Ol : e.tension || e.cubicInterpolationMode === "monotone" ? Vl : ku;
}
function Ki(e, t, n = {}) {
  const a = e.length, { start: o = 0, end: s = a - 1 } = n, { start: i, end: r } = t, l = Math.max(o, i), c = Math.min(s, r), d = o < i && s < i || o > r && s > r;
  return {
    count: a,
    start: l,
    loop: t.loop,
    ilen: c < l && !d ? a + c - l : c - l
  };
}
function Cu(e, t, n, a) {
  const { points: o, options: s } = t, { count: i, start: r, loop: l, ilen: c } = Ki(o, n, a), d = wu(s);
  let { move: h = !0, reverse: f } = a || {}, m, g, v;
  for (m = 0; m <= c; ++m)
    g = o[(r + (f ? c - m : m)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : d(e, v, g, f, s.stepped), v = g);
  return l && (g = o[(r + (f ? c : 0)) % i], d(e, v, g, f, s.stepped)), !!l;
}
function $u(e, t, n, a) {
  const o = t.points, { count: s, start: i, ilen: r } = Ki(o, n, a), { move: l = !0, reverse: c } = a || {};
  let d = 0, h = 0, f, m, g, v, y, b;
  const _ = (w) => (i + (c ? r - w : w)) % s, x = () => {
    v !== y && (e.lineTo(d, y), e.lineTo(d, v), e.lineTo(d, b));
  };
  for (l && (m = o[_(0)], e.moveTo(m.x, m.y)), f = 0; f <= r; ++f) {
    if (m = o[_(f)], m.skip)
      continue;
    const w = m.x, $ = m.y, S = w | 0;
    S === g ? ($ < v ? v = $ : $ > y && (y = $), d = (h * d + w) / ++h) : (x(), e.lineTo(w, $), g = S, h = 0, v = y = $), b = $;
  }
  x();
}
function Ja(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? $u : Cu;
}
function Su(e) {
  return e.stepped ? bc : e.tension || e.cubicInterpolationMode === "monotone" ? vc : ln;
}
function Mu(e, t, n, a) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, n, a) && o.closePath()), Wi(e, t.options), e.stroke(o);
}
function Du(e, t, n, a) {
  const { segments: o, options: s } = t, i = Ja(t);
  for (const r of o)
    Wi(e, s, r.style), e.beginPath(), i(e, t, r, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const Au = typeof Path2D == "function";
function Tu(e, t, n, a) {
  Au && !t.options.segment ? Mu(e, t, n, a) : Du(e, t, n, a);
}
class Bu extends Ft {
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
      const o = a.spanGaps ? this._loop : this._fullLoop;
      cc(this._points, a, t, o, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Sc(this, this.options.segment));
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
    const a = this.options, o = t[n], s = this.points, i = wc(this, {
      property: n,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const r = [], l = Su(a);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: f } = i[c], m = s[h], g = s[f];
      if (m === g) {
        r.push(m);
        continue;
      }
      const v = Math.abs((o - m[n]) / (g[n] - m[n])), y = l(m, g, v, a.stepped);
      y[n] = t[n], r.push(y);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, n, a) {
    return Ja(this)(t, this, n, a);
  }
  path(t, n, a) {
    const o = this.segments, s = Ja(this);
    let i = this._loop;
    n = n || 0, a = a || this.points.length - n;
    for (const r of o)
      i &= s(t, this, r, {
        start: n,
        end: n + a - 1
      });
    return !!i;
  }
  draw(t, n, a, o) {
    const s = this.options || {};
    (this.points || []).length && s.borderWidth && (t.save(), Tu(t, this, a, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Ms(e, t, n, a) {
  const o = e.options, { [n]: s } = e.getProps([
    n
  ], a);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class Lu extends Ft {
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
    const o = this.options, { x: s, y: i } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(t - s, 2) + Math.pow(n - i, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(t, n) {
    return Ms(this, t, "x", n);
  }
  inYRange(t, n) {
    return Ms(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Yn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ga(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Yi(e, t) {
  const { x: n, y: a, base: o, width: s, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, c, d, h;
  return e.horizontal ? (h = i / 2, r = Math.min(n, o), l = Math.max(n, o), c = a - h, d = a + h) : (h = s / 2, r = n - h, l = n + h, c = Math.min(a, o), d = Math.max(a, o)), {
    left: r,
    top: c,
    right: l,
    bottom: d
  };
}
function Ht(e, t, n, a) {
  return e ? 0 : et(t, n, a);
}
function Pu(e, t, n) {
  const a = e.options.borderWidth, o = e.borderSkipped, s = wi(a);
  return {
    t: Ht(o.top, s.top, 0, n),
    r: Ht(o.right, s.right, 0, t),
    b: Ht(o.bottom, s.bottom, 0, n),
    l: Ht(o.left, s.left, 0, t)
  };
}
function Ru(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = xn(o), i = Math.min(t, n), r = e.borderSkipped, l = a || Te(o);
  return {
    topLeft: Ht(!l || r.top || r.left, s.topLeft, 0, i),
    topRight: Ht(!l || r.top || r.right, s.topRight, 0, i),
    bottomLeft: Ht(!l || r.bottom || r.left, s.bottomLeft, 0, i),
    bottomRight: Ht(!l || r.bottom || r.right, s.bottomRight, 0, i)
  };
}
function Eu(e) {
  const t = Yi(e), n = t.right - t.left, a = t.bottom - t.top, o = Pu(e, n / 2, a / 2), s = Ru(e, n / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: n,
      h: a,
      radius: s
    },
    inner: {
      x: t.left + o.l,
      y: t.top + o.t,
      w: n - o.l - o.r,
      h: a - o.t - o.b,
      radius: {
        topLeft: Math.max(0, s.topLeft - Math.max(o.t, o.l)),
        topRight: Math.max(0, s.topRight - Math.max(o.t, o.r)),
        bottomLeft: Math.max(0, s.bottomLeft - Math.max(o.b, o.l)),
        bottomRight: Math.max(0, s.bottomRight - Math.max(o.b, o.r))
      }
    }
  };
}
function Na(e, t, n, a) {
  const o = t === null, s = n === null, r = e && !(o && s) && Yi(e, a);
  return r && (o || Nt(t, r.left, r.right)) && (s || Nt(n, r.top, r.bottom));
}
function Iu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Fu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function ja(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, o = e.y !== n.y ? -t : 0, s = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - o;
  return {
    x: e.x + a,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class Ou extends Ft {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: o } } = this, { inner: s, outer: i } = Eu(this), r = Iu(i.radius) ? ya : Fu;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), r(t, ja(i, n, s)), t.clip(), r(t, ja(s, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), r(t, ja(s, n)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return Na(this, t, n, a);
  }
  inXRange(t, n) {
    return Na(this, t, null, n);
  }
  inYRange(t, n) {
    return Na(this, null, t, n);
  }
  getCenterPoint(t) {
    const { x: n, y: a, base: o, horizontal: s } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: s ? (n + o) / 2 : n,
      y: s ? a : (a + o) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
const Ds = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, Vu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class As extends Ft {
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
    t.filter && (n = n.filter((a) => t.filter(a, this.chart.data))), t.sort && (n = n.sort((a, o) => t.sort(a, o, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, o = tt(a.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Ds(a, s);
    let c, d;
    n.font = o.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, s, r, l) + 10) : (d = this.maxHeight, c = this._fitCols(i, o, r, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = o + r;
    let h = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let f = -1, m = -d;
    return this.legendItems.forEach((g, v) => {
      const y = a + n / 2 + s.measureText(g.text).width;
      (v === 0 || c[c.length - 1] + y + 2 * r > i) && (h += d, c[c.length - (v > 0 ? 0 : 1)] = 0, m += d, f++), l[v] = {
        left: 0,
        top: m,
        row: f,
        width: y,
        height: o
      }, c[c.length - 1] += y + r;
    }), h;
  }
  _fitCols(t, n, a, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = r, f = 0, m = 0, g = 0, v = 0;
    return this.legendItems.forEach((y, b) => {
      const { itemWidth: _, itemHeight: x } = zu(a, n, s, y, o);
      b > 0 && m + x + 2 * r > d && (h += f + r, c.push({
        width: f,
        height: m
      }), g += f + r, v++, f = m = 0), l[b] = {
        left: g,
        top: m,
        col: v,
        width: _,
        height: x
      }, f = Math.max(f, _), m += x + r;
    }), h += f, c.push({
      width: f,
      height: m
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: o }, rtl: s } } = this, i = _n(s, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = Qe(a, this.left + o, this.right - this.lineWidths[r]);
      for (const c of n)
        r !== c.row && (r = c.row, l = Qe(a, this.left + o, this.right - this.lineWidths[r])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(l), c.width), l += c.width + o;
    } else {
      let r = 0, l = Qe(a, this.top + t + o, this.bottom - this.columnSizes[r].height);
      for (const c of n)
        c.col !== r && (r = c.col, l = Qe(a, this.top + t + o, this.bottom - this.columnSizes[r].height)), c.top = l, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), l += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      co(t, this), this._draw(), uo(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: o } = this, { align: s, labels: i } = t, r = Ke.color, l = _n(t.rtl, this.left, this.width), c = tt(i.font), { padding: d } = i, h = c.size, f = h / 2;
    let m;
    this.drawTitle(), o.textAlign = l.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: g, boxHeight: v, itemHeight: y } = Ds(i, h), b = function(S, M, V) {
      if (isNaN(g) || g <= 0 || isNaN(v) || v < 0)
        return;
      o.save();
      const j = $e(V.lineWidth, 1);
      if (o.fillStyle = $e(V.fillStyle, r), o.lineCap = $e(V.lineCap, "butt"), o.lineDashOffset = $e(V.lineDashOffset, 0), o.lineJoin = $e(V.lineJoin, "miter"), o.lineWidth = j, o.strokeStyle = $e(V.strokeStyle, r), o.setLineDash($e(V.lineDash, [])), i.usePointStyle) {
        const B = {
          radius: v * Math.SQRT2 / 2,
          pointStyle: V.pointStyle,
          rotation: V.rotation,
          borderWidth: j
        }, T = l.xPlus(S, g / 2), D = M + f;
        ki(o, B, T, D, i.pointStyleWidth && g);
      } else {
        const B = M + Math.max((h - v) / 2, 0), T = l.leftForLtr(S, g), D = xn(V.borderRadius);
        o.beginPath(), Object.values(D).some((P) => P !== 0) ? ya(o, {
          x: T,
          y: B,
          w: g,
          h: v,
          radius: D
        }) : o.rect(T, B, g, v), o.fill(), j !== 0 && o.stroke();
      }
      o.restore();
    }, _ = function(S, M, V) {
      Un(o, V.text, S, M + y / 2, c, {
        strikethrough: V.hidden,
        textAlign: l.textAlign(V.textAlign)
      });
    }, x = this.isHorizontal(), w = this._computeTitleHeight();
    x ? m = {
      x: Qe(s, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : m = {
      x: this.left + d,
      y: Qe(s, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, Ai(this.ctx, t.textDirection);
    const $ = y + d;
    this.legendItems.forEach((S, M) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const V = o.measureText(S.text).width, j = l.textAlign(S.textAlign || (S.textAlign = i.textAlign)), B = g + f + V;
      let T = m.x, D = m.y;
      l.setWidth(this.width), x ? M > 0 && T + B + d > this.right && (D = m.y += $, m.line++, T = m.x = Qe(s, this.left + d, this.right - a[m.line])) : M > 0 && D + $ > this.bottom && (T = m.x = T + n[m.line].width + d, m.line++, D = m.y = Qe(s, this.top + w + d, this.bottom - n[m.line].height));
      const P = l.x(T);
      if (b(P, D, S), T = $l(j, T + g + f, x ? T + B : this.right, t.rtl), _(l.x(T), D, S), x)
        m.x += B + d;
      else if (typeof S.text != "string") {
        const O = c.lineHeight;
        m.y += Ui(S, O) + d;
      } else
        m.y += $;
    }), Ti(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = tt(n.font), o = bt(n.padding);
    if (!n.display)
      return;
    const s = _n(t.rtl, this.left, this.width), i = this.ctx, r = n.position, l = a.size / 2, c = o.top + l;
    let d, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), d = this.top + c, h = Qe(t.align, h, this.right - f);
    else {
      const g = this.columnSizes.reduce((v, y) => Math.max(v, y.height), 0);
      d = c + Qe(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const m = Qe(r, h, h + f);
    i.textAlign = s.textAlign(io(r)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Un(i, n.text, m, d, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = tt(t.font), a = bt(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, o, s;
    if (Nt(t, this.left, this.right) && Nt(n, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, a = 0; a < s.length; ++a)
        if (o = s[a], Nt(t, o.left, o.left + o.width) && Nt(n, o.top, o.top + o.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!Hu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = Vu(o, a);
      o && !s && Fe(n.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = a, a && !s && Fe(n.onHover, [
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
function zu(e, t, n, a, o) {
  const s = Nu(a, e, t, n), i = ju(o, a, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function Nu(e, t, n, a) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + n.size / 2 + a.measureText(o).width;
}
function ju(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Ui(t, n)), a;
}
function Ui(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function Hu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var yo = {
  id: "legend",
  _element: As,
  start(e, t, n) {
    const a = e.legend = new As({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    pt.configure(e, a, n), pt.addBox(e, a);
  },
  stop(e) {
    pt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    pt.configure(e, a, n), a.options = n;
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
      const a = t.datasetIndex, o = n.chart;
      o.isDatasetVisible(a) ? (o.hide(a), t.hidden = !0) : (o.show(a), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: a, textAlign: o, color: s, useBorderRadius: i, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(n ? 0 : void 0), d = bt(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: s,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: a || c.pointStyle,
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
class qi extends Ft {
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
    const o = qe(a.text) ? a.text.length : 1;
    this._padding = bt(a.padding);
    const s = o * tt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: o, right: s, options: i } = this, r = i.align;
    let l = 0, c, d, h;
    return this.isHorizontal() ? (d = Qe(r, a, s), h = n + t, c = s - a) : (i.position === "left" ? (d = a + t, h = Qe(r, o, n), l = Ee * -0.5) : (d = s - t, h = Qe(r, n, o), l = Ee * 0.5), c = o - n), {
      titleX: d,
      titleY: h,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const a = tt(n.font), s = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(s);
    Un(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: l,
      rotation: c,
      textAlign: io(n.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function Wu(e, t) {
  const n = new qi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  pt.configure(e, n, t), pt.addBox(e, n), e.titleBlock = n;
}
var Xi = {
  id: "title",
  _element: qi,
  start(e, t, n) {
    Wu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    pt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    pt.configure(e, a, n), a.options = n;
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
const En = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        a.add(l.x), o += l.y, ++s;
      }
    }
    return s === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((r, l) => r + l) / a.size,
      y: o / s
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, o = Number.POSITIVE_INFINITY, s, i, r;
    for (s = 0, i = e.length; s < i; ++s) {
      const l = e[s].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), d = qa(t, c);
        d < o && (o = d, r = l);
      }
    }
    if (r) {
      const l = r.tooltipPosition();
      n = l.x, a = l.y;
    }
    return {
      x: n,
      y: a
    };
  }
};
function $t(e, t) {
  return t && (qe(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Pt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Ku(e, t) {
  const { element: n, datasetIndex: a, index: o } = t, s = e.getDatasetMeta(a).controller, { label: i, value: r } = s.getLabelAndValue(o);
  return {
    chart: e,
    label: i,
    parsed: s.getParsed(o),
    raw: e.data.datasets[a].data[o],
    formattedValue: r,
    dataset: s.getDataset(),
    dataIndex: o,
    datasetIndex: a,
    element: n
  };
}
function Ts(e, t) {
  const n = e.chart.ctx, { body: a, footer: o, title: s } = e, { boxWidth: i, boxHeight: r } = t, l = tt(t.bodyFont), c = tt(t.titleFont), d = tt(t.footerFont), h = s.length, f = o.length, m = a.length, g = bt(t.padding);
  let v = g.height, y = 0, b = a.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (b += e.beforeBody.length + e.afterBody.length, h && (v += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const w = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    v += m * w + (b - m) * l.lineHeight + (b - 1) * t.bodySpacing;
  }
  f && (v += t.footerMarginTop + f * d.lineHeight + (f - 1) * t.footerSpacing);
  let _ = 0;
  const x = function(w) {
    y = Math.max(y, n.measureText(w).width + _);
  };
  return n.save(), n.font = c.string, Re(e.title, x), n.font = l.string, Re(e.beforeBody.concat(e.afterBody), x), _ = t.displayColors ? i + 2 + t.boxPadding : 0, Re(a, (w) => {
    Re(w.before, x), Re(w.lines, x), Re(w.after, x);
  }), _ = 0, n.font = d.string, Re(e.footer, x), n.restore(), y += g.width, {
    width: y,
    height: v
  };
}
function Yu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function Uu(e, t, n, a) {
  const { x: o, width: s } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function qu(e, t, n, a) {
  const { x: o, width: s } = n, { width: i, chartArea: { left: r, right: l } } = e;
  let c = "center";
  return a === "center" ? c = o <= (r + l) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), Uu(c, e, t, n) && (c = "center"), c;
}
function Bs(e, t, n) {
  const a = n.yAlign || t.yAlign || Yu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || qu(e, t, n, a),
    yAlign: a
  };
}
function Xu(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function Gu(e, t, n) {
  let { y: a, height: o } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= o + n : a -= o / 2, a;
}
function Ls(e, t, n, a) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: r, yAlign: l } = n, c = o + s, { topLeft: d, topRight: h, bottomLeft: f, bottomRight: m } = xn(i);
  let g = Xu(t, r);
  const v = Gu(t, l, c);
  return l === "center" ? r === "left" ? g += c : r === "right" && (g -= c) : r === "left" ? g -= Math.max(d, f) + o : r === "right" && (g += Math.max(h, m) + o), {
    x: et(g, 0, a.width - t.width),
    y: et(v, 0, a.height - t.height)
  };
}
function da(e, t, n) {
  const a = bt(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Ps(e) {
  return $t([], Pt(e));
}
function Zu(e, t, n) {
  return gn(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Rs(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Gi = {
  beforeTitle: Bt,
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
  afterTitle: Bt,
  beforeBody: Bt,
  beforeLabel: Bt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return Pe(n) || (t += n), t;
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
  afterLabel: Bt,
  afterBody: Bt,
  beforeFooter: Bt,
  footer: Bt,
  afterFooter: Bt
};
function ot(e, t, n, a) {
  const o = e[t].call(n, a);
  return typeof o > "u" ? Gi[t].call(n, a) : o;
}
class Es extends Ft {
  static positioners = En;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), o = a.enabled && n.options.animation && a.animations, s = new Li(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Zu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, o = ot(a, "beforeTitle", this, t), s = ot(a, "title", this, t), i = ot(a, "afterTitle", this, t);
    let r = [];
    return r = $t(r, Pt(o)), r = $t(r, Pt(s)), r = $t(r, Pt(i)), r;
  }
  getBeforeBody(t, n) {
    return Ps(ot(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, o = [];
    return Re(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = Rs(a, s);
      $t(i.before, Pt(ot(r, "beforeLabel", this, s))), $t(i.lines, ot(r, "label", this, s)), $t(i.after, Pt(ot(r, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, n) {
    return Ps(ot(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, o = ot(a, "beforeFooter", this, t), s = ot(a, "footer", this, t), i = ot(a, "afterFooter", this, t);
    let r = [];
    return r = $t(r, Pt(o)), r = $t(r, Pt(s)), r = $t(r, Pt(i)), r;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, o = [], s = [], i = [];
    let r = [], l, c;
    for (l = 0, c = n.length; l < c; ++l)
      r.push(Ku(this.chart, n[l]));
    return t.filter && (r = r.filter((d, h, f) => t.filter(d, h, f, a))), t.itemSort && (r = r.sort((d, h) => t.itemSort(d, h, a))), Re(r, (d) => {
      const h = Rs(t.callbacks, d);
      o.push(ot(h, "labelColor", this, d)), s.push(ot(h, "labelPointStyle", this, d)), i.push(ot(h, "labelTextColor", this, d));
    }), this.labelColors = o, this.labelPointStyles = s, this.labelTextColors = i, this.dataPoints = r, r;
  }
  update(t, n) {
    const a = this.options.setContext(this.getContext()), o = this._active;
    let s, i = [];
    if (!o.length)
      this.opacity !== 0 && (s = {
        opacity: 0
      });
    else {
      const r = En[a.position].call(this, o, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const l = this._size = Ts(this, a), c = Object.assign({}, r, l), d = Bs(this.chart, a, c), h = Ls(a, c, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, s = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, s && this._resolveAnimations().update(this, s), t && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: n
    });
  }
  drawCaret(t, n, a, o) {
    const s = this.getCaretPosition(t, a, o);
    n.lineTo(s.x1, s.y1), n.lineTo(s.x2, s.y2), n.lineTo(s.x3, s.y3);
  }
  getCaretPosition(t, n, a) {
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: r } = a, { topLeft: l, topRight: c, bottomLeft: d, bottomRight: h } = xn(r), { x: f, y: m } = t, { width: g, height: v } = n;
    let y, b, _, x, w, $;
    return s === "center" ? (w = m + v / 2, o === "left" ? (y = f, b = y - i, x = w + i, $ = w - i) : (y = f + g, b = y + i, x = w - i, $ = w + i), _ = y) : (o === "left" ? b = f + Math.max(l, d) + i : o === "right" ? b = f + g - Math.max(c, h) - i : b = this.caretX, s === "top" ? (x = m, w = x - i, y = b - i, _ = b + i) : (x = m + v, w = x + i, y = b + i, _ = b - i), $ = x), {
      x1: y,
      x2: b,
      x3: _,
      y1: x,
      y2: w,
      y3: $
    };
  }
  drawTitle(t, n, a) {
    const o = this.title, s = o.length;
    let i, r, l;
    if (s) {
      const c = _n(a.rtl, this.x, this.width);
      for (t.x = da(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = tt(a.titleFont), r = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, l = 0; l < s; ++l)
        n.fillText(o[l], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === s && (t.y += a.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, n, a, o, s) {
    const i = this.labelColors[a], r = this.labelPointStyles[a], { boxHeight: l, boxWidth: c } = s, d = tt(s.bodyFont), h = da(this, "left", s), f = o.x(h), m = l < d.lineHeight ? (d.lineHeight - l) / 2 : 0, g = n.y + m;
    if (s.usePointStyle) {
      const v = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, y = o.leftForLtr(f, c) + c / 2, b = g + l / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, Ga(t, v, y, b), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ga(t, v, y, b);
    } else {
      t.lineWidth = Te(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const v = o.leftForLtr(f, c), y = o.leftForLtr(o.xPlus(f, 1), c - 2), b = xn(i.borderRadius);
      Object.values(b).some((_) => _ !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, ya(t, {
        x: v,
        y: g,
        w: c,
        h: l,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), ya(t, {
        x: y,
        y: g + 1,
        w: c - 2,
        h: l - 2,
        radius: b
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(v, g, c, l), t.strokeRect(v, g, c, l), t.fillStyle = i.backgroundColor, t.fillRect(y, g + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: d } = a, h = tt(a.bodyFont);
    let f = h.lineHeight, m = 0;
    const g = _n(a.rtl, this.x, this.width), v = function(V) {
      n.fillText(V, g.x(t.x + m), t.y + f / 2), t.y += f + s;
    }, y = g.textAlign(i);
    let b, _, x, w, $, S, M;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = da(this, y, a), n.fillStyle = a.bodyColor, Re(this.beforeBody, v), m = r && y !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, S = o.length; w < S; ++w) {
      for (b = o[w], _ = this.labelTextColors[w], n.fillStyle = _, Re(b.before, v), x = b.lines, r && x.length && (this._drawColorBox(n, t, w, g, a), f = Math.max(h.lineHeight, l)), $ = 0, M = x.length; $ < M; ++$)
        v(x[$]), f = h.lineHeight;
      Re(b.after, v);
    }
    m = 0, f = h.lineHeight, Re(this.afterBody, v), t.y -= s;
  }
  drawFooter(t, n, a) {
    const o = this.footer, s = o.length;
    let i, r;
    if (s) {
      const l = _n(a.rtl, this.x, this.width);
      for (t.x = da(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = l.textAlign(a.footerAlign), n.textBaseline = "middle", i = tt(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, r = 0; r < s; ++r)
        n.fillText(o[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, o) {
    const { xAlign: s, yAlign: i } = this, { x: r, y: l } = t, { width: c, height: d } = a, { topLeft: h, topRight: f, bottomLeft: m, bottomRight: g } = xn(o.cornerRadius);
    n.fillStyle = o.backgroundColor, n.strokeStyle = o.borderColor, n.lineWidth = o.borderWidth, n.beginPath(), n.moveTo(r + h, l), i === "top" && this.drawCaret(t, n, a, o), n.lineTo(r + c - f, l), n.quadraticCurveTo(r + c, l, r + c, l + f), i === "center" && s === "right" && this.drawCaret(t, n, a, o), n.lineTo(r + c, l + d - g), n.quadraticCurveTo(r + c, l + d, r + c - g, l + d), i === "bottom" && this.drawCaret(t, n, a, o), n.lineTo(r + m, l + d), n.quadraticCurveTo(r, l + d, r, l + d - m), i === "center" && s === "left" && this.drawCaret(t, n, a, o), n.lineTo(r, l + h), n.quadraticCurveTo(r, l, r + h, l), n.closePath(), n.fill(), o.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, o = a && a.x, s = a && a.y;
    if (o || s) {
      const i = En[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = Ts(this, t), l = Object.assign({}, i, this._size), c = Bs(n, t, l), d = Ls(t, l, c, n);
      (o._to !== d.x || s._to !== d.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = r.width, this.height = r.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, d));
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
    const o = {
      width: this.width,
      height: this.height
    }, s = {
      x: this.x,
      y: this.y
    };
    a = Math.abs(a) < 1e-3 ? 0 : a;
    const i = bt(n.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && r && (t.save(), t.globalAlpha = a, this.drawBackground(s, t, o, n), Ai(t, n.textDirection), s.y += i.top, this.drawTitle(s, t, n), this.drawBody(s, t, n), this.drawFooter(s, t, n), Ti(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, o = t.map(({ datasetIndex: r, index: l }) => {
      const c = this.chart.getDatasetMeta(r);
      if (!c)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: c.data[l],
        index: l
      };
    }), s = !ma(a, o), i = this._positionChanged(o, n);
    (s || i) && (this._active = o, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, n, a), r = this._positionChanged(i, t), l = n || !ma(i, s) || r;
    return l && (this._active = i, (o.enabled || o.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), l;
  }
  _getActiveElements(t, n, a, o) {
    const s = this.options;
    if (t.type === "mouseout")
      return [];
    if (!o)
      return n.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, s.mode, s, a);
    return s.reverse && i.reverse(), i;
  }
  _positionChanged(t, n) {
    const { caretX: a, caretY: o, options: s } = this, i = En[s.position].call(this, t, n);
    return i !== !1 && (a !== i.x || o !== i.y);
  }
}
var xo = {
  id: "tooltip",
  _element: Es,
  positioners: En,
  afterInit(e, t, n) {
    n && (e.tooltip = new Es({
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
    callbacks: Gi
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
const Qu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Ju(e, t, n, a) {
  const o = e.indexOf(t);
  if (o === -1)
    return Qu(e, t, n, a);
  const s = e.lastIndexOf(t);
  return o !== s ? n : o;
}
const eh = (e, t) => e === null ? null : et(Math.round(e), 0, t);
function Is(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Zi extends Cn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Is
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const a = this.getLabels();
      for (const { index: o, label: s } of n)
        a[o] === s && a.splice(o, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, n) {
    if (Pe(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Ju(a, t, $e(n, t), this._addedLabels), eh(n, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let { min: a, max: o } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), n || (o = this.getLabels().length - 1)), this.min = a, this.max = o;
  }
  buildTicks() {
    const t = this.min, n = this.max, a = this.options.offset, o = [];
    let s = this.getLabels();
    s = t === 0 && n === s.length - 1 ? s : s.slice(t, n + 1), this._valueRange = Math.max(s.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let i = t; i <= n; i++)
      o.push({
        value: i
      });
    return o;
  }
  getLabelForValue(t) {
    return Is.call(this, t);
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
function th(e, t) {
  const n = [], { bounds: o, step: s, min: i, max: r, precision: l, count: c, maxTicks: d, maxDigits: h, includeBounds: f } = e, m = s || 1, g = d - 1, { min: v, max: y } = t, b = !Pe(i), _ = !Pe(r), x = !Pe(c), w = (y - v) / (h + 1);
  let $ = Fo((y - v) / g / m) * m, S, M, V, j;
  if ($ < 1e-14 && !b && !_)
    return [
      {
        value: v
      },
      {
        value: y
      }
    ];
  j = Math.ceil(y / $) - Math.floor(v / $), j > g && ($ = Fo(j * $ / g / m) * m), Pe(l) || (S = Math.pow(10, l), $ = Math.ceil($ * S) / S), o === "ticks" ? (M = Math.floor(v / $) * $, V = Math.ceil(y / $) * $) : (M = v, V = y), b && _ && s && ml((r - i) / s, $ / 1e3) ? (j = Math.round(Math.min((r - i) / $, d)), $ = (r - i) / j, M = i, V = r) : x ? (M = b ? i : M, V = _ ? r : V, j = c - 1, $ = (V - M) / j) : (j = (V - M) / $, Fn(j, Math.round(j), $ / 1e3) ? j = Math.round(j) : j = Math.ceil(j));
  const B = Math.max(Oo($), Oo(M));
  S = Math.pow(10, Pe(l) ? B : l), M = Math.round(M * S) / S, V = Math.round(V * S) / S;
  let T = 0;
  for (b && (f && M !== i ? (n.push({
    value: i
  }), M < i && T++, Fn(Math.round((M + T * $) * S) / S, i, Fs(i, w, e)) && T++) : M < i && T++); T < j; ++T) {
    const D = Math.round((M + T * $) * S) / S;
    if (_ && D > r)
      break;
    n.push({
      value: D
    });
  }
  return _ && f && V !== r ? n.length && Fn(n[n.length - 1].value, r, Fs(r, w, e)) ? n[n.length - 1].value = r : n.push({
    value: r
  }) : (!_ || V === r) && n.push({
    value: V
  }), n;
}
function Fs(e, t, { horizontal: n, minRotation: a }) {
  const o = Et(a), s = (n ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class nh extends Cn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return Pe(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (l) => o = n ? o : l, r = (l) => s = a ? s : l;
    if (t) {
      const l = At(o), c = At(s);
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
    let { maxTicksLimit: n, stepSize: a } = t, o;
    return a ? (o = Math.ceil(this.max / a) - Math.floor(this.min / a) + 1, o > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${o} ticks. Limiting to 1000.`), o = 1e3)) : (o = this.computeTickLimit(), n = n || 11), n && (o = Math.min(n, o)), o;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let a = this.getTickLimit();
    a = Math.max(2, a);
    const o = {
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
    }, s = this._range || this, i = th(o, s);
    return t.bounds === "ticks" && bl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, a = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const o = (a - n) / Math.max(t.length - 1, 1) / 2;
      n -= o, a += o;
    }
    this._startValue = n, this._endValue = a, this._valueRange = a - n;
  }
  getLabelForValue(t) {
    return lo(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Qi extends nh {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: _i.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = mt(t) ? t : 0, this.max = mt(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = Et(this.options.ticks.minRotation), o = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Da = {
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
}, rt = /* @__PURE__ */ Object.keys(Da);
function Os(e, t) {
  return e - t;
}
function Vs(e, t) {
  if (Pe(t))
    return null;
  const n = e._adapter, { parser: a, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), mt(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (o && (i = o === "week" && (Wn(s) || s === !0) ? n.startOf(i, "isoWeek", s) : n.startOf(i, o)), +i);
}
function zs(e, t, n, a) {
  const o = rt.length;
  for (let s = rt.indexOf(e); s < o - 1; ++s) {
    const i = Da[rt[s]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (r * i.size)) <= a)
      return rt[s];
  }
  return rt[o - 1];
}
function ah(e, t, n, a, o) {
  for (let s = rt.length - 1; s >= rt.indexOf(n); s--) {
    const i = rt[s];
    if (Da[i].common && e._adapter.diff(o, a, i) >= t - 1)
      return i;
  }
  return rt[n ? rt.indexOf(n) : 0];
}
function oh(e) {
  for (let t = rt.indexOf(e) + 1, n = rt.length; t < n; ++t)
    if (Da[rt[t]].common)
      return rt[t];
}
function Ns(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: o } = so(n, t), s = n[a] >= t ? n[a] : n[o];
    e[s] = !0;
  }
}
function sh(e, t, n, a) {
  const o = e._adapter, s = +o.startOf(t[0].value, a), i = t[t.length - 1].value;
  let r, l;
  for (r = s; r <= i; r = +o.add(r, 1, a))
    l = n[r], l >= 0 && (t[l].major = !0);
  return t;
}
function js(e, t, n) {
  const a = [], o = {}, s = t.length;
  let i, r;
  for (i = 0; i < s; ++i)
    r = t[i], o[r] = i, a.push({
      value: r,
      major: !1
    });
  return s === 0 || !n ? a : sh(e, a, o, n);
}
class Hs extends Cn {
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
    const a = t.time || (t.time = {}), o = this._adapter = new id._date(t.adapters.date);
    o.init(n), In(a.displayFormats, o.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Vs(this, t);
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
    let { min: o, max: s, minDefined: i, maxDefined: r } = this.getUserBounds();
    function l(c) {
      !i && !isNaN(c.min) && (o = Math.min(o, c.min)), !r && !isNaN(c.max) && (s = Math.max(s, c.max));
    }
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), o = mt(o) && !isNaN(o) ? o : +n.startOf(Date.now(), a), s = mt(s) && !isNaN(s) ? s : +n.endOf(Date.now(), a) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const t = this.options, n = t.time, a = t.ticks, o = a.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && o.length && (this.min = this._userMin || o[0], this.max = this._userMax || o[o.length - 1]);
    const s = this.min, i = this.max, r = kl(o, s, i);
    return this._unit = n.unit || (a.autoSkip ? zs(n.minUnit, this.min, this.max, this._getLabelCapacity(s)) : ah(this, r.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : oh(this._unit), this.initOffsets(o), t.reverse && r.reverse(), js(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - o : n = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = s : a = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = et(n, 0, i), a = et(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, o = this.options, s = o.time, i = s.unit || zs(s.minUnit, n, a, this._getLabelCapacity(n)), r = $e(o.ticks.stepSize, 1), l = i === "week" ? s.isoWeekday : !1, c = Wn(l) || l === !0, d = {};
    let h = n, f, m;
    if (c && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * r)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + r + " " + i);
    const g = o.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, m = 0; f < a; f = +t.add(f, r, i), m++)
      Ns(d, f, g);
    return (f === a || o.bounds === "ticks" || m === 1) && Ns(d, f, g), Object.keys(d).sort(Os).map((v) => +v);
  }
  getLabelForValue(t) {
    const n = this._adapter, a = this.options.time;
    return a.tooltipFormat ? n.format(t, a.tooltipFormat) : n.format(t, a.displayFormats.datetime);
  }
  format(t, n) {
    const o = this.options.time.displayFormats, s = this._unit, i = n || o[s];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, n, a, o) {
    const s = this.options, i = s.ticks.callback;
    if (i)
      return Fe(i, [
        t,
        n,
        a
      ], this);
    const r = s.time.displayFormats, l = this._unit, c = this._majorUnit, d = l && r[l], h = c && r[c], f = a[n], m = c && h && f && f.major;
    return this._adapter.format(t, o || (m ? h : d));
  }
  generateTickLabels(t) {
    let n, a, o;
    for (n = 0, a = t.length; n < a; ++n)
      o = t[n], o.label = this._tickFormatFunction(o.value, n, t);
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, o = Et(this.isHorizontal() ? n.maxRotation : n.minRotation), s = Math.cos(o), i = Math.sin(o), r = this._resolveTickFontOptions(0).size;
    return {
      w: a * s + r * i,
      h: a * i + r * s
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, o = a[n.unit] || a.millisecond, s = this._tickFormatFunction(t, 0, js(this, [
      t
    ], this._majorUnit), o), i = this._getLabelSize(s), r = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, a;
    if (t.length)
      return t;
    const o = this.getMatchingVisibleMetas();
    if (this._normalized && o.length)
      return this._cache.data = o[0].controller.getAllParsedValues(this);
    for (n = 0, a = o.length; n < a; ++n)
      t = t.concat(o[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, a;
    if (t.length)
      return t;
    const o = this.getLabels();
    for (n = 0, a = o.length; n < a; ++n)
      t.push(Vs(this, o[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return vi(t.sort(Os));
  }
}
function ua(e, t, n) {
  let a = 0, o = e.length - 1, s, i, r, l;
  n ? (t >= e[a].pos && t <= e[o].pos && ({ lo: a, hi: o } = cn(e, "pos", t)), { pos: s, time: r } = e[a], { pos: i, time: l } = e[o]) : (t >= e[a].time && t <= e[o].time && ({ lo: a, hi: o } = cn(e, "time", t)), { time: s, pos: r } = e[a], { time: i, pos: l } = e[o]);
  const c = i - s;
  return c ? r + (l - r) * (t - s) / c : r;
}
class xS extends Hs {
  static id = "timeseries";
  static defaults = Hs.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = ua(n, this.min), this._tableRange = ua(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, o = [], s = [];
    let i, r, l, c, d;
    for (i = 0, r = t.length; i < r; ++i)
      c = t[i], c >= n && c <= a && o.push(c);
    if (o.length < 2)
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
    for (i = 0, r = o.length; i < r; ++i)
      d = o[i + 1], l = o[i - 1], c = o[i], Math.round((d + l) / 2) !== c && s.push({
        time: c,
        pos: i / (r - 1)
      });
    return s;
  }
  _generate() {
    const t = this.min, n = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(t) || !a.length) && a.splice(0, 0, t), (!a.includes(n) || a.length === 1) && a.push(n), a.sort((o, s) => o - s);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return n.length && a.length ? t = this.normalize(n.concat(a)) : t = n.length ? n : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (ua(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return ua(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Ji = {
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
}, ih = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, rh = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Ji,
  ...ih
}, lh = Br[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function yn(e) {
  return ii(e) ? Ya(e) : e;
}
function ch(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return ii(t) ? new Proxy(e, {}) : e;
}
function dh(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function er(e, t) {
  e.labels = t;
}
function tr(e, t, n) {
  const a = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[n] === o[n]);
    return !s || !o.data || a.includes(s) ? {
      ...o
    } : (a.push(s), Object.assign(s, o), s);
  });
}
function uh(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return er(n, e.labels), tr(n, e.datasets, t), n;
}
const hh = re({
  props: rh,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const o = ae(null), s = si(null);
    n({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: d, options: h, plugins: f, datasetIdKey: m } = e, g = uh(d, m), v = ch(g, d);
      s.value = new Zt(o.value, {
        type: c,
        data: v,
        options: {
          ...h
        },
        plugins: f
      });
    }, r = () => {
      const c = Ya(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, l = (c) => {
      c.update(e.updateMode);
    };
    return Ze(i), lt(r), Ie([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, f] = c, [m, g] = d;
      const v = Ya(s.value);
      if (!v)
        return;
      let y = !1;
      if (h) {
        const b = yn(h), _ = yn(m);
        b && b !== _ && (dh(v, b), y = !0);
      }
      if (f) {
        const b = yn(f.labels), _ = yn(g.labels), x = yn(f.datasets), w = yn(g.datasets);
        b !== _ && (er(v.config.data, b), y = !0), x && x !== w && (tr(v.config.data, x, e.datasetIdKey), y = !0);
      }
      y && je(() => {
        l(v);
      });
    }, {
      deep: !0
    }), () => ze("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      ze("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function _o(e, t) {
  return Zt.register(t), re({
    props: Ji,
    setup(n, a) {
      let { expose: o } = a;
      const s = si(null), i = (r) => {
        s.value = r?.chart;
      };
      return o({
        chart: s
      }), () => ze(hh, lh({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const fh = /* @__PURE__ */ _o("bar", td), gh = /* @__PURE__ */ _o("line", od), ph = /* @__PURE__ */ _o("pie", sd), Ws = {
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
}, Ks = {
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
}, mh = [
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
  const t = ae("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => e?.value ? e.value : t.value), s = C(() => o.value === "dark"), i = C(() => s.value ? Ks : Ws), r = () => {
    typeof document > "u" || (t.value = a(), n = new MutationObserver((c) => {
      for (const d of c)
        d.attributeName === "class" && (t.value = a());
    }), n.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    n && (n.disconnect(), n = null);
  };
  return Ze(() => {
    r();
  }), lt(() => {
    l();
  }), e && Ie(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Ws,
    darkColors: Ks,
    chartSeriesColors: mh
  };
}
const Xn = 5, ko = 8, bh = /^x\d*$/, vh = /^y\d*$/;
function nr(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const o of Object.keys(a)) {
    const s = a[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, r = i.ticks, l = r && typeof r == "object" ? { ...r } : {};
    if (bh.test(o) && (l.maxTicksLimit = ko, l.autoSkip = !0, l.minRotation = 0, l.maxRotation = 0, l.autoSkipPadding = l.autoSkipPadding ?? 8), vh.test(o)) {
      if (i.type === "category") {
        i.ticks = l, a[o] = i;
        continue;
      }
      if (Array.isArray(l.values) && l.values.length > 0)
        l.maxTicksLimit = l.values.length;
      else if (l.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), d = Number(i.max ?? i.suggestedMax ?? 0), h = Number(l.stepSize);
        d > c && h > 0 ? l.maxTicksLimit = Math.floor((d - c) / h) + 1 : l.maxTicksLimit = Xn;
      } else
        l.maxTicksLimit = Xn;
    }
    i.ticks = l, a[o] = i;
  }
  return t.scales = a, t;
}
const st = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", yh = ["titleFont", "bodyFont", "footerFont"];
function ar(e, t = st) {
  if (!e || typeof e != "object") return e;
  const n = { ...e }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: t }, n.scales && typeof n.scales == "object") {
    const o = { ...n.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
      if (!i || typeof i != "object") continue;
      const r = { ...i }, l = r.ticks;
      if (l && typeof l == "object") {
        const d = { ...l }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, r.ticks = d;
      }
      const c = r.title;
      if (c && typeof c == "object") {
        const d = { ...c }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, r.title = d;
      }
      o[s] = r;
    }
    n.scales = o;
  }
  if (n.plugins && typeof n.plugins == "object") {
    const o = { ...n.plugins }, s = o.legend;
    if (s && typeof s == "object") {
      const r = { ...s }, l = r.labels;
      if (l && typeof l == "object") {
        const c = { ...l }, d = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...d, family: t }, r.labels = c;
      }
      o.legend = r;
    }
    const i = o.tooltip;
    if (i && typeof i == "object") {
      const r = { ...i };
      for (const l of yh) {
        const c = r[l];
        c && typeof c == "object" && (r[l] = { ...c, family: t });
      }
      o.tooltip = r;
    }
    n.plugins = o;
  }
  return n;
}
const Ys = 10, xh = /* @__PURE__ */ re({
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
    const n = e;
    Zt.register(Zi, Qi, Ou, Xi, xo, yo), Zt.defaults.font.family = st;
    const { isDark: a, colors: o } = Me(Se(n, "theme")), s = C(() => n.data), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f) => typeof f != "string" ? f : n.uppercaseLegendLabels ? f.toUpperCase() : i(f), l = (f, m) => f.length <= m ? f : `${f.slice(0, Math.max(1, m - 1))}…`;
    function c(f, m) {
      if (m == null) return f;
      if (Array.isArray(m) || typeof m != "object" || f == null || Array.isArray(f) || typeof f != "object") return m;
      const g = { ...f };
      for (const v of Object.keys(m)) {
        const y = m[v];
        y !== void 0 && (g[v] = c(f[v], y));
      }
      return g;
    }
    const d = C(() => {
      const f = {
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
              boxWidth: Ys,
              boxHeight: Ys,
              usePointStyle: !1,
              generateLabels: function(g) {
                return g.data.datasets.map((y, b) => {
                  const _ = Array.isArray(y.backgroundColor) ? y.backgroundColor[0] : y.backgroundColor, x = Array.isArray(y.borderColor) ? y.borderColor[0] : y.borderColor, w = typeof x == "string" && x.length > 0 ? x : typeof _ == "string" && _.length > 0 ? _ : o.value.textSecondary;
                  return {
                    text: r(y.label || ""),
                    fillStyle: typeof _ == "string" ? _ : w,
                    strokeStyle: w,
                    lineWidth: 0,
                    fontColor: w,
                    hidden: !g.isDatasetVisible(b),
                    index: b,
                    datasetIndex: b
                  };
                });
              }
            }
          },
          tooltip: {
            enabled: !0,
            backgroundColor: o.value.tooltipBg,
            titleColor: o.value.tooltipText,
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
              title: function(g) {
                return g.length > 0 ? String(i(g[0].label)) : "";
              },
              label: function(g) {
                let v = String(i(g.dataset.label || ""));
                v && (v += ": ");
                const b = (g.chart?.options?.indexAxis ?? "x") === "y" ? g.parsed.x : g.parsed.y;
                return b != null && (v += b), v;
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
            stacked: n.stacked || !1,
            grid: {
              color: o.value.gridLines
            },
            ticks: {
              maxTicksLimit: Xn,
              font: {
                family: st,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(g) {
                return i(g);
              }
            }
          },
          x: {
            display: !0,
            stacked: n.stacked || !1,
            offset: !0,
            grid: {
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: ko,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: st,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(g) {
                const v = this.getLabelForValue(g);
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
      }, m = n.options ? c(f, n.options) : f;
      if (m.indexAxis === "y") {
        m.scales = m.scales ?? {}, m.scales.x = {
          type: "linear",
          beginAtZero: !0,
          ...m.scales.x
        };
        const { beginAtZero: g, ticks: v, ...y } = m.scales.y ?? {}, b = n.data.labels?.length ?? 0, _ = n.categoryLabelMaxLength ?? 20;
        m.scales.y = {
          type: "category",
          ...y,
          ticks: {
            ...v,
            autoSkip: !1,
            maxTicksLimit: b > 0 ? b : Xn,
            callback: function(x) {
              const w = this.getLabelForValue(x), $ = typeof w == "string" ? w : String(w ?? "");
              return l($, _);
            }
          }
        };
      }
      return ar(
        nr(m)
      );
    }), h = C(() => n.heightPx ?? 230);
    return t({ isDark: a }), (f, m) => (p(), k("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: we({ height: `${h.value}px` })
    }, [
      N(R(fh), {
        data: s.value,
        options: d.value
      }, null, 8, ["data", "options"])
    ], 4));
  }
}), me = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, o] of t)
    n[a] = o;
  return n;
}, kt = /* @__PURE__ */ me(xh, [["__scopeId", "data-v-1d64fb88"]]), _h = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, kh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, wh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Ch = ["aria-pressed", "aria-label", "onClick"], $h = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, Sh = /* @__PURE__ */ re({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Zt.register(
      Zi,
      Qi,
      Lu,
      Bu,
      Xi,
      xo,
      yo
    ), Zt.defaults.font.family = st;
    const a = ae(null), { isDark: o, colors: s } = Me(Se(n, "theme")), i = C(() => s.value.bgCard), r = C(() => {
      const y = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((b) => {
          const _ = b.borderColor, x = Array.isArray(_) ? _[0] : _, w = typeof x == "string" && x.length > 0 ? x : s.value.textSecondary, $ = b.pointBackgroundColor !== void 0 ? b.pointBackgroundColor : y, S = b.pointHoverBackgroundColor !== void 0 ? b.pointHoverBackgroundColor : $, M = b.pointBorderWidth ?? 2, V = b.pointHoverBorderWidth ?? M;
          return {
            ...b,
            fill: b.fill ?? !1,
            clip: b.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: S,
            pointBorderColor: b.pointBorderColor ?? w,
            pointHoverBorderColor: b.pointHoverBorderColor ?? w,
            pointBorderWidth: M,
            pointHoverBorderWidth: V
          };
        })
      };
    }), l = (y) => typeof y == "string" ? y.charAt(0).toUpperCase() + y.slice(1).toLowerCase() : y, c = (y) => typeof y != "string" ? y : n.uppercaseLegendLabels ? y.toUpperCase() : l(y);
    function d(y) {
      const b = y.borderColor, _ = Array.isArray(b) ? b[0] : b;
      return typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary;
    }
    const h = C(
      () => r.value.datasets.map((y, b) => ({
        key: `${y.label ?? "dataset"}-${b}`,
        label: c(y.label || ""),
        color: d(y)
      }))
    ), f = ae([]);
    Ie(
      () => r.value.datasets.length,
      (y) => {
        const b = Array.from({ length: y }, (_, x) => f.value[x] ?? !0);
        f.value = b;
      },
      { immediate: !0 }
    );
    function m(y) {
      const _ = a.value?.chart;
      if (!_ || y < 0 || y >= _.data.datasets.length) return;
      const x = !_.isDatasetVisible(y);
      _.setDatasetVisibility(y, x), f.value[y] = x, _.update();
    }
    function g(y, b) {
      if (b == null) return y;
      if (Array.isArray(b) || typeof b != "object" || y == null || Array.isArray(y) || typeof y != "object") return b;
      const _ = { ...y };
      for (const x of Object.keys(b)) {
        const w = b[x];
        w !== void 0 && (_[x] = g(y[x], w));
      }
      return _;
    }
    const v = C(() => {
      const y = {
        font: {
          family: st
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
              family: st,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: st,
              size: 13
            },
            callbacks: {
              title: function(x) {
                return x.length > 0 ? String(l(x[0].label)) : "";
              },
              label: function(x) {
                let w = String(l(x.dataset.label || ""));
                return w && (w += ": "), x.parsed.y !== null && (w += x.parsed.y), w;
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
              maxTicksLimit: ko,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: st,
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
              maxTicksLimit: Xn,
              font: {
                family: st,
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
      }, b = n.options ? g(y, n.options) : y;
      return ar(
        nr(b)
      );
    });
    return t({ isDark: o }), (y, b) => (p(), k("div", _h, [
      u("div", kh, [
        N(R(gh), {
          ref_key: "lineChartRef",
          ref: a,
          data: r.value,
          options: v.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (p(), k("ul", wh, [
        (p(!0), k(se, null, fe(h.value, (_, x) => (p(), k("li", {
          key: _.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: te(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", f.value[x] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: we({ color: _.color }),
            "aria-pressed": f.value[x] !== !1,
            "aria-label": `${_.label}. ${f.value[x] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => m(x)
          }, [
            u("span", $h, [
              b[0] || (b[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: we({ borderColor: _.color })
              }, null, 4),
              b[1] || (b[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, A(_.label), 1)
          ], 14, Ch)
        ]))), 128))
      ])) : z("", !0)
    ]));
  }
}), vt = /* @__PURE__ */ me(Sh, [["__scopeId", "data-v-426e23d5"]]), Mh = { class: "chart-container" }, Dh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ah = /* @__PURE__ */ re({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Zt.register(_u, xo, yo);
    const { isDark: a, colors: o } = Me(Se(n, "theme")), s = n.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = C(() => n.options ? n.options : {
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
              family: Dh,
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
              return c.labels.length && c.datasets.length ? c.labels.map((d, h) => {
                const m = l.getDatasetMeta(0).controller.getStyle(h), v = c.datasets[0].data[h], y = typeof m.backgroundColor == "string" && m.backgroundColor.length > 0 ? m.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(d)}: ${v}`,
                  fillStyle: m.backgroundColor,
                  strokeStyle: m.borderColor,
                  lineWidth: m.borderWidth,
                  lineDash: m.borderDash,
                  lineDashOffset: m.borderDashOffset,
                  lineJoin: m.borderJoinStyle,
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
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              const c = l.label || "", d = l.parsed || 0, h = l.dataset.data.reduce((m, g) => m + g, 0), f = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${f}%)`;
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
    return t({ isDark: a }), (l, c) => (p(), k("div", Mh, [
      N(R(ph), {
        data: R(s),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Aa = /* @__PURE__ */ me(Ah, [["__scopeId", "data-v-0f7806d6"]]), Th = { class: "chart-container" }, Bh = ["viewBox"], Lh = ["transform"], Ph = ["x", "width", "fill", "stroke"], Rh = ["fill"], Eh = ["x1", "y1", "x2", "y2", "stroke"], Ih = ["points", "fill"], Fh = ["x1", "y1", "x2", "y2", "stroke"], Oh = ["x", "y", "fill"], Vh = ["x1", "y1", "x2", "y2", "stroke"], zh = ["points", "fill"], Nh = ["transform"], jh = ["y1", "y2"], Hh = ["y1", "y2"], Wh = ["y1", "y2"], Kh = ["y1", "y2"], Yh = ["y", "height"], Uh = ["y1", "y2"], qh = ["y1", "y2"], Xh = ["y1", "y2"], Gh = ["y1", "y2"], Zh = ["y", "height"], Qh = ["cy", "stroke", "onMouseenter"], Jh = ["cy", "stroke", "onMouseenter"], ef = ["cy", "stroke", "onMouseenter"], tf = ["cy", "stroke", "onMouseenter"], nf = ["y1", "y2", "onMouseenter"], af = ["y1", "y2", "onMouseenter"], of = ["x", "y", "fill"], sf = ["x", "y", "fill"], rf = ["transform"], lf = { transform: "translate(-200, 0)" }, cf = ["stroke"], df = ["fill"], uf = { transform: "translate(-130, 0)" }, hf = ["stroke"], ff = ["fill"], gf = { transform: "translate(-60, 0)" }, pf = ["stroke"], mf = ["fill"], bf = { transform: "translate(10, 0)" }, vf = ["stroke"], yf = ["fill"], xf = { transform: "translate(80, 0)" }, _f = ["fill"], kf = { transform: "translate(150, 0)" }, wf = ["fill"], Cf = /* @__PURE__ */ re({
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
    const n = e, { isDark: a } = Me(Se(n, "theme")), o = C(() => ({
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
    })), s = ae({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, m) => {
      const g = f.currentTarget.closest("svg");
      if (!g) return;
      const v = g.getBoundingClientRect(), y = g.createSVGPoint();
      y.x = f.clientX - v.left, y.y = f.clientY - v.top, s.value = {
        visible: !0,
        x: y.x,
        y: y.y - 20,
        text: m
      };
    }, l = (f) => {
      if (s.value.visible) {
        const m = f.currentTarget, g = m.getBoundingClientRect(), v = m.createSVGPoint();
        v.x = f.clientX - g.left, v.y = f.clientY - g.top, s.value.x = v.x, s.value.y = v.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, d = () => {
      s.value.visible = !1;
    }, h = C(() => {
      const f = [], g = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let v = 1; v <= 10; v++) {
        const y = v, b = (y - 1) / 9, _ = n.chartMargin + g - b * g;
        f.push({ value: y, y: _ });
      }
      return f;
    });
    return t({ isDark: a }), (f, m) => (p(), k("div", Th, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: we(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        s.value.visible ? (p(), k("g", {
          key: 0,
          transform: `translate(${s.value.x}, ${s.value.y})`
        }, [
          u("rect", {
            x: -(s.value.text.length * 6 + 10),
            y: -16,
            width: s.value.text.length * 12 + 20,
            height: "24",
            fill: o.value.tooltipBg,
            rx: "6",
            stroke: o.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Ph),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, Rh)
        ], 8, Lh)) : z("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Eh),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, Ih),
        (p(!0), k(se, null, fe(h.value, (g, v) => (p(), k(se, { key: v }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Fh),
          u("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(g.value), 9, Oh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Vh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, zh),
        (p(!0), k(se, null, fe(e.boxplotData, (g, v) => (p(), k(se, { key: v }, [
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
              }, null, 8, jh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Hh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Wh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Kh),
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
              }, null, 8, Yh)
            ], 64)) : (p(), k(se, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Uh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, qh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Xh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Gh),
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
              }, null, 8, Zh)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Qh),
            u("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Jh),
            u("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, ef),
            u("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, tf),
            u("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (y) => r(y, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, nf),
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
              onMouseenter: (y) => r(y, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, af)) : z("", !0)
          ], 8, Nh),
          u("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(g.label)), 9, of),
          g.responseCount ? (p(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(g.responseCount), 9, sf)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (p(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", lf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, cf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, df)
          ]),
          u("g", uf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, hf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, ff)
          ]),
          u("g", gf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, pf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, mf)
          ]),
          u("g", bf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, vf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, yf)
          ]),
          u("g", xf, [
            m[0] || (m[0] = u("line", {
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, _f)
          ]),
          u("g", kf, [
            m[1] || (m[1] = u("line", {
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, wf)
          ])
        ], 8, rf)) : z("", !0)
      ], 44, Bh))
    ]));
  }
}), $f = /* @__PURE__ */ me(Cf, [["__scopeId", "data-v-9ac5c075"]]), Sf = { class: "chart-container" }, Mf = ["viewBox"], Df = ["x1", "y1", "x2", "y2", "stroke"], Af = ["points", "fill"], Tf = ["x1", "y1", "x2", "y2", "stroke"], Bf = ["x1", "y1", "x2", "y2", "stroke"], Lf = ["x", "y", "fill"], Pf = ["x", "y", "fill", "transform"], Rf = ["x1", "y1", "x2", "y2", "stroke"], Ef = ["points", "fill"], If = ["transform"], Ff = ["y1", "y2", "stroke", "onMouseenter"], Of = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Vf = ["x1", "y1", "x2", "y2", "onMouseenter"], zf = ["x1", "y1", "x2", "y2", "onMouseenter"], Nf = ["cy", "stroke", "onMouseenter"], jf = ["cy", "stroke", "onMouseenter"], Hf = ["x", "y", "fill"], Wf = ["x", "y", "fill"], Kf = ["transform"], Yf = { transform: "translate(-180, 0)" }, Uf = ["stroke"], qf = ["fill"], Xf = { transform: "translate(-120, 0)" }, Gf = ["fill"], Zf = { transform: "translate(-60, 0)" }, Qf = ["fill"], Jf = { transform: "translate(0, 0)" }, eg = ["stroke"], tg = ["fill"], ng = { transform: "translate(60, 0)" }, ag = ["fill"], og = { transform: "translate(130, 0)" }, sg = ["fill"], ig = ["transform"], rg = ["x", "y", "width", "height", "fill", "stroke"], lg = ["y", "fill"], cg = ["y", "fill"], ha = 10, dg = 14, Ha = 13, Us = 4, qs = 12, ug = /* @__PURE__ */ re({
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
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = ha + Ha + Us + qs + ha, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(_, x, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(_, 1) * x * $);
    }
    function l(_, x) {
      return Math.max(
        r(_.length, Ha, !0),
        r(x.length, qs, !1),
        52
      ) + dg * 2;
    }
    function c(_, x, w, $) {
      const S = w / 2, M = 6, V = Math.min(
        Math.max(_, S + M),
        n.chartWidth - S - M
      ), j = M + $ + 10, B = n.chartHeight - M + 10, T = Math.min(Math.max(x, j), B);
      return { x: V, y: T };
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
    })), h = ae({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), f = (_) => typeof _ == "string" ? _.charAt(0).toUpperCase() + _.slice(1).toLowerCase() : _, m = (_, x, w) => {
      const $ = _.currentTarget.closest("svg");
      if (!$) return;
      const S = $.getBoundingClientRect(), M = $.createSVGPoint();
      M.x = _.clientX - S.left, M.y = _.clientY - S.top;
      let V = f(x.label), j = "";
      switch (w) {
        case "body":
          j = `Q1: ${x.q1.toFixed(1)} | Q3: ${x.q3.toFixed(1)}`;
          break;
        case "wick":
          j = `Min: ${x.low.toFixed(1)} | Max: ${x.high.toFixed(1)}`;
          break;
        case "median":
          j = `Median: ${x.median.toFixed(1)}`;
          break;
        case "average":
          j = `Average: ${x.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          j = `Min: ${x.low.toFixed(1)}`;
          break;
        case "max":
          j = `Max: ${x.high.toFixed(1)}`;
          break;
      }
      const B = l(V, j), T = s;
      let D = M.x, P = M.y - 20;
      const O = c(D, P, B, T);
      D = O.x, P = O.y, h.value = {
        visible: !0,
        x: D,
        y: P,
        title: V,
        text: j,
        width: B,
        height: T
      };
    }, g = (_) => {
      if (h.value.visible) {
        const x = _.currentTarget, w = x.getBoundingClientRect(), $ = x.createSVGPoint();
        $.x = _.clientX - w.left, $.y = _.clientY - w.top;
        let S = $.x, M = $.y - 20;
        const V = c(S, M, h.value.width, h.value.height);
        h.value.x = V.x, h.value.y = V.y;
      }
    }, v = () => {
      h.value.visible = !1;
    }, y = () => {
      h.value.visible = !1;
    }, b = C(() => {
      const _ = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const S = $, M = (S - 1) / 9, V = n.chartMargin + w - M * w;
        _.push({ value: S, y: V });
      }
      return _;
    });
    return t({ isDark: a }), (_, x) => (p(), k("div", Sf, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: we(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: g,
        onMouseleave: v
      }, [
        x[4] || (x[4] = u("defs", null, [
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
        }, null, 8, Df),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Af),
        (p(!0), k(se, null, fe(b.value, (w, $) => (p(), k("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Tf))), 128)),
        (p(!0), k(se, null, fe(b.value, (w, $) => (p(), k(se, { key: $ }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Bf),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, Lf)
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
        }, A(f(e.yAxisLabel)), 9, Pf),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Rf),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Ef),
        (p(!0), k(se, null, fe(e.candlestickData, (w, $) => (p(), k(se, { key: $ }, [
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
              onMouseenter: (S) => m(S, w, "wick"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Ff),
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
              onMouseenter: (S) => m(S, w, "body"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Of),
            w.medianY ? (p(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => m(S, w, "median"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Vf)) : z("", !0),
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
              onMouseenter: (S) => m(S, w, "average"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, zf)) : z("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => m(S, w, "min"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Nf),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => m(S, w, "max"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, jf)
          ], 8, If),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(f(w.label)), 9, Hf),
          w.responseCount ? (p(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, Wf)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (p(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Yf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Uf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, qf)
          ]),
          u("g", Xf, [
            x[0] || (x[0] = u("rect", {
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
            }, " Q1 ", 8, Gf)
          ]),
          u("g", Zf, [
            x[1] || (x[1] = u("rect", {
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
            }, " Q3 ", 8, Qf)
          ]),
          u("g", Jf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, eg),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, tg)
          ]),
          u("g", ng, [
            x[2] || (x[2] = u("line", {
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
            }, " Avg ", 8, ag)
          ]),
          u("g", og, [
            x[3] || (x[3] = u("line", {
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
            }, " Median ", 8, sg)
          ])
        ], 8, Kf)) : z("", !0),
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
          }, null, 8, rg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ha,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, lg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ha + Ha + Us,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, cg)
        ], 8, ig)) : z("", !0)
      ], 44, Mf))
    ]));
  }
}), hg = /* @__PURE__ */ me(ug, [["__scopeId", "data-v-22efd66d"]]), fg = ["viewBox"], gg = ["x1", "y1", "x2", "y2", "stroke"], pg = ["x1", "y1", "x2", "y2", "stroke"], mg = ["points", "fill"], bg = ["x1", "y1", "x2", "y2", "stroke"], vg = ["x", "y", "fill"], yg = ["x", "y", "fill", "transform"], xg = ["x1", "y1", "x2", "y2", "stroke"], _g = ["points", "fill"], kg = ["x1", "y1", "x2", "y2", "stroke"], wg = ["x", "y", "fill"], Cg = ["x", "y", "fill"], $g = ["d"], Sg = ["x", "y", "width", "height", "onMouseenter"], Mg = ["x1", "y1", "x2", "y2"], Dg = ["x", "y"], Ag = ["x1", "y1", "x2", "y2"], Tg = ["x", "y"], Bg = ["x1", "y1", "x2", "y2"], Lg = ["x", "y"], Pg = ["x1", "y1", "x2", "y2"], Rg = ["x", "y"], Eg = ["x1", "y1", "x2", "y2"], Ig = ["x", "y"], Fg = ["x1", "y1", "x2", "y2"], Og = ["x", "y"], Vg = ["transform"], zg = { transform: "translate(-220, 0)" }, Ng = ["fill"], jg = { transform: "translate(-140, 0)" }, Hg = ["fill"], Wg = { transform: "translate(-80, 0)" }, Kg = ["fill"], Yg = { transform: "translate(-20, 0)" }, Ug = ["fill"], qg = { transform: "translate(60, 0)" }, Xg = ["fill"], Gg = { transform: "translate(130, 0)" }, Zg = ["fill"], Qg = { transform: "translate(180, 0)" }, Jg = ["fill"], ep = ["transform"], tp = ["x", "y", "width", "height", "fill", "stroke"], np = ["y", "fill"], ap = ["y", "fill"], fa = 10, op = 14, Wa = 13, Xs = 12, Gs = 4, sp = /* @__PURE__ */ re({
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
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = fa + Wa + Gs + Xs + fa, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(G, Y, J) {
      const ue = J ? 0.6 : 0.535;
      return Math.ceil(Math.max(G, 1) * Y * ue);
    }
    function l(G, Y) {
      return Math.max(
        r(G.length, Wa, !0),
        r(Y.length, Xs, !1),
        52
      ) + op * 2;
    }
    function c(G, Y, J, ue) {
      const pe = J / 2, F = 6, q = Math.min(
        Math.max(G, pe + F),
        n.chartWidth - pe - F
      ), oe = F + ue + 10, he = n.chartHeight - F + 10, be = Math.min(Math.max(Y, oe), he);
      return { x: q, y: be };
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
    })), h = ae({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), f = C(
      () => n.chartMarginRight ?? n.chartMargin
    ), m = C(() => n.chartMargin + n.plotInset), g = C(
      () => n.chartWidth - f.value - n.plotInset
    ), v = C(() => Math.max(g.value - m.value, 1)), y = C(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), b = C(() => v.value / 10 * 0.52);
    function _(G) {
      if (G < 1 || G > 10) return null;
      const Y = v.value / 10;
      return m.value + (G - 0.5) * Y;
    }
    const x = C(
      () => Array.from({ length: 10 }, (G, Y) => {
        const J = Y + 1, ue = _(J);
        return ue === null ? null : { score: J, x: ue };
      }).filter((G) => G !== null)
    ), w = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const G = Math.max(...n.histogram.map((J) => J.count || 0), 1), Y = Math.max(1, Math.ceil(G * 0.2));
      return G + Y;
    }), $ = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const G = n.averageScore || 0;
      let Y = 0, J = 0;
      if (n.histogram.forEach((pe) => {
        const F = pe.count || 0;
        Y += F;
        const q = pe.score - G;
        J += F * (q * q);
      }), Y === 0) return 1;
      const ue = J / Y;
      return Math.sqrt(ue) || 1;
    }), S = (G, Y, J) => {
      if (J === 0) return 0;
      const ue = 1 / (J * Math.sqrt(2 * Math.PI)), pe = -0.5 * Math.pow((G - Y) / J, 2);
      return ue * Math.exp(pe);
    }, M = C(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && $.value === 0) return null;
      const G = n.averageScore, Y = $.value, J = 100, pe = Math.max(...n.histogram.map((he) => he.count || 0), 1) / w.value * y.value;
      if (pe <= 0) return null;
      let F = 0;
      for (let he = 0; he <= J; he++) {
        const be = 1 + 9 * (he / J), ke = S(be, G, Y);
        ke > F && (F = ke);
      }
      if (F <= 0) return null;
      const q = pe / F, oe = [];
      for (let he = 0; he <= J; he++) {
        const be = 1 + 9 * (he / J), ke = S(be, G, Y) * q, Be = _(be);
        if (Be !== null) {
          const nt = n.chartHeight - n.chartBottomMargin - ke;
          oe.push(`${he === 0 ? "M" : "L"} ${Be} ${nt}`);
        }
      }
      return oe.join(" ");
    }), V = C(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const G = v.value / 10;
      return n.histogram.map((Y) => {
        const J = Number(Y.score);
        if (!Number.isFinite(J) || J < 1 || J > 10)
          return null;
        const ue = m.value + (J - 0.5) * G, pe = Y.count > 0 ? Y.count / w.value * y.value : 0, F = n.chartHeight - n.chartBottomMargin - pe;
        return {
          score: J,
          count: Y.count,
          x: ue,
          y: F,
          height: pe
        };
      }).filter((Y) => Y !== null);
    }), j = C(() => _(n.minScore)), B = C(() => _(n.maxScore)), T = C(() => _(n.q1Score)), D = C(() => _(n.medianScore)), P = C(() => _(n.q3Score)), O = C(() => _(n.averageScore)), Z = C(() => n.minScore), Q = C(() => n.maxScore), ne = C(() => n.q1Score), ie = C(() => n.medianScore), ge = C(() => n.q3Score), X = C(() => n.averageScore), L = C(() => {
      const G = [], Y = n.chartMargin - 8, J = 18;
      T.value !== null && G.push({
        x: T.value,
        y: Y,
        value: n.q1Score,
        label: `Q1: ${ne.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), D.value !== null && G.push({
        x: D.value,
        y: Y - J,
        value: n.medianScore,
        label: `Median: ${ie.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), O.value !== null && G.push({
        x: O.value,
        y: Y - J,
        value: n.averageScore,
        label: `Avg: ${X.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), P.value !== null && G.push({
        x: P.value,
        y: Y,
        value: n.q3Score,
        label: `Q3: ${ge.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), G.sort((F, q) => (F.x || 0) - (q.x || 0));
      const ue = [[], [], []];
      G.forEach((F) => {
        if (F.x === null) return;
        let q = -1;
        for (let oe = 0; oe < ue.length; oe++) {
          let he = !1;
          for (const be of ue[oe]) {
            if (be.x === null) continue;
            const ke = Math.abs(F.x - be.x), Be = (F.width + be.width) / 2 + 10;
            if (ke < Be) {
              he = !0;
              break;
            }
          }
          if (!he) {
            q = oe;
            break;
          }
        }
        q === -1 && (q = ue.length - 1), F.y = Y - q * J, ue[q].push(F);
      });
      const pe = 15;
      return G.forEach((F) => {
        F.y < pe && (F.y = pe);
      }), G;
    }), H = (G) => L.value.find((J) => J.id === G)?.y || n.chartMargin - 10, K = C(() => {
      const G = [];
      for (let J = 0; J <= 5; J++) {
        const ue = Math.round(w.value / 5 * J), pe = n.chartHeight - n.chartBottomMargin - J / 5 * y.value;
        G.push({ value: ue, y: pe });
      }
      return G;
    });
    function ce(G, Y, J) {
      const ue = G.createSVGPoint();
      ue.x = Y, ue.y = J;
      const pe = G.getScreenCTM();
      if (!pe) {
        const q = G.getBoundingClientRect();
        return { x: Y - q.left, y: J - q.top };
      }
      const F = ue.matrixTransform(pe.inverse());
      return { x: F.x, y: F.y };
    }
    const ve = (G, Y) => {
      n.interactive && I(G, Y);
    }, De = () => {
      n.interactive && de();
    }, I = (G, Y) => {
      const J = G.currentTarget.closest("svg");
      if (!J) return;
      const { x: ue, y: pe } = ce(J, G.clientX, G.clientY), F = `Score: ${Y.score}`, q = `Count: ${Number(Y.count ?? 0).toLocaleString()}`, oe = l(F, q), he = s, be = typeof Y?.x == "number" ? Y.x : ue;
      let ke = pe - 20;
      const Be = c(be, ke, oe, he);
      h.value = {
        visible: !0,
        x: Be.x,
        y: Be.y,
        title: F,
        text: q,
        width: oe,
        height: he,
        anchorX: typeof Y?.x == "number" ? Y.x : null
      };
    }, W = (G) => {
      if (n.interactive && h.value.visible) {
        const Y = G.currentTarget, { x: J, y: ue } = ce(Y, G.clientX, G.clientY), pe = h.value.anchorX, F = pe != null && Number.isFinite(pe) ? pe : J;
        let q = ue - 20;
        const oe = c(F, q, h.value.width, h.value.height);
        h.value.x = oe.x, h.value.y = oe.y;
      }
    }, U = () => {
      de();
    }, de = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (G, Y) => (p(), k("div", {
      class: te(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: we(`min-height: ${e.chartHeight}px;`),
        onMousemove: W,
        onMouseleave: U
      }, [
        Y[7] || (Y[7] = u("defs", null, [
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
        (p(!0), k(se, null, fe(K.value, (J, ue) => (p(), k("line", {
          key: `grid-${ue}`,
          x1: m.value,
          y1: J.y,
          x2: g.value,
          y2: J.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, gg))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, pg),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, mg),
        (p(!0), k(se, null, fe(K.value, (J, ue) => (p(), k(se, {
          key: `y-tick-${ue}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: J.y,
            x2: e.chartMargin,
            y2: J.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, bg),
          u("text", {
            x: e.chartMargin - 12,
            y: J.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(J.value), 9, vg)
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
        }, " Count ", 8, yg),
        u("line", {
          x1: m.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, xg),
        u("polygon", {
          points: `${g.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${g.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${g.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, _g),
        (p(!0), k(se, null, fe(x.value, (J) => (p(), k(se, {
          key: `tick-${J.score}`
        }, [
          u("line", {
            x1: J.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: J.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, kg),
          u("text", {
            x: J.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(J.score), 9, wg)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Cg),
        M.value ? (p(), k("path", {
          key: 0,
          d: M.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, $g)) : z("", !0),
        (p(!0), k(se, null, fe(V.value, (J, ue) => (p(), k("rect", {
          key: `bar-${ue}`,
          x: J.x - b.value / 2,
          y: J.y,
          width: b.value,
          height: J.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (pe) => ve(pe, J),
          onMouseleave: De,
          style: we({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Sg))), 128)),
        e.showStatLabels && j.value ? (p(), k("line", {
          key: 1,
          x1: j.value,
          y1: e.chartMargin,
          x2: j.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Mg)) : z("", !0),
        e.showStatLabels && j.value ? (p(), k("text", {
          key: 2,
          x: j.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(Z.value.toFixed(1)), 9, Dg)) : z("", !0),
        e.showStatLabels && T.value ? (p(), k("line", {
          key: 3,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Ag)) : z("", !0),
        e.showStatLabels && T.value ? (p(), k("text", {
          key: 4,
          x: T.value,
          y: H("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(ne.value.toFixed(1)), 9, Tg)) : z("", !0),
        e.showStatLabels && D.value ? (p(), k("line", {
          key: 5,
          x1: D.value,
          y1: e.chartMargin,
          x2: D.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Bg)) : z("", !0),
        e.showStatLabels && D.value ? (p(), k("text", {
          key: 6,
          x: D.value,
          y: H("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(ie.value.toFixed(1)), 9, Lg)) : z("", !0),
        e.showStatLabels && O.value ? (p(), k("line", {
          key: 7,
          x1: O.value,
          y1: e.chartMargin,
          x2: O.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Pg)) : z("", !0),
        e.showStatLabels && O.value ? (p(), k("text", {
          key: 8,
          x: O.value,
          y: H("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(X.value.toFixed(1)), 9, Rg)) : z("", !0),
        e.showStatLabels && P.value ? (p(), k("line", {
          key: 9,
          x1: P.value,
          y1: e.chartMargin,
          x2: P.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Eg)) : z("", !0),
        e.showStatLabels && P.value ? (p(), k("text", {
          key: 10,
          x: P.value,
          y: H("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(ge.value.toFixed(1)), 9, Ig)) : z("", !0),
        e.showStatLabels && B.value ? (p(), k("line", {
          key: 11,
          x1: B.value,
          y1: e.chartMargin,
          x2: B.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Fg)) : z("", !0),
        e.showStatLabels && B.value ? (p(), k("text", {
          key: 12,
          x: B.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(Q.value.toFixed(1)), 9, Og)) : z("", !0),
        e.showLegend ? (p(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", zg, [
            Y[0] || (Y[0] = u("line", {
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
            }, " Gaussian ", 8, Ng)
          ]),
          u("g", jg, [
            Y[1] || (Y[1] = u("line", {
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
            }, " Min ", 8, Hg)
          ]),
          u("g", Wg, [
            Y[2] || (Y[2] = u("line", {
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
            }, " Q1 ", 8, Kg)
          ]),
          u("g", Yg, [
            Y[3] || (Y[3] = u("line", {
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
            }, " Median ", 8, Ug)
          ]),
          u("g", qg, [
            Y[4] || (Y[4] = u("line", {
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
            }, " Avg ", 8, Xg)
          ]),
          u("g", Gg, [
            Y[5] || (Y[5] = u("line", {
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
            }, " Q3 ", 8, Zg)
          ]),
          u("g", Qg, [
            Y[6] || (Y[6] = u("line", {
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
            }, " Max ", 8, Jg)
          ])
        ], 8, Vg)) : z("", !0),
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
          }, null, 8, tp),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + fa,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, np),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + fa + Wa + Gs,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, ap)
        ], 8, ep)) : z("", !0)
      ], 44, fg))
    ], 2));
  }
}), or = /* @__PURE__ */ me(sp, [["__scopeId", "data-v-8f9da805"]]), ip = 639, sr = 1024;
function Zs(e) {
  return e < 640 ? "mobile" : e <= sr ? "tablet" : "desktop";
}
function rp() {
  const e = ae(
    typeof window > "u" ? "desktop" : Zs(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Zs(window.innerWidth));
  };
  let n = null, a = null, o = null, s = null;
  Ze(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${ip}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${sr}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, n.addEventListener("change", s), a.addEventListener("change", s), o.addEventListener("change", s));
  }), lt(() => {
    !s || !n || !a || !o || (n.removeEventListener("change", s), a.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = C(() => e.value === "mobile"), r = C(() => e.value === "tablet"), l = C(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: r,
    isDesktop: l
  };
}
const lp = { class: "chart-container" }, cp = {
  key: 0,
  class: "loading-state loading-overlay"
}, sn = 12, dp = /* @__PURE__ */ re({
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
    Ao.use([Pr, Rr, Er, Ir]);
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), { breakpoint: s } = rp(), i = ae(null), r = ae(!0), l = ae(!1);
    let c = null, d = null;
    const h = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "4%", bottom: "4%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, f = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, m = {
      success: 0,
      abandon: 1,
      error: 2
    }, g = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, v = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, y = C(() => {
      const I = s.value;
      return I === "mobile" ? {
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
      } : I === "tablet" ? {
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
    }), b = (I) => {
      const W = I.replace(/_/g, " ").replace(/\s+/g, " ").trim(), U = W.match(/^Failed:\s*(.+)$/i);
      return U ? `Failed:
${U[1].trim()}` : W;
    }, _ = (I, W) => {
      const U = I.trim();
      if (!U || W < 1 || U.length <= W) return U;
      const de = [];
      let G = 0;
      for (; G < U.length; ) {
        const Y = Math.min(G + W, U.length);
        if (Y >= U.length) {
          const pe = U.slice(G).trim();
          pe && de.push(pe);
          break;
        }
        const J = U.slice(G, Y), ue = J.lastIndexOf(" ");
        if (ue > 0)
          for (de.push(U.slice(G, G + ue).trim()), G += ue; G < U.length && U[G] === " "; ) G += 1;
        else
          de.push(J), G = Y;
      }
      return de.join(`
`);
    }, x = (I, W) => {
      const U = I.trim();
      return !U || W < 1 ? I : U.split(`
`).map((de) => _(de.trim(), W)).filter(Boolean).join(`
`);
    }, w = (I) => I.status ? I.status : g.test(I.name) ? "abandon" : v.test(I.name) ? "error" : "success", $ = (I) => I.originalValue ?? I.value, S = (I, W) => {
      const U = new Set(W.map((G) => G.target)), de = I.filter((G) => !U.has(G.name));
      for (const G of de) {
        if (typeof G.value == "number" && G.value > 0) return G.value;
        const Y = W.filter((J) => J.source === G.name);
        if (Y.length > 0)
          return Y.reduce((J, ue) => J + $(ue), 0);
      }
      return W.reduce((G, Y) => Math.max(G, $(Y)), 0);
    }, M = (I, W, U) => {
      if (U && typeof U.value == "number") return U.value;
      const de = W.filter((Y) => Y.target === I);
      return de.length > 0 ? de.reduce((Y, J) => Y + $(J), 0) : W.filter((Y) => Y.source === I).reduce((Y, J) => Y + $(J), 0);
    }, V = (I, W) => {
      const U = /* @__PURE__ */ new Map(), de = new Set(W.map((Y) => Y.target)), G = I.filter((Y) => !de.has(Y.name)).map((Y) => ({ name: Y.name, depth: 0 }));
      for (; G.length > 0; ) {
        const { name: Y, depth: J } = G.shift(), ue = U.get(Y);
        if (!(ue !== void 0 && ue >= J)) {
          U.set(Y, J);
          for (const pe of W)
            pe.source === Y && G.push({ name: pe.target, depth: J + 1 });
        }
      }
      for (const Y of I)
        U.has(Y.name) || U.set(Y.name, 0);
      return U;
    }, j = (I, W) => {
      const U = /* @__PURE__ */ new Map(), de = new Set(W.map((ue) => ue.target)), G = I.filter((ue) => !de.has(ue.name));
      let Y = 0;
      const J = (ue) => {
        let pe = ue;
        for (; pe && !U.has(pe); )
          U.set(pe, Y), Y += 1, pe = W.filter(
            (q) => q.source === pe && w({ name: q.target }) === "success"
          ).sort((q, oe) => $(oe) - $(q))[0]?.target;
      };
      return G.forEach((ue) => J(ue.name)), U;
    }, B = (I, W, U) => {
      const de = w(I);
      if (de === "success" && U.has(I.name))
        return U.get(I.name);
      if (de === "success") {
        const G = W.filter((J) => J.target === I.name);
        return 200 + (G.length ? Math.min(
          ...G.map(
            (J) => U.has(J.source) ? (U.get(J.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return de === "abandon" ? 1e3 : 2e3;
    }, T = (I, W) => {
      const U = V(I, W), de = j(I, W);
      return [...I].sort((G, Y) => {
        const J = U.get(G.name) ?? 0, ue = U.get(Y.name) ?? 0;
        if (J !== ue) return J - ue;
        const pe = m[w(G)], F = m[w(Y)];
        if (pe !== F) return pe - F;
        const q = B(G, W, de), oe = B(Y, W, de);
        return q !== oe ? q - oe : G.name.localeCompare(Y.name);
      });
    }, D = (I, W, U, de) => {
      const Y = x(I, de).split(`
`), J = W * 0.58, pe = Math.max(...Y.map((q) => q.length), 1) * J, F = Y.length * U;
      return {
        lines: Y,
        width: pe,
        height: F,
        nodeWidth: pe + sn * 2
      };
    }, P = (I, W) => W ? `${(I / W * 100).toFixed(1)}%` : "0.0%", O = (I, W, U, de, G) => {
      if (typeof I.label == "string" && I.label)
        return x(b(I.label), G);
      const Y = x(b(I.name), G);
      if (W === "success" && U > 0) {
        const J = M(I.name, de, I), ue = P(J, U);
        return `${Y}
(${ue})`;
      }
      return Y;
    }, Z = (I, W = 0) => {
      if (W > 0) return W;
      const U = I.match(/^(\d+(?:\.\d+)?)px$/);
      if (U) return Number(U[1]);
      const de = I.match(/^(\d+(?:\.\d+)?)vh$/);
      return de && typeof window < "u" ? Number(de[1]) / 100 * window.innerHeight : 500;
    }, Q = (I, W, U, de, G) => {
      if (!W.length || !I.length || G <= 0) return I;
      const Y = I.map((be) => ({ ...be })), J = U.labelLineHeight || Math.round(U.labelFontSize * 1.25), ue = Math.max(4, U.labelCharsPerLine), pe = Math.max(de * 0.88, 260), F = V(W, Y), q = /* @__PURE__ */ new Map();
      W.forEach((be) => {
        const ke = F.get(be.name) ?? 0;
        q.set(ke, (q.get(ke) ?? 0) + 1);
      });
      const oe = (be) => {
        const Be = W.find((tn) => tn.name === be)?.displayLabel || be, ft = D(Be, U.labelFontSize, J, ue).height + sn * 2, en = F.get(be) ?? 0, wt = q.get(en) ?? 1, mn = (Math.max(wt, 1) - 1) * U.nodeGap / Math.max(wt, 1), Ta = Math.max(pe - mn, ft);
        return Math.max(1, ft / Ta * G);
      }, he = (be) => {
        const ke = Y.filter((Be) => Be.target === be);
        return ke.length > 0 ? ke.reduce((Be, nt) => Be + nt.value, 0) : Y.filter((Be) => Be.source === be).reduce((Be, nt) => Be + nt.value, 0);
      };
      for (let be = 0; be < 16; be += 1) {
        let ke = !1;
        for (const Be of W) {
          const nt = oe(Be.name), ft = he(Be.name);
          if (ft >= nt) continue;
          const en = Y.filter((tn) => tn.target === Be.name), wt = Y.filter((tn) => tn.source === Be.name), mn = en.length > 0 ? en : wt;
          if (mn.length === 0) continue;
          const Ta = nt / Math.max(ft, 1e-6);
          mn.forEach((tn) => {
            tn.value *= Ta;
          }), ke = !0;
        }
        if (!ke) break;
      }
      return Y;
    }, ne = (I, W, U) => {
      const de = S(I, W), G = T(I, W), Y = U.labelLineHeight || Math.round(U.labelFontSize * 1.25), J = Math.max(4, U.labelCharsPerLine);
      let ue = U.nodeWidth;
      const pe = [], F = G.map((oe, he) => {
        const be = w(oe), ke = O(
          oe,
          be,
          de,
          W,
          J
        );
        pe.push(ke);
        const Be = D(ke, U.labelFontSize, Y, J);
        U.orient === "vertical" ? ue = Math.max(ue, Be.height + sn * 2) : ue = Math.max(ue, Be.nodeWidth);
        const nt = n.nodeColors[oe.name] || f[be] || ie[he % ie.length], ft = Math.max(Math.ceil(Be.nodeWidth - sn * 2), 48);
        return {
          ...oe,
          displayLabel: ke,
          label: {
            width: ft,
            overflow: "none",
            lineHeight: Y,
            fontSize: U.labelFontSize
          },
          itemStyle: {
            color: nt,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let q = { ...U.contentMargins };
      if (U.orient === "vertical") {
        const oe = Math.max(
          ...pe.map(
            (be) => D(be, U.labelFontSize, Y, J).width
          ),
          0
        ), he = typeof q.right == "number" ? q.right : 10;
        q = {
          ...q,
          right: Math.max(he, oe + sn + U.labelDistance)
        };
      }
      return { nodes: F, maxNodeWidth: ue, contentMargins: q, originTotal: de };
    }, ie = [
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
    ], ge = () => {
      const I = n.data.links.filter(
        (G) => G.source && G.target && typeof G.value == "number"
      ), W = Math.max(...I.map((G) => G.value), 1), U = Math.max(1, W * 0.01), de = I.map((G) => ({
        ...G,
        originalValue: G.value,
        value: G.value < W * 0.01 ? U : G.value
      }));
      return {
        nodes: n.data.nodes.filter((G) => G.name),
        links: de
      };
    }, X = (I) => (W) => {
      const U = W.dataType === "node", de = o.value.tooltipText, G = a.value ? "#d1d5db" : "#e2e8f0";
      if (U) {
        const F = I.filter((he) => he.target === W.name), q = I.filter((he) => he.source === W.name), oe = F.length > 0 ? F.reduce((he, be) => he + (be.originalValue || be.value), 0) : q.reduce((he, be) => he + (be.originalValue || be.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${de};">${W.name}</div><div style="color: ${G}; font-size: 12px;">Count: ${oe.toLocaleString()}</div>`;
      }
      const Y = W.data?.source || W.source || "Unknown", J = W.data?.target || W.target || "Unknown", ue = W.data?.originalValue || W.data?.value || W.value || 0, pe = W.data?.label || `${ue.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${de};">${Y} → ${J}</div><div style="color: ${G}; font-size: 12px;">Flow: ${pe}</div>`;
    }, L = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const I = y.value, W = a.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", U = a.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", de = a.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", G = I.labelPosition === "inside" ? "#ffffff" : a.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: Y, links: J } = ge(), { nodes: ue, maxNodeWidth: pe, contentMargins: F, originTotal: q } = ne(
          Y,
          J,
          I
        ), oe = Z(n.height, i.value?.clientHeight ?? 0), he = Q(
          J,
          ue,
          {
            labelFontSize: I.labelFontSize,
            labelLineHeight: I.labelLineHeight || Math.round(I.labelFontSize * 1.25),
            labelCharsPerLine: I.labelCharsPerLine,
            nodeGap: I.nodeGap
          },
          oe,
          q
        ), be = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: X(he),
            backgroundColor: o.value.tooltipBg,
            borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              data: ue,
              links: he,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: U,
                  opacity: 1
                }
              },
              lineStyle: {
                color: W,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...h.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: I.labelPosition,
                color: G,
                fontWeight: 700,
                fontSize: I.labelFontSize,
                lineHeight: I.labelLineHeight || Math.round(I.labelFontSize * 1.25),
                padding: sn,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...I.orient === "horizontal" ? { width: Math.max(pe - sn * 2, 48), overflow: "none" } : I.labelWrap && I.labelTextWidth > 0 ? { width: I.labelTextWidth, overflow: "none" } : {},
                ...I.labelDistance > 0 ? { distance: I.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (ke) => ke.data?.displayLabel || ke.name || ""
              },
              edgeLabel: I.edgeLabelShow ? {
                show: !0,
                fontSize: I.edgeLabelFontSize,
                color: de,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (ke) => {
                  if (ke.data?.label) return ke.data.label;
                  const Be = ke.data?.originalValue ?? ke.value ?? 0, nt = ke.data?.source ?? ke.source, ft = he.filter((wt) => wt.source === nt).reduce((wt, mn) => wt + $(mn), 0), en = P(Be, ft);
                  return `${Number(Be).toLocaleString()} (${en})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: I.nodeGap,
              nodeWidth: pe,
              layoutIterations: h.node.iterations,
              orient: I.orient,
              draggable: !1,
              ...F
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(be), c.resize();
      } catch (Y) {
        console.error("Error setting Sankey chart options:", Y), l.value = !0;
      }
    }, H = async () => {
      if (i.value)
        try {
          c = Ao.init(i.value), L(), window.addEventListener("resize", ve);
        } catch (I) {
          console.error("Error initializing Sankey chart:", I), l.value = !0;
        } finally {
          r.value = !1;
        }
    }, K = () => {
      const I = i.value;
      return !!(I && I.clientWidth > 0 && I.clientHeight > 0);
    }, ce = async () => {
      if (await je(), K()) return H();
      await new Promise((I) => {
        const W = i.value;
        if (!W) {
          I();
          return;
        }
        d = new ResizeObserver(() => {
          K() && (d?.disconnect(), d = null, H().then(I));
        }), d.observe(W);
      });
    }, ve = () => c?.resize(), De = () => {
      window.removeEventListener("resize", ve), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return Ze(() => ce()), ri(De), Ie(() => n.data, L, { deep: !0 }), Ie(a, L), Ie(s, L), t({ isDark: a }), (I, W) => (p(), k("div", lp, [
      l.value ? (p(), k("div", {
        key: 0,
        class: "error-state",
        style: we({ height: e.height })
      }, [...W[0] || (W[0] = [
        Mo('<div class="error-content" data-v-b04b208a><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b04b208a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b04b208a></path></svg><p class="error-title" data-v-b04b208a>Chart could not be loaded</p><p class="error-description" data-v-b04b208a>Please check the data format.</p></div>', 1)
      ])], 4)) : (p(), k("div", {
        key: 1,
        class: "chart-wrapper",
        style: we({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        r.value ? (p(), k("div", cp, [...W[1] || (W[1] = [
          Mo('<div class="loading-container" data-v-b04b208a><div class="sankey-loader" data-v-b04b208a><div class="flow flow-1" data-v-b04b208a></div><div class="flow flow-2" data-v-b04b208a></div><div class="flow flow-3" data-v-b04b208a></div><div class="flow flow-4" data-v-b04b208a></div></div><p class="loading-text" data-v-b04b208a>Loading Sankey diagram...</p></div>', 1)
        ])])) : z("", !0)
      ], 4))
    ]));
  }
}), Jt = /* @__PURE__ */ me(dp, [["__scopeId", "data-v-b04b208a"]]), up = ["open"], hp = { class: "card-header metric-collapsible__summary" }, fp = { class: "header-content metric-header-content" }, gp = { class: "metric-header-content__main" }, pp = { class: "metric-header-content__text" }, mp = { class: "metric-header-content__loaded" }, bp = {
  key: 0,
  class: "card-title"
}, vp = {
  key: 0,
  class: "card-subtitle"
}, yp = {
  key: 0,
  class: "metric-header-content__export"
}, xp = {
  key: 0,
  class: "cmc-header-aside"
}, _p = {
  key: 0,
  class: "chart-metric-container__body"
}, kp = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, wp = { key: "body-content" }, Cp = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, $p = { class: "card-header" }, Sp = { class: "header-content metric-header-content" }, Mp = { class: "metric-header-content__main" }, Dp = { class: "metric-header-content__text" }, Ap = { class: "metric-header-content__loaded" }, Tp = {
  key: 0,
  class: "card-title"
}, Bp = {
  key: 0,
  class: "card-subtitle"
}, Lp = {
  key: 0,
  class: "metric-header-content__export"
}, Pp = {
  key: 0,
  class: "cmc-header-aside"
}, Rp = {
  key: 0,
  class: "chart-metric-container__body"
}, Ep = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ip = { key: "body-content" }, Fp = /* @__PURE__ */ re({
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
    const n = e, a = t, o = ae(n.defaultOpen), s = ae(n.defaultOpen), i = eo();
    function r(f) {
      return f.some((m) => {
        if (m.type === Lr) return !1;
        if (m.type === Text) {
          const g = m.children;
          return typeof g == "string" && g.trim().length > 0;
        }
        return !!m.type;
      });
    }
    const l = C(() => n.collapsible ? n.lazyMount ? s.value : o.value : !0), c = C(() => n.loading && l.value), d = C(() => {
      if (n.collapsible && !o.value) return !1;
      const f = i.headerExport;
      return f ? r(f()) : !1;
    });
    Ie(
      () => n.defaultOpen,
      (f) => {
        n.collapsible && (o.value = f, f && (s.value = !0));
      }
    );
    function h(f) {
      const m = f.currentTarget;
      if (m?.tagName !== "DETAILS") return;
      const g = o.value, v = m.open;
      if (o.value = v, v && !g) {
        const y = !s.value;
        s.value = !0, y && a("open");
      }
      a("toggle", v);
    }
    return (f, m) => e.collapsible ? (p(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: o.value,
      onToggle: h
    }, [
      u("summary", hp, [
        u("div", fp, [
          u("div", gp, [
            u("div", pp, [
              u("div", mp, [
                _e(f.$slots, "title", {}, () => [
                  e.title ? (p(), k("h3", bp, A(e.title), 1)) : z("", !0)
                ], !0),
                e.subtitle ? (p(), k("p", vp, A(e.subtitle), 1)) : z("", !0),
                _e(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (p(), k("div", yp, [
              _e(f.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          f.$slots.headerAside ? (p(), k("div", xp, [
            _e(f.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ]),
        m[0] || (m[0] = u("svg", {
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
      l.value ? (p(), k("div", _p, [
        N(ut, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            c.value ? (p(), k("div", kp, [
              _e(f.$slots, "loading", {}, () => [
                m[1] || (m[1] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (p(), k("div", wp, [
              _e(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : z("", !0)
    ], 40, up)) : (p(), k("div", Cp, [
      u("div", $p, [
        u("div", Sp, [
          u("div", Mp, [
            u("div", Dp, [
              u("div", Ap, [
                _e(f.$slots, "title", {}, () => [
                  e.title ? (p(), k("h3", Tp, A(e.title), 1)) : z("", !0)
                ], !0),
                e.subtitle ? (p(), k("p", Bp, A(e.subtitle), 1)) : z("", !0),
                _e(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (p(), k("div", Lp, [
              _e(f.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          f.$slots.headerAside ? (p(), k("div", Pp, [
            _e(f.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ])
      ]),
      l.value ? (p(), k("div", Rp, [
        N(ut, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            c.value ? (p(), k("div", Ep, [
              _e(f.$slots, "loading", {}, () => [
                m[2] || (m[2] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (p(), k("div", Ip, [
              _e(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : z("", !0)
    ]));
  }
}), Ce = /* @__PURE__ */ me(Fp, [["__scopeId", "data-v-46090b42"]]);
function Op(e, t) {
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
function wo(e, t) {
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
function at(e, t) {
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
function Vp(e, t) {
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
function Qt(e, t) {
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
function ir(e, t) {
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
function rr(e, t) {
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
function zp(e, t) {
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
function Np(e, t) {
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
function Qs(e, t) {
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
      d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
    })
  ]);
}
function Js(e, t) {
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
      d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    }),
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ]);
}
function jp(e, t) {
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
      d: "M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
    })
  ]);
}
function Hp(e, t) {
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
      d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    })
  ]);
}
function Wp(e, t) {
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
      d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    })
  ]);
}
function Kp(e, t) {
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
      d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    })
  ]);
}
function lr(e, t) {
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
const Yp = {
  key: 0,
  class: "footer-divider"
}, Up = {
  key: 0,
  class: "export-label"
}, qp = { class: "export-buttons" }, Xp = ["disabled"], Gp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Zp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Qp = ["disabled"], Jp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, em = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, tm = /* @__PURE__ */ re({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = C(() => n.variant === "footer" ? "footer" : "div"), s = C(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (l) => n.formats.includes(l), r = (l) => {
      n.loading || a("export", l);
    };
    return (l, c) => (p(), ee(Mt(o.value), {
      class: te(s.value)
    }, {
      default: E(() => [
        e.variant === "footer" ? (p(), k("div", Yp)) : z("", !0),
        u("div", {
          class: te(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (p(), k("span", Up, "Export")) : z("", !0),
          u("div", qp, [
            i("pdf") ? (p(), k("button", {
              key: 0,
              type: "button",
              class: te(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => r("pdf"))
            }, [
              e.loading ? (p(), k("svg", Gp, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (p(), k("svg", Zp, [...c[3] || (c[3] = [
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
            ], 10, Xp)) : z("", !0),
            i("csv") ? (p(), k("button", {
              key: 1,
              type: "button",
              class: te(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => r("csv"))
            }, [
              e.loading ? (p(), k("svg", Jp, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (p(), k("svg", em, [...c[6] || (c[6] = [
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
            ], 10, Qp)) : z("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Ve = /* @__PURE__ */ me(tm, [["__scopeId", "data-v-ebfab47f"]]), nm = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, am = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, om = { class: "w-full shrink-0 sm:pr-2" }, sm = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, im = { class: "max-w-[360px] text-center" }, rm = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, lm = /* @__PURE__ */ re({
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
    }, o = e, s = n, i = (f) => {
      s("export", f);
    }, r = Se(o, "theme"), l = Se(o, "options"), { isDark: c } = Me(r), d = (f) => {
      const m = new Date(f), g = String(m.getDate()).padStart(2, "0"), v = String(m.getMonth() + 1).padStart(2, "0");
      return `${g}-${v}`;
    }, h = C(() => {
      const f = o.data?.agents_by_day || {}, m = Object.keys(f).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const g = m.map((x) => d(x)), v = /* @__PURE__ */ new Set();
      for (const x of Object.values(f))
        for (const w of Object.keys(x))
          v.add(w);
      const y = Array.from(v), b = (x) => x, _ = y.map((x) => ({
        label: x,
        data: m.map((w) => f[w]?.[x] || 0),
        backgroundColor: `${a[x] || "#94a3b8"}80`,
        borderColor: b(a[x] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: _
      };
    });
    return t({ isDark: c }), (f, m) => (p(), ee(Ce, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", nm, [
          N(ut, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              h.value.labels && h.value.labels.length ? (p(), k("section", am, [
                u("div", om, [
                  N(kt, {
                    data: h.value,
                    stacked: !0,
                    theme: r.value,
                    options: l.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (p(), k("section", sm, [
                u("div", im, [
                  u("div", rm, [
                    N(R(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  m[0] || (m[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  m[1] || (m[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), cm = /* @__PURE__ */ me(lm, [["__scopeId", "data-v-f8d0ec91"]]), pn = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ye = (e, t) => `${e.toLocaleString()} (${pn(e, t)})`, dm = { class: "flex w-full min-w-0 justify-center" }, um = { class: "flex max-w-full min-w-0 items-center gap-2" }, hm = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, fm = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, gm = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, pm = /* @__PURE__ */ re({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (p(), k("div", {
      class: te(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", dm, [
        u("div", um, [
          e.color ? (p(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: we({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", hm, A(e.title), 1)
        ])
      ]),
      u("p", fm, A(e.value), 1),
      e.subvalue ? (p(), k("p", gm, A(e.subvalue), 1)) : z("", !0)
    ], 2));
  }
}), xe = /* @__PURE__ */ me(pm, [["__scopeId", "data-v-0d546967"]]), cr = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function dr(e, t) {
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
const mm = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ue = /* @__PURE__ */ re({
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
    ), o = C(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), s = C(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(
      () => dr(t.color, t.outlined)
    );
    return (r, l) => n.value ? (p(), k("span", {
      key: 0,
      role: "status",
      class: te(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (p(), k("span", mm, [...l[0] || (l[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : z("", !0),
      u("span", {
        class: te(["min-w-0 flex-1 text-center", s.value])
      }, A(a.value), 3)
    ], 2)) : (p(), k("span", {
      key: 1,
      class: te([R(cr), i.value])
    }, [
      _e(r.$slots, "default", {}, () => [
        Ae(A(e.label), 1)
      ])
    ], 2));
  }
}), le = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Le = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Vt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, bm = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, vm = { class: "overflow-x-auto" }, ym = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, xm = ["aria-sort", "onClick"], _m = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, km = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, wm = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Cm = /* @__PURE__ */ re({
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
    const n = e, a = t, o = ae(!1), s = "—";
    function i(w) {
      return w == null || w === "" ? s : String(w);
    }
    function r(w) {
      return w === "center" ? "text-center" : w === "right" ? "text-right" : "text-left";
    }
    function l(w) {
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
    function f(w) {
      return n.sortKey === w && n.sortDirection != null;
    }
    function m(w) {
      a("sort", w);
    }
    function g(w) {
      return f(w) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const v = C(() => n.rows?.length ?? 0), y = C(() => v.value > n.maxVisibleRows), b = C(() => Math.max(0, v.value - n.maxVisibleRows)), _ = C(() => n.rows?.length ? o.value || !y.value ? n.rows : n.rows.slice(0, n.maxVisibleRows) : []), x = C(
      () => n.viewMoreLabel.replace(/\{count\}/g, String(b.value))
    );
    return (w, $) => (p(), k("div", bm, [
      u("div", vm, [
        u("table", ym, [
          u("thead", null, [
            u("tr", null, [
              (p(!0), k(se, null, fe(e.columns, (S) => (p(), k("th", {
                key: S.key,
                scope: "col",
                class: te(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [r(S.align), S.headerClass]])
              }, [
                S.sortable ? (p(), k("button", {
                  key: 0,
                  type: "button",
                  class: te(["kiut-table-sort-btn inline-flex items-center gap-1", r(S.align)]),
                  "aria-sort": g(S.key),
                  onClick: (M) => m(S.key)
                }, [
                  u("span", null, A(S.label), 1),
                  u("span", _m, [
                    f(S.key) ? (p(), k(se, { key: 0 }, [
                      e.sortDirection === "asc" ? (p(), k("span", km, "↑")) : e.sortDirection === "desc" ? (p(), k("span", wm, "↓")) : z("", !0)
                    ], 64)) : (p(), k(se, { key: 1 }, [
                      $[1] || ($[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, xm)) : (p(), k(se, { key: 1 }, [
                  Ae(A(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (p(!0), k(se, null, fe(_.value, (S, M) => (p(), k("tr", {
              key: h(S, M)
            }, [
              (p(!0), k(se, null, fe(e.columns, (V) => (p(), k("td", {
                key: `${M}-${V.key}`,
                class: te(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [r(V.align), V.cellClass]])
              }, [
                _e(w.$slots, l(V.key), {
                  row: S,
                  column: V,
                  value: c(S, V.key)
                }, () => [
                  Ae(A(i(c(S, V.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      y.value ? (p(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (S) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : x.value) + " ", 1),
        (p(), k("svg", {
          class: te(["view-more-icon", { "view-more-icon-rotated": o.value }]),
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
}), ct = /* @__PURE__ */ me(Cm, [["__scopeId", "data-v-22a97a18"]]), $m = {
  key: "error",
  class: "error-state"
}, Sm = { class: "error-content" }, Mm = { class: "error-description" }, Dm = {
  key: "content",
  class: "card-body"
}, Am = { class: "chart-section" }, Tm = { class: "chart-wrapper" }, Bm = { class: "payment-success-summary" }, Lm = {
  key: 0,
  class: "booking-daily-section"
}, Pm = { class: "w-full min-w-0" }, Rm = { class: "font-medium" }, Em = { class: "percentage-text" }, Im = { class: "badges-container" }, Fm = {
  key: 0,
  class: "badges-container"
}, Om = {
  key: 1,
  class: "percentage-text"
}, Vm = { class: "badges-container" }, zm = {
  key: 1,
  class: "empty-state"
}, Nm = /* @__PURE__ */ re({
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
    function n(b) {
      return b;
    }
    const a = e, o = t, s = (b) => {
      o("export", b);
    }, i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (b, _) => new Date(b.date).getTime() - new Date(_.date).getTime()
    ) : []), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], l = C(
      () => i.value.map((b) => ({
        id: b.date,
        ...b
      }))
    ), c = C(() => a.data?.total_payment_success_value || []), d = C(() => {
      const b = c.value;
      return b.length === 0 ? g(0) : b.map(
        (_) => `${_.currency} ${g(_.total_value)}`
      ).join(" · ");
    }), h = (b) => b.payment_success_value || [], f = (b) => typeof b.payment_success_count == "number" ? b.payment_success_count : (b.payment_success_value || []).reduce(
      (_, x) => _ + (x.count || 0),
      0
    ), m = (b) => Le(b), g = (b) => b == null ? "0" : Vt(b);
    C(() => (a.data?.total_payment_success_value || []).reduce(
      (b, _) => b + (_.total_value || 0),
      0
    ));
    const v = C(() => {
      const b = a.data, _ = b.total_booking_initiated || 0, x = b.total_booking_started || 0, w = b.total_payment_initiated || 0, $ = b.total_not_found || 0, S = b.total_cancelled || 0, M = b.total_no_pending_balance || 0, V = b.total_errors || 0, j = typeof b.total_payment_success == "number" ? b.total_payment_success : (b.total_payment_success_value || []).reduce(
        (Q, ne) => Q + (ne.count || 0),
        0
      ), B = b.total_payment_failed || 0, T = Math.max(0, _ - x), D = Math.max(
        0,
        x - w - $ - S - M - V
      ), P = (Q, ne) => ye(Q, ne), O = [
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
      return x > 0 && Z.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: P(x, _)
      }), T > 0 && Z.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: P(T, _)
      }), w > 0 && Z.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: P(w, x)
      }), $ > 0 && Z.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: P($, x)
      }), S > 0 && Z.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: P(S, x)
      }), M > 0 && Z.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: P(M, x)
      }), V > 0 && Z.push({
        source: "Started",
        target: "Errors",
        value: V,
        label: P(V, x)
      }), D > 0 && Z.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: D,
        label: P(D, x)
      }), j > 0 && Z.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: j,
        label: P(j, w)
      }), B > 0 && Z.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: P(B, w)
      }), { nodes: O, links: Z };
    }), y = (b, _) => pn(b, _);
    return (b, _) => (p(), ee(Ce, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: _[0] || (_[0] = (x) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading && !a.error ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        N(ut, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            a.error ? (p(), k("div", $m, [
              u("div", Sm, [
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
                u("p", Mm, A(a.error), 1)
              ])
            ])) : (p(), k("div", Dm, [
              u("section", Am, [
                u("div", Tm, [
                  N(Jt, {
                    data: v.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", Bm, [
                N(xe, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (p(), k("section", Lm, [
                _[3] || (_[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", Pm, [
                  N(ct, {
                    columns: r,
                    rows: l.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": E(({ row: x }) => [
                      u("span", Rm, A(R(We)(String(x.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": E(({ row: x }) => [
                      u("span", null, A(R(le)(Number(x.booking_initiated_count))), 1)
                    ]),
                    "cell-started": E(({ row: x }) => [
                      u("span", null, [
                        Ae(A(R(le)(Number(x.booking_started_count))) + " ", 1),
                        u("span", Em, " (" + A(y(
                          Number(x.booking_started_count),
                          Number(x.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": E(({ row: x }) => [
                      u("span", null, A(R(le)(Number(x.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": E(({ row: x }) => [
                      u("div", Im, [
                        N(Ue, { color: "success" }, {
                          default: E(() => [
                            Ae(" Success: " + A(R(le)(
                              f(x)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "danger" }, {
                          default: E(() => [
                            Ae(" Failed: " + A(R(le)(Number(x.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": E(({ row: x }) => [
                      h(x).length > 0 ? (p(), k("div", Fm, [
                        (p(!0), k(se, null, fe(h(
                          x
                        ), (w) => (p(), k("span", {
                          key: `${x.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, A(w.currency) + " " + A(m(w.total_value)), 1))), 128))
                      ])) : (p(), k("span", Om, "N/A"))
                    ]),
                    "cell-outcomes": E(({ row: x }) => [
                      u("div", Vm, [
                        N(Ue, { color: "danger" }, {
                          default: E(() => [
                            Ae(" Not Found: " + A(x.not_found_count ? R(le)(Number(x.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "warning" }, {
                          default: E(() => [
                            Ae(" Cancelled: " + A(x.cancelled_count ? R(le)(Number(x.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "orange" }, {
                          default: E(() => [
                            Ae(" No Balance: " + A(x.no_pending_balance_count ? R(le)(Number(x.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "danger" }, {
                          default: E(() => [
                            Ae(" Errors: " + A(x.error_count ? R(le)(Number(x.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("section", zm, [..._[4] || (_[4] = [
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
}), jm = /* @__PURE__ */ me(Nm, [["__scopeId", "data-v-b053e988"]]), Hm = { class: "card-body" }, Wm = {
  key: 0,
  class: "chart-section"
}, Km = { class: "chart-wrapper" }, Ym = {
  key: 1,
  class: "checkin-daily-section"
}, Um = { class: "w-full min-w-0" }, qm = { class: "font-medium" }, Xm = { class: "cell-success" }, Gm = { class: "cell-danger" }, Zm = {
  key: 0,
  class: "reasons-list"
}, Qm = { class: "reason-name" }, Jm = { class: "reason-count" }, e0 = {
  key: 1,
  class: "no-reasons"
}, t0 = {
  key: 2,
  class: "empty-state"
}, n0 = {
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
    }, r = ae([]), l = [
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
      () => o.showPaymentLinks ? [...l, c] : l
    ), h = C(
      () => (r.value || []).map((w) => ({
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
    ), f = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.checkin_by_day) && w.checkin_by_day.length > 0 || (w.total_checkin_initiated ?? 0) > 0) ? { ...s, ...w } : o.checkinData ?? s;
    }), m = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.failed_by_step_by_day) && w.failed_by_step_by_day.length > 0 || Array.isArray(w.unrecovered_by_step) && w.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: w.total_checkin_failed ?? 0,
        total_checkin_unrecovered: w.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: w.failed_by_step_by_day ?? [],
        unrecovered_by_step: w.unrecovered_by_step ?? [],
        unrecovered_by_day: w.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), g = (w, $) => !$ || $ === 0 ? "0.0%" : pn(w, $), v = (w, $) => {
      const S = le(w), M = g(w, $);
      return `${S} (${M})`;
    }, y = (w) => w.reduce(($, S) => $ + S.failed_count, 0), b = C(() => {
      const w = [], $ = [];
      if (!f.value.total_checkin_initiated)
        return { nodes: w, links: $ };
      w.push({ name: "Checkin Init" }), w.push({ name: "Booking retrive" }), w.push({ name: "Booking retrive success" }), w.push({ name: "Number of Passengers" }), w.push({ name: "Completed" }), w.push({ name: "Closed with BP" });
      const S = f.value.total_checkin_initiated, M = f.value.total_checkin_init, V = f.value.total_checkin_init_abandoned, j = M - V, B = f.value.total_checkin_started, T = f.value.total_checkin_completed, D = f.value.total_checkin_closed, P = m.value.unrecovered_by_step || [], O = P.reduce(
        (ie, ge) => ie + ge.count,
        0
      );
      M > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: M,
        label: ye(M, S)
      });
      const Z = S - M;
      Z > 0 && (w.push({ name: "Abandoned (Init)", status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Z,
        label: ye(Z, S)
      })), V > 0 && (w.push({ name: "Abandoned (Started)", status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: V,
        label: ye(V, S)
      })), j > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: j,
        label: ye(j, S)
      }), B > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: B,
        label: ye(B, S)
      }), T > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: T,
        label: ye(T, B)
      }), P.length > 0 && O > 0 && (w.push({ name: "Unrecovered", status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: O,
        label: ye(O, B)
      }), P.forEach((ie) => {
        const X = ie.step_name.replace(/_/g, " ").split(" ").map((L) => L.charAt(0).toUpperCase() + L.slice(1)).join(" ");
        w.push({ name: X, status: "error" }), $.push({
          source: "Unrecovered",
          target: X,
          value: ie.count,
          label: ye(ie.count, B)
        });
      }));
      const Q = B - (T + O);
      Q > 0 && (w.push({ name: "Abandoned (Flow)", status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: Q,
        label: ye(Q, B)
      }));
      const ne = T - D;
      return ne > 0 && (w.push({ name: "BP Error", status: "error" }), $.push({
        source: "Completed",
        target: "BP Error",
        value: ne,
        label: ye(ne, B)
      })), D > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: D,
        label: ye(D, B)
      }), { nodes: w, links: $ };
    }), _ = () => {
      const w = o.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, x = () => {
      const w = f.value.checkin_by_day || [], $ = m.value.failed_by_step_by_day || [], S = _();
      if (w.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...w].map((M) => {
        const V = $.find(
          (B) => B.date === M.date
        ), j = S.find(
          (B) => B.date === M.date
        );
        return {
          ...M,
          failed_steps: V?.steps || [],
          record_locator_create_payment_count: M.record_locator_create_payment_count ?? j?.record_locator_create_payment_count ?? 0
        };
      }), r.value.sort((M, V) => new Date(M.date) - new Date(V.date));
    };
    return Ie(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        x();
      },
      { deep: !0, immediate: !0 }
    ), (w, $) => (p(), ee(Ce, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", Hm, [
          b.value.nodes.length > 0 ? (p(), k("section", Wm, [
            u("div", Km, [
              N(Jt, {
                data: b.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])
            ])
          ])) : z("", !0),
          r.value && r.value.length > 0 ? (p(), k("section", Ym, [
            u("div", Um, [
              N(ct, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: S }) => [
                  u("span", qm, A(R(We)(String(S.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: S }) => [
                  u("span", null, A(R(le)(S.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: S }) => [
                  u("span", null, A(v(
                    S.checkin_init_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": E(({ row: S }) => [
                  u("span", null, A(R(le)(S.checkin_started_count)), 1)
                ]),
                "cell-completed": E(({ row: S }) => [
                  u("span", null, A(v(
                    S.checkin_completed_count,
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: S }) => [
                  u("span", Xm, A(v(
                    S.checkin_closed_count,
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-failed": E(({ row: S }) => [
                  u("span", Gm, A(v(
                    y(S.failed_steps),
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-reasons": E(({ row: S }) => [
                  S.failed_steps && S.failed_steps.length > 0 ? (p(), k("div", Zm, [
                    (p(!0), k(se, null, fe(S.failed_steps, (M) => (p(), k("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      u("span", Qm, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      u("span", Jm, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (p(), k("div", e0, "-"))
                ]),
                "cell-createPayment": E(({ row: S }) => [
                  u("span", null, A(R(le)(S.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (p(), k("section", t0, [...$[0] || ($[0] = [
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
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}, ur = /* @__PURE__ */ me(n0, [["__scopeId", "data-v-d623189e"]]), a0 = { class: "card-body" }, o0 = {
  key: 0,
  class: "sankey-section"
}, s0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, i0 = { class: "w-full min-w-0" }, r0 = { class: "font-medium whitespace-nowrap" }, l0 = { class: "cell-success" }, c0 = { class: "cell-danger" }, d0 = {
  key: 0,
  class: "reasons-list"
}, u0 = { class: "reason-name" }, h0 = { class: "reason-count" }, f0 = {
  key: 1,
  class: "no-reasons"
}, g0 = {
  key: 2,
  class: "empty-state"
}, p0 = { class: "empty-state-content" }, m0 = { class: "empty-icon-wrapper" }, b0 = /* @__PURE__ */ re({
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
    exportLoading: { type: Boolean, default: !1 },
    isAvianca: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = (_) => {
      o("export", _);
    }, { isDark: i } = Me(Se(a, "theme")), r = (_) => _ == null ? "0" : _.toLocaleString(), l = (_) => {
      const [x, w, $] = _.split("-").map(Number);
      return We([x, w - 1, $]).format("MMM DD");
    }, c = (_) => _.replace(/_/g, " ").replace(/\b\w/g, (x) => x.toUpperCase()), d = (_, x) => pn(_, x), h = (_, x) => {
      const w = _ || 0, $ = x || 0, S = r(w), M = d(w, $);
      return `${S} (${M})`;
    }, f = C(() => {
      const _ = a.checkinData?.record_locator_by_day || [], x = a.failedData?.failed_by_step_by_day || [], w = a.failedData?.unrecovered_by_day || [];
      return _.map((S) => {
        const M = x.find((j) => j.date === S.date), V = w.find(
          (j) => j.date === S.date
        );
        return {
          ...S,
          failed_steps: M?.steps || [],
          unrecovered_count: V?.unrecovered_count || 0
        };
      }).sort(
        (S, M) => new Date(S.date).getTime() - new Date(M.date).getTime()
      );
    }), m = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], g = {
      key: "createPayment",
      label: "Create Payment",
      align: "center"
    }, v = C(
      () => a.isAvianca ? [...m, g] : m
    ), y = C(
      () => f.value.map((_) => ({
        id: _.date,
        date: _.date,
        checkin_initiated: _.checkin_initiated,
        record_locator_init_count: _.record_locator_init_count,
        record_locator_started_count: _.record_locator_started_count,
        record_locator_completed_count: _.record_locator_completed_count,
        record_locator_closed_count: _.record_locator_closed_count,
        unrecovered_count: _.unrecovered_count,
        failed_steps: _.failed_steps,
        record_locator_create_payment_count: _.record_locator_create_payment_count
      }))
    ), b = C(() => {
      const _ = [], x = [], w = /* @__PURE__ */ new Set(), $ = (W) => {
        w.has(W) || (_.push({ name: W }), w.add(W));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: _, links: x };
      $("Checkin Init"), $("Booking Retrieval"), $("Booking Retrieved"), $("Completed"), $("Closed with BP");
      const S = a.checkinData.total_checkin_initiated || 0, M = a.checkinData.total_record_locator_init || 0, V = a.checkinData.total_record_locator_init_abandoned || 0, j = a.checkinData.total_checkin_pre_init_abandoned_error, B = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = j != null || B != null, D = T ? Math.max(Number(j) || 0, 0) : 0, P = T ? Math.max(Number(B) || 0, 0) : 0, O = a.checkinData.total_record_locator_init_abandoned_error, Z = a.checkinData.total_record_locator_init_abandoned_voluntary, Q = O != null || Z != null, ne = Q ? Math.max(Number(O) || 0, 0) : 0, ie = Q ? Math.max(Number(Z) || 0, 0) : 0, ge = Q ? Math.max(V - ne - ie, 0) : V, X = M - V, L = a.checkinData.total_record_locator_started || 0, H = a.checkinData.total_record_locator_completed || 0, K = a.checkinData.total_record_locator_closed || 0, ce = a.checkinData.total_record_locator_unrecovered || 0;
      M > 0 && x.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: M,
        label: ye(M, S)
      });
      const ve = S - M;
      T ? (P > 0 && ($("Abandoned (Init)"), x.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: P,
        label: ye(P, S)
      })), D > 0 && ($("Booking not retreived"), x.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: D,
        label: ye(D, S)
      }))) : ve > 0 && ($("Abandoned (Init)"), x.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: ve,
        label: ye(ve, S)
      })), Q ? (ne > 0 && ($("Error"), x.push({
        source: "Booking Retrieval",
        target: "Error",
        value: ne,
        label: ye(ne, S)
      })), ie > 0 && ($("Abandoned (Started)"), x.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: ie,
        label: ye(ie, S)
      })), ge > 0 && ($("Abandoned (Started)"), x.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: ge,
        label: ye(ge, S)
      }))) : V > 0 && ($("Abandoned (Started)"), x.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: V,
        label: ye(V, S)
      })), X > 0 && x.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: X,
        label: ye(X, S)
      }), H > 0 && x.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: H,
        label: ye(H, L)
      }), ce > 0 && ($("Errors"), x.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: ce,
        label: ye(ce, L)
      }));
      const De = L - (H + ce);
      De > 0 && ($("Abandoned (Flow)"), x.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: De,
        label: ye(De, L)
      }));
      const I = H - K;
      return I > 0 && ($("BP Error"), x.push({
        source: "Completed",
        target: "BP Error",
        value: I,
        label: ye(I, L)
      })), K > 0 && x.push({
        source: "Completed",
        target: "Closed with BP",
        value: K,
        label: ye(K, L)
      }), { nodes: _, links: x };
    });
    return t({ isDark: i }), (_, x) => (p(), ee(Ce, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", a0, [
          b.value.nodes.length > 0 ? (p(), k("div", o0, [
            N(Jt, {
              data: b.value,
              height: "500px",
              "use-gradient": !1,
              "node-gap": 24
            }, null, 8, ["data"])
          ])) : z("", !0),
          f.value && f.value.length > 0 ? (p(), k("div", s0, [
            u("div", i0, [
              N(ct, {
                columns: v.value,
                rows: y.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: w }) => [
                  u("span", r0, A(l(String(w.date))), 1)
                ]),
                "cell-checkinInit": E(({ row: w }) => [
                  u("span", null, A(r(w.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": E(({ row: w }) => [
                  u("span", null, A(h(
                    w.record_locator_init_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": E(({ row: w }) => [
                  u("span", null, A(h(
                    w.record_locator_started_count,
                    w.record_locator_init_count
                  )), 1)
                ]),
                "cell-completed": E(({ row: w }) => [
                  u("span", null, A(h(
                    w.record_locator_completed_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: w }) => [
                  u("span", l0, A(h(
                    w.record_locator_closed_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-failed": E(({ row: w }) => [
                  u("span", c0, A(h(
                    w.unrecovered_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": E(({ row: w }) => [
                  u("span", null, A(r(
                    w.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-reasons": E(({ row: w }) => [
                  Array.isArray(w.failed_steps) && w.failed_steps.length > 0 ? (p(), k("div", d0, [
                    (p(!0), k(se, null, fe(w.failed_steps, ($) => (p(), k("div", {
                      key: $.step_name,
                      class: "reason-item"
                    }, [
                      u("span", u0, A(c($.step_name)) + ":", 1),
                      u("span", h0, A($.failed_count), 1)
                    ]))), 128))
                  ])) : (p(), k("div", f0, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (p(), k("div", g0, [
            u("div", p0, [
              u("div", m0, [
                N(R(at), { class: "empty-icon" })
              ]),
              x[0] || (x[0] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
              x[1] || (x[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), v0 = /* @__PURE__ */ me(b0, [["__scopeId", "data-v-b487a7e4"]]), y0 = { class: "card-body" }, x0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, _0 = { class: "w-full min-w-0" }, k0 = { class: "segment-plain" }, w0 = { class: "segment-plain" }, C0 = { class: "segment-plain" }, $0 = { class: "percentage-value" }, S0 = { class: "percentage-value" }, M0 = { class: "percentage-value success" }, D0 = {
  key: 1,
  class: "empty-state"
}, A0 = /* @__PURE__ */ re({
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
    const a = e, o = n, s = (f) => {
      o("export", f);
    }, { isDark: i } = Me(Se(a, "theme")), r = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], l = C(
      () => a.data.map((f, m) => ({
        id: `segment-${m}-${f.departure_airport}-${f.arrival_airport}-${f.segment_init_count}-${f.segment_started_count}`,
        departure_airport: f.departure_airport,
        conexion_airport: f.conexion_airport,
        arrival_airport: f.arrival_airport,
        segment_init_count: f.segment_init_count,
        segment_started_count: f.segment_started_count,
        segment_completed_count: f.segment_completed_count,
        segment_closed_count: f.segment_closed_count
      }))
    ), c = (f, m) => !m || m === 0 || !f ? "0%" : `${Math.round(f / m * 100)}%`, d = (f) => !f || f === "None" ? "-" : String(f).trim().replace(/_[0-9]+$/i, ""), h = (f) => {
      const m = d(f?.departure_airport), g = d(f?.arrival_airport);
      return m === "-" || g === "-" ? !1 : m === g;
    };
    return t({ isDark: i }), (f, m) => (p(), ee(Ce, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", y0, [
          a.data.length > 0 ? (p(), k("section", x0, [
            u("div", _0, [
              N(ct, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": E(({ row: g }) => [
                  u("span", k0, A(d(g.departure_airport)), 1)
                ]),
                "cell-connection": E(({ row: g }) => [
                  u("span", {
                    class: te(["segment-plain", {
                      "segment-plain--muted": d(g.conexion_airport) === "-"
                    }])
                  }, A(d(g.conexion_airport)), 3)
                ]),
                "cell-arrival": E(({ row: g }) => [
                  u("span", w0, A(d(g.arrival_airport)), 1)
                ]),
                "cell-trip": E(({ row: g }) => [
                  u("span", C0, A(h(g) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": E(({ row: g }) => [
                  Ae(A(R(le)(g.segment_init_count)), 1)
                ]),
                "cell-started": E(({ row: g }) => [
                  u("span", $0, A(c(
                    g.segment_started_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-completed": E(({ row: g }) => [
                  u("span", S0, A(c(
                    g.segment_completed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: g }) => [
                  u("span", M0, A(c(
                    g.segment_closed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (p(), k("section", D0, [...m[0] || (m[0] = [
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
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), hr = /* @__PURE__ */ me(A0, [["__scopeId", "data-v-b8704d3c"]]), T0 = { class: "checkin-container__body" }, B0 = /* @__PURE__ */ re({
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
    const n = e, a = t, o = C(
      () => n.loading ? !1 : n.checkinLoading
    ), s = C(
      () => n.loading ? !1 : n.segmentsLoading
    );
    function i(c, d) {
      a("export", { source: c, format: d });
    }
    function r(c) {
      return typeof c == "object" && c !== null && "source" in c;
    }
    function l(c) {
      if (r(c)) {
        a("export", c);
        return;
      }
      i("checkinSegments", c);
    }
    return (c, d) => (p(), ee(Ce, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[1] || (d[1] = (h) => a("open"))
    }, {
      default: E(() => [
        u("div", T0, [
          e.showCheckin ? (p(), ee(ur, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            "show-payment-links": e.showPaymentLinks,
            onExport: d[0] || (d[0] = (h) => i("checkin", h))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "show-payment-links"])) : z("", !0),
          N(hr, {
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
}), L0 = /* @__PURE__ */ me(B0, [["__scopeId", "data-v-cf0fe2d3"]]), P0 = { class: "card-body" }, R0 = { class: "chart-section" }, E0 = { class: "chart-wrapper" }, I0 = {
  key: 1,
  class: "empty-chart"
}, F0 = { class: "payment-success-summary" }, O0 = {
  key: 0,
  class: "disruption-daily-section"
}, V0 = { class: "w-full min-w-0" }, z0 = { class: "font-medium text-center" }, N0 = { class: "text-center" }, j0 = { class: "text-center" }, H0 = { class: "percentage-text" }, W0 = { class: "text-center" }, K0 = { class: "abandoned-value" }, Y0 = { class: "badges-container badges-wrap" }, U0 = { class: "badges-container badges-wrap" }, q0 = {
  key: 1,
  class: "empty-state"
}, X0 = /* @__PURE__ */ re({
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
    function n(y) {
      return y;
    }
    const a = e, o = t, s = (y) => {
      o("export", y);
    }, i = C(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (y, b) => new Date(y.date).getTime() - new Date(b.date).getTime()
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
    ), c = C(() => a.data?.total_payment_success || []), d = C(() => {
      const y = c.value;
      return y.length === 0 ? f(0) : y.map((b) => `${b.currency} ${f(b.total_value)}`).join(" · ");
    }), h = (y, b) => pn(y, b), f = (y) => Le(y), m = (y) => (y ?? []).reduce((b, _) => b + (_.count ?? 0), 0), g = (y) => typeof y.sell_success_count == "number" ? y.sell_success_count : m(y.payment_success_total), v = C(() => {
      const y = a.data, b = y.total_disruption_conversations || 0, _ = y.total_disruption_initiated || 0, x = y.total_voluntary || 0, w = y.total_involuntary || 0, $ = y.total_accepted || 0, S = y.total_confirmed || 0, M = typeof y.total_sell_success == "number" ? y.total_sell_success : m(y.total_payment_success), V = y.total_sell_failed || 0, j = Math.max(0, b - _), B = Math.max(
        0,
        _ - x - w
      ), T = Math.max(0, w - $), D = Math.max(0, x - S), P = V, O = Math.max(0, S - M - P), Z = (ie, ge) => ye(ie, ge), Q = [
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
      return _ > 0 && ne.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: Z(_, b)
      }), j > 0 && ne.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: j,
        label: Z(j, b)
      }), x > 0 && ne.push({
        source: "Started",
        target: "Voluntary",
        value: x,
        label: Z(x, b)
      }), w > 0 && ne.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: Z(w, b)
      }), B > 0 && ne.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: Z(B, b)
      }), $ > 0 && ne.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: Z($, b)
      }), T > 0 && ne.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: T,
        label: Z(T, b)
      }), S > 0 && ne.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: Z(S, b)
      }), D > 0 && ne.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: D,
        label: Z(D, b)
      }), M > 0 && ne.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: Z(M, b)
      }), P > 0 && ne.push({
        source: "Confirmed",
        target: "Rejected",
        value: P,
        label: Z(P, b)
      }), O > 0 && ne.push({
        source: "Confirmed",
        target: "Not Paid",
        value: O,
        label: Z(O, b)
      }), { nodes: Q, links: ne };
    });
    return (y, b) => (p(), ee(Ce, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: b[0] || (b[0] = (_) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", P0, [
          u("section", R0, [
            u("div", E0, [
              v.value.nodes.length > 0 && v.value.links.length > 0 ? (p(), ee(Jt, {
                key: 0,
                data: v.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])) : (p(), k("div", I0, [...b[1] || (b[1] = [
                u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          u("section", F0, [
            N(xe, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (p(), k("section", O0, [
            b[2] || (b[2] = u("div", { class: "section-header" }, [
              u("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            u("div", V0, [
              N(ct, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: _ }) => [
                  u("span", z0, A(R(We)(String(_.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": E(({ row: _ }) => [
                  u("span", N0, A(R(le)(Number(_.disruption_conversations))), 1)
                ]),
                "cell-started": E(({ row: _ }) => [
                  u("span", j0, [
                    Ae(A(R(le)(Number(_.disruption_initiated_count))) + " ", 1),
                    u("span", H0, " (" + A(h(
                      Number(_.disruption_initiated_count),
                      Number(_.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": E(({ row: _ }) => [
                  u("span", W0, [
                    u("span", K0, A(R(le)(
                      Number(_.disruption_initiated_count) - Number(_.voluntary_count) - Number(_.involuntary_count)
                    )) + " (" + A(h(
                      Number(_.disruption_initiated_count) - Number(_.voluntary_count) - Number(_.involuntary_count),
                      Number(_.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": E(({ row: _ }) => [
                  u("div", Y0, [
                    (p(!0), k(se, null, fe([_], (x, w) => (p(), k(se, { key: w }, [
                      N(Ue, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: E(() => [
                          Ae(" VOL " + A(R(le)(x.voluntary_count)) + " (" + A(h(
                            x.voluntary_count,
                            x.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "success" }, {
                        default: E(() => [
                          Ae(" Confirm " + A(R(le)(x.confirmed_count)) + " (" + A(h(
                            x.confirmed_count,
                            x.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "warning" }, {
                        default: E(() => [
                          Ae(" Not Confirm " + A(R(le)(x.voluntary_count - x.confirmed_count)) + " (" + A(h(
                            x.voluntary_count - x.confirmed_count,
                            x.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "danger" }, {
                        default: E(() => [
                          Ae(" Reject " + A(R(le)(x.sell_failed_count)) + " (" + A(h(
                            x.sell_failed_count,
                            x.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "orange" }, {
                        default: E(() => [
                          Ae(" Not Paid " + A(R(le)(
                            Math.max(
                              0,
                              x.confirmed_count - g(x) - x.sell_failed_count
                            )
                          )) + " (" + A(h(
                            Math.max(
                              0,
                              x.confirmed_count - g(x) - x.sell_failed_count
                            ),
                            x.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: E(() => [
                          Ae(" Finish " + A(R(le)(g(x))) + " (" + A(h(
                            g(x),
                            x.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (p(!0), k(se, null, fe(x.payment_success_total || [], ($) => (p(), ee(Ue, {
                        key: `${x.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: E(() => [
                          Ae(A($.currency) + " " + A(f($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": E(({ row: _ }) => [
                  u("div", U0, [
                    (p(!0), k(se, null, fe([_], (x, w) => (p(), k(se, { key: w }, [
                      N(Ue, { color: "purple" }, {
                        default: E(() => [
                          Ae(" INV " + A(R(le)(x.involuntary_count)) + " (" + A(h(
                            x.involuntary_count,
                            x.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "danger" }, {
                        default: E(() => [
                          Ae(" Human " + A(R(le)(x.involuntary_count - x.accepted_count)) + " (" + A(h(
                            x.involuntary_count - x.accepted_count,
                            x.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "success" }, {
                        default: E(() => [
                          Ae(" Accept " + A(R(le)(x.accepted_count)) + " (" + A(h(
                            x.accepted_count,
                            x.disruption_conversations
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
          ])) : (p(), k("section", q0, [...b[3] || (b[3] = [
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
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), G0 = /* @__PURE__ */ me(X0, [["__scopeId", "data-v-ffc4fd8a"]]), Z0 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Q0 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, J0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, eb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, tb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, nb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ab = /* @__PURE__ */ re({
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
    const a = e, o = n, s = (m) => {
      o("export", m);
    }, i = Se(a, "theme"), { isDark: r } = Me(i), l = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = ae({
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
      const m = d.value, g = m.total_airline_information_retrieved + m.total_booking_info_retrieved + m.total_flight_status_retrieved, v = (_) => g > 0 ? (_ / g * 100).toFixed(1) : "0.0", y = m.total_faq_events, b = y > 0 ? `${(m.total_documents_found / y * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: l.airline_information,
          value: `${v(m.total_airline_information_retrieved)}%`,
          subvalue: `${le(m.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: l.booking_info,
          value: `${v(m.total_booking_info_retrieved)}%`,
          subvalue: `${le(m.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: l.flight_status,
          value: `${v(m.total_flight_status_retrieved)}%`,
          subvalue: `${le(m.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: le(m.total_documents_found),
          subvalue: b
        }
      ];
    }), f = (m) => {
      if (!m) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = m.faq_by_day || [];
      if (g.length > 0) {
        const v = g.map(
          (x) => We(x.date).format("MMM DD")
        ), y = g.map(
          (x) => x.airline_information_retrieved_count || 0
        ), b = g.map(
          (x) => x.flight_status_retrieved_count || 0
        ), _ = g.map(
          (x) => x.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: v,
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
              data: b,
              borderColor: l.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: _,
              borderColor: l.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Ie(
      () => a.data,
      (m) => {
        f(m ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (m, g) => (p(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", Z0, [
          u("div", Q0, [
            c.value.labels && c.value.labels.length ? (p(), k("section", J0, [
              u("div", eb, [
                N(vt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              u("div", tb, [
                (p(!0), k(se, null, fe(h.value, (v) => (p(), ee(xe, {
                  key: v.name,
                  class: "min-w-0",
                  color: v.color,
                  title: v.label,
                  value: v.value,
                  subvalue: v.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (p(), k("section", nb, [...g[0] || (g[0] = [
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
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ob = /* @__PURE__ */ me(ab, [["__scopeId", "data-v-b6ea961f"]]), sb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ib = { class: "w-full shrink-0 flex min-h-0 flex-col" }, rb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, lb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, cb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, db = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ub = { class: "max-w-[360px] px-4 text-center" }, hb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, fb = /* @__PURE__ */ re({
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
    }, o = e, s = n, i = (m) => {
      s("export", m);
    }, r = Se(o, "theme"), { isDark: l } = Me(r), c = C(() => {
      const m = o.data?.agents_by_day || {}, g = Object.keys(m).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const v = /* @__PURE__ */ new Set();
      for (const _ of Object.values(m))
        for (const x of Object.keys(_))
          v.add(x);
      const b = Array.from(v).map((_) => {
        const x = _.toLowerCase(), w = a[x] || a[_] || "#94a3b8";
        return {
          label: _.charAt(0).toUpperCase() + _.slice(1).replace(/_/g, " "),
          data: g.map(($) => m[$]?.[_] || 0),
          borderColor: w
        };
      });
      return {
        labels: g.map((_) => We(_).format("MMM DD")),
        datasets: b
      };
    }), d = C(() => {
      const m = o.data?.agents_by_day || {}, g = {};
      for (const y of Object.values(m))
        for (const [b, _] of Object.entries(y))
          g[b] = (g[b] || 0) + _;
      const v = Object.values(g).reduce((y, b) => y + b, 0);
      return v === 0 ? [] : Object.entries(g).sort(([, y], [, b]) => b - y).map(([y, b]) => {
        const _ = y.toLowerCase();
        return {
          name: y,
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          total: b,
          percentage: (b / v * 100).toFixed(1),
          color: a[_] || a[y] || "#94a3b8"
        };
      });
    }), h = C(() => d.value.slice(0, 4)), f = C(() => {
      const m = h.value.length;
      if (!(m <= 0))
        return { gridTemplateColumns: `repeat(${m}, minmax(0, 1fr))` };
    });
    return t({ isDark: l }), (m, g) => (p(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", sb, [
          u("div", ib, [
            c.value.labels && c.value.labels.length ? (p(), k("section", rb, [
              u("div", lb, [
                N(vt, {
                  data: c.value,
                  options: e.options,
                  theme: r.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              h.value.length ? (p(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(f.value)
              }, [
                (p(!0), k(se, null, fe(h.value, (v) => (p(), ee(xe, {
                  key: v.name,
                  class: "min-w-0",
                  color: v.color,
                  title: v.label,
                  value: `${v.percentage}%`,
                  subvalue: `${R(le)(v.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : z("", !0)
            ])) : d.value.length ? (p(), k("section", cb, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: we(f.value)
              }, [
                (p(!0), k(se, null, fe(h.value, (v) => (p(), ee(xe, {
                  key: v.name,
                  class: "min-w-0",
                  color: v.color,
                  title: v.label,
                  value: `${v.percentage}%`,
                  subvalue: `${R(le)(v.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : z("", !0),
            d.value.length ? z("", !0) : (p(), k("section", db, [
              u("div", ub, [
                u("div", hb, [
                  N(R(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                g[0] || (g[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                g[1] || (g[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), gb = /* @__PURE__ */ me(fb, [["__scopeId", "data-v-932f6fac"]]), pb = { class: "card-body" }, mb = {
  key: 0,
  class: "chart-section"
}, bb = { class: "chart-wrapper" }, vb = {
  key: 1,
  class: "record-locator-daily-section"
}, yb = { class: "w-full min-w-0" }, xb = { class: "cell-plain font-medium" }, _b = { class: "cell-plain text-center" }, kb = { class: "cell-plain text-center" }, wb = { class: "cell-plain text-center" }, Cb = { class: "cell-plain text-center" }, $b = { class: "cell-plain text-center success-value" }, Sb = { class: "cell-plain text-center failed-value" }, Mb = { class: "cell-plain text-center warning-value" }, Db = { class: "cell-plain text-center" }, Ab = { class: "cell-plain text-center failed-value" }, Tb = {
  key: 2,
  class: "empty-state"
}, Bb = /* @__PURE__ */ re({
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
    const a = e, o = n, s = (y) => {
      o("export", y);
    }, { isDark: i } = Me(Se(a, "theme")), r = C(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (y, b) => new Date(y.date).getTime() - new Date(b.date).getTime()
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
    ], d = C(
      () => a.isAvianca ? [...l, ...c] : l
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
    ), f = C(() => a.data), m = (y, b) => pn(y, b), g = (y, b) => {
      const _ = le(y), x = m(y, b);
      return `${_} (${x})`;
    }, v = C(() => {
      const y = [], b = [], _ = /* @__PURE__ */ new Set(), x = (K) => {
        _.has(K) || (y.push({ name: K }), _.add(K));
      };
      if (!f.value.total_checkin_initiated)
        return { nodes: y, links: b };
      x("Checkin Init"), x("Booking retrive"), x("Checkin Started"), x("Checkin Completed"), x("Checkin Closed");
      const w = f.value.total_checkin_initiated, $ = f.value.total_record_locator_init, S = f.value.total_record_locator_started, M = f.value.total_record_locator_completed, V = f.value.total_record_locator_closed, j = f.value.total_record_locator_failed, B = f.value.total_record_locator_abandoned, T = f.value.total_record_locator_init_abandoned, D = f.value.total_checkin_pre_init_abandoned_error, P = f.value.total_checkin_pre_init_abandoned_voluntary, O = D != null || P != null, Z = O ? Math.max(Number(D) || 0, 0) : 0, Q = O ? Math.max(Number(P) || 0, 0) : 0, ne = f.value.total_record_locator_init_abandoned_error, ie = f.value.total_record_locator_init_abandoned_voluntary, ge = ne != null || ie != null, X = ge ? Math.max(Number(ne) || 0, 0) : 0, L = ge ? Math.max(Number(ie) || 0, 0) : 0;
      $ > 0 && b.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: ye($, w)
      });
      const H = w - $;
      return O ? (Q > 0 && (x("Abandoned (Init)"), b.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ye(Q, w)
      })), Z > 0 && (x("Booking not retreived"), b.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: Z,
        label: ye(Z, w)
      }))) : H > 0 && (x("Abandoned (Init)"), b.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: H,
        label: ye(H, w)
      })), S > 0 && b.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: S,
        label: ye(S, w)
      }), ge ? (X > 0 && (x("Error"), b.push({
        source: "Booking retrive",
        target: "Error",
        value: X,
        label: ye(X, w)
      })), L > 0 && (x("Abandoned (Started)"), b.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: ye(L, w)
      }))) : T > 0 && (x("Abandoned (Started)"), b.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: T,
        label: ye(T, w)
      })), M > 0 && b.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: M,
        label: ye(M, S)
      }), V > 0 && b.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: V,
        label: ye(V, S)
      }), j > 0 && (x("Checkin Failed"), b.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: j,
        label: ye(j, S)
      })), B > 0 && (x("Abandoned (Flow)"), b.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: B,
        label: ye(B, S)
      })), { nodes: y, links: b };
    });
    return t({ isDark: i }), (y, b) => (p(), ee(Ce, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", pb, [
          v.value.nodes.length > 0 ? (p(), k("section", mb, [
            u("div", bb, [
              N(Jt, {
                data: v.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])
            ])
          ])) : z("", !0),
          r.value && r.value.length > 0 ? (p(), k("section", vb, [
            u("div", yb, [
              N(ct, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: _ }) => [
                  u("span", xb, A(R(We)(String(_.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: _ }) => [
                  u("span", _b, A(R(le)(_.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: _ }) => [
                  u("span", kb, A(g(
                    _.record_locator_init_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": E(({ row: _ }) => [
                  u("span", wb, A(R(le)(_.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": E(({ row: _ }) => [
                  u("span", Cb, A(g(
                    _.record_locator_completed_count,
                    _.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": E(({ row: _ }) => [
                  u("span", $b, A(g(
                    _.record_locator_closed_count,
                    _.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": E(({ row: _ }) => [
                  u("span", Sb, A(g(
                    _.record_locator_failed_count,
                    _.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": E(({ row: _ }) => [
                  u("span", Mb, A(g(
                    _.record_locator_abandoned_count,
                    _.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": E(({ row: _ }) => [
                  u("span", Db, A(R(le)(
                    _.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": E(({ row: _ }) => [
                  u("span", Ab, A(R(le)(
                    _.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (p(), k("section", Tb, [...b[0] || (b[0] = [
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
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "loading"]));
  }
}), Lb = /* @__PURE__ */ me(Bb, [["__scopeId", "data-v-68053ff9"]]), Pb = { class: "card-body" }, Rb = {
  key: 0,
  class: "chart-section"
}, Eb = {
  key: 1,
  class: "empty-state"
}, Ib = {
  key: 2,
  class: "comparison-section"
}, Fb = { class: "comparison-grid" }, Ob = /* @__PURE__ */ re({
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
    }, o = [
      "#B0C4DE",
      "#C9A0F2",
      "#F5C26B",
      "#8BE8B0",
      "#F2A07A",
      "#7BA3E8"
    ], s = e, i = n, r = (g) => {
      i("export", g);
    }, { isDark: l } = Me(Se(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const g = /* @__PURE__ */ new Set();
      for (const v of s.data?.sales_by_channel_by_day ?? [])
        for (const y of Object.keys(v.channels))
          g.add(y);
      return Array.from(g).sort();
    }), d = (g, v) => a[g.toLowerCase()] ?? o[v % o.length];
    function h(g) {
      return g.replace(/_/g, " ").toUpperCase();
    }
    function f(g) {
      if (g.delta === null) return "No previous data";
      const v = le(g.previous), y = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${v})` : `${g.delta > 0 ? "↑" : "↓"} ${y} vs prev. period (${v})`;
    }
    const m = C(() => {
      const g = s.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const v = g.map((b) => We(b.date).format("MMM-DD")), y = c.value.map((b, _) => ({
        label: b,
        data: g.map((x) => x.channels[b] ?? 0),
        backgroundColor: d(b, _),
        borderRadius: 4
      }));
      return { labels: v, datasets: y };
    });
    return t({ isDark: l }), (g, v) => (p(), ee(Ce, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !s.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: r,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", Pb, [
          m.value.labels.length > 0 ? (p(), k("section", Rb, [
            N(kt, {
              data: m.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (p(), k("section", Eb, [...v[0] || (v[0] = [
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
          e.channelComparison.length > 0 ? (p(), k("section", Ib, [
            u("div", Fb, [
              (p(!0), k(se, null, fe(e.channelComparison, (y, b) => (p(), ee(R(xe), {
                key: y.channel,
                color: d(y.channel, b),
                title: h(y.channel),
                value: R(le)(y.current),
                subvalue: f(y)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : z("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), fr = /* @__PURE__ */ me(Ob, [["__scopeId", "data-v-4879d791"]]), Vb = { class: "card-body" }, zb = {
  key: 0,
  class: "chart-section"
}, Nb = { class: "chart-wrapper" }, jb = {
  key: 1,
  class: "empty-state"
}, Hb = { class: "seller-value-cards" }, Wb = {
  key: 2,
  class: "seller-daily-section"
}, Kb = { class: "w-full min-w-0" }, Yb = { class: "sl-cell font-medium" }, Ub = { class: "sl-cell text-center" }, qb = { class: "sl-cell text-center" }, Xb = { class: "sl-cell text-center" }, Gb = { class: "sl-cell text-center" }, Zb = { class: "sl-cell text-center" }, Qb = { class: "sl-cell text-center success-value" }, Jb = {
  key: 0,
  class: "currency-cell-list"
}, ev = {
  key: 1,
  class: "empty-cell"
}, tv = { class: "sl-cell text-center success-value" }, nv = { class: "sl-cell text-center" }, av = { class: "sl-cell text-center success-value" }, ov = {
  key: 0,
  class: "currency-cell-list"
}, sv = {
  key: 1,
  class: "empty-cell"
}, iv = { class: "sl-cell text-center success-value" }, rv = { class: "sl-cell text-center" }, lv = { class: "sl-cell text-center success-value" }, cv = {
  key: 0,
  class: "currency-cell-list"
}, dv = { key: 1 }, uv = {
  key: 0,
  class: "failed-reasons"
}, hv = { class: "reason-name" }, fv = { class: "reason-count" }, gv = {
  key: 1,
  class: "empty-cell"
}, pv = /* @__PURE__ */ re({
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
    const o = e, s = n, i = (T) => {
      s("export", T);
    }, { isDark: r } = Me(Se(o, "theme")), l = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const T = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((D) => {
        const P = T.findIndex(
          (O) => O.date === D.date
        );
        P !== -1 ? T[P] = { ...T[P], reasons: D.reasons } : T.push({
          date: D.date,
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
          reasons: D.reasons
        });
      }), T.sort(
        (D, P) => new Date(D.date).getTime() - new Date(P.date).getTime()
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
      () => l.value.map((T) => ({
        id: T.date,
        ...T
      }))
    ), h = C(() => o.sellerData), f = C(() => o.failedData), m = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), g = C(
      () => Array.isArray(o.sellerData.total_value_sell_bank_transfer) ? o.sellerData.total_value_sell_bank_transfer : []
    ), v = C(
      () => Array.isArray(o.sellerData.total_value_sell_cash_option) ? o.sellerData.total_value_sell_cash_option : []
    ), y = C(() => {
      const T = m.value;
      return T.length > 0 ? T.map(
        (D) => `${D.currency} ${Vt(D.total_value)}`
      ).join(" · ") : B(o.sellerData.total_value_sell_success);
    });
    function b(T) {
      return T.length > 0 ? T.map(
        (D) => `${D.currency} ${Vt(D.total_value)}`
      ).join(" · ") : "—";
    }
    const _ = C(
      () => b(g.value)
    ), x = C(
      () => b(v.value)
    ), w = (T) => T.replace(/_/g, " ").replace(/\b\w/g, (D) => D.toUpperCase()), $ = (T) => `Failed:
${w(T)}`, S = C(() => {
      const {
        total_seller_conversations: T = 0,
        total_sell_started: D = 0,
        total_sell_booking_created: P = 0,
        total_sell_success: O = 0,
        total_sell_bank_transfer: Z = 0,
        total_sell_cash_option: Q = 0,
        total_sell_success_bank_transfer: ne = 0,
        total_sell_success_cash: ie = 0
      } = h.value, { failed_by_reason_by_day: ge = [] } = f.value;
      if (T === 0) return { nodes: [], links: [] };
      const X = Math.max(
        0,
        O - (ne ?? 0) - (ie ?? 0)
      ), L = [
        { name: "Sell Initiated", value: T, status: "success" },
        { name: "Sell Started", value: D, status: "success" },
        { name: "Booking Created", value: P, status: "success" },
        { name: "Sell Success", value: X, status: "success" }
      ], H = [], K = T - D;
      K > 0 && (L.push({
        name: "Abandoned (Init)",
        value: K,
        status: "abandon"
      }), H.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: K,
        label: ye(K, T)
      })), D > 0 && H.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: D,
        label: ye(D, T)
      });
      const ce = ge.reduce(
        (I, W) => (W.reasons && Array.isArray(W.reasons) && W.reasons.forEach((U) => {
          const de = U.reason, G = U.failed_count;
          I[de] = (I[de] || 0) + G;
        }), I),
        {}
      );
      P > 0 && H.push({
        source: "Sell Started",
        target: "Booking Created",
        value: P,
        label: ye(P, T)
      }), Z > 0 && (L.push({ name: "Bank Transfer", value: Z, status: "success" }), H.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: Z,
        label: ye(Z, T)
      })), Q > 0 && (L.push({ name: "Cash Option", value: Q, status: "success" }), H.push({
        source: "Booking Created",
        target: "Cash Option",
        value: Q,
        label: ye(Q, T)
      })), X > 0 && H.push({
        source: "Booking Created",
        target: "Sell Success",
        value: X,
        label: ye(X, T)
      }), (ne ?? 0) > 0 && (L.push({
        name: "Bank Transfer Success",
        value: ne ?? 0,
        status: "success"
      }), H.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: ne ?? 0,
        label: ye(ne ?? 0, T)
      })), (ie ?? 0) > 0 && (L.push({
        name: "Cash Option Success",
        value: ie ?? 0,
        status: "success"
      }), H.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: ie ?? 0,
        label: ye(ie ?? 0, T)
      }));
      const ve = P - X - Z - Q;
      ve > 0 && (L.push({
        name: "Failed at Completion",
        value: ve,
        status: "error"
      }), H.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: ve,
        label: ye(ve, T)
      }));
      const De = D - P;
      if (De > 0 && (L.push({
        name: "Failed at Booking",
        value: De,
        status: "error"
      }), H.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: De,
        label: ye(De, T)
      })), Object.keys(ce).length > 0) {
        const I = Object.values(ce).reduce(
          (U, de) => U + de,
          0
        ), W = De - I;
        Object.entries(ce).filter(([, U]) => U > 0).sort(([, U], [, de]) => de - U).forEach(([U, de]) => {
          const G = `Failed: ${U}`;
          L.push({
            name: G,
            value: de,
            status: "error",
            label: $(U)
          }), H.push({
            source: "Failed at Booking",
            target: G,
            value: de,
            label: ye(de, T)
          });
        }), W > 0 && (L.push({
          name: "Failed: Without Reason",
          value: W,
          status: "error",
          label: `Failed:
Without Reason`
        }), H.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: W,
          label: ye(W, T)
        }));
      }
      return { nodes: L, links: H };
    }), M = (T, D) => pn(T, D), V = (T, D) => {
      const P = le(T), O = M(T, D);
      return `${P} (${O})`;
    }, j = (T) => T == null ? 0 : typeof T == "number" ? T : Array.isArray(T) ? T.reduce((D, P) => D + (P.total_value || 0), 0) : 0, B = (T) => Vt(j(T));
    return t({ isDark: r }), (T, D) => (p(), ee(Ce, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", Vb, [
          S.value.nodes.length > 0 ? (p(), k("section", zb, [
            u("div", Nb, [
              N(Jt, {
                data: S.value,
                height: "560px"
              }, null, 8, ["data"])
            ])
          ])) : (p(), k("section", jb, [...D[0] || (D[0] = [
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
          u("section", Hb, [
            N(xe, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: y.value
            }, null, 8, ["value"]),
            N(xe, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: _.value
            }, null, 8, ["value"]),
            N(xe, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: x.value
            }, null, 8, ["value"])
          ]),
          l.value && l.value.length > 0 ? (p(), k("section", Wb, [
            u("div", Kb, [
              N(ct, {
                columns: c,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: P }) => [
                  u("span", Yb, A(R(We)(String(P.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": E(({ row: P }) => [
                  u("span", Ub, A(R(le)(Number(P.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": E(({ row: P }) => [
                  u("span", qb, A(V(
                    P.sell_started_count,
                    P.seller_conversations || P.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": E(({ row: P }) => [
                  u("span", Xb, A(V(
                    P.sell_get_quote_count,
                    P.seller_conversations || P.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": E(({ row: P }) => [
                  u("span", Gb, A(V(
                    P.sell_booking_created_count,
                    P.seller_conversations || P.sell_started_count
                  )), 1)
                ]),
                "cell-bankTransfer": E(({ row: P }) => [
                  u("span", Zb, A(R(le)(Number(P.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": E(({ row: P }) => [
                  u("span", Qb, [
                    Array.isArray(
                      P.daily_value_sell_success_bank_transfer
                    ) && P.daily_value_sell_success_bank_transfer.length > 0 ? (p(), k("div", Jb, [
                      (p(!0), k(se, null, fe(P.daily_value_sell_success_bank_transfer, (O) => (p(), k("span", {
                        key: `${P.date}-bt-success-${O.currency}`
                      }, A(O.currency) + " " + A(R(Vt)(O.total_value)), 1))), 128))
                    ])) : (p(), k("span", ev, "-"))
                  ])
                ]),
                "cell-btSuccess": E(({ row: P }) => [
                  u("span", tv, A(R(le)(
                    Number(
                      P.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-cashOption": E(({ row: P }) => [
                  u("span", nv, A(R(le)(Number(P.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": E(({ row: P }) => [
                  u("span", av, [
                    Array.isArray(
                      P.daily_value_sell_success_cash
                    ) && P.daily_value_sell_success_cash.length > 0 ? (p(), k("div", ov, [
                      (p(!0), k(se, null, fe(P.daily_value_sell_success_cash, (O) => (p(), k("span", {
                        key: `${P.date}-co-success-${O.currency}`
                      }, A(O.currency) + " " + A(R(Vt)(O.total_value)), 1))), 128))
                    ])) : (p(), k("span", sv, "-"))
                  ])
                ]),
                "cell-cashSuccess": E(({ row: P }) => [
                  u("span", iv, A(R(le)(
                    Number(P.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": E(({ row: P }) => [
                  u("span", rv, A(V(
                    P.sell_success_count,
                    P.seller_conversations || P.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": E(({ row: P }) => [
                  u("span", lv, [
                    Array.isArray(P.daily_value_sell_success) && P.daily_value_sell_success.length > 0 ? (p(), k("div", cv, [
                      (p(!0), k(se, null, fe(P.daily_value_sell_success, (O) => (p(), k("span", {
                        key: `${P.date}-${O.currency}`
                      }, A(O.currency) + " " + A(R(Vt)(O.total_value)), 1))), 128))
                    ])) : (p(), k("span", dv, A(B(
                      P.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": E(({ row: P }) => [
                  (P.reasons || []).length > 0 ? (p(), k("div", uv, [
                    (p(!0), k(se, null, fe(P.reasons || [], (O) => (p(), k("div", {
                      key: O.reason,
                      class: "failed-reason-item"
                    }, [
                      u("span", hv, A(O.reason) + ":", 1),
                      u("span", fv, A(O.failed_count), 1)
                    ]))), 128))
                  ])) : (p(), k("div", gv, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : z("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), gr = /* @__PURE__ */ me(pv, [["__scopeId", "data-v-bdae6055"]]), mv = { class: "seller-container__body" }, bv = /* @__PURE__ */ re({
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
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = C(
      () => n.loading ? !1 : n.sellerLoading
    ), s = C(
      () => n.loading ? !1 : n.salesByChannelLoading
    ), i = C(() => n.exportLoading || n.sellerExportLoading), r = C(() => n.exportLoading || n.salesByChannelExportLoading);
    function l(c, d) {
      a("export", { source: c, format: d });
    }
    return (c, d) => (p(), ee(Ce, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[2] || (d[2] = (h) => a("open"))
    }, {
      default: E(() => [
        u("div", mv, [
          N(gr, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => l("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          N(fr, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": r.value,
            onExport: d[1] || (d[1] = (h) => l("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), vv = /* @__PURE__ */ me(bv, [["__scopeId", "data-v-bd0ec4ff"]]), yv = { class: "card-body" }, xv = {
  key: 0,
  class: "chart-section"
}, _v = {
  key: 1,
  class: "empty-state"
}, kv = { class: "empty-state-content" }, wv = { class: "empty-icon-wrapper" }, Cv = /* @__PURE__ */ re({
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
    }, o = e, s = n, i = (h) => {
      s("export", h);
    }, { isDark: r, colors: l } = Me(Se(o, "theme")), c = C(() => {
      const f = (o.data?.top_agents || []).filter(
        (y) => y.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const m = f.reduce(
        (y, b) => y + (Number(b.conversations) || 0),
        0
      ), g = f.map((y) => {
        const b = y.agent_type?.toLowerCase();
        return a[b] || "#94a3b8";
      }), v = g.map((y) => `${y}80`);
      return {
        labels: f.map((y) => {
          const b = Number(y.conversations) || 0, _ = m ? b / m * 100 : 0;
          return `${y.agent_type} - ${b.toLocaleString()} (${_.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((y) => y.conversations),
            backgroundColor: v,
            borderColor: g,
            borderWidth: 2
          }
        ]
      };
    }), d = C(() => o.options ? o.options : {
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
              const f = (h.label || "").toString().split(" - ")[0], m = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (y, b) => y + (Number(b) || 0),
                0
              ), v = g ? m / g * 100 : 0;
              return `${f}: ${m.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, f) => (p(), ee(Ce, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", yv, [
          c.value.labels && c.value.labels.length ? (p(), k("section", xv, [
            N(Aa, {
              data: c.value,
              options: d.value
            }, null, 8, ["data", "options"])
          ])) : (p(), k("section", _v, [
            u("div", kv, [
              u("div", wv, [
                N(R(Vp), { class: "empty-icon" })
              ]),
              f[0] || (f[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
              f[1] || (f[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), $v = /* @__PURE__ */ me(Cv, [["__scopeId", "data-v-08639fed"]]), Sv = { class: "card-body" }, Mv = {
  key: 0,
  class: "payment-methods-section"
}, Dv = { class: "payment-methods-grid" }, Av = {
  key: 1,
  class: "empty-state"
}, Tv = { class: "empty-state-content" }, Bv = { class: "empty-icon-wrapper" }, Lv = {
  key: 2,
  class: "payment-method-daily-section"
}, Pv = { class: "w-full min-w-0" }, Rv = { class: "font-medium" }, Ev = { class: "text-center" }, Iv = { class: "text-center success-value" }, Fv = {
  key: 0,
  class: "currency-cell-list"
}, Ov = { class: "payment-tags" }, Vv = { class: "tag-name" }, zv = {
  key: 0,
  class: "tag-amount"
}, Nv = {
  key: 1,
  class: "tag-amount"
}, jv = { class: "tag-count" }, Hv = {
  key: 3,
  class: "empty-table-state"
}, Wv = "Not Registered", Kv = /* @__PURE__ */ re({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, { isDark: s } = Me(Se(a, "theme")), i = ae(!1), r = ae({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = C(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), c = C(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), d = C(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((M, V) => We(M.date).valueOf() - We(V.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], f = C(
      () => d.value.map((M) => ({
        id: M.date,
        date: M.date,
        total_count: M.total_count,
        total_amount: M.total_amount,
        total_amount_by_currency: M.total_amount_by_currency,
        payment_methods: M.payment_methods
      }))
    ), m = (M) => {
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
      const V = (M.payment_method_breakdown || []).map(
        (B) => ({
          payment_method: B.payment_method || "Unknown",
          total_amount: B.total_amount ?? 0,
          count: B.count ?? 0,
          total_amount_by_currency: B.total_amount_by_currency ?? []
        })
      ), j = (M.payment_method_by_day || []).map((B) => ({
        date: B.date || "",
        total_count: B.total_count ?? 0,
        total_amount: B.total_amount ?? 0,
        total_amount_by_currency: B.total_amount_by_currency ?? [],
        payment_methods: (B.payment_methods || []).map((T) => ({
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
        payment_method_breakdown: V,
        payment_method_by_day: j
      };
    }, g = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [M, V] = a.dates.map(
            (B) => We(B).format("YYYY-MM-DD")
          ), j = await a.fetchFunction(
            a.airlineName,
            M,
            V
          );
          r.value = m(j);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), r.value = m(null);
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
    ], y = (M) => !M || M.toLowerCase() === "unknown" ? Wv : M.replace(/_/g, " "), b = (M) => M == null ? "$0.00" : Le(M), _ = (M) => {
      const V = M.total_amount_by_currency;
      return V && V.length > 0 ? V.map((j) => `${j.currency} ${b(j.total_value)}`).join(" · ") : b(M.total_amount);
    }, x = (M) => M ? We(M).format("MMM DD") : "-", w = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), $ = (M) => {
      o("export", M);
    };
    function S() {
      const M = a.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, r.value = m(M));
    }
    return Ze(() => {
      a.data ? S() : g();
    }), Ie(
      () => a.data,
      (M) => {
        M && S();
      },
      { deep: !0 }
    ), Ie(
      () => a.dates,
      (M) => {
        a.data || M && M[0] && M[1] && g();
      },
      { deep: !0 }
    ), t({ isDark: s }), (M, V) => (p(), ee(Ce, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: V[0] || (V[0] = (j) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !i.value ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", Sv, [
          l.value ? (p(), k("section", Mv, [
            V[1] || (V[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            u("div", Dv, [
              (p(!0), k(se, null, fe(r.value.payment_method_breakdown, (j, B) => (p(), ee(xe, {
                key: j.payment_method,
                class: "payment-method-card-item min-w-0",
                color: v[B % v.length],
                title: y(j.payment_method),
                value: _(j),
                subvalue: `${w(j.count)} ${w(j.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (p(), k("section", Av, [
            u("div", Tv, [
              u("div", Bv, [
                N(R(Np), { class: "empty-icon" })
              ]),
              V[2] || (V[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
              V[3] || (V[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (p(), k("section", Lv, [
            V[5] || (V[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
            u("div", Pv, [
              N(ct, {
                columns: h,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: j }) => [
                  u("span", Rv, A(x(String(j.date))), 1)
                ]),
                "cell-totalSales": E(({ row: j }) => [
                  u("span", Ev, A(R(le)(j.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": E(({ row: j }) => [
                  u("span", Iv, [
                    Array.isArray(j.total_amount_by_currency) && j.total_amount_by_currency.length > 0 ? (p(), k("div", Fv, [
                      (p(!0), k(se, null, fe(j.total_amount_by_currency, (B) => (p(), k("span", {
                        key: `${j.date}-${B.currency}`
                      }, A(B.currency) + " " + A(b(B.total_value)), 1))), 128))
                    ])) : (p(), k(se, { key: 1 }, [
                      Ae(A(b(Number(j.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": E(({ row: j }) => [
                  u("div", Ov, [
                    (p(!0), k(se, null, fe(Array.isArray(j.payment_methods) ? j.payment_methods : [], (B) => (p(), k("div", {
                      key: B.payment_method,
                      class: "payment-tag"
                    }, [
                      u("span", Vv, A(y(B.payment_method)), 1),
                      V[4] || (V[4] = u("span", { class: "tag-separator" }, "•", -1)),
                      !B.total_amount_by_currency || B.total_amount_by_currency.length === 0 ? (p(), k("span", zv, A(b(B.total_amount)), 1)) : (p(), k("span", Nv, A(B.total_amount_by_currency.map(
                        (T) => `${T.currency} ${b(T.total_value)}`
                      ).join(" / ")), 1)),
                      u("span", jv, "(" + A(w(B.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : l.value ? (p(), k("div", Hv, [...V[6] || (V[6] = [
            u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : z("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Yv = /* @__PURE__ */ me(Kv, [["__scopeId", "data-v-168637eb"]]), Uv = {
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
}, ay = { class: "card-body" }, oy = { class: "metric-row" }, sy = {
  key: 0,
  class: "metric-prefix"
}, iy = {
  key: 0,
  class: "metric-label"
}, ry = /* @__PURE__ */ re({
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
    const n = e, { isDark: a } = Me(Se(n, "theme")), o = C(() => n.labelPosition === "header"), s = C(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), i = C(() => {
      if (!s.value) return 0;
      const c = n.previousValue;
      return c === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - c) / c * 100;
    }), r = C(() => {
      const c = i.value;
      if (Number.isNaN(c)) return "-";
      const d = c.toFixed(1);
      return c > 0 ? `+${d}%` : `${d}%`;
    }), l = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, d) => (p(), ee(Ce, {
      collapsible: !1,
      class: te([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": R(a),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: E(() => [
        N(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (p(), k("div", Uv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (p(), k("div", qv)) : z("", !0)
            ])) : (p(), k("div", Xv, [
              u("div", Gv, [
                _e(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (p(), k("span", Zv, A(e.label), 1)) : z("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: E(() => [
        N(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (p(), k("div", Qv)) : (p(), k("div", Jv, [
              _e(c.$slots, "headerAside", {}, () => [
                s.value ? (p(), k("div", {
                  key: 0,
                  class: te(["change-badge", l.value])
                }, A(r.value), 3)) : z("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: E(() => [
        N(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (p(), k("div", ey, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? z("", !0) : (p(), k("div", ty))
            ])) : (p(), k("div", ny, [
              u("div", ay, [
                _e(c.$slots, "value", {}, () => [
                  u("div", oy, [
                    e.prefix ? (p(), k("span", sy, A(e.prefix), 1)) : z("", !0),
                    u("span", {
                      class: te(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? z("", !0) : (p(), k("span", iy, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), Dt = /* @__PURE__ */ me(ry, [["__scopeId", "data-v-c81268f4"]]);
function Co(e, t) {
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
function Ye() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const dt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", ht = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", ly = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Ot = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", Tt = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", cy = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], dy = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, uy = ["placeholder", "aria-label"], hy = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, fy = ["aria-selected", "onClick", "onMouseenter"], gy = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, py = { class: "min-w-0 flex-1" }, $o = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `kiut-select-${Ye()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = ae(null), c = ae(null), d = ae(null), h = ae(null), f = ae(null), m = ae(!1), g = ae(0), v = ae(""), y = ae({});
    function b() {
      const X = c.value;
      if (!X) return;
      const L = X.getBoundingClientRect();
      y.value = {
        top: `${L.bottom - 3}px`,
        left: `${L.left}px`,
        width: `${L.width}px`
      };
    }
    const _ = C(() => n.options.filter((X) => !X.disabled)), x = C(() => {
      if (!n.searchable) return _.value;
      const X = v.value.trim().toLowerCase();
      return X ? _.value.filter((L) => L.label.toLowerCase().includes(X)) : _.value;
    }), w = C(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), $ = C(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((L) => L.value === n.modelValue)?.label ?? String(n.modelValue));
    function S(X) {
      return `${String(X.value)}-${X.label}`;
    }
    function M(X) {
      return n.modelValue === X.value;
    }
    function V(X, L) {
      const H = M(X), K = g.value === L;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        H ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !H && K ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function j() {
      g.value = Math.max(
        0,
        x.value.findIndex((X) => X.value === n.modelValue)
      );
    }
    function B() {
      if (n.searchable) {
        f.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function T() {
      b(), v.value = "", j(), je(() => B());
    }
    function D() {
      m.value = !1, v.value = "";
    }
    function P(X) {
      a("update:modelValue", X.value), D();
    }
    function O() {
      if (!n.disabled) {
        if (m.value) {
          D();
          return;
        }
        m.value = !0, T();
      }
    }
    function Z(X) {
      X.stopPropagation(), !n.disabled && O();
    }
    function Q(X) {
      if (!m.value) return;
      const L = X.target, H = l.value, K = d.value;
      H && !H.contains(L) && (!K || !K.contains(L)) && D();
    }
    function ne(X) {
      n.disabled || (X.key === "ArrowDown" || X.key === "Enter" || X.key === " ") && (X.preventDefault(), m.value || (m.value = !0, T()));
    }
    function ie(X) {
      const L = x.value;
      if (X.key === "Escape") {
        X.preventDefault(), D();
        return;
      }
      if (X.key === "ArrowDown") {
        if (X.preventDefault(), L.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (X.key === "ArrowUp") {
        if (X.preventDefault(), L.length === 0) return;
        g.value = L.length - 1, h.value?.focus();
        return;
      }
      if (X.key === "Enter") {
        X.preventDefault();
        const H = L[g.value];
        H && P(H);
      }
    }
    function ge(X) {
      const L = x.value;
      if (X.key === "Escape") {
        X.preventDefault(), D();
        return;
      }
      if (L.length !== 0) {
        if (X.key === "ArrowDown") {
          X.preventDefault(), g.value = Math.min(g.value + 1, L.length - 1);
          return;
        }
        if (X.key === "ArrowUp") {
          if (X.preventDefault(), g.value === 0 && n.searchable) {
            f.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (X.key === "Enter") {
          X.preventDefault();
          const H = L[g.value];
          H && P(H);
        }
      }
    }
    return Ie(v, () => {
      g.value = 0;
    }), Ze(() => {
      document.addEventListener("click", Q);
    }), lt(() => {
      document.removeEventListener("click", Q);
    }), (X, L) => (p(), k("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: s,
        class: te(R(dt))
      }, A(e.label), 3)) : z("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: te([
          R(ht),
          "flex items-center justify-between gap-2 text-left",
          m.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": m.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: Z,
        onKeydown: ne
      }, [
        u("span", {
          class: te([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A($.value), 3),
        N(R(Qt), {
          class: te(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", m.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, cy),
      (p(), ee(un, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: we(y.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (p(), k("div", dy, [
            Ge(u("input", {
              ref_key: "searchInputRef",
              ref: f,
              "onUpdate:modelValue": L[0] || (L[0] = (H) => v.value = H),
              type: "search",
              class: te([R(ht), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: L[1] || (L[1] = Oe(() => {
              }, ["stop"])),
              onKeydown: Oe(ie, ["stop"])
            }, null, 42, uy), [
              [Yt, v.value]
            ])
          ])) : z("", !0),
          u("ul", {
            id: r,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: Oe(ge, ["stop"])
          }, [
            x.value.length === 0 ? (p(), k("li", hy, A(e.noResultsText), 1)) : z("", !0),
            (p(!0), k(se, null, fe(x.value, (H, K) => (p(), k("li", {
              key: S(H),
              role: "option",
              "aria-selected": M(H),
              class: te(V(H, K)),
              onClick: Oe((ce) => P(H), ["stop"]),
              onMouseenter: (ce) => g.value = K
            }, [
              e.showOptionCheck ? (p(), k("span", gy, [
                M(H) ? (p(), ee(R(Co), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : z("", !0)
              ])) : z("", !0),
              u("span", py, A(H.label), 1)
            ], 42, fy))), 128))
          ], 544)
        ], 4), [
          [Xt, m.value]
        ])
      ]))
    ], 512));
  }
}), my = { class: "card-body" }, by = { class: "kpi-closed-value" }, vy = { class: "kpi-closed-value__main" }, yy = {
  key: 0,
  class: "kpi-closed-value__pct"
}, xy = { class: "table-view-select flex justify-end" }, _y = { class: "table-section w-full min-w-0" }, ky = { class: "cell-plain" }, wy = { class: "cell-plain" }, Cy = { class: "cell-plain cell-plain--muted" }, $y = { class: "cell-plain" }, Sy = { class: "cell-plain" }, My = { class: "cell-plain" }, Dy = {
  key: 2,
  class: "empty-state"
}, Ay = 6, Ty = /* @__PURE__ */ re({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = (I) => {
      o("export", I);
    }, { isDark: i } = Me(Se(a, "theme")), r = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function l(I) {
      const W = I?.trim() ?? "";
      return W.length > 0 && !r.has(W);
    }
    function c(I) {
      if (!l(I.agent_email)) return !1;
      const W = I.assigned_count ?? 0, U = I.closed_count ?? 0;
      return W > 0 || U > 0;
    }
    function d(I) {
      return I.closed_count ?? 0;
    }
    function h(I) {
      const W = I?.trim();
      return W || "—";
    }
    const f = C(
      () => (a.data?.agents_by_day ?? []).filter(c)
    ), m = C(() => f.value.length > 0), g = C(() => {
      const I = (a.data?.total_enqueued ?? 0) > 0;
      return m.value || I;
    }), v = ae("by_date"), y = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], b = ae("date"), _ = ae("desc");
    Ie(v, (I) => {
      I === "aggregated" ? (b.value = "name", _.value = "asc") : (b.value = "date", _.value = "desc");
    });
    function x(I, W) {
      return W == null ? null : W === 0 ? I > 0 ? 100 : 0 : (I - W) / W * 100;
    }
    function w(I) {
      const W = I.toFixed(1);
      return I > 0 ? `+${W}%` : `${W}%`;
    }
    function $(I, W = !1) {
      const U = W ? -I : I;
      return U > 0 ? "change-badge--up" : U < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function S(I, W) {
      if (I === null) return null;
      const U = x(I, W);
      return U === null ? null : {
        label: w(U),
        class: $(U, !0)
      };
    }
    function M(I) {
      if (I == null || I === "") return null;
      if (typeof I == "number")
        return Number.isFinite(I) ? I : null;
      const W = I.trim();
      if (!W) return null;
      if (W.includes(":")) {
        const de = W.split(":").map(Number);
        return de.length !== 3 || de.some(isNaN) ? null : de[0] * 3600 + de[1] * 60 + de[2];
      }
      const U = Number(W);
      return Number.isFinite(U) ? U : null;
    }
    function V(I) {
      const W = Math.round(I), U = Math.floor(W / 3600), de = Math.floor(W % 3600 / 60), G = W % 60;
      return `${String(U).padStart(2, "0")}:${String(de).padStart(2, "0")}:${String(G).padStart(2, "0")}`;
    }
    function j(I) {
      const W = M(I);
      return W === null ? "—" : typeof I == "string" && I.includes(":") ? I.trim() : V(W);
    }
    const B = C(() => a.data?.total_enqueued ?? 0), T = C(() => a.data?.total_closed ?? 0), D = C(
      () => a.data?.avg_time_to_assign_seconds ?? null
    ), P = C(
      () => a.data?.avg_conversation_duration_seconds ?? null
    ), O = C(() => B.value <= 0 ? null : `(${(T.value / B.value * 100).toFixed(1)}%)`), Z = C(
      () => S(
        M(D.value),
        a.previousAvgTimeToAssignSeconds
      )
    ), Q = C(
      () => S(
        M(P.value),
        a.previousAvgConversationDurationSeconds
      )
    );
    function ne(I, W) {
      return {
        id: `${I.date}-${I.agent_email}-${W}`,
        date: I.date,
        dateSort: new Date(I.date).getTime(),
        agent_name: I.agent_name ?? "",
        agent_email: I.agent_email,
        handled: d(I),
        avg_assignation_seconds: M(I.avg_time_to_assign_seconds),
        avg_resolution_seconds: M(I.avg_conversation_duration_seconds),
        avg_assignation_display: j(I.avg_time_to_assign_seconds),
        avg_resolution_display: j(I.avg_conversation_duration_seconds)
      };
    }
    function ie(I) {
      const W = /* @__PURE__ */ new Map();
      for (const U of I) {
        if (!c(U)) continue;
        const de = U.agent_email.trim();
        W.has(de) || W.set(de, {
          agent_name: U.agent_name?.trim() ?? "",
          agent_email: de,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const G = W.get(de), Y = U.assigned_count ?? 0, J = U.closed_count ?? 0;
        G.handled += d(U), U.agent_name?.trim() && (G.agent_name = U.agent_name.trim());
        const ue = M(U.avg_time_to_assign_seconds);
        ue !== null && Y > 0 && (G.assignSum += ue * Y, G.assignWeight += Y);
        const pe = M(U.avg_conversation_duration_seconds);
        pe !== null && J > 0 && (G.resolutionSum += pe * J, G.resolutionWeight += J);
      }
      return Array.from(W.values()).map((U, de) => {
        const G = U.assignWeight > 0 ? U.assignSum / U.assignWeight : null, Y = U.resolutionWeight > 0 ? U.resolutionSum / U.resolutionWeight : null;
        return {
          id: `agg-${U.agent_email}-${de}`,
          agent_name: U.agent_name,
          agent_email: U.agent_email,
          handled: U.handled,
          avg_assignation_seconds: G,
          avg_resolution_seconds: Y,
          avg_assignation_display: G !== null ? V(G) : "—",
          avg_resolution_display: Y !== null ? V(Y) : "—"
        };
      });
    }
    const ge = C(() => {
      const I = f.value;
      return v.value === "aggregated" ? ie(I) : I.map(ne);
    });
    function X(I, W, U, de) {
      const G = de === "asc" ? 1 : -1;
      let Y = 0;
      switch (U) {
        case "date":
          Y = (I.dateSort ?? 0) - (W.dateSort ?? 0);
          break;
        case "name":
          Y = (I.agent_name || "").localeCompare(W.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          Y = I.agent_email.localeCompare(W.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          Y = I.handled - W.handled;
          break;
        case "avgAssignation":
          Y = (I.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (W.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          Y = (I.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (W.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (Y !== 0) return Y * G;
      if (v.value === "by_date" && U !== "date") {
        const J = (W.dateSort ?? 0) - (I.dateSort ?? 0);
        if (J !== 0) return J;
      }
      return (I.agent_name || "").localeCompare(W.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const L = C(() => {
      const I = [...ge.value];
      return I.sort((W, U) => X(W, U, b.value, _.value)), I;
    }), H = C(
      () => L.value
    ), K = C(() => {
      const I = [];
      return v.value === "by_date" && I.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), I.push(
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
      ), I;
    });
    function ce(I) {
      const W = I;
      if (b.value === W) {
        _.value = _.value === "asc" ? "desc" : "asc";
        return;
      }
      b.value = W, W === "date" ? _.value = "desc" : W === "name" || W === "email" ? _.value = "asc" : _.value = "desc";
    }
    const ve = (I) => I == null ? "0" : le(I), De = (I) => new Date(I).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (I, W) => (p(), ee(Ce, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: W[1] || (W[1] = (U) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", my, [
          g.value ? (p(), k("div", {
            key: 0,
            class: te(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": R(i) }])
          }, [
            N(Dt, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ve(B.value),
              theme: e.theme,
              "current-value": B.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: E(() => [...W[2] || (W[2] = [
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
            N(Dt, {
              label: "Conversations Closed",
              "label-position": "header",
              value: ve(T.value),
              theme: e.theme,
              "current-value": T.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: E(() => [...W[3] || (W[3] = [
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
              value: E(() => [
                u("div", by, [
                  u("span", vy, A(ve(T.value)), 1),
                  O.value ? (p(), k("span", yy, A(O.value), 1)) : z("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(Dt, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: j(D.value),
              theme: e.theme,
              "current-value": M(D.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Do({
              icon: E(() => [
                W[4] || (W[4] = u("svg", {
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
              Z.value ? {
                name: "headerAside",
                fn: E(() => [
                  u("div", {
                    class: te(["duration-trend-badge", Z.value.class])
                  }, A(Z.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            N(Dt, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: j(P.value),
              theme: e.theme,
              "current-value": M(P.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Do({
              icon: E(() => [
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
              Q.value ? {
                name: "headerAside",
                fn: E(() => [
                  u("div", {
                    class: te(["duration-trend-badge", Q.value.class])
                  }, A(Q.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : z("", !0),
          m.value ? (p(), ee(Ce, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: E(() => [
              u("div", xy, [
                N($o, {
                  modelValue: v.value,
                  "onUpdate:modelValue": W[0] || (W[0] = (U) => v.value = U),
                  options: y,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: E(() => [
              u("div", _y, [
                (p(), ee(ct, {
                  key: `${v.value}-${b.value}-${_.value}`,
                  columns: K.value,
                  rows: H.value,
                  "sort-key": b.value,
                  "sort-direction": _.value,
                  "max-visible-rows": Ay,
                  "row-key": "id",
                  onSort: ce
                }, {
                  "cell-date": E(({ row: U }) => [
                    u("span", ky, A(De(String(U.date))), 1)
                  ]),
                  "cell-name": E(({ row: U }) => [
                    u("span", wy, A(h(U.agent_name)), 1)
                  ]),
                  "cell-email": E(({ row: U }) => [
                    u("span", Cy, A(U.agent_email), 1)
                  ]),
                  "cell-handled": E(({ row: U }) => [
                    u("span", $y, A(ve(Number(U.handled))), 1)
                  ]),
                  "cell-avgAssignation": E(({ row: U }) => [
                    u("span", Sy, A(U.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": E(({ row: U }) => [
                    u("span", My, A(U.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : g.value ? z("", !0) : (p(), k("div", Dy, [...W[6] || (W[6] = [
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
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), By = /* @__PURE__ */ me(Ty, [["__scopeId", "data-v-837b41e7"]]), Ly = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Py = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Ry = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Ey = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Iy = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Fy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Oy = { class: "max-w-[360px] px-4 text-center" }, Vy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ei = 5, zy = /* @__PURE__ */ re({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, i = Se(a, "theme"), { isDark: r } = Me(i), l = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, c = ae({
      labels: [],
      datasets: []
    }), d = C(
      () => a.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = C(() => {
      const v = d.value.total_by_channel || {}, y = Object.values(v).reduce(
        (b, _) => b + _,
        0
      );
      return y === 0 ? [] : Object.entries(v).sort(([, b], [, _]) => _ - b).map(([b, _]) => ({
        name: b,
        label: b.toUpperCase(),
        total: _,
        percentage: (_ / y * 100).toFixed(1),
        color: l[b.toLowerCase()] || "#9ca3af"
      }));
    }), f = C(
      () => h.value.slice(0, ei)
    ), m = C(() => {
      const v = Math.min(f.value.length, ei);
      if (!(v <= 0))
        return { gridTemplateColumns: `repeat(${v}, minmax(0, 1fr))` };
    }), g = (v) => {
      if (!v || !v.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const y = v.channels_by_day, b = Object.keys(y).sort();
      if (b.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(y))
        for (const S of Object.keys($))
          _.add(S);
      const w = Array.from(_).map(($) => {
        const S = $.toLowerCase(), M = l[S] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: b.map((V) => y[V]?.[$] || 0),
          borderColor: M
        };
      });
      c.value = {
        labels: b.map(($) => We($).format("MMM DD")),
        datasets: w
      };
    };
    return Ie(
      () => a.data,
      (v) => {
        g(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (v, y) => (p(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", Ly, [
          u("div", Py, [
            c.value.labels && c.value.labels.length ? (p(), k("section", Ry, [
              u("div", Ey, [
                N(vt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              f.value.length ? (p(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(m.value)
              }, [
                (p(!0), k(se, null, fe(f.value, (b) => (p(), ee(xe, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: `${b.percentage}%`,
                  subvalue: `${R(le)(b.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : z("", !0)
            ])) : h.value.length ? (p(), k("section", Iy, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: we(m.value)
              }, [
                (p(!0), k(se, null, fe(f.value, (b) => (p(), ee(xe, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: `${b.percentage}%`,
                  subvalue: `${R(le)(b.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : z("", !0),
            h.value.length ? z("", !0) : (p(), k("section", Fy, [
              u("div", Oy, [
                u("div", Vy, [
                  N(R(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                y[0] || (y[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                y[1] || (y[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ny = /* @__PURE__ */ me(zy, [["__scopeId", "data-v-d3f89004"]]), jy = { class: "card-body" }, Hy = { class: "chart-container" }, Wy = { class: "triage-table-block w-full min-w-0" }, Ky = { class: "triage-row-label" }, Yy = {
  key: 1,
  class: "triage-count"
}, Uy = {
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
  class: "empty-state"
}, Qy = { class: "empty-state-content" }, Jy = { class: "empty-icon-wrapper" }, e1 = /* @__PURE__ */ re({
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
    const a = e, o = n, s = (x) => {
      o("export", x);
    }, { isDark: i, colors: r } = Me(
      Se(a, "theme")
    ), l = C(() => {
      const x = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, S] of Object.entries(x)) {
        const M = $.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const V = M.filter((j) => j !== "triage").length;
        V >= 4 ? w["4p"] += Number(S) || 0 : w[V] += Number(S) || 0;
      }
      return w;
    }), c = C(() => {
      const x = l.value;
      return x[0] + x[1] + x[2] + x[3] + x["4p"] || 0;
    }), d = C(() => Object.keys(a.data?.combinations || {}).length > 0), h = C(() => {
      const x = c.value;
      if (!x) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = l.value;
      return {
        pct0: w[0] / x * 100,
        pct1: w[1] / x * 100,
        pct2: w[2] / x * 100,
        pct3: w[3] / x * 100,
        pct4p: w["4p"] / x * 100
      };
    }), f = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], m = C(() => {
      const x = h.value, w = l.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: x.pct0,
          b1: x.pct1,
          b2: x.pct2,
          b3: x.pct3,
          b4p: x.pct4p
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
    }, v = (x) => x?.replace("80", "") || "#888888", y = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: g.c0,
          borderColor: v(g.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: g.c1,
          borderColor: v(g.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: g.c2,
          borderColor: v(g.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: g.c3,
          borderColor: v(g.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: g.c4p,
          borderColor: v(g.c4p),
          borderWidth: 1
        }
      ]
    })), b = C(() => ({
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
            label: (x) => `${x.dataset.label} intent(s): ${Number(x.raw || 0).toFixed(0)}%`
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
    })), _ = (x) => `${(Number(x) || 0).toFixed(0)}`;
    return t({ isDark: i }), (x, w) => (p(), ee(Ce, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", jy, [
          d.value ? (p(), k(se, { key: 0 }, [
            u("div", Hy, [
              N(kt, {
                data: y.value,
                options: b.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "w-full min-w-0",
              title: "Total",
              value: R(le)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            u("div", Wy, [
              N(ct, {
                columns: f,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": E(({ row: $ }) => [
                  u("span", Ky, A($.metric), 1)
                ]),
                "cell-b0": E(({ row: $ }) => [
                  $.id === "pct" ? (p(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: v(g.c0) })
                  }, A(_(Number($.b0))) + "%", 5)) : (p(), k("span", Yy, A(R(le)(Number($.b0))), 1))
                ]),
                "cell-b1": E(({ row: $ }) => [
                  $.id === "pct" ? (p(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: v(g.c1) })
                  }, A(_(Number($.b1))) + "%", 5)) : (p(), k("span", Uy, A(R(le)(Number($.b1))), 1))
                ]),
                "cell-b2": E(({ row: $ }) => [
                  $.id === "pct" ? (p(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: v(g.c2) })
                  }, A(_(Number($.b2))) + "%", 5)) : (p(), k("span", qy, A(R(le)(Number($.b2))), 1))
                ]),
                "cell-b3": E(({ row: $ }) => [
                  $.id === "pct" ? (p(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: v(g.c3) })
                  }, A(_(Number($.b3))) + "%", 5)) : (p(), k("span", Xy, A(R(le)(Number($.b3))), 1))
                ]),
                "cell-b4p": E(({ row: $ }) => [
                  $.id === "pct" ? (p(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: v(g.c4p) })
                  }, A(_(Number($.b4p))) + "%", 5)) : (p(), k("span", Gy, A(R(le)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (p(), k("div", Zy, [
            u("div", Qy, [
              u("div", Jy, [
                N(R(at), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = u("p", { class: "empty-title" }, "No triage combinations data", -1)),
              w[1] || (w[1] = u("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), t1 = /* @__PURE__ */ me(e1, [["__scopeId", "data-v-be7d2c0c"]]), n1 = { class: "card-body" }, a1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, o1 = { class: "pie-section" }, s1 = {
  key: 1,
  class: "empty-state"
}, i1 = /* @__PURE__ */ re({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = [
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
    }, r = (m) => i[m]?.label || m.toUpperCase(), l = C(
      () => n.data?.items && n.data.items.length > 0
    ), c = C(
      () => (n.data?.items || []).reduce((m, g) => m + g.count, 0)
    ), d = C(() => {
      const m = {};
      for (const g of n.data?.items || [])
        m[g.language] = (m[g.language] || 0) + g.count;
      return Object.entries(m).map(([g, v]) => ({ language: g, count: v })).sort((g, v) => v.count - g.count);
    }), h = C(() => ({
      labels: d.value.map((m) => r(m.language)),
      datasets: [
        {
          data: d.value.map((m) => m.count),
          backgroundColor: d.value.map(
            (m, g) => s[g % s.length] + "80"
          ),
          borderColor: d.value.map(
            (m, g) => s[g % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), f = C(() => ({
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
            label: (m) => {
              const g = m.raw || 0, v = c.value > 0 ? (g / c.value * 100).toFixed(1) : "0";
              return ` ${m.label}: ${g} (${v}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (m, g) => (p(), ee(Ce, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: E(() => [
        u("div", n1, [
          l.value ? (p(), k("div", a1, [
            u("section", o1, [
              N(Aa, {
                data: h.value,
                options: f.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "shrink-0",
              title: "Total",
              value: R(le)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (p(), k("section", s1, [...g[0] || (g[0] = [
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
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), r1 = /* @__PURE__ */ me(i1, [["__scopeId", "data-v-9385c088"]]), l1 = { class: "card-body" }, c1 = {
  key: 0,
  class: "guardrails-daily-section"
}, d1 = { class: "w-full min-w-0" }, u1 = { class: "font-medium" }, h1 = { class: "font-semibold" }, f1 = { class: "type-badges-row" }, g1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, p1 = {
  key: 1,
  class: "empty-state"
}, m1 = /* @__PURE__ */ re({
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
    const a = e, o = n, s = (y) => {
      o("export", y);
    }, { isDark: i } = Me(Se(a, "theme")), r = C(
      () => a.data?.items && a.data.items.length > 0
    ), l = C(
      () => (a.data?.items || []).reduce((y, b) => y + b.count, 0)
    ), c = (y) => {
      const b = {};
      for (const w of a.data?.items || [])
        b[w[y]] = (b[w[y]] || 0) + w.count;
      const _ = Object.entries(b).sort((w, $) => $[1] - w[1]);
      if (_.length === 0) return { name: "—", pct: 0 };
      const x = l.value;
      return {
        name: _[0][0],
        pct: x > 0 ? Math.round(_[0][1] / x * 100) : 0
      };
    }, d = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), f = C(() => c("guardrail_source")), m = C(() => {
      const y = {};
      for (const b of a.data?.items || [])
        y[b.date] || (y[b.date] = {}), y[b.date][b.guardrail_type] = (y[b.date][b.guardrail_type] || 0) + b.count;
      return Object.entries(y).map(([b, _]) => ({
        date: b,
        total: Object.values(_).reduce((x, w) => x + w, 0),
        types: Object.entries(_).map(([x, w]) => ({ type: x, count: w })).sort((x, w) => w.count - x.count)
      })).sort((b, _) => new Date(b.date).getTime() - new Date(_.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], v = C(
      () => m.value.map((y) => ({
        id: y.date,
        date: y.date,
        total: y.total,
        types: y.types
      }))
    );
    return t({ isDark: i }), (y, b) => (p(), ee(Ce, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", l1, [
          r.value ? (p(), k(se, { key: 0 }, [
            m.value.length > 0 ? (p(), k("section", c1, [
              u("div", d1, [
                N(ct, {
                  columns: g,
                  rows: v.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": E(({ row: _ }) => [
                    u("span", u1, A(R(We)(String(_.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": E(({ row: _ }) => [
                    u("span", h1, A(R(le)(_.total)), 1)
                  ]),
                  "cell-types": E(({ row: _ }) => [
                    u("div", f1, [
                      (p(!0), k(se, null, fe(_.types, (x) => (p(), k("span", {
                        key: x.type,
                        class: "type-count-badge"
                      }, A(x.type) + " (" + A(x.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : z("", !0),
            u("section", g1, [
              N(xe, {
                title: "Total Events",
                value: R(le)(l.value)
              }, null, 8, ["value"]),
              N(xe, {
                title: "Top type",
                value: d.value.name,
                subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                title: "Top source",
                value: f.value.name,
                subvalue: f.value.pct > 0 ? `(${f.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (p(), k("section", p1, [...b[0] || (b[0] = [
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
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), b1 = /* @__PURE__ */ me(m1, [["__scopeId", "data-v-c042ede0"]]), v1 = { class: "card-body" }, y1 = { class: "chart-section" }, x1 = { class: "chart-wrapper" }, _1 = {
  key: 1,
  class: "empty-chart"
}, k1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, w1 = {
  key: 0,
  class: "dn-failure-section"
}, C1 = { class: "w-full min-w-0" }, $1 = { class: "failure-reason" }, S1 = { class: "failure-count" }, M1 = { class: "impact-bar-container" }, D1 = { class: "impact-label" }, A1 = { class: "dn-trend-health-block flex flex-col gap-0" }, T1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, B1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, L1 = { class: "system-health" }, P1 = { class: "system-health-content" }, R1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, E1 = {
  key: 1,
  class: "empty-state"
}, I1 = /* @__PURE__ */ re({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = ($) => {
      o("export", $);
    }, { isDark: i, colors: r } = Me(Se(a, "theme")), l = C(() => {
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
    ), f = C(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), m = ($, S) => S ? `${Math.round($ / S * 100)}%` : "0%", g = C(() => {
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
    }), v = C(() => {
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
    }), y = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], b = C(
      () => v.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), _ = C(() => {
      const $ = h.value, S = d.value.processing_success, M = Math.max(0, S - d.value.totalDqErrors), V = d.value.notification_sent, j = Math.max(0, $ - S), B = d.value.totalDqErrors, T = Math.max(0, M - V), D = (Z, Q) => ye(Z, Q), P = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], O = [];
      return S > 0 && O.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: S,
        label: D(S, $)
      }), j > 0 && O.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: j,
        label: D(j, $)
      }), M > 0 && O.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: D(M, $)
      }), B > 0 && O.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: B,
        label: D(B, $)
      }), V > 0 && O.push({
        source: "Contactable",
        target: "Notified",
        value: V,
        label: D(V, $)
      }), T > 0 && O.push({
        source: "Contactable",
        target: "Not Delivered",
        value: T,
        label: D(T, $)
      }), { nodes: P, links: O };
    }), x = C(() => {
      const $ = [...a.data?.processingCounts?.items || []].sort(
        (D, P) => new Date(D.date).getTime() - new Date(P.date).getTime()
      ), S = a.data?.documentCounts?.items || [], M = {};
      for (const D of S)
        M[D.date] = (M[D.date] || 0) + D.row_count_total;
      const V = [
        .../* @__PURE__ */ new Set([
          ...$.map((D) => D.date),
          ...S.map((D) => D.date)
        ])
      ].sort(), j = V.map((D) => We(D).format("MMM DD")), B = V.map((D) => {
        const P = $.find((Q) => Q.date === D), O = P?.notification_sent || 0, Z = M[D] || P?.processing_started || 0;
        return Z > 0 ? Math.round(O / Z * 100) : 0;
      }), T = V.map((D) => $.find((O) => O.date === D)?.notification_sent || 0);
      return {
        labels: j,
        datasets: [
          {
            label: "Success Rate (%)",
            data: B,
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
    return t({ isDark: i }), ($, S) => (p(), ee(Ce, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: S[0] || (S[0] = (M) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", v1, [
          l.value ? (p(), k(se, { key: 0 }, [
            u("section", y1, [
              S[2] || (S[2] = u("div", { class: "chart-header" }, [
                u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              u("div", x1, [
                _.value.nodes.length > 0 && _.value.links.length > 0 ? (p(), ee(Jt, {
                  key: 0,
                  data: _.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 24
                }, null, 8, ["data"])) : (p(), k("div", _1, [...S[1] || (S[1] = [
                  u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            u("div", k1, [
              N(xe, {
                color: "#3b82f6",
                title: "Total Records",
                value: R(le)(c.value.row_count_total)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: R(le)(h.value)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#10b981",
                title: "Successfully Notified",
                value: R(le)(d.value.notification_sent),
                subvalue: m(d.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#ef4444",
                title: "Not Notified",
                value: R(le)(f.value),
                subvalue: m(f.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: g.value.reason,
                subvalue: g.value.count > 0 ? `${R(le)(g.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            v.value.length > 0 ? (p(), k("section", w1, [
              S[3] || (S[3] = u("div", { class: "section-header" }, [
                u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              u("div", C1, [
                N(ct, {
                  columns: y,
                  rows: b.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": E(({ row: M }) => [
                    u("span", $1, A(M.reason), 1)
                  ]),
                  "cell-count": E(({ row: M }) => [
                    u("span", S1, A(R(le)(M.count)), 1)
                  ]),
                  "cell-impact": E(({ row: M }) => [
                    u("div", M1, [
                      u("div", {
                        class: "impact-bar",
                        style: we({ width: M.impactPct + "%" })
                      }, null, 4),
                      u("span", D1, A(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : z("", !0),
            u("div", A1, [
              x.value.labels.length > 0 ? (p(), k("section", T1, [
                S[4] || (S[4] = u("div", { class: "chart-header" }, [
                  u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                u("div", B1, [
                  N(vt, {
                    data: x.value,
                    options: w.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : z("", !0),
              u("details", L1, [
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
                  Ae(" System Health Details ")
                ], -1)),
                u("div", P1, [
                  u("div", R1, [
                    N(xe, {
                      title: "Docs Started",
                      value: R(le)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Completed",
                      value: R(le)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Failed",
                      value: R(le)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Started",
                      value: R(le)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Success",
                      value: R(le)(d.value.processing_success)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Notification Failed",
                      value: R(le)(d.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (p(), k("section", E1, [...S[6] || (S[6] = [
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
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), F1 = /* @__PURE__ */ me(I1, [["__scopeId", "data-v-3b9202b7"]]), O1 = /* @__PURE__ */ re({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), o = C(() => le(n.totalConversations)), s = C(() => R(a.value?.isDark) ?? !1), i = C(() => R(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (p(), ee(Dt, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...l[0] || (l[0] = [
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
}), V1 = /* @__PURE__ */ re({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), o = C(() => `${n.csatP95.toFixed(1)}`), s = C(() => R(a.value?.isDark) ?? !1), i = C(() => R(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (p(), ee(Dt, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...l[0] || (l[0] = [
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
}), z1 = /* @__PURE__ */ re({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), o = C(() => `${n.csatPulse.toFixed(1)}%`), s = C(() => R(a.value?.isDark) ?? !1), i = C(() => R(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (p(), ee(Dt, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...l[0] || (l[0] = [
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
}), N1 = {
  key: 0,
  class: "card-body"
}, j1 = { class: "chart-wrapper" }, H1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, W1 = {
  key: 1,
  class: "empty-state"
}, K1 = 520, Y1 = 300, U1 = 40, q1 = 48, X1 = 48, G1 = {
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
    const a = n, o = (l) => {
      a("export", l);
    }, s = e, { isDark: i } = Me(Se(s, "theme")), r = C(() => s.data);
    return t({ isDark: i }), (l, c) => (p(), ee(Ce, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !s.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        r.value && r.value.total_nps_responses > 0 ? (p(), k("div", N1, [
          u("div", j1, [
            N(or, {
              histogram: r.value.histogram || [],
              "min-score": r.value.min_score || 0,
              "max-score": r.value.max_score || 0,
              "q1-score": r.value.q1_score || 0,
              "median-score": r.value.median_score || 0,
              "q3-score": r.value.q3_score || 0,
              "average-score": r.value.average_score || 0,
              "chart-width": K1,
              "chart-height": Y1,
              "chart-margin": U1,
              "chart-margin-right": q1,
              "chart-bottom-margin": X1,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          u("div", H1, [
            N(xe, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(r.value.total_nps_responses)
            }, null, 8, ["value"]),
            r.value.p95_score > 0 ? (p(), ee(xe, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(r.value.p95_score)
            }, null, 8, ["value"])) : z("", !0)
          ])
        ])) : (p(), k("div", W1, [...c[0] || (c[0] = [
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
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, pr = /* @__PURE__ */ me(G1, [["__scopeId", "data-v-e98fe9b2"]]), Z1 = {
  key: 0,
  class: "card-body"
}, Q1 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, J1 = {
  key: 1,
  class: "empty-state"
}, ex = {
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
    }, o = e, s = C(() => o.data?.csat_p95_by_day || []), i = C(() => s.value.length > 0), r = C(() => ({
      labels: s.value.map((c) => We(c.date).format("DD-MM-YYYY")),
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
    return (c, d) => (p(), ee(Ce, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        i.value ? (p(), k("div", Z1, [
          u("div", Q1, [
            N(vt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (p(), k("div", J1, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, mr = /* @__PURE__ */ me(ex, [["__scopeId", "data-v-5207cfa7"]]), tx = {
  key: 0,
  class: "card-body"
}, nx = {
  key: 1,
  class: "empty-state"
}, ax = /* @__PURE__ */ re({
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
    ), o = C(() => {
      const i = n.value;
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
    return (i, r) => (p(), ee(Ce, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: E(() => [
        a.value ? (p(), k("div", tx, [
          N(kt, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (p(), k("div", nx, [...r[0] || (r[0] = [
          u("p", { class: "empty-title" }, "No resolution answers available", -1),
          u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ox = /* @__PURE__ */ me(ax, [["__scopeId", "data-v-6849ef24"]]), sx = {
  key: 0,
  class: "card-body"
}, ix = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, rx = {
  key: 1,
  class: "empty-state"
}, lx = /* @__PURE__ */ re({
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
    return (c, d) => (p(), ee(Ce, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: a
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        i.value ? (p(), k("div", sx, [
          u("div", ix, [
            N(vt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (p(), k("div", rx, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), cx = /* @__PURE__ */ me(lx, [["__scopeId", "data-v-72955d9a"]]), dx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ux = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, br = {
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
    }, o = e, s = C(() => o.showResolutionChart), i = C(() => o.showCsatPulseChart), r = C(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), l = C(() => r.value > 0), c = C(
      () => r.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (d, h) => (p(), k("div", dx, [
      u("div", ux, [
        N(pr, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"]),
        N(mr, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      l.value ? (p(), k("div", {
        key: 0,
        class: te(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (p(), ee(ox, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0),
        i.value ? (p(), ee(cx, {
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
}, hx = { class: "csat-container__body" }, fx = /* @__PURE__ */ re({
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
    const n = t;
    function a(o) {
      n("export", { source: "npsMetrics", format: o });
    }
    return (o, s) => (p(), ee(Ce, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => n("open"))
    }, {
      default: E(() => [
        u("div", hx, [
          N(br, {
            data: e.data,
            "enable-export": e.enableExport,
            "show-resolution-chart": e.showResolutionChart,
            "show-csat-pulse-chart": e.showCsatPulseChart,
            onExport: a
          }, null, 8, ["data", "enable-export", "show-resolution-chart", "show-csat-pulse-chart"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), gx = /* @__PURE__ */ me(fx, [["__scopeId", "data-v-37178ba1"]]), px = /* @__PURE__ */ re({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), o = C(() => Vt(n.totalRevenue)), s = C(() => R(a.value?.isDark) ?? !1), i = C(() => R(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (p(), ee(Dt, {
      label: "AI Revenue",
      value: o.value,
      prefix: e.currencyCode,
      "value-size": "large",
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalRevenue,
      "previous-value": e.previousTotalRevenue,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...l[0] || (l[0] = [
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
}), mx = { class: "flex items-center gap-2 justify-end flex-wrap" }, bx = {
  key: 0,
  class: "flex rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] p-[3px] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)]"
}, vx = ["onClick"], yx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, xx = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, _x = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, kx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, wx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Cx = /* @__PURE__ */ re({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = Se(a, "theme"), { isDark: i, colors: r } = Me(s), l = ae(a.breakdownBy), c = ae("local"), d = C(() => a.data?.currency ?? "USD"), h = C(
      () => c.value === "usd" ? "USD" : d.value
    ), f = C(() => [
      { value: "local", label: d.value },
      { value: "usd", label: "USD" }
    ]), m = C(() => l.value === "payment_method"), g = [
      "#a78bfa",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], v = (D) => g[D % g.length], y = (D) => {
      if (!D) return "0";
      const P = Math.abs(D);
      return P >= 1e6 ? (D / 1e6).toFixed(2) + "M" : P >= 1e5 ? (D / 1e3).toFixed(1) + "K" : Math.round(D).toLocaleString();
    }, b = (D) => !D || D === "unknown" ? "Unknown" : D.split(/[_|]/).map((P) => P ? P.charAt(0).toUpperCase() + P.slice(1) : "").join(" "), _ = ae({
      labels: [],
      datasets: []
    }), x = ae([]), w = C(() => {
      const D = Math.min(x.value.length, 5);
      if (!(D <= 0))
        return { gridTemplateColumns: `repeat(${D}, minmax(0, 1fr))` };
    }), $ = (D) => {
      const P = D?.ai_revenue_by_day ?? [], O = D?.breakdown ?? [];
      if (!P.length) {
        _.value = { labels: [], datasets: [] }, x.value = [];
        return;
      }
      const Z = [...P].sort((X, L) => X.date.localeCompare(L.date)), Q = Z.map((X) => We(X.date).format("MMM DD")), ne = c.value === "usd" ? "ai_revenue_usd" : "ai_revenue";
      if (l.value === "all") {
        _.value = {
          labels: Q,
          datasets: [
            {
              label: `Revenue (${h.value})`,
              data: Z.map((X) => Number(X[ne] ?? 0)),
              borderColor: g[0],
              backgroundColor: "rgba(167,139,250,0.08)",
              fill: !1,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#ffffff",
              pointBorderColor: g[0],
              pointBorderWidth: 2
            }
          ]
        }, x.value = [];
        return;
      }
      const ge = O.slice(0, 7).map((X) => X.key).map((X, L) => {
        const H = v(L), K = Z.map((ce) => {
          const ve = (ce.breakdown ?? {})[X];
          return ve ? Number(ve[ne] ?? 0) : 0;
        });
        return m.value ? {
          label: b(X),
          data: K,
          backgroundColor: H,
          borderColor: H,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: b(X),
          data: K,
          borderColor: H,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: H,
          pointBorderWidth: 2
        };
      });
      _.value = { labels: Q, datasets: ge }, x.value = O.slice(0, 5).map((X, L) => {
        const H = c.value === "usd" ? X.total_usd : X.total;
        return {
          key: X.key,
          label: b(X.key),
          amount: `${h.value} ${y(H)}`,
          percentage: Number(X.percentage ?? 0),
          color: v(L)
        };
      });
    }, S = C(() => ({
      callback: (D) => `${h.value} ${y(Number(D))}`,
      color: r.value.textSecondary,
      padding: 8
    })), M = C(() => ({
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: r.value.textSecondary, padding: 8 }
    })), V = C(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: S.value
    })), j = C(() => ({
      scales: {
        x: M.value,
        y: V.value
      }
    })), B = C(() => ({
      scales: {
        x: { ...M.value, stacked: !0 },
        y: { ...V.value, stacked: !0 }
      }
    }));
    Ie(
      () => a.data,
      (D) => {
        D && (c.value = D.currency === "USD" ? "usd" : "local"), $(D ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Ie(
      () => a.breakdownBy,
      (D) => {
        l.value = D, $(a.data ?? null);
      }
    ), Ie(c, () => {
      $(a.data ?? null);
    });
    const T = () => {
      o("changeBreakdown", l.value);
    };
    return t({ isDark: i }), (D, P) => (p(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "AI Generated Revenue",
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: E(() => [
        u("div", mx, [
          Ge(u("select", {
            "onUpdate:modelValue": P[0] || (P[0] = (O) => l.value = O),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: T
          }, [...P[1] || (P[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "payment_method" }, "Payment Method", -1),
            u("option", { value: "agent_type" }, "Agent Type", -1),
            u("option", { value: "channel" }, "Channel", -1),
            u("option", { value: "channel_and_agent" }, "Channel & Agent", -1)
          ])], 544), [
            [li, l.value]
          ]),
          d.value !== "USD" ? (p(), k("div", bx, [
            (p(!0), k(se, null, fe(f.value, (O) => (p(), k("button", {
              key: O.value,
              class: te([
                "rounded-[9px] px-3 py-1 text-xs font-medium transition-all",
                c.value === O.value ? "bg-white shadow-sm text-[var(--kiut-text-primary,#111827)] font-semibold dark:bg-[#1f2937] dark:text-[var(--kiut-text-primary,#f9fafb)]" : "text-[var(--kiut-text-secondary,#6b7280)] dark:text-[var(--kiut-text-secondary,#9ca3af)]"
              ]),
              onClick: (Z) => c.value = O.value
            }, A(O.label), 11, vx))), 128))
          ])) : z("", !0)
        ])
      ]),
      default: E(() => [
        u("div", {
          class: te(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          N(ut, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              a.loading ? (p(), k("div", yx, [...P[2] || (P[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", xx, [
                _.value.labels && _.value.labels.length && _.value.datasets.length ? (p(), k("section", _x, [
                  u("div", kx, [
                    m.value ? (p(), ee(kt, {
                      key: 0,
                      data: _.value,
                      options: B.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (p(), ee(vt, {
                      key: 1,
                      data: _.value,
                      options: j.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  x.value.length ? (p(), k("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: we(w.value)
                  }, [
                    (p(!0), k(se, null, fe(x.value, (O) => (p(), ee(xe, {
                      key: `card-${O.key}`,
                      class: "min-w-0",
                      color: O.color,
                      title: O.label,
                      value: O.amount,
                      subvalue: `${O.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : z("", !0)
                ])) : (p(), k("section", wx, [...P[3] || (P[3] = [
                  u("div", { class: "max-w-[360px] px-4 text-center" }, [
                    u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No revenue data available "),
                    u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No AI revenue found for the selected period. Try adjusting the date range. ")
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
}), $x = /* @__PURE__ */ me(Cx, [["__scopeId", "data-v-953987bf"]]), ti = 1, Sx = /* @__PURE__ */ re({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), { isDark: o } = Me(Se(n, "theme")), s = C(() => n.totalConversations * ti), i = C(() => n.previousTotalConversations === null || n.previousTotalConversations === void 0 ? null : n.previousTotalConversations * ti), r = C(() => le(s.value)), l = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!l.value) return 0;
      const f = i.value;
      return f === 0 ? s.value > 0 ? 100 : 0 : (s.value - f) / f * 100;
    }), d = C(() => {
      const f = c.value.toFixed(1);
      return c.value > 0 ? `+${f}%` : `${f}%`;
    }), h = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (f, m) => (p(), ee(Dt, {
      label: "Cost",
      value: r.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...m[0] || (m[0] = [
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
      headerAside: E(() => [
        l.value ? (p(), k("div", {
          key: 0,
          class: te(["change-badge", h.value, { "change-badge--dark": R(o) }])
        }, A(d.value), 3)) : z("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Mx = /* @__PURE__ */ me(Sx, [["__scopeId", "data-v-411e0735"]]), Dx = { class: "flex justify-end" }, Ax = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Tx = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Bx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Lx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Px = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Rx = /* @__PURE__ */ re({
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
    const a = e, o = n, s = (w) => {
      o("export", w);
    }, i = Se(a, "theme"), { isDark: r } = Me(i), l = ae(a.breakdownBy), c = C(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), d = ae({
      labels: [],
      datasets: []
    }), h = ae([]), f = C(() => {
      const w = h.value.length;
      if (!(w <= 0))
        return { gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` };
    }), m = ae(
      []
    ), g = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], v = (w) => g[w % g.length], y = {
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
    }, b = () => {
      o("changeBreakdown", l.value);
    }, _ = (w) => {
      if (!w) return "";
      const S = w.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return S ? S.charAt(0).toUpperCase() + S.slice(1) : "";
    }, x = (w) => {
      if (l.value === "all") {
        const T = w?.escalations_by_day ?? [];
        if (!T.length) {
          d.value = { labels: [], datasets: [] }, h.value = [], m.value = [];
          return;
        }
        const D = [...T].sort((P, O) => P.date.localeCompare(O.date));
        d.value = {
          labels: D.map((P) => We(P.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: D.map(
                (P) => Number(P.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, h.value = [], m.value = [];
        return;
      }
      const $ = w?.breakdown_by_day ?? [], S = w?.breakdown_items ?? [];
      if (!$.length) {
        d.value = { labels: [], datasets: [] }, h.value = [], m.value = [];
        return;
      }
      const M = [...$].sort(
        (T, D) => T.date.localeCompare(D.date)
      ), V = S.slice(0, 5).map((T) => T.key), j = M.map((T) => We(T.date).format("MMM DD")), B = V.map((T, D) => {
        const P = S.find((O) => O.key === T);
        return {
          label: _(P?.label || T),
          data: M.map((O) => {
            const Z = O.items.find((Q) => Q.key === T);
            return Number(Z?.percentage || 0);
          }),
          borderColor: v(D),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      d.value = {
        labels: j,
        datasets: B
      }, h.value = S.slice(0, 5).map((T, D) => ({
        key: T.key,
        label: _(T.label),
        percentage: Number(T.percentage || 0),
        color: v(D)
      })), m.value = S.slice(0, 5).map((T, D) => ({
        key: T.key,
        label: _(T.label),
        color: v(D)
      }));
    };
    return Ie(
      () => a.data,
      (w) => {
        x(w ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Ie(
      () => a.breakdownBy,
      (w) => {
        l.value = w, x(c.value);
      }
    ), t({ isDark: r }), (w, $) => (p(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      headerAside: E(() => [
        u("div", Dx, [
          Ge(u("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (S) => l.value = S),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: b
          }, [...$[1] || ($[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [li, l.value]
          ])
        ])
      ]),
      default: E(() => [
        u("div", Ax, [
          u("div", Tx, [
            d.value.labels && d.value.labels.length && d.value.datasets.length ? (p(), k("section", Bx, [
              u("div", Lx, [
                N(vt, {
                  data: d.value,
                  options: y,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              h.value.length ? (p(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(f.value)
              }, [
                (p(!0), k(se, null, fe(h.value, (S) => (p(), ee(xe, {
                  key: `card-${S.key}`,
                  class: "min-w-0",
                  color: S.color,
                  title: S.label,
                  value: `${S.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : z("", !0)
            ])) : (p(), k("section", Px, [...$[2] || ($[2] = [
              u("div", { class: "max-w-[360px] px-4 text-center" }, [
                u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ex = /* @__PURE__ */ me(Rx, [["__scopeId", "data-v-b18e0ebd"]]), Ix = /* @__PURE__ */ re({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), o = C(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => R(a.value?.isDark) ?? !1), i = C(() => R(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (p(), ee(Dt, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...l[0] || (l[0] = [
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
}), Fx = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ox = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Vx = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, zx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Nx = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, jx = { class: "max-w-[360px] text-center" }, Hx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Wx = {
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
    const t = e, { isDark: n, colors: a } = Me(Se(t, "theme")), o = C(() => {
      const r = t.data ?? {}, l = r.daily, c = r.days, d = Array.isArray(l) && l.length > 0, h = Array.isArray(c) && c.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === c.length;
      let f = [];
      return d ? f = l : h && (f = c.map((m, g) => ({
        date: m,
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
    }), s = C(() => {
      const r = o.value.daily;
      return {
        labels: r.map((c) => c.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: r.map((c) => c.allocated_cost),
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
            borderColor: a.value.info,
            backgroundColor: n.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
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
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
          borderColor: a.value.tooltipBorder,
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: !0,
          usePointStyle: !0,
          callbacks: {
            label(r) {
              const l = r.dataset.label ? `${r.dataset.label}: ` : "", c = r.parsed.y;
              return r.dataset.yAxisID === "y" ? l + Le(c) : l + String(c);
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
            callback: (r) => Le(r)
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
    return (r, l) => (p(), ee(Ce, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", Fx, [
          o.value.daily.length > 0 ? (p(), k("div", Ox, [
            u("div", Vx, [
              N(vt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", zx, [
              N(xe, {
                color: R(a).primaryLight,
                title: "Total Allocated",
                value: R(Le)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              N(xe, {
                color: "#FF9900",
                title: "Total AWS",
                value: R(Le)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (p(), k("section", Nx, [
            u("div", jx, [
              u("div", Hx, [
                N(R(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              l[0] || (l[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              l[1] || (l[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}, Kx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Yx = { class: "card-body" }, Ux = {
  key: 0,
  class: "chart-section"
}, qx = { class: "chart-container" }, Xx = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, Gx = {
  key: 1,
  class: "empty-state"
}, Zx = { class: "empty-state-content" }, Qx = { class: "empty-icon-wrapper" }, Tn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ni = 10, Jx = /* @__PURE__ */ re({
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
    const a = e, { isDark: o, colors: s } = Me(Se(a, "theme")), i = (g) => {
      const v = new Date(g), y = String(v.getDate()).padStart(2, "0"), b = String(v.getMonth() + 1).padStart(2, "0");
      return `${y}-${b}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((v, y) => v + (y.input_cost || 0), 0);
    }), c = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((v, y) => v + (y.output_cost || 0), 0);
    }), d = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((v, y) => v + (y.cache_read_cost || 0), 0);
    }), h = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((v, y) => v + (y.cache_write_cost || 0), 0);
    }), f = C(() => {
      const g = a.data?.costs_by_day || {}, v = Object.keys(g).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const y = v.map((_) => i(_)), b = [
        {
          label: "Input Cost",
          data: v.map((_) => g[_]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: v.map((_) => g[_]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: v.map((_) => g[_]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: v.map((_) => g[_]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: y,
        datasets: b
      };
    }), m = C(() => a.options ? a.options : {
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
              family: Tn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: ni,
            boxHeight: ni,
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
            family: Tn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Tn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(g) {
              let v = g.dataset.label || "";
              return v && (v += ": "), g.parsed.y !== null && (v += Le(g.parsed.y)), v;
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
            font: { family: Tn, size: 12, weight: "500" },
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
            font: { family: Tn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return Le(g);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (g, v) => (p(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", Kx, [
          u("div", Yx, [
            f.value.labels && f.value.labels.length ? (p(), k("section", Ux, [
              u("div", qx, [
                N(kt, {
                  data: f.value,
                  options: m.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Xx, [
                N(xe, {
                  title: "Total Cost",
                  value: R(Le)(e.data.total_cost)
                }, null, 8, ["value"]),
                N(xe, {
                  title: "Input Cost",
                  value: R(Le)(l.value),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Output Cost",
                  value: R(Le)(c.value),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Cache Read",
                  value: R(Le)(d.value),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Cache Write",
                  value: R(Le)(h.value),
                  color: r.cache_write
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Avg / Conv.",
                  value: R(Le)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", Gx, [
              u("div", Zx, [
                u("div", Qx, [
                  N(R(at), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = u("p", { class: "empty-title" }, "No cost usage data", -1)),
                v[1] || (v[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), e_ = /* @__PURE__ */ me(Jx, [["__scopeId", "data-v-e1c4a95b"]]), t_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, n_ = { class: "card-body" }, a_ = {
  key: 0,
  class: "chart-section"
}, o_ = { class: "chart-container" }, s_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, i_ = {
  key: 1,
  class: "empty-state"
}, r_ = { class: "empty-state-content" }, l_ = { class: "empty-icon-wrapper" }, Bn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ai = 10, c_ = /* @__PURE__ */ re({
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
    const a = e, { isDark: o, colors: s } = Me(Se(a, "theme")), i = (d) => {
      const h = new Date(d), f = String(h.getDate()).padStart(2, "0"), m = String(h.getMonth() + 1).padStart(2, "0");
      return `${f}-${m}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((g) => i(g)), m = [
        {
          label: "Input Tokens",
          data: h.map((g) => d[g]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((g) => d[g]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((g) => d[g]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((g) => d[g]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: f,
        datasets: m
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
              family: Bn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: ai,
            boxHeight: ai,
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
            family: Bn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Bn,
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
            font: { family: Bn, size: 12, weight: "500" },
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
            font: { family: Bn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (d, h) => (p(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", t_, [
          u("div", n_, [
            l.value.labels && l.value.labels.length ? (p(), k("section", a_, [
              u("div", o_, [
                N(kt, {
                  data: l.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", s_, [
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: R(le)(e.data.total_tokens)
                }, null, 8, ["value"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: R(le)(e.data.total_input_tokens),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: R(le)(e.data.total_output_tokens),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: R(le)(e.data.total_cache_read_tokens),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: R(le)(e.data.total_cache_write_tokens),
                  color: r.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (p(), k("section", i_, [
              u("div", r_, [
                u("div", l_, [
                  N(R(at), { class: "empty-icon" })
                ]),
                h[0] || (h[0] = u("p", { class: "empty-title" }, "No token usage data", -1)),
                h[1] || (h[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), d_ = /* @__PURE__ */ me(c_, [["__scopeId", "data-v-554d3cda"]]), u_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, h_ = { class: "card-body" }, f_ = {
  key: 0,
  class: "chart-section"
}, g_ = { class: "chart-container" }, p_ = { class: "mt-4 w-full min-w-0" }, m_ = {
  key: 1,
  class: "empty-state"
}, b_ = { class: "empty-state-content" }, v_ = { class: "empty-icon-wrapper" }, y_ = /* @__PURE__ */ re({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(
      () => le(n.data?.total_conversations ?? 0)
    ), r = C(() => {
      const c = n.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((m) => s(m)), f = [
        {
          label: "Conversations",
          data: d.map((m) => c[m] || 0),
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
        datasets: f
      };
    }), l = C(() => n.options ? n.options : {
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
    return t({ isDark: a }), (c, d) => (p(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", u_, [
          u("div", h_, [
            r.value.labels && r.value.labels.length ? (p(), k("section", f_, [
              u("div", g_, [
                N(vt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", p_, [
                N(xe, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", m_, [
              u("div", b_, [
                u("div", v_, [
                  N(R(at), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No conversation count data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), x_ = /* @__PURE__ */ me(y_, [["__scopeId", "data-v-311f443a"]]), __ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, k_ = { class: "card-body" }, w_ = {
  key: 0,
  class: "charts-grid"
}, C_ = { class: "chart-section" }, $_ = { class: "chart-container" }, S_ = { class: "chart-section" }, M_ = { class: "chart-container" }, D_ = {
  key: 1,
  class: "empty-state"
}, A_ = { class: "empty-state-content" }, T_ = { class: "empty-icon-wrapper" }, B_ = /* @__PURE__ */ re({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = C(() => n.data?.top_agents && n.data.top_agents.length > 0), i = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((f, m) => (m.total_cost || 0) - (f.total_cost || 0)) : []), r = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((f, m) => (m.total_tokens || 0) - (f.total_tokens || 0)) : []), l = C(() => {
      const f = i.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((m) => m.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: f.map((m) => m.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = C(() => {
      const f = r.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((m) => m.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: f.map((m) => m.total_tokens || 0),
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
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
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
              const m = f.label, g = n.data?.top_agents?.find((v) => v.agent_type === m);
              return g ? [
                `Total Cost: ${Le(g.total_cost)}`,
                `Input Cost: ${Le(g.total_input_tokens_cost)}`,
                `Output Cost: ${Le(g.total_output_tokens_cost)}`,
                `Cache Read: ${Le(g.total_read_tokens_cost)}`,
                `Cache Write: ${Le(g.total_write_tokens_cost)}`
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
            callback: function(f) {
              return Le(f);
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
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
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
              const m = f.label, g = n.data?.top_agents?.find((v) => v.agent_type === m);
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
            callback: function(f) {
              return f.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (f, m) => (p(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", __, [
          u("div", k_, [
            s.value ? (p(), k("div", w_, [
              u("section", C_, [
                m[0] || (m[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", $_, [
                  N(kt, {
                    data: l.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", S_, [
                m[1] || (m[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", M_, [
                  N(kt, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (p(), k("section", D_, [
              u("div", A_, [
                u("div", T_, [
                  N(R(at), { class: "empty-icon" })
                ]),
                m[2] || (m[2] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                m[3] || (m[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), L_ = /* @__PURE__ */ me(B_, [["__scopeId", "data-v-bb4ae132"]]), P_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, R_ = { class: "card-body" }, E_ = {
  key: 0,
  class: "chart-section"
}, I_ = { class: "chart-container" }, F_ = {
  key: 1,
  class: "empty-state"
}, O_ = { class: "empty-state-content" }, V_ = { class: "empty-icon-wrapper" }, z_ = /* @__PURE__ */ re({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = {
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
    ) : []), r = C(() => i.value.length > 0), l = C(() => i.value.reduce((h, f) => h + (f.conversations || 0), 0)), c = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((v) => {
        const y = v.agent_type?.toLowerCase();
        return (s[y] || "#a78bfa") + "80";
      }), m = h.map((v) => {
        const y = v.agent_type?.toLowerCase();
        return s[y] || "#a78bfa";
      });
      return {
        labels: h.map((v) => {
          const y = v.conversations || 0, b = l.value ? y / l.value * 100 : 0;
          return `${v.agent_type} - ${y.toLocaleString()} (${b.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((v) => v.conversations || 0),
            backgroundColor: f,
            borderColor: m,
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
              const f = (h.label || "").toString(), m = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((y, b) => y + (Number(b) || 0), 0), v = g ? m / g * 100 : 0;
              return `${f}: ${m.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, f) => (p(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", P_, [
          u("div", R_, [
            r.value ? (p(), k("section", E_, [
              u("div", I_, [
                N(Aa, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (p(), k("section", F_, [
              u("div", O_, [
                u("div", V_, [
                  N(R(at), { class: "empty-icon" })
                ]),
                f[0] || (f[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                f[1] || (f[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), N_ = /* @__PURE__ */ me(z_, [["__scopeId", "data-v-74c924dc"]]), j_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, H_ = { class: "card-body" }, W_ = {
  key: 0,
  class: "chart-section"
}, K_ = { class: "chart-container" }, Y_ = {
  key: 1,
  class: "empty-state"
}, U_ = { class: "empty-state-content" }, q_ = { class: "empty-icon-wrapper" }, X_ = /* @__PURE__ */ re({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), r = C(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const y = [...c].sort((b, _) => b.date.localeCompare(_.date));
        return {
          labels: y.map((b) => s(b.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: y.map((b) => Number(b.value) || 0),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, m = Object.keys(d).filter((y) => h[y]).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const g = m.map((y) => s(y)), v = m.map((y) => {
        const b = d[y]?.total_cost || 0, _ = h[y] || 0;
        return _ > 0 ? b / _ : 0;
      });
      return {
        labels: g,
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
    }), l = C(() => n.options ? n.options : {
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
              return d && (d += ": "), c.parsed.y !== null && (d += Le(c.parsed.y)), d;
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
              return Le(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, d) => (p(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", j_, [
          u("div", H_, [
            i.value ? (p(), k("section", W_, [
              u("div", K_, [
                N(vt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (p(), k("section", Y_, [
              u("div", U_, [
                u("div", q_, [
                  N(R(at), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No daily cost trends data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), G_ = /* @__PURE__ */ me(X_, [["__scopeId", "data-v-ae6c48b1"]]), Z_ = { class: "tabs text-sm" }, Q_ = ["aria-label"], J_ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], ek = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, tk = /* @__PURE__ */ re({
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
    const n = e, a = t, o = ae([]), s = `tabs-${Ye()}`, i = (g) => `${s}-tab-${g}`, r = C(
      () => n.items.map((g, v) => g.disabled ? -1 : v).filter((g) => g >= 0)
    );
    function l(g) {
      return g.value === n.modelValue;
    }
    function c(g) {
      const v = l(g), b = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${b} cursor-not-allowed opacity-40` : v ? `${b} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${b} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(g, v) {
      g === v || n.items.find((b) => b.value === g)?.disabled || (a("update:modelValue", g), a("change", { value: g, previousValue: v }));
    }
    function h(g, v) {
      a("tab-click", { value: g.value, originalEvent: v }), !g.disabled && (d(g.value, n.modelValue), je(() => {
        o.value[n.items.indexOf(g)]?.focus();
      }));
    }
    function f(g, v) {
      const y = n.items.length;
      if (y === 0) return 0;
      let b = g;
      for (let _ = 0; _ < y; _++)
        if (b = (b + v + y) % y, !n.items[b]?.disabled) return b;
      return g;
    }
    async function m(g, v) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let b = v;
      g.key === "ArrowLeft" ? b = f(v, -1) : g.key === "ArrowRight" ? b = f(v, 1) : g.key === "Home" ? b = r.value[0] ?? 0 : g.key === "End" && (b = r.value[r.value.length - 1] ?? v);
      const _ = n.items[b];
      !_ || _.disabled || (d(_.value, n.modelValue), await je(), o.value[b]?.focus());
    }
    return (g, v) => (p(), k("div", Z_, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: te([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (p(!0), k(se, null, fe(e.items, (y, b) => (p(), k("button", {
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
          class: te(c(y)),
          onClick: (_) => h(y, _),
          onKeydown: (_) => m(_, b)
        }, [
          u("span", {
            class: te(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            y.icon ? (p(), ee(Mt(y.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : z("", !0),
            u("span", ek, A(y.label), 1)
          ], 2)
        ], 42, J_))), 128))
      ], 10, Q_),
      g.$slots.default ? (p(), ee(ut, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: E(() => [
          (p(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            _e(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : z("", !0)
    ]));
  }
}), vr = /* @__PURE__ */ me(tk, [["__scopeId", "data-v-f9c367eb"]]), nk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ak = { class: "card-body" }, ok = {
  key: 0,
  class: "model-usage-table-block"
}, sk = { class: "w-full min-w-0" }, ik = {
  key: 1,
  class: "empty-state"
}, rk = { class: "empty-state-content" }, lk = { class: "empty-icon-wrapper" }, ck = /* @__PURE__ */ re({
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
    const a = e, o = n, s = (g) => {
      o("export", g);
    }, { isDark: i } = Me(Se(a, "theme")), r = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], l = ae("by_model"), c = C(() => l.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = C(() => [
      { key: "name", label: l.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = C(
      () => Object.entries(c.value).map(([g, v]) => ({
        id: g,
        name: g,
        avgCost: m(v.avg_cost_per_message),
        avgTokens: f(v.avg_tokens_per_message),
        messageCount: f(v.message_count),
        totalCost: m(v.total_cost),
        totalTokens: f(v.total_tokens)
      }))
    ), f = (g) => g == null ? "0" : le(g), m = (g) => g == null ? "$0.00" : Le(g);
    return t({ isDark: i }), (g, v) => (p(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", nk, [
          u("div", ak, [
            N(vr, {
              modelValue: l.value,
              "onUpdate:modelValue": v[0] || (v[0] = (y) => l.value = y),
              items: r,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: E(() => [
                c.value && Object.keys(c.value).length > 0 ? (p(), k("div", ok, [
                  u("div", sk, [
                    N(ct, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (p(), k("div", ik, [
                  u("div", rk, [
                    u("div", lk, [
                      N(R(at), { class: "empty-icon" })
                    ]),
                    v[1] || (v[1] = u("p", { class: "empty-title" }, "No model usage data available", -1)),
                    v[2] || (v[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), dk = /* @__PURE__ */ me(ck, [["__scopeId", "data-v-48a6cc07"]]), uk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, hk = { class: "card-body" }, fk = {
  key: 0,
  class: "message-roles-table-block"
}, gk = { class: "w-full min-w-0" }, pk = {
  key: 1,
  class: "empty-state"
}, mk = { class: "empty-state-content" }, bk = { class: "empty-icon-wrapper" }, vk = /* @__PURE__ */ re({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me(Se(a, "theme")), r = ["assistant", "system", "user"], l = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => a.data?.total_by_role || {}), d = C(
      () => r.map((v) => ({
        id: v,
        role: g(v),
        avgCost: m(c.value[v]?.avg_cost_per_message),
        avgTokens: f(c.value[v]?.avg_tokens_per_message),
        messageCount: f(c.value[v]?.message_count),
        totalCost: m(c.value[v]?.total_cost),
        totalTokens: f(c.value[v]?.total_tokens)
      }))
    ), h = C(() => Object.keys(c.value).length > 0), f = (v) => v == null ? "0" : le(v), m = (v) => v == null ? "$0.00" : Le(v), g = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, y) => (p(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", uk, [
          u("div", hk, [
            h.value ? (p(), k("div", fk, [
              u("div", gk, [
                N(ct, {
                  columns: l,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (p(), k("div", pk, [
              u("div", mk, [
                u("div", bk, [
                  N(R(at), { class: "empty-icon" })
                ]),
                y[0] || (y[0] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                y[1] || (y[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), yk = /* @__PURE__ */ me(vk, [["__scopeId", "data-v-d38e854e"]]), xk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, _k = { class: "card-body" }, kk = {
  key: 0,
  class: "chart-section"
}, wk = { class: "chart-container" }, Ck = { class: "kpi-grid" }, $k = {
  key: 1,
  class: "empty-state"
}, Sk = { class: "empty-state-content" }, Mk = { class: "empty-icon-wrapper" }, Dk = 40, Ak = 230, Tk = /* @__PURE__ */ re({
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
    const a = e, o = n, s = (x) => {
      o("export", x);
    }, { isDark: i, colors: r } = Me(Se(a, "theme")), l = {
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
    }, c = (x) => x.agent_type || x.agent_id || x.agent_name || "", d = (x) => x.agent_name ? x.agent_name : c(x).split("_").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (x) => {
      const w = c(x).toLowerCase();
      for (const [$, S] of Object.entries(l))
        if (w.includes($))
          return S;
      return "#9ca3af";
    }, f = C(() => [...a.data?.top_agents || []].sort((w, $) => $.avg_cost_per_conversation - w.avg_cost_per_conversation)), m = C(
      () => Math.max(Ak, f.value.length * Dk + 32)
    ), g = C(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : f.value.reduce((x, w) => x + w.conversations, 0)), v = C(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : f.value.reduce((x, w) => x + w.total_cost, 0)), y = C(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : g.value === 0 ? 0 : v.value / g.value), b = C(() => {
      const x = f.value;
      if (x.length === 0)
        return { labels: [], datasets: [] };
      const w = x.map((M) => d(M)), $ = x.map((M) => M.avg_cost_per_conversation), S = x.map((M) => h(M));
      return {
        labels: w,
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
    }), _ = C(() => a.options ? a.options : {
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
            title: function(x) {
              const w = f.value[x[0]?.dataIndex];
              return w ? d(w) : "";
            },
            label: function(x) {
              const w = f.value[x.dataIndex];
              return [
                `Cost: ${Le(x.parsed.x)}`,
                `Conversations: ${le(w.conversations)}`,
                `Total Cost: ${Le(w.total_cost)}`
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
            callback: function(x) {
              return Le(x);
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
    return t({ isDark: i }), (x, w) => (p(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (p(), ee(R(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: E(() => [
        u("div", xk, [
          u("div", _k, [
            b.value.labels && b.value.labels.length ? (p(), k("section", kk, [
              u("div", wk, [
                N(kt, {
                  data: b.value,
                  options: _.value,
                  "height-px": m.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              u("footer", Ck, [
                N(R(xe), {
                  title: "Total Agents",
                  value: String(f.value.length)
                }, null, 8, ["value"]),
                N(R(xe), {
                  title: "Total Conversations",
                  value: R(le)(g.value)
                }, null, 8, ["value"]),
                N(R(xe), {
                  title: "Total Cost",
                  value: R(Le)(v.value)
                }, null, 8, ["value"]),
                N(R(xe), {
                  title: "Avg Cost / Conv.",
                  value: R(Le)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", $k, [
              u("div", Sk, [
                u("div", Mk, [
                  N(R(at), { class: "empty-icon" })
                ]),
                w[0] || (w[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                w[1] || (w[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Bk = /* @__PURE__ */ me(Tk, [["__scopeId", "data-v-65f2d154"]]);
function So(e, t) {
  const n = e[t];
  return Array.isArray(n) ? n.filter(
    (a) => a !== null && typeof a == "object" && !Array.isArray(a)
  ) : [];
}
function yr(e, t) {
  const { childrenKey: n, sortKey: a, sortDirection: o, compare: s } = t;
  return [...e].sort((i, r) => s(i, r, a, o)).map((i) => {
    const r = So(i, n);
    return r.length === 0 ? i : {
      ...i,
      [n]: yr(r, t)
    };
  });
}
function xr(e, t, n = 0, a = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: r, maxDepth: l } = t, c = [];
  return e.forEach((d, h) => {
    const f = r(d, o + h), m = So(d, s), g = m.length > 0, v = i.has(f);
    c.push({
      row: d,
      key: f,
      depth: n,
      hasChildren: g,
      isExpanded: v,
      parentKey: a
    }), g && v && (l === void 0 || n < l) && c.push(
      ...xr(m, t, n + 1, f, 0)
    );
  }), c;
}
function _r(e, t, n = 0, a = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, r = [];
  return e.forEach((l, c) => {
    const d = s(l, a + c), h = So(l, o), f = h.length > 0, m = {
      depth: n,
      isChild: n > 0,
      hasChildren: f
    };
    (i?.(l, m) ?? !0) && r.push(d), h.length > 0 && r.push(
      ..._r(h, t, n + 1, 0)
    );
  }), r;
}
const Lk = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Pk = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, Rk = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Ek = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, Ik = ["checked", "aria-label"], Fk = ["aria-sort", "onClick"], Ok = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Vk = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, zk = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Nk = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, jk = ["checked", "aria-label", "onChange"], Hk = ["aria-expanded", "aria-label", "onClick"], Wk = ["aria-expanded", "aria-label", "onClick"], Kk = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, Yk = { class: "min-w-0 flex-1" }, Uk = /* @__PURE__ */ re({
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
    const n = e, a = t, o = ae(null), s = ae([...n.defaultExpandedKeys]), i = C({
      get() {
        return n.expandedKeys ?? s.value;
      },
      set(L) {
        s.value = L, a("update:expandedKeys", L);
      }
    }), r = C(
      () => new Set(i.value)
    ), l = C(
      () => n.expandColumnKey ?? n.columns[0]?.key ?? ""
    ), c = C(() => ({
      childrenKey: n.childrenKey,
      expandedKeys: r.value,
      resolveRowKey: g,
      maxDepth: n.maxDepth
    })), d = C(() => {
      const { sortKey: L, sortDirection: H, sortCompare: K, rows: ce } = n;
      return !L || !H || !K ? ce : n.expandable ? yr(ce, {
        childrenKey: n.childrenKey,
        sortKey: L,
        sortDirection: H,
        compare: K
      }) : [...ce].sort((ve, De) => K(ve, De, L, H));
    }), h = C(() => n.expandable ? xr(d.value, c.value) : d.value.map((L, H) => ({
      row: L,
      key: g(L, H),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function f(L) {
      return `cell-${L}`;
    }
    function m(L) {
      return L === "center" ? "text-center" : L === "right" ? "text-right" : "text-left";
    }
    function g(L, H) {
      if (typeof n.rowKey == "function")
        return n.rowKey(L);
      const K = L[n.rowKey];
      return K != null ? String(K) : `__index_${H}`;
    }
    function v(L, H) {
      return L[H];
    }
    function y(L) {
      return L == null || typeof L == "object" ? "" : String(L);
    }
    function b(L) {
      return n.expandable && L === l.value;
    }
    function _(L) {
      return L.hasChildren || (n.isRowExpandable?.(L.row) ?? !1);
    }
    function x(L, H) {
      return {
        row: L.row,
        column: H,
        value: v(L.row, H.key),
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren,
        expanded: L.isExpanded
      };
    }
    function w(L) {
      if (!_(L)) return;
      const H = new Set(i.value);
      H.has(L.key) ? (H.delete(L.key), a("collapse", L.key, L.row)) : (n.singleExpand && H.clear(), H.add(L.key), a("expand", L.key, L.row)), i.value = [...H];
    }
    function $(L) {
      return {
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren
      };
    }
    function S(L, H) {
      return n.isRowSelectable?.(L, H) ?? !0;
    }
    function M(L) {
      return S(L.row, $(L));
    }
    function V(L) {
      return n.selectable && _(L) && !M(L);
    }
    function j(L) {
      return _(L) && !V(L);
    }
    function B(L) {
      return j(L) ? !1 : L.depth > 0 ? !0 : n.selectable && !_(L);
    }
    const T = C(() => {
      const { isRowSelectable: L } = n;
      return n.expandable ? _r(d.value, {
        childrenKey: n.childrenKey,
        resolveRowKey: g,
        isRowSelectable: L
      }) : d.value.map((H, K) => ({
        row: H,
        key: g(H, K),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: H, context: K }) => S(H, K)).map(({ key: H }) => H);
    });
    function D(L) {
      const H = String(L);
      return n.selectedKeys.some((K) => String(K) === H);
    }
    const P = C(() => !n.selectable || T.value.length === 0 ? !1 : T.value.every(
      (L) => n.selectedKeys.some((H) => String(H) === String(L))
    )), O = C(() => {
      if (!n.selectable || T.value.length === 0) return !1;
      const L = T.value.filter(
        (H) => n.selectedKeys.some((K) => String(K) === String(H))
      );
      return L.length > 0 && L.length < T.value.length;
    });
    Ie(
      [O, P, () => n.selectable],
      async () => {
        await je();
        const L = o.value;
        L && (L.indeterminate = O.value && !P.value);
      },
      { immediate: !0 }
    );
    function Z() {
      if (n.selectable)
        if (P.value) {
          const L = new Set(
            T.value.map((K) => String(K))
          ), H = n.selectedKeys.filter(
            (K) => !L.has(String(K))
          );
          a("update:selectedKeys", H);
        } else {
          const L = new Set(n.selectedKeys.map((H) => String(H)));
          T.value.forEach((H) => L.add(String(H))), a("update:selectedKeys", [...L]);
        }
    }
    function Q(L) {
      if (!n.selectable) return;
      const H = String(L), K = h.value.find((ve) => String(ve.key) === H);
      if (K && !M(K) || !K && !T.value.some((ve) => String(ve) === H))
        return;
      n.selectedKeys.some((ve) => String(ve) === H) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((ve) => String(ve) !== H)
      ) : a("update:selectedKeys", [...n.selectedKeys, H]);
    }
    function ne(L) {
      return `${n.ariaLabelSelectRow} ${L}`;
    }
    function ie(L) {
      a("sort", L);
    }
    function ge(L) {
      return n.sortKey === L && n.sortDirection != null;
    }
    function X(L) {
      return ge(L) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (L, H) => (p(), k("div", Lk, [
      u("div", Pk, [
        u("table", {
          class: te([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", Rk, [
              e.selectable ? (p(), k("th", Ek, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: P.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: Z
                }, null, 40, Ik)
              ])) : z("", !0),
              (p(!0), k(se, null, fe(e.columns, (K) => (p(), k("th", {
                key: K.key,
                scope: "col",
                class: te([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  b(K.key) && e.selectable ? "!pl-0" : "",
                  m(K.align),
                  K.headerClass ?? ""
                ])
              }, [
                K.sortable ? (p(), k("button", {
                  key: 0,
                  type: "button",
                  class: te(["kiut-table-sort-btn inline-flex items-center gap-1", m(K.align)]),
                  "aria-sort": X(K.key),
                  onClick: (ce) => ie(K.key)
                }, [
                  u("span", null, A(K.label), 1),
                  u("span", Ok, [
                    ge(K.key) ? (p(), k(se, { key: 0 }, [
                      e.sortDirection === "asc" ? (p(), k("span", Vk, "↑")) : e.sortDirection === "desc" ? (p(), k("span", zk, "↓")) : z("", !0)
                    ], 64)) : (p(), k(se, { key: 1 }, [
                      H[0] || (H[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      H[1] || (H[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Fk)) : (p(), k(se, { key: 1 }, [
                  Ae(A(K.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (p(!0), k(se, null, fe(h.value, (K) => (p(), k("tr", {
              key: K.key,
              class: te([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                K.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (p(), k("td", Nk, [
                M(K) ? (p(), k("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: D(K.key),
                  "aria-label": ne(K.key),
                  onChange: (ce) => Q(K.key)
                }, null, 40, jk)) : V(K) ? (p(), k("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": K.isExpanded,
                  "aria-label": K.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Oe((ce) => w(K), ["stop"])
                }, [
                  N(R(Qt), {
                    class: te(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !K.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, Hk)) : z("", !0)
              ])) : z("", !0),
              (p(!0), k(se, null, fe(e.columns, (ce) => (p(), k("td", {
                key: ce.key,
                class: te([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  b(ce.key) ? "pl-0 pr-2" : "px-2",
                  m(ce.align),
                  ce.cellClass ?? ""
                ])
              }, [
                b(ce.key) ? (p(), k("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: we({ paddingLeft: `${K.depth * 1.25}rem` })
                }, [
                  _e(L.$slots, "row-expand", {
                    row: K.row,
                    expanded: K.isExpanded,
                    hasChildren: K.hasChildren,
                    depth: K.depth,
                    toggle: () => w(K)
                  }, () => [
                    j(K) ? (p(), k("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": K.isExpanded,
                      "aria-label": K.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Oe((ve) => w(K), ["stop"])
                    }, [
                      N(R(Qt), {
                        class: te(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !K.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, Wk)) : B(K) ? (p(), k("span", Kk)) : z("", !0)
                  ], !0),
                  u("div", Yk, [
                    _e(L.$slots, f(ce.key), _t({ ref_for: !0 }, x(K, ce)), () => [
                      Ae(A(y(v(K.row, ce.key))), 1)
                    ], !0)
                  ])
                ], 4)) : _e(L.$slots, f(ce.key), _t({
                  key: 1,
                  ref_for: !0
                }, x(K, ce)), () => [
                  Ae(A(y(v(K.row, ce.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), qk = /* @__PURE__ */ me(Uk, [["__scopeId", "data-v-b3104817"]]), oi = /* @__PURE__ */ re({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (a, o) => (p(), k("svg", {
      class: te(["inline-flex shrink-0 animate-spin", n.value]),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2.5",
      "stroke-linecap": "round",
      "aria-hidden": "true"
    }, [...o[0] || (o[0] = [
      u("circle", {
        cx: "12",
        cy: "12",
        r: "10",
        "stroke-opacity": "0.25"
      }, null, -1),
      u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
    ])], 2));
  }
}), Xk = ["disabled", "aria-expanded", "aria-label"], Gk = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, Zk = { class: "min-w-0 truncate" }, Qk = ["disabled", "onClick", "onMouseenter"], Jk = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, e2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, t2 = { class: "min-w-0 flex-1 text-left" }, n2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, a2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, o2 = ["disabled", "aria-expanded", "aria-label"], s2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, i2 = ["disabled", "onClick", "onMouseenter"], r2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, l2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, c2 = { class: "min-w-0 flex-1 text-left" }, d2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, u2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, h2 = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, f2 = ["type", "disabled", "aria-busy", "aria-label"], g2 = {
  key: 2,
  class: "min-w-0 truncate"
}, p2 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, m2 = ["type", "disabled", "aria-busy", "aria-label"], b2 = {
  key: 2,
  class: "min-w-0 truncate"
}, xt = /* @__PURE__ */ re({
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
    const n = e, a = t, o = Ca(), s = C(
      () => !!n.tooltip?.trim() && n.variant !== "dropdown" && n.variant !== "split"
    ), i = C(() => n.variant === "dropdown"), r = C(() => n.variant === "split"), l = C(() => n.variant === "action"), c = C(() => !l.value && !r.value), d = C(() => n.disabled || n.loading), h = C(
      () => n.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), f = C(() => {
      const L = o["aria-label"];
      if (typeof L == "string" && L.length > 0) return L;
      if ((l.value || r.value) && n.tooltip?.trim()) return n.tooltip.trim();
    }), m = C(() => {
      const L = o.type;
      return L === "submit" || L === "reset" || L === "button" ? L : "button";
    }), g = C(() => {
      const { class: L, type: H, "aria-label": K, ...ce } = o;
      return ce;
    }), v = C(() => n.variant === "primary" || n.variant === "dropdown" ? [
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
    ]), y = `kiut-button-menu-${Ye()}`, b = `${y}-btn`, _ = `${y}-menu`, x = ae(null), w = ae(null), $ = ae(null), S = ae(!1), M = ae(0), V = ae({}), j = C(() => n.options.filter((L) => !L.disabled));
    function B(L) {
      return `${L.value}-${L.label}`;
    }
    function T() {
      const L = w.value;
      if (!L) return;
      const H = L.getBoundingClientRect(), K = {
        top: `${H.bottom - 3}px`,
        minWidth: `max(${H.width}px, ${n.menuMinWidth})`
      };
      n.menuAlign === "right" ? (K.right = `${window.innerWidth - H.right}px`, K.left = "auto") : (K.left = `${H.left}px`, K.right = "auto"), V.value = K;
    }
    function D(L) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        M.value === L ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function P() {
      S.value = !1;
    }
    function O() {
      T(), M.value = 0, je(() => $.value?.focus());
    }
    function Z() {
      if (!n.disabled) {
        if (S.value) {
          P();
          return;
        }
        S.value = !0, O();
      }
    }
    function Q(L) {
      L.disabled || (a("select", L), P());
    }
    function ne(L) {
      L.stopPropagation(), Z();
    }
    function ie(L) {
      if (!S.value) return;
      const H = L.target, K = x.value, ce = $.value;
      K && !K.contains(H) && (!ce || !ce.contains(H)) && P();
    }
    function ge(L) {
      n.disabled || (L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), S.value || (S.value = !0, O()));
    }
    function X(L) {
      const H = j.value;
      if (L.key === "Escape") {
        L.preventDefault(), P(), w.value?.focus();
        return;
      }
      if (H.length !== 0) {
        if (L.key === "ArrowDown") {
          L.preventDefault(), M.value = Math.min(M.value + 1, H.length - 1);
          return;
        }
        if (L.key === "ArrowUp") {
          L.preventDefault(), M.value = Math.max(M.value - 1, 0);
          return;
        }
        if (L.key === "Enter" || L.key === " ") {
          L.preventDefault();
          const K = H[M.value];
          K && Q(K);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", ie);
    }), lt(() => {
      document.removeEventListener("click", ie);
    }), (L, H) => i.value ? (p(), k("div", {
      key: 0,
      ref_key: "rootRef",
      ref: x,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", _t({
        ref_key: "buttonRef",
        ref: w,
        id: b,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [v.value, R(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": _,
        "aria-label": f.value
      }, g.value, {
        onClick: ne,
        onKeydown: ge
      }), [
        L.$slots.icon ? (p(), k("span", Gk, [
          _e(L.$slots, "icon")
        ])) : z("", !0),
        u("span", Zk, [
          _e(L.$slots, "default")
        ]),
        N(R(Qt), {
          class: te(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", S.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, Xk),
      (p(), ee(un, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: _,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: we(V.value),
          onKeydown: Oe(X, ["stop"])
        }, [
          (p(!0), k(se, null, fe(j.value, (K, ce) => (p(), k("button", {
            key: B(K),
            type: "button",
            role: "menuitem",
            disabled: K.disabled,
            class: te(D(ce)),
            onClick: Oe((ve) => Q(K), ["stop"]),
            onMouseenter: (ve) => M.value = ce
          }, [
            K.icon ? (p(), k("span", Jk, [
              (p(), ee(Mt(K.icon), { class: "h-5 w-5" }))
            ])) : (p(), k("span", e2)),
            u("span", t2, [
              u("span", n2, A(K.label), 1),
              K.description ? (p(), k("span", a2, A(K.description), 1)) : z("", !0)
            ])
          ], 42, Qk))), 128))
        ], 36), [
          [Xt, S.value]
        ])
      ]))
    ], 512)) : r.value ? (p(), k("div", {
      key: 1,
      ref_key: "rootRef",
      ref: x,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", _t({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [v.value, R(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": _,
        "aria-label": f.value
      }, g.value, {
        onClick: ne,
        onKeydown: ge
      }), [
        L.$slots.icon ? (p(), k("span", s2, [
          _e(L.$slots, "icon")
        ])) : z("", !0)
      ], 16, o2),
      (p(), ee(un, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: _,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: we(V.value),
          onKeydown: Oe(X, ["stop"])
        }, [
          (p(!0), k(se, null, fe(j.value, (K, ce) => (p(), k("button", {
            key: B(K),
            type: "button",
            role: "menuitem",
            disabled: K.disabled,
            class: te(D(ce)),
            onClick: Oe((ve) => Q(K), ["stop"]),
            onMouseenter: (ve) => M.value = ce
          }, [
            K.icon ? (p(), k("span", r2, [
              (p(), ee(Mt(K.icon), { class: "h-5 w-5" }))
            ])) : (p(), k("span", l2)),
            u("span", c2, [
              u("span", d2, A(K.label), 1),
              K.description ? (p(), k("span", u2, A(K.description), 1)) : z("", !0)
            ])
          ], 42, i2))), 128))
        ], 36), [
          [Xt, S.value]
        ])
      ]))
    ], 512)) : s.value ? (p(), k("span", h2, [
      u("button", _t({
        type: m.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, v.value, R(o).class]],
        disabled: d.value,
        "aria-busy": e.loading || void 0,
        "aria-label": f.value
      }, g.value), [
        e.loading ? (p(), ee(oi, {
          key: 0,
          compact: l.value
        }, null, 8, ["compact"])) : L.$slots.icon ? (p(), k("span", {
          key: 1,
          class: te(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          _e(L.$slots, "icon")
        ], 2)) : z("", !0),
        c.value ? (p(), k("span", g2, [
          _e(L.$slots, "default")
        ])) : z("", !0)
      ], 16, f2),
      u("span", p2, A(e.tooltip), 1)
    ])) : (p(), k("button", _t({
      key: 3,
      type: m.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, v.value, R(o).class]],
      disabled: d.value,
      "aria-busy": e.loading || void 0,
      "aria-label": f.value
    }, g.value), [
      e.loading ? (p(), ee(oi, {
        key: 0,
        compact: l.value
      }, null, 8, ["compact"])) : L.$slots.icon ? (p(), k("span", {
        key: 1,
        class: te(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        _e(L.$slots, "icon")
      ], 2)) : z("", !0),
      c.value ? (p(), k("span", b2, [
        _e(L.$slots, "default")
      ])) : z("", !0)
    ], 16, m2));
  }
}), v2 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], y2 = { class: "sr-only" }, kr = /* @__PURE__ */ re({
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
    function o() {
      n.disabled || a("update:modelValue", !n.modelValue);
    }
    return (s, i) => (p(), k("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: te([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        zn(Oe(o, ["prevent", "stop"]), ["space"]),
        zn(Oe(o, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: te(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", y2, A(e.ariaLabel), 1)
    ], 42, v2));
  }
}), x2 = {
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
  toggleActive: "Activar o desactivar"
}, _2 = [
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
], _S = [
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
], k2 = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, w2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, C2 = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, $2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, S2 = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, M2 = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, D2 = ["aria-expanded", "aria-label", "onClick"], A2 = { class: "min-w-0 flex-1" }, T2 = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, B2 = ["colspan"], L2 = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, P2 = {
  key: 0,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, R2 = {
  key: 1,
  class: "space-y-2"
}, E2 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, I2 = ["title"], F2 = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, O2 = { class: "ml-auto flex shrink-0 items-center gap-2" }, V2 = /* @__PURE__ */ re({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => _2 },
    rowKey: { type: [String, Function], default: "id" },
    expandedKeys: { default: void 0 },
    defaultExpandedKeys: { default: () => [] },
    singleExpand: { type: Boolean, default: !1 },
    expandColumnKey: { default: void 0 },
    labels: { default: () => ({}) }
  },
  emits: ["update:expandedKeys", "expand", "collapse", "view", "run", "edit", "delete", "createDraft", "toggleActive", "viewVersion", "createDraftFromVersion"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = ae([...n.defaultExpandedKeys]), s = C({
      get() {
        return n.expandedKeys ?? o.value;
      },
      set(B) {
        o.value = B, a("update:expandedKeys", B);
      }
    }), i = C(() => ({
      ...x2,
      ...n.labels
    })), r = C(
      () => n.expandColumnKey ?? n.columns[0]?.key ?? ""
    ), l = {
      GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      PATCH: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    };
    function c(B) {
      return `cell-${B}`;
    }
    function d(B, T, D) {
      return {
        row: B,
        column: T,
        index: D,
        expanded: v(B, D)
      };
    }
    function h(B) {
      const T = B.key;
      return B.label ? B.label : T in i.value ? i.value[T] : B.key;
    }
    function f(B) {
      return B === "center" ? "text-center" : B === "right" ? "text-right" : "text-left";
    }
    function m(B) {
      return B === r.value;
    }
    function g(B, T) {
      if (typeof n.rowKey == "function")
        return n.rowKey(B);
      const D = B[n.rowKey];
      return D != null ? String(D) : `__index_${T}`;
    }
    function v(B, T) {
      return s.value.includes(g(B, T));
    }
    function y(B, T) {
      const D = g(B, T), P = new Set(s.value);
      P.has(D) ? (P.delete(D), a("collapse", D, B)) : (n.singleExpand && P.clear(), P.add(D), a("expand", D, B)), s.value = [...P];
    }
    function b(B) {
      return B.type ?? B.key;
    }
    function _(B) {
      return l[B] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function x(B) {
      return B === "published" ? "success" : "warning";
    }
    function w(B) {
      const T = B instanceof Date ? B : new Date(B);
      return Number.isNaN(T.getTime()) ? String(B) : T.toLocaleDateString("es-ES");
    }
    function $(B) {
      const T = B instanceof Date ? B : new Date(B);
      return Number.isNaN(T.getTime()) ? String(B) : T.toLocaleString("es-ES");
    }
    function S(B) {
      return ze("div", { class: "min-w-0" }, [
        ze(
          "p",
          { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" },
          B.name
        ),
        B.description ? ze(
          "p",
          { class: "truncate text-xs text-[color:var(--kiut-text-muted)]" },
          B.description
        ) : null
      ]);
    }
    function M(B) {
      return B.method ? ze(
        "span",
        {
          class: [
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            _(B.method)
          ]
        },
        B.method
      ) : null;
    }
    function V(B, T) {
      const D = T.actions ?? ["view", "edit"], P = [];
      for (const O of D)
        O === "view" ? P.push(
          ze(
            xt,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => a("view", B)
            },
            { icon: () => ze(Js, { class: "h-4 w-4" }) }
          )
        ) : O === "run" ? P.push(
          ze(
            xt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => a("run", B)
            },
            { icon: () => ze(Wp, { class: "h-4 w-4" }) }
          )
        ) : O === "edit" ? P.push(
          ze(
            xt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => a("edit", B)
            },
            { icon: () => ze(Hp, { class: "h-4 w-4" }) }
          )
        ) : O === "createDraft" ? P.push(
          ze(
            xt,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => a("createDraft", B)
            },
            { icon: () => ze(Qs, { class: "h-4 w-4" }) }
          )
        ) : O === "delete" && P.push(
          ze(
            xt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => a("delete", B)
            },
            { icon: () => ze(Kp, { class: "h-4 w-4" }) }
          )
        );
      return ze(
        "div",
        { class: "flex items-center justify-end gap-1" },
        P
      );
    }
    function j(B, T, D) {
      switch (b(T)) {
        case "name":
          return S(B);
        case "method":
          return M(B);
        case "url":
          return B.url ? ze(
            "span",
            {
              class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
              title: B.url
            },
            B.url
          ) : null;
        case "status":
          return ze(
            Ue,
            { color: x(B.status), outlined: !1 },
            () => B.status
          );
        case "version":
          return ze("span", {}, B.version);
        case "updated":
          return ze(
            "span",
            { class: "whitespace-nowrap text-xs" },
            w(B.updatedAt)
          );
        case "active":
          return ze(kr, {
            modelValue: B.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (O) => a("toggleActive", B, O)
          });
        case "actions":
          return V(B, T);
        default:
          return ze("span", {}, String(B[T.key] ?? ""));
      }
    }
    return (B, T) => (p(), k("div", k2, [
      u("div", w2, [
        u("table", C2, [
          u("thead", null, [
            u("tr", $2, [
              (p(!0), k(se, null, fe(e.columns, (D) => (p(), k("th", {
                key: D.key,
                scope: "col",
                class: te([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  f(D.align),
                  D.headerClass ?? ""
                ])
              }, A(h(D)), 3))), 128))
            ])
          ]),
          u("tbody", null, [
            (p(!0), k(se, null, fe(e.rows, (D, P) => (p(), k(se, {
              key: g(D, P)
            }, [
              u("tr", S2, [
                (p(!0), k(se, null, fe(e.columns, (O) => (p(), k("td", {
                  key: O.key,
                  class: te([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    f(O.align),
                    O.cellClass ?? ""
                  ])
                }, [
                  _e(B.$slots, c(O.key), _t({ ref_for: !0 }, d(D, O, P)), () => [
                    m(O.key) ? (p(), k("div", M2, [
                      u("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": v(D, P),
                        "aria-label": v(D, P) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (Z) => y(D, P)
                      }, [
                        N(R(Qt), {
                          class: te(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !v(D, P) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, D2),
                      u("div", A2, [
                        (p(), ee(Mt(() => j(D, O))))
                      ])
                    ])) : (p(), ee(Mt(() => j(D, O)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              v(D, P) ? (p(), k("tr", T2, [
                u("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  u("h4", L2, A(i.value.historialTitle), 1),
                  D.versions?.length ? (p(), k("div", R2, [
                    (p(!0), k(se, null, fe(D.versions, (O) => (p(), k("div", {
                      key: O.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      _e(B.$slots, "history-item", {
                        version: O,
                        row: D
                      }, () => [
                        N(Ue, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: E(() => [
                            Ae(A(O.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        u("span", E2, A(O.version), 1),
                        O.method ? (p(), k("span", {
                          key: 0,
                          class: te(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", _(O.method)])
                        }, A(O.method), 3)) : z("", !0),
                        O.url ? (p(), k("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: O.url
                        }, A(O.url), 9, I2)) : z("", !0),
                        u("span", F2, A($(O.updatedAt)), 1)
                      ], !0),
                      u("div", O2, [
                        _e(B.$slots, "history-actions", {
                          version: O,
                          row: D
                        }, () => [
                          N(xt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Z) => a("viewVersion", O, D)
                          }, {
                            icon: E(() => [
                              N(R(Js), { class: "h-4 w-4" })
                            ]),
                            default: E(() => [
                              Ae(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          N(xt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Z) => a("createDraftFromVersion", O, D)
                          }, {
                            icon: E(() => [
                              N(R(Qs), { class: "h-4 w-4" })
                            ]),
                            default: E(() => [
                              Ae(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (p(), k("p", P2, A(i.value.emptyHistory), 1))
                ], 8, B2)
              ])) : z("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), z2 = /* @__PURE__ */ me(V2, [["__scopeId", "data-v-f49dd759"]]);
function N2(e, t) {
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
function j2(e, t) {
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
const H2 = ["aria-label"], W2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, K2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Y2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, U2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], q2 = { class: "truncate" }, X2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, G2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, Z2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, Q2 = ["aria-label", "onClick"], J2 = ["aria-label", "onClick"], ew = ["aria-label"], tw = ["aria-label"], nw = {
  key: 1,
  class: "space-y-2"
}, aw = ["for"], ow = ["id", "placeholder", "onKeydown"], sw = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, iw = ["aria-label"], rw = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, lw = ["checked", "onChange"], cw = { class: "min-w-0 flex-1" }, dw = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, uw = { class: "flex flex-wrap items-end gap-2" }, hw = { class: "min-w-[120px] flex-1" }, fw = ["for"], gw = ["id"], pw = { class: "min-w-[120px] flex-1" }, mw = ["for"], bw = ["id"], vw = /* @__PURE__ */ re({
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
    const n = e, a = t, o = eo(), i = `${`kiut-filters-${Ye()}`}-panel`, r = ae(null), l = /* @__PURE__ */ new Map(), c = ae(null), d = ae(!1), h = ae({}), f = ae(null), m = ae(""), g = ae([]), v = ae(""), y = ae(""), b = C(() => c.value ? n.filterDefinitions.find((F) => F.id === c.value) ?? null : null), _ = C(() => {
      const F = b.value;
      if (F)
        return F.type === "text" ? m.value : F.type === "select" ? g.value : { start: v.value, end: y.value };
    });
    function x(F, q) {
      q && q instanceof HTMLElement ? l.set(F, q) : l.delete(F);
    }
    function w(F) {
      return n.modelValue[F];
    }
    function $(F) {
      if (F == null) return [];
      if (Array.isArray(F))
        return F.filter((q) => typeof q == "string" && q.trim() !== "");
      if (typeof F == "string") {
        const q = F.trim();
        return q ? [q] : [];
      }
      return [];
    }
    function S(F, q) {
      if (q == null) return !0;
      if (F.type === "text") return String(q).trim() === "";
      if (F.type === "select") return $(q).length === 0;
      if (F.type === "dateRange") {
        const oe = q;
        return !oe?.start?.trim() || !oe?.end?.trim();
      }
      return !0;
    }
    const M = C(
      () => n.filterDefinitions.some((F) => !S(F, w(F.id)))
    ), V = C(() => {
      const F = [];
      for (const q of n.filterDefinitions) {
        const oe = w(q.id);
        if (!S(q, oe)) {
          if (q.type === "text")
            F.push({ kind: "text", def: q, key: q.id });
          else if (q.type === "dateRange")
            F.push({ kind: "dateRange", def: q, key: q.id });
          else if (q.type === "select")
            for (const he of $(oe))
              F.push({
                kind: "select",
                def: q,
                optionValue: he,
                key: `${q.id}::${he}`
              });
        }
      }
      return F;
    });
    function j(F) {
      return F.type !== "select" ? 0 : $(w(F.id)).length;
    }
    function B(F) {
      const q = w(F.id), oe = F.label.replace(/^\+\s*/, "");
      if (F.type === "text") return `${oe}: ${String(q ?? "").trim()}`;
      if (F.type === "select") {
        const nt = $(q).map((ft) => F.options.find((wt) => wt.value === ft)?.label ?? ft);
        return `${oe}: ${nt.join(", ")}`;
      }
      const he = q, be = D(he.start), ke = D(he.end);
      return `${oe}: ${be} – ${ke}`;
    }
    function T(F) {
      return F.kind === "text" || F.kind === "dateRange" ? B(F.def) : F.def.options.find((oe) => oe.value === F.optionValue)?.label ?? F.optionValue;
    }
    function D(F) {
      if (!F) return "";
      const q = We(F, "YYYY-MM-DD", !0);
      return q.isValid() ? q.format("L") : F;
    }
    function P(F) {
      const q = c.value === F.id && d.value, oe = !S(F, w(F.id));
      return q || oe ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function O(F) {
      return S(F, w(F.id)) ? G(F) : `Editar filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    function Z(F) {
      const q = w(F.id);
      if (F.type === "text") {
        m.value = q != null ? String(q) : "";
        return;
      }
      if (F.type === "select") {
        g.value = [...$(q)];
        return;
      }
      const oe = q;
      v.value = oe?.start?.trim() ?? "", y.value = oe?.end?.trim() ?? "";
    }
    function Q() {
      const F = b.value;
      if (!F || F.type !== "select") return;
      const q = { ...n.modelValue };
      g.value.length === 0 ? delete q[F.id] : q[F.id] = [...g.value], a("update:modelValue", q), a("change", q);
    }
    function ne(F) {
      const q = g.value.indexOf(F);
      q >= 0 ? g.value = g.value.filter((oe, he) => he !== q) : g.value = [...g.value, F], Q();
    }
    function ie(F) {
      if (!F) return;
      f.value = F;
      const q = F.getBoundingClientRect(), oe = 300;
      let he = q.left;
      const be = window.innerWidth - oe - 12;
      he > be && (he = Math.max(12, be)), he < 12 && (he = 12);
      const ke = q.bottom + 8;
      h.value = {
        top: `${ke}px`,
        left: `${he}px`,
        width: `${Math.min(oe, window.innerWidth - 24)}px`
      };
    }
    function ge(F, q) {
      if (c.value === F.id && d.value) {
        ce();
        return;
      }
      d.value && c.value !== F.id && ce(), c.value = F.id, d.value = !0, Z(F), je().then(async () => {
        ie(q.currentTarget), await je(), L();
      });
    }
    function X(F, q) {
      if (c.value === F.id && d.value) {
        ce();
        return;
      }
      d.value && c.value !== F.id && ce(), c.value = F.id, d.value = !0, Z(F), je().then(async () => {
        const oe = l.get(F.id) ?? q.currentTarget;
        ie(oe), await je(), L();
      });
    }
    function L() {
      const F = r.value;
      if (!F) return;
      F.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function H() {
      d.value = !1, c.value = null, f.value = null;
    }
    function K(F) {
      const q = b.value;
      if (!q) return;
      if (q.type === "text") {
        m.value = F != null ? String(F) : "";
        return;
      }
      if (q.type === "select") {
        g.value = Array.isArray(F) ? F.filter((he) => typeof he == "string") : $(F);
        return;
      }
      const oe = F;
      v.value = oe?.start?.trim() ?? "", y.value = oe?.end?.trim() ?? "";
    }
    function ce() {
      const F = b.value;
      if (!F) return;
      if (F.type === "text") {
        const be = m.value.trim(), ke = { ...n.modelValue };
        be === "" ? delete ke[F.id] : ke[F.id] = be, a("update:modelValue", ke), a("change", ke), H();
        return;
      }
      if (F.type === "select") {
        Q(), H();
        return;
      }
      const q = v.value.trim(), oe = y.value.trim(), he = { ...n.modelValue };
      !q || !oe || q > oe ? delete he[F.id] : he[F.id] = { start: q, end: oe }, a("update:modelValue", he), a("change", he), H();
    }
    function ve(F) {
      const q = { ...n.modelValue };
      delete q[F], a("update:modelValue", q), a("change", q), c.value === F && H();
    }
    function De(F) {
      if (F.kind === "text" || F.kind === "dateRange") {
        ve(F.def.id);
        return;
      }
      const q = { ...n.modelValue }, he = $(q[F.def.id]).filter((be) => be !== F.optionValue);
      he.length === 0 ? delete q[F.def.id] : q[F.def.id] = he, a("update:modelValue", q), a("change", q), c.value === F.def.id && Z(F.def);
    }
    function I() {
      const F = {};
      a("update:modelValue", F), a("change", F), H();
    }
    const W = C(() => {
      const F = b.value;
      return F ? `Editar filtro: ${F.label}` : "Filtro";
    });
    function U(F) {
      const q = F.def.label.replace(/^\+\s*/, "");
      return F.kind === "select" ? `Quitar ${F.def.options.find((be) => be.value === F.optionValue)?.label ?? F.optionValue} del filtro ${q}` : `Quitar filtro ${q}`;
    }
    function de(F) {
      const q = F.def.label.replace(/^\+\s*/, "");
      if (F.kind === "select") {
        const he = F.def.options.find((be) => be.value === F.optionValue)?.label ?? F.optionValue;
        return `Editar filtro ${q}: ${he}`;
      }
      return `Editar filtro ${q}`;
    }
    function G(F) {
      return `Añadir filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    const Y = C(() => n.clearLabel);
    function J(F) {
      if (!d.value || !r.value) return;
      const q = F.target;
      if (!(r.value.contains(q) || (q instanceof Element ? q : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const he of l.values())
          if (he?.contains(q)) return;
        ce();
      }
    }
    function ue(F) {
      F.key === "Escape" && d.value && (F.preventDefault(), H());
    }
    function pe() {
      !d.value || !f.value || ie(f.value);
    }
    return Ze(() => {
      document.addEventListener("mousedown", J, !0), window.addEventListener("keydown", ue, !0), window.addEventListener("resize", pe);
    }), ri(() => {
      document.removeEventListener("mousedown", J, !0), window.removeEventListener("keydown", ue, !0), window.removeEventListener("resize", pe);
    }), Ie(
      () => n.modelValue,
      () => {
        const F = b.value;
        F && d.value && !o.panel && Z(F);
      },
      { deep: !0 }
    ), (F, q) => (p(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", W2, [
        u("span", K2, A(e.label), 1),
        u("div", Y2, [
          (p(!0), k(se, null, fe(e.filterDefinitions, (oe) => (p(), k("button", {
            key: `pill-${oe.id}`,
            ref_for: !0,
            ref: (he) => x(oe.id, he),
            type: "button",
            class: te(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", P(oe)]),
            "aria-label": O(oe),
            "aria-expanded": c.value === oe.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === oe.id ? i : void 0,
            onClick: (he) => X(oe, he)
          }, [
            N(R(N2), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", q2, A(oe.label), 1),
            oe.type === "select" && j(oe) > 0 ? (p(), k("span", X2, A(j(oe)), 1)) : z("", !0)
          ], 10, U2))), 128))
        ])
      ]),
      M.value ? (p(), k("div", G2, [
        u("div", Z2, [
          (p(!0), k(se, null, fe(V.value, (oe) => (p(), k("div", {
            key: oe.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": de(oe),
              onClick: (he) => ge(oe.def, he)
            }, [
              _e(F.$slots, "formatChip", {
                filter: oe.def,
                value: w(oe.def.id),
                optionValue: oe.kind === "select" ? oe.optionValue : void 0
              }, () => [
                Ae(A(T(oe)), 1)
              ], !0)
            ], 8, Q2),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": U(oe),
              onClick: (he) => De(oe)
            }, [
              N(R(j2), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, J2)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": Y.value,
          onClick: I
        }, A(e.clearLabel), 9, ew)
      ])) : z("", !0),
      (p(), ee(un, { to: "body" }, [
        c.value && d.value ? (p(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": W.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: we(h.value),
          onKeydown: q[3] || (q[3] = Oe(() => {
          }, ["stop"]))
        }, [
          b.value ? (p(), k(se, { key: 0 }, [
            F.$slots.panel ? _e(F.$slots, "panel", {
              key: 0,
              filter: b.value,
              close: ce,
              value: _.value,
              updateValue: K
            }, void 0, !0) : (p(), k("div", nw, [
              b.value.type === "text" ? (p(), k(se, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(b.value.label), 9, aw),
                Ge(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": q[0] || (q[0] = (oe) => m.value = oe),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: b.value.placeholder ?? "…",
                  onKeydown: zn(Oe(ce, ["prevent"]), ["enter"])
                }, null, 40, ow), [
                  [Yt, m.value]
                ])
              ], 64)) : b.value.type === "select" ? (p(), k(se, { key: 1 }, [
                u("p", sw, A(b.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": b.value.label,
                  "aria-multiselectable": !0
                }, [
                  (p(!0), k(se, null, fe(b.value.options, (oe) => (p(), k("li", {
                    key: oe.value
                  }, [
                    u("label", rw, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(oe.value),
                        onChange: (he) => ne(oe.value)
                      }, null, 40, lw),
                      u("span", cw, A(oe.label), 1)
                    ])
                  ]))), 128))
                ], 8, iw)
              ], 64)) : b.value.type === "dateRange" ? (p(), k(se, { key: 2 }, [
                u("p", dw, A(b.value.label), 1),
                u("div", uw, [
                  u("div", hw, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, fw),
                    Ge(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": q[1] || (q[1] = (oe) => v.value = oe),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, gw), [
                      [Yt, v.value]
                    ])
                  ]),
                  u("div", pw, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, mw),
                    Ge(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": q[2] || (q[2] = (oe) => y.value = oe),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, bw), [
                      [Yt, y.value]
                    ])
                  ])
                ])
              ], 64)) : z("", !0)
            ]))
          ], 64)) : z("", !0)
        ], 44, tw)) : z("", !0)
      ]))
    ], 8, H2));
  }
}), yw = /* @__PURE__ */ me(vw, [["__scopeId", "data-v-f38e0100"]]), xw = { class: "font-sans" }, _w = ["for"], kw = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], ww = ["id"], Cw = /* @__PURE__ */ re({
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
    const n = e, a = t, o = Ca(), s = ci("$pcForm", null), i = `kiut-input-text-${Ye()}`, r = C(() => n.id ?? i), l = C(() => `${r.value}-err`), c = C(() => n.name ?? o.name ?? ""), d = ae(n.modelValue ?? "");
    Ie(
      () => n.modelValue,
      (b) => {
        d.value = b ?? "";
      }
    ), Ze(() => {
      s && c.value && s.register?.(c.value, {});
    }), lt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? d.value : d.value), f = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function m(b) {
      const _ = b.target.value;
      d.value = _, a("update:modelValue", _);
      const x = s?.fields?.[c.value]?.props;
      x?.onInput && x.onInput(b);
    }
    function g(b) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(b);
    }
    function v(b) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(b);
    }
    const y = C(() => {
      const { name: b, id: _, type: x, ...w } = o;
      return w;
    });
    return (b, _) => (p(), k("div", xw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: r.value,
        class: te(R(dt))
      }, A(e.label), 11, _w)) : z("", !0),
      u("input", _t(y.value, {
        id: r.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [R(ht), f.value ? R(Ot) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": f.value ? "true" : void 0,
        "aria-describedby": e.errorText ? l.value : void 0,
        onInput: m,
        onChange: g,
        onBlur: v
      }), null, 16, kw),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: l.value,
        class: te(R(Tt)),
        role: "alert"
      }, A(e.errorText), 11, ww)) : z("", !0)
    ]));
  }
}), $w = { class: "font-sans" }, Sw = ["for"], Mw = { class: "relative" }, Dw = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], Aw = ["aria-label"], Tw = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Bw = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Lw = ["id"], Pw = /* @__PURE__ */ re({
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
    const n = e, a = t, o = Ca(), s = ci("$pcForm", null), i = `kiut-input-password-${Ye()}`, r = C(() => n.id ?? i), l = C(() => `${r.value}-err`), c = C(() => n.name ?? o.name ?? ""), d = ae(!1), h = ae(n.modelValue ?? "");
    Ie(
      () => n.modelValue,
      (_) => {
        _ !== void 0 && _ !== h.value && (h.value = _);
      }
    ), Ze(() => {
      s && c.value && s.register?.(c.value, {});
    }), lt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const f = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? h.value : h.value), m = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function g(_) {
      const x = _.target.value;
      h.value = x, a("update:modelValue", x);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(_);
    }
    function v(_) {
      const x = s?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(_);
    }
    function y(_) {
      const x = s?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(_);
    }
    const b = C(() => {
      const { name: _, id: x, ...w } = o;
      return w;
    });
    return (_, x) => (p(), k("div", $w, [
      e.label ? (p(), k("label", {
        key: 0,
        for: r.value,
        class: te(R(dt))
      }, A(e.label), 11, Sw)) : z("", !0),
      u("div", Mw, [
        u("input", _t(b.value, {
          id: r.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [R(ht), m.value ? R(Ot) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: f.value,
          "aria-invalid": m.value ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: g,
          onChange: v,
          onBlur: y
        }), null, 16, Dw),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: x[0] || (x[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (p(), k("svg", Bw, [...x[2] || (x[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (p(), k("svg", Tw, [...x[1] || (x[1] = [
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
        ], 8, Aw)
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: l.value,
        class: te(R(Tt)),
        role: "alert"
      }, A(e.errorText), 11, Lw)) : z("", !0)
    ]));
  }
}), Rw = { class: "font-sans" }, Ew = ["for"], Iw = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], Fw = ["id"], Ow = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `kiut-input-textarea-${Ye()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), r = C({
      get: () => n.modelValue,
      set: (l) => a("update:modelValue", l)
    });
    return (l, c) => (p(), k("div", Rw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: s.value,
        class: te(R(dt))
      }, A(e.label), 11, Ew)) : z("", !0),
      Ge(u("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => r.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: te([R(ly), e.invalid ? R(Ot) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, Iw), [
        [Yt, r.value]
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: te(R(Tt)),
        role: "alert"
      }, A(e.errorText), 11, Fw)) : z("", !0)
    ]));
  }
}), Vw = { class: "font-sans" }, zw = ["for"], Nw = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], jw = ["for"], Hw = ["title"], Ww = ["aria-label"], Kw = ["id"], Yw = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `kiut-input-file-${Ye()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), r = ae(null), l = C(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const m = h.target.files?.[0] ?? null;
      a("update:modelValue", m);
    }
    function d() {
      a("update:modelValue", null), r.value && (r.value.value = "");
    }
    return (h, f) => (p(), k("div", Vw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: s.value,
        class: te(R(dt))
      }, A(e.label), 11, zw)) : z("", !0),
      u("div", {
        class: te([
          R(ht),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? R(Ot) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        u("input", {
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
          onChange: c
        }, null, 40, Nw),
        u("label", {
          for: s.value,
          class: te(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          N(R(Op), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, jw),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: l.value || void 0
        }, A(l.value), 9, Hw),
        e.modelValue && !e.disabled ? (p(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          N(R(lr), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, Ww)) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: te(R(Tt)),
        role: "alert"
      }, A(e.errorText), 11, Kw)) : z("", !0)
    ]));
  }
}), Uw = { class: "font-sans" }, qw = ["for"], Xw = { class: "relative" }, Gw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Zw = ["id"], Qw = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `kiut-input-datetime-${Ye()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), r = C(() => n.modelValue ?? "");
    function l(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (p(), k("div", Uw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: s.value,
        class: te(R(dt))
      }, A(e.label), 11, qw)) : z("", !0),
      u("div", Xw, [
        N(R(wo), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: s.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: te([
            R(ht),
            "pl-10",
            e.invalid ? R(Ot) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: l
        }, null, 42, Gw)
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: te(R(Tt)),
        role: "alert"
      }, A(e.errorText), 11, Zw)) : z("", !0)
    ]));
  }
}), Jw = { class: "font-sans" }, e5 = ["for"], t5 = { class: "relative" }, n5 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], a5 = ["id"], o5 = /* @__PURE__ */ re({
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
      const f = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!f) return null;
      const m = Number(f[1]), g = Number(f[2]);
      return !Number.isInteger(m) || !Number.isInteger(g) || m < 0 || m > 23 || g < 0 || g > 59 ? null : `${String(m).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const o = e, s = t, i = `kiut-input-time-${Ye()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : n(o.modelValue) ?? "");
    function d(h) {
      const f = h.target.value;
      s("update:modelValue", a(f));
    }
    return (h, f) => (p(), k("div", Jw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: r.value,
        class: te(R(dt))
      }, A(e.label), 11, e5)) : z("", !0),
      u("div", t5, [
        N(R(zp), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: r.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: te([
            R(ht),
            "pl-10",
            e.invalid ? R(Ot) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: d
        }, null, 42, n5)
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: l.value,
        class: te(R(Tt)),
        role: "alert"
      }, A(e.errorText), 11, a5)) : z("", !0)
    ]));
  }
}), s5 = { class: "font-sans" }, i5 = ["for"], r5 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, l5 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], c5 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, d5 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, u5 = { class: "min-w-0 text-left leading-snug" }, h5 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, f5 = { class: "min-w-0 text-right leading-snug" }, g5 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, p5 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, m5 = ["id"], b5 = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `kiut-input-range-${Ye()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), r = C(() => {
      const m = [];
      return n.errorText && m.push(i.value), m.length ? m.join(" ") : void 0;
    }), l = C(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = C(() => !!(n.captionMin || n.captionMax)), d = C(() => {
      const { min: m, max: g, modelValue: v } = n;
      if (g === m) return 0;
      const y = (v - m) / (g - m);
      return Math.min(100, Math.max(0, y * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function f(m) {
      const g = Number(m.target.value);
      a("update:modelValue", Number.isNaN(g) ? n.min : g);
    }
    return (m, g) => (p(), k("div", s5, [
      e.label ? (p(), k("label", {
        key: 0,
        for: s.value,
        class: te(R(dt))
      }, A(e.label), 11, i5)) : z("", !0),
      u("div", {
        class: te(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (p(), k("p", r5, A(e.captionMax), 1)) : z("", !0),
        u("div", {
          class: te(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: we(h.value)
        }, [
          u("input", {
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
            class: te([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: f
          }, null, 42, l5)
        ], 6),
        e.orientation === "horizontal" && l.value ? (p(), k("p", c5, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (p(), k("div", d5, [
          u("span", u5, A(e.captionMin), 1),
          u("span", h5, A(e.caption), 1),
          u("span", f5, A(e.captionMax), 1)
        ])) : z("", !0),
        e.orientation === "vertical" && e.captionMin ? (p(), k("p", g5, A(e.captionMin), 1)) : z("", !0),
        e.orientation === "vertical" && e.caption ? (p(), k("p", p5, A(e.caption), 1)) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: te(R(Tt)),
        role: "alert"
      }, A(e.errorText), 11, m5)) : z("", !0)
    ]));
  }
}), v5 = /* @__PURE__ */ me(b5, [["__scopeId", "data-v-a1343418"]]), y5 = { class: "font-sans" }, x5 = ["for"], _5 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], k5 = ["id"], w5 = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `kiut-input-number-${Ye()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), r = C(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), l = C(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function c(d) {
      const h = d.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const f = Number(h);
      a("update:modelValue", Number.isNaN(f) ? null : f);
    }
    return (d, h) => (p(), k("div", y5, [
      e.label ? (p(), k("label", {
        key: 0,
        for: s.value,
        class: te(R(dt))
      }, A(e.label), 11, x5)) : z("", !0),
      u("input", {
        id: s.value,
        value: l.value,
        type: "number",
        onInput: c,
        class: te([
          R(ht),
          e.invalid ? R(Ot) : "",
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
      }, null, 42, _5),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: te(R(Tt)),
        role: "alert"
      }, A(e.errorText), 11, k5)) : z("", !0)
    ]));
  }
}), C5 = { class: "font-sans" }, $5 = ["for"], S5 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], M5 = ["disabled"], D5 = ["id"], A5 = "#3b82f6", T5 = "#aabbcc", B5 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", L5 = /* @__PURE__ */ re({
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
      const v = g.trim(), y = /^#?([0-9a-fA-F]{6})$/.exec(v);
      if (y) return `#${y[1].toLowerCase()}`;
      const b = /^#?([0-9a-fA-F]{3})$/.exec(v);
      if (b) {
        const [_, x, w] = b[1].split("");
        return `#${_}${_}${x}${x}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(g) {
      return n(g) ?? A5;
    }
    const o = e, s = t, i = `kiut-input-color-${Ye()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => a(o.modelValue)), d = ae(c.value), h = ae(!1);
    Ie(c, (g) => {
      h.value || (d.value = g);
    });
    function f(g) {
      const v = g.target, y = n(v.value);
      y && s("update:modelValue", y);
    }
    function m() {
      h.value = !1;
      const g = n(d.value);
      g ? (d.value = g, s("update:modelValue", g)) : d.value = c.value;
    }
    return Ie(d, (g) => {
      if (!h.value) return;
      const v = n(g);
      v && s("update:modelValue", v);
    }), (g, v) => (p(), k("div", C5, [
      e.label ? (p(), k("label", {
        key: 0,
        for: r.value,
        class: te(R(dt))
      }, A(e.label), 11, $5)) : z("", !0),
      u("div", {
        class: te([
          B5,
          e.invalid ? R(Ot) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        u("input", {
          id: r.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: f
        }, null, 40, S5),
        e.showHexInput ? Ge((p(), k("input", {
          key: 0,
          "onUpdate:modelValue": v[0] || (v[0] = (y) => d.value = y),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: T5,
          onFocus: v[1] || (v[1] = (y) => h.value = !0),
          onBlur: m
        }, null, 40, M5)), [
          [Yt, d.value]
        ]) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: l.value,
        class: te(R(Tt)),
        role: "alert"
      }, A(e.errorText), 11, D5)) : z("", !0)
    ]));
  }
}), wr = {
  smileys: "Smileys",
  gestures: "Gestos",
  symbols: "Símbolos",
  travel: "Viajes",
  objects: "Objetos"
}, Cr = [
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
function P5(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((n) => n.toLowerCase().includes(t)) ?? !1;
}
function R5(e, t, n) {
  const a = n.trim().toLowerCase();
  return a ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(a) || o.id.includes(a), i = o.emojis.filter(
      (r) => s || P5(r, a)
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
function kS(e) {
  const t = {
    ...wr,
    ...e
  };
  return Cr.map((n) => ({
    id: n.id,
    label: t[n.id],
    emojis: n.emojis.map((a) => a.char)
  }));
}
function E5(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function I5(e, t) {
  return `${e}${t}`;
}
const F5 = ["disabled", "aria-expanded", "aria-label"], O5 = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, V5 = {
  key: 0,
  class: "truncate text-sm"
}, z5 = ["aria-label"], N5 = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, j5 = ["disabled", "placeholder", "aria-label"], H5 = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, W5 = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, K5 = { class: "grid grid-cols-8 gap-0.5" }, Y5 = ["disabled", "aria-label", "onClick"], U5 = { class: "text-[1.35rem] leading-none" }, q5 = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, X5 = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, G5 = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `kiut-emoji-picker-${Ye()}`, s = `${o}-btn`, i = `${o}-panel`, r = ae(null), l = ae(null), c = ae(null), d = ae(null), h = ae(!1), f = ae(""), m = ae({}), g = C(
      () => n.ariaLabelTrigger ?? n.triggerLabel ?? n.ariaLabel
    ), v = C(() => ({
      ...wr,
      ...n.categoryLabels
    })), y = C(() => new Set(E5(n.draft))), b = C(() => {
      if (n.categories?.length) {
        const P = f.value.trim().toLowerCase();
        return P ? n.categories.map((O) => ({
          ...O,
          emojis: O.emojis.filter((Z) => Z.includes(P) || O.label.toLowerCase().includes(P) ? !0 : O.id.toLowerCase().includes(P))
        })).filter((O) => O.emojis.length > 0) : n.categories;
      }
      return R5(
        Cr,
        v.value,
        f.value
      );
    });
    function _() {
      const P = l.value;
      if (!P) return;
      const O = P.getBoundingClientRect(), Z = 320, Q = 8, ne = 8;
      let ie = O.right - Z;
      ie < ne && (ie = O.left), ie + Z > window.innerWidth - ne && (ie = Math.max(ne, window.innerWidth - Z - ne));
      const ge = Math.max(160, O.top - Q - ne);
      m.value = {
        bottom: `${window.innerHeight - O.top + Q}px`,
        left: `${ie}px`,
        width: `${Z}px`,
        maxHeight: `${ge}px`
      };
    }
    function x(P) {
      const O = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return y.value.has(P) ? `${O} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : O;
    }
    function w(P) {
      if (n.disabled) return;
      const O = I5(n.draft ?? "", P);
      a("update:draft", O), a("select", P);
    }
    function $() {
      f.value = "", a("open"), je(() => {
        _(), d.value?.focus();
      });
    }
    function S() {
      h.value && (h.value = !1, f.value = "", a("close"), l.value?.focus());
    }
    function M() {
      if (!n.disabled) {
        if (h.value) {
          S();
          return;
        }
        h.value = !0, $();
      }
    }
    function V(P) {
      P.stopPropagation(), M();
    }
    function j(P) {
      if (!h.value) return;
      const O = P.target, Z = r.value, Q = c.value;
      Z && !Z.contains(O) && (!Q || !Q.contains(O)) && S();
    }
    function B(P) {
      n.disabled || ((P.key === "ArrowDown" || P.key === "Enter" || P.key === " ") && (P.preventDefault(), h.value || (h.value = !0, $())), P.key === "Escape" && h.value && (P.preventDefault(), S()));
    }
    function T(P) {
      P.key === "Escape" && (P.preventDefault(), S());
    }
    function D() {
      h.value && _();
    }
    return Ze(() => {
      document.addEventListener("click", j), window.addEventListener("resize", D), window.addEventListener("scroll", D, !0);
    }), lt(() => {
      document.removeEventListener("click", j), window.removeEventListener("resize", D), window.removeEventListener("scroll", D, !0);
    }), (P, O) => (p(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", {
        ref_key: "buttonRef",
        ref: l,
        id: s,
        type: "button",
        disabled: e.disabled,
        class: te([
          R(ht),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": g.value,
        onClick: V,
        onKeydown: B
      }, [
        u("span", O5, [
          _e(P.$slots, "icon", {}, () => [
            N(R(jp), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (p(), k("span", V5, A(e.triggerLabel), 1)) : z("", !0),
        e.triggerLabel ? (p(), ee(R(Qt), {
          key: 1,
          class: te(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : z("", !0)
      ], 42, F5),
      (p(), ee(un, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: we(m.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: O[2] || (O[2] = Oe(() => {
          }, ["stop"])),
          onKeydown: Oe(T, ["stop"])
        }, [
          u("div", N5, [
            Ge(u("input", {
              ref_key: "searchInputRef",
              ref: d,
              "onUpdate:modelValue": O[0] || (O[0] = (Z) => f.value = Z),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: O[1] || (O[1] = Oe(() => {
              }, ["stop"]))
            }, null, 8, j5), [
              [Yt, f.value]
            ])
          ]),
          u("div", H5, [
            b.value.length > 0 ? (p(!0), k(se, { key: 0 }, fe(b.value, (Z) => (p(), k("section", {
              key: Z.id
            }, [
              u("h3", W5, A(Z.label), 1),
              u("div", K5, [
                (p(!0), k(se, null, fe(Z.emojis, (Q) => (p(), k("button", {
                  key: `${Z.id}-${Q}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${Q} to input`,
                  class: te(x(Q)),
                  onClick: Oe((ne) => w(Q), ["stop"])
                }, [
                  u("span", U5, A(Q), 1)
                ], 10, Y5))), 128))
              ])
            ]))), 128)) : (p(), k("p", q5, A(e.emptySearchText), 1))
          ]),
          e.hint ? (p(), k("p", X5, A(e.hint), 1)) : z("", !0)
        ], 44, z5), [
          [Xt, h.value]
        ])
      ]))
    ], 512));
  }
}), Z5 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Q5 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, J5 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, eC = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, tC = { class: "truncate" }, nC = ["aria-selected", "onClick", "onMouseenter"], aC = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, oC = { class: "min-w-0 flex-1" }, sC = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `kiut-multiselect-${Ye()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = ae(null), c = ae(null), d = ae(!1), h = ae(0), f = C(() => n.options.filter((B) => !B.disabled)), m = C(() => new Set(n.modelValue ?? [])), g = C(
      () => n.options.filter((B) => m.value.has(B.value))
    ), v = C(() => {
      const B = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", T = g.value.length;
      return T === 0 ? B : `${B}, ${T} seleccionada${T === 1 ? "" : "s"}`;
    });
    function y(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function b(B) {
      return m.value.has(B.value);
    }
    function _(B, T) {
      const D = b(B), P = h.value === T;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        D ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !D && P ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function x(B) {
      const T = [...n.modelValue ?? []], D = T.indexOf(B.value);
      D >= 0 ? T.splice(D, 1) : T.push(B.value), a("update:modelValue", T);
    }
    function w() {
      const B = f.value;
      if (B.length === 0) {
        h.value = 0;
        return;
      }
      const T = m.value, D = B.findIndex((P) => T.has(P.value));
      h.value = D >= 0 ? D : 0;
    }
    function $() {
      n.disabled || (d.value = !d.value);
    }
    function S(B) {
      B.stopPropagation(), !n.disabled && ($(), d.value && (w(), je(() => c.value?.focus())));
    }
    function M(B) {
      if (!d.value) return;
      const T = l.value;
      T && !T.contains(B.target) && (d.value = !1);
    }
    function V(B) {
      n.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), d.value || (d.value = !0, w(), je(() => c.value?.focus())));
    }
    function j(B) {
      const T = f.value;
      if (T.length !== 0) {
        if (B.key === "Escape") {
          B.preventDefault(), d.value = !1;
          return;
        }
        if (B.key === "ArrowDown") {
          B.preventDefault(), h.value = Math.min(h.value + 1, T.length - 1);
          return;
        }
        if (B.key === "ArrowUp") {
          B.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (B.key === "Enter" || B.key === " ") {
          B.preventDefault();
          const D = T[h.value];
          D && x(D);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", M);
    }), lt(() => {
      document.removeEventListener("click", M);
    }), (B, T) => (p(), k("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: s,
        class: te(R(dt))
      }, A(e.label), 3)) : z("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: te([
          R(ht),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onClick: S,
        onKeydown: V
      }, [
        u("div", Q5, [
          g.value.length === 0 ? (p(), k("span", J5, A(e.placeholder), 1)) : (p(), k("div", eC, [
            (p(!0), k(se, null, fe(g.value, (D) => (p(), k("span", {
              key: y(D),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", tC, A(D.label), 1)
            ]))), 128))
          ]))
        ]),
        N(R(Qt), {
          class: te(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Z5),
      Ge(u("ul", {
        id: r,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Oe(j, ["stop"])
      }, [
        (p(!0), k(se, null, fe(f.value, (D, P) => (p(), k("li", {
          key: y(D),
          role: "option",
          "aria-selected": b(D),
          class: te(_(D, P)),
          onClick: Oe((O) => x(D), ["stop"]),
          onMouseenter: (O) => h.value = P
        }, [
          u("span", aC, [
            b(D) ? (p(), ee(R(Co), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : z("", !0)
          ]),
          u("span", oC, A(D.label), 1)
        ], 42, nC))), 128))
      ], 544), [
        [Xt, d.value]
      ])
    ], 512));
  }
}), iC = { class: "font-sans" }, rC = ["for"], lC = { class: "flex gap-2" }, cC = { class: "w-[7.5rem] shrink-0" }, dC = { class: "min-w-0 flex-1" }, uC = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], hC = ["id"], fC = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `kiut-phone-${Ye()}`, s = C(() => n.id ?? `${o}-num`), i = C(() => `${s.value}-err`), r = C({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), l = C({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (p(), k("div", iC, [
      e.label ? (p(), k("label", {
        key: 0,
        for: s.value,
        class: te(R(dt))
      }, A(e.label), 11, rC)) : z("", !0),
      u("div", lC, [
        u("div", cC, [
          N($o, {
            modelValue: r.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", dC, [
          Ge(u("input", {
            id: s.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => l.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: te([R(ht), e.invalid ? R(Ot) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, uC), [
            [Yt, l.value]
          ])
        ])
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: te(R(Tt)),
        role: "alert"
      }, A(e.errorText), 11, hC)) : z("", !0)
    ]));
  }
}), gC = ["role", "aria-label"], pC = { class: "flex flex-wrap gap-2" }, mC = ["aria-checked", "role", "onClick"], bC = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, vC = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, yC = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, xC = /* @__PURE__ */ re({
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
    const n = e, a = t, o = C(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function s(l) {
      return n.multiple ? o.value.includes(l.value) : n.modelValue === l.value;
    }
    function i(l) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        s(l) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function r(l) {
      if (n.multiple) {
        const c = Array.isArray(n.modelValue) ? [...n.modelValue] : [], d = c.indexOf(l.value);
        d >= 0 ? c.splice(d, 1) : c.push(l.value), a("update:modelValue", c);
        return;
      }
      a("update:modelValue", l.value);
    }
    return (l, c) => (p(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", pC, [
        (p(!0), k(se, null, fe(e.items, (d) => (p(), k("button", {
          key: d.value,
          type: "button",
          class: te(i(d)),
          "aria-checked": s(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(d)
        }, [
          u("span", bC, [
            s(d) ? (p(), k("span", vC)) : z("", !0)
          ]),
          d.dotColor ? (p(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: we({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", yC, A(d.label), 1)
        ], 10, mC))), 128))
      ])
    ], 8, gC));
  }
}), _C = ["aria-label"], kC = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], wC = { class: "truncate px-3 py-2 text-sm font-medium" }, CC = /* @__PURE__ */ re({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = `kiut-seg-${Ye()}`, s = (v) => `${o}-seg-${v}`, i = ae([]);
    function r(v, y) {
      v instanceof HTMLButtonElement ? i.value[y] = v : i.value[y] = null;
    }
    function l(v) {
      return v.value === n.modelValue;
    }
    function c(v) {
      const y = l(v), b = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return v.disabled ? `${b} cursor-not-allowed opacity-40` : y ? `${b} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${b} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(v) {
      v.disabled || v.value !== n.modelValue && a("update:modelValue", v.value);
    }
    function h(v, y, b) {
      d(v), je(() => i.value[y]?.focus());
    }
    const f = C(
      () => n.items.map((v, y) => v.disabled ? -1 : y).filter((v) => v >= 0)
    );
    function m(v, y) {
      const b = n.items.length;
      if (b === 0) return 0;
      let _ = v;
      for (let x = 0; x < b; x++)
        if (_ = (_ + y + b) % b, !n.items[_]?.disabled) return _;
      return v;
    }
    function g(v, y) {
      if (v.key === "ArrowRight" || v.key === "ArrowDown") {
        v.preventDefault();
        const b = m(y, 1), _ = n.items[b];
        _ && d(_), je(() => i.value[b]?.focus());
      } else if (v.key === "ArrowLeft" || v.key === "ArrowUp") {
        v.preventDefault();
        const b = m(y, -1), _ = n.items[b];
        _ && d(_), je(() => i.value[b]?.focus());
      } else if (v.key === "Home") {
        v.preventDefault();
        const b = f.value[0];
        if (b !== void 0) {
          const _ = n.items[b];
          _ && d(_), je(() => i.value[b]?.focus());
        }
      } else if (v.key === "End") {
        v.preventDefault();
        const b = f.value[f.value.length - 1];
        if (b !== void 0) {
          const _ = n.items[b];
          _ && d(_), je(() => i.value[b]?.focus());
        }
      }
    }
    return (v, y) => (p(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (p(!0), k(se, null, fe(e.items, (b, _) => (p(), k("button", {
        id: s(b.value),
        key: b.value,
        ref_for: !0,
        ref: (x) => r(x, _),
        type: "button",
        role: "tab",
        "aria-selected": l(b),
        "aria-disabled": b.disabled === !0,
        tabindex: l(b) ? 0 : -1,
        class: te(c(b)),
        onClick: (x) => h(b, _),
        onKeydown: (x) => g(x, _)
      }, [
        u("span", wC, A(b.label), 1)
      ], 42, kC))), 128))
    ], 8, _C));
  }
}), $C = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, SC = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, MC = {
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
}, DC = {
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
}, AC = [
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
function TC(e = "en") {
  return $C[e];
}
function $r(e = "en") {
  return AC.map((t) => ({ id: t, label: DC[e][t] }));
}
function BC(e = "en") {
  return "Presets";
}
$r("es");
function Je(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function it(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function Ne(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function It(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Gn(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function LC(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ne(n);
}
function Ln(e, t) {
  return LC(e, -t);
}
function PC(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Sr(e, t = /* @__PURE__ */ new Date()) {
  const n = Ne(t);
  switch (e) {
    case "today":
      return { start: n, end: n };
    case "yesterday": {
      const a = Ln(n, 1);
      return { start: a, end: a };
    }
    case "last7":
      return { start: Ln(n, 6), end: n };
    case "last14":
      return { start: Ln(n, 13), end: n };
    case "last30":
      return { start: Ln(n, 29), end: n };
    case "last90":
      return { start: Ln(n, 89), end: n };
    case "thisMonth":
      return { start: It(n), end: n };
    case "lastMonth": {
      const a = It(Gn(n, -1));
      return { start: a, end: PC(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function Mr(e, t, n) {
  let a = Ne(e.start), o = Ne(e.end);
  if (t) {
    const s = Ne(Je(t));
    qt(a, s) && (a = s), qt(o, s) && (o = s);
  }
  if (n) {
    const s = Ne(Je(n));
    Ka(a, s) && (a = s), Ka(o, s) && (o = s);
  }
  return Ka(a, o) ? { start: o, end: a } : { start: a, end: o };
}
function RC(e, t, n = /* @__PURE__ */ new Date(), a, o) {
  if (!e.start || !e.end) return !1;
  const s = Mr(Sr(t, n), a, o);
  return it(s.start) === e.start && it(s.end) === e.end;
}
function Qn(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Wt(e, t) {
  return Qn(e, t) === 0;
}
function qt(e, t) {
  return Qn(e, t) < 0;
}
function Ka(e, t) {
  return Qn(e, t) > 0;
}
function Dr(e, t) {
  return Qn(e, t) >= 0;
}
function Ar(e, t) {
  return Qn(e, t) <= 0;
}
function Tr(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), o = new Date(a);
  o.setDate(a.getDate() - a.getDay());
  const s = [], i = new Date(o);
  for (let r = 0; r < 42; r++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function wa(e, t = "en") {
  return `${SC[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Kt(e, t = "en") {
  return `${MC[t][e.getMonth()]} ${e.getFullYear()}`;
}
const EC = ["aria-expanded", "aria-labelledby", "aria-label"], IC = ["onKeydown"], FC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, OC = { class: "mb-4 flex items-center justify-between gap-2" }, VC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, zC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, NC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, jC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, HC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, WC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, KC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, YC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, UC = ["disabled", "onClick"], qC = "rounded-lg text-[#61616b]", XC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", GC = "opacity-30", ZC = "bg-[#6b35e9] font-medium text-white", QC = "bg-[#895af6] font-semibold text-white", JC = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `${`kiut-drp-${Ye()}`}-lbl`, i = ae(null), r = ae(null), l = ae(!1), c = ae(null), d = ae(It(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), f = C(() => {
      const T = It(d.value);
      return [T, Gn(T, 1)];
    }), m = C(() => n.ariaLabel ?? n.placeholder), g = C(() => {
      const T = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${T}` : `left-0 right-auto ${T}`;
    }), v = C(
      () => `${Kt(f.value[0])} – ${Kt(f.value[1])}`
    ), y = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], b = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const T = Je(n.modelValue.start), D = Je(n.modelValue.end);
      return `${wa(T)} – ${wa(D)}`;
    });
    function _(T, D) {
      return T.getMonth() === D.getMonth() && T.getFullYear() === D.getFullYear();
    }
    function x(T) {
      const D = Ne(T);
      if (n.minDate) {
        const P = Ne(Je(n.minDate));
        if (qt(D, P)) return !0;
      }
      if (n.maxDate) {
        const P = Ne(Je(n.maxDate));
        if (qt(P, D)) return !0;
      }
      return !1;
    }
    function w(T, D, P) {
      const O = Wt(T, D), Z = Wt(T, P);
      if (O && Z) return "rounded-lg";
      const Q = O || T.getDay() === 0, ne = Z || T.getDay() === 6;
      return Q && ne ? "rounded-lg" : Q ? "rounded-l-lg" : ne ? "rounded-r-lg" : "rounded-none";
    }
    function $(T, D) {
      const P = _(D, T), O = x(D), Z = n.modelValue.start ? Ne(Je(n.modelValue.start)) : null, Q = n.modelValue.end ? Ne(Je(n.modelValue.end)) : null, ne = Ne(D);
      if (O)
        return qC;
      let ie = XC;
      if (Z && Q && Dr(ne, Z) && Ar(ne, Q)) {
        const X = Wt(ne, Z), L = Wt(ne, Q);
        ie = `${w(ne, Z, Q)} ${X || L ? QC : ZC}`;
      }
      return P || (ie = `${ie} ${GC}`), ie;
    }
    function S(T) {
      if (x(T)) return;
      const D = Ne(T);
      if (!c.value) {
        c.value = new Date(D), a("update:modelValue", { start: it(D), end: it(D) });
        return;
      }
      let O = Ne(c.value), Z = new Date(D);
      qt(Z, O) && ([O, Z] = [Z, O]), a("update:modelValue", { start: it(O), end: it(Z) }), c.value = null, l.value = !1;
    }
    function M(T) {
      d.value = Gn(d.value, T);
    }
    function V() {
      l.value = !1;
    }
    function j(T) {
      if (T?.stopPropagation(), !l.value) {
        if (l.value = !0, c.value = null, n.modelValue.start)
          try {
            d.value = It(Je(n.modelValue.start));
          } catch {
          }
        je(() => r.value?.focus());
      }
    }
    function B(T) {
      if (!l.value) return;
      const D = i.value;
      D && !D.contains(T.target) && (l.value = !1);
    }
    return Ie(l, (T) => {
      T && (c.value = null);
    }), Ze(() => {
      document.addEventListener("click", B);
    }), lt(() => {
      document.removeEventListener("click", B);
    }), (T, D) => (p(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: s,
        class: te(R(dt))
      }, A(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: te([
          R(ht),
          "flex w-full items-center gap-2 text-left",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onFocus: j,
        onClick: j
      }, [
        N(R(wo), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: te([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(b.value), 3)
      ], 42, EC),
      Ge(u("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: te([
          g.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: zn(Oe(V, ["stop"]), ["escape"])
      }, [
        u("div", FC, [
          u("div", OC, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: D[0] || (D[0] = (P) => M(-1))
            }, [
              N(R(ir), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", VC, [
              u("span", zC, A(v.value), 1),
              u("div", NC, [
                u("span", jC, A(R(Kt)(f.value[0])), 1),
                u("span", HC, A(R(Kt)(f.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: D[1] || (D[1] = (P) => M(1))
            }, [
              N(R(rr), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", WC, [
            (p(!0), k(se, null, fe(f.value, (P) => (p(), k("div", {
              key: `${P.getFullYear()}-${P.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", KC, [
                (p(), k(se, null, fe(y, (O) => u("span", { key: O }, A(O), 1)), 64))
              ]),
              u("div", YC, [
                (p(!0), k(se, null, fe(R(Tr)(P), (O) => (p(), k("button", {
                  key: R(it)(O),
                  type: "button",
                  disabled: x(O),
                  class: te(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(P, O)]),
                  onClick: (Z) => S(O)
                }, A(O.getDate()), 11, UC))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, IC), [
        [Xt, l.value]
      ])
    ], 512));
  }
}), e$ = ["aria-expanded", "aria-labelledby", "aria-label"], t$ = ["aria-label", "onKeydown"], n$ = { class: "flex flex-col sm:flex-row" }, a$ = ["aria-label"], o$ = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, s$ = { class: "flex flex-col gap-0.5" }, i$ = ["onClick"], r$ = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, l$ = { class: "mb-4 flex items-center justify-between gap-2" }, c$ = ["aria-label"], d$ = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, u$ = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, h$ = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, f$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, g$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, p$ = ["aria-label"], m$ = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, b$ = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, v$ = { class: "grid grid-cols-7 gap-y-2 mt-2" }, y$ = ["disabled", "onClick"], x$ = "rounded-lg text-[#61616b]", _$ = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", k$ = "opacity-30", w$ = "bg-[#6b35e9] font-medium text-white", C$ = "bg-[#895af6] font-semibold text-white", $$ = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `${`kiut-dpp-${Ye()}`}-lbl`, i = ae(null), r = ae(null), l = ae(!1), c = ae(null), d = ae(It(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), f = C(() => {
      const X = It(d.value);
      return [X, Gn(X, 1)];
    }), m = C(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = C(() => n.ariaLabel ?? m.value), v = C(() => $r(n.locale)), y = C(() => BC(n.locale)), b = C(() => TC(n.locale)), _ = C(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), x = C(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = C(() => {
      const X = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${X}` : `left-0 right-auto ${X}`;
    }), M = C(
      () => `${Kt(f.value[0], n.locale)} – ${Kt(f.value[1], n.locale)}`
    ), V = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return m.value;
      const X = Je(n.modelValue.start), L = Je(n.modelValue.end);
      return `${wa(X, n.locale)} – ${wa(L, n.locale)}`;
    });
    function j(X, L) {
      return X.getMonth() === L.getMonth() && X.getFullYear() === L.getFullYear();
    }
    function B(X) {
      const L = Ne(X);
      if (n.minDate) {
        const H = Ne(Je(n.minDate));
        if (qt(L, H)) return !0;
      }
      if (n.maxDate) {
        const H = Ne(Je(n.maxDate));
        if (qt(H, L)) return !0;
      }
      return !1;
    }
    function T(X, L, H) {
      const K = Wt(X, L), ce = Wt(X, H);
      if (K && ce) return "rounded-lg";
      const ve = K || X.getDay() === 0, De = ce || X.getDay() === 6;
      return ve && De ? "rounded-lg" : ve ? "rounded-l-lg" : De ? "rounded-r-lg" : "rounded-none";
    }
    function D(X) {
      const L = RC(
        n.modelValue,
        X,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), H = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return L ? `${H} font-medium` : H;
    }
    function P(X, L) {
      const H = j(L, X), K = B(L), ce = n.modelValue.start ? Ne(Je(n.modelValue.start)) : null, ve = n.modelValue.end ? Ne(Je(n.modelValue.end)) : null, De = Ne(L);
      if (K)
        return x$;
      let I = _$;
      if (ce && ve && Dr(De, ce) && Ar(De, ve)) {
        const U = Wt(De, ce), de = Wt(De, ve);
        I = `${T(De, ce, ve)} ${U || de ? C$ : w$}`;
      }
      return H || (I = `${I} ${k$}`), I;
    }
    function O(X) {
      const L = Mr(Sr(X), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: it(L.start),
        end: it(L.end)
      }), d.value = It(L.start), c.value = null, l.value = !1;
    }
    function Z(X) {
      if (B(X)) return;
      const L = Ne(X);
      if (!c.value) {
        c.value = new Date(L), a("update:modelValue", { start: it(L), end: it(L) });
        return;
      }
      let K = Ne(c.value), ce = new Date(L);
      qt(ce, K) && ([K, ce] = [ce, K]), a("update:modelValue", { start: it(K), end: it(ce) }), c.value = null, l.value = !1;
    }
    function Q(X) {
      d.value = Gn(d.value, X);
    }
    function ne() {
      l.value = !1;
    }
    function ie(X) {
      if (X.stopPropagation(), l.value) {
        l.value = !1;
        return;
      }
      if (l.value = !0, c.value = null, n.modelValue.start)
        try {
          d.value = It(Je(n.modelValue.start));
        } catch {
        }
      je(() => r.value?.focus());
    }
    function ge(X) {
      if (!l.value) return;
      const L = i.value;
      L && !L.contains(X.target) && (l.value = !1);
    }
    return Ie(l, (X) => {
      X && (c.value = null);
    }), Ze(() => {
      document.addEventListener("click", ge);
    }), lt(() => {
      document.removeEventListener("click", ge);
    }), (X, L) => (p(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: s,
        class: te(R(dt))
      }, A(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: te([
          R(ht),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: ie
      }, [
        N(R(wo), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: te([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(V.value), 3)
      ], 10, e$),
      Ge(u("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: te([
          S.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: zn(Oe(ne, ["stop"]), ["escape"])
      }, [
        u("div", n$, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": _.value
          }, [
            u("p", o$, A(y.value), 1),
            u("ul", s$, [
              (p(!0), k(se, null, fe(v.value, (H) => (p(), k("li", {
                key: H.id
              }, [
                u("button", {
                  type: "button",
                  class: te(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", D(H.id)]),
                  onClick: (K) => O(H.id)
                }, A(H.label), 11, i$)
              ]))), 128))
            ])
          ], 8, a$),
          u("div", r$, [
            u("div", l$, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": x.value,
                onClick: L[0] || (L[0] = (H) => Q(-1))
              }, [
                N(R(ir), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, c$),
              u("div", d$, [
                u("span", u$, A(M.value), 1),
                u("div", h$, [
                  u("span", f$, A(R(Kt)(f.value[0], e.locale)), 1),
                  u("span", g$, A(R(Kt)(f.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: L[1] || (L[1] = (H) => Q(1))
              }, [
                N(R(rr), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, p$)
            ]),
            u("div", m$, [
              (p(!0), k(se, null, fe(f.value, (H) => (p(), k("div", {
                key: `${H.getFullYear()}-${H.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", b$, [
                  (p(!0), k(se, null, fe(b.value, (K) => (p(), k("span", { key: K }, A(K), 1))), 128))
                ]),
                u("div", v$, [
                  (p(!0), k(se, null, fe(R(Tr)(H), (K) => (p(), k("button", {
                    key: R(it)(K),
                    type: "button",
                    disabled: B(K),
                    class: te(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", P(H, K)]),
                    onClick: (ce) => Z(K)
                  }, A(K.getDate()), 11, y$))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, t$), [
        [Xt, l.value]
      ])
    ], 512));
  }
}), S$ = ["disabled", "aria-expanded", "aria-label"], M$ = { class: "min-w-0 flex-1 truncate" }, D$ = ["aria-selected", "onClick", "onMouseenter"], A$ = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, T$ = { class: "min-w-0 flex-1" }, B$ = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `${`kiut-tag-select-${Ye()}`}-listbox`, i = ae(null), r = ae(null), l = ae(null), c = ae(null), d = ae(!1), h = ae(0), f = ae({}), m = C(() => n.options.filter((Q) => !Q.disabled)), g = C(
      () => n.options.find((Q) => Q.value === n.modelValue) ?? null
    ), v = C(() => g.value?.color ?? "neutral"), y = C(
      () => dr(v.value, n.outlined)
    ), b = C(() => g.value ? g.value.label : n.modelValue !== null && n.modelValue !== void 0 && n.modelValue !== "" ? String(n.modelValue) : m.value[0]?.label ?? "Seleccionar…"), _ = C(
      () => n.ariaLabel ?? `Estado: ${b.value}`
    );
    function x() {
      const Q = r.value;
      if (!Q) return;
      const ne = Q.getBoundingClientRect();
      f.value = {
        top: `${ne.bottom + 4}px`,
        left: `${ne.left}px`,
        minWidth: `${ne.width}px`
      };
    }
    function w(Q) {
      return `${String(Q.value)}-${Q.label}`;
    }
    function $(Q) {
      return n.modelValue === Q.value;
    }
    function S(Q, ne) {
      const ie = $(Q), ge = h.value === ne;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ie ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ie && ge ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M() {
      h.value = Math.max(
        0,
        m.value.findIndex((Q) => Q.value === n.modelValue)
      );
    }
    function V() {
      x(), M(), je(() => c.value?.focus());
    }
    function j() {
      d.value = !1;
    }
    function B(Q) {
      a("update:modelValue", Q.value), j();
    }
    function T() {
      if (!n.disabled) {
        if (d.value) {
          j();
          return;
        }
        d.value = !0, V();
      }
    }
    function D(Q) {
      Q.stopPropagation(), !n.disabled && T();
    }
    function P(Q) {
      if (!d.value) return;
      const ne = Q.target, ie = i.value, ge = l.value;
      ie && !ie.contains(ne) && (!ge || !ge.contains(ne)) && j();
    }
    function O(Q) {
      n.disabled || (Q.key === "ArrowDown" || Q.key === "Enter" || Q.key === " ") && (Q.preventDefault(), d.value || (d.value = !0, V()));
    }
    function Z(Q) {
      const ne = m.value;
      if (Q.key === "Escape") {
        Q.preventDefault(), j(), r.value?.focus();
        return;
      }
      if (ne.length !== 0) {
        if (Q.key === "ArrowDown") {
          Q.preventDefault(), h.value = Math.min(h.value + 1, ne.length - 1);
          return;
        }
        if (Q.key === "ArrowUp") {
          Q.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (Q.key === "Enter") {
          Q.preventDefault();
          const ie = ne[h.value];
          ie && B(ie);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", P);
    }), lt(() => {
      document.removeEventListener("click", P);
    }), (Q, ne) => (p(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      u("button", {
        ref_key: "buttonRef",
        ref: r,
        type: "button",
        disabled: e.disabled,
        class: te([
          R(cr),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          y.value,
          d.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": _.value,
        onClick: D,
        onKeydown: O
      }, [
        u("span", M$, A(b.value), 1),
        N(R(Qt), {
          class: te(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, S$),
      (p(), ee(un, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: l,
          style: we(f.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          u("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: Oe(Z, ["stop"])
          }, [
            (p(!0), k(se, null, fe(m.value, (ie, ge) => (p(), k("li", {
              key: w(ie),
              role: "option",
              "aria-selected": $(ie),
              class: te(S(ie, ge)),
              onClick: Oe((X) => B(ie), ["stop"]),
              onMouseenter: (X) => h.value = ge
            }, [
              u("span", A$, [
                $(ie) ? (p(), ee(R(Co), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : z("", !0)
              ]),
              u("span", T$, A(ie.label), 1)
            ], 42, D$))), 128))
          ], 544)
        ], 4), [
          [Xt, d.value]
        ])
      ]))
    ], 512));
  }
}), L$ = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, P$ = ["id"], R$ = { class: "min-w-0 flex-1 space-y-1" }, E$ = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, I$ = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, F$ = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, O$ = /* @__PURE__ */ re({
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
    loading: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const n = e, a = C(() => ({ maxWidth: `${n.width}px` })), o = t, i = `${`kiut-modal-${Ye()}`}-title`, r = ae(null);
    function l() {
      n.loading || (o("cancel"), o("update:modelValue", !1));
    }
    function c() {
      o("confirm");
    }
    function d(h) {
      if (n.modelValue && h.key === "Escape") {
        if (n.loading) return;
        h.preventDefault(), l();
      }
    }
    return Ie(
      () => n.modelValue,
      (h) => {
        h && requestAnimationFrame(() => {
          r.value?.focus({ preventScroll: !0 });
        });
      }
    ), Ze(() => {
      document.addEventListener("keydown", d);
    }), lt(() => {
      document.removeEventListener("keydown", d);
    }), (h, f) => (p(), ee(un, { to: "body" }, [
      N(ut, { name: "kiut-modal" }, {
        default: E(() => [
          e.modelValue ? (p(), k("div", L$, [
            u("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: l
            }),
            u("div", {
              id: e.id,
              ref_key: "panelRef",
              ref: r,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: we(a.value),
              onClick: f[0] || (f[0] = Oe(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: te(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", R$, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (p(), k("p", E$, A(e.subtitle), 1)) : z("", !0)
                ]),
                N(xt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: l
                }, {
                  icon: E(() => [
                    N(R(lr), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              u("div", I$, [
                _e(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", F$, [
                N(xt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: l
                }, {
                  default: E(() => [
                    Ae(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                N(xt, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: E(() => [
                    Ae(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ], 12, P$)
          ])) : z("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), V$ = /* @__PURE__ */ me(O$, [["__scopeId", "data-v-9134bb89"]]), z$ = { class: "text-left font-['Inter',system-ui,sans-serif]" }, N$ = {
  key: 0,
  class: ""
}, j$ = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, H$ = { class: "flex min-w-0 flex-1 items-center" }, W$ = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, K$ = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, Y$ = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, U$ = /* @__PURE__ */ re({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = eo(), n = C(() => {
      const a = !!t.filters, o = !!t.actions;
      return a && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (a, o) => (p(), k("section", z$, [
      a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions ? (p(), k("header", N$, [
        a.$slots.description ? (p(), k("div", j$, [
          _e(a.$slots, "description")
        ])) : z("", !0),
        a.$slots.tabs ? (p(), k("div", {
          key: 1,
          class: te(["flex flex-wrap items-center gap-2", a.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", H$, [
            _e(a.$slots, "tabs")
          ]),
          a.$slots.actions && !a.$slots.filters ? (p(), k("div", W$, [
            _e(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0),
        a.$slots.filters || a.$slots.actions && !a.$slots.tabs ? (p(), k("div", {
          key: 2,
          class: te([
            "flex flex-wrap gap-2 items-center",
            a.$slots.tabs ? "mt-2" : "",
            n.value
          ])
        }, [
          a.$slots.filters ? (p(), k("div", K$, [
            _e(a.$slots, "filters")
          ])) : z("", !0),
          a.$slots.actions ? (p(), k("div", Y$, [
            _e(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0)
      ])) : z("", !0),
      a.$slots.content || a.$slots.default ? (p(), k("div", {
        key: 1,
        class: te({
          "mt-6": a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions
        })
      }, [
        _e(a.$slots, "content", {}, () => [
          _e(a.$slots, "default")
        ])
      ], 2)) : z("", !0)
    ]));
  }
}), q$ = { class: "flex flex-1 min-h-0" }, X$ = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, G$ = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, Z$ = ["aria-current", "data-has-active", "title", "onClick"], Q$ = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, J$ = { class: "px-4 py-4 shrink-0" }, eS = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, tS = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, nS = ["data-nav-id", "aria-current", "onClick"], aS = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, oS = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, sS = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, iS = ["data-nav-id", "aria-current", "onClick"], rS = { class: "truncate text-[15px]" }, lS = ["aria-current", "data-has-active", "onClick"], cS = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, dS = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, uS = /* @__PURE__ */ re({
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
    const n = ae(!1), a = e, o = t, s = Ca(), { class: i, ...r } = s, l = ae(!1);
    function c() {
      typeof window > "u" || (l.value = window.innerWidth < a.mobileBreakpoint);
    }
    Ze(() => {
      c(), window.addEventListener("resize", c);
    }), lt(() => {
      window.removeEventListener("resize", c);
    });
    const d = C(() => {
      const b = a.sections.find((_) => _.id === a.selectedSectionId);
      return b?.items?.length ? b : null;
    });
    function h(b) {
      return a.activePath ? a.activePath === b.path || a.activePath.startsWith(b.path + "/") : !1;
    }
    function f(b) {
      return b.items?.length ? b.items.some(h) : !a.activePath || !b.path ? !1 : a.activePath === b.path || a.activePath.startsWith(b.path + "/");
    }
    function m(b) {
      if (!b.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: b,
          item: { id: b.id, label: b.label, path: b.path }
        });
        return;
      }
      const _ = a.selectedSectionId === b.id ? null : b.id;
      o("update:selectedSectionId", _);
    }
    function g(b, _) {
      o("navigate", { section: b, item: _ });
    }
    function v() {
      o("update:selectedSectionId", null);
    }
    function y(b, _) {
      g(b, _), v();
    }
    return (b, _) => l.value ? (p(), k("div", _t({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      N(ut, { name: "ksn-overlay" }, {
        default: E(() => [
          d.value ? (p(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: v
          })) : z("", !0)
        ]),
        _: 1
      }),
      N(ut, { name: "ksn-sheet" }, {
        default: E(() => [
          d.value ? (p(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: we({ paddingBottom: a.mobileBarHeight })
          }, [
            _[3] || (_[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", aS, [
              u("p", oS, A(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: v
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
            u("nav", sS, [
              (p(!0), k(se, null, fe(d.value.items, (x) => (p(), k("button", {
                key: x.id,
                type: "button",
                "data-nav-id": x.id,
                "aria-current": h(x) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => y(d.value, x)
              }, [
                x.icon ? (p(), ee(Mt(x.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : z("", !0),
                u("span", rS, A(x.label), 1)
              ], 8, iS))), 128))
            ])
          ], 4)) : z("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: we({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (p(!0), k(se, null, fe(e.sections, (x) => (p(), k("button", {
          key: x.id,
          type: "button",
          "aria-current": e.selectedSectionId === x.id ? "true" : void 0,
          "data-has-active": f(x) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => m(x)
        }, [
          e.selectedSectionId === x.id || f(x) ? (p(), k("span", cS)) : z("", !0),
          x.icon ? (p(), ee(Mt(x.icon), {
            key: 1,
            class: "shrink-0",
            style: we({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : z("", !0),
          u("span", dS, A(x.label), 1)
        ], 8, lS))), 128))
      ], 4)
    ], 16)) : (p(), k("aside", _t({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      u("div", q$, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: we({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: _[0] || (_[0] = (x) => n.value = !0),
          onMouseleave: _[1] || (_[1] = (x) => n.value = !1)
        }, [
          b.$slots.logo ? (p(), k("div", X$, [
            _e(b.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : z("", !0),
          u("nav", G$, [
            (p(!0), k(se, null, fe(e.sections, (x) => (p(), k("button", {
              key: x.id,
              type: "button",
              "aria-current": e.selectedSectionId === x.id ? "true" : void 0,
              "data-has-active": f(x) ? "true" : void 0,
              title: x.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => m(x)
            }, [
              x.icon ? (p(), ee(Mt(x.icon), {
                key: 0,
                class: "shrink-0",
                style: we({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : z("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: we({ fontSize: e.primaryFontSize })
              }, A(x.label), 5)
            ], 8, Z$))), 128))
          ]),
          b.$slots.footer ? (p(), k("div", Q$, [
            _e(b.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : z("", !0)
        ], 36),
        N(ut, { name: "ksn-sub" }, {
          default: E(() => [
            d.value ? (p(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: we({ width: e.secondaryWidth })
            }, [
              u("div", J$, [
                u("p", eS, A(d.value.label), 1)
              ]),
              u("nav", tS, [
                (p(!0), k(se, null, fe(d.value.items, (x) => (p(), k("button", {
                  key: x.id,
                  type: "button",
                  "data-nav-id": x.id,
                  "aria-current": h(x) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(d.value, x)
                }, [
                  x.icon ? (p(), ee(Mt(x.icon), {
                    key: 0,
                    style: we({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : z("", !0),
                  u("span", {
                    class: "truncate",
                    style: we({ fontSize: e.secondaryFontSize })
                  }, A(x.label), 5)
                ], 8, nS))), 128))
              ])
            ], 4)) : z("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), hS = /* @__PURE__ */ me(uS, [["__scopeId", "data-v-e0ccb96c"]]), wS = {
  install(e) {
    e.component("KiutChartBar", kt), e.component("KiutChartLine", vt), e.component("KiutPieChart", Aa), e.component("KiutBoxplotChart", $f), e.component("KiutCandlestickChart", hg), e.component("KiutHistogramChart", or), e.component("KiutSankeyChart", Jt), e.component("KiutAgentsPerDay", cm), e.component("KiutBookingManager", jm), e.component("KiutCheckin", ur), e.component("KiutCheckinContainer", L0), e.component("KiutCheckinMetrics", v0), e.component("KiutCheckinSegments", hr), e.component("KiutDisruption", G0), e.component("KiutFAQ", ob), e.component("KiutMessagesPerAgent", gb), e.component("KiutRecordLocator", Lb), e.component("KiutSalesByChannel", fr), e.component("KiutSeller", gr), e.component("KiutSellerContainer", vv), e.component("KiutTopAgents", $v), e.component("KiutPaymentMethod", Yv), e.component("KiutAgentHumanConversations", By), e.component("KiutChannelMetrics", Ny), e.component("KiutTriageCombinations", t1), e.component("KiutSelectLanguage", r1), e.component("KiutGuardrails", b1), e.component("KiutDisruptionNotifier", F1), e.component("KiutTotalConversationsCard", O1), e.component("KiutCsatP95Card", V1), e.component("KiutCsatPulseCard", z1), e.component("KiutCSATContainer", gx), e.component("KiutAiGeneratedRevenueCard", px), e.component("KiutAiGeneratedChart", $x), e.component("KiutCostCard", Mx), e.component("KiutHumanEscalations", Ex), e.component("KiutHumanEscalationsCard", Ix), e.component("KiutNpsDailyMetrics", mr), e.component("KiutNpsMetrics", br), e.component("KiutNpsOverviewMetrics", pr), e.component("KiutAWSCost", Wx), e.component("KiutCostUsage", e_), e.component("KiutTokenUsage", d_), e.component("KiutConversationCount", x_), e.component("KiutTopAgentsAnalysis", L_), e.component("KiutTopAgentsPie", N_), e.component("KiutDailyCostTrends", G_), e.component("KiutModelUsage", dk), e.component("KiutMessageRoles", yk), e.component("KiutCostPerConversations", Bk), e.component("Tabs", vr), e.component("Table", qk), e.component("TableVersions", z2), e.component("Filters", yw), e.component("InputText", Cw), e.component("InputPassword", Pw), e.component("InputTextarea", Ow), e.component("InputFile", Yw), e.component("InputDateTime", Qw), e.component("InputTime", o5), e.component("InputRange", v5), e.component("InputNumber", w5), e.component("InputColorPicker", L5), e.component("EmojiPicker", G5), e.component("Select", $o), e.component("MultiSelect", sC), e.component("Toggle", kr), e.component("InputPhone", fC), e.component("SelectablePills", xC), e.component("SegmentedControl", CC), e.component("DateRangePicker", JC), e.component("DatePickerPresets", $$), e.component("Tag", Ue), e.component("TagSelect", B$), e.component("Button", xt), e.component("Modal", V$), e.component("Section", U$), e.component("KiutAppShellNavigation", hS);
  }
};
export {
  Wx as AWSCost,
  By as AgentHumanConversations,
  cm as AgentsPerDay,
  $x as AiGeneratedChart,
  px as AiGeneratedRevenueCard,
  hS as AppShellNavigation,
  jm as BookingManager,
  $f as BoxplotChart,
  xt as Button,
  gx as CSATContainer,
  hg as CandlestickChart,
  Ny as ChannelMetrics,
  kt as ChartBar,
  vt as ChartLine,
  ur as Checkin,
  L0 as CheckinContainer,
  v0 as CheckinMetrics,
  hr as CheckinSegments,
  x_ as ConversationCount,
  Mx as CostCard,
  Bk as CostPerConversations,
  e_ as CostUsage,
  V1 as CsatP95Card,
  z1 as CsatPulseCard,
  wr as DEFAULT_CATEGORY_LABELS,
  Cr as DEFAULT_EMOJI_CATALOG,
  x2 as DEFAULT_TABLE_VERSIONS_LABELS,
  G_ as DailyCostTrends,
  $$ as DatePickerPresets,
  JC as DateRangePicker,
  G0 as Disruption,
  F1 as DisruptionNotifier,
  _2 as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  G5 as EmojiPicker,
  ob as FAQ,
  yw as Filters,
  b1 as Guardrails,
  or as HistogramChart,
  Ex as HumanEscalations,
  Ix as HumanEscalationsCard,
  L5 as InputColorPicker,
  Qw as InputDateTime,
  Yw as InputFile,
  w5 as InputNumber,
  Pw as InputPassword,
  fC as InputPhone,
  v5 as InputRange,
  Cw as InputText,
  Ow as InputTextarea,
  o5 as InputTime,
  wS as KiutUIPlugin,
  yk as MessageRoles,
  gb as MessagesPerAgent,
  V$ as Modal,
  dk as ModelUsage,
  sC as MultiSelect,
  mr as NpsDailyMetrics,
  br as NpsMetrics,
  pr as NpsOverviewMetrics,
  Yv as PaymentMethod,
  Aa as PieChart,
  _S as RESOURCE_TABLE_VERSIONS_COLUMNS,
  Lb as RecordLocator,
  fr as SalesByChannel,
  Jt as SankeyChart,
  U$ as Section,
  CC as SegmentedControl,
  $o as Select,
  r1 as SelectLanguage,
  xC as SelectablePills,
  gr as Seller,
  vv as SellerContainer,
  qk as Table,
  z2 as TableVersions,
  vr as Tabs,
  Ue as Tag,
  B$ as TagSelect,
  kr as Toggle,
  d_ as TokenUsage,
  $v as TopAgents,
  L_ as TopAgentsAnalysis,
  N_ as TopAgentsPie,
  O1 as TotalConversationsCard,
  t1 as TriageCombinations,
  I5 as appendEmojiToDraft,
  kS as buildDefaultCategories,
  E5 as extractEmojis,
  R5 as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
