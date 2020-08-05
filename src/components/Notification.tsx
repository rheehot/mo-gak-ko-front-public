import React from "react";
import styled from "styled-components";
import Time from "./Time";
import { Link } from "react-router-dom";
import { device } from "../styles/responsive";

const ContainerLink = styled(Link)`
  &:not(:last-child) {
    border-bottom: 1px solid #bbb;
  }
`;

const Container = styled.li<{ type: string }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;

  @media ${device.mobileL} {
    flex-direction: column;
  }

  & .content-box {
    display: flex;

    & .column {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      & .type {
        padding: 4px 7px;
        margin-bottom: 8px;
        border-radius: 5px;
        color: ${(props) => props.theme.color.white};
        background-color: ${(props) => {
          if (props.type === "request") {
            return props.theme.bgColor.blueBtn;
          } else if (props.type === "allow") {
            return props.theme.bgColor.greenBtn;
          } else if (props.type === "deny" || props.type === "kick") {
            return props.theme.bgColor.redBtn;
          } else {
            return null;
          }
        }};
      }
      & .title {
        font-weight: 600;

        @media ${device.mobileL} {
          margin-bottom: 8px;
        }
        & b {
          color: ${(props) => props.theme.color.red};
        }
      }

      & .message {
        padding: 5px;
        border: 2px solid ${(props) => props.theme.color.logo_similar};
        border-radius: 10px;
        margin: 8px 0 0 0;
        @media ${device.mobileL} {
          margin: 0 0 8px 0;
        }
      }
    }
  }

  & .date {
    font-size: 14px;
    opacity: 0.8;
  }
`;

// ! END

type _Props = {
  type: string;
  roomId: number;
  title: string;
  message?: string;
  createdAt: string;
  isManager: boolean;
  isMember: boolean;
};

function Notification({
  type,
  roomId,
  title,
  message,
  createdAt,
  isManager,
  isMember,
}: _Props) {
  return (
    <ContainerLink
      to={
        !isManager && !isMember ? `/room/${roomId}` : `/room/${roomId}/detail`
      }
    >
      <Container type={type}>
        <div className="content-box">
          <div className="column">
            <span className="type">
              {type === "request"
                ? "요청"
                : type === "allow"
                ? "승인"
                : type === "deny"
                ? "거절"
                : type === "kick"
                ? "강퇴"
                : null}
            </span>
            <span className="title">
              <b>{title}</b>{" "}
              {type === "request"
                ? "에 참가 요청이 있습니다."
                : type === "allow"
                ? "에 참가 승인되었습니다."
                : type === "deny"
                ? "에 참가 거부되었습니다."
                : type === "kick"
                ? "에서 강퇴당했습니다."
                : null}
            </span>
            {message ? <span className="message">{message}</span> : null}
          </div>
        </div>
        <div className="date">
          <Time value={createdAt} />
        </div>
      </Container>
    </ContainerLink>
  );
}

export default Notification;
