import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ConfirmationModal from './ConfirmationModal';
import theme from '../theme/theme';
import { CheckBox, Icon, Input } from '@rneui/base';
import TakeImage from './TakeImage';

const RackCheckbox = ({ categoryName,item,setData}) => {
    const [CateGeneral, setCateGeneral] = useState();
    const [CateModerna, setCateModerna] = useState();
    //const [objPercha, setObjPercha] = useState(itemCom)

    /*useEffect(() => {
        // setObjPercha({...objPercha,
        //     categoriaGeneral: CateGeneral,
        //     categoriaModerna: CateModerna
        // })

        console.log("Percha desde dentro",objPercha)
        // onchangeObjPercha(itemCom)
        // itemCom= {...itemCom,objPercha}

    
    }, [CateGeneral]);*/
    

    /*useEffect(() => {
        // setObjPercha({...objPercha,
        //     categoriaGeneral: CateGeneral,
        //     categoriaModerna: CateModerna
        // })

        console.log("Percha desde dentro",objPercha)
        // onchangeObjPercha(itemCom)
        // itemCom= {...itemCom,objPercha}

    
    }, [CateModerna]);*/


    /*useEffect(() => {
        console.log("itmDentroCompleto",itemCom)
        console.log("itmDentroCompletoPER",objPercha)

    }, []);*/


    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const acceptModal = () => {
        setCheck1(!check1)
        actualizarEstado(item,check2)
        setCheck2(!check2)
        setIsModalVisible(false);
        setDisabled1(!disabled1);
        setDisabled2(!disabled2);
    }

    const actualizarEstado = (item,state) => {
        console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ")
        console.log("PERCHA: ",item)
        console.log("ESTADO: ",state)
        setData(perchas => {
          // Obtén una copia del array actual
          const perchaActualizados = [...perchas];
      
          // Encuentra el objeto con el ID correspondiente
          const percha = perchaActualizados.find(p => p.id === item.id);
      
          // Actualiza la propiedad del objeto
          if (percha) {
            percha.state = state;
            console.log("PARAMETRO ACTUALIZADO: ",percha)
          }
      
          // Devuelve el array actualizado como el nuevo estado
          return perchaActualizados;
        });
      };

      const actualizarCantidad = (item,variant,txt) => {
        console.log("\nENTRANDO A ACtUALIZAR ESTADO - - - - - - - ")
        console.log("PERCHA: ",item)
        console.log("PRECIO: ",txt)
        setData(perchas => {
          // Obtén una copia del array actual
          const perchaActualizados = [...perchas];
      
          // Encuentra el objeto con el ID correspondiente
          const percha = perchaActualizados.find(p => p.id === item.id);
      
          // Actualiza la propiedad del objeto
          if (percha) {
            percha[''+variant+''] = parseInt(txt);
            console.log("PERCHA ACTUALIZADA",percha)
          }
      
          // Devuelve el array actualizado como el nuevo estado
          return perchaActualizados;
        });
      };
    

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [disabled1, setDisabled1] = useState(false);
    const [disabled2, setDisabled2] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);

    return (
        <View style={styles.container}>
            <ConfirmationModal visible={isModalVisible} onClose={handleCloseModal} onPress={acceptModal} warning={'Al presionar el boton Aceptar se va a eliminar el registro ingresado.'} />
            <View style={styles.header}>
                <Text style={{ fontWeight: theme.fontWeight.bolder, fontSize: theme.fontSize.title }}>{categoryName}</Text>
                <TouchableOpacity style={{ position: 'absolute', right: 5 }} onPress={() => setOpenCamera(!openCamera)}><Icon name='camerao' type='antdesign' size={40} /></TouchableOpacity>
            </View>
            <View style={styles.categoryContainer}>
                <View style={styles.category}>
                    <Text style={{ fontWeight: theme.fontWeight.bolder, fontSize: theme.fontSize.subtitle }}>Categoría general</Text>
                    <Input
                        keyboardType="numeric"
                        onChangeText={(txt)=>{
                            setCateGeneral(txt)
                            actualizarCantidad(item,'carasGeneral',txt)
                            /*setObjPercha({...objPercha,
                                CarasGeneral:txt
                            })*/
                            //onchangeObjPercha(objPercha)
                        }}
                        value={CateGeneral}
                        style={styles.input}
                    />
                </View>
                <View style={styles.category}>
                    <Text style={{ fontWeight: theme.fontWeight.bolder, fontSize: theme.fontSize.subtitle }}>Categoría Moderna</Text>
                    <Input
                        keyboardType="numeric"
                        onChangeText={(txt)=>{
                            setCateModerna(txt)
                            actualizarCantidad(item,'carasModerna',txt)
                            /*setObjPercha({...objPercha,
                                CarasModerna:txt
                            })
                            onchangeObjPercha(objPercha)*/

                        }}
                        value={CateModerna}
                        style={styles.input}
                        underlineColor="transparent"
                    />
                </View>
            </View>
            {
                openCamera ? (
                    <View>
                        <View style={styles.imageContainer}>
                            <Text style={{ fontWeight: theme.fontWeight.softbold }}>Indique si la percha de la categoria cumple o no con lo esperado</Text>
                            <Image style={{ flex: 1, width: '90%', height: 200, margin: 10, marginVertical: 10 }} source={{ uri: 'https://perchasecuador.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/banner-gondolas-1.jpeg?bwg=1538514531' }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', right: 10, justifyContent: 'center' }}>
                            <CheckBox
                                checked={check1}
                                onPress={() => {
                                    check2 ? (setCheck2(!check2), actualizarEstado(item,!check1),setDisabled2(!disabled2), setCheck1(!check1),
                                        setDisabled1(!disabled1)) : (
                                        setCheck1(!check1),
                                        actualizarEstado(item,!check1),
                                        setDisabled1(!disabled1)
                                    )
                                }}
                                // Use ThemeProvider to make change for all checkbox
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor={theme.colors.modernaRed}
                                containerStyle={{ backgroundColor: 'transparent' }}
                                disabled={disabled1}
                            />
                            <Text>Cumple</Text>
                            <CheckBox
                                checked={check2}
                                onPress={() => {
                                    check1 ? handleOpenModal() : (
                                        setCheck2(!check2),
                                        actualizarEstado(item,check2),
                                        setDisabled2(!disabled2)
                                    )
                                }}

                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor={theme.colors.modernaRed}
                                containerStyle={{ backgroundColor: 'transparent' }}
                                disabled={disabled2}
                            />
                            <Text>No cumple</Text>
                        </View>
                        {
                            check1 ? (<View style={{ paddingHorizontal: 25 }}>
                                <TakeImage setProducts={setData} item={item}/>
                            </View>) : <></>
                        }
                    </View>
                ) : <></>
            }

        </View>
    )
}

export default RackCheckbox

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //height:200,
        width: '100%',
        alignContent: 'center',
        //backgroundColor: "red",
        shadowColor: '#000',
        //marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 8,
        borderWidth: 1,

    },
    header: {
        //backgroundColor:'blue',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    categoryContainer: {
        //backgroundColor:'orange', 
        flexDirection: 'row',
        flex: 1
    },
    category: {
        //backgroundColor:'purple',
        flex: 1,
        alignItems: 'center'
    },
    input: {
        fontWeight: theme.fontWeight.light,
        textAlign: 'center',
    },
    imageContainer: {
        //backgroundColor:'yellow',
        flex: 1,
        alignItems: 'center',
        padding: 10
    }
})