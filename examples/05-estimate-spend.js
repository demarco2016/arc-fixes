// 05 — Estimate Spend
// Pre-execution fee & route checks before committing.
// Blog: "Using estimateSpend() for Route Decisions"

import { UnifiedBalanceKit } from "../src/kit.js"

const kit = new UnifiedBalanceKit()

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
  if (estimate.fees.total > FEE_THRESHOLD) {
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

  console.log("Executed:", result)
}

main().catch(console.error)
