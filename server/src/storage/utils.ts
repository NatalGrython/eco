function replaceAll(string: string, search: string, replace: string) {
  return string.split(search).join(replace);
}

export const createPath = (path: string) =>
  `http://${process.env.HOST}:${process.env.PORT}/${replaceAll(
    path.replace('public\\', '').replace('public/', ''),
    '\\',
    '/',
  )}`;
