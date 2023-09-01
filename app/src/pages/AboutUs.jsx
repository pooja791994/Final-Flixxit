import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch } from "react-redux";
import Image from "../components/Image";

export default function UserListedMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  },);

  

  return (
    <Container>
      <Navbar isScrolled="false" />
      <Image />      
      <div className="content flex column">
        <p>Welcome to Flixxit, the world's leading streaming entertainment service. 
            Our journey began with a simple idea: to offer an unprecedented way to watch TV shows and movies.</p>
        <h3>What We Offer: </h3>
        <p>From binge-worthy series that keep you on the edge of your seat to award-winning films that evoke every emotion, 
          Flixxit offers an unparalleled variety of content. Our library is a treasure trove of stories that cater to all tastes and preferences.
           Whether you're into thrilling mysteries, heartwarming romances, mind-bending science fiction, 
           or insightful documentaries, there's always something for you.</p>
        <h3>Our Mission:</h3>
        <p>At Netflix, we're more than just a streaming service; we're storytellers. 
          Our mission is to entertain, inspire, and connect audiences through the power of narrative. 
          We believe in giving creators the freedom to tell their stories authentically, 
          and we're committed to pushing the boundaries of what's possible in entertainment.</p>
        <p>Thank you for being part of the Netflix community. 
          As we continue to innovate and evolve, we invite you to explore the ever-expanding universe of entertainment with us. 
          Your next great story is just a click away.</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 5rem;
    margin-top: -20rem;
    gap: 1rem;
    h3 {
      margin-left: 35rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
