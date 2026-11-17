# Tips — 0.01 WAX per missing oracle call

`CALL_COST = 1_000_000` minor units = `0.01000000 WAX` at precision 8. Never write `0.01` in contract math.

## Order

1. If free or paid credits already cover the need, **do not** top up.
2. Otherwise pull `calls * CALL_COST` from the vault.
3. Record that amount as paid toward the oracle, separate from the vault balance, so an audit can see both.

## Do

- Keep vault WAX and "already sent to orng" as two fields.
- Refuse a top-up the vault cannot cover.
- Re-read the live wax-orng memo for deposits before you copy `deposit` into production. This lab's memo is a teaching string.

## Don't

- Top up on every wager "just in case."
- Use floating point.
- Treat a successful book update as a broadcast. `sent` stays false until something outside this lab transmits the transfer.

## Common mistakes

1. Charging 0.01 WAX **and** spending a free credit for the same call.
2. Confusing precision 8 WAX with PXJ (also 8). They are different contracts and symbols.
3. Letting the user set the per-call price in the action.
4. Forgetting that N calls cost `N * 1_000_000`, not `1_000_000`.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Daily user cap on top-ups | Stop a drained vault from one account |
| Sponsor pool | [powerup sponsor](https://github.com/pixel-journey/px-cpu-eosio-powerup-sponsor-pool) is a different quota, same "pay for them" shape |
| Refund unused prepaid | Needs oracle credit introspection this lab does not have |

Related: [credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) · [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) · [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng)
