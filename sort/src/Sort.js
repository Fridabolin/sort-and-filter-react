import React, { useState, useEffect } from "react";

const Sort = () => {
  const [getMakeup, setGetMakeup] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function fetchMakeup() {
      let response = await fetch(
        "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
      );
      let data = await response.json();
      console.log(data);
      setGetMakeup(data);
    }
    fetchMakeup();
  }, []);

  const sortLow = (e) => {
    setSort(e.target.value);
    console.log(sort);

    if (sort !== "low") {
      getMakeup.sort((a, b) =>
        parseInt(a.price) > parseInt(b.price) ? 1 : -1
      );
    }
  };

  const sortHigh = (e) => {
    setSort(e.target.value);
    console.log(sort);

    if (sort !== "high") {
      getMakeup.sort((a, b) =>
        parseInt(a.price) > parseInt(b.price) ? -1 : 1
      );
    }
  };

  const sortOnProductType = (e) => {
    setSort(e.target.value);
    if (sort !== "product_type") {
      getMakeup.sort((a, b) => a.product_type.localeCompare(b.product_type));
    }
  };

  return (
    <div>
      <p>Sort form on:</p>
      <div className="radioDiv">
        <p>Lowest to highest price</p>
        <input
          type="radio"
          value="low"
          checked={sort === "low"}
          onChange={sortLow}
        ></input>
      </div>
      <div className="radioDiv">
        <p>Highest to lowest price</p>
        <input
          type="radio"
          value="heigh"
          checked={sort === "heigh"}
          onChange={sortHigh}
        ></input>
      </div>
      <div className="radioDiv">
        <p>Product type</p>
        <input
          type="radio"
          value="product_type"
          checked={sort === "product_type"}
          onChange={sortOnProductType}
        ></input>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Product type</th>
          </tr>
          {getMakeup &&
            getMakeup.map((makeup) => (
              <tr key={makeup.id}>
                <td>{makeup.name}</td>
                <td>{makeup.price}</td>
                <td>{makeup.product_type}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sort;
