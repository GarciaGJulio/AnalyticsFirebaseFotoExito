import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { PromosItemsDetails_Review } from "./PromosItemsDetails_Review";
import { useFonts } from "expo-font";

export const PromosItems_Review = ({ data }) => {
  useEffect(() => {
    //console.log("ESTO LLEGA DE PROMOCIONES: - - - - ", data);
  }, []);

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;
  return (
    <View style={styles.container}>
      {data.length == 0 ? (
        <View
          style={{
            flex: 1,
            //backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Metropolis", fontSize: 14 }}>
            Esta auditoría no registró promociones
          </Text>
        </View>
      ) : (
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <PromosItemsDetails_Review exhibitor={item} />
          )}
          estimatedItemSize={4}
          showsVerticalScrollIndicator={false}
        />
      )}
      <View style={{ flex: 0.2 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginBottom: 10,
  },
});
