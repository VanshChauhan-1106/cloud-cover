import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SeachBox.css";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox({ updateCity }) {
  let [city, setCity] = useState("");

  let handleCityChange = (event) => {
    setCity(event.target.value);
  };

  let getCity = async () => {
    return city;
  };

  let handleSumbit = async (event) => {
    event.preventDefault();
    setCity("");
    let newCity = await getCity();
    updateCity(newCity);
  };

  return (
    <div className="SearchBox">
      <h1>Search Weather for a city!</h1>
      <form onSubmit={handleSumbit}>
        <TextField
          id="outlined-basic"
          label="Enter City"
          variant="outlined"
          size="large"
          value={city}
          onChange={handleCityChange}
          className="input"
          required
        />
        <Button variant="contained" type="submit" endIcon={<SearchIcon />}>
          Search
        </Button>
      </form>
    </div>
  );
}
