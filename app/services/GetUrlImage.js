import axios from "axios";

export const getItemIdImgOneDrive = async (imgId) => {
  try {
    const {
      data: { token },
    } = await axiosGetToken();
    let itemResponse1 = await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/root:/Test/${imgId}.png`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let itemResponse = await itemResponse1.json();
    if (itemResponse1.status === 200) {
      return itemResponse;
    } else {
      throw new Error("error");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const axiosGetToken = async () => {
  let response;
  try {
    const data = {
      clientSecret: "wQU8Q~WjEgKYC1U9ggNVBY8XV3PQi1ckWKX4ia.p",
    };
    response = await axios.post(ConstantsModerna.enpoints.getAccesToken, data);
    return response;
  } catch (e) {
    console.log(e);
    response = e;
    throw new Error(e);
  }
};
