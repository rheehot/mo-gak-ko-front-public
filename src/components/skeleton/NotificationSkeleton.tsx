import React from "react";
import styled from "styled-components";
import { device } from "../../styles/responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & .skeleton {
    border-radius: 5px;
    background-color: ${(props) => props.theme.bgColor.skeleton};
  }

  & .second {
    opacity: 0.7;
  }
  & .last {
    opacity: 0.4;
  }

  & .box {
    width: 100%;
    height: 68px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
    @media ${device.mobileL} {
      height: 90px;
    }
  }
`;

const NotificationSkeleton: React.FunctionComponent = () => (
  <Container>
    <div className="box first skeleton"></div>
    <div className="box second skeleton"></div>
    <div className="box last skeleton"></div>
  </Container>
);

export default NotificationSkeleton;
