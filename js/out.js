/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(function () {

    var btnShow = $("#show");
    var btnCheck = $("#check");
    var coordinates = $("#coordinates");
    var weatherImg = $("img").first();
    var cityImg = $("img").last();
    var humidity = $("#humidity");
    var pressure = $("#pressure");
    var wind = $("#wind");

    //========set Katowice as a default city========
    var latit = 50.25841;
    var long = 19.02754;
    var cityName = $("#cityName").val("Katowice");

    var apiCity = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=85f6fd69d859ba5ae84d901b8290ea31";
    var apiCoords = "https://api.openweathermap.org/data/2.5/weather?lat=" + latit + "&lon=" + long + "&APPID=85f6fd69d859ba5ae84d901b8290ea31";

    //========IMAGE OF A CITY========
    var getCityImage = function getCityImage() {

        var cityName = $("#cityName").val();
        var imageUrl = "https://pixabay.com/api/?key=7194261-cb5353e414e4d782b7a39e798&q=" + cityName + "&image_type=photo";

        $.ajax({
            url: imageUrl
        }).done(function (response) {
            randomImage(response);
        }).fail(function (error) {
            console.log("Sorry but we don't have your city in our database");
        });
    };

    var randomImage = function randomImage(response) {
        cityImg.attr('src', "" + response.hits[Math.floor(Math.random() * response.hits.length)].webformatURL);
        $("#cityName").val('');
    };

    btnShow.on('click', getCityImage);
    btnCheck.on('click', getCityImage);

    //========GET THE CURRENT LOCATION========
    var getLocation = function getLocation() {
        var geo = navigator.geolocation;
        var location = $("#location");
        if (geo) {
            location.html = "Please wait a moment";
            btnCheck.disabled = true;
            console.log('Pobieranie lokalizacji');
            geo.getCurrentPosition(showPosition);
        } else {
            coordinates.html = "Geolocation isn't supported by your browser.";
        }
    };

    var showPosition = function showPosition(position) {
        latit = position.coords.latitude;
        long = position.coords.longitude;
        btnCheck.disabled = false;
        console.log('Pobrano lokalizację');
        getWeather();
    };

    btnCheck.on('click', getLocation);

    //========LOAD WEATHER========
    var getWeather = function getWeather() {
        var cityName = $("#cityName").val();
        var urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + latit + "&lon=" + long + "&APPID=85f6fd69d859ba5ae84d901b8290ea31";

        if (cityName) {
            urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=85f6fd69d859ba5ae84d901b8290ea31";
        }
        $.ajax({
            url: urlWeather
        }).done(function (data) {
            console.log(data);
            loadWeather(data);
        }).fail(function (error) {
            alert("Please enter only letters without Polish characters");
        });
    };

    var loadWeather = function loadWeather(data) {
        $("#headerCity").html("" + data.name);
        coordinates.html("(lat: " + data.coord.lat.toFixed(2) + ", lon:" + data.coord.lon.toFixed(2) + ")");

        $("#description").html("" + data.weather[0].description);
        var srcIcon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        weatherImg.attr('src', "" + srcIcon);
        $("#temperature").html((data.main.temp - 273).toFixed(0) + "&#8451");
        humidity.html("Humidity: " + data.main.humidity + "%");
        pressure.html("Pressure: " + data.main.pressure + "hPa");
        wind.html("Wind: " + data.wind.speed + " km/h");
    };
    btnShow.on('click', getWeather);
    btnCheck.on('click', getWeather);

    //========LAUNCHING========
    getWeather();
    getCityImage();
});

/***/ })
/******/ ]);