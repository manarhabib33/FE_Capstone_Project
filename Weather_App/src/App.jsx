import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false); 

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a635574f55a2ee88d6e59d412c2a1be3`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setError(false); 
        })
        .catch(() => {
          setError(true); 
        });
      setLocation("");
    }
  };

  const closePopup = () => {
    setError(false); 
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
        />
      </div>

      
      {error && (
        <div className="popup">
          <div className="popup-content">
            <p>Invalid city name! Please enter a valid city.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
