// 04 — Destination Differences
// EVM vs Solana recipient format validation.
// Blog: "Destination Differences as Routing Inputs"

import { SimulationKit } from "../src/kit.js"

const kit = new SimulationKit()

function isValidEVMAddress(addr) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr)
}

function hasSolanaAddressShape(addr) {
  // Only a base58 shape check; does not prove byte length, account type, or ownership.
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr)
}

async function main() {
  const transfers = [
    { chain: "Arc_Testnet", recipient: "0x1234567890abcdef1234567890abcdef12345678" },
    { chain: "Solana_Testnet", recipient: "7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtp" },
  ]

  for (const tx of transfers) {
    if (tx.chain === "Arc_Testnet" && !isValidEVMAddress(tx.recipient)) {
      console.log(`INVALID: ${tx.chain} — must be 0x EVM address`)
      continue
    }

    if (tx.chain === "Solana_Testnet") {
      if (!hasSolanaAddressShape(tx.recipient)) {
        console.log(`INVALID: ${tx.chain} — unexpected base58 address shape`)
        continue
      }
      console.log(`NOTE: ${tx.chain} — account type and ownership are not checked by this simulation`)
    }

    console.log(`FORMAT CHECK ONLY: ${tx.chain} — ${tx.recipient}`)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
