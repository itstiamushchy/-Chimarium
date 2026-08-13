#!/usr/bin/env python3
"""
build_index.py — генератор індексів для Chimarium synthesis.html
Запуск: python3 build_index.py
Вхід:  reactions.json (у поточній директорії)
Вихід: data/rx_index.json, data/rx_flat.json
"""
import json, re, os, sys

INPUT  = 'reactions.json'
OUT_DIR = 'data'
INDEX_OUT = os.path.join(OUT_DIR, 'rx_index.json')
FLAT_OUT  = os.path.join(OUT_DIR, 'rx_flat.json')

JUNK = {'FALSE', 'TRUE', '...', 'passivated', 'solv'}

def clean(s):
    s = s.strip()
    s = re.sub(r'^[\d]+\.?[\d]*\s+', '', s)
    s = re.sub(r'^n\s+', '', s)
    return s.strip()

def parse_eq(eq):
    for sep in [' <=> ', ' -> ', ' → ', ' <-> ']:
        if sep in eq:
            p = eq.split(sep, 1)
            left  = [clean(x) for x in p[0].split('+')]
            right = [clean(x) for x in p[1].split('+')]
            left  = [x for x in left  if x and len(x) < 60 and x not in JUNK]
            right = [x for x in right if x and len(x) < 60 and x not in JUNK]
            return left, right
    return [], []

def main():
    if not os.path.exists(INPUT):
        print(f'❌ Файл {INPUT} не знайдено', file=sys.stderr)
        sys.exit(1)

    os.makedirs(OUT_DIR, exist_ok=True)

    print(f'⏳ Читаємо {INPUT}...')
    with open(INPUT, encoding='utf-8') as f:
        data = json.load(f)

    rx_flat = []
    pm_ids  = {}   # product  -> [rx_id, ...]
    rm_ids  = {}   # reagent  -> [rx_id, ...]

    total_cats = len(data)
    for ci, cat in enumerate(data):
        print(f'  Категорія {ci+1}/{total_cats}: {cat["label"]}', end='\r')
        for sub in cat['subsections']:
            for rx in sub['reactions']:
                left, right = parse_eq(rx['eq'])
                idx = len(rx_flat)
                rx_flat.append({
                    'eq':           rx['eq'],
                    'name':         rx.get('name', ''),
                    'conditions':   rx.get('conditions', ''),
                    'type':         rx.get('type', ''),
                    'danger':       rx.get('danger', False),
                    'products_desc': rx.get('products_desc', ''),
                    'category':     cat['label'],
                    'r': left,
                    'p': right,
                })
                for p in right:
                    pm_ids.setdefault(p, []).append(idx)
                for r in left:
                    rm_ids.setdefault(r, []).append(idx)

    print(f'\n✅ Оброблено {len(rx_flat)} реакцій')
    print(f'   Продуктів у PM: {len(pm_ids)}')
    print(f'   Реагентів у RM: {len(rm_ids)}')

    rx_index = {'pm': pm_ids, 'rm': rm_ids}

    print(f'💾 Записуємо {INDEX_OUT}...')
    with open(INDEX_OUT, 'w', encoding='utf-8') as f:
        json.dump(rx_index, f, ensure_ascii=False, separators=(',', ':'))
    print(f'   {os.path.getsize(INDEX_OUT) // 1024} KB')

    print(f'💾 Записуємо {FLAT_OUT}...')
    with open(FLAT_OUT, 'w', encoding='utf-8') as f:
        json.dump(rx_flat, f, ensure_ascii=False, separators=(',', ':'))
    print(f'   {os.path.getsize(FLAT_OUT) // 1024} KB')

    print('🎉 Готово! Файли у папці data/')

if __name__ == '__main__':
    main()
