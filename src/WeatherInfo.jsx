import Card from "@mui/material/Card";
import "./WeatherInfo.css";
import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "./helper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Alert from "@mui/material/Alert";

const getWeather = async (city) => {
  try {
    let response = await fetch(
      `${API_URL}q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

function toTime(unix) {
  let d = new Date(unix * 1000);
  let hours = d.getHours() % 12 || 12;
  let minutes = d.getMinutes();
  if (hours.toString().length === 1) {
    hours = "0" + hours;
  }
  if (minutes.toString().length === 1) {
    minutes = "0" + minutes;
  }
  let time = hours + " : " + minutes;
  return time;
}

export default function WeatherInfo({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let data = await getWeather(city);
        setWeatherData(data);
        setError(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(true);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div>
      {weatherData ? (
        <div className="WeatherInfo">
          <p>
            {error ? (
              <Alert variant="filled" severity="error">
                Can't find this city! Please enter a valid city name!
              </Alert>
            ) : (
              ""
            )}
          </p>
          <Card className="card">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="card-img"
              className="card-img"
            />

            <h1>Weather in {weatherData.name}</h1>

            {/* <CardContent> */}
            <p>
              <span className="bold">Weather :</span>{" "}
              {weatherData.weather[0].description
                .toString()
                .charAt(0)
                .toUpperCase() + weatherData.weather[0].description.slice(1)}
            </p>

            <p>
              <span className="bold">Feels Like :</span>{" "}
              {weatherData.main.feels_like}&deg;C
            </p>
            <p>
              <span className="bold">Cloud Cover :</span>{" "}
              {weatherData.clouds.all} %
            </p>
            <p>
              <span className="bold">Temperature :</span>{" "}
              {weatherData.main.temp}&deg;C
            </p>

            <p>
              <span className="bold">Humidity :</span>{" "}
              {weatherData.main.humidity}%
            </p>
            <p>
              <span className="bold">Wind Speed :</span>{" "}
              {weatherData.wind.speed} m/s
            </p>
            <p>
              <span className="bold">Temperature (Max) :</span>{" "}
              {weatherData.main.temp_max}
              &deg;C
            </p>
            <p>
              <span className="bold">Temperature (Min) :</span>{" "}
              {weatherData.main.temp_min}
              &deg;C
            </p>
            <p>
              <span className="bold">Pressure :</span>{" "}
              {weatherData.main.pressure} mb
            </p>
            <p>
              <span className="bold">Sunrise :</span>{" "}
              {toTime(weatherData.sys.sunrise)} AM
            </p>
            <p>
              <span className="bold">Sunset :</span>{" "}
              {toTime(weatherData.sys.sunset)} PM
            </p>
            {/* </CardContent> */}
          </Card>
          <p className="copyright">
            Developed with <FavoriteIcon /> by Vansh Chauhan!
          </p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
