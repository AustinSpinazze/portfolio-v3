export default async function handler(req, res) {
  let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];

  console.log(ip);

  res.status(201).send({ message: 'Success.' });
}
