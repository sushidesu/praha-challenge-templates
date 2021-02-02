import { sumOfArray } from "../functions"

describe("sumOfArray() は数の配列の要素を合計する", () => {
  it("[1, 1] を渡すと 2 を返す", () => {
    expect(sumOfArray([1, 1])).toBe(2)
  })

  it("[] を渡すとエラーになる", () => {
    expect(() => sumOfArray([])).toThrowError()
  })

  it("文字列を渡すとエラーになる", () => {
    expect(() => sumOfArray("[1, 1]")).toThrowError()
  })
})
