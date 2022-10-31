import axios from "axios";
import React, { SetStateAction } from "react";
import { apiBaseUrl } from "../constants";
import { NewPatient, Patient } from "../types";

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

const sendNewPatient = async (
  newPatientClient: NewPatient,
  setError: React.Dispatch<SetStateAction<string | undefined>>
) => {
  try {
    const { data: newPatient } = await axios.post<Patient>(
      `${apiBaseUrl}/patients`,
      newPatientClient
    );
    return newPatient;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error(e?.response?.data || "Unrecognized axios error");
      setError(String(e?.response?.data?.error) || "Unrecognized axios error");
    } else {
      console.error("Unknown error", e);
      setError("Unknown error");
    }
  }
};

export default { fetchPatientList, fetchPatientDetails, sendNewPatient };