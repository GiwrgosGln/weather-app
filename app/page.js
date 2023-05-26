"use client";
import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b700e37c8bdb82497153f15fb1926889`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        throw new Error('Unable to fetch weather data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherImage = (conditionCode) => {
    switch (conditionCode) {
      case '01d':
        return '/images/sunny.png';
      case '01n':
        return '/images/clear-night.png';
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return '/images/cloudy.png';
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return '/images/rainy.png';
      case '11d':
      case '11n':
        return '/images/thunderstorm.png';
      case '13d':
      case '13n':
        return '/images/snowy.png';
      case '50d':
      case '50n':
        return '/images/mist.png';
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen">
      <div className="text-center">
          <h1 className="text-4xl pt-8 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">Weather App</h1>
          <form onSubmit={handleSearch} className="flex flex-col justify-center items-center mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="border border-gray-300 px-4 py-2 rounded-lg w-2/3 my-2"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-white to-blue-400 text-black w-1/3 text-white px-4 py-2 rounded-lg ml-2"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center md:flex-row md:justify-center sm:items-center md:items-start">
          <div className="w-3/5 sm:w-screen">
            <img src={getWeatherImage(weatherData?.weather[0]?.icon)} className=""/>
          </div>

          <div className="w-2/5 md:w-2/5 sm:w-4/5">
            {weatherData && (
              <div className="sm:mt-4">
                <h2 className="text-center font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 sm:text-4xl">{weatherData.name}</h2>
                <p className="text-white font-bold text-center">Description: {weatherData.weather[0].description}</p>
                <p className="text-white font-bold text-center">Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
                <p className="text-white font-bold text-center">Humidity: {weatherData.main.humidity}%</p>
                <p className="text-white font-bold text-center">Wind Speed: {weatherData.wind.speed} mp/h</p>
                <p className="text-white font-bold text-center">Country: {weatherData.sys.country}</p>
              </div>
            )}
          </div>
        </div>


  
  {/* 
  <div className="flex flex-col sm:flex-row mx-4 sm:mx-40 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
    <div className="w-full sm:w-2/3 lg:w-3/4">
      <img src={getWeatherImage(weatherData?.weather[0]?.icon)} alt="Weather Icon" />
    </div>
    <div className="w-full sm:w-2/3 lg:w-1/4 p-4 mt-4 sm:mt-0 flex flex-col justify-end">
      {weatherData && (
        <div>
          <h2 className="text-2xl mb-2 text-center text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-purple-500">
            {weatherData.name}
          </h2>
          <p className="mb-2">Description: {weatherData.weather[0].description}</p>
          <p className="mb-2">
            Temperature: {Math.round(weatherData.main.temp - 273.15)}°C
          </p>
          <p className="mb-2">Humidity: {weatherData.main.humidity}%</p>
          <p className="mb-2">Wind Speed: {weatherData.wind.speed} m/s</p>
          <p className="mb-2">Lon: {weatherData.coord.lon} m/s</p>
        </div>
      )}
    </div>
  </div> */}
</div>




  );
}
