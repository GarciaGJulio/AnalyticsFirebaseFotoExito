import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import theme from '../../theme/theme'
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png'
import StyledButton from '../../components/StyledButton'
import * as Animatable from 'react-native-animatable'
import SYNC_BACKGROUND from '../../../assets/resources/sync_background.jpg'
import LoaderModal from '../../components/LoaderModal'
import SYNC_ANIMATION from '../../../assets/sync-data.json'
import SUCCESS_ANIMATION from '../../../assets/success.json'
import FAILED_ANIMATION from '../../../assets/failed.json'
import DOWNLOAD_ANIMATION from '../../../assets/download.json'
import NetInfo from '@react-native-community/netinfo';
import ModernaContext from '../../context/ModernaContext'
import { Cli, GraphInit } from '../../azureConfig/graph/GraphManager'
const Menu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [animation, setAnimation] = useState("");
  const [isConnected,setIsConnected] = useState(false)
  //const { isConnected } = useContext(ModernaContext);

  useEffect(() => {
    let UserOnedrive = Cli;
    console.log("User:", UserOnedrive)
    //onedrive(UserOnedrive);

  }, []);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /*const onedrive = async (UserOnedrive) => {
    try {
      const response2 = await UserOnedrive.api("/me/drive").get()
      console.log("IDDDDDDDDDDDD", response2.id)
      const response = await UserOnedrive.api('/drives').get();
      console.log("Reesss", response);

      const base64Image = 'data:image/png;base64,iVBORw0KGg...'; // Aquí va el string base64 de la imagen
      const response3 = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', base64Image);
      const file = response3.path();


      const fileData = await RNFetchBlob.fs.readFile(file, 'base64');
      const uploadResult = await graphClient
        .api(`/drives/${driveId}/root:${filePath}:/content`)
        .put(fileData);
      console.log('Archivo subido:', uploadResult);



    } catch (error) {
      console.log("Error al subir el archivo:", error);
    }

  }*/


  const handleOpenModal = () => {
    setAnimation(SYNC_ANIMATION);
    setIsModalVisible(true);
    setModalMessage('Sincronizando datos, por favor espere...')
    setTimeout(() => {
      setAnimation(SUCCESS_ANIMATION);
      if (isConnected) {
        setTimeout(() => {
          setIsModalVisible(false);
        }, 2000);
      } else {
        setAnimation(FAILED_ANIMATION);
        setTimeout(() => {
          setIsModalVisible(false);
        }, 4000);
      }
    }, 5000);
  };

  const handleOpenModalAudit = () => {
    setAnimation(DOWNLOAD_ANIMATION);
    setModalMessage('Descargando variables para la auditoría, por favor espere...')
    setIsModalVisible(true);
    setTimeout(() => {
      //setAnimation(SUCCESS_ANIMATION);
      setIsModalVisible(false);
      navigation.navigate('audit')
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <LoaderModal animation={animation} visible={isModalVisible} warning={modalMessage} />
      <View style={styles.imageContainer}>
        <Image source={Logotipo} style={styles.image} />
      </View>
      <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
        <ImageBackground style={styles.cardContainer} source={SYNC_BACKGROUND} resizeMode='cover' imageStyle={{ opacity: 0.20 }}>
          <Text style={styles.text}>Sube una auditoria que hayas registrado de forma offline</Text>
          <StyledButton title={'Sincronizar Datos'} buttonColor={theme.colors.modernaYellow} onPress={handleOpenModal} size={theme.buttonSize.lg} iconName={'cloud-sync'} iconType={'material-community'} />
        </ImageBackground>
        <ImageBackground style={styles.cardContainer} source={SYNC_BACKGROUND} resizeMode='cover' imageStyle={{ opacity: 0.20 }}>
          <Text style={styles.text}>Descarga los datos para empezar una nueva auditoría.</Text>
          <StyledButton title={'Realizar Auditoria'} buttonColor={theme.colors.modernaRed} onPress={handleOpenModalAudit} size={theme.buttonSize.lg} iconName={'clipboard'} iconType={'entypo'} />
        </ImageBackground>
        <ImageBackground style={styles.cardContainer} source={SYNC_BACKGROUND} resizeMode='cover' imageStyle={{ opacity: 0.20 }}>
          <Text style={styles.text}>Sube una auditoria que hayas registrado de forma offline</Text>
          <StyledButton title={'Consultar Auditorias'} buttonColor={theme.colors.modernaGreen} onPress={() => navigation.navigate('listBranch')} size={theme.buttonSize.lg} iconName={'select-search'} iconType={'material-community'} />
        </ImageBackground>
      </Animatable.View>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.modernaRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 313,
    height: 112,
    resizeMode: 'cover'
  },
  imageContainer: {
    bottom: '35%'
  },
  contentContainer: {
    width: theme.dimensions.maxWidth,
    height: 536,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    width: 320,
    height: 160,
    overflow: 'hidden',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    fontWeight: theme.fontWeight.bold,
  }
})