export type socketGeneralType = {
  id: string | null;
  type: string;
  payload: object;
};

export type routerType = {
  uri: string;
  view: string;
  auth: boolean;
};

export type socketActiveUsers = {
  id: string;
  type: string;
  payload: object;
};

export type activeUsersListType = {
  login: string;
  isLogined: boolean;
};

export type userAllMessagesType = {
  id: string;
  type: "MSG_FROM_USER";
  payload: {
    messages: [];
  };
};

export type userMessageType = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
};
