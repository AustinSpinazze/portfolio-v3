import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
// const jwt = require('jsonwebtoken');

import { WATER_BOT_CONTENT } from '@/lib/constants';

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

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * WATER_BOT_CONTENT.length);
  return WATER_BOT_CONTENT[randomIndex];
}

async function sendTwilioMessage() {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Basic ${process.env.TWILIO_BASIC_AUTH}`);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const message =
    "Hi there Water Bot 🤖 here! I am here to remind you to drink some water if you have not already. Here's a quote or joke to brighten your day:\n\n";
  const quote = getRandomQuote();
  const reminder = message + quote;

  const urlencoded = new URLSearchParams();
  urlencoded.append('Body', reminder);
  urlencoded.append('From', `+1${process.env.TWILIO_PHONE_NUMBER}`);
  urlencoded.append('To', `+1${process.env.PHONE_NUMBER}`);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  try {
    await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
      requestOptions
    );
  } catch (error) {
    console.log('error', error);
  }
}

export default async function handler(req, res) {
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

  // if (req.method !== 'POST') {
  //   res.status(405).send({ message: 'Only POST requests allowed' });
  //   return;
  // }

  // const token = req.query.key;

  try {
    // jwt.verify(token, process.env.JWT_SECRET);
    await sendTwilioMessage();
    res.status(201).json({ message: 'Message send succeeded' });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
}
