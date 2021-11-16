import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import EditInvoice from "./components/EditInvoice";

import InvoiceContiner from "./components/InvoiceContiner";
import Login from "./components/Login";
import Search from "./components/Search";
import "./index.css";

function App() {
  const [value, setValue] = useState("");

  if (!value) {
    return <Login setValue={setValue} />;
  }

  return (
    <BrowserRouter>
      <div>
        <nav
          className="navbar navbar-expand-lg "
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span>
                <FontAwesomeIcon size="lg" icon={faBars} />
              </span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Create Invoice
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">
                    Search{" "}
                  </Link>
                </li>
              </ul>
              <span style={{ marginRight: 20 }}>Welcome !</span>
              <button className="btn btn-danger " onClick={() => setValue("")}>
                Logout
              </button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<InvoiceContiner />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<EditInvoice />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
