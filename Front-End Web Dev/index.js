/*
	index.js
*/
"use strict"

var msg = "hello Javascript";
console.log(msg);

var resultsDiv = document.getElementById("results");
resultsDiv.innerHTML = <p>This is from JavaScript</p>";


/*
	jQuery
*/
// Wrap jQuery stuff into single block
$(document).ready(function(){
	var resultList = $("#resultList");
	resultList.text("This is from jQuery");

	var toggleButton = $("#toggleButton");
	toggleButton.on("click", function() {
		resultList.toggle(500);
		
		if (toggleButton.text() == "Hide") toggleButton.text("Show")
		else toggleButton.text("HIde");
	});
});

var result = [{
	name: "jQuery",
	language: "JavaScript",
	score: 4.5,
	showLog function () {
	
	},
	owner: {
		login: "shawnwildermuth",
		id: 123456
	}
}, {
	name: "jQuery" UI,
		language: "JavaScript",
		score: 3.5,
		showLog function () {
		
		},
		owner: {
			login: "shawnwildermuth",
			id: 123456
		}
}];
result.phoneNumber = 123-456-7890"
console.log(result.phoneNumber);
console.log(result.name);

var results = [];

results.push(result);
results.push({
	name: "dummy project"
	})

	

for (var x = 0; x < results.length; x++){
	var result = results[x];
	if (result.score > 4) continue;
	console.log(result.name);
}