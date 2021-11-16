import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../invoice.css";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

function Search(props) {
  const [data, setData] = useState([]);
  
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const res = await axios.get("http://localhost:3003/getAll");
      setData(res.data);
      console.log("this correct :", res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log("this data :", data);

  return (
    <div className="container mt-5  ">
      <div className="col ">
        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-6">
            <div className="card l-bg-cherry">
              <div className="card-statistic-3 p-4">
                <div className="card-icon card-icon-large">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="mb-4">
                  <h5 className="card-title mb-0">New Orders</h5>
                </div>
                <div className="row align-items-center mb-2 d-flex">
                  <div className="col-8">
                    <h2 className="d-flex align-items-center mb-0">3,243</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6">
            <div className="card l-bg-green-dark">
              <div className="card-statistic-3 p-4">
                <div className="card-icon card-icon-large">
                  <i className="fas fa-ticket-alt"></i>
                </div>
                <div className="mb-4">
                  <h5 className="card-title mb-0">Ticket Resolved</h5>
                </div>
                <div className="row align-items-center mb-2 d-flex">
                  <div className="col-8">
                    <h2 className="d-flex align-items-center mb-0">578</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6">
            <div className="card l-bg-orange-dark">
              <div className="card-statistic-3 p-4">
                <div className="card-icon card-icon-large">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="mb-4">
                  <h5 className="card-title mb-0">Revenue Today</h5>
                </div>
                <div className="row align-items-center mb-2 d-flex">
                  <div className="col-8">
                    <h2 className="d-flex align-items-center mb-0">$11.61k</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="col  ">
        <div className="row justify-content-center  ">
          {data.map((e) => {
            return (
              <div className="card m-3  " style={{ width: "15rem" }}>
                <div className="card-body ">
                  <FontAwesomeIcon size="4x" icon={faFileInvoice} />
                  <h4 style={{ display: "inline" }} className="card-title m-4">
                    ID: {e.id}
                  </h4>
                  <hr />
                  <p className="card-text">Name:{e.clintName}</p>
                  <p className="card-text">{e.date}</p>
                  <hr />
                  <button
                    onClick={() =>
                      navigate(`/search/${e.id}`, { state: { mydata: e } })
                    }
                    className="btn btn-secondary"
                  >
                    More Info
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;
