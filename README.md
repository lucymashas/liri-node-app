# liri-node-app

LIRI _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

LIRI interfaces with the following API's:
Twitter,Spotify and OMDB

Features:
Command liri by saying 
1) "node liri.js movie-this '<movie name here>', default movie is "Mr Nobody" if a movie is not entered.
  It will return the following information:
       *Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
  
  2)node liri.js spotify-this-song '<song name here>'` default song is "The Sign"
     *Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

   3)`node liri.js my-tweets`

      * This will show your last 20 tweets and when they were created at in your terminal/bash window.
      
  4) All the commands and data is logged to a text file.
