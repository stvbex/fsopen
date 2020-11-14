import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

function App() {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value)
  }

  const handleShowButtonClick = (name) => {
    setSearchText(name)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  } , [])

  const matchingCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(searchText.toLowerCase())
  })

  return (
    <>
      <div>
        find countries <input onChange={handleSearchTextChange} value={searchText} />
      </div>
      <Countries 
        countries={matchingCountries} 
        handleShowButtonClick={handleShowButtonClick} />
    </>
  );
}

export default App;
