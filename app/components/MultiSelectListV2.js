import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import theme from "../theme/theme";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { GlobalContext } from "../context/GlobalContext";

export const MultiSelectListV2 = ({
  setComplementaryPortfolioProducts,
  complementaryPortfolioProducts,
  idPortafolioComplementario,
  auxiliarArray,
  products,
  tipo,
  idPortafolio,
  isUserScreen,
  selectItemsId,
}) => {
  const [select, setSelected] = useState([]);
  const { hadSaveBriefCase } = useContext(GlobalContext);
  // const [selectItemsId, setSelectItemsId] = useState([]);
  const saveId = async () => {
    await AsyncStorage.setItem("id_portafolio_complementario", idPortafolio);
    await AsyncStorage.setItem("tipo_complementario", tipo);
  };
  useEffect(() => {
    if (isUserScreen) {
      setSelected(complementaryPortfolioProducts);
      //setSelectItemsId(complementaryPortfolioProducts.map((item) => { return item.id }))
    }
  }, []);

  useEffect(() => {
    //console.log("HA GUARDADO EN MULTISELECTED? -- --- ", hadSaveBriefCase);
  }, [hadSaveBriefCase]);

  /* const updateObject = (select) => {
    const newArray = auxiliarArray.filter((obj) => {
      //console.log("ARRAY A COMPARAR: ", obj);
      const concatenatedValue = `${obj.name}-${obj.id}`;
      return select.includes(concatenatedValue);
    });

    const newArrayWithInitial = newArray.map((obj) => {
      return {
        ...obj,
        id_portafolio_complementario: idPortafolioComplementario,
      };
    });

    setComplementaryPortfolioProducts([...newArrayWithInitial]);
    //console.log("ARRAY DE VALORES ENCONTRADOS: ", newArrayWithInitial);
  };*/

  useEffect(() => {
    //console.log("ESTO GUARDA SELECT: ", JSON.stringify(select));
    //updateObject(select);
    // //console.log(
    //   "ESTO ESTA RECOPILADO DE PRODUCTOS COMPLEMENTARIOS: ",
    //   complementaryPortfolioProducts
    // );
  }, [select]);

  const onSelectedItemsChange = (selectedItems) => {
    //console.log("PRODUCTOS SELECCIONADOS: ", selectedItems);
    const productosIngresados = [...selectedItems];
    // //console.log(
    //   "ESTO ES LA REFACTORIZACION DE SELECTITEMS PARA QUE SEAN ARRAY: ",
    //   productosIngresados
    // );

    const updatedProducts = productosIngresados
      .map((id) => {
        const existingProduct = products.find((objeto) =>
          objeto.children.some((child) => child.id === id)
        );

        if (existingProduct) {
          const {
            id: productId,
            name: productName,
            url: productImage,
          } = existingProduct.children.find((child) => child.id === id);

          return {
            id: productId,
            id_portafolio: idPortafolio,
            tipo_portafolio: tipo,
            name: productName.split("-")[1],
            url: productImage,
            price: 0.0,
            state: 0,
            images: {
              image1: null,
              image2: null,
              image3: null,
            },
          };
        } else {
          return null; // Opcional: si el ID no se encuentra, puedes retornar null o un valor por defecto
        }
      })
      .filter(Boolean); // Eliminar elementos nulos

    setComplementaryPortfolioProducts(updatedProducts); // Actualizar el estado con los productos actualizados

    //console.log("PRODUCTO DE FILTRO ENCONTRADO: - - - - - ", updatedProducts);
    /*setComplementaryPortfolioProducts((prevProducts) => [
      ...prevProducts,
      updatedProducts,
    ]);*/
    setSelected(selectedItems);
    //addProduct(selectedItems);
  };

  const [fontLoaded] = useFonts({
    Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
    // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
  });

  if (!fontLoaded) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Portafolio Complementario</Text>
      <View
        style={{
          borderRadius: 15,
          borderWidth: 2,
          borderColor: theme.colors.lightgray,
        }}
      >
        <SectionedMultiSelect
          items={products}
          IconRenderer={Icon}
          noResultsComponent={!hadSaveBriefCase}
          disabled={hadSaveBriefCase}
          hideChipRemove={hadSaveBriefCase}
          styles={{
            cancelButton: { backgroundColor: "red" },
            listContainer: { backgroundColor: "red" },
            subSeparator: { backgroundColor: theme.colors.lightgray },
            button: { backgroundColor: theme.colors.modernaYellow },
            chipContainer: {
              backgroundColor: theme.colors.modernaYellow,
              borderRadius: 10,
              width: "98%",

              justifyContent: "flex-start",
              //padding:5,
              //flexGrow:1,
              alignItems: "center",
            },

            chipText: {
              color: "black",
              fontFamily: "Metropolis",
              flex: 1,
              fontWeight: "100",
            },
            selectedItemText: { fontFamily: "Metropolis", fontWeight: "100" },
            selectedSubItemText: {
              fontFamily: "Metropolis",
              fontWeight: "100",
            },
            selectToggleText: { fontFamily: "Metropolis", fontWeight: "100" },
            //subItemText: { fontFamily: "Metropolis", left: 10 },
            itemText: {
              fontFamily: "Metropolis",
              fontWeight: "100",
              //backgroundColor: "blue",
              //flex: 1,
              //width: "50%",
              textAlign: "justify",
              fontSize: 16,
            },
            searchTextInput: { fontFamily: "Metropolis", fontWeight: "100" },
            confirmText: { fontFamily: "Metropolis", fontWeight: "100" },
            parentChipText: {
              fontFamily: "Metropolis",
              fontWeight: "100",
              flex: 1,
            },

            //chipsWrapper: { backgroundColor: "red" },
          }}
          //searchTextFontFamily={"Metropolis"}
          confirmText="Confirmar"
          selectedText={"Productos"}
          uniqueKey="id"
          subKey="children"
          selectText="Otros"
          readOnlyHeadings={true}
          showDropDowns={true}
          searchPlaceholderText="Busca el producto"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={isUserScreen ? selectItemsId : select}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: theme.dimensions.maxWidth / 1.1,
    marginVertical: 5,
  },
  text: {
    fontWeight: theme.fontWeight.softbold,
    marginVertical: 10,
    fontSize: 14,
    fontFamily: "Metropolis",
  },
});
