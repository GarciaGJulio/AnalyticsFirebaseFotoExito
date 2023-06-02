import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import theme from "../theme/theme";
import REVIEW from "../../assets/resources/review_background.jpg";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const ReviewBanner = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.container}
      source={REVIEW}
      resizeMode="cover"
      imageStyle={{ opacity: 0.7 }}
    >
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="arrow-left-top"
          type="material-community"
          size={30}
          color={"white"}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ReviewBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: theme.colors.lightgray,
    //height:200,
    width: "100%",
    alignContent: "center",
    //backgroundColor: "red",
    shadowColor: "#000",
    //marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 2,
  },
  header: {
    backgroundColor: theme.colors.modernaYellow,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    justifyContent: "center",
    alignItems: "flex-start",
    //left:10,
    paddingVertical: 5,
  },
  categoryContainer: {
    //backgroundColor: "orange",
    flexDirection: "row",
    flex: 1,
  },
  category: {
    // backgroundColor: "purple",
    flex: 1,
    padding: 10,
    paddingBottom: 1,
  },
  input: {
    fontWeight: theme.fontWeight.normal,
    textAlign: "center",
  },
  imageContainer: {
    //backgroundColor: "yellow",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
