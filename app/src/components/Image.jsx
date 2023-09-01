import React from "react";
import styled from "styled-components";
import background from "../assets/login.jpg";

export default function BackgroundImage() {
  return (
    <Container>
      <img src={background} alt="background" />
    </Container>
  );
}

const Container = styled.div`
  height: 50vw;
  width: 25vw;
  img {
    height: 25vw;
    width: 100vw;
  }
`;
