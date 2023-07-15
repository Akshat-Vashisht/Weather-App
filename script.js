const inputBox = document.getElementById("input-box");
const searchButton = document.getElementById("search-button");
const weatherImage = document.querySelector(".weather-image");
const weatherLocation = document.querySelector(".location");
const description = document.querySelector(".description");
const temperature = document.querySelector(".temperature");
const humidity = document.getElementById("humidity");
const aqi = document.getElementById("aqi");
const clouds = document.getElementById("clouds");
const wind = document.getElementById("wind");
const api = config.API_KEY;

async function getWeather(cityName) {
  cityName = _.kebabCase(cityName);
  const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${cityName}&aqi=yes`;
  const response = await fetch(url);
  if (response.status === 400) {
    document.querySelector(".not-found").style.display = "flex";
    document.querySelector(".temperature-box").style.display = "none";
    document.querySelector(".weather-details").style.display = "none";
    console.log("Lol");
  } else {
    document.querySelector(".not-found").style.display = "none";
    document.querySelector(".temperature-box").style.display = "flex";
    document.querySelector(".weather-details").style.display = "flex";
    const jsonData = await response.json();
    let imageSrc = jsonData.current.condition.icon;
    imageSrc = "." + imageSrc.substring(20, imageSrc.length);
    weatherImage.setAttribute("src", imageSrc);
    weatherLocation.innerHTML = `${jsonData.location.name}, ${jsonData.location.country}`;
    temperature.innerHTML = `${jsonData.current.temp_c}°C`;
    description.innerHTML = jsonData.current.condition.text;
    humidity.innerHTML = `${jsonData.current.humidity}%`;
    const aqiVal = jsonData.current.air_quality["us-epa-index"];
    switch (aqiVal) {
      case 1:
        aqi.innerHTML = "Good";
        break;
      case 2:
        aqi.innerHTML = "Moderate";
        break;
      case 3:
        aqi.innerHTML = "Unhealthy for sensitive group";
        break;
      case 4:
        aqi.innerHTML = "Unhealthy";
        break;
      case 5:
        aqi.innerHTML = "Very unhealthy";
        break;
      case 6:
        aqi.innerHTML = "Hazardous";
        break;
      default:
        aqi.innerHTML = "Error loading";
        break;
    }
    wind.innerHTML = `${jsonData.current.wind_kph} km/h`;
    clouds.innerHTML = `${jsonData.current.cloud}%`;
  }
}

searchButton.addEventListener("click", () => {
  getWeather(inputBox.value);
});

inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeather(inputBox.value);
  }
});
