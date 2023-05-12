import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png';
import StyledButton from '../../components/StyledButton';
import * as Animatable from 'react-native-animatable';
import theme from '../../theme/theme';
import DoubleStyledButton from '../../components/DoubleStyledButton';
import ScreenInformation from '../../components/ScreenInformation';
import ModernaHeader from '../../components/ModernaHeader';
import FlashListPrices from '../../components/FlashListPrices';
import Dropdown from '../../components/Dropdown';
import ProgressBar from '../../components/ProgressBar';

const Promos = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <View style={{flex:1, width:'100%',backgroundColor:'blue'}}>
      <ModernaHeader />
      </View>
      <View style={styles.contentContainer}>
        <ScreenInformation title={'Promociones'} text={'Selecciona la sucursal que aplica promociones'} />
        <ProgressBar currentStep={3} />
        <Dropdown placeholder={'Seleccione una sucursal'} setSelected={setSelected}/>
        <ScrollView style={styles.scrollView}>
          <View style={styles.scrollViewContent}>
            <FlashListPrices />
          </View>
        </ScrollView>
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
        onPressRigth={() => navigation.navigate('begin')}
      />
    </View>
  );
};

export default Promos;

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
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    width: theme.dimensions.maxWidth,
    height:'20%',
    marginBottom: 5,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});
