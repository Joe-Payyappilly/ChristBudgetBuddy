import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';

// Import your screens and components here
import {
  Expenses,
  Reports,
  Add,
  Settings,
  ProfileScreen,
  NotificationSettings,
  IncomeReport,
  LoginPage,
  Register,
  
} from './screens';
import { theme } from './theme';
import { TabBarIcon } from './components/TabBarIcon';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from './firebase';



const Stack = createStackNavigator();



const TabNav=()=>{
  const Tab = createBottomTabNavigator();
  return(
    <Tab.Navigator 
          screenOptions={{
            tabBarStyle: {
              backgroundColor: theme.colors.card,
             
            },
          }}>
          <Tab.Screen
            options={{ tabBarIcon: (props) => <TabBarIcon {...props} type='expenses' /> }}
            name='Expenses'
            component={Expenses}
          />
          <Tab.Screen
            options={{ tabBarIcon: (props) => <TabBarIcon {...props} type='reports' /> }}
            name='Reports'
            component={ReportStack}
          />
          <Tab.Screen
            options={{ tabBarIcon: (props) => <TabBarIcon {...props} type='add' /> }}
            name='Add'
            component={Add}
          />
          <Tab.Screen
            options={{ tabBarIcon: (props) => <TabBarIcon {...props} type='settings' /> }}
            name='Settings'
            component={SettingsStack}
          />
        </Tab.Navigator>

  );
};

const LoginNav = () => {
   return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={Register} />
      {/* <Stack.Screen name="Home" component={TabNav} /> */}
    </Stack.Navigator>
  );
};


function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      // console.log('user',user);
      setUser(user);
    });

  },[])

  return (
    <NavigationContainer theme={theme}>
     <Stack.Navigator initialRouteName='Login'
      screenOptions={{
        headerShown: false,
      }}>

      {user ? (<Stack.Screen name="InsideApp" component={TabNav} />):(<Stack.Screen name="LoginandSignUP" component={LoginNav} />)}
      
    </Stack.Navigator>
    </NavigationContainer>
   
  );
}

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Options' component={Settings} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='NotificationSettings' component={NotificationSettings} />
    </Stack.Navigator>
  );
};

const ReportStack = () => {
  return (
    <Stack.Navigator initialRouteName='Reports' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Reports' component={Reports} />
      <Stack.Screen name='Income' component={IncomeReport} />
    </Stack.Navigator>
  );
};



export default App;
