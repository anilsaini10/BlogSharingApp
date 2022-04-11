import React from "react";
import { View, Text } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// importing all pages components
import Home from "../Screens/Home";
import Post from "../Screens/Post";
import SettingPage from "../Screens/SettingPage";
import Login from "../Login";

// creating a variable for BottomTabNavigator so that we can use in component

// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          // tabBarActiveTintColor: 'black',
          tabBarLabelStyle: { fontSize: 15, fontWeight: "bold", marginTop: 45 },
          tabBarStyle: { backgroundColor: "powderblue" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="Post"
          component={Post}
          options={{ tabBarLabel: "Post" }}
        />
        <Tab.Screen
          name="SettingPage"
          component={SettingPage}
          options={{ tabBarLabel: "More" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// const MainNavigator = ({navigation}) => {
//   return (
//     <NavigationContainer>
//     <Stack.Navigator
//       screenOptions={{
//         // headerShown: false,
//       }}
//       initialRouteName="Login"
//     >
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Post" component={Post} />
//       <Stack.Screen name="Settings" component={SettingPage} />
//     </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default MainNavigator;
