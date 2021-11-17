import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../invoice.css";
import { faDigitalTachograph, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

function Search(props) {
  const [data, setData] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [InviceNo, setInvoiceNo] = useState(0);
  const [earnings, setEarnings] = useState(0);
  
  const navigate = useNavigate();



  useEffect(async () => {
    try {
      const res = await axios.get("http://localhost:3003/getAll");
      setData(res.data);
       setEarnings( res.data.reduce((a, b) => a + (b["totalAmount"] || 0), 0).toFixed(2))
   
       setInvoiceNo(res.data.length)
       setItemCount(res.data.reduce((a, b) => a + (b.itemId.length || 0), 0))
      
      
      console.log("this correct :", res.data);
    } catch (err) {
      console.log(err);
    }
 
     //~> 235
    console.log(earnings); 



  }, []);


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
                  <h5 className="card-title mb-0">InvoiceNo</h5>
                </div>
                <div className="row align-items-center mb-2 d-flex">
                  <div className="col-8">
                    <h2 className="d-flex align-items-center mb-0">{InviceNo}</h2>
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
                  <h5 className="card-title mb-0">Total Items purchased</h5>
                </div>
                <div className="row align-items-center mb-2 d-flex">
                  <div className="col-8">
                    <h2 className="d-flex align-items-center mb-0">{itemCount}</h2>
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
                  <h5 className="card-title mb-0">Total Revenue </h5>
                </div>
                <div className="row align-items-center mb-2 d-flex">
                  <div className="col-8">
                    <h2 className="d-flex align-items-center mb-0">${earnings}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="col  ">
      <h3 style={{textAlign:'center'}}> Invoices</h3>
      <hr/>
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
                      navigate(`/${e.id}`, { state: { mydata: e } })
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
