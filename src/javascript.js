let now = new Date();
let currentDate = document.querySelector("#date-now");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Deceber",
];

function getType(date) {
  if (date === 1 || date === 21 || date === 31) {
    return "st";
  } else if (date === 2 || date === 22) {
    return "nd";
  } else if (date === 3 || date === 23) {
    return "rd";
  } else return "th";
}

let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let date = now.getDate();
let dateType = getType(date);
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let amPm = " ";

if (hour < 12) {
  amPm = "AM";
} else amPm = "PM";

currentDate.innerHTML = `Last updated: ${currentDay} - ${currentMonth} ${date}${dateType} ${year} - ${hour}:${minutes} ${amPm}`;

function showBackground(response) {
  let weatherMain = response.data.weather[0].main;
  let weatherId = response.data.weather[0].id;
  let backgroundImage = document.querySelector("#weather-now");

  if (weatherMain === "Thunderstorm") {
    backgroundImage.classList.remove(
      "drizzleBackground",
      "freezingRainBackground",
      "rainBackground",
      "snowBackground",
      "fogBackground",
      "sunnyBackground",
      "fewCloudsBackground"
    );
    backgroundImage.classList.add("thunderBackground");
  } else if (weatherMain === "Drizzle") {
    backgroundImage.classList.remove(
      "freezingRainBackground",
      "rainBackground",
      "snowBackground",
      "fogBackground",
      "sunnyBackground",
      "fewCloudsBackground"
    );
    backgroundImage.classList.add("drizzleBackground");
  } else if (weatherId === 511) {
    backgroundImage.classList.remove(
      "rainBackground",
      "snowBackground",
      "fogBackground",
      "sunnyBackground",
      "fewCloudsBackground"
    );
    backgroundImage.classList.add("freezingRainBackground");
  } else if (weatherMain === "Rain") {
    backgroundImage.classList.remove(
      "snowBackground",
      "fogBackground",
      "sunnyBackground",
      "fewCloudsBackground"
    );
    backgroundImage.classList.add("rainBackground");
  } else if (weatherMain === "Snow") {
    backgroundImage.classList.remove(
      "fogBackground",
      "sunnyBackground",
      "fewCloudsBackground"
    );
    backgroundImage.classList.add("snowBackground");
  } else if (
    weatherId === 701 ||
    weatherId === 711 ||
    weatherId === 721 ||
    weatherId === 731 ||
    weatherId === 741 ||
    weatherId === 751 ||
    weatherId === 761 ||
    weatherId === 762 ||
    weatherId === 771 ||
    weatherId === 781
  ) {
    backgroundImage.classList.remove("sunnyBackground", "fewCloudsBackground");
    backgroundImage.classList.add("fogBackground");
  } else if (weatherMain === "Clear") {
    backgroundImage.classList.remove("fewCloudsBackground");
    backgroundImage.classList.add("sunnyBackground");
  } else {
    backgroundImage.classList.add("fewCloudsBackground");
  }
}

function showCurrentIcon(response) {
  let weatherId = response.data.weather[0].id;
  let weatherMain = response.data.weather[0].main;
  let weatherDescription = response.data.weather[0].description;
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute("alt", `${weatherDescription}`);

  if (weatherMain === "Thunderstorm") {
    currentIcon.setAttribute("src", "images/thunder.png");
  } else if (weatherMain === "Snow" || weatherDescription === "freezing rain") {
    currentIcon.setAttribute("src", "images/ice.png");
  } else if (weatherMain === "Drizzle" || weatherMain === "Rain") {
    currentIcon.setAttribute("src", "images/umbrella.png");
  } else if (weatherId === 801) {
    currentIcon.setAttribute("src", "images/partialsun.png");
  } else if (weatherId === 802) {
    currentIcon.setAttribute("src", "images/cloud.png");
  } else if (weatherId === 803 || weatherId === 804) {
    currentIcon.setAttribute("src", "images/cloudy.png");
  } else if (weatherMain === "Clear") {
    currentIcon.setAttribute("src", "images/sun.png");
  } else if (
    weatherId === 701 ||
    weatherId === 711 ||
    weatherId === 721 ||
    weatherId === 731 ||
    weatherId === 741 ||
    weatherId === 751 ||
    weatherId === 761 ||
    weatherId === 762 ||
    weatherId === 771 ||
    weatherId === 781
  ) {
    currentIcon.setAttribute("src", "images/fog.png");
  }
}

function showCurrentStats(response) {
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let feelTemp = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${windSpeed} km/h`;
  document.querySelector("#feels-like").innerHTML = `${feelTemp}°C`;
}

function showQuote(response) {
  let weatherType = response.data.weather[0].description;
  document.querySelector("#weather-type").innerHTML = weatherType;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector(`#temp-now`).innerHTML = `${temperature}°C`;
}

function showCity(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
}

function showWeather(response) {
  showCity(response);
  showTemperature(response);
  showQuote(response);
  showCurrentStats(response);
  showCurrentIcon(response);
  showBackground(response);
}

function showForecast(response) {
  console.log(response.data);
}

function callWeatherApi(city) {
  let apiKey = "1192a0652f0754927fef474420498ea7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(forecastURL).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  callWeatherApi(city);
}
function getPositionWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1192a0652f0754927fef474420498ea7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  alert("Let's look at the weather for your current location!");
  navigator.geolocation.getCurrentPosition(getPositionWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showCelsius(event) {
  event.preventDefault();
  let celsiusButton = document.querySelector("#celsius-button");
  document.querySelector("#celsius-button").removeAttribute("id");
  celsiusButton.id = "fahrenheit-button";
  celsiusButton.innerHTML = `Show Fahrenheit`;
  alert("Showing you celsius!");
}

function listentoCelsius() {
  let celsiusButton = document.querySelector("#celsius-button");
  celsiusButton.addEventListener("click", showCelsius);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitButton = document.querySelector("#fahrenheit-button");
  document.querySelector("#fahrenheit-button").removeAttribute("id");
  fahrenheitButton.id = "celsius-button";
  fahrenheitButton.innerHTML = `Show Celsius`;
  alert("Showing you fahrenheit!");
  listentoCelsius();
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", showFahrenheit);

callWeatherApi("Amsterdam");
