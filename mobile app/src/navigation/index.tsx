import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserStack from "./UserStack";
import { useAppContext } from "../lib/Context";
import AuthStack from "./AuthStack";
import KycStack from "./KycStack";
import Waiting from "../screens/Waiting";

const index = () => {
  const auth = useAppContext();
  console.log(auth?.user? "hi":'hello');
  return auth?.user ? (
    <>
      {/* {auth.user.isAuth == undefined && <AuthStack></AuthStack>} */}
      {auth.user.isAuth == true && <UserStack />}
      {auth.user.isAuth == false && <Waiting />}
      {/* @ts-ignore */}
      {auth.user.isAuth == null && <KycStack />}
      {/* {auth.user.isAuth != undefined ? (
        auth.user.isAuth == true ? (
          <UserStack />
        ) : (
          <Waiting />
        )
      ) : (
        <AuthStack></AuthStack>
      )} */}
    </>
  ) : (
    <AuthStack />
  );
};

export default index;

const styles = StyleSheet.create({});
