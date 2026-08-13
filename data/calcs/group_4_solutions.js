window._CALC_ENGINES = window._CALC_ENGINES || {};
Object.assign(window._CALC_ENGINES, {
  '4-1-dissolving_V':({Ksp,type})=>{type=Math.round(type);const s=type===1?Math.sqrt(Ksp):type===2?Math.cbrt(Ksp/4):Math.pow(Ksp/27,0.25);return{result:`s = ${_fmt(s)} моль/л`,label:'Розчинність з Ksp',steps:[`Тип ${type}: s=${_fmt(s)} моль/л`]};},
  '4-1-dissolving_P':({s,M_compound,type})=>{type=Math.round(type);const Ksp=type===1?s*s:type===2?4*s*s*s:27*s*s*s*s;return{result:`Ksp = ${_fmt(Ksp)}`,label:'Ksp з розчинності',steps:[`Ksp=${_fmt(Ksp)}`,`s(г/л)=${_fmt(s*M_compound)} г/л`]};},
  '4-1-dissolving_n':({C_cat,C_an,Ksp,m_cat,m_an})=>{m_cat=Math.round(m_cat);m_an=Math.round(m_an);const Q=Math.pow(C_cat,m_cat)*Math.pow(C_an,m_an),v=Q>Ksp?'Осад ВИПАДАЄ ↓':Q<Ksp?'Осад НЕ ВИПАДАЄ':'Насичений розчин';return{result:v,label:'Умова утворення осаду',steps:[`Q=${_fmt(Q)}, Ksp=${_fmt(Ksp)}`,v]};},
  '4-2-concentration_V':({rho,omega,M_compound})=>{const C=1000*rho*omega/(M_compound*100);return{result:`C = ${_fmt(C)} моль/л`,label:'Молярна концентрація',steps:[`C=1000ρω/(100M)=${_fmt(C)} моль/л`]};},
  '4-2-concentration_P':({C,rho,M_compound})=>{const Cm=C/(rho*1000/M_compound-C);return{result:`Cm = ${_fmt(Cm)} моль/кг`,label:'Моляльна концентрація',steps:[`Cm=C/(ρ×1000/M−C)=${_fmt(Cm)} моль/кг`]};},
  '4-2-concentration_n':({C1,V1,V2})=>{const C2=C1*V1/V2;return{result:`C₂ = ${_fmt(C2)} моль/л`,label:'Розведення C₁V₁=C₂V₂',steps:[`C₂=C₁V₁/V₂=${C1}×${V1}/${V2}=${_fmt(C2)} моль/л`]};},
  '4-3-electrolytes_V':({Ka,C})=>{let pH,m;if(C/Ka>=100){pH=0.5*(-Math.log10(Ka)-Math.log10(C));m='Наближення: pH=½(pKa−lgC)';}else{const x=(-Ka+Math.sqrt(Ka*Ka+4*Ka*C))/2;pH=-Math.log10(x);m='Квадратне рівняння';}return{result:`pH = ${_fmt(pH)}`,label:'pH слабкої кислоти',steps:[m,`pH=${_fmt(pH)}`]};},
  '4-3-electrolytes_P':({pKa,C_salt,C_acid})=>{const pH=pKa+Math.log10(C_salt/C_acid);return{result:`pH = ${_fmt(pH)}`,label:'pH буфера (Гендерсон-Хасселбалх)',steps:[`pH=pKa+lg([A⁻]/[HA])=${pKa}+lg(${C_salt}/${C_acid})=${_fmt(pH)}`]};},
  '4-3-electrolytes_n':({Ka,C})=>{const a=Math.sqrt(Ka/C)*100;return{result:`α = ${_fmt(a)} %`,label:'Ступінь дисоціації',steps:[`α=√(Ka/C)×100=${_fmt(a)} %`]};},
  '4-4-colligative_V':({Kf,Cm,i})=>{const dT=Kf*Cm*i;return{result:`ΔTзам = ${_fmt(dT)} °C`,label:'Зниження температури замерзання',steps:[`ΔT=Kf×Cm×i=${_fmt(dT)} °C`]};},
  '4-4-colligative_P':({C,T_C,i})=>{const pi=C*0.08206*(T_C+273.15)*i;return{result:`π = ${_fmt(pi)} атм`,label:'Осмотичний тиск',steps:[`π=CRT×i=${_fmt(pi)} атм`]};},
  '4-4-colligative_n':({m_solute,dT,Kf,m_solvent_g})=>{const M=1000*Kf*m_solute/(dT*m_solvent_g);return{result:`M = ${_fmt(M)} г/моль`,label:'Молярна маса з ΔT',steps:[`M=1000×Kf×m/(ΔT×m_розч)=${_fmt(M)} г/моль`]};},
  '4-5-colloids_V':({V_electrolyte,C_electrolyte,V_total})=>{const g=V_electrolyte*C_electrolyte/V_total;return{result:`γ = ${_fmt(g)} ммоль/л`,label:'Поріг коагуляції',steps:[`γ=V×C/V_заг=${_fmt(g)} ммоль/л`]};},
  '4-5-colloids_P':({z})=>{z=Math.round(z);const r=Math.pow(z,6);return{result:`z⁶ = ${_fmt(r)}`,label:'Відносна ефективність (Шульце-Гарді)',steps:[`${z}⁶=${_fmt(r)}`]};},
});
