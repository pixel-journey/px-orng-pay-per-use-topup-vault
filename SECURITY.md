# Security — pay-per-use topup

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty vault topup | vault_empty |
| Zero deposit | refused |
| consume without paid | throws |
| Bad dapp name | refused |
| Skip when free/paid enough | no transfer planned |

## Not closed

| Concern | Guidance |
| --- | --- |
| Custody of vault WAX | Who can withdraw residual |
| Live deposit memo / account | Match current orng.wax |
| Partial broadcast | Unsent plan vs actual balance |

No chain broadcast in this repository.
