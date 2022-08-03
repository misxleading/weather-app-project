//Celsius or Farenheit
function celsiusTemp(event) {
  event.preventDefault();
  let newFarenheit = document.querySelector("#temp");
  newFarenheit.innerHTML = `91`;
}
let newFarenheit = document.querySelector("#farenheit");
newFarenheit.addEventListener("click", celsiusTemp);
// current position weather( heading - temp - description)
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "019d56ca36b2672fd8b69d369f52f303";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("button");
currentButton.addEventListener("click", getPosition);

function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let locationCityTemp = document.querySelector("#temp");
  locationCityTemp.innerHTML = `${temperature}`;
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let currentPositionDescription = document.querySelector(".description");
  currentPositionDescription.innerHTML = `${response.data.weather[0].main}`;
  let currentDate = document.querySelector(".date");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}
//new date fuction
function formatDate(timestamp) {
  let now = new Date();
  let day = now.getDay();
  let date = now.getDate();
  let month = now.getMonth();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Suturday",
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
    "December",
  ];

  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  if (hour < 10) {
    hour = `0${hour < 10}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${currentDay} ${date}, ${currentMonth}, ${hour}:${minute}`;
}
// typed city weather( heading - temp - description)
function showWeatherForTypedCity(response) {
  console.log(response.data.name);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let temp = Math.round(response.data.main.temp);
  let selectedCityTemp = document.querySelector("#temp");
  selectedCityTemp.innerHTML = `${temp}`;

  let forecastDescription = document.querySelector(".description");
  forecastDescription.innerHTML = `${response.data.weather[0].main}`;

  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function submitSearching(event) {
  event.preventDefault();
  let apiKeyType = "019d56ca36b2672fd8b69d369f52f303";
  let typedCity = document.querySelector("#city-input").value;
  let urlTyped = `https://api.openweathermap.org/data/2.5/weather?q=${typedCity}&appid=${apiKeyType}&units=metric`;
  axios.get(`${urlTyped}`).then(showWeatherForTypedCity);
}

let form = document.querySelector("form");
form.addEventListener("submit", submitSearching);
