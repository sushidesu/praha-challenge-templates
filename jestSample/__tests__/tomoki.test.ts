import {
  sortAndPartition,
  countWordsOfJoke,
  JokeApiResponse,
  frequencyOfWordOccurrence,
} from "../pair-functions/tomoki"
import nodeFetch from "node-fetch"

describe("sortAndPartition() は受け取った配列の要素をソートして同じものをまとめる関数", () => {
  describe("リストに分類する", () => {
    it(`["a", "b", "a"] を受け取ると [["a", "a"], ["b"]] を返す`, () => {
      expect(sortAndPartition(["a", "b", "a"])).toEqual([["a", "a"], ["b"]])
    })

    it(`[null, undefined] を受け取ると [[null], [undefined]] を返す`, () => {
      expect(sortAndPartition([null, undefined])).toEqual([[null], [undefined]])
    })

    it(`[] を受け取ると []を返す`, () => {
      expect(sortAndPartition([])).toEqual([])
    })

    it(`[1] を受け取ると [[1]] を返す`, () => {
      expect(sortAndPartition([1])).toEqual([[1]])
    })

    it(`[3, 2, 1] を受け取ると [[1], [2], [3]] を返す`, () => {
      expect(sortAndPartition([3, 2, 1])).toEqual([[1], [2], [3]])
    })

    it(`大きなリスト`, () => {
      const LENGTH = 1000000
      const veryBigArray = Array.from({ length: LENGTH }).map((_, i) => i)
      expect(sortAndPartition(veryBigArray).length).toEqual(LENGTH)
    })
  })

  describe("リスト以外を受け取るとエラーになる", () => {
    it(`"[]" を受け取ると エラーになる`, () => {
      expect(() => sortAndPartition("[]")).toThrowError()
    })
  })
})

jest.mock("node-fetch")
const response = (joke: string) => {
  const res: JokeApiResponse = {
    joke,
  }
  return {
    json: async () => res,
  }
}

describe("apiから取得した文の単語数をカウントする", () => {
  describe("単語数を返す", () => {
    it(`"I have a pen." を取得すると 4 を返す`, async () => {
      ;((nodeFetch as unknown) as jest.Mock).mockResolvedValue(
        response("I have a pen.")
      )
      await expect(countWordsOfJoke()).resolves.toBe(4)
    })

    it(`"" を受け取ると 0 を返す`, async () => {
      ;((nodeFetch as unknown) as jest.Mock).mockResolvedValue(response(""))
      await expect(countWordsOfJoke()).resolves.toBe(0)
    })
  })

  describe("取得に失敗するとエラーになる", () => {
    it("fetch中にエラーが発生すると エラーになる", async () => {
      ;((nodeFetch as unknown) as jest.Mock).mockImplementation(async () => {
        throw Error()
      })

      await expect(countWordsOfJoke()).rejects.toThrowError()
    })
  })
})

describe("frequencyOfWordOccurrence() は単語の出現頻度をカウントする", () => {
  describe("単語の出現頻度をカウントする", () => {
    it(`"a a b" を受け取ると { a: 2, b: 1 } を返す`, () => {
      expect(frequencyOfWordOccurrence("a a b")).toEqual({
        a: 2,
        b: 1
      })
    })

    it(`"" を受け取ると {} を返す`, () => {
      expect(frequencyOfWordOccurrence("")).toEqual({})
    })
  })

  describe("文字列以外を受け取るとエラーになる", () => {
    it(`100 を受け取るとエラーになる`, () => {
      expect(() => frequencyOfWordOccurrence(100)).toThrowError()
    })
  })
})
