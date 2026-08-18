import { defineComponent as fe, shallowRef as $i, h as He, ref as ne, onMounted as Je, onUnmounted as at, watch as Te, toRaw as ao, nextTick as We, version as Jl, isProxy as Si, computed as C, toRef as Se, openBlock as f, createElementBlock as x, normalizeStyle as _e, createVNode as z, unref as B, createElementVNode as d, Fragment as he, renderList as pe, normalizeClass as X, toDisplayString as A, createCommentVNode as P, onBeforeUnmount as Mi, createStaticVNode as no, useSlots as mo, renderSlot as ke, Transition as ct, withCtx as E, Comment as er, createBlock as te, resolveDynamicComponent as rt, createTextVNode as De, Teleport as Wt, withDirectives as Qe, withModifiers as Be, vModelText as It, vShow as Kt, mergeProps as yt, createSlots as jo, useAttrs as en, withKeys as $a, inject as Di } from "vue";
import * as Ho from "echarts/core";
import { TooltipComponent as tr, TitleComponent as ar } from "echarts/components";
import { SankeyChart as nr } from "echarts/charts";
import { CanvasRenderer as or } from "echarts/renderers";
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
function Wo(e) {
  return Gt(tn(e * 100), 0, 100);
}
const vt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, oo = [..."0123456789ABCDEF"], sr = (e) => oo[e & 15], ir = (e) => oo[(e & 240) >> 4] + oo[e & 15], sn = (e) => (e & 240) >> 4 === (e & 15), lr = (e) => sn(e.r) && sn(e.g) && sn(e.b) && sn(e.a);
function rr(e) {
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
const cr = (e, t) => e < 255 ? t(e) : "";
function dr(e) {
  var t = lr(e) ? sr : ir;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + cr(e.a, t) : void 0;
}
const ur = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ai(e, t, a) {
  const n = t * Math.min(a, 1 - a), o = (s, i = (s + e / 30) % 12) => a - n * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function hr(e, t, a) {
  const n = (o, s = (o + e / 60) % 6) => a - a * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [n(5), n(3), n(1)];
}
function fr(e, t, a) {
  const n = Ai(e, 1, 0.5);
  let o;
  for (t + a > 1 && (o = 1 / (t + a), t *= o, a *= o), o = 0; o < 3; o++)
    n[o] *= 1 - t - a, n[o] += t;
  return n;
}
function gr(e, t, a, n, o) {
  return e === o ? (t - a) / n + (t < a ? 6 : 0) : t === o ? (a - e) / n + 2 : (e - t) / n + 4;
}
function po(e) {
  const a = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.max(a, n, o), i = Math.min(a, n, o), l = (s + i) / 2;
  let r, c, u;
  return s !== i && (u = s - i, c = l > 0.5 ? u / (2 - s - i) : u / (s + i), r = gr(a, n, o, u, s), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function bo(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(ea);
}
function vo(e, t, a) {
  return bo(Ai, e, t, a);
}
function mr(e, t, a) {
  return bo(fr, e, t, a);
}
function pr(e, t, a) {
  return bo(hr, e, t, a);
}
function Ti(e) {
  return (e % 360 + 360) % 360;
}
function br(e) {
  const t = ur.exec(e);
  let a = 255, n;
  if (!t)
    return;
  t[5] !== n && (a = t[6] ? Fa(+t[5]) : ea(+t[5]));
  const o = Ti(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? n = mr(o, s, i) : t[1] === "hsv" ? n = pr(o, s, i) : n = vo(o, s, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function vr(e, t) {
  var a = po(e);
  a[0] = Ti(a[0] + t), a = vo(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function yr(e) {
  if (!e)
    return;
  const t = po(e), a = t[0], n = Wo(t[1]), o = Wo(t[2]);
  return e.a < 255 ? `hsla(${a}, ${n}%, ${o}%, ${Nt(e.a)})` : `hsl(${a}, ${n}%, ${o}%)`;
}
const Ko = {
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
}, Uo = {
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
function xr() {
  const e = {}, t = Object.keys(Uo), a = Object.keys(Ko);
  let n, o, s, i, l;
  for (n = 0; n < t.length; n++) {
    for (i = l = t[n], o = 0; o < a.length; o++)
      s = a[o], l = l.replace(s, Ko[s]);
    s = parseInt(Uo[i], 16), e[l] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let ln;
function kr(e) {
  ln || (ln = xr(), ln.transparent = [0, 0, 0, 0]);
  const t = ln[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const _r = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function wr(e) {
  const t = _r.exec(e);
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
function Cr(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Nt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const zn = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ba = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function $r(e, t, a) {
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
    let n = po(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * a, t === 0 ? 360 : 1)), n = vo(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function Bi(e, t) {
  return e && Object.assign(t || {}, e);
}
function Yo(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = ea(e[3]))) : (t = Bi(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = ea(t.a)), t;
}
function Sr(e) {
  return e.charAt(0) === "r" ? wr(e) : br(e);
}
class Ka {
  constructor(t) {
    if (t instanceof Ka)
      return t;
    const a = typeof t;
    let n;
    a === "object" ? n = Yo(t) : a === "string" && (n = rr(t) || kr(t) || Sr(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Bi(this._rgb);
    return t && (t.a = Nt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Yo(t);
  }
  rgbString() {
    return this._valid ? Cr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? dr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? yr(this._rgb) : void 0;
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
    return t && (this._rgb = $r(this._rgb, t._rgb, a)), this;
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
    return vr(this._rgb, t), this;
  }
}
function Ot() {
}
const Mr = /* @__PURE__ */ (() => {
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
function Le(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function wt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Bt(e, t) {
  return wt(e) ? e : t;
}
function Ae(e, t) {
  return typeof e > "u" ? t : e;
}
const Dr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Li = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function je(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function Ee(e, t, a, n) {
  let o, s, i;
  if (Ge(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(a, e[o], o);
  else if (Le(e))
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
  if (Le(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), n = a.length;
    let o = 0;
    for (; o < n; ++o)
      t[a[o]] = Mn(e[a[o]]);
    return t;
  }
  return e;
}
function Ri(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Ar(e, t, a, n) {
  if (!Ri(e))
    return;
  const o = t[e], s = a[e];
  Le(o) && Le(s) ? Ua(o, s, n) : t[e] = Mn(s);
}
function Ua(e, t, a) {
  const n = Ge(t) ? t : [
    t
  ], o = n.length;
  if (!Le(e))
    return e;
  a = a || {};
  const s = a.merger || Ar;
  let i;
  for (let l = 0; l < o; ++l) {
    if (i = n[l], !Le(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, u = r.length; c < u; ++c)
      s(r[c], e, i, a);
  }
  return e;
}
function za(e, t) {
  return Ua(e, t, {
    merger: Tr
  });
}
function Tr(e, t, a) {
  if (!Ri(e))
    return;
  const n = t[e], o = a[e];
  Le(n) && Le(o) ? za(n, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Mn(o));
}
const qo = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Br(e) {
  const t = e.split("."), a = [];
  let n = "";
  for (const o of t)
    n += o, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (a.push(n), n = "");
  return a;
}
function Lr(e) {
  const t = Br(e);
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
  return (qo[t] || (qo[t] = Lr(t)))(e);
}
function yo(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Ya = (e) => typeof e < "u", ta = (e) => typeof e == "function", Xo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function Rr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Fe = Math.PI, Ue = 2 * Fe, Ir = Ue + Fe, Dn = Number.POSITIVE_INFINITY, Pr = Fe / 180, Ze = Fe / 2, sa = Fe / 4, Go = Fe * 2 / 3, Ii = Math.log10, Pt = Math.sign;
function ja(e, t, a) {
  return Math.abs(e - t) < a;
}
function Zo(e) {
  const t = Math.round(e);
  e = ja(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(Ii(e))), n = e / a;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * a;
}
function Er(e) {
  const t = [], a = Math.sqrt(e);
  let n;
  for (n = 1; n < a; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return a === (a | 0) && t.push(a), t.sort((o, s) => o - s).pop(), t;
}
function Or(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function qa(e) {
  return !Or(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Fr(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Vr(e, t, a) {
  let n, o, s;
  for (n = 0, o = e.length; n < o; n++)
    s = e[n][a], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function zt(e) {
  return e * (Fe / 180);
}
function Nr(e) {
  return e * (180 / Fe);
}
function Qo(e) {
  if (!wt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function Pi(e, t) {
  const a = t.x - e.x, n = t.y - e.y, o = Math.sqrt(a * a + n * n);
  let s = Math.atan2(n, a);
  return s < -0.5 * Fe && (s += Ue), {
    angle: s,
    distance: o
  };
}
function so(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function zr(e, t) {
  return (e - t + Ir) % Ue - Fe;
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
function jr(e) {
  return it(e, -32768, 32767);
}
function Zt(e, t, a, n = 1e-6) {
  return e >= Math.min(t, a) - n && e <= Math.max(t, a) + n;
}
function xo(e, t, a) {
  a = a || ((i) => e[i] < t);
  let n = e.length - 1, o = 0, s;
  for (; n - o > 1; )
    s = o + n >> 1, a(s) ? o = s : n = s;
  return {
    lo: o,
    hi: n
  };
}
const ua = (e, t, a, n) => xo(e, a, n ? (o) => {
  const s = e[o][t];
  return s < a || s === a && e[o + 1][t] === a;
} : (o) => e[o][t] < a), Hr = (e, t, a) => xo(e, a, (n) => e[n][t] >= a);
function Wr(e, t, a) {
  let n = 0, o = e.length;
  for (; n < o && e[n] < t; )
    n++;
  for (; o > n && e[o - 1] > a; )
    o--;
  return n > 0 || o < e.length ? e.slice(n, o) : e;
}
const Ei = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Kr(e, t) {
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
  }), Ei.forEach((a) => {
    const n = "_onData" + yo(a), o = e[a];
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
function Jo(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const n = a.listeners, o = n.indexOf(t);
  o !== -1 && n.splice(o, 1), !(n.length > 0) && (Ei.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function Oi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Fi = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Vi(e, t) {
  let a = [], n = !1;
  return function(...o) {
    a = o, n || (n = !0, Fi.call(window, () => {
      n = !1, e.apply(t, a);
    }));
  };
}
function Ur(e, t) {
  let a;
  return function(...n) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, n)) : e.apply(this, n), t;
  };
}
const ko = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", nt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Yr = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function qr(e, t, a) {
  const n = t.length;
  let o = 0, s = n;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: g, max: h, minDefined: b, maxDefined: m } = i.getUserBounds();
    if (b) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        ua(r, u, g).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? n : ua(t, u, i.getPixelForValue(g)).lo
      ), c) {
        const v = r.slice(0, o + 1).reverse().findIndex((p) => !Pe(p[l.axis]));
        o -= Math.max(0, v);
      }
      o = it(o, 0, n - 1);
    }
    if (m) {
      let v = Math.max(
        // @ts-expect-error Need to type _parsed
        ua(r, i.axis, h, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : ua(t, u, i.getPixelForValue(h), !0).hi + 1
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
function Xr(e) {
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
const cn = (e) => e === 0 || e === 1, es = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ue / a)), ts = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ue / a) + 1, Ha = {
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
  easeInElastic: (e) => cn(e) ? e : es(e, 0.075, 0.3),
  easeOutElastic: (e) => cn(e) ? e : ts(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return cn(e) ? e : e < 0.5 ? 0.5 * es(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * ts(e * 2 - 1, 0.1125, 0.45);
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
function _o(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function as(e) {
  return _o(e) ? e : new Ka(e);
}
function jn(e) {
  return _o(e) ? e : new Ka(e).saturate(0.5).darken(0.1).hexString();
}
const Gr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Zr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Qr(e) {
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
      properties: Zr
    },
    numbers: {
      type: "number",
      properties: Gr
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
function Jr(e) {
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
const ns = /* @__PURE__ */ new Map();
function ec(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let n = ns.get(a);
  return n || (n = new Intl.NumberFormat(e, t), ns.set(a, n)), n;
}
function wo(e, t, a) {
  return ec(t, a).format(e);
}
const tc = {
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
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = ac(e, a);
    }
    const i = Ii(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), wo(e, n, r);
  }
};
function ac(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Ni = {
  formatters: tc
};
function nc(e) {
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
      callback: Ni.formatters.values,
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
const ga = /* @__PURE__ */ Object.create(null), io = /* @__PURE__ */ Object.create(null);
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
class oc {
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
    return Hn(io, t, a);
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
          return Le(r) ? Object.assign({}, c, r) : Ae(r, c);
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
var Ye = /* @__PURE__ */ new oc({
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
  Qr,
  Jr,
  nc
]);
function sc(e) {
  return !e || Pe(e.size) || Pe(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function os(e, t, a, n, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, a.push(o)), s > n && (n = s), n;
}
function ia(e, t, a) {
  const n = e.currentDevicePixelRatio, o = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - o) * n) / n + o;
}
function ss(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function lo(e, t, a, n) {
  zi(e, t, a, n, null);
}
function zi(e, t, a, n, o) {
  let s, i, l, r, c, u, g, h;
  const b = t.pointStyle, m = t.rotation, v = t.radius;
  let p = (m || 0) * Pr;
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
        u = o ? o / 2 : v, e.moveTo(a + Math.sin(p) * u, n - Math.cos(p) * v), p += Go, e.lineTo(a + Math.sin(p) * u, n - Math.cos(p) * v), p += Go, e.lineTo(a + Math.sin(p) * u, n - Math.cos(p) * v), e.closePath();
        break;
      case "rectRounded":
        c = v * 0.516, r = v - c, i = Math.cos(p + sa) * r, g = Math.cos(p + sa) * (o ? o / 2 - c : r), l = Math.sin(p + sa) * r, h = Math.sin(p + sa) * (o ? o / 2 - c : r), e.arc(a - g, n - l, c, p - Fe, p - Ze), e.arc(a + h, n - i, c, p - Ze, p), e.arc(a + g, n + l, c, p, p + Ze), e.arc(a - h, n + i, c, p + Ze, p + Fe), e.closePath();
        break;
      case "rect":
        if (!m) {
          r = Math.SQRT1_2 * v, u = o ? o / 2 : r, e.rect(a - u, n - r, 2 * u, 2 * r);
          break;
        }
        p += sa;
      /* falls through */
      case "rectRot":
        g = Math.cos(p) * (o ? o / 2 : v), i = Math.cos(p) * v, l = Math.sin(p) * v, h = Math.sin(p) * (o ? o / 2 : v), e.moveTo(a - g, n - l), e.lineTo(a + h, n - i), e.lineTo(a + g, n + l), e.lineTo(a - h, n + i), e.closePath();
        break;
      case "crossRot":
        p += sa;
      /* falls through */
      case "cross":
        g = Math.cos(p) * (o ? o / 2 : v), i = Math.cos(p) * v, l = Math.sin(p) * v, h = Math.sin(p) * (o ? o / 2 : v), e.moveTo(a - g, n - l), e.lineTo(a + g, n + l), e.moveTo(a + h, n - i), e.lineTo(a - h, n + i);
        break;
      case "star":
        g = Math.cos(p) * (o ? o / 2 : v), i = Math.cos(p) * v, l = Math.sin(p) * v, h = Math.sin(p) * (o ? o / 2 : v), e.moveTo(a - g, n - l), e.lineTo(a + g, n + l), e.moveTo(a + h, n - i), e.lineTo(a - h, n + i), p += sa, g = Math.cos(p) * (o ? o / 2 : v), i = Math.cos(p) * v, l = Math.sin(p) * v, h = Math.sin(p) * (o ? o / 2 : v), e.moveTo(a - g, n - l), e.lineTo(a + g, n + l), e.moveTo(a + h, n - i), e.lineTo(a - h, n + i);
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
function Co(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function $o(e) {
  e.restore();
}
function ic(e, t, a, n, o) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (o === "middle") {
    const s = (t.x + a.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, a.y);
  } else o === "after" != !!n ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function lc(e, t, a, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? a.cp2x : a.cp1x, n ? a.cp2y : a.cp1y, a.x, a.y);
}
function rc(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Pe(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function cc(e, t, a, n, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(n), i = t - s.actualBoundingBoxLeft, l = t + s.actualBoundingBoxRight, r = a - s.actualBoundingBoxAscent, c = a + s.actualBoundingBoxDescent, u = o.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function dc(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function Za(e, t, a, n, o, s = {}) {
  const i = Ge(t) ? t : [
    t
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = o.string, rc(e, s), r = 0; r < i.length; ++r)
    c = i[r], s.backdrop && dc(e, s.backdrop), l && (s.strokeColor && (e.strokeStyle = s.strokeColor), Pe(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, a, n, s.maxWidth)), e.fillText(c, a, n, s.maxWidth), cc(e, a, n, c, s), n += Number(o.lineHeight);
  e.restore();
}
function An(e, t) {
  const { x: a, y: n, w: o, h: s, radius: i } = t;
  e.arc(a + i.topLeft, n + i.topLeft, i.topLeft, 1.5 * Fe, Fe, !0), e.lineTo(a, n + s - i.bottomLeft), e.arc(a + i.bottomLeft, n + s - i.bottomLeft, i.bottomLeft, Fe, Ze, !0), e.lineTo(a + o - i.bottomRight, n + s), e.arc(a + o - i.bottomRight, n + s - i.bottomRight, i.bottomRight, Ze, 0, !0), e.lineTo(a + o, n + i.topRight), e.arc(a + o - i.topRight, n + i.topRight, i.topRight, 0, -Ze, !0), e.lineTo(a + i.topLeft, n);
}
const uc = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, hc = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function fc(e, t) {
  const a = ("" + e).match(uc);
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
const gc = (e) => +e || 0;
function So(e, t) {
  const a = {}, n = Le(t), o = n ? Object.keys(t) : t, s = Le(e) ? n ? (i) => Ae(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    a[i] = gc(s(i));
  return a;
}
function ji(e) {
  return So(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function wa(e) {
  return So(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Ct(e) {
  const t = ji(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function lt(e, t) {
  e = e || {}, t = t || Ye.font;
  let a = Ae(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let n = Ae(e.style, t.style);
  n && !("" + n).match(hc) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const o = {
    family: Ae(e.family, t.family),
    lineHeight: fc(Ae(e.lineHeight, t.lineHeight), a),
    size: a,
    style: n,
    weight: Ae(e.weight, t.weight),
    string: ""
  };
  return o.string = sc(o), o;
}
function dn(e, t, a, n) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function mc(e, t, a) {
  const { min: n, max: o } = e, s = Li(t, (o - n) / 2), i = (l, r) => a && l === 0 ? 0 : l + r;
  return {
    min: i(n, -Math.abs(s)),
    max: i(o, s)
  };
}
function ma(e, t) {
  return Object.assign(Object.create(e), t);
}
function Mo(e, t = [
  ""
], a, n, o = () => e[0]) {
  const s = a || e;
  typeof n > "u" && (n = Ui("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: n,
    _getTarget: o,
    override: (l) => Mo([
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
      return Wi(l, r, () => wc(r, t, e, l));
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
      return ls(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return ls(l);
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
    _descriptors: Hi(e, n),
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
      return Wi(s, i, () => bc(s, i, l));
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
function Hi(e, t = {
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
const pc = (e, t) => e ? e + yo(t) : t, Do = (e, t) => Le(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Wi(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function bc(e, t, a) {
  const { _proxy: n, _context: o, _subProxy: s, _descriptors: i } = e;
  let l = n[t];
  return ta(l) && i.isScriptable(t) && (l = vc(t, l, e, a)), Ge(l) && l.length && (l = yc(t, l, e, i.isIndexable)), Do(t, l) && (l = Sa(l, o, s && s[t], i)), l;
}
function vc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = a;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(s, i || n);
  return l.delete(e), Do(e, r) && (r = Ao(o._scopes, o, e, r)), r;
}
function yc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: l } = a;
  if (typeof s.index < "u" && n(e))
    return t[s.index % t.length];
  if (Le(t[0])) {
    const r = t, c = o._scopes.filter((u) => u !== r);
    t = [];
    for (const u of r) {
      const g = Ao(c, o, e, u);
      t.push(Sa(g, s, i && i[e], l));
    }
  }
  return t;
}
function Ki(e, t, a) {
  return ta(e) ? e(t, a) : e;
}
const xc = (e, t) => e === !0 ? t : typeof e == "string" ? fa(t, e) : void 0;
function kc(e, t, a, n, o) {
  for (const s of t) {
    const i = xc(a, s);
    if (i) {
      e.add(i);
      const l = Ki(i._fallback, a, o);
      if (typeof l < "u" && l !== a && l !== n)
        return l;
    } else if (i === !1 && typeof n < "u" && a !== n)
      return null;
  }
  return !1;
}
function Ao(e, t, a, n) {
  const o = t._rootScopes, s = Ki(t._fallback, a, n), i = [
    ...e,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(n);
  let r = is(l, i, a, s || a, n);
  return r === null || typeof s < "u" && s !== a && (r = is(l, i, s, r, n), r === null) ? !1 : Mo(Array.from(l), [
    ""
  ], o, s, () => _c(t, a, n));
}
function is(e, t, a, n, o) {
  for (; a; )
    a = kc(e, t, a, n, o);
  return a;
}
function _c(e, t, a) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const o = n[t];
  return Ge(o) && Le(a) ? a : o || {};
}
function wc(e, t, a, n) {
  let o;
  for (const s of t)
    if (o = Ui(pc(s, e), a), typeof o < "u")
      return Do(e, o) ? Ao(a, n, e, o) : o;
}
function Ui(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const n = a[e];
    if (typeof n < "u")
      return n;
  }
}
function ls(e) {
  let t = e._keys;
  return t || (t = e._keys = Cc(e._scopes)), t;
}
function Cc(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const n of Object.keys(a).filter((o) => !o.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const $c = Number.EPSILON || 1e-14, Ma = (e, t) => t < e.length && !e[t].skip && e[t], Yi = (e) => e === "x" ? "y" : "x";
function Sc(e, t, a, n) {
  const o = e.skip ? t : e, s = t, i = a.skip ? t : a, l = so(s, o), r = so(i, s);
  let c = l / (l + r), u = r / (l + r);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const g = n * c, h = n * u;
  return {
    previous: {
      x: s.x - g * (i.x - o.x),
      y: s.y - g * (i.y - o.y)
    },
    next: {
      x: s.x + h * (i.x - o.x),
      y: s.y + h * (i.y - o.y)
    }
  };
}
function Mc(e, t, a) {
  const n = e.length;
  let o, s, i, l, r, c = Ma(e, 0);
  for (let u = 0; u < n - 1; ++u)
    if (r = c, c = Ma(e, u + 1), !(!r || !c)) {
      if (ja(t[u], 0, $c)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      o = a[u] / t[u], s = a[u + 1] / t[u], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), a[u] = o * i * t[u], a[u + 1] = s * i * t[u]);
    }
}
function Dc(e, t, a = "x") {
  const n = Yi(a), o = e.length;
  let s, i, l, r = Ma(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = r, r = Ma(e, c + 1), !l)
      continue;
    const u = l[a], g = l[n];
    i && (s = (u - i[a]) / 3, l[`cp1${a}`] = u - s, l[`cp1${n}`] = g - s * t[c]), r && (s = (r[a] - u) / 3, l[`cp2${a}`] = u + s, l[`cp2${n}`] = g + s * t[c]);
  }
}
function Ac(e, t = "x") {
  const a = Yi(t), n = e.length, o = Array(n).fill(0), s = Array(n);
  let i, l, r, c = Ma(e, 0);
  for (i = 0; i < n; ++i)
    if (l = r, r = c, c = Ma(e, i + 1), !!r) {
      if (c) {
        const u = c[t] - r[t];
        o[i] = u !== 0 ? (c[a] - r[a]) / u : 0;
      }
      s[i] = l ? c ? Pt(o[i - 1]) !== Pt(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  Mc(e, o, s), Dc(e, s, t);
}
function un(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function Tc(e, t) {
  let a, n, o, s, i, l = Ga(e[0], t);
  for (a = 0, n = e.length; a < n; ++a)
    i = s, s = l, l = a < n - 1 && Ga(e[a + 1], t), s && (o = e[a], i && (o.cp1x = un(o.cp1x, t.left, t.right), o.cp1y = un(o.cp1y, t.top, t.bottom)), l && (o.cp2x = un(o.cp2x, t.left, t.right), o.cp2y = un(o.cp2y, t.top, t.bottom)));
}
function Bc(e, t, a, n, o) {
  let s, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Ac(e, o);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      l = e[s], r = Sc(c, l, e[Math.min(s + 1, i - (n ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && Tc(e, a);
}
function To() {
  return typeof window < "u" && typeof document < "u";
}
function Bo(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Tn(e, t, a) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[a])) : n = e, n;
}
const Pn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Lc(e, t) {
  return Pn(e).getPropertyValue(t);
}
const Rc = [
  "top",
  "right",
  "bottom",
  "left"
];
function ha(e, t, a) {
  const n = {};
  a = a ? "-" + a : "";
  for (let o = 0; o < 4; o++) {
    const s = Rc[o];
    n[s] = parseFloat(e[t + "-" + s + a]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Ic = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function Pc(e, t) {
  const a = e.touches, n = a && a.length ? a[0] : e, { offsetX: o, offsetY: s } = n;
  let i = !1, l, r;
  if (Ic(o, s, e.target))
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
  const { canvas: a, currentDevicePixelRatio: n } = t, o = Pn(a), s = o.boxSizing === "border-box", i = ha(o, "padding"), l = ha(o, "border", "width"), { x: r, y: c, box: u } = Pc(e, a), g = i.left + (u && l.left), h = i.top + (u && l.top);
  let { width: b, height: m } = t;
  return s && (b -= i.width + l.width, m -= i.height + l.height), {
    x: Math.round((r - g) / b * a.width / n),
    y: Math.round((c - h) / m * a.height / n)
  };
}
function Ec(e, t, a) {
  let n, o;
  if (t === void 0 || a === void 0) {
    const s = e && Bo(e);
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
function Oc(e, t, a, n) {
  const o = Pn(e), s = ha(o, "margin"), i = Tn(o.maxWidth, e, "clientWidth") || Dn, l = Tn(o.maxHeight, e, "clientHeight") || Dn, r = Ec(e, t, a);
  let { width: c, height: u } = r;
  if (o.boxSizing === "content-box") {
    const h = ha(o, "border", "width"), b = ha(o, "padding");
    c -= b.width + h.width, u -= b.height + h.height;
  }
  return c = Math.max(0, c - s.width), u = Math.max(0, n ? c / n : u - s.height), c = Qt(Math.min(c, i, r.maxWidth)), u = Qt(Math.min(u, l, r.maxHeight)), c && !u && (u = Qt(c / 2)), (t !== void 0 || a !== void 0) && n && r.height && u > r.height && (u = r.height, c = Qt(Math.floor(u * n))), {
    width: c,
    height: u
  };
}
function rs(e, t, a) {
  const n = t || 1, o = Qt(e.height * n), s = Qt(e.width * n);
  e.height = Qt(e.height), e.width = Qt(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = n, i.height = o, i.width = s, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Fc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    To() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function cs(e, t) {
  const a = Lc(e, t), n = a && a.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function da(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Vc(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: n === "middle" ? a < 0.5 ? e.y : t.y : n === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Nc(e, t, a, n) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = da(e, o, a), l = da(o, s, a), r = da(s, t, a), c = da(i, l, a), u = da(l, r, a);
  return da(c, u, a);
}
const zc = function(e, t) {
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
}, jc = function() {
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
  return e ? zc(t, a) : jc();
}
function qi(e, t) {
  let a, n;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, n = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function Xi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Gi(e) {
  return e === "angle" ? {
    between: Xa,
    compare: zr,
    normalize: St
  } : {
    between: Zt,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function ds({ start: e, end: t, count: a, loop: n, style: o }) {
  return {
    start: e % a,
    end: t % a,
    loop: n && (t - e + 1) % a === 0,
    style: o
  };
}
function Hc(e, t, a) {
  const { property: n, start: o, end: s } = a, { between: i, normalize: l } = Gi(n), r = t.length;
  let { start: c, end: u, loop: g } = e, h, b;
  if (g) {
    for (c += r, u += r, h = 0, b = r; h < b && i(l(t[c % r][n]), o, s); ++h)
      c--, u--;
    c %= r, u %= r;
  }
  return u < c && (u += r), {
    start: c,
    end: u,
    loop: g,
    style: e.style
  };
}
function Wc(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: o, end: s } = a, i = t.length, { compare: l, between: r, normalize: c } = Gi(n), { start: u, end: g, loop: h, style: b } = Hc(e, t, a), m = [];
  let v = !1, p = null, y, k, _;
  const w = () => r(o, _, y) && l(o, _) !== 0, $ = () => l(s, y) === 0 || r(s, _, y), D = () => v || w(), M = () => !v || $();
  for (let O = u, N = u; O <= g; ++O)
    k = t[O % i], !k.skip && (y = c(k[n]), y !== _ && (v = r(y, o, s), p === null && D() && (p = l(y, o) === 0 ? O : N), p !== null && M() && (m.push(ds({
      start: p,
      end: O,
      loop: h,
      count: i,
      style: b
    })), p = null), N = O, _ = y));
  return p !== null && m.push(ds({
    start: p,
    end: g,
    loop: h,
    count: i,
    style: b
  })), m;
}
function Kc(e, t) {
  const a = [], n = e.segments;
  for (let o = 0; o < n.length; o++) {
    const s = Wc(n[o], e.points, t);
    s.length && a.push(...s);
  }
  return a;
}
function Uc(e, t, a, n) {
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
function Yc(e, t, a, n) {
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
function qc(e, t) {
  const a = e.points, n = e.options.spanGaps, o = a.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: l } = Uc(a, o, s, n);
  if (n === !0)
    return us(e, [
      {
        start: i,
        end: l,
        loop: s
      }
    ], a, t);
  const r = l < i ? l + o : l, c = !!e._fullLoop && i === 0 && l === o - 1;
  return us(e, Yc(a, i, r, c), a, t);
}
function us(e, t, a, n) {
  return !n || !n.setContext || !a ? t : Xc(e, t, a, n);
}
function Xc(e, t, a, n) {
  const o = e._chart.getContext(), s = hs(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = a.length, c = [];
  let u = s, g = t[0].start, h = g;
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
      }), u = y, g = v % r);
    }
  }
  for (const m of t) {
    g = l ? g : m.start;
    let v = a[g % r], p;
    for (h = g + 1; h <= m.end; h++) {
      const y = a[h % r];
      p = hs(n.setContext(ma(o, {
        type: "segment",
        p0: v,
        p1: y,
        p0DataIndex: (h - 1) % r,
        p1DataIndex: h % r,
        datasetIndex: i
      }))), Gc(p, u) && b(g, h - 1, m.loop, u), v = y, u = p;
    }
    g < h - 1 && b(g, h - 1, m.loop, u);
  }
  return c;
}
function hs(e) {
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
function Gc(e, t) {
  if (!t)
    return !1;
  const a = [], n = function(o, s) {
    return _o(s) ? (a.includes(s) || a.push(s), a.indexOf(s)) : s;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function hn(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Zc(e, t) {
  const { xScale: a, yScale: n } = e;
  return a && n ? {
    left: hn(a, t, "left"),
    right: hn(a, t, "right"),
    top: hn(n, t, "top"),
    bottom: hn(n, t, "bottom")
  } : t;
}
function Qc(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const n = Zc(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : n.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : n.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : n.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : n.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class Jc {
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
    this._request || (this._running = !0, this._request = Fi.call(window, () => {
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
var Ft = /* @__PURE__ */ new Jc();
const fs = "transparent", ed = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const n = as(e || fs), o = n.valid && as(t || fs);
    return o && o.valid ? o.mix(n, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class td {
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
    this._active = !0, this._fn = t.fn || ed[t.type || typeof i], this._easing = Ha[t.easing] || Ha.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = n, this._from = i, this._to = o, this._promises = void 0;
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
class Zi {
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
    const n = a.options, o = nd(t, n);
    if (!o)
      return [];
    const s = this._createAnimations(o, n);
    return n.$shared && ad(t.options.$animations, n).then(() => {
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
      let g = s[c];
      const h = n.get(c);
      if (g)
        if (h && g.active()) {
          g.update(h, u, l);
          continue;
        } else
          g.cancel();
      if (!h || !h.duration) {
        t[c] = u;
        continue;
      }
      s[c] = g = new td(h, t, c, u), o.push(g);
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
function ad(e, t) {
  const a = [], n = Object.keys(t);
  for (let o = 0; o < n.length; o++) {
    const s = e[n[o]];
    s && s.active() && a.push(s.wait());
  }
  return Promise.all(a);
}
function nd(e, t) {
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
function gs(e, t) {
  const a = e && e.options || {}, n = a.reverse, o = a.min === void 0 ? t : 0, s = a.max === void 0 ? t : 0;
  return {
    start: n ? s : o,
    end: n ? o : s
  };
}
function od(e, t, a) {
  if (a === !1)
    return !1;
  const n = gs(e, a), o = gs(t, a);
  return {
    top: o.end,
    right: n.end,
    bottom: o.start,
    left: n.start
  };
}
function sd(e) {
  let t, a, n, o;
  return Le(e) ? (t = e.top, a = e.right, n = e.bottom, o = e.left) : t = a = n = o = e, {
    top: t,
    right: a,
    bottom: n,
    left: o,
    disabled: e === !1
  };
}
function Qi(e, t) {
  const a = [], n = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = n.length; o < s; ++o)
    a.push(n[o].index);
  return a;
}
function ms(e, t, a, n = {}) {
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
function id(e, t) {
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
function ld(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function rd(e) {
  const { min: t, max: a, minDefined: n, maxDefined: o } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: o ? a : Number.POSITIVE_INFINITY
  };
}
function cd(e, t, a) {
  const n = e[t] || (e[t] = {});
  return n[a] || (n[a] = {});
}
function ps(e, t, a, n) {
  for (const o of t.getMatchingVisibleMetas(n).reverse()) {
    const s = e[o.index];
    if (a && s > 0 || !a && s < 0)
      return o.index;
  }
  return null;
}
function bs(e, t) {
  const { chart: a, _cachedMeta: n } = e, o = a._stacks || (a._stacks = {}), { iScale: s, vScale: i, index: l } = n, r = s.axis, c = i.axis, u = ld(s, i, n), g = t.length;
  let h;
  for (let b = 0; b < g; ++b) {
    const m = t[b], { [r]: v, [c]: p } = m, y = m._stacks || (m._stacks = {});
    h = y[c] = cd(o, u, v), h[l] = p, h._top = ps(h, i, !0, n.type), h._bottom = ps(h, i, !1, n.type);
    const k = h._visualValues || (h._visualValues = {});
    k[l] = p;
  }
}
function Kn(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((n) => a[n].axis === t).shift();
}
function dd(e, t) {
  return ma(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function ud(e, t, a) {
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
const Un = (e) => e === "reset" || e === "none", vs = (e, t) => t ? e : Object.assign({}, e), hd = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: Qi(a, !0),
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
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), o = (g, h, b, m) => g === "x" ? h : g === "r" ? m : b, s = a.xAxisID = Ae(n.xAxisID, Kn(t, "x")), i = a.yAxisID = Ae(n.yAxisID, Kn(t, "y")), l = a.rAxisID = Ae(n.rAxisID, Kn(t, "r")), r = a.indexAxis, c = a.iAxisID = o(r, s, i, l), u = a.vAxisID = o(r, i, s, l);
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
    this._data && Jo(this._data, this), t._stacked && Ta(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), n = this._data;
    if (Le(a)) {
      const o = this._cachedMeta;
      this._data = id(a, o);
    } else if (n !== a) {
      if (n) {
        Jo(n, this);
        const o = this._cachedMeta;
        Ta(o), o._parsed = [];
      }
      a && Object.isExtensible(a) && Kr(a, this), this._syncList = [], this._data = a;
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
    a._stacked = Wn(a.vScale, a), a.stack !== n.stack && (o = !0, Ta(a), a.stack = n.stack), this._resyncElements(t), (o || s !== a._stacked) && (bs(this, a._parsed), a._stacked = Wn(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: n, _data: o } = this, { iScale: s, _stacked: i } = n, l = s.axis;
    let r = t === 0 && a === o.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], u, g, h;
    if (this._parsing === !1)
      n._parsed = o, n._sorted = !0, h = o;
    else {
      Ge(o[t]) ? h = this.parseArrayData(n, o, t, a) : Le(o[t]) ? h = this.parseObjectData(n, o, t, a) : h = this.parsePrimitiveData(n, o, t, a);
      const b = () => g[l] === null || c && g[l] < c[l];
      for (u = 0; u < a; ++u)
        n._parsed[u + t] = g = h[u], r && (b() && (r = !1), c = g);
      n._sorted = r;
    }
    i && bs(this, h);
  }
  parsePrimitiveData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, l = s.axis, r = i.axis, c = s.getLabels(), u = s === i, g = new Array(o);
    let h, b, m;
    for (h = 0, b = o; h < b; ++h)
      m = h + n, g[h] = {
        [l]: u || s.parse(c[m], m),
        [r]: i.parse(a[m], m)
      };
    return g;
  }
  parseArrayData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, l = new Array(o);
    let r, c, u, g;
    for (r = 0, c = o; r < c; ++r)
      u = r + n, g = a[u], l[r] = {
        x: s.parse(g[0], u),
        y: i.parse(g[1], u)
      };
    return l;
  }
  parseObjectData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = new Array(o);
    let u, g, h, b;
    for (u = 0, g = o; u < g; ++u)
      h = u + n, b = a[h], c[u] = {
        x: s.parse(fa(b, l), h),
        y: i.parse(fa(b, r), h)
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
      keys: Qi(o, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return ms(l, i, s.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, a, n, o) {
    const s = n[a.axis];
    let i = s === null ? NaN : s;
    const l = o && n._stacks[a.axis];
    o && l && (o.values = l, i = ms(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const n = this._cachedMeta, o = n._parsed, s = n._sorted && t === n.iScale, i = o.length, l = this._getOtherScale(t), r = hd(a, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: g } = rd(l);
    let h, b;
    function m() {
      b = o[h];
      const v = b[l.axis];
      return !wt(b[t.axis]) || u > v || g < v;
    }
    for (h = 0; h < i && !(!m() && (this.updateRangeFromParsed(c, t, b, r), s)); ++h)
      ;
    if (s) {
      for (h = i - 1; h >= 0; --h)
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
    this.update(t || "default"), a._clip = sd(Ae(this.options.clip, od(a.xScale, a.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, a = this.chart, n = this._cachedMeta, o = n.data || [], s = a.chartArea, i = [], l = this._drawStart || 0, r = this._drawCount || o.length - l, c = this.options.drawActiveElementsOnTop;
    let u;
    for (n.dataset && n.dataset.draw(t, s, l, r), u = l; u < l + r; ++u) {
      const g = o[u];
      g.hidden || (g.active && c ? i.push(g) : g.draw(t, s));
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
      s = i.$context || (i.$context = ud(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = dd(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
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
      return vs(l, r);
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), g = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], h = c.getOptionScopes(this.getDataset(), u), b = Object.keys(Ye.elements[t]), m = () => this.getContext(n, o, a), v = c.resolveNamedOptions(h, b, m, g);
    return v.$shared && (v.$shared = r, s[i] = Object.freeze(vs(v, r))), v;
  }
  _resolveAnimations(t, a, n) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${a}`, l = s[i];
    if (l)
      return l;
    let r;
    if (o.options.animation !== !1) {
      const u = this.chart.config, g = u.datasetAnimationScopeKeys(this._type, a), h = u.getOptionScopes(this.getDataset(), g);
      r = u.createResolver(h, this.getContext(t, n, a));
    }
    const c = new Zi(o, r && r.animations);
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
function fd(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let o = 0, s = a.length; o < s; o++)
      n = n.concat(a[o].controller.getAllParsedValues(e));
    e._cache.$bar = Oi(n.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function gd(e) {
  const t = e.iScale, a = fd(t, e.type);
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
function md(e, t, a, n) {
  const o = a.barThickness;
  let s, i;
  return Pe(o) ? (s = t.min * a.categoryPercentage, i = a.barPercentage) : (s = o * n, i = 1), {
    chunk: s / n,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function pd(e, t, a, n) {
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
function bd(e, t, a, n) {
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
function Ji(e, t, a, n) {
  return Ge(e) ? bd(e, t, a, n) : t[a.axis] = a.parse(e, n), t;
}
function ys(e, t, a, n) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), l = o === s, r = [];
  let c, u, g, h;
  for (c = a, u = a + n; c < u; ++c)
    h = t[c], g = {}, g[o.axis] = l || o.parse(i[c], c), r.push(Ji(h, g, s, c));
  return r;
}
function Yn(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function vd(e, t, a) {
  return e !== 0 ? Pt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function yd(e) {
  let t, a, n, o, s;
  return e.horizontal ? (t = e.base > e.x, a = "left", n = "right") : (t = e.base < e.y, a = "bottom", n = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: a,
    end: n,
    reverse: t,
    top: o,
    bottom: s
  };
}
function xd(e, t, a, n) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: u } = yd(e);
  o === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === n ? o = c : (a._bottom || 0) === n ? o = u : (s[xs(u, i, l, r)] = !0, o = c)), s[xs(o, i, l, r)] = !0, e.borderSkipped = s;
}
function xs(e, t, a, n) {
  return n ? (e = kd(e, t, a), e = ks(e, a, t)) : e = ks(e, t, a), e;
}
function kd(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function ks(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function _d(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class wd extends En {
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
    return ys(t, a, n, o);
  }
  parseArrayData(t, a, n, o) {
    return ys(t, a, n, o);
  }
  parseObjectData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = s.axis === "x" ? l : r, u = i.axis === "x" ? l : r, g = [];
    let h, b, m, v;
    for (h = n, b = n + o; h < b; ++h)
      v = a[h], m = {}, m[s.axis] = s.parse(fa(v, c), h), g.push(Ji(fa(v, u), m, i, h));
    return g;
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
    const s = o === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), u = this._getRuler(), { sharedOptions: g, includeOptions: h } = this._getSharedOptions(a, o);
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
      h && (k.options = g || this.resolveDataElementOptions(b, t[b].active ? "active" : o));
      const _ = k.options || t[b].options;
      xd(k, _, y, i), _d(k, _, u.ratio), this.updateElement(t[b], b, k, o);
    }
  }
  _getStacks(t, a) {
    const { iScale: n } = this._cachedMeta, o = n.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), s = n.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(a), r = l && l[n.axis], c = (u) => {
      const g = u._parsed.find((b) => b[n.axis] === r), h = g && g[u.vScale.axis];
      if (Pe(h) || isNaN(h))
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
      t[Ae(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, a)] = !0;
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
      min: l || gd(a),
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
    let g = r[a.axis], h = 0, b = n ? this.applyStack(a, r, n) : g, m, v;
    b !== g && (h = b - g, b = g), u && (g = c.barStart, b = c.barEnd - c.barStart, g !== 0 && Pt(g) !== Pt(c.barEnd) && (h = 0), h += g);
    const p = !Pe(s) && !u ? s : h;
    let y = a.getPixelForValue(p);
    if (this.chart.getDataVisibility(t) ? m = a.getPixelForValue(h + b) : m = y, v = m - y, Math.abs(v) < i) {
      v = vd(v, a, l) * i, g === l && (y -= v / 2);
      const k = a.getPixelForDecimal(0), _ = a.getPixelForDecimal(1), w = Math.min(k, _), $ = Math.max(k, _);
      y = Math.max(Math.min(y, $), w), m = y + v, n && !u && (r._stacks[a.axis]._visualValues[o] = a.getValueForPixel(m) - a.getValueForPixel(y));
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
    const n = a.scale, o = this.options, s = o.skipNull, i = Ae(o.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (a.grouped) {
      const u = s ? this._getStackCount(t) : a.stackCount, g = o.barThickness === "flex" ? pd(t, a, o, u * c) : md(t, a, o, u * c), h = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, b = this._getAxis().indexOf(Ae(h, this.getFirstScaleIdForIndexAxis())), m = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + b;
      l = g.start + g.chunk * m + g.chunk / 2, r = Math.min(i, g.chunk * g.ratio);
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
function Cd(e, t, a) {
  let n = 1, o = 1, s = 0, i = 0;
  if (t < Ue) {
    const l = e, r = l + t, c = Math.cos(l), u = Math.sin(l), g = Math.cos(r), h = Math.sin(r), b = (_, w, $) => Xa(_, l, r, !0) ? 1 : Math.max(w, w * a, $, $ * a), m = (_, w, $) => Xa(_, l, r, !0) ? -1 : Math.min(w, w * a, $, $ * a), v = b(0, c, g), p = b(Ze, u, h), y = m(Fe, c, g), k = m(Fe + Ze, u, h);
    n = (v - y) / 2, o = (p - k) / 2, s = -(v + y) / 2, i = -(p + k) / 2;
  }
  return {
    ratioX: n,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class $d extends En {
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
              const g = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: r,
                fillStyle: g.backgroundColor,
                fontColor: s,
                hidden: !t.getDataVisibility(c),
                lineDash: g.borderDash,
                lineDashOffset: g.borderDashOffset,
                lineJoin: g.borderJoinStyle,
                lineWidth: g.borderWidth,
                strokeStyle: g.borderColor,
                textAlign: o,
                pointStyle: n,
                borderRadius: i && (l || g.borderRadius),
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
      if (Le(n[t])) {
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
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(n.width, n.height) - i) / 2, 0), r = Math.min(Dr(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: g } = this._getRotationExtents(), { ratioX: h, ratioY: b, offsetX: m, offsetY: v } = Cd(g, u, r), p = (n.width - i) / h, y = (n.height - i) / b, k = Math.max(Math.min(p, y) / 2, 0), _ = Li(this.options.radius, k), w = Math.max(_ * r, 0), $ = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = m * _, this.offsetY = v * _, o.total = this.calculateTotal(), this.outerRadius = _ - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ue);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, u = (l.left + l.right) / 2, g = (l.top + l.bottom) / 2, h = s && c.animateScale, b = h ? 0 : this.innerRadius, m = h ? 0 : this.outerRadius, { sharedOptions: v, includeOptions: p } = this._getSharedOptions(a, o);
    let y = this._getRotation(), k;
    for (k = 0; k < a; ++k)
      y += this._circumference(k, s);
    for (k = a; k < a + n; ++k) {
      const _ = this._circumference(k, s), w = t[k], $ = {
        x: u + this.offsetX,
        y: g + this.offsetY,
        startAngle: y,
        endAngle: y + _,
        circumference: _,
        outerRadius: m,
        innerRadius: b
      };
      p && ($.options = v || this.resolveDataElementOptions(k, w.active ? "active" : o)), y += _, this.updateElement(w, k, $, o);
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
    const a = this._cachedMeta, n = this.chart, o = n.data.labels || [], s = wo(a._parsed[t], n.options.locale);
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
    return Math.max(Ae(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Sd extends En {
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
    let { start: l, count: r } = qr(a, o, i);
    this._drawStart = l, this._drawCount = r, Xr(a) && (l = 0, r = o.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!s._decimated, n.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, l, r, t);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: g } = this._getSharedOptions(a, o), h = i.axis, b = l.axis, { spanGaps: m, segment: v } = this.options, p = qa(m) ? m : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || s || o === "none", k = a + n, _ = t.length;
    let w = a > 0 && this.getParsed(a - 1);
    for (let $ = 0; $ < _; ++$) {
      const D = t[$], M = y ? D : {};
      if ($ < a || $ >= k) {
        M.skip = !0;
        continue;
      }
      const O = this.getParsed($), N = Pe(O[b]), W = M[h] = i.getPixelForValue(O[h], $), S = M[b] = s || N ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, O, r) : O[b], $);
      M.skip = isNaN(W) || isNaN(S) || N, M.stop = $ > 0 && Math.abs(O[h] - w[h]) > p, v && (M.parsed = O, M.raw = c.data[$]), g && (M.options = u || this.resolveDataElementOptions($, D.active ? "active" : o)), y || this.updateElement(D, $, M, o), w = O;
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
class Md extends $d {
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
class Lo {
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
    Object.assign(Lo.prototype, t);
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
var Dd = {
  _date: Lo
};
function Ad(e, t, a, n) {
  const { controller: o, data: s, _sorted: i } = e, l = o._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && s.length) {
    const c = l._reversePixels ? Hr : ua;
    if (n) {
      if (o._sharedOptions) {
        const u = s[0], g = typeof u.getRange == "function" && u.getRange(t);
        if (g) {
          const h = c(s, t, a - g), b = c(s, t, a + g);
          return {
            lo: h.lo,
            hi: b.hi
          };
        }
      }
    } else {
      const u = c(s, t, a);
      if (r) {
        const { vScale: g } = o._cachedMeta, { _parsed: h } = e, b = h.slice(0, u.lo + 1).reverse().findIndex((v) => !Pe(v[g.axis]));
        u.lo -= Math.max(0, b);
        const m = h.slice(u.hi).findIndex((v) => !Pe(v[g.axis]));
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
    const { index: c, data: u } = s[l], { lo: g, hi: h } = Ad(s[l], t, i, o);
    for (let b = g; b <= h; ++b) {
      const m = u[b];
      m.skip || n(m, c, b);
    }
  }
}
function Td(e) {
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
function Bd(e, t, a, n) {
  let o = [];
  function s(i, l, r) {
    const { startAngle: c, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: g } = Pi(i, {
      x: t.x,
      y: t.y
    });
    Xa(g, c, u) && o.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return On(e, a, t, s), o;
}
function Ld(e, t, a, n, o, s) {
  let i = [];
  const l = Td(a);
  let r = Number.POSITIVE_INFINITY;
  function c(u, g, h) {
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
        datasetIndex: g,
        index: h
      }
    ], r = p) : p === r && i.push({
      element: u,
      datasetIndex: g,
      index: h
    });
  }
  return On(e, a, t, c), i;
}
function Xn(e, t, a, n, o, s) {
  return !s && !e.isPointInArea(t) ? [] : a === "r" && !n ? Bd(e, t, a, o) : Ld(e, t, a, n, o, s);
}
function _s(e, t, a, n, o) {
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
var Rd = {
  modes: {
    index(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "x", i = a.includeInvisible || !1, l = a.intersect ? qn(e, o, s, n, i) : Xn(e, o, s, !1, n, i), r = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const u = l[0].index, g = c.data[u];
        g && !g.skip && r.push({
          element: g,
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
      return _s(e, o, "x", a.intersect, n);
    },
    y(e, t, a, n) {
      const o = ca(t, e);
      return _s(e, o, "y", a.intersect, n);
    }
  }
};
const el = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ba(e, t) {
  return e.filter((a) => a.pos === t);
}
function ws(e, t) {
  return e.filter((a) => el.indexOf(a.pos) === -1 && a.box.axis === t);
}
function La(e, t) {
  return e.sort((a, n) => {
    const o = t ? n : a, s = t ? a : n;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function Id(e) {
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
function Pd(e) {
  const t = {};
  for (const a of e) {
    const { stack: n, pos: o, stackWeight: s } = a;
    if (!n || !el.includes(o))
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
function Ed(e, t) {
  const a = Pd(e), { vBoxMaxWidth: n, hBoxMaxHeight: o } = t;
  let s, i, l;
  for (s = 0, i = e.length; s < i; ++s) {
    l = e[s];
    const { fullSize: r } = l.box, c = a[l.stack], u = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = u ? u * n : r && t.availableWidth, l.height = o) : (l.width = n, l.height = u ? u * o : r && t.availableHeight);
  }
  return a;
}
function Od(e) {
  const t = Id(e), a = La(t.filter((c) => c.box.fullSize), !0), n = La(Ba(t, "left"), !0), o = La(Ba(t, "right")), s = La(Ba(t, "top"), !0), i = La(Ba(t, "bottom")), l = ws(t, "x"), r = ws(t, "y");
  return {
    fullSize: a,
    leftAndTop: n.concat(s),
    rightAndBottom: o.concat(r).concat(i).concat(l),
    chartArea: Ba(t, "chartArea"),
    vertical: n.concat(o).concat(r),
    horizontal: s.concat(i).concat(l)
  };
}
function Cs(e, t, a, n) {
  return Math.max(e[a], t[a]) + Math.max(e[n], t[n]);
}
function tl(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Fd(e, t, a, n) {
  const { pos: o, box: s } = a, i = e.maxPadding;
  if (!Le(o)) {
    a.size && (e[o] -= a.size);
    const g = n[a.stack] || {
      size: 0,
      count: 1
    };
    g.size = Math.max(g.size, a.horizontal ? s.height : s.width), a.size = g.size / g.count, e[o] += a.size;
  }
  s.getPadding && tl(i, s.getPadding());
  const l = Math.max(0, t.outerWidth - Cs(i, e, "left", "right")), r = Math.max(0, t.outerHeight - Cs(i, e, "top", "bottom")), c = l !== e.w, u = r !== e.h;
  return e.w = l, e.h = r, a.horizontal ? {
    same: c,
    other: u
  } : {
    same: u,
    other: c
  };
}
function Vd(e) {
  const t = e.maxPadding;
  function a(n) {
    const o = Math.max(t[n] - e[n], 0);
    return e[n] += o, o;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Nd(e, t) {
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
    l = e[s], r = l.box, r.update(l.width || t.w, l.height || t.h, Nd(l.horizontal, t));
    const { same: g, other: h } = Fd(t, a, l, n);
    c |= g && o.length, u = u || h, r.fullSize || o.push(l);
  }
  return c && Va(o, t, a, n) || u;
}
function fn(e, t, a, n, o) {
  e.top = a, e.left = t, e.right = t + n, e.bottom = a + o, e.width = n, e.height = o;
}
function $s(e, t, a, n) {
  const o = a.padding;
  let { x: s, y: i } = t;
  for (const l of e) {
    const r = l.box, c = n[l.stack] || {
      placed: 0,
      weight: 1
    }, u = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const g = t.w * u, h = c.size || r.height;
      Ya(c.start) && (i = c.start), r.fullSize ? fn(r, o.left, i, a.outerWidth - o.right - o.left, h) : fn(r, t.left + c.placed, i, g, h), c.start = i, c.placed += g, i = r.bottom;
    } else {
      const g = t.h * u, h = c.size || r.width;
      Ya(c.start) && (s = c.start), r.fullSize ? fn(r, s, o.top, h, a.outerHeight - o.bottom - o.top) : fn(r, s, t.top + c.placed, h, g), c.start = s, c.placed += g, s = r.right;
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
    const o = Ct(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(a - o.height, 0), l = Od(e.boxes), r = l.vertical, c = l.horizontal;
    Ee(e.boxes, (v) => {
      typeof v.beforeLayout == "function" && v.beforeLayout();
    });
    const u = r.reduce((v, p) => p.box.options && p.box.options.display === !1 ? v : v + 1, 0) || 1, g = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / u,
      hBoxMaxHeight: i / 2
    }), h = Object.assign({}, o);
    tl(h, Ct(n));
    const b = Object.assign({
      maxPadding: h,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), m = Ed(r.concat(c), g);
    Va(l.fullSize, b, g, m), Va(r, b, g, m), Va(c, b, g, m) && Va(r, b, g, m), Vd(b), $s(l.leftAndTop, b, g, m), b.x += b.w, b.y += b.h, $s(l.rightAndBottom, b, g, m), e.chartArea = {
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
class al {
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
class zd extends al {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const wn = "$chartjs", jd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Ss = (e) => e === null || e === "";
function Hd(e, t) {
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
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", Ss(o)) {
    const s = cs(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (Ss(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = cs(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const nl = Fc ? {
  passive: !0
} : !1;
function Wd(e, t, a) {
  e && e.addEventListener(t, a, nl);
}
function Kd(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, nl);
}
function Ud(e, t) {
  const a = jd[e.type] || e.type, { x: n, y: o } = ca(e, t);
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
function Yd(e, t, a) {
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
function qd(e, t, a) {
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
let Ms = 0;
function ol() {
  const e = window.devicePixelRatio;
  e !== Ms && (Ms = e, Qa.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Xd(e, t) {
  Qa.size || window.addEventListener("resize", ol), Qa.set(e, t);
}
function Gd(e) {
  Qa.delete(e), Qa.size || window.removeEventListener("resize", ol);
}
function Zd(e, t, a) {
  const n = e.canvas, o = n && Bo(n);
  if (!o)
    return;
  const s = Vi((l, r) => {
    const c = o.clientWidth;
    a(l, r), c < o.clientWidth && a();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, u = r.contentRect.height;
    c === 0 && u === 0 || s(c, u);
  });
  return i.observe(o), Xd(e, s), i;
}
function Gn(e, t, a) {
  a && a.disconnect(), t === "resize" && Gd(e);
}
function Qd(e, t, a) {
  const n = e.canvas, o = Vi((s) => {
    e.ctx !== null && a(Ud(s, e));
  }, e);
  return Wd(n, t, o), o;
}
class Jd extends al {
  acquireContext(t, a) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (Hd(t, a), n) : null;
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
      attach: Yd,
      detach: qd,
      resize: Zd
    }[a] || Qd;
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
    }[a] || Kd)(t, a, o), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, o) {
    return Oc(t, a, n, o);
  }
  isAttached(t) {
    const a = t && Bo(t);
    return !!(a && a.isConnected);
  }
}
function eu(e) {
  return !To() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? zd : Jd;
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
function tu(e, t) {
  const a = e.options.ticks, n = au(e), o = Math.min(a.maxTicksLimit || n, n), s = a.major.enabled ? ou(t) : [], i = s.length, l = s[0], r = s[i - 1], c = [];
  if (i > o)
    return su(t, c, s, i / o), c;
  const u = nu(s, t, o);
  if (i > 0) {
    let g, h;
    const b = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (gn(t, c, u, Pe(b) ? 0 : l - b, l), g = 0, h = i - 1; g < h; g++)
      gn(t, c, u, s[g], s[g + 1]);
    return gn(t, c, u, r, Pe(b) ? t.length : r + b), c;
  }
  return gn(t, c, u), c;
}
function au(e) {
  const t = e.options.offset, a = e._tickSize(), n = e._length / a + (t ? 0 : 1), o = e._maxLength / a;
  return Math.floor(Math.min(n, o));
}
function nu(e, t, a) {
  const n = iu(e), o = t.length / a;
  if (!n)
    return Math.max(o, 1);
  const s = Er(n);
  for (let i = 0, l = s.length - 1; i < l; i++) {
    const r = s[i];
    if (r > o)
      return r;
  }
  return Math.max(o, 1);
}
function ou(e) {
  const t = [];
  let a, n;
  for (a = 0, n = e.length; a < n; a++)
    e[a].major && t.push(a);
  return t;
}
function su(e, t, a, n) {
  let o = 0, s = a[0], i;
  for (n = Math.ceil(n), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = a[o * n]);
}
function gn(e, t, a, n, o) {
  const s = Ae(n, 0), i = Math.min(Ae(o, e.length), e.length);
  let l = 0, r, c, u;
  for (a = Math.ceil(a), o && (r = o - n, a = r / Math.floor(r / a)), u = s; u < 0; )
    l++, u = Math.round(s + l * a);
  for (c = Math.max(s, 0); c < i; c++)
    c === u && (t.push(e[c]), l++, u = Math.round(s + l * a));
}
function iu(e) {
  const t = e.length;
  let a, n;
  if (t < 2)
    return !1;
  for (n = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== n)
      return !1;
  return n;
}
const lu = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Ds = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, As = (e, t) => Math.min(t || e, e);
function Ts(e, t) {
  const a = [], n = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += n)
    a.push(e[Math.floor(s)]);
  return a;
}
function ru(e, t, a) {
  const n = e.ticks.length, o = Math.min(t, n - 1), s = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(o), c;
  if (!(a && (n === 1 ? c = Math.max(r - s, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(o - 1)) / 2, r += o < t ? c : -c, r < s - l || r > i + l)))
    return r;
}
function cu(e, t) {
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
function Bs(e, t) {
  if (!e.display)
    return 0;
  const a = lt(e.font, t), n = Ct(e.padding);
  return (Ge(e.text) ? e.text.length : 1) * a.lineHeight + n.height;
}
function du(e, t) {
  return ma(e, {
    scale: t,
    type: "scale"
  });
}
function uu(e, t, a) {
  return ma(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function hu(e, t, a) {
  let n = ko(e);
  return (a && t !== "right" || !a && t === "right") && (n = lu(n)), n;
}
function fu(e, t, a, n) {
  const { top: o, left: s, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: u } = r;
  let g = 0, h, b, m;
  const v = i - o, p = l - s;
  if (e.isHorizontal()) {
    if (b = nt(n, s, l), Le(a)) {
      const y = Object.keys(a)[0], k = a[y];
      m = u[y].getPixelForValue(k) + v - t;
    } else a === "center" ? m = (c.bottom + c.top) / 2 + v - t : m = Ds(e, a, t);
    h = l - s;
  } else {
    if (Le(a)) {
      const y = Object.keys(a)[0], k = a[y];
      b = u[y].getPixelForValue(k) - p + t;
    } else a === "center" ? b = (c.left + c.right) / 2 - p + t : b = Ds(e, a, t);
    m = nt(n, i, o), g = a === "left" ? -Ze : Ze;
  }
  return {
    titleX: b,
    titleY: m,
    maxWidth: h,
    rotation: g
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
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = mc(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? Ts(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = tu(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    const t = this.options, a = t.ticks, n = As(this.ticks.length, t.ticks.maxTicksLimit), o = a.minRotation || 0, s = a.maxRotation;
    let i = o, l, r, c;
    if (!this._isVisible() || !a.display || o >= s || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const u = this._getLabelSizes(), g = u.widest.width, h = u.highest.height, b = it(this.chart.width - g, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / n : b / (n - 1), g + 6 > l && (l = b / (n - (t.offset ? 0.5 : 1)), r = this.maxHeight - Ra(t.grid) - a.padding - Bs(t.title, this.chart.options.font), c = Math.sqrt(g * g + h * h), i = Nr(Math.min(Math.asin(it((u.highest.height + 6) / l, -1, 1)), Math.asin(it(r / c, -1, 1)) - Math.asin(it(h / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
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
      const r = Bs(o, a.options.font);
      if (l ? (t.width = this.maxWidth, t.height = Ra(s) + r) : (t.height = this.maxHeight, t.width = Ra(s) + r), n.display && this.ticks.length) {
        const { first: c, last: u, widest: g, highest: h } = this._getLabelSizes(), b = n.padding * 2, m = zt(this.labelRotation), v = Math.cos(m), p = Math.sin(m);
        if (l) {
          const y = n.mirror ? 0 : p * g.width + v * h.height;
          t.height = Math.min(this.maxHeight, t.height + y + b);
        } else {
          const y = n.mirror ? 0 : v * g.width + p * h.height;
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
      const u = this.getPixelForTick(0) - this.left, g = this.right - this.getPixelForTick(this.ticks.length - 1);
      let h = 0, b = 0;
      r ? c ? (h = o * t.width, b = n * a.height) : (h = n * t.height, b = o * a.width) : s === "start" ? b = a.width : s === "end" ? h = t.width : s !== "inner" && (h = t.width / 2, b = a.width / 2), this.paddingLeft = Math.max((h - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((b - g + i) * this.width / (this.width - g), 0);
    } else {
      let u = a.height / 2, g = t.height / 2;
      s === "start" ? (u = 0, g = t.height) : s === "end" && (u = a.height, g = 0), this.paddingTop = u + i, this.paddingBottom = g + i;
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
      a < n.length && (n = Ts(n, a)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, n) {
    const { ctx: o, _longestTextCache: s } = this, i = [], l = [], r = Math.floor(a / As(a, n));
    let c = 0, u = 0, g, h, b, m, v, p, y, k, _, w, $;
    for (g = 0; g < a; g += r) {
      if (m = t[g].label, v = this._resolveTickFontOptions(g), o.font = p = v.string, y = s[p] = s[p] || {
        data: {},
        gc: []
      }, k = v.lineHeight, _ = w = 0, !Pe(m) && !Ge(m))
        _ = os(o, y.data, y.gc, _, m), w = k;
      else if (Ge(m))
        for (h = 0, b = m.length; h < b; ++h)
          $ = m[h], !Pe($) && !Ge($) && (_ = os(o, y.data, y.gc, _, $), w += k);
      i.push(_), l.push(w), c = Math.max(_, c), u = Math.max(w, u);
    }
    cu(s, a);
    const D = i.indexOf(c), M = l.indexOf(u), O = (N) => ({
      width: i[N] || 0,
      height: l[N] || 0
    });
    return {
      first: O(0),
      last: O(a - 1),
      widest: O(D),
      highest: O(M),
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
    return jr(this._alignToPixels ? ia(this.chart, a, 0) : a);
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
      return n.$context || (n.$context = uu(this.getContext(), t, n));
    }
    return this.$context || (this.$context = du(this.chart.getContext(), this));
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
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: l } = o, r = s.offset, c = this.isHorizontal(), g = this.ticks.length + (r ? 1 : 0), h = Ra(s), b = [], m = l.setContext(this.getContext()), v = m.display ? m.width : 0, p = v / 2, y = function(Q) {
      return ia(n, Q, v);
    };
    let k, _, w, $, D, M, O, N, W, S, L, T;
    if (i === "top")
      k = y(this.bottom), M = this.bottom - h, N = k - p, S = y(t.top) + p, T = t.bottom;
    else if (i === "bottom")
      k = y(this.top), S = t.top, T = y(t.bottom) - p, M = k + p, N = this.top + h;
    else if (i === "left")
      k = y(this.right), D = this.right - h, O = k - p, W = y(t.left) + p, L = t.right;
    else if (i === "right")
      k = y(this.left), W = t.left, L = y(t.right) - p, D = k + p, O = this.left + h;
    else if (a === "x") {
      if (i === "center")
        k = y((t.top + t.bottom) / 2 + 0.5);
      else if (Le(i)) {
        const Q = Object.keys(i)[0], re = i[Q];
        k = y(this.chart.scales[Q].getPixelForValue(re));
      }
      S = t.top, T = t.bottom, M = k + p, N = M + h;
    } else if (a === "y") {
      if (i === "center")
        k = y((t.left + t.right) / 2);
      else if (Le(i)) {
        const Q = Object.keys(i)[0], re = i[Q];
        k = y(this.chart.scales[Q].getPixelForValue(re));
      }
      D = k - p, O = D - h, W = t.left, L = t.right;
    }
    const j = Ae(o.ticks.maxTicksLimit, g), H = Math.max(1, Math.ceil(g / j));
    for (_ = 0; _ < g; _ += H) {
      const Q = this.getContext(_), re = s.setContext(Q), ue = l.setContext(Q), q = re.lineWidth, oe = re.color, R = ue.dash || [], U = ue.dashOffset, Y = re.tickWidth, V = re.tickColor, le = re.tickBorderDash || [], ce = re.tickBorderDashOffset;
      w = ru(this, _, r), w !== void 0 && ($ = ia(n, w, q), c ? D = O = W = L = $ : M = N = S = T = $, b.push({
        tx1: D,
        ty1: M,
        tx2: O,
        ty2: N,
        x1: W,
        y1: S,
        x2: L,
        y2: T,
        width: q,
        color: oe,
        borderDash: R,
        borderDashOffset: U,
        tickWidth: Y,
        tickColor: V,
        tickBorderDash: le,
        tickBorderDashOffset: ce
      }));
    }
    return this._ticksLength = g, this._borderValue = k, b;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: u, mirror: g } = s, h = Ra(n.grid), b = h + u, m = g ? -u : b, v = -zt(this.labelRotation), p = [];
    let y, k, _, w, $, D, M, O, N, W, S, L, T = "middle";
    if (o === "top")
      D = this.bottom - m, M = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      D = this.top + m, M = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const H = this._getYAxisLabelAlignment(h);
      M = H.textAlign, $ = H.x;
    } else if (o === "right") {
      const H = this._getYAxisLabelAlignment(h);
      M = H.textAlign, $ = H.x;
    } else if (a === "x") {
      if (o === "center")
        D = (t.top + t.bottom) / 2 + b;
      else if (Le(o)) {
        const H = Object.keys(o)[0], Q = o[H];
        D = this.chart.scales[H].getPixelForValue(Q) + b;
      }
      M = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - b;
      else if (Le(o)) {
        const H = Object.keys(o)[0], Q = o[H];
        $ = this.chart.scales[H].getPixelForValue(Q);
      }
      M = this._getYAxisLabelAlignment(h).textAlign;
    }
    a === "y" && (r === "start" ? T = "top" : r === "end" && (T = "bottom"));
    const j = this._getLabelSizes();
    for (y = 0, k = l.length; y < k; ++y) {
      _ = l[y], w = _.label;
      const H = s.setContext(this.getContext(y));
      O = this.getPixelForTick(y) + s.labelOffset, N = this._resolveTickFontOptions(y), W = N.lineHeight, S = Ge(w) ? w.length : 1;
      const Q = S / 2, re = H.color, ue = H.textStrokeColor, q = H.textStrokeWidth;
      let oe = M;
      i ? ($ = O, M === "inner" && (y === k - 1 ? oe = this.options.reverse ? "left" : "right" : y === 0 ? oe = this.options.reverse ? "right" : "left" : oe = "center"), o === "top" ? c === "near" || v !== 0 ? L = -S * W + W / 2 : c === "center" ? L = -j.highest.height / 2 - Q * W + W : L = -j.highest.height + W / 2 : c === "near" || v !== 0 ? L = W / 2 : c === "center" ? L = j.highest.height / 2 - Q * W : L = j.highest.height - S * W, g && (L *= -1), v !== 0 && !H.showLabelBackdrop && ($ += W / 2 * Math.sin(v))) : (D = O, L = (1 - S) * W / 2);
      let R;
      if (H.showLabelBackdrop) {
        const U = Ct(H.backdropPadding), Y = j.heights[y], V = j.widths[y];
        let le = L - U.top, ce = 0 - U.left;
        switch (T) {
          case "middle":
            le -= Y / 2;
            break;
          case "bottom":
            le -= Y;
            break;
        }
        switch (M) {
          case "center":
            ce -= V / 2;
            break;
          case "right":
            ce -= V;
            break;
          case "inner":
            y === k - 1 ? ce -= V : y > 0 && (ce -= V / 2);
            break;
        }
        R = {
          left: ce,
          top: le,
          width: V + U.width,
          height: Y + U.height,
          color: H.backdropColor
        };
      }
      p.push({
        label: w,
        font: N,
        textOffset: L,
        options: {
          rotation: v,
          color: re,
          strokeColor: ue,
          strokeWidth: q,
          textAlign: oe,
          textBaseline: T,
          translation: [
            $,
            D
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
    let c, u, g, h;
    this.isHorizontal() ? (c = ia(t, this.left, i) - i / 2, u = ia(t, this.right, l) + l / 2, g = h = r) : (g = ia(t, this.top, i) - i / 2, h = ia(t, this.bottom, l) + l / 2, c = u = r), a.save(), a.lineWidth = s.width, a.strokeStyle = s.color, a.beginPath(), a.moveTo(c, g), a.lineTo(u, h), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, o = this._computeLabelArea();
    o && Co(n, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const l = i.options, r = i.font, c = i.label, u = i.textOffset;
      Za(n, c, 0, u, r, l);
    }
    o && $o(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: n, reverse: o } } = this;
    if (!n.display)
      return;
    const s = lt(n.font), i = Ct(n.padding), l = n.align;
    let r = s.lineHeight / 2;
    a === "bottom" || a === "center" || Le(a) ? (r += i.bottom, Ge(n.text) && (r += s.lineHeight * (n.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: u, maxWidth: g, rotation: h } = fu(this, r, a, l);
    Za(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: g,
      rotation: h,
      textAlign: hu(l, a, o),
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
    const t = this.options, a = t.ticks && t.ticks.z || 0, n = Ae(t.grid && t.grid.z, -1), o = Ae(t.border && t.border.z, 0);
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
    pu(a) && (n = this.register(a));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, gu(t, i, n), this.override && Ye.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, n = t.id, o = this.scope;
    n in a && delete a[n], o && n in Ye[o] && (delete Ye[o][n], this.override && delete ga[n]);
  }
}
function gu(e, t, a) {
  const n = Ua(/* @__PURE__ */ Object.create(null), [
    a ? Ye.get(a) : {},
    Ye.get(t),
    e.defaults
  ]);
  Ye.set(t, n), e.defaultRoutes && mu(t, e.defaultRoutes), e.descriptors && Ye.describe(t, e.descriptors);
}
function mu(e, t) {
  Object.keys(t).forEach((a) => {
    const n = a.split("."), o = n.pop(), s = [
      e
    ].concat(n).join("."), i = t[a].split("."), l = i.pop(), r = i.join(".");
    Ye.route(s, o, r, l);
  });
}
function pu(e) {
  return "id" in e && "defaults" in e;
}
class bu {
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
    const o = yo(t);
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
var Rt = /* @__PURE__ */ new bu();
class vu {
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
    const n = t && t.config, o = Ae(n.options && n.options.plugins, {}), s = yu(n);
    return o === !1 && !a ? [] : ku(t, s, o, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], n = this._cache, o = (s, i) => s.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(o(a, n), t, "stop"), this._notify(o(n, a), t, "start");
  }
}
function yu(e) {
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
function xu(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function ku(e, { plugins: t, localIds: a }, n, o) {
  const s = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = xu(n[r], o);
    c !== null && s.push({
      plugin: l,
      options: _u(e.config, {
        plugin: l,
        local: a[r]
      }, c, i)
    });
  }
  return s;
}
function _u(e, { plugin: t, local: a }, n, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(n, s);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function ro(e, t) {
  const a = Ye.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function wu(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function Cu(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Ls(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function $u(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function co(e, ...t) {
  if (Ls(e))
    return e;
  for (const a of t) {
    const n = a.axis || $u(a.position) || e.length > 1 && Ls(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Rs(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Su(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (a.length)
      return Rs(e, "x", a[0]) || Rs(e, "y", a[0]);
  }
  return {};
}
function Mu(e, t) {
  const a = ga[e.type] || {
    scales: {}
  }, n = t.scales || {}, o = ro(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const l = n[i];
    if (!Le(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = co(i, l, Su(i, e), Ye.scales[l.type]), c = Cu(r, o), u = a.scales || {};
    s[i] = za(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      u[r],
      u[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || ro(l, t), u = (ga[l] || {}).scales || {};
    Object.keys(u).forEach((g) => {
      const h = wu(g, r), b = i[h + "AxisID"] || h;
      s[b] = s[b] || /* @__PURE__ */ Object.create(null), za(s[b], [
        {
          axis: h
        },
        n[b],
        u[g]
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
function sl(e) {
  const t = e.options || (e.options = {});
  t.plugins = Ae(t.plugins, {}), t.scales = Mu(e, t);
}
function il(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Du(e) {
  return e = e || {}, e.data = il(e.data), sl(e), e;
}
const Is = /* @__PURE__ */ new Map(), ll = /* @__PURE__ */ new Set();
function pn(e, t) {
  let a = Is.get(e);
  return a || (a = t(), Is.set(e, a), ll.add(a)), a;
}
const Ia = (e, t, a) => {
  const n = fa(t, a);
  n !== void 0 && e.add(n);
};
class Au {
  constructor(t) {
    this._config = Du(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = il(t);
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
    this.clearCache(), sl(t);
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
      t && (r.add(t), u.forEach((g) => Ia(r, t, g))), u.forEach((g) => Ia(r, o, g)), u.forEach((g) => Ia(r, ga[s] || {}, g)), u.forEach((g) => Ia(r, Ye, g)), u.forEach((g) => Ia(r, io, g));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), ll.has(a) && i.set(a, c), c;
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
      io
    ];
  }
  resolveNamedOptions(t, a, n, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = Ps(this._resolverCache, t, o);
    let r = i;
    if (Bu(i, a)) {
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
    const { resolver: s } = Ps(this._resolverCache, t, n);
    return Le(a) ? Sa(s, a, void 0, o) : s;
  }
}
function Ps(e, t, a) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const o = a.join();
  let s = n.get(o);
  return s || (s = {
    resolver: Mo(t, a),
    subPrefixes: a.filter((l) => !l.toLowerCase().includes("hover"))
  }, n.set(o, s)), s;
}
const Tu = (e) => Le(e) && Object.getOwnPropertyNames(e).some((t) => ta(e[t]));
function Bu(e, t) {
  const { isScriptable: a, isIndexable: n } = Hi(e);
  for (const o of t) {
    const s = a(o), i = n(o), l = (i || s) && e[o];
    if (s && (ta(l) || Tu(l)) || i && Ge(l))
      return !0;
  }
  return !1;
}
var Lu = "4.5.1";
const Ru = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Es(e, t) {
  return e === "top" || e === "bottom" || Ru.indexOf(e) === -1 && t === "x";
}
function Os(e, t) {
  return function(a, n) {
    return a[e] === n[e] ? a[t] - n[t] : a[e] - n[e];
  };
}
function Fs(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), je(a && a.onComplete, [
    e
  ], t);
}
function Iu(e) {
  const t = e.chart, a = t.options.animation;
  je(a && a.onProgress, [
    e
  ], t);
}
function rl(e) {
  return To() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Cn = {}, Vs = (e) => {
  const t = rl(e);
  return Object.values(Cn).filter((a) => a.canvas === t).pop();
};
function Pu(e, t, a) {
  const n = Object.keys(e);
  for (const o of n) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (a > 0 || s > t) && (e[s + a] = i);
    }
  }
}
function Eu(e, t, a, n) {
  return !a || e.type === "mouseout" ? null : n ? t : e;
}
let aa = class {
  static defaults = Ye;
  static instances = Cn;
  static overrides = ga;
  static registry = Rt;
  static version = Lu;
  static getChart = Vs;
  static register(...t) {
    Rt.add(...t), Ns();
  }
  static unregister(...t) {
    Rt.remove(...t), Ns();
  }
  constructor(t, a) {
    const n = this.config = new Au(a), o = rl(t), s = Vs(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || eu(o))(), this.platform.updateConfig(n);
    const l = this.platform.acquireContext(o, i.aspectRatio), r = l && l.canvas, c = r && r.height, u = r && r.width;
    if (this.id = Mr(), this.ctx = l, this.canvas = r, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new vu(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Ur((g) => this.update(g), i.resizeDelay || 0), this._dataChanges = [], Cn[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Ft.listen(this, "complete", Fs), Ft.listen(this, "progress", Iu), this._initialize(), this.attached && this.update();
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
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : rs(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return ss(this.canvas, this.ctx), this;
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
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, rs(this, l, !0) && (this.notifyPlugins("resize", {
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
      const l = a[i], r = co(i, l), c = r === "r", u = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), Ee(s, (i) => {
      const l = i.options, r = l.id, c = co(r, l), u = Ae(l.type, i.dtype);
      (l.position === void 0 || Es(l.position, c) !== Es(i.dposition)) && (l.position = i.dposition), o[r] = !0;
      let g = null;
      if (r in n && n[r].type === u)
        g = n[r];
      else {
        const h = Rt.getScale(u);
        g = new h({
          id: r,
          type: u,
          ctx: this.ctx,
          chart: this
        }), n[g.id] = g;
      }
      g.init(l, t);
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
    this._sortedMetasets = t.slice(0).sort(Os("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = l, i.indexAxis = s.indexAxis || ro(l, this.options), i.order = s.order || 0, i.index = n, i.label = "" + s.label, i.visible = this.isDatasetVisible(n), i.controller)
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
      const { controller: g } = this.getDatasetMeta(c), h = !o && s.indexOf(g) === -1;
      g.buildOrUpdateElements(h), i = Math.max(+g.getMaxOverflow(), i);
    }
    i = this._minPadding = n.layout.autoPadding ? i : 0, this._updateLayout(i), o || Ee(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Os("z", "_idx"));
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
    (!Xo(a, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: n, start: o, count: s } of a) {
      const i = n === "_removeElements" ? -s : s;
      Pu(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, n = (s) => new Set(t.filter((i) => i[0] === s).map((i, l) => l + "," + i.splice(1).join(","))), o = n(0);
    for (let s = 1; s < a; s++)
      if (!Xo(o, n(s)))
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
    }) !== !1 && (Ft.has(this) ? this.attached && !Ft.running(this) && Ft.start(this) : (this.draw(), Fs({
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
    }, o = Qc(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (o && Co(a, o), t.controller.draw(), o && $o(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Ga(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, n, o) {
    const s = Rd.modes[a];
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
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), ss(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete Cn[this.id], this.notifyPlugins("afterDestroy");
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
    const o = this.options.hover, s = (r, c) => r.filter((u) => !c.some((g) => u.datasetIndex === g.datasetIndex && u.index === g.index)), i = s(a, t), l = n ? t : s(t, a);
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
    const { _active: o = [], options: s } = this, i = a, l = this._getActiveElements(t, o, n, i), r = Rr(t), c = Eu(t, this._lastEvent, n, r);
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
function Ns() {
  return Ee(aa.instances, (e) => e._plugins.invalidate());
}
function Ou(e, t, a) {
  const { startAngle: n, x: o, y: s, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: u } = r, g = Math.min(c / i, St(n - a));
  if (e.beginPath(), e.arc(o, s, i - c / 2, n + g / 2, a - g / 2), l > 0) {
    const h = Math.min(c / l, St(n - a));
    e.arc(o, s, l + c / 2, a - h / 2, n + h / 2, !0);
  } else {
    const h = Math.min(c / 2, i * St(n - a));
    if (u === "round")
      e.arc(o, s, h, a - Fe / 2, n + Fe / 2, !0);
    else if (u === "bevel") {
      const b = 2 * h * h, m = -b * Math.cos(a + Fe / 2) + o, v = -b * Math.sin(a + Fe / 2) + s, p = b * Math.cos(n + Fe / 2) + o, y = b * Math.sin(n + Fe / 2) + s;
      e.lineTo(m, v), e.lineTo(p, y);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Fu(e, t, a) {
  const { startAngle: n, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: r } = t;
  let c = o / l;
  e.beginPath(), e.arc(s, i, l, n - c, a + c), r > o ? (c = o / r, e.arc(s, i, r, a + c, n - c, !0)) : e.arc(s, i, o, a + Ze, n - Ze), e.closePath(), e.clip();
}
function Vu(e) {
  return So(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Nu(e, t, a, n) {
  const o = Vu(e.options.borderRadius), s = (a - t) / 2, i = Math.min(s, n * t / 2), l = (r) => {
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
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: u } = t, g = Math.max(t.outerRadius + n + a - c, 0), h = u > 0 ? u + n + a + c : 0;
  let b = 0;
  const m = o - r;
  if (n) {
    const H = u > 0 ? u - n : 0, Q = g > 0 ? g - n : 0, re = (H + Q) / 2, ue = re !== 0 ? m * re / (re + n) : m;
    b = (m - ue) / 2;
  }
  const v = Math.max(1e-3, m * g - a / Fe) / g, p = (m - v) / 2, y = r + p + b, k = o - p - b, { outerStart: _, outerEnd: w, innerStart: $, innerEnd: D } = Nu(t, h, g, k - y), M = g - _, O = g - w, N = y + _ / M, W = k - w / O, S = h + $, L = h + D, T = y + $ / S, j = k - D / L;
  if (e.beginPath(), s) {
    const H = (N + W) / 2;
    if (e.arc(i, l, g, N, H), e.arc(i, l, g, H, W), w > 0) {
      const q = va(O, W, i, l);
      e.arc(q.x, q.y, w, W, k + Ze);
    }
    const Q = va(L, k, i, l);
    if (e.lineTo(Q.x, Q.y), D > 0) {
      const q = va(L, j, i, l);
      e.arc(q.x, q.y, D, k + Ze, j + Math.PI);
    }
    const re = (k - D / h + (y + $ / h)) / 2;
    if (e.arc(i, l, h, k - D / h, re, !0), e.arc(i, l, h, re, y + $ / h, !0), $ > 0) {
      const q = va(S, T, i, l);
      e.arc(q.x, q.y, $, T + Math.PI, y - Ze);
    }
    const ue = va(M, y, i, l);
    if (e.lineTo(ue.x, ue.y), _ > 0) {
      const q = va(M, N, i, l);
      e.arc(q.x, q.y, _, y - Ze, N);
    }
  } else {
    e.moveTo(i, l);
    const H = Math.cos(N) * g + i, Q = Math.sin(N) * g + l;
    e.lineTo(H, Q);
    const re = Math.cos(W) * g + i, ue = Math.sin(W) * g + l;
    e.lineTo(re, ue);
  }
  e.closePath();
}
function zu(e, t, a, n, o) {
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
function ju(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: u, borderDash: g, borderDashOffset: h, borderRadius: b } = r, m = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(g || []), e.lineDashOffset = h, m ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let v = t.endAngle;
  if (s) {
    Ln(e, t, a, n, v, o);
    for (let p = 0; p < s; ++p)
      e.stroke();
    isNaN(l) || (v = i + (l % Ue || Ue));
  }
  m && Fu(e, t, v), r.selfJoin && v - i >= Fe && b === 0 && u !== "miter" && Ou(e, t, v), s || (Ln(e, t, a, n, v, o), e.stroke());
}
class Hu extends Ut {
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
    ], n), { angle: s, distance: i } = Pi(o, {
      x: t,
      y: a
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: u, circumference: g } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), h = (this.options.spacing + this.options.borderWidth) / 2, b = Ae(g, r - l), m = Xa(s, l, r) && l !== r, v = b >= Ue || m, p = Zt(i, c + h, u + h);
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
    ], t), { offset: r, spacing: c } = this.options, u = (o + s) / 2, g = (i + l + c + r) / 2;
    return {
      x: a + Math.cos(u) * g,
      y: n + Math.sin(u) * g
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
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, zu(t, this, c, s, i), ju(t, this, c, s, i), t.restore();
  }
}
function cl(e, t, a = t) {
  e.lineCap = Ae(a.borderCapStyle, t.borderCapStyle), e.setLineDash(Ae(a.borderDash, t.borderDash)), e.lineDashOffset = Ae(a.borderDashOffset, t.borderDashOffset), e.lineJoin = Ae(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = Ae(a.borderWidth, t.borderWidth), e.strokeStyle = Ae(a.borderColor, t.borderColor);
}
function Wu(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Ku(e) {
  return e.stepped ? ic : e.tension || e.cubicInterpolationMode === "monotone" ? lc : Wu;
}
function dl(e, t, a = {}) {
  const n = e.length, { start: o = 0, end: s = n - 1 } = a, { start: i, end: l } = t, r = Math.max(o, i), c = Math.min(s, l), u = o < i && s < i || o > l && s > l;
  return {
    count: n,
    start: r,
    loop: t.loop,
    ilen: c < r && !u ? n + c - r : c - r
  };
}
function Uu(e, t, a, n) {
  const { points: o, options: s } = t, { count: i, start: l, loop: r, ilen: c } = dl(o, a, n), u = Ku(s);
  let { move: g = !0, reverse: h } = n || {}, b, m, v;
  for (b = 0; b <= c; ++b)
    m = o[(l + (h ? c - b : b)) % i], !m.skip && (g ? (e.moveTo(m.x, m.y), g = !1) : u(e, v, m, h, s.stepped), v = m);
  return r && (m = o[(l + (h ? c : 0)) % i], u(e, v, m, h, s.stepped)), !!r;
}
function Yu(e, t, a, n) {
  const o = t.points, { count: s, start: i, ilen: l } = dl(o, a, n), { move: r = !0, reverse: c } = n || {};
  let u = 0, g = 0, h, b, m, v, p, y;
  const k = (w) => (i + (c ? l - w : w)) % s, _ = () => {
    v !== p && (e.lineTo(u, p), e.lineTo(u, v), e.lineTo(u, y));
  };
  for (r && (b = o[k(0)], e.moveTo(b.x, b.y)), h = 0; h <= l; ++h) {
    if (b = o[k(h)], b.skip)
      continue;
    const w = b.x, $ = b.y, D = w | 0;
    D === m ? ($ < v ? v = $ : $ > p && (p = $), u = (g * u + w) / ++g) : (_(), e.lineTo(w, $), m = D, g = 0, v = p = $), y = $;
  }
  _();
}
function uo(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Yu : Uu;
}
function qu(e) {
  return e.stepped ? Vc : e.tension || e.cubicInterpolationMode === "monotone" ? Nc : da;
}
function Xu(e, t, a, n) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, a, n) && o.closePath()), cl(e, t.options), e.stroke(o);
}
function Gu(e, t, a, n) {
  const { segments: o, options: s } = t, i = uo(t);
  for (const l of o)
    cl(e, s, l.style), e.beginPath(), i(e, t, l, {
      start: a,
      end: a + n - 1
    }) && e.closePath(), e.stroke();
}
const Zu = typeof Path2D == "function";
function Qu(e, t, a, n) {
  Zu && !t.options.segment ? Xu(e, t, a, n) : Gu(e, t, a, n);
}
class Ju extends Ut {
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
      Bc(this._points, n, t, o, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = qc(this, this.options.segment));
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
    const n = this.options, o = t[a], s = this.points, i = Kc(this, {
      property: a,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], r = qu(n);
    let c, u;
    for (c = 0, u = i.length; c < u; ++c) {
      const { start: g, end: h } = i[c], b = s[g], m = s[h];
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
    return uo(this)(t, this, a, n);
  }
  path(t, a, n) {
    const o = this.segments, s = uo(this);
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
    (this.points || []).length && s.borderWidth && (t.save(), Qu(t, this, n, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function zs(e, t, a, n) {
  const o = e.options, { [a]: s } = e.getProps([
    a
  ], n);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class eh extends Ut {
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
    return zs(this, t, "x", a);
  }
  inYRange(t, a) {
    return zs(this, t, "y", a);
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
    this.skip || n.radius < 0.1 || !Ga(this, a, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, lo(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function ul(e, t) {
  const { x: a, y: n, base: o, width: s, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, r, c, u, g;
  return e.horizontal ? (g = i / 2, l = Math.min(a, o), r = Math.max(a, o), c = n - g, u = n + g) : (g = s / 2, l = a - g, r = a + g, c = Math.min(n, o), u = Math.max(n, o)), {
    left: l,
    top: c,
    right: r,
    bottom: u
  };
}
function Jt(e, t, a, n) {
  return e ? 0 : it(t, a, n);
}
function th(e, t, a) {
  const n = e.options.borderWidth, o = e.borderSkipped, s = ji(n);
  return {
    t: Jt(o.top, s.top, 0, a),
    r: Jt(o.right, s.right, 0, t),
    b: Jt(o.bottom, s.bottom, 0, a),
    l: Jt(o.left, s.left, 0, t)
  };
}
function ah(e, t, a) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = wa(o), i = Math.min(t, a), l = e.borderSkipped, r = n || Le(o);
  return {
    topLeft: Jt(!r || l.top || l.left, s.topLeft, 0, i),
    topRight: Jt(!r || l.top || l.right, s.topRight, 0, i),
    bottomLeft: Jt(!r || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: Jt(!r || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function nh(e) {
  const t = ul(e), a = t.right - t.left, n = t.bottom - t.top, o = th(e, a / 2, n / 2), s = ah(e, a / 2, n / 2);
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
  const o = t === null, s = a === null, l = e && !(o && s) && ul(e, n);
  return l && (o || Zt(t, l.left, l.right)) && (s || Zt(a, l.top, l.bottom));
}
function oh(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function sh(e, t) {
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
class ih extends Ut {
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
    const { inflateAmount: a, options: { borderColor: n, backgroundColor: o } } = this, { inner: s, outer: i } = nh(this), l = oh(i.radius) ? An : sh;
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
const js = (e, t) => {
  let { boxHeight: a = t, boxWidth: n = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, lh = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Hs extends Ut {
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
    const n = t.labels, o = lt(n.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = js(n, s);
    let c, u;
    a.font = o.string, this.isHorizontal() ? (c = this.maxWidth, u = this._fitRows(i, s, l, r) + 10) : (u = this.maxHeight, c = this._fitCols(i, o, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, n, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], u = o + l;
    let g = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let h = -1, b = -u;
    return this.legendItems.forEach((m, v) => {
      const p = n + a / 2 + s.measureText(m.text).width;
      (v === 0 || c[c.length - 1] + p + 2 * l > i) && (g += u, c[c.length - (v > 0 ? 0 : 1)] = 0, b += u, h++), r[v] = {
        left: 0,
        top: b,
        row: h,
        width: p,
        height: o
      }, c[c.length - 1] += p + l;
    }), g;
  }
  _fitCols(t, a, n, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let g = l, h = 0, b = 0, m = 0, v = 0;
    return this.legendItems.forEach((p, y) => {
      const { itemWidth: k, itemHeight: _ } = rh(n, a, s, p, o);
      y > 0 && b + _ + 2 * l > u && (g += h + l, c.push({
        width: h,
        height: b
      }), m += h + l, v++, h = b = 0), r[y] = {
        left: m,
        top: b,
        col: v,
        width: k,
        height: _
      }, h = Math.max(h, k), b += _ + l;
    }), g += h, c.push({
      width: h,
      height: b
    }), g;
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
      Co(t, this), this._draw(), $o(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: n, ctx: o } = this, { align: s, labels: i } = t, l = Ye.color, r = Ca(t.rtl, this.left, this.width), c = lt(i.font), { padding: u } = i, g = c.size, h = g / 2;
    let b;
    this.drawTitle(), o.textAlign = r.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: m, boxHeight: v, itemHeight: p } = js(i, g), y = function(D, M, O) {
      if (isNaN(m) || m <= 0 || isNaN(v) || v < 0)
        return;
      o.save();
      const N = Ae(O.lineWidth, 1);
      if (o.fillStyle = Ae(O.fillStyle, l), o.lineCap = Ae(O.lineCap, "butt"), o.lineDashOffset = Ae(O.lineDashOffset, 0), o.lineJoin = Ae(O.lineJoin, "miter"), o.lineWidth = N, o.strokeStyle = Ae(O.strokeStyle, l), o.setLineDash(Ae(O.lineDash, [])), i.usePointStyle) {
        const W = {
          radius: v * Math.SQRT2 / 2,
          pointStyle: O.pointStyle,
          rotation: O.rotation,
          borderWidth: N
        }, S = r.xPlus(D, m / 2), L = M + h;
        zi(o, W, S, L, i.pointStyleWidth && m);
      } else {
        const W = M + Math.max((g - v) / 2, 0), S = r.leftForLtr(D, m), L = wa(O.borderRadius);
        o.beginPath(), Object.values(L).some((T) => T !== 0) ? An(o, {
          x: S,
          y: W,
          w: m,
          h: v,
          radius: L
        }) : o.rect(S, W, m, v), o.fill(), N !== 0 && o.stroke();
      }
      o.restore();
    }, k = function(D, M, O) {
      Za(o, O.text, D, M + p / 2, c, {
        strikethrough: O.hidden,
        textAlign: r.textAlign(O.textAlign)
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
    }, qi(this.ctx, t.textDirection);
    const $ = p + u;
    this.legendItems.forEach((D, M) => {
      o.strokeStyle = D.fontColor, o.fillStyle = D.fontColor;
      const O = o.measureText(D.text).width, N = r.textAlign(D.textAlign || (D.textAlign = i.textAlign)), W = m + h + O;
      let S = b.x, L = b.y;
      r.setWidth(this.width), _ ? M > 0 && S + W + u > this.right && (L = b.y += $, b.line++, S = b.x = nt(s, this.left + u, this.right - n[b.line])) : M > 0 && L + $ > this.bottom && (S = b.x = S + a[b.line].width + u, b.line++, L = b.y = nt(s, this.top + w + u, this.bottom - a[b.line].height));
      const T = r.x(S);
      if (y(T, L, D), S = Yr(N, S + m + h, _ ? S + W : this.right, t.rtl), k(r.x(S), L, D), _)
        b.x += W + u;
      else if (typeof D.text != "string") {
        const j = c.lineHeight;
        b.y += hl(D, j) + u;
      } else
        b.y += $;
    }), Xi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = lt(a.font), o = Ct(a.padding);
    if (!a.display)
      return;
    const s = Ca(t.rtl, this.left, this.width), i = this.ctx, l = a.position, r = n.size / 2, c = o.top + r;
    let u, g = this.left, h = this.width;
    if (this.isHorizontal())
      h = Math.max(...this.lineWidths), u = this.top + c, g = nt(t.align, g, this.right - h);
    else {
      const m = this.columnSizes.reduce((v, p) => Math.max(v, p.height), 0);
      u = c + nt(t.align, this.top, this.bottom - m - t.labels.padding - this._computeTitleHeight());
    }
    const b = nt(l, g, g + h);
    i.textAlign = s.textAlign(ko(l)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, Za(i, a.text, b, u, n);
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
    if (!uh(t.type, a))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = lh(o, n);
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
function rh(e, t, a, n, o) {
  const s = ch(n, e, t, a), i = dh(o, n, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function ch(e, t, a, n) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + a.size / 2 + n.measureText(o).width;
}
function dh(e, t, a) {
  let n = e;
  return typeof t.text != "string" && (n = hl(t, a)), n;
}
function hl(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function uh(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Ro = {
  id: "legend",
  _element: Hs,
  start(e, t, a) {
    const n = e.legend = new Hs({
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
class fl extends Ut {
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
    let r = 0, c, u, g;
    return this.isHorizontal() ? (u = nt(l, n, s), g = a + t, c = s - n) : (i.position === "left" ? (u = n + t, g = nt(l, o, a), r = Fe * -0.5) : (u = s - t, g = nt(l, a, o), r = Fe * 0.5), c = o - a), {
      titleX: u,
      titleY: g,
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
      textAlign: ko(a.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function hh(e, t) {
  const a = new fl({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  xt.configure(e, a, t), xt.addBox(e, a), e.titleBlock = a;
}
var gl = {
  id: "title",
  _element: fl,
  start(e, t, a) {
    hh(e, a);
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
        const c = r.getCenterPoint(), u = so(t, c);
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
function fh(e, t) {
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
function Ws(e, t) {
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: l } = t, r = lt(t.bodyFont), c = lt(t.titleFont), u = lt(t.footerFont), g = s.length, h = o.length, b = n.length, m = Ct(t.padding);
  let v = m.height, p = 0, y = n.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (y += e.beforeBody.length + e.afterBody.length, g && (v += g * c.lineHeight + (g - 1) * t.titleSpacing + t.titleMarginBottom), y) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    v += b * w + (y - b) * r.lineHeight + (y - 1) * t.bodySpacing;
  }
  h && (v += t.footerMarginTop + h * u.lineHeight + (h - 1) * t.footerSpacing);
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
function gh(e, t) {
  const { y: a, height: n } = t;
  return a < n / 2 ? "top" : a > e.height - n / 2 ? "bottom" : "center";
}
function mh(e, t, a, n) {
  const { x: o, width: s } = n, i = a.caretSize + a.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function ph(e, t, a, n) {
  const { x: o, width: s } = a, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return n === "center" ? c = o <= (l + r) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), mh(c, e, t, a) && (c = "center"), c;
}
function Ks(e, t, a) {
  const n = a.yAlign || t.yAlign || gh(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || ph(e, t, a, n),
    yAlign: n
  };
}
function bh(e, t) {
  let { x: a, width: n } = e;
  return t === "right" ? a -= n : t === "center" && (a -= n / 2), a;
}
function vh(e, t, a) {
  let { y: n, height: o } = e;
  return t === "top" ? n += a : t === "bottom" ? n -= o + a : n -= o / 2, n;
}
function Us(e, t, a, n) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: l, yAlign: r } = a, c = o + s, { topLeft: u, topRight: g, bottomLeft: h, bottomRight: b } = wa(i);
  let m = bh(t, l);
  const v = vh(t, r, c);
  return r === "center" ? l === "left" ? m += c : l === "right" && (m -= c) : l === "left" ? m -= Math.max(u, h) + o : l === "right" && (m += Math.max(g, b) + o), {
    x: it(m, 0, n.width - t.width),
    y: it(v, 0, n.height - t.height)
  };
}
function bn(e, t, a) {
  const n = Ct(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Ys(e) {
  return Lt([], Vt(e));
}
function yh(e, t, a) {
  return ma(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function qs(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const ml = {
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
function ht(e, t, a, n) {
  const o = e[t].call(a, n);
  return typeof o > "u" ? ml[t].call(a, n) : o;
}
class Xs extends Ut {
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
    const a = this.chart, n = this.options.setContext(this.getContext()), o = n.enabled && a.options.animation && n.animations, s = new Zi(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = yh(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: n } = a, o = ht(n, "beforeTitle", this, t), s = ht(n, "title", this, t), i = ht(n, "afterTitle", this, t);
    let l = [];
    return l = Lt(l, Vt(o)), l = Lt(l, Vt(s)), l = Lt(l, Vt(i)), l;
  }
  getBeforeBody(t, a) {
    return Ys(ht(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, o = [];
    return Ee(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = qs(n, s);
      Lt(i.before, Vt(ht(l, "beforeLabel", this, s))), Lt(i.lines, ht(l, "label", this, s)), Lt(i.after, Vt(ht(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, a) {
    return Ys(ht(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, o = ht(n, "beforeFooter", this, t), s = ht(n, "footer", this, t), i = ht(n, "afterFooter", this, t);
    let l = [];
    return l = Lt(l, Vt(o)), l = Lt(l, Vt(s)), l = Lt(l, Vt(i)), l;
  }
  _createItems(t) {
    const a = this._active, n = this.chart.data, o = [], s = [], i = [];
    let l = [], r, c;
    for (r = 0, c = a.length; r < c; ++r)
      l.push(fh(this.chart, a[r]));
    return t.filter && (l = l.filter((u, g, h) => t.filter(u, g, h, n))), t.itemSort && (l = l.sort((u, g) => t.itemSort(u, g, n))), Ee(l, (u) => {
      const g = qs(t.callbacks, u);
      o.push(ht(g, "labelColor", this, u)), s.push(ht(g, "labelPointStyle", this, u)), i.push(ht(g, "labelTextColor", this, u));
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
      const r = this._size = Ws(this, n), c = Object.assign({}, l, r), u = Ks(this.chart, n, c), g = Us(n, c, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, s = {
        opacity: 1,
        x: g.x,
        y: g.y,
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = n, { topLeft: r, topRight: c, bottomLeft: u, bottomRight: g } = wa(l), { x: h, y: b } = t, { width: m, height: v } = a;
    let p, y, k, _, w, $;
    return s === "center" ? (w = b + v / 2, o === "left" ? (p = h, y = p - i, _ = w + i, $ = w - i) : (p = h + m, y = p + i, _ = w - i, $ = w + i), k = p) : (o === "left" ? y = h + Math.max(r, u) + i : o === "right" ? y = h + m - Math.max(c, g) - i : y = this.caretX, s === "top" ? (_ = b, w = _ - i, p = y - i, k = y + i) : (_ = b + v, w = _ + i, p = y + i, k = y - i), $ = _), {
      x1: p,
      x2: y,
      x3: k,
      y1: _,
      y2: w,
      y3: $
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
    const i = this.labelColors[n], l = this.labelPointStyles[n], { boxHeight: r, boxWidth: c } = s, u = lt(s.bodyFont), g = bn(this, "left", s), h = o.x(g), b = r < u.lineHeight ? (u.lineHeight - r) / 2 : 0, m = a.y + b;
    if (s.usePointStyle) {
      const v = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, p = o.leftForLtr(h, c) + c / 2, y = m + r / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, lo(t, v, p, y), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, lo(t, v, p, y);
    } else {
      t.lineWidth = Le(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const v = o.leftForLtr(h, c), p = o.leftForLtr(o.xPlus(h, 1), c - 2), y = wa(i.borderRadius);
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
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: u } = n, g = lt(n.bodyFont);
    let h = g.lineHeight, b = 0;
    const m = Ca(n.rtl, this.x, this.width), v = function(O) {
      a.fillText(O, m.x(t.x + b), t.y + h / 2), t.y += h + s;
    }, p = m.textAlign(i);
    let y, k, _, w, $, D, M;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = g.string, t.x = bn(this, p, n), a.fillStyle = n.bodyColor, Ee(this.beforeBody, v), b = l && p !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, w = 0, D = o.length; w < D; ++w) {
      for (y = o[w], k = this.labelTextColors[w], a.fillStyle = k, Ee(y.before, v), _ = y.lines, l && _.length && (this._drawColorBox(a, t, w, m, n), h = Math.max(g.lineHeight, r)), $ = 0, M = _.length; $ < M; ++$)
        v(_[$]), h = g.lineHeight;
      Ee(y.after, v);
    }
    b = 0, h = g.lineHeight, Ee(this.afterBody, v), t.y -= s;
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
    const { xAlign: s, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: u } = n, { topLeft: g, topRight: h, bottomLeft: b, bottomRight: m } = wa(o.cornerRadius);
    a.fillStyle = o.backgroundColor, a.strokeStyle = o.borderColor, a.lineWidth = o.borderWidth, a.beginPath(), a.moveTo(l + g, r), i === "top" && this.drawCaret(t, a, n, o), a.lineTo(l + c - h, r), a.quadraticCurveTo(l + c, r, l + c, r + h), i === "center" && s === "right" && this.drawCaret(t, a, n, o), a.lineTo(l + c, r + u - m), a.quadraticCurveTo(l + c, r + u, l + c - m, r + u), i === "bottom" && this.drawCaret(t, a, n, o), a.lineTo(l + b, r + u), a.quadraticCurveTo(l, r + u, l, r + u - b), i === "center" && s === "left" && this.drawCaret(t, a, n, o), a.lineTo(l, r + g), a.quadraticCurveTo(l, r, l + g, r), a.closePath(), a.fill(), o.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, n = this.$animations, o = n && n.x, s = n && n.y;
    if (o || s) {
      const i = Na[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = Ws(this, t), r = Object.assign({}, i, this._size), c = Ks(a, t, r), u = Us(t, r, c, a);
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
    a.enabled && l && (t.save(), t.globalAlpha = n, this.drawBackground(s, t, o, a), qi(t, a.textDirection), s.y += i.top, this.drawTitle(s, t, a), this.drawBody(s, t, a), this.drawFooter(s, t, a), Xi(t, a.textDirection), t.restore());
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
var Io = {
  id: "tooltip",
  _element: Xs,
  positioners: Na,
  afterInit(e, t, a) {
    a && (e.tooltip = new Xs({
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
    callbacks: ml
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
const xh = (e, t, a, n) => (typeof t == "string" ? (a = e.push(t) - 1, n.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function kh(e, t, a, n) {
  const o = e.indexOf(t);
  if (o === -1)
    return xh(e, t, a, n);
  const s = e.lastIndexOf(t);
  return o !== s ? a : o;
}
const _h = (e, t) => e === null ? null : it(Math.round(e), 0, t);
function Gs(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class pl extends Aa {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Gs
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
    return a = isFinite(a) && n[a] === t ? a : kh(n, t, Ae(a, t), this._addedLabels), _h(a, n.length - 1);
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
    return Gs.call(this, t);
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
function wh(e, t) {
  const a = [], { bounds: o, step: s, min: i, max: l, precision: r, count: c, maxTicks: u, maxDigits: g, includeBounds: h } = e, b = s || 1, m = u - 1, { min: v, max: p } = t, y = !Pe(i), k = !Pe(l), _ = !Pe(c), w = (p - v) / (g + 1);
  let $ = Zo((p - v) / m / b) * b, D, M, O, N;
  if ($ < 1e-14 && !y && !k)
    return [
      {
        value: v
      },
      {
        value: p
      }
    ];
  N = Math.ceil(p / $) - Math.floor(v / $), N > m && ($ = Zo(N * $ / m / b) * b), Pe(r) || (D = Math.pow(10, r), $ = Math.ceil($ * D) / D), o === "ticks" ? (M = Math.floor(v / $) * $, O = Math.ceil(p / $) * $) : (M = v, O = p), y && k && s && Fr((l - i) / s, $ / 1e3) ? (N = Math.round(Math.min((l - i) / $, u)), $ = (l - i) / N, M = i, O = l) : _ ? (M = y ? i : M, O = k ? l : O, N = c - 1, $ = (O - M) / N) : (N = (O - M) / $, ja(N, Math.round(N), $ / 1e3) ? N = Math.round(N) : N = Math.ceil(N));
  const W = Math.max(Qo($), Qo(M));
  D = Math.pow(10, Pe(r) ? W : r), M = Math.round(M * D) / D, O = Math.round(O * D) / D;
  let S = 0;
  for (y && (h && M !== i ? (a.push({
    value: i
  }), M < i && S++, ja(Math.round((M + S * $) * D) / D, i, Zs(i, w, e)) && S++) : M < i && S++); S < N; ++S) {
    const L = Math.round((M + S * $) * D) / D;
    if (k && L > l)
      break;
    a.push({
      value: L
    });
  }
  return k && h && O !== l ? a.length && ja(a[a.length - 1].value, l, Zs(l, w, e)) ? a[a.length - 1].value = l : a.push({
    value: l
  }) : (!k || O === l) && a.push({
    value: O
  }), a;
}
function Zs(e, t, { horizontal: a, minRotation: n }) {
  const o = zt(n), s = (a ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class Ch extends Aa {
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
    }, s = this._range || this, i = wh(o, s);
    return t.bounds === "ticks" && Vr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return wo(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class bl extends Ch {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Ni.formatters.numeric
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
}, gt = /* @__PURE__ */ Object.keys(Fn);
function Qs(e, t) {
  return e - t;
}
function Js(e, t) {
  if (Pe(t))
    return null;
  const a = e._adapter, { parser: n, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof n == "function" && (i = n(i)), wt(i) || (i = typeof n == "string" ? a.parse(i, n) : a.parse(i)), i === null ? null : (o && (i = o === "week" && (qa(s) || s === !0) ? a.startOf(i, "isoWeek", s) : a.startOf(i, o)), +i);
}
function ei(e, t, a, n) {
  const o = gt.length;
  for (let s = gt.indexOf(e); s < o - 1; ++s) {
    const i = Fn[gt[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (l * i.size)) <= n)
      return gt[s];
  }
  return gt[o - 1];
}
function $h(e, t, a, n, o) {
  for (let s = gt.length - 1; s >= gt.indexOf(a); s--) {
    const i = gt[s];
    if (Fn[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return gt[a ? gt.indexOf(a) : 0];
}
function Sh(e) {
  for (let t = gt.indexOf(e) + 1, a = gt.length; t < a; ++t)
    if (Fn[gt[t]].common)
      return gt[t];
}
function ti(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: o } = xo(a, t), s = a[n] >= t ? a[n] : a[o];
    e[s] = !0;
  }
}
function Mh(e, t, a, n) {
  const o = e._adapter, s = +o.startOf(t[0].value, n), i = t[t.length - 1].value;
  let l, r;
  for (l = s; l <= i; l = +o.add(l, 1, n))
    r = a[l], r >= 0 && (t[r].major = !0);
  return t;
}
function ai(e, t, a) {
  const n = [], o = {}, s = t.length;
  let i, l;
  for (i = 0; i < s; ++i)
    l = t[i], o[l] = i, n.push({
      value: l,
      major: !1
    });
  return s === 0 || !a ? n : Mh(e, n, o, a);
}
class ni extends Aa {
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
    const n = t.time || (t.time = {}), o = this._adapter = new Dd._date(t.adapters.date);
    o.init(a), za(n.displayFormats, o.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : Js(this, t);
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
    const s = this.min, i = this.max, l = Wr(o, s, i);
    return this._unit = a.unit || (n.autoSkip ? ei(a.minUnit, this.min, this.max, this._getLabelCapacity(s)) : $h(this, l.length, a.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Sh(this._unit), this.initOffsets(o), t.reverse && l.reverse(), ai(this, l, this._majorUnit);
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
    const t = this._adapter, a = this.min, n = this.max, o = this.options, s = o.time, i = s.unit || ei(s.minUnit, a, n, this._getLabelCapacity(a)), l = Ae(o.ticks.stepSize, 1), r = i === "week" ? s.isoWeekday : !1, c = qa(r) || r === !0, u = {};
    let g = a, h, b;
    if (c && (g = +t.startOf(g, "isoWeek", r)), g = +t.startOf(g, c ? "day" : i), t.diff(n, a, i) > 1e5 * l)
      throw new Error(a + " and " + n + " are too far apart with stepSize of " + l + " " + i);
    const m = o.ticks.source === "data" && this.getDataTimestamps();
    for (h = g, b = 0; h < n; h = +t.add(h, l, i), b++)
      ti(u, h, m);
    return (h === n || o.bounds === "ticks" || b === 1) && ti(u, h, m), Object.keys(u).sort(Qs).map((v) => +v);
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
    const l = s.time.displayFormats, r = this._unit, c = this._majorUnit, u = r && l[r], g = c && l[c], h = n[a], b = c && g && h && h.major;
    return this._adapter.format(t, o || (b ? g : u));
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
    const a = this.options.time, n = a.displayFormats, o = n[a.unit] || n.millisecond, s = this._tickFormatFunction(t, 0, ai(this, [
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
      t.push(Js(this, o[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Oi(t.sort(Qs));
  }
}
function vn(e, t, a) {
  let n = 0, o = e.length - 1, s, i, l, r;
  a ? (t >= e[n].pos && t <= e[o].pos && ({ lo: n, hi: o } = ua(e, "pos", t)), { pos: s, time: l } = e[n], { pos: i, time: r } = e[o]) : (t >= e[n].time && t <= e[o].time && ({ lo: n, hi: o } = ua(e, "time", t)), { time: s, pos: l } = e[n], { time: i, pos: r } = e[o]);
  const c = i - s;
  return c ? l + (r - l) * (t - s) / c : l;
}
class e8 extends ni {
  static id = "timeseries";
  static defaults = ni.defaults;
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
const vl = {
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
}, Dh = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Ah = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...vl,
  ...Dh
}, Th = Jl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ya(e) {
  return Si(e) ? ao(e) : e;
}
function Bh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Si(t) ? new Proxy(e, {}) : e;
}
function Lh(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function yl(e, t) {
  e.labels = t;
}
function xl(e, t, a) {
  const n = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[a] === o[a]);
    return !s || !o.data || n.includes(s) ? {
      ...o
    } : (n.push(s), Object.assign(s, o), s);
  });
}
function Rh(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return yl(a, e.labels), xl(a, e.datasets, t), a;
}
const Ih = fe({
  props: Ah,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const o = ne(null), s = $i(null);
    a({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: u, options: g, plugins: h, datasetIdKey: b } = e, m = Rh(u, b), v = Bh(m, u);
      s.value = new aa(o.value, {
        type: c,
        data: v,
        options: {
          ...g
        },
        plugins: h
      });
    }, l = () => {
      const c = ao(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return Je(i), at(l), Te([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [g, h] = c, [b, m] = u;
      const v = ao(s.value);
      if (!v)
        return;
      let p = !1;
      if (g) {
        const y = ya(g), k = ya(b);
        y && y !== k && (Lh(v, y), p = !0);
      }
      if (h) {
        const y = ya(h.labels), k = ya(m.labels), _ = ya(h.datasets), w = ya(m.datasets);
        y !== k && (yl(v.config.data, y), p = !0), _ && _ !== w && (xl(v.config.data, _, e.datasetIdKey), p = !0);
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
function Po(e, t) {
  return aa.register(t), fe({
    props: vl,
    setup(a, n) {
      let { expose: o } = n;
      const s = $i(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => He(Ih, Th({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const Ph = /* @__PURE__ */ Po("bar", wd), Eh = /* @__PURE__ */ Po("line", Sd), Oh = /* @__PURE__ */ Po("pie", Md), oi = {
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
}, si = {
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
}, Fh = [
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
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => e?.value ? e.value : t.value), s = C(() => o.value === "dark"), i = C(() => s.value ? si : oi), l = () => {
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
  }), e && Te(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: oi,
    darkColors: si,
    chartSeriesColors: Fh
  };
}
const Ja = 5, Eo = 8, Vh = /^x\d*$/, Nh = /^y\d*$/;
function kl(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, a = t.scales;
  if (!a || typeof a != "object") return t;
  const n = { ...a };
  for (const o of Object.keys(n)) {
    const s = n[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (Vh.test(o) && (r.maxTicksLimit = Eo, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), Nh.test(o)) {
      if (i.type === "category") {
        i.ticks = r, n[o] = i;
        continue;
      }
      if (Array.isArray(r.values) && r.values.length > 0)
        r.maxTicksLimit = r.values.length;
      else if (r.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), u = Number(i.max ?? i.suggestedMax ?? 0), g = Number(r.stepSize);
        u > c && g > 0 ? r.maxTicksLimit = Math.floor((u - c) / g) + 1 : r.maxTicksLimit = Ja;
      } else
        r.maxTicksLimit = Ja;
    }
    i.ticks = r, n[o] = i;
  }
  return t.scales = n, t;
}
const ft = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", zh = ["titleFont", "bodyFont", "footerFont"];
function _l(e, t = ft) {
  if (!e || typeof e != "object") return e;
  const a = { ...e }, n = typeof a.font == "object" && a.font !== null ? a.font : {};
  if (a.font = { ...n, family: t }, a.scales && typeof a.scales == "object") {
    const o = { ...a.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, r = l.ticks;
      if (r && typeof r == "object") {
        const u = { ...r }, g = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...g, family: t }, l.ticks = u;
      }
      const c = l.title;
      if (c && typeof c == "object") {
        const u = { ...c }, g = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...g, family: t }, l.title = u;
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
      for (const r of zh) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      o.tooltip = l;
    }
    a.plugins = o;
  }
  return a;
}
const ii = 10, jh = /* @__PURE__ */ fe({
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
    aa.register(pl, bl, ih, gl, Io, Ro), aa.defaults.font.family = ft;
    const { isDark: n, colors: o } = Me(Se(a, "theme")), s = C(() => a.data), i = (h) => typeof h == "string" ? h.charAt(0).toUpperCase() + h.slice(1).toLowerCase() : h, l = (h) => typeof h != "string" ? h : a.uppercaseLegendLabels ? h.toUpperCase() : i(h), r = (h, b) => h.length <= b ? h : `${h.slice(0, Math.max(1, b - 1))}…`;
    function c(h, b) {
      if (b == null) return h;
      if (Array.isArray(b) || typeof b != "object" || h == null || Array.isArray(h) || typeof h != "object") return b;
      const m = { ...h };
      for (const v of Object.keys(b)) {
        const p = b[v];
        p !== void 0 && (m[v] = c(h[v], p));
      }
      return m;
    }
    const u = C(() => {
      const h = {
        font: {
          family: ft
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
                family: ft,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: ii,
              boxHeight: ii,
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
              family: ft,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: ft,
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
                family: ft,
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
              maxTicksLimit: Eo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ft,
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
      }, b = a.options ? c(h, a.options) : h;
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
              const w = this.getLabelForValue(_), $ = typeof w == "string" ? w : String(w ?? "");
              return r($, k);
            }
          }
        };
      }
      return _l(
        kl(b)
      );
    }), g = C(() => a.heightPx ?? 230);
    return t({ isDark: n }), (h, b) => (f(), x("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: _e({ height: `${g.value}px` })
    }, [
      z(B(Ph), {
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
}, $t = /* @__PURE__ */ be(jh, [["__scopeId", "data-v-1d64fb88"]]), Hh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Wh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Kh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Uh = ["aria-pressed", "aria-label", "onClick"], Yh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, qh = /* @__PURE__ */ fe({
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
      pl,
      bl,
      eh,
      Ju,
      gl,
      Io,
      Ro
    ), aa.defaults.font.family = ft;
    const n = ne(null), { isDark: o, colors: s } = Me(Se(a, "theme")), i = C(() => s.value.bgCard), l = C(() => {
      const p = i.value;
      return {
        labels: a.data.labels,
        datasets: a.data.datasets.map((y) => {
          const k = y.borderColor, _ = Array.isArray(k) ? k[0] : k, w = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, $ = y.pointBackgroundColor !== void 0 ? y.pointBackgroundColor : p, D = y.pointHoverBackgroundColor !== void 0 ? y.pointHoverBackgroundColor : $, M = y.pointBorderWidth ?? 2, O = y.pointHoverBorderWidth ?? M;
          return {
            ...y,
            fill: y.fill ?? !1,
            clip: y.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: D,
            pointBorderColor: y.pointBorderColor ?? w,
            pointHoverBorderColor: y.pointHoverBorderColor ?? w,
            pointBorderWidth: M,
            pointHoverBorderWidth: O
          };
        })
      };
    }), r = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, c = (p) => typeof p != "string" ? p : a.uppercaseLegendLabels ? p.toUpperCase() : r(p);
    function u(p) {
      const y = p.borderColor, k = Array.isArray(y) ? y[0] : y;
      return typeof k == "string" && k.length > 0 ? k : s.value.textSecondary;
    }
    const g = C(
      () => l.value.datasets.map((p, y) => ({
        key: `${p.label ?? "dataset"}-${y}`,
        label: c(p.label || ""),
        color: u(p)
      }))
    ), h = ne([]);
    Te(
      () => l.value.datasets.length,
      (p) => {
        const y = Array.from({ length: p }, (k, _) => h.value[_] ?? !0);
        h.value = y;
      },
      { immediate: !0 }
    );
    function b(p) {
      const k = n.value?.chart;
      if (!k || p < 0 || p >= k.data.datasets.length) return;
      const _ = !k.isDatasetVisible(p);
      k.setDatasetVisibility(p, _), h.value[p] = _, k.update();
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
    const v = C(() => {
      const p = {
        font: {
          family: ft
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
              family: ft,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: ft,
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
              maxTicksLimit: Eo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ft,
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
                family: ft,
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
      return _l(
        kl(y)
      );
    });
    return t({ isDark: o }), (p, y) => (f(), x("div", Hh, [
      d("div", Wh, [
        z(B(Eh), {
          ref_key: "lineChartRef",
          ref: n,
          data: l.value,
          options: v.value
        }, null, 8, ["data", "options"])
      ]),
      g.value.length > 0 ? (f(), x("ul", Kh, [
        (f(!0), x(he, null, pe(g.value, (k, _) => (f(), x("li", {
          key: k.key,
          role: "listitem"
        }, [
          d("button", {
            type: "button",
            class: X(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", h.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: _e({ color: k.color }),
            "aria-pressed": h.value[_] !== !1,
            "aria-label": `${k.label}. ${h.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => b(_)
          }, [
            d("span", Yh, [
              y[0] || (y[0] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              d("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: _e({ borderColor: k.color })
              }, null, 4),
              y[1] || (y[1] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            d("span", null, A(k.label), 1)
          ], 14, Uh)
        ]))), 128))
      ])) : P("", !0)
    ]));
  }
}), mt = /* @__PURE__ */ be(qh, [["__scopeId", "data-v-426e23d5"]]), Xh = { class: "chart-container" }, Gh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Zh = /* @__PURE__ */ fe({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    aa.register(Hu, Io, Ro);
    const { isDark: n, colors: o } = Me(Se(a, "theme")), s = a.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = C(() => a.options ? a.options : {
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
              family: Gh,
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
              return c.labels.length && c.datasets.length ? c.labels.map((u, g) => {
                const b = r.getDatasetMeta(0).controller.getStyle(g), v = c.datasets[0].data[g], p = typeof b.backgroundColor == "string" && b.backgroundColor.length > 0 ? b.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(u)}: ${v}`,
                  fillStyle: b.backgroundColor,
                  strokeStyle: b.borderColor,
                  lineWidth: b.borderWidth,
                  lineDash: b.borderDash,
                  lineDashOffset: b.borderDashOffset,
                  lineJoin: b.borderJoinStyle,
                  fontColor: p,
                  hidden: !r.getDataVisibility(g),
                  index: g
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
              const c = r.label || "", u = r.parsed || 0, g = r.dataset.data.reduce((b, m) => b + m, 0), h = (u / g * 100).toFixed(1);
              return `${i(c)}: ${u} (${h}%)`;
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
    return t({ isDark: n }), (r, c) => (f(), x("div", Xh, [
      z(B(Oh), {
        data: B(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Vn = /* @__PURE__ */ be(Zh, [["__scopeId", "data-v-0f7806d6"]]), Qh = { class: "chart-container" }, Jh = ["viewBox"], ef = ["transform"], tf = ["x", "width", "fill", "stroke"], af = ["fill"], nf = ["x1", "y1", "x2", "y2", "stroke"], of = ["points", "fill"], sf = ["x1", "y1", "x2", "y2", "stroke"], lf = ["x", "y", "fill"], rf = ["x1", "y1", "x2", "y2", "stroke"], cf = ["points", "fill"], df = ["transform"], uf = ["y1", "y2"], hf = ["y1", "y2"], ff = ["y1", "y2"], gf = ["y1", "y2"], mf = ["y", "height"], pf = ["y1", "y2"], bf = ["y1", "y2"], vf = ["y1", "y2"], yf = ["y1", "y2"], xf = ["y", "height"], kf = ["cy", "stroke", "onMouseenter"], _f = ["cy", "stroke", "onMouseenter"], wf = ["cy", "stroke", "onMouseenter"], Cf = ["cy", "stroke", "onMouseenter"], $f = ["y1", "y2", "onMouseenter"], Sf = ["y1", "y2", "onMouseenter"], Mf = ["x", "y", "fill"], Df = ["x", "y", "fill"], Af = ["transform"], Tf = { transform: "translate(-200, 0)" }, Bf = ["stroke"], Lf = ["fill"], Rf = { transform: "translate(-130, 0)" }, If = ["stroke"], Pf = ["fill"], Ef = { transform: "translate(-60, 0)" }, Of = ["stroke"], Ff = ["fill"], Vf = { transform: "translate(10, 0)" }, Nf = ["stroke"], zf = ["fill"], jf = { transform: "translate(80, 0)" }, Hf = ["fill"], Wf = { transform: "translate(150, 0)" }, Kf = ["fill"], Uf = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n } = Me(Se(a, "theme")), o = C(() => ({
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
    }), i = (h) => typeof h == "string" ? h.charAt(0).toUpperCase() + h.slice(1).toLowerCase() : h, l = (h, b) => {
      const m = h.currentTarget.closest("svg");
      if (!m) return;
      const v = m.getBoundingClientRect(), p = m.createSVGPoint();
      p.x = h.clientX - v.left, p.y = h.clientY - v.top, s.value = {
        visible: !0,
        x: p.x,
        y: p.y - 20,
        text: b
      };
    }, r = (h) => {
      if (s.value.visible) {
        const b = h.currentTarget, m = b.getBoundingClientRect(), v = b.createSVGPoint();
        v.x = h.clientX - m.left, v.y = h.clientY - m.top, s.value.x = v.x, s.value.y = v.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, u = () => {
      s.value.visible = !1;
    }, g = C(() => {
      const h = [], m = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let v = 1; v <= 10; v++) {
        const p = v, y = (p - 1) / 9, k = a.chartMargin + m - y * m;
        h.push({ value: p, y: k });
      }
      return h;
    });
    return t({ isDark: n }), (h, b) => (f(), x("div", Qh, [
      (f(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: _e(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        s.value.visible ? (f(), x("g", {
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
          }, null, 8, tf),
          d("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, af)
        ], 8, ef)) : P("", !0),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, nf),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, of),
        (f(!0), x(he, null, pe(g.value, (m, v) => (f(), x(he, { key: v }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: m.y,
            x2: e.chartMargin,
            y2: m.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, sf),
          d("text", {
            x: e.chartMargin - 12,
            y: m.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(m.value), 9, lf)
        ], 64))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, rf),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, cf),
        (f(!0), x(he, null, pe(e.boxplotData, (m, v) => (f(), x(he, { key: v }, [
          d("g", {
            transform: `translate(${m.centerX}, 0)`
          }, [
            m.isTotal ? (f(), x(he, { key: 0 }, [
              d("line", {
                x1: 0,
                y1: m.minY,
                x2: 0,
                y2: m.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, uf),
              d("line", {
                x1: 0,
                y1: m.q3Y,
                x2: 0,
                y2: m.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, hf),
              d("line", {
                x1: -18,
                y1: m.minY,
                x2: 18,
                y2: m.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ff),
              d("line", {
                x1: -18,
                y1: m.maxY,
                x2: 18,
                y2: m.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, gf),
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
              }, null, 8, mf)
            ], 64)) : (f(), x(he, { key: 1 }, [
              d("line", {
                x1: 0,
                y1: m.minY,
                x2: 0,
                y2: m.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, pf),
              d("line", {
                x1: 0,
                y1: m.q3Y,
                x2: 0,
                y2: m.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, bf),
              d("line", {
                x1: -18,
                y1: m.minY,
                x2: 18,
                y2: m.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, vf),
              d("line", {
                x1: -18,
                y1: m.maxY,
                x2: 18,
                y2: m.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, yf),
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
              }, null, 8, xf)
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
            }, null, 40, kf),
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
            }, null, 40, _f),
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
            }, null, 40, wf),
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
            }, null, 40, Cf),
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
            }, null, 40, $f),
            m.averageY ? (f(), x("line", {
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
            }, null, 40, Sf)) : P("", !0)
          ], 8, df),
          d("text", {
            x: m.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(m.label)), 9, Mf),
          m.responseCount ? (f(), x("text", {
            key: 0,
            x: m.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(m.responseCount), 9, Df)) : P("", !0)
        ], 64))), 128)),
        e.showLegend ? (f(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", Tf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
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
            }, " Min ", 8, Lf)
          ]),
          d("g", Rf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
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
            }, " Q1 ", 8, Pf)
          ]),
          d("g", Ef, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
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
            }, " Q3 ", 8, Ff)
          ]),
          d("g", Vf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Nf),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, zf)
          ]),
          d("g", jf, [
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
            }, " Avg ", 8, Hf)
          ]),
          d("g", Wf, [
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
            }, " Median ", 8, Kf)
          ])
        ], 8, Af)) : P("", !0)
      ], 44, Jh))
    ]));
  }
}), Yf = /* @__PURE__ */ be(Uf, [["__scopeId", "data-v-9ac5c075"]]), qf = { class: "chart-container" }, Xf = ["viewBox"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["points", "fill"], Qf = ["x1", "y1", "x2", "y2", "stroke"], Jf = ["x1", "y1", "x2", "y2", "stroke"], eg = ["x", "y", "fill"], tg = ["x", "y", "fill", "transform"], ag = ["x1", "y1", "x2", "y2", "stroke"], ng = ["points", "fill"], og = ["transform"], sg = ["y1", "y2", "stroke", "onMouseenter"], ig = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], lg = ["x1", "y1", "x2", "y2", "onMouseenter"], rg = ["x1", "y1", "x2", "y2", "onMouseenter"], cg = ["cy", "stroke", "onMouseenter"], dg = ["cy", "stroke", "onMouseenter"], ug = ["x", "y", "fill"], hg = ["x", "y", "fill"], fg = ["transform"], gg = { transform: "translate(-180, 0)" }, mg = ["stroke"], pg = ["fill"], bg = { transform: "translate(-120, 0)" }, vg = ["fill"], yg = { transform: "translate(-60, 0)" }, xg = ["fill"], kg = { transform: "translate(0, 0)" }, _g = ["stroke"], wg = ["fill"], Cg = { transform: "translate(60, 0)" }, $g = ["fill"], Sg = { transform: "translate(130, 0)" }, Mg = ["fill"], Dg = ["transform"], Ag = ["x", "y", "width", "height", "fill", "stroke"], Tg = ["y", "fill"], Bg = ["y", "fill"], yn = 10, Lg = 14, Jn = 13, li = 4, ri = 12, Rg = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n, colors: o } = Me(Se(a, "theme")), s = yn + Jn + li + ri + yn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(k, _, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(k, 1) * _ * $);
    }
    function r(k, _) {
      return Math.max(
        l(k.length, Jn, !0),
        l(_.length, ri, !1),
        52
      ) + Lg * 2;
    }
    function c(k, _, w, $) {
      const D = w / 2, M = 6, O = Math.min(
        Math.max(k, D + M),
        a.chartWidth - D - M
      ), N = M + $ + 10, W = a.chartHeight - M + 10, S = Math.min(Math.max(_, N), W);
      return { x: O, y: S };
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
    })), g = ne({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), h = (k) => typeof k == "string" ? k.charAt(0).toUpperCase() + k.slice(1).toLowerCase() : k, b = (k, _, w) => {
      const $ = k.currentTarget.closest("svg");
      if (!$) return;
      const D = $.getBoundingClientRect(), M = $.createSVGPoint();
      M.x = k.clientX - D.left, M.y = k.clientY - D.top;
      let O = h(_.label), N = "";
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
      const W = r(O, N), S = s;
      let L = M.x, T = M.y - 20;
      const j = c(L, T, W, S);
      L = j.x, T = j.y, g.value = {
        visible: !0,
        x: L,
        y: T,
        title: O,
        text: N,
        width: W,
        height: S
      };
    }, m = (k) => {
      if (g.value.visible) {
        const _ = k.currentTarget, w = _.getBoundingClientRect(), $ = _.createSVGPoint();
        $.x = k.clientX - w.left, $.y = k.clientY - w.top;
        let D = $.x, M = $.y - 20;
        const O = c(D, M, g.value.width, g.value.height);
        g.value.x = O.x, g.value.y = O.y;
      }
    }, v = () => {
      g.value.visible = !1;
    }, p = () => {
      g.value.visible = !1;
    }, y = C(() => {
      const k = [], w = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const D = $, M = (D - 1) / 9, O = a.chartMargin + w - M * w;
        k.push({ value: D, y: O });
      }
      return k;
    });
    return t({ isDark: n }), (k, _) => (f(), x("div", qf, [
      (f(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: _e(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
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
        }, null, 8, Gf),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Zf),
        (f(!0), x(he, null, pe(y.value, (w, $) => (f(), x("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Qf))), 128)),
        (f(!0), x(he, null, pe(y.value, (w, $) => (f(), x(he, { key: $ }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Jf),
          d("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, eg)
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
        }, A(h(e.yAxisLabel)), 9, tg),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, ag),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, ng),
        (f(!0), x(he, null, pe(e.candlestickData, (w, $) => (f(), x(he, { key: $ }, [
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
              onMouseenter: (D) => b(D, w, "wick"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, sg),
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
              onMouseenter: (D) => b(D, w, "body"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, ig),
            w.medianY ? (f(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (D) => b(D, w, "median"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, lg)) : P("", !0),
            w.averageY ? (f(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (D) => b(D, w, "average"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, rg)) : P("", !0),
            d("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (D) => b(D, w, "min"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, cg),
            d("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (D) => b(D, w, "max"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, dg)
          ], 8, og),
          d("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(h(w.label)), 9, ug),
          w.responseCount ? (f(), x("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, hg)) : P("", !0)
        ], 64))), 128)),
        e.showLegend ? (f(), x("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", gg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, mg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, pg)
          ]),
          d("g", bg, [
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
            }, " Q1 ", 8, vg)
          ]),
          d("g", yg, [
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
            }, " Q3 ", 8, xg)
          ]),
          d("g", kg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, _g),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, wg)
          ]),
          d("g", Cg, [
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
            }, " Avg ", 8, $g)
          ]),
          d("g", Sg, [
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
            }, " Median ", 8, Mg)
          ])
        ], 8, fg)) : P("", !0),
        g.value.visible ? (f(), x("g", {
          key: 1,
          "pointer-events": "none",
          transform: `translate(${g.value.x}, ${g.value.y})`
        }, [
          d("rect", {
            filter: "url(#candlestick-tooltip-shadow)",
            x: -g.value.width / 2,
            y: -g.value.height - 10,
            width: g.value.width,
            height: g.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, Ag),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + yn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.title), 9, Tg),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + yn + Jn + li,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.text), 9, Bg)
        ], 8, Dg)) : P("", !0)
      ], 44, Xf))
    ]));
  }
}), Ig = /* @__PURE__ */ be(Rg, [["__scopeId", "data-v-22efd66d"]]), Pg = ["viewBox"], Eg = ["x1", "y1", "x2", "y2", "stroke"], Og = ["x1", "y1", "x2", "y2", "stroke"], Fg = ["points", "fill"], Vg = ["x1", "y1", "x2", "y2", "stroke"], Ng = ["x", "y", "fill"], zg = ["x", "y", "fill", "transform"], jg = ["x1", "y1", "x2", "y2", "stroke"], Hg = ["points", "fill"], Wg = ["x1", "y1", "x2", "y2", "stroke"], Kg = ["x", "y", "fill"], Ug = ["x", "y", "fill"], Yg = ["d"], qg = ["x", "y", "width", "height", "onMouseenter"], Xg = ["x1", "y1", "x2", "y2"], Gg = ["x", "y"], Zg = ["x1", "y1", "x2", "y2"], Qg = ["x", "y"], Jg = ["x1", "y1", "x2", "y2"], em = ["x", "y"], tm = ["x1", "y1", "x2", "y2"], am = ["x", "y"], nm = ["x1", "y1", "x2", "y2"], om = ["x", "y"], sm = ["x1", "y1", "x2", "y2"], im = ["x", "y"], lm = ["transform"], rm = { transform: "translate(-220, 0)" }, cm = ["fill"], dm = { transform: "translate(-140, 0)" }, um = ["fill"], hm = { transform: "translate(-80, 0)" }, fm = ["fill"], gm = { transform: "translate(-20, 0)" }, mm = ["fill"], pm = { transform: "translate(60, 0)" }, bm = ["fill"], vm = { transform: "translate(130, 0)" }, ym = ["fill"], xm = { transform: "translate(180, 0)" }, km = ["fill"], _m = ["transform"], wm = ["x", "y", "width", "height", "fill", "stroke"], Cm = ["y", "fill"], $m = ["y", "fill"], xn = 10, Sm = 14, eo = 13, ci = 12, di = 4, Mm = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n, colors: o } = Me(Se(a, "theme")), s = xn + eo + di + ci + xn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(ee, G, I) {
      const Z = I ? 0.6 : 0.535;
      return Math.ceil(Math.max(ee, 1) * G * Z);
    }
    function r(ee, G) {
      return Math.max(
        l(ee.length, eo, !0),
        l(G.length, ci, !1),
        52
      ) + Sm * 2;
    }
    function c(ee, G, I, Z) {
      const ae = I / 2, F = 6, J = Math.min(
        Math.max(ee, ae + F),
        a.chartWidth - ae - F
      ), se = F + Z + 10, me = a.chartHeight - F + 10, Ce = Math.min(Math.max(G, se), me);
      return { x: J, y: Ce };
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
    })), g = ne({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), h = C(
      () => a.chartMarginRight ?? a.chartMargin
    ), b = C(() => a.chartMargin + a.plotInset), m = C(
      () => a.chartWidth - h.value - a.plotInset
    ), v = C(() => Math.max(m.value - b.value, 1)), p = C(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), y = C(() => v.value / 10 * 0.52);
    function k(ee) {
      if (ee < 1 || ee > 10) return null;
      const G = v.value / 10;
      return b.value + (ee - 0.5) * G;
    }
    const _ = C(
      () => Array.from({ length: 10 }, (ee, G) => {
        const I = G + 1, Z = k(I);
        return Z === null ? null : { score: I, x: Z };
      }).filter((ee) => ee !== null)
    ), w = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ee = Math.max(...a.histogram.map((I) => I.count || 0), 1), G = Math.max(1, Math.ceil(ee * 0.2));
      return ee + G;
    }), $ = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ee = a.averageScore || 0;
      let G = 0, I = 0;
      if (a.histogram.forEach((ae) => {
        const F = ae.count || 0;
        G += F;
        const J = ae.score - ee;
        I += F * (J * J);
      }), G === 0) return 1;
      const Z = I / G;
      return Math.sqrt(Z) || 1;
    }), D = (ee, G, I) => {
      if (I === 0) return 0;
      const Z = 1 / (I * Math.sqrt(2 * Math.PI)), ae = -0.5 * Math.pow((ee - G) / I, 2);
      return Z * Math.exp(ae);
    }, M = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && $.value === 0) return null;
      const ee = a.averageScore, G = $.value, I = 100, ae = Math.max(...a.histogram.map((me) => me.count || 0), 1) / w.value * p.value;
      if (ae <= 0) return null;
      let F = 0;
      for (let me = 0; me <= I; me++) {
        const Ce = 1 + 9 * (me / I), we = D(Ce, ee, G);
        we > F && (F = we);
      }
      if (F <= 0) return null;
      const J = ae / F, se = [];
      for (let me = 0; me <= I; me++) {
        const Ce = 1 + 9 * (me / I), we = D(Ce, ee, G) * J, Re = k(Ce);
        if (Re !== null) {
          const Ie = a.chartHeight - a.chartBottomMargin - we;
          se.push(`${me === 0 ? "M" : "L"} ${Re} ${Ie}`);
        }
      }
      return se.join(" ");
    }), O = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const ee = v.value / 10;
      return a.histogram.map((G) => {
        const I = Number(G.score);
        if (!Number.isFinite(I) || I < 1 || I > 10)
          return null;
        const Z = b.value + (I - 0.5) * ee, ae = G.count > 0 ? G.count / w.value * p.value : 0, F = a.chartHeight - a.chartBottomMargin - ae;
        return {
          score: I,
          count: G.count,
          x: Z,
          y: F,
          height: ae
        };
      }).filter((G) => G !== null);
    }), N = C(() => k(a.minScore)), W = C(() => k(a.maxScore)), S = C(() => k(a.q1Score)), L = C(() => k(a.medianScore)), T = C(() => k(a.q3Score)), j = C(() => k(a.averageScore)), H = C(() => a.minScore), Q = C(() => a.maxScore), re = C(() => a.q1Score), ue = C(() => a.medianScore), q = C(() => a.q3Score), oe = C(() => a.averageScore), R = C(() => {
      const ee = [], G = a.chartMargin - 8, I = 18;
      S.value !== null && ee.push({
        x: S.value,
        y: G,
        value: a.q1Score,
        label: `Q1: ${re.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), L.value !== null && ee.push({
        x: L.value,
        y: G - I,
        value: a.medianScore,
        label: `Median: ${ue.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), j.value !== null && ee.push({
        x: j.value,
        y: G - I,
        value: a.averageScore,
        label: `Avg: ${oe.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), T.value !== null && ee.push({
        x: T.value,
        y: G,
        value: a.q3Score,
        label: `Q3: ${q.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), ee.sort((F, J) => (F.x || 0) - (J.x || 0));
      const Z = [[], [], []];
      ee.forEach((F) => {
        if (F.x === null) return;
        let J = -1;
        for (let se = 0; se < Z.length; se++) {
          let me = !1;
          for (const Ce of Z[se]) {
            if (Ce.x === null) continue;
            const we = Math.abs(F.x - Ce.x), Re = (F.width + Ce.width) / 2 + 10;
            if (we < Re) {
              me = !0;
              break;
            }
          }
          if (!me) {
            J = se;
            break;
          }
        }
        J === -1 && (J = Z.length - 1), F.y = G - J * I, Z[J].push(F);
      });
      const ae = 15;
      return ee.forEach((F) => {
        F.y < ae && (F.y = ae);
      }), ee;
    }), U = (ee) => R.value.find((I) => I.id === ee)?.y || a.chartMargin - 10, Y = C(() => {
      const ee = [];
      for (let I = 0; I <= 5; I++) {
        const Z = Math.round(w.value / 5 * I), ae = a.chartHeight - a.chartBottomMargin - I / 5 * p.value;
        ee.push({ value: Z, y: ae });
      }
      return ee;
    });
    function V(ee, G, I) {
      const Z = ee.createSVGPoint();
      Z.x = G, Z.y = I;
      const ae = ee.getScreenCTM();
      if (!ae) {
        const J = ee.getBoundingClientRect();
        return { x: G - J.left, y: I - J.top };
      }
      const F = Z.matrixTransform(ae.inverse());
      return { x: F.x, y: F.y };
    }
    const le = (ee, G) => {
      a.interactive && xe(ee, G);
    }, ce = () => {
      a.interactive && de();
    }, xe = (ee, G) => {
      const I = ee.currentTarget.closest("svg");
      if (!I) return;
      const { x: Z, y: ae } = V(I, ee.clientX, ee.clientY), F = `Score: ${G.score}`, J = `Count: ${Number(G.count ?? 0).toLocaleString()}`, se = r(F, J), me = s, Ce = typeof G?.x == "number" ? G.x : Z;
      let we = ae - 20;
      const Re = c(Ce, we, se, me);
      g.value = {
        visible: !0,
        x: Re.x,
        y: Re.y,
        title: F,
        text: J,
        width: se,
        height: me,
        anchorX: typeof G?.x == "number" ? G.x : null
      };
    }, K = (ee) => {
      if (a.interactive && g.value.visible) {
        const G = ee.currentTarget, { x: I, y: Z } = V(G, ee.clientX, ee.clientY), ae = g.value.anchorX, F = ae != null && Number.isFinite(ae) ? ae : I;
        let J = Z - 20;
        const se = c(F, J, g.value.width, g.value.height);
        g.value.x = se.x, g.value.y = se.y;
      }
    }, ie = () => {
      de();
    }, de = () => {
      g.value.visible = !1, g.value.anchorX = null;
    };
    return t({ isDark: n }), (ee, G) => (f(), x("div", {
      class: X(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (f(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: _e(`min-height: ${e.chartHeight}px;`),
        onMousemove: K,
        onMouseleave: ie
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
        (f(!0), x(he, null, pe(Y.value, (I, Z) => (f(), x("line", {
          key: `grid-${Z}`,
          x1: b.value,
          y1: I.y,
          x2: m.value,
          y2: I.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Eg))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Og),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Fg),
        (f(!0), x(he, null, pe(Y.value, (I, Z) => (f(), x(he, {
          key: `y-tick-${Z}`
        }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: I.y,
            x2: e.chartMargin,
            y2: I.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Vg),
          d("text", {
            x: e.chartMargin - 12,
            y: I.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(I.value), 9, Ng)
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
        }, " Count ", 8, zg),
        d("line", {
          x1: b.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, jg),
        d("polygon", {
          points: `${m.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${m.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${m.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Hg),
        (f(!0), x(he, null, pe(_.value, (I) => (f(), x(he, {
          key: `tick-${I.score}`
        }, [
          d("line", {
            x1: I.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: I.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Wg),
          d("text", {
            x: I.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(I.score), 9, Kg)
        ], 64))), 128)),
        d("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Ug),
        M.value ? (f(), x("path", {
          key: 0,
          d: M.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Yg)) : P("", !0),
        (f(!0), x(he, null, pe(O.value, (I, Z) => (f(), x("rect", {
          key: `bar-${Z}`,
          x: I.x - y.value / 2,
          y: I.y,
          width: y.value,
          height: I.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (ae) => le(ae, I),
          onMouseleave: ce,
          style: _e({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, qg))), 128)),
        e.showStatLabels && N.value ? (f(), x("line", {
          key: 1,
          x1: N.value,
          y1: e.chartMargin,
          x2: N.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Xg)) : P("", !0),
        e.showStatLabels && N.value ? (f(), x("text", {
          key: 2,
          x: N.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(H.value.toFixed(1)), 9, Gg)) : P("", !0),
        e.showStatLabels && S.value ? (f(), x("line", {
          key: 3,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Zg)) : P("", !0),
        e.showStatLabels && S.value ? (f(), x("text", {
          key: 4,
          x: S.value,
          y: U("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(re.value.toFixed(1)), 9, Qg)) : P("", !0),
        e.showStatLabels && L.value ? (f(), x("line", {
          key: 5,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Jg)) : P("", !0),
        e.showStatLabels && L.value ? (f(), x("text", {
          key: 6,
          x: L.value,
          y: U("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(ue.value.toFixed(1)), 9, em)) : P("", !0),
        e.showStatLabels && j.value ? (f(), x("line", {
          key: 7,
          x1: j.value,
          y1: e.chartMargin,
          x2: j.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, tm)) : P("", !0),
        e.showStatLabels && j.value ? (f(), x("text", {
          key: 8,
          x: j.value,
          y: U("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(oe.value.toFixed(1)), 9, am)) : P("", !0),
        e.showStatLabels && T.value ? (f(), x("line", {
          key: 9,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, nm)) : P("", !0),
        e.showStatLabels && T.value ? (f(), x("text", {
          key: 10,
          x: T.value,
          y: U("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(q.value.toFixed(1)), 9, om)) : P("", !0),
        e.showStatLabels && W.value ? (f(), x("line", {
          key: 11,
          x1: W.value,
          y1: e.chartMargin,
          x2: W.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, sm)) : P("", !0),
        e.showStatLabels && W.value ? (f(), x("text", {
          key: 12,
          x: W.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(Q.value.toFixed(1)), 9, im)) : P("", !0),
        e.showLegend ? (f(), x("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          d("g", rm, [
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
            }, " Gaussian ", 8, cm)
          ]),
          d("g", dm, [
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
            }, " Min ", 8, um)
          ]),
          d("g", hm, [
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
            }, " Q1 ", 8, fm)
          ]),
          d("g", gm, [
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
            }, " Median ", 8, mm)
          ]),
          d("g", pm, [
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
            }, " Avg ", 8, bm)
          ]),
          d("g", vm, [
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
            }, " Q3 ", 8, ym)
          ]),
          d("g", xm, [
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
            }, " Max ", 8, km)
          ])
        ], 8, lm)) : P("", !0),
        e.interactive && g.value.visible ? (f(), x("g", {
          key: 14,
          "pointer-events": "none",
          transform: `translate(${g.value.x}, ${g.value.y})`
        }, [
          d("rect", {
            filter: "url(#histogram-tooltip-shadow)",
            x: -g.value.width / 2,
            y: -g.value.height - 10,
            width: g.value.width,
            height: g.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, wm),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + xn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.title), 9, Cm),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + xn + eo + di,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.text), 9, $m)
        ], 8, _m)) : P("", !0)
      ], 44, Pg))
    ], 2));
  }
}), wl = /* @__PURE__ */ be(Mm, [["__scopeId", "data-v-8f9da805"]]), Dm = 639, Cl = 1024;
function ui(e) {
  return e < 640 ? "mobile" : e <= Cl ? "tablet" : "desktop";
}
function Am() {
  const e = ne(
    typeof window > "u" ? "desktop" : ui(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = ui(window.innerWidth));
  };
  let a = null, n = null, o = null, s = null;
  Je(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${Dm}px)`), n = window.matchMedia(`(min-width: 640px) and (max-width: ${Cl}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, a.addEventListener("change", s), n.addEventListener("change", s), o.addEventListener("change", s));
  }), at(() => {
    !s || !a || !n || !o || (a.removeEventListener("change", s), n.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = C(() => e.value === "mobile"), l = C(() => e.value === "tablet"), r = C(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: r
  };
}
const Et = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ye = (e, t) => `${e.toLocaleString()} (${Et(e, t)})`, Tm = { class: "chart-container" }, Bm = {
  key: 0,
  class: "loading-state loading-overlay"
}, ra = 12, Lm = /* @__PURE__ */ fe({
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
    Ho.use([tr, ar, nr, or]);
    const a = e, { isDark: n, colors: o } = Me(Se(a, "theme")), { breakpoint: s } = Am(), i = ne(null), l = ne(!0), r = ne(!1);
    let c = null, u = null;
    const g = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "2%", bottom: "2%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, h = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, b = {
      success: 0,
      abandon: 1,
      error: 2
    }, m = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, v = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, p = C(() => {
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
        contentMargins: { ...g.margins }
      } : {
        orient: "horizontal",
        nodeWidth: g.node.width,
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
        contentMargins: { ...g.margins }
      };
    }), y = (K) => {
      const ie = K.replace(/_/g, " ").replace(/\s+/g, " ").trim(), de = ie.match(/^Failed:\s*(.+)$/i);
      return de ? `Failed:
${de[1].trim()}` : ie;
    }, k = (K, ie) => {
      const de = K.trim();
      if (!de || ie < 1 || de.length <= ie) return de;
      const ee = [];
      let G = 0;
      for (; G < de.length; ) {
        const I = Math.min(G + ie, de.length);
        if (I >= de.length) {
          const F = de.slice(G).trim();
          F && ee.push(F);
          break;
        }
        const Z = de.slice(G, I), ae = Z.lastIndexOf(" ");
        if (ae > 0)
          for (ee.push(de.slice(G, G + ae).trim()), G += ae; G < de.length && de[G] === " "; ) G += 1;
        else
          ee.push(Z), G = I;
      }
      return ee.join(`
`);
    }, _ = (K, ie) => {
      const de = K.trim();
      return !de || ie < 1 ? K : de.split(`
`).map((ee) => k(ee.trim(), ie)).filter(Boolean).join(`
`);
    }, w = (K) => K.status ? K.status : m.test(K.name) ? "abandon" : v.test(K.name) ? "error" : "success", $ = (K) => K.originalValue ?? K.value, D = (K, ie) => {
      const de = new Set(ie.map((G) => G.target)), ee = K.filter((G) => !de.has(G.name));
      for (const G of ee) {
        if (typeof G.value == "number" && G.value > 0) return G.value;
        const I = ie.filter((Z) => Z.source === G.name);
        if (I.length > 0)
          return I.reduce((Z, ae) => Z + $(ae), 0);
      }
      return ie.reduce((G, I) => Math.max(G, $(I)), 0);
    }, M = (K, ie) => {
      const de = /* @__PURE__ */ new Map(), ee = new Set(ie.map((I) => I.target)), G = K.filter((I) => !ee.has(I.name)).map((I) => ({ name: I.name, depth: 0 }));
      for (; G.length > 0; ) {
        const { name: I, depth: Z } = G.shift(), ae = de.get(I);
        if (!(ae !== void 0 && ae >= Z)) {
          de.set(I, Z);
          for (const F of ie)
            F.source === I && G.push({ name: F.target, depth: Z + 1 });
        }
      }
      for (const I of K)
        de.has(I.name) || de.set(I.name, 0);
      return de;
    }, O = (K, ie) => {
      const de = /* @__PURE__ */ new Map(), ee = new Set(ie.map((ae) => ae.target)), G = K.filter((ae) => !ee.has(ae.name));
      let I = 0;
      const Z = (ae) => {
        let F = ae;
        for (; F && !de.has(F); )
          de.set(F, I), I += 1, F = ie.filter(
            (se) => se.source === F && w({ name: se.target }) === "success"
          ).sort((se, me) => $(me) - $(se))[0]?.target;
      };
      return G.forEach((ae) => Z(ae.name)), de;
    }, N = (K, ie, de) => {
      const ee = w(K);
      if (ee === "success" && de.has(K.name))
        return de.get(K.name);
      if (ee === "success") {
        const G = ie.filter((Z) => Z.target === K.name);
        return 200 + (G.length ? Math.min(
          ...G.map(
            (Z) => de.has(Z.source) ? (de.get(Z.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return ee === "abandon" ? 1e3 : 2e3;
    }, W = (K, ie) => {
      const de = M(K, ie), ee = O(K, ie);
      return [...K].sort((G, I) => {
        const Z = de.get(G.name) ?? 0, ae = de.get(I.name) ?? 0;
        if (Z !== ae) return Z - ae;
        const F = b[w(G)], J = b[w(I)];
        if (F !== J) return F - J;
        const se = N(G, ie, ee), me = N(I, ie, ee);
        if (se !== me) return se - me;
        const Ce = typeof G.order == "number" ? G.order : Number.MAX_SAFE_INTEGER, we = typeof I.order == "number" ? I.order : Number.MAX_SAFE_INTEGER;
        return Ce !== we ? Ce - we : G.name.localeCompare(I.name);
      });
    }, S = (K, ie, de, ee) => {
      const I = _(K, ee).split(`
`), Z = ie * 0.58, F = Math.max(...I.map((se) => se.length), 1) * Z, J = I.length * de;
      return {
        lines: I,
        width: F,
        height: J,
        nodeWidth: F + ra * 2
      };
    }, L = (K, ie, de, ee) => {
      const G = typeof K.label == "string" && K.label ? K.label : K.name, I = `${y(G)}
(${Et(de, ee)})`;
      return _(I, ie);
    }, T = (K, ie) => {
      const de = ie.filter((ee) => ee.target === K.name);
      return de.length > 0 ? de.reduce((ee, G) => ee + $(G), 0) : typeof K.value == "number" ? K.value : ie.filter((ee) => ee.source === K.name).reduce((ee, G) => ee + $(G), 0);
    }, j = (K, ie, de) => {
      const ee = ie.find((G) => G.name === K);
      return ee ? T(ee, de) : de.filter((G) => G.source === K).reduce((G, I) => G + $(I), 0);
    }, H = (K, ie, de, ee) => {
      const G = j(K, de, ee);
      return `${ie.toLocaleString()} (${Et(ie, G)})`;
    }, Q = (K, ie = 0) => {
      if (ie > 0) return ie;
      const de = K.match(/^(\d+(?:\.\d+)?)px$/);
      if (de) return Number(de[1]);
      const ee = K.match(/^(\d+(?:\.\d+)?)vh$/);
      return ee && typeof window < "u" ? Number(ee[1]) / 100 * window.innerHeight : 500;
    }, re = (K, ie, de, ee, G) => {
      if (!ie.length || !K.length || G <= 0) return K;
      const I = K.map((we) => ({ ...we })), Z = de.labelLineHeight || Math.round(de.labelFontSize * 1.25), ae = Math.max(4, de.labelCharsPerLine), F = Math.max(ee * 0.88, 260), J = M(ie, I), se = /* @__PURE__ */ new Map();
      ie.forEach((we) => {
        const Re = J.get(we.name) ?? 0;
        se.set(Re, (se.get(Re) ?? 0) + 1);
      });
      const me = (we) => {
        const Ie = ie.find((oa) => oa.name === we)?.displayLabel || we, qt = S(Ie, de.labelFontSize, Z, ae).height + ra * 2, pa = J.get(we) ?? 0, nn = se.get(pa) ?? 1, on = (Math.max(nn, 1) - 1) * de.nodeGap / Math.max(nn, 1), Nn = Math.max(F - on, qt);
        return Math.max(1, qt / Nn * G);
      }, Ce = (we) => {
        const Re = I.filter((Ie) => Ie.target === we);
        return Re.length > 0 ? Re.reduce((Ie, qe) => Ie + qe.value, 0) : I.filter((Ie) => Ie.source === we).reduce((Ie, qe) => Ie + qe.value, 0);
      };
      for (let we = 0; we < 16; we += 1) {
        let Re = !1;
        for (const Ie of ie) {
          const qe = me(Ie.name), qt = Ce(Ie.name);
          if (qt >= qe) continue;
          const pa = I.filter((oa) => oa.target === Ie.name), nn = I.filter((oa) => oa.source === Ie.name), on = pa.length > 0 ? pa : nn;
          if (on.length === 0) continue;
          const Nn = qe / Math.max(qt, 1e-6);
          on.forEach((oa) => {
            oa.value *= Nn;
          }), Re = !0;
        }
        if (!Re) break;
      }
      return I;
    }, ue = (K, ie, de) => {
      const ee = D(K, ie), G = W(K, ie), I = de.labelLineHeight || Math.round(de.labelFontSize * 1.25), Z = Math.max(4, de.labelCharsPerLine);
      let ae = de.nodeWidth;
      const F = [], J = G.map((me, Ce) => {
        const we = w(me), Re = L(
          me,
          Z,
          T(me, ie),
          ee
        );
        F.push(Re);
        const Ie = S(Re, de.labelFontSize, I, Z);
        de.orient === "vertical" ? ae = Math.max(ae, Ie.height + ra * 2) : ae = Math.max(ae, Ie.nodeWidth);
        const qe = a.nodeColors[me.name] || h[we] || q[Ce % q.length], qt = Math.max(Math.ceil(Ie.nodeWidth - ra * 2), 48);
        return {
          ...me,
          displayLabel: Re,
          label: {
            width: qt,
            overflow: "none",
            lineHeight: I,
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
          ...F.map(
            (we) => S(we, de.labelFontSize, I, Z).width
          ),
          0
        ), Ce = typeof se.right == "number" ? se.right : 10;
        se = {
          ...se,
          right: Math.max(Ce, me + ra + de.labelDistance)
        };
      }
      return { nodes: J, maxNodeWidth: ae, contentMargins: se, originTotal: ee };
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
      const K = a.data.links.filter(
        (G) => G.source && G.target && typeof G.value == "number"
      ), ie = Math.max(...K.map((G) => G.value), 1), de = Math.max(1, ie * 0.01), ee = K.map((G) => ({
        ...G,
        originalValue: G.value,
        value: G.value < ie * 0.01 ? de : G.value
      }));
      return {
        nodes: a.data.nodes.filter((G) => G.name),
        links: ee
      };
    }, R = (K, ie, de) => (ee) => {
      const G = ee.dataType === "node", I = o.value.tooltipText, Z = n.value ? "#d1d5db" : "#e2e8f0";
      if (G) {
        const me = ie.filter((Ie) => Ie.target === ee.name), Ce = ie.filter((Ie) => Ie.source === ee.name), we = me.length > 0 ? me.reduce((Ie, qe) => Ie + (qe.originalValue || qe.value), 0) : Ce.reduce((Ie, qe) => Ie + (qe.originalValue || qe.value), 0), Re = Et(we, de);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${I};">${ee.name} (${Re})</div><div style="color: ${Z}; font-size: 12px;">Count: ${we.toLocaleString()}</div>`;
      }
      const ae = ee.data?.source || ee.source || "Unknown", F = ee.data?.target || ee.target || "Unknown", J = Number(ee.data?.originalValue ?? ee.data?.value ?? ee.value ?? 0), se = H(ae, J, K, ie);
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${I};">${ae} → ${F}</div><div style="color: ${Z}; font-size: 12px;">Flow: ${se}</div>`;
    }, U = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const K = p.value, ie = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", de = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", ee = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", G = K.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: I, links: Z } = oe(), { nodes: ae, maxNodeWidth: F, contentMargins: J, originTotal: se } = ue(
          I,
          Z,
          K
        ), me = Q(a.height, i.value?.clientHeight ?? 0), Ce = re(
          Z,
          ae,
          {
            labelFontSize: K.labelFontSize,
            labelLineHeight: K.labelLineHeight || Math.round(K.labelFontSize * 1.25),
            labelCharsPerLine: K.labelCharsPerLine,
            nodeGap: K.nodeGap
          },
          me,
          se
        ), we = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: R(I, Ce, se),
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
              data: ae,
              links: Ce,
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
                ...g.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: K.labelPosition,
                color: G,
                fontWeight: 700,
                fontSize: K.labelFontSize,
                lineHeight: K.labelLineHeight || Math.round(K.labelFontSize * 1.25),
                padding: ra,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...K.orient === "horizontal" ? { width: Math.max(F - ra * 2, 48), overflow: "none" } : K.labelWrap && K.labelTextWidth > 0 ? { width: K.labelTextWidth, overflow: "none" } : {},
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
                  const Ie = Number(Re.data?.originalValue ?? Re.value ?? 0), qe = Re.data?.source || Re.source || "";
                  return H(qe, Ie, I, Ce);
                }
              } : { show: !1 },
              nodeAlign: g.node.align,
              nodeGap: K.nodeGap,
              nodeWidth: F,
              layoutIterations: g.node.iterations,
              orient: K.orient,
              draggable: !1,
              ...J
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: g.animation.duration,
          animationEasing: g.animation.easing
        };
        c.setOption(we), c.resize();
      } catch (I) {
        console.error("Error setting Sankey chart options:", I), r.value = !0;
      }
    }, Y = async () => {
      if (i.value)
        try {
          c = Ho.init(i.value), U(), window.addEventListener("resize", ce);
        } catch (K) {
          console.error("Error initializing Sankey chart:", K), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, V = () => {
      const K = i.value;
      return !!(K && K.clientWidth > 0 && K.clientHeight > 0);
    }, le = async () => {
      if (await We(), V()) return Y();
      await new Promise((K) => {
        const ie = i.value;
        if (!ie) {
          K();
          return;
        }
        u = new ResizeObserver(() => {
          V() && (u?.disconnect(), u = null, Y().then(K));
        }), u.observe(ie);
      });
    }, ce = () => c?.resize(), xe = () => {
      window.removeEventListener("resize", ce), u?.disconnect(), u = null, c && (c.dispose(), c = null);
    };
    return Je(() => le()), Mi(xe), Te(() => a.data, U, { deep: !0 }), Te(n, U), Te(s, U), t({ isDark: n }), (K, ie) => (f(), x("div", Tm, [
      r.value ? (f(), x("div", {
        key: 0,
        class: "error-state",
        style: _e({ height: e.height })
      }, [...ie[0] || (ie[0] = [
        no('<div class="error-content" data-v-c2130602><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2130602><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c2130602></path></svg><p class="error-title" data-v-c2130602>Chart could not be loaded</p><p class="error-description" data-v-c2130602>Please check the data format.</p></div>', 1)
      ])], 4)) : (f(), x("div", {
        key: 1,
        class: "chart-wrapper",
        style: _e({ height: e.height })
      }, [
        d("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (f(), x("div", Bm, [...ie[1] || (ie[1] = [
          no('<div class="loading-container" data-v-c2130602><div class="sankey-loader" data-v-c2130602><div class="flow flow-1" data-v-c2130602></div><div class="flow flow-2" data-v-c2130602></div><div class="flow flow-3" data-v-c2130602></div><div class="flow flow-4" data-v-c2130602></div></div><p class="loading-text" data-v-c2130602>Loading Sankey diagram...</p></div>', 1)
        ])])) : P("", !0)
      ], 4))
    ]));
  }
}), Yt = /* @__PURE__ */ be(Lm, [["__scopeId", "data-v-c2130602"]]), Rm = ["open"], Im = { class: "card-header metric-collapsible__summary" }, Pm = { class: "header-content metric-header-content" }, Em = { class: "metric-header-content__main" }, Om = { class: "metric-header-content__text" }, Fm = { class: "metric-header-content__loaded" }, Vm = {
  key: 0,
  class: "card-title"
}, Nm = {
  key: 0,
  class: "card-subtitle"
}, zm = {
  key: 0,
  class: "metric-header-content__export"
}, jm = {
  key: 0,
  class: "cmc-header-aside"
}, Hm = {
  key: 0,
  class: "chart-metric-container__body"
}, Wm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Km = { key: "body-content" }, Um = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Ym = { class: "card-header" }, qm = { class: "header-content metric-header-content" }, Xm = { class: "metric-header-content__main" }, Gm = { class: "metric-header-content__text" }, Zm = { class: "metric-header-content__loaded" }, Qm = {
  key: 0,
  class: "card-title"
}, Jm = {
  key: 0,
  class: "card-subtitle"
}, ep = {
  key: 0,
  class: "metric-header-content__export"
}, tp = {
  key: 0,
  class: "cmc-header-aside"
}, ap = {
  key: 0,
  class: "chart-metric-container__body"
}, np = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, op = { key: "body-content" }, sp = /* @__PURE__ */ fe({
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
    const s = ne(null), i = ne(o(a.defaultOpen)), l = ne(o(a.defaultOpen)), r = mo();
    function c(m) {
      return m.some((v) => {
        if (v.type === er) return !1;
        if (v.type === Text) {
          const p = v.children;
          return typeof p == "string" && p.trim().length > 0;
        }
        return !!v.type;
      });
    }
    const u = C(() => a.collapsible ? a.lazyMount ? l.value : i.value : !0), g = C(() => a.loading && u.value), h = C(() => {
      if (a.collapsible && !i.value) return !1;
      const m = r.headerExport;
      return m ? c(m()) : !1;
    });
    Te(
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
    return (m, v) => e.collapsible ? (f(), x("details", {
      key: 0,
      ref_key: "detailsRef",
      ref: s,
      class: "chart-metric-container metric-collapsible",
      open: i.value ? !0 : void 0,
      onToggle: b
    }, [
      d("summary", Im, [
        d("div", Pm, [
          d("div", Em, [
            d("div", Om, [
              d("div", Fm, [
                ke(m.$slots, "title", {}, () => [
                  e.title ? (f(), x("h3", Vm, A(e.title), 1)) : P("", !0)
                ], !0),
                e.subtitle ? (f(), x("p", Nm, A(e.subtitle), 1)) : P("", !0),
                ke(m.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            h.value ? (f(), x("div", zm, [
              ke(m.$slots, "headerExport", {}, void 0, !0)
            ])) : P("", !0)
          ]),
          m.$slots.headerAside ? (f(), x("div", jm, [
            ke(m.$slots, "headerAside", {}, void 0, !0)
          ])) : P("", !0)
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
      u.value ? (f(), x("div", Hm, [
        z(ct, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            g.value ? (f(), x("div", Wm, [
              ke(m.$slots, "loading", {}, () => [
                v[1] || (v[1] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (f(), x("div", Km, [
              ke(m.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : P("", !0)
    ], 40, Rm)) : (f(), x("div", Um, [
      d("div", Ym, [
        d("div", qm, [
          d("div", Xm, [
            d("div", Gm, [
              d("div", Zm, [
                ke(m.$slots, "title", {}, () => [
                  e.title ? (f(), x("h3", Qm, A(e.title), 1)) : P("", !0)
                ], !0),
                e.subtitle ? (f(), x("p", Jm, A(e.subtitle), 1)) : P("", !0),
                ke(m.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            h.value ? (f(), x("div", ep, [
              ke(m.$slots, "headerExport", {}, void 0, !0)
            ])) : P("", !0)
          ]),
          m.$slots.headerAside ? (f(), x("div", tp, [
            ke(m.$slots, "headerAside", {}, void 0, !0)
          ])) : P("", !0)
        ])
      ]),
      u.value ? (f(), x("div", ap, [
        z(ct, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            g.value ? (f(), x("div", np, [
              ke(m.$slots, "loading", {}, () => [
                v[2] || (v[2] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (f(), x("div", op, [
              ke(m.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : P("", !0)
    ]));
  }
}), $e = /* @__PURE__ */ be(sp, [["__scopeId", "data-v-ade4038f"]]);
function ip(e, t) {
  return f(), x("svg", {
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
function ho(e, t) {
  return f(), x("svg", {
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
function Oo(e, t) {
  return f(), x("svg", {
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
  return f(), x("svg", {
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
function lp(e, t) {
  return f(), x("svg", {
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
  return f(), x("svg", {
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
function Fo(e, t) {
  return f(), x("svg", {
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
function Vo(e, t) {
  return f(), x("svg", {
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
function $l(e, t) {
  return f(), x("svg", {
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
function rp(e, t) {
  return f(), x("svg", {
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
function hi(e, t) {
  return f(), x("svg", {
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
function cp(e, t) {
  return f(), x("svg", {
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
function dp(e, t) {
  return f(), x("svg", {
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
      d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
    })
  ]);
}
function fi(e, t) {
  return f(), x("svg", {
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
function up(e, t) {
  return f(), x("svg", {
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
function No(e, t) {
  return f(), x("svg", {
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
function hp(e, t) {
  return f(), x("svg", {
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
function fp(e, t) {
  return f(), x("svg", {
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
function gp(e, t) {
  return f(), x("svg", {
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
function fo(e, t) {
  return f(), x("svg", {
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
const mp = {
  key: 0,
  class: "footer-divider"
}, pp = {
  key: 0,
  class: "export-label"
}, bp = { class: "export-buttons" }, vp = ["disabled"], yp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, xp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, kp = ["disabled"], _p = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, wp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Cp = /* @__PURE__ */ fe({
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
    ), i = (r) => a.formats.includes(r), l = (r) => {
      a.loading || n("export", r);
    };
    return (r, c) => (f(), te(rt(o.value), {
      class: X(s.value)
    }, {
      default: E(() => [
        e.variant === "footer" ? (f(), x("div", mp)) : P("", !0),
        d("div", {
          class: X(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (f(), x("span", pp, "Export")) : P("", !0),
          d("div", bp, [
            i("pdf") ? (f(), x("button", {
              key: 0,
              type: "button",
              class: X(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => l("pdf"))
            }, [
              e.loading ? (f(), x("svg", yp, [...c[2] || (c[2] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (f(), x("svg", xp, [...c[3] || (c[3] = [
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
            ], 10, vp)) : P("", !0),
            i("csv") ? (f(), x("button", {
              key: 1,
              type: "button",
              class: X(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => l("csv"))
            }, [
              e.loading ? (f(), x("svg", _p, [...c[5] || (c[5] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (f(), x("svg", wp, [...c[6] || (c[6] = [
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
            ], 10, kp)) : P("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), ze = /* @__PURE__ */ be(Cp, [["__scopeId", "data-v-ebfab47f"]]), $p = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Sp = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Mp = { class: "w-full shrink-0 sm:pr-2" }, Dp = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Ap = { class: "max-w-[360px] text-center" }, Tp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Bp = /* @__PURE__ */ fe({
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
    }, o = e, s = a, i = (h) => {
      s("export", h);
    }, l = Se(o, "theme"), r = Se(o, "options"), { isDark: c } = Me(l), u = (h) => {
      const b = new Date(h), m = String(b.getDate()).padStart(2, "0"), v = String(b.getMonth() + 1).padStart(2, "0");
      return `${m}-${v}`;
    }, g = C(() => {
      const h = o.data?.agents_by_day || {}, b = Object.keys(h).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const m = b.map((_) => u(_)), v = /* @__PURE__ */ new Set();
      for (const _ of Object.values(h))
        for (const w of Object.keys(_))
          v.add(w);
      const p = Array.from(v), y = (_) => _, k = p.map((_) => ({
        label: _,
        data: b.map((w) => h[w]?.[_] || 0),
        backgroundColor: `${n[_] || "#94a3b8"}80`,
        borderColor: y(n[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: m,
        datasets: k
      };
    });
    return t({ isDark: c }), (h, b) => (f(), te($e, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", $p, [
          z(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              g.value.labels && g.value.labels.length ? (f(), x("section", Sp, [
                d("div", Mp, [
                  z($t, {
                    data: g.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (f(), x("section", Dp, [
                d("div", Ap, [
                  d("div", Tp, [
                    z(B(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), Lp = /* @__PURE__ */ be(Bp, [["__scopeId", "data-v-f8d0ec91"]]), Rp = { class: "flex w-full min-w-0 justify-center" }, Ip = { class: "flex max-w-full min-w-0 items-center gap-2" }, Pp = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, Ep = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Op = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Fp = /* @__PURE__ */ fe({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (f(), x("div", {
      class: X(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      d("div", Rp, [
        d("div", Ip, [
          e.color ? (f(), x("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: _e({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : P("", !0),
          d("span", Pp, A(e.title), 1)
        ])
      ]),
      d("p", Ep, A(e.value), 1),
      e.subvalue ? (f(), x("p", Op, A(e.subvalue), 1)) : P("", !0)
    ], 2));
  }
}), ve = /* @__PURE__ */ be(Fp, [["__scopeId", "data-v-0d546967"]]), Sl = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function Ml(e, t) {
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
const Vp = {
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
      () => Ml(t.color, t.outlined)
    );
    return (l, r) => a.value ? (f(), x("span", {
      key: 0,
      role: "status",
      class: X(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (f(), x("span", Vp, [...r[0] || (r[0] = [
        d("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        d("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : P("", !0),
      d("span", {
        class: X(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (f(), x("span", {
      key: 1,
      class: X([B(Sl), i.value])
    }, [
      ke(l.$slots, "default", {}, () => [
        De(A(e.label), 1)
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
}, Np = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, zp = { class: "overflow-x-auto" }, jp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Hp = ["aria-sort", "onClick"], Wp = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Kp = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Up = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Yp = /* @__PURE__ */ fe({
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
    function c(w, $) {
      return w[$];
    }
    function u(w, $) {
      if (typeof a.rowKey == "function")
        return a.rowKey(w);
      const D = w[a.rowKey];
      return typeof D == "string" || typeof D == "number" ? D : $;
    }
    function g(w, $) {
      return u(w, $);
    }
    function h(w) {
      return a.sortKey === w && a.sortDirection != null;
    }
    function b(w) {
      n("sort", w);
    }
    function m(w) {
      return h(w) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const v = C(() => a.rows?.length ?? 0), p = C(() => v.value > a.maxVisibleRows), y = C(() => Math.max(0, v.value - a.maxVisibleRows)), k = C(() => a.rows?.length ? o.value || !p.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), _ = C(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(y.value))
    );
    return (w, $) => (f(), x("div", Np, [
      d("div", zp, [
        d("table", jp, [
          d("thead", null, [
            d("tr", null, [
              (f(!0), x(he, null, pe(e.columns, (D) => (f(), x("th", {
                key: D.key,
                scope: "col",
                class: X(["kiut-table-th whitespace-nowrap px-3 py-2 text-[#9191a1]", [l(D.align), D.headerClass]])
              }, [
                D.sortable ? (f(), x("button", {
                  key: 0,
                  type: "button",
                  class: X(["kiut-table-sort-btn inline-flex items-center gap-1", l(D.align)]),
                  "aria-sort": m(D.key),
                  onClick: (M) => b(D.key)
                }, [
                  d("span", null, A(D.label), 1),
                  d("span", Wp, [
                    h(D.key) ? (f(), x(he, { key: 0 }, [
                      e.sortDirection === "asc" ? (f(), x("span", Kp, "↑")) : e.sortDirection === "desc" ? (f(), x("span", Up, "↓")) : P("", !0)
                    ], 64)) : (f(), x(he, { key: 1 }, [
                      $[1] || ($[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Hp)) : (f(), x(he, { key: 1 }, [
                  De(A(D.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (f(!0), x(he, null, pe(k.value, (D, M) => (f(), x("tr", {
              key: g(D, M)
            }, [
              (f(!0), x(he, null, pe(e.columns, (O) => (f(), x("td", {
                key: `${M}-${O.key}`,
                class: X(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(O.align), O.cellClass]])
              }, [
                ke(w.$slots, r(O.key), {
                  row: D,
                  column: O,
                  value: c(D, O.key)
                }, () => [
                  De(A(i(c(D, O.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      p.value ? (f(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (D) => o.value = !o.value)
      }, [
        De(A(o.value ? e.viewLessLabel : _.value) + " ", 1),
        (f(), x("svg", {
          class: X(["view-more-icon", { "view-more-icon-rotated": o.value }]),
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
      ])) : P("", !0)
    ]));
  }
}), pt = /* @__PURE__ */ be(Yp, [["__scopeId", "data-v-7bdbf1bb"]]), qp = {
  key: "error",
  class: "error-state"
}, Xp = { class: "error-content" }, Gp = { class: "error-description" }, Zp = {
  key: "content",
  class: "card-body"
}, Qp = { class: "chart-section" }, Jp = { class: "chart-wrapper" }, e0 = { class: "payment-success-summary" }, t0 = {
  key: 0,
  class: "booking-daily-section"
}, a0 = { class: "w-full min-w-0" }, n0 = { class: "font-medium" }, o0 = { class: "percentage-text" }, s0 = { class: "badges-container" }, i0 = {
  key: 0,
  class: "badges-container"
}, l0 = {
  key: 1,
  class: "percentage-text"
}, r0 = { class: "badges-container" }, c0 = {
  key: 1,
  class: "empty-state"
}, d0 = /* @__PURE__ */ fe({
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
    }, i = C(() => n.data?.booking_manager_by_day ? [...n.data.booking_manager_by_day].sort(
      (p, y) => new Date(p.date).getTime() - new Date(y.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated by agent", align: "center" },
      { key: "started", label: "Booking Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Started", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "center" },
      { key: "paymentValue", label: "Payment Value", align: "center" },
      { key: "outcomes", label: "Outcomes", align: "center" }
    ], r = C(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = C(() => n.data?.total_payment_success_value || []), u = C(() => {
      const p = c.value;
      return p.length === 0 ? b(0) : p.map(
        (y) => `${y.currency} ${b(y.total_value)}`
      ).join(" · ");
    }), g = (p) => p.payment_success_value || [], h = (p) => typeof p.payment_success_count == "number" ? p.payment_success_count : (p.payment_success_value || []).reduce(
      (y, k) => y + (k.count || 0),
      0
    ), b = (p) => p == null ? "0" : Xt(p);
    C(() => (n.data?.total_payment_success_value || []).reduce(
      (p, y) => p + (y.total_value || 0),
      0
    ));
    const m = C(() => {
      const p = n.data, y = p.total_booking_initiated || 0, k = p.total_booking_started || 0, _ = p.total_payment_initiated || 0, w = p.total_not_found || 0, $ = p.total_cancelled || 0, D = p.total_no_pending_balance || 0, M = p.total_errors || 0, O = typeof p.total_payment_success == "number" ? p.total_payment_success : (p.total_payment_success_value || []).reduce(
        (H, Q) => H + (Q.count || 0),
        0
      ), N = p.total_payment_failed || 0, W = Math.max(0, y - k), S = Math.max(
        0,
        k - _ - w - $ - D - M
      ), L = (H, Q) => ye(H, Q), T = [
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
        label: L(k, y)
      }), W > 0 && j.push({
        source: "Initiated by agent",
        target: "Abandoned: No Response",
        value: W,
        label: L(W, y)
      }), _ > 0 && j.push({
        source: "Booking Started",
        target: "Payment Started",
        value: _,
        label: L(_, y)
      }), w > 0 && j.push({
        source: "Booking Started",
        target: "Not Found",
        value: w,
        label: L(w, y)
      }), $ > 0 && j.push({
        source: "Booking Started",
        target: "Cancelled",
        value: $,
        label: L($, y)
      }), D > 0 && j.push({
        source: "Booking Started",
        target: "No Pending Balance",
        value: D,
        label: L(D, y)
      }), M > 0 && j.push({
        source: "Booking Started",
        target: "Errors",
        value: M,
        label: L(M, y)
      }), S > 0 && j.push({
        source: "Booking Started",
        target: "Abandoned (Start)",
        value: S,
        label: L(S, y)
      }), O > 0 && j.push({
        source: "Payment Started",
        target: "Booking Success",
        value: O,
        label: L(O, y)
      }), N > 0 && j.push({
        source: "Payment Started",
        target: "Error: Payment Failed",
        value: N,
        label: L(N, y)
      }), { nodes: T, links: j };
    }), v = (p, y) => Et(p, y);
    return (p, y) => (f(), te($e, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: y[0] || (y[0] = (k) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading && !n.error ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        z(ct, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            n.error ? (f(), x("div", qp, [
              d("div", Xp, [
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
                d("p", Gp, A(n.error), 1)
              ])
            ])) : (f(), x("div", Zp, [
              d("section", Qp, [
                d("div", Jp, [
                  z(Yt, {
                    data: m.value,
                    height: "400px",
                    "use-gradient": !1,
                    "node-gap": 16
                  }, null, 8, ["data"])
                ])
              ]),
              d("section", e0, [
                z(ve, {
                  color: "#22c55e",
                  title: "Booking Success Value",
                  value: u.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (f(), x("section", t0, [
                y[3] || (y[3] = d("div", { class: "section-header" }, [
                  d("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                d("div", a0, [
                  z(pt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": E(({ row: k }) => [
                      d("span", n0, A(B(Ne)(String(k.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": E(({ row: k }) => [
                      d("span", null, A(B(ge)(Number(k.booking_initiated_count))), 1)
                    ]),
                    "cell-started": E(({ row: k }) => [
                      d("span", null, [
                        De(A(B(ge)(Number(k.booking_started_count))) + " ", 1),
                        d("span", o0, " (" + A(v(
                          Number(k.booking_started_count),
                          Number(k.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": E(({ row: k }) => [
                      d("span", null, A(B(ge)(Number(k.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": E(({ row: k }) => [
                      d("div", s0, [
                        z(Xe, { color: "success" }, {
                          default: E(() => [
                            De(" Booking Success: " + A(B(ge)(
                              h(k)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Xe, { color: "danger" }, {
                          default: E(() => [
                            De(" Payment Failed: " + A(B(ge)(Number(k.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": E(({ row: k }) => [
                      g(k).length > 0 ? (f(), x("div", i0, [
                        (f(!0), x(he, null, pe(g(
                          k
                        ), (_) => (f(), x("span", {
                          key: `${k.date}-${_.currency}`,
                          class: "badge badge-currency"
                        }, A(_.currency) + " " + A(b(_.total_value)), 1))), 128))
                      ])) : (f(), x("span", l0, "N/A"))
                    ]),
                    "cell-outcomes": E(({ row: k }) => [
                      d("div", r0, [
                        z(Xe, { color: "danger" }, {
                          default: E(() => [
                            De(" Not Found: " + A(k.not_found_count ? B(ge)(Number(k.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Xe, { color: "warning" }, {
                          default: E(() => [
                            De(" Cancelled: " + A(k.cancelled_count ? B(ge)(Number(k.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Xe, { color: "orange" }, {
                          default: E(() => [
                            De(" No Balance: " + A(k.no_pending_balance_count ? B(ge)(Number(k.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Xe, { color: "danger" }, {
                          default: E(() => [
                            De(" Errors: " + A(k.error_count ? B(ge)(Number(k.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (f(), x("section", c0, [...y[4] || (y[4] = [
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
}), u0 = /* @__PURE__ */ be(d0, [["__scopeId", "data-v-e1f0043e"]]), h0 = { class: "card-body" }, f0 = {
  key: 0,
  class: "chart-section"
}, g0 = { class: "chart-wrapper" }, m0 = {
  key: 1,
  class: "checkin-daily-section"
}, p0 = { class: "w-full min-w-0" }, b0 = { class: "font-medium" }, v0 = { class: "cell-success" }, y0 = { class: "cell-danger" }, x0 = {
  key: 0,
  class: "reasons-list"
}, k0 = { class: "reason-name" }, _0 = { class: "reason-count" }, w0 = {
  key: 1,
  class: "no-reasons"
}, C0 = {
  key: 2,
  class: "empty-state"
}, $0 = {
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
    }, u = C(
      () => o.showPaymentLinks ? [...r, c] : r
    ), g = C(
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
    ), h = C(() => {
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
    }), m = (w, $) => !$ || $ === 0 ? "0.0%" : Et(w, $), v = (w, $) => {
      const D = ge(w), M = m(w, $);
      return `${D} (${M})`;
    }, p = (w) => w.reduce(($, D) => $ + D.failed_count, 0), y = C(() => {
      const w = [], $ = [], D = /* @__PURE__ */ new Set(), M = (ee, G = {}) => {
        D.has(ee) || (w.push({ name: ee, ...G }), D.add(ee));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: w, links: $ };
      M("Checkin Init", { value: h.value.total_checkin_initiated }), M("Booking retrive"), M("Booking retrive success"), M("Number of Passengers"), M("Completed"), M("Closed with BP");
      const O = h.value.total_checkin_initiated, N = h.value.total_checkin_init, W = h.value.total_checkin_init_abandoned || 0, S = h.value.total_checkin_pre_init_abandoned_error, L = h.value.total_checkin_pre_init_abandoned_voluntary, T = S != null || L != null, j = T ? Math.max(Number(S) || 0, 0) : 0, H = T ? Math.max(Number(L) || 0, 0) : 0, Q = h.value.total_checkin_init_abandoned_error, re = h.value.total_checkin_init_abandoned_voluntary, ue = Q != null || re != null, q = ue ? Math.max(Number(Q) || 0, 0) : 0, oe = ue ? Math.max(Number(re) || 0, 0) : 0, R = ue ? Math.max(W - q - oe, 0) : W, U = N - W, Y = h.value.total_checkin_started, V = h.value.total_checkin_completed, le = h.value.total_checkin_closed, ce = b.value.unrecovered_by_step || [], xe = ce.reduce(
        (ee, G) => ee + G.count,
        0
      );
      N > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: N,
        label: ye(N, O)
      });
      const K = O - N;
      T ? (H > 0 && (M("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: H,
        label: ye(H, O)
      })), j > 0 && (M("Booking not retreived", { status: "error" }), $.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: j,
        label: ye(j, O)
      }))) : K > 0 && (M("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: ye(K, O)
      })), ue ? (q > 0 && (M("Error", { status: "error" }), $.push({
        source: "Booking retrive",
        target: "Error",
        value: q,
        label: ye(q, O)
      })), oe > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: oe,
        label: ye(oe, O)
      })), R > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: R,
        label: ye(R, O)
      }))) : W > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: W,
        label: ye(W, O)
      })), U > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: U,
        label: ye(U, O)
      }), Y > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: Y,
        label: ye(Y, O)
      }), V > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: V,
        label: ye(V, O)
      }), ce.length > 0 && xe > 0 && (M("Unrecovered", { status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: xe,
        label: ye(xe, O)
      }), ce.forEach((ee, G) => {
        const Z = ee.step_name.replace(/_/g, " ").split(" ").map((ae) => ae.charAt(0).toUpperCase() + ae.slice(1)).join(" ");
        M(Z, { status: "error", order: G + 1 }), $.push({
          source: "Unrecovered",
          target: Z,
          value: ee.count,
          label: ye(ee.count, O)
        });
      }));
      const ie = Y - (V + xe);
      ie > 0 && (M("Abandoned (Flow)", { status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: ie,
        label: ye(ie, O)
      }));
      const de = V - le;
      return de > 0 && (M("BP Error", { status: "error", order: 0 }), $.push({
        source: "Completed",
        target: "BP Error",
        value: de,
        label: ye(de, O)
      })), le > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: le,
        label: ye(le, O)
      }), { nodes: w, links: $ };
    }), k = () => {
      const w = o.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, _ = () => {
      const w = h.value.checkin_by_day || [], $ = b.value.failed_by_step_by_day || [], D = k();
      if (w.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...w].map((M) => {
        const O = $.find(
          (W) => W.date === M.date
        ), N = D.find(
          (W) => W.date === M.date
        );
        return {
          ...M,
          failed_steps: O?.steps || [],
          record_locator_create_payment_count: M.record_locator_create_payment_count ?? N?.record_locator_create_payment_count ?? 0
        };
      }), l.value.sort((M, O) => new Date(M.date) - new Date(O.date));
    };
    return Te(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (w, $) => (f(), te($e, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", h0, [
          y.value.nodes.length > 0 ? (f(), x("section", f0, [
            d("div", g0, [
              z(Yt, {
                data: y.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : P("", !0),
          l.value && l.value.length > 0 ? (f(), x("section", m0, [
            d("div", p0, [
              z(pt, {
                columns: u.value,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: D }) => [
                  d("span", b0, A(B(Ne)(String(D.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: D }) => [
                  d("span", null, A(B(ge)(D.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: D }) => [
                  d("span", null, A(v(
                    D.checkin_init_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": E(({ row: D }) => [
                  d("span", null, A(B(ge)(D.checkin_started_count)), 1)
                ]),
                "cell-completed": E(({ row: D }) => [
                  d("span", null, A(v(
                    D.checkin_completed_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: D }) => [
                  d("span", v0, A(v(
                    D.checkin_closed_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-failed": E(({ row: D }) => [
                  d("span", y0, A(v(
                    p(D.failed_steps),
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": E(({ row: D }) => [
                  D.failed_steps && D.failed_steps.length > 0 ? (f(), x("div", x0, [
                    (f(!0), x(he, null, pe(D.failed_steps, (M) => (f(), x("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      d("span", k0, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      d("span", _0, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (f(), x("div", w0, "-"))
                ]),
                "cell-createPayment": E(({ row: D }) => [
                  d("span", null, A(B(ge)(D.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (f(), x("section", C0, [...$[0] || ($[0] = [
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
}, S0 = /* @__PURE__ */ be($0, [["__scopeId", "data-v-ae5fc0f7"]]), M0 = { class: "card-body" }, D0 = {
  key: 0,
  class: "sankey-section"
}, A0 = {
  key: 1,
  class: "empty-state"
}, T0 = { class: "empty-state-content" }, B0 = { class: "empty-icon-wrapper" }, L0 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (g) => {
      o("export", g);
    }, { isDark: i } = Me(Se(n, "theme")), l = /* @__PURE__ */ new Set([
      "choose_boardingpass",
      "boarding_pass",
      "generate_boarding_pass"
    ]), r = (g) => {
      if (!g) return !1;
      const h = g.toLowerCase().trim();
      return l.has(h) || h.includes("boarding_pass");
    }, c = (g) => {
      const h = g?.failed_by_step_by_day || [];
      let b = 0;
      for (const m of h)
        for (const v of m.steps || [])
          r(v.step_name) && (b += v.failed_count || 0);
      if (b > 0) return b;
      for (const m of g?.unrecovered_by_step || [])
        r(m.step_name) && (b += m.count || 0);
      return b;
    }, u = C(() => {
      const g = [], h = [], b = /* @__PURE__ */ new Set(), m = (ee, G = {}) => {
        b.has(ee) || (g.push({ name: ee, ...G }), b.add(ee));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: g, links: h };
      const v = n.checkinData.total_checkin_initiated || 0;
      m("Initiated by agent", { value: v }), m("Check In Started"), m("Check In Success"), m("Boarding Pass Issued");
      const p = n.checkinData.total_record_locator_init || 0, y = n.checkinData.total_record_locator_init_abandoned || 0, k = n.checkinData.total_checkin_pre_init_abandoned_error, _ = n.checkinData.total_checkin_pre_init_abandoned_voluntary, w = k != null || _ != null, $ = w ? Math.max(Number(k) || 0, 0) : 0, D = w ? Math.max(Number(_) || 0, 0) : 0, M = n.checkinData.total_record_locator_init_abandoned_error, O = n.checkinData.total_record_locator_init_abandoned_voluntary, N = M != null || O != null, W = N ? Math.max(Number(M) || 0, 0) : 0, S = N ? Math.max(Number(O) || 0, 0) : 0, L = N ? Math.max(y - W - S, 0) : y, T = Math.max(p - y, 0), j = n.checkinData.total_record_locator_started || 0, H = n.checkinData.total_record_locator_completed || 0, Q = n.checkinData.total_record_locator_closed || 0, re = n.checkinData.total_record_locator_unrecovered || 0, ue = Math.max(v - p, 0), q = $ + W, oe = w ? D + (N ? S + L : y) : ue + (N ? S + L : y);
      T > 0 && h.push({
        source: "Initiated by agent",
        target: "Check In Started",
        value: T,
        label: ye(T, v)
      }), oe > 0 && (m("Abandoned: No booking provided", { status: "abandon" }), h.push({
        source: "Initiated by agent",
        target: "Abandoned: No booking provided",
        value: oe,
        label: ye(oe, v)
      }));
      const R = n.checkinData.total_checkin_retrieval_user_error, U = n.checkinData.total_checkin_retrieval_business_rule, Y = n.checkinData.total_checkin_retrieval_tech_error, V = n.checkinData.total_checkin_retrieval_unknown_error, le = R != null || U != null || Y != null || V != null, ce = (ee, G) => {
        const I = Math.max(Number(G) || 0, 0);
        I > 0 && (m(ee, { status: "error" }), h.push({
          source: "Initiated by agent",
          target: ee,
          value: I,
          label: ye(I, v)
        }));
      };
      le ? (ce("Error: User error", R), ce("Error: Business rule", U), ce("Error: Tech error", Y), ce("Error: Unknown error", V)) : q > 0 && (m("Error: On Retrieval", { status: "error" }), h.push({
        source: "Initiated by agent",
        target: "Error: On Retrieval",
        value: q,
        label: ye(q, v)
      })), Q > 0 && h.push({
        source: "Check In Started",
        target: "Check In Success",
        value: Q,
        label: ye(Q, v)
      });
      const xe = c(n.failedData), K = Math.min(xe, Math.max(Q - H, 0));
      H > 0 && h.push({
        source: "Check In Success",
        target: "Boarding Pass Issued",
        value: H,
        label: ye(H, v)
      }), K > 0 && (m("Error: BP Not Issued", { status: "error" }), h.push({
        source: "Check In Success",
        target: "Error: BP Not Issued",
        value: K,
        label: ye(K, v)
      }));
      const ie = Math.max(Q - H - K, 0);
      if (ie > 0) {
        const ee = n.isAvianca ? "Abandoned after Closed" : "Abandoned: Check In Incomplete";
        m(ee, { status: "abandon" }), h.push({
          source: "Check In Success",
          target: ee,
          value: ie,
          label: ye(ie, v)
        });
      }
      re > 0 && (m("Error: On Check In Process", { status: "error" }), h.push({
        source: "Check In Started",
        target: "Error: On Check In Process",
        value: re,
        label: ye(re, v)
      }));
      const de = Math.max(j - Q - re, 0);
      return de > 0 && (m("Abandoned: Check In Incomplete", { status: "abandon" }), h.push({
        source: "Check In Started",
        target: "Abandoned: Check In Incomplete",
        value: de,
        label: ye(de, v)
      })), { nodes: g, links: h };
    });
    return t({ isDark: i }), (g, h) => (f(), te($e, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": n.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", M0, [
          u.value.nodes.length > 0 ? (f(), x("div", D0, [
            z(Yt, {
              data: u.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : (f(), x("div", A0, [
            d("div", T0, [
              d("div", B0, [
                z(B(dt), { class: "empty-icon" })
              ]),
              h[0] || (h[0] = d("p", { class: "empty-title" }, "No check-in data available", -1)),
              h[1] || (h[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), Dl = /* @__PURE__ */ be(L0, [["__scopeId", "data-v-5a03deab"]]);
function Rn(e, t) {
  return f(), x("svg", {
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
function R0(e, t) {
  return f(), x("svg", {
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
const ut = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", et = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", I0 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Dt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", At = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", P0 = "kiut-select-option-badge shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.6875rem] font-medium leading-4";
function gi(e = "neutral") {
  return `${P0} kiut-select-option-badge--${e}`;
}
const E0 = { class: "flex flex-row gap-3 items-center" }, O0 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, F0 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], V0 = { class: "flex min-w-0 flex-1 items-center gap-2.5 truncate" }, N0 = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, z0 = { class: "relative" }, j0 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, H0 = ["placeholder", "aria-label"], W0 = {
  key: 1,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, K0 = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, U0 = ["aria-selected", "onClick", "onMouseenter"], Y0 = {
  key: 1,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, q0 = { class: "min-w-0 flex-1 truncate" }, Tt = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-select-${Ke()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = `${o}-err`, c = C(() => a.invalid ?? !1), u = ne(null), g = ne(null), h = ne(null), b = ne(null), m = ne(null), v = ne(!1), p = ne(0), y = ne(""), k = ne({});
    function _() {
      const V = g.value;
      if (!V) return;
      const le = V.getBoundingClientRect();
      k.value = {
        top: `${le.bottom - 3}px`,
        left: `${le.left}px`,
        width: `${le.width}px`
      };
    }
    const w = C(() => a.options.filter((V) => !V.disabled)), $ = C(() => {
      if (!a.searchable) return w.value;
      const V = y.value.trim().toLowerCase();
      return V ? w.value.filter(
        (le) => le.label.toLowerCase().includes(V) || le.badge?.label.toLowerCase().includes(V)
      ) : w.value;
    }), D = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), M = C(
      () => a.options.find((V) => V.value === a.modelValue) ?? null
    ), O = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : M.value?.label ?? String(a.modelValue)), N = C(() => M.value?.leadingClass);
    function W(V) {
      return `${String(V.value)}-${V.label}`;
    }
    function S(V) {
      return a.modelValue === V.value;
    }
    function L(V, le) {
      const ce = S(V), xe = p.value === le, K = !!a.listSectionLabel;
      return [
        "flex cursor-pointer items-center gap-2.5 text-sm outline-none transition-colors",
        K ? "border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-white/5" : "gap-1.5 px-2 py-2",
        ce ? K ? "bg-[color:var(--kiut-primary-section)] font-medium text-[color:var(--kiut-primary)] dark:bg-[color:var(--kiut-primary-section)]" : "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && xe ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function T() {
      p.value = Math.max(
        0,
        $.value.findIndex((V) => V.value === a.modelValue)
      );
    }
    function j() {
      if (a.searchable) {
        m.value?.focus();
        return;
      }
      b.value?.focus();
    }
    function H() {
      _(), y.value = "", T(), We(() => j());
    }
    function Q() {
      v.value = !1, y.value = "";
    }
    function re(V) {
      n("update:modelValue", V.value), Q();
    }
    function ue() {
      if (!a.disabled) {
        if (v.value) {
          Q();
          return;
        }
        v.value = !0, H();
      }
    }
    function q(V) {
      V.stopPropagation(), !a.disabled && ue();
    }
    function oe(V) {
      if (!v.value) return;
      const le = V.target, ce = u.value, xe = h.value;
      ce && !ce.contains(le) && (!xe || !xe.contains(le)) && Q();
    }
    function R(V) {
      a.disabled || (V.key === "ArrowDown" || V.key === "Enter" || V.key === " ") && (V.preventDefault(), v.value || (v.value = !0, H()));
    }
    function U(V) {
      const le = $.value;
      if (V.key === "Escape") {
        V.preventDefault(), Q();
        return;
      }
      if (V.key === "ArrowDown") {
        if (V.preventDefault(), le.length === 0) return;
        p.value = 0, b.value?.focus();
        return;
      }
      if (V.key === "ArrowUp") {
        if (V.preventDefault(), le.length === 0) return;
        p.value = le.length - 1, b.value?.focus();
        return;
      }
      if (V.key === "Enter") {
        V.preventDefault();
        const ce = le[p.value];
        ce && re(ce);
      }
    }
    function Y(V) {
      const le = $.value;
      if (V.key === "Escape") {
        V.preventDefault(), Q();
        return;
      }
      if (le.length !== 0) {
        if (V.key === "ArrowDown") {
          V.preventDefault(), p.value = Math.min(p.value + 1, le.length - 1);
          return;
        }
        if (V.key === "ArrowUp") {
          if (V.preventDefault(), p.value === 0 && a.searchable) {
            m.value?.focus();
            return;
          }
          p.value = Math.max(p.value - 1, 0);
          return;
        }
        if (V.key === "Enter") {
          V.preventDefault();
          const ce = le[p.value];
          ce && re(ce);
        }
      }
    }
    return Te(y, () => {
      p.value = 0;
    }), Je(() => {
      document.addEventListener("click", oe);
    }), at(() => {
      document.removeEventListener("click", oe);
    }), (V, le) => (f(), x("div", {
      ref_key: "rootRef",
      ref: u,
      class: "relative font-sans"
    }, [
      d("div", E0, [
        V.$slots.icon ? (f(), x("span", O0, [
          ke(V.$slots, "icon")
        ])) : P("", !0),
        e.label ? (f(), x("label", {
          key: 1,
          id: s,
          class: X(B(ut))
        }, A(e.label), 3)) : P("", !0)
      ]),
      d("button", {
        ref_key: "buttonRef",
        ref: g,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: X([
          B(et),
          c.value ? B(Dt) : "",
          v.value && !c.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : "",
          "flex items-center justify-between gap-2 text-left"
        ]),
        "aria-expanded": v.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : D.value,
        "aria-invalid": c.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r : void 0,
        onClick: q,
        onKeydown: R
      }, [
        d("span", V0, [
          N.value ? (f(), x("span", {
            key: 0,
            class: X([N.value, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : P("", !0),
          M.value?.leadingIcon ? (f(), x("span", {
            key: 1,
            class: X([
              "inline-flex shrink-0 items-center justify-center rounded-full",
              M.value.leadingIconWrapperClass
            ])
          }, [
            (f(), te(rt(M.value.leadingIcon), {
              class: X(["h-4 w-4", M.value.leadingIconClass])
            }, null, 8, ["class"]))
          ], 2)) : P("", !0),
          d("span", {
            class: X([
              "min-w-0 truncate",
              e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
            ])
          }, A(O.value), 3),
          M.value?.badge ? (f(), x("span", {
            key: 2,
            class: X(B(gi)(M.value.badge.variant))
          }, A(M.value.badge.label), 3)) : P("", !0)
        ]),
        z(B(na), {
          class: X(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", v.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, F0),
      e.errorText ? (f(), x("p", {
        key: 0,
        id: r,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 3)) : P("", !0),
      (f(), te(Wt, { to: "body" }, [
        Qe(d("div", {
          ref_key: "panelRef",
          ref: h,
          style: _e(k.value),
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (f(), x("div", N0, [
            d("div", z0, [
              d("span", j0, [
                z(B(No), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
              ]),
              Qe(d("input", {
                ref_key: "searchInputRef",
                ref: m,
                "onUpdate:modelValue": le[0] || (le[0] = (ce) => y.value = ce),
                type: "search",
                class: X([B(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
                placeholder: e.searchPlaceholder,
                "aria-label": e.searchPlaceholder,
                onClick: le[1] || (le[1] = Be(() => {
                }, ["stop"])),
                onKeydown: Be(U, ["stop"])
              }, null, 42, H0), [
                [It, y.value]
              ])
            ])
          ])) : P("", !0),
          e.listSectionLabel ? (f(), x("p", W0, A(e.listSectionLabel), 1)) : P("", !0),
          d("ul", {
            id: l,
            ref_key: "listRef",
            ref: b,
            role: "listbox",
            tabindex: "-1",
            class: X(
              e.listSectionLabel ? "max-h-60 overflow-auto pb-1" : "max-h-60 overflow-auto py-1"
            ),
            onKeydown: Be(Y, ["stop"])
          }, [
            $.value.length === 0 ? (f(), x("li", K0, A(e.noResultsText), 1)) : P("", !0),
            (f(!0), x(he, null, pe($.value, (ce, xe) => (f(), x("li", {
              key: W(ce),
              role: "option",
              "aria-selected": S(ce),
              class: X(L(ce, xe)),
              onClick: Be((K) => re(ce), ["stop"]),
              onMouseenter: (K) => p.value = xe
            }, [
              ce.leadingClass ? (f(), x("span", {
                key: 0,
                class: X([ce.leadingClass, "shrink-0"]),
                "aria-hidden": "true"
              }, null, 2)) : P("", !0),
              e.showOptionCheck ? (f(), x("span", Y0, [
                S(ce) ? (f(), te(B(Rn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : P("", !0)
              ])) : P("", !0),
              ce.leadingIcon ? (f(), x("span", {
                key: 2,
                class: X([
                  "inline-flex shrink-0 items-center justify-center rounded-full",
                  ce.leadingIconWrapperClass
                ])
              }, [
                (f(), te(rt(ce.leadingIcon), {
                  class: X(["h-4 w-4", ce.leadingIconClass])
                }, null, 8, ["class"]))
              ], 2)) : P("", !0),
              d("span", q0, A(ce.label), 1),
              ce.badge ? (f(), x("span", {
                key: 3,
                class: X(B(gi)(ce.badge.variant))
              }, A(ce.badge.label), 3)) : P("", !0)
            ], 42, U0))), 128))
          ], 34)
        ], 4), [
          [Kt, v.value]
        ])
      ]))
    ], 512));
  }
});
function zo(e, t) {
  const a = e[t];
  return Array.isArray(a) ? a.filter(
    (n) => n !== null && typeof n == "object" && !Array.isArray(n)
  ) : [];
}
function Al(e, t) {
  const { childrenKey: a, sortKey: n, sortDirection: o, compare: s } = t;
  return [...e].sort((i, l) => s(i, l, n, o)).map((i) => {
    const l = zo(i, a);
    return l.length === 0 ? i : {
      ...i,
      [a]: Al(l, t)
    };
  });
}
function Tl(e, t, a = 0, n = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: l, maxDepth: r } = t, c = [];
  return e.forEach((u, g) => {
    const h = l(u, o + g), b = zo(u, s), m = b.length > 0, v = i.has(h);
    c.push({
      row: u,
      key: h,
      depth: a,
      hasChildren: m,
      isExpanded: v,
      parentKey: n
    }), m && v && (r === void 0 || a < r) && c.push(
      ...Tl(b, t, a + 1, h, 0)
    );
  }), c;
}
function Bl(e, t, a = 0, n = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, l = [];
  return e.forEach((r, c) => {
    const u = s(r, n + c), g = zo(r, o), h = g.length > 0, b = {
      depth: a,
      isChild: a > 0,
      hasChildren: h
    };
    (i?.(r, b) ?? !0) && l.push(u), g.length > 0 && l.push(
      ...Bl(g, t, a + 1, 0)
    );
  }), l;
}
const X0 = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, G0 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, Z0 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Q0 = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, J0 = ["checked", "aria-label"], eb = ["aria-sort", "onClick"], tb = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, ab = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, nb = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, ob = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, sb = ["checked", "aria-label", "onChange"], ib = ["aria-expanded", "aria-label", "onClick"], lb = ["aria-expanded", "aria-label", "onClick"], rb = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, cb = { class: "min-w-0 flex-1" }, db = /* @__PURE__ */ fe({
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
      set(R) {
        s.value = R, n("update:expandedKeys", R);
      }
    }), l = C(
      () => new Set(i.value)
    ), r = C(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), c = C(() => ({
      childrenKey: a.childrenKey,
      expandedKeys: l.value,
      resolveRowKey: m,
      maxDepth: a.maxDepth
    })), u = C(() => {
      const { sortKey: R, sortDirection: U, sortCompare: Y, rows: V } = a;
      return !R || !U || !Y ? V : a.expandable ? Al(V, {
        childrenKey: a.childrenKey,
        sortKey: R,
        sortDirection: U,
        compare: Y
      }) : [...V].sort((le, ce) => Y(le, ce, R, U));
    }), g = C(() => a.expandable ? Tl(u.value, c.value) : u.value.map((R, U) => ({
      row: R,
      key: m(R, U),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function h(R) {
      return `cell-${R}`;
    }
    function b(R) {
      return R === "center" ? "text-center" : R === "right" ? "text-right" : "text-left";
    }
    function m(R, U) {
      if (typeof a.rowKey == "function")
        return a.rowKey(R);
      const Y = R[a.rowKey];
      return Y != null ? String(Y) : `__index_${U}`;
    }
    function v(R, U) {
      return R[U];
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
    function _(R, U) {
      return {
        row: R.row,
        column: U,
        value: v(R.row, U.key),
        depth: R.depth,
        isChild: R.depth > 0,
        hasChildren: R.hasChildren,
        expanded: R.isExpanded
      };
    }
    function w(R) {
      if (!k(R)) return;
      const U = new Set(i.value);
      U.has(R.key) ? (U.delete(R.key), n("collapse", R.key, R.row)) : (a.singleExpand && U.clear(), U.add(R.key), n("expand", R.key, R.row)), i.value = [...U];
    }
    function $(R) {
      return {
        depth: R.depth,
        isChild: R.depth > 0,
        hasChildren: R.hasChildren
      };
    }
    function D(R, U) {
      return a.isRowSelectable?.(R, U) ?? !0;
    }
    function M(R) {
      return D(R.row, $(R));
    }
    function O(R) {
      return a.selectable && k(R) && !M(R);
    }
    function N(R) {
      return k(R) && !O(R);
    }
    function W(R) {
      return N(R) ? !1 : R.depth > 0 ? !0 : a.selectable && !k(R);
    }
    const S = C(() => {
      const { isRowSelectable: R } = a;
      return a.expandable ? Bl(u.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: m,
        isRowSelectable: R
      }) : u.value.map((U, Y) => ({
        row: U,
        key: m(U, Y),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: U, context: Y }) => D(U, Y)).map(({ key: U }) => U);
    });
    function L(R) {
      const U = String(R);
      return a.selectedKeys.some((Y) => String(Y) === U);
    }
    const T = C(() => !a.selectable || S.value.length === 0 ? !1 : S.value.every(
      (R) => a.selectedKeys.some((U) => String(U) === String(R))
    )), j = C(() => {
      if (!a.selectable || S.value.length === 0) return !1;
      const R = S.value.filter(
        (U) => a.selectedKeys.some((Y) => String(Y) === String(U))
      );
      return R.length > 0 && R.length < S.value.length;
    });
    Te(
      [j, T, () => a.selectable],
      async () => {
        await We();
        const R = o.value;
        R && (R.indeterminate = j.value && !T.value);
      },
      { immediate: !0 }
    );
    function H() {
      if (a.selectable)
        if (T.value) {
          const R = new Set(
            S.value.map((Y) => String(Y))
          ), U = a.selectedKeys.filter(
            (Y) => !R.has(String(Y))
          );
          n("update:selectedKeys", U);
        } else {
          const R = new Set(a.selectedKeys.map((U) => String(U)));
          S.value.forEach((U) => R.add(String(U))), n("update:selectedKeys", [...R]);
        }
    }
    function Q(R) {
      if (!a.selectable) return;
      const U = String(R), Y = g.value.find((le) => String(le.key) === U);
      if (Y && !M(Y) || !Y && !S.value.some((le) => String(le) === U))
        return;
      a.selectedKeys.some((le) => String(le) === U) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((le) => String(le) !== U)
      ) : n("update:selectedKeys", [...a.selectedKeys, U]);
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
    return (R, U) => (f(), x("div", X0, [
      d("div", G0, [
        d("table", {
          class: X([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          d("thead", null, [
            d("tr", Z0, [
              e.selectable ? (f(), x("th", Q0, [
                d("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: T.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: H
                }, null, 40, J0)
              ])) : P("", !0),
              (f(!0), x(he, null, pe(e.columns, (Y) => (f(), x("th", {
                key: Y.key,
                scope: "col",
                class: X([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  y(Y.key) && e.selectable ? "!pl-0" : "",
                  b(Y.align),
                  Y.headerClass ?? ""
                ])
              }, [
                Y.sortable ? (f(), x("button", {
                  key: 0,
                  type: "button",
                  class: X(["kiut-table-sort-btn inline-flex items-center gap-1", b(Y.align)]),
                  "aria-sort": oe(Y.key),
                  onClick: (V) => ue(Y.key)
                }, [
                  d("span", null, A(Y.label), 1),
                  d("span", tb, [
                    q(Y.key) ? (f(), x(he, { key: 0 }, [
                      e.sortDirection === "asc" ? (f(), x("span", ab, "↑")) : e.sortDirection === "desc" ? (f(), x("span", nb, "↓")) : P("", !0)
                    ], 64)) : (f(), x(he, { key: 1 }, [
                      U[0] || (U[0] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      U[1] || (U[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, eb)) : (f(), x(he, { key: 1 }, [
                  De(A(Y.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (f(!0), x(he, null, pe(g.value, (Y) => (f(), x("tr", {
              key: Y.key,
              class: X([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                Y.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (f(), x("td", ob, [
                M(Y) ? (f(), x("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: L(Y.key),
                  "aria-label": re(Y.key),
                  onChange: (V) => Q(Y.key)
                }, null, 40, sb)) : O(Y) ? (f(), x("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": Y.isExpanded,
                  "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Be((V) => w(Y), ["stop"])
                }, [
                  z(B(na), {
                    class: X(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, ib)) : P("", !0)
              ])) : P("", !0),
              (f(!0), x(he, null, pe(e.columns, (V) => (f(), x("td", {
                key: V.key,
                class: X([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  y(V.key) ? "pl-0 pr-2" : "px-2",
                  b(V.align),
                  V.cellClass ?? ""
                ])
              }, [
                y(V.key) ? (f(), x("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: _e({ paddingLeft: `${Y.depth * 1.25}rem` })
                }, [
                  ke(R.$slots, "row-expand", {
                    row: Y.row,
                    expanded: Y.isExpanded,
                    hasChildren: Y.hasChildren,
                    depth: Y.depth,
                    toggle: () => w(Y)
                  }, () => [
                    N(Y) ? (f(), x("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": Y.isExpanded,
                      "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Be((le) => w(Y), ["stop"])
                    }, [
                      z(B(na), {
                        class: X(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, lb)) : W(Y) ? (f(), x("span", rb)) : P("", !0)
                  ], !0),
                  d("div", cb, [
                    ke(R.$slots, h(V.key), yt({ ref_for: !0 }, _(Y, V)), () => [
                      De(A(p(v(Y.row, V.key))), 1)
                    ], !0)
                  ])
                ], 4)) : ke(R.$slots, h(V.key), yt({
                  key: 1,
                  ref_for: !0
                }, _(Y, V)), () => [
                  De(A(p(v(Y.row, V.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), Ll = /* @__PURE__ */ be(db, [["__scopeId", "data-v-b3104817"]]), ub = { class: "error-reasons-table-wrap table-section" }, hb = { class: "metric-cell" }, fb = { class: "metric-cell" }, to = 5, gb = /* @__PURE__ */ fe({
  __name: "ErrorReasonsTable",
  props: {
    rows: {}
  },
  setup(e) {
    const t = e, a = [
      {
        key: "category_label",
        label: "Category / Raw log",
        align: "left",
        headerClass: "w-[58%]",
        cellClass: "error-reasons-label-cell"
      },
      {
        key: "error_count",
        label: "Count",
        align: "center",
        headerClass: "w-[16%]",
        cellClass: "error-reasons-metric-cell"
      },
      {
        key: "percentage",
        label: "%",
        align: "center",
        headerClass: "w-[16%]",
        cellClass: "error-reasons-metric-cell"
      }
    ], n = ne(!1), o = ne([]);
    Te(
      () => t.rows,
      () => {
        n.value = !1, o.value = [];
      }
    );
    const s = C(() => t.rows.length), i = C(() => s.value > to), l = C(() => Math.max(0, s.value - to)), r = C(() => n.value || !i.value ? t.rows : t.rows.slice(0, to)), c = (g) => g.toLocaleString(), u = (g) => `${g.toFixed(1)}%`;
    return (g, h) => (f(), x("div", ub, [
      z(Ll, {
        columns: a,
        rows: r.value,
        "row-key": "id",
        expandable: "",
        "expand-column-key": "category_label",
        "fixed-layout": "",
        "expanded-keys": o.value,
        "onUpdate:expandedKeys": h[0] || (h[0] = (b) => o.value = b)
      }, {
        "cell-category_label": E(({ row: b, depth: m }) => [
          d("span", {
            class: X([
              "category-cell",
              m === 0 ? "category-cell--parent" : "category-cell--child"
            ])
          }, A(b.category_label), 3)
        ]),
        "cell-error_count": E(({ row: b }) => [
          d("span", hb, A(c(Number(b.error_count))), 1)
        ]),
        "cell-percentage": E(({ row: b }) => [
          d("span", fb, A(u(Number(b.percentage))), 1)
        ]),
        _: 1
      }, 8, ["rows", "expanded-keys"]),
      i.value ? (f(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: h[1] || (h[1] = (b) => n.value = !n.value)
      }, [
        De(A(n.value ? "View less" : `View more (${l.value} rows)`) + " ", 1),
        (f(), x("svg", {
          class: X(["view-more-icon", { "view-more-icon-rotated": n.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...h[2] || (h[2] = [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : P("", !0)
    ]));
  }
}), mi = /* @__PURE__ */ be(gb, [["__scopeId", "data-v-0332587f"]]), mb = { class: "stage-select flex justify-end" }, pb = { class: "card-body" }, bb = {
  key: 0,
  class: "error-reasons-content"
}, vb = { class: "total-summary" }, yb = { class: "total-summary__value" }, xb = { class: "total-summary__value" }, kb = { class: "total-summary__value" }, _b = { class: "section-title" }, wb = {
  key: 0,
  class: "section-subtitle"
}, Cb = {
  key: 2,
  class: "section-empty"
}, $b = {
  key: 1,
  class: "table-section"
}, Sb = {
  key: 1,
  class: "empty-state"
}, Mb = { class: "empty-state-content" }, Db = { class: "empty-icon-wrapper" }, Ab = /* @__PURE__ */ fe({
  __name: "CheckinErrorReasons",
  props: {
    initiallyOpen: { type: Boolean, default: !1 },
    collapsible: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    stage: { default: "on_retrieve" },
    errorReasons: { default: null }
  },
  emits: ["update:stage"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = [
      { label: "On Retrieve", value: "on_retrieve" },
      { label: "On Check In Process", value: "on_check_in_process" }
    ], s = (p) => p == null ? "0" : p.toLocaleString(), i = (p) => {
      (p === "on_retrieve" || p === "on_check_in_process") && n("update:stage", p);
    }, l = C(() => a.errorReasons), r = C(() => a.stage === "on_check_in_process"), c = C(() => l.value?.total_errors ?? 0), u = C(() => l.value?.total_unrecovered ?? 0), g = C(() => l.value?.total_bp_not_issued ?? 0), h = (p, y) => ({
      id: `${y}-${p.category_key}`,
      category_label: p.category_label,
      error_count: p.error_count,
      percentage: p.percentage,
      children: (p.raw_logs || []).map((k, _) => ({
        id: `${y}-${p.category_key}-log-${_}`,
        category_label: k.message,
        error_count: k.count,
        percentage: k.percentage_of_total,
        children: []
      }))
    }), b = C(() => (l.value?.categories ?? []).map((y) => h(y, "retrieve"))), m = C(() => {
      const p = l.value?.categories ?? [], y = p.filter((_) => _.outcome_group === "unrecovered"), k = p.filter((_) => _.outcome_group === "bp_not_issued");
      return [
        {
          key: "unrecovered",
          title: "Error: On Check In Process",
          subtitle: "Reservations that failed before PSS close (unrecovered)",
          rows: y.map((_) => h(_, "unrecovered"))
        },
        {
          key: "bp_not_issued",
          title: "Error: BP Not Issued",
          subtitle: "Closed reservations where boarding pass was not issued",
          rows: k.map((_) => h(_, "bp-not-issued"))
        }
      ];
    }), v = C(() => l.value ? (l.value.categories?.length ?? 0) > 0 || l.value.total_errors > 0 : !1);
    return (p, y) => (f(), te($e, {
      class: "checkin-error-reasons-root h-full min-h-0",
      title: "Check-in Error Reasons",
      subtitle: "Each failed event counts once",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerAside: E(() => [
        d("div", mb, [
          z(Tt, {
            "model-value": e.stage,
            options: o,
            "aria-label-trigger": "Check-in error stage",
            "show-option-check": !1,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value"])
        ])
      ]),
      default: E(() => [
        d("div", pb, [
          v.value ? (f(), x("div", bb, [
            d("p", vb, [
              y[4] || (y[4] = De(" Total errors: ", -1)),
              d("span", yb, A(s(c.value)), 1),
              r.value ? (f(), x(he, { key: 0 }, [
                y[0] || (y[0] = d("span", { class: "total-summary__divider" }, "·", -1)),
                y[1] || (y[1] = De(" Unrecovered: ", -1)),
                d("span", xb, A(s(u.value)), 1),
                y[2] || (y[2] = d("span", { class: "total-summary__divider" }, "·", -1)),
                y[3] || (y[3] = De(" BP not issued: ", -1)),
                d("span", kb, A(s(g.value)), 1)
              ], 64)) : P("", !0)
            ]),
            r.value ? (f(!0), x(he, { key: 0 }, pe(m.value, (k) => (f(), x("section", {
              key: k.key,
              class: "table-section error-reasons-section"
            }, [
              d("h4", _b, A(k.title), 1),
              k.subtitle ? (f(), x("p", wb, A(k.subtitle), 1)) : P("", !0),
              k.rows.length > 0 ? (f(), te(mi, {
                key: 1,
                rows: k.rows
              }, null, 8, ["rows"])) : (f(), x("p", Cb, "No errors in this cohort."))
            ]))), 128)) : (f(), x("section", $b, [
              b.value.length > 0 ? (f(), te(mi, {
                key: 0,
                rows: b.value
              }, null, 8, ["rows"])) : P("", !0)
            ]))
          ])) : (f(), x("div", Sb, [
            d("div", Mb, [
              d("div", Db, [
                z(B(dp), { class: "empty-icon" })
              ]),
              y[5] || (y[5] = d("p", { class: "empty-title" }, "No error reasons for this stage", -1)),
              y[6] || (y[6] = d("p", { class: "empty-description" }, " Try another stage or adjust the date range to see terminal check-in failures. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), Tb = /* @__PURE__ */ be(Ab, [["__scopeId", "data-v-a0beb33a"]]), Bb = { class: "card-body" }, Lb = {
  key: 0,
  class: "checkin-segments-daily-section"
}, Rb = { class: "w-full min-w-0" }, Ib = { class: "segment-plain" }, Pb = { class: "segment-plain" }, Eb = { class: "segment-plain" }, Ob = { class: "percentage-value" }, Fb = { class: "percentage-value" }, Vb = { class: "percentage-value success" }, Nb = {
  key: 1,
  class: "empty-state"
}, zb = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (h) => {
      o("export", h);
    }, { isDark: i } = Me(Se(n, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "closed", label: "Check-in Closed (%)", align: "center" },
      { key: "completed", label: "BP Issued (%)", align: "center" }
    ], r = C(
      () => n.data.map((h, b) => ({
        id: `segment-${b}-${h.departure_airport}-${h.arrival_airport}-${h.segment_init_count}-${h.segment_started_count}`,
        departure_airport: h.departure_airport,
        conexion_airport: h.conexion_airport,
        arrival_airport: h.arrival_airport,
        segment_init_count: h.segment_init_count,
        segment_started_count: h.segment_started_count,
        segment_completed_count: h.segment_completed_count,
        segment_closed_count: h.segment_closed_count
      }))
    ), c = (h, b) => !b || b === 0 || !h ? "0%" : `${Math.round(h / b * 100)}%`, u = (h) => !h || h === "None" ? "-" : String(h).trim().replace(/_[0-9]+$/i, ""), g = (h) => {
      const b = u(h?.departure_airport), m = u(h?.arrival_airport);
      return b === "-" || m === "-" ? !1 : b === m;
    };
    return t({ isDark: i }), (h, b) => (f(), te($e, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", Bb, [
          n.data.length > 0 ? (f(), x("section", Lb, [
            d("div", Rb, [
              z(pt, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": E(({ row: m }) => [
                  d("span", Ib, A(u(m.departure_airport)), 1)
                ]),
                "cell-connection": E(({ row: m }) => [
                  d("span", {
                    class: X(["segment-plain", {
                      "segment-plain--muted": u(m.conexion_airport) === "-"
                    }])
                  }, A(u(m.conexion_airport)), 3)
                ]),
                "cell-arrival": E(({ row: m }) => [
                  d("span", Pb, A(u(m.arrival_airport)), 1)
                ]),
                "cell-trip": E(({ row: m }) => [
                  d("span", Eb, A(g(m) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": E(({ row: m }) => [
                  De(A(B(ge)(m.segment_init_count)), 1)
                ]),
                "cell-started": E(({ row: m }) => [
                  d("span", Ob, A(c(
                    m.segment_started_count,
                    m.segment_init_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: m }) => [
                  d("span", Fb, A(c(
                    m.segment_closed_count,
                    m.segment_init_count
                  )), 1)
                ]),
                "cell-completed": E(({ row: m }) => [
                  d("span", Vb, A(c(
                    m.segment_completed_count,
                    m.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (f(), x("section", Nb, [...b[0] || (b[0] = [
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
}), Rl = /* @__PURE__ */ be(zb, [["__scopeId", "data-v-9a9d7a34"]]), jb = { class: "checkin-container__body" }, Hb = /* @__PURE__ */ fe({
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
    return (c, u) => (f(), te($e, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[1] || (u[1] = (g) => n("open"))
    }, {
      default: E(() => [
        d("div", jb, [
          e.showCheckin ? (f(), te(Dl, {
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
            onExport: u[0] || (u[0] = (g) => i("checkin", g))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "is-avianca"])) : P("", !0),
          z(Rl, {
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
}), Wb = /* @__PURE__ */ be(Hb, [["__scopeId", "data-v-bedc6aa8"]]), Kb = { class: "card-body" }, Ub = { class: "chart-section" }, Yb = { class: "chart-wrapper" }, qb = {
  key: 1,
  class: "empty-chart"
}, Xb = { class: "payment-success-summary" }, Gb = {
  key: 0,
  class: "disruption-daily-section"
}, Zb = { class: "w-full min-w-0" }, Qb = { class: "font-medium text-center" }, Jb = { class: "text-center" }, ev = { class: "text-center" }, tv = { class: "percentage-text" }, av = { class: "text-center" }, nv = { class: "abandoned-value" }, ov = { class: "badges-container badges-wrap" }, sv = { class: "badges-container badges-wrap" }, iv = {
  key: 1,
  class: "empty-state"
}, lv = /* @__PURE__ */ fe({
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
    }, i = C(() => n.data?.disruption_by_day ? [...n.data.disruption_by_day].sort(
      (p, y) => new Date(p.date).getTime() - new Date(y.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated by agent", align: "center" },
      { key: "started", label: "Disruption started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "center" },
      { key: "involuntary", label: "Involuntary", align: "center" }
    ], r = C(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = C(() => n.data?.total_payment_success || []), u = C(() => {
      const p = c.value;
      return p.length === 0 ? h(0) : p.map((y) => `${y.currency} ${h(y.total_value)}`).join(" · ");
    }), g = (p, y) => Et(p, y), h = (p) => Oe(p), b = (p) => (p ?? []).reduce((y, k) => y + (k.count ?? 0), 0), m = (p) => typeof p.sell_success_count == "number" ? p.sell_success_count : b(p.payment_success_total), v = C(() => {
      const p = n.data, y = p.total_disruption_conversations || 0, k = p.total_disruption_initiated || 0, _ = p.total_voluntary || 0, w = p.total_involuntary || 0, $ = p.total_accepted || 0, D = p.total_confirmed || 0, M = typeof p.total_sell_success == "number" ? p.total_sell_success : b(p.total_payment_success), O = p.total_sell_failed || 0, N = Math.max(0, y - k), W = Math.max(
        0,
        k - _ - w
      ), S = Math.max(0, w - $), L = Math.max(0, _ - D), T = O, j = Math.max(0, D - M - T), H = (ue, q) => ye(ue, q), Q = [
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
        label: H(k, y)
      }), N > 0 && re.push({
        source: "Initiated by agent",
        target: "Abandoned: No Response",
        value: N,
        label: H(N, y)
      }), _ > 0 && re.push({
        source: "Disruption started",
        target: "Voluntary",
        value: _,
        label: H(_, y)
      }), w > 0 && re.push({
        source: "Disruption started",
        target: "Involuntary",
        value: w,
        label: H(w, y)
      }), W > 0 && re.push({
        source: "Disruption started",
        target: "Abandoned (Start)",
        value: W,
        label: H(W, y)
      }), $ > 0 && re.push({
        source: "Involuntary",
        target: "Involuntary change accepted",
        value: $,
        label: H($, y)
      }), S > 0 && re.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: S,
        label: H(S, y)
      }), D > 0 && re.push({
        source: "Voluntary",
        target: "Selected",
        value: D,
        label: H(D, y)
      }), L > 0 && re.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: L,
        label: H(L, y)
      }), M > 0 && re.push({
        source: "Selected",
        target: "Voluntary change success",
        value: M,
        label: H(M, y)
      }), T > 0 && re.push({
        source: "Selected",
        target: "Error: payment rejected",
        value: T,
        label: H(T, y)
      }), j > 0 && re.push({
        source: "Selected",
        target: "Not Paid",
        value: j,
        label: H(j, y)
      }), { nodes: Q, links: re };
    });
    return (p, y) => (f(), te($e, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: y[0] || (y[0] = (k) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", Kb, [
          d("section", Ub, [
            d("div", Yb, [
              v.value.nodes.length > 0 && v.value.links.length > 0 ? (f(), te(Yt, {
                key: 0,
                data: v.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])) : (f(), x("div", qb, [...y[1] || (y[1] = [
                d("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          d("section", Xb, [
            z(ve, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (f(), x("section", Gb, [
            y[2] || (y[2] = d("div", { class: "section-header" }, [
              d("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            d("div", Zb, [
              z(pt, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: k }) => [
                  d("span", Qb, A(B(Ne)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": E(({ row: k }) => [
                  d("span", Jb, A(B(ge)(Number(k.disruption_conversations))), 1)
                ]),
                "cell-started": E(({ row: k }) => [
                  d("span", ev, [
                    De(A(B(ge)(Number(k.disruption_initiated_count))) + " ", 1),
                    d("span", tv, " (" + A(g(
                      Number(k.disruption_initiated_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": E(({ row: k }) => [
                  d("span", av, [
                    d("span", nv, A(B(ge)(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count)
                    )) + " (" + A(g(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": E(({ row: k }) => [
                  d("div", ov, [
                    (f(!0), x(he, null, pe([k], (_, w) => (f(), x(he, { key: w }, [
                      z(Xe, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: E(() => [
                          De(" VOL " + A(B(ge)(_.voluntary_count)) + " (" + A(g(
                            _.voluntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "success" }, {
                        default: E(() => [
                          De(" Selected " + A(B(ge)(_.confirmed_count)) + " (" + A(g(
                            _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "warning" }, {
                        default: E(() => [
                          De(" Not Confirm " + A(B(ge)(_.voluntary_count - _.confirmed_count)) + " (" + A(g(
                            _.voluntary_count - _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "danger" }, {
                        default: E(() => [
                          De(" Payment rejected " + A(B(ge)(_.sell_failed_count)) + " (" + A(g(
                            _.sell_failed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "orange" }, {
                        default: E(() => [
                          De(" Not Paid " + A(B(ge)(
                            Math.max(
                              0,
                              _.confirmed_count - m(_) - _.sell_failed_count
                            )
                          )) + " (" + A(g(
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
                        default: E(() => [
                          De(" Voluntary change success " + A(B(ge)(m(_))) + " (" + A(g(
                            m(_),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (f(!0), x(he, null, pe(_.payment_success_total || [], ($) => (f(), te(Xe, {
                        key: `${_.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: E(() => [
                          De(A($.currency) + " " + A(h($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": E(({ row: k }) => [
                  d("div", sv, [
                    (f(!0), x(he, null, pe([k], (_, w) => (f(), x(he, { key: w }, [
                      z(Xe, { color: "purple" }, {
                        default: E(() => [
                          De(" INV " + A(B(ge)(_.involuntary_count)) + " (" + A(g(
                            _.involuntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "danger" }, {
                        default: E(() => [
                          De(" Human " + A(B(ge)(_.involuntary_count - _.accepted_count)) + " (" + A(g(
                            _.involuntary_count - _.accepted_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "success" }, {
                        default: E(() => [
                          De(" Involuntary change accepted " + A(B(ge)(_.accepted_count)) + " (" + A(g(
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
          ])) : (f(), x("section", iv, [...y[3] || (y[3] = [
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
}), rv = /* @__PURE__ */ be(lv, [["__scopeId", "data-v-d98cd735"]]), cv = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, dv = { class: "w-full shrink-0 flex min-h-0 flex-col" }, uv = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, hv = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, fv = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, gv = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, mv = /* @__PURE__ */ fe({
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
    }, i = Se(n, "theme"), { isDark: l } = Me(i), r = {
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
    ), g = C(() => {
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
    }), h = (b) => {
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
    return Te(
      () => n.data,
      (b) => {
        h(b ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (b, m) => (f(), te($e, {
      class: "w-full min-h-0 self-start",
      title: "FAQs",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", cv, [
          d("div", dv, [
            c.value.labels && c.value.labels.length ? (f(), x("section", uv, [
              d("div", hv, [
                z(mt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              d("div", fv, [
                (f(!0), x(he, null, pe(g.value, (v) => (f(), te(ve, {
                  key: v.name,
                  class: "min-w-0",
                  color: v.color,
                  title: v.label,
                  value: v.value,
                  subvalue: v.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (f(), x("section", gv, [...m[0] || (m[0] = [
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
}), pv = /* @__PURE__ */ be(mv, [["__scopeId", "data-v-74ceae76"]]), kt = (e) => e.replace(/\b(seller|checkin)_state\b/gi, "$1"), bv = {
  key: 0,
  class: "w-52"
}, vv = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, yv = { class: "w-full shrink-0 flex min-h-0 flex-col" }, xv = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, kv = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, _v = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, wv = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Cv = { class: "max-w-[360px] px-4 text-center" }, $v = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Sv = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, Mv = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, Dv = /* @__PURE__ */ fe({
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
      const $ = Array.from(_).reduce(
        (D, M) => (D << 5) - D + M.charCodeAt(0) | 0,
        0
      );
      return o[Math.abs($) % o.length];
    }, u = Se(s, "theme"), { isDark: g } = Me(u), h = (k) => {
      const _ = kt(k).replace(/_/g, " ");
      return _.charAt(0).toUpperCase() + _.slice(1);
    }, b = C(() => {
      const k = {};
      for (const _ of Object.values(s.data?.agents_by_day || {}))
        for (const [w, $] of Object.entries(_))
          k[w] = (k[w] || 0) + $;
      return k;
    }), m = C(() => {
      const k = s.data?.agents_by_day || {}, _ = Object.keys(k).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const $ = Object.keys(b.value).sort(
        (D, M) => b.value[M] - b.value[D] || D.localeCompare(M)
      ).slice(0, s.maxSeries).map((D) => ({
        label: h(D),
        data: _.map((M) => k[M]?.[D] || 0),
        borderColor: c(D)
      }));
      return {
        labels: _.map((D) => Ne(D).format("MMM DD")),
        datasets: $
      };
    }), v = C(() => {
      const k = Object.values(b.value).reduce((w, $) => w + $, 0), _ = s.totalConversations ?? k;
      return _ === 0 ? [] : Object.entries(b.value).sort(([, w], [, $]) => $ - w).map(([w, $]) => ({
        name: w,
        label: h(w),
        total: $,
        percentage: ($ / _ * 100).toFixed(1),
        color: c(w)
      }));
    }), p = C(() => v.value.slice(0, 4)), y = C(() => {
      const k = p.value.length;
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    });
    return t({ isDark: g }), (k, _) => (f(), te($e, {
      class: "w-full min-h-0 self-start",
      title: s.title,
      subtitle: s.subtitle,
      collapsible: !1,
      loading: s.loading
    }, {
      headerAside: E(() => [
        s.breakdownOptions.length ? (f(), x("div", bv, [
          z(Tt, {
            "model-value": s.breakdownBy,
            options: s.breakdownOptions,
            "onUpdate:modelValue": r
          }, null, 8, ["model-value", "options"])
        ])) : P("", !0)
      ]),
      headerExport: E(() => [
        e.enableExport && !s.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", vv, [
          d("div", yv, [
            m.value.labels && m.value.labels.length ? (f(), x("section", xv, [
              d("div", kv, [
                z(mt, {
                  data: m.value,
                  options: e.options,
                  theme: u.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              s.showSummaryCards && p.value.length ? (f(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(y.value)
              }, [
                (f(!0), x(he, null, pe(p.value, (w) => (f(), te(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${B(ge)(w.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : P("", !0)
            ])) : s.showSummaryCards && v.value.length ? (f(), x("section", _v, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: _e(y.value)
              }, [
                (f(!0), x(he, null, pe(p.value, (w) => (f(), te(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${B(ge)(w.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : P("", !0),
            v.value.length ? P("", !0) : (f(), x("section", wv, [
              d("div", Cv, [
                d("div", $v, [
                  z(B(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", Sv, A(s.emptyTitle), 1),
                d("p", Mv, A(s.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Il = /* @__PURE__ */ be(Dv, [["__scopeId", "data-v-c2fc7beb"]]), Av = { class: "card-body" }, Tv = {
  key: 0,
  class: "chart-section"
}, Bv = { class: "chart-wrapper" }, Lv = {
  key: 1,
  class: "record-locator-daily-section"
}, Rv = { class: "w-full min-w-0" }, Iv = { class: "cell-plain font-medium" }, Pv = { class: "cell-plain text-center" }, Ev = { class: "cell-plain text-center" }, Ov = { class: "cell-plain text-center" }, Fv = { class: "cell-plain text-center" }, Vv = { class: "cell-plain text-center success-value" }, Nv = { class: "cell-plain text-center failed-value" }, zv = { class: "cell-plain text-center warning-value" }, jv = { class: "cell-plain text-center" }, Hv = { class: "cell-plain text-center failed-value" }, Wv = {
  key: 2,
  class: "empty-state"
}, Kv = /* @__PURE__ */ fe({
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
    }, { isDark: i } = Me(Se(n, "theme")), l = C(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
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
    ], u = C(
      () => n.isAvianca ? [...r, ...c] : r
    ), g = C(
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
    ), h = C(() => n.data), b = (p, y) => Et(p, y), m = (p, y) => {
      const k = ge(p), _ = b(p, y);
      return `${k} (${_})`;
    }, v = C(() => {
      const p = [], y = [], k = /* @__PURE__ */ new Set(), _ = (Y) => {
        k.has(Y) || (p.push({ name: Y }), k.add(Y));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: p, links: y };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const w = h.value.total_checkin_initiated, $ = h.value.total_record_locator_init, D = h.value.total_record_locator_started, M = h.value.total_record_locator_completed, O = h.value.total_record_locator_closed, N = h.value.total_record_locator_failed, W = h.value.total_record_locator_abandoned, S = h.value.total_record_locator_init_abandoned, L = h.value.total_checkin_pre_init_abandoned_error, T = h.value.total_checkin_pre_init_abandoned_voluntary, j = L != null || T != null, H = j ? Math.max(Number(L) || 0, 0) : 0, Q = j ? Math.max(Number(T) || 0, 0) : 0, re = h.value.total_record_locator_init_abandoned_error, ue = h.value.total_record_locator_init_abandoned_voluntary, q = re != null || ue != null, oe = q ? Math.max(Number(re) || 0, 0) : 0, R = q ? Math.max(Number(ue) || 0, 0) : 0;
      $ > 0 && y.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: ye($, w)
      });
      const U = w - $;
      return j ? (Q > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ye(Q, w)
      })), H > 0 && (_("Booking not retreived"), y.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: ye(H, w)
      }))) : U > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: U,
        label: ye(U, w)
      })), D > 0 && y.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: D,
        label: ye(D, w)
      }), q ? (oe > 0 && (_("Error"), y.push({
        source: "Booking retrive",
        target: "Error",
        value: oe,
        label: ye(oe, w)
      })), R > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: R,
        label: ye(R, w)
      }))) : S > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: S,
        label: ye(S, w)
      })), M > 0 && y.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: M,
        label: ye(M, w)
      }), O > 0 && y.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: O,
        label: ye(O, w)
      }), N > 0 && (_("Checkin Failed"), y.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: N,
        label: ye(N, w)
      })), W > 0 && (_("Abandoned (Flow)"), y.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: W,
        label: ye(W, w)
      })), { nodes: p, links: y };
    });
    return t({ isDark: i }), (p, y) => (f(), te($e, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: n.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", Av, [
          v.value.nodes.length > 0 ? (f(), x("section", Tv, [
            d("div", Bv, [
              z(Yt, {
                data: v.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : P("", !0),
          l.value && l.value.length > 0 ? (f(), x("section", Lv, [
            d("div", Rv, [
              z(pt, {
                columns: u.value,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: k }) => [
                  d("span", Iv, A(B(Ne)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: k }) => [
                  d("span", Pv, A(B(ge)(k.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: k }) => [
                  d("span", Ev, A(m(
                    k.record_locator_init_count,
                    k.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": E(({ row: k }) => [
                  d("span", Ov, A(B(ge)(k.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": E(({ row: k }) => [
                  d("span", Fv, A(m(
                    k.record_locator_completed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": E(({ row: k }) => [
                  d("span", Vv, A(m(
                    k.record_locator_closed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": E(({ row: k }) => [
                  d("span", Nv, A(m(
                    k.record_locator_failed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": E(({ row: k }) => [
                  d("span", zv, A(m(
                    k.record_locator_abandoned_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": E(({ row: k }) => [
                  d("span", jv, A(B(ge)(
                    k.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": E(({ row: k }) => [
                  d("span", Hv, A(B(ge)(
                    k.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (f(), x("section", Wv, [...y[0] || (y[0] = [
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
}), Uv = /* @__PURE__ */ be(Kv, [["__scopeId", "data-v-f904c66a"]]), Yv = { class: "card-body" }, qv = {
  key: 0,
  class: "chart-section"
}, Xv = {
  key: 1,
  class: "empty-state"
}, Gv = {
  key: 2,
  class: "comparison-section"
}, Zv = { class: "comparison-grid" }, Qv = /* @__PURE__ */ fe({
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
    }, { isDark: r } = Me(Se(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const m = /* @__PURE__ */ new Set();
      for (const v of s.data?.sales_by_channel_by_day ?? [])
        for (const p of Object.keys(v.channels))
          m.add(p);
      return Array.from(m).sort();
    }), u = (m, v) => n[m.toLowerCase()] ?? o[v % o.length];
    function g(m) {
      return m.replace(/_/g, " ").toUpperCase();
    }
    function h(m) {
      if (m.delta === null) return "No previous data";
      const v = ge(m.previous), p = `${Math.abs(m.delta).toFixed(1)}%`;
      return m.delta === 0 ? `0.0% vs prev. period (${v})` : `${m.delta > 0 ? "↑" : "↓"} ${p} vs prev. period (${v})`;
    }
    const b = C(() => {
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
    return t({ isDark: r }), (m, v) => (f(), te($e, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !s.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", Yv, [
          b.value.labels.length > 0 ? (f(), x("section", qv, [
            z($t, {
              data: b.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (f(), x("section", Xv, [...v[0] || (v[0] = [
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
          e.channelComparison.length > 0 ? (f(), x("section", Gv, [
            d("div", Zv, [
              (f(!0), x(he, null, pe(e.channelComparison, (p, y) => (f(), te(B(ve), {
                key: p.channel,
                color: u(p.channel, y),
                title: g(p.channel),
                value: B(ge)(p.current),
                subvalue: h(p)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : P("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Pl = /* @__PURE__ */ be(Qv, [["__scopeId", "data-v-4879d791"]]), Jv = { class: "card-body" }, ey = {
  key: 0,
  class: "chart-section"
}, ty = { class: "chart-wrapper" }, ay = {
  key: 1,
  class: "empty-state"
}, ny = { class: "seller-value-cards" }, oy = {
  key: 2,
  class: "seller-daily-section"
}, sy = { class: "w-full min-w-0" }, iy = { class: "sl-cell font-medium" }, ly = { class: "sl-cell text-center" }, ry = { class: "sl-cell text-center" }, cy = { class: "sl-cell text-center" }, dy = { class: "sl-cell text-center" }, uy = { class: "sl-cell text-center success-value" }, hy = {
  key: 0,
  class: "currency-cell-list"
}, fy = {
  key: 1,
  class: "empty-cell"
}, gy = { class: "sl-cell text-center success-value" }, my = { class: "sl-cell text-center success-value" }, py = {
  key: 0,
  class: "currency-cell-list"
}, by = {
  key: 1,
  class: "empty-cell"
}, vy = { class: "sl-cell text-center success-value" }, yy = { class: "sl-cell text-center" }, xy = { class: "sl-cell text-center success-value" }, ky = {
  key: 0,
  class: "currency-cell-list"
}, _y = { key: 1 }, wy = {
  key: 0,
  class: "failed-reasons"
}, Cy = { class: "reason-name" }, $y = { class: "reason-count" }, Sy = {
  key: 1,
  class: "empty-cell"
}, My = /* @__PURE__ */ fe({
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
    function n(S) {
      return S;
    }
    const o = e, s = a, i = (S) => {
      s("export", S);
    }, { isDark: l } = Me(Se(o, "theme")), r = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const S = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((L) => {
        const T = S.findIndex(
          (j) => j.date === L.date
        );
        T !== -1 ? S[T] = { ...S[T], reasons: L.reasons } : S.push({
          date: L.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: L.reasons
        });
      }), S.sort(
        (L, T) => new Date(L.date).getTime() - new Date(T.date).getTime()
      );
    }), c = C(() => {
      const S = [
        { key: "date", label: "Date", align: "center" },
        { key: "sellInitiated", label: "Initiated by agent", align: "center" },
        { key: "sellStarted", label: "Sell Started", align: "center" },
        { key: "getQuote", label: "Get Quote", align: "center" },
        { key: "bookingCreated", label: "Booking Created", align: "center" }
      ];
      return o.showPaymentMethodDetails && S.push(
        { key: "btValue", label: "BT Success Value", align: "center" },
        { key: "btSuccess", label: "BT Success", align: "center" },
        { key: "coValue", label: "CO Success Value", align: "center" },
        { key: "cashSuccess", label: "Cash Success", align: "center" }
      ), S.push(
        { key: "sellSuccess", label: "Sell Success", align: "center" },
        { key: "totalSalesValue", label: "Total Sales Value", align: "center" },
        { key: "failed", label: "Failed", align: "center" }
      ), S;
    }), u = C(
      () => r.value.map((S) => ({
        id: S.date,
        ...S
      }))
    ), g = C(() => o.sellerData), h = C(() => o.failedData), b = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), m = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_bank_transfer) ? o.sellerData.total_value_sell_success_bank_transfer : []
    ), v = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_cash) ? o.sellerData.total_value_sell_success_cash : []
    ), p = C(() => {
      const S = b.value;
      return S.length > 0 ? S.map(
        (L) => `${L.currency} ${Xt(L.total_value)}`
      ).join(" · ") : W(o.sellerData.total_value_sell_success);
    });
    function y(S) {
      return S.length > 0 ? S.map(
        (L) => `${L.currency} ${Xt(L.total_value)}`
      ).join(" · ") : "—";
    }
    const k = C(
      () => y(m.value)
    ), _ = C(
      () => y(v.value)
    ), w = (S) => S.replace(/_/g, " ").replace(/\b\w/g, (L) => L.toUpperCase()), $ = (S) => `Failed:
${w(S)}`, D = C(() => {
      const {
        total_seller_conversations: S = 0,
        total_sell_started: L = 0,
        total_sell_booking_created: T = 0,
        total_sell_success: j = 0,
        total_sell_success_bank_transfer: H = 0,
        total_sell_success_cash: Q = 0
      } = g.value, { failed_by_reason_by_day: re = [] } = h.value;
      if (S === 0) return { nodes: [], links: [] };
      const ue = j, q = [
        { name: "Initiated by agent", value: S, status: "success" },
        { name: "Sell Started", value: L, status: "success" },
        { name: "Booking Created", value: T, status: "success" },
        { name: "Sell Success", value: ue, status: "success" }
      ], oe = [], R = S - L;
      R > 0 && (q.push({
        name: "Abandoned: No Response",
        value: R,
        status: "abandon"
      }), oe.push({
        source: "Initiated by agent",
        target: "Abandoned: No Response",
        value: R,
        label: ye(R, S)
      })), L > 0 && oe.push({
        source: "Initiated by agent",
        target: "Sell Started",
        value: L,
        label: ye(L, S)
      });
      const U = re.reduce(
        (le, ce) => (ce.reasons && Array.isArray(ce.reasons) && ce.reasons.forEach((xe) => {
          const K = xe.reason, ie = xe.failed_count;
          le[K] = (le[K] || 0) + ie;
        }), le),
        {}
      );
      T > 0 && oe.push({
        source: "Sell Started",
        target: "Booking Created",
        value: T,
        label: ye(T, S)
      }), (H ?? 0) > 0 && (q.push({
        name: "Bank Transfer",
        value: H ?? 0,
        status: "success"
      }), oe.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: H ?? 0,
        label: ye(H ?? 0, S)
      })), (Q ?? 0) > 0 && (q.push({
        name: "Cash Option",
        value: Q ?? 0,
        status: "success"
      }), oe.push({
        source: "Booking Created",
        target: "Cash Option",
        value: Q ?? 0,
        label: ye(Q ?? 0, S)
      })), ue > 0 && oe.push({
        source: "Booking Created",
        target: "Sell Success",
        value: ue,
        label: ye(ue, S)
      });
      const Y = T - ue - (H ?? 0) - (Q ?? 0);
      Y > 0 && (q.push({
        name: "Failed at Completion",
        value: Y,
        status: "error"
      }), oe.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: Y,
        label: ye(Y, S)
      }));
      const V = L - T;
      if (V > 0 && (q.push({
        name: "Failed at Booking",
        value: V,
        status: "error"
      }), oe.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: V,
        label: ye(V, S)
      })), Object.keys(U).length > 0) {
        const le = Object.values(U).reduce(
          (xe, K) => xe + K,
          0
        ), ce = V - le;
        Object.entries(U).filter(([, xe]) => xe > 0).sort(([, xe], [, K]) => K - xe).forEach(([xe, K]) => {
          const ie = `Failed: ${xe}`;
          q.push({
            name: ie,
            value: K,
            status: "error",
            label: $(xe)
          }), oe.push({
            source: "Failed at Booking",
            target: ie,
            value: K,
            label: ye(K, S)
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
          label: ye(ce, S)
        }));
      }
      return {
        nodes: q,
        links: oe
      };
    }), M = (S, L) => Et(S, L), O = (S, L) => {
      const T = ge(S), j = M(S, L);
      return `${T} (${j})`;
    }, N = (S) => S == null ? 0 : typeof S == "number" ? S : Array.isArray(S) ? S.reduce((L, T) => L + (T.total_value || 0), 0) : 0, W = (S) => Xt(N(S));
    return t({ isDark: l }), (S, L) => (f(), te($e, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", Jv, [
          D.value.nodes.length > 0 ? (f(), x("section", ey, [
            d("div", ty, [
              z(Yt, {
                data: D.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (f(), x("section", ay, [...L[0] || (L[0] = [
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
          d("section", ny, [
            z(ve, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: p.value
            }, null, 8, ["value"]),
            o.showPaymentMethodDetails ? (f(), x(he, { key: 0 }, [
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
            ], 64)) : P("", !0)
          ]),
          r.value && r.value.length > 0 ? (f(), x("section", oy, [
            d("div", sy, [
              z(pt, {
                columns: c.value,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: T }) => [
                  d("span", iy, A(B(Ne)(String(T.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": E(({ row: T }) => [
                  d("span", ly, A(B(ge)(Number(T.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": E(({ row: T }) => [
                  d("span", ry, A(O(
                    T.sell_started_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": E(({ row: T }) => [
                  d("span", cy, A(O(
                    T.sell_get_quote_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": E(({ row: T }) => [
                  d("span", dy, A(O(
                    T.sell_booking_created_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-btValue": E(({ row: T }) => [
                  d("span", uy, [
                    Array.isArray(
                      T.daily_value_sell_success_bank_transfer
                    ) && T.daily_value_sell_success_bank_transfer.length > 0 ? (f(), x("div", hy, [
                      (f(!0), x(he, null, pe(T.daily_value_sell_success_bank_transfer, (j) => (f(), x("span", {
                        key: `${T.date}-bt-success-${j.currency}`
                      }, A(j.currency) + " " + A(B(Xt)(j.total_value)), 1))), 128))
                    ])) : (f(), x("span", fy, "-"))
                  ])
                ]),
                "cell-btSuccess": E(({ row: T }) => [
                  d("span", gy, A(B(ge)(
                    Number(
                      T.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-coValue": E(({ row: T }) => [
                  d("span", my, [
                    Array.isArray(
                      T.daily_value_sell_success_cash
                    ) && T.daily_value_sell_success_cash.length > 0 ? (f(), x("div", py, [
                      (f(!0), x(he, null, pe(T.daily_value_sell_success_cash, (j) => (f(), x("span", {
                        key: `${T.date}-co-success-${j.currency}`
                      }, A(j.currency) + " " + A(B(Xt)(j.total_value)), 1))), 128))
                    ])) : (f(), x("span", by, "-"))
                  ])
                ]),
                "cell-cashSuccess": E(({ row: T }) => [
                  d("span", vy, A(B(ge)(
                    Number(T.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": E(({ row: T }) => [
                  d("span", yy, A(O(
                    T.sell_success_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": E(({ row: T }) => [
                  d("span", xy, [
                    Array.isArray(T.daily_value_sell_success) && T.daily_value_sell_success.length > 0 ? (f(), x("div", ky, [
                      (f(!0), x(he, null, pe(T.daily_value_sell_success, (j) => (f(), x("span", {
                        key: `${T.date}-${j.currency}`
                      }, A(j.currency) + " " + A(B(Xt)(j.total_value)), 1))), 128))
                    ])) : (f(), x("span", _y, A(W(
                      T.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": E(({ row: T }) => [
                  (T.reasons || []).length > 0 ? (f(), x("div", wy, [
                    (f(!0), x(he, null, pe(T.reasons || [], (j) => (f(), x("div", {
                      key: j.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", Cy, A(j.reason) + ":", 1),
                      d("span", $y, A(j.failed_count), 1)
                    ]))), 128))
                  ])) : (f(), x("div", Sy, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : P("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), El = /* @__PURE__ */ be(My, [["__scopeId", "data-v-fad285e5"]]), Dy = { class: "seller-container__body" }, Ay = /* @__PURE__ */ fe({
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
    ), i = C(() => a.exportLoading || a.sellerExportLoading), l = C(() => a.exportLoading || a.salesByChannelExportLoading);
    function r(c, u) {
      n("export", { source: c, format: u });
    }
    return (c, u) => (f(), te($e, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[2] || (u[2] = (g) => n("open"))
    }, {
      default: E(() => [
        d("div", Dy, [
          z(El, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            "show-payment-method-details": e.showPaymentMethodDetails,
            onExport: u[0] || (u[0] = (g) => r("seller", g))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading", "show-payment-method-details"]),
          z(Pl, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: u[1] || (u[1] = (g) => r("salesByChannel", g))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Ty = /* @__PURE__ */ be(Ay, [["__scopeId", "data-v-34a76e0c"]]), By = { class: "card-body" }, Ly = {
  key: 0,
  class: "chart-section"
}, Ry = { class: "chart-wrapper" }, Iy = {
  key: 1,
  class: "empty-state"
}, Py = { class: "ancillaries-value-cards" }, Ey = {
  key: 2,
  class: "ancillaries-daily-section"
}, Oy = { class: "w-full min-w-0" }, Fy = { class: "sl-cell font-medium" }, Vy = { class: "sl-cell text-center" }, Ny = { class: "sl-cell text-center" }, zy = { class: "sl-cell text-center" }, jy = { class: "sl-cell text-center" }, Hy = {
  key: 0,
  class: "failed-reasons"
}, Wy = { class: "reason-name" }, Ky = { class: "reason-count" }, Uy = {
  key: 1,
  class: "empty-cell"
}, Yy = /* @__PURE__ */ fe({
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
    const n = e, { isDark: o } = Me(Se(n, "theme")), s = C(
      () => n.ancillariesData?.total_ancillaries_offered || 0
    ), i = C(
      () => n.ancillariesData?.total_ancillaries_selected || 0
    ), l = C(
      () => n.ancillariesData?.total_ancillaries_declined || 0
    ), r = C(
      () => n.ancillariesData?.total_ancillaries_paid || 0
    ), c = C(
      () => n.ancillariesData?.ancillaries_cr || 0
    ), u = C(
      () => `${Number(c.value || 0).toFixed(1)}%`
    ), g = (y) => y.replace(/_/g, " ").replace(/\b\w/g, (k) => k.toUpperCase()), h = (y) => `Declined:
${g(y)}`, b = C(() => {
      const y = s.value, k = i.value, _ = l.value, w = r.value, $ = n.ancillariesData?.declined_by_reason || [];
      if (y === 0) return { nodes: [], links: [] };
      const D = [
        { name: "Offered", value: y, status: "success" },
        { name: "Selected", value: k, status: "success" }
      ], M = [];
      if (k > 0 && M.push({
        source: "Offered",
        target: "Selected",
        value: k,
        label: ye(k, y)
      }), w > 0) {
        D.push({ name: "Paid", value: w, status: "success" });
        const L = k > 0 ? "Selected" : "Offered", T = k > 0 ? k : y;
        M.push({
          source: L,
          target: "Paid",
          value: w,
          label: ye(w, T)
        });
      }
      const O = $.reduce(
        (L, T) => (T.count > 0 && (L[T.reason] = (L[T.reason] || 0) + T.count), L),
        {}
      ), N = Object.values(O).reduce((L, T) => L + T, 0), W = Math.max(0, _ - N);
      Object.entries(O).sort(([, L], [, T]) => T - L).forEach(([L, T]) => {
        const j = `Declined: ${L}`;
        D.push({
          name: j,
          value: T,
          status: "error",
          label: h(L)
        }), M.push({
          source: "Offered",
          target: j,
          value: T,
          label: ye(T, y)
        });
      }), W > 0 && (D.push({
        name: "Declined: Without Reason",
        value: W,
        status: "error",
        label: `Declined:
Without Reason`
      }), M.push({
        source: "Offered",
        target: "Declined: Without Reason",
        value: W,
        label: ye(W, y)
      }));
      const S = Math.max(
        0,
        y - k - _
      );
      return S > 0 && (D.push({
        name: "No Response",
        value: S,
        status: "abandon"
      }), M.push({
        source: "Offered",
        target: "No Response",
        value: S,
        label: ye(S, y)
      })), { nodes: D, links: M };
    }), m = C(() => {
      const y = [...n.ancillariesData?.ancillaries_by_day || []];
      return (n.ancillariesData?.declined_by_reason_by_day || []).forEach((_) => {
        const w = y.findIndex(($) => $.date === _.date);
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
    }), v = C(() => [
      { key: "date", label: "Date", align: "center" },
      { key: "offered", label: "Offered", align: "center" },
      { key: "selected", label: "Selected", align: "center" },
      { key: "paid", label: "Paid", align: "center" },
      { key: "declined", label: "Declined", align: "center" },
      { key: "reasons", label: "Decline Reasons", align: "left" }
    ]), p = C(
      () => m.value.map((y) => ({
        id: y.date,
        ...y
      }))
    );
    return t({
      isDark: o,
      formatSankeyPercentage: Et
    }), (y, k) => (f(), te($e, {
      class: "ancillaries-metrics-root h-full min-h-0",
      title: "Ancillaries",
      subtitle: "Ancillary offer conversion funnel",
      "default-open": e.initiallyOpen,
      loading: n.loading
    }, {
      default: E(() => [
        d("div", By, [
          b.value.nodes.length > 0 ? (f(), x("section", Ly, [
            d("div", Ry, [
              z(Yt, {
                data: b.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (f(), x("section", Iy, [...k[0] || (k[0] = [
            d("div", { class: "empty-state-content" }, [
              d("p", { class: "empty-title" }, "No ancillaries data available"),
              d("p", { class: "empty-description" }, " No ancillary funnel events found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          d("section", Py, [
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
              value: B(ge)(s.value)
            }, null, 8, ["value"]),
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-success)",
              title: "Selected",
              value: B(ge)(i.value)
            }, null, 8, ["value"]),
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-primary, #5d4b93)",
              title: "Paid",
              value: B(ge)(r.value)
            }, null, 8, ["value"]),
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-error, #ef4444)",
              title: "Declined",
              value: B(ge)(l.value)
            }, null, 8, ["value"])
          ]),
          p.value.length > 0 ? (f(), x("section", Ey, [
            d("div", Oy, [
              z(pt, {
                columns: v.value,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: _ }) => [
                  d("span", Fy, A(B(Ne)(String(_.date)).format("MMM DD")), 1)
                ]),
                "cell-offered": E(({ row: _ }) => [
                  d("span", Vy, A(B(ge)(Number(_.offered_count) || 0)), 1)
                ]),
                "cell-selected": E(({ row: _ }) => [
                  d("span", Ny, A(B(ge)(Number(_.selected_count) || 0)), 1)
                ]),
                "cell-paid": E(({ row: _ }) => [
                  d("span", zy, A(B(ge)(Number(_.paid_count) || 0)), 1)
                ]),
                "cell-declined": E(({ row: _ }) => [
                  d("span", jy, A(B(ge)(Number(_.declined_count) || 0)), 1)
                ]),
                "cell-reasons": E(({ row: _ }) => [
                  (_.reasons || []).length > 0 ? (f(), x("div", Hy, [
                    (f(!0), x(he, null, pe(_.reasons || [], (w) => (f(), x("div", {
                      key: w.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", Wy, A(w.reason) + ":", 1),
                      d("span", Ky, A(w.count), 1)
                    ]))), 128))
                  ])) : (f(), x("div", Uy, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : P("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), qy = /* @__PURE__ */ be(Yy, [["__scopeId", "data-v-42f742c3"]]), Xy = ["aria-label", "aria-expanded"], kn = 8, xa = 12, pi = /* @__PURE__ */ fe({
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
    }), o = ne(null), s = ne(null), i = C(
      () => t.dark ? "bg-[#8b5cf6] hover:bg-[#a78bfa] focus-visible:ring-[#8b5cf6]/50 focus-visible:ring-offset-[#1a1a23]" : "bg-[#7c3aed] hover:bg-[#6d28d9] focus-visible:ring-[#7c3aed]/40"
    );
    function l() {
      a.value = !1;
    }
    function r() {
      const h = o.value, b = s.value;
      if (!h || !b) return;
      const m = h.getBoundingClientRect(), v = b.getBoundingClientRect(), p = m.top - xa, y = window.innerHeight - m.bottom - xa, k = p >= v.height + kn, _ = y >= v.height + kn;
      let $ = k || !_ && p >= y ? m.top - v.height - kn : m.bottom + kn;
      $ = Math.max(
        xa,
        Math.min($, window.innerHeight - v.height - xa)
      );
      let D = m.left + m.width / 2 - v.width / 2;
      D = Math.max(
        xa,
        Math.min(D, window.innerWidth - v.width - xa)
      ), n.value = {
        top: `${$}px`,
        left: `${D}px`
      };
    }
    async function c() {
      if (!t.text.trim()) return;
      a.value = !0, await We();
      const h = s.value;
      h && (h.style.visibility = "hidden", r(), h.style.visibility = "visible");
    }
    function u() {
      a.value && l();
    }
    function g(h) {
      h.key === "Escape" && l();
    }
    return window.addEventListener("scroll", u, !0), window.addEventListener("resize", u), window.addEventListener("keydown", g), at(() => {
      window.removeEventListener("scroll", u, !0), window.removeEventListener("resize", u), window.removeEventListener("keydown", g);
    }), (h, b) => (f(), x(he, null, [
      d("button", {
        ref_key: "triggerRef",
        ref: o,
        type: "button",
        class: X(["inline-flex size-3.5 shrink-0 cursor-help items-center justify-center rounded-full text-[8px] font-bold leading-none text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1", i.value]),
        "aria-label": `About ${e.title}`,
        "aria-expanded": a.value,
        onMouseenter: c,
        onMouseleave: l,
        onFocus: c,
        onBlur: l
      }, " i ", 42, Xy),
      (f(), te(Wt, { to: "body" }, [
        a.value ? (f(), x("div", {
          key: 0,
          ref_key: "tooltipRef",
          ref: s,
          role: "tooltip",
          class: X([
            "pointer-events-none w-max max-w-[min(20rem,calc(100vw-1.5rem))] rounded-xl px-3 py-2.5 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] shadow-lg",
            e.dark ? "bg-[#25252e] text-white shadow-black/50 ring-1 ring-white/10" : "bg-white text-slate-900 shadow-slate-900/10 ring-1 ring-black/10"
          ]),
          style: _e({
            position: "fixed",
            top: n.value.top,
            left: n.value.left,
            zIndex: 1100
          })
        }, [
          d("p", {
            class: X(["m-0 text-[13px] font-semibold leading-5", e.dark ? "text-white" : "text-slate-900"])
          }, A(e.title), 3),
          d("p", {
            class: X(["m-0 mt-1 text-[12px] font-normal leading-4", e.dark ? "text-[#b4b4be]" : "text-slate-500"])
          }, A(e.text), 3)
        ], 6)) : P("", !0)
      ]))
    ], 64));
  }
}), Gy = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Zy = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Qy = {
  key: "title-content",
  class: "header-title-group"
}, Jy = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, e1 = {
  key: 0,
  class: "metric-label metric-label--header"
}, t1 = { class: "metric-label-text" }, a1 = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, n1 = { key: "aside-content" }, o1 = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, s1 = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, i1 = {
  key: "body-content",
  class: "highlight-inner"
}, l1 = { class: "card-body" }, r1 = { class: "metric-row" }, c1 = {
  key: 0,
  class: "metric-prefix"
}, d1 = {
  key: 0,
  class: "metric-label metric-label--row"
}, u1 = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n } = Me(Se(a, "theme")), o = C(() => a.labelPosition === "header"), s = C(() => a.tooltip?.trim() || ""), i = C(() => a.tooltipTitle?.trim() || a.label), l = C(
      () => a.previousValue !== null && a.previousValue !== void 0
    ), r = C(() => {
      if (!l.value) return 0;
      const g = a.previousValue;
      return g === 0 ? a.currentValue > 0 ? 100 : 0 : (a.currentValue - g) / g * 100;
    }), c = C(() => {
      const g = r.value;
      if (Number.isNaN(g)) return "-";
      const h = g.toFixed(1);
      return g > 0 ? `+${h}%` : `${h}%`;
    }), u = C(() => r.value > 0 ? "change-badge--up" : r.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: r }), (g, h) => (f(), te($e, {
      collapsible: !1,
      class: X([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": B(n),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: E(() => [
        z(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (f(), x("div", Gy, [
              h[0] || (h[0] = d("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (f(), x("div", Zy)) : P("", !0)
            ])) : (f(), x("div", Qy, [
              d("div", Jy, [
                ke(g.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (f(), x("span", e1, [
                d("span", t1, A(e.label), 1),
                s.value ? (f(), te(pi, {
                  key: 0,
                  title: i.value,
                  text: s.value,
                  dark: B(n)
                }, null, 8, ["title", "text", "dark"])) : P("", !0)
              ])) : P("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: E(() => [
        z(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (f(), x("div", a1)) : (f(), x("div", n1, [
              ke(g.$slots, "headerAside", {}, () => [
                l.value ? (f(), x("div", {
                  key: 0,
                  class: X(["change-badge", u.value])
                }, A(c.value), 3)) : P("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: E(() => [
        z(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (f(), x("div", o1, [
              h[1] || (h[1] = d("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? P("", !0) : (f(), x("div", s1))
            ])) : (f(), x("div", i1, [
              d("div", l1, [
                ke(g.$slots, "value", {}, () => [
                  d("div", r1, [
                    e.prefix ? (f(), x("span", c1, A(e.prefix), 1)) : P("", !0),
                    d("span", {
                      class: X(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? P("", !0) : (f(), x("span", d1, [
                  d("span", null, A(e.label), 1),
                  s.value ? (f(), te(pi, {
                    key: 0,
                    title: i.value,
                    text: s.value,
                    dark: B(n)
                  }, null, 8, ["title", "text", "dark"])) : P("", !0)
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
}), tt = /* @__PURE__ */ be(u1, [["__scopeId", "data-v-2716cf55"]]), h1 = /* @__PURE__ */ fe({
  __name: "AncillariesCR",
  props: {
    ancillariesCr: { default: 0 },
    previousAncillariesCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(
      () => `${Number(a.ancillariesCr || 0).toFixed(1)}%`
    ), s = C(() => B(n.value?.isDark) ?? !1), i = C(
      () => B(n.value?.changePercent) ?? 0
    );
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), te(tt, {
      label: "Ancillaries CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.ancillariesCr,
      "previous-value": e.previousAncillariesCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), f1 = { class: "card-body" }, g1 = {
  key: 0,
  class: "chart-section"
}, m1 = {
  key: 1,
  class: "empty-state"
}, p1 = { class: "empty-state-content" }, b1 = { class: "empty-icon-wrapper" }, v1 = /* @__PURE__ */ fe({
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
    }, o = e, s = a, i = (g) => {
      s("export", g);
    }, { isDark: l, colors: r } = Me(Se(o, "theme")), c = C(() => {
      const h = (o.data?.top_agents || []).filter(
        (p) => p.agent_type?.toLowerCase() !== "triage"
      );
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const b = h.reduce(
        (p, y) => p + (Number(y.conversations) || 0),
        0
      ), m = h.map((p) => {
        const y = p.agent_type?.toLowerCase();
        return n[y] || "#94a3b8";
      }), v = m.map((p) => `${p}80`);
      return {
        labels: h.map((p) => {
          const y = Number(p.conversations) || 0, k = b ? y / b * 100 : 0;
          return `${kt(p.agent_type)} - ${y.toLocaleString()} (${k.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((p) => p.conversations),
            backgroundColor: v,
            borderColor: m,
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
            label: (g) => {
              const h = (g.label || "").toString().split(" - ")[0], b = Number(g.parsed) || 0, m = (g.dataset.data || []).reduce(
                (p, y) => p + (Number(y) || 0),
                0
              ), v = m ? b / m * 100 : 0;
              return `${h}: ${b.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (g, h) => (f(), te($e, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", f1, [
          c.value.labels && c.value.labels.length ? (f(), x("section", g1, [
            z(Vn, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (f(), x("section", m1, [
            d("div", p1, [
              d("div", b1, [
                z(B(lp), { class: "empty-icon" })
              ]),
              h[0] || (h[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
              h[1] || (h[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), y1 = /* @__PURE__ */ be(v1, [["__scopeId", "data-v-34a998ae"]]), x1 = { class: "card-body" }, k1 = {
  key: 0,
  class: "payment-methods-section"
}, _1 = { class: "payment-methods-grid" }, w1 = {
  key: 1,
  class: "empty-state"
}, C1 = { class: "empty-state-content" }, $1 = { class: "empty-icon-wrapper" }, S1 = {
  key: 2,
  class: "payment-method-daily-section"
}, M1 = { class: "w-full min-w-0" }, D1 = { class: "font-medium" }, A1 = { class: "text-center" }, T1 = { class: "text-center success-value" }, B1 = {
  key: 0,
  class: "currency-cell-list"
}, L1 = { class: "payment-tags" }, R1 = { class: "tag-name" }, I1 = {
  key: 0,
  class: "tag-amount"
}, P1 = {
  key: 1,
  class: "tag-amount"
}, E1 = { class: "tag-count" }, O1 = {
  key: 3,
  class: "empty-table-state"
}, F1 = "Not Registered", V1 = /* @__PURE__ */ fe({
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
    const n = e, o = a, { isDark: s } = Me(Se(n, "theme")), i = ne(!1), l = ne({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((M, O) => Ne(M.date).valueOf() - Ne(O.date).valueOf())), g = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], h = C(
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
      const O = (M.payment_method_breakdown || []).map(
        (W) => ({
          payment_method: W.payment_method || "Unknown",
          total_amount: W.total_amount ?? 0,
          count: W.count ?? 0,
          total_amount_by_currency: W.total_amount_by_currency ?? []
        })
      ), N = (M.payment_method_by_day || []).map((W) => ({
        date: W.date || "",
        total_count: W.total_count ?? 0,
        total_amount: W.total_amount ?? 0,
        total_amount_by_currency: W.total_amount_by_currency ?? [],
        payment_methods: (W.payment_methods || []).map((S) => ({
          payment_method: S.payment_method || "Unknown",
          total_amount: S.total_amount ?? 0,
          count: S.count ?? 0,
          total_amount_by_currency: S.total_amount_by_currency ?? []
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
        payment_method_breakdown: O,
        payment_method_by_day: N
      };
    }, m = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [M, O] = n.dates.map(
            (W) => Ne(W).format("YYYY-MM-DD")
          ), N = await n.fetchFunction(
            n.airlineName,
            M,
            O
          );
          l.value = b(N);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), l.value = b(null);
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
    ], p = (M) => !M || M.toLowerCase() === "unknown" ? F1 : M.replace(/_/g, " "), y = (M) => M == null ? "$0.00" : Oe(M), k = (M) => {
      const O = M.total_amount_by_currency;
      return O && O.length > 0 ? O.map((N) => `${N.currency} ${y(N.total_value)}`).join(" · ") : y(M.total_amount);
    }, _ = (M) => M ? Ne(M).format("MMM DD") : "-", w = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), $ = (M) => {
      o("export", M);
    };
    function D() {
      const M = n.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, l.value = b(M));
    }
    return Je(() => {
      n.data ? D() : m();
    }), Te(
      () => n.data,
      (M) => {
        M && D();
      },
      { deep: !0 }
    ), Te(
      () => n.dates,
      (M) => {
        n.data || M && M[0] && M[1] && m();
      },
      { deep: !0 }
    ), t({ isDark: s }), (M, O) => (f(), te($e, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: O[0] || (O[0] = (N) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !i.value ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", x1, [
          r.value ? (f(), x("section", k1, [
            O[1] || (O[1] = d("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            d("div", _1, [
              (f(!0), x(he, null, pe(l.value.payment_method_breakdown, (N, W) => (f(), te(ve, {
                key: N.payment_method,
                class: "payment-method-card-item min-w-0",
                color: v[W % v.length],
                title: p(N.payment_method),
                value: k(N),
                subvalue: `${w(N.count)} ${w(N.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (f(), x("section", w1, [
            d("div", C1, [
              d("div", $1, [
                z(B(rp), { class: "empty-icon" })
              ]),
              O[2] || (O[2] = d("p", { class: "empty-title" }, "No payment data available", -1)),
              O[3] || (O[3] = d("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (f(), x("section", S1, [
            O[5] || (O[5] = d("p", { class: "section-label" }, "Daily Breakdown", -1)),
            d("div", M1, [
              z(pt, {
                columns: g,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: N }) => [
                  d("span", D1, A(_(String(N.date))), 1)
                ]),
                "cell-totalSales": E(({ row: N }) => [
                  d("span", A1, A(B(ge)(N.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": E(({ row: N }) => [
                  d("span", T1, [
                    Array.isArray(N.total_amount_by_currency) && N.total_amount_by_currency.length > 0 ? (f(), x("div", B1, [
                      (f(!0), x(he, null, pe(N.total_amount_by_currency, (W) => (f(), x("span", {
                        key: `${N.date}-${W.currency}`
                      }, A(W.currency) + " " + A(y(W.total_value)), 1))), 128))
                    ])) : (f(), x(he, { key: 1 }, [
                      De(A(y(Number(N.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": E(({ row: N }) => [
                  d("div", L1, [
                    (f(!0), x(he, null, pe(Array.isArray(N.payment_methods) ? N.payment_methods : [], (W) => (f(), x("div", {
                      key: W.payment_method,
                      class: "payment-tag"
                    }, [
                      d("span", R1, A(p(W.payment_method)), 1),
                      O[4] || (O[4] = d("span", { class: "tag-separator" }, "•", -1)),
                      !W.total_amount_by_currency || W.total_amount_by_currency.length === 0 ? (f(), x("span", I1, A(y(W.total_amount)), 1)) : (f(), x("span", P1, A(W.total_amount_by_currency.map(
                        (S) => `${S.currency} ${y(S.total_value)}`
                      ).join(" / ")), 1)),
                      d("span", E1, "(" + A(w(W.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : r.value ? (f(), x("div", O1, [...O[6] || (O[6] = [
            d("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : P("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), N1 = /* @__PURE__ */ be(V1, [["__scopeId", "data-v-168637eb"]]), z1 = { class: "card-body" }, j1 = { class: "kpi-closed-value" }, H1 = { class: "kpi-closed-value__main" }, W1 = {
  key: 0,
  class: "kpi-closed-value__pct"
}, K1 = { class: "table-view-select flex justify-end" }, U1 = { class: "table-section w-full min-w-0" }, Y1 = { class: "cell-plain" }, q1 = { class: "cell-plain" }, X1 = { class: "cell-plain cell-plain--muted" }, G1 = { class: "cell-plain" }, Z1 = { class: "cell-plain cell-plain--orange" }, Q1 = { class: "cell-plain cell-plain--red" }, J1 = { class: "cell-plain cell-plain--muted" }, ex = { class: "cell-plain cell-plain--muted" }, tx = { class: "cell-plain cell-plain--muted" }, ax = { class: "cell-plain" }, nx = { class: "cell-plain" }, ox = {
  key: 2,
  class: "empty-state"
}, sx = 6, ix = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (I) => {
      o("export", I);
    }, { isDark: i } = Me(Se(n, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(I) {
      const Z = I?.trim() ?? "";
      return Z.length > 0 && !l.has(Z);
    }
    function c(I) {
      if (!r(I.agent_email)) return !1;
      const Z = I.assigned_count ?? 0, ae = I.closed_count ?? 0, F = I.transferred_count ?? 0, J = I.abandoned_count ?? 0;
      return Z > 0 || ae > 0 || F > 0 || J > 0;
    }
    function u(I) {
      return I.closed_count ?? 0;
    }
    function g(I) {
      return I.transferred_count ?? 0;
    }
    function h(I) {
      return I.abandoned_count ?? 0;
    }
    function b(I) {
      const Z = I?.trim();
      return Z || "—";
    }
    function m(I) {
      const Z = I?.trim();
      return Z || "—";
    }
    function v(I) {
      return I == null ? "0" : ee(I);
    }
    const p = C(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), y = C(() => p.value.length > 0), k = C(() => {
      const I = (n.data?.total_enqueued ?? 0) > 0, Z = (n.data?.total_transferred ?? 0) > 0, ae = (n.data?.total_abandoned ?? 0) > 0;
      return y.value || I || Z || ae;
    }), _ = ne("by_date"), w = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], $ = ne("date"), D = ne("desc");
    Te(_, (I) => {
      I === "aggregated" ? ($.value = "name", D.value = "asc") : ($.value = "date", D.value = "desc");
    });
    function M(I, Z) {
      return Z == null ? null : Z === 0 ? I > 0 ? 100 : 0 : (I - Z) / Z * 100;
    }
    function O(I) {
      const Z = I.toFixed(1);
      return I > 0 ? `+${Z}%` : `${Z}%`;
    }
    function N(I, Z = !1) {
      const ae = Z ? -I : I;
      return ae > 0 ? "change-badge--up" : ae < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function W(I, Z) {
      if (I === null) return null;
      const ae = M(I, Z);
      return ae === null ? null : {
        label: O(ae),
        class: N(ae, !0)
      };
    }
    function S(I) {
      if (I == null || I === "") return null;
      if (typeof I == "number")
        return Number.isFinite(I) ? I : null;
      const Z = I.trim();
      if (!Z) return null;
      if (Z.includes(":")) {
        const F = Z.split(":").map(Number);
        return F.length !== 3 || F.some(isNaN) ? null : F[0] * 3600 + F[1] * 60 + F[2];
      }
      const ae = Number(Z);
      return Number.isFinite(ae) ? ae : null;
    }
    function L(I) {
      const Z = Math.round(I), ae = Math.floor(Z / 3600), F = Math.floor(Z % 3600 / 60), J = Z % 60;
      return `${String(ae).padStart(2, "0")}:${String(F).padStart(2, "0")}:${String(J).padStart(2, "0")}`;
    }
    function T(I) {
      const Z = S(I);
      return Z === null ? "—" : typeof I == "string" && I.includes(":") ? I.trim() : L(Z);
    }
    const j = C(() => n.data?.total_enqueued ?? 0), H = C(() => n.data?.total_closed ?? 0), Q = C(() => n.data?.total_transferred ?? 0), re = C(() => n.data?.total_abandoned ?? 0), ue = C(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), q = C(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), oe = C(() => j.value <= 0 ? null : `(${(H.value / j.value * 100).toFixed(1)}%)`), R = C(
      () => W(
        S(ue.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), U = C(
      () => W(
        S(q.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function Y(I, Z) {
      return {
        id: `${I.date}-${I.agent_email}-${Z}`,
        date: I.date,
        dateSort: new Date(I.date).getTime(),
        agent_name: I.agent_name ?? "",
        agent_email: I.agent_email,
        handled: u(I),
        transferred: g(I),
        abandoned: h(I),
        connected_at: I.connected_at ?? null,
        disconnected_at: I.disconnected_at ?? null,
        online_time_display: I.online_time_seconds == null || I.online_time_seconds === "" ? null : T(I.online_time_seconds),
        avg_assignation_seconds: S(I.avg_time_to_assign_seconds),
        avg_resolution_seconds: S(I.avg_conversation_duration_seconds),
        avg_assignation_display: T(I.avg_time_to_assign_seconds),
        avg_resolution_display: T(I.avg_conversation_duration_seconds)
      };
    }
    function V(I) {
      const Z = /* @__PURE__ */ new Map();
      for (const ae of I) {
        if (!c(ae)) continue;
        const F = ae.agent_email.trim();
        Z.has(F) || Z.set(F, {
          agent_name: ae.agent_name?.trim() ?? "",
          agent_email: F,
          handled: 0,
          transferred: 0,
          abandoned: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const J = Z.get(F), se = ae.assigned_count ?? 0, me = ae.closed_count ?? 0;
        J.handled += u(ae), J.transferred += g(ae), J.abandoned += h(ae), ae.agent_name?.trim() && (J.agent_name = ae.agent_name.trim());
        const Ce = S(ae.avg_time_to_assign_seconds);
        Ce !== null && se > 0 && (J.assignSum += Ce * se, J.assignWeight += se);
        const we = S(ae.avg_conversation_duration_seconds);
        we !== null && me > 0 && (J.resolutionSum += we * me, J.resolutionWeight += me);
      }
      return Array.from(Z.values()).map((ae, F) => {
        const J = ae.assignWeight > 0 ? ae.assignSum / ae.assignWeight : null, se = ae.resolutionWeight > 0 ? ae.resolutionSum / ae.resolutionWeight : null;
        return {
          id: `agg-${ae.agent_email}-${F}`,
          agent_name: ae.agent_name,
          agent_email: ae.agent_email,
          handled: ae.handled,
          transferred: ae.transferred,
          abandoned: ae.abandoned,
          connected_at: null,
          disconnected_at: null,
          online_time_display: null,
          avg_assignation_seconds: J,
          avg_resolution_seconds: se,
          avg_assignation_display: J !== null ? L(J) : "—",
          avg_resolution_display: se !== null ? L(se) : "—"
        };
      });
    }
    const le = C(() => {
      const I = p.value;
      return _.value === "aggregated" ? V(I) : I.map(Y);
    });
    function ce(I, Z, ae, F) {
      const J = F === "asc" ? 1 : -1;
      let se = 0;
      switch (ae) {
        case "date":
          se = (I.dateSort ?? 0) - (Z.dateSort ?? 0);
          break;
        case "name":
          se = (I.agent_name || "").localeCompare(Z.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          se = I.agent_email.localeCompare(Z.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          se = I.handled - Z.handled;
          break;
        case "transferred":
          se = I.transferred - Z.transferred;
          break;
        case "abandoned":
          se = (I.abandoned ?? 0) - (Z.abandoned ?? 0);
          break;
        case "avgAssignation":
          se = (I.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (Z.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          se = (I.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (Z.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (se !== 0) return se * J;
      if (_.value === "by_date" && ae !== "date") {
        const me = (Z.dateSort ?? 0) - (I.dateSort ?? 0);
        if (me !== 0) return me;
      }
      return (I.agent_name || "").localeCompare(Z.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const xe = C(() => {
      const I = [...le.value];
      return I.sort((Z, ae) => ce(Z, ae, $.value, D.value)), I;
    }), K = C(
      () => xe.value
    ), ie = C(() => {
      const I = [];
      return _.value === "by_date" && I.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), I.push(
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
      ), I;
    });
    function de(I) {
      const Z = I;
      if ($.value === Z) {
        D.value = D.value === "asc" ? "desc" : "asc";
        return;
      }
      $.value = Z, Z === "date" ? D.value = "desc" : Z === "name" || Z === "email" ? D.value = "asc" : D.value = "desc";
    }
    const ee = (I) => I == null ? "0" : ge(I), G = (I) => new Date(I).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (I, Z) => (f(), te($e, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: Z[1] || (Z[1] = (ae) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", z1, [
          k.value ? (f(), x("div", {
            key: 0,
            class: X(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:gap-4", { "agent-human-conv--dark": B(i) }])
          }, [
            z(tt, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ee(j.value),
              theme: e.theme,
              "current-value": j.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: E(() => [...Z[2] || (Z[2] = [
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
              value: ee(H.value),
              theme: e.theme,
              "current-value": H.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: E(() => [...Z[3] || (Z[3] = [
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
              value: E(() => [
                d("div", j1, [
                  d("span", H1, A(ee(H.value)), 1),
                  oe.value ? (f(), x("span", W1, A(oe.value), 1)) : P("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            z(tt, {
              label: "Transferred",
              "label-position": "header",
              value: ee(Q.value),
              theme: e.theme,
              "current-value": Q.value,
              "previous-value": e.previousTotalTransferred
            }, {
              icon: E(() => [...Z[4] || (Z[4] = [
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
              value: ee(re.value),
              theme: e.theme,
              "current-value": re.value,
              "previous-value": e.previousTotalAbandoned
            }, {
              icon: E(() => [...Z[5] || (Z[5] = [
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
              value: T(ue.value),
              theme: e.theme,
              "current-value": S(ue.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, jo({
              icon: E(() => [
                Z[6] || (Z[6] = d("svg", {
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
                fn: E(() => [
                  d("div", {
                    class: X(["duration-trend-badge", R.value.class])
                  }, A(R.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            z(tt, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: T(q.value),
              theme: e.theme,
              "current-value": S(q.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, jo({
              icon: E(() => [
                Z[7] || (Z[7] = d("svg", {
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
                fn: E(() => [
                  d("div", {
                    class: X(["duration-trend-badge", U.value.class])
                  }, A(U.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : P("", !0),
          y.value ? (f(), te($e, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: E(() => [
              d("div", K1, [
                z(Tt, {
                  modelValue: _.value,
                  "onUpdate:modelValue": Z[0] || (Z[0] = (ae) => _.value = ae),
                  options: w,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: E(() => [
              d("div", U1, [
                (f(), te(pt, {
                  key: `${_.value}-${$.value}-${D.value}`,
                  columns: ie.value,
                  rows: K.value,
                  "sort-key": $.value,
                  "sort-direction": D.value,
                  "max-visible-rows": sx,
                  "row-key": "id",
                  onSort: de
                }, {
                  "cell-date": E(({ row: ae }) => [
                    d("span", Y1, A(G(String(ae.date))), 1)
                  ]),
                  "cell-name": E(({ row: ae }) => [
                    d("span", q1, A(b(ae.agent_name)), 1)
                  ]),
                  "cell-email": E(({ row: ae }) => [
                    d("span", X1, A(ae.agent_email), 1)
                  ]),
                  "cell-handled": E(({ row: ae }) => [
                    d("span", G1, A(ee(Number(ae.handled))), 1)
                  ]),
                  "cell-transferred": E(({ row: ae }) => [
                    d("span", Z1, A(ee(Number(ae.transferred))), 1)
                  ]),
                  "cell-abandoned": E(({ row: ae }) => [
                    d("span", Q1, A(v(ae.abandoned)), 1)
                  ]),
                  "cell-connected": E(({ row: ae }) => [
                    d("span", J1, A(m(ae.connected_at)), 1)
                  ]),
                  "cell-disconnected": E(({ row: ae }) => [
                    d("span", ex, A(m(ae.disconnected_at)), 1)
                  ]),
                  "cell-onlineTime": E(({ row: ae }) => [
                    d("span", tx, A(m(ae.online_time_display)), 1)
                  ]),
                  "cell-avgAssignation": E(({ row: ae }) => [
                    d("span", ax, A(ae.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": E(({ row: ae }) => [
                    d("span", nx, A(ae.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : k.value ? P("", !0) : (f(), x("div", ox, [...Z[8] || (Z[8] = [
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
}), lx = /* @__PURE__ */ be(ix, [["__scopeId", "data-v-96b44a98"]]), rx = {
  key: 0,
  class: "w-52"
}, cx = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, dx = { class: "w-full shrink-0 flex min-h-0 flex-col" }, ux = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, hx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, fx = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, gx = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, mx = { class: "max-w-[360px] px-4 text-center" }, px = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, bx = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, vx = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, bi = 5, yx = /* @__PURE__ */ fe({
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
    }, l = Se(n, "theme"), { isDark: r } = Me(l), c = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, u = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], g = (k) => {
      const _ = k.toLowerCase(), w = c[_];
      if (w) return w;
      const $ = Array.from(_).reduce(
        (D, M) => (D << 5) - D + M.charCodeAt(0) | 0,
        0
      );
      return u[Math.abs($) % u.length];
    }, h = ne({
      labels: [],
      datasets: []
    }), b = C(
      () => n.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), m = C(() => {
      const k = b.value.total_by_channel || {}, _ = Object.values(k).reduce(
        ($, D) => $ + D,
        0
      ), w = n.totalConversations ?? _;
      return w === 0 ? [] : Object.entries(k).sort(([, $], [, D]) => D - $).map(([$, D]) => ({
        name: $,
        label: $.toUpperCase(),
        total: D,
        percentage: (D / w * 100).toFixed(1),
        color: g($)
      }));
    }), v = C(
      () => m.value.slice(0, bi)
    ), p = C(() => {
      const k = Math.min(v.value.length, bi);
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    }), y = (k) => {
      if (!k || !k.channels_by_day) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const _ = k.channels_by_day, w = Object.keys(_).sort();
      if (w.length === 0) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const $ = /* @__PURE__ */ new Set();
      for (const O of Object.values(_))
        for (const N of Object.keys(O))
          $.add(N);
      const M = Array.from($).map((O) => ({
        label: O.toUpperCase(),
        data: w.map((N) => _[N]?.[O] || 0),
        borderColor: g(O)
      }));
      h.value = {
        labels: w.map((O) => Ne(O).format("MMM DD")),
        datasets: M
      };
    };
    return Te(
      () => n.data,
      (k) => {
        y(k ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (k, _) => (f(), te($e, {
      class: "w-full min-h-0 self-start",
      title: n.title,
      subtitle: n.subtitle,
      collapsible: !1,
      loading: n.loading
    }, {
      headerAside: E(() => [
        n.breakdownOptions.length ? (f(), x("div", rx, [
          z(Tt, {
            "model-value": n.breakdownBy,
            options: n.breakdownOptions,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value", "options"])
        ])) : P("", !0)
      ]),
      headerExport: E(() => [
        e.enableExport && !n.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", cx, [
          d("div", dx, [
            h.value.labels && h.value.labels.length ? (f(), x("section", ux, [
              d("div", hx, [
                z(mt, {
                  data: h.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              n.showSummaryCards && v.value.length ? (f(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(p.value)
              }, [
                (f(!0), x(he, null, pe(v.value, (w) => (f(), te(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${B(ge)(w.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : P("", !0)
            ])) : n.showSummaryCards && m.value.length ? (f(), x("section", fx, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: _e(p.value)
              }, [
                (f(!0), x(he, null, pe(v.value, (w) => (f(), te(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${B(ge)(w.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : P("", !0),
            m.value.length ? P("", !0) : (f(), x("section", gx, [
              d("div", mx, [
                d("div", px, [
                  z(B(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", bx, A(n.emptyTitle), 1),
                d("p", vx, A(n.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Ol = /* @__PURE__ */ be(yx, [["__scopeId", "data-v-987b8c34"]]), xx = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = C(() => a.data?.total_conversations ?? 0), s = C(() => a.data?.breakdown_by_day ?? {}), i = C(() => a.titles[a.breakdownBy]), l = C(() => ({ agents_by_day: s.value })), r = C(() => ({
      channels_by_day: s.value,
      total_by_channel: Object.fromEntries(
        (a.data?.breakdown_items ?? []).map((c) => [c.key, c.total_conversations])
      ),
      total_conversations: o.value
    }));
    return (c, u) => a.breakdownBy === "channel" ? (f(), te(Ol, {
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
      onChangeBreakdown: u[0] || (u[0] = (g) => n("changeBreakdown", g))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "empty-title", "empty-description"])) : (f(), te(Il, {
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
      onChangeBreakdown: u[1] || (u[1] = (g) => n("changeBreakdown", g))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "max-series", "show-summary-cards", "empty-title", "empty-description"]));
  }
}), kx = { class: "card-body" }, _x = { class: "chart-container" }, wx = { class: "triage-table-block w-full min-w-0" }, Cx = { class: "triage-row-label" }, $x = {
  key: 1,
  class: "triage-count"
}, Sx = {
  key: 1,
  class: "triage-count"
}, Mx = {
  key: 1,
  class: "triage-count"
}, Dx = {
  key: 1,
  class: "triage-count"
}, Ax = {
  key: 1,
  class: "triage-count"
}, Tx = {
  key: 1,
  class: "empty-state"
}, Bx = { class: "empty-state-content" }, Lx = { class: "empty-icon-wrapper" }, Rx = /* @__PURE__ */ fe({
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
      Se(n, "theme")
    ), r = C(() => {
      const _ = n.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, D] of Object.entries(_)) {
        const M = $.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const O = M.filter((N) => N !== "triage").length;
        O >= 4 ? w["4p"] += Number(D) || 0 : w[O] += Number(D) || 0;
      }
      return w;
    }), c = C(() => {
      const _ = r.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), u = C(() => Object.keys(n.data?.combinations || {}).length > 0), g = C(() => {
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
    }), h = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], b = C(() => {
      const _ = g.value, w = r.value;
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
    }, v = (_) => _?.replace("80", "") || "#888888", p = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [g.value.pct0],
          backgroundColor: m.c0,
          borderColor: v(m.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [g.value.pct1],
          backgroundColor: m.c1,
          borderColor: v(m.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [g.value.pct2],
          backgroundColor: m.c2,
          borderColor: v(m.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [g.value.pct3],
          backgroundColor: m.c3,
          borderColor: v(m.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [g.value.pct4p],
          backgroundColor: m.c4p,
          borderColor: v(m.c4p),
          borderWidth: 1
        }
      ]
    })), y = C(() => ({
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
    return t({ isDark: i }), (_, w) => (f(), te($e, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", kx, [
          u.value ? (f(), x(he, { key: 0 }, [
            d("div", _x, [
              z($t, {
                data: p.value,
                options: y.value
              }, null, 8, ["data", "options"])
            ]),
            z(ve, {
              class: "w-full min-w-0",
              title: "Total",
              value: B(ge)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            d("div", wx, [
              z(pt, {
                columns: h,
                rows: b.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": E(({ row: $ }) => [
                  d("span", Cx, A($.metric), 1)
                ]),
                "cell-b0": E(({ row: $ }) => [
                  $.id === "pct" ? (f(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: v(m.c0) })
                  }, A(k(Number($.b0))) + "%", 5)) : (f(), x("span", $x, A(B(ge)(Number($.b0))), 1))
                ]),
                "cell-b1": E(({ row: $ }) => [
                  $.id === "pct" ? (f(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: v(m.c1) })
                  }, A(k(Number($.b1))) + "%", 5)) : (f(), x("span", Sx, A(B(ge)(Number($.b1))), 1))
                ]),
                "cell-b2": E(({ row: $ }) => [
                  $.id === "pct" ? (f(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: v(m.c2) })
                  }, A(k(Number($.b2))) + "%", 5)) : (f(), x("span", Mx, A(B(ge)(Number($.b2))), 1))
                ]),
                "cell-b3": E(({ row: $ }) => [
                  $.id === "pct" ? (f(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: v(m.c3) })
                  }, A(k(Number($.b3))) + "%", 5)) : (f(), x("span", Dx, A(B(ge)(Number($.b3))), 1))
                ]),
                "cell-b4p": E(({ row: $ }) => [
                  $.id === "pct" ? (f(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: v(m.c4p) })
                  }, A(k(Number($.b4p))) + "%", 5)) : (f(), x("span", Ax, A(B(ge)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (f(), x("div", Tx, [
            d("div", Bx, [
              d("div", Lx, [
                z(B(dt), { class: "empty-icon" })
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
}), Ix = /* @__PURE__ */ be(Rx, [["__scopeId", "data-v-be7d2c0c"]]), Px = { class: "card-body" }, Ex = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, Ox = { class: "pie-section" }, Fx = {
  key: 1,
  class: "empty-state"
}, Vx = /* @__PURE__ */ fe({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me(Se(a, "theme")), s = [
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
    }, l = (b) => i[b]?.label || b.toUpperCase(), r = C(
      () => a.data?.items && a.data.items.length > 0
    ), c = C(
      () => (a.data?.items || []).reduce((b, m) => b + m.count, 0)
    ), u = C(() => {
      const b = {};
      for (const m of a.data?.items || [])
        b[m.language] = (b[m.language] || 0) + m.count;
      return Object.entries(b).map(([m, v]) => ({ language: m, count: v })).sort((m, v) => v.count - m.count);
    }), g = C(() => ({
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
    })), h = C(() => ({
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
    return t({ isDark: n }), (b, m) => (f(), te($e, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: a.loading
    }, {
      default: E(() => [
        d("div", Px, [
          r.value ? (f(), x("div", Ex, [
            d("section", Ox, [
              z(Vn, {
                data: g.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ]),
            z(ve, {
              class: "shrink-0",
              title: "Total",
              value: B(ge)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (f(), x("section", Fx, [...m[0] || (m[0] = [
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
}), Nx = /* @__PURE__ */ be(Vx, [["__scopeId", "data-v-9385c088"]]), zx = { class: "card-body" }, jx = {
  key: 0,
  class: "guardrails-daily-section"
}, Hx = { class: "w-full min-w-0" }, Wx = { class: "font-medium" }, Kx = { class: "font-semibold" }, Ux = { class: "type-badges-row" }, Yx = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, qx = {
  key: 1,
  class: "empty-state"
}, Xx = /* @__PURE__ */ fe({
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
    }, { isDark: i } = Me(Se(n, "theme")), l = C(
      () => n.data?.items && n.data.items.length > 0
    ), r = C(
      () => (n.data?.items || []).reduce((p, y) => p + y.count, 0)
    ), c = (p) => {
      const y = {};
      for (const w of n.data?.items || [])
        y[w[p]] = (y[w[p]] || 0) + w.count;
      const k = Object.entries(y).sort((w, $) => $[1] - w[1]);
      if (k.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: k[0][0],
        pct: _ > 0 ? Math.round(k[0][1] / _ * 100) : 0
      };
    }, u = C(() => c("guardrail_type")), g = C(() => c("guardrail_action")), h = C(() => c("guardrail_source")), b = C(() => {
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
    ], v = C(
      () => b.value.map((p) => ({
        id: p.date,
        date: p.date,
        total: p.total,
        types: p.types
      }))
    );
    return t({ isDark: i }), (p, y) => (f(), te($e, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", zx, [
          l.value ? (f(), x(he, { key: 0 }, [
            b.value.length > 0 ? (f(), x("section", jx, [
              d("div", Hx, [
                z(pt, {
                  columns: m,
                  rows: v.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": E(({ row: k }) => [
                    d("span", Wx, A(B(Ne)(String(k.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": E(({ row: k }) => [
                    d("span", Kx, A(B(ge)(k.total)), 1)
                  ]),
                  "cell-types": E(({ row: k }) => [
                    d("div", Ux, [
                      (f(!0), x(he, null, pe(k.types, (_) => (f(), x("span", {
                        key: _.type,
                        class: "type-count-badge"
                      }, A(_.type) + " (" + A(_.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : P("", !0),
            d("section", Yx, [
              z(ve, {
                title: "Total Events",
                value: B(ge)(r.value)
              }, null, 8, ["value"]),
              z(ve, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                title: "Top action",
                value: g.value.name,
                subvalue: g.value.pct > 0 ? `(${g.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                title: "Top source",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (f(), x("section", qx, [...y[0] || (y[0] = [
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
}), Gx = /* @__PURE__ */ be(Xx, [["__scopeId", "data-v-c042ede0"]]), Zx = { class: "card-body" }, Qx = { class: "chart-section" }, Jx = { class: "chart-wrapper" }, ek = {
  key: 1,
  class: "empty-chart"
}, tk = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, ak = {
  key: 0,
  class: "dn-failure-section"
}, nk = { class: "w-full min-w-0" }, ok = { class: "failure-reason" }, sk = { class: "failure-count" }, ik = { class: "impact-bar-container" }, lk = { class: "impact-label" }, rk = { class: "dn-trend-health-block flex flex-col gap-0" }, ck = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, dk = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, uk = { class: "system-health" }, hk = { class: "system-health-content" }, fk = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, gk = {
  key: 1,
  class: "empty-state"
}, mk = /* @__PURE__ */ fe({
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
    }, { isDark: i, colors: l } = Me(Se(n, "theme")), r = C(() => {
      const $ = n.data?.documentCounts?.items || [], D = n.data?.processingCounts?.items || [];
      return $.length > 0 || D.length > 0;
    }), c = C(() => {
      const $ = n.data?.documentCounts?.items || [];
      return {
        processing_started: $.reduce((D, M) => D + M.processing_started, 0),
        processing_completed: $.reduce((D, M) => D + M.processing_completed, 0),
        processing_failed: $.reduce((D, M) => D + M.processing_failed, 0),
        row_count_total: $.reduce((D, M) => D + M.row_count_total, 0)
      };
    }), u = C(() => {
      const $ = n.data?.processingCounts?.items || [];
      return {
        processing_started: $.reduce((D, M) => D + M.processing_started, 0),
        processing_success: $.reduce((D, M) => D + M.processing_success, 0),
        notification_sent: $.reduce((D, M) => D + M.notification_sent, 0),
        notification_failed: $.reduce((D, M) => D + M.notification_failed, 0),
        dq_phone: $.reduce((D, M) => D + M.dq_error_phone_not_found, 0),
        dq_flight: $.reduce((D, M) => D + M.dq_error_flight_not_found, 0),
        dq_booking: $.reduce((D, M) => D + M.dq_error_booking_not_found, 0),
        dq_other: $.reduce((D, M) => D + M.dq_error_other, 0),
        totalDqErrors: $.reduce(
          (D, M) => D + M.dq_error_phone_not_found + M.dq_error_flight_not_found + M.dq_error_booking_not_found + M.dq_error_other,
          0
        )
      };
    }), g = C(
      () => c.value.row_count_total || u.value.processing_started
    ), h = C(
      () => Math.max(0, g.value - u.value.notification_sent)
    ), b = ($, D) => D ? `${Math.round($ / D * 100)}%` : "0%", m = C(() => {
      const $ = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].filter((D) => D.count > 0).sort((D, M) => M.count - D.count);
      return $.length > 0 ? $[0] : { reason: "None", count: 0 };
    }), v = C(() => {
      const $ = g.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].map((D) => ({
        ...D,
        impactPct: $ > 0 ? Math.round(D.count / $ * 100) : 0
      }));
    }), p = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], y = C(
      () => v.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), k = C(() => {
      const $ = g.value, D = u.value.processing_success, M = Math.max(0, D - u.value.totalDqErrors), O = u.value.notification_sent, N = Math.max(0, $ - D), W = u.value.totalDqErrors, S = Math.max(0, M - O), L = (H, Q) => ye(H, Q), T = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], j = [];
      return D > 0 && j.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: D,
        label: L(D, $)
      }), N > 0 && j.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: N,
        label: L(N, $)
      }), M > 0 && j.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: L(M, $)
      }), W > 0 && j.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: W,
        label: L(W, $)
      }), O > 0 && j.push({
        source: "Contactable",
        target: "Notified",
        value: O,
        label: L(O, $)
      }), S > 0 && j.push({
        source: "Contactable",
        target: "Not Delivered",
        value: S,
        label: L(S, $)
      }), { nodes: T, links: j };
    }), _ = C(() => {
      const $ = [...n.data?.processingCounts?.items || []].sort(
        (L, T) => new Date(L.date).getTime() - new Date(T.date).getTime()
      ), D = n.data?.documentCounts?.items || [], M = {};
      for (const L of D)
        M[L.date] = (M[L.date] || 0) + L.row_count_total;
      const O = [
        .../* @__PURE__ */ new Set([
          ...$.map((L) => L.date),
          ...D.map((L) => L.date)
        ])
      ].sort(), N = O.map((L) => Ne(L).format("MMM DD")), W = O.map((L) => {
        const T = $.find((Q) => Q.date === L), j = T?.notification_sent || 0, H = M[L] || T?.processing_started || 0;
        return H > 0 ? Math.round(j / H * 100) : 0;
      }), S = O.map((L) => $.find((j) => j.date === L)?.notification_sent || 0);
      return {
        labels: N,
        datasets: [
          {
            label: "Success Rate (%)",
            data: W,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: S,
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
    return t({ isDark: i }), ($, D) => (f(), te($e, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: D[0] || (D[0] = (M) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", Zx, [
          r.value ? (f(), x(he, { key: 0 }, [
            d("section", Qx, [
              D[2] || (D[2] = d("div", { class: "chart-header" }, [
                d("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              d("div", Jx, [
                k.value.nodes.length > 0 && k.value.links.length > 0 ? (f(), te(Yt, {
                  key: 0,
                  data: k.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (f(), x("div", ek, [...D[1] || (D[1] = [
                  d("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            d("div", tk, [
              z(ve, {
                color: "#3b82f6",
                title: "Total Records",
                value: B(ge)(c.value.row_count_total)
              }, null, 8, ["value"]),
              z(ve, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: B(ge)(g.value)
              }, null, 8, ["value"]),
              z(ve, {
                color: "#10b981",
                title: "Successfully Notified",
                value: B(ge)(u.value.notification_sent),
                subvalue: b(u.value.notification_sent, g.value)
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                color: "#ef4444",
                title: "Not Notified",
                value: B(ge)(h.value),
                subvalue: b(h.value, g.value)
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: m.value.reason,
                subvalue: m.value.count > 0 ? `${B(ge)(m.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            v.value.length > 0 ? (f(), x("section", ak, [
              D[3] || (D[3] = d("div", { class: "section-header" }, [
                d("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              d("div", nk, [
                z(pt, {
                  columns: p,
                  rows: y.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": E(({ row: M }) => [
                    d("span", ok, A(M.reason), 1)
                  ]),
                  "cell-count": E(({ row: M }) => [
                    d("span", sk, A(B(ge)(M.count)), 1)
                  ]),
                  "cell-impact": E(({ row: M }) => [
                    d("div", ik, [
                      d("div", {
                        class: "impact-bar",
                        style: _e({ width: M.impactPct + "%" })
                      }, null, 4),
                      d("span", lk, A(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : P("", !0),
            d("div", rk, [
              _.value.labels.length > 0 ? (f(), x("section", ck, [
                D[4] || (D[4] = d("div", { class: "chart-header" }, [
                  d("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                d("div", dk, [
                  z(mt, {
                    data: _.value,
                    options: w.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : P("", !0),
              d("details", uk, [
                D[5] || (D[5] = d("summary", { class: "system-health-toggle" }, [
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
                  De(" System Health Details ")
                ], -1)),
                d("div", hk, [
                  d("div", fk, [
                    z(ve, {
                      title: "Docs Started",
                      value: B(ge)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Docs Completed",
                      value: B(ge)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Docs Failed",
                      value: B(ge)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Processing Started",
                      value: B(ge)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Processing Success",
                      value: B(ge)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Notification Failed",
                      value: B(ge)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (f(), x("section", gk, [...D[6] || (D[6] = [
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
}), pk = /* @__PURE__ */ be(mk, [["__scopeId", "data-v-2342d485"]]), bk = "Total number of conversations initiated during the selected period.", vk = /* @__PURE__ */ fe({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: bk }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => ge(a.totalConversations)), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), te(tt, {
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
      icon: E(() => [...r[0] || (r[0] = [
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
}), yk = "Score of the top 5% most satisfied customers. If it drops, it serves as an alert that the remaining 95% are receiving worse service and overall quality is declining.", xk = /* @__PURE__ */ fe({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: yk }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${a.csatP95.toFixed(1)}`), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), te(tt, {
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
      icon: E(() => [...r[0] || (r[0] = [
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
}), kk = /* @__PURE__ */ fe({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${a.csatPulse.toFixed(1)}%`), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), te(tt, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), _k = {
  key: 0,
  class: "card-body"
}, wk = { class: "chart-wrapper" }, Ck = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, $k = {
  key: 1,
  class: "empty-state"
}, Sk = 520, Mk = 300, Dk = 40, Ak = 48, Tk = 48, Bk = {
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
    }, s = e, { isDark: i } = Me(Se(s, "theme")), l = C(() => s.data);
    return t({ isDark: i }), (r, c) => (f(), te($e, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !s.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        l.value && l.value.total_nps_responses > 0 ? (f(), x("div", _k, [
          d("div", wk, [
            z(wl, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": Sk,
              "chart-height": Mk,
              "chart-margin": Dk,
              "chart-margin-right": Ak,
              "chart-bottom-margin": Tk,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          d("div", Ck, [
            z(ve, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (f(), te(ve, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : P("", !0)
          ])
        ])) : (f(), x("div", $k, [...c[0] || (c[0] = [
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
}, Fl = /* @__PURE__ */ be(Bk, [["__scopeId", "data-v-e98fe9b2"]]), Lk = {
  key: 0,
  class: "card-body"
}, Rk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ik = {
  key: 1,
  class: "empty-state"
}, Pk = {
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
    }, o = e, s = C(() => o.data?.csat_p95_by_day || []), i = C(() => s.value.length > 0), l = C(() => ({
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
    return (c, u) => (f(), te($e, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        i.value ? (f(), x("div", Lk, [
          d("div", Rk, [
            z(mt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (f(), x("div", Ik, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          d("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Vl = /* @__PURE__ */ be(Pk, [["__scopeId", "data-v-5207cfa7"]]), Ek = {
  key: 0,
  class: "card-body"
}, Ok = {
  key: 1,
  class: "empty-state"
}, Fk = /* @__PURE__ */ fe({
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
    return (i, l) => (f(), te($e, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: E(() => [
        n.value ? (f(), x("div", Ek, [
          z($t, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (f(), x("div", Ok, [...l[0] || (l[0] = [
          d("p", { class: "empty-title" }, "No resolution answers available", -1),
          d("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Vk = /* @__PURE__ */ be(Fk, [["__scopeId", "data-v-6849ef24"]]), Nk = {
  key: 0,
  class: "card-body"
}, zk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, jk = {
  key: 1,
  class: "empty-state"
}, Hk = /* @__PURE__ */ fe({
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
    }, o = e, s = C(() => o.data?.csat_pulse_by_day || []), i = C(() => s.value.length > 0), l = C(() => ({
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
    return (c, u) => (f(), te($e, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: n
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        i.value ? (f(), x("div", Nk, [
          d("div", zk, [
            z(mt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (f(), x("div", jk, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          d("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Wk = /* @__PURE__ */ be(Hk, [["__scopeId", "data-v-72955d9a"]]), Kk = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Uk = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, Nl = {
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
    }, o = e, s = C(() => o.showResolutionChart), i = C(() => o.showCsatPulseChart), l = C(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), r = C(() => l.value > 0), c = C(
      () => l.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (u, g) => (f(), x("div", Kk, [
      d("div", Uk, [
        z(Fl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"]),
        z(Vl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (f(), x("div", {
        key: 0,
        class: X(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (f(), te(Vk, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : P("", !0),
        i.value ? (f(), te(Wk, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])) : P("", !0)
      ], 2)) : P("", !0)
    ]));
  }
}, Yk = { class: "csat-container__body" }, qk = /* @__PURE__ */ fe({
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
    return (o, s) => (f(), te($e, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => a("open"))
    }, {
      default: E(() => [
        d("div", Yk, [
          z(Nl, {
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
}), Xk = /* @__PURE__ */ be(qk, [["__scopeId", "data-v-37178ba1"]]), Gk = "Sum of all sales made across all flows (check-in, seller, ancillaries, booking manager, disruptions) in all currencies, converted to the selected currency.", Zk = /* @__PURE__ */ fe({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: Gk }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => Xt(a.totalRevenue)), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), te(tt, {
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
      icon: E(() => [...r[0] || (r[0] = [
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
}), Qk = { class: "flex justify-end" }, Jk = { class: "w-52" }, e_ = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, t_ = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, a_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, n_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, o_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, s_ = /* @__PURE__ */ fe({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = Se(n, "theme"), { isDark: i, colors: l } = Me(s), r = ne(n.breakdownBy), c = C(() => n.data?.currency ?? "USD"), u = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], g = C(() => {
      const L = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[r.value];
      return L ? `AI Generated Revenue by ${L}` : "AI Generated Revenue";
    }), h = C(() => r.value === "payment_method"), b = [
      "#8b5cf6",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], m = (S) => b[S % b.length], v = (S) => {
      if (!S) return "0";
      const L = Math.abs(S);
      return L >= 1e6 ? (S / 1e6).toFixed(2) + "M" : L >= 1e5 ? (S / 1e3).toFixed(1) + "K" : Math.round(S).toLocaleString();
    }, p = (S) => !S || S === "unknown" ? "Unknown" : kt(S).split(/[_|]/).map((L) => L ? L.charAt(0).toUpperCase() + L.slice(1) : "").join(" "), y = ne({
      labels: [],
      datasets: []
    }), k = ne([]), _ = C(() => {
      const S = Math.min(k.value.length, 5);
      if (!(S <= 0))
        return { gridTemplateColumns: `repeat(${S}, minmax(0, 1fr))` };
    }), w = (S) => {
      const L = S?.ai_revenue_by_day ?? [], T = S?.breakdown ?? [];
      if (!L.length) {
        y.value = { labels: [], datasets: [] }, k.value = [];
        return;
      }
      const j = [...L].sort((q, oe) => q.date.localeCompare(oe.date)), H = j.map((q) => Ne(q.date).format("MMM DD")), Q = "ai_revenue";
      if (r.value === "all") {
        y.value = {
          labels: H,
          datasets: [
            {
              label: `Revenue (${c.value})`,
              data: j.map((q) => Number(q[Q] ?? 0)),
              borderColor: b[0],
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, k.value = [];
        return;
      }
      const ue = T.slice(0, 7).map((q) => q.key).map((q, oe) => {
        const R = m(oe), U = j.map((Y) => {
          const V = (Y.breakdown ?? {})[q];
          return V ? Number(V[Q] ?? 0) : 0;
        });
        return h.value ? {
          label: p(q),
          data: U,
          backgroundColor: R,
          borderColor: R,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: p(q),
          data: U,
          borderColor: R,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      y.value = { labels: H, datasets: ue }, k.value = T.slice(0, 5).map((q, oe) => ({
        key: q.key,
        label: p(q.key),
        amount: `${c.value} ${v(q.total)}`,
        percentage: Number(q.percentage ?? 0),
        color: m(oe)
      }));
    }, $ = C(() => ({
      callback: (S) => `${c.value} ${v(Number(S))}`,
      color: l.value.textSecondary,
      padding: 8
    })), D = C(() => ({
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: l.value.textSecondary, padding: 8 }
    })), M = C(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: $.value
    })), O = C(() => ({
      scales: {
        x: D.value,
        y: M.value
      }
    })), N = C(() => ({
      scales: {
        x: { ...D.value, stacked: !0 },
        y: { ...M.value, stacked: !0 }
      }
    }));
    Te(
      () => n.data,
      (S) => w(S ?? null),
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (S) => {
        r.value = S, w(n.data ?? null);
      }
    );
    const W = (S) => {
      r.value = String(S), o("changeBreakdown", r.value);
    };
    return t({ isDark: i }), (S, L) => (f(), te($e, {
      class: "w-full min-h-0 self-start",
      title: g.value,
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: E(() => [
        d("div", Qk, [
          d("div", Jk, [
            z(Tt, {
              "model-value": r.value,
              options: u,
              "onUpdate:modelValue": W
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: E(() => [
        d("div", {
          class: X(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          z(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              n.loading ? (f(), x("div", e_, [...L[0] || (L[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (f(), x("div", t_, [
                y.value.labels && y.value.labels.length && y.value.datasets.length ? (f(), x("section", a_, [
                  d("div", n_, [
                    h.value ? (f(), te($t, {
                      key: 0,
                      data: y.value,
                      options: N.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (f(), te(mt, {
                      key: 1,
                      data: y.value,
                      options: O.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  k.value.length ? (f(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: _e(_.value)
                  }, [
                    (f(!0), x(he, null, pe(k.value, (T) => (f(), te(ve, {
                      key: `card-${T.key}`,
                      class: "min-w-0",
                      color: T.color,
                      title: T.label,
                      value: T.amount,
                      subvalue: `${T.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : P("", !0)
                ])) : (f(), x("section", o_, [...L[1] || (L[1] = [
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
}), i_ = /* @__PURE__ */ be(s_, [["__scopeId", "data-v-4f72028b"]]), l_ = { class: "flex justify-end" }, r_ = { class: "w-52" }, c_ = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, d_ = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, u_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, h_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, f_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, g_ = /* @__PURE__ */ fe({
  __name: "TransactionsChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = Se(n, "theme"), { isDark: i, colors: l } = Me(s), r = ne(n.breakdownBy), c = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], u = C(() => {
      const L = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[r.value];
      return L ? `Transactions by ${L}` : "Transactions";
    }), g = C(() => r.value === "payment_method"), h = [
      "#8b5cf6",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], b = (S) => h[S % h.length], m = (S) => {
      if (!S) return "0";
      const L = Math.abs(S);
      return L >= 1e6 ? (S / 1e6).toFixed(2) + "M" : L >= 1e5 ? (S / 1e3).toFixed(1) + "K" : Math.round(S).toLocaleString();
    }, v = (S) => !S || S === "unknown" ? "Unknown" : kt(S).split(/[_|]/).map((L) => L ? L.charAt(0).toUpperCase() + L.slice(1) : "").join(" "), p = ne({
      labels: [],
      datasets: []
    }), y = ne([]), k = C(() => {
      const S = Math.min(y.value.length, 5);
      if (!(S <= 0))
        return { gridTemplateColumns: `repeat(${S}, minmax(0, 1fr))` };
    }), _ = (S) => Object.values(S ?? {}).reduce((L, T) => L + Number(T ?? 0), 0), w = (S) => {
      const L = S?.breakdown ?? [];
      if (r.value === "all") {
        const ue = S?.sales_by_channel_by_day ?? [];
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
              borderColor: h[0],
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, y.value = [];
        return;
      }
      const T = S?.transactions_by_day ?? [];
      if (!T.length) {
        p.value = { labels: [], datasets: [] }, y.value = [];
        return;
      }
      const j = [...T].sort((ue, q) => ue.date.localeCompare(q.date)), H = j.map((ue) => Ne(ue.date).format("MMM DD")), re = L.slice(0, 7).map((ue) => ue.key).map((ue, q) => {
        const oe = b(q), R = j.map((U) => Number((U.breakdown ?? {})[ue] ?? 0));
        return g.value ? {
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
      p.value = { labels: H, datasets: re }, y.value = L.slice(0, 5).map((ue, q) => ({
        key: ue.key,
        label: v(ue.key),
        amount: m(ue.count),
        percentage: Number(ue.percentage ?? 0),
        color: b(q)
      }));
    }, $ = C(() => ({
      callback: (S) => m(Number(S)),
      color: l.value.textSecondary,
      padding: 8
    })), D = C(() => ({
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: l.value.textSecondary, padding: 8 }
    })), M = C(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: $.value
    })), O = C(() => ({
      scales: {
        x: D.value,
        y: M.value
      }
    })), N = C(() => ({
      scales: {
        x: { ...D.value, stacked: !0 },
        y: { ...M.value, stacked: !0 }
      }
    }));
    Te(
      () => n.data,
      (S) => w(S ?? null),
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (S) => {
        r.value = S, w(n.data ?? null);
      }
    );
    const W = (S) => {
      r.value = String(S), o("changeBreakdown", r.value);
    };
    return t({ isDark: i }), (S, L) => (f(), te($e, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "Number of transactions generated by agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: E(() => [
        d("div", l_, [
          d("div", r_, [
            z(Tt, {
              "model-value": r.value,
              options: c,
              "onUpdate:modelValue": W
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: E(() => [
        d("div", {
          class: X(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          z(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              n.loading ? (f(), x("div", c_, [...L[0] || (L[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (f(), x("div", d_, [
                p.value.labels && p.value.labels.length && p.value.datasets.length ? (f(), x("section", u_, [
                  d("div", h_, [
                    g.value ? (f(), te($t, {
                      key: 0,
                      data: p.value,
                      options: N.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (f(), te(mt, {
                      key: 1,
                      data: p.value,
                      options: O.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  y.value.length ? (f(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: _e(k.value)
                  }, [
                    (f(!0), x(he, null, pe(y.value, (T) => (f(), te(ve, {
                      key: `card-${T.key}`,
                      class: "min-w-0",
                      color: T.color,
                      title: T.label,
                      value: T.amount,
                      subvalue: `${T.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : P("", !0)
                ])) : (f(), x("section", f_, [...L[1] || (L[1] = [
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
}), m_ = /* @__PURE__ */ be(g_, [["__scopeId", "data-v-df15ed82"]]), vi = 1, p_ = /* @__PURE__ */ fe({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), { isDark: o } = Me(Se(a, "theme")), s = C(() => a.totalConversations * vi), i = C(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * vi), l = C(() => ge(s.value)), r = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!r.value) return 0;
      const h = i.value;
      return h === 0 ? s.value > 0 ? 100 : 0 : (s.value - h) / h * 100;
    }), u = C(() => {
      const h = c.value.toFixed(1);
      return c.value > 0 ? `+${h}%` : `${h}%`;
    }), g = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (h, b) => (f(), te(tt, {
      label: "Cost",
      value: l.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...b[0] || (b[0] = [
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
      headerAside: E(() => [
        r.value ? (f(), x("div", {
          key: 0,
          class: X(["change-badge", g.value, { "change-badge--dark": B(o) }])
        }, A(u.value), 3)) : P("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), b_ = /* @__PURE__ */ be(p_, [["__scopeId", "data-v-411e0735"]]), v_ = { class: "flex justify-end" }, y_ = { class: "w-52" }, x_ = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, k_ = { class: "w-full shrink-0 flex min-h-0 flex-col" }, __ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, w_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, C_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, $_ = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = ($) => {
      o("export", $);
    }, i = [
      { value: "all", label: "All" },
      { value: "agent", label: "Agent" }
    ], l = Se(n, "theme"), { isDark: r } = Me(l), c = ne(n.breakdownBy || "all"), u = C(() => n.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), g = ne({
      labels: [],
      datasets: []
    }), h = ne([]), b = C(() => {
      const $ = h.value.length;
      if (!($ <= 0))
        return { gridTemplateColumns: `repeat(${$}, minmax(0, 1fr))` };
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
    ], p = ($) => v[$ % v.length], y = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: ($) => `${$}%`
          }
        }
      }
    }, k = ($) => {
      c.value = String($), o("changeBreakdown", c.value), w(u.value);
    }, _ = ($) => {
      if (!$) return "";
      const M = $.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return M ? M.charAt(0).toUpperCase() + M.slice(1) : "";
    }, w = ($) => {
      if (c.value === "all") {
        const L = $?.escalations_by_day ?? [];
        if (!L.length) {
          g.value = { labels: [], datasets: [] }, h.value = [], m.value = [];
          return;
        }
        const T = [...L].sort((j, H) => j.date.localeCompare(H.date));
        g.value = {
          labels: T.map((j) => Ne(j.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: T.map(
                (j) => Number(j.escalation_rate_percentage || 0)
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
      const D = $?.breakdown_by_day ?? [], M = $?.breakdown_items ?? [];
      if (!D.length) {
        g.value = { labels: [], datasets: [] }, h.value = [], m.value = [];
        return;
      }
      const O = [...D].sort(
        (L, T) => L.date.localeCompare(T.date)
      ), N = M.slice(0, 5).map((L) => L.key), W = O.map((L) => Ne(L.date).format("MMM DD")), S = N.map((L, T) => {
        const j = M.find((H) => H.key === L);
        return {
          label: _(j?.label || L),
          data: O.map((H) => {
            const Q = H.items.find((re) => re.key === L);
            return Number(Q?.percentage || 0);
          }),
          borderColor: p(T),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      g.value = {
        labels: W,
        datasets: S
      }, h.value = M.slice(0, 5).map((L, T) => ({
        key: L.key,
        label: _(L.label),
        percentage: Number(L.percentage || 0),
        color: p(T)
      })), m.value = M.slice(0, 5).map((L, T) => ({
        key: L.key,
        label: _(L.label),
        color: p(T)
      }));
    };
    return Te(
      () => n.data,
      ($) => {
        w($ ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      ($) => {
        c.value = $, w(u.value);
      }
    ), t({ isDark: r }), ($, D) => (f(), te($e, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      headerAside: E(() => [
        d("div", v_, [
          d("div", y_, [
            z(Tt, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": k
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: E(() => [
        d("div", x_, [
          d("div", k_, [
            g.value.labels && g.value.labels.length && g.value.datasets.length ? (f(), x("section", __, [
              d("div", w_, [
                z(mt, {
                  data: g.value,
                  options: y,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              h.value.length ? (f(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(b.value)
              }, [
                (f(!0), x(he, null, pe(h.value, (M) => (f(), te(ve, {
                  key: `card-${M.key}`,
                  class: "min-w-0",
                  color: M.color,
                  title: M.label,
                  value: `${M.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : P("", !0)
            ])) : (f(), x("section", C_, [...D[0] || (D[0] = [
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
}), S_ = /* @__PURE__ */ be($_, [["__scopeId", "data-v-23d909e1"]]), M_ = "Percentage of conversations transferred to a human out of the total initiated conversations.", D_ = /* @__PURE__ */ fe({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: M_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), te(tt, {
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
      icon: E(() => [...r[0] || (r[0] = [
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
function go(e) {
  if (e == null || Number.isNaN(e)) return "-";
  const t = Math.max(0, Math.round(e)), a = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = t % 60;
  return a > 0 ? `${a}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
const A_ = { class: "flex justify-end" }, T_ = { class: "w-52" }, B_ = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, L_ = { class: "w-full shrink-0 flex min-h-0 flex-col" }, R_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, I_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, P_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, E_ = "#8b5cf6", O_ = "#9ca3af", F_ = "#94a3b8", V_ = /* @__PURE__ */ fe({
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
    ], l = Se(n, "theme"), { isDark: r } = Me(l), c = ne(n.breakdownBy), u = C(() => {
      const oe = {
        resolution_mode: "Resolution Mode",
        agent: "Agent",
        channel: "Channel",
        agent_channel: "Channel & Agent"
      }[c.value];
      return oe ? `Average resolution time by ${oe}` : "Average resolution time";
    }), g = (q) => {
      c.value = String(q), o("changeBreakdown", c.value);
    }, h = [
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
    }, m = (q) => b[q.toLowerCase()] || O_, v = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, p = (q) => v[q.toLowerCase()] || F_, y = (q) => {
      const [oe] = q.split("|").map((R) => R.trim());
      return p(oe || q);
    }, k = (q) => {
      if (!q) return "Unknown";
      const oe = kt(q).replace(/_/g, " ").trim();
      return oe ? oe.charAt(0).toUpperCase() + oe.slice(1) : "Unknown";
    }, _ = C(() => n.data ?? {
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
    }), $ = C(() => {
      const q = _.value, oe = {
        ai_agent: q.ai_agent_total_conversations,
        human: q.human_total_conversations,
        hybrid: q.hybrid_total_conversations
      }, R = {
        ai_agent: q.ai_agent_avg_resolution_time_formatted,
        human: q.human_avg_resolution_time_formatted,
        hybrid: q.hybrid_avg_resolution_time_formatted
      };
      return h.map((U) => ({
        key: U.key,
        label: U.label,
        color: U.color,
        formattedValue: R[U.key] || "-",
        subvalue: `${oe[U.key] || 0} conversations`
      }));
    }), D = (q, oe) => q.map((R) => ({
      key: R.key,
      label: k(R.label),
      color: oe(R.key),
      formattedValue: R.avg_resolution_time_formatted || "-",
      subvalue: `${R.total_conversations} conversations (${R.percentage.toFixed(1)}%)`
    })), M = C(
      () => D(_.value.channel_breakdown_items ?? [], m)
    ), O = C(
      () => D(_.value.agent_breakdown_items ?? [], p)
    ), N = C(
      () => D(
        _.value.agent_channel_breakdown_items ?? [],
        y
      )
    ), W = C(() => {
      switch (c.value) {
        case "channel":
          return M.value;
        case "agent":
          return O.value;
        case "agent_channel":
          return N.value;
        case "resolution_mode":
          return $.value;
        default:
          return [];
      }
    }), S = C(() => {
      const q = W.value.length;
      if (!(q <= 0))
        return { gridTemplateColumns: `repeat(${q}, minmax(0, 1fr))` };
    }), L = (q) => q == null ? null : Number((q / 60).toFixed(2)), T = ne([]), j = (q) => {
      const oe = q?.overall_resolution_time_by_day ?? {}, R = Object.keys(oe).sort((U, Y) => U.localeCompare(Y));
      if (!R.length) {
        w.value = { labels: [], datasets: [] }, T.value = [];
        return;
      }
      T.value = [R.map((U) => oe[U] ?? null)], w.value = {
        labels: R.map((U) => Ne(U).format("MMM DD")),
        datasets: [
          {
            label: "All",
            data: T.value[0].map((U) => L(U)),
            borderColor: E_,
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          }
        ]
      };
    }, H = (q) => {
      const oe = q?.resolution_time_by_day ?? {}, R = Object.keys(oe).sort((U, Y) => U.localeCompare(Y));
      if (!R.length) {
        w.value = { labels: [], datasets: [] }, T.value = [];
        return;
      }
      T.value = h.map(
        (U) => R.map((Y) => oe[Y]?.[U.key] ?? null)
      ), w.value = {
        labels: R.map((U) => Ne(U).format("MMM DD")),
        datasets: h.map((U, Y) => ({
          label: U.label,
          data: T.value[Y].map((V) => L(V)),
          borderColor: U.color,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          spanGaps: !0
        }))
      };
    }, Q = (q, oe, R) => {
      const U = Object.keys(q).sort((V, le) => V.localeCompare(le));
      if (!U.length || !oe.length) {
        w.value = { labels: [], datasets: [] }, T.value = [];
        return;
      }
      const Y = oe.map((V) => V.key);
      T.value = Y.map((V) => U.map((le) => q[le]?.[V] ?? null)), w.value = {
        labels: U.map((V) => Ne(V).format("MMM DD")),
        datasets: Y.map((V, le) => {
          const ce = oe.find((xe) => xe.key === V);
          return {
            label: k(ce?.label || V),
            data: T.value[le].map((xe) => L(xe)),
            borderColor: R(V),
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
          Q(
            q?.channel_resolution_time_by_day ?? {},
            q?.channel_breakdown_items ?? [],
            m
          );
          return;
        case "agent":
          Q(
            q?.agent_resolution_time_by_day ?? {},
            q?.agent_breakdown_items ?? [],
            p
          );
          return;
        case "agent_channel":
          Q(
            q?.agent_channel_resolution_time_by_day ?? {},
            q?.agent_channel_breakdown_items ?? [],
            y
          );
          return;
        case "resolution_mode":
          H(q);
          return;
        default:
          j(q);
      }
    }, ue = C(() => ({
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
              const oe = q.dataset.label || "", R = T.value[q.datasetIndex]?.[q.dataIndex];
              return R == null ? `${oe}: -` : `${oe}: ${go(R)}`;
            }
          }
        }
      }
    }));
    return Te(
      () => n.data,
      (q) => {
        re(q ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (q) => {
        c.value = q, re(n.data ?? null);
      }
    ), t({ isDark: r }), (q, oe) => (f(), te($e, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "How long conversations take to resolve",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      headerAside: E(() => [
        d("div", A_, [
          d("div", T_, [
            z(Tt, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": g
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: E(() => [
        d("div", B_, [
          d("div", L_, [
            w.value.labels.length && w.value.datasets.length ? (f(), x("section", R_, [
              d("div", I_, [
                z(mt, {
                  data: w.value,
                  options: ue.value,
                  theme: l.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              W.value.length ? (f(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(S.value)
              }, [
                (f(!0), x(he, null, pe(W.value, (R) => (f(), te(ve, {
                  key: `card-${R.key}`,
                  class: "min-w-0",
                  color: R.color,
                  title: R.label,
                  value: R.formattedValue,
                  subvalue: R.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : P("", !0)
            ])) : (f(), x("section", P_, [...oe[0] || (oe[0] = [
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
}), N_ = /* @__PURE__ */ be(V_, [["__scopeId", "data-v-05854dc5"]]), z_ = { class: "art-values__item" }, j_ = { class: "art-values__number" }, H_ = { class: "art-values__item" }, W_ = { class: "art-values__number" }, K_ = "Average time from the first message to the resolution of each conversation, broken down by resolver: AI Agent vs. Human.", U_ = /* @__PURE__ */ fe({
  __name: "AvgResolutionTimeCard",
  props: {
    aiAgentAvgResolutionTimeSeconds: { default: null },
    humanAvgResolutionTimeSeconds: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: K_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), { isDark: o } = Me(Se(a, "theme")), s = C(() => go(a.aiAgentAvgResolutionTimeSeconds)), i = C(() => go(a.humanAvgResolutionTimeSeconds));
    return t({ isDark: o }), (l, r) => (f(), te(tt, {
      label: "Average Resolution Time",
      value: s.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
      value: E(() => [
        d("div", {
          class: X(["art-values", { "art-values--dark": B(o) }])
        }, [
          d("div", z_, [
            d("span", j_, A(s.value), 1),
            r[1] || (r[1] = d("span", { class: "art-values__label" }, "AI Agent", -1))
          ]),
          r[3] || (r[3] = d("div", {
            class: "art-values__divider",
            "aria-hidden": "true"
          }, null, -1)),
          d("div", H_, [
            d("span", W_, A(i.value), 1),
            r[2] || (r[2] = d("span", { class: "art-values__label" }, "Human", -1))
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme"]));
  }
}), Y_ = /* @__PURE__ */ be(U_, [["__scopeId", "data-v-39d7bf7a"]]), q_ = "Percentage of Check In Success relative to Check In Started.", X_ = /* @__PURE__ */ fe({
  __name: "CheckinCR",
  props: {
    checkinCr: { default: 0 },
    previousCheckinCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: q_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${Number(a.checkinCr || 0).toFixed(1)}%`), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), te(tt, {
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
      icon: E(() => [...r[0] || (r[0] = [
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
}), G_ = "Percentage of Sell Success relative to Sell Started.", Z_ = /* @__PURE__ */ fe({
  __name: "SellerCR",
  props: {
    sellerCr: { default: 0 },
    previousSellerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: G_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${Number(a.sellerCr || 0).toFixed(1)}%`), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), te(tt, {
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
      icon: E(() => [...r[0] || (r[0] = [
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
}), Q_ = "Percentage of Booking Success relative to Booking Started.", J_ = /* @__PURE__ */ fe({
  __name: "BookingManagerCR",
  props: {
    bookingManagerCr: { default: 0 },
    previousBookingManagerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: Q_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(
      () => `${Number(a.bookingManagerCr || 0).toFixed(1)}%`
    ), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), te(tt, {
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
      icon: E(() => [...r[0] || (r[0] = [
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
}), e2 = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, t2 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, a2 = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, n2 = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, o2 = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, s2 = { class: "max-w-[360px] text-center" }, i2 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, l2 = {
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
    const t = e, { isDark: a, colors: n } = Me(Se(t, "theme")), o = C(() => {
      const l = t.data ?? {}, r = l.daily, c = l.days, u = Array.isArray(r) && r.length > 0, g = Array.isArray(c) && c.length > 0 && Array.isArray(l.allocatedCostSeries) && l.allocatedCostSeries.length === c.length;
      let h = [];
      return u ? h = r : g && (h = c.map((b, m) => ({
        date: b,
        allocated_cost: l.allocatedCostSeries[m] ?? 0,
        aws_cost: l.awsCostSeries[m] ?? 0,
        airline_conversations: l.airlineConversationsSeries[m] ?? 0
      }))), {
        daily: h,
        total_allocated_cost: l.total_allocated_cost ?? l.totalAllocated ?? 0,
        total_cost: l.total_cost ?? l.total ?? 0,
        total_conversations: l.total_conversations ?? l.totalConversations ?? 0,
        total_airline_conversations: l.total_airline_conversations ?? l.totalAirlineConversations ?? 0,
        airline_name: l.airline_name
      };
    }), s = C(() => {
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
    return (l, r) => (f(), te($e, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", e2, [
          o.value.daily.length > 0 ? (f(), x("div", t2, [
            d("div", a2, [
              z(mt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            d("div", n2, [
              z(ve, {
                color: B(n).primaryLight,
                title: "Total Allocated",
                value: B(Oe)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              z(ve, {
                color: "#FF9900",
                title: "Total AWS",
                value: B(Oe)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (f(), x("section", o2, [
            d("div", s2, [
              d("div", i2, [
                z(B(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, r2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, c2 = { class: "card-body" }, d2 = {
  key: 0,
  class: "chart-section"
}, u2 = { class: "chart-container" }, h2 = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, f2 = {
  key: 1,
  class: "empty-state"
}, g2 = { class: "empty-state-content" }, m2 = { class: "empty-icon-wrapper" }, Pa = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", yi = 10, p2 = /* @__PURE__ */ fe({
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
    const n = e, { isDark: o, colors: s } = Me(Se(n, "theme")), i = (m) => {
      const v = new Date(m), p = String(v.getDate()).padStart(2, "0"), y = String(v.getMonth() + 1).padStart(2, "0");
      return `${p}-${y}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((v, p) => v + (p.input_cost || 0), 0);
    }), c = C(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((v, p) => v + (p.output_cost || 0), 0);
    }), u = C(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((v, p) => v + (p.cache_read_cost || 0), 0);
    }), g = C(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((v, p) => v + (p.cache_write_cost || 0), 0);
    }), h = C(() => {
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
            boxWidth: yi,
            boxHeight: yi,
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
    return t({ isDark: o }), (m, v) => (f(), te($e, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", r2, [
          d("div", c2, [
            h.value.labels && h.value.labels.length ? (f(), x("section", d2, [
              d("div", u2, [
                z($t, {
                  data: h.value,
                  options: b.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", h2, [
                z(ve, {
                  title: "Total Cost",
                  value: B(Oe)(e.data.total_cost)
                }, null, 8, ["value"]),
                z(ve, {
                  title: "Input Cost",
                  value: B(Oe)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Output Cost",
                  value: B(Oe)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Cache Read",
                  value: B(Oe)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Cache Write",
                  value: B(Oe)(g.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Avg / Conv.",
                  value: B(Oe)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (f(), x("section", f2, [
              d("div", g2, [
                d("div", m2, [
                  z(B(dt), { class: "empty-icon" })
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
}), b2 = /* @__PURE__ */ be(p2, [["__scopeId", "data-v-e1c4a95b"]]), v2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, y2 = { class: "card-body" }, x2 = {
  key: 0,
  class: "chart-section"
}, k2 = { class: "chart-container" }, _2 = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, w2 = {
  key: 1,
  class: "empty-state"
}, C2 = { class: "empty-state-content" }, $2 = { class: "empty-icon-wrapper" }, Ea = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", xi = 10, S2 = /* @__PURE__ */ fe({
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
    const n = e, { isDark: o, colors: s } = Me(Se(n, "theme")), i = (u) => {
      const g = new Date(u), h = String(g.getDate()).padStart(2, "0"), b = String(g.getMonth() + 1).padStart(2, "0");
      return `${h}-${b}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const u = n.data?.tokens_by_day || {}, g = Object.keys(u).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const h = g.map((m) => i(m)), b = [
        {
          label: "Input Tokens",
          data: g.map((m) => u[m]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: g.map((m) => u[m]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: g.map((m) => u[m]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: g.map((m) => u[m]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: h,
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
              family: Ea,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: xi,
            boxHeight: xi,
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
    return t({ isDark: o }), (u, g) => (f(), te($e, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", v2, [
          d("div", y2, [
            r.value.labels && r.value.labels.length ? (f(), x("section", x2, [
              d("div", k2, [
                z($t, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", _2, [
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: B(ge)(e.data.total_tokens)
                }, null, 8, ["value"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: B(ge)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: B(ge)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: B(ge)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: B(ge)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (f(), x("section", w2, [
              d("div", C2, [
                d("div", $2, [
                  z(B(dt), { class: "empty-icon" })
                ]),
                g[0] || (g[0] = d("p", { class: "empty-title" }, "No token usage data", -1)),
                g[1] || (g[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), M2 = /* @__PURE__ */ be(S2, [["__scopeId", "data-v-554d3cda"]]), D2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, A2 = { class: "card-body" }, T2 = {
  key: 0,
  class: "chart-section"
}, B2 = { class: "chart-container" }, L2 = { class: "mt-4 w-full min-w-0" }, R2 = {
  key: 1,
  class: "empty-state"
}, I2 = { class: "empty-state-content" }, P2 = { class: "empty-icon-wrapper" }, E2 = /* @__PURE__ */ fe({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me(Se(a, "theme")), s = (c) => {
      const u = new Date(c), g = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${g}`;
    }, i = C(
      () => ge(a.data?.total_conversations ?? 0)
    ), l = C(() => {
      const c = a.data?.conversations_by_day || {}, u = Object.keys(c).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const g = u.map((b) => s(b)), h = [
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
        labels: g,
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
    return t({ isDark: n }), (c, u) => (f(), te($e, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", D2, [
          d("div", A2, [
            l.value.labels && l.value.labels.length ? (f(), x("section", T2, [
              d("div", B2, [
                z(mt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              d("div", L2, [
                z(ve, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (f(), x("section", R2, [
              d("div", I2, [
                d("div", P2, [
                  z(B(dt), { class: "empty-icon" })
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
}), O2 = /* @__PURE__ */ be(E2, [["__scopeId", "data-v-311f443a"]]), F2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, V2 = { class: "card-body" }, N2 = {
  key: 0,
  class: "charts-grid"
}, z2 = { class: "chart-section" }, j2 = { class: "chart-container" }, H2 = { class: "chart-section" }, W2 = { class: "chart-container" }, K2 = {
  key: 1,
  class: "empty-state"
}, U2 = { class: "empty-state-content" }, Y2 = { class: "empty-icon-wrapper" }, q2 = /* @__PURE__ */ fe({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me(Se(a, "theme")), s = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((h, b) => (b.total_cost || 0) - (h.total_cost || 0)) : []), l = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((h, b) => (b.total_tokens || 0) - (h.total_tokens || 0)) : []), r = C(() => {
      const h = i.value;
      return h.length === 0 ? { labels: [], datasets: [] } : {
        labels: h.map((b) => kt(b.agent_type)),
        datasets: [
          {
            label: "Total Cost",
            data: h.map((b) => b.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = C(() => {
      const h = l.value;
      return h.length === 0 ? { labels: [], datasets: [] } : {
        labels: h.map((b) => kt(b.agent_type)),
        datasets: [
          {
            label: "Total Tokens",
            data: h.map((b) => b.total_tokens || 0),
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
            title: function(h) {
              return h[0]?.label || "";
            },
            label: function(h) {
              const b = h.label, m = a.data?.top_agents?.find(
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
            callback: function(h) {
              return Oe(h);
            }
          }
        }
      }
    }), g = C(() => a.options ? a.options : {
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
            title: function(h) {
              return h[0]?.label || "";
            },
            label: function(h) {
              const b = h.label, m = a.data?.top_agents?.find(
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
            callback: function(h) {
              return h.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: n }), (h, b) => (f(), te($e, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", F2, [
          d("div", V2, [
            s.value ? (f(), x("div", N2, [
              d("section", z2, [
                b[0] || (b[0] = d("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                d("div", j2, [
                  z($t, {
                    data: r.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              d("section", H2, [
                b[1] || (b[1] = d("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                d("div", W2, [
                  z($t, {
                    data: c.value,
                    options: g.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (f(), x("section", K2, [
              d("div", U2, [
                d("div", Y2, [
                  z(B(dt), { class: "empty-icon" })
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
}), X2 = /* @__PURE__ */ be(q2, [["__scopeId", "data-v-ae26eabc"]]), G2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Z2 = { class: "card-body" }, Q2 = {
  key: 0,
  class: "chart-section"
}, J2 = { class: "chart-container" }, ew = {
  key: 1,
  class: "empty-state"
}, tw = { class: "empty-state-content" }, aw = { class: "empty-icon-wrapper" }, nw = /* @__PURE__ */ fe({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me(Se(a, "theme")), s = {
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
      (g) => g.agent_type?.toLowerCase() !== "triage"
    ) : []), l = C(() => i.value.length > 0), r = C(() => i.value.reduce((g, h) => g + (h.conversations || 0), 0)), c = C(() => {
      const g = i.value;
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const h = g.map((v) => {
        const p = v.agent_type?.toLowerCase();
        return (s[p] || "#a78bfa") + "80";
      }), b = g.map((v) => {
        const p = v.agent_type?.toLowerCase();
        return s[p] || "#a78bfa";
      });
      return {
        labels: g.map((v) => {
          const p = v.conversations || 0, y = r.value ? p / r.value * 100 : 0;
          return `${kt(v.agent_type)} - ${p.toLocaleString()} (${y.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: g.map((v) => v.conversations || 0),
            backgroundColor: h,
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
            label: (g) => {
              const h = (g.label || "").toString(), b = Number(g.parsed) || 0, m = (g.dataset.data || []).reduce((p, y) => p + (Number(y) || 0), 0), v = m ? b / m * 100 : 0;
              return `${h}: ${b.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (g, h) => (f(), te($e, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", G2, [
          d("div", Z2, [
            l.value ? (f(), x("section", Q2, [
              d("div", J2, [
                z(Vn, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (f(), x("section", ew, [
              d("div", tw, [
                d("div", aw, [
                  z(B(dt), { class: "empty-icon" })
                ]),
                h[0] || (h[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
                h[1] || (h[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ow = /* @__PURE__ */ be(nw, [["__scopeId", "data-v-a909b73c"]]), sw = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, iw = { class: "card-body" }, lw = {
  key: 0,
  class: "chart-section"
}, rw = { class: "chart-container" }, cw = {
  key: 1,
  class: "empty-state"
}, dw = { class: "empty-state-content" }, uw = { class: "empty-icon-wrapper" }, hw = /* @__PURE__ */ fe({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me(Se(a, "theme")), s = (c) => {
      const u = new Date(c), g = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${g}`;
    }, i = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, g = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(g).length > 0;
    }), l = C(() => {
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
      const u = a.costData?.costs_by_day || {}, g = a.conversationData?.conversations_by_day || {}, b = Object.keys(u).filter((p) => g[p]).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const m = b.map((p) => s(p)), v = b.map((p) => {
        const y = u[p]?.total_cost || 0, k = g[p] || 0;
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
    return t({ isDark: n }), (c, u) => (f(), te($e, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", sw, [
          d("div", iw, [
            i.value ? (f(), x("section", lw, [
              d("div", rw, [
                z(mt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (f(), x("section", cw, [
              d("div", dw, [
                d("div", uw, [
                  z(B(dt), { class: "empty-icon" })
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
}), fw = /* @__PURE__ */ be(hw, [["__scopeId", "data-v-ae6c48b1"]]), gw = { class: "tabs text-sm" }, mw = ["aria-label"], pw = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], bw = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, vw = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ne([]), s = `tabs-${Ke()}`, i = (m) => `${s}-tab-${m}`, l = C(
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
    function g(m, v) {
      n("tab-click", { value: m.value, originalEvent: v }), !m.disabled && (u(m.value, a.modelValue), We(() => {
        o.value[a.items.indexOf(m)]?.focus();
      }));
    }
    function h(m, v) {
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
      m.key === "ArrowLeft" ? y = h(v, -1) : m.key === "ArrowRight" ? y = h(v, 1) : m.key === "Home" ? y = l.value[0] ?? 0 : m.key === "End" && (y = l.value[l.value.length - 1] ?? v);
      const k = a.items[y];
      !k || k.disabled || (u(k.value, a.modelValue), await We(), o.value[y]?.focus());
    }
    return (m, v) => (f(), x("div", gw, [
      d("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: X([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (f(!0), x(he, null, pe(e.items, (p, y) => (f(), x("button", {
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
          class: X(c(p)),
          onClick: (k) => g(p, k),
          onKeydown: (k) => b(k, y)
        }, [
          d("span", {
            class: X(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            p.icon ? (f(), te(rt(p.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : P("", !0),
            d("span", bw, A(p.label), 1)
          ], 2)
        ], 42, pw))), 128))
      ], 10, mw),
      m.$slots.default ? (f(), te(ct, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: E(() => [
          (f(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            ke(m.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : P("", !0)
    ]));
  }
}), zl = /* @__PURE__ */ be(vw, [["__scopeId", "data-v-f9c367eb"]]), yw = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, xw = { class: "card-body" }, kw = {
  key: 0,
  class: "model-usage-table-block"
}, _w = { class: "w-full min-w-0" }, ww = {
  key: 1,
  class: "empty-state"
}, Cw = { class: "empty-state-content" }, $w = { class: "empty-icon-wrapper" }, Sw = /* @__PURE__ */ fe({
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
    }, { isDark: i } = Me(Se(n, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = ne("by_model"), c = C(() => r.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), u = C(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), g = C(
      () => Object.entries(c.value).map(([m, v]) => ({
        id: m,
        name: m,
        avgCost: b(v.avg_cost_per_message),
        avgTokens: h(v.avg_tokens_per_message),
        messageCount: h(v.message_count),
        totalCost: b(v.total_cost),
        totalTokens: h(v.total_tokens)
      }))
    ), h = (m) => m == null ? "0" : ge(m), b = (m) => m == null ? "$0.00" : Oe(m);
    return t({ isDark: i }), (m, v) => (f(), te($e, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", yw, [
          d("div", xw, [
            z(zl, {
              modelValue: r.value,
              "onUpdate:modelValue": v[0] || (v[0] = (p) => r.value = p),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: E(() => [
                c.value && Object.keys(c.value).length > 0 ? (f(), x("div", kw, [
                  d("div", _w, [
                    z(pt, {
                      columns: u.value,
                      rows: g.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (f(), x("div", ww, [
                  d("div", Cw, [
                    d("div", $w, [
                      z(B(dt), { class: "empty-icon" })
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
}), Mw = /* @__PURE__ */ be(Sw, [["__scopeId", "data-v-48a6cc07"]]), Dw = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Aw = { class: "card-body" }, Tw = {
  key: 0,
  class: "message-roles-table-block"
}, Bw = { class: "w-full min-w-0" }, Lw = {
  key: 1,
  class: "empty-state"
}, Rw = { class: "empty-state-content" }, Iw = { class: "empty-icon-wrapper" }, Pw = /* @__PURE__ */ fe({
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
    }, { isDark: i } = Me(Se(n, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => n.data?.total_by_role || {}), u = C(
      () => l.map((v) => ({
        id: v,
        role: m(v),
        avgCost: b(c.value[v]?.avg_cost_per_message),
        avgTokens: h(c.value[v]?.avg_tokens_per_message),
        messageCount: h(c.value[v]?.message_count),
        totalCost: b(c.value[v]?.total_cost),
        totalTokens: h(c.value[v]?.total_tokens)
      }))
    ), g = C(() => Object.keys(c.value).length > 0), h = (v) => v == null ? "0" : ge(v), b = (v) => v == null ? "$0.00" : Oe(v), m = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, p) => (f(), te($e, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", Dw, [
          d("div", Aw, [
            g.value ? (f(), x("div", Tw, [
              d("div", Bw, [
                z(pt, {
                  columns: r,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (f(), x("div", Lw, [
              d("div", Rw, [
                d("div", Iw, [
                  z(B(dt), { class: "empty-icon" })
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
}), Ew = /* @__PURE__ */ be(Pw, [["__scopeId", "data-v-d38e854e"]]), Ow = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Fw = { class: "card-body" }, Vw = {
  key: 0,
  class: "chart-section"
}, Nw = { class: "chart-container" }, zw = { class: "kpi-grid" }, jw = {
  key: 1,
  class: "empty-state"
}, Hw = { class: "empty-state-content" }, Ww = { class: "empty-icon-wrapper" }, Kw = 40, Uw = 230, Yw = /* @__PURE__ */ fe({
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
    }, { isDark: i, colors: l } = Me(Se(n, "theme")), r = {
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
    }, c = (_) => _.agent_type || _.agent_id || _.agent_name || "", u = (_) => _.agent_name ? kt(_.agent_name) : kt(c(_)).split("_").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" ").replace(/V\d+$/, "").trim(), g = (_) => {
      const w = c(_).toLowerCase();
      for (const [$, D] of Object.entries(r))
        if (w.includes($))
          return D;
      return "#9ca3af";
    }, h = C(() => [...n.data?.top_agents || []].sort((w, $) => $.avg_cost_per_conversation - w.avg_cost_per_conversation)), b = C(
      () => Math.max(Uw, h.value.length * Kw + 32)
    ), m = C(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : h.value.reduce((_, w) => _ + w.conversations, 0)), v = C(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : h.value.reduce((_, w) => _ + w.total_cost, 0)), p = C(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : m.value === 0 ? 0 : v.value / m.value), y = C(() => {
      const _ = h.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const w = _.map((M) => u(M)), $ = _.map((M) => M.avg_cost_per_conversation), D = _.map((M) => g(M));
      return {
        labels: w,
        datasets: [
          {
            label: "USD per conversation",
            data: $,
            backgroundColor: D.map((M) => `${M}80`),
            borderColor: D,
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
              const w = h.value[_[0]?.dataIndex];
              return w ? u(w) : "";
            },
            label: function(_) {
              const w = h.value[_.dataIndex];
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
    return t({ isDark: i }), (_, w) => (f(), te($e, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (f(), te(B(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : P("", !0)
      ]),
      default: E(() => [
        d("div", Ow, [
          d("div", Fw, [
            y.value.labels && y.value.labels.length ? (f(), x("section", Vw, [
              d("div", Nw, [
                z($t, {
                  data: y.value,
                  options: k.value,
                  "height-px": b.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              d("footer", zw, [
                z(B(ve), {
                  title: "Total Agents",
                  value: String(h.value.length)
                }, null, 8, ["value"]),
                z(B(ve), {
                  title: "Total Conversations",
                  value: B(ge)(m.value)
                }, null, 8, ["value"]),
                z(B(ve), {
                  title: "Total Cost",
                  value: B(Oe)(v.value)
                }, null, 8, ["value"]),
                z(B(ve), {
                  title: "Avg Cost / Conv.",
                  value: B(Oe)(p.value)
                }, null, 8, ["value"])
              ])
            ])) : (f(), x("section", jw, [
              d("div", Hw, [
                d("div", Ww, [
                  z(B(dt), { class: "empty-icon" })
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
}), qw = /* @__PURE__ */ be(Yw, [["__scopeId", "data-v-2a8f51ca"]]), ki = /* @__PURE__ */ fe({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (f(), x("svg", {
      class: X(["inline-flex shrink-0 animate-spin", a.value]),
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
}), Xw = ["disabled", "aria-expanded", "aria-label"], Gw = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, Zw = { class: "min-w-0 truncate" }, Qw = ["disabled", "onClick", "onMouseenter"], Jw = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, e5 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, t5 = { class: "min-w-0 flex-1 text-left" }, a5 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, n5 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, o5 = ["disabled", "aria-expanded", "aria-label"], s5 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, i5 = ["disabled", "onClick", "onMouseenter"], l5 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, r5 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, c5 = { class: "min-w-0 flex-1 text-left" }, d5 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, u5 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, h5 = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, f5 = ["type", "disabled", "aria-busy", "aria-label"], g5 = {
  key: 2,
  class: "min-w-0 truncate"
}, m5 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, p5 = ["type", "disabled", "aria-busy", "aria-label"], b5 = {
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
    const a = e, n = t, o = en(), s = C(
      () => !!a.tooltip?.trim() && a.variant !== "dropdown" && a.variant !== "split"
    ), i = C(() => a.variant === "dropdown"), l = C(() => a.variant === "split"), r = C(() => a.variant === "action"), c = C(() => !r.value && !l.value), u = C(() => a.disabled || a.loading), g = C(
      () => a.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), h = C(() => {
      const R = o["aria-label"];
      if (typeof R == "string" && R.length > 0) return R;
      if ((r.value || l.value) && a.tooltip?.trim()) return a.tooltip.trim();
    }), b = C(() => {
      const R = o.type;
      return R === "submit" || R === "reset" || R === "button" ? R : "button";
    }), m = C(() => {
      const { class: R, type: U, "aria-label": Y, ...V } = o;
      return V;
    }), v = C(() => a.variant === "primary" || a.variant === "dropdown" ? [
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
    ]), p = `kiut-button-menu-${Ke()}`, y = `${p}-btn`, k = `${p}-menu`, _ = ne(null), w = ne(null), $ = ne(null), D = ne(!1), M = ne(0), O = ne({}), N = C(() => a.options.filter((R) => !R.disabled));
    function W(R) {
      return `${R.value}-${R.label}`;
    }
    function S() {
      const R = w.value;
      if (!R) return;
      const U = R.getBoundingClientRect(), Y = {
        top: `${U.bottom - 3}px`,
        minWidth: `max(${U.width}px, ${a.menuMinWidth})`
      };
      a.menuAlign === "right" ? (Y.right = `${window.innerWidth - U.right}px`, Y.left = "auto") : (Y.left = `${U.left}px`, Y.right = "auto"), O.value = Y;
    }
    function L(R) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        M.value === R ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function T() {
      D.value = !1;
    }
    function j() {
      S(), M.value = 0, We(() => $.value?.focus());
    }
    function H() {
      if (!a.disabled) {
        if (D.value) {
          T();
          return;
        }
        D.value = !0, j();
      }
    }
    function Q(R) {
      R.disabled || (n("select", R), T());
    }
    function re(R) {
      R.stopPropagation(), H();
    }
    function ue(R) {
      if (!D.value) return;
      const U = R.target, Y = _.value, V = $.value;
      Y && !Y.contains(U) && (!V || !V.contains(U)) && T();
    }
    function q(R) {
      a.disabled || (R.key === "ArrowDown" || R.key === "Enter" || R.key === " ") && (R.preventDefault(), D.value || (D.value = !0, j()));
    }
    function oe(R) {
      const U = N.value;
      if (R.key === "Escape") {
        R.preventDefault(), T(), w.value?.focus();
        return;
      }
      if (U.length !== 0) {
        if (R.key === "ArrowDown") {
          R.preventDefault(), M.value = Math.min(M.value + 1, U.length - 1);
          return;
        }
        if (R.key === "ArrowUp") {
          R.preventDefault(), M.value = Math.max(M.value - 1, 0);
          return;
        }
        if (R.key === "Enter" || R.key === " ") {
          R.preventDefault();
          const Y = U[M.value];
          Y && Q(Y);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", ue);
    }), at(() => {
      document.removeEventListener("click", ue);
    }), (R, U) => i.value ? (f(), x("div", {
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
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [v.value, B(o).class]],
        disabled: e.disabled,
        "aria-expanded": D.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": h.value
      }, m.value, {
        onClick: re,
        onKeydown: q
      }), [
        R.$slots.icon ? (f(), x("span", Gw, [
          ke(R.$slots, "icon")
        ])) : P("", !0),
        d("span", Zw, [
          ke(R.$slots, "default")
        ]),
        z(B(na), {
          class: X(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", D.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, Xw),
      (f(), te(Wt, { to: "body" }, [
        Qe(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: _e(O.value),
          onKeydown: Be(oe, ["stop"])
        }, [
          (f(!0), x(he, null, pe(N.value, (Y, V) => (f(), x("button", {
            key: W(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: X(L(V)),
            onClick: Be((le) => Q(Y), ["stop"]),
            onMouseenter: (le) => M.value = V
          }, [
            Y.icon ? (f(), x("span", Jw, [
              (f(), te(rt(Y.icon), { class: "h-5 w-5" }))
            ])) : (f(), x("span", e5)),
            d("span", t5, [
              d("span", a5, A(Y.label), 1),
              Y.description ? (f(), x("span", n5, A(Y.description), 1)) : P("", !0)
            ])
          ], 42, Qw))), 128))
        ], 36), [
          [Kt, D.value]
        ])
      ]))
    ], 512)) : l.value ? (f(), x("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [v.value, B(o).class]],
        disabled: e.disabled,
        "aria-expanded": D.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": h.value
      }, m.value, {
        onClick: re,
        onKeydown: q
      }), [
        R.$slots.icon ? (f(), x("span", s5, [
          ke(R.$slots, "icon")
        ])) : P("", !0)
      ], 16, o5),
      (f(), te(Wt, { to: "body" }, [
        Qe(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: _e(O.value),
          onKeydown: Be(oe, ["stop"])
        }, [
          (f(!0), x(he, null, pe(N.value, (Y, V) => (f(), x("button", {
            key: W(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: X(L(V)),
            onClick: Be((le) => Q(Y), ["stop"]),
            onMouseenter: (le) => M.value = V
          }, [
            Y.icon ? (f(), x("span", l5, [
              (f(), te(rt(Y.icon), { class: "h-5 w-5" }))
            ])) : (f(), x("span", r5)),
            d("span", c5, [
              d("span", d5, A(Y.label), 1),
              Y.description ? (f(), x("span", u5, A(Y.description), 1)) : P("", !0)
            ])
          ], 42, i5))), 128))
        ], 36), [
          [Kt, D.value]
        ])
      ]))
    ], 512)) : s.value ? (f(), x("span", h5, [
      d("button", yt({
        type: b.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [g.value, v.value, B(o).class]],
        disabled: u.value,
        "aria-busy": e.loading || void 0,
        "aria-label": h.value
      }, m.value), [
        e.loading ? (f(), te(ki, {
          key: 0,
          compact: r.value
        }, null, 8, ["compact"])) : R.$slots.icon ? (f(), x("span", {
          key: 1,
          class: X(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          ke(R.$slots, "icon")
        ], 2)) : P("", !0),
        c.value ? (f(), x("span", g5, [
          ke(R.$slots, "default")
        ])) : P("", !0)
      ], 16, f5),
      d("span", m5, A(e.tooltip), 1)
    ])) : (f(), x("button", yt({
      key: 3,
      type: b.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [g.value, v.value, B(o).class]],
      disabled: u.value,
      "aria-busy": e.loading || void 0,
      "aria-label": h.value
    }, m.value), [
      e.loading ? (f(), te(ki, {
        key: 0,
        compact: r.value
      }, null, 8, ["compact"])) : R.$slots.icon ? (f(), x("span", {
        key: 1,
        class: X(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        ke(R.$slots, "icon")
      ], 2)) : P("", !0),
      c.value ? (f(), x("span", b5, [
        ke(R.$slots, "default")
      ])) : P("", !0)
    ], 16, p5));
  }
}), v5 = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], y5 = { class: "sr-only" }, jl = /* @__PURE__ */ fe({
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
    return (s, i) => (f(), x("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "data-kiut-toggle-size": e.size,
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: X([
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        e.size === "sm" ? "h-6 w-11" : "h-8 w-[3.75rem]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        $a(Be(o, ["prevent", "stop"]), ["space"]),
        $a(Be(o, ["prevent"]), ["enter"])
      ]
    }, [
      d("span", {
        class: X(["pointer-events-none inline-block translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", [
          e.size === "sm" ? "h-5 w-5" : "h-7 w-7",
          e.modelValue ? e.size === "sm" ? "translate-x-5" : "translate-x-7" : "translate-x-0"
        ]]),
        "aria-hidden": "true"
      }, null, 2),
      d("span", y5, A(e.ariaLabel), 1)
    ], 42, v5));
  }
}), x5 = {
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
}, k5 = [
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
], t8 = [
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
], _5 = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, w5 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, C5 = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, $5 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, S5 = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, M5 = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, D5 = ["aria-expanded", "aria-label", "onClick"], A5 = { class: "min-w-0 flex-1" }, T5 = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, B5 = ["colspan"], L5 = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, R5 = ["aria-label"], I5 = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, P5 = {
  key: 2,
  class: "space-y-2"
}, E5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, O5 = ["title"], F5 = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, V5 = { class: "ml-auto flex shrink-0 items-center gap-2" }, N5 = /* @__PURE__ */ fe({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => k5 },
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
      set(S) {
        o.value = S, n("update:expandedKeys", S);
      }
    }), i = C(() => ({
      ...x5,
      ...a.labels
    })), l = C(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), r = {
      GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      PATCH: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    };
    function c(S) {
      return `cell-${S}`;
    }
    function u(S, L, T) {
      return {
        row: S,
        column: L,
        index: T,
        expanded: v(S, T)
      };
    }
    function g(S) {
      const L = S.key;
      return S.label ? S.label : L in i.value ? i.value[L] : S.key;
    }
    function h(S) {
      return S === "center" ? "text-center" : S === "right" ? "text-right" : "text-left";
    }
    function b(S) {
      return S === l.value;
    }
    function m(S, L) {
      if (typeof a.rowKey == "function")
        return a.rowKey(S);
      const T = S[a.rowKey];
      return T != null ? String(T) : `__index_${L}`;
    }
    function v(S, L) {
      return s.value.includes(m(S, L));
    }
    function p(S) {
      return S.versionsLoading === !0;
    }
    function y(S, L) {
      const T = m(S, L), j = new Set(s.value);
      j.has(T) ? (j.delete(T), n("collapse", T, S)) : (a.singleExpand && j.clear(), j.add(T), n("expand", T, S)), s.value = [...j];
    }
    function k(S) {
      return S.type ?? S.key;
    }
    function _(S) {
      return r[S] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function w(S) {
      return S === "published" ? "success" : "warning";
    }
    function $(S) {
      const L = S instanceof Date ? S : new Date(S);
      return Number.isNaN(L.getTime()) ? String(S) : L.toLocaleDateString("es-ES");
    }
    function D(S) {
      const L = S instanceof Date ? S : new Date(S);
      return Number.isNaN(L.getTime()) ? String(S) : L.toLocaleString("es-ES");
    }
    function M(S) {
      return He("div", { class: "min-w-0" }, [
        He(
          "p",
          { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" },
          S.name
        ),
        S.description ? He(
          "p",
          { class: "truncate text-xs text-[color:var(--kiut-text-muted)]" },
          S.description
        ) : null
      ]);
    }
    function O(S) {
      return S.method ? He(
        "span",
        {
          class: [
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            _(S.method)
          ]
        },
        S.method
      ) : null;
    }
    function N(S, L) {
      const T = L.actions ?? ["view", "edit"], j = [];
      for (const H of T)
        H === "view" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => n("view", S)
            },
            { icon: () => He(fi, { class: "h-4 w-4" }) }
          )
        ) : H === "run" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => n("run", S)
            },
            { icon: () => He(fp, { class: "h-4 w-4" }) }
          )
        ) : H === "edit" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => n("edit", S)
            },
            { icon: () => He(hp, { class: "h-4 w-4" }) }
          )
        ) : H === "createDraft" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => n("createDraft", S)
            },
            { icon: () => He(hi, { class: "h-4 w-4" }) }
          )
        ) : H === "delete" && j.push(
          He(
            Mt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => n("delete", S)
            },
            { icon: () => He(gp, { class: "h-4 w-4" }) }
          )
        );
      return He(
        "div",
        { class: "flex items-center justify-end gap-1" },
        j
      );
    }
    function W(S, L, T) {
      switch (k(L)) {
        case "name":
          return M(S);
        case "method":
          return O(S);
        case "url":
          return S.url ? He(
            "span",
            {
              class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
              title: S.url
            },
            S.url
          ) : null;
        case "status":
          return He(
            Xe,
            { color: w(S.status), outlined: !1 },
            () => S.status
          );
        case "version":
          return He("span", {}, S.version);
        case "updated":
          return He(
            "span",
            { class: "whitespace-nowrap text-xs" },
            $(S.updatedAt)
          );
        case "active":
          return He(jl, {
            modelValue: S.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (H) => n("toggleActive", S, H)
          });
        case "actions":
          return N(S, L);
        default:
          return He("span", {}, String(S[L.key] ?? ""));
      }
    }
    return (S, L) => (f(), x("div", _5, [
      d("div", w5, [
        d("table", C5, [
          d("thead", null, [
            d("tr", $5, [
              (f(!0), x(he, null, pe(e.columns, (T) => (f(), x("th", {
                key: T.key,
                scope: "col",
                class: X([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  h(T.align),
                  T.headerClass ?? ""
                ])
              }, A(g(T)), 3))), 128))
            ])
          ]),
          d("tbody", null, [
            (f(!0), x(he, null, pe(e.rows, (T, j) => (f(), x(he, {
              key: m(T, j)
            }, [
              d("tr", S5, [
                (f(!0), x(he, null, pe(e.columns, (H) => (f(), x("td", {
                  key: H.key,
                  class: X([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    h(H.align),
                    H.cellClass ?? ""
                  ])
                }, [
                  ke(S.$slots, c(H.key), yt({ ref_for: !0 }, u(T, H, j)), () => [
                    b(H.key) ? (f(), x("div", M5, [
                      d("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": v(T, j),
                        "aria-label": v(T, j) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (Q) => y(T, j)
                      }, [
                        z(B(na), {
                          class: X(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !v(T, j) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, D5),
                      d("div", A5, [
                        (f(), te(rt(() => W(T, H))))
                      ])
                    ])) : (f(), te(rt(() => W(T, H)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              v(T, j) ? (f(), x("tr", T5, [
                d("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  d("h4", L5, A(i.value.historialTitle), 1),
                  p(T) ? (f(), x("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (f(!0), x(he, null, pe(e.historySkeletonCount, (H) => (f(), x("div", {
                      key: H,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...L[0] || (L[0] = [
                      no('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, R5)) : T.versions?.length ? (f(), x("div", P5, [
                    (f(!0), x(he, null, pe(T.versions, (H) => (f(), x("div", {
                      key: H.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      ke(S.$slots, "history-item", {
                        version: H,
                        row: T
                      }, () => [
                        z(Xe, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: E(() => [
                            De(A(H.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        d("span", E5, A(H.version), 1),
                        H.method ? (f(), x("span", {
                          key: 0,
                          class: X(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", _(H.method)])
                        }, A(H.method), 3)) : P("", !0),
                        H.url ? (f(), x("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: H.url
                        }, A(H.url), 9, O5)) : P("", !0),
                        d("span", F5, A(D(H.updatedAt)), 1)
                      ], !0),
                      d("div", V5, [
                        ke(S.$slots, "history-actions", {
                          version: H,
                          row: T
                        }, () => [
                          z(Mt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => n("viewVersion", H, T)
                          }, {
                            icon: E(() => [
                              z(B(fi), { class: "h-4 w-4" })
                            ]),
                            default: E(() => [
                              De(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          z(Mt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => n("createDraftFromVersion", H, T)
                          }, {
                            icon: E(() => [
                              z(B(hi), { class: "h-4 w-4" })
                            ]),
                            default: E(() => [
                              De(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (f(), x("p", I5, A(i.value.emptyHistory), 1))
                ], 8, B5)
              ])) : P("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), z5 = /* @__PURE__ */ be(N5, [["__scopeId", "data-v-177ecafb"]]);
function _i(e, t) {
  return f(), x("svg", {
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
function j5(e, t) {
  return f(), x("svg", {
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
function H5(e, t) {
  return f(), x("svg", {
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
function W5(e, t) {
  return f(), x("svg", {
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
function K5(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function U5(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" })
  ]);
}
function Y5(e, t) {
  return f(), x("svg", {
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
function q5(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const X5 = ["aria-label"], G5 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, Z5 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Q5 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, J5 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], eC = { class: "truncate" }, tC = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, aC = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, nC = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, oC = ["aria-label", "onClick"], sC = ["aria-label", "onClick"], iC = ["aria-label"], lC = ["aria-label"], rC = {
  key: 1,
  class: "space-y-2"
}, cC = ["for"], dC = ["id", "placeholder", "onKeydown"], uC = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, hC = ["aria-label"], fC = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, gC = ["checked", "onChange"], mC = { class: "min-w-0 flex-1" }, pC = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, bC = { class: "flex flex-wrap items-end gap-2" }, vC = { class: "min-w-[120px] flex-1" }, yC = ["for"], xC = ["id"], kC = { class: "min-w-[120px] flex-1" }, _C = ["for"], wC = ["id"], CC = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = mo(), i = `${`kiut-filters-${Ke()}`}-panel`, l = ne(null), r = /* @__PURE__ */ new Map(), c = ne(null), u = ne(!1), g = ne({}), h = ne(null), b = ne(""), m = ne([]), v = ne(""), p = ne(""), y = C(() => c.value ? a.filterDefinitions.find((F) => F.id === c.value) ?? null : null), k = C(() => {
      const F = y.value;
      if (F)
        return F.type === "text" ? b.value : F.type === "select" ? m.value : { start: v.value, end: p.value };
    });
    function _(F, J) {
      J && J instanceof HTMLElement ? r.set(F, J) : r.delete(F);
    }
    function w(F) {
      return a.modelValue[F];
    }
    function $(F) {
      if (F == null) return [];
      if (Array.isArray(F))
        return F.filter((J) => typeof J == "string" && J.trim() !== "");
      if (typeof F == "string") {
        const J = F.trim();
        return J ? [J] : [];
      }
      return [];
    }
    function D(F, J) {
      if (J == null) return !0;
      if (F.type === "text") return String(J).trim() === "";
      if (F.type === "select") return $(J).length === 0;
      if (F.type === "dateRange") {
        const se = J;
        return !se?.start?.trim() || !se?.end?.trim();
      }
      return !0;
    }
    const M = C(
      () => a.filterDefinitions.some((F) => !D(F, w(F.id)))
    ), O = C(() => {
      const F = [];
      for (const J of a.filterDefinitions) {
        const se = w(J.id);
        if (!D(J, se)) {
          if (J.type === "text")
            F.push({ kind: "text", def: J, key: J.id });
          else if (J.type === "dateRange")
            F.push({ kind: "dateRange", def: J, key: J.id });
          else if (J.type === "select")
            for (const me of $(se))
              F.push({
                kind: "select",
                def: J,
                optionValue: me,
                key: `${J.id}::${me}`
              });
        }
      }
      return F;
    });
    function N(F) {
      return F.type !== "select" ? 0 : $(w(F.id)).length;
    }
    function W(F) {
      const J = w(F.id), se = F.label.replace(/^\+\s*/, "");
      if (F.type === "text") return `${se}: ${String(J ?? "").trim()}`;
      if (F.type === "select") {
        const Ie = $(J).map((qe) => F.options.find((pa) => pa.value === qe)?.label ?? qe);
        return `${se}: ${Ie.join(", ")}`;
      }
      const me = J, Ce = L(me.start), we = L(me.end);
      return `${se}: ${Ce} – ${we}`;
    }
    function S(F) {
      return F.kind === "text" || F.kind === "dateRange" ? W(F.def) : F.def.options.find((se) => se.value === F.optionValue)?.label ?? F.optionValue;
    }
    function L(F) {
      if (!F) return "";
      const J = Ne(F, "YYYY-MM-DD", !0);
      return J.isValid() ? J.format("L") : F;
    }
    function T(F) {
      const J = c.value === F.id && u.value, se = !D(F, w(F.id));
      return J || se ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function j(F) {
      return D(F, w(F.id)) ? ee(F) : `Editar filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    function H(F) {
      const J = w(F.id);
      if (F.type === "text") {
        b.value = J != null ? String(J) : "";
        return;
      }
      if (F.type === "select") {
        m.value = [...$(J)];
        return;
      }
      const se = J;
      v.value = se?.start?.trim() ?? "", p.value = se?.end?.trim() ?? "";
    }
    function Q() {
      const F = y.value;
      if (!F || F.type !== "select") return;
      const J = { ...a.modelValue };
      m.value.length === 0 ? delete J[F.id] : J[F.id] = [...m.value], n("update:modelValue", J), n("change", J);
    }
    function re(F) {
      const J = m.value.indexOf(F);
      J >= 0 ? m.value = m.value.filter((se, me) => me !== J) : m.value = [...m.value, F], Q();
    }
    function ue(F) {
      if (!F) return;
      h.value = F;
      const J = F.getBoundingClientRect(), se = 300;
      let me = J.left;
      const Ce = window.innerWidth - se - 12;
      me > Ce && (me = Math.max(12, Ce)), me < 12 && (me = 12);
      const we = J.bottom + 8;
      g.value = {
        top: `${we}px`,
        left: `${me}px`,
        width: `${Math.min(se, window.innerWidth - 24)}px`
      };
    }
    function q(F, J) {
      if (c.value === F.id && u.value) {
        V();
        return;
      }
      u.value && c.value !== F.id && V(), c.value = F.id, u.value = !0, H(F), We().then(async () => {
        ue(J.currentTarget), await We(), R();
      });
    }
    function oe(F, J) {
      if (c.value === F.id && u.value) {
        V();
        return;
      }
      u.value && c.value !== F.id && V(), c.value = F.id, u.value = !0, H(F), We().then(async () => {
        const se = r.get(F.id) ?? J.currentTarget;
        ue(se), await We(), R();
      });
    }
    function R() {
      const F = l.value;
      if (!F) return;
      F.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function U() {
      u.value = !1, c.value = null, h.value = null;
    }
    function Y(F) {
      const J = y.value;
      if (!J) return;
      if (J.type === "text") {
        b.value = F != null ? String(F) : "";
        return;
      }
      if (J.type === "select") {
        m.value = Array.isArray(F) ? F.filter((me) => typeof me == "string") : $(F);
        return;
      }
      const se = F;
      v.value = se?.start?.trim() ?? "", p.value = se?.end?.trim() ?? "";
    }
    function V() {
      const F = y.value;
      if (!F) return;
      if (F.type === "text") {
        const Ce = b.value.trim(), we = { ...a.modelValue };
        Ce === "" ? delete we[F.id] : we[F.id] = Ce, n("update:modelValue", we), n("change", we), U();
        return;
      }
      if (F.type === "select") {
        Q(), U();
        return;
      }
      const J = v.value.trim(), se = p.value.trim(), me = { ...a.modelValue };
      !J || !se || J > se ? delete me[F.id] : me[F.id] = { start: J, end: se }, n("update:modelValue", me), n("change", me), U();
    }
    function le(F) {
      const J = { ...a.modelValue };
      delete J[F], n("update:modelValue", J), n("change", J), c.value === F && U();
    }
    function ce(F) {
      if (F.kind === "text" || F.kind === "dateRange") {
        le(F.def.id);
        return;
      }
      const J = { ...a.modelValue }, me = $(J[F.def.id]).filter((Ce) => Ce !== F.optionValue);
      me.length === 0 ? delete J[F.def.id] : J[F.def.id] = me, n("update:modelValue", J), n("change", J), c.value === F.def.id && H(F.def);
    }
    function xe() {
      const F = {};
      n("update:modelValue", F), n("change", F), U();
    }
    const K = C(() => {
      const F = y.value;
      return F ? `Editar filtro: ${F.label}` : "Filtro";
    });
    function ie(F) {
      const J = F.def.label.replace(/^\+\s*/, "");
      return F.kind === "select" ? `Quitar ${F.def.options.find((Ce) => Ce.value === F.optionValue)?.label ?? F.optionValue} del filtro ${J}` : `Quitar filtro ${J}`;
    }
    function de(F) {
      const J = F.def.label.replace(/^\+\s*/, "");
      if (F.kind === "select") {
        const me = F.def.options.find((Ce) => Ce.value === F.optionValue)?.label ?? F.optionValue;
        return `Editar filtro ${J}: ${me}`;
      }
      return `Editar filtro ${J}`;
    }
    function ee(F) {
      return `Añadir filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    const G = C(() => a.clearLabel);
    function I(F) {
      if (!u.value || !l.value) return;
      const J = F.target;
      if (!(l.value.contains(J) || (J instanceof Element ? J : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const me of r.values())
          if (me?.contains(J)) return;
        V();
      }
    }
    function Z(F) {
      F.key === "Escape" && u.value && (F.preventDefault(), U());
    }
    function ae() {
      !u.value || !h.value || ue(h.value);
    }
    return Je(() => {
      document.addEventListener("mousedown", I, !0), window.addEventListener("keydown", Z, !0), window.addEventListener("resize", ae);
    }), Mi(() => {
      document.removeEventListener("mousedown", I, !0), window.removeEventListener("keydown", Z, !0), window.removeEventListener("resize", ae);
    }), Te(
      () => a.modelValue,
      () => {
        const F = y.value;
        F && u.value && !o.panel && H(F);
      },
      { deep: !0 }
    ), (F, J) => (f(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      d("div", G5, [
        d("span", Z5, A(e.label), 1),
        d("div", Q5, [
          (f(!0), x(he, null, pe(e.filterDefinitions, (se) => (f(), x("button", {
            key: `pill-${se.id}`,
            ref_for: !0,
            ref: (me) => _(se.id, me),
            type: "button",
            class: X(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", T(se)]),
            "aria-label": j(se),
            "aria-expanded": c.value === se.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === se.id ? i : void 0,
            onClick: (me) => oe(se, me)
          }, [
            z(B(K5), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            d("span", eC, A(se.label), 1),
            se.type === "select" && N(se) > 0 ? (f(), x("span", tC, A(N(se)), 1)) : P("", !0)
          ], 10, J5))), 128))
        ])
      ]),
      M.value ? (f(), x("div", aC, [
        d("div", nC, [
          (f(!0), x(he, null, pe(O.value, (se) => (f(), x("div", {
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
              ke(F.$slots, "formatChip", {
                filter: se.def,
                value: w(se.def.id),
                optionValue: se.kind === "select" ? se.optionValue : void 0
              }, () => [
                De(A(S(se)), 1)
              ], !0)
            ], 8, oC),
            d("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": ie(se),
              onClick: (me) => ce(se)
            }, [
              z(B(q5), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, sC)
          ]))), 128))
        ]),
        d("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": G.value,
          onClick: xe
        }, A(e.clearLabel), 9, iC)
      ])) : P("", !0),
      (f(), te(Wt, { to: "body" }, [
        c.value && u.value ? (f(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": K.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: _e(g.value),
          onKeydown: J[3] || (J[3] = Be(() => {
          }, ["stop"]))
        }, [
          y.value ? (f(), x(he, { key: 0 }, [
            F.$slots.panel ? ke(F.$slots, "panel", {
              key: 0,
              filter: y.value,
              close: V,
              value: k.value,
              updateValue: Y
            }, void 0, !0) : (f(), x("div", rC, [
              y.value.type === "text" ? (f(), x(he, { key: 0 }, [
                d("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(y.value.label), 9, cC),
                Qe(d("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": J[0] || (J[0] = (se) => b.value = se),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: y.value.placeholder ?? "…",
                  onKeydown: $a(Be(V, ["prevent"]), ["enter"])
                }, null, 40, dC), [
                  [It, b.value]
                ])
              ], 64)) : y.value.type === "select" ? (f(), x(he, { key: 1 }, [
                d("p", uC, A(y.value.label), 1),
                d("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": y.value.label,
                  "aria-multiselectable": !0
                }, [
                  (f(!0), x(he, null, pe(y.value.options, (se) => (f(), x("li", {
                    key: se.value
                  }, [
                    d("label", fC, [
                      d("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: m.value.includes(se.value),
                        onChange: (me) => re(se.value)
                      }, null, 40, gC),
                      d("span", mC, A(se.label), 1)
                    ])
                  ]))), 128))
                ], 8, hC)
              ], 64)) : y.value.type === "dateRange" ? (f(), x(he, { key: 2 }, [
                d("p", pC, A(y.value.label), 1),
                d("div", bC, [
                  d("div", vC, [
                    d("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, yC),
                    Qe(d("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": J[1] || (J[1] = (se) => v.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, xC), [
                      [It, v.value]
                    ])
                  ]),
                  d("div", kC, [
                    d("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, _C),
                    Qe(d("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": J[2] || (J[2] = (se) => p.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, wC), [
                      [It, p.value]
                    ])
                  ])
                ])
              ], 64)) : P("", !0)
            ]))
          ], 64)) : P("", !0)
        ], 44, lC)) : P("", !0)
      ]))
    ], 8, X5));
  }
}), $C = /* @__PURE__ */ be(CC, [["__scopeId", "data-v-f38e0100"]]), SC = { class: "font-sans" }, MC = ["for"], DC = { class: "relative" }, AC = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], TC = ["id"], Hl = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = en(), s = Di("$pcForm", null), i = `kiut-input-text-${Ke()}`, l = C(() => a.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a.name ?? o.name ?? ""), u = ne(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (y) => {
        u.value = y ?? "";
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), at(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const g = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? u.value : u.value), h = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
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
    const p = C(() => {
      const { name: y, id: k, type: _, ...w } = o;
      return w;
    });
    return (y, k) => (f(), x("div", SC, [
      e.label ? (f(), x("label", {
        key: 0,
        for: l.value,
        class: X(B(ut))
      }, A(e.label), 11, MC)) : P("", !0),
      d("div", DC, [
        e.icon ? (f(), te(rt(e.icon), {
          key: 0,
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        })) : P("", !0),
        d("input", yt(p.value, {
          id: l.value,
          name: c.value,
          type: e.type,
          autocomplete: "off",
          class: [
            B(et),
            e.icon ? "pl-10" : "",
            h.value ? B(Dt) : ""
          ],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: g.value,
          "aria-invalid": h.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: b,
          onChange: m,
          onBlur: v
        }), null, 16, AC)
      ]),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: r.value,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 11, TC)) : P("", !0)
    ]));
  }
}), BC = { class: "font-sans" }, LC = ["for"], RC = { class: "relative" }, IC = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], PC = ["aria-label"], EC = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, OC = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, FC = ["id"], VC = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = en(), s = Di("$pcForm", null), i = `kiut-input-password-${Ke()}`, l = C(() => a.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a.name ?? o.name ?? ""), u = ne(!1), g = ne(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (k) => {
        k !== void 0 && k !== g.value && (g.value = k);
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), at(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? g.value : g.value), b = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function m(k) {
      const _ = k.target.value;
      g.value = _, n("update:modelValue", _);
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
    const y = C(() => {
      const { name: k, id: _, ...w } = o;
      return w;
    });
    return (k, _) => (f(), x("div", BC, [
      e.label ? (f(), x("label", {
        key: 0,
        for: l.value,
        class: X(B(ut))
      }, A(e.label), 11, LC)) : P("", !0),
      d("div", RC, [
        d("input", yt(y.value, {
          id: l.value,
          name: c.value,
          type: u.value ? "text" : "password",
          autocomplete: "current-password",
          class: [B(et), b.value ? B(Dt) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: h.value,
          "aria-invalid": b.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: m,
          onChange: v,
          onBlur: p
        }), null, 16, IC),
        d("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => u.value = !u.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": u.value ? "Hide password" : "Show password"
        }, [
          u.value ? (f(), x("svg", OC, [..._[2] || (_[2] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (f(), x("svg", EC, [..._[1] || (_[1] = [
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
        ], 8, PC)
      ]),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: r.value,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 11, FC)) : P("", !0)
    ]));
  }
}), NC = { class: "font-sans" }, zC = ["for"], jC = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], HC = ["id"], WC = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-textarea-${Ke()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = C({
      get: () => a.modelValue,
      set: (r) => n("update:modelValue", r)
    });
    return (r, c) => (f(), x("div", NC, [
      e.label ? (f(), x("label", {
        key: 0,
        for: s.value,
        class: X(B(ut))
      }, A(e.label), 11, zC)) : P("", !0),
      Qe(d("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: X([B(I0), e.invalid ? B(Dt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, jC), [
        [It, l.value]
      ]),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: i.value,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 11, HC)) : P("", !0)
    ]));
  }
}), KC = { class: "font-sans" }, UC = ["for"], YC = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], qC = ["for"], XC = ["title"], GC = ["aria-label"], ZC = {
  key: 2,
  class: "space-y-3"
}, QC = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], JC = ["for"], e$ = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, t$ = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, a$ = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, n$ = { class: "flex items-start gap-2" }, o$ = { class: "min-w-0 flex-1 space-y-2" }, s$ = { class: "flex items-center gap-2" }, i$ = ["title"], l$ = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, r$ = ["aria-label", "onClick"], c$ = ["id"], d$ = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-file-${Ke()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = ne(null), r = C(
      () => a.multiple ? null : a.modelValue
    ), c = C(() => {
      if (!a.multiple) return [];
      const M = a.modelValue;
      return Array.isArray(M) ? M : [];
    }), u = C(
      () => r.value?.name ?? a.placeholder
    ), g = C(
      () => a.multiple && c.value.length >= a.maxFiles
    ), h = C(() => c.value.length === 0 ? a.placeholder : c.value.length === 1 ? c.value[0].file.name : `${c.value.length} archivos seleccionados`);
    function b(M) {
      return a.showDescriptions && a.submitted && a.requireDescriptions && M.description.trim() === "";
    }
    function m(M) {
      return M < 1024 ? `${M} B` : M < 1024 * 1024 ? `${(M / 1024).toFixed(1)} KB` : `${(M / (1024 * 1024)).toFixed(1)} MB`;
    }
    function v(M) {
      return {
        id: `file-${Ke()}`,
        file: M,
        description: ""
      };
    }
    function p(M, O) {
      return M.some(
        (N) => N.file.name === O.name && N.file.size === O.size && N.file.lastModified === O.lastModified
      );
    }
    function y() {
      l.value && (l.value.value = "");
    }
    function k(M) {
      const N = M.target.files?.[0] ?? null;
      n("update:modelValue", N);
    }
    function _(M) {
      const O = M.target, N = Array.from(O.files ?? []);
      if (N.length === 0) return;
      const W = [...c.value];
      for (const S of N) {
        if (W.length >= a.maxFiles) break;
        p(W, S) || W.push(v(S));
      }
      n("update:modelValue", W), y();
    }
    function w() {
      n("update:modelValue", null), y();
    }
    function $(M) {
      n(
        "update:modelValue",
        c.value.filter((O) => O.id !== M)
      );
    }
    function D(M, O) {
      n(
        "update:modelValue",
        c.value.map(
          (N) => N.id === M ? { ...N, description: O } : N
        )
      );
    }
    return (M, O) => (f(), x("div", KC, [
      e.label ? (f(), x("label", {
        key: 0,
        for: s.value,
        class: X(B(ut))
      }, A(e.label), 11, UC)) : P("", !0),
      e.multiple ? (f(), x("div", ZC, [
        d("div", {
          class: X([
            B(et),
            "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
            e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
            e.invalid ? B(Dt) : "",
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
            disabled: e.disabled || g.value,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0,
            onChange: _
          }, null, 40, QC),
          d("label", {
            for: s.value,
            class: X(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || g.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            z(B(ho), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            De(" " + A(e.chooseLabel), 1)
          ], 10, JC),
          d("span", e$, A(h.value), 1),
          e.filesCountLabel ? (f(), x("span", t$, A(e.filesCountLabel), 1)) : P("", !0)
        ], 2),
        c.value.length > 0 ? (f(), x("ul", a$, [
          (f(!0), x(he, null, pe(c.value, (N) => (f(), x("li", {
            key: N.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            d("div", n$, [
              z(B(cp), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              d("div", o$, [
                d("div", s$, [
                  d("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: N.file.name
                  }, A(N.file.name), 9, i$),
                  d("span", l$, A(m(N.file.size)), 1),
                  e.disabled ? P("", !0) : (f(), x("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (W) => $(N.id)
                  }, [
                    z(B(fo), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, r$))
                ]),
                e.showDescriptions ? (f(), te(Hl, {
                  key: 0,
                  "model-value": N.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: b(N),
                  "error-text": b(N) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (W) => D(N.id, W)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : P("", !0)
              ])
            ])
          ]))), 128))
        ])) : P("", !0)
      ])) : (f(), x("div", {
        key: 1,
        class: X([
          B(et),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? B(Dt) : "",
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
        }, null, 40, YC),
        d("label", {
          for: s.value,
          class: X(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          z(B(ho), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          De(" " + A(e.chooseLabel), 1)
        ], 10, qC),
        d("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: u.value || void 0
        }, A(u.value), 9, XC),
        r.value && !e.disabled ? (f(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: w
        }, [
          z(B(fo), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, GC)) : P("", !0)
      ], 2)),
      e.errorText ? (f(), x("p", {
        key: 3,
        id: i.value,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 11, c$)) : P("", !0)
    ]));
  }
}), u$ = ["for"], h$ = { class: "flex w-full min-w-0 items-center gap-3" }, f$ = ["for", "aria-label"], g$ = ["src"], m$ = ["id", "accept", "disabled"], p$ = ["id", "value", "placeholder", "disabled"], b$ = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ne(!1), s = ne(null), i = `kiut-image-upload-circle-${Ke()}`, l = C(() => a.id ?? i), r = C(() => `${l.value}-url`), c = C(() => a.size === "sm" ? "h-10 w-10" : a.size === "lg" ? "h-16 w-16" : "h-12 w-12"), u = C(() => a.size === "sm" ? "h-4 w-4" : a.size === "lg" ? "h-6 w-6" : "h-5 w-5"), g = C(() => !a.disabled && !a.loading);
    Te(
      () => a.modelValue,
      () => {
        o.value = !1;
      }
    );
    function h(m) {
      const v = m.target, p = v.files?.[0];
      p && n("select", p), v.value = "";
    }
    function b(m) {
      n("update:modelValue", m.target.value);
    }
    return (m, v) => (f(), x("div", yt({ class: "font-sans flex w-full flex-col gap-2" }, m.$attrs), [
      e.label ? (f(), x("label", {
        key: 0,
        for: l.value,
        class: X(B(ut))
      }, A(e.label), 11, u$)) : P("", !0),
      d("div", h$, [
        d("label", {
          for: l.value,
          class: X(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
            c.value,
            g.value ? "cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]" : "cursor-not-allowed opacity-60"
          ]]),
          "aria-label": e.uploadAriaLabel
        }, [
          e.modelValue && !o.value && !e.loading ? (f(), x("img", {
            key: 0,
            src: e.modelValue,
            alt: "",
            class: "h-full w-full object-cover",
            onError: v[0] || (v[0] = (p) => o.value = !0)
          }, null, 40, g$)) : e.loading ? (f(), te(B(ip), {
            key: 1,
            class: X([u.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (f(), te(B(ho), {
            key: 2,
            class: X([u.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, f$),
        d("input", {
          id: l.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: h
        }, null, 40, m$),
        e.showUrlInput ? (f(), x("div", {
          key: 0,
          class: X(["min-w-0 flex-1 basis-0", e.urlInputClass])
        }, [
          d("input", {
            id: r.value,
            type: "text",
            autocomplete: "off",
            value: e.modelValue,
            placeholder: e.urlPlaceholder,
            disabled: e.disabled,
            class: X([B(et), "w-full min-w-0"]),
            onInput: b
          }, null, 42, p$)
        ], 2)) : P("", !0)
      ])
    ], 16));
  }
}), v$ = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, y$ = {
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  es: ["lu", "ma", "mi", "ju", "vi", "sá", "do"]
}, x$ = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, k$ = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, _$ = {
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
}, w$ = {
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
}, C$ = [
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
function $$(e = "en") {
  return v$[e];
}
function S$(e = "en") {
  return y$[e];
}
function Wl(e = "en") {
  return C$.map((t) => ({ id: t, label: w$[e][t] }));
}
function M$(e = "en") {
  return "Presets";
}
Wl("es");
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
function D$(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ve(a);
}
function Oa(e, t) {
  return D$(e, -t);
}
function A$(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Kl(e, t = /* @__PURE__ */ new Date()) {
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
      return { start: n, end: A$(n) };
    }
    case "yearToDate":
      return { start: new Date(a.getFullYear(), 0, 1), end: a };
  }
}
function Ul(e, t, a) {
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
function T$(e, t, a = /* @__PURE__ */ new Date(), n, o) {
  if (!e.start || !e.end) return !1;
  const s = Ul(Kl(t, a), n, o);
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
function Yl(e, t) {
  return an(e, t) >= 0;
}
function ql(e, t) {
  return an(e, t) <= 0;
}
function Xl(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - n.getDay());
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function B$(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - (n.getDay() + 6) % 7);
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function _a(e) {
  if (!e?.trim()) return null;
  const t = x$.exec(e.trim());
  if (!t) return null;
  const a = Number(t[1]), n = Number(t[2]), o = Number(t[3]), s = Number(t[4]), i = Number(t[5]), l = new Date(a, n - 1, o, s, i);
  return Number.isNaN(l.getTime()) ? null : l;
}
function L$(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0"), o = String(e.getHours()).padStart(2, "0"), s = String(e.getMinutes()).padStart(2, "0");
  return `${t}-${a}-${n}T${o}:${s}`;
}
function R$(e) {
  const t = _a(e);
  return t ? `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : "00:00";
}
function I$(e, t = "es") {
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
function wi(e, t) {
  return e.getTime() < t.getTime();
}
function Ci(e, t) {
  return e.getTime() > t.getTime();
}
function In(e, t = "en") {
  return `${k$[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function jt(e, t = "en") {
  return `${_$[t][e.getMonth()]} ${e.getFullYear()}`;
}
const P$ = ["name", "value"], E$ = { class: "flex flex-row gap-3 items-center" }, O$ = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, F$ = ["for"], V$ = ["id", "disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], N$ = ["aria-label", "onKeydown"], z$ = { class: "p-3" }, j$ = { class: "mb-4 flex items-center justify-between gap-2" }, H$ = ["aria-label"], W$ = { class: "min-w-0 truncate px-1 text-sm font-medium text-[#61616b] dark:text-[#e3e3e8]" }, K$ = ["aria-label"], U$ = { class: "mb-2 grid grid-cols-7 text-center text-xs font-normal tracking-wide text-[#61616b] dark:text-[#e3e3e8]" }, Y$ = { class: "grid grid-cols-7 gap-y-2" }, q$ = ["disabled", "onClick"], X$ = { class: "border-t border-gray-200 px-3 py-3 dark:border-[color:var(--kiut-border-light)]" }, G$ = { class: "relative" }, Z$ = ["value", "disabled", "min", "max", "step", "aria-label"], Q$ = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-datetime-${Ke()}`, s = `${o}-label`, i = C(() => a.id ?? `${o}-btn`), l = `${o}-panel`, r = `${o}-err`, c = ne(null), u = ne(null), g = ne(null), h = ne(!1), b = ne(_t(/* @__PURE__ */ new Date())), m = ne(null), v = ne("00:00"), p = C(() => !!a.modelValue), y = C(() => S$(a.locale)), k = C(() => B$(b.value)), _ = C(() => a.placeholder), w = C(() => a.modelValue ? I$(a.modelValue, a.locale) : a.placeholder), $ = C(() => {
      const K = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${K}` : `left-0 right-auto ${K}`;
    }), D = C(
      () => a.locale === "es" ? "Calendario de fecha y hora" : "Date and time calendar"
    ), M = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), O = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), N = C(
      () => a.locale === "es" ? "Hora" : "Time"
    ), W = C(() => _a(a.min)), S = C(() => _a(a.max)), L = C(() => {
      if (!(!m.value || !W.value) && bt(m.value, W.value))
        return `${String(W.value.getHours()).padStart(2, "0")}:${String(W.value.getMinutes()).padStart(2, "0")}`;
    }), T = C(() => {
      if (!(!m.value || !S.value) && bt(m.value, S.value))
        return `${String(S.value.getHours()).padStart(2, "0")}:${String(S.value.getMinutes()).padStart(2, "0")}`;
    });
    function j(K, ie) {
      return K.getMonth() === ie.getMonth() && K.getFullYear() === ie.getFullYear();
    }
    function H(K) {
      const ie = Ve(K);
      return !!(W.value && Ht(ie, Ve(W.value)) || S.value && $n(ie, Ve(S.value)));
    }
    function Q(K) {
      const ie = j(K, b.value), de = H(K), ee = m.value ? bt(K, m.value) : !1;
      if (de)
        return "rounded-lg text-[#61616b] opacity-40";
      let G = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white";
      return ee && (G = "rounded-lg bg-[#895af6] font-semibold text-white"), ie || (G = `${G} opacity-30`), G;
    }
    function re() {
      const K = _a(a.modelValue);
      if (K) {
        m.value = Ve(K), v.value = R$(a.modelValue), b.value = _t(K);
        return;
      }
      m.value = null, v.value = "00:00", b.value = _t(/* @__PURE__ */ new Date());
    }
    function ue(K) {
      if (!m.value) return K;
      let ie = _a(
        `${st(m.value)}T${K}`
      );
      return ie ? (W.value && bt(m.value, W.value) && wi(ie, W.value) && (ie = W.value), S.value && bt(m.value, S.value) && Ci(ie, S.value) && (ie = S.value), `${String(ie.getHours()).padStart(2, "0")}:${String(ie.getMinutes()).padStart(2, "0")}`) : K;
    }
    function q() {
      if (!m.value) {
        n("update:modelValue", null);
        return;
      }
      const K = ue(v.value);
      v.value = K;
      const ie = new Date(
        m.value.getFullYear(),
        m.value.getMonth(),
        m.value.getDate(),
        Number(K.slice(0, 2)),
        Number(K.slice(3, 5))
      ), de = L$(ie);
      W.value && wi(ie, W.value) || S.value && Ci(ie, S.value) || n("update:modelValue", de);
    }
    function oe(K) {
      H(K) || (m.value = Ve(K), v.value = ue(v.value), q());
    }
    function R(K) {
      const ie = K.target.value;
      ie && (v.value = ie, q());
    }
    function U(K) {
      b.value = Da(b.value, K);
    }
    function Y() {
      h.value = !1;
    }
    function V() {
      a.disabled || (re(), h.value = !0, We(() => g.value?.focus()));
    }
    function le(K) {
      if (K.stopPropagation(), !a.disabled) {
        if (h.value) {
          Y();
          return;
        }
        V();
      }
    }
    function ce(K) {
      a.disabled || (K.key === "ArrowDown" || K.key === "Enter" || K.key === " ") && (K.preventDefault(), h.value || V());
    }
    function xe(K) {
      if (!h.value) return;
      const ie = c.value;
      ie && !ie.contains(K.target) && Y();
    }
    return Te(
      () => a.modelValue,
      () => {
        h.value || re();
      }
    ), Je(() => {
      re(), document.addEventListener("click", xe);
    }), at(() => {
      document.removeEventListener("click", xe);
    }), (K, ie) => (f(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.name ? (f(), x("input", {
        key: 0,
        type: "hidden",
        name: e.name,
        value: e.modelValue ?? ""
      }, null, 8, P$)) : P("", !0),
      d("div", E$, [
        K.$slots.icon ? (f(), x("span", O$, [
          ke(K.$slots, "icon")
        ])) : P("", !0),
        e.label ? (f(), x("label", {
          key: 1,
          id: s,
          for: i.value,
          class: X(B(ut))
        }, A(e.label), 11, F$)) : P("", !0)
      ]),
      d("button", {
        id: i.value,
        ref_key: "buttonRef",
        ref: u,
        type: "button",
        disabled: e.disabled,
        class: X([
          B(et),
          "flex w-full items-center gap-2 text-left",
          e.invalid ? B(Dt) : "",
          h.value && !e.invalid ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "dialog",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : _.value,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? r : void 0,
        onClick: le,
        onKeydown: ce
      }, [
        z(B(Oo), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: X([
            "min-w-0 flex-1 truncate",
            p.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(w.value), 3)
      ], 42, V$),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: r,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 3)) : P("", !0),
      Qe(d("div", {
        ref_key: "panelRef",
        ref: g,
        id: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": D.value,
        class: X([
          $.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $a(Be(Y, ["stop"]), ["escape"])
      }, [
        d("div", z$, [
          d("div", j$, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": M.value,
              onClick: ie[0] || (ie[0] = Be((de) => U(-1), ["stop"]))
            }, [
              z(B(Fo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, H$),
            d("span", W$, A(B(jt)(b.value, e.locale)), 1),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": O.value,
              onClick: ie[1] || (ie[1] = Be((de) => U(1), ["stop"]))
            }, [
              z(B(Vo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, K$)
          ]),
          d("div", U$, [
            (f(!0), x(he, null, pe(y.value, (de) => (f(), x("span", { key: de }, A(de), 1))), 128))
          ]),
          d("div", Y$, [
            (f(!0), x(he, null, pe(k.value, (de) => (f(), x("button", {
              key: B(st)(de),
              type: "button",
              disabled: H(de),
              class: X(["relative mx-auto flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed", Q(de)]),
              onClick: Be((ee) => oe(de), ["stop"])
            }, A(de.getDate()), 11, q$))), 128))
          ])
        ]),
        d("div", X$, [
          d("div", G$, [
            z(B($l), {
              class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
              "aria-hidden": "true"
            }),
            d("input", {
              value: v.value,
              type: "time",
              autocomplete: "off",
              class: X([B(et), "min-h-0 py-2 pl-10 pr-3 text-sm"]),
              disabled: !m.value,
              min: L.value,
              max: T.value,
              step: e.step,
              "aria-label": N.value,
              onInput: R,
              onClick: ie[2] || (ie[2] = Be(() => {
              }, ["stop"]))
            }, null, 42, Z$)
          ])
        ])
      ], 42, N$), [
        [Kt, h.value]
      ])
    ], 512));
  }
}), J$ = { class: "font-sans" }, e4 = { class: "flex flex-row gap-3 items-center" }, t4 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, a4 = ["for"], n4 = { class: "relative" }, o4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], s4 = ["id"], i4 = /* @__PURE__ */ fe({
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
    function a(g) {
      const h = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(g.trim());
      if (!h) return null;
      const b = Number(h[1]), m = Number(h[2]);
      return !Number.isInteger(b) || !Number.isInteger(m) || b < 0 || b > 23 || m < 0 || m > 59 ? null : `${String(b).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }
    function n(g) {
      return g === "" ? null : a(g);
    }
    const o = e, s = t, i = `kiut-input-time-${Ke()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function u(g) {
      const h = g.target.value;
      s("update:modelValue", n(h));
    }
    return (g, h) => (f(), x("div", J$, [
      d("div", e4, [
        g.$slots.icon ? (f(), x("span", t4, [
          ke(g.$slots, "icon")
        ])) : P("", !0),
        e.label ? (f(), x("label", {
          key: 1,
          for: l.value,
          class: X(B(ut))
        }, A(e.label), 11, a4)) : P("", !0)
      ]),
      d("div", n4, [
        z(B($l), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: X([
            B(et),
            "pl-10",
            e.invalid ? B(Dt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: u
        }, null, 42, o4)
      ]),
      e.errorText ? (f(), x("p", {
        key: 0,
        id: r.value,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 11, s4)) : P("", !0)
    ]));
  }
}), l4 = { class: "font-sans" }, r4 = ["for"], c4 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, d4 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], u4 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, h4 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, f4 = { class: "min-w-0 text-left leading-snug" }, g4 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, m4 = { class: "min-w-0 text-right leading-snug" }, p4 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, b4 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, v4 = ["id"], y4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-range-${Ke()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      const b = [];
      return a.errorText && b.push(i.value), b.length ? b.join(" ") : void 0;
    }), r = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = C(() => !!(a.captionMin || a.captionMax)), u = C(() => {
      const { min: b, max: m, modelValue: v } = a;
      if (m === b) return 0;
      const p = (v - b) / (m - b);
      return Math.min(100, Math.max(0, p * 100));
    }), g = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function h(b) {
      const m = Number(b.target.value);
      n("update:modelValue", Number.isNaN(m) ? a.min : m);
    }
    return (b, m) => (f(), x("div", l4, [
      e.label ? (f(), x("label", {
        key: 0,
        for: s.value,
        class: X(B(ut))
      }, A(e.label), 11, r4)) : P("", !0),
      d("div", {
        class: X(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (f(), x("p", c4, A(e.captionMax), 1)) : P("", !0),
        d("div", {
          class: X(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: _e(g.value)
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
            class: X([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "dark:[--kiut-range-track:#282836] dark:[--kiut-range-thumb-bg:#282836] dark:[--kiut-range-thumb-shadow:none]",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: h
          }, null, 42, d4)
        ], 6),
        e.orientation === "horizontal" && r.value ? (f(), x("p", u4, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (f(), x("div", h4, [
          d("span", f4, A(e.captionMin), 1),
          d("span", g4, A(e.caption), 1),
          d("span", m4, A(e.captionMax), 1)
        ])) : P("", !0),
        e.orientation === "vertical" && e.captionMin ? (f(), x("p", p4, A(e.captionMin), 1)) : P("", !0),
        e.orientation === "vertical" && e.caption ? (f(), x("p", b4, A(e.caption), 1)) : P("", !0)
      ], 2),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: i.value,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 11, v4)) : P("", !0)
    ]));
  }
}), x4 = /* @__PURE__ */ be(y4, [["__scopeId", "data-v-ce7263e4"]]), k4 = { class: "font-sans" }, _4 = ["for"], w4 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], C4 = ["id"], $4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-number-${Ke()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), r = C(
      () => a.modelValue === null || a.modelValue === void 0 ? "" : String(a.modelValue)
    );
    function c(u) {
      const g = u.target.value;
      if (g === "") {
        n("update:modelValue", null);
        return;
      }
      const h = Number(g);
      n("update:modelValue", Number.isNaN(h) ? null : h);
    }
    return (u, g) => (f(), x("div", k4, [
      e.label ? (f(), x("label", {
        key: 0,
        for: s.value,
        class: X(B(ut))
      }, A(e.label), 11, _4)) : P("", !0),
      d("input", {
        id: s.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: X([
          B(et),
          e.invalid ? B(Dt) : "",
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
      }, null, 42, w4),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: i.value,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 11, C4)) : P("", !0)
    ]));
  }
}), S4 = { class: "font-sans" }, M4 = ["for"], D4 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], A4 = ["disabled"], T4 = ["id"], B4 = "#3b82f6", L4 = "#aabbcc", R4 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", I4 = /* @__PURE__ */ fe({
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
      return a(m) ?? B4;
    }
    const o = e, s = t, i = `kiut-input-color-${Ke()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n(o.modelValue)), u = ne(c.value), g = ne(!1);
    Te(c, (m) => {
      g.value || (u.value = m);
    });
    function h(m) {
      const v = m.target, p = a(v.value);
      p && s("update:modelValue", p);
    }
    function b() {
      g.value = !1;
      const m = a(u.value);
      m ? (u.value = m, s("update:modelValue", m)) : u.value = c.value;
    }
    return Te(u, (m) => {
      if (!g.value) return;
      const v = a(m);
      v && s("update:modelValue", v);
    }), (m, v) => (f(), x("div", S4, [
      e.label ? (f(), x("label", {
        key: 0,
        for: l.value,
        class: X(B(ut))
      }, A(e.label), 11, M4)) : P("", !0),
      d("div", {
        class: X([
          R4,
          e.invalid ? B(Dt) : "",
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
          onInput: h
        }, null, 40, D4),
        e.showHexInput ? Qe((f(), x("input", {
          key: 0,
          "onUpdate:modelValue": v[0] || (v[0] = (p) => u.value = p),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: L4,
          onFocus: v[1] || (v[1] = (p) => g.value = !0),
          onBlur: b
        }, null, 40, A4)), [
          [It, u.value]
        ]) : P("", !0)
      ], 2),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: r.value,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 11, T4)) : P("", !0)
    ]));
  }
}), Gl = {
  smileys: "Smileys",
  gestures: "Gestos",
  symbols: "Símbolos",
  travel: "Viajes",
  objects: "Objetos"
}, Zl = [
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
function P4(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function E4(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (l) => s || P4(l, n)
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
function a8(e) {
  const t = {
    ...Gl,
    ...e
  };
  return Zl.map((a) => ({
    id: a.id,
    label: t[a.id],
    emojis: a.emojis.map((n) => n.char)
  }));
}
function O4(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function F4(e, t) {
  return `${e}${t}`;
}
const V4 = ["disabled", "aria-expanded", "aria-label"], N4 = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, z4 = {
  key: 0,
  class: "truncate text-sm"
}, j4 = ["aria-label"], H4 = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, W4 = ["disabled", "placeholder", "aria-label"], K4 = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, U4 = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, Y4 = { class: "grid grid-cols-8 gap-0.5" }, q4 = ["disabled", "aria-label", "onClick"], X4 = { class: "text-[1.35rem] leading-none" }, G4 = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Z4 = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, Q4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-emoji-picker-${Ke()}`, s = `${o}-btn`, i = `${o}-panel`, l = ne(null), r = ne(null), c = ne(null), u = ne(null), g = ne(!1), h = ne(""), b = ne({}), m = C(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), v = C(() => ({
      ...Gl,
      ...a.categoryLabels
    })), p = C(() => new Set(O4(a.draft))), y = C(() => {
      if (a.categories?.length) {
        const T = h.value.trim().toLowerCase();
        return T ? a.categories.map((j) => ({
          ...j,
          emojis: j.emojis.filter((H) => H.includes(T) || j.label.toLowerCase().includes(T) ? !0 : j.id.toLowerCase().includes(T))
        })).filter((j) => j.emojis.length > 0) : a.categories;
      }
      return E4(
        Zl,
        v.value,
        h.value
      );
    });
    function k() {
      const T = r.value;
      if (!T) return;
      const j = T.getBoundingClientRect(), H = 320, Q = 8, re = 8;
      let ue = j.right - H;
      ue < re && (ue = j.left), ue + H > window.innerWidth - re && (ue = Math.max(re, window.innerWidth - H - re));
      const q = Math.max(160, j.top - Q - re);
      b.value = {
        bottom: `${window.innerHeight - j.top + Q}px`,
        left: `${ue}px`,
        width: `${H}px`,
        maxHeight: `${q}px`
      };
    }
    function _(T) {
      const j = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return p.value.has(T) ? `${j} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : j;
    }
    function w(T) {
      if (a.disabled) return;
      const j = F4(a.draft ?? "", T);
      n("update:draft", j), n("select", T);
    }
    function $() {
      h.value = "", n("open"), We(() => {
        k(), u.value?.focus();
      });
    }
    function D() {
      g.value && (g.value = !1, h.value = "", n("close"), r.value?.focus());
    }
    function M() {
      if (!a.disabled) {
        if (g.value) {
          D();
          return;
        }
        g.value = !0, $();
      }
    }
    function O(T) {
      T.stopPropagation(), M();
    }
    function N(T) {
      if (!g.value) return;
      const j = T.target, H = l.value, Q = c.value;
      H && !H.contains(j) && (!Q || !Q.contains(j)) && D();
    }
    function W(T) {
      a.disabled || ((T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), g.value || (g.value = !0, $())), T.key === "Escape" && g.value && (T.preventDefault(), D()));
    }
    function S(T) {
      T.key === "Escape" && (T.preventDefault(), D());
    }
    function L() {
      g.value && k();
    }
    return Je(() => {
      document.addEventListener("click", N), window.addEventListener("resize", L), window.addEventListener("scroll", L, !0);
    }), at(() => {
      document.removeEventListener("click", N), window.removeEventListener("resize", L), window.removeEventListener("scroll", L, !0);
    }), (T, j) => (f(), x("div", {
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
        class: X([
          B(et),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          g.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": g.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": m.value,
        onClick: O,
        onKeydown: W
      }, [
        d("span", N4, [
          ke(T.$slots, "icon", {}, () => [
            z(B(up), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (f(), x("span", z4, A(e.triggerLabel), 1)) : P("", !0),
        e.triggerLabel ? (f(), te(B(na), {
          key: 1,
          class: X(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", g.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : P("", !0)
      ], 42, V4),
      (f(), te(Wt, { to: "body" }, [
        Qe(d("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: _e(b.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: j[2] || (j[2] = Be(() => {
          }, ["stop"])),
          onKeydown: Be(S, ["stop"])
        }, [
          d("div", H4, [
            Qe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": j[0] || (j[0] = (H) => h.value = H),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: j[1] || (j[1] = Be(() => {
              }, ["stop"]))
            }, null, 8, W4), [
              [It, h.value]
            ])
          ]),
          d("div", K4, [
            y.value.length > 0 ? (f(!0), x(he, { key: 0 }, pe(y.value, (H) => (f(), x("section", {
              key: H.id
            }, [
              d("h3", U4, A(H.label), 1),
              d("div", Y4, [
                (f(!0), x(he, null, pe(H.emojis, (Q) => (f(), x("button", {
                  key: `${H.id}-${Q}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${Q} to input`,
                  class: X(_(Q)),
                  onClick: Be((re) => w(Q), ["stop"])
                }, [
                  d("span", X4, A(Q), 1)
                ], 10, q4))), 128))
              ])
            ]))), 128)) : (f(), x("p", G4, A(e.emptySearchText), 1))
          ]),
          e.hint ? (f(), x("p", Z4, A(e.hint), 1)) : P("", !0)
        ], 44, j4), [
          [Kt, g.value]
        ])
      ]))
    ], 512));
  }
}), J4 = /* @__PURE__ */ fe({
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
    return (i, l) => (f(), te(Tt, {
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
}), eS = { class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]" }, tS = { class: "relative" }, aS = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, nS = ["placeholder", "aria-label", "disabled"], oS = {
  key: 0,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, sS = ["aria-label"], iS = {
  key: 0,
  class: "px-3 py-6 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, lS = ["aria-selected", "onClick", "onMouseenter"], rS = { class: "min-w-0 flex-1 truncate" }, cS = /* @__PURE__ */ fe({
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
    const n = e, o = a, i = `${`kiut-language-picker-${Ke()}`}-listbox`, l = ne(null), r = ne(null), c = ne(""), u = ne(0), g = C(() => n.options.filter((w) => !w.disabled)), h = C(() => {
      const w = c.value.trim().toLowerCase();
      return w ? g.value.filter(($) => $.label.toLowerCase().includes(w)) : g.value;
    });
    function b(w) {
      return `${w.value}-${w.label}`;
    }
    function m(w) {
      return n.modelValue === w.value;
    }
    function v(w, $) {
      const D = m(w), M = u.value === $;
      return [
        "flex cursor-pointer items-center gap-2.5 border-b border-gray-200 px-3 py-2.5 text-sm transition-colors last:border-b-0 dark:border-white/5",
        D ? "bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-text-primary)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-slate-100" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !D && M ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function p() {
      u.value = Math.max(
        0,
        h.value.findIndex((w) => w.value === n.modelValue)
      );
    }
    function y(w) {
      w.disabled || o("update:modelValue", w.value);
    }
    function k(w) {
      const $ = h.value;
      if (w.key === "ArrowDown") {
        if (w.preventDefault(), $.length === 0) return;
        u.value = 0, r.value?.focus();
        return;
      }
      if (w.key === "ArrowUp") {
        if (w.preventDefault(), $.length === 0) return;
        u.value = $.length - 1, r.value?.focus();
        return;
      }
      if (w.key === "Enter") {
        w.preventDefault();
        const D = $[u.value];
        D && y(D);
      }
    }
    function _(w) {
      const $ = h.value;
      if ($.length !== 0) {
        if (w.key === "ArrowDown") {
          w.preventDefault(), u.value = Math.min(u.value + 1, $.length - 1);
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
          const D = $[u.value];
          D && y(D);
        }
      }
    }
    return Te(c, () => {
      u.value = 0;
    }), Te(
      () => n.modelValue,
      () => {
        p();
      },
      { immediate: !0 }
    ), t({
      focusSearch: () => l.value?.focus()
    }), (w, $) => (f(), x("div", {
      class: X(["overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] font-sans shadow-sm dark:border-[color:var(--kiut-border-light)]", e.disabled ? "pointer-events-none opacity-50" : ""])
    }, [
      d("div", eS, [
        d("div", tS, [
          d("span", aS, [
            z(B(No), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
          ]),
          Qe(d("input", {
            ref_key: "searchInputRef",
            ref: l,
            "onUpdate:modelValue": $[0] || ($[0] = (D) => c.value = D),
            type: "search",
            class: X([B(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
            placeholder: e.searchPlaceholder,
            "aria-label": e.searchPlaceholder,
            disabled: e.disabled,
            onKeydown: k
          }, null, 42, nS), [
            [It, c.value]
          ])
        ])
      ]),
      e.listSectionLabel ? (f(), x("p", oS, A(e.listSectionLabel), 1)) : P("", !0),
      d("ul", {
        id: i,
        ref_key: "listRef",
        ref: r,
        role: "listbox",
        tabindex: "0",
        "aria-label": e.listSectionLabel || e.searchPlaceholder,
        class: X([e.listMaxHeightClass, "overflow-auto pb-1 outline-none"]),
        onKeydown: _
      }, [
        h.value.length === 0 ? (f(), x("li", iS, A(e.noResultsText), 1)) : P("", !0),
        (f(!0), x(he, null, pe(h.value, (D, M) => (f(), x("li", {
          key: b(D),
          role: "option",
          "aria-selected": m(D),
          class: X(v(D, M)),
          onClick: (O) => y(D),
          onMouseenter: (O) => u.value = M
        }, [
          D.flagClass ? (f(), x("span", {
            key: 0,
            class: X([D.flagClass, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : P("", !0),
          d("span", rS, A(D.label), 1)
        ], 42, lS))), 128))
      ], 42, sS)
    ], 2));
  }
}), dS = { class: "flex flex-row gap-3 items-center" }, uS = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, hS = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], fS = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, gS = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, mS = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, pS = { class: "truncate" }, bS = { class: "absolute left-0 right-0 z-50 mt-[-3px] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]" }, vS = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, yS = { class: "relative" }, xS = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, kS = ["placeholder", "aria-label"], _S = ["aria-checked", "disabled"], wS = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, CS = ["aria-selected", "onClick", "onMouseenter"], $S = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, SS = { class: "min-w-0 flex-1" }, MS = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-multiselect-${Ke()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = ne(null), c = ne(null), u = ne(null), g = ne(null), h = ne(!1), b = ne(0), m = ne(""), v = C(() => a.options.filter((V) => !V.disabled)), p = C(() => {
      if (!a.searchable) return v.value;
      const V = m.value.trim().toLowerCase();
      return V ? v.value.filter(
        (le) => le.label.toLowerCase().includes(V)
      ) : v.value;
    }), y = C(() => new Set(a.modelValue ?? [])), k = C(
      () => v.value.filter((V) => y.value.has(V.value)).length
    ), _ = C(
      () => v.value.length > 0 && k.value === v.value.length
    ), w = C(
      () => k.value > 0 && !_.value
    ), $ = C(
      () => w.value ? "mixed" : _.value
    ), D = C(
      () => a.options.filter((V) => y.value.has(V.value))
    ), M = C(() => {
      const V = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", le = D.value.length;
      return le === 0 ? V : `${V}, ${le} seleccionada${le === 1 ? "" : "s"}`;
    });
    function O(V) {
      return `${String(V.value)}-${V.label}`;
    }
    function N(V) {
      return y.value.has(V.value);
    }
    function W(V, le) {
      const ce = N(V), xe = b.value === le;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ce ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && xe ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function S(V) {
      const le = [...a.modelValue ?? []], ce = le.indexOf(V.value);
      ce >= 0 ? le.splice(ce, 1) : le.push(V.value), n("update:modelValue", le);
    }
    function L() {
      const V = new Set(v.value.map((ce) => ce.value)), le = (a.modelValue ?? []).filter(
        (ce) => !V.has(ce)
      );
      n(
        "update:modelValue",
        _.value ? le : [...le, ...v.value.map((ce) => ce.value)]
      );
    }
    function T() {
      const V = p.value;
      if (V.length === 0) {
        b.value = 0;
        return;
      }
      const le = y.value, ce = V.findIndex((xe) => le.has(xe.value));
      b.value = ce >= 0 ? ce : 0;
    }
    function j() {
      if (a.searchable) {
        u.value?.focus();
        return;
      }
      if (a.showSelectAll) {
        g.value?.focus();
        return;
      }
      c.value?.focus();
    }
    function H() {
      m.value = "", T(), We(() => j());
    }
    function Q() {
      h.value = !1, m.value = "";
    }
    function re() {
      if (!a.disabled) {
        if (h.value) {
          Q();
          return;
        }
        h.value = !0, H();
      }
    }
    function ue(V) {
      V.stopPropagation(), !a.disabled && re();
    }
    function q(V) {
      if (!h.value) return;
      const le = r.value;
      le && !le.contains(V.target) && Q();
    }
    function oe(V) {
      a.disabled || (V.key === "ArrowDown" || V.key === "Enter" || V.key === " ") && (V.preventDefault(), h.value || (h.value = !0, H()));
    }
    function R(V) {
      const le = p.value;
      if (V.key === "Escape") {
        V.preventDefault(), Q();
        return;
      }
      if (V.key === "ArrowDown") {
        if (V.preventDefault(), a.showSelectAll) {
          g.value?.focus();
          return;
        }
        if (le.length === 0) return;
        b.value = 0, c.value?.focus();
        return;
      }
      if (V.key === "ArrowUp") {
        if (V.preventDefault(), le.length === 0) return;
        b.value = le.length - 1, c.value?.focus();
        return;
      }
      if (V.key === "Enter") {
        V.preventDefault();
        const ce = le[b.value];
        ce && S(ce);
      }
    }
    function U(V) {
      if (V.key === "Escape") {
        V.preventDefault(), Q();
        return;
      }
      if (V.key === "ArrowDown" && p.value.length > 0) {
        V.preventDefault(), b.value = 0, c.value?.focus();
        return;
      }
      V.key === "ArrowUp" && a.searchable && (V.preventDefault(), u.value?.focus());
    }
    function Y(V) {
      const le = p.value;
      if (V.key === "Escape") {
        V.preventDefault(), Q();
        return;
      }
      if (le.length !== 0) {
        if (V.key === "ArrowDown") {
          V.preventDefault(), b.value = Math.min(b.value + 1, le.length - 1);
          return;
        }
        if (V.key === "ArrowUp") {
          if (V.preventDefault(), b.value === 0 && a.showSelectAll) {
            g.value?.focus();
            return;
          }
          if (b.value === 0 && a.searchable) {
            u.value?.focus();
            return;
          }
          b.value = Math.max(b.value - 1, 0);
          return;
        }
        if (V.key === "Enter" || V.key === " ") {
          V.preventDefault();
          const ce = le[b.value];
          ce && S(ce);
        }
      }
    }
    return Te(m, () => {
      b.value = 0;
    }), Je(() => {
      document.addEventListener("click", q);
    }), at(() => {
      document.removeEventListener("click", q);
    }), (V, le) => (f(), x("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      d("div", dS, [
        V.$slots.icon ? (f(), x("span", uS, [
          ke(V.$slots, "icon")
        ])) : P("", !0),
        e.label ? (f(), x("label", {
          key: 1,
          id: s,
          class: X(B(ut))
        }, A(e.label), 3)) : P("", !0)
      ]),
      d("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: X([
          B(et),
          "flex items-start justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : M.value,
        onClick: ue,
        onKeydown: oe
      }, [
        d("div", fS, [
          D.value.length === 0 ? (f(), x("span", gS, A(e.placeholder), 1)) : (f(), x("div", mS, [
            (f(!0), x(he, null, pe(D.value, (ce) => (f(), x("span", {
              key: O(ce),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              d("span", pS, A(ce.label), 1)
            ]))), 128))
          ]))
        ]),
        z(B(na), {
          class: X(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, hS),
      Qe(d("div", bS, [
        e.searchable ? (f(), x("div", vS, [
          d("div", yS, [
            d("span", xS, [
              z(B(No), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
            ]),
            Qe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": le[0] || (le[0] = (ce) => m.value = ce),
              type: "search",
              class: X([B(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: le[1] || (le[1] = Be(() => {
              }, ["stop"])),
              onKeydown: Be(R, ["stop"])
            }, null, 42, kS), [
              [It, m.value]
            ])
          ])
        ])) : P("", !0),
        e.showSelectAll ? (f(), x("button", {
          key: 1,
          ref_key: "selectAllRef",
          ref: g,
          type: "button",
          role: "checkbox",
          "aria-checked": $.value,
          disabled: v.value.length === 0,
          class: "flex w-full items-center gap-2 border-b border-gray-200 px-3 py-2 text-left text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--kiut-primary)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:text-slate-100 dark:hover:bg-white/5 dark:focus-visible:bg-white/5",
          onClick: Be(L, ["stop"]),
          onKeydown: U
        }, [
          d("span", {
            class: X([
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-400 transition-colors dark:border-slate-500",
              _.value || w.value ? "border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)] text-white dark:border-[color:var(--kiut-primary)]" : ""
            ]),
            "aria-hidden": "true"
          }, [
            w.value ? (f(), te(B(R0), {
              key: 0,
              class: "h-3 w-3"
            })) : _.value ? (f(), te(B(Rn), {
              key: 1,
              class: "h-3 w-3"
            })) : P("", !0)
          ], 2),
          d("span", null, A(e.selectAllLabel), 1)
        ], 40, _S)) : P("", !0),
        d("ul", {
          id: l,
          ref_key: "listRef",
          ref: c,
          role: "listbox",
          tabindex: "-1",
          "aria-multiselectable": "true",
          class: "max-h-60 overflow-auto py-1",
          onKeydown: Be(Y, ["stop"])
        }, [
          p.value.length === 0 ? (f(), x("li", wS, A(e.noResultsText), 1)) : P("", !0),
          (f(!0), x(he, null, pe(p.value, (ce, xe) => (f(), x("li", {
            key: O(ce),
            role: "option",
            "aria-selected": N(ce),
            class: X(W(ce, xe)),
            onClick: Be((K) => S(ce), ["stop"]),
            onMouseenter: (K) => b.value = xe
          }, [
            d("span", $S, [
              N(ce) ? (f(), te(B(Rn), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : P("", !0)
            ]),
            d("span", SS, A(ce.label), 1)
          ], 42, CS))), 128))
        ], 544)
      ], 512), [
        [Kt, h.value]
      ])
    ], 512));
  }
}), DS = { class: "font-sans" }, AS = ["for"], TS = { class: "flex gap-2" }, BS = { class: "w-[7.5rem] shrink-0" }, LS = { class: "min-w-0 flex-1" }, RS = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], IS = ["id"], PS = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-phone-${Ke()}`, s = C(() => a.id ?? `${o}-num`), i = C(() => `${s.value}-err`), l = C({
      get: () => a.modelValue.prefix,
      set: (c) => n("update:modelValue", { ...a.modelValue, prefix: c })
    }), r = C({
      get: () => a.modelValue.number,
      set: (c) => n("update:modelValue", { ...a.modelValue, number: c })
    });
    return (c, u) => (f(), x("div", DS, [
      e.label ? (f(), x("label", {
        key: 0,
        for: s.value,
        class: X(B(ut))
      }, A(e.label), 11, AS)) : P("", !0),
      d("div", TS, [
        d("div", BS, [
          z(Tt, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (g) => l.value = g),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1,
            searchable: "",
            "search-placeholder": "Buscar país…"
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        d("div", LS, [
          Qe(d("input", {
            id: s.value,
            "onUpdate:modelValue": u[1] || (u[1] = (g) => r.value = g),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: X([B(et), e.invalid ? B(Dt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, RS), [
            [It, r.value]
          ])
        ])
      ]),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: i.value,
        class: X(B(At)),
        role: "alert"
      }, A(e.errorText), 11, IS)) : P("", !0)
    ]));
  }
}), ES = ["role", "aria-label"], OS = { class: "flex flex-wrap gap-2" }, FS = ["aria-checked", "role", "onClick"], VS = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, NS = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, zS = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, jS = /* @__PURE__ */ fe({
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
    return (r, c) => (f(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      d("div", OS, [
        (f(!0), x(he, null, pe(e.items, (u) => (f(), x("button", {
          key: u.value,
          type: "button",
          class: X(i(u)),
          "aria-checked": s(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (g) => l(u)
        }, [
          d("span", VS, [
            s(u) ? (f(), x("span", NS)) : P("", !0)
          ]),
          u.dotColor ? (f(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: _e({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : P("", !0),
          d("span", zS, A(u.label), 1)
        ], 10, FS))), 128))
      ])
    ], 8, ES));
  }
}), HS = ["aria-label"], WS = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], KS = { class: "truncate px-3 py-2 text-sm font-medium" }, US = /* @__PURE__ */ fe({
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
    function g(v, p, y) {
      u(v), We(() => i.value[p]?.focus());
    }
    const h = C(
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
        const y = h.value[0];
        if (y !== void 0) {
          const k = a.items[y];
          k && u(k), We(() => i.value[y]?.focus());
        }
      } else if (v.key === "End") {
        v.preventDefault();
        const y = h.value[h.value.length - 1];
        if (y !== void 0) {
          const k = a.items[y];
          k && u(k), We(() => i.value[y]?.focus());
        }
      }
    }
    return (v, p) => (f(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (f(!0), x(he, null, pe(e.items, (y, k) => (f(), x("button", {
        id: s(y.value),
        key: y.value,
        ref_for: !0,
        ref: (_) => l(_, k),
        type: "button",
        role: "tab",
        "aria-selected": r(y),
        "aria-disabled": y.disabled === !0,
        tabindex: r(y) ? 0 : -1,
        class: X(c(y)),
        onClick: (_) => g(y, k),
        onKeydown: (_) => m(_, k)
      }, [
        d("span", KS, A(y.label), 1)
      ], 42, WS))), 128))
    ], 8, HS));
  }
}), YS = ["aria-expanded", "aria-labelledby", "aria-label"], qS = ["onKeydown"], XS = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, GS = { class: "mb-4 flex items-center justify-between gap-2" }, ZS = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, QS = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, JS = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, e3 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, t3 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, a3 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, n3 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, o3 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, s3 = ["disabled", "onClick"], i3 = "rounded-lg text-[#61616b]", l3 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", r3 = "opacity-30", c3 = "bg-[#6b35e9] font-medium text-white", d3 = "bg-[#895af6] font-semibold text-white", u3 = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-drp-${Ke()}`}-lbl`, i = ne(null), l = ne(null), r = ne(!1), c = ne(null), u = ne(_t(/* @__PURE__ */ new Date())), g = C(() => !!(a.modelValue.start && a.modelValue.end)), h = C(() => {
      const S = _t(u.value);
      return [S, Da(S, 1)];
    }), b = C(() => a.ariaLabel ?? a.placeholder), m = C(() => {
      const S = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${S}` : `left-0 right-auto ${S}`;
    }), v = C(
      () => `${jt(h.value[0])} – ${jt(h.value[1])}`
    ), p = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], y = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const S = ot(a.modelValue.start), L = ot(a.modelValue.end);
      return `${In(S)} – ${In(L)}`;
    });
    function k(S, L) {
      return S.getMonth() === L.getMonth() && S.getFullYear() === L.getFullYear();
    }
    function _(S) {
      const L = Ve(S);
      if (a.minDate) {
        const T = Ve(ot(a.minDate));
        if (Ht(L, T)) return !0;
      }
      if (a.maxDate) {
        const T = Ve(ot(a.maxDate));
        if (Ht(T, L)) return !0;
      }
      return !1;
    }
    function w(S, L, T) {
      const j = bt(S, L), H = bt(S, T);
      if (j && H) return "rounded-lg";
      const Q = j || S.getDay() === 0, re = H || S.getDay() === 6;
      return Q && re ? "rounded-lg" : Q ? "rounded-l-lg" : re ? "rounded-r-lg" : "rounded-none";
    }
    function $(S, L) {
      const T = k(L, S), j = _(L), H = a.modelValue.start ? Ve(ot(a.modelValue.start)) : null, Q = a.modelValue.end ? Ve(ot(a.modelValue.end)) : null, re = Ve(L);
      if (j)
        return i3;
      let ue = l3;
      if (H && Q && Yl(re, H) && ql(re, Q)) {
        const oe = bt(re, H), R = bt(re, Q);
        ue = `${w(re, H, Q)} ${oe || R ? d3 : c3}`;
      }
      return T || (ue = `${ue} ${r3}`), ue;
    }
    function D(S) {
      if (_(S)) return;
      const L = Ve(S);
      if (!c.value) {
        c.value = new Date(L), n("update:modelValue", { start: st(L), end: st(L) });
        return;
      }
      let j = Ve(c.value), H = new Date(L);
      Ht(H, j) && ([j, H] = [H, j]), n("update:modelValue", { start: st(j), end: st(H) }), c.value = null, r.value = !1;
    }
    function M(S) {
      u.value = Da(u.value, S);
    }
    function O() {
      r.value = !1;
    }
    function N(S) {
      if (S?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, a.modelValue.start)
          try {
            u.value = _t(ot(a.modelValue.start));
          } catch {
          }
        We(() => l.value?.focus());
      }
    }
    function W(S) {
      if (!r.value) return;
      const L = i.value;
      L && !L.contains(S.target) && (r.value = !1);
    }
    return Te(r, (S) => {
      S && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", W);
    }), at(() => {
      document.removeEventListener("click", W);
    }), (S, L) => (f(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (f(), x("label", {
        key: 0,
        id: s,
        class: X(B(ut))
      }, A(e.label), 3)) : P("", !0),
      d("button", {
        type: "button",
        class: X([
          B(et),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onFocus: N,
        onClick: N
      }, [
        z(B(Oo), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: X([
            "min-w-0 flex-1 truncate",
            g.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(y.value), 3)
      ], 42, YS),
      Qe(d("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: X([
          m.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $a(Be(O, ["stop"]), ["escape"])
      }, [
        d("div", XS, [
          d("div", GS, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: L[0] || (L[0] = (T) => M(-1))
            }, [
              z(B(Fo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            d("div", ZS, [
              d("span", QS, A(v.value), 1),
              d("div", JS, [
                d("span", e3, A(B(jt)(h.value[0])), 1),
                d("span", t3, A(B(jt)(h.value[1])), 1)
              ])
            ]),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: L[1] || (L[1] = (T) => M(1))
            }, [
              z(B(Vo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          d("div", a3, [
            (f(!0), x(he, null, pe(h.value, (T) => (f(), x("div", {
              key: `${T.getFullYear()}-${T.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              d("div", n3, [
                (f(), x(he, null, pe(p, (j) => d("span", { key: j }, A(j), 1)), 64))
              ]),
              d("div", o3, [
                (f(!0), x(he, null, pe(B(Xl)(T), (j) => (f(), x("button", {
                  key: B(st)(j),
                  type: "button",
                  disabled: _(j),
                  class: X(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(T, j)]),
                  onClick: (H) => D(j)
                }, A(j.getDate()), 11, s3))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, qS), [
        [Kt, r.value]
      ])
    ], 512));
  }
}), h3 = ["aria-expanded", "aria-labelledby", "aria-label"], f3 = ["aria-label", "onKeydown"], g3 = { class: "flex flex-col sm:flex-row" }, m3 = ["aria-label"], p3 = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, b3 = { class: "flex flex-col gap-0.5" }, v3 = ["onClick"], y3 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, x3 = { class: "mb-4 flex items-center justify-between gap-2" }, k3 = ["aria-label"], _3 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, w3 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, C3 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, $3 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, S3 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, M3 = ["aria-label"], D3 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, A3 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, T3 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, B3 = ["disabled", "onClick"], L3 = "rounded-lg text-[#61616b]", R3 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", I3 = "opacity-30", P3 = "bg-[#6b35e9] font-medium text-white", E3 = "bg-[#895af6] font-semibold text-white", O3 = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-dpp-${Ke()}`}-lbl`, i = ne(null), l = ne(null), r = ne(!1), c = ne(null), u = ne(_t(/* @__PURE__ */ new Date())), g = C(() => !!(a.modelValue.start && a.modelValue.end)), h = C(() => {
      const oe = _t(u.value);
      return [oe, Da(oe, 1)];
    }), b = C(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), m = C(() => a.ariaLabel ?? b.value), v = C(() => Wl(a.locale)), p = C(() => M$(a.locale)), y = C(() => $$(a.locale)), k = C(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => a.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), D = C(() => {
      const oe = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${oe}` : `left-0 right-auto ${oe}`;
    }), M = C(
      () => `${jt(h.value[0], a.locale)} – ${jt(h.value[1], a.locale)}`
    ), O = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return b.value;
      const oe = ot(a.modelValue.start), R = ot(a.modelValue.end);
      return `${In(oe, a.locale)} – ${In(R, a.locale)}`;
    });
    function N(oe, R) {
      return oe.getMonth() === R.getMonth() && oe.getFullYear() === R.getFullYear();
    }
    function W(oe) {
      const R = Ve(oe);
      if (a.minDate) {
        const U = Ve(ot(a.minDate));
        if (Ht(R, U)) return !0;
      }
      if (a.maxDate) {
        const U = Ve(ot(a.maxDate));
        if (Ht(U, R)) return !0;
      }
      return !1;
    }
    function S(oe, R, U) {
      const Y = bt(oe, R), V = bt(oe, U);
      if (Y && V) return "rounded-lg";
      const le = Y || oe.getDay() === 0, ce = V || oe.getDay() === 6;
      return le && ce ? "rounded-lg" : le ? "rounded-l-lg" : ce ? "rounded-r-lg" : "rounded-none";
    }
    function L(oe) {
      const R = T$(
        a.modelValue,
        oe,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), U = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return R ? `${U} font-medium` : U;
    }
    function T(oe, R) {
      const U = N(R, oe), Y = W(R), V = a.modelValue.start ? Ve(ot(a.modelValue.start)) : null, le = a.modelValue.end ? Ve(ot(a.modelValue.end)) : null, ce = Ve(R);
      if (Y)
        return L3;
      let xe = R3;
      if (V && le && Yl(ce, V) && ql(ce, le)) {
        const ie = bt(ce, V), de = bt(ce, le);
        xe = `${S(ce, V, le)} ${ie || de ? E3 : P3}`;
      }
      return U || (xe = `${xe} ${I3}`), xe;
    }
    function j(oe) {
      const R = Ul(Kl(oe), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: st(R.start),
        end: st(R.end)
      }), u.value = _t(R.start), c.value = null, r.value = !1;
    }
    function H(oe) {
      if (W(oe)) return;
      const R = Ve(oe);
      if (!c.value) {
        c.value = new Date(R), n("update:modelValue", { start: st(R), end: st(R) });
        return;
      }
      let Y = Ve(c.value), V = new Date(R);
      Ht(V, Y) && ([Y, V] = [V, Y]), n("update:modelValue", { start: st(Y), end: st(V) }), c.value = null, r.value = !1;
    }
    function Q(oe) {
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
    return Te(r, (oe) => {
      oe && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", q);
    }), at(() => {
      document.removeEventListener("click", q);
    }), (oe, R) => (f(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (f(), x("label", {
        key: 0,
        id: s,
        class: X(B(ut))
      }, A(e.label), 3)) : P("", !0),
      d("button", {
        type: "button",
        class: X([
          B(et),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onClick: ue
      }, [
        z(B(Oo), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: X([
            "min-w-0 flex-1 truncate",
            g.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(O.value), 3)
      ], 10, h3),
      Qe(d("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: X([
          D.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $a(Be(re, ["stop"]), ["escape"])
      }, [
        d("div", g3, [
          d("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": k.value
          }, [
            d("p", p3, A(p.value), 1),
            d("ul", b3, [
              (f(!0), x(he, null, pe(v.value, (U) => (f(), x("li", {
                key: U.id
              }, [
                d("button", {
                  type: "button",
                  class: X(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", L(U.id)]),
                  onClick: (Y) => j(U.id)
                }, A(U.label), 11, v3)
              ]))), 128))
            ])
          ], 8, m3),
          d("div", y3, [
            d("div", x3, [
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: R[0] || (R[0] = (U) => Q(-1))
              }, [
                z(B(Fo), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, k3),
              d("div", _3, [
                d("span", w3, A(M.value), 1),
                d("div", C3, [
                  d("span", $3, A(B(jt)(h.value[0], e.locale)), 1),
                  d("span", S3, A(B(jt)(h.value[1], e.locale)), 1)
                ])
              ]),
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: R[1] || (R[1] = (U) => Q(1))
              }, [
                z(B(Vo), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, M3)
            ]),
            d("div", D3, [
              (f(!0), x(he, null, pe(h.value, (U) => (f(), x("div", {
                key: `${U.getFullYear()}-${U.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                d("div", A3, [
                  (f(!0), x(he, null, pe(y.value, (Y) => (f(), x("span", { key: Y }, A(Y), 1))), 128))
                ]),
                d("div", T3, [
                  (f(!0), x(he, null, pe(B(Xl)(U), (Y) => (f(), x("button", {
                    key: B(st)(Y),
                    type: "button",
                    disabled: W(Y),
                    class: X(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", T(U, Y)]),
                    onClick: (V) => H(Y)
                  }, A(Y.getDate()), 11, B3))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, f3), [
        [Kt, r.value]
      ])
    ], 512));
  }
}), F3 = { class: "kiut-translation-count-badge__content" }, V3 = { class: "kiut-translation-count-badge__title" }, N3 = { class: "kiut-translation-count-badge__pills" }, z3 = {
  key: 0,
  class: "kiut-translation-count-badge__pill-note"
}, _n = 8, ka = 12, j3 = /* @__PURE__ */ fe({
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
    }), s = ne(null), i = ne(null), l = C(() => {
      const b = "whitespace-nowrap rounded-md px-2 py-0.5 text-xs cursor-default font-['Inter',system-ui,sans-serif]";
      return t.variant === "configured" ? `${b} border border-purple-300 text-purple-700 dark:border-purple-700/50 dark:text-purple-400` : t.variant === "autoconfigured" ? `${b} border border-dashed border-green-400 text-green-600 dark:border-green-600 dark:text-green-400` : `${b} border border-gray-500/40 text-gray-500 dark:border-gray-600 dark:text-gray-400`;
    }), r = C(
      () => `kiut-translation-count-badge__pill kiut-translation-count-badge__pill--${t.variant}`
    );
    function c() {
      a.value = !1;
    }
    function u() {
      const b = s.value, m = i.value;
      if (!b || !m) return;
      const v = b.getBoundingClientRect(), p = m.getBoundingClientRect(), y = v.top - ka, k = window.innerHeight - v.bottom - ka, _ = y >= p.height + _n, w = k >= p.height + _n;
      let $ = "top";
      _ ? $ = "top" : w ? $ = "bottom" : $ = k >= y ? "bottom" : "top", n.value = $;
      let D = $ === "top" ? v.top - p.height - _n : v.bottom + _n;
      D = Math.max(
        ka,
        Math.min(D, window.innerHeight - p.height - ka)
      );
      let M = v.left + v.width / 2 - p.width / 2;
      M = Math.max(
        ka,
        Math.min(M, window.innerWidth - p.width - ka)
      ), o.value = {
        top: `${D}px`,
        left: `${M}px`
      };
    }
    async function g() {
      if (!t.items.length) return;
      a.value = !0, await We();
      const b = i.value;
      b && (b.style.visibility = "hidden", u(), b.style.visibility = "visible");
    }
    function h() {
      a.value && c();
    }
    return window.addEventListener("scroll", h, !0), window.addEventListener("resize", h), at(() => {
      window.removeEventListener("scroll", h, !0), window.removeEventListener("resize", h);
    }), (b, m) => (f(), x(he, null, [
      d("span", {
        ref_key: "triggerRef",
        ref: s,
        class: X([l.value, e.pulse && "animate-pulse"]),
        onMouseenter: g,
        onMouseleave: c,
        onFocus: g,
        onBlur: c
      }, A(e.label), 35),
      (f(), te(Wt, { to: "body" }, [
        a.value && e.items.length ? (f(), x("div", {
          key: 0,
          ref_key: "tooltipRef",
          ref: i,
          role: "tooltip",
          class: X(["kiut-translation-count-badge__tooltip", `kiut-translation-count-badge__tooltip--${n.value}`]),
          style: _e({
            position: "fixed",
            top: o.value.top,
            left: o.value.left,
            zIndex: 1100
          }),
          onMouseenter: g,
          onMouseleave: c
        }, [
          d("div", F3, [
            d("span", V3, A(e.tooltipTitle), 1),
            d("div", N3, [
              (f(!0), x(he, null, pe(e.items, (v) => (f(), x("span", {
                key: v.id,
                class: X(r.value)
              }, [
                De(A(v.label) + " ", 1),
                v.note ? (f(), x("span", z3, " (" + A(v.note) + ") ", 1)) : P("", !0)
              ], 2))), 128))
            ])
          ])
        ], 38)) : P("", !0)
      ]))
    ], 64));
  }
}), H3 = ["disabled", "aria-expanded", "aria-label"], W3 = { class: "min-w-0 flex-1 truncate" }, K3 = ["aria-selected", "onClick", "onMouseenter"], U3 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Y3 = { class: "min-w-0 flex-1" }, q3 = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-tag-select-${Ke()}`}-listbox`, i = ne(null), l = ne(null), r = ne(null), c = ne(null), u = ne(!1), g = ne(0), h = ne({}), b = C(() => a.options.filter((Q) => !Q.disabled)), m = C(
      () => a.options.find((Q) => Q.value === a.modelValue) ?? null
    ), v = C(() => m.value?.color ?? "neutral"), p = C(
      () => Ml(v.value, a.outlined)
    ), y = C(() => m.value ? m.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : b.value[0]?.label ?? "Seleccionar…"), k = C(
      () => a.ariaLabel ?? `Estado: ${y.value}`
    );
    function _() {
      const Q = l.value;
      if (!Q) return;
      const re = Q.getBoundingClientRect();
      h.value = {
        top: `${re.bottom + 4}px`,
        left: `${re.left}px`,
        minWidth: `${re.width}px`
      };
    }
    function w(Q) {
      return `${String(Q.value)}-${Q.label}`;
    }
    function $(Q) {
      return a.modelValue === Q.value;
    }
    function D(Q, re) {
      const ue = $(Q), q = g.value === re;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ue ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ue && q ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M() {
      g.value = Math.max(
        0,
        b.value.findIndex((Q) => Q.value === a.modelValue)
      );
    }
    function O() {
      _(), M(), We(() => c.value?.focus());
    }
    function N() {
      u.value = !1;
    }
    function W(Q) {
      n("update:modelValue", Q.value), N();
    }
    function S() {
      if (!a.disabled) {
        if (u.value) {
          N();
          return;
        }
        u.value = !0, O();
      }
    }
    function L(Q) {
      Q.stopPropagation(), !a.disabled && S();
    }
    function T(Q) {
      if (!u.value) return;
      const re = Q.target, ue = i.value, q = r.value;
      ue && !ue.contains(re) && (!q || !q.contains(re)) && N();
    }
    function j(Q) {
      a.disabled || (Q.key === "ArrowDown" || Q.key === "Enter" || Q.key === " ") && (Q.preventDefault(), u.value || (u.value = !0, O()));
    }
    function H(Q) {
      const re = b.value;
      if (Q.key === "Escape") {
        Q.preventDefault(), N(), l.value?.focus();
        return;
      }
      if (re.length !== 0) {
        if (Q.key === "ArrowDown") {
          Q.preventDefault(), g.value = Math.min(g.value + 1, re.length - 1);
          return;
        }
        if (Q.key === "ArrowUp") {
          Q.preventDefault(), g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (Q.key === "Enter") {
          Q.preventDefault();
          const ue = re[g.value];
          ue && W(ue);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", T);
    }), at(() => {
      document.removeEventListener("click", T);
    }), (Q, re) => (f(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      d("button", {
        ref_key: "buttonRef",
        ref: l,
        type: "button",
        disabled: e.disabled,
        class: X([
          B(Sl),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          p.value,
          u.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": k.value,
        onClick: L,
        onKeydown: j
      }, [
        d("span", W3, A(y.value), 1),
        z(B(na), {
          class: X(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, H3),
      (f(), te(Wt, { to: "body" }, [
        Qe(d("div", {
          ref_key: "panelRef",
          ref: r,
          style: _e(h.value),
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
            (f(!0), x(he, null, pe(b.value, (ue, q) => (f(), x("li", {
              key: w(ue),
              role: "option",
              "aria-selected": $(ue),
              class: X(D(ue, q)),
              onClick: Be((oe) => W(ue), ["stop"]),
              onMouseenter: (oe) => g.value = q
            }, [
              d("span", U3, [
                $(ue) ? (f(), te(B(Rn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : P("", !0)
              ]),
              d("span", Y3, A(ue.label), 1)
            ], 42, K3))), 128))
          ], 544)
        ], 4), [
          [Kt, u.value]
        ])
      ]))
    ], 512));
  }
}), X3 = ["aria-label"], G3 = { class: "flex flex-col gap-1" }, Z3 = { class: "flex flex-row gap-3 items-center" }, Q3 = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, J3 = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, eM = /* @__PURE__ */ fe({
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
      warning: H5,
      info: W5,
      success: j5,
      feature: U5,
      danger: Y5
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
    return (l, r) => (f(), x("div", {
      role: "region",
      "aria-label": e.title,
      class: X([
        s.value.container,
        B(t).class,
        "p-4 flex flex-row gap-2 justify-start items-start border rounded-xl"
      ])
    }, [
      d("div", {
        class: X([
          s.value.container_icon,
          "p-2 rounded-4xl flex justify-center items-center"
        ])
      }, [
        d("span", {
          class: X([
            s.value.icon,
            "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"
          ]),
          "aria-hidden": "true"
        }, [
          ke(l.$slots, "icon", {}, () => [
            (f(), te(rt(i.value)))
          ])
        ], 2)
      ], 2),
      d("div", G3, [
        d("h1", {
          class: X([s.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        d("span", {
          class: X([s.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        d("div", Z3, [
          a.date_start ? (f(), x("div", Q3, [
            d("span", {
              class: X([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(l.$slots, "icon_date", {}, () => [
                z(B(_i))
              ])
            ], 2),
            a.subtitle_date_start ? (f(), x("span", {
              key: 0,
              class: X([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : P("", !0),
            d("span", {
              class: X([s.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : P("", !0),
          a.date_final ? (f(), x("div", J3, [
            d("span", {
              class: X([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(l.$slots, "icon_date", {}, () => [
                z(B(_i))
              ])
            ], 2),
            a.subtitle_date_final ? (f(), x("span", {
              key: 0,
              class: X([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : P("", !0),
            d("span", {
              class: X([s.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : P("", !0)
        ])
      ])
    ], 10, X3));
  }
}), tM = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, aM = ["id"], nM = { class: "min-w-0 flex-1 space-y-1" }, oM = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, sM = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, iM = {
  key: 0,
  class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2"
}, lM = /* @__PURE__ */ fe({
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
    const a = e, n = C(() => ({ maxWidth: `${a.width}px` })), o = t, i = `${`kiut-modal-${Ke()}`}-title`, l = ne(null);
    function r() {
      a.loading || (o("cancel"), o("update:modelValue", !1));
    }
    function c() {
      o("confirm");
    }
    function u(g) {
      if (a.modelValue && g.key === "Escape") {
        if (a.loading) return;
        g.preventDefault(), r();
      }
    }
    return Te(
      () => a.modelValue,
      (g) => {
        g && requestAnimationFrame(() => {
          l.value?.focus({ preventScroll: !0 });
        });
      }
    ), Je(() => {
      document.addEventListener("keydown", u);
    }), at(() => {
      document.removeEventListener("keydown", u);
    }), (g, h) => (f(), te(Wt, { to: "body" }, [
      z(ct, { name: "kiut-modal" }, {
        default: E(() => [
          e.modelValue ? (f(), x("div", tM, [
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
              style: _e(n.value),
              onClick: h[0] || (h[0] = Be(() => {
              }, ["stop"]))
            }, [
              d("header", {
                class: X(["flex shrink-0 justify-between gap-4 bg-slate-50/50 px-6 py-5 dark:bg-white/[0.02]", [
                  e.subtitle ? "items-start" : "items-center",
                  e.headerBorder ? "border-b border-slate-100 dark:border-[color:var(--kiut-border-light)]" : ""
                ]])
              }, [
                d("div", nM, [
                  d("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (f(), x("p", oM, A(e.subtitle), 1)) : P("", !0)
                ]),
                z(Mt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: r
                }, {
                  icon: E(() => [
                    z(B(fo), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              d("div", sM, [
                ke(g.$slots, "default", {}, void 0, !0)
              ]),
              e.showFooter ? (f(), x("footer", iM, [
                z(Mt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: r
                }, {
                  default: E(() => [
                    De(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                z(Mt, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: E(() => [
                    De(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])) : P("", !0)
            ], 12, aM)
          ])) : P("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), rM = /* @__PURE__ */ be(lM, [["__scopeId", "data-v-1ab330ef"]]), cM = { class: "text-left font-['Inter',system-ui,sans-serif]" }, dM = {
  key: 0,
  class: ""
}, uM = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, hM = { class: "flex min-w-0 flex-1 items-center" }, fM = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, gM = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, mM = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, pM = /* @__PURE__ */ fe({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = mo(), a = C(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (f(), x("section", cM, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (f(), x("header", dM, [
        n.$slots.description ? (f(), x("div", uM, [
          ke(n.$slots, "description")
        ])) : P("", !0),
        n.$slots.tabs ? (f(), x("div", {
          key: 1,
          class: X(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          d("div", hM, [
            ke(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (f(), x("div", fM, [
            ke(n.$slots, "actions")
          ])) : P("", !0)
        ], 2)) : P("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (f(), x("div", {
          key: 2,
          class: X([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (f(), x("div", gM, [
            ke(n.$slots, "filters")
          ])) : P("", !0),
          n.$slots.actions ? (f(), x("div", mM, [
            ke(n.$slots, "actions")
          ])) : P("", !0)
        ], 2)) : P("", !0)
      ])) : P("", !0),
      n.$slots.content || n.$slots.default ? (f(), x("div", {
        key: 1,
        class: X({
          "mt-6": n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions
        })
      }, [
        ke(n.$slots, "content", {}, () => [
          ke(n.$slots, "default")
        ])
      ], 2)) : P("", !0)
    ]));
  }
}), bM = { class: "flex flex-1 min-h-0" }, vM = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, yM = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, xM = ["aria-current", "data-has-active", "title", "onClick"], kM = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, _M = { class: "px-4 py-4 shrink-0" }, wM = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, CM = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, $M = ["data-nav-id", "aria-current", "onClick"], SM = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, MM = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, DM = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, AM = ["data-nav-id", "aria-current", "onClick"], TM = { class: "truncate text-[15px]" }, BM = ["aria-current", "data-has-active", "onClick"], LM = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, RM = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, IM = /* @__PURE__ */ fe({
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
    const u = C(() => {
      const y = n.sections.find((k) => k.id === n.selectedSectionId);
      return y?.items?.length ? y : null;
    });
    function g(y) {
      return n.activePath ? n.activePath === y.path || n.activePath.startsWith(y.path + "/") : !1;
    }
    function h(y) {
      return y.items?.length ? y.items.some(g) : !n.activePath || !y.path ? !1 : n.activePath === y.path || n.activePath.startsWith(y.path + "/");
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
    return (y, k) => r.value ? (f(), x("div", yt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      z(ct, { name: "ksn-overlay" }, {
        default: E(() => [
          u.value ? (f(), x("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: v
          })) : P("", !0)
        ]),
        _: 1
      }),
      z(ct, { name: "ksn-sheet" }, {
        default: E(() => [
          u.value ? (f(), x("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: _e({ paddingBottom: n.mobileBarHeight })
          }, [
            k[3] || (k[3] = d("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              d("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            d("div", SM, [
              d("p", MM, A(u.value.label), 1),
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
            d("nav", DM, [
              (f(!0), x(he, null, pe(u.value.items, (_) => (f(), x("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": g(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => p(u.value, _)
              }, [
                _.icon ? (f(), te(rt(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : P("", !0),
                d("span", TM, A(_.label), 1)
              ], 8, AM))), 128))
            ])
          ], 4)) : P("", !0)
        ]),
        _: 1
      }),
      d("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: _e({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (f(!0), x(he, null, pe(e.sections, (_) => (f(), x("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": h(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => b(_)
        }, [
          e.selectedSectionId === _.id || h(_) ? (f(), x("span", LM)) : P("", !0),
          _.icon ? (f(), te(rt(_.icon), {
            key: 1,
            class: "shrink-0",
            style: _e({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : P("", !0),
          d("span", RM, A(_.label), 1)
        ], 8, BM))), 128))
      ], 4)
    ], 16)) : (f(), x("aside", yt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      d("div", bM, [
        d("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: _e({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: k[0] || (k[0] = (_) => a.value = !0),
          onMouseleave: k[1] || (k[1] = (_) => a.value = !1)
        }, [
          y.$slots.logo ? (f(), x("div", vM, [
            ke(y.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : P("", !0),
          d("nav", yM, [
            (f(!0), x(he, null, pe(e.sections, (_) => (f(), x("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": h(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => b(_)
            }, [
              _.icon ? (f(), te(rt(_.icon), {
                key: 0,
                class: "shrink-0",
                style: _e({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : P("", !0),
              d("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: _e({ fontSize: e.primaryFontSize })
              }, A(_.label), 5)
            ], 8, xM))), 128))
          ]),
          y.$slots.footer ? (f(), x("div", kM, [
            ke(y.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : P("", !0)
        ], 36),
        z(ct, { name: "ksn-sub" }, {
          default: E(() => [
            u.value ? (f(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: _e({ width: e.secondaryWidth })
            }, [
              d("div", _M, [
                d("p", wM, A(u.value.label), 1)
              ]),
              d("nav", CM, [
                (f(!0), x(he, null, pe(u.value.items, (_) => (f(), x("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": g(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => m(u.value, _)
                }, [
                  _.icon ? (f(), te(rt(_.icon), {
                    key: 0,
                    style: _e({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : P("", !0),
                  d("span", {
                    class: "truncate",
                    style: _e({ fontSize: e.secondaryFontSize })
                  }, A(_.label), 5)
                ], 8, $M))), 128))
              ])
            ], 4)) : P("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), PM = /* @__PURE__ */ be(IM, [["__scopeId", "data-v-e0ccb96c"]]), EM = ["aria-label"], OM = {
  key: 0,
  class: "shrink-0 px-4 py-4"
}, FM = { class: "text-start text-[12px] font-bold uppercase tracking-widest [color:var(--kiut-text-subtitle)]" }, VM = ["aria-label"], NM = ["data-nav-id", "data-testid", "disabled", "aria-current", "onClick"], zM = {
  key: 1,
  class: "h-3.5 w-3.5 shrink-0 opacity-70",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, jM = /* @__PURE__ */ fe({
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
    return (i, l) => (f(), x("aside", {
      class: "kiut-vertical-nav-panel flex shrink-0 flex-col overflow-hidden rounded-xl border border-[color:var(--kiut-border-light)] [background-color:var(--kiut-lateral-bg)] font-['Inter',system-ui,sans-serif]",
      style: _e({ width: e.panelWidth }),
      role: "navigation",
      "aria-label": e.ariaLabel
    }, [
      e.title ? (f(), x("div", OM, [
        d("p", FM, A(e.title), 1)
      ])) : P("", !0),
      d("nav", {
        class: X(["flex flex-1 flex-col gap-0.5 overflow-y-auto px-1 pb-3", { "pt-2": !e.title }]),
        "aria-label": e.title || e.ariaLabel
      }, [
        (f(!0), x(he, null, pe(e.items, (r) => (f(), x("button", {
          key: r.value,
          type: "button",
          "data-nav-id": r.value,
          "data-testid": r.testId,
          disabled: r.disabled === !0,
          "aria-current": o(r) ? "true" : void 0,
          class: "kvnp-item group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 disabled:cursor-not-allowed disabled:opacity-40",
          onClick: (c) => s(r)
        }, [
          r.icon ? (f(), te(rt(r.icon), {
            key: 0,
            class: "shrink-0",
            style: _e({ width: e.iconSize, height: e.iconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : P("", !0),
          d("span", {
            class: "min-w-0 flex-1 truncate",
            style: _e({ fontSize: e.fontSize })
          }, A(r.label), 5),
          o(r) ? (f(), x("svg", zM, [...l[0] || (l[0] = [
            d("path", { d: "M9 6l6 6-6 6" }, null, -1)
          ])])) : P("", !0)
        ], 8, NM))), 128))
      ], 10, VM)
    ], 12, EM));
  }
}), Ql = /* @__PURE__ */ be(jM, [["__scopeId", "data-v-cf2cdc84"]]), HM = { class: "kiut-module-nav-layout flex min-h-0 w-full flex-col gap-4 md:flex-row md:items-start" }, WM = { class: "min-w-0 flex-1" }, KM = /* @__PURE__ */ fe({
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
    return (n, o) => (f(), x("div", HM, [
      z(Ql, {
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
      d("div", WM, [
        n.$slots.default ? (f(), te(ct, {
          key: 0,
          name: "module-nav-panel",
          mode: "out-in"
        }, {
          default: E(() => [
            (f(), x("div", {
              key: e.modelValue,
              class: "module-nav-panel"
            }, [
              ke(n.$slots, "default", { active: e.modelValue }, void 0, !0)
            ]))
          ]),
          _: 3
        })) : ke(n.$slots, "default", { key: 1 }, void 0, !0)
      ])
    ]));
  }
}), UM = /* @__PURE__ */ be(KM, [["__scopeId", "data-v-6f3134eb"]]), n8 = {
  install(e) {
    e.component("KiutChartBar", $t), e.component("KiutChartLine", mt), e.component("KiutPieChart", Vn), e.component("KiutBoxplotChart", Yf), e.component("KiutCandlestickChart", Ig), e.component("KiutHistogramChart", wl), e.component("KiutSankeyChart", Yt), e.component("KiutAgentsPerDay", Lp), e.component("KiutBookingManager", u0), e.component("KiutCheckin", S0), e.component("KiutCheckinContainer", Wb), e.component("KiutCheckinMetrics", Dl), e.component("KiutCheckinErrorReasons", Tb), e.component("KiutCheckinSegments", Rl), e.component("KiutDisruption", rv), e.component("KiutFAQ", pv), e.component("KiutMessagesPerAgent", Il), e.component("KiutRecordLocator", Uv), e.component("KiutSalesByChannel", Pl), e.component("KiutSeller", El), e.component("KiutSellerContainer", Ty), e.component("KiutAncillaries", qy), e.component("KiutAncillariesCR", h1), e.component("KiutTopAgents", y1), e.component("KiutPaymentMethod", N1), e.component("KiutAgentHumanConversations", lx), e.component("KiutChannelMetrics", Ol), e.component("KiutConversationVolume", xx), e.component("KiutTriageCombinations", Ix), e.component("KiutSelectLanguage", Nx), e.component("KiutGuardrails", Gx), e.component("KiutDisruptionNotifier", pk), e.component("KiutTotalConversationsCard", vk), e.component("KiutCsatP95Card", xk), e.component("KiutCsatPulseCard", kk), e.component("KiutCSATContainer", Xk), e.component("KiutAiGeneratedRevenueCard", Zk), e.component("KiutAiGeneratedChart", i_), e.component("KiutTransactionsChart", m_), e.component("KiutCostCard", b_), e.component("KiutHumanEscalations", S_), e.component("KiutHumanEscalationsCard", D_), e.component("KiutAvgResolutionTime", N_), e.component("KiutAvgResolutionTimeCard", Y_), e.component("KiutCheckinCR", X_), e.component("KiutSellerCR", Z_), e.component("KiutBookingManagerCR", J_), e.component("KiutNpsDailyMetrics", Vl), e.component("KiutNpsMetrics", Nl), e.component("KiutNpsOverviewMetrics", Fl), e.component("KiutAWSCost", l2), e.component("KiutCostUsage", b2), e.component("KiutTokenUsage", M2), e.component("KiutConversationCount", O2), e.component("KiutTopAgentsAnalysis", X2), e.component("KiutTopAgentsPie", ow), e.component("KiutDailyCostTrends", fw), e.component("KiutModelUsage", Mw), e.component("KiutMessageRoles", Ew), e.component("KiutCostPerConversations", qw), e.component("Tabs", zl), e.component("Table", Ll), e.component("TableVersions", z5), e.component("Filters", $C), e.component("InputText", Hl), e.component("InputPassword", VC), e.component("InputTextarea", WC), e.component("InputFile", d$), e.component("ImageUploadCircle", b$), e.component("InputDateTime", Q$), e.component("InputTime", i4), e.component("InputRange", x4), e.component("InputNumber", $4), e.component("InputColorPicker", I4), e.component("EmojiPicker", Q4), e.component("Select", Tt), e.component("LanguageSelect", J4), e.component("LanguagePicker", cS), e.component("MultiSelect", MS), e.component("Toggle", jl), e.component("InputPhone", PS), e.component("SelectablePills", jS), e.component("SegmentedControl", US), e.component("DateRangePicker", u3), e.component("DatePickerPresets", O3), e.component("Tag", Xe), e.component("TagSelect", q3), e.component("TranslationCountBadge", j3), e.component("Button", Mt), e.component("Banner", eM), e.component("Modal", rM), e.component("Section", pM), e.component("KiutAppShellNavigation", PM), e.component("ModuleNavLayout", UM), e.component("VerticalNavPanel", Ql);
  }
};
export {
  l2 as AWSCost,
  lx as AgentHumanConversations,
  Lp as AgentsPerDay,
  i_ as AiGeneratedChart,
  Zk as AiGeneratedRevenueCard,
  qy as Ancillaries,
  h1 as AncillariesCR,
  PM as AppShellNavigation,
  N_ as AvgResolutionTime,
  Y_ as AvgResolutionTimeCard,
  eM as Banner,
  u0 as BookingManager,
  J_ as BookingManagerCR,
  Yf as BoxplotChart,
  Mt as Button,
  Xk as CSATContainer,
  Ig as CandlestickChart,
  Ol as ChannelMetrics,
  $t as ChartBar,
  mt as ChartLine,
  S0 as Checkin,
  X_ as CheckinCR,
  Wb as CheckinContainer,
  Tb as CheckinErrorReasons,
  Dl as CheckinMetrics,
  Rl as CheckinSegments,
  O2 as ConversationCount,
  xx as ConversationVolume,
  b_ as CostCard,
  qw as CostPerConversations,
  b2 as CostUsage,
  xk as CsatP95Card,
  kk as CsatPulseCard,
  Gl as DEFAULT_CATEGORY_LABELS,
  Zl as DEFAULT_EMOJI_CATALOG,
  x5 as DEFAULT_TABLE_VERSIONS_LABELS,
  fw as DailyCostTrends,
  O3 as DatePickerPresets,
  u3 as DateRangePicker,
  rv as Disruption,
  pk as DisruptionNotifier,
  k5 as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  Q4 as EmojiPicker,
  pv as FAQ,
  $C as Filters,
  Gx as Guardrails,
  wl as HistogramChart,
  S_ as HumanEscalations,
  D_ as HumanEscalationsCard,
  b$ as ImageUploadCircle,
  I4 as InputColorPicker,
  Q$ as InputDateTime,
  d$ as InputFile,
  $4 as InputNumber,
  VC as InputPassword,
  PS as InputPhone,
  x4 as InputRange,
  Hl as InputText,
  WC as InputTextarea,
  i4 as InputTime,
  n8 as KiutUIPlugin,
  cS as LanguagePicker,
  J4 as LanguageSelect,
  Ew as MessageRoles,
  Il as MessagesPerAgent,
  rM as Modal,
  Mw as ModelUsage,
  UM as ModuleNavLayout,
  MS as MultiSelect,
  Vl as NpsDailyMetrics,
  Nl as NpsMetrics,
  Fl as NpsOverviewMetrics,
  N1 as PaymentMethod,
  Vn as PieChart,
  t8 as RESOURCE_TABLE_VERSIONS_COLUMNS,
  Uv as RecordLocator,
  Pl as SalesByChannel,
  Yt as SankeyChart,
  pM as Section,
  US as SegmentedControl,
  Tt as Select,
  Nx as SelectLanguage,
  jS as SelectablePills,
  El as Seller,
  Z_ as SellerCR,
  Ty as SellerContainer,
  Ll as Table,
  z5 as TableVersions,
  zl as Tabs,
  Xe as Tag,
  q3 as TagSelect,
  jl as Toggle,
  M2 as TokenUsage,
  y1 as TopAgents,
  X2 as TopAgentsAnalysis,
  ow as TopAgentsPie,
  vk as TotalConversationsCard,
  m_ as TransactionsChart,
  j3 as TranslationCountBadge,
  Ix as TriageCombinations,
  Ql as VerticalNavPanel,
  F4 as appendEmojiToDraft,
  a8 as buildDefaultCategories,
  O4 as extractEmojis,
  E4 as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
