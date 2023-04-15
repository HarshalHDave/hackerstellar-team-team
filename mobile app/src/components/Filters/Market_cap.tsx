import { FlatList, StyleSheet, Text, View } from 'react-native'
import Slider from "@react-native-community/slider";
import React from 'react'
import { RadioButton } from 'react-native-paper';

const Market_cap = (props: {
  Checked: string;
  setChecked: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const data = ["Market Cap", "Overall Score", "Transperancy Score", "Enivoroment Score", "Social Score", "Government Score"];
  return (
    <View>
      <Slider
        style={{ width: 250, height: 40, alignSelf: 'center' }}
        minimumValue={0}
        maximumValue={999}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

export default Market_cap

const styles = StyleSheet.create({})