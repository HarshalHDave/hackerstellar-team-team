import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import H3 from "../typography/H3";
import Industry from '../../../assets/data/industries.json';
const Company_ind = (props: {
  Checked: string[];
  setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [Checked, setChecked] = useState<string[]>(props.Checked);
  useEffect(() => {
    setChecked(props.Checked);
  }, [props.Checked]);
  return (
    <View>
      <FlatList
        data={Industry}
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

export default Company_ind;

const styles = StyleSheet.create({});
