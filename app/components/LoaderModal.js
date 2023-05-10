import { Modal, StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import DoubleStyledButton from './DoubleStyledButton'
import LOGOTIPO from '../../assets/moderna/Logotipo-original.png'
import theme from '../theme/theme'
import AnimatedLottieView from 'lottie-react-native'


const LoaderModal = ({visible, children,warning,animation }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '90%',
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Text style={{margin:20,fontSize:20}}>{warning}</Text>
          <View style={{height:150,width:450}}>
            <AnimatedLottieView source={animation} autoPlay loop />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  )
}

export default LoaderModal

const styles = StyleSheet.create({})