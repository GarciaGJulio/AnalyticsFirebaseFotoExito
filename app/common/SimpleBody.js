import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { themes } from "../themes/themes";
import theme from "../theme/theme";

export const SimpleBody = ({ children, withoutBorders }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.simpleBody, {
                borderTopLeftRadius: withoutBorders ? 0 : 50,
                borderTopRightRadius: withoutBorders ? 0 : 50,
            }]}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,

    },
    simpleBody: {
        flex: 1,
        backgroundColor: 'white',
        //height:theme.dimensions.heigth

    },
});