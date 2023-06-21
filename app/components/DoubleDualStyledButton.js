import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledButton from "./StyledButton";
import theme from "../theme/theme";

const DoubleDualStyledButton = ({
  titleLeft,
  colorLeft,
  iconLeft,
  typeLeft,
  sizeLeft,
  onPressLeft,
  titleRigth,
  colorRigth,
  iconRigth,
  typeRigth,
  sizeRigth,
  onPressRigth,
  titleRigthSecond,
  colorRigthSecond,
  iconRigthSecond,
  typeRigthSecond,
  sizeRigthSecond,
  onPressRigthSecond,
  showButton1,
  showButton2,
}) => {
  return (
    <View style={styles.containerButtons}>
      <StyledButton
        title={titleLeft}
        buttonColor={colorLeft}
        iconName={iconLeft}
        iconType={typeLeft}
        size={sizeLeft}
        onPress={onPressLeft}
        
      />
      {showButton1 && (
        <StyledButton
          title={titleRigth}
          buttonColor={colorRigth}
          iconName={iconRigth}
          iconType={typeRigth}
          size={sizeRigth}
          onPress={onPressRigth}
       
        />
      )}
      {showButton2 && (
        <StyledButton
          title={titleRigthSecond}
          buttonColor={colorRigthSecond}
          iconName={iconRigthSecond}
          iconType={typeRigthSecond}
          size={sizeRigthSecond}
          onPress={onPressRigthSecond}
        
        />
      )}
    </View>
  );
};

export default DoubleDualStyledButton;

const styles = StyleSheet.create({
  containerButtons: {
    flexDirection: "row",
    //width:theme.dimensions.maxWidth,
    padding: 3,
    justifyContent: "space-evenly",
    //marginVertical:10,
    //padding:5,
    //backgroundColor:'blue',
    flex: 1,
  },
});
