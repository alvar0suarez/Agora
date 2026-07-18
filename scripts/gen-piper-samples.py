#!/usr/bin/env python3
"""Muestras A/B con Piper (TTS neuronal OPEN SOURCE, 100% local, sin claves).

Sintetiza las muestras (palabras y frases en ático) pasando NUESTRO IPA del G2P
directamente al modelo (phonemes_to_ids → phoneme_ids_to_audio), sin espeak de
por medio: control total de la pronunciación reconstruida.

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
import re
import sys
import wave
from pathlib import Path

import numpy as np
from piper import PiperVoice

sys.path.insert(0, str(Path(__file__).resolve().parent))
from gen_samples_index import write_index  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio" / "samples"

# nombre corto → fichero .onnx (descargado de huggingface.co/rhasspy/piper-voices)
VOICES = {
    "piper-de-thorsten": "de_DE-thorsten-high.onnx",
    "piper-es-davefx": "es_ES-davefx-medium.onnx",
    "piper-el-rapunzelina": "el_GR-rapunzelina-low.onnx",
}

VOWELS = "aeiouyɛɔ"


def adapt_ipa(ipa: str) -> str:
    """Adapta nuestro IPA a la convención del modelo: el acento (ˈ) va justo
    ANTES de la vocal tónica (como phonemiza espeak), no ante la sílaba."""
    return re.sub(rf"ˈ([^{VOWELS}]*)", r"\1ˈ", ipa)


def sample_phonemes(tokens) -> list[str]:
    """Concatena las palabras (IPA adaptado) con espacios; puntuación → pausa."""
    chars: list[str] = []
    for t in tokens:
        if t["ipa"]:
            if chars and chars[-1] not in (" ", ",", "."):
                chars.append(" ")
            chars.extend(adapt_ipa(t["ipa"]))
        elif any(p in t["text"] for p in ",;·"):
            chars.append(",")
        elif any(p in t["text"] for p in ".;?!"):
            chars.append(".")
    return chars


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
            phonemes = sample_phonemes(s["tokens"])
            ids = voice.phonemes_to_ids(phonemes)
            audio = voice.phoneme_ids_to_audio(ids)
            arr = (
                np.frombuffer(audio, dtype=np.int16)
                if isinstance(audio, (bytes, bytearray))
                else np.asarray(audio)
            )
            if arr.dtype != np.int16:  # float [-1,1] → int16
                arr = (np.clip(arr, -1, 1) * 32767).astype(np.int16)
            path = OUT / f"{short}--{s['id']}.wav"
            with wave.open(str(path), "wb") as w:
                w.setnchannels(1)
                w.setsampwidth(2)
                w.setframerate(voice.config.sample_rate)
                w.writeframes(arr.tobytes())
            dur = len(arr) / voice.config.sample_rate
            print(f"✓ {short:22} {s['id']:12} {dur:4.1f}s")

    write_index(samples)
    print(f"\nMuestras en {OUT} (+ index.html)")


if __name__ == "__main__":
    main()
