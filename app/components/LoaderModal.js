import { Modal, StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import DoubleStyledButton from './DoubleStyledButton'
import LOGOTIPO from '../../assets/moderna/Logotipo-original.png'
import theme from '../theme/theme'


const LoaderModal = ({visible, onClose, children,warning }) => {
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
          <Image source={LOGOTIPO} style={{width:200,height:70}}/>
          <Text style={{margin:20,fontSize:20}}>{warning}</Text>
          <DoubleStyledButton 
            titleLeft={'Aceptar'} 
            sizeLeft={theme.buttonSize.sm} 
            colorLeft={theme.colors.modernaRed}
            titleRigth={'Cancelar'} 
            sizeRigth={theme.buttonSize.sm} 
            colorRigth={theme.colors.modernaYellow}
            onPressRigth={onClose}
            />
          {children}
        </View>
      </View>
    </Modal>
  )
}

export default LoaderModal

const styles = StyleSheet.create({})