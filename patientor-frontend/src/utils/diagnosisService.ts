import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types/diagnosis";

const fetchDiagnosesList = async () => {
  try {
    const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
      `${apiBaseUrl}/diagnoses`
    );
    return diagnosesListFromApi;
  } catch (e) {
    console.error(e);
  }
};

export default { fetchDiagnosesList };