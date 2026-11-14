export function authenticate(client, { register, email, password, name, origin }) {
  const credentials = { email: email.trim(), password };
  return register
    ? client.auth.signUp({ ...credentials, options: {
      emailRedirectTo: new URL('/auth', origin).href,
      data: { full_name: name.trim() },
    } })
    : client.auth.signInWithPassword(credentials);
}

export function resendConfirmation(client, email, origin) {
  return client.auth.resend({
    type: 'signup', email: email.trim(),
    options: { emailRedirectTo: new URL('/auth', origin).href },
  });
}

export function signupResult(data) {
  if (data?.session) return 'signed_in';
  if (Array.isArray(data?.user?.identities) && data.user.identities.length === 0) return 'existing';
  return 'confirmation';
}

export function confirmSignup(client, tokenHash) {
  return client.auth.verifyOtp({ token_hash: tokenHash, type: 'email' });
}

export function confirmationErrorKind(error) {
  if (error?.code === 'otp_expired') return 'invalid';
  return 'error';
}

export function documentDestination(value) {
  return typeof value === 'string' && /^\/(?:courses(?:\/\d+)?|saved|topics(?:\/[a-z0-9-]+)?)(?:[?#]|$)/i.test(value) ? value : '/';
}

export function requestPasswordReset(client, email, origin) {
  return client.auth.resetPasswordForEmail(email.trim(), { redirectTo: new URL('/auth/reset-password', origin).href });
}

// Deliberately omit credentials, request bodies, sessions and token values.
export function authFailureDetails(error) {
  return {
    status: typeof error?.status === 'number' ? error.status : null,
    code: typeof error?.code === 'string' ? error.code : 'unknown',
    message: typeof error?.message === 'string' ? error.message : 'Unknown authentication error',
  };
}
