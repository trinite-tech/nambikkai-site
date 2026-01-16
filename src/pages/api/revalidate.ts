import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Allow only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Security check
  if (req.headers['x-secret'] !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    // Revalidate pages
    await res.revalidate('/');
    await res.revalidate('/news');
    await res.revalidate('/category');

    return res.status(200).json({
      revalidated: true,
      time: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ message: 'Revalidation failed' });
  }
}
