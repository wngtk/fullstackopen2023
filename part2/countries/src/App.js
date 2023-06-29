import { useState, useEffect } from 'react'
import axios from 'axios'

const END_POINT = 'https://restcountries.com/v3.1/all'

const ZERO_K = 273.15

async function getWeather(city) {
  const WEATHER_END_POINT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}`
  const data = await axios.get(WEATHER_END_POINT).then(res => res.data).catch((error) => { console.log(error); return error})
  return data
}

function toLower(s) {
  return s.toLowerCase()
}

const CountryWithButton = ({country}) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <p>{country.name.common} <button onClick={() => setShow(!show)}>show</button></p>
      { show ? <Country country={country}/> : <></>}
    </>
  )
}

const Country = ({country}) => {
  const [temp, setTemp] = useState(0)
  const [iconUrl, setIconUrl] = useState('')

  useEffect(() => {
    getWeather(country.capital).then(data => {
      setTemp(data.main.temp - ZERO_K)
      setIconUrl(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      <p>temperature {temp.toFixed(2)} Celcius</p>
      <img src={iconUrl} />
    </>
  )
}

const Countries = ({countries, queryText}) => {
  const filtered = countries.filter((country) => toLower(country.name.common).includes(toLower(queryText)))

  if (filtered.length > 10) {
    return <p>Too many countries, specify another filter</p>
  } else if (filtered.length > 1) {
    return <div>{filtered.map(val => <CountryWithButton key={val.name.common} country={val} />)}</div>
  } else if (filtered.length > 0) {
    return <Country country={filtered[0]} />
  }
}

function App() {
  const [text, setText] = useState('')
  const [countries, setCountries] = useState([])

  console.log(process.env.REACT_APP_API_KEY)

  useEffect(() => {
    axios
      .get(END_POINT)
      .then((res) => {
        setCountries(res.data)
      })
  }, [])

  return (
    <div>
      <div>find countries <input type="text" onChange={(e) => setText(e.target.value)} /></div>
      <Countries countries={countries} queryText={text} />
    </div>
  );
}

export default App;
