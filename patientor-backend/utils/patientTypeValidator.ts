import { NewPatient, Gender } from "../types/patient";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const patientTypeValidator = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {
  const patientTV: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
  };
  return patientTV;
};


const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect field content: ${str}`);
  }
  return str;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect gender ${gender}`);
  }
  return gender;
};

//const parseEntries = (entries: unknown[]): Entry => {
//  if {!entries || }
//};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};



export default patientTypeValidator;