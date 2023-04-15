import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";

const H3 = (prop: {
  custom_style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}) => {
  return <Text style={[prop.custom_style ? prop.custom_style : { fontSize: 14, fontFamily: 'mm', color: '#dedede' }]}>{prop.children}</Text>;
};

export default H3;

const styles = StyleSheet.create({});
