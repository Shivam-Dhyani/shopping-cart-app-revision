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
  // const [productList, setProductList] = useState([]);

  // useEffect(() => {
  //   const apiCall = async () => {
  //     await axios
  //       .get("https://fakestoreapi.com/products?limit=10")
  //       .then((response) => {
  //         setProductList(response.data);
  //       });
  //   };
  //   apiCall();
  // }, []);

  const inStockValueArray = [0, 3, 5, 6, 7];
  const ratingsValueArray = [1, 2, 3, 4, 5];
  const productList = [...Array(20)].map(() => {
    return {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.business(),
      inStock:
        inStockValueArray[Math.floor(Math.random() * inStockValueArray.length)],
      fastDelivery: Math.floor(Math.random() * 2),
      ratings:
        ratingsValueArray[Math.floor(Math.random() * ratingsValueArray.length)],
    };
  });

  const [state, dispatch] = useReducer(cartReducer, {
    productList,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
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
