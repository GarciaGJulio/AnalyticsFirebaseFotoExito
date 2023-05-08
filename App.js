import { StyleSheet, Text, View } from 'react-native';
import TarjPercha from './app/components/TarjetaPercha';
import { useState } from 'react';
import TarjPromo from './app/components/TarjetaPromo';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './app/navigation/Navigation';

export default function App() {
 

  return (
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
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
