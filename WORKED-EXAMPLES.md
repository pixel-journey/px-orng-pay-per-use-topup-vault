# Worked examples — top-up vault

## Example A — enough free

freeCredits ≥ need → plan `enough_free`.

## Example B — enough paid

After free, paid covers gap → `enough_paid`.

## Example C — shortfall

Need 1, free 0, paid 0, vault ≥ 1_000_000 → plan ok with unsigned transfer amount 1_000_000.

## Example D — vault empty

Shortfall but vaultWax < waxCost → `vault_empty`.

## Example E — ensurePaid

On ok plan, `applyTopup` moves vault → paidCredits and tracks `orngPaidWax`.

## Example F — consumePaid

Decrements paid by 1 after a successful paid request path.
