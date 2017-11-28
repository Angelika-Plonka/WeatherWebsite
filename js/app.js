document.addEventListener("DOMContentLoaded", function() {


    let btnShow = $("#show");

    let latit = 50.25841;
    let long = 19.02754;

    let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=85f6fd69d859ba5ae84d901b8290ea31`;

    let apiUrlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${long}&APPID=85f6fd69d859ba5ae84d901b8290ea31`;




    function getCityImage() {
        let cityName = $("#cityName").val();
        let imageUrl = `https://pixabay.com/api/?key=7194261-cb5353e414e4d782b7a39e798&q=${cityName}&image_type=photo`;

        $.ajax({
            url: imageUrl
        }).done(function (response) {
            console.log(response)
            console.log(cityName)
            randomImage(response)


        }).fail(function (error) {
            console.log("Sorry but we don't have your city in our database")
        })
    }

    function randomImage(response) {

        $("#cityImage").html("<img src="+response.hits[Math.floor(Math.random() * response.hits.length) ].webformatURL+"/>")
        $("#cityName").val('');
    }

    btnShow.on('click', getCityImage);



});