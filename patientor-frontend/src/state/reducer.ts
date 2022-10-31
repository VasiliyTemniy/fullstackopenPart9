import { State } from "./state";
import { Patient } from "../types";

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

   /* return {
        ...state,
        patients: {
          [action.payload.id]: {
            ...action.payload,        // this should have worked, but it didnt
          },
          ...state.patients
        }
      }; */

   /* return {
        ...state,
        patients: {
          [action.payload.id]: {
            ...action.payload,        // this also did not work
            ssn: action.payload.ssn,
            entries: action.payload.entries,
          },
          ...state.patients
        }
      }; */

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