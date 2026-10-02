// 02 — Route Validation
// Filter chains by capability before the user reaches signing.
// Blog: "Validating Route Capability Before Signing"

import { SimulationKit } from "../src/kit.js"

const kit = new SimulationKit()

async function main() {
  // Get only chains that support destination forwarding
  const forwarderDestChains = kit.getSupportedChains("USDC", {
    forwarderSupported: "destination",
  })

  console.log("Chains with destination forwarding:", forwarderDestChains)

  // Validate route capability before signing
  if (forwarderDestChains.length === 0) {
    console.log("No supported route — block or reroute before commit")
    return
  }

  // Proceed with the first valid route
  const result = await kit.spend({
    amount: "50.00",
    token: "USDC",
    to: {
      chain: forwarderDestChains[0],
      recipientAddress: "0xRecipientAddressHere",
    },
  })

  console.log("Route-validated spend result:", result)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
