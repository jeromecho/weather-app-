import UI from './modules/UI.js';
import './styles/style.css';
import 'normalize.css';

const MAPQUEST_APIKEY = 'AqO3Y1gIBulSbPiN8unWI3UFqsRcNHoB';
const OPENWEATHER_APIKEY = '1eefdecb308c3bc41f42967248baaeb1';

// For initialization
let city = 'Coquitlam';
makePage();

const searchInput = document.querySelector('#search');
const magnifyingGlass = document.querySelector('#magnifying-glass');

window.addEventListener('keydown', function(e) {
    if (e.code === 'Enter') {
        submitCity();
    }
});

magnifyingGlass.addEventListener('click', function (e) {
    submitCity();
});

function submitCity() {
    city = searchInput.value;
    searchInput.value = '';
    updatePage();
}

async function updatePage() {
    let weatherData = await loadWeatherData();
    let todaysWeather = weatherData[0]['weather'][0]['main'];
    console.log(weatherData);
    updateDisplays(weatherData);
    UI.changeBackground(todaysWeather);
}

async function makePage() {
    UI.makePage();
    let weatherData = await loadWeatherData();
    let todaysWeather = weatherData[0]['weather'][0]['main'];
    console.log(weatherData);
    updateDisplays(weatherData);
    UI.changeBackground(todaysWeather);
}

async function loadWeatherData () {
    while (true) {
        try {
            let coords; 
            coords = await getCoordinates(city);
            let weatherData = await getWeather(coords);
            return weatherData;
            break;
        } catch {
            alert("Please try a different city.");
        }
    }
}

// getCoordinates :: String -> [Number]
async function getCoordinates (city) {
    let response = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${MAPQUEST_APIKEY}&location=${city}`, {
        mode: 'cors',
    });
    let data = await response.json();
    let dataObject = data.results[0].locations[0].displayLatLng;
    return [dataObject.lat, dataObject.lng];
}

// getWeather :: [Number] -> maybe object?
async function getWeather (coords) {
    // make openweather API request 
    let [lat, lon] = coords;
    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${OPENWEATHER_APIKEY}`, {
        mode: 'cors',
    });
    let data = await response.json();
    return data.daily;
}

// updateDisplays :: {Object} -> No Return Value
function updateDisplays (data) {
    displayToTodaysDate();
    displayWeatherInfo(data);
}

// displayToTodaysDate :: No input -> No Return
function displayToTodaysDate() {
    let today = (new Date()).toString().slice(0, 3);
    UI.displayToTodaysDate(today);
};

// displayWeatherInfo :: {Object} -> No Return 
function displayWeatherInfo(data) {
    for (let i = 0; i < 7; i++) {
        let weather = data[i]['weather'][0]['main'];
        let minTemp =
            roundToNoDecimal(kelvinToCelcius (data[i]['temp']['min']));
        let maxTemp = 
            roundToNoDecimal(kelvinToCelcius (data[i]['temp']['max']));
        let weatherData = [i, weather, maxTemp, minTemp];
        UI.displayWeatherInfo(weatherData);
    }
};

// roundToNoDecimal :: Number -> Number
function roundToNoDecimal (num) {
    return Math.round(num);
}

// kelvinToCelcius :: Number -> Number
function kelvinToCelcius (kelvin) {
    return kelvin - 273.15;
}






