import { State } from "./state";
import { Patient } from "../types";
import patientService from "../utils/patientService";

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
    default:
      return state;
  }
};

const setPatientList = (patientListFromApi: Patient[]) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi,
  };
};

const setPatientDetails = (patientDetailsFromApi: Patient) : Action => {
  return {
    type: "SET_PATIENT_DETAILS",
    payload: patientDetailsFromApi,
  };
};

export const getPatientDetails = (dispatch: React.Dispatch<Action>, state: State, id: string) => {
  if (Object.keys(state.patients).length === 0) {
    void patientListInit(dispatch);
    void patientDetailsInit(dispatch, id);
  } else {
    if (!state.patients[`${id}`].ssn) {
      void patientDetailsInit(dispatch, id);
    }
  }
};

export const getPatientList = (dispatch: React.Dispatch<Action>, state: State) => {
  if (Object.keys(state.patients).length === 0) {
    void patientListInit(dispatch);
  }
};

const patientDetailsInit = async (dispatch: React.Dispatch<Action>, id: string) => {
  const patientDetailsFromApi = await patientService.fetchPatientDetails(id);
  if (patientDetailsFromApi) {
    dispatch(setPatientDetails(patientDetailsFromApi));
  }
};


const patientListInit = async (dispatch: React.Dispatch<Action>) => {
  const patientListFromApi = await patientService.fetchPatientList();
  if (patientListFromApi) {
    dispatch(setPatientList(patientListFromApi));
  }
};