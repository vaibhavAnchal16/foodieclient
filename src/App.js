import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Menu from "./pages/menu";
import { useStore } from "./store/store";

function App() {
  const profile = useStore((state) => state.profile);
  const { removeToken } = useStore();
  console.log(profile);
  return (
    <Router>
      <div className="app-wrapper">
        {profile && (
          <div className="container">
            <div className="card">
              <div className="d-flex align-items-center justify-content-between card-body bg-light">
                <div>
                  Hi, {profile?.first_name} {profile?.last_name}
                </div>
                <div>
                  <p
                    style={{ cursor: "pointer" }}
                    className="text-primary mb-0"
                    onClick={(_) => removeToken()}
                  >
                    {" "}
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/menu/:storeId" component={Menu} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
