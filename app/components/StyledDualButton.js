import { Button, Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import theme from "../theme/theme";
import { useFonts } from "expo-font";

export const StyledDualButton = ({
  //title,
  onPress,
  buttonColor,
  initialIconName,
  updateIconName,
  initialIconType,
  updatelIconType,
  size,
  initialText,
  initialFunction,
  updatedText,
  updatedFunction,
  validatePass,
  disableAction,
  ...restOfProps
}) => {
  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  const [buttonText, setButtonText] = useState(initialText);
  const [iconName, setIconName] = useState(initialIconName);
  const [iconType, setIconType] = useState(initialIconType);
  const [isExecuting, setIsExecuting] = useState(false);

  const [isInitialFunctionExecuted, setIsInitialFunctionExecuted] =
    useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handlePress = () => {
    if (isInitialFunctionExecuted && validatePass) {
      setIsInitialFunctionExecuted(true);
      setIsButtonDisabled(true);
      initialFunction().then(() => {
        setIsButtonDisabled(false);
      });
    } else {
      updatedFunction();
    }
  };

  if (!fontLoaded) return null;

  return (
    <TouchableOpacity
      style={[styles.container, { width: size, backgroundColor: buttonColor }]}
      onPress={() => {
        if (handlePress) {
          handlePress();
        }
      }}
      {...restOfProps}
      disabled={isButtonDisabled}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: size,
          flex: 1,
          paddingHorizontal: 10,
          //backgroundColor:'blue'
        }}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
        {iconName && iconType ? (
          <Icon name={iconName} type={iconType} color={"white"} />
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default StyledDualButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: 50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    //padding: 5,
  },
  buttonText: {
    //flex: 1,
    color: "white",
    //backgroundColor:'blue',
    fontSize: 20,
    fontFamily: "Metropolis",
    fontWeight: "600",
  },
});
