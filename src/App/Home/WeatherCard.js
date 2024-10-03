import * as React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import FetchWeatherApi from '../Reports/WeatherMapApi';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function WeatherCard() {

    const { weather } = FetchWeatherApi();

    const city = weather?.city;
    const cityname = city?.name;

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/reports');
    };

    if (!weather || !weather.list || weather.list.length === 0) {
        return <div>No weather data available</div>;
    }

    const todayWeather = weather.list[0];
    const weatherData = todayWeather?.weather?.[0];
    const description = weatherData?.description || "No description available";
    const weatherCondition = weatherData?.main;

    const StyledCard = styled(Card)(({ theme }) => ({
        display: 'flex',
        backgroundImage: 'url(/cityimage.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minWidth: '100%',
        minHeight: '230px',
        color: '#fff',
    }));

    return (
        <StyledCard>

            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(0, 0, 0, 0.5)' }}>
                <div>
                    <h3> City : {cityname} </h3>
                    <Typography gutterBottom variant="h5">
                        {weatherCondition === 'Rain' ? (
                            <BeachAccessIcon />
                        ) : weatherCondition === 'Clouds' ? (
                            <CloudIcon />
                        ) : weatherCondition === 'Clear' ? (
                            <WbSunnyIcon />
                        ) : (<></>)}
                        {weatherCondition || "Loading..."}
                    </Typography>


                    <Typography>
                        Description: {description}
                    </Typography>
                </div>

                <Button size="small" variant="contained" onClick={handleNavigate} >
                    Weather Report Details
                </Button>
            </CardContent>
        </StyledCard>
    );
};

