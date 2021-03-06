import { Router } from 'express';

import { paramShouldBeNumber } from '../middleware';
import { users } from '../repositories';
import { isValidUserInsert } from '../validators';
import { isValidUserUpdate } from '../validators/is-valid-user-update';


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

router.post('/', async (req, res) => {
  const payload = req.body;

  if (!isValidUserInsert(payload))
    return res.status(422).json();

  if (!await users.isUsernameAvailable(payload.username))
    return res.status(409).json({ message: 'Username already taken.' });

  users.insert(payload);

  res.status(200).json();
});

router.put('/:id', paramShouldBeNumber('id'), async (req, res) => {
  const payload = req.body;

  const id = Number.parseInt(req.params.id);
  const user = await users.single(id);

  if (!user)
    return res.status(400).json({ message: 'User not found.' });

  if (!isValidUserUpdate(payload))
    return res.status(422).json();

  if (payload.name)
    user.name = payload.name;

  if (payload.username) {
    if (!users.isUsernameAvailable(payload.username))
      return res.status(409).json({ message: 'Username already taken.' });

    user.username = payload.username;
  }

  users.update(user);

  res.status(204).json();
});

router.delete('/:id', paramShouldBeNumber('id'), async (req, res) => {
  const id = Number.parseInt(req.params.id);

  if (!await users.exists(id))
    return res.status(400).json({ message: 'User not found.' });

  users.remove(id);

  res.status(204).json();
});


export default router;
