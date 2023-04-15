import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import axios from "axios";
import { baseUrl } from "./BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserSignUp } from "./interfaces";
import { SignUpFun, loginFun } from "./Func";

interface AuthCon {
  user: User;
  signUp: (obj: any) => Promise<true>;
  signIn: (uname: string, pass: string) => void;
  signOut: () => void;
  putIdPass: (id: string, pass: string) => void;
  portFolioAmt: number;
  QuantityTotal: number;
}
const appContext = createContext<AuthCon | null>(null);
export function ContextProvider({ children }: any) {
  const context = useContextProvided();
  //@ts-ignore
  return <appContext.Provider value={context}>{children}</appContext.Provider>;
}

export const useAppContext = () => {
  return useContext(appContext);
};
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
function useContextProvided() {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const [portFolioAmt, setPortFolioAmt] = useState(0);
  const [QuantityTotal, setQuantityTotal] = useState(0);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    AsyncStorage.getItem("userCred").then((val) => {
      if (val) {
        const userCred = JSON.parse(val);
        signIn(userCred.username, userCred.password);
      }
    });
    AsyncStorage.getItem("putIDpass").then((val) => {
      if (val) {
        const creds = JSON.parse(val);
        console.log(creds);
        //@ts-ignore
        setUser(creds);
        // putIdPass(creds);
      }
    });
    // AsyncStorage.removeItem('putIDpass')
  }, []);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const signUp = async (obj: UserSignUp) => {
    console.log(obj);
    // AsyncStorage.setItem("kycSubmit", "true");
    const IDpass = await AsyncStorage.getItem("putIDpass");
    //@ts-ignore
    const pass = JSON.parse(IDpass);
    console.log(pass.pass);
    const token = await registerForPushNotificationsAsync();
    const suc = await SignUpFun(obj, pass.pass, token ? token : "");
    if(suc){
      signIn(obj.email,pass.pass)
    }
    // setUser({
    //   user: obj.uname,
    //   pass: obj.pass,
    //   isAuth: false,
    // });
    // signIn(obj.email,obj.pass)
  };
  const signOut = async () => {
    await AsyncStorage.removeItem("userCred");
    setUser(undefined);
  };
  const signIn = async (uname: string, pass: string) => {
    const apiRes = await loginFun(uname, pass);
    setUser(apiRes);
    await AsyncStorage.setItem(
      "userCred",
      JSON.stringify({
        username: uname,
        password: pass,
      })
    );
    // setUser({
    //   username: uname,
    //   pass: pass,
    //   isAuth: true,
    // });
  };
  const putIdPass = async (id: string, pass: string) => {
    //@ts-ignore
    setUser({
      email: id,
      isAuth: null,
    });
    await AsyncStorage.setItem(
      "putIDpass",
      JSON.stringify({
        username: id,
        pass: pass,
        isAuth: null,
      })
    );
  };

  return {
    user,
    signUp,
    putIdPass,
    signIn,
    signOut,
    portFolioAmt,
    QuantityTotal,
  };
}
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
