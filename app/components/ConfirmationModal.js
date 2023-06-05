import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native'
import React from 'react'
import DoubleStyledButton from './DoubleStyledButton'
import LOGOTIPO from '../../assets/moderna/Logotipo-original.png'
import theme from '../theme/theme'
import StyledButton from './StyledButton'

const ConfirmationModal = ({ visible, onClose, onPress, children, warning }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" barStyle={"dark-content"} />
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.logoContainer}>
            <Image source={LOGOTIPO} style={styles.logo} />
          </View>
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>{warning}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <DoubleStyledButton
              titleLeft={'Aceptar'}
              sizeLeft={theme.buttonSize.sm}
              colorLeft={theme.colors.modernaRed}
              onPressLeft={onPress}
              titleRigth={'Cancelar'}
              sizeRigth={theme.buttonSize.sm}
              colorRigth={theme.colors.modernaYellow}
              onPressRigth={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',

  },
  logoContainer: {
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.7,
    width: '100%',
  },
  logo: {
    resizeMode: 'contain',
    //width:200,
    //height:200,
    flex: 1,
  },
  warningContainer: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '95%',
    // marginBottom: 5,
  },
  warningText: {
    marginTop: 0,
    margin: 20,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: -1,
    //backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    width: '100%',
  },
})

export default ConfirmationModal
