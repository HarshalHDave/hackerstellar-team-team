import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import SafeArea from "../../components/SafeArea";
//@ts-ignore
import OTPTextInput from "react-native-otp-textinput";
import CustButton from "../../components/CustButton";
const KycScreen2 = ({ navigation, route }: any) => {
  const [Otp, setOtp] = useState("");
  console.log(route.params);
  return (
    <SafeArea>
      <>
        {/* @ts-ignore  */}
        <OTPTextInput
          handleTextChange={(val: any) => setOtp(val)}
          textInputStyle={{ color: "white" }}
          tintColor="#4896f0"         
        />
        <TouchableOpacity>
          <Text style={{ fontFamily: 'm', fontSize: 14, color: '#aaa', textAlign: 'center', marginTop: 24 }}>Click here to resend OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (Otp.length == 4) {
              navigation.navigate("KycScreen3", { otp: Otp, ...route.params });
            }
          }}
          style={{ backgroundColor: '#4896f0', height: 48, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 100, position: 'absolute', bottom: 48, alignSelf: 'center' }}>
          <Text style={{ color: '#fefefe', fontSize: 18, textAlign: 'center', fontFamily: 'mm' }}>Next</Text>
        </TouchableOpacity>
      </>
    </SafeArea>
  );
};

export default KycScreen2;

const styles = StyleSheet.create({});
