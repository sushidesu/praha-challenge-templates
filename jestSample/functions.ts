import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";

export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number => a + b);
};

export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

export const asyncSumOfArraySometimesZero = (
  numbers: number[],
  save: DatabaseMock["save"]
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};

export const getFirstNameThrowIfLong = async (
  maxNameLength: number
): Promise<string> => {
  const nameApiSerivce = new NameApiService(); // fixme: この関数をテストするには、NameApiServiceの使い方を変える必要がありそう！ヒント：依存性の注入
  const firstName = await nameApiSerivce.getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return firstName;
};
