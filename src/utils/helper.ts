/**
 * Remove todos as duplicidades de um array
 * @example
 *  // yields ["apple", "banana", "orange"]
 *  arrayRemoveEmpty(["apple", "banana", "banana", "orange"])
 */
export function arrayRemoveDuplicates<G>(arrayValue: Array<G>) {
  // return [...new Set(array)]; // Por benchmark, filter no nosso caso é mais rapido
  return arrayValue.filter((value, index) => {
    return arrayValue.indexOf(value) === index;
  });
}

/**
 * Retorna verdadeiro se o valor passado não for undefined, null e nem uma string vazia.
 * Essa funcao não tem suporte para Arrays e objetos e retornara true indenpendente do valor.
 */
export function hasValue<G>(value: G): value is NonNullable<G> {
  if (typeof value === 'undefined') return false;
  if (value === null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return true;
}

export function valueAsString<
  P extends boolean | FormDataEntryValue | null | number | string | undefined,
  R = P extends boolean | FormDataEntryValue | number | string ? string : undefined,
>(value: P) {
  if (typeof value === 'string') return value as R;
  if (value === false) return '0' as R;
  if (value === 0) return '0' as R;
  if (!value) return undefined as R;
  if (value === true) return '1' as R;
  return value.toString() as R;
}
