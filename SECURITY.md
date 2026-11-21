# Security — pay-per-use topup vault

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty vault topup | vault_empty |
| Zero deposit | refused |
| consume without paid | throws |
| Bad dapp name | refused |
| Skip when free/paid enough | no transfer planned |

`COST_PER_CALL = 1_000_000` units = **0.01 WAX** at precision **8**. Bodies are **unsent**.

## Funding order (do not reorder)

```text
1. Free credits  (credit bucket)
2. Paid credits  (this lab)
3. Stake         (auto-stake) — shortfall only
```

Memo here is `deposit`. Stake uses memo `stake`. Both stay `sent: false` in these labs.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Custody of vault WAX | Who can withdraw residual |
| Live deposit memo / account | Match current `orng.wax` |
| Partial broadcast | Unsent plan vs actual balance |
| Auth | Who may `ensurePaid` |

## Attack angles

1. Charging free + paid + topup + stake for one call.  
2. Treating planned transfer as already settled (`sent: false`).  
3. Confusing this with [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) (memo `deposit` vs `stake`).  
4. Using precision other than 8 for WAX amounts in the plan.  
5. Opening a job when shortfall still remains.

## Honesty limits

No chain broadcast.

| Sibling | Distinction |
| --- | --- |
| [credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) | Free preferred |
| [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) | Last-resort stake |

[wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) · [docs.wax.io](https://docs.wax.io/).
