import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { fetchMovies, getGenres } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


export default function DetailPage() {
  const  movieId  = useParams();
    const [isScrolled, setIsScrolled] = useState(false);
    const movies = useSelector((state) => state.flixxit.movies);
    const genres = useSelector((state) => state.flixxit.genres);
    const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);
    const [email, setEmail] = useState(undefined);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate("/login");
    });
    useEffect(() => {
      dispatch(getGenres());
    }, []);
  
    

    useEffect(() => {
      if (genresLoaded) {
        dispatch(fetchMovies({ genres, type: "all" }));
      }
    }, [genresLoaded]);
  
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
    const detail = movies.filter(item => {
      return item.id === parseInt(movieId.itemId)
    })
  return (
    <Container>
    <Navbar isScrolled={isScrolled} />
    <div className="main">      
      <div>
        <img src={`https://image.tmdb.org/t/p/original${detail[0].image}`} alt="detail" />
      </div>
      <div>
      <h1> <strong>Name :</strong> {detail[0].name}</h1>
      
      <h1>Types :</h1>
      <div className="genres flex">
      {detail[0].genres.length > 0 ? (
            <ul>
              {detail[0].genres.map((genre) => (
                <li>{genre}</li>
              ))}
            </ul>
          ) : (
            <p>No type available.</p>
          )}
              
            </div>
      </div>
      
    </div>
  </Container>
  );
}
const Container = styled.div`
  .main {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    img {
      border-radius: 0.2rem;
      width: 50%;
      height: 100%;
      z-index: 10;
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;