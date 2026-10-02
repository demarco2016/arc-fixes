// Offline teaching fixture. No RPC, SDK integration, wallet, or real transactions.
// All balances, routes, fees, and outcomes below are synthetic examples.

export class SimulationKit {
  constructor() {
    console.log("[SIMULATION ONLY] Synthetic data; no funds moved or chain queries performed.")
  }

  async spend(params) {
    // Hypothetical integration point; not implemented here: call Arc's kit.spend()
    console.log("[kit.spend]", JSON.stringify(params, null, 2))
    return {
      transactionId: `simulated_tx_${Date.now()}`,
      transferId: `simulated_fwd_${Date.now()}`,
      fees: { total: "2.50", breakdown: { bridge: "1.50", forwarder: "1.00" } },
      status: "simulated",
      simulated: true,
    }
  }

  async estimateSpend(params) {
    // Hypothetical integration point; not implemented here: call Arc's kit.estimateSpend()
    console.log("[kit.estimateSpend]", JSON.stringify(params, null, 2))
    return {
      simulated: true,
      fees: { total: "2.50", breakdown: { bridge: "1.50", forwarder: "1.00" } },
      outcome: { destinationAmount: "97.50", rate: "1.00" },
    }
  }

  getSupportedChains(token, filters = {}) {
    // Hypothetical integration point; not implemented here: call Arc's kit.getSupportedChains()
    const chains = ["Arc_Testnet", "Ethereum_Sepolia", "Solana_Testnet"]
    if (filters.forwarderSupported === "destination") {
      return chains.filter((c) => c === "Arc_Testnet")
    }
    return chains
  }

  async getBalances(token) {
    // Hypothetical integration point; not implemented here: call Arc's kit.getBalances()
    return {
      simulated: true,
      available: "500.00",
      pending: "50.00",
      inFlight: "25.00",
      total: "575.00",
    }
  }

  async getDelegateStatus() {
    // Hypothetical integration point; not implemented here: call Arc's kit.getDelegateStatus()
    return { simulated: true, ready: true, delegates: ["del_1", "del_2"] }
  }
}
