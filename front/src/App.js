import { faBars, faFileInvoice, faFileInvoiceDollar, faHome, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import EditInvoice from "./components/EditInvoice";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
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
          className="navbar navbar-expand-lg shadow "
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
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
                <li className="nav-item m-2">
                  <Link className="nav-link" to="/">
                  <FontAwesomeIcon
                  color="#6d7c94"
                  size="2x"
                  icon={faHome}
                />{" "}
                <strong >  Inovices </strong>
               
                  </Link>
                </li>
                <li className="nav-item  m-3 ps-3">
                  <Link className="nav-link" to="/new" style={{color:'blue'}}>
                    <FontAwesomeIcon
                      color="green"
                      size="lg"
                      icon={faPlusCircle}
                    />{" "}
                   <strong style={{color:"#6d7c94"}}>  New Invoice</strong>
                  </Link>
                </li>
              </ul>
              <span style={{ marginRight: 20 }}>Welcome Admin !</span>
              <button className="btn btn-danger " onClick={() => setValue("")}>
                Logout
              </button>
            </div>
          </div>
        </nav>

        <Routes>
      
          <Route path="/" element={<Search />} />
          <Route path="/new" element={<InvoiceContiner />} />
          <Route path="/:id" element={<EditInvoice />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
