import { defineComponent as ie, shallowRef as si, h as ze, ref as ae, onMounted as Ze, onUnmounted as lt, watch as Ie, toRaw as Ya, nextTick as je, version as Br, isProxy as ii, computed as C, toRef as Se, openBlock as m, createElementBlock as _, createVNode as N, unref as E, createElementVNode as u, Fragment as se, renderList as fe, normalizeStyle as we, normalizeClass as te, toDisplayString as A, createCommentVNode as z, onBeforeUnmount as ri, createStaticVNode as Mo, useSlots as eo, renderSlot as _e, Transition as ut, withCtx as R, Comment as Lr, createBlock as ee, resolveDynamicComponent as Mt, createTextVNode as Ae, Teleport as un, withDirectives as Ge, withModifiers as Oe, vModelText as Yt, vShow as Xt, createSlots as Do, vModelSelect as li, mergeProps as _t, useAttrs as Ca, withKeys as zn, inject as ci } from "vue";
import * as Ao from "echarts/core";
import { TooltipComponent as Pr, TitleComponent as Er } from "echarts/components";
import { SankeyChart as Rr } from "echarts/charts";
import { CanvasRenderer as Ir } from "echarts/renderers";
import We from "moment";
function Gn(e) {
  return e + 0.5 | 0;
}
const zt = (e, t, n) => Math.max(Math.min(e, n), t);
function Pn(e) {
  return zt(Gn(e * 2.55), 0, 255);
}
function Ut(e) {
  return zt(Gn(e * 255), 0, 255);
}
function Et(e) {
  return zt(Gn(e / 2.55) / 100, 0, 1);
}
function To(e) {
  return zt(Gn(e * 100), 0, 100);
}
const gt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ua = [..."0123456789ABCDEF"], Fr = (e) => Ua[e & 15], Or = (e) => Ua[(e & 240) >> 4] + Ua[e & 15], Qn = (e) => (e & 240) >> 4 === (e & 15), Vr = (e) => Qn(e.r) && Qn(e.g) && Qn(e.b) && Qn(e.a);
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
  return e.a < 255 ? `hsla(${n}, ${a}%, ${o}%, ${Et(e.a)})` : `hsl(${n}, ${a}%, ${o}%)`;
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
let Jn;
function Jr(e) {
  Jn || (Jn = Qr(), Jn.transparent = [0, 0, 0, 0]);
  const t = Jn[e.toLowerCase()];
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
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Et(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Ba = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, bn = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function al(e, t, n) {
  const a = bn(Et(e.r)), o = bn(Et(e.g)), s = bn(Et(e.b));
  return {
    r: Ut(Ba(a + n * (bn(Et(t.r)) - a))),
    g: Ut(Ba(o + n * (bn(Et(t.g)) - o))),
    b: Ut(Ba(s + n * (bn(Et(t.b)) - s))),
    a: e.a + n * (t.a - e.a)
  };
}
function ea(e, t, n) {
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
    return t && (t.a = Et(t.a)), t;
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
    const t = this._rgb, n = Gn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return ea(this._rgb, 2, t), this;
  }
  darken(t) {
    return ea(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ea(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ea(this._rgb, 1, -t), this;
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
function Ee(e, t, n, a) {
  let o, s, i;
  if (qe(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(n, e[o], o);
  else if (Te(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(n, e[i[o]], i[o]);
}
function pa(e, t) {
  let n, a, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (o = e[n], s = t[n], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function ma(e) {
  if (qe(e))
    return e.map(ma);
  if (Te(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let o = 0;
    for (; o < a; ++o)
      t[n[o]] = ma(e[n[o]]);
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
  Te(o) && Te(s) ? jn(o, s, a) : t[e] = ma(s);
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
  Te(a) && Te(o) ? In(a, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = ma(o));
}
const Eo = {
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
  return (Eo[t] || (Eo[t] = dl(t)))(e);
}
function oo(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Hn = (e) => typeof e < "u", Gt = (e) => typeof e == "function", Ro = (e, t) => {
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
const Re = Math.PI, He = 2 * Re, hl = He + Re, ba = Number.POSITIVE_INFINITY, fl = Re / 180, Xe = Re / 2, nn = Re / 4, Io = Re * 2 / 3, pi = Math.log10, At = Math.sign;
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
function Rt(e) {
  return e * (Re / 180);
}
function vl(e) {
  return e * (180 / Re);
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
  return s < -0.5 * Re && (s += He), {
    angle: s,
    distance: o
  };
}
function qa(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function yl(e, t) {
  return (e - t + hl) % He - Re;
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
    const { iScale: i, vScale: r, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: f, minDefined: b, maxDefined: g } = i.getUserBounds();
    if (b) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        cn(l, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : cn(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const y = l.slice(0, o + 1).reverse().findIndex((v) => !Pe(v[r.axis]));
        o -= Math.max(0, y);
      }
      o = et(o, 0, a - 1);
    }
    if (g) {
      let y = Math.max(
        // @ts-expect-error Need to type _parsed
        cn(l, i.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : cn(t, d, i.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const v = l.slice(y - 1).findIndex((p) => !Pe(p[r.axis]));
        y += Math.max(0, v);
      }
      s = et(y, o, a) - o;
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
const ta = (e) => e === 0 || e === 1, zo = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * He / n)), No = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * He / n) + 1, On = {
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
  easeInOutSine: (e) => -0.5 * (Math.cos(Re * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => ta(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => ta(e) ? e : zo(e, 0.075, 0.3),
  easeOutElastic: (e) => ta(e) ? e : No(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return ta(e) ? e : e < 0.5 ? 0.5 * zo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * No(e * 2 - 1, 0.1125, 0.45);
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
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = El(e, n);
    }
    const i = pi(Math.abs(s)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: o,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), lo(e, a, l);
  }
};
function El(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var _i = {
  formatters: Pl
};
function Rl(e) {
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
  Rl
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
  const b = t.pointStyle, g = t.rotation, y = t.radius;
  let v = (g || 0) * fl;
  if (b && typeof b == "object" && (s = b.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(v), e.drawImage(b, -b.width / 2, -b.height / 2, b.width, b.height), e.restore();
    return;
  }
  if (!(isNaN(y) || y <= 0)) {
    switch (e.beginPath(), b) {
      // Default includes circle
      default:
        o ? e.ellipse(n, a, o / 2, y, 0, 0, He) : e.arc(n, a, y, 0, He), e.closePath();
        break;
      case "triangle":
        d = o ? o / 2 : y, e.moveTo(n + Math.sin(v) * d, a - Math.cos(v) * y), v += Io, e.lineTo(n + Math.sin(v) * d, a - Math.cos(v) * y), v += Io, e.lineTo(n + Math.sin(v) * d, a - Math.cos(v) * y), e.closePath();
        break;
      case "rectRounded":
        c = y * 0.516, l = y - c, i = Math.cos(v + nn) * l, h = Math.cos(v + nn) * (o ? o / 2 - c : l), r = Math.sin(v + nn) * l, f = Math.sin(v + nn) * (o ? o / 2 - c : l), e.arc(n - h, a - r, c, v - Re, v - Xe), e.arc(n + f, a - i, c, v - Xe, v), e.arc(n + h, a + r, c, v, v + Xe), e.arc(n - f, a + i, c, v + Xe, v + Re), e.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * y, d = o ? o / 2 : l, e.rect(n - d, a - l, 2 * d, 2 * l);
          break;
        }
        v += nn;
      /* falls through */
      case "rectRot":
        h = Math.cos(v) * (o ? o / 2 : y), i = Math.cos(v) * y, r = Math.sin(v) * y, f = Math.sin(v) * (o ? o / 2 : y), e.moveTo(n - h, a - r), e.lineTo(n + f, a - i), e.lineTo(n + h, a + r), e.lineTo(n - f, a + i), e.closePath();
        break;
      case "crossRot":
        v += nn;
      /* falls through */
      case "cross":
        h = Math.cos(v) * (o ? o / 2 : y), i = Math.cos(v) * y, r = Math.sin(v) * y, f = Math.sin(v) * (o ? o / 2 : y), e.moveTo(n - h, a - r), e.lineTo(n + h, a + r), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i);
        break;
      case "star":
        h = Math.cos(v) * (o ? o / 2 : y), i = Math.cos(v) * y, r = Math.sin(v) * y, f = Math.sin(v) * (o ? o / 2 : y), e.moveTo(n - h, a - r), e.lineTo(n + h, a + r), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i), v += nn, h = Math.cos(v) * (o ? o / 2 : y), i = Math.cos(v) * y, r = Math.sin(v) * y, f = Math.sin(v) * (o ? o / 2 : y), e.moveTo(n - h, a - r), e.lineTo(n + h, a + r), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(v) * y, r = Math.sin(v) * y, e.moveTo(n - i, a - r), e.lineTo(n + i, a + r);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(v) * (o ? o / 2 : y), a + Math.sin(v) * y);
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
function va(e, t) {
  const { x: n, y: a, w: o, h: s, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Re, Re, !0), e.lineTo(n, a + s - i.bottomLeft), e.arc(n + i.bottomLeft, a + s - i.bottomLeft, i.bottomLeft, Re, Xe, !0), e.lineTo(n + o - i.bottomRight, a + s), e.arc(n + o - i.bottomRight, a + s - i.bottomRight, i.bottomRight, Xe, 0, !0), e.lineTo(n + o, a + i.topRight), e.arc(n + o - i.topRight, a + i.topRight, i.topRight, 0, -Xe, !0), e.lineTo(n + i.topLeft, a);
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
function na(e, t, n, a) {
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
function aa(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function lc(e, t) {
  let n, a, o, s, i, r = Yn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = s, s = r, r = n < a - 1 && Yn(e[n + 1], t), s && (o = e[n], i && (o.cp1x = aa(o.cp1x, t.left, t.right), o.cp1y = aa(o.cp1y, t.top, t.bottom)), r && (o.cp2x = aa(o.cp2x, t.left, t.right), o.cp2y = aa(o.cp2y, t.top, t.bottom)));
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
function ya(e, t, n) {
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
  let { width: b, height: g } = t;
  return s && (b -= i.width + r.width, g -= i.height + r.height), {
    x: Math.round((l - h) / b * n.width / a),
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
      t = i.width - c.width - l.width, n = i.height - c.height - l.height, a = ya(r.maxWidth, s, "clientWidth"), o = ya(r.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || ba,
    maxHeight: o || ba
  };
}
const jt = (e) => Math.round(e * 10) / 10;
function pc(e, t, n, a) {
  const o = $a(e), s = dn(o, "margin"), i = ya(o.maxWidth, e, "clientWidth") || ba, r = ya(o.maxHeight, e, "clientHeight") || ba, l = gc(e, t, n);
  let { width: c, height: d } = l;
  if (o.boxSizing === "content-box") {
    const f = dn(o, "border", "width"), b = dn(o, "padding");
    c -= b.width + f.width, d -= b.height + f.height;
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
  let { start: c, end: d, loop: h } = e, f, b;
  if (h) {
    for (c += l, d += l, f = 0, b = l; f < b && i(r(t[c % l][a]), o, s); ++f)
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
  const { property: a, start: o, end: s } = n, i = t.length, { compare: r, between: l, normalize: c } = Bi(a), { start: d, end: h, loop: f, style: b } = _c(e, t, n), g = [];
  let y = !1, v = null, p, x, k;
  const w = () => l(o, k, p) && r(o, k) !== 0, $ = () => r(s, p) === 0 || l(s, k, p), S = () => y || w(), M = () => !y || $();
  for (let V = d, H = d; V <= h; ++V)
    x = t[V % i], !x.skip && (p = c(x[a]), p !== k && (y = l(p, o, s), v === null && S() && (v = r(p, o) === 0 ? V : H), v !== null && M() && (g.push(Go({
      start: v,
      end: V,
      loop: f,
      count: i,
      style: b
    })), v = null), H = V, k = p));
  return v !== null && g.push(Go({
    start: v,
    end: h,
    loop: f,
    count: i,
    style: b
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
  function b(g, y, v, p) {
    const x = r ? -1 : 1;
    if (g !== y) {
      for (g += l; n[g % l].skip; )
        g -= x;
      for (; n[y % l].skip; )
        y += x;
      g % l !== y % l && (c.push({
        start: g % l,
        end: y % l,
        loop: v,
        style: p
      }), d = p, h = y % l);
    }
  }
  for (const g of t) {
    h = r ? h : g.start;
    let y = n[h % l], v;
    for (f = h + 1; f <= g.end; f++) {
      const p = n[f % l];
      v = Qo(a.setContext(gn(o, {
        type: "segment",
        p0: y,
        p1: p,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: i
      }))), Dc(v, d) && b(h, f - 1, g.loop, d), y = p, d = v;
    }
    h < f - 1 && b(h, f - 1, g.loop, d);
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
function oa(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function Ac(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: oa(n, t, "left"),
    right: oa(n, t, "right"),
    top: oa(a, t, "top"),
    bottom: oa(a, t, "bottom")
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
    o = na([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = na([
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
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = na([
        t.to,
        n,
        o,
        t.from
      ]), this._from = na([
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
    const a = n.options, o = Rc(t, a);
    if (!o)
      return [];
    const s = this._createAnimations(o, a);
    return a.$shared && Ec(t.options.$animations, a).then(() => {
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
function Ec(e, t) {
  const n = [], a = Object.keys(t);
  for (let o = 0; o < a.length; o++) {
    const s = e[a[o]];
    s && s.active() && n.push(s.wait());
  }
  return Promise.all(n);
}
function Rc(e, t) {
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
function Ea(e, t) {
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
  for (let b = 0; b < h; ++b) {
    const g = t[b], { [l]: y, [c]: v } = g, p = g._stacks || (g._stacks = {});
    f = p[c] = Nc(o, d, y), f[r] = v, f._top = ns(f, i, !0, a.type), f._bottom = ns(f, i, !1, a.type);
    const x = f._visualValues || (f._visualValues = {});
    x[r] = v;
  }
}
function Ra(e, t) {
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
    this.configure(), this.linkScales(), t._stacked = Ea(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && $n(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), o = (h, f, b, g) => h === "x" ? f : h === "r" ? g : b, s = n.xAxisID = $e(a.xAxisID, Ra(t, "x")), i = n.yAxisID = $e(a.yAxisID, Ra(t, "y")), r = n.rAxisID = $e(a.rAxisID, Ra(t, "r")), l = n.indexAxis, c = n.iAxisID = o(l, s, i, r), d = n.vAxisID = o(l, i, s, r);
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
    n._stacked = Ea(n.vScale, n), n.stack !== a.stack && (o = !0, $n(n), n.stack = a.stack), this._resyncElements(t), (o || s !== n._stacked) && (as(this, n._parsed), n._stacked = Ea(n.vScale, n));
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
      const b = () => h[r] === null || c && h[r] < c[r];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = f[d], l && (b() && (l = !1), c = h);
      a._sorted = l;
    }
    i && as(this, f);
  }
  parsePrimitiveData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, r = s.axis, l = i.axis, c = s.getLabels(), d = s === i, h = new Array(o);
    let f, b, g;
    for (f = 0, b = o; f < b; ++f)
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
    let d, h, f, b;
    for (d = 0, h = o; d < h; ++d)
      f = d + a, b = n[f], c[d] = {
        x: s.parse(hn(b, r), f),
        y: i.parse(hn(b, l), f)
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
    let f, b;
    function g() {
      b = o[f];
      const y = b[r.axis];
      return !mt(b[t.axis]) || d > y || h < y;
    }
    for (f = 0; f < i && !(!g() && (this.updateRangeFromParsed(c, t, b, l), s)); ++f)
      ;
    if (s) {
      for (f = i - 1; f >= 0; --f)
        if (!g()) {
          this.updateRangeFromParsed(c, t, b, l);
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
    ], f = c.getOptionScopes(this.getDataset(), d), b = Object.keys(Ke.elements[t]), g = () => this.getContext(a, o, n), y = c.resolveNamedOptions(f, b, g, h);
    return y.$shared && (y.$shared = l, s[i] = Object.freeze(os(y, l))), y;
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
function Ei(e, t, n, a) {
  return qe(e) ? Xc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function ss(e, t, n, a) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), r = o === s, l = [];
  let c, d, h, f;
  for (c = n, d = n + a; c < d; ++c)
    f = t[c], h = {}, h[o.axis] = r || o.parse(i[c], c), l.push(Ei(f, h, s, c));
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
    let f, b, g, y;
    for (f = a, b = a + o; f < b; ++f)
      y = n[f], g = {}, g[s.axis] = s.parse(hn(y, c), f), h.push(Ei(hn(y, d), g, i, f));
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
    for (let b = n; b < n + a; b++) {
      const g = this.getParsed(b), y = s || Pe(g[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(b), v = this._calculateBarIndexPixels(b, d), p = (g._stacks || {})[r.axis], x = {
        horizontal: c,
        base: y.base,
        enableBorderRadius: !p || Fa(g._custom) || i === p._top || i === p._bottom,
        x: c ? y.head : v.center,
        y: c ? v.center : y.head,
        height: c ? v.size : Math.abs(y.size),
        width: c ? Math.abs(y.size) : v.size
      };
      f && (x.options = h || this.resolveDataElementOptions(b, t[b].active ? "active" : o));
      const k = x.options || t[b].options;
      Qc(x, k, p, i), ed(x, k, d.ratio), this.updateElement(t[b], b, x, o);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, o = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), s = a.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(n), l = r && r[a.axis], c = (d) => {
      const h = d._parsed.find((b) => b[a.axis] === l), f = h && h[d.vScale.axis];
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
    let h = l[n.axis], f = 0, b = a ? this.applyStack(n, l, a) : h, g, y;
    b !== h && (f = b - h, b = h), d && (h = c.barStart, b = c.barEnd - c.barStart, h !== 0 && At(h) !== At(c.barEnd) && (f = 0), f += h);
    const v = !Pe(s) && !d ? s : f;
    let p = n.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(f + b) : g = p, y = g - p, Math.abs(y) < i) {
      y = Gc(y, n, r) * i, h === r && (p -= y / 2);
      const x = n.getPixelForDecimal(0), k = n.getPixelForDecimal(1), w = Math.min(x, k), $ = Math.max(x, k);
      p = Math.max(Math.min(p, $), w), g = p + y, a && !d && (l._stacks[n.axis]._visualValues[o] = n.getValueForPixel(g) - n.getValueForPixel(p));
    }
    if (p === n.getPixelForValue(r)) {
      const x = At(y) * n.getLineWidthForValue(r) / 2;
      p += x, y -= x;
    }
    return {
      size: y,
      base: p,
      head: g,
      center: g + y / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, o = this.options, s = o.skipNull, i = $e(o.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = s ? this._getStackCount(t) : n.stackCount, h = o.barThickness === "flex" ? qc(t, n, o, d * c) : Uc(t, n, o, d * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, b = this._getAxis().indexOf($e(f, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + b;
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
    const r = e, l = r + t, c = Math.cos(r), d = Math.sin(r), h = Math.cos(l), f = Math.sin(l), b = (k, w, $) => Kn(k, r, l, !0) ? 1 : Math.max(w, w * n, $, $ * n), g = (k, w, $) => Kn(k, r, l, !0) ? -1 : Math.min(w, w * n, $, $ * n), y = b(0, c, h), v = b(Xe, d, f), p = g(Re, c, h), x = g(Re + Xe, d, f);
    a = (y - p) / 2, o = (v - x) / 2, s = -(y + p) / 2, i = -(v + x) / 2;
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
    return Rt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Rt(this.options.circumference);
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
    const n = this.chart, { chartArea: a } = n, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, r = Math.max((Math.min(a.width, a.height) - i) / 2, 0), l = Math.min(il(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: b, offsetX: g, offsetY: y } = nd(h, d, l), v = (a.width - i) / f, p = (a.height - i) / b, x = Math.max(Math.min(v, p) / 2, 0), k = fi(this.options.radius, x), w = Math.max(k * l, 0), $ = (k - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * k, this.offsetY = y * k, o.total = this.calculateTotal(), this.outerRadius = k - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, n) {
    const a = this.options, o = this._cachedMeta, s = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / He);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", i = this.chart, r = i.chartArea, c = i.options.animation, d = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, f = s && c.animateScale, b = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: v } = this._getSharedOptions(n, o);
    let p = this._getRotation(), x;
    for (x = 0; x < n; ++x)
      p += this._circumference(x, s);
    for (x = n; x < n + a; ++x) {
      const k = this._circumference(x, s), w = t[x], $ = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: p,
        endAngle: p + k,
        circumference: k,
        outerRadius: g,
        innerRadius: b
      };
      v && ($.options = y || this.resolveDataElementOptions(x, w.active ? "active" : o)), p += k, this.updateElement(w, x, $, o);
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
    const s = o === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, o), f = i.axis, b = r.axis, { spanGaps: g, segment: y } = this.options, v = Wn(g) ? g : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || s || o === "none", x = n + a, k = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let $ = 0; $ < k; ++$) {
      const S = t[$], M = p ? S : {};
      if ($ < n || $ >= x) {
        M.skip = !0;
        continue;
      }
      const V = this.getParsed($), H = Pe(V[b]), B = M[f] = i.getPixelForValue(V[f], $), T = M[b] = s || H ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, V, l) : V[b], $);
      M.skip = isNaN(B) || isNaN(T) || H, M.stop = $ > 0 && Math.abs(V[f] - w[f]) > v, y && (M.parsed = V, M.raw = c.data[$]), h && (M.options = d || this.resolveDataElementOptions($, S.active ? "active" : o)), p || this.updateElement(S, $, M, o), w = V;
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
          const f = c(s, t, n - h), b = c(s, t, n + h);
          return {
            lo: f.lo,
            hi: b.hi
          };
        }
      }
    } else {
      const d = c(s, t, n);
      if (l) {
        const { vScale: h } = o._cachedMeta, { _parsed: f } = e, b = f.slice(0, d.lo + 1).reverse().findIndex((y) => !Pe(y[h.axis]));
        d.lo -= Math.max(0, b);
        const g = f.slice(d.hi).findIndex((y) => !Pe(y[h.axis]));
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
    for (let b = h; b <= f; ++b) {
      const g = d[b];
      g.skip || a(g, c, b);
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
    const b = d.inRange(t.x, t.y, o);
    if (a && !b)
      return;
    const g = d.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(g)) && !b)
      return;
    const v = r(t, g);
    v < l ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: f
      }
    ], l = v) : v === l && i.push({
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
const Ri = [
  "left",
  "top",
  "right",
  "bottom"
];
function Sn(e, t) {
  return e.filter((n) => n.pos === t);
}
function cs(e, t) {
  return e.filter((n) => Ri.indexOf(n.pos) === -1 && n.box.axis === t);
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
    if (!a || !Ri.includes(o))
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
function En(e, t, n, a) {
  const o = [];
  let s, i, r, l, c, d;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    r = e[s], l = r.box, l.update(r.width || t.w, r.height || t.h, vd(r.horizontal, t));
    const { same: h, other: f } = md(t, n, r, a);
    c |= h && o.length, d = d || f, l.fullSize || o.push(r);
  }
  return c && En(o, t, n, a) || d;
}
function sa(e, t, n, a, o) {
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
      Hn(c.start) && (i = c.start), l.fullSize ? sa(l, o.left, i, n.outerWidth - o.right - o.left, f) : sa(l, t.left + c.placed, i, h, f), c.start = i, c.placed += h, i = l.bottom;
    } else {
      const h = t.h * d, f = c.size || l.width;
      Hn(c.start) && (s = c.start), l.fullSize ? sa(l, s, o.top, f, n.outerHeight - o.bottom - o.top) : sa(l, s, t.top + c.placed, f, h), c.start = s, c.placed += h, s = l.right;
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
    Ee(e.boxes, (y) => {
      typeof y.beforeLayout == "function" && y.beforeLayout();
    });
    const d = l.reduce((y, v) => v.box.options && v.box.options.display === !1 ? y : y + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / d,
      hBoxMaxHeight: i / 2
    }), f = Object.assign({}, o);
    Ii(f, bt(a));
    const b = Object.assign({
      maxPadding: f,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), g = gd(l.concat(c), h);
    En(r.fullSize, b, h, g), En(l, b, h, g), En(c, b, h, g) && En(l, b, h, g), bd(b), us(r.leftAndTop, b, h, g), b.x += b.w, b.y += b.h, us(r.rightAndBottom, b, h, g), e.chartArea = {
      left: b.left,
      top: b.top,
      right: b.left + b.w,
      bottom: b.top + b.h,
      height: b.h,
      width: b.w
    }, Ee(r.chartArea, (y) => {
      const v = y.box;
      Object.assign(v, e.chartArea), v.update(b.w, b.h, {
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
const fa = "$chartjs", xd = {
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
  if (e[fa] = {
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
function xa(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function $d(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || xa(r.addedNodes, a), i = i && !xa(r.removedNodes, a);
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
      i = i || xa(r.removedNodes, a), i = i && !xa(r.addedNodes, a);
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
    if (!n[fa])
      return !1;
    const a = n[fa].initial;
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
    }), n.width = n.width, delete n[fa], !0;
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
  const n = e.options.ticks, a = Ed(e), o = Math.min(n.maxTicksLimit || a, a), s = n.major.enabled ? Id(t) : [], i = s.length, r = s[0], l = s[i - 1], c = [];
  if (i > o)
    return Fd(t, c, s, i / o), c;
  const d = Rd(s, t, o);
  if (i > 0) {
    let h, f;
    const b = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (ia(t, c, d, Pe(b) ? 0 : r - b, r), h = 0, f = i - 1; h < f; h++)
      ia(t, c, d, s[h], s[h + 1]);
    return ia(t, c, d, l, Pe(b) ? t.length : l + b), c;
  }
  return ia(t, c, d), c;
}
function Ed(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), o = e._maxLength / n;
  return Math.floor(Math.min(a, o));
}
function Rd(e, t, n) {
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
function ia(e, t, n, a, o) {
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
  Ee(e, (n) => {
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
  let h = 0, f, b, g;
  const y = i - o, v = r - s;
  if (e.isHorizontal()) {
    if (b = Qe(a, s, r), Te(n)) {
      const p = Object.keys(n)[0], x = n[p];
      g = d[p].getPixelForValue(x) + y - t;
    } else n === "center" ? g = (c.bottom + c.top) / 2 + y - t : g = gs(e, n, t);
    f = r - s;
  } else {
    if (Te(n)) {
      const p = Object.keys(n)[0], x = n[p];
      b = d[p].getPixelForValue(x) - v + t;
    } else n === "center" ? b = (c.left + c.right) / 2 - v + t : b = gs(e, n, t);
    g = Qe(a, i, o), h = n === "left" ? -Xe : Xe;
  }
  return {
    titleX: b,
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
    const d = this._getLabelSizes(), h = d.widest.width, f = d.highest.height, b = et(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / a : b / (a - 1), h + 6 > r && (r = b / (a - (t.offset ? 0.5 : 1)), l = this.maxHeight - Dn(t.grid) - n.padding - bs(t.title, this.chart.options.font), c = Math.sqrt(h * h + f * f), i = vl(Math.min(Math.asin(et((d.highest.height + 6) / r, -1, 1)), Math.asin(et(l / c, -1, 1)) - Math.asin(et(f / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
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
        const { first: c, last: d, widest: h, highest: f } = this._getLabelSizes(), b = a.padding * 2, g = Rt(this.labelRotation), y = Math.cos(g), v = Math.sin(g);
        if (r) {
          const p = a.mirror ? 0 : v * h.width + y * f.height;
          t.height = Math.min(this.maxHeight, t.height + p + b);
        } else {
          const p = a.mirror ? 0 : y * h.width + v * f.height;
          t.width = Math.min(this.maxWidth, t.width + p + b);
        }
        this._calculatePadding(c, d, v, y);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, o) {
    const { ticks: { align: s, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, b = 0;
      l ? c ? (f = o * t.width, b = a * n.height) : (f = a * t.height, b = o * n.width) : s === "start" ? b = n.width : s === "end" ? f = t.width : s !== "inner" && (f = t.width / 2, b = n.width / 2), this.paddingLeft = Math.max((f - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((b - h + i) * this.width / (this.width - h), 0);
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
    let c = 0, d = 0, h, f, b, g, y, v, p, x, k, w, $;
    for (h = 0; h < n; h += l) {
      if (g = t[h].label, y = this._resolveTickFontOptions(h), o.font = v = y.string, p = s[v] = s[v] || {
        data: {},
        gc: []
      }, x = y.lineHeight, k = w = 0, !Pe(g) && !qe(g))
        k = Wo(o, p.data, p.gc, k, g), w = x;
      else if (qe(g))
        for (f = 0, b = g.length; f < b; ++f)
          $ = g[f], !Pe($) && !qe($) && (k = Wo(o, p.data, p.gc, k, $), w += x);
      i.push(k), r.push(w), c = Math.max(k, c), d = Math.max(w, d);
    }
    Nd(s, n);
    const S = i.indexOf(c), M = r.indexOf(d), V = (H) => ({
      width: i[H] || 0,
      height: r[H] || 0
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
    const t = this.options.ticks, n = Rt(this.labelRotation), a = Math.abs(Math.cos(n)), o = Math.abs(Math.sin(n)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = s ? s.widest.width + i : 0, l = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? l * a > r * o ? r / a : l / o : l * o < r * a ? l / a : r / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, o = this.options, { grid: s, position: i, border: r } = o, l = s.offset, c = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), f = Dn(s), b = [], g = r.setContext(this.getContext()), y = g.display ? g.width : 0, v = y / 2, p = function(Q) {
      return an(a, Q, y);
    };
    let x, k, w, $, S, M, V, H, B, T, D, L;
    if (i === "top")
      x = p(this.bottom), M = this.bottom - f, H = x - v, T = p(t.top) + v, L = t.bottom;
    else if (i === "bottom")
      x = p(this.top), T = t.top, L = p(t.bottom) - v, M = x + v, H = this.top + f;
    else if (i === "left")
      x = p(this.right), S = this.right - f, V = x - v, B = p(t.left) + v, D = t.right;
    else if (i === "right")
      x = p(this.left), B = t.left, D = p(t.right) - v, S = x + v, V = this.left + f;
    else if (n === "x") {
      if (i === "center")
        x = p((t.top + t.bottom) / 2 + 0.5);
      else if (Te(i)) {
        const Q = Object.keys(i)[0], ne = i[Q];
        x = p(this.chart.scales[Q].getPixelForValue(ne));
      }
      T = t.top, L = t.bottom, M = x + v, H = M + f;
    } else if (n === "y") {
      if (i === "center")
        x = p((t.left + t.right) / 2);
      else if (Te(i)) {
        const Q = Object.keys(i)[0], ne = i[Q];
        x = p(this.chart.scales[Q].getPixelForValue(ne));
      }
      S = x - v, V = S - f, B = t.left, D = t.right;
    }
    const I = $e(o.ticks.maxTicksLimit, h), G = Math.max(1, Math.ceil(h / I));
    for (k = 0; k < h; k += G) {
      const Q = this.getContext(k), ne = s.setContext(Q), re = r.setContext(Q), ge = ne.lineWidth, q = ne.color, P = re.dash || [], j = re.dashOffset, K = ne.tickWidth, ce = ne.tickColor, ve = ne.tickBorderDash || [], De = ne.tickBorderDashOffset;
      w = zd(this, k, l), w !== void 0 && ($ = an(a, w, ge), c ? S = V = B = D = $ : M = H = T = L = $, b.push({
        tx1: S,
        ty1: M,
        tx2: V,
        ty2: H,
        x1: B,
        y1: T,
        x2: D,
        y2: L,
        width: ge,
        color: q,
        borderDash: P,
        borderDashOffset: j,
        tickWidth: K,
        tickColor: ce,
        tickBorderDash: ve,
        tickBorderDashOffset: De
      }));
    }
    return this._ticksLength = h, this._borderValue = x, b;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: o, ticks: s } = a, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: d, mirror: h } = s, f = Dn(a.grid), b = f + d, g = h ? -d : b, y = -Rt(this.labelRotation), v = [];
    let p, x, k, w, $, S, M, V, H, B, T, D, L = "middle";
    if (o === "top")
      S = this.bottom - g, M = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      S = this.top + g, M = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const G = this._getYAxisLabelAlignment(f);
      M = G.textAlign, $ = G.x;
    } else if (o === "right") {
      const G = this._getYAxisLabelAlignment(f);
      M = G.textAlign, $ = G.x;
    } else if (n === "x") {
      if (o === "center")
        S = (t.top + t.bottom) / 2 + b;
      else if (Te(o)) {
        const G = Object.keys(o)[0], Q = o[G];
        S = this.chart.scales[G].getPixelForValue(Q) + b;
      }
      M = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - b;
      else if (Te(o)) {
        const G = Object.keys(o)[0], Q = o[G];
        $ = this.chart.scales[G].getPixelForValue(Q);
      }
      M = this._getYAxisLabelAlignment(f).textAlign;
    }
    n === "y" && (l === "start" ? L = "top" : l === "end" && (L = "bottom"));
    const I = this._getLabelSizes();
    for (p = 0, x = r.length; p < x; ++p) {
      k = r[p], w = k.label;
      const G = s.setContext(this.getContext(p));
      V = this.getPixelForTick(p) + s.labelOffset, H = this._resolveTickFontOptions(p), B = H.lineHeight, T = qe(w) ? w.length : 1;
      const Q = T / 2, ne = G.color, re = G.textStrokeColor, ge = G.textStrokeWidth;
      let q = M;
      i ? ($ = V, M === "inner" && (p === x - 1 ? q = this.options.reverse ? "left" : "right" : p === 0 ? q = this.options.reverse ? "right" : "left" : q = "center"), o === "top" ? c === "near" || y !== 0 ? D = -T * B + B / 2 : c === "center" ? D = -I.highest.height / 2 - Q * B + B : D = -I.highest.height + B / 2 : c === "near" || y !== 0 ? D = B / 2 : c === "center" ? D = I.highest.height / 2 - Q * B : D = I.highest.height - T * B, h && (D *= -1), y !== 0 && !G.showLabelBackdrop && ($ += B / 2 * Math.sin(y))) : (S = V, D = (1 - T) * B / 2);
      let P;
      if (G.showLabelBackdrop) {
        const j = bt(G.backdropPadding), K = I.heights[p], ce = I.widths[p];
        let ve = D - j.top, De = 0 - j.left;
        switch (L) {
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
            p === x - 1 ? De -= ce : p > 0 && (De -= ce / 2);
            break;
        }
        P = {
          left: De,
          top: ve,
          width: ce + j.width,
          height: K + j.height,
          color: G.backdropColor
        };
      }
      v.push({
        label: w,
        font: H,
        textOffset: D,
        options: {
          rotation: y,
          color: ne,
          strokeColor: re,
          strokeWidth: ge,
          textAlign: q,
          textBaseline: L,
          translation: [
            $,
            S
          ],
          backdrop: P
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Rt(this.labelRotation))
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
class ra {
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
    this.controllers = new ra(Sa, "datasets", !0), this.elements = new ra(Ft, "elements"), this.plugins = new ra(Object, "plugins"), this.scales = new ra(Cn, "scales"), this._typedRegistries = [
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
      a || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Ee(o, (i) => {
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
      const f = tu(h, l), b = i[f + "AxisID"] || f;
      s[b] = s[b] || /* @__PURE__ */ Object.create(null), In(s[b], [
        {
          axis: f
        },
        a[b],
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
function la(e, t) {
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
    return la(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return la(`${t}.transition.${n}`, () => [
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
    return la(`${t}-${n}`, () => [
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
    return la(`${a}-plugin-${n}`, () => [
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
const ga = {}, $s = (e) => {
  const t = Hi(e);
  return Object.values(ga).filter((n) => n.canvas === t).pop();
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
  static instances = ga;
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
    if (this.id = sl(), this.ctx = r, this.canvas = l, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Gd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Cl((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], ga[this.id] = this, !r || !l) {
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
    Ee(n, (a, o) => {
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
    }))), Ee(s, (i) => {
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
    }), Ee(o, (i, r) => {
      i || delete a[r];
    }), Ee(a, (i) => {
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
    Ee(this.data.datasets, (t, n) => {
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
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), o || Ee(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(ws("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    Ee(this.scales, (t) => {
      pt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Ro(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
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
      if (!Ro(o, a(s)))
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
    this._layers = [], Ee(this.boxes, (o) => {
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
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ko(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete ga[this.id], this.notifyPlugins("afterDestroy");
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
    Ee(this.options.events, (s) => a(s, o));
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
    Ee(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Ee(this._responsiveListeners, (t, n) => {
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
    !pa(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
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
    const d = !pa(r, o);
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
  return Ee(Zt.instances, (e) => e._plugins.invalidate());
}
function pu(e, t, n) {
  const { startAngle: a, x: o, y: s, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: d } = l, h = Math.min(c / i, yt(a - n));
  if (e.beginPath(), e.arc(o, s, i - c / 2, a + h / 2, n - h / 2), r > 0) {
    const f = Math.min(c / r, yt(a - n));
    e.arc(o, s, r + c / 2, n - f / 2, a + f / 2, !0);
  } else {
    const f = Math.min(c / 2, i * yt(a - n));
    if (d === "round")
      e.arc(o, s, f, n - Re / 2, a + Re / 2, !0);
    else if (d === "bevel") {
      const b = 2 * f * f, g = -b * Math.cos(n + Re / 2) + o, y = -b * Math.sin(n + Re / 2) + s, v = b * Math.cos(a + Re / 2) + o, p = b * Math.sin(a + Re / 2) + s;
      e.lineTo(g, y), e.lineTo(v, p);
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
function _a(e, t, n, a, o, s) {
  const { x: i, y: r, startAngle: l, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), f = d > 0 ? d + a + n + c : 0;
  let b = 0;
  const g = o - l;
  if (a) {
    const G = d > 0 ? d - a : 0, Q = h > 0 ? h - a : 0, ne = (G + Q) / 2, re = ne !== 0 ? g * ne / (ne + a) : g;
    b = (g - re) / 2;
  }
  const y = Math.max(1e-3, g * h - n / Re) / h, v = (g - y) / 2, p = l + v + b, x = o - v - b, { outerStart: k, outerEnd: w, innerStart: $, innerEnd: S } = vu(t, f, h, x - p), M = h - k, V = h - w, H = p + k / M, B = x - w / V, T = f + $, D = f + S, L = p + $ / T, I = x - S / D;
  if (e.beginPath(), s) {
    const G = (H + B) / 2;
    if (e.arc(i, r, h, H, G), e.arc(i, r, h, G, B), w > 0) {
      const ge = vn(V, B, i, r);
      e.arc(ge.x, ge.y, w, B, x + Xe);
    }
    const Q = vn(D, x, i, r);
    if (e.lineTo(Q.x, Q.y), S > 0) {
      const ge = vn(D, I, i, r);
      e.arc(ge.x, ge.y, S, x + Xe, I + Math.PI);
    }
    const ne = (x - S / f + (p + $ / f)) / 2;
    if (e.arc(i, r, f, x - S / f, ne, !0), e.arc(i, r, f, ne, p + $ / f, !0), $ > 0) {
      const ge = vn(T, L, i, r);
      e.arc(ge.x, ge.y, $, L + Math.PI, p - Xe);
    }
    const re = vn(M, p, i, r);
    if (e.lineTo(re.x, re.y), k > 0) {
      const ge = vn(M, H, i, r);
      e.arc(ge.x, ge.y, k, p - Xe, H);
    }
  } else {
    e.moveTo(i, r);
    const G = Math.cos(H) * h + i, Q = Math.sin(H) * h + r;
    e.lineTo(G, Q);
    const ne = Math.cos(B) * h + i, re = Math.sin(B) * h + r;
    e.lineTo(ne, re);
  }
  e.closePath();
}
function yu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (s) {
    _a(e, t, n, a, l, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(r) || (l = i + (r % He || He));
  }
  return _a(e, t, n, a, l, o), e.fill(), l;
}
function xu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: f, borderRadius: b } = l, g = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let y = t.endAngle;
  if (s) {
    _a(e, t, n, a, y, o);
    for (let v = 0; v < s; ++v)
      e.stroke();
    isNaN(r) || (y = i + (r % He || He));
  }
  g && mu(e, t, y), l.selfJoin && y - i >= Re && b === 0 && d !== "miter" && pu(e, t, y), s || (_a(e, t, n, a, y, o), e.stroke());
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
    ], a), f = (this.options.spacing + this.options.borderWidth) / 2, b = $e(h, l - r), g = Kn(s, r, l) && r !== l, y = b >= He || g, v = Nt(i, c + f, d + f);
    return y && v;
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
    const l = 1 - Math.sin(Math.min(Re, a || 0)), c = o * l;
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
  let { move: h = !0, reverse: f } = a || {}, b, g, y;
  for (b = 0; b <= c; ++b)
    g = o[(r + (f ? c - b : b)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : d(e, y, g, f, s.stepped), y = g);
  return l && (g = o[(r + (f ? c : 0)) % i], d(e, y, g, f, s.stepped)), !!l;
}
function $u(e, t, n, a) {
  const o = t.points, { count: s, start: i, ilen: r } = Ki(o, n, a), { move: l = !0, reverse: c } = a || {};
  let d = 0, h = 0, f, b, g, y, v, p;
  const x = (w) => (i + (c ? r - w : w)) % s, k = () => {
    y !== v && (e.lineTo(d, v), e.lineTo(d, y), e.lineTo(d, p));
  };
  for (l && (b = o[x(0)], e.moveTo(b.x, b.y)), f = 0; f <= r; ++f) {
    if (b = o[x(f)], b.skip)
      continue;
    const w = b.x, $ = b.y, S = w | 0;
    S === g ? ($ < y ? y = $ : $ > v && (v = $), d = (h * d + w) / ++h) : (k(), e.lineTo(w, $), g = S, h = 0, y = v = $), p = $;
  }
  k();
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
      const { start: h, end: f } = i[c], b = s[h], g = s[f];
      if (b === g) {
        r.push(b);
        continue;
      }
      const y = Math.abs((o - b[n]) / (g[n] - b[n])), v = l(b, g, y, a.stepped);
      v[n] = t[n], r.push(v);
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
function Eu(e, t, n) {
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
function Ru(e) {
  const t = Yi(e), n = t.right - t.left, a = t.bottom - t.top, o = Pu(e, n / 2, a / 2), s = Eu(e, n / 2, a / 2);
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: o } } = this, { inner: s, outer: i } = Ru(this), r = Iu(i.radius) ? va : Fu;
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
    let f = -1, b = -d;
    return this.legendItems.forEach((g, y) => {
      const v = a + n / 2 + s.measureText(g.text).width;
      (y === 0 || c[c.length - 1] + v + 2 * r > i) && (h += d, c[c.length - (y > 0 ? 0 : 1)] = 0, b += d, f++), l[y] = {
        left: 0,
        top: b,
        row: f,
        width: v,
        height: o
      }, c[c.length - 1] += v + r;
    }), h;
  }
  _fitCols(t, n, a, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = r, f = 0, b = 0, g = 0, y = 0;
    return this.legendItems.forEach((v, p) => {
      const { itemWidth: x, itemHeight: k } = zu(a, n, s, v, o);
      p > 0 && b + k + 2 * r > d && (h += f + r, c.push({
        width: f,
        height: b
      }), g += f + r, y++, f = b = 0), l[p] = {
        left: g,
        top: b,
        col: y,
        width: x,
        height: k
      }, f = Math.max(f, x), b += k + r;
    }), h += f, c.push({
      width: f,
      height: b
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
    let b;
    this.drawTitle(), o.textAlign = l.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: g, boxHeight: y, itemHeight: v } = Ds(i, h), p = function(S, M, V) {
      if (isNaN(g) || g <= 0 || isNaN(y) || y < 0)
        return;
      o.save();
      const H = $e(V.lineWidth, 1);
      if (o.fillStyle = $e(V.fillStyle, r), o.lineCap = $e(V.lineCap, "butt"), o.lineDashOffset = $e(V.lineDashOffset, 0), o.lineJoin = $e(V.lineJoin, "miter"), o.lineWidth = H, o.strokeStyle = $e(V.strokeStyle, r), o.setLineDash($e(V.lineDash, [])), i.usePointStyle) {
        const B = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: V.pointStyle,
          rotation: V.rotation,
          borderWidth: H
        }, T = l.xPlus(S, g / 2), D = M + f;
        ki(o, B, T, D, i.pointStyleWidth && g);
      } else {
        const B = M + Math.max((h - y) / 2, 0), T = l.leftForLtr(S, g), D = xn(V.borderRadius);
        o.beginPath(), Object.values(D).some((L) => L !== 0) ? va(o, {
          x: T,
          y: B,
          w: g,
          h: y,
          radius: D
        }) : o.rect(T, B, g, y), o.fill(), H !== 0 && o.stroke();
      }
      o.restore();
    }, x = function(S, M, V) {
      Un(o, V.text, S, M + v / 2, c, {
        strikethrough: V.hidden,
        textAlign: l.textAlign(V.textAlign)
      });
    }, k = this.isHorizontal(), w = this._computeTitleHeight();
    k ? b = {
      x: Qe(s, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : b = {
      x: this.left + d,
      y: Qe(s, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, Ai(this.ctx, t.textDirection);
    const $ = v + d;
    this.legendItems.forEach((S, M) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const V = o.measureText(S.text).width, H = l.textAlign(S.textAlign || (S.textAlign = i.textAlign)), B = g + f + V;
      let T = b.x, D = b.y;
      l.setWidth(this.width), k ? M > 0 && T + B + d > this.right && (D = b.y += $, b.line++, T = b.x = Qe(s, this.left + d, this.right - a[b.line])) : M > 0 && D + $ > this.bottom && (T = b.x = T + n[b.line].width + d, b.line++, D = b.y = Qe(s, this.top + w + d, this.bottom - n[b.line].height));
      const L = l.x(T);
      if (p(L, D, S), T = $l(H, T + g + f, k ? T + B : this.right, t.rtl), x(l.x(T), D, S), k)
        b.x += B + d;
      else if (typeof S.text != "string") {
        const I = c.lineHeight;
        b.y += Ui(S, I) + d;
      } else
        b.y += $;
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
      const g = this.columnSizes.reduce((y, v) => Math.max(y, v.height), 0);
      d = c + Qe(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const b = Qe(r, h, h + f);
    i.textAlign = s.textAlign(io(r)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Un(i, n.text, b, d, a);
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
    return this.isHorizontal() ? (d = Qe(r, a, s), h = n + t, c = s - a) : (i.position === "left" ? (d = a + t, h = Qe(r, o, n), l = Re * -0.5) : (d = s - t, h = Qe(r, n, o), l = Re * 0.5), c = o - n), {
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
const Rn = {
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
  const n = e.chart.ctx, { body: a, footer: o, title: s } = e, { boxWidth: i, boxHeight: r } = t, l = tt(t.bodyFont), c = tt(t.titleFont), d = tt(t.footerFont), h = s.length, f = o.length, b = a.length, g = bt(t.padding);
  let y = g.height, v = 0, p = a.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, h && (y += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const w = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    y += b * w + (p - b) * l.lineHeight + (p - 1) * t.bodySpacing;
  }
  f && (y += t.footerMarginTop + f * d.lineHeight + (f - 1) * t.footerSpacing);
  let x = 0;
  const k = function(w) {
    v = Math.max(v, n.measureText(w).width + x);
  };
  return n.save(), n.font = c.string, Ee(e.title, k), n.font = l.string, Ee(e.beforeBody.concat(e.afterBody), k), x = t.displayColors ? i + 2 + t.boxPadding : 0, Ee(a, (w) => {
    Ee(w.before, k), Ee(w.lines, k), Ee(w.after, k);
  }), x = 0, n.font = d.string, Ee(e.footer, k), n.restore(), v += g.width, {
    width: v,
    height: y
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
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: r, yAlign: l } = n, c = o + s, { topLeft: d, topRight: h, bottomLeft: f, bottomRight: b } = xn(i);
  let g = Xu(t, r);
  const y = Gu(t, l, c);
  return l === "center" ? r === "left" ? g += c : r === "right" && (g -= c) : r === "left" ? g -= Math.max(d, f) + o : r === "right" && (g += Math.max(h, b) + o), {
    x: et(g, 0, a.width - t.width),
    y: et(y, 0, a.height - t.height)
  };
}
function ca(e, t, n) {
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
function Es(e, t) {
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
class Rs extends Ft {
  static positioners = Rn;
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
    return Ee(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = Es(a, s);
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
    return t.filter && (r = r.filter((d, h, f) => t.filter(d, h, f, a))), t.itemSort && (r = r.sort((d, h) => t.itemSort(d, h, a))), Ee(r, (d) => {
      const h = Es(t.callbacks, d);
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
      const r = Rn[a.position].call(this, o, this._eventPosition);
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: r } = a, { topLeft: l, topRight: c, bottomLeft: d, bottomRight: h } = xn(r), { x: f, y: b } = t, { width: g, height: y } = n;
    let v, p, x, k, w, $;
    return s === "center" ? (w = b + y / 2, o === "left" ? (v = f, p = v - i, k = w + i, $ = w - i) : (v = f + g, p = v + i, k = w - i, $ = w + i), x = v) : (o === "left" ? p = f + Math.max(l, d) + i : o === "right" ? p = f + g - Math.max(c, h) - i : p = this.caretX, s === "top" ? (k = b, w = k - i, v = p - i, x = p + i) : (k = b + y, w = k + i, v = p + i, x = p - i), $ = k), {
      x1: v,
      x2: p,
      x3: x,
      y1: k,
      y2: w,
      y3: $
    };
  }
  drawTitle(t, n, a) {
    const o = this.title, s = o.length;
    let i, r, l;
    if (s) {
      const c = _n(a.rtl, this.x, this.width);
      for (t.x = ca(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = tt(a.titleFont), r = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, l = 0; l < s; ++l)
        n.fillText(o[l], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === s && (t.y += a.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, n, a, o, s) {
    const i = this.labelColors[a], r = this.labelPointStyles[a], { boxHeight: l, boxWidth: c } = s, d = tt(s.bodyFont), h = ca(this, "left", s), f = o.x(h), b = l < d.lineHeight ? (d.lineHeight - l) / 2 : 0, g = n.y + b;
    if (s.usePointStyle) {
      const y = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, v = o.leftForLtr(f, c) + c / 2, p = g + l / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, Ga(t, y, v, p), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ga(t, y, v, p);
    } else {
      t.lineWidth = Te(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const y = o.leftForLtr(f, c), v = o.leftForLtr(o.xPlus(f, 1), c - 2), p = xn(i.borderRadius);
      Object.values(p).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, va(t, {
        x: y,
        y: g,
        w: c,
        h: l,
        radius: p
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), va(t, {
        x: v,
        y: g + 1,
        w: c - 2,
        h: l - 2,
        radius: p
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(y, g, c, l), t.strokeRect(y, g, c, l), t.fillStyle = i.backgroundColor, t.fillRect(v, g + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: d } = a, h = tt(a.bodyFont);
    let f = h.lineHeight, b = 0;
    const g = _n(a.rtl, this.x, this.width), y = function(V) {
      n.fillText(V, g.x(t.x + b), t.y + f / 2), t.y += f + s;
    }, v = g.textAlign(i);
    let p, x, k, w, $, S, M;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = ca(this, v, a), n.fillStyle = a.bodyColor, Ee(this.beforeBody, y), b = r && v !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, S = o.length; w < S; ++w) {
      for (p = o[w], x = this.labelTextColors[w], n.fillStyle = x, Ee(p.before, y), k = p.lines, r && k.length && (this._drawColorBox(n, t, w, g, a), f = Math.max(h.lineHeight, l)), $ = 0, M = k.length; $ < M; ++$)
        y(k[$]), f = h.lineHeight;
      Ee(p.after, y);
    }
    b = 0, f = h.lineHeight, Ee(this.afterBody, y), t.y -= s;
  }
  drawFooter(t, n, a) {
    const o = this.footer, s = o.length;
    let i, r;
    if (s) {
      const l = _n(a.rtl, this.x, this.width);
      for (t.x = ca(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = l.textAlign(a.footerAlign), n.textBaseline = "middle", i = tt(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, r = 0; r < s; ++r)
        n.fillText(o[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, o) {
    const { xAlign: s, yAlign: i } = this, { x: r, y: l } = t, { width: c, height: d } = a, { topLeft: h, topRight: f, bottomLeft: b, bottomRight: g } = xn(o.cornerRadius);
    n.fillStyle = o.backgroundColor, n.strokeStyle = o.borderColor, n.lineWidth = o.borderWidth, n.beginPath(), n.moveTo(r + h, l), i === "top" && this.drawCaret(t, n, a, o), n.lineTo(r + c - f, l), n.quadraticCurveTo(r + c, l, r + c, l + f), i === "center" && s === "right" && this.drawCaret(t, n, a, o), n.lineTo(r + c, l + d - g), n.quadraticCurveTo(r + c, l + d, r + c - g, l + d), i === "bottom" && this.drawCaret(t, n, a, o), n.lineTo(r + b, l + d), n.quadraticCurveTo(r, l + d, r, l + d - b), i === "center" && s === "left" && this.drawCaret(t, n, a, o), n.lineTo(r, l + h), n.quadraticCurveTo(r, l, r + h, l), n.closePath(), n.fill(), o.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, o = a && a.x, s = a && a.y;
    if (o || s) {
      const i = Rn[t.position].call(this, this._active, this._eventPosition);
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
    }), s = !pa(a, o), i = this._positionChanged(o, n);
    (s || i) && (this._active = o, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, n, a), r = this._positionChanged(i, t), l = n || !pa(i, s) || r;
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
    const { caretX: a, caretY: o, options: s } = this, i = Rn[s.position].call(this, t, n);
    return i !== !1 && (a !== i.x || o !== i.y);
  }
}
var xo = {
  id: "tooltip",
  _element: Rs,
  positioners: Rn,
  afterInit(e, t, n) {
    n && (e.tooltip = new Rs({
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
  const n = [], { bounds: o, step: s, min: i, max: r, precision: l, count: c, maxTicks: d, maxDigits: h, includeBounds: f } = e, b = s || 1, g = d - 1, { min: y, max: v } = t, p = !Pe(i), x = !Pe(r), k = !Pe(c), w = (v - y) / (h + 1);
  let $ = Fo((v - y) / g / b) * b, S, M, V, H;
  if ($ < 1e-14 && !p && !x)
    return [
      {
        value: y
      },
      {
        value: v
      }
    ];
  H = Math.ceil(v / $) - Math.floor(y / $), H > g && ($ = Fo(H * $ / g / b) * b), Pe(l) || (S = Math.pow(10, l), $ = Math.ceil($ * S) / S), o === "ticks" ? (M = Math.floor(y / $) * $, V = Math.ceil(v / $) * $) : (M = y, V = v), p && x && s && ml((r - i) / s, $ / 1e3) ? (H = Math.round(Math.min((r - i) / $, d)), $ = (r - i) / H, M = i, V = r) : k ? (M = p ? i : M, V = x ? r : V, H = c - 1, $ = (V - M) / H) : (H = (V - M) / $, Fn(H, Math.round(H), $ / 1e3) ? H = Math.round(H) : H = Math.ceil(H));
  const B = Math.max(Oo($), Oo(M));
  S = Math.pow(10, Pe(l) ? B : l), M = Math.round(M * S) / S, V = Math.round(V * S) / S;
  let T = 0;
  for (p && (f && M !== i ? (n.push({
    value: i
  }), M < i && T++, Fn(Math.round((M + T * $) * S) / S, i, Fs(i, w, e)) && T++) : M < i && T++); T < H; ++T) {
    const D = Math.round((M + T * $) * S) / S;
    if (x && D > r)
      break;
    n.push({
      value: D
    });
  }
  return x && f && V !== r ? n.length && Fn(n[n.length - 1].value, r, Fs(r, w, e)) ? n[n.length - 1].value = r : n.push({
    value: r
  }) : (!x || V === r) && n.push({
    value: V
  }), n;
}
function Fs(e, t, { horizontal: n, minRotation: a }) {
  const o = Rt(a), s = (n ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
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
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = Rt(this.options.ticks.minRotation), o = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, s = this._resolveTickFontOptions(0);
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
    let h = n, f, b;
    if (c && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * r)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + r + " " + i);
    const g = o.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, b = 0; f < a; f = +t.add(f, r, i), b++)
      Ns(d, f, g);
    return (f === a || o.bounds === "ticks" || b === 1) && Ns(d, f, g), Object.keys(d).sort(Os).map((y) => +y);
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
    const r = s.time.displayFormats, l = this._unit, c = this._majorUnit, d = l && r[l], h = c && r[c], f = a[n], b = c && h && f && f.major;
    return this._adapter.format(t, o || (b ? h : d));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, o = Rt(this.isHorizontal() ? n.maxRotation : n.minRotation), s = Math.cos(o), i = Math.sin(o), r = this._resolveTickFontOptions(0).size;
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
function da(e, t, n) {
  let a = 0, o = e.length - 1, s, i, r, l;
  n ? (t >= e[a].pos && t <= e[o].pos && ({ lo: a, hi: o } = cn(e, "pos", t)), { pos: s, time: r } = e[a], { pos: i, time: l } = e[o]) : (t >= e[a].time && t <= e[o].time && ({ lo: a, hi: o } = cn(e, "time", t)), { time: s, pos: r } = e[a], { time: i, pos: l } = e[o]);
  const c = i - s;
  return c ? r + (l - r) * (t - s) / c : r;
}
class yS extends Hs {
  static id = "timeseries";
  static defaults = Hs.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = da(n, this.min), this._tableRange = da(n, this.max) - this._minPos, super.initOffsets(t);
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
    return (da(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return da(this._table, a * this._tableRange + this._minPos, !0);
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
const hh = ie({
  props: rh,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const o = ae(null), s = si(null);
    n({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: d, options: h, plugins: f, datasetIdKey: b } = e, g = uh(d, b), y = ch(g, d);
      s.value = new Zt(o.value, {
        type: c,
        data: y,
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
      let [h, f] = c, [b, g] = d;
      const y = Ya(s.value);
      if (!y)
        return;
      let v = !1;
      if (h) {
        const p = yn(h), x = yn(b);
        p && p !== x && (dh(y, p), v = !0);
      }
      if (f) {
        const p = yn(f.labels), x = yn(g.labels), k = yn(f.datasets), w = yn(g.datasets);
        p !== x && (er(y.config.data, p), v = !0), k && k !== w && (tr(y.config.data, k, e.datasetIdKey), v = !0);
      }
      v && je(() => {
        l(y);
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
  return Zt.register(t), ie({
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
const ka = 5, ko = 8, bh = /^x\d*$/, vh = /^y\d*$/;
function nr(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const o of Object.keys(a)) {
    const s = a[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, r = i.ticks, l = r && typeof r == "object" ? { ...r } : {};
    if (bh.test(o) && (l.maxTicksLimit = ko, l.autoSkip = !0, l.minRotation = 0, l.maxRotation = 0, l.autoSkipPadding = l.autoSkipPadding ?? 8), vh.test(o))
      if (Array.isArray(l.values) && l.values.length > 0)
        l.maxTicksLimit = l.values.length;
      else if (l.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), d = Number(i.max ?? i.suggestedMax ?? 0), h = Number(l.stepSize);
        d > c && h > 0 ? l.maxTicksLimit = Math.floor((d - c) / h) + 1 : l.maxTicksLimit = ka;
      } else
        l.maxTicksLimit = ka;
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
const xh = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ys = 10, _h = /* @__PURE__ */ ie({
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
    Zt.register(Zi, Qi, Ou, Xi, xo, yo), Zt.defaults.font.family = st;
    const { isDark: a, colors: o } = Me(Se(n, "theme")), s = C(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, r = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
    function l(d, h) {
      if (h == null) return d;
      if (Array.isArray(h) || typeof h != "object" || d == null || Array.isArray(d) || typeof d != "object") return h;
      const f = { ...d };
      for (const b of Object.keys(h)) {
        const g = h[b];
        g !== void 0 && (f[b] = l(d[b], g));
      }
      return f;
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
              boxWidth: Ys,
              boxHeight: Ys,
              usePointStyle: !1,
              generateLabels: function(f) {
                return f.data.datasets.map((g, y) => {
                  const v = Array.isArray(g.backgroundColor) ? g.backgroundColor[0] : g.backgroundColor, p = Array.isArray(g.borderColor) ? g.borderColor[0] : g.borderColor, x = typeof p == "string" && p.length > 0 ? p : typeof v == "string" && v.length > 0 ? v : o.value.textSecondary;
                  return {
                    text: r(g.label || ""),
                    fillStyle: typeof v == "string" ? v : x,
                    strokeStyle: x,
                    lineWidth: 0,
                    fontColor: x,
                    hidden: !f.isDatasetVisible(y),
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
              title: function(f) {
                return f.length > 0 ? String(i(f[0].label)) : "";
              },
              label: function(f) {
                let b = String(i(f.dataset.label || ""));
                return b && (b += ": "), f.parsed.y !== null && (b += f.parsed.y), b;
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
              maxTicksLimit: ka,
              font: {
                family: st,
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
              callback: function(f) {
                const b = this.getLabelForValue(f);
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
      }, h = n.options ? l(d, n.options) : d;
      return ar(
        nr(h)
      );
    });
    return t({ isDark: a }), (d, h) => (m(), _("div", xh, [
      N(E(fh), {
        data: s.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), me = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, o] of t)
    n[a] = o;
  return n;
}, kt = /* @__PURE__ */ me(_h, [["__scopeId", "data-v-2a91c92d"]]), kh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, wh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Ch = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, $h = ["aria-pressed", "aria-label", "onClick"], Sh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, Mh = /* @__PURE__ */ ie({
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
      const v = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((p) => {
          const x = p.borderColor, k = Array.isArray(x) ? x[0] : x, w = typeof k == "string" && k.length > 0 ? k : s.value.textSecondary, $ = p.pointBackgroundColor !== void 0 ? p.pointBackgroundColor : v, S = p.pointHoverBackgroundColor !== void 0 ? p.pointHoverBackgroundColor : $, M = p.pointBorderWidth ?? 2, V = p.pointHoverBorderWidth ?? M;
          return {
            ...p,
            fill: p.fill ?? !1,
            clip: p.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: S,
            pointBorderColor: p.pointBorderColor ?? w,
            pointHoverBorderColor: p.pointHoverBorderColor ?? w,
            pointBorderWidth: M,
            pointHoverBorderWidth: V
          };
        })
      };
    }), l = (v) => typeof v == "string" ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v, c = (v) => typeof v != "string" ? v : n.uppercaseLegendLabels ? v.toUpperCase() : l(v);
    function d(v) {
      const p = v.borderColor, x = Array.isArray(p) ? p[0] : p;
      return typeof x == "string" && x.length > 0 ? x : s.value.textSecondary;
    }
    const h = C(
      () => r.value.datasets.map((v, p) => ({
        key: `${v.label ?? "dataset"}-${p}`,
        label: c(v.label || ""),
        color: d(v)
      }))
    ), f = ae([]);
    Ie(
      () => r.value.datasets.length,
      (v) => {
        const p = Array.from({ length: v }, (x, k) => f.value[k] ?? !0);
        f.value = p;
      },
      { immediate: !0 }
    );
    function b(v) {
      const x = a.value?.chart;
      if (!x || v < 0 || v >= x.data.datasets.length) return;
      const k = !x.isDatasetVisible(v);
      x.setDatasetVisibility(v, k), f.value[v] = k, x.update();
    }
    function g(v, p) {
      if (p == null) return v;
      if (Array.isArray(p) || typeof p != "object" || v == null || Array.isArray(v) || typeof v != "object") return p;
      const x = { ...v };
      for (const k of Object.keys(p)) {
        const w = p[k];
        w !== void 0 && (x[k] = g(v[k], w));
      }
      return x;
    }
    const y = C(() => {
      const v = {
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
              title: function(k) {
                return k.length > 0 ? String(l(k[0].label)) : "";
              },
              label: function(k) {
                let w = String(l(k.dataset.label || ""));
                return w && (w += ": "), k.parsed.y !== null && (w += k.parsed.y), w;
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
              maxTicksLimit: ka,
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
      }, p = n.options ? g(v, n.options) : v;
      return ar(
        nr(p)
      );
    });
    return t({ isDark: o }), (v, p) => (m(), _("div", kh, [
      u("div", wh, [
        N(E(gh), {
          ref_key: "lineChartRef",
          ref: a,
          data: r.value,
          options: y.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (m(), _("ul", Ch, [
        (m(!0), _(se, null, fe(h.value, (x, k) => (m(), _("li", {
          key: x.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: te(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", f.value[k] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: we({ color: x.color }),
            "aria-pressed": f.value[k] !== !1,
            "aria-label": `${x.label}. ${f.value[k] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => b(k)
          }, [
            u("span", Sh, [
              p[0] || (p[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: we({ borderColor: x.color })
              }, null, 4),
              p[1] || (p[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, A(x.label), 1)
          ], 14, $h)
        ]))), 128))
      ])) : z("", !0)
    ]));
  }
}), vt = /* @__PURE__ */ me(Mh, [["__scopeId", "data-v-426e23d5"]]), Dh = { class: "chart-container" }, Ah = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Th = /* @__PURE__ */ ie({
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
              family: Ah,
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
                const b = l.getDatasetMeta(0).controller.getStyle(h), y = c.datasets[0].data[h], v = typeof b.backgroundColor == "string" && b.backgroundColor.length > 0 ? b.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(d)}: ${y}`,
                  fillStyle: b.backgroundColor,
                  strokeStyle: b.borderColor,
                  lineWidth: b.borderWidth,
                  lineDash: b.borderDash,
                  lineDashOffset: b.borderDashOffset,
                  lineJoin: b.borderJoinStyle,
                  fontColor: v,
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
              const c = l.label || "", d = l.parsed || 0, h = l.dataset.data.reduce((b, g) => b + g, 0), f = (d / h * 100).toFixed(1);
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
    return t({ isDark: a }), (l, c) => (m(), _("div", Dh, [
      N(E(ph), {
        data: E(s),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Aa = /* @__PURE__ */ me(Th, [["__scopeId", "data-v-0f7806d6"]]), Bh = { class: "chart-container" }, Lh = ["viewBox"], Ph = ["transform"], Eh = ["x", "width", "fill", "stroke"], Rh = ["fill"], Ih = ["x1", "y1", "x2", "y2", "stroke"], Fh = ["points", "fill"], Oh = ["x1", "y1", "x2", "y2", "stroke"], Vh = ["x", "y", "fill"], zh = ["x1", "y1", "x2", "y2", "stroke"], Nh = ["points", "fill"], jh = ["transform"], Hh = ["y1", "y2"], Wh = ["y1", "y2"], Kh = ["y1", "y2"], Yh = ["y1", "y2"], Uh = ["y", "height"], qh = ["y1", "y2"], Xh = ["y1", "y2"], Gh = ["y1", "y2"], Zh = ["y1", "y2"], Qh = ["y", "height"], Jh = ["cy", "stroke", "onMouseenter"], ef = ["cy", "stroke", "onMouseenter"], tf = ["cy", "stroke", "onMouseenter"], nf = ["cy", "stroke", "onMouseenter"], af = ["y1", "y2", "onMouseenter"], of = ["y1", "y2", "onMouseenter"], sf = ["x", "y", "fill"], rf = ["x", "y", "fill"], lf = ["transform"], cf = { transform: "translate(-200, 0)" }, df = ["stroke"], uf = ["fill"], hf = { transform: "translate(-130, 0)" }, ff = ["stroke"], gf = ["fill"], pf = { transform: "translate(-60, 0)" }, mf = ["stroke"], bf = ["fill"], vf = { transform: "translate(10, 0)" }, yf = ["stroke"], xf = ["fill"], _f = { transform: "translate(80, 0)" }, kf = ["fill"], wf = { transform: "translate(150, 0)" }, Cf = ["fill"], $f = /* @__PURE__ */ ie({
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
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, b) => {
      const g = f.currentTarget.closest("svg");
      if (!g) return;
      const y = g.getBoundingClientRect(), v = g.createSVGPoint();
      v.x = f.clientX - y.left, v.y = f.clientY - y.top, s.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: b
      };
    }, l = (f) => {
      if (s.value.visible) {
        const b = f.currentTarget, g = b.getBoundingClientRect(), y = b.createSVGPoint();
        y.x = f.clientX - g.left, y.y = f.clientY - g.top, s.value.x = y.x, s.value.y = y.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, d = () => {
      s.value.visible = !1;
    }, h = C(() => {
      const f = [], g = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let y = 1; y <= 10; y++) {
        const v = y, p = (v - 1) / 9, x = n.chartMargin + g - p * g;
        f.push({ value: v, y: x });
      }
      return f;
    });
    return t({ isDark: a }), (f, b) => (m(), _("div", Bh, [
      (m(), _("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: we(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        s.value.visible ? (m(), _("g", {
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
          }, null, 8, Eh),
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
        ], 8, Ph)) : z("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Ih),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, Fh),
        (m(!0), _(se, null, fe(h.value, (g, y) => (m(), _(se, { key: y }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Oh),
          u("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(g.value), 9, Vh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, zh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, Nh),
        (m(!0), _(se, null, fe(e.boxplotData, (g, y) => (m(), _(se, { key: y }, [
          u("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (m(), _(se, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Hh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Wh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Kh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Yh),
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
              }, null, 8, Uh)
            ], 64)) : (m(), _(se, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, qh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Xh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Gh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Zh),
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
              }, null, 8, Qh)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Jh),
            u("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, ef),
            u("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, tf),
            u("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, nf),
            u("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (v) => r(v, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, af),
            g.averageY ? (m(), _("line", {
              key: 2,
              x1: -24,
              y1: g.averageY,
              x2: 24,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => r(v, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, of)) : z("", !0)
          ], 8, jh),
          u("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(g.label)), 9, sf),
          g.responseCount ? (m(), _("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(g.responseCount), 9, rf)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), _("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", cf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, df),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, uf)
          ]),
          u("g", hf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, ff),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, gf)
          ]),
          u("g", pf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, mf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, bf)
          ]),
          u("g", vf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, yf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, xf)
          ]),
          u("g", _f, [
            b[0] || (b[0] = u("line", {
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
            }, " Avg ", 8, kf)
          ]),
          u("g", wf, [
            b[1] || (b[1] = u("line", {
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
            }, " Median ", 8, Cf)
          ])
        ], 8, lf)) : z("", !0)
      ], 44, Lh))
    ]));
  }
}), Sf = /* @__PURE__ */ me($f, [["__scopeId", "data-v-9ac5c075"]]), Mf = { class: "chart-container" }, Df = ["viewBox"], Af = ["x1", "y1", "x2", "y2", "stroke"], Tf = ["points", "fill"], Bf = ["x1", "y1", "x2", "y2", "stroke"], Lf = ["x1", "y1", "x2", "y2", "stroke"], Pf = ["x", "y", "fill"], Ef = ["x", "y", "fill", "transform"], Rf = ["x1", "y1", "x2", "y2", "stroke"], If = ["points", "fill"], Ff = ["transform"], Of = ["y1", "y2", "stroke", "onMouseenter"], Vf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], zf = ["x1", "y1", "x2", "y2", "onMouseenter"], Nf = ["x1", "y1", "x2", "y2", "onMouseenter"], jf = ["cy", "stroke", "onMouseenter"], Hf = ["cy", "stroke", "onMouseenter"], Wf = ["x", "y", "fill"], Kf = ["x", "y", "fill"], Yf = ["transform"], Uf = { transform: "translate(-180, 0)" }, qf = ["stroke"], Xf = ["fill"], Gf = { transform: "translate(-120, 0)" }, Zf = ["fill"], Qf = { transform: "translate(-60, 0)" }, Jf = ["fill"], eg = { transform: "translate(0, 0)" }, tg = ["stroke"], ng = ["fill"], ag = { transform: "translate(60, 0)" }, og = ["fill"], sg = { transform: "translate(130, 0)" }, ig = ["fill"], rg = ["transform"], lg = ["x", "y", "width", "height", "fill", "stroke"], cg = ["y", "fill"], dg = ["y", "fill"], ua = 10, ug = 14, Ha = 13, Us = 4, qs = 12, hg = /* @__PURE__ */ ie({
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
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = ua + Ha + Us + qs + ua, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(x, k, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(x, 1) * k * $);
    }
    function l(x, k) {
      return Math.max(
        r(x.length, Ha, !0),
        r(k.length, qs, !1),
        52
      ) + ug * 2;
    }
    function c(x, k, w, $) {
      const S = w / 2, M = 6, V = Math.min(
        Math.max(x, S + M),
        n.chartWidth - S - M
      ), H = M + $ + 10, B = n.chartHeight - M + 10, T = Math.min(Math.max(k, H), B);
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
    }), f = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, b = (x, k, w) => {
      const $ = x.currentTarget.closest("svg");
      if (!$) return;
      const S = $.getBoundingClientRect(), M = $.createSVGPoint();
      M.x = x.clientX - S.left, M.y = x.clientY - S.top;
      let V = f(k.label), H = "";
      switch (w) {
        case "body":
          H = `Q1: ${k.q1.toFixed(1)} | Q3: ${k.q3.toFixed(1)}`;
          break;
        case "wick":
          H = `Min: ${k.low.toFixed(1)} | Max: ${k.high.toFixed(1)}`;
          break;
        case "median":
          H = `Median: ${k.median.toFixed(1)}`;
          break;
        case "average":
          H = `Average: ${k.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          H = `Min: ${k.low.toFixed(1)}`;
          break;
        case "max":
          H = `Max: ${k.high.toFixed(1)}`;
          break;
      }
      const B = l(V, H), T = s;
      let D = M.x, L = M.y - 20;
      const I = c(D, L, B, T);
      D = I.x, L = I.y, h.value = {
        visible: !0,
        x: D,
        y: L,
        title: V,
        text: H,
        width: B,
        height: T
      };
    }, g = (x) => {
      if (h.value.visible) {
        const k = x.currentTarget, w = k.getBoundingClientRect(), $ = k.createSVGPoint();
        $.x = x.clientX - w.left, $.y = x.clientY - w.top;
        let S = $.x, M = $.y - 20;
        const V = c(S, M, h.value.width, h.value.height);
        h.value.x = V.x, h.value.y = V.y;
      }
    }, y = () => {
      h.value.visible = !1;
    }, v = () => {
      h.value.visible = !1;
    }, p = C(() => {
      const x = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const S = $, M = (S - 1) / 9, V = n.chartMargin + w - M * w;
        x.push({ value: S, y: V });
      }
      return x;
    });
    return t({ isDark: a }), (x, k) => (m(), _("div", Mf, [
      (m(), _("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: we(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: g,
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
        }, null, 8, Af),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Tf),
        (m(!0), _(se, null, fe(p.value, (w, $) => (m(), _("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Bf))), 128)),
        (m(!0), _(se, null, fe(p.value, (w, $) => (m(), _(se, { key: $ }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Lf),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, Pf)
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
        }, A(f(e.yAxisLabel)), 9, Ef),
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
        }, null, 8, If),
        (m(!0), _(se, null, fe(e.candlestickData, (w, $) => (m(), _(se, { key: $ }, [
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
              onMouseenter: (S) => b(S, w, "wick"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Of),
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
              onMouseenter: (S) => b(S, w, "body"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Vf),
            w.medianY ? (m(), _("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => b(S, w, "median"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, zf)) : z("", !0),
            w.averageY ? (m(), _("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => b(S, w, "average"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Nf)) : z("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => b(S, w, "min"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, jf),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => b(S, w, "max"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Hf)
          ], 8, Ff),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(f(w.label)), 9, Wf),
          w.responseCount ? (m(), _("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, Kf)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), _("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Uf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
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
            }, " Min ", 8, Xf)
          ]),
          u("g", Gf, [
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
            }, " Q1 ", 8, Zf)
          ]),
          u("g", Qf, [
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
            }, " Q3 ", 8, Jf)
          ]),
          u("g", eg, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, tg),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, ng)
          ]),
          u("g", ag, [
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
            }, " Avg ", 8, og)
          ]),
          u("g", sg, [
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
            }, " Median ", 8, ig)
          ])
        ], 8, Yf)) : z("", !0),
        h.value.visible ? (m(), _("g", {
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
          }, null, 8, lg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ua,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, cg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ua + Ha + Us,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, dg)
        ], 8, rg)) : z("", !0)
      ], 44, Df))
    ]));
  }
}), fg = /* @__PURE__ */ me(hg, [["__scopeId", "data-v-22efd66d"]]), gg = ["viewBox"], pg = ["x1", "y1", "x2", "y2", "stroke"], mg = ["x1", "y1", "x2", "y2", "stroke"], bg = ["points", "fill"], vg = ["x1", "y1", "x2", "y2", "stroke"], yg = ["x", "y", "fill"], xg = ["x", "y", "fill", "transform"], _g = ["x1", "y1", "x2", "y2", "stroke"], kg = ["points", "fill"], wg = ["x1", "y1", "x2", "y2", "stroke"], Cg = ["x", "y", "fill"], $g = ["x", "y", "fill"], Sg = ["d"], Mg = ["x", "y", "width", "height", "onMouseenter"], Dg = ["x1", "y1", "x2", "y2"], Ag = ["x", "y"], Tg = ["x1", "y1", "x2", "y2"], Bg = ["x", "y"], Lg = ["x1", "y1", "x2", "y2"], Pg = ["x", "y"], Eg = ["x1", "y1", "x2", "y2"], Rg = ["x", "y"], Ig = ["x1", "y1", "x2", "y2"], Fg = ["x", "y"], Og = ["x1", "y1", "x2", "y2"], Vg = ["x", "y"], zg = ["transform"], Ng = { transform: "translate(-220, 0)" }, jg = ["fill"], Hg = { transform: "translate(-140, 0)" }, Wg = ["fill"], Kg = { transform: "translate(-80, 0)" }, Yg = ["fill"], Ug = { transform: "translate(-20, 0)" }, qg = ["fill"], Xg = { transform: "translate(60, 0)" }, Gg = ["fill"], Zg = { transform: "translate(130, 0)" }, Qg = ["fill"], Jg = { transform: "translate(180, 0)" }, ep = ["fill"], tp = ["transform"], np = ["x", "y", "width", "height", "fill", "stroke"], ap = ["y", "fill"], op = ["y", "fill"], ha = 10, sp = 14, Wa = 13, Xs = 12, Gs = 4, ip = /* @__PURE__ */ ie({
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
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = ha + Wa + Gs + Xs + ha, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(Z, Y, J) {
      const ue = J ? 0.6 : 0.535;
      return Math.ceil(Math.max(Z, 1) * Y * ue);
    }
    function l(Z, Y) {
      return Math.max(
        r(Z.length, Wa, !0),
        r(Y.length, Xs, !1),
        52
      ) + sp * 2;
    }
    function c(Z, Y, J, ue) {
      const pe = J / 2, F = 6, X = Math.min(
        Math.max(Z, pe + F),
        n.chartWidth - pe - F
      ), oe = F + ue + 10, he = n.chartHeight - F + 10, be = Math.min(Math.max(Y, oe), he);
      return { x: X, y: be };
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
    ), b = C(() => n.chartMargin + n.plotInset), g = C(
      () => n.chartWidth - f.value - n.plotInset
    ), y = C(() => Math.max(g.value - b.value, 1)), v = C(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), p = C(() => y.value / 10 * 0.52);
    function x(Z) {
      if (Z < 1 || Z > 10) return null;
      const Y = y.value / 10;
      return b.value + (Z - 0.5) * Y;
    }
    const k = C(
      () => Array.from({ length: 10 }, (Z, Y) => {
        const J = Y + 1, ue = x(J);
        return ue === null ? null : { score: J, x: ue };
      }).filter((Z) => Z !== null)
    ), w = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const Z = Math.max(...n.histogram.map((J) => J.count || 0), 1), Y = Math.max(1, Math.ceil(Z * 0.2));
      return Z + Y;
    }), $ = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const Z = n.averageScore || 0;
      let Y = 0, J = 0;
      if (n.histogram.forEach((pe) => {
        const F = pe.count || 0;
        Y += F;
        const X = pe.score - Z;
        J += F * (X * X);
      }), Y === 0) return 1;
      const ue = J / Y;
      return Math.sqrt(ue) || 1;
    }), S = (Z, Y, J) => {
      if (J === 0) return 0;
      const ue = 1 / (J * Math.sqrt(2 * Math.PI)), pe = -0.5 * Math.pow((Z - Y) / J, 2);
      return ue * Math.exp(pe);
    }, M = C(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && $.value === 0) return null;
      const Z = n.averageScore, Y = $.value, J = 100, pe = Math.max(...n.histogram.map((he) => he.count || 0), 1) / w.value * v.value;
      if (pe <= 0) return null;
      let F = 0;
      for (let he = 0; he <= J; he++) {
        const be = 1 + 9 * (he / J), ke = S(be, Z, Y);
        ke > F && (F = ke);
      }
      if (F <= 0) return null;
      const X = pe / F, oe = [];
      for (let he = 0; he <= J; he++) {
        const be = 1 + 9 * (he / J), ke = S(be, Z, Y) * X, Be = x(be);
        if (Be !== null) {
          const nt = n.chartHeight - n.chartBottomMargin - ke;
          oe.push(`${he === 0 ? "M" : "L"} ${Be} ${nt}`);
        }
      }
      return oe.join(" ");
    }), V = C(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const Z = y.value / 10;
      return n.histogram.map((Y) => {
        const J = Number(Y.score);
        if (!Number.isFinite(J) || J < 1 || J > 10)
          return null;
        const ue = b.value + (J - 0.5) * Z, pe = Y.count > 0 ? Y.count / w.value * v.value : 0, F = n.chartHeight - n.chartBottomMargin - pe;
        return {
          score: J,
          count: Y.count,
          x: ue,
          y: F,
          height: pe
        };
      }).filter((Y) => Y !== null);
    }), H = C(() => x(n.minScore)), B = C(() => x(n.maxScore)), T = C(() => x(n.q1Score)), D = C(() => x(n.medianScore)), L = C(() => x(n.q3Score)), I = C(() => x(n.averageScore)), G = C(() => n.minScore), Q = C(() => n.maxScore), ne = C(() => n.q1Score), re = C(() => n.medianScore), ge = C(() => n.q3Score), q = C(() => n.averageScore), P = C(() => {
      const Z = [], Y = n.chartMargin - 8, J = 18;
      T.value !== null && Z.push({
        x: T.value,
        y: Y,
        value: n.q1Score,
        label: `Q1: ${ne.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), D.value !== null && Z.push({
        x: D.value,
        y: Y - J,
        value: n.medianScore,
        label: `Median: ${re.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), I.value !== null && Z.push({
        x: I.value,
        y: Y - J,
        value: n.averageScore,
        label: `Avg: ${q.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), L.value !== null && Z.push({
        x: L.value,
        y: Y,
        value: n.q3Score,
        label: `Q3: ${ge.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), Z.sort((F, X) => (F.x || 0) - (X.x || 0));
      const ue = [[], [], []];
      Z.forEach((F) => {
        if (F.x === null) return;
        let X = -1;
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
            X = oe;
            break;
          }
        }
        X === -1 && (X = ue.length - 1), F.y = Y - X * J, ue[X].push(F);
      });
      const pe = 15;
      return Z.forEach((F) => {
        F.y < pe && (F.y = pe);
      }), Z;
    }), j = (Z) => P.value.find((J) => J.id === Z)?.y || n.chartMargin - 10, K = C(() => {
      const Z = [];
      for (let J = 0; J <= 5; J++) {
        const ue = Math.round(w.value / 5 * J), pe = n.chartHeight - n.chartBottomMargin - J / 5 * v.value;
        Z.push({ value: ue, y: pe });
      }
      return Z;
    });
    function ce(Z, Y, J) {
      const ue = Z.createSVGPoint();
      ue.x = Y, ue.y = J;
      const pe = Z.getScreenCTM();
      if (!pe) {
        const X = Z.getBoundingClientRect();
        return { x: Y - X.left, y: J - X.top };
      }
      const F = ue.matrixTransform(pe.inverse());
      return { x: F.x, y: F.y };
    }
    const ve = (Z, Y) => {
      n.interactive && O(Z, Y);
    }, De = () => {
      n.interactive && de();
    }, O = (Z, Y) => {
      const J = Z.currentTarget.closest("svg");
      if (!J) return;
      const { x: ue, y: pe } = ce(J, Z.clientX, Z.clientY), F = `Score: ${Y.score}`, X = `Count: ${Number(Y.count ?? 0).toLocaleString()}`, oe = l(F, X), he = s, be = typeof Y?.x == "number" ? Y.x : ue;
      let ke = pe - 20;
      const Be = c(be, ke, oe, he);
      h.value = {
        visible: !0,
        x: Be.x,
        y: Be.y,
        title: F,
        text: X,
        width: oe,
        height: he,
        anchorX: typeof Y?.x == "number" ? Y.x : null
      };
    }, W = (Z) => {
      if (n.interactive && h.value.visible) {
        const Y = Z.currentTarget, { x: J, y: ue } = ce(Y, Z.clientX, Z.clientY), pe = h.value.anchorX, F = pe != null && Number.isFinite(pe) ? pe : J;
        let X = ue - 20;
        const oe = c(F, X, h.value.width, h.value.height);
        h.value.x = oe.x, h.value.y = oe.y;
      }
    }, U = () => {
      de();
    }, de = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (Z, Y) => (m(), _("div", {
      class: te(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (m(), _("svg", {
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
        (m(!0), _(se, null, fe(K.value, (J, ue) => (m(), _("line", {
          key: `grid-${ue}`,
          x1: b.value,
          y1: J.y,
          x2: g.value,
          y2: J.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, pg))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, mg),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, bg),
        (m(!0), _(se, null, fe(K.value, (J, ue) => (m(), _(se, {
          key: `y-tick-${ue}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: J.y,
            x2: e.chartMargin,
            y2: J.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, vg),
          u("text", {
            x: e.chartMargin - 12,
            y: J.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(J.value), 9, yg)
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
        }, " Count ", 8, xg),
        u("line", {
          x1: b.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, _g),
        u("polygon", {
          points: `${g.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${g.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${g.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, kg),
        (m(!0), _(se, null, fe(k.value, (J) => (m(), _(se, {
          key: `tick-${J.score}`
        }, [
          u("line", {
            x1: J.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: J.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, wg),
          u("text", {
            x: J.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(J.score), 9, Cg)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, $g),
        M.value ? (m(), _("path", {
          key: 0,
          d: M.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Sg)) : z("", !0),
        (m(!0), _(se, null, fe(V.value, (J, ue) => (m(), _("rect", {
          key: `bar-${ue}`,
          x: J.x - p.value / 2,
          y: J.y,
          width: p.value,
          height: J.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (pe) => ve(pe, J),
          onMouseleave: De,
          style: we({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Mg))), 128)),
        e.showStatLabels && H.value ? (m(), _("line", {
          key: 1,
          x1: H.value,
          y1: e.chartMargin,
          x2: H.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Dg)) : z("", !0),
        e.showStatLabels && H.value ? (m(), _("text", {
          key: 2,
          x: H.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(G.value.toFixed(1)), 9, Ag)) : z("", !0),
        e.showStatLabels && T.value ? (m(), _("line", {
          key: 3,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Tg)) : z("", !0),
        e.showStatLabels && T.value ? (m(), _("text", {
          key: 4,
          x: T.value,
          y: j("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(ne.value.toFixed(1)), 9, Bg)) : z("", !0),
        e.showStatLabels && D.value ? (m(), _("line", {
          key: 5,
          x1: D.value,
          y1: e.chartMargin,
          x2: D.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Lg)) : z("", !0),
        e.showStatLabels && D.value ? (m(), _("text", {
          key: 6,
          x: D.value,
          y: j("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(re.value.toFixed(1)), 9, Pg)) : z("", !0),
        e.showStatLabels && I.value ? (m(), _("line", {
          key: 7,
          x1: I.value,
          y1: e.chartMargin,
          x2: I.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Eg)) : z("", !0),
        e.showStatLabels && I.value ? (m(), _("text", {
          key: 8,
          x: I.value,
          y: j("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(q.value.toFixed(1)), 9, Rg)) : z("", !0),
        e.showStatLabels && L.value ? (m(), _("line", {
          key: 9,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Ig)) : z("", !0),
        e.showStatLabels && L.value ? (m(), _("text", {
          key: 10,
          x: L.value,
          y: j("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(ge.value.toFixed(1)), 9, Fg)) : z("", !0),
        e.showStatLabels && B.value ? (m(), _("line", {
          key: 11,
          x1: B.value,
          y1: e.chartMargin,
          x2: B.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Og)) : z("", !0),
        e.showStatLabels && B.value ? (m(), _("text", {
          key: 12,
          x: B.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(Q.value.toFixed(1)), 9, Vg)) : z("", !0),
        e.showLegend ? (m(), _("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", Ng, [
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
            }, " Gaussian ", 8, jg)
          ]),
          u("g", Hg, [
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
            }, " Min ", 8, Wg)
          ]),
          u("g", Kg, [
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
            }, " Q1 ", 8, Yg)
          ]),
          u("g", Ug, [
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
            }, " Median ", 8, qg)
          ]),
          u("g", Xg, [
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
            }, " Avg ", 8, Gg)
          ]),
          u("g", Zg, [
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
            }, " Q3 ", 8, Qg)
          ]),
          u("g", Jg, [
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
            }, " Max ", 8, ep)
          ])
        ], 8, zg)) : z("", !0),
        e.interactive && h.value.visible ? (m(), _("g", {
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
          }, null, 8, np),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ha,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, ap),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ha + Wa + Gs,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, op)
        ], 8, tp)) : z("", !0)
      ], 44, gg))
    ], 2));
  }
}), or = /* @__PURE__ */ me(ip, [["__scopeId", "data-v-8f9da805"]]), rp = 639, sr = 1024;
function Zs(e) {
  return e < 640 ? "mobile" : e <= sr ? "tablet" : "desktop";
}
function lp() {
  const e = ae(
    typeof window > "u" ? "desktop" : Zs(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Zs(window.innerWidth));
  };
  let n = null, a = null, o = null, s = null;
  Ze(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${rp}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${sr}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
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
const cp = { class: "chart-container" }, dp = {
  key: 0,
  class: "loading-state loading-overlay"
}, sn = 12, up = /* @__PURE__ */ ie({
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
    Ao.use([Pr, Er, Rr, Ir]);
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), { breakpoint: s } = lp(), i = ae(null), r = ae(!0), l = ae(!1);
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
    }, b = {
      success: 0,
      abandon: 1,
      error: 2
    }, g = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, y = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, v = C(() => {
      const O = s.value;
      return O === "mobile" ? {
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
      } : O === "tablet" ? {
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
    }), p = (O) => {
      const W = O.replace(/_/g, " ").replace(/\s+/g, " ").trim(), U = W.match(/^Failed:\s*(.+)$/i);
      return U ? `Failed:
${U[1].trim()}` : W;
    }, x = (O, W) => {
      const U = O.trim();
      if (!U || W < 1 || U.length <= W) return U;
      const de = [];
      let Z = 0;
      for (; Z < U.length; ) {
        const Y = Math.min(Z + W, U.length);
        if (Y >= U.length) {
          const pe = U.slice(Z).trim();
          pe && de.push(pe);
          break;
        }
        const J = U.slice(Z, Y), ue = J.lastIndexOf(" ");
        if (ue > 0)
          for (de.push(U.slice(Z, Z + ue).trim()), Z += ue; Z < U.length && U[Z] === " "; ) Z += 1;
        else
          de.push(J), Z = Y;
      }
      return de.join(`
`);
    }, k = (O, W) => {
      const U = O.trim();
      return !U || W < 1 ? O : U.split(`
`).map((de) => x(de.trim(), W)).filter(Boolean).join(`
`);
    }, w = (O) => O.status ? O.status : g.test(O.name) ? "abandon" : y.test(O.name) ? "error" : "success", $ = (O) => O.originalValue ?? O.value, S = (O, W) => {
      const U = new Set(W.map((Z) => Z.target)), de = O.filter((Z) => !U.has(Z.name));
      for (const Z of de) {
        if (typeof Z.value == "number" && Z.value > 0) return Z.value;
        const Y = W.filter((J) => J.source === Z.name);
        if (Y.length > 0)
          return Y.reduce((J, ue) => J + $(ue), 0);
      }
      return W.reduce((Z, Y) => Math.max(Z, $(Y)), 0);
    }, M = (O, W, U) => {
      if (U && typeof U.value == "number") return U.value;
      const de = W.filter((Y) => Y.target === O);
      return de.length > 0 ? de.reduce((Y, J) => Y + $(J), 0) : W.filter((Y) => Y.source === O).reduce((Y, J) => Y + $(J), 0);
    }, V = (O, W) => {
      const U = /* @__PURE__ */ new Map(), de = new Set(W.map((Y) => Y.target)), Z = O.filter((Y) => !de.has(Y.name)).map((Y) => ({ name: Y.name, depth: 0 }));
      for (; Z.length > 0; ) {
        const { name: Y, depth: J } = Z.shift(), ue = U.get(Y);
        if (!(ue !== void 0 && ue >= J)) {
          U.set(Y, J);
          for (const pe of W)
            pe.source === Y && Z.push({ name: pe.target, depth: J + 1 });
        }
      }
      for (const Y of O)
        U.has(Y.name) || U.set(Y.name, 0);
      return U;
    }, H = (O, W) => {
      const U = /* @__PURE__ */ new Map(), de = new Set(W.map((ue) => ue.target)), Z = O.filter((ue) => !de.has(ue.name));
      let Y = 0;
      const J = (ue) => {
        let pe = ue;
        for (; pe && !U.has(pe); )
          U.set(pe, Y), Y += 1, pe = W.filter(
            (X) => X.source === pe && w({ name: X.target }) === "success"
          ).sort((X, oe) => $(oe) - $(X))[0]?.target;
      };
      return Z.forEach((ue) => J(ue.name)), U;
    }, B = (O, W, U) => {
      const de = w(O);
      if (de === "success" && U.has(O.name))
        return U.get(O.name);
      if (de === "success") {
        const Z = W.filter((J) => J.target === O.name);
        return 200 + (Z.length ? Math.min(
          ...Z.map(
            (J) => U.has(J.source) ? (U.get(J.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return de === "abandon" ? 1e3 : 2e3;
    }, T = (O, W) => {
      const U = V(O, W), de = H(O, W);
      return [...O].sort((Z, Y) => {
        const J = U.get(Z.name) ?? 0, ue = U.get(Y.name) ?? 0;
        if (J !== ue) return J - ue;
        const pe = b[w(Z)], F = b[w(Y)];
        if (pe !== F) return pe - F;
        const X = B(Z, W, de), oe = B(Y, W, de);
        return X !== oe ? X - oe : Z.name.localeCompare(Y.name);
      });
    }, D = (O, W, U, de) => {
      const Y = k(O, de).split(`
`), J = W * 0.58, pe = Math.max(...Y.map((X) => X.length), 1) * J, F = Y.length * U;
      return {
        lines: Y,
        width: pe,
        height: F,
        nodeWidth: pe + sn * 2
      };
    }, L = (O, W) => W ? `${(O / W * 100).toFixed(1)}%` : "0.0%", I = (O, W, U, de, Z) => {
      if (typeof O.label == "string" && O.label)
        return k(p(O.label), Z);
      const Y = k(p(O.name), Z);
      if (W === "success" && U > 0) {
        const J = M(O.name, de, O), ue = L(J, U);
        return `${Y}
(${ue})`;
      }
      return Y;
    }, G = (O, W = 0) => {
      if (W > 0) return W;
      const U = O.match(/^(\d+(?:\.\d+)?)px$/);
      if (U) return Number(U[1]);
      const de = O.match(/^(\d+(?:\.\d+)?)vh$/);
      return de && typeof window < "u" ? Number(de[1]) / 100 * window.innerHeight : 500;
    }, Q = (O, W, U, de, Z) => {
      if (!W.length || !O.length || Z <= 0) return O;
      const Y = O.map((be) => ({ ...be })), J = U.labelLineHeight || Math.round(U.labelFontSize * 1.25), ue = Math.max(4, U.labelCharsPerLine), pe = Math.max(de * 0.88, 260), F = V(W, Y), X = /* @__PURE__ */ new Map();
      W.forEach((be) => {
        const ke = F.get(be.name) ?? 0;
        X.set(ke, (X.get(ke) ?? 0) + 1);
      });
      const oe = (be) => {
        const Be = W.find((tn) => tn.name === be)?.displayLabel || be, ft = D(Be, U.labelFontSize, J, ue).height + sn * 2, en = F.get(be) ?? 0, wt = X.get(en) ?? 1, mn = (Math.max(wt, 1) - 1) * U.nodeGap / Math.max(wt, 1), Ta = Math.max(pe - mn, ft);
        return Math.max(1, ft / Ta * Z);
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
    }, ne = (O, W, U) => {
      const de = S(O, W), Z = T(O, W), Y = U.labelLineHeight || Math.round(U.labelFontSize * 1.25), J = Math.max(4, U.labelCharsPerLine);
      let ue = U.nodeWidth;
      const pe = [], F = Z.map((oe, he) => {
        const be = w(oe), ke = I(
          oe,
          be,
          de,
          W,
          J
        );
        pe.push(ke);
        const Be = D(ke, U.labelFontSize, Y, J);
        U.orient === "vertical" ? ue = Math.max(ue, Be.height + sn * 2) : ue = Math.max(ue, Be.nodeWidth);
        const nt = n.nodeColors[oe.name] || f[be] || re[he % re.length], ft = Math.max(Math.ceil(Be.nodeWidth - sn * 2), 48);
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
      let X = { ...U.contentMargins };
      if (U.orient === "vertical") {
        const oe = Math.max(
          ...pe.map(
            (be) => D(be, U.labelFontSize, Y, J).width
          ),
          0
        ), he = typeof X.right == "number" ? X.right : 10;
        X = {
          ...X,
          right: Math.max(he, oe + sn + U.labelDistance)
        };
      }
      return { nodes: F, maxNodeWidth: ue, contentMargins: X, originTotal: de };
    }, re = [
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
      const O = n.data.links.filter(
        (Z) => Z.source && Z.target && typeof Z.value == "number"
      ), W = Math.max(...O.map((Z) => Z.value), 1), U = Math.max(1, W * 0.01), de = O.map((Z) => ({
        ...Z,
        originalValue: Z.value,
        value: Z.value < W * 0.01 ? U : Z.value
      }));
      return {
        nodes: n.data.nodes.filter((Z) => Z.name),
        links: de
      };
    }, q = (O) => (W) => {
      const U = W.dataType === "node", de = o.value.tooltipText, Z = a.value ? "#d1d5db" : "#e2e8f0";
      if (U) {
        const F = O.filter((he) => he.target === W.name), X = O.filter((he) => he.source === W.name), oe = F.length > 0 ? F.reduce((he, be) => he + (be.originalValue || be.value), 0) : X.reduce((he, be) => he + (be.originalValue || be.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${de};">${W.name}</div><div style="color: ${Z}; font-size: 12px;">Count: ${oe.toLocaleString()}</div>`;
      }
      const Y = W.data?.source || W.source || "Unknown", J = W.data?.target || W.target || "Unknown", ue = W.data?.originalValue || W.data?.value || W.value || 0, pe = W.data?.label || `${ue.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${de};">${Y} → ${J}</div><div style="color: ${Z}; font-size: 12px;">Flow: ${pe}</div>`;
    }, P = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const O = v.value, W = a.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", U = a.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", de = a.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", Z = O.labelPosition === "inside" ? "#ffffff" : a.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: Y, links: J } = ge(), { nodes: ue, maxNodeWidth: pe, contentMargins: F, originTotal: X } = ne(
          Y,
          J,
          O
        ), oe = G(n.height, i.value?.clientHeight ?? 0), he = Q(
          J,
          ue,
          {
            labelFontSize: O.labelFontSize,
            labelLineHeight: O.labelLineHeight || Math.round(O.labelFontSize * 1.25),
            labelCharsPerLine: O.labelCharsPerLine,
            nodeGap: O.nodeGap
          },
          oe,
          X
        ), be = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: q(he),
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
                position: O.labelPosition,
                color: Z,
                fontWeight: 700,
                fontSize: O.labelFontSize,
                lineHeight: O.labelLineHeight || Math.round(O.labelFontSize * 1.25),
                padding: sn,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...O.orient === "horizontal" ? { width: Math.max(pe - sn * 2, 48), overflow: "none" } : O.labelWrap && O.labelTextWidth > 0 ? { width: O.labelTextWidth, overflow: "none" } : {},
                ...O.labelDistance > 0 ? { distance: O.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (ke) => ke.data?.displayLabel || ke.name || ""
              },
              edgeLabel: O.edgeLabelShow ? {
                show: !0,
                fontSize: O.edgeLabelFontSize,
                color: de,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (ke) => {
                  if (ke.data?.label) return ke.data.label;
                  const Be = ke.data?.originalValue ?? ke.value ?? 0, nt = ke.data?.source ?? ke.source, ft = he.filter((wt) => wt.source === nt).reduce((wt, mn) => wt + $(mn), 0), en = L(Be, ft);
                  return `${Number(Be).toLocaleString()} (${en})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: O.nodeGap,
              nodeWidth: pe,
              layoutIterations: h.node.iterations,
              orient: O.orient,
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
    }, j = async () => {
      if (i.value)
        try {
          c = Ao.init(i.value), P(), window.addEventListener("resize", ve);
        } catch (O) {
          console.error("Error initializing Sankey chart:", O), l.value = !0;
        } finally {
          r.value = !1;
        }
    }, K = () => {
      const O = i.value;
      return !!(O && O.clientWidth > 0 && O.clientHeight > 0);
    }, ce = async () => {
      if (await je(), K()) return j();
      await new Promise((O) => {
        const W = i.value;
        if (!W) {
          O();
          return;
        }
        d = new ResizeObserver(() => {
          K() && (d?.disconnect(), d = null, j().then(O));
        }), d.observe(W);
      });
    }, ve = () => c?.resize(), De = () => {
      window.removeEventListener("resize", ve), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return Ze(() => ce()), ri(De), Ie(() => n.data, P, { deep: !0 }), Ie(a, P), Ie(s, P), t({ isDark: a }), (O, W) => (m(), _("div", cp, [
      l.value ? (m(), _("div", {
        key: 0,
        class: "error-state",
        style: we({ height: e.height })
      }, [...W[0] || (W[0] = [
        Mo('<div class="error-content" data-v-b04b208a><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b04b208a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b04b208a></path></svg><p class="error-title" data-v-b04b208a>Chart could not be loaded</p><p class="error-description" data-v-b04b208a>Please check the data format.</p></div>', 1)
      ])], 4)) : (m(), _("div", {
        key: 1,
        class: "chart-wrapper",
        style: we({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        r.value ? (m(), _("div", dp, [...W[1] || (W[1] = [
          Mo('<div class="loading-container" data-v-b04b208a><div class="sankey-loader" data-v-b04b208a><div class="flow flow-1" data-v-b04b208a></div><div class="flow flow-2" data-v-b04b208a></div><div class="flow flow-3" data-v-b04b208a></div><div class="flow flow-4" data-v-b04b208a></div></div><p class="loading-text" data-v-b04b208a>Loading Sankey diagram...</p></div>', 1)
        ])])) : z("", !0)
      ], 4))
    ]));
  }
}), Jt = /* @__PURE__ */ me(up, [["__scopeId", "data-v-b04b208a"]]), hp = ["open"], fp = { class: "card-header metric-collapsible__summary" }, gp = { class: "header-content metric-header-content" }, pp = { class: "metric-header-content__main" }, mp = { class: "metric-header-content__text" }, bp = { class: "metric-header-content__loaded" }, vp = {
  key: 0,
  class: "card-title"
}, yp = {
  key: 0,
  class: "card-subtitle"
}, xp = {
  key: 0,
  class: "metric-header-content__export"
}, _p = {
  key: 0,
  class: "cmc-header-aside"
}, kp = {
  key: 0,
  class: "chart-metric-container__body"
}, wp = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Cp = { key: "body-content" }, $p = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Sp = { class: "card-header" }, Mp = { class: "header-content metric-header-content" }, Dp = { class: "metric-header-content__main" }, Ap = { class: "metric-header-content__text" }, Tp = { class: "metric-header-content__loaded" }, Bp = {
  key: 0,
  class: "card-title"
}, Lp = {
  key: 0,
  class: "card-subtitle"
}, Pp = {
  key: 0,
  class: "metric-header-content__export"
}, Ep = {
  key: 0,
  class: "cmc-header-aside"
}, Rp = {
  key: 0,
  class: "chart-metric-container__body"
}, Ip = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Fp = { key: "body-content" }, Op = /* @__PURE__ */ ie({
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
      return f.some((b) => {
        if (b.type === Lr) return !1;
        if (b.type === Text) {
          const g = b.children;
          return typeof g == "string" && g.trim().length > 0;
        }
        return !!b.type;
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
      const b = f.currentTarget;
      if (b?.tagName !== "DETAILS") return;
      const g = o.value, y = b.open;
      if (o.value = y, y && !g) {
        const v = !s.value;
        s.value = !0, v && a("open");
      }
      a("toggle", y);
    }
    return (f, b) => e.collapsible ? (m(), _("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: o.value,
      onToggle: h
    }, [
      u("summary", fp, [
        u("div", gp, [
          u("div", pp, [
            u("div", mp, [
              u("div", bp, [
                _e(f.$slots, "title", {}, () => [
                  e.title ? (m(), _("h3", vp, A(e.title), 1)) : z("", !0)
                ], !0),
                e.subtitle ? (m(), _("p", yp, A(e.subtitle), 1)) : z("", !0),
                _e(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (m(), _("div", xp, [
              _e(f.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          f.$slots.headerAside ? (m(), _("div", _p, [
            _e(f.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ]),
        b[0] || (b[0] = u("svg", {
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
      l.value ? (m(), _("div", kp, [
        N(ut, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            c.value ? (m(), _("div", wp, [
              _e(f.$slots, "loading", {}, () => [
                b[1] || (b[1] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (m(), _("div", Cp, [
              _e(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : z("", !0)
    ], 40, hp)) : (m(), _("div", $p, [
      u("div", Sp, [
        u("div", Mp, [
          u("div", Dp, [
            u("div", Ap, [
              u("div", Tp, [
                _e(f.$slots, "title", {}, () => [
                  e.title ? (m(), _("h3", Bp, A(e.title), 1)) : z("", !0)
                ], !0),
                e.subtitle ? (m(), _("p", Lp, A(e.subtitle), 1)) : z("", !0),
                _e(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (m(), _("div", Pp, [
              _e(f.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          f.$slots.headerAside ? (m(), _("div", Ep, [
            _e(f.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ])
      ]),
      l.value ? (m(), _("div", Rp, [
        N(ut, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            c.value ? (m(), _("div", Ip, [
              _e(f.$slots, "loading", {}, () => [
                b[2] || (b[2] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (m(), _("div", Fp, [
              _e(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : z("", !0)
    ]));
  }
}), Ce = /* @__PURE__ */ me(Op, [["__scopeId", "data-v-46090b42"]]);
function Vp(e, t) {
  return m(), _("svg", {
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
  return m(), _("svg", {
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
  return m(), _("svg", {
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
function zp(e, t) {
  return m(), _("svg", {
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
  return m(), _("svg", {
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
  return m(), _("svg", {
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
  return m(), _("svg", {
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
function Np(e, t) {
  return m(), _("svg", {
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
function jp(e, t) {
  return m(), _("svg", {
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
  return m(), _("svg", {
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
  return m(), _("svg", {
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
function Hp(e, t) {
  return m(), _("svg", {
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
function Wp(e, t) {
  return m(), _("svg", {
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
function Kp(e, t) {
  return m(), _("svg", {
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
function Yp(e, t) {
  return m(), _("svg", {
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
  return m(), _("svg", {
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
const Up = {
  key: 0,
  class: "footer-divider"
}, qp = {
  key: 0,
  class: "export-label"
}, Xp = { class: "export-buttons" }, Gp = ["disabled"], Zp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Qp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Jp = ["disabled"], em = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, tm = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, nm = /* @__PURE__ */ ie({
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
    return (l, c) => (m(), ee(Mt(o.value), {
      class: te(s.value)
    }, {
      default: R(() => [
        e.variant === "footer" ? (m(), _("div", Up)) : z("", !0),
        u("div", {
          class: te(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (m(), _("span", qp, "Export")) : z("", !0),
          u("div", Xp, [
            i("pdf") ? (m(), _("button", {
              key: 0,
              type: "button",
              class: te(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => r("pdf"))
            }, [
              e.loading ? (m(), _("svg", Zp, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), _("svg", Qp, [...c[3] || (c[3] = [
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
            ], 10, Gp)) : z("", !0),
            i("csv") ? (m(), _("button", {
              key: 1,
              type: "button",
              class: te(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => r("csv"))
            }, [
              e.loading ? (m(), _("svg", em, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), _("svg", tm, [...c[6] || (c[6] = [
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
            ], 10, Jp)) : z("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Ve = /* @__PURE__ */ me(nm, [["__scopeId", "data-v-ebfab47f"]]), am = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, om = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, sm = { class: "w-full shrink-0 sm:pr-2" }, im = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, rm = { class: "max-w-[360px] text-center" }, lm = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, cm = /* @__PURE__ */ ie({
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
      const b = new Date(f), g = String(b.getDate()).padStart(2, "0"), y = String(b.getMonth() + 1).padStart(2, "0");
      return `${g}-${y}`;
    }, h = C(() => {
      const f = o.data?.agents_by_day || {}, b = Object.keys(f).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const g = b.map((k) => d(k)), y = /* @__PURE__ */ new Set();
      for (const k of Object.values(f))
        for (const w of Object.keys(k))
          y.add(w);
      const v = Array.from(y), p = (k) => k, x = v.map((k) => ({
        label: k,
        data: b.map((w) => f[w]?.[k] || 0),
        backgroundColor: `${a[k] || "#94a3b8"}80`,
        borderColor: p(a[k] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: x
      };
    });
    return t({ isDark: c }), (f, b) => (m(), ee(Ce, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", am, [
          N(ut, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: R(() => [
              h.value.labels && h.value.labels.length ? (m(), _("section", om, [
                u("div", sm, [
                  N(kt, {
                    data: h.value,
                    stacked: !0,
                    theme: r.value,
                    options: l.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (m(), _("section", im, [
                u("div", rm, [
                  u("div", lm, [
                    N(E(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  b[0] || (b[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  b[1] || (b[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), dm = /* @__PURE__ */ me(cm, [["__scopeId", "data-v-f8d0ec91"]]), pn = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ye = (e, t) => `${e.toLocaleString()} (${pn(e, t)})`, um = { class: "flex w-full min-w-0 justify-center" }, hm = { class: "flex max-w-full min-w-0 items-center gap-2" }, fm = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, gm = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, pm = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, mm = /* @__PURE__ */ ie({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (m(), _("div", {
      class: te(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", um, [
        u("div", hm, [
          e.color ? (m(), _("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: we({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", fm, A(e.title), 1)
        ])
      ]),
      u("p", gm, A(e.value), 1),
      e.subvalue ? (m(), _("p", pm, A(e.subvalue), 1)) : z("", !0)
    ], 2));
  }
}), xe = /* @__PURE__ */ me(mm, [["__scopeId", "data-v-0d546967"]]), cr = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
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
const bm = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ue = /* @__PURE__ */ ie({
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
    return (r, l) => n.value ? (m(), _("span", {
      key: 0,
      role: "status",
      class: te(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (m(), _("span", bm, [...l[0] || (l[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : z("", !0),
      u("span", {
        class: te(["min-w-0 flex-1 text-center", s.value])
      }, A(a.value), 3)
    ], 2)) : (m(), _("span", {
      key: 1,
      class: te([E(cr), i.value])
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
}, vm = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, ym = { class: "overflow-x-auto" }, xm = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, _m = ["aria-sort", "onClick"], km = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, wm = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Cm = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, $m = /* @__PURE__ */ ie({
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
    function b(w) {
      a("sort", w);
    }
    function g(w) {
      return f(w) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const y = C(() => n.rows?.length ?? 0), v = C(() => y.value > n.maxVisibleRows), p = C(() => Math.max(0, y.value - n.maxVisibleRows)), x = C(() => n.rows?.length ? o.value || !v.value ? n.rows : n.rows.slice(0, n.maxVisibleRows) : []), k = C(
      () => n.viewMoreLabel.replace(/\{count\}/g, String(p.value))
    );
    return (w, $) => (m(), _("div", vm, [
      u("div", ym, [
        u("table", xm, [
          u("thead", null, [
            u("tr", null, [
              (m(!0), _(se, null, fe(e.columns, (S) => (m(), _("th", {
                key: S.key,
                scope: "col",
                class: te(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [r(S.align), S.headerClass]])
              }, [
                S.sortable ? (m(), _("button", {
                  key: 0,
                  type: "button",
                  class: te(["kiut-table-sort-btn inline-flex items-center gap-1", r(S.align)]),
                  "aria-sort": g(S.key),
                  onClick: (M) => b(S.key)
                }, [
                  u("span", null, A(S.label), 1),
                  u("span", km, [
                    f(S.key) ? (m(), _(se, { key: 0 }, [
                      e.sortDirection === "asc" ? (m(), _("span", wm, "↑")) : e.sortDirection === "desc" ? (m(), _("span", Cm, "↓")) : z("", !0)
                    ], 64)) : (m(), _(se, { key: 1 }, [
                      $[1] || ($[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, _m)) : (m(), _(se, { key: 1 }, [
                  Ae(A(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), _(se, null, fe(x.value, (S, M) => (m(), _("tr", {
              key: h(S, M)
            }, [
              (m(!0), _(se, null, fe(e.columns, (V) => (m(), _("td", {
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
      v.value ? (m(), _("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (S) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : k.value) + " ", 1),
        (m(), _("svg", {
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
}), ct = /* @__PURE__ */ me($m, [["__scopeId", "data-v-22a97a18"]]), Sm = {
  key: "error",
  class: "error-state"
}, Mm = { class: "error-content" }, Dm = { class: "error-description" }, Am = {
  key: "content",
  class: "card-body"
}, Tm = { class: "chart-section" }, Bm = { class: "chart-wrapper" }, Lm = { class: "payment-success-summary" }, Pm = {
  key: 0,
  class: "booking-daily-section"
}, Em = { class: "w-full min-w-0" }, Rm = { class: "font-medium" }, Im = { class: "percentage-text" }, Fm = { class: "badges-container" }, Om = {
  key: 0,
  class: "badges-container"
}, Vm = {
  key: 1,
  class: "percentage-text"
}, zm = { class: "badges-container" }, Nm = {
  key: 1,
  class: "empty-state"
}, jm = /* @__PURE__ */ ie({
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
    function n(p) {
      return p;
    }
    const a = e, o = t, s = (p) => {
      o("export", p);
    }, i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (p, x) => new Date(p.date).getTime() - new Date(x.date).getTime()
    ) : []), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], l = C(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = C(() => a.data?.total_payment_success_value || []), d = C(() => {
      const p = c.value;
      return p.length === 0 ? g(0) : p.map(
        (x) => `${x.currency} ${g(x.total_value)}`
      ).join(" · ");
    }), h = (p) => p.payment_success_value || [], f = (p) => typeof p.payment_success_count == "number" ? p.payment_success_count : (p.payment_success_value || []).reduce(
      (x, k) => x + (k.count || 0),
      0
    ), b = (p) => Le(p), g = (p) => p == null ? "0" : Vt(p);
    C(() => (a.data?.total_payment_success_value || []).reduce(
      (p, x) => p + (x.total_value || 0),
      0
    ));
    const y = C(() => {
      const p = a.data, x = p.total_booking_initiated || 0, k = p.total_booking_started || 0, w = p.total_payment_initiated || 0, $ = p.total_not_found || 0, S = p.total_cancelled || 0, M = p.total_no_pending_balance || 0, V = p.total_errors || 0, H = typeof p.total_payment_success == "number" ? p.total_payment_success : (p.total_payment_success_value || []).reduce(
        (Q, ne) => Q + (ne.count || 0),
        0
      ), B = p.total_payment_failed || 0, T = Math.max(0, x - k), D = Math.max(
        0,
        k - w - $ - S - M - V
      ), L = (Q, ne) => ye(Q, ne), I = [
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
      ], G = [];
      return k > 0 && G.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: L(k, x)
      }), T > 0 && G.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: L(T, x)
      }), w > 0 && G.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: L(w, k)
      }), $ > 0 && G.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: L($, k)
      }), S > 0 && G.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: L(S, k)
      }), M > 0 && G.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: L(M, k)
      }), V > 0 && G.push({
        source: "Started",
        target: "Errors",
        value: V,
        label: L(V, k)
      }), D > 0 && G.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: D,
        label: L(D, k)
      }), H > 0 && G.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: H,
        label: L(H, w)
      }), B > 0 && G.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: L(B, w)
      }), { nodes: I, links: G };
    }), v = (p, x) => pn(p, x);
    return (p, x) => (m(), ee(Ce, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: x[0] || (x[0] = (k) => o("open"))
    }, {
      headerExport: R(() => [
        e.enableExport && !a.loading && !a.error ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        N(ut, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            a.error ? (m(), _("div", Sm, [
              u("div", Mm, [
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
                u("p", Dm, A(a.error), 1)
              ])
            ])) : (m(), _("div", Am, [
              u("section", Tm, [
                u("div", Bm, [
                  N(Jt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", Lm, [
                N(xe, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (m(), _("section", Pm, [
                x[3] || (x[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", Em, [
                  N(ct, {
                    columns: r,
                    rows: l.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": R(({ row: k }) => [
                      u("span", Rm, A(E(We)(String(k.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": R(({ row: k }) => [
                      u("span", null, A(E(le)(Number(k.booking_initiated_count))), 1)
                    ]),
                    "cell-started": R(({ row: k }) => [
                      u("span", null, [
                        Ae(A(E(le)(Number(k.booking_started_count))) + " ", 1),
                        u("span", Im, " (" + A(v(
                          Number(k.booking_started_count),
                          Number(k.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": R(({ row: k }) => [
                      u("span", null, A(E(le)(Number(k.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": R(({ row: k }) => [
                      u("div", Fm, [
                        N(Ue, { color: "success" }, {
                          default: R(() => [
                            Ae(" Success: " + A(E(le)(
                              f(k)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "danger" }, {
                          default: R(() => [
                            Ae(" Failed: " + A(E(le)(Number(k.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": R(({ row: k }) => [
                      h(k).length > 0 ? (m(), _("div", Om, [
                        (m(!0), _(se, null, fe(h(
                          k
                        ), (w) => (m(), _("span", {
                          key: `${k.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, A(w.currency) + " " + A(b(w.total_value)), 1))), 128))
                      ])) : (m(), _("span", Vm, "N/A"))
                    ]),
                    "cell-outcomes": R(({ row: k }) => [
                      u("div", zm, [
                        N(Ue, { color: "danger" }, {
                          default: R(() => [
                            Ae(" Not Found: " + A(k.not_found_count ? E(le)(Number(k.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "warning" }, {
                          default: R(() => [
                            Ae(" Cancelled: " + A(k.cancelled_count ? E(le)(Number(k.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "orange" }, {
                          default: R(() => [
                            Ae(" No Balance: " + A(k.no_pending_balance_count ? E(le)(Number(k.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "danger" }, {
                          default: R(() => [
                            Ae(" Errors: " + A(k.error_count ? E(le)(Number(k.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), _("section", Nm, [...x[4] || (x[4] = [
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
}), Hm = /* @__PURE__ */ me(jm, [["__scopeId", "data-v-b053e988"]]), Wm = { class: "card-body" }, Km = {
  key: 0,
  class: "chart-section"
}, Ym = { class: "chart-wrapper" }, Um = {
  key: 1,
  class: "checkin-daily-section"
}, qm = { class: "w-full min-w-0" }, Xm = { class: "font-medium" }, Gm = { class: "cell-success" }, Zm = { class: "cell-danger" }, Qm = {
  key: 0,
  class: "reasons-list"
}, Jm = { class: "reason-name" }, e0 = { class: "reason-count" }, t0 = {
  key: 1,
  class: "no-reasons"
}, n0 = {
  key: 2,
  class: "empty-state"
}, a0 = {
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
    }), b = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.failed_by_step_by_day) && w.failed_by_step_by_day.length > 0 || Array.isArray(w.unrecovered_by_step) && w.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: w.total_checkin_failed ?? 0,
        total_checkin_unrecovered: w.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: w.failed_by_step_by_day ?? [],
        unrecovered_by_step: w.unrecovered_by_step ?? [],
        unrecovered_by_day: w.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), g = (w, $) => !$ || $ === 0 ? "0.0%" : pn(w, $), y = (w, $) => {
      const S = le(w), M = g(w, $);
      return `${S} (${M})`;
    }, v = (w) => w.reduce(($, S) => $ + S.failed_count, 0), p = C(() => {
      const w = [], $ = [];
      if (!f.value.total_checkin_initiated)
        return { nodes: w, links: $ };
      w.push({ name: "Checkin Init" }), w.push({ name: "Booking retrive" }), w.push({ name: "Booking retrive success" }), w.push({ name: "Number of Passengers" }), w.push({ name: "Completed" }), w.push({ name: "Closed with BP" });
      const S = f.value.total_checkin_initiated, M = f.value.total_checkin_init, V = f.value.total_checkin_init_abandoned, H = M - V, B = f.value.total_checkin_started, T = f.value.total_checkin_completed, D = f.value.total_checkin_closed, L = b.value.unrecovered_by_step || [], I = L.reduce(
        (re, ge) => re + ge.count,
        0
      );
      M > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: M,
        label: ye(M, S)
      });
      const G = S - M;
      G > 0 && (w.push({ name: "Abandoned (Init)", status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: G,
        label: ye(G, S)
      })), V > 0 && (w.push({ name: "Abandoned (Started)", status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: V,
        label: ye(V, S)
      })), H > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: H,
        label: ye(H, S)
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
      }), L.length > 0 && I > 0 && (w.push({ name: "Unrecovered", status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: I,
        label: ye(I, B)
      }), L.forEach((re) => {
        const q = re.step_name.replace(/_/g, " ").split(" ").map((P) => P.charAt(0).toUpperCase() + P.slice(1)).join(" ");
        w.push({ name: q, status: "error" }), $.push({
          source: "Unrecovered",
          target: q,
          value: re.count,
          label: ye(re.count, B)
        });
      }));
      const Q = B - (T + I);
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
    }), x = () => {
      const w = o.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, k = () => {
      const w = f.value.checkin_by_day || [], $ = b.value.failed_by_step_by_day || [], S = x();
      if (w.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...w].map((M) => {
        const V = $.find(
          (B) => B.date === M.date
        ), H = S.find(
          (B) => B.date === M.date
        );
        return {
          ...M,
          failed_steps: V?.steps || [],
          record_locator_create_payment_count: M.record_locator_create_payment_count ?? H?.record_locator_create_payment_count ?? 0
        };
      }), r.value.sort((M, V) => new Date(M.date) - new Date(V.date));
    };
    return Ie(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        k();
      },
      { deep: !0, immediate: !0 }
    ), (w, $) => (m(), ee(Ce, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", Wm, [
          p.value.nodes.length > 0 ? (m(), _("section", Km, [
            u("div", Ym, [
              N(Jt, {
                data: p.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])
            ])
          ])) : z("", !0),
          r.value && r.value.length > 0 ? (m(), _("section", Um, [
            u("div", qm, [
              N(ct, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: S }) => [
                  u("span", Xm, A(E(We)(String(S.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": R(({ row: S }) => [
                  u("span", null, A(E(le)(S.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": R(({ row: S }) => [
                  u("span", null, A(y(
                    S.checkin_init_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": R(({ row: S }) => [
                  u("span", null, A(E(le)(S.checkin_started_count)), 1)
                ]),
                "cell-completed": R(({ row: S }) => [
                  u("span", null, A(y(
                    S.checkin_completed_count,
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-closed": R(({ row: S }) => [
                  u("span", Gm, A(y(
                    S.checkin_closed_count,
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-failed": R(({ row: S }) => [
                  u("span", Zm, A(y(
                    v(S.failed_steps),
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-reasons": R(({ row: S }) => [
                  S.failed_steps && S.failed_steps.length > 0 ? (m(), _("div", Qm, [
                    (m(!0), _(se, null, fe(S.failed_steps, (M) => (m(), _("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      u("span", Jm, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      u("span", e0, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), _("div", t0, "-"))
                ]),
                "cell-createPayment": R(({ row: S }) => [
                  u("span", null, A(E(le)(S.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), _("section", n0, [...$[0] || ($[0] = [
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
}, ur = /* @__PURE__ */ me(a0, [["__scopeId", "data-v-d623189e"]]), o0 = { class: "card-body" }, s0 = {
  key: 0,
  class: "sankey-section"
}, i0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, r0 = { class: "w-full min-w-0" }, l0 = { class: "font-medium whitespace-nowrap" }, c0 = { class: "cell-success" }, d0 = { class: "cell-danger" }, u0 = {
  key: 0,
  class: "reasons-list"
}, h0 = { class: "reason-name" }, f0 = { class: "reason-count" }, g0 = {
  key: 1,
  class: "no-reasons"
}, p0 = {
  key: 2,
  class: "empty-state"
}, m0 = { class: "empty-state-content" }, b0 = { class: "empty-icon-wrapper" }, v0 = /* @__PURE__ */ ie({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me(Se(a, "theme")), r = (v) => v == null ? "0" : v.toLocaleString(), l = (v) => {
      const [p, x, k] = v.split("-").map(Number);
      return We([p, x - 1, k]).format("MMM DD");
    }, c = (v) => v.replace(/_/g, " ").replace(/\b\w/g, (p) => p.toUpperCase()), d = (v, p) => pn(v, p), h = (v, p) => {
      const x = v || 0, k = p || 0, w = r(x), $ = d(x, k);
      return `${w} (${$})`;
    }, f = C(() => {
      const v = a.checkinData?.record_locator_by_day || [], p = a.failedData?.failed_by_step_by_day || [], x = a.failedData?.unrecovered_by_day || [];
      return v.map((w) => {
        const $ = p.find((M) => M.date === w.date), S = x.find(
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
    }), b = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], g = C(
      () => f.value.map((v) => ({
        id: v.date,
        date: v.date,
        checkin_initiated: v.checkin_initiated,
        record_locator_init_count: v.record_locator_init_count,
        record_locator_started_count: v.record_locator_started_count,
        record_locator_completed_count: v.record_locator_completed_count,
        record_locator_closed_count: v.record_locator_closed_count,
        unrecovered_count: v.unrecovered_count,
        failed_steps: v.failed_steps
      }))
    ), y = C(() => {
      const v = [], p = [], x = /* @__PURE__ */ new Set(), k = (De) => {
        x.has(De) || (v.push({ name: De }), x.add(De));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: v, links: p };
      k("Checkin Init"), k("Booking Retrieval"), k("Booking Retrieved"), k("Completed"), k("Closed with BP");
      const w = a.checkinData.total_checkin_initiated || 0, $ = a.checkinData.total_record_locator_init || 0, S = a.checkinData.total_record_locator_init_abandoned || 0, M = a.checkinData.total_checkin_pre_init_abandoned_error, V = a.checkinData.total_checkin_pre_init_abandoned_voluntary, H = M != null || V != null, B = H ? Math.max(Number(M) || 0, 0) : 0, T = H ? Math.max(Number(V) || 0, 0) : 0, D = a.checkinData.total_record_locator_init_abandoned_error, L = a.checkinData.total_record_locator_init_abandoned_voluntary, I = D != null || L != null, G = I ? Math.max(Number(D) || 0, 0) : 0, Q = I ? Math.max(Number(L) || 0, 0) : 0, ne = I ? Math.max(S - G - Q, 0) : S, re = $ - S, ge = a.checkinData.total_record_locator_started || 0, q = a.checkinData.total_record_locator_completed || 0, P = a.checkinData.total_record_locator_closed || 0, j = a.checkinData.total_record_locator_unrecovered || 0;
      $ > 0 && p.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: $,
        label: ye($, w)
      });
      const K = w - $;
      H ? (T > 0 && (k("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: T,
        label: ye(T, w)
      })), B > 0 && (k("Booking not retreived"), p.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: B,
        label: ye(B, w)
      }))) : K > 0 && (k("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: ye(K, w)
      })), I ? (G > 0 && (k("Error"), p.push({
        source: "Booking Retrieval",
        target: "Error",
        value: G,
        label: ye(G, w)
      })), Q > 0 && (k("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: Q,
        label: ye(Q, w)
      })), ne > 0 && (k("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: ne,
        label: ye(ne, w)
      }))) : S > 0 && (k("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: S,
        label: ye(S, w)
      })), re > 0 && p.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: re,
        label: ye(re, w)
      }), q > 0 && p.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: q,
        label: ye(q, ge)
      }), j > 0 && (k("Errors"), p.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: j,
        label: ye(j, ge)
      }));
      const ce = ge - (q + j);
      ce > 0 && (k("Abandoned (Flow)"), p.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: ce,
        label: ye(ce, ge)
      }));
      const ve = q - P;
      return ve > 0 && (k("BP Error"), p.push({
        source: "Completed",
        target: "BP Error",
        value: ve,
        label: ye(ve, ge)
      })), P > 0 && p.push({
        source: "Completed",
        target: "Closed with BP",
        value: P,
        label: ye(P, ge)
      }), { nodes: v, links: p };
    });
    return t({ isDark: i }), (v, p) => (m(), ee(Ce, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", o0, [
          y.value.nodes.length > 0 ? (m(), _("div", s0, [
            N(Jt, {
              data: y.value,
              height: "500px",
              "use-gradient": !1,
              "node-gap": 24
            }, null, 8, ["data"])
          ])) : z("", !0),
          f.value && f.value.length > 0 ? (m(), _("div", i0, [
            u("div", r0, [
              N(ct, {
                columns: b,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: x }) => [
                  u("span", l0, A(l(String(x.date))), 1)
                ]),
                "cell-checkinInit": R(({ row: x }) => [
                  u("span", null, A(r(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": R(({ row: x }) => [
                  u("span", null, A(h(
                    x.record_locator_init_count,
                    x.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": R(({ row: x }) => [
                  u("span", null, A(h(
                    x.record_locator_started_count,
                    x.record_locator_init_count
                  )), 1)
                ]),
                "cell-completed": R(({ row: x }) => [
                  u("span", null, A(h(
                    x.record_locator_completed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-closed": R(({ row: x }) => [
                  u("span", c0, A(h(
                    x.record_locator_closed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-failed": R(({ row: x }) => [
                  u("span", d0, A(h(
                    x.unrecovered_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-reasons": R(({ row: x }) => [
                  Array.isArray(x.failed_steps) && x.failed_steps.length > 0 ? (m(), _("div", u0, [
                    (m(!0), _(se, null, fe(x.failed_steps, (k) => (m(), _("div", {
                      key: k.step_name,
                      class: "reason-item"
                    }, [
                      u("span", h0, A(c(k.step_name)) + ":", 1),
                      u("span", f0, A(k.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), _("div", g0, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (m(), _("div", p0, [
            u("div", m0, [
              u("div", b0, [
                N(E(at), { class: "empty-icon" })
              ]),
              p[0] || (p[0] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
              p[1] || (p[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), y0 = /* @__PURE__ */ me(v0, [["__scopeId", "data-v-70c373c1"]]), x0 = { class: "card-body" }, _0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, k0 = { class: "w-full min-w-0" }, w0 = { class: "segment-plain" }, C0 = { class: "segment-plain" }, $0 = { class: "segment-plain" }, S0 = { class: "percentage-value" }, M0 = { class: "percentage-value" }, D0 = { class: "percentage-value success" }, A0 = {
  key: 1,
  class: "empty-state"
}, T0 = /* @__PURE__ */ ie({
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
      () => a.data.map((f, b) => ({
        id: `segment-${b}-${f.departure_airport}-${f.arrival_airport}-${f.segment_init_count}-${f.segment_started_count}`,
        departure_airport: f.departure_airport,
        conexion_airport: f.conexion_airport,
        arrival_airport: f.arrival_airport,
        segment_init_count: f.segment_init_count,
        segment_started_count: f.segment_started_count,
        segment_completed_count: f.segment_completed_count,
        segment_closed_count: f.segment_closed_count
      }))
    ), c = (f, b) => !b || b === 0 || !f ? "0%" : `${Math.round(f / b * 100)}%`, d = (f) => !f || f === "None" ? "-" : String(f).trim().replace(/_[0-9]+$/i, ""), h = (f) => {
      const b = d(f?.departure_airport), g = d(f?.arrival_airport);
      return b === "-" || g === "-" ? !1 : b === g;
    };
    return t({ isDark: i }), (f, b) => (m(), ee(Ce, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !a.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", x0, [
          a.data.length > 0 ? (m(), _("section", _0, [
            u("div", k0, [
              N(ct, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": R(({ row: g }) => [
                  u("span", w0, A(d(g.departure_airport)), 1)
                ]),
                "cell-connection": R(({ row: g }) => [
                  u("span", {
                    class: te(["segment-plain", {
                      "segment-plain--muted": d(g.conexion_airport) === "-"
                    }])
                  }, A(d(g.conexion_airport)), 3)
                ]),
                "cell-arrival": R(({ row: g }) => [
                  u("span", C0, A(d(g.arrival_airport)), 1)
                ]),
                "cell-trip": R(({ row: g }) => [
                  u("span", $0, A(h(g) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": R(({ row: g }) => [
                  Ae(A(E(le)(g.segment_init_count)), 1)
                ]),
                "cell-started": R(({ row: g }) => [
                  u("span", S0, A(c(
                    g.segment_started_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-completed": R(({ row: g }) => [
                  u("span", M0, A(c(
                    g.segment_completed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-closed": R(({ row: g }) => [
                  u("span", D0, A(c(
                    g.segment_closed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (m(), _("section", A0, [...b[0] || (b[0] = [
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
}), hr = /* @__PURE__ */ me(T0, [["__scopeId", "data-v-b8704d3c"]]), B0 = { class: "checkin-container__body" }, L0 = /* @__PURE__ */ ie({
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
    return (c, d) => (m(), ee(Ce, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[1] || (d[1] = (h) => a("open"))
    }, {
      default: R(() => [
        u("div", B0, [
          e.showCheckin ? (m(), ee(ur, {
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
}), P0 = /* @__PURE__ */ me(L0, [["__scopeId", "data-v-cf0fe2d3"]]), E0 = { class: "card-body" }, R0 = { class: "chart-section" }, I0 = { class: "chart-wrapper" }, F0 = {
  key: 1,
  class: "empty-chart"
}, O0 = { class: "payment-success-summary" }, V0 = {
  key: 0,
  class: "disruption-daily-section"
}, z0 = { class: "w-full min-w-0" }, N0 = { class: "font-medium text-center" }, j0 = { class: "text-center" }, H0 = { class: "text-center" }, W0 = { class: "percentage-text" }, K0 = { class: "text-center" }, Y0 = { class: "abandoned-value" }, U0 = { class: "badges-container badges-wrap" }, q0 = { class: "badges-container badges-wrap" }, X0 = {
  key: 1,
  class: "empty-state"
}, G0 = /* @__PURE__ */ ie({
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
    function n(v) {
      return v;
    }
    const a = e, o = t, s = (v) => {
      o("export", v);
    }, i = C(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (v, p) => new Date(v.date).getTime() - new Date(p.date).getTime()
    ) : []), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], l = C(
      () => i.value.map((v) => ({
        id: v.date,
        ...v
      }))
    ), c = C(() => a.data?.total_payment_success || []), d = C(() => {
      const v = c.value;
      return v.length === 0 ? f(0) : v.map((p) => `${p.currency} ${f(p.total_value)}`).join(" · ");
    }), h = (v, p) => pn(v, p), f = (v) => Le(v), b = (v) => (v ?? []).reduce((p, x) => p + (x.count ?? 0), 0), g = (v) => typeof v.sell_success_count == "number" ? v.sell_success_count : b(v.payment_success_total), y = C(() => {
      const v = a.data, p = v.total_disruption_conversations || 0, x = v.total_disruption_initiated || 0, k = v.total_voluntary || 0, w = v.total_involuntary || 0, $ = v.total_accepted || 0, S = v.total_confirmed || 0, M = typeof v.total_sell_success == "number" ? v.total_sell_success : b(v.total_payment_success), V = v.total_sell_failed || 0, H = Math.max(0, p - x), B = Math.max(
        0,
        x - k - w
      ), T = Math.max(0, w - $), D = Math.max(0, k - S), L = V, I = Math.max(0, S - M - L), G = (re, ge) => ye(re, ge), Q = [
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
        label: G(x, p)
      }), H > 0 && ne.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: H,
        label: G(H, p)
      }), k > 0 && ne.push({
        source: "Started",
        target: "Voluntary",
        value: k,
        label: G(k, p)
      }), w > 0 && ne.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: G(w, p)
      }), B > 0 && ne.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: G(B, p)
      }), $ > 0 && ne.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: G($, p)
      }), T > 0 && ne.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: T,
        label: G(T, p)
      }), S > 0 && ne.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: G(S, p)
      }), D > 0 && ne.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: D,
        label: G(D, p)
      }), M > 0 && ne.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: G(M, p)
      }), L > 0 && ne.push({
        source: "Confirmed",
        target: "Rejected",
        value: L,
        label: G(L, p)
      }), I > 0 && ne.push({
        source: "Confirmed",
        target: "Not Paid",
        value: I,
        label: G(I, p)
      }), { nodes: Q, links: ne };
    });
    return (v, p) => (m(), ee(Ce, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: p[0] || (p[0] = (x) => o("open"))
    }, {
      headerExport: R(() => [
        e.enableExport && !a.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", E0, [
          u("section", R0, [
            u("div", I0, [
              y.value.nodes.length > 0 && y.value.links.length > 0 ? (m(), ee(Jt, {
                key: 0,
                data: y.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])) : (m(), _("div", F0, [...p[1] || (p[1] = [
                u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          u("section", O0, [
            N(xe, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (m(), _("section", V0, [
            p[2] || (p[2] = u("div", { class: "section-header" }, [
              u("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            u("div", z0, [
              N(ct, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: x }) => [
                  u("span", N0, A(E(We)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": R(({ row: x }) => [
                  u("span", j0, A(E(le)(Number(x.disruption_conversations))), 1)
                ]),
                "cell-started": R(({ row: x }) => [
                  u("span", H0, [
                    Ae(A(E(le)(Number(x.disruption_initiated_count))) + " ", 1),
                    u("span", W0, " (" + A(h(
                      Number(x.disruption_initiated_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": R(({ row: x }) => [
                  u("span", K0, [
                    u("span", Y0, A(E(le)(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count)
                    )) + " (" + A(h(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": R(({ row: x }) => [
                  u("div", U0, [
                    (m(!0), _(se, null, fe([x], (k, w) => (m(), _(se, { key: w }, [
                      N(Ue, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: R(() => [
                          Ae(" VOL " + A(E(le)(k.voluntary_count)) + " (" + A(h(
                            k.voluntary_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "success" }, {
                        default: R(() => [
                          Ae(" Confirm " + A(E(le)(k.confirmed_count)) + " (" + A(h(
                            k.confirmed_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "warning" }, {
                        default: R(() => [
                          Ae(" Not Confirm " + A(E(le)(k.voluntary_count - k.confirmed_count)) + " (" + A(h(
                            k.voluntary_count - k.confirmed_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "danger" }, {
                        default: R(() => [
                          Ae(" Reject " + A(E(le)(k.sell_failed_count)) + " (" + A(h(
                            k.sell_failed_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "orange" }, {
                        default: R(() => [
                          Ae(" Not Paid " + A(E(le)(
                            Math.max(
                              0,
                              k.confirmed_count - g(k) - k.sell_failed_count
                            )
                          )) + " (" + A(h(
                            Math.max(
                              0,
                              k.confirmed_count - g(k) - k.sell_failed_count
                            ),
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: R(() => [
                          Ae(" Finish " + A(E(le)(g(k))) + " (" + A(h(
                            g(k),
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (m(!0), _(se, null, fe(k.payment_success_total || [], ($) => (m(), ee(Ue, {
                        key: `${k.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: R(() => [
                          Ae(A($.currency) + " " + A(f($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": R(({ row: x }) => [
                  u("div", q0, [
                    (m(!0), _(se, null, fe([x], (k, w) => (m(), _(se, { key: w }, [
                      N(Ue, { color: "purple" }, {
                        default: R(() => [
                          Ae(" INV " + A(E(le)(k.involuntary_count)) + " (" + A(h(
                            k.involuntary_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "danger" }, {
                        default: R(() => [
                          Ae(" Human " + A(E(le)(k.involuntary_count - k.accepted_count)) + " (" + A(h(
                            k.involuntary_count - k.accepted_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "success" }, {
                        default: R(() => [
                          Ae(" Accept " + A(E(le)(k.accepted_count)) + " (" + A(h(
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
          ])) : (m(), _("section", X0, [...p[3] || (p[3] = [
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
}), Z0 = /* @__PURE__ */ me(G0, [["__scopeId", "data-v-ffc4fd8a"]]), Q0 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, J0 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, eb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, tb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, nb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, ab = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ob = /* @__PURE__ */ ie({
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
    const a = e, o = n, s = (b) => {
      o("export", b);
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
      const b = d.value, g = b.total_airline_information_retrieved + b.total_booking_info_retrieved + b.total_flight_status_retrieved, y = (x) => g > 0 ? (x / g * 100).toFixed(1) : "0.0", v = b.total_faq_events, p = v > 0 ? `${(b.total_documents_found / v * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: l.airline_information,
          value: `${y(b.total_airline_information_retrieved)}%`,
          subvalue: `${le(b.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: l.booking_info,
          value: `${y(b.total_booking_info_retrieved)}%`,
          subvalue: `${le(b.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: l.flight_status,
          value: `${y(b.total_flight_status_retrieved)}%`,
          subvalue: `${le(b.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: le(b.total_documents_found),
          subvalue: p
        }
      ];
    }), f = (b) => {
      if (!b) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = b.faq_by_day || [];
      if (g.length > 0) {
        const y = g.map(
          (k) => We(k.date).format("MMM DD")
        ), v = g.map(
          (k) => k.airline_information_retrieved_count || 0
        ), p = g.map(
          (k) => k.flight_status_retrieved_count || 0
        ), x = g.map(
          (k) => k.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: y,
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
              data: p,
              borderColor: l.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: x,
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
      (b) => {
        f(b ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (b, g) => (m(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !a.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", Q0, [
          u("div", J0, [
            c.value.labels && c.value.labels.length ? (m(), _("section", eb, [
              u("div", tb, [
                N(vt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              u("div", nb, [
                (m(!0), _(se, null, fe(h.value, (y) => (m(), ee(xe, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: y.value,
                  subvalue: y.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (m(), _("section", ab, [...g[0] || (g[0] = [
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
}), sb = /* @__PURE__ */ me(ob, [["__scopeId", "data-v-b6ea961f"]]), ib = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, rb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, lb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, cb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, db = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ub = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, hb = { class: "max-w-[360px] px-4 text-center" }, fb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, gb = /* @__PURE__ */ ie({
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
    }, o = e, s = n, i = (b) => {
      s("export", b);
    }, r = Se(o, "theme"), { isDark: l } = Me(r), c = C(() => {
      const b = o.data?.agents_by_day || {}, g = Object.keys(b).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const y = /* @__PURE__ */ new Set();
      for (const x of Object.values(b))
        for (const k of Object.keys(x))
          y.add(k);
      const p = Array.from(y).map((x) => {
        const k = x.toLowerCase(), w = a[k] || a[x] || "#94a3b8";
        return {
          label: x.charAt(0).toUpperCase() + x.slice(1).replace(/_/g, " "),
          data: g.map(($) => b[$]?.[x] || 0),
          borderColor: w
        };
      });
      return {
        labels: g.map((x) => We(x).format("MMM DD")),
        datasets: p
      };
    }), d = C(() => {
      const b = o.data?.agents_by_day || {}, g = {};
      for (const v of Object.values(b))
        for (const [p, x] of Object.entries(v))
          g[p] = (g[p] || 0) + x;
      const y = Object.values(g).reduce((v, p) => v + p, 0);
      return y === 0 ? [] : Object.entries(g).sort(([, v], [, p]) => p - v).map(([v, p]) => {
        const x = v.toLowerCase();
        return {
          name: v,
          label: v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, " "),
          total: p,
          percentage: (p / y * 100).toFixed(1),
          color: a[x] || a[v] || "#94a3b8"
        };
      });
    }), h = C(() => d.value.slice(0, 4)), f = C(() => {
      const b = h.value.length;
      if (!(b <= 0))
        return { gridTemplateColumns: `repeat(${b}, minmax(0, 1fr))` };
    });
    return t({ isDark: l }), (b, g) => (m(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !o.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", ib, [
          u("div", rb, [
            c.value.labels && c.value.labels.length ? (m(), _("section", lb, [
              u("div", cb, [
                N(vt, {
                  data: c.value,
                  options: e.options,
                  theme: r.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              h.value.length ? (m(), _("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(f.value)
              }, [
                (m(!0), _(se, null, fe(h.value, (y) => (m(), ee(xe, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${E(le)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : z("", !0)
            ])) : d.value.length ? (m(), _("section", db, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: we(f.value)
              }, [
                (m(!0), _(se, null, fe(h.value, (y) => (m(), ee(xe, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${E(le)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : z("", !0),
            d.value.length ? z("", !0) : (m(), _("section", ub, [
              u("div", hb, [
                u("div", fb, [
                  N(E(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), pb = /* @__PURE__ */ me(gb, [["__scopeId", "data-v-932f6fac"]]), mb = { class: "card-body" }, bb = {
  key: 0,
  class: "chart-section"
}, vb = { class: "chart-wrapper" }, yb = {
  key: 1,
  class: "record-locator-daily-section"
}, xb = { class: "w-full min-w-0" }, _b = { class: "cell-plain font-medium" }, kb = { class: "cell-plain text-center" }, wb = { class: "cell-plain text-center" }, Cb = { class: "cell-plain text-center" }, $b = { class: "cell-plain text-center" }, Sb = { class: "cell-plain text-center success-value" }, Mb = { class: "cell-plain text-center failed-value" }, Db = { class: "cell-plain text-center warning-value" }, Ab = { class: "cell-plain text-center" }, Tb = { class: "cell-plain text-center failed-value" }, Bb = {
  key: 2,
  class: "empty-state"
}, Lb = /* @__PURE__ */ ie({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me(Se(a, "theme")), r = C(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (v, p) => new Date(v.date).getTime() - new Date(p.date).getTime()
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
    ), f = C(() => a.data), b = (v, p) => pn(v, p), g = (v, p) => {
      const x = le(v), k = b(v, p);
      return `${x} (${k})`;
    }, y = C(() => {
      const v = [], p = [], x = /* @__PURE__ */ new Set(), k = (K) => {
        x.has(K) || (v.push({ name: K }), x.add(K));
      };
      if (!f.value.total_checkin_initiated)
        return { nodes: v, links: p };
      k("Checkin Init"), k("Booking retrive"), k("Checkin Started"), k("Checkin Completed"), k("Checkin Closed");
      const w = f.value.total_checkin_initiated, $ = f.value.total_record_locator_init, S = f.value.total_record_locator_started, M = f.value.total_record_locator_completed, V = f.value.total_record_locator_closed, H = f.value.total_record_locator_failed, B = f.value.total_record_locator_abandoned, T = f.value.total_record_locator_init_abandoned, D = f.value.total_checkin_pre_init_abandoned_error, L = f.value.total_checkin_pre_init_abandoned_voluntary, I = D != null || L != null, G = I ? Math.max(Number(D) || 0, 0) : 0, Q = I ? Math.max(Number(L) || 0, 0) : 0, ne = f.value.total_record_locator_init_abandoned_error, re = f.value.total_record_locator_init_abandoned_voluntary, ge = ne != null || re != null, q = ge ? Math.max(Number(ne) || 0, 0) : 0, P = ge ? Math.max(Number(re) || 0, 0) : 0;
      $ > 0 && p.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: ye($, w)
      });
      const j = w - $;
      return I ? (Q > 0 && (k("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ye(Q, w)
      })), G > 0 && (k("Booking not retreived"), p.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: G,
        label: ye(G, w)
      }))) : j > 0 && (k("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: j,
        label: ye(j, w)
      })), S > 0 && p.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: S,
        label: ye(S, w)
      }), ge ? (q > 0 && (k("Error"), p.push({
        source: "Booking retrive",
        target: "Error",
        value: q,
        label: ye(q, w)
      })), P > 0 && (k("Abandoned (Started)"), p.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: P,
        label: ye(P, w)
      }))) : T > 0 && (k("Abandoned (Started)"), p.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: T,
        label: ye(T, w)
      })), M > 0 && p.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: M,
        label: ye(M, S)
      }), V > 0 && p.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: V,
        label: ye(V, S)
      }), H > 0 && (k("Checkin Failed"), p.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: H,
        label: ye(H, S)
      })), B > 0 && (k("Abandoned (Flow)"), p.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: B,
        label: ye(B, S)
      })), { nodes: v, links: p };
    });
    return t({ isDark: i }), (v, p) => (m(), ee(Ce, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !a.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", mb, [
          y.value.nodes.length > 0 ? (m(), _("section", bb, [
            u("div", vb, [
              N(Jt, {
                data: y.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])
            ])
          ])) : z("", !0),
          r.value && r.value.length > 0 ? (m(), _("section", yb, [
            u("div", xb, [
              N(ct, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: x }) => [
                  u("span", _b, A(E(We)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": R(({ row: x }) => [
                  u("span", kb, A(E(le)(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": R(({ row: x }) => [
                  u("span", wb, A(g(
                    x.record_locator_init_count,
                    x.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": R(({ row: x }) => [
                  u("span", Cb, A(E(le)(x.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": R(({ row: x }) => [
                  u("span", $b, A(g(
                    x.record_locator_completed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": R(({ row: x }) => [
                  u("span", Sb, A(g(
                    x.record_locator_closed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": R(({ row: x }) => [
                  u("span", Mb, A(g(
                    x.record_locator_failed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": R(({ row: x }) => [
                  u("span", Db, A(g(
                    x.record_locator_abandoned_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": R(({ row: x }) => [
                  u("span", Ab, A(E(le)(
                    x.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": R(({ row: x }) => [
                  u("span", Tb, A(E(le)(
                    x.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), _("section", Bb, [...p[0] || (p[0] = [
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
}), Pb = /* @__PURE__ */ me(Lb, [["__scopeId", "data-v-68053ff9"]]), Eb = { class: "card-body" }, Rb = {
  key: 0,
  class: "chart-section"
}, Ib = {
  key: 1,
  class: "empty-state"
}, Fb = {
  key: 2,
  class: "comparison-section"
}, Ob = { class: "comparison-grid" }, Vb = /* @__PURE__ */ ie({
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
      for (const y of s.data?.sales_by_channel_by_day ?? [])
        for (const v of Object.keys(y.channels))
          g.add(v);
      return Array.from(g).sort();
    }), d = (g, y) => a[g.toLowerCase()] ?? o[y % o.length];
    function h(g) {
      return g.replace(/_/g, " ").toUpperCase();
    }
    function f(g) {
      if (g.delta === null) return "No previous data";
      const y = le(g.previous), v = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${y})` : `${g.delta > 0 ? "↑" : "↓"} ${v} vs prev. period (${y})`;
    }
    const b = C(() => {
      const g = s.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const y = g.map((p) => We(p.date).format("MMM-DD")), v = c.value.map((p, x) => ({
        label: p,
        data: g.map((k) => k.channels[p] ?? 0),
        backgroundColor: d(p, x),
        borderRadius: 4
      }));
      return { labels: y, datasets: v };
    });
    return t({ isDark: l }), (g, y) => (m(), ee(Ce, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !s.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: r,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", Eb, [
          b.value.labels.length > 0 ? (m(), _("section", Rb, [
            N(kt, {
              data: b.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (m(), _("section", Ib, [...y[0] || (y[0] = [
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
          e.channelComparison.length > 0 ? (m(), _("section", Fb, [
            u("div", Ob, [
              (m(!0), _(se, null, fe(e.channelComparison, (v, p) => (m(), ee(E(xe), {
                key: v.channel,
                color: d(v.channel, p),
                title: h(v.channel),
                value: E(le)(v.current),
                subvalue: f(v)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : z("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), fr = /* @__PURE__ */ me(Vb, [["__scopeId", "data-v-4879d791"]]), zb = { class: "card-body" }, Nb = {
  key: 0,
  class: "chart-section"
}, jb = { class: "chart-wrapper" }, Hb = {
  key: 1,
  class: "empty-state"
}, Wb = { class: "seller-value-cards" }, Kb = {
  key: 2,
  class: "seller-daily-section"
}, Yb = { class: "w-full min-w-0" }, Ub = { class: "sl-cell font-medium" }, qb = { class: "sl-cell text-center" }, Xb = { class: "sl-cell text-center" }, Gb = { class: "sl-cell text-center" }, Zb = { class: "sl-cell text-center" }, Qb = { class: "sl-cell text-center" }, Jb = { class: "sl-cell text-center success-value" }, ev = {
  key: 0,
  class: "currency-cell-list"
}, tv = {
  key: 1,
  class: "empty-cell"
}, nv = { class: "sl-cell text-center success-value" }, av = { class: "sl-cell text-center" }, ov = { class: "sl-cell text-center success-value" }, sv = {
  key: 0,
  class: "currency-cell-list"
}, iv = {
  key: 1,
  class: "empty-cell"
}, rv = { class: "sl-cell text-center success-value" }, lv = { class: "sl-cell text-center" }, cv = { class: "sl-cell text-center success-value" }, dv = {
  key: 0,
  class: "currency-cell-list"
}, uv = { key: 1 }, hv = {
  key: 0,
  class: "failed-reasons"
}, fv = { class: "reason-name" }, gv = { class: "reason-count" }, pv = {
  key: 1,
  class: "empty-cell"
}, mv = /* @__PURE__ */ ie({
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
        const L = T.findIndex(
          (I) => I.date === D.date
        );
        L !== -1 ? T[L] = { ...T[L], reasons: D.reasons } : T.push({
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
        (D, L) => new Date(D.date).getTime() - new Date(L.date).getTime()
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
    ), h = C(() => o.sellerData), f = C(() => o.failedData), b = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), g = C(
      () => Array.isArray(o.sellerData.total_value_sell_bank_transfer) ? o.sellerData.total_value_sell_bank_transfer : []
    ), y = C(
      () => Array.isArray(o.sellerData.total_value_sell_cash_option) ? o.sellerData.total_value_sell_cash_option : []
    ), v = C(() => {
      const T = b.value;
      return T.length > 0 ? T.map(
        (D) => `${D.currency} ${Vt(D.total_value)}`
      ).join(" · ") : B(o.sellerData.total_value_sell_success);
    });
    function p(T) {
      return T.length > 0 ? T.map(
        (D) => `${D.currency} ${Vt(D.total_value)}`
      ).join(" · ") : "—";
    }
    const x = C(
      () => p(g.value)
    ), k = C(
      () => p(y.value)
    ), w = (T) => T.replace(/_/g, " ").replace(/\b\w/g, (D) => D.toUpperCase()), $ = (T) => `Failed:
${w(T)}`, S = C(() => {
      const {
        total_seller_conversations: T = 0,
        total_sell_started: D = 0,
        total_sell_booking_created: L = 0,
        total_sell_success: I = 0,
        total_sell_bank_transfer: G = 0,
        total_sell_cash_option: Q = 0,
        total_sell_success_bank_transfer: ne = 0,
        total_sell_success_cash: re = 0
      } = h.value, { failed_by_reason_by_day: ge = [] } = f.value;
      if (T === 0) return { nodes: [], links: [] };
      const q = Math.max(
        0,
        I - (ne ?? 0) - (re ?? 0)
      ), P = [
        { name: "Sell Initiated", value: T, status: "success" },
        { name: "Sell Started", value: D, status: "success" },
        { name: "Booking Created", value: L, status: "success" },
        { name: "Sell Success", value: q, status: "success" }
      ], j = [], K = T - D;
      K > 0 && (P.push({
        name: "Abandoned (Init)",
        value: K,
        status: "abandon"
      }), j.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: K,
        label: ye(K, T)
      })), D > 0 && j.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: D,
        label: ye(D, T)
      });
      const ce = ge.reduce(
        (O, W) => (W.reasons && Array.isArray(W.reasons) && W.reasons.forEach((U) => {
          const de = U.reason, Z = U.failed_count;
          O[de] = (O[de] || 0) + Z;
        }), O),
        {}
      );
      L > 0 && j.push({
        source: "Sell Started",
        target: "Booking Created",
        value: L,
        label: ye(L, T)
      }), G > 0 && (P.push({ name: "Bank Transfer", value: G, status: "success" }), j.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: G,
        label: ye(G, T)
      })), Q > 0 && (P.push({ name: "Cash Option", value: Q, status: "success" }), j.push({
        source: "Booking Created",
        target: "Cash Option",
        value: Q,
        label: ye(Q, T)
      })), q > 0 && j.push({
        source: "Booking Created",
        target: "Sell Success",
        value: q,
        label: ye(q, T)
      }), (ne ?? 0) > 0 && (P.push({
        name: "Bank Transfer Success",
        value: ne ?? 0,
        status: "success"
      }), j.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: ne ?? 0,
        label: ye(ne ?? 0, T)
      })), (re ?? 0) > 0 && (P.push({
        name: "Cash Option Success",
        value: re ?? 0,
        status: "success"
      }), j.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: re ?? 0,
        label: ye(re ?? 0, T)
      }));
      const ve = L - q - G - Q;
      ve > 0 && (P.push({
        name: "Failed at Completion",
        value: ve,
        status: "error"
      }), j.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: ve,
        label: ye(ve, T)
      }));
      const De = D - L;
      if (De > 0 && (P.push({
        name: "Failed at Booking",
        value: De,
        status: "error"
      }), j.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: De,
        label: ye(De, T)
      })), Object.keys(ce).length > 0) {
        const O = Object.values(ce).reduce(
          (U, de) => U + de,
          0
        ), W = De - O;
        Object.entries(ce).filter(([, U]) => U > 0).sort(([, U], [, de]) => de - U).forEach(([U, de]) => {
          const Z = `Failed: ${U}`;
          P.push({
            name: Z,
            value: de,
            status: "error",
            label: $(U)
          }), j.push({
            source: "Failed at Booking",
            target: Z,
            value: de,
            label: ye(de, T)
          });
        }), W > 0 && (P.push({
          name: "Failed: Without Reason",
          value: W,
          status: "error",
          label: `Failed:
Without Reason`
        }), j.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: W,
          label: ye(W, T)
        }));
      }
      return { nodes: P, links: j };
    }), M = (T, D) => pn(T, D), V = (T, D) => {
      const L = le(T), I = M(T, D);
      return `${L} (${I})`;
    }, H = (T) => T == null ? 0 : typeof T == "number" ? T : Array.isArray(T) ? T.reduce((D, L) => D + (L.total_value || 0), 0) : 0, B = (T) => Vt(H(T));
    return t({ isDark: r }), (T, D) => (m(), ee(Ce, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !o.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", zb, [
          S.value.nodes.length > 0 ? (m(), _("section", Nb, [
            u("div", jb, [
              N(Jt, {
                data: S.value,
                height: "560px"
              }, null, 8, ["data"])
            ])
          ])) : (m(), _("section", Hb, [...D[0] || (D[0] = [
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
          u("section", Wb, [
            N(xe, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: v.value
            }, null, 8, ["value"]),
            N(xe, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: x.value
            }, null, 8, ["value"]),
            N(xe, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: k.value
            }, null, 8, ["value"])
          ]),
          l.value && l.value.length > 0 ? (m(), _("section", Kb, [
            u("div", Yb, [
              N(ct, {
                columns: c,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: L }) => [
                  u("span", Ub, A(E(We)(String(L.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": R(({ row: L }) => [
                  u("span", qb, A(E(le)(Number(L.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": R(({ row: L }) => [
                  u("span", Xb, A(V(
                    L.sell_started_count,
                    L.seller_conversations || L.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": R(({ row: L }) => [
                  u("span", Gb, A(V(
                    L.sell_get_quote_count,
                    L.seller_conversations || L.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": R(({ row: L }) => [
                  u("span", Zb, A(V(
                    L.sell_booking_created_count,
                    L.seller_conversations || L.sell_started_count
                  )), 1)
                ]),
                "cell-bankTransfer": R(({ row: L }) => [
                  u("span", Qb, A(E(le)(Number(L.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": R(({ row: L }) => [
                  u("span", Jb, [
                    Array.isArray(
                      L.daily_value_sell_success_bank_transfer
                    ) && L.daily_value_sell_success_bank_transfer.length > 0 ? (m(), _("div", ev, [
                      (m(!0), _(se, null, fe(L.daily_value_sell_success_bank_transfer, (I) => (m(), _("span", {
                        key: `${L.date}-bt-success-${I.currency}`
                      }, A(I.currency) + " " + A(E(Vt)(I.total_value)), 1))), 128))
                    ])) : (m(), _("span", tv, "-"))
                  ])
                ]),
                "cell-btSuccess": R(({ row: L }) => [
                  u("span", nv, A(E(le)(
                    Number(
                      L.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-cashOption": R(({ row: L }) => [
                  u("span", av, A(E(le)(Number(L.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": R(({ row: L }) => [
                  u("span", ov, [
                    Array.isArray(
                      L.daily_value_sell_success_cash
                    ) && L.daily_value_sell_success_cash.length > 0 ? (m(), _("div", sv, [
                      (m(!0), _(se, null, fe(L.daily_value_sell_success_cash, (I) => (m(), _("span", {
                        key: `${L.date}-co-success-${I.currency}`
                      }, A(I.currency) + " " + A(E(Vt)(I.total_value)), 1))), 128))
                    ])) : (m(), _("span", iv, "-"))
                  ])
                ]),
                "cell-cashSuccess": R(({ row: L }) => [
                  u("span", rv, A(E(le)(
                    Number(L.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": R(({ row: L }) => [
                  u("span", lv, A(V(
                    L.sell_success_count,
                    L.seller_conversations || L.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": R(({ row: L }) => [
                  u("span", cv, [
                    Array.isArray(L.daily_value_sell_success) && L.daily_value_sell_success.length > 0 ? (m(), _("div", dv, [
                      (m(!0), _(se, null, fe(L.daily_value_sell_success, (I) => (m(), _("span", {
                        key: `${L.date}-${I.currency}`
                      }, A(I.currency) + " " + A(E(Vt)(I.total_value)), 1))), 128))
                    ])) : (m(), _("span", uv, A(B(
                      L.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": R(({ row: L }) => [
                  (L.reasons || []).length > 0 ? (m(), _("div", hv, [
                    (m(!0), _(se, null, fe(L.reasons || [], (I) => (m(), _("div", {
                      key: I.reason,
                      class: "failed-reason-item"
                    }, [
                      u("span", fv, A(I.reason) + ":", 1),
                      u("span", gv, A(I.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), _("div", pv, "-"))
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
}), gr = /* @__PURE__ */ me(mv, [["__scopeId", "data-v-bdae6055"]]), bv = { class: "seller-container__body" }, vv = /* @__PURE__ */ ie({
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
    return (c, d) => (m(), ee(Ce, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[2] || (d[2] = (h) => a("open"))
    }, {
      default: R(() => [
        u("div", bv, [
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
}), yv = /* @__PURE__ */ me(vv, [["__scopeId", "data-v-bd0ec4ff"]]), xv = { class: "card-body" }, _v = {
  key: 0,
  class: "chart-section"
}, kv = {
  key: 1,
  class: "empty-state"
}, wv = { class: "empty-state-content" }, Cv = { class: "empty-icon-wrapper" }, $v = /* @__PURE__ */ ie({
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
        (v) => v.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const b = f.reduce(
        (v, p) => v + (Number(p.conversations) || 0),
        0
      ), g = f.map((v) => {
        const p = v.agent_type?.toLowerCase();
        return a[p] || "#94a3b8";
      }), y = g.map((v) => `${v}80`);
      return {
        labels: f.map((v) => {
          const p = Number(v.conversations) || 0, x = b ? p / b * 100 : 0;
          return `${v.agent_type} - ${p.toLocaleString()} (${x.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((v) => v.conversations),
            backgroundColor: y,
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
              const f = (h.label || "").toString().split(" - ")[0], b = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (v, p) => v + (Number(p) || 0),
                0
              ), y = g ? b / g * 100 : 0;
              return `${f}: ${b.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, f) => (m(), ee(Ce, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", xv, [
          c.value.labels && c.value.labels.length ? (m(), _("section", _v, [
            N(Aa, {
              data: c.value,
              options: d.value
            }, null, 8, ["data", "options"])
          ])) : (m(), _("section", kv, [
            u("div", wv, [
              u("div", Cv, [
                N(E(zp), { class: "empty-icon" })
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
}), Sv = /* @__PURE__ */ me($v, [["__scopeId", "data-v-08639fed"]]), Mv = { class: "card-body" }, Dv = {
  key: 0,
  class: "payment-methods-section"
}, Av = { class: "payment-methods-grid" }, Tv = {
  key: 1,
  class: "empty-state"
}, Bv = { class: "empty-state-content" }, Lv = { class: "empty-icon-wrapper" }, Pv = {
  key: 2,
  class: "payment-method-daily-section"
}, Ev = { class: "w-full min-w-0" }, Rv = { class: "font-medium" }, Iv = { class: "text-center" }, Fv = { class: "text-center success-value" }, Ov = {
  key: 0,
  class: "currency-cell-list"
}, Vv = { class: "payment-tags" }, zv = { class: "tag-name" }, Nv = {
  key: 0,
  class: "tag-amount"
}, jv = {
  key: 1,
  class: "tag-amount"
}, Hv = { class: "tag-count" }, Wv = {
  key: 3,
  class: "empty-table-state"
}, Kv = "Not Registered", Yv = /* @__PURE__ */ ie({
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
    ), b = (M) => {
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
      ), H = (M.payment_method_by_day || []).map((B) => ({
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
        payment_method_by_day: H
      };
    }, g = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [M, V] = a.dates.map(
            (B) => We(B).format("YYYY-MM-DD")
          ), H = await a.fetchFunction(
            a.airlineName,
            M,
            V
          );
          r.value = b(H);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), r.value = b(null);
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
    ], v = (M) => !M || M.toLowerCase() === "unknown" ? Kv : M.replace(/_/g, " "), p = (M) => M == null ? "$0.00" : Le(M), x = (M) => {
      const V = M.total_amount_by_currency;
      return V && V.length > 0 ? V.map((H) => `${H.currency} ${p(H.total_value)}`).join(" · ") : p(M.total_amount);
    }, k = (M) => M ? We(M).format("MMM DD") : "-", w = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), $ = (M) => {
      o("export", M);
    };
    function S() {
      const M = a.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, r.value = b(M));
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
    ), t({ isDark: s }), (M, V) => (m(), ee(Ce, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: V[0] || (V[0] = (H) => o("open"))
    }, {
      headerExport: R(() => [
        e.enableExport && !i.value ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", Mv, [
          l.value ? (m(), _("section", Dv, [
            V[1] || (V[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            u("div", Av, [
              (m(!0), _(se, null, fe(r.value.payment_method_breakdown, (H, B) => (m(), ee(xe, {
                key: H.payment_method,
                class: "payment-method-card-item min-w-0",
                color: y[B % y.length],
                title: v(H.payment_method),
                value: x(H),
                subvalue: `${w(H.count)} ${w(H.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (m(), _("section", Tv, [
            u("div", Bv, [
              u("div", Lv, [
                N(E(jp), { class: "empty-icon" })
              ]),
              V[2] || (V[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
              V[3] || (V[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (m(), _("section", Pv, [
            V[5] || (V[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
            u("div", Ev, [
              N(ct, {
                columns: h,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: H }) => [
                  u("span", Rv, A(k(String(H.date))), 1)
                ]),
                "cell-totalSales": R(({ row: H }) => [
                  u("span", Iv, A(E(le)(H.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": R(({ row: H }) => [
                  u("span", Fv, [
                    Array.isArray(H.total_amount_by_currency) && H.total_amount_by_currency.length > 0 ? (m(), _("div", Ov, [
                      (m(!0), _(se, null, fe(H.total_amount_by_currency, (B) => (m(), _("span", {
                        key: `${H.date}-${B.currency}`
                      }, A(B.currency) + " " + A(p(B.total_value)), 1))), 128))
                    ])) : (m(), _(se, { key: 1 }, [
                      Ae(A(p(Number(H.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": R(({ row: H }) => [
                  u("div", Vv, [
                    (m(!0), _(se, null, fe(Array.isArray(H.payment_methods) ? H.payment_methods : [], (B) => (m(), _("div", {
                      key: B.payment_method,
                      class: "payment-tag"
                    }, [
                      u("span", zv, A(v(B.payment_method)), 1),
                      V[4] || (V[4] = u("span", { class: "tag-separator" }, "•", -1)),
                      !B.total_amount_by_currency || B.total_amount_by_currency.length === 0 ? (m(), _("span", Nv, A(p(B.total_amount)), 1)) : (m(), _("span", jv, A(B.total_amount_by_currency.map(
                        (T) => `${T.currency} ${p(T.total_value)}`
                      ).join(" / ")), 1)),
                      u("span", Hv, "(" + A(w(B.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : l.value ? (m(), _("div", Wv, [...V[6] || (V[6] = [
            u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : z("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Uv = /* @__PURE__ */ me(Yv, [["__scopeId", "data-v-168637eb"]]), qv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Xv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Gv = {
  key: "title-content",
  class: "header-title-group"
}, Zv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Qv = {
  key: 0,
  class: "metric-label metric-label--header"
}, Jv = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, ey = { key: "aside-content" }, ty = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, ny = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, ay = {
  key: "body-content",
  class: "highlight-inner"
}, oy = { class: "card-body" }, sy = { class: "metric-row" }, iy = {
  key: 0,
  class: "metric-prefix"
}, ry = {
  key: 0,
  class: "metric-label"
}, ly = /* @__PURE__ */ ie({
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
    return t({ isDark: a, changePercent: i }), (c, d) => (m(), ee(Ce, {
      collapsible: !1,
      class: te([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": E(a),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: R(() => [
        N(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            e.loading ? (m(), _("div", qv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (m(), _("div", Xv)) : z("", !0)
            ])) : (m(), _("div", Gv, [
              u("div", Zv, [
                _e(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (m(), _("span", Qv, A(e.label), 1)) : z("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: R(() => [
        N(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            e.loading ? (m(), _("div", Jv)) : (m(), _("div", ey, [
              _e(c.$slots, "headerAside", {}, () => [
                s.value ? (m(), _("div", {
                  key: 0,
                  class: te(["change-badge", l.value])
                }, A(r.value), 3)) : z("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: R(() => [
        N(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            e.loading ? (m(), _("div", ty, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? z("", !0) : (m(), _("div", ny))
            ])) : (m(), _("div", ay, [
              u("div", oy, [
                _e(c.$slots, "value", {}, () => [
                  u("div", sy, [
                    e.prefix ? (m(), _("span", iy, A(e.prefix), 1)) : z("", !0),
                    u("span", {
                      class: te(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? z("", !0) : (m(), _("span", ry, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), Dt = /* @__PURE__ */ me(ly, [["__scopeId", "data-v-c81268f4"]]);
function Co(e, t) {
  return m(), _("svg", {
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
const dt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", ht = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", cy = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Ot = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", Tt = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", dy = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], uy = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, hy = ["placeholder", "aria-label"], fy = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, gy = ["aria-selected", "onClick", "onMouseenter"], py = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, my = { class: "min-w-0 flex-1" }, $o = /* @__PURE__ */ ie({
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
    const n = e, a = t, o = `kiut-select-${Ye()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = ae(null), c = ae(null), d = ae(null), h = ae(null), f = ae(null), b = ae(!1), g = ae(0), y = ae(""), v = ae({});
    function p() {
      const q = c.value;
      if (!q) return;
      const P = q.getBoundingClientRect();
      v.value = {
        top: `${P.bottom - 3}px`,
        left: `${P.left}px`,
        width: `${P.width}px`
      };
    }
    const x = C(() => n.options.filter((q) => !q.disabled)), k = C(() => {
      if (!n.searchable) return x.value;
      const q = y.value.trim().toLowerCase();
      return q ? x.value.filter((P) => P.label.toLowerCase().includes(q)) : x.value;
    }), w = C(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), $ = C(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((P) => P.value === n.modelValue)?.label ?? String(n.modelValue));
    function S(q) {
      return `${String(q.value)}-${q.label}`;
    }
    function M(q) {
      return n.modelValue === q.value;
    }
    function V(q, P) {
      const j = M(q), K = g.value === P;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        j ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !j && K ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function H() {
      g.value = Math.max(
        0,
        k.value.findIndex((q) => q.value === n.modelValue)
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
      p(), y.value = "", H(), je(() => B());
    }
    function D() {
      b.value = !1, y.value = "";
    }
    function L(q) {
      a("update:modelValue", q.value), D();
    }
    function I() {
      if (!n.disabled) {
        if (b.value) {
          D();
          return;
        }
        b.value = !0, T();
      }
    }
    function G(q) {
      q.stopPropagation(), !n.disabled && I();
    }
    function Q(q) {
      if (!b.value) return;
      const P = q.target, j = l.value, K = d.value;
      j && !j.contains(P) && (!K || !K.contains(P)) && D();
    }
    function ne(q) {
      n.disabled || (q.key === "ArrowDown" || q.key === "Enter" || q.key === " ") && (q.preventDefault(), b.value || (b.value = !0, T()));
    }
    function re(q) {
      const P = k.value;
      if (q.key === "Escape") {
        q.preventDefault(), D();
        return;
      }
      if (q.key === "ArrowDown") {
        if (q.preventDefault(), P.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (q.key === "ArrowUp") {
        if (q.preventDefault(), P.length === 0) return;
        g.value = P.length - 1, h.value?.focus();
        return;
      }
      if (q.key === "Enter") {
        q.preventDefault();
        const j = P[g.value];
        j && L(j);
      }
    }
    function ge(q) {
      const P = k.value;
      if (q.key === "Escape") {
        q.preventDefault(), D();
        return;
      }
      if (P.length !== 0) {
        if (q.key === "ArrowDown") {
          q.preventDefault(), g.value = Math.min(g.value + 1, P.length - 1);
          return;
        }
        if (q.key === "ArrowUp") {
          if (q.preventDefault(), g.value === 0 && n.searchable) {
            f.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (q.key === "Enter") {
          q.preventDefault();
          const j = P[g.value];
          j && L(j);
        }
      }
    }
    return Ie(y, () => {
      g.value = 0;
    }), Ze(() => {
      document.addEventListener("click", Q);
    }), lt(() => {
      document.removeEventListener("click", Q);
    }), (q, P) => (m(), _("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (m(), _("label", {
        key: 0,
        id: s,
        class: te(E(dt))
      }, A(e.label), 3)) : z("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: te([
          E(ht),
          "flex items-center justify-between gap-2 text-left",
          b.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": b.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: G,
        onKeydown: ne
      }, [
        u("span", {
          class: te([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A($.value), 3),
        N(E(Qt), {
          class: te(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", b.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, dy),
      (m(), ee(un, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: we(v.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (m(), _("div", uy, [
            Ge(u("input", {
              ref_key: "searchInputRef",
              ref: f,
              "onUpdate:modelValue": P[0] || (P[0] = (j) => y.value = j),
              type: "search",
              class: te([E(ht), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: P[1] || (P[1] = Oe(() => {
              }, ["stop"])),
              onKeydown: Oe(re, ["stop"])
            }, null, 42, hy), [
              [Yt, y.value]
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
            k.value.length === 0 ? (m(), _("li", fy, A(e.noResultsText), 1)) : z("", !0),
            (m(!0), _(se, null, fe(k.value, (j, K) => (m(), _("li", {
              key: S(j),
              role: "option",
              "aria-selected": M(j),
              class: te(V(j, K)),
              onClick: Oe((ce) => L(j), ["stop"]),
              onMouseenter: (ce) => g.value = K
            }, [
              e.showOptionCheck ? (m(), _("span", py, [
                M(j) ? (m(), ee(E(Co), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : z("", !0)
              ])) : z("", !0),
              u("span", my, A(j.label), 1)
            ], 42, gy))), 128))
          ], 544)
        ], 4), [
          [Xt, b.value]
        ])
      ]))
    ], 512));
  }
}), by = { class: "card-body" }, vy = { class: "kpi-closed-value" }, yy = { class: "kpi-closed-value__main" }, xy = {
  key: 0,
  class: "kpi-closed-value__pct"
}, _y = { class: "table-view-select flex justify-end" }, ky = { class: "table-section w-full min-w-0" }, wy = { class: "cell-plain" }, Cy = { class: "cell-plain" }, $y = { class: "cell-plain cell-plain--muted" }, Sy = { class: "cell-plain" }, My = { class: "cell-plain" }, Dy = { class: "cell-plain" }, Ay = {
  key: 2,
  class: "empty-state"
}, Ty = 6, By = /* @__PURE__ */ ie({
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
    const a = e, o = n, s = (O) => {
      o("export", O);
    }, { isDark: i } = Me(Se(a, "theme")), r = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function l(O) {
      const W = O?.trim() ?? "";
      return W.length > 0 && !r.has(W);
    }
    function c(O) {
      if (!l(O.agent_email)) return !1;
      const W = O.assigned_count ?? 0, U = O.closed_count ?? 0;
      return W > 0 || U > 0;
    }
    function d(O) {
      return O.closed_count ?? 0;
    }
    function h(O) {
      const W = O?.trim();
      return W || "—";
    }
    const f = C(
      () => (a.data?.agents_by_day ?? []).filter(c)
    ), b = C(() => f.value.length > 0), g = C(() => {
      const O = (a.data?.total_enqueued ?? 0) > 0;
      return b.value || O;
    }), y = ae("by_date"), v = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], p = ae("date"), x = ae("desc");
    Ie(y, (O) => {
      O === "aggregated" ? (p.value = "name", x.value = "asc") : (p.value = "date", x.value = "desc");
    });
    function k(O, W) {
      return W == null ? null : W === 0 ? O > 0 ? 100 : 0 : (O - W) / W * 100;
    }
    function w(O) {
      const W = O.toFixed(1);
      return O > 0 ? `+${W}%` : `${W}%`;
    }
    function $(O, W = !1) {
      const U = W ? -O : O;
      return U > 0 ? "change-badge--up" : U < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function S(O, W) {
      if (O === null) return null;
      const U = k(O, W);
      return U === null ? null : {
        label: w(U),
        class: $(U, !0)
      };
    }
    function M(O) {
      if (O == null || O === "") return null;
      if (typeof O == "number")
        return Number.isFinite(O) ? O : null;
      const W = O.trim();
      if (!W) return null;
      if (W.includes(":")) {
        const de = W.split(":").map(Number);
        return de.length !== 3 || de.some(isNaN) ? null : de[0] * 3600 + de[1] * 60 + de[2];
      }
      const U = Number(W);
      return Number.isFinite(U) ? U : null;
    }
    function V(O) {
      const W = Math.round(O), U = Math.floor(W / 3600), de = Math.floor(W % 3600 / 60), Z = W % 60;
      return `${String(U).padStart(2, "0")}:${String(de).padStart(2, "0")}:${String(Z).padStart(2, "0")}`;
    }
    function H(O) {
      const W = M(O);
      return W === null ? "—" : typeof O == "string" && O.includes(":") ? O.trim() : V(W);
    }
    const B = C(() => a.data?.total_enqueued ?? 0), T = C(() => a.data?.total_closed ?? 0), D = C(
      () => a.data?.avg_time_to_assign_seconds ?? null
    ), L = C(
      () => a.data?.avg_conversation_duration_seconds ?? null
    ), I = C(() => B.value <= 0 ? null : `(${(T.value / B.value * 100).toFixed(1)}%)`), G = C(
      () => S(
        M(D.value),
        a.previousAvgTimeToAssignSeconds
      )
    ), Q = C(
      () => S(
        M(L.value),
        a.previousAvgConversationDurationSeconds
      )
    );
    function ne(O, W) {
      return {
        id: `${O.date}-${O.agent_email}-${W}`,
        date: O.date,
        dateSort: new Date(O.date).getTime(),
        agent_name: O.agent_name ?? "",
        agent_email: O.agent_email,
        handled: d(O),
        avg_assignation_seconds: M(O.avg_time_to_assign_seconds),
        avg_resolution_seconds: M(O.avg_conversation_duration_seconds),
        avg_assignation_display: H(O.avg_time_to_assign_seconds),
        avg_resolution_display: H(O.avg_conversation_duration_seconds)
      };
    }
    function re(O) {
      const W = /* @__PURE__ */ new Map();
      for (const U of O) {
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
        const Z = W.get(de), Y = U.assigned_count ?? 0, J = U.closed_count ?? 0;
        Z.handled += d(U), U.agent_name?.trim() && (Z.agent_name = U.agent_name.trim());
        const ue = M(U.avg_time_to_assign_seconds);
        ue !== null && Y > 0 && (Z.assignSum += ue * Y, Z.assignWeight += Y);
        const pe = M(U.avg_conversation_duration_seconds);
        pe !== null && J > 0 && (Z.resolutionSum += pe * J, Z.resolutionWeight += J);
      }
      return Array.from(W.values()).map((U, de) => {
        const Z = U.assignWeight > 0 ? U.assignSum / U.assignWeight : null, Y = U.resolutionWeight > 0 ? U.resolutionSum / U.resolutionWeight : null;
        return {
          id: `agg-${U.agent_email}-${de}`,
          agent_name: U.agent_name,
          agent_email: U.agent_email,
          handled: U.handled,
          avg_assignation_seconds: Z,
          avg_resolution_seconds: Y,
          avg_assignation_display: Z !== null ? V(Z) : "—",
          avg_resolution_display: Y !== null ? V(Y) : "—"
        };
      });
    }
    const ge = C(() => {
      const O = f.value;
      return y.value === "aggregated" ? re(O) : O.map(ne);
    });
    function q(O, W, U, de) {
      const Z = de === "asc" ? 1 : -1;
      let Y = 0;
      switch (U) {
        case "date":
          Y = (O.dateSort ?? 0) - (W.dateSort ?? 0);
          break;
        case "name":
          Y = (O.agent_name || "").localeCompare(W.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          Y = O.agent_email.localeCompare(W.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          Y = O.handled - W.handled;
          break;
        case "avgAssignation":
          Y = (O.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (W.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          Y = (O.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (W.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (Y !== 0) return Y * Z;
      if (y.value === "by_date" && U !== "date") {
        const J = (W.dateSort ?? 0) - (O.dateSort ?? 0);
        if (J !== 0) return J;
      }
      return (O.agent_name || "").localeCompare(W.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const P = C(() => {
      const O = [...ge.value];
      return O.sort((W, U) => q(W, U, p.value, x.value)), O;
    }), j = C(
      () => P.value
    ), K = C(() => {
      const O = [];
      return y.value === "by_date" && O.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), O.push(
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
      ), O;
    });
    function ce(O) {
      const W = O;
      if (p.value === W) {
        x.value = x.value === "asc" ? "desc" : "asc";
        return;
      }
      p.value = W, W === "date" ? x.value = "desc" : W === "name" || W === "email" ? x.value = "asc" : x.value = "desc";
    }
    const ve = (O) => O == null ? "0" : le(O), De = (O) => new Date(O).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (O, W) => (m(), ee(Ce, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: W[1] || (W[1] = (U) => o("open"))
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", by, [
          g.value ? (m(), _("div", {
            key: 0,
            class: te(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": E(i) }])
          }, [
            N(Dt, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ve(B.value),
              theme: e.theme,
              "current-value": B.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: R(() => [...W[2] || (W[2] = [
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
              icon: R(() => [...W[3] || (W[3] = [
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
              value: R(() => [
                u("div", vy, [
                  u("span", yy, A(ve(T.value)), 1),
                  I.value ? (m(), _("span", xy, A(I.value), 1)) : z("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(Dt, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: H(D.value),
              theme: e.theme,
              "current-value": M(D.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Do({
              icon: R(() => [
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
              G.value ? {
                name: "headerAside",
                fn: R(() => [
                  u("div", {
                    class: te(["duration-trend-badge", G.value.class])
                  }, A(G.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            N(Dt, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: H(L.value),
              theme: e.theme,
              "current-value": M(L.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Do({
              icon: R(() => [
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
                fn: R(() => [
                  u("div", {
                    class: te(["duration-trend-badge", Q.value.class])
                  }, A(Q.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : z("", !0),
          b.value ? (m(), ee(Ce, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: R(() => [
              u("div", _y, [
                N($o, {
                  modelValue: y.value,
                  "onUpdate:modelValue": W[0] || (W[0] = (U) => y.value = U),
                  options: v,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: R(() => [
              u("div", ky, [
                (m(), ee(ct, {
                  key: `${y.value}-${p.value}-${x.value}`,
                  columns: K.value,
                  rows: j.value,
                  "sort-key": p.value,
                  "sort-direction": x.value,
                  "max-visible-rows": Ty,
                  "row-key": "id",
                  onSort: ce
                }, {
                  "cell-date": R(({ row: U }) => [
                    u("span", wy, A(De(String(U.date))), 1)
                  ]),
                  "cell-name": R(({ row: U }) => [
                    u("span", Cy, A(h(U.agent_name)), 1)
                  ]),
                  "cell-email": R(({ row: U }) => [
                    u("span", $y, A(U.agent_email), 1)
                  ]),
                  "cell-handled": R(({ row: U }) => [
                    u("span", Sy, A(ve(Number(U.handled))), 1)
                  ]),
                  "cell-avgAssignation": R(({ row: U }) => [
                    u("span", My, A(U.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": R(({ row: U }) => [
                    u("span", Dy, A(U.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : g.value ? z("", !0) : (m(), _("div", Ay, [...W[6] || (W[6] = [
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
}), Ly = /* @__PURE__ */ me(By, [["__scopeId", "data-v-837b41e7"]]), Py = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ey = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Ry = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Iy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Fy = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Oy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Vy = { class: "max-w-[360px] px-4 text-center" }, zy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ei = 5, Ny = /* @__PURE__ */ ie({
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
    const a = e, o = n, s = (y) => {
      o("export", y);
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
      const y = d.value.total_by_channel || {}, v = Object.values(y).reduce(
        (p, x) => p + x,
        0
      );
      return v === 0 ? [] : Object.entries(y).sort(([, p], [, x]) => x - p).map(([p, x]) => ({
        name: p,
        label: p.toUpperCase(),
        total: x,
        percentage: (x / v * 100).toFixed(1),
        color: l[p.toLowerCase()] || "#9ca3af"
      }));
    }), f = C(
      () => h.value.slice(0, ei)
    ), b = C(() => {
      const y = Math.min(f.value.length, ei);
      if (!(y <= 0))
        return { gridTemplateColumns: `repeat(${y}, minmax(0, 1fr))` };
    }), g = (y) => {
      if (!y || !y.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const v = y.channels_by_day, p = Object.keys(v).sort();
      if (p.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const $ of Object.values(v))
        for (const S of Object.keys($))
          x.add(S);
      const w = Array.from(x).map(($) => {
        const S = $.toLowerCase(), M = l[S] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: p.map((V) => v[V]?.[$] || 0),
          borderColor: M
        };
      });
      c.value = {
        labels: p.map(($) => We($).format("MMM DD")),
        datasets: w
      };
    };
    return Ie(
      () => a.data,
      (y) => {
        g(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (y, v) => (m(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !a.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", Py, [
          u("div", Ey, [
            c.value.labels && c.value.labels.length ? (m(), _("section", Ry, [
              u("div", Iy, [
                N(vt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              f.value.length ? (m(), _("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(b.value)
              }, [
                (m(!0), _(se, null, fe(f.value, (p) => (m(), ee(xe, {
                  key: p.name,
                  class: "min-w-0",
                  color: p.color,
                  title: p.label,
                  value: `${p.percentage}%`,
                  subvalue: `${E(le)(p.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : z("", !0)
            ])) : h.value.length ? (m(), _("section", Fy, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: we(b.value)
              }, [
                (m(!0), _(se, null, fe(f.value, (p) => (m(), ee(xe, {
                  key: p.name,
                  class: "min-w-0",
                  color: p.color,
                  title: p.label,
                  value: `${p.percentage}%`,
                  subvalue: `${E(le)(p.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : z("", !0),
            h.value.length ? z("", !0) : (m(), _("section", Oy, [
              u("div", Vy, [
                u("div", zy, [
                  N(E(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                v[0] || (v[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                v[1] || (v[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), jy = /* @__PURE__ */ me(Ny, [["__scopeId", "data-v-d3f89004"]]), Hy = { class: "card-body" }, Wy = { class: "chart-container" }, Ky = { class: "triage-table-block w-full min-w-0" }, Yy = { class: "triage-row-label" }, Uy = {
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
}, Jy = { class: "empty-state-content" }, e1 = { class: "empty-icon-wrapper" }, t1 = /* @__PURE__ */ ie({
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
    const a = e, o = n, s = (k) => {
      o("export", k);
    }, { isDark: i, colors: r } = Me(
      Se(a, "theme")
    ), l = C(() => {
      const k = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, S] of Object.entries(k)) {
        const M = $.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const V = M.filter((H) => H !== "triage").length;
        V >= 4 ? w["4p"] += Number(S) || 0 : w[V] += Number(S) || 0;
      }
      return w;
    }), c = C(() => {
      const k = l.value;
      return k[0] + k[1] + k[2] + k[3] + k["4p"] || 0;
    }), d = C(() => Object.keys(a.data?.combinations || {}).length > 0), h = C(() => {
      const k = c.value;
      if (!k) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = l.value;
      return {
        pct0: w[0] / k * 100,
        pct1: w[1] / k * 100,
        pct2: w[2] / k * 100,
        pct3: w[3] / k * 100,
        pct4p: w["4p"] / k * 100
      };
    }), f = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], b = C(() => {
      const k = h.value, w = l.value;
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
    }, y = (k) => k?.replace("80", "") || "#888888", v = C(() => ({
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
    })), p = C(() => ({
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
    })), x = (k) => `${(Number(k) || 0).toFixed(0)}`;
    return t({ isDark: i }), (k, w) => (m(), ee(Ce, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", Hy, [
          d.value ? (m(), _(se, { key: 0 }, [
            u("div", Wy, [
              N(kt, {
                data: v.value,
                options: p.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "w-full min-w-0",
              title: "Total",
              value: E(le)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            u("div", Ky, [
              N(ct, {
                columns: f,
                rows: b.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": R(({ row: $ }) => [
                  u("span", Yy, A($.metric), 1)
                ]),
                "cell-b0": R(({ row: $ }) => [
                  $.id === "pct" ? (m(), _("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: y(g.c0) })
                  }, A(x(Number($.b0))) + "%", 5)) : (m(), _("span", Uy, A(E(le)(Number($.b0))), 1))
                ]),
                "cell-b1": R(({ row: $ }) => [
                  $.id === "pct" ? (m(), _("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: y(g.c1) })
                  }, A(x(Number($.b1))) + "%", 5)) : (m(), _("span", qy, A(E(le)(Number($.b1))), 1))
                ]),
                "cell-b2": R(({ row: $ }) => [
                  $.id === "pct" ? (m(), _("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: y(g.c2) })
                  }, A(x(Number($.b2))) + "%", 5)) : (m(), _("span", Xy, A(E(le)(Number($.b2))), 1))
                ]),
                "cell-b3": R(({ row: $ }) => [
                  $.id === "pct" ? (m(), _("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: y(g.c3) })
                  }, A(x(Number($.b3))) + "%", 5)) : (m(), _("span", Gy, A(E(le)(Number($.b3))), 1))
                ]),
                "cell-b4p": R(({ row: $ }) => [
                  $.id === "pct" ? (m(), _("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: y(g.c4p) })
                  }, A(x(Number($.b4p))) + "%", 5)) : (m(), _("span", Zy, A(E(le)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (m(), _("div", Qy, [
            u("div", Jy, [
              u("div", e1, [
                N(E(at), { class: "empty-icon" })
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
}), n1 = /* @__PURE__ */ me(t1, [["__scopeId", "data-v-be7d2c0c"]]), a1 = { class: "card-body" }, o1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, s1 = { class: "pie-section" }, i1 = {
  key: 1,
  class: "empty-state"
}, r1 = /* @__PURE__ */ ie({
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
    }, r = (b) => i[b]?.label || b.toUpperCase(), l = C(
      () => n.data?.items && n.data.items.length > 0
    ), c = C(
      () => (n.data?.items || []).reduce((b, g) => b + g.count, 0)
    ), d = C(() => {
      const b = {};
      for (const g of n.data?.items || [])
        b[g.language] = (b[g.language] || 0) + g.count;
      return Object.entries(b).map(([g, y]) => ({ language: g, count: y })).sort((g, y) => y.count - g.count);
    }), h = C(() => ({
      labels: d.value.map((b) => r(b.language)),
      datasets: [
        {
          data: d.value.map((b) => b.count),
          backgroundColor: d.value.map(
            (b, g) => s[g % s.length] + "80"
          ),
          borderColor: d.value.map(
            (b, g) => s[g % s.length]
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
            label: (b) => {
              const g = b.raw || 0, y = c.value > 0 ? (g / c.value * 100).toFixed(1) : "0";
              return ` ${b.label}: ${g} (${y}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (b, g) => (m(), ee(Ce, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: R(() => [
        u("div", a1, [
          l.value ? (m(), _("div", o1, [
            u("section", s1, [
              N(Aa, {
                data: h.value,
                options: f.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "shrink-0",
              title: "Total",
              value: E(le)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (m(), _("section", i1, [...g[0] || (g[0] = [
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
}), l1 = /* @__PURE__ */ me(r1, [["__scopeId", "data-v-9385c088"]]), c1 = { class: "card-body" }, d1 = {
  key: 0,
  class: "guardrails-daily-section"
}, u1 = { class: "w-full min-w-0" }, h1 = { class: "font-medium" }, f1 = { class: "font-semibold" }, g1 = { class: "type-badges-row" }, p1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, m1 = {
  key: 1,
  class: "empty-state"
}, b1 = /* @__PURE__ */ ie({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me(Se(a, "theme")), r = C(
      () => a.data?.items && a.data.items.length > 0
    ), l = C(
      () => (a.data?.items || []).reduce((v, p) => v + p.count, 0)
    ), c = (v) => {
      const p = {};
      for (const w of a.data?.items || [])
        p[w[v]] = (p[w[v]] || 0) + w.count;
      const x = Object.entries(p).sort((w, $) => $[1] - w[1]);
      if (x.length === 0) return { name: "—", pct: 0 };
      const k = l.value;
      return {
        name: x[0][0],
        pct: k > 0 ? Math.round(x[0][1] / k * 100) : 0
      };
    }, d = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), f = C(() => c("guardrail_source")), b = C(() => {
      const v = {};
      for (const p of a.data?.items || [])
        v[p.date] || (v[p.date] = {}), v[p.date][p.guardrail_type] = (v[p.date][p.guardrail_type] || 0) + p.count;
      return Object.entries(v).map(([p, x]) => ({
        date: p,
        total: Object.values(x).reduce((k, w) => k + w, 0),
        types: Object.entries(x).map(([k, w]) => ({ type: k, count: w })).sort((k, w) => w.count - k.count)
      })).sort((p, x) => new Date(p.date).getTime() - new Date(x.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], y = C(
      () => b.value.map((v) => ({
        id: v.date,
        date: v.date,
        total: v.total,
        types: v.types
      }))
    );
    return t({ isDark: i }), (v, p) => (m(), ee(Ce, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !a.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", c1, [
          r.value ? (m(), _(se, { key: 0 }, [
            b.value.length > 0 ? (m(), _("section", d1, [
              u("div", u1, [
                N(ct, {
                  columns: g,
                  rows: y.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": R(({ row: x }) => [
                    u("span", h1, A(E(We)(String(x.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": R(({ row: x }) => [
                    u("span", f1, A(E(le)(x.total)), 1)
                  ]),
                  "cell-types": R(({ row: x }) => [
                    u("div", g1, [
                      (m(!0), _(se, null, fe(x.types, (k) => (m(), _("span", {
                        key: k.type,
                        class: "type-count-badge"
                      }, A(k.type) + " (" + A(k.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : z("", !0),
            u("section", p1, [
              N(xe, {
                title: "Total Events",
                value: E(le)(l.value)
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
          ], 64)) : (m(), _("section", m1, [...p[0] || (p[0] = [
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
}), v1 = /* @__PURE__ */ me(b1, [["__scopeId", "data-v-c042ede0"]]), y1 = { class: "card-body" }, x1 = { class: "chart-section" }, _1 = { class: "chart-wrapper" }, k1 = {
  key: 1,
  class: "empty-chart"
}, w1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, C1 = {
  key: 0,
  class: "dn-failure-section"
}, $1 = { class: "w-full min-w-0" }, S1 = { class: "failure-reason" }, M1 = { class: "failure-count" }, D1 = { class: "impact-bar-container" }, A1 = { class: "impact-label" }, T1 = { class: "dn-trend-health-block flex flex-col gap-0" }, B1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, L1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, P1 = { class: "system-health" }, E1 = { class: "system-health-content" }, R1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, I1 = {
  key: 1,
  class: "empty-state"
}, F1 = /* @__PURE__ */ ie({
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
    ), b = ($, S) => S ? `${Math.round($ / S * 100)}%` : "0%", g = C(() => {
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
    }), v = [
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
    ), x = C(() => {
      const $ = h.value, S = d.value.processing_success, M = Math.max(0, S - d.value.totalDqErrors), V = d.value.notification_sent, H = Math.max(0, $ - S), B = d.value.totalDqErrors, T = Math.max(0, M - V), D = (G, Q) => ye(G, Q), L = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], I = [];
      return S > 0 && I.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: S,
        label: D(S, $)
      }), H > 0 && I.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: H,
        label: D(H, $)
      }), M > 0 && I.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: D(M, $)
      }), B > 0 && I.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: B,
        label: D(B, $)
      }), V > 0 && I.push({
        source: "Contactable",
        target: "Notified",
        value: V,
        label: D(V, $)
      }), T > 0 && I.push({
        source: "Contactable",
        target: "Not Delivered",
        value: T,
        label: D(T, $)
      }), { nodes: L, links: I };
    }), k = C(() => {
      const $ = [...a.data?.processingCounts?.items || []].sort(
        (D, L) => new Date(D.date).getTime() - new Date(L.date).getTime()
      ), S = a.data?.documentCounts?.items || [], M = {};
      for (const D of S)
        M[D.date] = (M[D.date] || 0) + D.row_count_total;
      const V = [
        .../* @__PURE__ */ new Set([
          ...$.map((D) => D.date),
          ...S.map((D) => D.date)
        ])
      ].sort(), H = V.map((D) => We(D).format("MMM DD")), B = V.map((D) => {
        const L = $.find((Q) => Q.date === D), I = L?.notification_sent || 0, G = M[D] || L?.processing_started || 0;
        return G > 0 ? Math.round(I / G * 100) : 0;
      }), T = V.map((D) => $.find((I) => I.date === D)?.notification_sent || 0);
      return {
        labels: H,
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
    return t({ isDark: i }), ($, S) => (m(), ee(Ce, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: S[0] || (S[0] = (M) => o("open"))
    }, {
      headerExport: R(() => [
        e.enableExport && !a.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", y1, [
          l.value ? (m(), _(se, { key: 0 }, [
            u("section", x1, [
              S[2] || (S[2] = u("div", { class: "chart-header" }, [
                u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              u("div", _1, [
                x.value.nodes.length > 0 && x.value.links.length > 0 ? (m(), ee(Jt, {
                  key: 0,
                  data: x.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 24
                }, null, 8, ["data"])) : (m(), _("div", k1, [...S[1] || (S[1] = [
                  u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            u("div", w1, [
              N(xe, {
                color: "#3b82f6",
                title: "Total Records",
                value: E(le)(c.value.row_count_total)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: E(le)(h.value)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#10b981",
                title: "Successfully Notified",
                value: E(le)(d.value.notification_sent),
                subvalue: b(d.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#ef4444",
                title: "Not Notified",
                value: E(le)(f.value),
                subvalue: b(f.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: g.value.reason,
                subvalue: g.value.count > 0 ? `${E(le)(g.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            y.value.length > 0 ? (m(), _("section", C1, [
              S[3] || (S[3] = u("div", { class: "section-header" }, [
                u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              u("div", $1, [
                N(ct, {
                  columns: v,
                  rows: p.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": R(({ row: M }) => [
                    u("span", S1, A(M.reason), 1)
                  ]),
                  "cell-count": R(({ row: M }) => [
                    u("span", M1, A(E(le)(M.count)), 1)
                  ]),
                  "cell-impact": R(({ row: M }) => [
                    u("div", D1, [
                      u("div", {
                        class: "impact-bar",
                        style: we({ width: M.impactPct + "%" })
                      }, null, 4),
                      u("span", A1, A(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : z("", !0),
            u("div", T1, [
              k.value.labels.length > 0 ? (m(), _("section", B1, [
                S[4] || (S[4] = u("div", { class: "chart-header" }, [
                  u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                u("div", L1, [
                  N(vt, {
                    data: k.value,
                    options: w.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : z("", !0),
              u("details", P1, [
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
                u("div", E1, [
                  u("div", R1, [
                    N(xe, {
                      title: "Docs Started",
                      value: E(le)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Completed",
                      value: E(le)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Failed",
                      value: E(le)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Started",
                      value: E(le)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Success",
                      value: E(le)(d.value.processing_success)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Notification Failed",
                      value: E(le)(d.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (m(), _("section", I1, [...S[6] || (S[6] = [
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
}), O1 = /* @__PURE__ */ me(F1, [["__scopeId", "data-v-3b9202b7"]]), V1 = /* @__PURE__ */ ie({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), o = C(() => le(n.totalConversations)), s = C(() => E(a.value?.isDark) ?? !1), i = C(() => E(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ee(Dt, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: R(() => [...l[0] || (l[0] = [
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
}), z1 = /* @__PURE__ */ ie({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), o = C(() => `${n.csatP95.toFixed(1)}`), s = C(() => E(a.value?.isDark) ?? !1), i = C(() => E(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ee(Dt, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: R(() => [...l[0] || (l[0] = [
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
}), N1 = /* @__PURE__ */ ie({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), o = C(() => `${n.csatPulse.toFixed(1)}%`), s = C(() => E(a.value?.isDark) ?? !1), i = C(() => E(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ee(Dt, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: R(() => [...l[0] || (l[0] = [
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
}), j1 = {
  key: 0,
  class: "card-body"
}, H1 = { class: "chart-wrapper" }, W1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, K1 = {
  key: 1,
  class: "empty-state"
}, Y1 = 520, U1 = 300, q1 = 40, X1 = 48, G1 = 48, Z1 = {
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
    return t({ isDark: i }), (l, c) => (m(), ee(Ce, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !s.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        r.value && r.value.total_nps_responses > 0 ? (m(), _("div", j1, [
          u("div", H1, [
            N(or, {
              histogram: r.value.histogram || [],
              "min-score": r.value.min_score || 0,
              "max-score": r.value.max_score || 0,
              "q1-score": r.value.q1_score || 0,
              "median-score": r.value.median_score || 0,
              "q3-score": r.value.q3_score || 0,
              "average-score": r.value.average_score || 0,
              "chart-width": Y1,
              "chart-height": U1,
              "chart-margin": q1,
              "chart-margin-right": X1,
              "chart-bottom-margin": G1,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          u("div", W1, [
            N(xe, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(r.value.total_nps_responses)
            }, null, 8, ["value"]),
            r.value.p95_score > 0 ? (m(), ee(xe, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(r.value.p95_score)
            }, null, 8, ["value"])) : z("", !0)
          ])
        ])) : (m(), _("div", K1, [...c[0] || (c[0] = [
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
}, pr = /* @__PURE__ */ me(Z1, [["__scopeId", "data-v-e98fe9b2"]]), Q1 = {
  key: 0,
  class: "card-body"
}, J1 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ex = {
  key: 1,
  class: "empty-state"
}, tx = {
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
    return (c, d) => (m(), ee(Ce, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !o.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        i.value ? (m(), _("div", Q1, [
          u("div", J1, [
            N(vt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (m(), _("div", ex, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, mr = /* @__PURE__ */ me(tx, [["__scopeId", "data-v-5207cfa7"]]), nx = {
  key: 0,
  class: "card-body"
}, ax = {
  key: 1,
  class: "empty-state"
}, ox = /* @__PURE__ */ ie({
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
    return (i, r) => (m(), ee(Ce, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: R(() => [
        a.value ? (m(), _("div", nx, [
          N(kt, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (m(), _("div", ax, [...r[0] || (r[0] = [
          u("p", { class: "empty-title" }, "No resolution answers available", -1),
          u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), sx = /* @__PURE__ */ me(ox, [["__scopeId", "data-v-6849ef24"]]), ix = {
  key: 0,
  class: "card-body"
}, rx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, lx = {
  key: 1,
  class: "empty-state"
}, cx = /* @__PURE__ */ ie({
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
    return (c, d) => (m(), ee(Ce, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !o.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: a
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        i.value ? (m(), _("div", ix, [
          u("div", rx, [
            N(vt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (m(), _("div", lx, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), dx = /* @__PURE__ */ me(cx, [["__scopeId", "data-v-72955d9a"]]), ux = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, hx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, br = {
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
    return (d, h) => (m(), _("div", ux, [
      u("div", hx, [
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
      l.value ? (m(), _("div", {
        key: 0,
        class: te(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (m(), ee(sx, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0),
        i.value ? (m(), ee(dx, {
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
}, fx = { class: "csat-container__body" }, gx = /* @__PURE__ */ ie({
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
    return (o, s) => (m(), ee(Ce, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => n("open"))
    }, {
      default: R(() => [
        u("div", fx, [
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
}), px = /* @__PURE__ */ me(gx, [["__scopeId", "data-v-37178ba1"]]), mx = /* @__PURE__ */ ie({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), o = C(() => Vt(n.totalRevenue)), s = C(() => E(a.value?.isDark) ?? !1), i = C(() => E(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ee(Dt, {
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
      icon: R(() => [...l[0] || (l[0] = [
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
}), bx = { class: "flex items-center gap-2 justify-end flex-wrap" }, vx = {
  key: 0,
  class: "flex rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] p-[3px] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)]"
}, yx = ["onClick"], xx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, _x = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, kx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, wx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Cx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, $x = /* @__PURE__ */ ie({
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
    ]), b = C(() => l.value === "payment_method"), g = [
      "#a78bfa",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], y = (D) => g[D % g.length], v = (D) => {
      if (!D) return "0";
      const L = Math.abs(D);
      return L >= 1e6 ? (D / 1e6).toFixed(2) + "M" : L >= 1e5 ? (D / 1e3).toFixed(1) + "K" : Math.round(D).toLocaleString();
    }, p = (D) => !D || D === "unknown" ? "Unknown" : D.split(/[_|]/).map((L) => L ? L.charAt(0).toUpperCase() + L.slice(1) : "").join(" "), x = ae({
      labels: [],
      datasets: []
    }), k = ae([]), w = C(() => {
      const D = Math.min(k.value.length, 5);
      if (!(D <= 0))
        return { gridTemplateColumns: `repeat(${D}, minmax(0, 1fr))` };
    }), $ = (D) => {
      const L = D?.ai_revenue_by_day ?? [], I = D?.breakdown ?? [];
      if (!L.length) {
        x.value = { labels: [], datasets: [] }, k.value = [];
        return;
      }
      const G = [...L].sort((q, P) => q.date.localeCompare(P.date)), Q = G.map((q) => We(q.date).format("MMM DD")), ne = c.value === "usd" ? "ai_revenue_usd" : "ai_revenue";
      if (l.value === "all") {
        x.value = {
          labels: Q,
          datasets: [
            {
              label: `Revenue (${h.value})`,
              data: G.map((q) => Number(q[ne] ?? 0)),
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
        }, k.value = [];
        return;
      }
      const ge = I.slice(0, 7).map((q) => q.key).map((q, P) => {
        const j = y(P), K = G.map((ce) => {
          const ve = (ce.breakdown ?? {})[q];
          return ve ? Number(ve[ne] ?? 0) : 0;
        });
        return b.value ? {
          label: p(q),
          data: K,
          backgroundColor: j,
          borderColor: j,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: p(q),
          data: K,
          borderColor: j,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: j,
          pointBorderWidth: 2
        };
      });
      x.value = { labels: Q, datasets: ge }, k.value = I.slice(0, 5).map((q, P) => {
        const j = c.value === "usd" ? q.total_usd : q.total;
        return {
          key: q.key,
          label: p(q.key),
          amount: `${h.value} ${v(j)}`,
          percentage: Number(q.percentage ?? 0),
          color: y(P)
        };
      });
    }, S = C(() => ({
      callback: (D) => `${h.value} ${v(Number(D))}`,
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
    })), H = C(() => ({
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
    return t({ isDark: i }), (D, L) => (m(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "AI Generated Revenue",
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: R(() => [
        u("div", bx, [
          Ge(u("select", {
            "onUpdate:modelValue": L[0] || (L[0] = (I) => l.value = I),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: T
          }, [...L[1] || (L[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "payment_method" }, "Payment Method", -1),
            u("option", { value: "agent_type" }, "Agent Type", -1),
            u("option", { value: "channel" }, "Channel", -1),
            u("option", { value: "channel_and_agent" }, "Channel & Agent", -1)
          ])], 544), [
            [li, l.value]
          ]),
          d.value !== "USD" ? (m(), _("div", vx, [
            (m(!0), _(se, null, fe(f.value, (I) => (m(), _("button", {
              key: I.value,
              class: te([
                "rounded-[9px] px-3 py-1 text-xs font-medium transition-all",
                c.value === I.value ? "bg-white shadow-sm text-[var(--kiut-text-primary,#111827)] font-semibold dark:bg-[#1f2937] dark:text-[var(--kiut-text-primary,#f9fafb)]" : "text-[var(--kiut-text-secondary,#6b7280)] dark:text-[var(--kiut-text-secondary,#9ca3af)]"
              ]),
              onClick: (G) => c.value = I.value
            }, A(I.label), 11, yx))), 128))
          ])) : z("", !0)
        ])
      ]),
      default: R(() => [
        u("div", {
          class: te(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          N(ut, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: R(() => [
              a.loading ? (m(), _("div", xx, [...L[2] || (L[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), _("div", _x, [
                x.value.labels && x.value.labels.length && x.value.datasets.length ? (m(), _("section", kx, [
                  u("div", wx, [
                    b.value ? (m(), ee(kt, {
                      key: 0,
                      data: x.value,
                      options: B.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (m(), ee(vt, {
                      key: 1,
                      data: x.value,
                      options: H.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  k.value.length ? (m(), _("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: we(w.value)
                  }, [
                    (m(!0), _(se, null, fe(k.value, (I) => (m(), ee(xe, {
                      key: `card-${I.key}`,
                      class: "min-w-0",
                      color: I.color,
                      title: I.label,
                      value: I.amount,
                      subvalue: `${I.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : z("", !0)
                ])) : (m(), _("section", Cx, [...L[3] || (L[3] = [
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
}), Sx = /* @__PURE__ */ me($x, [["__scopeId", "data-v-953987bf"]]), ti = 1, Mx = /* @__PURE__ */ ie({
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
    return t({ isDark: o, changePercent: c }), (f, b) => (m(), ee(Dt, {
      label: "Cost",
      value: r.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: R(() => [...b[0] || (b[0] = [
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
      headerAside: R(() => [
        l.value ? (m(), _("div", {
          key: 0,
          class: te(["change-badge", h.value, { "change-badge--dark": E(o) }])
        }, A(d.value), 3)) : z("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Dx = /* @__PURE__ */ me(Mx, [["__scopeId", "data-v-411e0735"]]), Ax = { class: "flex justify-end" }, Tx = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Bx = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Lx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Px = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ex = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Rx = /* @__PURE__ */ ie({
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
    }), b = ae(
      []
    ), g = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], y = (w) => g[w % g.length], v = {
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
      o("changeBreakdown", l.value);
    }, x = (w) => {
      if (!w) return "";
      const S = w.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return S ? S.charAt(0).toUpperCase() + S.slice(1) : "";
    }, k = (w) => {
      if (l.value === "all") {
        const T = w?.escalations_by_day ?? [];
        if (!T.length) {
          d.value = { labels: [], datasets: [] }, h.value = [], b.value = [];
          return;
        }
        const D = [...T].sort((L, I) => L.date.localeCompare(I.date));
        d.value = {
          labels: D.map((L) => We(L.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: D.map(
                (L) => Number(L.escalation_rate_percentage || 0)
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
      const $ = w?.breakdown_by_day ?? [], S = w?.breakdown_items ?? [];
      if (!$.length) {
        d.value = { labels: [], datasets: [] }, h.value = [], b.value = [];
        return;
      }
      const M = [...$].sort(
        (T, D) => T.date.localeCompare(D.date)
      ), V = S.slice(0, 5).map((T) => T.key), H = M.map((T) => We(T.date).format("MMM DD")), B = V.map((T, D) => {
        const L = S.find((I) => I.key === T);
        return {
          label: x(L?.label || T),
          data: M.map((I) => {
            const G = I.items.find((Q) => Q.key === T);
            return Number(G?.percentage || 0);
          }),
          borderColor: y(D),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      d.value = {
        labels: H,
        datasets: B
      }, h.value = S.slice(0, 5).map((T, D) => ({
        key: T.key,
        label: x(T.label),
        percentage: Number(T.percentage || 0),
        color: y(D)
      })), b.value = S.slice(0, 5).map((T, D) => ({
        key: T.key,
        label: x(T.label),
        color: y(D)
      }));
    };
    return Ie(
      () => a.data,
      (w) => {
        k(w ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Ie(
      () => a.breakdownBy,
      (w) => {
        l.value = w, k(c.value);
      }
    ), t({ isDark: r }), (w, $) => (m(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      headerAside: R(() => [
        u("div", Ax, [
          Ge(u("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (S) => l.value = S),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: p
          }, [...$[1] || ($[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [li, l.value]
          ])
        ])
      ]),
      default: R(() => [
        u("div", Tx, [
          u("div", Bx, [
            d.value.labels && d.value.labels.length && d.value.datasets.length ? (m(), _("section", Lx, [
              u("div", Px, [
                N(vt, {
                  data: d.value,
                  options: v,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              h.value.length ? (m(), _("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(f.value)
              }, [
                (m(!0), _(se, null, fe(h.value, (S) => (m(), ee(xe, {
                  key: `card-${S.key}`,
                  class: "min-w-0",
                  color: S.color,
                  title: S.label,
                  value: `${S.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : z("", !0)
            ])) : (m(), _("section", Ex, [...$[2] || ($[2] = [
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
}), Ix = /* @__PURE__ */ me(Rx, [["__scopeId", "data-v-b18e0ebd"]]), Fx = /* @__PURE__ */ ie({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), o = C(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => E(a.value?.isDark) ?? !1), i = C(() => E(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ee(Dt, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: R(() => [...l[0] || (l[0] = [
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
}), Ox = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Vx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, zx = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Nx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, jx = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Hx = { class: "max-w-[360px] text-center" }, Wx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Kx = {
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
      return d ? f = l : h && (f = c.map((b, g) => ({
        date: b,
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
    return (r, l) => (m(), ee(Ce, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", Ox, [
          o.value.daily.length > 0 ? (m(), _("div", Vx, [
            u("div", zx, [
              N(vt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", Nx, [
              N(xe, {
                color: E(a).primaryLight,
                title: "Total Allocated",
                value: E(Le)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              N(xe, {
                color: "#FF9900",
                title: "Total AWS",
                value: E(Le)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (m(), _("section", jx, [
            u("div", Hx, [
              u("div", Wx, [
                N(E(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, Yx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ux = { class: "card-body" }, qx = {
  key: 0,
  class: "chart-section"
}, Xx = { class: "chart-container" }, Gx = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, Zx = {
  key: 1,
  class: "empty-state"
}, Qx = { class: "empty-state-content" }, Jx = { class: "empty-icon-wrapper" }, Tn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ni = 10, e_ = /* @__PURE__ */ ie({
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
      const y = new Date(g), v = String(y.getDate()).padStart(2, "0"), p = String(y.getMonth() + 1).padStart(2, "0");
      return `${v}-${p}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, v) => y + (v.input_cost || 0), 0);
    }), c = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, v) => y + (v.output_cost || 0), 0);
    }), d = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, v) => y + (v.cache_read_cost || 0), 0);
    }), h = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, v) => y + (v.cache_write_cost || 0), 0);
    }), f = C(() => {
      const g = a.data?.costs_by_day || {}, y = Object.keys(g).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const v = y.map((x) => i(x)), p = [
        {
          label: "Input Cost",
          data: y.map((x) => g[x]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: y.map((x) => g[x]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: y.map((x) => g[x]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: y.map((x) => g[x]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: v,
        datasets: p
      };
    }), b = C(() => a.options ? a.options : {
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
              let y = g.dataset.label || "";
              return y && (y += ": "), g.parsed.y !== null && (y += Le(g.parsed.y)), y;
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
    return t({ isDark: o }), (g, y) => (m(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", Yx, [
          u("div", Ux, [
            f.value.labels && f.value.labels.length ? (m(), _("section", qx, [
              u("div", Xx, [
                N(kt, {
                  data: f.value,
                  options: b.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Gx, [
                N(xe, {
                  title: "Total Cost",
                  value: E(Le)(e.data.total_cost)
                }, null, 8, ["value"]),
                N(xe, {
                  title: "Input Cost",
                  value: E(Le)(l.value),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Output Cost",
                  value: E(Le)(c.value),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Cache Read",
                  value: E(Le)(d.value),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Cache Write",
                  value: E(Le)(h.value),
                  color: r.cache_write
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Avg / Conv.",
                  value: E(Le)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (m(), _("section", Zx, [
              u("div", Qx, [
                u("div", Jx, [
                  N(E(at), { class: "empty-icon" })
                ]),
                y[0] || (y[0] = u("p", { class: "empty-title" }, "No cost usage data", -1)),
                y[1] || (y[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), t_ = /* @__PURE__ */ me(e_, [["__scopeId", "data-v-e1c4a95b"]]), n_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, a_ = { class: "card-body" }, o_ = {
  key: 0,
  class: "chart-section"
}, s_ = { class: "chart-container" }, i_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, r_ = {
  key: 1,
  class: "empty-state"
}, l_ = { class: "empty-state-content" }, c_ = { class: "empty-icon-wrapper" }, Bn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ai = 10, d_ = /* @__PURE__ */ ie({
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
      const h = new Date(d), f = String(h.getDate()).padStart(2, "0"), b = String(h.getMonth() + 1).padStart(2, "0");
      return `${f}-${b}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((g) => i(g)), b = [
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
        datasets: b
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
    return t({ isDark: o }), (d, h) => (m(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", n_, [
          u("div", a_, [
            l.value.labels && l.value.labels.length ? (m(), _("section", o_, [
              u("div", s_, [
                N(kt, {
                  data: l.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", i_, [
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: E(le)(e.data.total_tokens)
                }, null, 8, ["value"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: E(le)(e.data.total_input_tokens),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: E(le)(e.data.total_output_tokens),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: E(le)(e.data.total_cache_read_tokens),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: E(le)(e.data.total_cache_write_tokens),
                  color: r.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (m(), _("section", r_, [
              u("div", l_, [
                u("div", c_, [
                  N(E(at), { class: "empty-icon" })
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
}), u_ = /* @__PURE__ */ me(d_, [["__scopeId", "data-v-554d3cda"]]), h_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, f_ = { class: "card-body" }, g_ = {
  key: 0,
  class: "chart-section"
}, p_ = { class: "chart-container" }, m_ = { class: "mt-4 w-full min-w-0" }, b_ = {
  key: 1,
  class: "empty-state"
}, v_ = { class: "empty-state-content" }, y_ = { class: "empty-icon-wrapper" }, x_ = /* @__PURE__ */ ie({
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
      const h = d.map((b) => s(b)), f = [
        {
          label: "Conversations",
          data: d.map((b) => c[b] || 0),
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
    return t({ isDark: a }), (c, d) => (m(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", h_, [
          u("div", f_, [
            r.value.labels && r.value.labels.length ? (m(), _("section", g_, [
              u("div", p_, [
                N(vt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", m_, [
                N(xe, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (m(), _("section", b_, [
              u("div", v_, [
                u("div", y_, [
                  N(E(at), { class: "empty-icon" })
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
}), __ = /* @__PURE__ */ me(x_, [["__scopeId", "data-v-311f443a"]]), k_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, w_ = { class: "card-body" }, C_ = {
  key: 0,
  class: "charts-grid"
}, $_ = { class: "chart-section" }, S_ = { class: "chart-container" }, M_ = { class: "chart-section" }, D_ = { class: "chart-container" }, A_ = {
  key: 1,
  class: "empty-state"
}, T_ = { class: "empty-state-content" }, B_ = { class: "empty-icon-wrapper" }, L_ = /* @__PURE__ */ ie({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = C(() => n.data?.top_agents && n.data.top_agents.length > 0), i = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((f, b) => (b.total_cost || 0) - (f.total_cost || 0)) : []), r = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((f, b) => (b.total_tokens || 0) - (f.total_tokens || 0)) : []), l = C(() => {
      const f = i.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((b) => b.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: f.map((b) => b.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = C(() => {
      const f = r.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((b) => b.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: f.map((b) => b.total_tokens || 0),
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
              const b = f.label, g = n.data?.top_agents?.find((y) => y.agent_type === b);
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
              const b = f.label, g = n.data?.top_agents?.find((y) => y.agent_type === b);
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
    return t({ isDark: a }), (f, b) => (m(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", k_, [
          u("div", w_, [
            s.value ? (m(), _("div", C_, [
              u("section", $_, [
                b[0] || (b[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", S_, [
                  N(kt, {
                    data: l.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", M_, [
                b[1] || (b[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", D_, [
                  N(kt, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (m(), _("section", A_, [
              u("div", T_, [
                u("div", B_, [
                  N(E(at), { class: "empty-icon" })
                ]),
                b[2] || (b[2] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                b[3] || (b[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), P_ = /* @__PURE__ */ me(L_, [["__scopeId", "data-v-bb4ae132"]]), E_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, R_ = { class: "card-body" }, I_ = {
  key: 0,
  class: "chart-section"
}, F_ = { class: "chart-container" }, O_ = {
  key: 1,
  class: "empty-state"
}, V_ = { class: "empty-state-content" }, z_ = { class: "empty-icon-wrapper" }, N_ = /* @__PURE__ */ ie({
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
      const f = h.map((y) => {
        const v = y.agent_type?.toLowerCase();
        return (s[v] || "#a78bfa") + "80";
      }), b = h.map((y) => {
        const v = y.agent_type?.toLowerCase();
        return s[v] || "#a78bfa";
      });
      return {
        labels: h.map((y) => {
          const v = y.conversations || 0, p = l.value ? v / l.value * 100 : 0;
          return `${y.agent_type} - ${v.toLocaleString()} (${p.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((y) => y.conversations || 0),
            backgroundColor: f,
            borderColor: b,
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
              const f = (h.label || "").toString(), b = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((v, p) => v + (Number(p) || 0), 0), y = g ? b / g * 100 : 0;
              return `${f}: ${b.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, f) => (m(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", E_, [
          u("div", R_, [
            r.value ? (m(), _("section", I_, [
              u("div", F_, [
                N(Aa, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), _("section", O_, [
              u("div", V_, [
                u("div", z_, [
                  N(E(at), { class: "empty-icon" })
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
}), j_ = /* @__PURE__ */ me(N_, [["__scopeId", "data-v-74c924dc"]]), H_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, W_ = { class: "card-body" }, K_ = {
  key: 0,
  class: "chart-section"
}, Y_ = { class: "chart-container" }, U_ = {
  key: 1,
  class: "empty-state"
}, q_ = { class: "empty-state-content" }, X_ = { class: "empty-icon-wrapper" }, G_ = /* @__PURE__ */ ie({
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
        const v = [...c].sort((p, x) => p.date.localeCompare(x.date));
        return {
          labels: v.map((p) => s(p.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: v.map((p) => Number(p.value) || 0),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, b = Object.keys(d).filter((v) => h[v]).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const g = b.map((v) => s(v)), y = b.map((v) => {
        const p = d[v]?.total_cost || 0, x = h[v] || 0;
        return x > 0 ? p / x : 0;
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
    return t({ isDark: a }), (c, d) => (m(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", H_, [
          u("div", W_, [
            i.value ? (m(), _("section", K_, [
              u("div", Y_, [
                N(vt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), _("section", U_, [
              u("div", q_, [
                u("div", X_, [
                  N(E(at), { class: "empty-icon" })
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
}), Z_ = /* @__PURE__ */ me(G_, [["__scopeId", "data-v-ae6c48b1"]]), Q_ = { class: "tabs text-sm" }, J_ = ["aria-label"], ek = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], tk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, nk = /* @__PURE__ */ ie({
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
      () => n.items.map((g, y) => g.disabled ? -1 : y).filter((g) => g >= 0)
    );
    function l(g) {
      return g.value === n.modelValue;
    }
    function c(g) {
      const y = l(g), p = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${p} cursor-not-allowed opacity-40` : y ? `${p} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${p} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(g, y) {
      g === y || n.items.find((p) => p.value === g)?.disabled || (a("update:modelValue", g), a("change", { value: g, previousValue: y }));
    }
    function h(g, y) {
      a("tab-click", { value: g.value, originalEvent: y }), !g.disabled && (d(g.value, n.modelValue), je(() => {
        o.value[n.items.indexOf(g)]?.focus();
      }));
    }
    function f(g, y) {
      const v = n.items.length;
      if (v === 0) return 0;
      let p = g;
      for (let x = 0; x < v; x++)
        if (p = (p + y + v) % v, !n.items[p]?.disabled) return p;
      return g;
    }
    async function b(g, y) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let p = y;
      g.key === "ArrowLeft" ? p = f(y, -1) : g.key === "ArrowRight" ? p = f(y, 1) : g.key === "Home" ? p = r.value[0] ?? 0 : g.key === "End" && (p = r.value[r.value.length - 1] ?? y);
      const x = n.items[p];
      !x || x.disabled || (d(x.value, n.modelValue), await je(), o.value[p]?.focus());
    }
    return (g, y) => (m(), _("div", Q_, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: te([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (m(!0), _(se, null, fe(e.items, (v, p) => (m(), _("button", {
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
          class: te(c(v)),
          onClick: (x) => h(v, x),
          onKeydown: (x) => b(x, p)
        }, [
          u("span", {
            class: te(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            v.icon ? (m(), ee(Mt(v.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : z("", !0),
            u("span", tk, A(v.label), 1)
          ], 2)
        ], 42, ek))), 128))
      ], 10, J_),
      g.$slots.default ? (m(), ee(ut, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: R(() => [
          (m(), _("div", {
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
}), vr = /* @__PURE__ */ me(nk, [["__scopeId", "data-v-f9c367eb"]]), ak = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ok = { class: "card-body" }, sk = {
  key: 0,
  class: "model-usage-table-block"
}, ik = { class: "w-full min-w-0" }, rk = {
  key: 1,
  class: "empty-state"
}, lk = { class: "empty-state-content" }, ck = { class: "empty-icon-wrapper" }, dk = /* @__PURE__ */ ie({
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
      () => Object.entries(c.value).map(([g, y]) => ({
        id: g,
        name: g,
        avgCost: b(y.avg_cost_per_message),
        avgTokens: f(y.avg_tokens_per_message),
        messageCount: f(y.message_count),
        totalCost: b(y.total_cost),
        totalTokens: f(y.total_tokens)
      }))
    ), f = (g) => g == null ? "0" : le(g), b = (g) => g == null ? "$0.00" : Le(g);
    return t({ isDark: i }), (g, y) => (m(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", ak, [
          u("div", ok, [
            N(vr, {
              modelValue: l.value,
              "onUpdate:modelValue": y[0] || (y[0] = (v) => l.value = v),
              items: r,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: R(() => [
                c.value && Object.keys(c.value).length > 0 ? (m(), _("div", sk, [
                  u("div", ik, [
                    N(ct, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (m(), _("div", rk, [
                  u("div", lk, [
                    u("div", ck, [
                      N(E(at), { class: "empty-icon" })
                    ]),
                    y[1] || (y[1] = u("p", { class: "empty-title" }, "No model usage data available", -1)),
                    y[2] || (y[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), uk = /* @__PURE__ */ me(dk, [["__scopeId", "data-v-48a6cc07"]]), hk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, fk = { class: "card-body" }, gk = {
  key: 0,
  class: "message-roles-table-block"
}, pk = { class: "w-full min-w-0" }, mk = {
  key: 1,
  class: "empty-state"
}, bk = { class: "empty-state-content" }, vk = { class: "empty-icon-wrapper" }, yk = /* @__PURE__ */ ie({
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
    const a = e, o = n, s = (y) => {
      o("export", y);
    }, { isDark: i } = Me(Se(a, "theme")), r = ["assistant", "system", "user"], l = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => a.data?.total_by_role || {}), d = C(
      () => r.map((y) => ({
        id: y,
        role: g(y),
        avgCost: b(c.value[y]?.avg_cost_per_message),
        avgTokens: f(c.value[y]?.avg_tokens_per_message),
        messageCount: f(c.value[y]?.message_count),
        totalCost: b(c.value[y]?.total_cost),
        totalTokens: f(c.value[y]?.total_tokens)
      }))
    ), h = C(() => Object.keys(c.value).length > 0), f = (y) => y == null ? "0" : le(y), b = (y) => y == null ? "$0.00" : Le(y), g = (y) => y.charAt(0).toUpperCase() + y.slice(1);
    return t({ isDark: i }), (y, v) => (m(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", hk, [
          u("div", fk, [
            h.value ? (m(), _("div", gk, [
              u("div", pk, [
                N(ct, {
                  columns: l,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (m(), _("div", mk, [
              u("div", bk, [
                u("div", vk, [
                  N(E(at), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                v[1] || (v[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), xk = /* @__PURE__ */ me(yk, [["__scopeId", "data-v-d38e854e"]]), _k = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, kk = { class: "card-body" }, wk = {
  key: 0,
  class: "chart-section"
}, Ck = { class: "chart-container" }, $k = { class: "kpi-grid" }, Sk = {
  key: 1,
  class: "empty-state"
}, Mk = { class: "empty-state-content" }, Dk = { class: "empty-icon-wrapper" }, Ak = /* @__PURE__ */ ie({
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
    }, c = (x) => x.agent_type || x.agent_id || x.agent_name || "", d = (x) => x.agent_name ? x.agent_name : c(x).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (x) => {
      const k = c(x).toLowerCase();
      for (const [w, $] of Object.entries(l))
        if (k.includes(w))
          return $;
      return "#9ca3af";
    }, f = C(() => [...a.data?.top_agents || []].sort((k, w) => w.avg_cost_per_conversation - k.avg_cost_per_conversation)), b = C(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : f.value.reduce((x, k) => x + k.conversations, 0)), g = C(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : f.value.reduce((x, k) => x + k.total_cost, 0)), y = C(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : b.value === 0 ? 0 : g.value / b.value), v = C(() => {
      const x = f.value;
      if (x.length === 0)
        return { labels: [], datasets: [] };
      const k = x.map((S) => d(S)), w = x.map((S) => S.avg_cost_per_conversation), $ = x.map((S) => h(S));
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
            label: function(x) {
              const k = f.value[x.dataIndex];
              return [
                `Cost: ${Le(x.parsed.x)}`,
                `Conversations: ${le(k.conversations)}`,
                `Total Cost: ${Le(k.total_cost)}`
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
            callback: function(x) {
              return Le(x);
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
    return t({ isDark: i }), (x, k) => (m(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(E(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: R(() => [
        u("div", _k, [
          u("div", kk, [
            v.value.labels && v.value.labels.length ? (m(), _("section", wk, [
              u("div", Ck, [
                N(kt, {
                  data: v.value,
                  options: p.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", $k, [
                N(E(xe), {
                  title: "Total Agents",
                  value: String(f.value.length)
                }, null, 8, ["value"]),
                N(E(xe), {
                  title: "Total Conversations",
                  value: E(le)(b.value)
                }, null, 8, ["value"]),
                N(E(xe), {
                  title: "Total Cost",
                  value: E(Le)(g.value)
                }, null, 8, ["value"]),
                N(E(xe), {
                  title: "Avg Cost / Conv.",
                  value: E(Le)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (m(), _("section", Sk, [
              u("div", Mk, [
                u("div", Dk, [
                  N(E(at), { class: "empty-icon" })
                ]),
                k[0] || (k[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                k[1] || (k[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Tk = /* @__PURE__ */ me(Ak, [["__scopeId", "data-v-34c6a73a"]]);
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
    const f = r(d, o + h), b = So(d, s), g = b.length > 0, y = i.has(f);
    c.push({
      row: d,
      key: f,
      depth: n,
      hasChildren: g,
      isExpanded: y,
      parentKey: a
    }), g && y && (l === void 0 || n < l) && c.push(
      ...xr(b, t, n + 1, f, 0)
    );
  }), c;
}
function _r(e, t, n = 0, a = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, r = [];
  return e.forEach((l, c) => {
    const d = s(l, a + c), h = So(l, o), f = h.length > 0, b = {
      depth: n,
      isChild: n > 0,
      hasChildren: f
    };
    (i?.(l, b) ?? !0) && r.push(d), h.length > 0 && r.push(
      ..._r(h, t, n + 1, 0)
    );
  }), r;
}
const Bk = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Lk = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, Pk = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Ek = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, Rk = ["checked", "aria-label"], Ik = ["aria-sort", "onClick"], Fk = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Ok = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Vk = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, zk = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, Nk = ["checked", "aria-label", "onChange"], jk = ["aria-expanded", "aria-label", "onClick"], Hk = ["aria-expanded", "aria-label", "onClick"], Wk = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, Kk = { class: "min-w-0 flex-1" }, Yk = /* @__PURE__ */ ie({
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
      set(P) {
        s.value = P, a("update:expandedKeys", P);
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
      const { sortKey: P, sortDirection: j, sortCompare: K, rows: ce } = n;
      return !P || !j || !K ? ce : n.expandable ? yr(ce, {
        childrenKey: n.childrenKey,
        sortKey: P,
        sortDirection: j,
        compare: K
      }) : [...ce].sort((ve, De) => K(ve, De, P, j));
    }), h = C(() => n.expandable ? xr(d.value, c.value) : d.value.map((P, j) => ({
      row: P,
      key: g(P, j),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function f(P) {
      return `cell-${P}`;
    }
    function b(P) {
      return P === "center" ? "text-center" : P === "right" ? "text-right" : "text-left";
    }
    function g(P, j) {
      if (typeof n.rowKey == "function")
        return n.rowKey(P);
      const K = P[n.rowKey];
      return K != null ? String(K) : `__index_${j}`;
    }
    function y(P, j) {
      return P[j];
    }
    function v(P) {
      return P == null || typeof P == "object" ? "" : String(P);
    }
    function p(P) {
      return n.expandable && P === l.value;
    }
    function x(P) {
      return P.hasChildren || (n.isRowExpandable?.(P.row) ?? !1);
    }
    function k(P, j) {
      return {
        row: P.row,
        column: j,
        value: y(P.row, j.key),
        depth: P.depth,
        isChild: P.depth > 0,
        hasChildren: P.hasChildren,
        expanded: P.isExpanded
      };
    }
    function w(P) {
      if (!x(P)) return;
      const j = new Set(i.value);
      j.has(P.key) ? (j.delete(P.key), a("collapse", P.key, P.row)) : (n.singleExpand && j.clear(), j.add(P.key), a("expand", P.key, P.row)), i.value = [...j];
    }
    function $(P) {
      return {
        depth: P.depth,
        isChild: P.depth > 0,
        hasChildren: P.hasChildren
      };
    }
    function S(P, j) {
      return n.isRowSelectable?.(P, j) ?? !0;
    }
    function M(P) {
      return S(P.row, $(P));
    }
    function V(P) {
      return n.selectable && x(P) && !M(P);
    }
    function H(P) {
      return x(P) && !V(P);
    }
    function B(P) {
      return H(P) ? !1 : P.depth > 0 ? !0 : n.selectable && !x(P);
    }
    const T = C(() => {
      const { isRowSelectable: P } = n;
      return n.expandable ? _r(d.value, {
        childrenKey: n.childrenKey,
        resolveRowKey: g,
        isRowSelectable: P
      }) : d.value.map((j, K) => ({
        row: j,
        key: g(j, K),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: j, context: K }) => S(j, K)).map(({ key: j }) => j);
    });
    function D(P) {
      const j = String(P);
      return n.selectedKeys.some((K) => String(K) === j);
    }
    const L = C(() => !n.selectable || T.value.length === 0 ? !1 : T.value.every(
      (P) => n.selectedKeys.some((j) => String(j) === String(P))
    )), I = C(() => {
      if (!n.selectable || T.value.length === 0) return !1;
      const P = T.value.filter(
        (j) => n.selectedKeys.some((K) => String(K) === String(j))
      );
      return P.length > 0 && P.length < T.value.length;
    });
    Ie(
      [I, L, () => n.selectable],
      async () => {
        await je();
        const P = o.value;
        P && (P.indeterminate = I.value && !L.value);
      },
      { immediate: !0 }
    );
    function G() {
      if (n.selectable)
        if (L.value) {
          const P = new Set(
            T.value.map((K) => String(K))
          ), j = n.selectedKeys.filter(
            (K) => !P.has(String(K))
          );
          a("update:selectedKeys", j);
        } else {
          const P = new Set(n.selectedKeys.map((j) => String(j)));
          T.value.forEach((j) => P.add(String(j))), a("update:selectedKeys", [...P]);
        }
    }
    function Q(P) {
      if (!n.selectable) return;
      const j = String(P), K = h.value.find((ve) => String(ve.key) === j);
      if (K && !M(K) || !K && !T.value.some((ve) => String(ve) === j))
        return;
      n.selectedKeys.some((ve) => String(ve) === j) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((ve) => String(ve) !== j)
      ) : a("update:selectedKeys", [...n.selectedKeys, j]);
    }
    function ne(P) {
      return `${n.ariaLabelSelectRow} ${P}`;
    }
    function re(P) {
      a("sort", P);
    }
    function ge(P) {
      return n.sortKey === P && n.sortDirection != null;
    }
    function q(P) {
      return ge(P) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (P, j) => (m(), _("div", Bk, [
      u("div", Lk, [
        u("table", {
          class: te([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", Pk, [
              e.selectable ? (m(), _("th", Ek, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: L.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: G
                }, null, 40, Rk)
              ])) : z("", !0),
              (m(!0), _(se, null, fe(e.columns, (K) => (m(), _("th", {
                key: K.key,
                scope: "col",
                class: te([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  p(K.key) && e.selectable ? "!pl-0" : "",
                  b(K.align),
                  K.headerClass ?? ""
                ])
              }, [
                K.sortable ? (m(), _("button", {
                  key: 0,
                  type: "button",
                  class: te(["kiut-table-sort-btn inline-flex items-center gap-1", b(K.align)]),
                  "aria-sort": q(K.key),
                  onClick: (ce) => re(K.key)
                }, [
                  u("span", null, A(K.label), 1),
                  u("span", Fk, [
                    ge(K.key) ? (m(), _(se, { key: 0 }, [
                      e.sortDirection === "asc" ? (m(), _("span", Ok, "↑")) : e.sortDirection === "desc" ? (m(), _("span", Vk, "↓")) : z("", !0)
                    ], 64)) : (m(), _(se, { key: 1 }, [
                      j[0] || (j[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      j[1] || (j[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Ik)) : (m(), _(se, { key: 1 }, [
                  Ae(A(K.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), _(se, null, fe(h.value, (K) => (m(), _("tr", {
              key: K.key,
              class: te([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                K.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (m(), _("td", zk, [
                M(K) ? (m(), _("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: D(K.key),
                  "aria-label": ne(K.key),
                  onChange: (ce) => Q(K.key)
                }, null, 40, Nk)) : V(K) ? (m(), _("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": K.isExpanded,
                  "aria-label": K.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Oe((ce) => w(K), ["stop"])
                }, [
                  N(E(Qt), {
                    class: te(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !K.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, jk)) : z("", !0)
              ])) : z("", !0),
              (m(!0), _(se, null, fe(e.columns, (ce) => (m(), _("td", {
                key: ce.key,
                class: te([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  p(ce.key) ? "pl-0 pr-2" : "px-2",
                  b(ce.align),
                  ce.cellClass ?? ""
                ])
              }, [
                p(ce.key) ? (m(), _("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: we({ paddingLeft: `${K.depth * 1.25}rem` })
                }, [
                  _e(P.$slots, "row-expand", {
                    row: K.row,
                    expanded: K.isExpanded,
                    hasChildren: K.hasChildren,
                    depth: K.depth,
                    toggle: () => w(K)
                  }, () => [
                    H(K) ? (m(), _("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": K.isExpanded,
                      "aria-label": K.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Oe((ve) => w(K), ["stop"])
                    }, [
                      N(E(Qt), {
                        class: te(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !K.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, Hk)) : B(K) ? (m(), _("span", Wk)) : z("", !0)
                  ], !0),
                  u("div", Kk, [
                    _e(P.$slots, f(ce.key), _t({ ref_for: !0 }, k(K, ce)), () => [
                      Ae(A(v(y(K.row, ce.key))), 1)
                    ], !0)
                  ])
                ], 4)) : _e(P.$slots, f(ce.key), _t({
                  key: 1,
                  ref_for: !0
                }, k(K, ce)), () => [
                  Ae(A(v(y(K.row, ce.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), Uk = /* @__PURE__ */ me(Yk, [["__scopeId", "data-v-b3104817"]]), oi = /* @__PURE__ */ ie({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (a, o) => (m(), _("svg", {
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
}), qk = ["disabled", "aria-expanded", "aria-label"], Xk = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, Gk = { class: "min-w-0 truncate" }, Zk = ["disabled", "onClick", "onMouseenter"], Qk = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, Jk = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, e2 = { class: "min-w-0 flex-1 text-left" }, t2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, n2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, a2 = ["disabled", "aria-expanded", "aria-label"], o2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, s2 = ["disabled", "onClick", "onMouseenter"], i2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, r2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, l2 = { class: "min-w-0 flex-1 text-left" }, c2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, d2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, u2 = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, h2 = ["type", "disabled", "aria-busy", "aria-label"], f2 = {
  key: 2,
  class: "min-w-0 truncate"
}, g2 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, p2 = ["type", "disabled", "aria-busy", "aria-label"], m2 = {
  key: 2,
  class: "min-w-0 truncate"
}, xt = /* @__PURE__ */ ie({
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
      const P = o["aria-label"];
      if (typeof P == "string" && P.length > 0) return P;
      if ((l.value || r.value) && n.tooltip?.trim()) return n.tooltip.trim();
    }), b = C(() => {
      const P = o.type;
      return P === "submit" || P === "reset" || P === "button" ? P : "button";
    }), g = C(() => {
      const { class: P, type: j, "aria-label": K, ...ce } = o;
      return ce;
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
    ]), v = `kiut-button-menu-${Ye()}`, p = `${v}-btn`, x = `${v}-menu`, k = ae(null), w = ae(null), $ = ae(null), S = ae(!1), M = ae(0), V = ae({}), H = C(() => n.options.filter((P) => !P.disabled));
    function B(P) {
      return `${P.value}-${P.label}`;
    }
    function T() {
      const P = w.value;
      if (!P) return;
      const j = P.getBoundingClientRect(), K = {
        top: `${j.bottom - 3}px`,
        minWidth: `max(${j.width}px, ${n.menuMinWidth})`
      };
      n.menuAlign === "right" ? (K.right = `${window.innerWidth - j.right}px`, K.left = "auto") : (K.left = `${j.left}px`, K.right = "auto"), V.value = K;
    }
    function D(P) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        M.value === P ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function L() {
      S.value = !1;
    }
    function I() {
      T(), M.value = 0, je(() => $.value?.focus());
    }
    function G() {
      if (!n.disabled) {
        if (S.value) {
          L();
          return;
        }
        S.value = !0, I();
      }
    }
    function Q(P) {
      P.disabled || (a("select", P), L());
    }
    function ne(P) {
      P.stopPropagation(), G();
    }
    function re(P) {
      if (!S.value) return;
      const j = P.target, K = k.value, ce = $.value;
      K && !K.contains(j) && (!ce || !ce.contains(j)) && L();
    }
    function ge(P) {
      n.disabled || (P.key === "ArrowDown" || P.key === "Enter" || P.key === " ") && (P.preventDefault(), S.value || (S.value = !0, I()));
    }
    function q(P) {
      const j = H.value;
      if (P.key === "Escape") {
        P.preventDefault(), L(), w.value?.focus();
        return;
      }
      if (j.length !== 0) {
        if (P.key === "ArrowDown") {
          P.preventDefault(), M.value = Math.min(M.value + 1, j.length - 1);
          return;
        }
        if (P.key === "ArrowUp") {
          P.preventDefault(), M.value = Math.max(M.value - 1, 0);
          return;
        }
        if (P.key === "Enter" || P.key === " ") {
          P.preventDefault();
          const K = j[M.value];
          K && Q(K);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", re);
    }), lt(() => {
      document.removeEventListener("click", re);
    }), (P, j) => i.value ? (m(), _("div", {
      key: 0,
      ref_key: "rootRef",
      ref: k,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", _t({
        ref_key: "buttonRef",
        ref: w,
        id: p,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [y.value, E(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": f.value
      }, g.value, {
        onClick: ne,
        onKeydown: ge
      }), [
        P.$slots.icon ? (m(), _("span", Xk, [
          _e(P.$slots, "icon")
        ])) : z("", !0),
        u("span", Gk, [
          _e(P.$slots, "default")
        ]),
        N(E(Qt), {
          class: te(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", S.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, qk),
      (m(), ee(un, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: we(V.value),
          onKeydown: Oe(q, ["stop"])
        }, [
          (m(!0), _(se, null, fe(H.value, (K, ce) => (m(), _("button", {
            key: B(K),
            type: "button",
            role: "menuitem",
            disabled: K.disabled,
            class: te(D(ce)),
            onClick: Oe((ve) => Q(K), ["stop"]),
            onMouseenter: (ve) => M.value = ce
          }, [
            K.icon ? (m(), _("span", Qk, [
              (m(), ee(Mt(K.icon), { class: "h-5 w-5" }))
            ])) : (m(), _("span", Jk)),
            u("span", e2, [
              u("span", t2, A(K.label), 1),
              K.description ? (m(), _("span", n2, A(K.description), 1)) : z("", !0)
            ])
          ], 42, Zk))), 128))
        ], 36), [
          [Xt, S.value]
        ])
      ]))
    ], 512)) : r.value ? (m(), _("div", {
      key: 1,
      ref_key: "rootRef",
      ref: k,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", _t({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [y.value, E(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": f.value
      }, g.value, {
        onClick: ne,
        onKeydown: ge
      }), [
        P.$slots.icon ? (m(), _("span", o2, [
          _e(P.$slots, "icon")
        ])) : z("", !0)
      ], 16, a2),
      (m(), ee(un, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: we(V.value),
          onKeydown: Oe(q, ["stop"])
        }, [
          (m(!0), _(se, null, fe(H.value, (K, ce) => (m(), _("button", {
            key: B(K),
            type: "button",
            role: "menuitem",
            disabled: K.disabled,
            class: te(D(ce)),
            onClick: Oe((ve) => Q(K), ["stop"]),
            onMouseenter: (ve) => M.value = ce
          }, [
            K.icon ? (m(), _("span", i2, [
              (m(), ee(Mt(K.icon), { class: "h-5 w-5" }))
            ])) : (m(), _("span", r2)),
            u("span", l2, [
              u("span", c2, A(K.label), 1),
              K.description ? (m(), _("span", d2, A(K.description), 1)) : z("", !0)
            ])
          ], 42, s2))), 128))
        ], 36), [
          [Xt, S.value]
        ])
      ]))
    ], 512)) : s.value ? (m(), _("span", u2, [
      u("button", _t({
        type: b.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, y.value, E(o).class]],
        disabled: d.value,
        "aria-busy": e.loading || void 0,
        "aria-label": f.value
      }, g.value), [
        e.loading ? (m(), ee(oi, {
          key: 0,
          compact: l.value
        }, null, 8, ["compact"])) : P.$slots.icon ? (m(), _("span", {
          key: 1,
          class: te(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          _e(P.$slots, "icon")
        ], 2)) : z("", !0),
        c.value ? (m(), _("span", f2, [
          _e(P.$slots, "default")
        ])) : z("", !0)
      ], 16, h2),
      u("span", g2, A(e.tooltip), 1)
    ])) : (m(), _("button", _t({
      key: 3,
      type: b.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, y.value, E(o).class]],
      disabled: d.value,
      "aria-busy": e.loading || void 0,
      "aria-label": f.value
    }, g.value), [
      e.loading ? (m(), ee(oi, {
        key: 0,
        compact: l.value
      }, null, 8, ["compact"])) : P.$slots.icon ? (m(), _("span", {
        key: 1,
        class: te(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        _e(P.$slots, "icon")
      ], 2)) : z("", !0),
      c.value ? (m(), _("span", m2, [
        _e(P.$slots, "default")
      ])) : z("", !0)
    ], 16, p2));
  }
}), b2 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], v2 = { class: "sr-only" }, kr = /* @__PURE__ */ ie({
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
    return (s, i) => (m(), _("button", {
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
      u("span", v2, A(e.ariaLabel), 1)
    ], 42, b2));
  }
}), y2 = {
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
}, x2 = [
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
], xS = [
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
], _2 = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, k2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, w2 = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, C2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, $2 = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, S2 = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, M2 = ["aria-expanded", "aria-label", "onClick"], D2 = { class: "min-w-0 flex-1" }, A2 = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, T2 = ["colspan"], B2 = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, L2 = {
  key: 0,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, P2 = {
  key: 1,
  class: "space-y-2"
}, E2 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, R2 = ["title"], I2 = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, F2 = { class: "ml-auto flex shrink-0 items-center gap-2" }, O2 = /* @__PURE__ */ ie({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => x2 },
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
      ...y2,
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
        expanded: y(B, D)
      };
    }
    function h(B) {
      const T = B.key;
      return B.label ? B.label : T in i.value ? i.value[T] : B.key;
    }
    function f(B) {
      return B === "center" ? "text-center" : B === "right" ? "text-right" : "text-left";
    }
    function b(B) {
      return B === r.value;
    }
    function g(B, T) {
      if (typeof n.rowKey == "function")
        return n.rowKey(B);
      const D = B[n.rowKey];
      return D != null ? String(D) : `__index_${T}`;
    }
    function y(B, T) {
      return s.value.includes(g(B, T));
    }
    function v(B, T) {
      const D = g(B, T), L = new Set(s.value);
      L.has(D) ? (L.delete(D), a("collapse", D, B)) : (n.singleExpand && L.clear(), L.add(D), a("expand", D, B)), s.value = [...L];
    }
    function p(B) {
      return B.type ?? B.key;
    }
    function x(B) {
      return l[B] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function k(B) {
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
            x(B.method)
          ]
        },
        B.method
      ) : null;
    }
    function V(B, T) {
      const D = T.actions ?? ["view", "edit"], L = [];
      for (const I of D)
        I === "view" ? L.push(
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
        ) : I === "run" ? L.push(
          ze(
            xt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => a("run", B)
            },
            { icon: () => ze(Kp, { class: "h-4 w-4" }) }
          )
        ) : I === "edit" ? L.push(
          ze(
            xt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => a("edit", B)
            },
            { icon: () => ze(Wp, { class: "h-4 w-4" }) }
          )
        ) : I === "createDraft" ? L.push(
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
        ) : I === "delete" && L.push(
          ze(
            xt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => a("delete", B)
            },
            { icon: () => ze(Yp, { class: "h-4 w-4" }) }
          )
        );
      return ze(
        "div",
        { class: "flex items-center justify-end gap-1" },
        L
      );
    }
    function H(B, T, D) {
      switch (p(T)) {
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
            { color: k(B.status), outlined: !1 },
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
            "onUpdate:modelValue": (I) => a("toggleActive", B, I)
          });
        case "actions":
          return V(B, T);
        default:
          return ze("span", {}, String(B[T.key] ?? ""));
      }
    }
    return (B, T) => (m(), _("div", _2, [
      u("div", k2, [
        u("table", w2, [
          u("thead", null, [
            u("tr", C2, [
              (m(!0), _(se, null, fe(e.columns, (D) => (m(), _("th", {
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
            (m(!0), _(se, null, fe(e.rows, (D, L) => (m(), _(se, {
              key: g(D, L)
            }, [
              u("tr", $2, [
                (m(!0), _(se, null, fe(e.columns, (I) => (m(), _("td", {
                  key: I.key,
                  class: te([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    f(I.align),
                    I.cellClass ?? ""
                  ])
                }, [
                  _e(B.$slots, c(I.key), _t({ ref_for: !0 }, d(D, I, L)), () => [
                    b(I.key) ? (m(), _("div", S2, [
                      u("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": y(D, L),
                        "aria-label": y(D, L) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (G) => v(D, L)
                      }, [
                        N(E(Qt), {
                          class: te(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !y(D, L) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, M2),
                      u("div", D2, [
                        (m(), ee(Mt(() => H(D, I))))
                      ])
                    ])) : (m(), ee(Mt(() => H(D, I)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              y(D, L) ? (m(), _("tr", A2, [
                u("td", {
                  colspan: e.columns.length,
                  class: "px-4 pb-4 pt-1"
                }, [
                  u("h4", B2, A(i.value.historialTitle), 1),
                  D.versions?.length ? (m(), _("div", P2, [
                    (m(!0), _(se, null, fe(D.versions, (I) => (m(), _("div", {
                      key: I.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      _e(B.$slots, "history-item", {
                        version: I,
                        row: D
                      }, () => [
                        N(Ue, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: R(() => [
                            Ae(A(I.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        u("span", E2, A(I.version), 1),
                        I.method ? (m(), _("span", {
                          key: 0,
                          class: te(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", x(I.method)])
                        }, A(I.method), 3)) : z("", !0),
                        I.url ? (m(), _("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: I.url
                        }, A(I.url), 9, R2)) : z("", !0),
                        u("span", I2, A($(I.updatedAt)), 1)
                      ], !0),
                      u("div", F2, [
                        _e(B.$slots, "history-actions", {
                          version: I,
                          row: D
                        }, () => [
                          N(xt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (G) => a("viewVersion", I, D)
                          }, {
                            icon: R(() => [
                              N(E(Js), { class: "h-4 w-4" })
                            ]),
                            default: R(() => [
                              Ae(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          N(xt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (G) => a("createDraftFromVersion", I, D)
                          }, {
                            icon: R(() => [
                              N(E(Qs), { class: "h-4 w-4" })
                            ]),
                            default: R(() => [
                              Ae(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (m(), _("p", L2, A(i.value.emptyHistory), 1))
                ], 8, T2)
              ])) : z("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), V2 = /* @__PURE__ */ me(O2, [["__scopeId", "data-v-acb95669"]]);
function z2(e, t) {
  return m(), _("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function N2(e, t) {
  return m(), _("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const j2 = ["aria-label"], H2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, W2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, K2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Y2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], U2 = { class: "truncate" }, q2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, X2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, G2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, Z2 = ["aria-label", "onClick"], Q2 = ["aria-label", "onClick"], J2 = ["aria-label"], ew = ["aria-label"], tw = {
  key: 1,
  class: "space-y-2"
}, nw = ["for"], aw = ["id", "placeholder", "onKeydown"], ow = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, sw = ["aria-label"], iw = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, rw = ["checked", "onChange"], lw = { class: "min-w-0 flex-1" }, cw = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, dw = { class: "flex flex-wrap items-end gap-2" }, uw = { class: "min-w-[120px] flex-1" }, hw = ["for"], fw = ["id"], gw = { class: "min-w-[120px] flex-1" }, pw = ["for"], mw = ["id"], bw = /* @__PURE__ */ ie({
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
    const n = e, a = t, o = eo(), i = `${`kiut-filters-${Ye()}`}-panel`, r = ae(null), l = /* @__PURE__ */ new Map(), c = ae(null), d = ae(!1), h = ae({}), f = ae(null), b = ae(""), g = ae([]), y = ae(""), v = ae(""), p = C(() => c.value ? n.filterDefinitions.find((F) => F.id === c.value) ?? null : null), x = C(() => {
      const F = p.value;
      if (F)
        return F.type === "text" ? b.value : F.type === "select" ? g.value : { start: y.value, end: v.value };
    });
    function k(F, X) {
      X && X instanceof HTMLElement ? l.set(F, X) : l.delete(F);
    }
    function w(F) {
      return n.modelValue[F];
    }
    function $(F) {
      if (F == null) return [];
      if (Array.isArray(F))
        return F.filter((X) => typeof X == "string" && X.trim() !== "");
      if (typeof F == "string") {
        const X = F.trim();
        return X ? [X] : [];
      }
      return [];
    }
    function S(F, X) {
      if (X == null) return !0;
      if (F.type === "text") return String(X).trim() === "";
      if (F.type === "select") return $(X).length === 0;
      if (F.type === "dateRange") {
        const oe = X;
        return !oe?.start?.trim() || !oe?.end?.trim();
      }
      return !0;
    }
    const M = C(
      () => n.filterDefinitions.some((F) => !S(F, w(F.id)))
    ), V = C(() => {
      const F = [];
      for (const X of n.filterDefinitions) {
        const oe = w(X.id);
        if (!S(X, oe)) {
          if (X.type === "text")
            F.push({ kind: "text", def: X, key: X.id });
          else if (X.type === "dateRange")
            F.push({ kind: "dateRange", def: X, key: X.id });
          else if (X.type === "select")
            for (const he of $(oe))
              F.push({
                kind: "select",
                def: X,
                optionValue: he,
                key: `${X.id}::${he}`
              });
        }
      }
      return F;
    });
    function H(F) {
      return F.type !== "select" ? 0 : $(w(F.id)).length;
    }
    function B(F) {
      const X = w(F.id), oe = F.label.replace(/^\+\s*/, "");
      if (F.type === "text") return `${oe}: ${String(X ?? "").trim()}`;
      if (F.type === "select") {
        const nt = $(X).map((ft) => F.options.find((wt) => wt.value === ft)?.label ?? ft);
        return `${oe}: ${nt.join(", ")}`;
      }
      const he = X, be = D(he.start), ke = D(he.end);
      return `${oe}: ${be} – ${ke}`;
    }
    function T(F) {
      return F.kind === "text" || F.kind === "dateRange" ? B(F.def) : F.def.options.find((oe) => oe.value === F.optionValue)?.label ?? F.optionValue;
    }
    function D(F) {
      if (!F) return "";
      const X = We(F, "YYYY-MM-DD", !0);
      return X.isValid() ? X.format("L") : F;
    }
    function L(F) {
      const X = c.value === F.id && d.value, oe = !S(F, w(F.id));
      return X || oe ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function I(F) {
      return S(F, w(F.id)) ? Z(F) : `Editar filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    function G(F) {
      const X = w(F.id);
      if (F.type === "text") {
        b.value = X != null ? String(X) : "";
        return;
      }
      if (F.type === "select") {
        g.value = [...$(X)];
        return;
      }
      const oe = X;
      y.value = oe?.start?.trim() ?? "", v.value = oe?.end?.trim() ?? "";
    }
    function Q() {
      const F = p.value;
      if (!F || F.type !== "select") return;
      const X = { ...n.modelValue };
      g.value.length === 0 ? delete X[F.id] : X[F.id] = [...g.value], a("update:modelValue", X), a("change", X);
    }
    function ne(F) {
      const X = g.value.indexOf(F);
      X >= 0 ? g.value = g.value.filter((oe, he) => he !== X) : g.value = [...g.value, F], Q();
    }
    function re(F) {
      if (!F) return;
      f.value = F;
      const X = F.getBoundingClientRect(), oe = 300;
      let he = X.left;
      const be = window.innerWidth - oe - 12;
      he > be && (he = Math.max(12, be)), he < 12 && (he = 12);
      const ke = X.bottom + 8;
      h.value = {
        top: `${ke}px`,
        left: `${he}px`,
        width: `${Math.min(oe, window.innerWidth - 24)}px`
      };
    }
    function ge(F, X) {
      if (c.value === F.id && d.value) {
        ce();
        return;
      }
      d.value && c.value !== F.id && ce(), c.value = F.id, d.value = !0, G(F), je().then(async () => {
        re(X.currentTarget), await je(), P();
      });
    }
    function q(F, X) {
      if (c.value === F.id && d.value) {
        ce();
        return;
      }
      d.value && c.value !== F.id && ce(), c.value = F.id, d.value = !0, G(F), je().then(async () => {
        const oe = l.get(F.id) ?? X.currentTarget;
        re(oe), await je(), P();
      });
    }
    function P() {
      const F = r.value;
      if (!F) return;
      F.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function j() {
      d.value = !1, c.value = null, f.value = null;
    }
    function K(F) {
      const X = p.value;
      if (!X) return;
      if (X.type === "text") {
        b.value = F != null ? String(F) : "";
        return;
      }
      if (X.type === "select") {
        g.value = Array.isArray(F) ? F.filter((he) => typeof he == "string") : $(F);
        return;
      }
      const oe = F;
      y.value = oe?.start?.trim() ?? "", v.value = oe?.end?.trim() ?? "";
    }
    function ce() {
      const F = p.value;
      if (!F) return;
      if (F.type === "text") {
        const be = b.value.trim(), ke = { ...n.modelValue };
        be === "" ? delete ke[F.id] : ke[F.id] = be, a("update:modelValue", ke), a("change", ke), j();
        return;
      }
      if (F.type === "select") {
        Q(), j();
        return;
      }
      const X = y.value.trim(), oe = v.value.trim(), he = { ...n.modelValue };
      !X || !oe || X > oe ? delete he[F.id] : he[F.id] = { start: X, end: oe }, a("update:modelValue", he), a("change", he), j();
    }
    function ve(F) {
      const X = { ...n.modelValue };
      delete X[F], a("update:modelValue", X), a("change", X), c.value === F && j();
    }
    function De(F) {
      if (F.kind === "text" || F.kind === "dateRange") {
        ve(F.def.id);
        return;
      }
      const X = { ...n.modelValue }, he = $(X[F.def.id]).filter((be) => be !== F.optionValue);
      he.length === 0 ? delete X[F.def.id] : X[F.def.id] = he, a("update:modelValue", X), a("change", X), c.value === F.def.id && G(F.def);
    }
    function O() {
      const F = {};
      a("update:modelValue", F), a("change", F), j();
    }
    const W = C(() => {
      const F = p.value;
      return F ? `Editar filtro: ${F.label}` : "Filtro";
    });
    function U(F) {
      const X = F.def.label.replace(/^\+\s*/, "");
      return F.kind === "select" ? `Quitar ${F.def.options.find((be) => be.value === F.optionValue)?.label ?? F.optionValue} del filtro ${X}` : `Quitar filtro ${X}`;
    }
    function de(F) {
      const X = F.def.label.replace(/^\+\s*/, "");
      if (F.kind === "select") {
        const he = F.def.options.find((be) => be.value === F.optionValue)?.label ?? F.optionValue;
        return `Editar filtro ${X}: ${he}`;
      }
      return `Editar filtro ${X}`;
    }
    function Z(F) {
      return `Añadir filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    const Y = C(() => n.clearLabel);
    function J(F) {
      if (!d.value || !r.value) return;
      const X = F.target;
      if (!(r.value.contains(X) || (X instanceof Element ? X : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const he of l.values())
          if (he?.contains(X)) return;
        ce();
      }
    }
    function ue(F) {
      F.key === "Escape" && d.value && (F.preventDefault(), j());
    }
    function pe() {
      !d.value || !f.value || re(f.value);
    }
    return Ze(() => {
      document.addEventListener("mousedown", J, !0), window.addEventListener("keydown", ue, !0), window.addEventListener("resize", pe);
    }), ri(() => {
      document.removeEventListener("mousedown", J, !0), window.removeEventListener("keydown", ue, !0), window.removeEventListener("resize", pe);
    }), Ie(
      () => n.modelValue,
      () => {
        const F = p.value;
        F && d.value && !o.panel && G(F);
      },
      { deep: !0 }
    ), (F, X) => (m(), _("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", H2, [
        u("span", W2, A(e.label), 1),
        u("div", K2, [
          (m(!0), _(se, null, fe(e.filterDefinitions, (oe) => (m(), _("button", {
            key: `pill-${oe.id}`,
            ref_for: !0,
            ref: (he) => k(oe.id, he),
            type: "button",
            class: te(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", L(oe)]),
            "aria-label": I(oe),
            "aria-expanded": c.value === oe.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === oe.id ? i : void 0,
            onClick: (he) => q(oe, he)
          }, [
            N(E(z2), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", U2, A(oe.label), 1),
            oe.type === "select" && H(oe) > 0 ? (m(), _("span", q2, A(H(oe)), 1)) : z("", !0)
          ], 10, Y2))), 128))
        ])
      ]),
      M.value ? (m(), _("div", X2, [
        u("div", G2, [
          (m(!0), _(se, null, fe(V.value, (oe) => (m(), _("div", {
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
            ], 8, Z2),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": U(oe),
              onClick: (he) => De(oe)
            }, [
              N(E(N2), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, Q2)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": Y.value,
          onClick: O
        }, A(e.clearLabel), 9, J2)
      ])) : z("", !0),
      (m(), ee(un, { to: "body" }, [
        c.value && d.value ? (m(), _("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": W.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: we(h.value),
          onKeydown: X[3] || (X[3] = Oe(() => {
          }, ["stop"]))
        }, [
          p.value ? (m(), _(se, { key: 0 }, [
            F.$slots.panel ? _e(F.$slots, "panel", {
              key: 0,
              filter: p.value,
              close: ce,
              value: x.value,
              updateValue: K
            }, void 0, !0) : (m(), _("div", tw, [
              p.value.type === "text" ? (m(), _(se, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(p.value.label), 9, nw),
                Ge(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": X[0] || (X[0] = (oe) => b.value = oe),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: p.value.placeholder ?? "…",
                  onKeydown: zn(Oe(ce, ["prevent"]), ["enter"])
                }, null, 40, aw), [
                  [Yt, b.value]
                ])
              ], 64)) : p.value.type === "select" ? (m(), _(se, { key: 1 }, [
                u("p", ow, A(p.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": p.value.label,
                  "aria-multiselectable": !0
                }, [
                  (m(!0), _(se, null, fe(p.value.options, (oe) => (m(), _("li", {
                    key: oe.value
                  }, [
                    u("label", iw, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(oe.value),
                        onChange: (he) => ne(oe.value)
                      }, null, 40, rw),
                      u("span", lw, A(oe.label), 1)
                    ])
                  ]))), 128))
                ], 8, sw)
              ], 64)) : p.value.type === "dateRange" ? (m(), _(se, { key: 2 }, [
                u("p", cw, A(p.value.label), 1),
                u("div", dw, [
                  u("div", uw, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, hw),
                    Ge(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": X[1] || (X[1] = (oe) => y.value = oe),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, fw), [
                      [Yt, y.value]
                    ])
                  ]),
                  u("div", gw, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, pw),
                    Ge(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": X[2] || (X[2] = (oe) => v.value = oe),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, mw), [
                      [Yt, v.value]
                    ])
                  ])
                ])
              ], 64)) : z("", !0)
            ]))
          ], 64)) : z("", !0)
        ], 44, ew)) : z("", !0)
      ]))
    ], 8, j2));
  }
}), vw = /* @__PURE__ */ me(bw, [["__scopeId", "data-v-f38e0100"]]), yw = { class: "font-sans" }, xw = ["for"], _w = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], kw = ["id"], ww = /* @__PURE__ */ ie({
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
      (p) => {
        d.value = p ?? "";
      }
    ), Ze(() => {
      s && c.value && s.register?.(c.value, {});
    }), lt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? d.value : d.value), f = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function b(p) {
      const x = p.target.value;
      d.value = x, a("update:modelValue", x);
      const k = s?.fields?.[c.value]?.props;
      k?.onInput && k.onInput(p);
    }
    function g(p) {
      const x = s?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(p);
    }
    function y(p) {
      const x = s?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(p);
    }
    const v = C(() => {
      const { name: p, id: x, type: k, ...w } = o;
      return w;
    });
    return (p, x) => (m(), _("div", yw, [
      e.label ? (m(), _("label", {
        key: 0,
        for: r.value,
        class: te(E(dt))
      }, A(e.label), 11, xw)) : z("", !0),
      u("input", _t(v.value, {
        id: r.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [E(ht), f.value ? E(Ot) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": f.value ? "true" : void 0,
        "aria-describedby": e.errorText ? l.value : void 0,
        onInput: b,
        onChange: g,
        onBlur: y
      }), null, 16, _w),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: l.value,
        class: te(E(Tt)),
        role: "alert"
      }, A(e.errorText), 11, kw)) : z("", !0)
    ]));
  }
}), Cw = { class: "font-sans" }, $w = ["for"], Sw = { class: "relative" }, Mw = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], Dw = ["aria-label"], Aw = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Tw = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Bw = ["id"], Lw = /* @__PURE__ */ ie({
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
      (x) => {
        x !== void 0 && x !== h.value && (h.value = x);
      }
    ), Ze(() => {
      s && c.value && s.register?.(c.value, {});
    }), lt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const f = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? h.value : h.value), b = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function g(x) {
      const k = x.target.value;
      h.value = k, a("update:modelValue", k);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(x);
    }
    function y(x) {
      const k = s?.fields?.[c.value]?.props;
      k?.onChange && k.onChange(x);
    }
    function v(x) {
      const k = s?.fields?.[c.value]?.props;
      k?.onBlur && k.onBlur(x);
    }
    const p = C(() => {
      const { name: x, id: k, ...w } = o;
      return w;
    });
    return (x, k) => (m(), _("div", Cw, [
      e.label ? (m(), _("label", {
        key: 0,
        for: r.value,
        class: te(E(dt))
      }, A(e.label), 11, $w)) : z("", !0),
      u("div", Sw, [
        u("input", _t(p.value, {
          id: r.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [E(ht), b.value ? E(Ot) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: f.value,
          "aria-invalid": b.value ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: g,
          onChange: y,
          onBlur: v
        }), null, 16, Mw),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: k[0] || (k[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (m(), _("svg", Tw, [...k[2] || (k[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (m(), _("svg", Aw, [...k[1] || (k[1] = [
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
        ], 8, Dw)
      ]),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: l.value,
        class: te(E(Tt)),
        role: "alert"
      }, A(e.errorText), 11, Bw)) : z("", !0)
    ]));
  }
}), Pw = { class: "font-sans" }, Ew = ["for"], Rw = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], Iw = ["id"], Fw = /* @__PURE__ */ ie({
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
    return (l, c) => (m(), _("div", Pw, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: te(E(dt))
      }, A(e.label), 11, Ew)) : z("", !0),
      Ge(u("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => r.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: te([E(cy), e.invalid ? E(Ot) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, Rw), [
        [Yt, r.value]
      ]),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: te(E(Tt)),
        role: "alert"
      }, A(e.errorText), 11, Iw)) : z("", !0)
    ]));
  }
}), Ow = { class: "font-sans" }, Vw = ["for"], zw = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], Nw = ["for"], jw = ["title"], Hw = ["aria-label"], Ww = ["id"], Kw = /* @__PURE__ */ ie({
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
      const b = h.target.files?.[0] ?? null;
      a("update:modelValue", b);
    }
    function d() {
      a("update:modelValue", null), r.value && (r.value.value = "");
    }
    return (h, f) => (m(), _("div", Ow, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: te(E(dt))
      }, A(e.label), 11, Vw)) : z("", !0),
      u("div", {
        class: te([
          E(ht),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? E(Ot) : "",
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
        }, null, 40, zw),
        u("label", {
          for: s.value,
          class: te(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          N(E(Vp), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, Nw),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: l.value || void 0
        }, A(l.value), 9, jw),
        e.modelValue && !e.disabled ? (m(), _("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          N(E(lr), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, Hw)) : z("", !0)
      ], 2),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: te(E(Tt)),
        role: "alert"
      }, A(e.errorText), 11, Ww)) : z("", !0)
    ]));
  }
}), Yw = { class: "font-sans" }, Uw = ["for"], qw = { class: "relative" }, Xw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Gw = ["id"], Zw = /* @__PURE__ */ ie({
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
    return (c, d) => (m(), _("div", Yw, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: te(E(dt))
      }, A(e.label), 11, Uw)) : z("", !0),
      u("div", qw, [
        N(E(wo), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: s.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: te([
            E(ht),
            "pl-10",
            e.invalid ? E(Ot) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: l
        }, null, 42, Xw)
      ]),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: te(E(Tt)),
        role: "alert"
      }, A(e.errorText), 11, Gw)) : z("", !0)
    ]));
  }
}), Qw = { class: "font-sans" }, Jw = ["for"], e5 = { class: "relative" }, t5 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], n5 = ["id"], a5 = /* @__PURE__ */ ie({
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
      const b = Number(f[1]), g = Number(f[2]);
      return !Number.isInteger(b) || !Number.isInteger(g) || b < 0 || b > 23 || g < 0 || g > 59 ? null : `${String(b).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const o = e, s = t, i = `kiut-input-time-${Ye()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : n(o.modelValue) ?? "");
    function d(h) {
      const f = h.target.value;
      s("update:modelValue", a(f));
    }
    return (h, f) => (m(), _("div", Qw, [
      e.label ? (m(), _("label", {
        key: 0,
        for: r.value,
        class: te(E(dt))
      }, A(e.label), 11, Jw)) : z("", !0),
      u("div", e5, [
        N(E(Np), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: r.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: te([
            E(ht),
            "pl-10",
            e.invalid ? E(Ot) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: d
        }, null, 42, t5)
      ]),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: l.value,
        class: te(E(Tt)),
        role: "alert"
      }, A(e.errorText), 11, n5)) : z("", !0)
    ]));
  }
}), o5 = { class: "font-sans" }, s5 = ["for"], i5 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, r5 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], l5 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, c5 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, d5 = { class: "min-w-0 text-left leading-snug" }, u5 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, h5 = { class: "min-w-0 text-right leading-snug" }, f5 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, g5 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, p5 = ["id"], m5 = /* @__PURE__ */ ie({
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
      const b = [];
      return n.errorText && b.push(i.value), b.length ? b.join(" ") : void 0;
    }), l = C(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = C(() => !!(n.captionMin || n.captionMax)), d = C(() => {
      const { min: b, max: g, modelValue: y } = n;
      if (g === b) return 0;
      const v = (y - b) / (g - b);
      return Math.min(100, Math.max(0, v * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function f(b) {
      const g = Number(b.target.value);
      a("update:modelValue", Number.isNaN(g) ? n.min : g);
    }
    return (b, g) => (m(), _("div", o5, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: te(E(dt))
      }, A(e.label), 11, s5)) : z("", !0),
      u("div", {
        class: te(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (m(), _("p", i5, A(e.captionMax), 1)) : z("", !0),
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
          }, null, 42, r5)
        ], 6),
        e.orientation === "horizontal" && l.value ? (m(), _("p", l5, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (m(), _("div", c5, [
          u("span", d5, A(e.captionMin), 1),
          u("span", u5, A(e.caption), 1),
          u("span", h5, A(e.captionMax), 1)
        ])) : z("", !0),
        e.orientation === "vertical" && e.captionMin ? (m(), _("p", f5, A(e.captionMin), 1)) : z("", !0),
        e.orientation === "vertical" && e.caption ? (m(), _("p", g5, A(e.caption), 1)) : z("", !0)
      ], 2),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: te(E(Tt)),
        role: "alert"
      }, A(e.errorText), 11, p5)) : z("", !0)
    ]));
  }
}), b5 = /* @__PURE__ */ me(m5, [["__scopeId", "data-v-a1343418"]]), v5 = { class: "font-sans" }, y5 = ["for"], x5 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], _5 = ["id"], k5 = /* @__PURE__ */ ie({
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
    return (d, h) => (m(), _("div", v5, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: te(E(dt))
      }, A(e.label), 11, y5)) : z("", !0),
      u("input", {
        id: s.value,
        value: l.value,
        type: "number",
        onInput: c,
        class: te([
          E(ht),
          e.invalid ? E(Ot) : "",
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
      }, null, 42, x5),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: te(E(Tt)),
        role: "alert"
      }, A(e.errorText), 11, _5)) : z("", !0)
    ]));
  }
}), w5 = { class: "font-sans" }, C5 = ["for"], $5 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], S5 = ["disabled"], M5 = ["id"], D5 = "#3b82f6", A5 = "#aabbcc", T5 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", B5 = /* @__PURE__ */ ie({
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
      const y = g.trim(), v = /^#?([0-9a-fA-F]{6})$/.exec(y);
      if (v) return `#${v[1].toLowerCase()}`;
      const p = /^#?([0-9a-fA-F]{3})$/.exec(y);
      if (p) {
        const [x, k, w] = p[1].split("");
        return `#${x}${x}${k}${k}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(g) {
      return n(g) ?? D5;
    }
    const o = e, s = t, i = `kiut-input-color-${Ye()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => a(o.modelValue)), d = ae(c.value), h = ae(!1);
    Ie(c, (g) => {
      h.value || (d.value = g);
    });
    function f(g) {
      const y = g.target, v = n(y.value);
      v && s("update:modelValue", v);
    }
    function b() {
      h.value = !1;
      const g = n(d.value);
      g ? (d.value = g, s("update:modelValue", g)) : d.value = c.value;
    }
    return Ie(d, (g) => {
      if (!h.value) return;
      const y = n(g);
      y && s("update:modelValue", y);
    }), (g, y) => (m(), _("div", w5, [
      e.label ? (m(), _("label", {
        key: 0,
        for: r.value,
        class: te(E(dt))
      }, A(e.label), 11, C5)) : z("", !0),
      u("div", {
        class: te([
          T5,
          e.invalid ? E(Ot) : "",
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
        }, null, 40, $5),
        e.showHexInput ? Ge((m(), _("input", {
          key: 0,
          "onUpdate:modelValue": y[0] || (y[0] = (v) => d.value = v),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: A5,
          onFocus: y[1] || (y[1] = (v) => h.value = !0),
          onBlur: b
        }, null, 40, S5)), [
          [Yt, d.value]
        ]) : z("", !0)
      ], 2),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: l.value,
        class: te(E(Tt)),
        role: "alert"
      }, A(e.errorText), 11, M5)) : z("", !0)
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
function L5(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((n) => n.toLowerCase().includes(t)) ?? !1;
}
function P5(e, t, n) {
  const a = n.trim().toLowerCase();
  return a ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(a) || o.id.includes(a), i = o.emojis.filter(
      (r) => s || L5(r, a)
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
function _S(e) {
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
function R5(e, t) {
  return `${e}${t}`;
}
const I5 = ["disabled", "aria-expanded", "aria-label"], F5 = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, O5 = {
  key: 0,
  class: "truncate text-sm"
}, V5 = ["aria-label"], z5 = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, N5 = ["disabled", "placeholder", "aria-label"], j5 = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, H5 = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, W5 = { class: "grid grid-cols-8 gap-0.5" }, K5 = ["disabled", "aria-label", "onClick"], Y5 = { class: "text-[1.35rem] leading-none" }, U5 = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, q5 = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, X5 = /* @__PURE__ */ ie({
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
    const n = e, a = t, o = `kiut-emoji-picker-${Ye()}`, s = `${o}-btn`, i = `${o}-panel`, r = ae(null), l = ae(null), c = ae(null), d = ae(null), h = ae(!1), f = ae(""), b = ae({}), g = C(
      () => n.ariaLabelTrigger ?? n.triggerLabel ?? n.ariaLabel
    ), y = C(() => ({
      ...wr,
      ...n.categoryLabels
    })), v = C(() => new Set(E5(n.draft))), p = C(() => {
      if (n.categories?.length) {
        const L = f.value.trim().toLowerCase();
        return L ? n.categories.map((I) => ({
          ...I,
          emojis: I.emojis.filter((G) => G.includes(L) || I.label.toLowerCase().includes(L) ? !0 : I.id.toLowerCase().includes(L))
        })).filter((I) => I.emojis.length > 0) : n.categories;
      }
      return P5(
        Cr,
        y.value,
        f.value
      );
    });
    function x() {
      const L = l.value;
      if (!L) return;
      const I = L.getBoundingClientRect(), G = 320, Q = 8, ne = 8;
      let re = I.right - G;
      re < ne && (re = I.left), re + G > window.innerWidth - ne && (re = Math.max(ne, window.innerWidth - G - ne));
      const ge = Math.max(160, I.top - Q - ne);
      b.value = {
        bottom: `${window.innerHeight - I.top + Q}px`,
        left: `${re}px`,
        width: `${G}px`,
        maxHeight: `${ge}px`
      };
    }
    function k(L) {
      const I = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return v.value.has(L) ? `${I} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : I;
    }
    function w(L) {
      if (n.disabled) return;
      const I = R5(n.draft ?? "", L);
      a("update:draft", I), a("select", L);
    }
    function $() {
      f.value = "", a("open"), je(() => {
        x(), d.value?.focus();
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
    function V(L) {
      L.stopPropagation(), M();
    }
    function H(L) {
      if (!h.value) return;
      const I = L.target, G = r.value, Q = c.value;
      G && !G.contains(I) && (!Q || !Q.contains(I)) && S();
    }
    function B(L) {
      n.disabled || ((L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), h.value || (h.value = !0, $())), L.key === "Escape" && h.value && (L.preventDefault(), S()));
    }
    function T(L) {
      L.key === "Escape" && (L.preventDefault(), S());
    }
    function D() {
      h.value && x();
    }
    return Ze(() => {
      document.addEventListener("click", H), window.addEventListener("resize", D), window.addEventListener("scroll", D, !0);
    }), lt(() => {
      document.removeEventListener("click", H), window.removeEventListener("resize", D), window.removeEventListener("scroll", D, !0);
    }), (L, I) => (m(), _("div", {
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
          E(ht),
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
        u("span", F5, [
          _e(L.$slots, "icon", {}, () => [
            N(E(Hp), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (m(), _("span", O5, A(e.triggerLabel), 1)) : z("", !0),
        e.triggerLabel ? (m(), ee(E(Qt), {
          key: 1,
          class: te(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : z("", !0)
      ], 42, I5),
      (m(), ee(un, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: we(b.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: I[2] || (I[2] = Oe(() => {
          }, ["stop"])),
          onKeydown: Oe(T, ["stop"])
        }, [
          u("div", z5, [
            Ge(u("input", {
              ref_key: "searchInputRef",
              ref: d,
              "onUpdate:modelValue": I[0] || (I[0] = (G) => f.value = G),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: I[1] || (I[1] = Oe(() => {
              }, ["stop"]))
            }, null, 8, N5), [
              [Yt, f.value]
            ])
          ]),
          u("div", j5, [
            p.value.length > 0 ? (m(!0), _(se, { key: 0 }, fe(p.value, (G) => (m(), _("section", {
              key: G.id
            }, [
              u("h3", H5, A(G.label), 1),
              u("div", W5, [
                (m(!0), _(se, null, fe(G.emojis, (Q) => (m(), _("button", {
                  key: `${G.id}-${Q}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${Q} to input`,
                  class: te(k(Q)),
                  onClick: Oe((ne) => w(Q), ["stop"])
                }, [
                  u("span", Y5, A(Q), 1)
                ], 10, K5))), 128))
              ])
            ]))), 128)) : (m(), _("p", U5, A(e.emptySearchText), 1))
          ]),
          e.hint ? (m(), _("p", q5, A(e.hint), 1)) : z("", !0)
        ], 44, V5), [
          [Xt, h.value]
        ])
      ]))
    ], 512));
  }
}), G5 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Z5 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Q5 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, J5 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, eC = { class: "truncate" }, tC = ["aria-selected", "onClick", "onMouseenter"], nC = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, aC = { class: "min-w-0 flex-1" }, oC = /* @__PURE__ */ ie({
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
    const n = e, a = t, o = `kiut-multiselect-${Ye()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = ae(null), c = ae(null), d = ae(!1), h = ae(0), f = C(() => n.options.filter((B) => !B.disabled)), b = C(() => new Set(n.modelValue ?? [])), g = C(
      () => n.options.filter((B) => b.value.has(B.value))
    ), y = C(() => {
      const B = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", T = g.value.length;
      return T === 0 ? B : `${B}, ${T} seleccionada${T === 1 ? "" : "s"}`;
    });
    function v(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function p(B) {
      return b.value.has(B.value);
    }
    function x(B, T) {
      const D = p(B), L = h.value === T;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        D ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !D && L ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function k(B) {
      const T = [...n.modelValue ?? []], D = T.indexOf(B.value);
      D >= 0 ? T.splice(D, 1) : T.push(B.value), a("update:modelValue", T);
    }
    function w() {
      const B = f.value;
      if (B.length === 0) {
        h.value = 0;
        return;
      }
      const T = b.value, D = B.findIndex((L) => T.has(L.value));
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
    function H(B) {
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
          D && k(D);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", M);
    }), lt(() => {
      document.removeEventListener("click", M);
    }), (B, T) => (m(), _("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (m(), _("label", {
        key: 0,
        id: s,
        class: te(E(dt))
      }, A(e.label), 3)) : z("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: te([
          E(ht),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: S,
        onKeydown: V
      }, [
        u("div", Z5, [
          g.value.length === 0 ? (m(), _("span", Q5, A(e.placeholder), 1)) : (m(), _("div", J5, [
            (m(!0), _(se, null, fe(g.value, (D) => (m(), _("span", {
              key: v(D),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", eC, A(D.label), 1)
            ]))), 128))
          ]))
        ]),
        N(E(Qt), {
          class: te(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, G5),
      Ge(u("ul", {
        id: r,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Oe(H, ["stop"])
      }, [
        (m(!0), _(se, null, fe(f.value, (D, L) => (m(), _("li", {
          key: v(D),
          role: "option",
          "aria-selected": p(D),
          class: te(x(D, L)),
          onClick: Oe((I) => k(D), ["stop"]),
          onMouseenter: (I) => h.value = L
        }, [
          u("span", nC, [
            p(D) ? (m(), ee(E(Co), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : z("", !0)
          ]),
          u("span", aC, A(D.label), 1)
        ], 42, tC))), 128))
      ], 544), [
        [Xt, d.value]
      ])
    ], 512));
  }
}), sC = { class: "font-sans" }, iC = ["for"], rC = { class: "flex gap-2" }, lC = { class: "w-[7.5rem] shrink-0" }, cC = { class: "min-w-0 flex-1" }, dC = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], uC = ["id"], hC = /* @__PURE__ */ ie({
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
    return (c, d) => (m(), _("div", sC, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: te(E(dt))
      }, A(e.label), 11, iC)) : z("", !0),
      u("div", rC, [
        u("div", lC, [
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
        u("div", cC, [
          Ge(u("input", {
            id: s.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => l.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: te([E(ht), e.invalid ? E(Ot) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, dC), [
            [Yt, l.value]
          ])
        ])
      ]),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: te(E(Tt)),
        role: "alert"
      }, A(e.errorText), 11, uC)) : z("", !0)
    ]));
  }
}), fC = ["role", "aria-label"], gC = { class: "flex flex-wrap gap-2" }, pC = ["aria-checked", "role", "onClick"], mC = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, bC = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, vC = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, yC = /* @__PURE__ */ ie({
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
    return (l, c) => (m(), _("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", gC, [
        (m(!0), _(se, null, fe(e.items, (d) => (m(), _("button", {
          key: d.value,
          type: "button",
          class: te(i(d)),
          "aria-checked": s(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(d)
        }, [
          u("span", mC, [
            s(d) ? (m(), _("span", bC)) : z("", !0)
          ]),
          d.dotColor ? (m(), _("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: we({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", vC, A(d.label), 1)
        ], 10, pC))), 128))
      ])
    ], 8, fC));
  }
}), xC = ["aria-label"], _C = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], kC = { class: "truncate px-3 py-2 text-sm font-medium" }, wC = /* @__PURE__ */ ie({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = `kiut-seg-${Ye()}`, s = (y) => `${o}-seg-${y}`, i = ae([]);
    function r(y, v) {
      y instanceof HTMLButtonElement ? i.value[v] = y : i.value[v] = null;
    }
    function l(y) {
      return y.value === n.modelValue;
    }
    function c(y) {
      const v = l(y), p = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return y.disabled ? `${p} cursor-not-allowed opacity-40` : v ? `${p} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${p} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(y) {
      y.disabled || y.value !== n.modelValue && a("update:modelValue", y.value);
    }
    function h(y, v, p) {
      d(y), je(() => i.value[v]?.focus());
    }
    const f = C(
      () => n.items.map((y, v) => y.disabled ? -1 : v).filter((y) => y >= 0)
    );
    function b(y, v) {
      const p = n.items.length;
      if (p === 0) return 0;
      let x = y;
      for (let k = 0; k < p; k++)
        if (x = (x + v + p) % p, !n.items[x]?.disabled) return x;
      return y;
    }
    function g(y, v) {
      if (y.key === "ArrowRight" || y.key === "ArrowDown") {
        y.preventDefault();
        const p = b(v, 1), x = n.items[p];
        x && d(x), je(() => i.value[p]?.focus());
      } else if (y.key === "ArrowLeft" || y.key === "ArrowUp") {
        y.preventDefault();
        const p = b(v, -1), x = n.items[p];
        x && d(x), je(() => i.value[p]?.focus());
      } else if (y.key === "Home") {
        y.preventDefault();
        const p = f.value[0];
        if (p !== void 0) {
          const x = n.items[p];
          x && d(x), je(() => i.value[p]?.focus());
        }
      } else if (y.key === "End") {
        y.preventDefault();
        const p = f.value[f.value.length - 1];
        if (p !== void 0) {
          const x = n.items[p];
          x && d(x), je(() => i.value[p]?.focus());
        }
      }
    }
    return (y, v) => (m(), _("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (m(!0), _(se, null, fe(e.items, (p, x) => (m(), _("button", {
        id: s(p.value),
        key: p.value,
        ref_for: !0,
        ref: (k) => r(k, x),
        type: "button",
        role: "tab",
        "aria-selected": l(p),
        "aria-disabled": p.disabled === !0,
        tabindex: l(p) ? 0 : -1,
        class: te(c(p)),
        onClick: (k) => h(p, x),
        onKeydown: (k) => g(k, x)
      }, [
        u("span", kC, A(p.label), 1)
      ], 42, _C))), 128))
    ], 8, xC));
  }
}), CC = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, $C = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, SC = {
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
}, MC = {
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
}, DC = [
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
function AC(e = "en") {
  return CC[e];
}
function $r(e = "en") {
  return DC.map((t) => ({ id: t, label: MC[e][t] }));
}
function TC(e = "en") {
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
function Xn(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function BC(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ne(n);
}
function Ln(e, t) {
  return BC(e, -t);
}
function LC(e) {
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
      const a = It(Xn(n, -1));
      return { start: a, end: LC(a) };
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
function PC(e, t, n = /* @__PURE__ */ new Date(), a, o) {
  if (!e.start || !e.end) return !1;
  const s = Mr(Sr(t, n), a, o);
  return it(s.start) === e.start && it(s.end) === e.end;
}
function Zn(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Wt(e, t) {
  return Zn(e, t) === 0;
}
function qt(e, t) {
  return Zn(e, t) < 0;
}
function Ka(e, t) {
  return Zn(e, t) > 0;
}
function Dr(e, t) {
  return Zn(e, t) >= 0;
}
function Ar(e, t) {
  return Zn(e, t) <= 0;
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
  return `${$C[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Kt(e, t = "en") {
  return `${SC[t][e.getMonth()]} ${e.getFullYear()}`;
}
const EC = ["aria-expanded", "aria-labelledby", "aria-label"], RC = ["onKeydown"], IC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, FC = { class: "mb-4 flex items-center justify-between gap-2" }, OC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, VC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, zC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, NC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, jC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, HC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, WC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, KC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, YC = ["disabled", "onClick"], UC = "rounded-lg text-[#61616b]", qC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", XC = "opacity-30", GC = "bg-[#6b35e9] font-medium text-white", ZC = "bg-[#895af6] font-semibold text-white", QC = /* @__PURE__ */ ie({
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
      return [T, Xn(T, 1)];
    }), b = C(() => n.ariaLabel ?? n.placeholder), g = C(() => {
      const T = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${T}` : `left-0 right-auto ${T}`;
    }), y = C(
      () => `${Kt(f.value[0])} – ${Kt(f.value[1])}`
    ), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], p = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const T = Je(n.modelValue.start), D = Je(n.modelValue.end);
      return `${wa(T)} – ${wa(D)}`;
    });
    function x(T, D) {
      return T.getMonth() === D.getMonth() && T.getFullYear() === D.getFullYear();
    }
    function k(T) {
      const D = Ne(T);
      if (n.minDate) {
        const L = Ne(Je(n.minDate));
        if (qt(D, L)) return !0;
      }
      if (n.maxDate) {
        const L = Ne(Je(n.maxDate));
        if (qt(L, D)) return !0;
      }
      return !1;
    }
    function w(T, D, L) {
      const I = Wt(T, D), G = Wt(T, L);
      if (I && G) return "rounded-lg";
      const Q = I || T.getDay() === 0, ne = G || T.getDay() === 6;
      return Q && ne ? "rounded-lg" : Q ? "rounded-l-lg" : ne ? "rounded-r-lg" : "rounded-none";
    }
    function $(T, D) {
      const L = x(D, T), I = k(D), G = n.modelValue.start ? Ne(Je(n.modelValue.start)) : null, Q = n.modelValue.end ? Ne(Je(n.modelValue.end)) : null, ne = Ne(D);
      if (I)
        return UC;
      let re = qC;
      if (G && Q && Dr(ne, G) && Ar(ne, Q)) {
        const q = Wt(ne, G), P = Wt(ne, Q);
        re = `${w(ne, G, Q)} ${q || P ? ZC : GC}`;
      }
      return L || (re = `${re} ${XC}`), re;
    }
    function S(T) {
      if (k(T)) return;
      const D = Ne(T);
      if (!c.value) {
        c.value = new Date(D), a("update:modelValue", { start: it(D), end: it(D) });
        return;
      }
      let I = Ne(c.value), G = new Date(D);
      qt(G, I) && ([I, G] = [G, I]), a("update:modelValue", { start: it(I), end: it(G) }), c.value = null, l.value = !1;
    }
    function M(T) {
      d.value = Xn(d.value, T);
    }
    function V() {
      l.value = !1;
    }
    function H(T) {
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
    }), (T, D) => (m(), _("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), _("label", {
        key: 0,
        id: s,
        class: te(E(dt))
      }, A(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: te([
          E(ht),
          "flex w-full items-center gap-2 text-left",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onFocus: H,
        onClick: H
      }, [
        N(E(wo), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: te([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(p.value), 3)
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
        u("div", IC, [
          u("div", FC, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: D[0] || (D[0] = (L) => M(-1))
            }, [
              N(E(ir), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", OC, [
              u("span", VC, A(y.value), 1),
              u("div", zC, [
                u("span", NC, A(E(Kt)(f.value[0])), 1),
                u("span", jC, A(E(Kt)(f.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: D[1] || (D[1] = (L) => M(1))
            }, [
              N(E(rr), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", HC, [
            (m(!0), _(se, null, fe(f.value, (L) => (m(), _("div", {
              key: `${L.getFullYear()}-${L.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", WC, [
                (m(), _(se, null, fe(v, (I) => u("span", { key: I }, A(I), 1)), 64))
              ]),
              u("div", KC, [
                (m(!0), _(se, null, fe(E(Tr)(L), (I) => (m(), _("button", {
                  key: E(it)(I),
                  type: "button",
                  disabled: k(I),
                  class: te(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(L, I)]),
                  onClick: (G) => S(I)
                }, A(I.getDate()), 11, YC))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, RC), [
        [Xt, l.value]
      ])
    ], 512));
  }
}), JC = ["aria-expanded", "aria-labelledby", "aria-label"], e$ = ["aria-label", "onKeydown"], t$ = { class: "flex flex-col sm:flex-row" }, n$ = ["aria-label"], a$ = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, o$ = { class: "flex flex-col gap-0.5" }, s$ = ["onClick"], i$ = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, r$ = { class: "mb-4 flex items-center justify-between gap-2" }, l$ = ["aria-label"], c$ = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, d$ = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, u$ = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, h$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, f$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, g$ = ["aria-label"], p$ = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, m$ = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, b$ = { class: "grid grid-cols-7 gap-y-2 mt-2" }, v$ = ["disabled", "onClick"], y$ = "rounded-lg text-[#61616b]", x$ = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", _$ = "opacity-30", k$ = "bg-[#6b35e9] font-medium text-white", w$ = "bg-[#895af6] font-semibold text-white", C$ = /* @__PURE__ */ ie({
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
      const q = It(d.value);
      return [q, Xn(q, 1)];
    }), b = C(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = C(() => n.ariaLabel ?? b.value), y = C(() => $r(n.locale)), v = C(() => TC(n.locale)), p = C(() => AC(n.locale)), x = C(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), k = C(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = C(() => {
      const q = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${q}` : `left-0 right-auto ${q}`;
    }), M = C(
      () => `${Kt(f.value[0], n.locale)} – ${Kt(f.value[1], n.locale)}`
    ), V = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return b.value;
      const q = Je(n.modelValue.start), P = Je(n.modelValue.end);
      return `${wa(q, n.locale)} – ${wa(P, n.locale)}`;
    });
    function H(q, P) {
      return q.getMonth() === P.getMonth() && q.getFullYear() === P.getFullYear();
    }
    function B(q) {
      const P = Ne(q);
      if (n.minDate) {
        const j = Ne(Je(n.minDate));
        if (qt(P, j)) return !0;
      }
      if (n.maxDate) {
        const j = Ne(Je(n.maxDate));
        if (qt(j, P)) return !0;
      }
      return !1;
    }
    function T(q, P, j) {
      const K = Wt(q, P), ce = Wt(q, j);
      if (K && ce) return "rounded-lg";
      const ve = K || q.getDay() === 0, De = ce || q.getDay() === 6;
      return ve && De ? "rounded-lg" : ve ? "rounded-l-lg" : De ? "rounded-r-lg" : "rounded-none";
    }
    function D(q) {
      const P = PC(
        n.modelValue,
        q,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), j = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return P ? `${j} font-medium` : j;
    }
    function L(q, P) {
      const j = H(P, q), K = B(P), ce = n.modelValue.start ? Ne(Je(n.modelValue.start)) : null, ve = n.modelValue.end ? Ne(Je(n.modelValue.end)) : null, De = Ne(P);
      if (K)
        return y$;
      let O = x$;
      if (ce && ve && Dr(De, ce) && Ar(De, ve)) {
        const U = Wt(De, ce), de = Wt(De, ve);
        O = `${T(De, ce, ve)} ${U || de ? w$ : k$}`;
      }
      return j || (O = `${O} ${_$}`), O;
    }
    function I(q) {
      const P = Mr(Sr(q), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: it(P.start),
        end: it(P.end)
      }), d.value = It(P.start), c.value = null, l.value = !1;
    }
    function G(q) {
      if (B(q)) return;
      const P = Ne(q);
      if (!c.value) {
        c.value = new Date(P), a("update:modelValue", { start: it(P), end: it(P) });
        return;
      }
      let K = Ne(c.value), ce = new Date(P);
      qt(ce, K) && ([K, ce] = [ce, K]), a("update:modelValue", { start: it(K), end: it(ce) }), c.value = null, l.value = !1;
    }
    function Q(q) {
      d.value = Xn(d.value, q);
    }
    function ne() {
      l.value = !1;
    }
    function re(q) {
      if (q.stopPropagation(), l.value) {
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
    function ge(q) {
      if (!l.value) return;
      const P = i.value;
      P && !P.contains(q.target) && (l.value = !1);
    }
    return Ie(l, (q) => {
      q && (c.value = null);
    }), Ze(() => {
      document.addEventListener("click", ge);
    }), lt(() => {
      document.removeEventListener("click", ge);
    }), (q, P) => (m(), _("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), _("label", {
        key: 0,
        id: s,
        class: te(E(dt))
      }, A(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: te([
          E(ht),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: re
      }, [
        N(E(wo), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: te([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(V.value), 3)
      ], 10, JC),
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
        u("div", t$, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": x.value
          }, [
            u("p", a$, A(v.value), 1),
            u("ul", o$, [
              (m(!0), _(se, null, fe(y.value, (j) => (m(), _("li", {
                key: j.id
              }, [
                u("button", {
                  type: "button",
                  class: te(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", D(j.id)]),
                  onClick: (K) => I(j.id)
                }, A(j.label), 11, s$)
              ]))), 128))
            ])
          ], 8, n$),
          u("div", i$, [
            u("div", r$, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": k.value,
                onClick: P[0] || (P[0] = (j) => Q(-1))
              }, [
                N(E(ir), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, l$),
              u("div", c$, [
                u("span", d$, A(M.value), 1),
                u("div", u$, [
                  u("span", h$, A(E(Kt)(f.value[0], e.locale)), 1),
                  u("span", f$, A(E(Kt)(f.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: P[1] || (P[1] = (j) => Q(1))
              }, [
                N(E(rr), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, g$)
            ]),
            u("div", p$, [
              (m(!0), _(se, null, fe(f.value, (j) => (m(), _("div", {
                key: `${j.getFullYear()}-${j.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", m$, [
                  (m(!0), _(se, null, fe(p.value, (K) => (m(), _("span", { key: K }, A(K), 1))), 128))
                ]),
                u("div", b$, [
                  (m(!0), _(se, null, fe(E(Tr)(j), (K) => (m(), _("button", {
                    key: E(it)(K),
                    type: "button",
                    disabled: B(K),
                    class: te(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", L(j, K)]),
                    onClick: (ce) => G(K)
                  }, A(K.getDate()), 11, v$))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, e$), [
        [Xt, l.value]
      ])
    ], 512));
  }
}), $$ = ["disabled", "aria-expanded", "aria-label"], S$ = { class: "min-w-0 flex-1 truncate" }, M$ = ["aria-selected", "onClick", "onMouseenter"], D$ = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, A$ = { class: "min-w-0 flex-1" }, T$ = /* @__PURE__ */ ie({
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
    const n = e, a = t, s = `${`kiut-tag-select-${Ye()}`}-listbox`, i = ae(null), r = ae(null), l = ae(null), c = ae(null), d = ae(!1), h = ae(0), f = ae({}), b = C(() => n.options.filter((Q) => !Q.disabled)), g = C(
      () => n.options.find((Q) => Q.value === n.modelValue) ?? null
    ), y = C(() => g.value?.color ?? "neutral"), v = C(
      () => dr(y.value, n.outlined)
    ), p = C(() => g.value ? g.value.label : n.modelValue !== null && n.modelValue !== void 0 && n.modelValue !== "" ? String(n.modelValue) : b.value[0]?.label ?? "Seleccionar…"), x = C(
      () => n.ariaLabel ?? `Estado: ${p.value}`
    );
    function k() {
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
      const re = $(Q), ge = h.value === ne;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        re ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !re && ge ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M() {
      h.value = Math.max(
        0,
        b.value.findIndex((Q) => Q.value === n.modelValue)
      );
    }
    function V() {
      k(), M(), je(() => c.value?.focus());
    }
    function H() {
      d.value = !1;
    }
    function B(Q) {
      a("update:modelValue", Q.value), H();
    }
    function T() {
      if (!n.disabled) {
        if (d.value) {
          H();
          return;
        }
        d.value = !0, V();
      }
    }
    function D(Q) {
      Q.stopPropagation(), !n.disabled && T();
    }
    function L(Q) {
      if (!d.value) return;
      const ne = Q.target, re = i.value, ge = l.value;
      re && !re.contains(ne) && (!ge || !ge.contains(ne)) && H();
    }
    function I(Q) {
      n.disabled || (Q.key === "ArrowDown" || Q.key === "Enter" || Q.key === " ") && (Q.preventDefault(), d.value || (d.value = !0, V()));
    }
    function G(Q) {
      const ne = b.value;
      if (Q.key === "Escape") {
        Q.preventDefault(), H(), r.value?.focus();
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
          const re = ne[h.value];
          re && B(re);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", L);
    }), lt(() => {
      document.removeEventListener("click", L);
    }), (Q, ne) => (m(), _("div", {
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
          E(cr),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          v.value,
          d.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": x.value,
        onClick: D,
        onKeydown: I
      }, [
        u("span", S$, A(p.value), 1),
        N(E(Qt), {
          class: te(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, $$),
      (m(), ee(un, { to: "body" }, [
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
            onKeydown: Oe(G, ["stop"])
          }, [
            (m(!0), _(se, null, fe(b.value, (re, ge) => (m(), _("li", {
              key: w(re),
              role: "option",
              "aria-selected": $(re),
              class: te(S(re, ge)),
              onClick: Oe((q) => B(re), ["stop"]),
              onMouseenter: (q) => h.value = ge
            }, [
              u("span", D$, [
                $(re) ? (m(), ee(E(Co), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : z("", !0)
              ]),
              u("span", A$, A(re.label), 1)
            ], 42, M$))), 128))
          ], 544)
        ], 4), [
          [Xt, d.value]
        ])
      ]))
    ], 512));
  }
}), B$ = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, L$ = ["id"], P$ = { class: "min-w-0 flex-1 space-y-1" }, E$ = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, R$ = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, I$ = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, F$ = /* @__PURE__ */ ie({
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
    }), (h, f) => (m(), ee(un, { to: "body" }, [
      N(ut, { name: "kiut-modal" }, {
        default: R(() => [
          e.modelValue ? (m(), _("div", B$, [
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
                u("div", P$, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (m(), _("p", E$, A(e.subtitle), 1)) : z("", !0)
                ]),
                N(xt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: l
                }, {
                  icon: R(() => [
                    N(E(lr), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              u("div", R$, [
                _e(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", I$, [
                N(xt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: l
                }, {
                  default: R(() => [
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
                  default: R(() => [
                    Ae(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ], 12, L$)
          ])) : z("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), O$ = /* @__PURE__ */ me(F$, [["__scopeId", "data-v-9134bb89"]]), V$ = { class: "text-left font-['Inter',system-ui,sans-serif]" }, z$ = {
  key: 0,
  class: ""
}, N$ = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, j$ = { class: "flex min-w-0 flex-1 items-center" }, H$ = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, W$ = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, K$ = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, Y$ = /* @__PURE__ */ ie({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = eo(), n = C(() => {
      const a = !!t.filters, o = !!t.actions;
      return a && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (a, o) => (m(), _("section", V$, [
      a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions ? (m(), _("header", z$, [
        a.$slots.description ? (m(), _("div", N$, [
          _e(a.$slots, "description")
        ])) : z("", !0),
        a.$slots.tabs ? (m(), _("div", {
          key: 1,
          class: te(["flex flex-wrap items-center gap-2", a.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", j$, [
            _e(a.$slots, "tabs")
          ]),
          a.$slots.actions && !a.$slots.filters ? (m(), _("div", H$, [
            _e(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0),
        a.$slots.filters || a.$slots.actions && !a.$slots.tabs ? (m(), _("div", {
          key: 2,
          class: te([
            "flex flex-wrap gap-2 items-center",
            a.$slots.tabs ? "mt-2" : "",
            n.value
          ])
        }, [
          a.$slots.filters ? (m(), _("div", W$, [
            _e(a.$slots, "filters")
          ])) : z("", !0),
          a.$slots.actions ? (m(), _("div", K$, [
            _e(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0)
      ])) : z("", !0),
      a.$slots.content || a.$slots.default ? (m(), _("div", {
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
}), U$ = { class: "flex flex-1 min-h-0" }, q$ = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, X$ = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, G$ = ["aria-current", "data-has-active", "title", "onClick"], Z$ = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, Q$ = { class: "px-4 py-4 shrink-0" }, J$ = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, eS = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, tS = ["data-nav-id", "aria-current", "onClick"], nS = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, aS = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, oS = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, sS = ["data-nav-id", "aria-current", "onClick"], iS = { class: "truncate text-[15px]" }, rS = ["aria-current", "data-has-active", "onClick"], lS = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, cS = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, dS = /* @__PURE__ */ ie({
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
      const p = a.sections.find((x) => x.id === a.selectedSectionId);
      return p?.items?.length ? p : null;
    });
    function h(p) {
      return a.activePath ? a.activePath === p.path || a.activePath.startsWith(p.path + "/") : !1;
    }
    function f(p) {
      return p.items?.length ? p.items.some(h) : !a.activePath || !p.path ? !1 : a.activePath === p.path || a.activePath.startsWith(p.path + "/");
    }
    function b(p) {
      if (!p.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: p,
          item: { id: p.id, label: p.label, path: p.path }
        });
        return;
      }
      const x = a.selectedSectionId === p.id ? null : p.id;
      o("update:selectedSectionId", x);
    }
    function g(p, x) {
      o("navigate", { section: p, item: x });
    }
    function y() {
      o("update:selectedSectionId", null);
    }
    function v(p, x) {
      g(p, x), y();
    }
    return (p, x) => l.value ? (m(), _("div", _t({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      N(ut, { name: "ksn-overlay" }, {
        default: R(() => [
          d.value ? (m(), _("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: y
          })) : z("", !0)
        ]),
        _: 1
      }),
      N(ut, { name: "ksn-sheet" }, {
        default: R(() => [
          d.value ? (m(), _("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: we({ paddingBottom: a.mobileBarHeight })
          }, [
            x[3] || (x[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", nS, [
              u("p", aS, A(d.value.label), 1),
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
            u("nav", oS, [
              (m(!0), _(se, null, fe(d.value.items, (k) => (m(), _("button", {
                key: k.id,
                type: "button",
                "data-nav-id": k.id,
                "aria-current": h(k) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => v(d.value, k)
              }, [
                k.icon ? (m(), ee(Mt(k.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : z("", !0),
                u("span", iS, A(k.label), 1)
              ], 8, sS))), 128))
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
        (m(!0), _(se, null, fe(e.sections, (k) => (m(), _("button", {
          key: k.id,
          type: "button",
          "aria-current": e.selectedSectionId === k.id ? "true" : void 0,
          "data-has-active": f(k) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => b(k)
        }, [
          e.selectedSectionId === k.id || f(k) ? (m(), _("span", lS)) : z("", !0),
          k.icon ? (m(), ee(Mt(k.icon), {
            key: 1,
            class: "shrink-0",
            style: we({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : z("", !0),
          u("span", cS, A(k.label), 1)
        ], 8, rS))), 128))
      ], 4)
    ], 16)) : (m(), _("aside", _t({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      u("div", U$, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: we({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: x[0] || (x[0] = (k) => n.value = !0),
          onMouseleave: x[1] || (x[1] = (k) => n.value = !1)
        }, [
          p.$slots.logo ? (m(), _("div", q$, [
            _e(p.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : z("", !0),
          u("nav", X$, [
            (m(!0), _(se, null, fe(e.sections, (k) => (m(), _("button", {
              key: k.id,
              type: "button",
              "aria-current": e.selectedSectionId === k.id ? "true" : void 0,
              "data-has-active": f(k) ? "true" : void 0,
              title: k.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => b(k)
            }, [
              k.icon ? (m(), ee(Mt(k.icon), {
                key: 0,
                class: "shrink-0",
                style: we({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : z("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: we({ fontSize: e.primaryFontSize })
              }, A(k.label), 5)
            ], 8, G$))), 128))
          ]),
          p.$slots.footer ? (m(), _("div", Z$, [
            _e(p.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : z("", !0)
        ], 36),
        N(ut, { name: "ksn-sub" }, {
          default: R(() => [
            d.value ? (m(), _("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: we({ width: e.secondaryWidth })
            }, [
              u("div", Q$, [
                u("p", J$, A(d.value.label), 1)
              ]),
              u("nav", eS, [
                (m(!0), _(se, null, fe(d.value.items, (k) => (m(), _("button", {
                  key: k.id,
                  type: "button",
                  "data-nav-id": k.id,
                  "aria-current": h(k) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(d.value, k)
                }, [
                  k.icon ? (m(), ee(Mt(k.icon), {
                    key: 0,
                    style: we({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : z("", !0),
                  u("span", {
                    class: "truncate",
                    style: we({ fontSize: e.secondaryFontSize })
                  }, A(k.label), 5)
                ], 8, tS))), 128))
              ])
            ], 4)) : z("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), uS = /* @__PURE__ */ me(dS, [["__scopeId", "data-v-e0ccb96c"]]), kS = {
  install(e) {
    e.component("KiutChartBar", kt), e.component("KiutChartLine", vt), e.component("KiutPieChart", Aa), e.component("KiutBoxplotChart", Sf), e.component("KiutCandlestickChart", fg), e.component("KiutHistogramChart", or), e.component("KiutSankeyChart", Jt), e.component("KiutAgentsPerDay", dm), e.component("KiutBookingManager", Hm), e.component("KiutCheckin", ur), e.component("KiutCheckinContainer", P0), e.component("KiutCheckinMetrics", y0), e.component("KiutCheckinSegments", hr), e.component("KiutDisruption", Z0), e.component("KiutFAQ", sb), e.component("KiutMessagesPerAgent", pb), e.component("KiutRecordLocator", Pb), e.component("KiutSalesByChannel", fr), e.component("KiutSeller", gr), e.component("KiutSellerContainer", yv), e.component("KiutTopAgents", Sv), e.component("KiutPaymentMethod", Uv), e.component("KiutAgentHumanConversations", Ly), e.component("KiutChannelMetrics", jy), e.component("KiutTriageCombinations", n1), e.component("KiutSelectLanguage", l1), e.component("KiutGuardrails", v1), e.component("KiutDisruptionNotifier", O1), e.component("KiutTotalConversationsCard", V1), e.component("KiutCsatP95Card", z1), e.component("KiutCsatPulseCard", N1), e.component("KiutCSATContainer", px), e.component("KiutAiGeneratedRevenueCard", mx), e.component("KiutAiGeneratedChart", Sx), e.component("KiutCostCard", Dx), e.component("KiutHumanEscalations", Ix), e.component("KiutHumanEscalationsCard", Fx), e.component("KiutNpsDailyMetrics", mr), e.component("KiutNpsMetrics", br), e.component("KiutNpsOverviewMetrics", pr), e.component("KiutAWSCost", Kx), e.component("KiutCostUsage", t_), e.component("KiutTokenUsage", u_), e.component("KiutConversationCount", __), e.component("KiutTopAgentsAnalysis", P_), e.component("KiutTopAgentsPie", j_), e.component("KiutDailyCostTrends", Z_), e.component("KiutModelUsage", uk), e.component("KiutMessageRoles", xk), e.component("KiutCostPerConversations", Tk), e.component("Tabs", vr), e.component("Table", Uk), e.component("TableVersions", V2), e.component("Filters", vw), e.component("InputText", ww), e.component("InputPassword", Lw), e.component("InputTextarea", Fw), e.component("InputFile", Kw), e.component("InputDateTime", Zw), e.component("InputTime", a5), e.component("InputRange", b5), e.component("InputNumber", k5), e.component("InputColorPicker", B5), e.component("EmojiPicker", X5), e.component("Select", $o), e.component("MultiSelect", oC), e.component("Toggle", kr), e.component("InputPhone", hC), e.component("SelectablePills", yC), e.component("SegmentedControl", wC), e.component("DateRangePicker", QC), e.component("DatePickerPresets", C$), e.component("Tag", Ue), e.component("TagSelect", T$), e.component("Button", xt), e.component("Modal", O$), e.component("Section", Y$), e.component("KiutAppShellNavigation", uS);
  }
};
export {
  Kx as AWSCost,
  Ly as AgentHumanConversations,
  dm as AgentsPerDay,
  Sx as AiGeneratedChart,
  mx as AiGeneratedRevenueCard,
  uS as AppShellNavigation,
  Hm as BookingManager,
  Sf as BoxplotChart,
  xt as Button,
  px as CSATContainer,
  fg as CandlestickChart,
  jy as ChannelMetrics,
  kt as ChartBar,
  vt as ChartLine,
  ur as Checkin,
  P0 as CheckinContainer,
  y0 as CheckinMetrics,
  hr as CheckinSegments,
  __ as ConversationCount,
  Dx as CostCard,
  Tk as CostPerConversations,
  t_ as CostUsage,
  z1 as CsatP95Card,
  N1 as CsatPulseCard,
  wr as DEFAULT_CATEGORY_LABELS,
  Cr as DEFAULT_EMOJI_CATALOG,
  y2 as DEFAULT_TABLE_VERSIONS_LABELS,
  Z_ as DailyCostTrends,
  C$ as DatePickerPresets,
  QC as DateRangePicker,
  Z0 as Disruption,
  O1 as DisruptionNotifier,
  x2 as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  X5 as EmojiPicker,
  sb as FAQ,
  vw as Filters,
  v1 as Guardrails,
  or as HistogramChart,
  Ix as HumanEscalations,
  Fx as HumanEscalationsCard,
  B5 as InputColorPicker,
  Zw as InputDateTime,
  Kw as InputFile,
  k5 as InputNumber,
  Lw as InputPassword,
  hC as InputPhone,
  b5 as InputRange,
  ww as InputText,
  Fw as InputTextarea,
  a5 as InputTime,
  kS as KiutUIPlugin,
  xk as MessageRoles,
  pb as MessagesPerAgent,
  O$ as Modal,
  uk as ModelUsage,
  oC as MultiSelect,
  mr as NpsDailyMetrics,
  br as NpsMetrics,
  pr as NpsOverviewMetrics,
  Uv as PaymentMethod,
  Aa as PieChart,
  xS as RESOURCE_TABLE_VERSIONS_COLUMNS,
  Pb as RecordLocator,
  fr as SalesByChannel,
  Jt as SankeyChart,
  Y$ as Section,
  wC as SegmentedControl,
  $o as Select,
  l1 as SelectLanguage,
  yC as SelectablePills,
  gr as Seller,
  yv as SellerContainer,
  Uk as Table,
  V2 as TableVersions,
  vr as Tabs,
  Ue as Tag,
  T$ as TagSelect,
  kr as Toggle,
  u_ as TokenUsage,
  Sv as TopAgents,
  P_ as TopAgentsAnalysis,
  j_ as TopAgentsPie,
  V1 as TotalConversationsCard,
  n1 as TriageCombinations,
  R5 as appendEmojiToDraft,
  _S as buildDefaultCategories,
  E5 as extractEmojis,
  P5 as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
