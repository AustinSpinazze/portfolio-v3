import { NextRequest } from 'next/server';

export default async function handler(req, res) {
  if (req.ip) {
    console.log('ip: ', req.ip);
  }

  res.status(201).send({ message: 'Success.' });
}

NextRequest;
