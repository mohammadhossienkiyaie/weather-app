// http://api.weatherapi.com/v1/search.json  // the search URL

// http://api.weatherapi.com/v1/current.json?key=f4d3d0cca1014732ba6164554250507&q=Tehran&aqi=no //weather URL 

// API key : 78a4589129334b0fab6101418250707

const searchGeoInput = document.getElementById('searchInput');
const geoBtn = document.getElementById('searchBtn');
const resultGeoDiv = document.getElementById('searchResultDiv');
const weatherDiv = document.getElementById('weatherAppDiv');

const API_KEY = '78a4589129334b0fab6101418250707' ;
const SEARCH_API_URL = 'https://api.weatherapi.com/v1/search.json';
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';


const selectedCity = localStorage.getItem('selectedCity');
if(selectedCity){
    fetchWeatherForCity(selectedCity);
    localStorage.removeItem('selectedCity');
}

async function fetchWeatherForCity(cityName){
    const fullWeatherUrl = `${WEATHER_API_URL}?key=${API_KEY}&q=${cityName}&aqi=no`;
    weatherDiv.innerHTML = "loading Weather Data...";
    try{
        const response = await fetch(fullWeatherUrl);
        if(!response.ok){
            const dataError = await response.json();
            throw new Error('failed to get Data');
        }
        const data = await response.json();
        console.log('data information :' , data);

        const cityDisplayName = data.location.name;
        const countryName = data.location.country;
        const temCelsius = data.current.temp_c;
        const feelsLikeCelsius = data.current.feelsLike_c;
        const windSpeed = data.current.wind_Kph; 

    }catch{
        console.Error('failed to get data from api ');
    }
}