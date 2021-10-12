import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AxiosInstance from "../axios";
import { useStore } from "../store/store";

function Menu(props) {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formToggle, setFormToggle] = useState("login");
  const { history } = useHistory();
  const { setProfile } = useStore();

  const auth = useStore((state) => state.profile);
  const getMenu = async () => {
    var { storeId } = props?.match.params;
    const get_menu = await AxiosInstance.get(`recipes/${storeId}`);
    if (get_menu) {
      setMenu(get_menu?.data);
    }
  };

  const sortPrice = (sorttype) => {
    var sortedMenu = [...menu];
    if (sorttype == "ascending") {
      sortedMenu.sort(
        (a, b) => parseFloat(a.price_online) - parseFloat(b.price_online)
      );
      setMenu(sortedMenu);
    } else {
      setMenu(
        sortedMenu.sort(
          (a, b) => parseFloat(b.price_online) - parseFloat(a.price_online)
        )
      );
    }
  };

  useEffect(() => {
    getMenu();
  }, []);
  if (loading) {
    return null;
  }
  return (
    <div>
      {auth === null && (
        <div className="login-modal-wrapper">
          <div className="login-modal-inner">
            <div className="login-modal">
              <h2 className="text-center mt-3"> Sign In/ Sign Up</h2>
              {formToggle == "login" ? (
                <form
                  className="p-3"
                  onSubmit={async (_) => {
                    _.preventDefault();
                    if (
                      _.target.email.value != "" &&
                      _.target.password.value != ""
                    ) {
                      try {
                        const trylogin = await AxiosInstance.post(`login`, {
                          email: _.target.email.value,
                          password: _.target.password.value,
                        });
                        if (trylogin) {
                          setProfile(trylogin?.data);
                        }
                      } catch (error) {
                        alert(error.response.data);
                      }
                    }
                  }}
                >
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="text-center">
                    <button className="btn btn-success"> Sign In</button>
                  </div>
                </form>
              ) : (
                <form
                  className="p-3"
                  onSubmit={async (_) => {
                    _.preventDefault();
                    if (
                      _.target.first_name.value != "" &&
                      _.target.last_name.value != "" &&
                      _.target.email.value != "" &&
                      _.target.password.value != ""
                    ) {
                      try {
                        const tryRegister = await AxiosInstance.post(
                          `register`,
                          {
                            first_name: _.target.first_name.value,
                            last_name: _.target.last_name.value,
                            email: _.target.email.value,
                            password: _.target.password.value,
                          }
                        );
                        if (tryRegister) {
                          setProfile(tryRegister?.data);
                        }
                      } catch (error) {
                        alert(error.response.data);
                      }
                    }
                  }}
                >
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      name="first_name"
                      placeholder="Enter First Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      name="last_name"
                      placeholder="Enter Last Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="text-center">
                    <button className="btn btn-success"> Create Account</button>
                  </div>
                </form>
              )}

              <div className="text-center mb-2">
                {formToggle == "login" ? (
                  <div>
                    Don't have account ?{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={(_) => setFormToggle("register")}
                    >
                      Register Here
                    </span>
                  </div>
                ) : (
                  <div>
                    {" "}
                    Already have account ?{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={(_) => setFormToggle("login")}
                    >
                      Login Here{" "}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="menu-hero"></div>
      <div className="container">
        <div className="menu-wrapper mt-4 mb-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <button
                className="btn btn-sm mr-4 mb-4"
                onClick={(_) => window.history.back()}
              >
                Back
              </button>
              <h2> Total {menu?.length} Items</h2>
            </div>
            <div>
              <select
                className="form-control"
                onChange={(_) => {
                  sortPrice(_.currentTarget.value);
                }}
              >
                <option value="">Sort By price </option>
                <option value="ascending"> Lowest to Highest</option>
                <option value="descending">Highest to Lowest</option>
              </select>
            </div>
          </div>
          <div className="menu-lists">
            <div className="card  mt-2 mb-2 bg-light border-0 d-md-block d-none">
              <div className="card-body d-md-flex d-block align-items-center justify-content-between font-weight-bold">
                <div className="menu-type w-100">
                  <small>Veg/Non-veg</small>
                </div>
                <div className="menu-image w-100 text-center">Image</div>
                <div className="menu-name w-100 text-center">Name</div>
                <div className="menu-price w-100 text-center">Price</div>
                <div className="menu-addtocart w-100 text-right">Action</div>
              </div>
            </div>

            {menu?.map((mnu, i) => (
              <div className="card  mt-2 mb-2" key={i}>
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="menu-type w-100">
                    <small> {mnu?.food_type}</small>
                  </div>
                  <div className="menu-image w-100 text-center d-md-block d-none">
                    <img style={{ maxHeight: "40px" }} src="../food.png" />
                  </div>
                  <div className="menu-name w-100 text-center">{mnu?.name}</div>
                  <div className="menu-price w-100 text-center">
                    Rs. {mnu?.price_online}
                  </div>
                  <div className="menu-addtocart w-100 text-right">
                    <button className="btn btn-sm"> Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Menu;
