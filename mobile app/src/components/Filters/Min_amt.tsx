import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider';

const Min_amt = () => {
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

export default Min_amt

const styles = StyleSheet.create({})