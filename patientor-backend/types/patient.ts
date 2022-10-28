export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  //gender: Gender;
  gender: string;
  occupation: string;
}

export type PatientNoSSN = Omit<Patient, 'ssn'>;

//export type Gender = 'male' | 'female' | 'third' | 'unspecified';