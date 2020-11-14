import React from 'react'

const Notification = ({ message, color }) => {
    if (message === null) {
        return null
    }

    const divStyle = {
        color: color
    }

    return (
        <div className="error" style={divStyle}>
            {message}
        </div>
    )
}

export default Notification