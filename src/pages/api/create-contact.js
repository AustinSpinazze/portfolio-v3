export default async function handler(req, res) {
  try {
    if (req.method !== 'PUT') {
      res.status(405).send({ message: 'Only PUT requests allowed.' });
      return;
    }

    let { email } = JSON.parse(req.body);

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

    if (!response.ok) throw new Error(response.statusText);

    res.status(201).json({ message: 'Contact successfully updated.' });
  } catch (error) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
}
