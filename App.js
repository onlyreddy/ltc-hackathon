import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import Login from './src/features/login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewPayeeForm from './src/features/new-payee/NewPayeeForm';
import BottomTabs from './src/features/bottom-navigation/Navigation'

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#006a4d',
    accent: '#03dac4',
  },
};

const Stack = createNativeStackNavigator();
const Tab = createNativeStackNavigator();

const AccountsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="NewPayeeForm" component={NewPayeeForm} />
  </Stack.Navigator>
);


export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={customTheme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="BottomTabs">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
