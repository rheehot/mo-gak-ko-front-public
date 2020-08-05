import { gql } from "apollo-boost";

export const READ_NOTIFICATION = gql`
  mutation readNotification {
    readNotification
  }
`;

export const RESET_COUNT = gql`
  {
    me {
      notificationCount
    }
  }
`;

export const NOTIFICATIONS = gql`
  {
    me {
      notifications {
        id
        room {
          id
          title
          isManager
          isMember
        }
        type
        message
        createdAt
      }
    }
  }
`;
