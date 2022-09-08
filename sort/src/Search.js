import React, { useEffect, useState } from "react";

const Search = () => {
  const [getMakeup, setGetMakeup] = useState("");
  const [search, setSearch] = useState("");

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

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form>
        <p>search on name,price ore product type</p>
        <input type="text" onChange={handleChange}></input>
      </form>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Product Type</th>
          </tr>
          {getMakeup &&
            getMakeup
              .filter(
                (makeup) =>
                  makeup.name.toLowerCase().includes(search) ||
                  makeup.price.toLowerCase().includes(search) ||
                  makeup.product_type.toLowerCase().includes(search)
              )
              .map((makeup) => (
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

export default Search;
