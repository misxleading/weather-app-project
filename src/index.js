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
  return `Updated: ${currentDay} ${date}, ${currentMonth}, ${hour}:${minute}`;
} // function for forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="card">
    <p class="card-date">Thu 00</p>
    <img
      class="card-img-top icons"
      src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/325/cloud-with-lightning-and-rain_26c8-fe0f.png"
      alt=""
    />
    <div class="card-body">
      <h5 class="card-temp">00°C</h5>
    </div>
  </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// function for getting api forecast
function getForecastApi(coordinates) {
  let apiKey = "019d56ca36b2672fd8b69d369f52f303";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// current position weather( heading - temp - description)
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "019d56ca36b2672fd8b69d369f52f303";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// typed city weather( heading - temp - description)
function showWeather(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  let temp = Math.round(celsiusTemperature);
  let selectedCityTemp = document.querySelector("#temp");
  selectedCityTemp.innerHTML = `${temp}`;

  let forecastDescription = document.querySelector(".description");
  forecastDescription.innerHTML = `${response.data.weather[0].main}`;

  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let highestTemp = Math.round(response.data.main.temp_max);
  let highElement = document.querySelector("#high");
  highElement.innerHTML = `${highestTemp}°C`;

  let lowestTemp = Math.round(response.data.main.temp_min);
  let lowElement = document.querySelector("#low");
  lowElement.innerHTML = `${lowestTemp}°C`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}km/h`;

  let rain = Math.round(response.data.main.humidity);
  let rainElement = document.querySelector("#rain");
  rainElement.innerHTML = `${rain}%`;

  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = new Date(
    response.data.sys.sunrise * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = new Date(
    response.data.sys.sunset * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  let iconElement = document.querySelector(".icon");
  let iconText = response.data.weather[0].icon;
  iconElement.setAttribute("alt", response.data.weather[0].description);

  if (iconText === "01d" || iconText === "01n") {
    iconElement.setAttribute(
      "src",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/325/sun_2600-fe0f.png"
    );
  }
  if (iconText === "02d" || iconText === "02n") {
    iconElement.setAttribute(
      "src",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/325/sun-behind-cloud_26c5.png"
    );
  }
  if (iconText === "03d" || iconText === "03n") {
    iconElement.setAttribute(
      "src",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/325/sun-behind-large-cloud_1f325-fe0f.png"
    );
  }
  if (iconText === "04d" || iconText === "04n") {
    iconElement.setAttribute(
      "src",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/325/cloud_2601-fe0f.png"
    );
  }
  if (iconText === "09d" || iconText === "09n") {
    iconElement.setAttribute(
      "src",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/325/sun-behind-rain-cloud_1f326-fe0f.png"
    );
  }
  if (iconText === "10d" || iconText === "10n") {
    iconElement.setAttribute(
      "src",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/325/cloud-with-rain_1f327-fe0f.png"
    );
  }
  if (iconText === "11d" || iconText === "11n") {
    iconElement.setAttribute(
      "src",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/325/cloud-with-lightning-and-rain_26c8-fe0f.png"
    );
  }
  if (iconText === "13d" || iconText === "13n") {
    iconElement.setAttribute(
      "src",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/325/cloud-with-snow_1f328-fe0f.png"
    );
  }
  if (iconText === "50d" || iconText === "50n") {
    iconElement.setAttribute(
      "src",
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/325/fog_1f32b-fe0f.png"
    );
  }

  getForecastApi(response.data.coord);
}

function submitSearching(event) {
  event.preventDefault();
  let apiKeyType = "019d56ca36b2672fd8b69d369f52f303";
  let typedCity = document.querySelector("#city-input").value;
  let urlTyped = `https://api.openweathermap.org/data/2.5/weather?q=${typedCity}&appid=${apiKeyType}&units=metric`;
  axios.get(`${urlTyped}`).then(showWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", submitSearching);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentButton = document.querySelector("button");
currentButton.addEventListener("click", getPosition);
