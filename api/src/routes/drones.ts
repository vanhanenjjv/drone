import { Router } from 'express';

import { paramShouldBeNumber } from '../middleware';
import * as repository from '../repository';


const router = Router();

router.get('/', async (req, res) => {
  const drones = await repository.drones();

  res.json(drones);
});

router.get('/:id', paramShouldBeNumber('id'), async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const drone = await repository.singleDrone(id);

  if (!drone)
    return res.status(404).json({ message: 'Drone not found.' });

  res.json(drone);
});

router.get('/:id/user', paramShouldBeNumber('id'), async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const user = await repository.whoUsesDrone(id);

  res.json(user);
});

router.get('/:id/available', paramShouldBeNumber('id'), async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const isAvailable = await repository.isDroneAvailable(id);

  res.json({ 'is_available': isAvailable });
});


export default router;
