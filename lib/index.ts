const charCodeA = 'A'.charCodeAt(0) // 65

type truthy =  string | number | object | string[] | number[] | object[]

export const allEquals = (xs: Array<number | string>): boolean => {
  if (xs.length < 2) {
    return true
  }
  const [head, ...tail] = xs
  const checker = (elem: number | string) => elem === head

  return tail.every(checker)
}

export const pipe = (arg: any, ...fns: Array<Function>) => (
  fns.reduce((prev, fn) => fn(prev), arg)
)

export const range = (startAt = 0, size: number): Array<number> => (
  [...Array(size).keys()].map(i => i + startAt)
)

export const toCharCodes = (arr: Array<number>): Array<string> => (
  arr.map(i => String.fromCharCode(i + charCodeA))
)

export const duplicateArrValues = (arr: Array<truthy>): Array<truthy> => (
  arr.flatMap(x => [x, x])
)
