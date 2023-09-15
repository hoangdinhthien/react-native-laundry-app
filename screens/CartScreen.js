import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { decrementQuantity, incrementQuantity } from '../CartReducer';
import { incrementQty } from '../ProductReducer';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const route = useRoute();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        {total === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginTop: 40 }}>Your Cart empty</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons
                onPress={() => navigation.goBack()}
                name='arrow-back'
                size={24}
                color='black'
              />
              <Text>Your bucket</Text>
            </View>

            <Pressable
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                marginLeft: 10,
                marginRight: 10,
                padding: 12,
              }}
            >
              {cart.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 15,
                  }}
                >
                  <Text style={{ width: 100, fontSize: 16, fontWeight: 500 }}>
                    {item.name}
                  </Text>
                  {/* + - button */}
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: 'center',
                      borderColor: '#BEBEBE',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); //CART
                        dispatch(incrementQty(item)); //PRODUCT
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#088F8F',
                          paddingHorizontal: 6,
                          fontWeight: '600',
                        }}
                      >
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: '#088F8F',
                          paddingHorizontal: 8,
                          fontWeight: '600',
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); //CART
                        dispatch(incrementQty(item)); //PRODUCT
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#088F8F',
                          paddingHorizontal: 6,
                          fontWeight: '600',
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 30 }}>
                Billing details
              </Text>
              <View
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: '400' }}>
                    {total} $
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                  >
                    Delivery Fee | 1.2 KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}
                  >
                    FREE
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}
                  >
                    Free Delivery on Your Order
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: 'gray',
                    heigh: 1,
                    borderWidth: 1,
                    marginTop: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}
                  >
                    Selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}
                  >
                    {/* {route.params.pickUpdate} */}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}
                  >
                    No. Of Days
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}
                  >
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}
                  >
                    Selected Pick Up Time
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}
                  >
                    {route.params.selectedTime}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: 'gray',
                    heigh: 1,
                    borderWidth: 1,
                    marginTop: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 1,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {total + 95}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: '#088F8F',
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 9,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
              {cart.length} item(s) | {total} $
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                color: 'white',
                marginVertical: 6,
              }}
            >
              Extra charges might apply
            </Text>
          </View>
          <Pressable>
            <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
