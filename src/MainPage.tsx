
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Typography, Button } from '@mui/material';

interface LocationState {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
}

function MainPage () {
    const [position, setPosition] = useState<LocationState>({
        latitude: null,
        longitude: null,
        error: null
    });

    const [forecast, setForecast] = useState<string>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [dogImage, setDogImage] = useState<string>();

    const getForecast = async(lat: number, long: number) => {
        if(lat && long) {
            const URL = 'https://api.weather.gov/points/' + lat + ',' + long;
            const weatherResponse = await axios.get(URL);

            const forecastURL = weatherResponse.data.properties.forecast;
            const forecastResponse = await axios.get(forecastURL);
            const [periods] = forecastResponse.data.properties.periods;

            setForecast(periods.detailedForecast);

            console.log(periods);

            const dogURL = 'https://dog.ceo/api/breeds/image/random';

            const dogResponse = await axios.get(dogURL);
            const mess = dogResponse.data.message;
            setDogImage(mess);
            console.log(mess);
            setLoaded(true);
        }
    }

    const getNewDog = async() => {
        const dogURL = 'https://dog.ceo/api/breeds/image/random';

        const dogResponse = await axios.get(dogURL);
        const mess = dogResponse.data.message;
        setDogImage(mess);
    }

    useEffect(() => {
        
        const handleError = (error: GeolocationPositionError) => {
            setPosition((prev) => ({...prev, error: error.message}));
        }
        const handleSuccess = (pos: GeolocationPosition) => {
            const {latitude, longitude} = pos.coords;
            setPosition({ latitude, longitude, error: null});
            getForecast(latitude, longitude);
        }

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });

    }, []);


 return (
 <div>
    {position.error ? (
        <p>Error</p>
    ) : loaded && (
        <p>{forecast}</p>
    )}
    <Typography>Daily Dog!</Typography>
    {dogImage && <img src={dogImage} width="300px" height="300px" alt="doggy"/>
    }
    <Button onClick={getNewDog}>Get a new one!</Button>
    </div>
);
}

export default MainPage;

