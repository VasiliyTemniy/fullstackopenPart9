import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatient, Patient, PublicPatient } from '../types/patient';

const getPatients = () : Patient[] => {
  return patients;
};

const getPatientsSafeDetails = () : PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getOnePatient = (id: string) : Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    return patient;
  } else {
    throw new Error('Did not found patient with this ID');
  }
};

const getOnePatientSafeDetails = (id: string) : PublicPatient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    const result = {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    };
    return result;
  } else {
    throw new Error('Did not found patient with this ID');
  }
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientsSafeDetails, getOnePatient, getOnePatientSafeDetails, addPatient };