# Sources

| Source | Use |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Deposit / credit purchase |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Request flow |
| [docs.wax.io](https://docs.wax.io/) | WAX token precision |
| [eosio.token](https://github.com/eosio/eosio.contracts) | Transfer shape |

**Product facts locked by tests:**

- `COST_PER_CALL = 1_000_000` = **0.01 WAX** at precision **8**. N calls cost `N * 1_000_000`.
- Bodies are **unsent**. Memo `deposit` is a teaching string — re-read live wax-orng before copying it.
- Skip the top-up when free or paid credits already cover the need.
- WAX@8 is not PXJ@8. Different contract and symbol.

**Funding order for one call:** free → paid → this vault → stake. Do not charge all four.

## Related labs

| Lab | Topic |
| --- | --- |
| [credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) | Free then paid; no debit on fail |
| [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) | Memo `stake`, last step |
| [powerup sponsor](https://github.com/pixel-journey/px-cpu-eosio-powerup-sponsor-pool) | CPU rental, not oracle credits |
| [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) | Open the job only after the gate |
| `px-contract-examples-vault` (private index; not this public course) | Funding cheatsheet |
