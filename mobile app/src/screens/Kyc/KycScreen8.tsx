import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import SafeArea from "../../components/SafeArea";
import SDG from "../../../assets/data/sdg.json";
import Button from "../../components/Button";
import { useAppContext } from "../../lib/Context";
const KycScreen7 = ({ navigation, route }: any) => {
  console.log(route.params);
  const [Selected, setSelected] = useState<string[]>([]);
  const auth = useAppContext();
  return (
    <SafeArea>
      <>
        <Text style={{ color: "#dedede", fontSize: 24, marginTop: 8, fontFamily: 'm', marginBottom: 8 }}>
          Select the UN SDGs that appeal you the most
        </Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <FlatList
            data={SDG}
            numColumns={2}
            renderItem={(val) => (
              <TouchableOpacity
                style={{ marginTop: 8, marginRight: 8 }}
                onPress={() => {
                  var arr = [...Selected];
                  if (arr.includes(val.index.toString())) {
                    arr = arr.filter((ele) => ele != val.index.toString());
                  } else {
                    arr.push(val.index.toString());
                  }
                  setSelected(arr);
                  // console.log(Selected)
                }}
              >
                <Image
                  source={{ uri: val.item.link }}
                  style={[
                    { height: 160, width: 160, opacity: 0.4 },
                    Selected.includes(val.index.toString()) && {
                      borderWidth: 4,
                      padding: 4,
                      opacity: 1,
                      borderColor: "#dedede",
                    },
                  ]}
                ></Image>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => {
              auth?.signUp({ ...route.params, SDGs: Selected.join(' , ') })
            }}
            style={{ backgroundColor: '#4896f0', height: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 80, alignSelf: 'center' }}>
            <Text style={{ color: '#fefefe', fontSize: 18, textAlign: 'center', fontFamily: 'mm' }}>Get set go</Text>
          </TouchableOpacity>
        </View>
      </>
    </SafeArea>
  );
};

export default KycScreen7;

const styles = StyleSheet.create({});
