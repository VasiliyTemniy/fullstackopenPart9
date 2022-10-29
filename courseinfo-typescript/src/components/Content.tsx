import { CoursePartsProps } from '../types/CoursePart';
import { containerStyle, partDescription, partName } from '../inline-styles/styles';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = (props: CoursePartsProps) => {
  
  return (
    <>
      {props.courseParts.map((part) => {
        switch (part.type) {
          case "normal":
            return (
              <div key={part.name} style={containerStyle}>
                <div style={partName}>
                  {part.name} {part.exerciseCount}
                </div>
                <div style={partDescription}>
                  {part.description}
                </div>
              </div>
            )
          case "groupProject":
            return (
              <div key={part.name} style={containerStyle}>
                <div style={partName}>
                  {part.name} {part.exerciseCount}
                </div>
                <div style={partDescription}>
                  project exercises {part.groupProjectCount}
                </div>
              </div>
            )
          case "submission":
            return (
              <div key={part.name} style={containerStyle}>
                <div style={partName}>
                  {part.name} {part.exerciseCount}
                </div>
                <div style={partDescription}>
                  {part.description}
                </div>
                <div>
                  submit to {part.exerciseSubmissionLink}
                </div>
              </div>
            )
          case "special":
            return (
              <div key={part.name} style={containerStyle}>
                <div style={partName}>
                  {part.name} {part.exerciseCount}
                </div>
                <div style={partDescription}>
                  {part.description}
                </div>
                <div>
                  required skills:
                  {part.requirements
                    .map((req, i) => <>{i === 0 ? ' ' : ', '}{req}</>)}
                </div>
              </div>
            ) 
          default:
            return assertNever(part);
        }
      })}
    </>
  )
};

export default Content;