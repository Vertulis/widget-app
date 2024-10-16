import React, { useState } from 'react';
import CurrentWeatherCard from './CurrentWeatherCard.jsx';
import DailyCard from './DailyCard.jsx';
import HourlyCard from './HourlyCard.jsx';

function WeatherWidget() {
    const apiKey = "aecec75f9a4d3c6ae97655f8605cf7f8"; // OpenWeatherMap API key
    const [location, setCity] = useState("");
    const [view, setView] = useState('hourly');
    const [buttonStyle, setButtonStyle] = useState({
        hourly: { backgroundColor: '#0a275c' },
        weekly: { backgroundColor: '#242424' }
    });
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (event) => {
        const input = event.target.value;
        setCity(input);

        if (input) {
            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`);
                const data = await response.json();
                if (data.length) {
                    const citySuggestions = data.map(city => `${city.name}, ${city.state || city.country}`);
                    setSuggestions(citySuggestions);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error("Error fetching city suggestions:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (city) => {
        setCity(city);
        setSuggestions([]); // Clear suggestions after selection
    };

    const handleFormSubmission = async (event) => {
        event.preventDefault();
        if (location) {
            try {
                const data = await getWeatherData(location);
                setWeatherData(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const getWeatherData = async (userCity) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Could not fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
        return data;
    };

    return (
        <>
            <form className='form' onSubmit={handleFormSubmission}>
                <input
                    type="text"
                    value={location}
                    onChange={handleInputChange}
                    placeholder="Enter a city"
                    required
                />
                <button className='submit-btn' type="submit">Get weather</button>
                {/* Render suggestions if available */}
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((city, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(city)}>
                            {city}
                        </li>
                    ))}
                </ul>
            )}
            </form>
            
            {error && <p className="error">{error}</p>}

            

            <div className='divider'>
                <CurrentWeatherCard weatherData={weatherData} />
                
                <div className='divider-sub-container'>
                    <button className='toggle hourly-btn' style={buttonStyle.hourly} onClick={() => setView('hourly')}>
                        Hourly
                    </button>
                    <button className='toggle weekly-btn' style={buttonStyle.weekly} onClick={() => setView('weekly')}>
                        Weekly
                    </button>
                    {view === 'hourly' && (
                        <div className='hourly-weather-container'>
                            <HourlyCard weatherData={weatherData} />

                        </div>
                    )}

                    {view === 'weekly' && (
                        <div className='weekly-weather-container'>
                                <DailyCard weatherData={weatherData} />
                        </div>
                    )}
                    
                </div>
            </div>
        </>
    );
}

export default WeatherWidget;
