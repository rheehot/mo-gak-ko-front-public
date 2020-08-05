export type _RoomPublic = {
  id: number;
  area: string;
  title: string;
  description: string;
  manager: {
    username: string;
    imageUrl: string;
  };
  isManager: boolean;
  isPending: boolean;
  isMember: boolean;
  memberCount: boolean;
};

export type _RoomPrivate = {
  contactURL: string;
  manager: {
    username: string;
    imageUrl: string;
  };
  participants: {
    id: number;
    user: {
      imageUrl: string;
      username: string;
    };
    appeal: string;
  }[];
  pendings: {
    id: number;
    user: {
      imageUrl: string;
      username: string;
    };
    appeal: string;
  }[];
};
