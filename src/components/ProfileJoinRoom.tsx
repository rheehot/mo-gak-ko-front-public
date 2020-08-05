import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { MY_JOINROOMS } from "../queries/roomQueries";
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
    joinRooms: {
      room: {
        id: number;
        imageUrl: string;
        area: string;
        title: string;
        isManager: boolean;
        isMember: boolean;
      };
    }[];
  };
};

function ProfileJoinRoom() {
  const { data } = useQuery<_Query>(MY_JOINROOMS, {
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
      {data?.me.joinRooms.length !== 0 ? (
        data?.me.joinRooms.map((item) => (
          <Card
            key={item.room.id}
            id={item.room.id}
            imageUrl={item.room.imageUrl}
            area={item.room.area}
            title={item.room.title}
            isManager={item.room.isManager}
            isMember={item.room.isMember}
          />
        ))
      ) : (
        <div className="no-contents">
          <span>가입한 모임이 없습니다.</span>
        </div>
      )}
    </Container>
  );
}

export default ProfileJoinRoom;
