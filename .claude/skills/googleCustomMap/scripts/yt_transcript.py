#!/usr/bin/env python3
"""Fetch YouTube title, channel, description (chapter timeline) and transcript.

usage: yt_transcript.py <videoId|url> [--lang ko en] [--out DIR]
writes: yt_meta.json, transcript_<lang>.txt in --out (default: cwd)
"""
import argparse, importlib, json, os, re, subprocess, sys, urllib.request


def video_id(s):
    m = re.search(r'(?:v=|youtu\.be/|shorts/)([A-Za-z0-9_-]{11})', s)
    return m.group(1) if m else s


def ensure_transcript_api(out):
    try:
        import youtube_transcript_api  # noqa
        return
    except ImportError:
        pass
    lib = os.path.join(out, 'pylib')
    sys.path.insert(0, lib)
    try:
        import youtube_transcript_api  # noqa
        return
    except ImportError:
        print('installing youtube-transcript-api into', lib, file=sys.stderr)
        subprocess.run([sys.executable, '-m', 'pip', 'install', '--quiet', '--target', lib, 'youtube-transcript-api'], check=True)
        importlib.invalidate_caches()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('video')
    ap.add_argument('--lang', nargs='+', default=['ko', 'en'])
    ap.add_argument('--out', default='.')
    a = ap.parse_args()
    vid = video_id(a.video)
    os.makedirs(a.out, exist_ok=True)

    req = urllib.request.Request(f'https://www.youtube.com/watch?v={vid}', headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req, timeout=60).read().decode('utf-8', 'ignore')
    meta = {'videoId': vid}
    m = re.search(r'ytInitialPlayerResponse\s*=\s*(\{.*?\});', html)
    if m:
        try:
            d = json.loads(m.group(1))
            vd = d.get('videoDetails', {})
            meta.update(title=vd.get('title'), author=vd.get('author'), lengthSeconds=vd.get('lengthSeconds'),
                        description=vd.get('shortDescription'))
            meta['captionLanguages'] = [(t.get('languageCode'), t.get('kind')) for t in
                                        d.get('captions', {}).get('playerCaptionsTracklistRenderer', {}).get('captionTracks', [])]
        except Exception as e:
            print('player response parse failed:', e, file=sys.stderr)
    json.dump(meta, open(os.path.join(a.out, 'yt_meta.json'), 'w'), ensure_ascii=False, indent=2)
    print('TITLE:', meta.get('title'))
    print('CHANNEL:', meta.get('author'), ' LENGTH:', meta.get('lengthSeconds'), 's')
    print('CAPTIONS:', meta.get('captionLanguages'))
    print('DESCRIPTION:\n' + (meta.get('description') or '(none)') + '\n')

    ensure_transcript_api(a.out)
    from youtube_transcript_api import YouTubeTranscriptApi
    api = YouTubeTranscriptApi()
    try:
        tr = api.fetch(vid, languages=a.lang)
    except Exception as e:
        print('transcript fetch failed:', e, file=sys.stderr)
        return 1
    lines = [f'{int(s.start) // 60:02d}:{int(s.start) % 60:02d} {s.text.strip()}' for s in tr]
    path = os.path.join(a.out, f'transcript_{tr.language_code}.txt')
    open(path, 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
    print(f'TRANSCRIPT ({tr.language_code}, {len(lines)} lines) -> {path}\n')
    print('\n'.join(lines))
    return 0


if __name__ == '__main__':
    sys.exit(main())
