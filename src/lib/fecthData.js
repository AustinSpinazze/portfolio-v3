export function fetchData(url, options, cache = {}) {
  return new Promise((resolve, reject) => {
    // If a cache exists for this url, return it
    if (cache[url]) {
      resolve({ data: cache[url] });
      return;
    }
    // Do nothing if the url is not given
    if (!url) return;

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          reject(new Error(response.statusText));
        }
        return response.json();
      })
      .then((data) => {
        cache[url] = data;
        resolve({ data });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
