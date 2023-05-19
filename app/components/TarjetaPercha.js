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

export const TarjPercha = ({data,setData}) => {
  const [objPercha, setObjPercha] = useState({})
  const [datos, setDatos] = useState([]);
  /*let DATA = [
    {
      name: "Pan",
      carasGeneral:0,
      carasModerna:0,
      state:null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
        },
    {
      name: "Harina",
      carasGeneral:0,
      carasModerna:0,
      state:null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    },
    {
      name: "Avena",
      carasGeneral:0,
      carasModerna:0,
      state:null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    },
    {
      name: "Arroz",
      carasGeneral:0,
      carasModerna:0,
      state:null,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    },
  ];*/

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: '100%' }}>
        <FlashList
          data={data}
          // onEndReached={({ index }) => {
          //   const itemDatos = DATA[index]; 
          //   setDatos(prevDatos => [...prevDatos, itemDatos]); // Agrega los datos al arreglo
          // }}
          renderItem={({ item }) =>
            <RackCheckbox
              categoryName={item.name}
              //onchangeObjPercha={setObjPercha}
              item={item}
              setData={setData}
            />}
          //estimatedItemSize={10}
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
