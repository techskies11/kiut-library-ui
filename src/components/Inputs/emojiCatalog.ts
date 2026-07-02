/**
 * Brand-safe emoji catalog for Kiut products.
 * Curated to exclude offensive, explicit, or weapon-related characters.
 */

export type EmojiCategoryId =
  | 'smileys'
  | 'gestures'
  | 'symbols'
  | 'travel'
  | 'objects';

export interface EmojiCatalogEntry {
  char: string;
  /** Optional search terms (Spanish / English) */
  terms?: readonly string[];
}

export interface EmojiCategoryDefinition {
  id: EmojiCategoryId;
  emojis: readonly EmojiCatalogEntry[];
}

export const DEFAULT_CATEGORY_LABELS: Record<EmojiCategoryId, string> = {
  smileys: 'Smileys',
  gestures: 'Gestos',
  symbols: 'Símbolos',
  travel: 'Viajes',
  objects: 'Objetos',
};

export const DEFAULT_EMOJI_CATALOG: readonly EmojiCategoryDefinition[] = [
  {
    id: 'smileys',
    emojis: [
      { char: '😀', terms: ['feliz', 'happy', 'sonrisa', 'grin'] },
      { char: '😃', terms: ['feliz', 'happy', 'ojos', 'smile'] },
      { char: '😄', terms: ['feliz', 'happy', 'sonrisa'] },
      { char: '😁', terms: ['feliz', 'beam', 'sonrisa'] },
      { char: '😆', terms: ['risa', 'laugh', 'squint'] },
      { char: '😅', terms: ['risa', 'sudor', 'nervioso'] },
      { char: '🤣', terms: ['risa', 'rofl', 'laugh'] },
      { char: '😂', terms: ['risa', 'llorar', 'joy', 'tears'] },
      { char: '🙂', terms: ['sonrisa', 'smile', 'slight'] },
      { char: '🙃', terms: ['invertido', 'upsidedown'] },
      { char: '😉', terms: ['guiño', 'wink'] },
      { char: '😊', terms: ['sonrisa', 'blush', 'timido'] },
      { char: '😇', terms: ['angel', 'halo', 'inocente', 'santo'] },
      { char: '🥰', terms: ['amor', 'love', 'corazon'] },
      { char: '😍', terms: ['amor', 'heart eyes', 'corazon'] },
      { char: '🤩', terms: ['estrella', 'star', 'wow'] },
      { char: '😘', terms: ['beso', 'kiss'] },
      { char: '☺️', terms: ['sonrisa', 'smile'] },
      { char: '😚', terms: ['beso', 'kiss'] },
      { char: '🥲', terms: ['sonrisa', 'lagrima', 'gratitud'] },
      { char: '😋', terms: ['rico', 'yummy', 'delicioso'] },
      { char: '😛', terms: ['lengua', 'tongue', 'playful'] },
      { char: '😜', terms: ['lengua', 'wink', 'travieso'] },
      { char: '🤪', terms: ['loco', 'zany', 'divertido'] },
      { char: '🤗', terms: ['abrazo', 'hug'] },
      { char: '🤭', terms: ['ups', 'oops', 'timido'] },
      { char: '🤫', terms: ['shh', 'silencio', 'secret'] },
      { char: '🤔', terms: ['pensar', 'think', 'duda'] },
      { char: '🤐', terms: ['silencio', 'zip', 'boca'] },
      { char: '😐', terms: ['neutral', 'serio'] },
      { char: '😶', terms: ['sin boca', 'silencio'] },
      { char: '😌', terms: ['aliviado', 'relieved', 'calma'] },
      { char: '😴', terms: ['dormir', 'sleep', 'sueno'] },
      { char: '😷', terms: ['mask', 'mascarilla', 'enfermo'] },
      { char: '🤒', terms: ['enfermo', 'sick', 'termometro'] },
      { char: '🤕', terms: ['herido', 'injured', 'vendaje'] },
      { char: '🥳', terms: ['fiesta', 'party', 'celebracion'] },
      { char: '🥸', terms: ['disfraz', 'disguise'] },
      { char: '😎', terms: ['cool', 'gafas', 'sunglasses'] },
      { char: '🤓', terms: ['nerd', 'estudioso'] },
      { char: '😮', terms: ['sorpresa', 'wow', 'open mouth'] },
      { char: '😯', terms: ['sorpresa', 'hushed'] },
      { char: '😲', terms: ['asombrado', 'astonished'] },
      { char: '😳', terms: ['sonrojo', 'flushed', 'verguenza'] },
      { char: '🥺', terms: ['por favor', 'please', 'puppy'] },
      { char: '😢', terms: ['triste', 'sad', 'cry'] },
      { char: '😭', terms: ['llorar', 'cry', 'sad'] },
      { char: '😱', terms: ['susto', 'scream', 'shock'] },
      { char: '🫡', terms: ['saludo', 'salute', 'respeto'] },
    ],
  },
  {
    id: 'gestures',
    emojis: [
      { char: '👍', terms: ['ok', 'bien', 'thumbs up', 'like'] },
      { char: '👏', terms: ['aplauso', 'clap', 'bravo'] },
      { char: '🙏', terms: ['gracias', 'thanks', 'please', 'rezo'] },
      { char: '🙌', terms: ['celebrar', 'raise hands', 'hurra'] },
      { char: '👌', terms: ['ok', 'perfecto', 'bien'] },
      { char: '✌️', terms: ['paz', 'peace', 'victoria'] },
      { char: '🤝', terms: ['apretón', 'handshake', 'acuerdo'] },
      { char: '💪', terms: ['fuerte', 'strong', 'musculo'] },
      { char: '🤞', terms: ['suerte', 'fingers crossed', 'cruzar'] },
      { char: '👋', terms: ['hola', 'wave', 'adios', 'saludo'] },
      { char: '🫶', terms: ['corazon', 'heart hands', 'amor'] },
      { char: '👐', terms: ['manos', 'open hands', 'abrazo'] },
      { char: '👇', terms: ['abajo', 'down', 'señalar'] },
      { char: '👆', terms: ['arriba', 'up', 'señalar'] },
      { char: '☝️', terms: ['arriba', 'up', 'uno'] },
      { char: '🤙', terms: ['llamar', 'call', 'shaka'] },
      { char: '✋', terms: ['alto', 'stop', 'mano'] },
      { char: '🖐️', terms: ['mano', 'hi', 'cinco'] },
    ],
  },
  {
    id: 'symbols',
    emojis: [
      { char: '❤️', terms: ['corazon', 'heart', 'amor', 'love'] },
      { char: '🧡', terms: ['corazon', 'naranja', 'orange'] },
      { char: '💛', terms: ['corazon', 'amarillo', 'yellow'] },
      { char: '💚', terms: ['corazon', 'verde', 'green'] },
      { char: '💙', terms: ['corazon', 'azul', 'blue'] },
      { char: '💜', terms: ['corazon', 'morado', 'purple'] },
      { char: '🤍', terms: ['corazon', 'blanco', 'white'] },
      { char: '💕', terms: ['corazones', 'hearts', 'amor'] },
      { char: '💞', terms: ['corazones', 'revolving', 'amor'] },
      { char: '💓', terms: ['corazon', 'latido', 'beating'] },
      { char: '💗', terms: ['corazon', 'creciendo', 'growing'] },
      { char: '💖', terms: ['corazon', 'brillo', 'sparkling'] },
      { char: '💘', terms: ['corazon', 'flecha', 'cupid'] },
      { char: '💝', terms: ['corazon', 'regalo', 'gift'] },
      { char: '⭐', terms: ['estrella', 'star'] },
      { char: '🌟', terms: ['estrella', 'brillo', 'glow'] },
      { char: '✨', terms: ['brillo', 'sparkles', 'magic'] },
      { char: '⚡', terms: ['rayo', 'lightning', 'energia'] },
      { char: '✅', terms: ['check', 'ok', 'listo', 'done'] },
      { char: '✔️', terms: ['check', 'ok', 'marcar'] },
      { char: '☑️', terms: ['check', 'casilla', 'box'] },
      { char: '💯', terms: ['cien', '100', 'perfecto'] },
      { char: 'ℹ️', terms: ['info', 'informacion'] },
      { char: '❓', terms: ['pregunta', 'question'] },
      { char: '❗', terms: ['importante', 'exclamation'] },
      { char: '➕', terms: ['mas', 'plus', 'sumar'] },
      { char: '➖', terms: ['menos', 'minus'] },
    ],
  },
  {
    id: 'travel',
    emojis: [
      { char: '✈️', terms: ['avion', 'plane', 'vuelo', 'flight'] },
      { char: '🛫', terms: ['despegue', 'departure', 'vuelo'] },
      { char: '🛬', terms: ['aterrizaje', 'arrival', 'vuelo'] },
      { char: '🧳', terms: ['maleta', 'luggage', 'equipaje'] },
      { char: '🛄', terms: ['equipaje', 'baggage', 'reclamar'] },
      { char: '🎫', terms: ['boleto', 'ticket', 'entrada'] },
      { char: '🗺️', terms: ['mapa', 'map', 'ruta'] },
      { char: '🌍', terms: ['mundo', 'world', 'globo', 'europa'] },
      { char: '🌎', terms: ['mundo', 'americas', 'globo'] },
      { char: '🌏', terms: ['mundo', 'asia', 'globo'] },
      { char: '🏖️', terms: ['playa', 'beach', 'vacaciones'] },
      { char: '🏝️', terms: ['isla', 'island', 'vacaciones'] },
      { char: '🌅', terms: ['amanecer', 'sunrise', 'sol'] },
      { char: '🌄', terms: ['montaña', 'sunrise', 'amanecer'] },
      { char: '🚗', terms: ['auto', 'car', 'coche'] },
      { char: '🚕', terms: ['taxi', 'cab'] },
      { char: '🚌', terms: ['bus', 'autobus'] },
      { char: '🏨', terms: ['hotel', 'hospedaje'] },
      { char: '🛩️', terms: ['avion', 'small plane'] },
      { char: '🚂', terms: ['tren', 'train'] },
      { char: '🚆', terms: ['tren', 'tram', 'metro'] },
      { char: '🚢', terms: ['barco', 'ship', 'crucero'] },
      { char: '⛵', terms: ['velero', 'sailboat', 'barco'] },
      { char: '🗼', terms: ['torre', 'tower', 'landmark'] },
      { char: '🏛️', terms: ['monumento', 'classical', 'edificio'] },
    ],
  },
  {
    id: 'objects',
    emojis: [
      { char: '📱', terms: ['telefono', 'phone', 'mobile', 'celular'] },
      { char: '💻', terms: ['laptop', 'computadora', 'computer'] },
      { char: '⌚', terms: ['reloj', 'watch', 'hora'] },
      { char: '📷', terms: ['camara', 'camera', 'foto'] },
      { char: '🎁', terms: ['regalo', 'gift', 'present'] },
      { char: '🎉', terms: ['fiesta', 'party', 'celebracion'] },
      { char: '🎊', terms: ['confeti', 'confetti', 'fiesta'] },
      { char: '🎈', terms: ['globo', 'balloon', 'fiesta'] },
      { char: '📅', terms: ['calendario', 'calendar', 'fecha'] },
      { char: '📆', terms: ['calendario', 'date', 'fecha'] },
      { char: '✉️', terms: ['correo', 'email', 'carta', 'mail'] },
      { char: '📧', terms: ['email', 'correo'] },
      { char: '📝', terms: ['nota', 'memo', 'escribir'] },
      { char: '📋', terms: ['clipboard', 'lista', 'checklist'] },
      { char: '📌', terms: ['pin', 'chincheta', 'fijar'] },
      { char: '📎', terms: ['clip', 'adjunto', 'paperclip'] },
      { char: '🔗', terms: ['link', 'enlace', 'url'] },
      { char: '🔑', terms: ['llave', 'key', 'acceso'] },
      { char: '💡', terms: ['idea', 'bombilla', 'light'] },
      { char: '🔔', terms: ['campana', 'bell', 'notificacion'] },
      { char: '📞', terms: ['telefono', 'call', 'llamar'] },
      { char: '☎️', terms: ['telefono', 'phone'] },
      { char: '🛍️', terms: ['compras', 'shopping', 'bolsa'] },
      { char: '🧾', terms: ['recibo', 'receipt', 'factura'] },
    ],
  },
] as const;

export interface EmojiPickerCategory {
  id: EmojiCategoryId;
  label: string;
  emojis: string[];
}

function entryMatchesQuery(entry: EmojiCatalogEntry, query: string): boolean {
  if (entry.char.includes(query)) return true;
  return entry.terms?.some((term) => term.toLowerCase().includes(query)) ?? false;
}

/**
 * Filter catalog categories by search query and optional category label match.
 */
export function filterEmojiCatalog(
  catalog: readonly EmojiCategoryDefinition[],
  labels: Record<EmojiCategoryId, string>,
  query: string
): EmojiPickerCategory[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return catalog.map((category) => ({
      id: category.id,
      label: labels[category.id],
      emojis: category.emojis.map((entry) => entry.char),
    }));
  }

  return catalog
    .map((category) => {
      const categoryMatches =
        labels[category.id]?.toLowerCase().includes(normalizedQuery) ||
        category.id.includes(normalizedQuery);

      const emojis = category.emojis
        .filter(
          (entry) => categoryMatches || entryMatchesQuery(entry, normalizedQuery)
        )
        .map((entry) => entry.char);

      return {
        id: category.id,
        label: labels[category.id],
        emojis,
      };
    })
    .filter((category) => category.emojis.length > 0);
}

export function buildDefaultCategories(
  categoryLabels?: Partial<Record<EmojiCategoryId, string>>
): EmojiPickerCategory[] {
  const labels = {
    ...DEFAULT_CATEGORY_LABELS,
    ...categoryLabels,
  };

  return DEFAULT_EMOJI_CATALOG.map((category) => ({
    id: category.id,
    label: labels[category.id],
    emojis: category.emojis.map((entry) => entry.char),
  }));
}
