import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

import PostForm from "../Components/PostForm";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../Login";

const Post = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);

  const token = AsyncStorage.getItem("username");
  console.log(token);
  useEffect(() => {
    AsyncStorage.getItem("username").then((t) => {
      if (t) {
        console.log(t);
        setIsLogin(1);
      } else {
        setIsLogin(0);
      }
    });
    console.log(isLogin);
  });
 

  return (
    <>
      {!isLogin ? ( 
        // If user is not login then we will send them to login screen.
        <Login />
      ) : (
        // If user is already login then we will show postform screen.
        <>
        {/* calling Postform component */}
          <PostForm />  
          
        </>
      )}
    </>
  );
};

export default Post;
