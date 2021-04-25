import { Router } from 'express';
import { paramShouldBeNumber } from '../middleware';

import { users } from '../repositories';


const router = Router();

router.get('/', async (req, res) => {
  const allUsers = await users.all();

  res.json(allUsers);
});

router.get('/:id', paramShouldBeNumber('id'), async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const user = await users.single(id);

  if (!user)
    return res.status(404).json({ message: 'User not found.' });

  res.json(user);
});


export default router;
