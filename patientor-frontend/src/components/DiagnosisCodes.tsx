import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";

import { Entry } from "../types/entry";
import { parseString } from "../utils/typeValidators";
import { useStateValue } from "../state";
import { diagnosesBoxStyle } from "../inline-styles/liststyles";

interface EntryProps {
  entry: Entry;
}

const DiagnosisCodes = (props: EntryProps) => {

  const [state, ] = useStateValue();
  const entry = props.entry;

  if (!entry.diagnosisCodes) return null;

  return (
    <>
    <ul style={diagnosesBoxStyle}>
      {entry.diagnosisCodes.map(code => {
        const title = parseString(state.diagnoses[code].latin);
          return (
            <li key={`${entry.id} ${code}`}>
              <Tooltip title={title} placement="left">
                <Typography variant="body2">
                  {code} {state.diagnoses[code].name}
                </Typography>
              </Tooltip>
            </li>
          );
        }
      )}
    </ul>
    <Divider />
    </>
  );
};

export default DiagnosisCodes;