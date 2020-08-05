import { gql } from "apollo-boost";

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const LOG_USER_OUT = gql`
  mutation {
    logUserOut @client
  }
`;

export const ME = gql`
  {
    me {
      username
      imageUrl
      notificationCount
    }
  }
`;
