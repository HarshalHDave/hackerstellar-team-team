import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

const Min_amt = (props: {
  MinAmt: number;
  setMinAmt: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const data = [
    "Market Cap",
    "Overall Score",
    "Transperancy Score",
    "Enivoroment Score",
    "Social Score",
    "Government Score",
  ];
  return (
    <View>
      <Slider
        style={{ width: 250, height: 40, alignSelf: "center" }}
        minimumValue={100}
        maximumValue={10000}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={props.setMinAmt}
      />
      <Text style={{ color: "white" }}>0 - {props.MinAmt.toFixed(0)}</Text>
    </View>
  );
};

export default Min_amt;

const styles = StyleSheet.create({});
