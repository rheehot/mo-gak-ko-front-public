import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

import { device } from "../styles/responsive";
import { CREATE_ROOM, ROOMS, ROOM_COUNT } from "../queries/roomQueries";
import { ArrowLeft } from "../components/Icon";
import RoomEditor from "../components/RoomEditor";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: 820px) {
    padding: 20px 10px;
  }

  & .top-box {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #bbb;
    padding: 10px 0;
    margin-bottom: 20px;

    & .head-title {
      font-size: 20px;
      font-weight: 600;
      margin-left: 20px;
      @media ${device.mobileL} {
        margin-left: 10px;
      }
    }
  }

  & .bottom-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

// ! END

function Add() {
  const { push } = useHistory();
  const [value, setValue] = useState({
    area: "",
    title: "",
    description: "",
    contactURL: "",
  });
  const [status, setStatus] = useState<boolean>(false);

  const [createRoom] = useMutation<{ createRoom: { id: number } }>(
    CREATE_ROOM,
    {
      refetchQueries: [{ query: ROOMS }, { query: ROOM_COUNT }],
    }
  );

  const regex = /^(http(s)?):\/\/[^\s$.?#].[^\s]*$/gm;

  const inputOnChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value: inputValue, name },
    } = event;

    if (name === "area" && inputValue.length > 6) {
      return null;
    }
    if (name === "title" && inputValue.length > 18) {
      return null;
    }
    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const textareaOnChange = (
    event: React.SyntheticEvent<HTMLTextAreaElement>
  ) => {
    const { currentTarget } = event;
    setValue((prev) => ({
      ...prev,
      [currentTarget.name]: currentTarget.value,
    }));
    currentTarget.style.height = "1px";
    currentTarget.style.height = `${currentTarget.scrollHeight + 12}px`;
  };

  const send = async (event: never) => {
    if (status) return null;
    if (
      value.area === "" ||
      value.title === "" ||
      value.description === "" ||
      value.contactURL === ""
    ) {
      return toast.error("모든 항목을 입력해주세요");
    } else if (value.contactURL.match(regex) === null) {
      return toast.error("올바른 URL을 입력해주세요");
    }
    try {
      setStatus(true);
      const { data } = await createRoom({
        variables: {
          ...value,
        },
      });
      toast.success("모임이 등록되었습니다");
      push(`/room/${data?.createRoom.id}/detail`);
    } catch (e) {
      setStatus(false);
      toast.error(e.message.replace("GraphQL error: ", ""));
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Helmet>
        <title>모각코 | 모임 등록</title>
      </Helmet>
      <Container>
        <div className="top-box">
          <Link to="/">
            <ArrowLeft size="24px" />
          </Link>
          <span className="head-title">모임 등록</span>
        </div>
        <RoomEditor
          type="add"
          value={value}
          regex={regex}
          inputOnChange={inputOnChange}
          textareaOnChange={textareaOnChange}
          send={send}
        />
      </Container>
    </>
  );
}

export default Add;
