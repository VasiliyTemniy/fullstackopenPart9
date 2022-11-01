import { useState } from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from '@material-ui/core/Divider';

import { Entry } from "../types/entry";

import { listItemStyleNoHighlight, listItemStyleHighlight, textLine } from "../inline-styles/liststyles";
import HealthRatingBar from "./HealthRatingBar";
import DiagnosisCodes from "./DiagnosisCodes";
import { assertNever } from "../utils/typeValidators";

interface EntryProps {
  key: string;
  entry: Entry;
}

const EntryDetails = (props: EntryProps) => {

  const entry = props.entry;
  const [listItemStyle, setlistItemStyle] = useState<Record<string, unknown>>(listItemStyleNoHighlight);

  if (!entry) {
    return <div>Loading...</div>;
  }

  let avatar;
  switch (entry.type) {
    case "HealthCheck": {
      avatar = <MedicalInformationIcon />;
      break;
    }
    case "Hospital": {
      avatar = <MedicalServicesIcon />;
      break;
    }  
    case "OccupationalHealthcare": {
      avatar = <WorkIcon />;
      break;
    }
    default:
      assertNever(entry);
  }

  const showHealthCheck = entry.type === "HealthCheck" 
  ? <>
      <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
      <Divider />
    </>
  : null;

  const showEmployerName = entry.type === "OccupationalHealthcare"
  ? entry.sickLeave
    ? <>
        <Typography variant="body2" style={textLine}>
          employer: {entry.employerName}
        </Typography>
        <Divider />
        <Typography variant="body2" style={textLine}>
          sick leave: from {entry.sickLeave.startDate} till {entry.sickLeave.endDate}
        </Typography>
        <Divider />
      </>
    : <>
        <Typography variant="body2" style={textLine}>
          employer: {entry.employerName}
        </Typography>
        <Divider />
      </>
  : null;

  const showDischarge = entry.type === "Hospital"
  ? <>
      <Typography variant="body2" style={textLine}>
        discharge date: {entry.discharge.date} criteria: {entry.discharge.criteria}
      </Typography>
      <Divider />
    </>
  : null;

  return (
    <ListItem style={listItemStyle}
      onMouseOver={() => setlistItemStyle(listItemStyleHighlight)}
      onMouseOut={() => setlistItemStyle(listItemStyleNoHighlight)}
    >
      <Box display="block" width="100%">
        <Box flexWrap="wrap" flexGrow={1} display="flex">
          <ListItemAvatar>
            <Avatar>
              {avatar}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={entry.description} secondary={entry.date} />
        </Box>
        <Divider />
        <DiagnosisCodes entry={entry} />
        {showHealthCheck}
        {showEmployerName}
        {showDischarge}
        <Typography variant="body2" style={textLine}>
          diagnose by {entry.specialist}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default EntryDetails;