import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import theme from "../../theme/theme";
import Logotipo from "../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png";
import StyledButton from "../../components/StyledButton";
import * as Animatable from "react-native-animatable";
import ModernaContext from "../../context/ModernaContext";
import TarjPercha from "../../components/TarjetaPercha";
import TarjPromo from "../../components/TarjetaPromo";
import { RecuperarToken } from "../../services/onedrive";
import LOG_ING from "../../../assets/login.json";
import LoaderModal from "../../components/LoaderModal";
import { getCurrentScreenInformation, saveCurrentScreenUser } from "../../utils/Utils";

export const Login = ({ navigation }) => {
  const { handleLoginAzure, handleLoading } = useContext(ModernaContext);
  const [isLoading, setIsLoading] = useState(false);
  const log = async () => {
    // console.log("DISPARANDO LOGIN DE AD");
    // saveCurrentScreenUser({
    //   screenName: `home`,
    //   tableName: `cliente`,
    //   itemId: `123456789`

    // })
    // return
    // const result = await getCurrentScreenInformation("2")
    // console.log("result", result)
    login();
    RecuperarToken();
    //navigation.navigate('menu')
  };

  const funcionQA = (user) => {
    navigation.navigate("menu");
    setIsLoading(false);
  };

  const login = async () => {
    setIsLoading(true);
    try {
      // handleCanSelectEnvironment(funcionQA, functionProduction)
      //handleLoading(true);
      handleLoginAzure(funcionQA, setIsLoading);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      handleLoading(false);
    }
  };
  const [valueGeneral, setValueGeneral] = useState();
  const [valueModerna, setValueModerna] = useState();
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle={"dark-content"} />
      <LoaderModal
        animation={LOG_ING}
        visible={isLoading}
        warning={"Validando datos, por favor espere . . "}
      />
      <Animatable.View animation={"fadeInDown"} style={styles.imageContainer}>
        <Image source={Logotipo} style={styles.image} />
      </Animatable.View>
      <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
        <View style={{ flex: 0.8, top: 3 }}>
          <StyledButton
            title={"Iniciar Sesión"}
            buttonColor={theme.colors.modernaRed}
            onPress={log}
            size={theme.buttonSize.df}
          />
        </View>
      </Animatable.View>
    </View>
  );
};

// export default Login;

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
    flex: 11,
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
    flex: 1,
    width: theme.dimensions.maxWidth,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    //padding:5,
    paddingVertical: 20,
    //paddingVertical: 20
  },
});
