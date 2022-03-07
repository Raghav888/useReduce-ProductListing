import { useProduct } from "./product-context";

export const Product = () => {
  const { filterDataPrice, dispatch } = useProduct();

  return (
    <div>
      <div>
        <fieldset>
          <legend>Sort By:</legend>
          <input
            type="radio"
            name="filter"
            onClick={() => dispatch({ type: "HIGH" })}
          />
          <label>High to Low</label>

          <input
            type="radio"
            name="filter"
            onClick={() => dispatch({ type: "LOW" })}
          />
          <label>Low to High </label>
        </fieldset>
      </div>

      <div>
        <fieldset>
          <legend>Filters</legend>
          <input
            type="checkbox"
            onClick={() => dispatch({ type: "REMOVE_OUT_OF_STOCK" })}
          />
          <label> Remove Out of stock</label>

          <input
            type="checkbox"
            onClick={() => dispatch({ type: "FAST_DELIVERY" })}
          />
          <label> Fast Delivery Only</label>

          <label>Min</label>
          <input
            type="number"
            style={{ width: "40px", marginRight: "10px" }}
            onChange={(event) =>
              dispatch({ type: "MIN_PRICE", value: event.target.value })
            }
          />

          <label>Max</label>
          <input
            type="number"
            style={{ width: "40px" }}
            onChange={(event) =>
              dispatch({ type: "MAX_PRICE", value: event.target.value })
            }
          />
        </fieldset>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {" "}
        {filterDataPrice.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <div
              key={id}
              style={{
                border: "1px solid #4B5563",
                borderRadius: "0 0 0.5rem 0.5rem",
                margin: "1rem",
                maxWidth: "40%",
                padding: "0 0 1rem"
              }}
            >
              <img src={image} width="100%" height="auto" alt={productName} />
              <h3> {name} </h3>
              <div>Rs. {price}</div>
              {inStock && <div> In Stock </div>}
              {!inStock && <div> Out of Stock </div>}
              <div>{level}</div>
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};
