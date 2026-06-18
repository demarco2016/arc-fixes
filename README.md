# Arc Fixes

> Unified Balance Kit — routing, forwarding, fallback patterns & production safeguards for Arc Network.

[![GitHub last commit](https://img.shields.io/github/last-commit/demarco2016/arc-fixes?style=flat&label=Updated)](https://github.com/demarco2016/arc-fixes/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/demarco2016/arc-fixes?style=flat)](https://github.com/demarco2016/arc-fixes)
[![X Follow](https://img.shields.io/twitter/follow/Demarco639?style=social&label=Follow)](https://x.com/Demarco639)

---

Practical examples and patterns for [Arc's Unified Balance Kit](https://docs.arc.network/app-kit/unified-balance), based on the [blog post series](https://www.arc.io/blog/unified-balance-kit-partial-liquidity-routing-and-fallback-patterns).

## Contents

| Example | Pattern |
|---------|---------|
| [01 — Auto Allocation](examples/01-auto-allocation.js) | Default routing — let the kit allocate across sources |
| [02 — Route Validation](examples/02-route-validation.js) | Filter chains by capability before signing |
| [03 — Forwarding](examples/03-forwarding.js) | Forwarding service integration with `transferId` tracking |
| [04 — Destination Differences](examples/04-destination-differences.js) | EVM vs Solana recipient format validation |
| [05 — Estimate Spend](examples/05-estimate-spend.js) | Pre-execution fee & route checks |
| [06 — Partial Liquidity](examples/06-partial-liquidity.js) | Three-state balance model: insufficient / no route / fallback |
| [07 — Fallback Rules](examples/07-fallback-rules.js) | Multi-strategy fallback with delegate & gateway monitoring |

## Quick Start

```bash
npm install
# Set your Arc API credentials
cp .env.example .env
```

Run an example:

```bash
node examples/01-auto-allocation.js
```

## Links

- [Unified Balance Kit Docs](https://docs.arc.network/app-kit/unified-balance)
- [Blog: Partial Liquidity & Fallback Patterns](https://www.arc.io/blog/unified-balance-kit-partial-liquidity-routing-and-fallback-patterns)
- [Arc Network](https://arc.network)
- [X: @Demarco639](https://x.com/Demarco639)

---

<sub>Maintained by [@demarco2016](https://github.com/demarco2016). Built on Arc testnet by Circle Technology Services, LLC.</sub>
