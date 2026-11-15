# Education — 0.01 WAX pay-per-call topup

When free credits are gone, top up paid credits from a vault of WAX at a fixed **0.01 WAX** per call (1_000_000 units at precision 8).

## Outcomes

1. Show cost constant matches precision 8.
2. Show plan skips when free or paid already cover need.
3. Show ensurePaid moves vault → orngPaid and raises paidCredits.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
