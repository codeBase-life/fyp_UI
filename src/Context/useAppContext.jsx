import { useContext } from "react";
import { AppContext } from "./AppContextObject";

export const useAppContext = () => {
  return useContext(AppContext);
};
