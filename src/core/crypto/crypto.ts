/**
 * Cifrado ligero con WebCrypto (AES-256-GCM).
 *
 * INVARIANTE DE SEGURIDAD: nunca escribimos criptografía a mano. Usamos
 * exclusivamente la API SubtleCrypto del navegador, que es auditada y estándar.
 *
 * "Ligero" significa que NO hay respaldo por hardware (no es StrongBox): es
 * suficiente para datos personales, pero no para secretos de alto riesgo. Si
 * algún día hiciera falta más, se replantea (probablemente fuera de la PWA).
 */

const ALGO = 'AES-GCM'

/** Genera una clave AES-256 nueva. */
export function generateKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey({ name: ALGO, length: 256 }, true, [
    'encrypt',
    'decrypt',
  ])
}

export interface Encrypted {
  /**
   * Vector de inicialización (único por mensaje). Tipado con su buffer
   * concreto (`ArrayBuffer`) porque la API de WebCrypto exige memoria no
   * compartida; un `Uint8Array` "a secas" sería ambiguo para TypeScript.
   */
  iv: Uint8Array<ArrayBuffer>
  /** Texto cifrado. */
  data: ArrayBuffer
}

/** Cifra un texto. El IV se genera al azar y se devuelve junto al dato. */
export async function encrypt(
  key: CryptoKey,
  plaintext: string,
): Promise<Encrypted> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const data = await crypto.subtle.encrypt(
    { name: ALGO, iv },
    key,
    new TextEncoder().encode(plaintext),
  )
  return { iv, data }
}

/** Descifra un dato previamente cifrado con `encrypt`. */
export async function decrypt(
  key: CryptoKey,
  payload: Encrypted,
): Promise<string> {
  const plain = await crypto.subtle.decrypt(
    { name: ALGO, iv: payload.iv },
    key,
    payload.data,
  )
  return new TextDecoder().decode(plain)
}
