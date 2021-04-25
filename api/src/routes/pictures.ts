import { Router } from 'express';

import { paramShouldBeNumber } from '../middleware';
import { pictures } from '../repositories';


const router = Router();

router.get('/', async (req, res) => {
  const allPictures = await pictures.all();

  res.json(allPictures);
});

router.get('/:id', paramShouldBeNumber('id'), async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const picture = await pictures.single(id);

  if (!picture)
    return res.status(404).json({ message: 'Picture not found.' });

  res.json(picture);
});

router.get('/:id/analytics', paramShouldBeNumber('id'), async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const analytics = await pictures.analyticsOf(id);

  if (!analytics)
    return res.status(404).json({ message: 'Analytics not found.' });

  res.json(analytics);
});

export default router;
