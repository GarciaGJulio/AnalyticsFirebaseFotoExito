import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StyledButton from './StyledButton'
import theme from '../theme/theme'
import StyledDualButton from './StyledDualButton'

const DoubleDualStyledButton = ({
    titleLeft,
    colorLeft,
    iconLeft,
    typeLeft,
    sizeLeft,
    onPressLeft,
    //titleRigth,
    initialIconName,
    updateIconName,
    initialIconType,
    updatelIconType,
    initialText, 
    initialFunction, 
    updatedText, 
    updatedFunction,
    colorRigth,
    validatePass,
    //iconRigth,
    //typeRigth,
    sizeRigth,
    //onPressRigth,
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
        <StyledDualButton 
            initialText={initialText} 
            updatedText={updatedText}
            buttonColor={colorRigth} 
            initialIconName={initialIconName}
            updateIconName={updateIconName}
            initialIconType={initialIconType}
            updatelIconType={updatelIconType}
            initialFunction={initialFunction}
            updatedFunction={updatedFunction}
            validatePass={validatePass}
            size={sizeRigth}
        />
    </View>
  )
}

export default DoubleDualStyledButton

const styles = StyleSheet.create({
    containerButtons:{
        flexDirection:'row',
        //width:theme.dimensions.maxWidth,
        padding:3,
        justifyContent:'space-evenly',
        //marginVertical:10,
        //padding:5,
        //backgroundColor:'blue',
        flex:1,
    }
})