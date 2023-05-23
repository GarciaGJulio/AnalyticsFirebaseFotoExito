import {
  Image,
  ImageBackground,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import Logotipo from "../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png";
import * as Animatable from "react-native-animatable";
import theme from "../../theme/theme";
import DoubleStyledButton from "../../components/DoubleStyledButton";
import ScreenInformation from "../../components/ScreenInformation";
import Dropdown from "../../components/Dropdown";
import StyledInput from "../../components/StyledInput";
import LOCATION_ANIMATION from "../../../assets/gps.json";
import LoaderModal from "../../components/LoaderModal";
import * as Location from "expo-location";
import axios from "axios";
import { capturarCoordenadas } from "../../services/GeolocationM";
import ModernaContext from "../../context/ModernaContext";
import {
  db_insertGlobal,
  db_insertSucursal,
} from "../../services/SqliteService";
import { lookForSucursal } from "../../services/SeleccionesService";
import { validateNameBranch } from "../../utils/helpers";
import ConfirmationModal from "../../components/ConfirmationModal";
import StyledButton from "../../components/StyledButton";
import { selectData } from "../../common/sqlite_config";

const Client_Information = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [errorBranchName, setErrorBranchName] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [sucursalInformation, setSucursalInformation] = useState({
    client: "",
    clientType: "",
    name: "",
  });
  const [datosCompletos, setDatosCompletos] = useState({});
  const [client, setClient] = useState([]);

  const { location } = useContext(ModernaContext);

  const [type, setType] = useState("");
  const [sucursalData, setSucursalData] = useState([]);

  const sendLocalData = async (setSucursalData) => {
    db_insertSucursal(
      1,
      1,
      sucursalInformation.name,
      sucursalInformation.latitude,
      sucursalInformation.length
    );
    await lookForSucursal(setSucursalData);
    console.log("Pedidos desde Screen:", sucursalData);
  };

  const validate = (objeto) => {
    const valores = Object.values(objeto);
    return valores.every(
      (valor) => valor !== null && valor !== undefined && valor !== ""
    );
  };

  const clientsType = [
    { client: "Tía", type: "ASI" },
    { client: "Supermaxi", type: "ASI" },
    { client: "Santamaría", type: "ASI" },
    { client: "Tía", type: "MAYORISTA" },
    { client: "El Arbolito", type: "MAYORISTA" },
    { client: "Mi Comisariato", type: "MAYORISTA" },
  ];
  useEffect(() => {
    console.log("location from context", location);
    /*if(location){
      Alert.alert("Las coordenadas se han capturado exitosamente!", 'Latitud: ' + location.latitude + 'Longitud: ' + location.longitude)
    
    }*/
  }, [location]);

  /*useEffect(() => {
    console.log("SELECT DE LA TABLA CLIENTE",);
    selectData("SELECT * FROM cliente",setArrayClients)
    /*if(location){
      Alert.alert("Las coordenadas se han capturado exitosamente!", 'Latitud: ' + location.latitude + 'Longitud: ' + location.longitude)
    
    }
  }, []);*/

  /*const handleOpenModal = () => {
    setIsModalVisible(true);
  };*/

  useEffect(() => {
    const disableBackButton = () => {
      return true; // Bloquea la función de retroceso nativa
    };

    BackHandler.addEventListener("hardwareBackPress", disableBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalVisibleClose(false);
  };

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Realizando peticion de datos del cliente")
        const response = await axios.post(
          "https://fotoexito1.azurewebsites.net/api/queryInsert?code=Pd_oqC3bfYtub9E13hybiElqLCtsPgO9FErzdxdzL-ISAzFuhWl7ug==",
          { operation:"Q", data:{ tableName:"cliente" } },
          { headers: { 'accept': 'application/json' } }
        )
        console.log("DATOS EXTRAIDOS")
        setClient(response.data.data.dataBaseResult)
        console.log(response.data.data.dataBaseResult)
      } catch (e) {
        console.log(e.response.data.message)
        //Alert.alert("Error de inicio de sesion", e.response.data.message);
      }
    };

    fetchData();
  }, []);*/
  /*const handleOpenModal = async () => {
    const validador = validate(sucursalInformation);
    if(validador){
      setIsModalVisible(true)
      try{
        capturarCoordenadas(sucursalInformation, setDatosCompletos, ()=>{
          //setIsModalVisible(false)
          //navigation.navigate('briefcase');
          setIsModalVisible(false)
          console.log("JSON FINAL: ",JSON.stringify(datosCompletos))
          if(datosCompletos.latitude){
            //sendLocalData(setSucursalData)
            navigation.navigate('briefcase');
            console.log("ENVIANDO DATOS A BASE . . . . .")
            //setIsModalVisible(false)
          }else{
            alert("NO SE HAN PODIDO REGISTRAR LOS DATOS DE LOCALIZACION")
          }
        },)
      }catch(e){
        console.log(e)
        setIsModalVisible(false)
      }
        
    }else{
      Alert.alert('Error', 'Debe ingresar todos los datos indicados')
    }
    
  };*/

  const handleOpenModal = async () => {
    const validador = validate(sucursalInformation);
    console.log("ERROR DE NOMBRE DE SUCURURAL", errorBranchName);
    if (errorBranchName != "") {
      setErrorBranchName("El campo nombre de sucursal no puede estar vacio");
    }
    if (validador && errorBranchName == "") {
      setIsModalVisible(true);
      try {
        /*const location = await capturarCoordenadas(sucursalInformation);
        const datosCompletos = { ...location };*/
        //setDatosCompletos(datosCompletos);
        setIsModalVisible(false);
        console.log("JSON FINAL: ", JSON.stringify(sucursalInformation));
        navigation.navigate("briefcase");
        /*if (datosCompletos.latitude) {
          navigation.navigate('briefcase');
          console.log("ENVIANDO DATOS A BASE . . . . .");
        } else {
          alert("NO SE HAN PODIDO REGISTRAR LOS DATOS DE LOCALIZACION");
        }*/
      } catch (error) {
        console.log(error);
        setIsModalVisible(false);
      }
    } else {
      Alert.alert(
        "Error al ingresar los datos",
        "Debe ingresar todos los datos indicados cumpliendo con las indicaciones"
      );
    }
  };

  /*const insertar = () => {
    let sentencia =
      "INSERT INTO cliente (id_cliente,id_tipo_cliente,nombre_cliente,usuario_creacion,fecha_creacion,fecha_modificacion) values ('C2B47Q','T3D44S','Supermaxi',null,null,null)";
    db_insertGlobal({ tableName: "cliente", sentence: sentencia });
  };*/
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle={"dark-content"} />
      <ConfirmationModal
        visible={isModalVisibleClose}
        onClose={handleCloseModal}
        onPress={() => {
          setIsModalVisibleClose(false);
          navigation.goBack();
        }}
        warning={"¿Está seguro de querer cancelar el progreso actual?"}
      />
      <LoaderModal
        animation={LOCATION_ANIMATION}
        visible={isModalVisible}
        warning={"Capturando locación actual, por favor espere..."}
      />
      <View style={styles.imageContainer}>
        <Image source={Logotipo} style={styles.image} />
      </View>
      <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
        <ScreenInformation title={"Información del Cliente"} text={""} />

        <View style={{ flexDirection: "row", marginHorizontal: 20, flex: 2 }}>
          <Dropdown
            placeholder={"Seleccione un cliente"}
            setSelected={setSelected}
            selected={selected}
            setType={setType}
            //clients={arrayClients}
            setSucursalInformation={setSucursalInformation}
            sucursalInformation={sucursalInformation}
          />
          <View style={{ width: 150, marginLeft: 10 }}>
            <Text style={{ paddingBottom: 5 }}>Tipo de cliente</Text>
            <View
              style={{
                width: "100%",
                height: 45,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
                padding: 10,
                alignItems: "center",
                backgroundColor: "rgba(169,169,169,0.15)",
              }}
            >
              <Text style={{ fontSize: 15 }}>{type}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 3, width: "90%", alignItems: "center" }}>
          <StyledInput
            onChangeText={(txt) => {
              setSucursal(txt.toUpperCase());
              validateNameBranch(txt, setErrorBranchName);
              setSucursalInformation({
                ...sucursalInformation,
                name: txt.toUpperCase(),
              });
            }}
            label="Sucursal"
            placeholder="Ingresa el nombre de la sucursal"
            maxLength={43}
            error={errorBranchName}
            keyboard="default"
            editable={true}
            value={sucursal}
            width={"90%"}
            information={"Solo se puede ingresar una sucursal por día"}
          />
          <Text>
            {selected}-{sucursal}
          </Text>
        </View>
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <DoubleStyledButton
            titleLeft={"Cancelar"}
            sizeLeft={theme.buttonSize.df}
            colorLeft={theme.colors.modernaYellow}
            iconLeft={"cancel"}
            typeLeft={"material-icon"}
            onPressLeft={() => setIsModalVisibleClose(true)}
            titleRigth={"Iniciar visita"}
            sizeRigth={theme.buttonSize.df}
            colorRigth={theme.colors.modernaRed}
            onPressRigth={handleOpenModal}
          />
        </View>
      </Animatable.View>
    </View>
  );
};

export default Client_Information;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.modernaRed,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 313,
    height: 112,
    resizeMode: "cover",
  },
  imageContainer: {
    bottom: "35%",
  },
  contentContainer: {
    flex: 1,
    width: theme.dimensions.maxWidth,
    height: 570,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    //justifyContent:'center',
    alignItems: "center",
  },
  cardContainer: {
    width: 320,
    height: 160,
    overflow: "hidden",
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },
  text: {
    fontWeight: theme.fontWeight.bold,
  },
});
