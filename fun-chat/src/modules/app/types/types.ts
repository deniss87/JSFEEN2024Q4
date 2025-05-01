type socketMsgType = {
  id: string;
  type: string;
  payload: {}
};

type routerType = {
  uri: string;
  view: string;
  auth: boolean
}

export { socketMsgType, routerType };