import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "b66bf574fbb044bb804d3285152fe61a",
  },
});
