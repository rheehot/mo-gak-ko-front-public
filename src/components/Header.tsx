import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import Logo from "./Logo";
import { ME, IS_LOGGED_IN } from "../queries/globalQueries";
import CircleSkeleton from "./skeleton/CircleSkeleton";
import { device } from "../styles/responsive";

const Container = styled.header`
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100%;
  height: 56px;
  background-color: ${(props) => props.theme.color.white};
  user-select: none;
  backdrop-filter: saturate(200%) blur(10px);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  height: 100%;
  padding: 0 16px;
  margin: 0 auto;

  & .column {
    position: relative;
    display: flex;
    align-items: center;

    & a {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

const MenuLink = styled(Link)<{ current: string }>`
  text-decoration: none;
  color: ${(props) => props.theme.color.black};
  opacity: ${(props) => (props.current === "true" ? "1" : "0.6")};
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  @media ${device.mobileL} {
    font-size: 15px;
  }
`;

const ProfileBox = styled.div`
  position: relative;
  width: ${(props) => props.theme.size.headerProfileImage};
  height: ${(props) => props.theme.size.headerProfileImage};
  & .profile-link {
    all: unset;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;

    & .profile-image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    & .count-box {
      position: absolute;
      top: -2px;
      right: -2px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: 10px;
      color: ${(props) => props.theme.color.white};
      background-color: ${(props) => props.theme.bgColor.notificationCount};
      z-index: 4;
    }
  }
`;

// ! Styled END

type _Profile = {
  me: {
    imageUrl: string;
    notificationCount: number;
  };
};

function Header() {
  const { pathname } = useLocation();

  // * token의 존재 유무로 로그인 여부를 판단하고 존재하면 내 정보를 가져옴
  const token = Boolean(localStorage.getItem("token"));
  const { data: auth } = useQuery<{ isLoggedIn: boolean }>(IS_LOGGED_IN);
  const { data } = useQuery<_Profile>(ME, { skip: !token });

  return (
    <Container>
      <Item>
        <div className="column">
          <Logo />
          <MenuLink to="/" current={String(pathname === "/")}>
            모임
          </MenuLink>
          <MenuLink to="/places" current={String(pathname === "/places")}>
            추천장소
          </MenuLink>
        </div>
        <div className="column">
          {!auth?.isLoggedIn ? (
            <a
              href={
                process.env.NODE_ENV === "production"
                  ? `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_PROD_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_PROD_GITHUB_REDIRECT_URL}`
                  : `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_DEV_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_DEV_GITHUB_REDIRECT_URL}`
              }
            >
              로그인
            </a>
          ) : (
            // * 로그인이 된 경우
            <ProfileBox>
              <Link to="/me" className="profile-link">
                {!data ? (
                  <CircleSkeleton size="36px" />
                ) : (
                  <>
                    <img
                      src={data?.me.imageUrl}
                      alt="img"
                      className="profile-image"
                    />
                    {data.me.notificationCount !== 0 ? (
                      <div className="count-box">
                        {data?.me.notificationCount! > 9
                          ? "9+"
                          : data?.me.notificationCount}
                      </div>
                    ) : null}
                  </>
                )}
              </Link>
            </ProfileBox>
          )}
        </div>
      </Item>
    </Container>
  );
}

export default Header;
