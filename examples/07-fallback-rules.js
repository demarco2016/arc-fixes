// 07 — Fallback Rules
// Multi-strategy fallback with delegate & gateway monitoring.
// Blog: "Fallback Rules"

import { UnifiedBalanceKit } from "../src/kit.js"

const kit = new UnifiedBalanceKit()

async function main() {
  const amount = "50.00"
  const destination = "Arc_Testnet"
  const recipient = "0xRecipientAddressHere"

  // 1. Check supported chains
  const supported = kit.getSupportedChains("USDC")
  if (!supported.includes(destination)) {
    console.log("FALLBACK: destination not supported")
    return
  }

  // 2. Check delegate readiness
  const delegateStatus = await kit.getDelegateStatus()
  if (!delegateStatus.ready) {
    console.log("FALLBACK: delegate not ready — queue or alert")
    return
  }

  // 3. Estimate to inspect route
  const estimate = await kit.estimateSpend({
    amount,
    token: "USDC",
    to: { chain: destination, recipientAddress: recipient },
  })

  // 4. Apply fallback rules
  const routes = [
    { name: "primary", condition: estimate.fees.total <= "3.00" },
    { name: "secondary", condition: estimate.fees.total <= "7.00" },
    { name: "tertiary", condition: true }, // always accept
  ]

  const selected = routes.find((r) => r.condition)
  console.log(`FALLBACK: using "${selected.name}" route`)

  // 5. Execute with manual allocation control if needed
  const result = await kit.spend({
    amount,
    token: "USDC",
    from: {
      allocations: selected.name === "primary"
        ? [{ source: "evm", percent: 100 }]
        : [{ source: "solana", percent: 100 }],
    },
    to: { chain: destination, recipientAddress: recipient },
  })

  // 6. Monitor execution
  console.log("Route:", selected.name)
  console.log("Fees:", estimate.fees.total)
  console.log("Transaction:", result.transactionId)
}

main().catch(console.error)
