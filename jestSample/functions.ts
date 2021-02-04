import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";

export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((prev: number, cur: number): number => {
    if (isNaN(cur) || typeof cur !== "number") throw Error("Only numbers are allowed");
    return prev + cur;
  }, 0);
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
  maxNameLength: number,
  getFirstName: NameApiService["getFirstName"]
): Promise<string> => {
  const firstName = await getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return firstName;
};
