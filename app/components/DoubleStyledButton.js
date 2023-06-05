import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StyledButton from './StyledButton'
import theme from '../theme/theme'

const DoubleStyledButton = ({
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
            <StyledButton
                title={titleRigth}
                buttonColor={colorRigth}
                iconName={iconRigth}
                iconType={typeRigth}
                size={sizeRigth}
                onPress={onPressRigth}
            />
        </View>
    )
}

export default DoubleStyledButton

const styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
        //width:theme.dimensions.maxWidth,
        padding: 3,
        justifyContent: 'space-evenly',
        //marginVertical:10,
        //padding:5,
        //backgroundColor:'blue',
        flex: 1,
    }
})