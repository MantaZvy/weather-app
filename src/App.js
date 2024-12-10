import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App(props) {
  let [weather, setWeather] = useState(null);
  let [city, setCity] = useState("");
  let [display, setDisplay] = useState(false);
  function displayWeather(response) {
    setDisplay(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSub(event) {
    event.preventDefault();
    const apiKey = "c819171fe0abdc14039af4ef5dda283b";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  function updateSearch(event) {
    setCity(event.target.value);
  }
  let form = (
    //<h1>Weather Axios Search Engine</h1>
    <form onSubmit={handleSub}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateSearch}
      />
      <input type="submit" value="Search" />
    </form>
  );
  if (display) {
    return (
      <div className="App">
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}</li>
          <li>Description {weather.description}</li>
          <li>Humidity {weather.humidity}%</li>
          <li>Wind {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
