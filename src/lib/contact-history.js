const GLOBAL_KEY = Symbol.for("wowTravelContactHistory");
const DEFAULT_TTL_DAYS = Number(process.env.CONTACT_HISTORY_TTL_DAYS || 30);
const ttlMs = DEFAULT_TTL_DAYS > 0 ? DEFAULT_TTL_DAYS * 24 * 60 * 60 * 1000 : null;

function getStore() {
  if (!global[GLOBAL_KEY]) {
    global[GLOBAL_KEY] = new Map();
  }
  return global[GLOBAL_KEY];
}

function hasRecentInteraction(waId) {
  if (!waId) {
    return false;
  }
  const store = getStore();
  const record = store.get(waId);
  if (!record) {
    return false;
  }
  if (record.expiresAt && record.expiresAt < Date.now()) {
    store.delete(waId);
    return false;
  }
  return true;
}

function ensureContactHistory(waId) {
  if (!waId) {
    return;
  }
  const store = getStore();
  const expiresAt = ttlMs ? Date.now() + ttlMs : null;
  store.set(waId, { expiresAt });
}

export { ensureContactHistory, hasRecentInteraction };
