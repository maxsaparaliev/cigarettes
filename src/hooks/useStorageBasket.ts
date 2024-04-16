import { LOCALSTORAGE_KEYS } from "@/constants/constants";
import { getBasketData } from "@/store/basket/reducers";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useStorageBasket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageBasketData = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEYS.ITEMS) || "",
    );
    dispatch(getBasketData(localStorageBasketData));
  }, []);
};
