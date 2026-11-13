# Pay-per-call top-up when free credits are exhausted

> **Domain:** WAX ORNG — deposit vault for paid RNG  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** `COST_PER_CALL = 1_000_000` (0.01 WAX @ 8). Prefer free, then paid credits. Only then debit the dapp vault and stage an **unsent** transfer to `orng.wax` with memo `deposit`.

**Code under test:** `npm test`. No broadcast.

**Official:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng).

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Shortfall, empty, apply |
| [TIPS.md](TIPS.md) | Buffer and sent:false |
| [SECURITY.md](SECURITY.md) | Overflow / empty |
| [SOURCES.md](SOURCES.md) | Official |

```bash
npm test
```

MIT — Pixel Journey
