import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Menu from '../screens/auth/Menu';
import TabsNavigation from '../components/TabsNavigation';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='menu' component={Menu}/>
        <Stack.Screen name='review' component={TabsNavigation}/>
    </Stack.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({})