import React, { useState, useRef } from "react";
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

const Input = styled.input`
  all: unset;
  width: 100%;
  padding: 8.5px;
  border: 2px solid ${(props) => props.theme.color.logo};
  border-radius: 10px;
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
  allowFunc: (id: number) => Promise<null | undefined>;
  denyFunc: (
    id: number,
    state: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    ref: React.RefObject<HTMLInputElement>
  ) => Promise<string | number | void | null>;
};

function PendingList({
  id,
  type,
  imageUrl,
  username,
  appeal,
  isManager,
  isMe,
  allowFunc,
  denyFunc,
}: _Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDeny, setIsDeny] = useState<boolean>(false);

  return (
    <Container>
      <div className="column">
        {!isDeny ? (
          <>
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
          </>
        ) : (
          <>
            <Input
              type="text"
              placeholder="사유를 입력해주세요"
              ref={inputRef}
            />
          </>
        )}
      </div>
      <div className="column">
        {type === "pending" && isManager && !isMe ? (
          <>
            <button
              onClick={(event: never) =>
                !isDeny
                  ? allowFunc(id)
                  : denyFunc(id, isDeny, setIsDeny, inputRef)
              }
            >
              <span className="button-emoji" role="img" aria-label="emoji">
                ✅
              </span>
            </button>
            <button
              onClick={(event: never) =>
                !isDeny
                  ? denyFunc(id, isDeny, setIsDeny, inputRef)
                  : setIsDeny(false)
              }
            >
              <span className="button-emoji" role="img" aria-label="emoji">
                ❌
              </span>
            </button>
          </>
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

export default PendingList;
