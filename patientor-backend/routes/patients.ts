import express from 'express';

import patientService from '../services/patientService';
import patientTypeValidator from '../utils/patientTypeValidator';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getPatientsNoSSN());
});

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.getOnePatientNoSSN(req.params.id);
  
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = patientTypeValidator(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;