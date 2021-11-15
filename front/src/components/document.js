import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

function MyDocument({ test }) {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          backgroundColor: "red",
          marginTop: 50,
          paddingRight: 50,
          paddingLeft: 50,

          height: 500,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 100 }}>
          <Text>Invoice</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Text>Company Name</Text>
          <Text>Phone Number</Text>
          <Text>Adress</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Text>Client Information:</Text>
          </View>

          <View>
            <Text>#InoviceNo</Text>
          </View>

          <View>
            <Text>Invoice Date</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-around",
            backgroundColor: "grey",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Text>Product Name</Text>
          <Text>Quntity </Text>
          <Text>Price</Text>
          <Text>Total</Text>
        </View>

        {test.map((e, i) => {
          {
            return (
              <View
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginRight: 100,
                }}
              >
                <Text>{e.name}</Text>
                <Text>{e.quntity}</Text>
                <Text>{e.price}</Text>
                <Text>{e.total}</Text>
              </View>
            );
          }
        })}

        <hr />

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: 100,
            paddingTop: 50,
          }}
        >
          <View>
            <Text style={{ display: "inline" }}>Sub Total</Text>
            <Text style={{ display: "inline" }}>3500</Text>
          </View>

          <View>
            <Text style={{ display: "inline" }}>VAT(15%)</Text>
            <Text style={{ display: "inline" }}>500</Text>
          </View>

          <View>
            <Text style={{ display: "inline" }}>Total</Text>
            <Text style={{ display: "inline" }}>4000</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default MyDocument;
