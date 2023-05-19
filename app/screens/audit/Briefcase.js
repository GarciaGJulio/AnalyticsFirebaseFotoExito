import { Alert, BackHandler, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState,useEffect } from 'react';
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png';
import StyledButton from '../../components/StyledButton';
import * as Animatable from 'react-native-animatable';
import theme from '../../theme/theme';
import DoubleStyledButton from '../../components/DoubleStyledButton';
import ScreenInformation from '../../components/ScreenInformation';
import ModernaHeader from '../../components/ModernaHeader';
import BriefcaseList from '../../components/BriefcaseList';
import { ScrollView } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import LOADER_ANIMATION from '../../../assets/loader.json';
import LoaderModal from '../../components/LoaderModal';
import ProgressBar from '../../components/ProgressBar';
import MultiSelectList from '../../components/MultiSelectList';
import FlashListC from '../../components/FlashListC';
import FlashListPortfolio from '../../components/FlashListPortfolio';
import ConfirmationModal from '../../components/ConfirmationModal';

const Briefcase = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idealPortfolioProducts,setIdealPortfolioProducts] = useState([]);
  const [complementaryPortfolioProducts,setComplementaryPortfolioProducts] = useState([]);
  const [currentStep] = useState(0);
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };

  useEffect(() => {
    const disableBackButton = () => {
      return true; // Bloquea la función de retroceso nativa
    };
  
    BackHandler.addEventListener('hardwareBackPress', disableBackButton);
  
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', disableBackButton);
    };
  }, []);

  const handleOpenModal = () => {
    //setIsModalVisible(true);
    //console.log("SUMA DE PRODUCTOS MENORES A 5 - - - - - -")
    //console.log("PORTAFOLIO IDEAL: ",JSON.stringify(idealPortfolioProducts));
    validateProduct()
    /*setTimeout(() => {
      //setIsModalVisible(false);
      //navigation.navigate('prices', { currentStep });
    }, 2000);*/
  };

  const validateProduct = () => {
    console.log("SUMA DE TAMAÑOS DE ARRAYS PORTAFOLIO: "+(idealPortfolioProducts.length + complementaryPortfolioProducts.length) )
    if((idealPortfolioProducts.length + complementaryPortfolioProducts.length) < 5){
      Alert.alert("No se puede realizar la auditoria sin productos: ","Debe selecionar al menos 5 productos entre ambos portafolios")
      console.log("SUMA DE PRODUCTOS MENORES A 5 - - - - - -")
      console.log("PORTAFOLIO IDEAL: ",JSON.stringify(idealPortfolioProducts));
      console.log("PORTAFOLIO COMPLEMENTARIO: ",JSON.stringify(complementaryPortfolioProducts));
    }else{
      Alert.alert("Productos validados: ","Redirigiendo a la siguiente pantalla");
      navigation.navigate('prices', { currentStep,complementaryPortfolioProducts,idealPortfolioProducts,setComplementaryPortfolioProducts });
    }
   
    //alert("PORTAFOLIO IDEAL: "+JSON.stringify(idealPortfolioProducts))
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <ConfirmationModal visible={isModalVisibleClose} onClose={handleCloseModal} onPress={()=> navigation.goBack()} warning={'¿Está seguro de querer cancelar el progreso actual?'} />
      <View style={styles.headerContainer}>
        <ModernaHeader />
      </View>
      <LoaderModal animation={LOADER_ANIMATION} visible={isModalVisible} warning={'Almacenando datos, por favor espere...'} />
      <View style={styles.contentContainer}>
        <ProgressBar currentStep={currentStep}/>
        <ScreenInformation title={'Portafolio'} text={'Selecciona los productos del portafolio ideal o del portafolio complementario'}/>
        <View style={{flex:4,width:'100%',alignItems:'center', marginTop:10}}>
        <Text style={styles.text}>Portafolio Ideal</Text>
            <FlashListPortfolio  idealPortfolioProducts={idealPortfolioProducts} setIdealPortfolioProducts={setIdealPortfolioProducts}/>
        </View>
        <View style={{flex:3}}>
          <MultiSelectList setComplementaryPortfolioProducts={setComplementaryPortfolioProducts} complementaryPortfolioProducts={complementaryPortfolioProducts}/>
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
          <DoubleStyledButton 
              titleLeft={'Cancelar'} 
              sizeLeft={theme.buttonSize.df} 
              colorLeft={theme.colors.modernaYellow}
              iconLeft={"cancel"}
              typeLeft={"material-icon"}
              onPressLeft={() => setIsModalVisibleClose(true)}
              titleRigth={'Guardar'} 
              sizeRigth={theme.buttonSize.df} 
              iconRigth={'content-save-all-outline'}
              typeRigth={'material-community'}
              colorRigth={theme.colors.modernaRed}
              onPressRigth={handleOpenModal} 
            />
        </View>
        
      </View>
    </View>
  )
}

export default Briefcase

const styles = StyleSheet.create({
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
    text:{
        fontWeight:theme.fontWeight.bold,right:130
    },
    scrollView: {
      //flex:7,
      backgroundColor:'blue',
      width: theme.dimensions.maxWidth,
      //height:'30%',
      marginBottom: 5,
    },
})
