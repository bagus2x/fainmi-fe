import { NextApiRequest, NextApiResponse } from 'next';

export default function index(req: NextApiRequest, res: NextApiResponse) {
    res.status(200);
    res.json({ message: 'assalamualikum wr.wb' });
}
