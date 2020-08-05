import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";
import { Link, Route, useLocation, useHistory } from "react-router-dom";

import { device } from "../styles/responsive";
import { ME, LOG_USER_OUT } from "../queries/globalQueries";
import ProfileRoom from "../components/ProfileRoom";
import ProfileNotification from "../components/ProfileNotification";
import ProfileJoinRoom from "../components/ProfileJoinRoom";

const Container = styled.div`
  flex: 1;
  padding: 15px 0;

  & .skeleton {
    border-radius: 5px;
    background-color: ${(props) => props.theme.bgColor.skeleton};
  }
  & .circle-skeleton {
    border-radius: 50%;
    background-color: ${(props) => props.theme.bgColor.skeleton};
  }

  @media ${device.tablet} {
    padding: 10px;
  }
`;

const Top = styled.div`
  max-width: 800px;
  margin: 0 auto;

  & .info-box {
    display: flex;
    justify-content: space-between;

    & .column:first-child {
      display: flex;
      width: calc(100% - 81px);

      & .profile_image-skeleton {
        width: 88px;
        height: 88px;
        margin-right: 20px;

        @media ${device.mobileL} {
          width: 60px;
          height: 60px;
          margin-right: 10px;
        }
      }

      & .profile_image {
        width: 88px;
        height: 88px;
        border-radius: 50%;
        margin-right: 20px;

        @media ${device.mobileL} {
          width: 60px;
          height: 60px;
          margin-right: 10px;
        }
      }
      & .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        word-break: break-word;

        & .username-skeleton {
          width: 129px;
          height: 34px;
          margin-bottom: 3px;
          @media ${device.mobileL} {
            height: 22px;
            width: 90px;
          }
        }
        & .username {
          font-size: 32px;
          font-weight: 600;
          @media ${device.mobileL} {
            font-size: 20px;
          }
        }
      }
    }
    & .column:last-child {
      position: relative;
      display: flex;
      align-items: center;

      & .logout-btn {
        all: unset;
        padding: 7px 10px;
        border: none;
        border-radius: 10px;
        color: ${(props) => props.theme.color.white};
        background-color: ${(props) => props.theme.color.logo_similar};
        cursor: pointer;
      }
    }
  }
  & .menu-box {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    width: 100%;
    height: 40px;
    margin: 16px auto;
  }
`;

const MenuLink = styled(Link)<{ current: string }>`
  border-radius: 10px;
  padding: 8px 16px;
  color: ${(props) =>
    props.current === "true"
      ? props.theme.color.white
      : props.theme.color.black};
  background-color: ${(props) =>
    props.current === "true" ? props.theme.color.logo : "inherit"};
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.current === "true"
        ? props.theme.color.logo
        : "rgba(255, 149, 0, 0.3)"};
  }
`;

const Bottom = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;
`;

// ! END

type _Query = {
  me: {
    username: string;
    imageUrl: string;
  };
};

function Profile() {
  const { data } = useQuery<_Query>(ME);
  const { pathname } = useLocation();
  const { push } = useHistory();

  const [logUserOut] = useMutation(LOG_USER_OUT);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Helmet>
        <title>모각코 | 내 정보</title>
      </Helmet>
      <Container>
        <Top>
          <div className="info-box">
            <div className="column">
              {!data ? (
                // * loading: true 이면 스켈레톤을 보여줌
                <div className="profile_image-skeleton circle-skeleton"></div>
              ) : (
                // * loading: false 이면 아이콘을 보여줌
                <img
                  src={data?.me.imageUrl}
                  alt="img"
                  className="profile_image"
                />
              )}
              <div className="user-info">
                {!data ? (
                  <div className="username-skeleton skeleton"></div>
                ) : (
                  <span className="username">{data?.me.username}</span>
                )}
              </div>
            </div>
            <div className="column">
              <button
                className="logout-btn"
                onClick={(evnet: never) => {
                  push("/");
                  logUserOut();
                }}
              >
                로그아웃
              </button>
            </div>
          </div>

          {/* menu 탭들을 보여줌 */}
          <div className="menu-box">
            <MenuLink to="/me" current={String(pathname === "/me")}>
              알림
            </MenuLink>
            <MenuLink to="/me/rooms" current={String(pathname === "/me/rooms")}>
              개설한 모임
            </MenuLink>
            <MenuLink
              to="/me/joinRooms"
              current={String(pathname === "/me/joinRooms")}
            >
              가입한 모임
            </MenuLink>
          </div>
        </Top>
        {/* route에 따라 적합한 화면을 보여줌 */}
        <Bottom>
          <Route path="/me" exact={true} component={ProfileNotification} />
          <Route path="/me/rooms" component={ProfileRoom} />
          <Route path="/me/joinRooms" component={ProfileJoinRoom} />
        </Bottom>
      </Container>
    </>
  );
}

export default Profile;
