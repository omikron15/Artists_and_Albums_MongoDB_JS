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


  const db = client.db("artists");
  console.log("Connected to database!");

  server.post("/api/artists", function(req, res, next){
  const artistsCollection = db.collection("artists");
  const artistToSave = req.body;
  artistsCollection.save(artistToSave, function(err, result){
    if(err) next(err); //Cool error handeling line
    res.status(201);
    res.json(result.ops[0])
    console.log("Saved to DB");
  })
});

  server.get("/api/artists", function(req, res, next){
  const artistsCollection = db.collection("artists");
  artistsCollection.find().toArray(function(err, allArtists){
  if(err) next(err); //Cool error handeling line
  res.json(allArtists);
  });
});

server.delete("/api/artists/:id", function(req, res, next){
  const artistsCollection = db.collection("artists");
  const objectID = ObjectID(req.params.id);
  artistsCollection.remove({_id: objectID}, function(err, result){
    if(err) next(err); //Cool error handeling line
    res.status(200).send();
  });
});

server.delete("/api/artists", function(req, res, next){
  const artistsCollection = db.collection("artists");
  artistsCollection.remove({}, function(err, result){
    if(err) next(err); //Cool error handeling line
    res.status(200).send();
  });
});

server.post("/api/artists/:id", function(req, res, next){
  const artistsCollection = db.collection("artists");
  const objectID = ObjectID(req.params.id);
  artistsCollection.update({_id: objectID}, req.body, function(err, result){
    if(err) next(err);
    res.status(200).send();
  })
})

server.listen(3000, function(){
  console.log("Listening on port 3000");
});

});
