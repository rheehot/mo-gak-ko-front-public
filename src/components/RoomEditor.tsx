import React from "react";
import styled from "styled-components";

import { device } from "../styles/responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & .validation {
    color: ${(props) => props.theme.color.red};
    @media ${device.mobileL} {
      font-size: 14px;
    }
  }
  & .notice {
    font-size: 16px;
    line-height: 20px;
    margin: 10px auto 0 auto;
    @media ${device.mobileL} {
      font-size: 14px;
    }
  }
`;

const Input = styled.input<{ validation?: boolean; value: string }>`
  all: unset;
  font-size: 16px;
  width: 90%;
  margin: ${(props) => (props.validation ? "20px 0 4px 0" : "20px 0")};
  padding: 10px 0;
  border-bottom: 2px solid
    ${(props) => {
      if (props.value.length === 0) {
        return props.theme.borderColor.dangerZone;
      } else {
        return props.theme.bgColor.greenBtn;
      }
    }};
`;

const DescriptionBox = styled.div<{ value: string }>`
  display: flex;
  width: 90%;
  margin: 20px 0;
  border-bottom: 2px solid
    ${(props) => {
      if (props.value.length === 0) {
        return props.theme.borderColor.dangerZone;
      } else {
        return props.theme.bgColor.greenBtn;
      }
    }};

    & > textarea {
      all: unset;
      width: 100%;
      height: 32px;
      line-height: 20px;
      resize: none;
      overflow: hidden;
      word-wrap: break-word;
    }
  }
`;

const SendButton = styled.button`
  all: unset;
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.logo};
  cursor: pointer;
`;

type _Props = {
  type: string;
  value: {
    area: string;
    title: string;
    description: string;
    contactURL: string;
  };
  regex: RegExp;
  inputOnChange: (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => null | undefined;
  textareaOnChange: (event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  send: (event: never) => Promise<string | number | null | undefined>;
};

function RoomEditor({
  type,
  value,
  regex,
  inputOnChange,
  textareaOnChange,
  send,
}: _Props) {
  return (
    <Container>
      <div className="bottom-box">
        <Input
          type="text"
          name="area"
          placeholder="간단한 지역 (강남, 홍대...) [6자 이내]"
          value={value.area}
          onChange={inputOnChange}
          validation={value.area.length === 6}
        />
        {value.area.length === 6 ? (
          <span className="validation">더 이상 입력할 수 없어요</span>
        ) : null}

        <Input
          type="text"
          name="title"
          placeholder="제목 [18자 이내]"
          value={value.title}
          onChange={inputOnChange}
          validation={value.title.length === 18}
        />
        {value.title.length === 18 ? (
          <span className="validation">더 이상 입력할 수 없어요</span>
        ) : null}

        <DescriptionBox value={value.description}>
          <textarea
            name="description"
            placeholder="설명 (여러 줄을 입력할 수 있어요)"
            value={value.description}
            onChange={textareaOnChange}
            onMouseEnter={textareaOnChange}
          ></textarea>
        </DescriptionBox>

        <Input
          type="text"
          name="contactURL"
          placeholder="소통할 SNS URL (오픈채팅, 슬랙...)"
          value={value.contactURL}
          onChange={inputOnChange}
          validation={value.contactURL.match(regex) === null}
        />
        {value.contactURL.match(regex) === null ? (
          <span className="validation">URL을 입력해주세요</span>
        ) : null}
      </div>

      <span className="notice" role="img" aria-label="emoji">
        ❗ 배경 이미지는 본인의 프로파일 이미지로 설정됩니다.
      </span>
      <span className="notice" role="img" aria-label="emoji">
        ❗ 부적절한 모임은 관리자가 임의로 삭제할 수 있습니다.
      </span>
      <span className="notice" role="img" aria-label="emoji">
        🎁 가끔 홈페이지 제작자와 모각코를 할 수 있어요.
      </span>
      <SendButton onClick={send}>
        {type === "add" ? "등록하기" : "수정하기"}
      </SendButton>
    </Container>
  );
}

export default RoomEditor;
