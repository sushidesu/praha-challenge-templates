import axios from "axios";

/**
 * Financial Modeling Prep API を管理するクラス。
 *
 * URL: https://financialmodelingprep.com/developer/docs/#Company-Quote
 */
export class FinancialApiService {
  private BASE_URL = "https://financialmodelingprep.com";
  public constructor() {}

  /**
   * 株価を取得する関数。
   *
   * @returns 株価
   */
  public async getPrice(symbol: string): Promise<number> {
    const { data } = await axios.get(
      `${this.BASE_URL}/api/v3/quote/${symbol}?apikey=demo`
    );

    return data[0].price;
  }
}
