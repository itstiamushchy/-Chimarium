// ============ Т-48: КОЛОЇДНА ХІМІЯ — КЛАСИФІКАЦІЯ ДИСПЕРСНИХ СИСТЕМ ============
// Джерела: Фрідріхсберг «Курс колоїдної хімії» (1984);
//          Щукін, Равдель, Мотилева «Короткий довідник фізико-хімічних величин» (2002);
//          Hiemenz & Rajagopalan «Principles of Colloid and Surface Chemistry» 3rd ed. (1997)

const TABLE_COLLOID_PROPERTIES = {
  id: 'colloid_properties',
  title: 'Колоїдна хімія — класифікація дисперсних систем',
  topic: '4-5-colloids',
  data: [
    {
      type:'Аерозоль (туман)',
      dispMedium:'газ',
      dispPhase:'рідина',
      example:'Туман, хмари, спрей',
      size:'0.1–100 мкм',
      stability:'нестійкі',
      properties:'Проходить через фільтр; видимий у світлі; під дією тяжіння осідає',
      note:'Дощ — осідання крапель туману'
    },
    {
      type:'Аерозоль (дим)',
      dispMedium:'газ',
      dispPhase:'тверда',
      example:'Дим, пил, смог',
      size:'0.001–10 мкм',
      stability:'нестійкі',
      properties:'Ефект Тіндаля; броунівський рух дрібних частинок',
      note:'Смог = суміш диму і туману'
    },
    {
      type:'Золь (ліозоль)',
      dispMedium:'рідина',
      dispPhase:'тверда',
      example:'Золото у воді (Au-золь), Fe(OH)₃-золь, крохмальний клейстер',
      size:'1–100 нм',
      stability:'кінетично стійкі',
      properties:'Ефект Тіндаля; броунівський рух; не фільтруються; коагулюють при додаванні електролітів',
      note:'Класичний колоїдний розчин'
    },
    {
      type:'Емульсія',
      dispMedium:'рідина',
      dispPhase:'рідина (незмішувана)',
      example:'Молоко (жир у воді), майонез, мазут у воді',
      size:'0.1–50 мкм',
      stability:'кінетично нестійкі',
      properties:'Розшаровуються без емульгатора; стабілізуються ПАР',
      note:'Тип О/В (олія у воді) або В/О (вода в олії)'
    },
    {
      type:'Піна',
      dispMedium:'рідина',
      dispPhase:'газ',
      example:'Мильна піна, збиті вершки, піна на пиві',
      size:'0.1–10 мм',
      stability:'нестійкі',
      properties:'Полімерна структура; стабілізується ПАР або білками',
      note:'Розпадаються без стабілізатора за хвилини'
    },
    {
      type:'Гель',
      dispMedium:'рідина (в 3D-сітці)',
      dispPhase:'тверда (полімер)',
      example:'Желатин, агар-агар, кремнезоль → силікагель, крохмаль',
      size:'1–100 нм (сітка)',
      stability:'стійкі',
      properties:'Пружно-пластичні; не течуть; синерезис (відділення рідини)',
      note:'Проміжний між твердим та рідким'
    },
    {
      type:'Тверда піна',
      dispMedium:'тверда',
      dispPhase:'газ',
      example:'Пінобетон, пробка, пінопласт, хліб',
      size:'0.01–10 мм',
      stability:'стійкі',
      properties:'Мала густина; гарна теплоізоляція',
      note:'Пінобетон: ρ = 0.3–0.6 г/см³'
    },
    {
      type:'Тверда емульсія',
      dispMedium:'тверда',
      dispPhase:'рідина',
      example:'Перли (вода в кальциті), опал (вода в SiO₂)',
      size:'1–100 нм',
      stability:'стійкі',
      properties:'Особливі оптичні ефекти (опалесценція)',
      note:'Опалесценція — інтерференція на краплях'
    },
    {
      type:'Суспензія',
      dispMedium:'рідина',
      dispPhase:'тверда',
      example:'Крейда у воді, піщаний мул, гідрозоль глини',
      size:'> 100 нм (мкм–мм)',
      stability:'нестійкі (осідають)',
      properties:'Видимі неозброєним оком; фільтруються; осідають під дією тяжіння',
      note:'Мікрогетерогенна система (≠ колоїд)'
    },
    {
      type:'Ліофільний колоїд',
      dispMedium:'рідина',
      dispPhase:'ВМС (полімер)',
      example:'Розчин желатину, казеїну, ДНК у воді',
      size:'1–100 нм',
      stability:'термодинамічно стійкі',
      properties:'Самодиспергуються; зворотньо коагулюють; ВМС в гарному розчиннику',
      note:'Знесолення не веде до коагуляції'
    },
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const stabColors = {
      'стійкі':                '#69F0AE',
      'термодинамічно стійкі': '#69F0AE',
      'кінетично стійкі':      '#FFB300',
      'кінетично нестійкі':    '#FF8A65',
      'нестійкі':              '#FF5252',
      'нестійкі (осідають)':   '#FF5252',
    };
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🫧 Класифікація дисперсних систем</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:10px">Джерело: Фрідріхсберг «Курс колоїдної хімії» · Hiemenz & Rajagopalan «Principles of Colloid and Surface Chemistry» 3rd ed.</div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Тип системи</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Середовище</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Фаза</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Розмір частинок</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Стійкість</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Приклади</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map((r,i)=>{
            const col = stabColors[r.stability] || '#7080b8';
            return `
          <tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
            <td style="padding:8px 12px;color:#FFB300;font-weight:600">${r.type}</td>
            <td style="padding:8px 10px;color:#80CBC4">${r.dispMedium}</td>
            <td style="padding:8px 10px;color:#CE93D8">${r.dispPhase}</td>
            <td style="padding:8px 10px;color:#7080b8;font-size:11px">${r.size}</td>
            <td style="padding:8px 10px"><span style="color:${col};font-size:11px">${r.stability}</span></td>
            <td style="padding:8px 10px;color:#b0c0e0;font-size:11px">${r.example}</td>
          </tr>`;}).join('')}
        </tbody>
      </table>
      </div>
      <div style="margin-top:16px;background:#0a1020;border:0.5px solid #1e3060;border-radius:8px;padding:12px 14px;font-size:12px;color:#b0c0e0;line-height:1.7">
        <b style="color:#4FC3F7">Ефект Тіндаля:</b> колоїдні частинки (1–100 нм) розсіюють видиме світло — промінь світла стає видимим у темряві. У справжніх розчинах частинки < 1 нм — ефект відсутній.<br>
        <b style="color:#FFB300">Коагуляція:</b> злипання колоїдних частинок при додаванні електролітів. Правило Шульце–Гарді: коагулюючий ефект зростає різко з зарядом іона (1⁻:2⁻:3⁻ = 1:30:1000).
      </div>`;
  }
};
