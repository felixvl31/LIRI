require("dotenv").config();
const axios   = require("axios");
const keys    = require("./keys.js");
const fs      = require("fs");
const moment  = require('moment');
const Spotify = require('node-spotify-api');
 

//Keys
var spotify = new Spotify({
  id:keys.spotify.id,
  secret:keys.spotify.secret
});

var bitID = keys.bit.id;
var OMDBAPI = keys.omdb.api;


var command = process.argv[2].replace(/['"]+/g, '');
var input = process.argv.splice(3).join(" ").replace(/['"]+/g, '');

var separator ="_______________________________________________________________________________";

if (command === "do-what-it-says"){
  fs.readFile("random.txt","utf8",function(err,data){
  if(err){
    console.log(err);
    return;
  }
  var content = data.split(",");
  command = content[0].replace(/['"]+/g, '').trim();
  input = content[1].replace(/['"]+/g, '').trim();
  main(command,input);
  });

}
else if (command ==="movie-this" || command ==="song-this" || command === "concert-this"){
  main(command,input);
}
else if (command === "help")
{
  console.log(separator);
  console.log("Hi, my name is Liri, i'm here to asssist you");
  console.log("     To search a song: liri song-this song-name");
  console.log("     To search a movie: liri movie-this movie-title");
  console.log("     To search a concert: liri concert-this artist-name");
  console.log("     To do what the random.txt says: liri do-what-it-says")
  console.log(separator);
}
else {
  console.log(separator);
  console.log("Wrong command, type help");
  console.log(separator);

  log("Wrong command");
  log(separator);
}

function main(command, input){
  log("Command:"+command+" "+input);
  log(" ");
  if (command === "movie-this"){
    if (input == ""||input === undefined){
      input = "Mr.Nobody"
    }
    thisMovie(input);
  }
  else if (command === "song-this"){
    if (input === "" || input === undefined){
      input = "The Sign the ace"
    }
    spotifySong(input);
  }
  else if (command === "concert-this"){
    if (input === ""||input === undefined){
      input = "The Ace"
    }
  thisConcert(input);
  }
  else {
    console.log(separator);
    console.log("Wrong command, type help.");
    console.log(separator);
    
    log("Wrong command");
    log(separator);
  }

}

function log(string) {
  fs.writeFileSync("log.txt",string+"\r\n",{ flag: 'a+' },function(err){
    if(err){
      console.log(err);
      return;
    }
    });
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function spotifySong(string){
  spotify.search({ type: 'track', query: string ,limit:1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
    if(data.tracks.items.length==0){
      console.log(separator);
      console.log(" ");
      console.log("Song "+capitalize(string)+ " not found in Spotify");
      console.log(separator);
      log(" ");
      log("Song "+capitalize(string)+ " not found in Spotify");
      log(separator);
      return;
    }
    var artist = data.tracks.items[0].artists[0].name;
    var song = data.tracks.items[0].name;
    var link = data.tracks.items[0].external_urls.spotify;
    var album = data.tracks.items[0].album.name;
    console.log(separator);
    console.log(" ");
    console.log("The song " + song + " by " + artist);
    console.log("is included in the album " + album);
    console.log("and can be previewed at " + link);
    console.log(separator);
    log(" ");
    log("The song " + song + " by " + artist);
    log("is included in the album " + album);
    log("and can be previewed at " + link);
    log(separator);

});
}

function thisMovie(string){
  var queryUrl = "http://www.omdbapi.com/?t=" + string + "&y=&plot=short&apikey="+OMDBAPI;
  axios.get(queryUrl).then(
    function(response) {
      if (response.data.Response == "False"){
        console.log(separator);
        console.log(" ");
        console.log("Movie "+capitalize(string)+ " not found");
        console.log(separator);
        log(" ");
        log("Movie "+capitalize(string)+ " not found");
        log(separator);
      return;
      }
      var title = response.data.Title;
      var year = response.data.Year;
      var IMDBRating = response.data.Ratings[0].Value;
      var RTRating = response.data.Ratings[1].Value;
      var country = response.data.Country;
      var language = response.data.Language;
      var plot = response.data.Plot;
      var cast = response.data.Actors;
      
      console.log(separator);
      console.log(" ");
      console.log("Title: "+title);
      console.log("Year: "+year);
      console.log("Country: "+country);
      console.log("Language: "+language);
      console.log("Cast: "+cast);
      console.log("Plot: " +plot);
      console.log("Ratings:");
      console.log(" IMDb.............." + IMDBRating);
      console.log(" Rotten Tomatoes..." + RTRating);
      console.log(separator);

      log("Title: "+title);
      log("Year: "+year);
      log("Country: "+country);
      log("Language: "+language);
      log("Cast: "+cast);
      log("Plot: " +plot);
      log("Ratings:");
      log(" IMDb.............." + IMDBRating);
      log(" Rotten Tomatoes..." + RTRating);
      log(separator);
    }
  ).catch(function(error){
    console.log(error);
  });
};

function thisConcert(string){
  var queryUrl = "https://rest.bandsintown.com/artists/" + string + "/events?app_id="+bitID;
  
  axios.get(queryUrl).then(
    function(response) {
      console.log()
      if (response.data.length === 0){
        console.log(separator);
        console.log(" ");
        console.log("No concerts found for "+capitalize(string));
        console.log(separator);

        log(" ");
        log("No concerts found for "+capitalize(string));
        log(separator);
        return;
      }
      var artist = response.data[0].lineup[0]
      var name = response.data[0].venue.name;
      var location = response.data[0].venue.city+", "+response.data[0].venue.country;
      var date = response.data[0].datetime.split("T")[0];
      date = moment(date, "YYYY-MM-DD").format("MM/DD/YYYY");
      console.log(separator);
      console.log(" ");
      console.log(artist +" will be at "+name);
      console.log("on "+location+", the date of "+date);
      console.log(separator);

      log(" ");
      log(artist +" will be at "+name);
      log("on "+location+", the date of "+date);
      log(separator);
    }

  ).catch(function(error){
    console.log(error);
  });

};
