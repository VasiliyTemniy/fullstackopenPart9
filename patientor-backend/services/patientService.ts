import patients from '../data/patients';

import { Patient, PatientNoSSN } from '../types/patient';

const getEntries = () : Patient[] => {
  return patients;
};

const getEntriesNoSSN = () : PatientNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

export default { getEntries, getEntriesNoSSN };