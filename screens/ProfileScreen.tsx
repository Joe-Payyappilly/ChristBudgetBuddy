import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Error from 'react-native-vector-icons/MaterialIcons';



export const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [age, setAge] = useState('');
  const [ageVerify, setAgeVerify] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  

  

  const handleEditProfile = async () => {
    try {
      // Get the currently logged-in user
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        // Get the user's ID
        const userId = user.uid;
        // Update user data in Firestore based on the user's ID
        await updateDoc(doc(FIREBASE_DB, "users", userId), {
          name: name,
          age: age,
          mobile: mobile
        });
        setAge('');
        setName('');
        setMobile('');
        console.log("User data updated successfully");
        alert('Profile updated');
      }
    } catch (error) {
      console.error("Error updating user data:", error);
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

  function handleAge(e) {
    const ageVar = e.nativeEvent.text;
    setAge(ageVar);
    setAgeVerify(false);
    if (ageVar.length > 0 && !isNaN(ageVar)&& parseInt(ageVar) >= 10 && parseInt(ageVar) <= 100){
    setAgeVerify(true);
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

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Placeholder for the profile photo */}
        <Ionicons name="person" size={80} color="#FFF" />
      </View>
      <Text style={styles.heading}>Profile</Text>
      
      <View>
      <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Name"
              value={name}
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
              value={age}
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
            <FontAwesome
              name="mobile"
              color="white"
              size={35}
              style={{paddingRight: 10, marginTop: -7, marginLeft: 3, marginBottom: 2}}
            />
            <TextInput
              placeholder="Mobile"
              value={mobile}
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
    </View>
    
      {/* Edit button */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  editButton: {
    top: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 120,
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  action: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'white', // Change border color to white
    borderRadius: 50,
  },
  smallIcon: {
    marginRight: 10,
    marginBottom: 10,
    fontSize: 24,
    color: 'white', // Change icon color to white
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    color: 'white', // Change text color to white
  },
});
