import { useParams } from "react-router-dom"; 
import React from "react";
import axios from "axios";
//import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

import MaleIco from "../img/male.png";
import FemaleIco from "../img/female.png";
import OtherIco from "../img/cthulhu.png";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  const [state, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    if (!state.patients[`${id}`].ssn) {
      if (Object.keys(state.patients).length !== 0) {
        void fetchPatientDetails();
      } else {
        void fetchPatientList();     // this makes shure that if somebody reshreshes the patient page
        void fetchPatientDetails();  // the app wouldn't crash trying to put info about ssn and entries to an unexisting object
      }
    }
  }, [id]);

  const fetchPatientDetails = async () => {
    try {
      const { data: patientDetailsFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch({ type: "SET_PATIENT_DETAILS", payload: patientDetailsFromApi });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPatientList = async () => {
    try {
      const { data: patientListFromApi } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients`
      );
      dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
    } catch (e) {
      console.error(e);
    }
  };

  const patient = state.patients[`${id}`];

  const imageSource = 
    patient.gender === 'male' ? MaleIco
  : patient.gender === 'female' ? FemaleIco
  : OtherIco;

  if (!patient) {
    return null;
  }
  
  return (
    <div>
      <h2>
        {patient.name}
        <img src={imageSource} style={{ width: "1rem", paddingLeft: "1rem" }} />
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientPage;