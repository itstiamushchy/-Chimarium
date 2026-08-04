// ============ Т-50: СПЕКТРОСКОПІЧНІ КОНСТАНТИ АТОМІВ ============
// Джерела: NIST Atomic Spectra Database (physics.nist.gov/asd);
//          Herzberg «Atomic Spectra and Atomic Structure» (1944);
//          CRC Handbook of Chemistry and Physics 104th ed.;
//          Kramida et al. NIST ASD Team (2023)

const TABLE_ATOMIC_SPECTRA = {
  id: 'atomic_spectra',
  title: 'Спектроскопічні константи атомів',
  topic: '1-1-atom',
  data: [
    {
      element: 'H',
      name: 'Гідроген',
      z: 1,
      series: [
        {
          name: 'Лайман (UV)',
          formula: 'n=2,3,4,…→1',
          range: 'УФ',
          lines: [121.6, 102.6, 97.2, 95.0],
          unit: 'нм',
          limit: 91.2,
          note: 'Серія 1913; повністю у вакуумному УФ'
        },
        {
          name: 'Бальмер (VIS/UV)',
          formula: 'n=3,4,5,…→2',
          range: 'VIS/УФ',
          lines: [656.3, 486.1, 434.0, 410.2],
          unit: 'нм',
          limit: 364.6,
          note: 'Hα(червона), Hβ(блакитна), Hγ, Hδ — видимі'
        },
        {
          name: 'Пашен (IR)',
          formula: 'n=4,5,6,…→3',
          range: 'ІЧ',
          lines: [1875.1, 1281.8, 1093.5, 1004.9],
          unit: 'нм',
          limit: 820.4,
          note: 'Ближній ІЧ діапазон'
        },
      ]
    },
    {
      element: 'He',
      name: 'Гелій',
      z: 2,
      series: [
        {
          name: 'Гелій I (нейтр.)',
          formula: 'n→2 (сингл.)',
          range: 'VIS/УФ',
          lines: [587.6, 667.8, 501.6, 471.3, 447.1, 438.8],
          unit: 'нм',
          limit: null,
          note: '587.6 нм — D₃-лінія (жовта, ідентифік. He у 1868)'
        },
      ]
    },
    {
      element: 'Na',
      name: 'Натрій',
      z: 11,
      series: [
        {
          name: 'Дублет D (VIS)',
          formula: '3p→3s (дублет)',
          range: 'VIS',
          lines: [589.0, 589.6],
          unit: 'нм',
          limit: null,
          note: 'D₁=589.6, D₂=589.0 нм; жовте натрієве світло; спін-орбітальне розщеплення'
        },
        {
          name: 'Основна серія',
          formula: 'np→3s',
          range: 'VIS/УФ',
          lines: [589.3, 330.2, 285.3, 268.0],
          unit: 'нм',
          limit: 241.2,
          note: 'Найяскравіша — жовтий дублет 589 нм'
        },
      ]
    },
    {
      element: 'Hg',
      name: 'Меркурій',
      z: 80,
      series: [
        {
          name: 'Дугові лінії (VIS)',
          formula: 'різні переходи',
          range: 'VIS/УФ',
          lines: [404.7, 435.8, 546.1, 577.0, 579.1],
          unit: 'нм',
          limit: null,
          note: '404.7 (фіолет.), 435.8 (синій), 546.1 (зелений), 577/579 (жовтий дублет)'
        },
        {
          name: 'УФ лінії Hg',
          formula: 'переходи до 6s',
          range: 'УФ',
          lines: [253.7, 296.7, 302.2, 312.6, 365.0],
          unit: 'нм',
          limit: null,
          note: '253.7 нм — найсильніша УФ-лінія; бактерицидні лампи'
        },
      ]
    },
    {
      element: 'Fe',
      name: 'Ферум',
      z: 26,
      series: [
        {
          name: 'Аналітичні лінії (AAS)',
          formula: 'переходи 4s–4p',
          range: 'VIS/УФ',
          lines: [248.3, 252.7, 302.1, 371.9, 373.5, 386.0],
          unit: 'нм',
          limit: null,
          note: '248.3 нм — основна аналітична лінія в атомно-абсорбційній спектроскопії'
        },
      ]
    },
    {
      element: 'Ca',
      name: 'Кальцій',
      z: 20,
      series: [
        {
          name: 'Нейтральний Ca I',
          formula: '4s4p→4s² (тр.)',
          range: 'VIS/УФ',
          lines: [422.7, 442.5, 443.5, 526.2, 612.2, 616.2, 643.9],
          unit: 'нм',
          limit: null,
          note: '422.7 нм — найсильніша лінія Ca; полум\'яна фотометрія'
        },
        {
          name: 'Іон Ca II (H & K)',
          formula: '4p→4s (іон)',
          range: 'УФ',
          lines: [393.4, 396.8],
          unit: 'нм',
          limit: null,
          note: 'K=393.4, H=396.8 нм; домінують у спектрі Сонця'
        },
      ]
    },
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const rangeColors = {
      'УФ':     '#CE93D8',
      'VIS/УФ': '#80CBC4',
      'VIS':    '#69F0AE',
      'VIS/ІЧ': '#FFB300',
      'ІЧ':     '#FF7043',
    };
    let rows = '';
    this.data.forEach(elem => {
      elem.series.forEach((ser, si) => {
        const col = rangeColors[ser.range] || '#7080b8';
        const linesStr = ser.lines.map(l=>`<span style="font-family:'Oxanium',monospace;color:#FFB300">${l}</span>`).join(' · ');
        const limitStr = ser.limit ? `<br><span style="font-size:10px;color:#7080b8">межа серії: ${ser.limit} нм</span>` : '';
        rows += `
          <tr style="border-bottom:0.5px solid #1e2240;background:${(rows.split('<tr').length)%2===0?'#0f1632':'#0b1028'}">
            ${si===0?`<td rowspan="${elem.series.length}" style="padding:8px 12px;vertical-align:top;border-right:0.5px solid #1e2240">
              <span style="font-family:'Oxanium',monospace;font-size:18px;font-weight:700;color:#4FC3F7">${elem.element}</span><br>
              <span style="font-size:11px;color:#7080b8">${elem.name}<br>Z=${elem.z}</span>
            </td>`:''}
            <td style="padding:8px 10px;color:#ffffff;font-weight:500">${ser.name}</td>
            <td style="padding:8px 10px;color:#7080b8;font-size:11px;font-family:'Oxanium',monospace">${ser.formula}</td>
            <td style="padding:8px 10px"><span style="color:${col};font-size:11px">${ser.range}</span></td>
            <td style="padding:8px 10px;line-height:1.8">${linesStr}${limitStr}</td>
            <td style="padding:8px 10px;color:#7080b8;font-size:11px">${ser.note}</td>
          </tr>`;
      });
    });
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🌈 Спектроскопічні константи атомів</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:10px">Джерело: NIST Atomic Spectra Database (2023) · Herzberg «Atomic Spectra» · CRC Handbook 104th ed.</div>
      <div style="background:#0a1020;border:0.5px solid #1e3060;border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#b0c0e0;line-height:1.7">
        <b style="color:#4FC3F7">Формула Рідберга:</b> <span style="font-family:'Oxanium',monospace;color:#FFB300">1/λ = R∞·(1/n₁² − 1/n₂²)</span>, де R∞ = 1.0974×10⁷ м⁻¹. Для серій H: n₁=1(Лайман), 2(Бальмер), 3(Пашен).
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Елемент</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Серія</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Перехід</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Діапазон</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Лінії (нм)</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Примітка</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      </div>`;
  }
};
