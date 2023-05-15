import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import ConfirmationModal from './ConfirmationModal';
import theme from '../theme/theme';
import { CheckBox, Icon, Input } from '@rneui/base';
import TakeImage from './TakeImage';

const Rack_View = ({ categoryName }) => {
    const [CateGeneral, setCateGeneral] = useState();
    const [CateModerna, setCateModerna] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const handleTextGeneral = (txt) => {
        setCateGeneral(txt);
        //props.onChangeTextGeneral(txt);
    }
    const handleTextModerna = (txt) => {
        setCateModerna(txt);
        //props.onChangeTextModerna(txt);
    }

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const acceptModal = () => {
        setCheck1(!check1)
        setCheck2(!check2)
        setIsModalVisible(false);
        setDisabled1(!disabled1);
        setDisabled2(!disabled2);
    }


    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [disabled1, setDisabled1] = useState(false);
    const [disabled2, setDisabled2] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);

    const img = "https://perchasecuador.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/banner-gondolas-1.jpeg?bwg=1538514531";
    const img1 = "https://media.gettyimages.com/id/1146333350/es/foto/food-on-shelves-of-grocery-store.jpg?s=2048x2048&w=gi&k=20&c=ifOzWbplve6OkYZUQqRa14qwGkE_ELCoc6PDLg3tqAM=";
    const img2 = "https://media.gettyimages.com/id/1146333347/es/foto/food-on-shelves-of-grocery-store.jpg?s=2048x2048&w=gi&k=20&c=g53D4-XpXPd1Doke0aE1YIgFHQvZTcxOPM1GwsS2-80=";

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontWeight: theme.fontWeight.bolder, fontSize: theme.fontSize.title }}>{categoryName}</Text>
                <TouchableOpacity style={{ position: 'absolute', right: 5 }} onPress={() => {
                    setOpenCamera(!openCamera);
                    setModalVisible(true);
                }}>
                    <Icon name='camerao' type='antdesign' size={40} />
                </TouchableOpacity>
            </View>
            <View style={styles.categoryContainer}>
                <View style={styles.category}>
                    <Text style={{ fontWeight: theme.fontWeight.bolder, fontSize: theme.fontSize.subtitle }}>Categoría general</Text>
                    <Input
                        keyboardType="numeric"
                        onChangeText={handleTextGeneral}
                        value={CateGeneral}
                        style={styles.input}
                        disabled={true}
                    />
                </View>
                <View style={styles.category}>
                    <Text style={{ fontWeight: theme.fontWeight.bolder, fontSize: theme.fontSize.subtitle }}>Categoría Moderna</Text>
                    <Input
                        keyboardType="numeric"
                        onChangeText={handleTextModerna}
                        value={CateModerna}
                        style={styles.input}
                        underlineColor="transparent"
                        disabled={true}
                    />
                </View>
            </View>
            {
                openCamera ? (
                    <View>
                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Image style={styles.imageContainer}
                                            source={{ uri: img }} />
                                        <View style={{ flexDirection: 'row', }}>
                                            <Image
                                                source={{ uri: img }}
                                                style={styles.imgContainer}
                                                resizeMode="cover"
                                            />
                                            <Image
                                                source={{ uri: img1 }}
                                                style={styles.imgContainer}
                                                resizeMode="cover"
                                            />
                                            <Image
                                                source={{ uri: img2 }}
                                                style={styles.imgContainer}
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <TouchableOpacity
                                            style={styles.closeButton}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                                setOpenCamera(!openCamera);
                                            }}
                                        >
                                            <Icon name="close" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                ) : <></>
            }

        </View >
    )
}

export default Rack_View;

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
        borderColor: theme.colors.lightgray,

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
    //MODAL
    imageContainer: {
        width: 224,
        height: 186,
        resizeMode: "cover",
        marginTop: 100,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        alignItems: 'center',
        width: 280,
        height: 528,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
        borderRadius: 20,
        padding: 10,
    },
    imgContainer: {
        width: 66,
        height: 49,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        marginHorizontal: 10,
        borderColor: theme.colors.black,
        padding: 1,
    },
});