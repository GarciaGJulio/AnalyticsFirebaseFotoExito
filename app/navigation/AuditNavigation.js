import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Briefcase from '../screens/audit/Briefcase';
import Prices from '../screens/audit/Prices';
import Rack from '../screens/audit/Rack';
import Promos from '../screens/audit/Promos';
import Menu from '../screens/auth/Menu';
import Client_Information from '../screens/audit/Client_Information';
import Navigation from './Navigation';
import TabsNavigation from './TabsNavigation';
import ListBranch from '../screens/review/ListBranch';

const Stack = createStackNavigator();

const AuditNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='rack' component={Rack}/>
        <Stack.Screen name='client' component={Client_Information}/>
        <Stack.Screen name='briefcase' component={Briefcase}/>
        <Stack.Screen name='prices' component={Prices}/>
        <Stack.Screen name='promos' component={Promos}/>
        <Stack.Screen name='begin' component={LoginStack}/>
    </Stack.Navigator>
  )
}

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='menu' component={Menu} />
      <Stack.Screen name='listBranch' component={ListBranch} />
      <Stack.Screen name='review' component={TabsNavigation} />
      <Stack.Screen name='audit' component={AuditNavigation} />
    </Stack.Navigator>
  )
}

export default AuditNavigation

const styles = StyleSheet.create({})