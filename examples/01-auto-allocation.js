// 01 — Auto Allocation
// Default routing — let the kit allocate across balance sources.
// Blog: "Start with the default allocation model"

import { UnifiedBalanceKit } from "../src/kit.js"

const kit = new UnifiedBalanceKit()

async function main() {
  // Auto-allocation: provide amount + destination, kit handles sourcing
  const result = await kit.spend({
    amount: "100.00",
    token: "USDC",
    to: {
      chain: "Arc_Testnet",
      recipientAddress: "0xRecipientAddressHere",
    },
  })

  console.log("Auto-allocation result:", result)
  // The kit picks the best source chain automatically
}

main().catch(console.error)
