import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const userList = [
  { user: "shubam", password: "shubam" },
  { user: "shubam2", password: "shubam2" },
  { user: "shubam3", password: "shubam3" },
];

import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./Navigator/Navigation";

const Login = ({ navigation }) => {
  console.log(navigation);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [register, setRegister] = useState(false);

  // function to get token/username if it is login then we will set username.
  useEffect(() => {
    const getLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("username"); // from async we will get username.

        if (token) {
          // If username is not null then token will not be null and we will set userlogin true.
          console.log("Login");
          setIsLogin(true);
        }
      } catch (error) {
        console.log(error); // if not login then print error.
      }
    };
    getLoginStatus();
  }, []);

  // Function to login.

  const loginHandler = async () => {
    console.log("Login Function Start");

    if (
      username !== "" &&
      password !== "" &&
      username != null &&
      password != null
    ) {
      userList.forEach((it) => {
        if (username === it["user"] && password === it["password"]) {
          // If username and password match with array(data)
          //  then we will authencticate user.
          AsyncStorage.setItem("username", username); // store the username in asyncstorage.
          setIsLogin(true);
          console.log(username, password);
        }
      });
    }

    console.log("Login Function End");
  };

  const signupHandler = async () => {

    // if username, password and password2 are valid then we will send request to api for new user register request.
    if(username!==null && username!=="" && password!==null && password!== "" && password===password2){

      const url = "";
  
      const request = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: username,
          password: password,
        }),
        
      });

    }else{ // If user enter invalid username or password then set username, password and password2 empty.

      Alert.alert("Please enter valid input!");
      setUsername("");
      setPassword("");
      setPassword2("");
      
    }


    if(request.status == 200){
      if (username === it["user"] && password === it["password"]) {
        
        Alert.alert("Post Sucessfully!");
        console.log("Signup successfully!");
      }
    }else{

      console.log(request);
      Alert.alert("Oops some error occured!");
    }

  }

  return (
    <>
      {isLogin ? (
        <Home />
      ) : (
        <>
          {register ? (
      // If user pressed for register then this register page will return to user for signup.
      
      <View style={styles.container}>
      <View style={styles.loginCard}>
        <Text style={{ marginLeft: 4, fontSize: 17 }}>Username:</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Username"
            style={styles.textInput}
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <Text style={{ marginLeft: 4, fontSize: 17 }}>Password:</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <Text style={{ marginLeft: 4, fontSize: 17 }}>Password again:</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text) => setPassword2(text)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            signupHandler();
          }}
        >
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Signup</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setRegister(false);
          }}
        >
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
          ) : (

            // If user want to login then this screen will return to user.
            <View style={styles.container}>
              <View style={styles.loginCard}>
                <Text style={{ marginLeft: 4, fontSize: 17 }}>Username:</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder="Username"
                    style={styles.textInput}
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>

                <Text style={{ marginLeft: 4, fontSize: 17 }}>Password:</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder="Password"
                    textContentType="password"
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => {
                    loginHandler();
                  }}
                >
                  <View style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setRegister(true);
                  }}
                >
                  <View style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Signup</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display: "flex",
    justifyContent: "center",
    marginTop: "10%",
  },

  loginCard: {
    margin: 12,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "gray",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 10,
    shadowRadius: 5,
    alignSelf: "center",
    width: "80%",
    elevation: 8,
  },

  textInputContainer: {
    marginBottom: 6,
    color: "purple",
    height: 25,
  },
  textInput: {
    borderBottomWidth: 1,
    margin: 4,
    fontSize: 15,
  },

  loginButton: {
    backgroundColor: "orange",
    textAlign: "center",
    alignSelf: "center",
    height: 30,
    borderWidth: 1,
    width: "40%",
    marginTop: 10,
    borderRadius: 6,

    // width: 150,
    height: 40,
    justifyContent: "center",
    // alignItems: "center",
    // marginTop: "5%",
    // elevation: 3,
    borderRadius: 50,
    backgroundColor: "orange",
  },

  InputContainer: {
    display: "flex",
    // flexDirection: "col",
  },

  loginButtonText: {
    display: "flex",
    textAlign: "center",
  },
});
