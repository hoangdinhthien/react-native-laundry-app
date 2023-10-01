import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello Nhom4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 300,
    alignItems: "center",
  },
});
