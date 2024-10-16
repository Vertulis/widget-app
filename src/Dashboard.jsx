import React, { useState } from 'react'
import NewsWidget  from './Components/NewsWidget';
import WeatherWidget from './Components/WeatherWidget';

function DashBoard(){

    const [mainView, setMainView] = useState('')
    const d = new Date();

    const displayWeather =  () => {
        setMainView('weatherWidget')
    }

    const displayNews =  () => {
        setMainView('newsWidget')
    }

    return(
        <>
            <div className='side-navbar'>
                <h1 className='dashboard-heading'>Dashboard</h1>
                <div style={{border: "0px", padding: "0px"}}>
                    <button className='nav-btn' onClick={displayWeather}><i className="fa-solid fa-cloud fa-xl"></i> Weather</button>
                    <button className='nav-btn' onClick={displayNews}><i className="fa-solid fa-newspaper fa-xl"></i> News</button>
                    
                </div>
            </div>
            {mainView === 'weatherWidget' && (
                <div className='weather-container'>
                    <WeatherWidget/>
                </div>
            )}

            {mainView === 'newsWidget' && (
                <div className='news-container'>
                    <NewsWidget/>
                </div>
            )}
        </>
    );
}

export default DashBoard