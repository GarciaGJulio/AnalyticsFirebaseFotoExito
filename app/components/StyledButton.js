import { Button, Icon } from "@rneui/base";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import theme from "../theme/theme";

export default function ({
  title,
  onPress,
  buttonColor,
  iconName,
  iconType,
  size,
  ...restOfProps
}) {
  return (
    <TouchableOpacity
      style={[styles.container, { width: (size), backgroundColor: (buttonColor) }]}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      {...restOfProps}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: (size), flex: 1, paddingHorizontal: 20 }}>
        <Text style={styles.buttonText}>{title}</Text>
        <Icon name={iconName} type={iconType} color={'white'} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    padding: 10,
  },
  buttonText: {
    flex: 1,
    color: 'white',
    //backgroundColor:'blue',
    fontSize: 19,
    fontFamily: 'Roboto',
    fontWeight: theme.fontWeight.bold
  }
});
