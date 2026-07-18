"""Síntesis común con Piper para los generadores de audio de Agora.

Pasamos NUESTRO IPA (del G2P) directamente al modelo (phonemes_to_ids →
phoneme_ids_to_audio), sin espeak de por medio: control total de la
pronunciación reconstruida con voz neuronal local (onnx, CPU).
"""
import re
import wave
from pathlib import Path

import numpy as np
from piper import PiperVoice

VOWELS = "aeiouyɛɔ"


def adapt_ipa(ipa: str) -> str:
    """Adapta nuestro IPA a la convención del modelo: el acento (ˈ) va justo
    ANTES de la vocal tónica (como phonemiza espeak), no ante la sílaba."""
    return re.sub(rf"ˈ([^{VOWELS}]*)", r"\1ˈ", ipa)


def tokens_to_phonemes(tokens) -> list[str]:
    """Concatena palabras (IPA adaptado) con espacios; puntuación → pausa."""
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


def synth_to_wav(voice: PiperVoice, phonemes: list[str], path: Path) -> float:
    """Sintetiza una lista de fonemas y la guarda como WAV. Devuelve segundos."""
    ids = voice.phonemes_to_ids(phonemes)
    audio = voice.phoneme_ids_to_audio(ids)
    arr = (
        np.frombuffer(audio, dtype=np.int16)
        if isinstance(audio, (bytes, bytearray))
        else np.asarray(audio)
    )
    if arr.dtype != np.int16:  # float [-1,1] → int16
        arr = (np.clip(arr, -1, 1) * 32767).astype(np.int16)
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(voice.config.sample_rate)
        w.writeframes(arr.tobytes())
    return len(arr) / voice.config.sample_rate
