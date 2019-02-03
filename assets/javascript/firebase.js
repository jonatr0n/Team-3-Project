//Firebase connection 
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCOajArTLL111HDGYbETmCJi1s1CH6h4Gs",
    authDomain: "petstuff-67506.firebaseapp.com",
    databaseURL: "https://petstuff-67506.firebaseio.com",
    projectId: "petstuff-67506",
    storageBucket: "petstuff-67506.appspot.com",
    messagingSenderId: "602855780278"
  };
firebase.initializeApp(config);

var database = firebase.database();
console.log("Firebase Called");

//creates variable for functions & database
var database = firebase.database();
var clickCounter = 0;
var userZip = "";
var contactName ="";
var contactEmail ="";
var contactPhone ="";
var animalId = "";


// // Capture Button on click
$("#SubmitButton").on("click", function (event) {
    // // Don't refresh the page!
    event.preventDefault();
    clickCounter++;


   
   

    //grabs the user input zipcode 
    userZip = $("#zipcode").val().trim();
   

    //logs it in the database
    database.ref('/zip').push({
        userZip: userZip,
        clickCount: clickCounter,
        

    });
});

 //capture contact button on click
 $("#contactButton").on("click", function (event) {
    // // Don't refresh the page!
    event.preventDefault();
    console.log("contact button press");

    contactName = $("#userName").val().trim();
    contactEmail = $("#email").val().trim();
    contactPhone = $("#phone").val().trim();
    animalId = $("#animalId").val().trim();

    //logs it in the database
    database.ref(`/contact/${contactName}`).push({

    contactName: contactName,
    contactEmail: contactEmail,
    contactPhone:contactPhone,
    animalId:animalId,
    })
 })


console.log(userZip);
database.ref().on("value", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());

    // clickCounter = snapshot.val().clickCount;
    console.log(snapshot.val());
    console.log(snapshot.val().userZip);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
})

