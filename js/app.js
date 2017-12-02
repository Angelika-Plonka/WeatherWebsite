
// Default
$(function(){
    //Default vars and default load
    let latit = 50.25841;
    let long = 19.02754;
    getWeatherDataAndFillView(latit,long,'Katowice');
});

checkIfCityNameCorrect = cityName => {
    return cityName !== undefined && cityName.length !== 0;
}

getWeatherDataAndFillView = (latit,long,cityName) => {
    let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${long}&APPID=85f6fd69d859ba5ae84d901b8290ea31`;

    if (checkIfCityNameCorrect(cityName)) {
        urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=85f6fd69d859ba5ae84d901b8290ea31`;
    }

    $.ajax({
        url: urlWeather
    }).done(function (data) {
        console.log(data);
        displayWeatherData(data);
        getCityImage(data.name);
    }).fail(function (error) {
        alert("Please enter city name without Polish characters");
    });
}

displayWeatherData = data => {
    $("#headerCity").html(data.name);
    $("#temperature").html(countTemp(data.main.temp));
    $("#description").html(data.weather[0].description);
    $("#coordinates").html(generateCoordinatesHTML(data));
    $("#humidity").html(`Humidity: ${data.main.humidity}%`);
    $("#pressure").html(`Pressure: ${data.main.pressure}hPa`);
    $("#wind").html(`Wind: ${data.wind.speed} km/h`);
    updateWeather(data);
}


countTemp= temp => {
    let temper = (temp - 273).toFixed(0);
    return temper + "&#8451";
}

generateCoordinatesHTML= data => `(lat: ${data.coord.lat.toFixed(2)}, lon:${data.coord.lon.toFixed(2)})`;

updateWeather = data => {
    let srcIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    $("#weatherImg").attr('src', srcIcon);
}


// Other functionalities
getLocation = () => {
    let geo = navigator.geolocation;
    let location = $("#location");
    if (geo !== undefined) {
        location.html = "Please wait a moment";
        console.log('Pobieranie lokalizacji');
        geo.getCurrentPosition(showPosition);
    } else {
        $("#coordinates").html = "Geolocation isn't supported by your browser.";
    }
}

getCityImage = cityName => {
    let imageUrl = `https://pixabay.com/api/?key=7194261-cb5353e414e4d782b7a39e798&q=${cityName}&image_type=photo`;

    $.ajax({
        url: imageUrl
    }).done(function (response) {
        $("#cityImage").attr('src', `${response.hits[Math.floor(Math.random() * response.hits.length) ].webformatURL}`);
    }).fail(function (error) {
        console.log("Sorry but we don't have your city in our database");
    });
}

getCityByName = () => {
    let cityName = $("#cityName").val();
    getCityImage(cityName);
    getLocation();
}

let showPosition = position => {
    let cityName = $("#cityName").val();
    let latit = position.coords.latitude;
    let long = position.coords.longitude;
    getWeatherDataAndFillView(latit,long,cityName);
    console.log('Pobrano lokalizację');
    $("#cityName").val('');
};

check = () =>{
    getLocation();
}