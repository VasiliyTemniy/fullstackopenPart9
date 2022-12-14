import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());

import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

app.use((_req, _res, next) => {
  next();
}, cors({ maxAge: 84600 }));

app.use('/api/patients', patientRouter);

app.use('/api/diagnoses', diagnosesRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});