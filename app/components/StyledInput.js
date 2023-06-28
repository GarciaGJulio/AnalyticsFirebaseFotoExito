import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../theme/theme";
import { useFonts } from "expo-font";
//import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
//import { useFonts } from '@expo-google-fonts/dev';
//import { colors } from '../const/CONST';

const StyledInput = ({
  label,
  onChangeText,
  maxLength,
  keyboard,
  editable,
  width,
  error,
  information,
  value,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View style={{ marginBottom: 1, width: width, flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={{ color: "red", textAlign: "left" }}>*</Text>
        </View>
        <View>
          <Text style={{ fontSize: 13.5, fontFamily: "Metropolis" }}>
            {label}
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            style.inputContainer,
            {
              borderColor: error
                ? theme.colors.modernaRed
                : isFocused
                ? theme.colors.inputcolor
                : theme.colors.lightgray,
              borderRadius: 5,
              alignItems: "center",
              borderWidth: 1 ? 2 : 0,
              height: 50,
            },
          ]}
        >
          <TextInput
            autoCorrect={false}
            onFocus={() => {
              //onFocus();
              setIsFocused(true);
            }}
            autoCapitalize="characters"
            onBlur={() => setIsFocused(false)}
            maxLength={maxLength}
            style={{
              flex: 1,
              //height: 50,
              //backgroundColor: "blue"
              fontSize: 13,
              fontFamily: "Metropolis",
            }}
            {...props}
            onChangeText={onChangeText}
            keyboardType={keyboard}
            editable={editable}
            value={value}
          />
        </View>
      </TouchableWithoutFeedback>

      {error && (
        <Text
          style={{
            marginTop: 2,
            color: theme.colors.modernaRed,
            fontSize: theme.fontSize.error,
            fontFamily: "Metropolis",
            fontWeight: "600",
            textAlign: "justify",
          }}
        >
          {error}
        </Text>
      )}
      <Text
        style={{
          marginTop: 7,
          fontSize: theme.fontSize.details,
          fontFamily: "Metropolis",
          fontWeight: "600",
          textAlign: "justify",
        }}
      >
        {information}
      </Text>
    </View>
  );
};

export default StyledInput;

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 12,
    //color: "#33576f",
    fontWeight: "600",
    fontFamily: "Metropolis",
  },
  inputContainer: {
    //height: 80,
    //flex:1,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
});
