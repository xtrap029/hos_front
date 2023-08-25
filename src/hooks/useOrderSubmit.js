import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useOrderSubmit = (order) => {
  return useMutation(
    ["orderSubmit"],
    async () => {
      return await axios.post('https://run.mocky.io/v3/e97a2c38-5ae3-4f73-9b11-cb60eac00adf', order);
    }
  );
};
