import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const PostForm = ({ navigation }) => {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  const postHandler = async () => {
    console.log("PostHandler start");

    const value = await AsyncStorage.getItem("username");
    console.log(value);
    setUsername(value);

    const url =
      "https://m0jxa0gz8l.execute-api.ap-south-1.amazonaws.com/Test/blog";
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: username,
        date: new Date(),
        body: text,
      }),
    });

    if (request.status == 200) {
      // If request is ok(200) then we will show success alert to user.
      setText("");
      console.log("Post successfully!");
      Alert.alert("Post Sucessfully!");
    } else {
      // Else some error occured.
      console.log("Some error occured!");
    }

    console.log("PostHandler End");
  };

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <TextInput
          placeholder="Type here"
          onChangeText={(e) => setText(e)}
          value={text}
          multiline={true}
          style={{ height: "100%", padding: 5, margin: 5, textAlign: "left" }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          postHandler();
        }}
      >
        <View style={styles.postButton}>
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>Post</Text>
        </View>
      </TouchableOpacity>
      <Text>{username}</Text>
    </View>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {
    height: "60%",
    width: "90%",
    marginVertical: 10,
    shadowColor: "gray",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 10,
    shadowRadius: 5,
    alignSelf: "center",
    elevation: 8,
    borderWidth: 1,
  },

  postButton: {
    height: 40,
    borderRadius: 20,
    width: "35%",
    backgroundColor: "gray",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
