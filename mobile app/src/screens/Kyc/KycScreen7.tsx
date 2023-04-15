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

const KycScreen7 = ({navigation,route}:any) => {
  const hobbies = [
    "Acting",
    "Candle making",
    "Computer programming",
    "Coffee roasting",
    "Cooking",
    "Colouring",
    "Dance",
    "Digital arts",
    "Drawing",
    "Electronics",
    "Embroidery",
    "Fashion",
    "Flower arranging",
    "Foreign language learning",
    "Gaming",
    "Listening to music",
    "Origami",
    "Painting",
    "Playing musical instruments",
    "Pottery",
    "Puzzles",
    "Reading",
    "Singing",
    "Sports",
    "Cycling",
    "Driving",
    "Fishing",
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
                      backgroundColor: "#DEAD84",
                      // elevation: 5
                    }
                  : {
                      padding: 15,
                      // borderColor: "#E2C2AA",
                      // borderWidth: 1,
                      borderRadius: 80,
                      marginHorizontal: 8,
                      marginTop: 10,
                      backgroundColor: "#E2C2AA",
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
              <Text style={{ color: "#563300" }}>{val.item}</Text>
            </TouchableOpacity>
          )}
        />
        <Button text="Next" onPressed={()=>{
            navigation.navigate("KycScreen8",{...route.params,hobbies:Hobbies.join(" , ")})
        }}/>
      </>
    </SafeArea>
  );
};

export default KycScreen7;

const styles = StyleSheet.create({});
