import { defineComponent as J, shallowRef as Mo, h as ga, ref as st, onMounted as he, onUnmounted as ns, watch as Vt, toRaw as pa, nextTick as St, version as Pi, isProxy as So, computed as D, toRef as rt, openBlock as y, createElementBlock as x, createVNode as X, unref as T, normalizeStyle as xt, createElementVNode as c, toDisplayString as M, createCommentVNode as O, Fragment as q, renderList as Z, onBeforeUnmount as Co, createStaticVNode as Q, withDirectives as Xt, vShow as Ms, normalizeClass as at, createBlock as ct, createTextVNode as wt, resolveDynamicComponent as $a, Transition as Ei, withCtx as xs, renderSlot as zt, useSlots as Do, Teleport as Ao, withModifiers as de, withKeys as Ss, vModelText as Ye, vModelSelect as Ri, useAttrs as Oi, mergeProps as qa } from "vue";
import * as Ua from "echarts/core";
import { TooltipComponent as Ii, TitleComponent as zi } from "echarts/components";
import { SankeyChart as Vi } from "echarts/charts";
import { CanvasRenderer as Ni } from "echarts/renderers";
import Tt from "moment";
function os(e) {
  return e + 0.5 | 0;
}
const ie = (e, t, s) => Math.max(Math.min(e, s), t);
function We(e) {
  return ie(os(e * 2.55), 0, 255);
}
function ce(e) {
  return ie(os(e * 255), 0, 255);
}
function te(e) {
  return ie(os(e / 2.55) / 100, 0, 1);
}
function Ka(e) {
  return ie(os(e * 100), 0, 100);
}
const Ht = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, ba = [..."0123456789ABCDEF"], Wi = (e) => ba[e & 15], Hi = (e) => ba[(e & 240) >> 4] + ba[e & 15], ls = (e) => (e & 240) >> 4 === (e & 15), ji = (e) => ls(e.r) && ls(e.g) && ls(e.b) && ls(e.a);
function Yi(e) {
  var t = e.length, s;
  return e[0] === "#" && (t === 4 || t === 5 ? s = {
    r: 255 & Ht[e[1]] * 17,
    g: 255 & Ht[e[2]] * 17,
    b: 255 & Ht[e[3]] * 17,
    a: t === 5 ? Ht[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (s = {
    r: Ht[e[1]] << 4 | Ht[e[2]],
    g: Ht[e[3]] << 4 | Ht[e[4]],
    b: Ht[e[5]] << 4 | Ht[e[6]],
    a: t === 9 ? Ht[e[7]] << 4 | Ht[e[8]] : 255
  })), s;
}
const qi = (e, t) => e < 255 ? t(e) : "";
function Ui(e) {
  var t = ji(e) ? Wi : Hi;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + qi(e.a, t) : void 0;
}
const Ki = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function To(e, t, s) {
  const a = t * Math.min(s, 1 - s), n = (o, i = (o + e / 30) % 12) => s - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [n(0), n(8), n(4)];
}
function Xi(e, t, s) {
  const a = (n, o = (n + e / 60) % 6) => s - s * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function Gi(e, t, s) {
  const a = To(e, 1, 0.5);
  let n;
  for (t + s > 1 && (n = 1 / (t + s), t *= n, s *= n), n = 0; n < 3; n++)
    a[n] *= 1 - t - s, a[n] += t;
  return a;
}
function Zi(e, t, s, a, n) {
  return e === n ? (t - s) / a + (t < s ? 6 : 0) : t === n ? (s - e) / a + 2 : (e - t) / a + 4;
}
function Ma(e) {
  const s = e.r / 255, a = e.g / 255, n = e.b / 255, o = Math.max(s, a, n), i = Math.min(s, a, n), r = (o + i) / 2;
  let l, d, u;
  return o !== i && (u = o - i, d = r > 0.5 ? u / (2 - o - i) : u / (o + i), l = Zi(s, a, n, u, o), l = l * 60 + 0.5), [l | 0, d || 0, r];
}
function Sa(e, t, s, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, s, a)).map(ce);
}
function Ca(e, t, s) {
  return Sa(To, e, t, s);
}
function Qi(e, t, s) {
  return Sa(Gi, e, t, s);
}
function Ji(e, t, s) {
  return Sa(Xi, e, t, s);
}
function Bo(e) {
  return (e % 360 + 360) % 360;
}
function tr(e) {
  const t = Ki.exec(e);
  let s = 255, a;
  if (!t)
    return;
  t[5] !== a && (s = t[6] ? We(+t[5]) : ce(+t[5]));
  const n = Bo(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = Qi(n, o, i) : t[1] === "hsv" ? a = Ji(n, o, i) : a = Ca(n, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: s
  };
}
function er(e, t) {
  var s = Ma(e);
  s[0] = Bo(s[0] + t), s = Ca(s), e.r = s[0], e.g = s[1], e.b = s[2];
}
function sr(e) {
  if (!e)
    return;
  const t = Ma(e), s = t[0], a = Ka(t[1]), n = Ka(t[2]);
  return e.a < 255 ? `hsla(${s}, ${a}%, ${n}%, ${te(e.a)})` : `hsl(${s}, ${a}%, ${n}%)`;
}
const Xa = {
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
}, Ga = {
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
function ar() {
  const e = {}, t = Object.keys(Ga), s = Object.keys(Xa);
  let a, n, o, i, r;
  for (a = 0; a < t.length; a++) {
    for (i = r = t[a], n = 0; n < s.length; n++)
      o = s[n], r = r.replace(o, Xa[o]);
    o = parseInt(Ga[i], 16), e[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let cs;
function nr(e) {
  cs || (cs = ar(), cs.transparent = [0, 0, 0, 0]);
  const t = cs[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const or = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function ir(e) {
  const t = or.exec(e);
  let s = 255, a, n, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      s = t[8] ? We(i) : ie(i * 255, 0, 255);
    }
    return a = +t[1], n = +t[3], o = +t[5], a = 255 & (t[2] ? We(a) : ie(a, 0, 255)), n = 255 & (t[4] ? We(n) : ie(n, 0, 255)), o = 255 & (t[6] ? We(o) : ie(o, 0, 255)), {
      r: a,
      g: n,
      b: o,
      a: s
    };
  }
}
function rr(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${te(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const js = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Se = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function lr(e, t, s) {
  const a = Se(te(e.r)), n = Se(te(e.g)), o = Se(te(e.b));
  return {
    r: ce(js(a + s * (Se(te(t.r)) - a))),
    g: ce(js(n + s * (Se(te(t.g)) - n))),
    b: ce(js(o + s * (Se(te(t.b)) - o))),
    a: e.a + s * (t.a - e.a)
  };
}
function ds(e, t, s) {
  if (e) {
    let a = Ma(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * s, t === 0 ? 360 : 1)), a = Ca(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Lo(e, t) {
  return e && Object.assign(t || {}, e);
}
function Za(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = ce(e[3]))) : (t = Lo(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = ce(t.a)), t;
}
function cr(e) {
  return e.charAt(0) === "r" ? ir(e) : tr(e);
}
class Ge {
  constructor(t) {
    if (t instanceof Ge)
      return t;
    const s = typeof t;
    let a;
    s === "object" ? a = Za(t) : s === "string" && (a = Yi(t) || nr(t) || cr(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Lo(this._rgb);
    return t && (t.a = te(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Za(t);
  }
  rgbString() {
    return this._valid ? rr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Ui(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? sr(this._rgb) : void 0;
  }
  mix(t, s) {
    if (t) {
      const a = this.rgb, n = t.rgb;
      let o;
      const i = s === o ? 0.5 : s, r = 2 * i - 1, l = a.a - n.a, d = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      o = 1 - d, a.r = 255 & d * a.r + o * n.r + 0.5, a.g = 255 & d * a.g + o * n.g + 0.5, a.b = 255 & d * a.b + o * n.b + 0.5, a.a = i * a.a + (1 - i) * n.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, s) {
    return t && (this._rgb = lr(this._rgb, t._rgb, s)), this;
  }
  clone() {
    return new Ge(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = ce(t), this;
  }
  clearer(t) {
    const s = this._rgb;
    return s.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, s = os(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = s, this;
  }
  opaquer(t) {
    const s = this._rgb;
    return s.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return ds(this._rgb, 2, t), this;
  }
  darken(t) {
    return ds(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ds(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ds(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return er(this._rgb, t), this;
  }
}
function Zt() {
}
const dr = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function ft(e) {
  return e == null;
}
function $t(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function it(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function Ft(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function qt(e, t) {
  return Ft(e) ? e : t;
}
function ot(e, t) {
  return typeof e > "u" ? t : e;
}
const ur = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Fo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function vt(e, t, s) {
  if (e && typeof e.call == "function")
    return e.apply(s, t);
}
function gt(e, t, s, a) {
  let n, o, i;
  if ($t(e))
    for (o = e.length, n = 0; n < o; n++)
      t.call(s, e[n], n);
  else if (it(e))
    for (i = Object.keys(e), o = i.length, n = 0; n < o; n++)
      t.call(s, e[i[n]], i[n]);
}
function Cs(e, t) {
  let s, a, n, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (s = 0, a = e.length; s < a; ++s)
    if (n = e[s], o = t[s], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function Ds(e) {
  if ($t(e))
    return e.map(Ds);
  if (it(e)) {
    const t = /* @__PURE__ */ Object.create(null), s = Object.keys(e), a = s.length;
    let n = 0;
    for (; n < a; ++n)
      t[s[n]] = Ds(e[s[n]]);
    return t;
  }
  return e;
}
function Po(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function hr(e, t, s, a) {
  if (!Po(e))
    return;
  const n = t[e], o = s[e];
  it(n) && it(o) ? Ze(n, o, a) : t[e] = Ds(o);
}
function Ze(e, t, s) {
  const a = $t(t) ? t : [
    t
  ], n = a.length;
  if (!it(e))
    return e;
  s = s || {};
  const o = s.merger || hr;
  let i;
  for (let r = 0; r < n; ++r) {
    if (i = a[r], !it(i))
      continue;
    const l = Object.keys(i);
    for (let d = 0, u = l.length; d < u; ++d)
      o(l[d], e, i, s);
  }
  return e;
}
function qe(e, t) {
  return Ze(e, t, {
    merger: fr
  });
}
function fr(e, t, s) {
  if (!Po(e))
    return;
  const a = t[e], n = s[e];
  it(a) && it(n) ? qe(a, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Ds(n));
}
const Qa = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function gr(e) {
  const t = e.split("."), s = [];
  let a = "";
  for (const n of t)
    a += n, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (s.push(a), a = "");
  return s;
}
function pr(e) {
  const t = gr(e);
  return (s) => {
    for (const a of t) {
      if (a === "")
        break;
      s = s && s[a];
    }
    return s;
  };
}
function we(e, t) {
  return (Qa[t] || (Qa[t] = pr(t)))(e);
}
function Da(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Qe = (e) => typeof e < "u", ue = (e) => typeof e == "function", Ja = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const s of e)
    if (!t.has(s))
      return !1;
  return !0;
};
function br(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const pt = Math.PI, mt = 2 * pt, vr = mt + pt, As = Number.POSITIVE_INFINITY, mr = pt / 180, Mt = pt / 2, pe = pt / 4, tn = pt * 2 / 3, Eo = Math.log10, Gt = Math.sign;
function Ue(e, t, s) {
  return Math.abs(e - t) < s;
}
function en(e) {
  const t = Math.round(e);
  e = Ue(e, t, e / 1e3) ? t : e;
  const s = Math.pow(10, Math.floor(Eo(e))), a = e / s;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * s;
}
function yr(e) {
  const t = [], s = Math.sqrt(e);
  let a;
  for (a = 1; a < s; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return s === (s | 0) && t.push(s), t.sort((n, o) => n - o).pop(), t;
}
function _r(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Je(e) {
  return !_r(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function xr(e, t) {
  const s = Math.round(e);
  return s - t <= e && s + t >= e;
}
function kr(e, t, s) {
  let a, n, o;
  for (a = 0, n = e.length; a < n; a++)
    o = e[a][s], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function ee(e) {
  return e * (pt / 180);
}
function wr(e) {
  return e * (180 / pt);
}
function sn(e) {
  if (!Ft(e))
    return;
  let t = 1, s = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, s++;
  return s;
}
function Ro(e, t) {
  const s = t.x - e.x, a = t.y - e.y, n = Math.sqrt(s * s + a * a);
  let o = Math.atan2(a, s);
  return o < -0.5 * pt && (o += mt), {
    angle: o,
    distance: n
  };
}
function va(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function $r(e, t) {
  return (e - t + vr) % mt - pt;
}
function It(e) {
  return (e % mt + mt) % mt;
}
function ts(e, t, s, a) {
  const n = It(e), o = It(t), i = It(s), r = It(o - n), l = It(i - n), d = It(n - o), u = It(n - i);
  return n === o || n === i || a && o === i || r > l && d < u;
}
function Bt(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function Mr(e) {
  return Bt(e, -32768, 32767);
}
function se(e, t, s, a = 1e-6) {
  return e >= Math.min(t, s) - a && e <= Math.max(t, s) + a;
}
function Aa(e, t, s) {
  s = s || ((i) => e[i] < t);
  let a = e.length - 1, n = 0, o;
  for (; a - n > 1; )
    o = n + a >> 1, s(o) ? n = o : a = o;
  return {
    lo: n,
    hi: a
  };
}
const xe = (e, t, s, a) => Aa(e, s, a ? (n) => {
  const o = e[n][t];
  return o < s || o === s && e[n + 1][t] === s;
} : (n) => e[n][t] < s), Sr = (e, t, s) => Aa(e, s, (a) => e[a][t] >= s);
function Cr(e, t, s) {
  let a = 0, n = e.length;
  for (; a < n && e[a] < t; )
    a++;
  for (; n > a && e[n - 1] > s; )
    n--;
  return a > 0 || n < e.length ? e.slice(a, n) : e;
}
const Oo = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Dr(e, t) {
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
  }), Oo.forEach((s) => {
    const a = "_onData" + Da(s), n = e[s];
    Object.defineProperty(e, s, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const i = n.apply(this, o);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[a] == "function" && r[a](...o);
        }), i;
      }
    });
  });
}
function an(e, t) {
  const s = e._chartjs;
  if (!s)
    return;
  const a = s.listeners, n = a.indexOf(t);
  n !== -1 && a.splice(n, 1), !(a.length > 0) && (Oo.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Io(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const zo = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Vo(e, t) {
  let s = [], a = !1;
  return function(...n) {
    s = n, a || (a = !0, zo.call(window, () => {
      a = !1, e.apply(t, s);
    }));
  };
}
function Ar(e, t) {
  let s;
  return function(...a) {
    return t ? (clearTimeout(s), s = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const Ta = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", At = (e, t, s) => e === "start" ? t : e === "end" ? s : (t + s) / 2, Tr = (e, t, s, a) => e === (a ? "left" : "right") ? s : e === "center" ? (t + s) / 2 : t;
function Br(e, t, s) {
  const a = t.length;
  let n = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: f, minDefined: b, maxDefined: p } = i.getUserBounds();
    if (b) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        xe(l, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? a : xe(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const _ = l.slice(0, n + 1).reverse().findIndex((m) => !ft(m[r.axis]));
        n -= Math.max(0, _);
      }
      n = Bt(n, 0, a - 1);
    }
    if (p) {
      let _ = Math.max(
        // @ts-expect-error Need to type _parsed
        xe(l, i.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : xe(t, u, i.getPixelForValue(f), !0).hi + 1
      );
      if (d) {
        const m = l.slice(_ - 1).findIndex((g) => !ft(g[r.axis]));
        _ += Math.max(0, m);
      }
      o = Bt(_, n, a) - n;
    } else
      o = a - n;
  }
  return {
    start: n,
    count: o
  };
}
function Lr(e) {
  const { xScale: t, yScale: s, _scaleRanges: a } = e, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: s.min,
    ymax: s.max
  };
  if (!a)
    return e._scaleRanges = n, !0;
  const o = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== s.min || a.ymax !== s.max;
  return Object.assign(a, n), o;
}
const us = (e) => e === 0 || e === 1, nn = (e, t, s) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * mt / s)), on = (e, t, s) => Math.pow(2, -10 * e) * Math.sin((e - t) * mt / s) + 1, Ke = {
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
  easeInSine: (e) => -Math.cos(e * Mt) + 1,
  easeOutSine: (e) => Math.sin(e * Mt),
  easeInOutSine: (e) => -0.5 * (Math.cos(pt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => us(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => us(e) ? e : nn(e, 0.075, 0.3),
  easeOutElastic: (e) => us(e) ? e : on(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return us(e) ? e : e < 0.5 ? 0.5 * nn(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * on(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Ke.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Ke.easeInBounce(e * 2) * 0.5 : Ke.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Ba(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function rn(e) {
  return Ba(e) ? e : new Ge(e);
}
function Ys(e) {
  return Ba(e) ? e : new Ge(e).saturate(0.5).darken(0.1).hexString();
}
const Fr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Pr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Er(e) {
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
      properties: Pr
    },
    numbers: {
      type: "number",
      properties: Fr
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
function Rr(e) {
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
const ln = /* @__PURE__ */ new Map();
function Or(e, t) {
  t = t || {};
  const s = e + JSON.stringify(t);
  let a = ln.get(s);
  return a || (a = new Intl.NumberFormat(e, t), ln.set(s, a)), a;
}
function La(e, t, s) {
  return Or(t, s).format(e);
}
const Ir = {
  values(e) {
    return $t(e) ? e : "" + e;
  },
  numeric(e, t, s) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let n, o = e;
    if (s.length > 1) {
      const d = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (d < 1e-4 || d > 1e15) && (n = "scientific"), o = zr(e, s);
    }
    const i = Eo(Math.abs(o)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), La(e, a, l);
  }
};
function zr(e, t) {
  let s = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(s) >= 1 && e !== Math.floor(e) && (s = e - Math.floor(e)), s;
}
var No = {
  formatters: Ir
};
function Vr(e) {
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
      tickWidth: (t, s) => s.lineWidth,
      tickColor: (t, s) => s.color,
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
      callback: No.formatters.values,
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
const $e = /* @__PURE__ */ Object.create(null), ma = /* @__PURE__ */ Object.create(null);
function Xe(e, t) {
  if (!t)
    return e;
  const s = t.split(".");
  for (let a = 0, n = s.length; a < n; ++a) {
    const o = s[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function qs(e, t, s) {
  return typeof t == "string" ? Ze(Xe(e, t), s) : Ze(Xe(e, ""), t);
}
class Nr {
  constructor(t, s) {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, n) => Ys(n.backgroundColor), this.hoverBorderColor = (a, n) => Ys(n.borderColor), this.hoverColor = (a, n) => Ys(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(s);
  }
  set(t, s) {
    return qs(this, t, s);
  }
  get(t) {
    return Xe(this, t);
  }
  describe(t, s) {
    return qs(ma, t, s);
  }
  override(t, s) {
    return qs($e, t, s);
  }
  route(t, s, a, n) {
    const o = Xe(this, t), i = Xe(this, a), r = "_" + s;
    Object.defineProperties(o, {
      [r]: {
        value: o[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], d = i[n];
          return it(l) ? Object.assign({}, d, l) : ot(l, d);
        },
        set(l) {
          this[r] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((s) => s(this));
  }
}
var kt = /* @__PURE__ */ new Nr({
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
  Er,
  Rr,
  Vr
]);
function Wr(e) {
  return !e || ft(e.size) || ft(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function cn(e, t, s, a, n) {
  let o = t[n];
  return o || (o = t[n] = e.measureText(n).width, s.push(n)), o > a && (a = o), a;
}
function be(e, t, s) {
  const a = e.currentDevicePixelRatio, n = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((t - n) * a) / a + n;
}
function dn(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function ya(e, t, s, a) {
  Wo(e, t, s, a, null);
}
function Wo(e, t, s, a, n) {
  let o, i, r, l, d, u, h, f;
  const b = t.pointStyle, p = t.rotation, _ = t.radius;
  let m = (p || 0) * mr;
  if (b && typeof b == "object" && (o = b.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(s, a), e.rotate(m), e.drawImage(b, -b.width / 2, -b.height / 2, b.width, b.height), e.restore();
    return;
  }
  if (!(isNaN(_) || _ <= 0)) {
    switch (e.beginPath(), b) {
      // Default includes circle
      default:
        n ? e.ellipse(s, a, n / 2, _, 0, 0, mt) : e.arc(s, a, _, 0, mt), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : _, e.moveTo(s + Math.sin(m) * u, a - Math.cos(m) * _), m += tn, e.lineTo(s + Math.sin(m) * u, a - Math.cos(m) * _), m += tn, e.lineTo(s + Math.sin(m) * u, a - Math.cos(m) * _), e.closePath();
        break;
      case "rectRounded":
        d = _ * 0.516, l = _ - d, i = Math.cos(m + pe) * l, h = Math.cos(m + pe) * (n ? n / 2 - d : l), r = Math.sin(m + pe) * l, f = Math.sin(m + pe) * (n ? n / 2 - d : l), e.arc(s - h, a - r, d, m - pt, m - Mt), e.arc(s + f, a - i, d, m - Mt, m), e.arc(s + h, a + r, d, m, m + Mt), e.arc(s - f, a + i, d, m + Mt, m + pt), e.closePath();
        break;
      case "rect":
        if (!p) {
          l = Math.SQRT1_2 * _, u = n ? n / 2 : l, e.rect(s - u, a - l, 2 * u, 2 * l);
          break;
        }
        m += pe;
      /* falls through */
      case "rectRot":
        h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + f, a - i), e.lineTo(s + h, a + r), e.lineTo(s - f, a + i), e.closePath();
        break;
      case "crossRot":
        m += pe;
      /* falls through */
      case "cross":
        h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + f, a - i), e.lineTo(s - f, a + i);
        break;
      case "star":
        h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + f, a - i), e.lineTo(s - f, a + i), m += pe, h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + f, a - i), e.lineTo(s - f, a + i);
        break;
      case "line":
        i = n ? n / 2 : Math.cos(m) * _, r = Math.sin(m) * _, e.moveTo(s - i, a - r), e.lineTo(s + i, a + r);
        break;
      case "dash":
        e.moveTo(s, a), e.lineTo(s + Math.cos(m) * (n ? n / 2 : _), a + Math.sin(m) * _);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function es(e, t, s) {
  return s = s || 0.5, !t || e && e.x > t.left - s && e.x < t.right + s && e.y > t.top - s && e.y < t.bottom + s;
}
function Ps(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Es(e) {
  e.restore();
}
function Hr(e, t, s, a, n) {
  if (!t)
    return e.lineTo(s.x, s.y);
  if (n === "middle") {
    const o = (t.x + s.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, s.y);
  } else n === "after" != !!a ? e.lineTo(t.x, s.y) : e.lineTo(s.x, t.y);
  e.lineTo(s.x, s.y);
}
function jr(e, t, s, a) {
  if (!t)
    return e.lineTo(s.x, s.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? s.cp2x : s.cp1x, a ? s.cp2y : s.cp1y, s.x, s.y);
}
function Yr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), ft(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function qr(e, t, s, a, n) {
  if (n.strikethrough || n.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, r = t + o.actualBoundingBoxRight, l = s - o.actualBoundingBoxAscent, d = s + o.actualBoundingBoxDescent, u = n.strikethrough ? (l + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(i, u), e.lineTo(r, u), e.stroke();
  }
}
function Ur(e, t) {
  const s = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = s;
}
function ss(e, t, s, a, n, o = {}) {
  const i = $t(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, d;
  for (e.save(), e.font = n.string, Yr(e, o), l = 0; l < i.length; ++l)
    d = i[l], o.backdrop && Ur(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), ft(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, s, a, o.maxWidth)), e.fillText(d, s, a, o.maxWidth), qr(e, s, a, d, o), a += Number(n.lineHeight);
  e.restore();
}
function Ts(e, t) {
  const { x: s, y: a, w: n, h: o, radius: i } = t;
  e.arc(s + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * pt, pt, !0), e.lineTo(s, a + o - i.bottomLeft), e.arc(s + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, pt, Mt, !0), e.lineTo(s + n - i.bottomRight, a + o), e.arc(s + n - i.bottomRight, a + o - i.bottomRight, i.bottomRight, Mt, 0, !0), e.lineTo(s + n, a + i.topRight), e.arc(s + n - i.topRight, a + i.topRight, i.topRight, 0, -Mt, !0), e.lineTo(s + i.topLeft, a);
}
const Kr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Xr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Gr(e, t) {
  const s = ("" + e).match(Kr);
  if (!s || s[1] === "normal")
    return t * 1.2;
  switch (e = +s[2], s[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const Zr = (e) => +e || 0;
function Fa(e, t) {
  const s = {}, a = it(t), n = a ? Object.keys(t) : t, o = it(e) ? a ? (i) => ot(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of n)
    s[i] = Zr(o(i));
  return s;
}
function Ho(e) {
  return Fa(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ae(e) {
  return Fa(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Yt(e) {
  const t = Ho(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Lt(e, t) {
  e = e || {}, t = t || kt.font;
  let s = ot(e.size, t.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let a = ot(e.style, t.style);
  a && !("" + a).match(Xr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const n = {
    family: ot(e.family, t.family),
    lineHeight: Gr(ot(e.lineHeight, t.lineHeight), s),
    size: s,
    style: a,
    weight: ot(e.weight, t.weight),
    string: ""
  };
  return n.string = Wr(n), n;
}
function hs(e, t, s, a) {
  let n, o, i;
  for (n = 0, o = e.length; n < o; ++n)
    if (i = e[n], i !== void 0 && i !== void 0)
      return i;
}
function Qr(e, t, s) {
  const { min: a, max: n } = e, o = Fo(t, (n - a) / 2), i = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: i(a, -Math.abs(o)),
    max: i(n, o)
  };
}
function Me(e, t) {
  return Object.assign(Object.create(e), t);
}
function Pa(e, t = [
  ""
], s, a, n = () => e[0]) {
  const o = s || e;
  typeof a > "u" && (a = Uo("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: n,
    override: (r) => Pa([
      r,
      ...e
    ], t, o, a)
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
      return Yo(r, l, () => il(l, t, e, r));
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
      return hn(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return hn(r);
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
function Be(e, t, s, a) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: jo(e, a),
    setContext: (o) => Be(e, o, s, a),
    override: (o) => Be(e.override(o), t, s, a)
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
      return Yo(o, i, () => tl(o, i, r));
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
function jo(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = t.scriptable, _indexable: a = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: s,
    indexable: a,
    isScriptable: ue(s) ? s : () => s,
    isIndexable: ue(a) ? a : () => a
  };
}
const Jr = (e, t) => e ? e + Da(t) : t, Ea = (e, t) => it(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Yo(e, t, s) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = s();
  return e[t] = a, a;
}
function tl(e, t, s) {
  const { _proxy: a, _context: n, _subProxy: o, _descriptors: i } = e;
  let r = a[t];
  return ue(r) && i.isScriptable(t) && (r = el(t, r, e, s)), $t(r) && r.length && (r = sl(t, r, e, i.isIndexable)), Ea(t, r) && (r = Be(r, n, o && o[t], i)), r;
}
function el(e, t, s, a) {
  const { _proxy: n, _context: o, _subProxy: i, _stack: r } = s;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(o, i || a);
  return r.delete(e), Ea(e, l) && (l = Ra(n._scopes, n, e, l)), l;
}
function sl(e, t, s, a) {
  const { _proxy: n, _context: o, _subProxy: i, _descriptors: r } = s;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (it(t[0])) {
    const l = t, d = n._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const h = Ra(d, n, e, u);
      t.push(Be(h, o, i && i[e], r));
    }
  }
  return t;
}
function qo(e, t, s) {
  return ue(e) ? e(t, s) : e;
}
const al = (e, t) => e === !0 ? t : typeof e == "string" ? we(t, e) : void 0;
function nl(e, t, s, a, n) {
  for (const o of t) {
    const i = al(s, o);
    if (i) {
      e.add(i);
      const r = qo(i._fallback, s, n);
      if (typeof r < "u" && r !== s && r !== a)
        return r;
    } else if (i === !1 && typeof a < "u" && s !== a)
      return null;
  }
  return !1;
}
function Ra(e, t, s, a) {
  const n = t._rootScopes, o = qo(t._fallback, s, a), i = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(a);
  let l = un(r, i, s, o || s, a);
  return l === null || typeof o < "u" && o !== s && (l = un(r, i, o, l, a), l === null) ? !1 : Pa(Array.from(r), [
    ""
  ], n, o, () => ol(t, s, a));
}
function un(e, t, s, a, n) {
  for (; s; )
    s = nl(e, t, s, a, n);
  return s;
}
function ol(e, t, s) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const n = a[t];
  return $t(n) && it(s) ? s : n || {};
}
function il(e, t, s, a) {
  let n;
  for (const o of t)
    if (n = Uo(Jr(o, e), s), typeof n < "u")
      return Ea(e, n) ? Ra(s, a, e, n) : n;
}
function Uo(e, t) {
  for (const s of t) {
    if (!s)
      continue;
    const a = s[e];
    if (typeof a < "u")
      return a;
  }
}
function hn(e) {
  let t = e._keys;
  return t || (t = e._keys = rl(e._scopes)), t;
}
function rl(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const a of Object.keys(s).filter((n) => !n.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const ll = Number.EPSILON || 1e-14, Le = (e, t) => t < e.length && !e[t].skip && e[t], Ko = (e) => e === "x" ? "y" : "x";
function cl(e, t, s, a) {
  const n = e.skip ? t : e, o = t, i = s.skip ? t : s, r = va(o, n), l = va(i, o);
  let d = r / (r + l), u = l / (r + l);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = a * d, f = a * u;
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
function dl(e, t, s) {
  const a = e.length;
  let n, o, i, r, l, d = Le(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (l = d, d = Le(e, u + 1), !(!l || !d)) {
      if (Ue(t[u], 0, ll)) {
        s[u] = s[u + 1] = 0;
        continue;
      }
      n = s[u] / t[u], o = s[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(o, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), s[u] = n * i * t[u], s[u + 1] = o * i * t[u]);
    }
}
function ul(e, t, s = "x") {
  const a = Ko(s), n = e.length;
  let o, i, r, l = Le(e, 0);
  for (let d = 0; d < n; ++d) {
    if (i = r, r = l, l = Le(e, d + 1), !r)
      continue;
    const u = r[s], h = r[a];
    i && (o = (u - i[s]) / 3, r[`cp1${s}`] = u - o, r[`cp1${a}`] = h - o * t[d]), l && (o = (l[s] - u) / 3, r[`cp2${s}`] = u + o, r[`cp2${a}`] = h + o * t[d]);
  }
}
function hl(e, t = "x") {
  const s = Ko(t), a = e.length, n = Array(a).fill(0), o = Array(a);
  let i, r, l, d = Le(e, 0);
  for (i = 0; i < a; ++i)
    if (r = l, l = d, d = Le(e, i + 1), !!l) {
      if (d) {
        const u = d[t] - l[t];
        n[i] = u !== 0 ? (d[s] - l[s]) / u : 0;
      }
      o[i] = r ? d ? Gt(n[i - 1]) !== Gt(n[i]) ? 0 : (n[i - 1] + n[i]) / 2 : n[i - 1] : n[i];
    }
  dl(e, n, o), ul(e, o, t);
}
function fs(e, t, s) {
  return Math.max(Math.min(e, s), t);
}
function fl(e, t) {
  let s, a, n, o, i, r = es(e[0], t);
  for (s = 0, a = e.length; s < a; ++s)
    i = o, o = r, r = s < a - 1 && es(e[s + 1], t), o && (n = e[s], i && (n.cp1x = fs(n.cp1x, t.left, t.right), n.cp1y = fs(n.cp1y, t.top, t.bottom)), r && (n.cp2x = fs(n.cp2x, t.left, t.right), n.cp2y = fs(n.cp2y, t.top, t.bottom)));
}
function gl(e, t, s, a, n) {
  let o, i, r, l;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    hl(e, n);
  else {
    let d = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      r = e[o], l = cl(d, r, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, d = r;
  }
  t.capBezierPoints && fl(e, s);
}
function Oa() {
  return typeof window < "u" && typeof document < "u";
}
function Ia(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Bs(e, t, s) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[s])) : a = e, a;
}
const Rs = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function pl(e, t) {
  return Rs(e).getPropertyValue(t);
}
const bl = [
  "top",
  "right",
  "bottom",
  "left"
];
function ke(e, t, s) {
  const a = {};
  s = s ? "-" + s : "";
  for (let n = 0; n < 4; n++) {
    const o = bl[n];
    a[o] = parseFloat(e[t + "-" + o + s]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const vl = (e, t, s) => (e > 0 || t > 0) && (!s || !s.shadowRoot);
function ml(e, t) {
  const s = e.touches, a = s && s.length ? s[0] : e, { offsetX: n, offsetY: o } = a;
  let i = !1, r, l;
  if (vl(n, o, e.target))
    r = n, l = o;
  else {
    const d = t.getBoundingClientRect();
    r = a.clientX - d.left, l = a.clientY - d.top, i = !0;
  }
  return {
    x: r,
    y: l,
    box: i
  };
}
function ye(e, t) {
  if ("native" in e)
    return e;
  const { canvas: s, currentDevicePixelRatio: a } = t, n = Rs(s), o = n.boxSizing === "border-box", i = ke(n, "padding"), r = ke(n, "border", "width"), { x: l, y: d, box: u } = ml(e, s), h = i.left + (u && r.left), f = i.top + (u && r.top);
  let { width: b, height: p } = t;
  return o && (b -= i.width + r.width, p -= i.height + r.height), {
    x: Math.round((l - h) / b * s.width / a),
    y: Math.round((d - f) / p * s.height / a)
  };
}
function yl(e, t, s) {
  let a, n;
  if (t === void 0 || s === void 0) {
    const o = e && Ia(e);
    if (!o)
      t = e.clientWidth, s = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = Rs(o), l = ke(r, "border", "width"), d = ke(r, "padding");
      t = i.width - d.width - l.width, s = i.height - d.height - l.height, a = Bs(r.maxWidth, o, "clientWidth"), n = Bs(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: s,
    maxWidth: a || As,
    maxHeight: n || As
  };
}
const re = (e) => Math.round(e * 10) / 10;
function _l(e, t, s, a) {
  const n = Rs(e), o = ke(n, "margin"), i = Bs(n.maxWidth, e, "clientWidth") || As, r = Bs(n.maxHeight, e, "clientHeight") || As, l = yl(e, t, s);
  let { width: d, height: u } = l;
  if (n.boxSizing === "content-box") {
    const f = ke(n, "border", "width"), b = ke(n, "padding");
    d -= b.width + f.width, u -= b.height + f.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, a ? d / a : u - o.height), d = re(Math.min(d, i, l.maxWidth)), u = re(Math.min(u, r, l.maxHeight)), d && !u && (u = re(d / 2)), (t !== void 0 || s !== void 0) && a && l.height && u > l.height && (u = l.height, d = re(Math.floor(u * a))), {
    width: d,
    height: u
  };
}
function fn(e, t, s) {
  const a = t || 1, n = re(e.height * a), o = re(e.width * a);
  e.height = re(e.height), e.width = re(e.width);
  const i = e.canvas;
  return i.style && (s || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== n || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = n, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const xl = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Oa() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function gn(e, t) {
  const s = pl(e, t), a = s && s.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function _e(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: e.y + s * (t.y - e.y)
  };
}
function kl(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: a === "middle" ? s < 0.5 ? e.y : t.y : a === "after" ? s < 1 ? e.y : t.y : s > 0 ? t.y : e.y
  };
}
function wl(e, t, s, a) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = _e(e, n, s), r = _e(n, o, s), l = _e(o, t, s), d = _e(i, r, s), u = _e(r, l, s);
  return _e(d, u, s);
}
const $l = function(e, t) {
  return {
    x(s) {
      return e + e + t - s;
    },
    setWidth(s) {
      t = s;
    },
    textAlign(s) {
      return s === "center" ? s : s === "right" ? "left" : "right";
    },
    xPlus(s, a) {
      return s - a;
    },
    leftForLtr(s, a) {
      return s - a;
    }
  };
}, Ml = function() {
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
function Te(e, t, s) {
  return e ? $l(t, s) : Ml();
}
function Xo(e, t) {
  let s, a;
  (t === "ltr" || t === "rtl") && (s = e.canvas.style, a = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function Go(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Zo(e) {
  return e === "angle" ? {
    between: ts,
    compare: $r,
    normalize: It
  } : {
    between: se,
    compare: (t, s) => t - s,
    normalize: (t) => t
  };
}
function pn({ start: e, end: t, count: s, loop: a, style: n }) {
  return {
    start: e % s,
    end: t % s,
    loop: a && (t - e + 1) % s === 0,
    style: n
  };
}
function Sl(e, t, s) {
  const { property: a, start: n, end: o } = s, { between: i, normalize: r } = Zo(a), l = t.length;
  let { start: d, end: u, loop: h } = e, f, b;
  if (h) {
    for (d += l, u += l, f = 0, b = l; f < b && i(r(t[d % l][a]), n, o); ++f)
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
function Qo(e, t, s) {
  if (!s)
    return [
      e
    ];
  const { property: a, start: n, end: o } = s, i = t.length, { compare: r, between: l, normalize: d } = Zo(a), { start: u, end: h, loop: f, style: b } = Sl(e, t, s), p = [];
  let _ = !1, m = null, g, v, $;
  const k = () => l(n, $, g) && r(n, $) !== 0, w = () => r(o, g) === 0 || l(o, $, g), S = () => _ || k(), C = () => !_ || w();
  for (let A = u, P = u; A <= h; ++A)
    v = t[A % i], !v.skip && (g = d(v[a]), g !== $ && (_ = l(g, n, o), m === null && S() && (m = r(g, n) === 0 ? A : P), m !== null && C() && (p.push(pn({
      start: m,
      end: A,
      loop: f,
      count: i,
      style: b
    })), m = null), P = A, $ = g));
  return m !== null && p.push(pn({
    start: m,
    end: h,
    loop: f,
    count: i,
    style: b
  })), p;
}
function Jo(e, t) {
  const s = [], a = e.segments;
  for (let n = 0; n < a.length; n++) {
    const o = Qo(a[n], e.points, t);
    o.length && s.push(...o);
  }
  return s;
}
function Cl(e, t, s, a) {
  let n = 0, o = t - 1;
  if (s && !a)
    for (; n < t && !e[n].skip; )
      n++;
  for (; n < t && e[n].skip; )
    n++;
  for (n %= t, s && (o += n); o > n && e[o % t].skip; )
    o--;
  return o %= t, {
    start: n,
    end: o
  };
}
function Dl(e, t, s, a) {
  const n = e.length, o = [];
  let i = t, r = e[t], l;
  for (l = t + 1; l <= s; ++l) {
    const d = e[l % n];
    d.skip || d.stop ? r.skip || (a = !1, o.push({
      start: t % n,
      end: (l - 1) % n,
      loop: a
    }), t = i = d.stop ? l : null) : (i = l, r.skip && (t = l)), r = d;
  }
  return i !== null && o.push({
    start: t % n,
    end: i % n,
    loop: a
  }), o;
}
function Al(e, t) {
  const s = e.points, a = e.options.spanGaps, n = s.length;
  if (!n)
    return [];
  const o = !!e._loop, { start: i, end: r } = Cl(s, n, o, a);
  if (a === !0)
    return bn(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], s, t);
  const l = r < i ? r + n : r, d = !!e._fullLoop && i === 0 && r === n - 1;
  return bn(e, Dl(s, i, l, d), s, t);
}
function bn(e, t, s, a) {
  return !a || !a.setContext || !s ? t : Tl(e, t, s, a);
}
function Tl(e, t, s, a) {
  const n = e._chart.getContext(), o = vn(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = s.length, d = [];
  let u = o, h = t[0].start, f = h;
  function b(p, _, m, g) {
    const v = r ? -1 : 1;
    if (p !== _) {
      for (p += l; s[p % l].skip; )
        p -= v;
      for (; s[_ % l].skip; )
        _ += v;
      p % l !== _ % l && (d.push({
        start: p % l,
        end: _ % l,
        loop: m,
        style: g
      }), u = g, h = _ % l);
    }
  }
  for (const p of t) {
    h = r ? h : p.start;
    let _ = s[h % l], m;
    for (f = h + 1; f <= p.end; f++) {
      const g = s[f % l];
      m = vn(a.setContext(Me(n, {
        type: "segment",
        p0: _,
        p1: g,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: i
      }))), Bl(m, u) && b(h, f - 1, p.loop, u), _ = g, u = m;
    }
    h < f - 1 && b(h, f - 1, p.loop, u);
  }
  return d;
}
function vn(e) {
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
function Bl(e, t) {
  if (!t)
    return !1;
  const s = [], a = function(n, o) {
    return Ba(o) ? (s.includes(o) || s.push(o), s.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function gs(e, t, s) {
  return e.options.clip ? e[s] : t[s];
}
function Ll(e, t) {
  const { xScale: s, yScale: a } = e;
  return s && a ? {
    left: gs(s, t, "left"),
    right: gs(s, t, "right"),
    top: gs(a, t, "top"),
    bottom: gs(a, t, "bottom")
  } : t;
}
function ti(e, t) {
  const s = t._clip;
  if (s.disabled)
    return !1;
  const a = Ll(t, e.chartArea);
  return {
    left: s.left === !1 ? 0 : a.left - (s.left === !0 ? 0 : s.left),
    right: s.right === !1 ? e.width : a.right + (s.right === !0 ? 0 : s.right),
    top: s.top === !1 ? 0 : a.top - (s.top === !0 ? 0 : s.top),
    bottom: s.bottom === !1 ? e.height : a.bottom + (s.bottom === !0 ? 0 : s.bottom)
  };
}
class Fl {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, s, a, n) {
    const o = s.listeners[n], i = s.duration;
    o.forEach((r) => r({
      chart: t,
      initial: s.initial,
      numSteps: i,
      currentStep: Math.min(a - s.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = zo.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let s = 0;
    this._charts.forEach((a, n) => {
      if (!a.running || !a.items.length)
        return;
      const o = a.items;
      let i = o.length - 1, r = !1, l;
      for (; i >= 0; --i)
        l = o[i], l._active ? (l._total > a.duration && (a.duration = l._total), l.tick(t), r = !0) : (o[i] = o[o.length - 1], o.pop());
      r && (n.draw(), this._notify(n, a, t, "progress")), o.length || (a.running = !1, this._notify(n, a, t, "complete"), a.initial = !1), s += o.length;
    }), this._lastDate = t, s === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const s = this._charts;
    let a = s.get(t);
    return a || (a = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, s.set(t, a)), a;
  }
  listen(t, s, a) {
    this._getAnims(t).listeners[s].push(a);
  }
  add(t, s) {
    !s || !s.length || this._getAnims(t).items.push(...s);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const s = this._charts.get(t);
    s && (s.running = !0, s.start = Date.now(), s.duration = s.items.reduce((a, n) => Math.max(a, n._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const s = this._charts.get(t);
    return !(!s || !s.running || !s.items.length);
  }
  stop(t) {
    const s = this._charts.get(t);
    if (!s || !s.items.length)
      return;
    const a = s.items;
    let n = a.length - 1;
    for (; n >= 0; --n)
      a[n].cancel();
    s.items = [], this._notify(t, s, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Qt = /* @__PURE__ */ new Fl();
const mn = "transparent", Pl = {
  boolean(e, t, s) {
    return s > 0.5 ? t : e;
  },
  color(e, t, s) {
    const a = rn(e || mn), n = a.valid && rn(t || mn);
    return n && n.valid ? n.mix(a, s).hexString() : t;
  },
  number(e, t, s) {
    return e + (t - e) * s;
  }
};
class El {
  constructor(t, s, a, n) {
    const o = s[a];
    n = hs([
      t.to,
      n,
      o,
      t.from
    ]);
    const i = hs([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || Pl[t.type || typeof i], this._easing = Ke[t.easing] || Ke.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = s, this._prop = a, this._from = i, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, s, a) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = hs([
        t.to,
        s,
        n,
        t.from
      ]), this._from = hs([
        t.from,
        n,
        s
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const s = t - this._start, a = this._duration, n = this._prop, o = this._from, i = this._loop, r = this._to;
    let l;
    if (this._active = o !== r && (i || s < a), !this._active) {
      this._target[n] = r, this._notify(!0);
      return;
    }
    if (s < 0) {
      this._target[n] = o;
      return;
    }
    l = s / a % 2, l = i && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(o, r, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((s, a) => {
      t.push({
        res: s,
        rej: a
      });
    });
  }
  _notify(t) {
    const s = t ? "res" : "rej", a = this._promises || [];
    for (let n = 0; n < a.length; n++)
      a[n][s]();
  }
}
class ei {
  constructor(t, s) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(t) {
    if (!it(t))
      return;
    const s = Object.keys(kt.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!it(o))
        return;
      const i = {};
      for (const r of s)
        i[r] = o[r];
      ($t(o.properties) && o.properties || [
        n
      ]).forEach((r) => {
        (r === n || !a.has(r)) && a.set(r, i);
      });
    });
  }
  _animateOptions(t, s) {
    const a = s.options, n = Ol(t, a);
    if (!n)
      return [];
    const o = this._createAnimations(n, a);
    return a.$shared && Rl(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), o;
  }
  _createAnimations(t, s) {
    const a = this._properties, n = [], o = t.$animations || (t.$animations = {}), i = Object.keys(s), r = Date.now();
    let l;
    for (l = i.length - 1; l >= 0; --l) {
      const d = i[l];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        n.push(...this._animateOptions(t, s));
        continue;
      }
      const u = s[d];
      let h = o[d];
      const f = a.get(d);
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
      o[d] = h = new El(f, t, d, u), n.push(h);
    }
    return n;
  }
  update(t, s) {
    if (this._properties.size === 0) {
      Object.assign(t, s);
      return;
    }
    const a = this._createAnimations(t, s);
    if (a.length)
      return Qt.add(this._chart, a), !0;
  }
}
function Rl(e, t) {
  const s = [], a = Object.keys(t);
  for (let n = 0; n < a.length; n++) {
    const o = e[a[n]];
    o && o.active() && s.push(o.wait());
  }
  return Promise.all(s);
}
function Ol(e, t) {
  if (!t)
    return;
  let s = e.options;
  if (!s) {
    e.options = t;
    return;
  }
  return s.$shared && (e.options = s = Object.assign({}, s, {
    $shared: !1,
    $animations: {}
  })), s;
}
function yn(e, t) {
  const s = e && e.options || {}, a = s.reverse, n = s.min === void 0 ? t : 0, o = s.max === void 0 ? t : 0;
  return {
    start: a ? o : n,
    end: a ? n : o
  };
}
function Il(e, t, s) {
  if (s === !1)
    return !1;
  const a = yn(e, s), n = yn(t, s);
  return {
    top: n.end,
    right: a.end,
    bottom: n.start,
    left: a.start
  };
}
function zl(e) {
  let t, s, a, n;
  return it(e) ? (t = e.top, s = e.right, a = e.bottom, n = e.left) : t = s = a = n = e, {
    top: t,
    right: s,
    bottom: a,
    left: n,
    disabled: e === !1
  };
}
function si(e, t) {
  const s = [], a = e._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = a.length; n < o; ++n)
    s.push(a[n].index);
  return s;
}
function _n(e, t, s, a = {}) {
  const n = e.keys, o = a.mode === "single";
  let i, r, l, d;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, r = n.length; i < r; ++i) {
    if (l = +n[i], l === s) {
      if (u = !0, a.all)
        continue;
      break;
    }
    d = e.values[l], Ft(d) && (o || t === 0 || Gt(t) === Gt(d)) && (t += d);
  }
  return !u && !a.all ? 0 : t;
}
function Vl(e, t) {
  const { iScale: s, vScale: a } = t, n = s.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, d, u;
  for (l = 0, d = i.length; l < d; ++l)
    u = i[l], r[l] = {
      [n]: u,
      [o]: e[u]
    };
  return r;
}
function Us(e, t) {
  const s = e && e.options.stacked;
  return s || s === void 0 && t.stack !== void 0;
}
function Nl(e, t, s) {
  return `${e.id}.${t.id}.${s.stack || s.type}`;
}
function Wl(e) {
  const { min: t, max: s, minDefined: a, maxDefined: n } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: n ? s : Number.POSITIVE_INFINITY
  };
}
function Hl(e, t, s) {
  const a = e[t] || (e[t] = {});
  return a[s] || (a[s] = {});
}
function xn(e, t, s, a) {
  for (const n of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[n.index];
    if (s && o > 0 || !s && o < 0)
      return n.index;
  }
  return null;
}
function kn(e, t) {
  const { chart: s, _cachedMeta: a } = e, n = s._stacks || (s._stacks = {}), { iScale: o, vScale: i, index: r } = a, l = o.axis, d = i.axis, u = Nl(o, i, a), h = t.length;
  let f;
  for (let b = 0; b < h; ++b) {
    const p = t[b], { [l]: _, [d]: m } = p, g = p._stacks || (p._stacks = {});
    f = g[d] = Hl(n, u, _), f[r] = m, f._top = xn(f, i, !0, a.type), f._bottom = xn(f, i, !1, a.type);
    const v = f._visualValues || (f._visualValues = {});
    v[r] = m;
  }
}
function Ks(e, t) {
  const s = e.scales;
  return Object.keys(s).filter((a) => s[a].axis === t).shift();
}
function jl(e, t) {
  return Me(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Yl(e, t, s) {
  return Me(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: s,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Ee(e, t) {
  const s = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[a] === void 0 || o[a][s] === void 0)
        return;
      delete o[a][s], o[a]._visualValues !== void 0 && o[a]._visualValues[s] !== void 0 && delete o[a]._visualValues[s];
    }
  }
}
const Xs = (e) => e === "reset" || e === "none", wn = (e, t) => t ? e : Object.assign({}, e), ql = (e, t, s) => e && !t.hidden && t._stacked && {
  keys: si(s, !0),
  values: null
};
class Os {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, s) {
    this.chart = t, this._ctx = t.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Us(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Ee(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, s = this._cachedMeta, a = this.getDataset(), n = (h, f, b, p) => h === "x" ? f : h === "r" ? p : b, o = s.xAxisID = ot(a.xAxisID, Ks(t, "x")), i = s.yAxisID = ot(a.yAxisID, Ks(t, "y")), r = s.rAxisID = ot(a.rAxisID, Ks(t, "r")), l = s.indexAxis, d = s.iAxisID = n(l, o, i, r), u = s.vAxisID = n(l, i, o, r);
    s.xScale = this.getScaleForId(o), s.yScale = this.getScaleForId(i), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(d), s.vScale = this.getScaleForId(u);
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
    const s = this._cachedMeta;
    return t === s.iScale ? s.vScale : s.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && an(this._data, this), t._stacked && Ee(t);
  }
  _dataCheck() {
    const t = this.getDataset(), s = t.data || (t.data = []), a = this._data;
    if (it(s)) {
      const n = this._cachedMeta;
      this._data = Vl(s, n);
    } else if (a !== s) {
      if (a) {
        an(a, this);
        const n = this._cachedMeta;
        Ee(n), n._parsed = [];
      }
      s && Object.isExtensible(s) && Dr(s, this), this._syncList = [], this._data = s;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const s = this._cachedMeta, a = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = s._stacked;
    s._stacked = Us(s.vScale, s), s.stack !== a.stack && (n = !0, Ee(s), s.stack = a.stack), this._resyncElements(t), (n || o !== s._stacked) && (kn(this, s._parsed), s._stacked = Us(s.vScale, s));
  }
  configure() {
    const t = this.chart.config, s = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), s, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, s) {
    const { _cachedMeta: a, _data: n } = this, { iScale: o, _stacked: i } = a, r = o.axis;
    let l = t === 0 && s === n.length ? !0 : a._sorted, d = t > 0 && a._parsed[t - 1], u, h, f;
    if (this._parsing === !1)
      a._parsed = n, a._sorted = !0, f = n;
    else {
      $t(n[t]) ? f = this.parseArrayData(a, n, t, s) : it(n[t]) ? f = this.parseObjectData(a, n, t, s) : f = this.parsePrimitiveData(a, n, t, s);
      const b = () => h[r] === null || d && h[r] < d[r];
      for (u = 0; u < s; ++u)
        a._parsed[u + t] = h = f[u], l && (b() && (l = !1), d = h);
      a._sorted = l;
    }
    i && kn(this, f);
  }
  parsePrimitiveData(t, s, a, n) {
    const { iScale: o, vScale: i } = t, r = o.axis, l = i.axis, d = o.getLabels(), u = o === i, h = new Array(n);
    let f, b, p;
    for (f = 0, b = n; f < b; ++f)
      p = f + a, h[f] = {
        [r]: u || o.parse(d[p], p),
        [l]: i.parse(s[p], p)
      };
    return h;
  }
  parseArrayData(t, s, a, n) {
    const { xScale: o, yScale: i } = t, r = new Array(n);
    let l, d, u, h;
    for (l = 0, d = n; l < d; ++l)
      u = l + a, h = s[u], r[l] = {
        x: o.parse(h[0], u),
        y: i.parse(h[1], u)
      };
    return r;
  }
  parseObjectData(t, s, a, n) {
    const { xScale: o, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = new Array(n);
    let u, h, f, b;
    for (u = 0, h = n; u < h; ++u)
      f = u + a, b = s[f], d[u] = {
        x: o.parse(we(b, r), f),
        y: i.parse(we(b, l), f)
      };
    return d;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, s, a) {
    const n = this.chart, o = this._cachedMeta, i = s[t.axis], r = {
      keys: si(n, !0),
      values: s._stacks[t.axis]._visualValues
    };
    return _n(r, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, s, a, n) {
    const o = a[s.axis];
    let i = o === null ? NaN : o;
    const r = n && a._stacks[s.axis];
    n && r && (n.values = r, i = _n(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, s) {
    const a = this._cachedMeta, n = a._parsed, o = a._sorted && t === a.iScale, i = n.length, r = this._getOtherScale(t), l = ql(s, a, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = Wl(r);
    let f, b;
    function p() {
      b = n[f];
      const _ = b[r.axis];
      return !Ft(b[t.axis]) || u > _ || h < _;
    }
    for (f = 0; f < i && !(!p() && (this.updateRangeFromParsed(d, t, b, l), o)); ++f)
      ;
    if (o) {
      for (f = i - 1; f >= 0; --f)
        if (!p()) {
          this.updateRangeFromParsed(d, t, b, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const s = this._cachedMeta._parsed, a = [];
    let n, o, i;
    for (n = 0, o = s.length; n < o; ++n)
      i = s[n][t.axis], Ft(i) && a.push(i);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = s.iScale, n = s.vScale, o = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(o[a.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const s = this._cachedMeta;
    this.update(t || "default"), s._clip = zl(ot(this.options.clip, Il(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, s = this.chart, a = this._cachedMeta, n = a.data || [], o = s.chartArea, i = [], r = this._drawStart || 0, l = this._drawCount || n.length - r, d = this.options.drawActiveElementsOnTop;
    let u;
    for (a.dataset && a.dataset.draw(t, o, r, l), u = r; u < r + l; ++u) {
      const h = n[u];
      h.hidden || (h.active && d ? i.push(h) : h.draw(t, o));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, o);
  }
  getStyle(t, s) {
    const a = s ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, s, a) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      o = i.$context || (i.$context = Yl(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = jl(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!s, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, t);
  }
  _resolveElementOptions(t, s = "default", a) {
    const n = s === "active", o = this._cachedDataOpts, i = t + "-" + s, r = o[i], l = this.enableOptionSharing && Qe(a);
    if (r)
      return wn(r, l);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = d.getOptionScopes(this.getDataset(), u), b = Object.keys(kt.elements[t]), p = () => this.getContext(a, n, s), _ = d.resolveNamedOptions(f, b, p, h);
    return _.$shared && (_.$shared = l, o[i] = Object.freeze(wn(_, l))), _;
  }
  _resolveAnimations(t, s, a) {
    const n = this.chart, o = this._cachedDataOpts, i = `animation-${s}`, r = o[i];
    if (r)
      return r;
    let l;
    if (n.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, s), f = u.getOptionScopes(this.getDataset(), h);
      l = u.createResolver(f, this.getContext(t, a, s));
    }
    const d = new ei(n, l && l.animations);
    return l && l._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, s) {
    return !s || Xs(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, s) {
    const a = this.resolveDataElementOptions(t, s), n = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(s, o) || o !== n;
    return this.updateSharedOptions(o, s, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, s, a, n) {
    Xs(n) ? Object.assign(t, a) : this._resolveAnimations(s, n).update(t, a);
  }
  updateSharedOptions(t, s, a) {
    t && !Xs(s) && this._resolveAnimations(void 0, s).update(t, a);
  }
  _setStyle(t, s, a, n) {
    t.active = n;
    const o = this.getStyle(s, n);
    this._resolveAnimations(s, a, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, s, a) {
    this._setStyle(t, a, "active", !1);
  }
  setHoverStyle(t, s, a) {
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
    const s = this._data, a = this._cachedMeta.data;
    for (const [r, l, d] of this._syncList)
      this[r](l, d);
    this._syncList = [];
    const n = a.length, o = s.length, i = Math.min(o, n);
    i && this.parse(0, i), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, s, a = !0) {
    const n = this._cachedMeta, o = n.data, i = t + s;
    let r;
    const l = (d) => {
      for (d.length += s, r = d.length - 1; r >= i; r--)
        d[r] = d[r - s];
    };
    for (l(o), r = t; r < i; ++r)
      o[r] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, s), a && this.updateElements(o, t, s, "reset");
  }
  updateElements(t, s, a, n) {
  }
  _removeElements(t, s) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const n = a._parsed.splice(t, s);
      a._stacked && Ee(a, n);
    }
    a.data.splice(t, s);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [s, a, n] = t;
      this[s](a, n);
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
  _onDataSplice(t, s) {
    s && this._sync([
      "_removeElements",
      t,
      s
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
function Ul(e, t) {
  if (!e._cache.$bar) {
    const s = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let n = 0, o = s.length; n < o; n++)
      a = a.concat(s[n].controller.getAllParsedValues(e));
    e._cache.$bar = Io(a.sort((n, o) => n - o));
  }
  return e._cache.$bar;
}
function Kl(e) {
  const t = e.iScale, s = Ul(t, e.type);
  let a = t._length, n, o, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (Qe(r) && (a = Math.min(a, Math.abs(i - r) || a)), r = i);
  };
  for (n = 0, o = s.length; n < o; ++n)
    i = t.getPixelForValue(s[n]), l();
  for (r = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    i = t.getPixelForTick(n), l();
  return a;
}
function Xl(e, t, s, a) {
  const n = s.barThickness;
  let o, i;
  return ft(n) ? (o = t.min * s.categoryPercentage, i = s.barPercentage) : (o = n * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function Gl(e, t, s, a) {
  const n = t.pixels, o = n[e];
  let i = e > 0 ? n[e - 1] : null, r = e < n.length - 1 ? n[e + 1] : null;
  const l = s.categoryPercentage;
  i === null && (i = o - (r === null ? t.end - t.start : r - o)), r === null && (r = o + o - i);
  const d = o - (o - Math.min(i, r)) / 2 * l;
  return {
    chunk: Math.abs(r - i) / 2 * l / a,
    ratio: s.barPercentage,
    start: d
  };
}
function Zl(e, t, s, a) {
  const n = s.parse(e[0], a), o = s.parse(e[1], a), i = Math.min(n, o), r = Math.max(n, o);
  let l = i, d = r;
  Math.abs(i) > Math.abs(r) && (l = r, d = i), t[s.axis] = d, t._custom = {
    barStart: l,
    barEnd: d,
    start: n,
    end: o,
    min: i,
    max: r
  };
}
function ai(e, t, s, a) {
  return $t(e) ? Zl(e, t, s, a) : t[s.axis] = s.parse(e, a), t;
}
function $n(e, t, s, a) {
  const n = e.iScale, o = e.vScale, i = n.getLabels(), r = n === o, l = [];
  let d, u, h, f;
  for (d = s, u = s + a; d < u; ++d)
    f = t[d], h = {}, h[n.axis] = r || n.parse(i[d], d), l.push(ai(f, h, o, d));
  return l;
}
function Gs(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Ql(e, t, s) {
  return e !== 0 ? Gt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= s ? 1 : -1);
}
function Jl(e) {
  let t, s, a, n, o;
  return e.horizontal ? (t = e.base > e.x, s = "left", a = "right") : (t = e.base < e.y, s = "bottom", a = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: s,
    end: a,
    reverse: t,
    top: n,
    bottom: o
  };
}
function tc(e, t, s, a) {
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
  const { start: i, end: r, reverse: l, top: d, bottom: u } = Jl(e);
  n === "middle" && s && (e.enableBorderRadius = !0, (s._top || 0) === a ? n = d : (s._bottom || 0) === a ? n = u : (o[Mn(u, i, r, l)] = !0, n = d)), o[Mn(n, i, r, l)] = !0, e.borderSkipped = o;
}
function Mn(e, t, s, a) {
  return a ? (e = ec(e, t, s), e = Sn(e, s, t)) : e = Sn(e, t, s), e;
}
function ec(e, t, s) {
  return e === t ? s : e === s ? t : e;
}
function Sn(e, t, s) {
  return e === "start" ? t : e === "end" ? s : e;
}
function sc(e, { inflateAmount: t }, s) {
  e.inflateAmount = t === "auto" ? s === 1 ? 0.33 : 0 : t;
}
class ac extends Os {
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
  parsePrimitiveData(t, s, a, n) {
    return $n(t, s, a, n);
  }
  parseArrayData(t, s, a, n) {
    return $n(t, s, a, n);
  }
  parseObjectData(t, s, a, n) {
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = o.axis === "x" ? r : l, u = i.axis === "x" ? r : l, h = [];
    let f, b, p, _;
    for (f = a, b = a + n; f < b; ++f)
      _ = s[f], p = {}, p[o.axis] = o.parse(we(_, d), f), h.push(ai(we(_, u), p, i, f));
    return h;
  }
  updateRangeFromParsed(t, s, a, n) {
    super.updateRangeFromParsed(t, s, a, n);
    const o = a._custom;
    o && s === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, { iScale: a, vScale: n } = s, o = this.getParsed(t), i = o._custom, r = Gs(i) ? "[" + i.start + ", " + i.end + "]" : "" + n.getLabelForValue(o[n.axis]);
    return {
      label: "" + a.getLabelForValue(o[a.axis]),
      value: r
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const s = this._cachedMeta;
    this.updateElements(s.data, 0, s.data.length, t);
  }
  updateElements(t, s, a, n) {
    const o = n === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: f } = this._getSharedOptions(s, n);
    for (let b = s; b < s + a; b++) {
      const p = this.getParsed(b), _ = o || ft(p[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(b), m = this._calculateBarIndexPixels(b, u), g = (p._stacks || {})[r.axis], v = {
        horizontal: d,
        base: _.base,
        enableBorderRadius: !g || Gs(p._custom) || i === g._top || i === g._bottom,
        x: d ? _.head : m.center,
        y: d ? m.center : _.head,
        height: d ? m.size : Math.abs(_.size),
        width: d ? Math.abs(_.size) : m.size
      };
      f && (v.options = h || this.resolveDataElementOptions(b, t[b].active ? "active" : n));
      const $ = v.options || t[b].options;
      tc(v, $, g, i), sc(v, $, u.ratio), this.updateElement(t[b], b, v, n);
    }
  }
  _getStacks(t, s) {
    const { iScale: a } = this._cachedMeta, n = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = a.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[a.axis], d = (u) => {
      const h = u._parsed.find((b) => b[a.axis] === l), f = h && h[u.vScale.axis];
      if (ft(f) || isNaN(f))
        return !0;
    };
    for (const u of n)
      if (!(s !== void 0 && d(u)) && ((o === !1 || i.indexOf(u.stack) === -1 || o === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
    const t = this.chart.scales, s = this.chart.options.indexAxis;
    return Object.keys(t).filter((a) => t[a].axis === s).shift();
  }
  _getAxis() {
    const t = {}, s = this.getFirstScaleIdForIndexAxis();
    for (const a of this.chart.data.datasets)
      t[ot(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, s)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, s, a) {
    const n = this._getStacks(t, a), o = s !== void 0 ? n.indexOf(s) : -1;
    return o === -1 ? n.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, s = this._cachedMeta, a = s.iScale, n = [];
    let o, i;
    for (o = 0, i = s.data.length; o < i; ++o)
      n.push(a.getPixelForValue(this.getParsed(o)[a.axis], o));
    const r = t.barThickness;
    return {
      min: r || Kl(s),
      pixels: n,
      start: a._startPixel,
      end: a._endPixel,
      stackCount: this._getStackCount(),
      scale: a,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: s, _stacked: a, index: n }, options: { base: o, minBarLength: i } } = this, r = o || 0, l = this.getParsed(t), d = l._custom, u = Gs(d);
    let h = l[s.axis], f = 0, b = a ? this.applyStack(s, l, a) : h, p, _;
    b !== h && (f = b - h, b = h), u && (h = d.barStart, b = d.barEnd - d.barStart, h !== 0 && Gt(h) !== Gt(d.barEnd) && (f = 0), f += h);
    const m = !ft(o) && !u ? o : f;
    let g = s.getPixelForValue(m);
    if (this.chart.getDataVisibility(t) ? p = s.getPixelForValue(f + b) : p = g, _ = p - g, Math.abs(_) < i) {
      _ = Ql(_, s, r) * i, h === r && (g -= _ / 2);
      const v = s.getPixelForDecimal(0), $ = s.getPixelForDecimal(1), k = Math.min(v, $), w = Math.max(v, $);
      g = Math.max(Math.min(g, w), k), p = g + _, a && !u && (l._stacks[s.axis]._visualValues[n] = s.getValueForPixel(p) - s.getValueForPixel(g));
    }
    if (g === s.getPixelForValue(r)) {
      const v = Gt(_) * s.getLineWidthForValue(r) / 2;
      g += v, _ -= v;
    }
    return {
      size: _,
      base: g,
      head: p,
      center: p + _ / 2
    };
  }
  _calculateBarIndexPixels(t, s) {
    const a = s.scale, n = this.options, o = n.skipNull, i = ot(n.maxBarThickness, 1 / 0);
    let r, l;
    const d = this._getAxisCount();
    if (s.grouped) {
      const u = o ? this._getStackCount(t) : s.stackCount, h = n.barThickness === "flex" ? Gl(t, s, n, u * d) : Xl(t, s, n, u * d), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, b = this._getAxis().indexOf(ot(f, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + b;
      r = h.start + h.chunk * p + h.chunk / 2, l = Math.min(i, h.chunk * h.ratio);
    } else
      r = a.getPixelForValue(this.getParsed(t)[a.axis], t), l = Math.min(i, s.min * s.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, s = t.vScale, a = t.data, n = a.length;
    let o = 0;
    for (; o < n; ++o)
      this.getParsed(o)[s.axis] !== null && !a[o].hidden && a[o].draw(this._ctx);
  }
}
function nc(e, t, s) {
  let a = 1, n = 1, o = 0, i = 0;
  if (t < mt) {
    const r = e, l = r + t, d = Math.cos(r), u = Math.sin(r), h = Math.cos(l), f = Math.sin(l), b = ($, k, w) => ts($, r, l, !0) ? 1 : Math.max(k, k * s, w, w * s), p = ($, k, w) => ts($, r, l, !0) ? -1 : Math.min(k, k * s, w, w * s), _ = b(0, d, h), m = b(Mt, u, f), g = p(pt, d, h), v = p(pt + Mt, u, f);
    a = (_ - g) / 2, n = (m - v) / 2, o = -(_ + g) / 2, i = -(m + v) / 2;
  }
  return {
    ratioX: a,
    ratioY: n,
    offsetX: o,
    offsetY: i
  };
}
class oc extends Os {
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
            const s = t.data, { labels: { pointStyle: a, textAlign: n, color: o, useBorderRadius: i, borderRadius: r } } = t.legend.options;
            return s.labels.length && s.datasets.length ? s.labels.map((l, d) => {
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
                pointStyle: a,
                borderRadius: i && (r || h.borderRadius),
                index: d
              };
            }) : [];
          }
        },
        onClick(t, s, a) {
          a.chart.toggleDataVisibility(s.index), a.chart.update();
        }
      }
    }
  };
  constructor(t, s) {
    super(t, s), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, s) {
    const a = this.getDataset().data, n = this._cachedMeta;
    if (this._parsing === !1)
      n._parsed = a;
    else {
      let o = (l) => +a[l];
      if (it(a[t])) {
        const { key: l = "value" } = this._parsing;
        o = (d) => +we(a[d], l);
      }
      let i, r;
      for (i = t, r = t + s; i < r; ++i)
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
    let t = mt, s = -mt;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const n = this.chart.getDatasetMeta(a).controller, o = n._getRotation(), i = n._getCircumference();
        t = Math.min(t, o), s = Math.max(s, o + i);
      }
    return {
      rotation: t,
      circumference: s - t
    };
  }
  update(t) {
    const s = this.chart, { chartArea: a } = s, n = this._cachedMeta, o = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(a.width, a.height) - i) / 2, 0), l = Math.min(ur(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: b, offsetX: p, offsetY: _ } = nc(h, u, l), m = (a.width - i) / f, g = (a.height - i) / b, v = Math.max(Math.min(m, g) / 2, 0), $ = Fo(this.options.radius, v), k = Math.max($ * l, 0), w = ($ - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * $, this.offsetY = _ * $, n.total = this.calculateTotal(), this.outerRadius = $ - w * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - w * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, s) {
    const a = this.options, n = this._cachedMeta, o = this._getCircumference();
    return s && a.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / mt);
  }
  updateElements(t, s, a, n) {
    const o = n === "reset", i = this.chart, r = i.chartArea, d = i.options.animation, u = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, f = o && d.animateScale, b = f ? 0 : this.innerRadius, p = f ? 0 : this.outerRadius, { sharedOptions: _, includeOptions: m } = this._getSharedOptions(s, n);
    let g = this._getRotation(), v;
    for (v = 0; v < s; ++v)
      g += this._circumference(v, o);
    for (v = s; v < s + a; ++v) {
      const $ = this._circumference(v, o), k = t[v], w = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: g,
        endAngle: g + $,
        circumference: $,
        outerRadius: p,
        innerRadius: b
      };
      m && (w.options = _ || this.resolveDataElementOptions(v, k.active ? "active" : n)), g += $, this.updateElement(k, v, w, n);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, s = t.data;
    let a = 0, n;
    for (n = 0; n < s.length; n++) {
      const o = t._parsed[n];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(n) && !s[n].hidden && (a += Math.abs(o));
    }
    return a;
  }
  calculateCircumference(t) {
    const s = this._cachedMeta.total;
    return s > 0 && !isNaN(t) ? mt * (Math.abs(t) / s) : 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = this.chart, n = a.data.labels || [], o = La(s._parsed[t], a.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let s = 0;
    const a = this.chart;
    let n, o, i, r, l;
    if (!t) {
      for (n = 0, o = a.data.datasets.length; n < o; ++n)
        if (a.isDatasetVisible(n)) {
          i = a.getDatasetMeta(n), t = i.data, r = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, o = t.length; n < o; ++n)
      l = r.resolveDataElementOptions(n), l.borderAlign !== "inner" && (s = Math.max(s, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return s;
  }
  getMaxOffset(t) {
    let s = 0;
    for (let a = 0, n = t.length; a < n; ++a) {
      const o = this.resolveDataElementOptions(a);
      s = Math.max(s, o.offset || 0, o.hoverOffset || 0);
    }
    return s;
  }
  _getRingWeightOffset(t) {
    let s = 0;
    for (let a = 0; a < t; ++a)
      this.chart.isDatasetVisible(a) && (s += this._getRingWeight(a));
    return s;
  }
  _getRingWeight(t) {
    return Math.max(ot(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class ic extends Os {
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
    const s = this._cachedMeta, { dataset: a, data: n = [], _dataset: o } = s, i = this.chart._animationsDisabled;
    let { start: r, count: l } = Br(s, n, i);
    this._drawStart = r, this._drawCount = l, Lr(s) && (r = 0, l = n.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(n, r, l, t);
  }
  updateElements(t, s, a, n) {
    const o = n === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(s, n), f = i.axis, b = r.axis, { spanGaps: p, segment: _ } = this.options, m = Je(p) ? p : Number.POSITIVE_INFINITY, g = this.chart._animationsDisabled || o || n === "none", v = s + a, $ = t.length;
    let k = s > 0 && this.getParsed(s - 1);
    for (let w = 0; w < $; ++w) {
      const S = t[w], C = g ? S : {};
      if (w < s || w >= v) {
        C.skip = !0;
        continue;
      }
      const A = this.getParsed(w), P = ft(A[b]), E = C[f] = i.getPixelForValue(A[f], w), R = C[b] = o || P ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, A, l) : A[b], w);
      C.skip = isNaN(E) || isNaN(R) || P, C.stop = w > 0 && Math.abs(A[f] - k[f]) > m, _ && (C.parsed = A, C.raw = d.data[w]), h && (C.options = u || this.resolveDataElementOptions(w, S.active ? "active" : n)), g || this.updateElement(S, w, C, n), k = A;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, s = t.dataset, a = s.options && s.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return a;
    const o = n[0].size(this.resolveDataElementOptions(0)), i = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(a, o, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class rc extends oc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function ve() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class za {
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
    Object.assign(za.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ve();
  }
  parse() {
    return ve();
  }
  format() {
    return ve();
  }
  add() {
    return ve();
  }
  diff() {
    return ve();
  }
  startOf() {
    return ve();
  }
  endOf() {
    return ve();
  }
}
var lc = {
  _date: za
};
function cc(e, t, s, a) {
  const { controller: n, data: o, _sorted: i } = e, r = n._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && o.length) {
    const d = r._reversePixels ? Sr : xe;
    if (a) {
      if (n._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const f = d(o, t, s - h), b = d(o, t, s + h);
          return {
            lo: f.lo,
            hi: b.hi
          };
        }
      }
    } else {
      const u = d(o, t, s);
      if (l) {
        const { vScale: h } = n._cachedMeta, { _parsed: f } = e, b = f.slice(0, u.lo + 1).reverse().findIndex((_) => !ft(_[h.axis]));
        u.lo -= Math.max(0, b);
        const p = f.slice(u.hi).findIndex((_) => !ft(_[h.axis]));
        u.hi += Math.max(0, p);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Is(e, t, s, a, n) {
  const o = e.getSortedVisibleDatasetMetas(), i = s[t];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: d, data: u } = o[r], { lo: h, hi: f } = cc(o[r], t, i, n);
    for (let b = h; b <= f; ++b) {
      const p = u[b];
      p.skip || a(p, d, b);
    }
  }
}
function dc(e) {
  const t = e.indexOf("x") !== -1, s = e.indexOf("y") !== -1;
  return function(a, n) {
    const o = t ? Math.abs(a.x - n.x) : 0, i = s ? Math.abs(a.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function Zs(e, t, s, a, n) {
  const o = [];
  return !n && !e.isPointInArea(t) || Is(e, s, t, function(r, l, d) {
    !n && !es(r, e.chartArea, 0) || r.inRange(t.x, t.y, a) && o.push({
      element: r,
      datasetIndex: l,
      index: d
    });
  }, !0), o;
}
function uc(e, t, s, a) {
  let n = [];
  function o(i, r, l) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Ro(i, {
      x: t.x,
      y: t.y
    });
    ts(h, d, u) && n.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return Is(e, s, t, o), n;
}
function hc(e, t, s, a, n, o) {
  let i = [];
  const r = dc(s);
  let l = Number.POSITIVE_INFINITY;
  function d(u, h, f) {
    const b = u.inRange(t.x, t.y, n);
    if (a && !b)
      return;
    const p = u.getCenterPoint(n);
    if (!(!!o || e.isPointInArea(p)) && !b)
      return;
    const m = r(t, p);
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
  return Is(e, s, t, d), i;
}
function Qs(e, t, s, a, n, o) {
  return !o && !e.isPointInArea(t) ? [] : s === "r" && !a ? uc(e, t, s, n) : hc(e, t, s, a, n, o);
}
function Cn(e, t, s, a, n) {
  const o = [], i = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Is(e, s, t, (l, d, u) => {
    l[i] && l[i](t[s], n) && (o.push({
      element: l,
      datasetIndex: d,
      index: u
    }), r = r || l.inRange(t.x, t.y, n));
  }), a && !r ? [] : o;
}
var fc = {
  modes: {
    index(e, t, s, a) {
      const n = ye(t, e), o = s.axis || "x", i = s.includeInvisible || !1, r = s.intersect ? Zs(e, n, o, a, i) : Qs(e, n, o, !1, a, i), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const u = r[0].index, h = d.data[u];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: d.index,
          index: u
        });
      }), l) : [];
    },
    dataset(e, t, s, a) {
      const n = ye(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      let r = s.intersect ? Zs(e, n, o, a, i) : Qs(e, n, o, !1, a, i);
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
    point(e, t, s, a) {
      const n = ye(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      return Zs(e, n, o, a, i);
    },
    nearest(e, t, s, a) {
      const n = ye(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      return Qs(e, n, o, s.intersect, a, i);
    },
    x(e, t, s, a) {
      const n = ye(t, e);
      return Cn(e, n, "x", s.intersect, a);
    },
    y(e, t, s, a) {
      const n = ye(t, e);
      return Cn(e, n, "y", s.intersect, a);
    }
  }
};
const ni = [
  "left",
  "top",
  "right",
  "bottom"
];
function Re(e, t) {
  return e.filter((s) => s.pos === t);
}
function Dn(e, t) {
  return e.filter((s) => ni.indexOf(s.pos) === -1 && s.box.axis === t);
}
function Oe(e, t) {
  return e.sort((s, a) => {
    const n = t ? a : s, o = t ? s : a;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function gc(e) {
  const t = [];
  let s, a, n, o, i, r;
  for (s = 0, a = (e || []).length; s < a; ++s)
    n = e[s], { position: o, options: { stack: i, stackWeight: r = 1 } } = n, t.push({
      index: s,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: i && o + i,
      stackWeight: r
    });
  return t;
}
function pc(e) {
  const t = {};
  for (const s of e) {
    const { stack: a, pos: n, stackWeight: o } = s;
    if (!a || !ni.includes(n))
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
function bc(e, t) {
  const s = pc(e), { vBoxMaxWidth: a, hBoxMaxHeight: n } = t;
  let o, i, r;
  for (o = 0, i = e.length; o < i; ++o) {
    r = e[o];
    const { fullSize: l } = r.box, d = s[r.stack], u = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = u ? u * a : l && t.availableWidth, r.height = n) : (r.width = a, r.height = u ? u * n : l && t.availableHeight);
  }
  return s;
}
function vc(e) {
  const t = gc(e), s = Oe(t.filter((d) => d.box.fullSize), !0), a = Oe(Re(t, "left"), !0), n = Oe(Re(t, "right")), o = Oe(Re(t, "top"), !0), i = Oe(Re(t, "bottom")), r = Dn(t, "x"), l = Dn(t, "y");
  return {
    fullSize: s,
    leftAndTop: a.concat(o),
    rightAndBottom: n.concat(l).concat(i).concat(r),
    chartArea: Re(t, "chartArea"),
    vertical: a.concat(n).concat(l),
    horizontal: o.concat(i).concat(r)
  };
}
function An(e, t, s, a) {
  return Math.max(e[s], t[s]) + Math.max(e[a], t[a]);
}
function oi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function mc(e, t, s, a) {
  const { pos: n, box: o } = s, i = e.maxPadding;
  if (!it(n)) {
    s.size && (e[n] -= s.size);
    const h = a[s.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, s.horizontal ? o.height : o.width), s.size = h.size / h.count, e[n] += s.size;
  }
  o.getPadding && oi(i, o.getPadding());
  const r = Math.max(0, t.outerWidth - An(i, e, "left", "right")), l = Math.max(0, t.outerHeight - An(i, e, "top", "bottom")), d = r !== e.w, u = l !== e.h;
  return e.w = r, e.h = l, s.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function yc(e) {
  const t = e.maxPadding;
  function s(a) {
    const n = Math.max(t[a] - e[a], 0);
    return e[a] += n, n;
  }
  e.y += s("top"), e.x += s("left"), s("right"), s("bottom");
}
function _c(e, t) {
  const s = t.maxPadding;
  function a(n) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((i) => {
      o[i] = Math.max(t[i], s[i]);
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
function He(e, t, s, a) {
  const n = [];
  let o, i, r, l, d, u;
  for (o = 0, i = e.length, d = 0; o < i; ++o) {
    r = e[o], l = r.box, l.update(r.width || t.w, r.height || t.h, _c(r.horizontal, t));
    const { same: h, other: f } = mc(t, s, r, a);
    d |= h && n.length, u = u || f, l.fullSize || n.push(r);
  }
  return d && He(n, t, s, a) || u;
}
function ps(e, t, s, a, n) {
  e.top = s, e.left = t, e.right = t + a, e.bottom = s + n, e.width = a, e.height = n;
}
function Tn(e, t, s, a) {
  const n = s.padding;
  let { x: o, y: i } = t;
  for (const r of e) {
    const l = r.box, d = a[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const h = t.w * u, f = d.size || l.height;
      Qe(d.start) && (i = d.start), l.fullSize ? ps(l, n.left, i, s.outerWidth - n.right - n.left, f) : ps(l, t.left + d.placed, i, h, f), d.start = i, d.placed += h, i = l.bottom;
    } else {
      const h = t.h * u, f = d.size || l.width;
      Qe(d.start) && (o = d.start), l.fullSize ? ps(l, o, n.top, f, s.outerHeight - n.bottom - n.top) : ps(l, o, t.top + d.placed, f, h), d.start = o, d.placed += h, o = l.right;
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
          draw(s) {
            t.draw(s);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const s = e.boxes ? e.boxes.indexOf(t) : -1;
    s !== -1 && e.boxes.splice(s, 1);
  },
  configure(e, t, s) {
    t.fullSize = s.fullSize, t.position = s.position, t.weight = s.weight;
  },
  update(e, t, s, a) {
    if (!e)
      return;
    const n = Yt(e.options.layout.padding), o = Math.max(t - n.width, 0), i = Math.max(s - n.height, 0), r = vc(e.boxes), l = r.vertical, d = r.horizontal;
    gt(e.boxes, (_) => {
      typeof _.beforeLayout == "function" && _.beforeLayout();
    });
    const u = l.reduce((_, m) => m.box.options && m.box.options.display === !1 ? _ : _ + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: s,
      padding: n,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), f = Object.assign({}, n);
    oi(f, Yt(a));
    const b = Object.assign({
      maxPadding: f,
      w: o,
      h: i,
      x: n.left,
      y: n.top
    }, n), p = bc(l.concat(d), h);
    He(r.fullSize, b, h, p), He(l, b, h, p), He(d, b, h, p) && He(l, b, h, p), yc(b), Tn(r.leftAndTop, b, h, p), b.x += b.w, b.y += b.h, Tn(r.rightAndBottom, b, h, p), e.chartArea = {
      left: b.left,
      top: b.top,
      right: b.left + b.w,
      bottom: b.top + b.h,
      height: b.h,
      width: b.w
    }, gt(r.chartArea, (_) => {
      const m = _.box;
      Object.assign(m, e.chartArea), m.update(b.w, b.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class ii {
  acquireContext(t, s) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, s, a) {
  }
  removeEventListener(t, s, a) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, s, a, n) {
    return s = Math.max(0, s || t.width), a = a || t.height, {
      width: s,
      height: Math.max(0, n ? Math.floor(s / n) : a)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class xc extends ii {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const ks = "$chartjs", kc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Bn = (e) => e === null || e === "";
function wc(e, t) {
  const s = e.style, a = e.getAttribute("height"), n = e.getAttribute("width");
  if (e[ks] = {
    initial: {
      height: a,
      width: n,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", Bn(n)) {
    const o = gn(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (Bn(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = gn(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const ri = xl ? {
  passive: !0
} : !1;
function $c(e, t, s) {
  e && e.addEventListener(t, s, ri);
}
function Mc(e, t, s) {
  e && e.canvas && e.canvas.removeEventListener(t, s, ri);
}
function Sc(e, t) {
  const s = kc[e.type] || e.type, { x: a, y: n } = ye(e, t);
  return {
    type: s,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: n !== void 0 ? n : null
  };
}
function Ls(e, t) {
  for (const s of e)
    if (s === t || s.contains(t))
      return !0;
}
function Cc(e, t, s) {
  const a = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Ls(r.addedNodes, a), i = i && !Ls(r.removedNodes, a);
    i && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function Dc(e, t, s) {
  const a = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Ls(r.removedNodes, a), i = i && !Ls(r.addedNodes, a);
    i && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const as = /* @__PURE__ */ new Map();
let Ln = 0;
function li() {
  const e = window.devicePixelRatio;
  e !== Ln && (Ln = e, as.forEach((t, s) => {
    s.currentDevicePixelRatio !== e && t();
  }));
}
function Ac(e, t) {
  as.size || window.addEventListener("resize", li), as.set(e, t);
}
function Tc(e) {
  as.delete(e), as.size || window.removeEventListener("resize", li);
}
function Bc(e, t, s) {
  const a = e.canvas, n = a && Ia(a);
  if (!n)
    return;
  const o = Vo((r, l) => {
    const d = n.clientWidth;
    s(r, l), d < n.clientWidth && s();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], d = l.contentRect.width, u = l.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(n), Ac(e, o), i;
}
function Js(e, t, s) {
  s && s.disconnect(), t === "resize" && Tc(e);
}
function Lc(e, t, s) {
  const a = e.canvas, n = Vo((o) => {
    e.ctx !== null && s(Sc(o, e));
  }, e);
  return $c(a, t, n), n;
}
class Fc extends ii {
  acquireContext(t, s) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (wc(t, s), a) : null;
  }
  releaseContext(t) {
    const s = t.canvas;
    if (!s[ks])
      return !1;
    const a = s[ks].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      ft(i) ? s.removeAttribute(o) : s.setAttribute(o, i);
    });
    const n = a.style || {};
    return Object.keys(n).forEach((o) => {
      s.style[o] = n[o];
    }), s.width = s.width, delete s[ks], !0;
  }
  addEventListener(t, s, a) {
    this.removeEventListener(t, s);
    const n = t.$proxies || (t.$proxies = {}), i = {
      attach: Cc,
      detach: Dc,
      resize: Bc
    }[s] || Lc;
    n[s] = i(t, s, a);
  }
  removeEventListener(t, s) {
    const a = t.$proxies || (t.$proxies = {}), n = a[s];
    if (!n)
      return;
    ({
      attach: Js,
      detach: Js,
      resize: Js
    }[s] || Mc)(t, s, n), a[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, s, a, n) {
    return _l(t, s, a, n);
  }
  isAttached(t) {
    const s = t && Ia(t);
    return !!(s && s.isConnected);
  }
}
function Pc(e) {
  return !Oa() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? xc : Fc;
}
let ne = class {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: s, y: a } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: s,
      y: a
    };
  }
  hasValue() {
    return Je(this.x) && Je(this.y);
  }
  getProps(t, s) {
    const a = this.$animations;
    if (!s || !a)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = a[o] && a[o].active() ? a[o]._to : this[o];
    }), n;
  }
};
function Ec(e, t) {
  const s = e.options.ticks, a = Rc(e), n = Math.min(s.maxTicksLimit || a, a), o = s.major.enabled ? Ic(t) : [], i = o.length, r = o[0], l = o[i - 1], d = [];
  if (i > n)
    return zc(t, d, o, i / n), d;
  const u = Oc(o, t, n);
  if (i > 0) {
    let h, f;
    const b = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (bs(t, d, u, ft(b) ? 0 : r - b, r), h = 0, f = i - 1; h < f; h++)
      bs(t, d, u, o[h], o[h + 1]);
    return bs(t, d, u, l, ft(b) ? t.length : l + b), d;
  }
  return bs(t, d, u), d;
}
function Rc(e) {
  const t = e.options.offset, s = e._tickSize(), a = e._length / s + (t ? 0 : 1), n = e._maxLength / s;
  return Math.floor(Math.min(a, n));
}
function Oc(e, t, s) {
  const a = Vc(e), n = t.length / s;
  if (!a)
    return Math.max(n, 1);
  const o = yr(a);
  for (let i = 0, r = o.length - 1; i < r; i++) {
    const l = o[i];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function Ic(e) {
  const t = [];
  let s, a;
  for (s = 0, a = e.length; s < a; s++)
    e[s].major && t.push(s);
  return t;
}
function zc(e, t, s, a) {
  let n = 0, o = s[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), n++, o = s[n * a]);
}
function bs(e, t, s, a, n) {
  const o = ot(a, 0), i = Math.min(ot(n, e.length), e.length);
  let r = 0, l, d, u;
  for (s = Math.ceil(s), n && (l = n - a, s = l / Math.floor(l / s)), u = o; u < 0; )
    r++, u = Math.round(o + r * s);
  for (d = Math.max(o, 0); d < i; d++)
    d === u && (t.push(e[d]), r++, u = Math.round(o + r * s));
}
function Vc(e) {
  const t = e.length;
  let s, a;
  if (t < 2)
    return !1;
  for (a = e[0], s = 1; s < t; ++s)
    if (e[s] - e[s - 1] !== a)
      return !1;
  return a;
}
const Nc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Fn = (e, t, s) => t === "top" || t === "left" ? e[t] + s : e[t] - s, Pn = (e, t) => Math.min(t || e, e);
function En(e, t) {
  const s = [], a = e.length / t, n = e.length;
  let o = 0;
  for (; o < n; o += a)
    s.push(e[Math.floor(o)]);
  return s;
}
function Wc(e, t, s) {
  const a = e.ticks.length, n = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(n), d;
  if (!(s && (a === 1 ? d = Math.max(l - o, i - l) : t === 0 ? d = (e.getPixelForTick(1) - l) / 2 : d = (l - e.getPixelForTick(n - 1)) / 2, l += n < t ? d : -d, l < o - r || l > i + r)))
    return l;
}
function Hc(e, t) {
  gt(e, (s) => {
    const a = s.gc, n = a.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete s.data[a[o]];
      a.splice(0, n);
    }
  });
}
function Ie(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Rn(e, t) {
  if (!e.display)
    return 0;
  const s = Lt(e.font, t), a = Yt(e.padding);
  return ($t(e.text) ? e.text.length : 1) * s.lineHeight + a.height;
}
function jc(e, t) {
  return Me(e, {
    scale: t,
    type: "scale"
  });
}
function Yc(e, t, s) {
  return Me(e, {
    tick: s,
    index: t,
    type: "tick"
  });
}
function qc(e, t, s) {
  let a = Ta(e);
  return (s && t !== "right" || !s && t === "right") && (a = Nc(a)), a;
}
function Uc(e, t, s, a) {
  const { top: n, left: o, bottom: i, right: r, chart: l } = e, { chartArea: d, scales: u } = l;
  let h = 0, f, b, p;
  const _ = i - n, m = r - o;
  if (e.isHorizontal()) {
    if (b = At(a, o, r), it(s)) {
      const g = Object.keys(s)[0], v = s[g];
      p = u[g].getPixelForValue(v) + _ - t;
    } else s === "center" ? p = (d.bottom + d.top) / 2 + _ - t : p = Fn(e, s, t);
    f = r - o;
  } else {
    if (it(s)) {
      const g = Object.keys(s)[0], v = s[g];
      b = u[g].getPixelForValue(v) - m + t;
    } else s === "center" ? b = (d.left + d.right) / 2 - m + t : b = Fn(e, s, t);
    p = At(a, i, n), h = s === "left" ? -Mt : Mt;
  }
  return {
    titleX: b,
    titleY: p,
    maxWidth: f,
    rotation: h
  };
}
class Fe extends ne {
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
  parse(t, s) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: s, _suggestedMin: a, _suggestedMax: n } = this;
    return t = qt(t, Number.POSITIVE_INFINITY), s = qt(s, Number.NEGATIVE_INFINITY), a = qt(a, Number.POSITIVE_INFINITY), n = qt(n, Number.NEGATIVE_INFINITY), {
      min: qt(t, a),
      max: qt(s, n),
      minDefined: Ft(t),
      maxDefined: Ft(s)
    };
  }
  getMinMax(t) {
    let { min: s, max: a, minDefined: n, maxDefined: o } = this.getUserBounds(), i;
    if (n && o)
      return {
        min: s,
        max: a
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, d = r.length; l < d; ++l)
      i = r[l].controller.getMinMax(this, t), n || (s = Math.min(s, i.min)), o || (a = Math.max(a, i.max));
    return s = o && s > a ? a : s, a = n && s > a ? s : a, {
      min: qt(s, qt(a, s)),
      max: qt(a, qt(s, a))
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
    vt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, s, a) {
    const { beginAtZero: n, grace: o, ticks: i } = this.options, r = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = s, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Qr(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? En(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Ec(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, s, a;
    this.isHorizontal() ? (s = this.left, a = this.right) : (s = this.top, a = this.bottom, t = !t), this._startPixel = s, this._endPixel = a, this._reversePixels = t, this._length = a - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    vt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    vt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    vt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), vt(this.options[t], [
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
    vt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const s = this.options.ticks;
    let a, n, o;
    for (a = 0, n = t.length; a < n; a++)
      o = t[a], o.label = vt(s.callback, [
        o.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    vt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    vt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, s = t.ticks, a = Pn(this.ticks.length, t.ticks.maxTicksLimit), n = s.minRotation || 0, o = s.maxRotation;
    let i = n, r, l, d;
    if (!this._isVisible() || !s.display || n >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, f = u.highest.height, b = Bt(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / a : b / (a - 1), h + 6 > r && (r = b / (a - (t.offset ? 0.5 : 1)), l = this.maxHeight - Ie(t.grid) - s.padding - Rn(t.title, this.chart.options.font), d = Math.sqrt(h * h + f * f), i = wr(Math.min(Math.asin(Bt((u.highest.height + 6) / r, -1, 1)), Math.asin(Bt(l / d, -1, 1)) - Math.asin(Bt(f / d, -1, 1)))), i = Math.max(n, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    vt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    vt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: a, title: n, grid: o } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = Rn(n, s.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Ie(o) + l) : (t.height = this.maxHeight, t.width = Ie(o) + l), a.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: f } = this._getLabelSizes(), b = a.padding * 2, p = ee(this.labelRotation), _ = Math.cos(p), m = Math.sin(p);
        if (r) {
          const g = a.mirror ? 0 : m * h.width + _ * f.height;
          t.height = Math.min(this.maxHeight, t.height + g + b);
        } else {
          const g = a.mirror ? 0 : _ * h.width + m * f.height;
          t.width = Math.min(this.maxWidth, t.width + g + b);
        }
        this._calculatePadding(d, u, m, _);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, s, a, n) {
    const { ticks: { align: o, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, d = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, b = 0;
      l ? d ? (f = n * t.width, b = a * s.height) : (f = a * t.height, b = n * s.width) : o === "start" ? b = s.width : o === "end" ? f = t.width : o !== "inner" && (f = t.width / 2, b = s.width / 2), this.paddingLeft = Math.max((f - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((b - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = s.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = s.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    vt(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: s } = this.options;
    return s === "top" || s === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let s, a;
    for (s = 0, a = t.length; s < a; s++)
      ft(t[s].label) && (t.splice(s, 1), a--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const s = this.options.ticks.sampleSize;
      let a = this.ticks;
      s < a.length && (a = En(a, s)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, s, a) {
    const { ctx: n, _longestTextCache: o } = this, i = [], r = [], l = Math.floor(s / Pn(s, a));
    let d = 0, u = 0, h, f, b, p, _, m, g, v, $, k, w;
    for (h = 0; h < s; h += l) {
      if (p = t[h].label, _ = this._resolveTickFontOptions(h), n.font = m = _.string, g = o[m] = o[m] || {
        data: {},
        gc: []
      }, v = _.lineHeight, $ = k = 0, !ft(p) && !$t(p))
        $ = cn(n, g.data, g.gc, $, p), k = v;
      else if ($t(p))
        for (f = 0, b = p.length; f < b; ++f)
          w = p[f], !ft(w) && !$t(w) && ($ = cn(n, g.data, g.gc, $, w), k += v);
      i.push($), r.push(k), d = Math.max($, d), u = Math.max(k, u);
    }
    Hc(o, s);
    const S = i.indexOf(d), C = r.indexOf(u), A = (P) => ({
      width: i[P] || 0,
      height: r[P] || 0
    });
    return {
      first: A(0),
      last: A(s - 1),
      widest: A(S),
      highest: A(C),
      widths: i,
      heights: r
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, s) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const s = this.ticks;
    return t < 0 || t > s.length - 1 ? null : this.getPixelForValue(s[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const s = this._startPixel + t * this._length;
    return Mr(this._alignToPixels ? be(this.chart, s, 0) : s);
  }
  getDecimalForPixel(t) {
    const s = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - s : s;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: s } = this;
    return t < 0 && s < 0 ? s : t > 0 && s > 0 ? t : 0;
  }
  getContext(t) {
    const s = this.ticks || [];
    if (t >= 0 && t < s.length) {
      const a = s[t];
      return a.$context || (a.$context = Yc(this.getContext(), t, a));
    }
    return this.$context || (this.$context = jc(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, s = ee(this.labelRotation), a = Math.abs(Math.cos(s)), n = Math.abs(Math.sin(s)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = o ? o.widest.width + i : 0, l = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? l * a > r * n ? r / a : l / n : l * n < r * a ? l / a : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const s = this.axis, a = this.chart, n = this.options, { grid: o, position: i, border: r } = n, l = o.offset, d = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), f = Ie(o), b = [], p = r.setContext(this.getContext()), _ = p.display ? p.width : 0, m = _ / 2, g = function(I) {
      return be(a, I, _);
    };
    let v, $, k, w, S, C, A, P, E, R, N, Y;
    if (i === "top")
      v = g(this.bottom), C = this.bottom - f, P = v - m, R = g(t.top) + m, Y = t.bottom;
    else if (i === "bottom")
      v = g(this.top), R = t.top, Y = g(t.bottom) - m, C = v + m, P = this.top + f;
    else if (i === "left")
      v = g(this.right), S = this.right - f, A = v - m, E = g(t.left) + m, N = t.right;
    else if (i === "right")
      v = g(this.left), E = t.left, N = g(t.right) - m, S = v + m, A = this.left + f;
    else if (s === "x") {
      if (i === "center")
        v = g((t.top + t.bottom) / 2 + 0.5);
      else if (it(i)) {
        const I = Object.keys(i)[0], z = i[I];
        v = g(this.chart.scales[I].getPixelForValue(z));
      }
      R = t.top, Y = t.bottom, C = v + m, P = C + f;
    } else if (s === "y") {
      if (i === "center")
        v = g((t.left + t.right) / 2);
      else if (it(i)) {
        const I = Object.keys(i)[0], z = i[I];
        v = g(this.chart.scales[I].getPixelForValue(z));
      }
      S = v - m, A = S - f, E = t.left, N = t.right;
    }
    const B = ot(n.ticks.maxTicksLimit, h), F = Math.max(1, Math.ceil(h / B));
    for ($ = 0; $ < h; $ += F) {
      const I = this.getContext($), z = o.setContext(I), W = r.setContext(I), V = z.lineWidth, H = z.color, et = W.dash || [], tt = W.dashOffset, K = z.tickWidth, ht = z.tickColor, _t = z.tickBorderDash || [], ut = z.tickBorderDashOffset;
      k = Wc(this, $, l), k !== void 0 && (w = be(a, k, V), d ? S = A = E = N = w : C = P = R = Y = w, b.push({
        tx1: S,
        ty1: C,
        tx2: A,
        ty2: P,
        x1: E,
        y1: R,
        x2: N,
        y2: Y,
        width: V,
        color: H,
        borderDash: et,
        borderDashOffset: tt,
        tickWidth: K,
        tickColor: ht,
        tickBorderDash: _t,
        tickBorderDashOffset: ut
      }));
    }
    return this._ticksLength = h, this._borderValue = v, b;
  }
  _computeLabelItems(t) {
    const s = this.axis, a = this.options, { position: n, ticks: o } = a, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: d, padding: u, mirror: h } = o, f = Ie(a.grid), b = f + u, p = h ? -u : b, _ = -ee(this.labelRotation), m = [];
    let g, v, $, k, w, S, C, A, P, E, R, N, Y = "middle";
    if (n === "top")
      S = this.bottom - p, C = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      S = this.top + p, C = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const F = this._getYAxisLabelAlignment(f);
      C = F.textAlign, w = F.x;
    } else if (n === "right") {
      const F = this._getYAxisLabelAlignment(f);
      C = F.textAlign, w = F.x;
    } else if (s === "x") {
      if (n === "center")
        S = (t.top + t.bottom) / 2 + b;
      else if (it(n)) {
        const F = Object.keys(n)[0], I = n[F];
        S = this.chart.scales[F].getPixelForValue(I) + b;
      }
      C = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (n === "center")
        w = (t.left + t.right) / 2 - b;
      else if (it(n)) {
        const F = Object.keys(n)[0], I = n[F];
        w = this.chart.scales[F].getPixelForValue(I);
      }
      C = this._getYAxisLabelAlignment(f).textAlign;
    }
    s === "y" && (l === "start" ? Y = "top" : l === "end" && (Y = "bottom"));
    const B = this._getLabelSizes();
    for (g = 0, v = r.length; g < v; ++g) {
      $ = r[g], k = $.label;
      const F = o.setContext(this.getContext(g));
      A = this.getPixelForTick(g) + o.labelOffset, P = this._resolveTickFontOptions(g), E = P.lineHeight, R = $t(k) ? k.length : 1;
      const I = R / 2, z = F.color, W = F.textStrokeColor, V = F.textStrokeWidth;
      let H = C;
      i ? (w = A, C === "inner" && (g === v - 1 ? H = this.options.reverse ? "left" : "right" : g === 0 ? H = this.options.reverse ? "right" : "left" : H = "center"), n === "top" ? d === "near" || _ !== 0 ? N = -R * E + E / 2 : d === "center" ? N = -B.highest.height / 2 - I * E + E : N = -B.highest.height + E / 2 : d === "near" || _ !== 0 ? N = E / 2 : d === "center" ? N = B.highest.height / 2 - I * E : N = B.highest.height - R * E, h && (N *= -1), _ !== 0 && !F.showLabelBackdrop && (w += E / 2 * Math.sin(_))) : (S = A, N = (1 - R) * E / 2);
      let et;
      if (F.showLabelBackdrop) {
        const tt = Yt(F.backdropPadding), K = B.heights[g], ht = B.widths[g];
        let _t = N - tt.top, ut = 0 - tt.left;
        switch (Y) {
          case "middle":
            _t -= K / 2;
            break;
          case "bottom":
            _t -= K;
            break;
        }
        switch (C) {
          case "center":
            ut -= ht / 2;
            break;
          case "right":
            ut -= ht;
            break;
          case "inner":
            g === v - 1 ? ut -= ht : g > 0 && (ut -= ht / 2);
            break;
        }
        et = {
          left: ut,
          top: _t,
          width: ht + tt.width,
          height: K + tt.height,
          color: F.backdropColor
        };
      }
      m.push({
        label: k,
        font: P,
        textOffset: N,
        options: {
          rotation: _,
          color: z,
          strokeColor: W,
          strokeWidth: V,
          textAlign: H,
          textBaseline: Y,
          translation: [
            w,
            S
          ],
          backdrop: et
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: s } = this.options;
    if (-ee(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return s.align === "start" ? n = "left" : s.align === "end" ? n = "right" : s.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: s, ticks: { crossAlign: a, mirror: n, padding: o } } = this.options, i = this._getLabelSizes(), r = t + o, l = i.widest.width;
    let d, u;
    return s === "left" ? n ? (u = this.right + o, a === "near" ? d = "left" : a === "center" ? (d = "center", u += l / 2) : (d = "right", u += l)) : (u = this.right - r, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= l / 2) : (d = "left", u = this.left)) : s === "right" ? n ? (u = this.left + o, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= l / 2) : (d = "left", u -= l)) : (u = this.left + r, a === "near" ? d = "left" : a === "center" ? (d = "center", u += l / 2) : (d = "right", u = this.right)) : d = "right", {
      textAlign: d,
      x: u
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, s = this.options.position;
    if (s === "left" || s === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (s === "top" || s === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: s }, left: a, top: n, width: o, height: i } = this;
    s && (t.save(), t.fillStyle = s, t.fillRect(a, n, o, i), t.restore());
  }
  getLineWidthForValue(t) {
    const s = this.options.grid;
    if (!this._isVisible() || !s.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? s.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const s = this.options.grid, a = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, i;
    const r = (l, d, u) => {
      !u.width || !u.color || (a.save(), a.lineWidth = u.width, a.strokeStyle = u.color, a.setLineDash(u.borderDash || []), a.lineDashOffset = u.borderDashOffset, a.beginPath(), a.moveTo(l.x, l.y), a.lineTo(d.x, d.y), a.stroke(), a.restore());
    };
    if (s.display)
      for (o = 0, i = n.length; o < i; ++o) {
        const l = n[o];
        s.drawOnChartArea && r({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), s.drawTicks && r({
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
    const { chart: t, ctx: s, options: { border: a, grid: n } } = this, o = a.setContext(this.getContext()), i = a.display ? o.width : 0;
    if (!i)
      return;
    const r = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let d, u, h, f;
    this.isHorizontal() ? (d = be(t, this.left, i) - i / 2, u = be(t, this.right, r) + r / 2, h = f = l) : (h = be(t, this.top, i) - i / 2, f = be(t, this.bottom, r) + r / 2, d = u = l), s.save(), s.lineWidth = o.width, s.strokeStyle = o.color, s.beginPath(), s.moveTo(d, h), s.lineTo(u, f), s.stroke(), s.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, n = this._computeLabelArea();
    n && Ps(a, n);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const r = i.options, l = i.font, d = i.label, u = i.textOffset;
      ss(a, d, 0, u, l, r);
    }
    n && Es(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: s, title: a, reverse: n } } = this;
    if (!a.display)
      return;
    const o = Lt(a.font), i = Yt(a.padding), r = a.align;
    let l = o.lineHeight / 2;
    s === "bottom" || s === "center" || it(s) ? (l += i.bottom, $t(a.text) && (l += o.lineHeight * (a.text.length - 1))) : l += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: f } = Uc(this, l, s, r);
    ss(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: f,
      textAlign: qc(r, s, n),
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
    const t = this.options, s = t.ticks && t.ticks.z || 0, a = ot(t.grid && t.grid.z, -1), n = ot(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Fe.prototype.draw ? [
      {
        z: s,
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
        z: n,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: s,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const s = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", n = [];
    let o, i;
    for (o = 0, i = s.length; o < i; ++o) {
      const r = s[o];
      r[a] === this.id && (!t || r.type === t) && n.push(r);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const s = this.options.ticks.setContext(this.getContext(t));
    return Lt(s.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class vs {
  constructor(t, s, a) {
    this.type = t, this.scope = s, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const s = Object.getPrototypeOf(t);
    let a;
    Gc(s) && (a = this.register(s));
    const n = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, Kc(t, i, a), this.override && kt.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const s = this.items, a = t.id, n = this.scope;
    a in s && delete s[a], n && a in kt[n] && (delete kt[n][a], this.override && delete $e[a]);
  }
}
function Kc(e, t, s) {
  const a = Ze(/* @__PURE__ */ Object.create(null), [
    s ? kt.get(s) : {},
    kt.get(t),
    e.defaults
  ]);
  kt.set(t, a), e.defaultRoutes && Xc(t, e.defaultRoutes), e.descriptors && kt.describe(t, e.descriptors);
}
function Xc(e, t) {
  Object.keys(t).forEach((s) => {
    const a = s.split("."), n = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[s].split("."), r = i.pop(), l = i.join(".");
    kt.route(o, n, l, r);
  });
}
function Gc(e) {
  return "id" in e && "defaults" in e;
}
class Zc {
  constructor() {
    this.controllers = new vs(Os, "datasets", !0), this.elements = new vs(ne, "elements"), this.plugins = new vs(Object, "plugins"), this.scales = new vs(Fe, "scales"), this._typedRegistries = [
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
  _each(t, s, a) {
    [
      ...s
    ].forEach((n) => {
      const o = a || this._getRegistryForType(n);
      a || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : gt(n, (i) => {
        const r = a || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, s, a) {
    const n = Da(t);
    vt(a["before" + n], [], a), s[t](a), vt(a["after" + n], [], a);
  }
  _getRegistryForType(t) {
    for (let s = 0; s < this._typedRegistries.length; s++) {
      const a = this._typedRegistries[s];
      if (a.isForType(t))
        return a;
    }
    return this.plugins;
  }
  _get(t, s, a) {
    const n = s.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + a + ".");
    return n;
  }
}
var Kt = /* @__PURE__ */ new Zc();
class Qc {
  constructor() {
    this._init = void 0;
  }
  notify(t, s, a, n) {
    if (s === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), i = this._notify(o, t, s, a);
    return s === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, s, a, n) {
    n = n || {};
    for (const o of t) {
      const i = o.plugin, r = i[a], l = [
        s,
        n,
        o.options
      ];
      if (vt(r, l, i) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    ft(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), s;
  }
  _createDescriptors(t, s) {
    const a = t && t.config, n = ot(a.options && a.options.plugins, {}), o = Jc(a);
    return n === !1 && !s ? [] : ed(t, o, n, s);
  }
  _notifyStateChanges(t) {
    const s = this._oldCache || [], a = this._cache, n = (o, i) => o.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(n(s, a), t, "stop"), this._notify(n(a, s), t, "start");
  }
}
function Jc(e) {
  const t = {}, s = [], a = Object.keys(Kt.plugins.items);
  for (let o = 0; o < a.length; o++)
    s.push(Kt.getPlugin(a[o]));
  const n = e.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    s.indexOf(i) === -1 && (s.push(i), t[i.id] = !0);
  }
  return {
    plugins: s,
    localIds: t
  };
}
function td(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function ed(e, { plugins: t, localIds: s }, a, n) {
  const o = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, d = td(a[l], n);
    d !== null && o.push({
      plugin: r,
      options: sd(e.config, {
        plugin: r,
        local: s[l]
      }, d, i)
    });
  }
  return o;
}
function sd(e, { plugin: t, local: s }, a, n) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return s && t.defaults && i.push(t.defaults), e.createResolver(i, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function _a(e, t) {
  const s = kt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || s.indexAxis || "x";
}
function ad(e, t) {
  let s = e;
  return e === "_index_" ? s = t : e === "_value_" && (s = t === "x" ? "y" : "x"), s;
}
function nd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function On(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function od(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function xa(e, ...t) {
  if (On(e))
    return e;
  for (const s of t) {
    const a = s.axis || od(s.position) || e.length > 1 && On(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function In(e, t, s) {
  if (s[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function id(e, t) {
  if (t.data && t.data.datasets) {
    const s = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (s.length)
      return In(e, "x", s[0]) || In(e, "y", s[0]);
  }
  return {};
}
function rd(e, t) {
  const s = $e[e.type] || {
    scales: {}
  }, a = t.scales || {}, n = _a(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const r = a[i];
    if (!it(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = xa(i, r, id(i, e), kt.scales[r.type]), d = nd(l, n), u = s.scales || {};
    o[i] = qe(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || _a(r, t), u = ($e[r] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const f = ad(h, l), b = i[f + "AxisID"] || f;
      o[b] = o[b] || /* @__PURE__ */ Object.create(null), qe(o[b], [
        {
          axis: f
        },
        a[b],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const r = o[i];
    qe(r, [
      kt.scales[r.type],
      kt.scale
    ]);
  }), o;
}
function ci(e) {
  const t = e.options || (e.options = {});
  t.plugins = ot(t.plugins, {}), t.scales = rd(e, t);
}
function di(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function ld(e) {
  return e = e || {}, e.data = di(e.data), ci(e), e;
}
const zn = /* @__PURE__ */ new Map(), ui = /* @__PURE__ */ new Set();
function ms(e, t) {
  let s = zn.get(e);
  return s || (s = t(), zn.set(e, s), ui.add(s)), s;
}
const ze = (e, t, s) => {
  const a = we(t, s);
  a !== void 0 && e.add(a);
};
class cd {
  constructor(t) {
    this._config = ld(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = di(t);
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
    this.clearCache(), ci(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ms(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, s) {
    return ms(`${t}.transition.${s}`, () => [
      [
        `datasets.${t}.transitions.${s}`,
        `transitions.${s}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, s) {
    return ms(`${t}-${s}`, () => [
      [
        `datasets.${t}.elements.${s}`,
        `datasets.${t}`,
        `elements.${s}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const s = t.id, a = this.type;
    return ms(`${a}-plugin-${s}`, () => [
      [
        `plugins.${s}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, s) {
    const a = this._scopeCache;
    let n = a.get(t);
    return (!n || s) && (n = /* @__PURE__ */ new Map(), a.set(t, n)), n;
  }
  getOptionScopes(t, s, a) {
    const { options: n, type: o } = this, i = this._cachedScopes(t, a), r = i.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((u) => {
      t && (l.add(t), u.forEach((h) => ze(l, t, h))), u.forEach((h) => ze(l, n, h)), u.forEach((h) => ze(l, $e[o] || {}, h)), u.forEach((h) => ze(l, kt, h)), u.forEach((h) => ze(l, ma, h));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), ui.has(s) && i.set(s, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: s } = this;
    return [
      t,
      $e[s] || {},
      kt.datasets[s] || {},
      {
        type: s
      },
      kt,
      ma
    ];
  }
  resolveNamedOptions(t, s, a, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = Vn(this._resolverCache, t, n);
    let l = i;
    if (ud(i, s)) {
      o.$shared = !1, a = ue(a) ? a() : a;
      const d = this.createResolver(t, a, r);
      l = Be(i, a, d);
    }
    for (const d of s)
      o[d] = l[d];
    return o;
  }
  createResolver(t, s, a = [
    ""
  ], n) {
    const { resolver: o } = Vn(this._resolverCache, t, a);
    return it(s) ? Be(o, s, void 0, n) : o;
  }
}
function Vn(e, t, s) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const n = s.join();
  let o = a.get(n);
  return o || (o = {
    resolver: Pa(t, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, a.set(n, o)), o;
}
const dd = (e) => it(e) && Object.getOwnPropertyNames(e).some((t) => ue(e[t]));
function ud(e, t) {
  const { isScriptable: s, isIndexable: a } = jo(e);
  for (const n of t) {
    const o = s(n), i = a(n), r = (i || o) && e[n];
    if (o && (ue(r) || dd(r)) || i && $t(r))
      return !0;
  }
  return !1;
}
var hd = "4.5.1";
const fd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Nn(e, t) {
  return e === "top" || e === "bottom" || fd.indexOf(e) === -1 && t === "x";
}
function Wn(e, t) {
  return function(s, a) {
    return s[e] === a[e] ? s[t] - a[t] : s[e] - a[e];
  };
}
function Hn(e) {
  const t = e.chart, s = t.options.animation;
  t.notifyPlugins("afterRender"), vt(s && s.onComplete, [
    e
  ], t);
}
function gd(e) {
  const t = e.chart, s = t.options.animation;
  vt(s && s.onProgress, [
    e
  ], t);
}
function hi(e) {
  return Oa() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const ws = {}, jn = (e) => {
  const t = hi(e);
  return Object.values(ws).filter((s) => s.canvas === t).pop();
};
function pd(e, t, s) {
  const a = Object.keys(e);
  for (const n of a) {
    const o = +n;
    if (o >= t) {
      const i = e[n];
      delete e[n], (s > 0 || o > t) && (e[o + s] = i);
    }
  }
}
function bd(e, t, s, a) {
  return !s || e.type === "mouseout" ? null : a ? t : e;
}
let Pe = class {
  static defaults = kt;
  static instances = ws;
  static overrides = $e;
  static registry = Kt;
  static version = hd;
  static getChart = jn;
  static register(...t) {
    Kt.add(...t), Yn();
  }
  static unregister(...t) {
    Kt.remove(...t), Yn();
  }
  constructor(t, s) {
    const a = this.config = new cd(s), n = hi(t), o = jn(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || Pc(n))(), this.platform.updateConfig(a);
    const r = this.platform.acquireContext(n, i.aspectRatio), l = r && r.canvas, d = l && l.height, u = l && l.width;
    if (this.id = dr(), this.ctx = r, this.canvas = l, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Qc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Ar((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], ws[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Qt.listen(this, "complete", Hn), Qt.listen(this, "progress", gd), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: s }, width: a, height: n, _aspectRatio: o } = this;
    return ft(t) ? s && o ? o : n ? a / n : null : t;
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
    return Kt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : fn(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return dn(this.canvas, this.ctx), this;
  }
  stop() {
    return Qt.stop(this), this;
  }
  resize(t, s) {
    Qt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: s
    } : this._resize(t, s);
  }
  _resize(t, s) {
    const a = this.options, n = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(n, t, s, o), r = a.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, fn(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), vt(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    gt(s, (a, n) => {
      a.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, s = t.scales, a = this.scales, n = Object.keys(a).reduce((i, r) => (i[r] = !1, i), {});
    let o = [];
    s && (o = o.concat(Object.keys(s).map((i) => {
      const r = s[i], l = xa(i, r), d = l === "r", u = l === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), gt(o, (i) => {
      const r = i.options, l = r.id, d = xa(l, r), u = ot(r.type, i.dtype);
      (r.position === void 0 || Nn(r.position, d) !== Nn(i.dposition)) && (r.position = i.dposition), n[l] = !0;
      let h = null;
      if (l in a && a[l].type === u)
        h = a[l];
      else {
        const f = Kt.getScale(u);
        h = new f({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(r, t);
    }), gt(n, (i, r) => {
      i || delete a[r];
    }), gt(a, (i) => {
      jt.configure(this, i, i.options), jt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, s = this.data.datasets.length, a = t.length;
    if (t.sort((n, o) => n.index - o.index), a > s) {
      for (let n = s; n < a; ++n)
        this._destroyDatasetMeta(n);
      t.splice(s, a - s);
    }
    this._sortedMetasets = t.slice(0).sort(Wn("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: s } } = this;
    t.length > s.length && delete this._stacks, t.forEach((a, n) => {
      s.filter((o) => o === a._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], s = this.data.datasets;
    let a, n;
    for (this._removeUnreferencedMetasets(), a = 0, n = s.length; a < n; a++) {
      const o = s[a];
      let i = this.getDatasetMeta(a);
      const r = o.type || this.config.type;
      if (i.type && i.type !== r && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = r, i.indexAxis = o.indexAxis || _a(r, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const l = Kt.getController(r), { datasetElementType: d, dataElementType: u } = kt.datasets[r];
        Object.assign(l, {
          dataElementType: Kt.getElement(u),
          datasetElementType: d && Kt.getElement(d)
        }), i.controller = new l(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    gt(this.data.datasets, (t, s) => {
      this.getDatasetMeta(s).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const s = this.config;
    s.update();
    const a = this._options = s.createResolver(s.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !a.animation;
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
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), n || gt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Wn("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    gt(this.scales, (t) => {
      jt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, s = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Ja(s, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, s = this._getUniformDataChanges() || [];
    for (const { method: a, start: n, count: o } of s) {
      const i = a === "_removeElements" ? -o : o;
      pd(t, n, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, r) => r + "," + i.splice(1).join(","))), n = a(0);
    for (let o = 1; o < s; o++)
      if (!Ja(n, a(o)))
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
    const s = this.chartArea, a = s.width <= 0 || s.height <= 0;
    this._layers = [], gt(this.boxes, (n) => {
      a && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let s = 0, a = this.data.datasets.length; s < a; ++s)
        this.getDatasetMeta(s).controller.configure();
      for (let s = 0, a = this.data.datasets.length; s < a; ++s)
        this._updateDataset(s, ue(t) ? t({
          datasetIndex: s
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, s) {
    const a = this.getDatasetMeta(t), n = {
      meta: a,
      index: t,
      mode: s,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (a.controller._update(s), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Qt.has(this) ? this.attached && !Qt.running(this) && Qt.start(this) : (this.draw(), Hn({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: a, height: n } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(a, n);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const s = this._layers;
    for (t = 0; t < s.length && s[t].z <= 0; ++t)
      s[t].draw(this.chartArea);
    for (this._drawDatasets(); t < s.length; ++t)
      s[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const s = this._sortedMetasets, a = [];
    let n, o;
    for (n = 0, o = s.length; n < o; ++n) {
      const i = s[n];
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
    for (let s = t.length - 1; s >= 0; --s)
      this._drawDataset(t[s]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const s = this.ctx, a = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, n = ti(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (n && Ps(s, n), t.controller.draw(), n && Es(s), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return es(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, s, a, n) {
    const o = fc.modes[s];
    return typeof o == "function" ? o(this, t, a, n) : [];
  }
  getDatasetMeta(t) {
    const s = this.data.datasets[t], a = this._metasets;
    let n = a.filter((o) => o && o._dataset === s).pop();
    return n || (n = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: s && s.order || 0,
      index: t,
      _dataset: s,
      _parsed: [],
      _sorted: !1
    }, a.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = Me(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const s = this.data.datasets[t];
    if (!s)
      return !1;
    const a = this.getDatasetMeta(t);
    return typeof a.hidden == "boolean" ? !a.hidden : !s.hidden;
  }
  setDatasetVisibility(t, s) {
    const a = this.getDatasetMeta(t);
    a.hidden = !s;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, s, a) {
    const n = a ? "show" : "hide", o = this.getDatasetMeta(t), i = o.controller._resolveAnimations(void 0, n);
    Qe(s) ? (o.data[s].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
      visible: a
    }), this.update((r) => r.datasetIndex === t ? n : void 0));
  }
  hide(t, s) {
    this._updateVisibility(t, s, !1);
  }
  show(t, s) {
    this._updateVisibility(t, s, !0);
  }
  _destroyDatasetMeta(t) {
    const s = this._metasets[t];
    s && s.controller && s.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, s;
    for (this.stop(), Qt.remove(this), t = 0, s = this.data.datasets.length; t < s; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: s } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), dn(t, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete ws[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, s = this.platform, a = (o, i) => {
      s.addEventListener(this, o, i), t[o] = i;
    }, n = (o, i, r) => {
      o.offsetX = i, o.offsetY = r, this._eventHandler(o);
    };
    gt(this.options.events, (o) => a(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, s = this.platform, a = (l, d) => {
      s.addEventListener(this, l, d), t[l] = d;
    }, n = (l, d) => {
      t[l] && (s.removeEventListener(this, l, d), delete t[l]);
    }, o = (l, d) => {
      this.canvas && this.resize(l, d);
    };
    let i;
    const r = () => {
      n("attach", r), this.attached = !0, this.resize(), a("resize", o), a("detach", i);
    };
    i = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), a("attach", r);
    }, s.isAttached(this.canvas) ? r() : i();
  }
  unbindEvents() {
    gt(this._listeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._listeners = {}, gt(this._responsiveListeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, s, a) {
    const n = a ? "set" : "remove";
    let o, i, r, l;
    for (s === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      i = t[r];
      const d = i && this.getDatasetMeta(i.datasetIndex).controller;
      d && d[n + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const s = this._active || [], a = t.map(({ datasetIndex: o, index: i }) => {
      const r = this.getDatasetMeta(o);
      if (!r)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: r.data[i],
        index: i
      };
    });
    !Cs(a, s) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, s));
  }
  notifyPlugins(t, s, a) {
    return this._plugins.notify(this, t, s, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((s) => s.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, s, a) {
    const n = this.options.hover, o = (l, d) => l.filter((u) => !d.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), i = o(s, t), r = a ? t : o(t, s);
    i.length && this.updateHoverStyle(i, n.mode, !1), r.length && n.mode && this.updateHoverStyle(r, n.mode, !0);
  }
  _eventHandler(t, s) {
    const a = {
      event: t,
      replay: s,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, n) === !1)
      return;
    const o = this._handleEvent(t, s, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, n), (o || a.changed) && this.render(), this;
  }
  _handleEvent(t, s, a) {
    const { _active: n = [], options: o } = this, i = s, r = this._getActiveElements(t, n, a, i), l = br(t), d = bd(t, this._lastEvent, a, l);
    a && (this._lastEvent = null, vt(o.onHover, [
      t,
      r,
      this
    ], this), l && vt(o.onClick, [
      t,
      r,
      this
    ], this));
    const u = !Cs(r, n);
    return (u || s) && (this._active = r, this._updateHoverStyles(r, n, s)), this._lastEvent = d, u;
  }
  _getActiveElements(t, s, a, n) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return s;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
};
function Yn() {
  return gt(Pe.instances, (e) => e._plugins.invalidate());
}
function vd(e, t, s) {
  const { startAngle: a, x: n, y: o, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: d, borderJoinStyle: u } = l, h = Math.min(d / i, It(a - s));
  if (e.beginPath(), e.arc(n, o, i - d / 2, a + h / 2, s - h / 2), r > 0) {
    const f = Math.min(d / r, It(a - s));
    e.arc(n, o, r + d / 2, s - f / 2, a + f / 2, !0);
  } else {
    const f = Math.min(d / 2, i * It(a - s));
    if (u === "round")
      e.arc(n, o, f, s - pt / 2, a + pt / 2, !0);
    else if (u === "bevel") {
      const b = 2 * f * f, p = -b * Math.cos(s + pt / 2) + n, _ = -b * Math.sin(s + pt / 2) + o, m = b * Math.cos(a + pt / 2) + n, g = b * Math.sin(a + pt / 2) + o;
      e.lineTo(p, _), e.lineTo(m, g);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function md(e, t, s) {
  const { startAngle: a, pixelMargin: n, x: o, y: i, outerRadius: r, innerRadius: l } = t;
  let d = n / r;
  e.beginPath(), e.arc(o, i, r, a - d, s + d), l > n ? (d = n / l, e.arc(o, i, l, s + d, a - d, !0)) : e.arc(o, i, n, s + Mt, a - Mt), e.closePath(), e.clip();
}
function yd(e) {
  return Fa(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function _d(e, t, s, a) {
  const n = yd(e.options.borderRadius), o = (s - t) / 2, i = Math.min(o, a * t / 2), r = (l) => {
    const d = (s - Math.min(o, l)) * a / 2;
    return Bt(l, 0, Math.min(o, d));
  };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: Bt(n.innerStart, 0, i),
    innerEnd: Bt(n.innerEnd, 0, i)
  };
}
function Ce(e, t, s, a) {
  return {
    x: s + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function Fs(e, t, s, a, n, o) {
  const { x: i, y: r, startAngle: l, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + a + s - d, 0), f = u > 0 ? u + a + s + d : 0;
  let b = 0;
  const p = n - l;
  if (a) {
    const F = u > 0 ? u - a : 0, I = h > 0 ? h - a : 0, z = (F + I) / 2, W = z !== 0 ? p * z / (z + a) : p;
    b = (p - W) / 2;
  }
  const _ = Math.max(1e-3, p * h - s / pt) / h, m = (p - _) / 2, g = l + m + b, v = n - m - b, { outerStart: $, outerEnd: k, innerStart: w, innerEnd: S } = _d(t, f, h, v - g), C = h - $, A = h - k, P = g + $ / C, E = v - k / A, R = f + w, N = f + S, Y = g + w / R, B = v - S / N;
  if (e.beginPath(), o) {
    const F = (P + E) / 2;
    if (e.arc(i, r, h, P, F), e.arc(i, r, h, F, E), k > 0) {
      const V = Ce(A, E, i, r);
      e.arc(V.x, V.y, k, E, v + Mt);
    }
    const I = Ce(N, v, i, r);
    if (e.lineTo(I.x, I.y), S > 0) {
      const V = Ce(N, B, i, r);
      e.arc(V.x, V.y, S, v + Mt, B + Math.PI);
    }
    const z = (v - S / f + (g + w / f)) / 2;
    if (e.arc(i, r, f, v - S / f, z, !0), e.arc(i, r, f, z, g + w / f, !0), w > 0) {
      const V = Ce(R, Y, i, r);
      e.arc(V.x, V.y, w, Y + Math.PI, g - Mt);
    }
    const W = Ce(C, g, i, r);
    if (e.lineTo(W.x, W.y), $ > 0) {
      const V = Ce(C, P, i, r);
      e.arc(V.x, V.y, $, g - Mt, P);
    }
  } else {
    e.moveTo(i, r);
    const F = Math.cos(P) * h + i, I = Math.sin(P) * h + r;
    e.lineTo(F, I);
    const z = Math.cos(E) * h + i, W = Math.sin(E) * h + r;
    e.lineTo(z, W);
  }
  e.closePath();
}
function xd(e, t, s, a, n) {
  const { fullCircles: o, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (o) {
    Fs(e, t, s, a, l, n);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(r) || (l = i + (r % mt || mt));
  }
  return Fs(e, t, s, a, l, n), e.fill(), l;
}
function kd(e, t, s, a, n) {
  const { fullCircles: o, startAngle: i, circumference: r, options: l } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: f, borderRadius: b } = l, p = l.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, p ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let _ = t.endAngle;
  if (o) {
    Fs(e, t, s, a, _, n);
    for (let m = 0; m < o; ++m)
      e.stroke();
    isNaN(r) || (_ = i + (r % mt || mt));
  }
  p && md(e, t, _), l.selfJoin && _ - i >= pt && b === 0 && u !== "miter" && vd(e, t, _), o || (Fs(e, t, s, a, _, n), e.stroke());
}
class wd extends ne {
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
  inRange(t, s, a) {
    const n = this.getProps([
      "x",
      "y"
    ], a), { angle: o, distance: i } = Ro(n, {
      x: t,
      y: s
    }), { startAngle: r, endAngle: l, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), f = (this.options.spacing + this.options.borderWidth) / 2, b = ot(h, l - r), p = ts(o, r, l) && r !== l, _ = b >= mt || p, m = se(i, d + f, u + f);
    return _ && m;
  }
  getCenterPoint(t) {
    const { x: s, y: a, startAngle: n, endAngle: o, innerRadius: i, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: d } = this.options, u = (n + o) / 2, h = (i + r + d + l) / 2;
    return {
      x: s + Math.cos(u) * h,
      y: a + Math.sin(u) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: s, circumference: a } = this, n = (s.offset || 0) / 4, o = (s.spacing || 0) / 2, i = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > mt ? Math.floor(a / mt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const l = 1 - Math.sin(Math.min(pt, a || 0)), d = n * l;
    t.fillStyle = s.backgroundColor, t.strokeStyle = s.borderColor, xd(t, this, d, o, i), kd(t, this, d, o, i), t.restore();
  }
}
function fi(e, t, s = t) {
  e.lineCap = ot(s.borderCapStyle, t.borderCapStyle), e.setLineDash(ot(s.borderDash, t.borderDash)), e.lineDashOffset = ot(s.borderDashOffset, t.borderDashOffset), e.lineJoin = ot(s.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ot(s.borderWidth, t.borderWidth), e.strokeStyle = ot(s.borderColor, t.borderColor);
}
function $d(e, t, s) {
  e.lineTo(s.x, s.y);
}
function Md(e) {
  return e.stepped ? Hr : e.tension || e.cubicInterpolationMode === "monotone" ? jr : $d;
}
function gi(e, t, s = {}) {
  const a = e.length, { start: n = 0, end: o = a - 1 } = s, { start: i, end: r } = t, l = Math.max(n, i), d = Math.min(o, r), u = n < i && o < i || n > r && o > r;
  return {
    count: a,
    start: l,
    loop: t.loop,
    ilen: d < l && !u ? a + d - l : d - l
  };
}
function Sd(e, t, s, a) {
  const { points: n, options: o } = t, { count: i, start: r, loop: l, ilen: d } = gi(n, s, a), u = Md(o);
  let { move: h = !0, reverse: f } = a || {}, b, p, _;
  for (b = 0; b <= d; ++b)
    p = n[(r + (f ? d - b : b)) % i], !p.skip && (h ? (e.moveTo(p.x, p.y), h = !1) : u(e, _, p, f, o.stepped), _ = p);
  return l && (p = n[(r + (f ? d : 0)) % i], u(e, _, p, f, o.stepped)), !!l;
}
function Cd(e, t, s, a) {
  const n = t.points, { count: o, start: i, ilen: r } = gi(n, s, a), { move: l = !0, reverse: d } = a || {};
  let u = 0, h = 0, f, b, p, _, m, g;
  const v = (k) => (i + (d ? r - k : k)) % o, $ = () => {
    _ !== m && (e.lineTo(u, m), e.lineTo(u, _), e.lineTo(u, g));
  };
  for (l && (b = n[v(0)], e.moveTo(b.x, b.y)), f = 0; f <= r; ++f) {
    if (b = n[v(f)], b.skip)
      continue;
    const k = b.x, w = b.y, S = k | 0;
    S === p ? (w < _ ? _ = w : w > m && (m = w), u = (h * u + k) / ++h) : ($(), e.lineTo(k, w), p = S, h = 0, _ = m = w), g = w;
  }
  $();
}
function ka(e) {
  const t = e.options, s = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !s ? Cd : Sd;
}
function Dd(e) {
  return e.stepped ? kl : e.tension || e.cubicInterpolationMode === "monotone" ? wl : _e;
}
function Ad(e, t, s, a) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, s, a) && n.closePath()), fi(e, t.options), e.stroke(n);
}
function Td(e, t, s, a) {
  const { segments: n, options: o } = t, i = ka(t);
  for (const r of n)
    fi(e, o, r.style), e.beginPath(), i(e, t, r, {
      start: s,
      end: s + a - 1
    }) && e.closePath(), e.stroke();
}
const Bd = typeof Path2D == "function";
function Ld(e, t, s, a) {
  Bd && !t.options.segment ? Ad(e, t, s, a) : Td(e, t, s, a);
}
class zs extends ne {
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
  updateControlPoints(t, s) {
    const a = this.options;
    if ((a.tension || a.cubicInterpolationMode === "monotone") && !a.stepped && !this._pointsUpdated) {
      const n = a.spanGaps ? this._loop : this._fullLoop;
      gl(this._points, a, t, n, s), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Al(this, this.options.segment));
  }
  first() {
    const t = this.segments, s = this.points;
    return t.length && s[t[0].start];
  }
  last() {
    const t = this.segments, s = this.points, a = t.length;
    return a && s[t[a - 1].end];
  }
  interpolate(t, s) {
    const a = this.options, n = t[s], o = this.points, i = Jo(this, {
      property: s,
      start: n,
      end: n
    });
    if (!i.length)
      return;
    const r = [], l = Dd(a);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: f } = i[d], b = o[h], p = o[f];
      if (b === p) {
        r.push(b);
        continue;
      }
      const _ = Math.abs((n - b[s]) / (p[s] - b[s])), m = l(b, p, _, a.stepped);
      m[s] = t[s], r.push(m);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, s, a) {
    return ka(this)(t, this, s, a);
  }
  path(t, s, a) {
    const n = this.segments, o = ka(this);
    let i = this._loop;
    s = s || 0, a = a || this.points.length - s;
    for (const r of n)
      i &= o(t, this, r, {
        start: s,
        end: s + a - 1
      });
    return !!i;
  }
  draw(t, s, a, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), Ld(t, this, a, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function qn(e, t, s, a) {
  const n = e.options, { [s]: o } = e.getProps([
    s
  ], a);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class Fd extends ne {
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
  inRange(t, s, a) {
    const n = this.options, { x: o, y: i } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(t - o, 2) + Math.pow(s - i, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(t, s) {
    return qn(this, t, "x", s);
  }
  inYRange(t, s) {
    return qn(this, t, "y", s);
  }
  getCenterPoint(t) {
    const { x: s, y: a } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: s,
      y: a
    };
  }
  size(t) {
    t = t || this.options || {};
    let s = t.radius || 0;
    s = Math.max(s, s && t.hoverRadius || 0);
    const a = s && t.borderWidth || 0;
    return (s + a) * 2;
  }
  draw(t, s) {
    const a = this.options;
    this.skip || a.radius < 0.1 || !es(this, s, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, ya(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function pi(e, t) {
  const { x: s, y: a, base: n, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, d, u, h;
  return e.horizontal ? (h = i / 2, r = Math.min(s, n), l = Math.max(s, n), d = a - h, u = a + h) : (h = o / 2, r = s - h, l = s + h, d = Math.min(a, n), u = Math.max(a, n)), {
    left: r,
    top: d,
    right: l,
    bottom: u
  };
}
function le(e, t, s, a) {
  return e ? 0 : Bt(t, s, a);
}
function Pd(e, t, s) {
  const a = e.options.borderWidth, n = e.borderSkipped, o = Ho(a);
  return {
    t: le(n.top, o.top, 0, s),
    r: le(n.right, o.right, 0, t),
    b: le(n.bottom, o.bottom, 0, s),
    l: le(n.left, o.left, 0, t)
  };
}
function Ed(e, t, s) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, o = Ae(n), i = Math.min(t, s), r = e.borderSkipped, l = a || it(n);
  return {
    topLeft: le(!l || r.top || r.left, o.topLeft, 0, i),
    topRight: le(!l || r.top || r.right, o.topRight, 0, i),
    bottomLeft: le(!l || r.bottom || r.left, o.bottomLeft, 0, i),
    bottomRight: le(!l || r.bottom || r.right, o.bottomRight, 0, i)
  };
}
function Rd(e) {
  const t = pi(e), s = t.right - t.left, a = t.bottom - t.top, n = Pd(e, s / 2, a / 2), o = Ed(e, s / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: s,
      h: a,
      radius: o
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: s - n.l - n.r,
      h: a - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function ta(e, t, s, a) {
  const n = t === null, o = s === null, r = e && !(n && o) && pi(e, a);
  return r && (n || se(t, r.left, r.right)) && (o || se(s, r.top, r.bottom));
}
function Od(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Id(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function ea(e, t, s = {}) {
  const a = e.x !== s.x ? -t : 0, n = e.y !== s.y ? -t : 0, o = (e.x + e.w !== s.x + s.w ? t : 0) - a, i = (e.y + e.h !== s.y + s.h ? t : 0) - n;
  return {
    x: e.x + a,
    y: e.y + n,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class zd extends ne {
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
    const { inflateAmount: s, options: { borderColor: a, backgroundColor: n } } = this, { inner: o, outer: i } = Rd(this), r = Od(i.radius) ? Ts : Id;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), r(t, ea(i, s, o)), t.clip(), r(t, ea(o, -s, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), r(t, ea(o, s)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, s, a) {
    return ta(this, t, s, a);
  }
  inXRange(t, s) {
    return ta(this, t, null, s);
  }
  inYRange(t, s) {
    return ta(this, null, t, s);
  }
  getCenterPoint(t) {
    const { x: s, y: a, base: n, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (s + n) / 2 : s,
      y: o ? a : (a + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function Vd(e, t, s) {
  const a = e.segments, n = e.points, o = t.points, i = [];
  for (const r of a) {
    let { start: l, end: d } = r;
    d = Vs(l, d, n);
    const u = wa(s, n[l], n[d], r.loop);
    if (!t.segments) {
      i.push({
        source: r,
        target: u,
        start: n[l],
        end: n[d]
      });
      continue;
    }
    const h = Jo(t, u);
    for (const f of h) {
      const b = wa(s, o[f.start], o[f.end], f.loop), p = Qo(r, n, b);
      for (const _ of p)
        i.push({
          source: _,
          target: f,
          start: {
            [s]: Un(u, b, "start", Math.max)
          },
          end: {
            [s]: Un(u, b, "end", Math.min)
          }
        });
    }
  }
  return i;
}
function wa(e, t, s, a) {
  if (a)
    return;
  let n = t[e], o = s[e];
  return e === "angle" && (n = It(n), o = It(o)), {
    property: e,
    start: n,
    end: o
  };
}
function Nd(e, t) {
  const { x: s = null, y: a = null } = e || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: i, end: r }) => {
    r = Vs(i, r, n);
    const l = n[i], d = n[r];
    a !== null ? (o.push({
      x: l.x,
      y: a
    }), o.push({
      x: d.x,
      y: a
    })) : s !== null && (o.push({
      x: s,
      y: l.y
    }), o.push({
      x: s,
      y: d.y
    }));
  }), o;
}
function Vs(e, t, s) {
  for (; t > e; t--) {
    const a = s[t];
    if (!isNaN(a.x) && !isNaN(a.y))
      break;
  }
  return t;
}
function Un(e, t, s, a) {
  return e && t ? a(e[s], t[s]) : e ? e[s] : t ? t[s] : 0;
}
function bi(e, t) {
  let s = [], a = !1;
  return $t(e) ? (a = !0, s = e) : s = Nd(e, t), s.length ? new zs({
    points: s,
    options: {
      tension: 0
    },
    _loop: a,
    _fullLoop: a
  }) : null;
}
function Kn(e) {
  return e && e.fill !== !1;
}
function Wd(e, t, s) {
  let n = e[t].fill;
  const o = [
    t
  ];
  let i;
  if (!s)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!Ft(n))
      return n;
    if (i = e[n], !i)
      return !1;
    if (i.visible)
      return n;
    o.push(n), n = i.fill;
  }
  return !1;
}
function Hd(e, t, s) {
  const a = Ud(e);
  if (it(a))
    return isNaN(a.value) ? !1 : a;
  let n = parseFloat(a);
  return Ft(n) && Math.floor(n) === n ? jd(a[0], t, n, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(a) >= 0 && a;
}
function jd(e, t, s, a) {
  return (e === "-" || e === "+") && (s = t + s), s === t || s < 0 || s >= a ? !1 : s;
}
function Yd(e, t) {
  let s = null;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : it(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), s;
}
function qd(e, t, s) {
  let a;
  return e === "start" ? a = s : e === "end" ? a = t.options.reverse ? t.min : t.max : it(e) ? a = e.value : a = t.getBaseValue(), a;
}
function Ud(e) {
  const t = e.options, s = t.fill;
  let a = ot(s && s.target, s);
  return a === void 0 && (a = !!t.backgroundColor), a === !1 || a === null ? !1 : a === !0 ? "origin" : a;
}
function Kd(e) {
  const { scale: t, index: s, line: a } = e, n = [], o = a.segments, i = a.points, r = Xd(t, s);
  r.push(bi({
    x: null,
    y: t.bottom
  }, a));
  for (let l = 0; l < o.length; l++) {
    const d = o[l];
    for (let u = d.start; u <= d.end; u++)
      Gd(n, i[u], r);
  }
  return new zs({
    points: n,
    options: {}
  });
}
function Xd(e, t) {
  const s = [], a = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < a.length; n++) {
    const o = a[n];
    if (o.index === t)
      break;
    o.hidden || s.unshift(o.dataset);
  }
  return s;
}
function Gd(e, t, s) {
  const a = [];
  for (let n = 0; n < s.length; n++) {
    const o = s[n], { first: i, last: r, point: l } = Zd(o, t, "x");
    if (!(!l || i && r)) {
      if (i)
        a.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...a);
}
function Zd(e, t, s) {
  const a = e.interpolate(t, s);
  if (!a)
    return {};
  const n = a[s], o = e.segments, i = e.points;
  let r = !1, l = !1;
  for (let d = 0; d < o.length; d++) {
    const u = o[d], h = i[u.start][s], f = i[u.end][s];
    if (se(n, h, f)) {
      r = n === h, l = n === f;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: a
  };
}
class vi {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, s, a) {
    const { x: n, y: o, radius: i } = this;
    return s = s || {
      start: 0,
      end: mt
    }, t.arc(n, o, i, s.end, s.start, !0), !a.bounds;
  }
  interpolate(t) {
    const { x: s, y: a, radius: n } = this, o = t.angle;
    return {
      x: s + Math.cos(o) * n,
      y: a + Math.sin(o) * n,
      angle: o
    };
  }
}
function Qd(e) {
  const { chart: t, fill: s, line: a } = e;
  if (Ft(s))
    return Jd(t, s);
  if (s === "stack")
    return Kd(e);
  if (s === "shape")
    return !0;
  const n = tu(e);
  return n instanceof vi ? n : bi(n, a);
}
function Jd(e, t) {
  const s = e.getDatasetMeta(t);
  return s && e.isDatasetVisible(t) ? s.dataset : null;
}
function tu(e) {
  return (e.scale || {}).getPointPositionForValue ? su(e) : eu(e);
}
function eu(e) {
  const { scale: t = {}, fill: s } = e, a = Yd(s, t);
  if (Ft(a)) {
    const n = t.isHorizontal();
    return {
      x: n ? a : null,
      y: n ? null : a
    };
  }
  return null;
}
function su(e) {
  const { scale: t, fill: s } = e, a = t.options, n = t.getLabels().length, o = a.reverse ? t.max : t.min, i = qd(s, t, o), r = [];
  if (a.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new vi({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(i)
    });
  }
  for (let l = 0; l < n; ++l)
    r.push(t.getPointPositionForValue(l, i));
  return r;
}
function sa(e, t, s) {
  const a = Qd(t), { chart: n, index: o, line: i, scale: r, axis: l } = t, d = i.options, u = d.fill, h = d.backgroundColor, { above: f = h, below: b = h } = u || {}, p = n.getDatasetMeta(o), _ = ti(n, p);
  a && i.points.length && (Ps(e, s), au(e, {
    line: i,
    target: a,
    above: f,
    below: b,
    area: s,
    scale: r,
    axis: l,
    clip: _
  }), Es(e));
}
function au(e, t) {
  const { line: s, target: a, above: n, below: o, area: i, scale: r, clip: l } = t, d = s._loop ? "angle" : t.axis;
  e.save();
  let u = o;
  o !== n && (d === "x" ? (Xn(e, a, i.top), aa(e, {
    line: s,
    target: a,
    color: n,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), Xn(e, a, i.bottom)) : d === "y" && (Gn(e, a, i.left), aa(e, {
    line: s,
    target: a,
    color: o,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), Gn(e, a, i.right), u = n)), aa(e, {
    line: s,
    target: a,
    color: u,
    scale: r,
    property: d,
    clip: l
  }), e.restore();
}
function Xn(e, t, s) {
  const { segments: a, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], h = n[Vs(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(u.x, s), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(h.x, s);
  }
  e.lineTo(t.first().x, s), e.closePath(), e.clip();
}
function Gn(e, t, s) {
  const { segments: a, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], h = n[Vs(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(s, u.y), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(s, h.y);
  }
  e.lineTo(s, t.first().y), e.closePath(), e.clip();
}
function aa(e, t) {
  const { line: s, target: a, property: n, color: o, scale: i, clip: r } = t, l = Vd(s, a, n);
  for (const { source: d, target: u, start: h, end: f } of l) {
    const { style: { backgroundColor: b = o } = {} } = d, p = a !== !0;
    e.save(), e.fillStyle = b, nu(e, i, r, p && wa(n, h, f)), e.beginPath();
    const _ = !!s.pathSegment(e, d);
    let m;
    if (p) {
      _ ? e.closePath() : Zn(e, a, f, n);
      const g = !!a.pathSegment(e, u, {
        move: _,
        reverse: !0
      });
      m = _ && g, m || Zn(e, a, h, n);
    }
    e.closePath(), e.fill(m ? "evenodd" : "nonzero"), e.restore();
  }
}
function nu(e, t, s, a) {
  const n = t.chart.chartArea, { property: o, start: i, end: r } = a || {};
  if (o === "x" || o === "y") {
    let l, d, u, h;
    o === "x" ? (l = i, d = n.top, u = r, h = n.bottom) : (l = n.left, d = i, u = n.right, h = r), e.beginPath(), s && (l = Math.max(l, s.left), u = Math.min(u, s.right), d = Math.max(d, s.top), h = Math.min(h, s.bottom)), e.rect(l, d, u - l, h - d), e.clip();
  }
}
function Zn(e, t, s, a) {
  const n = t.interpolate(s, a);
  n && e.lineTo(n.x, n.y);
}
var ou = {
  id: "filler",
  afterDatasetsUpdate(e, t, s) {
    const a = (e.data.datasets || []).length, n = [];
    let o, i, r, l;
    for (i = 0; i < a; ++i)
      o = e.getDatasetMeta(i), r = o.dataset, l = null, r && r.options && r instanceof zs && (l = {
        visible: e.isDatasetVisible(i),
        index: i,
        fill: Hd(r, i, a),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = l, n.push(l);
    for (i = 0; i < a; ++i)
      l = n[i], !(!l || l.fill === !1) && (l.fill = Wd(n, i, s.propagate));
  },
  beforeDraw(e, t, s) {
    const a = s.drawTime === "beforeDraw", n = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let i = n.length - 1; i >= 0; --i) {
      const r = n[i].$filler;
      r && (r.line.updateControlPoints(o, r.axis), a && r.fill && sa(e.ctx, r, o));
    }
  },
  beforeDatasetsDraw(e, t, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const a = e.getSortedVisibleDatasetMetas();
    for (let n = a.length - 1; n >= 0; --n) {
      const o = a[n].$filler;
      Kn(o) && sa(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, s) {
    const a = t.meta.$filler;
    !Kn(a) || s.drawTime !== "beforeDatasetDraw" || sa(e.ctx, a, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Qn = (e, t) => {
  let { boxHeight: s = t, boxWidth: a = t } = e;
  return e.usePointStyle && (s = Math.min(s, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: s,
    itemHeight: Math.max(t, s)
  };
}, iu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Jn extends ne {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, s, a) {
    this.maxWidth = t, this.maxHeight = s, this._margins = a, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let s = vt(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (s = s.filter((a) => t.filter(a, this.chart.data))), t.sort && (s = s.sort((a, n) => t.sort(a, n, this.chart.data))), this.options.reverse && s.reverse(), this.legendItems = s;
  }
  fit() {
    const { options: t, ctx: s } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, n = Lt(a.font), o = n.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Qn(a, o);
    let d, u;
    s.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, r, l) + 10) : (u = this.maxHeight, d = this._fitCols(i, n, r, l) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, s, a, n) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let f = -1, b = -u;
    return this.legendItems.forEach((p, _) => {
      const m = a + s / 2 + o.measureText(p.text).width;
      (_ === 0 || d[d.length - 1] + m + 2 * r > i) && (h += u, d[d.length - (_ > 0 ? 0 : 1)] = 0, b += u, f++), l[_] = {
        left: 0,
        top: b,
        row: f,
        width: m,
        height: n
      }, d[d.length - 1] += m + r;
    }), h;
  }
  _fitCols(t, s, a, n) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = r, f = 0, b = 0, p = 0, _ = 0;
    return this.legendItems.forEach((m, g) => {
      const { itemWidth: v, itemHeight: $ } = ru(a, s, o, m, n);
      g > 0 && b + $ + 2 * r > u && (h += f + r, d.push({
        width: f,
        height: b
      }), p += f + r, _++, f = b = 0), l[g] = {
        left: p,
        top: b,
        col: _,
        width: v,
        height: $
      }, f = Math.max(f, v), b += $ + r;
    }), h += f, d.push({
      width: f,
      height: b
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: a, labels: { padding: n }, rtl: o } } = this, i = Te(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = At(a, this.left + n, this.right - this.lineWidths[r]);
      for (const d of s)
        r !== d.row && (r = d.row, l = At(a, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = i.leftForLtr(i.x(l), d.width), l += d.width + n;
    } else {
      let r = 0, l = At(a, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of s)
        d.col !== r && (r = d.col, l = At(a, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = l, d.left += this.left + n, d.left = i.leftForLtr(i.x(d.left), d.width), l += d.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Ps(t, this), this._draw(), Es(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: s, lineWidths: a, ctx: n } = this, { align: o, labels: i } = t, r = kt.color, l = Te(t.rtl, this.left, this.width), d = Lt(i.font), { padding: u } = i, h = d.size, f = h / 2;
    let b;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: p, boxHeight: _, itemHeight: m } = Qn(i, h), g = function(S, C, A) {
      if (isNaN(p) || p <= 0 || isNaN(_) || _ < 0)
        return;
      n.save();
      const P = ot(A.lineWidth, 1);
      if (n.fillStyle = ot(A.fillStyle, r), n.lineCap = ot(A.lineCap, "butt"), n.lineDashOffset = ot(A.lineDashOffset, 0), n.lineJoin = ot(A.lineJoin, "miter"), n.lineWidth = P, n.strokeStyle = ot(A.strokeStyle, r), n.setLineDash(ot(A.lineDash, [])), i.usePointStyle) {
        const E = {
          radius: _ * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: P
        }, R = l.xPlus(S, p / 2), N = C + f;
        Wo(n, E, R, N, i.pointStyleWidth && p);
      } else {
        const E = C + Math.max((h - _) / 2, 0), R = l.leftForLtr(S, p), N = Ae(A.borderRadius);
        n.beginPath(), Object.values(N).some((Y) => Y !== 0) ? Ts(n, {
          x: R,
          y: E,
          w: p,
          h: _,
          radius: N
        }) : n.rect(R, E, p, _), n.fill(), P !== 0 && n.stroke();
      }
      n.restore();
    }, v = function(S, C, A) {
      ss(n, A.text, S, C + m / 2, d, {
        strikethrough: A.hidden,
        textAlign: l.textAlign(A.textAlign)
      });
    }, $ = this.isHorizontal(), k = this._computeTitleHeight();
    $ ? b = {
      x: At(o, this.left + u, this.right - a[0]),
      y: this.top + u + k,
      line: 0
    } : b = {
      x: this.left + u,
      y: At(o, this.top + k + u, this.bottom - s[0].height),
      line: 0
    }, Xo(this.ctx, t.textDirection);
    const w = m + u;
    this.legendItems.forEach((S, C) => {
      n.strokeStyle = S.fontColor, n.fillStyle = S.fontColor;
      const A = n.measureText(S.text).width, P = l.textAlign(S.textAlign || (S.textAlign = i.textAlign)), E = p + f + A;
      let R = b.x, N = b.y;
      l.setWidth(this.width), $ ? C > 0 && R + E + u > this.right && (N = b.y += w, b.line++, R = b.x = At(o, this.left + u, this.right - a[b.line])) : C > 0 && N + w > this.bottom && (R = b.x = R + s[b.line].width + u, b.line++, N = b.y = At(o, this.top + k + u, this.bottom - s[b.line].height));
      const Y = l.x(R);
      if (g(Y, N, S), R = Tr(P, R + p + f, $ ? R + E : this.right, t.rtl), v(l.x(R), N, S), $)
        b.x += E + u;
      else if (typeof S.text != "string") {
        const B = d.lineHeight;
        b.y += mi(S, B) + u;
      } else
        b.y += w;
    }), Go(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, s = t.title, a = Lt(s.font), n = Yt(s.padding);
    if (!s.display)
      return;
    const o = Te(t.rtl, this.left, this.width), i = this.ctx, r = s.position, l = a.size / 2, d = n.top + l;
    let u, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), u = this.top + d, h = At(t.align, h, this.right - f);
    else {
      const p = this.columnSizes.reduce((_, m) => Math.max(_, m.height), 0);
      u = d + At(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const b = At(r, h, h + f);
    i.textAlign = o.textAlign(Ta(r)), i.textBaseline = "middle", i.strokeStyle = s.color, i.fillStyle = s.color, i.font = a.string, ss(i, s.text, b, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, s = Lt(t.font), a = Yt(t.padding);
    return t.display ? s.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, s) {
    let a, n, o;
    if (se(t, this.left, this.right) && se(s, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (n = o[a], se(t, n.left, n.left + n.width) && se(s, n.top, n.top + n.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const s = this.options;
    if (!du(t.type, s))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = iu(n, a);
      n && !o && vt(s.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = a, a && !o && vt(s.onHover, [
        t,
        a,
        this
      ], this);
    } else a && vt(s.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function ru(e, t, s, a, n) {
  const o = lu(a, e, t, s), i = cu(n, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function lu(e, t, s, a) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((o, i) => o.length > i.length ? o : i)), t + s.size / 2 + a.measureText(n).width;
}
function cu(e, t, s) {
  let a = e;
  return typeof t.text != "string" && (a = mi(t, s)), a;
}
function mi(e, t) {
  const s = e.text ? e.text.length : 0;
  return t * s;
}
function du(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Va = {
  id: "legend",
  _element: Jn,
  start(e, t, s) {
    const a = e.legend = new Jn({
      ctx: e.ctx,
      options: s,
      chart: e
    });
    jt.configure(e, a, s), jt.addBox(e, a);
  },
  stop(e) {
    jt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, s) {
    const a = e.legend;
    jt.configure(e, a, s), a.options = s;
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
    onClick(e, t, s) {
      const a = t.datasetIndex, n = s.chart;
      n.isDatasetVisible(a) ? (n.hide(a), t.hidden = !0) : (n.show(a), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: s, pointStyle: a, textAlign: n, color: o, useBorderRadius: i, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const d = l.controller.getStyle(s ? 0 : void 0), u = Yt(d.borderWidth);
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
            pointStyle: a || d.pointStyle,
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
class yi extends ne {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, s) {
    const a = this.options;
    if (this.left = 0, this.top = 0, !a.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = s;
    const n = $t(a.text) ? a.text.length : 1;
    this._padding = Yt(a.padding);
    const o = n * Lt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: s, left: a, bottom: n, right: o, options: i } = this, r = i.align;
    let l = 0, d, u, h;
    return this.isHorizontal() ? (u = At(r, a, o), h = s + t, d = o - a) : (i.position === "left" ? (u = a + t, h = At(r, n, s), l = pt * -0.5) : (u = o - t, h = At(r, s, n), l = pt * 0.5), d = n - s), {
      titleX: u,
      titleY: h,
      maxWidth: d,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, s = this.options;
    if (!s.display)
      return;
    const a = Lt(s.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: d } = this._drawArgs(o);
    ss(t, s.text, 0, 0, a, {
      color: s.color,
      maxWidth: l,
      rotation: d,
      textAlign: Ta(s.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function uu(e, t) {
  const s = new yi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  jt.configure(e, s, t), jt.addBox(e, s), e.titleBlock = s;
}
var _i = {
  id: "title",
  _element: yi,
  start(e, t, s) {
    uu(e, s);
  },
  stop(e) {
    const t = e.titleBlock;
    jt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, s) {
    const a = e.titleBlock;
    jt.configure(e, a, s), a.options = s;
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
const je = {
  average(e) {
    if (!e.length)
      return !1;
    let t, s, a = /* @__PURE__ */ new Set(), n = 0, o = 0;
    for (t = 0, s = e.length; t < s; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        a.add(l.x), n += l.y, ++o;
      }
    }
    return o === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((r, l) => r + l) / a.size,
      y: n / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let s = t.x, a = t.y, n = Number.POSITIVE_INFINITY, o, i, r;
    for (o = 0, i = e.length; o < i; ++o) {
      const l = e[o].element;
      if (l && l.hasValue()) {
        const d = l.getCenterPoint(), u = va(t, d);
        u < n && (n = u, r = l);
      }
    }
    if (r) {
      const l = r.tooltipPosition();
      s = l.x, a = l.y;
    }
    return {
      x: s,
      y: a
    };
  }
};
function Ut(e, t) {
  return t && ($t(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Jt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function hu(e, t) {
  const { element: s, datasetIndex: a, index: n } = t, o = e.getDatasetMeta(a).controller, { label: i, value: r } = o.getLabelAndValue(n);
  return {
    chart: e,
    label: i,
    parsed: o.getParsed(n),
    raw: e.data.datasets[a].data[n],
    formattedValue: r,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: a,
    element: s
  };
}
function to(e, t) {
  const s = e.chart.ctx, { body: a, footer: n, title: o } = e, { boxWidth: i, boxHeight: r } = t, l = Lt(t.bodyFont), d = Lt(t.titleFont), u = Lt(t.footerFont), h = o.length, f = n.length, b = a.length, p = Yt(t.padding);
  let _ = p.height, m = 0, g = a.reduce((k, w) => k + w.before.length + w.lines.length + w.after.length, 0);
  if (g += e.beforeBody.length + e.afterBody.length, h && (_ += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), g) {
    const k = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    _ += b * k + (g - b) * l.lineHeight + (g - 1) * t.bodySpacing;
  }
  f && (_ += t.footerMarginTop + f * u.lineHeight + (f - 1) * t.footerSpacing);
  let v = 0;
  const $ = function(k) {
    m = Math.max(m, s.measureText(k).width + v);
  };
  return s.save(), s.font = d.string, gt(e.title, $), s.font = l.string, gt(e.beforeBody.concat(e.afterBody), $), v = t.displayColors ? i + 2 + t.boxPadding : 0, gt(a, (k) => {
    gt(k.before, $), gt(k.lines, $), gt(k.after, $);
  }), v = 0, s.font = u.string, gt(e.footer, $), s.restore(), m += p.width, {
    width: m,
    height: _
  };
}
function fu(e, t) {
  const { y: s, height: a } = t;
  return s < a / 2 ? "top" : s > e.height - a / 2 ? "bottom" : "center";
}
function gu(e, t, s, a) {
  const { x: n, width: o } = a, i = s.caretSize + s.caretPadding;
  if (e === "left" && n + o + i > t.width || e === "right" && n - o - i < 0)
    return !0;
}
function pu(e, t, s, a) {
  const { x: n, width: o } = s, { width: i, chartArea: { left: r, right: l } } = e;
  let d = "center";
  return a === "center" ? d = n <= (r + l) / 2 ? "left" : "right" : n <= o / 2 ? d = "left" : n >= i - o / 2 && (d = "right"), gu(d, e, t, s) && (d = "center"), d;
}
function eo(e, t, s) {
  const a = s.yAlign || t.yAlign || fu(e, s);
  return {
    xAlign: s.xAlign || t.xAlign || pu(e, t, s, a),
    yAlign: a
  };
}
function bu(e, t) {
  let { x: s, width: a } = e;
  return t === "right" ? s -= a : t === "center" && (s -= a / 2), s;
}
function vu(e, t, s) {
  let { y: a, height: n } = e;
  return t === "top" ? a += s : t === "bottom" ? a -= n + s : a -= n / 2, a;
}
function so(e, t, s, a) {
  const { caretSize: n, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: l } = s, d = n + o, { topLeft: u, topRight: h, bottomLeft: f, bottomRight: b } = Ae(i);
  let p = bu(t, r);
  const _ = vu(t, l, d);
  return l === "center" ? r === "left" ? p += d : r === "right" && (p -= d) : r === "left" ? p -= Math.max(u, f) + n : r === "right" && (p += Math.max(h, b) + n), {
    x: Bt(p, 0, a.width - t.width),
    y: Bt(_, 0, a.height - t.height)
  };
}
function ys(e, t, s) {
  const a = Yt(s.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function ao(e) {
  return Ut([], Jt(e));
}
function mu(e, t, s) {
  return Me(e, {
    tooltip: t,
    tooltipItems: s,
    type: "tooltip"
  });
}
function no(e, t) {
  const s = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return s ? e.override(s) : e;
}
const xi = {
  beforeTitle: Zt,
  title(e) {
    if (e.length > 0) {
      const t = e[0], s = t.chart.data.labels, a = s ? s.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (a > 0 && t.dataIndex < a)
        return s[t.dataIndex];
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
    const s = e.formattedValue;
    return ft(s) || (t += s), t;
  },
  labelColor(e) {
    const s = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: s.borderColor,
      backgroundColor: s.backgroundColor,
      borderWidth: s.borderWidth,
      borderDash: s.borderDash,
      borderDashOffset: s.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const s = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      pointStyle: s.pointStyle,
      rotation: s.rotation
    };
  },
  afterLabel: Zt,
  afterBody: Zt,
  beforeFooter: Zt,
  footer: Zt,
  afterFooter: Zt
};
function Et(e, t, s, a) {
  const n = e[t].call(s, a);
  return typeof n > "u" ? xi[t].call(s, a) : n;
}
class oo extends ne {
  static positioners = je;
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
    const s = this.chart, a = this.options.setContext(this.getContext()), n = a.enabled && s.options.animation && a.animations, o = new ei(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = mu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, s) {
    const { callbacks: a } = s, n = Et(a, "beforeTitle", this, t), o = Et(a, "title", this, t), i = Et(a, "afterTitle", this, t);
    let r = [];
    return r = Ut(r, Jt(n)), r = Ut(r, Jt(o)), r = Ut(r, Jt(i)), r;
  }
  getBeforeBody(t, s) {
    return ao(Et(s.callbacks, "beforeBody", this, t));
  }
  getBody(t, s) {
    const { callbacks: a } = s, n = [];
    return gt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = no(a, o);
      Ut(i.before, Jt(Et(r, "beforeLabel", this, o))), Ut(i.lines, Et(r, "label", this, o)), Ut(i.after, Jt(Et(r, "afterLabel", this, o))), n.push(i);
    }), n;
  }
  getAfterBody(t, s) {
    return ao(Et(s.callbacks, "afterBody", this, t));
  }
  getFooter(t, s) {
    const { callbacks: a } = s, n = Et(a, "beforeFooter", this, t), o = Et(a, "footer", this, t), i = Et(a, "afterFooter", this, t);
    let r = [];
    return r = Ut(r, Jt(n)), r = Ut(r, Jt(o)), r = Ut(r, Jt(i)), r;
  }
  _createItems(t) {
    const s = this._active, a = this.chart.data, n = [], o = [], i = [];
    let r = [], l, d;
    for (l = 0, d = s.length; l < d; ++l)
      r.push(hu(this.chart, s[l]));
    return t.filter && (r = r.filter((u, h, f) => t.filter(u, h, f, a))), t.itemSort && (r = r.sort((u, h) => t.itemSort(u, h, a))), gt(r, (u) => {
      const h = no(t.callbacks, u);
      n.push(Et(h, "labelColor", this, u)), o.push(Et(h, "labelPointStyle", this, u)), i.push(Et(h, "labelTextColor", this, u));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = i, this.dataPoints = r, r;
  }
  update(t, s) {
    const a = this.options.setContext(this.getContext()), n = this._active;
    let o, i = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const r = je[a.position].call(this, n, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const l = this._size = to(this, a), d = Object.assign({}, r, l), u = eo(this.chart, a, d), h = so(a, d, u, this.chart);
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
    this._tooltipItems = i, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: s
    });
  }
  drawCaret(t, s, a, n) {
    const o = this.getCaretPosition(t, a, n);
    s.lineTo(o.x1, o.y1), s.lineTo(o.x2, o.y2), s.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, s, a) {
    const { xAlign: n, yAlign: o } = this, { caretSize: i, cornerRadius: r } = a, { topLeft: l, topRight: d, bottomLeft: u, bottomRight: h } = Ae(r), { x: f, y: b } = t, { width: p, height: _ } = s;
    let m, g, v, $, k, w;
    return o === "center" ? (k = b + _ / 2, n === "left" ? (m = f, g = m - i, $ = k + i, w = k - i) : (m = f + p, g = m + i, $ = k - i, w = k + i), v = m) : (n === "left" ? g = f + Math.max(l, u) + i : n === "right" ? g = f + p - Math.max(d, h) - i : g = this.caretX, o === "top" ? ($ = b, k = $ - i, m = g - i, v = g + i) : ($ = b + _, k = $ + i, m = g + i, v = g - i), w = $), {
      x1: m,
      x2: g,
      x3: v,
      y1: $,
      y2: k,
      y3: w
    };
  }
  drawTitle(t, s, a) {
    const n = this.title, o = n.length;
    let i, r, l;
    if (o) {
      const d = Te(a.rtl, this.x, this.width);
      for (t.x = ys(this, a.titleAlign, a), s.textAlign = d.textAlign(a.titleAlign), s.textBaseline = "middle", i = Lt(a.titleFont), r = a.titleSpacing, s.fillStyle = a.titleColor, s.font = i.string, l = 0; l < o; ++l)
        s.fillText(n[l], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === o && (t.y += a.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, s, a, n, o) {
    const i = this.labelColors[a], r = this.labelPointStyles[a], { boxHeight: l, boxWidth: d } = o, u = Lt(o.bodyFont), h = ys(this, "left", o), f = n.x(h), b = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, p = s.y + b;
    if (o.usePointStyle) {
      const _ = {
        radius: Math.min(d, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, m = n.leftForLtr(f, d) + d / 2, g = p + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, ya(t, _, m, g), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, ya(t, _, m, g);
    } else {
      t.lineWidth = it(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const _ = n.leftForLtr(f, d), m = n.leftForLtr(n.xPlus(f, 1), d - 2), g = Ae(i.borderRadius);
      Object.values(g).some((v) => v !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Ts(t, {
        x: _,
        y: p,
        w: d,
        h: l,
        radius: g
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Ts(t, {
        x: m,
        y: p + 1,
        w: d - 2,
        h: l - 2,
        radius: g
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(_, p, d, l), t.strokeRect(_, p, d, l), t.fillStyle = i.backgroundColor, t.fillRect(m, p + 1, d - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, s, a) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: d, boxPadding: u } = a, h = Lt(a.bodyFont);
    let f = h.lineHeight, b = 0;
    const p = Te(a.rtl, this.x, this.width), _ = function(A) {
      s.fillText(A, p.x(t.x + b), t.y + f / 2), t.y += f + o;
    }, m = p.textAlign(i);
    let g, v, $, k, w, S, C;
    for (s.textAlign = i, s.textBaseline = "middle", s.font = h.string, t.x = ys(this, m, a), s.fillStyle = a.bodyColor, gt(this.beforeBody, _), b = r && m !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, k = 0, S = n.length; k < S; ++k) {
      for (g = n[k], v = this.labelTextColors[k], s.fillStyle = v, gt(g.before, _), $ = g.lines, r && $.length && (this._drawColorBox(s, t, k, p, a), f = Math.max(h.lineHeight, l)), w = 0, C = $.length; w < C; ++w)
        _($[w]), f = h.lineHeight;
      gt(g.after, _);
    }
    b = 0, f = h.lineHeight, gt(this.afterBody, _), t.y -= o;
  }
  drawFooter(t, s, a) {
    const n = this.footer, o = n.length;
    let i, r;
    if (o) {
      const l = Te(a.rtl, this.x, this.width);
      for (t.x = ys(this, a.footerAlign, a), t.y += a.footerMarginTop, s.textAlign = l.textAlign(a.footerAlign), s.textBaseline = "middle", i = Lt(a.footerFont), s.fillStyle = a.footerColor, s.font = i.string, r = 0; r < o; ++r)
        s.fillText(n[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, s, a, n) {
    const { xAlign: o, yAlign: i } = this, { x: r, y: l } = t, { width: d, height: u } = a, { topLeft: h, topRight: f, bottomLeft: b, bottomRight: p } = Ae(n.cornerRadius);
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, s.lineWidth = n.borderWidth, s.beginPath(), s.moveTo(r + h, l), i === "top" && this.drawCaret(t, s, a, n), s.lineTo(r + d - f, l), s.quadraticCurveTo(r + d, l, r + d, l + f), i === "center" && o === "right" && this.drawCaret(t, s, a, n), s.lineTo(r + d, l + u - p), s.quadraticCurveTo(r + d, l + u, r + d - p, l + u), i === "bottom" && this.drawCaret(t, s, a, n), s.lineTo(r + b, l + u), s.quadraticCurveTo(r, l + u, r, l + u - b), i === "center" && o === "left" && this.drawCaret(t, s, a, n), s.lineTo(r, l + h), s.quadraticCurveTo(r, l, r + h, l), s.closePath(), s.fill(), n.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(t) {
    const s = this.chart, a = this.$animations, n = a && a.x, o = a && a.y;
    if (n || o) {
      const i = je[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = to(this, t), l = Object.assign({}, i, this._size), d = eo(s, t, l), u = so(t, l, d, s);
      (n._to !== u.x || o._to !== u.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = r.width, this.height = r.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const s = this.options.setContext(this.getContext());
    let a = this.opacity;
    if (!a)
      return;
    this._updateAnimationTarget(s);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    a = Math.abs(a) < 1e-3 ? 0 : a;
    const i = Yt(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, n, s), Xo(t, s.textDirection), o.y += i.top, this.drawTitle(o, t, s), this.drawBody(o, t, s), this.drawFooter(o, t, s), Go(t, s.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, s) {
    const a = this._active, n = t.map(({ datasetIndex: r, index: l }) => {
      const d = this.chart.getDatasetMeta(r);
      if (!d)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: d.data[l],
        index: l
      };
    }), o = !Cs(a, n), i = this._positionChanged(n, s);
    (o || i) && (this._active = n, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, s, a = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], i = this._getActiveElements(t, o, s, a), r = this._positionChanged(i, t), l = s || !Cs(i, o) || r;
    return l && (this._active = i, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, s))), l;
  }
  _getActiveElements(t, s, a, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return s.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, o.mode, o, a);
    return o.reverse && i.reverse(), i;
  }
  _positionChanged(t, s) {
    const { caretX: a, caretY: n, options: o } = this, i = je[o.position].call(this, t, s);
    return i !== !1 && (a !== i.x || n !== i.y);
  }
}
var Na = {
  id: "tooltip",
  _element: oo,
  positioners: je,
  afterInit(e, t, s) {
    s && (e.tooltip = new oo({
      chart: e,
      options: s
    }));
  },
  beforeUpdate(e, t, s) {
    e.tooltip && e.tooltip.initialize(s);
  },
  reset(e, t, s) {
    e.tooltip && e.tooltip.initialize(s);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const s = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", {
        ...s,
        cancelable: !0
      }) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", s);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const s = t.replay;
      e.tooltip.handleEvent(t.event, s, t.inChartArea) && (t.changed = !0);
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
    callbacks: xi
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
const yu = (e, t, s, a) => (typeof t == "string" ? (s = e.push(t) - 1, a.unshift({
  index: s,
  label: t
})) : isNaN(t) && (s = null), s);
function _u(e, t, s, a) {
  const n = e.indexOf(t);
  if (n === -1)
    return yu(e, t, s, a);
  const o = e.lastIndexOf(t);
  return n !== o ? s : n;
}
const xu = (e, t) => e === null ? null : Bt(Math.round(e), 0, t);
function io(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class ki extends Fe {
  static id = "category";
  static defaults = {
    ticks: {
      callback: io
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const s = this._addedLabels;
    if (s.length) {
      const a = this.getLabels();
      for (const { index: n, label: o } of s)
        a[n] === o && a.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, s) {
    if (ft(t))
      return null;
    const a = this.getLabels();
    return s = isFinite(s) && a[s] === t ? s : _u(a, t, ot(s, t), this._addedLabels), xu(s, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: s } = this.getUserBounds();
    let { min: a, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), s || (n = this.getLabels().length - 1)), this.min = a, this.max = n;
  }
  buildTicks() {
    const t = this.min, s = this.max, a = this.options.offset, n = [];
    let o = this.getLabels();
    o = t === 0 && s === o.length - 1 ? o : o.slice(t, s + 1), this._valueRange = Math.max(o.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let i = t; i <= s; i++)
      n.push({
        value: i
      });
    return n;
  }
  getLabelForValue(t) {
    return io.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const s = this.ticks;
    return t < 0 || t > s.length - 1 ? null : this.getPixelForValue(s[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function ku(e, t) {
  const s = [], { bounds: n, step: o, min: i, max: r, precision: l, count: d, maxTicks: u, maxDigits: h, includeBounds: f } = e, b = o || 1, p = u - 1, { min: _, max: m } = t, g = !ft(i), v = !ft(r), $ = !ft(d), k = (m - _) / (h + 1);
  let w = en((m - _) / p / b) * b, S, C, A, P;
  if (w < 1e-14 && !g && !v)
    return [
      {
        value: _
      },
      {
        value: m
      }
    ];
  P = Math.ceil(m / w) - Math.floor(_ / w), P > p && (w = en(P * w / p / b) * b), ft(l) || (S = Math.pow(10, l), w = Math.ceil(w * S) / S), n === "ticks" ? (C = Math.floor(_ / w) * w, A = Math.ceil(m / w) * w) : (C = _, A = m), g && v && o && xr((r - i) / o, w / 1e3) ? (P = Math.round(Math.min((r - i) / w, u)), w = (r - i) / P, C = i, A = r) : $ ? (C = g ? i : C, A = v ? r : A, P = d - 1, w = (A - C) / P) : (P = (A - C) / w, Ue(P, Math.round(P), w / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const E = Math.max(sn(w), sn(C));
  S = Math.pow(10, ft(l) ? E : l), C = Math.round(C * S) / S, A = Math.round(A * S) / S;
  let R = 0;
  for (g && (f && C !== i ? (s.push({
    value: i
  }), C < i && R++, Ue(Math.round((C + R * w) * S) / S, i, ro(i, k, e)) && R++) : C < i && R++); R < P; ++R) {
    const N = Math.round((C + R * w) * S) / S;
    if (v && N > r)
      break;
    s.push({
      value: N
    });
  }
  return v && f && A !== r ? s.length && Ue(s[s.length - 1].value, r, ro(r, k, e)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!v || A === r) && s.push({
    value: A
  }), s;
}
function ro(e, t, { horizontal: s, minRotation: a }) {
  const n = ee(a), o = (s ? Math.sin(n) : Math.cos(n)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class wu extends Fe {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, s) {
    return ft(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: s, maxDefined: a } = this.getUserBounds();
    let { min: n, max: o } = this;
    const i = (l) => n = s ? n : l, r = (l) => o = a ? o : l;
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
    let { maxTicksLimit: s, stepSize: a } = t, n;
    return a ? (n = Math.ceil(this.max / a) - Math.floor(this.min / a) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), s = s || 11), s && (n = Math.min(s, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, s = t.ticks;
    let a = this.getTickLimit();
    a = Math.max(2, a);
    const n = {
      maxTicks: a,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: s.precision,
      step: s.stepSize,
      count: s.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: s.minRotation || 0,
      includeBounds: s.includeBounds !== !1
    }, o = this._range || this, i = ku(n, o);
    return t.bounds === "ticks" && kr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let s = this.min, a = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (a - s) / Math.max(t.length - 1, 1) / 2;
      s -= n, a += n;
    }
    this._startValue = s, this._endValue = a, this._valueRange = a - s;
  }
  getLabelForValue(t) {
    return La(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class wi extends wu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: No.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: s } = this.getMinMax(!0);
    this.min = Ft(t) ? t : 0, this.max = Ft(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), s = t ? this.width : this.height, a = ee(this.options.ticks.minRotation), n = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Ns = {
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
}, Rt = /* @__PURE__ */ Object.keys(Ns);
function lo(e, t) {
  return e - t;
}
function co(e, t) {
  if (ft(t))
    return null;
  const s = e._adapter, { parser: a, round: n, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), Ft(i) || (i = typeof a == "string" ? s.parse(i, a) : s.parse(i)), i === null ? null : (n && (i = n === "week" && (Je(o) || o === !0) ? s.startOf(i, "isoWeek", o) : s.startOf(i, n)), +i);
}
function uo(e, t, s, a) {
  const n = Rt.length;
  for (let o = Rt.indexOf(e); o < n - 1; ++o) {
    const i = Ns[Rt[o]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((s - t) / (r * i.size)) <= a)
      return Rt[o];
  }
  return Rt[n - 1];
}
function $u(e, t, s, a, n) {
  for (let o = Rt.length - 1; o >= Rt.indexOf(s); o--) {
    const i = Rt[o];
    if (Ns[i].common && e._adapter.diff(n, a, i) >= t - 1)
      return i;
  }
  return Rt[s ? Rt.indexOf(s) : 0];
}
function Mu(e) {
  for (let t = Rt.indexOf(e) + 1, s = Rt.length; t < s; ++t)
    if (Ns[Rt[t]].common)
      return Rt[t];
}
function ho(e, t, s) {
  if (!s)
    e[t] = !0;
  else if (s.length) {
    const { lo: a, hi: n } = Aa(s, t), o = s[a] >= t ? s[a] : s[n];
    e[o] = !0;
  }
}
function Su(e, t, s, a) {
  const n = e._adapter, o = +n.startOf(t[0].value, a), i = t[t.length - 1].value;
  let r, l;
  for (r = o; r <= i; r = +n.add(r, 1, a))
    l = s[r], l >= 0 && (t[l].major = !0);
  return t;
}
function fo(e, t, s) {
  const a = [], n = {}, o = t.length;
  let i, r;
  for (i = 0; i < o; ++i)
    r = t[i], n[r] = i, a.push({
      value: r,
      major: !1
    });
  return o === 0 || !s ? a : Su(e, a, n, s);
}
class go extends Fe {
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
  init(t, s = {}) {
    const a = t.time || (t.time = {}), n = this._adapter = new lc._date(t.adapters.date);
    n.init(s), qe(a.displayFormats, n.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = s.normalized;
  }
  parse(t, s) {
    return t === void 0 ? null : co(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, s = this._adapter, a = t.time.unit || "day";
    let { min: n, max: o, minDefined: i, maxDefined: r } = this.getUserBounds();
    function l(d) {
      !i && !isNaN(d.min) && (n = Math.min(n, d.min)), !r && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = Ft(n) && !isNaN(n) ? n : +s.startOf(Date.now(), a), o = Ft(o) && !isNaN(o) ? o : +s.endOf(Date.now(), a) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let s = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
    return t.length && (s = t[0], a = t[t.length - 1]), {
      min: s,
      max: a
    };
  }
  buildTicks() {
    const t = this.options, s = t.time, a = t.ticks, n = a.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, i = this.max, r = Cr(n, o, i);
    return this._unit = s.unit || (a.autoSkip ? uo(s.minUnit, this.min, this.max, this._getLabelCapacity(o)) : $u(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Mu(this._unit), this.initOffsets(n), t.reverse && r.reverse(), fo(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let s = 0, a = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? s = 1 - n : s = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    s = Bt(s, 0, i), a = Bt(a, 0, i), this._offsets = {
      start: s,
      end: a,
      factor: 1 / (s + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, s = this.min, a = this.max, n = this.options, o = n.time, i = o.unit || uo(o.minUnit, s, a, this._getLabelCapacity(s)), r = ot(n.ticks.stepSize, 1), l = i === "week" ? o.isoWeekday : !1, d = Je(l) || l === !0, u = {};
    let h = s, f, b;
    if (d && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, d ? "day" : i), t.diff(a, s, i) > 1e5 * r)
      throw new Error(s + " and " + a + " are too far apart with stepSize of " + r + " " + i);
    const p = n.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, b = 0; f < a; f = +t.add(f, r, i), b++)
      ho(u, f, p);
    return (f === a || n.bounds === "ticks" || b === 1) && ho(u, f, p), Object.keys(u).sort(lo).map((_) => +_);
  }
  getLabelForValue(t) {
    const s = this._adapter, a = this.options.time;
    return a.tooltipFormat ? s.format(t, a.tooltipFormat) : s.format(t, a.displayFormats.datetime);
  }
  format(t, s) {
    const n = this.options.time.displayFormats, o = this._unit, i = s || n[o];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, s, a, n) {
    const o = this.options, i = o.ticks.callback;
    if (i)
      return vt(i, [
        t,
        s,
        a
      ], this);
    const r = o.time.displayFormats, l = this._unit, d = this._majorUnit, u = l && r[l], h = d && r[d], f = a[s], b = d && h && f && f.major;
    return this._adapter.format(t, n || (b ? h : u));
  }
  generateTickLabels(t) {
    let s, a, n;
    for (s = 0, a = t.length; s < a; ++s)
      n = t[s], n.label = this._tickFormatFunction(n.value, s, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const s = this._offsets, a = this.getDecimalForValue(t);
    return this.getPixelForDecimal((s.start + a) * s.factor);
  }
  getValueForPixel(t) {
    const s = this._offsets, a = this.getDecimalForPixel(t) / s.factor - s.end;
    return this.min + a * (this.max - this.min);
  }
  _getLabelSize(t) {
    const s = this.options.ticks, a = this.ctx.measureText(t).width, n = ee(this.isHorizontal() ? s.maxRotation : s.minRotation), o = Math.cos(n), i = Math.sin(n), r = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + r * i,
      h: a * i + r * o
    };
  }
  _getLabelCapacity(t) {
    const s = this.options.time, a = s.displayFormats, n = a[s.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, fo(this, [
      t
    ], this._majorUnit), n), i = this._getLabelSize(o), r = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], s, a;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (s = 0, a = n.length; s < a; ++s)
      t = t.concat(n[s].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let s, a;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (s = 0, a = n.length; s < a; ++s)
      t.push(co(this, n[s]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Io(t.sort(lo));
  }
}
function _s(e, t, s) {
  let a = 0, n = e.length - 1, o, i, r, l;
  s ? (t >= e[a].pos && t <= e[n].pos && ({ lo: a, hi: n } = xe(e, "pos", t)), { pos: o, time: r } = e[a], { pos: i, time: l } = e[n]) : (t >= e[a].time && t <= e[n].time && ({ lo: a, hi: n } = xe(e, "time", t)), { time: o, pos: r } = e[a], { time: i, pos: l } = e[n]);
  const d = i - o;
  return d ? r + (l - r) * (t - o) / d : r;
}
class HM extends go {
  static id = "timeseries";
  static defaults = go.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(t);
    this._minPos = _s(s, this.min), this._tableRange = _s(s, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: s, max: a } = this, n = [], o = [];
    let i, r, l, d, u;
    for (i = 0, r = t.length; i < r; ++i)
      d = t[i], d >= s && d <= a && n.push(d);
    if (n.length < 2)
      return [
        {
          time: s,
          pos: 0
        },
        {
          time: a,
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
    const t = this.min, s = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(t) || !a.length) && a.splice(0, 0, t), (!a.includes(s) || a.length === 1) && a.push(s), a.sort((n, o) => n - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const s = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return s.length && a.length ? t = this.normalize(s.concat(a)) : t = s.length ? s : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (_s(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets, a = this.getDecimalForPixel(t) / s.factor - s.end;
    return _s(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const $i = {
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
}, Cu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Du = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...$i,
  ...Cu
}, Au = Pi[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function De(e) {
  return So(e) ? pa(e) : e;
}
function Tu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return So(t) ? new Proxy(e, {}) : e;
}
function Bu(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function Mi(e, t) {
  e.labels = t;
}
function Si(e, t, s) {
  const a = [];
  e.datasets = t.map((n) => {
    const o = e.datasets.find((i) => i[s] === n[s]);
    return !o || !n.data || a.includes(o) ? {
      ...n
    } : (a.push(o), Object.assign(o, n), o);
  });
}
function Lu(e, t) {
  const s = {
    labels: [],
    datasets: []
  };
  return Mi(s, e.labels), Si(s, e.datasets, t), s;
}
const Fu = J({
  props: Du,
  setup(e, t) {
    let { expose: s, slots: a } = t;
    const n = st(null), o = Mo(null);
    s({
      chart: o
    });
    const i = () => {
      if (!n.value) return;
      const { type: d, data: u, options: h, plugins: f, datasetIdKey: b } = e, p = Lu(u, b), _ = Tu(p, u);
      o.value = new Pe(n.value, {
        type: d,
        data: _,
        options: {
          ...h
        },
        plugins: f
      });
    }, r = () => {
      const d = pa(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, l = (d) => {
      d.update(e.updateMode);
    };
    return he(i), ns(r), Vt([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, f] = d, [b, p] = u;
      const _ = pa(o.value);
      if (!_)
        return;
      let m = !1;
      if (h) {
        const g = De(h), v = De(b);
        g && g !== v && (Bu(_, g), m = !0);
      }
      if (f) {
        const g = De(f.labels), v = De(p.labels), $ = De(f.datasets), k = De(p.datasets);
        g !== v && (Mi(_.config.data, g), m = !0), $ && $ !== k && (Si(_.config.data, $, e.datasetIdKey), m = !0);
      }
      m && St(() => {
        l(_);
      });
    }, {
      deep: !0
    }), () => ga("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: n
    }, [
      ga("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function Wa(e, t) {
  return Pe.register(t), J({
    props: $i,
    setup(s, a) {
      let { expose: n } = a;
      const o = Mo(null), i = (r) => {
        o.value = r?.chart;
      };
      return n({
        chart: o
      }), () => ga(Fu, Au({
        ref: i
      }, {
        type: e,
        ...s
      }));
    }
  });
}
const Pu = /* @__PURE__ */ Wa("bar", ac), Eu = /* @__PURE__ */ Wa("line", ic), Ru = /* @__PURE__ */ Wa("pie", rc), po = {
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
}, bo = {
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
}, Ou = [
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
  const t = st("light");
  let s = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = D(() => e?.value ? e.value : t.value), o = D(() => n.value === "dark"), i = D(() => o.value ? bo : po), r = () => {
    typeof document > "u" || (t.value = a(), s = new MutationObserver((d) => {
      for (const u of d)
        u.attributeName === "class" && (t.value = a());
    }), s.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    s && (s.disconnect(), s = null);
  };
  return he(() => {
    r();
  }), ns(() => {
    l();
  }), e && Vt(e, () => {
  }), {
    isDark: o,
    currentTheme: n,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: po,
    darkColors: bo,
    chartSeriesColors: Ou
  };
}
const Iu = { class: "chart-container" }, zu = /* @__PURE__ */ J({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Pe.register(
      ki,
      wi,
      zd,
      _i,
      Na,
      Va
    );
    const { isDark: a, colors: n } = lt(rt(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
              let d = String(i(l.dataset.label || ""));
              return d && (d += ": "), l.parsed.y !== null && (d += l.parsed.y), d;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: !0,
          stacked: s.stacked || !1,
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
          stacked: s.stacked || !1,
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
    return t({ isDark: a }), (l, d) => (y(), x("div", Iu, [
      X(T(Pu), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), nt = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [a, n] of t)
    s[a] = n;
  return s;
}, ae = /* @__PURE__ */ nt(zu, [["__scopeId", "data-v-105d8c6f"]]), Vu = { class: "chart-container" }, Nu = /* @__PURE__ */ J({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Pe.register(
      ki,
      wi,
      Fd,
      zs,
      _i,
      Na,
      Va,
      ou
    );
    const { isDark: a, colors: n } = lt(rt(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
          backgroundColor: a.value ? "#1a1a1d" : "#ffffff",
          hoverBorderWidth: 3
        }
      }
    });
    return t({ isDark: a }), (l, d) => (y(), x("div", Vu, [
      X(T(Eu), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), fe = /* @__PURE__ */ nt(Nu, [["__scopeId", "data-v-bacd3848"]]), Wu = { class: "chart-container" }, Hu = /* @__PURE__ */ J({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Pe.register(wd, Na, Va);
    const { isDark: a, colors: n } = lt(rt(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      cutout: s.doughnut ? "60%" : 0,
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
                const f = l.getDatasetMeta(0), b = d.datasets[0], p = b.data[h], _ = Array.isArray(b.backgroundColor) ? b.backgroundColor[h] : b.backgroundColor;
                return {
                  text: `${i(u)}: ${p}`,
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
              const d = l.label || "", u = l.parsed || 0, h = l.dataset.data.reduce((b, p) => b + p, 0), f = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${f}%)`;
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
    return t({ isDark: a }), (l, d) => (y(), x("div", Wu, [
      X(T(Ru), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Ws = /* @__PURE__ */ nt(Hu, [["__scopeId", "data-v-23a84317"]]), ju = { class: "chart-container" }, Yu = ["viewBox"], qu = ["transform"], Uu = ["x", "width", "fill", "stroke"], Ku = ["fill"], Xu = ["x1", "y1", "x2", "y2", "stroke"], Gu = ["points", "fill"], Zu = ["x1", "y1", "x2", "y2", "stroke"], Qu = ["x", "y", "fill"], Ju = ["x1", "y1", "x2", "y2", "stroke"], th = ["points", "fill"], eh = ["transform"], sh = ["y1", "y2"], ah = ["y1", "y2"], nh = ["y1", "y2"], oh = ["y1", "y2"], ih = ["y", "height"], rh = ["y1", "y2"], lh = ["y1", "y2"], ch = ["y1", "y2"], dh = ["y1", "y2"], uh = ["y", "height"], hh = ["cy", "stroke", "onMouseenter"], fh = ["cy", "stroke", "onMouseenter"], gh = ["cy", "stroke", "onMouseenter"], ph = ["cy", "stroke", "onMouseenter"], bh = ["y1", "y2", "onMouseenter"], vh = ["y1", "y2", "onMouseenter"], mh = ["x", "y", "fill"], yh = ["x", "y", "fill"], _h = ["transform"], xh = { transform: "translate(-200, 0)" }, kh = ["stroke"], wh = ["fill"], $h = { transform: "translate(-130, 0)" }, Mh = ["stroke"], Sh = ["fill"], Ch = { transform: "translate(-60, 0)" }, Dh = ["stroke"], Ah = ["fill"], Th = { transform: "translate(10, 0)" }, Bh = ["stroke"], Lh = ["fill"], Fh = { transform: "translate(80, 0)" }, Ph = ["fill"], Eh = { transform: "translate(150, 0)" }, Rh = ["fill"], Oh = /* @__PURE__ */ J({
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
    const s = e, { isDark: a } = lt(rt(s, "theme")), n = D(() => ({
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
    })), o = st({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, b) => {
      const p = f.currentTarget.closest("svg");
      if (!p) return;
      const _ = p.getBoundingClientRect(), m = p.createSVGPoint();
      m.x = f.clientX - _.left, m.y = f.clientY - _.top, o.value = {
        visible: !0,
        x: m.x,
        y: m.y - 20,
        text: b
      };
    }, l = (f) => {
      if (o.value.visible) {
        const b = f.currentTarget, p = b.getBoundingClientRect(), _ = b.createSVGPoint();
        _.x = f.clientX - p.left, _.y = f.clientY - p.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const f = [], p = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const m = _, g = (m - 1) / 9, v = s.chartMargin + p - g * p;
        f.push({ value: m, y: v });
      }
      return f;
    });
    return t({ isDark: a }), (f, b) => (y(), x("div", ju, [
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
          }, null, 8, Uu),
          c("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, M(o.value.text), 9, Ku)
        ], 8, qu)) : O("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Xu),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Gu),
        (y(!0), x(q, null, Z(h.value, (p, _) => (y(), x(q, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Zu),
          c("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(p.value), 9, Qu)
        ], 64))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Ju),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, th),
        (y(!0), x(q, null, Z(e.boxplotData, (p, _) => (y(), x(q, { key: _ }, [
          c("g", {
            transform: `translate(${p.centerX}, 0)`
          }, [
            p.isTotal ? (y(), x(q, { key: 0 }, [
              c("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, sh),
              c("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ah),
              c("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, nh),
              c("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, oh),
              c("rect", {
                x: -24,
                y: p.q3Y,
                width: "48",
                height: p.q1Y - p.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, ih)
            ], 64)) : (y(), x(q, { key: 1 }, [
              c("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, rh),
              c("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, lh),
              c("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ch),
              c("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, dh),
              c("rect", {
                x: -24,
                y: p.q3Y,
                width: "48",
                height: p.q1Y - p.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, uh)
            ], 64)),
            c("circle", {
              cx: 0,
              cy: p.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Min: ${p.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, hh),
            c("circle", {
              cx: 0,
              cy: p.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Q1: ${p.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, fh),
            c("circle", {
              cx: 0,
              cy: p.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Q3: ${p.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, gh),
            c("circle", {
              cx: 0,
              cy: p.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Max: ${p.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ph),
            c("line", {
              x1: -24,
              y1: p.medianY,
              x2: 24,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (m) => r(m, `Median: ${p.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, bh),
            p.averageY ? (y(), x("line", {
              key: 2,
              x1: -24,
              y1: p.averageY,
              x2: 24,
              y2: p.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (m) => r(m, `Avg: ${p.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vh)) : O("", !0)
          ], 8, eh),
          c("text", {
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(i(p.label)), 9, mh),
          p.responseCount ? (y(), x("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(p.responseCount), 9, yh)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", xh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, kh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, wh)
          ]),
          c("g", $h, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Mh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Sh)
          ]),
          c("g", Ch, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Dh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Ah)
          ]),
          c("g", Th, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Bh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Lh)
          ]),
          c("g", Fh, [
            b[0] || (b[0] = c("line", {
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
            }, " Avg ", 8, Ph)
          ]),
          c("g", Eh, [
            b[1] || (b[1] = c("line", {
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
            }, " Median ", 8, Rh)
          ])
        ], 8, _h)) : O("", !0)
      ], 44, Yu))
    ]));
  }
}), Ih = /* @__PURE__ */ nt(Oh, [["__scopeId", "data-v-520c623f"]]), zh = { class: "chart-container" }, Vh = ["viewBox"], Nh = ["transform"], Wh = ["x", "y", "width", "height", "fill", "stroke"], Hh = ["y", "fill"], jh = ["y", "fill"], Yh = ["x1", "y1", "x2", "y2", "stroke"], qh = ["points", "fill"], Uh = ["x1", "y1", "x2", "y2", "stroke"], Kh = ["x1", "y1", "x2", "y2", "stroke"], Xh = ["x", "y", "fill"], Gh = ["x", "y", "fill", "transform"], Zh = ["x1", "y1", "x2", "y2", "stroke"], Qh = ["points", "fill"], Jh = ["transform"], tf = ["y1", "y2", "stroke", "onMouseenter"], ef = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], sf = ["x1", "y1", "x2", "y2", "onMouseenter"], af = ["x1", "y1", "x2", "y2", "onMouseenter"], nf = ["cy", "stroke", "onMouseenter"], of = ["cy", "stroke", "onMouseenter"], rf = ["x", "y", "fill"], lf = ["x", "y", "fill"], cf = ["transform"], df = { transform: "translate(-180, 0)" }, uf = ["stroke"], hf = ["fill"], ff = { transform: "translate(-120, 0)" }, gf = ["fill"], pf = { transform: "translate(-60, 0)" }, bf = ["fill"], vf = { transform: "translate(0, 0)" }, mf = ["stroke"], yf = ["fill"], _f = { transform: "translate(60, 0)" }, xf = ["fill"], kf = { transform: "translate(130, 0)" }, wf = ["fill"], $f = /* @__PURE__ */ J({
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
    const s = e, { isDark: a } = lt(rt(s, "theme")), n = D(() => ({
      // Tooltip
      tooltipBg: a.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: a.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: a.value ? "#d1d5db" : "#e2e8f0",
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
    })), o = st({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, b, p) => {
      const _ = f.currentTarget.closest("svg");
      if (!_) return;
      const m = _.getBoundingClientRect(), g = _.createSVGPoint();
      g.x = f.clientX - m.left, g.y = f.clientY - m.top;
      let v = i(b.label), $ = "";
      switch (p) {
        case "body":
          $ = `Q1: ${b.q1.toFixed(1)} | Q3: ${b.q3.toFixed(1)}`;
          break;
        case "wick":
          $ = `Min: ${b.low.toFixed(1)} | Max: ${b.high.toFixed(1)}`;
          break;
        case "median":
          $ = `Median: ${b.median.toFixed(1)}`;
          break;
        case "average":
          $ = `Average: ${b.average?.toFixed(1)}`;
          break;
        case "min":
          $ = `Min: ${b.low.toFixed(1)}`;
          break;
        case "max":
          $ = `Max: ${b.high.toFixed(1)}`;
          break;
      }
      const k = Math.max(180, $.length * 7 + 40), w = 48;
      o.value = {
        visible: !0,
        x: g.x,
        y: g.y - 20,
        title: v,
        text: $,
        width: k,
        height: w
      };
    }, l = (f) => {
      if (o.value.visible) {
        const b = f.currentTarget, p = b.getBoundingClientRect(), _ = b.createSVGPoint();
        _.x = f.clientX - p.left, _.y = f.clientY - p.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const f = [], p = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const m = _, g = (m - 1) / 9, v = s.chartMargin + p - g * p;
        f.push({ value: m, y: v });
      }
      return f;
    });
    return t({ isDark: a }), (f, b) => (y(), x("div", zh, [
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
          }, null, 8, Wh),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.title), 9, Hh),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.text), 9, jh)
        ], 8, Nh)) : O("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Yh),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, qh),
        (y(!0), x(q, null, Z(h.value, (p, _) => (y(), x("line", {
          key: `grid-${_}`,
          x1: e.chartMargin,
          y1: p.y,
          x2: e.chartWidth - e.chartMargin,
          y2: p.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Uh))), 128)),
        (y(!0), x(q, null, Z(h.value, (p, _) => (y(), x(q, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Kh),
          c("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(p.value), 9, Xh)
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
        }, M(i(e.yAxisLabel)), 9, Gh),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Zh),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, Qh),
        (y(!0), x(q, null, Z(e.candlestickData, (p, _) => (y(), x(q, { key: _ }, [
          c("g", {
            transform: `translate(${p.centerX}, 0)`
          }, [
            c("line", {
              x1: 0,
              y1: p.highY,
              x2: 0,
              y2: p.lowY,
              stroke: p.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (m) => r(m, p, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, tf),
            c("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(p.q1Y, p.q3Y) - (Math.abs(p.q3Y - p.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(p.q3Y - p.q1Y)),
              fill: p.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: p.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (m) => r(m, p, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ef),
            p.medianY ? (y(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: p.medianY,
              x2: e.candleWidth / 2,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (m) => r(m, p, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, sf)) : O("", !0),
            p.averageY ? (y(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: p.averageY,
              x2: e.candleWidth / 2,
              y2: p.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (m) => r(m, p, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, af)) : O("", !0),
            c("circle", {
              cx: 0,
              cy: p.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, p, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, nf),
            c("circle", {
              cx: 0,
              cy: p.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, p, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, of)
          ], 8, Jh),
          c("text", {
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(i(p.label)), 9, rf),
          p.responseCount ? (y(), x("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(p.responseCount), 9, lf)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", df, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, uf),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, hf)
          ]),
          c("g", ff, [
            b[0] || (b[0] = c("rect", {
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
            }, " Q1 ", 8, gf)
          ]),
          c("g", pf, [
            b[1] || (b[1] = c("rect", {
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
            }, " Q3 ", 8, bf)
          ]),
          c("g", vf, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, mf),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, yf)
          ]),
          c("g", _f, [
            b[2] || (b[2] = c("line", {
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
            }, " Avg ", 8, xf)
          ]),
          c("g", kf, [
            b[3] || (b[3] = c("line", {
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
            }, " Median ", 8, wf)
          ])
        ], 8, cf)) : O("", !0)
      ], 44, Vh))
    ]));
  }
}), Ci = /* @__PURE__ */ nt($f, [["__scopeId", "data-v-61d0259c"]]), Mf = { class: "chart-container" }, Sf = ["viewBox"], Cf = ["transform"], Df = ["x", "y", "width", "height", "fill", "stroke"], Af = ["y", "fill"], Tf = ["y", "fill"], Bf = ["x1", "y1", "x2", "y2", "stroke"], Lf = ["x1", "y1", "x2", "y2", "stroke"], Ff = ["points", "fill"], Pf = ["x1", "y1", "x2", "y2", "stroke"], Ef = ["x", "y", "fill"], Rf = ["x", "y", "fill", "transform"], Of = ["x1", "y1", "x2", "y2", "stroke"], If = ["points", "fill"], zf = ["x1", "y1", "x2", "y2", "stroke"], Vf = ["x", "y", "fill"], Nf = ["x", "y", "fill"], Wf = ["d"], Hf = ["x", "y", "width", "height", "onMouseenter"], jf = ["x1", "y1", "x2", "y2"], Yf = ["x", "y"], qf = ["x1", "y1", "x2", "y2"], Uf = ["x", "y"], Kf = ["x1", "y1", "x2", "y2"], Xf = ["x", "y"], Gf = ["x1", "y1", "x2", "y2"], Zf = ["x", "y"], Qf = ["x1", "y1", "x2", "y2"], Jf = ["x", "y"], tg = ["x1", "y1", "x2", "y2"], eg = ["x", "y"], sg = ["transform"], ag = { transform: "translate(-220, 0)" }, ng = ["fill"], og = { transform: "translate(-140, 0)" }, ig = ["fill"], rg = { transform: "translate(-80, 0)" }, lg = ["fill"], cg = { transform: "translate(-20, 0)" }, dg = ["fill"], ug = { transform: "translate(60, 0)" }, hg = ["fill"], fg = { transform: "translate(130, 0)" }, gg = ["fill"], pg = { transform: "translate(180, 0)" }, bg = ["fill"], vg = /* @__PURE__ */ J({
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
    const s = e, { isDark: a } = lt(rt(s, "theme")), n = D(() => ({
      // Tooltip
      tooltipBg: a.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: a.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: a.value ? "#d1d5db" : "#e2e8f0",
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
    })), o = st({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = D(() => s.chartWidth - s.chartMargin * 2), r = D(() => s.chartHeight - s.chartMargin - s.chartBottomMargin), l = D(() => i.value / 10 * 0.6), d = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const W = Math.max(...s.histogram.map((H) => H.count || 0), 1), V = Math.max(1, Math.ceil(W * 0.2));
      return W + V;
    }), u = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const W = s.averageScore || 0;
      let V = 0, H = 0;
      if (s.histogram.forEach((tt) => {
        const K = tt.count || 0;
        V += K;
        const ht = tt.score - W;
        H += K * (ht * ht);
      }), V === 0) return 1;
      const et = H / V;
      return Math.sqrt(et) || 1;
    }), h = (W, V, H) => {
      if (H === 0) return 0;
      const et = 1 / (H * Math.sqrt(2 * Math.PI)), tt = -0.5 * Math.pow((W - V) / H, 2);
      return et * Math.exp(tt);
    }, f = D(() => {
      if (!s.histogram || s.histogram.length === 0 || s.averageScore === 0 && u.value === 0) return null;
      const W = s.averageScore, V = u.value, H = 100, tt = Math.max(...s.histogram.map((ut) => ut.count || 0), 1) / d.value * r.value;
      if (tt <= 0) return null;
      let K = 0;
      for (let ut = 0; ut <= H; ut++) {
        const Ct = 1 + 9 * (ut / H), Pt = h(Ct, W, V);
        Pt > K && (K = Pt);
      }
      if (K <= 0) return null;
      const ht = tt / K, _t = [];
      for (let ut = 0; ut <= H; ut++) {
        const Ct = 1 + 9 * (ut / H), Pt = h(Ct, W, V) * ht, Nt = p(Ct);
        if (Nt !== null) {
          const L = s.chartHeight - s.chartBottomMargin - Pt;
          _t.push(`${ut === 0 ? "M" : "L"} ${Nt} ${L}`);
        }
      }
      return _t.join(" ");
    }), b = D(() => {
      if (!s.histogram || s.histogram.length === 0) return [];
      const W = i.value / 10;
      return s.histogram.map((V, H) => {
        const et = s.chartMargin + (H + 0.5) * W, tt = V.count > 0 ? V.count / d.value * r.value : 0, K = s.chartHeight - s.chartBottomMargin - tt;
        return {
          score: V.score,
          count: V.count,
          x: et,
          y: K,
          height: tt
        };
      });
    }), p = (W) => {
      if (W < 1 || W > 10) return null;
      const V = i.value / 10;
      return s.chartMargin + (W - 0.5) * V;
    }, _ = D(() => p(s.minScore)), m = D(() => p(s.maxScore)), g = D(() => p(s.q1Score)), v = D(() => p(s.medianScore)), $ = D(() => p(s.q3Score)), k = D(() => p(s.averageScore)), w = D(() => s.minScore), S = D(() => s.maxScore), C = D(() => s.q1Score), A = D(() => s.medianScore), P = D(() => s.q3Score), E = D(() => s.averageScore), R = D(() => {
      const W = [], V = s.chartMargin - 8, H = 18;
      g.value !== null && W.push({
        x: g.value,
        y: V,
        value: s.q1Score,
        label: `Q1: ${C.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), v.value !== null && W.push({
        x: v.value,
        y: V - H,
        value: s.medianScore,
        label: `Median: ${A.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), k.value !== null && W.push({
        x: k.value,
        y: V - H,
        value: s.averageScore,
        label: `Avg: ${E.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), $.value !== null && W.push({
        x: $.value,
        y: V,
        value: s.q3Score,
        label: `Q3: ${P.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), W.sort((K, ht) => (K.x || 0) - (ht.x || 0));
      const et = [[], [], []];
      W.forEach((K) => {
        if (K.x === null) return;
        let ht = -1;
        for (let _t = 0; _t < et.length; _t++) {
          let ut = !1;
          for (const Ct of et[_t]) {
            if (Ct.x === null) continue;
            const Pt = Math.abs(K.x - Ct.x), Nt = (K.width + Ct.width) / 2 + 10;
            if (Pt < Nt) {
              ut = !0;
              break;
            }
          }
          if (!ut) {
            ht = _t;
            break;
          }
        }
        ht === -1 && (ht = et.length - 1), K.y = V - ht * H, et[ht].push(K);
      });
      const tt = 15;
      return W.forEach((K) => {
        K.y < tt && (K.y = tt);
      }), W;
    }), N = (W) => R.value.find((H) => H.id === W)?.y || s.chartMargin - 10, Y = D(() => {
      const W = [];
      for (let H = 0; H <= 5; H++) {
        const et = Math.round(d.value / 5 * H), tt = s.chartHeight - s.chartBottomMargin - H / 5 * r.value;
        W.push({ value: et, y: tt });
      }
      return W;
    }), B = (W, V) => {
      const H = W.currentTarget.closest("svg");
      if (!H) return;
      const et = H.getBoundingClientRect(), tt = H.createSVGPoint();
      tt.x = W.clientX - et.left, tt.y = W.clientY - et.top;
      const K = `Score: ${V.score}`, ht = `Count: ${V.count}`, _t = 120, ut = 48;
      o.value = {
        visible: !0,
        x: tt.x,
        y: tt.y - 20,
        title: K,
        text: ht,
        width: _t,
        height: ut
      };
    }, F = (W) => {
      if (o.value.visible) {
        const V = W.currentTarget, H = V.getBoundingClientRect(), et = V.createSVGPoint();
        et.x = W.clientX - H.left, et.y = W.clientY - H.top, o.value.x = et.x, o.value.y = et.y - 20;
      }
    }, I = () => {
      o.value.visible = !1;
    }, z = () => {
      o.value.visible = !1;
    };
    return t({ isDark: a }), (W, V) => (y(), x("div", Mf, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: xt(`min-height: ${e.chartHeight}px;`),
        onMousemove: F,
        onMouseleave: I
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
          }, null, 8, Df),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.title), 9, Af),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.text), 9, Tf)
        ], 8, Cf)) : O("", !0),
        (y(!0), x(q, null, Z(Y.value, (H, et) => (y(), x("line", {
          key: `grid-${et}`,
          x1: e.chartMargin,
          y1: H.y,
          x2: e.chartWidth - e.chartMargin,
          y2: H.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Bf))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Lf),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Ff),
        (y(!0), x(q, null, Z(Y.value, (H, et) => (y(), x(q, {
          key: `y-tick-${et}`
        }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: H.y,
            x2: e.chartMargin,
            y2: H.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Pf),
          c("text", {
            x: e.chartMargin - 12,
            y: H.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(H.value), 9, Ef)
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
        }, " Count ", 8, Rf),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Of),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, If),
        (y(!0), x(q, null, Z(b.value, (H, et) => (y(), x(q, {
          key: `tick-${et}`
        }, [
          c("line", {
            x1: H.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: H.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, zf),
          c("text", {
            x: H.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(H.score), 9, Vf)
        ], 64))), 128)),
        c("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Nf),
        f.value ? (y(), x("path", {
          key: 1,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Wf)) : O("", !0),
        (y(!0), x(q, null, Z(b.value, (H, et) => (y(), x("rect", {
          key: `bar-${et}`,
          x: H.x - l.value / 2,
          y: H.y,
          width: l.value,
          height: H.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (tt) => B(tt, H),
          onMouseleave: z,
          style: { cursor: "pointer" }
        }, null, 40, Hf))), 128)),
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
        }, null, 8, jf)) : O("", !0),
        _.value ? (y(), x("text", {
          key: 3,
          x: _.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + M(w.value.toFixed(1)), 9, Yf)) : O("", !0),
        g.value ? (y(), x("line", {
          key: 4,
          x1: g.value,
          y1: e.chartMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, qf)) : O("", !0),
        g.value ? (y(), x("text", {
          key: 5,
          x: g.value,
          y: N("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + M(C.value.toFixed(1)), 9, Uf)) : O("", !0),
        v.value ? (y(), x("line", {
          key: 6,
          x1: v.value,
          y1: e.chartMargin,
          x2: v.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Kf)) : O("", !0),
        v.value ? (y(), x("text", {
          key: 7,
          x: v.value,
          y: N("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + M(A.value.toFixed(1)), 9, Xf)) : O("", !0),
        k.value ? (y(), x("line", {
          key: 8,
          x1: k.value,
          y1: e.chartMargin,
          x2: k.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Gf)) : O("", !0),
        k.value ? (y(), x("text", {
          key: 9,
          x: k.value,
          y: N("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + M(E.value.toFixed(1)), 9, Zf)) : O("", !0),
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
        }, null, 8, Qf)) : O("", !0),
        $.value ? (y(), x("text", {
          key: 11,
          x: $.value,
          y: N("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + M(P.value.toFixed(1)), 9, Jf)) : O("", !0),
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
        }, null, 8, tg)) : O("", !0),
        m.value ? (y(), x("text", {
          key: 13,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + M(S.value.toFixed(1)), 9, eg)) : O("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          c("g", ag, [
            V[0] || (V[0] = c("line", {
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
            }, " Gaussian ", 8, ng)
          ]),
          c("g", og, [
            V[1] || (V[1] = c("line", {
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
            }, " Min ", 8, ig)
          ]),
          c("g", rg, [
            V[2] || (V[2] = c("line", {
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
            }, " Q1 ", 8, lg)
          ]),
          c("g", cg, [
            V[3] || (V[3] = c("line", {
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
            }, " Median ", 8, dg)
          ]),
          c("g", ug, [
            V[4] || (V[4] = c("line", {
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
            }, " Avg ", 8, hg)
          ]),
          c("g", fg, [
            V[5] || (V[5] = c("line", {
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
            }, " Q3 ", 8, gg)
          ]),
          c("g", pg, [
            V[6] || (V[6] = c("line", {
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
            }, " Max ", 8, bg)
          ])
        ], 8, sg)) : O("", !0)
      ], 44, Sf))
    ]));
  }
}), Di = /* @__PURE__ */ nt(vg, [["__scopeId", "data-v-64e657d9"]]), mg = { class: "chart-container" }, yg = {
  key: 1,
  class: "chart-wrapper"
}, _g = /* @__PURE__ */ J({
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
    Ua.use([Ii, zi, Vi, Ni]);
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = st(null), i = st(!0), r = st(!1);
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
      const $ = s.data.links.filter(
        (C) => C.source && C.target && typeof C.value == "number"
      ), k = Math.max(...$.map((C) => C.value), 1), w = Math.max(1, k * 0.01), S = $.map((C) => ({
        ...C,
        originalValue: C.value,
        value: C.value < k * 0.01 ? w : C.value
      }));
      return {
        nodes: s.data.nodes.filter((C) => C.name),
        links: S
      };
    }, f = ($) => $.map((k, w) => ({
      ...k,
      itemStyle: {
        color: s.nodeColors[k.name] || u[w % u.length],
        borderRadius: 8
      }
    })), b = ($) => (k) => {
      const w = k.dataType === "node", S = n.value.tooltipText, C = a.value ? "#d1d5db" : "#e2e8f0";
      if (w) {
        const N = $.filter((F) => F.target === k.name), Y = $.filter((F) => F.source === k.name), B = N.length > 0 ? N.reduce((F, I) => F + (I.originalValue || I.value), 0) : Y.reduce((F, I) => F + (I.originalValue || I.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${k.name}</div><div style="color: ${C}; font-size: 12px;">Count: ${B.toLocaleString()}</div>`;
      }
      const A = k.data?.source || k.source || "Unknown", P = k.data?.target || k.target || "Unknown", E = k.data?.originalValue || k.data?.value || k.value || 0, R = k.data?.label || `${E.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${A} → ${P}</div><div style="color: ${C}; font-size: 12px;">Flow: ${R}</div>`;
    }, p = () => {
      if (!(!l || !s.data.nodes?.length || !s.data.links?.length))
        try {
          const { nodes: $, links: k } = h(), w = f($), S = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: b(k),
              backgroundColor: n.value.tooltipBg,
              borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
                data: w,
                links: k,
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
                  color: s.useGradient ? "gradient" : "source",
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
                  formatter: (C) => {
                    const A = C.name || "";
                    return A.length > 15 ? `${A.substring(0, 15)}...` : A;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: n.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (C) => {
                    const A = C.data?.originalValue || C.value || 0;
                    return C.data?.label || `${A.toLocaleString()}`;
                  }
                },
                nodeAlign: d.node.align,
                nodeGap: s.nodeGap,
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
          l.setOption(S);
        } catch ($) {
          console.error("Error setting Sankey chart options:", $), r.value = !0;
        }
    }, _ = async () => {
      if (o.value)
        try {
          l = Ua.init(o.value), p(), window.addEventListener("resize", g);
        } catch ($) {
          console.error("Error initializing Sankey chart:", $), r.value = !0;
        } finally {
          i.value = !1;
        }
    }, m = async ($ = 40) => {
      await St();
      for (let k = 0; k < $; k++) {
        if (o.value?.clientWidth && o.value.clientWidth > 0 && o.value?.clientHeight && o.value.clientHeight > 0)
          return await _();
        await new Promise((w) => setTimeout(w, 50));
      }
      await _(), setTimeout(g, 50);
    }, g = () => l?.resize(), v = () => {
      window.removeEventListener("resize", g), l && (l.dispose(), l = null);
    };
    return he(() => o.value && m()), Co(v), Vt(() => s.data, p, { deep: !0 }), Vt(a, p), t({ isDark: a }), ($, k) => (y(), x("div", mg, [
      r.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: xt({ height: e.height })
      }, [...k[0] || (k[0] = [
        Q('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", yg, [
        Xt(c("div", {
          ref_key: "chartEl",
          ref: o,
          class: "chart-content",
          style: xt({ height: e.height })
        }, null, 4), [
          [Ms, !i.value]
        ]),
        Xt(c("div", {
          class: "loading-state",
          style: xt({ height: e.height })
        }, [...k[1] || (k[1] = [
          Q('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [Ms, i.value]
        ])
      ]))
    ]));
  }
}), ge = /* @__PURE__ */ nt(_g, [["__scopeId", "data-v-d6d61034"]]);
function xg(e, t) {
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
function kg(e, t) {
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
function wg(e, t) {
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
function Ot(e, t) {
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
function $g(e, t) {
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
function Mg(e, t) {
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
function Sg(e, t) {
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
function Cg(e, t) {
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
function vo(e, t) {
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
function Dg(e, t) {
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
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
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
      d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
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
      d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
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
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const Fg = { class: "chart-footer" }, Pg = { class: "export-actions" }, Eg = { class: "export-buttons" }, Rg = ["disabled"], Og = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Ig = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, zg = ["disabled"], Vg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Ng = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Wg = /* @__PURE__ */ J({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = (i) => s.formats.includes(i), o = (i) => {
      s.loading || a("export", i);
    };
    return (i, r) => (y(), x("footer", Fg, [
      r[9] || (r[9] = c("div", { class: "footer-divider" }, null, -1)),
      c("div", Pg, [
        r[8] || (r[8] = c("span", { class: "export-label" }, "Export", -1)),
        c("div", Eg, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: at(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => o("pdf"))
          }, [
            e.loading ? (y(), x("svg", Og, [...r[2] || (r[2] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Ig, [...r[3] || (r[3] = [
              Q('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = c("span", null, "PDF", -1))
          ], 10, Rg)) : O("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: at(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => o("csv"))
          }, [
            e.loading ? (y(), x("svg", Vg, [...r[5] || (r[5] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Ng, [...r[6] || (r[6] = [
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
          ], 10, zg)) : O("", !0)
        ])
      ])
    ]));
  }
}), yt = /* @__PURE__ */ nt(Wg, [["__scopeId", "data-v-672661d4"]]), Hg = { class: "agents-per-day-card" }, jg = {
  key: 0,
  class: "card-body"
}, Yg = {
  key: 0,
  class: "chart-section"
}, qg = {
  key: 1,
  class: "empty-state"
}, Ug = { class: "empty-state-content" }, Kg = { class: "empty-icon-wrapper" }, Xg = {
  key: 1,
  class: "loading-state"
}, Gg = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
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
    }, n = e, o = s, i = (f) => {
      o("export", f);
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = (f) => {
      const b = new Date(f), p = String(b.getDate()).padStart(2, "0"), _ = String(b.getMonth() + 1).padStart(2, "0");
      return `${p}-${_}`;
    }, u = D(() => {
      const f = n.data?.agents_by_day || {}, b = Object.keys(f).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const p = b.map(($) => d($)), _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(f))
        for (const k of Object.keys($))
          _.add(k);
      const m = Array.from(_), g = ($) => $, v = m.map(($) => ({
        label: $,
        data: b.map((k) => f[k]?.[$] || 0),
        backgroundColor: `${a[$] || "#94a3b8"}80`,
        borderColor: g(a[$] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: p,
        datasets: v
      };
    }), h = D(() => n.options ? n.options : {
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
    return t({ isDark: r }), (f, b) => (y(), x("article", Hg, [
      b[3] || (b[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          c("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Xg, [...b[2] || (b[2] = [
        Q('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", jg, [
        u.value.labels && u.value.labels.length ? (y(), x("section", Yg, [
          X(ae, {
            data: u.value,
            options: h.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", qg, [
          c("div", Ug, [
            c("div", Kg, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            b[0] || (b[0] = c("p", { class: "empty-title" }, "No agents data per day", -1)),
            b[1] || (b[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Zg = /* @__PURE__ */ nt(Gg, [["__scopeId", "data-v-4d18c22c"]]), j = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), dt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Qg = { class: "booking-manager-card" }, Jg = { class: "card-header" }, tp = { class: "header-content" }, ep = {
  key: 0,
  class: "payment-success-badge"
}, sp = {
  key: 0,
  class: "currency-breakdown-list"
}, ap = {
  key: 1,
  class: "badge-value"
}, np = {
  key: 0,
  class: "loading-state"
}, op = {
  key: 1,
  class: "error-state"
}, ip = { class: "error-content" }, rp = { class: "error-description" }, lp = {
  key: 2,
  class: "card-body"
}, cp = { class: "chart-section" }, dp = { class: "chart-wrapper" }, up = {
  key: 0,
  class: "table-section"
}, hp = { class: "table-wrapper" }, fp = { class: "data-table" }, gp = { class: "table-body" }, pp = { class: "table-cell font-medium" }, bp = { class: "table-cell text-center" }, vp = { class: "table-cell text-center" }, mp = { class: "percentage-text" }, yp = { class: "table-cell text-center" }, _p = { class: "table-cell" }, xp = { class: "badges-container" }, kp = { class: "badge badge-success" }, wp = { class: "badge badge-error" }, $p = { class: "table-cell" }, Mp = {
  key: 0,
  class: "badges-container"
}, Sp = {
  key: 1,
  class: "percentage-text"
}, Cp = { class: "table-cell" }, Dp = { class: "badges-container" }, Ap = { class: "badge badge-error" }, Tp = { class: "badge badge-warning" }, Bp = { class: "badge badge-yellow" }, Lp = { class: "badge badge-error" }, Fp = {
  key: 1,
  class: "empty-state"
}, na = 3, Pp = /* @__PURE__ */ J({
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
    const s = e, a = t, n = (m) => {
      a("export", m);
    }, o = st(!1), i = D(() => s.data?.booking_manager_by_day ? [...s.data.booking_manager_by_day].sort(
      (m, g) => new Date(m.date).getTime() - new Date(g.date).getTime()
    ) : []), r = D(() => o.value ? i.value : i.value.slice(0, na)), l = D(() => i.value.length > na), d = D(() => s.data?.total_payment_success_value || []), u = (m) => m.payment_success_value || [], h = (m) => typeof m.payment_success_count == "number" ? m.payment_success_count : (m.payment_success_value || []).reduce((g, v) => g + (v.count || 0), 0), f = (m) => dt(m), b = D(() => {
      const m = s.data, g = m.total_booking_initiated || 0, v = m.total_booking_started || 0, $ = m.total_payment_initiated || 0, k = m.total_not_found || 0, w = m.total_cancelled || 0, S = m.total_no_pending_balance || 0, C = m.total_errors || 0, A = typeof m.total_payment_success == "number" ? m.total_payment_success : (m.total_payment_success_value || []).reduce((F, I) => F + (I.count || 0), 0), P = m.total_payment_failed || 0, E = Math.max(0, g - v), R = Math.max(0, v - $ - k - w - S - C), N = (F, I) => {
        const z = I > 0 ? Math.round(F / I * 100) : 0;
        return `${F.toLocaleString()} (${z}%)`;
      }, Y = [
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
      ], B = [];
      return v > 0 && B.push({
        source: "Initiated",
        target: "Started",
        value: v,
        label: N(v, g)
      }), E > 0 && B.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: E,
        label: N(E, g)
      }), $ > 0 && B.push({
        source: "Started",
        target: "Payment Initiated",
        value: $,
        label: N($, v)
      }), k > 0 && B.push({
        source: "Started",
        target: "Not Found",
        value: k,
        label: N(k, v)
      }), w > 0 && B.push({
        source: "Started",
        target: "Cancelled",
        value: w,
        label: N(w, v)
      }), S > 0 && B.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: N(S, v)
      }), C > 0 && B.push({
        source: "Started",
        target: "Errors",
        value: C,
        label: N(C, v)
      }), R > 0 && B.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: R,
        label: N(R, v)
      }), A > 0 && B.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: A,
        label: N(A, $)
      }), P > 0 && B.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: P,
        label: N(P, $)
      }), { nodes: Y, links: B };
    }), p = {
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
    }, _ = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`;
    return (m, g) => (y(), x("article", Qg, [
      c("header", Jg, [
        c("div", tp, [
          g[2] || (g[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Booking Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          s.loading ? O("", !0) : (y(), x("div", ep, [
            g[1] || (g[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", sp, [
              (y(!0), x(q, null, Z(d.value, (v) => (y(), x("p", {
                key: v.currency,
                class: "currency-breakdown-item"
              }, M(v.currency) + " " + M(f(v.total_value)), 1))), 128))
            ])) : (y(), x("p", ap, M(f(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", np, [...g[3] || (g[3] = [
        Q('<div class="loading-container" data-v-15d5c773><div class="chart-flow-loader" data-v-15d5c773><div class="flow-line flow-1" data-v-15d5c773></div><div class="flow-line flow-2" data-v-15d5c773></div><div class="flow-line flow-3" data-v-15d5c773></div><div class="flow-line flow-4" data-v-15d5c773></div><div class="flow-line flow-5" data-v-15d5c773></div></div><p class="loading-text" data-v-15d5c773>Loading booking data...</p></div>', 1)
      ])])) : s.error ? (y(), x("div", op, [
        c("div", ip, [
          g[4] || (g[4] = c("div", { class: "error-icon-wrapper" }, [
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
          g[5] || (g[5] = c("p", { class: "error-title" }, "Error loading data", -1)),
          c("p", rp, M(s.error), 1)
        ])
      ])) : (y(), x("div", lp, [
        c("section", cp, [
          c("div", dp, [
            X(ge, {
              data: b.value,
              "node-colors": p,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", up, [
          g[8] || (g[8] = c("div", { class: "section-header" }, [
            c("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          c("div", hp, [
            c("table", fp, [
              g[6] || (g[6] = c("thead", null, [
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
              c("tbody", gp, [
                (y(!0), x(q, null, Z(r.value, (v) => (y(), x("tr", {
                  key: v.date,
                  class: "table-row"
                }, [
                  c("td", pp, M(T(Tt)(v.date).format("DD/MM/YYYY")), 1),
                  c("td", bp, M(T(j)(v.booking_initiated_count)), 1),
                  c("td", vp, [
                    wt(M(T(j)(v.booking_started_count)) + " ", 1),
                    c("span", mp, " (" + M(_(v.booking_started_count, v.booking_initiated_count)) + ") ", 1)
                  ]),
                  c("td", yp, M(T(j)(v.payment_initiated_count)), 1),
                  c("td", _p, [
                    c("div", xp, [
                      c("span", kp, " Success: " + M(T(j)(h(v))), 1),
                      c("span", wp, " Failed: " + M(T(j)(v.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  c("td", $p, [
                    u(v).length > 0 ? (y(), x("div", Mp, [
                      (y(!0), x(q, null, Z(u(v), ($) => (y(), x("span", {
                        key: `${v.date}-${$.currency}`,
                        class: "badge badge-currency"
                      }, M($.currency) + " " + M(f($.total_value)), 1))), 128))
                    ])) : (y(), x("span", Sp, "N/A"))
                  ]),
                  c("td", Cp, [
                    c("div", Dp, [
                      c("span", Ap, " Not Found: " + M(v.not_found_count ? T(j)(v.not_found_count) : "N/A"), 1),
                      c("span", Tp, " Cancelled: " + M(v.cancelled_count ? T(j)(v.cancelled_count) : "N/A"), 1),
                      c("span", Bp, " No Balance: " + M(v.no_pending_balance_count ? T(j)(v.no_pending_balance_count) : "N/A"), 1),
                      c("span", Lp, " Errors: " + M(v.error_count ? T(j)(v.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          l.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (v) => o.value = !o.value)
          }, [
            wt(M(o.value ? "View less" : `View more (${i.value.length - na} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: at(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...g[7] || (g[7] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : O("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", Fp, [...g[9] || (g[9] = [
          Q('<div class="empty-state-content" data-v-15d5c773><div class="empty-icon-wrapper" data-v-15d5c773><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-15d5c773><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-15d5c773></path></svg></div><p class="empty-title" data-v-15d5c773>No booking manager data available</p><p class="empty-description" data-v-15d5c773>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ep = /* @__PURE__ */ nt(Pp, [["__scopeId", "data-v-15d5c773"]]), Rp = { class: "checkin-metrics-card" }, Op = {
  key: 0,
  class: "loading-state"
}, Ip = {
  key: 1,
  class: "card-body"
}, zp = {
  key: 0,
  class: "chart-section"
}, Vp = { class: "chart-wrapper" }, Np = {
  key: 1,
  class: "table-section"
}, Wp = { class: "table-wrapper" }, Hp = { class: "data-table" }, jp = { class: "table-body" }, Yp = { class: "table-cell font-medium" }, qp = { class: "table-cell text-center" }, Up = { class: "table-cell text-center" }, Kp = { class: "table-cell text-center" }, Xp = { class: "table-cell text-center" }, Gp = { class: "table-cell text-center" }, Zp = { class: "table-cell text-center" }, Qp = { class: "table-cell text-left" }, Jp = {
  key: 0,
  class: "failed-steps"
}, t0 = { class: "step-name" }, e0 = { class: "step-count" }, s0 = {
  key: 1,
  class: "empty-cell"
}, a0 = {
  key: 2,
  class: "empty-state"
}, n0 = {
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
    const s = t, a = (m) => {
      s("export", m);
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
    }, r = st([]), l = D(() => {
      const m = n.data;
      return m && (Array.isArray(m.checkin_by_day) && m.checkin_by_day.length > 0 || (m.total_checkin_initiated ?? 0) > 0) ? { ...o, ...m } : n.checkinData ?? o;
    }), d = D(() => {
      const m = n.data;
      return m && (Array.isArray(m.failed_by_step_by_day) && m.failed_by_step_by_day.length > 0 || Array.isArray(m.unrecovered_by_step) && m.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: m.total_checkin_failed ?? 0,
        total_checkin_unrecovered: m.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: m.failed_by_step_by_day ?? [],
        unrecovered_by_step: m.unrecovered_by_step ?? [],
        unrecovered_by_day: m.unrecovered_by_day ?? []
      } : n.failedData ?? i;
    }), u = D(() => {
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
      return (d.value.unrecovered_by_step || []).forEach((v) => {
        const k = v.step_name.replace(/_/g, " ").split(" ").map((S) => S.charAt(0).toUpperCase() + S.slice(1)).join(" "), w = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        m[k] = w[k] || "#DC2626";
      }), m;
    }), h = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, f = (m, g) => {
      const v = j(m), $ = h(m, g);
      return `${v} (${$})`;
    }, b = (m) => m.reduce((g, v) => g + v.failed_count, 0), p = D(() => {
      const m = [], g = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: m, links: g };
      m.push({ name: "Checkin Init" }), m.push({ name: "Booking retrive" }), m.push({ name: "Booking retrive success" }), m.push({ name: "Number of Passengers" }), m.push({ name: "Completed" }), m.push({ name: "Closed with BP" });
      const v = l.value.total_checkin_initiated, $ = l.value.total_checkin_init, k = l.value.total_checkin_init_abandoned, w = $ - k, S = l.value.total_checkin_started, C = l.value.total_checkin_completed, A = l.value.total_checkin_closed, P = d.value.unrecovered_by_step || [], E = P.reduce((B, F) => B + F.count, 0);
      if ($ > 0) {
        const B = Math.round($ / v * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: $,
          label: `${$.toLocaleString()} (${B}%)`
        });
      }
      const R = v - $;
      if (R > 0) {
        const B = Math.round(R / v * 100);
        m.push({ name: "Abandoned (Init)" }), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: R,
          label: `${R.toLocaleString()} (${B}%)`
        });
      }
      if (k > 0) {
        const B = Math.round(k / v * 100);
        m.push({ name: "Abandoned (Started)" }), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: k,
          label: `${k.toLocaleString()} (${B}%)`
        });
      }
      if (w > 0) {
        const B = Math.round(w / v * 100);
        g.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: w,
          label: `${w.toLocaleString()} (${B}%)`
        });
      }
      if (S > 0) {
        const B = Math.round(S / v * 100);
        g.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: S,
          label: `${S.toLocaleString()} (${B}%)`
        });
      }
      if (C > 0) {
        const B = Math.round(C / S * 100);
        g.push({
          source: "Number of Passengers",
          target: "Completed",
          value: C,
          label: `${C.toLocaleString()} (${B}%)`
        });
      }
      if (P.length > 0 && E > 0) {
        m.push({ name: "Unrecovered" });
        const B = Math.round(E / S * 100);
        g.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: E,
          label: `${E.toLocaleString()} (${B}%)`
        }), P.forEach((F) => {
          const z = F.step_name.replace(/_/g, " ").split(" ").map((V) => V.charAt(0).toUpperCase() + V.slice(1)).join(" "), W = Math.round(F.count / S * 100);
          m.push({ name: z }), g.push({
            source: "Unrecovered",
            target: z,
            value: F.count,
            label: `${F.count.toLocaleString()} (${W}%)`
          });
        });
      }
      const N = S - (C + E);
      if (N > 0) {
        const B = Math.round(N / S * 100);
        m.push({ name: "Abandoned (Flow)" }), g.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${B}%)`
        });
      }
      const Y = C - A;
      if (Y > 0) {
        const B = Math.round(Y / S * 100);
        m.push({ name: "BP Error" }), g.push({
          source: "Completed",
          target: "BP Error",
          value: Y,
          label: `${Y.toLocaleString()} (${B}%)`
        });
      }
      if (A > 0) {
        const B = Math.round(A / S * 100);
        g.push({
          source: "Completed",
          target: "Closed with BP",
          value: A,
          label: `${A.toLocaleString()} (${B}%)`
        });
      }
      return { nodes: m, links: g };
    }), _ = () => {
      const m = l.value.checkin_by_day || [], g = d.value.failed_by_step_by_day || [];
      if (m.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...m].map((v) => {
        const $ = g.find(
          (k) => k.date === v.date
        );
        return {
          ...v,
          failed_steps: $?.steps || []
        };
      }), r.value.sort((v, $) => new Date(v.date) - new Date($.date));
    };
    return Vt(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (m, g) => (y(), x("article", Rp, [
      g[3] || (g[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", Op, [...g[0] || (g[0] = [
        Q('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", Ip, [
        p.value.nodes.length > 0 ? (y(), x("section", zp, [
          c("div", Vp, [
            X(ge, {
              data: p.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : O("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", Np, [
          c("div", Wp, [
            c("table", Hp, [
              g[1] || (g[1] = c("thead", null, [
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
              c("tbody", jp, [
                (y(!0), x(q, null, Z(r.value, (v) => (y(), x("tr", {
                  key: v.date,
                  class: "table-row"
                }, [
                  c("td", Yp, M(T(Tt)(v.date).format("DD/MM/YYYY")), 1),
                  c("td", qp, M(T(j)(v.checkin_initiated_count)), 1),
                  c("td", Up, M(f(v.checkin_init_count, v.checkin_initiated_count)), 1),
                  c("td", Kp, M(T(j)(v.checkin_started_count)), 1),
                  c("td", Xp, M(f(v.checkin_completed_count, v.checkin_started_count)), 1),
                  c("td", Gp, M(f(v.checkin_closed_count, v.checkin_started_count)), 1),
                  c("td", Zp, M(f(b(v.failed_steps), v.checkin_started_count)), 1),
                  c("td", Qp, [
                    v.failed_steps && v.failed_steps.length > 0 ? (y(), x("div", Jp, [
                      (y(!0), x(q, null, Z(v.failed_steps, ($) => (y(), x("div", {
                        key: $.step_name,
                        class: "failed-step-item"
                      }, [
                        c("span", t0, M($.step_name.replace(/_/g, " ")) + ":", 1),
                        c("span", e0, M($.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", s0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", a0, [...g[2] || (g[2] = [
          Q('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, o0 = /* @__PURE__ */ nt(n0, [["__scopeId", "data-v-d527da09"]]), i0 = { class: "checkin-metrics-card" }, r0 = {
  key: 0,
  class: "loading-state"
}, l0 = {
  key: 1,
  class: "card-body"
}, c0 = {
  key: 0,
  class: "sankey-section"
}, d0 = {
  key: 1,
  class: "table-section"
}, u0 = { class: "table-wrapper" }, h0 = { class: "data-table" }, f0 = { class: "table-body" }, g0 = { class: "table-cell date-cell" }, p0 = { class: "table-cell text-center" }, b0 = { class: "table-cell text-center" }, v0 = { class: "table-cell text-center" }, m0 = { class: "table-cell text-center" }, y0 = { class: "table-cell text-center" }, _0 = { class: "table-cell text-center" }, x0 = { class: "table-cell reasons-cell" }, k0 = {
  key: 0,
  class: "reasons-list"
}, w0 = { class: "reason-name" }, $0 = { class: "reason-count" }, M0 = {
  key: 1,
  class: "no-reasons"
}, S0 = {
  key: 2,
  class: "empty-state"
}, C0 = { class: "empty-state-content" }, D0 = { class: "empty-icon-wrapper" }, oa = 3, A0 = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = ($) => {
      n("export", $);
    }, { isDark: i } = lt(rt(a, "theme")), r = ($) => $ == null ? "0" : $.toLocaleString(), l = ($) => {
      const k = new Date($), w = String(k.getDate()).padStart(2, "0"), S = String(k.getMonth() + 1).padStart(2, "0"), C = k.getFullYear();
      return `${w}/${S}/${C}`;
    }, d = ($) => $.replace(/_/g, " ").replace(/\b\w/g, (k) => k.toUpperCase()), u = ($, k) => !k || k === 0 ? "0%" : `${Math.round($ / k * 100)}%`, h = ($, k) => {
      const w = $ || 0, S = k || 0, C = r(w), A = u(w, S);
      return `${C} (${A})`;
    }, f = ($) => $ ? $.reduce((k, w) => k + w.failed_count, 0) : 0, b = D(() => {
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
      return (a.failedData?.unrecovered_by_step || []).forEach((w) => {
        const C = w.step_name.replace(/_/g, " ").split(" ").map((P) => P.charAt(0).toUpperCase() + P.slice(1)).join(" "), A = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        $[C] = A[C] || "#DC2626";
      }), $;
    }), p = st(!1), _ = D(() => {
      const $ = a.checkinData?.checkin_by_day || [], k = a.failedData?.failed_by_step_by_day || [];
      return $.map((S) => {
        const C = k.find((A) => A.date === S.date);
        return {
          ...S,
          failed_steps: C?.steps || []
        };
      }).sort((S, C) => new Date(S.date).getTime() - new Date(C.date).getTime());
    }), m = D(() => p.value ? _.value : _.value.slice(0, oa)), g = D(() => _.value.length > oa), v = D(() => {
      const $ = [], k = [], w = /* @__PURE__ */ new Set(), S = (L) => {
        w.has(L) || ($.push({ name: L }), w.add(L));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: $, links: k };
      S("Checkin Init"), S("Booking retrive"), S("Booking retrive success"), S("Number of Passengers"), S("Completed"), S("Closed with BP");
      const C = a.checkinData.total_checkin_initiated || 0, A = a.checkinData.total_checkin_init || 0, P = a.checkinData.total_checkin_init_abandoned || 0, E = a.checkinData.total_checkin_pre_init_abandoned_error, R = a.checkinData.total_checkin_pre_init_abandoned_voluntary, N = E != null || R != null, Y = N ? Math.max(Number(E) || 0, 0) : 0, B = N ? Math.max(Number(R) || 0, 0) : 0, F = a.checkinData.total_checkin_init_abandoned_error, I = a.checkinData.total_checkin_init_abandoned_voluntary, z = F != null || I != null, W = z ? Math.max(Number(F) || 0, 0) : 0, V = z ? Math.max(Number(I) || 0, 0) : 0, H = z ? Math.max(P - W - V, 0) : P, et = A - P, tt = a.checkinData.total_checkin_started || 0, K = a.checkinData.total_checkin_completed || 0, ht = a.checkinData.total_checkin_closed || 0, _t = a.failedData?.unrecovered_by_step || [], ut = _t.reduce((L, U) => L + U.count, 0);
      if (A > 0) {
        const L = Math.round(A / C * 100);
        k.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: A,
          label: `${A.toLocaleString()} (${L}%)`
        });
      }
      const Ct = C - A;
      if (N) {
        if (B > 0) {
          const L = Math.round(B / C * 100);
          S("Abandoned (Init)"), k.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: B,
            label: `${B.toLocaleString()} (${L}%)`
          });
        }
        if (Y > 0) {
          const L = Math.round(Y / C * 100);
          S("Booking not retreived"), k.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: Y,
            label: `${Y.toLocaleString()} (${L}%)`
          });
        }
      } else if (Ct > 0) {
        const L = Math.round(Ct / C * 100);
        S("Abandoned (Init)"), k.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Ct,
          label: `${Ct.toLocaleString()} (${L}%)`
        });
      }
      if (z) {
        if (W > 0) {
          const L = Math.round(W / C * 100);
          S("Error"), k.push({
            source: "Booking retrive",
            target: "Error",
            value: W,
            label: `${W.toLocaleString()} (${L}%)`
          });
        }
        if (V > 0) {
          const L = Math.round(V / C * 100);
          S("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: V,
            label: `${V.toLocaleString()} (${L}%)`
          });
        }
        if (H > 0) {
          const L = Math.round(H / C * 100);
          S("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: H,
            label: `${H.toLocaleString()} (${L}%)`
          });
        }
      } else if (P > 0) {
        const L = Math.round(P / C * 100);
        S("Abandoned (Started)"), k.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: P,
          label: `${P.toLocaleString()} (${L}%)`
        });
      }
      if (et > 0) {
        const L = Math.round(et / C * 100);
        k.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: et,
          label: `${et.toLocaleString()} (${L}%)`
        });
      }
      if (tt > 0) {
        const L = Math.round(tt / C * 100);
        k.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: tt,
          label: `${tt.toLocaleString()} (${L}%)`
        });
      }
      if (K > 0) {
        const L = Math.round(K / tt * 100);
        k.push({
          source: "Number of Passengers",
          target: "Completed",
          value: K,
          label: `${K.toLocaleString()} (${L}%)`
        });
      }
      if (_t.length > 0 && ut > 0) {
        S("Unrecovered");
        const L = Math.round(ut / tt * 100);
        k.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: ut,
          label: `${ut.toLocaleString()} (${L}%)`
        }), _t.forEach((U) => {
          const bt = U.step_name.replace(/_/g, " ").split(" ").map((Dt) => Dt.charAt(0).toUpperCase() + Dt.slice(1)).join(" "), Wt = Math.round(U.count / tt * 100);
          S(bt), k.push({
            source: "Unrecovered",
            target: bt,
            value: U.count,
            label: `${U.count.toLocaleString()} (${Wt}%)`
          });
        });
      }
      const Pt = tt - (K + ut);
      if (Pt > 0) {
        const L = Math.round(Pt / tt * 100);
        S("Abandoned (Flow)"), k.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: Pt,
          label: `${Pt.toLocaleString()} (${L}%)`
        });
      }
      const Nt = K - ht;
      if (Nt > 0) {
        const L = Math.round(Nt / tt * 100);
        S("BP Error"), k.push({
          source: "Completed",
          target: "BP Error",
          value: Nt,
          label: `${Nt.toLocaleString()} (${L}%)`
        });
      }
      if (ht > 0) {
        const L = Math.round(ht / tt * 100);
        k.push({
          source: "Completed",
          target: "Closed with BP",
          value: ht,
          label: `${ht.toLocaleString()} (${L}%)`
        });
      }
      return { nodes: $, links: k };
    });
    return t({ isDark: i }), ($, k) => (y(), x("article", i0, [
      k[6] || (k[6] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", r0, [...k[1] || (k[1] = [
        Q('<div class="loading-container" data-v-eefc834b><div class="chart-bars-loader" data-v-eefc834b><div class="bar bar-1" data-v-eefc834b></div><div class="bar bar-2" data-v-eefc834b></div><div class="bar bar-3" data-v-eefc834b></div><div class="bar bar-4" data-v-eefc834b></div><div class="bar bar-5" data-v-eefc834b></div></div><p class="loading-text" data-v-eefc834b>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", l0, [
        v.value.nodes.length > 0 ? (y(), x("div", c0, [
          X(ge, {
            data: v.value,
            height: "500px",
            "node-colors": b.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : O("", !0),
        _.value && _.value.length > 0 ? (y(), x("div", d0, [
          c("div", u0, [
            c("table", h0, [
              k[2] || (k[2] = c("thead", null, [
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
              c("tbody", f0, [
                (y(!0), x(q, null, Z(m.value, (w) => (y(), x("tr", {
                  key: w.date,
                  class: "table-row"
                }, [
                  c("td", g0, M(l(w.date)), 1),
                  c("td", p0, M(r(w.checkin_initiated_count)), 1),
                  c("td", b0, M(h(w.checkin_init_count, w.checkin_initiated_count)), 1),
                  c("td", v0, M(r(w.checkin_started_count)), 1),
                  c("td", m0, M(h(w.checkin_completed_count, w.checkin_started_count)), 1),
                  c("td", y0, M(h(w.checkin_closed_count, w.checkin_started_count)), 1),
                  c("td", _0, M(h(f(w.failed_steps), w.checkin_started_count)), 1),
                  c("td", x0, [
                    w.failed_steps && w.failed_steps.length > 0 ? (y(), x("div", k0, [
                      (y(!0), x(q, null, Z(w.failed_steps, (S) => (y(), x("div", {
                        key: S.step_name,
                        class: "reason-item"
                      }, [
                        c("span", w0, M(d(S.step_name)) + ":", 1),
                        c("span", $0, M(S.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", M0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          g.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: k[0] || (k[0] = (w) => p.value = !p.value)
          }, [
            wt(M(p.value ? "View less" : `View more (${_.value.length - oa} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: at(["view-more-icon", { "view-more-icon-rotated": p.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...k[3] || (k[3] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : O("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("div", S0, [
          c("div", C0, [
            c("div", D0, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            k[4] || (k[4] = c("p", { class: "empty-title" }, "No check-in data available", -1)),
            k[5] || (k[5] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), T0 = /* @__PURE__ */ nt(A0, [["__scopeId", "data-v-eefc834b"]]), B0 = { class: "checkin-segments-card" }, L0 = {
  key: 0,
  class: "loading-state"
}, F0 = {
  key: 1,
  class: "card-body"
}, P0 = {
  key: 0,
  class: "table-section"
}, E0 = { class: "table-wrapper" }, R0 = { class: "data-table" }, O0 = { class: "table-body" }, I0 = { class: "table-cell font-medium text-center" }, z0 = { class: "airport-badge" }, V0 = { class: "table-cell text-center" }, N0 = {
  key: 0,
  class: "airport-badge connection"
}, W0 = {
  key: 1,
  class: "empty-connection"
}, H0 = { class: "table-cell text-center" }, j0 = { class: "airport-badge" }, Y0 = { class: "table-cell text-center" }, q0 = {
  key: 0,
  class: "trip-badge roundtrip"
}, U0 = {
  key: 1,
  class: "trip-badge oneway"
}, K0 = { class: "table-cell text-center" }, X0 = { class: "table-cell text-center" }, G0 = { class: "percentage-value" }, Z0 = { class: "table-cell text-center" }, Q0 = { class: "percentage-value" }, J0 = { class: "table-cell text-center" }, tb = { class: "percentage-value success" }, eb = {
  key: 1,
  class: "empty-state"
}, ia = 3, sb = /* @__PURE__ */ J({
  __name: "checkinSegments",
  props: {
    data: { default: () => [] },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (b) => {
      n("export", b);
    }, { isDark: i } = lt(rt(a, "theme")), r = st(!1), l = D(() => r.value ? a.data : a.data.slice(0, ia)), d = D(() => a.data.length > ia), u = (b, p) => !p || p === 0 || !b ? "0%" : `${Math.round(b / p * 100)}%`, h = (b) => !b || b === "None" ? "-" : String(b).trim().replace(/_[0-9]+$/i, ""), f = (b) => {
      const p = h(b?.departure_airport), _ = h(b?.arrival_airport);
      return p === "-" || _ === "-" ? !1 : p === _;
    };
    return t({ isDark: i }), (b, p) => (y(), x("article", B0, [
      p[7] || (p[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin Segments"),
          c("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      a.loading ? (y(), x("div", L0, [...p[1] || (p[1] = [
        Q('<div class="loading-container" data-v-a1ebd82a><div class="chart-flow-loader" data-v-a1ebd82a><div class="flow-line flow-1" data-v-a1ebd82a></div><div class="flow-line flow-2" data-v-a1ebd82a></div><div class="flow-line flow-3" data-v-a1ebd82a></div><div class="flow-line flow-4" data-v-a1ebd82a></div><div class="flow-line flow-5" data-v-a1ebd82a></div></div><p class="loading-text" data-v-a1ebd82a>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", F0, [
        a.data.length > 0 ? (y(), x("section", P0, [
          c("div", E0, [
            c("table", R0, [
              p[4] || (p[4] = c("thead", null, [
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
              c("tbody", O0, [
                (y(!0), x(q, null, Z(l.value, (_, m) => (y(), x("tr", {
                  key: m,
                  class: "table-row"
                }, [
                  c("td", I0, [
                    c("span", z0, M(h(_.departure_airport)), 1)
                  ]),
                  c("td", V0, [
                    h(_.conexion_airport) !== "-" ? (y(), x("span", N0, M(h(_.conexion_airport)), 1)) : (y(), x("span", W0, "-"))
                  ]),
                  c("td", H0, [
                    c("span", j0, M(h(_.arrival_airport)), 1)
                  ]),
                  c("td", Y0, [
                    f(_) ? (y(), x("span", q0, [...p[2] || (p[2] = [
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
                      wt(" Roundtrip ", -1)
                    ])])) : (y(), x("span", U0, [...p[3] || (p[3] = [
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
                      wt(" One way ", -1)
                    ])]))
                  ]),
                  c("td", K0, M(T(j)(_.segment_init_count)), 1),
                  c("td", X0, [
                    c("span", G0, M(u(_.segment_started_count, _.segment_init_count)), 1)
                  ]),
                  c("td", Z0, [
                    c("span", Q0, M(u(_.segment_completed_count, _.segment_init_count)), 1)
                  ]),
                  c("td", J0, [
                    c("span", tb, M(u(_.segment_closed_count, _.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          d.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: p[0] || (p[0] = (_) => r.value = !r.value)
          }, [
            wt(M(r.value ? "View less" : `View more (${a.data.length - ia} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: at(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...p[5] || (p[5] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : O("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", eb, [...p[6] || (p[6] = [
          Q('<div class="empty-state-content" data-v-a1ebd82a><div class="empty-icon-wrapper" data-v-a1ebd82a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a1ebd82a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-a1ebd82a></path></svg></div><p class="empty-title" data-v-a1ebd82a>No segment data available</p><p class="empty-description" data-v-a1ebd82a>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), ab = /* @__PURE__ */ nt(sb, [["__scopeId", "data-v-a1ebd82a"]]), nb = { class: "disruption-metrics-card" }, ob = { class: "card-header" }, ib = { class: "header-content" }, rb = {
  key: 0,
  class: "payment-success-badge"
}, lb = {
  key: 0,
  class: "currency-breakdown-list"
}, cb = {
  key: 1,
  class: "badge-value"
}, db = {
  key: 0,
  class: "loading-state"
}, ub = {
  key: 1,
  class: "card-body"
}, hb = { class: "chart-section" }, fb = { class: "chart-wrapper" }, gb = {
  key: 1,
  class: "empty-chart"
}, pb = {
  key: 0,
  class: "table-section"
}, bb = { class: "table-wrapper" }, vb = { class: "data-table" }, mb = { class: "table-body" }, yb = { class: "table-cell font-medium text-center" }, _b = { class: "table-cell text-center" }, xb = { class: "table-cell text-center" }, kb = { class: "percentage-text" }, wb = { class: "table-cell text-center" }, $b = { class: "abandoned-value" }, Mb = { class: "table-cell" }, Sb = { class: "badges-container badges-wrap" }, Cb = { class: "badge badge-vol" }, Db = { class: "badge badge-confirm" }, Ab = { class: "badge badge-not-confirm" }, Tb = { class: "badge badge-reject" }, Bb = { class: "badge badge-not-paid" }, Lb = { class: "badge badge-success" }, Fb = { class: "table-cell" }, Pb = { class: "badges-container badges-wrap" }, Eb = { class: "badge badge-inv" }, Rb = { class: "badge badge-human" }, Ob = { class: "badge badge-accept" }, Ib = {
  key: 1,
  class: "empty-state"
}, ra = 3, zb = /* @__PURE__ */ J({
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
    const s = e, a = t, n = (m) => {
      a("export", m);
    }, o = st(!1), i = D(() => s.data?.disruption_by_day ? [...s.data.disruption_by_day].sort(
      (m, g) => new Date(m.date).getTime() - new Date(g.date).getTime()
    ) : []), r = D(() => o.value ? i.value : i.value.slice(0, ra)), l = D(() => i.value.length > ra), d = D(() => s.data?.total_payment_success || []), u = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, h = (m) => dt(m), f = (m) => (m ?? []).reduce((g, v) => g + (v.count ?? 0), 0), b = (m) => typeof m.sell_success_count == "number" ? m.sell_success_count : f(m.payment_success_total), p = D(() => {
      const m = s.data, g = m.total_disruption_conversations || 0, v = m.total_disruption_initiated || 0, $ = m.total_voluntary || 0, k = m.total_involuntary || 0, w = m.total_accepted || 0, S = m.total_confirmed || 0, C = typeof m.total_sell_success == "number" ? m.total_sell_success : f(m.total_payment_success), A = m.total_sell_failed || 0, P = Math.max(0, g - v), E = Math.max(0, v - $ - k), R = Math.max(0, k - w), N = Math.max(0, $ - S), Y = A, B = Math.max(0, S - C - Y), F = (W, V) => {
        const H = V > 0 ? Math.round(W / V * 100) : 0;
        return `${W.toLocaleString()} (${H}%)`;
      }, I = [
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
      ], z = [];
      return v > 0 && z.push({
        source: "Initiated",
        target: "Started",
        value: v,
        label: F(v, g)
      }), P > 0 && z.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: P,
        label: F(P, g)
      }), $ > 0 && z.push({
        source: "Started",
        target: "Voluntary",
        value: $,
        label: F($, g)
      }), k > 0 && z.push({
        source: "Started",
        target: "Involuntary",
        value: k,
        label: F(k, g)
      }), E > 0 && z.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: E,
        label: F(E, g)
      }), w > 0 && z.push({
        source: "Involuntary",
        target: "Accepted",
        value: w,
        label: F(w, g)
      }), R > 0 && z.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: R,
        label: F(R, g)
      }), S > 0 && z.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: F(S, g)
      }), N > 0 && z.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: N,
        label: F(N, g)
      }), C > 0 && z.push({
        source: "Confirmed",
        target: "Paid",
        value: C,
        label: F(C, g)
      }), Y > 0 && z.push({
        source: "Confirmed",
        target: "Rejected",
        value: Y,
        label: F(Y, g)
      }), B > 0 && z.push({
        source: "Confirmed",
        target: "Not Paid",
        value: B,
        label: F(B, g)
      }), { nodes: I, links: z };
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
    return (m, g) => (y(), x("article", nb, [
      c("header", ob, [
        c("div", ib, [
          g[2] || (g[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          s.loading ? O("", !0) : (y(), x("div", rb, [
            g[1] || (g[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", lb, [
              (y(!0), x(q, null, Z(d.value, (v) => (y(), x("p", {
                key: v.currency,
                class: "currency-breakdown-item"
              }, M(v.currency) + " " + M(h(v.total_value)), 1))), 128))
            ])) : (y(), x("p", cb, M(h(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", db, [...g[3] || (g[3] = [
        Q('<div class="loading-container" data-v-47c8f691><div class="chart-bars-loader" data-v-47c8f691><div class="bar bar-1" data-v-47c8f691></div><div class="bar bar-2" data-v-47c8f691></div><div class="bar bar-3" data-v-47c8f691></div><div class="bar bar-4" data-v-47c8f691></div><div class="bar bar-5" data-v-47c8f691></div></div><p class="loading-text" data-v-47c8f691>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", ub, [
        c("section", hb, [
          c("div", fb, [
            p.value.nodes.length > 0 && p.value.links.length > 0 ? (y(), ct(ge, {
              key: 0,
              data: p.value,
              "node-colors": _,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", gb, [...g[4] || (g[4] = [
              c("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", pb, [
          g[7] || (g[7] = Q('<div class="section-header" data-v-47c8f691><h4 class="section-title" data-v-47c8f691>Daily Overview</h4></div><div class="legend-container" data-v-47c8f691><p class="legend-title" data-v-47c8f691>Legend</p><div class="legend-items" data-v-47c8f691><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Voluntary:</span><span class="badge badge-vol" data-v-47c8f691>VOL</span></div><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Involuntary:</span><span class="badge badge-inv" data-v-47c8f691>INV</span></div><div class="legend-note" data-v-47c8f691><span data-v-47c8f691>Vol=Voluntary</span><span data-v-47c8f691>•</span><span data-v-47c8f691>Inv=Involuntary</span></div></div></div>', 2)),
          c("div", bb, [
            c("table", vb, [
              g[5] || (g[5] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Initiated"),
                  c("th", { class: "table-header" }, "Started"),
                  c("th", { class: "table-header" }, "Abandoned (%)"),
                  c("th", { class: "table-header" }, "Voluntary"),
                  c("th", { class: "table-header" }, "Involuntary")
                ])
              ], -1)),
              c("tbody", mb, [
                (y(!0), x(q, null, Z(r.value, (v) => (y(), x("tr", {
                  key: v.date,
                  class: "table-row"
                }, [
                  c("td", yb, M(T(Tt)(v.date).format("DD/MM")), 1),
                  c("td", _b, M(T(j)(v.disruption_conversations)), 1),
                  c("td", xb, [
                    wt(M(T(j)(v.disruption_initiated_count)) + " ", 1),
                    c("span", kb, " (" + M(u(v.disruption_initiated_count, v.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", wb, [
                    c("span", $b, M(T(j)(v.disruption_initiated_count - v.voluntary_count - v.involuntary_count)) + " (" + M(u(v.disruption_initiated_count - v.voluntary_count - v.involuntary_count, v.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", Mb, [
                    c("div", Sb, [
                      c("span", Cb, " VOL " + M(T(j)(v.voluntary_count)) + " (" + M(u(v.voluntary_count, v.disruption_conversations)) + ") ", 1),
                      c("span", Db, " Confirm " + M(T(j)(v.confirmed_count)) + " (" + M(u(v.confirmed_count, v.disruption_conversations)) + ") ", 1),
                      c("span", Ab, " Not Confirm " + M(T(j)(v.voluntary_count - v.confirmed_count)) + " (" + M(u(v.voluntary_count - v.confirmed_count, v.disruption_conversations)) + ") ", 1),
                      c("span", Tb, " Reject " + M(T(j)(v.sell_failed_count)) + " (" + M(u(v.sell_failed_count, v.disruption_conversations)) + ") ", 1),
                      c("span", Bb, " Not Paid " + M(T(j)(Math.max(0, v.confirmed_count - b(v) - v.sell_failed_count))) + " (" + M(u(Math.max(0, v.confirmed_count - b(v) - v.sell_failed_count), v.disruption_conversations)) + ") ", 1),
                      c("span", Lb, " Finish " + M(T(j)(b(v))) + " (" + M(u(b(v), v.disruption_conversations)) + ") ", 1),
                      (y(!0), x(q, null, Z(v.payment_success_total || [], ($) => (y(), x("span", {
                        key: `${v.date}-${$.currency}`,
                        class: "badge badge-currency"
                      }, M($.currency) + " " + M(h($.total_value)), 1))), 128))
                    ])
                  ]),
                  c("td", Fb, [
                    c("div", Pb, [
                      c("span", Eb, " INV " + M(T(j)(v.involuntary_count)) + " (" + M(u(v.involuntary_count, v.disruption_conversations)) + ") ", 1),
                      c("span", Rb, " Human " + M(T(j)(v.involuntary_count - v.accepted_count)) + " (" + M(u(v.involuntary_count - v.accepted_count, v.disruption_conversations)) + ") ", 1),
                      c("span", Ob, " Accept " + M(T(j)(v.accepted_count)) + " (" + M(u(v.accepted_count, v.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          l.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (v) => o.value = !o.value)
          }, [
            wt(M(o.value ? "View less" : `View more (${i.value.length - ra} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: at(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...g[6] || (g[6] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : O("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", Ib, [...g[8] || (g[8] = [
          Q('<div class="empty-state-content" data-v-47c8f691><div class="empty-icon-wrapper" data-v-47c8f691><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-47c8f691><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-47c8f691></path></svg></div><p class="empty-title" data-v-47c8f691>No disruption data available</p><p class="empty-description" data-v-47c8f691>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Vb = /* @__PURE__ */ nt(zb, [["__scopeId", "data-v-47c8f691"]]), Nb = { class: "faq-metrics-card" }, Wb = {
  key: 0,
  class: "card-body"
}, Hb = { class: "kpi-grid" }, jb = { class: "kpi-card" }, Yb = { class: "kpi-value" }, qb = { class: "kpi-card" }, Ub = { class: "kpi-value" }, Kb = { class: "kpi-card kpi-card--airline" }, Xb = { class: "kpi-value" }, Gb = { class: "kpi-card kpi-card--booking" }, Zb = { class: "kpi-value" }, Qb = { class: "kpi-card kpi-card--flight" }, Jb = { class: "kpi-value" }, tv = {
  key: 0,
  class: "chart-section"
}, ev = {
  key: 1,
  class: "empty-state"
}, sv = {
  key: 1,
  class: "loading-state"
}, av = /* @__PURE__ */ J({
  __name: "FAQ",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (f) => {
      n("export", f);
    }, { isDark: i, colors: r } = lt(rt(a, "theme")), l = st({ labels: [], datasets: [] }), d = D(() => a.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), u = D(() => ({
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
      const b = f.faq_by_day || [];
      if (b.length > 0) {
        const p = b.map((v) => Tt(v.date).format("MMM DD")), _ = b.map((v) => v.airline_information_retrieved_count || 0), m = b.map((v) => v.flight_status_retrieved_count || 0), g = b.map((v) => v.booking_info_retrieved_count || 0);
        l.value = {
          labels: p,
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
              data: g,
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
    return Vt(
      () => a.data,
      (f) => {
        h(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (f, b) => (y(), x("article", Nb, [
      b[7] || (b[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "FAQ Metrics"),
          c("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      a.loading ? (y(), x("div", sv, [...b[6] || (b[6] = [
        Q('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", Wb, [
        c("div", Hb, [
          c("div", jb, [
            b[0] || (b[0] = c("span", { class: "kpi-label" }, "Total FAQ", -1)),
            c("span", Yb, M(T(j)(d.value.total_faq_events)), 1)
          ]),
          c("div", qb, [
            b[1] || (b[1] = c("span", { class: "kpi-label" }, "Documents Found", -1)),
            c("span", Ub, M(T(j)(d.value.total_documents_found)), 1)
          ]),
          c("div", Kb, [
            b[2] || (b[2] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            c("span", Xb, M(T(j)(d.value.total_airline_information_retrieved)), 1)
          ]),
          c("div", Gb, [
            b[3] || (b[3] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            c("span", Zb, M(T(j)(d.value.total_booking_info_retrieved)), 1)
          ]),
          c("div", Qb, [
            b[4] || (b[4] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            c("span", Jb, M(T(j)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (y(), x("section", tv, [
          X(fe, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", ev, [...b[5] || (b[5] = [
          Q('<div class="empty-state-content" data-v-5d2c3c33><div class="empty-icon-wrapper" data-v-5d2c3c33><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5d2c3c33><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-5d2c3c33></path></svg></div><p class="empty-title" data-v-5d2c3c33>No FAQ data available</p><p class="empty-description" data-v-5d2c3c33>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), nv = /* @__PURE__ */ nt(av, [["__scopeId", "data-v-5d2c3c33"]]), ov = { class: "messages-per-agent-card" }, iv = {
  key: 0,
  class: "card-body"
}, rv = {
  key: 0,
  class: "chart-section"
}, lv = {
  key: 1,
  class: "empty-state"
}, cv = { class: "empty-state-content" }, dv = { class: "empty-icon-wrapper" }, uv = {
  key: 1,
  class: "loading-state"
}, hv = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
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
    }, n = e, o = s, i = (h) => {
      o("export", h);
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = D(() => {
      const h = n.data?.agents_by_day || {}, f = Object.keys(h).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const b = /* @__PURE__ */ new Set();
      for (const m of Object.values(h))
        for (const g of Object.keys(m))
          b.add(g);
      const _ = Array.from(b).map((m) => {
        const g = a[m] || "#94a3b8";
        return {
          label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
          data: f.map((v) => h[v]?.[m] || 0),
          borderColor: g,
          backgroundColor: `${g}20`,
          pointBackgroundColor: g,
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
    }), u = D(() => n.options ? n.options : {
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
    return t({ isDark: r }), (h, f) => (y(), x("article", ov, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Messages per Agent"),
          c("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (y(), x("div", uv, [...f[2] || (f[2] = [
        Q('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", iv, [
        d.value.labels && d.value.labels.length ? (y(), x("section", rv, [
          X(fe, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", lv, [
          c("div", cv, [
            c("div", dv, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No agent interactions data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), fv = /* @__PURE__ */ nt(hv, [["__scopeId", "data-v-b9368fc2"]]), gv = { class: "record-locator-card" }, pv = {
  key: 0,
  class: "loading-state"
}, bv = {
  key: 1,
  class: "card-body"
}, vv = {
  key: 0,
  class: "chart-section"
}, mv = { class: "chart-wrapper" }, yv = {
  key: 1,
  class: "table-section"
}, _v = { class: "table-wrapper" }, xv = { class: "data-table" }, kv = { class: "table-header-row" }, wv = {
  key: 0,
  class: "table-header"
}, $v = {
  key: 1,
  class: "table-header"
}, Mv = { class: "table-body" }, Sv = { class: "table-cell font-medium" }, Cv = { class: "table-cell text-center" }, Dv = { class: "table-cell text-center" }, Av = { class: "table-cell text-center" }, Tv = { class: "table-cell text-center" }, Bv = { class: "table-cell text-center success-value" }, Lv = { class: "table-cell text-center failed-value" }, Fv = { class: "table-cell text-center warning-value" }, Pv = {
  key: 0,
  class: "table-cell text-center"
}, Ev = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Rv = {
  key: 2,
  class: "empty-state"
}, la = 3, Ov = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (m) => {
      n("export", m);
    }, { isDark: i } = lt(rt(a, "theme")), r = st(!1), l = D(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (m, g) => new Date(m.date).getTime() - new Date(g.date).getTime()
    ) : []), d = D(() => r.value ? l.value : l.value.slice(0, la)), u = D(() => l.value.length > la), h = D(() => a.data), f = D(() => ({
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
    })), b = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, p = (m, g) => {
      const v = j(m), $ = b(m, g);
      return `${v} (${$})`;
    }, _ = D(() => {
      const m = [], g = [], v = /* @__PURE__ */ new Set(), $ = (K) => {
        v.has(K) || (m.push({ name: K }), v.add(K));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: m, links: g };
      $("Checkin Init"), $("Booking retrive"), $("Checkin Started"), $("Checkin Completed"), $("Checkin Closed");
      const k = h.value.total_checkin_initiated, w = h.value.total_record_locator_init, S = h.value.total_record_locator_started, C = h.value.total_record_locator_completed, A = h.value.total_record_locator_closed, P = h.value.total_record_locator_failed, E = h.value.total_record_locator_abandoned, R = h.value.total_record_locator_init_abandoned, N = h.value.total_checkin_pre_init_abandoned_error, Y = h.value.total_checkin_pre_init_abandoned_voluntary, B = N != null || Y != null, F = B ? Math.max(Number(N) || 0, 0) : 0, I = B ? Math.max(Number(Y) || 0, 0) : 0, z = h.value.total_record_locator_init_abandoned_error, W = h.value.total_record_locator_init_abandoned_voluntary, V = z != null || W != null, H = V ? Math.max(Number(z) || 0, 0) : 0, et = V ? Math.max(Number(W) || 0, 0) : 0;
      if (w > 0) {
        const K = Math.round(w / k * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: w,
          label: `${w.toLocaleString()} (${K}%)`
        });
      }
      const tt = k - w;
      if (B) {
        if (I > 0) {
          const K = Math.round(I / k * 100);
          $("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: I,
            label: `${I.toLocaleString()} (${K}%)`
          });
        }
        if (F > 0) {
          const K = Math.round(F / k * 100);
          $("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: F,
            label: `${F.toLocaleString()} (${K}%)`
          });
        }
      } else if (tt > 0) {
        const K = Math.round(tt / k * 100);
        $("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: tt,
          label: `${tt.toLocaleString()} (${K}%)`
        });
      }
      if (S > 0) {
        const K = Math.round(S / k * 100);
        g.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: S,
          label: `${S.toLocaleString()} (${K}%)`
        });
      }
      if (V) {
        if (H > 0) {
          const K = Math.round(H / k * 100);
          $("Error"), g.push({
            source: "Booking retrive",
            target: "Error",
            value: H,
            label: `${H.toLocaleString()} (${K}%)`
          });
        }
        if (et > 0) {
          const K = Math.round(et / k * 100);
          $("Abandoned (Started)"), g.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: et,
            label: `${et.toLocaleString()} (${K}%)`
          });
        }
      } else if (R > 0) {
        const K = Math.round(R / k * 100);
        $("Abandoned (Started)"), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: R,
          label: `${R.toLocaleString()} (${K}%)`
        });
      }
      if (C > 0) {
        const K = Math.round(C / S * 100);
        g.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: C,
          label: `${C.toLocaleString()} (${K}%)`
        });
      }
      if (A > 0) {
        const K = Math.round(A / S * 100);
        g.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: A,
          label: `${A.toLocaleString()} (${K}%)`
        });
      }
      if (P > 0) {
        const K = Math.round(P / S * 100);
        $("Checkin Failed"), g.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: P,
          label: `${P.toLocaleString()} (${K}%)`
        });
      }
      if (E > 0) {
        const K = Math.round(E / S * 100);
        $("Abandoned (Flow)"), g.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: E,
          label: `${E.toLocaleString()} (${K}%)`
        });
      }
      return { nodes: m, links: g };
    });
    return t({ isDark: i }), (m, g) => (y(), x("article", gv, [
      g[12] || (g[12] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          c("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      a.loading ? (y(), x("div", pv, [...g[1] || (g[1] = [
        Q('<div class="loading-container" data-v-e48cea55><div class="chart-flow-loader" data-v-e48cea55><div class="flow-line flow-1" data-v-e48cea55></div><div class="flow-line flow-2" data-v-e48cea55></div><div class="flow-line flow-3" data-v-e48cea55></div><div class="flow-line flow-4" data-v-e48cea55></div><div class="flow-line flow-5" data-v-e48cea55></div></div><p class="loading-text" data-v-e48cea55>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", bv, [
        _.value.nodes.length > 0 ? (y(), x("section", vv, [
          c("div", mv, [
            X(ge, {
              data: _.value,
              height: "500px",
              "node-colors": f.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : O("", !0),
        l.value && l.value.length > 0 ? (y(), x("section", yv, [
          c("div", _v, [
            c("table", xv, [
              c("thead", null, [
                c("tr", kv, [
                  g[2] || (g[2] = c("th", { class: "table-header" }, "Date", -1)),
                  g[3] || (g[3] = c("th", { class: "table-header" }, "Checkin Init", -1)),
                  g[4] || (g[4] = c("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  g[5] || (g[5] = c("th", { class: "table-header" }, "Checkin Started", -1)),
                  g[6] || (g[6] = c("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  g[7] || (g[7] = c("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  g[8] || (g[8] = c("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  g[9] || (g[9] = c("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  a.isAvianca ? (y(), x("th", wv, "Create Payment")) : O("", !0),
                  a.isAvianca ? (y(), x("th", $v, "Failed Payment")) : O("", !0)
                ])
              ]),
              c("tbody", Mv, [
                (y(!0), x(q, null, Z(d.value, (v) => (y(), x("tr", {
                  key: v.date,
                  class: "table-row"
                }, [
                  c("td", Sv, M(T(Tt)(v.date).format("DD/MM/YYYY")), 1),
                  c("td", Cv, M(T(j)(v.checkin_initiated)), 1),
                  c("td", Dv, M(p(v.record_locator_init_count, v.checkin_initiated)), 1),
                  c("td", Av, M(T(j)(v.record_locator_started_count)), 1),
                  c("td", Tv, M(p(v.record_locator_completed_count, v.record_locator_started_count)), 1),
                  c("td", Bv, M(p(v.record_locator_closed_count, v.record_locator_started_count)), 1),
                  c("td", Lv, M(p(v.record_locator_failed_count, v.record_locator_started_count)), 1),
                  c("td", Fv, M(p(v.record_locator_abandoned_count, v.record_locator_started_count)), 1),
                  a.isAvianca ? (y(), x("td", Pv, M(T(j)(v.record_locator_create_payment_count)), 1)) : O("", !0),
                  a.isAvianca ? (y(), x("td", Ev, M(T(j)(v.record_locator_create_payment_failed_count)), 1)) : O("", !0)
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (v) => r.value = !r.value)
          }, [
            wt(M(r.value ? "View less" : `View more (${l.value.length - la} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: at(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...g[10] || (g[10] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : O("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", Rv, [...g[11] || (g[11] = [
          Q('<div class="empty-state-content" data-v-e48cea55><div class="empty-icon-wrapper" data-v-e48cea55><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e48cea55><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-e48cea55></path></svg></div><p class="empty-title" data-v-e48cea55>No record locator data available</p><p class="empty-description" data-v-e48cea55>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Iv = /* @__PURE__ */ nt(Ov, [["__scopeId", "data-v-e48cea55"]]), zv = { class: "sales-channel-card" }, Vv = {
  key: 0,
  class: "loading-state"
}, Nv = {
  key: 1,
  class: "card-body"
}, Wv = {
  key: 0,
  class: "chart-section"
}, Hv = { class: "chart-wrapper" }, jv = {
  key: 1,
  class: "empty-state"
}, Yv = {
  key: 2,
  class: "comparison-section"
}, qv = { class: "comparison-grid" }, Uv = { class: "comparison-content" }, Kv = { class: "comparison-channel" }, Xv = { class: "comparison-value" }, Gv = {
  key: 0,
  class: "comparison-delta"
}, Zv = {
  key: 0,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Qv = {
  key: 1,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Jv = { class: "delta-label" }, tm = {
  key: 1,
  class: "comparison-delta"
}, em = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
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
    }, n = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = s, r = (f) => {
      i("export", f);
    }, { isDark: l } = lt(rt(o, "theme"));
    D(() => o.data?.total_sell_success ?? 0);
    const d = D(() => {
      const f = /* @__PURE__ */ new Set();
      for (const b of o.data?.sales_by_channel_by_day ?? [])
        for (const p of Object.keys(b.channels))
          f.add(p);
      return Array.from(f).sort();
    }), u = (f, b) => a[f.toLowerCase()] ?? n[b % n.length], h = D(() => {
      const f = o.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const b = f.map((_) => Tt(_.date).format("MMM-DD")), p = d.value.map((_, m) => ({
        label: _,
        data: f.map((g) => g.channels[_] ?? 0),
        backgroundColor: u(_, m),
        borderRadius: 4
      }));
      return { labels: b, datasets: p };
    });
    return t({ isDark: l }), (f, b) => (y(), x("article", zv, [
      b[5] || (b[5] = Q('<header class="card-header" data-v-8b96a431><div class="header-content" data-v-8b96a431><div class="title-section" data-v-8b96a431><h3 class="card-title" data-v-8b96a431>Sales by Channel</h3><p class="card-subtitle" data-v-8b96a431>Successful sales breakdown by communication channel</p></div></div></header>', 1)),
      o.loading ? (y(), x("div", Vv, [...b[0] || (b[0] = [
        Q('<div class="loading-container" data-v-8b96a431><div class="chart-bars-loader" data-v-8b96a431><div class="bar bar-1" data-v-8b96a431></div><div class="bar bar-2" data-v-8b96a431></div><div class="bar bar-3" data-v-8b96a431></div><div class="bar bar-4" data-v-8b96a431></div><div class="bar bar-5" data-v-8b96a431></div></div><p class="loading-text" data-v-8b96a431>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", Nv, [
        h.value.labels.length > 0 ? (y(), x("section", Wv, [
          c("div", Hv, [
            X(ae, {
              data: h.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", jv, [...b[1] || (b[1] = [
          Q('<div class="empty-state-content" data-v-8b96a431><div class="empty-icon-wrapper" data-v-8b96a431><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8b96a431><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8b96a431></path></svg></div><p class="empty-title" data-v-8b96a431>No sales data available</p><p class="empty-description" data-v-8b96a431>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (y(), x("section", Yv, [
          c("div", qv, [
            (y(!0), x(q, null, Z(e.channelComparison, (p) => (y(), x("div", {
              key: p.channel,
              class: "comparison-card"
            }, [
              c("div", {
                class: "comparison-color-bar",
                style: xt({ backgroundColor: u(p.channel, e.channelComparison.indexOf(p)) })
              }, null, 4),
              c("div", Uv, [
                c("span", Kv, M(p.channel), 1),
                c("span", Xv, M(T(j)(p.current)), 1),
                p.delta !== null ? (y(), x("div", Gv, [
                  c("span", {
                    class: at(["delta-badge", p.delta > 0 ? "delta-up" : p.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    p.delta > 0 ? (y(), x("svg", Zv, [...b[2] || (b[2] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : p.delta < 0 ? (y(), x("svg", Qv, [...b[3] || (b[3] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : O("", !0),
                    wt(" " + M(Math.abs(p.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  c("span", Jv, "vs prev. period (" + M(T(j)(p.previous)) + ")", 1)
                ])) : (y(), x("div", tm, [...b[4] || (b[4] = [
                  c("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : O("", !0)
      ]))
    ]));
  }
}), sm = /* @__PURE__ */ nt(em, [["__scopeId", "data-v-8b96a431"]]), am = { class: "seller-metrics-card" }, nm = { class: "card-header" }, om = { class: "header-content" }, im = {
  key: 0,
  class: "payment-success-badge"
}, rm = {
  key: 0,
  class: "currency-breakdown-list"
}, lm = {
  key: 1,
  class: "badge-value"
}, cm = {
  key: 0,
  class: "loading-state"
}, dm = {
  key: 1,
  class: "card-body"
}, um = {
  key: 0,
  class: "chart-section"
}, hm = { class: "chart-wrapper" }, fm = {
  key: 1,
  class: "empty-state"
}, gm = {
  key: 2,
  class: "table-section"
}, pm = { class: "table-wrapper" }, bm = { class: "data-table" }, vm = { class: "table-body" }, mm = { class: "table-cell font-medium" }, ym = { class: "table-cell text-center" }, _m = { class: "table-cell text-center" }, xm = { class: "table-cell text-center" }, km = { class: "table-cell text-center" }, wm = { class: "table-cell text-center" }, $m = { class: "table-cell text-center success-value" }, Mm = {
  key: 0,
  class: "currency-cell-list"
}, Sm = { key: 1 }, Cm = { class: "table-cell text-left" }, Dm = {
  key: 0,
  class: "failed-reasons"
}, Am = { class: "reason-name" }, Tm = { class: "reason-count" }, Bm = {
  key: 1,
  class: "empty-cell"
}, ca = 3, Lm = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (w) => {
      n("export", w);
    }, { isDark: i } = lt(rt(a, "theme")), r = st(!1), l = D(() => {
      if (!a.sellerData?.seller_by_day) return [];
      const w = [...a.sellerData.seller_by_day];
      return a.failedData?.failed_by_reason_by_day && a.failedData.failed_by_reason_by_day.forEach((S) => {
        const C = w.findIndex((A) => A.date === S.date);
        C !== -1 ? w[C] = { ...w[C], reasons: S.reasons } : w.push({
          date: S.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: S.reasons
        });
      }), w.sort((S, C) => new Date(S.date).getTime() - new Date(C.date).getTime());
    }), d = D(() => r.value ? l.value : l.value.slice(0, ca)), u = D(() => l.value.length > ca), h = D(() => a.sellerData), f = D(() => a.failedData), b = D(
      () => Array.isArray(a.sellerData.total_value_sell_success) ? a.sellerData.total_value_sell_success : []
    ), p = D(() => {
      const {
        total_seller_conversations: w = 0,
        total_sell_started: S = 0,
        total_sell_booking_created: C = 0,
        total_sell_success: A = 0
      } = h.value, { failed_by_reason_by_day: P = [] } = f.value;
      if (w === 0) return { nodes: [], links: [] };
      const E = [
        { name: "Sell Initiated", value: w },
        { name: "Sell Started", value: S },
        { name: "Booking Created", value: C },
        { name: "Sell Success", value: A }
      ], R = [], N = w - S;
      if (N > 0) {
        const I = Math.round(N / w * 100);
        E.push({ name: "Abandoned (Init)", value: N }), R.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: N,
          label: `${N.toLocaleString()} (${I}%)`
        });
      }
      if (S > 0) {
        const I = Math.round(S / w * 100);
        R.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: S,
          label: `${S.toLocaleString()} (${I}%)`
        });
      }
      const Y = P.reduce((I, z) => (z.reasons && Array.isArray(z.reasons) && z.reasons.forEach((W) => {
        const V = W.reason, H = W.failed_count;
        I[V] = (I[V] || 0) + H;
      }), I), {});
      if (C > 0) {
        const I = Math.round(C / w * 100);
        R.push({
          source: "Sell Started",
          target: "Booking Created",
          value: C,
          label: `${C.toLocaleString()} (${I}%)`
        });
      }
      if (A > 0) {
        const I = Math.round(A / w * 100);
        R.push({
          source: "Booking Created",
          target: "Sell Success",
          value: A,
          label: `${A.toLocaleString()} (${I}%)`
        });
      }
      const B = S - C;
      if (B > 0) {
        const I = Math.round(B / w * 100);
        E.push({ name: "Failed at Booking", value: B }), R.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: B,
          label: `${B.toLocaleString()} (${I}%)`
        });
      }
      if (Object.keys(Y).length > 0) {
        const I = Object.values(Y).reduce((W, V) => W + V, 0), z = B - I;
        if (Object.entries(Y).filter(([, W]) => W > 0).sort(([, W], [, V]) => V - W).forEach(([W, V]) => {
          const H = Math.round(V / w * 100);
          E.push({ name: `Failed: ${W}`, value: V }), R.push({
            source: "Failed at Booking",
            target: `Failed: ${W}`,
            value: V,
            label: `${V.toLocaleString()} (${H}%)`
          });
        }), z > 0) {
          const W = Math.round(z / w * 100);
          E.push({ name: "Failed: Without Reason", value: z }), R.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: z,
            label: `${z.toLocaleString()} (${W}%)`
          });
        }
      }
      const F = C - A;
      if (F > 0) {
        const I = Math.round(F / w * 100);
        E.push({ name: "Failed at Completion", value: F }), R.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: F,
          label: `${F.toLocaleString()} (${I}%)`
        });
      }
      return { nodes: E, links: R };
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
    }, m = D(() => _), g = (w, S) => !S || S === 0 ? "0%" : `${Math.round(w / S * 100)}%`, v = (w, S) => {
      const C = j(w), A = g(w, S);
      return `${C} (${A})`;
    }, $ = (w) => w == null ? 0 : typeof w == "number" ? w : Array.isArray(w) ? w.reduce((S, C) => S + (C.total_value || 0), 0) : 0, k = (w) => dt($(w));
    return t({ isDark: i }), (w, S) => (y(), x("article", am, [
      c("header", nm, [
        c("div", om, [
          S[2] || (S[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Seller Metrics"),
            c("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          a.loading ? O("", !0) : (y(), x("div", im, [
            S[1] || (S[1] = c("p", { class: "badge-label" }, "Total Sales Value", -1)),
            b.value.length > 0 ? (y(), x("div", rm, [
              (y(!0), x(q, null, Z(b.value, (C) => (y(), x("p", {
                key: C.currency,
                class: "currency-breakdown-item"
              }, M(C.currency) + " " + M(T(dt)(C.total_value)), 1))), 128))
            ])) : (y(), x("p", lm, M(k(a.sellerData.total_value_sell_success)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", cm, [...S[3] || (S[3] = [
        Q('<div class="loading-container" data-v-60dfa4f1><div class="chart-flow-loader" data-v-60dfa4f1><div class="flow-line flow-1" data-v-60dfa4f1></div><div class="flow-line flow-2" data-v-60dfa4f1></div><div class="flow-line flow-3" data-v-60dfa4f1></div><div class="flow-line flow-4" data-v-60dfa4f1></div><div class="flow-line flow-5" data-v-60dfa4f1></div></div><p class="loading-text" data-v-60dfa4f1>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", dm, [
        p.value.nodes.length > 0 ? (y(), x("section", um, [
          c("div", hm, [
            X(ge, {
              data: p.value,
              "node-colors": m.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", fm, [...S[4] || (S[4] = [
          Q('<div class="empty-state-content" data-v-60dfa4f1><div class="empty-icon-wrapper" data-v-60dfa4f1><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-60dfa4f1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-60dfa4f1></path></svg></div><p class="empty-title" data-v-60dfa4f1>No sales data available</p><p class="empty-description" data-v-60dfa4f1>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        l.value && l.value.length > 0 ? (y(), x("section", gm, [
          c("div", pm, [
            c("table", bm, [
              S[5] || (S[5] = c("thead", null, [
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
              c("tbody", vm, [
                (y(!0), x(q, null, Z(d.value, (C) => (y(), x("tr", {
                  key: C.date,
                  class: "table-row"
                }, [
                  c("td", mm, M(T(Tt)(C.date).format("DD/MM/YYYY")), 1),
                  c("td", ym, M(T(j)(C.seller_conversations || 0)), 1),
                  c("td", _m, M(v(C.sell_started_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", xm, M(v(C.sell_get_quote_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", km, M(v(C.sell_booking_created_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", wm, M(v(C.sell_success_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", $m, [
                    Array.isArray(C.daily_value_sell_success) && C.daily_value_sell_success.length > 0 ? (y(), x("div", Mm, [
                      (y(!0), x(q, null, Z(C.daily_value_sell_success, (A) => (y(), x("span", {
                        key: `${C.date}-${A.currency}`
                      }, M(A.currency) + " " + M(T(dt)(A.total_value)), 1))), 128))
                    ])) : (y(), x("span", Sm, M(k(C.daily_value_sell_success)), 1))
                  ]),
                  c("td", Cm, [
                    C.reasons && C.reasons.length > 0 ? (y(), x("div", Dm, [
                      (y(!0), x(q, null, Z(C.reasons, (A) => (y(), x("div", {
                        key: A.reason,
                        class: "failed-reason-item"
                      }, [
                        c("span", Am, M(A.reason) + ":", 1),
                        c("span", Tm, M(A.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Bm, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: S[0] || (S[0] = (C) => r.value = !r.value)
          }, [
            wt(M(r.value ? "View less" : `View more (${l.value.length - ca} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: at(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...S[6] || (S[6] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : O("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : O("", !0)
      ]))
    ]));
  }
}), Fm = /* @__PURE__ */ nt(Lm, [["__scopeId", "data-v-60dfa4f1"]]), Pm = { class: "top-agents-card" }, Em = {
  key: 0,
  class: "card-body"
}, Rm = {
  key: 0,
  class: "chart-section"
}, Om = {
  key: 1,
  class: "empty-state"
}, Im = { class: "empty-state-content" }, zm = { class: "empty-icon-wrapper" }, Vm = {
  key: 1,
  class: "loading-state"
}, Nm = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
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
    }, n = e, o = s, i = (h) => {
      o("export", h);
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = D(() => {
      const f = (n.data?.top_agents || []).filter(
        (m) => m.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const b = f.reduce(
        (m, g) => m + (Number(g.conversations) || 0),
        0
      ), p = f.map((m) => {
        const g = m.agent_type?.toLowerCase();
        return a[g] || "#94a3b8";
      }), _ = p.map((m) => `${m}80`);
      return {
        labels: f.map((m) => {
          const g = Number(m.conversations) || 0, v = b ? g / b * 100 : 0;
          return `${m.agent_type} - ${g.toLocaleString()} (${v.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((m) => m.conversations),
            backgroundColor: _,
            borderColor: p,
            borderWidth: 2
          }
        ]
      };
    }), u = D(() => n.options ? n.options : {
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
              const f = (h.label || "").toString().split(" - ")[0], b = Number(h.parsed) || 0, p = (h.dataset.data || []).reduce(
                (m, g) => m + (Number(g) || 0),
                0
              ), _ = p ? b / p * 100 : 0;
              return `${f}: ${b.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, f) => (y(), x("article", Pm, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Vm, [...f[2] || (f[2] = [
        Q('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Em, [
        d.value.labels && d.value.labels.length ? (y(), x("section", Rm, [
          X(Ws, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", Om, [
          c("div", Im, [
            c("div", zm, [
              X(T($g), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Wm = /* @__PURE__ */ nt(Nm, [["__scopeId", "data-v-501bf4c4"]]), Hm = { class: "payment-method-card" }, jm = { class: "card-header" }, Ym = { class: "header-content" }, qm = {
  key: 0,
  class: "stats-badge"
}, Um = {
  key: 0,
  class: "currency-breakdown-list"
}, Km = {
  key: 1,
  class: "badge-value"
}, Xm = {
  key: 0,
  class: "loading-state"
}, Gm = {
  key: 1,
  class: "card-body"
}, Zm = {
  key: 0,
  class: "payment-methods-section"
}, Qm = { class: "payment-methods-grid" }, Jm = { class: "payment-card-content" }, t1 = { class: "payment-card-header" }, e1 = {
  key: 0,
  class: "currency-cell-list"
}, s1 = { class: "payment-badge-wrapper" }, a1 = {
  key: 1,
  class: "empty-state"
}, n1 = { class: "empty-state-content" }, o1 = { class: "empty-icon-wrapper" }, i1 = {
  key: 2,
  class: "table-section"
}, r1 = { class: "table-wrapper" }, l1 = { class: "data-table" }, c1 = { class: "table-body" }, d1 = { class: "table-cell font-medium" }, u1 = { class: "table-cell text-center" }, h1 = { class: "table-cell text-center success-value" }, f1 = {
  key: 0,
  class: "currency-cell-list"
}, g1 = { key: 1 }, p1 = { class: "table-cell" }, b1 = { class: "payment-tags" }, v1 = { class: "tag-name" }, m1 = {
  key: 0,
  class: "tag-amount"
}, y1 = {
  key: 1,
  class: "tag-amount"
}, _1 = { class: "tag-count" }, x1 = {
  key: 3,
  class: "empty-table-state"
}, k1 = "Not Registered", da = 3, w1 = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, { isDark: o } = lt(rt(a, "theme")), i = st(!1), r = st({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = D(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = D(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = st(!1), h = D(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((B, F) => Tt(B.date).valueOf() - Tt(F.date).valueOf())), f = D(() => u.value ? h.value : h.value.slice(0, da)), b = D(() => h.value.length > da), p = (B) => {
      if (!B)
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
      const F = (B.payment_method_breakdown || []).map((z) => ({
        payment_method: z.payment_method || "Unknown",
        total_amount: z.total_amount ?? 0,
        count: z.count ?? 0,
        total_amount_by_currency: z.total_amount_by_currency ?? []
      })), I = (B.payment_method_by_day || []).map((z) => ({
        date: z.date || "",
        total_count: z.total_count ?? 0,
        total_amount: z.total_amount ?? 0,
        total_amount_by_currency: z.total_amount_by_currency ?? [],
        payment_methods: (z.payment_methods || []).map((W) => ({
          payment_method: W.payment_method || "Unknown",
          total_amount: W.total_amount ?? 0,
          count: W.count ?? 0,
          total_amount_by_currency: W.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: B.airline_name || a.airlineName,
        start_date: B.start_date || "",
        end_date: B.end_date || "",
        total_conversations: B.total_conversations ?? 0,
        total_amount: B.total_amount ?? 0,
        total_amount_by_currency: B.total_amount_by_currency ?? [],
        payment_method_breakdown: F,
        payment_method_by_day: I
      };
    }, _ = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [B, F] = a.dates.map((z) => Tt(z).format("YYYY-MM-DD")), I = await a.fetchFunction(a.airlineName, B, F);
          r.value = p(I);
        } catch (B) {
          console.error("Error fetching payment method metrics:", B), r.value = p(null);
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
    ], g = (B) => {
      const F = m[B % m.length];
      return {
        background: F.bg,
        borderColor: F.border
      };
    }, v = (B) => ({ color: m[B % m.length].text }), $ = (B) => ({ color: m[B % m.length].value }), k = (B) => ({ color: m[B % m.length].icon }), w = (B) => ({ color: m[B % m.length].badge }), S = (B) => {
      const I = P(B).length;
      return I > 18 ? { fontSize: "0.75rem" } : I > 15 ? { fontSize: "0.875rem" } : I > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, C = (B) => {
      const F = B?.toLowerCase() || "";
      return !B || F === "unknown" ? Tg : F.includes("credit") || F.includes("debit") ? vo : F.includes("cash") || F.includes("efectivo") ? xg : F.includes("bank") || F.includes("transfer") ? kg : F.includes("zelle") || F.includes("pago") || F.includes("movil") ? Ag : F.includes("wallet") ? Bg : Dg;
    }, A = (B) => !B || B.toLowerCase() === "unknown" ? k1 : B.replace(/_/g, " "), P = (B) => B == null ? "$0.00" : dt(B), E = (B) => B ? Tt(B).format("DD/MM/YYYY") : "-", R = (B) => B == null || Number.isNaN(Number(B)) ? 0 : Number(B), N = (B) => {
      n("export", B);
    };
    function Y() {
      const B = a.data;
      B && (Array.isArray(B.payment_method_breakdown) && B.payment_method_breakdown.length > 0 || Array.isArray(B.payment_method_by_day) && B.payment_method_by_day.length > 0) && (i.value = !1, r.value = p(B));
    }
    return he(() => {
      a.data ? Y() : _();
    }), Vt(
      () => a.data,
      (B) => {
        B && Y();
      },
      { deep: !0 }
    ), Vt(
      () => a.dates,
      (B) => {
        a.data || B && B[0] && B[1] && _();
      },
      { deep: !0 }
    ), t({ isDark: o }), (B, F) => (y(), x("article", Hm, [
      c("header", jm, [
        c("div", Ym, [
          F[2] || (F[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Payment Method Metrics"),
            c("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !i.value && r.value.total_amount ? (y(), x("div", qm, [
            F[1] || (F[1] = c("p", { class: "badge-label" }, "Total Amount", -1)),
            r.value.total_amount_by_currency && r.value.total_amount_by_currency.length > 0 ? (y(), x("div", Um, [
              (y(!0), x(q, null, Z(r.value.total_amount_by_currency, (I) => (y(), x("p", {
                key: I.currency,
                class: "currency-breakdown-item"
              }, M(I.currency) + " " + M(P(I.total_value)), 1))), 128))
            ])) : (y(), x("p", Km, M(P(r.value.total_amount)), 1))
          ])) : O("", !0)
        ])
      ]),
      i.value ? (y(), x("div", Xm, [...F[3] || (F[3] = [
        Q('<div class="loading-container" data-v-ff4ce0b7><div class="chart-lines-loader" data-v-ff4ce0b7><div class="line line-1" data-v-ff4ce0b7></div><div class="line line-2" data-v-ff4ce0b7></div><div class="line line-3" data-v-ff4ce0b7></div><div class="line line-4" data-v-ff4ce0b7></div><div class="line line-5" data-v-ff4ce0b7></div></div><p class="loading-text" data-v-ff4ce0b7>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", Gm, [
        l.value ? (y(), x("section", Zm, [
          F[4] || (F[4] = c("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          c("div", Qm, [
            (y(!0), x(q, null, Z(r.value.payment_method_breakdown, (I, z) => (y(), x("div", {
              key: I.payment_method,
              class: "payment-method-card-item",
              style: xt(g(z))
            }, [
              c("div", Jm, [
                c("div", t1, [
                  (y(), ct($a(C(I.payment_method)), {
                    class: "payment-icon",
                    style: xt(k(z))
                  }, null, 8, ["style"])),
                  c("span", {
                    class: "payment-name",
                    style: xt(v(z))
                  }, M(A(I.payment_method)), 5)
                ]),
                c("p", {
                  class: "payment-amount",
                  style: xt([$(z), S(I.total_amount)])
                }, M(P(I.total_amount)), 5),
                I.total_amount_by_currency && I.total_amount_by_currency.length > 0 ? (y(), x("div", e1, [
                  (y(!0), x(q, null, Z(I.total_amount_by_currency, (W) => (y(), x("span", {
                    key: `${I.payment_method}-${W.currency}`
                  }, M(W.currency) + " " + M(P(W.total_value)), 1))), 128))
                ])) : O("", !0),
                c("div", s1, [
                  c("span", {
                    class: "payment-badge",
                    style: xt(w(z))
                  }, M(R(I.count)) + " " + M(R(I.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", a1, [
          c("div", n1, [
            c("div", o1, [
              X(T(vo), { class: "empty-icon" })
            ]),
            F[5] || (F[5] = c("p", { class: "empty-title" }, "No payment data available", -1)),
            F[6] || (F[6] = c("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", i1, [
          F[10] || (F[10] = c("p", { class: "section-label" }, "Daily Breakdown", -1)),
          c("div", r1, [
            c("table", l1, [
              F[8] || (F[8] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header text-left" }, "Date"),
                  c("th", { class: "table-header text-center" }, "Total Sales"),
                  c("th", { class: "table-header text-center" }, "Total Amount"),
                  c("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              c("tbody", c1, [
                (y(!0), x(q, null, Z(f.value, (I) => (y(), x("tr", {
                  key: I.date,
                  class: "table-row"
                }, [
                  c("td", d1, M(E(I.date)), 1),
                  c("td", u1, M(T(j)(I.total_count ?? 0)), 1),
                  c("td", h1, [
                    I.total_amount_by_currency && I.total_amount_by_currency.length > 0 ? (y(), x("div", f1, [
                      (y(!0), x(q, null, Z(I.total_amount_by_currency, (z) => (y(), x("span", {
                        key: `${I.date}-${z.currency}`
                      }, M(z.currency) + " " + M(P(z.total_value)), 1))), 128))
                    ])) : (y(), x("span", g1, M(P(I.total_amount)), 1))
                  ]),
                  c("td", p1, [
                    c("div", b1, [
                      (y(!0), x(q, null, Z(I.payment_methods || [], (z) => (y(), x("div", {
                        key: z.payment_method,
                        class: "payment-tag"
                      }, [
                        c("span", v1, M(A(z.payment_method)), 1),
                        F[7] || (F[7] = c("span", { class: "tag-separator" }, "•", -1)),
                        !z.total_amount_by_currency || z.total_amount_by_currency.length === 0 ? (y(), x("span", m1, M(P(z.total_amount)), 1)) : (y(), x("span", y1, M(z.total_amount_by_currency.map((W) => `${W.currency} ${P(W.total_value)}`).join(" / ")), 1)),
                        c("span", _1, "(" + M(R(z.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          b.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: F[0] || (F[0] = (I) => u.value = !u.value)
          }, [
            wt(M(u.value ? "View less" : `View more (${h.value.length - da} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: at(["view-more-icon", { "view-more-icon-rotated": u.value }]),
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
          ])) : O("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: N,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : l.value ? (y(), x("div", x1, [...F[11] || (F[11] = [
          c("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : O("", !0)
      ]))
    ]));
  }
}), $1 = /* @__PURE__ */ nt(w1, [["__scopeId", "data-v-ff4ce0b7"]]), M1 = { class: "agent-human-conv-card" }, S1 = {
  key: 0,
  class: "loading-state"
}, C1 = {
  key: 1,
  class: "card-body"
}, D1 = { class: "summary-cards" }, A1 = { class: "summary-card assigned-card" }, T1 = { class: "summary-card-content" }, B1 = { class: "card-content" }, L1 = { class: "card-value assigned-value" }, F1 = { class: "card-content" }, P1 = { class: "card-value assigned-value" }, E1 = { class: "summary-card closed-card" }, R1 = { class: "summary-card-content" }, O1 = { class: "card-content" }, I1 = { class: "card-value closed-value" }, z1 = { class: "card-content" }, V1 = { class: "card-value closed-value" }, N1 = {
  key: 0,
  class: "agents-section"
}, W1 = { class: "date-header" }, H1 = { class: "date-title" }, j1 = { class: "date-stats" }, Y1 = { class: "stat-item assigned-stat" }, q1 = { class: "stat-value" }, U1 = { class: "stat-value" }, K1 = { class: "stat-item closed-stat" }, X1 = { class: "stat-value" }, G1 = { class: "stat-value" }, Z1 = { class: "table-wrapper" }, Q1 = { class: "data-table" }, J1 = { class: "table-body" }, ty = { class: "table-cell name-cell" }, ey = { class: "table-cell email-cell" }, sy = { class: "table-cell text-center" }, ay = { class: "metric-cell-content" }, ny = { class: "badge assigned-badge" }, oy = { class: "metric-cell-avg" }, iy = { class: "table-cell text-center" }, ry = { class: "metric-cell-content" }, ly = { class: "badge closed-badge" }, cy = { class: "metric-cell-avg" }, dy = {
  key: 1,
  class: "empty-state"
}, uy = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (m) => {
      n("export", m);
    }, { isDark: i } = lt(rt(a, "theme")), r = D(() => a.data?.agents_by_day && a.data.agents_by_day.length > 0), l = D(() => {
      if (!r.value) return {};
      const m = {};
      for (const $ of a.data.agents_by_day)
        m[$.date] || (m[$.date] = []), m[$.date].push($);
      const g = Object.keys(m).sort(($, k) => new Date($).getTime() - new Date(k).getTime()), v = {};
      for (const $ of g)
        v[$] = m[$];
      return v;
    }), d = (m) => m == null ? "0" : j(m), u = (m) => {
      if (m == null)
        return "AVG";
      if (m < 60)
        return `${Math.round(m)}s`;
      const g = Math.round(m), v = Math.floor(g / 60), $ = g % 60;
      if (v < 60)
        return `${v}m ${$}s`;
      const k = Math.floor(v / 60), w = v % 60;
      return `${k}h ${w}m`;
    }, h = (m) => {
      const g = new Date(m), v = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return g.toLocaleDateString("en-US", v);
    }, f = (m) => m[0]?.day_total_assigned ?? 0, b = (m) => m[0]?.day_total_closed ?? 0, p = (m) => m[0]?.day_avg_time_to_assign_seconds ?? null, _ = (m) => m[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (m, g) => (y(), x("article", M1, [
      g[11] || (g[11] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agent Human Conversations"),
          c("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", S1, [...g[0] || (g[0] = [
        Q('<div class="loading-container" data-v-6cfba83b><div class="chart-bars-loader" data-v-6cfba83b><div class="bar bar-1" data-v-6cfba83b></div><div class="bar bar-2" data-v-6cfba83b></div><div class="bar bar-3" data-v-6cfba83b></div><div class="bar bar-4" data-v-6cfba83b></div><div class="bar bar-5" data-v-6cfba83b></div></div><p class="loading-text" data-v-6cfba83b>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", C1, [
        c("div", D1, [
          c("div", A1, [
            g[3] || (g[3] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", T1, [
              c("div", B1, [
                g[1] || (g[1] = c("p", { class: "card-label" }, "Total Assigned", -1)),
                c("p", L1, M(d(e.data.total_assigned)), 1)
              ]),
              c("div", F1, [
                g[2] || (g[2] = c("p", { class: "card-label" }, "AVG time to assign", -1)),
                c("p", P1, M(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          c("div", E1, [
            g[6] || (g[6] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", R1, [
              c("div", O1, [
                g[4] || (g[4] = c("p", { class: "card-label" }, "Total Closed", -1)),
                c("p", I1, M(d(e.data.total_closed)), 1)
              ]),
              c("div", z1, [
                g[5] || (g[5] = c("p", { class: "card-label" }, "AVG time to close", -1)),
                c("p", V1, M(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), x("div", N1, [
          (y(!0), x(q, null, Z(l.value, (v, $) => (y(), x("div", {
            key: $,
            class: "date-group"
          }, [
            c("div", W1, [
              c("h4", H1, M(h($)), 1),
              c("div", j1, [
                c("span", Y1, [
                  c("span", q1, M(d(f(v))), 1),
                  g[7] || (g[7] = wt(" Assigned ", -1)),
                  c("span", U1, M(u(p(v))), 1)
                ]),
                c("span", K1, [
                  c("span", X1, M(d(b(v))), 1),
                  g[8] || (g[8] = wt(" Closed ", -1)),
                  c("span", G1, M(u(_(v))), 1)
                ])
              ])
            ]),
            c("div", Z1, [
              c("table", Q1, [
                g[9] || (g[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Agent Name"),
                    c("th", { class: "table-header" }, "Email"),
                    c("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    c("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                c("tbody", J1, [
                  (y(!0), x(q, null, Z(v, (k) => (y(), x("tr", {
                    key: `${$}-${k.agent_email}`,
                    class: "table-row"
                  }, [
                    c("td", ty, M(k.agent_name || "-"), 1),
                    c("td", ey, M(k.agent_email), 1),
                    c("td", sy, [
                      c("div", ay, [
                        c("span", ny, M(d(k.assigned_count)), 1),
                        c("span", oy, M(u(k.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    c("td", iy, [
                      c("div", ry, [
                        c("span", ly, M(d(k.closed_count)), 1),
                        c("span", cy, M(u(k.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("div", dy, [...g[10] || (g[10] = [
          Q('<div class="empty-state-content" data-v-6cfba83b><div class="empty-icon-wrapper" data-v-6cfba83b><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6cfba83b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-6cfba83b></path></svg></div><p class="empty-title" data-v-6cfba83b>No agent human conversation data available</p><p class="empty-description" data-v-6cfba83b>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), hy = /* @__PURE__ */ nt(uy, [["__scopeId", "data-v-6cfba83b"]]), fy = { class: "channel-metrics-card" }, gy = {
  key: 0,
  class: "card-body"
}, py = {
  key: 0,
  class: "kpi-grid"
}, by = { class: "kpi-label" }, vy = { class: "kpi-value" }, my = { class: "kpi-card total-card" }, yy = { class: "kpi-value" }, _y = {
  key: 1,
  class: "chart-section"
}, xy = {
  key: 2,
  class: "empty-state"
}, ky = {
  key: 1,
  class: "loading-state"
}, wy = /* @__PURE__ */ J({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (f) => {
      n("export", f);
    }, { isDark: i, colors: r } = lt(rt(a, "theme")), l = st({ labels: [], datasets: [] }), d = D(() => a.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    }), u = D(() => ({
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
      const b = f.channels_by_day, p = Object.keys(b).sort();
      if (p.length === 0) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(b))
        for (const k of Object.keys($))
          _.add(k);
      const m = Array.from(_), g = {
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
      }, v = m.map(($) => {
        const k = $.toLowerCase(), w = g[k] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: p.map((S) => b[S]?.[$] || 0),
          borderColor: w,
          backgroundColor: `${w}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: w,
          pointBorderColor: w,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      l.value = {
        labels: p.map(($) => Tt($).format("MMM DD")),
        datasets: v
      };
    };
    return Vt(
      () => a.data,
      (f) => {
        h(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (f, b) => (y(), x("article", fy, [
      b[3] || (b[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Channel Metrics"),
          c("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      a.loading ? (y(), x("div", ky, [...b[2] || (b[2] = [
        Q('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", gy, [
        Object.keys(d.value.total_by_channel).length ? (y(), x("div", py, [
          (y(!0), x(q, null, Z(Object.keys(d.value.total_by_channel), (p) => (y(), x("div", {
            class: "kpi-card",
            key: p
          }, [
            c("span", by, M(p.toUpperCase()), 1),
            c("span", vy, M(T(j)(d.value.total_by_channel[p])), 1)
          ]))), 128)),
          c("div", my, [
            b[0] || (b[0] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
            c("span", yy, M(T(j)(d.value.total_conversations)), 1)
          ])
        ])) : O("", !0),
        l.value.labels && l.value.labels.length ? (y(), x("section", _y, [
          X(fe, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", xy, [...b[1] || (b[1] = [
          Q('<div class="empty-state-content" data-v-82f175d2><div class="empty-icon-wrapper" data-v-82f175d2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82f175d2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-82f175d2></path></svg></div><p class="empty-title" data-v-82f175d2>No channel metrics data available</p><p class="empty-description" data-v-82f175d2>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), $y = /* @__PURE__ */ nt(wy, [["__scopeId", "data-v-82f175d2"]]), My = { class: "triage-combinations-card" }, Sy = { class: "card-header" }, Cy = { class: "total-badge" }, Dy = {
  key: 0,
  class: "card-body"
}, Ay = { class: "chart-container" }, Ty = { class: "table-container" }, By = { class: "table-row" }, Ly = { class: "table-row" }, Fy = { class: "table-cell text-center count-cell" }, Py = { class: "table-cell text-center count-cell" }, Ey = { class: "table-cell text-center count-cell" }, Ry = { class: "table-cell text-center count-cell" }, Oy = { class: "table-cell text-center count-cell" }, Iy = {
  key: 1,
  class: "empty-state"
}, zy = { class: "empty-state-content" }, Vy = { class: "empty-icon-wrapper" }, Ny = {
  key: 1,
  class: "loading-state"
}, Wy = /* @__PURE__ */ J({
  __name: "TriageCombinations",
  props: {
    data: { default: () => ({ combinations: {} }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (g) => {
      n("export", g);
    }, { isDark: i, colors: r } = lt(rt(a, "theme")), l = D(() => {
      const g = a.data?.combinations || {}, v = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, k] of Object.entries(g)) {
        const w = $.split("+").filter(Boolean);
        if (!w.includes("triage")) continue;
        const S = w.filter((C) => C !== "triage").length;
        S >= 4 ? v["4p"] += Number(k) || 0 : v[S] += Number(k) || 0;
      }
      return v;
    }), d = D(() => {
      const g = l.value;
      return g[0] + g[1] + g[2] + g[3] + g["4p"] || 0;
    }), u = D(() => Object.keys(a.data?.combinations || {}).length > 0), h = D(() => {
      const g = d.value;
      if (!g) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const v = l.value;
      return {
        pct0: v[0] / g * 100,
        pct1: v[1] / g * 100,
        pct2: v[2] / g * 100,
        pct3: v[3] / g * 100,
        pct4p: v["4p"] / g * 100
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
    }, b = (g) => g?.replace("80", "") || "#888888", p = D(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: f.c0,
          borderColor: b(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: f.c1,
          borderColor: b(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: f.c2,
          borderColor: b(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: f.c3,
          borderColor: b(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: b(f.c4p),
          borderWidth: 1
        }
      ]
    })), _ = D(() => ({
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
            label: (g) => `${g.dataset.label} intent(s): ${Number(g.raw || 0).toFixed(0)}%`
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
    })), m = (g) => `${(Number(g) || 0).toFixed(0)}`;
    return t({ isDark: i }), (g, v) => (y(), x("article", My, [
      c("header", Sy, [
        v[0] || (v[0] = c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          c("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        c("span", Cy, " Total: " + M(d.value), 1)
      ]),
      e.loading ? (y(), x("div", Ny, [...v[6] || (v[6] = [
        Q('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", Dy, [
        u.value ? (y(), x(q, { key: 0 }, [
          c("div", Ay, [
            X(ae, {
              data: p.value,
              options: _.value
            }, null, 8, ["data", "options"])
          ]),
          c("div", Ty, [
            v[3] || (v[3] = Q('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            c("div", By, [
              v[1] || (v[1] = c("div", { class: "table-cell row-label" }, "% of total", -1)),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: b(f.c0) })
              }, M(m(h.value.pct0)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: b(f.c1) })
              }, M(m(h.value.pct1)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: b(f.c2) })
              }, M(m(h.value.pct2)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: b(f.c3) })
              }, M(m(h.value.pct3)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: b(f.c4p) })
              }, M(m(h.value.pct4p)) + "% ", 5)
            ]),
            c("div", Ly, [
              v[2] || (v[2] = c("div", { class: "table-cell row-label" }, "Count", -1)),
              c("div", Fy, M(T(j)(l.value[0])), 1),
              c("div", Py, M(T(j)(l.value[1])), 1),
              c("div", Ey, M(T(j)(l.value[2])), 1),
              c("div", Ry, M(T(j)(l.value[3])), 1),
              c("div", Oy, M(T(j)(l.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ], 64)) : (y(), x("div", Iy, [
          c("div", zy, [
            c("div", Vy, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            v[4] || (v[4] = c("p", { class: "empty-title" }, "No triage combinations data", -1)),
            v[5] || (v[5] = c("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Hy = /* @__PURE__ */ nt(Wy, [["__scopeId", "data-v-cb93cda2"]]), jy = { class: "select-language-card" }, Yy = { class: "card-header" }, qy = { class: "header-content" }, Uy = {
  key: 0,
  class: "total-badge"
}, Ky = { class: "badge-value" }, Xy = {
  key: 0,
  class: "loading-state"
}, Gy = {
  key: 1,
  class: "card-body"
}, Zy = {
  key: 0,
  class: "pie-section"
}, Qy = {
  key: 1,
  class: "empty-state"
}, Jy = /* @__PURE__ */ J({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = [
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
    }, r = (b) => i[b]?.label || b.toUpperCase(), l = D(
      () => s.data?.items && s.data.items.length > 0
    ), d = D(
      () => (s.data?.items || []).reduce((b, p) => b + p.count, 0)
    ), u = D(() => {
      const b = {};
      for (const p of s.data?.items || [])
        b[p.language] = (b[p.language] || 0) + p.count;
      return Object.entries(b).map(([p, _]) => ({ language: p, count: _ })).sort((p, _) => _.count - p.count);
    }), h = D(() => ({
      labels: u.value.map((b) => r(b.language)),
      datasets: [{
        data: u.value.map((b) => b.count),
        backgroundColor: u.value.map((b, p) => o[p % o.length] + "80"),
        borderColor: u.value.map((b, p) => o[p % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), f = D(() => ({
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
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (b) => {
              const p = b.raw || 0, _ = d.value > 0 ? (p / d.value * 100).toFixed(1) : "0";
              return ` ${b.label}: ${p} (${_}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (b, p) => (y(), x("article", jy, [
      c("header", Yy, [
        c("div", qy, [
          p[1] || (p[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Language Selection"),
            c("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          s.loading ? O("", !0) : (y(), x("div", Uy, [
            p[0] || (p[0] = c("p", { class: "badge-label" }, "Total", -1)),
            c("p", Ky, M(T(j)(d.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", Xy, [...p[2] || (p[2] = [
        Q('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", Gy, [
        l.value ? (y(), x("section", Zy, [
          X(Ws, {
            data: h.value,
            options: f.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", Qy, [...p[3] || (p[3] = [
          Q('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), t_ = /* @__PURE__ */ nt(Jy, [["__scopeId", "data-v-216eadc2"]]), e_ = { class: "guardrails-card" }, s_ = { class: "card-header" }, a_ = { class: "header-content" }, n_ = {
  key: 0,
  class: "total-badge"
}, o_ = { class: "badge-value" }, i_ = {
  key: 0,
  class: "loading-state"
}, r_ = {
  key: 1,
  class: "card-body"
}, l_ = { class: "summary-card" }, c_ = { class: "summary-items" }, d_ = { class: "summary-item" }, u_ = { class: "summary-value" }, h_ = { class: "summary-pct" }, f_ = { class: "summary-item" }, g_ = { class: "summary-pct" }, p_ = { class: "summary-item" }, b_ = { class: "summary-value" }, v_ = { class: "summary-pct" }, m_ = {
  key: 0,
  class: "table-section"
}, y_ = { class: "table-wrapper" }, __ = { class: "data-table" }, x_ = { class: "table-body" }, k_ = { class: "table-cell font-medium text-center" }, w_ = { class: "table-cell text-center font-semibold" }, $_ = { class: "table-cell" }, M_ = { class: "type-badges-row" }, S_ = {
  key: 1,
  class: "empty-state"
}, ua = 3, C_ = /* @__PURE__ */ J({
  __name: "Guardrails",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (g) => {
      n("export", g);
    }, { isDark: i } = lt(rt(a, "theme")), r = D(
      () => a.data?.items && a.data.items.length > 0
    ), l = D(
      () => (a.data?.items || []).reduce((g, v) => g + v.count, 0)
    ), d = (g) => {
      const v = {};
      for (const w of a.data?.items || [])
        v[w[g]] = (v[w[g]] || 0) + w.count;
      const $ = Object.entries(v).sort((w, S) => S[1] - w[1]);
      if ($.length === 0) return { name: "—", pct: 0 };
      const k = l.value;
      return {
        name: $[0][0],
        pct: k > 0 ? Math.round($[0][1] / k * 100) : 0
      };
    }, u = D(() => d("guardrail_type")), h = D(() => d("guardrail_action")), f = D(() => d("guardrail_source")), b = D(() => {
      const g = {};
      for (const v of a.data?.items || [])
        g[v.date] || (g[v.date] = {}), g[v.date][v.guardrail_type] = (g[v.date][v.guardrail_type] || 0) + v.count;
      return Object.entries(g).map(([v, $]) => ({
        date: v,
        total: Object.values($).reduce((k, w) => k + w, 0),
        types: Object.entries($).map(([k, w]) => ({ type: k, count: w })).sort((k, w) => w.count - k.count)
      })).sort((v, $) => new Date(v.date).getTime() - new Date($.date).getTime());
    }), p = st(!1), _ = D(() => p.value ? b.value : b.value.slice(0, ua)), m = D(() => b.value.length > ua);
    return t({ isDark: i }), (g, v) => (y(), x("article", e_, [
      c("header", s_, [
        c("div", a_, [
          v[2] || (v[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Guardrails Metrics"),
            c("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          a.loading ? O("", !0) : (y(), x("div", n_, [
            v[1] || (v[1] = c("p", { class: "badge-label" }, "Total Events", -1)),
            c("p", o_, M(T(j)(l.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", i_, [...v[3] || (v[3] = [
        Q('<div class="loading-container" data-v-02a2e95e><div class="chart-bars-loader" data-v-02a2e95e><div class="bar bar-1" data-v-02a2e95e></div><div class="bar bar-2" data-v-02a2e95e></div><div class="bar bar-3" data-v-02a2e95e></div><div class="bar bar-4" data-v-02a2e95e></div><div class="bar bar-5" data-v-02a2e95e></div></div><p class="loading-text" data-v-02a2e95e>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", r_, [
        r.value ? (y(), x(q, { key: 0 }, [
          c("div", l_, [
            c("div", c_, [
              c("div", d_, [
                v[4] || (v[4] = c("span", { class: "summary-label" }, "Top type:", -1)),
                c("span", u_, M(u.value.name), 1),
                c("span", h_, "(" + M(u.value.pct) + "%)", 1)
              ]),
              v[7] || (v[7] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", f_, [
                v[5] || (v[5] = c("span", { class: "summary-label" }, "Top action:", -1)),
                c("span", {
                  class: at(["summary-value", `summary-action-${h.value.name.toLowerCase()}`])
                }, M(h.value.name), 3),
                c("span", g_, "(" + M(h.value.pct) + "%)", 1)
              ]),
              v[8] || (v[8] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", p_, [
                v[6] || (v[6] = c("span", { class: "summary-label" }, "Top source:", -1)),
                c("span", b_, M(f.value.name), 1),
                c("span", v_, "(" + M(f.value.pct) + "%)", 1)
              ])
            ])
          ]),
          b.value.length > 0 ? (y(), x("section", m_, [
            v[11] || (v[11] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            c("div", y_, [
              c("table", __, [
                v[9] || (v[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Date"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                c("tbody", x_, [
                  (y(!0), x(q, null, Z(_.value, ($) => (y(), x("tr", {
                    key: $.date,
                    class: "table-row"
                  }, [
                    c("td", k_, M(T(Tt)($.date).format("DD/MM")), 1),
                    c("td", w_, M(T(j)($.total)), 1),
                    c("td", $_, [
                      c("div", M_, [
                        (y(!0), x(q, null, Z($.types, (k) => (y(), x("span", {
                          key: k.type,
                          class: "type-count-badge"
                        }, M(k.type) + " (" + M(k.count) + ") ", 1))), 128))
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ]),
            m.value ? (y(), x("button", {
              key: 0,
              class: "view-more-btn",
              onClick: v[0] || (v[0] = ($) => p.value = !p.value)
            }, [
              wt(M(p.value ? "View less" : `View more (${b.value.length - ua} more rows)`) + " ", 1),
              (y(), x("svg", {
                class: at(["view-more-icon", { "view-more-icon-rotated": p.value }]),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [...v[10] || (v[10] = [
                c("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ])], 2))
            ])) : O("", !0),
            e.enableExport ? (y(), ct(T(yt), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : O("", !0)
          ])) : O("", !0)
        ], 64)) : (y(), x("section", S_, [...v[12] || (v[12] = [
          Q('<div class="empty-state-content" data-v-02a2e95e><div class="empty-icon-wrapper" data-v-02a2e95e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-02a2e95e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-02a2e95e></path></svg></div><p class="empty-title" data-v-02a2e95e>No guardrail events</p><p class="empty-description" data-v-02a2e95e>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), D_ = /* @__PURE__ */ nt(C_, [["__scopeId", "data-v-02a2e95e"]]), A_ = { class: "dn-metrics-card" }, T_ = { class: "card-header" }, B_ = { class: "header-content" }, L_ = {
  key: 0,
  class: "total-docs-badge"
}, F_ = { class: "badge-value" }, P_ = {
  key: 0,
  class: "loading-state"
}, E_ = {
  key: 1,
  class: "card-body"
}, R_ = { class: "kpi-grid" }, O_ = { class: "kpi-card kpi-neutral" }, I_ = { class: "kpi-value" }, z_ = { class: "kpi-card kpi-success" }, V_ = { class: "kpi-value kpi-value-success" }, N_ = { class: "kpi-pct" }, W_ = { class: "kpi-card kpi-danger" }, H_ = { class: "kpi-value kpi-value-error" }, j_ = { class: "kpi-pct" }, Y_ = { class: "kpi-card kpi-warning" }, q_ = { class: "kpi-value kpi-value-reason" }, U_ = { class: "kpi-pct" }, K_ = { class: "chart-section" }, X_ = { class: "chart-wrapper" }, G_ = {
  key: 1,
  class: "empty-chart"
}, Z_ = {
  key: 0,
  class: "table-section"
}, Q_ = { class: "table-wrapper" }, J_ = { class: "data-table" }, t2 = { class: "table-body" }, e2 = { class: "table-cell text-left font-medium" }, s2 = { class: "table-cell text-center font-semibold" }, a2 = { class: "table-cell text-center" }, n2 = { class: "impact-bar-container" }, o2 = { class: "impact-label" }, i2 = {
  key: 1,
  class: "chart-section"
}, r2 = { class: "chart-wrapper" }, l2 = { class: "system-health" }, c2 = { class: "system-health-content" }, d2 = { class: "sys-kpi-grid" }, u2 = { class: "sys-kpi" }, h2 = { class: "sys-value" }, f2 = { class: "sys-kpi" }, g2 = { class: "sys-value" }, p2 = { class: "sys-kpi" }, b2 = { class: "sys-value sys-error" }, v2 = { class: "sys-kpi" }, m2 = { class: "sys-value" }, y2 = { class: "sys-kpi" }, _2 = { class: "sys-value" }, x2 = { class: "sys-kpi" }, k2 = { class: "sys-value sys-error" }, w2 = {
  key: 1,
  class: "empty-state"
}, $2 = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (k) => {
      n("export", k);
    }, { isDark: i, colors: r } = lt(rt(a, "theme")), l = D(() => {
      const k = a.data?.documentCounts?.items || [], w = a.data?.processingCounts?.items || [];
      return k.length > 0 || w.length > 0;
    }), d = D(() => {
      const k = a.data?.documentCounts?.items || [];
      return {
        processing_started: k.reduce((w, S) => w + S.processing_started, 0),
        processing_completed: k.reduce((w, S) => w + S.processing_completed, 0),
        processing_failed: k.reduce((w, S) => w + S.processing_failed, 0),
        row_count_total: k.reduce((w, S) => w + S.row_count_total, 0)
      };
    }), u = D(() => {
      const k = a.data?.processingCounts?.items || [];
      return {
        processing_started: k.reduce((w, S) => w + S.processing_started, 0),
        processing_success: k.reduce((w, S) => w + S.processing_success, 0),
        notification_sent: k.reduce((w, S) => w + S.notification_sent, 0),
        notification_failed: k.reduce((w, S) => w + S.notification_failed, 0),
        dq_phone: k.reduce((w, S) => w + S.dq_error_phone_not_found, 0),
        dq_flight: k.reduce((w, S) => w + S.dq_error_flight_not_found, 0),
        dq_booking: k.reduce((w, S) => w + S.dq_error_booking_not_found, 0),
        dq_other: k.reduce((w, S) => w + S.dq_error_other, 0),
        totalDqErrors: k.reduce((w, S) => w + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other, 0)
      };
    }), h = D(() => d.value.row_count_total || u.value.processing_started), f = D(() => Math.max(0, h.value - u.value.notification_sent)), b = (k, w) => w ? `${Math.round(k / w * 100)}%` : "0%", p = D(() => {
      const k = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((w) => w.count > 0).sort((w, S) => S.count - w.count);
      return k.length > 0 ? k[0] : { reason: "None", count: 0 };
    }), _ = D(() => {
      const k = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((w) => ({
        ...w,
        impactPct: k > 0 ? Math.round(w.count / k * 100) : 0
      }));
    }), m = D(() => {
      const k = h.value, w = u.value.processing_success, S = Math.max(0, w - u.value.totalDqErrors), C = u.value.notification_sent, A = Math.max(0, k - w), P = u.value.totalDqErrors, E = Math.max(0, S - C), R = (B, F) => {
        const I = F > 0 ? Math.round(B / F * 100) : 0;
        return `${B.toLocaleString()} (${I}%)`;
      }, N = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], Y = [];
      return w > 0 && Y.push({ source: "Records Detected", target: "Valid Reservations", value: w, label: R(w, k) }), A > 0 && Y.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: A, label: R(A, k) }), S > 0 && Y.push({ source: "Valid Reservations", target: "Contactable", value: S, label: R(S, k) }), P > 0 && Y.push({ source: "Valid Reservations", target: "Data Quality Issues", value: P, label: R(P, k) }), C > 0 && Y.push({ source: "Contactable", target: "Notified", value: C, label: R(C, k) }), E > 0 && Y.push({ source: "Contactable", target: "Not Delivered", value: E, label: R(E, k) }), { nodes: N, links: Y };
    }), g = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, v = D(() => {
      const k = [...a.data?.processingCounts?.items || []].sort(
        (R, N) => new Date(R.date).getTime() - new Date(N.date).getTime()
      ), w = a.data?.documentCounts?.items || [], S = {};
      for (const R of w)
        S[R.date] = (S[R.date] || 0) + R.row_count_total;
      const C = [.../* @__PURE__ */ new Set([...k.map((R) => R.date), ...w.map((R) => R.date)])].sort(), A = C.map((R) => Tt(R).format("MMM DD")), P = C.map((R) => {
        const N = k.find((F) => F.date === R), Y = N?.notification_sent || 0, B = S[R] || N?.processing_started || 0;
        return B > 0 ? Math.round(Y / B * 100) : 0;
      }), E = C.map((R) => k.find((Y) => Y.date === R)?.notification_sent || 0);
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
            data: E,
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
    }), $ = D(() => ({
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
            label: (k) => k.datasetIndex === 0 ? ` Success Rate: ${k.raw}%` : ` Notifications: ${k.raw}`
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
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary, callback: (k) => k + "%" },
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
    return t({ isDark: i }), (k, w) => (y(), x("article", A_, [
      c("header", T_, [
        c("div", B_, [
          w[1] || (w[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Notifier"),
            c("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          a.loading ? O("", !0) : (y(), x("div", L_, [
            w[0] || (w[0] = c("p", { class: "badge-label" }, "Total Records", -1)),
            c("p", F_, M(T(j)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", P_, [...w[2] || (w[2] = [
        Q('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", E_, [
        l.value ? (y(), x(q, { key: 0 }, [
          c("div", R_, [
            c("div", O_, [
              w[3] || (w[3] = c("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              c("span", I_, M(T(j)(h.value)), 1)
            ]),
            c("div", z_, [
              w[4] || (w[4] = c("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              c("span", V_, M(T(j)(u.value.notification_sent)), 1),
              c("span", N_, M(b(u.value.notification_sent, h.value)), 1)
            ]),
            c("div", W_, [
              w[5] || (w[5] = c("span", { class: "kpi-label" }, "Not Notified", -1)),
              c("span", H_, M(T(j)(f.value)), 1),
              c("span", j_, M(b(f.value, h.value)), 1)
            ]),
            c("div", Y_, [
              w[6] || (w[6] = c("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              c("span", q_, M(p.value.reason), 1),
              c("span", U_, M(T(j)(p.value.count)) + " cases", 1)
            ])
          ]),
          c("section", K_, [
            w[8] || (w[8] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            c("div", X_, [
              m.value.nodes.length > 0 && m.value.links.length > 0 ? (y(), ct(ge, {
                key: 0,
                data: m.value,
                "node-colors": g,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", G_, [...w[7] || (w[7] = [
                c("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          _.value.length > 0 ? (y(), x("section", Z_, [
            w[10] || (w[10] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            c("div", Q_, [
              c("table", J_, [
                w[9] || (w[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header text-left" }, "Reason"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                c("tbody", t2, [
                  (y(!0), x(q, null, Z(_.value, (S) => (y(), x("tr", {
                    key: S.reason,
                    class: "table-row"
                  }, [
                    c("td", e2, M(S.reason), 1),
                    c("td", s2, M(T(j)(S.count)), 1),
                    c("td", a2, [
                      c("div", n2, [
                        c("div", {
                          class: "impact-bar",
                          style: xt({ width: S.impactPct + "%" })
                        }, null, 4),
                        c("span", o2, M(S.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : O("", !0),
          v.value.labels.length > 0 ? (y(), x("section", i2, [
            w[11] || (w[11] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            c("div", r2, [
              X(fe, {
                data: v.value,
                options: $.value
              }, null, 8, ["data", "options"])
            ])
          ])) : O("", !0),
          c("details", l2, [
            w[18] || (w[18] = c("summary", { class: "system-health-toggle" }, [
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
              wt(" System Health Details ")
            ], -1)),
            c("div", c2, [
              c("div", d2, [
                c("div", u2, [
                  w[12] || (w[12] = c("span", { class: "sys-label" }, "Docs Started", -1)),
                  c("span", h2, M(T(j)(d.value.processing_started)), 1)
                ]),
                c("div", f2, [
                  w[13] || (w[13] = c("span", { class: "sys-label" }, "Docs Completed", -1)),
                  c("span", g2, M(T(j)(d.value.processing_completed)), 1)
                ]),
                c("div", p2, [
                  w[14] || (w[14] = c("span", { class: "sys-label" }, "Docs Failed", -1)),
                  c("span", b2, M(T(j)(d.value.processing_failed)), 1)
                ]),
                c("div", v2, [
                  w[15] || (w[15] = c("span", { class: "sys-label" }, "Processing Started", -1)),
                  c("span", m2, M(T(j)(u.value.processing_started)), 1)
                ]),
                c("div", y2, [
                  w[16] || (w[16] = c("span", { class: "sys-label" }, "Processing Success", -1)),
                  c("span", _2, M(T(j)(u.value.processing_success)), 1)
                ]),
                c("div", x2, [
                  w[17] || (w[17] = c("span", { class: "sys-label" }, "Notification Failed", -1)),
                  c("span", k2, M(T(j)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ], 64)) : (y(), x("section", w2, [...w[19] || (w[19] = [
          Q('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), M2 = /* @__PURE__ */ nt($2, [["__scopeId", "data-v-d8baf32c"]]), S2 = { class: "nps-daily-card" }, C2 = { class: "card-header" }, D2 = { class: "header-content" }, A2 = {
  key: 0,
  class: "stats-badge"
}, T2 = { class: "badge-value" }, B2 = {
  key: 0,
  class: "loading-state"
}, L2 = {
  key: 1,
  class: "card-body"
}, F2 = { class: "tooltip-content" }, P2 = { class: "tooltip-title" }, E2 = { class: "tooltip-stats" }, R2 = { class: "tooltip-stat-row" }, O2 = { class: "tooltip-value" }, I2 = { class: "tooltip-stat-row" }, z2 = { class: "tooltip-value" }, V2 = { class: "tooltip-stat-row" }, N2 = { class: "tooltip-value" }, W2 = { class: "tooltip-stat-row" }, H2 = { class: "tooltip-value" }, j2 = { class: "tooltip-stat-row" }, Y2 = { class: "tooltip-value" }, q2 = { class: "tooltip-stat-row" }, U2 = { class: "tooltip-value" }, K2 = {
  key: 2,
  class: "empty-state"
}, mo = 400, Ve = 60, yo = 90, _o = 120, X2 = {
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
  setup(e, { expose: t, emit: s }) {
    const a = s, n = (m) => {
      a("export", m);
    }, o = e, { isDark: i } = lt(rt(o, "theme")), r = D(() => o.data), l = st(null), d = st({
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
    }), u = D(() => {
      if (!r.value || !r.value.nps_by_day) return 800;
      const m = r.value.nps_by_day.length;
      return Math.max(800, Ve * 2 + m * _o);
    }), h = (m, g) => {
      const $ = (m - 1) / 9;
      return Ve + g - $ * g;
    }, f = (m) => m ? Tt(m).format("DD-MM-YYYY") : "", b = D(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const m = [], g = mo - Ve - yo;
      return r.value.nps_by_day.forEach((v, $) => {
        const k = v.min_score || 0, w = v.q1_score || 0, S = v.median_score || 0, C = v.q3_score || 0, A = v.max_score || 0, P = v.average_score || 0;
        m.push({
          label: f(v.date),
          responseCount: v.nps_responses_count || 0,
          isTotal: !1,
          low: k,
          q1: w,
          median: S,
          q3: C,
          high: A,
          average: P,
          highY: h(A, g),
          lowY: h(k, g),
          q1Y: h(w, g),
          q3Y: h(C, g),
          medianY: h(S, g),
          averageY: P > 0 ? h(P, g) : null,
          centerX: Ve + ($ + 1) * _o
        });
      }), m;
    }), p = (m, g) => {
      if (!l.value || !g || g.horizontal) return;
      const v = l.value.getBoundingClientRect(), $ = m.clientX, k = m.clientY, w = 140, S = 160, C = 10, A = 15;
      let P = $ - v.left - w / 2, E = k - v.top - S - A;
      P = Math.max(C, Math.min(P, v.width - w - C)), E < C && (E = k - v.top + A), E = Math.max(C, Math.min(E, v.height - S - C)), d.value = {
        visible: !0,
        x: P,
        y: E,
        date: g.label || "",
        min: g.low !== void 0 ? g.low.toFixed(1) : "N/A",
        max: g.high !== void 0 ? g.high.toFixed(1) : "N/A",
        q1: g.open !== void 0 ? g.open.toFixed(1) : "N/A",
        avg: g.average !== void 0 && g.average > 0 ? g.average.toFixed(1) : "N/A",
        q3: g.close !== void 0 ? g.close.toFixed(1) : "N/A",
        median: g.median !== void 0 ? g.median.toFixed(1) : "N/A"
      };
    }, _ = () => {
      d.value.visible = !1;
    };
    return t({ isDark: i }), (m, g) => (y(), x("article", S2, [
      c("header", C2, [
        c("div", D2, [
          g[1] || (g[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            c("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", A2, [
            g[0] || (g[0] = c("p", { class: "badge-label" }, "Days", -1)),
            c("p", T2, M(r.value.nps_by_day.length), 1)
          ])) : O("", !0)
        ])
      ]),
      o.loading ? (y(), x("div", B2, [...g[2] || (g[2] = [
        Q('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", L2, [
        c("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          b.value && b.value.length > 0 ? (y(), ct(Ci, {
            key: 0,
            "candlestick-data": b.value,
            "chart-width": u.value,
            "chart-height": mo,
            "chart-margin": Ve,
            "chart-bottom-margin": yo,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: p,
            onCandleLeave: _
          }, null, 8, ["candlestick-data", "chart-width"])) : O("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: xt({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            c("div", F2, [
              c("div", P2, M(d.value.date), 1),
              g[9] || (g[9] = c("div", { class: "tooltip-divider" }, null, -1)),
              c("div", E2, [
                c("div", R2, [
                  g[3] || (g[3] = c("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  c("span", O2, M(d.value.min), 1)
                ]),
                c("div", I2, [
                  g[4] || (g[4] = c("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  c("span", z2, M(d.value.q1), 1)
                ]),
                c("div", V2, [
                  g[5] || (g[5] = c("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  c("span", N2, M(d.value.median), 1)
                ]),
                c("div", W2, [
                  g[6] || (g[6] = c("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  c("span", H2, M(d.value.avg), 1)
                ]),
                c("div", j2, [
                  g[7] || (g[7] = c("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  c("span", Y2, M(d.value.q3), 1)
                ]),
                c("div", q2, [
                  g[8] || (g[8] = c("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  c("span", U2, M(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : O("", !0)
        ], 512),
        e.enableExport ? (y(), ct(T(yt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ])) : (y(), x("div", K2, [...g[10] || (g[10] = [
        Q('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Ai = /* @__PURE__ */ nt(X2, [["__scopeId", "data-v-b20112a7"]]), G2 = { class: "nps-overview-card" }, Z2 = { class: "card-header" }, Q2 = { class: "header-content" }, J2 = { class: "header-badges" }, tx = {
  key: 0,
  class: "stats-badge"
}, ex = { class: "badge-value" }, sx = {
  key: 1,
  class: "stats-badge"
}, ax = { class: "badge-value" }, nx = {
  key: 0,
  class: "loading-state"
}, ox = {
  key: 1,
  class: "card-body"
}, ix = { class: "chart-wrapper" }, rx = {
  key: 2,
  class: "empty-state"
}, lx = 500, cx = 60, dx = 80, ux = {
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
  setup(e, { expose: t, emit: s }) {
    const a = s, n = (d) => {
      a("export", d);
    }, o = e, { isDark: i } = lt(rt(o, "theme")), r = D(() => o.data), l = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (y(), x("article", G2, [
      c("header", Z2, [
        c("div", Q2, [
          u[2] || (u[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            c("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          c("div", J2, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", tx, [
              u[0] || (u[0] = c("p", { class: "badge-label" }, "Responses", -1)),
              c("p", ex, M(r.value.total_nps_responses), 1)
            ])) : O("", !0),
            r.value && r.value.p95_score > 0 ? (y(), x("div", sx, [
              u[1] || (u[1] = c("p", { class: "badge-label" }, "Percentile 95", -1)),
              c("p", ax, M(r.value.p95_score || 0), 1)
            ])) : O("", !0)
          ])
        ])
      ]),
      o.loading ? (y(), x("div", nx, [...u[3] || (u[3] = [
        Q('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", ox, [
        c("div", ix, [
          X(Di, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": lx,
            "chart-margin": cx,
            "chart-bottom-margin": dx
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), ct(T(yt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ])) : (y(), x("div", rx, [...u[4] || (u[4] = [
        Q('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Ti = /* @__PURE__ */ nt(ux, [["__scopeId", "data-v-30fe5f88"]]), hx = { class: "nps-metrics-container" }, fx = {
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
    const s = t, a = (n) => {
      s("export", n);
    };
    return (n, o) => (y(), x("div", hx, [
      X(Ti, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      X(Ai, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, gx = /* @__PURE__ */ nt(fx, [["__scopeId", "data-v-25fe3b80"]]), px = { class: "aws-cost-card" }, bx = { class: "card-header" }, vx = { class: "header-main" }, mx = { class: "header-content" }, yx = { class: "card-title" }, _x = { class: "header-stats" }, xx = { class: "stat-badge primary" }, kx = { class: "stat-value" }, wx = { class: "stat-badge secondary" }, $x = { class: "stat-value" }, Mx = { class: "card-body" }, Sx = {
  key: 0,
  class: "loading-state"
}, Cx = {
  key: 1,
  class: "chart-section"
}, Dx = { class: "chart-container" }, Ax = {
  key: 2,
  class: "empty-state"
}, Tx = { class: "empty-state-content" }, Bx = { class: "empty-icon-wrapper" }, Lx = {
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
    const t = e, { isDark: s, colors: a } = lt(rt(t, "theme")), n = D(() => {
      const r = t.data ?? {}, l = r.daily, d = r.days, u = Array.isArray(l) && l.length > 0, h = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let f = [];
      return u ? f = l : h && (f = d.map((b, p) => ({
        date: b,
        allocated_cost: r.allocatedCostSeries[p] ?? 0,
        aws_cost: r.awsCostSeries[p] ?? 0,
        airline_conversations: r.airlineConversationsSeries[p] ?? 0
      }))), {
        daily: f,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), o = D(() => {
      const r = n.value.daily;
      return {
        labels: r.map((d) => d.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: r.map((d) => d.allocated_cost),
            borderColor: a.value.primaryLight,
            backgroundColor: s.value ? "rgba(198, 125, 255, 0.15)" : "rgba(198, 125, 255, 0.08)",
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
            borderColor: a.value.info,
            backgroundColor: s.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.3,
            yAxisID: "y1"
          }
        ]
      };
    }), i = D(() => ({
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
            color: a.value.textSecondary,
            font: {
              family: "'DM Sans', sans-serif",
              size: 11,
              weight: "600"
            }
          }
        },
        tooltip: {
          padding: 12,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
          borderColor: a.value.tooltipBorder,
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
            color: a.value.gridLines,
            drawBorder: !1
          },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 },
            callback: (r) => dt(r)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        }
      }
    }));
    return (r, l) => (y(), x("article", px, [
      c("header", bx, [
        c("div", vx, [
          c("div", mx, [
            c("h3", yx, M(n.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = c("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          c("div", _x, [
            c("div", xx, [
              l[1] || (l[1] = c("span", { class: "stat-label" }, "Total Allocated", -1)),
              c("span", kx, M(T(dt)(n.value.total_allocated_cost)), 1)
            ]),
            c("div", wx, [
              l[2] || (l[2] = c("span", { class: "stat-label" }, "Total AWS", -1)),
              c("span", $x, M(T(dt)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      c("div", Mx, [
        e.loading ? (y(), x("div", Sx, [...l[3] || (l[3] = [
          Q('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", Cx, [
          c("div", Dx, [
            X(fe, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Ax, [
          c("div", Tx, [
            c("div", Bx, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = c("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = c("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, Fx = /* @__PURE__ */ nt(Lx, [["__scopeId", "data-v-c023bd59"]]), Px = { class: "cost-usage-card" }, Ex = {
  key: 0,
  class: "card-body"
}, Rx = {
  key: 0,
  class: "chart-section"
}, Ox = { class: "chart-container" }, Ix = { class: "kpi-grid" }, zx = { class: "kpi-card" }, Vx = { class: "kpi-value" }, Nx = { class: "kpi-card" }, Wx = { class: "kpi-value" }, Hx = { class: "kpi-card" }, jx = { class: "kpi-value" }, Yx = { class: "kpi-card" }, qx = { class: "kpi-value" }, Ux = { class: "kpi-card" }, Kx = { class: "kpi-value" }, Xx = { class: "kpi-card highlighted" }, Gx = { class: "kpi-value gradient-text" }, Zx = {
  key: 1,
  class: "empty-state"
}, Qx = { class: "empty-state-content" }, Jx = { class: "empty-icon-wrapper" }, tk = {
  key: 1,
  class: "loading-state"
}, ek = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, { isDark: n, colors: o } = lt(rt(a, "theme")), i = (p) => {
      const _ = new Date(p), m = String(_.getDate()).padStart(2, "0"), g = String(_.getMonth() + 1).padStart(2, "0");
      return `${m}-${g}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((_, m) => _ + (m.input_cost || 0), 0);
    }), d = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((_, m) => _ + (m.output_cost || 0), 0);
    }), u = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((_, m) => _ + (m.cache_read_cost || 0), 0);
    }), h = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((_, m) => _ + (m.cache_write_cost || 0), 0);
    }), f = D(() => {
      const p = a.data?.costs_by_day || {}, _ = Object.keys(p).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const m = _.map((v) => i(v)), g = [
        {
          label: "Input Cost",
          data: _.map((v) => p[v]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: _.map((v) => p[v]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: _.map((v) => p[v]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: _.map((v) => p[v]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: m,
        datasets: g
      };
    }), b = D(() => a.options ? a.options : {
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
            label: function(p) {
              let _ = p.dataset.label || "";
              return _ && (_ += ": "), p.parsed.y !== null && (_ += dt(p.parsed.y)), _;
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
            callback: function(p) {
              return dt(p);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (p, _) => (y(), x("article", Px, [
      _[9] || (_[9] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Usage"),
          c("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", tk, [..._[8] || (_[8] = [
        Q('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Ex, [
        f.value.labels && f.value.labels.length ? (y(), x("section", Rx, [
          c("div", Ox, [
            X(ae, {
              data: f.value,
              options: b.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Ix, [
            c("div", zx, [
              _[0] || (_[0] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", Vx, M(T(dt)(e.data.total_cost)), 1)
            ]),
            c("div", Nx, [
              _[1] || (_[1] = c("span", { class: "kpi-label" }, "Input Cost", -1)),
              c("span", Wx, M(T(dt)(l.value)), 1)
            ]),
            c("div", Hx, [
              _[2] || (_[2] = c("span", { class: "kpi-label" }, "Output Cost", -1)),
              c("span", jx, M(T(dt)(d.value)), 1)
            ]),
            c("div", Yx, [
              _[3] || (_[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", qx, M(T(dt)(u.value)), 1)
            ]),
            c("div", Ux, [
              _[4] || (_[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", Kx, M(T(dt)(h.value)), 1)
            ]),
            c("div", Xx, [
              _[5] || (_[5] = c("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              c("span", Gx, M(T(dt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", Zx, [
          c("div", Qx, [
            c("div", Jx, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            _[6] || (_[6] = c("p", { class: "empty-title" }, "No cost usage data", -1)),
            _[7] || (_[7] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), sk = /* @__PURE__ */ nt(ek, [["__scopeId", "data-v-62f96954"]]), ak = { class: "token-usage-card" }, nk = {
  key: 0,
  class: "card-body"
}, ok = {
  key: 0,
  class: "chart-section"
}, ik = { class: "chart-container" }, rk = { class: "kpi-grid" }, lk = { class: "kpi-card" }, ck = { class: "kpi-value" }, dk = { class: "kpi-card" }, uk = { class: "kpi-value" }, hk = { class: "kpi-card" }, fk = { class: "kpi-value" }, gk = { class: "kpi-card" }, pk = { class: "kpi-value" }, bk = { class: "kpi-card" }, vk = { class: "kpi-value" }, mk = {
  key: 1,
  class: "empty-state"
}, yk = { class: "empty-state-content" }, _k = { class: "empty-icon-wrapper" }, xk = {
  key: 1,
  class: "loading-state"
}, kk = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, { isDark: n, colors: o } = lt(rt(a, "theme")), i = (u) => {
      const h = new Date(u), f = String(h.getDate()).padStart(2, "0"), b = String(h.getMonth() + 1).padStart(2, "0");
      return `${f}-${b}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const u = a.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((p) => i(p)), b = [
        {
          label: "Input Tokens",
          data: h.map((p) => u[p]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((p) => u[p]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((p) => u[p]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((p) => u[p]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: f,
        datasets: b
      };
    }), d = D(() => a.options ? a.options : {
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
    return t({ isDark: n }), (u, h) => (y(), x("article", ak, [
      h[8] || (h[8] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Token Usage"),
          c("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", xk, [...h[7] || (h[7] = [
        Q('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", nk, [
        l.value.labels && l.value.labels.length ? (y(), x("section", ok, [
          c("div", ik, [
            X(ae, {
              data: l.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", rk, [
            c("div", lk, [
              h[0] || (h[0] = c("span", { class: "kpi-label" }, "Total Tokens", -1)),
              c("span", ck, M(T(j)(e.data.total_tokens)), 1)
            ]),
            c("div", dk, [
              h[1] || (h[1] = c("span", { class: "kpi-label" }, "Input", -1)),
              c("span", uk, M(T(j)(e.data.total_input_tokens)), 1)
            ]),
            c("div", hk, [
              h[2] || (h[2] = c("span", { class: "kpi-label" }, "Output", -1)),
              c("span", fk, M(T(j)(e.data.total_output_tokens)), 1)
            ]),
            c("div", gk, [
              h[3] || (h[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", pk, M(T(j)(e.data.total_cache_read_tokens)), 1)
            ]),
            c("div", bk, [
              h[4] || (h[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", vk, M(T(j)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", mk, [
          c("div", yk, [
            c("div", _k, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            h[5] || (h[5] = c("p", { class: "empty-title" }, "No token usage data", -1)),
            h[6] || (h[6] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), wk = /* @__PURE__ */ nt(kk, [["__scopeId", "data-v-e9e355be"]]), $k = { class: "conversation-count-card" }, Mk = { class: "card-header" }, Sk = { class: "header-right" }, Ck = { class: "stat-badge" }, Dk = { class: "stat-value" }, Ak = {
  key: 0,
  class: "card-body"
}, Tk = {
  key: 0,
  class: "chart-section"
}, Bk = { class: "chart-container" }, Lk = {
  key: 1,
  class: "empty-state"
}, Fk = { class: "empty-state-content" }, Pk = { class: "empty-icon-wrapper" }, Ek = {
  key: 1,
  class: "loading-state"
}, Rk = /* @__PURE__ */ J({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = (l) => {
      const d = new Date(l), u = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${u}`;
    };
    D(() => {
      if (s.data?.start_date && s.data?.end_date) {
        const l = o(s.data.start_date), d = o(s.data.end_date);
        return `${l} - ${d}`;
      }
      return "N/A";
    });
    const i = D(() => {
      const l = s.data?.conversations_by_day || {}, d = Object.keys(l).sort();
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
    }), r = D(() => s.options ? s.options : {
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
    return t({ isDark: a }), (l, d) => (y(), x("article", $k, [
      c("header", Mk, [
        d[1] || (d[1] = c("div", { class: "header-left" }, [
          c("div", { class: "header-content" }, [
            c("h3", { class: "card-title" }, "Conversation Count"),
            c("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        c("div", Sk, [
          c("div", Ck, [
            d[0] || (d[0] = c("span", { class: "stat-label" }, "Total", -1)),
            c("span", Dk, M(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", Ek, [...d[4] || (d[4] = [
        Q('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Ak, [
        i.value.labels && i.value.labels.length ? (y(), x("section", Tk, [
          c("div", Bk, [
            X(fe, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Lk, [
          c("div", Fk, [
            c("div", Pk, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = c("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Ok = /* @__PURE__ */ nt(Rk, [["__scopeId", "data-v-846f24b1"]]), Ik = { class: "top-agents-card" }, zk = {
  key: 0,
  class: "card-body"
}, Vk = {
  key: 0,
  class: "charts-grid"
}, Nk = { class: "chart-section" }, Wk = { class: "chart-container" }, Hk = { class: "chart-section" }, jk = { class: "chart-container" }, Yk = {
  key: 1,
  class: "empty-state"
}, qk = { class: "empty-state-content" }, Uk = { class: "empty-icon-wrapper" }, Kk = {
  key: 1,
  class: "loading-state"
}, Xk = /* @__PURE__ */ J({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = D(() => s.data?.top_agents && s.data.top_agents.length > 0), i = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, b) => (b.total_cost || 0) - (f.total_cost || 0)) : []), r = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, b) => (b.total_tokens || 0) - (f.total_tokens || 0)) : []), l = D(() => {
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
    }), d = D(() => {
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
    }), u = D(() => s.options ? s.options : {
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
              const b = f.label, p = s.data?.top_agents?.find((_) => _.agent_type === b);
              return p ? [
                `Total Cost: ${dt(p.total_cost)}`,
                `Input Cost: ${dt(p.total_input_tokens_cost)}`,
                `Output Cost: ${dt(p.total_output_tokens_cost)}`,
                `Cache Read: ${dt(p.total_read_tokens_cost)}`,
                `Cache Write: ${dt(p.total_write_tokens_cost)}`
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
              return dt(f);
            }
          }
        }
      }
    }), h = D(() => s.options ? s.options : {
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
              const b = f.label, p = s.data?.top_agents?.find((_) => _.agent_type === b);
              return p ? [
                `Total Tokens: ${p.total_tokens.toLocaleString()}`,
                `Input Tokens: ${p.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${p.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${p.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${p.total_write_tokens.toLocaleString()}`
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
    return t({ isDark: a }), (f, b) => (y(), x("article", Ik, [
      b[5] || (b[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents Analysis"),
          c("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Kk, [...b[4] || (b[4] = [
        Q('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", zk, [
        o.value ? (y(), x("div", Vk, [
          c("section", Nk, [
            b[0] || (b[0] = c("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            c("div", Wk, [
              X(ae, {
                data: l.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          c("section", Hk, [
            b[1] || (b[1] = c("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            c("div", jk, [
              X(ae, {
                data: d.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", Yk, [
          c("div", qk, [
            c("div", Uk, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            b[2] || (b[2] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            b[3] || (b[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Gk = /* @__PURE__ */ nt(Xk, [["__scopeId", "data-v-78efa6dc"]]), Zk = { class: "top-agents-card" }, Qk = {
  key: 0,
  class: "card-body"
}, Jk = {
  key: 0,
  class: "chart-section"
}, t5 = { class: "chart-container" }, e5 = {
  key: 1,
  class: "empty-state"
}, s5 = { class: "empty-state-content" }, a5 = { class: "empty-icon-wrapper" }, n5 = {
  key: 1,
  class: "loading-state"
}, o5 = /* @__PURE__ */ J({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = D(() => s.data?.top_agents ? s.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = D(() => i.value.length > 0), l = D(() => i.value.reduce((h, f) => h + (f.conversations || 0), 0)), d = D(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((_) => {
        const m = _.agent_type?.toLowerCase();
        return (o[m] || "#a78bfa") + "80";
      }), b = h.map((_) => {
        const m = _.agent_type?.toLowerCase();
        return o[m] || "#a78bfa";
      });
      return {
        labels: h.map((_) => {
          const m = _.conversations || 0, g = l.value ? m / l.value * 100 : 0;
          return `${_.agent_type} - ${m.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((_) => _.conversations || 0),
            backgroundColor: f,
            borderColor: b,
            borderWidth: 2
          }
        ]
      };
    }), u = D(() => s.options ? s.options : {
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
              const f = (h.label || "").toString(), b = Number(h.parsed) || 0, p = (h.dataset.data || []).reduce((m, g) => m + (Number(g) || 0), 0), _ = p ? b / p * 100 : 0;
              return `${f}: ${b.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, f) => (y(), x("article", Zk, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", n5, [...f[2] || (f[2] = [
        Q('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Qk, [
        r.value ? (y(), x("section", Jk, [
          c("div", t5, [
            X(Ws, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", e5, [
          c("div", s5, [
            c("div", a5, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), i5 = /* @__PURE__ */ nt(o5, [["__scopeId", "data-v-05e3e74d"]]), r5 = { class: "daily-cost-trends-card" }, l5 = {
  key: 0,
  class: "card-body"
}, c5 = {
  key: 0,
  class: "chart-section"
}, d5 = { class: "chart-container" }, u5 = {
  key: 1,
  class: "empty-state"
}, h5 = { class: "empty-state-content" }, f5 = { class: "empty-icon-wrapper" }, g5 = {
  key: 1,
  class: "loading-state"
}, p5 = /* @__PURE__ */ J({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(() => {
      const d = s.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), r = D(() => {
      const d = s.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const m = [...d].sort((g, v) => g.date.localeCompare(v.date));
        return {
          labels: m.map((g) => o(g.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: m.map((g) => Number(g.value) || 0),
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
      const u = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {}, b = Object.keys(u).filter((m) => h[m]).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const p = b.map((m) => o(m)), _ = b.map((m) => {
        const g = u[m]?.total_cost || 0, v = h[m] || 0;
        return v > 0 ? g / v : 0;
      });
      return {
        labels: p,
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
    }), l = D(() => s.options ? s.options : {
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
            label: function(d) {
              let u = d.dataset.label || "";
              return u && (u += ": "), d.parsed.y !== null && (u += dt(d.parsed.y)), u;
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
              return dt(d);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (d, u) => (y(), x("article", r5, [
      u[3] || (u[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Daily Cost Trends"),
          c("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", g5, [...u[2] || (u[2] = [
        Q('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", l5, [
        i.value ? (y(), x("section", c5, [
          c("div", d5, [
            X(fe, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", u5, [
          c("div", h5, [
            c("div", f5, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = c("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), b5 = /* @__PURE__ */ nt(p5, [["__scopeId", "data-v-e5bac1c5"]]), v5 = { class: "model-usage-card" }, m5 = {
  key: 0,
  class: "loading-state"
}, y5 = {
  key: 1,
  class: "card-body"
}, _5 = { class: "tabs-container" }, x5 = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, k5 = ["aria-selected"], w5 = ["aria-selected"], $5 = {
  key: 0,
  class: "table-section"
}, M5 = { class: "table-wrapper" }, S5 = { class: "data-table" }, C5 = { class: "table-header-row" }, D5 = { class: "table-header" }, A5 = { class: "table-body" }, T5 = { class: "table-cell name-cell" }, B5 = { class: "table-cell text-center" }, L5 = { class: "table-cell text-center" }, F5 = { class: "table-cell text-center" }, P5 = { class: "table-cell text-center cost-cell" }, E5 = { class: "table-cell text-center" }, R5 = {
  key: 1,
  class: "empty-state"
}, O5 = { class: "empty-state-content" }, I5 = { class: "empty-icon-wrapper" }, z5 = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (h) => {
      n("export", h);
    }, { isDark: i } = lt(rt(a, "theme")), r = st("by_model"), l = D(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = (h) => h == null ? "0" : j(h), u = (h) => h == null ? "$0.00" : dt(h);
    return t({ isDark: i }), (h, f) => (y(), x("article", v5, [
      f[10] || (f[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Model Usage"),
          c("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", m5, [...f[2] || (f[2] = [
        Q('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", y5, [
        c("div", _5, [
          c("nav", x5, [
            c("button", {
              onClick: f[0] || (f[0] = (b) => r.value = "by_model"),
              class: at(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, k5),
            c("button", {
              onClick: f[1] || (f[1] = (b) => r.value = "by_provider"),
              class: at(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, w5)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (y(), x("div", $5, [
          c("div", M5, [
            c("table", S5, [
              c("thead", null, [
                c("tr", C5, [
                  c("th", D5, M(r.value === "by_model" ? "Model" : "Provider"), 1),
                  f[3] || (f[3] = c("th", { class: "table-header" }, "Avg cost per message", -1)),
                  f[4] || (f[4] = c("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  f[5] || (f[5] = c("th", { class: "table-header" }, "Message count", -1)),
                  f[6] || (f[6] = c("th", { class: "table-header" }, "Total cost", -1)),
                  f[7] || (f[7] = c("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              c("tbody", A5, [
                (y(!0), x(q, null, Z(l.value, (b, p) => (y(), x("tr", {
                  key: p,
                  class: "table-row"
                }, [
                  c("td", T5, M(p), 1),
                  c("td", B5, M(u(b.avg_cost_per_message)), 1),
                  c("td", L5, M(d(b.avg_tokens_per_message)), 1),
                  c("td", F5, M(d(b.message_count)), 1),
                  c("td", P5, M(u(b.total_cost)), 1),
                  c("td", E5, M(d(b.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("div", R5, [
          c("div", O5, [
            c("div", I5, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            f[8] || (f[8] = c("p", { class: "empty-title" }, "No model usage data available", -1)),
            f[9] || (f[9] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), V5 = /* @__PURE__ */ nt(z5, [["__scopeId", "data-v-a7bf2d7b"]]), N5 = { class: "message-roles-card" }, W5 = {
  key: 0,
  class: "loading-state"
}, H5 = {
  key: 1,
  class: "card-body"
}, j5 = {
  key: 0,
  class: "table-section"
}, Y5 = { class: "table-wrapper" }, q5 = { class: "data-table" }, U5 = { class: "table-body" }, K5 = { class: "table-cell name-cell" }, X5 = { class: "table-cell text-center" }, G5 = { class: "table-cell text-center" }, Z5 = { class: "table-cell text-center" }, Q5 = { class: "table-cell text-center cost-cell" }, J5 = { class: "table-cell text-center" }, tw = {
  key: 1,
  class: "empty-state"
}, ew = { class: "empty-state-content" }, sw = { class: "empty-icon-wrapper" }, aw = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (b) => {
      n("export", b);
    }, { isDark: i } = lt(rt(a, "theme")), r = ["assistant", "system", "user"], l = D(() => a.data?.total_by_role || {}), d = D(() => Object.keys(l.value).length > 0), u = (b) => b == null ? "0" : j(b), h = (b) => b == null ? "$0.00" : dt(b), f = (b) => b.charAt(0).toUpperCase() + b.slice(1);
    return t({ isDark: i }), (b, p) => (y(), x("article", N5, [
      p[4] || (p[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Message Roles"),
          c("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", W5, [...p[0] || (p[0] = [
        Q('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", H5, [
        d.value ? (y(), x("div", j5, [
          c("div", Y5, [
            c("table", q5, [
              p[1] || (p[1] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Role"),
                  c("th", { class: "table-header" }, "Avg cost per message"),
                  c("th", { class: "table-header" }, "Avg tokens per message"),
                  c("th", { class: "table-header" }, "Message count"),
                  c("th", { class: "table-header" }, "Total cost"),
                  c("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              c("tbody", U5, [
                (y(), x(q, null, Z(r, (_) => c("tr", {
                  key: _,
                  class: "table-row"
                }, [
                  c("td", K5, M(f(_)), 1),
                  c("td", X5, M(h(l.value[_]?.avg_cost_per_message)), 1),
                  c("td", G5, M(u(l.value[_]?.avg_tokens_per_message)), 1),
                  c("td", Z5, M(u(l.value[_]?.message_count)), 1),
                  c("td", Q5, M(h(l.value[_]?.total_cost)), 1),
                  c("td", J5, M(u(l.value[_]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("div", tw, [
          c("div", ew, [
            c("div", sw, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            p[2] || (p[2] = c("p", { class: "empty-title" }, "No message role data available", -1)),
            p[3] || (p[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), nw = /* @__PURE__ */ nt(aw, [["__scopeId", "data-v-6a953cfc"]]), ow = { class: "cost-per-conversation-card" }, iw = {
  key: 0,
  class: "card-body"
}, rw = {
  key: 0,
  class: "chart-section"
}, lw = { class: "chart-container" }, cw = { class: "kpi-grid" }, dw = { class: "kpi-card" }, uw = { class: "kpi-value" }, hw = { class: "kpi-card" }, fw = { class: "kpi-value" }, gw = { class: "kpi-card" }, pw = { class: "kpi-value" }, bw = { class: "kpi-card highlighted" }, vw = { class: "kpi-value gradient-text" }, mw = {
  key: 1,
  class: "empty-state"
}, yw = { class: "empty-state-content" }, _w = { class: "empty-icon-wrapper" }, xw = {
  key: 1,
  class: "loading-state"
}, kw = /* @__PURE__ */ J({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (v) => {
      n("export", v);
    }, { isDark: i, colors: r } = lt(rt(a, "theme")), l = {
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
    }, d = (v) => v.agent_type || v.agent_id || v.agent_name || "", u = (v) => v.agent_name ? v.agent_name : d(v).split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (v) => {
      const $ = d(v).toLowerCase();
      for (const [k, w] of Object.entries(l))
        if ($.includes(k))
          return w;
      return "#9ca3af";
    }, f = D(() => [...a.data?.top_agents || []].sort(($, k) => k.avg_cost_per_conversation - $.avg_cost_per_conversation)), b = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : f.value.reduce((v, $) => v + $.conversations, 0)), p = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : f.value.reduce((v, $) => v + $.total_cost, 0)), _ = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : b.value === 0 ? 0 : p.value / b.value), m = D(() => {
      const v = f.value;
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const $ = v.map((S) => u(S)), k = v.map((S) => S.avg_cost_per_conversation), w = v.map((S) => h(S));
      return {
        labels: $,
        datasets: [
          {
            label: "USD per conversation",
            data: k,
            backgroundColor: w.map((S) => `${S}80`),
            borderColor: w,
            borderWidth: 1
          }
        ]
      };
    }), g = D(() => a.options ? a.options : {
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
            label: function(v) {
              const $ = f.value[v.dataIndex];
              return [
                `Cost: ${dt(v.parsed.x)}`,
                `Conversations: ${j($.conversations)}`,
                `Total Cost: ${dt($.total_cost)}`
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
            callback: function(v) {
              return dt(v);
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
    return t({ isDark: i }), (v, $) => (y(), x("article", ow, [
      $[7] || ($[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Per Conversation"),
          c("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", xw, [...$[6] || ($[6] = [
        Q('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", iw, [
        m.value.labels && m.value.labels.length ? (y(), x("section", rw, [
          c("div", lw, [
            X(ae, {
              data: m.value,
              options: g.value
            }, null, 8, ["data", "options"])
          ]),
          c("footer", cw, [
            c("div", dw, [
              $[0] || ($[0] = c("span", { class: "kpi-label" }, "Total Agents", -1)),
              c("span", uw, M(f.value.length), 1)
            ]),
            c("div", hw, [
              $[1] || ($[1] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
              c("span", fw, M(T(j)(b.value)), 1)
            ]),
            c("div", gw, [
              $[2] || ($[2] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", pw, M(T(dt)(p.value)), 1)
            ]),
            c("div", bw, [
              $[3] || ($[3] = c("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              c("span", vw, M(T(dt)(_.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : O("", !0)
        ])) : (y(), x("section", mw, [
          c("div", yw, [
            c("div", _w, [
              X(T(Ot), { class: "empty-icon" })
            ]),
            $[4] || ($[4] = c("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            $[5] || ($[5] = c("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ww = /* @__PURE__ */ nt(kw, [["__scopeId", "data-v-17f6615c"]]), $w = { class: "tabs text-sm" }, Mw = ["aria-label"], Sw = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], Cw = { class: "flex min-h-9 min-w-0 flex-1 items-center justify-center gap-2 px-3 py-1.5" }, Dw = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, Aw = /* @__PURE__ */ J({
  name: "Tabs",
  __name: "Tabs",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Tabs" }
  },
  emits: ["update:modelValue", "change", "tab-click"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = st([]), o = `tabs-${Math.random().toString(36).slice(2, 9)}`, i = (p) => `${o}-tab-${p}`, r = D(
      () => s.items.map((p, _) => p.disabled ? -1 : _).filter((p) => p >= 0)
    );
    function l(p) {
      return p.value === s.modelValue;
    }
    function d(p) {
      const _ = l(p), m = "relative flex min-w-0 flex-1 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100";
      return p.disabled ? `${m} cursor-not-allowed opacity-40` : _ ? `${m} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${m} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(p, _) {
      p === _ || s.items.find((g) => g.value === p)?.disabled || (a("update:modelValue", p), a("change", { value: p, previousValue: _ }));
    }
    function h(p, _) {
      a("tab-click", { value: p.value, originalEvent: _ }), !p.disabled && (u(p.value, s.modelValue), St(() => {
        n.value[s.items.indexOf(p)]?.focus();
      }));
    }
    function f(p, _) {
      const m = s.items.length;
      if (m === 0) return 0;
      let g = p;
      for (let v = 0; v < m; v++)
        if (g = (g + _ + m) % m, !s.items[g]?.disabled) return g;
      return p;
    }
    async function b(p, _) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(p.key)) return;
      p.preventDefault();
      let g = _;
      p.key === "ArrowLeft" ? g = f(_, -1) : p.key === "ArrowRight" ? g = f(_, 1) : p.key === "Home" ? g = r.value[0] ?? 0 : p.key === "End" && (g = r.value[r.value.length - 1] ?? _);
      const v = s.items[g];
      !v || v.disabled || (u(v.value, s.modelValue), await St(), n.value[g]?.focus());
    }
    return (p, _) => (y(), x("div", $w, [
      c("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: "flex flex-wrap gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:border-white/[0.06] dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none"
      }, [
        (y(!0), x(q, null, Z(e.items, (m, g) => (y(), x("button", {
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
          class: at(d(m)),
          onClick: (v) => h(m, v),
          onKeydown: (v) => b(v, g)
        }, [
          c("span", Cw, [
            m.icon ? (y(), ct($a(m.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : O("", !0),
            c("span", Dw, M(m.label), 1)
          ])
        ], 42, Sw))), 128))
      ], 8, Mw),
      p.$slots.default ? (y(), ct(Ei, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: xs(() => [
          (y(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            zt(p.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : O("", !0)
    ]));
  }
}), Tw = /* @__PURE__ */ nt(Aw, [["__scopeId", "data-v-65add5d0"]]), Bw = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-white/[0.06]" }, Lw = { class: "overflow-x-auto" }, Fw = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, Pw = { class: "border-b border-[color:var(--kiut-border-table)] bg-slate-50 dark:bg-[#252528]" }, Ew = {
  key: 0,
  scope: "col",
  class: "w-12 px-3 py-3.5 text-center align-middle"
}, Rw = ["checked", "aria-label"], Ow = {
  key: 0,
  class: "w-12 px-3 py-3.5 text-center align-middle"
}, Iw = ["checked", "aria-label", "onChange"], zw = /* @__PURE__ */ J({
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
    const s = e, a = t, n = st(null);
    function o(v) {
      return `cell-${v}`;
    }
    function i(v) {
      return v === "center" ? "text-center" : v === "right" ? "text-right" : "text-left";
    }
    function r(v, $) {
      if (typeof s.rowKey == "function")
        return s.rowKey(v);
      const k = v[s.rowKey];
      return k != null ? String(k) : `__index_${$}`;
    }
    function l(v, $) {
      return v[$];
    }
    function d(v) {
      return v == null || typeof v == "object" ? "" : String(v);
    }
    function u(v, $) {
      return r(v, $);
    }
    const h = D(() => s.rows.map((v, $) => r(v, $)));
    function f(v, $) {
      const k = r(v, $);
      return s.selectedKeys.includes(k);
    }
    const b = D(() => !s.selectable || s.rows.length === 0 ? !1 : h.value.every((v) => s.selectedKeys.includes(v))), p = D(() => {
      if (!s.selectable || s.rows.length === 0) return !1;
      const v = h.value.filter(($) => s.selectedKeys.includes($));
      return v.length > 0 && v.length < s.rows.length;
    });
    Vt(
      [p, b, () => s.selectable],
      async () => {
        await St();
        const v = n.value;
        v && (v.indeterminate = p.value && !b.value);
      },
      { immediate: !0 }
    );
    function _() {
      if (s.selectable)
        if (b.value) {
          const v = s.selectedKeys.filter(($) => !h.value.includes($));
          a("update:selectedKeys", v);
        } else {
          const v = new Set(s.selectedKeys);
          h.value.forEach(($) => v.add($)), a("update:selectedKeys", [...v]);
        }
    }
    function m(v, $) {
      if (!s.selectable) return;
      const k = r(v, $);
      s.selectedKeys.includes(k) ? a(
        "update:selectedKeys",
        s.selectedKeys.filter((S) => S !== k)
      ) : a("update:selectedKeys", [...s.selectedKeys, k]);
    }
    function g(v, $) {
      const k = r(v, $);
      return `${s.ariaLabelSelectRow} ${k}`;
    }
    return (v, $) => (y(), x("div", Bw, [
      c("div", Lw, [
        c("table", Fw, [
          c("thead", null, [
            c("tr", Pw, [
              e.selectable ? (y(), x("th", Ew, [
                c("input", {
                  ref_key: "selectAllRef",
                  ref: n,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: b.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: _
                }, null, 40, Rw)
              ])) : O("", !0),
              (y(!0), x(q, null, Z(e.columns, (k) => (y(), x("th", {
                key: k.key,
                scope: "col",
                class: at([
                  "px-3 py-3.5 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(k.align),
                  k.headerClass ?? ""
                ])
              }, M(k.label), 3))), 128))
            ])
          ]),
          c("tbody", null, [
            (y(!0), x(q, null, Z(e.rows, (k, w) => (y(), x("tr", {
              key: u(k, w),
              class: "border-b border-[color:var(--kiut-border-table-row)] bg-[color:var(--kiut-bg-table)] transition-colors hover:[background:var(--kiut-bg-table-hover)]"
            }, [
              e.selectable ? (y(), x("td", Ow, [
                c("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: f(k, w),
                  "aria-label": g(k, w),
                  onChange: (S) => m(k, w)
                }, null, 40, Iw)
              ])) : O("", !0),
              (y(!0), x(q, null, Z(e.columns, (S) => (y(), x("td", {
                key: S.key,
                class: at([
                  "px-3 py-3.5 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                zt(v.$slots, o(S.key), {
                  row: k,
                  column: S,
                  value: l(k, S.key)
                }, () => [
                  wt(M(d(l(k, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Vw = /* @__PURE__ */ nt(zw, [["__scopeId", "data-v-6d1b5df0"]]);
function Nw(e, t) {
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
function Ww(e, t) {
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
const Hw = ["aria-label"], jw = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, Yw = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, qw = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Uw = ["aria-label", "onClick"], Kw = ["aria-label", "onClick"], Xw = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Gw = ["aria-label"], Zw = ["aria-label"], Qw = {
  key: 1,
  class: "space-y-2"
}, Jw = ["for"], t$ = ["id", "placeholder", "onKeydown"], e$ = ["for"], s$ = ["id"], a$ = {
  value: "",
  disabled: ""
}, n$ = ["value"], o$ = { class: "text-[11px] font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, i$ = { class: "flex flex-wrap items-end gap-2" }, r$ = { class: "min-w-[120px] flex-1" }, l$ = ["for"], c$ = ["id"], d$ = { class: "min-w-[120px] flex-1" }, u$ = ["for"], h$ = ["id"], f$ = /* @__PURE__ */ J({
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
    const s = e, a = t, n = Do(), i = `${`kiut-filters-${Math.random().toString(36).slice(2, 9)}`}-panel`, r = st(null), l = /* @__PURE__ */ new Map(), d = st(null), u = st(!1), h = st({}), f = st(null), b = st(""), p = st(""), _ = st(""), m = st(""), g = D(() => d.value ? s.filterDefinitions.find((L) => L.id === d.value) ?? null : null), v = D(() => {
      const L = g.value;
      if (L)
        return L.type === "text" ? b.value : L.type === "select" ? p.value : { start: _.value, end: m.value };
    });
    function $(L, U) {
      U && U instanceof HTMLElement ? l.set(L, U) : l.delete(L);
    }
    function k(L) {
      return s.modelValue[L];
    }
    function w(L, U) {
      if (U == null) return !0;
      if (L.type === "text" || L.type === "select") return String(U).trim() === "";
      if (L.type === "dateRange") {
        const G = U;
        return !G?.start?.trim() || !G?.end?.trim();
      }
      return !0;
    }
    const S = D(
      () => s.filterDefinitions.some((L) => !w(L, k(L.id)))
    ), C = D(
      () => s.filterDefinitions.filter((L) => !w(L, k(L.id)))
    ), A = D(
      () => s.filterDefinitions.filter((L) => w(L, k(L.id)))
    );
    function P(L) {
      const U = k(L.id), G = L.label.replace(/^\+\s*/, "");
      if (L.type === "text") return `${G}: ${String(U ?? "").trim()}`;
      if (L.type === "select") {
        const Ya = String(U ?? ""), Li = L.options.find((Fi) => Fi.value === Ya);
        return `${G}: ${Li?.label ?? Ya}`;
      }
      const bt = U, Wt = E(bt.start), Dt = E(bt.end);
      return `${G}: ${Wt} – ${Dt}`;
    }
    function E(L) {
      if (!L) return "";
      const U = Tt(L, "YYYY-MM-DD", !0);
      return U.isValid() ? U.format("L") : L;
    }
    function R(L) {
      return d.value === L && u.value ? "border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border-slate-400/90 hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function N(L) {
      const U = k(L.id);
      if (L.type === "text") {
        b.value = U != null ? String(U) : "";
        return;
      }
      if (L.type === "select") {
        p.value = U != null ? String(U) : "";
        return;
      }
      const G = U;
      _.value = G?.start?.trim() ?? "", m.value = G?.end?.trim() ?? "";
    }
    function Y(L) {
      if (!L) return;
      f.value = L;
      const U = L.getBoundingClientRect(), G = 300;
      let bt = U.left;
      const Wt = window.innerWidth - G - 12;
      bt > Wt && (bt = Math.max(12, Wt)), bt < 12 && (bt = 12);
      const Dt = U.bottom + 8;
      h.value = {
        top: `${Dt}px`,
        left: `${bt}px`,
        width: `${Math.min(G, window.innerWidth - 24)}px`
      };
    }
    function B(L, U) {
      if (d.value === L.id && u.value) {
        V();
        return;
      }
      u.value && d.value !== L.id && V(), d.value = L.id, u.value = !0, N(L), St().then(async () => {
        Y(U.currentTarget), await St(), I();
      });
    }
    function F(L, U) {
      if (d.value === L.id && u.value) {
        V();
        return;
      }
      u.value && d.value !== L.id && V(), d.value = L.id, u.value = !0, N(L), St().then(async () => {
        const G = l.get(L.id) ?? U.currentTarget;
        Y(G), await St(), I();
      });
    }
    function I() {
      const L = r.value;
      if (!L) return;
      L.querySelector(
        'input, select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function z() {
      u.value = !1, d.value = null, f.value = null;
    }
    function W(L) {
      const U = g.value;
      if (!U) return;
      if (U.type === "text") {
        b.value = L != null ? String(L) : "";
        return;
      }
      if (U.type === "select") {
        p.value = L != null ? String(L) : "";
        return;
      }
      const G = L;
      _.value = G?.start?.trim() ?? "", m.value = G?.end?.trim() ?? "";
    }
    function V() {
      const L = g.value;
      if (!L) return;
      if (L.type === "text") {
        const Wt = b.value.trim(), Dt = { ...s.modelValue };
        Wt === "" ? delete Dt[L.id] : Dt[L.id] = Wt, a("update:modelValue", Dt), a("change", Dt), z();
        return;
      }
      if (L.type === "select") {
        const Wt = p.value.trim(), Dt = { ...s.modelValue };
        Wt === "" ? delete Dt[L.id] : Dt[L.id] = Wt, a("update:modelValue", Dt), a("change", Dt), z();
        return;
      }
      const U = _.value.trim(), G = m.value.trim(), bt = { ...s.modelValue };
      !U || !G || U > G ? delete bt[L.id] : bt[L.id] = { start: U, end: G }, a("update:modelValue", bt), a("change", bt), z();
    }
    function H(L) {
      const U = { ...s.modelValue };
      delete U[L], a("update:modelValue", U), a("change", U), d.value === L && z();
    }
    function et() {
      const L = {};
      a("update:modelValue", L), a("change", L), z();
    }
    const tt = D(() => {
      const L = g.value;
      return L ? `Editar filtro: ${L.label}` : "Filtro";
    });
    function K(L) {
      return `Quitar filtro ${L.label.replace(/^\+\s*/, "")}`;
    }
    function ht(L) {
      return `Editar filtro ${L.label.replace(/^\+\s*/, "")}`;
    }
    function _t(L) {
      return `Añadir filtro ${L.label.replace(/^\+\s*/, "")}`;
    }
    const ut = D(() => s.clearLabel);
    function Ct(L) {
      if (!u.value || !r.value) return;
      const U = L.target;
      if (!(r.value.contains(U) || (U instanceof Element ? U : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const bt of l.values())
          if (bt?.contains(U)) return;
        V();
      }
    }
    function Pt(L) {
      L.key === "Escape" && u.value && (L.preventDefault(), z());
    }
    function Nt() {
      !u.value || !f.value || Y(f.value);
    }
    return he(() => {
      document.addEventListener("mousedown", Ct, !0), window.addEventListener("keydown", Pt, !0), window.addEventListener("resize", Nt);
    }), Co(() => {
      document.removeEventListener("mousedown", Ct, !0), window.removeEventListener("keydown", Pt, !0), window.removeEventListener("resize", Nt);
    }), Vt(
      () => s.modelValue,
      () => {
        const L = g.value;
        L && u.value && !n.panel && N(L);
      },
      { deep: !0 }
    ), (L, U) => (y(), x("div", {
      class: "kiut-filters font-sans text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      c("div", jw, [
        c("span", Yw, M(e.label), 1),
        c("div", qw, [
          (y(!0), x(q, null, Z(C.value, (G) => (y(), x("div", {
            key: `chip-${G.id}`,
            "data-kiut-filter-chip": "",
            class: "inline-flex max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 py-0.5 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:border-white/[0.08] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            c("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ht(G),
              onClick: (bt) => B(G, bt)
            }, [
              zt(L.$slots, "formatChip", {
                filter: G,
                value: k(G.id)
              }, () => [
                wt(M(P(G)), 1)
              ])
            ], 8, Uw),
            c("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": K(G),
              onClick: (bt) => H(G.id)
            }, [
              X(T(Ww), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, Kw)
          ]))), 128)),
          (y(!0), x(q, null, Z(A.value, (G) => (y(), x("button", {
            key: `add-${G.id}`,
            ref_for: !0,
            ref: (bt) => $(G.id, bt),
            type: "button",
            class: at(["inline-flex items-center gap-0.5 rounded-full border-1 border-dashed px-2 py-1 font-medium text-[color:var(--kiut-text-secondary)] transition-colors dark:text-slate-400", R(G.id)]),
            "aria-label": _t(G),
            "aria-expanded": d.value === G.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === G.id ? i : void 0,
            onClick: (bt) => F(G, bt)
          }, [
            X(T(Nw), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            c("span", null, M(G.label), 1)
          ], 10, Xw))), 128))
        ]),
        S.value ? (y(), x("button", {
          key: 0,
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": ut.value,
          onClick: et
        }, M(e.clearLabel), 9, Gw)) : O("", !0)
      ]),
      (y(), ct(Ao, { to: "body" }, [
        d.value && u.value ? (y(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": tt.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:border-white/[0.08] dark:bg-[#252528]",
          style: xt(h.value),
          onKeydown: U[4] || (U[4] = de(() => {
          }, ["stop"]))
        }, [
          g.value ? (y(), x(q, { key: 0 }, [
            L.$slots.panel ? zt(L.$slots, "panel", {
              key: 0,
              filter: g.value,
              close: V,
              value: v.value,
              updateValue: W
            }) : (y(), x("div", Qw, [
              g.value.type === "text" ? (y(), x(q, { key: 0 }, [
                c("label", {
                  for: `${i}-text`,
                  class: "block text-[11px] font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, M(g.value.label), 9, Jw),
                Xt(c("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": U[0] || (U[0] = (G) => b.value = G),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: g.value.placeholder ?? "…",
                  onKeydown: Ss(de(V, ["prevent"]), ["enter"])
                }, null, 40, t$), [
                  [Ye, b.value]
                ])
              ], 64)) : g.value.type === "select" ? (y(), x(q, { key: 1 }, [
                c("label", {
                  for: `${i}-select`,
                  class: "block text-[11px] font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, M(g.value.label), 9, e$),
                Xt(c("select", {
                  id: `${i}-select`,
                  "onUpdate:modelValue": U[1] || (U[1] = (G) => p.value = G),
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                }, [
                  c("option", a$, M(g.value.placeholder ?? "Seleccionar…"), 1),
                  (y(!0), x(q, null, Z(g.value.options, (G) => (y(), x("option", {
                    key: G.value,
                    value: G.value
                  }, M(G.label), 9, n$))), 128))
                ], 8, s$), [
                  [Ri, p.value]
                ])
              ], 64)) : g.value.type === "dateRange" ? (y(), x(q, { key: 2 }, [
                c("p", o$, M(g.value.label), 1),
                c("div", i$, [
                  c("div", r$, [
                    c("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-[10px] leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, l$),
                    Xt(c("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": U[2] || (U[2] = (G) => _.value = G),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, c$), [
                      [Ye, _.value]
                    ])
                  ]),
                  c("div", d$, [
                    c("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-[10px] leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, u$),
                    Xt(c("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": U[3] || (U[3] = (G) => m.value = G),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, h$), [
                      [Ye, m.value]
                    ])
                  ])
                ])
              ], 64)) : O("", !0)
            ]))
          ], 64)) : O("", !0)
        ], 44, Zw)) : O("", !0)
      ]))
    ], 8, Hw));
  }
}), is = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", rs = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.12] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Ha = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", ja = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", g$ = { class: "font-sans" }, p$ = ["for"], b$ = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], v$ = ["id"], m$ = /* @__PURE__ */ J({
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
    const s = e, a = t, n = `kiut-input-text-${Math.random().toString(36).slice(2, 9)}`, o = D(() => s.id ?? n), i = D(() => `${o.value}-err`), r = D({
      get: () => s.modelValue,
      set: (l) => a("update:modelValue", l)
    });
    return (l, d) => (y(), x("div", g$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: at(T(is))
      }, M(e.label), 11, p$)) : O("", !0),
      Xt(c("input", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u),
        type: "text",
        autocomplete: "off",
        class: at([T(rs), e.invalid ? T(Ha) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, b$), [
        [Ye, r.value]
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: at(T(ja)),
        role: "alert"
      }, M(e.errorText), 11, v$)) : O("", !0)
    ]));
  }
}), y$ = { class: "font-sans" }, _$ = ["for"], x$ = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], k$ = ["id"], w$ = /* @__PURE__ */ J({
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
    const s = e, a = t, n = `kiut-input-number-${Math.random().toString(36).slice(2, 9)}`, o = D(() => s.id ?? n), i = D(() => `${o.value}-err`), r = D(() => {
      switch (s.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), l = D(
      () => s.modelValue === null || s.modelValue === void 0 ? "" : String(s.modelValue)
    );
    function d(u) {
      const h = u.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const f = Number(h);
      a("update:modelValue", Number.isNaN(f) ? null : f);
    }
    return (u, h) => (y(), x("div", y$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: at(T(is))
      }, M(e.label), 11, _$)) : O("", !0),
      c("input", {
        id: o.value,
        value: l.value,
        type: "number",
        onInput: d,
        class: at([
          T(rs),
          e.invalid ? T(Ha) : "",
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
      }, null, 42, x$),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: at(T(ja)),
        role: "alert"
      }, M(e.errorText), 11, k$)) : O("", !0)
    ]));
  }
});
function $$(e, t) {
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
const M$ = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], S$ = ["aria-selected", "onClick", "onMouseenter"], C$ = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, D$ = { class: "min-w-0 flex-1" }, Bi = /* @__PURE__ */ J({
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
    const s = e, a = t, n = `kiut-select-${Math.random().toString(36).slice(2, 9)}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, l = st(null), d = st(null), u = st(!1), h = st(0), f = D(() => s.options.filter((A) => !A.disabled)), b = D(
      () => s.ariaLabelTrigger ?? s.placeholder ?? "Seleccionar opción"
    ), p = D(() => s.modelValue === null || s.modelValue === void 0 || s.modelValue === "" ? s.placeholder : s.options.find((P) => P.value === s.modelValue)?.label ?? String(s.modelValue));
    function _(A) {
      return `${String(A.value)}-${A.label}`;
    }
    function m(A) {
      return s.modelValue === A.value;
    }
    function g(A, P) {
      const E = m(A), R = h.value === P;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        E ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !E && R ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function v(A) {
      a("update:modelValue", A.value), u.value = !1;
    }
    function $() {
      s.disabled || (u.value = !u.value);
    }
    function k(A) {
      if (A.stopPropagation(), !s.disabled && ($(), u.value)) {
        const P = Math.max(
          0,
          f.value.findIndex((E) => E.value === s.modelValue)
        );
        h.value = P, St(() => d.value?.focus());
      }
    }
    function w(A) {
      if (!u.value) return;
      const P = l.value;
      P && !P.contains(A.target) && (u.value = !1);
    }
    function S(A) {
      s.disabled || (A.key === "ArrowDown" || A.key === "Enter" || A.key === " ") && (A.preventDefault(), u.value || (u.value = !0, h.value = Math.max(
        0,
        f.value.findIndex((P) => P.value === s.modelValue)
      ), St(() => d.value?.focus())));
    }
    function C(A) {
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
          const E = P[h.value];
          E && v(E);
        }
      }
    }
    return he(() => {
      document.addEventListener("click", w);
    }), ns(() => {
      document.removeEventListener("click", w);
    }), (A, P) => (y(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: at(T(is))
      }, M(e.label), 3)) : O("", !0),
      c("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: at([
          T(rs),
          "flex items-center justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onClick: k,
        onKeydown: S
      }, [
        c("span", {
          class: at([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, M(p.value), 3),
        X(T(Mg), {
          class: at(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, M$),
      Xt(c("ul", {
        id: r,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-white/[0.12]",
        onKeydown: de(C, ["stop"])
      }, [
        (y(!0), x(q, null, Z(f.value, (E, R) => (y(), x("li", {
          key: _(E),
          role: "option",
          "aria-selected": m(E),
          class: at(g(E, R)),
          onClick: de((N) => v(E), ["stop"]),
          onMouseenter: (N) => h.value = R
        }, [
          c("span", C$, [
            m(E) ? (y(), ct(T($$), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : O("", !0)
          ]),
          c("span", D$, M(E.label), 1)
        ], 42, S$))), 128))
      ], 544), [
        [Ms, u.value]
      ])
    ], 512));
  }
}), A$ = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], T$ = { class: "sr-only" }, B$ = /* @__PURE__ */ J({
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
    const s = e, a = t;
    function n() {
      s.disabled || a("update:modelValue", !s.modelValue);
    }
    return (o, i) => (y(), x("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: at([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: n,
      onKeydown: [
        Ss(de(n, ["prevent", "stop"]), ["space"]),
        Ss(de(n, ["prevent"]), ["enter"])
      ]
    }, [
      c("span", {
        class: at(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      c("span", T$, M(e.ariaLabel), 1)
    ], 42, A$));
  }
}), L$ = { class: "font-sans" }, F$ = ["for"], P$ = { class: "flex gap-2" }, E$ = { class: "w-[7.5rem] shrink-0" }, R$ = { class: "min-w-0 flex-1" }, O$ = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], I$ = ["id"], z$ = /* @__PURE__ */ J({
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
    const s = e, a = t, n = `kiut-phone-${Math.random().toString(36).slice(2, 9)}`, o = D(() => s.id ?? `${n}-num`), i = D(() => `${o.value}-err`), r = D({
      get: () => s.modelValue.prefix,
      set: (d) => a("update:modelValue", { ...s.modelValue, prefix: d })
    }), l = D({
      get: () => s.modelValue.number,
      set: (d) => a("update:modelValue", { ...s.modelValue, number: d })
    });
    return (d, u) => (y(), x("div", L$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: at(T(is))
      }, M(e.label), 11, F$)) : O("", !0),
      c("div", P$, [
        c("div", E$, [
          X(Bi, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        c("div", R$, [
          Xt(c("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => l.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: at([T(rs), e.invalid ? T(Ha) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, O$), [
            [Ye, l.value]
          ])
        ])
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: at(T(ja)),
        role: "alert"
      }, M(e.errorText), 11, I$)) : O("", !0)
    ]));
  }
}), V$ = ["role", "aria-label"], N$ = { class: "flex flex-wrap gap-2" }, W$ = ["aria-checked", "role", "onClick"], H$ = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, j$ = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, Y$ = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, q$ = /* @__PURE__ */ J({
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
    const s = e, a = t, n = D(() => s.multiple ? Array.isArray(s.modelValue) ? s.modelValue : [] : []);
    function o(l) {
      return s.multiple ? n.value.includes(l.value) : s.modelValue === l.value;
    }
    function i(l) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(l) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-white/[0.12] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function r(l) {
      if (s.multiple) {
        const d = Array.isArray(s.modelValue) ? [...s.modelValue] : [], u = d.indexOf(l.value);
        u >= 0 ? d.splice(u, 1) : d.push(l.value), a("update:modelValue", d);
        return;
      }
      a("update:modelValue", l.value);
    }
    return (l, d) => (y(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      c("div", N$, [
        (y(!0), x(q, null, Z(e.items, (u) => (y(), x("button", {
          key: u.value,
          type: "button",
          class: at(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(u)
        }, [
          c("span", H$, [
            o(u) ? (y(), x("span", j$)) : O("", !0)
          ]),
          u.dotColor ? (y(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: xt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          c("span", Y$, M(u.label), 1)
        ], 10, W$))), 128))
      ])
    ], 8, V$));
  }
}), U$ = ["aria-label"], K$ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], X$ = { class: "truncate px-3 py-2 text-sm font-medium" }, G$ = /* @__PURE__ */ J({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = `kiut-seg-${Math.random().toString(36).slice(2, 9)}`, o = (_) => `${n}-seg-${_}`, i = st([]);
    function r(_, m) {
      _ instanceof HTMLButtonElement ? i.value[m] = _ : i.value[m] = null;
    }
    function l(_) {
      return _.value === s.modelValue;
    }
    function d(_) {
      const m = l(_), g = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return _.disabled ? `${g} cursor-not-allowed opacity-40` : m ? `${g} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${g} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(_) {
      _.disabled || _.value !== s.modelValue && a("update:modelValue", _.value);
    }
    function h(_, m, g) {
      u(_), St(() => i.value[m]?.focus());
    }
    const f = D(
      () => s.items.map((_, m) => _.disabled ? -1 : m).filter((_) => _ >= 0)
    );
    function b(_, m) {
      const g = s.items.length;
      if (g === 0) return 0;
      let v = _;
      for (let $ = 0; $ < g; $++)
        if (v = (v + m + g) % g, !s.items[v]?.disabled) return v;
      return _;
    }
    function p(_, m) {
      if (_.key === "ArrowRight" || _.key === "ArrowDown") {
        _.preventDefault();
        const g = b(m, 1), v = s.items[g];
        v && u(v), St(() => i.value[g]?.focus());
      } else if (_.key === "ArrowLeft" || _.key === "ArrowUp") {
        _.preventDefault();
        const g = b(m, -1), v = s.items[g];
        v && u(v), St(() => i.value[g]?.focus());
      } else if (_.key === "Home") {
        _.preventDefault();
        const g = f.value[0];
        if (g !== void 0) {
          const v = s.items[g];
          v && u(v), St(() => i.value[g]?.focus());
        }
      } else if (_.key === "End") {
        _.preventDefault();
        const g = f.value[f.value.length - 1];
        if (g !== void 0) {
          const v = s.items[g];
          v && u(v), St(() => i.value[g]?.focus());
        }
      }
    }
    return (_, m) => (y(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-white/[0.12]"
    }, [
      (y(!0), x(q, null, Z(e.items, (g, v) => (y(), x("button", {
        id: o(g.value),
        key: g.value,
        ref_for: !0,
        ref: ($) => r($, v),
        type: "button",
        role: "tab",
        "aria-selected": l(g),
        "aria-disabled": g.disabled === !0,
        tabindex: l(g) ? 0 : -1,
        class: at(d(g)),
        onClick: ($) => h(g, v),
        onKeydown: ($) => p($, v)
      }, [
        c("span", X$, M(g.label), 1)
      ], 42, K$))), 128))
    ], 8, U$));
  }
});
function me(e) {
  const [t, s, a] = e.split("-").map(Number);
  return new Date(t, s - 1, a);
}
function Ne(e) {
  const t = e.getFullYear(), s = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${s}-${a}`;
}
function oe(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function ha(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function xo(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function Hs(e, t) {
  const s = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return s < a ? -1 : s > a ? 1 : 0;
}
function ko(e, t) {
  return Hs(e, t) === 0;
}
function fa(e, t) {
  return Hs(e, t) < 0;
}
function Z$(e, t) {
  return Hs(e, t) >= 0;
}
function Q$(e, t) {
  return Hs(e, t) <= 0;
}
function J$(e) {
  const t = e.getFullYear(), s = e.getMonth(), a = new Date(t, s, 1), n = new Date(a);
  n.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(n);
  for (let r = 0; r < 42; r++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const tM = [
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
], eM = [
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
function wo(e) {
  return `${tM[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function $o(e) {
  return `${eM[e.getMonth()]} ${e.getFullYear()}`;
}
const sM = ["aria-expanded", "aria-labelledby", "aria-label"], aM = ["onKeydown"], nM = { class: "mb-4 flex items-center justify-between gap-2" }, oM = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, iM = { class: "min-w-0 truncate" }, rM = { class: "min-w-0 truncate" }, lM = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, cM = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, dM = { class: "grid grid-cols-7 gap-y-1" }, uM = ["disabled", "onClick"], hM = /* @__PURE__ */ J({
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
    const s = e, a = t, o = `${`kiut-drp-${Math.random().toString(36).slice(2, 9)}`}-lbl`, i = st(null), r = st(null), l = st(!1), d = st(null), u = st(ha(/* @__PURE__ */ new Date())), h = D(() => {
      const C = ha(u.value);
      return [C, xo(C, 1)];
    }), f = D(() => s.ariaLabel ?? s.placeholder), b = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], p = D(() => {
      if (!s.modelValue.start || !s.modelValue.end) return s.placeholder;
      const C = me(s.modelValue.start), A = me(s.modelValue.end);
      return `${wo(C)} – ${wo(A)}`;
    });
    function _(C, A) {
      return C.getMonth() === A.getMonth() && C.getFullYear() === A.getFullYear();
    }
    function m(C) {
      const A = oe(C);
      if (s.minDate) {
        const P = oe(me(s.minDate));
        if (fa(A, P)) return !0;
      }
      if (s.maxDate) {
        const P = oe(me(s.maxDate));
        if (fa(P, A)) return !0;
      }
      return !1;
    }
    function g(C, A) {
      const P = _(A, C), E = s.modelValue.start ? oe(me(s.modelValue.start)) : null, R = s.modelValue.end ? oe(me(s.modelValue.end)) : null, N = oe(A), Y = P ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!E || !R)
        return `${Y} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const B = Z$(N, E) && Q$(N, R), F = ko(N, E), I = ko(N, R);
      return F || I ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : B ? `${Y} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${Y} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function v(C) {
      if (m(C)) return;
      const A = oe(C);
      if (!d.value) {
        d.value = new Date(A), a("update:modelValue", { start: Ne(A), end: Ne(A) });
        return;
      }
      let E = oe(d.value), R = new Date(A);
      fa(R, E) && ([E, R] = [R, E]), a("update:modelValue", { start: Ne(E), end: Ne(R) }), d.value = null, l.value = !1;
    }
    function $(C) {
      u.value = xo(u.value, C);
    }
    function k() {
      l.value = !1;
    }
    function w(C) {
      if (C.stopPropagation(), l.value = !l.value, l.value) {
        if (d.value = null, s.modelValue.start)
          try {
            u.value = ha(me(s.modelValue.start));
          } catch {
          }
        St(() => r.value?.focus());
      }
    }
    function S(C) {
      if (!l.value) return;
      const A = i.value;
      A && !A.contains(C.target) && (l.value = !1);
    }
    return Vt(l, (C) => {
      C && (d.value = null);
    }), he(() => {
      document.addEventListener("click", S);
    }), ns(() => {
      document.removeEventListener("click", S);
    }), (C, A) => (y(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: at(T(is))
      }, M(e.label), 3)) : O("", !0),
      c("button", {
        type: "button",
        class: at([T(rs), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : f.value,
        onClick: w
      }, [
        X(T(wg), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        c("span", {
          class: at([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, M(p.value), 3)
      ], 10, sM),
      Xt(c("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: "absolute left-0 top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-white/[0.12]",
        onKeydown: Ss(de(k, ["stop"]), ["escape"])
      }, [
        c("div", nM, [
          c("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-white/[0.12] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: A[0] || (A[0] = (P) => $(-1))
          }, [
            X(T(Sg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          c("div", oM, [
            c("span", iM, M(T($o)(h.value[0])), 1),
            c("span", rM, M(T($o)(h.value[1])), 1)
          ]),
          c("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-white/[0.12] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: A[1] || (A[1] = (P) => $(1))
          }, [
            X(T(Cg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        c("div", lM, [
          (y(!0), x(q, null, Z(h.value, (P) => (y(), x("div", {
            key: `${P.getFullYear()}-${P.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            c("div", cM, [
              (y(), x(q, null, Z(b, (E) => c("span", { key: E }, M(E), 1)), 64))
            ]),
            c("div", dM, [
              (y(!0), x(q, null, Z(T(J$)(P), (E) => (y(), x("button", {
                key: T(Ne)(E),
                type: "button",
                disabled: m(E),
                class: at(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", g(P, E)]),
                onClick: (R) => v(E)
              }, M(E.getDate()), 11, uM))), 128))
            ])
          ]))), 128))
        ])
      ], 40, aM), [
        [Ms, l.value]
      ])
    ], 512));
  }
}), fM = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, gM = /* @__PURE__ */ J({
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
    const t = e, s = D(() => t.statusLive !== void 0), a = D(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), n = D(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = D(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = D(() => {
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
        case "neutral":
        default:
          return r ? "border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
      }
    });
    return (r, l) => s.value ? (y(), x("span", {
      key: 0,
      role: "status",
      class: at(["inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-sans text-sm font-medium", n.value])
    }, [
      e.statusLive === !0 ? (y(), x("span", fM, [...l[0] || (l[0] = [
        c("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        c("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : O("", !0),
      c("span", {
        class: at(o.value)
      }, M(a.value), 3)
    ], 2)) : (y(), x("span", {
      key: 1,
      class: at(["inline-flex items-center justify-center rounded-full px-3 py-1.5 font-sans text-sm font-semibold tracking-tight", i.value])
    }, [
      zt(r.$slots, "default", {}, () => [
        wt(M(e.label), 1)
      ])
    ], 2));
  }
}), pM = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, bM = ["type", "disabled", "aria-label"], vM = {
  key: 1,
  class: "min-w-0 truncate"
}, mM = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, yM = ["type", "disabled", "aria-label"], _M = {
  key: 1,
  class: "min-w-0 truncate"
}, $s = /* @__PURE__ */ J({
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
    const t = e, s = Oi(), a = D(() => !!t.tooltip?.trim()), n = D(() => t.variant === "action"), o = D(() => !n.value), i = D(() => {
      const u = s["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (n.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), r = D(() => {
      const u = s.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), l = D(() => {
      const { class: u, type: h, "aria-label": f, ...b } = s;
      return b;
    }), d = D(() => t.variant === "primary" ? [
      "px-4 py-2.5",
      "bg-[color:var(--kiut-primary)] text-white shadow-sm",
      "hover:bg-[color:var(--kiut-primary-hover)] active:bg-[color:var(--kiut-primary-dark)]",
      "dark:text-white dark:hover:brightness-110 dark:active:brightness-95"
    ] : t.variant === "secondary" ? [
      "px-4 py-2.5",
      "border border-slate-200 bg-slate-50 text-[color:var(--kiut-text-primary)]",
      "hover:border-slate-300 hover:bg-slate-100",
      "active:bg-slate-200/80",
      "dark:border-white/[0.12] dark:bg-slate-800/80 dark:text-slate-100",
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
    return (u, h) => a.value ? (y(), x("span", pM, [
      c("button", qa({
        type: r.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, T(s).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, l.value), [
        u.$slots.icon ? (y(), x("span", {
          key: 0,
          class: at(["inline-flex shrink-0", n.value ? "[&>svg]:h-5 [&>svg]:w-5" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          zt(u.$slots, "icon")
        ], 2)) : O("", !0),
        o.value ? (y(), x("span", vM, [
          zt(u.$slots, "default")
        ])) : O("", !0)
      ], 16, bM),
      c("span", mM, M(e.tooltip), 1)
    ])) : (y(), x("button", qa({
      key: 1,
      type: r.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, T(s).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, l.value), [
      u.$slots.icon ? (y(), x("span", {
        key: 0,
        class: at(["inline-flex shrink-0", n.value ? "[&>svg]:h-5 [&>svg]:w-5" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        zt(u.$slots, "icon")
      ], 2)) : O("", !0),
      o.value ? (y(), x("span", _M, [
        zt(u.$slots, "default")
      ])) : O("", !0)
    ], 16, yM));
  }
}), xM = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 font-sans",
  "aria-hidden": "false"
}, kM = { class: "flex shrink-0 items-start justify-between gap-4 border-b border-[color:var(--kiut-border-light)] px-6 pb-4 pt-6 dark:border-white/[0.08]" }, wM = { class: "min-w-0 flex-1 space-y-1" }, $M = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, MM = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-5" }, SM = { class: "flex shrink-0 justify-end gap-2 border-t border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] px-6 py-4 dark:border-white/[0.08] dark:bg-[#252528]" }, CM = /* @__PURE__ */ J({
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
    const s = e, a = t, o = `${`kiut-modal-${Math.random().toString(36).slice(2, 9)}`}-title`, i = st(null);
    function r() {
      a("cancel"), a("update:modelValue", !1);
    }
    function l() {
      a("confirm");
    }
    function d(u) {
      s.modelValue && u.key === "Escape" && (u.preventDefault(), r());
    }
    return Vt(
      () => s.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), he(() => {
      document.addEventListener("keydown", d);
    }), ns(() => {
      document.removeEventListener("keydown", d);
    }), (u, h) => (y(), ct(Ao, { to: "body" }, [
      e.modelValue ? (y(), x("div", xM, [
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
          class: "relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:border-white/[0.08] dark:bg-[#252528] dark:shadow-black/40",
          onClick: h[0] || (h[0] = de(() => {
          }, ["stop"]))
        }, [
          c("header", kM, [
            c("div", wM, [
              c("h2", {
                id: o,
                class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
              }, M(e.title), 1),
              e.subtitle ? (y(), x("p", $M, M(e.subtitle), 1)) : O("", !0)
            ]),
            X($s, {
              variant: "action",
              type: "button",
              class: "shrink-0",
              onClick: r
            }, {
              icon: xs(() => [
                X(T(Lg), { class: "h-5 w-5" })
              ]),
              _: 1
            })
          ]),
          c("div", MM, [
            zt(u.$slots, "default")
          ]),
          c("footer", SM, [
            X($s, {
              variant: "secondary",
              type: "button",
              onClick: r
            }, {
              default: xs(() => [
                wt(M(e.cancelLabel), 1)
              ]),
              _: 1
            }),
            X($s, {
              variant: "primary",
              type: "button",
              onClick: l
            }, {
              default: xs(() => [
                wt(M(e.confirmLabel), 1)
              ]),
              _: 1
            })
          ])
        ], 512)
      ])) : O("", !0)
    ]));
  }
}), DM = { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, AM = { class: "flex min-w-0 flex-1 gap-3 sm:items-start" }, TM = {
  key: 0,
  class: "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] text-[color:var(--kiut-primary)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-[color:var(--kiut-bg-card)] dark:shadow-black/20 [&>svg]:h-5 [&>svg]:w-5",
  "aria-hidden": "true"
}, BM = { class: "min-w-0 space-y-1" }, LM = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, FM = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5"
}, PM = {
  key: 0,
  class: "mt-8"
}, EM = /* @__PURE__ */ J({
  name: "Section",
  __name: "Section",
  props: {
    title: {},
    subtitle: {},
    icon: {}
  },
  setup(e) {
    const t = e, s = Do(), n = `${`kiut-section-${Math.random().toString(36).slice(2, 9)}`}-title`, o = D(() => !!(s.icon || t.icon));
    return (i, r) => (y(), x("section", {
      class: "font-sans",
      "aria-labelledby": n
    }, [
      c("header", DM, [
        c("div", AM, [
          o.value ? (y(), x("div", TM, [
            zt(i.$slots, "icon", {}, () => [
              e.icon ? (y(), ct($a(e.icon), { key: 0 })) : O("", !0)
            ])
          ])) : O("", !0),
          c("div", BM, [
            c("h2", {
              id: n,
              class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
            }, M(e.title), 1),
            e.subtitle ? (y(), x("p", LM, M(e.subtitle), 1)) : O("", !0)
          ])
        ]),
        i.$slots.actions ? (y(), x("div", FM, [
          zt(i.$slots, "actions")
        ])) : O("", !0)
      ]),
      i.$slots.default ? (y(), x("div", PM, [
        zt(i.$slots, "default")
      ])) : O("", !0)
    ]));
  }
}), jM = {
  install(e) {
    e.component("KiutChartBar", ae), e.component("KiutChartLine", fe), e.component("KiutPieChart", Ws), e.component("KiutBoxplotChart", Ih), e.component("KiutCandlestickChart", Ci), e.component("KiutHistogramChart", Di), e.component("KiutSankeyChart", ge), e.component("KiutAgentsPerDay", Zg), e.component("KiutBookingManager", Ep), e.component("KiutCheckin", o0), e.component("KiutCheckinMetrics", T0), e.component("KiutCheckinSegments", ab), e.component("KiutDisruption", Vb), e.component("KiutFAQ", nv), e.component("KiutMessagesPerAgent", fv), e.component("KiutRecordLocator", Iv), e.component("KiutSalesByChannel", sm), e.component("KiutSeller", Fm), e.component("KiutTopAgents", Wm), e.component("KiutPaymentMethod", $1), e.component("KiutAgentHumanConversations", hy), e.component("KiutChannelMetrics", $y), e.component("KiutTriageCombinations", Hy), e.component("KiutSelectLanguage", t_), e.component("KiutGuardrails", D_), e.component("KiutDisruptionNotifier", M2), e.component("KiutNpsDailyMetrics", Ai), e.component("KiutNpsMetrics", gx), e.component("KiutNpsOverviewMetrics", Ti), e.component("KiutAWSCost", Fx), e.component("KiutCostUsage", sk), e.component("KiutTokenUsage", wk), e.component("KiutConversationCount", Ok), e.component("KiutTopAgentsAnalysis", Gk), e.component("KiutTopAgentsPie", i5), e.component("KiutDailyCostTrends", b5), e.component("KiutModelUsage", V5), e.component("KiutMessageRoles", nw), e.component("KiutCostPerConversations", ww), e.component("Tabs", Tw), e.component("Table", Vw), e.component("Filters", f$), e.component("InputText", m$), e.component("InputNumber", w$), e.component("Select", Bi), e.component("Toggle", B$), e.component("InputPhone", z$), e.component("SelectablePills", q$), e.component("SegmentedControl", G$), e.component("DateRangePicker", hM), e.component("Tag", gM), e.component("Button", $s), e.component("Modal", CM), e.component("Section", EM);
  }
};
export {
  Fx as AWSCost,
  hy as AgentHumanConversations,
  Zg as AgentsPerDay,
  Ep as BookingManager,
  Ih as BoxplotChart,
  $s as Button,
  Ci as CandlestickChart,
  $y as ChannelMetrics,
  ae as ChartBar,
  fe as ChartLine,
  o0 as Checkin,
  T0 as CheckinMetrics,
  ab as CheckinSegments,
  Ok as ConversationCount,
  ww as CostPerConversations,
  sk as CostUsage,
  b5 as DailyCostTrends,
  hM as DateRangePicker,
  Vb as Disruption,
  M2 as DisruptionNotifier,
  nv as FAQ,
  f$ as Filters,
  D_ as Guardrails,
  Di as HistogramChart,
  w$ as InputNumber,
  z$ as InputPhone,
  m$ as InputText,
  jM as KiutUIPlugin,
  nw as MessageRoles,
  fv as MessagesPerAgent,
  CM as Modal,
  V5 as ModelUsage,
  Ai as NpsDailyMetrics,
  gx as NpsMetrics,
  Ti as NpsOverviewMetrics,
  $1 as PaymentMethod,
  Ws as PieChart,
  Iv as RecordLocator,
  sm as SalesByChannel,
  ge as SankeyChart,
  EM as Section,
  G$ as SegmentedControl,
  Bi as Select,
  t_ as SelectLanguage,
  q$ as SelectablePills,
  Fm as Seller,
  Vw as Table,
  Tw as Tabs,
  gM as Tag,
  B$ as Toggle,
  wk as TokenUsage,
  Wm as TopAgents,
  Gk as TopAgentsAnalysis,
  i5 as TopAgentsPie,
  Hy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
