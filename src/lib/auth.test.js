import { test } from 'node:test';
import assert from 'node:assert/strict';
import { authenticate, authFailureDetails, confirmationErrorKind, confirmSignup, documentDestination, requestPasswordReset, resendConfirmation, signupResult } from './auth.js';

test('login destination accepts only an internal document route', () => {
  assert.equal(documentDestination('/courses/12?q=react#content'), '/courses/12?q=react#content');
  for (const value of ['https://example.com', '//example.com', '/courses/1/extra', '/courses/1evil', null]) assert.equal(documentDestination(value), '/');
});

test('password recovery targets the current origin and trims email', async () => {
  const client = { auth: { resetPasswordForEmail: async (email, options) => {
    assert.equal(email, 'student@example.com');
    assert.equal(options.redirectTo, 'https://learnspace.example/auth/reset-password');
    return { error: null };
  } } };
  assert.deepEqual(await requestPasswordReset(client, ' student@example.com ', 'https://learnspace.example'), { error: null });
});

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

test('signup distinguishes an existing account from a pending confirmation and a session', () => {
  assert.equal(signupResult({ user: { identities: [] }, session: null }), 'existing');
  assert.equal(signupResult({ user: { identities: [{ provider: 'email' }] }, session: null }), 'confirmation');
  assert.equal(signupResult({ user: {}, session: null }), 'confirmation');
  assert.equal(signupResult({ user: { identities: [] }, session: {} }), 'signed_in');
});

test('diagnostics preserve the server failure reason without logging credentials', () => {
  assert.deepEqual(authFailureDetails({
    status: 500, code: 'unexpected_failure', message: 'Error sending confirmation email',
    password: 'do-not-log', access_token: 'do-not-log', request: { body: 'do-not-log' },
  }), { status: 500, code: 'unexpected_failure', message: 'Error sending confirmation email' });
  assert.deepEqual(authFailureDetails(null), {
    status: null, code: 'unknown', message: 'Unknown authentication error',
  });
});

test('resending confirmation uses signup flow and the current site callback', async () => {
  const client = { auth: { resend: async (params) => {
    assert.deepEqual(params, {
      type: 'signup', email: 'student@example.com',
      options: { emailRedirectTo: 'https://learn-space.khanhht.tech/auth' },
    });
    return { error: null };
  } } };
  assert.deepEqual(await resendConfirmation(client, ' student@example.com ', 'https://learn-space.khanhht.tech'), { error: null });
});

test('confirmation sends the email token to Supabase only when requested', async () => {
  const result = { data: { session: {} }, error: null };
  let calls = 0;
  const client = { auth: { verifyOtp: async (params) => {
    calls += 1;
    assert.deepEqual(params, { token_hash: 'confirmation-token', type: 'email' });
    return result;
  } } };
  assert.equal(calls, 0);
  assert.equal(await confirmSignup(client, 'confirmation-token'), result);
  assert.equal(calls, 1);
});

test('only an expired token is reported as an invalid confirmation link', () => {
  assert.equal(confirmationErrorKind({ code: 'otp_expired', status: 403 }), 'invalid');
  assert.equal(confirmationErrorKind({ code: 'over_request_rate_limit', status: 429 }), 'error');
  assert.equal(confirmationErrorKind({ code: 'otp_disabled', status: 403 }), 'error');
  assert.equal(confirmationErrorKind({ status: 400 }), 'error');
});
