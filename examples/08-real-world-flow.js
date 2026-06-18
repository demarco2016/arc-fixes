// 08 — Real-World Flow
// Complete app flow combining all patterns.
// Covers: balance check → route validation → fee estimation → execution → monitoring

import { UnifiedBalanceKit } from "../src/kit.js"

const kit = new UnifiedBalanceKit()

const AMOUNT = "100.00"
const DESTINATION = "Arc_Testnet"
const RECIPIENT_EVM = "0x1234567890abcdef1234567890abcdef12345678"
const FEE_THRESHOLD = "5.00"

function isValidEVMAddress(addr) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr)
}

async function main() {
  console.log("=== Unified Balance Flow ===\n")

  // 1. Validate destination format
  if (!isValidEVMAddress(RECIPIENT_EVM)) {
    console.log("ABORT: invalid EVM address")
    return
  }

  // 2. Check total spendable balance
  const balances = await kit.getBalances("USDC")
  console.log(`Balance: ${balances.available} available, ${balances.pending} pending`)

  if (Number(balances.available) < Number(AMOUNT)) {
    console.log("STATE: insufficient balance")
    return
  }

  // 3. Validate route capability
  const supported = kit.getSupportedChains("USDC")
  if (!supported.includes(DESTINATION)) {
    console.log("STATE: destination not supported")
    return
  }

  // 4. Check delegate readiness
  const delegateStatus = await kit.getDelegateStatus()
  if (!delegateStatus.ready) {
    console.log("STATE: delegate not ready — queueing transfer")
    return
  }

  // 5. Estimate fees & pick route
  const estimate = await kit.estimateSpend({
    amount: AMOUNT,
    token: "USDC",
    to: { chain: DESTINATION, recipientAddress: RECIPIENT_EVM },
  })
  console.log(`Estimated fees: ${estimate.fees.total}`)

  const route = estimate.fees.total <= FEE_THRESHOLD ? "primary" : "fallback"
  console.log(`Route: ${route}`)

  // 6. Execute
  const result = await kit.spend({
    amount: AMOUNT,
    token: "USDC",
    from: route === "fallback"
      ? [{ adapter: "solana" }]
      : [{ adapter: "evm" }],
    to: { chain: DESTINATION, recipientAddress: RECIPIENT_EVM },
  })

  console.log(`\nTransaction: ${result.transactionId}`)
  console.log(`Status: ${result.status}`)

  // 7. Monitor (simulated gateway.spend.* events)
  console.log("\n=== Gateway Events ===")
  console.log("gateway.spend.pending  → tx submitted")
  console.log("gateway.spend.confirmed → tx confirmed")
  console.log("gateway.spend.failed    → tx failed, routing to recovery")
  console.log("Status:", result.status === "confirmed" ? "✅ SUCCESS" : "❌ FAILED")
}

main().catch(console.error)
