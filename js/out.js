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


// Default
$(function () {
    //Default vars and default load
    var latit = 50.25841;
    var long = 19.02754;
    getWeatherDataAndFillView(latit, long, 'Katowice');
});

checkIfCityNameCorrect = function checkIfCityNameCorrect(cityName) {
    return cityName !== undefined && cityName.length !== 0;
};

getWeatherDataAndFillView = function getWeatherDataAndFillView(latit, long, cityName) {
    var urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + latit + "&lon=" + long + "&APPID=85f6fd69d859ba5ae84d901b8290ea31";

    if (checkIfCityNameCorrect(cityName)) {
        urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=85f6fd69d859ba5ae84d901b8290ea31";
    }

    $.ajax({
        url: urlWeather
    }).done(function (data) {
        console.log(data);
        displayWeatherData(data);
        getCityImage(data.name);
    }).fail(function (error) {
        alert("Please enter only letters without Polish characters");
    });
};

displayWeatherData = function displayWeatherData(data) {
    $("#headerCity").html(data.name);
    $("#temperature").html(countTemp(data.main.temp));
    $("#description").html(data.weather[0].description);
    $("#coordinates").html(generateCoordinatesHTML(data));
    $("#humidity").html("Humidity: " + data.main.humidity + "%");
    $("#pressure").html("Pressure: " + data.main.pressure + "hPa");
    $("#wind").html("Wind: " + data.wind.speed + " km/h");
    updateWeather(data);
};

countTemp = function countTemp(temp) {
    var temper = (temp - 273).toFixed(0);
    return temper + "&#8451";
};

generateCoordinatesHTML = function generateCoordinatesHTML(data) {
    return "(lat: " + data.coord.lat.toFixed(2) + ", lon:" + data.coord.lon.toFixed(2) + ")";
};

updateWeather = function updateWeather(data) {
    var srcIcon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    $("#weatherImg").attr('src', srcIcon);
};

// Other functionalities
getLocation = function getLocation() {
    var geo = navigator.geolocation;
    var location = $("#location");
    if (geo !== undefined) {
        location.html = "Please wait a moment";
        console.log('Pobieranie lokalizacji');
        geo.getCurrentPosition(showPosition);
    } else {
        $("#coordinates").html = "Geolocation isn't supported by your browser.";
    }
};

getCityImage = function getCityImage(cityName) {
    var imageUrl = "https://pixabay.com/api/?key=7194261-cb5353e414e4d782b7a39e798&q=" + cityName + "&image_type=photo";

    $.ajax({
        url: imageUrl
    }).done(function (response) {
        $("#cityImage").attr('src', "" + response.hits[Math.floor(Math.random() * response.hits.length)].webformatURL);
    }).fail(function (error) {
        console.log("Sorry but we don't have your city in our database");
    });
};

getCityByName = function getCityByName() {
    var cityName = $("#cityName").val();
    getCityImage(cityName);
    getLocation();
};

var showPosition = function showPosition(position) {
    var cityName = $("#cityName").val();
    var latit = position.coords.latitude;
    var long = position.coords.longitude;
    getWeatherDataAndFillView(latit, long, cityName);
    console.log('Pobrano lokalizację');
    $("#cityName").val('');
};

check = function check() {
    getLocation();
};

/***/ })
/******/ ]);