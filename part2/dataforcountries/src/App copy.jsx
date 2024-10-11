import { useState, useEffect } from 'react'
import axios from 'axios'
import dataforcountries from './services/dataforcountries'
import weather from './services/weather'

const Search = ({ text, search, onSearchChange }) => { 
  return (
    <div>
      {text} <input type="text" value={search} onChange={onSearchChange}/>
    </div>
  )
}

const CountryDetail= ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        capital: {country.capital} 
        <br></br>
        area: {country.area}
        <br></br>
        latitude: {country.latlng[0]} 
        <br></br>
        longitude: {country.latlng[1]} 
      </p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang, index) => <li key={index}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
  </div>
  )
}

const Button = ({text, value, onClick}) => {
  return (
    <button value={value} onClick={onClick}>{text}</button>
  )

}

const WeatherDetail = ({ country, wetter }) => {
  return (
    <div>
       <h3>Weather in {country.capital}</h3>
      temperature: {wetter.current.temperature_2m} {wetter.current_units.temperature_2m}
      <br></br>
       wind: {wetter.current.wind_speed_10m} {wetter.current_units.wind_speed_10m}
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [lat, setLat] = useState('62')
  const [lng, setLng] = useState('15')
  const [wetter, setWetter] = useState([])

  useEffect(() => {
    dataforcountries
      .getAll()
      .then(c => {
        //console.log(c)
        setCountries(c)})
    }, [])

  useEffect(() => {
    weather
      .getWeather(lat, lng)
      .then(w => {
        console.log(w)
        setWetter(w)})
  }, [])

  const onSearchChange = (event) => {
    //console.log(event.target.value)
    setSearch(event.target.value)
  }

  const countryFilter = countries.filter((country) => {
    // console.log(search.toLowerCase())
    return search === ''
      ? country
      : country.name.common.toLowerCase().includes(search.toLowerCase());
  })

  const onClickShow = (event) => {
    //console.log(event.target.value)
    setSearch(event.target.value)
  }

  const filterResult = (countryFilter) => {
    return countryFilter.length > 10 
      ? <div>Too many matches, specify another filter</div>
      : countryFilter.length > 1 
        ? countryFilter.map((country, index) => (
          <div key={index}> {country.name.common} <Button text="show" value={country.name.common} onClick={onClickShow} /></div>
        ))
        : countryFilter.map(country => (
          <CountryDetail country={country} />
        ))
  }

  return (
    <div>
      <Search text='find countries:' search={search} onSearchChange={onSearchChange}/>
      {filterResult(countryFilter)}
      {countryFilter.length == 1 ? countryFilter.map((country) => <WeatherDetail country={country} wetter={wetter} />) : null}
    </div>
  )
}

export default App
