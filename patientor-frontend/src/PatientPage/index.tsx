import { useParams } from "react-router-dom"; 
import React from "react";
import axios from "axios";
//import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "../constants";
import { useStateValue, patientDetailsInit } from "../state";

import MaleIco from "../img/male.png";
import FemaleIco from "../img/female.png";
import OtherIco from "../img/cthulhu.png";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  const [state, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    void patientDetailsInit(dispatch, state, id);
  }, [id]);

  const patient = state.patients[`${id}`];

  if (!patient) {
    return null;
  }

  const imageSource = 
    patient.gender === 'male' ? MaleIco
  : patient.gender === 'female' ? FemaleIco
  : OtherIco;

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