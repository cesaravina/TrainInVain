$(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBvy_ID7eqHLlQBBjep2aSX-Y3Ui6mB09A",
    authDomain: "traininvain-d6e95.firebaseapp.com",
    databaseURL: "https://traininvain-d6e95.firebaseio.com",
    storageBucket: "traininvain-d6e95.appspot.com",
    messagingSenderId: "517688101419"
  };
  firebase.initializeApp(config);
var database = firebase.database();

// on click
$("#trainButton").on("click", function(event){
	event.preventDefault();

	// store input in variables
	var trainName = $("#trainName").val().trim();
	var trainDestination = $("#trainDestination").val().trim();
	var trainTime = $("#trainTime").val().trim();
	var trainFrequency = $("#trainFrequency").val().trim();
	console.log(trainName, trainDestination, trainFrequency, trainTime)

	// store variables in firebase
	database.ref().push({
		trainName: trainName,
		trainDestination: trainDestination,
		trainTime: trainTime,
		trainFrequency: trainFrequency,
	});

	// empty
	$("#trainName").val("")
	$("#trainDestination").val("")
	$("#trainTime").val("")
	$("#trainFrequency").val("")
});

database.ref().on("child_added", function(snapshot){

	// new table row will be created...
	var tableRow = $("<tr>");
	// ...and appended to the table
	$("#trainTable").append(tableRow)

	// retrieve fb data
	var trainName = snapshot.val().trainName;
	var trainDestination = snapshot.val().trainDestination;

	var trainFrequency = snapshot.val().trainFrequency;

	var startTime = snapshot.val().trainTime;
	
	var showTime = moment(startTime, "hh:mm a");

	var inMinutes = moment().diff(showTime, "minutes");

	// minutes computation

	var minutesMath = inMinutes % trainFrequency;

	console.log("minutesMath: " + minutesMath);

	// calculate minutesAway
	var minutesAway = trainFrequency - minutesMath;

	var nextTrainTime = moment().add(minutesAway, "minutes").format("LT")

	// create an array 
	var loopTrain = [trainName, trainDestination, trainFrequency, nextTrainTime, minutesAway];

	// iterate over array
	for (var i=0; i<loopTrain.length; i++){
		// insert data to table
		var tableData = $("<td>");
		tableData.text(loopTrain[i]);
		tableRow.append(tableData);
	};
}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code)
});
});
