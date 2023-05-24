export const convertImageUrl = (url) => {
  const convertedUrl = url.replace("https://ibb.co/", "https://i.ibb.co/");
  return convertedUrl;
};
