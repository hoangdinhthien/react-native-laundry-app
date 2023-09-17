import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: 'rgb(135, 58, 249)',
              fontWeight: 'bold',
            }}
          >
            Sign In
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              marginTop: 8,
            }}
          >
            Sign In to your account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name='email-outline'
              size={25}
              color='black'
            />
            <TextInput
              placeholder='Email'
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={'black'}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                marginLeft: 15,
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name='key-outline'
              size={25}
              color='black'
            />
            <TextInput
              placeholder='Password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor={'black'}
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                marginLeft: 15,
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>

          <Pressable
            style={{
              width: 200,
              backgroundColor: '#318CE7',
              padding: 15,
              borderRadius: 8,
              marginTop: 50,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Register')}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                color: 'gray',
                fontWeight: '500',
              }}
            >
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
