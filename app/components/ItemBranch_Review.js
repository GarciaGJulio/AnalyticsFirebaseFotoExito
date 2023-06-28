import { useNavigation } from "@react-navigation/native";
import { Icon, ListItem } from "@rneui/themed";
import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { commonStyles } from "../theme/stylesBranch";
import { useFonts } from "expo-font";
import CLOUD_LOADER from "../../assets/cloud-loader.json";
import SYNC_BACKGROUND from "../../assets/resources/review_background.jpg";
import SYNC_ANIMATION from "../../assets/sync-data.json";
import SUCCESS_ANIMATION from "../../assets/success.json";
import FAILED_ANIMATION from "../../assets/failed.json";
import SYNC_FAILED from "../../assets/resources/sync-failed.png";
import SYNC_SUCCESS from "../../assets/resources/sync-success.png";
import LoaderModal from "./LoaderModal";
import { DataContext } from "../context/DataProvider";
import theme from "../theme/theme";
import { subidaBaseRemoteTodaAuditoria } from "../services/SubidaBaseRemota";
import { GlobalContext } from "../context/GlobalContext";
import { ModernaContext } from "../context/ModernaProvider";

export const ItemBranch_Review = ({ branch, setRefresh, refresh }) => {
  const { setDatosCompartidos, datosCompartidos } = useContext(DataContext);
  const [animation, setAnimation] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isConnected } = useContext(ModernaContext);
  const [stateBranch, setStateBranch] = useState(branch.state);
  const {
    globalVariable,
    setGlobalVariable,
    showModal,
    setShowModal,
    setModalTitle,
    setModalText,
  } = useContext(GlobalContext);

  const navigation = useNavigation();

  useEffect(() => {
    //console.log("ESTO LLEGA DE LAS AUDITORIAS: ", branch);
    //console.log("ESTADO GLOBAL DE LA VARIABLE: ", globalVariable);
  }, []);
  const syncData = async (setRefresh, refresh) => {
    setIsModalVisible(true);
    try {
      await subidaBaseRemoteTodaAuditoria(
        branch.id_auditoria,
        setIsModalVisible,
        setRefresh,
        refresh
      );
    } catch (e) {
      //console.log("ERROR: ", e);
      setShowModal(!showModal);
      setModalTitle("Pérdida de conexión");
      setModalText(
        "La sincronización de los datos ha fallado debido a una desconexión a internet. Por favor, vuelve a intentarlo cuando tengas una conexión estable."
      );
      /*Alert.alert(
        "Pérdida de conexión",
        "La sincronización de los datos ha fallado debido a una desconexión a internet. Por favor, vuelve a intentarlo cuando tengas una conexión estable"
      );*/
      setIsModalVisible(false);
    }
  };
  const goToReview = (value) => {
    // //console.log("Ir a visitas");
    //console.log("DATOS VIAJANDO: - - -  - - - ", value);
    setDatosCompartidos(value);
    //console.log("datosCompartidos",value)
    if(value){
      navigation.navigate("review", { branch: value });

    }
  };

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <TouchableOpacity
      onPress={() => {
        goToReview(branch);
      }}
      activeOpacity={0.85}
      bottomDivider
      style={{ margin: 0.5 }}
    >
      <LoaderModal
        animation={CLOUD_LOADER}
        visible={isModalVisible}
        warning={"Sincronizando auditoría seleccionada, por favor espere..."}
      />
      <View
        style={{
          flex: 1,
          //backgroundColor: "red",
          borderRadius: 5,
          marginVertical: 5,
          //height: 50,
          borderWidth: 2,
          borderRadius: 10,
          overflow: "hidden",
          borderColor: theme.colors.lightgray,
          //width: "10%",
          paddingHorizontal: 10,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Metropolis",
              fontSize: 14,
              //flex: 1,
              //textAlign: "justify",
              //backgroundColor: "red",
            }}
          >
            {branch.id_cliente}-{branch.nombre_cliente}-{branch.nombre_sucursal}
          </Text>
          <Text style={{ margin: 5, fontSize: 12 }}>
            {branch.fecha_creacion
              .replace(/-/g, "/")
              .replace("T", " ")
              .replace(".000Z", "")}
          </Text>
        </View>
        {branch.sincronizada == 0 ? (
          <TouchableOpacity
            disabled={globalVariable}
            onPress={() => syncData(setRefresh, refresh)}
          >
            <Image
              source={SYNC_FAILED}
              style={{ width: 30, height: 30, resizeMode: "stretch" }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={true}>
            <Image
              source={SYNC_SUCCESS}
              style={{ width: 30, height: 30, resizeMode: "stretch" }}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};
