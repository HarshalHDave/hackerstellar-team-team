import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import SafeArea from "../../components/SafeArea";
import Navbar from "../../components/Navbar";
import { Formik } from "formik";
import { useAppContext } from "../../lib/Context";
import CustButton from "../../components/CustButton";

const KycScreen6 = ({ navigation , route}: any) => {
  console.log(route.params)
  const auth = useAppContext();
  return (
    <SafeArea>
      <>
        <Formik
          initialValues={{
            profession: "",
            experience: "",
            income: "",
          }}
          onSubmit={(values) => {
            // console.log({...values,...route.params})
            // auth?.signUp();
            navigation.navigate("KycScreen7",{...values,...route.params})
            // auth?.signIn(values.profession, values.experience);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{ marginTop: 35 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "#fefefe",
                  marginBottom: 5,
                }}
              >
                Your Profession :
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Eg: Student"}
                    value={values.profession}
                    autoCapitalize="none"
                    onChangeText={handleChange("profession")}
                    placeholderTextColor={"grey"}
                  />
                </View>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "#fefefe",
                  marginBottom: 5,
                }}
              >
                Your Experience :
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginVertical: 20,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.expButton,
                    values.experience == "2" && { borderColor: "#4896f0", borderWidth: 1.6 },
                  ]}
                  onPress={() => handleChange("experience")("2")}
                >
                  <Text style={{ color: "#fefefe" }}>0 - 2 Years</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.expButton,
                    values.experience == "3" && { borderColor: "#4896f0", borderWidth: 1.6 },
                  ]}
                  onPress={() => handleChange("experience")("3")}
                >
                  <Text style={{ color: "#fefefe" }}>3 - 5 Years</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.expButton,
                    values.experience == "5" && { borderColor: "#4896f0", borderWidth: 1.6 },
                  ]}
                  onPress={() => handleChange("experience")("5")}
                >
                  <Text style={{ color: "#fefefe" }}>5 - 9 Years</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "#fefefe",
                  marginBottom: 5,
                }}
              >
                Your Income (per anum) :
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.searchBar]}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Eg: 500000"}
                    value={values.income}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={handleChange("income")}
                    placeholderTextColor={"#aea0ae"}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={{ backgroundColor: '#4896f0', height: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 100, alignSelf: 'center', marginBottom: 64 }}>
                <Text style={{ color: '#fefefe', fontSize: 18, textAlign: 'center', fontFamily: 'mm' }}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </>
    </SafeArea>
  );
};

export default KycScreen6;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  expButton: {
    paddingHorizontal: 8,
    flexDirection: "row",
    borderWidth: 0.6,
    borderColor: "#aea0ae",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 8,
  },
  searchBar: {
    paddingHorizontal: 8,
    marginTop: 4,
    flexDirection: "row",
    width: "99%",
    borderWidth: 1,
    borderColor: "#aea0ae",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 8,
  },
  input: {
    fontSize: 16,
    marginLeft: 8,
    width: "100%",
    color: "#fefefe",
    fontFamily: 'm'
  },
});
