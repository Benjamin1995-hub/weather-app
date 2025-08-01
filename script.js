const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");
const descriptionElement = document.querySelector(".description");
const flagElement = document.querySelector(".flag");
const localTimeElement = document.querySelector(".local-time");

const apiKey = "2f9765b094b978f63612eb53a63c5467";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      errorContainer.style.display = "block";
      weatherContainer.style.display = "none";
      return;
    }

    const data = await response.json();

    tempElement.innerHTML = Math.round(data.main.temp) + "°c";
    cityElement.innerHTML = data.name;
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = Math.round(data.wind.speed) + " km/h";
    descriptionElement.innerHTML = data.weather[0].description;
    flagElement.src = `https://flagsapi.com/${data.sys.country}/flat/64.png`;

    // Set local time based on timezone offset
    const timezoneOffset = data.timezone;
    const localDate = new Date(new Date().getTime() + timezoneOffset * 1000);
    localTimeElement.innerHTML = `Local Time: ${localDate
      .toUTCString()
      .slice(17, 25)}`;

    const weatherCondition = data.weather[0].main;
    if (weatherCondition === "Clouds") {
      weatherIcon.src = "https://img.icons8.com/color/96/clouds.png";
    } else if (weatherCondition === "Clear") {
      weatherIcon.src = "https://img.icons8.com/color/96/sun--v1.png";
    } else if (weatherCondition === "Rain") {
      weatherIcon.src = "https://img.icons8.com/color/96/rain.png";
    } else if (weatherCondition === "Drizzle") {
      weatherIcon.src = "https://img.icons8.com/color/96/light-rain-2.png";
    } else if (weatherCondition === "Mist") {
      weatherIcon.src = "https://img.icons8.com/color/96/fog-day.png";
    } else if (weatherCondition === "Snow") {
      weatherIcon.src = "https://img.icons8.com/color/96/snow.png";
    }

    weatherContainer.style.display = "block";
    errorContainer.style.display = "none";
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    errorContainer.innerHTML =
      "<p>Could not fetch weather. Please try again.</p>";
    errorContainer.style.display = "block";
    weatherContainer.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value) {
    checkWeather(searchBox.value);
  }
});

searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && searchBox.value) {
    checkWeather(searchBox.value);
  }
});
