import React from 'react';
import { Button, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as DataProvider } from './src/context/DataContext';

const Stack = createStackNavigator();

function AuthFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={SigninScreen} options={{ title: "Sign In", headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "Sign Up" }} />
    </Stack.Navigator>
  );
}

function HomeFlow({ navigation }: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: true,
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate("Account")}>
              <Ionicons name="settings" size={26} color="black" />
            </TouchableOpacity>
          )
        }} />
      <Stack.Screen name="Account" component={AccountScreen} options={{ title: "Account" }} />
    </Stack.Navigator>
  );
};

export default function App() {

  return (
    <AuthProvider>
      <DataProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="AuthFlow" component={AuthFlow} options={{ headerShown: false }} />
              <Stack.Screen name="HomeFlow" component={HomeFlow} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </DataProvider>
    </AuthProvider>
  );
}