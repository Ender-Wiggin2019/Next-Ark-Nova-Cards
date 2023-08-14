export function url(path = '') {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://ark-nova.ender-wiggin.com'
      : 'http://localhost:3000';

  return new URL(path, baseUrl);
}
