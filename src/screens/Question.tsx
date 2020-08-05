import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../components/Icon";
import { device } from "../styles/responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  padding: 20px 0;
  margin: 0 auto;

  @media (max-width: 820px) {
    padding: 20px 10px;
  }

  & .top-box {
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 20px;
    border-bottom: 2px solid #bbb;
    & .title {
      font-size: 20px;
      font-weight: 600;
      margin-left: 20px;
      @media ${device.mobileL} {
        margin-left: 10px;
      }
    }
  }
`;

const Box = styled.ul`
  display: flex;
  flex-direction: column;

  & li {
    display: flex;
    flex-direction: column;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    & .subject {
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 600;
    }
    & .content {
      line-height: 25px;

      & b {
        font-weight: 600;
      }
      & a {
        color: ${(props) => props.theme.color.logo};
      }
      @media ${device.mobileL} {
        font-size: 14px;
      }
    }
  }
`;

// ! END

function Question() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <Container>
      <div className="top-box">
        <Link to="/">
          <ArrowLeft size="24px" />
        </Link>
        <span className="title">자주묻는 질문</span>
      </div>
      <Box>
        <li>
          <span className="subject" role="img" aria-label="emoji">
            📌 Github 말고 다른 방식의 로그인은 없나요?
          </span>
          <span className="content">
            개발자 본인을 가장 잘 나타내주는 <b>Github</b>만을 이용한 로그인을
            제공하고 있습니다.
          </span>
          <span className="content">
            Github 계정이 없으시면 오늘부터 시작해보는 것은 어떨까요?
          </span>
        </li>
        <li>
          <span className="subject" role="img" aria-label="emoji">
            1️⃣ 회원탈퇴를 하고싶어요
          </span>
          <span className="content">
            모각코는 user를 식별하기 위해 최소한의 정보(username)만 수집하여
            운영하고 있습니다.
          </span>
          <br />
          <span className="content">
            <b>탈퇴 절차는 아래와 같습니다.</b>
          </span>
          <span className="content">
            1. 개설하고 가입한 모임을 모두 삭제하거나 탈퇴합니다.
          </span>
          <span className="content">
            2. Github Settings > Application > Authorized OAuth Apps 에서 연결
            해제합니다.
          </span>
          <span className="content">
            3. 연결 해제 후 회원탈퇴 건으로 문의주시면 5 영업일 내로
            처리해드립니다.
          </span>
        </li>
        <li>
          <span className="subject" role="img" aria-label="emoji">
            2️⃣ 프로파일 이미지를 변경하고 싶어요
          </span>
          <span className="content">
            <a
              href="https://github.com/settings/profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/settings/profile
            </a>
            에서 변경 후 모각코에 다시 로그인 해주세요.
          </span>
        </li>
        <li>
          <span className="subject" role="img" aria-label="emoji">
            3️⃣ 내 모임이 사라졌어요
          </span>
          <span className="content">
            홈페이지 취지(개발 관련 모임)에 맞지않는 부적절한 모임인 경우
            관리자가 무통보 삭제하고 있습니다.
          </span>
        </li>
      </Box>
    </Container>
  );
}

export default Question;
