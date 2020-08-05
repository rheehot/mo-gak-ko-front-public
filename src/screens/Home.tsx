import React, { useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link, useHistory, useLocation } from "react-router-dom";

import { device } from "../styles/responsive";
import { ROOMS, SEARCH_ROOM, ROOM_COUNT } from "../queries/roomQueries";
import Card from "../components/Card";
import CardSkeleton from "../components/skeleton/CardSkeleton";
import { IS_LOGGED_IN } from "../queries/globalQueries";
import { Search, Plus } from "../components/Icon";
import Footer from "../components/Footer";
import bannerImg from "../assets/banner-min.jpg";

const Container = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;
  flex: 1;
`;

const Banner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 340px;
  color: ${(props) => props.theme.color.white};

  & .background {
    position: absolute;
    width: 100%;
    height: 340px;
    opacity: 0.8;
    background: url(${bannerImg}) 50% 50%;
    background-size: cover;
    z-index: -1;
  }

  & span {
    text-shadow: 0 0 2px ${(props) => props.theme.color.black};
  }

  & .title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 24px;
  }
`;

const Top = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #bbb;

  & .box {
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
    & .title {
      font-size: 24px;
      font-weight: 600;
      margin-right: 5px;
    }
  }

  & form {
    position: relative;

    & .search-btn {
      all: unset;
      position: absolute;
      top: 10px;
      left: 10px;
      cursor: pointer;
    }
    & input[type="search"] {
      all: unset;
      width: 230px;
      height: 35px;
      padding: 0 10px 0 35px;
      border: 2px solid ${(props) => props.theme.color.logo};
      border-radius: 10px;
      @media ${device.mobileL} {
        width: 250px;
      }
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;

  & .search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    & .search-title {
      font-size: 20px;
      font-weight: 600;

      & b {
        color: ${(props) => props.theme.color.red};
      }
    }
  }

  & .no-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 100px 0;
    & span {
      font-size: 18px;
      line-height: 30px;
    }
  }

  & .more-button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 35px;
    margin: 50px auto 0 auto;
    border-radius: 10px;
    color: ${(props) => props.theme.color.white};
    background-color: ${(props) => props.theme.color.logo};
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AddCard = styled.div`
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

  & .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 236px;
    height: 236px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #bbb;
    background-color: #f8f8f8;
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

    & > i {
      height: 48px;
      margin-bottom: 10px;
      border-radius: 50%;
      background-color: #e0e0e0;
    }
    & > span {
      font-size: 18px;
      @media ${device.mobileL} {
        font-size: 16px;
      }
    }
  }
`;

// ! END

type _Rooms = {
  rooms: {
    id: number;
    imageUrl: string;
    area: string;
    title: string;
    isManager: boolean;
    isMember: boolean;
  }[];
};

type _Search = {
  searchRoom: {
    id: number;
    imageUrl: string;
    area: string;
    title: string;
    isManager: boolean;
    isMember: boolean;
  }[];
};

function Home() {
  // * search가 존재하는지 확인
  const { search } = useLocation();
  // * 검색 키워드만 추출
  const keyward = decodeURI(search.replace("?term=", ""));
  // * 검색 상태인지 체크
  const isSearch = Boolean(keyward);
  const { push } = useHistory();

  // * 검색어 처리를 위한 useRef
  const inputRef = useRef<HTMLInputElement>(null);

  // ! useQuery START
  // * 로그인 상태 확인
  const { data: auth } = useQuery<{ isLoggedIn: boolean | undefined }>(
    IS_LOGGED_IN
  );
  // * 모임의 총 개수 파악
  const { data: count } = useQuery<{ roomCount: number }>(ROOM_COUNT);
  // * 검색 상태가 아닌 경우 ROOMS 호출
  const { data, fetchMore } = useQuery<_Rooms>(ROOMS, {
    skip: isSearch,
  });
  //  * 검색 상태인 경우 SEARCH_ROOM 호출
  const { data: searchData } = useQuery<_Search>(SEARCH_ROOM, {
    variables: { keyward },
    fetchPolicy: "network-only",
    skip: !isSearch,
  });
  // ! useQuery END

  const initialNumber = auth?.isLoggedIn ? 7 : 8;

  const moreRooms = (event: never) =>
    fetchMore({
      query: ROOMS,
      variables: {
        last: data?.rooms[data.rooms.length - 1].id,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          rooms: [...prev.rooms, ...fetchMoreResult.rooms],
        });
      },
    });

  //  * 검색바의 form submit 이벤트
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const term = inputRef.current!.value;
    if (term === "") return null;
    inputRef.current!.value = "";
    inputRef.current!.blur();
    push(`?term=${term}`);
  };

  return (
    <>
      <Helmet>
        <title>모각코 | 모임</title>
      </Helmet>
      <Container>
        <Banner>
          <div className="background"></div>
          <span className="title">개발자를 위한 모임</span>
          <span className="text">
            스터디, 팀 프로젝트를 모각코로 시작하세요.
          </span>
        </Banner>
        <Top>
          <div className="box">
            <span className="title">모임</span>
          </div>
          <form onSubmit={onSubmit}>
            <input type="search" placeholder="지역, 제목" ref={inputRef} />
            <button className="search-btn">
              <Search size="18px" />
            </button>
          </form>
        </Top>
        <Bottom>
          {isSearch ? (
            <div className="search-box">
              <span className="search-title">
                검색 : <b>{keyward}</b>
              </span>
            </div>
          ) : null}

          <Content>
            {!data && !searchData ? (
              <>
                {new Array(4).fill(1).map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </>
            ) : null}

            {data && !isSearch && auth?.isLoggedIn ? (
              <AddCard>
                <Link to="/add/room">
                  <div className="box">
                    <i>
                      <Plus size="48px" />
                    </i>
                    <span>모임 만들기</span>
                  </div>
                </Link>
              </AddCard>
            ) : !auth?.isLoggedIn && data?.rooms.length === 0 ? (
              <div className="no-content">
                <span className="span">
                  모임이 없습니다. 로그인하여 등록해보세요.
                </span>
              </div>
            ) : null}
            {!isSearch && data?.rooms.length !== 0 ? (
              <>
                {data?.rooms.map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    area={item.area}
                    title={item.title}
                    isManager={item.isManager}
                    isMember={item.isMember}
                  />
                ))}
              </>
            ) : null}

            {isSearch && searchData?.searchRoom.length !== 0 ? (
              <>
                {searchData?.searchRoom.map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    area={item.area}
                    title={item.title}
                    isManager={item.isManager}
                    isMember={item.isMember}
                  />
                ))}
              </>
            ) : isSearch && searchData?.searchRoom.length === 0 ? (
              <div className="no-content">
                <span>검색 결과가 없습니다.</span>
              </div>
            ) : null}
          </Content>
          {!isSearch &&
          count &&
          count?.roomCount <= initialNumber ? null : !isSearch &&
            count?.roomCount !== data?.rooms.length ? (
            <button className="more-button" onClick={moreRooms}>
              더보기
            </button>
          ) : null}
        </Bottom>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
