"""Índice común de las muestras A/B de voz (public/audio/samples/index.html).

Lista TODO motor presente en la carpeta (ficheros <motor>--<id>.wav), así cada
generador (Piper, MMS…) se suma solo al comparador sin tocar a los demás.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio" / "samples"


def write_index(samples) -> None:
    voice_names = sorted({p.name.split("--")[0] for p in OUT.glob("*--*.wav")})
    sections = []
    for s in samples:
        cells = "\n      ".join(
            f'<div><small>{v}</small><br>'
            f'<audio controls preload="none" src="{v}--{s["id"]}.wav"></audio></div>'
            for v in voice_names
            if (OUT / f'{v}--{s["id"]}.wav').exists()
        )
        old = (
            f'<div><small>eSpeak actual</small><br>'
            f'<audio controls preload="none" src="{s["old"]}"></audio></div>'
            if s.get("old")
            else ""
        )
        sections.append(
            f'  <section>\n    <h2 lang="grc">{s["text"]}</h2>\n'
            f'    <div class="voices">\n      {cells}\n      {old}\n    </div>\n  </section>'
        )
    html = (
        "<!doctype html>\n"
        '<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        "<title>Agora · muestras de voz open source (A/B)</title>\n"
        "<style>\n"
        "  body { font-family: system-ui, sans-serif; margin: 1rem; background:#0f172a; color:#e2e8f0 }\n"
        "  h2 { margin: 1.2rem 0 0.4rem; font-weight: 600 }\n"
        "  .voices { display: flex; flex-wrap: wrap; gap: 0.8rem }\n"
        "  small { color: #94a3b8 }\n"
        "  audio { width: 240px }\n"
        "</style>\n"
        "<h1>Muestras de voz (open source, local) · elige con el oído</h1>\n"
        "<p>Mismo texto; varios modelos. Piper lleva nuestro IPA reconstruido; "
        "MMS-grc lee el texto con lo que aprendió de griego antiguo.</p>\n"
        + "\n".join(sections)
        + "\n"
    )
    (OUT / "index.html").write_text(html, encoding="utf-8")
