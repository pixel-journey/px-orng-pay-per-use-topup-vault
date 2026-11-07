# px-orng-pay-per-use-topup-vault

> **Trust:** private educational lab (Tier B)  
> **Quest:** 012 — auto-refill 0.01 WAX pay-per-call when free credits are exhausted  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

`COST_PER_CALL = 1_000_000` (0.01 WAX at precision 8). Prefer free credits, then existing paid credits. Only then debit the dapp vault and stage an **unsent** transfer to `orng.wax` with memo `deposit`.

**Real code:** `npm test`. No live `orng.wax`, no wasm, no broadcast.

## Run

```bash
npm test
```

MIT — Pixel Journey
