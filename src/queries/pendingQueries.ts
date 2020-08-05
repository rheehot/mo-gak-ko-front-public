import { gql } from "apollo-boost";

export const CREATE_PENDING = gql`
  mutation createPending($roomId: Int!, $appeal: String!) {
    createPending(roomId: $roomId, appeal: $appeal)
  }
`;

export const DELETE_PENDING = gql`
  mutation deletePending($roomId: Int!) {
    deletePending(roomId: $roomId)
  }
`;

export const ALLOW_PENDING = gql`
  mutation allowPending($pendingId: Int!) {
    allowPending(pendingId: $pendingId)
  }
`;

export const DENY_PENDING = gql`
  mutation denyPending($pendingId: Int!, $message: String!) {
    denyPending(pendingId: $pendingId, message: $message)
  }
`;
