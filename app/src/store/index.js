import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { API_KEY, BASE_URL, DBSERVER_URL } from "../utils/constants";

  const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
  };
  
  export const getGenres = createAsyncThunk("flixxit/genres", async () => {
    const {
      data: { genres },
    } = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=beb6d45cef9213da411eebe66f2e28e1"
    );
    return genres;
  });
  
  const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    });
  };
  
  const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
  };
  
  export const fetchDataByGenre = createAsyncThunk(
    "flixxit/genre",
    async ({ genre, type }, thunkAPI) => {
      const {
        flixxit: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `https://api.themoviedb.org/3/discover/${type}?api_key=beb6d45cef9213da411eebe66f2e28e1&with_genres=${genre}`,
        genres
      );
    }
  );
  
  export const fetchMovies = createAsyncThunk(
    "flixxit/trending",
    async ({ type }, thunkAPI) => {
      const {
        flixxit: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true
      );
    }
  );

  export const getUsersLikedMovies = createAsyncThunk(
    "flixxit/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`${DBSERVER_URL}/api/user/liked/${email}`);
      return movies;
    }
  );
  
  export const removeMovieFromLiked = createAsyncThunk(
    "flixxit/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put(`${DBSERVER_URL}/api/user/remove`, {
        email,
        movieId,
      });
      return movies;
    }
  );
  
  const FlixxitSlice = createSlice({
    name: "Flixxit",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      });
      builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
    },
  });
  
  export const store = configureStore({
    reducer: {
        flixxit: FlixxitSlice.reducer,
    },
  });
  
  export const { setGenres, setMovies } = FlixxitSlice.actions;
  