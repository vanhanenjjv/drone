import { Router } from 'express';

import { paramShouldBeNumber } from '../middleware';
import { drones } from '../repositories';


const router = Router();

router.get('/', async (req, res) => {
  const allDrones = await drones.all();

  res.json(allDrones);
});

router.get('/:id', paramShouldBeNumber('id'), async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const drone = await drones.single(id);

  if (!drone)
    return res.status(404).json({ message: 'Drone not found.' });

  res.json(drone);
});

router.get('/:id/user', paramShouldBeNumber('id'), async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const user = await drones.userOf(id);

  res.json(user);
});

router.get('/:id/available', paramShouldBeNumber('id'), async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const isAvailable = await drones.isAvailable(id);

  res.json({ 'is_available': isAvailable });
});

// router.get('/:id/pictures', paramShouldBeNumber('id'), async (req, res) => {
//   const id = Number.parseInt(req.params.id);
//   const a = await repository.picturesOfDrone(id);

//   res.json(a);
// });


export default router;
