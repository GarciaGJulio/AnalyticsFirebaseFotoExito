import React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import theme from '../theme/theme';

export const FlexContainer = ({ children }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ width: theme.dimensions.maxWidth }} showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: "center", justifyContent: 'center', flex: 1, }}>
                        {children}
                    </View>
            </ScrollView>
        </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'yellow'
    },
});