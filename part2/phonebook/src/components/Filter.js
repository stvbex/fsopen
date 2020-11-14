import React from 'react'

const Filter = (props) => {
    return (
        <div>
            filter shown with: 
            <input 
                onChange={props.handleFilterInputChange} 
                value={props.filterString} />
        </div>
    )
}

export default Filter