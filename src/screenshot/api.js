import axios from 'axios';
async function post(url, data) {
  let rs = await fetch(`${window.API_HOST}${url}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      'X-MTV-API-KEY': window.API_SECRET
    },
    body: JSON.stringify(data),
  });

  switch (rs.status) {
    case 200:
      let tmp = await rs.json();
      return tmp;
    default:
      let err = await rs.json();
      throw err;
  }
}
async function put(url, data) {
  let rs = await fetch(`${window.API_HOST}${url}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      'X-MTV-API-KEY': window.API_SECRET
    },
    body: JSON.stringify(data),
  });

  switch (rs.status) {
    case 200:
      let tmp = await rs.json();
      return tmp;
    default:
      let err = await rs.json();
      throw err;
  }
}
async function get(url, data) {
  let rs = await fetch(`${window.API_HOST}${url}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      'X-MTV-API-KEY': window.API_SECRET
    },
  });

  switch (rs.status) {
    case 200:
      let tmp = await rs.json();
      return tmp;
    default:
      let err = await rs.json();
      throw err;
  }
}
async function postFormDataRaw(
  url,
  formdata,
  cb
) {
  let tmp = await axios.request({
    method: "post",
    url: `${window.API_HOST}${url}`,
    data: formdata,
    headers: {
      Accept: "multipart/form-data",
      'X-MTV-API-KEY': window.API_SECRET
    },
    onUploadProgress: (p) => {
      if (cb) cb(p);
    },
  });
  return tmp.data;
}
let api = { post, get, postFormDataRaw, put }
export default api;