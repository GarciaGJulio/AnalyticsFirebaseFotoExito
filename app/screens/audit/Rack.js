import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png';
import StyledButton from '../../components/StyledButton';
import * as Animatable from 'react-native-animatable';
import theme from '../../theme/theme';
import DoubleStyledButton from '../../components/DoubleStyledButton';
import ScreenInformation from '../../components/ScreenInformation';
import ModernaHeader from '../../components/ModernaHeader';
import ProgressBar from '../../components/ProgressBar';
import TarjPercha from '../../components/TarjetaPercha';
import RackCheckbox from '../../components/RackCheckbox';
import { db_insertPercha } from '../../services/SqliteService';
import { lookForPerchas } from '../../services/SeleccionesService';
const Racks = ({ navigation }) => {
  const [valueGeneral, setValueGeneral] = useState();
  const [valueModerna, setValueModerna] = useState();
  const [checked, setChecked] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const EnviaDatosLocal = async () => {
    db_insertPercha(1, checked);
    await lookForPerchas(setPedidos);
    console.log("Pedidos desde Screen:", pedidos)

  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <View style={{ flex: 1, width: '100%', backgroundColor: 'blue' }}>
        <ModernaHeader />
      </View>

      <View style={styles.contentContainer}>
        <ProgressBar currentStep={2} />
        <ScreenInformation title={'Perchas'} text={'Selecciona las perchas de los productos disponibles en el punto de venta actual'} />
        <View style={styles.cardContainer}>
          <TarjPercha />
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
        onPressRigth={() => {
          EnviaDatosLocal();
          navigation.navigate('promos')
        }}
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
    flex: 9,
    //height: 160,
    //borderWidth: 1,
    width: '100%',
    marginVertical: 5,
    //marginHorizontal:10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'blue',
  },
});

