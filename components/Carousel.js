import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://cdnb.artstation.com/p/assets/images/images/066/000/955/large/wlop-25-1se.jpg?1691765242",
    "https://cdna.artstation.com/p/assets/images/images/062/758/394/large/wlop-8se.jpg?1683875017",
  ];

  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{ borderRadius: 6, width: "94%" }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
