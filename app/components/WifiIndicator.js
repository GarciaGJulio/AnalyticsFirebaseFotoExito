import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import NetInfo from '@react-native-community/netinfo';
import theme from '../theme/theme'
import { Icon } from '@rneui/base'
import ModernaContext from '../context/ModernaContext';

const WifiIndicator = () => {

  const {isConnected} = useContext(ModernaContext)

  /*const [isConnected, setIsConnected] = useState(false);
  
    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);*/
  

  
  return (
    <View style={[styles.container,{backgroundColor: isConnected ? theme.colors.modernaGreen : theme.colors.modernaRed}]}>
      <Icon name={isConnected ? 'wifi' : 'wifi-off'} type='material-icon' size={15} color={theme.colors.white}/>
    </View>
  )
}

export default WifiIndicator

const styles = StyleSheet.create({
    container:{
        width: 20,
        height:20,
        borderRadius: 15,
        backgroundColor: theme.colors.modernaGreen,
        justifyContent: 'center',
        alignItems: 'center',
    }
})