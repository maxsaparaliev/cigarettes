import {LOCALSTORAGE_KEYS} from "@/constants/constants";
import {getBasketData} from "@/store/basket/reducers";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

export const useStorageBasket = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    if (localStorage.getItem(LOCALSTORAGE_KEYS.ITEMS)) {
      const localStorageBasketData = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEYS.ITEMS) || "",
      );
      try {
        dispatch(getBasketData(localStorageBasketData));
      } catch (e) {
        return console.error(e); // error in the above string (in this case, yes)!
      }
      // if no error, we can now keep using "a"
    }
  }, []);
};
