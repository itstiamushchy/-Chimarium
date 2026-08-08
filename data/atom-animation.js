/* ============================================================
   data/atom-animation.js  v3 — Три режими анімації
   Хімарій
   Залежність: CC (global, з elements.js)
   Експортує: window.getOrbitalType, window.renderAtomAnimation,
              window.stopAtomAnimation, window.pauseAtomAnimation,
              window.resumeAtomAnimation, window.isAnimationPaused
   ============================================================ */

(function () {
  'use strict';

  /* ── стан ───────────────────────────────────────────────── */
  var _animId = null, _paused = false, _tickFn = null;

  /* ── SVG helper ─────────────────────────────────────────── */
  var NS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  /* ============================================================
     getOrbitalType(e)  →  'circular' | 'dumbbell' | 'clover4' | 'rose8'
     ============================================================ */
  function getOrbitalType(e) {
    if (e.cat === 'noble') return 'circular';
    if (e.econf) {
      var tokens = e.econf.split(/(?=[1-7][spdf])/).filter(function (t) {
        return /^[1-7][spdf]\d+$/.test(t);
      });
      if (tokens.length) {
        var last = tokens[tokens.length - 1];
        var orb = last[1];
        if (orb === 's') return 'circular';
        if (orb === 'f') return 'rose8';
        if (orb === 'd') {
          if (e.cat === 'lanthanide' || e.cat === 'actinide') return 'rose8';
          return 'clover4';
        }
        if (orb === 'p') {
          var hasD = tokens.some(function (t) { return t[1] === 'd'; });
          return hasD ? 'clover4' : 'dumbbell';
        }
      }
    }
    if (e.p === 1) return 'circular';
    if (e.p === 2) return (e.g <= 2) ? 'circular' : 'dumbbell';
    if (e.g <= 2) return 'circular';
    if (e.cat === 'lanthanide' || e.cat === 'actinide') return 'rose8';
    if (e.cat === 'transition') return 'clover4';
    return 'dumbbell';
  }

  /* ============================================================
     parseShells / parseEconf / calcRadii / helpers
     ============================================================ */
  function parseShells(str, n) {
    if (!str || str === '—' || !str.trim()) return [n];
    var arr = str.split(',').map(function (x) { return parseInt(x.trim(), 10); })
                .filter(function (x) { return !isNaN(x); });
    return arr.length ? arr : [n];
  }

  /* parseEconf('1s22s22p63s23p64s23d6')
     → [{level:1, sub:[{type:'s',count:2}]}, ...] sorted by level */
  function parseEconf(econf) {
    if (!econf || econf === '—') return null;
    var tokens = econf.split(/(?=[1-7][spdf])/).filter(function (t) {
      return /^[1-7][spdf]\d+$/.test(t);
    });
    if (!tokens.length) return null;
    var byLv = {};
    tokens.forEach(function (tok) {
      var lv = parseInt(tok[0], 10);
      var type = tok[1];
      var count = parseInt(tok.substring(2), 10);
      if (!byLv[lv]) byLv[lv] = [];
      byLv[lv].push({ type: type, count: count });
    });
    return Object.keys(byLv).map(Number).sort(function (a, b) { return a - b; })
      .map(function (lv) { return { level: lv, sub: byLv[lv] }; });
  }

  function calcRadii(nShells, element) {
    var base = 25;
    var step = Math.min(28, 110 / nShells);
    var isMetal = element && (element.cat === 'alkali' || element.cat === 'alkaline');
    var arr = [];
    for (var i = 0; i < nShells; i++) {
      if (isMetal && i === nShells - 1 && nShells > 1) {
        arr.push(Math.min(118, base + (nShells - 2) * step + step * 2.2));
      } else {
        arr.push(base + i * step);
      }
    }
    return arr;
  }

  function getMaxCap(e) {
    if (!e.g) return 8;
    if (e.g <= 2) return 2;
    if (e.g >= 13) return 8;
    if (e.cat === 'transition') return 18;
    return 8;
  }

  function wantHoles(e) {
    return e.cat === 'nonmetal' || e.cat === 'halogen' || e.cat === 'metalloid';
  }

  /* ── ядро ────────────────────────────────────────────────── */
  function _addNucleus(svg, color, num) {
    var g = document.createElementNS(NS, 'g');
    g.appendChild(svgEl('circle', { r: '16', fill: color }));
    var t = svgEl('text', { 'text-anchor': 'middle', dy: '5', fill: '#0a0b15',
      'font-weight': 'bold', 'font-size': '12' });
    t.textContent = num + '+';
    g.appendChild(t);
    svg.appendChild(g);
  }

  /* ── контури гантелів (Безьє) ───────────────────────────── */
  function _dbPathH(sc) {
    return 'M 0 0 C ' + sc * 0.5 + ' ' + sc * 0.5 + ',' + sc + ' ' + sc * 0.25 + ',' + sc + ' 0' +
      ' C ' + sc + ' ' + -sc * 0.25 + ',' + sc * 0.5 + ' ' + -sc * 0.5 + ',0 0' +
      ' C ' + -sc * 0.5 + ' ' + sc * 0.5 + ',' + -sc + ' ' + sc * 0.25 + ',' + -sc + ' 0' +
      ' C ' + -sc + ' ' + -sc * 0.25 + ',' + -sc * 0.5 + ' ' + -sc * 0.5 + ',0 0 Z';
  }
  function _dbPathV(sc) {
    return 'M 0 0 C ' + sc * 0.5 + ' ' + sc * 0.5 + ',' + sc * 0.25 + ' ' + sc + ',0 ' + sc +
      ' C ' + -sc * 0.25 + ' ' + sc + ',' + -sc * 0.5 + ' ' + sc * 0.5 + ',0 0' +
      ' C ' + sc * 0.5 + ' ' + -sc * 0.5 + ',' + sc * 0.25 + ' ' + -sc + ',0 ' + -sc +
      ' C ' + -sc * 0.25 + ' ' + -sc + ',' + -sc * 0.5 + ' ' + -sc * 0.5 + ',0 0 Z';
  }

  /* ══════════════════════════════════════════════════════════
     renderAtomAnimation(element, svgElem, mode)
     mode: 'simple2d' | 'full2d' | 'simple3d'   (default: 'simple2d')
     ══════════════════════════════════════════════════════════ */
  function renderAtomAnimation(element, svgElem, mode) {
    if (_animId) { cancelAnimationFrame(_animId); _animId = null; }
    svgElem.innerHTML = '';
    mode = mode || 'simple2d';

    var orbType = getOrbitalType(element);
    var shells  = parseShells(element.levels, element.n);
    var radii   = calcRadii(shells.length, element);
    var catCol  = (typeof CC !== 'undefined' && CC[element.cat]) ? CC[element.cat] : '#78909C';
    var mv      = [];

    if (mode === 'full2d')       _buildFull2D(element, svgElem, shells, radii, catCol, mv);
    else if (mode === 'simple3d') _buildSimple3D(element, svgElem, shells, radii, catCol, mv, orbType);
    else                          _buildSimple2D(element, svgElem, shells, radii, catCol, mv, orbType);

    function tick() {
      for (var i = 0; i < mv.length; i++) _tickOne(mv[i]);
      _animId = requestAnimationFrame(tick);
    }
    _paused = false;
    _tickFn = tick;
    tick();
  }

  /* ══════════════════════════════════════════════════════════
     TICK — всі типи руху
     ══════════════════════════════════════════════════════════ */
  function _tickOne(o) {
    switch (o.type) {

      /* ── 2D кругова орбіта ─────────────────────────────── */
      case 'circle':
        o.angle += o.speed;
        o.el.setAttribute('cx', o.radius * Math.cos(o.angle));
        o.el.setAttribute('cy', o.radius * Math.sin(o.angle));
        break;

      /* ── 2D гантель горизонтальна ──────────────────────── */
      case 'dumbbellX': {
        o.t += o.speed;
        var d = 1 + Math.sin(o.t) * Math.sin(o.t);
        o.el.setAttribute('cx', (o.scale * Math.cos(o.t)) / d);
        o.el.setAttribute('cy', (o.scale * Math.sin(o.t) * Math.cos(o.t)) / d);
        break;
      }

      /* ── 2D гантель вертикальна ────────────────────────── */
      case 'dumbbellY': {
        o.t += o.speed;
        var d2 = 1 + Math.sin(o.t) * Math.sin(o.t);
        o.el.setAttribute('cx', (o.scale * Math.sin(o.t) * Math.cos(o.t)) / d2);
        o.el.setAttribute('cy', (o.scale * Math.cos(o.t)) / d2);
        break;
      }

      /* ── 2D конюшина (4-пелюстки) ─────────────────────── */
      case 'clover': {
        o.angle += o.speed;
        var rr = o.scale * Math.cos(2 * o.angle);
        var off = o.offset || 0;
        o.el.setAttribute('cx', rr * Math.cos(o.angle + off));
        o.el.setAttribute('cy', rr * Math.sin(o.angle + off));
        break;
      }

      /* ── 2D розетка (8-пелюстків) ──────────────────────── */
      case 'rose': {
        o.angle += o.speed;
        var rr2 = o.scale * Math.cos(4 * o.angle);
        o.el.setAttribute('cx', rr2 * Math.cos(o.angle));
        o.el.setAttribute('cy', rr2 * Math.sin(o.angle));
        break;
      }

      /* ── 3D нахилена гантель X ────────────────────────── */
      case 'tilt3d_dumbbellX': {
        o.t += o.speed;
        var dbD = 1 + Math.sin(o.t) * Math.sin(o.t);
        var dbX = (o.scale * Math.cos(o.t)) / dbD;
        var dbY = (o.scale * Math.sin(o.t) * Math.cos(o.t)) / dbD;
        var dbXr = dbX * Math.cos(o.rot) - dbY * Math.sin(o.rot);
        var dbYr = dbX * Math.sin(o.rot) + dbY * Math.cos(o.rot);
        o.el.setAttribute('cx', dbXr);
        o.el.setAttribute('cy', dbYr * o.tilt);
        var dbDp = 0.5 + 0.5 * (dbYr / o.scale);
        o.el.setAttribute('r', o.baseR * (0.65 + 0.5 * dbDp));
        o.el.setAttribute('opacity', 0.45 + 0.55 * dbDp);
        break;
      }

      /* ── 3D нахилена гантель Y ────────────────────────── */
      case 'tilt3d_dumbbellY': {
        o.t += o.speed;
        var dbD2 = 1 + Math.sin(o.t) * Math.sin(o.t);
        var dbX2 = (o.scale * Math.sin(o.t) * Math.cos(o.t)) / dbD2;
        var dbY2 = (o.scale * Math.cos(o.t)) / dbD2;
        var dbXr2 = dbX2 * Math.cos(o.rot) - dbY2 * Math.sin(o.rot);
        var dbYr2 = dbX2 * Math.sin(o.rot) + dbY2 * Math.cos(o.rot);
        o.el.setAttribute('cx', dbXr2);
        o.el.setAttribute('cy', dbYr2 * o.tilt);
        var dbDp2 = 0.5 + 0.5 * (dbYr2 / o.scale);
        o.el.setAttribute('r', o.baseR * (0.65 + 0.5 * dbDp2));
        o.el.setAttribute('opacity', 0.45 + 0.55 * dbDp2);
        break;
      }

      /* ── 3D нахилене коло ──────────────────────────────── */
      case 'tilt3d_circle': {
        o.angle += o.speed;
        var cx0 = o.radius * Math.cos(o.angle);
        var cy0 = o.radius * Math.sin(o.angle);
        var cxr = cx0 * Math.cos(o.rot) - cy0 * Math.sin(o.rot);
        var cyr = cx0 * Math.sin(o.rot) + cy0 * Math.cos(o.rot);
        o.el.setAttribute('cx', cxr);
        o.el.setAttribute('cy', cyr * o.tilt);
        var cd = 0.5 + 0.5 * (cyr / o.radius);
        o.el.setAttribute('r', o.baseR * (0.65 + 0.5 * cd));
        o.el.setAttribute('opacity', 0.45 + 0.55 * cd);
        break;
      }

      /* ── 3D нахилена конюшина ──────────────────────────── */
      case 'tilt3d_clover': {
        o.angle += o.speed;
        var rr3 = o.scale * Math.cos(2 * o.angle);
        var dx = rr3 * Math.cos(o.angle);
        var dy = rr3 * Math.sin(o.angle);
        var dxr = dx * Math.cos(o.rot) - dy * Math.sin(o.rot);
        var dyr = dx * Math.sin(o.rot) + dy * Math.cos(o.rot);
        o.el.setAttribute('cx', dxr);
        o.el.setAttribute('cy', dyr * o.tilt);
        var dd = 0.5 + 0.5 * (dyr / o.scale);
        o.el.setAttribute('r', o.baseR * (0.65 + 0.5 * dd));
        o.el.setAttribute('opacity', 0.45 + 0.55 * dd);
        break;
      }

      /* ── 3D нахилена розетка ───────────────────────────── */
      case 'tilt3d_rose': {
        o.angle += o.speed;
        var rr4 = o.scale * Math.cos(4 * o.angle);
        var rx = rr4 * Math.cos(o.angle);
        var ry = rr4 * Math.sin(o.angle);
        var rxr = rx * Math.cos(o.rot) - ry * Math.sin(o.rot);
        var ryr = rx * Math.sin(o.rot) + ry * Math.cos(o.rot);
        o.el.setAttribute('cx', rxr);
        o.el.setAttribute('cy', ryr * o.tilt);
        var rd = 0.5 + 0.5 * (ryr / o.scale);
        o.el.setAttribute('r', o.baseR * (0.65 + 0.5 * rd));
        o.el.setAttribute('opacity', 0.45 + 0.55 * rd);
        break;
      }
    }
  }

  /* ══════════════════════════════════════════════════════════
     ███  MODE 1 — SIMPLE 2D
     ══════════════════════════════════════════════════════════ */
  function _buildSimple2D(el, svg, shells, radii, catCol, mv, orbType) {
    switch (orbType) {
      case 'dumbbell': _s2d_dumbbell(el, svg, shells, radii, catCol, mv); break;
      case 'clover4':  _s2d_clover4(el, svg, shells, radii, catCol, mv);  break;
      case 'rose8':    _s2d_rose8(el, svg, shells, radii, catCol, mv);    break;
      default:         _s2d_circular(el, svg, shells, radii, catCol, mv); break;
    }
  }

  /* ── circular ───────────────────────────────────────────── */
  function _s2d_circular(el, svg, shells, radii, catCol, mv) {
    shells.forEach(function (_, i) {
      svg.appendChild(svgEl('circle', {
        r: radii[i], fill: 'none',
        stroke: '#ff6b6b', 'stroke-opacity': '0.35', 'stroke-dasharray': '4 3'
      }));
    });
    _addNucleus(svg, catCol, el.n);

    var lastIdx = shells.length - 1;
    shells.forEach(function (count, i) {
      var r = radii[i], speed = 16.25 / Math.pow(r, 1.3), isOuter = (i === lastIdx);
      var holes = (isOuter && wantHoles(el)) ? Math.max(0, getMaxCap(el) - count) : 0;
      var total = count + holes;
      var outerBig = isOuter && !wantHoles(el) && (el.cat === 'alkali' || el.cat === 'alkaline');

      for (var k = 0; k < count; k++) {
        var e = outerBig
          ? svgEl('circle', { r: '6', fill: '#38bdf8', stroke: '#fff', 'stroke-width': '1.5' })
          : svgEl('circle', { r: '4', fill: '#facc15' });
        svg.appendChild(e);
        mv.push({ type: 'circle', el: e, radius: r, angle: (k / total) * Math.PI * 2, speed: speed });
      }
      for (var j = 0; j < holes; j++) {
        var h = svgEl('circle', { r: '5', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
        svg.appendChild(h);
        mv.push({ type: 'circle', el: h, radius: r, angle: ((count + j) / total) * Math.PI * 2, speed: speed });
      }
    });
  }

  /* ── dumbbell ───────────────────────────────────────────── */
  function _s2d_dumbbell(el, svg, shells, radii, catCol, mv) {
    var oIdx = shells.length - 1;
    for (var i = 0; i < oIdx; i++) {
      svg.appendChild(svgEl('circle', {
        r: radii[i], fill: 'none',
        stroke: '#ff6b6b', 'stroke-opacity': '0.35', 'stroke-dasharray': '4 3'
      }));
    }
    var sc = Math.min(85, radii[oIdx] * 1.15);
    svg.appendChild(svgEl('path', { d: _dbPathH(sc), fill: 'rgba(74,222,128,0.06)', stroke: '#4ade80', 'stroke-opacity': '0.40', 'stroke-dasharray': '3 3' }));
    svg.appendChild(svgEl('path', { d: _dbPathV(sc), fill: 'rgba(74,222,128,0.06)', stroke: '#4ade80', 'stroke-opacity': '0.40', 'stroke-dasharray': '3 3' }));

    _addNucleus(svg, catCol, el.n);

    for (var si = 0; si < oIdx; si++) {
      var cnt = shells[si], r = radii[si], sp = 16.25 / Math.pow(r, 1.3);
      for (var k = 0; k < cnt; k++) {
        var e = svgEl('circle', { r: '3.5', fill: '#38bdf8' });
        svg.appendChild(e);
        mv.push({ type: 'circle', el: e, radius: r, angle: (k / cnt) * Math.PI * 2, speed: sp });
      }
    }

    var oCount = shells[oIdx], holes = wantHoles(el) ? Math.max(0, 8 - oCount) : 0;
    var halfE = Math.ceil(oCount / 2), halfH = Math.ceil(holes / 2);
    _addDbElectrons(svg, mv, halfE, halfH, 'dumbbellX', sc, 0.018);
    _addDbElectrons(svg, mv, oCount - halfE, holes - halfH, 'dumbbellY', sc, 0.018);
  }

  function _addDbElectrons(svg, mv, eN, hN, type, scale, speed) {
    var total = eN + hN; if (!total) return;
    for (var i = 0; i < eN; i++) {
      var e = svgEl('circle', { r: '3.5', fill: '#4ade80' });
      svg.appendChild(e);
      mv.push({ type: type, el: e, t: (i / total) * Math.PI * 2, speed: speed, scale: scale });
    }
    for (var j = 0; j < hN; j++) {
      var h = svgEl('circle', { r: '4', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
      svg.appendChild(h);
      mv.push({ type: type, el: h, t: ((eN + j) / total) * Math.PI * 2, speed: speed, scale: scale });
    }
  }

  /* ── clover4 ────────────────────────────────────────────── */
  function _s2d_clover4(el, svg, shells, radii, catCol, mv) {
    var n = shells.length;
    if (n < 3) { _s2d_circular(el, svg, shells, radii, catCol, mv); return; }

    /* контури орбіт */
    for (var i = 0; i < n - 2; i++)
      svg.appendChild(svgEl('circle', { r: radii[i], fill: 'none', stroke: '#ff6b6b', 'stroke-opacity': '0.35', 'stroke-dasharray': '4 3' }));
    svg.appendChild(svgEl('circle', { r: radii[n - 1], fill: 'none', stroke: '#ff6b6b', 'stroke-opacity': '0.35', 'stroke-dasharray': '4 3' }));

    /* конюшина (d) */
    var scale = Math.min(95, radii[n - 1] * 0.9);
    var pts = [];
    for (var a = 0; a <= Math.PI * 2 + 0.05; a += 0.05) {
      var rr = scale * Math.cos(2 * a);
      pts.push(rr * Math.cos(a) + ' ' + rr * Math.sin(a));
    }
    svg.appendChild(svgEl('path', { d: 'M ' + pts.join(' L ') + ' Z',
      fill: 'rgba(251,191,36,0.06)', stroke: '#fbbf24', 'stroke-opacity': '0.40', 'stroke-dasharray': '3 3' }));

    _addNucleus(svg, catCol, el.n);

    /* внутрішні e⁻ */
    for (var si = 0; si < n - 2; si++) {
      var cnt = shells[si], r = radii[si], sp = 16.25 / Math.pow(r, 1.3);
      for (var k = 0; k < cnt; k++) {
        var e = svgEl('circle', { r: '3.5', fill: '#38bdf8' });
        svg.appendChild(e);
        mv.push({ type: 'circle', el: e, radius: r, angle: (k / cnt) * Math.PI * 2, speed: sp });
      }
    }

    /* d-електрони на конюшині */
    var dC = shells[n - 2];
    for (var di = 0; di < dC; di++) {
      var de = svgEl('circle', { r: '4', fill: '#facc15' });
      svg.appendChild(de);
      mv.push({ type: 'clover', el: de, angle: (di / dC) * Math.PI * 2, speed: 0.012, scale: scale, offset: 0 });
    }

    /* зовнішні s */
    var oC = shells[n - 1];
    for (var oi = 0; oi < oC; oi++) {
      var oe = svgEl('circle', { r: '5', fill: '#38bdf8', stroke: '#fff', 'stroke-width': '1.5' });
      svg.appendChild(oe);
      mv.push({ type: 'circle', el: oe, radius: radii[n - 1], angle: (oi / oC) * Math.PI * 2, speed: 0.008 });
    }
  }

  /* ── rose8 ──────────────────────────────────────────────── */
  function _s2d_rose8(el, svg, shells, radii, catCol, mv) {
    var n = shells.length;
    if (n < 3) { _s2d_circular(el, svg, shells, radii, catCol, mv); return; }

    var iRadii = radii.slice(0, n - 2);
    var oR = Math.min(118, radii[n - 1]);

    for (var i = 0; i < n - 2; i++)
      svg.appendChild(svgEl('circle', { r: iRadii[i], fill: 'none', stroke: '#ff6b6b', 'stroke-opacity': '0.35', 'stroke-dasharray': '3 3' }));
    svg.appendChild(svgEl('circle', { r: oR, fill: 'none', stroke: '#ff6b6b', 'stroke-opacity': '0.35', 'stroke-dasharray': '4 4' }));

    /* розетка 8-пелюстків */
    var rS = 90, rPts = [];
    for (var a = 0; a <= Math.PI * 2 + 0.03; a += 0.03) {
      var rr = rS * Math.cos(4 * a);
      rPts.push(rr * Math.cos(a) + ' ' + rr * Math.sin(a));
    }
    svg.appendChild(svgEl('path', { d: 'M ' + rPts.join(' L ') + ' Z',
      fill: 'rgba(96,165,250,0.06)', stroke: '#60a5fa', 'stroke-opacity': '0.40', 'stroke-dasharray': '2 2' }));

    _addNucleus(svg, catCol, el.n);

    /* внутрішні */
    for (var si = 0; si < n - 2; si++) {
      var cnt = shells[si], r = iRadii[si], sp = 16.25 / Math.pow(r, 1.3);
      for (var k = 0; k < cnt; k++) {
        var e = svgEl('circle', { r: '3', fill: '#fdba74' });
        svg.appendChild(e);
        mv.push({ type: 'circle', el: e, radius: r, angle: (k / cnt) * Math.PI * 2, speed: sp });
      }
    }

    /* d/f по розетці */
    var dC = shells[n - 2], dMax = 10, dH = Math.max(0, dMax - dC), dT = dC + dH;
    for (var di = 0; di < dC; di++) {
      var de = svgEl('circle', { r: '3.5', fill: '#facc15' });
      svg.appendChild(de);
      mv.push({ type: 'rose', el: de, angle: (di / dT) * Math.PI * 2, speed: 0.012, scale: rS });
    }
    for (var dh = 0; dh < dH; dh++) {
      var he = svgEl('circle', { r: '4', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
      svg.appendChild(he);
      mv.push({ type: 'rose', el: he, angle: ((dC + dh) / dT) * Math.PI * 2, speed: 0.012, scale: rS });
    }

    /* зовнішні s */
    var oC = shells[n - 1];
    for (var oi = 0; oi < oC; oi++) {
      var oe = svgEl('circle', { r: '6', fill: '#38bdf8', stroke: '#fff', 'stroke-width': '1.5' });
      svg.appendChild(oe);
      mv.push({ type: 'circle', el: oe, radius: oR, angle: (oi / Math.max(1, oC)) * Math.PI * 2, speed: 0.008 });
    }
  }

  /* ══════════════════════════════════════════════════════════
     ███  MODE 2 — FULL 2D  (s + p + d + f на кожному рівні)
     ══════════════════════════════════════════════════════════ */
  function _buildFull2D(el, svg, shells, radii, catCol, mv) {
    var config = parseEconf(el.econf);
    if (!config) { _s2d_circular(el, svg, shells, radii, catCol, mv); return; }

    var nLv = config.length;
    var base = 25, step = Math.min(28, 110 / nLv);
    var lvR = [];
    for (var li = 0; li < nLv; li++) lvR.push(base + li * step);

    /* ── контури ───────────────────────────────────────────── */
    config.forEach(function (lvl, li) {
      var r = lvR[li];
      lvl.sub.forEach(function (sub) {
        if (sub.type === 's') {
          svg.appendChild(svgEl('circle', { r: r, fill: 'none', stroke: '#ff6b6b', 'stroke-opacity': '0.35', 'stroke-dasharray': '4 3' }));
        } else if (sub.type === 'p') {
          var sc = r * 1.15;
          svg.appendChild(svgEl('path', { d: _dbPathH(sc), fill: 'rgba(74,222,128,0.04)', stroke: '#4ade80', 'stroke-opacity': '0.35', 'stroke-dasharray': '3 3' }));
          svg.appendChild(svgEl('path', { d: _dbPathV(sc), fill: 'rgba(74,222,128,0.04)', stroke: '#4ade80', 'stroke-opacity': '0.35', 'stroke-dasharray': '3 3' }));
        } else if (sub.type === 'd') {
          var sc2 = r * 1.25, off = Math.PI / 4, pts = [];
          for (var a = 0; a <= Math.PI * 2 + 0.05; a += 0.05) {
            var rr = sc2 * Math.cos(2 * a);
            pts.push(rr * Math.cos(a + off) + ' ' + rr * Math.sin(a + off));
          }
          svg.appendChild(svgEl('path', { d: 'M ' + pts.join(' L ') + ' Z',
            fill: 'rgba(251,191,36,0.04)', stroke: '#fbbf24', 'stroke-opacity': '0.35', 'stroke-dasharray': '3 3' }));
        } else if (sub.type === 'f') {
          var sc3 = r * 1.35, fPts = [];
          for (var a2 = 0; a2 <= Math.PI * 2 + 0.03; a2 += 0.03) {
            var rr2 = sc3 * Math.cos(4 * a2);
            fPts.push(rr2 * Math.cos(a2) + ' ' + rr2 * Math.sin(a2));
          }
          svg.appendChild(svgEl('path', { d: 'M ' + fPts.join(' L ') + ' Z',
            fill: 'rgba(96,165,250,0.04)', stroke: '#60a5fa', 'stroke-opacity': '0.35', 'stroke-dasharray': '2 2' }));
        }
      });
    });

    _addNucleus(svg, catCol, el.n);

    /* ── електрони ─────────────────────────────────────────── */
    config.forEach(function (lvl, li) {
      var r = lvR[li];
      lvl.sub.forEach(function (sub) {

        /* s — коло */
        if (sub.type === 's') {
          var sp = 16.25 / Math.pow(r, 1.3);
          for (var k = 0; k < sub.count; k++) {
            var e = svgEl('circle', { r: '3.5', fill: '#ff6b6b' });
            svg.appendChild(e);
            mv.push({ type: 'circle', el: e, radius: r, angle: (k / sub.count) * Math.PI * 2, speed: sp });
          }
        }

        /* p — гантелі X / Y */
        else if (sub.type === 'p') {
          var sc = r * 1.15, spd = 0.018;
          var half = Math.ceil(sub.count / 2);
          for (var k2 = 0; k2 < half; k2++) {
            var e2 = svgEl('circle', { r: '3.5', fill: '#4ade80' });
            svg.appendChild(e2);
            mv.push({ type: 'dumbbellX', el: e2, t: (k2 / half) * Math.PI * 2, speed: spd, scale: sc });
          }
          var rest = sub.count - half;
          for (var k3 = 0; k3 < rest; k3++) {
            var e3 = svgEl('circle', { r: '3.5', fill: '#4ade80' });
            svg.appendChild(e3);
            mv.push({ type: 'dumbbellY', el: e3, t: (k3 / rest) * Math.PI * 2, speed: spd, scale: sc });
          }
        }

        /* d — конюшина 45° */
        else if (sub.type === 'd') {
          var sc2 = r * 1.25, spd2 = 0.012, dMax = 10;
          var holes = dMax - sub.count, total = sub.count + holes;
          for (var k4 = 0; k4 < sub.count; k4++) {
            var e4 = svgEl('circle', { r: '3.5', fill: '#fbbf24' });
            svg.appendChild(e4);
            mv.push({ type: 'clover', el: e4, angle: (k4 / total) * Math.PI * 2, speed: spd2, scale: sc2, offset: Math.PI / 4 });
          }
          for (var h4 = 0; h4 < holes; h4++) {
            var hh = svgEl('circle', { r: '4', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
            svg.appendChild(hh);
            mv.push({ type: 'clover', el: hh, angle: ((sub.count + h4) / total) * Math.PI * 2, speed: spd2, scale: sc2, offset: Math.PI / 4 });
          }
        }

        /* f — розетка */
        else if (sub.type === 'f') {
          var sc3 = r * 1.35, spd3 = 0.009, fMax = 14;
          var fH = fMax - sub.count, fT = sub.count + fH;
          for (var k5 = 0; k5 < sub.count; k5++) {
            var e5 = svgEl('circle', { r: '3', fill: '#60a5fa' });
            svg.appendChild(e5);
            mv.push({ type: 'rose', el: e5, angle: (k5 / fT) * Math.PI * 2, speed: spd3, scale: sc3 });
          }
          for (var fh = 0; fh < fH; fh++) {
            var fhe = svgEl('circle', { r: '3.5', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
            svg.appendChild(fhe);
            mv.push({ type: 'rose', el: fhe, angle: ((sub.count + fh) / fT) * Math.PI * 2, speed: spd3, scale: sc3 });
          }
        }
      });
    });
  }

  /* ══════════════════════════════════════════════════════════
     ███  MODE 3 — SIMPLE 3D  (псевдо-3D нахилені орбіти)
     ══════════════════════════════════════════════════════════ */
  var TILT = 0.55;
  var S_ROT = -15 * Math.PI / 180;

  function _proj(x, y) {
    var xr = x * Math.cos(S_ROT) - y * Math.sin(S_ROT);
    var yr = x * Math.sin(S_ROT) + y * Math.cos(S_ROT);
    return { x: xr, y: yr * TILT };
  }

  function _buildSimple3D(el, svg, shells, radii, catCol, mv, orbType) {
    switch (orbType) {
      case 'dumbbell': _s3d_dumbbell(el, svg, shells, radii, catCol, mv); break;
      case 'clover4':  _s3d_clover4(el, svg, shells, radii, catCol, mv);  break;
      case 'rose8':    _s3d_rose8(el, svg, shells, radii, catCol, mv);    break;
      default:         _s3d_circular(el, svg, shells, radii, catCol, mv); break;
    }
  }

  /* ── 3D circular ───────────────────────────────────────── */
  function _s3d_circular(el, svg, shells, radii, catCol, mv) {
    shells.forEach(function (_, i) {
      svg.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: radii[i], ry: radii[i] * TILT,
        fill: 'none', stroke: '#ff6b6b', 'stroke-opacity': '0.30', 'stroke-dasharray': '4 3',
        transform: 'rotate(-15)' }));
    });
    _addNucleus(svg, catCol, el.n);

    var lastIdx = shells.length - 1;
    shells.forEach(function (count, i) {
      var r = radii[i], sp = 16.25 / Math.pow(r, 1.3) * 0.7;
      var isOuter = (i === lastIdx);
      var outerBig = isOuter && (el.cat === 'alkali' || el.cat === 'alkaline');
      var bR = outerBig ? 5 : 3.5;

      for (var k = 0; k < count; k++) {
        var e = outerBig
          ? svgEl('circle', { r: String(bR), fill: '#38bdf8', stroke: '#fff', 'stroke-width': '1.5' })
          : svgEl('circle', { r: String(bR), fill: '#facc15' });
        svg.appendChild(e);
        mv.push({ type: 'tilt3d_circle', el: e, radius: r, tilt: TILT, rot: S_ROT,
          angle: (k / count) * Math.PI * 2, speed: sp, baseR: bR });
      }
    });
  }

  /* ── 3D dumbbell ─────────────────────────────────────────── */
  function _s3d_dumbbell(el, svg, shells, radii, catCol, mv) {
    var oIdx = shells.length - 1;

    /* нахилені еліпси для внутрішніх */
    for (var i = 0; i < oIdx; i++) {
      svg.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: radii[i], ry: radii[i] * TILT,
        fill: 'none', stroke: '#ff6b6b', 'stroke-opacity': '0.30', 'stroke-dasharray': '4 3',
        transform: 'rotate(-15)' }));
    }

    /* нахилені контури гантелів */
    var sc = Math.min(85, radii[oIdx] * 1.15);
    var dbSteps = 60;
    var ptsH = [], ptsV = [];
    for (var st = 0; st <= dbSteps; st++) {
      var t = (st / dbSteps) * Math.PI * 2;
      var dd = 1 + Math.sin(t) * Math.sin(t);
      var hx = (sc * Math.cos(t)) / dd, hy = (sc * Math.sin(t) * Math.cos(t)) / dd;
      var vx = (sc * Math.sin(t) * Math.cos(t)) / dd, vy = (sc * Math.cos(t)) / dd;
      var pH = _proj(hx, hy), pV = _proj(vx, vy);
      ptsH.push(pH.x + ' ' + pH.y);
      ptsV.push(pV.x + ' ' + pV.y);
    }
    svg.appendChild(svgEl('path', { d: 'M ' + ptsH.join(' L ') + ' Z',
      fill: 'rgba(74,222,128,0.05)', stroke: '#4ade80', 'stroke-opacity': '0.35', 'stroke-dasharray': '3 3' }));
    svg.appendChild(svgEl('path', { d: 'M ' + ptsV.join(' L ') + ' Z',
      fill: 'rgba(74,222,128,0.05)', stroke: '#4ade80', 'stroke-opacity': '0.35', 'stroke-dasharray': '3 3' }));

    _addNucleus(svg, catCol, el.n);

    /* внутрішні електрони — tilted circles */
    for (var si = 0; si < oIdx; si++) {
      var cnt = shells[si], r = radii[si], sp = 16.25 / Math.pow(r, 1.3) * 0.7;
      for (var k = 0; k < cnt; k++) {
        var e = svgEl('circle', { r: '3.5', fill: '#38bdf8' });
        svg.appendChild(e);
        mv.push({ type: 'tilt3d_circle', el: e, radius: r, tilt: TILT, rot: S_ROT,
          angle: (k / cnt) * Math.PI * 2, speed: sp, baseR: 3.5 });
      }
    }

    /* зовнішні на нахилених гантелях */
    var oCount = shells[oIdx], holes = wantHoles(el) ? Math.max(0, 8 - oCount) : 0;
    var halfE = Math.ceil(oCount / 2), halfH = Math.ceil(holes / 2);
    _add3dDbElectrons(svg, mv, halfE, halfH, 'tilt3d_dumbbellX', sc, 0.018);
    _add3dDbElectrons(svg, mv, oCount - halfE, holes - halfH, 'tilt3d_dumbbellY', sc, 0.018);
  }

  function _add3dDbElectrons(svg, mv, eN, hN, type, scale, speed) {
    var total = eN + hN; if (!total) return;
    for (var i = 0; i < eN; i++) {
      var e = svgEl('circle', { r: '3.5', fill: '#4ade80' });
      svg.appendChild(e);
      mv.push({ type: type, el: e, t: (i / total) * Math.PI * 2, speed: speed,
        scale: scale, tilt: TILT, rot: S_ROT, baseR: 3.5 });
    }
    for (var j = 0; j < hN; j++) {
      var h = svgEl('circle', { r: '4', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
      svg.appendChild(h);
      mv.push({ type: type, el: h, t: ((eN + j) / total) * Math.PI * 2, speed: speed,
        scale: scale, tilt: TILT, rot: S_ROT, baseR: 4 });
    }
  }

  /* ── 3D clover4 ─────────────────────────────────────────── */
  function _s3d_clover4(el, svg, shells, radii, catCol, mv) {
    var n = shells.length;
    if (n < 3) { _s3d_circular(el, svg, shells, radii, catCol, mv); return; }

    /* нахилені еліпси */
    radii.forEach(function (r) {
      svg.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: r, ry: r * TILT,
        fill: 'none', stroke: '#ff6b6b', 'stroke-opacity': '0.30', 'stroke-dasharray': '4 3',
        transform: 'rotate(-15)' }));
    });

    /* нахилена конюшина */
    var cS = Math.min(95, radii[n - 1] * 0.9), pts = [];
    for (var a = 0; a <= Math.PI * 2 + 0.05; a += 0.05) {
      var rr = cS * Math.cos(2 * a);
      var p = _proj(rr * Math.cos(a), rr * Math.sin(a));
      pts.push(p.x + ' ' + p.y);
    }
    svg.appendChild(svgEl('path', { d: 'M ' + pts.join(' L ') + ' Z',
      fill: 'rgba(251,191,36,0.05)', stroke: '#fbbf24', 'stroke-opacity': '0.35', 'stroke-dasharray': '3 3' }));

    _addNucleus(svg, catCol, el.n);

    /* внутрішні */
    for (var i = 0; i < n - 2; i++) {
      var cnt = shells[i], r = radii[i], sp = 16.25 / Math.pow(r, 1.3) * 0.7;
      for (var k = 0; k < cnt; k++) {
        var e = svgEl('circle', { r: '3.5', fill: '#38bdf8' });
        svg.appendChild(e);
        mv.push({ type: 'tilt3d_circle', el: e, radius: r, tilt: TILT, rot: S_ROT,
          angle: (k / cnt) * Math.PI * 2, speed: sp, baseR: 3.5 });
      }
    }

    /* d-електрони на нахиленій конюшині */
    var dC = shells[n - 2], dMax = 18, dH = Math.max(0, dMax - dC), dT = dC + dH;
    for (var di = 0; di < dC; di++) {
      var de = svgEl('circle', { r: '4', fill: '#facc15' });
      svg.appendChild(de);
      mv.push({ type: 'tilt3d_clover', el: de, scale: cS, tilt: TILT, rot: S_ROT,
        angle: (di / dT) * Math.PI * 2, speed: 0.012, baseR: 4 });
    }
    for (var dh = 0; dh < dH; dh++) {
      var he = svgEl('circle', { r: '4.5', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
      svg.appendChild(he);
      mv.push({ type: 'tilt3d_clover', el: he, scale: cS, tilt: TILT, rot: S_ROT,
        angle: ((dC + dh) / dT) * Math.PI * 2, speed: 0.012, baseR: 4.5 });
    }

    /* зовнішні s */
    var oC = shells[n - 1], oR = radii[n - 1];
    for (var oi = 0; oi < oC; oi++) {
      var oe = svgEl('circle', { r: '5', fill: '#38bdf8', stroke: '#fff', 'stroke-width': '1.5' });
      svg.appendChild(oe);
      mv.push({ type: 'tilt3d_circle', el: oe, radius: oR, tilt: TILT, rot: S_ROT,
        angle: (oi / oC) * Math.PI * 2, speed: 0.008, baseR: 5 });
    }
  }

  /* ── 3D rose8 ───────────────────────────────────────────── */
  function _s3d_rose8(el, svg, shells, radii, catCol, mv) {
    var n = shells.length;
    if (n < 3) { _s3d_circular(el, svg, shells, radii, catCol, mv); return; }

    var iRadii = radii.slice(0, n - 2);
    var oR = Math.min(118, radii[n - 1]);

    /* нахилені еліпси */
    iRadii.forEach(function (r) {
      svg.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: r, ry: r * TILT,
        fill: 'none', stroke: '#ff6b6b', 'stroke-opacity': '0.30', 'stroke-dasharray': '3 3',
        transform: 'rotate(-15)' }));
    });
    svg.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: oR, ry: oR * TILT,
      fill: 'none', stroke: '#ff6b6b', 'stroke-opacity': '0.30', 'stroke-dasharray': '4 4',
      transform: 'rotate(-15)' }));

    /* нахилена розетка */
    var rS = 90, rPts = [];
    for (var a = 0; a <= Math.PI * 2 + 0.03; a += 0.03) {
      var rr = rS * Math.cos(4 * a);
      var p = _proj(rr * Math.cos(a), rr * Math.sin(a));
      rPts.push(p.x + ' ' + p.y);
    }
    svg.appendChild(svgEl('path', { d: 'M ' + rPts.join(' L ') + ' Z',
      fill: 'rgba(96,165,250,0.05)', stroke: '#60a5fa', 'stroke-opacity': '0.35', 'stroke-dasharray': '2 2' }));

    _addNucleus(svg, catCol, el.n);

    /* внутрішні */
    for (var si = 0; si < n - 2; si++) {
      var cnt = shells[si], r = iRadii[si], sp = 16.25 / Math.pow(r, 1.3) * 0.7;
      for (var k = 0; k < cnt; k++) {
        var e = svgEl('circle', { r: '3', fill: '#fdba74' });
        svg.appendChild(e);
        mv.push({ type: 'tilt3d_circle', el: e, radius: r, tilt: TILT, rot: S_ROT,
          angle: (k / cnt) * Math.PI * 2, speed: sp, baseR: 3 });
      }
    }

    /* d/f по розетці */
    var dC = shells[n - 2], dMax = 10, dH = Math.max(0, dMax - dC), dT = dC + dH;
    for (var di = 0; di < dC; di++) {
      var de = svgEl('circle', { r: '3.5', fill: '#facc15' });
      svg.appendChild(de);
      mv.push({ type: 'tilt3d_rose', el: de, scale: rS, tilt: TILT, rot: S_ROT,
        angle: (di / dT) * Math.PI * 2, speed: 0.012, baseR: 3.5 });
    }
    for (var dh = 0; dh < dH; dh++) {
      var he = svgEl('circle', { r: '4', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
      svg.appendChild(he);
      mv.push({ type: 'tilt3d_rose', el: he, scale: rS, tilt: TILT, rot: S_ROT,
        angle: ((dC + dh) / dT) * Math.PI * 2, speed: 0.012, baseR: 4 });
    }

    /* зовнішні s */
    var oC = shells[n - 1];
    for (var oi = 0; oi < oC; oi++) {
      var oe = svgEl('circle', { r: '5', fill: '#38bdf8', stroke: '#fff', 'stroke-width': '1.5' });
      svg.appendChild(oe);
      mv.push({ type: 'tilt3d_circle', el: oe, radius: oR, tilt: TILT, rot: S_ROT,
        angle: (oi / Math.max(1, oC)) * Math.PI * 2, speed: 0.008, baseR: 5 });
    }
  }

  /* ══════════════════════════════════════════════════════════
     Управління
     ══════════════════════════════════════════════════════════ */
  function stop()    { if (_animId) { cancelAnimationFrame(_animId); _animId = null; } _paused = false; }
  function pause()   { if (_animId && !_paused) { cancelAnimationFrame(_animId); _animId = null; _paused = true; } }
  function resume()  { if (_paused && _tickFn) { _paused = false; _animId = requestAnimationFrame(_tickFn); } }
  function isPaused() { return _paused; }

  /* ── Експорт ─────────────────────────────────────────────── */
  window.getOrbitalType        = getOrbitalType;
  window.renderAtomAnimation   = renderAtomAnimation;
  window.stopAtomAnimation     = stop;
  window.pauseAtomAnimation    = pause;
  window.resumeAtomAnimation   = resume;
  window.isAnimationPaused     = isPaused;

})();
