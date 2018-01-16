var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotify);


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
	    //Movie Information
	    console.log("Movie's Title: " + JSON.parse(body).Title);
	    console.log("Year the movie was released: " + JSON.parse(body).Year);
	    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
	    console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
	  	console.log("Country where the movie was produced: " + JSON.parse(body).Country);
	  	console.log("Language of the movie: " + JSON.parse(body).Language);
	  	console.log("Plot of the movie: " + JSON.parse(body).Plot);
	  	console.log("Actors in the movie: " + JSON.parse(body).Actors);
	  	}
	});
}

function spotify_song(){
	if (inputString.length === 3){
		var song = "The Sign";
	}else{
	    var song = inputString[3];
		}
	console.log(song);
	spotify.search({ type: 'track', query: song }, function(err, data) {
	    if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}else{
		  	var songInfo = data.tracks.items[0];
		    console.log("Artist:  " + songInfo.artists[0].name);
		    console.log("Song Name:  " + songInfo.name);
		    console.log("Album:  " + songInfo.album.name)
		    console.log("Preview Url:  " + songInfo.preview_url)
	  	}	
	});
}	

function mytweets(){
	var params = {screen_name: 'mashluz',count:20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for (var t=0; t < tweets.length; t++){
  				console.log("Tweets:  ");
		    	console.log("Creation Date:  " + tweets[t].created_at);
		    	console.log("Feed:  " + tweets[t].text)
  			}
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

fs.appendFile('log.txt', inputString, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Content Added!");
  }
});

scenario(inputString[2]);



