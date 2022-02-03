import React from "react";
import { Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Explore from "../screens/Main/Explore";
import Saved from "../screens/Main/Saved";
import MapScreen from "../screens/Main/Map";
import Profile from "../screens/Main/Profile";
import colors from "../colors";
import utils from "../utils";
import Room from "../screens/Main/Room";
import BackBtn from "../components/Auth/BackBtn";
import Search from "../screens/Main/Search";
import styled from "styled-components/native";

const Label = styled.Text`
  font-size:10px;
  color:${props => props.focused? colors.red : "grey"};
`;
const TabsNavigator = createBottomTabNavigator();
const Tabs = () => (
  <TabsNavigator.Navigator
    // tabBarOptions={{
    //   activeTintColor: colors.red,
    //   tabStyle: {
    //     paddingTop: 10
    //   },
    //   labelStyle: {
    //     textTransform: "uppercase",
    //     fontWeight: "600"
    //   }
    // }}
    screenOptions={({ route }) => ({
      tabBarStyle: {
        paddingTop: 5
      },
      tabBarActiveTintColor: colors.red,
      //header:()=>null,
      title: ({ focused }) => {
        let title = '';
        if (route.name === "Explore") {
          title = "검색";
        } else if (route.name === "Saved") {
          title = "위치리스트";
        } else if (route.name === "Map") {
          title = "지도";
        } else if (route.name === "Profile") {
          title = "프로필";
        }
        return <Label focused={focused}>{title}</Label>
      },
      tabBarIcon: ({ focused }) => {
        const isAndroid = utils.isAndroid();
        let iconName = `${isAndroid ? "md-" : "ios-"}`;
        if (route.name === "Explore") {
          iconName += "search";
        } else if (route.name === "Saved") {
          iconName += "heart-outline";
        } else if (route.name === "Map") {
          iconName += "map-outline";
        } else if (route.name === "Profile") {
          iconName += "person-circle-outline";
        }
        return (
          <Ionicons
            name={iconName}
            size={24}
            color={focused ? colors.red : "grey"}
          />
        );
      }
    })}
  >
    <TabsNavigator.Screen name="Explore"  component={Explore}></TabsNavigator.Screen>
    <TabsNavigator.Screen name="Saved" component={Saved}></TabsNavigator.Screen>
    <TabsNavigator.Screen name="Map" component={MapScreen}></TabsNavigator.Screen>
    <TabsNavigator.Screen name="Profile" component={Profile}></TabsNavigator.Screen>
  </TabsNavigator.Navigator>
);


const MainNavigator = createStackNavigator();
export default () => (
  <MainNavigator.Navigator 
    screenOptions={{ 
      presentation:"modal",
      headerBackTitleVisible: false, 
      //headerTintColor: "rgb(50,50,50)" ,
      headerBackImage:()=><BackBtn />
    }}>
    <MainNavigator.Screen
      name="Tabs"
      component={Tabs}
      options={{ headerShown: false }}
    />
    <MainNavigator.Screen 
      name="RoomDetail" 
      component={Room} 
      options={{ 
        headerTransparent: true,
        headerBackground: () => (
          <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        ),
      }}
    />
    <MainNavigator.Screen 
      name="Search" 
      component={Search} 
      options={{
        header:() => null
      }}
    />
  </MainNavigator.Navigator>
);