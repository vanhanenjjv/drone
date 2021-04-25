import express from 'express';

import { drones, users, pictures } from './routes';


const app = express();

app.use(express.json());

app.use('/drones', drones);
app.use('/users', users);
app.use('/pictures', pictures);

app.listen(8000);
