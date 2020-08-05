import React, { useState, useEffect, SyntheticEvent } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link, useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import styled from "styled-components";

import { device } from "../styles/responsive";
import {
  UPDATE_ROOM,
  ROOMS,
  ROOM_PUBLIC,
  ROOM_PRIVATE,
  DELETE_ROOM,
  ROOM_COUNT,
} from "../queries/roomQueries";
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

const DangerZone = styled.div`
  width: 90%;
  padding-top: 15px;
  margin: 0 auto;
  border-top: 1px solid #bbb;
  & .title {
    font-size: 20px;
    font-weight: 600;
  }

  & ul {
    width: 100%;
    margin-top: 12px;
    border: 1px solid ${(props) => props.theme.borderColor.dangerZone};
    border-radius: 5px;

    & li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      font-size: 14px;

      & .item-title {
        font-weight: 600;
      }
      & button {
        all: unset;
        padding: 6px 12px;
        font-weight: 600;
        border: 1px solid #bbb;
        border-radius: 5px;
        color: ${(props) => props.theme.color.red};
        background-color: #fafbfc;
        background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
        cursor: pointer;
      }
    }
    & li:not(:last-child) {
      border-bottom: 1px solid #bbb;
    }
  }
`;

// ! END

type _Public = {
  area: string;
  title: string;
  description: string;
  contactURL: string;
  recruiting: boolean;
  isManager: boolean;
  isMember: boolean;
};
type _Private = {
  contactURL: string;
};

function RoomEdit() {
  const { roomId } = useParams();
  const { push } = useHistory();

  const { data: publicData } = useQuery<{ roomPublic: _Public }>(ROOM_PUBLIC, {
    variables: { roomId: Number(roomId) },
  });
  const { data: privateData } = useQuery<{ roomPrivate: _Private }>(
    ROOM_PRIVATE,
    {
      skip: !publicData?.roomPublic.isManager,
      variables: { roomId: Number(roomId) },
    }
  );

  const regex = /^(http(s)?):\/\/[^\s$.?#].[^\s]*$/gm;

  const [value, setValue] = useState({
    area: publicData?.roomPublic.area || "",
    title: publicData?.roomPublic.title || "",
    description: publicData?.roomPublic.description || "",
    contactURL: privateData?.roomPrivate.contactURL || "",
  });

  const [status, setStatus] = useState({
    delete: false,
    edit: false,
  });

  const [updateRoom] = useMutation(UPDATE_ROOM, {
    refetchQueries: [
      { query: ROOM_PUBLIC, variables: { roomId: Number(roomId) } },
      { query: ROOM_PRIVATE, variables: { roomId: Number(roomId) } },
      { query: ROOMS },
    ],
  });
  const [deleteRoom] = useMutation(DELETE_ROOM, {
    variables: { roomId: Number(roomId) },
    refetchQueries: [{ query: ROOM_COUNT }, { query: ROOMS }],
  });

  const inputOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
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

  const textareaOnChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    const { currentTarget } = event;
    setValue((prev) => ({
      ...prev,
      [currentTarget.name]: currentTarget.value,
    }));
    currentTarget.style.height = "1px";
    currentTarget.style.height = `${currentTarget.scrollHeight + 12}px`;
  };

  const send = async (event: never) => {
    if (
      value.area === "" ||
      value.title === "" ||
      value.description === "" ||
      value.contactURL === ""
    ) {
      toast.error("모든 항목을 입력해주세요");
      return null;
    } else if (value.contactURL.match(regex) === null) {
      return toast.error("올바른 URL을 입력해주세요");
    }
    if (status.edit) {
      return null;
    }
    setStatus((prev) => ({ ...prev, edit: true }));
    try {
      await updateRoom({
        variables: {
          roomId: Number(roomId),
          ...value,
        },
      });
      toast.success("모임이 수정되었습니다");
      push(`/room/${roomId}`);
    } catch (e) {
      setStatus((prev) => ({ ...prev, edit: false }));
    }
  };

  const deleteBtn = async (event: never) => {
    if (status.delete) {
      return null;
    }
    setStatus((prev) => ({ ...prev, delete: true }));
    try {
      await deleteRoom();
      toast.success("모임이 삭제되었습니다");
      push("/");
    } catch (e) {
      toast.error(e.message);
      setStatus((prev) => ({ ...prev, delete: false }));
    }
  };

  useEffect(() => {
    if (privateData === undefined) {
      push("/");
    }
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>모각코 | 모임 수정</title>
      </Helmet>
      {privateData ? (
        <Container>
          <div className="top-box">
            <Link to={`/room/${roomId}`}>
              <ArrowLeft size="24px" />
            </Link>
            <span className="head-title">모임 설정</span>
          </div>
          <div className="bottom-box">
            <RoomEditor
              type="edit"
              value={value}
              regex={regex}
              inputOnChange={inputOnChange}
              textareaOnChange={textareaOnChange}
              send={send}
            />
          </div>
          <DangerZone>
            <span className="title">Danger Zone</span>
            <ul>
              <li>
                <span className="item-title">이 모임을 삭제</span>
                <button onClick={deleteBtn}>삭제</button>
              </li>
            </ul>
          </DangerZone>
        </Container>
      ) : null}
    </>
  );
}

export default RoomEdit;
