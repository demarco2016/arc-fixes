// 04 — Destination Differences
// EVM vs Solana recipient format validation.
// Blog: "Destination Differences as Routing Inputs"

import { UnifiedBalanceKit } from "../src/kit.js"

const kit = new UnifiedBalanceKit()

function isValidEVMAddress(addr) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr)
}

function isValidSolanaATA(addr) {
  // Solana USDC token account or ATA — base58, ~32-44 chars
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
      if (!isValidSolanaATA(tx.recipient)) {
        console.log(`INVALID: ${tx.chain} — must be token account, not wallet address`)
        continue
      }
      // Phantom note: does not support burn-intent signing
      console.log(`NOTE: ${tx.chain} — use Solflare or Backpack for wallet-based signing`)
    }

    console.log(`VALID: ${tx.chain} — proceeding with ${tx.recipient}`)
  }
}

main().catch(console.error)
