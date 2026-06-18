// UnifiedBalanceKit — minimal wrapper around Arc's Unified Balance Kit SDK.
// Replace mock implementations with @arcnetwork/unified-balance-kit in production.

export class UnifiedBalanceKit {
  constructor(config = {}) {
    this.apiKey = config.apiKey ?? process.env.ARC_API_KEY
  }

  async spend(params) {
    // In production: call Arc's kit.spend()
    console.log("[kit.spend]", JSON.stringify(params, null, 2))
    return {
      transactionId: `tx_${Date.now()}`,
      transferId: `fwd_${Date.now()}`,
      fees: { total: "2.50", breakdown: { bridge: "1.50", forwarder: "1.00" } },
      status: "confirmed",
    }
  }

  async estimateSpend(params) {
    // In production: call Arc's kit.estimateSpend()
    console.log("[kit.estimateSpend]", JSON.stringify(params, null, 2))
    return {
      fees: { total: "2.50", breakdown: { bridge: "1.50", forwarder: "1.00" } },
      outcome: { destinationAmount: "97.50", rate: "1.00" },
    }
  }

  getSupportedChains(token, filters = {}) {
    // In production: call Arc's kit.getSupportedChains()
    const chains = ["Arc_Testnet", "Ethereum_Sepolia", "Solana_Testnet"]
    if (filters.forwarderSupported === "destination") {
      return chains.filter((c) => c === "Arc_Testnet")
    }
    return chains
  }

  async getBalances(token) {
    // In production: call Arc's kit.getBalances()
    return {
      available: "500.00",
      pending: "50.00",
      inFlight: "25.00",
      total: "575.00",
    }
  }

  async getDelegateStatus() {
    // In production: call Arc's kit.getDelegateStatus()
    return { ready: true, delegates: ["del_1", "del_2"] }
  }
}
