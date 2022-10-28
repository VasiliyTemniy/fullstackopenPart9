import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatient, Patient, PatientNoSSN } from '../types/patient';

const getPatients = () : Patient[] => {
  return patients;
};

const getPatientsNoSSN = () : PatientNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getOnePatient = (id: string) : Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const getOnePatientNoSSN = (id: string) : PatientNoSSN | undefined => {
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
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientsNoSSN, getOnePatient, getOnePatientNoSSN, addPatient };