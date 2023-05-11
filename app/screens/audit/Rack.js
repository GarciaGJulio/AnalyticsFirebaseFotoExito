import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png';
import StyledButton from '../../components/StyledButton';
import * as Animatable from 'react-native-animatable';
import theme from '../../theme/theme';
import DoubleStyledButton from '../../components/DoubleStyledButton';
import ScreenInformation from '../../components/ScreenInformation';
import ModernaHeader from '../../components/ModernaHeader';
import ProgressBar from '../../components/ProgressBar';

const Racks = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <View style={{flex:1, width:'100%',backgroundColor:'blue'}}>
      <ModernaHeader />
      </View>
      
      <View style={styles.contentContainer}>
        <ScreenInformation title={'Perchas'} text={'Selecciona las perchas'} />
        <ProgressBar currentStep={2} />
        <View style={styles.cardContainer}>
          {/* Contenido de la tarjeta */}
        </View>
      </View>
      <DoubleStyledButton
        titleLeft={'Cancelar'}
        sizeLeft={theme.buttonSize.df}
        colorLeft={theme.colors.modernaYellow}
        iconLeft={'cancel'}
        typeLeft={'material-icon'}
        onPressLeft={() => navigation.goBack()}
        titleRigth={'Siguiente'}
        sizeRigth={theme.buttonSize.df}
        iconRigth={'arrow-right-circle'}
        typeRigth={'feather'}
        colorRigth={theme.colors.modernaRed}
        onPressRigth={() => navigation.navigate('promos')}
      />
    </View>
  );
};

export default Racks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 12,
    width: theme.dimensions.maxWidth,
    backgroundColor: 'white',
    //borderTopStartRadius: 15,
    //borderTopEndRadius: 15,
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    width: '100%',
    height: 160,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
});
