# Education — pay-per-call top-up vault

> **Rung:** `npm test` passes. **0.01 WAX** per call at precision 8 (`COST_PER_CALL = 1_000_000`).  
> Prefer free credits; only then stage an unsent deposit to `orng.wax`.

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Cost constant and free-before-paid order |
| Intermediate | Plan top-up only when shortfall exists |
| Masterclass | Unsent transfer body is not a broadcast |

## Beginner

WAX precision 8: `0.01000000 WAX` = `1_000_000` units. That is one paid call in this lab.

## Intermediate

`planTopup` returns `enough_free` / `enough_paid` when no deposit is needed. Otherwise computes `waxCost` and an **unsigned** transfer `{ to: orng.wax, memo: "deposit", sent: false }`.

## Masterclass

`applyTopup` debits the dapp vault and increments paid credits **in the model**. Production must actually transfer WAX and confirm oracle paid balance before relying on it.

## Will not teach

Live deposit confirmation or auto-stake (see auto-wax-stake-manager).
