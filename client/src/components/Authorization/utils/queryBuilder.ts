interface Params {
  [key: string]: string;
}

export const queryBuilder = (initialUrl: string, params: Params) => {
  const url = new URL(initialUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
};

export const queryBuilderRouter = (path: string, params: Params) => {
  const start = "http://localhost";
  return queryBuilder(`${start}${path}`, params).replace(start, "");
};
