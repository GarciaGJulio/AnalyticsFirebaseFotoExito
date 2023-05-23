import moment from "moment";
import uuid from "react-native-uuid";

export const generateUIDD = () => {
  return uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'
};

export const dataTime = () => {
  return moment().toISOString();
};
