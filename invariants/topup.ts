/**
 * Pay-per-use top-up vault (educational).
 * Auto-refill the 0.01 WAX pay-per-call balance when free credits are exhausted.
 * No live orng.wax. No wasm. No broadcast.
 */

/** 0.01 WAX at 8-decimal precision (WAX standard). */
export const COST_PER_CALL = 1_000_000n;
export const WAX_PRECISION = 8;
export const MAX_CALLS_PER_TOPUP = 32;
export const MAX_VAULT = 1_000_000_00000000n;

export type Vault = {
  dapp: string;
  freeCredits: number;
  paidCredits: number;
  vaultWax: bigint;
  orngPaidWax: bigint;
};

export type TopupPlan =
  | {
      ok: true;
      calls: number;
      waxCost: bigint;
      unsignedTransfer: {
        to: "orng.wax";
        amount: bigint;
        precision: 8;
        symbol: "WAX";
        memo: string;
        sent: false;
      };
    }
  | {
      ok: false;
      reason:
        | "enough_free"
        | "enough_paid"
        | "vault_empty"
        | "bad_calls"
        | "overflow";
    };

const NAME = /^[a-z1-5.]{1,12}$/;

function assertName(name: string): void {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad dapp");
  }
}

export function emptyVault(dapp: string): Vault {
  assertName(dapp);
  return {
    dapp,
    freeCredits: 0,
    paidCredits: 0,
    vaultWax: 0n,
    orngPaidWax: 0n,
  };
}

export function depositVault(vault: Vault, amount: bigint): Vault {
  if (amount < 1n) throw new Error("bad amount");
  const next = vault.vaultWax + amount;
  if (next > MAX_VAULT) throw new Error("overflow");
  return { ...vault, vaultWax: next };
}

export function paidShortfall(vault: Vault, need = 1): number {
  if (!Number.isInteger(need) || need < 1 || need > MAX_CALLS_PER_TOPUP) {
    throw new Error("bad need");
  }
  if (vault.freeCredits >= need) return 0;
  const afterFree = need - vault.freeCredits;
  if (vault.paidCredits >= afterFree) return 0;
  return afterFree - vault.paidCredits;
}

export function planTopup(
  vault: Vault,
  input: { need?: number; calls?: number } = {},
): TopupPlan {
  const need = input.need ?? 1;
  if (!Number.isInteger(need) || need < 1 || need > MAX_CALLS_PER_TOPUP) {
    return { ok: false, reason: "bad_calls" };
  }
  if (vault.freeCredits >= need) {
    return { ok: false, reason: "enough_free" };
  }
  const gap = need - vault.freeCredits;
  if (vault.paidCredits >= gap) {
    return { ok: false, reason: "enough_paid" };
  }
  const shortfall = gap - vault.paidCredits;
  const calls = input.calls ?? shortfall;
  if (!Number.isInteger(calls) || calls < 1 || calls > MAX_CALLS_PER_TOPUP) {
    return { ok: false, reason: "bad_calls" };
  }
  if (calls < shortfall) return { ok: false, reason: "bad_calls" };
  const waxCost = BigInt(calls) * COST_PER_CALL;
  if (vault.vaultWax < waxCost) return { ok: false, reason: "vault_empty" };
  if (vault.orngPaidWax + waxCost > MAX_VAULT) {
    return { ok: false, reason: "overflow" };
  }
  return {
    ok: true,
    calls,
    waxCost,
    unsignedTransfer: {
      to: "orng.wax",
      amount: waxCost,
      precision: 8,
      symbol: "WAX",
      memo: "deposit",
      sent: false,
    },
  };
}

export function applyTopup(vault: Vault, calls: number): Vault {
  if (!Number.isInteger(calls) || calls < 1 || calls > MAX_CALLS_PER_TOPUP) {
    throw new Error("bad calls");
  }
  const waxCost = BigInt(calls) * COST_PER_CALL;
  if (vault.vaultWax < waxCost) throw new Error("vault_empty");
  return {
    ...vault,
    vaultWax: vault.vaultWax - waxCost,
    paidCredits: vault.paidCredits + calls,
    orngPaidWax: vault.orngPaidWax + waxCost,
  };
}

export function ensurePaid(
  vault: Vault,
  need = 1,
): { plan: TopupPlan; vault: Vault } {
  const plan = planTopup(vault, { need });
  if (!plan.ok) return { plan, vault };
  return { plan, vault: applyTopup(vault, plan.calls) };
}

export function consumePaid(vault: Vault): Vault {
  if (vault.paidCredits < 1) throw new Error("insufficient paid");
  return { ...vault, paidCredits: vault.paidCredits - 1 };
}
