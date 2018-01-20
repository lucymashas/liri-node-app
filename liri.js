require('dotenv').config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var wrap = require('wordwrap')(5,75);

var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotify);
var text = "";
var textArr = [];

function createLog(){
	if (inputString[2] === "my-tweets"){
		var logFile = "Ask Me:  " + inputString[2] + "\nOutput:  " + textArr + "\n";
	}else{
		var logFile = "Ask Me:  " + inputString[2] + " Request: " + inputString[3] + "\n" +                "Output:  " + text + "\n";
	}
	~
	fs.appendFile("log.txt",logFile, function(err){
		if (err){
			console.log(err);
		}
	});
}

function readFile(){
	fs.readFile("random.txt", "utf8", function(error, data) {
  	if (error) {
    	return console.log(error);
  	}
  	var dataArr = data.split(",");
  	for (var i=0; i < dataArr.length; i++){
  		inputString[i+2] = dataArr[i];
  	}
  		scenario(inputString[2]);
  	});	
}

function movieInfo(){
	if (inputString.length === 3){
		var movieName = "Mr. Nobody";
	}else{
	    var movieName = inputString[3];
		 }

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName 
	              + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {
	  	if (!error && response.statusCode === 200) {
	  	//Check Movie Is not spell correctly it returns undefined
	  		if (JSON.parse(body).Title === undefined) {
	  			console.log("Check your spelling / Movie was not found");
	  		}else {
	  		//Movie Information
	  		
		    text = (wrap ("\nMovie Title: " + JSON.parse(body).Title 
		               +"\nMovie was released in: " + JSON.parse(body).Year
		               +"\nIMDB Movie rating: " + JSON.parse(body).imdbRating + '\n'
		               +JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value 
		               +"\nThe movie was produced in: " + JSON.parse(body).Country
		  	           +"\nLanguage: " + JSON.parse(body).Language 
		  	           +"\nPlot: " + JSON.parse(body).Plot 
									 +"\nActors: " + JSON.parse(body).Actors + '\n'));
				console.log(text);
				createLog();
	  		}   
		}else {
			console.log("Error occurred");
		}
	});
}

function spotify_song(){
	if (inputString.length === 3){
		var song = "The Sign";
	}else{
	    var song = inputString[3];
		}
	spotify.search({ type: 'track', query: song }, function(err, data) {
	    if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}else{
		  	var songInfo = data.tracks.items[0];
		    text = (wrap("\nArtist:  " + songInfo.artists[0].name
		               + "\nSong Name:  " + songInfo.name
		               + "\nPreview Url:  " + songInfo.preview_url
									 + "\nAlbum:  " + songInfo.album.name + "\n"));
				console.log(text);
				createLog();
	  	}	
	});
}	

function mytweets(){
	var params = {screen_name: 'mashluz',count:20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for (var t=0; t < tweets.length; t++){
		    	textArr[t] = (wrap("Date:  " + tweets[t].created_at
														 + "  Feed:  " + tweets[t].text + "\n"));
					console.log(textArr[t]);
				}
				
				createLog();
				
  		}else{
  			console.log(error);	
  			} 	
	});
}
function scenario(askMe){
	switch (askMe){
	case "my-tweets":
	mytweets();
	break;
	case "spotify-this-song":
	spotify_song();
	break;
	case "movie-this":
	movieInfo();
	break;
	case "do-what-it-says":
	readFile();
	break;
	}
}

var inputString = process.argv;
scenario(inputString[2]);









