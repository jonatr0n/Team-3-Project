$("#SubmitButton").on("click", function (event) {


    event.preventDefault();

    var zip = $("#zipcode").val().trim();
    console.log(zip);

    $("#map").attr("src", "https://www.google.com/maps/embed/v1/place?q=animal%20shelter%20"+zip+"&key=AIzaSyCbj3jXpi6I_ufHHhKwvq0xTB8VpzK1g6I")

    var url = ("http://api.petfinder.com/pet.getRandom?key=e1f0be0034d8cc774bc8b9da4206ab27&location=" + zip + "&output=full&format=json");

    $.ajax({
        type: "GET",
        data: {},
        url: url + "&callback=?",
        dataType: "json",
        success: function (data) {
            // stores result
            //var result = "";

            var petfinder = data.petfinder;
            var infoHTML = "<ul>";

            infoHTML += "<li>";
            infoHTML += "<strong>ZipCode</strong><br>";
            //add photo to ZipCode
            infoHTML += petfinder.pet.contact.zip["$t"];
            // console.log(infoHTML);

            infoHTML += "<li>";
            infoHTML += "<strong>ShelterID</strong><br>";
            //add ShelterID to li
            infoHTML += petfinder.pet.shelterId["$t"];

            infoHTML += "<li>";
            infoHTML += '<strong>pic</strong><br><img src="';
            //add photo to li and ["2"] = X-large picture
            infoHTML += petfinder.pet.media.photos.photo["2"].$t;
            infoHTML += '"</li>';

            infoHTML += "</ul>";
            // return info HTML to #petfinderInfo ;
            // console.log(petfinder);
            // console.log(infoHTML);
            $("#petfinderInfo").html(infoHTML);
        },

        // when API request returns with errors throw alerts  
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
})


//Firebase connection 
var config = {
    apiKey: "AIzaSyCMZTfU_JsxH2_4e3WbjjEjagfOvNV3EHc",
    authDomain: "team-3-project-1548374565657.firebaseapp.com",
    databaseURL: "https://team-3-project-1548374565657.firebaseio.com",
    projectId: "team-3-project-1548374565657",
    storageBucket: "team-3-project-1548374565657.appspot.com",
    messagingSenderId: "1073244498652"
};
firebase.initializeApp(config);

var database = firebase.database();
console.log(database);
