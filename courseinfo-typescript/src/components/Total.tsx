import { CourseParts } from '../types/CourseParts';

const Total = (props: CourseParts) => {
  
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;