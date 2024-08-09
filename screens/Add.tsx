import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FIREBASE_DB } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Button } from 'react-native-paper';

const categories = ['Expense', 'Income'];
const expenseCategories = ['Food', 'Travel', 'Rent', 'CollegeExpenses', 'Entertainment', 'Groceries', 'Others'];
const incomeCategories = ['Salary', 'BusinessIncome', 'Freelance', 'Other'];
const foodCategories = ['Outside Food', 'Canteen Food'];
const canteens = ['Canteen 1', 'Canteen 2', 'Canteen 3'];
const initialFoodMenu = [
  { food: 'Burger', price: 5 },
  { food: 'Pizza', price: 8 },
  { food: 'Sandwich', price: 4 },
];

export const Add = () => {
  const [selectedType, setSelectedType] = useState(categories[0]);
  const [selectedCategory, setSelectedCategory] = useState(expenseCategories[0]);
  const [selectedFoodCategory, setSelectedFoodCategory] = useState(foodCategories[0]);
  const [selectedCanteen, setSelectedCanteen] = useState(canteens[0]);
  const [selectedFood, setSelectedFood] = useState(initialFoodMenu[0]);
  const [entryAmount, setEntryAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [canteenMenu, setCanteenMenu] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

   // Dummy data for canteen menu
   const canteenMenus = {
    'Canteen 1': [
      { food: 'Burger', price: 5 },
      { food: 'Pizza', price: 8 },
      { food: 'Sandwich', price: 4 },
    ],
    'Canteen 2': [
      { food: 'Noodles', price: 6 },
      { food: 'Sushi', price: 10 },
      { food: 'Salad', price: 3 },
    ],
    'Canteen 3': [
      { food: 'Pasta', price: 7 },
      { food: 'Wrap', price: 5 },
      { food: 'Smoothie', price: 4 },
    ],
    // Add more items and canteens as needed
  };

  useEffect(() => {
    // Update the canteen menu when the selected canteen changes
    setCanteenMenu(canteenMenus[selectedCanteen]);
    setSelectedFood(null); // Reset selected food when the canteen changes
  }, [selectedCanteen]);

  const handleTypeChange = (type) => {
    setSelectedType(type);

    // Reset or adjust related state when the type changes
    if (type === 'Expense') {
      setSelectedCategory(expenseCategories[0]);
      setSelectedFoodCategory(foodCategories[0]);
    } else {
      setSelectedCategory(incomeCategories[0]);
      setSelectedFoodCategory(null); // Assuming no food category for income
    }
  };

  const handleFoodChange = (food) => {
    setSelectedFood(food);
    if (food && food.price !== undefined) {
      setEntryAmount(food.price.toString());
    }
  };

  // Modify addExpense function to save data to user's database
  const addExpense = async () => {
    // Check if the amount field is empty or negative
    if (!entryAmount || parseFloat(entryAmount) <= 0) {
      Alert.alert('', 'Please enter a valid amount');
      return;
    }
  
    if (!currentUser) {
      // User not logged in, handle accordingly
      return;
    }
    
    const userExpensesRef = collection(FIREBASE_DB, 'users', currentUser.uid, 'expenses');
    
    try {
      await addDoc(userExpensesRef, {
        amount: entryAmount,
        note: notes,
        category: selectedCategory,
        amountType: selectedType,
        date: `${new Date()}`,
      });
      setEntryAmount('');
      setNotes('');
      Alert.alert(
        '',
        'Successfully Added');
    } catch (error) {
      console.error('Error adding expense: ', error);
    }
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        
        <Text style={styles.label}>Type</Text>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue) => handleTypeChange(itemValue)}
          style={[styles.picker , Platform.OS === 'ios' ? {backgroundColor: '#f0ead6' } : null]} >
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>

        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={[styles.picker , Platform.OS === 'ios' ? {backgroundColor: '#f0ead6' } : null]}>
          {selectedType === 'Expense'
            ? expenseCategories.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))
            : incomeCategories.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
        </Picker>

        {selectedType === 'Expense' && selectedCategory === 'Food' && (
          <View>
            <Text style={styles.label}>Food Category</Text>
            <Picker
              selectedValue={selectedFoodCategory}
              onValueChange={(itemValue) => setSelectedFoodCategory(itemValue)}
              style={[styles.picker , Platform.OS === 'ios' ? {backgroundColor: '#f0ead6' } : null]}>
              {foodCategories.map((foodCategory) => (
                <Picker.Item key={foodCategory} label={foodCategory} value={foodCategory} />
              ))}
            </Picker>

            {selectedFoodCategory === 'Canteen Food' && (
              <View>
                <Text style={styles.label}>Select Canteen</Text>
                <Picker
                  selectedValue={selectedCanteen}
                  onValueChange={(itemValue) => setSelectedCanteen(itemValue)}
                  style={[styles.picker , Platform.OS === 'ios' ? {backgroundColor: '#f0ead6' } : null]}>
                  {canteens.map((canteen) => (
                    <Picker.Item key={canteen} label={canteen} value={canteen} />
                  ))}
                </Picker>

                <Text style={styles.label}>Select Food</Text>
                <Picker
                  selectedValue={selectedFood}
                  onValueChange={(itemValue) => handleFoodChange(itemValue)}
                  style={[styles.picker , Platform.OS === 'ios' ? {backgroundColor: '#f0ead6' } : null]}>
                  {canteenMenu.map((menuItem) => (
                    <Picker.Item
                      key={menuItem.food}
                      label={`${menuItem.food} - Rs.${menuItem.price}`}
                      value={menuItem}
                    />
                  ))}
                </Picker>
              </View>
            )}
          </View>
        )}

        <Text style={styles.label}>{selectedType === 'Expense' ? 'Expense' : 'Income'} Amount</Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter ${selectedType === 'Expense' ? 'Expense' : 'Income'} amount`}
          placeholderTextColor="white"
          keyboardType="numeric"
          value={entryAmount}
          onChangeText={(text) => setEntryAmount(text)}
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.input}
          placeholder="Add notes (optional)"
          placeholderTextColor="white"
          value={notes}
          onChangeText={(text) => setNotes(text)}
        />

        <TouchableOpacity style={styles.addButton} onPress={addExpense}>
          <Text style={styles.addButtonText}>
            Add {selectedType === 'Expense' ? 'Expense' : 'Income'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000', // Set to black background color
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF', // Set text color to white for better visibility
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#FFF', // Set text color to white for better visibility
  },
  picker: {
    color: '#FFF',
    backgroundColor: '#333', // Set picker background color
    marginBottom: 16,
    borderRadius: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    color: '#FFF', // Set text color to white for better visibility
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: 150,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
