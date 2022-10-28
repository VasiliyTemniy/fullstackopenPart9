import diagnoses from '../data/diagnoses';

import { Diagnose } from '../types/diagnose';

const getEntries = () : Diagnose[] => {
  return diagnoses;
};

export default { getEntries };