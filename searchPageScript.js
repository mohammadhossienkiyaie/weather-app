const geoBtn = document.getElementById('searchBtn');
const searchGeoInput = document.getElementById('searchInput');
const resultGeoDiv = document.getElementById('searchResultDiv');
const weatherDiv = document.getElementById('weatherAppDiv');

const API_KEY = '78a4589129334b0fab6101418250707';
const SEARCH_API_URL = 'https://api.weatherapi.com/v1/search.json';
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';

let deBounceTimeout;

geoBtn.addEventListener('click', async function () {
    let searchValue = null;
    const searchGeoValue = searchGeoInput.value.trim();
    if (searchGeoValue === "") {
        alert('Enter a country name ');
        return;
    } else {
        searchValue = searchGeoValue;
        console.log(searchValue);
    }
    const GEO_URL = `${SEARCH_API_URL}?key=${API_KEY}&q=${encodeURIComponent(searchValue)}`;
    try {
        const response = await fetch(GEO_URL);
        const data = await response.json();
        console.log('city result data :  ', data);
        console.log("city result data:", JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('failed to get data :', error);
    }
})

searchGeoInput.addEventListener('input', function () {
    clearTimeout(deBounceTimeout)
    let liveINputvalue = searchGeoInput.value.trim();
    if (liveINputvalue.length === 0) {
        resultGeoDiv.innerHTML = '';
        return;
    }

    deBounceTimeout = setTimeout(() => {
        fetchCityData(liveINputvalue);
    }, 500);
});

async function fetchCityData(query) {
    resultGeoDiv.innerHTML = '<p>searching...</p>';
    const fullSearchUrl = `${SEARCH_API_URL}?key=${API_KEY}&q=${query}`;
    try {
        const response = await fetch(fullSearchUrl);
        if (!response.ok) throw new Error(`falied to process`);
        const data = await response.json();
        resultGeoDiv.innerHTML = '';
        if (data.length === 0) {
            resultGeoDiv.innerHTML = '<p>city not found !</p>';
            return;
        }

        data.forEach((city) => {
            const p = document.createElement('p');
            p.textContent = `${city.name} , ${city.country}`;
            p.className = 'cityDiv';
            p.addEventListener('click', () => {
                localStorage.setItem('selectedCity', city.name);
                resultGeoDiv.innerHTML = '';
                window.location.href = 'Homepage.html';
            })
            resultGeoDiv.appendChild(p);
        });

    } catch (error) {
        console.log("failed to search city ! ", error);
    }
}

// info button 
const popupBackground = document.getElementById('popupBackgroundDiv');
const popupDiv = document.getElementById('popupDiv');
const infoButton = document.getElementById('infoButton');

infoButton.addEventListener('click', () => {
    popupDiv.classList.toggle('popupActive');
    popupBackground.classList.toggle('blurredContent');
    console.log(popupBackground);
});