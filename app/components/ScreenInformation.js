import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "@rneui/base";
import theme from "../theme/theme";
import { useFonts } from "expo-font";

const ScreenInformation = ({ title, text }) => {
  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View
      style={{
        width: theme.dimensions.maxWidth / 1.1,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        //marginVertical: 20,
        //marginBottom: 5,
        //marginTop:10
        //backgroundColor: "red",
        // height: theme.dimensions.maxHeight
      }}
    >
      <View>
        <View
          style={{
            //flex: 0.3,
            height: 30,
            width: theme.dimensions.maxWidth / 1.1,
            justifyContent: "center",
            alignItems: "center",
            //backgroundColor: "yellow",
          }}
        >
          <Text
            style={{
              fontSize: theme.fontSize.title,
              fontWeight: "600",
              fontFamily: "Metropolis",
              textAlign: "justify",
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={
            {
              //width: theme.dimensions.maxWidth / 1.1,
              //marginVertical: 5,
              // backgroundColor: "orange",
              //flex: 0.1,
            }
          }
        >
          <Divider
            width={2}
            color={"#D9D9D9"}
            //style={{ backgroundColor: "blue" }}
          />
        </View>
        {text ? (
          <View
            style={{
              //backgroundColor: "blue",
              //marginHorizontal: 0.9,
              height: 50,
              width: theme.dimensions.maxWidth / 1.1,
              //flex: 0.5,
              //marginVertical: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSize.body,
                width: theme.dimensions.maxWidth / 1.1,
                //width: "90%",
                height: "100%",
                //backgroundColor: "purple",
                //justifyContent: "center",
                //alignItems: "center",
                //textAlign: "justify",
                flex: 1,
                fontFamily: "Metropolis",
              }}
            >
              {text.toString()}
            </Text>
          </View>
        ) : (
          <Text style={{ marginVertical: 1 }}></Text>
        )}
        <View
          style={{
            //flex: 1,
            height: 20,
            flexDirection: "row",
            //backgroundColor: "brown",
            justifyContent: "center",
            alignItems: "center",
            //bottom: 5,
          }}
        >
          <View style={{ flex: 0 }}>
            <Text
              style={{
                color: "red",
                textAlign: "left",
              }}
            >
              *
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "left",
                fontFamily: "Metropolis",
                color: "black",
                fontSize: theme.fontSize.body,
              }}
            >
              Campos obligatorios
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ScreenInformation;

const styles = StyleSheet.create({});
