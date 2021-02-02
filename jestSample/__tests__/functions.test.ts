import { sumOfArray, asyncSumOfArray } from "../functions"

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

describe("asyncSumOfArray() は数の配列の要素を非同期で合計する", () => {
  it("[1, 1] を渡すと 2 を返す", async () => {
    await expect(asyncSumOfArray([1, 1])).resolves.toBe(2)
  })

  it("[] を渡すとエラーになる", async () => {
    await expect(asyncSumOfArray([])).rejects.toThrowError()
  })

  it("文字列を渡すとエラーになる", async () => {
    await expect(asyncSumOfArray("[1, 1]")).rejects.toThrowError()
  })
})
