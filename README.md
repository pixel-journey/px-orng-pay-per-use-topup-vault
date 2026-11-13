# Pay-per-call top-up when free credits are exhausted

> **Domain:** WAX ORNG — deposit vault for paid RNG  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** `COST_PER_CALL = 1_000_000` (0.01 WAX at precision 8). Prefer free credits, then existing paid credits. Only then debit the dapp vault and stage an **unsent** transfer to `orng.wax` with memo `deposit`.

**Code under test:** `npm test`. No live `orng.wax`, no wasm, no broadcast.

**Official:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng).

```bash
npm test
```

MIT — Pixel Journey
