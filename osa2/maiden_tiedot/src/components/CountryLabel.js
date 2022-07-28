const CountryLabel = ({ country, showCountryInfo }) => {

const handleShow = () => {
  showCountryInfo(country)
}

  return (
    <div>
      {country.name.common}
      <button onClick={handleShow}>show</button>
    </div>
  )
}

export default CountryLabel
