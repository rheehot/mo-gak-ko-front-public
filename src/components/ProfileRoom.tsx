import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { MY_ROOMS } from "../queries/roomQueries";
import Card from "./Card";
import CardSkeleton from "./skeleton/CardSkeleton";
import { device } from "../styles/responsive";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  & .no-contents {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 40px;

    & span {
      font-size: 18px;
    }
    @media ${device.mobileL} {
      padding-top: 40px;
    }
  }
`;

// ! END

type _Query = {
  me: {
    myRooms: {
      id: number;
      imageUrl: string;
      area: string;
      title: string;
      isManager: boolean;
      isMember: boolean;
    }[];
  };
};

function ProfileRoom() {
  const { data } = useQuery<_Query>(MY_ROOMS, {
    fetchPolicy: "network-only",
  });
  return (
    <Container>
      {!data ? (
        <>
          {new Array(4).fill(1).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </>
      ) : null}
      {data?.me.myRooms.length !== 0 ? (
        data?.me.myRooms.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            area={item.area}
            title={item.title}
            isManager={item.isManager}
            isMember={item.isMember}
          />
        ))
      ) : (
        <div className="no-contents">
          <span>개설한 모임이 없습니다.</span>
        </div>
      )}
    </Container>
  );
}

export default ProfileRoom;
