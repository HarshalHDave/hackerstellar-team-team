import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Checkbox, RadioButton } from "react-native-paper";
import H3 from "../typography/H3";

const Company_size = (props: {
  Checked: string[];
  setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const data = [
    "MNCs",
    "Large",
    "Midcap",
    "Small",
    "Micro",
    "NPO/NGO/ Govt. organizations",
  ];
  const [Checked, setChecked] = useState<string[]>(props.Checked);
  useEffect(() => {
    setChecked(props.Checked);
  }, [props.Checked]);
  return (
    <View>
      <FlatList
        data={data}
        renderItem={(val) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              status={Checked.includes(val.item) ? "checked" : "unchecked"}
              onPress={() => {
                var arr = [...Checked];
                if (arr.includes(val.item)) {
                  arr = arr.filter((element) => element != val.item);
                } else {
                  arr.push(val.item);
                }
                setChecked(arr);
                props.setChecked(arr);
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

export default Company_size;

const styles = StyleSheet.create({});
