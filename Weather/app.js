const input = document.getElementById('inputbox');
const btn = document.getElementById('btn');
const photo = document.querySelector('.image');
const temperature = document.querySelector('.temp');
const description = document.querySelector('.descrip');
const humidity = document.querySelector('#humidity');
const windspeed = document.querySelector('#windspeed');
const invalidLocation = document.querySelector('.invalidLocation');
const weatherbox = document.getElementById('weatherbox');




async function checkweather(city) {
    const api = '700bb5d0417f64427b93e875735f18fd';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    const weatherdata = await fetch(`${url}`).then(response => response.json());

    if (weatherdata.cod === '404') {
        invalidLocation.style.display = 'flex';
        weatherbox.style.display = 'none';
        return;
    }
    invalidLocation.style.display = 'none';
    weatherbox.style.display = 'flex';
    temperature.innerHTML = `${Math.round(weatherdata.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherdata.weather[0].description}`;
    humidity.innerHTML = `${weatherdata.main.humidity}`;
    windspeed.innerHTML = `${weatherdata.wind.speed}`;

    switch (weatherdata.weather[0].main) {
        case 'Clouds': photo.src = "assets/cloud.png"
            break;

        case 'Clear': photo.src = "assets/clear.png"
            break;

        case 'Rain': photo.src = "assets/rain.png"
            break;

        case 'Mist': photo.src = "assets/mist.png"
            break;

        case 'Snow': photo.src = "assets/snow.png"
            break;
        default: photo.src = "assets/snow.png"

    }
}


btn.addEventListener('click', () => {
    checkweather(input.value);
});