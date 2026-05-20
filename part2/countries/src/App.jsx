import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p> Capital {country.capital}</p>
      <p> Area {country.area}</p>
      <h3>Languages</h3>
      <ul>{Object.values(country.languages).map(c => <li key={c}>{c}</li>)}</ul>
      <img src={country.flags.svg} alt={country.flags.alt} />
      <Weather country={country.name.common} />
    </div>
  )
}

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        countriesService.getalone(country).then((data) => setWeather(data))
      } catch (error) {
        console.error('抓取天氣資料失敗:', error)
      }
    }
    fetchWeather()
  }, [country])
  return (
    <div>
      <h2>Weather in {country}</h2>
      {weather ? (
        <div>
          <p>Temperature:{weather.main.temp}°C</p>
          <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} alt={`${weather.weather[0].description}`} />
          <p>Wind :{weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const apiKey = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    countriesService.getAll().then(c => setCountries(c))
  }, [query])

  const filtered = countries.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))

  const handleQuerychange = (event) => setQuery(event.target.value)

  const handleShowbutton = (name => setQuery(name))

  return (
    <div>
      <div>find countries<input value={query} onChange={handleQuerychange} /></div>
      <ul>
        {filtered.length === 1 && <Country country={filtered[0]} />}
        {filtered.length <= 10 && filtered.length > 1 &&
          filtered.map(c =>
            <li key={c.name.common}>
              {c.name.common}
              <button onClick={() => handleShowbutton(c.name.common)}>show</button>
            </li>)}
        {filtered.length > 10 && filtered.length < 250 && <p>too many matches,specify another filter</p>}
        {filtered.length === 250 && filtered.map(c => <li key={c.name.common}>{c.name.common}</li>)}
      </ul>
    </div>
  )
}
export default App