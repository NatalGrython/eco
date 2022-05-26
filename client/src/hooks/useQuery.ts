import { useLocation } from "react-router-dom";

export const useQuery = (key: string) => {
  const { search } = useLocation();
  return new URLSearchParams(search).get(key);
};
