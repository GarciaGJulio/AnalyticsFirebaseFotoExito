import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import theme from "../theme/theme";
import { Image } from "react-native";
import HARINA from ".././../assets/resources/harina.png";
import TakeImage from "./TakeImage";
import PromosItemsDetails_Review from "./PromosItemsDetails_Review";

const ProductsDetails_Review = ({ productName, productPrice }) => {
  const prod = [
    {
      img0: "https://media.istockphoto.com/id/861019856/es/foto/harina-de-grano-entero-en-una-madera-o%C3%ADdos-bagwith-de-taz%C3%B3n-de-fuente-y-cilicio.jpg?s=612x612&w=is&k=20&c=dp3XuGZqt_KA_wZMt-VlnFl8-bD5WH-NLLuaXTvjSL0=",
      img1: "https://media.istockphoto.com/id/484679158/es/foto/harina-en-una-bolsa-en-la-mesa-y-spikelets.jpg?s=612x612&w=is&k=20&c=UtdmDnMAKjpEyLnaRuLYZsiqFMpBFDXRbL4qOxNODSA=",
      img2: "https://media.istockphoto.com/id/1393397328/es/foto/primer-plano-de-harina-integral-huevos-y-pan-redondo-reci%C3%A9n-horneado-pan-casero-con-una-ramita.jpg?s=612x612&w=is&k=20&c=S1GN72PpY5I6qqMU0QWBKiZHCLrGrnHspCso_4aqJxw=",
    },
  ];
  return (
    <View style={[styles.container]}>
      <View style={[styles.primaryContainer, { marginLeft: 20 }]}>
        <Image source={HARINA} style={{ width: 100, height: 100 }} />
        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 13 }}>{productName}</Text>
          <Text style={{ marginHorizontal: 10, marginTop: 5, fontSize: 11 }}>
            Precio disponible
          </Text>
          <Text style={{ fontSize: 14, marginLeft: 10, marginTop: 10 }}>
            ${productPrice}
          </Text>
        </View>
      </View>
      <View style={styles.secondaryContainer}>
        <View style={{ padding: 10 }}>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Foto del precio del producto respectivo
            </Text>
            {/* <Text style={{ fontSize: 13, marginTop: 10 }}>Proporcione una foto del producto respectivo</Text> */}
            {/*<PromosItemsDetails_Review exhibitor={prod} />*/}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductsDetails_Review;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginVertical: 8,
    borderWidth: 2,
    backgroundColor: theme.colors.lightgray,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  descriptionContainer: {
    marginLeft: 5,
    flex: 1,
    padding: 10,
  },
  primaryContainer: {
    flexDirection: "row",
    width: "90%",
    marginTop: 10,
  },
  secondaryContainer: {
    width: "80%",
  },
});
