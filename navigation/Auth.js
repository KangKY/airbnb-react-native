import React from "react";
import { Platform, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Auth/Welcome";
import SignIn from "../screens/Auth/SignIn.js";
import SignUp from "../screens/Auth/SignUp";
import BackBtn from "../components/Auth/BackBtn";

const AuthStack = createStackNavigator();


export default () => (
  <AuthStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      gestureEnabled: true,
      presentation: "modal",
      headerMode: "float",
      headerTitleAlign:"center",
      headerTransparent: true,
      headerBackImage: () => <BackBtn />
    }}
  >
    <AuthStack.Screen name="Welcome" component={Welcome} options={{
      headerTitleStyle: {
        color:"#fff"
      }
    }}/>
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);
