/* ============================================================
   data/atom-animation.js  —  Анімаційний рушій атомних орбіталей
   Хімарій · Задача B
   Залежність: CC (global, з elements.js)
   Експортує: window.getOrbitalType, window.renderAtomAnimation, window.stopAtomAnimation
   ============================================================ */

(function () {
  'use strict';

  /* ── внутрішній стан ─────────────────────────────────── */
  var _animId = null;

  /* ── SVG helper ──────────────────────────────────────── */
  var NS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  /* ============================================================
     getOrbitalType(e)
     Визначає тип за econf (остання зайнята підоболонка):
       s → circular, p → dumbbell/clover4, d/f → rose8
     Повертає: 'circular' | 'dumbbell' | 'clover4' | 'rose8'
     ============================================================ */
  function getOrbitalType(e) {
    /* noble завжди circular */
    if (e.cat === 'noble') return 'circular';

    if (e.econf) {
      var tokens = e.econf.split(/(?=[1-7][spdf])/).filter(function(t) {
        return /^[1-7][spdf]\d+$/.test(t);
      });
      if (tokens.length) {
        var last = tokens[tokens.length - 1];
        var orb = last[1];
        var shell = parseInt(last[0]);

        if (orb === 's') return 'circular';
        if (orb === 'f') return 'rose8';
        if (orb === 'd') {
          /* лантаноїди/актиноїди з d¹ на кінці — f-характер домінує */
          if (e.cat === 'lanthanide' || e.cat === 'actinide') return 'rose8';
          return 'clover4';
        }
        if (orb === 'p') {
          var hasD = tokens.some(function(t){ return t[1]==='d'; });
          if (hasD) return 'clover4';
          return 'dumbbell';
        }
      }
    }

    /* Фолбек */
    if (e.p === 1) return 'circular';
    if (e.p === 2) return (e.g <= 2) ? 'circular' : 'dumbbell';
    if (e.g <= 2) return 'circular';
    if (e.cat === 'lanthanide' || e.cat === 'actinide') return 'rose8';
    if (e.cat === 'transition') return 'clover4';
    return 'dumbbell';
  }

  /* ============================================================
     parseShells(levelsStr, n)
     ============================================================ */
  function parseShells(levelsStr, n) {
    if (!levelsStr || levelsStr === '—' || levelsStr.trim() === '') {
      return [n];
    }
    var arr = levelsStr.split(',').map(function (x) { return parseInt(x.trim(), 10); }).filter(function (x) { return !isNaN(x); });
    return arr.length ? arr : [n];
  }

  /* ============================================================
     calcRadii(shells, element)
     viewBox -130 -130 260 260  → максимальний корисний радіус ~120
     Для alkali/alkaline зовнішній шар відсувається далі (2.2× крок)
     ============================================================ */
  function calcRadii(shells, element) {
    var base = 25;
    var n = shells.length;
    var step = Math.min(28, 110 / n);
    var isMetal = element && (element.cat === 'alkali' || element.cat === 'alkaline');
    return shells.map(function (_, i) {
      if (isMetal && i === n - 1 && n > 1) {
        return Math.min(115, base + (n - 2) * step + step * 2.2);
      }
      return base + i * step;
    });
  }

  /* ============================================================
     getMaxCapacity(e)
     ============================================================ */
  function getMaxCapacity(e) {
    if (e.g <= 2) return 2;
    if (e.g >= 13) return 8;
    if (e.cat === 'transition') return 18;
    return 8;
  }

  /* ============================================================
     Чи малювати дірки для цього елемента?
     ============================================================ */
  function hasHoles(e) {
    return e.cat === 'nonmetal' || e.cat === 'halogen' || e.cat === 'metalloid';
  }

  /* ============================================================
     renderAtomAnimation(element, svgEl)
     ============================================================ */
  function renderAtomAnimation(element, svgElem) {
    /* 1. Зупинити попередню анімацію */
    if (_animId) {
      cancelAnimationFrame(_animId);
      _animId = null;
    }

    /* 2. Очистити SVG */
    svgElem.innerHTML = '';

    /* 3. Визначити тип */
    var orbType = getOrbitalType(element);

    /* 4. Парсити шари */
    var shells = parseShells(element.levels, element.n);

    /* 5. Радіуси */
    var radii = calcRadii(shells, element);

    /* 6. Колір категорії */
    var catColor = (typeof CC !== 'undefined' && CC[element.cat]) ? CC[element.cat] : '#78909C';

    /* 7. Швидкість на основі фізичного радіуса атома (пм)
          Формула Бора: v ∝ 1/√r  →  speed_param = k / √radius_pm
          k підібрано так щоб px/frame ~28 для малих атомів і ~12 для великих */
    var _r = element.radius || 100;
    var _sqr = Math.sqrt(_r);
    var speedDumbbell = 0.303 / _sqr;   /* dumbbell p-електрони  (було 2.425/2) */
    var speedClover   = 0.164 / _sqr;   /* clover4 d-орбіталі    (було 1.313/2) */
    var speedRose     = 0.125 / _sqr;   /* rose8 d-розетка       (було 0.999/2) */
    var speedRoseOuter= 0.0625 / _sqr;   /* rose8 зовнішній s     (було 0.500/2) */

    /* 8. Рухомі об'єкти */
    var movingObjects = [];

    /* ─────────────────────────────────────────────────────
       Розгалуження за типом
       ───────────────────────────────────────────────────── */

    if (orbType === 'circular') {
      _buildCircular(element, svgElem, shells, radii, catColor, movingObjects);
    } else if (orbType === 'dumbbell') {
      _buildDumbbell(element, svgElem, shells, radii, catColor, movingObjects, speedDumbbell);
    } else if (orbType === 'clover4') {
      _buildClover4(element, svgElem, shells, radii, catColor, movingObjects, speedClover);
    } else if (orbType === 'rose8') {
      _buildRose8(element, svgElem, shells, radii, catColor, movingObjects, speedRose, speedRoseOuter);
    }

    /* 10. Цикл анімації */
    function tick() {
      movingObjects.forEach(function (obj) {
        switch (obj.type) {
          case 'circle':
            obj.angle += obj.speed;
            obj.el.setAttribute('cx', obj.radius * Math.cos(obj.angle));
            obj.el.setAttribute('cy', obj.radius * Math.sin(obj.angle));
            break;
          case 'dumbbellX': {
            obj.t += obj.speed;
            var d = 1 + Math.sin(obj.t) * Math.sin(obj.t);
            obj.el.setAttribute('cx', (obj.scale * Math.cos(obj.t)) / d);
            obj.el.setAttribute('cy', (obj.scale * Math.sin(obj.t) * Math.cos(obj.t)) / d);
            break;
          }
          case 'dumbbellY': {
            obj.t += obj.speed;
            var d2 = 1 + Math.sin(obj.t) * Math.sin(obj.t);
            obj.el.setAttribute('cx', (obj.scale * Math.sin(obj.t) * Math.cos(obj.t)) / d2);
            obj.el.setAttribute('cy', (obj.scale * Math.cos(obj.t)) / d2);
            break;
          }
          case 'clover': {
            obj.angle += obj.speed;
            var rr = obj.scale * Math.cos(2 * obj.angle);
            obj.el.setAttribute('cx', rr * Math.cos(obj.angle));
            obj.el.setAttribute('cy', rr * Math.sin(obj.angle));
            break;
          }
          case 'rose': {
            obj.angle += obj.speed;
            var rr2 = obj.scale * Math.cos(4 * obj.angle);
            obj.el.setAttribute('cx', rr2 * Math.cos(obj.angle));
            obj.el.setAttribute('cy', rr2 * Math.sin(obj.angle));
            break;
          }
        }
      });
      _animId = requestAnimationFrame(tick);
    }
    _paused = false;
    _tickFn = tick;
    tick();
  }

  /* ============================================================
     A) circular
     ============================================================ */
  function _buildCircular(element, svg, shells, radii, catColor, movingObjects) {
    var lastIdx = shells.length - 1;

    /* Контури орбіт — s-орбіталі: червоний */
    shells.forEach(function (_, i) {
      svg.appendChild(svgEl('circle', {
        r: radii[i], fill: 'none',
        stroke: '#ef4444', 'stroke-opacity': '0.22', 'stroke-dasharray': '4 3'
      }));
    });

    /* Ядро */
    _addNucleus(svg, catColor, element.n);

    /* Електрони + дірки */
    shells.forEach(function (count, shellIdx) {
      var radius = radii[shellIdx];
      var isOuter = shellIdx === shells.length - 1;
      var speed = 16.25 / Math.pow(radius, 1.3);

      var holeCount = 0;
      if (isOuter && hasHoles(element)) {
        var maxCap = getMaxCapacity(element);
        holeCount = Math.max(0, maxCap - count);
      }

      var totalSlots = count + holeCount;

      /* Визначити, чи виділяти зовнішній електрон як "активний" */
      var outerActive = isOuter && !hasHoles(element) && (element.cat === 'alkali' || element.cat === 'alkaline');
      var lonely = isOuter && count === 1 && !hasHoles(element);

      for (var i = 0; i < count; i++) {
        var eEl;
        if (outerActive) {
          eEl = svgEl('circle', { r: '6', fill: '#38bdf8', stroke: '#fff', 'stroke-width': '1.5' });
        } else {
          eEl = svgEl('circle', { r: '4', fill: '#facc15' });
        }
        svg.appendChild(eEl);
        movingObjects.push({
          type: 'circle', el: eEl, radius: radius,
          angle: (i / totalSlots) * Math.PI * 2, speed: speed
        });
      }

      for (var j = 0; j < holeCount; j++) {
        var hEl = svgEl('circle', { r: '5', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
        svg.appendChild(hEl);
        movingObjects.push({
          type: 'circle', el: hEl, radius: radius,
          angle: ((count + j) / totalSlots) * Math.PI * 2, speed: speed
        });
      }
    });
  }

  /* ============================================================
     B) dumbbell (2-й період p-блок, напр. O, F вже → F circular)
     ============================================================ */
  function _buildDumbbell(element, svg, shells, radii, catColor, movingObjects, speedParam) {
    /* Внутрішні шари — кругові */
    var outerIdx = shells.length - 1;

    for (var i = 0; i < outerIdx; i++) {
      svg.appendChild(svgEl('circle', {
        r: radii[i], fill: 'none',
        stroke: '#ef4444', 'stroke-opacity': '0.22', 'stroke-dasharray': '4 3'
      }));
    }

    /* Гантелі — p-орбіталі: зелений */
    var pHX = svgEl('path', {
      d: 'M 0 0 C 40 40,80 20,80 0 C 80 -20,40 -40,0 0 C -40 40,-80 20,-80 0 C -80 -20,-40 -40,0 0 Z',
      fill: 'rgba(34,197,94,0.06)', stroke: '#22c55e', 'stroke-opacity': '0.35', 'stroke-dasharray': '3 3'
    });
    svg.appendChild(pHX);

    var pHY = svgEl('path', {
      d: 'M 0 0 C 40 40,20 80,0 80 C -20 80,-40 40,0 0 C 40 -40,20 -80,0 -80 C -20 -80,-40 -40,0 0 Z',
      fill: 'rgba(34,197,94,0.06)',
      stroke: '#22c55e', 'stroke-opacity': '0.35', 'stroke-dasharray': '3 3'
    });
    svg.appendChild(pHY);

    /* Ядро */
    _addNucleus(svg, catColor, element.n);

    /* Внутрішні електрони (кругові) */
    for (var si = 0; si < outerIdx; si++) {
      var cnt = shells[si];
      var r = radii[si];
      var sp = 16.25 / Math.pow(r, 1.3);
      for (var k = 0; k < cnt; k++) {
        var eEl = svgEl('circle', { r: '4', fill: '#facc15' });
        svg.appendChild(eEl);
        movingObjects.push({
          type: 'circle', el: eEl, radius: r,
          angle: (k / cnt) * Math.PI * 2, speed: sp
        });
      }
    }

    /* Розподіл зовнішніх електронів між двома гантелями */
    var outerCount = shells[outerIdx];
    var holeCount = 0;
    if (hasHoles(element)) {
      holeCount = Math.max(0, 8 - outerCount);
    }

    var halfE = Math.ceil(outerCount / 2);
    var halfH = Math.ceil(holeCount / 2);

    _addDumbbellItems(svg, movingObjects, halfE, holeCount - Math.floor(holeCount / 2), 'dumbbellX', 85, speedParam);
    _addDumbbellItems(svg, movingObjects, outerCount - halfE, Math.floor(holeCount / 2), 'dumbbellY', 85, speedParam);
  }

  function _addDumbbellItems(svg, movingObjects, eCount, hCount, type, scale, speedParam) {
    var total = eCount + hCount;
    for (var i = 0; i < eCount; i++) {
      var eEl = svgEl('circle', { r: '4.5', fill: '#facc15' });
      svg.appendChild(eEl);
      movingObjects.push({ type: type, el: eEl, t: (i / total) * Math.PI * 2, speed: speedParam, scale: scale });
    }
    for (var j = 0; j < hCount; j++) {
      var hEl = svgEl('circle', { r: '5', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
      svg.appendChild(hEl);
      movingObjects.push({ type: type, el: hEl, t: ((eCount + j) / total) * Math.PI * 2, speed: speedParam, scale: scale });
    }
  }

  /* ============================================================
     C) clover4 (3-й та старші p-блок)
     ============================================================ */
  function _buildClover4(element, svg, shells, radii, catColor, movingObjects, speedParam) {
    var outerIdx = shells.length - 1;

    /* Внутрішні кола — s-орбіталі: червоний */
    for (var i = 0; i < outerIdx; i++) {
      svg.appendChild(svgEl('circle', {
        r: radii[i], fill: 'none',
        stroke: '#ef4444', 'stroke-opacity': '0.22', 'stroke-dasharray': '3 3'
      }));
    }

    /* 4-пелюстковий контур — d-орбіталь: жовтий */
    var scale = 100;
    var pts = [];
    for (var a = 0; a <= Math.PI * 2 + 0.05; a += 0.05) {
      var rr = scale * Math.cos(2 * a);
      pts.push(rr * Math.cos(a) + ' ' + (rr * Math.sin(a)));
    }
    var cloverD = 'M ' + pts.join(' L ') + ' Z';
    svg.appendChild(svgEl('path', {
      d: cloverD,
      fill: 'rgba(234,179,8,0.06)',
      stroke: '#eab308', 'stroke-opacity': '0.35', 'stroke-dasharray': '3 3'
    }));

    /* Ядро */
    _addNucleus(svg, catColor, element.n);

    /* Внутрішні електрони */
    for (var si = 0; si < outerIdx; si++) {
      var cnt = shells[si];
      var r = radii[si];
      var sp = 16.25 / Math.pow(r, 1.3);
      for (var k = 0; k < cnt; k++) {
        var eEl = svgEl('circle', { r: '3.5', fill: '#38bdf8' });
        svg.appendChild(eEl);
        movingObjects.push({
          type: 'circle', el: eEl, radius: r,
          angle: (k / cnt) * Math.PI * 2, speed: sp
        });
      }
    }

    /* Зовнішні по розетці */
    var outerCount = shells[outerIdx];
    var holeCount = hasHoles(element) ? Math.max(0, getMaxCapacity(element) - outerCount) : 0;
    var total = outerCount + holeCount;

    for (var ei = 0; ei < outerCount; ei++) {
      var eOuter = svgEl('circle', { r: '4.5', fill: '#facc15' });
      svg.appendChild(eOuter);
      movingObjects.push({ type: 'clover', el: eOuter, angle: (ei / total) * Math.PI * 2, speed: speedParam, scale: scale });
    }
    for (var hi = 0; hi < holeCount; hi++) {
      var hOuter = svgEl('circle', { r: '5', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
      svg.appendChild(hOuter);
      movingObjects.push({ type: 'clover', el: hOuter, angle: ((outerCount + hi) / total) * Math.PI * 2, speed: speedParam, scale: scale });
    }
  }

  /* ============================================================
     D) rose8 (перехідні метали, лантаноїди, актиноїди)
     ============================================================ */
  function _buildRose8(element, svg, shells, radii, catColor, movingObjects, speedParam, speedOuterParam) {
    /*
      Структура: [1s][2s2p][3s3p][3d¹⁰][4s¹]
      Відображаємо:
        - shells[0..n-3] — кругові (innerShells)
        - shells[n-2] — d-рівень (rose8 розетка)
        - shells[n-1] — зовнішній s-електрон (велика кругова орбіта)
      Якщо шарів < 3 — відображаємо всі як кругові.
    */
    var n = shells.length;

    if (n < 3) {
      /* Fallback до circular */
      _buildCircular(element, svg, shells, radii, catColor, movingObjects);
      return;
    }

    var innerShells = shells.slice(0, n - 2);
    var dCount = shells[n - 2];
    var outerCount = shells[n - 1];

    var innerRadii = radii.slice(0, n - 2);

    /* Внутрішні кола (пунктир) — s-орбіталі: червоний */
    innerShells.forEach(function (_, i) {
      svg.appendChild(svgEl('circle', {
        r: innerRadii[i], fill: 'none',
        stroke: '#ef4444', 'stroke-opacity': '0.2', 'stroke-dasharray': '3 3'
      }));
    });

    /* Зовнішня кругова орбіта для s-електрона — червоний */
    var outerRadius = 115;
    svg.appendChild(svgEl('circle', {
      r: outerRadius, fill: 'none',
      stroke: '#ef4444', 'stroke-opacity': '0.22', 'stroke-dasharray': '4 4'
    }));

    /* 8-пелюсткова розетка — f-орбіталь: синій */
    var roseScale = 90;
    var roseD = [];
    for (var a = 0; a <= Math.PI * 2 + 0.03; a += 0.03) {
      var rr = roseScale * Math.cos(4 * a);
      roseD.push(rr * Math.cos(a) + ' ' + (rr * Math.sin(a)));
    }
    svg.appendChild(svgEl('path', {
      d: 'M ' + roseD.join(' L ') + ' Z',
      fill: 'rgba(59,130,246,0.05)',
      stroke: '#3b82f6', 'stroke-opacity': '0.35', 'stroke-dasharray': '2 2'
    }));

    /* Ядро */
    _addNucleus(svg, catColor, element.n);

    /* Внутрішні кругові електрони */
    innerShells.forEach(function (cnt, si) {
      var r = innerRadii[si];
      var sp = 16.25 / Math.pow(r, 1.3);
      for (var k = 0; k < cnt; k++) {
        var eEl = svgEl('circle', { r: '3', fill: '#fdba74' });
        svg.appendChild(eEl);
        movingObjects.push({
          type: 'circle', el: eEl, radius: r,
          angle: (k / cnt) * Math.PI * 2, speed: sp
        });
      }
    });

    /* d-електрони по розетці */
    var dMax = 10;
    var dHoles = Math.max(0, dMax - dCount);
    var dTotal = dCount + dHoles;

    for (var di = 0; di < dCount; di++) {
      var dEl = svgEl('circle', { r: '3.5', fill: '#facc15' });
      svg.appendChild(dEl);
      movingObjects.push({ type: 'rose', el: dEl, angle: (di / dTotal) * Math.PI * 2, speed: speedParam, scale: roseScale });
    }
    for (var dh = 0; dh < dHoles; dh++) {
      var dhEl = svgEl('circle', { r: '4', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', 'stroke-dasharray': '2 2' });
      svg.appendChild(dhEl);
      movingObjects.push({ type: 'rose', el: dhEl, angle: ((dCount + dh) / dTotal) * Math.PI * 2, speed: speedParam, scale: roseScale });
    }

    /* Зовнішній s-електрон */
    if (outerCount > 0) {
      var outerEl = svgEl('circle', { r: '6', fill: '#38bdf8', stroke: '#fff', 'stroke-width': '1.5' });
      svg.appendChild(outerEl);
      movingObjects.push({ type: 'circle', el: outerEl, radius: outerRadius, angle: 0, speed: speedOuterParam });
    }
  }

  /* ============================================================
     Допоміжні функції малювання
     ============================================================ */
  function _addNucleus(svg, catColor, atomicNum) {
    var g = document.createElementNS(NS, 'g');
    var core = svgEl('circle', { r: '16', fill: catColor });
    var label = svgEl('text', {
      'text-anchor': 'middle', dy: '5',
      fill: '#0a0b15', 'font-weight': 'bold', 'font-size': '12'
    });
    label.textContent = atomicNum + '+';
    g.appendChild(core);
    g.appendChild(label);
    svg.appendChild(g);
  }

  function _hexAlpha(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /* ============================================================
     stopAtomAnimation()
     ============================================================ */
  function stopAtomAnimation() {
    if (_animId) {
      cancelAnimationFrame(_animId);
      _animId = null;
    }
    _paused = false;
  }

  var _paused = false;
  var _tickFn = null;

  function pauseAtomAnimation() {
    if (_animId && !_paused) {
      cancelAnimationFrame(_animId);
      _animId = null;
      _paused = true;
    }
  }

  function resumeAtomAnimation() {
    if (_paused && _tickFn) {
      _paused = false;
      _animId = requestAnimationFrame(_tickFn);
    }
  }

  function isAnimationPaused() {
    return _paused;
  }

  /* ── Експорт ─────────────────────────────────────────── */
  window.getOrbitalType = getOrbitalType;
  window.renderAtomAnimation = renderAtomAnimation;
  window.stopAtomAnimation = stopAtomAnimation;
  window.pauseAtomAnimation = pauseAtomAnimation;
  window.resumeAtomAnimation = resumeAtomAnimation;
  window.isAnimationPaused = isAnimationPaused;

})();
