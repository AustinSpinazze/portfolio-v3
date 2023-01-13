import { isValidEmail } from '@/lib/isValidEmail';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(2, '10 s'),
});

function parseIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',').shift() ||
    req.socket?.remoteAddress
  );
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'PUT') {
      res.status(405).send({ message: 'Only PUT requests allowed.' });
      return;
    }

    const identifier = parseIp(req);
    const result = await ratelimit.limit(identifier);
    res.setHeader('X-RateLimit-Limit', result.limit);
    res.setHeader('X-RateLimit-Remaining', result.remaining);

    if (!result.success) {
      res.status(429).json({
        message: 'Too many requests. Please try again later.',
      });
      return;
    }

    let { email } = JSON.parse(req.body);

    if (!isValidEmail) {
      res
        .status(400)
        .send({ message: 'Please provide a valid email address.' });
      return;
    }

    console.log('Right before Fetch');

    const response = await fetch(
      'https://api.sendgrid.com/v3/marketing/contacts',
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contacts: [
            {
              email: email,
            },
          ],
        }),
      }
    );

    console.log('After fetch', response.body);

    if (!response.ok) throw new Error(response.statusText);

    res.status(201).json({ message: 'Contact successfully updated.' });
  } catch (error) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
}
