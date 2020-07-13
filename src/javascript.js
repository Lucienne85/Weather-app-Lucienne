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
  let backgroundImage = document.querySelector("#weather-now");

  if (weatherMain === "Clear") {
    backgroundImage.classList.remove("cloudyBackground");
    backgroundImage.classList.add("sunnyBackground");
  } else {
    backgroundImage.classList.add("cloudyBackground");
  }
}

function showCurrentIcon(response) {
  let weatherId = response.data.weather[0].id;
  let weatherMain = response.data.weather[0].main;
  let weatherDescription = response.data.weather[0].description;

  if (weatherMain === "Thunderstorm") {
    document.querySelector("#current-icon").src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/001/216/original/thunder.png?1592138103";
  } else if (weatherMain === "Snow" || weatherDescription === "freezing rain") {
    document.querySelector("#current-icon").src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/001/220/original/ice.png?1592138257";
  } else if (weatherMain === "Drizzle" || weatherMain === "Rain") {
    document.querySelector("#current-icon").src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/001/215/original/umbrella.png?1592138072";
  } else if (weatherId === 801) {
    document.querySelector("#current-icon").src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/001/213/original/partialsun.png?1592137989";
  } else if (weatherId === 802) {
    document.querySelector("#current-icon").src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/001/439/original/cloud.png?1594068705";
  } else if (weatherId === 803 || weatherId === 804) {
    document.querySelector("#current-icon").src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/001/214/original/cloudy.png?1592138043";
  } else if (weatherMain === "Clear") {
    document.querySelector("#current-icon").src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/001/212/original/sun.png?1592137951";
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
    document.querySelector("#current-icon").src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/001/440/original/fog.png?1594069940";
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
  console.log(response.data);
}

function callWeatherApi(city) {
  let apiKey = "1192a0652f0754927fef474420498ea7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
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

callWeatherApi("Amsterdam");
