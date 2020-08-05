import { gql } from "apollo-boost";

export const RELEASE_MEMBER = gql`
  mutation releaseMember($participantId: Int!) {
    releaseMember(participantId: $participantId)
  }
`;

export const WITHDRAW_MEMBER = gql`
  mutation withdrawMember($roomId: Int!) {
    withdrawMember(roomId: $roomId)
  }
`;
