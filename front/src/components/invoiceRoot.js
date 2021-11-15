import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeState, edit, remove } from "../reducers/btnReducer";
import "../invoice.css";
import MyDocument from "./document";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InvoiceRoot({ test }) {
  const [id, setId] = useState(1);

  const mystate = useSelector((state) => {
    return {
      btnSave: state.btnSave.btnSave,
    };
  });

  const dispach = useDispatch();

  useEffect(() => {
    // console.log("id:",id)
    // dispach(changeState({ id: id, name: "", quntity: 0, price: 0, total: 0 }));
  }, []);

  const handelAdd = () => {
    setId(id + 1);
    dispach(changeState({ id: id, name: "", quntity: 0, price: 0, total: 0 }));
  };

  return (
    <div class="page-content container  myshadow" style={{backgroundColor:'white',borderRadius:10,marginTop:"1%"}}>
    <h2 style={{textAlign:'center'}}>Create New Invoice</h2>
      <div class="page-header text-blue-d2">
        <h1 class="page-title text-secondary-d1">
          Invoice
          <small class="page-info">
            ID: #111-222
          </small>
        </h1>

        <div class="page-tools">
          <div class="action-buttons">
            <button
              class="btn btn-primary"
              data-title="Print"
            >
              Genreate Invoice
            </button>
          
          </div>
        </div>
      </div>

      <div class="container px-0">
        <div class="row mt-1">
          <div class="col-12 col-lg-10 offset-lg-1">
            <div class="row">
              <div class="col-12">
                <div class="text-center text-150">
                  <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
                  <span class="text-default-d3">Company Example</span>
                </div>
              </div>
            </div>

            <hr class="row brc-default-l1 mx-n1 mb-4" />

            <div class="row">
              <div class="col-sm-6">
                <div>
                  <span class="text-sm text-grey-m2 align-middle">
                    Client Name:
                  </span>
                  <br />
                  <span class="text-600 text-110 text-blue align-middle">
                    <input></input>
                  </span>
                </div>
                <div>
                  <span class="text-sm text-grey-m2 align-middle">
                    PhoneNo:
                  </span>
                  <br />
                  <span class="text-600 text-110 text-blue align-middle">
                    <input></input>
                  </span>
                </div>
              </div>

              <div class="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                <hr class="d-sm-none" />
                <div class="text-grey-m2">
                  <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                    Invoice
                  </div>

                  <div class="my-2">
                    <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                    <span class="text-600 text-90">ID:</span> #111-222
                  </div>

                  <div class="my-2">
                    <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                    <span class="text-600 text-90">Issue Date:</span> Oct 12,
                    2019
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <div class="row text-600 text-white bgc-default-tp1 py-25">
                <div class=" col-1">#</div>
                <div class="col-3">Description</div>
                <div class=" col">Qty</div>
                <div class=" col">Unit Price</div>
                <div class="col">Amount</div>
              </div>

              <div class="text-95 text-secondary-d3">
                <div class="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                  <div class="col-1">{id}</div>
                  <div class="col-3">
                    <input></input>
                  </div>
                  <div class="col">
                    <input style={{ width: 40 }}></input>
                  </div>
                  <div class="col">
                    <input style={{ width: 80 }}></input>
                  </div>
                  <div class="col">100</div>
                </div>

                {mystate.btnSave.map(() => {
                  <div class="row mb-2 mb-sm-0 py-25">
                    <div class="col-1">{id}</div>
                    <div class="col-3">
                      <input></input>
                    </div>
                    <div class="col">
                      <input style={{ width: 80 }}></input>
                    </div>
                    <div class="col">
                      <input style={{ width: 80 }}></input>
                    </div>
                    <div class="col">100</div>
                  </div>;
                })}
              </div>

              <div class="row border-b-2 brc-default-l2"></div>

              <h5 onClick={() => handelAdd()} style={{ cursor: "pointer" }}>
                {" "}
                <FontAwesomeIcon size="1x" color="green" icon={faPlus} />
                Add New Line
              </h5>

              <div class="row mt-3">
                <div class="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0"></div>

                <div class="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                  <div class="row my-2">
                    <div class="col-7 text-right">SubTotal</div>
                    <div class="col-5">
                      <span class="text-120 text-secondary-d1">$2,250</span>
                    </div>
                  </div>

                  <div class="row my-2">
                    <div class="col-7 text-right">Tax (10%)</div>
                    <div class="col-5">
                      <span class="text-110 text-secondary-d1">$225</span>
                    </div>
                  </div>

                  <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                    <div class="col-7 text-right">Total Amount</div>
                    <div class="col-5">
                      <span class="text-150 text-success-d3 opacity-2">
                        $2,475
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceRoot;
