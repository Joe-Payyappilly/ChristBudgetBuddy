const {
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} = require('react-native');

import * as React from "react";
import { StyleSheet, View, Text,Image, ActivityIndicator } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from "../LoginStyle";
import { useNavigation } from "@react-navigation/native";
import { useEffect,useState } from "react";
import { FIREBASE_AUTH } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


export function LoginPage({props}) {

  const navigation= useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordVerify, setPasswordVerify] = useState(false);

  const auth= FIREBASE_AUTH;

  const handleSubmit = async () => {
    setLoading(true);
    try{
      const response= await signInWithEmailAndPassword(auth,email, password)
      console.log(response);
    }
    catch (error){
      console.log(error);
      alert('Sign in failed: '+ error.message);
    }
    finally
    {
      setLoading(false);
    }
    
  }

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}>
      <View style={{backgroundColor: 'black',minHeight: '100%'}}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}  source={require('../assets/logoupdated.jpeg')}/>
        </View>
        <View style={styles.loginContainer}>
          
          <View style={styles.action}>  
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="white"
              style={styles.textInput}
              onChange={e => setEmail(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="white"
              style={styles.textInput}
              onChange={e => setPassword(e.nativeEvent.text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name="eye"
                  style={{marginRight: 1}}
                  color= 'white'
                  size={23}
                />
              ) : (
                <Feather
                  name="eye-off"
                  style={{marginRight: 1}}
                  color= 'white'
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 8,
              marginRight: 10,
            }}>
            <Text style={{color: '#420475', fontWeight: '700'}}>
              Forgot Password
            </Text>
          </View> */}
        </View>
        <View style={styles.button}>
          {loading ? <ActivityIndicator size="large" color="#0000ff" />
          :<>
          <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
            <View>
              <Text style={styles.textSign}>Log in</Text>
            </View>
          </TouchableOpacity>
          </>
          }
          
          <View style={{padding: 15}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#919191'}} onPress={() => {
                  navigation.navigate('Register'as never);
                }}>
              ----New here? <Text style={{textDecorationLine: 'underline', }}>SignUP</Text>----
            </Text>
          </View>
          
        </View>
      </View>
    </ScrollView>
  );
};




