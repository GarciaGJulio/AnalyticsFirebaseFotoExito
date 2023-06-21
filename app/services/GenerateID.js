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
  console.log("mi fecha ecuador::::::", moment().format("DD/MM/YYYY HH:mm:ss"));
  return moment().format("DD/MM/YYYY HH:mm:ss");
};

export const generateUIDDGeneric = () => {
  constantUUID = uuid.v4();

  return uuid.v4();
};
