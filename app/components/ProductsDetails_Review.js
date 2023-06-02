import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import theme from "../theme/theme";
import { Image } from "react-native";
import HARINA from ".././../assets/resources/harina.png";
import TakeImage from "./TakeImage";
import PromosItemsDetails_Review from "./PromosItemsDetails_Review";
import { Divider, Icon } from "@rneui/base";

export const ProductsDetails_Review = ({
  productName,
  productPrice,
  state,
}) => {
  const thumbPosition =
    state === true ? "60%" : state === false ? "10%" : "35%";
  const trackColor = state === null ? "#999999" : state ? "#00ff00" : "#ff0000";
  return (
    <View style={[styles.container]}>
      <View style={[styles.primaryContainer, { marginLeft: 20 }]}>
        <Image source={HARINA} style={{ width: 100, height: 100, margin: 5 }} />
        <View style={styles.descriptionContainer}>
          <View
            style={{
              flexDirection: "row",
              //backgroundColor: "orange",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontFamily: "Metropolis" }}>
                {productName}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{ marginTop: 5, fontSize: 12, fontFamily: "Metropolis" }}
              >
                Precio disponible
              </Text>
            </View>
            <View
              style={{
                //backgroundColor: "green",
                flex: 0.3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  flex: 1,
                  //backgroundColor: "green",
                }}
                onPress={() => {
                  //setOpenCamera(!openCamera);
                  //setModalVisible(true);
                }}
              >
                <Icon name="camera" type="evilicon" size={40} />
                {/* <Icon name='camerao' type='antdesign' size={32} /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={{ fontSize: 14, marginTop: 10 }}>
                ${productPrice}
              </Text>
            </View>
            <View>
              <View
                style={[
                  styles.switchContainer,
                  { backgroundColor: trackColor },
                ]}
              >
                <View
                  style={[styles.switchTrack, { backgroundColor: trackColor }]}
                />
                <View style={[styles.switchThumb, { left: thumbPosition }]} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //borderRadius: 20,
    margin: 1,
    //marginVertical: 10,
    //borderWidth: 2,
    backgroundColor: theme.colors.lightgray,
    alignItems: "center",
    justifyContent: "center",
    width: "99%",
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  descriptionContainer: {
    //marginLeft: 5,
    //backgroundColor: "orange",
    flex: 3,
    padding: 10,
  },
  primaryContainer: {
    flexDirection: "row",
    flex: 1,
    //backgroundColor: "blue",
    //backgroundColor:'blue',
    width: "100%",
  },
  secondaryContainer: {
    //backgroundColor: "brown",
    flex: 1,
    //height: 290,
    width: "100%",
  },
  switchContainer: {
    width: 60,
    height: 30,
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  switchTrack: {
    flex: 1,
    borderRadius: 15,
  },
  switchThumb: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
