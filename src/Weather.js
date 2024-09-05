import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import  WeatherTemperature from "./WeatherTemperature";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const[city, setCity] = useState(props.defaultCity);

  function showTemperature(response) {
    console.log(response);
    setWeatherData({
      ready: true,
      coordinates:response.data.coord,
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
    let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
                  <strong>Temperature : </strong>{" "}<WeatherTemperature ture = {Math.round(weatherData.temperature)}/>
                </span>
              </li>
              <li>
                <strong>Humidity : </strong> {weatherData.humidity} %
              </li>
              <li>
                <strong>Wind :  </strong>
                {Math.round(weatherData.wind)} km/h
              </li>
            </ul>
          </div>
          <div className="icon">
            <p>{weatherData.description} </p>{" "}
            <WeatherIcon code={weatherData.icon} size={80} />
          </div>
        </div>
        <WeatherForecast coordinates={weatherData.coordinates}/>
      </div>
    );
  } else {
    search();
    return null;
    
  }
  ;
}
