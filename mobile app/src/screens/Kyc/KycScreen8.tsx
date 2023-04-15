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
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <FlatList
          data={SDG}
          numColumns={2}
          renderItem={(val) => (
            <TouchableOpacity
              style={{ marginTop: 10, marginHorizontal: 10 }}
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
                  { height: 150, width: 150 },
                  Selected.includes(val.index.toString()) && {
                    borderWidth: 1,
                    borderColor: "white",
                  },
                ]}
              ></Image>
            </TouchableOpacity>
          )}
        />
        <Button text="Ready Set Go!" onPressed={()=>{
          auth?.signUp({...route.params , SDGs : Selected.join(' , ')})
        }}/>
      </View>
    </SafeArea>
  );
};

export default KycScreen7;

const styles = StyleSheet.create({});
