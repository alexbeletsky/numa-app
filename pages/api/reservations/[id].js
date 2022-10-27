import nc from 'next-connect';

import { withAuthFetch } from '@/lib/withAuthFetch';

const handler = nc({ attachParams: true });

handler.patch(async (req, res) => {
  const {
    query: { id },
    body,
  } = req;

  const results = await withAuthFetch(`/api/reservations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

  const data = await results.json();

  res.status(results.status).json(data.data);
});

export default handler;
