import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import H3 from "../typography/H3";
const Inv_Opt = (props: {
  Checked: string[];
  setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const data = ["ESG", "Shares", "Bonds", "Mutual Funds", "FD", "Real Estate"];
  const [Checked, setChecked] = useState<string[]>(props.Checked);
  return (
    <View>
      <FlatList
        data={data}
        renderItem={(val) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              status={
                Checked.includes(val.item) ? "checked" : "unchecked"
              }
              onPress={() => {
                var arr = [...Checked];
                if(arr.includes(val.item)){
                  arr = arr.filter(element=> element != val.item)
                }
                else{
                  arr.push(val.item);
                }
                setChecked(arr);
                props.setChecked(arr)
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

export default Inv_Opt;

const styles = StyleSheet.create({});
