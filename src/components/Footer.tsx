import React from "react";
import styled from "styled-components";
import { Mail, Question } from "./Icon";
import { device } from "../styles/responsive";
import { Link } from "react-router-dom";

const Container = styled.footer`
  width: 100%;
  margin: 80px auto 0 auto;
  color: ${(props) => props.theme.color.white};
  background-color: #232a38;
`;

const SLink = styled(Link)``;

const Item = styled.div`
  display: flex;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  padding: 15px 10px;
  margin: 0 auto;

  & .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33.3%;

    & .text {
      @media ${device.mobileL} {
        font-size: 14px;
      }
    }
  }

  & .mail-box {
    & a:first-child {
      width: 30px;
      height: 30px;
    }
    & a:last-child {
      margin-top: 10px;
    }
  }
  & .question-box {
    & ${SLink}:first-child {
      width: 30px;
      height: 30px;
    }
    & ${SLink}:last-child {
      margin-top: 10px;
      @media ${device.mobileL} {
        font-size: 14px;
      }
    }
  }

  & .nomad-box {
    & img {
      width: auto;
      height: 30px;
    }
    & a:last-child {
      margin-top: 7px;
    }
  }
`;

// ! END

function Footer() {
  return (
    <Container>
      <Item>
        <div className="mail-box box">
          <a
            href="https://forms.gle/dMNkZvVkaXtXGfZS8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size="30px" />
          </a>
          <a
            href="https://forms.gle/dMNkZvVkaXtXGfZS8"
            className="text"
            target="_blank"
            rel="noopener noreferrer"
          >
            문의하기
          </a>
        </div>
        <div className="question-box box">
          <SLink to="/question">
            <Question size="30px" />
          </SLink>
          <SLink to="/question">자주묻는 질문</SLink>
        </div>
        <div className="nomad-box box">
          <a
            href="https://nomadcoders.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://nomad-coders-assets.s3.amazonaws.com/static/img/m.svg"
              alt=""
            />
          </a>
          <a
            href="https://nomadcoders.now.sh/"
            className="text"
            target="_blank"
            rel="noopener noreferrer"
          >
            슬랙 채널
          </a>
        </div>
      </Item>
    </Container>
  );
}

export default Footer;
