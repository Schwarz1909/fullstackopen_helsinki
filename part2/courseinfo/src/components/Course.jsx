const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
  }

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
          {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
        </div>
    )
}

const Total = ({ parts }) => {
    const e = parts.map(({exercises}) => exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
        <p ><strong>
            total of {e} exercises
        </strong> </p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
  }
  
  export default Course