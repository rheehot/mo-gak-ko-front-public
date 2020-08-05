import React from "react";
import styled from "styled-components";
import { ArrowLeft } from "../Icon";
import { device } from "../../styles/responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: 20px 10px;

  & .skeleton {
    border-radius: 5px;
    background-color: ${(props) => props.theme.bgColor.skeleton};
  }

  & .button {
    margin: 0 auto;
    width: 179px;
    height: 36px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  & .box {
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #bbb;

    & .title {
      width: 250px;
      height: 24px;
      margin-left: 20px;
      @media ${device.mobileL} {
        margin-left: 10px;
      }
    }
  }
  & .area-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    & .area {
      margin-right: 10px;
      width: 57px;
      height: 24px;
    }
  }

  & .manager-box {
    margin-bottom: 10px;
    & .manager {
      width: 85px;
      height: 19px;
    }
  }

  & .description-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    & .text {
      width: 350px;
      height: 20px;
      @media ${device.mobileL} {
        width: 250px;
      }
    }
    & .text:not(:last-child) {
      margin-bottom: 3px;
    }
  }
`;

const RoomPublicSkeleton: React.FunctionComponent = () => {
  return (
    <Container>
      <InfoBox>
        <div className="box">
          <Link to="/">
            <ArrowLeft size="24px" />
          </Link>
          <div className="title skeleton"></div>
        </div>
        <div className="area-item">
          <div className="area skeleton"></div>
        </div>
        <div className="manager-box">
          <div className="manager skeleton"></div>
        </div>
        <div className="description-box">
          <div className="text skeleton"></div>
          <div className="text skeleton"></div>
          <div className="text skeleton"></div>
        </div>
      </InfoBox>
    </Container>
  );
};

export default RoomPublicSkeleton;
