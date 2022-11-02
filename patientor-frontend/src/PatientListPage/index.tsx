import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types/patient";
import { Entry, HealthCheckEntry, HealthCheckRating } from "../types/entry";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import { addNewPatient } from "../state";

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = (values: PatientFormValues) => {
    void addNewPatient(dispatch, { ...values }, setError, closeModal);
  };

  const lastHealthCheckResult = (entries: Entry[]) : HealthCheckRating => {   // this could be useful if we fetch all entry details
    const dummyHealthCheckEntry : HealthCheckEntry = {                        // upon rendering of this component
      id: "1",                                                                // but it works immediately after state gets info
      type: "HealthCheck",                                                    // about patient entries and shows correct info
      description: "dummy",
      date: "1000-01-01",
      specialist: "dummy",
      healthCheckRating: 4
    };
    const healthCheckEntries = entries.filter(entry => entry.type === "HealthCheck");
    const lastCheckEntry = healthCheckEntries.reduce((prevEntry, entry) => {
      return new Date(prevEntry.date) < new Date(entry.date)
        ? entry
        : prevEntry;
    }, dummyHealthCheckEntry) as HealthCheckEntry;
    return lastCheckEntry.healthCheckRating;
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => {
            const lastHealthCheckRating = !patient.entries
             ? 1
             : lastHealthCheckResult(patient.entries);
            return (
            <TableRow key={patient.id}>
              <TableCell>
                <Link component={RouterLink} to={`/${patient.id}`}>
                  {patient.name}
                </Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={lastHealthCheckRating} />
              </TableCell>
            </TableRow>
          );})}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
