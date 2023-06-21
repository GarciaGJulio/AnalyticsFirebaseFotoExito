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
  newstyle,
  ...restOfProps
}) => {
  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <TouchableOpacity
      style={[styles.container, { width: size, backgroundColor: buttonColor }]}
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
          justifyContent: "space-around",
          width: '100%',
          // height: size * 3 / 10,
          
         
          //backgroundColor:'blue'
        }}
      >
        
          {iconName && iconType ? (
            <View
            style={{
              flex: 1,
              //marginLeft:4,
              marginRight:5,
              alignItems:'flex-end',
              //backgroundColor: "black",
             
            }}
          >
            <Icon
              name={iconName}
              type={iconType}
              color={"white"}
              style={{
           
                
                //backgroundColor: "green"
              }}
            />
        </View>

          ) : (
            <></>
          )}
        <View
          style={newstyle?{
            //backgroundColor: "orange",
            flex:2,
            // justifyContent:'center',
           // alignItems:'center'
           
            //paddingHorizontal: 3
          }:{
            //backgroundColor: "blue",
            flex:3,
            // justifyContent:'center',
            alignItems:'center'
            // paddingHorizontal:
            // padding: 2
          }
        }
        >
          <Text style={styles.buttonText}>{title}</Text>
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
  buttonText: {
    //flex: 1,
    color: "white",
    //backgroundColor: "blue",
    fontSize: 16,
    // textAlign:'center',
    //left: 5,
    fontFamily: "Metropolis",
    fontWeight: "600",
    //paddingRight: 20
    
  },
});
