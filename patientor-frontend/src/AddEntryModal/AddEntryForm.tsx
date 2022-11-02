import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { Field, Formik, Form } from "formik";

import { TextField, SelectField, HealthCheckOption, EntryTypeOption, DiagnosisSelection } from "./FormField";
import { EntryTypes, HealthCheckRating, EntryWithoutId } from "../types/entry";
import { useStateValue } from "../state";

export type EntryFormValues = EntryWithoutId;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
];

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryTypes.HealthCheck, label: "Health check" },
  { value: EntryTypes.Hospital, label: "Hospital" },
  { value: EntryTypes.OccupationalHealthcare, label: "Occupational healthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {

  const [{ diagnoses }, ] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryTypes.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: ""},
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryTypes.Hospital && (!values.discharge.date || !values.discharge.criteria)) {
          errors.discharge = requiredError;
        }
        if (values.type === EntryTypes.OccupationalHealthcare && !values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField label="Entry type" name="type" options={entryTypeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />   
            { 
              values.type === EntryTypes.HealthCheck &&
              <SelectField label="Health check rating" name="healthCheckRating" options={healthCheckOptions} /> 
            }
            { 
              values.type === EntryTypes.Hospital && 
              <Box>
                <Typography variant="subtitle2" style={{ color: "red" }}>
                  Discharge
                </Typography>
                <Field
                  label="Date"
                  placeholder="Discharge date"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Criteria"
                  placeholder="Discharge criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </Box>
            }
            { 
              values.type === EntryTypes.OccupationalHealthcare && <>
              <Field
                label="Employer"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
              />
              <Box>
                <Typography variant="subtitle2" style={{ color: "red" }}>
                  Sick leave
                </Typography>
                <Field
                  label="Start Date"
                  placeholder="From"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="End Date"
                  placeholder="Till"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </Box> </>
            }
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
