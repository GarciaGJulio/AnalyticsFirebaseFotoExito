import moment from "moment";
import uuid from "react-native-uuid";

const constantUUID = uuid.v4();

export const generateUIDD = () => {
  return constantUUID;
};

export const dataTime = () => {
  return moment().toISOString();
};
