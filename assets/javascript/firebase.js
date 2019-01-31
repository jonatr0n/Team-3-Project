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
console.log("Firebase Called");



