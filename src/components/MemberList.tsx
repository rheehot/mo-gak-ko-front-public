import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  margin: 10px 0 0 0;
  border: 1px solid #bbb;

  &:last-child {
    margin: 10px 0;
  }

  & .column:first-child {
    display: flex;
    align-items: center;
    width: calc(100% - 46px);
    word-break: break-all;

    & .profile_image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 50%;
    }

    & .info-box {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      & .username {
        font-weight: 600;
      }
      & .appeal {
        margin-top: 5px;
        font-size: 14px;
      }
    }
  }

  & .column:last-child {
    display: flex;

    & button {
      all: unset;
      cursor: pointer;

      & .button-emoji {
        margin: 5px;
      }

      & .release-check {
        padding: 6px;
        border-radius: 10px;
        color: ${(props) => props.theme.color.white};
        background-color: ${(props) => props.theme.bgColor.redBtn};
      }
    }
    & .manager-emoji {
      margin: 5px;
    }
  }
`;

// ! END

type _Props = {
  id: number;
  type: string;
  imageUrl: string;
  username: string;
  appeal?: string;
  isManager: boolean;
  isMe?: boolean;
  releaseFunc: (id: number) => Promise<null | undefined>;
};

function MemberList({
  id,
  type,
  imageUrl,
  username,
  appeal,
  isManager,
  isMe,
  releaseFunc,
}: _Props) {
  const [status, setStatus] = useState({
    kick: false,
  });
  return (
    <Container>
      <div className="column">
        <img src={imageUrl} className="profile_image" alt="img"></img>
        <div className="info-box">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="username">{username}</span>
          </a>
          {appeal ? <span className="appeal">{appeal}</span> : null}
        </div>
      </div>
      <div className="column">
        {type === "member" && isManager && !isMe ? (
          <button
            onClick={(event: never) =>
              !status.kick
                ? setStatus((prev) => ({ ...prev, kick: true }))
                : releaseFunc(id)
            }
          >
            {!status.kick ? (
              <span className="button-emoji" role="img" aria-label="emoji">
                ❌
              </span>
            ) : (
              <span className="release-check">강퇴</span>
            )}
          </button>
        ) : null}
        {isMe ? (
          <span className="manager-emoji" role="img" aria-label="emoji">
            👑
          </span>
        ) : null}
      </div>
    </Container>
  );
}

export default MemberList;
