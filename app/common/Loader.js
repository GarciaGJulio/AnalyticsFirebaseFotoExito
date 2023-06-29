import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <View style={{ borderRadius: 10 }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
});
