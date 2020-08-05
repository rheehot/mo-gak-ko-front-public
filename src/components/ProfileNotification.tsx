import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import {
  READ_NOTIFICATION,
  NOTIFICATIONS,
  RESET_COUNT,
} from "../queries/notificationQueries";
import Notification from "./Notification";
import NotificationSkeleton from "./skeleton/NotificationSkeleton";
import { ME } from "../queries/globalQueries";

const Container = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px auto;
`;

const ReadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;

  & span {
    line-height: 20px;
  }
`;

const NotificationBox = styled.ul<{ count: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  border: ${(props) => (props.count !== 0 ? "1px solid #bbb" : "0")};

  & .no-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0 0;
    font-size: 18px;
  }
`;

// ! END

type _Query = {
  me: {
    notifications: {
      id: number;
      room: {
        id: number;
        title: string;
        isManager: boolean;
        isMember: boolean;
      };
      type: string;
      message: string;
      createdAt: string;
    }[];
    notificationCount: number;
  };
};

function ProfileNotification() {
  const { data: temp } = useQuery<{ me: { notificationCount: number } }>(ME);
  const { data } = useQuery<_Query>(NOTIFICATIONS);
  const [readNotification] = useMutation(READ_NOTIFICATION, {
    refetchQueries: [{ query: RESET_COUNT }],
  });

  const read = () => {
    if (temp?.me.notificationCount === 0) {
      return;
    }
    readNotification();
  };

  useEffect(() => {
    read();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      {!data ? (
        <NotificationSkeleton />
      ) : (
        <>
          {data.me.notifications.length > 0 ? (
            <ReadBox>
              <span>읽은 알림은 다음에 접속하시면 사라져요 :)</span>
            </ReadBox>
          ) : null}
          <NotificationBox count={data.me.notifications.length}>
            {data?.me.notifications.length !== 0 ? (
              data?.me.notifications.map((item) => (
                <Notification
                  key={item.id}
                  type={item.type}
                  roomId={item.room.id}
                  title={item.room.title}
                  message={item.message}
                  createdAt={item.createdAt}
                  isManager={item.room.isManager}
                  isMember={item.room.isMember}
                />
              ))
            ) : (
              <div className="no-content">
                <span>받은 알림이 없습니다</span>
              </div>
            )}
          </NotificationBox>
        </>
      )}
    </Container>
  );
}

export default ProfileNotification;
