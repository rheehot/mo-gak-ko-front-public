import React from "react";
import styled from "styled-components";
import { device } from "../../styles/responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;

  @media ${device.laptop} {
    width: 33.3%;
  }
  @media ${device.tablet} {
    width: 50%;
  }
`;

const Box = styled.div`
  width: 236px;
  height: 236px;
  background-color: ${(props) => props.theme.bgColor.skeleton};
  margin: 10px auto;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  @media (max-width: 490px) {
    width: 160px;
    height: 160px;
  }
  @media ${device.mobileM} {
    width: 150px;
    height: 150px;
  }
`;

const HomeSkeleton: React.FunctionComponent = () => (
  <Container>
    <Box></Box>
  </Container>
);

export default HomeSkeleton;
