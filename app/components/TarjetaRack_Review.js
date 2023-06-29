import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import theme from "../theme/theme";
import { useFonts } from "expo-font";
import { Rack_View } from "./Rack_View";

export const TarjetaRack_Review = ({ data }) => {
  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <View View style={styles.container}>
      <Text
        style={{
          fontWeight: theme.fontWeight.softbold,
          fontSize: theme.fontSize.subtitle,
          fontFamily: "Metropolis",
        }}
      >
        PERCHAS
      </Text>
      <View style={{ flex: 1, width: "100%", marginVertical: 5 }}>
        {data.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontFamily: "Metropolis", fontSize: 14 }}>
              Esta auditoría no registró perchas
            </Text>
          </View>
        ) : (
          <FlashList
            data={data}
            renderItem={({ item }) => <Rack_View rack={item} />}
            estimatedItemSize={10}
            showsVerticalScrollIndicator={true}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    marginVertical: 10,
    alignItems: "center",
    //paddingHorizontal:100,
    //backgroundColor:'red',
    //marginHorizontal:10,
  },
});
