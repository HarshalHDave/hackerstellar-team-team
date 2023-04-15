import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import H3 from "../typography/H3";

const Sort = (props: {
  Checked: string;
  setChecked: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const data = ["Market Cap", "Overall Score", "Transperancy Score", "Enivoroment Score", "Social Score", "Government Score"];
  return (
    <View>
      <FlatList
        data={data}
        renderItem={(val) => (
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <RadioButton
            value={val.index.toString()}
            status={val.index.toString() === props.Checked ? "checked" : "unchecked"}
            onPress={() => {
              props.setChecked(val.index.toString());
            }}
              color="#308CF6"
          />
          <H3>{val.item}</H3>
          </View>
        )}
      />
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({});
