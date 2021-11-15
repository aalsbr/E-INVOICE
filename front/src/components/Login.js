import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../login.css";


function Login({setValue}) {
  const handle = (e) => {
    localStorage.setItem("token", e);
    console.log(localStorage.getItem("token"));
 
  };



  const handelLogin = async(e) => {
    e.preventDefault();
    console.log();
    let obj = {
      username: e.target.form[0].value,
      password: e.target.form[1].value,
    };
    try {
      const res = await axios.post("http://localhost:3003/login", obj);

      if(res.data=="good")
      setValue(res.data);

    } catch (err) {
      console.log(err);
    }
  };
 


  return (
    <section className="vh-60 ">
      <h3 style={{ textAlign: "center" ,marginTop:"5%"}}>E-Invoice Login</h3>
      <div className="container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 mt-5 col-lg-5 d-none d-md-block">
                  <img
                    src="https://dwwceyq3zwuu6.cloudfront.net/wp-content/uploads/2021/04/invoice_free_invoicemaker-1024x1024.png"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center shadow  mybgd" style={{borderRadius:15}}>
                  <div className="card-body p-4 p-lg-5 text-black ">
                    <form>
                      {/*    <div className="d-flex align-items-center mb-5 pb-1">

                      <img className="h1 fw-bold mb-0"  
                      width={100}
                      height={100}
                      
                      src="https://d8v9vg425s74g.cloudfront.net/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/d/pdfinvoicepro_500x500.png"/>
  </div>*/}

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div className="form-outline mb-4">
                        <label className="form-label" for="form2Example17">
                          User Name
                        </label>
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" for="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                          onClick={(e) => handelLogin(e)}
                          onEnter
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
