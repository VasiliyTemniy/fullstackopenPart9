import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const fetchPatientList = async () => {
  try {
    const { data: patientListFromApi } = await axios.get<Patient[]>(
      `${apiBaseUrl}/patients`
    );
    return patientListFromApi;
  } catch (e) {
    console.error(e);
  }
};

const fetchPatientDetails = async (id: string) => {
  try {
    const { data: patientDetailsFromApi } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    return patientDetailsFromApi;
  } catch (e) {
    console.error(e);
  }
};

export default { fetchPatientList, fetchPatientDetails };