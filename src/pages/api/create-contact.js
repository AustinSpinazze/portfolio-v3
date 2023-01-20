import { isValidEmail } from '@/lib/isValidEmail';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us21',
});

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
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed.' });
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

    const response = await mailchimp.lists.addListMember('9775124585', {
      email_address: email,
      status: 'subscribed',
    });

    res.status(201).json({ message: 'Contact successfully updated.' });
  } catch (error) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error });
  }
}
