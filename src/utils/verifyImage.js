import getBase64 from "./getBase64";
import axios from "axios";

export default (image, name) => {
  return new Promise((resolve, reject) => {
    getBase64(image, base64 => {
      return axios.post(
        "https://jfuzi5ahih.execute-api.eu-west-1.amazonaws.com/dev/recognize",
        base64
      );
    });
  });
};
