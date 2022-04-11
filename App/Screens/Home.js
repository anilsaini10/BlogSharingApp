import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
  FlatList,
} from "react-native";

import BlogCard from "../Components/BlogCards";

import Login from "../Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setLoad(true);
    fetch("https://m0jxa0gz8l.execute-api.ap-south-1.amazonaws.com/Test/blog")
      .then((e) => e.json())
      .then((t) => {
        // console.log(t['Items'])
        setBlogs(t["Items"]);
      });

    console.log(blogs);
    setLoad(false);

    // AsyncStorage.getItem("username").then((t)=>{
    //   if(t){
    //     console.log(t)
    //     setIsLogin(1);
    //   }
    //   else{
    //     setIsLogin(0);
    //   }
    // })
    // console.log(isLogin);

    // const getLoginStatus = async () => {
    //   try {
    //     const token = await AsyncStorage.getItem("username");
    //     if (token) {
    //       console.log("Login");
    //       setIsLogin(true);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getLoginStatus();
  }, []);

  return (
    <>
      {load ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <>
          {!isLogin ? (
            // If user is not login then we will send them to login screen.
            <Login />
          ) : (
            // If user is already login then we will show Home screen.
            <>
              <FlatList
                data={blogs}
                // keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                  <BlogCard
                    user={item.user.S}
                    date={item.date.S}
                    body={item.body.S}
                  />
                )}
              />

              {/* <ScrollView>
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
              </ScrollView> */}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  loader: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 50,
  },
  textButtons: {
    // backgroundColor: "orange",
    fontWeight: "bold",
    width: 50,
    borderRadius: 6,
    fontSize: 15,
  },
});
