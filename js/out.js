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


document.addEventListener('DOMContentLoaded', function () {

    var btnShow = $("#show");
    var btnCheck = $("#check");
    var info = $("#info");
    var coordinates = $("#coordinates");

    var latit = 50.25841;
    var long = 19.02754;

    var apiUrlCity = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=85f6fd69d859ba5ae84d901b8290ea31";

    var apiUrlCoords = "https://api.openweathermap.org/data/2.5/weather?lat=" + latit + "&lon=" + long + "&APPID=85f6fd69d859ba5ae84d901b8290ea31";

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
        $("#cityImage").html("<img src=" + response.hits[Math.floor(Math.random() * response.hits.length)].webformatURL + "/>");
        $("#cityName").val('');
    };

    btnShow.on('click', getCityImage);

    var getLocation = function getLocation() {
        var geo = navigator.geolocation;
        var info = $("#info");
        if (geo) {
            info.html = "Please wait a moment";
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
        console.log(latit);
        console.log(long);
        btnCheck.disabled = false;
        console.log('Pobrano');
        getWeather();
    };

    btnCheck.on('click', getLocation);

    var getWeather = function getWeather() {
        var cityName = $("#cityName").val();
        var urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + latit + "&lon=" + long + "&APPID=85f6fd69d859ba5ae84d901b8290ea31";
        console.log(cityName);

        if (cityName) {
            console.log('IN');
            urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=85f6fd69d859ba5ae84d901b8290ea31";

            // textElem.value = '';
        }
        $.ajax({
            url: urlWeather
        }).done(function (response2) {
            console.log(response2);
            loadWeather(response2);
        }).fail(function (error) {
            console.log("Sorry");
        });
    };

    var loadWeather = function loadWeather(response2) {
        $("#description").html("" + response2.weather[0].description);
    };

    btnShow.on('click', getWeather);

    getWeather();
});

/***/ })
/******/ ]);