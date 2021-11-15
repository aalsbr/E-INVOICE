import { useEffect, useState } from "react";
import { BrowserRouter,Route,Routes,Link } from "react-router-dom";

import InvoiceContiner from "./components/InvoiceContiner";
import Login from "./components/Login";
import Search from "./components/Search";
import "./index.css"

function App() {
  const [value, setValue] = useState("");

  if (!value) {
    return <Login setValue={setValue} />;
  }

  return (
    <BrowserRouter>
    <div>
    <nav class="navbar navbar-expand-lg " style={{backgroundColor: "rgba(255,255,255,0.2)"}} >
    <div class="container-fluid">
     
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
       
          <li class="nav-item">
            <Link class="nav-link" to="/">Create Invoice</Link>
          </li>
          <li class="nav-item">
          <Link class="nav-link" to="/search">Search </Link>
        </li>
       
        
        </ul>
        <span style={{marginRight:20}}>Welcome !</span>
          <button class="btn btn-danger " onClick={() => setValue("")}>Logout</button>
          
     
      </div>
    </div>
  </nav>






     
  <Routes>

    <Route path="/" element={<InvoiceContiner />}/>
    <Route path="/search" element={<Search />} />

 </Routes>





    </div>
    </BrowserRouter>
  );
}

export default App;
