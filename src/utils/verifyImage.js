import getBase64 from "./getBase64";

export default (image, name) => {
  return new Promise((resolve, reject) => {
    getBase64(image, base64 => {
      resolve(true);
    });
  });
};
