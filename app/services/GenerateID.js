import moment from "moment";
import uuid from "react-native-uuid";

let constantUUID = null;

export const generateUIDD = () => {
  if (!constantUUID) {
    constantUUID = uuid.v4();
  }
  return uuid.v4();
};

export const dataTime = () => {
  return moment().toISOString();
};


export const generateUIDDGeneric = () => {
  
    constantUUID = uuid.v4();
  
  return uuid.v4();
};