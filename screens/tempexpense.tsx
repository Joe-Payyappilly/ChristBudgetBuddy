
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { FontSize, Color,Border } from "../ExpenseScreenStyles";


export const Expenses= ()=>
    {
        // const handleWeeklyPress = () => {
        //     navigation.navigate('Weekly');
        //   };
        //   const handleMonthlyPress = () => {
        //     navigation.navigate('Monthly');
        //   };
    
    
        return (
        <ScrollView style={styles.scrollView}>
          <View style={styles.homepage}>
            <View style={styles.groupDatadisplayhome}>
              <Text style={[styles.today, styles.todayFlexBox]}>Today</Text>
              <View style={[styles.groupDatadisplay1, styles.groupLayout2]}>
                <Image
                  style={[styles.groupDatadisplay1Child, styles.groupLayout2]}
                  contentFit="cover"
                  source={require("../assets/ellipse-1.png")}
                />
                <Image
                  style={styles.buyingIcon}
                  contentFit="cover"
                  source={require("../assets/buying.png")}
                />
                <Text style={[styles.grocery, styles.groceryTypo]}>Grocery</Text>
                <Text style={[styles.clothesAndWatch, styles.clothesTypo]}>
                  Clothes and watch
                </Text>
                <Text style={[styles.text, styles.textTypo1]}>1101.00</Text>
              </View>
              <View style={[styles.groupDatadisplay2, styles.groupLayout1]}>
                <Image
                  style={[styles.groupDatadisplay1Child, styles.groupLayout2]}
                  contentFit="cover"
                  source={require("../assets/ellipse-1.png")}
                />
                <Image
                  style={styles.buyingIcon}
                  contentFit="cover"
                  source={require("../assets/buying.png")}
                />
                <Text style={[styles.grocery1, styles.groceryTypo]}>Grocery</Text>
                <Text style={[styles.clothesAndWatch1, styles.clothesTypo]}>
                  Clothes and watch
                </Text>
                <Text style={[styles.text1, styles.textTypo1]}>18025.00</Text>
              </View>
              <View style={[styles.groupDatadisplay5, styles.groupLayout1]}>
                <Image
                  style={[styles.groupDatadisplay1Child, styles.groupLayout2]}
                  contentFit="cover"
                  source={require("../assets/ellipse-1.png")}
                />
                <Image
                  style={styles.buyingIcon}
                  contentFit="cover"
                  source={require("../assets/buying.png")}
                />
                <Text style={[styles.clothesAndWatch1, styles.clothesTypo]}>
                  Clothes and watch
                </Text>
                <Text style={[styles.text1, styles.textTypo1]}>18025.00</Text>
                <Text style={[styles.grocery1, styles.groceryTypo]}>Grocery</Text>
              </View>
              <View style={[styles.groupDatadisplay3, styles.groupLayout1]}>
                <Image
                  style={[styles.groupDatadisplay1Child, styles.groupLayout2]}
                  contentFit="cover"
                  source={require("../assets/ellipse-1.png")}
                />
                <Image
                  style={[styles.bookAndPencil, styles.foodIconLayout]}
                  contentFit="cover"
                  source={require("../assets/book-and-pencil.png")}
                />
                <Text style={[styles.grocery1, styles.groceryTypo]}>College</Text>
                <Text style={[styles.clothesAndWatch1, styles.clothesTypo]}>
                  Books and Stationary
                </Text>
                <Text style={[styles.text3, styles.textTypo1]}>5024.00</Text>
              </View>
              <View style={[styles.groupDatadisplay4, styles.groupLayout1]}>
                <Image
                  style={[styles.groupDatadisplay1Child, styles.groupLayout2]}
                  contentFit="cover"
                  source={require("../assets/ellipse-1.png")}
                />
                <Text style={[styles.food, styles.foodPosition]}>Food</Text>
                <Text style={[styles.kiranaAndRation, styles.foodPosition]}>
                  Kirana and Ration
                </Text>
                <Text style={[styles.text4, styles.textTypo1]}>11021.00</Text>
                <Image
                  style={[styles.foodIcon, styles.foodIconLayout]}
                  contentFit="cover"
                  source={require("../assets/food.png")}
                />
              </View>
              <View style={[styles.groupDatadisplay41, styles.groupLayout1]}>
                <Image
                  style={[styles.groupDatadisplay1Child, styles.groupLayout2]}
                  contentFit="cover"
                  source={require("../assets/ellipse-1.png")}
                />
                <Text style={[styles.food, styles.foodPosition]}>Food</Text>
                <Text style={[styles.kiranaAndRation, styles.foodPosition]}>
                  Kirana and Ration
                </Text>
                <Text style={[styles.text4, styles.textTypo1]}>11021.00</Text>
                <Image
                  style={[styles.foodIcon, styles.foodIconLayout]}
                  contentFit="cover"
                  source={require("../assets/food.png")}
                />
              </View>
              <Text style={[styles.jan, styles.janTypo]}>18Jan</Text>
              <Text style={[styles.jan1, styles.janTypo]}>17Jan</Text>
              <View style={[styles.daydividerline2, styles.daydividerlineLayout]} />
              <View style={[styles.daydividerline1, styles.daydividerlineLayout]} />
            </View>
            <View style={styles.groupCardtile}>
              <View style={styles.groupCardtileChild} />
              <Text style={[styles.expense, styles.incomeTypo]}>Expense</Text>
              <Text style={[styles.income, styles.incomeTypo]}>Income</Text>
              <Text style={[styles.text6, styles.textTypo]}>-2500</Text>
              <Text style={[styles.text7, styles.textTypo]}>+3000</Text>
            </View>
            <View style={styles.groupHeader}>
              <Text style={[styles.balance, styles.groceryTypo]}>Balance</Text>
              <Text style={[styles.text8, styles.todayFlexBox]}>12,560.00</Text>
              <Image
                style={styles.rupeeIcon}
                contentFit="cover"
                source={require("../assets/rupee-icon.png")}
              />
            </View>
          </View>
          </ScrollView>
        );
      };
      
      const styles = StyleSheet.create({
        scrollView: {
            flex: 1,
            
          },
        todayFlexBox: {
          textAlign: "left",
          position: "absolute",
        },
        groupLayout2: {
          height: 47,
          position: "absolute",
        },
        groceryTypo: {
          fontSize: FontSize.size_base,
          color: Color.colorWhite,
        //   fontFamily: FontFamily.poppinsRegular,
        },
        clothesTypo: {
          color: Color.colorDarkgray,
          fontSize: FontSize.size_xs,
        //   fontFamily: FontFamily.poppinsSemiBold,
          fontWeight: "600",
          top: 26,
        },
        textTypo1: {
        //   fontFamily: FontFamily.poppinsSemiBold,
          fontWeight: "600",
          fontSize: FontSize.size_base,
          top: 4,
          textAlign: "left",
          color: Color.colorWhite,
          position: "absolute",
        },
        groupLayout1: {
          width: 312,
          height: 47,
          position: "absolute",
        },
        foodIconLayout: {
          height: 25,
          width: 25,
          left: 11,
          position: "absolute",
        },
        foodPosition: {
          left: 59,
          textAlign: "left",
          position: "absolute",
        },
        janTypo: {
        //   fontFamily: FontFamily.poppinsMedium,
          fontWeight: "500",
          color: Color.colorDarkgray,
          fontSize: FontSize.size_xs,
          textAlign: "left",
          position: "absolute",
        },
        daydividerlineLayout: {
          height: 1,
          width: 253,
          borderTopWidth: 1,
          borderColor: Color.colorGainsboro,
          borderStyle: "solid",
          left: 59,
          position: "absolute",
        },
        incomeTypo: {
          top: 27,
        //   fontFamily: FontFamily.poppinsMedium,
          fontWeight: "500",
          fontSize: FontSize.size_base,
          textAlign: "left",
          color: Color.colorWhite,
          position: "absolute",
        },
        textTypo: {
          top: 51,
        //   fontFamily: FontFamily.poppinsMedium,
          fontWeight: "500",
          fontSize: FontSize.size_xs,
          textAlign: "left",
          color: Color.colorWhite,
          position: "absolute",
        },
        groupLayout: {
          backgroundColor: Color.colorWhitesmoke,
          width: 101,
          borderRadius: Border.br_mini,
          height: 32,
          top: 0,
          position: "absolute",
        },
        weeklyTypo: {
          color: Color.colorGray,
          top: 7,
        //   fontFamily: FontFamily.poppinsMedium,
          fontWeight: "500",
          fontSize: FontSize.size_xs,
          textAlign: "left",
          position: "absolute",
        },
        today: {
          left: 4,
          fontSize: 14,
          color: Color.colorWhite,
          textAlign: "left",
        //   fontFamily: FontFamily.poppinsRegular,
          top: 0,
        },
        groupDatadisplay1Child: {
          width: 47,
          left: 0,
          top: 0,
        },
        buyingIcon: {
          top: 10,
          height: 26,
          width: 25,
          left: 11,
          position: "absolute",
        },
        grocery: {
          left: 58,
          textAlign: "left",
          position: "absolute",
          top: 4,
          fontSize: FontSize.size_base,
        },
        clothesAndWatch: {
          left: 58,
          textAlign: "left",
          position: "absolute",
        },
        text: {
          left: 258,
        },
        groupDatadisplay1: {
          width: 311,
          left: 1,
          top: 26,
          height: 47,
        },
        grocery1: {
          left: 56,
          top: 4,
          fontSize: FontSize.size_base,
          textAlign: "left",
          position: "absolute",
        },
        clothesAndWatch1: {
          left: 56,
          textAlign: "left",
          position: "absolute",
        },
        text1: {
          left: 241,
        },
        groupDatadisplay2: {
          top: 105,
          left: 0,
        },
        groupDatadisplay5: {
          top: 310,
          left: 1,
        },
        bookAndPencil: {
          top: 14,
        },
        text3: {
          left: 246,
        },
        groupDatadisplay3: {
          top: 166,
          left: 0,
        },
        food: {
          fontSize: FontSize.size_base,
          color: Color.colorWhite,
        //   fontFamily: FontFamily.poppinsRegular,
          top: 4,
        },
        kiranaAndRation: {
          color: Color.colorDarkgray,
          fontSize: FontSize.size_xs,
        //   fontFamily: FontFamily.poppinsSemiBold,
          fontWeight: "600",
          top: 26,
        },
        text4: {
          left: 250,
        },
        foodIcon: {
          top: 11,
        },
        groupDatadisplay4: {
          top: 228,
          left: 0,
        },
        groupDatadisplay41: {
          top: 372,
          left: 1,
        },
        jan: {
          top: 82,
          left: 6,
        },
        jan1: {
          top: 288,
          left: 7,
        },
        daydividerline2: {
          top: 286,
        },
        daydividerline1: {
          top: 83,
        },
        groupDatadisplayhome: {
          top: 344,
          left: 20,
          width: 313,
          height: 419,
          position: "absolute",
        },
        groupCardtileChild: {
          borderRadius: 10,
          backgroundColor: Color.colorDarkslategray,
          height: 189,
          width: 314,
          left: 0,
          top: 0,
          position: "absolute",
        },
        expense: {
          left: 45,
        },
        income: {
          left: 209,
        },
        text6: {
          left: 56,
        },
        text7: {
          left: 220,
        },
        groupCardtile: {
          top: 100,
          left: 24,
          height: 189,
          width: 314,
          position: "absolute",
        },
        balance: {
          left: 9,
          textAlign: "left",
          position: "absolute",
          top: 0,
        },
        text8: {
          top: 18,
          left: 16,
          fontSize: 36,
          fontWeight: "800",
        //   fontFamily: FontFamily.poppinsExtraBold,
          color: Color.colorWhite,
          textAlign: "left",
        },
        rupeeIcon: {
          height: "22.62%",
          width: "6.73%",
          top: "58.33%",
          right: "93.27%",
          bottom: "19.04%",
          left: "0%",
          maxWidth: "100%",
          maxHeight: "100%",
          position: "absolute",
          overflow: "hidden",
        },
        groupHeader: {
          top: 186,
          left: 89,
          width: 190,
          height: 72,
          position: "absolute",
        },
   
        homepage: {
          backgroundColor: "#000",
          marginLeft: 20,
          flex: 1,
          width: "100%",
          height: 800,
          overflow: "hidden",
        },
        
      });






    //   {expenses.map((expense)=>(
    //     <Text key={expense.id} style={{color:'white'}}>{expense.Category}</Text>
    //  ))}
    