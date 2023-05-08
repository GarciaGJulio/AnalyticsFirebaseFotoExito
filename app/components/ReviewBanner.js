import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import theme from '../theme/theme'
import REVIEW from '../../assets/resources/review_background.jpg'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

const ReviewBanner = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground style={styles.container} source={REVIEW} resizeMode='cover' imageStyle={{opacity:0.70}}>
        <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
            <Icon name='settings-backup-restore' type='material-icon' size={30} color={'white'}/>
        </TouchableOpacity>
    </ImageBackground>
  )
}

export default ReviewBanner

const styles = StyleSheet.create({
    container:{
        width:theme.dimensions.maxWidth,
        height:200,
        borderBottomStartRadius:90,
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        //borderWidth:1,
        overflow:'hidden',
        shadowColor: 'black',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15,
        padding: 10,
      },
      backContainer:{
        backgroundColor:theme.colors.modernaYellow,
        width:50,
        height:50, 
        justifyContent:'center',
        alignItems:'center', 
        borderRadius:25,
        right:160,
      }
})