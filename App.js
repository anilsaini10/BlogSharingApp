import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

//importing Main Navigator
// import MainNavigator from "./App/Navigator/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./App/Login";
import Home from "./App/Screens/Home";
import Post from "./App/Screens/Post";
import SettingPage from "./App/Screens/SettingPage";
import MainNavigator from "./App/Navigator/Navigation";



const Stack = createStackNavigator();

export default function App() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const getLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("username");
        if (token) {
          console.log("Login");
          setIsLogin(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLoginStatus();
  }, []);

  return (
    <>
      {!isLogin ? (
        <Login />
      ) : (
        
          <MainNavigator />
        
      )}
    </>
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false,
    //     }}
    //     initialRouteName="Login"
    //   >
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Home" component={Home} />
    //     <Stack.Screen name="Post" component={Post} />
    //     <Stack.Screen name="Settings" component={SettingPage} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
