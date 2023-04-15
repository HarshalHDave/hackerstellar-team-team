import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";

const H1 = (prop: { custom_style?: StyleProp<TextStyle>, children: React.ReactNode}) => {
  return <Text style={{ fontSize: 24, fontFamily: 'jb', color: '#dedede', letterSpacing: 1.6 }}>{prop.children}</Text>;
};

export default H1;

const styles = StyleSheet.create({});
