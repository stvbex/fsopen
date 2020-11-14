import React from 'react'

const Countries = (props) => {
    const countries = props.countries 

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (countries.length > 1) {
        return (
            <div>
                {countries.map(country => { 
                    return (
                        <div key={country.name}>
                            {country.name}
                            <button onClick={() => props.handleShowButtonClick(country.name)}>show</button>
                        </div>
                    )
                })}
            </div>
        )
    }
    else if (countries.length === 1) {
        return (
            <div>
                <h2>{countries[0].name}</h2>
                capital {countries[0].capital} <br/>
                population {countries[0].population}
                <h3>languages</h3>
                <ul>
                    {countries[0].languages.map(language => {
                        return <li key={language.name}>{language.name}</li>
                    })}
                </ul>
                <img 
                    src={countries[0].flag} 
                    alt={countries[0].name + ' flag'}
                    width={150}
                    height={100} />
            </div>
        )
    }
    else {
        return (
            <div>
                No countries match your query
            </div>
        )
    }

}

export default Countries