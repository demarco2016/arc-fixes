// 05 — Estimate Spend
// Pre-execution fee & route checks before committing.
// Blog: "Using estimateSpend() for Route Decisions"

import { compareAmounts } from "../src/amounts.js"

import { SimulationKit } from "../src/kit.js"

const kit = new SimulationKit()

async function main() {
  const evmAdapter = "evm"
  const solanaAdapter = "solana"
  const recipientAddress = "0xRecipientAddressHere"

  // Estimate before executing — check fees, route, forwarding impact
  const estimate = await kit.estimateSpend({
    amount: "100",
    token: "USDC",
    from: [{ adapter: evmAdapter }, { adapter: solanaAdapter }],
    to: {
      adapter: evmAdapter,
      chain: "Arc_Testnet",
      recipientAddress,
    },
  })

  console.log("Estimated fees:", estimate.fees)
  console.log("Route outcome:", estimate.outcome)

  // Decision: is the route still acceptable?
  const FEE_THRESHOLD = "5.00"
  if (compareAmounts(estimate.fees.total, FEE_THRESHOLD) > 0) {
    console.log("Fees too high — rerouting or alerting user")
    return
  }

  // Proceed with execution
  const result = await kit.spend({
    amount: "100",
    token: "USDC",
    from: [{ adapter: evmAdapter }, { adapter: solanaAdapter }],
    to: {
      adapter: evmAdapter,
      chain: "Arc_Testnet",
      recipientAddress,
    },
  })

  console.log("Simulated result:", result)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
