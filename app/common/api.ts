import axios from "axios";
const checkResponse = (res) => {
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
};

export const getCountries = async (query: string) => {
  let res;
  if (query.trim().length === 0) {
    res = await axios.get(`/api/countries`);
    checkResponse(res);
    return res.data.data;
  } else {
    res = await axios.post(`/api/countries`, { country: query });
    checkResponse(res);
    return [res.data.data];
  }
};
