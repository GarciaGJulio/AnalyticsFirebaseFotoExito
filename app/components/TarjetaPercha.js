import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    TouchableOpacity,
    Dimensions,
    BackHandler,
} from "react-native";


export default function TarjPercha({
    categoriaNombre
}) {

    return (<View style={styles.container}>

        <Text>{categoriaNombre}</Text>
        <View style={styles.columna} >
            <Text>Categoria</Text>
        </View>


    </View>)
}
const styles = StyleSheet.create({
    nobackground: {
        backgroundColor: "transparent",
    },
    container: {
        backgroundColor: "white",
    },
    columna:{

    flexDirection:"row"
    }
});