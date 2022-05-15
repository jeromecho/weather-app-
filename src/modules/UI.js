import KUMOIMG from '../img/kumo.svg';
import RAINBG from '../img/RAIN.png';
import CLOUDSBG from '../img/CLOUDS.png';
import CLEARBG from '../img/CLEAR.png';
import RAINLOGO from '../img/Rainy weather.svg';
import CLOUDSLOGO from '../img/Cloudy weather.svg';
import CLEARLOGO from '../img/Clear weather.svg';
import SNOWLOGO from '../img/Snowy weather.svg';
import MAGNIFYINGGLASS from '../img/MAGNIFYINGGLASS.svg';

const UI = (function () {
    const body = document.querySelector('body');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const makePage = () => {
        body.appendChild(makeHeader());
        body.appendChild(makeHero());
        body.appendChild(makeDisplay());
    };

    const makeHeader = () => {
        const header = document.createElement('div');
        const madeBy = document.createElement('p');
        header.id = 'header';
        madeBy.id = 'made-by';
        madeBy.textContent = 'Crafted with ♡ by Jerome Cho';
        header.appendChild(madeBy);
        return header;
    }

    const makeHero = () => {
        const heroContainer = document.createElement("div");
        const logo = document.createElement('img');
        const searchContainer = document.createElement('div');
        const search = document.createElement('input');
        const magnifyingGlass = document.createElement('img');

        search.id = 'search';
        search.placeholder = 'Vancouver';
        magnifyingGlass.src = MAGNIFYINGGLASS;
        magnifyingGlass.id = 'magnifying-glass';
        searchContainer.id = 'search-container';
        searchContainer.appendChild(search);
        searchContainer.appendChild(magnifyingGlass);

        const hero = document.createElement('div'); 
        hero.id = 'hero';
        
        logo.id = 'hero-image';
        logo.src = KUMOIMG;

        hero.appendChild(logo);
        hero.appendChild(searchContainer);

        heroContainer.id = 'hero-container';
        heroContainer.appendChild(hero);
        return heroContainer;
    }

    const makeDisplay = () => {
        const displayContainer = document.createElement("div");
        const display = document.createElement('div');

        displayContainer.id = 'display-container';
        display.id = 'display';

        for (let i = 0; i < 7; i++) {
            let dateWeather = document.createElement("div");
            let day = document.createElement("p");
            let logo = document.createElement('img');
            let maxTemp = document.createElement('p');
            let minTemp = document.createElement('p');

            dateWeather.className = 'date-weather';
            dateWeather.id = `date-weather${i}`;
            day.id = `day${i}`;
            logo.id = `logo${i}`;
            maxTemp.className = 'max-temp';
            maxTemp.id = `max-temp${i}`;
            minTemp.className = 'min-temp';
            minTemp.id = `min-temp${i}`;

            let temp = document.createElement('div');
            temp.id = `temp${i}`;
            temp.appendChild(maxTemp);
            temp.appendChild(minTemp);

            dateWeather.appendChild(logo);
            dateWeather.appendChild(temp);
            dateWeather.appendChild(day);

            display.appendChild(dateWeather);
        }

        displayContainer.appendChild(display);

        return displayContainer;
    };

    // changeBackground :: String -> No Return Value
    const changeBackground = weather => {
        if (weather === 'Rain') {
            body.style.backgroundImage = `url(${RAINBG})`;
        } else if (weather === 'Clouds') {
            body.style.backgroundImage = `url(${CLOUDSBG})`;
        } else if (weather === 'Clear') {
            body.style.backgroundImage = `url(${CLEARBG})`;
        } else {
            console.log(`Unhandled weather ${weather}`);
        }
    }

    // updateDisplay :: {WeatherData} -> No Return Value
    const updateDisplay = data => {

    };

    // displayToTodaysDate :: String -> No Return Value 
    const displayToTodaysDate = date => {
        let index = days.indexOf(date);
        let displayDays = days.slice(index).concat(days.slice(0, index));

        for (let i = 0; i < 7; i++) {
            let displayDate = document.querySelector(`#day${i}`);
            displayDate.textContent = displayDays[i];
        } 
    };

    // displayWeatherInfo :: [Array] -> No Return
    const displayWeatherInfo = weatherData => {
        let dayNumber = weatherData[0];
        let weather = weatherData[1];
        let maxTemp = weatherData[2];
        let minTemp = weatherData[3];

        let displayLogo = document.querySelector(`#logo${dayNumber}`);
        let displayMax = document.querySelector(`#max-temp${dayNumber}`);
        let displayMin = document.querySelector(`#min-temp${dayNumber}`);

        displayLogo.src = chooseWeatherLogo(weather);
        displayMax.textContent = maxTemp.toString();
        displayMin.textContent = minTemp.toString();
    };

    // chooseWeatherLogo :: String -> String
    const chooseWeatherLogo = weather => {
        if (weather === 'Rain') {
            return RAINLOGO;
        } else if (weather === 'Clouds') {
            return CLOUDSLOGO;
        } else if (weather === 'Clear') {
            return CLEARLOGO;
        } else if (weather === 'Snow') {
            return SNOWLOGO;
        } else {
            console.log(`Unhandled weather: ${weather}`);
            throw new Error(`Unhandled weather: ${weather}`);
        }
    };
    
    return {
        changeBackground,
        displayToTodaysDate,
        displayWeatherInfo,
        makePage,
        updateDisplay,
    };

})();

export default UI;
