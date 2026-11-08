export function authenticate(client, { register, email, password, name, origin }) {
  const credentials = { email: email.trim(), password };
  return register
    ? client.auth.signUp({ ...credentials, options: {
      emailRedirectTo: new URL('/auth', origin).href,
      data: { full_name: name.trim() },
    } })
    : client.auth.signInWithPassword(credentials);
}

// Deliberately omit credentials, request bodies, sessions and token values.
export function authFailureDetails(error) {
  return {
    status: typeof error?.status === 'number' ? error.status : null,
    code: typeof error?.code === 'string' ? error.code : 'unknown',
    message: typeof error?.message === 'string' ? error.message : 'Unknown authentication error',
  };
}
