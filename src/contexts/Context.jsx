import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "../reducers/Reducer";

const Cart = createContext();

const Context = ({ children }) => {
  const inStockValueArray = [0, 3, 5, 6, 7];
  const ratingsValueArray = [1, 2, 3, 4, 5];

  const apiCall = async (setIsLoading, isLoading) => {
    await axios.get("https://fakestoreapi.com/products").then((response) => {
      let products = [...response.data];
      products.map((prod, idx) => {
        products[idx] = {
          id: prod.id,
          name: prod.title,
          price: prod.price,
          image: prod.image,
          inStock:
            inStockValueArray[
              Math.floor(Math.random() * inStockValueArray.length)
            ],
          fastDelivery: Math.floor(Math.random() * 2),
          ratings:
            ratingsValueArray[
              Math.floor(Math.random() * ratingsValueArray.length)
            ],
        };
      });
      console.log(products);
      setIsLoading(false);
      dispatch({
        type: "PRODUCT_LIST_ADDED",
        payload: products,
      });
    });
  };

  faker.seed(2023);

  const [state, dispatch] = useReducer(cartReducer, {
    productList: [],
    cart: [],
    apiCall,
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider
      value={{ state, dispatch, productState, productDispatch, apiCall }}
    >
      {children}
    </Cart.Provider>
  );
};

// Default Export
export default Context;

// Named Export
export const CartState = () => {
  return useContext(Cart);
};
