const { IPinfoWrapper, LruCache } = require('node-ipinfo');

const cacheOptions = {
  max: 5000,
  maxAge: 24 * 1000 * 60 * 60,
};
const cache = new LruCache(cacheOptions);
const ipinfo = new IPinfoWrapper('MY_TOKEN', cache);

export default async function handler(req, res) {
  let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];

  ipinfoWrapper.lookupIp(`${ip}`).then((response) => {
    console.log(response);
  });

  res.status(201).send({ message: 'Success.' });
}
