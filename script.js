// http://api.weatherapi.com/v1/search.json  // the search URL

// http://api.weatherapi.com/v1/current.json?key=f4d3d0cca1014732ba6164554250507&q=Tehran&aqi=no //weather URL 

// API key : 78a4589129334b0fab6101418250707

const searchGeoInput = document.getElementById('searchInput');
const geoBtn = document.getElementById('searchBtn');
const resultGeoDiv = document.getElementById('searchResultDiv');
const weatherDiv = document.getElementById('weatherAppDiv');
const mainWeather = document.getElementById('WeatherBox1');
const cityInfo = document.getElementById('cityInfo');
const weatherPic = document.getElementById('weatherpic');
const weatherCondition = document.getElementById('weatherConditionText');
const windSpeedDiv = document.getElementById('windSpeedDiv');
const feelsLikeBox = document.getElementById('feelsLike');
const humidityBox = document.getElementById('humidityBox');
const weatherTemp = document.getElementById('weatherTempDiv');

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
    const weatherForecast = `${WEATHER_API_URL}/forecast.json?key=${API_KEY}&q=${cityName}&days=2&aqi=no`;

    try{
        const [currentResponse , forcastResponse ] = await Promise.all([fetch(fullWeatherUrl) , fetch(weatherForecast)]);
        if(!currentResponse.ok){
            const errorData = await currentResponse.json();
            throw new Error(`falied to get current weather : ${errorData.error}`);
        }
        if(!forcastResponse.ok){
            const errorData = await forcastResponse.json();
            throw new Error(`failed to get forcast weather ${errorData.error}`);
        }

        const currentData = await currentResponse.json();
        const forcastData  = await forcastResponse.json();

        // current weather data 
        const cityDisplayName = currentData.location.name;
        const countryName = currentData.location.country;
        const temCelsius = currentData.current.temp_c;
        const feelsLikeCelsius = currentData.current.feelslike_c;
        const windSpeed = currentData.current.wind_kph;
        const humidity = currentData.current.humidity;
        const weatherConditionText = currentData.current.condition.text;
        //for weather pic 
        const weathericon = currentData.current.condition.icon ;
        const completeWeatherIconUrl = `https:${weathericon}`; 
        //forcast weather data 
        const tomorrowForcast = forcastData.current.temp_c;
        const forcastTemp = forcastData.location.name;
        const weatherforcastCondition = forcastData.current.condition.text;
        
        if(cityInfo && weatherPic && weatherTemp && weatherCondition){
            cityInfo.innerHTML += `<p class ="cityInfo">${countryName} , ${cityDisplayName}</p>` ; 
            weatherPic.innerHTML += `
            <img
                src="${completeWeatherIconUrl}"
                alt="${weatherConditionText}"
                class="weatherPicBox1"
            >`;
            weatherTemp.innerHTML += `<p class="weatherTempText" >${temCelsius}</p>`
            weatherCondition.innerHTML += `<p class="conditionText">${weatherConditionText}</p>` ;
        }
        if(windSpeedDiv && feelsLikeBox && humidityBox){
            windSpeedDiv.innerHTML += `<p class="squareBox">
            ${windSpeed}</p>`;
            feelsLikeBox.innerHTML += `<p class="squareBox">${feelsLikeCelsius}</p>`;
            humidityBox.innerHTML += `<p class="squareBox">${humidity}</p>`
        }
        if()
        
    }catch(error){
        console.error('failed to get data from api ' , error);
    }
}