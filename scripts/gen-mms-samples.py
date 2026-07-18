#!/usr/bin/env python3
"""Muestras A/B con MMS-TTS-GRC (Meta, VITS entrenado EN griego antiguo).

A diferencia de Piper (donde mandamos nuestro IPA reconstruido), aquí el modelo
recibe el TEXTO griego tal cual: su pronunciación es la que aprendió de sus
datos (lecturas de griego antiguo del proyecto MMS). Sirve de contraste en el
A/B: ¿suena mejor un modelo nativo de griego antiguo o una voz con nuestro IPA?

Licencia del modelo: CC-BY-NC 4.0 (NO comercial) — vale para aprender; para
contenido promocional habría que usar otra vía (Piper es MIT/GPL-code).

Uso:
  pip install torch --index-url https://download.pytorch.org/whl/cpu
  pip install transformers numpy
  node scripts/dump-sample-ipa.mjs | python3 scripts/gen-mms-samples.py

Salida: public/audio/samples/mms-grc--<id>.wav y regenera el index.html.
"""
import json
import sys
import unicodedata
import wave
from pathlib import Path

import numpy as np
import torch

sys.path.insert(0, str(Path(__file__).resolve().parent))
from gen_samples_index import write_index  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio" / "samples"


def strip_diacritics(text: str) -> str:
    """Politónico → letras griegas base (el vocabulario de MMS es sin acentos)."""
    nfd = unicodedata.normalize("NFD", text.lower())
    return unicodedata.normalize(
        "NFC", "".join(c for c in nfd if not unicodedata.combining(c))
    )


def main() -> None:
    from transformers import AutoTokenizer, VitsModel

    samples = json.load(sys.stdin)
    OUT.mkdir(parents=True, exist_ok=True)

    model = VitsModel.from_pretrained("facebook/mms-tts-grc")
    tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-grc")
    rate = model.config.sampling_rate

    for s in samples:
        text = s["text"]
        inputs = tokenizer(text, return_tensors="pt")
        # Si el tokenizer no reconoce el politónico, probamos sin diacríticos.
        if inputs.input_ids.shape[-1] < len(text) * 0.5:
            inputs = tokenizer(strip_diacritics(text), return_tensors="pt")
        with torch.no_grad():
            wavform = model(**inputs).waveform[0].numpy()
        arr = (np.clip(wavform, -1, 1) * 32767).astype(np.int16)
        path = OUT / f"mms-grc--{s['id']}.wav"
        with wave.open(str(path), "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(rate)
            w.writeframes(arr.tobytes())
        print(f"✓ mms-grc {s['id']:12} {len(arr) / rate:4.1f}s")

    write_index(samples)
    print(f"\nMuestras en {OUT} (+ index.html)")


if __name__ == "__main__":
    main()
