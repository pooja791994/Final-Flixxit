import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Flixxit from "./pages/Flixxit";
import Signup from "./pages/Signup";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";
import AboutUs from "./pages/AboutUs";
import DetailPage from "./pages/DetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
        <Route exact path="/watchlist" element={<UserListedMovies />} />
        <Route exact path="/" element={<Flixxit />} />
        <Route exact path="/detail/:itemId" element={<DetailPage  />} />        
      </Routes>
    </BrowserRouter>
  );
}
