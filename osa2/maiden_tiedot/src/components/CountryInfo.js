import axios from "axios"
import { useEffect, useState } from 'react'

const CountryInfo = ({ country }) => {
  const [weatherInfo, setWearherInfo] = useState(null)

  useEffect(() => {
    axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.cca2}&limit=1&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => axios
      .get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => setWearherInfo(response.data.list[0])))
  }, [])

  if (weatherInfo) {
    return (
      <div>
      <h1>{country.name.common}</h1>
      Capital: {country.capital}
      <br></br>
      Area: {country.area}
      <br></br>
      <p><b>Languages:</b></p>
      <ul>
        {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        height='140'
        width='200'
      />
      <h2>Weather in {country.capital}</h2>
      Temperature: {`${Math.round((weatherInfo.main.temp - 273.15) * 100) / 100} Celsius`}
      <br></br>
      <img
        src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
        alt='Weather icon'
      />
      <br></br>
      Wind: {`${weatherInfo.wind.speed} m/s`}
    </div>
    )
  }

  return (
    <div>
    <h1>{country.name.common}</h1>
    Capital: {country.capital}
    <br></br>
    Area: {country.area}
    <br></br>
    <p><b>Languages:</b></p>
    <ul>
      {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
    </ul>
    <img
      src={country.flags.png}
      alt={`Flag of ${country.name.common}`}
      height='140'
      width='200'
    />
    </div>
  )
}

export default CountryInfo
