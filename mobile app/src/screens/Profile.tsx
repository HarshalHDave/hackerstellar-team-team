import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../components/SafeArea";
import Navbar from "../components/Navbar";
import { Entypo } from "@expo/vector-icons";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import axios from "axios";
import { baseUrl } from "../lib/BaseUrl";
import { useAppContext } from "../lib/Context";

const Profile = ({ navigation }: any) => {
  const auth = useAppContext();
  const [TotalAmt, setTotalAmt] = useState(0);
  // useEffect(() => {
  //   axios
  //     .post(
  //       baseUrl + "admin/open_order/list",
  //       {},
  //       {
  //         headers: {
  //           Authorization: "Bearer " + auth?.user.token,
  //         },
  //       }
  //     )
  //     .then((val) => {

  //       val.data.data.data.map((item:any)=>{
  //         setTotalAmt(TotalAmt + Number(item.qty)*Number(item.strike_price))
  //       })
  //     });
  // }, []);
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Amount Traded"], // optional
  };
  const dataPie = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8],
  };
  return (
    <SafeArea>
      <>
        <Navbar
          title="Your Profile"
          iconComponent={
            <Entypo
              name="bar-graph"
              size={24}
              color="white"
              onPress={() => navigation.navigate("Transaction")}
            />
          }
        />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View
            style={{
              width: "40%",
              height: 150,
              marginTop: 25,
              backgroundColor: "",
              borderRadius:20,
              alignItems:'center',
              justifyContent:'center',
            }}
          >
            <Text>{auth?.portFolioAmt ? auth?.portFolioAmt : '0'}</Text>
          </View>
          <View
            style={{
              width: "40%",
              height: 150,
              marginTop: 25,
              backgroundColor: "",
              borderRadius:20,
              alignItems:'center',
              justifyContent:'center',
            }}
          >
            <Text>{auth?.QuantityTotal ? auth?.QuantityTotal : '0'}</Text>
          </View>
        </View>
        <LineChart
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            labelColor: (opacity = 1) => `rgba(72, 150, 240, ${opacity})`,
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(105, 162, 248, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
          }}
          data={data}
          width={Dimensions.get("window").width}
          height={220}
        />
        <ProgressChart
          data={dataPie}
          width={Dimensions.get("window").width}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
          }}
          hideLegend={false}
        />
      </>
    </SafeArea>
  );
};

export default Profile;

const styles = StyleSheet.create({});
