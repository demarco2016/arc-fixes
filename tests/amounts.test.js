import test from "node:test"
import assert from "node:assert/strict"
import { compareAmounts } from "../src/amounts.js"

test("fees compare numerically when string ordering disagrees", () => {
  assert.equal(compareAmounts("10.00", "5.00"), 1)
  assert.equal(compareAmounts("2.50", "10.00"), -1)
})
test("balances compare numerically across digit lengths", () => {
  assert.equal(compareAmounts("50.00", "200.00"), -1)
  assert.equal(compareAmounts("1000.00", "200.00"), 1)
})
test("decimal scale and trailing zeros do not change equality", () => {
  assert.equal(compareAmounts("01.000", "1"), 0)
  assert.equal(compareAmounts("0.001", "0.01"), -1)
})
test("large integers and tiny differences remain exact", () => {
  assert.equal(compareAmounts("9007199254740993", "9007199254740992"), 1)
  assert.equal(compareAmounts("1.000000000000000001", "1.000000000000000000"), 1)
})
test("invalid amounts fail before route selection", () => {
  for (const amount of ["-1", "NaN", "Infinity", "1e3", "", " 1", 1, null]) {
    assert.throws(() => compareAmounts(amount, "5.00"), TypeError)
    assert.throws(() => compareAmounts("5.00", amount), TypeError)
  }
})
