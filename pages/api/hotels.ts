// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Hotel } from '../../interfaces';
import { mockedHotels } from '../../utils';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Hotel[]>
) {
  res.status(200).json(mockedHotels);
}
