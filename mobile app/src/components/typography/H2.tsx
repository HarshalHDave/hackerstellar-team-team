import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";

const H2 = (prop: { custom_style?: StyleProp<TextStyle> , children: React.ReactNode}) => {
  return <Text style={{ fontSize: 24 }}>{prop.children}</Text>;
};

export default H2;

const styles = StyleSheet.create({});
