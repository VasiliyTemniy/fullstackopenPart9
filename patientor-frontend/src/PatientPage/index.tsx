import { useParams } from "react-router-dom"; 
import React from "react";
import axios from "axios";

import List from "@material-ui/core/List";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import EntryDetails from "../components/EntryDetails";

import { apiBaseUrl } from "../constants";
import { useStateValue, patientDetailsInit } from "../state";

import MaleIco from "../img/male.png";
import FemaleIco from "../img/female.png";
import OtherIco from "../img/cthulhu.png";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>404 Wrong id</div>;

  const [state, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    void patientDetailsInit(dispatch, state, id);
  }, [id]);

  const patient = state.patients[`${id}`];

  if (!patient) {
    return <div>Loading...</div>;
  }

  const imageSource = 
    patient.gender === 'male' ? MaleIco
  : patient.gender === 'female' ? FemaleIco
  : OtherIco;

  const showEntries = patient.entries 
  ? patient.entries.length > 0 
    ? <Card style={{ minWidth: "10rem", marginTop: "1rem" }}>
        <CardContent style={{ background: "#f3f3f3" }}>
          <List>
            {patient.entries.map(entry => 
              <EntryDetails key={entry.id} entry={entry}/>
            )}
          </List>
        </CardContent>
      </Card>
    : <Typography align="center" variant="h6">
        Patient has no entries
      </Typography>
  : null;

  return (
    <>
      <Card style={{ minWidth: "10rem", maxWidth: "20rem", marginTop: "1rem" }}>
        <CardContent style={{ background: "#f3f3f3" }}>
          <Typography variant="h6">
            {patient.name}
            <img src={imageSource} style={{ width: "1rem", paddingLeft: "1rem" }} />
          </Typography>
          <br/>
          <Typography variant="body1">
            ssn: {patient.ssn}
          </Typography>
          <Typography variant="body1">
            occupation: {patient.occupation}
          </Typography>
        </CardContent>
      </Card>
      <Typography align="center" variant="h6">
        Entries
      </Typography>
      {showEntries}
      <Button  variant="contained" onClick={() => null} style={{ marginTop: "1rem"}}>
        ADD NEW ENTRY
      </Button>
    </>
  );
};

export default PatientPage;