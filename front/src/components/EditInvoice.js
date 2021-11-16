import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "../invoice.css";
import MyDocument from "./document";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  cleen,
  editAdd,
  editModify,
  editRemove,
} from "../reducers/editReducer";

function EditInvoice(props) {
  const [id, setId] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // set by the server side
  const [invoiceId, setInvoiceId] = useState(1);
  const [date, setDate] = useState("");

  const [disabled, setdisabled] = useState(true);

  //redux read
  const mystate = useSelector((state) => {
    return {
      editList: state.editList.editList,
    };
  });
  //redux actions
  const dispach = useDispatch();
  //react route dom hocks
  const navigation = useNavigate();
  const { state } = useLocation();
  const { mydata } = state;

  //add line clicked
  const handelAdd = () => {
    setId(id + 1);
    dispach(editAdd({ id: id, name: "", quntity: 0, price: 0, total: 0 }));
  };

  //save changes clicked
  const handelPost = async (url) => {
    //Input  Valdation
    if (!clientName || !clientPhone)
      return alert("please make sure Client Name && Client Phone Not empty");
    for (let i = 0; i < mystate.editList.length; i++) {
      if (!mystate.editList[i].name)
        return alert(`Please fill the product name in row number ${i + 1} `);
      if (
        mystate.editList[i].quntity == 0 ||
        isNaN(mystate.editList[i].quntity)
      )
        return alert(`Please fill the product quntity in row number ${i + 1} `);
      if (mystate.editList[i].price == 0 || isNaN(mystate.editList[i].price))
        return alert(`Please fill the product price in row number ${i + 1} `);
    }

    //Defined obj containes all invoice information to be stored in json file
    let obj = {
      date: date,
      clintName: clientName,
      clintPhone: clientPhone,
      subTotal: subTotal,
      tax: tax,
      totalAmount: totalAmount,
      itemId: mystate.editList,
    };

    //Post
    try {
      const res = await axios.put(`http://localhost:3003/${invoiceId}`, obj);
      console.log("sucess");
    } catch (err) {
      console.log(err);
    }
    //Open PDF URL in new TAB
    // window.open(url, "_blank");
  };
  // delete clicked
  const handelDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3003/${invoiceId}`);
      navigation("/search");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    mydata.itemId.map((e) =>
      dispach(
        editAdd({
          id: e.id,
          name: e.name,
          quntity: e.quntity,
          price: e.price,
          total: e.total,
        })
      )
    );

    setId(mydata.itemId[mydata.itemId.length - 1].id);
    setInvoiceId(mydata.id);
    setDate(mydata.date);
    setSubTotal(mydata.subTotal);
    setTax(mydata.tax);
    setTotalAmount(mydata.totalAmount);
    setClientName(mydata.clintName);
    setClientPhone(mydata.clintPhone);
  }, []);

  useEffect(() => {
    setTax((subTotal * 15) / 100);
    let total = subTotal + (subTotal * 15) / 100;
    setTotalAmount(total);
  }, [subTotal]);

  // when the user go back or refresh
  useEffect(() => {
    return () => {
      dispach(cleen());
      console.log("cleaned up");
    };
  }, []);

  const handelCalculation = () => {
    let data = 0;

    for (let i = 0; i < mystate.editList.length; i++) {
      data += mystate.editList[i].total;
    }

    setSubTotal(data);

    console.log("Sub: ", subTotal, "Tax:", tax, "total", totalAmount);
  };

  return (
    <div>
      <div
        className="container mycon "
        style={{ borderRadius: 20, marginTop: "1%" }}
      >
        <button
          className="btn btn-warning "
          style={disabled ? { pointerEvents: "auto" } : { display: "none" }}
          onClick={() => (disabled ? setdisabled(false) : setdisabled(true))}
        >
          {disabled ? " Enable Modify Content" : "Disable"}{" "}
        </button>

        <div
          className="page-content container  myshadow  transparent  "
          style={
            disabled
              ? { pointerEvents: "none", opacity: "0.7", borderRadius: 20 }
              : { pointerEvents: "auto", opacity: "1", borderRadius: 20 }
          }
        >
          <h3 className="pt-4" style={{ textAlign: "center" }}>
            {disabled ? "View Invoice" : "Modify Invoice"}
          </h3>
          <div className="page-header text-blue-d2">
            <h1 className="page-title text-secondary-d1">
              Invoice
              <small className="page-info">ID:#{invoiceId}</small>
            </h1>

            <div className="page-tools">
              <div className="action-buttons ">
                <button
                  onClick={() => handelDelete()}
                  className="btn btn-danger m-1 "
                  data-title="Print"
                >
                  Delete Invoice
                </button>
                <PDFDownloadLink
                  document={<MyDocument test={mystate.editList} />}
                  fileName="somename.pdf"
                >
                  {({ blob, url, loading, error }) => (
                    <button
                      onClick={() => handelPost(url)}
                      className="btn btn-warning "
                      data-title="Print"
                    >
                      Save Changes
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>
          </div>

          <div className="container px-0">
            <div className="row mt-1">
              <div className="col-12 col-lg-10 offset-lg-1">
                <div className="row">
                  <div className="col-12">
                    <div className="text-center text-150"></div>
                  </div>
                </div>

                <hr className="row brc-default-l1 mx-n1 mb-4" />

                <div className="row">
                  <div className="col-sm-6">
                    <div>
                      <span className="text-sm text-grey-m2 align-middle">
                        Client Name:
                      </span>
                      <br />
                      <span className="text-600 text-110 text-blue align-middle">
                        <input
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                        ></input>
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-grey-m2 align-middle">
                        PhoneNo:
                      </span>
                      <br />
                      <span className="text-600 text-110 text-blue align-middle">
                        <input
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                        ></input>
                      </span>
                    </div>
                  </div>

                  <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                    <hr className="d-sm-none" />
                    <div className="text-grey-m2">
                      <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                        Invoice
                      </div>

                      <div className="my-2">
                        <span className="text-600 text-90">ID:</span> #
                        {invoiceId}
                      </div>

                      <div className="my-2">
                        <span className="text-600 text-90">Issue Date:</span>{" "}
                        {date}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container ">
                  <div className="mt-4">
                    <div className="row text-600 text-white bgc-default-tp1 py-25">
                      <div className=" col-1">#</div>
                      <div className="col-4">Description</div>
                      <div className=" col">Qty</div>
                      <div className=" col">Unit Price</div>
                      <div className="col">Amount</div>
                    </div>
                    <div
                      className="text-95 text-secondary-d3"
                      style={{ height: 135, overflow: "scroll" }}
                    >
                      {mystate.editList.length &&
                        mystate.editList.map((e, i) => {
                          return (
                            <div
                              className={
                                i % 2 !== 0
                                  ? "row mb-2 mb-sm-0 py-25 "
                                  : "row mb-2 mb-sm-0 py-25 bgc-default-l4"
                              }
                              key={i}
                            >
                              <div className="col-1">{e.id}</div>
                              <div className="col-4">
                                <input
                                  placeholder="Product Name"
                                  value={e.name}
                                  onChange={(e) =>
                                    dispach(editModify([i, e.target.value, 1]))
                                  }
                                ></input>
                              </div>
                              <div className="col">
                                <input
                                  maxLength={4}
                                  value={e.quntity}
                                  onChange={(e) => (
                                    dispach(editModify([i, e.target.value, 2])),
                                    handelCalculation()
                                  )}
                                  style={{ width: 60 }}
                                ></input>
                              </div>
                              <div className="col">
                                <input
                                  maxLength={6}
                                  value={e.price}
                                  onChange={(e) => (
                                    dispach(editModify([i, e.target.value, 3])),
                                    handelCalculation()
                                  )}
                                  style={{ width: 65 }}
                                ></input>
                              </div>
                              <div className="col ">
                                {e.total}
                                <FontAwesomeIcon
                                  onClick={() => (
                                    dispach(editRemove(e.id)), setId(id - 1)
                                  )}
                                  style={{
                                    marginLeft: "50%",
                                    cursor: "pointer",
                                  }}
                                  size="lg"
                                  color="#fc4765"
                                  icon={faTrash}
                                />{" "}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="row border-b-2 brc-default-l2"></div>
                  <hr />
                  <h5 onClick={() => handelAdd()} style={{ cursor: "pointer" }}>
                    {" "}
                    <FontAwesomeIcon size="1x" color="green" icon={faPlus} />
                    Add New Line
                  </h5>

                  <div className="row mt-3">
                    <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0"></div>

                    <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                      <div className="row my-2">
                        <div className="col-7 text-right">SubTotal</div>
                        <div className="col-5">
                          <span className="text-120 text-secondary-d1">
                            ${subTotal}
                          </span>
                        </div>
                      </div>

                      <div className="row my-2">
                        <div className="col-7 text-right">Tax (15%)</div>
                        <div className="col-5">
                          <span className="text-110 text-secondary-d1">
                            ${tax}
                          </span>
                        </div>
                      </div>

                      <div className="row my-2 align-items-center bgc-primary-l3 p-1">
                        <div className="col-7 text-right">Total Amount</div>
                        <div className="col-5">
                          <span className="text-150 text-success-d3 opacity-2">
                            ${totalAmount}
                          </span>
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditInvoice;
