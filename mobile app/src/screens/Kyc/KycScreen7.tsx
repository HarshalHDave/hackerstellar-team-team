import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import SafeArea from "../../components/SafeArea";
import Button from "../../components/Button";

const KycScreen7 = ({ navigation, route }: any) => {
  const hobbies =
    [
      "Environment",
      "Fair Labor",
      "Clean Tech",
      "Community Development",
      "Equality & Diversity",
      "Human Rights",
      "Animal Welfare",
      "Non-Violence",
      "Corporate GOvernance",
      "Healthy Living",
      "Fossil-Fuel Free",
      "Shareholder Advocacy"
    ];
  const [Hobbies, setHobbies] = useState<string[]>([]);
  return (
    <SafeArea>
      <>
        <FlatList
          data={hobbies}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={(val) => (
            <TouchableOpacity
              style={
                Hobbies.includes(val.item)
                  ? {
                    padding: 15,
                    borderWidth: 1,
                    marginHorizontal: 8,
                    marginTop: 10,
                    borderRadius: 80,
                    backgroundColor: "#4896f0",
                    // elevation: 5
                  }
                  : {
                    padding: 15,
                    // borderColor: "#E2C2AA",
                    borderWidth: 1,
                    borderRadius: 8,
                    marginHorizontal: 8,
                    marginTop: 10,
                    borderColor: "#4896f0",
                  }
              }
              onPress={() => {
                if (Hobbies.includes(val.item)) {
                  const h = Hobbies;
                  const arr = h.filter(function (item) {
                    return item !== val.item;
                  });
                  setHobbies(arr);
                } else {
                  setHobbies([...Hobbies, val.item]);
                }
              }}
            >
              <Text style={{ color: "#dedede", fontFamily: 'm' }}>{val.item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("KycScreen8", { ...route.params, hobbies: Hobbies.join(" , ") })
          }}
          style={{ backgroundColor: '#4896f0', height: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 80, alignSelf: 'center', position: 'absolute', bottom: 64 }}>
          <Text style={{ color: '#fefefe', fontSize: 18, textAlign: 'center', fontFamily: 'mm' }}>Next</Text>
        </TouchableOpacity>
      </>
    </SafeArea>
  );
};

export default KycScreen7;

const styles = StyleSheet.create({});
