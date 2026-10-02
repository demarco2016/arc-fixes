# Arc Fixes: Offline Routing Examples

Eight runnable JavaScript teaching examples for balance checks, fee thresholds,
route selection, and fallback decisions. They use an **offline simulation** in
`src/kit.js`, not a live Arc SDK, RPC endpoint, or wallet. Running an example
creates no real transactions and proves no testnet contribution or airdrop eligibility.

## Requirements and quick start

Use Node.js 22 or newer. No dependencies, credentials, or environment files are needed.

```bash
git clone https://github.com/demarco2016/arc-fixes.git
cd arc-fixes
node examples/01-auto-allocation.js
npm run example:08
npm test
```

All examples start with a `SIMULATION ONLY` notice. `SimulationKit` returns
synthetic fixtures: balances, chain labels, fees, and delegate readiness are
illustrative values. IDs begin with `simulated_`; spend status is `simulated`,
never a claim of on-chain confirmation.

## Examples

| Example | Teaching focus |
| --- | --- |
| `01-auto-allocation.js` | Shape of an allocation request |
| `02-route-validation.js` | Filter a synthetic route list |
| `03-forwarding.js` | Illustrative forwarding request and ID |
| `04-destination-differences.js` | Address format hints only |
| `05-estimate-spend.js` | Compare example fees to a limit |
| `06-partial-liquidity.js` | Compare available balance and route availability |
| `07-fallback-rules.js` | Select a route using fee thresholds |
| `08-real-world-flow.js` | Combine the illustrative checks |

The former local `UnifiedBalanceKit` export is now named `SimulationKit`;
update any imports to make the offline behavior explicit.

## Module usage

```js
import { SimulationKit } from './src/kit.js'
import { compareAmounts } from './src/amounts.js'

const kit = new SimulationKit()
const balances = await kit.getBalances('USDC')
if (compareAmounts(balances.available, '200.00') >= 0) {
  console.log('Synthetic balance meets the example threshold')
}
```

`compareAmounts(left, right)` accepts non-negative decimal **strings** and
returns -1, 0, or 1 using exact integer arithmetic. It rejects malformed values.
This avoids both lexical ordering (where `"10" < "5"`) and floating-point
rounding. It does not convert currencies or handle token decimals for live transfers.

## Limits and integration work

- The local simulator is not an implementation or compatibility guarantee for
  any published Arc SDK. Its methods are teaching interfaces.
- Estimates are fixed fixtures, not quotes computed from amounts, liquidity,
  routes, or network conditions. Supported chain labels are fixtures too.
- Address regex checks do not verify account existence, EVM checksum, Solana
  decoded byte length, token-account ownership, or associated token accounts.
- Printed gateway events are illustrative strings, not subscribed network events.
- Before a live integration, verify the current official API, network and token
  support, wallet capabilities, quote validity, and signing requirements against
  [Arc documentation](https://docs.arc.network/). Keep credentials on the server
  and obtain explicit approval before signing or spending funds.
- This repository provides no security audit, production-readiness guarantee,
  live activity claim, or airdrop eligibility guarantee.

## Tests

`npm test` uses Node's built-in test runner. It covers numeric ordering regressions,
exact large/small values, invalid inputs, simulation disclosures, and actual
execution of all eight examples. GitHub Actions runs it on Node.js 22 and 24.

## License

MIT; see [LICENSE](LICENSE).
