#!/usr/bin/env python3
"""Regenera TODOS los clips de la app con voz neuronal LOCAL (Piper).

Sustituye los clips eSpeak (robóticos) por la voz neuronal elegida, con la
pronunciación reconstruida ática de nuestro G2P. Mismo nombre de fichero →
cero cambios en la app (el servicio de audio resuelve por id):

  public/audio/letters/<id>.wav        sonido de cada letra
  public/audio/letters-names/<id>.wav  NOMBRE griego de cada letra (ἄλφα…)
  public/audio/vocab/<id>.wav          todos los lemas del vocabulario
  public/audio/aphorisms/<id>.wav      todos los aforismos

Uso:
  pip install piper-tts numpy
  node scripts/dump-clips-ipa.mjs | python3 scripts/gen-piper-clips.py <dir-voces>

Voz por defecto: de_DE-thorsten-high (la de más calidad del A/B; cubre todos
los fonemas del ático). Cambiar de voz = PIPER_VOICE=<fichero.onnx>.
"""
import json
import os
import sys
from pathlib import Path

from piper import PiperVoice

sys.path.insert(0, str(Path(__file__).resolve().parent))
from gen_piper_common import tokens_to_phonemes, synth_to_wav  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / "public" / "audio"


def main() -> None:
    voices_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "voices")
    model = voices_dir / os.environ.get("PIPER_VOICE", "de_DE-thorsten-high.onnx")
    if not model.exists():
        sys.exit(f"No existe la voz {model} (descárgala de rhasspy/piper-voices)")
    voice = PiperVoice.load(str(model))
    data = json.load(sys.stdin)

    jobs = [
        # (carpeta, entradas, fonemas de cada entrada)
        ("letters", data["letters"], lambda e: list(e["ipa"])),
        ("letters-names", data["names"], lambda e: tokens_to_phonemes(e["tokens"])),
        ("vocab", data["vocab"], lambda e: tokens_to_phonemes(e["tokens"])),
        ("aphorisms", data["aphorisms"], lambda e: tokens_to_phonemes(e["tokens"])),
    ]
    total = 0.0
    n = 0
    for folder, entries, to_phonemes in jobs:
        for e in entries:
            dur = synth_to_wav(voice, to_phonemes(e), AUDIO / folder / f"{e['id']}.wav")
            total += dur
            n += 1
        print(f"✓ {folder}: {len(entries)} clips")
    print(f"\n{n} clips ({total:.0f}s de audio) con {model.name} en {AUDIO}")


if __name__ == "__main__":
    main()
