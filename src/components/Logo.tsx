import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logoUrl from "../assets/logo192.png";

const SLink = styled(Link)`
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  width: 32px;
  height: 32px;

  & img {
    width: 100%;
    height: 100%;
  }
`;

// ! END

function Logo() {
  return (
    <SLink to="/">
      <img src={logoUrl} alt="logo" />
    </SLink>
  );
}

export default Logo;
