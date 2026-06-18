# Arc Fixes

> Unified Balance Kit — routing, forwarding, fallback patterns & production safeguards for Arc Network.

[![GitHub last commit](https://img.shields.io/github/last-commit/demarco2016/arc-fixes?style=flat&label=Updated)](https://github.com/demarco2016/arc-fixes/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/demarco2016/arc-fixes?style=flat)](https://github.com/demarco2016/arc-fixes)
[![License](https://img.shields.io/github/license/demarco2016/arc-fixes?style=flat)](LICENSE)
[![X Follow](https://img.shields.io/twitter/follow/Demarco639?style=social&label=Follow)](https://x.com/Demarco639)

---

Practical examples and patterns for [Arc's Unified Balance Kit](https://docs.arc.network/app-kit/unified-balance).

Based on the blog series:
- **Part 1** — [Rethinking Payment & Treasury App Architectures](https://www.arc.io/blog/unified-balance-kit-rethinking-payment-and-treasury-app-architectures)
- **Part 2** — [Available Balances, Pending Balances, and Funds in Motion](https://www.arc.io/blog/unified-balance-kit-available-balances-pending-balances-and-funds-in-motion)
- **Part 3** — [Partial Liquidity, Routing, and Fallback Patterns](https://www.arc.io/blog/unified-balance-kit-partial-liquidity-routing-and-fallback-patterns) ← this repo

## Contents

| # | Example | Pattern |
|---|---------|---------|
| 01 | [Auto Allocation](examples/01-auto-allocation.js) | Default routing — let the kit allocate across sources |
| 02 | [Route Validation](examples/02-route-validation.js) | Filter chains by capability before signing |
| 03 | [Forwarding](examples/03-forwarding.js) | Forwarding service integration with `transferId` tracking |
| 04 | [Destination Differences](examples/04-destination-differences.js) | EVM vs Solana recipient format validation |
| 05 | [Estimate Spend](examples/05-estimate-spend.js) | Pre-execution fee & route checks |
| 06 | [Partial Liquidity](examples/06-partial-liquidity.js) | Three-state balance model: insufficient / no route / fallback |
| 07 | [Fallback Rules](examples/07-fallback-rules.js) | Multi-strategy fallback with delegate & gateway monitoring |
| 08 | [Real-World Flow](examples/08-real-world-flow.js) | Complete app flow combining all patterns |

## Production Setup

Install the real SDK:

```bash
npm install @arcnetwork/unified-balance-kit
```

Configure credentials in your Arc Console dashboard, then initialize:

```js
import { UnifiedBalanceKit } from "@arcnetwork/unified-balance-kit"

const kit = new UnifiedBalanceKit({
  apiKey: process.env.ARC_API_KEY,
  apiSecret: process.env.ARC_API_SECRET,
})
```

## Quick Start

```bash
git clone https://github.com/demarco2016/arc-fixes.git
cd arc-fixes
npm install
cp .env.example .env
node examples/01-auto-allocation.js
```

## Wallet Compatibility (Solana)

| Wallet | Burn-Intent Signing |
|--------|-------------------|
| Phantom | Not supported |
| Solflare | Supported ✅ |
| Backpack | Supported ✅ |

If your flow depends on wallet-based burn-intent signing on Solana, use Solflare or Backpack.

## Links

- [Unified Balance Kit Docs](https://docs.arc.network/app-kit/unified-balance)
- [Arc Network](https://arc.network)
- [Arc Console](https://console.arc.network)
- [X: @Demarco639](https://x.com/Demarco639)

---

<sub>Maintained by [@demarco2016](https://github.com/demarco2016). Built on Arc testnet by Circle Technology Services, LLC.</sub>
