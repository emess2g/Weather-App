import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7a1bd02aaa6f6aba6d2eec3896d193de`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


    // Extract and display weather icon
    const renderIcon = () => {
      if (weatherData && weatherData.weather) {
        const iconCode = weatherData.weather[0].icon;
        const url = 'http://openweathermap.org'
        return `${url}/img/w/${iconCode}.png` ;
      }
      return null;
    };
  

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className='flex flex-col  text-center p- justify-center items-center h-[80vh] w-[] m-4'>
      <h1 className='mb-12 underline font-bold'>Simple Weather App</h1>
      <div className="w-[40%]">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className='bg-[#202B3B] w-[100%] p-4 rounded-md outline-none' 
        />
        <button className='xl:hidden' type="submit">Get Weather</button>
      </form>
      <div className="w-[%]">
      {weatherData ? (
        <>
         <div className="flex flex-col gap-8 justify-center mb-8">
         <h2 className='text-8xl'>{weatherData.name}</h2>
           <div className="flex items-center justify-center" >
           <p className='text-4xl'> {weatherData.main.temp}°C</p>
           <img className='w-[30%]' src={renderIcon()} alt="" />
           </div>
         </div>
          <p>Description: {weatherData.weather[0].description} </p>
         
          <div className="flex text-center text-2xl items-center justify-between mt-8 gap-8 p-4 bg-[#202B3B]">
            <div className="">
              <p>Feels like</p>
              <p>{weatherData.main.feels_like}°C</p>
            </div>
          <div>
             <p>Humidity</p>
             <p>{weatherData.main.humidity}%</p>
           </div>
           <div className="">

           </div>
          <p>Pressure <br /> {weatherData.main.pressure}</p>
          <p>Wind Speed <br /> {weatherData.wind.speed}m/s</p>
          </div>
        </>
      ) : (
        <p className='mt-8 text-[gray]'> Type a City to Fetch Current Weather </p>
      )}
      </div>
      </div>
    </div>
  );
};

export default Weather;