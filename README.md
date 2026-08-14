# 🧪 Хімарій v1.4.5 (Chimarium)

Інтерактивний хімічний веб-довідник та калькулятор.

👉 **Онлайн-версія:** [itstiamushchy.github.io/-Chimarium](https://itstiamushchy.github.io/-Chimarium/)

## 🚀 Що всередині
* ⚛️ Інтерактивна таблиця Менделєєва (118 елементів)
* ⚗️ База реакцій — 7 908 рівнянь з тегами та фільтром
* 🔢 116 калькуляторів (pH, молярна маса, балансування, розчини тощо)
* 📗 28 навчальних тем (6 блоків від атома до аналітики)
* 📊 56 довідникових таблиць
* 📚 Глосарій — 158 термінів
* 📐 30 формул
* 🎯 Тренажер (11 режимів)
* 🧴 Побутова хімія (окрема сторінка)
* ⚗️ Хімічний синтез — пошук шляху між сполуками

## 📁 Структура даних
| Файл | Призначення |
|------|-------------|
| `reactions_tagged.json` | Основна база реакцій (з тегами) |
| `reactions.json` | Копія reactions_tagged.json (джерело для build_index.py) |
| `data/rx_flat.json` | Плаский список реакцій для synthesis.html (генерується) |
| `data/rx_index.json` | Індекс реагентів/продуктів для synthesis.html (генерується) |
| `build_index.py` | Скрипт генерації rx_flat.json і rx_index.json |

## 🛠 Технології
HTML, CSS, JavaScript (Vanilla). PWA з Service Worker.

## 🔄 Оновлення бази синтезу
```bash
# Після змін у reactions_tagged.json:
cp reactions_tagged.json reactions.json
python3 build_index.py
```
