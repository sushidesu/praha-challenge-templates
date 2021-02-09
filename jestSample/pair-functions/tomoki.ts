import nodeFetch from "node-fetch";

/**
 * 受け取った配列の要素をソートして同じものをまとめる関数
 * @param {ReadonlyArray<T>} array - 配列
 * @example
 * sortAndClassify([3, 2, 2, 1])
 * // [[1], [2, 2], [3]]
 */
export const sortAndPartition = <T>(array: readonly T[]): T[][] => {
  if (!Array.isArray(array)) {
    throw Error("Only arrays are allowed");
  }

  const sorted = array.slice().sort();
  const result: T[][] = [];
  let index = 0;

  if (sorted.length === 0) {
    return [];
  } else {
    result.push([sorted.shift() as T]);
  }

  sorted.forEach((cur) => {
    const prev = result[index][0];
    if (prev === cur) {
      result[index].push(cur);
    } else {
      index++;
      result.push([cur]);
    }
  });
  return result;
};

export interface JokeApiResponse {
  joke: string;
}

/**
 * apiから取得した文の単語数をカウントする
 *
 * "I have a pen." -> 4
 */
export const countWordsOfJoke = async (): Promise<number> => {
  const RANDOM_JOKE_API = "https://some-random-api.ml/joke";
  const response = await nodeFetch(RANDOM_JOKE_API);
  const result = (await response.json()) as JokeApiResponse;

  return result.joke.split(" ").filter((word) => word !== "").length;
};

interface FrequencyResult {
  [key: string]: number;
}

/**
 * 単語の出現頻度をカウントする
 * @param {string} str - 文字列
 * @example
 * frequencyOfWordOccurrence("a b a")
 * // { a: 2, b: 1 }
 */
export const frequencyOfWordOccurrence = (str: string): FrequencyResult => {
  return str
    .split(" ")
    .filter((w) => w !== "")
    .reduce<FrequencyResult>((prev, cur) => {
      if (Object.prototype.hasOwnProperty.call(prev, cur)) {
        prev[cur]++;
      } else {
        prev[cur] = 1;
      }
      return prev;
    }, {});
};
