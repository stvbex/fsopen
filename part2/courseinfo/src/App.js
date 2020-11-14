import React from 'react';

const Header = (props) => {
    return <h2>{props.name}</h2>
}
  
const Part = (props) => {
    return <p>{props.name} {props.exercises}</p>
}
  
const Content = (props) => {
    const parts = props.parts

    return (
        <div>
        {
            parts.map(part => 
            {
                console.log()
                return <Part key={part.id} name={part.name} exercises={part.exercises}/>
            }
            )
        }
        </div>
    )
}

const Total = (props) => {
    const total = props.parts.reduce(
        (sum, part) => sum + part.exercises, 
        0
    )

    return <p><b>total of {total} exercises</b></p>
}

const Course = ({ course }) => {
    return (
        <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const courses = [
        {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
            },
            {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
            },
            {
            name: 'State of a component',
            exercises: 14,
            id: 3
            },
            {
            name: 'Redux',
            exercises: 11,
            id: 4
            }
        ]
        },
        {
        name: 'Node.js',
        id: 2,
        parts: [
            {
            name: 'Routing',
            exercises: 3,
            id: 1
            },
            {
            name: 'Middlewares',
            exercises: 7,
            id: 2
            }
        ]
        }
    ]

    return (
        <div>
        <h1>Web development curriculum</h1>
        {
            courses.map(course =>
            <Course key={course.id} course={course} />
            )
        }
        </div>
    ) 
}

export default App