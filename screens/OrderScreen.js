import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const OrderScreen = () => {
  return (
    <View>
      <LottieView source={require('../assets')} />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
