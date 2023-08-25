import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useOrdersData = (id) => {
  return useQuery(
    ["orders"],
    async () => {
      const { data } = await axios.get('http://localhost:3030/orders');
      return data;
    },
    {
      enabled: false,
    }
  );
};
