

    var config = {
        apiKey: "AIzaSyD0PSgbveabCoHQwGtTk9wB61ZzKqFk_go",
        authDomain: "gt-bootcamp-class0814-1.firebaseapp.com",
        databaseURL: "https://gt-bootcamp-class0814-1.firebaseio.com",
        projectId: "gt-bootcamp-class0814-1",
        storageBucket: "gt-bootcamp-class0814-1.appspot.com",
        messagingSenderId: "327717421018"
      };


  
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var trndest = $("#destination-input").val().trim();
  var firsttrn = $("#first-train-input").val().trim();
  //var firsttrn = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
  //var firsttrn = moment($("#first-train-input").val().trim(), "HH:mm");//.format("X");
  var trnfreq = $("#frequency-input").val().trim();

  console.log(firsttrn);
  // Creates local "temporary" object for holding train data
  var newTrn = {
    TrainName: trnName,
    TrainDestination: trndest,
    Firsttrain: firsttrn,
    TrainFrequency: trnfreq
  };

  // Uploads train data to the database
  database.ref().push(newTrn);

  // Logs everything to console
  console.log("following is when adding the training");
  console.log(newTrn.TrainName);
  console.log(newTrn.TrainDestination);
  console.log(newTrn.Firsttrain);
  console.log(newTrn.TrainFrequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-inpu").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().TrainName;
  var trnDest = childSnapshot.val().TrainDestination;
  var fstTrn = childSnapshot.val().Firsttrain;
  var trnFrqn = childSnapshot.val().TrainFrequency;
  var nextTrn;
  var minsaway;

  // Train Info
  console.log("following is for added traing display");
  console.log(trnName);
  console.log(trnDest);
  console.log(fstTrn);
  console.log(trnFrqn);

  // Prettify the employee start
  //var fstTrnPretty = moment.unix(fstTrn).format("MM/DD/YY");
  
  // Prettify the first train
  var fstTrnCoverted = moment(fstTrn, "HH:mm");
  var timedifference = fstTrnCoverted.diff(moment(),'minutes');

  if (timedifference>=0){
    nextTrn = fstTrn;
    minsaway = timedifference;
  }

  else{
    minsaway = trnFrqn-(-timedifference%trnFrqn);
    nextTrn = moment().add(minsaway,'minutes').format("HH:mm");

  }


  console.log(timedifference);
  
  // Calculate the months worked using hardcore math
  // To calculate the months worked
  //var empMonths = moment().diff(moment(empStart, "X"), "months");
  //console.log(empMonths);

  // Calculate the total billed rate
  //var empBilled = empMonths * empRate;
  //console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" +
  trnFrqn + "</td><td>" + nextTrn + "</td><td>" + minsaway + "</td></tr>");
});


