import { StyleSheet, Text, View } from 'react-native';
import TarjPercha from './app/components/TarjetaPercha';
import { useContext, useState } from 'react';
import TarjPromo from './app/components/TarjetaPromo';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './app/navigation/Navigation';
import ModernaProvider from './app/context/ModernaProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModernaContext from './app/context/ModernaContext';
import Login from './app/screens/auth/Login';

export default function App() {
  const { isAuthenticated } = useContext(ModernaContext)


  return (
    <ModernaProvider>
      <NavigationContainer>
        {
          isAuthenticated ? <Navigation/> : <Login/>
        }
      </NavigationContainer>
    </ModernaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
