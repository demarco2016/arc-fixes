// 06 — Partial Liquidity
// Three-state balance model: insufficient / no valid route / fallback.
// Blog: "Partial Liquidity as a Product State"

import { UnifiedBalanceKit } from "../src/kit.js"

const kit = new UnifiedBalanceKit()

async function main() {
  const amount = "200.00"
  const destination = "Arc_Testnet"
  const recipient = "0xRecipientAddressHere"

  // 1. Check total spendable balance
  const balances = await kit.getBalances("USDC")
  const totalSpendable = balances.available

  if (totalSpendable < amount) {
    console.log("STATE: insufficient total spendable balance")
    console.log(`Need ${amount}, have ${totalSpendable}`)
    return
  }

  // 2. Check if any route satisfies requirements
  const supportedRoutes = kit.getSupportedChains("USDC")
  if (!supportedRoutes.includes(destination)) {
    console.log("STATE: enough balance, but no valid route to destination")
    return
  }

  // 3. Check route health before execution
  const estimate = await kit.estimateSpend({
    amount,
    token: "USDC",
    to: { chain: destination, recipientAddress: recipient },
  })

  if (estimate.fees.total > "10.00") {
    console.log("STATE: enough balance, executing on fallback path")
    // In practice, try alternative routes or partial fills
  }

  const result = await kit.spend({
    amount,
    token: "USDC",
    to: { chain: destination, recipientAddress: recipient },
  })

  console.log("Executed:", {
    state: "success",
    amount,
    destination,
    fees: estimate.fees,
    txId: result.transactionId,
  })
}

main().catch(console.error)
