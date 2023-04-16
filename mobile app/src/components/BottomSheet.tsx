import * as React from "react";
import { useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import H1 from "./typography/H1";
import H2 from "./typography/H2";
import H3 from "./typography/H3";
import Sort from "./Filters/Sort";
import Inv_Opt from "./Filters/Inv_Opt";
import Company_size from "./Filters/Company_size";
import Risk from "./Filters/Risk";
import Market_cap from "./Filters/Market_cap";
import Country from "./Filters/Country";
import Age_Of_Company from "./Filters/Age_Of_Company";
import Inv_time from "./Filters/Inv_time";
import Sdg_aimed from "./Filters/Sdg_aimed";
import Company_ind from "./Filters/Company_ind";
import Min_amt from "./Filters/Min_amt";
import Impact_dom from "./Filters/Impact_dom";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";

const DEFAULT_HEIGHT = 450;

function useAnimatedBottom(show: boolean, height: number = DEFAULT_HEIGHT) {
  const animatedValue = React.useRef(new Animated.Value(0));

  const bottom = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  });

  React.useEffect(() => {
    if (show) {
      Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: 350,
        // Accelerate then decelerate - https://cubic-bezier.com/#.28,0,.63,1
        easing: Easing.bezier(0.28, 0, 0.63, 1),
        useNativeDriver: false, // 'bottom' is not supported by native animated module
      }).start();
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 250,
        // Accelerate - https://easings.net/#easeInCubic
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  return bottom;
}

interface Props {
  children: React.ReactNode;
  show: boolean;
  height?: number;
  onOuterClick?: () => void;
  SelectedFilter: any;
  setSelectedFilter: any;
  SortVal: any;
  setSortVal: any;
  InvOption: any;
  setInvOption: any;
  CompanySize: any;
  setCompanySize: any;
  RiskVal: any;
  setRiskVal: any;
  MarketCapVal: any;
  setMarketCapVal: any;
  CountryVal: any;
  setCountryVal: any;
  CompAge: any;
  setCompAge: any;
  InvstFreqVal: any;
  setInvstFreqVal: any;
  CompIndstryVal: any;
  setCompIndstryVal: any;
  ImpactDomainVal: any;
  setImpactDomainVal: any;
  MinAmt: any;
  setMinAmt: any;
  onReset?: () => void;
  onApply?: () => void;
}

export function BottomSheet({
  children,
  show,
  height = DEFAULT_HEIGHT,
  onOuterClick,
  SortVal,
  setSortVal,
  InvOption,
  setInvOption,
  CompanySize,
  setCompanySize,
  RiskVal,
  setRiskVal,
  MarketCapVal,
  setMarketCapVal,
  CountryVal,
  setCountryVal,
  CompAge,
  setCompAge,
  InvstFreqVal,
  setInvstFreqVal,
  CompIndstryVal,
  setCompIndstryVal,
  ImpactDomainVal,
  setImpactDomainVal,
  MinAmt,
  setMinAmt,
  onReset,
  onApply,
}: Props) {
  const { height: screenHeight } = useWindowDimensions();
  const [SelectedFilter, setSelectedFilter] = useState("");
  // const [SortVal, setSortVal] = useState("");
  // const [InvOption, setInvOption] = useState<string[]>([]);
  // const [CompanySize, setCompanySize] = useState<string[]>([]);
  // const [RiskVal, setRiskVal] = useState<string[]>([]);
  // const [MarketCapVal, setMarketCapVal] = useState("");
  // const [CountryVal, setCountryVal] = useState<string[]>([]);
  // const [CompAge, setCompAge] = useState("");
  // const [InvstFreqVal, setInvstFreqVal] = useState("");
  // const [CompIndstryVal, setCompIndstryVal] = useState<string[]>([]);
  // const [ImpactDomainVal, setImpactDomainVal] = useState<string[]>([]);
  const filterList = {
    "Sort By": <Sort Checked={SortVal} setChecked={setSortVal} />,
    "Investment Options": (
      <Inv_Opt Checked={InvOption} setChecked={setInvOption} />
    ),
    "Company Size": (
      <Company_size Checked={CompanySize} setChecked={setCompanySize} />
    ),
    Risk: <Risk Checked={RiskVal} setChecked={setRiskVal} />,
    // TODO
    // "Market Cap": (
    //   <Market_cap Checked={MarketCapVal} setChecked={setMarketCapVal} />
    // ),
    Country: <Country Checked={CountryVal} setChecked={setCountryVal} />,
    // "Age Of Company": (
    //   <Age_Of_Company Checked={CompAge} setChecked={setCompAge} />
    // ),
    "Investment Frequency": (
      <Inv_time Checked={InvstFreqVal} setChecked={setInvstFreqVal} />
    ),
    // TODO
    // "SDG aimed": <Sdg_aimed Checked={CompAge} setChecked={setCompAge} />,
    // TODO
    "Company Industry": (
      <Company_ind Checked={CompIndstryVal} setChecked={setCompIndstryVal} />
    ),
    // TODO
    "Minimum Amt": <Min_amt  MinAmt={MinAmt} setMinAmt={setMinAmt}/>,
    "Impact Domain": (
      <Impact_dom Checked={ImpactDomainVal} setChecked={setImpactDomainVal} />
    ),
  };
  const bottom = useAnimatedBottom(show, height);
  return (
    <>
      {/* Outer semitransparent overlay - remove it if you don't want it */}
      {show && (
        <Pressable
          onPress={onOuterClick}
          style={[styles.outerOverlay, { height: screenHeight }]}
        >
          <View
            style={{
              backgroundColor: "#4e4e4e",
              height: 64,
              width: 64,
              alignSelf: "center",
              top: screenHeight * 0.24,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="close" size={32} color="#dedede" />
          </View>
        </Pressable>
      )}
      <Animated.View style={[styles.bottomSheet, { height, bottom }]}>
        <View style={{ padding: 15 }}>
          <H1>Filters</H1>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            borderTopWidth: 0,
            borderTopColor: "grey",
          }}
        >
          <View
            style={{ flex: 0.35, backgroundColor: "#1e1e1e", paddingRight: 4 }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Object.keys(filterList)}
              renderItem={(val) => (
                <TouchableOpacity
                  onPress={() => setSelectedFilter(val.item)}
                  style={[
                    { paddingHorizontal: 12, paddingVertical: 8 },
                    SelectedFilter == val.item
                      ? {
                          backgroundColor: "#2e2e2e",
                          borderWidth: 1,
                          borderColor: "#3e3e3e",
                          borderRadius: 8,
                          margin: 2,
                        }
                      : {},
                  ]}
                >
                  <H3
                    custom_style={[
                      { padding: 4 },
                      SelectedFilter == val.item
                        ? { color: "#308CF6", fontSize: 14, fontFamily: "mm" }
                        : { fontSize: 14, fontFamily: "mm", color: "#dedede" },
                    ]}
                  >
                    {val.item}
                  </H3>
                </TouchableOpacity>
              )}
              style={{ flex: 0.25, backgroundColor: "#1e1e1e" }}
            />
          </View>
          <View
            style={{ flex: 0.75, backgroundColor: "#1e1e1e", paddingLeft: 4 }}
          >
            {/* @ts-ignore */}
            {SelectedFilter && filterList[SelectedFilter]}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#1e1e1e",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderTopWidth: 0.4,
            borderTopColor: "#5e5e5e",
          }}
        >
          <TouchableOpacity
            style={{ width: "49%", padding: 8, borderRadius: 8 }}
            onPress={onReset}
          >
            <Text
              style={{ fontFamily: "m", color: "#dedede", textAlign: "center" }}
            >
              Reset Filters
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#308CF6",
              width: "49%",
              padding: 8,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              height: 48,
            }}
            onPress={onApply}
          >
            <Text style={{ fontFamily: "mm", color: "#fefefe", fontSize: 16 }}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  outerOverlay: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    backgroundColor: "black",
    opacity: 0.72,
  },
  bottomSheet: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    // Here you can set a common style for all bottom sheets, or nothing if you
    // want different designs
    backgroundColor: "#1e1e1e",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    bottom: 100,
  },
});
