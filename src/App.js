import React, { useState }from 'react';
import './App.css';

// Images for displaying the weather
import sunnyLittleRain from './icons/rainy-2.svg' //300-302
import sunnyRain from './icons/rainy-1.svg' //521
//import partlyCloudyNight from './icons/cloudy-night-2.svg'
//import night from './icons/night.svg'
import lightRain from './icons/rainy-4.svg' //520, 500, 
import midRain from './icons/rainy-5.svg'//501
import lotRain from './icons/rainy-6.svg' //522,502
import day from './icons/day.svg' //800
import cloudy from './icons/cloudy.svg' //804
import partlyCloudyDay from './icons/cloudy-day-2.svg' //801 - 803
import stormy from './icons/thunder.svg' //200 - 233
import unKnown from './icons/weather.svg'
//import { render } from '@testing-library/react';


//511 is freezing rain
//600, 602 [610 is snow rain, 611 is sleet, 612 is heavy sleet] 621 is snow shower"snow with sun" - 623 snow from light to flurries
//700 - 751 is visability obstruction
//900 is unknown
const api = {

  key: process.env.REACT_APP_WEATHER_KEY,
  URL: "http://api.weatherbit.io/v2.0/current"
}

function App () {



  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [code, setCode] = useState('')
  //const [location, setLocation] = useState({})

  /*function getLocation() {
    if (navigator.geolocation) 
      {navigator.geolocation.getCurrentPosition
        (async function(position) {
          var positionInfo = {"lat": position.coords.latitude,"long": position.coords.longitude};
          console.log(positionInfo)
          setLocation(positionInfo)
        })
      }
  }
  getLocation()*/
  //let weatherIcon = ''
  
  



  //some stuff
  const search = evt => {
    if (evt.key === "Enter"){

        fetch(`${api.URL}?city=${query}&country=United%20States&units=I&key=${api.key}`)
        
        //.then(res => =res.json())
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          setCode(JSON.parse(result.data[0].weather.code))
          console.log(result)
        })
        .catch(() => alert("Sorry I couldent find that city please try another one."))
        

        
       

    }
  }
  
  const iconBuilder = (n) => {
    if (n < 200){return unKnown}
    if (n >= 200 && n <= 233){return stormy}
    if (n >= 300 && n <= 302){return sunnyLittleRain}
    if (n === 500 || n === 520){return lightRain}
    if (n === 501){return midRain}
    if (n === 502 || n === 522){return lotRain}
    if (n >= 801 && n <= 803){return partlyCloudyDay}
    if (n === 521){return sunnyRain}
    if (n===800){return day}
    if (n===804){return cloudy}
    else {return unKnown}
  }
  
  const dateBuilder = (d) => {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    let days = ["Sunday","Monday","Tuesday","Wednsday","Thursday","Friday","Saturday"]
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`

  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="searchBox">
          
        
          <input 
          className="search" 
          placeholder="Search..." 
          type="text"
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        ></input>
        </div>
  {/*<h1>Latitude:{location.lat}<br></br>Longitude:{location.long}</h1>*/}
      {(typeof weather.data != 'undefined')? (
        
        <div>
        <h2 className="location">{JSON.stringify(weather.data[0].city_name).replace(/"/g,'')}</h2>
        <h1 className="temp">{JSON.stringify(weather.data[0].temp).replace(/"/g,'')}°F</h1>
        <img src={iconBuilder(code)} className="weather-icon" alt="Weather"/>
        <p className="date">{dateBuilder(new Date())}</p>
        </div>
        ):(
          <h2>Please input a City within the United States</h2>
        )}
      </header>
    </div>
  );
}

export default App;
