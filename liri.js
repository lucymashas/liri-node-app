var keys = require("./keys.js");
var Twitter = require('twitter');
var SpotifyWebApi = require('spotify-web-api-node');
var request = require("request");

var client = new Twitter(keys);

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

var askMe=process.argv[2];

switch (askMe){
	case "my-tweets":
	mytweets();
	break;
	case "spotify-this-song":
	spotify();
	break;
	case "movie-this":
	movieinfo();
	break;
	case "spotify-this-song":
	spotify();
	break;
	default:
	  console.log("don't understand");
}


