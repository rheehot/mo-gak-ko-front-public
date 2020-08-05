import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 150px 0;
  margin: 0 auto;

  & .title {
    font-size: 80px;
    margin-bottom: 10px;
  }
  & .text {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const HomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #bbb;
  font-weight: 700;
  color: ${(props) => props.theme.color.black};
`;

// ! END

function NotFound() {
  return (
    <Container>
      <span className="title">404</span>
      <span className="text">Sorry, page not found</span>
      <HomeLink to="/">GO HOME</HomeLink>
    </Container>
  );
}

export default NotFound;
