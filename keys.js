// console.log('this is loaded');

require("dotenv").config();


exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  api: process.env.OMDB_API
};

exports.bit = {
  id: process.env.BandsInTown_ID  
};