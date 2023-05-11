import { LOAD_LOCATIONS } from "./ModernaTypes";

  
  export default function ModernaReducer(state, action) {
    const { payload, type } = action;
  
    switch (type) {
      case LOAD_LOCATIONS:
        return {
          ...state,
          location: payload,
        };
      default:
        return state;
    }
  }
  