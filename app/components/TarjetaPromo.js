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
import { RadioButton } from 'react-native-paper';
import { Image } from '@rneui/themed';

export default function TarjPromo(props) {

    const [checked, setChecked] = useState(false);
    const BASE_URI = 'https://source.unsplash.com/random?sig=';
    const handleStatus = (value) => {
        setChecked(value);
        props.onChangeStatus(value);
    }




    return (<View style={styles.container}>

        <View style={{ flex: 2 }}>

            <Image
                source={{ uri: BASE_URI }}
                containerStyle={styles.item}
            />


        </View>
        <View style={{ flex: 3 }}>
            <Text>{props.exhibidorNombre}</Text>
            <Text>Exhibidor Disponible</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                    value={true}
                    status={checked === true ? 'checked' : 'unchecked'}
                    onPress={() => handleStatus(true)}
                />
                <Text>Si</Text>
                <RadioButton
                    value={false}
                    status={checked === false ? 'checked' : 'unchecked'}
                    onPress={() => handleStatus(false)}
                />
                <Text>No</Text>
            </View>


        </View>

    </View>)
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: themes.color.secondary,
        shadowColor: '#000',
        margin: 30,
        padding: 15,
        borderRadius: 20,
        flexDirection: "row"

    },
    item: {
        aspectRatio: 1,
        width: '100%',
        flex: 1,
    },
});
