import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { _RoomPublic, _RoomPrivate } from "../../interfaces/roomType";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../../components/Icon";
import { device } from "../../styles/responsive";
import MemberList from "../../components/MemberList";
import PendingList from "../../components/PendingList";

// * Public
const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: 20px 10px;

  & .withdraw-message {
    margin: 0 auto;
    line-height: 20px;

    @media ${device.mobileL} {
      font-size: 14px;
    }
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  & .title-box {
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 2px solid #bbb;

    & .title {
      font-weight: 600;
      font-size: 24px;
      margin-left: 20px;
      @media ${device.mobileL} {
        font-size: 20px;
        margin-left: 10px;
      }
    }
  }

  & .area-box {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    & .area {
      padding: 2px 4px;
      margin-right: 10px;
      border: 2px solid #bbb;
      border-radius: 5px;
      color: ${(props) => props.theme.color.black};
    }
  }

  & .manager-box {
    display: flex;
    margin-bottom: 10px;
    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    & > a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      & .username {
        font-weight: 600;
      }
      & .manager {
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }

  & .description-box {
    display: flex;
    flex-direction: column;
    line-height: 25px;
    margin-bottom: 10px;
    word-wrap: break-word;

    & .text {
      font-weight: 700;
    }
  }
`;

const ButtonBox = styled.div<{ isPending: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #bbb;
  @media ${device.mobileL} {
    padding: 15px 10px;
  }

  & .validation {
    color: ${(props) => props.theme.color.red};
    @media ${device.mobileL} {
      font-size: 14px;
    }
  }
  & .alert {
    margin: 5px 0;
    @media ${device.mobileL} {
      font-size: 14px;
    }
  }

  & button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    padding: 10px;
    border-radius: 7px;
    color: ${(props) => props.theme.color.white};
    background-color: ${(props) =>
      props.isPending
        ? props.theme.bgColor.redBtn
        : props.theme.bgColor.greenBtn};
    cursor: pointer;
  }
  & .not-login {
    color: ${(props) => props.theme.color.white};
    background-color: ${(props) => props.theme.bgColor.blueBtn};
  }
`;

const Input = styled.input<{ value: string; validation: boolean }>`
  all: unset;
  max-width: 300px;
  width: 100%;
  padding: 8px 10px;
  margin: ${(props) => (props.validation ? "20px 0 4px 0" : "20px 0")};
  border: 2px solid
    ${(props) => {
      if (props.value.length === 0) {
        return props.theme.borderColor.dangerZone;
      } else {
        return props.theme.bgColor.greenBtn;
      }
    }};
`;

// * Private

const URL = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 17px;
  & button {
    all: unset;
    padding: 10px;
    border-radius: 7px;
    color: ${(props) => props.theme.color.white};
    background-color: ${(props) => props.theme.color.logo};
    cursor: pointer;
  }
  & .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    & .URL {
      margin-bottom: 10px;
      padding: 5px;
      border: 2px solid ${(props) => props.theme.color.logo};
      border-radius: 10px;
      word-break: break-all;
    }
    & .alert {
      font-weight: 600;
    }
  }
`;

const MemberBox = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
  & .top-box {
    & .title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-right: 10px;
    }
  }
`;

const EditLink = styled(Link)`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  padding: 10px;
  border-radius: 7px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.bgColor.redBtn};
  cursor: pointer;
`;

const Button = styled.button<{
  isMember: boolean | undefined;
}>`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  padding: 10px;
  border-radius: 7px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) =>
    props.isMember === true
      ? props.theme.bgColor.redBtn
      : props.theme.bgColor.greenBtn};
  cursor: pointer;
`;

// ! END

type _Props = {
  auth?: boolean;
  appeal: string;
  status: {
    URL: boolean;
    withdraw: boolean;
  };
  onChange: (event: SyntheticEvent<HTMLInputElement>) => null | undefined;
  onClick: (event: never) => Promise<string | number | null | undefined>;
  allowFunc: (id: number) => Promise<null | undefined>;
  denyFunc: (
    id: number,
    state: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    ref: React.RefObject<HTMLInputElement>
  ) => Promise<string | number | void | null>;
  releaseFunc: (id: number) => Promise<null | undefined>;
  openURL: (event: never) => void;
  withdraw: (event: never) => Promise<void | null>;
  publicData: _RoomPublic;
  privateData?: _RoomPrivate;
};

function RoomPresenter({
  auth,
  appeal,
  status,
  onChange,
  onClick,
  allowFunc,
  denyFunc,
  releaseFunc,
  openURL,
  withdraw,
  publicData,
  privateData,
}: _Props) {
  return (
    <>
      <Helmet>
        <title>모각코 | {publicData.title}</title>
        <meta
          name="description"
          content={publicData.description}
          data-react-helmet="true"
        />
      </Helmet>
      <Container>
        <InfoBox>
          <div className="title-box">
            <Link to="/">
              <ArrowLeft size="24px" />
            </Link>
            <span className="title">{publicData.title}</span>
          </div>
          <div className="area-box">
            <span className="area">{publicData.area}</span>
            <span className="count">‍{publicData.memberCount}명</span>
          </div>

          <div className="manager-box">
            <img src={publicData.manager.imageUrl} alt="img" />
            <a
              href={`https://github.com/${publicData.manager.username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="username">{publicData.manager.username}</span>
              <span className="manager">모임장</span>
            </a>
          </div>
          <div className="description-box">
            <span className="text">모임 설명</span>
            {publicData.description.split("\n").map((line, index) => (
              <span key={index}>{line}</span>
            ))}
          </div>
        </InfoBox>
        <ButtonBox isPending={publicData.isPending}>
          {!auth ? null : !publicData.isPending &&
            !publicData.isManager &&
            !publicData.isMember ? (
            <>
              <Input
                type="text"
                placeholder="구성원에게 나를 소개해봐요 (30자 이내)"
                value={appeal}
                onChange={onChange}
                validation={appeal.length === 30}
              />
              {appeal.length === 30 ? (
                <span className="validation">더 이상 입력할 수 없어요</span>
              ) : null}
              <span className="alert" role="img" aria-label="emoji">
                📌 가입 후 수정할 수 없으니 신중하게 적어주세요 :)
              </span>
            </>
          ) : null}
          {!auth ? (
            <button className="not-login" onClick={onClick}>
              로그인하여 가입 신청
            </button>
          ) : !publicData.isManager && !publicData.isMember ? (
            <button onClick={onClick}>
              {!publicData.isPending ? "참가 신청" : "요청 취소"}
            </button>
          ) : null}
        </ButtonBox>
        {privateData ? (
          <>
            <URL>
              {!status.URL ? (
                <button onClick={openURL}>채팅방 참가</button>
              ) : (
                <div className="box">
                  <a
                    href={privateData.contactURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="URL"
                  >
                    {privateData.contactURL}
                  </a>
                  <span className="alert" role="img" aria-label="emoji">
                    ❗ 의심스러운 URL은 클릭하지 마세요.
                  </span>
                </div>
              )}
            </URL>

            {privateData.pendings.length !== 0 ? (
              <MemberBox className="pending-list">
                <div className="top-box">
                  <span className="title" role="img" aria-label="emoji">
                    🙏 참가 요청
                  </span>
                </div>
                {privateData.pendings.map((item) => (
                  <PendingList
                    key={item.id}
                    id={item.id}
                    type="pending"
                    imageUrl={item.user.imageUrl}
                    username={item.user.username}
                    appeal={item.appeal}
                    isManager={publicData.isManager}
                    allowFunc={allowFunc}
                    denyFunc={denyFunc}
                  />
                ))}
              </MemberBox>
            ) : null}

            <MemberBox className="member-list">
              <div className="top-box">
                <span className="title" role="img" aria-label="emoji">
                  🤝 참여자
                </span>
                <span className="count">{publicData.memberCount}명</span>
              </div>
              <>
                {privateData.participants ? (
                  <>
                    <MemberList
                      id={0}
                      type="member"
                      imageUrl={privateData.manager.imageUrl}
                      username={privateData.manager.username}
                      isManager={publicData.isManager}
                      isMe={true}
                      releaseFunc={releaseFunc}
                    />
                    {privateData.participants.map((item) => (
                      <MemberList
                        key={item.id}
                        id={item.id}
                        type="member"
                        imageUrl={item.user.imageUrl}
                        username={item.user.username}
                        appeal={item.appeal}
                        isManager={publicData.isManager}
                        releaseFunc={releaseFunc}
                      />
                    ))}
                  </>
                ) : null}
              </>
            </MemberBox>
            {publicData.isManager ? (
              <EditLink to={`/room/${publicData.id}/edit`}>
                모임을 수정하고 싶어요
              </EditLink>
            ) : (
              <>
                {status.withdraw ? (
                  <span
                    className="withdraw-message"
                    role="img"
                    aria-label="emoji"
                  >
                    📌 모임에서 나가면 다시 가입절차를 밟아야합니다.
                  </span>
                ) : null}
                <Button onClick={withdraw} isMember={publicData.isMember}>
                  {!status.withdraw ? "모임을 나가고 싶어요" : "확인했어요"}
                </Button>
              </>
            )}
          </>
        ) : null}
      </Container>
    </>
  );
}

export default RoomPresenter;
