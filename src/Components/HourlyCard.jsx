
function HourlyCard({weatherData}){
    // Check if weatherData is available
    if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
        return (
            <div className="hour-card">
                <p>No forecast data available.</p>
            </div>
        );
    }

    // Select the next 5 hours
    const hourlyEntries = weatherData.list.slice(0, 5); // Adjust the slice as needed

    return (
        <>
            {hourlyEntries.map((entry) => {
                const date = new Date(entry.dt * 1000); // Convert timestamp to Date object
                const hour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const { main, weather} = entry;

                return (
                    <div key={entry.dt} className="hour-card">
                        <h1 className="hour">{hour}</h1>
                        <p>{(weather[0].description).charAt(0).toUpperCase() + (weather[0].description).slice(1)}</p>
                        <p>{Math.round(main.temp)}&deg;C</p>
                    </div>
                );
            })}
        </>
    );
}

export default HourlyCard;