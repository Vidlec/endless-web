import Axios from "axios";

export default store => (method, url, data) =>
  Axios({
    method,
    url,
    data,
    headers: {
      Authorization: store.userId
    }
  });
