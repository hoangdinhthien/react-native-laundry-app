import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export default function WelcomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        ></Image>
        <Text style={styles.headerText}>Little Lemon</Text>
      </View>
      <ScrollView>
        <Text style={styles.regularText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat
          mauris quis nisl tincidunt, a consectetur ex facilisis. Quisque sed
          tortor sit amet odio varius tincidunt. Vestibulum tristique nunc nec
          sapien eleifend, ac malesuada odio dignissim. Phasellus ut libero id
          orci euismod venenatis. Praesent bibendum dapibus ligula, nec finibus
          velit. Nam ultricies justo
        </Text>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    padding: 40,
    fontSize: 39,
    color: "#EDEFEE",
    textAlign: "center",
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
});
