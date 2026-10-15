#!/usr/bin/env python3
"""Is a Naver place still in business? usage: naver_status.py <naver_id> [<naver_id> ...] [--json out.json]

Signals, per place (Naver has no explicit "permanently closed" field in its public data):
  1. summary API  (map.naver.com/p/api/place/summary/<id>): still resolves → name, address, category
  2. mobile page  (m.place.naver.com/place/<id>/home): loads with a businessStatusDescription (opening hours
     exist), contains no 폐업/영업종료/운영 종료 marker, and the newest review/blog date on the page
  3. instant-search for the name near its coordinates still returns the same id
Verdict: OPEN  = page has hours or a date within the last 180 days, no closure marker, found in search
         CLOSED = closure marker on the page, or the id is gone from both the summary API and search
         CHECK  = anything in between (no recent dates, not found in search, no hours): verify by hand.
Used when adding venues from a video (2026-10-15) and whenever an existing restaurants/cafés layer is
updated: re-run on every pin and drop the CLOSED ones (user rule).
"""
import json, re, subprocess, sys, time, urllib.parse
from datetime import date, timedelta
NUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36'
MUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
CLOSURE = ('폐업', '영업종료된', '운영 종료', '영업을 종료', '폐점')

def curl(url, ua, extra=()):
    return subprocess.run(['curl', '-s', '-L', '-m', '40', '-A', ua, '-H', 'Referer: https://map.naver.com/', *extra, url], capture_output=True, text=True).stdout

def check(pid):
    r = {'id': pid}
    try:
        d = json.loads(curl(f'https://map.naver.com/p/api/place/summary/{pid}', NUA, ('-H', 'Accept: application/json')))['data']['placeDetail']
        r.update(name=d.get('name'), address=d.get('address'), category=(d.get('category') or {}).get('category'), lat=(d.get('coordinate') or {}).get('latitude'), lon=(d.get('coordinate') or {}).get('longitude'))
    except Exception:
        r['summary'] = False
    page = curl(f'https://m.place.naver.com/place/{pid}/home', MUA)
    r['page_ok'] = f'PlaceDetailBase:{pid}' in page
    r['closure_marker'] = next((k for k in CLOSURE if k in page), None)
    m = re.search(r'"businessStatusDescription":\{[^}]*"status":"([^"]*)"', page); r['hours_status'] = m.group(1) if m else None
    dates = sorted(set(re.findall(r'"date":"(20\d\d\.\d\d\.\d\d)\.?"', page)))
    r['latest_date'] = dates[-1] if dates else None
    r['found_in_search'] = None
    if r.get('name') and r.get('lat'):
        q = urllib.parse.quote(r['name'])
        try:
            s = json.loads(curl(f'https://map.naver.com/p/api/search/instant-search?query={q}&coords={r["lat"]},{r["lon"]}&lang=ko&caller=pcweb', NUA, ('-H', 'Accept: application/json')))
            r['found_in_search'] = any(str(p.get('id')) == str(pid) for p in s.get('place') or [])
        except Exception: pass
    recent = r['latest_date'] and date.fromisoformat(r['latest_date'].replace('.', '-')) >= date.today() - timedelta(days=180)
    if r['closure_marker'] or (r.get('summary') is False and not r['page_ok'] and not r['found_in_search']): r['verdict'] = 'CLOSED'
    elif (r['hours_status'] or recent) and not r['closure_marker'] and r['found_in_search'] is not False: r['verdict'] = 'OPEN'
    else: r['verdict'] = 'CHECK'
    time.sleep(1.0)
    return r

def main():
    args = sys.argv[1:]; out = None
    if '--json' in args: i = args.index('--json'); out = args[i + 1]; del args[i:i + 2]
    res = [check(a) for a in args]
    for r in res:
        print(f"{r['verdict']:6} {r['id']:>12} {str(r.get('name'))[:22]:22} hours={str(r['hours_status'])[:8]:8} latest={r['latest_date']} search={r['found_in_search']} marker={r['closure_marker']}")
    if out: json.dump(res, open(out, 'w'), ensure_ascii=False, indent=1)

if __name__ == '__main__':
    main()
