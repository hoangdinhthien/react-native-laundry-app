import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { decrementQuantity, incrementQuantity } from '../CartReducer';
import { incrementQty } from '../ProductReducer';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ marginTop: 50 }}>
      {total === 0 ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ marginTop: 40 }}>Your Cart empty</Text>
        </View>
      ) : (
        <>
          <View
            style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
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
              padding: 14,
            }}
          >
            {cart.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
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
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
