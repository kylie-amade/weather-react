import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!loaded) {
      let apiKey = "de2c40e370d58e257faf07ba4ea95840";
      let latitude = props.coordinates.lat;
      let longitude = props.coordinates.lon;
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(handleResponse);
    }
  }, [loaded, props.coordinates]);

  function handleResponse(response) {
    console.log(response.data);
    const dailyForecast = response.data.daily.slice(0, 7).map((day) => ({
      date: new Date(day.dt * 1000),
      max: day.temp.max,
      min: day.temp.min,
      iconUrl: day.weather[0].icon,
    }));

    setLoaded(true);
    setForecast(dailyForecast);
  }

  const days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ];

  if (loaded) {
    return (
      <div className="weatherForecast">
        <div className="row">
          {forecast.map((dayForecast, index) => {
            const day = dayForecast.date.getDay();
            return (
              <div className="col-3" key={index}>
                <div className="card">
                  <ul>
                    <li>
                      <p>{days[day]}</p>
                    </li>
                    <li >
                      <span className="str">{Math.round(dayForecast.max)}</span>{" "}
                      <span>{Math.round(dayForecast.min)}</span>
                    </li>
                    <li>
                      <WeatherIcon code={dayForecast.iconUrl} size={36} />
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null; 
  }
}
