// ============ Т-42: КОЕФІЦІЄНТИ МАСОПЕРЕДАЧІ (технологічні) ============
// Джерела: Perry's Chemical Engineers' Handbook, 9th ed., 2019.
// Treybal R.E. — Mass Transfer Operations, 3rd ed., 1981.
// Левич В.Г. — Фізико-хімічна гідродинаміка, 1959.
// Касаткін А.Г. — Основні процеси та апарати хімічної технології, 1973.

const TABLE_MASS_TRANSFER = {
  id: 'mass_transfer',
  title: 'Коефіцієнти масопередачі',
  topic: '3-2-kinetics',
  data: [
    {
      system: 'Газ–рідина',
      K: '0.01–0.1',
      unit: 'м/с',
      application: 'Абсорбція (H₂S, CO₂ у воді, розчинниках)',
      note: 'Контроль газовою фазою; насадкові та барботажні колони'
    },
    {
      system: 'Рідина–рідина',
      K: '1×10⁻⁶–1×10⁻⁴',
      unit: 'м/с',
      application: 'Рідинна екстракція (ЛПЕ, пульсаційні колони)',
      note: 'Контроль дифузією в обох фазах; залежить від в\'язкості'
    },
    {
      system: 'Газ–тверде тіло',
      K: '0.001–0.05',
      unit: 'м/с',
      application: 'Адсорбція (активоване вугілля, силікагель)',
      note: 'Зовнішній масообмін; внутрішня дифузія часто лімітує'
    },
    {
      system: 'Рідина–тверде тіло',
      K: '1×10⁻⁵–1×10⁻³',
      unit: 'м/с',
      application: 'Розчинення, кристалізація, іонний обмін',
      note: 'Плівковий механізм; зростає при перемішуванні'
    },
    {
      system: 'Газова фаза (перегонка)',
      K: '0.05–0.5',
      unit: 'м/с',
      application: 'Ректифікація (тарілчасті та насадкові колони)',
      note: 'HETP = 0.3–1.5 м залежно від насадки та навантаження'
    },
    {
      system: 'Рідка фаза (перегонка)',
      K: '1×10⁻⁴–1×10⁻²',
      unit: 'м/с',
      application: 'Ректифікація, рідка фаза на тарілці',
      note: 'Дифузія в рідині в 10⁴ разів повільніша, ніж у газі'
    },
    {
      system: 'Мембранний перенос (газ)',
      K: '1×10⁻³–1×10⁻¹',
      unit: 'м³/(м²·с·атм)',
      application: 'Газорозділення: O₂/N₂, CO₂/CH₄, H₂/N₂',
      note: 'Проникність залежить від матеріалу мембрани (PDMS, ПСФ)'
    },
    {
      system: 'Мембранний перенос (рідина)',
      K: '1×10⁻⁸–1×10⁻⁶',
      unit: 'м/с',
      application: 'Нанофільтрація, зворотний осмос (NaCl у воді)',
      note: 'Контроль механізмом розчинення-дифузії у мембрані'
    },
    {
      system: 'Біореактор (кисень у рідині)',
      K_La: '0.01–0.4',
      K: '0.01–0.4',
      unit: 'с⁻¹ (kLa)',
      application: 'Аеробна ферментація; масообмін O₂ → мікроорганізми',
      note: 'kLa = об\'ємний коефіцієнт масопередачі; залежить від барботажу'
    }
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">⚗️ Коефіцієнти масопередачі</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Типові значення коефіцієнтів масопередачі K для різних систем при промислових умовах.
        Значення — орієнтовні; реальні залежать від геометрії апарату, гідродинаміки та температури.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Система</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">K</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">Одиниця</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Застосування</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка</th>
          </tr>
        </thead>
        <tbody>`;

    this.data.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      html += `<tr style="background:${bg};border-bottom:0.5px solid #1e2240">
        <td style="padding:10px 12px;color:#ffffff;font-weight:600">${r.system}</td>
        <td style="padding:10px 12px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${r.K}</td>
        <td style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">${r.unit}</td>
        <td style="padding:10px 12px;color:#e0e8ff">${r.application}</td>
        <td style="padding:10px 12px;color:#7080b8;font-size:11px">${r.note}</td>
      </tr>`;
    });

    html += `</tbody></table></div>
      <div style="margin-top:14px;background:#0a0f1a;border:0.5px solid #1e3060;border-radius:8px;padding:12px 16px;font-size:11px;color:#7080b8;line-height:1.7">
        <b style="color:#4FC3F7">Загальне рівняння масопередачі:</b> N = K · A · ΔC, де N — потік речовини (моль/с), K — коефіцієнт масопередачі, A — площа поверхні (м²), ΔC — рушійна сила (моль/м³).
      </div>`;
    c.innerHTML = html;
  }
};
