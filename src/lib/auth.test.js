import { test } from 'node:test';
import assert from 'node:assert/strict';
import { authenticate } from './auth.js';

for (const origin of ['http://localhost:5173', 'https://learnspace.example']) {
  test(`registration redirects confirmation to ${origin}/auth`, async () => {
    const result = { data: { session: null }, error: null };
    const client = { auth: { signUp: async (credentials) => {
      assert.deepEqual(credentials, {
        email: 'student@example.com', password: ' secret password ',
        options: { emailRedirectTo: `${origin}/auth`, data: { full_name: 'Học sinh' } },
      });
      return result;
    } } };
    assert.equal(await authenticate(client, { register: true, email: ' student@example.com ', password: ' secret password ', name: ' Học sinh ', origin }), result);
  });
}

test('login sends password unchanged and preserves authentication errors', async () => {
  const result = { data: { session: null }, error: { code: 'invalid_credentials' } };
  const client = { auth: { signInWithPassword: async (credentials) => {
    assert.deepEqual(credentials, { email: 'student@example.com', password: ' password ' });
    return result;
  } } };
  assert.equal(await authenticate(client, { register: false, email: ' student@example.com ', password: ' password ' }), result);
});
