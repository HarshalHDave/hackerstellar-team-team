import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import H3 from '../typography/H3';

const Inv_time = (props: {
  Checked: string;
  setChecked: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const data = ["One Time", "Monthly", "Daily", "Weekly"];
  return (
    <View>
      <FlatList
        data={data}
        renderItem={(val) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value={val.index.toString()}
              status={val.item.toString() === props.Checked ? "checked" : "unchecked"}
              onPress={() => {
                props.setChecked(val.item.toString());
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

export default Inv_time

const styles = StyleSheet.create({})