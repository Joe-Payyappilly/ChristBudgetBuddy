import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Platform, Alert, Modal, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebase";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Error from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';

import { FontSize, Color,Border } from "../ExpenseScreenStyles";

export const Expenses = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser; // Get the currently authenticated user
    const uid = currentUser.uid; // Get the UID of the current user

    const expenseRef = collection(FIREBASE_DB, 'users', uid, 'expenses');

    const subscriber = onSnapshot(expenseRef, {
      next: (snapshot) => {
        console.log(" Updated");
        const expenses: any[] = [];
        snapshot.docs.forEach(doc => {
          console.log(doc.data());
          expenses.push({
            id: doc.id,
            ...doc.data()
          });
        });
        // Sort expenses by date in descending order
        expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setExpenses(expenses);
      },
    });

    return () => subscriber();
  }, []);

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

  const currentYear = new Date().getFullYear();
  const yearsRange = 10;
  const years = Array.from({ length: yearsRange * 2 + 1 }, (_, index) => (currentYear - yearsRange) + index);


  const calculateTotalExpenses = (): number => {
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth();
      const expenseYear = expenseDate.getFullYear();
      return expenseMonth === parseInt(selectedMonth) - 1 && expenseYear === parseInt(selectedYear);
    });

    const totalExpense = filteredExpenses.reduce((acc, expense) => {
      if (expense.amountType === 'Expense') {
        return acc + parseFloat(expense.amount);
      } else {
        return acc;
      }
    }, 0);

    return totalExpense;
  };

  const calculateTotalIncome = (): number => {
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth();
      const expenseYear = expenseDate.getFullYear();
      return expenseMonth === parseInt(selectedMonth) - 1 && expenseYear === parseInt(selectedYear);
    });

    const totalIncome = filteredExpenses.reduce((acc, expense) => {
      if (expense.amountType === 'Income') {
        return acc + parseFloat(expense.amount);
      } else {
        return acc;
      }
    }, 0);

    return totalIncome;
  };

  const categoryIcons = {
    Food: 'fast-food-outline', // Replace 'food-icon' with the appropriate icon name for Food category
    Travel: 'airplane-outline', // Replace 'travel-icon' with the appropriate icon name for Travel category
    Rent: 'home-outline', // Replace 'rent-icon' with the appropriate icon name for Rent category
    CollegeExpenses: 'school-outline', // Replace 'college-icon' with the appropriate icon name for College Expenses category
    Entertainment: 'game-controller-outline', // Replace 'entertainment-icon' with the appropriate icon name for Entertainment category
    Groceries: 'bag-handle-outline', // Replace 'groceries-icon' with the appropriate icon name for Groceries category
    Others: 'prism-outline', // Replace 'others-icon' with the appropriate icon name for Others category
    Salary: 'desktop-outline',
    BusinessIncome:'business-outline',
    Freelance: 'briefcase-outline',
    
  
  };
  
  const deleteExpense = (expenseId: string) => {
    // Confirm with the user before deleting the expense
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Delete the expense from Firestore
              const currentUser = FIREBASE_AUTH.currentUser;
              const uid = currentUser.uid;
              await deleteDoc(doc(FIREBASE_DB, 'users', uid, 'expenses', expenseId));
              // Optionally, you can also update the local state to reflect the deletion
            } catch (error) {
              console.error('Error deleting expense:', error);
              // Handle errors gracefully (e.g., show an error message)
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}
      style={{backgroundColor: 'black',}}>
      <View style={styles.mainContainer}>
        <View style={styles.expenseCard}>
          <View style={styles.cardTitle}>
            <Text style={styles.expenseText}>Expense</Text>
            <Text style={styles.incomeText}>Income</Text>
          </View>
          <View style={styles.cardNumbers}>
            <Text style={{ fontSize: 20, color: 'red' }}>- {calculateTotalExpenses()}</Text>
            <Text style={{ fontSize: 20, color: 'green' }}>+ {calculateTotalIncome()}</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' , paddingHorizontal: 20, top: 20}}>

            {Platform.OS === 'ios' ? (
              <>
              <TouchableOpacity onPress={() => setShowMonthModal(true)} style={[styles.modalButton, Platform.OS === 'ios' ? styles.pickerIOS : null]}>
                <Text style={styles.modalButtonText}>{months.find(month => month.value === selectedMonth)?.label}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowYearModal(true)} style={[styles.modalButton, Platform.OS === 'ios' ? styles.pickerIOS : null]}>
                <Text style={styles.modalButtonText}>{selectedYear}</Text>
              </TouchableOpacity>
              </>
            ):(
              <>
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                style={{ color: '#FFF', backgroundColor: '#333', borderRadius: 20, flex: 1, marginRight: 10 }}
                >
                {/* Populate the Picker with months */}
                {months.map(month => (
                  <Picker.Item key={month.value} label={month.label} value={month.value} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                style={{ color: '#FFF', backgroundColor: '#333', borderRadius: 20, flex: 1, marginLeft: 10 }}>
                {/* Populate the Picker with years */}
                {years.map(year => (
                  <Picker.Item key={year} label={`${year}`} value={`${year}`} />
                ))}
              </Picker>
              </>
            )}
              
            </View>
          </View>
        </View>
        <View style={{ top: 60,gap:5 }}>
  {/* Get a unique set of days */}
{Array.from(new Set(expenses
  .filter(exp => {
    const expenseDate = new Date(exp.date);
    const expenseMonth = expenseDate.getMonth();
    const expenseYear = expenseDate.getFullYear();
    return (
      expenseMonth === parseInt(selectedMonth) - 1 &&
      expenseYear === parseInt(selectedYear)
    );
  })
  .map(expense => new Date(expense.date).toLocaleDateString())))
  .map(day => (
    <View key={day} style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginVertical: 10 }}>{day}</Text>
      {/* Filter expenses for the current day */}
      {expenses
        .filter(exp => {
          const expenseDate = new Date(exp.date);
          const expenseMonth = expenseDate.getMonth();
          const expenseYear = expenseDate.getFullYear();
          return (
            new Date(exp.date).toLocaleDateString() === day &&
            expenseMonth === parseInt(selectedMonth) - 1 &&
            expenseYear === parseInt(selectedYear)
          );
        })
        .map(exp => (
          <View key={exp.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
            {/* Display category icon */}
            <Text style={{ color: 'white', marginRight: 10, display: "flex", alignItems: "center", flexDirection: "row", width: "50%" }}>
              {/* Replace 'Icon' with the component for rendering icons */}
              {/* For example, if using Ionicons: */}
              <Ionicons name={categoryIcons[exp.category]} size={24} color="white" />
              <Text style={{ display: "flex", alignItems: "center", }}>  {exp.category}</Text>
            </Text>
            {/* Display category name */}
            <Text style={{ color: 'white', width: "25%", textAlign: "left", }}>- Rs.{exp.amount}</Text>
            <TouchableOpacity style={{ width: "25%", alignItems: 'flex-end', right: 10 }} onPress={() => deleteExpense(exp.id)}>
              <Ionicons name="trash-bin-outline" size={20} color="red"></Ionicons>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  ))}

</View>

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showMonthModal}
        onRequestClose={() => setShowMonthModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select Month</Text>
            <ScrollView style={styles.modalContent}>
              {months.map(month => (
                <Pressable key={month.value} onPress={() => { setSelectedMonth(month.value); setShowMonthModal(false); }}>
                  <Text style={styles.modalItemText}>{month.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      {/* Year selection modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showYearModal}
        onRequestClose={() => setShowYearModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select Year</Text>
            <ScrollView style={styles.modalContent}>
              {years.map(year => (
                <Pressable key={year} onPress={() => { setSelectedYear(year.toString()); setShowYearModal(false); }}>
                  <Text style={styles.modalItemText}>{year}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  mainContainer:{
    paddingHorizontal:27,
    paddingBottom:100
    
  },
  expenseCard:{

    paddingTop: 50,
    top: 20,
    backgroundColor: Color.colorDarkslategray,
    borderRadius:20,
    height: 230,
  },
  cardTitle:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  expenseText:{
    fontFamily:"Bold",
    fontSize:30,
    color: 'white',
    // top: 40,
    // left: 30,
  },
  incomeText:{
    fontFamily:"Bold",
    fontSize:30,
    color: 'white',
    // top: 40,
    // left: 30,
  },
  cardNumbers:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    color: '#FFF',
    backgroundColor: '#333',
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  pickerIOS: {
    width: '45%',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    maxHeight: 300,
  },
  modalItemText: {
    fontSize: 16,
    paddingVertical: 10,
  },
});
