# Education — 0.01 WAX pay-per-call topup

> **Rung:** `npm test` passes. Plans an **unsent** deposit to `orng.wax`. Does not move WAX on chain.  
> **The test is the rule.**

`COST_PER_CALL = 1_000_000` units = **0.01 WAX** at precision **8**.

Sibling: [credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) (when to need paid) · [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) (stake instead of pay-per-call).

Official: [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) · [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | State the cost constant and precision |
| Intermediate | Skip topup when free or paid already cover need |
| Masterclass | Separate vault WAX, orngPaidWAX, and paidCredits |

---

## Beginner

Empty vault cannot plan a topup (`vault_empty`). Deposit `3 × COST`, need 1 → ok, `waxCost = COST_PER_CALL`, unsent transfer to `orng.wax`, memo `deposit`, precision 8.

## Intermediate

| State | need | Result |
| --- | --- | --- |
| free 5 | 2 | enough_free |
| free 0, paid 2 | 1 | enough_paid |
| vault empty | 1 | vault_empty |

`ensurePaid` with vault `5 × COST` and need 2 → paidCredits **2**, vaultWax **3 × COST**, orngPaidWax **2 × COST**.

## Masterclass

Paid credits are a **count of calls**, not a WAX balance the user can withdraw as RNG. Production must match whatever deposit memo and account `orng.wax` expects in the current network version. This lab only teaches the local accounting shape.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

### Exercises

1. Why is COST 1_000_000 at precision 8?  
2. Does planTopup mutate the vault before ensurePaid?  
3. Is the transfer sent? (`sent: false`)
