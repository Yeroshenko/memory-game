const charCodeA = 'A'.charCodeAt(0) // 65

export const allEquals = (xs) => {
  if (xs.length < 2) {
    return true
  }
  const [head, ...tail] = xs
  const checker = (elem) => elem === head

  return tail.every(checker)
}

export const range = (startAt = 0, size) => (
  [...Array(size).keys()].map(i => i + startAt)
)

export const toCharCodes = (arr) => (
  arr.map(i => String.fromCharCode(i + charCodeA))
)

export const duplicateArrValues = (arr) => arr.flatMap(x => [x, x])
