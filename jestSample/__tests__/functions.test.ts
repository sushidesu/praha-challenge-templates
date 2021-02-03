import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from "../functions"
import { NameApiService } from "../nameApiService"
import { DatabaseMock } from "../util"

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

describe("asyncSumOfArraySometimesZero() は数の配列をデータベースに保存し、数の配列の要素を合計する", () => {
  let mockSaveAlwaysSuccess: DatabaseMock["save"]
  beforeEach(() => {
    mockSaveAlwaysSuccess = jest.fn()
  })

  describe("エラーが発生しない場合 数の配列の要素を合計する", () => {
    it("[1, 1] を渡すと 2 を返す", async () => {
      await expect(
        asyncSumOfArraySometimesZero([1, 1], mockSaveAlwaysSuccess)
      ).resolves.toBe(2)
    })
  })

  describe("エラーが発生した場合 0 を返す", () => {
    it("[] を渡すと 0 を返す", async () => {
      await expect(
        asyncSumOfArraySometimesZero([], mockSaveAlwaysSuccess)
      ).resolves.toBe(0)
    })

    it("文字列を渡すと 0 を返す", async () => {
      await expect(
        asyncSumOfArraySometimesZero("[1, 1]", mockSaveAlwaysSuccess)
      ).resolves.toBe(0)
    })

    it("DatabaseMock.save() が失敗した場合は 0 を返す", async () => {
      const mockSaveAlwaysThrowError = jest.fn(() => {
        throw Error()
      })
      await expect(
        asyncSumOfArraySometimesZero([1, 1], mockSaveAlwaysThrowError)
      ).resolves.toBe(0)
    })
  })
})

describe("getFirstNameThrowIfLong() は NameApiService から firstName を取得する", () => {
  let mockGetFirstNameA: NameApiService["getFirstName"]
  beforeEach(() => {
    mockGetFirstNameA = jest.fn(async () => "A")
  })

  describe("firstName.length <= maxNameLength の場合 firstNameを返す", () => {
    it(`maxNameLength = 1, firstName = "A" の場合 "A" を返す`, async () => {
      await expect(getFirstNameThrowIfLong(1, mockGetFirstNameA)).resolves.toBe(
        "A"
      )
    })
  })

  describe("maxNameLength < firstName.length の場合 エラーになる", () => {
    it(`maxNameLength = 0, firstName = "A" の場合 エラーになる`, async () => {
      await expect(
        getFirstNameThrowIfLong(0, mockGetFirstNameA)
      ).rejects.toThrowError()
    })
  })

  it("NameApiServiceからの取得に失敗した場合 エラーになる", async () => {
    const mockGetFirstNameAlwaysThrowError = jest.fn(async () => {
      throw new Error()
    })
    await expect(
      getFirstNameThrowIfLong(1, mockGetFirstNameAlwaysThrowError)
    ).rejects.toThrowError()
  })
})
