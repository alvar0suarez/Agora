#!/usr/bin/env python3
"""Muestras A/B con Piper (TTS neuronal OPEN SOURCE, 100% local, sin claves).

Sintetiza las muestras (palabras y frases en ático) pasando NUESTRO IPA del G2P
directamente al modelo (ver gen_piper_common.py), sin espeak de por medio:
control total de la pronunciación reconstruida.

Voces: modelos VITS de rhasspy/piper-voices (Hugging Face). La alemana y la
española contienen TODOS los fonemas que necesitamos (incl. ʰ, ː, y, ŋ, h, ̯);
la griega moderna, casi todos (sin ʰ: se degrada sola al soltar ese carácter).

Uso:
  pip install piper-tts numpy
  # descargar voces .onnx+.json (ver VOICES) a un directorio, p. ej. voices/
  node scripts/dump-sample-ipa.mjs | python3 scripts/gen-piper-samples.py voices/

Salida: public/audio/samples/<voz>--<id>.wav + index.html para el A/B.
"""
import json
import sys
from pathlib import Path

from piper import PiperVoice

sys.path.insert(0, str(Path(__file__).resolve().parent))
from gen_piper_common import synth_to_wav, tokens_to_phonemes  # noqa: E402
from gen_samples_index import write_index  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio" / "samples"

# nombre corto → fichero .onnx (descargado de huggingface.co/rhasspy/piper-voices)
VOICES = {
    "piper-de-thorsten": "de_DE-thorsten-high.onnx",
    "piper-es-davefx": "es_ES-davefx-medium.onnx",
    "piper-el-rapunzelina": "el_GR-rapunzelina-low.onnx",
}


def main() -> None:
    voices_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "voices")
    samples = json.load(sys.stdin)
    OUT.mkdir(parents=True, exist_ok=True)

    for short, fname in VOICES.items():
        model = voices_dir / fname
        if not model.exists():
            print(f"– {short}: falta {model}, lo salto")
            continue
        voice = PiperVoice.load(str(model))
        for s in samples:
            path = OUT / f"{short}--{s['id']}.wav"
            dur = synth_to_wav(voice, tokens_to_phonemes(s["tokens"]), path)
            print(f"✓ {short:22} {s['id']:12} {dur:4.1f}s")

    write_index(samples)
    print(f"\nMuestras en {OUT} (+ index.html)")


if __name__ == "__main__":
    main()
