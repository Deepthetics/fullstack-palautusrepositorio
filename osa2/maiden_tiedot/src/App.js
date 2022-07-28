import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryLabel from './components/CountryLabel'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])

  const findMatches = () => {
    setMatches(countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase())))
  }

  const showCountryInfo = (countryToShow) => {
    setMatches(countries.filter(country => country===countryToShow))
  }

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    findMatches()
  }, [input])

  if (input === '') {
    return (
      <div>
        Find countries
        <input
          type='text'
          value={input}
          name='input'
          onChange={({ target }) => setInput(target.value)}
        />
      </div>
    )
  }

  if (matches.length > 10) {
    return (
      <div>
        Find countries
        <input
          type='text'
          value={input}
          name='input'
          onChange={({ target }) => setInput(target.value)}
        />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

  if (matches.length > 1 && matches.length <= 10) {
    return (
      <div>
        Find countries
        <input
          type='text'
          value={input}
          name='input'
          onChange={({ target }) => setInput(target.value)}
        />
        {matches.map(country =>
          <CountryLabel 
            key={countries.indexOf(country)}
            country={country}
            showCountryInfo={showCountryInfo}
          />)}
      </div>
    )
  }

  if (matches.length === 1) {
    return (
      <div>
        Find countries
        <input
          type='text'
          value={input}
          name='input'
          onChange={({ target }) => setInput(target.value)}
        />
        <CountryInfo country={matches[0]} />
      </div>
    )
  }

  return (
    <div>
      Find countries
      <input
        type='text'
        value={input}
        name='input'
        onChange={({ target }) => setInput(target.value)}
      />
      <p>No matches</p>
    </div>
  )
}

export default App
