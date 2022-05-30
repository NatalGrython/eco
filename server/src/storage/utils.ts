function replaceAll(string: string, search: string, replace: string) {
  return string.split(search).join(replace);
}

export const createPath = (path: string) =>
  `${replaceAll(path.replace('public\\', 'public/'), '\\', '/')}`;
