import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import  WeatherTemperature from "./WeatherTemperature";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const[city, setCity] = useState(props.defaultCity);

  function showTemperature(response) {
    console.log(response);
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon:response.data.weather[0].icon,
      description: response.data.weather[0].description,
      city:response.data.name,
      date: new Date(response.data.dt*1000),
    });
  }
  function search(){
    let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);


  }
  function handleSubmit(event){
    event.preventDefault();
    search();
  }
  function handleCity(event){
    setCity(event.target.value);
    
  }


  if (weatherData.ready) {
    return (
      <div className="weatherPage">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city..."
                className="formControl"
                onChange={handleCity}
              />
            </div>
            <div className="col-3">
              <input type="submit" value="Search" className="button" />
            </div>
          </div>
        </form>
        <h1 className="cityName">{weatherData.city}</h1>
        <div className="today">
          <div className="todayForecast">
            <ul>
              <li className="thursday">
                <FormattedDate date={weatherData.date} />
                <span>
                  <strong>Temperature : </strong>{" "}
                 <WeatherTemperature ture = {Math.round(weatherData.temperature)}/>
                </span>
              </li>
              <li>
                <strong>Humidity :</strong> {weatherData.humidity} %
              </li>
              <li>
                <strong>Wind : </strong>
                {Math.round(weatherData.wind)} km/h
              </li>
            </ul>
          </div>
          <div className="icon">
            <p>{weatherData.description} </p>{" "}
            <WeatherIcon code={weatherData.icon} />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <ul>
              <h5>Mon</h5>
              <li>🌤️</li>
              <li> 24° 15° </li>
            </ul>
          </div>
          <div className="col-2">
            <ul>
              <h5>Wed</h5>
              <li>🌤️</li>
              <li>24° 15°</li>
            </ul>
          </div>
          <div className="col-2">
            <ul>
              <h5>Thu</h5>
              <li>🌤️</li>
              <li>24° 15°</li>
            </ul>
          </div>
          <div className="col-2">
            <ul>
              <h5>Fri</h5>
              <li>🌤️</li>
              <li>24° 15°</li>
            </ul>
          </div>
          <div className="col-2">
            <ul>
              <h5>Sart</h5>
              <li>🌤️</li>
              <li>24° 15°</li>
            </ul>
          </div>
          <div className="col-2">
            <ul>
              <h5>Sun</h5>
              <li>🌤️</li>
              <li>24° 15°</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    search();
    
  }
  <div>T</div>
}
