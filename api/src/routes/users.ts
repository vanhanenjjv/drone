import { Router } from 'express';

import * as repository from '../repository';


const router = Router();

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ message: 'Id should be a number.' });

  const drone = await repository.singleUser(id);

  if (!drone)
    return res.status(404).json({ message: 'User not found.' });

  res.json(drone);
});


export default router;
