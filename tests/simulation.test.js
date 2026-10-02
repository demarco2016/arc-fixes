import test from "node:test"
import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { SimulationKit } from "../src/kit.js"

test("simulation never reports real confirmation or transaction IDs", async () => {
  const kit = new SimulationKit()
  const result = await kit.spend({ amount: "100.00" })
  assert.equal(result.status, "simulated")
  assert.equal(result.simulated, true)
  assert.match(result.transactionId, /^simulated_tx_/)
  assert.match(result.transferId, /^simulated_fwd_/)
})
test("all financial and readiness fixtures disclose simulation", async () => {
  const kit = new SimulationKit()
  for (const result of [await kit.estimateSpend({}), await kit.getBalances("USDC"), await kit.getDelegateStatus()]) {
    assert.equal(result.simulated, true)
  }
})
test("every example executes successfully and labels simulation", () => {
  for (const file of readdirSync(new URL("../examples/", import.meta.url)).filter((name) => name.endsWith(".js"))) {
    const result = spawnSync(process.execPath, [fileURLToPath(new URL(`../examples/${file}`, import.meta.url))], { encoding: "utf8", timeout: 5000 })
    assert.equal(result.status, 0, `${file}: ${result.stderr}`)
    assert.match(result.stdout, /SIMULATION ONLY/, file)
    assert.doesNotMatch(result.stdout, /✅ SUCCESS/, file)
  }
})
