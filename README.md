## LIRI
***
## Description  
LIRI is a Language Interpretation and Recognition Interface CLI app
***

## Libraries
   * [Axios](https://www.npmjs.com/package/axios)
   * [Moment](https://www.npmjs.com/package/moment)
   * [DotEnv](https://www.npmjs.com/package/dotenv) 
   * [OMDB API](http://www.omdbapi.com) 
   * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

***
## Notes
* You would need to provide your own .env file with the API keys the format is as follows: 
   SPOTIFY_ID      = xxxxxxxxxxxxxxxxxxxxxxxx  <br/>
   SPOTIFY_SECRET  = xxxxxxxxxxxxxxxxxxxxxxxx  <br/>
   BandsInTown_ID  = xxxxxxxxxxxxxxxxxxxxxxxx  <br/>
   OMDB_API        = xxxxxxxxxxxxxxxxxxxxxxxx  <br/>

* There are multiple commands that can be used:
  *  **liri song-this song-name**
   > ![song-this](Screenshots/song-this.PNG)
   >  ![song-this](Screenshots/song-this-no-song.PNG)
  *  **liri concert-this artist-name** 
   >  ![concert-this](Screenshots/concert-this.PNG)    
  *  **liri movie-this movie-title**
   >  ![movie-this](Screenshots/movie-this.PNG)
   >  ![movie-this](Screenshots/movie-this-no-movie.PNG)
  *  **liri do-what-it-says**
   >  ![do-what-it-says](Screenshots/do-what-it-says.PNG)
* The "do-what-it-says" command requires a random.txt file with the following format:
  *  **command, query**
   >  ![random](Screenshots/do-what-it-says-random.PNG)
* There is a help command inside LIRI, was type liri help.
   >  ![help](Screenshots/help.PNG)
***





