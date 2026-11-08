export function authenticate(client, { register, email, password, name, origin }) {
  const credentials = { email: email.trim(), password };
  return register
    ? client.auth.signUp({ ...credentials, options: {
      emailRedirectTo: new URL('/auth', origin).href,
      data: { full_name: name.trim() },
    } })
    : client.auth.signInWithPassword(credentials);
}
