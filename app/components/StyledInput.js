import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme/theme';
//import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
//import { useFonts } from '@expo-google-fonts/dev';
//import { colors } from '../const/CONST';

const StyledInput = ({label,onChangeText,maxLength,keyboard,editable,value = () => {},...props}) => {
    const [isFocused, setIsFocused] = React.useState(false);
  
    return (
      <View style={{marginBottom: 10,width:theme.dimensions.maxWidth/1.1}}>
        <Text style={style.label}>{label}</Text>
        <View
          style={[
            style.inputContainer,
            {
              borderColor: "#E2E2E2",
              borderRadius:5,
              alignItems: 'center',
              borderWidth: 1
              ? 2 : 0,
            },
          ]}>
          <TextInput
            autoCorrect={false}
            onFocus={() => {
              //onFocus();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            maxLength={maxLength}
            style={{flex: 1}}
            {...props}
            onChangeText={onChangeText} 
            keyboardType={keyboard}
            editable={editable}
            value={value}
          />
        </View>
          <Text style={{marginTop: 7, fontSize: 12}}>
            Solo puede registrar una sucursal por día
          </Text>
      </View>
      );
   };

export default StyledInput

const style = StyleSheet.create({
    label: {
      marginVertical: 2,
      fontSize: 14,
      color: "#33576f",
      //fontWeight:'bold',
      //fontFamily: 'Poppins_500Medium'
    },
    inputContainer: {
      height: 55,
      backgroundColor: 'white',
      flexDirection: 'row',
      paddingHorizontal: 15,
      borderWidth: 0.5,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.50,
      shadowRadius: 4,
      elevation: 2,
    },
  });