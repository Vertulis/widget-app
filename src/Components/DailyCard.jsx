function DailyCard({ weatherData }) {
    // Check if weatherData is available
    if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
        return (
            <div className="daily-weather-card">
                <p>No forecast data available.</p>
            </div>
        );
    }

    // Group weather data by day
    const dailyForecasts = {};
    weatherData.list.forEach((entry) => {
        const date = new Date(entry.dt * 1000); // Convert timestamp to Date object
        const dateString = date.toISOString().split('T')[0]; // Use YYYY-MM-DD format as a key
        
        if (!dailyForecasts[dateString]) {
            dailyForecasts[dateString] = [];
        }
        dailyForecasts[dateString].push(entry);
    });

    // Get the next 5 days (use keys as date strings)
    const forecastDays = Object.keys(dailyForecasts).slice(1, 6); // Slice to show next 5 days

    return (
        <>
            {forecastDays.map((day) => {
                const dailyEntries = dailyForecasts[day];
                const { main, weather } = dailyEntries[0]; // Use the first entry for the day's forecast

                // Format the date to a readable string (e.g., "Monday, October 15, 2024")
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }).format(new Date(day));

                return (
                    <div key={day} className="daily-weather-card">
                        <h1>{formattedDate}</h1> {/* Display the formatted local date */}
                        <p className="description">{(weather[0].description).charAt(0).toUpperCase() + (weather[0].description).slice(1)}</p>
                        <p>{Math.round(main.temp)}&deg;C</p>
                        <p>{main.humidity}%</p>
                    </div>
                );
            })}
        </>
    );
}

export default DailyCard;
