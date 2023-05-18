import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ImageBackgroundComponent,
  Image,

} from "react-native";
import { themes } from "../themes/themes";
import { Icon, Input } from '@rneui/themed';
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import theme from "../theme/theme";
import { CheckBox } from "@rneui/base";
import TakeImage from "./TakeImage";
import ConfirmationModal from "./ConfirmationModal";
import RackCheckbox from "./RackCheckbox";
import Rack_View from "./Rack_View";

export const TarjPercha = (props) => {
  const [objPercha, setObjPercha] = useState({})
  const [datos, setDatos] = useState([]);
  let DATA = [
    {
      name: "Pan",
      CarasGeneral:0,
      CarasModerna:0,
      Estado:null,
        },
    {
      name: "Harina",
      CarasGeneral:0,
      CarasModerna:0,
      Estado:null,
    },
    {
      name: "Avena",
      CarasGeneral:0,
      CarasModerna:0,
      Estado:null,
    },
    {
      name: "Arroz",
      CarasGeneral:0,
      CarasModerna:0,
    },
  ];
  useEffect(() => {
    props.onchangeData(DATA)
    console.log("OBJETO PERCHA", objPercha)
  }, [objPercha]);
  useEffect(() => {
  //  console.log("ObjetoCompleto:",datos)
  //  console.log("ObjetoCompletoFueraaaaaaaaaaaa:",DATA)

  }, [DATA]);

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: theme.fontWeight.bolder, fontSize: theme.fontSize.subtitle }}>PERCHAS</Text>
      <View style={{ flex: 1, width: '100%' }}>
        <FlashList
          data={DATA}
          // onEndReached={({ index }) => {
          //   const itemDatos = DATA[index]; 
          //   setDatos(prevDatos => [...prevDatos, itemDatos]); // Agrega los datos al arreglo
          // }}
          renderItem={({ item }) =>
            <RackCheckbox
              categoryName={item.name}
              onchangeObjPercha={setObjPercha}
              itemCom={item}
            />}
          estimatedItemSize={10}
          showsVerticalScrollIndicator={false} />
      </View>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    //paddingHorizontal:100,
    //backgroundColor:'red',
    //marginHorizontal:10,

  },
});


export default TarjPercha;
