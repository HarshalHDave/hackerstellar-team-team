//@ts-nocheck
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Dimensions
} from "react-native";
import React, { useState } from "react";
import SafeArea from "../components/SafeArea";
import CustButton from "../components/CustButton";
import { useAppContext } from "../lib/Context";
import axios from "axios";
import { baseUrl } from "../lib/BaseUrl";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { StockData } from "../lib/interfaces";
const { width, height } = Dimensions.get("window");
const randomRange = (maxNum) => Math.floor(Math.random() * maxNum) + 10;

var combine = function (a, min) {
  var fn = function (n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  var all = [];
  for (var i = min; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
};
const StockList = ({ route }: any) => {
  const dataRings = {
    labels: ["AAA", "AA", "A"], // optional
    data: [0.4, 0.6, 0.8],
  };
  const tempDates = [
    "2023-01-02",
    "2023-01-03",
    "2023-01-04",
    "2023-01-05",
    "2023-01-06",
    "2023-01-12",
    "2023-01-18",
    "2023-01-23",
    "2023-01-26",
    "2023-01-28",
    "2023-01-30",
    "2023-01-31",
    "2023-02-12",
    "2023-02-02",
    "2023-02-06",
    "2023-02-12",
    "2023-02-14",
    "2023-02-28",
    "2023-02-30",
    "2023-03-01",
    "2023-03-05",
    "2023-03-08",
    "2023-03-10",
    "2023-03-14",
    "2023-03-18",
    "2023-03-23",
    "2023-03-24",
    "2023-03-30",
    "2023-04-02",
    "2023-04-06",
  ];
  const commitsData = [];
  tempDates.forEach((date) =>
    commitsData.push({ date, count: randomRange(50) })
  );

  const chartConfigBonds = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const dataBond = {
    labels: ["2021", "2022"],
    legend: ["Q1", "Q2", "Q3", "Q4"],
    data: [
      [60, 60, 60, 50],
      [30, 30, 60, 40]
    ],
    barColors: ["#4896f0", "#2881e7", "#1356a4", "#0d4688"]
  };

  const dataBar = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfigGit = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const chartConfigRings = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 146, 255, ${opacity})`,
    strokeWidth: 4, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const chartConfigBar = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 146, 26, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };






  const data: StockData = route.params;
  const auth = useAppContext();
  // console.log(auth?.user.token)
  const [modalVisible, setModalVisible] = useState(false);
  const [LtpPrice, setLtpPrice] = useState(data.ltP);
  const [Quantity, setQuantity] = useState("100 ");
  const [isSell, setIsSell] = useState(false);
  const [Loading, setLoading] = useState(false);
  const SellingProcedure = () => {
    var sellId;
    axios
      .post(
        baseUrl + "/admin/open_order/create",
        {
          isOpen: true,
          qty: Number(Quantity),
          strike_price: data.price,
          isSelled: isSell,
          isCancelled: false,
          isin: data.country,
          isCo_own: false,
          blob: " ",
          investment_id: data.id
        },
        {
          headers: {
            Authorization: "Bearer " + auth?.user.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((val) => {
        if (val.data.status == "SUCCESS") {
          sellId = val.data.data.id;
          axios
            .post(
              baseUrl + "/admin/open_order/list",
              {
                query: {},
                options: {
                  where: {
                    investment_id: data.id,
                    isOpen: true,
                    isSelled: false,
                  },
                },
              },
              {
                headers: {
                  Authorization: "Bearer " + auth?.user.token,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )
            .then((val) => {
              const arr = combine(val.data.data.data, 1);
              var res;
              arr.forEach((val) => {
                var sum = 0;
                val.forEach((element) => {
                  // console.log(element.qty)
                  sum += element.qty;
                });
                if (sum == Quantity) {
                  res = val;
                }
              });
              console.log(res);
              if (res) {
                axios
                  .put(
                    baseUrl + "/admin/open_order/partial-update/" + sellId,
                    {
                      isOpen: false,
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + auth?.user.token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((val) => {
                    if (val.data.status == "SUCCESS") {
                      res.forEach(async (element) => {
                        await axios.put(
                          baseUrl +
                          "/admin/open_order/partial-update/" +
                          element.id,
                          {
                            isOpen: false,
                          },
                          {
                            headers: {
                              Authorization: "Bearer " + auth?.user.token,
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                          }
                        );
                      });
                      console.log("completeeee Selling");

                      clearInterval(i);
                      setModalVisible(false);
                    }
                  });
              } else {
                var num = 0;
                var i = setInterval(() => {
                  if (num > 30) {
                    axios
                      .put(
                        baseUrl + "/admin/open_order/partial-update/" + sellId,
                        {
                          isOpen: false,
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + auth?.user.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((val) => {
                        console.log(val.data);
                      });
                    setModalVisible(false);
                    clearInterval(i);
                  } else {
                    num += 5;
                    axios
                      .post(
                        baseUrl + "/admin/open_order/list",
                        {
                          query: {},
                          options: {
                            where: {
                              investment_id: data.id,
                              isOpen: true,
                              isSelled: false,
                            },
                          },
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + auth?.user.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((val) => {
                        const arr = combine(val.data.data.data, 1);
                        var res;
                        arr.forEach((val) => {
                          var sum = 0;
                          val.forEach((element) => {
                            // console.log(element.qty)
                            sum += element.qty;
                          });
                          if (sum == Quantity) {
                            res = val;
                          }
                        });
                        console.log(res);
                        if (res) {
                          axios
                            .put(
                              baseUrl +
                              "/admin/open_order/partial-update/" +
                              sellId,
                              {
                                isOpen: false,
                              },
                              {
                                headers: {
                                  Authorization: "Bearer " + auth?.user.token,
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                              }
                            )
                            .then((val) => {
                              if (val.data.status == "SUCCESS") {
                                res.forEach(async (element) => {
                                  await axios.put(
                                    baseUrl +
                                    "/admin/open_order/partial-update/" +
                                    element.id,
                                    {
                                      isOpen: false,
                                    },
                                    {
                                      headers: {
                                        Authorization:
                                          "Bearer " + auth?.user.token,
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                      },
                                    }
                                  );
                                });
                                console.log("completeeee buying");

                                clearInterval(i);
                                setModalVisible(false);
                              }
                            });
                        }
                      });
                  }
                }, 5000);
              }
            });
        }
      });
  };
  const BuyingProcedure = () => {
    var buyId;
    axios
      .post(
        baseUrl + "/admin/open_order/create",
        {
          isOpen: true,
          qty: Number(Quantity),
          strike_price: data.price,
          isSelled: isSell,
          isCancelled: false,
          investment_id: data.id,
          isCo_own: false,
          userType: 2,
          blob: " ",
        },
        {
          headers: {
            Authorization: "Bearer " + auth?.user.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((val) => {
        console.log(val.data)
        if (val.data.status == "SUCCESS") {
          buyId = val.data.data.addedBy;
          axios
            .post(
              baseUrl + "/admin/open_order/list",
              {
                query: {},
                options: {
                  where: {
                    investment_id: data.id,
                    isOpen: true,
                    isSelled: true,
                  },
                },
              },
              {
                headers: {
                  Authorization: "Bearer " + auth?.user.token,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )
            .then((val) => {
              console.log(val.data)
              const arr = combine(val.data.data.data, 1);
              var res;
              arr.forEach((val) => {
                var sum = 0;
                val.forEach((element) => {
                  // console.log(element.qty)
                  sum += element.qty;
                });
                if (sum == Quantity) {
                  res = val;
                }
              });
              console.log(res);
              if (res) {
                axios
                  .put(
                    baseUrl + "/admin/open_order/partial-update/" + buyId,
                    {
                      isOpen: false,
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + auth?.user.token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((val) => {
                    if (val.data.status == "SUCCESS") {
                      res.forEach(async (element) => {
                        await axios.put(
                          baseUrl +
                          "/admin/open_order/partial-update/" +
                          element.id,
                          {
                            isOpen: false,
                          },
                          {
                            headers: {
                              Authorization: "Bearer " + auth?.user.token,
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                          }
                        );
                      });
                      console.log("completeeee buying");

                      clearInterval(i);
                      setModalVisible(false);
                    }
                  });
              } else {
                var num = 0;
                var i = setInterval(() => {
                  if (num > 30) {
                    axios
                      .put(
                        baseUrl + "/admin/open_order/partial-update/" + buyId,
                        {
                          isOpen: false,
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + auth?.user.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((val) => {
                        console.log(val.data);
                      });
                    setModalVisible(false);
                    clearInterval(i);
                  } else {
                    num += 5;
                    axios
                      .post(
                        baseUrl + "/admin/open_order/list",
                        {
                          query: {},
                          options: {
                            where: {
                              investment_id: data.id,
                              isOpen: true,
                              isSelled: true,
                            },
                          },
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + auth?.user.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((val) => {
                        const arr = combine(val.data.data.data, 1);
                        var res;
                        arr.forEach((val) => {
                          var sum = 0;
                          val.forEach((element) => {
                            // console.log(element.qty)
                            sum += element.qty;
                          });
                          if (sum == Quantity) {
                            res = val;
                          }
                        });
                        console.log(res);
                        if (res) {
                          axios
                            .put(
                              baseUrl +
                              "/admin/open_order/partial-update/" +
                              buyId,
                              {
                                isOpen: false,
                              },
                              {
                                headers: {
                                  Authorization: "Bearer " + auth?.user.token,
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                              }
                            )
                            .then((val) => {
                              if (val.data.status == "SUCCESS") {
                                res.forEach(async (element) => {
                                  await axios.put(
                                    baseUrl +
                                    "/admin/open_order/partial-update/" +
                                    element.id,
                                    {
                                      isOpen: false,
                                    },
                                    {
                                      headers: {
                                        Authorization:
                                          "Bearer " + auth?.user.token,
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                      },
                                    }
                                  );
                                });
                              }
                            });
                          setModalVisible(false);
                          clearInterval(i);
                          return;
                        }
                      });
                  }
                }, 5000);
              }
            });
        }
      });
  };
  return (
    <SafeArea>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              color: "#e8e8e8",
              fontFamily: "mm",
              fontSize: 20,
              marginBottom: 2,
            }}
          >
            {data.name}       {data.investment_type}
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontFamily: "m",
              fontSize: 16,
              marginBottom: 2,
            }}
          >
            {data.description}
          </Text>
          <Text
            style={{
              color: "#eee",
              fontFamily: "m",
              fontSize: 20,
              marginBottom: 8,
            }}
          >
            Imapcting {data.impact_categorey} by aiming SDGs {data.SDG_solved}
          </Text>

          <Text
            style={{
              color: "#ddd",
              fontFamily: "m",
              fontSize: 20,
              marginBottom: 4,
            }}
          >
            Risk: {data.risk}
          </Text>

          <Text
            style={{
              color: "#aaa",
              fontFamily: "m",
              fontSize: 20,
              marginBottom: 8,
            }}
          >
            Min amount to invest: ₹ {data.min_amnt_invest}
          </Text>

          <Text
            style={{
              color: "#eee",
              fontFamily: "jm",
              fontSize: 24,
              marginBottom: 8,
              marginTop: 16
            }}
          >
            Company Details
          </Text>
          <Text
            style={{
              color: "#eee",
              fontFamily: "mm",
              fontSize: 20,
              marginBottom: 0,
            }}
          >
            {data.comapny_name}
          </Text>
          <Text
            style={{
              color: "#ddd",
              fontFamily: "m",
              fontSize: 16,
              marginBottom: 0,
            }}
          >
            {data.comany_desc}
          </Text>
          <Text
            style={{
              color: "#8cff8c",
              fontFamily: "m",
              fontSize: 16,
              marginBottom: 8,
              // textAlign: "center",
            }}
          >
            Comapny Size: {data.company_size}
          </Text>

          <Text
            style={{
              color: "white",
              fontFamily: "m",
              fontSize: 18,
              marginBottom: 8,
            }}
          >
            Founding Year: {data.founding_year}
          </Text>
          <Text
            style={{
              backgroundColor: '#6076f6',
              borderRadius: 8,
              padding: 8,
              marginVertical: 8,
              color: "#ddd",
              fontFamily: "mm",
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Overall Impact Score: {data.score}%
          </Text>

          <Text
            style={{
              backgroundColor: '#f67660',
              borderRadius: 8,
              padding: 8,
              marginVertical: 8,
              color: "#ddd",
              fontFamily: "mm",
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Social Impact Score: {data.social_score}%
          </Text>

          <Text
            style={{
              backgroundColor: 'teal',
              borderRadius: 8,
              padding: 8,
              marginVertical: 8,
              color: "#ddd",
              fontFamily: "mm",
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Governance Impact Score: {data.govern_score}%
          </Text>
          
          <Text
            style={{
              backgroundColor: '#30d646',
              borderRadius: 8,
              padding: 8,
              marginVertical: 8,
              color: "#ddd",
              fontFamily: "mm",
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Enviroment Impact Score: {data.enviroment_score}%
          </Text>
          
          
          
          <ProgressChart
            data={dataRings}
            width={width - 56}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfigRings}
            hideLegend={false}
          />
          <BarChart
            data={dataBar}
            width={width}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfigBar}
            verticalLabelRotation={30}
          />
          <View style={{ height: 56, width: 56, padding: 16 }}>
            <Text>hii</Text>
          </View>
          <StackedBarChart
            style={{
              marginVertical: 8,
              borderRadius: 16,
              paddingBottom: 56
            }}
            data={dataBond}
            width={400}
            height={220}
            chartConfig={chartConfigBonds}
          />
          <View style={{ height: 128, width: 56, padding: 16 }}>
            <Text>hii</Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginVertical: 15,
          position: "absolute",
          bottom: 0,
          paddingBottom: 16,
          paddingTop: 16,
          marginBottom: -4,
          width: "100%",
          backgroundColor: "#121213",
          alignSelf: 'center'
        }}
      >
        <CustButton
          onButtonPress={() => {
            setModalVisible(true);
            setIsSell(true);
          }}
          text="Sell"
          container_style={{
            borderRadius: 8,
            width: "45%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#121213",
            borderWidth: 2,
            borderColor: "#ff1c1c",
          }}
          text_style={{ fontFamily: "m", color: "#fefefe", fontSize: 16 }}
        />
        <CustButton
          onButtonPress={() => {
            setModalVisible(true);
            setIsSell(false);
          }}
          text="Buy"
          text_style={{}}
          container_style={{
            borderRadius: 8,
            width: "45%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#121213",
            borderWidth: 2,
            borderColor: "#1cff1c",
          }}
          text_style={{ fontFamily: "mm", color: "#fefefe", fontSize: 16 }}
        />
        
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setLtpPrice(data.ltP);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Number of Bonds to Buy</Text>
            <Text style={{ alignSelf: "flex-start" }}>Lot Size</Text>
            <View style={[styles.searchBar]}>
              <TextInput
                style={styles.input}
                placeholder={"Quantity"}
                value={Quantity}
                onChangeText={setQuantity}
                keyboardType={"number-pad"}
                placeholderTextColor={"grey"}
              />
            </View>
            <View style={[styles.searchBar, { marginTop: 20 }]}>
              <TextInput
                style={styles.input}
                placeholder={"Price"}
                value={LtpPrice}
                onChangeText={setLtpPrice}
                keyboardType={"number-pad"}
                placeholderTextColor={"grey"}
              />
            </View>
            <CustButton
              text="Submit"
              container_style={{ alignSelf: "center", marginTop: 15 }}
              onButtonPress={() => {
                if (isSell) SellingProcedure();
                else BuyingProcedure();
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeArea>
  );
};

export default StockList;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  searchBar: {
    paddingHorizontal: 8,
    flexDirection: "row",

    borderWidth: 1,
    borderColor: "#aea0ae",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 8,
  },
  input: {
    fontSize: 16,
    marginLeft: 8,
    width: "75%",
    color: "grey",
    fontFamily: "m",
  },
});