import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../components/SafeArea";
import axios from "axios";
import { baseUrl } from "../lib/BaseUrl";
import { useAppContext } from "../lib/Context";
import { Orders } from "../lib/interfaces";

const Wishlist = () => {
  const auth = useAppContext();
  const [OrderArr, setOrderArr] = useState<Orders[]>([]);
  useEffect(() => {
    axios
      .post(
        baseUrl + "/admin/open_order/list",
        {},
        { headers: { Authorization: "Bearer " + auth?.user.token } }
      )
      .then((val) => {
        if (val.data.data.data.length > 0) {
          var finalarr = val.data.data.data.filter(
            (elem: Orders) =>
              elem.addedBy == auth?.user.id || elem.updatedBy == auth?.user.id
          );
          setOrderArr(finalarr);
          // console.log(finalarr);
        }
      });
  }, []);

  return (
    <SafeArea>
      <>
        <Text style={{ color: "white", marginVertical: 25, fontSize: 20, fontFamily: 'm' }}>
          Portfolio
        </Text>
        <FlatList
          data={OrderArr}
          renderItem={(val) => (
            <View
              style={{
                padding: 8,
                borderRadius: 8,
                borderWidth: 0.8,
                borderColor: "#aaa",
                marginBottom: 8,
                alignSelf: 'center',
                width: '96%'
              }}
            >
              <Text style={{ color: "white" }}>QTY:{val.item.qty}</Text>
              <Text style={{ color: "white" }}>
                Created : {new Date(val.item.createdAt).toDateString()}
              </Text>
              <Text style={{ color: val.item.isSelled ? "green":"red"}}>
                {val.item.isSelled ? "Bought":"Sold"}
              </Text>
              <Text style={{color: "#dedede", fontFamily: 'm', fontSize: 16, marginTop: 4}}>{val.item.strike_price}</Text>
            </View>
          )}
        />
      </>
    </SafeArea>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
