import { FinancialApiService } from "./financialApiService";

/**
 * 株式の購入判定を返す同期関数。
 *
 * 購入希望金額 >= 株価 の場合、trueを返す。
 * 購入希望金額 < 株価 の場合、falseを返す。
 *
 * @param orderBuyingPrice - 購入希望金額
 * @returns 購入判断結果
 */
export const shouldBuy = (orderBuyingPrice: number): boolean => {
  const STOCK_PRICE = 100;

  if (orderBuyingPrice >= STOCK_PRICE) {
    return true;
  } else {
    return false;
  }
};

/**
 * 株式の購入判定を返す非同期関数。
 *
 * 購入希望金額 >= 株価 の場合、trueを返す。
 * 購入希望金額 < 株価 の場合、falseを返す。
 *
 * @param orderBuyingPrice - 購入希望金額
 */
export const asyncShouldBuy = (orderBuyingPrice: number): Promise<boolean> => {
  return new Promise((resolve): void => {
    resolve(shouldBuy(orderBuyingPrice));
  });
};

/**
 * 株式の購入判定を返す非同期関数。
 *
 * 購入希望金額 >= 株価 の場合、trueを返す。
 * 購入希望金額 < 株価 の場合、falseを返す。
 *
 * @param financialApiService - FinancialApiServiceのインスタンス
 * @param orderBuyingPrice - 購入希望金額
 * @param symbol - ティッカーシンボル
 * @returns 購入判断結果
 */
export const asyncShouldBuyBySymbol = async (
  financialApiService: FinancialApiService,
  orderBuyingPrice: number,
  symbol: string
): Promise<boolean> => {
  const currentStockPrice = await financialApiService.getPrice(symbol);

  if (orderBuyingPrice >= currentStockPrice) {
    return true;
  } else {
    return false;
  }
};
