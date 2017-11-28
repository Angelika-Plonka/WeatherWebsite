document.addEventListener('DOMContentLoaded', () => {

    let btnShow = $("#show");
    let btnCheck = $("#check");
    let info = $("#info");
    let coordinates = $("#coordinates");

    let latit = 50.25841;
    let long = 19.02754;

    let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=85f6fd69d859ba5ae84d901b8290ea31`;

    let apiUrlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${long}&APPID=85f6fd69d859ba5ae84d901b8290ea31`;

//========IMAGE OF A CITY========
    let getCityImage = () => {
        let cityName = $("#cityName").val();
        let imageUrl = `https://pixabay.com/api/?key=7194261-cb5353e414e4d782b7a39e798&q=${cityName}&image_type=photo`;

        $.ajax({
            url: imageUrl
        }).done(function (response) {
            randomImage(response)

        }).fail(function (error) {
            console.log("Sorry but we don't have your city in our database")
        })
    }

    let randomImage = (response) => {
        $("#cityImage").html("<img src="+response.hits[Math.floor(Math.random() * response.hits.length) ].webformatURL+"/>")
        $("#cityName").val('');
    }

    btnShow.on('click', getCityImage);



    let getLocation = () => {
        let geo = navigator.geolocation;
        let info = $("#info");
        if (geo) {
            info.html = "Please wait a moment"
            btnCheck.disabled = true;
            console.log('Pobieranie lokalizacji');
            geo.getCurrentPosition(showPosition);
        } else {
            coordinates.html = "Geolocation isn't supported by your browser.";
        }
    }

    let showPosition = position => {
        latit = position.coords.latitude;
        long = position.coords.longitude;
        console.log(latit);
        console.log(long);
        btnCheck.disabled = false;
        console.log('Pobrano');
        getWeather();
    }

    btnCheck.on('click', getLocation);

    let getWeather = () => {
        let cityName = $("#cityName").val();
        let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${long}&APPID=85f6fd69d859ba5ae84d901b8290ea31`;
        console.log(cityName);

        if (cityName) {
            console.log('IN');
            urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=85f6fd69d859ba5ae84d901b8290ea31`;

            // textElem.value = '';
        }
        $.ajax({
            url: urlWeather
        }).done(function (response2) {
            console.log(response2)
            loadWeather(response2)

        }).fail(function (error) {
            console.log("Sorry")
        })
    }

    let loadWeather = (response2) => {
        $("#description").html(`${response2.weather[0].description}`)
    }

    btnShow.on('click', getWeather);

    getWeather();

});