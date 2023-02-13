import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { cartReducer } from "../reducers/Reducer";

const Cart = createContext();

const Context = ({ children }) => {
  const [productList, setProductList] = useState([]);

  const [state, dispatch] = useReducer(cartReducer, {
    productList: productList,
    cart: [],
  });

  useEffect(() => {
    const apiCall = async () => {
      await axios
        .get("https://fakestoreapi.com/products?limit=10")
        .then((response) => {
          setProductList(response.data);
        });
    };
    apiCall();
  }, []);

  console.log(productList);
  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
