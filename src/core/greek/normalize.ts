/**
 * Normaliza texto griego para COMPARAR respuestas tecleadas con la solución sin
 * exigir acentos ni mayúsculas (que en v1 no enseñamos a teclear): quita
 * diacríticos, pasa a minúsculas, iguala la sigma final (ς) a la normal (σ) y
 * descarta todo lo que no sea una letra griega minúscula.
 *
 * Lógica PURA: ideal para tests y para validar sin tocar estado.
 */
export function normalizeGreek(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // diacríticos combinantes (acentos, espíritus)
    .toLowerCase()
    .replace(/ς/g, 'σ') // ς (sigma final) → σ
    .replace(/[^α-ω]/g, '') // solo letras griegas minúsculas
}
