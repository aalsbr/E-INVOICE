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
  const[subTotal,setSubTotal]=useState(0);
  const[tax,setTax]=useState(0);
  const[totalAmount,setTotalAmount]=useState(0);


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

  useEffect(()=>{
    setTax(subTotal*15/100)
    let total =  subTotal+(subTotal*15/100)
    setTotalAmount(total)
  },[subTotal])

  const handelCalculation = ()=>{

    let data = 0;

    for(let i=0;i<mystate.btnSave.length;i++){
    data += mystate.btnSave[i].total
    }

   setSubTotal(data)


   console.log("Sub: ",subTotal , "Tax:" , tax , "total", totalAmount)
  }

  return (
    <div className="page-content container  myshadow" style={{backgroundColor:'white',borderRadius:10,marginTop:"1%"}}>
    <h2 style={{textAlign:'center'}}>Create New Invoice</h2>
      <div className="page-header text-blue-d2">
        <h1 className="page-title text-secondary-d1">
          Invoice
          <small className="page-info">
            ID: #111-222
          </small>
        </h1>

        <div className="page-tools">
          <div className="action-buttons">
            <button
              className="btn btn-primary"
              data-title="Print"
            >
              Genreate Invoice
            </button>
          
          </div>
        </div>
      </div>

      <div className="container px-0">
        <div className="row mt-1">
          <div className="col-12 col-lg-10 offset-lg-1">
            <div className="row">
              <div className="col-12">
                <div className="text-center text-150">
                  <i className="fa fa-book fa-2x text-success-m2 mr-1"></i>
                  <span className="text-default-d3">Company Example</span>
                </div>
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
                    <input></input>
                  </span>
                </div>
                <div>
                  <span className="text-sm text-grey-m2 align-middle">
                    PhoneNo:
                  </span>
                  <br />
                  <span className="text-600 text-110 text-blue align-middle">
                    <input></input>
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
                    <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                    <span className="text-600 text-90">ID:</span> #111-222
                  </div>

                  <div className="my-2">
                    <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                    <span className="text-600 text-90">Issue Date:</span> Oct 12,
                    2019
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="row text-600 text-white bgc-default-tp1 py-25">
                <div className=" col-1">#</div>
                <div className="col-3">Description</div>
                <div className=" col">Qty</div>
                <div className=" col">Unit Price</div>
                <div className="col">Amount</div>
              </div>

              <div className="text-95 text-secondary-d3" >
              

                {mystate.btnSave.map((e,i) => 

                {return (
                  <div className="row mb-2 mb-sm-0 py-25" key={i}>
                    <div className="col-1">{e.id}</div>
                    <div className="col-3">
                      <input placeholder="Product Name" value={e.name} onChange={(e)=>dispach(edit([i,e.target.value,1]))}></input>
                    </div>
                    <div className="col">
                      <input maxLength={4} value={e.quntity} onChange={(e)=>(dispach(edit([i,e.target.value,2])),handelCalculation())}  style={{ width: 60 }}></input>
                    </div>
                    <div className="col">
                      <input maxLength={6} value={e.price} onChange={(e)=>(dispach(edit([i,e.target.value,3])),handelCalculation())} style={{ width: 65 }}></input>
                    </div>
                    <div className="col">{e.total}</div>
                  </div> )
             
                 } )}
              </div>

              <div className="row border-b-2 brc-default-l2"></div>

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
                      <span className="text-120 text-secondary-d1">${subTotal}</span>
                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="col-7 text-right">Tax (10%)</div>
                    <div className="col-5">
                      <span className="text-110 text-secondary-d1">${tax}</span>
                    </div>
                  </div>

                  <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                    <div className="col-7 text-right">Total Amount</div>
                    <div className="col-5">
                      <span className="text-150 text-success-d3 opacity-2">
                        ${totalAmount}
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
