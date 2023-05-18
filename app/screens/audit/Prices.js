import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png'
import StyledButton from '../../components/StyledButton'
import * as Animatable from 'react-native-animatable'
import theme from '../../theme/theme'
import DoubleStyledButton from '../../components/DoubleStyledButton'
import ScreenInformation from '../../components/ScreenInformation'
import CheckBoxContainer from '../../components/CheckBoxContainer'
import ModernaHeader from '../../components/ModernaHeader'
import FlashListPrices from '../../components/FlashListPrices'
import { ScrollView } from 'react-native'
import ProgressBar from '../../components/ProgressBar'
import { Divider } from '@rneui/base'

const Prices = ({navigation,route}) => {
  const [newComplementaryPortfolio,setNewComplementaryPortfolio] = useState([])
  const data = [
    { id: '1', name: 'Mobiles', disabled: true },
    { id: '2', name: 'Appliances' },
    { id: '3', name: 'Cameras' },
    { id: '4', name: 'Computers', disabled: true },
    { id: '5', name: 'Vegetables' },
    { id: '6', name: 'Diary Products' },
    { id: '7', name: 'Drinks' },
    { id: '8', name: 'Harina', disabled: true },
    { id: '9', name: 'Fideos' },
    { id: '10', name: 'Pan' },
    { id: '11', name: 'Comestibles' },
  ];

  const {complementaryPortfolioProducts,idealPortfolioProducts} = route.params

  useEffect(() => {
    const getNewArrays = () => {
      /*const filteredItems = complementaryPortfolioProducts.filter(item =>
        data.some(compareItem => compareItem.name === item)
      );*/
      const filteredItems = data.filter(compareItem =>
        complementaryPortfolioProducts.some(item => item === compareItem.name)
      );
      setNewComplementaryPortfolio(filteredItems);
      console.log("NUEVO ARRAY FORMATEADO: ",filteredItems)
      console.log("ESTO LLEGA A LA PANTALLA PRECIO - - - - - -");
      console.log("PORTAFOLIO IDEAL: ", JSON.stringify(idealPortfolioProducts));
      console.log("PORTAFOLIO COMPLEMENTARIO: ", JSON.stringify(filteredItems));
    };
  
    getNewArrays();
  }, [complementaryPortfolioProducts]);
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <ModernaHeader/>
      </View>
      <View style={styles.contentContainer}>
        <ProgressBar currentStep={ 1 }/>
        <ScreenInformation title={'Preciador'} text={'Selecciona los productos que poseen preciador'}/>
        <View style={{flex:2,width:'100%', alignItems:'center'}}>
            <FlashListPrices title={'Portafolio Ideal'} products={idealPortfolioProducts}/>
        </View>
        <View style={{width:theme.dimensions.maxWidth/1.1,marginVertical:5}}> 
            <Divider width={2} color={'#D9D9D9'} style={{backgroundColor:'blue'}}/>
        </View>
        <View style={{flex:2,width:'100%', alignItems:'center'}}>
            <FlashListPrices title={'Portafolio Complementario'} products={newComplementaryPortfolio}/>
        </View>
        <DoubleStyledButton 
              titleLeft={'Cancelar'} 
              sizeLeft={theme.buttonSize.df} 
              colorLeft={theme.colors.modernaYellow}
              iconLeft={"cancel"}
              typeLeft={"material-icon"}
              onPressLeft={() => navigation.goBack()}
              titleRigth={'Siguiente'} 
              sizeRigth={theme.buttonSize.df} 
              iconRigth={'arrow-right-circle'}
              typeRigth={'feather'}
              colorRigth={theme.colors.modernaRed}
              onPressRigth={() => navigation.navigate('rack')} 
              />
      </View>
    </View>
  )
}

export default Prices

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:theme.dimensions.maxWidth,
        //height:600,
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      },
    headerContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'blue',
    },
    contentContainer:{
        flex: 14,
        width: theme.dimensions.maxWidth,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 5,
    },
})