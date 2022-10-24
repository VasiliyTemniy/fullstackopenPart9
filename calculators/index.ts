import express from 'express';
import { calculateBmi, parseWebArgumentsBMI } from './bmiCalculator';
import { exerciseCalculator, parseWebArgumentsExercise } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, mass } = parseWebArgumentsBMI(req.query.height, req.query.weight);
    const responseObject = {
      weight: mass,
      height: height,
      bmi: calculateBmi(height, mass),
    };
    res.send(JSON.stringify(responseObject));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.send(JSON.stringify({ error: errorMessage }));
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const { dailyHours, target } = parseWebArgumentsExercise(req.body.daily_exercises, req.body.target);
    res.send(JSON.stringify(exerciseCalculator(dailyHours, target)));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.send(JSON.stringify({ error: errorMessage }));
  }
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});