import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    ImageBackgroundComponent,

} from "react-native";
import { themes } from "../themes/themes";
import { Icon, Input } from '@rneui/themed';
import { useState } from "react";


export default function TarjPercha(props,{
    categoriaNombre
}) {
    const [CateGeneral, setCateGeneral] = useState();
    const [CateModerna, setCateModerna] = useState();

    const handleTextGeneral = (txt) => {
        setCateGeneral(txt);
        props.onChangeTextGeneral(txt);
    }
    const handleTextModerna = (txt) => {
        setCateModerna(txt);
        props.onChangeTextModerna(txt);
    }



    return (<View style={styles.container}>
        <View style={styles.vertical} >
            <Text>{categoriaNombre}</Text>
            <View style={{ marginLeft: 1, position: "absolute", right: "3%" }}>
                <Icon
                    name='camerao'
                    type='antdesign'
                />
            </View>
        </View>
        <View style={styles.vertical2} >
            <View style={styles.columna} >
                <Text>Categoria General</Text>
                <Input
                    keyboardType="numeric"
                    onChangeText={handleTextGeneral}
                    value={CateGeneral}
                />
            </View>
            <View style={styles.columna} >
                <Text>Categoria Moderna</Text>
                <Input
                    keyboardType="numeric"
                    onChangeText={handleTextModerna}
                    value={CateModerna}
                />

            </View>
        </View>


    </View>)
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        shadowColor: '#000',
        margin: 30,
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 50,
        },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 4, // solo para Android 

    },
    columna: {
        flexDirection: "column"
    },
    vertical: {
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "center"
    },
    vertical2: {
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "space-around"
    }
});
