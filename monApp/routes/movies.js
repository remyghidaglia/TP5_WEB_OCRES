var express = require('express');
var router = express.Router();
var _ = require('underscore');

let movies = [{
  id: "0",
  movie: "OSS 117",
  yearOfRelease: 2008,
  duration: 120, // en minutes,
  actors: ["Jean Dujardin", "Bérénice Bejo"],
  poster: "https://img.over-blog-kiwi.com/1/20/35/30/20140822/ob_13e821_affiche-oss-117-le-caire-nid-d-espions.jpg", // lien vers une image d'affiche,
  boxOffice: 100000000, // en USD$,
  rottenTomatoesScore: 10
}]

router.get('/', (req,res) => {
    res.status(200).json({movies});
  });

router.get('/:id',(req,res)=>{
  const { id } =req.params;
  const movie =_.find(movies,["id",id]);
  res.status(200).json({
    message:'Movie found !',
    movie
  });
});

router.put('/',(req,res)=>{
  const {movie}=req.body;
  const {yearOfRelease}=req.body;
  const {duration}=req.body;
  const {actors}=req.body;
  const {poster}=req.body;
  const {boxOffice}=req.body;
  const {rottenTomatoesScore}=req.body;
  const id=_.uniqueId();
  movies.push({id,movie,yearOfRelease,duration,actors,poster,boxOffice,rottenTomatoesScore});
  res.json({
    message:`just added ${id}`,
    movie: {id,movie,yearOfRelease,duration,actors,poster,boxOffice,rottenTomatoesScore}
  });
});

router.post('/:id', (req, res) => {
  // Get the :id of the user we want to update from the params of the request
  const { id } = req.params;
  // Get the new data of the user we want to update from the body of the request
  const { movie } = req.body;
  const {yearOfRelease}=req.body;
  const {duration}=req.body;
  const {actors}=req.body;
  const {poster}=req.body;
  const {boxOffice}=req.body;
  const {rottenTomatoesScore}=req.body;
  // Find in DB
  const movieToUpdate = _.find(movies, ["id", id]);
  // Update data with new data (js is by address)
  movieToUpdate.movie = movie;
  movieToUpdate.yearOfRelease = yearOfRelease;
  movieToUpdate.duration = duration;
  movieToUpdate.actors = actors;
  movieToUpdate.poster = poster;
  movieToUpdate.boxOffice = boxOffice;
  movieToUpdate.rottenTomatoesScore = rottenTomatoesScore;

  // Return message
  res.json({
    message: `Just updated ${id} with ${movie},${yearOfRelease},${duration},${actors},${poster},${boxOffice},${rottenTomatoesScore}`
  });
});

router.delete('/:id', (req, res) => {
  // Get the :id of the user we want to delete from the params of the request
  const { id } = req.params;

  // Remove from "DB"
  _.remove(movies, ["id", id]);

  // Return message
  res.json({
    message: `Just removed ${id}`
  });
});

  module.exports = router;