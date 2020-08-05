import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;

  & .skeleton {
    border-radius: 5px;
    background-color: ${(props) => props.theme.bgColor.skeleton};
  }
`;

const MemberBox = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
  & .pendings-title {
    width: 100px;
    height: 20px;
  }
  & .top-box {
    display: flex;
    & .members-title {
      width: 79px;
      height: 20px;
      margin-right: 10px;
    }
  }

  & .item {
    width: 100%;
    height: 52px;
  }
  & .item:not(:last-child) {
    margin-top: 10px;
  }
  & .item:last-child {
    margin: 10px 0;
  }
`;

const RoomPrivateSkeleton: React.FunctionComponent = () => (
  <Container>
    <MemberBox className="pending-list">
      <div className="pendings-title skeleton"></div>
      <div className="item skeleton"></div>
      <div className="item skeleton"></div>
    </MemberBox>

    <MemberBox className="member-list">
      <div className="top-box">
        <div className="members-title skeleton"></div>
      </div>
      <div className="item skeleton"></div>
      <div className="item skeleton"></div>
    </MemberBox>
  </Container>
);

export default RoomPrivateSkeleton;
