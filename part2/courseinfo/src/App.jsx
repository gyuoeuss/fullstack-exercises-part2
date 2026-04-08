import { useState } from 'react'
import './App.css'

const Course = ({ courses }) => {
  console.log(courses)
  const initialValue = 0
  const sumWithInitial =(course)=>{ return(course.parts.reduce((accumulator, currentValue) => {
    console.log('現在', accumulator, '下一個', currentValue)
    return (accumulator + currentValue.exercises)
  }, initialValue))}
  return (
    courses.map(course => (
      <div key={course.id}>
        <h3>{course.name}</h3>
        <ul>
          {course.parts.map(part =>
            <li key={part.id}>{part.name} {part.exercises}</li>
          )}
        </ul>
        <p><strong>Total exercises: {sumWithInitial(course)}</strong></p>
      </div>
    ))
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
      <Course courses={courses} />
    </div>
  )
}

export default App
