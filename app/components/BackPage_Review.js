import { useNavigation } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import theme from "../theme/theme";

export const BackPage_Review = () => {
  const navigation = useNavigation();
  return (
    <FAB
      title=""
      placement="left"
      onPress={() => navigation.goBack()}
      icon={{
        name: "arrow-left-top",
        color: "white",
        type: "material-community",
      }}
      color={theme.colors.modernaYellow}
      style={styles.fab}
      size="small"

    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    //marginRight: theme.dimensions.maxWidth - 80,
    bottom: 105,
    left: -10,
    margin:10
  },
});
