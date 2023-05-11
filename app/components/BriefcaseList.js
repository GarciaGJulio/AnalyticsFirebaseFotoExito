import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import theme from '../theme/theme'
import { FlashList } from '@shopify/flash-list'
import { CheckBox } from '@rneui/base';

const DATA = [
    {
      name: "Harina Ya",
      id:'ID001',
    },
    {
      name: "Harina Ya sin polvo de hornear",
      id:'ID001',
    },
    {
      name: "Harina Ya con",
      id:'ID001',
    },
    {
      name: "Harinas Ya",
      id:'ID001',
    },
    {
      name: "Harina Ya con",
      id:'ID001',
    },
    {
      name: "Harinas Ya",
      id:'ID001',
    },
  ];

const RenderItem = ({name,id}) => {
    const [check1, setCheck1] = useState(false);

    return(
        <View >
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <CheckBox
                    checked={check1}
                    onPress={() => setCheck1(!check1)}
                    // Use ThemeProvider to make change for all checkbox
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor={theme.colors.modernaRed}
                    containerStyle={{backgroundColor:'transparent'}}
                />
                <Text>{name}-{id}</Text>
            </View>
        </View>
    )
}

const BriefcaseList = ({productList}) => {
  return (
    <View style={{flex:1, margin:10,borderWidth:1, borderRadius:20,overflow: 'hidden' }}>
      <Text style={{fontWeight:theme.fontWeight.bolder,fontSize:theme.fontSize.subtitle, paddingLeft:15,backgroundColor:theme.colors.modernaYellow,height:30,justifyContent: 'center',borderWidth:0.5,color:theme.colors.white}}>{productList}</Text>
      <FlashList
        data={DATA}
        renderItem={({ item }) => <RenderItem name={item.name} id={item.id}/>}
        estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default BriefcaseList

const styles = StyleSheet.create({
    
})