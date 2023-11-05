export const baseFetch = (url, method, fetchHeaders) => {
  const headers = new Headers({ ...fetchHeaders });

  return fetch(url, {
    method,
    mode: 'cors',
    headers,
  });
};
