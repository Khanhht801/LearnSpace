import { test } from 'node:test';
import assert from 'node:assert/strict';
import { importLegacySaved, LEGACY_KEY, LEGACY_OWNER_KEY, parseLegacyIds, publishedIds } from './savedDocuments.js';

function storage(values = {}) {
  const data = new Map(Object.entries(values));
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key), data };
}

function client({ valid = [1, 2], fail = false } = {}) {
  const writes = [];
  return { writes, from(table) {
    if (table === 'document') return { select: () => ({ in: async (_column, ids) => ({ data: ids.filter((id) => valid.includes(id)).map((id) => ({ id })), error: null }) }) };
    return { upsert: async (rows, options) => { writes.push({ rows, options }); return { error: fail ? new Error('offline') : null }; } };
  } };
}

test('legacy IDs are validated and deduplicated', () => {
  assert.deepEqual(parseLegacyIds('[1,2,1,0,-1,"3",2.5]'), [1, 2]);
  assert.throws(() => parseLegacyIds('{invalid'));
  assert.throws(() => parseLegacyIds('{}'));
});

test('legacy import only saves published IDs and removes old list after success', async () => {
  const store = storage({ [LEGACY_KEY]: '[1,2,3,1]' });
  const db = client();
  await importLegacySaved(db, store, 'user-a');
  assert.deepEqual(db.writes[0].rows, [{ user_id: 'user-a', document_id: 1 }, { user_id: 'user-a', document_id: 2 }]);
  assert.equal(db.writes[0].options.ignoreDuplicates, true);
  assert.equal(store.getItem(LEGACY_KEY), null);
  assert.equal(store.getItem(LEGACY_OWNER_KEY), null);
});

test('failed import preserves the old list and prevents transfer to another account', async () => {
  const store = storage({ [LEGACY_KEY]: '[1,2]' });
  await assert.rejects(importLegacySaved(client({ fail: true }), store, 'user-a'));
  assert.equal(store.getItem(LEGACY_KEY), '[1,2]');
  assert.equal(store.getItem(LEGACY_OWNER_KEY), 'user-a');
  const other = client();
  await importLegacySaved(other, store, 'user-b');
  assert.equal(other.writes.length, 0);
  await importLegacySaved(client(), store, 'user-a');
  assert.equal(store.getItem(LEGACY_KEY), null);
});

test('malformed old data is retained and publication checks support batches', async () => {
  const store = storage({ [LEGACY_KEY]: 'not-json' });
  await assert.rejects(importLegacySaved(client(), store, 'user-a'));
  assert.equal(store.getItem(LEGACY_KEY), 'not-json');
  const ids = Array.from({ length: 230 }, (_, index) => index + 1);
  assert.deepEqual(await publishedIds(client({ valid: [1, 101, 230] }), ids), [1, 101, 230]);
});
