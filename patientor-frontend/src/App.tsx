import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue, getPatientList } from "./state";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";

import PatientPage from "./PatientPage";


const App = () => {
  const [state, dispatch] = useStateValue();
  
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    void getPatientList(dispatch, state);
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/:id" element={<PatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
