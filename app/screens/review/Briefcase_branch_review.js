import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModernaHeader from '../../components/ModernaHeader'
import ReviewBanner from '../../components/ReviewBanner'
import theme from '../../theme/theme'
import ScreenInformation from '../../components/ScreenInformation';
import ItemsList from '../../components/ItemsList'

const Briefcase_branch_review = ({ route }) => {
    // const { branch } = route.params;
    // console.log("En Brief ", branch);
    return (
        <View style={styles.container}>
            <ModernaHeader />
            <View style={{ width: theme.dimensions.maxWidth, marginTop: theme.dimensions.maxHeight / 10 }}>
                <ReviewBanner />
                <ScreenInformation title={'Cliente - Sucursal'} text={'A continuación se enlistan los datos registrados'} />
            </View>
            <ItemsList text={'Portafolio Ideal'} />
        </View>
    )
}

export default Briefcase_branch_review;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
})