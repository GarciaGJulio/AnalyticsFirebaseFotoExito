import { StyleSheet, Text, View } from 'react-native';
import TarjPercha from './app/components/TarjetaPercha';
import React, { useEffect, useState,useContext } from 'react'
import TarjPromo from './app/components/TarjetaPromo';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './app/navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModernaContext from './app/context/ModernaContext';
import Login from './app/screens/auth/Login';
import ModernaProvider from './app/context/ModernaProvider';
import { load_db_config } from './app/common/sqlite_config';

export default function App() {
  load_db_config();


  return (
    <ModernaProvider>
      <NavigationContainer>
          <Navigation/> 
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