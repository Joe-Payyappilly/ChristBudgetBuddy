import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';


type StackParamList = {
  Settings: undefined;
  Profile: undefined;
  NotificationSettings: undefined;
  Login:undefined;
  Signup:undefined
};

// interface RouterProps{
//   navigation: NavigationProp<any,any>;
// }


export function Settings({}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList, 'Settings'>>();

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleNotificationSettings = () => {
    navigation.navigate('NotificationSettings');
  };

  const handleReportProblem = () => {
    navigation.navigate('Login');
  };

  const handleLogout = () => {
   FIREBASE_AUTH.signOut()
  };
  
  const [userData, setUserData] = useState(null);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = doc(FIREBASE_DB, "users", userId);
  
          // Subscribe to real-time updates on the user's data
          const unsubscribe = onSnapshot(userRef, (doc) => {
            setUserData(doc.data());
          });
  
          // Unsubscribe when the component unmounts
          return () => unsubscribe();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Placeholder for the profile photo */}
        <Ionicons name="person" size={80} color="#FFF" />
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Name:  {userData?.name} </Text>
        <Text style={styles.detailText}>Age: {userData?.age}</Text>
        <Text style={styles.detailText}>Phone No:  {userData?.mobile}</Text>
        {/* Add more details here */}
      </View>
     

      <TouchableOpacity style={styles.settingItem} onPress={handleGoToProfile}>
        <Ionicons name="person" size={30} color="#FFF" />
        <Text style={styles.settingText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handleNotificationSettings}>
        <Ionicons name="analytics-outline" size={30} color="#FFF" />
        <Text style={styles.settingText}>Set Budget</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.settingItem} onPress={handleReportProblem}>
        <Ionicons name="bug" size={30} color="#FFF" />
        <Text style={styles.settingText}>Login</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
        <Ionicons name="power" size={30} color="#FFF" />
        <Text style={[styles.settingText, { color: '#FFF' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#333', // Set a dark background color
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#222', // Set a slightly lighter background for the setting items
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingText: {
    marginLeft: 20,
    fontSize: 20,
    color: '#FFF', // Set text color to white for better visibility
  },
});
