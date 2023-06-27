import { Button, Icon } from "@rneui/base";
import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import theme from "../theme/theme";
import { useFonts } from "expo-font";

export const StyledButton = ({
  title,
  onPress,
  buttonColor,
  iconName,
  iconType,
  size,
  disabled,
  newstyle,
  icon,
  iconLetter,
  ...restOfProps
}) => {
  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: size,
          backgroundColor: buttonColor,
          opacity: disabled ? 0.5 : 100,
        },
      ]}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      {...restOfProps}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "space-around",
          // paddingHorizontal:20
          // height: size * 3 / 10,
          flex: 1,
          // paddingLeft: "5%",
          // paddingRight: title === "Sincronizar Datos" ? "0%" : "3%",
          //backgroundColor:'blue'
        }}
      >
        {icon ? (
          <View
            style={
              iconLetter
                ? styles.centerIL
                : // backgroundColor: "blue",
                  // flex: 0.3,
                  styles.normalB
            }
          >
            {iconName && iconType ? (
              <Icon
                name={iconName}
                type={iconType}
                color={"white"}
                style={{
                  //flex: 0.3,
                  marginHorizontal: 1,
                  //backgroundColor: "green"
                }}
              />
            ) : (
              <></>
            )}
          </View>
        ) : (
          <></>
        )}

        <View
          style={
            newstyle
              ? styles.butonCentrado
              : iconLetter
              ? styles.centerLetterIl
              : styles.butonormal
          }
        >
          <Text
            style={{
              //flex: 1,
              color: "white",
              //backgroundColor: "blue",
              fontSize: title === "Sincronizar Datos" ? 15 : 16,
              textAlign: "left",
              //left: 5,
              fontFamily: "Metropolis",
              fontWeight: "600",
              // paddingRight: 1
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StyledButton;

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

  normalB: {
    flex: 0.5,
  },

  centerIL: {
    // backgroundColor: "black",
    flex: 1,
    // justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  centerLetterIl: {
    alignItems: "flex-start",
    flex: 1.5,
    // backgroundColor: "gray",
  },
  butonCentrado: {
    // backgroundColor: "green",
    alignItems: "center",
    flex: 1,
    // width: "100%",
  },
  butonormal: {
    flex: 1,
    // backgroundColor: "green",
    // textAlign: "center",
    // flex:2
  },
});
