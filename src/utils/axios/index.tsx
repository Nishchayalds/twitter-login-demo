import rnAxios from "axios";
import { base } from "../../config";

const axios = rnAxios.create({
  headers: {
    "x-api-key": base.X_API_KEY,
  },
});

export default axios;
