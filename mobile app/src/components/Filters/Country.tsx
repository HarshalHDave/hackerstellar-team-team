import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Cntry from "../../../assets/data/countries.json";
import { Checkbox } from "react-native-paper";
import BigList from "react-native-big-list";
import H3 from "../typography/H3";
const Country = (props: {
  Checked: string[];
  setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [Checked, setChecked] = useState<string[]>(props.Checked);
  useEffect(() => {
    setChecked(props.Checked);
  }, [props.Checked]);
  const [RenderCntry, setRenderCntry] = useState<string[]>(Cntry);

  return (
    <View>
      <View
        style={{
          borderColor: "#5e5e5e",
          borderWidth: 1.6,
          borderRadius: 8,
          marginVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <TextInput
          editable
          maxLength={40}
          onChangeText={(text) => {
            if (text == "") {
              setRenderCntry(Cntry);
            } else {
              var tempData: any[] = [];
              Cntry.forEach((item) => {
                if (JSON.stringify(item).includes(text)) {
                  tempData.push(item);
                }
              });
              setRenderCntry(tempData);
            }
          }}
          // onChangeText={text => onChangeText(text)}
          // value={value}
          style={{ padding: 8, color: "#dedede", flex: 0.95 }}
          placeholder="Search your bonds..."
          placeholderTextColor={"#3e3e3e"}
          cursorColor={"#60ACC6"}
        />
      </View>
      <FlatList
        data={RenderCntry}
        initialNumToRender={5}
        removeClippedSubviews
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

export default Country;

const styles = StyleSheet.create({});
