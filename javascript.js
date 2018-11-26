$(document).ready(function() {

	// Initializing Firebase
	var config = {
	apiKey: "AIzaSyDtAUKRvUblONvJPXBXiscFF3RgpwJlJVM",
	authDomain: "r-p-s-storage.firebaseapp.com",
	databaseURL: "https://r-p-s-storage.firebaseio.com",
	projectId: "r-p-s-storage",
	storageBucket: "r-p-s-storage.appspot.com",
	messagingSenderId: "931657278780"
	};
	firebase.initializeApp(config);
		
	var database = firebase.database();
	
	
	// Adds the trains
	$("#addChooChoo").on("click", function(event) {
			event.preventDefault();
	
	 // Declaring our variables to equal the input value
		let train_name = $("#train-name-input").val().trim();
		let train_dest = $("#dest-input").val().trim();
		let depart = $("#depart-input").val().trim();
		let how_often = $("#freq-input").val().trim();
	
		// Creates new object after user input
		let newTrain = {
			name: train_name,
			destination: train_dest,
			start: depart,
			frequency: how_often
		};
	
		// Pushes train data to the database
			database.ref().push(newTrain);
	
	
	 // Clears all of the fields
		$("#train-name-input").val("");
		$("#dest-input").val("");
		$("#depart-input").val("");
		$("#freq-input").val("");
		});
	
		// Create Firebase entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	
		console.log(childSnapshot.val());
	
		// Store everything into a variable.
		let train_name = childSnapshot.val().name;
		let train_dest = childSnapshot.val().destination;
		let depart = childSnapshot.val().start;
		let how_often = childSnapshot.val().frequency;
	
				let Time = 0;
		// math stuff
		  let trainmath = moment(Time, "HH:mm").subtract(1, "years");
			let currentTime = moment();
			let diffTime = moment().diff(moment(trainmath), "minutes");
			let remainder = diffTime % how_often;
			let minutesTillTrain = how_often - remainder;
			let nextTrain = moment().add(minutesTillTrain, "minutes");
			console.log(trainmath + currentTime + diffTime + remainder + minutesTillTrain + nextTrain)
	
	
		// Add data to the table
		$("#train-table > tbody").append("<tr><td>" + train_name + "</td><td>" + train_dest + "</td><td>" + how_often + 
		 "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minutesTillTrain + "</td></tr>");
	});
	
	});
	
	