import * as React from "react";
import { View, StyleSheet, Text, Pressable, ScrollView, Dimensions, Platform, TouchableOpacity, Modal } from "react-native";
import { Image } from "expo-image";
import { Color, Padding,FontSize, Border } from "../GlobalStyles";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const IncomeReport = ({navigation}) => {
  const handleExpensePress = () => {
    navigation.navigate('Reports');
  };

  const [expenses, setExpenses] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
 
  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser; // Get the currently authenticated user
    const uid = currentUser.uid; // Get the UID of the current user

    const expenseRef = collection(FIREBASE_DB, 'users', uid, 'expenses');
    const q = query(expenseRef, where("amountType", "==", "Income"));

    const subscriber = onSnapshot(q, {
      next: (snapshot) => {
        console.log("Updated");
        const expenses = [];
        snapshot.docs.forEach(doc => {
          expenses.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setExpenses(expenses);
      },
    });

    return () => subscriber();
  }, []);

  const monthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return (expenseDate.getMonth() + 1).toString() === selectedMonth && expenseDate.getFullYear().toString() === selectedYear;
  });

  const daysInMonth = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate();
const daysRange = Array.from({ length: Math.ceil(daysInMonth / 5) }, (_, index) => (index * 5 + 1).toString() + '-' + Math.min((index + 1) * 5, daysInMonth).toString());

const expenseData = daysRange.map(range => {
  const [startDay, endDay] = range.split('-').map(day => parseInt(day));
  const totalExpense = monthExpenses.reduce((acc, curr) => {
    const expenseDate = new Date(curr.date);
    const dayOfMonth = expenseDate.getDate();
    return dayOfMonth >= startDay && dayOfMonth <= endDay ? acc + parseInt(curr.amount) : acc;
  }, 0);
  return totalExpense;
});

const chartData = {
  labels: daysRange,
  datasets: [
    {
      data: expenseData,
    },
  ],
};



  const currentYear = new Date().getFullYear();
  const yearsRange = 10;
  const years = Array.from({ length: yearsRange * 2 + 1 }, (_, index) => (currentYear - yearsRange) + index);

  
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


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.tabs}>
        <View style={styles.container} />
        <View style={[styles.tabActive, styles.tabActivePosition]} />
        <View style={[styles.expenseParent, styles.tabActivePosition1]}>
          <Pressable style={[styles.expense, styles.wrapperSpaceBlock]} onPress={handleExpensePress}>
            <Text style={[styles.expanse, styles.expanseTypo]}>Expense</Text>
          </Pressable>
          <View style={[styles.expense, styles.wrapperSpaceBlock]}>
            <Text style={[styles.income1, styles.expanseTypo]}>Income</Text>
          </View>
        </View>
      </View>
     
      <View style={{top: 50,}}>
              
              <LineChart
                      data={chartData}
                      width={Dimensions.get("window").width}
                      height={220}
                      yAxisLabel="Rs "
                      
                      yAxisInterval={1}
                      chartConfig={{
                      
                        backgroundColor: "#eee",
                        backgroundGradientFrom: "black",
                        backgroundGradientTo: "grey",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        },
                        propsForDots: {
                          r: "2",
                          strokeWidth: "2",
                          stroke: "#eee"
                        }
                      
                      }}
                      bezier
                      style={{
                        marginVertical: 8,
                        borderRadius: 16
                      }}
                    />
              </View>
              <View style={{top:30}}>
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
 
  wrapperSpaceBlock: {
    padding: Padding.p_5xs,
    flexDirection: "row",
  },
 
  
  tabActivePosition: {
    left: "50%",
    position: "absolute",
  },
  tabActivePosition1: {
    bottom: "7.14%",
    right: "1.17%",
    top: "7.14%",
    height: "85.71%",
  },
  expanseTypo: {
    textAlign: "left",
    // fontFamily: FontFamily.bodyBody1,
    fontWeight: "500",
  },

  container: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.baseLightLight60,
    borderRadius: Border.br_13xl,
    position: "absolute",
  },
  tabActive: {
    width: "48.83%",
    bottom: "7.14%",
    right: "1.17%",
    top: "7.14%",
    height: "85.71%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color. colorGray_100,
  },
  expanse: {
    color: Color.labelColorLightPrimary,
    fontSize: FontSize.bodyBody1_size,
    textAlign: "left",
  },
  expense: {
    height: 48,
    borderRadius: Border.br_13xl,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  income1: {
    color: Color.baseLightLight80,
    fontSize: FontSize.bodyBody1_size,
    textAlign: "left",
  },
  expenseParent: {
    width: "97.66%",
    left: "1.17%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  tabs: {
    top: 30,
    width: '100%',
    height: 56,

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


