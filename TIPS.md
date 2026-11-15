# Tips — pay-per-use ORNG topup

## Do

- Fix the per-call cost in **integer minor units** at precision 8.
- Skip topup when free or paid already cover the need (same policy as the credit gate).
- Keep vault WAX and “already paid to orng” as separate fields for audits.

## Don't

- Use floating `0.01` in contract math.
- Top up on every wager without checking free/paid first.
- Assume memo `deposit` is universal forever — verify against current wax-orng docs before production.

## Related

[credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) · [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)
