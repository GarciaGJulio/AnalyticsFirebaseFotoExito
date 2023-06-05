import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import theme from "../theme/theme";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

export const MultiSelectListV2 = ({
  setComplementaryPortfolioProducts,
  complementaryPortfolioProducts,
  idPortafolioComplementario,
  auxiliarArray,
  products,
  tipo,
  idPortafolio,
  isUserScreen,
  selectItemsId
}) => {
  const [select, setSelected] = useState([]);
 // const [selectItemsId, setSelectItemsId] = useState([]);
  const saveId = async () => {
    await AsyncStorage.setItem("id_portafolio_complementario", idPortafolio);
    await AsyncStorage.setItem("tipo_complementario", tipo);
  };
  useEffect(() => {
    if (isUserScreen) {
      setSelected(complementaryPortfolioProducts)
      //setSelectItemsId(complementaryPortfolioProducts.map((item) => { return item.id }))
    }
  }, []);

  /*
  const validateProducts = (value) => {
    console.log("PRODUCTO SELECCIONADO: - - - " + value);
    if (complementaryPortfolioProducts.length === 0) {
      const product = data.find((prod) => {
        console.log("PRODUCTO A COMPARAR: - - - - - ",prod.value)
        prod.value === value
      });
      console.log("PRODUCTO EXTRAIDO: - - - - - ",product)
      const { key } = product;
      console.log("PRODUCTO A GUARDAR PRIMERO: - - - - -", product);
      //console.log("REGISTRANDO NUEVO PRODUCTO . . . . ");
      setComplementaryPortfolioProducts([{ value, key }]);
    } 

    const product = data.find((prod) => prod.value === value);
  
    if (product) {
      const { key } = product;
      console.log("PRODUCTO A EVALUAR: - - - - -", product);

        const existingProduct = complementaryPortfolioProducts.find((prod) => prod.key === key);
  
        if (existingProduct) {
          console.log("ELIMINANDO PRODUCTO . . . . ");
          setComplementaryPortfolioProducts((prevProducts) =>
            prevProducts.filter((prod) => prod.key !== key)
          );
        } else {
          console.log("REGISTRANDO NUEVO PRODUCTO . . . . ");
          setComplementaryPortfolioProducts((prevProducts) => [...prevProducts, { value, key }]);
        }
    }
  };
  
*/

  /*const updateObject = (select) => {
    setComplementaryPortfolioProducts(
      select.map((obj) => {
        const myString = obj;
        const valores = myString.split("-");
        const valor1 = valores[0];
        const valor2 = valores[1];
        let newObject = {
          id: valor2,
          name: valor1,
          price: null,
          state: false,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
        console.log("OBJETO FORMATEADO: ", newObject);
        return newObject;
      })
    );
  };*/

  const updateObject = (select) => {
    const newArray = auxiliarArray.filter((obj) => {
      console.log("ARRAY A COMPARAR: ", obj);
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
    console.log("ARRAY DE VALORES ENCONTRADOS: ", newArrayWithInitial);
  };

  useEffect(() => {
    console.log("ESTO GUARDA SELECT: ", JSON.stringify(select));
    //updateObject(select);
    console.log(
      "ESTO ESTA RECOPILADO DE PRODUCTOS COMPLEMENTARIOS: ",
      complementaryPortfolioProducts
    );
  }, [select]);

  const deleteProductId = (id) => {
    const index = complementaryPortfolioProducts.findIndex(
      (product) => product.id === id
    );
    if (index !== -1) {
      complementaryPortfolioProducts.splice(index, 1);
    }
  };

  const searchProductId = (id) => {
    return complementaryPortfolioProducts.some((product) => product.id === id);
  };

  const updateProductsByIds = (ids, originalProducts) => {
    const updatedProducts = ids.map((id) => {
      const existingProduct = originalProducts.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        return {
          id: existingProduct.id,
          id_portafolio: idPortafolio,
          tipo_portafolio: tipo,
          name: existingProduct.name,
          price: null,
          state: false,
          images: {
            image1: null,
            image2: null,
            image3: null,
          },
        };
      } else {
        return null; // Opcional: si el ID no se encuentra, puedes retornar null o un valor por defecto
      }
    });

    // Filtrar los productos nulos (IDs no encontrados)
    const filteredProducts = updatedProducts.filter(
      (product) => product !== null
    );

    return filteredProducts;
  };

  const addProduct = (value) => {
    console.log("ESTO VA A INGRESARSE A PORTAFOLIO COMPLEMENTARIO: ", value);
    /*const modifiedProducts = value.map((objeto) => {
      /*const modifiedChildren = objeto.children.map((child) => ({
        id: child.id,
        name: child.name,
      }));
      console.log(" " + objeto.id + " " + objeto.name);
      return {
        id: objeto.id,
        name: objeto.name,
      };
    });*/

    const modifiedProducts = value.map((objeto) => {
      console.log(" " + objeto.id + " " + objeto.name);
      return {
        id: objeto.id,
        name: objeto.name,
        url: objeto.url,
      };
    });

    const extractedObject = modifiedProducts[0];
    console.log(
      "ID y nombre del objeto extraído:",
      extractedObject.id,
      extractedObject.name,
      extractedObject.url
    );

    //console.log(modifiedProducts);

    console.log(
      "NOMBRE DEL PRODUCTO QUE ENTRA A VALIDARSE - - - - -  - -: ",
      extractedObject.id + " " + extractedObject.name
    );

    /*const idPortafolio = await AsyncStorage.getItem("id_portafolio_complementario");
    const tipo = await AsyncStorage.getItem("tipo_complementario");
    console.log("ID DEL PORTAFOLIO A INGRESAR . . . . ", idPortafolio);
    console.log("TIPO DE PORTAFOLIO: ", tipo);*/

    //Buscar el objeto correspondiente al producto seleccionado
    /*let productData = listProducts.find((obj) => {
      console.log(
        "OBJETO DE COMPARACION DE LA FUNCION ADD PRODUCT: ",
        obj.nombre_producto + "-" + obj.id_producto
      );
      return obj.nombre_producto + "-" + obj.id_producto === value;
    });*/

    /*if (productData) {*/
    // Si se encuentra el objeto, obtener los valores de id_producto y mombre_producto
    /*const validate = searchProductId(extractedObject.id);
    if (validate) {
      console.log("PRODUCTO ENCONTRADO, NO INGRESANDOLO . . . . . . . . ");
      deleteProductId(extractedObject.id);
    } else {*/
    let newObject = {
      id: extractedObject.id,
      name: extractedObject.name,
      price: null,
      url: extractedObject.url,
      state: false,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    };
    console.log("PRODUCTO COMPLEMENTARIO FORMATEADO: ", newObject);
    setComplementaryPortfolioProducts(newObject);
    //}

    /*} else {
      console.log(
        "No se encontró el producto seleccionado en complementaryPortfolioProducts"
      );
    }*/
  };

  const addProductDelete = (value) => {
    //console.log(modifiedProducts);

    console.log(
      "NOMBRE DEL PRODUCTO QUE ENTRA A ELIMINARSE - - - - -  - -: ",
      value.name + " " + value.id
    );

    //Buscar el objeto correspondiente al producto seleccionado
    /*let productData = listProducts.find((obj) => {
      console.log(
        "OBJETO DE COMPARACION DE LA FUNCION ADD PRODUCT: ",
        obj.nombre_producto + "-" + obj.id_producto
      );
      return obj.nombre_producto + "-" + obj.id_producto === value;
    });*/

    /*if (productData) {*/
    // Si se encuentra el objeto, obtener los valores de id_producto y mombre_producto
    let newObject = {
      id: value.id,
      name: value.name,
      price: null,
      state: false,
      images: {
        image1: null,
        image2: null,
        image3: null,
      },
    };

    console.log("PRODUCTO COMPLEMENTARIO FORMATEADO: ", newObject);
    setComplementaryPortfolioProducts(...newObject);
    /*} else {
      console.log(
        "No se encontró el producto seleccionado en complementaryPortfolioProducts"
      );
    }*/
  };

  const onSelectedItemsChange = (selectedItems) => {
    console.log("PRODUCTOS SELECCIONADOS: ", selectedItems);
    const productosIngresados = [...selectedItems];
    console.log(
      "ESTO ES LA REFACTORIZACION DE SELECTITEMS PARA QUE SEAN ARRAY: ",
      productosIngresados
    );
    let productsFound = [];
    /*
    productosIngresados.map((obj) => {
      let productFind = products.flatMap((objeto) => {
        return objeto.children.filter((child) => {
          console.log(
            "ENCONTRANDO PRODUCTO SELECCIONADO: ",
            child.name + "-" + child.id + " - " + obj
          );
          return child.id === obj;
        });
      });
      if (productFind) {
        console.log("PRODUCTO ENCONTRADO / / * * * * * * * * ---", productFind);
        console.log("ESTE OBJETO SE VA A COMPARAR");
        addProduct(productFind);
        /*const { id, name } = productFind.map((producto) => {
          
        });*/
    //console.log("ID DEL PRODUCTO Y NOMBRE EN CUESTION: ", id + " " + name);
    /*if (productFind.children.length > 1) {
          productFind.children.map((objeto) => {
            console.log("ESTE OBJETO SE VA A COMPARAR");
            addProductDelete(objeto);
          });
        } else {
          addProduct(productFind);
        }

        productsFound.push(productFind);
      }
    });*/

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
            name: productName,
            url: productImage,
            price: null,
            state: false,
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

    console.log("PRODUCTO DE FILTRO ENCONTRADO: - - - - - ", updatedProducts);
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
      {/*<MultipleSelectList
        setSelected={(val) => {
          //setValue(val)
          //addProduct(val);
          setSelected(val);
          //setComplementaryPortfolioProducts(val);
        }}
        inputStyles={{ fontFamily: "Metropolis" }}
        data={products}
        searchPlaceholder="Buscar producto"
        save="value"
        //onSelect={() => alert(selected)}
        label="Productos"
        placeholder="Selecciona productos adicionales al portafolio"
      />*/}
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
          styles={{
            cancelButton: { backgroundColor: "red" },
            listContainer: { backgroundColor: "red" },
            subSeparator: { backgroundColor: theme.colors.lightgray },
            button: { backgroundColor: theme.colors.modernaYellow },
            chipContainer: {
              backgroundColor: theme.colors.modernaYellow,
              borderRadius: 10,
            },
            chipText: { color: "black", fontFamily: "Metropolis" },
            selectedItemText: { fontFamily: "Metropolis" },
            selectedSubItemText: { fontFamily: "Metropolis" },
            selectToggleText: { fontFamily: "Metropolis" },
            //subItemText: { fontFamily: "Metropolis", left: 10 },
            itemText: { fontFamily: "Metropolis" },
            searchTextInput: { fontFamily: "Metropolis" },
            confirmText: { fontFamily: "Metropolis" },
            parentChipText: { fontFamily: "Metropolis" },
            

            //chipsWrapper: { backgroundColor: "red" },
          }}
          //searchTextFontFamily={"Metropolis"}
          confirmText="Confirmar"
          selectedText={"Productos"}
          uniqueKey="id"
          subKey="children"
          selectText="Escoje un producto"
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
