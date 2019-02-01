


$("#SubmitButton").on("click", function (event) {

    event.preventDefault();

    var zip = $("#zipcode").val().trim();
    console.log(zip);

    var animal = $("#animal").val().trim();
    console.log(animal);

    //API for goodle maps
    $("#map").attr("src", "https://www.google.com/maps/embed/v1/place?q=animal%20shelter%20" + zip + "&key=AIzaSyCbj3jXpi6I_ufHHhKwvq0xTB8VpzK1g6I");

    //API for PETFINDER
    // var url = ("https://api.petfinder.com/pet.find?key=e1f0be0034d8cc774bc8b9da4206ab27&location=" + zip + "&animal=" +animal+ "&output=full&format=json");

    //API for PETFINDER
    var url = ("https://api.petfinder.com/pet.find?key=e1f0be0034d8cc774bc8b9da4206ab27&location=" + zip + "&animal=" + animal + "&output=full&format=json");

    console.log(url);
    $(document).ready(function () {

        $.ajax({
            type: "GET",
            data: {},
            url: url + "&callback=?",
            dataType: "json",
            success: function (data) {
                // stores result
                //var result = "";

                var petfinder = data.petfinder.pets.pet;
                //  var petfinder = data.petfinder.pets;


                for (var i = 0; i < petfinder.length; i++) {
                    //console.log("petfinder.length: "  + petfinder[i].length);

                    console.log(petfinder);
                    var infoHTMLPic = "<ol>";
                    var infoHTMLDesc = "<ol style='display:none' id='funfun_" + [i] + "' class='desc'>";
                    infoHTMLDesc += "<img id='petPics' class='img-" + [i] + "'>";

                    //infoHTMLPic += "<li>";
                    //add img-# class to all images 
                    infoHTMLDesc += petfinder[i].breeds.breed["$t"];
                    //infoHTMLPic += "<strong>pic</strong><br>";

                    //hover pic to this 
                    infoHTMLPic += "<div class='container1' style='height:50px width:50px center' >";
                    infoHTMLPic += "<img id='petPics_" + [i] + "' alt='Avatar' class='image img-" + [i] + "' src='" + petfinder[i].media.photos.photo[2].$t + "' >";
                    infoHTMLPic += '<div class="overlay"><div class="text">Hello World</div></div>';


                    infoHTMLPic += "</div>";

                    infoHTMLDesc += '<br><strong>ZipCode</strong><br>';
                    infoHTMLDesc += petfinder[i].contact.zip["$t"];

                    //infoHTMLDesc += "<li>";
                    infoHTMLDesc += "<br><strong>ShelterID</strong><br>";

                    //add ShelterID to li
                    // infoHTMLDesc += "<li>";
                    infoHTMLDesc += petfinder[i].shelterId["$t"];


                    //infoHTMLPic += '<strong>pic</strong><br><img src="';

                    //add photo to li and ["2"] = X-large picture
                    infoHTMLDesc += petfinder[i].description["$t"];

                    infoHTMLDesc += '</li>';
                    infoHTMLDesc += "</ol>";

                    //petfinder.[i].description
                    // return info HTML to #petfinderInfo ;

                    $("#petfinderInfo").append(infoHTMLPic);
                    $("#petfinderInfo1").append(infoHTMLDesc);


                    // '<div class="overlay"><div class="text">Hello World</div></div>'

                }



                $(document).ready(function () {
                    $("#petfinderInfo").lightSlider({
                        item: 3,
                        autoWidth: true,
                        loop: true,
                        onSliderLoad: function(){
                            $('#autoWidth').removeClass('cS-hidden');
                        },
                        
                        slideMove: 1, // slidemove will be 1 if loop is true
                        slideMargin: 10,

                        addClass: '',
                        mode: "slide",
                        useCSS: true,
                        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
                        easing: 'linear', //'for jquery animation',////

                        speed: 400, //ms'
                        auto: false,
                        loop: false,
                        slideEndAnimation: true,
                        pause: 2000,

                        keyPress: false,
                        controls: true,
                        prevHtml: '',
                        nextHtml: '',

                        rtl: false,
                        adaptiveHeight: false,

                        vertical: false,
                        verticalHeight: 500,
                        vThumbWidth: 100,

                        thumbItem: 10,
                        pager: true,
                        gallery: false,
                        galleryMargin: 5,
                        thumbMargin: 5,
                        currentPagerPosition: 'middle',

                        enableTouch: true,
                        enableDrag: true,
                        freeMove: true,
                        swipeThreshold: 40,

                        responsive: [],

                        onBeforeStart: function (el) { },
                        onSliderLoad: function (el) { },
                        onBeforeSlide: function (el) { },
                        onAfterSlide: function (el) { },
                        onBeforeNextSlide: function (el) { },
                        onBeforePrevSlide: function (el) { }
                    });
                });

            },

            // when API request returns with errors throw alerts  
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    })

});

$(document).ready(function () {
    $('#petfinderInfo').on('click', ".container1", function (e) {

        // hide all the descriptions first
        $('.desc').hide();

        if (!e.currentTarget.firstElementChild) return;

        var sourceElementId = e.currentTarget.firstElementChild.id;
        if (!sourceElementId) return;

        var slicedId = sourceElementId.split("_")[1];

        // find the corresponding description
        var targetElementId = "#funfun_" + slicedId;
        $(targetElementId).show();
        console.log("Clicked!");

    });
});
// Geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
    }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
    });
} else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}