import assert from "node:assert/strict";
import test from "node:test";
import {
  COST_PER_CALL,
  applyTopup,
  consumePaid,
  depositVault,
  emptyVault,
  ensurePaid,
  paidShortfall,
  planTopup,
} from "./topup.ts";

const DAPP = "pxrngdapp";

test("0.01 WAX cost is 1_000_000 at precision 8", () => {
  assert.equal(COST_PER_CALL, 1_000_000n);
});

test("paid shortfall is zero when free covers", () => {
  const v = { ...emptyVault(DAPP), freeCredits: 2 };
  assert.equal(paidShortfall(v, 1), 0);
});

test("paid shortfall is zero when paid covers the gap", () => {
  const v = { ...emptyVault(DAPP), freeCredits: 0, paidCredits: 3 };
  assert.equal(paidShortfall(v, 2), 0);
});

test("paid shortfall counts missing paid units", () => {
  const v = { ...emptyVault(DAPP), freeCredits: 1, paidCredits: 1 };
  assert.equal(paidShortfall(v, 4), 2);
});

test("plan skips topup when free is enough", () => {
  const v = { ...emptyVault(DAPP), freeCredits: 5 };
  const p = planTopup(v, { need: 2 });
  assert.equal(p.ok, false);
  if (!p.ok) assert.equal(p.reason, "enough_free");
});

test("plan skips topup when paid is enough", () => {
  const v = { ...emptyVault(DAPP), freeCredits: 0, paidCredits: 2 };
  const p = planTopup(v, { need: 1 });
  assert.equal(p.ok, false);
  if (!p.ok) assert.equal(p.reason, "enough_paid");
});

test("plan fails when vault cannot cover 0.01 WAX", () => {
  const v = emptyVault(DAPP);
  const p = planTopup(v, { need: 1 });
  assert.equal(p.ok, false);
  if (!p.ok) assert.equal(p.reason, "vault_empty");
});

test("plan tops up shortfall with unsent 0.01 WAX transfer", () => {
  const v = depositVault(emptyVault(DAPP), COST_PER_CALL * 3n);
  const p = planTopup(v, { need: 1 });
  assert.equal(p.ok, true);
  if (p.ok) {
    assert.equal(p.calls, 1);
    assert.equal(p.waxCost, COST_PER_CALL);
    assert.equal(p.unsignedTransfer.sent, false);
    assert.equal(p.unsignedTransfer.to, "orng.wax");
    assert.equal(p.unsignedTransfer.memo, "deposit");
    assert.equal(p.unsignedTransfer.precision, 8);
  }
});

test("ensurePaid applies topup and raises paid credits", () => {
  const v = depositVault(emptyVault(DAPP), COST_PER_CALL * 5n);
  const { plan, vault } = ensurePaid(v, 2);
  assert.equal(plan.ok, true);
  assert.equal(vault.paidCredits, 2);
  assert.equal(vault.vaultWax, COST_PER_CALL * 3n);
  assert.equal(vault.orngPaidWax, COST_PER_CALL * 2n);
});

test("consumePaid and bad inputs", () => {
  let v = { ...emptyVault(DAPP), paidCredits: 1 };
  v = consumePaid(v);
  assert.equal(v.paidCredits, 0);
  assert.throws(() => consumePaid(v), /insufficient paid/);
  assert.throws(() => depositVault(emptyVault(DAPP), 0n), /bad amount/);
  assert.throws(() => emptyVault("Bad"), /bad dapp/);
  assert.throws(() => applyTopup(emptyVault(DAPP), 1), /vault_empty/);
});
