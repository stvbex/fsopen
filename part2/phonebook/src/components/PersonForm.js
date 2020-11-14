import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.handleNewPerson}>
            <div>
                name: <input onChange={props.handleNameInputChange} value={props.newName} />
            </div>
            <div>
                number: <input onChange={props.handleNumberInputChange} value={props.newNumber} />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

export default PersonForm