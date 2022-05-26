function replaceAll(string: string, search: string, replace: string) {
  return string.split(search).join(replace);
}

export const createPath = (path: string) =>
  `http://localhost:3001/${replaceAll(
    path.replace('public\\', '').replace('public/', ''),
    '\\',
    '/',
  )}`;
