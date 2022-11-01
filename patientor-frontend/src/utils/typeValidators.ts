export const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    return "";
  }
  return str;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};