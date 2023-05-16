import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Menu from '../screens/auth/Menu';
import TabsNavigation from './TabsNavigation.js';
import AuditNavigation from './AuditNavigation';
import ListBranch from '../screens/review/ListBranch';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='login' component={AuditNavigation} />
      <Stack.Screen name='menu' component={Menu} />
      <Stack.Screen name='listBranch' component={ListBranch} />
      <Stack.Screen name='review' component={TabsNavigation} />
      <Stack.Screen name='audit' component={AuditNavigation} />
    </Stack.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({})