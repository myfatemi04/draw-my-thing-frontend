export default function replaceStringCharacter(
  string: string,
  index: number,
  letter: string
) {
  return string.slice(0, index) + letter + string.slice(index + 1);
}
