# jestで単体テストを書こう

## 課題3

### 1

> なぜカバレッジ100にならない？

振舞いの予測できない外部のコードに依存しており、期待通りに動作させられなかったから。

### 2

> 依存性の注入とは？どんな問題を解決する？結合度の強さはどうなった？

依存関係を取り除き、コンポーネント間の結合度を下げるための手法。直接依存しなくなるので、変更しやすくなる。また、細かい単位でテストが行えるため、テストしやすい。

結合度の強さは弱くなった。

> 依存関係がプログラムから外部に取り除かれることで、以下のようなメリットが発生する。[1]
> 
> - 結合度の低下によるコンポーネント化の促進
> - 単体テストの効率化
> - 特定のフレームワークへの依存度低下

[依存性の注入 - Wikipedia](https://ja.wikipedia.org/wiki/%E4%BE%9D%E5%AD%98%E6%80%A7%E3%81%AE%E6%B3%A8%E5%85%A5)

### 4

> 外部サービスとの通信が発生すると、どのようなデメリットが？

テストのたびに通信が発生するので、遅くなる。予期しない問題が発生した場合、何が原因でテストが失敗したのかを特定しづらい。

### 4

> sumOfArrayの修正

initialValue に 0 を設定した。空配列の合計値は0の方が自然で、これが一番シンプルに実現できる方法だと考えた。

## 課題4 (クイズ)

### クイズ1

`expect.toBe()` と `expect.toEqual()` はどのように違いますか？どう使い分けますか？

<details><summary>回答例</summary>

`toBe` は `Object.is` を使用して値を比較する。プリミティブな値の比較に使用する。`toEqual` は `Object.is` を使用してオブジェクトまたは配列のフィールドを再起的にチェックする。オブジェクトの比較に使用する。

- [Expect (toBe) · Jest](https://jestjs.io/docs/en/expect#tobevalue)
- [Expect (toEqual) · Jest](https://jestjs.io/docs/en/expect#toequalvalue)
</details>

### クイズ2

非同期な関数である `hoge()` が `"hoge"` を返すことを確認するテストを三種類以上の方法で記述してください

<details><summary>回答例</summary>

`__tests__/quiz2.test.ts` で動作確認できます。

```js
describe("非同期関数をテストする様々な方法", () => {
  it("Promise", () => {
    return hoge().then((result) => {
      expect(result).toBe("hoge")
    })
  })

  it("resolves", () => {
    return expect(hoge()).resolves.toBe("hoge")
  })

  it("doneCallback", (done) => {
    hoge().then((result) => {
      expect(result).toBe("hoge")
      done()
    })
  })

  it("async/await", async () => {
    const result = await hoge()
    expect(result).toBe("hoge")
  })

  it("async/await + resolves", async () => {
    await expect(hoge()).resolves.toBe("hoge")
  })
})
```
</details>

### クイズ3

テストコードのテストはどのように行いますか？

<details><summary>回答例</summary>

- わざと実装コードに判別可能な誤りを入れて、テストが落ちることを確認する。(Defect Insertion)
- 変更可能な箇所を1箇所ずつ変えながら、テストを実行する (Mutation Testing)
- ただし、とてもコストがかかるためテストコードのテストは一番初めに行う

参考: [TDD Boot Camp 2020 の 1:21:22 ~](https://youtu.be/Q-FJ3XmFlT8?t=4882)
</details>

## その他

- [Disable type checking? · Issue #822 · kulshekhar/ts-jest](https://github.com/kulshekhar/ts-jest/issues/822)
- [DI(依存性注入)について](https://www.slideshare.net/yuiito94/di-56742600)
  - DIとは、コンポーネント間の依存関係をソースコードから排除し、外部の設定ファイルなどで注入できるようにするパターンのこと
  - DIを使うと、、
    - モジュール間の依存関係を弱めることができる
    - 単体テストが楽になる
- [Dependency Injectionを「依存性の注入」と訳すのは非常に悪い誤訳 - little hands' lab](https://little-hands.hatenablog.com/entry/2018/05/27/dependency-injection)
  - DIは "依存オブジェクトの注入" である
