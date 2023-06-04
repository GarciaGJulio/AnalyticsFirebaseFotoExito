import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { PromosItemsDetails_Review } from "./PromosItemsDetails_Review";

export const PromosItems_Review = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <PromosItemsDetails_Review exhibitor={item} />
        )}
        estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
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
