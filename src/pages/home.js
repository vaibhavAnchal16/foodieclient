import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../axios";
import RestaurantCard from "../components/restaurentCard";

function Home() {
  const [stores, setStores] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const getStores = async () => {
    const get_stores = await AxiosInstance.get("restaurants");
    if (get_stores) {
      setStores(get_stores?.data);
    }
  };

  const searchRests = async (searchkey) => {
    const search_results = await AxiosInstance.get(`search/${searchkey}`);
    setSearchResults(search_results?.data);
  };
  useEffect(() => {
    getStores();
  }, []);
  return (
    <div>
      <div className="hero-section d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="hero-section-inner">
            <h1 className="text-white text-center"> Food Ordering</h1>
            <h3 className="text-white text-center">
              Discover the best food & drinks
            </h3>
            <div className="form-wrappr d-flex justify-content-between">
              <div className="w-100">
                <input
                  type="text"
                  onInput={(_) => {
                    if (
                      _.currentTarget.value != "" &&
                      _.currentTarget.value.length > 1
                    ) {
                      searchRests(_.currentTarget.value);
                    } else {
                      setSearchResults([]);
                    }
                  }}
                  className="form-control border-0"
                  style={{ outline: "none" }}
                  placeholder="Search for Restaurant, Locations.."
                />
              </div>
              {/* <div>
                <button className="btn"> Search </button>
              </div> */}
            </div>

            {searchResults?.length > 0 && (
              <div className="search-results">
                <ul className="ml-0 pl-0 mb-0" style={{ listStyle: "none" }}>
                  {searchResults?.map((sr, i) => (
                    <li key={i}>
                      <Link to={`/menu/${sr?._id}`}>
                        <div>{sr?.name}</div>
                        <div>
                          {" "}
                          <small> {sr?.restaddress}</small>{" "}
                        </div>{" "}
                      </Link>

                      <hr />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="top-restaurants mt-4 mb-4">
        <div className="container">
          <h3 className="heading-title text-center font-weight-bold">
            {" "}
            Top Restaurants
          </h3>
          <div className="row">
            {stores?.map((st, i) => (
              <RestaurantCard storeinfo={st} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
