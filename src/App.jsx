import "./App.css";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";
import { useState } from "react";

function App() {
  let [city, setCity] = useState("mumbai");

  let updateCity = (newCity) => {
    // console.log(newCity);
    setCity(newCity);
  };

  return (
    <>
      <SearchBox updateCity={updateCity} />
      <WeatherInfo city={city} />
    </>
  );
}

export default App;
