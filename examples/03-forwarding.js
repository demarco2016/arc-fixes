// 03 — Forwarding
// Forwarding service integration with transferId tracking.
// Blog: "Where forwarding fits"

import { UnifiedBalanceKit } from "../src/kit.js"

const kit = new UnifiedBalanceKit()

async function main() {
  const sourceAdapter = "evm" // or "solana"

  // 1. Confirm forwarding is available on destination
  const supported = kit.getSupportedChains("USDC", {
    forwarderSupported: "destination",
  })
  if (!supported.includes("Arc_Testnet")) {
    console.log("Forwarding not supported on destination — abort")
    return
  }

  // 2. Estimate fees including forwarder cost
  const estimate = await kit.estimateSpend({
    amount: "1.00",
    token: "USDC",
    from: [{ adapter: sourceAdapter }],
    to: {
      chain: "Arc_Testnet",
      recipientAddress: "0xRecipientAddressHere",
      useForwarder: true,
    },
  })
  console.log("Forwarder fee estimate:", estimate.fees)

  // 3. Execute with forwarding
  const result = await kit.spend({
    amount: "1.00",
    token: "USDC",
    from: [{ adapter: sourceAdapter }],
    to: {
      chain: "Arc_Testnet",
      recipientAddress: "0xRecipientAddressHere",
      useForwarder: true,
    },
  })

  // 4. Persist transferId for ops/support to track
  console.log("Forwarded transfer — transferId:", result.transferId)
  // Store result.transferId in your database
}

main().catch(console.error)
