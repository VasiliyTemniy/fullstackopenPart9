import { NewPatient } from "../types/patient";
import typeParsers from "./typeParsers";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const patientTypeValidator = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {
  const patientTV: NewPatient = {
    name: typeParsers.parseString(name),
    dateOfBirth: typeParsers.parseDate(dateOfBirth),
    ssn: typeParsers.parseString(ssn),
    gender: typeParsers.parseGender(gender),
    occupation: typeParsers.parseString(occupation),
  };
  return patientTV;
};

export default patientTypeValidator;