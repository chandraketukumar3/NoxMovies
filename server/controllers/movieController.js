const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Trending Movies
const getTrendingMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;

    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}&page=${page}`
    );

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending movies" });
  }
};

// Bollywood Movies
const getBollywoodMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=hi&page=${page}&sort_by=popularity.desc`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Bollywood movies" });
  }
};

// Hollywood Movies
const getHollywoodMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=en&page=${page}&sort_by=popularity.desc`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Hollywood movies" });
  }
};

// Anime Movies
const getAnimeMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=ja&with_genres=16&page=${page}&sort_by=popularity.desc`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Anime movies" });
  }
};

// Latest Movies
const getLatestMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest movies" });
  }
};

// Latest Web Series
const getLatestSeries = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${TMDB_API_KEY}&page=${page}`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest series" });
  }
};

// Trending TV Shows
const getTrendingTV = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_API_KEY}&page=${page}`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending TV shows" });
  }
};

// Trending People
const getTrendingPeople = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/person/week?api_key=${TMDB_API_KEY}&page=${page}`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending people" });
  }
};

// Discover Movies
const discoverMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const with_genres = req.query.with_genres;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&page=${page}`;
    if (with_genres) url += `&with_genres=${with_genres}`;
    
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error discovering movies" });
  }
};

// Discover TV Shows
const discoverTV = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const with_genres = req.query.with_genres;
    let url = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&page=${page}`;
    if (with_genres) url += `&with_genres=${with_genres}`;

    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error discovering TV shows" });
  }
};


// Search Movies & TV
const searchMovies = async (req, res) => {
  try {
    const query = req.query.query;

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error searching movies and TV" });
  }
};

// Movie Details
const getMovieDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie details" });
  }
};

// Genres
const getGenres = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`
    );

    res.json(response.data.genres);
  } catch (error) {
    res.status(500).json({ message: "Error fetching genres" });
  }
};

// Trailer (Unified search for movie or tv)
const getMovieTrailer = async (req, res) => {
  try {
    const id = req.params.id;
    let type = req.query.type || 'movie';

    let response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${TMDB_API_KEY}`
    );

    let trailer = response.data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    // If not found and was movie, try tv fallback
    if (!trailer && type === 'movie') {
      response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${TMDB_API_KEY}`
      );
      trailer = response.data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
    }

    if (!trailer) {
      return res.json({
        message: "Trailer for this movie is currently unavailable."
      });
    }

    res.json(trailer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trailer" });
  }
};

module.exports = {
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
};