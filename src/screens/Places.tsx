import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Container = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 56px);
  margin: 0 auto;
`;

// ! END

function Places() {
  return (
    <>
      <Helmet>
        <title>모각코 | 추천장소</title>
      </Helmet>
      <Container>
        <span>준비중입니다</span>
      </Container>
    </>
  );
}

export default Places;
