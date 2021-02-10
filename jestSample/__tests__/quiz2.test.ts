const hoge = async () => "hoge"

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
