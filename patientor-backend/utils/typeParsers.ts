import { Discharge, EntryType, HealthCheckRating, SickLeave } from "../types/entry";
import { Gender } from "../types/patient";
import { Diagnosis } from "../types/diagnosis";

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

const parseDiagnosisCodes = (diagnosisCodes: unknown[]): Array<Diagnosis['code']> => {
  return diagnosisCodes.map(str => parseString(str));
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === null || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect HealthCheckRating ${rating}`);
  }
  return rating;
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Incorrect entry type ${type}`);
  }
  return type;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isObject(discharge)) {
    throw new Error(`Incorrect discharge ${discharge} not an object`);
  }
  if (!Object.keys(discharge).includes('date') || !Object.keys(discharge).includes('criteria')) {
    throw new Error(`Incorrect discharge fields ${discharge}`);
  }
  if (!discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error(`Incorrect discharge date ${discharge.date}`);
  }
  if (!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error(`Incorrect discharge criteria ${discharge.criteria}`);
  }
  return { date: discharge.date, criteria: discharge.criteria };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isObject(sickLeave)) {
    throw new Error(`Incorrect sickLeave ${sickLeave} not an object`);
  }
  if (!Object.keys(sickLeave).includes('startDate') || !Object.keys(sickLeave).includes('endDate')) {
    throw new Error(`Incorrect sickLeave fields ${sickLeave}`);
  }
  if (!sickLeave.startDate || !isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
    throw new Error(`Incorrect sickLeave startDate ${sickLeave.startDate}`);
  }
  if (!sickLeave.endDate || !isString(sickLeave.endDate)) {
    throw new Error(`Incorrect sickLeave endDate ${sickLeave.endDate}`);
  }
  return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
};

const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return (typeof obj === "object" || obj instanceof Object);
};

const isEntryType = (str: unknown): str is EntryType => {
  return (str === "HealthCheck" || str === "OccupationalHealthcare" || str === "Hospital");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

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

export default {
  parseString,
  parseDate,
  parseGender,
  parseEntryType,
  parseDiagnosisCodes,
  parseHealthCheckRating,
  parseDischarge,
  parseSickLeave,
};