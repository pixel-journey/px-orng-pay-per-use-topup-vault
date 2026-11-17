# Worked examples — pay-per-use topup vault

`COST_PER_CALL = 1_000_000` (0.01 WAX at precision **8**). Dapp `pxrngdapp`.

## paidShortfall

free 2 → shortfall 0 for need 1. free 0 paid 3 → 0 for need 2. free 1 paid 1 need 4 → **2**.

## planTopup

| State | need | Result |
| --- | --- | --- |
| free 5 | 2 | `enough_free` |
| free 0 paid 2 | 1 | `enough_paid` |
| empty vault | 1 | `vault_empty` |
| vault = 3×COST | 1 | ok, calls **1**, waxCost **COST_PER_CALL** |

Unsent transfer: to `orng.wax`, memo `deposit`, precision 8.

## ensurePaid

Deposit 5×COST, ensure need 2 → paidCredits **2**, vaultWax **3×COST**, orngPaidWax **2×COST**.

`consumePaid` decrements; empty paid throws. Zero deposit / bad dapp / topup on empty vault refused.

## Funding order

Do not charge every path for one call:

1. Free credits ([bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor))
2. Paid credits (this lab)
3. Stake ([auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager)) only for remaining shortfall

Memo here is `deposit`. Stake uses memo `stake`. Both stay `sent: false` in these labs.
