const {
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} = require('react-native');
import * as React from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import styles from "../LoginStyle"
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Error from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";



export function Register() {

  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState('');
  const [ageVerify, setAgeVerify] = useState(false);

  const [loading,setLoading]=useState(false);

  const auth= FIREBASE_AUTH;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      
      // Get the user's unique ID
      const userId = response.user.uid;
  
      // Add user data to Firestore with the user's ID as document ID
      await setDoc(doc(FIREBASE_DB, "users", userId), {
        name: name,
        age: age,
        mobile: mobile
      });
  
      alert('User Registered');
    } catch (error) {  
      console.log(error);
      alert('Registration failed: '+ error.message);
    } finally {
      setLoading(false);
    }
  };

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);

    if (nameVar.length > 1) {
      setNameVerify(true);
    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }

  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(false);
    if (/[6-9]{1}[0-9]{9}/.test(mobileVar)) {
      setMobile(mobileVar);
      setMobileVerify(true);
    }
  }
  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }
  function handleAge(e) {
    const ageVar = e.nativeEvent.text;
    setAge(ageVar);
    setAgeVerify(false);
    if (ageVar.length > 0 && !isNaN(ageVar)&& parseInt(ageVar) >= 10 && parseInt(ageVar) <= 100){
    setAgeVerify(true);
    }
  }



  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}
      style={{backgroundColor: 'black'}}>
      <View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/logoupdated.jpeg')}
          />
        </View>
        <View style={styles.loginContainer}>
          

          {/* <View style={styles.radioButton_div}>
            <Text style={styles.radioButton_title}> Login as</Text>
            <View style={styles.radioButton_inner_div}>
              <Text style={styles.radioButton_text}>User</Text>
              <RadioButton
                value="User"
                status={userType == 'User' ? 'checked' : 'unchecked'}
                onPress={() => setUserType('User')}
              />
            </View>
            <View style={styles.radioButton_inner_div}>
              <Text style={styles.radioButton_text}>Admin</Text>
              <RadioButton
                value="Admin"
                status={userType == 'Admin' ? 'checked' : 'unchecked'}
                onPress={() => setUserType('Admin')}
              />
            </View>
          </View> */}

          {/* {userType == 'Admin' ? (
            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#420475"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Secret Text"
                style={styles.textInput}
                onChange={e => setSecretText(e.nativeEvent.text)}
              />
            </View>
          ) : (
            ''
          )} */}

          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Name"
              placeholderTextColor="white"
              style={styles.textInput}
              onChange={e => handleName(e)}
            />
            {name.length < 1 ? null : nameVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {name.length < 1 ? null : nameVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Name sholud be more then 1 characters.
            </Text>
          )}
          <View style={styles.action}>
            <FontAwesome
              name="birthday-cake"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Age"
              placeholderTextColor="white"
              style={styles.textInput}
              onChange={e => handleAge(e)}
              keyboardType="numeric"
            />
            {age.length < 1 ? null : ageVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {age.length > 0 && !ageVerify && (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Please enter a valid age.
            </Text>
          )}
        
          <View style={styles.action}>
          <Fontisto
              name="email"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="white"
              style={styles.textInput}
              onChange={e => handleEmail(e)}
            />
            {email.length < 1 ? null : emailVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Enter Proper Email Address
            </Text>
          )}
          <View style={styles.action}>
            <FontAwesome
              name="mobile"
              color="white"
              size={35}
              style={{paddingRight: 10, marginTop: -7, marginLeft: 3, marginBottom: 2}}
            />
            <TextInput
              placeholder="Mobile"
              placeholderTextColor="white"
              style={styles.textInput}
              onChange={e => handleMobile(e)}
              maxLength={10}
            />
            {mobile.length < 1 ? null : mobileVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {mobile.length < 1 ? null : mobileVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Phone number with 6-9 and remaing 9 digit with 0-9
            </Text>
          )}
          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="white"
              style={styles.textInput}
              onChange={e => handlePassword(e)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name="eye"
                  style={{marginRight: 1}}
                  color={passwordVerify ? 'green' : 'red'}
                  size={23}
                />
              ) : (
                <Feather
                  name="eye-off"
                  style={{marginRight: 1}}
                  color={passwordVerify ? 'green' : 'red'}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Uppercase, Lowercase, Number and 6 or more characters.
            </Text>
          )}
        </View>
        <View style={styles.button}>
          {loading ? <ActivityIndicator size="large" color="#0000ff" />
          :<>
           <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
            <View>
              <Text style={styles.textSign}>Register</Text>
            </View>
          </TouchableOpacity>
          </>
        
          }
         
        </View>
      </View>
    </ScrollView>
  );
};

