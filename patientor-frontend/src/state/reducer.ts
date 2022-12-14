import { State } from "./state";
import { NewPatient, Patient } from "../types/patient";
import patientService from "../utils/patientService";
import diagnosisService from "../utils/diagnosisService";
import { SetStateAction } from "react";
import { Diagnosis } from "../types/diagnosis";
import { Entry, EntryWithoutId } from "../types/entry";
import entryService from "../utils/entryService";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_DETAILS";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: {
      entry: Entry,
      patientId: string,
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT_DETAILS": {
      const id = action.payload.id;
      const newState = {
        ...state,
        patients: {
          ...state.patients,
        }
      };
      newState.patients[id].ssn = action.payload.ssn;
      newState.patients[id].entries = action.payload.entries;

      return newState;
    }
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY": {
      const id = action.payload.patientId;
      const patient = state.patients[id];
      const updatedPatient = {
        ...patient,
        entries: patient.entries?.concat(action.payload.entry)
      };

      return {
        ...state,
        patients: {
          ...state.patients,
          [id]: { ...updatedPatient }
        }
      };
    }
    default:
      return state;
  }
};

const setPatientListAction = (patientListFromApi: Patient[]) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi,
  };
};

const setPatientDetailsAction = (patientDetailsFromApi: Patient) : Action => {
  return {
    type: "SET_PATIENT_DETAILS",
    payload: patientDetailsFromApi,
  };
};

const addNewPatientAction = (newPatient: Patient) : Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};

const setDiagnosesListAction = (diagnosesListFromApi: Diagnosis[]) : Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesListFromApi,
  };
};

const addNewEntryAction = (newEntry: Entry, patientId: string) : Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      entry: newEntry,
      patientId: patientId
    },
  };
};

export const patientDetailsInit = (dispatch: React.Dispatch<Action>, state: State, id: string) => {
  if (Object.keys(state.patients).length === 0) {
    void patientListInitDispatch(dispatch);
    void diagnosesListInitDispatch(dispatch);
    void patientDetailsInitDispatch(dispatch, id);
  } else {
    if (!state.patients[`${id}`].ssn) {
      void patientDetailsInitDispatch(dispatch, id);
    }
  }
};

export const patientListInit = (dispatch: React.Dispatch<Action>, state: State) => {
  if (Object.keys(state.patients).length === 0) {
    void patientListInitDispatch(dispatch);
  }
};

export const addNewPatient = async (
  dispatch: React.Dispatch<Action>,
  newPatientClient: NewPatient,
  setError: React.Dispatch<SetStateAction<string | undefined>>,
  closeAddPatientModal: () => void
) => {
  const newPatient = await patientService.sendNewPatient(newPatientClient, setError, closeAddPatientModal);
  if (newPatient) {
    dispatch(addNewPatientAction(newPatient));
  }
};

export const addNewEntry = async (
  dispatch: React.Dispatch<Action>,
  newEntryClient: EntryWithoutId,
  setError: React.Dispatch<SetStateAction<string | undefined>>,
  closeAddEntryModal: () => void,
  patientId: string
) => {
  const newEntry = await entryService.sendNewEntry(newEntryClient, setError, closeAddEntryModal, patientId);
  if (newEntry) {
    dispatch(addNewEntryAction(newEntry, patientId));
  }
};

export const diagnosesListInit = (dispatch: React.Dispatch<Action>, state: State) => {
  if (Object.keys(state.diagnoses).length === 0) {
    void diagnosesListInitDispatch(dispatch);
  }
};

const patientDetailsInitDispatch = async (dispatch: React.Dispatch<Action>, id: string) => {
  const patientDetailsFromApi = await patientService.fetchPatientDetails(id);
  if (patientDetailsFromApi) {
    dispatch(setPatientDetailsAction(patientDetailsFromApi));
  }
};


const patientListInitDispatch = async (dispatch: React.Dispatch<Action>) => {
  const patientListFromApi = await patientService.fetchPatientList();
  if (patientListFromApi) {
    dispatch(setPatientListAction(patientListFromApi));
  }
};

const diagnosesListInitDispatch = async (dispatch: React.Dispatch<Action>) => {
  const diagnosesListFromApi = await diagnosisService.fetchDiagnosesList();
  if (diagnosesListFromApi) {
    dispatch(setDiagnosesListAction(diagnosesListFromApi));
  }
};