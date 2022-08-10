function getWeatherData(city) {
    var url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&APPID=dbd3b02d8958d62185d02e944cd5f522";

    //ajax call to get weather data
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function (data) {
        //get weather data
        var weatherData = data.weather[0].description;
        weatherData = weatherData.toUpperCase();
        var weatherIcon = data.weather[0].icon;
        var weatherIconUrl =
          "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        var weatherTemp = data.main.temp;
        var weatherTempF = (weatherTemp * (9 / 5) - 459.67).toFixed(2);
        var weatherTempC = (weatherTemp - 273.15).toFixed(2);
        var weatherCity = data.name;
        var weatherCountry = data.sys.country;
        var weatherHumidity = data.main.humidity;
        var weatherWindSpeed = data.wind.speed;
        var weatherWindDeg = data.wind.deg;
        var weatherSunrise = data.sys.sunrise;
        var weatherSunset = data.sys.sunset;
        var weatherTimezone = data.timezone;
        //Formatting TimeZone for Display
        var timezone = weatherTimezone / 3600;
        var timezoneHours = Math.floor(timezone);
        var timezoneMinutes = Math.round((timezone - timezoneHours) * 60);
        var timezoneString = timezoneHours + ":" + timezoneMinutes + " UTC";

        weatherSunrise = new Date(weatherSunrise * 1000);
        weatherSunset = new Date(weatherSunset * 1000);
        //get only sunset time there with Am and Pm
        weatherSunset = weatherSunset.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        //get only sunrise time there with Am and Pm
        weatherSunrise = weatherSunrise.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        var weatherDate = new Date(weatherTimezone * 1000);
        var weatherDateFormatted = weatherDate.toLocaleString();

        var weatherDateFormatted = weatherDateFormatted.split(" ");
        var weatherDateFormatted =
          weatherDateFormatted[0] +
          " " +
          weatherDateFormatted[1] +
          " " +
          weatherDateFormatted[2] +
          " " +
          weatherDateFormatted[3];

        //display weather data
        $("#weather-data").html(
          "<br><h3>Weather in " +
            weatherCity +
            ", " +
            weatherCountry +
            "</h3><br><img src='" +
            weatherIconUrl +
            "'><br><h4 class='Dataclass'>" +
            "&nbsp&nbsp" +
            weatherData +
            "&nbsp&nbsp" +
            "</h4><br><h4>Temperature: " +
            weatherTempF +
            "°F / " +
            weatherTempC +
            "°C</h4><br><h4>Humidity: " +
            weatherHumidity +
            "%</h4><br><h4>Wind: " +
            weatherWindSpeed +
            " mph " +
            "</h4><br><h4>Sunrise: " +
            weatherSunrise +
            "</h4><br><h4>Sunset: " +
            weatherSunset +
            "</h4><br><h4>Timezone: " +
            timezoneString +
            "<br><br><br>"
        );
      },
    });
  }
  var city = prompt("Enter a city");
  if (city != null) {
    getWeatherData(city);
  } else {
    alert("Please enter a city");
    city = prompt("Enter a city");
    if (city != null) {
      getWeatherData(city);
    }
  }