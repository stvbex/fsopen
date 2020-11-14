import React from 'react'

const Persons = (props) => {
    return (
        <ul>
        {
          props.personsToShow.map(person => {
            return (
              <li key={person.name}>
                {person.name} {person.number}
                <button onClick={() => props.handleDeletePerson(person.id)}>
                  delete
                </button>
              </li>  
            )
          })
        }
      </ul>
    )
}

export default Persons