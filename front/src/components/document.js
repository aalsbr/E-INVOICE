import React from "react";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    orientation: 'portrait',
},
view: {
    width: '100%',
    height: '100%',
    padding: 0,
    backgroundColor: 'white',
},
image: {
    objectFit: 'cover',
},
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '100%',
    width: '100%',
  },
});
function MyDocument({ test,list }) {
  return (
    <Document>
    <Page object-fit="fill" style={styles.page} size="A4">


      
      <Image src="https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2021/09/08/2801231-1080283220.jpg?itok=f0GDNR4a" style={styles.image} />
      <View >
          <Text style={{ Position: "Absolute", left: 10, top: 30 }}>
            Invoice ID :{list[3]}
          </Text>
       
        </View>

        <Text style={{ Position: "Absolute", left: 5, top: 100 }}>
          
        Client Name : {list[4]}
      </Text>
      <Text style={{ Position: "Absolute", left: 5, top: 107 }}>Phone Num:{list[5]}</Text>
      
        <View
          style={{
            Position: "Absolute",
            left: 15,
            top: -70,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ marginLeft: 5,marginRight:5}}>Company Name</Text>
          <Text style={{ marginLeft: 5,marginRight:5 }}>Phone Number</Text>
          <Text style={{ marginLeft: 5,marginRight:5 }}>Adress</Text>
        </View>
        <View
          style={{
            width: "100%",
            position: "absolute",
            height: "29.97px",
            left: "0px",
            right: "0px",
            top: "100.97px",
          }}
        >
          <View
            style={{
              position: "absolute",
              left: "20px",
              right: "0px",
              top: "100.97px",
              backgroundColor: "#F8F7FA",
            }}
          >
            <Text>PName</Text>
          </View>
          <View
            style={{
              position: "absolute",
              left: "180px",
              right: "0px",
              top: "100.97px",
              backgroundColor: "#F8F7FA",
            }}
          >
            <Text>Quntity </Text>
          </View>
          <View
            style={{
              position: "absolute",
              left: "350px",
              right: "0px",
              top: "100.97px",
              backgroundColor: "#F8F7FA",
            }}
          >
            <Text>Price</Text>
          </View>

          <View
            style={{
              position: "absolute",
              left: "500px",
              right: "0px",
              top: "100.97px",
              backgroundColor: "#F8F7FA",
            }}
          >
            <View
              style={{
                backgroundColor: "#F8F7FA",
              }}
            >
              <Text   style={{
                backgroundColor: "#F8F7FA",
              }}>Total</Text>
            </View>
          </View>
        </View>
        {test.map((e, i) => {
          {
            return (
              <View>
                <View
                  style={{
                    display: "flex",
                    position: "relative",
                    gridRowGap: 50,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 20,
                    marginBottom: 10,
                    marginRight: 0,
                    marginLeft: 0,
                  }}
                >
                  <Text
                    style={{
                      position: "Absolute",
                      left: -70,
                      top: 120,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    {e.name}
                  </Text>
                  <Text
                    style={{
                      position: "Absolute",
                      left: -40,
                      top: 120,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    {e.quntity}
                  </Text>
                  <Text
                    style={{
                      position: "Absolute",
                      left: 10,
                      top: 120,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    {e.price}
                  </Text>
                  <Text
                    style={{
                      position: "Absolute",
                      left: 21,
                      top: 120,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    {e.total}
                  </Text>
                </View>
               
              </View>
            );
          }
        })}
        <View
        style={{
          display: "flex",
          position: "relative",
          gridRowGap: 50,
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: 20,
          marginBottom: 10,
          marginRight: 0,
          marginLeft: 0,
        }}
      >
        <Text
          style={{
            position: "Absolute",
            left: -70,
            top: 190,
            paddingLeft: 0,
            paddingRight: 0,
            margin: "20px",
            paddingLeft: "20px",
          }}
        >
          SubTotal:{list[0]}
        </Text>
        <Text
          style={{
            position: "Absolute",
            left: -70,
            top: 190,
            paddingLeft: 0,
            paddingRight: 0,
            margin: "20px",
            paddingLeft: "20px",
          }}
        >
          Tax (15%):{list[1]}
        </Text>
        <Text
          style={{
            position: "Absolute",
            left: -70,
            top: 190,
            paddingLeft: 0,
            paddingRight: 0,
            margin: "20px",
            paddingLeft: "20px",
          }}
        >
          Total Amount:{list[2]}
        </Text>
      </View>
        
      
      </Page>
    </Document>
  );
}
export default MyDocument;
