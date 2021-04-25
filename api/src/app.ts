import express from 'express';

import { drones, users } from './routes';


const app = express();

app.use('/drones', drones);
app.use('/users', users);

app.listen(8080);
