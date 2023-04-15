import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

const Age_Of_Company = (props: {
  Checked: string;
  setChecked: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const data = ["0-2yrs", "2-4yrs", "4-10yrs", "10-15yrs", "15-20yrs", "20-30yrs", "30-50yrs", "50+yrs"];
  return (
    <View>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={999}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

export default Age_Of_Company;

const styles = StyleSheet.create({});
