# Worked examples — pay-per-use topup

`COST_PER_CALL = 1_000_000n` (0.01 WAX at precision 8).

## Shortfall

| free | paid | need | paidShortfall |
| --- | --- | --- | --- |
| 2 | 0 | 1 | 0 |
| 0 | 3 | 2 | 0 |
| 1 | 1 | 4 | 2 |

## planTopup

Enough free → `enough_free`. Enough paid → `enough_paid`. Empty vault → `vault_empty`.

Vault holds `3 * COST_PER_CALL`, need 1 → ok, `calls` 1, `waxCost` = COST_PER_CALL, unsigned transfer `sent:false`, `to: orng.wax`, memo `deposit`, precision 8.

## ensurePaid

Need 2 with vault `5 * COST` → paidCredits 2, vaultWax `3 * COST`, orngPaidWax `2 * COST`.

`consumePaid` from 1 → 0; second throws. Zero deposit and bad dapp refused.
