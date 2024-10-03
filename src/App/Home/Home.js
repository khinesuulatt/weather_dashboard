import * as React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import TotalUserCard from './TotalUserCard';
import FetchWeatherApi from '../Reports/WeatherMapApi';
import WeatherCard from './WeatherCard';

export default function Home() {
  const { weather, loading, error } = FetchWeatherApi();

  const city = weather?.city;
  const cityname = city?.name;

  return (
    <div>

      <div>
        <h3>Weather Report of {cityname} City for Today </h3>
        {
          loading ? <CircularProgress />
            : error ? <Typography sx={{ color: 'red' }}>Data is unavailable due to connection issues, please try again...</Typography>
              : <WeatherCard />
        }
      </div>

      <div style={{marginTop: "2em"}}>
        <TotalUserCard />
      </div>

    </div>
  );
}
