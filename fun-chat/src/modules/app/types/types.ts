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
