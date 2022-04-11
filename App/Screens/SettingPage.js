import React, { useState } from "react";
import {
  View,
  Text,
  Linking,
  Button,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

// import * as ImagePicker from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "../Navigator/Navigation";
import Login from "../Login";
import App from "../../App";

const SettingPage = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  // Hanling Camera/Gallery

  const openCameraWithPermission = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      // MediaTypeOptions: "video",
      mediaTypes: "Videos",
    });

    console.log(result);
    // console.log(status);

    if (!result.cancelled) {
      // setImage(result.uri);
      console.log(result.uri);
    }
  };

  // We will handle logout function to logout user.
  const logoutHandler = async () => {
    await AsyncStorage.removeItem("username");

    setIsLogin(false);

    console.log("Logout Succsfully");

    Alert.alert(
      "Alert ",
      "Logout Successfully! ",
      [
        {
          text: "Cancel",
          // onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        // onDismiss: () =>
        //   Alert.alert(
        //     "This alert was dismissed by tapping outside of the alert dialog."
        //   ),
      }
    );
  };

  return (
    <View style={styles.container}>
      {!isLogin ? (
        // If user is not login then we will send them to login screen.
        <Login />
      ) : (
        // If user is already login then we will show Setting/More options screen.
        <>
          <TouchableOpacity
            onPress={() => {
              Linking.openSettings();
            }}
          >
            <View style={styles.buttons}>
              <Text>Settings</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              openCameraWithPermission();
            }}
          >
            <View style={styles.buttons}>
              <Text>Camera</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL("tel:1234567899");
            }}
          >
            <View style={styles.buttons}>
              <Text>Make Call</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              logoutHandler();
            }}
          >
            <View style={styles.buttons}>
              <Text>Logout</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  container: {
    margin: 30,
    // backgroundColor: "red",
  },
  buttons: {
    backgroundColor: "red",
    marginVertical: 5,
    height: 45,
    width: "35%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
