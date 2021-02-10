import axios from "axios"
import { FinancialApiService } from "../pair-functions/kooooichi24/financialApiService"
import {
  shouldBuy,
  asyncShouldBuy,
  asyncShouldBuyBySymbol,
} from "../pair-functions/kooooichi24/quiz"
import { Quiz2 } from "../pair-functions/kooooichi24/quiz2"

describe("shouldBuy() は株式の購入判定を返す", () => {
  describe("購入希望金額 が 100 以上の場合 true を返す", () => {
    it("100 を受け取ると true を返す", () => {
      expect(shouldBuy(100)).toBe(true)
    })
    it("101 を受け取ると true を返す", () => {
      expect(shouldBuy(101)).toBe(true)
    })
  })

  describe("購入希望金額 が 100 未満の場合 false を返す", () => {
    it("99 を受け取ると false を返す", () => {
      expect(shouldBuy(99)).toBe(false)
    })
  })
})

describe("asyncShouldBuy() は株式の購入判定を返す", () => {
  describe("購入希望金額が 100 以上の場合 true を返す", () => {
    it("100 を受け取ると true を返す", async () => {
      await expect(asyncShouldBuy(100)).resolves.toBe(true)
    })
    it("101 を受け取ると true を返す", async () => {
      await expect(asyncShouldBuy(101)).resolves.toBe(true)
    })
  })

  describe("購入希望金額が 100 未満の場合 false を返す", () => {
    it("99 を受け取ると false を返す", async () => {
      await expect(asyncShouldBuy(99)).resolves.toBe(false)
    })
  })
})

describe("asyncShouldBuyBySymbol() は株式の購入判定を返す", () => {
  let financialApiServiceMock: FinancialApiService
  beforeEach(() => {
    financialApiServiceMock = new FinancialApiService()
    jest.spyOn(financialApiServiceMock, "getPrice").mockResolvedValue(100)
  })

  describe("購入希望金額 >= 株価 の場合 true を返す", () => {
    it("購入希望金額 100, 株価 100 の場合 true を返す", async () => {
      await expect(
        asyncShouldBuyBySymbol(financialApiServiceMock, 100, "test")
      ).resolves.toBe(true)
    })
    it("購入希望金額 101, 株価 100 の場合 true を返す", async () => {
      await expect(
        asyncShouldBuyBySymbol(financialApiServiceMock, 101, "test")
      ).resolves.toBe(true)
    })
  })

  describe("購入希望金額 < 株価 の場合 false を返す", () => {
    it("購入希望金額 99, 株価 100 の場合 true を返す", async () => {
      await expect(
        asyncShouldBuyBySymbol(financialApiServiceMock, 99, "test")
      ).resolves.toBe(false)
    })
  })
})

describe("Quiz2クラス", () => {
  let quiz2: Quiz2
  let financialApiServiceMock: FinancialApiService
  beforeEach(() => {
    financialApiServiceMock = new FinancialApiService()
    jest.spyOn(financialApiServiceMock, "getPrice").mockResolvedValue(100)
    quiz2 = new Quiz2(financialApiServiceMock)
  })

  describe("購入希望価格 >= 株価の場合 true を返す", () => {
    it("購入希望価格 100, 株価 100 の場合 true を返す", async () => {
      await expect(quiz2.asyncShouldBuyBySymbol(100, "test")).resolves.toBe(
        true
      )
    })
    it("購入希望価格 101, 株価 100 の場合 true を返す", async () => {
      await expect(quiz2.asyncShouldBuyBySymbol(101, "test")).resolves.toBe(
        true
      )
    })
  })

  describe("購入希望価格 < 株価の場合 false を返す", () => {
    it("購入希望価格 99, 株価 100 の場合 false を返す", async () => {
      await expect(quiz2.asyncShouldBuyBySymbol(99, "test")).resolves.toBe(
        false
      )
    })
  })
})

describe("FinancialApiServiceクラス", () => {
  let financialApiService: FinancialApiService
  beforeEach(() => {
    financialApiService = new FinancialApiService()
  })

  describe("getPrice() は APIから株価を取得する", () => {
    it("[{ price: 100 }] をAPIから取得すると 100 を返す", async () => {
      jest.spyOn(axios, "get").mockResolvedValue({ data: [{ price: 100 }] })
      await expect(financialApiService.getPrice("test")).resolves.toBe(100)
    })
  })
})
