
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Typography, Button, Box } from '@mui/material';
import '@fontsource/averia-serif-libre/300.css';
import '@fontsource/averia-serif-libre/400.css';
import '@fontsource/averia-serif-libre/700.css';

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

    const makeHeader = () => {
        return (
            <div>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <img src="IMG_3363.png" width="100px" height="100px"/>
                    <Typography>Welcome to Fifi's Hangout!!!</Typography>
                    <img src="IMG_3364.png" width="100px" height="100px"/>
                </Box>
            </div>
        );
    }


 return (
    <div>
        {makeHeader()}
        <Box sx={{
            border: 2,
            borderRadius: '16px',
            borderColor: '#dbb8d8',
            padding: "10px",
            margin: '15px'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                margin: '10px'
            }}>
                <Typography>Forecast for Today!</Typography>
                <img src="312cb6dc61dc3f9ad42b8218681a896d.png" width="50px" height="50px"/>
            </Box>
                {position.error ? (
                <Typography>Error</Typography>
            ) : loaded && (
                <Typography>{forecast}</Typography>
            )}
        </Box>
        <Box sx={{
            border: 2,
            borderRadius: '16px',
            borderColor: '#dbb8d8',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '15px',
            padding: '10px',
            gap: '10px'
        }}>
            <Typography>Daily Dog!</Typography>
            {dogImage && <img src={dogImage} width="70%" height="70%" alt="doggy"/>
            }
            <Button variant="outlined" onClick={getNewDog}>Get a new one!</Button>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30px'
        }}>
            <img src="Timmy_and_Tommy_NH.png" height="25px" width="40px"/>
            <Typography variant="caption" gutterBottom sx={{
                display: 'block',
                color: 'grey'
                }}>
                    Have a great day! I love you baby!
            </Typography>
        </Box>
    </div>
);
}

export default MainPage;

