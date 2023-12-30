import axios from "axios";

const API = {
  async part_one(info) {
    console.log(info);
    let { data } = await axios.post("/api/part_one", info);
    console.log(data);
    return data;
  },
  async part_two(info) {
    let { data } = await axios.post("/api/part_two", info);
    return data;
  },
  async order_test(info) {
    let { data } = await axios.post("/api/startTime", info);
    return data;
  },
};

export default API;
