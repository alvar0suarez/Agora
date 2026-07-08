import { normalizeGreek } from '../../core/greek'

/**
 * Análisis del comentario libre que viene de Nous. El comentario sigue (de
 * facto) la convención documentada en docs/formato-nous-vocab.md:
 *
 *   Etimología: … griego con transliteración entre paréntesis, p. ej.
 *   ἐξηγητής (exēgētēs), del prefijo ex- (ἐξ), que significa "fuera"…
 *   Significado: …definición…
 *
 * De ahí derivamos, al vuelo y sin persistir nada: las secciones
 * (significado/etimología) y los fragmentos griegos con su transliteración y
 * glosa cuando se dejan leer. Es HEURÍSTICO por diseño: si el texto no coopera,
 * la ficha muestra el comentario entero y no se pierde nada.
 *
 * Lógica PURA (testeada en parse.test.ts). Cuando Nous emita `etimologia`
 * estructurada (su Fase 4), esa tendrá prioridad sobre esta heurística.
 */

/** Un fragmento griego detectado en el texto, con lo que se pudo minar. */
export interface GreekFragment {
  /** La forma griega tal como aparece (con diacríticos). */
  gr: string
  /** Transliteración latina, si estaba al lado. */
  translit?: string
  /** Glosa española ("fuera, hacia afuera"), si estaba al lado. */
  gloss?: string
}

export interface ParsedComment {
  /** Sección tras "Significado:". */
  significado: string
  /** Sección tras "Etimología:". */
  etimologia: string
  /** Texto fuera de las etiquetas (o todo, si no hay etiquetas). */
  resto: string
}

/** Caracteres invisibles que se cuelan al copiar/pegar (p. ej. U+200B). */
const INVISIBLES = /[\u200b\u200c\u200d\ufeff]/g

const ETIQUETA = /(etimolog[íi]a|significado)\s*:/gi

/** Separa el comentario en secciones por las etiquetas de la convención. */
export function splitComment(comentario: string): ParsedComment {
  const clean = comentario.replace(INVISIBLES, '')
  const matches = [...clean.matchAll(ETIQUETA)]
  const out: ParsedComment = { significado: '', etimologia: '', resto: '' }
  if (matches.length === 0) {
    out.resto = clean.trim()
    return out
  }
  out.resto = clean.slice(0, matches[0].index).trim()
  matches.forEach((m, i) => {
    const desde = m.index + m[0].length
    const hasta = i + 1 < matches.length ? matches[i + 1].index : clean.length
    const seccion = clean.slice(desde, hasta).trim()
    const clave = m[1].toLowerCase().startsWith('e') ? 'etimologia' : 'significado'
    out[clave] = out[clave] ? `${out[clave]}\n${seccion}` : seccion
  })
  return out
}

/** Letras griegas (bloques básico y extendido/politónico) con sus diacríticos. */
const PALABRA_GRIEGA = /[\u0370-\u03ff\u1f00-\u1fff][\u0370-\u03ff\u1f00-\u1fff\u0300-\u036f]*/g

/** Una transliteración latina plausible (permite macrones y guiones). */
const TRANSLIT = /^[a-zāēīōūǖáéíóúàèìòùâêîôûḗṓ'-]+$/i

/** Primer tramo entrecomillado: "…", “…”, «…» o '…'. */
const ENTRE_COMILLAS = /["“«']([^"”»']+)["”»']/

/**
 * Extrae los fragmentos griegos del texto, minando transliteración y glosa de
 * los patrones habituales:
 *  - `ἐξηγητής (exēgētēs)`             → translit en paréntesis posterior
 *  - `hēgeisthai (ἡγεῖσθαι)`           → translit justo antes del paréntesis
 *  - `…, que significa "guiar"`        → glosa en la cola cercana
 * Deduplica por forma normalizada (sin diacríticos).
 */
export function extractGreekFragments(text: string): GreekFragment[] {
  const clean = text.replace(INVISIBLES, '')
  const vistos = new Map<string, GreekFragment>()
  for (const m of clean.matchAll(PALABRA_GRIEGA)) {
    const gr = m[0]
    const clave = normalizeGreek(gr)
    if (!clave) continue
    const frag: GreekFragment = { gr }
    const despues = clean.slice(m.index + gr.length)
    const antes = clean.slice(0, m.index)

    // ¿Paréntesis inmediatamente después? → puede traer translit y/o glosa.
    const paren = /^[\s,]*\(([^)]{1,80})\)/.exec(despues)
    if (paren) {
      const dentro = paren[1]
      const glosa = ENTRE_COMILLAS.exec(dentro)
      if (glosa) frag.gloss = glosa[1].trim()
      const candidato = dentro
        .split(/[,;]/)[0]
        .trim()
      if (!frag.translit && TRANSLIT.test(candidato)) frag.translit = candidato
    }
    // ¿El fragmento está él mismo entre paréntesis? → la palabra latina anterior
    // al "(": p. ej. `hēgeisthai (ἡγεῖσθαι)`.
    if (!frag.translit) {
      const previa = /([\p{L}ĀĒĪŌŪāēīōū'-]+)[\s]*\($/u.exec(antes)
      if (previa && TRANSLIT.test(previa[1])) frag.translit = previa[1]
    }
    // Glosa en la cola: `…, que significa "guiar", "conducir"…`.
    if (!frag.gloss) {
      const cola = despues.slice(0, 90)
      const sig = /significa\s+["“«']([^"”»']+)["”»']/i.exec(cola)
      if (sig) frag.gloss = sig[1].trim()
    }

    const previo = vistos.get(clave)
    if (!previo) {
      vistos.set(clave, frag)
    } else {
      // Ya visto: completa lo que falte, no dupliques.
      if (!previo.translit && frag.translit) previo.translit = frag.translit
      if (!previo.gloss && frag.gloss) previo.gloss = frag.gloss
    }
  }
  return [...vistos.values()]
}

/** Clave normalizada de un fragmento (para agrupar entre palabras distintas). */
export function greekKey(gr: string): string {
  return normalizeGreek(gr)
}

/**
 * ¿El texto contiene alguna letra griega? Es el criterio de entrada de la
 * feature: esta sección estudia SOLO las palabras que traen griego en su
 * texto (palabra o comentario); el resto del vocabulario vive en Nous.
 */
export function hasGreek(text: string): boolean {
  return /[\u0370-\u03ff\u1f00-\u1fff]/.test(text)
}
