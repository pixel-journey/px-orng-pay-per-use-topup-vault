# AI handoff — pay-per-use top-up vault

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Deposit / credit purchase |
| [credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) | Free then paid first |
| [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) | Stake last |

## Non-negotiables

1. `COST_PER_CALL = 1_000_000` = **0.01 WAX** at precision **8**. N calls cost `N * 1_000_000`.
2. Bodies are **unsent**. Memo `deposit` is a teaching string — re-read live wax-orng before copying it.
3. Skip the top-up when free or paid credits already cover the need.
4. **WAX@8 is not PXJ@8.** Different contract and symbol. **PXJ precision is always 8** when PXJ appears elsewhere.
5. Funding order: free → paid → **this vault** → stake. Do not charge all four.
6. Not CPU powerup.

## Prompt seeds

- "Three missing calls — cost in minor units?"
- "Free covers the need — is top-up skipped?"
- "Refuse treating WAX cost as PXJ."
- "Show unsent deposit body; do not claim broadcast."

## Do not

- Use precision 4 for WAX here.
- Charge stake before top-up when paid credits are empty.
- Confuse with powerup sponsor pool.
