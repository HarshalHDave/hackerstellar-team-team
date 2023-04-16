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
import axios from "axios";
import { baseUrl } from "../lib/BaseUrl";
import { giveSorted } from "../lib/Func";
import { StockData } from "../lib/interfaces";
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
  const [Social, setSocial] = useState<StockData[]>([]);
  const [EnvironMent, setEnvironMent] = useState<StockData[]>([]);
  const [Impact, setImpact] = useState<StockData[]>([]);
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
  useEffect(() => {
    axios
      .post(
        baseUrl + "/admin/investment/list",
        {},
        {
          headers: {
            Authorization: "Bearer " + auth?.user.token,
          },
        }
      )
      .then((val) => {
        //@ts-ignore
        const env = giveSorted(val.data.data.data, "3");
        const soc = giveSorted(val.data.data.data, "4");
        setEnvironMent(env ? env.reverse() : []);
        setSocial(soc ? soc.reverse() : []);
        // console.log(soc)
        //@ts-ignore
        // console.log(env)
        //@ts-ignore
        const impact = giveSorted(val.data.data.data, "1");
        setImpact(impact ? impact.reverse() : []);
        // console.log(impact)
        // setEnvironMent(env ? env.reverse() : []);
      });
  }, []);
  return (
    <SafeArea>
      <ScrollView nestedScrollEnabled>
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
              <Text
                style={{ color: "#dedede", fontSize: 16, fontFamily: "mm" }}
              >
                {auth?.user.name}
              </Text>
              <Text
                style={{
                  color: "#dedede",
                  fontSize: 12,
                  fontWeight: "600",
                  fontFamily: "m",
                }}
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
              <Ionicons name="chatbubbles" size={24} color="#fefefe" />
              {/* <MaterialCommunityIcons name="robot" size={24} color="#fefefe" /> */}
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
            backgroundColor: "#2a2a2a",
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
            style={{ padding: 8, color: "#fefefe", width: "100%" }}
            placeholder="Explore investments"
            placeholderTextColor={"#aea0ae"}
          />
        </TouchableOpacity>

        <View>
          <Image
            source={{ uri: "http://shrill-bucket.surge.sh/earth/3.png" }}
            style={{ width: "100%", height: 256, resizeMode: "contain" }}
          />
          <Text style={{ position: "absolute", color: "#DEDEDE", top: 24, left: 24, fontFamily: 'm', fontSize: 32, width: '70%', zIndex: 110 }}>
            Put your money where your heart is
          </Text>

          <Text style={{ position: "absolute", color: "#3e3e3e", top: 24.5, left: 24.5, fontFamily: 'm', fontSize: 32, width: '70%',  }}>
            Put your money where your heart is
          </Text>

          <Text style={{ position: "absolute", color: "#DEDEDE", top: 156, left: 24, fontFamily: 'm', fontSize: 14, width: '70%' }}>
            Achieve 2 aims with one target. 
          </Text>
        </View>

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
            <Text
              style={{
                color: "#dedede",
                fontSize: 24,
                fontFamily: "mm",
                marginBottom: 8,
                marginLeft: -4,
              }}
            >
              Your Portfolio
            </Text>
            <AntDesign name="rightcircleo" size={24} color="#9e9e9e" />
          </View>
          <View
            style={{
              width: "64%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: "#308CF6",
                fontSize: 32,
                fontFamily: "jm",
                marginBottom: 4,
                marginLeft: -4,
              }}
            >
              ₹ 12,500
            </Text>
          </View>
          <Text
            style={{
              color: "#30f68c",
              fontSize: 16,
              fontFamily: "m",
              marginBottom: 8,
              marginLeft: -4,
            }}
          >
            {"+ 8.8% (₹501.55)"}
          </Text>
          {/* @ts-ignore */}
          <LineChart
            data={{
              labels: [
                "Makara",
                "Aquaris",
                "Kumbha",
                "Pisces",
                "Meena",
                "Aries",
              ],
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
        <Text
          style={{
            color: "#dedede",
            fontSize: 24,
            marginTop: 20,
            fontFamily: "mm",
            marginBottom: 8,
          }}
        >
          News
        </Text>
        <FlatList
          data={News}
          horizontal
          renderItem={(val) => (
            <View
              style={{
                width: Dimensions.get("window").width - 48,
                marginRight: 16,
              }}
            >
              <View
                style={{
                  borderLeftWidth: 4,
                  borderColor: "#5e5e5e",
                  marginVertical: 4,
                  paddingHorizontal: 8,
                }}
              >
                <Text
                  style={{
                    color: "#dedede",
                    fontFamily: "mm",
                    fontSize: 18,
                    marginBottom: 4,
                  }}
                >
                  {val.item.head1}
                </Text>
                <Text
                  style={{ color: "#dedede", fontFamily: "m", fontSize: 14 }}
                >
                  {val.item.subHead1}
                </Text>
                <Text
                  style={{
                    color: "#9e9e9e",
                    fontFamily: "m",
                    fontSize: 14,
                    textAlign: "right",
                    marginBottom: 0,
                    marginTop: -4,
                  }}
                >
                  {val.item.time1} sols ago
                </Text>
              </View>
              <View
                style={{
                  borderLeftWidth: 4,
                  borderColor: "#5e5e5e",
                  marginVertical: 4,
                  paddingHorizontal: 8,
                }}
              >
                <Text
                  style={{
                    color: "#dedede",
                    fontFamily: "mm",
                    fontSize: 18,
                    marginBottom: 4,
                  }}
                >
                  {val.item.head2}
                </Text>
                <Text
                  style={{ color: "#dedede", fontFamily: "m", fontSize: 14 }}
                >
                  {val.item.subHead2}
                </Text>
                <Text
                  style={{
                    color: "#9e9e9e",
                    fontFamily: "m",
                    fontSize: 14,
                    textAlign: "right",
                    marginBottom: 0,
                    marginTop: -4,
                  }}
                >
                  {val.item.time2} sols ago
                </Text>
              </View>
            </View>
          )}
        />
        <Text
          style={{
            color: "#dedede",
            fontSize: 24,
            marginTop: 20,
            fontFamily: "mm",
            marginBottom: 8,
          }}
        >
          High Impact Scorers
        </Text>
        <FlatList
          data={Impact}
          horizontal
          renderItem={(val) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("StockList", val.item)}
              style={{
                borderLeftWidth: 4,
                borderColor: "#faed27",
                padding: 16,
                marginRight: 16,
              }}
            >
              <Text
                style={{ color: "#DEDEDE", fontFamily: "mm", fontSize: 16 }}
              >
                {val.item.name}
              </Text>
              <Text
                style={{ color: "#aeaeae", fontFamily: "jm", fontSize: 24 }}
              >
                {Number(val.item.score).toFixed(0) + "%"}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Text
          style={{
            color: "#dedede",
            fontSize: 24,
            marginTop: 32,
            fontFamily: "mm",
            marginBottom: 8,
          }}
        >
          Impacting Enviroment
        </Text>
        <FlatList
          data={EnvironMent}
          horizontal
          renderItem={(val) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("StockList", val.item)}
              style={{
                borderLeftWidth: 4,
                borderColor: "#30F68c",
                padding: 16,
                marginRight: 16,
              }}
            >
              <Text
                style={{ color: "#DEDEDE", fontFamily: "mm", fontSize: 16 }}
              >
                {val.item.name}
              </Text>
              <Text
                style={{ color: "#aeaeae", fontFamily: "jm", fontSize: 24 }}
              >
                {Number(val.item.enviroment_score).toFixed(0) + "%"}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Text
          style={{
            color: "#dedede",
            fontSize: 24,
            marginTop: 32,
            fontFamily: "mm",
            marginBottom: 8,
          }}
        >
          Causing Top Social Impact
        </Text>
        <FlatList
          data={Social}
          horizontal
          renderItem={(val) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("StockList", val.item)}
              style={{
                borderLeftWidth: 4,
                borderColor: "#F68c30",
                padding: 16,
                marginRight: 16,
              }}
            >
              <Text
                style={{ color: "#DEDEDE", fontFamily: "mm", fontSize: 16 }}
              >
                {val.item.name}
              </Text>
              <Text
                style={{ color: "#aeaeae", fontFamily: "jm", fontSize: 24 }}
              >
                {Number(val.item.social_score).toFixed(0) + "%"}
              </Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Education")}
          style={{
            width: "100%",
            height: 250,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjFJR3u2ahMGyg4d-1syduvISjtTDmMsj8Q&usqp=CAU",
            }}
            style={{
              height: 200,
              width: "100%",
              resizeMode: "contain",
              borderRadius: 16,
              opacity: 0.8,
            }}
          />
        </TouchableOpacity>
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
