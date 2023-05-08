import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../../theme/theme'
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png'
import StyledButton from '../../components/StyledButton'
import * as Animatable from 'react-native-animatable'

const Login = ({navigation}) => {
    const log = () => {
        console.log("NAVEGANDO A MENU")
        navigation.navigate('menu')
    }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <Animatable.View animation={"fadeInDown"} style={styles.imageContainer}>
        <Image source={Logotipo} style={styles.image}/>
      </Animatable.View>
      <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
        <StyledButton 
            title={'Iniciar Sesión'} 
            buttonColor={theme.colors.modernaRed} 
            onPress={log}
            size={theme.buttonSize.df}
            />
      </Animatable.View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.modernaRed,
        alignItems: 'center',
        justifyContent: 'center',
      },
    image: {
        width:313,
        height:112,
        resizeMode:'cover'
    },
    imageContainer:{
        bottom:'35%'
    },
    contentContainer:{
        width:theme.dimensions.maxWidth,
        height:187,
        backgroundColor:'white',
        position: 'absolute',
        bottom: 0,
        borderTopStartRadius:15,
        borderTopEndRadius:15,
        justifyContent:'center',
        alignItems:'center'
    }
})