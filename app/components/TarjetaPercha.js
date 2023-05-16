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

export const TarjPercha = (props) => {
  const [objPercha, setObjPercha] = useState({})

  const DATA = [
    {
      name: "Pan",
    },
    {
      name: "Harina",
    },
    {
      name: "Avena",
    },
    {
      name: "Arroz",
    },
  ];
  useEffect(() => {
    props.onchangeData(DATA)
    console.log("OBJETO PERCHA",objPercha)
  }, [objPercha]);
  

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: theme.fontWeight.bolder, fontSize: theme.fontSize.subtitle }}>PERCHAS</Text>
      <View style={{ flex: 1, width: '100%' }}>
        <FlashList
          data={DATA}
          renderItem={({ item }) =>
            <RackCheckbox
              categoryName={item.name}
              onchangeObjPercha={setObjPercha}
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