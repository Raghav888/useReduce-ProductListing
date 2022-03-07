export const reducerFun = (state, action) => {
  let val = action.type;
  switch (val) {
    case "LOW":
      return {
        ...state,
        sortbyPrice: "low"
      };
    case "HIGH":
      return {
        ...state,
        sortbyPrice: "high"
      };
    case "REMOVE_OUT_OF_STOCK":
      return { ...state, stockSorted: !state.stockSorted };

    case "FAST_DELIVERY":
      return {
        ...state,
        fastSorted: !state.fastSorted
      };

    case "MAX_PRICE":
      return { ...state, maxPrice: action.value };
    case "MIN_PRICE":
      return { ...state, minPrice: action.value };

    default:
      return state;
  }
};
