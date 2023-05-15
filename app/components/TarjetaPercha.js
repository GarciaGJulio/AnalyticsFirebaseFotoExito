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
import { useState } from "react";
import theme from "../theme/theme";
import { CheckBox } from "@rneui/base";
import TakeImage from "./TakeImage";
import ConfirmationModal from "./ConfirmationModal";
import RackCheckbox from "./RackCheckbox";
import Rack_View from "./Rack_View";

export const TarjPercha = ({ view }) => {

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

  return (
    <View View style={styles.container} >
      <Text style={{ fontWeight: theme.fontWeight.bolder, fontSize: theme.fontSize.subtitle }}>PERCHAS</Text>
      {
        (view == "review") ? (
          <View style={{ flex: 1, width: '100%', marginVertical: 5 }}>
            <FlashList
              data={DATA}
              renderItem={({ item }) => <Rack_View categoryName={item.name} />}
              estimatedItemSize={10}
              showsVerticalScrollIndicator={false} />
          </View>
        ) : (
          <View style={{ flex: 1, width: '100%' }}>
            <FlashList
              data={DATA}
              renderItem={({ item }) =>
                <RackCheckbox
                  categoryName={item.name}
                />}
              estimatedItemSize={10}
              showsVerticalScrollIndicator={false} />
          </View>
        )
      }
    </View >
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    marginVertical: 10,
    alignItems: 'center',
    //paddingHorizontal:100,
    //backgroundColor:'red',
    //marginHorizontal:10,

  },
});


export default TarjPercha;