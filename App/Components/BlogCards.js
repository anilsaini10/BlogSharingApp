import React from "react";
import { View, Text, StyleSheet } from "react-native";

// design component to use it in different component.

const BlogCard = (props) => {
  console.log(props); // In props we are sending username, blog body and date of post.
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.username}>Name: {props.user}</Text>
        <Text style={styles.postText}>{props.body}</Text>
        <View style={styles.date}>
          <Text>{props.date}</Text>
        </View>
      </View>
    </View>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    shadowColor: "gray",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 10,
    shadowRadius: 5,
    alignSelf: "center",
    width: "80%",
    elevation: 8,
    margin: 20,
  },
  username: {
    fontWeight: "bold",
    padding: 20,
  },
  postText: {
    padding: 20,
  },
  date: {
    width: "40%",
    alignSelf: "flex-end",
    marginVertical: 2,
    padding: 20,
  },
});
