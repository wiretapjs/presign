export default function (string) {
  return string.split('').reduce((accumulator, character) => {
    accumulator = ((accumulator << 5) - accumulator) + character.charCodeAt(0)
    return accumulator & accumulator
  }, 0)
}
