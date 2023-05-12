import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React,{useContext,useState} from 'react'
import theme from '../../theme/theme'
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png'
import StyledButton from '../../components/StyledButton'
import * as Animatable from 'react-native-animatable'
import ModernaContext from '../../context/ModernaContext'
import TarjPercha from '../../components/TarjetaPercha'
import TarjPromo from '../../components/TarjetaPromo'

const Login = ({navigation}) => {

  const { handleLoginAzure, handleLoading } = useContext(ModernaContext);
    const log = () => {
        console.log("DISPARANDO LOGIN DE AD")
        login()
        //navigation.navigate('menu')
    }

    const funcionQA = (user) => {
  
      navigation.navigate('menu');

  }

    const login = async () => {
      try {
       // handleCanSelectEnvironment(funcionQA, functionProduction)
         //handleLoading(true);
         handleLoginAzure(funcionQA);
      } catch (error) {
        console.log(error);
        handleLoading(false);
      }
    };
    const [valueGeneral, setValueGeneral] = useState();
    const [valueModerna, setValueModerna] = useState();
    const [checked, setChecked] = useState(false);
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