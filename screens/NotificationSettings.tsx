// NotificationSettings.tsx
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { FIREBASE_DB } from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

export const NotificationSettings = () => {

const [foodBudget, setFoodBudget] = useState('');
const [travelBudget, setTravelBudget] = useState('');
const [rentBudget, setRentBudget] = useState('');
const [collegeExpenseBudget, setCollegeExpenseBudget] = useState('');
const [entertainmentBudget, setEntertainmentBudget] = useState('');
const [groceriesBudget, setGroceriesBudget] = useState('');
const [othersBudget, setOthersBudget] = useState('');
const [currentUser, setCurrentUser] = useState(null);

const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());
const months = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11'},
  { label: 'December', value : '12'}
  // Add more months as needed
];




const fetchBudget = async () => {
  if (!currentUser) return;

  const userBudgetRef = collection(FIREBASE_DB, 'users', currentUser.uid, 'setbudget');

  try {
    const budgetQuery = query(userBudgetRef, where('month', '==', selectedMonth));
    const budgetSnapshot = await getDocs(budgetQuery);

    if (!budgetSnapshot.empty) {
      const budgetData = budgetSnapshot.docs[0].data();
      setFoodBudget(budgetData.food || '');
      setTravelBudget(budgetData.travel || '');
      setRentBudget(budgetData.rent || '');
      setCollegeExpenseBudget(budgetData.college || '');
      setEntertainmentBudget(budgetData.entertainment || '');
      setGroceriesBudget(budgetData.grocery || '');
      setOthersBudget(budgetData.other || '');
    } else {
      // No budget data found for the selected month, reset all budget fields
      setFoodBudget('');
      setTravelBudget('');
      setRentBudget('');
      setCollegeExpenseBudget('');
      setEntertainmentBudget('');
      setGroceriesBudget('');
      setOthersBudget('');
    }
  } catch (error) {
    console.error('Error fetching budget: ', error);
  }
};

useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  fetchBudget(); // Fetch budget data when the component mounts

  return () => unsubscribe();
}, [selectedMonth]);


const addBudget = async () => {
  if (!currentUser) {
    // User not logged in, handle accordingly
    return;
  }

  // Validation for empty fields and negative amounts
  if (
    foodBudget === '' ||
    travelBudget === '' ||
    rentBudget === '' ||
    collegeExpenseBudget === '' ||
    entertainmentBudget === '' ||
    groceriesBudget === '' ||
    othersBudget === ''
  ) {
    Alert.alert('', 'Please fill in all budget fields.');
    return;
  }

  if (
    parseFloat(foodBudget) < 0 ||
    parseFloat(travelBudget) < 0 ||
    parseFloat(rentBudget) < 0 ||
    parseFloat(collegeExpenseBudget) < 0 ||
    parseFloat(entertainmentBudget) < 0 ||
    parseFloat(groceriesBudget) < 0 ||
    parseFloat(othersBudget) < 0
  ) {
    Alert.alert('', 'Budget amounts cannot be negative.');
    return;
  }

  const userBudgetRef = collection(FIREBASE_DB, 'users', currentUser.uid, 'setbudget');

  try {
    // Check if a budget already exists for the selected month
    const existingBudgetQuery = query(userBudgetRef, where('month', '==', selectedMonth));
    const existingBudgetSnapshot = await getDocs(existingBudgetQuery);

    if (!existingBudgetSnapshot.empty) {
      // Update the existing budget
      const existingBudgetDocId = existingBudgetSnapshot.docs[0].id;
      await updateDoc(doc(userBudgetRef, existingBudgetDocId), {
        food: foodBudget,
        travel: travelBudget,
        rent: rentBudget,
        college: collegeExpenseBudget,
        entertainment: entertainmentBudget,
        grocery: groceriesBudget,
        other: othersBudget,
      });
    } else {
      // Add a new budget
      await addDoc(userBudgetRef, {
        month: selectedMonth,
        food: foodBudget,
        travel: travelBudget,
        rent: rentBudget,
        college: collegeExpenseBudget,
        entertainment: entertainmentBudget,
        grocery: groceriesBudget,
        other: othersBudget,
      });
    }

    // // Clear input fields after setting/updating budget
    // setFoodBudget('');
    // setTravelBudget('');
    // setRentBudget('');
    // setCollegeExpenseBudget('');
    // setEntertainmentBudget('');
    // setGroceriesBudget('');
    // setOthersBudget('');
    Alert.alert('', 'Budget Successfully Set');
  } catch (error) {
    console.error('Error setting/updating budget: ', error);
  }
};

  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={{paddingHorizontal:30,paddingVertical:40}}> 
          <Text style={styles.label}>Month</Text>
           <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                style={[styles.picker , Platform.OS === 'ios' ? {backgroundColor: '#f0ead6' } : null]}
                >
                {/* Populate the Picker with months */}
                {months.map(month => (
                  <Picker.Item key={month.value} label={month.label} value={month.value} />
                ))}
              </Picker>


          <View style={{top:20}}>
          <Text style={styles.label}>Food</Text>
          <TextInput
            style={styles.input}
            placeholder="Set budget for food"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={foodBudget}
            onChangeText={(text) => setFoodBudget(text)}
          />
          </View>

          <View style={{ top: 20 }}>
        <Text style={styles.label}>Travel</Text>
        <TextInput
          style={styles.input}
          placeholder="Set budget for travel"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={travelBudget}
          onChangeText={(text) => setTravelBudget(text)}
        />
      </View>

      <View style={{ top: 20 }}>
        <Text style={styles.label}>Rent</Text>
        <TextInput
          style={styles.input}
          placeholder="Set budget for rent"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={rentBudget}
          onChangeText={(text) => setRentBudget(text)}
        />
      </View>

      <View style={{ top: 20 }}>
        <Text style={styles.label}>College Expense</Text>
        <TextInput
          style={styles.input}
          placeholder="Set budget for college expense"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={collegeExpenseBudget}
          onChangeText={(text) => setCollegeExpenseBudget(text)}
        />
      </View>

      <View style={{ top: 20 }}>
        <Text style={styles.label}>Entertainment</Text>
        <TextInput
          style={styles.input}
          placeholder="Set budget for entertainment"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={entertainmentBudget}
          onChangeText={(text) => setEntertainmentBudget(text)}
        />
      </View>

      <View style={{ top: 20 }}>
        <Text style={styles.label}>Groceries</Text>
        <TextInput
          style={styles.input}
          placeholder="Set budget for groceries"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={groceriesBudget}
          onChangeText={(text) => setGroceriesBudget(text)}
        />
      </View>

      <View style={{ top: 20 }}>
        <Text style={styles.label}>Others</Text>
        <TextInput
          style={styles.input}
          placeholder="Set budget for others"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={othersBudget}
          onChangeText={(text) => setOthersBudget(text)}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addBudget}>
          <Text style={styles.addButtonText}>
            Set budget
          </Text>
        </TouchableOpacity>



  </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    color: '#FFF', // Set text color to white for better visibility
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#FFF', // Set text color to white for better visibility
  },
  addButton: {
    top:20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: 150,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  picker: {
    color: '#FFF',
    backgroundColor: '#333', // Set picker background color
    marginBottom: 16,
    borderRadius: 20,
  },
});


