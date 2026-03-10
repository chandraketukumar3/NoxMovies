const express = require("express");
const router = express.Router();

const {
  getTrendingMovies,
  getBollywoodMovies,
  getHollywoodMovies,
  getAnimeMovies,
  getLatestMovies,
  getLatestSeries,
  getTrendingTV,
  getTrendingPeople,
  discoverMovies,
  discoverTV,
  searchMovies,
  getMovieDetails,
  getGenres,
  getMovieTrailer
} = require("../controllers/movieController");

router.get("/trending", getTrendingMovies);
router.get("/trending/tv", getTrendingTV);
router.get("/trending/people", getTrendingPeople);
router.get("/bollywood", getBollywoodMovies);
router.get("/hollywood", getHollywoodMovies);
router.get("/anime", getAnimeMovies);
router.get("/latest/movies", getLatestMovies);
router.get("/latest/series", getLatestSeries);
router.get("/discover/movies", discoverMovies);
router.get("/discover/tv", discoverTV);
router.get("/search", searchMovies);
router.get("/genres", getGenres);
router.get("/:id", getMovieDetails);
router.get("/:id/trailer", getMovieTrailer);

module.exports = router;