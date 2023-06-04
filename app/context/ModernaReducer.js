import { LOAD_ID_CLIENT_GROUP, LOAD_INFO_SCREEN, LOAD_LOCATIONS } from "./ModernaTypes";


export default function ModernaReducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case LOAD_LOCATIONS:
      return {
        ...state,
        location: payload,
      };
    case LOAD_ID_CLIENT_GROUP:
      return {
        ...state,
        idClientGroup: payload,
      };
    case LOAD_INFO_SCREEN:
      return {
        ...state,
        infoScreen: payload,
      };
    default:
      return state;
  }
}
