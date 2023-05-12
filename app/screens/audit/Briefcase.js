import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState,useContext } from 'react';
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

const Briefcase = ({ navigation }) => {
  const [selected, setSelected] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep] = useState(0);

  const handleOpenModal = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
      navigation.navigate('prices', { currentStep });
    }, 2000);
  };

  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <ModernaHeader />
      </View>
      <LoaderModal animation={LOADER_ANIMATION} visible={isModalVisible} warning={'Almacenando datos, por favor espere...'} />
      <View style={styles.contentContainer}>
        <ProgressBar currentStep={currentStep}/>
        <ScreenInformation title={'Portafolio'} text={'Selecciona los productos del portafolio ideal o del portafolio complementario'}/>
        <View style={{flex:4,width:'100%',alignItems:'center'}}>
            <FlashListC/>
        </View>
        <View style={{flex:3}}>
          <MultiSelectList/>
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
          <DoubleStyledButton 
              titleLeft={'Cancelar'} 
              sizeLeft={theme.buttonSize.df} 
              colorLeft={theme.colors.modernaYellow}
              iconLeft={"cancel"}
              typeLeft={"material-icon"}
              onPressLeft={() => navigation.goBack()}
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
        fontWeight:theme.fontWeight.bold,
    },
    scrollView: {
      //flex:7,
      backgroundColor:'blue',
      width: theme.dimensions.maxWidth,
      //height:'30%',
      marginBottom: 5,
    },
})
