import nc from 'next-connect';

import { withAuthRequest } from '@/lib/withAuthRequest';

const handler = nc({ attachParams: true });

handler.patch(async (req, res) => {
  const {
    query: { id },
    body,
  } = req;

  console.log('==> body', body);

  const { results } = await withAuthRequest(`/api/reservations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

  const data = await results.json();

  res.status(results.status).json(data.data);
});

export default handler;
