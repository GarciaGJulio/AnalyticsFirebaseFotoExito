import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  ScrollView,
  View,
  KeyboardAvoidingView,
  FlatList,
  Alert,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ImageBackgroundComponent,
  Image,
} from "react-native";
import { themes } from "../themes/themes";
import { Icon, Input } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import theme from "../theme/theme";
import { CheckBox } from "@rneui/base";
import TakeImage from "./TakeImage";
import ConfirmationModal from "./ConfirmationModal";
import Rack_View from "./Rack_View";
import { RackCheckbox } from "./RackCheckbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const TarjPercha = ({
  isUserScreen,
  data,
  setData,
  rack,
  setErrorPerchaG,
  errorPerchaG,
  setErrorPerchaM,
  errorPerchaM,
  setValueGeneralValidate,
}) => {
  const [objPercha, setObjPercha] = useState({});
  const [datos, setDatos] = useState([]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        style={{ width: "100%" }}
      >
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <RackCheckbox
              categoryName={item.name}
              errorPerchaG={errorPerchaG}
              errorPerchaM={errorPerchaM}
              setValueGeneralValidate={setValueGeneralValidate}
              setErrorPerchaG={setErrorPerchaG}
              setErrorPerchaM={setErrorPerchaM}
              isUserScreen={isUserScreen}
              item={item}
              planograma={rack}
              setData={setData}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    //paddingHorizontal:100,
    //backgroundColor:'red',
    //marginHorizontal:10,
  },
});
