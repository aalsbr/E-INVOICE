import React from 'react';
import InvoiceRoot from './invoiceRoot';

function InvoiceContiner(props) {
    return (
        <div style={{display:'grid',justifyContent:'center', gridTemplateColumns:"80%"}}>
        <InvoiceRoot/>
        </div>

    
    );
}

export default InvoiceContiner;