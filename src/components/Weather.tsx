import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import windIcon from "../images/whtherIcons/wind.png";
import humidityIcon from "../images/whtherIcons/humidity.png";
import snowIcon from "../images/whtherIcons/snow.png";
import rainIcon from "../images/whtherIcons/rain.png";
import drizzleIcon from "../images/whtherIcons/drizzle.png";
import clearIcon from "../images/whtherIcons/clear.png";
import cloudsIcon from "../images/whtherIcons/cloud.png";
import { style } from "../style/weatherStyle";
import { cities } from "../utils/cities";
import { getWeather } from "../api/api";
import SnackBar from "./SnackBar";
import { messageType } from "../pages/Login";

type weather = {
  name: string;
  temp: string;
  humidity: string;
  wind: string;
};

const Wether = () => {
  const [weather, setWeather] = useState<weather>({
    name: "",
    temp: "",
    humidity: "",
    wind: "",
  });
  const [icon, setIcon] = useState<string>(cloudsIcon);
  const [city, setCity] = useState<string>("Tel aviv");
  const [openMessage, setOpenMessage] = useState<messageType>({
    open: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    serchWeather();
  }, []);

  const serchWeather = async () => {
    try {
      const getCityWeather = await getWeather(city);
      setWeather({
        ...weather,
        name: getCityWeather.name,
        temp: getCityWeather.main.temp,
        humidity: getCityWeather.main.humidity,
        wind: getCityWeather.wind.speed,
      });
      if (
        getCityWeather.weather[0].icon === "01d" ||
        getCityWeather.weather[0].icon === "01n"
      ) {
        setIcon(clearIcon);
      } else if (
        getCityWeather.weather[0].icon === "02d" ||
        getCityWeather.weather[0].icon === "02n"
      ) {
        setIcon(cloudsIcon);
      } else if (
        getCityWeather.weather[0].icon === "03d" ||
        getCityWeather.weather[0].icon === "03n"
      ) {
        setIcon(drizzleIcon);
      } else if (
        getCityWeather.weather[0].icon === "04d" ||
        getCityWeather.weather[0].icon === "04n"
      ) {
        setIcon(drizzleIcon);
      } else if (
        getCityWeather.weather[0].icon === "09d" ||
        getCityWeather.weather[0].icon === "09n"
      ) {
        setIcon(rainIcon);
      } else if (
        getCityWeather.weather[0].icon === "10d" ||
        getCityWeather.weather[0].icon === "10n"
      ) {
        setIcon(rainIcon);
      } else if (
        getCityWeather.weather[0].icon === "13d" ||
        getCityWeather.weather[0].icon === "13n"
      ) {
        setIcon(snowIcon);
      } else {
        setIcon(clearIcon);
      }
    } catch (error) {
      setOpenMessage({
        open: true,
        type: "error",
        message: "The city not found",
      });
    }
  };

  return (
    <Box sx={style.mainBox}>
      <Box sx={style.searchBox}>
        <Autocomplete
          options={cities}
          sx={style.autoComplete}
          onChange={(event, value) => {
            if (value) {
              setCity(value.label);
            }
          }}
          renderInput={(params) => (
            <TextField
              sx={style.searchInput}
              placeholder="Search..."
              {...params}
            />
          )}
        />
        <IconButton sx={style.searchButton} onClick={serchWeather}>
          <SearchIcon />
        </IconButton>
      </Box>
      <img style={style.weatherIcon} src={icon} />
      <Stack>
        <Typography sx={style.tempText}>{`${weather.temp}°c`}</Typography>
        <Typography sx={style.countryText}>{weather.name}</Typography>
      </Stack>
      <Box sx={style.propBox}>
        <Stack direction="row" spacing={1} sx={style.stack}>
          <img style={style.icon} src={windIcon} />
          <Stack>
            <Typography
              sx={style.propText}
            >{`${weather.wind} km/h`}</Typography>
            <Typography sx={style.propText}>Wind Speed</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} sx={style.stack}>
          <img style={style.icon} src={humidityIcon} />
          <Stack>
            <Typography sx={style.propText}>
              {`${weather.humidity} %`}
            </Typography>
            <Typography sx={style.propText}>Humidity</Typography>
          </Stack>
        </Stack>
      </Box>
      <SnackBar
        msg={openMessage.message}
        type={openMessage.type}
        open={openMessage.open}
        onClose={() => setOpenMessage({ open: false, type: "", message: "" })}
      />
    </Box>
  );
};

export default Wether;
