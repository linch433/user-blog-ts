export function hasMoreThanTwoWords(text: string | number): boolean {
  const strText = text.toString();
  const words = strText.split(/\s+/);

  return words.length > 2;
}
