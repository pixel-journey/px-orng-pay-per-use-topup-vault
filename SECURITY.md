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

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Custody of vault WAX | Who can withdraw residual |
| Live deposit memo / account | Match current `orng.wax` |
| Partial broadcast | Unsent plan vs actual balance |
| Auth | Who may `ensurePaid` |

## Attack angles

1. Charging free + paid + topup + stake for one call (funding order: free → paid → topup → stake).
2. Treating planned transfer as already settled (`sent: false`).
3. Confusing this with [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) (memo `deposit` vs `stake`).
4. Using precision other than 8 for WAX amounts in the plan.

## Honesty limits

No chain broadcast. Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). Related: [credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor).
