// @ts-ignore
//@ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import SafeArea from "../components/SafeArea";
import { FontAwesome } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import NseData from "../../assets/nseBonds.json";
import { BottomSheet } from "../components/BottomSheet";
import H1 from "../components/typography/H1";
import H2 from "../components/typography/H2";
import axios from "axios";
import { baseUrl } from "../lib/BaseUrl";
import { useAppContext } from "../lib/Context";
import { StockData } from "../lib/interfaces";
import {
  giveCompInd,
  giveCompanySize,
  giveCountry,
  giveImpDom,
  giveInvFreq,
  giveInvOption,
  giveMinAmm,
  giveRisk,
  giveSorted,
} from "../lib/Func";
interface JData {
  symbol: "NHAI";
  series: "N6";
  bond_type: "Regular";
  open: "1248";
  high: "1251.5";
  low: "1238";
  ltP: "1242";
  close: "1242.13";
  per: "-0.01";
  qty: "31977";
  trdVal: "39634532.19";
  coupr: "   8.75";
  credit_rating: "CRISIL AAA STABLE / CARE AAA / BWR AAA STABLE ";
  rating_agency: "CRISIL,CARE,BWR,";
  face_value: "1000";
  nxtip_date: "-";
  maturity_date: "05-Feb-2029";
  bYield: "6.270560034906604";
  isin: "INE906B07DF8";
  meta: {
    symbol: "NHAI";
    companyName: "National Highways Authority of India";
    activeSeries: [];
    debtSeries: [
      "N2",
      "N3",
      "N4",
      "N5",
      "N6",
      "N7",
      "N8",
      "N9",
      "NA",
      "NB",
      "NC",
      "ND",
      "NE"
    ];
    tempSuspendedSeries: ["EQ", "N1", "U1", "U2"];
    isFNOSec: false;
    isCASec: false;
    isSLBSec: false;
    isDebtSec: true;
    isSuspended: false;
    isETFSec: false;
    isDelisted: false;
    isin: "INE906B07CB9";
  };
}

const Search = ({ navigation }: any) => {
  const [DATA, setData] = useState();
  const [renderData, setrenderData] = useState<StockData[]>([]);
  const [SearchPhrase, setSearchPhrase] = useState("");
  const [IsOpen, setIsOpen] = useState(false);
  const auth = useAppContext();
  const [SortVal, setSortVal] = useState("");
  const [InvOption, setInvOption] = useState<string[]>([]);
  const [CompanySize, setCompanySize] = useState<string[]>([]);
  const [RiskVal, setRiskVal] = useState<string[]>([]);
  const [MarketCapVal, setMarketCapVal] = useState("");
  const [CountryVal, setCountryVal] = useState<string[]>([]);
  const [CompAge, setCompAge] = useState("");
  const [InvstFreqVal, setInvstFreqVal] = useState("");
  const [CompIndstryVal, setCompIndstryVal] = useState<string[]>([]);
  const [ImpactDomainVal, setImpactDomainVal] = useState<string[]>([]);
  const [MinAmt, setMinAmt] = useState(0);
  const [FilterActive, setFilterActive] = useState(false);
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
        setData(val.data.data.data);
        setrenderData(val.data.data.data);
      });
  }, []);
  useEffect(() => {
    if (FilterActive) {
      let arr = [...DATA];
      if (SortVal) arr = giveSorted(arr, SortVal);
      if (InvOption.length > 0) arr = giveInvOption(arr, InvOption);
      if (CompanySize.length > 0) arr = giveCompanySize(arr, CompanySize);
      if (RiskVal.length > 0) arr = giveRisk(arr, RiskVal);
      if (CountryVal.length > 0) arr = giveCountry(arr, CountryVal);
      if (InvstFreqVal) arr = giveInvFreq(arr, [InvstFreqVal]);
      if (CompIndstryVal.length > 0) arr = giveCompInd(arr, CompIndstryVal);
      if (ImpactDomainVal.length > 0) arr = giveImpDom(arr, ImpactDomainVal);
      if (MinAmt) arr = giveMinAmm(arr, MinAmt);
      console.log(MinAmt);
      console.log(CompanySize);
      setrenderData(arr);
      console.log("first");
    }
    setFilterActive(false);
  }, [
    SortVal,
    InvOption,
    CompanySize,
    RiskVal,
    MarketCapVal,
    CountryVal,
    CompAge,
    InvstFreqVal,
    CompIndstryVal,
    ImpactDomainVal,
    MinAmt,
    FilterActive,
  ]);
  const TouchableOpacityComponent = (Data: StockData) => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 8,
          borderBottomWidth: 0.8,
          borderColor: "#aea0ae",
        }}
        onPress={() => navigation.navigate("StockList", { ...Data })}
      >
        <Text style={{ fontFamily: "mm", color: "#4090FF", fontSize: 18 }}>
          {Data.name}
          {"     " + Data.investment_type}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ color: "white" }}>{Data.comapny_name}</Text>
          <Text style={{ color: "white" }}>{Data.price}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ color: "white" }}>
            Master Quantity : {Data.mstr_qty}
          </Text>
          <Text style={{ color: "white" }}>
            Min Amt : {Data.min_amnt_invest}
          </Text>
          {/* <View style={{ alignItems: "flex-end" }}> */}
          {/* {(Data.per.length == 1 && Data.per == "-") || Data.per == "0" ? (
              <Text
                style={{
                  color: "yellow",
                  fontSize: 18,
                  fontWeight: "600",
                  fontFamily: "m",
                  marginLeft: 15,
                }}
              >
                unch
              </Text>
            ) : Number(Data.per) < 0 ? (
              <Text
                style={{
                  color: "#ff1a28",
                  fontSize: 18,
                  fontWeight: "600",
                  fontFamily: "m",
                }}
              >
                {Data.per} %
              </Text>
            ) : (
              <Text
                style={{
                  color: "#12ca1f",
                  fontSize: 18,
                  fontWeight: "600",
                  fontFamily: "m",
                }}
              >
                {Data.per} %
              </Text>
            )} */}
          {/* </View> */}
        </View>
        <Text style={{ color: "white", marginTop: 15 }}>
          Social Score: {Data.social_score}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeArea>
        <View
          style={{
            borderColor: "#aea0ae",
            borderWidth: 1,
            borderRadius: 8,
            marginVertical: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome
            style={{ marginLeft: 15 }}
            name="search"
            size={20}
            color="#aea0ae"
          />
          <TextInput
            editable
            maxLength={40}
            onChangeText={setSearchPhrase}
            // onChangeText={text => onChangeText(text)}
            // value={value}
            style={{ padding: 8, color: "#fefefe", flex: 0.95 }}
            placeholder="Search your bonds..."
            placeholderTextColor={"#aea0ae"}
          />
          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <FontAwesome
              style={{ marginLeft: 15 }}
              name="filter"
              size={20}
              color="#aea0ae"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={renderData}
          renderItem={(item) => {
            if (
              JSON.stringify(item.item)
                .toLocaleLowerCase()
                .includes(SearchPhrase.toLocaleLowerCase())
            )
              return <TouchableOpacityComponent {...item.item} />;
          }}
        />
      </SafeArea>
      <BottomSheet
        show={IsOpen}
        SortVal={SortVal}
        setSortVal={setSortVal}
        InvOption={InvOption}
        setInvOption={setInvOption}
        CompanySize={CompanySize}
        setCompanySize={setCompanySize}
        RiskVal={RiskVal}
        setRiskVal={setRiskVal}
        MarketCapVal={MarketCapVal}
        setMarketCapVal={setMarketCapVal}
        CountryVal={CountryVal}
        setCountryVal={setCountryVal}
        CompAge={CompAge}
        setCompAge={setCompAge}
        InvstFreqVal={InvstFreqVal}
        setInvstFreqVal={setInvstFreqVal}
        CompIndstryVal={CompIndstryVal}
        setCompIndstryVal={setCompIndstryVal}
        ImpactDomainVal={ImpactDomainVal}
        setImpactDomainVal={setImpactDomainVal}
        MinAmt={MinAmt}
        setMinAmt={setMinAmt}
        onReset={() => {
          setFilterActive(false);
          setImpactDomainVal([]);
          setCompIndstryVal([]);
          setInvstFreqVal("");
          setSortVal("");
          setInvOption([]);
          setCompanySize([]);
          setRiskVal([]);
          setMarketCapVal("");
          setCountryVal([]);
          setCompAge("");
          setInvstFreqVal("");
          setCompIndstryVal([]);
          setImpactDomainVal([]);
          setMinAmt(0);
          setrenderData(DATA);
        }}
        onApply={() => {
          setFilterActive(true);
          setIsOpen(false);
        }}
        onOuterClick={() => setIsOpen(false)}
      ></BottomSheet>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({});
