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
import {
  handleSelectDataBase,
  realizarConsulta,
  selectData,
} from "../../common/sqlite_config";
import { dataTime, generateUIDD } from "../../services/GenerateID";
import { useFonts } from "expo-font";
import DoubleDualStyledButton from "../../components/DoubleDualStyledButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getLocation,
  requestLocationPermission,
} from "../../services/GeolocationA";
import { Dropdown, DropdownDavid } from "../../components/Dropdown";
import { subidaBaseRemote } from "../../services/SubidaBaseRemota";
import {
  cleanCurrentScreenUser,
  deleteRegisterAudit,
  getCurrentScreenInformation,
  saveCurrentScreenUser,
} from "../../utils/Utils";
import { useIsFocused } from "@react-navigation/native";
import { getActualDate } from "../../common/utils";

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
  //const [newArrayClients, setNewArrayClients] = useState([]);
  const [datosCompletos, setDatosCompletos] = useState({});
  const [newArrayClients, setNewArrayClients] = useState([]);
  const [branchNames, setBranchNames] = useState([]);

  const { location } = useContext(ModernaContext);

  const [type, setType] = useState("");
  const [clientGroupId, setClientGroupId] = useState("");
  const [groupClient, setGroupClient] = useState("");
  const [arrayClients, setArrayClients] = useState([]);
  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);
  const [infoScreen, setInfoScreen] = useState(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    const initDataLocal = async () => {
      console.log(
        "empexando a await de get current data ===================================="
      );
      await getCurrentScreenInformation();
      getInfoDatBaseScreen();
    };
    initDataLocal();
    setTimeout(() => {
      initDataLocal();
    }, 2000);
  }, [isFocused]);

  const getInfoDatBaseScreen = () => {
    try {
      console.log("global.userInfoScreen", global.userInfoScreen);
      if (global.userInfoScreen.userInfo.nombre_pantalla != "audit") {
        return;
      }
      const tmpInfoExtra = JSON.parse(
        global.userInfoScreen.userInfo.extra_info
      );
      console.log(
        "tmpInfoExtra dewsde clietn infomart===================",
        tmpInfoExtra
      );
      //const tmpInfoExtra = JSON.parse(global.userInfoScreen.userInfo.extra_info)
      const tmpPantalla = tmpInfoExtra.pantallas.cliente_informacion;
      const infoExtra = tmpPantalla.extra_info;
      /* const tmpPantalla=tmpInfoExtra.pantallas.cliente_informacion
       const infoExtra = tmpPantalla.extra_info*/
      const newObj = {
        ...infoExtra,
        ...global.userInfoScreen.infoScreen,
      };
      // console.log("newObj-------------", newObj)
      setInfoScreen(newObj);
      setShowButton2(true);
      setShowButton1(false);
      AsyncStorage.setItem("id_cliente", infoExtra.auditorias_id.id_cliente);
      AsyncStorage.setItem(
        "nombre_cliente",
        infoExtra.auditorias_id.nombre_cliente
      );
      AsyncStorage.setItem("id_sucursal", infoExtra.auditorias_id.id_sucursal);
      AsyncStorage.setItem(
        "nombre_sucursal",
        infoExtra.auditorias_id.nombre_sucursal
      );
    } catch (error) {
      setInfoScreen(null);
      setShowButton2(false);
      setShowButton1(true);
      console.log(error);
    }
  };

  const consultarYCopiarContenidoClientes = async () => {
    try {
      // Realiza la consulta a la base de datos
      //  const resultadoConsulta = await realizarConsulta("SELECT * FROM cliente");
      handleSelectDataBase(
        "SELECT * FROM cliente",
        (resultadoConsulta) => {
          // setClientes(dataFormat(resultadoConsulta));
          setNewArrayClients(dataFormat(resultadoConsulta));
        },
        (e) => {
          console.log("error al consulatar cliente", e);
          Alert.alert("error al consulatar cliente", e);
        }
      );
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  const dataFormat = (array) => {
    setArrayClients(array);
    // console.log("ARRAY DE CONSULTA: ", array);
    const arrayFormat = array.map((obj) => {
      // console.log("OBJETO: ", obj.id_cliente);
      return { key: obj.id_cliente, value: obj.nombre_cliente };
    });
    console.log(arrayFormat);
    return arrayFormat;
  };
  useEffect(() => {
    consultarYCopiarContenidoClientes();
  }, []);

  const consultarYCopiarContenido = async () => {
    try {
      const resultadoConsultarBranch = await realizarConsulta(
        "SELECT * FROM sucursal"
      );

      const branchs = resultadoConsultarBranch.map(
        ({ nombre_sucursal, fecha_creacion }) => ({
          nombre_sucursal,
          fecha_creacion: fecha_creacion.split("T")[0],
        })
      );

      setBranchNames(branchs);
      console.log("DATOS DE SUCURSALES :", branchs);
    } catch (error) {
      console.error("Error al consultar o copiar el contenido:", error);
    }
  };

  useEffect(() => {
    consultarYCopiarContenido();
    //consultarYCopiarContenidoClientes();
  }, []);

  const validate = (objeto) => {
    const valores = Object.values(objeto);
    return valores.every(
      (valor) => valor !== null && valor !== undefined && valor !== ""
    );
  };

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

  const validateBranchName = async () => {
    let verificacion;
    console.log("ENTRO A VALIDAR EL NOMBRE. . . . .");
    /*let result = branchNames.some((item) => {
      console.log("ITEM DEL ARRAY: ", item.nombre_sucursal);
      console.log("ITEM DE COMPARACION: ", sucursalInformation.name);
      console.log("ITEMcOMPLETO", item);
      return item.nombre_sucursal === sucursalInformation.name;
    });*/
    let tempFecha;
    tempFecha = new Date().toISOString();
    tempFecha = tempFecha.split("T");
    tempFecha = tempFecha[0];
    //console.log("usereeeeee:", selected);
    let result = branchNames.some((item) => {
      console.log(
        "ITEM DEL ARRAY: ",
        item.nombre_sucursal + " " + item.fecha_creacion
      );
      console.log("ITEM DE COMPARACION: ", sucursalInformation.name);
      console.log("FCEHA ACTUAL: ", tempFecha);
      return (
        item.nombre_sucursal === sucursalInformation.name &&
        item.fecha_creacion === tempFecha
      );
    });
    /*const auditorias = await realizarConsulta(
      `select * from auditoria as aud inner join sucursal as s on s.id_sucursal =aud.id_sucursal  where aud.nombre_sucursal='${sucursalInformation.name}' AND nombre_cliente LIKE '${selected}' AND aud.FECHA_CREACION  LIKE '%${tempFecha}%' `
    );*/

    return result;
  };

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
    let validateBranch = await validateBranchName();
    console.log("dede antes de validar:", validateBranch);
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
      //console.log("DATOS DE COORDENADAS: ", locationCoords);
      try {
        const locationCoords = await getLocation();
        await AsyncStorage.setItem("id_sucursal", sucursalInformation.id);
        await AsyncStorage.setItem("nombre_sucursal", sucursalInformation.name);
        setIsModalVisible(false);
        const { latitude, longitude } = locationCoords;
        console.log("DATOS A GUARDAR: ", {
          id: sucursalInformation.id,
          nombre: sucursalInformation.name,
          latitude: latitude,
          longitude: longitude,
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
            `'${latitude}'`,
            `'${longitude}'`,
            `'${userInfo.givenName}'`,
            `'${dataTime()}'`,
            `'${dataTime()}'`,
          ],
          dataInsertRemote: [
            `${sucursalInformation.id}`,
            `${sucursalInformation.name}`,
            `${latitude}`,
            `${longitude}`,
            `${userInfo.givenName}`,
            `${dataTime()}`,
            `${dataTime()}`,
          ],
        };
        //datosCompletos.latitude,
        //datosCompletos.longitude,
        await AsyncStorage.setItem("id_sucursal", sucursalInformation.id);
        await AsyncStorage.setItem("nombre_sucursal", sucursalInformation.name);
        const tmp_client_id = await AsyncStorage.getItem("id_cliente");
        await AsyncStorage.setItem("nombre_cliente", selected);
        saveCurrentScreenUser(
          {
            screenName: `audit`,
            tableName: `sucursal`,
            itemId: sucursalInformation.id,
            columnId: `id_sucursal`,
          },
          {
            // nombre_cliente: selected,
            // grupo_cliente: groupClient,
            // tipo_cliente: type,
            // auditorias_id: {
            //   id_cliente: tmp_client_id,
            //   nombre_cliente: selected,
            //   id_sucursal: sucursalInformation.id,
            //   nombre_sucursal: sucursalInformation.name
            // },
            pantallas: {
              cliente_informacion: {
                principal: {
                  screenName: `audit`,
                  tableName: `sucursal`,
                  itemId: sucursalInformation.id,
                  columnId: `id_sucursal`,
                },
                extra_info: {
                  nombre_cliente: selected,
                  grupo_cliente: groupClient,
                  tipo_cliente: type,
                  auditorias_id: {
                    id_cliente: tmp_client_id,
                    nombre_cliente: selected,
                    id_sucursal: sucursalInformation.id,
                    nombre_sucursal: sucursalInformation.name,
                  },
                  pantallas: {
                    cliente_informacion: null,
                  },
                },
              },
            },
          }
        );

        //  await subirArrays(dataSave.dataInsertType, dataSave.dataInsertRemote)
        const sentence =
          "INSERT INTO " +
          dataSave.tableName +
          " (" +
          dataSave.dataInsertType.join() +
          ") VALUES(" +
          dataSave.dataInsert.join() +
          ")";
        console.log("SENTENCIA A EJECUTAR: ", sentence);
        try {
          db_insertGlobalDataAudit(dataSave);
          //navigation.navigate("briefcase");
          setShowButton1(false);
          setShowButton2(true);
          setValidatePass(true);
          setIsModalVisible(false);
        } catch (e) {
          console.log(e);
          Alert.alert(
            "Error al insertar datos",
            "Se ah producido un error al registrar los datos, vuelva a intentarlo por favor"
          );
          setValidatePass(true);
          setIsModalVisible(false);
        }
        //db_insertGlobalDataAudit(dataSave);
        //navigation.navigate("briefcase");
        //setShowButton1(false);
        //setShowButton2(true);
        //setValidatePass(true);
        //setIsModalVisible(false);
      } catch (e) {
        Alert.alert(
          "Se ha producido un error al recopilar datos",
          "Vuelva a intentarlo nuevamente"
        );
        console.log(e);
        setIsModalVisible(false);
      }
      /*if (locationCoords) {
        
      } else {
        console.log(error);
        setIsModalVisible(false);
        // El permiso de ubicación fue denegado o ocurrió un error al obtener la ubicación
      }*/
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
  const handleDeleteRegisterLocal = async () => {
    deleteRegisterAudit({
      tableName: "sucursal",
      objectId: "id_sucursal",
      valueId: `${
        infoScreen ? infoScreen.id_sucursal : sucursalInformation.id
      }`,
    });
    // const sqlsenten=`select * from sucursal where id_sucursal='${infoScreen.id_sucursal}'`
    // const res=await realizarConsulta(`select * from sucursal where id_sucursal='${infoScreen.id_sucursal}'`)
    // console.log("ressss",res)
    // console.log("sqlsenten",sqlsenten)
    // console.log("infoScreen",infoScreen)

    cleanCurrentScreenUser();
  };
  if (!fontLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle={"dark-content"} />
      <ConfirmationModal
        visible={isModalVisibleClose}
        onClose={handleCloseModal}
        onPress={() => {
          setIsModalVisibleClose(false);
          handleDeleteRegisterLocal();
          navigation.navigate("menu");
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
            flex: 1.6, //backgroundColor:'orange'
          }}
        >
          <Dropdown
            valueInfoScreen={infoScreen ? infoScreen.nombre_cliente : null}
            placeholder={"Seleccione un cliente"}
            setSelected={setSelected}
            selected={selected}
            setType={setType}
            newArrayClients={newArrayClients}
            setGroupClient={setGroupClient}
            error={errorClientName}
            clients={newArrayClients}
            setClientGroupId={setClientGroupId}
            setSucursalInformation={setSucursalInformation}
            sucursalInformation={sucursalInformation}
            setError={setErrorClientName}
            arrayClients={arrayClients}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 15,
            justifyContent: "space-evenly",
            flex: 1.3,
            width: "100%",
            //backgroundColor: "orange",
          }}
        >
          <View style={{ width: 160 }}>
            <Text
              style={{
                //paddingBottom: 5,
                fontFamily: "Metropolis",
                flex: 1,
                fontSize: 14,
                //backgroundColor: "blue",
              }}
            >
              Grupo de cliente
            </Text>
            <View
              style={{
                //width: "100%",
                //height: 45,
                flex: 1.5,
                borderWidth: 2,
                borderColor: theme.colors.lightgray,
                //borderColor: "black",
                borderRadius: 5,
                justifyContent: "center",
                //padding: 10,
                alignItems: "center",
                backgroundColor: "rgba(169,169,169,0.15)",
              }}
            >
              <Text style={{ fontSize: 12, fontFamily: "Metropolis" }}>
                {infoScreen ? infoScreen.grupo_cliente : groupClient}
              </Text>
            </View>
          </View>
          <View style={{ width: 160 }}>
            <Text
              style={{
                //paddingBottom: 2,
                fontFamily: "Metropolis",
                flex: 1,
                fontSize: 14,
              }}
            >
              Tipo de cliente
            </Text>
            <View
              style={{
                width: "100%",
                //height: 100,
                //height: "100%",
                flex: 1.5,
                borderWidth: 2,
                borderColor: theme.colors.lightgray,
                borderRadius: 5,
                //padding: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(169,169,169,0.15)",
              }}
            >
              <Text style={{ fontSize: 12, fontFamily: "Metropolis" }}>
                {infoScreen ? infoScreen.tipo_cliente : type}
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
            editable={infoScreen ? false : true}
            value={infoScreen ? infoScreen.nombre_sucursal : sucursal}
            width={"90%"}
            information={
              "* Solo se puede ingresar la misma sucursal una vez por día"
            }
          />
        </View>
        <View style={{ flex: 1.1, alignItems: "center", margin: 5 }}>
          <DoubleDualStyledButton
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
            showButton1={showButton1}
            showButton2={showButton2}
            titleRigthSecond={"Siguiente"}
            sizeRigthSecond={theme.buttonSize.df}
            //iconRigth={"content-save-all-outline"}
            //typeRigth={"material-community"}
            colorRigthSecond={theme.colors.modernaRed}
            onPressRigthSecond={() => navigation.navigate("briefcase")}
            showButton1Second={showButton1}
            showButton2Second={showButton2}
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
