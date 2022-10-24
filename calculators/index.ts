import express from 'express';
import { calculateBmi, parseWebArgumentsBMI } from './bmiCalculator';
//import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const queryHeight = req.query.height;
  const queryWeight = req.query.weight;
  try {
    const { height, mass } = parseWebArgumentsBMI(queryHeight, queryWeight);
    const responseObject = {
      weight: mass,
      height: height,
      bmi: calculateBmi(height, mass),
    };
    res.send(JSON.stringify(responseObject));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
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