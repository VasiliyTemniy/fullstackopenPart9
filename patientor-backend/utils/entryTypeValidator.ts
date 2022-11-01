import { EntryWithoutId } from "../types/entry";
import { HealthCheckEntryWithoutId, HospitalEntryWithoutId, OccupationalHealthCareEntryWithoutId } from "../types/entry";
import typeParsers from "./typeParsers";

type Fields = { 
  type: unknown,
  date: unknown,
  specialist: unknown,
  description: unknown,
  diagnosisCodes?: unknown[],
  healthCheckRating?: unknown,
  discharge?: unknown,
  employerName?: unknown,
  sickLeave?: unknown,
};

const entryTypeValidator = ({ 
  type,
  date,
  specialist,
  description,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
  } : Fields): EntryWithoutId => {
  
  const typeTV = typeParsers.parseEntryType(type);

  const baseTypeEntry = diagnosisCodes ? {
    date: typeParsers.parseDate(date),
    specialist: typeParsers.parseString(specialist),
    description: typeParsers.parseString(description),
    diagnosisCodes: typeParsers.parseDiagnosisCodes(diagnosisCodes),
  } : {
    date: typeParsers.parseDate(date),
    specialist: typeParsers.parseString(specialist),
    description: typeParsers.parseString(description),
  };

  switch (typeTV) {
    case "HealthCheck":
      const healthCheckEntryTV: HealthCheckEntryWithoutId = {
        type: typeTV,
        ...baseTypeEntry,
        healthCheckRating: typeParsers.parseHealthCheckRating(healthCheckRating),
      };
      return healthCheckEntryTV;
    case "OccupationalHealthcare":
      const occupationalHealthcareEntryTV: OccupationalHealthCareEntryWithoutId = 
      sickLeave ? {
        type: typeTV,
        ...baseTypeEntry,
        employerName: typeParsers.parseString(employerName),
        sickLeave: typeParsers.parseSickLeave(sickLeave),
      } : {
        type: typeTV,
        ...baseTypeEntry,
        employerName: typeParsers.parseString(employerName),
      };
      return occupationalHealthcareEntryTV;
    case "Hospital":
      const hospitalEntryTV: HospitalEntryWithoutId = {
        type: typeTV,
        ...baseTypeEntry,
        discharge: typeParsers.parseDischarge(discharge),
      };
      return hospitalEntryTV;
    default:
      throw new Error(`Unhandled error: ${JSON.stringify(baseTypeEntry)}`);
  }

};

export default entryTypeValidator;