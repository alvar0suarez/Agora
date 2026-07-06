import { normalizeGreek, ROOTS, type Root } from '../../core/greek'
import type { NousWordRecord } from '../../core/storage/db'
import { extractGreekFragments, greekKey, type GreekFragment } from './parse'

/**
 * Mapa de palabras: agrupa las palabras importadas de Nous por las raíces
 * griegas que comparten sus etimologías. Las relaciones EMERGEN de compartir
 * fragmento (no de leer la prosa): si «exégeta» menciona ἡγεῖσθαι y algún día
 * «hegemonía» también, se conectan solas.
 *
 * La misma raíz puede aparecer con formas superficiales distintas (ἡγεῖσθαι,
 * ἡγεμών…): cuando la clave normalizada no coincide, el usuario puede
 * FUSIONARLAS a mano («es la misma raíz») y la fusión se guarda. Lógica PURA
 * (testeada en map.test.ts); la persistencia de fusiones vive en store.ts.
 */

/** Fusiones manuales: clave normalizada → clave canónica a la que pertenece. */
export type RootMerges = Record<string, string>

/** Un grupo del mapa: una raíz (canónica) y las palabras que la comparten. */
export interface RootGroup {
  /** Clave canónica del grupo (forma normalizada, tras fusiones). */
  key: string
  /** Formas superficiales vistas (con translit/glosa minadas), sin duplicar. */
  formas: GreekFragment[]
  /** Raíz curada de Agora que casa con el grupo (enriquece forma/glosa). */
  curated?: Root
  /** Ids de las palabras de Nous cuya etimología contiene la raíz. */
  wordIds: string[]
}

/** Sigue los punteros de fusión hasta la clave canónica (a prueba de ciclos). */
export function canonicalKey(key: string, merges: RootMerges): string {
  let k = key
  const seen = new Set<string>()
  while (merges[k] && !seen.has(k)) {
    seen.add(k)
    k = merges[k]
  }
  return k
}

/** Índice de raíces curadas de Agora por forma griega normalizada. */
const curatedByKey = new Map<string, Root>(
  ROOTS.map((r) => [normalizeGreek(r.gr), r]),
)

/**
 * Construye los grupos del mapa a partir de las palabras importadas y las
 * fusiones manuales. Orden: primero las raíces con más palabras (las
 * relaciones), luego alfabético por forma.
 */
export function buildRootGroups(
  words: NousWordRecord[],
  merges: RootMerges = {},
): RootGroup[] {
  const groups = new Map<string, RootGroup>()
  for (const w of words) {
    for (const frag of extractGreekFragments(w.comentario)) {
      const key = canonicalKey(greekKey(frag.gr), merges)
      let g = groups.get(key)
      if (!g) {
        g = { key, formas: [], curated: curatedByKey.get(key), wordIds: [] }
        groups.set(key, g)
      }
      const forma = g.formas.find((f) => f.gr === frag.gr)
      if (!forma) {
        g.formas.push({ ...frag })
      } else {
        if (!forma.translit && frag.translit) forma.translit = frag.translit
        if (!forma.gloss && frag.gloss) forma.gloss = frag.gloss
      }
      if (!g.wordIds.includes(w.id)) g.wordIds.push(w.id)
    }
  }
  // Una fusión puede apuntar a una clave sin fragmento propio (raro); el grupo
  // ya se creó con esa clave canónica, así que no hay huérfanos que recoger.
  return [...groups.values()].sort(
    (a, b) =>
      b.wordIds.length - a.wordIds.length ||
      etiqueta(a).localeCompare(etiqueta(b), 'el'),
  )
}

/** Nombre visible de un grupo: la raíz curada si la hay, si no la 1ª forma vista. */
export function etiqueta(g: RootGroup): string {
  return g.curated?.gr ?? g.formas[0]?.gr ?? g.key
}

/** Glosa visible de un grupo: la curada si la hay, si no la primera minada. */
export function glosaDe(g: RootGroup): string {
  return g.curated?.gloss ?? g.formas.find((f) => f.gloss)?.gloss ?? ''
}
