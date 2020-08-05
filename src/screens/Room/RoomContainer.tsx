import React, { SyntheticEvent, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";

import { ROOM_PUBLIC, ROOM_PRIVATE } from "../../queries/roomQueries";
import {
  CREATE_PENDING,
  DELETE_PENDING,
  ALLOW_PENDING,
  DENY_PENDING,
} from "../../queries/pendingQueries";
import { IS_LOGGED_IN } from "../../queries/globalQueries";
import { useState } from "react";
import RoomPresenter from "./RoomPresenter";
import NotFound from "../../components/NotFound";
import RoomPublicSkeleton from "../../components/skeleton/RoomPublicSkeleton";
import { _RoomPublic, _RoomPrivate } from "../../interfaces/roomType";
import {
  RELEASE_MEMBER,
  WITHDRAW_MEMBER,
} from "../../queries/participantQueries";

function RoomContainer() {
  const { roomId } = useParams();
  const { push } = useHistory();

  // ! API
  const { data: auth } = useQuery<{ isLoggedIn: boolean }>(IS_LOGGED_IN);
  const { data: publicData, error } = useQuery<{ roomPublic: _RoomPublic }>(
    ROOM_PUBLIC,
    {
      variables: {
        roomId: Number(roomId),
      },
    }
  );
  const { data: privateData } = useQuery<{ roomPrivate: _RoomPrivate }>(
    ROOM_PRIVATE,
    {
      skip:
        !publicData ||
        (!publicData!.roomPublic.isManager && !publicData!.roomPublic.isMember),
      variables: { roomId: Number(roomId) },
    }
  );

  // ! useState
  const [appeal, setAppeal] = useState<string>("");
  const [createStat, setCreateStat] = useState(false);
  const [cancelStat, setCancelStat] = useState(false);
  const [status, setStatus] = useState({
    URL: false,
    withdraw: false,
  });
  const [apiStatus, setApiStatus] = useState({
    allow: false,
    deny: false,
    kick: false,
    withdraw: false,
  });

  // ! Mutation
  const [createPending] = useMutation<{ createPending: boolean }>(
    CREATE_PENDING,
    {
      variables: { roomId: Number(roomId), appeal },
      refetchQueries: [
        { query: ROOM_PUBLIC, variables: { roomId: Number(roomId) } },
      ],
    }
  );
  const [deletePending] = useMutation<{ deletePending: boolean }>(
    DELETE_PENDING,
    {
      variables: { roomId: Number(roomId) },
      refetchQueries: [
        { query: ROOM_PUBLIC, variables: { roomId: Number(roomId) } },
      ],
    }
  );
  const [allowPending] = useMutation(ALLOW_PENDING, {
    refetchQueries: [
      { query: ROOM_PRIVATE, variables: { roomId: Number(roomId) } },
    ],
  });
  const [denyPending] = useMutation(DENY_PENDING, {
    refetchQueries: [
      { query: ROOM_PRIVATE, variables: { roomId: Number(roomId) } },
    ],
  });
  const [releaseParticipant] = useMutation(RELEASE_MEMBER, {
    refetchQueries: [
      { query: ROOM_PRIVATE, variables: { roomId: Number(roomId) } },
    ],
  });
  const [withdrawMember] = useMutation(WITHDRAW_MEMBER, {
    variables: { roomId: Number(roomId) },
  });

  // ! Public Function
  const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    if (value.length > 30) {
      return null;
    }
    setAppeal(value);
  };

  const onClick = async (event: never) => {
    if (!auth?.isLoggedIn) {
      return (window.location.href =
        process.env.NODE_ENV === "production"
          ? `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_PROD_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_PROD_GITHUB_REDIRECT_URL}`
          : `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_DEV_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_DEV_GITHUB_REDIRECT_URL}`);
    }
    if (publicData?.roomPublic.isPending) {
      if (cancelStat) return null;
      try {
        setCancelStat(true);
        await deletePending();
        toast.success("취소 되었습니다");
        setCancelStat(false);
      } catch (e) {
        setCancelStat(false);
        toast.error(e.message);
      }
    } else {
      if (appeal === "") {
        return toast.error("본인을 소개 해주세요");
      } else if (createStat) return null;
      try {
        setCreateStat(true);
        await createPending();
        toast.success("가입 신청 되었습니다");
        setAppeal("");
        setCreateStat(false);
      } catch (e) {
        setCreateStat(false);
        toast.error(e.message);
      }
    }
  };

  // ! Private Function
  async function allowFunc(id: number) {
    if (apiStatus.allow) {
      return null;
    }
    setApiStatus((prev) => ({ ...prev, allow: true }));
    try {
      await allowPending({ variables: { pendingId: id } });
      setApiStatus((prev) => ({ ...prev, allow: false }));
    } catch (e) {
      setApiStatus((prev) => ({ ...prev, allow: false }));
    }
  }
  async function denyFunc(
    id: number,
    state: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    ref: React.RefObject<HTMLInputElement>
  ) {
    if (apiStatus.deny) {
      return null;
    }
    if (!state) {
      return setter(true);
    }
    const message = ref.current?.value;
    if (message === "") {
      return toast.error("사유를 입력해주세요");
    }
    setApiStatus((prev) => ({ ...prev, deny: true }));
    try {
      await denyPending({ variables: { pendingId: id, message } });
      setApiStatus((prev) => ({ ...prev, deny: false }));
    } catch (e) {
      setApiStatus((prev) => ({ ...prev, deny: false }));
    }
  }
  async function releaseFunc(id: number) {
    if (apiStatus.kick) {
      return null;
    }
    setApiStatus((prev) => ({ ...prev, kick: true }));
    try {
      await releaseParticipant({ variables: { participantId: id } });
      setApiStatus((prev) => ({ ...prev, kick: false }));
    } catch (e) {
      setApiStatus((prev) => ({ ...prev, kick: false }));
    }
  }
  const openURL = (event: never) => {
    setStatus((prev) => ({ ...prev, URL: true }));
  };
  const withdraw = async (event: never) => {
    if (!status.withdraw) {
      return setStatus((prev) => ({
        ...prev,
        withdraw: true,
      }));
    }
    if (apiStatus.withdraw) {
      return null;
    }
    setApiStatus((prev) => ({ ...prev, withdraw: true }));
    try {
      await withdrawMember();
      push("/");
    } catch (e) {
      setApiStatus((prev) => ({ ...prev, withdraw: false }));
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // ! return

  if (error) {
    return <NotFound />;
  }
  if (!publicData) {
    return <RoomPublicSkeleton />;
  }

  return (
    <RoomPresenter
      auth={auth?.isLoggedIn}
      appeal={appeal}
      status={status}
      onChange={onChange}
      onClick={onClick}
      allowFunc={allowFunc}
      denyFunc={denyFunc}
      releaseFunc={releaseFunc}
      openURL={openURL}
      withdraw={withdraw}
      publicData={publicData.roomPublic}
      privateData={privateData?.roomPrivate}
    />
  );
}

export default RoomContainer;
