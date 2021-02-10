import { FinancialApiService } from "./financialApiService";

/**
 * quiz.ts のファイルをクラス形式Ver
 */
export class Quiz2 {
  private financialApiService: FinancialApiService;

  /**
   * Quiz2 のコンストラクタ
   *
   * @param financialApiService FinancialApiService インスタンス
   */
  public constructor(financialApiService: FinancialApiService) {
    this.financialApiService = financialApiService;
  }

  /**
   * Appleの株式の購入判定を返す非同期関数。
   *
   * 購入希望金額 >= 株価 の場合、trueを返す。
   * 購入希望金額 < 株価 の場合、falseを返す。
   *
   * @param orderBuyingPrice - 購入希望金額
   * @param symbol - ティッカーシンボル
   * @returns 購入判断結果
   */
  public async asyncShouldBuyBySymbol(
    orderBuyingPrice: number,
    symbol: string
  ): Promise<boolean> {
    const currentStockPrice = await this.financialApiService.getPrice(symbol);

    if (orderBuyingPrice >= currentStockPrice) {
      return true;
    } else {
      return false;
    }
  }
}
