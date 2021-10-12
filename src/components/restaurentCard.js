import React from "react";
import { Link } from "react-router-dom";

function RestaurantCard({ storeinfo }) {
  return (
    <div className="col-md-4 col-12 mb-2">
      <Link to={`/menu/${storeinfo?._id}`}>
        <div className="card">
          <div className="card-body">
            <p className="rest-name text-dark font-weight-bold">
              {" "}
              {storeinfo?.name}
            </p>
            <hr />
            <p className="rest-address mb-0 text-dark">
              {" "}
              {storeinfo?.restaddress}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RestaurantCard;
