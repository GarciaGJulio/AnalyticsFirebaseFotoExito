import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'
import RackCheckbox from '../../components/RackCheckbox'
import TarjPercha from '../../components/TarjetaPercha'
import theme from '../../theme/theme'
import { FlashList } from '@shopify/flash-list'

const Rack_Review = () => {
  const DATA = [
    {
      name: "Pan",
    },
    {
      name: "Harina",
    },
    {
      name: "Avena",
    },
    {
      name: "Arroz",
    },
  ];

  return (
    <View style={styles.container}>
      <ModernaHeader/>
      
      <View style={{flex:1,width:'100%', alignItems:'center'}}>
        <TarjPercha/>
      </View>
    </View>
  )
}

export default Rack_Review

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})