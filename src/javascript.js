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
      "fewCloudsBackground",
      "brokencloudBackground",
      "scatteredBackground",
      "overcastBackground"
    );
    backgroundImage.classList.add("thunderBackground");
  } else if (weatherMain === "Drizzle") {
    backgroundImage.classList.remove(
      "freezingRainBackground",
      "rainBackground",
      "snowBackground",
      "fogBackground",
      "sunnyBackground",
      "fewCloudsBackground",
      "brokencloudBackground",
      "scatteredBackground",
      "overcastBackground"
    );
    backgroundImage.classList.add("drizzleBackground");
  } else if (weatherId === 511) {
    backgroundImage.classList.remove(
      "rainBackground",
      "snowBackground",
      "fogBackground",
      "sunnyBackground",
      "fewCloudsBackground",
      "brokencloudBackground",
      "scatteredBackground",
      "overcastBackground"
    );
    backgroundImage.classList.add("freezingRainBackground");
  } else if (weatherMain === "Rain") {
    backgroundImage.classList.remove(
      "snowBackground",
      "fogBackground",
      "sunnyBackground",
      "fewCloudsBackground",
      "brokencloudBackground",
      "scatteredBackground",
      "overcastBackground"
    );
    backgroundImage.classList.add("rainBackground");
  } else if (weatherMain === "Snow") {
    backgroundImage.classList.remove(
      "fogBackground",
      "sunnyBackground",
      "fewCloudsBackground",
      "brokencloudBackground",
      "scatteredBackground",
      "overcastBackground"
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
    backgroundImage.classList.remove(
      "sunnyBackground",
      "fewCloudsBackground",
      "brokencloudBackground",
      "scatteredBackground",
      "overcastBackground"
    );
    backgroundImage.classList.add("fogBackground");
  } else if (weatherMain === "Clear") {
    backgroundImage.classList.remove(
      "fewCloudsBackground",
      "brokencloudBackground",
      "scatteredBackground",
      "overcastBackground"
    );
    backgroundImage.classList.add("sunnyBackground");
  } else if (weatherId === 801) {
    backgroundImage.classList.remove(
      "brokencloudBackground",
      "scatteredBackground",
      "overcastBackground"
    );
    backgroundImage.classList.add("fewCloudsBackground");
  } else if (weatherId === 802) {
    backgroundImage.classList.remove(
      "brokencloudBackground",
      "overcastBackground"
    );
    backgroundImage.classList.add("scatteredBackground");
  } else if (weatherId === 803) {
    backgroundImage.classList.remove("overcastBackground");
    backgroundImage.classList.add("brokencloudBackground");
  } else {
    backgroundImage.classList.add("overcastBackground");
  }
}

function determineIcon(weatherMain, weatherDescription, iconId) {
  if (weatherMain === "Thunderstorm") {
    return "images/thunder.png";
  } else if (weatherMain === "Snow" || weatherDescription === "freezing rain") {
    return "images/ice.png";
  } else if (weatherMain === "Drizzle" || weatherMain === "Rain") {
    return "images/umbrella.png";
  } else if (iconId === "02d") {
    return "images/partialsun.png";
  } else if (iconId === "02n") {
    return "images/halfmoon.png";
  } else if (iconId === "03d" || iconId === "03n") {
    return "images/cloud.png";
  } else if (iconId === "04d" || iconId === "04n") {
    return "images/cloudy.png";
  } else if (iconId === "01d") {
    return "images/sun.png";
  } else if (iconId === "01n") {
    return "images/moon.png";
  } else if (iconId === "50d" || iconId === "50n") {
    return "images/fog.png";
  }
}

function showCurrentIcon(response) {
  let weatherMain = response.data.weather[0].main;
  let weatherDescription = response.data.weather[0].description;
  let iconId = response.data.weather[0].icon;
  let currentIcon = document.querySelector("#current-icon");
  let iconSource = determineIcon(weatherMain, weatherDescription, iconId);
  currentIcon.setAttribute("alt", `${weatherDescription}`);
  currentIcon.setAttribute("src", `${iconSource}`);
}

function showCurrentStats(response) {
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  feelsLikeTemp = response.data.main.feels_like;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${windSpeed} km/h`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    feelsLikeTemp
  )}°C`;
}

function showWeatherType(response) {
  let weatherType = response.data.weather[0].description;
  document.querySelector("#weather-type").innerHTML = weatherType;
}

function showTemperature(response) {
  currentCelsiusTemp = response.data.main.temp;
  document.querySelector(`#temp-now`).innerHTML = `${Math.round(
    currentCelsiusTemp
  )}°C`;
  let currentID = document.getElementsByClassName("metricButton")[0].id;
  if (currentID === `celsius-button`) {
    let celsiusButton = document.querySelector("#celsius-button");
    celsiusButton.removeEventListener("click", showCelsius);
    celsiusButton.id = "fahrenheit-button";
    celsiusButton.innerHTML = `Show Fahrenheit`;
    document
      .querySelector("#fahrenheit-button")
      .addEventListener("click", showFahrenheit);
  }
}

function showCity(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
}

function showWeather(response) {
  showCity(response);
  showTemperature(response);
  showWeatherType(response);
  showCurrentStats(response);
  showCurrentIcon(response);
  showBackground(response);
  console.log(response.data.weather[0].icon);
}

function showNextHour(response) {
  nextHourMinTemp = response.data.list[0].main.temp_min;
  nextHourMaxTemp = response.data.list[0].main.temp_max;
  let weatherDescription = response.data.list[0].weather[0].description;
  document.querySelector("#next-hour-temp").innerHTML = `${Math.round(
    nextHourMinTemp
  )}°C - ${Math.round(nextHourMaxTemp)}°C`;
  let nextHourIcon = document.querySelector("#next-hour-icon");
  let iconSource = determineIcon(
    response.data.list[0].weather[0].main,
    response.data.list[0].weather[0].description,
    response.data.list[0].weather[0].icon
  );
  nextHourIcon.setAttribute("src", `${iconSource}`);
  nextHourIcon.setAttribute("alt", `${weatherDescription}`);
}
function showThreeHour(response) {
  threeHourMinTemp = response.data.list[1].main.temp_min;
  threeHourMaxTemp = response.data.list[1].main.temp_max;
  let weatherDescription = response.data.list[1].weather[0].description;
  document.querySelector("#three-hour-temp").innerHTML = `${Math.round(
    threeHourMinTemp
  )}°C - ${Math.round(threeHourMaxTemp)}°C`;
  let threeHourIcon = document.querySelector("#three-hour-icon");
  let iconSource = determineIcon(
    response.data.list[1].weather[0].main,
    response.data.list[1].weather[0].description,
    response.data.list[1].weather[0].icon
  );
  threeHourIcon.setAttribute("src", `${iconSource}`);
  threeHourIcon.setAttribute("alt", `${weatherDescription}`);
}

function showSixHour(response) {
  sixHourMinTemp = response.data.list[2].main.temp_min;
  sixHourMaxTemp = response.data.list[2].main.temp_max;
  let weatherDescription = response.data.list[2].weather[0].description;
  document.querySelector("#six-hour-temp").innerHTML = `${Math.round(
    sixHourMinTemp
  )}°C - ${Math.round(sixHourMaxTemp)}°C`;
  let sixHourIcon = document.querySelector("#six-hour-icon");
  let iconSource = determineIcon(
    response.data.list[2].weather[0].main,
    response.data.list[2].weather[0].description,
    response.data.list[2].weather[0].icon
  );
  sixHourIcon.setAttribute("src", `${iconSource}`);
  sixHourIcon.setAttribute("alt", `${weatherDescription}`);
}

function showNineHour(response) {
  nineHourMinTemp = response.data.list[3].main.temp_min;
  nineHourMaxTemp = response.data.list[3].main.temp_max;
  let weatherDescription = response.data.list[3].weather[0].description;
  document.querySelector("#nine-hour-temp").innerHTML = `${Math.round(
    nineHourMinTemp
  )}°C - ${Math.round(nineHourMaxTemp)}°C`;
  let nineHourIcon = document.querySelector("#nine-hour-icon");
  let iconSource = determineIcon(
    response.data.list[3].weather[0].main,
    response.data.list[3].weather[0].description,
    response.data.list[3].weather[0].icon
  );
  nineHourIcon.setAttribute("src", `${iconSource}`);
  nineHourIcon.setAttribute("alt", `${weatherDescription}`);
}

function showForecast(response) {
  showNextHour(response);
  showThreeHour(response);
  showSixHour(response);
  showNineHour(response);
}

function callWeatherApi(city) {
  let apiKey = "1192a0652f0754927fef474420498ea7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

  callForecastApi(city);
}

function callForecastApi(city) {
  let apiKey = "1192a0652f0754927fef474420498ea7";
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
  axios.get(apiUrl).then(prepareForecast);
}
function prepareForecast(response) {
  let city = response.data.name;
  callForecastApi(city);
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
  celsiusButton.removeEventListener("click", showCelsius);
  celsiusButton.id = "fahrenheit-button";
  celsiusButton.innerHTML = `Show Fahrenheit`;
  document.querySelector("#temp-now").innerHTML = `${Math.round(
    currentCelsiusTemp
  )}°C`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    feelsLikeTemp
  )}°C`;
  document.querySelector("#next-hour-temp").innerHTML = `${Math.round(
    nextHourMinTemp
  )}°C - ${Math.round(nextHourMaxTemp)}°C`;
  document.querySelector("#three-hour-temp").innerHTML = `${Math.round(
    threeHourMinTemp
  )}°C - ${Math.round(threeHourMaxTemp)}°C`;
  document.querySelector("#six-hour-temp").innerHTML = `${Math.round(
    sixHourMinTemp
  )}°C - ${Math.round(sixHourMaxTemp)}°C`;
  document.querySelector("#nine-hour-temp").innerHTML = `${Math.round(
    nineHourMinTemp
  )}°C - ${Math.round(nineHourMaxTemp)}°C`;
  document
    .querySelector("#fahrenheit-button")
    .addEventListener("click", showFahrenheit);
}

function showFahrenheit(event) {
  event.preventDefault();
  fahrenheitButton.removeEventListener("click", showFahrenheit);
  fahrenheitButton.id = "celsius-button";
  fahrenheitButton.innerHTML = `Show Celsius`;
  let currentFahrenheitTemp = Math.round(currentCelsiusTemp * 1.8 + 32);
  let feelsLikeFahrenheitTemp = Math.round(feelsLikeTemp * 1.8 + 32);
  let nextHourMinFahrenheitTemp = Math.round(nextHourMinTemp * 1.8 + 32);
  let nextHourMaxFahrenheitTemp = Math.round(nextHourMaxTemp * 1.8 + 32);
  let threeHourMinFahrenheitTemp = Math.round(threeHourMinTemp * 1.8 + 32);
  let threeHourMaxFahrenheitTemp = Math.round(threeHourMaxTemp * 1.8 + 32);
  let sixHourMinFahrenheitTemp = Math.round(sixHourMinTemp * 1.8 + 32);
  let sixHourMaxFahrenheitTemp = Math.round(sixHourMaxTemp * 1.8 + 32);
  let nineHourMinFahrenheitTemp = Math.round(nineHourMinTemp * 1.8 + 32);
  let nineHourMaxFahrenheitTemp = Math.round(nineHourMaxTemp * 1.8 + 32);
  document.querySelector("#temp-now").innerHTML = `${currentFahrenheitTemp}°F`;
  document.querySelector(
    "#feels-like"
  ).innerHTML = `${feelsLikeFahrenheitTemp}°F`;
  document.querySelector(
    "#next-hour-temp"
  ).innerHTML = `${nextHourMinFahrenheitTemp}°F - ${nextHourMaxFahrenheitTemp}°F`;
  document.querySelector(
    "#three-hour-temp"
  ).innerHTML = `${threeHourMinFahrenheitTemp}°F - ${threeHourMaxFahrenheitTemp}°F`;
  document.querySelector(
    "#six-hour-temp"
  ).innerHTML = `${sixHourMinFahrenheitTemp}°F - ${sixHourMaxFahrenheitTemp}°F`;
  document.querySelector(
    "#nine-hour-temp"
  ).innerHTML = `${nineHourMinFahrenheitTemp}°F - ${nineHourMaxFahrenheitTemp}°F`;
  document
    .querySelector("#celsius-button")
    .addEventListener("click", showCelsius);
}

let currentCelsiusTemp = null;
let feelsLikeTemp = null;
let nextHourMinTemp = null;
let nextHourMaxtemp = null;
let threeHourMinTemp = null;
let threeHourMaxTemp = null;
let sixHourMinTemp = null;
let sixHourMaxTemp = null;
let nineHourMinTemp = null;
let nineHourMaxTemp = null;

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", showFahrenheit);

callWeatherApi("Amsterdam");
