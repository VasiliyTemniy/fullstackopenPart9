interface argsBMI {
  height: number;
  mass: number;
}

const parseArgumentsBMI = (args: Array<string>): argsBMI => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const parseWebArgumentsBMI = ( height: any, weight: any ): argsBMI => {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: Number(height),
      mass: Number(weight)
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = ( height: number, mass: number ) : string => {
  const heightMeters = height / 100;
  const result = (mass/heightMeters)/heightMeters;
  if ( result < 16 ) {
    return 'Underweight (Severe thinness)';
  } else if ( result < 16.9 ) {
    return 'Underweight (Moderate thinness)';
  } else if ( result < 18.4 ) {
    return 'Underweight (Mild thinness)';
  } else if ( result < 24.9 ) {
    return 'Normal (healthy weight)';
  } else if ( result < 29.9 ) {
    return 'Overweight (Pre-obese)';
  } else if ( result < 34.9 ) {
    return 'Obese (Class I)';
  } else if ( result < 39.9 ) {
    return 'Obese (Class II)';
  } else if ( result > 40 ) {
    return 'Obese (Class III)';
  } else {
    throw new Error('everything went unepecxted');
  }
}

try {
  const { height, mass } = parseArgumentsBMI(process.argv);
  console.log(calculateBmi(height, mass));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}