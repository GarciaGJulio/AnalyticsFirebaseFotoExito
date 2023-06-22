import moment from "moment";
import uuid from "react-native-uuid";

let constantUUID = null;

export const generateUIDD = () => {
  if (!constantUUID) {
    constantUUID = uuid.v4();
  }
  return uuid.v4();
};

/*export const dataTime = () => {
  console.log(
    "mi fecha ecuador::::::",
    moment().toISOString().format("DD/MM/YYYY HH:mm:ss")
  );
  return moment().format("DD/MM/YYYY HH:mm:ss");
};*/

export const dataTime = () => {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return formattedDate;
};

export const generateUIDDGeneric = () => {
  constantUUID = uuid.v4();

  return uuid.v4();
};
