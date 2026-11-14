export const LEGACY_KEY = 'savedDocumentIds';
export const LEGACY_OWNER_KEY = 'savedDocumentIdsOwner';

export function parseLegacyIds(value) {
  if (!value) return [];
  const data = JSON.parse(value);
  if (!Array.isArray(data)) throw new Error('Invalid legacy saved list');
  return [...new Set(data.filter((id) => Number.isSafeInteger(id) && id > 0))];
}

export async function publishedIds(client, ids) {
  const valid = [];
  for (let offset = 0; offset < ids.length; offset += 100) {
    const { data, error } = await client.from('document').select('id').in('id', ids.slice(offset, offset + 100));
    if (error) throw error;
    valid.push(...data.map((item) => item.id));
  }
  return valid;
}

export async function importLegacySaved(client, storage, userId) {
  const raw = storage.getItem(LEGACY_KEY);
  if (!raw) return;
  const owner = storage.getItem(LEGACY_OWNER_KEY);
  if (owner && owner !== userId) return;
  // Claim the old list before uploading it so it cannot migrate to another account.
  if (!owner) storage.setItem(LEGACY_OWNER_KEY, userId);
  const ids = await publishedIds(client, parseLegacyIds(raw));
  if (ids.length) {
    const { error } = await client.from('saved_documents').upsert(
      ids.map((id) => ({ user_id: userId, document_id: id })),
      { onConflict: 'user_id,document_id', ignoreDuplicates: true },
    );
    if (error) throw error;
  }
  storage.removeItem(LEGACY_KEY);
  storage.removeItem(LEGACY_OWNER_KEY);
}

export async function readSavedIds(client, userId) {
  const ids = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await client.from('saved_documents').select('document_id').eq('user_id', userId).order('document_id').range(offset, offset + 499);
    if (error) throw error;
    ids.push(...data.map((item) => item.document_id));
    if (data.length < 500) break;
  }
  return publishedIds(client, ids);
}
