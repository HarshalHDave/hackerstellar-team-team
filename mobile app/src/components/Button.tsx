import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
  } from "react-native";
  import React from "react";
  import { FONTS, SHADOWS, COLORS } from "../lib/theme/Theme";
  
  const Button = (props: {
    onPressed: (() => void) | undefined;
    text: string;
    custom_style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>
  }) => {
    return (
      <TouchableOpacity
        style={[props.custom_style ? props.custom_style : styles.button]}
        onPress={props.onPressed}
      >
        <Text
          style={[
            styles.text,
            {
              fontWeight: "600",
              // fontFamily: 'c',
              fontSize: 20,
              color: "white",
            },
            props.textStyle
          ]}
        >
          {props.text}
        </Text>
      </TouchableOpacity>
    );
  };
  
  export default Button;
  
  const styles = StyleSheet.create({
    text: {
      fontFamily: FONTS.regular,
    },
    input: {
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      height: 56,
      boxShadow: SHADOWS.dark,
      margin: 12,
      padding: 8,
      color: COLORS.lightgray,
      width: "95%",
    },
    button: {
      backgroundColor: "#563300",
      // borderWidth: 2,
      height: 56,
      justifyContent: "center",
      borderRadius: 80,
      alignItems: "center",
      marginTop: 10,
      paddingHorizontal:16,
      marginHorizontal: 8
    },
  });