import { createContext, useContext, useReducer } from "react";
import { data } from "./data";
import { reducerFun } from "./reducerProduct";

const ProductContext = createContext([]);

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFun, {
    data,
    stockSorted: false,
    fastSorted: false,
    minPrice: 0,
    maxPrice: 9999999999,
    sortbyPrice: null
  });

  const dataSortbyPrice = ({ data, sortbyPrice }) => {
    if (sortbyPrice === "high") {
      return [...data].sort((a, b) => b.price - a.price);
    } else if (sortbyPrice === "low") {
      return [...data].sort((a, b) => a.price - b.price);
    } else {
      return data;
    }
  };

  const filterDatabyStock = ({ stockSorted }, productData) => {
    return productData.filter((item) => (stockSorted ? item.inStock : true));
  };

  const filterDatabyDelivery = ({ fastSorted }, productData) => {
    return productData.filter((item) =>
      fastSorted ? item.fastDelivery : true
    );
  };

  const filterDatabyPrice = ({ minPrice, maxPrice }, productData) => {
    return productData.filter(
      (item) => Number(item.price) > minPrice && Number(item.price) < maxPrice
    );
  };

  const compose = (...args) => {
    const output = args.reduce((acc, curr) => {
      acc = curr(state, acc);
      return acc;
    }, state);
    return output;
  };
  const filterDataPrice = compose(
    dataSortbyPrice,
    filterDatabyStock,
    filterDatabyDelivery,
    filterDatabyPrice
  );

  return (
    <ProductContext.Provider value={{ filterDataPrice, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { useProduct, ProductProvider };
