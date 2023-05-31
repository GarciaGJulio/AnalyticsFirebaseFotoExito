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
//import Dropdown from "../../components/Dropdown";
import StyledInput from "../../components/StyledInput";
import LOCATION_ANIMATION from "../../../assets/gps.json";
import LoaderModal from "../../components/LoaderModal";
import * as Location from "expo-location";
import axios from "axios";
import { capturarCoordenadas } from "../../services/GeolocationM";
import ModernaContext from "../../context/ModernaContext";
import {
  db_insertGlobal,
  db_insertGlobalDataAudit,
  db_insertSucursal,
} from "../../services/SqliteService";
import { lookForSucursal } from "../../services/SeleccionesService";
import { validateNameBranch } from "../../utils/helpers";
import ConfirmationModal from "../../components/ConfirmationModal";
import StyledButton from "../../components/StyledButton";
import { realizarConsulta, selectData } from "../../common/sqlite_config";
import { dataTime, generateUIDD } from "../../services/GenerateID";
import { useFonts } from "expo-font";
import DoubleDualStyledButton from "../../components/DoubleDualStyledButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestLocationPermission } from "../../services/GeolocationA";
import { Dropdown, DropdownDavid } from "../../components/Dropdown";

export const Client_Information = ({ navigation }) => {
  const { userInfo } = useContext(ModernaContext);
  const [selected, setSelected] = useState("");
  const [validatePass, setValidatePass] = useState(false);
  const [sucursal, setSucursal] = useState("");
  const [errorBranchName, setErrorBranchName] = useState();
  const [errorClientName, setErrorClientName] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleClose, setIsModalVisibleClose] = useState(false);
  const [sucursalInformation, setSucursalInformation] = useState({
    client: "",
    clientType: "",
    name: "",
    id: generateUIDD(),
  });
  const [datosCompletos, setDatosCompletos] = useState({});
  const [newArrayClients, setNewArrayClients] = useState([]);
  const [branchNames, setBranchNames] = useState([]);

  const { location } = useContext(ModernaContext);

  const [type, setType] = useState("");
  const [clientGroupId, setClientGroupId] = useState("");
  const [groupClient, setGroupClient] = useState("");

  const consultarYCopiarContenido = async () => {
    try {
      const resultadoConsultarBranch = await realizarConsulta(
        "SELECT * FROM sucursal"
      );

      const branchs = resultadoConsultarBranch.map(({ nombre_sucursal }) => ({
        nombre_sucursal,
      }));
      setBranchNames(branchs);
      console.log(
        "Copia de contenido completada con éxito: ",
        resultadoConsultarBranch
      );
      console.log("NOMBRE DE BRANCHES: ", branchs);
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
    //consultarYCopiarContenidoClientes();
  }, []);

  /*const sendLocalData = async (setSucursalData) => {
    db_insertSucursal(
      1,
      1,
      sucursalInformation.name,
      sucursalInformation.latitude,
      sucursalInformation.length
    );
    await lookForSucursal(setSucursalData);
    console.log("Pedidos desde Screen:", sucursalData);
  };*/

  const validate = (objeto) => {
    const valores = Object.values(objeto);
    return valores.every(
      (valor) => valor !== null && valor !== undefined && valor !== ""
    );
  };

  useEffect(() => {
    console.log("location from context", location);
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

  const validateBranchName = () => {
    console.log("ENTRO A VALIDAR EL NOMBRE. . . . .");
    let result = branchNames.some((item) => {
      console.log("ITEM DEL ARRAY: ", item.nombre_sucursal);
      console.log("ITEM DE COMPARACION: ", sucursalInformation.name);
      return item.nombre_sucursal === sucursalInformation.name;
    });
    console.log(result);
    return result;
  };

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
      setErrorBranchName("* El campo nombre de sucursal es obligatorio");
      //setValidatePass(false)
    }
    if (selected == "") {
      setErrorClientName("* El campo cliente es obligatorio");
      //setValidatePass(false)
    }
    if (selected != "") {
      setErrorClientName("");
      //setValidatePass(false)
    }
    let validateBranch = validateBranchName();

    if (validateBranch) {
      Alert.alert(
        "El nombre de la sucursal ya ha sido registrado",
        "No se puede realizar más de una auditoria al día"
      );
    }

    if (!validador && errorBranchName != "") {
      Alert.alert(
        "Error al ingresar los datos",
        "Debe ingresar todos los datos indicados cumpliendo con las indicaciones"
      );
    }

    if (validador && errorBranchName == "" && !validateBranch) {
      //navigation.navigate("briefcase");
      setIsModalVisible(true);
      const locationCoords = await requestLocationPermission();
      if (locationCoords) {
        try {
          const { latitude, longitude } = locationCoords;
          await AsyncStorage.setItem("id_sucursal", sucursalInformation.id);
          setIsModalVisible(false);
          console.log("DATOS A GUARDAR: ", {
            id: sucursalInformation.id,
            nombre: sucursalInformation.name,
            latitude: datosCompletos.latitude,
            longitude: datosCompletos.longitude,
            usuario: userInfo.givenName,
            creacion: dataTime(),
            modificacion: dataTime(),
          });
          console.log("JSON FINAL: ", JSON.stringify(sucursalInformation));
          let dataSave = {
            tableName: "sucursal",
            dataInsertType: [
              "id_sucursal",
              "nombre_sucursal",
              "latitud",
              "longitud",
              "usuario_creacion",
              "fecha_creacion",
              "fecha_modificacion",
            ],
            dataInsert: [
              `'${sucursalInformation.id}'`,
              `'${sucursalInformation.name}'`,
              latitude,
              longitude,
              `'${userInfo.givenName}'`,
              `'${dataTime()}'`,
              `'${dataTime()}'`,
            ],
          };
          //datosCompletos.latitude,
          //datosCompletos.longitude,
          const sentence =
            "INSERT INTO " +
            dataSave.tableName +
            " (" +
            dataSave.dataInsertType.join() +
            ") VALUES(" +
            dataSave.dataInsert.join() +
            ")";
          console.log("SENTENCIA A EJECUTAR: ", sentence);
          db_insertGlobalDataAudit(dataSave);
          // navigation.navigate("briefcase");
          navigation.navigate("briefcase");
          setValidatePass(true);
          setIsModalVisible(false);
        } catch (e) {
          Alert.alert(
            "Se ha producido un error al recopilar datos",
            "Vuelva a intentarlo nuevamente"
          );
          setIsModalVisible(false);
        }
      } else {
        console.log(error);
        setIsModalVisible(false);
        // El permiso de ubicación fue denegado o ocurrió un error al obtener la ubicación
      }
    }
  };

  /*const insertar = () => {
    let sentencia =
      "INSERT INTO cliente (id_cliente,id_tipo_cliente,nombre_cliente,usuario_creacion,fecha_creacion,fecha_modificacion) values ('C2B47Q','T3D44S','Supermaxi',null,null,null)";
    db_insertGlobal({ tableName: "cliente", sentence: sentencia });
  };*/

  const [fontLoaded] = useFonts({
    Metropolis: require("../../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });
  /*
  useEffect(() => {
    Alert.alert("DATOS DE LA BASE LOCAL:", newArrayClients);
  }, []);*/

  /*const consultarYCopiarContenidoClientes = async () => {
    try {
      // Realiza la consulta a la base de datos
      const resultadoConsulta = await realizarConsulta("SELECT * FROM cliente");

      // Copia el contenido después de la consulta
      //await copiarContenido(resultadoConsulta);
      setNewArrayClients(dataFormat(resultadoConsulta));
      console.log("Copia de contenido completada con éxito: ");
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };*/

  if (!fontLoaded) return null;

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

        <View
          style={{
            //flexDirection: "row",
            //marginHorizontal: 20,
            flex: 1.5, //backgroundColor:'orange'
          }}
        >
          <Dropdown
            placeholder={"Seleccione un cliente"}
            setSelected={setSelected}
            selected={selected}
            setType={setType}
            setGroupClient={setGroupClient}
            error={errorClientName}
            clients={newArrayClients}
            setClientGroupId={setClientGroupId}
            setSucursalInformation={setSucursalInformation}
            sucursalInformation={sucursalInformation}
            setError={setErrorClientName}
          />
        </View>
    
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            justifyContent: "space-evenly",
            flex: 1,
            width: "100%",
            //backgroundColor: "orange",
          }}
        >
          
          <View style={{ width: 160 }}>
            <Text
              style={{ paddingBottom: 5, fontFamily: "Metropolis", flex: 1 }}
            >
              Grupo de cliente
            </Text>
            <View
              style={{
                width: "100%",
                //height: 45,
                flex: 1,
                borderWidth: 2,
                borderColor: theme.colors.lightgray,
                //borderColor: "black",
                borderRadius: 5,
                padding: 10,
                alignItems: "center",
                backgroundColor: "rgba(169,169,169,0.15)",
              }}
            >
              <Text style={{ fontSize: 15, fontFamily: "Metropolis", flex: 1 }}>
                {groupClient}
              </Text>
            </View>
          </View>
          <View style={{ width: 160 }}>
            <Text
              style={{ paddingBottom: 5, fontFamily: "Metropolis", flex: 1 }}
            >
              Tipo de cliente
            </Text>
            <View
              style={{
                width: "100%",
                //height: 100,
                flex: 1,
                borderWidth: 2,
                borderColor: theme.colors.lightgray,
                borderRadius: 5,
                padding: 10,
                alignItems: "center",
                backgroundColor: "rgba(169,169,169,0.15)",
              }}
            >
              <Text style={{ fontSize: 15, fontFamily: "Metropolis", flex: 1 }}>
                {type}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 3,
            alignItems: "center",
            //backgroundColor:'red',
          }}
        >
          <StyledInput
            onChangeText={(txt) => {
              setSucursal(txt);
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
            information={
              "* Solo se puede ingresar la misma sucursal una vez por día"
            }
          />
        </View>
        <View style={{ flex: 0.8, alignItems: "center", margin: 5 }}>
          <DoubleStyledButton
            titleLeft={"Cancelar"}
            sizeLeft={theme.buttonSize.df}
            colorLeft={theme.colors.modernaYellow}
            iconLeft={"cancel"}
            typeLeft={"material-icon"}
            onPressLeft={() => setIsModalVisibleClose(true)}
            titleRigth={"Iniciar Visita"}
            sizeRigth={theme.buttonSize.df}
            //iconRigth={"content-save-all-outline"}
            //typeRigth={"material-community"}
            colorRigth={theme.colors.modernaRed}
            onPressRigth={handleOpenModal}
          />
        </View>
      </Animatable.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.modernaRed,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imageContainer: {
    flex: 1,
    width: theme.dimensions.maxWidth,
    //bottom: '35%',
    //backgroundColor:'blue',
    //alignItems:'center',
    //justifyContent:'center'
  },
  /*contentContainer: {
    width: theme.dimensions.maxWidth,
    //height: 536,
    flex: 3,
    backgroundColor: 'white',
    position: 'absolute',
    //bottom: 0,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },*/
  contentContainer: {
    flex: 1.5,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    //padding:5,
    //paddingVertical:5//
  },
  text: {
    fontWeight: theme.fontWeight.bold,
  },
});
