// http://api.weatherapi.com/v1/search.json  // the search URL

// http://api.weatherapi.com/v1/current.json?key=f4d3d0cca1014732ba6164554250507&q=Tehran&aqi=no //weather URL 

// API key : 78a4589129334b0fab6101418250707

const searchGeoInput = document.getElementById('searchInput');
const geoBtn = document.getElementById('searchBtn');
const resultGeoDiv = document.getElementById('searchResultDiv');

const API_KEY = '78a4589129334b0fab6101418250707' ;
const SEARCH_API_URL = 'https://api.weatherapi.com/v1/search.json';
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';

geoBtn.addEventListener('click' , async function() {
    let searchValue = null ;
    const searchGeoValue = searchGeoInput.value.trim() ;
    if(searchGeoValue === ""){
        alert('Enter a country name ');
        return ;
    }else{
    searchValue = searchGeoValue ;
    console.log(searchValue);  
    }
     const GEO_URL = `${SEARCH_API_URL}?key=${API_KEY}&q=${encodeURIComponent(searchValue)}`;
        try{
            const response = await fetch(GEO_URL);
            const data = await response.json();
            console.log('city result data :  ' , data);
            console.log("city result data:", JSON.stringify(data, null, 2));

        }catch(error){
            console.error('failed to get data :' , error);
        }
})

searchGeoInput.addEventListener('input' , function(){
    let liveInputValue = document.getElementById('searchInput');
    if(liveInputValue === ''){
        alert('please Enter a city for weather Data');
        return;
    }
})