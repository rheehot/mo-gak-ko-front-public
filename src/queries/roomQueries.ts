import { gql } from "apollo-boost";

const CARD_FRAGMENT = `
  fragment card on Room {
    id
    imageUrl
    area
    title
    isManager
    isMember
  }
`;

export const ROOMS = gql`
  query rooms($last: Int) {
    rooms(last: $last) {
      ...card
    }
  }
  ${CARD_FRAGMENT}
`;

export const ROOM_COUNT = gql`
  {
    roomCount
  }
`;

export const ROOM_PUBLIC = gql`
  query roomPublic($roomId: Int!) {
    roomPublic(roomId: $roomId) {
      id
      area
      title
      description
      manager {
        username
        imageUrl
      }
      isManager
      isMember
      isPending
      memberCount
    }
  }
`;

export const ROOM_PRIVATE = gql`
  query roomPrivate($roomId: Int!) {
    roomPrivate(roomId: $roomId) {
      contactURL
      manager {
        username
        imageUrl
      }
      participants {
        id
        user {
          imageUrl
          username
        }
        appeal
      }
      pendings {
        id
        user {
          imageUrl
          username
        }
        appeal
      }
    }
  }
`;

export const MY_ROOMS = gql`
  {
    me {
      myRooms {
        ...card
      }
    }
  }
  ${CARD_FRAGMENT}
`;

export const MY_JOINROOMS = gql`
  {
    me {
      joinRooms {
        room {
          ...card
        }
      }
    }
  }
  ${CARD_FRAGMENT}
`;

export const SEARCH_ROOM = gql`
  query searchRoom($keyward: String!) {
    searchRoom(keyward: $keyward) {
      ...card
    }
  }
  ${CARD_FRAGMENT}
`;

export const CREATE_ROOM = gql`
  mutation createRoom(
    $area: String!
    $title: String!
    $description: String!
    $contactURL: String!
  ) {
    createRoom(
      area: $area
      title: $title
      description: $description
      contactURL: $contactURL
    ) {
      id
    }
  }
`;

export const UPDATE_ROOM = gql`
  mutation updateRoom(
    $roomId: Int!
    $area: String!
    $title: String!
    $description: String!
    $contactURL: String!
  ) {
    updateRoom(
      roomId: $roomId
      area: $area
      title: $title
      description: $description
      contactURL: $contactURL
    )
  }
`;

export const DELETE_ROOM = gql`
  mutation deleteRoom($roomId: Int!) {
    deleteRoom(roomId: $roomId)
  }
`;
