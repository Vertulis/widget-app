function CurrentWeatherCard({ weatherData }) {
    // Check if weatherData is available
    if (!weatherData) {
        return (
            <div className="current-weather-card">
                <p>No forecast data available.</p>
            </div>
        );
    }

    // Destructure city and list from weatherData
    const { city, list } = weatherData;

    // Group weather data by day
    const dailyForecasts = {};
    list.forEach((entry) => {
        const date = new Date(entry.dt * 1000).toDateString(); // Convert timestamp to date string
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = [];
        }
        dailyForecasts[date].push(entry);
    });

    // Get the next 5 days
    const forecastDays = Object.keys(dailyForecasts).slice(0, 1);

    

    // Check if city and list are defined
    if (!city || !list || list.length === 0) {
        return (
            <div className="current-weather-card">
                <p>Error loading weather data.</p>
            </div>
        );
    }

    return (
        <>
            {forecastDays.map((day) => {
            const dailyEntries = dailyForecasts[day];
            const { main, weather, wind } = dailyEntries[0]; // Use the first entry for the day's forecast

            return (
                <div className="current-weather-card">
                    <h1 className='location'>{city.name}</h1>
                    <p className="description">{(weather[0].description).charAt(0).toUpperCase() + (weather[0].description).slice(1)}</p>
                    <p><i className="fa-solid fa-temperature-three-quarters"></i> Temperature: {Math.round(main.temp)}&deg;C</p>
                    <p><i className="fa-solid fa-droplet"></i> Humidity: {main.humidity}%</p>
                    <p><i className="fa-solid fa-wind"></i> Wind speed: {wind.speed} km/h</p>
                    <p className="date"><i className="fa-regular fa-calendar-days"></i> {day}</p>
                </div>
            );
            })}
        
        </>
        
    );
}

export default CurrentWeatherCard;
