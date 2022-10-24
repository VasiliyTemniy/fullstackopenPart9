/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
interface Exercises {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface argsExercise {
  dailyHours: number[],
  target: number
}

const parseArgumentsExercise = (args: Array<string>): argsExercise => {
  if (args.length < 4) throw new Error('Not enough arguments');

  for ( let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    } else if (Number(args[i]) > 24) {
      throw new Error('There is only 24 hours in day!');
    }
  }

  const dailyHours = [];

  for ( let i = 2; i < args.length - 1; i++) {
    dailyHours.push(Number(args[i]));
  }
  
  return {
    dailyHours,
    target: Number(args[args.length - 1])
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseWebArgumentsExercise = (dailyHours: any, target: any): argsExercise => {
  if (!Array.isArray(dailyHours)) throw new Error('Daily hours malformed');
  if (isNaN(Number(target))) throw new Error('Target malformed');

  const checkedHours = dailyHours.map(day => {
    if (isNaN(Number(day))) {
      throw new Error('Provided values were not numbers!');
    } else if (Number(day) > 24) {
      throw new Error('There is only 24 hours in day!');
    } else {
      return Number(day);
    }
  });

  return {
    dailyHours: checkedHours,
    target: Number(target)
  };
};

export const exerciseCalculator = (dailyHoursArray: number[], targetDaily: number) : Exercises => {
  const result = <Exercises>{};
  result.periodLength = dailyHoursArray.length;
  result.trainingDays = dailyHoursArray.filter(hours => hours > 0).length;
  result.target = targetDaily;
  result.average = dailyHoursArray.reduce((acc, curr) => acc + curr) / result.periodLength;
  result.success = result.average > result.target;
  const ratio = result.average / targetDaily;
  if ( ratio < 0.5 ) {
    result.rating = 1;
    result.ratingDescription = `you didn't even start!`;
  } else if ( ratio < 1 ) {
    result.rating = 2;
    result.ratingDescription = `not too bad but could be better`;
  } else if ( ratio < 1.5 ) {
    result.rating = 3;
    result.ratingDescription = `keep it up, good tempo`;
  } else if ( ratio < 2 ) {
    result.rating = 4;
    result.ratingDescription = `soon you'll make Hulk envy you`;
  } else {
    result.rating = 5;
    result.ratingDescription = `Warning! keep in mind not to hurt yourself`;
  }

  return result;
};

try {
  const { dailyHours, target } = parseArgumentsExercise(process.argv);
  console.log(exerciseCalculator(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}