import { useState, useEffect } from 'react';

const FetchWeatherApi = () => {
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=8ee1f21311d9cdfebb5e64117b40ec61`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWeather(data);
                console.log(data, "weatherdataaaaa===");
            } catch (error) {
                setError('Failed to fetch weather data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);
    return { weather, loading, error };

};

export default FetchWeatherApi;
