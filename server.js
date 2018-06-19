const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(parser.urlencoded({extended: true}));

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err);
    return;
  }
})

  const db = client.db("artists");
  console.log("Connected to database!");

  server.get("/api/artists", function(req, res, next){
  const artistsCollection = db.collection("artists");
  artistsCollection.find().toArray(function(err, allArtists){
  if(err) next(err); //Cool error handeling line
  res.json(allArtists);
  });
});

server.listen(3000, function(){
  console.log("Listening on port 3000");
});
