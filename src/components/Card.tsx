import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../styles/responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;

  @media ${device.laptop} {
    width: 33.3%;
  }
  @media ${device.tablet} {
    width: 50%;
  }
`;

const Box = styled.div<{ imageUrl: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 236px;
  height: 236px;
  margin: 10px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    -webkit-box-shadow: 0px 0px 6px 2px rgba(70, 70, 70, 0.75);
    -moz-box-shadow: 0px 0px 6px 2px rgba(70, 70, 70, 0.75);
    box-shadow: 0px 0px 6px 2px rgba(70, 70, 70, 0.75);
  }

  @media (max-width: 490px) {
    width: 160px;
    height: 160px;
    font-size: 15px;
  }
  @media ${device.mobileM} {
    width: 150px;
    height: 150px;
    font-size: 14px;
  }

  & .background {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-image: url(${(props) => props.imageUrl});
    background-size: cover;
    z-index: 1;
  }
  & .gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: linear-gradient(
      to bottom,
      rgba(181, 181, 181, 0.1) 0%,
      rgba(51, 51, 51, 0.2) 50%,
      rgba(33, 33, 33, 0.5) 75%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 2;
  }
  & .area {
    position: absolute;
    top: 5%;
    left: 5%;
    color: red;
    font-weight: 600;
    padding: 4px;
    border-radius: 5px;
    color: ${(props) => props.theme.color.black};
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 3;
    @media ${device.mobileL} {
      font-size: 14px;
    }
  }
  & .member {
    position: absolute;
    top: 5%;
    right: 5%;
    font-size: 20px;
    font-weight: 600;
    padding: 4px;
    color: ${(props) => props.theme.color.logo};
    z-index: 3;
    @media ${device.mobileL} {
      font-size: 16px;
    }
  }
  & .content-box {
    position: absolute;
    top: 70%;
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    border-top: 2px solid #bbb;
    z-index: 3;

    & > .title {
      font-weight: 600;
      line-height: 18px;
      color: ${(props) => props.theme.color.white};
    }
  }
`;

const CardLink = styled(Link)`
  color: inherit;
`;

// ! END

type _Props = {
  id: number;
  imageUrl: string;
  area: string;
  title: string;
  isManager: boolean;
  isMember: boolean;
};

function Card({ id, imageUrl, area, title, isManager, isMember }: _Props) {
  return (
    <Container>
      <CardLink to={`/room/${id}`}>
        <Box imageUrl={imageUrl}>
          {/* 배경 */}
          <div className="background"></div>
          {/* 그래디언트 */}
          <div className="gradient"></div>
          {/* 지역 */}
          <span className="area">{area}</span>
          {/* 참여중일 경우 체크 표시 보여줌 */}
          {isManager || isMember ? (
            <span className="member">
              {isManager || isMember ? (
                <span role="img" aria-label="emoji">
                  {isManager ? "👑" : isMember ? "🤝" : null}
                </span>
              ) : null}
            </span>
          ) : null}
          {/* 하단 제목 부분 */}
          <div className="content-box">
            <span className="title">{title}</span>
          </div>
        </Box>
      </CardLink>
    </Container>
  );
}

export default Card;
