import { Alert, BackHandler, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import ConfirmationModal from '../../components/ConfirmationModal';
const Racks = ({ navigation }) => {
  const [valueGeneral, setValueGeneral] = useState();
  const [valueModerna, setValueModerna] = useState();
  const [checked, setChecked] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const EnviaDatosLocal = async () => {
    db_insertPercha(1, checked, valueGeneral, valueModerna);
    await lookForPerchas(setPedidos);
    console.log("Pedidos desde Screen:", pedidos)

  }

  useEffect(() => {
    const disableBackButton = () => {
      return true; // Bloquea la función de retroceso nativa
    };

    BackHandler.addEventListener('hardwareBackPress', disableBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', disableBackButton);
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };
  
  let datos = [
    {
      id:"I001",
      name: "Pan",
      carasGeneral:null,
      carasModerna:null,
      state:null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
        },
    {
      id:"I002",
      name: "Harina",
      carasGeneral:null,
      carasModerna:null,
      state:null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    },
    {
      id:"I003",
      name: "Avena",
      carasGeneral:null,
      carasModerna:null,
      state:null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    },
    {
      id:"I004",
      name: "Arroz",
      carasGeneral:null,
      carasModerna:null,
      state:null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    },
  ];
  const [data, setData] = useState([...datos])

  useEffect(() => {
    console.log("DATA", data)

  }, []);
  const validate = () => {
    console.log("VALIDACION DE DATOS DE PERCHAS: ", data)
    const isValid = data.every(item => {
      if (item.state === null || item.carasGeneral === null || item.carasModerna === null) {
        console.log("ESTE ITEM DA PROBLEMAS: ", item);
        return false;
      }
      if (item.state === true) {
        if (!item.images || item.images.image1 === null) {
          console.log("ESTE ITEM DA PROBLEMAS DE VALORES O IMAGEN: ", item);
          return false;
        }
      }
      return true;
    });




    if (!isValid) {
      Alert.alert("Error al completar los datos", "Necesita marcar el valor de las perchas de cada producto");
      //navigation.navigate('rack');
      console.log("PORTAFOLIO IDEAL: ", JSON.stringify(data));
    } else {
      console.log("TODO BIEN");
      //navigation.navigate('rack');
      navigation.navigate('promos')
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <ConfirmationModal visible={isModalVisibleClose} onClose={handleCloseModal} onPress={() => navigation.goBack()} warning={'¿Está seguro de querer cancelar el progreso actual?'} />
      <View style={{ flex: 1, width: '100%', backgroundColor: 'blue' }}>
        <ModernaHeader />
      </View>

      <View style={styles.contentContainer}>
        <ProgressBar currentStep={2} />
        <ScreenInformation title={'Perchas'} text={'Selecciona las perchas de los productos disponibles en el punto de venta actual'} />
        <View style={styles.cardContainer}>
          <TarjPercha data={data} setData={setData} view={'audit'} />
        </View>
      </View>
      <DoubleStyledButton
        titleLeft={'Cancelar'}
        sizeLeft={theme.buttonSize.df}
        colorLeft={theme.colors.modernaYellow}
        iconLeft={'cancel'}
        typeLeft={'material-icon'}
        onPressLeft={() => setIsModalVisibleClose(true)}
        titleRigth={'Siguiente'}
        sizeRigth={theme.buttonSize.df}
        iconRigth={'arrow-right-circle'}
        typeRigth={'feather'}
        colorRigth={theme.colors.modernaRed}
        onPressRigth={validate}/>

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

