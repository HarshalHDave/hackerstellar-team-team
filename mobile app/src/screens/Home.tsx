import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../components/SafeArea";
import nseJson from "../../assets/nseBonds.json";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppContext } from "../lib/Context";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign, Feather } from "@expo/vector-icons";
import { StackedBarChart, LineChart } from "react-native-chart-kit";
// import ChatBot from 'react-native-chatbot-expo';

// const steps = [
//   {
//     id: '1',
//     message: 'Hello, I am chatbot I am here to guide you!',
//     trigger: '2',
//   },
//   {
//     id: '2',
//     options: [
//       { value: 1, label: 'What is Bonds Credits score?', trigger: '4' },
//       { value: 2, label: 'How to buy or sell a bond.', trigger: '3' },
//     ],
//   },
//   {
//     id: '3',
//     message: 'You can use our app for creating transactions, altering bonds, generating tokens and many other features !!!',
//     trigger: '2',
//   },
//   {
//     id: '4',
//     message: 'We calssify your spaces in 3 levels of custom heirarchy. Blocks, Zones and racks. The can be visualized on pur mobile app.',
//     end: true,
//   },
// ];


const Home = ({ navigation }: any) => {
  const auth = useAppContext();
  const News = [
    {
      head1: "India leads G20, aiming sustainable dev.",
      subHead1: "PM Modi leads the delegation and states vasudev kutmbakam",
      time1: 0.4,
      head2: "Global warming rises",
      subHead2: "Roads made to concrete rivers due to global warming",
      time2: 1.1,
    },
    {
      head1: "India leads G20, aiming sustainable dev.",
      subHead1: "PM Modi leads the delegation and states vasudev kutmbakam",
      time1: 0.4,
      head2: "Global warming rises",
      subHead2: "Roads made to concrete rivers due to global warming",
      time2: 1.1,
    },
  ];
  return (
    <SafeArea>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Image
                source={{
                  uri: auth?.user.profile_img,
                }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 56,
                  marginRight: 8,
                }}
              />
            </TouchableOpacity>
            <View>
              <Text style={{ color: "#dedede", fontSize: 16, fontFamily: 'mm' }}>
                {auth?.user.name}
              </Text>
              <Text
                style={{ color: "#dedede", fontSize: 12, fontWeight: "600", fontFamily: 'm' }}
              // onPress={() => {
              //   auth?.signOut();
              // }}
              >
                {auth?.user.email}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
              style={{ width: 32, height: 32, borderRadius: 32 }}
            >
              <Ionicons name="notifications" size={24} color="#fefefe" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Wishlist")}
              style={{ width: 32, height: 32, borderRadius: 32 }}
            >
              <MaterialCommunityIcons
                name="file-compare"
                size={25}
                color="#fefefe"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderColor: "#2e2e2e",
            backgroundColor:'#2a2a2a',
            borderWidth: 3,
            borderRadius: 16,
            marginVertical: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather
            style={{ marginLeft: 15 }}
            name="search"
            size={20}
            color="#9e9e9e"
          />
          <TextInput
            editable
            maxLength={40}
            onPressIn={() => {
              navigation.navigate("Search");
            }}
            // onChangeText={text => onChangeText(text)}
            // value={value}
            style={{ padding: 8, color: "#fefefe", width: '100%'}}
            placeholder="Explore investments"
            placeholderTextColor={"#aea0ae"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // borderWidth: 1,
            // borderColor: "white",
            borderRadius: 8,
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ color: "#dedede", fontSize: 24, fontFamily: 'jm', marginBottom: 8, marginLeft: -4 }}>
              Your Portfolio
            </Text>
            <AntDesign name="right" size={24} color="#9e9e9e" />
          </View>
          {/* @ts-ignore */}
          <LineChart
          
            data={{
              labels: ["Makara", "Aquaris", "Kumbha", "Pisces", "Meena", "Aries"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width + 16} // from react-native
            height={220}
            // yAxisLabel="$"
            yAxisSuffix="k"
            withInnerLines={false}
            withOuterLines={false}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#121213",
              backgroundGradientFrom: "#121213",
              backgroundGradientTo: "#121213",
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "1.6",
                stroke: "#308CF6",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </TouchableOpacity>
        <Text style={{ color: "#dedede", fontSize: 24, marginTop: 20, fontFamily: 'mm', marginBottom: 8 }}>
          News:
        </Text>
        <FlatList
          data={News}
          horizontal
          renderItem={(val) => (
            <View style={{ width: Dimensions.get("window").width - 48, marginRight: 16 }}>
              <View style={{ borderLeftWidth: 4, borderColor: '#5e5e5e', marginVertical: 4, paddingHorizontal: 8}}>
                <Text style={{ color: "#dedede", fontFamily: 'mm', fontSize: 18, marginBottom: 4 }}>
                  {val.item.head1}
                </Text>
                <Text style={{ color: "#dedede", fontFamily: 'm', fontSize: 14 }}>
                  {val.item.subHead1}
                </Text>
                <Text style={{ color: "#9e9e9e", fontFamily: 'm', fontSize: 14, textAlign: 'right', marginBottom: 0, marginTop: -4 }}>
                  {val.item.time1} sols ago
                </Text>
              </View>
              <View style={{ borderLeftWidth: 4, borderColor: '#5e5e5e', marginVertical: 4, paddingHorizontal: 8}}>
                <Text style={{ color: "#dedede", fontFamily: 'mm', fontSize: 18, marginBottom: 4 }}>
                  {val.item.head2}
                </Text>
                <Text style={{ color: "#dedede", fontFamily: 'm', fontSize: 14 }}>
                  {val.item.subHead2}
                </Text>
                <Text style={{ color: "#9e9e9e", fontFamily: 'm', fontSize: 14, textAlign: 'right', marginBottom: 0, marginTop: -4 }}>
                  {val.item.time2} sols ago
                </Text>
              </View>
            </View>
          )}
        />
        <Text style={{ color: "#dedede", fontSize: 24, marginTop: 20, fontFamily: 'mm', marginBottom: 8 }}>
          High Impact Scorers:
        </Text>

        <Text style={{ color: "#dedede", fontSize: 24, marginTop: 20, fontFamily: 'mm', marginBottom: 8 }}>
          High Enviromental Impact:
        </Text>

        <Text style={{ color: "#dedede", fontSize: 24, marginTop: 20, fontFamily: 'mm', marginBottom: 8 }}>
          High Social Impact:
        </Text>

        <Text style={{ color: "#dedede", fontSize: 24, marginTop: 20, fontFamily: 'mm', marginBottom: 8 }}>
          High Global Impact:
        </Text>
        
      </ScrollView>
      {/* <ChatBot steps={steps}
        floating={true}
        recognitionEnable={true}
      // speechSynthesis={{ enable: true, lang: 'en' }}
      /> */}

    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({});
