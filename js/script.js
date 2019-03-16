let appId = "8df8ecb8bb980d9d83ac3ca6db21e9ac";
let units = "metric"; // other option is imperial
let searchMethod; // q means searching as a string.

function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(res => {
      init(res);
    });
}

function init(resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = "url('./img/clear.jpeg')";
      break;

    case "Clouds":
      document.body.style.backgroundImage = "url('./img/cloudy.jpeg')";
      break;

    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = "url('./img/rain.jpg')";
      break;

    case "Thunderstorm":
      document.body.style.backgroundImage = "url('./img/storm.jpeg')";
      break;

    case "Snow":
      document.body.style.backgroundImage = "url('./img/snow.jpeg')";
      break;

    default:
      break;
  }

  let weatherDescriptionHeader = document.getElementById(
    "weatherDescriptionHeader"
  );
  let temperatureElement = document.getElementById("temperature");
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("windSpeed");
  let cityHeader = document.getElementById("cityHeader");

  let weatherIcon = document.getElementById("documentIconImg");
  weatherIcon.src =
    "http://openweathermap.org/img/w/" +
    resultFromServer.weather[0].icon +
    ".png";

  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  temperatureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + "&#176;";
  windSpeedElement.innerHTML =
    "Winds at  " + Math.floor(resultFromServer.wind.speed) + " m/s";
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML =
    "Humidity levels at " + resultFromServer.main.humidity + "%";

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
  weatherContainer.style.visibility = "visible";
}

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) searchWeather(searchTerm);
});
