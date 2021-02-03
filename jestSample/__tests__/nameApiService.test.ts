import axios from "axios"
import { NameApiService } from "../nameApiService"

type Data = {
  data: { first_name: string }
}

const makeResponse = (firstName: string): Data => ({
  data: {
    first_name: firstName,
  },
})

describe("NameApiServiceクラス", () => {
  let nameApiService: NameApiService
  beforeEach(() => {
    nameApiService = new NameApiService()
  })

  describe("getFirstName() は APIから名前を取得する", () => {
    describe("取得した first_name が4文字以下の場合 first_name を返す", () => {
      it(`"name" を取得した場合 "name" を返す`, async () => {
        jest.spyOn(axios, "get").mockResolvedValue(makeResponse("name"))
        await expect(nameApiService.getFirstName()).resolves.toBe("name")
      })
    })

    describe("first_name が4文字より長い場合 エラーになる", () => {
      it(`"12345" を取得した場合 エラーになる`, async () => {
        jest.spyOn(axios, "get").mockResolvedValue(makeResponse("12345"))
        await expect(nameApiService.getFirstName()).rejects.toThrowError()
      })
    })

    describe("APIからの取得に失敗した場合 エラーになる", () => {
      it("APIがエラーになった場合 エラーになる", async () => {
        jest.spyOn(axios, "get").mockImplementation(async () => {
          throw Error()
        })
        await expect(nameApiService.getFirstName()).rejects.toThrowError()
      })

      it("取得したデータにfirst_nameが含まれなかった場合 エラーになる", async () => {
        jest.spyOn(axios, "get").mockResolvedValue({ data: null })
        await expect(nameApiService.getFirstName()).rejects.toThrowError()
      })
    })
  })
})
