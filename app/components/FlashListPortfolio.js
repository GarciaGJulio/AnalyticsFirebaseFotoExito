import React,{useState} from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import theme from "../theme/theme";
import { CheckBox } from "@rneui/base";

const DATA = [
  {
    id: 1,
    title: 'Categoría 1',
    productos: [
      { id: 1, nombre: 'Producto 1' },
      { id: 2, nombre: 'Producto 2' },
      { id: 3, nombre: 'Producto 3' }
    ]
  },
  {
    id: 2,
    title: 'Categoría 2',
    productos: [
      { id: 4, nombre: 'Producto 4' },
      { id: 5, nombre: 'Producto 5' },
      { id: 6, nombre: 'Producto 6' }
    ]
  },
  {
    id: 3,
    title: 'Categoría 2',
    productos: [
      { id: 4, nombre: 'Producto 7' },
      { id: 5, nombre: 'Producto 8' },
      { id: 6, nombre: 'Producto 9' }
    ]
  },
];

const RenderItem = ({item,setIdealPortfolioProducts,idealPortfolioProducts}) => {
  return(
<View style={{flex:1, margin:10,borderWidth:1, borderRadius:20,overflow: 'hidden' }}>
  <Text style={{fontWeight:theme.fontWeight.bolder,fontSize:theme.fontSize.subtitle, paddingLeft:15,backgroundColor:theme.colors.modernaYellow,height:30,justifyContent: 'center',borderWidth:0.5,color:theme.colors.white}}>{item.title}</Text>
  <FlashList
    data={item.productos}
    renderItem={({ item }) => <RenderItemProd name={item.nombre} id={item.id} setIdealPortfolioProducts={setIdealPortfolioProducts} idealPortfolioProducts={idealPortfolioProducts}/>}
    estimatedItemSize={4}
    showsVerticalScrollIndicator={false}
/>
</View>
  )
}

const RenderItemProd = ({name,id,setIdealPortfolioProducts,idealPortfolioProducts}) => {
  const [check1, setCheck1] = useState(false);

  const validate = (check1,name,id) => {
    if(check1){
      console.log("REGISTRANDO NUEVO PRODUCTO . . . . ")
      let newRegister = {name:name,id:id}
      //setIdealPortfolioProducts({...idealPortfolioProducts,...newRegister});
      idealPortfolioProducts.push(newRegister)
    }else{
      idealPortfolioProducts.forEach((element, index) => {
        if (element.id === id) {
          console.log("ELIMINANDO PRODUCTO . . . . ")
          idealPortfolioProducts.splice(index, 1);
        }
      });    }
  }

  return(
      <View >
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <CheckBox
                  checked={check1}
                  onPress={() => {
                    setCheck1(!check1)
                    validate(!check1,name,id)
                    }
                  }
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

const FlashListPortfolio = ({setIdealPortfolioProducts,idealPortfolioProducts}) => {
  return (
    <View style={{ flex:1, width:'95%',marginBottom:10}}>
      <FlashList
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderItem item={item} setIdealPortfolioProducts={setIdealPortfolioProducts} idealPortfolioProducts={idealPortfolioProducts}/>}
        estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
      />
    </View>

  );
};

export default FlashListPortfolio;