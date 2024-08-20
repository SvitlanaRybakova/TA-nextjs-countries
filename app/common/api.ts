import axios from "axios";

export const getCountries = async () => {
  const res = await axios.get(`/api/countries`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};
