# Education — 0.01 WAX pay-per-call topup

> **Rung:** `npm test` passes. Plans an **unsent** deposit to `orng.wax`. Does not move WAX on chain.  
> **The test is the rule.**

`COST_PER_CALL = 1_000_000` units = **0.01 WAX** at precision **8**. Never write `0.01` in contract math. N calls cost `N * 1_000_000`, not one flat fee.

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

### Funding order (one call, one charge)

1. **Free** credits — do not top up.  
2. **Paid** credits already on the book — do not top up.  
3. **This vault** — pull `calls × COST` only for the shortfall.  
4. **Stake** — only if this vault cannot cover it ([auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager)).

Charging free **and** 0.01 WAX **and** a stake for the same call is the bug.

## Masterclass

Three numbers must stay distinct:

| Field | Meaning |
| --- | --- |
| `vaultWax` | Still in the local vault |
| `orngPaidWax` | Already planned toward the oracle |
| `paidCredits` | A **count of calls**, not WAX the user can withdraw as RNG |

A successful book update is not a broadcast. `sent` stays false. Production must match the deposit memo and account `orng.wax` expects in the current network version. This lab's memo `deposit` is a teaching string.

WAX at precision 8 and PXJ at precision 8 are **different contracts and symbols**. Do not fund this vault with PXJ.

This is not CPU rental. [Powerup sponsor](https://github.com/pixel-journey/px-cpu-eosio-powerup-sponsor-pool) is a pure gate with a different quota.

### Common mistakes

1. Charging 0.01 WAX and spending a free credit for the same call.  
2. Writing `0.01` instead of `1_000_000`.  
3. Letting the user set the per-call price in the action.  
4. Treating `sent: false` as settled.  
5. Confusing this memo `deposit` with auto-stake's memo `stake`.

### Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Daily user cap on top-ups | Stop one account draining the vault |
| Refund unused prepaid | Needs oracle credit introspection |
| Live memo check | Re-read current wax-orng before copying `deposit` |

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

### Exercises

1. Why is COST `1_000_000` at precision 8? (0.01 WAX.)  
2. Does `planTopup` broadcast? (`sent: false`)  
3. Free credits cover the need — do you still top up? (No.)  
4. Is this the same token as PXJ? (No. Both can be precision 8.)

### What this course will not teach

- A live transfer to `orng.wax`
- That the teaching memo is the current oracle memo
- CPU `powerup` or ORNG stake economics
